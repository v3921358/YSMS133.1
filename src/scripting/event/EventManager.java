package scripting.event;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import javax.script.Invocable;
import javax.script.ScriptException;

import org.apache.log4j.Logger;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.squad.MapleSquad;
import server.Randomizer;
import server.RankingTop;
import server.Timer.EventTimer;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.OverrideMonsterStats;
import server.maps.*;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.packet.UIPacket;

/**
 * @author shuleai
 */
public class EventManager {

    private static int[] eventChannel = new int[2];
    private Invocable iv;
    private int channel;
    private Map<String, EventInstanceManager> instances = new WeakHashMap<>();
    private Properties props = new Properties();
    private String name;
    private static final Logger log = Logger.getLogger(EventManager.class);

    /**
     * @param cserv
     * @param iv
     * @param name
     */
    public EventManager(ChannelServer cserv, Invocable iv, String name) {
        this.iv = iv;
        this.channel = cserv.getChannel();
        this.name = name;
    }

    /**
     *
     */
    public void cancel() {
        try {
            iv.invokeFunction("cancelSchedule", (Object) null);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : cancelSchedule:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : cancelSchedule:\r\n" + ex);
        }
    }

    /**
     * @param methodName
     * @param delay
     * @return
     */
    public ScheduledFuture<?> schedule(final String methodName, long delay) {
        return EventTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                try {
                    iv.invokeFunction(methodName, (Object) null);
                } catch (Exception ex) {
                    log.error("Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                    FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                }
            }
        }, delay);
    }

    /**
     * @param methodName
     * @param delay
     * @param eim
     * @return
     */
    public ScheduledFuture<?> schedule(final String methodName, long delay, final EventInstanceManager eim) {
        return EventTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                try {
                    iv.invokeFunction(methodName, eim);
                } catch (Exception ex) {
                    log.error("Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                    FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                }
            }
        }, delay);
    }

    /**
     * @param methodName
     * @param timestamp
     * @return
     */
    public ScheduledFuture<?> scheduleAtTimestamp(final String methodName, long timestamp) {
        return EventTimer.getInstance().scheduleAtTimestamp(new Runnable() {

            @Override
            public void run() {
                try {
                    iv.invokeFunction(methodName, (Object) null);
                } catch (ScriptException ex) {
                    log.error("Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                    FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                } catch (NoSuchMethodException ex) {
                    log.error("Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                    FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                }
            }
        }, timestamp);
    }

    public ScheduledFuture<?> register(final String methodName, final long timestamp) {
        return EventTimer.getInstance().register(new Runnable() {
            @Override
            public void run() {
                try {
                    iv.invokeFunction(methodName, (Object) null);
                } catch (ScriptException | NoSuchMethodException ex) {
                    log.error("Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                    FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : " + methodName + ":\r\n" + ex);
                }
            }
        }, timestamp);
    }

    public void cancelRegister() {
        try {
            iv.invokeFunction("cancelRegister", (Object) null);
        } catch (ScriptException | NoSuchMethodException ex) {
            System.out.println("Event name : " + name + ", method Name : cancelRegister:\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : cancelRegister\r\n" + ex);
        }
    }

    public void start(String function, Object obj) {
        try {
            iv.invokeFunction(function, obj);
        } catch (ScriptException | NoSuchMethodException ex) {
            System.out.println("Event name : " + name + ", method Name : start:\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : start\r\n" + ex);
        }
    }

    /**
     * @return
     */
    public int getChannel() {
        return channel;
    }

    /**
     * @return
     */
    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    /**
     * @param name
     * @return
     */
    public EventInstanceManager getInstance(String name) {
        return instances.get(name);
    }

    /**
     * @return
     */
    public Collection<EventInstanceManager> getInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    /**
     * @param name
     * @return
     */
    public EventInstanceManager newInstance(String name) {
        EventInstanceManager ret = new EventInstanceManager(this, name, channel);
        instances.put(name, ret);
        return ret;
    }

    /**
     * @param name
     */
    public void disposeInstance(String name) {
        instances.remove(name);
        if (getProperty("state") != null && instances.isEmpty()) {
            setProperty("state", "0");
        }
        if (getProperty("leader") != null && instances.isEmpty() && getProperty("leader").equals("false")) {
            setProperty("leader", "true");
        }
        if (this.name.equals("CWKPQ")) { //hard code it because i said so
            MapleSquad squad = ChannelServer.getInstance(channel).getMapleSquad("CWKPQ");//so fkin hacky
            if (squad != null) {
                squad.clear();
                squad.copy();
            }
        }
    }

    /**
     * @return
     */
    public Invocable getIv() {
        return iv;
    }

    /**
     * @param key
     * @param value
     */
    public void setProperty(String key, String value) {
        props.setProperty(key, value);
    }

    /**
     * @param key
     * @return
     */
    public String getProperty(String key) {
        return props.getProperty(key);
    }

    /**
     * @return
     */
    public final Properties getProperties() {
        return props;
    }

    public final void setObjectProperty(final Object obj1, final Object obj2) {
        props.put(obj1, obj2);
    }

    public final Object getObjectProperty(final Object obj) {
        return props.get(obj);
    }

    /**
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     *
     */
    public void startInstance() {
        try {
            iv.invokeFunction("setup", (Object) null);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup:\r\n" + ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance_Solo(String mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", (Object) mapid);
            eim.registerPlayer(chr);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup:\r\n" + ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance(String mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", (Object) mapid);
            eim.registerCarnivalParty(chr, chr.getMap(), (byte) 0);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup:\r\n" + ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance_Party(String mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", (Object) mapid);
            eim.registerParty(chr.getParty(), chr.getMap());
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup:\r\n" + ex);
        }
    }

    //GPQ
    /**
     * @param character
     * @param leader
     */
    public void startInstance(MapleCharacter character, String leader) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            eim.registerPlayer(character);
            eim.setProperty("leader", leader);
            eim.setProperty("guildid", String.valueOf(character.getGuildId()));
            setProperty("guildid", String.valueOf(character.getGuildId()));
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-Guild:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-Guild:\r\n" + ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance_CharID(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", character.getId()));
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-CharID:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-CharID:\r\n" + ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance_CharMapID(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", character.getId(), character.getMapId()));
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-CharID:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-CharID:\r\n" + ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-character:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-character:\r\n" + ex);
        }
    }

    //PQ method: starts a PQ
    /**
     * @param party
     * @param map
     */
    public void startInstance(MapleParty party, MapleMap map) {
        startInstance(party, map, 255);
    }

    /**
     * @param party
     * @param map
     * @param maxLevel
     */
    public void startInstance(MapleParty party, MapleMap map, int maxLevel) {
        try {
            int averageLevel = 0, size = 0;
            for (MaplePartyCharacter mpc : party.getMembers()) {
                if (mpc.isOnline() && mpc.getMapid() == map.getId() && mpc.getChannel() == map.getChannel()) {
                    averageLevel += mpc.getLevel();
                    size++;
                }
            }
            if (size <= 0) {
                return;
            }
            averageLevel /= size;
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", Math.min(maxLevel, averageLevel), party.getPartyId()));
            eim.registerParty(party, map);
        } catch (ScriptException ex) {
            log.error("Event name : " + name + ", method Name : setup-partyid:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-partyid:\r\n" + ex);
        } catch (Exception ex) {
            //ignore
            startInstance_NoID(party, map, ex);
        }
    }

    /**
     * @param party
     * @param map
     */
    public void startInstance_NoID(MapleParty party, MapleMap map) {
        startInstance_NoID(party, map, null);
    }

    /**
     * @param party
     * @param map
     * @param old
     */
    public void startInstance_NoID(MapleParty party, MapleMap map, Exception old) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            eim.registerParty(party, map);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-party:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-party:\r\n" + ex + "\r\n" + (old == null ? "no old exception" : old));
        }
    }

    //non-PQ method for starting instance
    /**
     * @param eim
     * @param leader
     */
    public void startInstance(EventInstanceManager eim, String leader) {
        try {
            iv.invokeFunction("setup", eim);
            eim.setProperty("leader", leader);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-leader:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-leader:\r\n" + ex);
        }
    }

    /**
     * @param squad
     * @param map
     */
    public void startInstance(MapleSquad squad, MapleMap map) {
        startInstance(squad, map, -1);
    }

    /**
     * @param squad
     * @param map
     * @param questID
     */
    public void startInstance(MapleSquad squad, MapleMap map, int questID) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGM()) {
            int mapid = map.getId();
            int chrSize = 0;
            for (String chr : squad.getMembers()) {
                MapleCharacter player = squad.getChar(chr);
                if (player != null && player.getMapId() == mapid) {
                    chrSize++;
                }
            }
            if (chrSize < squad.getType().i) {
                squad.getLeader().dropMessage(5, "远征队中人员少于 " + squad.getType().i + " 人，无法开始远征任务。注意必须队伍中的角色在线且在同一地图。当前人数: " + chrSize);
                return;
            }
            if (name.equals("CWKPQ") && squad.getJobs().size() < 5) {
                squad.getLeader().dropMessage(5, "远征队中成员职业的类型小于5种，无法开始远征任务。");
                return;
            }
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            eim.registerSquad(squad, map, questID);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
        }
    }

    /*
     * 另外的1种记录方式
     * 默认检测远征队人数
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid) {
        startInstance(squad, map, bossid, true);
    }

    /*
     * 是否检测远征队人数
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     * @param checkSize
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid, boolean checkSize) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGM() && checkSize) {
            int mapid = map.getId();
            int chrSize = 0;
            for (String chr : squad.getMembers()) {
                MapleCharacter player = squad.getChar(chr);
                if (player != null && player.getMapId() == mapid) {
                    chrSize++;
                }
            }
            if (chrSize < squad.getType().i) { //less than 3
                squad.getLeader().dropMessage(5, "远征队中人员少于 " + squad.getType().i + " 人，无法开始远征任务。注意必须队伍中的角色在线且在同一地图。当前人数: " + chrSize);
                return;
            }
            if (name.equals("CWKPQ") && squad.getJobs().size() < 5) {
                squad.getLeader().dropMessage(5, "远征队中成员职业的类型小于5种，无法开始远征任务。");
                return;
            }
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            eim.registerSquad(squad, map, bossid);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
        }
    }

    /*
     * 检测远征队脚本指定的人数
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     * @param memberSize
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid, int memberSize) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGM()) {
            int mapid = map.getId();
            int chrSize = 0;
            for (String chr : squad.getMembers()) {
                MapleCharacter player = squad.getChar(chr);
                if (player != null && player.getMapId() == mapid) {
                    chrSize++;
                }
            }
            if (chrSize < memberSize) { //less than 3
                squad.getLeader().dropMessage(5, "远征队中人员少于 " + memberSize + " 人，无法开始远征任务。注意必须队伍中的角色在线且在同一地图。当前人数: " + chrSize);
                return;
            }
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            eim.registerSquad(squad, map, bossid);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
            FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Event name : " + name + ", method Name : setup-squad:\r\n" + ex);
        }
    }

    /**
     * @param from
     * @param to
     */
    public void warpAllPlayer(int from, int to) {
        MapleMap tomap = getMapFactory().getMap(to);
        MapleMap frommap = getMapFactory().getMap(from);
        List<MapleCharacter> list = frommap.getCharactersThreadsafe();
        if (tomap != null && frommap != null && list != null && frommap.getCharactersSize() > 0) {
            for (MapleMapObject mmo : list) {
                ((MapleCharacter) mmo).changeMap(tomap, tomap.getPortal(0));
            }
        }
    }

    /**
     * @return
     */
    public MapleMapFactory getMapFactory() {
        return getChannelServer().getMapFactory();
    }

    /**
     * @return
     */
    public OverrideMonsterStats newMonsterStats() {
        return new OverrideMonsterStats();
    }

    /**
     * *
     * 获取怪物状态
     *
     * @param hp
     * @param mp
     * @param exp
     * @return
     */
    public final OverrideMonsterStats getOverrideMonsterStats(final long hp, final int mp, final int exp) {
        return new OverrideMonsterStats(hp, mp, exp);
    }

    /**
     * @return
     */
    public List<MapleCharacter> newCharList() {
        return new ArrayList<>();
    }

    /**
     * @param id
     * @return
     */
    public MapleMonster getMonster(int id) {
        return MapleLifeFactory.getMonster(id);
    }

    public void spawnMonsterOnGroundBelow(final MapleMap map, final MapleMonster monster, final int x, final int y) {
        map.spawnMonsterOnGroundBelow(monster, new Point(x, y));
    }

    public void spawnDoJangMonster(final MapleMap map, final MapleMonster monster, final int x) {
        final Point point = new Point(x, 0);
        map.spawnMonsterWithEffect(monster, 15, point);
//            map.spawnMonsterOnGroundBelow(monster, point);
//            WorldTimer.EventTimer.getInstance().schedule(new Runnable() {
//
//                @Override
//                public void run() {
////                    map.spawnMonsterWithEffect(monster, 15, point);
//                    map.spawnMonsterOnGroundBelow(monster, point);
//                }
//            }, 5000);
    }

    /**
     * @param id
     * @return
     */
    public MapleReactor getReactor(int id) {
        return new MapleReactor(MapleReactorFactory.getReactor(id), id);
    }

    /**
     * @param mapid
     * @param effect
     */
    public void broadcastShip(int mapid, int effect) {
        getMapFactory().getMap(mapid).broadcastMessage(MaplePacketCreator.boatPacket(effect));
    }

    /**
     * @param msg
     */
    public void broadcastYellowMsg(String msg) {
        getChannelServer().broadcastPacket(MaplePacketCreator.yellowChat(msg));
    }

    /**
     * @param msg
     */
    public void broadcastServerMsg(String msg) {
        getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(6, msg));
    }

    /**
     * @param type
     * @param msg
     * @param weather
     */
    public void broadcastServerMsg(int type, String msg, boolean weather) {
        if (!weather) {
            getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(type, msg));
        } else {
            for (MapleMap load : getMapFactory().getAllMaps()) {
                if (load.getCharactersSize() > 0) {
                    load.startMapEffect(msg, type);
                }
            }
        }
    }

    public void worldSpouseMessage(int type, String message) {
        if (type == 0x00 || type == 0x01 || (type >= 0x06 && type <= 0x2A)) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(type, message));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, message));
        }
    }

    public final void worldMessageEffect(final String message, final int type, final int time) {
        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.getMapEffectMsg(message, type, time));
    }

    /**
     * @return
     */
    public boolean scheduleRandomEvent() {
        boolean omg = false;
        for (int i = 0; i < eventChannel.length; i++) {
            omg |= scheduleRandomEventInChannel(eventChannel[i]);
        }
        return omg;
    }

    /**
     * @param chz
     * @return
     */
    public boolean scheduleRandomEventInChannel(int chz) {
        final ChannelServer cs = ChannelServer.getInstance(chz);
        if (cs == null || cs.getEvent() > -1) {
            return false;
        }
        MapleEventType t = null;
        while (t == null) {
            for (MapleEventType x : MapleEventType.values()) {
                if (Randomizer.nextInt(MapleEventType.values().length) == 0 && x != MapleEventType.OxQuiz) {
                    t = x;
                    break;
                }
            }
        }
        final String msg = MapleEvent.scheduleEvent(t, cs);
        if (msg.length() > 0) {
            broadcastYellowMsg(msg);
            return false;
        }
        EventTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (cs.getEvent() >= 0) {
                    MapleEvent.setEvent(cs, true);
                }
            }
        }, 180000);
        return true;
    }

    /**
     *
     */
    public void setWorldEvent() {
        for (int i = 0; i < eventChannel.length; i++) {
            eventChannel[i] = Randomizer.nextInt(ChannelServer.getAllInstances().size() - 4) + 2 + i; //2-13
        }
    }

    /**
     * @param start
     */
    public void DoubleRateEvent(boolean start) {
        getChannelServer().setDoubleExp(start ? 2 : 1);
    }

    public byte[] showEffect(String effect) {
        return MaplePacketCreator.showEffect(effect);
    }

    public byte[] playSound(String sound) {
        return MaplePacketCreator.playSound(sound);
    }

    public byte[] getClock(int time) {
        return MaplePacketCreator.getClock(time);
    }

    public Connection getConnection() {
        return DatabaseConnection.getConnection();
    }

    public final void insertRanking(MapleCharacter player, String rankingname, int value) {
        RankingTop.getInstance().insertRanking(player, rankingname, value);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname) {
        return RankingTop.getInstance().getRanking(rankingname);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname, int previous) {
        return RankingTop.getInstance().getRanking(rankingname, previous);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname, int previous, boolean repeatable) {
        return RankingTop.getInstance().getRanking(rankingname, previous, repeatable);
    }

    public boolean addById(MapleClient c, int itemId, short quantity, String gmLog) {
        return MapleInventoryManipulator.addById(c, itemId, quantity, null, null, 0, 0, gmLog);
    }

    public boolean removeById(MapleClient c, int itemId, int quantity, boolean fromDrop, boolean consume) {
        return MapleInventoryManipulator.removeById(c, ItemConstants.getInventoryType(itemId), itemId, quantity, fromDrop, consume);
    }

    public MapleItemInformationProvider getItemInfo() {
        return MapleItemInformationProvider.getInstance();
    }

    public MapleMonsterInformationProvider getMonsterInfo() {
        return MapleMonsterInformationProvider.getInstance();
    }

    public final Item newItem(final int id, final byte position, final short quantity) {
        Item ret;
        MapleInventoryType type = ItemConstants.getInventoryType(id);
        MapleItemInformationProvider ii = getItemInfo();
        if (type.equals(MapleInventoryType.EQUIP)) {
            ret = ii.randomizeStats((Equip) ii.getEquipById(id));
        } else {
            ret = new Item(id, position, quantity);
        }
        return ret;
    }

    public final ResultSet getDataSelectFromDB(final String SQL) throws SQLException {
        return DatabaseConnection.getConnection().prepareStatement(SQL).executeQuery();
    }

    public final PreparedStatement getDataInsertFromDB(final String SQL) throws SQLException {
        return DatabaseConnection.getConnection().prepareStatement(SQL);
    }

    public final void getDataUpdateFromDB(final String SQL) throws SQLException {
        try {
            DatabaseConnection.getConnection().prepareStatement(SQL);
        } catch (SQLException ex) {
            //
        }
    }
}
