package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import tools.MaplePacketCreator;

public class MapleExtractor extends MapleMapObject {

    public int owner, timeLeft, itemId, fee;
    public long startTime;
    public String ownerName;

    public MapleExtractor(MapleCharacter owner, int itemId, int fee, int timeLeft) {
        super();
        this.owner = owner.getId();
        this.itemId = itemId;
        this.fee = fee;
        this.ownerName = owner.getName();
        this.startTime = System.currentTimeMillis();
        this.timeLeft = timeLeft;
        setPosition(owner.getPosition());
    }

    public int getTimeLeft() {
        return timeLeft;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.makeExtractor(owner, ownerName, getTruePosition(), getTimeLeft(), itemId, fee));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removeExtractor(this.owner));
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.EXTRACTOR;
    }
}
