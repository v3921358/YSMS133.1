/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.skill;

import client.MapleBuffStat;

import java.io.Serializable;

import tools.data.output.MaplePacketLittleEndianWriter;

public abstract class MapleForeignBuffStat implements Serializable {

    static final long serialVersionUID = 9179541993413798759L;

    public abstract void writePacket(MaplePacketLittleEndianWriter mplew, int value);

    private MapleBuffStat stat;

    private MapleForeignBuffStat() {
    }

    public MapleForeignBuffStat(MapleBuffStat stat) {
        this.stat = stat;
    }

    public MapleBuffStat getStat() {
        return stat;
    }
}
