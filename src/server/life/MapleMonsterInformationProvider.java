package server.life;

import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import database.DatabaseConnection;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.MapleItemInformationProvider;
import server.StructFamiliar;

public class MapleMonsterInformationProvider {

    private static final MapleMonsterInformationProvider instance = new MapleMonsterInformationProvider();
    private final Map<Integer, ArrayList<MonsterDropEntry>> drops = new HashMap<>();
    private final List<MonsterGlobalDropEntry> globaldrops = new ArrayList<>();
    private static final MapleDataProvider stringDataWZ = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz"));
    private static final MapleData mobStringData = stringDataWZ.getData("MonsterBook.img");

    public static MapleMonsterInformationProvider getInstance() {
        return instance;
    }

    public List<MonsterGlobalDropEntry> getGlobalDrop() {
        return globaldrops;
    }

    public void load() {
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM drop_data_global WHERE chance > 0");
            rs = ps.executeQuery();

            while (rs.next()) {
                globaldrops.add(
                        new MonsterGlobalDropEntry(
                                rs.getInt("itemid"),
                                rs.getInt("chance"),
                                rs.getInt("continent"),
                                rs.getByte("dropType"),
                                rs.getInt("minimum_quantity"),
                                rs.getInt("maximum_quantity"),
                                rs.getInt("questid")));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT dropperid FROM drop_data");
            List<Integer> mobIds = new ArrayList<>();
            rs = ps.executeQuery();
            while (rs.next()) {
                int mobId = rs.getInt("dropperid");
                if (!mobIds.contains(mobId)) {
                    loadDrop(mobId);
                    mobIds.add(mobId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving drop" + e);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {
            }
        }
    }

    public ArrayList<MonsterDropEntry> retrieveDrop(int monsterId) {
        return drops.get(monsterId);
    }

    private void loadDrop(int monsterId) {
        ArrayList<MonsterDropEntry> ret = new ArrayList<>();

        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(monsterId);
            if (mons == null) {
                return;
            }
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM drop_data WHERE dropperid = ?");
            ps.setInt(1, monsterId);
            rs = ps.executeQuery();
            int itemid;
            int chance;
            boolean doneMesos = false;
            while (rs.next()) {
                itemid = rs.getInt("itemid");
                chance = rs.getInt("chance");
                if (itemid / 10000 == 238) { //去掉怪物卡片
                    continue;
                }
                ret.add(new MonsterDropEntry(
                        itemid,
                        chance,
                        rs.getInt("minimum_quantity"),
                        rs.getInt("maximum_quantity"),
                        rs.getInt("questid")));
                if (itemid == 0) {
                    doneMesos = true;
                }
            }
            if (!doneMesos) {
                addMeso(mons, ret);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving drop" + e);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {
                return;
            }
        }
        drops.put(monsterId, ret);
    }

    public void addExtra() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Entry<Integer, ArrayList<MonsterDropEntry>> e : drops.entrySet()) {
            for (int i = 0; i < e.getValue().size(); i++) {
                if (e.getValue().get(i).itemId != 0 && !ii.itemExists(e.getValue().get(i).itemId)) {
                    e.getValue().remove(i);
                }
            }
            MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(e.getKey());
            Integer item = ii.getItemIdByMob(e.getKey());
            if (item != null && item.intValue() > 0) {
                if (item.intValue() / 10000 == 238) { //去掉怪物卡片
                    continue;
                }
                e.getValue().add(new MonsterDropEntry(item.intValue(), mons.isBoss() ? 1000000 : 10000, 1, 1, 0));
            }
            StructFamiliar f = ii.getFamiliarByMob(e.getKey().intValue());
            if (f != null) {
                if (f.itemid / 10000 == 238) { //去掉怪物卡片
                    continue;
                }
                e.getValue().add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
            }
        }
        for (Entry<Integer, Integer> i : ii.getMonsterBook().entrySet()) {
            if (!drops.containsKey(i.getKey())) {
                MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(i.getKey());
                ArrayList<MonsterDropEntry> e = new ArrayList<>();
                if (i.getValue().intValue() / 10000 == 238) { //去掉怪物卡片
                    continue;
                }
                e.add(new MonsterDropEntry(i.getValue().intValue(), mons.isBoss() ? 1000000 : 10000, 1, 1, 0));
                StructFamiliar f = ii.getFamiliarByMob(i.getKey().intValue());
                if (f != null) {
                    if (f.itemid / 10000 == 238) { //去掉怪物卡片
                        continue;
                    }
                    e.add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
                }
                addMeso(mons, e);
                drops.put(i.getKey(), e);
            }
        }
        for (StructFamiliar f : ii.getFamiliars().values()) {
            if (!drops.containsKey(f.mob)) {
                MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(f.mob);
                ArrayList<MonsterDropEntry> e = new ArrayList<>();
                if (f.itemid / 10000 == 238) { //去掉怪物卡片
                    continue;
                }
                e.add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
                addMeso(mons, e);
                drops.put(f.mob, e);
            }
        }
        /*
         * 怪物添加爆率
         */
        for (Entry<Integer, ArrayList<MonsterDropEntry>> e : drops.entrySet()) {
            if (e.getKey() != 9400408 && mobStringData.getChildByPath(String.valueOf(e.getKey())) != null) {
                for (MapleData d : mobStringData.getChildByPath(e.getKey() + "/reward")) {
                    int toAdd = MapleDataTool.getInt(d, 0);
                    if (toAdd > 0 && !contains(e.getValue(), toAdd) && ii.itemExists(toAdd)) {
                        if (toAdd / 10000 == 238 //掉怪物卡片
                                || toAdd / 10000 == 243 //盒子
                                || toAdd / 10000 == 399 //字母
                                || toAdd == 4001126 //枫叶
                                || toAdd == 4001128 //火药桶
                                || toAdd == 4001246 //温暖的阳光
                                || toAdd == 4001473 //圣诞树装饰
                                || toAdd == 4001447 //一起来行动
                                || toAdd == 2022450 //经验值上升(小)
                                || toAdd == 2022451 //经验值上升(中)
                                || toAdd == 2022452 //经验值上升(大)
                                || toAdd == 4032302 //神奇的颜料
                                || toAdd == 4032303 //神秘的颜料
                                || toAdd == 4032304 //魔法颜料
                                ) {
                            continue;
                        }
                        e.getValue().add(new MonsterDropEntry(toAdd, chanceLogic(toAdd), 1, 1, 0));
                    }
                }
            }
        }
    }

    public void addMeso(MapleMonsterStats mons, ArrayList<MonsterDropEntry> ret) {
        double divided = (mons.getLevel() < 100 ? (mons.getLevel() < 10 ? (double) mons.getLevel() : 10.0) : (mons.getLevel() / 10.0));
        int maxMeso = mons.getLevel() * (int) Math.ceil(mons.getLevel() / divided);
        if (mons.isBoss() && !mons.isPartyBonus()) {
            maxMeso *= 3;
        }
        for (int i = 0; i < mons.dropsMesoCount(); i++) {
            if (mons.getId() >= 9600086 && mons.getId() <= 9600098) { //外星人金币爆率
                int meso = (int) Math.floor(Math.random() * 500 + 1000);
                ret.add(new MonsterDropEntry(0, 20000, (int) Math.floor(0.46 * meso), meso, 0));
            } else {
                ret.add(new MonsterDropEntry(0, mons.isBoss() && !mons.isPartyBonus() ? 800000 : (mons.isPartyBonus() ? 40000 : 40000), (int) Math.floor(0.66 * maxMeso), maxMeso, 0));
            }
        }
    }

    public void clearDrops() {
        drops.clear();
        globaldrops.clear();
        load();
        addExtra();
    }

    public boolean contains(ArrayList<MonsterDropEntry> e, int toAdd) {
        for (MonsterDropEntry f : e) {
            if (f.itemId == toAdd) {
                return true;
            }
        }
        return false;
    }

    public int chanceLogic(int itemId) { //not much logic in here. most of the drops should already be there anyway.
//        switch (itemId) {
//            case 4280000: //永恒的谜之蛋
//            case 4280001: //重生的谜之蛋
//            case 2049301: //装备强化卷轴
//            case 2049401: //潜能附加卷轴
//                return 5000;
//            case 2049300: //高级装备强化卷轴
//            case 2049400: //高级潜能附加卷轴
//            case 1002419: //枫叶帽
//                return 2000;
//            case 1002938: //安全帽（1日）
//                return 50;
//        }
        if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
            return 8000; //with *10
        } else if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.SETUP || ItemConstants.getInventoryType(itemId) == MapleInventoryType.CASH) {
            return 500;
        } else {
            switch (itemId / 10000) {
                case 204: //卷轴
                    return 1800;
                case 207: //飞镖之类
                case 233: //子弹之类
                    return 3000;
                case 229: //技能书
                    return 400;
                case 401: //矿
                case 402: //矿
                    return 5000;
                case 403:
                    return 4000; //lol
            }
            return 8000;
        }
    }
    //MESO DROP: level * (level / 10) = max, min = 0.66 * max
    //explosive Reward = 7 meso drops
    //boss, ffaloot = 2 meso drops
    //boss = level * level = max
    //no mesos if: mobid / 100000 == 97 or 95 or 93 or 91 or 90 or removeAfter > 0 or invincible or onlyNormalAttack or friendly or dropitemperiod > 0 or cp > 0 or point > 0 or fixeddamage > 0 or selfd > 0 or mobType != null and mobType.charat(0) == 7 or PDRate <= 0
}
