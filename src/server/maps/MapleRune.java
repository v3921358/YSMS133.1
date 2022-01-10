package server.maps;

import client.MapleClient;
import tools.MaplePacketCreator;

public class MapleRune extends MapleMapObject {

    private int type, posX, posY;
    private MapleMap map;

    public MapleRune(int type, int posX, int posY, MapleMap map) {
        this.type = type;
        this.posX = posX;
        this.posY = posY;
        this.map = map;
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public MapleMap getMap() {
        return map;
    }

    public int getRuneType() {
        return type;
    }

    public int getPositionX() {
        return posX;
    }

    public int getPositionY() {
        return posY;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.spawnRune(this, false));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removeRune(this, client.getPlayer()));
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.RUNE;
    }
}
