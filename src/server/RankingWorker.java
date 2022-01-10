package server;

import database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import server.Timer.WorldTimer;
import tools.FileoutputUtil;
import tools.StringUtil;

public class RankingWorker {

    private final static Map<Integer, List<RankingInformation>> rankings = new HashMap<>();
    private final static Map<String, Integer> jobCommands = new HashMap<>();
    private final static List<PokemonInformation> pokemon = new ArrayList<>();
    private final static List<PokedexInformation> pokemon_seen = new ArrayList<>();
    private final static List<PokebattleInformation> pokemon_ratio = new ArrayList<>();
    private final static List<Integer> itemSearch = new ArrayList<>(); //热门搜索道具

    public static Integer getJobCommand(String job) {
        return jobCommands.get(job);
    }

    public static Map<String, Integer> getJobCommands() {
        return jobCommands;
    }

    public static List<RankingInformation> getRankingInfo(int job) {
        return rankings.get(job);
    }

    public static List<PokemonInformation> getPokemonInfo() {
        return pokemon;
    }

    public static List<PokedexInformation> getPokemonCaught() {
        return pokemon_seen;
    }

    public static List<PokebattleInformation> getPokemonRatio() {
        return pokemon_ratio;
    }

    public static List<Integer> getItemSearch() {
        return itemSearch;
    }

    public static void start() {
        System.out.println("系统自动更新玩家排名功能已启动...");
        System.out.println("更新间隔时间为: " + Start.instance.getRankTime() + " 分钟1次。");
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                jobCommands.clear();
                rankings.clear();
                pokemon.clear();
                pokemon_seen.clear();
                pokemon_ratio.clear();
                itemSearch.clear();
                updateRank();
            }
        }, 1000 * 60 * Start.instance.getRankTime()); //4小时刷新1次排名
    }

    public static void updateRank() {
        System.out.println("开始更新玩家排名...");
        long startTime = System.currentTimeMillis();
        loadJobCommands();
        Connection con = DatabaseConnection.getConnection();
        try {
            con.setAutoCommit(false); //false是关闭自动提交
            updateRanking(con);
            updatePokemon(con);
            updatePokemonRatio(con);
            updatePokemonCaught(con);
            updateItemSearch(con);
            con.commit(); //commit 提交
            con.setAutoCommit(true);
        } catch (Exception ex) {
            try {
                con.rollback();
                con.setAutoCommit(true);
                FileoutputUtil.outputFileError(FileoutputUtil.ScriptEx_Log, ex);
                System.err.println("更新玩家排名出错");
            } catch (SQLException ex2) {
                FileoutputUtil.outputFileError(FileoutputUtil.ScriptEx_Log, ex2);
                System.err.println("Could not rollback unfinished ranking transaction");
            }
        }
        System.out.println("玩家排名更新完成 耗时: " + ((System.currentTimeMillis() - startTime) / 1000) + " 秒..");
    }

    /**
     * @param s
     */
    public static void printSection(String s) {
        s = "-[ " + s + " ]";
        while (s.getBytes().length < 79) {
            s = "=" + s;
        }
        System.out.println(s);
    }

    private static void updateRanking(Connection con) throws Exception {
        StringBuilder sb = new StringBuilder("SELECT c.id, c.job, c.exp, c.level, c.name, c.jobRank, c.rank, c.fame");
        sb.append(" FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id WHERE c.gm = 0 AND a.banned = 0 AND c.level >= 160");
        sb.append(" ORDER BY c.level DESC , c.exp DESC , c.fame DESC , c.rank ASC");

        PreparedStatement charSelect = con.prepareStatement(sb.toString());
        ResultSet rs = charSelect.executeQuery();
        PreparedStatement ps = con.prepareStatement("UPDATE characters SET jobRank = ?, jobRankMove = ?, rank = ?, rankMove = ? WHERE id = ?");
        int rank = 0; //for "all"
        Map<Integer, Integer> rankMap = new LinkedHashMap<>();
        for (int i : jobCommands.values()) {
            rankMap.put(i, 0); //job to rank
            rankings.put(i, new ArrayList<RankingInformation>());
        }
        while (rs.next()) {
            int job = rs.getInt("job");
            if (!rankMap.containsKey(job / 100)) { //not supported.
                continue;
            }
            int jobRank = rankMap.get(job / 100) + 1;
            rankMap.put(job / 100, jobRank);
            rank++;
            rankings.get(-1).add(new RankingInformation(rs.getString("name"), job, rs.getInt("level"), rs.getLong("exp"), rank, rs.getInt("fame")));
            rankings.get(job / 100).add(new RankingInformation(rs.getString("name"), job, rs.getInt("level"), rs.getLong("exp"), jobRank, rs.getInt("fame")));
            ps.setInt(1, jobRank);
            ps.setInt(2, rs.getInt("jobRank") - jobRank);
            ps.setInt(3, rank);
            ps.setInt(4, rs.getInt("rank") - rank);
            ps.setInt(5, rs.getInt("id"));
            ps.addBatch(); //添加要更新执行的SQL
        }
        ps.executeBatch(); //一次更新上面所有的addBatch() Batch update should be faster.
        rs.close();
        charSelect.close();
        ps.close();
    }

    private static void updatePokemon(Connection con) throws Exception {
        StringBuilder sb = new StringBuilder("SELECT count(distinct m.id) AS mc, c.name, c.totalWins, c.totalLosses ");
        sb.append(" FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id");
        sb.append(" RIGHT JOIN monsterbook AS m ON m.charid = a.id WHERE c.gm = 0 AND a.banned = 0");
        sb.append(" ORDER BY c.totalWins DESC, c.totalLosses DESC, mc DESC LIMIT 50");

        PreparedStatement charSelect = con.prepareStatement(sb.toString());
        ResultSet rs = charSelect.executeQuery();
        int rank = 0; //for "all"
        while (rs.next()) {
            rank++;
            pokemon.add(new PokemonInformation(rs.getString("name"), rs.getInt("totalWins"), rs.getInt("totalLosses"), rs.getInt("mc"), rank));
        }
        rs.close();
        charSelect.close();
    }

    private static void updatePokemonRatio(Connection con) throws Exception {
        StringBuilder sb = new StringBuilder("SELECT (c.totalWins / c.totalLosses) AS mc, c.name, c.totalWins, c.totalLosses ");
        sb.append(" FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id");
        sb.append(" WHERE c.gm = 0 AND a.banned = 0 AND c.totalWins > 10 AND c.totalLosses > 0");
        sb.append(" ORDER BY mc DESC, c.totalWins DESC, c.totalLosses ASC LIMIT 50");

        PreparedStatement charSelect = con.prepareStatement(sb.toString());
        ResultSet rs = charSelect.executeQuery();
        int rank = 0; //for "all"
        while (rs.next()) {
            rank++;
            pokemon_ratio.add(new PokebattleInformation(rs.getString("name"), rs.getInt("totalWins"), rs.getInt("totalLosses"), rs.getDouble("mc"), rank));
        }
        rs.close();
        charSelect.close();
    }

    private static void updatePokemonCaught(Connection con) throws Exception {
        StringBuilder sb = new StringBuilder("SELECT count(distinct m.id) AS mc, c.name ");
        sb.append(" FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id");
        sb.append(" RIGHT JOIN monsterbook AS m ON m.charid = a.id WHERE c.gm = 0 AND a.banned = 0");
        sb.append(" ORDER BY mc DESC LIMIT 50");

        PreparedStatement charSelect = con.prepareStatement(sb.toString());
        ResultSet rs = charSelect.executeQuery();
        int rank = 0; //for "all"
        while (rs.next()) {
            rank++;
            pokemon_seen.add(new PokedexInformation(rs.getString("name"), rs.getInt("mc"), rank));
        }
        rs.close();
        charSelect.close();
    }

    private static void updateItemSearch(Connection con) throws Exception {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        PreparedStatement ps = con.prepareStatement("SELECT itemid, count FROM itemsearch WHERE count > 0 ORDER BY count DESC LIMIT 10");
        ResultSet rs = ps.executeQuery();
        itemSearch.clear(); //清理列表
        while (rs.next()) {
            int itemId = rs.getInt("itemid");
            /*
             * 如果列表中这个道具 或者 道具不存在就跳过
             */
            if (itemSearch.contains(itemId) || !ii.itemExists(itemId)) {
                continue;
            }
            itemSearch.add(itemId); //添加道具
        }
        rs.close();
        ps.close();
    }

    public static void loadJobCommands() {
        jobCommands.put("所有", -1);
        jobCommands.put("新手", 0);
        jobCommands.put("战士", 1);
        jobCommands.put("魔法师", 2);
        jobCommands.put("弓箭手", 3);
        jobCommands.put("飞侠", 4);
        jobCommands.put("海盗", 5);
        jobCommands.put("初心者", 10);
        jobCommands.put("魂骑士", 11);
        jobCommands.put("炎术士", 12);
        jobCommands.put("风灵使者", 13);
        jobCommands.put("夜行者", 14);
        jobCommands.put("奇袭者", 15);
        jobCommands.put("英雄", 20);
        jobCommands.put("战神", 21);
        jobCommands.put("龙神", 22);
        jobCommands.put("双弩精灵", 23);
        jobCommands.put("幻影神偷", 24);
        jobCommands.put("夜光法师", 27);
        jobCommands.put("反抗者", 30);
        jobCommands.put("恶魔猎手", 31);
        jobCommands.put("幻灵斗师", 32);
        jobCommands.put("弩豹游侠", 33);
        jobCommands.put("机械师", 35);
        jobCommands.put("米哈尔", 50);
    }

    public static class RankingInformation {

        public String toString;
        public int rank;

        public RankingInformation(String name, int job, int level, long exp, int rank, int fame) {
            this.rank = rank;
            StringBuilder builder = new StringBuilder("排名 ");
            builder.append(StringUtil.getRightPaddedStr(String.valueOf(rank), ' ', 3));
            builder.append(" : ");
            builder.append(StringUtil.getRightPaddedStr(name, ' ', 13));
            builder.append(" 等级: ");
            builder.append(StringUtil.getRightPaddedStr(String.valueOf(level), ' ', 3));
            builder.append(" 职业: ");
            builder.append(StringUtil.getRightPaddedStr(MapleCarnivalChallenge.getJobNameById(job), ' ', 10));
            //builder.append(" 经验: ");
            //builder.append(exp);
            //builder.append(" 人气: ");
            //builder.append(fame);
            builder.append("\r\n");
            this.toString = builder.toString(); //Rank 1 : KiDALex - Level 200 Blade Master | 0 EXP, 30000 Fame
        }

        @Override
        public String toString() {
            return toString;
        }
    }

    public static class PokemonInformation {

        public String toString;

        public PokemonInformation(String name, int totalWins, int totalLosses, int caught, int rank) {
            StringBuilder builder = new StringBuilder("排名 ");
            builder.append(rank);
            builder.append(" : #e");
            builder.append(name);
            builder.append("#n - #r胜利: ");
            builder.append(totalWins);
            builder.append("#b 失败: ");
            builder.append(totalLosses);
            builder.append("#k Caught:");
            builder.append(caught);
            builder.append("\r\n");
            this.toString = builder.toString(); //Rank 1 : Phoenix - 200 Wins, 0 Losses, 650 Caught
        }

        @Override
        public String toString() {
            return toString;
        }
    }

    public static class PokedexInformation {

        public String toString;

        public PokedexInformation(String name, int caught, int rank) {
            StringBuilder builder = new StringBuilder("排名 ");
            builder.append(rank);
            builder.append(" : #e");
            builder.append(name);
            builder.append("#n - #rCaught: ");
            builder.append(caught);
            builder.append("\r\n");
            this.toString = builder.toString(); //Rank 1 : Phoenix - 650 Caught
        }

        @Override
        public String toString() {
            return toString;
        }
    }

    public static class PokebattleInformation {

        public String toString;

        public PokebattleInformation(String name, int totalWins, int totalLosses, double caught, int rank) {
            StringBuilder builder = new StringBuilder("Rank ");
            builder.append(rank);
            builder.append(" : #e");
            builder.append(name);
            builder.append("#n - #rRatio: ");
            builder.append(caught);
            builder.append("\r\n");
            this.toString = builder.toString(); //Rank 1 : Phoenix - 200 Wins, 0 Losses, 200 Ratio
        }

        @Override
        public String toString() {
            return toString;
        }
    }
}
