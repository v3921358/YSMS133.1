package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import tools.packet.SummonPacket;

public class MapleDragon extends AnimatedMapleMapObject {

    private int owner, jobid;

    public MapleDragon(MapleCharacter owner) {
        super();
        this.owner = owner.getId();
        this.jobid = owner.getJob();
        if (jobid < 2200 || jobid > 2218) {
            throw new RuntimeException("试图生成1个龙龙的信息，但角色不是龙神职业.");
        }
        setPosition(owner.getTruePosition());
        setStance(4);
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write(SummonPacket.spawnDragon(this));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(SummonPacket.removeDragon(this.owner));
    }

    public int getOwner() {
        return this.owner;
    }

    public int getJobId() {
        return this.jobid;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.SUMMON;
    }
}
