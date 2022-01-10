package server.movement;

import java.awt.Point;

import tools.data.output.MaplePacketLittleEndianWriter;

public class TeleportMovement extends AbsoluteLifeMovement {

    private short fh;

    public TeleportMovement(int type, Point position, int duration, int newstate) {
        super(type, position, duration, newstate);
    }

    public void setFh(short fh) {
        this.fh = fh;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter lew) {
        lew.write(getType());
        lew.writePos(getPosition());
        lew.writeShort(fh);
        lew.write(getNewstate());
        lew.writeShort(getDuration());
        lew.write(0);
    }
}
