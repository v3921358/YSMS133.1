package handling.channel;

import client.MapleCharacter;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.MapleServerHandler;
import handling.ServerType;
import handling.login.LoginServer;
import handling.mina.MapleCodecFactory;
import handling.world.CheaterData;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;

import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.buffer.SimpleBufferAllocator;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
import scripting.event.EventScriptManager;
import server.squad.MapleSquad;
import server.squad.MapleSquadType;
import server.ServerProperties;
import server.events.*;
import server.life.PlayerNPC;
import server.maps.AramiaFireWorks;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.market.MarketEngine;
import server.shops.HiredMerchant;
import server.shops.HiredMerchantSave;
import tools.ConcurrentEnumMap;
import tools.MaplePacketCreator;

public class ChannelServer {

    public static long serverStartTime;
    private int expRate, mesoRate, dropRate, cashRate, traitRate, stateRate, statLimit, createGuildCost, globalRate;
    private int autoPaoDian, autoGain, autoNx, merchantTime, killMobRewardPoint, reliveCount, reliveCost, reliveItem;
    private short port;
    private static final short DEFAULT_PORT = 7575;
    private int channel, running_MerchantID = 0, flags = 0, doubleExp = 1, sharePrice = 0;
    private String serverMessage, ip, serverName;
    private boolean shutdown = false, finishedShutdown = false, MegaphoneMuteState = false, adminOnly = false, canPvp = false, shieldWardAll = false, autoPoints = false, mPointstobuy = true;
    private boolean checkSp = false, checkCash = false, useMapScript = false, blockSkill = false;
    private PlayerStorage players;
    private IoAcceptor acceptor;
    private final MapleMapFactory mapFactory;
    private EventScriptManager eventSM;
    private MarketEngine me = new MarketEngine();
    private AramiaFireWorks works = new AramiaFireWorks();
    private static Map<Integer, ChannelServer> instances = new HashMap<>();
    private Map<MapleSquadType, MapleSquad> mapleSquads = new ConcurrentEnumMap<>(MapleSquadType.class);
    private Map<Integer, HiredMerchant> merchants = new HashMap<>();
    private List<PlayerNPC> playerNPCs = new LinkedList<>();
    private ReentrantReadWriteLock merchLock = null; //???????????????????????????
    private ReadLock mcReadLock = null;  // ??????
    private WriteLock mcWriteLock = null; // ??????
    private int eventmap = -1;
    private final Map<MapleEventType, MapleEvent> events = new EnumMap<>(MapleEventType.class);
    private String ShopPack;
    Connection shareCon;
    private static final Logger log = Logger.getLogger(ChannelServer.class);
    private int maxConnOfIPaddr, connctCheckTime, keepConnectTimeOut;

    private ChannelServer(int channel) {
        this.channel = channel;
        mapFactory = new MapleMapFactory(channel);
        // ?????????????????????????????????
        merchLock = new ReentrantReadWriteLock(true);
        mcReadLock = merchLock.readLock();
        mcWriteLock = merchLock.writeLock();
    }

    public static Set<Integer> getAllInstance() {
        return new HashSet<>(instances.keySet());
    }

    public void loadEvents() {
        if (!events.isEmpty()) {
            return;
        }
        events.put(MapleEventType.CokePlay, new MapleCoconut(channel, MapleEventType.CokePlay)); //yep, coconut. same shit
        events.put(MapleEventType.Coconut, new MapleCoconut(channel, MapleEventType.Coconut));
        events.put(MapleEventType.Fitness, new MapleFitness(channel, MapleEventType.Fitness));
        events.put(MapleEventType.OlaOla, new MapleOla(channel, MapleEventType.OlaOla));
        events.put(MapleEventType.OxQuiz, new MapleOxQuiz(channel, MapleEventType.OxQuiz));
        events.put(MapleEventType.Snowball, new MapleSnowball(channel, MapleEventType.Snowball));
        events.put(MapleEventType.Survival, new MapleSurvival(channel, MapleEventType.Survival));
    }

    public void run_startup_configurations() {
        setChannel(channel); //instances.put
        try {
            expRate = Integer.parseInt(ServerProperties.getProperty("world.exp", "10")); //??????????????????
            mesoRate = Integer.parseInt(ServerProperties.getProperty("world.meso", "10")); //??????????????????
            dropRate = Integer.parseInt(ServerProperties.getProperty("world.drop", "3")); //??????????????????
            cashRate = Integer.parseInt(ServerProperties.getProperty("world.cash", "1")); //??????????????????
            globalRate = Integer.parseInt(ServerProperties.getProperty("world.globalRate", "1")); //??????????????????
            traitRate = Integer.parseInt(ServerProperties.getProperty("world.trait", "1")); //????????????????????????
            stateRate = Integer.parseInt(ServerProperties.getProperty("world.state", "4")); //????????????????????????
            statLimit = Integer.parseInt(ServerProperties.getProperty("world.statLimit", "999")); //???????????????
            autoNx = Integer.parseInt(ServerProperties.getProperty("world.autoNx", "10")); //??????????????????
            autoGain = Integer.parseInt(ServerProperties.getProperty("world.autoGain", "10")); //??????????????????
            autoPaoDian = Integer.parseInt(ServerProperties.getProperty("world.autoPaoDian", "1")); //?????????????????????
            createGuildCost = Integer.parseInt(ServerProperties.getProperty("world.createGuildCost", "10000000")); //?????????????????????
            merchantTime = Integer.parseInt(ServerProperties.getProperty("world.merchantTime", "24")); //???????????????????????????
            serverMessage = ServerProperties.getProperty("world.serverMessage"); //??????????????????
            serverName = ServerProperties.getProperty("login.serverName"); //????????????
            flags = Integer.parseInt(ServerProperties.getProperty("world.flags", "0")); //????????????  0: ??? 1: ?????? 2: ??? 3: ???
            adminOnly = Boolean.parseBoolean(ServerProperties.getProperty("world.admin", "false")); //?????????GM??????
            canPvp = Boolean.parseBoolean(ServerProperties.getProperty("world.canPvp", "false")); //????????????Pvp
            shieldWardAll = Boolean.parseBoolean(ServerProperties.getProperty("world.shieldWardAll", "false")); //???????????????????????????????????????????????????
            checkSp = Boolean.parseBoolean(ServerProperties.getProperty("world.checkSp", "true")); //???????????????????????????
            checkCash = Boolean.parseBoolean(ServerProperties.getProperty("world.checkCash", "true")); //????????????????????????
            useMapScript = Boolean.parseBoolean(ServerProperties.getProperty("world.useMapScript", "false")); //????????????????????????????????????
            autoPoints = Boolean.parseBoolean(ServerProperties.getProperty("world.autoPoints", "false")); //??????????????????????????? ???????????????????????????
            eventSM = new EventScriptManager(this, ServerProperties.getProperty("channel.events").split(","));
            port = Short.parseShort(ServerProperties.getProperty("channel.port" + channel, String.valueOf(DEFAULT_PORT + channel)));
            blockSkill = Boolean.parseBoolean(ServerProperties.getProperty("world.blockSkill", "false")); // ?????????????????????????????????
            maxConnOfIPaddr = Integer.parseInt(ServerProperties.getProperty("MaxConnOfIPaddr", "10"));
            connctCheckTime = Integer.parseInt(ServerProperties.getProperty("ConnctCheckTime", "2000"));
            keepConnectTimeOut = Integer.parseInt(ServerProperties.getProperty("KeepConnectTimeOut", "20000"));
            killMobRewardPoint = Integer.parseInt(ServerProperties.getProperty("world.killMobRewardPoint", "1"));
            reliveCount = Integer.parseInt(ServerProperties.getProperty("world.reliveCount", "5"));
            reliveCost = Integer.parseInt(ServerProperties.getProperty("world.reliveCost", "1000000"));
            reliveItem = Integer.parseInt(ServerProperties.getProperty("world.reliveItem", "4000000"));
            mPointstobuy = Boolean.parseBoolean(ServerProperties.getProperty("world.mPointstobuy", "true")); //?????????????????????????????????????????????
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        ip = ServerProperties.getProperty("channel.interface", ServerConstants.HOST) + ":" + port;

        IoBuffer.setUseDirectBuffer(false);
        IoBuffer.setAllocator(new SimpleBufferAllocator());

        //??????????????????Socket
        acceptor = new NioSocketAcceptor();
        acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));
        acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30); //???/???????????????30??????????????????????????????????????????
        players = new PlayerStorage(channel);
        getShopPack();
        loadEvents();
        loadShare();
        try {
            acceptor.setHandler(new MapleServerHandler(channel, ServerType.???????????????));
            acceptor.bind(new InetSocketAddress(port));
            ((SocketSessionConfig) acceptor.getSessionConfig()).setTcpNoDelay(true);
            log.info("??????: " + channel + " ????????????: " + port);
            eventSM.init();
        } catch (IOException e) {
            log.info("????????????: " + port + " ?????? (ch: " + getChannel() + ")" + e);
        }
    }

    public void shutdown() {
        if (finishedShutdown) {
            return;
        }
        broadcastPacket(MaplePacketCreator.serverNotice(0, "????????????????????????..."));

        // dc all clients by hand so we get sessionClosed...
        shutdown = true;
        System.out.println("?????? " + channel + " ????????????????????????...");

        eventSM.cancel();

        System.out.println("?????? " + channel + " ??????????????????????????????...");

        getPlayerStorage().disconnectAll();

        System.out.println("?????? " + channel + " ??????????????????...");

//        acceptor.unbind();
        acceptor = null;

        //temporary while we dont have !addchannel
        instances.remove(channel);
        setFinishShutdown();
    }

    public boolean hasFinishedShutdown() {
        return finishedShutdown;
    }

    public MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public static ChannelServer newInstance(int channel) {
        return new ChannelServer(channel);
    }

    public static ChannelServer getInstance(int channel) {
        return instances.get(channel);
    }

    public void addPlayer(MapleCharacter chr) {
        getPlayerStorage().registerPlayer(chr);
    }

    public PlayerStorage getPlayerStorage() {
        if (players == null) { //wth
            players = new PlayerStorage(channel); //wthhhh
        }
        return players;
    }

    public void removePlayer(MapleCharacter chr) {
        getPlayerStorage().deregisterPlayer(chr);
    }

    public void removePlayer(int idz, String namez) {
        getPlayerStorage().deregisterPlayer(idz, namez);
    }

    public String getServerMessage() {
        return serverMessage;
    }

    public void setServerMessage(String newMessage) {
        serverMessage = newMessage;
        broadcastPacket(MaplePacketCreator.serverMessage(serverMessage));
    }

    public void broadcastPacket(byte[] data) {
        getPlayerStorage().broadcastPacket(data);
    }

    public void broadcastSmegaPacket(byte[] data) {
        getPlayerStorage().broadcastSmegaPacket(data);
    }

    public void broadcastGMPacket(byte[] data) {
        getPlayerStorage().broadcastGMPacket(data);
    }

    public int getChannel() {
        return channel;
    }

    public void setChannel(int channel) {
        instances.put(channel, this);
        LoginServer.addChannel(channel);
    }

    public static ArrayList<ChannelServer> getAllInstances() {
        return new ArrayList<>(instances.values());
    }

    public String getIP() {
        return ip;
    }

    public boolean isShutdown() {
        return shutdown;
    }

    public int getLoadedMaps() {
        return mapFactory.getLoadedMaps();
    }

    public EventScriptManager getEventSM() {
        return eventSM;
    }

    public void reloadEvents() {
        eventSM.cancel();
        eventSM = new EventScriptManager(this, ServerProperties.getProperty("channel.events").split(","));
        eventSM.init();
    }

    /*
     * ??????????????????
     */
    public int getExpRate() {
        return expRate * getDoubleExp();
    }

    public void setExpRate(int expRate) {
        this.expRate = expRate;
    }

    /*
     * ??????????????????
     */
    public int getCashRate() {
        return cashRate;
    }

    public void setCashRate(int cashRate) {
        this.cashRate = cashRate;
    }

    /*
     * ??????????????????
     */
    public int getMesoRate() {
        return mesoRate * getDoubleExp();
    }

    public void setMesoRate(int mesoRate) {
        this.mesoRate = mesoRate;
    }

    /*
     * ??????????????????
     */
    public int getDropRate() {
        return dropRate * getDoubleExp();
    }

    public void setDropRate(int dropRate) {
        this.dropRate = dropRate;
    }

    /*
     * ??????????????????????????????
     */
    public int getGlobalRate() {
        if (globalRate <= 0) {
            return 1;
        }
        return globalRate;
    }

    public void setGlobalRate(int rate) {
        this.globalRate = rate;
    }

    /*
     * ??????????????????
     */
    public int getDoubleExp() {
        if (doubleExp < 0 || doubleExp > 2) {
            return 1;
        } else {
            return doubleExp;
        }
    }

    public void setDoubleExp(int doubleExp) {
        if (doubleExp < 0 || doubleExp > 2) {
            this.doubleExp = 1;
        } else {
            this.doubleExp = doubleExp;
        }
    }

    /*
     * ???????????????????????????
     */
    public int getStatLimit() {
        return statLimit;
    }

    public void setStatLimit(int limit) {
        this.statLimit = limit;
    }

    public static void startChannel_Main() {
        serverStartTime = System.currentTimeMillis();
        int ch = Integer.parseInt(ServerProperties.getProperty("channel.count", "0"));
        if (ch > 10) {
            ch = 10;
        }
        for (int i = 0; i < ch; i++) {
            newInstance(i + 1).run_startup_configurations();
        }
    }

    public Map<MapleSquadType, MapleSquad> getAllSquads() {
        return Collections.unmodifiableMap(mapleSquads);
    }

    public MapleSquad getMapleSquad(String type) {
        return getMapleSquad(MapleSquadType.valueOf(type.toLowerCase()));
    }

    public MapleSquad getMapleSquad(MapleSquadType type) {
        return mapleSquads.get(type);
    }

    public boolean addMapleSquad(MapleSquad squad, String type) {
        MapleSquadType types = MapleSquadType.valueOf(type.toLowerCase());
        if (types != null && !mapleSquads.containsKey(types)) {
            mapleSquads.put(types, squad);
            squad.scheduleRemoval();
            return true;
        }
        return false;
    }

    public boolean removeMapleSquad(MapleSquadType types) {
        if (types != null && mapleSquads.containsKey(types)) {
            mapleSquads.remove(types);
            return true;
        }
        return false;
    }

    public int closeAllMerchant() {
        int ret = 0;
        mcWriteLock.lock();
        try {
            Iterator<Entry<Integer, HiredMerchant>> merchants_ = merchants.entrySet().iterator();
            while (merchants_.hasNext()) {
                HiredMerchant hm = merchants_.next().getValue();
                HiredMerchantSave.QueueShopForSave(hm);
                hm.getMap().removeMapObject(hm);
                merchants_.remove();
                ret++;
            }
        } finally {
            mcWriteLock.unlock();
        }
        //hacky
        for (int i = 910000001; i <= 910000022; i++) {
            for (MapleMapObject mmo : mapFactory.getMap(i).getAllHiredMerchantsThreadsafe()) {
                HiredMerchantSave.QueueShopForSave((HiredMerchant) mmo);
                ret++;
            }
        }
        return ret;
    }

    public void closeAllMerchants() {
        int ret = 0;
        long Start = System.currentTimeMillis();
        mcWriteLock.lock();
        try {
            Iterator<Entry<Integer, HiredMerchant>> hmit = merchants.entrySet().iterator();
            while (hmit.hasNext()) {
                hmit.next().getValue().closeShop(true, false);
                hmit.remove();
                ret++;
            }
        } catch (Exception e) {
            log.error("??????????????????????????????..." + e);
        } finally {
            mcWriteLock.unlock();
        }
        log.info("?????? " + channel + " ?????????????????????: " + ret + " | ??????: " + (System.currentTimeMillis() - Start) + " ??????.");
    }

    public int addMerchant(HiredMerchant hMerchant) {
        mcWriteLock.lock();
        try {
            running_MerchantID++;
            merchants.put(running_MerchantID, hMerchant);
            return running_MerchantID;
        } finally {
            mcWriteLock.unlock();
        }
    }

    public void removeMerchant(HiredMerchant hMerchant) {
        mcWriteLock.lock();
        try {
            merchants.remove(hMerchant.getStoreId());
        } finally {
            mcWriteLock.unlock();
        }
    }

    /*
     * ????????????????????????????????????
     */
    public boolean containsMerchant(int accId) {
        boolean contains = false;
        mcReadLock.lock();
        try {
            for (HiredMerchant hm : merchants.values()) {
                if (hm.getOwnerAccId() == accId) {
                    contains = true;
                    break;
                }
            }
        } finally {
            mcReadLock.unlock();
        }
        return contains;
    }

    /*
     * ????????????????????????????????????????????????
     */
    public boolean containsMerchant(int accId, int chrId) {
        boolean contains = false;
        mcReadLock.lock();
        try {
            for (HiredMerchant hm : merchants.values()) {
                if (hm.getOwnerAccId() == accId && hm.getOwnerId() == chrId) {
                    contains = true;
                    break;
                }
            }
        } finally {
            mcReadLock.unlock();
        }
        return contains;
    }

    public List<HiredMerchant> searchMerchant(int itemSearch) {
        List<HiredMerchant> list = new LinkedList<>();
        mcReadLock.lock();
        try {
            for (HiredMerchant hm : merchants.values()) {
                if (hm.searchItem(itemSearch).size() > 0) {
                    list.add(hm);
                }
            }
        } finally {
            mcReadLock.unlock();
        }
        return list;
    }

    /*
     * ????????????????????????????????????????????? ?????? ????????????
     */
    public HiredMerchant getHiredMerchants(int accId, int chrId) {
        mcReadLock.lock();
        try {
            for (HiredMerchant hm : merchants.values()) {
                if (hm.getOwnerAccId() == accId && hm.getOwnerId() == chrId) {
                    return hm;
                }
            }
        } finally {
            mcReadLock.unlock();
        }
        return null;
    }

    public void toggleMegaphoneMuteState() {
        this.MegaphoneMuteState = !this.MegaphoneMuteState;
    }

    public boolean getMegaphoneMuteState() {
        return MegaphoneMuteState;
    }

    public int getEvent() {
        return eventmap;
    }

    public void setEvent(int ze) {
        this.eventmap = ze;
    }

    public MapleEvent getEvent(MapleEventType t) {
        return events.get(t);
    }

    public Collection<PlayerNPC> getAllPlayerNPC() {
        return playerNPCs;
    }

    public void addPlayerNPC(PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            return;
        }
        playerNPCs.add(npc);
        getMapFactory().getMap(npc.getMapId()).addMapObject(npc);
    }

    public void removePlayerNPC(PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            playerNPCs.remove(npc);
            getMapFactory().getMap(npc.getMapId()).removeMapObject(npc);
        }
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String sn) {
        this.serverName = sn;
    }

    public String getTrueServerName() {
        return serverName.substring(0, serverName.length() - 3);
    }

    public int getPort() {
        return port;
    }

    public static Set<Integer> getChannelServer() {
        return new HashSet<>(instances.keySet());
    }

    public void setShutdown() {
        this.shutdown = true;
        log.info("?????? " + channel + " ?????????????????????????????????????????????...");
    }

    public void setFinishShutdown() {
        this.finishedShutdown = true;
        log.info("?????? " + channel + " ???????????????.");
    }

    public boolean isAdminOnly() {
        return adminOnly;
    }

    public static int getChannelCount() {
        return instances.size();
    }

    public int getTempFlag() {
        return flags;
    }

    public static Map<Integer, Integer> getChannelLoad() {
        Map<Integer, Integer> ret = new HashMap<>();
        for (ChannelServer cs : instances.values()) {
            ret.put(cs.getChannel(), cs.getConnectedClients());
        }
        return ret;
    }

    public int getConnectedClients() {
        return getPlayerStorage().getConnectedClients();
    }

    public List<CheaterData> getCheaters() {
        List<CheaterData> cheaters = getPlayerStorage().getCheaters();
        Collections.sort(cheaters);
        return cheaters;
    }

    public List<CheaterData> getReports() {
        List<CheaterData> cheaters = getPlayerStorage().getReports();
        Collections.sort(cheaters);
        return cheaters;
    }

    public void broadcastMessage(byte[] message) {
        broadcastPacket(message);
    }

    public void broadcastSmega(byte[] message) {
        broadcastSmegaPacket(message);
    }

    public void broadcastGMMessage(byte[] message) {
        broadcastGMPacket(message);
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, 10);
    }

    public void startMapEffect(String msg, int itemId, int time) {
        for (MapleMap load : getMapFactory().getAllMaps()) {
            if (load.getCharactersSize() > 0) {
                load.startMapEffect(msg, itemId, time);
            }
        }
    }

    public AramiaFireWorks getFireWorks() {
        return works;
    }

    /*
     * ????????????????????????
     */
    public int getTraitRate() {
        return traitRate;
    }

    public String getShopPack() {
        if (ShopPack != null) {
            return ShopPack;
        }
        Properties props = new Properties();
        try {
            FileInputStream is = new FileInputStream("CashPack.txt");
            props.load(is);
            is.close();
        } catch (IOException ex) {
            log.error("???????????? CashPack.txt ???????????????????????????.");
        }
        ShopPack = props.getProperty("pack");
        return ShopPack;
    }

    public void loadShopPack() {
        if (ShopPack != null) {
            ShopPack = null;
        }
        Properties props = new Properties();
        try {
            FileInputStream is = new FileInputStream("CashPack.txt");
            props.load(is);
            is.close();
        } catch (IOException ex) {
            log.error("???????????? CashPack.txt ???????????????????????????.");
        }
        ShopPack = props.getProperty("pack");
    }

    /*
     * ????????????????????????
     */
    public void saveAll() {
        int nos = 0;
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr != null) {
                nos++;
                chr.saveToDB(false, false);
            }
        }
        log.info("[????????????] ??????????????? " + channel + " ??? " + nos + " ??????????????????????????????????????????.");
    }

    /*
     * ????????????????????????
     */
    public int getAutoGain() {
        return autoGain;
    }

    public void setAutoGain(int rate) {
        this.autoGain = rate;
    }

    /*
     * ??????????????????
     */
    public void AutoGain(int rate) {
        mapFactory.getMap(910000000).AutoGain(rate, getExpRate());
    }

    /*
     * ????????????????????????
     */
    public int getAutoNx() {
        return autoNx;
    }

    public void setAutoNx(int rate) {
        this.autoNx = rate;
    }

    /*
     * ??????????????????
     */
    public void AutoNx(int rate) {
        mapFactory.getMap(910000000).AutoNx(rate, isAutoPoints());
    }

    /*
     * ???????????????????????????
     */
    public int getAutoPaoDian() {
        return autoPaoDian;
    }

    public void setAutoPaoDian(int rate) {
        this.autoPaoDian = rate;
    }

    /*
     * ??????????????????
     */
    public void AutoPaoDian() {
        AutoPaoDian(1);
    }

    public void AutoPaoDian(int rate) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr != null) {
                chr.gainGamePoints(rate);
            }
        }
    }

    /*
     * ???????????????Pvp
     */
    public boolean isCanPvp() {
        return canPvp;
    }

    /*
     * ???????????????????????????????????????????????????
     *
     * true = ?????????????????????????????????
     * false= ?????????????????????????????????
     */
    public boolean isShieldWardAll() {
        return shieldWardAll;
    }

    public void setShieldWardAll(boolean all) {
        this.shieldWardAll = all;
    }

    /*
     * ????????????????????????
     */
    public int getStateRate() {
        return stateRate;
    }

    public void setStateRate(int stateRate) {
        this.stateRate = stateRate;
    }

    /*
     * ???????????????????????????
     */
    public int getCreateGuildCost() {
        return createGuildCost;
    }

    /*
     * ????????????ID?????????????????????????????? @?????? ??????
     */
    public static MapleCharacter getCharacterById(int id) {
        for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterById(id);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    /*
     * ???????????????????????????????????????????????? @?????? ??????
     */
    public static MapleCharacter getCharacterByName(String name) {
        for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterByName(name);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public boolean isConnected(String name) {
        return getPlayerStorage().getCharacterByName(name) != null;
    }

    public int getSharePrice() {
        return sharePrice;
    }

    public void loadShare() {
        if (channel != 1 || finishedShutdown) {
            return;
        }
        shareCon = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = shareCon.prepareStatement("SELECT * FROM shares WHERE channelid = ?");
            ps.setInt(1, 1);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                sharePrice = rs.getInt("currentprice");
            } else {
                throw new RuntimeException("[EXCEPTION] ????????????????????????.");
            }
            log.info("?????????????????????: " + sharePrice);
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("ERROR Load Shares", e);
        }
    }

    public void increaseShare(int share) {
        if (channel != 1 || finishedShutdown) {
            return;
        }
        sharePrice += share;
        try {
            PreparedStatement ps = shareCon.prepareStatement("UPDATE shares SET currentprice = ? WHERE channelid = 1");
            ps.setInt(1, sharePrice);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            log.error("ERROR Increase Shares", e);
        }
    }

    public void decreaseShare(int share) {
        if (channel != 1 || finishedShutdown) {
            return;
        }
        sharePrice -= share;
        if (sharePrice < 0) {
            sharePrice = 0;
        }
        try {
            PreparedStatement ps = shareCon.prepareStatement("UPDATE shares SET currentprice = ? WHERE channelid = 1");
            ps.setInt(1, sharePrice);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            log.error("ERROR Decrease Shares", e);
        }
    }

    public void saveShares() {
        if (channel != 1 || finishedShutdown) {
            return;
        }
        try {
            PreparedStatement ps = shareCon.prepareStatement("UPDATE shares SET currentprice = ? WHERE channelid = 1");
            ps.setInt(1, sharePrice);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            log.error("ERROR Save Shares", e);
        }
    }

    public int getMerchantTime() {
        return merchantTime;
    }

    public boolean isCheckSp() {
        return checkSp;
    }

    public boolean isCheckCash() {
        return checkCash;
    }

    public boolean isUseMapScript() {
        return useMapScript;
    }

    public boolean isAutoPoints() {
        return autoPoints;
    }

    public boolean ismPointstobuy() {
        return mPointstobuy;
    }

    public boolean isBlockSkill() {
        return blockSkill;
    }

    public int getMaxConnOfIPaddr() {
        return maxConnOfIPaddr;
    }

    public int getConnctCheckTime() {
        return connctCheckTime;
    }

    public int getKeepConnectTimeOut() {
        return keepConnectTimeOut;
    }

    public int getKillMobRewardPoint() {
        return killMobRewardPoint;
    }

    public int getReliveCount() {
        return reliveCount;
    }

    public int getReliveCost() {
        return reliveCost;
    }

    public int getReliveItem() {
        return reliveItem;
    }

    public MarketEngine getMarket() {
        return me;
    }
}
