package server.events;

import client.MapleCharacter;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import server.MapleInventoryManipulator;
import server.RandomRewards;
import server.Randomizer;
import server.Timer.EventTimer;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.maps.SavedLocationType;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.StringUtil;

public abstract class MapleEvent {

    protected MapleEventType type;
    protected int channel, playerCount = 0;
    protected boolean isRunning = false;

    public MapleEvent(int channel, MapleEventType type) {
        this.channel = channel;
        this.type = type;
    }

    public void incrementPlayerCount() {
        playerCount++;
        if (playerCount == 250) {
            setEvent(ChannelServer.getInstance(channel), true);
        }
    }

    public MapleEventType getType() {
        return type;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public MapleMap getMap(int i) {
        return getChannelServer().getMapFactory().getMap(type.mapids[i]);
    }

    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    public void broadcast(byte[] packet) {
        for (int i = 0; i < type.mapids.length; i++) {
            getMap(i).broadcastMessage(packet);
        }
    }

    public static void givePrize(MapleCharacter chr) {
        int reward = RandomRewards.getEventReward();
        if (reward == 0) {
            int mes = Randomizer.nextInt(900000) + 100000;
            chr.gainMeso(mes, true, false);
            chr.dropMessage(5, "你获得了 " + mes + " 金币.");
        } else if (reward == 1) {
            int cs = Randomizer.nextInt(50) + 50;
            chr.modifyCSPoints(1, cs, true);
            chr.dropMessage(5, "你获得了 " + cs + " 点点卷.");
        } else if (reward == 2) {
            int fe = Randomizer.nextInt(5) + 1;
            chr.addFame(fe);
            chr.dropMessage(5, "你获得了 " + fe + " 点人气.");
        } else if (reward == 3) {
            chr.dropMessage(5, "你悲剧了，什么也没得到.");
        } else {
            int max_quantity = 1;
            switch (reward) {
                case 5062000: //编号:　5062000  名称:　神奇魔方
                    max_quantity = 1;
                    break;
                case 5220040: //编号:　5220040  名称:　冒险岛转蛋券
                    max_quantity = 1;
                    break;
                case 5062002: //编号:　5062002  名称:　高级神奇魔方
                    max_quantity = 1;
                    break;
            }
            final int quantity = (max_quantity > 1 ? Randomizer.nextInt(max_quantity) : 0) + 1;
            if (MapleInventoryManipulator.checkSpace(chr.getClient(), reward, quantity, "")) {
                MapleInventoryManipulator.addById(chr.getClient(), reward, (short) quantity, "活动获得 " + FileoutputUtil.CurrentReadable_Date());
            } else {
                givePrize(chr); //do again until they get
            }
        }
    }

    public abstract void finished(MapleCharacter chr); //most dont do shit here

    public abstract void startEvent();

    public void onMapLoad(MapleCharacter chr) { //most dont do shit here
        if (GameConstants.isEventMap(chr.getMapId()) && FieldLimitType.Event.check(chr.getMap().getFieldLimit()) && FieldLimitType.Event2.check(chr.getMap().getFieldLimit())) {
            chr.getClient().getSession().write(MaplePacketCreator.showEventInstructions());
        }
    }

    public void warpBack(MapleCharacter chr) {
        int map = chr.getSavedLocation(SavedLocationType.EVENT);
        if (map <= -1) {
            map = 104000000;
        }
        final MapleMap mapp = chr.getClient().getChannelServer().getMapFactory().getMap(map);
        chr.changeMap(mapp, mapp.getPortal(0));
    }

    public void reset() {
        isRunning = true;
        playerCount = 0;
    }

    public void unreset() {
        isRunning = false;
        playerCount = 0;
    }

    public static void setEvent(ChannelServer cserv, boolean auto) {
        if (auto && cserv.getEvent() > -1) {
            for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = cserv.getEvent(t);
                if (e.isRunning) {
                    for (int i : e.type.mapids) {
                        if (cserv.getEvent() == i) {
                            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0, "Entries for the event are now closed!"));
                            e.broadcast(MaplePacketCreator.serverNotice(0, "The event will start in 30 seconds!"));
                            e.broadcast(MaplePacketCreator.getClock(30));
                            EventTimer.getInstance().schedule(new Runnable() {

                                @Override
                                public void run() {
                                    e.startEvent();
                                }
                            }, 30000);
                            break;
                        }
                    }
                }
            }
        }
        cserv.setEvent(-1);
    }

    public static void mapLoad(MapleCharacter chr, int channel) {
        if (chr == null) {
            return;
        } //o_o
        for (MapleEventType t : MapleEventType.values()) {
            final MapleEvent e = ChannelServer.getInstance(channel).getEvent(t);
            if (e.isRunning) {
                if (chr.getMapId() == 109050000) { //finished map
                    e.finished(chr);
                }
                for (int i = 0; i < e.type.mapids.length; i++) {
                    if (chr.getMapId() == e.type.mapids[i]) {
                        e.onMapLoad(chr);
                        if (i == 0) { //first map
                            e.incrementPlayerCount();
                        }
                    }
                }
            }
        }
    }

    public static void onStartEvent(MapleCharacter chr) {
        for (MapleEventType t : MapleEventType.values()) {
            MapleEvent e = chr.getClient().getChannelServer().getEvent(t);
            if (e.isRunning) {
                for (int i : e.type.mapids) {
                    if (chr.getMapId() == i) {
                        e.startEvent();
                        setEvent(chr.getClient().getChannelServer(), false);
                        chr.dropMessage(5, String.valueOf(t.desc) + " has been started.");
                    }
                }
            }
        }
    }

    public static String scheduleEvent(MapleEventType event, ChannelServer cserv) {
        if (cserv.getEvent() != -1 || cserv.getEvent(event) == null) {
            return "The event must not have been already scheduled.";
        }
        for (int i : cserv.getEvent(event).type.mapids) {
            if (cserv.getMapFactory().getMap(i).getCharactersSize() > 0) {
                return "The event is already running.";
            }
        }
        cserv.setEvent(cserv.getEvent(event).type.mapids[0]);
        cserv.getEvent(event).reset();
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0, "Hello " + cserv.getServerName() + "! Let's play a " + StringUtil.makeEnumHumanReadable(event.desc) + " event in channel " + cserv.getChannel()));
        return "";
    }
}
