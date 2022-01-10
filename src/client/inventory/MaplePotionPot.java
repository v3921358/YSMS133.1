/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.inventory;

import database.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * @author PlayDK 药剂罐系统
 */
public class MaplePotionPot {

    private int chrId; //角色ID
    private int itemId; //道具ID
    private int hp; //当前储存的hp
    private int mp; //当前储存的hp
    private int maxValue; //当前容量上限
    private int maxlimit = 10000000; //最大上限
    private long startTime; //开始时间
    private long endTime; //结束时间

    public MaplePotionPot(int chrId, int itemId, int hp, int mp, int maxValue, long start, long end) {
        this.chrId = chrId;
        this.itemId = itemId;
        this.hp = hp;
        this.mp = mp;
        this.maxValue = maxValue;
        this.startTime = start;
        this.endTime = end;
    }

    /*
     * 生成1个药剂罐的数据
     */
    public static MaplePotionPot createPotionPot(int chrId, int itemId, long endTime) {
        if (itemId != 5820000) {
            return null;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO `character_potionpots` (`characterid`, `itemId`, `hp`, `mp`, `maxValue`, `startDate`, `endDate`) VALUES (?, ?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chrId);
            ps.setInt(2, itemId);
            ps.setInt(3, 0);
            ps.setInt(4, 0);
            ps.setInt(5, 1000000);
            ps.setLong(6, System.currentTimeMillis());
            ps.setLong(7, endTime);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("创建药剂罐信息出错 " + ex);
            return null;
        }
        MaplePotionPot ret = new MaplePotionPot(chrId, itemId, 0, 0, 1000000, System.currentTimeMillis(), endTime);
        return ret;
    }

    /*
     * 保存药剂罐数据
     */
    public void saveToDb() {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE `character_potionpots` SET `hp` = ?, `mp` = ?, `maxValue` = ? WHERE `characterid` = ?");
            ps.setInt(1, hp);
            ps.setInt(2, mp);
            ps.setInt(3, maxValue);
            ps.setInt(4, chrId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("保存药剂罐信息出错" + ex);
        }
    }

    /*
     * 角色ID
     */
    public int getChrId() {
        return chrId;
    }

    /*
     * 道具ID为： 5820000
     */
    public int getItmeId() {
        return itemId;
    }

    /*
     * 当前储存的hp数量
     */
    public int getHp() {
        if (hp < 0) {
            hp = 0;
        } else if (hp > maxValue) {
            hp = maxValue;
        }
        return hp;
    }

    public void setHp(int value) {
        hp = value;
    }

    public void addHp(int value) {
        if (value <= 0) {
            return;
        }
        hp += value;
        if (hp > maxValue) {
            hp = maxValue;
        }
    }

    /*
     * 当前储存的Mp数量
     */
    public int getMp() {
        if (mp < 0) {
            mp = 0;
        } else if (mp > maxValue) {
            mp = maxValue;
        }
        return mp;
    }

    public void setMp(int value) {
        mp = value;
    }

    public void addMp(int value) {
        if (value <= 0) {
            return;
        }
        mp += value;
        if (mp > maxValue) {
            mp = maxValue;
        }
    }

    /*
     * 默认的上限为: 1000000
     * 每次增加上限: 1000000
     * 最大容量上限: 10000000
     */
    public int getMaxValue() {
        if (maxValue > maxlimit) {
            maxValue = maxlimit;
        }
        return maxValue;
    }

    public void setMaxValue(int value) {
        maxValue = value;
    }

    public boolean addMaxValue() {
        if (maxValue + 1000000 > maxlimit) {
            return false;
        }
        maxValue += 1000000;
        return true;
    }

    /*
     * 开始时间 其实就是当前时间
     */
    public long getStartDate() {
        return startTime;
    }

    /*
     * 现在这个道具没有时间限制
     */
    public long getEndDate() {
        return endTime;
    }

    /*
     * 是否已经充满
     */
    public boolean isFullHp() {
        return getHp() >= getMaxValue();
    }

    public boolean isFullMp() {
        return getMp() >= getMaxValue();
    }

    public boolean isFull(int addHp, int addMp) {
        if (addHp > 0 && addMp > 0) {
            return isFullHp() && isFullMp();
        } else if (addHp > 0 && addMp == 0) {
            return isFullHp();
        } else if (addHp == 0 && addMp >= 0) {
            return isFullMp();
        }
        return true;
    }
}
