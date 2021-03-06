package server.maps;

import server.squad.MapleSquad;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MonsterFamiliar;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.skills.KSPsychicSkillEntry;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.world.PartyOperation;
import handling.world.WorldBroadcastService;
import handling.world.party.ExpeditionType;

import java.awt.Point;
import java.awt.Rectangle;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import scripting.event.EventManager;
import scripting.map.MapScriptManager;
import server.*;
import server.MapleCarnivalFactory.MCSkill;
import server.squad.MapleSquadType;
import server.Timer.EtcTimer;
import server.Timer.MapTimer;
import server.events.MapleEvent;
import server.life.*;
import server.maps.MapleNodes.DirectionInfo;
import server.maps.MapleNodes.MapleNodeInfo;
import server.maps.MapleNodes.MaplePlatform;
import server.maps.MapleNodes.MonsterPoint;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.packet.*;

public final class MapleMap {

    /*
     * Holds mappings of OID -> MapleMapObject separated by MapleMapObjectType.
     * Please acquire the appropriate lock when reading and writing to the
     * LinkedHashMaps. The MapObjectType Maps themselves do not need to
     * synchronized in any way since they should never be modified.
     */
    private final Map<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> mapobjects;
    private final Map<MapleMapObjectType, ReentrantReadWriteLock> mapobjectlocks;
    private final List<MapleCharacter> characters = new ArrayList();
    private final ReentrantReadWriteLock charactersLock = new ReentrantReadWriteLock();
    private final Lock runningOidLock = new ReentrantLock();
    private final List<MapleHideNpc> hideNpc = new ArrayList<>();
    private final List<Spawns> monsterSpawn = new ArrayList<>();
    private final AtomicInteger runningOid = new AtomicInteger(500000);
    private final AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private final Map<Integer, MaplePortal> portals = new HashMap<>();
    private MapleFootholdTree footholds = null;
    private float monsterRate, recoveryRate;
    private MapleMapEffect mapEffect;
    private int channel;
    private short decHP = 0, createMobInterval = 9000, top = 0, bottom = 0, left = 0, right = 0;
    private int consumeItemCoolTime = 0, protectItem = 0, decHPInterval = 10000, mapid, returnMapId, timeLimit,
            fieldLimit, maxRegularSpawn = 0, fixedMob, forcedReturnMap = 999999999, instanceid = -1,
            lvForceMove = 0, lvLimit = 0, permanentWeather = 0, partyBonusRate = 0;
    private boolean town, clock, personalShop, miniMapOnOff, everlast = false, dropsDisabled = false, gDropsDisabled = false,
            soaring = false, squadTimer = false, isSpawns = true, checkStates = true;
    private String mapName, streetName, onUserEnter, onFirstUserEnter, speedRunLeader = "";
    private List<Integer> dced = new ArrayList<>();
    private List<Point> spawnPoints = new ArrayList<>();
    private ScheduledFuture<?> squadSchedule;
    private long speedRunStart = 0, lastSpawnTime = 0, lastHurtTime = 0;
    private MapleNodes nodes;
    private MapleSquadType squad;
    private Map<String, Integer> environment = new LinkedHashMap<>();
    private final Map<Integer, Map<Integer, List<Pair<Integer, Integer>>>> kspsychicObjects = new LinkedHashMap<>();
    private final ReentrantReadWriteLock kspsychicLock = new ReentrantReadWriteLock();
    private final Map<Integer, Integer> ksultimates = new LinkedHashMap<>();

    public MapleMap(int mapid, int channel, int returnMapId, float monsterRate) {
        this.mapid = mapid;
        this.channel = channel;
        this.returnMapId = returnMapId;
        if (this.returnMapId == 999999999) {
            this.returnMapId = mapid;
        }
        if (GameConstants.getPartyPlay(mapid) > 0) {
            this.monsterRate = (monsterRate - 1.0f) * 2.5f + 1.0f;
        } else {
            this.monsterRate = monsterRate;
        }
        EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> objsMap = new EnumMap<>(MapleMapObjectType.class);
        EnumMap<MapleMapObjectType, ReentrantReadWriteLock> objlockmap = new EnumMap<>(MapleMapObjectType.class);
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            objsMap.put(type, new LinkedHashMap<Integer, MapleMapObject>());
            objlockmap.put(type, new ReentrantReadWriteLock());
        }
        mapobjects = Collections.unmodifiableMap(objsMap);
        mapobjectlocks = Collections.unmodifiableMap(objlockmap);
    }

    public void setSpawns(boolean fm) {
        this.isSpawns = fm;
    }

    public boolean getSpawns() {
        return isSpawns;
    }

    public void setFixedMob(int fm) {
        this.fixedMob = fm;
    }

    public void setForceMove(int fm) {
        this.lvForceMove = fm;
    }

    public int getForceMove() {
        return lvForceMove;
    }

    public void setLevelLimit(int fm) {
        this.lvLimit = fm;
    }

    public int getLevelLimit() {
        return lvLimit;
    }

    public void setReturnMapId(int rmi) {
        this.returnMapId = rmi;
    }

    public void setSoaring(boolean b) {
        this.soaring = b;
    }

    public boolean canSoar() {
        return soaring;
    }

    public void toggleDrops() {
        this.dropsDisabled = !dropsDisabled;
    }

    public void setDrops(boolean b) {
        this.dropsDisabled = b;
    }

    public void toggleGDrops() {
        this.gDropsDisabled = !gDropsDisabled;
    }

    public int getId() {
        return mapid;
    }

    public MapleMap getReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(returnMapId);
    }

    public int getReturnMapId() {
        return returnMapId;
    }

    public int getForcedReturnId() {
        return forcedReturnMap;
    }

    public MapleMap getForcedReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(forcedReturnMap);
    }

    public void setForcedReturnMap(int map) {
        this.forcedReturnMap = map;
    }

    public float getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(float recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public int getFieldLimit() {
        return fieldLimit;
    }

    public void setFieldLimit(int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public void setCreateMobInterval(short createMobInterval) {
        this.createMobInterval = createMobInterval;
    }

    public void setTimeLimit(int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getMapName() {
        return mapName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setFirstUserEnter(String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public void setUserEnter(String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public String getFirstUserEnter() {
        return onFirstUserEnter;
    }

    public String getUserEnter() {
        return onUserEnter;
    }

    public boolean hasClock() {
        return clock;
    }

    public void setClock(boolean hasClock) {
        this.clock = hasClock;
    }

    public boolean isTown() {
        return town;
    }

    public void setTown(boolean town) {
        this.town = town;
    }

    public boolean allowPersonalShop() {
        return personalShop;
    }

    public void setPersonalShop(boolean personalShop) {
        this.personalShop = personalShop;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setEverlast(boolean everlast) {
        this.everlast = everlast;
    }

    public boolean getEverlast() {
        return everlast;
    }

    public int getHPDec() {
        return decHP;
    }

    public void setHPDec(int delta) {
        if (delta > 0 || mapid == 749040100) { //???????????? - ?????????????????????
            lastHurtTime = System.currentTimeMillis();
        }
        decHP = (short) delta;
    }

    public int getHPDecInterval() {
        return decHPInterval;
    }

    public void setHPDecInterval(int delta) {
        decHPInterval = delta;
    }

    public int getHPDecProtect() {
        return protectItem;
    }

    public void setHPDecProtect(int delta) {
        this.protectItem = delta;
    }

    public void addHideNpc(MapleHideNpc qm) {
        hideNpc.add(qm);
    }

    public boolean isMiniMapOnOff() {
        return miniMapOnOff;
    }

    public void setMiniMapOnOff(boolean on) {
        this.miniMapOnOff = on;
    }

    public void setSpawnPoints(List<Point> Points) {
        this.spawnPoints = Points;
    }

    public List<Point> getSpawnPoints() {
        return spawnPoints;
    }

    public List<MapleMapObject> getCharactersAsMapObjects() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Collections.singletonList(MapleMapObjectType.PLAYER));
    }

    public int getCurrentPartyId() {
        charactersLock.readLock().lock();
        try {
            Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (chr.getParty() != null) {
                    return chr.getParty().getPartyId();
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return -1;
    }

    /**
     * ?????????????????????
     *
     * @param mapobject ????????????
     */
    public void addMapObject(MapleMapObject mapobject) {
        runningOidLock.lock();
        try {
            if (mapobject.getObjectId() != 0) {
                mapobject.setObjectId(mapobject.getObjectId());
            } else {
                mapobject.setObjectId(runningOid.getAndIncrement());
            }
        } finally {
            runningOidLock.unlock();
        }
        mapobjectlocks.get(mapobject.getType()).writeLock().lock();
        try {
            mapobjects.get(mapobject.getType()).put(mapobject.getObjectId(), mapobject);
        } finally {
            mapobjectlocks.get(mapobject.getType()).writeLock().unlock();
        }
    }

    /**
     * @??????????????????????????????????????????
     */
    private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery) {
        addMapObject(mapobject);

        charactersLock.readLock().lock();
        try {
            Iterator<MapleCharacter> itr = characters.iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if ((mapobject.getType() == MapleMapObjectType.MIST || chr.getTruePosition().distanceSq(mapobject.getTruePosition()) <= GameConstants.maxViewRangeSq())) {
                    packetbakery.sendPackets(chr.getClient());
                    chr.addVisibleMapObject(mapobject);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    /**
     * ??????????????????
     *
     * @param obj ????????????
     */
    public void removeMapObject(MapleMapObject obj) {
        mapobjectlocks.get(obj.getType()).writeLock().lock();
        try {
            mapobjects.get(obj.getType()).remove(obj.getObjectId());
        } finally {
            mapobjectlocks.get(obj.getType()).writeLock().unlock();
        }
    }

    public Point calcPointBelow(Point initial) {
        MapleFoothold fh = footholds.findBelow(initial, false);
        if (fh == null) {
            return null;
        }
        int dropY = fh.getY1();
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            double s1 = Math.abs(fh.getY2() - fh.getY1());
            double s2 = Math.abs(fh.getX2() - fh.getX1());
            double s5 = Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2)));
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) s5;
            } else {
                dropY = fh.getY1() + (int) s5;
            }
        }
        return new Point(initial.x, dropY);
    }

    public Point calcDropPos(Point initial, Point fallback) {
        Point ret = calcPointBelow(new Point(initial.x, initial.y - 50));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }

    private void dropFromMonster(MapleCharacter chr, MapleMonster mob, boolean instanced) {
        if (mob == null || chr == null || ChannelServer.getInstance(channel) == null || dropsDisabled || mob.dropsDisabled() || chr.getPyramidSubway() != null) { //no drops in pyramid ok? no cash either
            return;
        }
        //??????????????????????????? 300 ???????????????????????????????????????
        int maxSize = 200;
        if (!instanced && maxSize >= 300 && mapobjects.get(MapleMapObjectType.ITEM).size() >= maxSize) {
            removeDropsDelay();
            if (chr.isAdmin()) {
                chr.dropMessage(6, "[????????????] ????????????????????????????????? " + maxSize + " ???????????????????????????????????????????????????.");
            }
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        byte droptype = (byte) (mob.getStats().isExplosiveReward() ? 3 : mob.getStats().isFfaLoot() ? 2 : chr.getParty() != null ? 1 : 0);
        int mobpos = mob.getTruePosition().x;
        int mesoServerRate = ChannelServer.getInstance(channel).getMesoRate(); //????????????
        int dropServerRate = ChannelServer.getInstance(channel).getDropRate(); //????????????
//        int cashServerRate = ChannelServer.getInstance(channel).getCashRate(); //????????????
        int globalServerRate = ChannelServer.getInstance(channel).getGlobalRate(); //???????????????????????????
        Item idrop;
        byte d = 1;
        Point pos = new Point(0, mob.getTruePosition().y);
        double ???????????? = 100.0;
        MonsterStatusEffect mse = mob.getBuff(MonsterStatus.??????);
        if (mse != null) {
            ???????????? += mse.getX();
        }

        MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        List<MonsterDropEntry> derp = mi.retrieveDrop(mob.getId());
        if (derp == null) { //if no drops, no global drops either <3
            return;
        }
        List<MonsterDropEntry> dropEntry = new LinkedList<>(derp);
        Collections.shuffle(dropEntry);

        boolean mesoDropped = false;
        for (MonsterDropEntry de : dropEntry) {
            if (de.itemId == mob.getStolen()) {
                continue;
            }
            if (Randomizer.nextInt(999999) < (int) (de.chance * dropServerRate * chr.getDropMod() * (chr.getStat().getDropBuff() / 100.0) * (???????????? / 100.0))) {
                if (mesoDropped && droptype != 3 && de.itemId == 0) { //not more than 1 sack of meso
                    continue;
                }
                if (de.itemId / 10000 == 238) { // ???????????????????????? && !mob.getStats().isBoss() && chr.getMonsterBook().getLevelByCard(ii.getCardMobId(de.itemId)) >= 2
                    continue;
                }
                if (de.questid != 0 && chr.getQuestStatus(de.questid) <= 0) {
                    continue;
                }
                if (droptype == 3) {
                    pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                } else {
                    pos.x = (mobpos + ((d % 2 == 0) ? (20 * (d + 1) / 2) : -(20 * (d / 2))));
                }
                if (de.itemId == 0) { // meso
                    int mesos = Randomizer.nextInt(1 + Math.abs(de.Maximum - de.Minimum)) + de.Minimum;
                    if (mesos > 0) {
                        spawnMobMesoDrop((int) (mesos * (chr.getStat().mesoBuff / 100.0) * chr.getDropMod() * mesoServerRate), calcDropPos(pos, mob.getTruePosition()), mob, chr, false, droptype);
                        mesoDropped = true;
                        d++;
                    }
                } else {
                    if (ItemConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                    } else {
                        int range = Math.abs(de.Maximum - de.Minimum);
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(range <= 0 ? 1 : range) + de.Minimum : 1), (byte) 0);
                    }
                    idrop.setGMLog("????????????: " + mob.getId() + " ??????: " + mapid + " ??????: " + FileoutputUtil.CurrentReadable_Date());
                    if (ItemConstants.isNoticeItem(de.itemId)) {
                        broadcastMessage(MaplePacketCreator.serverNotice(6, "[????????????] ?????? " + chr.getName() + " ??? " + chr.getMap().getMapName() + " ?????? " + mob.getStats().getName() + " ???????????? " + ii.getName(de.itemId)));
                    }
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, droptype, de.questid);
                    d++;
                }
            }
        }
        List<MonsterGlobalDropEntry> globalEntry = new ArrayList<>(mi.getGlobalDrop());
        Collections.shuffle(globalEntry);
        // Global Drops
        for (MonsterGlobalDropEntry de : globalEntry) {
            if (de.chance == 0) { //???????????????0 ???????????????
                continue;
            }
            if (Randomizer.nextInt(999999) < de.chance * globalServerRate && (de.continent < 0 || (de.continent < 10 && mapid / 100000000 == de.continent) || (de.continent < 100 && mapid / 10000000 == de.continent) || (de.continent < 1000 && mapid / 1000000 == de.continent))) {
                if (!gDropsDisabled) {
                    if (droptype == 3) {
                        pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                    } else {
                        pos.x = (mobpos + ((d % 2 == 0) ? (20 * (d + 1) / 2) : -(20 * (d / 2))));
                    }
                    if (ItemConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                    } else {
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1), (byte) 0);
                    }
                    idrop.setGMLog("????????????: " + mob.getId() + " ??????: " + mapid + " (Global) ??????: " + FileoutputUtil.CurrentReadable_Date());
                    if (ItemConstants.isNoticeItem(de.itemId)) {
                        broadcastMessage(MaplePacketCreator.serverNotice(6, "[????????????] ?????? " + chr.getName() + " ??? " + chr.getMap().getMapName() + " ?????? " + mob.getStats().getName() + " ???????????? " + ii.getName(de.itemId)));
                    }
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, de.onlySelf ? 0 : droptype, de.questid);
                    d++;
                }
            }
        }
    }

    public void removeMonster(MapleMonster monster) {
        if (monster == null) {
            return;
        }
        spawnedMonstersOnMap.decrementAndGet();
        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 0));
        removeMapObject(monster);
        monster.killed();
    }

    public void killMonster(MapleMonster monster) { // For mobs with removeAfter
        if (monster == null) {
            return;
        }
        spawnedMonstersOnMap.decrementAndGet();
        monster.setHp(0);
        if (monster.getLinkCID() <= 0) {
            monster.spawnRevives(this);
        }
        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), monster.getStats().getSelfD() < 0 ? 1 : monster.getStats().getSelfD()));
        removeMapObject(monster);
        monster.killed();
    }

    public void killMonster(MapleMonster monster, MapleCharacter chr, boolean withDrops, boolean second, byte animation) {
        killMonster(monster, chr, withDrops, second, animation, 0);
    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean second, byte animation, final int lastSkill) {
        /*
         * 8810122 - ??????????????????
         * 8810018 - ?????????????????????
         */
        if ((monster.getId() == 8810122 || monster.getId() == 8810018) && !second) {
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    killMonster(monster, chr, true, true, (byte) 1);
                    killAllMonsters(true);
                }
            }, 3000);
            return;
        }
        if (monster.getId() == 8820014) { //??????????????????????????? pb sponge, kills pb(w) first before dying
            killMonster(8820000); //???????????????????????????
        } else if (monster.getId() == 8820212) { //???????????????
            killMonster(8820100); //???????????????
        } else if (monster.getId() == 9300166) { //?????? ariant pq bomb
            animation = 2; //or is it 3?
        }
        spawnedMonstersOnMap.decrementAndGet();
        removeMapObject(monster);
        monster.killed();
        MapleSquad sqd = getSquadByMap();
        boolean instanced = sqd != null || monster.getEventInstance() != null || getEMByMap() != null;
        int dropOwner = monster.killBy(chr, lastSkill);
        if (animation >= 0) {
            broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animation));
        }
        if (monster.getBuffToGive() > -1) {
            int buffid = monster.getBuffToGive();
            MapleStatEffect buff = MapleItemInformationProvider.getInstance().getItemEffect(buffid);
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter mc : characters) {
                    if (mc.isAlive()) {
                        buff.applyTo(mc);
                        switch (monster.getId()) {
                            case 8810018: //?????????????????????      buffid = 2022108
                            case 8810122: //??????????????????        buffid = 2022108
                            case 8820001: //???????????????????????????  buffid = 2022449
                            case 8820212: //???????????????          buffid = 2022449
                                mc.getClient().getSession().write(EffectPacket.showOwnBuffEffect(buffid, 14, mc.getLevel(), 1)); // HT nine spirit
                                broadcastMessage(mc, EffectPacket.showBuffeffect(mc.getId(), buffid, 14, mc.getLevel(), 1), false); // HT nine spirit
                                break;
                        }
                    }
                }
            } finally {
                charactersLock.readLock().unlock();
            }
        }
        int mobid = monster.getId();
        ExpeditionType type = null;
        if (mobid == 8810018 && mapid == 240060200) { // ????????????
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "?????????????????????????????????????????????????????????????????????????????????????????????????????????~"));
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(16);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            //FileoutputUtil.log(FileoutputUtil.Horntail_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Horntail;
            }
            doShrine(true);
        } else if (mobid == 8810122 && mapid == 240060201) { // ??????????????????
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "???????????????????????????????????????????????????????????????????????????????????????????????????????????????~"));
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(24);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            //FileoutputUtil.log(FileoutputUtil.Horntail_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.ChaosHT;
            }
            doShrine(true);
        } else if (mobid == 9400266 && mapid == 802000111) { //9400266 - ?????????
            doShrine(true);
        } else if (mobid == 9400265 && mapid == 802000211) { //9400265 - ???????????????
            doShrine(true);
        } else if (mobid == 9400270 && mapid == 802000411) { //9400270 - ?????????
            doShrine(true);
        } else if (mobid == 9400273 && mapid == 802000611) { //9400273 - ?????????
            doShrine(true);
        } else if (mobid == 9400294 && mapid == 802000711) { //9400294 - ?????????
            doShrine(true);
        } else if (mobid == 9400296 && mapid == 802000803) { //9400296 - ???????????????
            doShrine(true);
        } else if (mobid == 9400289 && mapid == 802000821) { //9400289 - ?????????
            doShrine(true);
        } else if (mobid == 8830000 && mapid == 105100300) { //8830000 - ?????????
            if (speedRunStart > 0) {
                type = ExpeditionType.Normal_Balrog;
            }
        } else if ((mobid == 9420544 || mobid == 9420549) && mapid == 551030200 && monster.getEventInstance() != null && monster.getEventInstance().getName().contains(getEMByMap().getName())) {
            doShrine(getAllReactor().isEmpty());
        } else if (mobid == 8820001 && mapid == 270050100) { //???????????????????????????
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "????????????????????????????????????????????????????????????????????????????????????????????????"));
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(17);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Pink_Bean;
            }
            doShrine(true);
        } else if (mobid == 8820212 && mapid == 270051100) { //???????????????
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "??????????????????????????????????????????????????????????????????????????????????????????????????????"));
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(59);
                    c.finishActivity(120106);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Chaos_Pink_Bean;
            }
            doShrine(true);
        } else if ((mobid == 8850011 && mapid == 271040200) || (mobid == 8850012 && mapid == 271040100)) { //????????? 274040200
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "??????????????????????????????????????????????????????????????????????????????! ????????????????????????!"));
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(39);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Cygnus;
            }
            doShrine(true);
        } else if (mobid == 8840000 && mapid == 211070100) { //???????????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(38);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Von_Leon;
            }
            doShrine(true);
        } else if (mobid == 8800002 && (mapid == 280030000 || mapid == 280030100)) { //??????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(15);
                    c.finishActivity(120105);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            //FileoutputUtil.log(FileoutputUtil.Zakum_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Zakum;
            }
            doShrine(true);
        } else if (mobid == 8800102 && mapid == 280030001) { //????????????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(23);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            //FileoutputUtil.log(FileoutputUtil.Zakum_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Chaos_Zakum;
            }
            doShrine(true);
        } else if (mobid == 8870000 && mapid == 262031300) { //?????? 120??? ????????????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(55);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Hillah;
            }
            doShrine(true);
        } else if (mobid == 8870100 && mapid == 262031300) { //?????? 170??? ????????????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(56);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Hillah;
            }
            doShrine(true);
        } else if (mobid == 8860000 && mapid == 272030400) { //????????????
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter c : characters) {
                    c.finishAchievement(58);
                }
            } finally {
                charactersLock.readLock().unlock();
            }
            if (speedRunStart > 0) {
                type = ExpeditionType.Akyrum;
            }
            doShrine(true);
        } else if (mobid >= 8800003 && mobid <= 8800010) {
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getAllMonstersThreadsafe();
           for (MapleMapObject mons : monsters) {
                MapleMonster mob = (MapleMonster) mons;
                if ((mob.getId() >= 8800003) && (mob.getId() <= 8800010)) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMapObject object : monsters) {
                    MapleMonster mons = ((MapleMonster) object);
                    if (mons.getId() == 8800000) {
                        Point pos = mons.getTruePosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), pos);
                        break;
                    }
                }
            }
        } else if (mobid >= 8800103 && mobid <= 8800110) {
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getAllMonstersThreadsafe();
            
            for (MapleMonster mons : monsters) {
                 MapleMonster mob = (MapleMonster) mons;
                if (mons.getId() >= 8800103 && mons.getId() <= 8800110) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMonster mons : monsters) {
                     MapleMonster mob = (MapleMonster) mons;
                    if (mons.getId() == 8800100) { //????????????
                        Point pos = mons.getTruePosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800100), pos); //????????????
                        break;
                    }
                }
            }
        } else if (mobid >= 9400903 && mobid <= 9400910) { //????????????
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getAllMonstersThreadsafe();
            for (MapleMonster mons : monsters) {
                if (mons.getId() >= 9400903 && mons.getId() <= 9400910) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMonster mons : monsters) {
                    if (mons.getId() == 9400900) { //????????????
                        Point pos = mons.getTruePosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9400900), pos); //????????????
                        break;
                    }
                }
            }
        } else if (mobid == 8820008) { // ??????BOSS????????????????????? - ?????????
            for (MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "?????????????????? 8820008 : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (mobid >= 8820010 && mobid <= 8820014) { // ???????????????????????????
            for (MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820000 && mons.getId() != 8820001 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "?????????????????? ????????? : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (mobid == 8820108) { // 8820108 - ??????BOSS????????????????????? - ???????????????
            for (MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "?????????????????? 8820108 : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (mobid >= 8820300 && mobid <= 8820304) { // ???????????????
            for (MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820100 && mons.getId() != 8820212 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "?????????????????? ??????????????? : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (mobid / 100000 == 98 && chr.getMapId() / 10000000 == 95 && getAllMonstersThreadsafe().isEmpty()) {
            switch ((chr.getMapId() % 1000) / 100) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    chr.getClient().getSession().write(UIPacket.MapEff("monsterPark/clear"));
                    break;
                case 5:
                    if (chr.getMapId() / 1000000 == 952) {
                        chr.getClient().getSession().write(UIPacket.MapEff("monsterPark/clearF"));
                    } else {
                        chr.getClient().getSession().write(UIPacket.MapEff("monsterPark/clear"));
                    }
                    break;
                case 6:
                    chr.getClient().getSession().write(UIPacket.MapEff("monsterPark/clearF"));
                    break;
            }
        } else if (mobid / 100000 == 93 && chr.getMapId() / 1000000 == 955 && getAllMonstersThreadsafe().isEmpty()) {
            switch ((chr.getMapId() % 1000) / 100) {
                case 1:
                case 2:
                    chr.getClient().getSession().write(MaplePacketCreator.showEffect("aswan/clear"));
                    chr.getClient().getSession().write(MaplePacketCreator.playSound("Party1/Clear"));
                    break;
                case 3:
                    chr.getClient().getSession().write(MaplePacketCreator.showEffect("aswan/clearF"));
                    chr.getClient().getSession().write(MaplePacketCreator.playSound("Party1/Clear"));
                    chr.dropMessage(-1, "?????????????????????????????????????????????????????????????????????");
                    break;
            }
        }
        if (type != null) {
            if (speedRunStart > 0 && speedRunLeader.length() > 0) {
                String name = "";
                switch (type.name()) {
                    case "Normal_Balrog":
                        name = "?????????";
                        break;
                    case "Zakum":
                        name = "??????";
                        break;
                    case "Horntail":
                        name = "????????????";
                        break;
                    case "Pink_Bean":
                        name = "???????????????????????????";
                        break;
                    case "Chaos_Pink_Bean":
                        name = "???????????????";
                        break;
                    case "Chaos_Zakum":
                        name = "????????????";
                        break;
                    case "ChaosHT":
                        name = "??????????????????";
                        break;
                    case "Von_Leon":
                        name = "???????????";
                        break;
                    case "Cygnus":
                        name = "???????????????";
                        break;
                    case "Akyrum":
                        name = "????????????";
                        break;
                    case "Hillah":
                        name = "??????";
                        break;
                }
                long endTime = System.currentTimeMillis();
                String time = StringUtil.getReadableMillis(speedRunStart, endTime);
                broadcastMessage(MaplePacketCreator.serverNotice(5, speedRunLeader + "???????????????????????????: " + time + " ????????? " + name + "!"));
                getRankAndAdd(speedRunLeader, time, type, (endTime - speedRunStart), (sqd == null ? null : sqd.getMembers()));
                endSpeedRun();
            }
        }
        if (monster.getStats().isBoss()) {
            chr.finishActivity(120107);
        } else {
            if (!ServerConstants.is??????()) {
                int point = chr.getClient().getChannelServer().getKillMobRewardPoint();
                if (point > 0) {
                    chr.modifyCSPoints(2, point, true);
                }
            }
        }
        if (withDrops && dropOwner != 1) {
            MapleCharacter drop;
            if (dropOwner <= 0) {
                drop = chr;
            } else {
                drop = getCharacterById(dropOwner);
                if (drop == null) {
                    drop = chr;
                }
            }
            dropFromMonster(drop, monster, instanced);
        }
    }

    public List<MapleReactor> getAllReactor() {
        return getAllReactorsThreadsafe();
    }

    public List<MapleReactor> getAllReactorsThreadsafe() {
        ArrayList<MapleReactor> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ret.add((MapleReactor) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleRune> getAllRune() {
        return getAllRuneThreadsafe();
    }

    public List<MapleRune> getAllRuneThreadsafe() {
        ArrayList<MapleRune> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.RUNE).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.RUNE).values()) {
                ret.add((MapleRune) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.RUNE).readLock().unlock();
        }
        return ret;
    }

    public List<MapleSummon> getAllSummonsThreadsafe() {
        ArrayList<MapleSummon> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.SUMMON).values()) {
                if (mmo instanceof MapleSummon) {
                    ret.add((MapleSummon) mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllDoor() {
        return getAllDoorsThreadsafe();
    }

    public List<MapleMapObject> getAllDoorsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.DOOR).values()) {
                if (mmo instanceof MapleDoor) {
                    ret.add(mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMechDoorsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.DOOR).values()) {
                if (mmo instanceof MechDoor) {
                    ret.add(mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMerchant() {
        return getAllHiredMerchantsThreadsafe();
    }

    public List<MapleMapObject> getAllHiredMerchantsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.HIRED_MERCHANT).values()) {
                ret.add(mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMonster> getAllMonster() {
        return getAllMonstersThreadsafe();
    }

    public List<MapleMonster> getAllMonstersThreadsafe() {
        ArrayList<MapleMonster> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                ret.add((MapleMonster) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public List<Integer> getAllUniqueMonsters() {
        ArrayList<Integer> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                int theId = ((MapleMonster) mmo).getId();
                if (!ret.contains(theId)) {
                    ret.add(theId);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public void killAllMonsters(boolean animate) {
        for (MapleMapObject monstermo : getAllMonstersThreadsafe()) {
            MapleMonster monster = (MapleMonster) monstermo;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animate ? 1 : 0));
            removeMapObject(monster);
            monster.killed();
        }
    }

    public void killMonster(int monsId) {
        for (MapleMapObject mmo : getAllMonstersThreadsafe()) {
            if (((MapleMonster) mmo).getId() == monsId) {
                spawnedMonstersOnMap.decrementAndGet();
                removeMapObject(mmo);
                broadcastMessage(MobPacket.killMonster(mmo.getObjectId(), 1));
                ((MapleMonster) mmo).killed();
                break;
            }
        }
    }

    public String MapDebug_Log() {
        StringBuilder sb = new StringBuilder("Defeat time : ");
        sb.append(FileoutputUtil.CurrentReadable_Time());
        sb.append(" | Mapid : ").append(this.mapid);
        charactersLock.readLock().lock();
        try {
            sb.append(" Users [").append(characters.size()).append("] | ");
            for (MapleCharacter mc : characters) {
                sb.append(mc.getName()).append(", ");
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return sb.toString();
    }

    public void limitReactor(int rid, int num) {
        List<MapleReactor> toDestroy = new ArrayList<>();
        Map<Integer, Integer> contained = new LinkedHashMap<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (contained.containsKey(mr.getReactorId())) {
                    if (contained.get(mr.getReactorId()) >= num) {
                        toDestroy.add(mr);
                    } else {
                        contained.put(mr.getReactorId(), contained.get(mr.getReactorId()) + 1);
                    }
                } else {
                    contained.put(mr.getReactorId(), 1);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public void destroyReactors(int first, int last) {
        List<MapleReactor> toDestroy = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    toDestroy.add(mr);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public void destroyReactor(int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        if (reactor == null) {
            return;
        }
        broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);

        if (reactor.getDelay() > 0) {
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    respawnReactor(reactor);
                }
            }, reactor.getDelay());
        }
    }

    public void reloadReactors() {
        List<MapleReactor> toSpawn = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor reactor = (MapleReactor) obj;
                broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
                reactor.setAlive(false);
                reactor.setTimerActive(false);
                toSpawn.add(reactor);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor r : toSpawn) {
            removeMapObject(r);
            if (!r.isCustom()) { //guardians cpq
                respawnReactor(r);
            }
        }
    }

    /*
     * command to reset all item-reactors in a map to state 0 for GM/NPC use -
     * not tested (broken reactors get removed from mapobjects when destroyed)
     * Should create instances for multiple copies of non-respawning reactors...
     */
    public void resetReactors() {
        setReactorState((byte) 0);
    }

    public void setReactorState() {
        setReactorState((byte) 1);
    }

    public void setReactorState(byte state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).forceHitReactor(null, state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public void setReactorDelay(int state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).setDelay(state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /*
     * command to shuffle the positions of all reactors in a map for PQ purposes
     * (such as ZPQ/LMPQ)
     */
    public void shuffleReactors() {
        shuffleReactors(0, 9999999); //all
    }

    public void shuffleReactors(int first, int last) {
        List<Point> points = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    points.add(mr.getPosition());
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        Collections.shuffle(points);
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    mr.setPosition(points.remove(points.size() - 1));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????
     *
     * @param monster ??????
     */
    public void updateMonsterController(MapleMonster monster) {
        if (!monster.isAlive() || monster.getLinkCID() > 0 || monster.getStats().isEscort()) {
            return;
        }
        if (monster.getController() != null) {
            if (monster.getController().getMap() != this || monster.getController().getTruePosition().distanceSq(monster.getTruePosition()) > monster.getRange()) {
                monster.getController().stopControllingMonster(monster);
            } else { // Everything is fine :)
                return;
            }
        }
        int mincontrolled = -1;
        MapleCharacter newController = null;

        charactersLock.readLock().lock();
        try {
            Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (!chr.isHidden() && (chr.getControlledSize() < mincontrolled || mincontrolled == -1)) {
                    mincontrolled = chr.getControlledSize();
                    newController = chr;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        if (newController != null) {
            if (monster.isFirstAttack()) {
                newController.controlMonster(monster, true);
                monster.setControllerHasAggro(true);
                monster.setControllerKnowsAboutAggro(true);
            } else {
                newController.controlMonster(monster, false);
            }
        }
    }

    public MapleMapObject getMapObject(int oid, MapleMapObjectType type) {
        mapobjectlocks.get(type).readLock().lock();
        try {
            return mapobjects.get(type).get(oid);
        } finally {
            mapobjectlocks.get(type).readLock().unlock();
        }
    }

    public boolean containsNPC(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC n = (MapleNPC) itr.next();
                if (n.getId() == npcid) {
                    return true;
                }
            }
            return false;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public MapleNPC getNPCById(int id) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC n = (MapleNPC) itr.next();
                if (n.getId() == id) {
                    return n;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public MapleMonster getMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            MapleMonster ret = null;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.MONSTER).values().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public int countMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            int ret = 0;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.MONSTER).values().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret++;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public MapleReactor getReactorById(int id) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            MapleReactor ret = null;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.REACTOR).values().iterator();
            while (itr.hasNext()) {
                MapleReactor n = (MapleReactor) itr.next();
                if (n.getReactorId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public MapleMonster getMonsterByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.MONSTER);
        if (mmo == null) {
            return null;
        }
        return (MapleMonster) mmo;
    }

    public MapleSummon getSummonByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.SUMMON);
        if (mmo == null) {
            return null;
        }
        return (MapleSummon) mmo;
    }

    public MapleNPC getNPCByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.NPC);
        if (mmo == null) {
            return null;
        }
        return (MapleNPC) mmo;
    }

    public MapleReactor getReactorByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.REACTOR);
        if (mmo == null) {
            return null;
        }
        return (MapleReactor) mmo;
    }

    public MonsterFamiliar getFamiliarByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.FAMILIAR);
        if (mmo == null) {
            return null;
        }
        return (MonsterFamiliar) mmo;
    }

    public MapleMist getMistByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.MIST);
        if (mmo == null) {
            return null;
        }
        return (MapleMist) mmo;
    }

    public MapleReactor getReactorByName(String name) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = ((MapleReactor) obj);
                if (mr.getName().equalsIgnoreCase(name)) {
                    return mr;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public void spawnNpc(int id, Point pos) {
        MapleNPC npc = MapleLifeFactory.getNPC(id);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setFh(getFootholds().findBelow(pos, false).getId());
        npc.setCustom(true);
        addMapObject(npc);
        broadcastMessage(NPCPacket.spawnNPC(npc, true));
    }

    public void spawnNpcForPlayer(MapleClient c, int id, Point pos) {
        final MapleNPC npc = MapleLifeFactory.getNPC(id);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setFh(getFootholds().findBelow(pos, false).getId());
        npc.setCustom(true);
        addMapObject(npc);
        c.getSession().write(NPCPacket.spawnNPC(npc, true));
    }

    public void removeNpc(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (npc.isCustom() && (npcid == -1 || npc.getId() == npcid)) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId(), false));
                    broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                    itr.remove();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().unlock();
        }
    }

    public void hideNpc(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (npcid == -1 || npc.getId() == npcid) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId(), false));
                    broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public void hideNpc(MapleClient c, int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (npcid == -1 || npc.getId() == npcid) {
                    c.getSession().write(NPCPacket.removeNPCController(npc.getObjectId(), false));
                    c.getSession().write(NPCPacket.removeNPC(npc.getObjectId()));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public void spawnReactorOnGroundBelow(MapleReactor mob, Point pos) {
        mob.setPosition(pos); //reactors dont need FH lol
        mob.setCustom(true);
        spawnReactor(mob);
    }

    public void spawnMonster_sSack(MapleMonster mob, Point pos, int spawnType) {
        mob.setPosition(calcPointBelow(new Point(pos.x, pos.y - 1)));
        spawnMonster(mob, spawnType);
    }

    public void spawnMonster_Pokemon(MapleMonster mob, Point pos, int spawnType) {
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mob.setPosition(spos);
        spawnMonster(mob, spawnType, true);
    }

    public void spawnMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        spawnMonster_sSack(mob, pos, -2);
    }

    public int spawnMonsterWithEffectBelow(MapleMonster mob, Point pos, int effect) {
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        return spawnMonsterWithEffect(mob, effect, spos);
    }

    /*
     * ????????????
     */
//    public void spawnZakum(int x, int y) {
//        Point pos = new Point(x, y);
//        MapleMonster mainb = MapleLifeFactory.getMonster(8800002);
//        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
//        mainb.setPosition(spos);
//
//        int[] zakpart = {8800003, 8800004, 8800005, 8800006, 8800007, 8800008, 8800009, 8800010};
//        for (int i : zakpart) {
//            MapleMonster part = MapleLifeFactory.getMonster(i);
//            part.setPosition(spos);
//            part.setFake(true);
//            spawnFakeMonster(part);
//        }
//        spawnMonster(mainb, -1);
//        if (squadSchedule != null) {
//            cancelSquadSchedule(false);
//        }
//    }
    public void spawnZakum(int x, int y, long maxhp) {
        Point pos = new Point(x, y);
        MapleMonster mainb = MapleLifeFactory.getMonster(8800000);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        mainb.getStats().setChange(true);
        mainb.changeLevel(120);
        mainb.getChangedStats().setOHp(maxhp);
        mainb.setHp(maxhp);
        spawnFakeMonster(mainb);
        // Might be possible to use the map object for reference in future.
        int[] zakpart = {8800003, 8800004, 8800005, 8800006, 8800007, 8800008, 8800009, 8800010};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.changeLevel(120);
            part.getStats().setChange(true);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    /**
     * ??????????????????
     */
//    public void spawnChaosZakum(int x, int y) {
//        Point pos = new Point(x, y);
//        MapleMonster mainb = MapleLifeFactory.getMonster(8800102);
//        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
//        mainb.setPosition(spos);
////        mainb.setFake(true);
//        // Might be possible to use the map object for reference in future.
//        int[] zakpart = {8800103, 8800104, 8800105, 8800106, 8800107, 8800108, 8800109, 8800110};
//        for (int i : zakpart) {
//            MapleMonster part = MapleLifeFactory.getMonster(i);
//            part.setPosition(spos);
//            part.setFake(true);
//            spawnFakeMonster(part);
//        }
//        spawnMonster(mainb, -1);
//        if (squadSchedule != null) {
//            cancelSquadSchedule(false);
//        }
//    }
public void spawnChaosZakum(int x, int y, long maxhp) {
        Point pos = new Point(-10, -215);
        MapleMonster mainb = MapleLifeFactory.getMonster(8800100);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        mainb.getStats().setChange(true);
        mainb.changeLevel(160);
        if (maxhp > 0) {
            mainb.getChangedStats().setOHp(maxhp);
            mainb.setHp(maxhp);
        }
        spawnFakeMonster(mainb);
        // Might be possible to use the map object for reference in future.
        int[] zakpart = {8800103, 8800104, 8800105, 8800106, 8800107, 8800108, 8800109, 8800110};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }
    /*
     * ??????????????????
     */
    public void spawnPinkZakum(int x, int y) {
        Point pos = new Point(x, y);
        MapleMonster mainb = MapleLifeFactory.getMonster(9400900);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        // Might be possible to use the map object for reference in future.
        spawnFakeMonster(mainb);
        int[] zakpart = {9400903, 9400904, 9400905, 9400906, 9400907, 9400908, 9400909, 9400910};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    public void spawnFakeMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        spos.y -= 1;
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    private void checkRemoveAfter(MapleMonster monster) {
        int ra = monster.getStats().getRemoveAfter();
        if (ra > 0 && monster.getLinkCID() <= 0) {
            monster.registerKill(ra * 1000);
        }
    }

    public void spawnRevives(final MapleMonster monster, final int oid) {
        monster.setMap(this);
        checkRemoveAfter(monster);
        if (monster.getId() == 9300166) { //??????
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 2));
                }
            }, 3000);
        }
        monster.setLinkOid(oid);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, monster.getStats().getSummonType() <= 1 ? -3 : monster.getStats().getSummonType(), oid)); // TODO effect
            }
        });
        updateMonsterController(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public void spawnMonster(MapleMonster monster, int spawnType) {
        spawnMonster(monster, spawnType, false);
    }

    public void spawnMonster(final MapleMonster monster, final int spawnType, final boolean overwrite) {
        monster.setMap(this);
        checkRemoveAfter(monster);
        if (monster.getId() == 9300166) { //??????
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 2));
                }
            }, 3000);
        }
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, monster.getStats().getSummonType() <= 1 || monster.getStats().getSummonType() == 27 || overwrite ? spawnType : monster.getStats().getSummonType(), 0));
//                c.getSession().write(MobPacket.spawnMonster(monster, spawnType, 0));
            }
        });
        updateMonsterController(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public int spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        try {
            monster.setMap(this);
            monster.setPosition(pos);
            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

                @Override
                public void sendPackets(MapleClient c) {
                    c.getSession().write(MobPacket.spawnMonster(monster, effect, 0));
                }
            });
            updateMonsterController(monster);
            spawnedMonstersOnMap.incrementAndGet();
            return monster.getObjectId();
        } catch (Exception e) {
            return -1;
        }
    }

    public void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, -4, 0));
            }
        });
        updateMonsterController(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);
        spawnAndAddRangedMapObject(reactor, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.spawnReactor(reactor));
            }
        });
    }

    private void respawnReactor(MapleReactor reactor) {
        if (!isSecretMap() && reactor.getReactorId() >= 100000 && reactor.getReactorId() <= 200011) {
            int newRid = (reactor.getReactorId() < 200000 ? 100000 : 200000) + Randomizer.nextInt(11);
            int prop = reactor.getReactorId() % 100;
            if (Randomizer.nextInt(22) <= prop && newRid % 100 < 10) {
                newRid++;
            }
            if (Randomizer.nextInt(110) <= prop && newRid % 100 < 11) {
                newRid++;
            }
            List<Point> toSpawnPos = new ArrayList<>(spawnPoints);
            for (MapleMapObject reactor1l : getAllReactorsThreadsafe()) {
                MapleReactor reactor2l = (MapleReactor) reactor1l;
                if (!toSpawnPos.isEmpty() && toSpawnPos.contains(reactor2l.getPosition())) {
                    toSpawnPos.remove(reactor2l.getPosition());
                    //System.err.println("??????????????? - ?????????????????????.");
                }
            }
            //System.err.println("??????????????? - toSpawnPos: " + toSpawnPos.size() + " herbRocks: " + spawnPoints.size());
            MapleReactor newReactor = new MapleReactor(MapleReactorFactory.getReactor(newRid), newRid);
            newReactor.setPosition(toSpawnPos.isEmpty() ? reactor.getPosition() : toSpawnPos.get(Randomizer.nextInt(toSpawnPos.size())));
            newReactor.setDelay(newRid % 100 == 11 ? 60000 : 5000);
            spawnReactor(newReactor);
            //System.err.println("??????????????? - oldId: " + reactor.getReactorId() + " newId: " + newReactor.getReactorId() + " ????????????: " + (reactor.getReactorId() == newReactor.getReactorId()));
        } else {
            reactor.setState((byte) 0);
            reactor.setAlive(true);
            spawnReactor(reactor);
        }
    }

    public void spawnRune(final MapleRune rune) {
        rune.setMap(this);

        spawnAndAddRangedMapObject(rune, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                rune.sendSpawnData(c);
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        });
    }

    public boolean isSecretMap() {
        switch (mapid) {
            case 910001001: //???????????? - ?????????????????????
            case 910001002: //???????????? - ???????????????
            case 910001003: //???????????? - ??????????????????
            case 910001004: //???????????? - ?????????????????????
            case 910001005: //???????????? - ??????????????????
            case 910001006: //???????????? - ?????????????????????
            case 910001007: //???????????? - ??????????????????
            case 910001008: //???????????? - ??????????????????
            case 910001009: //???????????? - ??????????????????
            case 910001010: //???????????? - ??????????????????
                return true;
            default:
                return false;
        }
    }

    public void spawnDoor(final MapleDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                door.sendSpawnData(c);
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        });
    }

    public void spawnMechDoor(final MechDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.spawnMechDoor(door, true));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        });
    }

    /**
     * ???????????????
     *
     * @param summon
     */
    public void spawnSummon(final MapleSummon summon) {
        summon.updateMap(this);
        spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (!summon.isChangedMap() || summon.getOwnerId() == c.getPlayer().getId()) {
                    summon.sendSpawnData(c);
                }
            }
        });
    }

    public void spawnFamiliar(final MonsterFamiliar familiar) {
        spawnAndAddRangedMapObject(familiar, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (familiar != null && c.getPlayer() != null) {
                    c.getSession().write(MaplePacketCreator.spawnFamiliar(familiar, true));
                }
            }
        });
    }

    public void spawnExtractor(final MapleExtractor ex) {
        spawnAndAddRangedMapObject(ex, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                ex.sendSpawnData(c);
            }
        });
    }

    public void spawnLove(final MapleLove love) {
        spawnAndAddRangedMapObject(love, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                love.sendSpawnData(c);
            }
        });

        MapTimer tMan = MapTimer.getInstance();
        tMan.schedule(new Runnable() {

            @Override
            public void run() {
                broadcastMessage(MaplePacketCreator.removeLove(love.getObjectId(), love.getItemId()));
                removeMapObject(love);
            }
        }, 1000 * 60 * 60);
    }

    public void spawnMist(final MapleMist mist, final int duration, boolean fake) {
        spawnAndAddRangedMapObject(mist, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                mist.sendSpawnData(c);
            }
        });

        final MapTimer tMan = MapTimer.getInstance();
        final ScheduledFuture<?> poisonSchedule;
        if (mist.isPoisonMist() && !mist.isMobMist()) { //??????????????????????????? ??????????????????????????????
            final MapleCharacter owner = getCharacterById(mist.getOwnerId());
            final boolean pvp = owner != null && owner.inPVP();
            poisonSchedule = tMan.register(new Runnable() {

                @Override
                public void run() {
                    for (MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(pvp ? MapleMapObjectType.PLAYER : MapleMapObjectType.MONSTER))) {
                        if (pvp && mist.makeChanceResult() && !((MapleCharacter) mo).hasDOT() && ((MapleCharacter) mo).getId() != mist.getOwnerId()) {
                            ((MapleCharacter) mo).setDOT(mist.getSource().getDOT(), mist.getSourceSkill().getId(), mist.getSkillLevel());
                        } else if (!pvp && mist.makeChanceResult() && !((MapleMonster) mo).isBuffed(MonsterStatus.????????????)) {
                            if (owner != null) {
                                ((MapleMonster) mo).applyStatus(owner, new MonsterStatusEffect(MonsterStatus.????????????, 1, mist.getSourceSkill().getId(), null, false, mist.getSource().getDOTStack()), true, duration, true, mist.getSource());
                            }
                        }
                    }
                }
            }, 2000, 2500);
        } else if (mist.isRecoverMist()) {  //???????????????????????????
            poisonSchedule = tMan.register(new Runnable() {

                @Override
                public void run() {
                    for (MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                        if (mist.makeChanceResult()) {
                            MapleCharacter chr = ((MapleCharacter) mo);
                            chr.addMP((int) (mist.getSource().getX() * (chr.getStat().getMaxMp() / 100.0)));
                        }
                    }
                }
            }, 2000, 2500);
        } else {
            poisonSchedule = null;
        }
        //???????????????????????????
        mist.setPoisonSchedule(poisonSchedule);
        mist.setSchedule(tMan.schedule(new Runnable() {

            @Override
            public void run() {
                removeMapObject(mist);
                if (poisonSchedule != null) {
                    poisonSchedule.cancel(false);
                }
                broadcastMessage(MaplePacketCreator.removeMist(mist.getObjectId(), false));
            }
        }, duration));
    }

    public void disappearingItemDrop(MapleMapObject dropper, MapleCharacter owner, Item item, Point pos) {
        Point droppos = calcDropPos(pos, pos);
        MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 1, false);
        broadcastMessage(InventoryPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 3), drop.getTruePosition());
    }

    public void spawnMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(position, position);
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(InventoryPacket.dropItemFromMapObject(mdrop, dropper.getTruePosition(), droppos, (byte) 1));
            }
        });
        if (!everlast) {
            mdrop.registerExpire(120000);
            if (droptype == 0 || droptype == 1) {
                mdrop.registerFFA(30000);
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void spawnMesoDropEx(final int meso, final Point dropfrom, final Point dropto, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(dropto, dropto);
        if (Randomizer.nextBoolean()) {
            droppos.x -= Randomizer.rand(0, 20);
        } else {
            droppos.x += Randomizer.rand(0, 20);
        }
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(InventoryPacket.dropItemFromMapObject(mdrop, dropfrom, droppos, (byte) 1));
            }
        });

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public void spawnMobMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final MapleMapItem mdrop = new MapleMapItem(meso, position, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(InventoryPacket.dropItemFromMapObject(mdrop, dropper.getTruePosition(), position, (byte) 1));
            }
        });

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public void spawnMobDrop(final Item idrop, final Point dropPos, final MapleMonster mob, final MapleCharacter chr, final byte droptype, final int questid) {
        final MapleMapItem mdrop = new MapleMapItem(idrop, dropPos, mob, chr, droptype, false, questid);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (c != null && c.getPlayer() != null && (questid <= 0 || c.getPlayer().getQuestStatus(questid) == 1) && (idrop.getItemId() / 10000 != 238 || c.getPlayer().getMonsterBook().getLevelByCard(idrop.getItemId()) >= 2) && mob != null && dropPos != null) {
                    c.getSession().write(InventoryPacket.dropItemFromMapObject(mdrop, mob.getTruePosition(), dropPos, (byte) 1));
                }
            }
        });
        if (chr.checkSoulWeapon()) {
            chr.writeSoulPacket();
            chr.checkSoulState(false);
        }

        if (mob != null && mob.getStats().getWeaponPoint() > 0 && JobConstants.is?????????(chr.getJob())) {
            chr.gainWeaponPoint(mob.getStats().getWeaponPoint());
        }

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
        activateItemReactors(mdrop, chr.getClient());
    }

    public void spawnRandDrop() {
        if (mapid != 910000000 || channel != 1) {
            return; //fm, ch1
        }

        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject o : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (((MapleMapItem) o).isRandDrop()) {
                    return;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                Point pos = new Point(Randomizer.nextInt(800) + 531, -806);
                int theItem = Randomizer.nextInt(1000);
                int itemid;
                if (theItem < 950) { //0-949 = normal, 950-989 = rare, 990-999 = super
                    itemid = GameConstants.normalDrops[Randomizer.nextInt(GameConstants.normalDrops.length)];
                } else if (theItem < 990) {
                    itemid = GameConstants.rareDrops[Randomizer.nextInt(GameConstants.rareDrops.length)];
                } else {
                    itemid = GameConstants.superDrops[Randomizer.nextInt(GameConstants.superDrops.length)];
                }
                spawnAutoDrop(itemid, pos);
            }
        }, 20000);
    }

    public void spawnAutoDrop(final int itemid, final Point pos) {
        Item idrop;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (ItemConstants.getInventoryType(itemid) == MapleInventoryType.EQUIP) {
            idrop = ii.randomizeStats((Equip) ii.getEquipById(itemid));
        } else {
            idrop = new Item(itemid, (byte) 0, (short) 1, (byte) 0);
        }
        idrop.setGMLog("???????????? " + itemid + " ?????? " + mapid);
        final MapleMapItem mdrop = new MapleMapItem(pos, idrop);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(InventoryPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 1));
            }
        });
        broadcastMessage(InventoryPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 0));
        if (itemid / 10000 != 291) {
            mdrop.registerExpire(120000);
        }
    }

    public void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, Point pos, final boolean ffaDrop, final boolean playerDrop) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 2, playerDrop);

        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(InventoryPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 1));
            }
        });
        broadcastMessage(InventoryPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 0));

        if (!everlast) {
            drop.registerExpire(120000);
            activateItemReactors(drop, owner.getClient());
        }
    }

    private void activateItemReactors(final MapleMapItem drop, final MapleClient c) {
        final Item item = drop.getItem();

        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (final MapleMapObject o : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                final MapleReactor react = (MapleReactor) o;

                if (react.getReactorType() == 100) {
                    if (item.getItemId() == GameConstants.getCustomReactItem(react.getReactorId(), react.getReactItem().getLeft()) && react.getReactItem().getRight() == item.getQuantity()) {
                        if (react.getArea().contains(drop.getTruePosition())) {
                            if (!react.isTimerActive()) {
                                MapTimer.getInstance().schedule(new ActivateItemReactor(drop, react, c), 5000);
                                react.setTimerActive(true);
                                break;
                            }
                        }
                    }
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public int getItemsSize() {
        return mapobjects.get(MapleMapObjectType.ITEM).size();
    }

    public int getExtractorSize() {
        return mapobjects.get(MapleMapObjectType.EXTRACTOR).size();
    }

    public int getMobsSize() {
        return mapobjects.get(MapleMapObjectType.MONSTER).size();
    }

    public List<MapleMapItem> getAllItems() {
        return getAllItemsThreadsafe();
    }

    public List<MapleMapItem> getAllItemsThreadsafe() {
        ArrayList<MapleMapItem> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                ret.add((MapleMapItem) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public Point getPointOfItem(int itemid) {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                MapleMapItem mm = ((MapleMapItem) mmo);
                if (mm.getItem() != null && mm.getItem().getItemId() == itemid) {
                    return mm.getPosition();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return null;
    }

    public List<MapleMist> getAllMistsThreadsafe() {
        ArrayList<MapleMist> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.MIST).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MIST).values()) {
                ret.add((MapleMist) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MIST).readLock().unlock();
        }
        return ret;
    }

    public void returnEverLastItem(MapleCharacter chr) {
        for (MapleMapObject o : getAllItemsThreadsafe()) {
            MapleMapItem item = ((MapleMapItem) o);
            if (item.getOwner() == chr.getId()) {
                item.setPickedUp(true);
                broadcastMessage(InventoryPacket.removeItemFromMap(item.getObjectId(), 2, chr.getId()), item.getTruePosition());
                if (item.getMeso() > 0) {
                    chr.gainMeso(item.getMeso(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(chr.getClient(), item.getItem(), false);
                }
                removeMapObject(item);
            }
        }
    }

    public void talkMonster(String msg, int itemId, int objectid) {
        if (itemId > 0) {
            startMapEffect(msg, itemId, false);
        }
        broadcastMessage(MobPacket.talkMonster(objectid, itemId, msg)); //5120035
        broadcastMessage(MobPacket.removeTalkMonster(objectid));
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, false);
    }

    public void startMapEffect(String msg, int itemId, boolean jukebox) {
        if (mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        mapEffect.setJukebox(jukebox);
        broadcastMessage(mapEffect.makeStartData());
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (mapEffect != null) {
                    broadcastMessage(mapEffect.makeDestroyData());
                    mapEffect = null;
                }
            }
        }, jukebox ? 300000 : 15000);
    }

    public void startPredictCardMapEffect(String msg, int itemId, int effectType) {
        startMapEffect(msg, itemId, 30, effectType);
    }

    public void startMapEffect(String msg, int itemId, int time) {
        startMapEffect(msg, itemId, time, -1);
    }

    public void startMapEffect(String msg, int itemId, int time, int effectType) {
        if (mapEffect != null) {
            return;
        }
        if (time <= 0) {
            time = 5;
        }
        mapEffect = new MapleMapEffect(msg, itemId, effectType);
        mapEffect.setJukebox(false);
        broadcastMessage(mapEffect.makeStartData());
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (mapEffect != null) {
                    broadcastMessage(mapEffect.makeDestroyData());
                    mapEffect = null;
                }
            }
        }, time * 1000);
    }

    public void startExtendedMapEffect(final String msg, final int itemId) {
        broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, true));
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                broadcastMessage(MaplePacketCreator.removeMapEffect());
                broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, false));
            }
        }, 60000);
    }

    public void startSimpleMapEffect(String msg, int itemId) {
        broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, true));
    }

    public void startJukebox(String msg, int itemId) {
        startMapEffect(msg, itemId, true);
    }

    public void addPlayer(MapleCharacter chr) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().lock();
        try {
            mapobjects.get(MapleMapObjectType.PLAYER).put(chr.getObjectId(), chr);
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().unlock();
        }
        charactersLock.writeLock().lock();
        try {
            characters.add(chr);
        } finally {
            charactersLock.writeLock().unlock();
        }
        chr.setChangeTime(true);
        if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
            chr.setTeam(getAndSwitchTeam() ? 0 : 1);
        }
        byte[] packet = MaplePacketCreator.spawnPlayerMapobject(chr);
        if (!chr.isHidden()) {
            broadcastMessage(chr, packet, false);
            if (chr.isIntern() && speedRunStart > 0) {
                endSpeedRun();
                broadcastMessage(MaplePacketCreator.serverNotice(5, "The speed run has ended."));
                broadcastMessage(chr, EffectPacket.getEffectSwitch(chr.getId(), chr.getEffectSwitch()), true);
            }
        } else {
            broadcastGMMessage(chr, packet, false);
            broadcastGMMessage(chr, EffectPacket.getEffectSwitch(chr.getId(), chr.getEffectSwitch()), true);
        }
        if (isMiniMapOnOff()) {
            chr.getClient().getSession().write(UIPacket.showFreeMarketMiniMap(isMiniMapOnOff()));
        }
        //???????????????????????????????????????????????????
        sendObjectPlacement(chr);
        //???????????????????????????
        //chr.getClient().getSession().write(packet);
        //????????????????????????
        boolean isUseMapScript = ChannelServer.getInstance(channel).isUseMapScript();
        if (!onUserEnter.equals("")) {
            if (isUseMapScript) {
                MapScriptManager.getInstance().getMapScript(chr.getClient(), onUserEnter, false);
            } else {
                MapScriptMethods.startScript_User(chr.getClient(), onUserEnter);
            }
        }
        if (!onFirstUserEnter.equals("")) {
            if (getCharactersSize() == 1) {
                if (isUseMapScript) {
                    MapScriptManager.getInstance().getMapScript(chr.getClient(), onFirstUserEnter, true);
                } else {
                    MapScriptMethods.startScript_FirstUser(chr.getClient(), onFirstUserEnter);
                }
            }
        }
        GameConstants.achievementRatio(chr.getClient());
        //chr.getClient().getSession().write(MaplePacketCreator.spawnFlags(nodes.getFlags()));
        if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
            chr.getClient().getSession().write(MaplePacketCreator.showEquipEffect(chr.getTeam()));
        }
        switch (mapid) {
            case 809000101: //????????? - ??????(???)
            case 809000201: //????????? - ??????(???)
                chr.getClient().getSession().write(MaplePacketCreator.showEquipEffect());
                break;
            case 689000000: //????????? - ????????????
            case 689000010: //????????? - ????????????
                chr.getClient().getSession().write(MaplePacketCreator.getCaptureFlags(this));
                break;
        }
        MaplePet[] pets = chr.getSpawnPets();
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null && pets[i].getSummoned()) {
                pets[i].setPos(chr.getTruePosition());
                chr.petUpdateStats(pets[i], true);
                chr.getClient().getSession().write(PetPacket.showPet(chr, pets[i], false, false, true));
                chr.getClient().getSession().write(PetPacket.loadExceptionList(chr, pets[i]));
            }
        }
        if (chr.getSummonedFamiliar() != null) {
            chr.spawnFamiliar(chr.getSummonedFamiliar());
        }
        if (chr.getAndroid() != null) {
            chr.getAndroid().setPos(chr.getTruePosition());
            broadcastMessage(AndroidPacket.spawnAndroid(chr, chr.getAndroid()));
        }
        if (chr.getParty() != null) {
            chr.silentPartyUpdate();
            chr.getClient().getSession().write(PartyPacket.updateParty(chr.getClient().getChannel(), chr.getParty(), PartyOperation.????????????, null));
            chr.updatePartyMemberHP();
            chr.receivePartyMemberHP();
        }
        if (!chr.isInBlockedMap() && chr.getLevel() > 10) {
            chr.getClient().getSession().write(MaplePacketCreator.showQuickMove(chr));
        }
        chr.getClient().getSession().write(NPCPacket.sendNpcHide(hideNpc));

        List<MapleSummon> ss = chr.getSummonsReadLock();
        try {
            for (MapleSummon summon : ss) {
                summon.setPosition(chr.getTruePosition());
                chr.addVisibleMapObject(summon);
                this.spawnSummon(summon);
            }
        } finally {
            chr.unlockSummonsReadLock();
        }
        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }
        if (timeLimit > 0 && getForcedReturnMap() != null) {
            chr.startMapTimeLimitTask(timeLimit, getForcedReturnMap());
        }
        if (chr.getBuffedValue(MapleBuffStat.????????????) != null && !JobConstants.is?????????(chr.getJob())) {
            if (FieldLimitType.Mount.check(fieldLimit)) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.????????????);
            }
        }
        if (chr.getSidekick() != null) {
            MapleCharacter side = getCharacterById(chr.getSidekick().getCharacter(chr.getSidekick().getCharacter(0).getId() == chr.getId() ? 1 : 0).getId());
            if (side != null) {
                chr.getSidekick().applyBuff(side);
                chr.getSidekick().applyBuff(chr);
            }
        }
        if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted()) {
            if (chr.inPVP()) {
                chr.getClient().getSession().write(MaplePacketCreator.getPVPClock(Integer.parseInt(chr.getEventInstance().getProperty("type")), (int) (chr.getEventInstance().getTimeLeft() / 1000)));
            } else {
                chr.getClient().getSession().write(MaplePacketCreator.getClock((int) (chr.getEventInstance().getTimeLeft() / 1000)));
            }
        }
        if (hasClock()) {
            Calendar cal = Calendar.getInstance();
            chr.getClient().getSession().write((MaplePacketCreator.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND))));
        }
        if (chr.getCarnivalParty() != null && chr.getEventInstance() != null) {
            chr.getEventInstance().onMapLoad(chr);
        }
        MapleEvent.mapLoad(chr, channel);
        if (getSquadBegin() != null && getSquadBegin().getTimeLeft() > 0 && getSquadBegin().getStatus() == 1) {
            chr.getClient().getSession().write(MaplePacketCreator.getClock((int) (getSquadBegin().getTimeLeft() / 1000)));
        }
        if (mapid / 1000 != 105100 && mapid / 100 != 8020003 && mapid / 100 != 8020008 && mapid != 271040100) { //no boss_balrog/2095/coreblaze/auf/cygnus. but coreblaze/auf/cygnus does AFTER
            final MapleSquad sqd = getSquadByMap(); //for all squads
            final EventManager em = getEMByMap();
            if (!squadTimer && sqd != null && chr.getName().equals(sqd.getLeaderName()) && em != null && em.getProperty("leader") != null && em.getProperty("leader").equals("true") && checkStates) {
                //leader? display
                doShrine(false);
                squadTimer = true;
            }
        }
        if (getNumMonsters() > 0 && (mapid == 280030001 || mapid == 240060201 || mapid == 280030000 || mapid == 280030100 || mapid == 240060200 || mapid == 220080001 || mapid == 541020800 || mapid == 541010100)) {
            String music = "Bgm09/TimeAttack";
            switch (mapid) {
                case 240060200: //???????????? - ??????????????????
                case 240060201: //???????????? - ????????????????????????
                    music = "Bgm14/HonTale";
                    break;
                case 280030100: //??????????????? - ??????????????? V.110.1??????
                case 280030000: //????????? - ???????????????
                case 280030001: //??????????????? - ?????????????????????
                    music = "Bgm06/FinalFight";
                    break;
            }
            chr.getClient().getSession().write(MaplePacketCreator.musicChange(music));
            //maybe timer too for zak/ht
        }
        if (mapid == 914000000 || mapid == 927000000) { //???????????? - ????????????  ???????????? - ??????????????????1
            chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Aran());
        } else if (mapid == 105100300 && chr.getLevel() >= 91) { //??????????????? - ??????????????????
            chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Balrog(chr));
        }
        chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Reset());
        if (JobConstants.is??????(chr.getJob()) && chr.getJob() >= 2200) {
            if (chr.getDragon() == null) {
                chr.makeDragon();
            } else {
                chr.getDragon().setPosition(chr.getPosition());
            }
            if (chr.getDragon() != null) {
                broadcastMessage(SummonPacket.spawnDragon(chr.getDragon()));
            }
        }
        if (JobConstants.is?????????(chr.getJob())) {
            if (chr.getLittleWhite() == null) {
                chr.makeLittleWhite();
            } else {
                chr.getLittleWhite().setPosition(chr.getPosition());
            }
            if (chr.getLittleWhite() != null) {
                broadcastMessage(SummonPacket.spawnLittleWhite(chr.getLittleWhite()));
            }
        }
        if ((mapid == 10000 && chr.getJob() == 0) || (mapid == 130030000 && chr.getJob() == 1000) || (mapid == 914000000 && chr.getJob() == 2000) || (mapid == 900010000 && chr.getJob() == 2001) || (mapid == 931000000 && chr.getJob() == 3000)) {
            chr.getClient().getSession().write(MaplePacketCreator.startMapEffect("???????????? " + chr.getClient().getChannelServer().getServerName() + "!", 5122000, true));
            chr.dropMessage(5, "?????? @help ??????????????????????????????????????? ?????????????????????");
        }
        if (permanentWeather > 0) {
            chr.getClient().getSession().write(MaplePacketCreator.startMapEffect("", permanentWeather, false)); //snow, no msg
        }
        if (getPlatforms().size() > 0) {
            chr.getClient().getSession().write(MaplePacketCreator.getMovingPlatforms(this));
        }
        if (environment.size() > 0) {
            chr.getClient().getSession().write(MaplePacketCreator.getUpdateEnvironment(this));
        }
        if (partyBonusRate > 0) {
            //chr.dropMessage(-1, partyBonusRate + "% additional EXP will be applied per each party member here.");
            //chr.dropMessage(-1, "You've entered the party play zone.");
        }
        if (isTown()) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.??????);
        }
        if (!canSoar()) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.????????????);
        }
        if (chr.getJob() < 3200 || chr.getJob() > 3212) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.????????????);
        }
        if (chr.getJob() >= 2400 && chr.getJob() <= 2412) { //???????????? ???????????????????????????????????????
            chr.getClient().getSession().write(MaplePacketCreator.updateCardStack(chr.getCardStack()));
        }
        if (isPvpMap()) {
            chr.dropSpouseMessage(0x0A, "[????????????] ??????????????????PK?????????????????????");
        } else if (isPartyPvpMap()) {
            chr.dropSpouseMessage(0x0A, "[????????????] ??????????????????PK?????????????????????");
        } else if (isGuildPvpMap()) {
            chr.dropSpouseMessage(0x0A, "[????????????] ??????????????????PK?????????????????????");
        }
        chr.checkBloodContract();
        chr.getClient().getSession().write(MaplePacketCreator.showChronosphere(chr.getBossLog("????????????"), (int) Math.ceil(chr.getCSPoints(2) / 200)));
    }

    public int getNumItems() {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.ITEM).size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
    }

    public int getNumMonsters() {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.MONSTER).size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public void doShrine(final boolean spawned) { //false = entering map, true = defeated
        if (squadSchedule != null) {
            cancelSquadSchedule(true);
        }
        final MapleSquad sqd = getSquadByMap();
        if (sqd == null) {
            return;
        }
        final int mode = ((mapid == 280030000 || mapid == 280030100) ? 1 : (mapid == 280030001 ? 2 : (mapid == 240060200 || mapid == 240060201 ? 3 : 0)));
        //chaos_horntail message for horntail too because it looks nicer
        final EventManager em = getEMByMap();
        if (em != null && getCharactersSize() > 0) {
            final String leaderName = sqd.getLeaderName();
            final String state = em.getProperty("state");
            final Runnable run;
            MapleMap returnMapa = getForcedReturnMap();
            if (returnMapa == null || returnMapa.getId() == mapid) {
                returnMapa = getReturnMap();
            }
            if (mode == 1 || mode == 2) { //chaoszakum
                //broadcastMessage(MaplePacketCreator.showChaosZakumShrine(spawned, 5));
            } else if (mode == 3) { //ht/chaosht
                //broadcastMessage(MaplePacketCreator.showChaosHorntailShrine(spawned, 5));
            } else {
                //broadcastMessage(MaplePacketCreator.showHorntailShrine(spawned, 5));
            }
            if (spawned) { //both of these together dont go well
                broadcastMessage(MaplePacketCreator.getClock(300)); //5 min
            }
            final MapleMap returnMapz = returnMapa;
            if (!spawned) { //no monsters yet; inforce timer to spawn it quickly
                final List<MapleMonster> monsterz = getAllMonstersThreadsafe();
                final List<Integer> monsteridz = new ArrayList<>();
                for (MapleMapObject m : monsterz) {
                    monsteridz.add(m.getObjectId());
                }
                run = new Runnable() {

                    @Override
                    public void run() {
                        final MapleSquad sqnow = MapleMap.this.getSquadByMap();
                        if (MapleMap.this.getCharactersSize() > 0 && MapleMap.this.getNumMonsters() == monsterz.size() && sqnow != null && sqnow.getStatus() == 2 && sqnow.getLeaderName().equals(leaderName) && MapleMap.this.getEMByMap().getProperty("state").equals(state)) {
                            boolean passed = monsterz.isEmpty();
                            for (MapleMapObject m : MapleMap.this.getAllMonstersThreadsafe()) {
                                for (int i : monsteridz) {
                                    if (m.getObjectId() == i) {
                                        passed = true;
                                        break;
                                    }
                                }
                                if (passed) {
                                    break;
                                } //even one of the monsters is the same
                            }
                            if (passed) {
                                //are we still the same squad? are monsters still == 0?
//                                byte[] packet;
//                                if (mode == 1 || mode == 2) { //chaoszakum
//                                    packet = MaplePacketCreator.showChaosZakumShrine(spawned, 0);
//                                } else {
//                                    packet = MaplePacketCreator.showHorntailShrine(spawned, 0); //chaoshorntail message is weird
//                                }
                                for (MapleCharacter chr : MapleMap.this.getCharactersThreadsafe()) { //warp all in map
                                    //chr.getClient().getSession().write(packet);
                                    chr.changeMap(returnMapz, returnMapz.getPortal(0)); //hopefully event will still take care of everything once warp out
                                }
                                checkStates("");
                                resetFully();
                            }
                        }

                    }
                };
            } else { //inforce timer to gtfo
                run = new Runnable() {

                    @Override
                    public void run() {
                        MapleSquad sqnow = MapleMap.this.getSquadByMap();
                        //we dont need to stop clock here because they're getting warped out anyway
                        if (MapleMap.this.getCharactersSize() > 0 && sqnow != null && sqnow.getStatus() == 2 && sqnow.getLeaderName().equals(leaderName) && MapleMap.this.getEMByMap().getProperty("state").equals(state)) {
                            //are we still the same squad? monsters however don't count
//                            byte[] packet;
//                            if (mode == 1 || mode == 2) { //chaoszakum
//                                packet = MaplePacketCreator.showChaosZakumShrine(spawned, 0);
//                            } else {
//                                packet = MaplePacketCreator.showHorntailShrine(spawned, 0); //chaoshorntail message is weird
//                            }
                            for (MapleCharacter chr : MapleMap.this.getCharactersThreadsafe()) { //warp all in map
                                //chr.getClient().getSession().write(packet);
                                chr.changeMap(returnMapz, returnMapz.getPortal(0)); //hopefully event will still take care of everything once warp out
                            }
                            checkStates("");
                            resetFully();
                        }
                    }
                };
            }
            squadSchedule = MapTimer.getInstance().schedule(run, 300000); //5 mins
        }
    }

    public MapleSquad getSquadByMap() {
        MapleSquadType zz;
        switch (mapid) {
            case 105100400: //??????????????? - ??????????????????
            case 105100300: //??????????????? - ??????????????????
                zz = MapleSquadType.bossbalrog;
                break;
            case 280030000: //????????? - ???????????????
            case 280030100: //??????????????? - ??????????????? V.110.1??????
                zz = MapleSquadType.zak;
                break;
            case 280030001: //??????????????? - ?????????????????????
                zz = MapleSquadType.chaoszak;
                break;
            case 240060200: //???????????? - ??????????????????
                zz = MapleSquadType.horntail;
                break;
            case 240060201: //???????????? - ????????????????????????
                zz = MapleSquadType.chaosht;
                break;
            case 270050100: //??????????????? - ????????????
                zz = MapleSquadType.pinkbean;
                break;
            case 270051100: //???????????? - ???????????????
                zz = MapleSquadType.chaospb;
                break;
            case 802000111: //???????????? - ????????? (?????????)
                zz = MapleSquadType.nmm_squad;
                break;
            case 802000211: //???????????? - ????????? 2100??? (?????????)
                zz = MapleSquadType.vergamot;
                break;
            case 802000311: //???????????? - ?????? 2095??? (?????????)
                zz = MapleSquadType.tokyo_2095;
                break;
            case 802000411: //???????????? - ???????????? 2102??? (?????????)
                zz = MapleSquadType.dunas;
                break;
            case 802000611: //???????????? - ????????????????????? 2102??? (?????????)
                zz = MapleSquadType.nibergen_squad;
                break;
            case 802000711: //???????????? - ??????????????? 2102??????????????????
                zz = MapleSquadType.dunas2;
                break;
            case 802000801: //???????????? - ???????????? 2102???(??????)
            case 802000802: //???????????? - ???????????? 2102???(????????????)
            case 802000803: //???????????? - ???????????? 2102???(??????)
                zz = MapleSquadType.core_blaze;
                break;
            case 802000821: //???????????? - ?????????????????? 2102??????????????????
            case 802000823: //???????????? - ?????????????????? 2102??????????????????
                zz = MapleSquadType.aufheben;
                break;
            case 211070100: //??????????????? - ?????????
            case 211070101: //??????????????? - ????????????
            case 211070110: //??????????????? - ????????????
                zz = MapleSquadType.vonleon;
                break;
            case 551030200: //???????????? - ????????????
                zz = MapleSquadType.scartar;
                break;
            case 271040100: //??????????????? - ??????????????????
                zz = MapleSquadType.cygnus;
                break;
            case 689013000: //???????????? - ???????????? ??????
                zz = MapleSquadType.pinkzak;
                break;
            case 262031300: //???????????? - ????????????
            case 262031310: //???????????? - ?????????????????????
                zz = MapleSquadType.hillah;
                break;
            case 272030400: //???????????? - ????????????
            case 272030420: //???????????? - ??????????????????
                zz = MapleSquadType.arkarium;
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getMapleSquad(zz);
    }

    public MapleSquad getSquadBegin() {
        if (squad != null) {
            return ChannelServer.getInstance(channel).getMapleSquad(squad);
        }
        return null;
    }

    public EventManager getEMByMap() {
        String em;
        switch (mapid) {
            case 105100400: //??????????????? - ??????????????????
                em = "BossBalrog_EASY";
                break;
            case 105100300: //??????????????? - ??????????????????
                em = "BossBalrog_NORMAL";
                break;
            case 280030100: //??????????????? - ??????????????? V.110.1??????
            case 280030000: //????????? - ???????????????
                em = "ZakumBattle";
                break;
            case 240060200: //???????????? - ??????????????????
                em = "HorntailBattle";
                break;
            case 280030001: //??????????????? - ?????????????????????
                em = "ChaosZakum";
                break;
            case 240060201: //???????????? - ????????????????????????
                em = "ChaosHorntail";
                break;
            case 270050100: //??????????????? - ????????????
                em = "PinkBeanBattle";
                break;
            case 270051100: //???????????? - ???????????????
                em = "ChaosPinkBean";
                break;
            case 802000111: //???????????? - ????????? (?????????)
                em = "NamelessMagicMonster";
                break;
            case 802000211: //???????????? - ????????? 2100??? (?????????)
                em = "Vergamot";
                break;
            case 802000311: //???????????? - ?????? 2095??? (?????????)
                em = "2095_tokyo";
                break;
            case 802000411: //???????????? - ???????????? 2102??? (?????????)
                em = "Dunas";
                break;
            case 802000611: //???????????? - ????????????????????? 2102??? (?????????)
                em = "Nibergen";
                break;
            case 802000711: //???????????? - ??????????????? 2102??????????????????
                em = "Dunas2";
                break;
            case 802000801: //???????????? - ???????????? 2102???(??????)
            case 802000802: //???????????? - ???????????? 2102???(????????????)
            case 802000803: //???????????? - ???????????? 2102???(??????)
                em = "CoreBlaze";
                break;
            case 802000821: //???????????? - ?????????????????? 2102??????????????????
            case 802000823: //???????????? - ?????????????????? 2102??????????????????
                em = "Aufhaven";
                break;
            case 211070100: //??????????????? - ?????????
            case 211070101: //??????????????? - ????????????
            case 211070110: //??????????????? - ????????????
                em = "VonLeonBattle";
                break;
            case 551030200: //???????????? - ????????????
                em = "ScarTarBattle";
                break;
            case 271040100: //??????????????? - ??????????????????
                em = "CygnusBattle";
                break;
            case 689013000: //???????????? - ???????????? ??????
                em = "PinkZakum";
                break;
            case 262031300: //???????????? - ????????????
            case 262031310: //???????????? - ?????????????????????
                em = "Hillah_170";
                break;
            case 272030400: //???????????? - ????????????
            case 272030420: //???????????? - ??????????????????
                em = "ArkariumBattle";
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getEventSM().getEventManager(em);
    }

    public void removePlayer(MapleCharacter chr) {
        if (everlast) {
            returnEverLastItem(chr);
        }
        charactersLock.writeLock().lock();
        try {
            characters.remove(chr);
        } finally {
            charactersLock.writeLock().unlock();
        }
        removeMapObject(chr);
        chr.checkFollow();
        chr.removeExtractor();
        chr.cancelEffectFromBuffStat(MapleBuffStat.SIDEKICK_PASSIVE);
        if (chr.getSidekick() != null) {
            MapleCharacter side = getCharacterById(chr.getSidekick().getCharacter(chr.getSidekick().getCharacter(0).getId() == chr.getId() ? 1 : 0).getId());
            if (side != null) {
                side.cancelEffectFromBuffStat(MapleBuffStat.SIDEKICK_PASSIVE);
            }
        }
        broadcastMessage(MaplePacketCreator.removePlayerFromMap(chr.getId()));

        if (chr.getSummonedFamiliar() != null) {
            chr.removeVisibleFamiliar();
        }
        removeVisibleSummon(chr);
        checkStates(chr.getName());
        if (mapid == 109020001) { //??????????????? - OX??????
            chr.canTalk(true);
        }
        chr.leaveMap(this);
    }

    /**
     * ???????????????????????????????????????????????????
     *
     * @param chr
     */
    public void removeVisibleSummon(MapleCharacter chr) {
        List<MapleSummon> toCancel = new ArrayList<>();
        List<MapleSummon> listSummons = chr.getSummonsReadLock();
        try {
            for (MapleSummon summon : listSummons) {
                broadcastMessage(SummonPacket.removeSummon(summon, true));
                removeMapObject(summon);
                chr.removeVisibleMapObject(summon);
                if (summon.isChangeMapCanceled()) {
                    toCancel.add(summon);
                } else {
                    summon.setChangedMap(true);
                }
            }
        } finally {
            chr.unlockSummonsReadLock();
        }
        for (MapleSummon summon : toCancel) {
            chr.removeSummon(summon);
            chr.dispelSkill(summon.getSkillId());
        }
    }

    public void broadcastMessage(byte[] packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getTruePosition());
    }

    /*
     * public void broadcastMessage(MapleCharacter source, byte[] packet,
     * boolean repeatToSource, boolean ranged) { broadcastMessage(repeatToSource
     * ? null : source, packet, ranged ? MapleCharacter.MAX_VIEW_RANGE_SQ :
     * Double.POSITIVE_INFINITY, source.getPosition()); }
     */
    public void broadcastMessage(byte[] packet, Point rangedFrom) {
        broadcastMessage(null, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, Point rangedFrom) {
        broadcastMessage(source, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, double rangeSq, Point rangedFrom) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getTruePosition()) <= rangeSq) {
                            chr.getClient().getSession().write(packet);
                        }
                    } else {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    /**
     * ??????????????????
     *
     * @param chr ??????
     */
    private void sendObjectPlacement(MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        for (MapleMapObject o : getMapObjectsInRange(chr.getTruePosition(), chr.getRange(), GameConstants.rangedMapobjectTypes)) {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                if (!((MapleReactor) o).isAlive()) {
                    continue;
                }
            }
            o.sendSpawnData(chr.getClient());
            chr.addVisibleMapObject(o);
        }
    }

    /**
     * ?????????????????????????????????
     *
     * @param from ??????
     * @param rangeSq ??????
     * @return
     */
    public List<MaplePortal> getPortalsInRange(Point from, double rangeSq) {
        List<MaplePortal> ret = new ArrayList<>();
        for (MaplePortal type : portals.values()) {
            if (from.distanceSq(type.getPosition()) <= rangeSq && type.getTargetMapId() != mapid && type.getTargetMapId() != 999999999) {
                ret.add(type);
            }
        }
        return ret;
    }

    /**
     * ????????????????????????????????????
     *
     * @param from ??????
     * @param rangeSq ??????
     * @return
     */
    public List<MapleMapObject> getMapObjectsInRange(Point from, double rangeSq) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (from.distanceSq(mmo.getTruePosition()) <= rangeSq) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    /**
     * ???????????????????????????
     *
     * @param from ??????
     * @param rangeSq ??????
     * @return
     */
    public List<MapleMapObject> getItemsInRange(Point from, double rangeSq) {
        return getMapObjectsInRange(from, rangeSq, Collections.singletonList(MapleMapObjectType.ITEM));
    }

    /**
     * ???????????????????????????
     *
     * @param from ??????
     * @param rangeSq ??????
     * @return
     */
    public List<MapleMapObject> getMonstersInRange(Point from, double rangeSq) {
        return getMapObjectsInRange(from, rangeSq, Collections.singletonList(MapleMapObjectType.MONSTER));
    }

    /**
     * ????????????????????????????????????????????????
     *
     * @param from ??????
     * @param rangeSq ??????
     * @param MapObject_types ??????
     * @return
     */
    public List<MapleMapObject> getMapObjectsInRange(Point from, double rangeSq, List<MapleMapObjectType> MapObject_types) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (from.distanceSq(mmo.getTruePosition()) <= rangeSq) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public List<MapleMapObject> getMapObjectsInRect(Rectangle box, List<MapleMapObjectType> MapObject_types) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (box.contains(mmo.getTruePosition())) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public List<MapleCharacter> getCharactersIntersect(Rectangle box) {
        List<MapleCharacter> ret = new ArrayList<>();
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr.getBounds().intersects(box)) {
                    ret.add(chr);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public List<MapleCharacter> getPlayersInRectAndInList(Rectangle box, List<MapleCharacter> chrList) {
        List<MapleCharacter> character = new LinkedList<>();

        charactersLock.readLock().lock();
        try {
            Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter a;
            while (ltr.hasNext()) {
                a = ltr.next();
                if (chrList.contains(a) && box.contains(a.getTruePosition())) {
                    character.add(a);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return character;
    }

    public void addPortal(MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public MaplePortal getPortal(String portalname) {
        for (MaplePortal port : portals.values()) {
            if (port.getName().equals(portalname)) {
                return port;
            }
        }
        return null;
    }

    public MaplePortal getPortal(int portalid) {
        return portals.get(portalid);
    }

    public List<MaplePortal> getPortalSP() {
        List<MaplePortal> res = new LinkedList<>();
        for (MaplePortal port : portals.values()) {
            if (port.getName().equals("sp")) {
                res.add(port);
            }
        }
        return res;
    }

    public void resetPortals() {
        for (MaplePortal port : portals.values()) {
            port.setPortalState(true);
        }
    }

    public void setFootholds(MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public MapleFootholdTree getFootholds() {
        return footholds;
    }

    public int getNumSpawnPoints() {
        return monsterSpawn.size();
    }

    public void loadMonsterRate(boolean first) {
        int spawnSize = monsterSpawn.size();
        if (spawnSize >= 20 || partyBonusRate > 0) {
            maxRegularSpawn = Math.round(spawnSize / monsterRate);
        } else {
            maxRegularSpawn = (int) Math.ceil(spawnSize * monsterRate);
        }
        if (fixedMob > 0) {
            maxRegularSpawn = fixedMob;
        } else if (maxRegularSpawn <= 2) {
            maxRegularSpawn = 2;
        } else if (maxRegularSpawn > spawnSize) {
            maxRegularSpawn = Math.max(10, spawnSize);
        }

        Collection<Spawns> newSpawn = new LinkedList<>();
        Collection<Spawns> newBossSpawn = new LinkedList<>();
        for (Spawns s : monsterSpawn) {
            if (s.getCarnivalTeam() >= 2) {
                continue; // Remove carnival spawned mobs
            }
            if (s.getMonster().isBoss()) {
                newBossSpawn.add(s);
            } else {
                newSpawn.add(s);
            }
        }
        monsterSpawn.clear();
        monsterSpawn.addAll(newBossSpawn);
        monsterSpawn.addAll(newSpawn);

        if (first && spawnSize > 0) {
            lastSpawnTime = System.currentTimeMillis();
            if (GameConstants.isForceRespawn(mapid)) {
                createMobInterval = 15000;
            }
//            respawn(false);
        }
    }

    public SpawnPoint addMonsterSpawn(MapleMonster monster, int mobTime, byte carnivalTeam, String msg) {
        Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        SpawnPoint sp = new SpawnPoint(monster, newpos, mobTime, carnivalTeam, msg);
        if (carnivalTeam > -1) {
            monsterSpawn.add(0, sp); //at the beginning
        } else {
            monsterSpawn.add(sp);
        }
        return sp;
    }

    public void addAreaMonsterSpawn(MapleMonster monster, Point pos1, Point pos2, Point pos3, int mobTime, String msg, boolean shouldSpawn, boolean sendWorldMsg) {
        pos1 = calcPointBelow(pos1);
        pos2 = calcPointBelow(pos2);
        pos3 = calcPointBelow(pos3);
        if (pos1 != null) {
            pos1.y -= 1;
        }
        if (pos2 != null) {
            pos2.y -= 1;
        }
        if (pos3 != null) {
            pos3.y -= 1;
        }
        if (pos1 == null && pos2 == null && pos3 == null) {
            System.out.println("WARNING: mapid " + mapid + ", monster " + monster.getId() + " could not be spawned.");
            return;
        } else if (pos1 != null) {
            if (pos2 == null) {
                pos2 = new Point(pos1);
            }
            if (pos3 == null) {
                pos3 = new Point(pos1);
            }
        } else if (pos2 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos2);
            }
            if (pos3 == null) {
                pos3 = new Point(pos2);
            }
        } else if (pos3 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos3);
            }
            if (pos2 == null) {
                pos2 = new Point(pos3);
            }
        }
        monsterSpawn.add(new SpawnPointAreaBoss(monster, pos1, pos2, pos3, mobTime, msg, shouldSpawn, sendWorldMsg));
    }

    public List<MapleCharacter> getCharacters() {
        return getCharactersThreadsafe();
    }

    public List<MapleCharacter> getCharactersThreadsafe() {
        List<MapleCharacter> chars = new ArrayList<>();
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                chars.add(mc);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return chars;
    }

    public MapleCharacter getCharacterByName(String id) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                if (mc.getName().equalsIgnoreCase(id)) {
                    return mc;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    public MapleCharacter getCharacterById_InMap(int id) {
        return getCharacterById(id);
    }

    public MapleCharacter getCharacterById(int id) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                if (mc.getId() == id) {
                    return mc;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    /**
     * ??????????????????????????????????????????
     *
     * @param chr ????????????
     * @param mo ????????????
     */
    public void updateMapObjectVisibility(MapleCharacter chr, MapleMapObject mo) {
        if (chr == null) {
            return;
        }
        if (!chr.isMapObjectVisible(mo)) { //??????????????????????????????????????????
            if (mo.getType() == MapleMapObjectType.MIST || mo.getType() == MapleMapObjectType.EXTRACTOR || mo.getType() == MapleMapObjectType.SUMMON || mo.getType() == MapleMapObjectType.FAMILIAR || mo instanceof MechDoor || mo.getTruePosition().distanceSq(chr.getTruePosition()) <= mo.getRange()) {
                chr.addVisibleMapObject(mo);
                mo.sendSpawnData(chr.getClient());
            }
        } else { // ????????????????????????????????????
            if (!(mo instanceof MechDoor) && mo.getType() != MapleMapObjectType.MIST && mo.getType() != MapleMapObjectType.EXTRACTOR && mo.getType() != MapleMapObjectType.SUMMON && mo.getType() != MapleMapObjectType.FAMILIAR && mo.getTruePosition().distanceSq(chr.getTruePosition()) > mo.getRange()) {
                chr.removeVisibleMapObject(mo);
                mo.sendDestroyData(chr.getClient());
            } else if (mo.getType() == MapleMapObjectType.MONSTER) { //??????????????????????????????????????????????????????
                if (chr.getTruePosition().distanceSq(mo.getTruePosition()) <= GameConstants.maxViewRangeSq_Half()) { //?????????????????????????????????????????????????????????????????????????????????????????????
                    updateMonsterController((MapleMonster) mo);
                }
            }
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);

        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                updateMapObjectVisibility(mc, monster);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    /**
     * ????????????
     *
     * @param player ??????
     * @param newPosition ??????
     */
    public void movePlayer(MapleCharacter player, Point newPosition) {
        player.setPosition(newPosition);
        try {
            Collection<MapleMapObject> visibleObjects = player.getAndWriteLockVisibleMapObjects();
            ArrayList<MapleMapObject> copy = new ArrayList<>(visibleObjects);
            Iterator<MapleMapObject> itr = copy.iterator();
            while (itr.hasNext()) {
                MapleMapObject mo = itr.next();
                if (mo != null && getMapObject(mo.getObjectId(), mo.getType()) == mo) {
                    updateMapObjectVisibility(player, mo);
                } else if (mo != null) {
                    visibleObjects.remove(mo);
                }
            }
            for (MapleMapObject mo : getMapObjectsInRange(player.getPosition(), GameConstants.maxViewRangeSq())) {
                if (mo != null && !player.isMapObjectVisible(mo)) {
                    mo.sendSpawnData(player.getClient());
                    visibleObjects.add(mo);
                }
            }
        } finally {
            player.unlockWriteVisibleMapObjects();
        }
    }

    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distanceSq(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal findClosestPortal(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distanceSq(from);
            if (distance < shortestDistance) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal getRandomSpawnpoint() {
        List<MaplePortal> spawnPoints_ = new ArrayList<>();
        for (MaplePortal portal : portals.values()) {
            if (portal.getType() >= 0 && portal.getType() <= 2) {
                spawnPoints_.add(portal);
            }
        }
        MaplePortal portal = spawnPoints_.get(new Random().nextInt(spawnPoints_.size()));
        return portal != null ? portal : getPortal(0);
    }

    public String spawnDebug() {
        StringBuilder sb = new StringBuilder("Mobs in map : ");
        sb.append(this.getMobsSize());
        sb.append(" spawnedMonstersOnMap: ");
        sb.append(spawnedMonstersOnMap);
        sb.append(" spawnpoints: ");
        sb.append(monsterSpawn.size());
        sb.append(" maxRegularSpawn: ");
        sb.append(maxRegularSpawn);
        sb.append(" actual monsters: ");
        sb.append(getNumMonsters());
        sb.append(" monster rate: ");
        sb.append(monsterRate);
        sb.append(" fixed: ");
        sb.append(fixedMob);

        return sb.toString();
    }

    public int getMapObjectSize() {
        return mapobjects.size();
    }

    public int getCharactersSize() {
        int ret = 0;
        charactersLock.readLock().lock();
        try {
            Iterator<MapleCharacter> ltr = characters.iterator();
            while (ltr.hasNext()) {
                ltr.next();
                ret++;
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();
    }

    private class ActivateItemReactor implements Runnable {

        private MapleMapItem mapitem;
        private MapleReactor reactor;
        private MapleClient c;

        public ActivateItemReactor(MapleMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId(), mapitem.getType()) && !mapitem.isPickedUp()) {
                mapitem.expire(MapleMap.this);
                reactor.hitReactor(c);
                reactor.setTimerActive(false);

                if (reactor.getDelay() > 0) {
                    MapTimer.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            reactor.forceHitReactor(c.getPlayer(), (byte) 0);
                        }
                    }, reactor.getDelay());
                }
            } else {
                reactor.setTimerActive(false);
            }
        }
    }

    public void respawn(boolean force) {
        respawn(force, System.currentTimeMillis());
    }

    public void respawn(boolean force, long now) {
        lastSpawnTime = now;
        if (force) { //cpq quick hack
            final int numShouldSpawn = monsterSpawn.size() - spawnedMonstersOnMap.get();

            if (numShouldSpawn > 0) {
                int spawned = 0;

                for (Spawns spawnPoint : monsterSpawn) {
                    spawnPoint.spawnMonster(this);
                    spawned++;
                    if (spawned >= numShouldSpawn) {
                        break;
                    }
                }
            }
        } else {
            int numShouldSpawn = (GameConstants.isForceRespawn(mapid) ? monsterSpawn.size() : maxRegularSpawn) - spawnedMonstersOnMap.get();
            if (numShouldSpawn > 0) {
                int spawned = 0;

                List<Spawns> randomSpawn = new ArrayList<>(monsterSpawn);
                Collections.shuffle(randomSpawn);

                for (Spawns spawnPoint : randomSpawn) {
                    if (!isSpawns && spawnPoint.getMobTime() > 0) {
                        continue;
                    }
                    if (spawnPoint.shouldSpawn(lastSpawnTime) || GameConstants.isForceRespawn(mapid) || (monsterSpawn.size() < 10 && maxRegularSpawn > monsterSpawn.size() && partyBonusRate > 0)) {
                        spawnPoint.spawnMonster(this);
                        spawned++;
                    }
                    if (spawned >= numShouldSpawn) {
                        break;
                    }
                }
            }
        }
    }

    private interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    public String getSnowballPortal() {
        int[] teamss = new int[2];
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr.getTruePosition().y > -80) {
                    teamss[0]++;
                } else {
                    teamss[1]++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        if (teamss[0] > teamss[1]) {
            return "st01";
        } else {
            return "st00";
        }
    }

    public boolean isDisconnected(int id) {
        return dced.contains(id);
    }

    public void addDisconnected(int id) {
        dced.add(id);
    }

    public void resetDisconnected() {
        dced.clear();
    }

    public void startSpeedRun() {
        final MapleSquad squads = getSquadByMap();
        if (squads != null) {
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter chr : characters) {
                    if (chr.getName().equals(squads.getLeaderName()) && !chr.isIntern()) {
                        startSpeedRun(chr.getName());
                        return;
                    }
                }
            } finally {
                charactersLock.readLock().unlock();
            }
        }
    }

    public void startSpeedRun(String leader) {
        speedRunStart = System.currentTimeMillis();
        speedRunLeader = leader;
    }

    public void endSpeedRun() {
        speedRunStart = 0;
        speedRunLeader = "";
    }

    public void getRankAndAdd(String leader, String time, ExpeditionType type, long timz, Collection<String> squad) {
        try {
            long lastTime = SpeedRunner.getSpeedRunData(type) == null ? 0 : SpeedRunner.getSpeedRunData(type).right;
            StringBuilder rett = new StringBuilder();
            if (squad != null) {
                for (String chr : squad) {
                    rett.append(chr);
                    rett.append(",");
                }
            }
            String z = rett.toString();
            if (squad != null) {
                z = z.substring(0, z.length() - 1);
            }
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO speedruns(`type`, `leader`, `timestring`, `time`, `members`) VALUES (?,?,?,?,?)")) {
                ps.setString(1, type.name());
                ps.setString(2, leader);
                ps.setString(3, time);
                ps.setLong(4, timz);
                ps.setString(5, z);
                ps.executeUpdate();
            }

            if (lastTime == 0) { //great, we just add it
                SpeedRunner.addSpeedRunData(type, SpeedRunner.addSpeedRunData(new StringBuilder(SpeedRunner.getPreamble(type)), new HashMap<Integer, String>(), z, leader, 1, time), timz);
            } else {
                //i wish we had a way to get the rank
                //TODO revamp
                SpeedRunner.removeSpeedRunData(type);
                SpeedRunner.loadSpeedRunData(type);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public long getSpeedRunStart() {
        return speedRunStart;
    }

    public void disconnectAll() {
        for (MapleCharacter chr : getCharactersThreadsafe()) {
            if (!chr.isGM()) {
                chr.getClient().disconnect(true, false);
                chr.getClient().getSession().close(true);
            }
        }
    }

    public List<MapleNPC> getAllNPCs() {
        return getAllNPCsThreadsafe();
    }

    public List<MapleNPC> getAllNPCsThreadsafe() {
        ArrayList<MapleNPC> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.NPC).values()) {
                ret.add((MapleNPC) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
        return ret;
    }

    public void resetNPCs() {
        removeNpc(-1);
    }

    public void resetPQ(int level) {
        resetFully();
        for (MapleMonster mons : getAllMonstersThreadsafe()) {
            mons.changeLevel(level, true);
        }
        resetSpawnLevel(level);
    }

    public void resetSpawnLevel(int level) {
        for (Spawns spawn : monsterSpawn) {
            if (spawn instanceof SpawnPoint) {
                ((SpawnPoint) spawn).setLevel(level);
            }
        }
    }

    public void resetFully() {
        resetFully(true);
    }

    public void resetFully(boolean respawn) {
        killAllMonsters(false);
        reloadReactors();
        removeDrops();
        resetNPCs();
        resetSpawns();
        resetDisconnected();
        endSpeedRun();
        cancelSquadSchedule(true);
        resetPortals();
        environment.clear();
        if (respawn) {
            respawn(true);
        }
    }

    public void cancelSquadSchedule(boolean interrupt) {
        squadTimer = false;
        checkStates = true;
        if (squadSchedule != null) {
            squadSchedule.cancel(interrupt);
            squadSchedule = null;
        }
    }

    public void removeDrops() {
        List<MapleMapItem> mapItems = this.getAllItemsThreadsafe();
        for (MapleMapItem mapItem : mapItems) {
            mapItem.expire(this);
        }
    }

    public void removeDropsDelay() {
        List<MapleMapItem> mapItems = this.getAllItemsThreadsafe();
        int delay = 0, i = 0;
        for (MapleMapItem mapItem : mapItems) {
            i++;
            if (i < 50) { //????????????50????????? ????????????????????????
                mapItem.expire(this);
            } else {
                delay++;
                if (mapItem.hasFFA()) {
                    mapItem.registerFFA(delay * 20); //????????????????????? 30000 ?????? ?????????30??? ???????????????????????? delay * 20 ??????
                } else {
                    mapItem.registerExpire(delay * 30); //??????????????????ian??? 120000 ?????? ????????? 120??? ???????????????????????? delay * 30 ??????
                }
            }
        }
    }

    public void resetAllSpawnPoint(int mobid, int mobTime) {
        Collection<Spawns> AllSpawnPoints = new LinkedList<>(monsterSpawn);
        resetFully();
        monsterSpawn.clear();
        for (Spawns spawnPoint : AllSpawnPoints) {
            MapleMonster newMons = MapleLifeFactory.getMonster(mobid);
            newMons.setF(spawnPoint.getF());
            newMons.setFh(spawnPoint.getFh());
            newMons.setPosition(spawnPoint.getPosition());
            addMonsterSpawn(newMons, mobTime, (byte) -1, null);
        }
        loadMonsterRate(true);
    }

    public void resetSpawns() {
        boolean changed = false;
        Iterator<Spawns> AllSpawnPoints = monsterSpawn.iterator();
        while (AllSpawnPoints.hasNext()) {
            if (AllSpawnPoints.next().getCarnivalId() > -1) {
                AllSpawnPoints.remove();
                changed = true;
            }
        }
        setSpawns(true);
        if (changed) {
            loadMonsterRate(true);
        }
    }

    public boolean makeCarnivalSpawn(int team, MapleMonster newMons, int num) {
        MonsterPoint ret = null;
        for (MonsterPoint mp : nodes.getMonsterPoints()) {
            if (mp.team == team || mp.team == -1) {
                Point newpos = calcPointBelow(new Point(mp.x, mp.y));
                newpos.y -= 1;
                boolean found = false;
                for (Spawns s : monsterSpawn) {
                    if (s.getCarnivalId() > -1 && (mp.team == -1 || s.getCarnivalTeam() == mp.team) && s.getPosition().x == newpos.x && s.getPosition().y == newpos.y) {
                        found = true;
                        break; //this point has already been used.
                    }
                }
                if (!found) {
                    ret = mp; //this point is safe for use.
                    break;
                }
            }
        }
        if (ret != null) {
            newMons.setCy(ret.cy);
            newMons.setF(0); //always.
            newMons.setFh(ret.fh);
            newMons.setRx0(ret.x + 50);
            newMons.setRx1(ret.x - 50); //does this matter
            newMons.setPosition(new Point(ret.x, ret.y));
            newMons.setHide(false);
            SpawnPoint sp = addMonsterSpawn(newMons, 1, (byte) team, null);
            sp.setCarnival(num);
        }
        return ret != null;
    }

    public boolean makeCarnivalReactor(int team, int num) {
        MapleReactor old = getReactorByName(team + "" + num);
        if (old != null && old.getState() < 5) { //already exists
            return false;
        }
        Point guardz = null;
        List<MapleReactor> react = getAllReactorsThreadsafe();
        for (Pair<Point, Integer> guard : nodes.getGuardians()) {
            if (guard.right == team || guard.right == -1) {
                boolean found = false;
                for (MapleReactor r : react) {
                    if (r.getTruePosition().x == guard.left.x && r.getTruePosition().y == guard.left.y && r.getState() < 5) {
                        found = true;
                        break; //already used
                    }
                }
                if (!found) {
                    guardz = guard.left; //this point is safe for use.
                    break;
                }
            }
        }
        if (guardz != null) {
            MapleReactor my = new MapleReactor(MapleReactorFactory.getReactor(9980000 + team), 9980000 + team);
            my.setState((byte) 1);
            my.setName(team + "" + num); //lol
            //with num. -> guardians in factory
            spawnReactorOnGroundBelow(my, guardz);
            final MCSkill skil = MapleCarnivalFactory.getInstance().getGuardian(num);
            for (MapleMonster mons : getAllMonstersThreadsafe()) {
                if (mons.getCarnivalTeam() == team) {
                    skil.getSkill().applyEffect(null, mons, false);
                }
            }
        }
        return guardz != null;
    }

    public void blockAllPortal() {
        for (MaplePortal p : portals.values()) {
            p.setPortalState(false);
        }
    }

    public boolean getAndSwitchTeam() {
        return getCharactersSize() % 2 != 0;
    }

    public void setSquad(MapleSquadType s) {
        this.squad = s;
    }

    public int getChannel() {
        return channel;
    }

    public int getConsumeItemCoolTime() {
        return consumeItemCoolTime;
    }

    public void setConsumeItemCoolTime(int ciit) {
        this.consumeItemCoolTime = ciit;
    }

    public void setPermanentWeather(int pw) {
        this.permanentWeather = pw;
    }

    public int getPermanentWeather() {
        return permanentWeather;
    }

    public void checkStates(String chr) {
        if (!checkStates) {
            return;
        }
        MapleSquad sqd = getSquadByMap();
        EventManager em = getEMByMap();
        int size = getCharactersSize();
        if (sqd != null && sqd.getStatus() == 2) {
            sqd.removeMember(chr);
            if (em != null) {
                if (sqd.getLeaderName().equalsIgnoreCase(chr)) {
                    em.setProperty("leader", "false");
                }
                if (chr.equals("") || size == 0) {
                    em.setProperty("state", "0");
                    em.setProperty("leader", "true");
                    cancelSquadSchedule(!chr.equals(""));
                    sqd.clear();
                    sqd.copy();
                }
            }
        }
        if (em != null && em.getProperty("state") != null && (sqd == null || sqd.getStatus() == 2) && size == 0) {
            em.setProperty("state", "0");
            if (em.getProperty("leader") != null) {
                em.setProperty("leader", "true");
            }
        }
        if (speedRunStart > 0 && size == 0) {
            endSpeedRun();
        }
        //if (squad != null) {
        //    final MapleSquad sqdd = ChannelServer.getInstance(channel).getMapleSquad(squad);
        //    if (sqdd != null && chr != null && chr.length() > 0 && sqdd.getAllNextPlayer().contains(chr)) {
        //	sqdd.getAllNextPlayer().remove(chr);
        //	broadcastMessage(MaplePacketCreator.serverNotice(5, "The queued player " + chr + " has left the map."));
        //    }
        //}
    }

    public void setCheckStates(boolean b) {
        this.checkStates = b;
    }

    public void setNodes(MapleNodes mn) {
        this.nodes = mn;
    }

    public List<MaplePlatform> getPlatforms() {
        return nodes.getPlatforms();
    }

    public Collection<MapleNodeInfo> getNodes() {
        return nodes.getNodes();
    }

    public MapleNodeInfo getNode(int index) {
        return nodes.getNode(index);
    }

    public boolean isLastNode(int index) {
        return nodes.isLastNode(index);
    }

    public List<Rectangle> getAreas() {
        return nodes.getAreas();
    }

    public Rectangle getArea(int index) {
        return nodes.getArea(index);
    }

    public void changeEnvironment(String ms, int type) {
        broadcastMessage(MaplePacketCreator.environmentChange(ms, type));
    }

    public void toggleEnvironment(String ms) {
        if (environment.containsKey(ms)) {
            moveEnvironment(ms, environment.get(ms) == 1 ? 2 : 1);
        } else {
            moveEnvironment(ms, 1);
        }
    }

    public void moveEnvironment(String ms, int type) {
        broadcastMessage(MaplePacketCreator.environmentMove(ms, type));
        environment.put(ms, type);
    }

    public Map<String, Integer> getEnvironment() {
        return environment;
    }

    public int getNumPlayersInArea(int index) {
        return getNumPlayersInRect(getArea(index));
    }

    public int getNumPlayersInRect(Rectangle rect) {
        int ret = 0;
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
//            MapleCharacter a;
            while (ltr.hasNext()) {
                if (rect.contains(ltr.next().getTruePosition())) {
                    ret++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public int getNumPlayersItemsInArea(int index) {
        return getNumPlayersItemsInRect(getArea(index));
    }

    public int getNumPlayersItemsInRect(Rectangle rect) {
        int ret = getNumPlayersInRect(rect);
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (rect.contains(mmo.getTruePosition())) {
                    ret++;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public void broadcastGMMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastGMMessage(repeatToSource ? null : source, packet);
    }

    private void broadcastGMMessage(MapleCharacter source, byte[] packet) {
        charactersLock.readLock().lock();
        try {
            if (source == null) {
                for (MapleCharacter chr : characters) {
                    if (chr.isStaff()) {
                        chr.getClient().getSession().write(packet);
                    }
                }
            } else {
                for (MapleCharacter chr : characters) {
                    if (chr != source && (chr.getGMLevel() >= source.getGMLevel())) {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public List<Pair<Integer, Integer>> getMobsToSpawn() {
        return nodes.getMobsToSpawn();
    }

    public List<Integer> getSkillIds() {
        return nodes.getSkillIds();
    }

    public boolean canSpawn(long now) {
        return lastSpawnTime > 0 && lastSpawnTime + createMobInterval < now;
    }

    public boolean canHurt(long now) {
        if (lastHurtTime > 0 && lastHurtTime + decHPInterval < now) {
            lastHurtTime = now;
            return true;
        }
        return false;
    }

    public void resetShammos(final MapleClient c) {
        killAllMonsters(true);
        broadcastMessage(MaplePacketCreator.serverNotice(5, "A player has moved too far from Shammos. Shammos is going back to the start."));
        EtcTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (c.getPlayer() != null) {
                    c.getPlayer().changeMap(MapleMap.this, getPortal(0));
                    if (getCharactersThreadsafe().size() > 1) {
                        MapScriptMethods.startScript_FirstUser(c, "shammos_Fenter");
                    }
                }
            }
        }, 500); //avoid dl
    }

    public int getInstanceId() {
        return instanceid;
    }

    public void setInstanceId(int ii) {
        this.instanceid = ii;
    }

    public int getPartyBonusRate() {
        return partyBonusRate;
    }

    public void setPartyBonusRate(int ii) {
        this.partyBonusRate = ii;
    }

    public short getTop() {
        return top;
    }

    public short getBottom() {
        return bottom;
    }

    public short getLeft() {
        return left;
    }

    public short getRight() {
        return right;
    }

    public void setTop(int ii) {
        this.top = (short) ii;
    }

    public void setBottom(int ii) {
        this.bottom = (short) ii;
    }

    public void setLeft(int ii) {
        this.left = (short) ii;
    }

    public void setRight(int ii) {
        this.right = (short) ii;
    }

    public List<Pair<Point, Integer>> getGuardians() {
        return nodes.getGuardians();
    }

    public DirectionInfo getDirectionInfo(int i) {
        return nodes.getDirection(i);
    }

    /**
     * ????????????????????????.
     *
     * @?????????: ??????24?????? 1?????????41??? 1????????????60?????? 60???????????????6??? ??????10?????? ???10??????1??? ??????7???
     * @???????????????????????? int givNx = ((jsNx * chr.getLevel()/2) + Nx);
     * @??????????????? ????????????????????????????????? 100?????????/??????????????????1000?????????
     */
    public void AutoNx(int jsNx, boolean isAutoPoints) {
        if (mapid != 910000000) {
            return;
        }
        for (MapleCharacter chr : characters) {
            if (chr != null) {
//                if (chr.getClient().getLastPing() <= 0) {
//                    chr.getClient().sendPing();
//                }
                if (isAutoPoints) {
                    chr.gainPlayerPoints(jsNx);
                    chr.dropMessage(5, "[????????????] ???????????????????????? [" + jsNx + "] ?????????.");
                } else {
                    int givNx = ((chr.getLevel() / 10) + jsNx);
                    chr.modifyCSPoints(2, givNx);
                    chr.dropMessage(5, "[????????????] ???????????????????????? [" + givNx + "] ????????????.");
                }
            }
        }
    }

    /*
     * ????????????
     */
    public void AutoGain(int jsexp, int expRate) {
        if (mapid != 910000000) {
            return;
        }
        for (MapleCharacter chr : characters) {
            if (chr == null || chr.getLevel() >= 250) {
                return;
            }
            int givExp = ((jsexp * chr.getLevel()) + expRate);
            givExp *= 3;
            chr.gainExp(givExp, true, false, true);
            chr.dropMessage(5, "[????????????] ???????????????????????? [" + givExp + "] ?????????.");
        }
    }

    /*
     * ???????????????????????????
     */
    public boolean isMarketMap() {
        return mapid >= 910000000 && mapid <= 910000017;
    }

    /*
     * ??????PK??????
     */
    public boolean isPvpMaps() {
        return isPvpMap() || isPartyPvpMap() || isGuildPvpMap();
    }

    /*
     * ????????????PK??????
     */
    public boolean isPvpMap() {
        return ServerProperties.isPvpMap(mapid);
    }

    /*
     * ????????????PK??????
     */
    public boolean isPartyPvpMap() {
        return mapid == 910000019 || mapid == 910000020;
    }

    /*
     * ????????????PK??????
     */
    public boolean isGuildPvpMap() {
        return mapid == 910000021 || mapid == 910000022;
    }

    /*
     * ?????????BOSS??????
     */
    public boolean isBossMap() {
        switch (mapid) {
            case 105100400: //??????????????? - ??????????????????
            case 105100300: //??????????????? - ??????????????????
            case 280030000: //????????? - ???????????????
            case 280030100: //??????????????? - ???????????????
            case 280030001: //??????????????? - ?????????????????????
            case 240040700: //????????? - ??????????????????
            case 240060200: //???????????? - ??????????????????
            case 240060201: //???????????? - ????????????????????????
            case 270050100: //??????????????? - ????????????
            case 802000111: //???????????? - ????????? (?????????)
            case 802000211: //???????????? - ????????? 2100??? (?????????)
            case 802000311: //???????????? - ?????? 2095??? (?????????)
            case 802000411: //???????????? - ???????????? 2102??? (?????????)
            case 802000611: //???????????? - ????????????????????? 2102??? (?????????)
            case 802000711: //???????????? - ??????????????? 2102??????????????????
            case 802000801: //???????????? - ???????????? 2102???(??????)
            case 802000802: //???????????? - ???????????? 2102???(????????????)
            case 802000803: //???????????? - ???????????? 2102???(??????)
            case 802000821: //???????????? - ?????????????????? 2102??????????????????
            case 802000823: //???????????? - ?????????????????? 2102??????????????????
            case 211070100: //??????????????? - ?????????
            case 211070101: //??????????????? - ????????????
            case 211070110: //??????????????? - ????????????
            case 551030200: //???????????? - ????????????
            case 271040100: //??????????????? - ??????????????????
            case 271040200: //??????????????? - ??????????????????
            case 300030310: //???????????? - ???????????????
            case 220080001: //????????? - ??????????????????
            case 262031300: //???????????? - ????????????
            case 262031310: //???????????? - ?????????????????????
            case 272030400: //???????????? - ????????????
            case 272030420: //???????????? - ??????????????????
                return true;
            default:
                return false;
        }
    }

    /*
     * ????????????????????????
     */
    public void checkMoveMonster(Point from, boolean fly, MapleCharacter chr) {
        if (maxRegularSpawn <= 2 || monsterSpawn.isEmpty() || monsterRate <= 1.0 || chr == null) {
            return;
        }
        int check = (int) (((fly ? 70 : 60) / 100.0) * maxRegularSpawn);
        //System.err.println("????????????: " + check + " ????????????: " + getMonstersInRange(from, 4000.0).size() + " ????????????: " + maxRegularSpawn);
        if (getMonstersInRange(from, 5000.0).size() >= check) {
            //System.err.println("?????????????????? ??????????????????...");
            for (MapleMapObject obj : getMonstersInRange(from, Double.POSITIVE_INFINITY)) {
                MapleMonster mob = (MapleMonster) obj;
                killMonster(mob, chr, false, false, (byte) 1);
            }
        }
    }

    /*
     * ??????????????????
     */
    public void spawnArrowsTurret(final MapleArrowsTurret aturet) {
        MapTimer tMan = MapTimer.getInstance();
        final ScheduledFuture poisonSchedule;
        spawnAndAddRangedMapObject(aturet, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                broadcastMessage(BuffPacket.isArrowsTurretAction(aturet, false));
                c.getSession().write(BuffPacket.isArrowsTurretAction(aturet, true));
            }
        });
        poisonSchedule = tMan.register(new Runnable() {
            @Override
            public void run() {
                if (getCharacterById(aturet.getOwnerId()) == null) {
                    removeMapObject(aturet);
                    broadcastMessage(BuffPacket.cancelArrowsTurret(aturet));
                }
            }
        }, 500, 500);

        aturet.setSchedule(tMan.schedule(new Runnable() {
            @Override
            public void run() {
                poisonSchedule.cancel(false);
                removeMapObject(aturet);
                broadcastMessage(BuffPacket.cancelArrowsTurret(aturet));
            }
        }, ((20 + (long) Math.floor(aturet.getSkillLevel() / 3)) * 1000)));
    }

    /*
     * ????????????????????????????????????
     */
    public List<MapleArrowsTurret> getAllArrowsTurrets() {
        return getArrowsTurretsThreadsafe();
    }

    public List<MapleArrowsTurret> getArrowsTurretsThreadsafe() {
        ArrayList ret = new ArrayList();
        mapobjectlocks.get(MapleMapObjectType.ARROWS_TURRET).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ARROWS_TURRET).values()) {
                ret.add(mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ARROWS_TURRET).readLock().unlock();
        }
        return ret;
    }

    public void addKSPsychicObject(int chrid, int skillid, List<KSPsychicSkillEntry> infos) {
        Map<Integer, List<Pair<Integer, Integer>>> ksobj = new HashMap<>();
        List<Pair<Integer, Integer>> objs = new ArrayList<>();
        for (KSPsychicSkillEntry ksse : infos) {
            objs.add(new Pair<>(ksse.getOid(), ksse.getMobOid() != 0 ? ksse.getMobOid() : ksse.getObjectid()));
        }
        ksobj.put(skillid, objs);
        kspsychicObjects.put(chrid, ksobj);
    }

    public int removeKSPsychicObject(int chrid, int skillid, int moboid) {
        int oid = -1;
        kspsychicLock.writeLock().lock();
        try {
            if (!kspsychicObjects.containsKey(chrid)) {
                return oid;
            } else if (!kspsychicObjects.get(chrid).containsKey(skillid)) {
                return oid;
            }
            Iterator<Pair<Integer, Integer>> it = kspsychicObjects.get(chrid).get(skillid).iterator();
            while (it.hasNext()) {
                Pair<Integer, Integer> ks = it.next();
                if (ks.getRight() == moboid) {
                    oid = ks.getLeft();
                    it.remove();
                }
            }
        } finally {
            kspsychicLock.writeLock().unlock();
        }
        return oid;
    }

    public void addKSUltimateSkill(int chrid, int moboid) {
        ksultimates.put(chrid, moboid);
    }

    public void removeKSUltimateSkill(int chrid) {
        ksultimates.remove(chrid);
    }

    public boolean isKSUltimateSkill(int chrid, int moboid) {
        return ksultimates.containsKey(chrid) && ksultimates.get(chrid) == moboid;
    }
}
