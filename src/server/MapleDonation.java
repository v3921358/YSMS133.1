/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import client.MapleCharacter;
import client.inventory.Equip;
import client.inventory.MapleInventoryType;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import org.apache.log4j.Logger;
import server.Timer.WorldTimer;
import tools.MaplePacketCreator;

/**
 * @author PlayDK
 */
public class MapleDonation {

    private static final Logger log = Logger.getLogger(MapleDonation.class);
    private static final String ALLOWED_NAME = "TooInspired";
    private static final int PRIZE_ID = 1142155;
    private static final int RANKING_NUMBER = 10;
    private static Map<String, Long> storage = new HashMap<>();
    private static int winnerId;
    private static int totalCash;

    public static void start() {
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                updateRank(false);
            }
        }, 30 * 60 * 1000); //30分钟刷新1次
    }

    public static void updateRank(boolean deleteDupes) {
        System.out.println("开始更新玩家捐献排名...");
        long startTime = System.currentTimeMillis();
        try {
            MapleDonation.loadFromDatabase(deleteDupes);
        } catch (SQLException e) {
            log.error("加载玩家捐献排名出错." + e);
        }
        System.out.println("更新捐献排名更新完成 耗时: " + ((System.currentTimeMillis() - startTime) / 1000) + " 秒..");
    }

    /*
     * 加载捐献排名
     */
    public static void loadFromDatabase(boolean deleteDupes) throws SQLException {
        storage.clear();
        totalCash = 0;
        String winnerName = null;
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT `name`, `amount` FROM donations ORDER by `amount` DESC");
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            if (winnerName == null) {
                winnerName = rs.getString("name");
            }
            storage.put(rs.getString("name"), rs.getLong("amount"));
            totalCash += rs.getInt("amount");
        }
        rs.close();
        ps.close();
        ps = DatabaseConnection.getConnection().prepareStatement("SELECT `id` FROM characters WHERE `name` = ?");
        ps.setString(1, winnerName);
        rs = ps.executeQuery();
        if (rs.next()) {
            winnerId = rs.getInt("id");
        }
        rs.close();
        ps.close();
        if (deleteDupes) {
            ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM inventoryitems WHERE itemid = ? AND characterid <> ?");
            ps.setInt(1, PRIZE_ID);
            ps.setInt(2, winnerId);
            ps.executeUpdate();
            ps.close();
        }
    }

    /*
     * 保存捐献记录
     */
    public static void saveAll() throws SQLException {
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("TRUNCATE scammed_donations");
        ps.executeUpdate();
        ps.close();
        ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO scammed_donations (`name`, `amount`) VALUES (?, ?)");
        for (String s : storage.keySet()) {
            ps.setString(1, s);
            ps.setLong(2, storage.get(s));
            ps.addBatch();
        }
        ps.executeBatch();
        ps.close();
    }

    /*
     * 添加捐献
     */
    public static void addDonation(String user, int amount) {
        if (storage.containsKey(user)) {
            storage.put(user, storage.get(user) + amount);
        } else {
            storage.put(user, (long) amount);
        }
        totalCash += amount;
    }

    /*
     * 显示捐献排名
     */
    public static String displayRankings() {
        ArrayList<Long> collect = new ArrayList<>(storage.values());
        Set<String> exclude = new HashSet<>();
        Collections.sort(collect);
        StringBuilder ret = new StringBuilder("Top scores: \r\n");
        int start = collect.size() - 1;
        for (int i = start; i > start - RANKING_NUMBER; i--) {
            if (i < 0) {
                return ret.toString();
            }
            String name = getNameFromAmount(collect.get(i), exclude);
            exclude.add(name);
            ret.append(collect.size() - i).append(". ").append(name).append(": ").append(i == start ? "???" : collect.get(i)).append(" 点卷\r\n");
        }
        return ret.toString();
    }

    private static String getNameFromAmount(long amount, Set<String> exclude) {
        for (String s : storage.keySet()) {
            if (storage.get(s) == amount && !exclude.contains(s)) {
                return s;
            }
        }
        return null;
    }

    /*
     * 检测是否是第1名
     */
    public static boolean isWinner(String n) {
        if (!storage.containsKey(n)) {
            return false;
        }
        long highest = storage.get(n);
        for (String s : storage.keySet()) {
            if (storage.get(s) >= highest && !s.equals(n)) {
                return false;
            }
        }
        return true;
    }

    /*
     * 领取第1名的奖励
     */
    public static void collectWinnings(MapleCharacter mc) {
        if (!mc.getName().equalsIgnoreCase(ALLOWED_NAME)) {
            //mc.ban("LOL YOU FAIL TRYING TO STEAL MESOS EH", true); 
            return;
        }
        long amountPossible = 2147383647 - mc.getMeso();
        if (totalCash > amountPossible) {
            totalCash -= amountPossible;
            mc.gainMeso(amountPossible, true);
            handleNegativeStorage(amountPossible);
            mc.dropMessage(6, "You still have " + totalCash + " more meso to collect!");
        } else {
            mc.gainMeso(totalCash, true);
            handleNegativeStorage(totalCash);
            totalCash = 0;
        }
    }

    private static void handleNegativeStorage(long collected) {
        if (storage.containsKey(ALLOWED_NAME)) {
            storage.put(ALLOWED_NAME, storage.get(ALLOWED_NAME) - collected);
        } else {
            storage.put(ALLOWED_NAME, -collected);
        }
    }

    /*
     * 获取总计捐献
     */
    public static int getTotalCash() {
        return totalCash;
    }

    /*
     * 捐献第1名变更
     */
    public static void collectPrize(MapleCharacter chr) {
        // 删除以前的第1名的道具奖励
        MapleCharacter oldChr = ChannelServer.getCharacterById(winnerId);
        if (oldChr != null) {
            if (oldChr.getItemQuantity(PRIZE_ID, true) > 0) {
                MapleInventoryManipulator.removeById(oldChr.getClient(), oldChr.getItemQuantity(PRIZE_ID, false) == 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP, PRIZE_ID, 1, true, false);
                oldChr.dropMessage(6, "您的捐献排名地位降低，失去第1名的道具奖励。");
            }
        } else {
            try {
                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM inventoryitems WHERE itemid = ?");
                ps.setInt(1, PRIZE_ID);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException e) {
                log.error("删除捐献第1名道具奖励出错", e);
            }
        }
        // 设置捐献第1名的ID
        winnerId = chr.getId();
        // 给捐献第1名道具奖励
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip prize = (Equip) ii.getEquipById(PRIZE_ID);
        prize.setState((byte) 7);
        prize.setOptential1((short) 30086);
        prize.setOptential2((short) 30086);
        prize.setOptential3((short) 30086);
        prize.setWatk((short) 10);
        MapleInventoryManipulator.addFromDrop(chr.getClient(), prize, true);
        // 给所有在线的玩家发送谁获得捐献第1名
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, chr.getName() + " has become the Scammed Donation  " + (chr.getGender() == 0 ? "King!" : "Queen!")));
    }
}
