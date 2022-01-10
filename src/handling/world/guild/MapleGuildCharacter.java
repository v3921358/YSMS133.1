package handling.world.guild;

import client.MapleCharacter;

import java.io.Serializable;

public class MapleGuildCharacter implements Serializable {

    public static final long serialVersionUID = 2058609046116597760L;
    private byte channel = -1, guildrank, allianceRank;
    private short level;
    private int id, jobid, guildid, guildContribution;
    private boolean online;
    private String name;

    /*
     * 从在线角色读取信息
     */
    public MapleGuildCharacter(MapleCharacter chr) {
        name = chr.getName();
        level = chr.getLevel();
        id = chr.getId();
        channel = (byte) chr.getClient().getChannel();
        jobid = chr.getJob();
        guildrank = chr.getGuildRank();
        guildid = chr.getGuildId();
        guildContribution = chr.getGuildContribution();
        allianceRank = chr.getAllianceRank();
        online = true;
    }

    /*
     * 从数据库中读取家族成员信息时需要这个
     */
    public MapleGuildCharacter(int id, short lv, String name, byte channel, int job, byte rank, int guildContribution, byte allianceRank, int guildid, boolean on) {
        this.level = lv;
        this.id = id;
        this.name = name;
        if (on) {
            this.channel = channel;
        }
        this.jobid = job;
        this.online = on;
        this.guildrank = rank;
        this.allianceRank = allianceRank;
        this.guildContribution = guildContribution;
        this.guildid = guildid;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(short l) {
        level = l;
    }

    public int getId() {
        return id;
    }

    public void setChannel(byte ch) {
        channel = ch;
    }

    public int getChannel() {
        return channel;
    }

    public int getJobId() {
        return jobid;
    }

    public void setJobId(int job) {
        jobid = job;
    }

    public int getGuildId() {
        return guildid;
    }

    public void setGuildId(int gid) {
        guildid = gid;
    }

    public void setGuildRank(byte rank) {
        guildrank = rank;
    }

    public byte getGuildRank() {
        return guildrank;
    }

    public void setGuildContribution(int c) {
        this.guildContribution = c;
    }

    public int getGuildContribution() {
        return guildContribution;
    }

    public boolean isOnline() {
        return online;
    }

    public String getName() {
        return name;
    }

    public void setOnline(boolean f) {
        online = f;
    }

    public void setAllianceRank(byte rank) {
        allianceRank = rank;
    }

    public byte getAllianceRank() {
        return allianceRank;
    }
}
