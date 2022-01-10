/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import java.io.Serializable;

/**
 * 角色卡系统
 *
 * @author PlayDK
 */
public class CardData implements Serializable {

    private static final long serialVersionUID = 2550550428979893978L;
    public int chrId;
    public short job;
    public short level;

    public CardData(int cid, short level, short job) {
        this.chrId = cid;
        this.level = level;
        this.job = job;
    }

    @Override
    public String toString() {
        return "角色ID: " + chrId + " 职业ID: " + job + " 等级: " + level;
    }
}
