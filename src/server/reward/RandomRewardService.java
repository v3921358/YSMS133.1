/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.reward;

import database.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import server.Randomizer;

/**
 * @author admin
 */
public class RandomRewardService {

    private final Map<Integer, ArrayList<RewardDropEntry>> rewards = new HashMap<>();

    public static RandomRewardService getInstance() {
        return SingletonHolder.instance;
    }

    public void loadRewards() {
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT dropperid FROM drop_data_special");
            rs = ps.executeQuery();
            List<Integer> dropperIds = new ArrayList<>();
            while (rs.next()) {
                int mobId = rs.getInt("dropperid");
                if (!dropperIds.contains(mobId)) {
                    loadRewards(mobId);
                    dropperIds.add(mobId);
                }
            }
            rs.close();
            ps.close();
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

    public void loadRewards(int dropperId) {
        ArrayList<RewardDropEntry> ret = new ArrayList<>();

        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM drop_data_special WHERE dropperid = ?");
            ps.setInt(1, dropperId);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.add(new RewardDropEntry(
                        rs.getInt("itemid"),
                        rs.getInt("chance"),
                        rs.getInt("quantity"),
                        rs.getInt("msgType"),
                        rs.getInt("period"),
                        rs.getInt("state")));
            }
            rs.close();
            ps.close();
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
        rewards.put(dropperId, ret);
    }

    public ArrayList<RewardDropEntry> retrieveReward(int dropperId) {
        return rewards.get(dropperId);
    }

    public RewardDropEntry getReward(int dropperId) {
        ArrayList<RewardDropEntry> dropEntry = retrieveReward(dropperId);
        if (dropEntry == null) {
            return null;
        }
        int chance = (int) Math.floor(Math.random() * 1000);
        ArrayList<RewardDropEntry> ret = new ArrayList<>();
        for (RewardDropEntry de : dropEntry) {
            if (de.chance >= chance) {
                ret.add(de);
            }
        }
        if (ret.isEmpty()) {
            return null;
        }
        Collections.shuffle(ret);
        return ret.get(Randomizer.nextInt(ret.size()));
    }

    /*
     * 清理以前的然后重新加载
     */
    public void clearRewards() {
        rewards.clear();
        loadRewards();
    }

    private static class SingletonHolder {

        protected static final RandomRewardService instance = new RandomRewardService();
    }
}
