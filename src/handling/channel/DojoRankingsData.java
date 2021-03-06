/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.channel;

import database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DojoRankingsData {

    private static DojoRankingsData instance = new DojoRankingsData();
    private static int limit = 25;
    public String[] names = new String[limit];
    public long[] times = new long[limit];
    public int[] ranks = new int[limit];
    public int totalCharacters = 0;

    private DojoRankingsData() {
    }

    public static DojoRankingsData getInstance() {
        return instance;
    }

    public static DojoRankingsData loadLeaderboard() {
        DojoRankingsData ret = new DojoRankingsData();
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT `name`, `time` FROM `dojorankings` ORDER BY `time` ASC LIMIT " + limit);
            ResultSet rs = ps.executeQuery();

            int i = 0;
            while (rs.next()) {
                if (rs.getInt("time") != 0) {
                    //long time = (rs.getLong("endtime") - rs.getLong("starttime")) / 1000;
                    ret.ranks[i] = (i + 1);
                    ret.names[i] = rs.getString("name");
                    ret.times[i] = rs.getInt("time");
                    // ret.times[i] = time;
                    ret.totalCharacters++;
                    i++;
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return ret;
    }
}
