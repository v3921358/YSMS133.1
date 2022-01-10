package handling.world.sidekick;

import client.MapleBuffStat;
import client.MapleCharacter;
import database.DatabaseConnection;
import handling.world.WorldBroadcastService;
import handling.world.WorldSidekickService;

import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import tools.Pair;
import tools.packet.BuffPacket;
import tools.packet.PartyPacket;

public class MapleSidekick implements Serializable {

    private static final long serialVersionUID = 954199343336738569L;
    private MapleSidekickCharacter[] sidekicks = new MapleSidekickCharacter[2];
    private int id;

    public MapleSidekick(int sid) {
        this.id = sid;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM sidekicks WHERE id = ?");
            ps.setInt(1, sid);
            ResultSet rs = ps.executeQuery();
            if (!rs.first()) {
                rs.close();
                ps.close();
                id = -1;
                return;
            }
            PreparedStatement ps2 = con.prepareStatement("SELECT id, name, level, job, mapid FROM characters WHERE id = ? OR id = ?");
            ps.setInt(1, rs.getInt("firstid"));
            ps.setInt(2, rs.getInt("secondid"));
            ResultSet rs2 = ps.executeQuery();
            while (rs2.next()) {
                sidekicks[rs2.getInt("id") == rs.getInt("firstid") ? 0 : 1] = new MapleSidekickCharacter(rs2.getInt("id"), rs2.getString("name"), rs2.getInt("level"), rs2.getInt("job"), rs2.getInt("mapid"));
            }
            rs2.close();
            ps2.close();
            if (sidekicks[0] == null || sidekicks[1] == null || !checkLevels(sidekicks[0].getLevel(), sidekicks[1].getLevel())) {
                id = -1;
                eraseToDB();
            }
        } catch (SQLException se) {
            System.err.println("unable to read sidekick information from sql" + se);
        }
    }

    public void broadcast(byte[] packet) {
        WorldBroadcastService.getInstance().sendPacket(sidekicks[0].getId(), packet);
        WorldBroadcastService.getInstance().sendPacket(sidekicks[1].getId(), packet);
    }

    public final void eraseToDB() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM sidekicks WHERE id = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            ps.close();
            broadcast(PartyPacket.disbandSidekick(this));
            WorldSidekickService.getInstance().eraseSidekick(id);
        } catch (SQLException se) {
            System.err.println("Error deleting sidekick" + se);
        }
    }

    public void applyBuff(MapleCharacter chr) { //79797980? magic number
        List<Pair<MapleBuffStat, Integer>> effects = new ArrayList<>();
        int levelD = Math.abs(getCharacter(0).getLevel() - getCharacter(1).getLevel());
        effects.add(new Pair<>(MapleBuffStat.增加力量, levelD * 5));
        effects.add(new Pair<>(MapleBuffStat.增加敏捷, levelD * 5));
        effects.add(new Pair<>(MapleBuffStat.增加智力, levelD * 5));
        effects.add(new Pair<>(MapleBuffStat.增加运气, levelD * 5));
        effects.add(new Pair<>(MapleBuffStat.SIDEKICK_PASSIVE, 1));

        chr.getClient().getSession().write(BuffPacket.giveBuff(79797980, 2100000000, effects, null, chr));
        MapleStatEffect eff = MapleItemInformationProvider.getInstance().getItemEffect(2022891); //sidekick power
        chr.cancelEffectFromBuffStat(MapleBuffStat.SIDEKICK_PASSIVE);
        chr.registerEffect(eff, System.currentTimeMillis(), null, effects, false, 2100000000, chr.getId());
    }

    public static int create(int leaderId, int leaderId2) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT id FROM sidekicks WHERE firstid = ? OR secondid = ? OR firstid = ? OR secondid = ?");
            ps.setInt(1, leaderId);
            ps.setInt(2, leaderId2);
            ps.setInt(3, leaderId);
            ps.setInt(4, leaderId2);
            ResultSet rs = ps.executeQuery();
            if (rs.first()) {// taken
                rs.close();
                ps.close();
                return 0;
            }
            ps.close();
            rs.close();
            ps = con.prepareStatement("INSERT INTO sidekicks (firstid, secondid) VALUES (?, ?)", Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, leaderId);
            ps.setInt(2, leaderId2);
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            int ret = 0;
            if (rs.next()) {
                ret = rs.getInt(1);
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException se) {
            System.err.println("Error create sidekick" + se);
            return 0;
        }
    }

    public static List<MapleSidekick> loadAll() {
        List<MapleSidekick> ret = new ArrayList<>();
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT id FROM sidekicks");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ret.add(new MapleSidekick(rs.getInt("id")));
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            System.err.println("unable to read sidekick information from sql" + se);
        }
        return ret;
    }

    public List<String> getSidekickMsg(boolean online) {
        List<String> ret = new ArrayList<>();
        if (!online) {
            ret.add("You may only get benefits from the sidekick if they are in the same map.");
        }
        if (getCharacter(0).getLevel() > 140 || getCharacter(1).getLevel() > 140) {
            ret.add("The sidekick relationship will end if one player gets above level 150.");
        }
        if (Math.abs(getCharacter(0).getLevel() - getCharacter(1).getLevel()) < 5 || Math.abs(getCharacter(0).getLevel() - getCharacter(1).getLevel()) > 30) {
            ret.add("The sidekick relationship will end if the level difference is less than 5 or greater than 30.");
        }
        return ret;
    }

    public static boolean checkLevels(int level1, int level2) {
        return !(Math.abs(level1 - level2) < 5 || Math.abs(level1 - level2) > 30 || level1 > 150 || level2 > 150 || level1 < 10 || level2 < 10);
    }

    public int getId() {
        return id;
    }

    public MapleSidekickCharacter getCharacter(int index) {
        return sidekicks[index];
    }

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        MapleSidekick other = (MapleSidekick) obj;
        return id == other.id;
    }
}
