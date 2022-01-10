/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.inventory;

import database.DatabaseConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author PlayDK
 */
public class MapleEquipOnlyId {

    private AtomicInteger runningId;

    public static MapleEquipOnlyId getInstance() {
        return SingletonHolder.instance;
    }

    private MapleEquipOnlyId() {
        runningId = new AtomicInteger(0);
    }

    public int getNextEquipOnlyId() {
        if (runningId.get() <= 0) { //如果这个ID小于等于0 就进行初始化
            runningId.set(initOnlyId());
        } else {
            runningId.set(runningId.get() + 1); //设置新的ID为老ID + 1
        }
        return runningId.get();
    }

    public int initOnlyId() {
        int ret = 0;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT MAX(equipOnlyId) FROM inventoryitems WHERE equipOnlyId > 0");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = rs.getInt(1) + 1; //设置为当前的ID+1
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ret;
    }

    private static class SingletonHolder {

        protected static final MapleEquipOnlyId instance = new MapleEquipOnlyId();
    }
}
