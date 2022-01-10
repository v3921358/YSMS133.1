package client.skills;

import java.io.Serializable;

public class SkillEntry implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    public int skillevel, teachId;
    public byte masterlevel, position, rank;
    public long expiration;

    /*
     * 普通技能设置
     */
    public SkillEntry(int skillevel, byte masterlevel, long expiration) {
        this.skillevel = skillevel;
        this.masterlevel = masterlevel;
        this.expiration = expiration;
        this.teachId = 0;
        this.position = -1;
    }

    /*
     * 传授技能设置
     */
    public SkillEntry(int skillevel, byte masterlevel, long expiration, int teachId) {
        this.skillevel = skillevel;
        this.masterlevel = masterlevel;
        this.expiration = expiration;
        this.teachId = teachId;
        this.position = -1;
    }

    /*
     * 复制技能设置
     */
    public SkillEntry(int skillevel, byte masterlevel, long expiration, int teachId, byte position) {
        this.skillevel = skillevel;
        this.masterlevel = masterlevel;
        this.expiration = expiration;
        this.teachId = teachId;
        this.position = position;
    }

    @Override
    public String toString() {
        return skillevel + ":" + masterlevel;
    }
}
