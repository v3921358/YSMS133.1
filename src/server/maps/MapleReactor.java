package server.maps;

import client.MapleCharacter;
import client.MapleClient;

import java.awt.Rectangle;

import scripting.reactor.ReactorScriptManager;
import server.Timer.MapTimer;
import tools.MaplePacketCreator;
import tools.Pair;

public class MapleReactor extends MapleMapObject {

    private int rid;
    private MapleReactorStats stats;
    private byte state = 0, facingDirection = 0;
    private int delay = -1;
    private MapleMap map;
    private String name = "";
    private boolean timerActive = false, alive = true, custom = false;

    public MapleReactor(MapleReactorStats stats, int rid) {
        this.stats = stats;
        this.rid = rid;
    }

    public void setCustom(boolean c) {
        this.custom = c;
    }

    public boolean isCustom() {
        return custom;
    }

    public void setFacingDirection(byte facingDirection) {
        this.facingDirection = facingDirection;
    }

    public byte getFacingDirection() {
        return facingDirection;
    }

    public void setTimerActive(boolean active) {
        this.timerActive = active;
    }

    public boolean isTimerActive() {
        return timerActive;
    }

    public int getReactorId() {
        return rid;
    }

    public void setState(byte state) {
        this.state = state;
    }

    public byte getState() {
        return state;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public int getDelay() {
        return delay;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.REACTOR;
    }

    public int getReactorType() {
        return stats.getType(state);
    }

    public byte getTouch() {
        return stats.canTouch(state);
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public MapleMap getMap() {
        return map;
    }

    public Pair<Integer, Integer> getReactItem() {
        return stats.getReactItem(state);
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.destroyReactor(this));
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.spawnReactor(this));
    }

    public void forceStartReactor(MapleClient c) {
        ReactorScriptManager.getInstance().act(c, this);
    }

    public void forceHitReactor(byte newState) {
        forceHitReactor(null, newState);
    }

    public void forceHitReactor(MapleCharacter chr, byte newState) {
        setState(newState);
        setTimerActive(false);
        map.broadcastMessage(MaplePacketCreator.triggerReactor(chr, this, (short) 0));
    }

    //hitReactor command for item-triggered reactors
    public void hitReactor(MapleClient c) {
        hitReactor(0, (short) 0, c);
    }

    public void forceTrigger() {
        map.broadcastMessage(MaplePacketCreator.triggerReactor(null, this, (short) 0));
    }

    public void delayedDestroyReactor(long delay) {
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                map.destroyReactor(getObjectId());
            }
        }, delay);
    }

    public void hitReactor(int charPos, short stance, MapleClient c) {
        if (stats.getType(state) < 999 && stats.getType(state) != -1) {
            //type 2 = only hit from right (kerning swamp plants), 00 is air left 02 is ground left
            byte oldState = state;
            if (!(stats.getType(state) == 2 && (charPos == 0 || charPos == 2))) { // next state
                state = stats.getNextState(state);

                if (stats.getNextState(state) == -1 || stats.getType(state) == 999) { //end of reactor
                    if ((stats.getType(state) < 100 || stats.getType(state) == 999) && delay > 0) { //reactor broken
                        map.destroyReactor(getObjectId());
                    } else { //item-triggered on step
                        map.broadcastMessage(MaplePacketCreator.triggerReactor(c.getPlayer(), this, stance));
                    }
                    //if (rid > 200011) {
                    ReactorScriptManager.getInstance().act(c, this);
                    //}
                } else { //reactor not broken yet
                    boolean done = false;
                    map.broadcastMessage(MaplePacketCreator.triggerReactor(c.getPlayer(), this, stance)); //magatia is weird cause full beaker can be activated by gm hat o.o
                    if (state == stats.getNextState(state) || rid == 2618000 || rid == 2309000) { //current state = next state, looping reactor
                        if (rid > 200011) {
                            ReactorScriptManager.getInstance().act(c, this);
                        }
                        done = true;
                    }
                    if (stats.getTimeOut(state) > 0) {
                        if (!done && rid > 200011) {
                            ReactorScriptManager.getInstance().act(c, this);
                        }
                        scheduleSetState(c.getPlayer(), state, oldState, stats.getTimeOut(state));
                    }
                }
            }
        }
    }

    public Rectangle getArea() {
        int height = stats.getBR().y - stats.getTL().y;
        int width = stats.getBR().x - stats.getTL().x;
        int origX = getTruePosition().x + stats.getTL().x;
        int origY = getTruePosition().y + stats.getTL().y;
        return new Rectangle(origX, origY, width, height);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "????????? ??????ID:" + getObjectId() + " ReactorID: " + rid + " ??????: " + getPosition().x + "/" + getPosition().y + " ??????: " + state + " ??????: " + stats.getType(state);
    }

    public void delayedHitReactor(final MapleClient c, final long delay) {
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                hitReactor(c);
            }
        }, delay);
    }

    public void scheduleSetState(final MapleCharacter chr, final byte oldState, final byte newState, final long delay) {
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (MapleReactor.this.state == oldState) {
                    forceHitReactor(chr, newState);
                }
            }
        }, delay);
    }
}
