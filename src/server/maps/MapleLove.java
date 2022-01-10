/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.maps;

import client.MapleCharacter;
import client.MapleClient;

import java.awt.Point;

import tools.MaplePacketCreator;

/**
 * @author PlayDK
 */
public class MapleLove extends MapleMapObject {

    private Point pos;
    private MapleCharacter owner;
    private String text;
    private int ft;
    private int itemid;

    public MapleLove(MapleCharacter owner, Point pos, int ft, String text, int itemid) {
        this.owner = owner;
        this.pos = pos;
        this.text = text;
        this.ft = ft;
        this.itemid = itemid;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.LOVE;
    }

    @Override
    public Point getPosition() {
        return pos.getLocation();
    }

    public MapleCharacter getOwner() {
        return owner;
    }

    public int getItemId() {
        return itemid;
    }

    @Override
    public void setPosition(Point position) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void sendSpawnData(MapleClient c) {
        c.getSession().write(MaplePacketCreator.spawnLove(getObjectId(), itemid, owner.getName(), text, pos, ft));
    }

    @Override
    public void sendDestroyData(MapleClient c) {
        c.getSession().write(MaplePacketCreator.removeLove(getObjectId(), itemid));
    }
}
