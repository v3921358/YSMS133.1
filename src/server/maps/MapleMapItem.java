package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;

import java.awt.Point;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import tools.packet.InventoryPacket;

public class MapleMapItem extends MapleMapObject {

    protected Item item;
    protected MapleMapObject dropper;
    protected int character_ownerid, meso = 0, questid = -1;
    protected byte type;
    protected boolean pickedUp = false, playerDrop, randDrop = false;
    protected long nextExpiry = 0, nextFFA = 0;
    private ReentrantLock lock = new ReentrantLock();

    public MapleMapItem(Item item, Point position, MapleMapObject dropper, MapleCharacter owner, byte type, boolean playerDrop) {
        setPosition(position);
        this.item = item;
        this.dropper = dropper;
        this.character_ownerid = owner.getId();
        this.type = type;
        this.playerDrop = playerDrop;
    }

    public MapleMapItem(Item item, Point position, MapleMapObject dropper, MapleCharacter owner, byte type, boolean playerDrop, int questid) {
        setPosition(position);
        this.item = item;
        this.dropper = dropper;
        this.character_ownerid = owner.getId();
        this.type = type;
        this.playerDrop = playerDrop;
        this.questid = questid;
    }

    public MapleMapItem(int meso, Point position, MapleMapObject dropper, MapleCharacter owner, byte type, boolean playerDrop) {
        setPosition(position);
        this.item = null;
        this.dropper = dropper;
        this.character_ownerid = owner.getId();
        this.meso = meso;
        this.type = type;
        this.playerDrop = playerDrop;
    }

    public MapleMapItem(Point position, Item item) {
        setPosition(position);
        this.item = item;
        this.character_ownerid = 0;
        this.type = 2;
        this.playerDrop = false;
        this.randDrop = true;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item z) {
        this.item = z;
    }

    public int getQuest() {
        return questid;
    }

    public int getItemId() {
        if (getMeso() > 0) {
            return meso;
        }
        return item.getItemId();
    }

    public MapleMapObject getDropper() {
        return dropper;
    }

    public int getOwner() {
        return character_ownerid;
    }

    public int getMeso() {
        return meso;
    }

    public boolean isPlayerDrop() {
        return playerDrop;
    }

    public boolean isPickedUp() {
        return pickedUp;
    }

    public void setPickedUp(boolean pickedUp) {
        this.pickedUp = pickedUp;
    }

    public byte getDropType() {
        return type;
    }

    public void setDropType(byte z) {
        this.type = z;
    }

    public boolean isRandDrop() {
        return randDrop;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.ITEM;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (questid <= 0 || (client.getPlayer().getQuestStatus(questid) == 1 && client.getPlayer().needQuestItem(questid, item.getItemId()))) {
            client.getSession().write(InventoryPacket.dropItemFromMapObject(this, this.getPosition(), getTruePosition(), (byte) 2));
        }
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(InventoryPacket.removeItemFromMap(getObjectId(), 1, 0));
    }

    public Lock getLock() {
        return lock;
    }

    public void registerExpire(long time) {
        nextExpiry = System.currentTimeMillis() + time;
    }

    public void registerFFA(long time) {
        nextFFA = System.currentTimeMillis() + time;
    }

    public boolean shouldExpire(long now) {
        return !pickedUp && nextExpiry > 0 && nextExpiry < now;
    }

    public boolean shouldFFA(long now) {
        return !pickedUp && type < 2 && nextFFA > 0 && nextFFA < now;
    }

    public boolean hasFFA() {
        return nextFFA > 0;
    }

    public void expire(MapleMap map) {
        pickedUp = true;
        map.broadcastMessage(InventoryPacket.removeItemFromMap(getObjectId(), 0, 0));
        map.removeMapObject(this);
    }
}
