package scripting;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.inventory.*;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.channel.handler.InterServerHandler;
import handling.world.WorldBroadcastService;
import handling.world.WorldGuildService;
import handling.world.guild.MapleGuild;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.log4j.Logger;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.npc.NPCScriptManager;
import server.AutoRegister;
import server.MapleActivity;
import server.MapleCarnivalChallenge;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Randomizer;
import server.RankingTop;
import server.RankingTop.CharNameAndId;
import server.StructItemOption;
import server.Timer;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.OverrideMonsterStats;
import server.maps.*;
import server.maps.events.Event_DojoAgent;
import server.quest.MapleQuest;
import tools.DateUtil;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Quadruple;
import tools.StringUtil;
import tools.packet.EffectPacket;
import tools.packet.NPCPacket;
import tools.packet.UIPacket;

public abstract class AbstractPlayerInteraction {

    private static final Logger log = Logger.getLogger(AbstractPlayerInteraction.class);
    protected MapleClient c;
    protected int id, id2;

    public AbstractPlayerInteraction(MapleClient c) {
        this.c = c;
        this.id = 0;
        this.id2 = 0;
    }

    public AbstractPlayerInteraction(MapleClient c, int id, int id2) {
        this.c = c;
        this.id = id;
        this.id2 = id2;
    }

    /*
     * ????????????
     */
    public MapleClient getClient() {
        return c;
    }

    public MapleClient getC() {
        return c;
    }

    /*
     * ????????????
     */
    public MapleCharacter getChar() {
        return c.getPlayer();
    }

    public MapleCharacter getPlayer() {
        return c.getPlayer();
    }

    public int getPosX() {
        return c.getPlayer().getTruePosition().x;
    }

    public int getPosY() {
        return c.getPlayer().getTruePosition().y;
    }

    /*
     * ????????????
     */
    public ChannelServer getChannelServer() {
        return c.getChannelServer();
    }

    public EventManager getEventManager(String event) {
        return c.getChannelServer().getEventSM().getEventManager(event);
    }

    public EventInstanceManager getEventInstance() {
        return c.getPlayer().getEventInstance();
    }

    /*
     * ??????????????????
     */
    public void warp(int mapId) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapz == null) {
            playerMessage(1, "??????????????????ID:" + mapId + "\r\n???????????????????????????????????????");
            return;
        }
        try {
            c.getPlayer().changeMap(mapz, mapz.getPortalSP().get(Randomizer.nextInt(mapz.getPortalSP().size())));
        } catch (Exception e) {
            c.getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public void warp_Instanced(int mapId) {
        MapleMap mapz = getMap_Instanced(mapId);
        try {
            c.getPlayer().changeMap(mapz, mapz.getPortalSP().get(Randomizer.nextInt(mapz.getPortalSP().size())));
        } catch (Exception e) {
            c.getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public void warp(int mapId, int portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (portal != 0 && mapId == c.getPlayer().getMapId()) { //test
            Point portalPos = new Point(c.getPlayer().getMap().getPortal(portal).getPosition());
            if (portalPos.distanceSq(getPlayer().getTruePosition()) < 90000.0) { //estimation
                c.getSession().write(MaplePacketCreator.instantMapWarp((byte) portal)); //until we get packet for far movement, this will do
                c.getPlayer().checkFollow();
                c.getPlayer().getMap().movePlayer(c.getPlayer(), portalPos);
            } else {
                c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
            }
        } else {
            c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        }
    }

    public void warpS(int mapId, int portal) {
        MapleMap mapz = getWarpMap(mapId);
        c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public void warp(int mapId, String portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapId == 109060000 || mapId == 109060002 || mapId == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        if (mapId == c.getPlayer().getMapId()) { //test
            Point portalPos = new Point(c.getPlayer().getMap().getPortal(portal).getPosition());
            if (portalPos.distanceSq(getPlayer().getTruePosition()) < 90000.0) { //estimation
                c.getPlayer().checkFollow();
                c.getSession().write(MaplePacketCreator.instantMapWarp((byte) c.getPlayer().getMap().getPortal(portal).getId()));
                c.getPlayer().getMap().movePlayer(c.getPlayer(), new Point(c.getPlayer().getMap().getPortal(portal).getPosition()));
            } else {
                c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
            }
        } else {
            c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
        }
    }

    public void warpS(int mapId, String portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapId == 109060000 || mapId == 109060002 || mapId == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        c.getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public void warpMap(int mapId, int portal) {
        MapleMap map = getMap(mapId);
        for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
            chr.changeMap(map, map.getPortal(portal));
        }
    }

    public void playPortalSE() {
        c.getSession().write(EffectPacket.showOwnBuffEffect(0, 8, 1, 1));
    }

    private MapleMap getWarpMap(int mapId) {
        return ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(mapId);
    }

    public MapleMap getMap() {
        return c.getPlayer().getMap();
    }

    public MapleMap getMap(int mapId) {
        return getWarpMap(mapId);
    }

    public MapleMap getMap_Instanced(int mapId) {
        return c.getPlayer().getEventInstance() == null ? getMap(mapId) : c.getPlayer().getEventInstance().getMapInstance(mapId);
    }

    /*
     * ????????????
     * ????????????????????????????????????
     */
    public void spawnMobLevel(int mobId, int level) {
        spawnMobLevel(mobId, 1, level, c.getPlayer().getTruePosition());
    }

    public void spawnMobLevel(int mobId, int quantity, int level) {
        spawnMobLevel(mobId, quantity, level, c.getPlayer().getTruePosition());
    }

    public void spawnMobLevel(int mobId, int quantity, int level, int x, int y) {
        spawnMobLevel(mobId, quantity, level, new Point(x, y));
    }

    public void spawnMobLevel(int mobId, int quantity, int level, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null || !mob.getStats().isChangeable()) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(-11, "[????????????] spawnMobLevel?????????????????????ID???: " + mobId + " ?????????????????????????????????????????????????????????????????????????????????");
                }
                continue;
            }
            mob.changeLevel(level, false);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * ????????????????????????????????????
     */
    public void spawnMobStats(int mobId, long newhp, int newExp) {
        spawnMobStats(mobId, 1, newhp, newExp, c.getPlayer().getTruePosition());
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp) {
        spawnMobStats(mobId, quantity, newhp, newExp, c.getPlayer().getTruePosition());
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp, int x, int y) {
        spawnMobStats(mobId, quantity, newhp, newExp, new Point(x, y));
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(-11, "[????????????] spawnMobStats?????????????????????ID???: " + mobId + " ??????????????????");
                }
                continue;
            }
            OverrideMonsterStats overrideStats = new OverrideMonsterStats(newhp, mob.getMobMaxMp(), newExp <= 0 ? mob.getMobExp() : newExp, false);
            mob.setOverrideStats(overrideStats);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * ?????????????????????
     */
    public void spawnMobMultipler(int mobId, int multipler) {
        spawnMobMultipler(mobId, 1, multipler, c.getPlayer().getTruePosition());
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler) {
        spawnMobMultipler(mobId, quantity, multipler, c.getPlayer().getTruePosition());
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler, int x, int y) {
        spawnMobMultipler(mobId, quantity, multipler, new Point(x, y));
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(-11, "[????????????] spawnMobMultipler?????????????????????ID???: " + mobId + " ??????????????????");
                }
                continue;
            }
            OverrideMonsterStats overrideStats = new OverrideMonsterStats(mob.getMobMaxHp() * multipler, mob.getMobMaxMp() * multipler, mob.getMobExp() + (multipler * 100), false);
            mob.setOverrideStats(overrideStats);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * ????????????
     */
    public void spawnMonster(int mobId, int quantity) {
        spawnMob(mobId, quantity, c.getPlayer().getTruePosition());
    }

    public void spawnMobOnMap(int mobId, int quantity, int x, int y, int map) {
        for (int i = 0; i < quantity; i++) {
            getMap(map).spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new Point(x, y));
        }
    }

    public void spawnMob(int mobId, int quantity, int x, int y) {
        spawnMob(mobId, quantity, new Point(x, y));
    }

    public void spawnMob(int mobId, int x, int y) {
        spawnMob(mobId, 1, new Point(x, y));
    }

    private void spawnMob(int mobId, int quantity, Point pos) {
        for (int i = 0; i < quantity; i++) {
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
        }
    }

    /*
     * ????????????ID??????????????????
     */
    public void killMob(int mobId) {
        c.getPlayer().getMap().killMonster(mobId);
    }

    /*
     * ??????????????????????????????
     */
    public void killAllMob() {
        c.getPlayer().getMap().killAllMonsters(true);
    }

    /*
     * ??????????????????
     */
    public void addHP(int delta) {
        c.getPlayer().addHP(delta);
    }

    public int getPlayerStat(String type) {
        switch (type) {
            case "LVL":
                return c.getPlayer().getLevel();
            case "STR":
                return c.getPlayer().getStat().getStr();
            case "DEX":
                return c.getPlayer().getStat().getDex();
            case "INT":
                return c.getPlayer().getStat().getInt();
            case "LUK":
                return c.getPlayer().getStat().getLuk();
            case "HP":
                return c.getPlayer().getStat().getHp();
            case "MP":
                return c.getPlayer().getStat().getMp();
            case "MAXHP":
                return c.getPlayer().getStat().getMaxHp();
            case "MAXMP":
                return c.getPlayer().getStat().getMaxMp();
            case "RAP":
                return c.getPlayer().getRemainingAp();
            case "RSP":
                return c.getPlayer().getRemainingSp();
            case "GID":
                return c.getPlayer().getGuildId();
            case "GRANK":
                return c.getPlayer().getGuildRank();
            case "ARANK":
                return c.getPlayer().getAllianceRank();
            case "GM":
                return c.getPlayer().isGM() ? 1 : 0;
            case "ADMIN":
                return c.getPlayer().isAdmin() ? 1 : 0;
            case "GENDER":
                return c.getPlayer().getGender();
            case "FACE":
                return c.getPlayer().getFace();
            case "HAIR":
                return c.getPlayer().getHair();
        }
        return -1;
    }

    /*
     * ?????????????????????
     */
    public int getAndroidStat(String type) {
        switch (type) {
            case "HAIR":
                return c.getPlayer().getAndroid().getHair();
            case "FACE":
                return c.getPlayer().getAndroid().getFace();
            case "SKIN":
                return c.getPlayer().getAndroid().getSkin();
            case "GENDER":
                return c.getPlayer().getAndroid().getGender();
        }
        return -1;
    }

    /*
     * ??????????????????
     */
    public String getName() {
        return c.getPlayer().getName();
    }

    /*
     * ????????????????????????
     */
    public String getServerName() {
        return c.getPlayer().getClient().getChannelServer().getServerName();
    }

    /*
     * ???????????????????????? ????????????2???????????????
     */
    public String getTrueServerName() {
        return c.getPlayer().getClient().getChannelServer().getTrueServerName();
    }

    /*
     * ????????????????????????
     */
    public boolean haveItem(int itemId) {
        return haveItem(itemId, 1);
    }

    public boolean haveItem(int itemId, int quantity) {
        return haveItem(itemId, quantity, false, true);
    }

    public boolean haveItem(int itemId, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        return c.getPlayer().haveItem(itemId, quantity, checkEquipped, greaterOrEquals);
    }

    /*
     * ?????????????????????????????????????????????
     */
    public int getItemQuantity(int itemId) {
        return c.getPlayer().getItemQuantity(itemId);
    }

    public boolean canHold() {
        return c.getPlayer().canHold();
    }

    public boolean canHoldSlots(int slot) {
        return c.getPlayer().canHoldSlots(slot);
    }

    public boolean canHold(int itemId) {
        return c.getPlayer().canHold(itemId);
    }

    public boolean canHold(int itemId, int quantity) {
        return MapleInventoryManipulator.checkSpace(c, itemId, quantity, "");
    }

    /*
     * ????????????
     */
    public MapleQuestStatus getQuestRecord(int questId) {
        return c.getPlayer().getQuestNAdd(MapleQuest.getInstance(questId));
    }

    public MapleQuestStatus getQuestNoRecord(int questId) {
        return c.getPlayer().getQuestNoAdd(MapleQuest.getInstance(questId));
    }

    public byte getQuestStatus(int questId) {
        return c.getPlayer().getQuestStatus(questId);
    }

    public boolean isQuestActive(int questId) {
        return getQuestStatus(questId) == 1;
    }

    public boolean isQuestFinished(int questId) {
        return getQuestStatus(questId) == 2;
    }

    public void showQuestMsg(String msg) {
        c.getSession().write(MaplePacketCreator.showQuestMsg(msg));
    }

    public void forceStartQuest(int questId, String data) {
        MapleQuest.getInstance(questId).forceStart(c.getPlayer(), 0, data);
    }

    public void forceStartQuest(int questId, int data, boolean filler) {
        MapleQuest.getInstance(questId).forceStart(c.getPlayer(), 0, filler ? String.valueOf(data) : null);
    }

    public void forceStartQuest(int questId) {
        MapleQuest.getInstance(questId).forceStart(c.getPlayer(), 0, null);
    }

    public void forceCompleteQuest(int questId) {
        MapleQuest.getInstance(questId).forceComplete(getPlayer(), 0);
    }

    /*
     * ??????NPC
     */
    public void spawnNpc(int npcId) {
        c.getPlayer().getMap().spawnNpc(npcId, c.getPlayer().getPosition());
    }

    public void spawnNpc(int npcId, int x, int y) {
        c.getPlayer().getMap().spawnNpc(npcId, new Point(x, y));
    }

    public void spawnNpc(int npcId, Point pos) {
        c.getPlayer().getMap().spawnNpc(npcId, pos);
    }

    /*
     * ??????NPC
     */
    public void removeNpc(int mapid, int npcId) {
        c.getChannelServer().getMapFactory().getMap(mapid).removeNpc(npcId);
    }

    public void removeNpc(int npcId) {
        c.getPlayer().getMap().removeNpc(npcId);
    }

    public void forceStartReactor(int mapId, int reactorId) {
        MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
        MapleReactor react;

        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            react = (MapleReactor) remo;
            if (react.getReactorId() == reactorId) {
                react.forceStartReactor(c);
                break;
            }
        }
    }

    public void destroyReactor(int mapId, int reactorId) {
        MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
        MapleReactor react;

        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            react = (MapleReactor) remo;
            if (react.getReactorId() == reactorId) {
                react.hitReactor(c);
                break;
            }
        }
    }

    public void hitReactor(int mapId, int reactorId) {
        MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
        MapleReactor react;

        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            react = (MapleReactor) remo;
            if (react.getReactorId() == reactorId) {
                react.hitReactor(c);
                break;
            }
        }
    }

    /*
     * ?????????????????????ID
     */
    public int getJob() {
        return c.getPlayer().getJob();
    }

    /*
     * ?????????????????????ID
     */
    public int getJobId() {
        return c.getPlayer().getJob();
    }

    /*
     * ????????????ID??????????????????
     */
    public String getJobName(int jobId) {
        return MapleCarnivalChallenge.getJobNameById(jobId);
    }

    /*
     * ?????????????????????????????????
     */
    public boolean isBeginnerJob() {
        return JobConstants.is????????????(getJob()) && getLevel() < 11;
    }

    /*
     * ????????????????????????????????????
     */
    public boolean is?????????() {
        return JobConstants.is?????????(getJob());
    }

    /*
     * ???????????????????????????
     */
    public int getLevel() {
        return c.getPlayer().getLevel();
    }

    /*
     * ?????????????????????????????????
     */
    public int getFame() {
        return c.getPlayer().getFame();
    }

    /*
     * ???????????????????????????????????????
     */
    public void gainFame(int famechange) {
        gainFame(famechange, false);
    }

    public void gainFame(int famechange, boolean show) {
        c.getPlayer().gainFame(famechange, show);
    }

    /*
     * ??????????????????????????????
     */
    public int getNX(int type) {
        return c.getPlayer().getCSPoints(type);
    }

    public void gainNX(int amount) {
        c.getPlayer().modifyCSPoints(1, amount, true);
    }

    public void gainNX(int type, int amount) {
        if (type <= 0 || type > 2) {
            type = 2;
        }
        c.getPlayer().modifyCSPoints(type, amount, true);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     */
    public void gainItemPeriod(int itemId, short quantity, long period) {
        gainItem(itemId, quantity, false, period, -1, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ???????????????????????????
     */
    public void gainItemPeriod(int itemId, short quantity, long period, String owner) {
        gainItem(itemId, quantity, false, period, -1, owner, 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     */
    public void gainItem(int itemId, short quantity) {
        gainItem(itemId, quantity, false, 0, -1, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ???????????????
     */
    public void gainItem(int itemId, short quantity, int state) {
        gainItem(itemId, quantity, false, 0, -1, "", state);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats) {
        gainItem(itemId, quantity, randomStats, 0, -1, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     * ??????????????????????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats, int slots) {
        gainItem(itemId, quantity, randomStats, 0, slots, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     */
    public void gainItem(int itemId, short quantity, long period) {
        gainItem(itemId, quantity, false, period, -1, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ???????????????
     */
    public void gainItem(int itemId, short quantity, long period, int state) {
        gainItem(itemId, quantity, false, period, -1, "", state);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ??????????????????????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats, long period, int slots) {
        gainItem(itemId, quantity, randomStats, period, slots, "", 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ??????????????????????????????
     * ???????????????????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats, long period, int slots, String owner) {
        gainItem(itemId, quantity, randomStats, period, slots, owner, 0);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ??????????????????????????????
     * ???????????????????????????
     * ???????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats, long period, int slots, String owner, int state) {
        gainItem(itemId, quantity, randomStats, period, slots, owner, state, c);
    }

    /*
     * ???????????????
     * ??????ID
     * ????????????
     * ??????????????????
     * ???????????? 1000 ????????? ?????????????????????????????????????????????
     * ??????????????????????????????
     * ???????????????????????????
     * ???????????????
     * ?????????????????????
     */
    public void gainItem(int itemId, short quantity, boolean randomStats, long period, int slots, String owner, int state, MapleClient cg) {
        if (ItemConstants.isLogItem(itemId)) {
            String itemText = "?????? " + StringUtil.getRightPaddedStr(cg.getPlayer().getName(), ' ', 13) + (quantity >= 0 ? " ????????????: " : " ????????????: ") + itemId + " ??????: " + StringUtil.getRightPaddedStr(String.valueOf(Math.abs(quantity)), ' ', 5) + " ????????????: " + getItemName(itemId);
            log.info("[??????] " + itemText);
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + itemText));
        }
        if (quantity >= 0) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleInventoryType type = ItemConstants.getInventoryType(itemId);
            if (!MapleInventoryManipulator.checkSpace(cg, itemId, quantity, "")) {
                return;
            }
            if (type.equals(MapleInventoryType.EQUIP) && !ItemConstants.is????????????(itemId) && !ItemConstants.is????????????(itemId)) {
                Equip item = (Equip) (randomStats ? ii.randomizeStats((Equip) ii.getEquipById(itemId)) : ii.getEquipById(itemId));
                if (period > 0) {
                    if (period < 1000) {
                        item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                    } else {
                        item.setExpiration(System.currentTimeMillis() + period);
                    }
                }
                if (slots > 0) {
                    item.setUpgradeSlots((byte) (item.getUpgradeSlots() + slots));
                }
                if (state > 0) {
                    int newstate = 16 + state;
                    if (newstate > 20 || newstate < 17) {
                        newstate = 17;
                    }
                    item.setOptential1(-newstate);
                }
                if (owner != null) {
                    item.setOwner(owner);
                }
                item.setGMLog("???????????? " + this.id + " (" + this.id2 + ") ??????: " + cg.getPlayer().getMapId() + " ??????: " + FileoutputUtil.CurrentReadable_Time());
                String name = ii.getName(itemId);
                if (itemId / 10000 == 114 && name != null && name.length() > 0) { //??????????????????
                    String msg = "????????????????????? <" + name + ">";
                    cg.getPlayer().dropMessage(-1, msg);
                    cg.getPlayer().dropMessage(5, msg);
                }
                MapleInventoryManipulator.addbyItem(cg, item.copy());
            } else {
                MapleInventoryManipulator.addById(cg, itemId, quantity, owner == null ? "" : owner, null, period, "???????????? " + this.id + " (" + this.id2 + ") ??????: " + cg.getPlayer().getMapId() + " ??????: " + FileoutputUtil.CurrentReadable_Time());
            }
        } else {
            MapleInventoryManipulator.removeById(cg, ItemConstants.getInventoryType(itemId), itemId, -quantity, true, false);
        }
        cg.getSession().write(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
    }

    /*
     * ?????????????????? ?????????: 1
     */
    public boolean removeItem(int itemId) { //quantity 1
        if (MapleInventoryManipulator.removeById_Lock(c, ItemConstants.getInventoryType(itemId), itemId)) {
            c.getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) -1, true));
            return true;
        }
        return false;
    }

    public void removeAllItem(int type) {
        MapleInventoryManipulator.removeAll(c, this.getInvType(type));
    }

    /*
     * ???????????????????????????????????????
     */
    public void gainItemAndEquip(int itemId, short slot) {
        MapleInventoryManipulator.addItemAndEquip(c, itemId, slot);
    }

    public void gainLockItem(int itemId, short quantity, boolean lock, long period) {
        gainLockItem(itemId, quantity, lock, period, "");
    }

    public void gainLockItem(int itemId, short quantity, boolean lock, long period, String from) {
        gainLockItem(itemId, quantity, lock, period, from, true);
    }

    public void gainLockItem(int itemId, short quantity, boolean lock, long period, String from, boolean broad) {
        if (quantity <= 0) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "??????????????????????????????????????????0.????????????????????????????????????????????????1???.");
            }
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (!ii.itemExists(itemId)) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, itemId + " ?????????????????????.");
            }
            return;
        }
        if (!MapleInventoryManipulator.checkSpace(c, itemId, quantity, "")) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "??????????????????.");
            }
            return;
        }
        Item item;
        if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
            item = ii.getEquipById(itemId);
        } else {
            item = new Item(itemId, (byte) 0, quantity, (byte) 0);
        }
        if (lock) {
            item.addFlag((short) ItemFlag.LOCK.getValue());
        }
        if (period > 0) {
            if (period < 1000) {
                item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
            } else {
                item.setExpiration(System.currentTimeMillis() + period);
            }
        }
        if (!from.equals("")) {
            item.setGMLog("???" + from + "????????? ??????: " + FileoutputUtil.CurrentReadable_Time());
        }
        MapleInventoryManipulator.addbyItem(c, item);
        c.getSession().write(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
        if (!from.equals("") && broad) {
            if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(c.getPlayer().getName() + " : ???" + from + "?????????" + ii.getName(itemId) + "????????????????????????????????????????????????", false, c.getChannel(), item));
            } else {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : ???" + from + "?????????{" + ii.getName(item.getItemId()) + "}????????????????????????????????????????????????", item, (byte) 3, c.getChannel()));
            }
        }
    }

    public void worldMessageItem(String message, Item item) {
        WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(message, false, c.getChannel(), item));
    }

    public final void worldMessageYellow(final String message) {
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(9, c.getChannel(), message, true));
    }

    public final void worldMessageEffect(final String message, final int type, final int time) {
        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.getMapEffectMsg(message, type, time));
    }

    public final void worldBrodcastEffect(final int itemid, final String message) {
        if (itemid > 0) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.startMapEffect(message, itemid, true));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.environmentChange(message, 4));
        }

        Timer.WorldTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.removeMapEffect());
            }
        }, 20000);  //20???
    }

    /*
     * ?????????????????????????????????
     */
    public void changeMusic(String songName) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    /*
     * ?????????????????????
     */
    public void channelMessage(int type, String message) {
        c.getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(type, c.getChannel(), message));
    }

    /*
     * ??????????????????
     */
    public void worldMessage(String message) {
        worldMessage(6, message);
    }

    public void worldMessage(int type, String message) {
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void worldSpouseMessage(int type, String message) {
        if (type == 0x00 || type == 0x01 || (type >= 0x06 && type <= 0x2A)) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(type, message));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, message));
        }
    }

    /*
     * ????????????????????? ??????????????? 5
     */
    public void playerMessage(String message) {
        playerMessage(5, message);
    }

    /*
     * ????????????????????? ??????????????? 5
     */
    public void mapMessage(String message) {
        mapMessage(5, message);
    }

    /*
     * ????????????????????? ??????????????? 5
     */
    public void guildMessage(String message) {
        guildMessage(5, message);
    }

    /*
     * ?????????????????????
     */
    public void playerMessage(int type, String message) {
        c.getPlayer().dropMessage(type, message);
    }

    /*
     * ?????????????????????
     */
    public void mapMessage(int type, String message) {
        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    /*
     * ?????????????????????
     */
    public void guildMessage(int type, String message) {
        if (getPlayer().getGuildId() > 0) {
            WorldGuildService.getInstance().guildPacket(getPlayer().getGuildId(), MaplePacketCreator.serverNotice(type, message));
        }
    }

    /*
     * ????????????
     */
    public void topMessage(String message) {
        c.getSession().write(UIPacket.getTopMsg(message));
    }

    /*
     * ??????????????????
     */
    public MapleGuild getGuild() {
        return getGuild(getPlayer().getGuildId());
    }

    /*
     * ????????????ID????????????
     */
    public MapleGuild getGuild(int guildid) {
        return WorldGuildService.getInstance().getGuild(guildid);
    }

    /*
     * ??????????????????
     */
    public List<Pair<Integer, MapleGuild>> getGuildList() {
        return WorldGuildService.getInstance().getGuildList();
    }

    /*
     * ??????????????????
     */
    public MapleParty getParty() {
        return c.getPlayer().getParty();
    }

    public int getCurrentPartyId(int mapId) {
        return getMap(mapId).getCurrentPartyId();
    }

    /*
     * ???????????????????????????
     */
    public boolean isLeader() {
        if (getPlayer().getParty() == null) {
            return false;
        }
        return getParty().getLeader().getId() == c.getPlayer().getId();
    }

    public boolean isAllPartyMembersAllowedJob(int jobId) {
        if (c.getPlayer().getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : c.getPlayer().getParty().getMembers()) {
            if (mem.getJobId() / 100 != jobId) {
                return false;
            }
        }
        return true;
    }

    /*
     * ??????????????????????????????????????????
     */
    public boolean allMembersHere() {
        if (c.getPlayer().getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : c.getPlayer().getParty().getMembers()) {
            MapleCharacter chr = c.getPlayer().getMap().getCharacterById(mem.getId());
            if (chr == null) {
                return false;
            }
        }
        return true;
    }

    /*
     * ??????????????????
     */
    public void warpParty(int mapId) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            warp(mapId, 0);
            return;
        }
        MapleMap target = getMap(mapId);
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.changeMap(target, target.getPortal(0));
            }
        }
    }

    /*
     * ??????????????????????????????
     */
    public void warpParty(int mapId, int portal) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            if (portal < 0) {
                warp(mapId);
            } else {
                warp(mapId, portal);
            }
            return;
        }
        boolean rand = portal < 0;
        MapleMap target = getMap(mapId);
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                if (rand) {
                    try {
                        curChar.changeMap(target, target.getPortal(Randomizer.nextInt(target.getPortals().size())));
                    } catch (Exception e) {
                        curChar.changeMap(target, target.getPortal(0));
                    }
                } else {
                    curChar.changeMap(target, target.getPortal(portal));
                }
            }
        }
    }

    /*
     * ??????????????????
     */
    public void warpParty_Instanced(int mapId) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            warp_Instanced(mapId);
            return;
        }
        MapleMap target = getMap_Instanced(mapId);

        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.changeMap(target, target.getPortal(0));
            }
        }
    }

    /*
     * ??????????????????
     */
    public void gainMeso(long gain) {
        c.getPlayer().gainMeso(gain, true, true);
    }

    /*
     * ??????????????????
     */
    public void gainExp(int gain) {
        c.getPlayer().gainExp(gain, true, true, true);
    }

    /*
     * ?????????????????????????????????????????????
     */
    public void gainExpR(int gain) {
        c.getPlayer().gainExp(gain * c.getChannelServer().getExpRate(), true, true, true);
    }

    /*
     * ??????????????????????????????
     */
    public void givePartyItems(int itemId, short quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            if (quantity >= 0) {
                MapleInventoryManipulator.addById(chr.getClient(), itemId, quantity, "Received from party interaction " + itemId + " (" + this.id + ")");
            } else {
                MapleInventoryManipulator.removeById(chr.getClient(), ItemConstants.getInventoryType(itemId), itemId, -quantity, true, false);
            }
            chr.getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
        }
    }

    /*
     * ?????????????????????????????????????????????
     */
    public void addPartyTrait(String t, int e, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.getTrait(MapleTraitType.valueOf(t)).addExp(e, chr);
        }
    }

    /*
     * ?????????????????????????????????????????????
     */
    public void addPartyTrait(String t, int e) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            addTrait(t, e);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.getTrait(MapleTraitType.valueOf(t)).addExp(e, curChar);
            }
        }
    }

    /*
     * ??????????????????????????????
     */
    public void addTrait(String t, int e) {
        getPlayer().getTrait(MapleTraitType.valueOf(t)).addExp(e, getPlayer());
    }

    /*
     * ??????????????????????????????
     */
    public void givePartyItems(int itemId, short quantity) {
        givePartyItems(itemId, quantity, false);
    }

    /*
     * ?????????????????????????????? ??????????????????
     */
    public void givePartyItems(int itemId, short quantity, boolean removeAll) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            gainItem(itemId, (short) (removeAll ? -getPlayer().itemQuantity(itemId) : quantity));
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                gainItem(itemId, (short) (removeAll ? -curChar.itemQuantity(itemId) : quantity), false, 0, 0, "", 0, curChar.getClient());
            }
        }
    }

    public void givePartyExp_PQ(int maxLevel, double mod, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            int amount = (int) Math.round(GameConstants.getExpNeededForLevel(chr.getLevel() > maxLevel ? (maxLevel + ((maxLevel - chr.getLevel()) / 10)) : chr.getLevel()) / (Math.min(chr.getLevel(), maxLevel) / 5.0) / (mod * 2.0));
            chr.gainExp(amount * c.getChannelServer().getExpRate(), true, true, true);
        }
    }

    public void gainExp_PQ(int maxLevel, double mod) {
        int amount = (int) Math.round(GameConstants.getExpNeededForLevel(getPlayer().getLevel() > maxLevel ? (maxLevel + (getPlayer().getLevel() / 10)) : getPlayer().getLevel()) / (Math.min(getPlayer().getLevel(), maxLevel) / 10.0) / mod);
        gainExp(amount * c.getChannelServer().getExpRate());
    }

    public void givePartyExp_PQ(int maxLevel, double mod) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            int amount = (int) Math.round(GameConstants.getExpNeededForLevel(getPlayer().getLevel() > maxLevel ? (maxLevel + (getPlayer().getLevel() / 10)) : getPlayer().getLevel()) / (Math.min(getPlayer().getLevel(), maxLevel) / 10.0) / mod);
            gainExp(amount * c.getChannelServer().getExpRate());
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                int amount = (int) Math.round(GameConstants.getExpNeededForLevel(curChar.getLevel() > maxLevel ? (maxLevel + (curChar.getLevel() / 10)) : curChar.getLevel()) / (Math.min(curChar.getLevel(), maxLevel) / 10.0) / mod);
                curChar.gainExp(amount * c.getChannelServer().getExpRate(), true, true, true);
            }
        }
    }

    public void givePartyExp(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp(amount * c.getChannelServer().getExpRate(), true, true, true);
        }
    }

    public void givePartyExp(int amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            gainExp(amount * c.getChannelServer().getExpRate());
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.gainExp(amount * c.getChannelServer().getExpRate(), true, true, true);
            }
        }
    }

    public void givePartyNX(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.modifyCSPoints(1, amount, true);
        }
    }

    public void givePartyNX(int amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            gainNX(amount);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.modifyCSPoints(1, amount, true);
            }
        }
    }

    public void endPartyQuest(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.endPartyQuest(amount);
        }
    }

    public void endPartyQuest(int amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            getPlayer().endPartyQuest(amount);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.endPartyQuest(amount);
            }
        }
    }

    public void removeFromParty(int itemId, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            int possesed = chr.getInventory(ItemConstants.getInventoryType(itemId)).countById(itemId);
            if (possesed > 0) {
                MapleInventoryManipulator.removeById(c, ItemConstants.getInventoryType(itemId), itemId, possesed, true, false);
                chr.getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) -possesed, true));
            }
        }
    }

    public void removeFromParty(int itemId) {
        givePartyItems(itemId, (short) 0, true);
    }

    public void useSkill(int skillId, int skillLevel) {
        if (skillLevel <= 0) {
            return;
        }
        SkillFactory.getSkill(skillId).getEffect(skillLevel).applyTo(c.getPlayer());
    }

    public void useItem(int itemId) {
        MapleItemInformationProvider.getInstance().getItemEffect(itemId).applyTo(c.getPlayer());
        c.getSession().write(UIPacket.getStatusMsg(itemId));
    }

    public void cancelItem(int itemId) {
        c.getPlayer().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(itemId), false, -1);
    }

    public int getMorphState() {
        return c.getPlayer().getMorphState();
    }

    public void removeAll(int itemId) {
        c.getPlayer().removeAll(itemId);
    }

    public void gainCloseness(int closeness, int index) {
        MaplePet pet = getPlayer().getSpawnPet(index);
        if (pet != null) {
            pet.setCloseness(pet.getCloseness() + (closeness * getChannelServer().getTraitRate()));
            getPlayer().petUpdateStats(pet, true);
        }
    }

    public void gainClosenessAll(int closeness) {
        MaplePet[] pets = getPlayer().getSpawnPets();
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null && pets[i].getSummoned()) {
                pets[i].setCloseness(pets[i].getCloseness() + closeness);
                getPlayer().petUpdateStats(pets[i], true);
            }
        }
    }

    /*
     * ????????????
     */
    public void resetMap(int mapId) {
        getMap(mapId).resetFully();
    }

    /*
     * ??????NPC
     */
    public void openNpc(int npcId) {
        getClient().removeClickedNPC();
        NPCScriptManager.getInstance().start(getClient(), npcId);
    }

    /*
     * ??????NPC ??????????????????
     */
    public void openNpc(MapleClient cg, int npcId) {
        cg.removeClickedNPC();
        NPCScriptManager.getInstance().start(cg, npcId);
    }

    /*
     * ??????NPC???NPC??????
     */
    public void openNpc(int npcId, int npcMode) {
        getClient().removeClickedNPC();
        NPCScriptManager.getInstance().start(getClient(), npcId, npcMode);
    }

    /*
     * ????????????ID
     */
    public int getMapId() {
        return c.getPlayer().getMap().getId();
    }

    /*
     * ????????????????????????????????????ID
     */
    public boolean haveMonster(int mobId) {
        for (MapleMapObject obj : c.getPlayer().getMap().getAllMonstersThreadsafe()) {
            MapleMonster mob = (MapleMonster) obj;
            if (mob.getId() == mobId) {
                return true;
            }
        }
        return false;
    }

    /*
     * ????????????
     */
    public int getChannelNumber() {
        return c.getChannel();
    }

    /*
     * ??????????????????????????????????????????
     */
    public int getMonsterCount(int mapId) {
        return c.getChannelServer().getMapFactory().getMap(mapId).getNumMonsters();
    }

    /*
     * ?????????????????? ?????? ??????ID ???????????? ??????????????????
     */
    public void teachSkill(int skillId, int skilllevel, byte masterlevel) {
        getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(skillId), skilllevel, masterlevel);
    }

    /*
     * ?????????????????? ?????? ??????ID ????????????
     */
    public void teachSkill(int skillId, int skilllevel) {
        Skill skil = SkillFactory.getSkill(skillId);
        if (getPlayer().getSkillLevel(skil) > skilllevel) {
            skilllevel = getPlayer().getSkillLevel(skil);
        }
        getPlayer().changeSingleSkillLevel(skil, skilllevel, (byte) skil.getMaxLevel());
    }

    /*
     * ??????????????????????????????????????????
     */
    public int getPlayerCount(int mapId) {
        return c.getChannelServer().getMapFactory().getMap(mapId).getCharactersSize();
    }

    public void dojo_getUp() {
        c.getSession().write(MaplePacketCreator.updateInfoQuest(1207, "pt=1;min=4;belt=1;tuto=1")); //todo
        c.getSession().write(EffectPacket.Mulung_DojoUp2());
        c.getSession().write(MaplePacketCreator.instantMapWarp((byte) 6));
    }

    public boolean dojoAgent_NextMap(boolean dojo, boolean fromresting) {
        if (dojo) {
            return Event_DojoAgent.warpNextMap(c.getPlayer(), fromresting, c.getPlayer().getMap());
        }
        return Event_DojoAgent.warpNextMap_Agent(c.getPlayer(), fromresting);
    }

    public boolean dojoAgent_NextMap(boolean dojo, boolean fromresting, int mapid) {
        if (dojo) {
            return Event_DojoAgent.warpNextMap(c.getPlayer(), fromresting, getMap(mapid));
        }
        return Event_DojoAgent.warpNextMap_Agent(c.getPlayer(), fromresting);
    }

    public int dojo_getPts() {
        return c.getPlayer().getIntNoRecord(GameConstants.DOJO);
    }

    public MapleEvent getEvent(String loc) {
        return c.getChannelServer().getEvent(MapleEventType.valueOf(loc));
    }

    public int getSavedLocation(String loc) {
        Integer ret = c.getPlayer().getSavedLocation(SavedLocationType.fromString(loc));
        if (ret == null || ret == -1) {
            return 100000000;
        }
        return ret;
    }

    public void saveLocation(String loc) {
        c.getPlayer().saveLocation(SavedLocationType.fromString(loc));
    }

    public void saveReturnLocation(String loc) {
        c.getPlayer().saveLocation(SavedLocationType.fromString(loc), c.getPlayer().getMap().getReturnMap().getId());
    }

    public void clearSavedLocation(String loc) {
        c.getPlayer().clearSavedLocation(SavedLocationType.fromString(loc));
    }

    public void summonMsg(String msg) {
        if (!c.getPlayer().hasSummon()) {
            playerSummonHint(true);
        }
        c.getSession().write(UIPacket.summonMessage(msg));
    }

    public void summonMsg(int type) {
        if (!c.getPlayer().hasSummon()) {
            playerSummonHint(true);
        }
        c.getSession().write(UIPacket.summonMessage(type));
    }

    public void showInstruction(String msg, int width, int height) {
        c.getSession().write(MaplePacketCreator.sendHint(msg, width, height));
    }

    public void playerSummonHint(boolean summon) {
        c.getPlayer().setHasSummon(summon);
        c.getSession().write(UIPacket.summonHelper(summon));
    }

    public String getInfoQuest(int questId) {
        return c.getPlayer().getInfoQuest(questId);
    }

    public void updateInfoQuest(int questId, String data) {
        c.getPlayer().updateInfoQuest(questId, data);
    }

    public boolean getEvanIntroState(String data) {
        return getInfoQuest(22013).equals(data);
    }

    public void updateEvanIntroState(String data) {
        updateInfoQuest(22013, data);
    }

    public void Aran_Start() {
        c.getSession().write(UIPacket.Aran_Start());
    }

    public void evanTutorial(String data, int v1) {
        c.getSession().write(NPCPacket.getEvanTutorial(data));
    }

    public void AranTutInstructionalBubble(String data) {
        c.getSession().write(EffectPacket.AranTutInstructionalBalloon(data));
    }

    public void showWZEffect(String data) {
        c.getSession().write(EffectPacket.ShowWZEffect(data));
    }

    public void EarnTitleMsg(String data) {
        c.getSession().write(UIPacket.EarnTitleMsg(data));
    }

    public void showEffect(String effect) {
        c.getSession().write(MaplePacketCreator.showEffect(effect));
    }

    public void playSound(String sound) {
        c.getSession().write(MaplePacketCreator.playSound(sound));
    }

    public void startMapEffect(String msg, int itemId) {
        c.getPlayer().getMap().startMapEffect(msg, itemId);
    }

    public void showMapEffect(String path) {
        getClient().getSession().write(UIPacket.MapEff(path));
    }

    public void EnableUI(short i) {
        c.getSession().write(UIPacket.IntroEnableUI(i));
    }

    public void DisableUI(boolean enabled) {
        c.getSession().write(UIPacket.IntroDisableUI(enabled));
    }

    public void MovieClipIntroUI(boolean enabled) {
        c.getSession().write(UIPacket.IntroDisableUI(enabled));
        c.getSession().write(UIPacket.IntroLock(enabled));
    }

    public void lockUI() {
        c.getSession().write(UIPacket.IntroDisableUI(true));
        c.getSession().write(UIPacket.IntroLock(true));
    }

    public void unlockUI() {
        c.getSession().write(UIPacket.IntroDisableUI(false));
        c.getSession().write(UIPacket.IntroLock(false));
    }

    public MapleInventoryType getInvType(int i) {
        return MapleInventoryType.getByType((byte) i);
    }

    public String getItemName(int itemId) {
        return MapleItemInformationProvider.getInstance().getName(itemId);
    }

    public void gainPet(int itemId, String name, int level, int closeness, int fullness, long period, short flags) {
        if (itemId / 10000 != 500) {
            itemId = 5000000;
        }
        if (level > 30) {
            level = 30;
        }
        if (closeness > 30000) {
            closeness = 30000;
        }
        if (fullness > 100) {
            fullness = 100;
        }
        try {
            MapleInventoryManipulator.addById(c, itemId, (short) 1, "", MaplePet.createPet(itemId, name, level, closeness, fullness, MapleInventoryIdentifier.getInstance(), itemId == 5000054 ? (int) period : 0, flags, 0), 45, "Pet from interaction " + itemId + " (" + this.id + ")" + " on " + FileoutputUtil.CurrentReadable_Date());
        } catch (NullPointerException ex) {
            ex.printStackTrace();
        }
    }

    public void removeSlot(int invType, byte slot, short quantity) {
        MapleInventoryManipulator.removeFromSlot(c, getInvType(invType), slot, quantity, true);
    }

    public void gainGP(int gp) {
        if (getPlayer().getGuildId() <= 0) {
            return;
        }
        WorldGuildService.getInstance().gainGP(getPlayer().getGuildId(), gp); //1 for
    }

    public int getGP() {
        if (getPlayer().getGuildId() <= 0) {
            return 0;
        }
        return WorldGuildService.getInstance().getGP(getPlayer().getGuildId()); //1 for
    }

    public int itemQuantity(int itemId) {
        return getPlayer().itemQuantity(itemId);
    }

    public EventInstanceManager getDisconnected(String event) {
        EventManager em = getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (eim.isDisconnected(c.getPlayer()) && eim.getPlayerCount() > 0) {
                return eim;
            }
        }
        return null;
    }

    public boolean isAllReactorState(int reactorId, int state) {
        boolean ret = false;
        for (MapleReactor r : getMap().getAllReactorsThreadsafe()) {
            if (r.getReactorId() == reactorId) {
                ret = r.getState() == state;
            }
        }
        return ret;
    }

    public long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public void spawnMonster(int mobId) {
        spawnMonster(mobId, 1, getPlayer().getTruePosition());
    }

    // summon one monster, remote location
    public void spawnMonster(int mobId, int x, int y) {
        spawnMonster(mobId, 1, new Point(x, y));
    }

    // multiple monsters, remote location
    public void spawnMonster(int mobId, int quantity, int x, int y) {
        spawnMonster(mobId, quantity, new Point(x, y));
    }

    // handler for all spawnMonster
    public void spawnMonster(int mobId, int quantity, Point pos) {
        for (int i = 0; i < quantity; i++) {
            getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
        }
    }

    public void sendNPCText(String text, int npcId) {
        getMap().broadcastMessage(NPCPacket.getNPCTalk(npcId, (byte) 0, text, "00 00 00 00 00 00", (byte) 0));
    }

    public boolean getTempFlag(int flag) {
        return (c.getChannelServer().getTempFlag() & flag) == flag;
    }

    public void logPQ(String text) {
//	FileoutputUtil.log(FileoutputUtil.PQ_Log, text);
    }

    public void outputFileError(Throwable t) {
        FileoutputUtil.outputFileError(FileoutputUtil.ScriptEx_Log, t);
    }

    public void trembleEffect(int type, int delay) {
        c.getSession().write(MaplePacketCreator.trembleEffect(type, delay));
    }

    public int nextInt(int arg0) {
        return Randomizer.nextInt(arg0);
    }

    public MapleQuest getQuest(int arg0) {
        return MapleQuest.getInstance(arg0);
    }

    public void achievement(int a) {
        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.achievementRatio(a));
    }

    public MapleInventory getInventory(int type) {
        return c.getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
    }

    public boolean isGMS() {
        return GameConstants.GMS;
    }

    public int randInt(int arg0) {
        return Randomizer.nextInt(arg0);
    }

    public void sendDirectionStatus(int key, int value) {
        c.getSession().write(UIPacket.getDirectionInfo(key, value));
        c.getSession().write(UIPacket.getDirectionStatus(true));
    }

    public void sendDirectionInfo(String data) {
        c.getSession().write(UIPacket.getDirectionInfo(data, 2000, 0, -100, 0));
        c.getSession().write(UIPacket.getDirectionInfo(1, 2000));
    }

    /*
     * ???????????????????????????????????????
     */
    public int getProfessions() {
        int ii = 0;
        int skillId;
        for (int i = 0; i < 5; i++) {
            skillId = 92000000 + i * 10000;
            if (c.getPlayer().getProfessionLevel(skillId) > 0) {
                ii++;
            }
        }
        return ii;
    }

    /*
     * Vip ??????????????????
     */
    public void setVip(int vip) {
        setVip(vip, 7);
    }

    public void setVip(int vip, long period) {
        c.getPlayer().setVip(vip);
        if (period > 0) {
            c.getPlayer().setViptime(period);
        }
    }

    public int getVip() {
        return c.getPlayer().getVip();
    }

    public boolean isVip() {
        return c.getPlayer().getVip() > 0;
    }

    public void setViptime(long period) {
        if (period != 0) {
            c.getPlayer().setViptime(period);
        }
    }

    /*
     * ????????????BOSS??????
     */
    public int getBossLog(String bossid) {
        return c.getPlayer().getBossLog(bossid);
    }

    public int getBossLog(String bossid, int type) {
        return c.getPlayer().getBossLog(bossid, type);
    }

    /*
     * ?????????????????????BOSS??????
     */
    public void setBossLog(String bossid) {
        c.getPlayer().setBossLog(bossid);
    }

    public void setBossLog(String bossid, int type) {
        c.getPlayer().setBossLog(bossid, type);
    }

    public void setBossLog(String bossid, int type, int count) {
        c.getPlayer().setBossLog(bossid, type, count);
    }

    /*
     * ????????????BOSS??????
     */
    public void resetBossLog(String bossid) {
        c.getPlayer().resetBossLog(bossid);
    }

    public void resetBossLog(String bossid, int type) {
        c.getPlayer().resetBossLog(bossid, type);
    }

    /*
     * ????????????????????????????????????BOSS??????
     * bossid ??????BOSS???????????????
     * type 0 = 0????????? ??????0?????????
     * count ???????????????
     * checkMap ???????????????????????????
     */
    public void setPartyBossLog(String bossid) {
        setPartyBossLog(bossid, 0);
    }

    public void setPartyBossLog(String bossid, int type) {
        setPartyBossLog(bossid, type, 1);
    }

    public void setPartyBossLog(String bossid, int type, int count) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            c.getPlayer().setBossLog(bossid, type, count);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getPlayer().getMap().getCharacterById(chr.getId());
            if (curChar != null && curChar.getMapId() == cMap) {
                curChar.setBossLog(bossid, type, count);
            }
        }
    }

    public int getBossLogAcc(String bossid) {
        return c.getPlayer().getBossLogAcc(bossid);
    }

    public void setBossLogAcc(String bossid) {
        c.getPlayer().setBossLogAcc(bossid);
    }

    public void setBossLogAcc(String bossid, int bosscount) {
        c.getPlayer().setBossLogAcc(bossid, bosscount);
    }

    public int getEventLogForDay(String eventId) {
        return c.getPlayer().getEventLogForDay(eventId);
    }

    public void setEventLogForDay(String eventId) {
        c.getPlayer().setEventLogForDay(eventId);
    }

    public void setEventLogForDay(String eventId, int eventCount) {
        c.getPlayer().setEventLogForDay(eventId, eventCount);
    }

    public void resetEventLogForDay(String eventId) {
        c.getPlayer().resetEventLogForDay(eventId);
    }

    /*
     * ??????????????????
     */
    public int getGamePoints() {
        return c.getPlayer().getGamePoints();
    }

    public void gainGamePoints(int amount) {
        c.getPlayer().gainGamePoints(amount);
    }

    public void resetGamePoints() {
        c.getPlayer().resetGamePoints();
    }

    /*
     * ????????????
     */
    public void getClock(int time) {
        c.getSession().write(MaplePacketCreator.getClock(time));
    }

    /*
     * ??????1?????????
     */
    public void openWeb(String web) {
        c.getSession().write(MaplePacketCreator.openWeb(web));
    }

    /*
     * ????????????Pvp??????????????????
     */
    public boolean isCanPvp() {
        return c.getChannelServer().isCanPvp();
    }

    /*
     * ????????????????????????
     */
    public void showDoJangRank() {
        c.getSession().write(MaplePacketCreator.getMulungRanking((byte) 1));
    }

    /*
     * ??????????????????
     */
    public int MarrageChecking() {
        if (getPlayer().getParty() == null) { //???????????? - -1
            return -1;
        } else if (getPlayer().getMarriageId() > 0) { //???????????????????????? - 0
            return 0;
        } else if (getPlayer().getParty().getMembers().size() != 2) { //?????????????????????2 - 1
            return 1;
        } else if (getPlayer().getGender() == 0 && !(getPlayer().haveItem(1050121) || getPlayer().haveItem(1050122) || getPlayer().haveItem(1050113))) {
            return 5;
        } else if (getPlayer().getGender() == 1 && !(getPlayer().haveItem(1051129) || getPlayer().haveItem(1051130) || getPlayer().haveItem(1051114))) {
            return 5;
        } else if (!getPlayer().haveItem(1112001)) { //??????????????????
            return 6;
        }
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            if (chr.getId() == getPlayer().getId()) {
                continue;
            }
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null) { //?????????????????????
                return 2;
            } else if (curChar.getMarriageId() > 0) { //???????????????????????????
                return 3;
            } else if (curChar.getGender() == getPlayer().getGender()) { //????????????
                return 4;
            } else if (curChar.getGender() == 0 && !(curChar.haveItem(1050121) || curChar.haveItem(1050122) || curChar.haveItem(1050113))) {
                return 5;
            } else if (curChar.getGender() == 1 && !(curChar.haveItem(1051129) || curChar.haveItem(1051130) || curChar.haveItem(1051114))) {
                return 5;
            } else if (!curChar.haveItem(1112001)) { //??????????????????
                return 6;
            }
        }
        return 9;
    }

    /*
     * ???????????????????????????????????????1????????????ID
     */
    public int getPartyFormID() {
        int curCharID = -1;
        if (getPlayer().getParty() == null) { //???????????? - -1
            curCharID = -1;
        } else if (getPlayer().getMarriageId() > 0) { //???????????????????????? - 0
            curCharID = -2;
        } else if (getPlayer().getParty().getMembers().size() != 2) { //?????????????????????2 - 1
            curCharID = -3;
        }
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            if (chr.getId() == getPlayer().getId()) {
                continue;
            }
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null) {
                curCharID = -4;
            } else {
                curCharID = chr.getId();
            }
        }
        return curCharID;
    }

    /*
     * ???????????????GM??????
     */
    public int getGMLevel() {
        return c.getPlayer().getGMLevel();
    }

    /*
     * ????????????????????????????????????
     */
    public void startLieDetector(boolean isItem) {
        c.getPlayer().startLieDetector(isItem);
    }

    /*
     * ????????????
     */
    public int getReborns() {
        return c.getPlayer().getReborns();
    }

    public int getReborns1() {
        return c.getPlayer().getReborns1();
    }

    public int getReborns2() {
        return c.getPlayer().getReborns2();
    }

    public int getReborns3() {
        return c.getPlayer().getReborns3();
    }

    public void doReborn(int type) {
        c.getPlayer().doReborn(type);
    }

    public void doReborn(int type, int ap) {
        c.getPlayer().doReborn(type, ap);
    }

    /*
     * ?????????????????????
     */
    public void spouseMessage(int op, String msg) {
        c.getSession().write(MaplePacketCreator.spouseMessage(op, msg));
    }

    /*
     * GM????????????
     */
    public void sendPolice(String text, boolean dc) {
        if (dc) {
            c.getPlayer().sendPolice(text);
        } else {
            c.getSession().write(MaplePacketCreator.sendPolice(text));
        }
    }

    /*
     * ?????????????????????????????????
     */
    public void givePartyHonorExp(int gain, boolean show) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            c.getPlayer().gainHonorExp(gain);
            if (show) {
                c.getSession().write(MaplePacketCreator.spouseMessage(1, "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"));
            }
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.gainHonorExp(gain);
                if (show) {
                    curChar.getClient().getSession().write(MaplePacketCreator.spouseMessage(1, "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"));
                }
            }
        }
    }

    /*
     * ??????????????? ?????????: yyyy???MM???dd???HH???mm???ss???
     */
    public String getTime() {
        return DateUtil.getNowTime();
    }

    public boolean checkPartyEvent(int minLevel, int maxLevel, int minPartySize, int maxPartySize, int itemId) {
        MapleParty party = c.getPlayer().getParty();
        if (party == null || party.getMembers().size() < minPartySize || party.getLeader().getId() != c.getPlayer().getId()) {
            return false;
        }
        int inMap = 0;
        boolean next = true;
        int checkMapId = getPlayer().getMapId(); //?????????????????????ID
        for (MaplePartyCharacter cPlayer : party.getMembers()) {
            MapleCharacter ccPlayer = getPlayer().getMap().getCharacterById(cPlayer.getId());
            if (ccPlayer != null && ccPlayer.getLevel() >= minLevel && ccPlayer.getLevel() <= maxLevel && ccPlayer.getMapId() == checkMapId && ccPlayer.haveItem(itemId)) {
                inMap += 1;
            } else {
                return false;
            }
        }
        if (party.getMembers().size() > maxPartySize || inMap < minPartySize) {
            next = false;
        }
        return next;
    }

    /*
     * ????????????
     */
    public int getPlayerPoints() {
        return c.getPlayer().getPlayerPoints();
    }

    public void setPlayerPoints(int gain) {
        c.getPlayer().setPlayerPoints(gain);
    }

    public void gainPlayerPoints(int gain) {
        c.getPlayer().gainPlayerPoints(gain);
    }

    public int getPlayerEnergy() {
        return c.getPlayer().getPlayerEnergy();
    }

    public void setPlayerEnergy(int gain) {
        c.getPlayer().setPlayerEnergy(gain);
    }

    public void gainPlayerEnergy(int gain) {
        c.getPlayer().gainPlayerEnergy(gain);
    }

    /*
     * ????????????
     */
    public int getEventCount(String eventId) {
        return c.getPlayer().getEventCount(eventId);
    }

    public int getEventCount(String eventId, int type) {
        return c.getPlayer().getEventCount(eventId, type);
    }

    public void setEventCount(String eventId) {
        c.getPlayer().setEventCount(eventId);
    }

    public void setEventCount(String eventId, int type) {
        c.getPlayer().setEventCount(eventId, type);
    }

    public void setEventCount(String eventId, int type, int count) {
        c.getPlayer().setEventCount(eventId, type, count);
    }

    public void resetEventCount(String eventId) {
        c.getPlayer().resetEventCount(eventId);
    }

    public void resetEventCount(String eventId, int type) {
        c.getPlayer().resetEventCount(eventId, type);
    }

    public void setPartyEventCount(String eventId) {
        setPartyEventCount(eventId, 0);
    }

    public void setPartyEventCount(String eventId, int type) {
        setPartyEventCount(eventId, type, 1);
    }

    public void setPartyEventCount(String eventId, int type, int count) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMembers().size() == 1) {
            c.getPlayer().setEventCount(eventId, type, count);
            return;
        }
        int checkMap = getPlayer().getMapId();
        for (MaplePartyCharacter partyPlayer : getPlayer().getParty().getMembers()) {
            MapleCharacter chr = getPlayer().getMap().getCharacterById(partyPlayer.getId());
            if (chr != null && chr.getMapId() == checkMap) {
                chr.setEventCount(eventId, type, count);
            }
        }
    }

    public boolean checkPartyEventCount(String eventId) {
        return checkPartyEventCount(eventId, 1);
    }

    public boolean checkPartyEventCount(String eventId, int checkcount) {
        MapleParty party = c.getPlayer().getParty();
        int count;
        if (party == null || party.getMembers().size() == 1) {
            count = getEventCount(eventId);
            return count >= 0 && count < checkcount;
        }
        int check = 0;
        int partySize = party.getMembers().size();
        for (MaplePartyCharacter partyPlayer : party.getMembers()) {
            MapleCharacter chr = getPlayer().getMap().getCharacterById(partyPlayer.getId());
            if (chr != null) {
                count = chr.getEventCount(eventId);
                if (count >= 0 && count < checkcount) {
                    check++;
                }
            }
        }
        return partySize == check;
    }

    public MapleItemInformationProvider getItemInfo() {
        return MapleItemInformationProvider.getInstance();
    }

    public Equip getEquipBySlot(short slot) {
        return (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
    }

    /**
     * ????????????????????????????????? ???????????????????????? ?????????????????? ?????? ??? ????????????????????????????????????????????????0 ????????????1???????????? ???
     */
    public boolean changeLimitBreak(int amount) {
        //??????????????????????????? ???????????????????????????????????????
        Equip equip = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
        if (equip == null || !ItemConstants.isWeapon(equip.getItemId())) {
            return false;
        }
        //???????????????????????????0???????????????????????????
        int newLimitBreak = equip.getLimitBreak() + amount;
        if (newLimitBreak < 0 || newLimitBreak > 2100000000) {
            return false;
        }
        //??????????????????????????????
        equip.setLimitBreak(newLimitBreak);
        //????????????????????????
        c.getPlayer().forceUpdateItem(equip);
        return true;
    }

    /**
     * ??????UI
     *
     *
     * public void openUI(int id) {
     * getClient().announce(UIPacket.sendOpenWindow(id));
    }
     */

    /**
     * ???????????????????????????????????????
     */
    public int getLimitBreak() {
        int limitBreak = 999999; //???????????????
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip weapon = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
        if (weapon != null) {
            //????????????????????????????????? + ???????????????????????????
            limitBreak = ii.getLimitBreak(weapon.getItemId()) + weapon.getLimitBreak();
        }
        return limitBreak;
    }

    public int getRandomOptential(short slot, int potId) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip equip = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
        if (equip == null || ii.isCash(equip.getItemId()) || ii.getOptentialInfo(potId) == null) {
            return -1;
        }
        List<List<StructItemOption>> pots = new LinkedList<>(ii.getOptentialInfos(40000).values());
        int reqLevel = ii.getReqLevel(equip.getItemId()) / 10;
        int count = 0;
        boolean rewarded = false;
        while (!rewarded) {
            count++;
            StructItemOption pot = pots.get(Randomizer.nextInt(pots.size())).get(reqLevel);
            if (pot != null && pot.reqLevel / 10 <= reqLevel && pot.opID == potId) {
                rewarded = true;
            } else if (count > 3000) {
                rewarded = true;
            }
        }
        return count;
    }

    public boolean changeOptential(byte slot, int potline, int potId, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip equip = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
        if (equip == null || ii.isCash(equip.getItemId()) || ii.getOptentialInfo(potId) == null) {
            return false;
        }
        if (potline >= 1 && potline <= 6) {
            equip.setOptentials(potline, potId);
            c.getPlayer().forceUpdateItem(equip);
            if (show) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : ?????? ?????????????????? ?????????{" + ii.getName(equip.getItemId()) + "}???" + potline + "???????????????.?????????????????????????????????????????????", equip, 3, c.getChannel()));
            }
            return true;
        } else {
            return false;
        }
    }

    public byte getSubcategory() {
        return c.getPlayer().getSubcategory();
    }

    public final int getActivity() {
        return MapleActivity.getActivity(getPlayer());
    }

    public final int getMaxActivity() {
        return MapleActivity.getMaxActivity();
    }

    public final int getDiffActivity() {
        return MapleActivity.getDiffActivity(getPlayer());
    }

    public final void finishActivity(int questid) {
        MapleActivity.finish(getPlayer(), questid);
    }

    public final int getAQActivity(final int questid) {
        return MapleActivity.QuestActivity.getActivityById(questid);
    }

    public final int getAQMaxTimes(final int questid) {
        return MapleActivity.QuestActivity.getMaxTimesById(questid);
    }

    public final int getAQNextStageNeed() {
        return MapleActivity.getNextStageNeed(getPlayer());
    }

    public final int getRecevieReward() {
        return MapleActivity.getRecevieReward(getPlayer());
    }

    public List<Integer> getSevenDayPayLog(int day) {
        List<Integer> ret = new ArrayList<>();
        for (int i = 0; i < day; i++) {
            ret.add(0);
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM paylog WHERE account = ?");
            ps.setString(1, c.getAccountName());
            ResultSet rs = ps.executeQuery();

            Timestamp currtime = new Timestamp(System.currentTimeMillis());
            while (rs.next()) {
                int rmb = rs.getInt("rmb");
                Timestamp time = rs.getTimestamp("paytime");
                int diffday = (int) ((currtime.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
                if (diffday < day) {
                    ret.set(diffday, (ret.get(diffday)) + rmb);
                }
            }
            ps.close();
            rs.close();
        } catch (SQLException e) {
            System.err.println("????????????????????????" + e);
        }
        return ret;
    }

//    public List<CharNameAndId> getPayRankingTop() {
//        List<CharNameAndId> ret = new LinkedList<>();
//        Calendar cal = Calendar.getInstance();
//        cal.add(Calendar.DATE, -(cal.get(Calendar.DAY_OF_WEEK) - 1));
//        
//        try {
//            Connection con = DatabaseConnection.getConnection();
//            PreparedStatement ps = con.prepareStatement("SELECT SUM(rmb) FROM paylog WHERE ORDER BY rmb DESC LIMIT 10");
//            ps.setString(1, c.getAccountName());
//            ResultSet rs = ps.executeQuery();
//            
//            Timestamp currtime = new Timestamp(System.currentTimeMillis());
//            while (rs.next()) {
//                int rmb = rs.getInt("rmb");
//                Timestamp time = rs.getTimestamp("paytime");
//                int diffday = (int) ((currtime.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
//                if (diffday < day) {
//                    ret.set(diffday, (int) (ret.get(diffday)) + rmb);
//                }
//            }
//            ps.close();
//            rs.close();
//        } catch (SQLException e) {
//            System.err.println("????????????????????????" + e);
//        }
//        return ret;
//    }
    /**
     * ?????????????????? - ??????????????????????????????????????????????????????
     *
     * @param missionid
     * @return
     */
    public final boolean MissionCanMake(final int missionid) {
        return getPlayer().MissionCanMake(missionid);
    }

    /**
     * ?????????????????? - ??????????????????????????????????????????????????????
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final boolean MissionCanMake(final int missionid, final int checktype) {
        return getPlayer().MissionCanMake(missionid, checktype);
    }

    /**
     * ?????????????????? - ???????????????????????????
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final int MissionGetIntData(final int missionid, final int checktype) {
        return getPlayer().MissionGetIntData(missionid, checktype);
    }

    /**
     * ?????????????????? - ????????????????????????????????????
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final String MissionGetStrData(final int missionid, final int checktype) {
        return getPlayer().MissionGetStrData(missionid, checktype);
    }

    /**
     * ?????????????????? - ????????????????????????????????????
     *
     * @param joblist
     * @return
     */
    public final String MissionGetJoblist(final String joblist) {
        return getPlayer().MissionGetJoblist(joblist);
    }

    /**
     * ?????????????????? - ????????????
     *
     * @param charid
     * @param missionid
     * @param repeat
     * @param repeattime
     * @param lockmap
     * @param mobid
     */
    public final void MissionMake(final int charid, final int missionid, final int repeat, final int repeattime, final int lockmap, final int mobid) {
        getPlayer().MissionMake(charid, missionid, repeat, repeattime, lockmap, mobid);
    }

    /**
     * ?????????????????? - ????????????????????????
     *
     * @param charid
     * @param missionid
     * @param repeat
     * @param repeattime
     * @param lockmap
     */
    public final void MissionReMake(final int charid, final int missionid, final int repeat, final int repeattime, final int lockmap) {
        getPlayer().MissionReMake(charid, missionid, repeat, repeattime, lockmap);
    }

    /**
     * ?????????????????? - ????????????
     *
     * @param charid
     * @param missionid
     */
    public final void MissionFinish(final int charid, final int missionid) {
        getPlayer().MissionFinish(charid, missionid);
    }

    /**
     * ?????????????????? - ????????????
     *
     * @param charid
     * @param missionid
     */
    public final void MissionDelete(final int charid, final int missionid) {
        getPlayer().MissionDelete(charid, missionid);
    }

    /**
     * ??????????????????
     *
     * @param charid
     * @param missionid
     * @param num
     */
    public final void MissionSetMinNum(final int charid, final int missionid, final int num) {
        getPlayer().MissionSetMinNum(charid, missionid, num);
    }

    /**
     * ??????????????????
     *
     * @param charid
     * @param missionid
     * @param mobid
     * @return
     */
    public final int MissionGetMinNum(final int charid, final int missionid, final int mobid) {
        return getPlayer().MissionGetMinNum(charid, missionid, mobid);
    }

    public final int MissionGetMaxNum(final int charid, final int missionid, final int mobid) {
        return getPlayer().MissionGetMaxNum(charid, missionid, mobid);
    }

    public final int MissionGetMobId(final int charid, final int missionid) {
        return getPlayer().MissionGetMobId(charid, missionid);
    }

    public final void MissionSetMobId(final int charid, final int missionid, final int mobid) {
        getPlayer().MissionSetMobId(charid, missionid, mobid);
    }

    public final int MissionGetFinish(final int charid, final int missionid) {
        return getPlayer().MissionGetFinish(charid, missionid);
    }

    /**
     * ?????????????????? - ???????????????????????????????????????
     *
     * @param missionid
     * @param maxnum
     */
    public final void MissionMaxNum(final int missionid, final int maxnum) {
        getPlayer().MissionMaxNum(missionid, maxnum);
    }

    /**
     * ?????????????????? - ???????????????????????????
     *
     * @param charid
     */
    public final void MissionDeleteNotFinish(final int charid) {
        getPlayer().MissionDeleteNotFinish(charid);
    }

    /**
     * ?????????????????? - ???????????????????????????
     *
     * @param charid
     * @param missionid
     * @param maxtimes
     * @param checktype
     * @return
     */
    public final boolean MissionStatus(final int charid, final int missionid, final int maxtimes, final int checktype) {
        return getPlayer().MissionStatus(charid, missionid, maxtimes, checktype);
    }

    public final long MissionGetRepeattime(final int charid, final int missionid) {
        return getPlayer().MissionGetRepeattime(charid, missionid);
    }

    public final void MissionAddMinNum(final int charid, final int missionid, final int num) {
        getPlayer().MissionAddMinNum(charid, missionid, num);
    }

    public int getRMB() {
        return getPlayer().getRMB();
    }

    public void setRMB(int rmb) {
        getPlayer().setRMB(rmb);
    }

    public void gainRMB(int rmb) {
        getPlayer().gainRMB(rmb);
    }

    public int getTotalRMB() {
        return getPlayer().getTotalRMB();
    }

    public List<Pair<String, Integer>> getTotalRMBRanking(int limit) {
        return getPlayer().getTotalRMBRanking(limit);
    }

    public int getMapleEquipOnlyId() {
        return MapleEquipOnlyId.getInstance().getNextEquipOnlyId();
    }

    public void addFromDrop(MapleClient c, Item item, boolean show) {
        MapleInventoryManipulator.addFromDrop(c, item, show);
    }

    public Connection getConnection() {
        return DatabaseConnection.getConnection();
    }

    public final Item newItem(final int id, final byte position, final short quantity) {
        return new Item(id, position, quantity);
    }

    public final Item newItem(final int id, final byte position, final short quantity, final short flag) {
        return new Item(id, position, quantity, flag);
    }

    public final void addByItem(final Item item) {
        MapleInventoryManipulator.addbyItem(c, item);
    }

    /*
     * ???????????? 1 = ?????????????????? 2 = ?????????????????? 3 = ?????????????????? 4 = ????????????
     */
    public int getHyPay(int type) {
        return getPlayer().getHyPay(type);
    }

    public int addHyPay(int hypay) {
        return getPlayer().addHyPay(hypay);
    }

    public int delPayReward(int pay) {
        return getPlayer().delPayReward(pay);
    }

    public void changeDamageSkin(int id) {
        getPlayer().changeDamageSkin(id);
    }

    public void sendGameExit() {
        getPlayer().saveToDB(true, true);
        c.getSession().write(MaplePacketCreator.GameExitPacket());
    }

    public void updateSubmitBug(int id, int status) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE buglog SET status = ? WHERE id = ?");
            ps.setInt(1, status);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMake:", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex) {
                log.error(ex.toString());
            }
        }
    }

    public void submitBug(String title, String content) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO buglog VALUES (DEFAULT, ?, ?, ?, DEFAULT)");
            ps.setInt(1, getPlayer().getId());
            ps.setString(2, title);
            ps.setString(3, content);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMake:", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex) {
                log.error(ex.toString());
            }
        }
    }

    public List<Quadruple> getSubmitBug() {
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Quadruple> buglist = new LinkedList<>();
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM buglog WHERE charid = ?");
            ps.setInt(1, getPlayer().getId());
            rs = ps.executeQuery();
            while (rs.next()) {
                buglist.add(new Quadruple<>(rs.getInt("id"), rs.getString("title"), rs.getString("content"), rs.getInt("status")));
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMake:", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex) {
                log.error(ex.toString());
            }
        }
        return buglist;
    }

    public RankingTop getRankingTopInstance() {
        return RankingTop.getInstance();
    }

    public final MapleMonster getMonster(final int mobid) {
        return MapleLifeFactory.getMonster(mobid);
    }

    /**
     * *
     * ??????????????????
     *
     * @param hp
     * @param mp
     * @param exp
     * @return
     */
    public final OverrideMonsterStats getOverrideMonsterStats(final long hp, final int mp, final int exp) {
        return new OverrideMonsterStats(hp, mp, exp);
    }

    public final long getNextDayDiff(int day) {
        return DateUtil.getNextDayDiff(day);
    }

    public final void getShowItemGain(int itemId, short quantity, boolean inChat) {
        c.getSession().write(MaplePacketCreator.getShowItemGain(itemId, quantity, inChat));
    }

    public final void insertRanking(String rankingname, int value) {
        RankingTop.getInstance().insertRanking(getPlayer(), rankingname, value);
    }

    public final List<CharNameAndId> getRanking(String rankingname) {
        return RankingTop.getInstance().getRanking(rankingname);
    }

    public final List<CharNameAndId> getRanking(String rankingname, int previous) {
        return RankingTop.getInstance().getRanking(rankingname, previous);
    }

    public final List<CharNameAndId> getRanking(String rankingname, int previous, boolean repeatable) {
        return RankingTop.getInstance().getRanking(rankingname, previous, repeatable);
    }

    /*
     * ????????????????????????
     */
    public final boolean registerPromoter(String account) throws SQLException {
        boolean ret = false, canregister = false;
        PreparedStatement ps = null;
        ResultSet rs = null;
        if (account.equals(c.getAccountName()) || !AutoRegister.getAccountExists(account)) {
            return ret;
        }
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts_promoter WHERE accname = ?");
            ps.setString(1, c.getAccountName());
            rs = ps.executeQuery();
            if (!rs.first()) {
                canregister = true;
            }
            ps.close();
            rs.close();
            if (canregister) {
                ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO accounts_promoter (accname, promoter, time) VALUES (?, ?, CURRENT_TIMESTAMP)");
                ps.setString(1, c.getAccountName());
                ps.setString(2, account);
                ps.executeUpdate();
                ps.close();
                gainPromoterPoints(account, 1);
                ret = true;
            }
        } catch (SQLException ex) {
            log.error("isPromotionToo Error!", ex);
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (rs != null) {
                rs.close();
            }
        }
        return ret;
    }

    /*
     * ????????????????????????
     */
    public int getPromoterPoints(String accountName) {
        int points = 0;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT promoter FROM accounts WHERE name = ?");
            ps.setString(1, accountName);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                points = rs.getInt(1);
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("error loading characters internal", e);
        }
        return points;
    }

    /*
     * ?????????????????????????????????
     */
    public void gainPromoterPoints(String accountName, int points) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET promoter = promoter + ? WHERE name = ?");
            ps.setInt(1, points);
            ps.setString(2, accountName);

            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("error loading characters internal", e);
        }
    }

    /*
     * ??????NPC??????????????????????????????
     */
    public void getNpcNotice(int npcid, String text, int time) {
        c.getPlayer().getNpcNotice(npcid, text, time);
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

    public void setCredit(String name, int value) {
        c.getPlayer().setCredit(name, value);
    }

    public void gainCredit(String name, int value) {
        c.getPlayer().gainCredit(name, value);
    }

    public int getCredit(String name) {
        return c.getPlayer().getCredit(name);
    }

    public int getWp() {
        return c.getPlayer().getWeaponPoint();
    }

    public void setWp(int wp) {
        c.getPlayer().setWeaponPoint(wp);
    }

    public void gainWp(int wp) {
        c.getPlayer().gainWeaponPoint(wp);
    }

    public MapleMonsterInformationProvider getMonsterInfo() {
        return MapleMonsterInformationProvider.getInstance();
    }

    public void EnterCS() {
        InterServerHandler.EnterCS(c, c.getPlayer(), true);
    }

    public void playMovie(String data, boolean show) {
        c.getSession().write(UIPacket.playMovie(data, show));
    }

    public void openUI(int id) {
        c.getSession().write(UIPacket.sendOpenWindow(id));
    }

    public void openSigninUI() {
        c.getSession().write(UIPacket.sendOpenWindow(UIPacket.UI_SerialNumber.????????????.getId()));
    }
}
