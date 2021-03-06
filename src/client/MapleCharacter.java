package client;

import handling.channel.ChannelServer;
import handling.login.JobType;
import handling.world.CharacterTransfer;
import handling.world.PartyOperation;
import handling.world.PlayerBuffStorage;
import handling.world.PlayerBuffValueHolder;
import handling.world.World;
import handling.world.WorldBroadcastService;
import handling.world.WorldFamilyService;
import handling.world.WorldGuildService;
import handling.world.WorldMessengerService;
import handling.world.WorldSidekickService;
import handling.world.WrodlPartyService;
import handling.world.family.MapleFamily;
import handling.world.family.MapleFamilyBuff;
import handling.world.family.MapleFamilyCharacter;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildCharacter;
import handling.world.messenger.MapleMessenger;
import handling.world.messenger.MapleMessengerCharacter;
import handling.world.messenger.MessengerRankingWorker;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import handling.world.sidekick.MapleSidekick;

import java.awt.Point;
import java.awt.Rectangle;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.apache.log4j.Logger;
import org.apache.mina.core.session.IoSession;

import scripting.event.EventInstanceManager;
import scripting.npc.NPCScriptManager;
import server.*;
import server.MapleStatEffect.CancelEffectAction;
import server.Timer.BuffTimer;
import server.Timer.MapTimer;
import server.Timer.WorldTimer;
import server.achievement.MapleAchievements;
import server.cashshop.CashShop;
import server.commands.PlayerGMRank;
import server.life.Element;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.maps.AnimatedMapleMapObject;
import server.maps.FieldLimitType;
import server.maps.MapleDoor;
import server.maps.MapleDragon;
import server.maps.MapleExtractor;
import server.maps.MapleFoothold;
import server.maps.MapleLittleWhite;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleSummon;
import server.maps.MechDoor;
import server.maps.SavedLocationType;
import server.maps.events.Event_PyramidSubway;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.reward.RandomRewardService;
import server.reward.RewardDropEntry;
import server.shop.MapleShop;
import server.shop.MapleShopItem;
import server.shops.IMaplePlayerShop;
import tools.AttackPair;
import tools.ConcurrentEnumMap;
import tools.DateUtil;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.Triple;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.packet.AndroidPacket;
import tools.packet.BuddyListPacket;
import tools.packet.BuffPacket;
import tools.packet.EffectPacket;
import tools.packet.InventoryPacket;
import tools.packet.MTSCSPacket;
import tools.packet.MobPacket;
import tools.packet.MonsterCarnivalPacket;
import tools.packet.NPCPacket;
import tools.packet.PartyPacket;
import tools.packet.PetPacket;
import tools.packet.PlayerShopPacket;
import tools.packet.SummonPacket;
import tools.packet.UIPacket;
import client.anticheat.CheatTracker;
import client.anticheat.ReportType;
import client.inventory.Equip;
import client.inventory.ImpFlag;
import client.inventory.Item;
import client.inventory.ItemFlag;
import client.inventory.ItemLoader;
import client.inventory.MapleAndroid;
import client.inventory.MapleImp;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MapleMount;
import client.inventory.MaplePet;
import client.inventory.MaplePotionPot;
import client.inventory.MapleRing;
import client.inventory.ModifyInventory;
import client.inventory.ModifyItemOptential;
import client.skills.InnerSkillEntry;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.SkillMacro;
import client.skills.SpecialBuffInfo;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import configs.FishingConfig;
import configs.ServerConfig;
import constants.BattleConstants.PokemonNature;
import constants.BattleConstants.PokemonStat;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.ServerConstants;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.????????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.????????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.?????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.???????????????;
import constants.skills.????????????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.?????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.???????????????;
import constants.skills.????????????;
import constants.skills.?????????;
import constants.skills.?????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.????????????;
import constants.skills.????????????;
import constants.skills.?????????;
import constants.skills.??????;
import constants.skills.??????;
import constants.skills.?????????;
import constants.skills.????????????;
import constants.skills.?????????;
import constants.skills.????????????;
import constants.skills.??????;
import database.DatabaseConnection;
import database.DatabaseException;

public class MapleCharacter extends AnimatedMapleMapObject implements Serializable {

    private static final long serialVersionUID = 845748950829L;
    private String name, chalktext, BlessOfFairy_Origin, BlessOfEmpress_Origin, teleportname;
    private long lastComboTime, lastfametime, keydown_skill, nextConsume, pqStartTime, lastDragonBloodTime, lastBerserkTime, lastRecoveryTime, lastSummonTime, mapChangeTime, lastFishingTime,
            lastFairyTime, lastmonsterCombo, lastHPTime, lastMPTime, lastFamiliarEffectTime, lastDOTTime, lastExpirationTime, lastBlessOfDarknessTime, lastRecoveryTimeEM, lastCritStorageTime;
    private byte gmLevel, gender, initialSpawnPoint, skinColor, guildrank = 5, allianceRank = 5, world, fairyExp, subcategory;
    private short level, mulung_energy, availableCP, fatigue, totalCP, hpApUsed, job, remainingAp, scrolledPosition;
    private int accountid, id, hair, face, mapid, fame, pvpExp, pvpPoints, totalWins, totalLosses, hitcountbat, batcount, guildid = 0, fallcounter, /*maplepoints, acash,*/
            chair, itemEffect, points, vpoints, criticalgrowth, rank = 1, rankMove = 0, jobRank = 1, jobRankMove = 0, marriageId, marriageItemId, dotHP, touchedrune, monsterCombo, currentrep, totalrep,
            coconutteam, followid, gachexp, challenge, guildContribution = 0, todayonlinetime, totalonlinetime, weaponPoint = -1;
    private AtomicLong exp = new AtomicLong(); //??????????????????
    private AtomicLong meso = new AtomicLong();
    private Point old;
    private MonsterFamiliar summonedFamiliar;
    private int[] wishlist, rocks, savedLocations, regrocks, hyperrocks, remainingSp = new int[10];
    private transient AtomicInteger inst, insd;
    private transient List<LifeMovementFragment> lastres;
    private List<Long> killmonsterExps = new ArrayList();
    private List<Integer> lastmonthfameids, lastmonthbattleids, extendedSlots;
    private List<MapleDoor> doors;
    private List<MechDoor> mechDoors;
    private MaplePet[] spawnPets; //??????????????????
    private List<MapleShopItem> rebuy; //??????
    private MapleImp[] imps;
    private transient Set<MapleMonster> controlled;
    private transient Set<MapleMapObject> visibleMapObjects;
    private transient ReentrantReadWriteLock visibleMapObjectsLock;
    private transient ReentrantReadWriteLock summonsLock;
    private transient ReentrantReadWriteLock controlledLock;
    private transient ReentrantReadWriteLock itemLock;
    private transient Lock rLCheck;
    private transient MapleAndroid android;
    private Map<MapleQuest, MapleQuestStatus> quests;
    private Map<Integer, String> questinfo;
    private Map<String, String> keyValue; //??????????????????
    private Map<Skill, SkillEntry> skills; //????????????
    private InnerSkillEntry[] innerSkills; //????????????????????????
    private MaplePlayerBuffManager buffManager;
    private transient ArrayList<Pair<MapleBuffStat, MapleBuffStatValueHolder>> effects;
    private transient Map<Integer, MapleCoolDownValueHolder> coolDowns;
    private transient Map<MapleDisease, MapleDiseaseValueHolder> diseases;
    private transient List<MapleSummon> summons;
    private Map<ReportType, Integer> reports;
    private CashShop cs;
    private transient Deque<MapleCarnivalChallenge> pendingCarnivalRequests;
    private transient MapleCarnivalParty carnivalParty;
    private BuddyList buddylist;
    private MonsterBook monsterbook;
    private transient CheatTracker anticheat; //??????????????????
    private transient MapleLieDetector antiMacro; //???????????????
    private MapleClient client;
    private transient MapleParty party;
    private PlayerStats stats;
    private MapleCharacterCards characterCard;
    private transient MapleMap map;
    private transient MapleShop shop;
    private transient MapleDragon dragon;
    private transient MapleExtractor extractor;
    private transient RockPaperScissors rps;
    private transient MapleLittleWhite lw;
    private MapleSidekick sidekick;
    private Map<Integer, MonsterFamiliar> familiars;
    private MapleStorage storage;
    private transient MapleTrade trade;
    private MapleMount mount;
    private List<Integer> finishedAchievements;
    private MapleMessenger messenger;
    private byte[] petStore;
    private transient IMaplePlayerShop playerShop;
    private boolean invincible, canTalk, followinitiator, followon, smega, hasSummon;
    private MapleGuildCharacter mgc;
    private MapleFamilyCharacter mfc;
    private transient EventInstanceManager eventInstance;
    private MapleInventory[] inventory;
    private SkillMacro[] skillMacros = new SkillMacro[5];
    private EnumMap<MapleTraitType, MapleTrait> traits;
    private Battler[] battlers = new Battler[6];
    private List<Battler> boxed;
    private MapleKeyLayout keylayout;
    private MapleQuickSlot quickslot;
    private transient ScheduledFuture<?> mapTimeLimitTask;
    private transient ScheduledFuture<?> chalkSchedule; //?????????????????????
    private transient Event_PyramidSubway pyramidSubway = null;
    private transient List<Integer> pendingExpiration = null;
    private transient Map<Skill, SkillEntry> pendingSkills = null;
    private transient Map<Integer, Integer> linkMobs;
    private transient PokemonBattle battle;
    private boolean changed_wishlist, changed_trocklocations, changed_skillmacros, changed_achievements, changed_savedlocations, changed_pokemon, changed_questinfo, changed_skills, changed_reports,
            changed_extendedSlots, changed_innerSkills, changed_keyValue;
    private static final Logger log = Logger.getLogger(MapleCharacter.class);
    private int aranCombo = 0; //??????????????????
    private int decorate; //????????????
    private int vip; //????????????
    private Timestamp viptime; //????????????
    private int titleEffect; //???????????? 
    private boolean isbanned = false; //??????????????????
    private int beans; //????????????
    private int warning; //??????????????????????????????
    private int dollars; //????????????
    private int shareLots; //????????????
    private int reborns, reborns1, reborns2, reborns3, apstorage; //????????????
    private int honorLevel, honorExp; //????????????
    private Timestamp createDate; //?????????????????????
    //???????????????
    private int love; //???????????????
    private long lastlovetime; //???????????????????????????
    private Map<Integer, Long> lastdayloveids; //???????????????????????????????????? ??????ID ???????????????????????????
    //????????????
    private int playerPoints; //????????????
    private int playerEnergy; //???????????????
    //??????PVP??????
    private transient MaplePvpStats pvpStats;
    private int pvpDeaths; //????????????
    private int pvpKills; //????????????
    private int pvpVictory; //????????????
    //???????????????
    private MaplePotionPot potionPot;
    //????????????????????????
    private MapleCoreAura coreAura;
    //????????????????????????????????????
    private boolean isSaveing;
    //??????????????????????????????
    private PlayerSpecialStats specialStats;
    private Timestamp todayonlinetimestamp;
    //??????????????????????????????
    private int mobKills; //???????????????????????????
    private long lastMobKillTime; //???????????????????????????????????????
    //????????????????????????
    private transient Element elements = null;
    //?????????????????????BUFF
    private long lastRepeatEffectTime;
    //??????????????????
    private int flameMapId; //???????????????
    private Point flamePoint = null; //?????????????????????????????????
    //??????1???????????????????????????
    private long totDamageToMob;
    //?????????????????????????????????
    private long lastFuWenTime;
    //?????????????????????????????????
//    private long checkXenonBatteryTime; //???????????????60?????????????????????
    //???????????????????????????????????????
    private transient ModifyItemOptential ItemOptential;
    //???????????????????????????ID
    private int lastAttackSkillId;
    //???????????????????????????BUFF??????
    private long checkPartyPassiveTime;
    //?????????????????????????????????
    private int attackHit;
    //NPC????????????
    private long lasttime = 0;
    private long currenttime = 0;
    private long deadtime = 300L;
    // ????????????
    private transient ScheduledFuture<?> celebrityCrit;
    // ???????????????
    private boolean luckymoney = false;
    private transient IoSession chatSession;
    // ???????????????
    private Map<String, Integer> credit;
    // ??????????????????
    private short soulcount = 0;
    // ?????????????????????
    private long lastCheckProcess;
    private final List<MapleProcess> Process = new LinkedList();
    private int friendshiptoadd;
    private int[] friendshippoints = new int[5];
    // ??????????????????
    private MapleSigninStatus siginStatus;
    // ??????
    private List<Integer> effectSwitch;

    private MapleCharacter(boolean ChannelServer) {
        setStance(0);
        setPosition(new Point(0, 0));
        inventory = new MapleInventory[MapleInventoryType.values().length];
        for (MapleInventoryType type : MapleInventoryType.values()) {
            inventory[type.ordinal()] = new MapleInventory(type);
        }
        keyValue = new LinkedHashMap<>(); //????????????????????????
        questinfo = new LinkedHashMap<>();
        quests = new LinkedHashMap<>(); // Stupid erev quest.
        skills = new LinkedHashMap<>(); //????????????
        innerSkills = new InnerSkillEntry[3]; //???????????????????????? ????????????3???
        stats = new PlayerStats(); //??????????????????
        characterCard = new MapleCharacterCards(); //???????????????
        for (int i = 0; i < remainingSp.length; i++) {
            remainingSp[i] = 0;
        }
        traits = new EnumMap<>(MapleTraitType.class);
        for (MapleTraitType t : MapleTraitType.values()) {
            traits.put(t, new MapleTrait(t));
        }
        spawnPets = new MaplePet[3]; //?????????????????????
        specialStats = new PlayerSpecialStats(); //????????????????????????
        specialStats.resetSpecialStats();
        credit = new LinkedHashMap<>();
        effectSwitch = new ArrayList<>();
        if (ChannelServer) {
            isSaveing = false;
            changed_reports = false;
            changed_skills = false;
            changed_achievements = false;
            changed_wishlist = false;
            changed_trocklocations = false;
            changed_skillmacros = false;
            changed_savedlocations = false;
            changed_pokemon = false;
            changed_extendedSlots = false;
            changed_questinfo = false;
            changed_innerSkills = false;
            changed_keyValue = false;
            scrolledPosition = 0;
            criticalgrowth = 0;
            lastComboTime = 0;
            mulung_energy = 0;
            aranCombo = 0;
            keydown_skill = 0;
            nextConsume = 0;
            pqStartTime = 0;
            fairyExp = 0;
            mapChangeTime = 0;
            lastmonsterCombo = 0;
            monsterCombo = 0;
            lastRecoveryTime = 0;
            lastDragonBloodTime = 0;
            lastBerserkTime = 0;
            lastFishingTime = 0;
            lastFairyTime = 0;
            lastHPTime = 0;
            lastMPTime = 0;
            lastFamiliarEffectTime = 0;
            lastExpirationTime = 0; //??????????????????
            lastBlessOfDarknessTime = 0; //??????????????????
            lastRecoveryTimeEM = 0; //??????????????????
            lastRepeatEffectTime = 0; //????????????BUFF?????????
            lastCritStorageTime = 0; //????????????????????????
            old = new Point(0, 0);
            coconutteam = 0;
            followid = 0;
            marriageItemId = 0;
            fallcounter = 0;
            challenge = 0;
            dotHP = 0;
            lastSummonTime = 0;
            hasSummon = false;
            invincible = false;
            canTalk = true;
            followinitiator = false;
            followon = false;
            rebuy = new ArrayList<>(); //????????????
            linkMobs = new HashMap<>();
            finishedAchievements = new ArrayList<>();
            reports = new EnumMap<>(ReportType.class);
            teleportname = "";
            smega = true;
            petStore = new byte[3];
            for (int i = 0; i < petStore.length; i++) {
                petStore[i] = (byte) -1;
            }
            wishlist = new int[12]; //V.112?????????12???
            rocks = new int[10];
            regrocks = new int[5];
            hyperrocks = new int[13];
            imps = new MapleImp[3];
            friendshippoints = new int[5];
            boxed = new ArrayList<>();
            familiars = new LinkedHashMap<>();
            extendedSlots = new ArrayList<>();
            effects = new ArrayList<>();
            coolDowns = new LinkedHashMap<>();
            diseases = new ConcurrentEnumMap<>(MapleDisease.class);
            inst = new AtomicInteger(0);// 1 = NPC/ Quest, 2 = Duey, 3 = Hired Merch store, 4 = Storage
            insd = new AtomicInteger(-1);
            keylayout = new MapleKeyLayout();
            quickslot = new MapleQuickSlot();
            doors = new ArrayList<>();
            mechDoors = new ArrayList<>();
            itemLock = new ReentrantReadWriteLock();
            rLCheck = itemLock.readLock();
            controlled = new LinkedHashSet<>();
            controlledLock = new ReentrantReadWriteLock();
            summons = new LinkedList<>();
            summonsLock = new ReentrantReadWriteLock();
            visibleMapObjects = new LinkedHashSet<>();
            visibleMapObjectsLock = new ReentrantReadWriteLock();
            pendingCarnivalRequests = new LinkedList<>();

            savedLocations = new int[SavedLocationType.values().length];
            for (int i = 0; i < SavedLocationType.values().length; i++) {
                savedLocations[i] = -1;
            }
            todayonlinetimestamp = new Timestamp(System.currentTimeMillis());
            buffManager = new MaplePlayerBuffManager(this);
        }
    }

    /*
     * ????????????????????????
     */
    public static MapleCharacter getDefault(MapleClient client, JobType type) {
        MapleCharacter ret = new MapleCharacter(false);
        ret.client = client;
        ret.map = null;
        ret.exp.set(0);
        ret.gmLevel = 0;
        ret.job = (short) type.jobId;
        ret.meso.set(10000);
        ret.level = 1;
        ret.remainingAp = 0;
        ret.fame = 0; //?????????
        ret.love = 0; //?????????
        ret.accountid = client.getAccID();
        ret.buddylist = new BuddyList((byte) 20);

        ret.stats.str = 12;
        ret.stats.dex = 5;
        ret.stats.int_ = 4;
        ret.stats.luk = 4;
        ret.stats.maxhp = 50;
        ret.stats.hp = 50;
        ret.stats.maxmp = 50;
        ret.stats.mp = 50;
        ret.gachexp = 0;
        ret.friendshiptoadd = 0;
        ret.friendshippoints = new int[]{0, 0, 0, 0, 0};

        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, ret.accountid);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                ret.client.setAccountName(rs.getString("name"));
                ret.points = rs.getInt("points");
                ret.vpoints = rs.getInt("vpoints");
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            System.err.println("Error getting character default" + e);
        }
        return ret;
    }

    public static MapleCharacter ReconstructChr(CharacterTransfer ct, MapleClient client, boolean isChannel) {
        MapleCharacter ret = new MapleCharacter(true); // Always true, it's change channel
        ret.client = client;
        if (!isChannel) {
            ret.client.setChannel(ct.channel);
        }
        ret.id = ct.characterid;
        ret.name = ct.name;
        ret.level = ct.level;
        ret.fame = ct.fame; //?????????
        ret.love = ct.love; //?????????

        ret.stats.str = ct.str;
        ret.stats.dex = ct.dex;
        ret.stats.int_ = ct.int_;
        ret.stats.luk = ct.luk;
        ret.stats.maxhp = ct.maxhp;
        ret.stats.maxmp = ct.maxmp;
        ret.stats.hp = ct.hp;
        ret.stats.mp = ct.mp;

        ret.characterCard.setCards(ct.cardsInfo);

        ret.chalktext = ct.chalkboard;
        ret.gmLevel = ct.gmLevel;
        ret.exp.set(ret.level > ret.getMaxLevelForSever() ? 0 : ct.exp);
        ret.hpApUsed = ct.hpApUsed;
        ret.remainingSp = ct.remainingSp;
        ret.remainingAp = ct.remainingAp;
        ret.meso.set(ct.meso);
        ret.skinColor = ct.skinColor;
        ret.gender = ct.gender;
        ret.job = ct.job;
        ret.hair = ct.hair;
        ret.face = ct.face;
        ret.accountid = ct.accountid;
        ret.totalWins = ct.totalWins;
        ret.totalLosses = ct.totalLosses;
        client.setAccID(ct.accountid);
        ret.mapid = ct.mapid;
        ret.initialSpawnPoint = ct.initialSpawnPoint;
        ret.world = ct.world;
        ret.guildid = ct.guildid;
        ret.guildrank = ct.guildrank;
        ret.guildContribution = ct.guildContribution;
        ret.allianceRank = ct.alliancerank;
        ret.points = ct.points;
        ret.vpoints = ct.vpoints;
        ret.fairyExp = ct.fairyExp;
        ret.marriageId = ct.marriageId;
        ret.currentrep = ct.currentrep;
        ret.totalrep = ct.totalrep;
        ret.gachexp = ct.gachexp;
        ret.pvpExp = ct.pvpExp;
        ret.pvpPoints = ct.pvpPoints;
        ret.decorate = ct.decorate; //????????????
        ret.beans = ct.beans; //????????????
        ret.warning = ct.warning; //????????????
        //????????????
        ret.dollars = ct.dollars;
        ret.shareLots = ct.shareLots;
        //????????????
        ret.reborns = ct.reborns;
        ret.reborns1 = ct.reborns1;
        ret.reborns2 = ct.reborns2;
        ret.reborns3 = ct.reborns3;
        ret.apstorage = ct.apstorage;
        //????????????
        ret.honorLevel = ct.honorLevel;
        ret.honorExp = ct.honorExp;
        //????????????
        ret.vip = ct.vip; //????????????
        ret.viptime = ct.viptime; //????????????
        ret.playerPoints = ct.playerPoints; //????????????
        ret.playerEnergy = ct.playerEnergy; //???????????????
        ret.pvpDeaths = ct.pvpDeaths; //????????????
        ret.pvpKills = ct.pvpKills; //????????????
        ret.pvpVictory = ct.pvpVictory; //????????????
        ret.makeMFC(ct.familyid, ct.seniorid, ct.junior1, ct.junior2);
        if (ret.guildid > 0) {
            ret.mgc = new MapleGuildCharacter(ret);
        }
        ret.fatigue = ct.fatigue;
        ret.buddylist = new BuddyList(ct.buddysize);
        ret.subcategory = ct.subcategory;
        ret.friendshiptoadd = ct.friendshiptoadd;
        ret.friendshippoints = ct.friendshippoints;
        ret.soulcount = ct.soulcount;

        if (ct.sidekick > 0) {
            ret.sidekick = WorldSidekickService.getInstance().getSidekick(ct.sidekick);
        }

        if (isChannel) {
            MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
            ret.map = mapFactory.getMap(ret.mapid);
            if (ret.map == null) { //char is on a map that doesn't exist warp it to henesys
                ret.map = mapFactory.getMap(100000000);
            } else if (ret.map.getForcedReturnId() != 999999999 && ret.map.getForcedReturnMap() != null) {
                ret.map = ret.map.getForcedReturnMap();
            }
            MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
            if (portal == null) {
                portal = ret.map.getPortal(0); // char is on a spawnpoint that doesn't exist - select the first spawnpoint instead
                ret.initialSpawnPoint = 0;
            }
            ret.setPosition(portal.getPosition());

            int messengerid = ct.messengerid;
            if (messengerid > 0) {
                ret.messenger = WorldMessengerService.getInstance().getMessenger(messengerid);
            }
        } else {
            ret.messenger = null;
        }
        int partyid = ct.partyid;
        if (partyid >= 0) {
            MapleParty party = WrodlPartyService.getInstance().getParty(partyid);
            if (party != null && party.getMemberById(ret.id) != null) {
                ret.party = party;
            }
        }

        MapleQuestStatus queststatus_from;
        for (Entry<Integer, Object> qs : ct.Quest.entrySet()) {
            queststatus_from = (MapleQuestStatus) qs.getValue();
            queststatus_from.setQuest(qs.getKey());
            ret.quests.put(queststatus_from.getQuest(), queststatus_from);
        }
        for (Entry<Integer, SkillEntry> qs : ct.Skills.entrySet()) {
            ret.skills.put(SkillFactory.getSkill(qs.getKey()), qs.getValue());
        }
        for (Integer zz : ct.finishedAchievements) {
            ret.finishedAchievements.add(zz);
        }
        for (Object zz : ct.boxed) {
            Battler zzz = (Battler) zz;
            zzz.setStats();
            ret.boxed.add(zzz);
        }
        for (Entry<MapleTraitType, Integer> t : ct.traits.entrySet()) {
            ret.traits.get(t.getKey()).setExp(t.getValue());
        }
        for (Entry<Byte, Integer> qs : ct.reports.entrySet()) {
            ret.reports.put(ReportType.getById(qs.getKey()), qs.getValue());
        }
        ret.innerSkills = (InnerSkillEntry[]) ct.innerSkills;
        ret.monsterbook = new MonsterBook(ct.mbook, ret);
        ret.inventory = (MapleInventory[]) ct.inventorys;
        ret.BlessOfFairy_Origin = ct.BlessOfFairy;
        ret.BlessOfEmpress_Origin = ct.BlessOfEmpress;
        ret.skillMacros = (SkillMacro[]) ct.skillmacro;
        ret.battlers = (Battler[]) ct.battlers;
        for (Battler b : ret.battlers) {
            if (b != null) {
                b.setStats();
            }
        }
        ret.petStore = ct.petStore;
        ret.keylayout = new MapleKeyLayout(ct.keymap);
        ret.quickslot = new MapleQuickSlot(ct.quickslot);
        ret.keyValue = ct.KeyValue;
        ret.questinfo = ct.InfoQuest;
        ret.familiars = ct.familiars;
        ret.savedLocations = ct.savedlocation;
        ret.wishlist = ct.wishlist;
        ret.rocks = ct.rocks;
        ret.regrocks = ct.regrocks;
        ret.hyperrocks = ct.hyperrocks;
        ret.buddylist.loadFromTransfer(ct.buddies);
        // ret.lastfametime
        // ret.lastmonthfameids
        ret.keydown_skill = 0; // Keydown skill can't be brought over
        ret.lastfametime = ct.lastfametime;
        ret.lastmonthfameids = ct.famedcharacters;
        ret.lastmonthbattleids = ct.battledaccs;
        ret.extendedSlots = ct.extendedSlots;
        ret.lastlovetime = ct.lastLoveTime;
        ret.lastdayloveids = ct.loveCharacters;
        ret.storage = (MapleStorage) ct.storage;
        ret.pvpStats = (MaplePvpStats) ct.pvpStats; //Pvp?????????????????????
        ret.potionPot = (MaplePotionPot) ct.potionPot; //???????????????
        ret.coreAura = (MapleCoreAura) ct.coreAura; //????????????
        ret.specialStats = (PlayerSpecialStats) ct.SpecialStats; //????????????
        ret.cs = (CashShop) ct.cs;
        client.setAccountName(ct.accountname);
        ret.imps = ct.imps;
        ret.anticheat = (CheatTracker) ct.anticheat; //??????????????????
        ret.anticheat.start(ret);
        ret.antiMacro = (MapleLieDetector) ct.antiMacro; //???????????????
        ret.rebuy = ct.rebuy;
        ret.mount = new MapleMount(ret, ct.mount_itemid, PlayerStats.getSkillByJob(1004, ret.job), ct.mount_Fatigue, ct.mount_level, ct.mount_exp);
        ret.stats.recalcLocalStats(true, ret);
        ret.todayonlinetime = ct.todayonlinetime;
        ret.totalonlinetime = ct.totalonlinetime;
        ret.weaponPoint = ct.weaponPoint;
        ret.credit = ct.credit;
        ret.effectSwitch = ct.effectSwitch;
        client.setTempIP(ct.tempIP);

        return ret;
    }

    /*
     * ??????????????????
     */
    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver) {
        return loadCharFromDB(charid, client, channelserver, null);
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver, Map<Integer, CardData> cads) {
        MapleCharacter ret = new MapleCharacter(channelserver);
        ret.client = client;
        ret.id = charid;

        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        PreparedStatement pse;
        ResultSet rs = null;

       try {
			ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM characters WHERE id = ?");
			ps.setInt(1, charid);
			rs = ps.executeQuery();
			if (!rs.next()) {
				rs.close();
				ps.close();
				throw new RuntimeException("????????????????????????(??????????????????).");
			}
            ret.name = rs.getString("name");
            ret.level = rs.getShort("level");
            ret.fame = rs.getInt("fame"); //?????????
            ret.love = rs.getInt("love"); //?????????

            ret.stats.str = rs.getShort("str");
            ret.stats.dex = rs.getShort("dex");
            ret.stats.int_ = rs.getShort("int");
            ret.stats.luk = rs.getShort("luk");
            ret.job = rs.getShort("job");
            ret.stats.maxhp = rs.getInt("maxhp");
            ret.stats.maxmp = JobConstants.isNotMpJob(ret.job) ? GameConstants.getMPByJob(ret.job) : rs.getInt("maxmp");
            ret.stats.hp = rs.getInt("hp");
            ret.stats.mp = rs.getInt("mp");
            ret.gmLevel = rs.getByte("gm");
            ret.exp.set(ret.level >= ret.getMaxLevelForSever() ? 0 : rs.getLong("exp"));
            ret.hpApUsed = rs.getShort("hpApUsed");
            String[] sp = rs.getString("sp").split(",");
            for (int i = 0; i < ret.remainingSp.length; i++) {
                ret.remainingSp[i] = Integer.parseInt(sp[i]);
            }
            ret.remainingAp = rs.getShort("ap");
            ret.meso.set(rs.getLong("meso"));
            ret.skinColor = rs.getByte("skincolor");
            ret.gender = rs.getByte("gender");

            // ??????????????????????????????????????????????????????????????????????????????????????????
            int hair = rs.getInt("hair");
            int face = rs.getInt("face");
            if (!MapleItemInformationProvider.getInstance().hairExists(hair)) {
                hair = ret.gender == 0 ? 30000 : 31000;
            }
            if (!MapleItemInformationProvider.getInstance().faceExists(face)) {
                face = ret.gender == 0 ? 20000 : 21000;
            }
            ret.hair = hair;
            ret.face = face;

            ret.accountid = rs.getInt("accountid");
            if (client != null) {
                client.setAccID(ret.accountid);
            }
            ret.mapid = rs.getInt("map");
            ret.initialSpawnPoint = rs.getByte("spawnpoint");
            ret.world = rs.getByte("world");
            ret.guildid = rs.getInt("guildid");
            ret.guildrank = rs.getByte("guildrank");
            ret.allianceRank = rs.getByte("allianceRank");
            ret.guildContribution = rs.getInt("guildContribution");
            ret.totalWins = rs.getInt("totalWins");
            ret.totalLosses = rs.getInt("totalLosses");
            ret.currentrep = rs.getInt("currentrep");
            ret.totalrep = rs.getInt("totalrep");
            ret.makeMFC(rs.getInt("familyid"), rs.getInt("seniorid"), rs.getInt("junior1"), rs.getInt("junior2"));
            if (ret.guildid > 0 && client != null) {
                ret.mgc = new MapleGuildCharacter(ret);
            }
            ret.gachexp = rs.getInt("gachexp");
            ret.buddylist = new BuddyList(rs.getByte("buddyCapacity"));
            ret.subcategory = rs.getByte("subcategory");
            ret.mount = new MapleMount(ret, 0, PlayerStats.getSkillByJob(1004, ret.job), (byte) 0, (byte) 1, 0);
            //????????????
            ret.rank = rs.getInt("rank");
            ret.rankMove = rs.getInt("rankMove");
            ret.jobRank = rs.getInt("jobRank");
            ret.jobRankMove = rs.getInt("jobRankMove");
            //?????????????????????ID
            ret.marriageId = rs.getInt("marriageId");
            //?????????
            ret.fatigue = rs.getShort("fatigue");
            //PVP??????
            ret.pvpExp = rs.getInt("pvpExp");
            ret.pvpPoints = rs.getInt("pvpPoints");
            //????????????
            for (MapleTrait t : ret.traits.values()) {
                t.setExp(rs.getInt(t.getType().name()));
            }
            //????????????
            ret.decorate = rs.getInt("decorate");
            //????????????
            ret.beans = rs.getInt("beans");
            //??????????????????????????????
            ret.warning = rs.getInt("warning");
            //????????????
            ret.dollars = rs.getInt("dollars");
            ret.shareLots = rs.getInt("sharelots");
            //????????????
            ret.reborns = rs.getInt("reborns");
            ret.reborns1 = rs.getInt("reborns1");
            ret.reborns2 = rs.getInt("reborns2");
            ret.reborns3 = rs.getInt("reborns3");
            ret.apstorage = rs.getInt("apstorage");
            //????????????
            ret.honorLevel = rs.getInt("honorLevel");
            ret.honorExp = rs.getInt("honorExp");
            //????????????
            ret.playerPoints = rs.getInt("playerPoints");
            ret.playerEnergy = rs.getInt("playerEnergy");
            //Pvp??????
            ret.pvpDeaths = rs.getInt("pvpDeaths"); //????????????
            ret.pvpKills = rs.getInt("pvpKills"); //????????????
            ret.pvpVictory = rs.getInt("pvpVictory"); //??????????????????
            //Vip ????????????
            ret.vip = rs.getInt("vip");
            Timestamp expiration = rs.getTimestamp("viptime");
            ret.viptime = expiration == null ? null : expiration;
            ret.todayonlinetime = rs.getInt("todayonlinetime");
            ret.totalonlinetime = rs.getInt("totalonlinetime");
            ret.weaponPoint = rs.getInt("wp");
            ret.friendshiptoadd = rs.getInt("friendshiptoadd");
            String[] points = rs.getString("friendshippoints").split(",");
            for (int i = 0; i < 5; i++) {
                ret.friendshippoints[i] = Integer.parseInt(points[i]);
            }
            if (channelserver && client != null) {
                //Pvp??????
                ret.pvpStats = MaplePvpStats.loadOrCreateFromDB(ret.accountid);
                //??????????????????
                ret.anticheat = new CheatTracker(ret);
                //???????????????
                ret.antiMacro = new MapleLieDetector(ret);
                //????????????????????????
                MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
                ret.map = mapFactory.getMap(ret.mapid);
                if (ret.map == null) { //??????????????????????????????????????????
                    ret.map = mapFactory.getMap(100000000);
                }
                //??????????????????
                MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
                if (portal == null) {
                    portal = ret.map.getPortal(0); // char is on a spawnpoint that doesn't exist - select the first spawnpoint instead
                    ret.initialSpawnPoint = 0;
                }
                ret.setPosition(portal.getPosition());
                //????????????
                int partyid = rs.getInt("party");
                if (partyid >= 0) {
                    MapleParty party = WrodlPartyService.getInstance().getParty(partyid);
                    if (party != null && party.getMemberById(ret.id) != null) {
                        ret.party = party;
                    }
                }
                //????????????
                String[] pets = rs.getString("pets").split(",");
                for (int i = 0; i < ret.petStore.length; i++) {
                    ret.petStore[i] = Byte.parseByte(pets[i]);
                }
                rs.close();
                ps.close();
                //????????????
               ps = DatabaseConnection.getConnection()
						.prepareStatement("SELECT * FROM achievements WHERE accountid = ?");
				ps.setInt(1, ret.accountid);
				rs = ps.executeQuery();
				while (rs.next()) {
					ret.finishedAchievements.add(rs.getInt("achievementid"));
				}
				ps.close();
				rs.close();
				// ????????????
				ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM reports WHERE characterid = ?");
				ps.setInt(1, charid);
				rs = ps.executeQuery();
				while (rs.next()) {
					if (ReportType.getById(rs.getByte("type")) != null) {
						ret.reports.put(ReportType.getById(rs.getByte("type")), rs.getInt("count"));
					}
				}
			}
			rs.close();
			ps.close();
            /*
             * ?????????????????????
             */
            if (cads != null) {
                ret.characterCard.setCards(cads);
            } else if (client != null) {
                ret.characterCard.loadCards(client, channelserver);
            }
            //???????????????????????????????????????
            ps = DatabaseConnection.getConnection()
					.prepareStatement("SELECT * FROM character_keyvalue WHERE characterid = ?");
			ps.setInt(1, charid);
			rs = ps.executeQuery();
			while (rs.next()) {
				if (rs.getString("key") == null) {
					continue;
				}
				ret.keyValue.put(rs.getString("key"), rs.getString("value"));
			}
			rs.close();
			ps.close();
            //????????????????????????
           ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM questinfo WHERE characterid = ?");
			ps.setInt(1, charid);
			rs = ps.executeQuery();
			while (rs.next()) {
				ret.questinfo.put(rs.getInt("quest"), rs.getString("customData"));
			}
			rs.close();
			ps.close();
			// ??????????????????
			ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM queststatus WHERE characterid = ?");
			ps.setInt(1, charid);
			rs = ps.executeQuery();
			pse = DatabaseConnection.getConnection()
					.prepareStatement("SELECT * FROM queststatusmobs WHERE queststatusid = ?");
			while (rs.next()) {
				int id = rs.getInt("quest");
				MapleQuest q = MapleQuest.getInstance(id);
				byte stat = rs.getByte("status");
				if ((stat == 1 || stat == 2) && channelserver && (q == null || q.isBlocked())) { // bigbang
					continue;
				}
				if (stat == 1 && channelserver && !q.canStart(ret, null)) { // bigbang
					continue;
				}
				MapleQuestStatus status = new MapleQuestStatus(q, stat);
				long cTime = rs.getLong("time");
				if (cTime > -1) {
					status.setCompletionTime(cTime * 1000);
				}
				status.setForfeited(rs.getInt("forfeited"));
				status.setCustomData(rs.getString("customData"));
				ret.quests.put(q, status);
				pse.setInt(1, rs.getInt("queststatusid"));
				ResultSet rsMobs = pse.executeQuery();
				while (rsMobs.next()) {
					status.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
				}
				rsMobs.close();
			}
			rs.close();
			ps.close();
			pse.close();
            //====================================================================================
            if (channelserver) {
                //??????????????? ?????????????????????
                ret.monsterbook = MonsterBook.loadCards(ret.accountid, ret);
                //?????????????????????????????????
                ps = con.prepareStatement("SELECT * FROM inventoryslot where characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    rs.close();
                    ps.close();
                    throw new RuntimeException("No Inventory slot column found in SQL. [inventoryslot]");
                } else {
                    ret.getInventory(MapleInventoryType.EQUIP).setSlotLimit(rs.getByte("equip"));
                    ret.getInventory(MapleInventoryType.USE).setSlotLimit(rs.getByte("use"));
                    ret.getInventory(MapleInventoryType.SETUP).setSlotLimit(rs.getByte("setup"));
                    ret.getInventory(MapleInventoryType.ETC).setSlotLimit(rs.getByte("etc"));
                    ret.getInventory(MapleInventoryType.CASH).setSlotLimit(rs.getByte("cash"));
                }
                ps.close();
                rs.close();
                //????????????????????????
                for (Pair<Item, MapleInventoryType> mit : ItemLoader.????????????.loadItems(false, charid).values()) {
                    ret.getInventory(mit.getRight()).addFromDB(mit.getLeft());
                }
                //??????????????????????????????????????????
                ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                if (rs.next()) {
                    ret.getClient().setAccountName(rs.getString("name"));
                    ret.points = rs.getInt("points");
                    ret.vpoints = rs.getInt("vpoints");
                    /*
                     * ??????calendar.get(Calendar.YEAR)
                     * ??????calendar.get(Calendar.MONTH)+1
                     * ??????calendar.get(Calendar.DAY_OF_MONTH)
                     * ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
                     */
                    if (rs.getTimestamp("lastlogon") != null) {
                        Calendar cal = Calendar.getInstance();
                        cal.setTimeInMillis(rs.getTimestamp("lastlogon").getTime());
                        if (cal.get(Calendar.DAY_OF_WEEK) + 1 == Calendar.getInstance().get(Calendar.DAY_OF_WEEK)) {
                            //ret.acash += 500; //????????????????????????
                        }
                    }
                    if (rs.getInt("banned") > 0) {
                        rs.close();
                        ps.close();
                        ret.getClient().getSession().close(true);
                        throw new RuntimeException("????????????????????????????????????????????????????????????...");
                    }
                    rs.close();
                    ps.close();
                    //?????????????????????????????????
                    ps = con.prepareStatement("UPDATE accounts SET lastlogon = CURRENT_TIMESTAMP() WHERE id = ?");
                    ps.setInt(1, ret.accountid);
                    ps.executeUpdate();
                } else {
                    rs.close();
                }
                ps.close();
                //????????????????????????
                ps = DatabaseConnection.getConnection().prepareStatement("SELECT skillid, skilllevel, masterlevel, expiration, teachId, position FROM skills WHERE characterid = ?");
				ps.setInt(1, charid);
				rs = ps.executeQuery();
				Skill skil;
				int phantom = 0;
				while (rs.next()) {
					int skid = rs.getInt("skillid"); // ??????ID
					skil = SkillFactory.getSkill(skid);
					int skl = rs.getInt("skilllevel"); // ??????????????????
					byte msl = rs.getByte("masterlevel"); // ??????????????????
					int teachId = rs.getInt("teachId"); // ???????????????ID
					byte position = rs.getByte("position"); // ????????????????????????
					if (skil != null && GameConstants.isApplicableSkill(skid)) {
						if (skil.is?????????()) { // ????????????????????? ????????????
							ret.changed_skills = true;
							continue;
						}
                        if (skl > skil.getMaxLevel() && (skid < 92000000 || skid > 99999999)) {
                            if (!skil.isBeginnerSkill() && skil.canBeLearnedBy(ret.job) && !skil.isSpecialSkill() && !skil.isAdminSkill()) {
                                ret.remainingSp[JobConstants.getSkillBookBySkill(skid)] += (skl - skil.getMaxLevel());
                            }
                            skl = (byte) skil.getMaxLevel();
                        }
                        if (msl > skil.getMaxLevel()) {
                            msl = (byte) skil.getMaxLevel();
                        }
                        if ((position >= 0 && position < 13) && phantom < 13) {
                            if (JobConstants.is??????(ret.job) && skil.getSkillByJobBook() != -1) {
                                msl = skil.isFourthJob() ? (byte) skil.getMasterLevel() : 0;
                                ret.skills.put(skil, new SkillEntry(skl, msl, -1, teachId, position));
                            }
                            phantom++;
                        } else {
                            ret.skills.put(skil, new SkillEntry(skl, msl, rs.getLong("expiration"), teachId));
                        }
                    } else if (skil == null) { //???????????????
                        if (!JobConstants.is????????????(skid / 10000) && !GameConstants.isSpecialSkill(skid) && !GameConstants.isAdminSkill(skid)) {
                            ret.remainingSp[JobConstants.getSkillBookBySkill(skid)] += skl;
                        }
                    }
                }
                rs.close();
                ps.close();
                //??????????????????????????????
                ps = con.prepareStatement("SELECT skillid, skilllevel, position, rank FROM innerskills WHERE characterid = ? LIMIT 3");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    int skid = rs.getInt("skillid"); //??????ID
                    skil = SkillFactory.getSkill(skid);
                    int skl = rs.getInt("skilllevel"); //??????????????????
                    byte position = rs.getByte("position");  //??????????????????
                    byte rank = rs.getByte("rank");  //rank, C, B, A, and S
                    if (skil != null && skil.isInnerSkill() && position >= 1 && position <= 3) {
                        if (skl > skil.getMaxLevel()) {
                            skl = (byte) skil.getMaxLevel();
                        }
                        InnerSkillEntry InnerSkill = new InnerSkillEntry(skid, skl, position, rank);
                        ret.innerSkills[position - 1] = InnerSkill; //???????????????????????? ???????????? 0 ???????????? ????????????1
                    }
                }
                rs.close();
                ps.close();
                //??????????????????????????????????????????????????????
                ps = con.prepareStatement("SELECT * FROM characters WHERE accountid = ? ORDER BY level DESC");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                int maxlevel_ = 0, maxlevel_2 = 0;
                while (rs.next()) {
                    if (rs.getInt("id") != charid) { //?????????????????????ID
                        if (JobConstants.is?????????(rs.getShort("job"))) {
                            int maxlevel = (rs.getShort("level") / 5);
                            if (maxlevel > 24) {
                                maxlevel = 24;
                            }
                            if (maxlevel > maxlevel_2 || maxlevel_2 == 0) {
                                maxlevel_2 = maxlevel;
                                ret.BlessOfEmpress_Origin = rs.getString("name");
                            }
                        }
                        int maxlevel = (rs.getShort("level") / 10);
                        if (maxlevel > 20) {
                            maxlevel = 20;
                        }
                        if (maxlevel > maxlevel_ || maxlevel_ == 0) {
                            maxlevel_ = maxlevel;
                            ret.BlessOfFairy_Origin = rs.getString("name");
                        }
                    }
                }
                if (ret.BlessOfFairy_Origin == null) {
                    ret.BlessOfFairy_Origin = ret.name;
                }
                ret.skills.put(SkillFactory.getSkill(JobConstants.getBOF_ForJob(ret.job)), new SkillEntry(maxlevel_, (byte) 0, -1, 0));
                if (SkillFactory.getSkill(JobConstants.getEmpress_ForJob(ret.job)) != null) {
                    if (ret.BlessOfEmpress_Origin == null) {
                        ret.BlessOfEmpress_Origin = ret.BlessOfFairy_Origin;
                    }
                    ret.skills.put(SkillFactory.getSkill(JobConstants.getEmpress_ForJob(ret.job)), new SkillEntry(maxlevel_2, (byte) 0, -1, 0));
                }
                ps.close();
                rs.close();
                // END
                //?????????????????????
                ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int position;
                while (rs.next()) {
                    position = rs.getInt("position");
                    SkillMacro macro = new SkillMacro(rs.getInt("skill1"), rs.getInt("skill2"), rs.getInt("skill3"), rs.getString("name"), rs.getInt("shout"), position);
                    ret.skillMacros[position] = macro;
                }
                rs.close();
                ps.close();
                // ?????? familiars
                ps = con.prepareStatement("SELECT * FROM familiars WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    if (rs.getLong("expiry") <= System.currentTimeMillis()) {
                        continue;
                    }
                    ret.familiars.put(rs.getInt("familiar"), new MonsterFamiliar(charid, rs.getInt("id"), rs.getInt("familiar"), rs.getLong("expiry"), rs.getString("name"), rs.getInt("fatigue"), rs.getByte("vitality")));
                }
                rs.close();
                ps.close();
                //?????? pokemon
                ps = con.prepareStatement("SELECT * FROM pokemon WHERE characterid = ? OR (accountid = ? AND active = 0)");
                ps.setInt(1, charid);
                ps.setInt(2, ret.accountid);
                rs = ps.executeQuery();
                position = 0;
                while (rs.next()) {
                    Battler b = new Battler(rs.getInt("level"), rs.getInt("exp"), charid, rs.getInt("monsterid"), rs.getString("name"), PokemonNature.values()[rs.getInt("nature")], rs.getInt("itemid"), rs.getByte("gender"), rs.getByte("hpiv"), rs.getByte("atkiv"), rs.getByte("defiv"), rs.getByte("spatkiv"), rs.getByte("spdefiv"), rs.getByte("speediv"), rs.getByte("evaiv"), rs.getByte("acciv"), rs.getByte("ability"));
                    if (b.getFamily() == null) {
                        continue;
                    }
                    if (rs.getInt("active") > 0 && position < 6 && rs.getInt("characterid") == charid) {
                        ret.battlers[position] = b;
                        position++;
                    } else {
                        ret.boxed.add(b);
                    }
                }
                rs.close();
                ps.close();
                //??????????????????????????????
                ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                Map<Integer, Pair<Byte, Integer>> keyb = ret.keylayout.Layout();
                while (rs.next()) {
                    keyb.put(rs.getInt("key"), new Pair<>(rs.getByte("type"), rs.getInt("action")));
                }
                rs.close();
                ps.close();
                ret.keylayout.unchanged();
                //??????quickslot?????? ???????????????????????????????????????
                ps = con.prepareStatement("SELECT `index`, `key` FROM quickslot WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                List<Pair<Integer, Integer>> quickslots = ret.quickslot.Layout();
                while (rs.next()) {
                    quickslots.add(new Pair<>(rs.getInt("index"), rs.getInt("key")));
                }
                rs.close();
                ps.close();
                ret.quickslot.unchanged();
                //???????????????????????????
                ps = con.prepareStatement("SELECT `locationtype`,`map` FROM savedlocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.savedLocations[rs.getInt("locationtype")] = rs.getInt("map");
                }
                rs.close();
                ps.close();
                //?????????????????????????????????
                ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                ret.lastfametime = 0;
                ret.lastmonthfameids = new ArrayList<>(31);
                while (rs.next()) {
                    ret.lastfametime = Math.max(ret.lastfametime, rs.getTimestamp("when").getTime());
                    ret.lastmonthfameids.add(rs.getInt("characterid_to"));
                }
                rs.close();
                ps.close();
                //????????????????????????????????????
                ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM lovelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 1");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                ret.lastlovetime = 0;
                ret.lastdayloveids = new LinkedHashMap<>();
                while (rs.next()) {
                    ret.lastlovetime = Math.max(ret.lastlovetime, rs.getTimestamp("when").getTime());
                    ret.lastdayloveids.put(rs.getInt("characterid_to"), rs.getTimestamp("when").getTime());
                }
                rs.close();
                ps.close();
                //??????
                ps = con.prepareStatement("SELECT `accid_to`,`when` FROM battlelog WHERE accid = ? AND DATEDIFF(NOW(),`when`) < 30");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                ret.lastmonthbattleids = new ArrayList<>();
                while (rs.next()) {
                    ret.lastmonthbattleids.add(rs.getInt("accid_to"));
                }
                rs.close();
                ps.close();
                //????????????????????????????????????
                ps = con.prepareStatement("SELECT `itemId` FROM extendedSlots WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.extendedSlots.add(rs.getInt("itemId"));
                }
                rs.close();
                ps.close();
                //??????????????????
                ret.buddylist.loadFromDb(charid);
                //??????????????????
                ret.storage = MapleStorage.loadOrCreateFromDB(ret.accountid);
                //??????????????????
                ret.cs = new CashShop(ret.accountid, charid, ret.getJob());
                //??????????????????
                ps = con.prepareStatement("SELECT sn FROM wishlist WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int i = 0;
                while (rs.next()) {
                    ret.wishlist[i] = rs.getInt("sn");
                    i++;
                }
                while (i < 12) {
                    ret.wishlist[i] = 0;
                    i++;
                }
                rs.close();
                ps.close();
                //???????????????????????????
                ps = con.prepareStatement("SELECT mapid,vip FROM trocklocations WHERE characterid = ? LIMIT 28");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int r = 0;
                int reg = 0;
                int hyper = 0;
                while (rs.next()) {
                    if (rs.getInt("vip") == 0) {
                        ret.regrocks[reg] = rs.getInt("mapid");
                        reg++;
                    } else if (rs.getInt("vip") == 1) {
                        ret.rocks[r] = rs.getInt("mapid");
                        r++;
                    } else if (rs.getInt("vip") == 2) {
                        ret.hyperrocks[hyper] = rs.getInt("mapid");
                        hyper++;
                    }
                }
                while (reg < 5) {
                    ret.regrocks[reg] = 999999999;
                    reg++;
                }
                while (r < 10) {
                    ret.rocks[r] = 999999999;
                    r++;
                }
                while (hyper < 13) {
                    ret.hyperrocks[hyper] = 999999999;
                    hyper++;
                }
                rs.close();
                ps.close();
                //????????????????????????
                ps = con.prepareStatement("SELECT * FROM imps WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                r = 0;
                while (rs.next()) {
                    ret.imps[r] = new MapleImp(rs.getInt("itemid"));
                    ret.imps[r].setLevel(rs.getByte("level"));
                    ret.imps[r].setState(rs.getByte("state"));
                    ret.imps[r].setCloseness(rs.getShort("closeness"));
                    ret.imps[r].setFullness(rs.getShort("fullness"));
                    r++;
                }
                rs.close();
                ps.close();
                //??????????????????
                ps = con.prepareStatement("SELECT * FROM mountdata WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    throw new RuntimeException("????????????????????????????????????????????????...");
                }
                Item mount = ret.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18);
                ret.mount = new MapleMount(ret, mount != null ? mount.getItemId() : 0, 80001000, rs.getByte("Fatigue"), rs.getByte("Level"), rs.getInt("Exp"));
                ps.close();
                rs.close();
                //?????????????????????
                ps = con.prepareStatement("SELECT * FROM character_potionpots WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (rs.next()) {
                    ret.potionPot = new MaplePotionPot(charid, rs.getInt("itemId"), rs.getInt("hp"), rs.getInt("mp"), rs.getInt("maxValue"), rs.getLong("startDate"), rs.getLong("endDate"));
                }
                ps.close();
                rs.close();
                //??????????????????
                if (ret.getSkillLevel(????????????.???????????????) > 0 && JobConstants.is????????????(ret.job)) { //0001214 - ??????????????? - ?????????????????????????????????????????????\n#c??????#???????????????????????????????????????????????????#c????????????#????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    ret.coreAura = MapleCoreAura.loadFromDb(charid, ret.level);
                    if (ret.coreAura == null) { //?????????????????? ?????????1?????????????????????
                        ret.coreAura = MapleCoreAura.createCoreAura(charid, ret.level);
                    }
                } else if (ret.getSkillTeachId(80001151) > 0) { //80001151 - ??????????????? - ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    ret.coreAura = MapleCoreAura.loadFromDb(ret.getSkillTeachId(80001151));
                }
                //?????????????????????
                ps = con.prepareStatement("SELECT * FROM character_credit WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.credit.put(rs.getString("name"), rs.getInt("value"));
                }
                ps.close();
                rs.close();
                /**
                 * ??????????????????
                 */
                ps = con.prepareStatement("SELECT * FROM effectswitch WHERE `characterid` = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.effectSwitch.add(rs.getInt("pos"));
                }
                ps.close();
                rs.close();
                // ?????????????????????
                ret.stats.recalcLocalStats(true, ret);
            } else { // ?????????????????????
                for (Pair<Item, MapleInventoryType> mit : ItemLoader.????????????.loadItems(true, charid).values()) {
                    ret.getInventory(mit.getRight()).addFromDB(mit.getLeft());
                }
                ret.stats.recalcPVPRank(ret);
            }
        } catch (SQLException ess) {
            System.out.println("??????????????????????????????...");
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, ess);
            ret.getClient().getSession().close(true);
            throw new RuntimeException("??????????????????????????????.???????????????????????????...");
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {
            }
        }
        return ret;
    }

    /*
     * ???????????????????????????
     */
    public static void saveNewCharToDB(MapleCharacter chr, JobType type, short db, boolean oldkey) {
        Connection con = DatabaseConnection.getConnection();

        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
            con.setAutoCommit(false);

            ps = con.prepareStatement("INSERT INTO characters (level, str, dex, luk, `int`, hp, mp, maxhp, maxmp, sp, ap, skincolor, gender, job, hair, face, map, meso, party, buddyCapacity, pets, decorate, subcategory, friendshippoints, accountid, name, world) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", DatabaseConnection.RETURN_GENERATED_KEYS);
            int index = 0;
            ps.setInt(++index, chr.level); // Level
            PlayerStats stat = chr.stats;
            ps.setInt(++index, stat.getStr()); // Str
            ps.setInt(++index, stat.getDex()); // Dex
            ps.setInt(++index, stat.getInt()); // Int
            ps.setInt(++index, stat.getLuk()); // Luk
            ps.setInt(++index, stat.getHp()); // Hp
            ps.setInt(++index, stat.getMp()); // Mp
            ps.setInt(++index, stat.getMaxHp()); // maxHp
            ps.setInt(++index, stat.getMaxMp()); // maxMp
            StringBuilder sps = new StringBuilder();
            for (int i = 0; i < chr.remainingSp.length; i++) {
                sps.append(chr.remainingSp[i]);
                sps.append(",");
            }
            String sp = sps.toString();
            ps.setString(++index, sp.substring(0, sp.length() - 1));
            ps.setShort(++index, chr.remainingAp); // Remaining AP

            ps.setByte(++index, chr.skinColor);
            ps.setByte(++index, chr.gender);
            ps.setShort(++index, chr.job);
            ps.setInt(++index, chr.hair);
            ps.setInt(++index, chr.face);
            if (db < 0 || db > 10) { //todo legend
                db = 0;
            }
            ps.setInt(++index, ServerConfig.BEGINNER_SPAWN_MAP); //??????????????????
            ps.setLong(++index, chr.meso.get()); // Meso ??????
            ps.setInt(++index, -1); // Party
            ps.setByte(++index, chr.buddylist.getCapacity()); // Buddylist
            ps.setString(++index, "-1,-1,-1");
            ps.setInt(++index, chr.decorate);
            ps.setInt(++index, db); //for now
            ps.setString(++index, chr.friendshippoints[0] + "," + chr.friendshippoints[1] + "," + chr.friendshippoints[2] + "," + chr.friendshippoints[3] + "," + chr.friendshippoints[4]);
            ps.setInt(++index, chr.getAccountID());
            ps.setString(++index, chr.name);
            ps.setByte(++index, chr.world);
            ps.executeUpdate();

            rs = ps.getGeneratedKeys();
            if (rs.next()) {
                chr.id = rs.getInt(1);
            } else {
                ps.close();
                rs.close();
                throw new DatabaseException("?????????????????????????????????...");
            }
            ps.close();
            rs.close();
            /*
             * ??????????????????????????????
             */
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", DatabaseConnection.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (MapleQuestStatus q : chr.quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.execute();
                rs = ps.getGeneratedKeys();
                if (q.hasMobKills()) {
                    rs.next();
                    for (int mob : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob);
                        pse.setInt(3, q.getMobKills(mob));
                        pse.execute();
                    }
                }
                rs.close();
            }
            ps.close();
            pse.close();
            /*
             * ????????????????????????????????????
             */
            ps = con.prepareStatement("INSERT INTO character_keyvalue (`characterid`, `key`, `value`) VALUES (?, ?, ?)");
            ps.setInt(1, chr.id);
            for (Entry<String, String> key : chr.keyValue.entrySet()) {
                ps.setString(2, key.getKey());
                ps.setString(3, key.getValue());
                ps.execute();
            }
            ps.close();
            /*
             * ?????????????????????
             */
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel, expiration, teachId) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (Entry<Skill, SkillEntry> skill : chr.skills.entrySet()) {
                if (GameConstants.isApplicableSkill(skill.getKey().getId())) { //do not save additional skills
                    ps.setInt(2, skill.getKey().getId());
                    ps.setInt(3, skill.getValue().skillevel);
                    ps.setByte(4, skill.getValue().masterlevel);
                    ps.setLong(5, skill.getValue().expiration);
                    ps.setInt(6, skill.getValue().teachId);
                    ps.execute();
                }
            }
            ps.close();
            /*
             * ????????????????????????????????????
             */
            ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setByte(2, (byte) 32); // Eq
            ps.setByte(3, (byte) 32); // Use
            ps.setByte(4, (byte) 32); // Setup
            ps.setByte(5, (byte) 32); // ETC
            ps.setByte(6, (byte) 60); // Cash
            ps.execute();
            ps.close();
            /*
             * ??????????????????????????????
             */
            ps = con.prepareStatement("INSERT INTO mountdata (characterid, `Level`, `Exp`, `Fatigue`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setByte(2, (byte) 1);
            ps.setInt(3, 0);
            ps.setByte(4, (byte) 0);
            ps.execute();
            ps.close();
            /*
             * ????????????????????????????????????
             */
            //???????????????
            int[] array1 = {2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 31, 33, 34, 35, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50, 51, 52, 56, 57, 59, 60, 61, 62, 63, 64, 65};
            int[] array2 = {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6};
            int[] array3 = {10, 12, 13, 18, 23, 28, 8, 5, 0, 4, 27, 30, 32, 1, 24, 19, 14, 15, 52, 2, 25, 17, 11, 3, 20, 26, 16, 22, 9, 50, 51, 6, 31, 29, 7, 33, 35, 53, 54, 100, 101, 102, 103, 104, 105, 106};
            //??????????????????
            int[] new_array1 = {20, 21, 22, 23, 24, 25, 26, 27, 29, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 50, 52, 56, 57, 59, 60, 61, 63, 64, 65, 66, 71, 73, 79, 81, 82, 83};
            int[] new_array2 = {4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 4};
            int[] new_array3 = {27, 30, 0, 1, 24, 19, 14, 15, 52, 17, 11, 8, 3, 20, 26, 16, 22, 9, 50, 51, 2, 31, 29, 5, 7, 4, 53, 54, 100, 101, 102, 103, 104, 105, 106, 12, 13, 23, 28, 10, 18};

            ps = con.prepareStatement("INSERT INTO keymap (characterid, `key`, `type`, `action`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            int keylength = oldkey ? array1.length : new_array1.length;
            for (int i = 0; i < keylength; i++) {
                ps.setInt(2, oldkey ? array1[i] : new_array1[i]);
                ps.setInt(3, oldkey ? array2[i] : new_array2[i]);
                ps.setInt(4, oldkey ? array3[i] : new_array3[i]);
                ps.execute();
            }
            ps.close();

            List<Pair<Item, MapleInventoryType>> itemsWithType = new ArrayList<>();
            for (MapleInventory iv : chr.inventory) {
                for (Item item : iv.list()) {
                    itemsWithType.add(new Pair<>(item, iv.getType()));
                }
            }
            ItemLoader.????????????.saveItems(itemsWithType, chr.id);
            con.commit();
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
            System.err.println("[charsave] Error saving character data");
            try {
                con.rollback();
            } catch (SQLException ex) {
                FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, ex);
                System.err.println("[charsave] Error Rolling Back");
            }
        } finally {
            try {
                if (pse != null) {
                    pse.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
                con.setAutoCommit(true);
                con.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
            } catch (SQLException e) {
                FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
                System.err.println("[charsave] Error going back to autocommit mode");
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void saveToDB(boolean dc, boolean fromcs) {
        if (isSaveing) {
            log.info(MapleClient.getLogMessage(this, "???????????????????????????????????????."));
            return;
        }
        Connection con = DatabaseConnection.getConnection();

        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;

        try {
            isSaveing = true;
            con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
            con.setAutoCommit(false);

            ps = con.prepareStatement("UPDATE characters SET level = ?, fame = ?, str = ?, dex = ?, luk = ?, `int` = ?, exp = ?, hp = ?, mp = ?, maxhp = ?, maxmp = ?, sp = ?, ap = ?, gm = ?, skincolor = ?, gender = ?, job = ?, hair = ?, face = ?, map = ?, meso = ?, hpApUsed = ?, spawnpoint = ?, party = ?, buddyCapacity = ?, pets = ?, subcategory = ?, marriageId = ?, currentrep = ?, totalrep = ?, gachexp = ?, fatigue = ?, charm = ?, charisma = ?, craft = ?, insight = ?, sense = ?, will = ?, totalwins = ?, totallosses = ?, pvpExp = ?, pvpPoints = ?, decorate = ?, beans = ?, warning = ?, dollars = ?, sharelots = ?, reborns = ?, reborns1 = ?, reborns2 = ?, reborns3 = ?, apstorage = ?, honorLevel = ?, honorExp = ?, love = ?, playerPoints = ?, playerEnergy = ?, pvpDeaths = ?, pvpKills = ?, pvpVictory = ?, vip = ?, viptime = ?, todayonlinetime = ?, totalonlinetime = ?, friendshiptoadd = ?, friendshippoints = ?, name = ?, wp = ? WHERE id = ?", DatabaseConnection.RETURN_GENERATED_KEYS);
            int index = 0;
            ps.setInt(++index, level);
            ps.setInt(++index, fame);
            ps.setShort(++index, stats.getStr());
            ps.setShort(++index, stats.getDex());
            ps.setShort(++index, stats.getLuk());
            ps.setShort(++index, stats.getInt());
            ps.setLong(++index, level >= getMaxLevelForSever() ? 0 : Math.abs(exp.get()));
            ps.setInt(++index, stats.getHp() < 1 ? 50 : stats.getHp());
            ps.setInt(++index, stats.getMp());
            ps.setInt(++index, stats.getMaxHp());
            ps.setInt(++index, stats.getMaxMp());
            StringBuilder sps = new StringBuilder();
            for (int i = 0; i < remainingSp.length; i++) {
                sps.append(remainingSp[i]);
                sps.append(",");
            }
            String sp = sps.toString();
            ps.setString(++index, sp.substring(0, sp.length() - 1));
            ps.setShort(++index, remainingAp);
            ps.setByte(++index, gmLevel);
            ps.setByte(++index, skinColor);
            ps.setByte(++index, gender);
            ps.setShort(++index, job);
            ps.setInt(++index, hair);
            ps.setInt(++index, face);
            if (!fromcs && map != null) {
                if (map.getForcedReturnId() != 999999999 && map.getForcedReturnMap() != null) {
                    mapid = map.getForcedReturnId();
                } else {
                    mapid = stats.getHp() < 1 ? map.getReturnMapId() : map.getId();
                }
            }
            ps.setInt(++index, GameConstants.getOverrideReturnMap(mapid));
            ps.setLong(++index, meso.get());
            ps.setShort(++index, hpApUsed);
            if (map == null) {
                ps.setByte(++index, (byte) 0);
            } else {
                MaplePortal closest = map.findClosestSpawnpoint(getTruePosition());
                ps.setByte(++index, (byte) (closest != null ? closest.getId() : 0));
            }
            ps.setInt(++index, party == null ? -1 : party.getPartyId());
            ps.setShort(++index, buddylist.getCapacity());
            StringBuilder petz = new StringBuilder();
            for (int i = 0; i < 3; i++) {
                if (spawnPets[i] != null && spawnPets[i].getSummoned()) {
                    spawnPets[i].saveToDb();
                    petz.append(spawnPets[i].getInventoryPosition());
                    petz.append(",");
                } else {
                    petz.append("-1,");
                }
            }
            String petstring = petz.toString();
            ps.setString(++index, petstring.substring(0, petstring.length() - 1));
            ps.setByte(++index, subcategory);
            ps.setInt(++index, marriageId);
            ps.setInt(++index, currentrep);
            ps.setInt(++index, totalrep);
            ps.setInt(++index, gachexp);
            ps.setShort(++index, fatigue);
            ps.setInt(++index, traits.get(MapleTraitType.charm).getTotalExp());
            ps.setInt(++index, traits.get(MapleTraitType.charisma).getTotalExp());
            ps.setInt(++index, traits.get(MapleTraitType.craft).getTotalExp());
            ps.setInt(++index, traits.get(MapleTraitType.insight).getTotalExp());
            ps.setInt(++index, traits.get(MapleTraitType.sense).getTotalExp());
            ps.setInt(++index, traits.get(MapleTraitType.will).getTotalExp());
            ps.setInt(++index, totalWins);
            ps.setInt(++index, totalLosses);
            ps.setInt(++index, pvpExp);
            ps.setInt(++index, pvpPoints);
            // ????????????
            ps.setInt(++index, decorate);
            // ????????????
            ps.setInt(++index, beans);
            // ????????????
            ps.setInt(++index, warning);
            // ????????????
            ps.setInt(++index, dollars);
            ps.setInt(++index, shareLots);
            // ????????????
            ps.setInt(++index, reborns);
            ps.setInt(++index, reborns1);
            ps.setInt(++index, reborns2);
            ps.setInt(++index, reborns3);
            ps.setInt(++index, apstorage);
            // ????????????
            ps.setInt(++index, honorLevel);
            ps.setInt(++index, honorExp);
            // ?????????
            ps.setInt(++index, love);
            // ????????????
            ps.setInt(++index, playerPoints);
            ps.setInt(++index, playerEnergy);
            // Pvp??????
            ps.setInt(++index, pvpDeaths);
            ps.setInt(++index, pvpKills);
            ps.setInt(++index, pvpVictory);
            // Vip ????????????
            ps.setInt(++index, vip);
            ps.setTimestamp(++index, getViptime() == null ? null : getViptime());
            ps.setInt(++index, todayonlinetime + (int) ((System.currentTimeMillis() - todayonlinetimestamp.getTime()) / 60000));
            ps.setInt(++index, totalonlinetime + (int) ((System.currentTimeMillis() - todayonlinetimestamp.getTime()) / 60000));
            ps.setInt(++index, friendshiptoadd);
            ps.setString(++index, friendshippoints[0] + "," + friendshippoints[1] + "," + friendshippoints[2] + "," + friendshippoints[3] + "," + friendshippoints[4]);
            // ?????????????????????ID
            ps.setString(++index, name);
            ps.setInt(++index, weaponPoint);
            ps.setInt(++index, id);
            if (ps.executeUpdate() < 1) {
                ps.close();
                throw new DatabaseException("Character not in database (" + id + ")");
            }
            ps.close();
            /*
             * ?????????????????????
             */
            if (changed_skillmacros) {
                deleteWhereCharacterId(con, "DELETE FROM skillmacros WHERE characterid = ?");
                for (int i = 0; i < 5; i++) {
                    SkillMacro macro = skillMacros[i];
                    if (macro != null) {
                        ps = con.prepareStatement("INSERT INTO skillmacros (characterid, skill1, skill2, skill3, name, shout, position) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, id);
                        ps.setInt(2, macro.getSkill1());
                        ps.setInt(3, macro.getSkill2());
                        ps.setInt(4, macro.getSkill3());
                        ps.setString(5, macro.getName());
                        ps.setInt(6, macro.getShout());
                        ps.setInt(7, i);
                        ps.execute();
                        ps.close();
                    }
                }
            }
            if (changed_pokemon) {
                ps = con.prepareStatement("DELETE FROM pokemon WHERE characterid = ? OR (accountid = ? AND active = 0)");
                ps.setInt(1, id);
                ps.setInt(2, accountid);
                ps.execute();
                ps.close();
                ps = con.prepareStatement("INSERT INTO pokemon (characterid, level, exp, monsterid, name, nature, active, accountid, itemid, gender, hpiv, atkiv, defiv, spatkiv, spdefiv, speediv, evaiv, acciv, ability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                for (int i = 0; i < battlers.length; i++) {
                    Battler macro = battlers[i];
                    if (macro != null) {
                        ps.setInt(1, id);
                        ps.setInt(2, macro.getLevel());
                        ps.setInt(3, macro.getExp());
                        ps.setInt(4, macro.getMonsterId());
                        ps.setString(5, macro.getName());
                        ps.setInt(6, macro.getNature().ordinal());
                        ps.setInt(7, 1);
                        ps.setInt(8, accountid);
                        ps.setInt(9, macro.getItem() == null ? 0 : macro.getItem().id);
                        ps.setByte(10, macro.getGender());
                        ps.setByte(11, macro.getIV(PokemonStat.HP));
                        ps.setByte(12, macro.getIV(PokemonStat.ATK));
                        ps.setByte(13, macro.getIV(PokemonStat.DEF));
                        ps.setByte(14, macro.getIV(PokemonStat.SPATK));
                        ps.setByte(15, macro.getIV(PokemonStat.SPDEF));
                        ps.setByte(16, macro.getIV(PokemonStat.SPEED));
                        ps.setByte(17, macro.getIV(PokemonStat.EVA));
                        ps.setByte(18, macro.getIV(PokemonStat.ACC));
                        ps.setByte(19, macro.getAbilityIndex());
                        ps.execute();
                    }
                }
                for (Battler macro : boxed) {
                    ps.setInt(1, id);
                    ps.setInt(2, macro.getLevel());
                    ps.setInt(3, macro.getExp());
                    ps.setInt(4, macro.getMonsterId());
                    ps.setString(5, macro.getName());
                    ps.setInt(6, macro.getNature().ordinal());
                    ps.setInt(7, 0);
                    ps.setInt(8, accountid);
                    ps.setInt(9, macro.getItem() == null ? 0 : macro.getItem().id);
                    ps.setByte(10, macro.getGender());
                    ps.setByte(11, macro.getIV(PokemonStat.HP));
                    ps.setByte(12, macro.getIV(PokemonStat.ATK));
                    ps.setByte(13, macro.getIV(PokemonStat.DEF));
                    ps.setByte(14, macro.getIV(PokemonStat.SPATK));
                    ps.setByte(15, macro.getIV(PokemonStat.SPDEF));
                    ps.setByte(16, macro.getIV(PokemonStat.SPEED));
                    ps.setByte(17, macro.getIV(PokemonStat.EVA));
                    ps.setByte(18, macro.getIV(PokemonStat.ACC));
                    ps.setByte(19, macro.getAbilityIndex());
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ??????????????????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM inventoryslot WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, id);
            ps.setByte(2, getInventory(MapleInventoryType.EQUIP).getSlotLimit());
            ps.setByte(3, getInventory(MapleInventoryType.USE).getSlotLimit());
            ps.setByte(4, getInventory(MapleInventoryType.SETUP).getSlotLimit());
            ps.setByte(5, getInventory(MapleInventoryType.ETC).getSlotLimit());
            ps.setByte(6, getInventory(MapleInventoryType.CASH).getSlotLimit());
            ps.execute();
            ps.close();
            /*
             * ??????????????????
             */
            List<Pair<Item, MapleInventoryType>> itemsWithType = new ArrayList<>();
            for (MapleInventory iv : inventory) {
                for (Item item : iv.list()) {
                    itemsWithType.add(new Pair<>(item, iv.getType()));
                }
            }
            ItemLoader.????????????.saveItems(itemsWithType, id);
            /*
             * ???????????????????????????????????????
             */
            if (changed_keyValue) {
                deleteWhereCharacterId(con, "DELETE FROM character_keyvalue WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO character_keyvalue (`characterid`, `key`, `value`) VALUES (?, ?, ?)");
                ps.setInt(1, id);
                for (Entry<String, String> key : keyValue.entrySet()) {
                    ps.setString(2, key.getKey());
                    ps.setString(3, key.getValue());
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ??????????????????
             */
            if (changed_questinfo) {
                deleteWhereCharacterId(con, "DELETE FROM questinfo WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO questinfo (`accountid`, `characterid`, `quest`, `customData`) VALUES (?, ?, ?, ?)");
                ps.setInt(1, accountid);
                ps.setInt(2, id);
                for (Entry<Integer, String> q : questinfo.entrySet()) {
                    ps.setInt(3, q.getKey());
                    ps.setString(4, q.getValue());
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ????????????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", DatabaseConnection.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, id);
            for (MapleQuestStatus q : quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.execute();
                rs = ps.getGeneratedKeys();
                if (q.hasMobKills()) {
                    rs.next();
                    for (int mob : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob);
                        pse.setInt(3, q.getMobKills(mob));
                        pse.execute();
                    }
                }
                rs.close();
            }
            ps.close();
            pse.close();
            /*
             * ????????????????????????
             */
            if (changed_skills) {
                deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel, expiration, teachId, position) VALUES (?, ?, ?, ?, ?, ?, ?)");
                ps.setInt(1, id);
                for (Entry<Skill, SkillEntry> skill : skills.entrySet()) {
                    if (GameConstants.isApplicableSkill(skill.getKey().getId())) { //do not save additional skills
                        ps.setInt(2, skill.getKey().getId());
                        ps.setInt(3, skill.getValue().skillevel);
                        ps.setByte(4, skill.getValue().masterlevel);
                        ps.setLong(5, skill.getValue().expiration);
                        ps.setInt(6, skill.getValue().teachId);
                        ps.setByte(7, skill.getValue().position);
                        ps.execute();
                    }
                }
                ps.close();
            }
            /*
             * ??????????????????????????????
             */
            if (changed_innerSkills) {
                deleteWhereCharacterId(con, "DELETE FROM innerskills WHERE characterid = ?");
                for (int i = 0; i < 3; i++) {
                    InnerSkillEntry InnerSkill = innerSkills[i];
                    if (InnerSkill != null) {
                        ps = con.prepareStatement("INSERT INTO innerskills (characterid, skillid, skilllevel, position, rank) VALUES (?, ?, ?, ?, ?)");
                        ps.setInt(1, id);
                        ps.setInt(2, InnerSkill.getSkillId());
                        ps.setInt(3, InnerSkill.getSkillLevel());
                        ps.setByte(4, InnerSkill.getPosition());
                        ps.setByte(5, InnerSkill.getRank());
                        ps.execute();
                        ps.close();
                    }
                }
            }
            /*
             * ??????????????????????????????
             */
            List<MapleCoolDownValueHolder> coolDownInfo = getCooldowns();
            if (dc && coolDownInfo.size() > 0) {
                ps = con.prepareStatement("INSERT INTO skills_cooldowns (charid, SkillID, StartTime, length) VALUES (?, ?, ?, ?)");
                ps.setInt(1, getId());
                for (MapleCoolDownValueHolder cooling : coolDownInfo) {
                    ps.setInt(2, cooling.skillId);
                    ps.setLong(3, cooling.startTime);
                    ps.setLong(4, cooling.length);
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ???????????????????????????
             */
            if (changed_savedlocations) {
                deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO savedlocations (characterid, `locationtype`, `map`) VALUES (?, ?, ?)");
                ps.setInt(1, id);
                for (SavedLocationType savedLocationType : SavedLocationType.values()) {
                    if (savedLocations[savedLocationType.getValue()] != -1) {
                        ps.setInt(2, savedLocationType.getValue());
                        ps.setInt(3, savedLocations[savedLocationType.getValue()]);
                        ps.execute();
                    }
                }
                ps.close();
            }
            /*
             * ??????????????????
             */
            if (changed_achievements) {
                ps = con.prepareStatement("DELETE FROM achievements WHERE accountid = ?");
                ps.setInt(1, accountid);
                ps.executeUpdate();
                ps.close();
                ps = con.prepareStatement("INSERT INTO achievements(charid, achievementid, accountid) VALUES(?, ?, ?)");
                for (Integer achid : finishedAchievements) {
                    ps.setInt(1, id);
                    ps.setInt(2, achid);
                    ps.setInt(3, accountid);
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ??????????????????????????????
             */
            if (changed_reports) {
                deleteWhereCharacterId(con, "DELETE FROM reports WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO reports VALUES(DEFAULT, ?, ?, ?)");
                for (Entry<ReportType, Integer> achid : reports.entrySet()) {
                    ps.setInt(1, id);
                    ps.setByte(2, achid.getKey().i);
                    ps.setInt(3, achid.getValue());
                    ps.execute();
                }
                ps.close();
            }
            /*
             * ??????????????????
             */
            if (buddylist.changed()) {
                deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `pending`) VALUES (?, ?, ?)");
                ps.setInt(1, id);
                for (BuddylistEntry entry : buddylist.getBuddies()) {
                    ps.setInt(2, entry.getCharacterId());
                    ps.setInt(3, entry.isVisible() ? 5 : 7);
                    ps.execute();
                }
                ps.close();
                buddylist.setChanged(false);
            }
            /*
             * ????????????????????????
             */
            ps = con.prepareStatement("UPDATE accounts SET `points` = ?, `vpoints` = ? WHERE id = ?");
            ps.setInt(1, points);
            ps.setInt(2, vpoints);
            ps.setInt(3, client.getAccID());
            ps.executeUpdate();
            ps.close();
            /*
             * ??????????????????
             */
            if (storage != null) {
                storage.saveToDB();
            }
            /*
             * ??????????????????
             */
            if (cs != null) {
                cs.save();
            }
            PlayerNPC.updateByCharId(this);
            /*
             * ????????????????????????
             */
            keylayout.saveKeys(id);
            /*
             * ??????QuickSlot????????????
             */
            quickslot.saveQuickSlots(id);
            /*
             * ??????????????????
             */
            mount.saveMount(id);
            /*
             * ??????????????????
             */
            if (android != null) {
                android.saveToDb();
            }
            /*
             * ?????????????????????
             */
            monsterbook.saveCards(accountid);
            /*
             * ??????Pvp????????????
             */
            pvpStats.saveToDb(accountid);
            /*
             * ?????????????????????
             */
            if (potionPot != null) {
                potionPot.saveToDb();
            }
            /*
             * ??????????????????
             */
            if (coreAura != null && coreAura.getId() == id) {
                coreAura.saveToDb();
            }
            /*
             * ????????????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM familiars WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO familiars (characterid, expiry, name, fatigue, vitality, familiar) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, id);
            for (MonsterFamiliar f : familiars.values()) {
                ps.setLong(2, f.getExpiry());
                ps.setString(3, f.getName());
                ps.setInt(4, f.getFatigue());
                ps.setByte(5, f.getVitality());
                ps.setInt(6, f.getFamiliar());
                ps.executeUpdate();
            }
            ps.close();
            /*
             * ????????????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM imps WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO imps (characterid, itemid, closeness, fullness, state, level) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, id);
            for (int i = 0; i < imps.length; i++) {
                if (imps[i] != null) {
                    ps.setInt(2, imps[i].getItemId());
                    ps.setShort(3, imps[i].getCloseness());
                    ps.setShort(4, imps[i].getFullness());
                    ps.setByte(5, imps[i].getState());
                    ps.setByte(6, imps[i].getLevel());
                    ps.executeUpdate();
                }
            }
            ps.close();
            /*
             * ??????????????????
             */
            if (changed_wishlist) {
                deleteWhereCharacterId(con, "DELETE FROM wishlist WHERE characterid = ?");
                for (int i = 0; i < getWishlistSize(); i++) {
                    ps = con.prepareStatement("INSERT INTO wishlist(characterid, sn) VALUES(?, ?) ");
                    ps.setInt(1, getId());
                    ps.setInt(2, wishlist[i]);
                    ps.executeUpdate();
                    ps.close();
                }
            }
            /*
             * ?????????????????????
             */
            if (changed_trocklocations) {
                /*
                 * rocks = new int[10];
                 * regrocks = new int[5];
                 * hyperrocks = new int[13];
                 */
                deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?");
                for (int i = 0; i < regrocks.length; i++) {
                    if (regrocks[i] != 999999999) {
                        ps = con.prepareStatement("INSERT INTO trocklocations(characterid, mapid, vip) VALUES (?, ?, 0)");
                        ps.setInt(1, getId());
                        ps.setInt(2, regrocks[i]);
                        ps.executeUpdate();
                        ps.close();
                    }
                }
                for (int i = 0; i < rocks.length; i++) {
                    if (rocks[i] != 999999999) {
                        ps = con.prepareStatement("INSERT INTO trocklocations(characterid, mapid, vip) VALUES (?, ?, 1)");
                        ps.setInt(1, getId());
                        ps.setInt(2, rocks[i]);
                        ps.executeUpdate();
                        ps.close();
                    }
                }
                for (int i = 0; i < hyperrocks.length; i++) {
                    if (hyperrocks[i] != 999999999) {
                        ps = con.prepareStatement("INSERT INTO trocklocations(characterid, mapid, vip) VALUES (?, ?, 2)");
                        ps.setInt(1, getId());
                        ps.setInt(2, hyperrocks[i]);
                        ps.executeUpdate();
                        ps.close();
                    }
                }
            }
            /*
             * ????????????????????????
             */
            if (changed_extendedSlots) {
                deleteWhereCharacterId(con, "DELETE FROM extendedSlots WHERE characterid = ?");
                for (int i : extendedSlots) {
                    if (getInventory(MapleInventoryType.ETC).findById(i) != null) { //just in case
                        ps = con.prepareStatement("INSERT INTO extendedSlots(characterid, itemId) VALUES(?, ?) ");
                        ps.setInt(1, getId());
                        ps.setInt(2, i);
                        ps.executeUpdate();
                        ps.close();
                    }
                }
            }
            /*
             * ???????????????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM character_credit WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO character_credit(characterid, name, value) VALUES(?, ?, ?)");
            for (Entry<String, Integer> i : credit.entrySet()) {
                ps.setInt(1, getId());
                ps.setString(2, i.getKey());
                ps.setInt(3, i.getValue());
                ps.executeUpdate();
            }
            ps.close();
            /**
             * ??????????????????
             */
            deleteWhereCharacterId(con, "DELETE FROM effectswitch WHERE `characterid` = ?");
            ps = con.prepareStatement("INSERT INTO effectswitch (characterid, pos) VALUES (?, ?)");
            for (Integer effect : effectSwitch) {
                ps.setInt(1, getId());
                ps.setInt(2, effect);
                ps.executeUpdate();
            }
            ps.close();
            isSaveing = false;
            changed_wishlist = false;
            changed_trocklocations = false;
            changed_skillmacros = false;
            changed_savedlocations = false;
            changed_pokemon = false;
            changed_questinfo = false;
            changed_achievements = false;
            changed_extendedSlots = false;
            changed_skills = false;
            changed_reports = false;
            changed_keyValue = false;
            con.commit();
        } catch (SQLException | DatabaseException e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
            log.error(MapleClient.getLogMessage(this, "[charsave] ?????????????????????????????? .") + e);
            try {
                con.rollback();
            } catch (SQLException ex) {
                FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, ex);
                log.error(MapleClient.getLogMessage(this, "[charsave] Error Rolling Back") + ex);
            }
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (pse != null) {
                    pse.close();
                }
                if (rs != null) {
                    rs.close();
                }
                con.setAutoCommit(true);
                con.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
            } catch (SQLException e) {
                FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
                log.error(MapleClient.getLogMessage(this, "[charsave] Error going back to autocommit mode") + e);
            }
        }
    }

    private void deleteWhereCharacterId(Connection con, String sql) throws SQLException {
        deleteWhereCharacterId(con, sql, id);
    }

    public static void deleteWhereCharacterId(Connection con, String sql, int id) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public static void deleteWhereCharacterId_NoLock(Connection con, String sql, int id) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.execute();
        ps.close();
    }

    public final int[] getFriendShipPoints() {
        return friendshippoints;
    }

    public final void setFriendShipPoints(int joejoe, int hermoninny, int littledragon, int ika, int Wooden) {
        this.friendshippoints[0] = joejoe;
        this.friendshippoints[1] = hermoninny;
        this.friendshippoints[2] = littledragon;
        this.friendshippoints[3] = ika;
        this.friendshippoints[4] = Wooden;
    }

    public final int getFriendShipToAdd() {
        return friendshiptoadd;
    }

    public final void setFriendShipToAdd(int points) {
        this.friendshiptoadd = points;
    }

    public final void addFriendShipToAdd(int points) {
        this.friendshiptoadd += points;
    }

    /*
     * ???????????????????????????
     */
    public PlayerStats getStat() {
        return stats;
    }

    /*
     * ?????????????????????????????????
     */
    public PlayerSpecialStats getSpecialStat() {
        return specialStats;
    }

    /*
     * ????????????
     */
    public void cancelMapTimeLimitTask() {
        if (mapTimeLimitTask != null) {
            mapTimeLimitTask.cancel(false);
            mapTimeLimitTask = null;
        }
    }

    public void startMapTimeLimitTask(int time, final MapleMap to) {
        if (time <= 0) { //jail
            time = 1;
        }
        cancelMapTimeLimitTask();
        client.getSession().write(MaplePacketCreator.getClock(time));
        final MapleMap ourMap = getMap();
        time *= 1000;
        mapTimeLimitTask = MapTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                if (ourMap.getId() == GameConstants.JAIL) {
                    getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_TIME)).setCustomData(String.valueOf(System.currentTimeMillis()));
                    getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST)).setCustomData("0"); //release them!
                }
                changeMap(to, to.getPortal(0));
            }
        }, time, time);
    }

    public void setTouchedRune(int type) {
        touchedrune = type;
    }

    public int getTouchedRune() {
        return touchedrune;
    }

    public long getRuneTimeStamp() {
        return Long.parseLong(getKeyValue("LastTouchedRune"));
    }

    public void setRuneTimeStamp(long time) {
        setKeyValue("LastTouchedRune", String.valueOf(time));
    }

    /*
     * ??????????????????????????????
     */
    public Map<String, String> getKeyValue_Map() {
        return keyValue;
    }

    public String getKeyValue(String key) {
        if (keyValue.containsKey(key)) {
            return keyValue.get(key);
        }
        return null;
    }

    public void setKeyValue(String key, String values) {
        keyValue.put(key, values);
        changed_keyValue = true;
    }

    /*
     * ????????????
     */
    public void updateInfoQuest(int questid, String data) {
        updateInfoQuest(questid, data, true);
    }

    public void updateInfoQuest(int questid, String data, boolean show) {
        questinfo.put(questid, data);
        changed_questinfo = true;
        if (show) {
            client.getSession().write(MaplePacketCreator.updateInfoQuest(questid, data));
        }
    }

    public void removeInfoQuest(int questid) {
        if (questinfo.containsKey(questid)) {
            questinfo.remove(questid);
            changed_questinfo = true;
        }
    }

    public String getInfoQuest(int questid) {
        if (questinfo.containsKey(questid)) {
            return questinfo.get(questid);
        }
        return "";
    }

    public String getInfoQuestStatS(int id, String stat) {
        String info = getInfoQuest(id);
        if (info != null && info.length() > 0 && info.contains(stat)) {
            int startIndex = info.indexOf(stat) + stat.length() + 1;
            int until = info.indexOf(";", startIndex);
            return info.substring(startIndex, until != -1 ? until : info.length());
        }
        return "";
    }

    public int getInfoQuestStat(int id, String stat) {
        String statz = getInfoQuestStatS(id, stat);
        return (statz == null || "".equals(statz)) ? 0 : Integer.parseInt(statz);
    }

    public void setInfoQuestStat(int id, String stat, int statData) {
        setInfoQuestStat(id, stat, statData);
    }

    public void setInfoQuestStat(int id, String stat, String statData) {
        String info = getInfoQuest(id);
        if (info.length() == 0 || !info.contains(stat)) {
            updateInfoQuest(id, stat + "=" + statData + (info.length() == 0 ? "" : ";") + info);
        } else {
            String newInfo = stat + "=" + statData;
            String beforeStat = info.substring(0, info.indexOf(stat));
            int from = info.indexOf(";", info.indexOf(stat) + stat.length());
            String afterStat = from == -1 ? "" : info.substring(from + 1);
            updateInfoQuest(id, beforeStat + newInfo + (afterStat.length() != 0 ? (";" + afterStat) : ""));
        }
    }

    /*
     * ????????????ID????????????????????????????????? ????????????
     */
    public boolean containsInfoQuest(int questid, String data) {
        if (questinfo.containsKey(questid)) {
            return questinfo.get(questid).contains(data);
        }
        return false;
    }

    public int getNumQuest() {
        int i = 0;
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 2 && !(q.isCustom())) {
                i++;
            }
        }
        return i;
    }

    public byte getQuestStatus(int questId) {
        MapleQuest qq = MapleQuest.getInstance(questId);
        if (getQuestNoAdd(qq) == null) {
            return 0;
        }
        return getQuestNoAdd(qq).getStatus();
    }

    public MapleQuestStatus getQuest(MapleQuest quest) {
        if (!quests.containsKey(quest)) {
            return new MapleQuestStatus(quest, (byte) 0);
        }
        return quests.get(quest);
    }

    public boolean needQuestItem(int questId, int itemId) {
        if (questId <= 0) {
            return true;
        }
        MapleQuest quest = MapleQuest.getInstance(questId);
        return getInventory(ItemConstants.getInventoryType(itemId)).countById(itemId) < quest.getAmountofItems(itemId);
    }

    public void setQuestAdd(MapleQuest quest, byte status, String customData) {
        if (!quests.containsKey(quest)) {
            MapleQuestStatus stat = new MapleQuestStatus(quest, status);
            stat.setCustomData(customData);
            quests.put(quest, stat);
        }
    }

    public MapleQuestStatus getQuestNAdd(MapleQuest quest) {
        if (!quests.containsKey(quest)) {
            MapleQuestStatus status = new MapleQuestStatus(quest, (byte) 0);
            quests.put(quest, status);
            return status;
        }
        return quests.get(quest);
    }

    public MapleQuestStatus getQuestNoAdd(MapleQuest quest) {
        return quests.get(quest);
    }

    public MapleQuestStatus getQuestRemove(MapleQuest quest) {
        return quests.remove(quest);
    }

    /*
     * ??????????????????
     */
    public void updateQuest(MapleQuestStatus quest) {
        updateQuest(quest, false);
    }

    public void updateQuest(MapleQuestStatus quest, boolean update) {
        quests.put(quest.getQuest(), quest);
        if (!quest.isCustom()) { //????????????ID?????? 99999 ?????????????????????????????????
            client.getSession().write(MaplePacketCreator.updateQuest(quest));
            if (quest.getStatus() == 1 && !update) {
                client.getSession().write(MaplePacketCreator.updateQuestInfo(quest.getQuest().getId(), quest.getNpc(), 0, quest.getStatus() == 1));
            }
        }
    }

    public Map<Integer, String> getInfoQuest_Map() {
        return questinfo;
    }

    public Map<MapleQuest, MapleQuestStatus> getQuest_Map() {
        return quests;
    }

    /*
     * ????????????
     */
    public void startFishingTask() {
        if (FishingConfig.FISHING_ENABLE) {
            cancelFishingTask();
            lastFishingTime = System.currentTimeMillis();
            int fishingTime = isGM() ? FishingConfig.FISHING_TIME_GM : (stats.canFishVIP ? FishingConfig.FISHING_TIME_VIP : FishingConfig.FISHING_TIME);
            this.dropMessage(-1, "?????????????????????????????????????????????" + (fishingTime / 1000) + "??????");
            this.dropMessage(-11, "?????????????????????????????????????????????" + (fishingTime / 1000) + "??????");
        }
    }

    public boolean canFish(long now) {
        if (!FishingConfig.FISHING_ENABLE) {
            return false;
        }
        int fishingTime = isGM() ? FishingConfig.FISHING_TIME_GM : (stats.canFishVIP ? FishingConfig.FISHING_TIME_VIP : FishingConfig.FISHING_TIME);
        return lastFishingTime > 0 && lastFishingTime + fishingTime < now;
    }

    public void doFish(long now) {
        lastFishingTime = now;
        boolean expMulti = haveItem(2300001, 1, false, true); //????????????
        if (client == null || client.getPlayer() == null || !client.isReceiving() || !GameConstants.isFishingMap(getMapId()) || !stats.canFish) {
            cancelFishingTask();
            return;
        }
        if (!expMulti && !haveItem(2300000, 1, false, true)) {
            cancelFishingTask();
            dropSpouseMessage(0x19, "[????????????] ?????????????????????????????????");
            return;
        }
        if (chair <= 0) {
            cancelFishingTask();
            dropSpouseMessage(0x19, "[????????????] ???????????????????????????????????????");
            return;
        }
        //???????????????
        MapleInventoryManipulator.removeById(client, MapleInventoryType.USE, expMulti ? 2300001 : 2300000, 1, false, false);
        //?????????????????????
        int chance = isGM() ? FishingConfig.FISHING_CHANCE_GM : (stats.canFishVIP ? FishingConfig.FISHING_CHANCE_VIP : FishingConfig.FISHING_CHANCE);
        if (Randomizer.nextInt(100) > chance) {
            dropSpouseMessage(0x19, "[????????????] ???????????????????????????????????????");
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        RewardDropEntry drop = RandomRewardService.getInstance().getReward(expMulti ? 2300001 : 2300000);
        if (drop == null || !ii.itemExists(drop.itemId)) {
            boolean expReward = Randomizer.nextBoolean();
            if (expReward) {
                //????????????
                int experi = Math.min(Randomizer.nextInt(Math.max(1, (int) Math.abs(getExpNeededForLevel() / 250))), 300000);
                gainExp(expMulti ? (experi * 3 / 2) : experi, true, true, true);
            } else {
                //????????????
                int money = Randomizer.rand(expMulti ? 9000 : 6000, expMulti ? 75000 : 50000);
                gainMeso(money, true);
            }
            return;
        }
        if (!MapleInventoryManipulator.checkSpace(client, drop.itemId, 1, "")) {
            cancelFishingTask();
            dropSpouseMessage(0x19, "[????????????] ???????????????????????????????????????");
            return;
        }
        Item item;
        if (ItemConstants.getInventoryType(drop.itemId) == MapleInventoryType.EQUIP) {
            item = ii.randomizeStats((Equip) ii.getEquipById(drop.itemId));
            if (drop.state > 0) {
                ii.setOptentialState((Equip) item, drop.state);
            }
            if (drop.period > 0) {
                item.setExpiration(System.currentTimeMillis() + drop.period * 24 * 60 * 60 * 1000);
            }
            item.setGMLog("???????????? ?????? " + FileoutputUtil.CurrentReadable_Date());
            MapleInventoryManipulator.addbyItem(client, item);
        } else {
            item = new Item(drop.itemId, (byte) 0, (short) 1, (byte) 0);
            MapleInventoryManipulator.addById(client, drop.itemId, (short) 1, "???????????? ?????? " + FileoutputUtil.CurrentReadable_Date());
        }
        if (drop.msgType == 1 || drop.msgType == 2 || drop.msgType == 3) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(getName(), " : ????????????{" + ii.getName(item.getItemId()) + "}????????????????????????????????????????????????", item, drop.msgType, client.getChannel()));
        } else {
            this.dropMessage(5, "[????????????] ?????? " + ii.getName(item.getItemId()));
        }
        //map.broadcastMessage(UIPacket.fishingCaught(id));
    }

    public void cancelFishingTask() {
        lastFishingTime = 0;
    }

    /*
     * buff????????????
     */
    public MaplePlayerBuffManager getBuffManager() {
        return buffManager;
    }

    public ArrayList<Pair<MapleBuffStat, MapleBuffStatValueHolder>> getAllEffects() {
        return new ArrayList<>(effects);
    }

    public MapleBuffStatValueHolder getBuffStatValueHolder(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = null;
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            if (buffs == null) {
                continue;
            }
            if (buffs.getLeft() == stat) {
                mbsvh = buffs.getRight();
            }
        }
        return mbsvh;
    }

    public boolean isActiveBuffedValue(int skillid) {
        return buffManager.isActiveBuffedValue(skillid) && !isGM();
    }

    public Integer getBuffedValueNew(MapleBuffStat effect) {
        return buffManager.getBuffedValue(effect);
    }

    public Integer getBuffedValue(MapleBuffStat stat) {
        if (stat.canStack()) {
            int value = 0;
            boolean find = false;
            for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
                if (buffs.getLeft() == stat) {
                    find = true;
                    value += buffs.getRight().value;
                }
            }
            return find ? value : null;
        } else {
            MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
            if (mbsvh == null) {
                return null;
            }
            return mbsvh.value;
        }
    }

    public int getBuffedIntValue(MapleBuffStat stat) {
        if (stat.canStack()) {
            int value = 0;
            for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
                if (buffs.getLeft() == stat) {
                    value += buffs.getRight().value;
                }
            }
            return value;
        } else {
            MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
            if (mbsvh == null) {
                return 0;
            }
            return mbsvh.value;
        }
    }

    public Integer getBuffedSkill_X(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect.getX();
    }

    public Integer getBuffedSkill_Y(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect.getY();
    }

    public boolean isBuffFromNew(MapleBuffStat stat, Skill skill) {
        return buffManager.isBuffFrom(stat, skill.getId());
    }

    public boolean isBuffFrom(MapleBuffStat stat, Skill skill) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null || mbsvh.effect == null || skill == null) {
            return false;
        }
        return mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skill.getId();
    }

    public boolean hasBuffSkill(int skillId) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        boolean find = false;
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillId) {
                find = true;
                break;
            }
        }
        allBuffs.clear();
        return find;
    }

    public int getBuffSourceNew(MapleBuffStat stat) {
        return buffManager.getBuffSource(stat);
    }

    public int getBuffSource(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return -1;
        }
        return mbsvh.effect.getSourceId();
    }

    public List<MapleStatEffect> getBuffEffects() {
        return buffManager.getBuffEffects();
    }

    public int getTrueBuffSource(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return -1;
        }
        return (mbsvh.effect.isSkill() ? mbsvh.effect.getSourceId() : -mbsvh.effect.getSourceId());
    }

    public void setBuffedValueNew(MapleBuffStat effect, int value) {
        buffManager.setBuffedValue(effect, value);
    }

    public void setBuffedValue(MapleBuffStat stat, int value) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return;
        }
        mbsvh.value = value;
    }

    public void setSchedule(MapleBuffStat stat, ScheduledFuture<?> sched) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return;
        }
        mbsvh.schedule.cancel(false);
        mbsvh.schedule = sched;
    }

    public Long getBuffedStartTimeNew(MapleBuffStat effect) {
        return buffManager.getBuffedStarttime(effect);
    }

    public Long getBuffedStartTime(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.startTime;
    }

    public MapleStatEffect getStatForBuffNew(MapleBuffStat effect) {
        return buffManager.getStatForBuff(effect);
    }

    public MapleStatEffect getStatForBuff(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect;
    }

    /*
     * ?????????????????????BUFF????????????
     */
    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule, List<Pair<MapleBuffStat, Integer>> stat) {
        if (effect.is?????????()) {
            map.broadcastMessage(this, MaplePacketCreator.removePlayerFromMap(getId()), false);
        } else if (effect.is?????????()) {
            prepareDragonBlood();
        } else if (effect.is????????????()) {
            prepareRecovery();
        } else if (effect.is??????????????????()) {
            checkBerserk();
        } else if (effect.is????????????_()) {
            getMount().startSchedule();
        } else if (effect.is????????????()) {
            prepareRecoveryEM();
        }
        buffManager.registerEffect(effect, starttime, schedule, stat);
        stats.recalcLocalStats(this);
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule, int from) {
        registerEffect(effect, starttime, schedule, effect.getStatups(), false, effect.getDuration(), from);
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule, List<Pair<MapleBuffStat, Integer>> statups, boolean silent, int localDuration, int from) {
        if (effect.is?????????()) {
            map.broadcastMessage(this, MaplePacketCreator.removePlayerFromMap(getId()), false);
        } else if (effect.is?????????()) {
            prepareDragonBlood();
        } else if (effect.is????????????()) {
            prepareRecovery();
        } else if (effect.is??????????????????()) {
            checkBerserk();
        } else if (effect.is????????????_()) {
            getMount().startSchedule();
        } else if (effect.is????????????()) {
            prepareRecoveryEM();
        }
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            int value = statup.getRight();
            effects.add(new Pair<>(statup.getLeft(), new MapleBuffStatValueHolder(effect, starttime, schedule, value, localDuration, from)));
        }
        if (!silent && !effect.is????????????()) { //???????????????????????????????????????BUFF ??????????????????????????? ??????????????????????????????????????????????????????
            stats.recalcLocalStats(this);
        }
        if (isShowPacket()) {
            dropSpouseMessage(0x19, "??????BUFF?????? - ??????BUFF??????: " + effects.size() + " ??????: " + effect.getSourceId());
        }
    }

    /**
     * ????????????BUFF??????
     */
    public void checkPartyEffect() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
    }

    private List<MapleBuffStat> getBuffStatsNew(MapleStatEffect effect, long startTime) {
        return buffManager.getBuffStats(effect, startTime);
    }

    public List<MapleBuffStat> getBuffStats(MapleStatEffect effect, long startTime) {
        List<MapleBuffStat> ret = new ArrayList();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> stateffect : getAllEffects()) {
            MapleBuffStatValueHolder mbsvh = stateffect.getRight();
            if (mbsvh.effect.sameSource(effect) && (startTime == -1 || startTime == mbsvh.startTime)) { //|| stateffect.getLeft().canStack()
                ret.add(stateffect.getLeft());
            }
        }
        return ret;
    }

    /*
     * ???????????????BUFF ????????????????????????
     */
    public List<SpecialBuffInfo> getSpecialBuffInfo(MapleBuffStat stat) {
        List<SpecialBuffInfo> ret = new ArrayList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> stateffect : getAllEffects()) {
            MapleBuffStatValueHolder mbsvh = stateffect.getRight();
            int skillId = mbsvh.effect.getSourceId();
            if (stateffect.getLeft() == stat) {
                ret.add(new SpecialBuffInfo(mbsvh.effect.isSkill() ? skillId : -skillId, mbsvh.value, mbsvh.localDuration, mbsvh.startTime));
            }
        }
        return ret;
    }

    /*
     * ???????????????BUFF ????????????????????????
     */
    public List<SpecialBuffInfo> getSpecialBuffInfo(MapleBuffStat stat, int buffid, int value, int bufflength) {
        List<SpecialBuffInfo> ret = new ArrayList<>();
        long time = System.currentTimeMillis();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> stateffect : getAllEffects()) {
            MapleBuffStatValueHolder mbsvh = stateffect.getRight();
            int skillId = mbsvh.effect.getSourceId();
            if (stateffect.getLeft() == stat && skillId != Math.abs(buffid)) { //????????????
                ret.add(new SpecialBuffInfo(mbsvh.effect.isSkill() ? skillId : -skillId, mbsvh.value, mbsvh.localDuration, mbsvh.startTime));
            }
        }
        ret.add(new SpecialBuffInfo(buffid, value, bufflength, time)); //????????????
        return ret;
    }

    /*
     * ?????????????????????BUFF????????????
     */
    private void deregisterBuffStats(List<MapleBuffStat> stats, MapleStatEffect effect, boolean overwrite) {
        int effectSize = effects.size();
        ArrayList<Pair<MapleBuffStat, MapleBuffStatValueHolder>> effectsToRemove = new ArrayList<>();
        for (MapleBuffStat stat : stats) {
            for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
                if (buffs.getLeft() == stat && (effect == null || buffs.getRight().effect.sameSource(effect))) {
                    effectsToRemove.add(buffs);
                    MapleBuffStatValueHolder mbsvh = buffs.getRight();
                    if (stat == MapleBuffStat.????????? || stat == MapleBuffStat.???????????? || stat == MapleBuffStat.DAMAGE_BUFF || stat == MapleBuffStat.?????? || stat == MapleBuffStat.????????????????????? || stat == MapleBuffStat.????????????) {
                        int summonId = mbsvh.effect.getSourceId();
                        List<MapleSummon> toRemove = new ArrayList<>();
                        visibleMapObjectsLock.writeLock().lock();
                        summonsLock.writeLock().lock();
                        try {
                            for (MapleSummon summon : summons) {
                                if (summon.getSkillId() == summonId || ((summonId == 86 || summonId == 88 || summonId == 91) && summon.getSkillId() == summonId + 999) || ((summonId == 1085 || summonId == 1087 || summonId == 1090) && summon.getSkillId() == summonId - 999)) {
                                    map.broadcastMessage(SummonPacket.removeSummon(summon, overwrite));
                                    map.removeMapObject(summon);
                                    visibleMapObjects.remove(summon);
                                    toRemove.add(summon);
                                }
                            }
                            for (MapleSummon ss : toRemove) {
                                summons.remove(ss);
                            }
                        } finally {
                            summonsLock.writeLock().unlock();
                            visibleMapObjectsLock.writeLock().unlock();
                        }
                        if (summonId == ?????????.????????? || summonId == ??????.?????????) {
                            cancelEffectFromBuffStat(MapleBuffStat.????????????);
                        }
                    } else if (stat == MapleBuffStat.?????????) {
                        lastDragonBloodTime = 0;
                    } else if (stat == MapleBuffStat.???????????? || mbsvh.effect.getSourceId() == ?????????.????????????_??????) {
                        lastRecoveryTime = 0;
                    } else if (stat == MapleBuffStat.???????????? || stat == MapleBuffStat.???????????????) {
                        linkMobs.clear();
                    } else if (stat == MapleBuffStat.????????????) {
                        lastRecoveryTimeEM = 0;
                    } else if (stat == MapleBuffStat.??????) {
                        this.setBuffedValue(stat, 0);
                    }
                }
            }
        }
        int toRemoveSize = effectsToRemove.size();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> toRemove : effectsToRemove) {
            if (effects.contains(toRemove)) {
                if (toRemove.getRight().schedule != null) {
                    toRemove.getRight().schedule.cancel(false);
                    toRemove.getRight().schedule = null;
                }
                effects.remove(toRemove);
            }
        }
        effectsToRemove.clear();
        boolean ok = (effectSize - effects.size() == toRemoveSize);
        if (isShowPacket()) {
            dropSpouseMessage(0x14, "???????????????BUFF?????? - ??????BUFF??????: " + effectSize + " ??????BUFF?????? " + effects.size() + " ?????????BUFF??????: " + toRemoveSize + " ????????????: " + ok);
        }
        if (!ok) {
            FileoutputUtil.log("??????BUFF??????.txt", this.getName() + " - " + this.getJob() + " ??????BUFF???????????? ??????ID: " + (effect != null ? effect.getSourceId() : "???"), true);
        }
    }

    /**
     * @param effect
     * @param overwrite ??????????????????BUFF ???????????????????????????????????? ???????????? MapleBuffStat ??????????????????BUFF?????????
     * @param startTime
     */
    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime) {
        if (effect == null) {
            return;
        }
        cancelEffect(effect, overwrite, startTime, effect.getStatups());
    }

    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime, List<Pair<MapleBuffStat, Integer>> statups) {
        if (effect == null) {
            return;
        }
        List<MapleBuffStat> buffstats;
        if (!overwrite) { //??????????????????BUFF??????
            buffstats = getBuffStats(effect, startTime);
        } else {
//            if (effect.is????????????() && getBuffedValue(MapleBuffStat.?????????) != null) {
//                return;
//            }
            buffstats = new ArrayList<>(statups.size());
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                buffstats.add(statup.getLeft());
            }
        }
        if (ServerProperties.ShowPacket()) {
            log.info("????????????BUFF: - buffstats.size() " + buffstats.size());
        }
        if (buffstats.size() <= 0) {
            if (effect.is????????????()) {
                cancelEffectFromBuffStat(MapleBuffStat.????????????);
            }
            return;
        }
        if (ServerProperties.ShowPacket()) {
            log.info("??????????????????BUFF: - 1");
        }
        if (effect.is????????????() && getBuffedValue(MapleBuffStat.????????????) != null) {
            int duration = Math.max(effect.getDuration(), effect.alchemistModifyVal(this, effect.getDuration(), false));
            long start = getBuffedStartTime(MapleBuffStat.????????????);
            duration += (int) ((start - System.currentTimeMillis()));
            if (duration > 0) {
                int neworbcount = getBuffedValue(MapleBuffStat.????????????) + effect.getDamage();
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, neworbcount));
                setBuffedValue(MapleBuffStat.????????????, neworbcount);
                client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), duration, stat, effect, this));
                addHP((int) (effect.getHpR() * this.stats.getCurrentMaxHp()));
                addMP((int) (effect.getMpR() * this.stats.getCurrentMaxMp(this.getJob())));
                setSchedule(MapleBuffStat.????????????, BuffTimer.getInstance().schedule(new CancelEffectAction(this, effect, start, stat), effect.alchemistModifyVal(this, 4000, false)));
                return;
            }
        }
        //???????????????BUFF??????
        deregisterBuffStats(buffstats, effect, overwrite);
        if (effect.is?????????()) {
            if (!getDoors().isEmpty()) {
                removeDoor();
                silentPartyUpdate();
            }
        } else if (effect.is???????????????()) {
            if (!getMechDoors().isEmpty()) {
                removeMechDoor();
            }
        } else if (effect.is????????????_()) {
            getMount().cancelSchedule();
        } else if (effect.is????????????()) {
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
        } else if (effect.is???????????????() && !overwrite) {
            aranCombo = 0;
        } else if (effect.is????????????() && !overwrite) {
            cancelEffectFromBuffStat(MapleBuffStat.???????????????);
            SkillFactory.getSkill(??????.??????????????????).getEffect(1).applyTo(this);
        }
        //???????????????BUFF???????????????????????????BUFF?????????
        cancelPlayerBuffs(buffstats, overwrite);
        if (!overwrite) {
            if (effect.is?????????() && client.getChannelServer().getPlayerStorage().getCharacterById(this.getId()) != null) { //Wow this is so fking hacky...
                map.broadcastMessage(this, MaplePacketCreator.spawnPlayerMapobject(this), false);
                map.broadcastMessage(this, EffectPacket.getEffectSwitch(getId(), getEffectSwitch()), true);
            }
        }
//        if (effect.getSourceId() == ?????????.????????????_?????????_4??? && !overwrite) { //when siege 2 deactivates, missile re-activates
//            SkillFactory.getSkill(?????????.????????????_??????).getEffect(getTotalSkillLevel(?????????.????????????_??????)).applyTo(this);
//        }
        if (effect.is????????????() && !overwrite) {
            int skillId = effect.getSourceId() == ??????.??????_?????? ? ??????.???????????? : ??????.??????;
            SkillFactory.getSkill(skillId).getEffect(getSkillLevel(skillId)).applyTo(this);
        } else if (effect.is????????????() || effect.is??????????????????()) {
            if (getBuffedValue(MapleBuffStat.????????????) != null) {
                SkillFactory.getSkill(????????????.????????????).getEffect(getSkillLevel(????????????.????????????)).applyTo(this);
            }
        }
        if (isShowPacket()) {
            dropMessage(5, "??????BUFF?????? - ??????BUFF??????: " + effects.size() + " ??????: " + effect.getSourceId());
        }
    }

    /*
     * ?????????????????? MapleBuffStat ?????????BUFF??????
     */
    public void cancelBuffStats(MapleBuffStat... stat) {
        List<MapleBuffStat> buffStatList = Arrays.asList(stat);
        deregisterBuffStats(buffStatList, null, false);
        cancelPlayerBuffs(buffStatList, false);
    }

    public void checkCancelBuffStat(List<MaplePlayerBuffManager.MapleBuffEffect> list) {
        for (MaplePlayerBuffManager.MapleBuffEffect mbe : list) {
            //add
        }
    }

    /*
     * ???????????????MapleBuffStat ???BUFF??????
     */
    public void cancelEffectFromBuffStatNew(MapleBuffStat stat) {
        MaplePlayerBuffManager.MapleBuff buff = buffManager.getBuff(stat);
        if (buff != null) {
            cancelEffect(buff.getEffect(), false, -1);
        }
    }

    public void cancelEffectFromBuffStat(MapleBuffStat stat) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            if (buffs.getLeft() == stat) {
                allBuffs.add(buffs.getRight());
            }
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, -1);
        }
        allBuffs.clear();
    }

    /*
     * ???????????????MapleBuffStat ???BUFF??????
     */
    public void cancelEffectFromBuffStat(MapleBuffStat stat, int from) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            if (buffs.getLeft() == stat && buffs.getRight().fromChrId == from) {
                allBuffs.add(buffs.getRight());
            }
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, -1);
        }
        allBuffs.clear();
    }

    /*
     * ?????????????????????BUFF????????????
     */
    private void cancelPlayerBuffs(List<MapleBuffStat> buffstats, boolean overwrite) {
        boolean write = client != null && client.getChannelServer() != null && client.getChannelServer().getPlayerStorage().getCharacterById(getId()) != null;
        if (write) {
            if (buffstats.contains(MapleBuffStat.????????????)) {
                client.getSession().write(BuffPacket.cancelBuff(MapleBuffStat.????????????));
                return;
            }
            if (buffstats.contains(MapleBuffStat.?????????)) {
                buffstats.remove(MapleBuffStat.?????????);
                if (buffstats.size() <= 0) {
                    return;
                }
            }
//            if (buffstats.contains(MapleBuffStat.?????????????????????) && getBuffedValue(MapleBuffStat.?????????) != null) {
//                return;
//            }
            if (overwrite) {
                List<MapleBuffStat> buffStatX = new ArrayList<>();
                for (MapleBuffStat stat : buffstats) {
                    if (stat.canStack()) {
                        buffStatX.add(stat);
                    }
                }
                if (buffStatX.size() <= 0 || buffstats.contains(MapleBuffStat.????????????)) {
                    if (isShowPacket()) {
                        dropMessage(5, "??????BUFF?????? - ???????????????");
                    }
                    return; //???????????????????????? ????????????
                } else {
                    buffstats = buffStatX;
                }
            }
            if (isShowPacket()) {
                dropMessage(5, "??????BUFF?????? - ???????????? - ????????????BUFF???: " + overwrite);
            }
            client.getSession().write(BuffPacket.cancelBuff(buffstats, this));
            map.broadcastMessage(this, BuffPacket.cancelForeignBuff(getId(), buffstats), false);
            stats.recalcLocalStats(this);
        }
    }

    /*
     * ??????BUFF??????
     */
    public void dispelNew() {
        buffManager.dispel();
    }

    public void dispel() {
        if (!isHidden()) {
            LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
            for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
                allBuffs.add(buffs.getRight());
            }
            for (MapleBuffStatValueHolder mbsvh : allBuffs) {
                if (mbsvh.effect.isSkill() && mbsvh.schedule != null && !mbsvh.effect.isMorph() && !mbsvh.effect.isGmBuff() && !mbsvh.effect.is????????????() && !mbsvh.effect.is????????????() && !mbsvh.effect.is???????????????() && !mbsvh.effect.is????????????() && !mbsvh.effect.isNotRemoved()) {
                    cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                }
            }
        }
    }

    /*
     * ??????????????????ID???BUFF??????
     */
    public void dispelSkillNew(int skillid) {
        buffManager.dispelSkill(skillid);
    }

    public void dispelSkill(int skillId) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillId) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    /*
     * ????????????ID?????????BUFF??????
     */
    public void dispelBuffByJobId(int jobId) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() / 10000 == jobId) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    /*
     * ?????????????????????
     */
    public void dispelSummons() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.getSummonMovementType() != null) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    /*
     * ??????????????????????????????
     */
    public void dispelSummons(int skillId) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.getSummonMovementType() != null && mbsvh.effect.getSourceId() == skillId) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    /*
     * ??????????????????ID???BUFF??????
     */
    public void dispelBuff(int buffId) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.getSourceId() == buffId) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    /*
     * ???????????????BUFF????????????
     */
    public void cancelAllBuffs_() {
        effects.clear();
        cannelAutoCelebrityCrit();
    }

    /*
     * ???????????????BUFF????????????
     */
    public void cancelAllBuffsNew() {
        buffManager.cancelAllBuffs();
    }

    public void cancelAllBuffs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    /*
     * ?????????????????????BUFF????????????
     */
    public void cancelMorphsNew() {
        buffManager.cancelMorphs();
    }

    public void cancelMorphs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            switch (mbsvh.effect.getSourceId()) {
                case ????????????.????????????_3???:
                case ????????????.????????????_4???:
                case ????????????.????????????_??????:
                    return; // Since we can't have more than 1, save up on loops
                default:
                    if (mbsvh.effect.isMorph()) {
                        cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                        continue;
                    }
            }
        }
    }

    /*
     * ????????????BUFF???????????????ID
     */
    public int getMorphState() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMorph()) {
                return mbsvh.effect.getSourceId();
            }
        }
        return -1;
    }

    /*
     * ??????????????????????????????????????? ?????????BUFF ?????????????????????
     */
    public void silentGiveBuffs(List<PlayerBuffValueHolder> buffs) {
        if (buffs == null) {
            return;
        }
        for (PlayerBuffValueHolder mbsvh : buffs) {
            mbsvh.effect.silentApplyBuff(this, mbsvh.startTime, mbsvh.localDuration, mbsvh.statup, mbsvh.fromChrId);
        }
    }

    public List<PlayerBuffValueHolder> getAllBuffs() {
        List<PlayerBuffValueHolder> ret = new ArrayList<>();
        Map<Pair<Integer, Byte>, Integer> alreadyDone = new HashMap<>(); //???????????????
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> mbsvh : getAllEffects()) {
            Pair<Integer, Byte> key = new Pair<>(mbsvh.getRight().effect.getSourceId(), mbsvh.getRight().effect.getLevel());
            if (alreadyDone.containsKey(key)) {
                ret.get(alreadyDone.get(key)).statup.add(new Pair<>(mbsvh.getLeft(), mbsvh.getRight().value));
            } else {
                alreadyDone.put(key, ret.size());
                ArrayList<Pair<MapleBuffStat, Integer>> list = new ArrayList<>();
                list.add(new Pair<>(mbsvh.getLeft(), mbsvh.getRight().value));
                ret.add(new PlayerBuffValueHolder(mbsvh.getRight().startTime, mbsvh.getRight().effect, list, mbsvh.getRight().localDuration, mbsvh.getRight().fromChrId));
            }
        }
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> mbsvh : getAllEffects()) {
            if (mbsvh.getRight().schedule != null) {
                mbsvh.getRight().schedule.cancel(false);
                mbsvh.getRight().schedule = null;
            }
        }
        return ret;
    }

    /*
     * ???????????????
     */
    public void cancelMagicDoor() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<>();
        for (Pair<MapleBuffStat, MapleBuffStatValueHolder> buffs : getAllEffects()) {
            allBuffs.add(buffs.getRight());
        }
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.is?????????()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    public boolean canDOT(long now) {
        return lastDOTTime > 0 && lastDOTTime + 8000 < now;
    }

    public boolean hasDOT() {
        return dotHP > 0;
    }

    public void doDOT() {
        addHP(-(dotHP * 4));
        dotHP = 0;
        lastDOTTime = 0;
    }

    public void setDOT(int d, int source, int sourceLevel) {
        this.dotHP = d;
        addHP(-(dotHP * 4));
        map.broadcastMessage(MaplePacketCreator.getPVPMist(id, source, sourceLevel, d));
        lastDOTTime = System.currentTimeMillis();
    }

    /*
     * ???????????????
     */
    public void doDragonBlood() {
        MapleStatEffect bloodEffect = getStatForBuff(MapleBuffStat.?????????);
        if (bloodEffect == null) {
            lastDragonBloodTime = 0;
            return;
        }
        prepareDragonBlood();
        if (stats.getHp() - bloodEffect.getStr() <= 1) { //?????????getX() ???x?????????0
            cancelBuffStats(MapleBuffStat.?????????);
        } else {
            addHP(-bloodEffect.getStr()); //?????????getX() ???x?????????0
            client.getSession().write(EffectPacket.showOwnBuffEffect(bloodEffect.getSourceId(), 8, getLevel(), bloodEffect.getLevel()));
            map.broadcastMessage(MapleCharacter.this, EffectPacket.showBuffeffect(getId(), bloodEffect.getSourceId(), 8, getLevel(), bloodEffect.getLevel()), false);
        }
    }

    public boolean canBlood(long now) {
        return lastDragonBloodTime > 0 && lastDragonBloodTime + 4000 < now;
    }

    private void prepareDragonBlood() {
        lastDragonBloodTime = System.currentTimeMillis();
    }

    public void doRecovery() {
        MapleStatEffect bloodEffect = getStatForBuff(MapleBuffStat.????????????);
        if (bloodEffect == null) {
            bloodEffect = getStatForBuff(MapleBuffStat.????????????);
            if (bloodEffect == null) {
                lastRecoveryTime = 0;
            } else if (bloodEffect.getSourceId() == ?????????.????????????_??????) {
                prepareRecovery();
                if (stats.getMp() < bloodEffect.getU()) {
                    cancelEffectFromBuffStat(MapleBuffStat.????????????);
                    cancelEffectFromBuffStat(MapleBuffStat.????????????);
                } else {
                    addMP(-bloodEffect.getU());
                }
            }
        } else {
            prepareRecovery();
            if (stats.getHp() >= stats.getCurrentMaxHp()) {
                cancelEffectFromBuffStat(MapleBuffStat.????????????);
            } else {
                healHP(bloodEffect.getX());
            }
        }
    }

    public boolean canRecover(long now) {
        return lastRecoveryTime > 0 && lastRecoveryTime + 5000 < now;
    }

    private void prepareRecovery() {
        lastRecoveryTime = System.currentTimeMillis();
    }

    /*
     * ??????????????????BUFF??????
     * 10???1???
     */
    public boolean canRepeatEffect(long now) {
        return lastRepeatEffectTime > 0 && lastRepeatEffectTime + 10000 < now;
    }

    /*
     * ???????????????????????????BUFF??????
     */
//    private void prepareRepeatEffect() {
//        lastRepeatEffectTime = System.currentTimeMillis();
//    }
    /**
     * ???????????????????????????BUFF??????
     */
    public void doRepeatEffect() {
        List<MapleBuffStat> checkStat = new ArrayList<>();
        checkStat.add(MapleBuffStat.????????????);
        checkStat.add(MapleBuffStat.????????????);
        boolean find = false;
        for (MapleBuffStat stat : checkStat) {
            MapleBuffStatValueHolder mbsvh = getBuffStatValueHolder(stat);
            if (mbsvh != null) {
                if (mbsvh.fromChrId == getId()) {
                    mbsvh.effect.applyBuffEffect(this, this, true, 180000, true);
                } else {
                    MapleCharacter from = map.getCharacterById(mbsvh.fromChrId);
                    if (from != null && from.getParty() != null && getParty() != null && from.getParty().getPartyId() == getParty().getPartyId()) {
                        mbsvh.effect.applyBuffEffect(from, this, false, 180000, true);
                    } else {
                        cancelEffect(mbsvh.effect, false, -1);
                    }
                }
                find = true;
            }
        }
        if (!find) {
            lastRepeatEffectTime = 0;
        }
    }

    /*
     * ??????????????? ????????????
     */
    public void doRecoveryEM() {
        MapleStatEffect bloodEffect = getStatForBuff(MapleBuffStat.????????????);
        if (bloodEffect == null) {
            lastRecoveryTimeEM = 0;
            return;
        }
        prepareRecoveryEM();
        if (stats.getHp() < stats.getCurrentMaxHp()) {
            healHP(bloodEffect.getX() * (stats.getCurrentMaxHp() / 100));
        }
    }

    public boolean canRecoverEM(long now) {
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (effect == null) {
            lastRecoveryTimeEM = 0;
            return false;
        }
        int time = effect.getY();
        if (time < 4000) {
            time = 4000;
        }
        return lastRecoveryTimeEM > 0 && lastRecoveryTimeEM + time < now;
    }

    private void prepareRecoveryEM() {
        lastRecoveryTimeEM = System.currentTimeMillis();
    }

    /*
     * ??????????????????
     */
    public int getPowerCountByJob() {
        switch (getJob()) {
            case 3610:
                return 10;
            case 3611:
                return 15;
            case 3612:
                return 20;
        }
        return 5;
    }

    public void addPowerCount(int delta) {
        Skill skill = SkillFactory.getSkill(??????.????????????);
        int skilllevel = getTotalSkillLevel(skill);
        if (!JobConstants.is??????(getJob()) || skill == null || skilllevel <= 0) {
            return;
        }
        if (setPowerCount(specialStats.getPowerCount() + delta)) {
            stats.recalcLocalStats(this);
            client.getSession().write(BuffPacket.updatePowerCount(??????.????????????, specialStats.getPowerCount()));
        }
    }

    public boolean setPowerCount(int count) {
        int oldPower = specialStats.getPowerCount();
        int tempPower = count;
        if (tempPower < 0) {
            tempPower = 0;
        }
        if (tempPower > getPowerCountByJob()) {
            tempPower = getPowerCountByJob();
        }
        specialStats.setPowerCount(tempPower);
        return specialStats.getPowerCount() != oldPower;
    }

    public void startPower() {
        if (specialStats.isUsePower()) {
            specialStats.changePower(false);
        } else {
            specialStats.changePower(true);
        }
        client.getSession().write(BuffPacket.startPower(specialStats.isUsePower()));
        client.getSession().write(EffectPacket.showSpecialEffect(specialStats.isUsePower() ? EffectPacket.????????????_?????? : EffectPacket.????????????_??????));//41 ??? 42
    }

    public void doRecoveryPower() {
        if (!JobConstants.is??????(getJob())) {
            return;
        }
        specialStats.prepareRecoveryPowerTime();
        addPowerCount(1);
    }

    public boolean canRecoverPower(long now) {
        Skill skill = SkillFactory.getSkill(??????.????????????);
        int skilllevel = getTotalSkillLevel(skill);
        if (!JobConstants.is??????(getJob()) || skill == null || skilllevel <= 0) {
            return false;
        }
        return specialStats.getLastRecoveryPowerTime() > 0 && specialStats.getLastRecoveryPowerTime() + 4000 < now;
    }

    /*
     * ??????????????????
     */
    public int getEnergyCount() {
        if (getBuffedValue(MapleBuffStat.????????????) == null) {
            return 0;
        }
        return getBuffedValue(MapleBuffStat.????????????);
    }

    public void setEnergyCount(int count) {
        Skill echskill_2 = SkillFactory.getSkill(????????????.????????????);
        if (getSkillLevel(echskill_2) <= 0) {
            return;
        }
        MapleStatEffect effect = echskill_2.getEffect(getTotalSkillLevel(echskill_2));
        if (count > 0 && !specialStats.isEnergyfull()) {
            //????????????????????????????????????BUFF??????
            if (getBuffedValue(MapleBuffStat.????????????) == null) {
                effect.applyEnergyBuff(this, count); // ?????????1???????????????BUFF??????
                return;
            }
            //????????????????????????
            int energy = getBuffedIntValue(MapleBuffStat.????????????); //???????????????????????????
            if (energy < 10000) { //???????????????????????????
                energy += count;
                if (energy >= 10000) {
                    energy = 10000;
                    specialStats.changeEnergyfull(true);
                }
                setBuffedValue(MapleBuffStat.????????????, energy);
                //??????BUFF??????
                client.getSession().write(EffectPacket.showOwnBuffEffect(effect.getSourceId(), 3, getLevel(), effect.getLevel()));
                client.getSession().write(BuffPacket.giveEnergyCharge(energy, effect.getSourceId(), specialStats.isEnergyfull(), false));
                //????????????????????????????????????
                map.broadcastMessage(this, EffectPacket.showBuffeffect(id, effect.getSourceId(), 3, getLevel(), effect.getLevel()), false);
                map.broadcastMessage(this, BuffPacket.showEnergyCharge(id, energy, effect.getSourceId(), specialStats.isEnergyfull(), false), false);
            }
        }
    }

    public void handleEnergyCharge(int targets) {
        handleEnergyCharge(targets, false);
    }

    public void handleEnergyCharge(int targets, boolean is????????????) {
        Skill echskill_2 = SkillFactory.getSkill(????????????.????????????);
        Skill echskill_3 = SkillFactory.getSkill(????????????.????????????);
        Skill echskill_4 = SkillFactory.getSkill(????????????.????????????);
        MapleStatEffect effect;
        if (getSkillLevel(echskill_4) > 0) {
            effect = echskill_4.getEffect(getTotalSkillLevel(echskill_4));
        } else if (getSkillLevel(echskill_3) > 0) {
            effect = echskill_3.getEffect(getTotalSkillLevel(echskill_3));
        } else if (getSkillLevel(echskill_2) > 0) {
            effect = echskill_2.getEffect(getTotalSkillLevel(echskill_2));
        } else {
            return;
        }
        if (targets > 0 && !specialStats.isEnergyfull()) {
            //????????????????????????????????????BUFF??????
            if (getBuffedValue(MapleBuffStat.????????????) == null) {
                if (is????????????) {
                    effect.applyEnergyBuff(this, 11000); // ?????????1???????????????BUFF??????
                } else {
                    effect.applyEnergyBuff(this); // ?????????1???????????????BUFF??????
                }
                return;
            }
            //????????????????????????
            int energy = getBuffedIntValue(MapleBuffStat.????????????); //???????????????????????????
            if (energy < 10000) { //???????????????????????????
                energy += (effect.getX() * targets);
                if (energy >= 10000) {
                    energy = 10000;
                    specialStats.changeEnergyfull(true);
                }
                setBuffedValue(MapleBuffStat.????????????, energy);
                //??????BUFF??????
                client.getSession().write(EffectPacket.showOwnBuffEffect(effect.getSourceId(), 3, getLevel(), effect.getLevel()));
                client.getSession().write(BuffPacket.giveEnergyCharge(energy, effect.getSourceId(), specialStats.isEnergyfull(), false));
                //????????????????????????????????????
                map.broadcastMessage(this, EffectPacket.showBuffeffect(id, effect.getSourceId(), 3, getLevel(), effect.getLevel()), false);
                map.broadcastMessage(this, BuffPacket.showEnergyCharge(id, energy, effect.getSourceId(), specialStats.isEnergyfull(), false), false);
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void handleEnergyConsume(int mobCount, int skillId) {
        //?????????????????????????????????BUFF
        MapleStatEffect echeffect = getStatForBuff(MapleBuffStat.????????????);
        if (skillId == 0 || !specialStats.isEnergyfull() || echeffect == null) {
            return;
        }
        Skill skill = SkillFactory.getSkill(skillId);
        int skillLevel = getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillId));
        MapleStatEffect effect = skill.getEffect(skillLevel);
        if (effect == null || effect.getForceCon() <= 0) {
            return;
        }
        //?????????????????????
        int energy = getBuffedIntValue(MapleBuffStat.????????????);
        energy -= (effect.getForceCon() * mobCount);
        if (energy <= 0) {
            energy = 0;
            specialStats.changeEnergyfull(false);
        }
        setBuffedValue(MapleBuffStat.????????????, energy);
        client.getSession().write(BuffPacket.giveEnergyCharge(energy, echeffect.getSourceId(), specialStats.isEnergyfull(), true));
        map.broadcastMessage(this, BuffPacket.showEnergyCharge(id, energy, echeffect.getSourceId(), specialStats.isEnergyfull(), true), false);
    }

    /*
     * ?????????????????????????????????????????????BUFF??????
     */
    public boolean canPartyPassiveBuff(long now) {
        //??????????????? ??????  ????????????????????????
        if (getJob() != 11212 || !hasBuffSkill(?????????.????????????)) {
            return false;
        }
        if (checkPartyPassiveTime <= 0) {
            checkPartyPassiveTime = System.currentTimeMillis();
        }
        return checkPartyPassiveTime > 0 && checkPartyPassiveTime + 8000 < now;
    }

    /*
     * ???????????????????????????BUFF??????
     */
    public void doPartyPassiveBuff() {
        if (getJob() != 11212) {
            return;
        }
        int[] skilllist = {?????????.??????????????????, ?????????.???????????????, ?????????.????????????, ?????????.???????????????_??????, ?????????.?????????????????????, ?????????.??????????????????};
        Skill skill;
        MapleStatEffect effect;
        for (int i : skilllist) {
            skill = SkillFactory.getSkill(i);
            if (skill != null && getTotalSkillLevel(skill) > 0) {
                effect = skill.getEffect(getTotalSkillLevel(skill));
                if (effect != null) {
                    effect.applyTo(this);
                }
            }
        }
        checkPartyPassiveTime = System.currentTimeMillis();
    }

    /*
     * ??????????????????????????????
     */
    public boolean canRecoverCrit(long now) {
        boolean is?????? = getJob() == 420 || getJob() == 421 || getJob() == 422;
        if (!is??????) {
            lastCritStorageTime = 0;
            return false;
        }
        if (lastCritStorageTime <= 0) {
            lastCritStorageTime = System.currentTimeMillis();
        }
        return lastCritStorageTime > 0 && lastCritStorageTime + 5000 < now;
    }

    /*
     * ????????????
     * ??????????????????
     */
    public void handleCritStorage() {
        if (getJob() != 420 && getJob() != 421 && getJob() != 422) {
            lastCritStorageTime = 0;
            return;
        }
        //??????????????????????????????
        lastCritStorageTime = System.currentTimeMillis();
        //?????????????????????
        Skill critskill_2 = SkillFactory.getSkill(??????.????????????);
        Skill critskill_4 = SkillFactory.getSkill(??????.????????????);
        MapleStatEffect skilleffect;
        if (getSkillLevel(critskill_4) > 0) {
            skilleffect = critskill_4.getEffect(getTotalSkillLevel(critskill_4));
        } else if (getSkillLevel(critskill_2) > 0) {
            skilleffect = critskill_2.getEffect(getTotalSkillLevel(critskill_2));
        } else {
            return;
        }
        MapleBuffStat buffStat = MapleBuffStat.????????????;
        //?????? ?????????BUFF??????  ????????????????????????1??????????????????BUFF??????
        MapleStatEffect effect = getStatForBuff(buffStat);
        if (effect == null || getBuffedValue(buffStat) == null) {
            skilleffect.applyTo(this);
            return;
        }
        //?????????????????????????????????
        int crit = getBuffedIntValue(buffStat);
        int newcrit = crit;
        //???????????????????????????????????????100???
        if (newcrit < 100) {
            newcrit += skilleffect.getX();
            if (newcrit > 100) {
                newcrit = 100;
            }
        }
        //????????????????????????????????????BUFF??????
        if (crit != newcrit) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(buffStat, newcrit));
            setBuffedValue(buffStat, newcrit);
            int duration = effect.getDuration();
            duration += (int) ((getBuffedStartTime(buffStat) - System.currentTimeMillis()));
            client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), duration, stat, effect, this));
        }
    }

    /*
     * ???????????????????????????
     */
    public int getOrbCount() {
        if (getBuffedValue(MapleBuffStat.????????????) == null) {
            return 0;
        }
        return getBuffedValue(MapleBuffStat.????????????);
    }

    /*
     * ????????????????????????
     */
    public void handleOrbgain(boolean passive) {
        //????????????????????????????????????BUFF??????
        if (getBuffedValue(MapleBuffStat.????????????) == null) {
            return;
        }
        //???????????????????????????
        int orbcount = getBuffedValue(MapleBuffStat.????????????);
        Skill combo_2 = SkillFactory.getSkill(??????.????????????);
        Skill combo_3 = SkillFactory.getSkill(??????.????????????);
        Skill combo_4 = SkillFactory.getSkill(??????.????????????);
        if (passive && getTotalSkillLevel(combo_3) <= 0) {
            return;
        }
        MapleStatEffect effect;
        if (getTotalSkillLevel(combo_3) > 0) {
            effect = combo_3.getEffect(getTotalSkillLevel(combo_3));
        } else if (getTotalSkillLevel(combo_2) > 0) {
            effect = combo_2.getEffect(getTotalSkillLevel(combo_2));
        } else {
            return;
        }
        int neworbcount = orbcount;
        if (effect != null && orbcount < effect.getX() + 1) {
            if (!passive && effect.makeChanceResult()) {
                neworbcount++;
            }
            if (passive && Randomizer.nextInt(100) < effect.getSubProp()) {
                neworbcount++;
            }
        }
        //??????????????????????????????1?????????
        if (getTotalSkillLevel(combo_4) > 0 && !passive) {
            effect = combo_4.getEffect(getTotalSkillLevel(combo_4));
            if (effect != null && effect.makeChanceResult() && neworbcount < effect.getX() + 1) {
                neworbcount++;
            }
        }
        if (effect != null) {
            if (neworbcount != orbcount) {
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, neworbcount));
                setBuffedValue(MapleBuffStat.????????????, neworbcount);
                int duration = effect.getDuration();
                duration += (int) ((getBuffedStartTime(MapleBuffStat.????????????) - System.currentTimeMillis()));
                client.getSession().write(BuffPacket.giveBuff(combo_2.getId(), duration, stat, effect, this));
                map.broadcastMessage(this, BuffPacket.giveForeignBuff(getId(), stat, effect), false);
            }
        }
    }

    /*
     * ??????????????????
     */
    public void handleOrbconsume(int howmany) {
        Skill combos = SkillFactory.getSkill(??????.????????????);
        if (getSkillLevel(combos) <= 0) {
            return;
        }
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (effect == null) {
            return;
        }
        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, Math.max(1, getBuffedValue(MapleBuffStat.????????????) - howmany)));
        setBuffedValue(MapleBuffStat.????????????, Math.max(1, getBuffedValue(MapleBuffStat.????????????) - howmany));
        int duration = effect.getDuration();
        duration += (int) ((getBuffedStartTime(MapleBuffStat.????????????) - System.currentTimeMillis()));
        client.getSession().write(BuffPacket.giveBuff(combos.getId(), duration, stat, effect, this));
        map.broadcastMessage(this, BuffPacket.giveForeignBuff(getId(), stat, effect), false);
    }

    /*
     * ?????? ???????????? ?????????
     */
    public void handleArrowsCharge(int oid) {
        Skill skill = SkillFactory.getSkill(?????????.????????????);
        if (getSkillLevel(skill) <= 0) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(getSkillLevel(skill));
        if (effect == null) {
            return;
        }
        int oldMode = specialStats.getArrowsMode();
        int arrows = getBuffedIntValue(MapleBuffStat.????????????);
        //????????????BUFF?????? ???????????????BUFF?????????
        if (getBuffedValue(MapleBuffStat.????????????) == null || oldMode == -1 || arrows == 0) {
            effect.applyArrowsBuff(this, true);
            return;
        }
        int newMode = oldMode;
        if (oldMode == 0 && arrows / 10000 > 0) { //???????????? 10000
            arrows -= 10000;
            if (arrows / 10000 == 0 && arrows % 10000 / 100 > 0) {
                newMode = 1;
            } else if (arrows / 10000 == 0 && arrows % 100 > 0) {
                newMode = 2;
            }
        } else if (oldMode == 1 && arrows % 10000 / 100 > 0) { //???????????? 100
            arrows -= 100;
            if (arrows % 10000 / 100 == 0 && arrows % 100 > 0) {
                newMode = 2;
            } else if (arrows % 10000 / 100 == 0 && arrows / 10000 > 0) {
                newMode = 0;
            }
        } else if (oldMode == 2 && arrows % 100 > 0) { //???????????? 1
            arrows -= 1;
            handle????????????(oid);
            if (arrows % 100 == 0 && arrows / 10000 > 0) {
                newMode = 0;
            } else if (arrows % 100 == 0 && arrows % 10000 / 100 > 0) {
                newMode = 1;
            }
        }
        if (arrows <= 0) {
            effect.applyArrowsBuff(this, true);
        } else if (getBuffedValue(MapleBuffStat.????????????) == null) {
            specialStats.setArrowsMode(newMode);
            List<Pair<MapleBuffStat, Integer>> localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, arrows));
            setBuffedValue(MapleBuffStat.????????????, arrows);
            client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), 2100000000, localstatups, effect, this));
            if (newMode != oldMode) {
                int newArrows = 0x0A;
                if (newMode == 0) {
                    newArrows = arrows / 10000;
                } else if (newMode == 1) {
                    newArrows = arrows % 10000 / 100;
                } else if (newMode == 2) {
                    newArrows = arrows % 100;
                }
                client.getSession().write(EffectPacket.showArrowsEffect(effect.getSourceId(), specialStats.getArrowsMode(), newArrows)); //????????????
            }
        }
    }

    /*
     * ??????????????? ???????????????
     */
    public int getLightTotal() {
        return specialStats.getLightTotal();
    }

    public int getLightType() {
        return specialStats.getLightType();
    }

    public int getDarkTotal() {
        return specialStats.getDarkTotal();
    }

    public int getDarkType() {
        return specialStats.getDarkType();
    }

    /*
     * ???????????? ????????????
     */
    public void handleLuminous(int skillId) {
        int skillMode = GameConstants.getLuminousSkillMode(skillId);
        if (skillMode < 0 || skillMode == ??????.??????_?????? || getSkillLevel(skillMode) <= 0) {
            return;
        }
        boolean isLightSkill = skillMode == ??????.????????????;
        if (isLightSkill) { //????????????
            specialStats.gainLightTotal(Randomizer.nextInt(200) + (isAdmin() ? 5000 : 100));
            if (specialStats.getLightTotal() > 10000) {
                if (specialStats.getLightType() < 5) {
                    specialStats.setLightTotal(0);
                    specialStats.gainLightType(1);
                    if (specialStats.getLightType() > 5) {
                        specialStats.setLightType(5);
                    }
                } else {
                    specialStats.setLightTotal(10000);
                    specialStats.setLightType(5);
                }
            }
        } else { //????????????
            specialStats.gainDarkTotal(Randomizer.nextInt(200) + (isAdmin() ? 5000 : 100));
            if (specialStats.getDarkTotal() > 10000) {
                if (specialStats.getDarkType() < 5) {
                    specialStats.setDarkTotal(0);
                    specialStats.gainDarkType(1);
                    if (specialStats.getDarkType() > 5) {
                        specialStats.setDarkType(5);
                    }
                } else {
                    specialStats.setDarkTotal(10000);
                    specialStats.setDarkType(5);
                }
            }
        }
        //??????????????????
        client.getSession().write(BuffPacket.updateLuminousGauge(this));
        //?????????????????????BUFF??????
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (effect == null) {
            effect = SkillFactory.getSkill(skillMode).getEffect(getSkillLevel(skillMode));
            effect.applyTo(this);
        } else if (effect.getSourceId() == skillMode) {
            //dropSpouseMessage(0x0A, "?????? => ??????Hp: " + ((int) stats.getMaxHp() / 100) + " maxhp: " + stats.getMaxHp());
            addHP(stats.getMaxHp() / 100); //??????1%???hp
        }
    }

    /*
     * ????????????????????????
     */
    public void changeLuminousMode(int skillid) {
        boolean isLightSkill = skillid == ??????.????????????;
        boolean isDarkSkill = skillid == ??????.??????;
        boolean superSkill = skillid == ??????.??????;
        boolean isMix = getLightType() > 0 && getDarkType() > 0 || superSkill; //getLightType() > 0 && getDarkType() > 0 && getLightType() == getDarkType();
        if (!superSkill) {
            if (isLightSkill) {
                specialStats.gainLightType(-1);
            } else if (isDarkSkill) {
                specialStats.gainDarkType(-1);
            } else {
                return;
            }
            if (specialStats.getLightType() < 0 || specialStats.getDarkType() < 0) {
                return;
            }
            client.getSession().write(BuffPacket.updateLuminousGauge(this));
        }
        MapleStatEffect buffEffect = getStatForBuff(MapleBuffStat.????????????);
        if (superSkill && buffEffect == null) {
            MapleStatEffect effect = SkillFactory.getSkill(??????.????????????).getEffect(getSkillLevel(??????.????????????));
            if (effect != null) {
                effect.applyTo(this);
            }
            buffEffect = getStatForBuff(MapleBuffStat.????????????);
        }
        if (isMix && buffEffect != null && !buffEffect.is????????????()) {
            int mixSkillId = buffEffect.getSourceId() == ??????.???????????? ? ??????.??????_?????? : ??????.??????_??????;
            MapleStatEffect effect = SkillFactory.getSkill(mixSkillId).getEffect(getSkillLevel(mixSkillId));
            if (effect != null) {
                effect.applyTo(this);
            }
            removeCooldown(??????.????????????, true);
            removeCooldown(??????.????????????, true);
        } else {
            MapleStatEffect effect = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));
            if (effect != null) {
                effect.applyTo(this);
            }
        }
        if (!superSkill) {
            MapleStatEffect effect = SkillFactory.getSkill(??????.????????????????????????).getEffect(getSkillLevel(??????.????????????????????????));
            addCooldown(??????.????????????????????????, System.currentTimeMillis(), effect.getCooldown(this) * 1000);
            getClient().getSession().write(MaplePacketCreator.skillCooldown(??????.????????????????????????, effect.getCooldown(this)));
        }
    }

    /*
     * ????????????????????????
     */
    public void handleBlackBless() {
        if (lastBlessOfDarknessTime == 0) {
            lastBlessOfDarknessTime = System.currentTimeMillis();
        }
        Skill skill = SkillFactory.getSkill(??????.????????????); //27100003 - ???????????? - ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????1????????????
        int skilllevel = getTotalSkillLevel(skill);
        if (skilllevel <= 0) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(skilllevel);
        if (getStatForBuff(MapleBuffStat.????????????) == null) {
            effect.applyTo(this);
            return;
        }
        if (lastBlessOfDarknessTime + effect.getDuration() < System.currentTimeMillis()) {
            int count = getBuffedValue(MapleBuffStat.????????????);
            if (count < 3) {
                count++;
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, count));
            setBuffedValue(MapleBuffStat.????????????, count);
            int duration = 2100000000;
            client.getSession().write(EffectPacket.showBlessOfDarkness(skill.getId()));
            client.getSession().write(BuffPacket.giveBuff(skill.getId(), duration, stat, effect, this));
            lastBlessOfDarknessTime = System.currentTimeMillis();
        }
    }

    public void handleBlackBlessLost(int howmany) {
        Skill skill = SkillFactory.getSkill(??????.????????????);
        if (getSkillLevel(skill) <= 0) {
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            return;
        }
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (effect == null) {
            return;
        }
        lastBlessOfDarknessTime = System.currentTimeMillis();
        int count = getBuffedValue(MapleBuffStat.????????????);
        count = count - howmany;
        if (count <= 0) {
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
        } else {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, count));
            setBuffedValue(MapleBuffStat.????????????, count);
            int duration = 2100000000;
            client.getSession().write(EffectPacket.showBlessOfDarkness(skill.getId()));
            client.getSession().write(BuffPacket.giveBuff(skill.getId(), duration, stat, effect, this));
        }
    }

    /*
     * ????????????????????????
     */
    public void handleDarkCrescendo() {
        MapleStatEffect dkeffect = getStatForBuff(MapleBuffStat.????????????);
        if (dkeffect != null && dkeffect.getSourceId() == ??????.????????????) { //27121005 - ???????????? - ????????????????????????????????????????????????????????????????????????????????????????????????
            int orbcount = getBuffedValue(MapleBuffStat.????????????);
            Skill skill = SkillFactory.getSkill(??????.????????????);
            if (getSkillLevel(skill) > 0) {
                MapleStatEffect effect = skill.getEffect(getTotalSkillLevel(skill));
                if (orbcount < effect.getX() && effect.makeChanceResult()) {
                    int neworbcount = orbcount + 1;
                    List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, neworbcount));
                    setBuffedValue(MapleBuffStat.????????????, neworbcount);
                    int duration = effect.getDuration();
                    duration += (int) ((getBuffedStartTime(MapleBuffStat.????????????) - System.currentTimeMillis()));
                    client.getSession().write(BuffPacket.giveBuff(skill.getId(), duration, stat, effect, this));
                }
            }
        }
    }

    /*
     * ???????????????????????????
     */
    public boolean canMorphLost(long now) {
        if (getJob() >= 6100 && getJob() <= 6112) {
            return specialStats.getLastMorphLostTime() > 0 && specialStats.getMorphCount() > 0 && specialStats.getLastMorphLostTime() + (20 * 1000) < now;
        }
        return false;
    }

    public void morphLostTask() {
        if (getJob() >= 6100 && getJob() <= 6112) {
            if (specialStats.getMorphCount() > 0) {
                specialStats.gainMorphCount(-1);
                client.getSession().write(BuffPacket.give???????????????(specialStats.getMorphCount()));
            }
            specialStats.prepareMorphLostTime();
        }
    }

    public int getMorphCount() {
        return specialStats.getMorphCount();
    }

    public void setMorphCount(int amount) {
        specialStats.setMorphCount(amount);
        if (specialStats.getMorphCount() <= 0) {
            specialStats.setMorphCount(0);
            client.getSession().write(BuffPacket.cancelBuff(MapleBuffStat.?????????));
        }
    }

    public void handleMorphCharge(int targets) {
        Skill mchskill = SkillFactory.getSkill(????????????.??????);
        int skilllevel = getTotalSkillLevel(mchskill);
        if (skilllevel > 0) {
            MapleStatEffect mcheff = mchskill.getEffect(skilllevel);
            if (targets > 0 && mcheff != null) {
                specialStats.prepareMorphLostTime();
                int maxCount = getJob() == 6100 ? mcheff.getS() : getJob() == 6110 ? mcheff.getU() : mcheff.getV();
                if (specialStats.getMorphCount() < maxCount) {
                    specialStats.gainMorphCount(targets);
                    if (specialStats.getMorphCount() >= maxCount) {
                        specialStats.setMorphCount(maxCount);
                    }
                    client.getSession().write(BuffPacket.give???????????????(specialStats.getMorphCount()));
                    if (isAdmin()) {
                        map.broadcastMessage(this, BuffPacket.show???????????????(getId(), specialStats.getMorphCount()), false);
                    }
                }
            }
        }
    }

    public void handleDeathPact(int moboid, boolean attackBoss) {
        if (getBuffStatValueHolder(MapleBuffStat.????????????) == null) {
            return;
        }
        int skills_[] = {????????????.????????????3, ????????????.????????????2, ????????????.????????????, ????????????.??????};
        MapleStatEffect effect = null;
        for (int skillid_ : skills_) {
            if (this.getSkillLevel(skillid_) > 0) {
                effect = SkillFactory.getSkill(skillid_).getEffect(1);
                break;
            }
        }
        MapleMonster mob = getMap().getMonsterByOid(moboid);
        if (effect == null || mob == null) {
            return;
        }
        MapleSummon summon = getSummonBySkill(effect.getSourceId());
        if (summon == null) {
            return;
        }
        int maxCount = effect.getX() - (hasBuffSkill(????????????.????????????) ? 3 : 0);
        int currentCount = getSpecialStat().getDeathPactCount();
        if (currentCount < maxCount) {
            getSpecialStat().setDeathPactCount(Math.min(currentCount + (attackBoss && mob.isBoss() ? 2 : 1), maxCount));
        } else {
            if (summon.checkLastAttackTime()) {
                getSpecialStat().setDeathPactCount(0);
                getMap().broadcastMessage(SummonPacket.summonSkillLink(id, summon.getObjectId()), getTruePosition());
            }
        }
        List<Pair<MapleBuffStat, Integer>> localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, getSpecialStat().getDeathPactCount()));
        setBuffedValue(MapleBuffStat.????????????, getSpecialStat().getDeathPactCount());
        client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), 2100000000, localstatups, effect, this));
    }

    //???????????? ????????????
    public void handlerKSTelekinesis(int oid) {
        Skill skill = SkillFactory.getSkill(????????????.????????????);
        int skilllevel = getSkillLevel(????????????.????????????);
        if (skilllevel > 0) {
            MapleStatEffect effect = skill.getEffect(skilllevel);
            if (effect != null && Randomizer.nextInt(100) < effect.getProp()) {
                specialStats.gainCardStack();
                getMap().broadcastMessage(MaplePacketCreator.????????????????????????(getId(), oid, ????????????.????????????, specialStats.getCardStack()), getTruePosition());
            }
        }
    }

    public void silentEnforceMaxHpMp() {
        stats.setMp(stats.getMp(), this);
        stats.setHp(stats.getHp(), true, this);
    }

    public void enforceMaxHpMp() {
        List<Pair<MapleStat, Long>> statup = new ArrayList<>(2);
        if (stats.getMp() > stats.getCurrentMaxMp(this.getJob())) {
            stats.setMp(stats.getMp(), this);
            statup.add(new Pair<>(MapleStat.MP, (long) stats.getMp()));
        }
        if (stats.getHp() > stats.getCurrentMaxHp()) {
            stats.setHp(stats.getHp(), this);
            statup.add(new Pair<>(MapleStat.HP, (long) stats.getHp()));
        }
        if (statup.size() > 0) {
            client.getSession().write(MaplePacketCreator.updatePlayerStats(statup, this));
        }
    }

    public MapleMap getMap() {
        return map;
    }

    public MonsterBook getMonsterBook() {
        return monsterbook;
    }

    public void setMap(MapleMap newmap) {
        this.map = newmap;
    }

    public void setMap(int PmapId) {
        this.mapid = PmapId;
    }

    public int getMapId() {
        if (map != null) {
            return map.getId();
        }
        return mapid;
    }

    public byte getInitialSpawnpoint() {
        return initialSpawnPoint;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBlessOfFairyOrigin() {
        return this.BlessOfFairy_Origin;
    }

    public String getBlessOfEmpressOrigin() {
        return this.BlessOfEmpress_Origin;
    }

    public short getLevel() {
        return level;
    }

    public int getFame() {
        return fame;
    }

    public int getFallCounter() {
        return fallcounter;
    }

    public int getCriticalGrowth() {
        return criticalgrowth;
    }

    public void setCriticalGrowth(int critical) {
        this.criticalgrowth = critical;
    }

    public MapleClient getClient() {
        return client;
    }

    public void setClient(MapleClient client) {
        this.client = client;
    }

    public long getExp() {
        return exp.get();
    }

    public short getRemainingAp() {
        return remainingAp;
    }

    public int getRemainingSp() {
        return remainingSp[JobConstants.getSkillBookByJob(job)];
    }

    public int getRemainingSp(int skillbook) {
        return remainingSp[skillbook];
    }

    public int[] getRemainingSps() {
        return remainingSp;
    }

    public int getRemainingSpSize() {
        int ret = 0;
        for (int i = 0; i < remainingSp.length; i++) {
            if (remainingSp[i] > 0) {
                ret++;
            }
        }
        return ret;
    }

    public short getHpApUsed() {
        return hpApUsed;
    }

    /*
     * ??????????????????
     */
    public boolean isHidden() {
        return getBuffSource(MapleBuffStat.?????????) / 1000000 == 9;
    }

    public void setHpApUsed(short hpApUsed) {
        this.hpApUsed = hpApUsed;
    }

    public byte getSkinColor() {
        return skinColor;
    }

    public void setSkinColor(byte skinColor) {
        this.skinColor = skinColor;
    }

    public short getJob() {
        return job;
    }

    public void writeJobData(MaplePacketLittleEndianWriter mplew) {
        boolean sub = getJob() == 400 && getSubcategory() == 1;
        mplew.writeShort(getJob());
        mplew.writeShort(sub ? getSubcategory() : 0);
    }

    /*
     * ????????????
     */
    public byte getGender() {
        return gender;
    }

    /*
     * ???2???????????????
     */
    public byte getSecondGender() {
        //?????????????????? ?????????2?????????1
        if (JobConstants.is?????????(job)) {
            return 1;
        }
        return gender;
    }

    public byte getZeroLook() {
        if (!JobConstants.is?????????(job)) {
            return -1;
        }
        if (getKeyValue("Zero_Look") == null) {
            setKeyValue("Zero_Look", "0");
        }
        return Byte.parseByte(getKeyValue("Zero_Look"));
    }

    public void changeZeroLook() {
        if (!JobConstants.is?????????(job)) {
            return;
        }
        setKeyValue("Zero_Look", isZeroSecondLook() ? "0" : "1");
        map.broadcastMessage(this, MaplePacketCreator.updateZeroLook(this), false);
        stats.recalcLocalStats(this);
    }

    public boolean isZeroSecondLook() {
        return getZeroLook() == 1;
    }

    /*
     * ????????????
     */
    public int getHair() {
        return hair;
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    /*
     * ???2???????????????
     * 37623 ?????????
     */
    public int getSecondHair() {
        if (JobConstants.is?????????(job)) {
            if (getKeyValue("Second_Hair") == null) {
                setKeyValue("Second_Hair", "37623");
            }
            return Integer.parseInt(getKeyValue("Second_Hair"));
        }
        return hair;
    }

    public void setSecondHair(int hair) {
        setKeyValue("Second_Hair", String.valueOf(hair));
    }

    /*
     * ????????????
     */
    public int getFace() {
        return face;
    }

    public void setFace(int face) {
        this.face = face;
    }

    /*
     * ???2???????????????
     * 21290 ?????????
     */
    public int getSecondFace() {
        if (JobConstants.is?????????(job)) {
            if (getKeyValue("Second_Face") == null) {
                setKeyValue("Second_Face", "21290");
            }
            return Integer.parseInt(getKeyValue("Second_Face"));
        }
        return face;
    }

    public boolean changeFace(int color) {
        int f = 0;
        if (face % 1000 < 100) {
            f = face + color;
        } else if ((face % 1000 >= 100) && (face % 1000 < 200)) {
            f = face - 100 + color;
        } else if ((face % 1000 >= 200) && (face % 1000 < 300)) {
            f = face - 200 + color;
        } else if ((face % 1000 >= 300) && (face % 1000 < 400)) {
            f = face - 300 + color;
        } else if ((face % 1000 >= 400) && (face % 1000 < 500)) {
            f = face - 400 + color;
        } else if ((face % 1000 >= 500) && (face % 1000 < 600)) {
            f = face - 500 + color;
        } else if ((face % 1000 >= 600) && (face % 1000 < 700)) {
            f = face - 600 + color;
        } else if ((face % 1000 >= 700) && (face % 1000 < 800)) {
            f = face - 700 + color;
        }
        if (!MapleItemInformationProvider.getInstance().faceExists(f)) {
            return false;
        }
        face = f;
        updateSingleStat(MapleStat.??????, face);
        equipChanged();
        return true;
    }

    public void setSecondFace(int face) {
        setKeyValue("Second_Face", String.valueOf(face));
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExp(long exp) {
        this.exp.set(exp);
    }

    public void setFame(int fame) {
        this.fame = fame;
    }

    public void setFallCounter(int fallcounter) {
        this.fallcounter = fallcounter;
    }

    public Point getOldPosition() {
        return old;
    }

    public void setOldPosition(Point x) {
        this.old = x;
    }

    /*
     * ???1????????????????????????ID
     */
    public int getLastAttackSkillId() {
        return lastAttackSkillId;
    }

    public void setLastAttackSkillId(int skillId) {
        this.lastAttackSkillId = skillId;
    }

    public void setRemainingAp(short remainingAp) {
        this.remainingAp = remainingAp;
    }

    public void setRemainingSp(int remainingSp) {
        this.remainingSp[JobConstants.getSkillBookByJob(job)] = remainingSp; //default
    }

    public void setRemainingSp(int remainingSp, int skillbook) {
        this.remainingSp[skillbook] = remainingSp;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public void setInvincible(boolean invinc) {
        invincible = invinc;
    }

    public boolean isInvincible() {
        return invincible;
    }

    /*
     * ??????????????????
     */
    public CheatTracker getCheatTracker() {
        return anticheat;
    }

    /*
     * ???????????????
     */
    public MapleLieDetector getAntiMacro() {
        return antiMacro;
    }

    /*
     * ????????????
     */
    public BuddyList getBuddylist() {
        return buddylist;
    }

    /*
     * ??????????????????
     */
    public void addFame(int famechange) {
        this.fame += famechange;
        getTrait(MapleTraitType.charm).addLocalExp(famechange);
        if (this.fame >= 50) {
            finishAchievement(7);
        }
        insertRanking("????????????", fame);
    }

    /*
     * ??????????????????
     */
    public void updateFame() {
        updateSingleStat(MapleStat.??????, this.fame);
    }

    /*
     * ?????????????????? ?????????????????? ????????????????????????
     */
    public void gainFame(int famechange, boolean show) {
        this.fame += famechange;
        updateSingleStat(MapleStat.??????, this.fame);
        if (show && famechange != 0) {
            client.getSession().write(MaplePacketCreator.getShowFameGain(famechange));
        }
    }

    public void updateHair(int hair) {
        setHair(hair);
        updateSingleStat(MapleStat.??????, hair);
        equipChanged();
    }

    public void updateFace(int face) {
        setFace(face);
        updateSingleStat(MapleStat.??????, face);
        equipChanged();
    }

    /*
     * ????????????
     */
    public void changeMapBanish(int mapid, String portal, String msg) {
        dropMessage(5, msg);
        MapleMap maps = client.getChannelServer().getMapFactory().getMap(mapid);
        changeMap(maps, maps.getPortal(portal));
    }

    public void changeMap(MapleMap to, Point pos) {
        changeMapInternal(to, pos, MaplePacketCreator.getWarpToMap(to, 0x80, this), null);
    }

    public void changeMap(MapleMap to) {
        changeMapInternal(to, to.getPortal(0).getPosition(), MaplePacketCreator.getWarpToMap(to, 0, this), to.getPortal(0));
    }

    public void changeMap(MapleMap to, MaplePortal pto) {
        changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this), null);
    }

    public void changeMapPortal(MapleMap to, MaplePortal pto) {
        changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this), pto);
    }

    private void changeMapInternal(MapleMap to, Point pos, byte[] warpPacket, MaplePortal pto) {
        if (to == null) {
            dropMessage(5, "changeMapInternal to Null");
            return;
        }
        if (getAntiMacro().inProgress()) {
            dropMessage(5, "????????????????????????????????????");
            return;
        }
        int nowmapid = map.getId();
        if (eventInstance != null) {
            eventInstance.changedMap(this, to.getId());
        }
        boolean pyramid = pyramidSubway != null;
        if (map.getId() == nowmapid) {
            client.getSession().write(warpPacket);
            boolean shouldChange = client.getChannelServer().getPlayerStorage().getCharacterById(getId()) != null;
            boolean shouldState = map.getId() == to.getId();
            if (shouldChange && shouldState) {
                to.setCheckStates(false);
            }
            map.removePlayer(this);
            if (shouldChange) {
                map = to;
                setStance(0);
                setPosition(new Point(pos.x, pos.y - 50));
                to.addPlayer(this);
                stats.relocHeal(this);
                if (shouldState) {
                    to.setCheckStates(true);
                }
            }
        }
        if (pyramid && pyramidSubway != null) { //checks if they had pyramid before AND after changing
            pyramidSubway.onChangeMap(this, to.getId());
        }
    }

    public void cancelChallenge() {
        if (challenge != 0 && client.getChannelServer() != null) {
            MapleCharacter chr = client.getChannelServer().getPlayerStorage().getCharacterById(challenge);
            if (chr != null) {
                chr.dropMessage(6, getName() + " ?????????????????????.");
                chr.setChallenge(0);
            }
            dropMessage(6, "?????????????????????.");
            challenge = 0;
        }
    }

    /*
     * ????????????????????????
     */
    public void leaveMap(MapleMap map) {
        controlledLock.writeLock().lock();
        visibleMapObjectsLock.writeLock().lock();
        try {
            for (MapleMonster mons : controlled) {
                if (mons != null) {
                    mons.setController(null);
                    mons.setControllerHasAggro(false);
                    mons.setControllerKnowsAboutAggro(false);
                    map.updateMonsterController(mons);
                }
            }
            controlled.clear();
            visibleMapObjects.clear();
        } finally {
            controlledLock.writeLock().unlock();
            visibleMapObjectsLock.writeLock().unlock();
        }
        if (chair != 0) {
            chair = 0;
        }
        clearLinkMid();
        cancelFishingTask();
        cancelChallenge();
        resetConversation();
        if (getBattle() != null) {
            getBattle().forfeit(this, true);
        }
        if (!getMechDoors().isEmpty()) {
            removeMechDoor();
        }
        cancelMapTimeLimitTask();
        if (getTrade() != null) {
            MapleTrade.cancelTrade(getTrade(), client, this);
        }
    }

    /*
     * ????????????
     */
    public void changeJob(int newJob) {
        try {
            cancelEffectFromBuffStat(MapleBuffStat.?????????);
            int tmpJob = newJob;
            this.job = (short) newJob;
            //??????
            if (this.getSubcategory() == 1 && newJob == 400) {
                tmpJob = 400 + 65536;
            }
            updateSingleStat(MapleStat.??????, tmpJob);
            if (!JobConstants.is????????????(newJob) && !JobConstants.is?????????(newJob)) { //?????????????????????????????????
                if (JobConstants.isSeparatedSpJob(newJob)) { //???????????????
                    int changeSp = (newJob == 2200 || newJob == 2210 || newJob == 2211 || newJob == 2213 ? 3 : 5);
                    if (!JobConstants.is??????(newJob)) { //??????????????????
                        switch (JobConstants.getSkillBookByJob(newJob)) {
                            case 1:
                                changeSp = 5;
                                break;
                            case 2:
                                changeSp = 4;
                                break;
                            case 3:
                                changeSp = 3;
                                break;
                        }
                    }
                    remainingSp[JobConstants.getSkillBookByJob(newJob)] += changeSp;
                    client.getSession().write(UIPacket.getSPMsg((byte) changeSp, (short) newJob));
                } else {
                    remainingSp[JobConstants.getSkillBookByJob(newJob)]++;
                    if (newJob % 10 >= 2) {
                        remainingSp[JobConstants.getSkillBookByJob(newJob)] += 2;
                    }
                }
                if (newJob % 10 >= 1 && level >= 70) { //3rd job or higher. lucky for evans who get 80, 100, 120, 160 ap...
                    remainingAp += 5;
                    updateSingleStat(MapleStat.AVAILABLEAP, remainingAp);
                    Skill skil = SkillFactory.getSkill(PlayerStats.getSkillByJob(1007, getJob()));
                    if (skil != null && getSkillLevel(skil) <= 0) {
                        dropMessage(-1, "??????????????????????????????");
                        changeSingleSkillLevel(skil, skil.getMaxLevel(), (byte) skil.getMaxLevel());
                    }
                }
                if (!isGM()) {
                    if (!JobConstants.is??????(newJob)) {
                        if (getLevel() > (newJob == 200 ? 8 : 10) && newJob % 100 == 0 && (newJob % 1000) / 100 > 0) { //first job
                            remainingSp[JobConstants.getSkillBookByJob(newJob)] += 3 * (getLevel() - (newJob == 200 ? 8 : 10));
                        }
                    } else if (newJob == 2200) { //??????
                        MapleQuest.getInstance(22100).forceStart(this, 0, null);
                        MapleQuest.getInstance(22100).forceComplete(this, 0);
                        expandInventory((byte) 1, 4);
                        expandInventory((byte) 2, 4);
                        expandInventory((byte) 3, 4);
                        expandInventory((byte) 4, 4);
                        client.getSession().write(NPCPacket.getEvanTutorial("UI/tutorial/evan/14/0"));
                        dropMessage(5, "??????????????????????????????????????????????????????????????????????????????3???SP????????????????????????????????????????????????????????????");
                    }
                }
                updateSingleStat(MapleStat.AVAILABLESP, 0);
            }

            int maxhp = stats.getMaxHp(), maxmp = stats.getMaxMp();

            switch (job) {
                case 100: // ??????
                case 1100: // ?????????1???
                case 2100: // ??????1???
                case 3200: // ????????????1???
                case 5100: // ?????????1???
                case 6100: // ????????????1???
                    maxhp += Randomizer.rand(200, 250);
                    break;
                case 3100: // ????????????1???
                    maxhp += Randomizer.rand(200, 250);
                    break;
                case 3110: // ????????????2???
                    maxhp += Randomizer.rand(300, 350);
                    break;
                case 3101: //???????????????1???
                case 3120: //???????????????2???
                    maxhp += Randomizer.rand(500, 800);
                    break;
                case 200: // ?????????
                case 2200: // ??????1???
                case 2210: // ??????2???
                case 2700: // ????????????1???
                    maxmp += Randomizer.rand(100, 150);
                    break;
                case 300: // ?????????
                case 400: // ??????
                case 500: // ??????
                case 501: // ????????????
                case 509: // ?????? - ???
                case 2300: // ????????????1???
                case 2400: // ??????1???
                case 3300: // ????????????1???
                case 3500: // ?????????1???
                case 3600: // ??????1???
                    maxhp += Randomizer.rand(100, 150);
                    maxmp += Randomizer.rand(25, 50);
                    break;
                case 110: // ??????
                case 120: // ?????????
                case 130: // ?????????
                case 1110: // ?????????2???
                case 2110: // ??????2???
                case 3210: // ????????????2???
                case 5110: // ?????????2???
                    maxhp += Randomizer.rand(300, 350);
                    break;
                case 6110: // ????????????2???
                    maxhp += Randomizer.rand(350, 400);
                    maxmp += Randomizer.rand(120, 180);
                    break;
                case 210: // ????????????
                case 220: // ????????????
                case 230: // ??????
                case 2710: // ????????????2???
                    maxmp += Randomizer.rand(400, 450);
                    break;
                case 310: // ??????
                case 320: // ?????????
                case 410: // ??????
                case 420: // ??????
                case 430: // ????????????
                case 510: // ??????
                case 520: // ?????????
                case 530: // ?????????
                case 570: // ????????????2???
                case 580: // ??????
                case 590: // ?????????
                case 2310: // ????????????2???
                case 2410: // ??????2???
                case 1310: // ????????????2???
                case 1410: // ?????????2???
                case 3310: // ????????????2???
                case 3510: // ?????????2???
                case 3610: // ??????2???
                    maxhp += Randomizer.rand(200, 250);
                    maxhp += Randomizer.rand(150, 200);
                    break;
                case 900: // ?????????
                case 800: // ?????????
                    maxhp += 99999;
                    maxmp += 99999;
                    break;
            }
            if (maxhp >= getMaxHpForSever()) {
                maxhp = getMaxHpForSever();
            }
            if (maxmp >= getMaxMpForSever()) {
                maxmp = getMaxMpForSever();
            }
            if (JobConstants.isNotMpJob(job)) {
                maxmp = 10;
            }
            stats.setInfo(maxhp, maxmp, stats.getCurrentMaxHp(), stats.getCurrentMaxMp(job));
            characterCard.recalcLocalStats(this);
            stats.recalcLocalStats(this);
            List<Pair<MapleStat, Long>> statup = new ArrayList<>(4);
            statup.add(new Pair<>(MapleStat.HP, (long) stats.getCurrentMaxHp()));
            statup.add(new Pair<>(MapleStat.MP, (long) stats.getCurrentMaxMp(job)));
            statup.add(new Pair<>(MapleStat.MAXHP, (long) maxhp));
            statup.add(new Pair<>(MapleStat.MAXMP, (long) maxmp));
            client.getSession().write(MaplePacketCreator.updatePlayerStats(statup, this));
            map.broadcastMessage(this, EffectPacket.showForeignEffect(getId(), 0x0D), false);
            map.broadcastMessage(this, MaplePacketCreator.updateCharLook(this), false);
            silentPartyUpdate();
            guildUpdate();
            familyUpdate();
            sidekickUpdate();
            if (dragon != null) {
                map.broadcastMessage(SummonPacket.removeDragon(this.id));
                dragon = null;
            }
            if (lw != null) {
                lw = null;
            }
            baseSkills(); //????????????
            if (newJob >= 2200 && newJob <= 2218) { //??????
                if (getBuffedValue(MapleBuffStat.????????????) != null) {
                    cancelBuffStats(MapleBuffStat.????????????);
                }
                makeDragon();
            }
            if (newJob >= 4200 && newJob <= 4212 || newJob == 4002) {
                if (getBuffedValue(MapleBuffStat.????????????) != null) {
                    cancelBuffStats(MapleBuffStat.????????????);
                }
                makeLittleWhite();
            }
            if (newJob >= 3300 && newJob <= 3312) { //????????????
                client.getSession().write(MaplePacketCreator.updateJaguar(this));
            }
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.ScriptEx_Log, e); //all jobs throw errors :(
        }
    }

    public void checkZeroItem() {
        if (job != 10112 || level < 100) {
            return;
        }
        if (getKeyValue("Zero_Item") == null) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            //?????????????????????
            int[] toRemovePos = {-9, -5, -7};
            for (int pos : toRemovePos) {
                Item toRemove = getInventory(MapleInventoryType.EQUIPPED).getItem((short) pos);
                if (toRemove != null) {
                    MapleInventoryManipulator.removeFromSlot(client, MapleInventoryType.EQUIPPED, toRemove.getPosition(), toRemove.getQuantity(), false);
                }
            }
            //??????????????????
            int[][] equips = new int[][]{{1003840, -1}, //??????
            {1032202, -4}, //??????
            {1052606, -5}, //??????
            {1072814, -7}, //??????
            {1082521, -8}, //??????
            {1102552, -9}, //??????
            {1113059, -12}, //??????  ?????????
            {1113060, -13}, //??????  ?????????
            {1113061, -15}, //??????  ?????????
            {1113062, -16}, //??????  ?????????
            {1122260, -17}, //??????
            {1132231, -29}, //??????
            {1152137, -30}, //??????  ?????????
        };
            for (int[] i : equips) {
                if (ii.itemExists(i[0])) {
                    Equip equip = (Equip) ii.getEquipById(i[0]);
                    equip.setPosition((byte) i[1]);
                    equip.setQuantity((short) 1);
                    if (i[1] != -12 && i[1] != -13 && i[1] != -15 && i[1] != -16 && i[1] != -30) {
                        equip.resetOptential();
                    }
                    equip.setGMLog("????????????");
                    forceReAddItem_NoUpdate(equip, MapleInventoryType.EQUIPPED);
                    client.getSession().write(InventoryPacket.modifyInventory(false, Collections.singletonList(new ModifyInventory(0, equip)))); //???????????????????????????
                }
            }
            equipChanged();
            MapleInventoryManipulator.addById(client, 1142634, (short) 1, "????????????");
            MapleInventoryManipulator.addById(client, 2001530, (short) 100, "?????????");
            //???????????????
            Map<Skill, SkillEntry> list = new HashMap<>();
            int[] skillIds = {101000103, 101000203};
            for (int i : skillIds) {
                Skill skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 8, (byte) skil.getMaxLevel(), -1));
                }
            }
            if (!list.isEmpty()) {
                changeSkillsLevel(list);
            }
            setKeyValue("Zero_Item", "True");
        }
    }

    public void checkZeroWeapon() {
        if (level < 100) {
            return;
        }
        int lazuli = getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11).getItemId();
        int lapis = getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10).getItemId();
        if (lazuli == getZeroWeapon(false) && lapis == getZeroWeapon(true)) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (int i = 0; i < 2; i++) {
            int itemId = i == 0 ? getZeroWeapon(false) : getZeroWeapon(true);
            Equip equip = (Equip) ii.getEquipById(itemId);
            equip.setPosition((short) (i == 0 ? -11 : -10));
            equip.setQuantity((short) 1);
            equip.setGMLog("?????????????????????, ??????:" + FileoutputUtil.CurrentReadable_Time());
            equip.resetOptential();
            forceReAddItem_NoUpdate(equip, MapleInventoryType.EQUIPPED);
            client.getSession().write(InventoryPacket.modifyInventory(false, Collections.singletonList(new ModifyInventory(0, equip)))); //???????????????????????????
        }
        equipChanged();
    }

    public int getZeroWeapon(boolean lapis) {
        if (level < 100) {
            return lapis ? 1562000 : 1572000;
        }
        int weapon = lapis ? 1562001 : 1572001;
        if (level >= 100 && level < 160) {
            weapon += (level % 100) / 10;
        } else if (level >= 160 && level < 170) {
            weapon += 5;
        } else if (level >= 170) {
            weapon += 6;
        }
        return weapon;
    }

    /*
     * ????????????
     */
    public void baseSkills() {
        checkZeroItem();
        checkInnerSkill();
//        checkZeroWeapon();
        checkBeastTamerSkill();
        checkHyperAP();
        Map<Skill, SkillEntry> list = new HashMap<>();
        if (JobConstants.getJobNumber(job) >= 3) { //third job.
            List<Integer> baseSkills = SkillFactory.getSkillsByJob(job);
            if (baseSkills != null) {
                for (int i : baseSkills) {
                    Skill skil = SkillFactory.getSkill(i);
                    //System.err.println("????????????: " + !skil.isInvisible() + " - " + skil.getMasterLevel() + " - " + skil.getId() + " - " + skil.getName());
                    if (skil != null && !skil.isInvisible() && skil.isFourthJob() && getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0 && skil.getMasterLevel() > 0) {
                        list.put(skil, new SkillEntry((byte) 0, (byte) (JobConstants.is????????????(job) ? skil.getMaxLevel() : skil.getMasterLevel()), SkillFactory.getDefaultSExpiry(skil))); //usually 10 master
                    } else if (skil != null && skil.getName() != null && skil.getName().contains("???????????????") && getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0) {
                        list.put(skil, new SkillEntry((byte) 0, (byte) 10, SkillFactory.getDefaultSExpiry(skil)));
                    } else if (skil != null && skil.getName() != null && (skil.getName().contains("??????????????????") || skil.getName().contains("???????????????")) && getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0) {
                        list.put(skil, new SkillEntry((byte) 0, (byte) 30, SkillFactory.getDefaultSExpiry(skil)));
                    }
                }
            }
        }
        Skill skil;
        if (job >= 3300 && job <= 3312) {
            int[] ss = {?????????.??????, ?????????.???????????????, ????????????.???????????????, ????????????.???????????????_???, ????????????.????????????, ????????????.??????, ????????????.???????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is?????????(job)) {
            int[] ss = {?????????.????????????, ?????????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is?????????(job) && level >= 10) {
            skil = SkillFactory.getSkill(110);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
            }
        }
        if (JobConstants.is?????????(job)) {
            int[] ss = {?????????.????????????, ?????????.??????, ?????????.????????????_??????, ?????????.????????????, ?????????.????????????};
            if (JobConstants.is?????????(job)) {
                ss[2] = ?????????.????????????_??????;
            } else if (JobConstants.is????????????(job)) {
                ss[2] = ?????????.????????????_??????;
            } else if (JobConstants.is?????????(job)) {
                ss[2] = ?????????.????????????_??????;
            } else if (JobConstants.is?????????(job)) {
                ss[2] = ?????????.????????????_??????;
            }
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is?????????(job)) {
            skil = SkillFactory.getSkill(?????????.??????);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
            }
        }
        if (JobConstants.is????????????(job) && level >= 10 && job != 3001) {
            int[] ss = {????????????.????????????, ????????????.????????????, ????????????.????????????1, ????????????.????????????, ????????????.????????????1, ????????????.????????????2, ????????????.????????????3};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is???????????????(job) && level >= 10) {
            int[] ss = {???????????????.????????????, ???????????????.????????????, ???????????????.????????????, ???????????????.????????????, ???????????????.????????????, ???????????????.??????, ???????????????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is??????(job) && level >= 10) {
            int[] ss = {??????.????????????, ??????.????????????, ??????.??????????????????, ??????.???????????????, ??????.????????????, ??????.??????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is????????????(job) && level >= 10) {
            int[] ss = {??????.???????????????, ??????.????????????, ??????.????????????, ??????.????????????, 20021160, 20021161};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is????????????(job) && level >= 10) {
            skil = SkillFactory.getSkill(????????????.????????????);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
            }
            skil = SkillFactory.getSkill(????????????.???????????????);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
            }
        }

        if (JobConstants.is??????(job)) {
            int[] ss = {??????.?????????, ??????.???????????????1???, ??????.??????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is??????(job) && level >= 10) {
            int[] ss = {??????.????????????, ??????.????????????, ??????.????????????, ??????.????????????, ??????.????????????, ??????.?????????, 20031160, 20031161};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
            if (job == 2412) {
                skil = SkillFactory.getSkill(??????.????????????_??????);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
                skil = SkillFactory.getSkill(??????.????????????);
                if (skil != null && getSkillLevel(skil) > 0) {
                    list.put(skil, new SkillEntry((byte) 0, (byte) 0, -1));
                }
            } else {
                skil = SkillFactory.getSkill(??????.????????????);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
                skil = SkillFactory.getSkill(??????.????????????_??????);
                if (skil != null && getSkillLevel(skil) > 0) {
                    list.put(skil, new SkillEntry((byte) 0, (byte) 0, -1));
                }
            }
        }
        if (JobConstants.is??????(job) && level >= 10) {
            int[] ss = {??????.????????????, ??????.??????, ??????.??????, ??????.??????_??????, ??????.????????????????????????, ??????.????????????, ??????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
            int[] fixskills = {??????.????????????, ??????.????????????, ??????.????????????????????????};
            for (int f : fixskills) {
                skil = SkillFactory.getSkill(f);
                if (skil != null && getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0 && skil.getMasterLevel() > 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) skil.getMasterLevel(), SkillFactory.getDefaultSExpiry(skil)));
                }
            }
        }
        if (job >= 432 && job <= 434) {
            int[] fixskills = {??????.????????????, ??????.???????????????, ??????.????????????, ??????.????????????, ??????.?????????};
            for (int i : fixskills) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && !skil.isInvisible() && skil.isFourthJob() && skil.getMasterLevel() > 0) {
                    if (getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0) {
                        list.put(skil, new SkillEntry((byte) 0, (byte) skil.getMaxLevel(), SkillFactory.getDefaultSExpiry(skil)));
                    } else if (getMasterLevel(skil) <= skil.getMaxLevel()) {
                        list.put(skil, new SkillEntry((byte) getSkillLevel(skil), (byte) skil.getMaxLevel(), SkillFactory.getDefaultSExpiry(skil)));
                    }
                }
            }
        }
        if (JobConstants.is?????????(job) && level >= 10) {
            int[] ss = {?????????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is????????????(job) && level >= 10) {
            int[] ss = {????????????.????????????, ????????????.????????????, ????????????.????????????, ????????????.??????, ????????????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is???????????????(job) && level >= 10) {
            int[] ss = {60011216, 60011218, 60011219, 60011221, 60011222};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
                }
            }
        }
        if (job == 10112 && level >= 100) {
            List<Integer> baseSkills = SkillFactory.getSkillsByJob(10100);
            baseSkills.addAll(SkillFactory.getSkillsByJob(10110));
            baseSkills.addAll(SkillFactory.getSkillsByJob(10111));
            baseSkills.addAll(SkillFactory.getSkillsByJob(10112));
            for (int i : baseSkills) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && !skil.isInvisible() && skil.isFourthJob() && getSkillLevel(skil) <= 0 && getMasterLevel(skil) <= 0 && skil.getMasterLevel() > 0) {
                    list.put(skil, new SkillEntry((byte) 0, (byte) skil.getMaxLevel(), SkillFactory.getDefaultSExpiry(skil))); //usually 10 master
                }
            }
            int[] skillIds = {?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.?????????, ?????????.???????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????}; //100001262 ????????????
            for (int i : skillIds) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && skil.canBeLearnedBy(getJob()) && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) skil.getMaxLevel(), -1));
                }
            }
        }
        if (JobConstants.is??????(job)) {
            int[] ss = {??????.????????????, ??????.????????????????????????, ??????.????????????, ??????.??????????????????, ??????.???????????????, ??????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is?????????(job)) {
            int[] ss = {?????????.???????????????, ?????????.???????????????, ?????????.??????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) 1, -1));
                }
            }
        }
        if (JobConstants.is????????????(job)) {
            int[] ss = {????????????.????????????, ????????????.????????????};
            for (int i : ss) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) 1, -1));
                }
            }
        }
        List<Integer> fixSkills = SkillFactory.getSkillsByJob(job);
        if (fixSkills != null) {
            for (int i : fixSkills) {
                Skill sk = SkillFactory.getSkill(i);
                if (sk.getFixLevel() > 0) {
                    if (sk.canBeLearnedBy(getJob()) && getSkillLevel(sk) <= 0) {
                        list.put(sk, new SkillEntry((byte) 1, (byte) 1, -1));
                    }
                }
            }
        }
        if (!list.isEmpty()) {
            changeSkillsLevel(list);
        }
        fixTeachSkillLevel();
    }

    public void makeDragon() {
        dragon = new MapleDragon(this);
    }

    public MapleDragon getDragon() {
        return dragon;
    }

    public void makeLittleWhite() {
        lw = new MapleLittleWhite(this);
        map.broadcastMessage(SummonPacket.spawnLittleWhite(lw));//showLittleWhite
    }

    public MapleLittleWhite getLittleWhite() {
        return lw;
    }

    public void gainAp(short ap) {
        this.remainingAp += ap;
        updateSingleStat(MapleStat.AVAILABLEAP, this.remainingAp);
    }

    public void gainSP(int sp) {
        this.remainingSp[JobConstants.getSkillBookByJob(job)] += sp; //default
        updateSingleStat(MapleStat.AVAILABLESP, 0);
        client.getSession().write(UIPacket.getSPMsg((byte) sp, job));
    }

    public void gainSP(int sp, int skillbook) {
        this.remainingSp[skillbook] += sp; //default
        updateSingleStat(MapleStat.AVAILABLESP, 0);
        client.getSession().write(UIPacket.getSPMsg((byte) sp, (short) 0));
    }

    public void resetSP(int sp) {
        for (int i = 0; i < remainingSp.length; i++) {
            this.remainingSp[i] = sp;
        }
        updateSingleStat(MapleStat.AVAILABLESP, 0);
    }

    public void resetAPSP() {
        resetSP(0);
        gainAp((short) -this.remainingAp);
    }

    public int getHitCountBat() {
        return hitcountbat;
    }

    public void setHitCountBat(int hitcount) {
        this.hitcountbat = hitcount;
    }

    public int getBatCount() {
        return batcount;
    }

    public void setBatCount(int count) {
        this.batcount = count;
    }

    /*
     * ????????????????????????
     */
    public List<Integer> getProfessions() {
        List<Integer> prof = new ArrayList<>();
        for (int i = 9200; i <= 9204; i++) {
            if (getProfessionLevel(i * 10000) > 0) {
                prof.add(i);
            }
        }
        return prof;
    }

    public byte getProfessionLevel(int id) {
        int ret = getSkillLevel(id);
        if (ret <= 0) {
            return 0;
        }
        return (byte) ((ret >>> 24) & 0xFF); //the last byte
    }

    public short getProfessionExp(int id) {
        int ret = getSkillLevel(id);
        if (ret <= 0) {
            return 0;
        }
        return (short) (ret & 0xFFFF); //the first two byte
    }

    public boolean addProfessionExp(int id, int expGain) {
        int ret = getProfessionLevel(id);
        if (ret <= 0 || ret >= 10) {
            return false;
        }
        int newExp = getProfessionExp(id) + expGain;
        if (newExp >= GameConstants.getProfessionEXP(ret)) {
            //gain level
            changeProfessionLevelExp(id, ret + 1, newExp - GameConstants.getProfessionEXP(ret));
            int traitGain = (int) Math.pow(2, ret + 1);
            switch (id) {
                case 92000000: //??????
                    traits.get(MapleTraitType.sense).addExp(traitGain, this);
                    break;
                case 92010000: //??????
                    traits.get(MapleTraitType.will).addExp(traitGain, this);
                    break;
                case 92020000: //????????????
                case 92030000: //????????????
                case 92040000: //?????????
                    traits.get(MapleTraitType.craft).addExp(traitGain, this);
                    break;
            }
            return true;
        } else {
            changeProfessionLevelExp(id, ret, newExp);
            return false;
        }
    }

    /*
     * ?????????????????????????????????
     */
    public void changeProfessionLevelExp(int id, int level, int exp) {
        changeSingleSkillLevel(SkillFactory.getSkill(id), ((level & 0xFF) << 24) + (exp & 0xFFFF), (byte) 10);
    }

    /*
     * ?????????????????????????????????
     */
    public void changeSkillLevel(Skill skill, byte newLevel, byte newMasterlevel) {
        changeSingleSkillLevel(skill, newLevel, newMasterlevel, -1);
    }

    public void changeSingleSkillLevel(Skill skill, int newLevel, byte newMasterlevel) { //1 month
        if (skill == null) {
            return;
        }
        changeSingleSkillLevel(skill, newLevel, newMasterlevel, SkillFactory.getDefaultSExpiry(skill));
    }

    public void changeSingleSkillLevel(Skill skill, int newLevel, byte newMasterlevel, long expiration) {
        Map<Skill, SkillEntry> list = new HashMap<>();
        boolean hasRecovery = false, recalculate = false;
        if (changeSkillData(skill, newLevel, newMasterlevel, expiration)) { // no loop, only 1
            list.put(skill, new SkillEntry(newLevel, newMasterlevel, expiration, getSkillTeachId(skill), getSkillPosition(skill)));
            if (GameConstants.isRecoveryIncSkill(skill.getId())) {
                hasRecovery = true;
            }
            if (skill.getId() < 80000000) {
                recalculate = true;
            }
        }
        if (list.isEmpty()) { // nothing is changed
            return;
        }
        client.getSession().write(MaplePacketCreator.updateSkills(list));
        reUpdateStat(hasRecovery, recalculate);
    }

    public void changeSkillsLevel(Map<Skill, SkillEntry> skills) {
        if (skills.isEmpty()) {
            return;
        }
        Map<Skill, SkillEntry> list = new HashMap<>();
        boolean hasRecovery = false, recalculate = false;
        for (Entry<Skill, SkillEntry> data : skills.entrySet()) {
            if (changeSkillData(data.getKey(), data.getValue().skillevel, data.getValue().masterlevel, data.getValue().expiration)) {
                list.put(data.getKey(), data.getValue());
                if (GameConstants.isRecoveryIncSkill(data.getKey().getId())) {
                    hasRecovery = true;
                }
                if (data.getKey().getId() < 80000000) {
                    recalculate = true;
                }
            }
        }
        if (list.isEmpty()) { // nothing is changed
            return;
        }
        client.getSession().write(MaplePacketCreator.updateSkills(list));
        reUpdateStat(hasRecovery, recalculate);
    }

    /*
     * ?????????????????????????????????????????????
     */
    private void reUpdateStat(boolean hasRecovery, boolean recalculate) {
        changed_skills = true;
        if (hasRecovery) {
            stats.relocHeal(this);
        }
        if (recalculate) {
            stats.recalcLocalStats(this);
        }
    }

    /*
     * ??????????????????
     */
    public boolean changeSkillData(Skill skill, int newLevel, byte newMasterlevel, long expiration) {
        if (skill == null || (!GameConstants.isApplicableSkill(skill.getId()) && !GameConstants.isApplicableSkill_(skill.getId()))) {
            return false;
        }
        if (newLevel == 0 && newMasterlevel == 0) {
            if (skills.containsKey(skill)) {
                skills.remove(skill);
            } else {
                return false; //nothing happen
            }
        } else {
            skills.put(skill, new SkillEntry(newLevel, newMasterlevel, expiration, getSkillTeachId(skill), getSkillPosition(skill)));
        }
        return true;
    }

    public void changeSkillLevel_Skip(Map<Skill, SkillEntry> skill) {
        changeSkillLevel_Skip(skill, false);
    }

    public void changeSkillLevel_Skip(Map<Skill, SkillEntry> skill, boolean write) {
        if (skill.isEmpty()) {
            return;
        }
        Map<Skill, SkillEntry> newlist = new HashMap<>();
        for (Entry<Skill, SkillEntry> date : skill.entrySet()) {
            if (date.getKey() == null) {
                continue;
            }
            //System.err.println("changeSkillLevel_Skip - " + date.getKey().getId() + " skillevel " + date.getValue().skillevel + " masterlevel " + date.getValue().masterlevel + " - " + date.getKey().getName());
            newlist.put(date.getKey(), date.getValue());
            if (date.getValue().skillevel == 0 && date.getValue().masterlevel == 0) {
                if (skills.containsKey(date.getKey())) {
                    skills.remove(date.getKey());
                } else {
                    continue;
                }
            } else {
                skills.put(date.getKey(), date.getValue());
            }
        }
        if (write && !newlist.isEmpty()) {
            client.getSession().write(MaplePacketCreator.updateSkills(newlist));
        }
    }

    public void changePetSkillLevel(Map<Skill, SkillEntry> skill) {
        if (skill.isEmpty()) {
            return;
        }
        Map<Skill, SkillEntry> newlist = new HashMap<>();
        for (Entry<Skill, SkillEntry> date : skill.entrySet()) {
            if (date.getKey() == null) {
                continue;
            }
            //System.err.println("changePetSkillLevel - ID: " + date.getKey().getId() + " skillevel: " + date.getValue().skillevel + " masterlevel: " + date.getValue().masterlevel + " - " + date.getKey().getName());
            if (date.getValue().skillevel == 0 && date.getValue().masterlevel == 0) {
                if (skills.containsKey(date.getKey())) {
                    skills.remove(date.getKey());
                    newlist.put(date.getKey(), date.getValue());
                } else {
                    continue;
                }
            } else if (getSkillLevel(date.getKey()) != date.getValue().skillevel) {
                skills.put(date.getKey(), date.getValue());
                newlist.put(date.getKey(), date.getValue());
            }
        }
        if (!newlist.isEmpty()) {
            for (Entry<Skill, SkillEntry> date : newlist.entrySet()) {
                client.getSession().write(MaplePacketCreator.updatePetSkill(date.getKey().getId(), date.getValue().skillevel, date.getValue().masterlevel, date.getValue().expiration));
            }
            reUpdateStat(false, true);
        }
    }

    public void changeTeachSkill(int skillId, int toChrId) {
        SkillEntry ret = getSkillEntry(skillId);
        if (ret != null) {
            ret.teachId = toChrId;
            client.getSession().write(MaplePacketCreator.updateSkill(skillId, toChrId, ret.masterlevel, ret.expiration));
            changed_skills = true;
        }
    }

    public boolean playerDead() {
        cancelEffectFromBuffStat(MapleBuffStat.?????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????HP);
        cancelEffectFromBuffStat(MapleBuffStat.????????????MP);
        cancelEffectFromBuffStat(MapleBuffStat.??????_MAXHP);
        cancelEffectFromBuffStat(MapleBuffStat.??????_MAXMP);
        cancelEffectFromBuffStat(MapleBuffStat.MAXHP);
        cancelEffectFromBuffStat(MapleBuffStat.MAXMP);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        dispelSummons();
        checkFollow();
        MapleStatEffect statss = getStatForBuff(MapleBuffStat.????????????);
        if (statss != null) {
            dropMessage(5, "????????????????????????????????????????????????????????????????????????????????????");
            getStat().setHp(((getStat().getMaxHp() / 100) * statss.getX()), this);
            setStance(0);
            //changeMap(getMap(), getMap().getPortal(0));
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            return false;
        }
        statss = getStatForBuff(MapleBuffStat.????????????);
        if (statss != null && this.isBuffFrom(MapleBuffStat.????????????, SkillFactory.getSkill(??????.???????????????))) {
            dropMessage(5, "???????????????????????????????????????????????????????????????????????????????????????");
            getStat().setHp(((getStat().getMaxHp() / 100) * statss.getX()), this);
            setStance(0);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            return false;
        }
        if (getSkillLevel(?????????.????????????) > 0 && !skillisCooling(?????????.????????????_??????)) {
            getStat().setHp(getStat().getCurrentMaxHp(), this);
            getStat().setMp(getStat().getCurrentMaxMp(getJob()), this);
            updateSingleStat(MapleStat.HP, getStat().getHp());
            updateSingleStat(MapleStat.MP, getStat().getMp());
            setStance(0);
            Skill skill = SkillFactory.getSkill(?????????.????????????_??????);
            skill.getEffect(getSkillLevel(?????????.????????????)).applyTo(this);
            return false;
        }
        statss = getStatForBuff(MapleBuffStat.????????????);
        if (statss != null) {
            getStat().setHp(getStat().getCurrentMaxHp(), this);
            getStat().setMp(getStat().getCurrentMaxMp(getJob()), this);
            updateSingleStat(MapleStat.HP, getStat().getHp());
            updateSingleStat(MapleStat.MP, getStat().getMp());
            this.cancelEffectFromBuffStat(MapleBuffStat.????????????);
            return false;
        }
        if (getEventInstance() != null) {
            getEventInstance().playerKilled(this);
        }
        setPowerCount(0);
        dotHP = 0;
        lastDOTTime = 0;
        specialStats.resetSpecialStats();
        if (!JobConstants.is????????????(job) && !inPVP()) {
            int charms = getItemQuantity(5130000, false); //????????? - ????????????????????????????????????????????????????????????MP,HP30%
            if (charms > 0) {
                MapleInventoryManipulator.removeById(client, MapleInventoryType.CASH, 5130000, 1, true, false);
                charms--;
                if (charms > 0xFF) {
                    charms = 0xFF;
                }
                client.getSession().write(MTSCSPacket.useCharm((byte) charms, (byte) 0));
            } else {
                float diepercentage;
                long expforlevel = getExpNeededForLevel();
                if (map.isTown() || FieldLimitType.RegularExpLoss.check(map.getFieldLimit())) {
                    diepercentage = 0.01f;
                } else {
                    diepercentage = 0.1f - ((traits.get(MapleTraitType.charisma).getLevel() / 20) / 100f);
                }
                long v10 = (exp.get() - (long) ((double) expforlevel * diepercentage));
                if (v10 < 0) {
                    v10 = 0;
                }
                this.exp.set(v10);
            }
            updateSingleStat(MapleStat.??????, this.exp.get());
        }
        if (!stats.checkEquipDurabilitys(this, -100)) { //i guess this is how it works ?
            dropMessage(5, "An item has run out of durability but has no inventory room to go to.");
        } //lol
        if (pyramidSubway != null) {
            stats.setHp((short) 50, this);
            pyramidSubway.fail(this);
        }
        return true;
    }

    public void updatePartyMemberHP() {
        if (party != null && client.getChannelServer() != null) {
            int channel = client.getChannel();
            for (MaplePartyCharacter partychar : party.getMembers()) {
                if (partychar != null && partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                    MapleCharacter other = client.getChannelServer().getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        other.getClient().getSession().write(PartyPacket.updatePartyMemberHP(getId(), stats.getHp(), stats.getCurrentMaxHp()));
                    }
                }
            }
        }
    }

    public void receivePartyMemberHP() {
        if (party == null) {
            return;
        }
        int channel = client.getChannel();
        for (MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar != null && partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                MapleCharacter other = client.getChannelServer().getPlayerStorage().getCharacterByName(partychar.getName());
                if (other != null) {
                    client.getSession().write(PartyPacket.updatePartyMemberHP(other.getId(), other.getStat().getHp(), other.getStat().getCurrentMaxHp()));
                }
            }
        }
    }

    /**
     * ??????HP
     *
     * @param delta ?????????
     */
    public void healHP(int delta) {
        addHP(delta);
        client.getSession().write(EffectPacket.showOwnHpHealed(delta));
        getMap().broadcastMessage(this, MaplePacketCreator.showHpHealed(getId(), delta), false);
    }

    /**
     * ??????HP
     *
     * @param delta ?????????
     */
    public void healMP(int delta) {
        addMP(delta);
        client.getSession().write(EffectPacket.showOwnHpHealed(delta));
        getMap().broadcastMessage(this, MaplePacketCreator.showHpHealed(getId(), delta), false);
    }

    /**
     * Convenience function which adds the supplied parameter to the current hp
     * then directly does a updateSingleStat.
     *
     * @param delta
     */
    public void addHP(int delta) {
        if (stats.setHp(stats.getHp() + delta, this)) {
            updateSingleStat(MapleStat.HP, stats.getHp());
        }
    }

    /**
     * Convenience function which adds the supplied parameter to the current mp
     * then directly does a updateSingleStat.
     *
     * @param delta
     */
    public void addMP(int delta) {
        addMP(delta, false);
    }

    public void addMP(int delta, boolean ignore) {
        if (JobConstants.isNotMpJob(getJob()) && GameConstants.getMPByJob(getJob()) <= 0) {
            return;
        }
        if ((delta < 0 && JobConstants.is????????????(getJob())) || !JobConstants.is????????????(getJob()) || ignore) {
            if (stats.setMp(stats.getMp() + delta, this)) {
                updateSingleStat(MapleStat.MP, stats.getMp());
            }
        }
    }

    public void addDemonMp(int delta) {
        if (delta > 0 && (getJob() == 3111 || getJob() == 3112)) {
            if (stats.setMp(stats.getMp() + delta, this)) {
                updateSingleStat(MapleStat.MP, stats.getMp());
            }
        }
    }

    public void addMPHP(int hpDiff, int mpDiff) {
        List<Pair<MapleStat, Long>> statups = new ArrayList<>();
        int alpha = Math.min(getStat().getCurrentMaxHp(), stats.getHp() + hpDiff);
        int beta = Math.min(getStat().getCurrentMaxMp(getJob()), stats.getMp() + mpDiff);
        if (stats.setHp(alpha, this)) {
            statups.add(new Pair<>(MapleStat.HP, (long) stats.getHp()));
        }
        if ((mpDiff < 0 && JobConstants.is????????????(getJob())) || !JobConstants.is????????????(getJob())) { //TODO:??????????????????????????????????????????
            if (stats.setMp(beta, this)) {
                statups.add(new Pair<>(MapleStat.MP, (long) stats.getMp()));
            }
        }
        if (statups.size() > 0) {
            client.getSession().write(MaplePacketCreator.updatePlayerStats(statups, this));
        }
    }

    /**
     * Updates a single stat of this MapleCharacter for the client. This method
     * only creates and sends an update packet, it does not update the stat
     * stored in this MapleCharacter instance.
     *
     * @param stat
     * @param newval
     */
    public void updateSingleStat(MapleStat stat, long newval) {
        updateSingleStat(stat, newval, false);
    }

    /**
     * Updates a single stat of this MapleCharacter for the client. This method
     * only creates and sends an update packet, it does not update the stat
     * stored in this MapleCharacter instance.
     *
     * @param stat
     * @param newval
     * @param itemReaction
     */
    public void updateSingleStat(MapleStat stat, long newval, boolean itemReaction) {
        Pair<MapleStat, Long> statpair = new Pair<>(stat, newval);
        client.getSession().write(MaplePacketCreator.updatePlayerStats(Collections.singletonList(statpair), itemReaction, this));
    }

    public void gainExp(long total, boolean show, boolean inChat, boolean white) {
        try {
            long prevexp = getExp();
            long needed = getExpNeededForLevel();
            if (total > 0) {
                stats.checkEquipLevels(this, total); //gms like
                stats.checkEquipSealed(this, total);
            }
            if (level >= getMaxLevelForSever()) {
                setExp(0);
            } else {
                boolean leveled = false;
                long tot = exp.get() + total;
                if (tot >= needed) {
                    exp.addAndGet(total);
                    levelUp();
                    leveled = true;
                    if (level >= getMaxLevelForSever()) {
                        setExp(0);
                    } else {
                        needed = getExpNeededForLevel();
                        if (exp.get() >= needed) {
                            setExp(needed - 1);
                        }
                    }
                } else {
                    exp.addAndGet(total);
                }
                if (total > 0) {
                    familyRep((int) prevexp, (int) needed, leveled);
                }
            }
            if (total != 0) {
                if (exp.get() < 0) { // After adding, and negative
                    if (total > 0) {
                        setExp(needed);
                    } else if (total < 0) {
                        setExp(0);
                    }
                }
                updateSingleStat(MapleStat.??????, getExp());
                if (show) { // still show the expgain even if it's not there
                    client.getSession().write(MaplePacketCreator.GainEXP_Others(total, inChat, white));
                }
            }
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.ScriptEx_Log, e); //all jobs throw errors :(
        }
    }

    public void familyRep(int prevexp, int needed, boolean leveled) {
        if (mfc != null) {
            int onepercent = needed / 100;
            if (onepercent <= 0) {
                return;
            }
            int percentrep = (int) (getExp() / onepercent - prevexp / onepercent);
            if (leveled) {
                percentrep = 100 - percentrep + (level / 2);
            }
            if (percentrep > 0) {
                int sensen = WorldFamilyService.getInstance().setRep(mfc.getFamilyId(), mfc.getSeniorId(), percentrep * 10, level, name);
                if (sensen > 0) {
                    WorldFamilyService.getInstance().setRep(mfc.getFamilyId(), sensen, percentrep * 5, level, name); //and we stop here
                }
            }
        }
    }

    public void monsterMultiKill() {
        if (killmonsterExps.size() > 2) {
            long multiKillExp = 0;
            for (long exps : killmonsterExps) {
                multiKillExp += (long) Math.ceil(exps * (Math.min(monsterCombo, 60) + 1) * 0.5 / 100);
            }
            gainExp((int) multiKillExp, false, false, false);
        }
        killmonsterExps.clear();
    }

    public void gainExpMonster(long gain, boolean show, boolean white, int numExpSharers, boolean partyBonusMob, int partyBonusRate) {
        long totalExp = gain;
        int ???????????? = 0;
        if (sidekick != null) {
            MapleCharacter side = map.getCharacterById(sidekick.getCharacter(sidekick.getCharacter(0).getId() == getId() ? 1 : 0).getId());
            if (side != null) {
                ???????????? = (int) (gain / 2);
                totalExp += ????????????;
            }
        }
        int ???????????? = 0;
        if (haveItem(5420008)) {
            ???????????? = (int) ((gain / 100.0) * 25);
            totalExp += ????????????;
        }
        int ???????????? = 0;
        if (get????????????() > 0) {
            ???????????? = (int) ((gain / 100.0) * 10);
            totalExp += ????????????;
        }
        int ???????????? = 0;
        if (marriageId > 0) {
            MapleCharacter marrChr = map.getCharacterById(marriageId);
            if (marrChr != null) {
                ???????????? = (int) ((gain / 100.0) * 10);
                totalExp += ????????????;
            }
        }
        int ???????????? = 0;
        if (numExpSharers > 1) {
            double rate = (partyBonusRate > 0 ? (partyBonusRate / 100.0) : (map == null || !partyBonusMob || map.getPartyBonusRate() <= 0 ? 0.05 : (map.getPartyBonusRate() / 100.0)));
            ???????????? = (int) (((float) (gain * rate)) * (numExpSharers + (rate > 0.05 ? -1 : 1)));
            totalExp += ????????????;
        }

        long combokillExp = 0;
        if (killmonsterExps.isEmpty()) {
            if ((monsterCombo > 0) && (System.currentTimeMillis() - lastmonsterCombo > 7000)) {
                monsterCombo = 0;
            }
            monsterCombo += monsterCombo == 999 ? 0 : 1;
            lastmonsterCombo = System.currentTimeMillis();
        }
        if (monsterCombo > 1) {
            combokillExp += (long) Math.ceil(gain * Math.min(monsterCombo, 60) * 0.5D / 100.0D);
        }
        totalExp += combokillExp;

        int ?????????????????? = 0;
        int ?????????????????? = 0;
        if (stats.equippedWelcomeBackRing) {
            ?????????????????? = (int) ((gain / 100.0) * 80);
            totalExp += ??????????????????;
        }
        if (gain > 0 && totalExp < gain) {
            totalExp = Integer.MAX_VALUE;
        }
        if (totalExp > 0) {
            stats.checkEquipLevels(this, totalExp);
            gainBeastTamerSkillExp((int) totalExp);
            stats.checkEquipSealed(this, totalExp);
        }
        long prevexp = getExp(); //?????????????????????
        long needed = getExpNeededForLevel(); //???????????????????????????
        if (level >= getMaxLevelForSever()) {
            setExp(0);
        } else {
            boolean leveled = false;
            if (exp.get() + totalExp >= needed || exp.get() >= needed) {
                exp.addAndGet(totalExp);
                levelUp();
                leveled = true;
                if (level >= getMaxLevelForSever()) {
                    setExp(0);
                } else {
                    needed = getExpNeededForLevel();
                    if (exp.get() >= needed) {
                        setExp(needed);
                    }
                }
            } else {
                exp.addAndGet(totalExp);
            }
            if (totalExp > 0) {
                familyRep((int) prevexp, (int) needed, leveled);
            }
        }
        if (gain != 0) {
            if (exp.get() < 0) {
                if (gain > 0) {
                    setExp(getExpNeededForLevel());
                } else if (gain < 0) {
                    setExp(0);
                }
            }
            updateSingleStat(MapleStat.??????, getExp());
            if (show) {
                Map<MapleExpStat, Integer> expStatup = new EnumMap<>(MapleExpStat.class);
                if (???????????? > 0) {
                    expStatup.put(MapleExpStat.????????????, ????????????);
                }
                if (???????????? > 0) {
                    expStatup.put(MapleExpStat.??????????????????, ????????????);
                }
                if (?????????????????? > 0) {
                    expStatup.put(MapleExpStat.??????????????????, ??????????????????);
                }
                if (???????????? > 0) {
                    expStatup.put(MapleExpStat.??????????????????, ????????????);
                }
                if (???????????? > 0) {
                    expStatup.put(MapleExpStat.??????????????????, ????????????);
                }
                if (?????????????????? > 0) {
                    expStatup.put(MapleExpStat.??????????????????, ??????????????????);
                }
                client.getSession().write(MaplePacketCreator.showGainExpFromMonster((int) gain, white, expStatup));
            }
        }
        killmonsterExps.add(gain);
    }

    public void forceReAddItem_NoUpdate(Item item, MapleInventoryType type) {
        getInventory(type).removeSlot(item.getPosition());
        getInventory(type).addFromDB(item);
    }

    public void forceReAddItem(Item item, MapleInventoryType type) {
        forceReAddItem_NoUpdate(item, type);
        if (type != MapleInventoryType.UNDEFINED) {
            client.getSession().write(InventoryPacket.modifyInventory(false, Collections.singletonList(new ModifyInventory(0, item)))); //???????????????????????????
        }
    }

    public void forceUpdateItem(Item item) {
        forceUpdateItem(item, false);
    }

    public void petUpdateStats(MaplePet pet, boolean active) {
        List<ModifyInventory> mods = new LinkedList<>();
        Item Pet = getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition());
        mods.add(new ModifyInventory(3, Pet));
        mods.add(new ModifyInventory(0, Pet));
        client.getSession().write(InventoryPacket.modifyInventory(false, mods, this, active));
    }

    public void forceUpdateItem(Item item, boolean updateTick) {
        List<ModifyInventory> mods = new LinkedList<>();
        mods.add(new ModifyInventory(3, item)); //????????????
        mods.add(new ModifyInventory(0, item)); //????????????
        client.getSession().write(InventoryPacket.modifyInventory(updateTick, mods, this));
    }

    public void forceReAddItem_Book(Item item, MapleInventoryType type) { //used for mbook
        getInventory(type).removeSlot(item.getPosition());
        getInventory(type).addFromDB(item);
        if (type != MapleInventoryType.UNDEFINED) {
            client.getSession().write(MaplePacketCreator.upgradeBook(item, this));
        }
    }

    public void silentPartyUpdate() {
        if (party != null) {
            WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.????????????, new MaplePartyCharacter(this));
        }
    }

    public boolean isSuperGM() {
        return gmLevel >= PlayerGMRank.SUPERGM.getLevel();
    }

    public boolean isIntern() {
        return gmLevel >= PlayerGMRank.INTERN.getLevel();
    }

    public boolean isGM() {
        return gmLevel >= PlayerGMRank.GM.getLevel();
    }

    public boolean isAdmin() {
        return gmLevel >= PlayerGMRank.ADMIN.getLevel();
    }

    public int getGMLevel() {
        return gmLevel;
    }

    public boolean hasGmLevel(int level) {
        return gmLevel >= level;
    }

    public void setGmLevel(int level) {
        this.gmLevel = (byte) level;
    }

    public boolean isShowPacket() {
        return isAdmin() && ServerProperties.ShowPacket();
    }

    public MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }

    public MapleInventory[] getInventorys() {
        return inventory;
    }

    /*
     * ???????????????????????????????????????
     */
    public boolean canExpiration(long now) {
        return lastExpirationTime > 0 && lastExpirationTime + (60 * 1000) < now; //1????????????
    }

    public void expirationTask() {
        /*
         * ??????????????????
         */
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleQuestStatus stat = getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT)); //??????????????????
        long expiration;
        List<Integer> ret = new ArrayList<>();
        long currenttimes = System.currentTimeMillis();
        List<Triple<MapleInventoryType, Item, Boolean>> tobeRemoveItem = new ArrayList<>(); // ???????????????????????? ???????????? ?????? ????????????.
        List<Item> tobeUnlockItem = new ArrayList<>(); // ???????????????????????????.
        rLCheck.lock();
        try {
            for (MapleInventoryType inv : MapleInventoryType.values()) {
                for (Item item : getInventory(inv)) {
                    expiration = item.getExpiration();
                    if ((expiration != -1 && !ItemConstants.isPet(item.getItemId()) && currenttimes > expiration) || ii.isLogoutExpire(item.getItemId())) {
                        if (ItemFlag.LOCK.check(item.getFlag())) {
                            tobeUnlockItem.add(item); //?????????????????????????????????
                        } else if (currenttimes > expiration) {
                            tobeRemoveItem.add(new Triple<>(inv, item, true)); //???????????????????????????
                        }
                    } else if (item.getItemId() == 5000054 && item.getPet() != null && item.getPet().getSecondsLeft() <= 0) { //??????????????????
                        tobeRemoveItem.add(new Triple<>(inv, item, false));
                    } else if (item.getPosition() == -38) { //?????????????????? T072?????? ????????? -37
                        if (stat == null || stat.getCustomData() == null || Long.parseLong(stat.getCustomData()) < currenttimes) { //??????????????????
                            tobeRemoveItem.add(new Triple<>(inv, item, false));
                        }
                    }
                }
            }
        } finally {
            rLCheck.unlock();
        }
        /*
         * Left = ??????
         * Mid = ??????
         * Right = ??????
         */
        for (Triple<MapleInventoryType, Item, Boolean> itemz : tobeRemoveItem) {
            Item item = itemz.getMid();
            if (item == null) {
                FileoutputUtil.log("????????????.txt", getName() + " ??????????????????????????????????????????????????????????????????", true);
                continue;
            }
            if (itemz.getRight()) { //????????????
                if (MapleInventoryManipulator.removeFromSlot(client, itemz.getLeft(), item.getPosition(), item.getQuantity(), false)) {
                    ret.add(item.getItemId());
                }
                if (itemz.getLeft() == MapleInventoryType.EQUIPPED) {
                    equipChanged();
                }
            } else if (item.getPosition() == -38) { //?????????????????? T072?????? ????????? -37
                short slot = getInventory(MapleInventoryType.EQUIP).getNextFreeSlot();
                if (slot > -1) {
                    MapleInventoryManipulator.unequip(client, item.getPosition(), slot);
                }
            }
        }
        for (Item itemz : tobeUnlockItem) {
            itemz.setExpiration(-1);
            //itemz.setFlag((byte) (itemz.getFlag() - ItemFlag.LOCK.getValue()));
            forceUpdateItem(itemz);
            //dropMessage(6, "????????????[" + ii.getName(itemz.getItemId()) + "]????????????????????????");
        }
        this.pendingExpiration = ret;
        /*
         * ????????????
         */
        List<Skill> tobeRemoveSkill = new ArrayList<>();
        Map<Skill, SkillEntry> tobeRemoveList = new HashMap<>();
        for (Entry<Skill, SkillEntry> skil : skills.entrySet()) {
            if (skil.getValue().expiration != -1 && currenttimes > skil.getValue().expiration) {
                tobeRemoveSkill.add(skil.getKey());
            }
        }
        for (Skill skil : tobeRemoveSkill) {
            tobeRemoveList.put(skil, new SkillEntry(0, (byte) 0, -1));
            this.skills.remove(skil);
            changed_skills = true;
        }
        this.pendingSkills = tobeRemoveList;
        if (stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) < currenttimes) { //expired bro
            quests.remove(MapleQuest.getInstance(7830));
            quests.remove(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
            client.getSession().write(MaplePacketCreator.pendantSlot(false)); //????????????????????????
        }
        /*
         * ????????????????????????????????????
         */
        if (coreAura != null && currenttimes > coreAura.getExpiration()) {
            coreAura.resetCoreAura();
            coreAura.saveToDb();
            updataCoreAura();
            dropMessage(5, "????????????????????????????????????????????????");
        }
        /*
         * ???????????????????????????????????????
         */
        Item itemFix = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -37); //????????????????????? T072????????? -38?????????
        if (itemFix != null && itemFix.getItemId() / 10000 != 119) {
            short slot = getInventory(MapleInventoryType.EQUIP).getNextFreeSlot();
            if (slot > -1) {
                MapleInventoryManipulator.unequip(client, itemFix.getPosition(), slot);
                dropMessage(5, "????????????[" + ii.getName(itemFix.getItemId()) + "]?????????????????????????????????????????????");
            }
        }
        /*
         * ??????Vip ??????????????????
         */
        Timestamp currentVipTime = new Timestamp(System.currentTimeMillis());
        if (getVip() != 0) {
            Timestamp expirationVip = getViptime();
            if (expirationVip != null && currentVipTime.after(expirationVip)) {
                setVip(0);
                setViptime(null);
                dropMessage(-11, "??????Vip?????????????????????Vip????????? " + getVip());
            } else if (expirationVip == null) {
                setVip(0);
                setViptime(null);
            }
        }
        /*
         * ??????????????????
         */
        if (!pendingExpiration.isEmpty()) {
            for (Integer itemId : pendingExpiration) { //????????????????????????
                if (ii.isCash(itemId)) {
                    client.getSession().write(MaplePacketCreator.showCashItemExpired(itemId));
                } else {
                    client.getSession().write(MaplePacketCreator.showItemExpired(itemId));
                }
            }
        }
        pendingExpiration = null;
        /*
         * ????????????????????????
         */
        if (!pendingSkills.isEmpty()) {
            client.getSession().write(MaplePacketCreator.updateSkills(pendingSkills)); //???????????????????????????
            client.getSession().write(MaplePacketCreator.showSkillExpired(pendingSkills)); //????????????????????????
        }
        pendingSkills = null;
        lastExpirationTime = System.currentTimeMillis();
    }

    public MapleShop getShop() {
        return shop;
    }

    public void setShop(MapleShop shop) {
        this.shop = shop;
    }

    /*
     * ?????????????????????
     */
    public int[] getSavedLocations() {
        return savedLocations;
    }

    public int getSavedLocation(SavedLocationType type) {
        return savedLocations[type.getValue()];
    }

    public void saveLocation(SavedLocationType type) {
        savedLocations[type.getValue()] = getMapId();
        changed_savedlocations = true;
    }

    public void saveLocation(SavedLocationType type, int mapz) {
        savedLocations[type.getValue()] = mapz;
        changed_savedlocations = true;
    }

    public void clearSavedLocation(SavedLocationType type) {
        savedLocations[type.getValue()] = -1;
        changed_savedlocations = true;
    }

    /*
     * V.110??????????????????
     * ??????????????????
     */
    public long getMeso() {
        return meso.get();
    }

    public void gainMeso(long gain, boolean show) {
        gainMeso(gain, show, false);
    }

    public void gainMeso(long gain, boolean show, boolean inChat) {
        if (meso.get() + gain < 0) {
            client.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        meso.addAndGet(gain);
        if (meso.get() >= 1000000) {
            finishAchievement(31);
        }
        if (meso.get() >= 10000000) {
            finishAchievement(32);
        }
        if (meso.get() >= 100000000) {
            finishAchievement(33);
        }
        if (meso.get() >= 1000000000) {
            finishAchievement(34);
        }
        updateSingleStat(MapleStat.??????, meso.get(), false);
        client.getSession().write(MaplePacketCreator.enableActions());
        if (show) {
            client.getSession().write(MaplePacketCreator.showMesoGain(gain, inChat));
        }
    }

    public int getAccountID() {
        return accountid;
    }

    /*
     * ????????????????????????
     */
    public void controlMonster(MapleMonster monster, boolean aggro) {
        if (monster == null) {
            return;
        }
        monster.setController(this);
        controlledLock.writeLock().lock();
        try {
            controlled.add(monster);
        } finally {
            controlledLock.writeLock().unlock();
        }
        client.getSession().write(MobPacket.controlMonster(monster, false, aggro));
        monster.sendStatus(client);
    }

    public void stopControllingMonster(MapleMonster monster) {
        if (monster == null) {
            return;
        }
        controlledLock.writeLock().lock();
        try {
            if (controlled.contains(monster)) {
                controlled.remove(monster);
            }
        } finally {
            controlledLock.writeLock().unlock();
        }
    }

    public void checkMonsterAggro(MapleMonster monster) {
        if (monster == null) {
            return;
        }
        if (monster.getController() == this) {
            monster.setControllerHasAggro(true);
        } else {
            monster.switchController(this, true);
        }
    }

    public int getControlledSize() {
        return controlled.size();
    }

    /*
     * ??????????????????
     */
    public List<MapleQuestStatus> getStartedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 1 && !q.isCustom() && !q.getQuest().isBlocked()) {
                ret.add(q);
            }
        }
        return ret;
    }

    public List<MapleQuestStatus> getCompletedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 2 && !q.isCustom() && !q.getQuest().isBlocked()) {
                ret.add(q);
            }
        }
        return ret;
    }

    public List<Pair<Integer, Long>> getCompletedMedals() {
        List<Pair<Integer, Long>> ret = new ArrayList<>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 2 && !q.isCustom() && !q.getQuest().isBlocked() && q.getQuest().getMedalItem() > 0 && ItemConstants.getInventoryType(q.getQuest().getMedalItem()) == MapleInventoryType.EQUIP) {
                ret.add(new Pair<>(q.getQuest().getId(), q.getCompletionTime()));
            }
        }
        return ret;
    }

    public void mobKilled(int id, int skillID) {
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() != 1 || !q.hasMobKills()) {
                continue;
            }
            if (q.mobKilled(id, skillID)) {
                client.getSession().write(MaplePacketCreator.updateQuestMobKills(q));
                if (q.getQuest().canComplete(this, null)) {
                    client.getSession().write(MaplePacketCreator.getShowQuestCompletion(q.getQuest().getId()));
                }
            }
        }
    }

    /*
     * ?????????????????????
     */
    public Map<Skill, SkillEntry> getSkills() {
        return Collections.unmodifiableMap(skills);
    }

    /*
     * ????????????????????????
     * ??????????????????????????????
     * ???????????????????????????????????????????????????????????????
     */
    public Map<Skill, SkillEntry> getSkills(boolean packet) {
        if (!packet) {
            return Collections.unmodifiableMap(skills);
        }
        Map<Skill, SkillEntry> oldlist = new LinkedHashMap<>(skills);
        Map<Skill, SkillEntry> newlist = new LinkedHashMap<>();
        for (Entry<Skill, SkillEntry> skill : oldlist.entrySet()) {
            //???????????????????????????????????????
            if (skill.getKey().isAngelSkill() || skill.getKey().isLinkedAttackSkill() || skill.getKey().isDefaultSkill()) {
                continue;
            }
            newlist.put(skill.getKey(), skill.getValue());
        }
        return newlist;
    }

    public int getAllSkillLevels() {
        int rett = 0;
        for (Entry<Skill, SkillEntry> ret : skills.entrySet()) {
            if (!ret.getKey().isBeginnerSkill() && !ret.getKey().isSpecialSkill() && ret.getValue().skillevel > 0) {
                rett += ret.getValue().skillevel;
            }
        }
        return rett;
    }

    public long getSkillExpiry(Skill skill) {
        if (skill == null) {
            return 0;
        }
        SkillEntry ret = skills.get(skill);
        if (ret == null || ret.skillevel <= 0) {
            return 0;
        }
        return ret.expiration;
    }

    /*
     * ????????????ID??????????????????
     */
    public int getSkillLevel(int skillid) {
        return getSkillLevel(SkillFactory.getSkill(skillid));
    }

    public int getSkillLevel(Skill skill) {
        if (skill == null) {
            return 0;
        }
        int skillLevel;
        if (getJob() >= skill.getId() / 10000 && getJob() < skill.getId() / 10000 + 3) {
            skillLevel = skill.getFixLevel();
        } else {
            skillLevel = 0;
        }
        SkillEntry ret = this.skills.get(skill);
        if (ret == null || ret.skillevel <= 0) {
            return skillLevel;
        } else {
            skillLevel += ret.skillevel;
        }
        return skillLevel;
    }

    /*
     * ????????????ID??????????????????
     */
    public int getTotalSkillLevel(int skillid) {
        return getTotalSkillLevel(SkillFactory.getSkill(skillid));
    }

    public int getTotalSkillLevel(Skill skill) {
        if (skill == null) {
            return 0;
        }
        int skillLevel;
        if (getJob() >= skill.getId() / 10000 && getJob() < skill.getId() / 10000 + 3) {
            skillLevel = skill.getFixLevel();
        } else {
            skillLevel = 0;
        }
        SkillEntry ret = this.skills.get(skill);
        if (ret == null || ret.skillevel <= 0) {
            return skillLevel;
        } else {
            skillLevel += ret.skillevel;
        }
        return Math.min(skill.getTrueMax(), skillLevel + (skill.isBeginnerSkill() ? 0 : (stats.combatOrders + (skill.getMaxLevel() > 10 ? stats.incAllskill : 0) + stats.getSkillIncrement(skill.getId()))));
    }

    public byte getMasterLevel(int skillId) {
        return getMasterLevel(SkillFactory.getSkill(skillId));
    }

    public byte getMasterLevel(Skill skill) {
        SkillEntry ret = skills.get(skill);
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

    public int getSkillTeachId(int skillId) {
        return getSkillTeachId(SkillFactory.getSkill(skillId));
    }

    public int getSkillTeachId(Skill skill) {
        if (skill == null) {
            return 0;
        }
        SkillEntry ret = skills.get(skill);
        if (ret == null || ret.teachId == 0) {
            return 0;
        }
        return ret.teachId;
    }

    public byte getSkillPosition(int skillId) {
        return getSkillPosition(SkillFactory.getSkill(skillId));
    }

    public byte getSkillPosition(Skill skill) {
        if (skill == null) {
            return -1;
        }
        SkillEntry ret = skills.get(skill);
        if (ret == null || ret.position == -1) {
            return -1;
        }
        return ret.position;
    }

    public SkillEntry getSkillEntry(int skillId) {
        return skills.get(SkillFactory.getSkill(skillId));
    }

    /*
     * ??????????????????
     */
    public void levelUp() {
        levelUp(false);
    }

    public void levelUp(boolean takeexp) {
//        int vipAp = getVip() > 1 ? getVip() - 1 : 0; //???????????????Vip???Ap
        if (!canLevelUp()) {
            return;
        }
        if (JobConstants.is??????(job) && (level == 10 || level == 30 || level == 60 || level == 100)) {
            if (getInventory(MapleInventoryType.USE).getNumFreeSlot() <= 0) {
                dropMessage(1, "[????????????] ??????????????????????????????????????????????????????????????????????????????");
                return;
            }
        }
        if (JobConstants.is?????????(job) || JobConstants.is?????????(job)) {
            if (level <= 70) {
                remainingAp += 6;
            } else {
                remainingAp += 5;
            }
        } else {
            remainingAp += 5;
        }
        int maxhp = stats.getMaxHp();
        int maxmp = stats.getMaxMp();

        if (JobConstants.is????????????(job)) { // ??????
            maxhp += Randomizer.rand(12, 16);
            maxmp += Randomizer.rand(10, 12);
        } else if (JobConstants.is????????????(job) || JobConstants.is????????????(job)) { // ????????????
            maxhp += Randomizer.rand(48, 52);
        } else if (JobConstants.is???????????????(job) || JobConstants.is?????????(job)) { // ???????????????
            maxhp += Randomizer.rand(30, 40);
        } else if ((job >= 100 && job <= 132) // ??????
                || (job >= 1100 && job <= 1112) // ?????????
                || (job >= 5100 && job <= 5112) // ?????????
                || JobConstants.is?????????(job)) { //?????????
            maxhp += Randomizer.rand(48, 52);
            maxmp += Randomizer.rand(4, 6);
        } else if ((job >= 200 && job <= 232) // ?????????
                || (job >= 1200 && job <= 1212) // ?????????
                || (job >= 2700 && job <= 2712)) { //????????????
            maxhp += Randomizer.rand(10, 14);
            maxmp += Randomizer.rand(48, 52);
        } else if (job >= 3200 && job <= 3212) { //????????????
            maxhp += Randomizer.rand(20, 24);
            maxmp += Randomizer.rand(42, 44);
        } else if ((job >= 300 && job <= 322) // ?????????
                || (job >= 400 && job <= 434) // ??????
                || (job >= 1300 && job <= 1312) //????????????
                || (job >= 1400 && job <= 1412) //?????????
                || (job >= 2300 && job <= 2312) //????????????
                || (job >= 2400 && job <= 2412) //??????
                || (job >= 3300 && job <= 3312) //????????????
                || (job >= 3600 && job <= 3612)) { //??????
            maxhp += Randomizer.rand(20, 24);
            maxmp += Randomizer.rand(14, 16);
        } else if ((job >= 510 && job <= 512) // ??????
                || (job >= 580 && job <= 582) // ?????? - ???
                || (job >= 1510 && job <= 1512) //?????????
                || (job >= 6500 && job <= 6512)) { //???????????????
            maxhp += Randomizer.rand(37, 41);
            maxmp += Randomizer.rand(18, 22);
        } else if ((job >= 500 && job <= 532) //?????????
                || (job >= 570 && job <= 572) || job == 508 //????????????
                || (job >= 590 && job <= 592) //????????? - ???
                || (job >= 3500 && job <= 3512) //?????????
                || job == 1500) { // ?????????
            maxhp += Randomizer.rand(22, 26);
            maxmp += Randomizer.rand(18, 22);
        } else if (job >= 2100 && job <= 2112) { // ??????
            maxhp += Randomizer.rand(50, 52);
            maxmp += Randomizer.rand(4, 6);
        } else if (job >= 2200 && job <= 2218) { // ??????
            maxhp += Randomizer.rand(12, 16);
            maxmp += Randomizer.rand(50, 52);
        } else if (job >= 6100 && job <= 6112) { // ????????????
            maxhp += Randomizer.rand(68, 74);
            maxmp += Randomizer.rand(4, 6);
        } else if (job >= 10100 && job <= 10112) { // ?????????
            maxhp += Randomizer.rand(48, 52);
        } else if (JobConstants.is?????????(job) || JobConstants.is??????(job) || JobConstants.is??????(job)) {
            maxhp += Randomizer.rand(38, 42);
            maxmp += Randomizer.rand(20, 24);
        } else { // ??????????????????????????????
            maxhp += Randomizer.rand(24, 38);
            maxmp += Randomizer.rand(12, 24);
            if (job != 800 && job != 900 && job != 910) {
                System.err.println("??????????????????????????????????????????: " + job);
            }
        }
        maxmp += JobConstants.isNotMpJob(getJob()) ? 0 : stats.getTotalInt() / 10;
        if (JobConstants.is??????(job) && getSkillLevel(??????.????????????) > 0) {
            maxmp += Randomizer.rand(18, 22);
        }
        if (takeexp) {
            exp.addAndGet(getExpNeededForLevel());
            if (exp.get() < 0) {
                exp.set(0);
            }
        } else {
            setExp(0); // ??????????????????????????????0
        }
        level += 1;
        if (level >= getMaxLevelForSever()) {
            setExp(0);
        }
        maxhp = Math.min(getMaxHpForSever(), Math.abs(maxhp));
        maxmp = Math.min(getMaxMpForSever(), Math.abs(maxmp));
        if (JobConstants.is????????????(job)) {
            maxmp = GameConstants.getMPByJob(job);
        } else if (JobConstants.is?????????(job)) {
            maxmp = 100;
            checkZeroWeapon();
        } else if (JobConstants.isNotMpJob(job)) {
            maxmp = 10;
        }
        if (level == 30) {
            finishAchievement(2);
        }
        if (level == 70) {
            finishAchievement(3);
        }
        if (level == 120) {
            finishAchievement(4);
        }
        if (level == 200) {
            finishAchievement(5);
        }
        if (level == 250 && !isGM()) {
            StringBuilder sb = new StringBuilder("[??????] ");
            sb.append(getMedalText()); //???????????????????????????
            sb.append(getName()); //?????????????????????
            sb.append("???????????????250???.???????????????????????????");
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, sb.toString()));
        }
        List<Pair<MapleStat, Long>> statup = new ArrayList<>();

        if (isGM() || !JobConstants.is????????????(job)) {
            if (JobConstants.is?????????(job) && level >= 100) {
                remainingSp[0] += 3;
                remainingSp[1] += 3;
            } else if (!JobConstants.is?????????(job)) {
                remainingSp[JobConstants.getSkillBookByLevel(this.job, this.level)] += 3;
            }
        } else if (level < 10) {
            stats.str += remainingAp;
            remainingAp = 0;
            statup.add(new Pair<>(MapleStat.??????, (long) stats.getStr()));
        } else if (level == 10) {
            resetStats(4, 4, 4, 4);
        }
        stats.setInfo(maxhp, maxmp, stats.getCurrentMaxHp(), stats.getCurrentMaxMp(job));
        characterCard.recalcLocalStats(this);
        stats.recalcLocalStats(this);
        statup.add(new Pair<>(MapleStat.MAXHP, (long) maxhp));
        statup.add(new Pair<>(MapleStat.MAXMP, (long) maxmp));
        statup.add(new Pair<>(MapleStat.HP, (long) stats.getCurrentMaxHp()));
        statup.add(new Pair<>(MapleStat.MP, (long) stats.getCurrentMaxMp(job)));
        statup.add(new Pair<>(MapleStat.??????, exp.get()));
        statup.add(new Pair<>(MapleStat.??????, (long) level));
        statup.add(new Pair<>(MapleStat.AVAILABLEAP, (long) remainingAp));
        statup.add(new Pair<>(MapleStat.AVAILABLESP, (long) remainingSp[JobConstants.getSkillBookByLevel(job, level)]));
        client.getSession().write(MaplePacketCreator.updatePlayerStats(statup, this));
        map.broadcastMessage(this, EffectPacket.showForeignEffect(getId(), 0), false);
        silentPartyUpdate();
        guildUpdate();
        sidekickUpdate();
        familyUpdate();
        checkBeastTamerSkill();
        // ????????????????????????
        if (JobConstants.is??????(job)) {
            int oldJobId = getJob();
            switch (level) {
                case 10:
                    changeJob(2200);
                    break;
                case 20:
                    changeJob(2210);
                    break;
                case 30:
                    changeJob(2211);
                    break;
                case 40:
                    changeJob(2212);
                    break;
                case 50:
                    changeJob(2213);
                    break;
                case 60:
                    changeJob(2214);
                    break;
                case 80:
                    changeJob(2215);
                    break;
                case 100:
                    changeJob(2216);
                    break;
                case 120:
                    changeJob(2217);
                    break;
                case 160:
                    changeJob(2218);
                    break;
            }
            if (oldJobId != getJob()) {
                if (!isGM()) {
                    WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[????????????] ???????????????????????? " + getName() + " ???????????? " + level + " ????????????????????????(???)???????????????"));
                } else {
                    dropMessage(5, "[????????????] ????????????????????? " + level + " ?????????????????????????????????: " + MapleCarnivalChallenge.getJobNameByIdNull(getJob()));
                }
            }
        }

        if (JobConstants.is????????????(getJob()) && getSkillLevel(????????????.???????????????) > 0) {
            if (coreAura == null) {
                coreAura = MapleCoreAura.createCoreAura(id, level);
            } else {
                coreAura.setLevel(level);
            }
//            updataCoreAura();
        }
        //if (map.getForceMove() > 0 && map.getForceMove() <= getLevel()) {
        //    changeMap(map.getReturnMap(), map.getReturnMap().getPortal(0));
        //    dropMessage(-1, "You have been expelled from the map.");
        //}

        //????????????
        int tecahskill = JobConstants.getTecahSkillID(job);
        if (tecahskill != -1) {
            if (level >= 70 && level < 120) {
                if (!hasSkill(skills, tecahskill, 1)) {
                    changeSingleSkillLevel(SkillFactory.getSkill(tecahskill), (byte) 1, (byte) 1);
                }
            } else if (level >= 120 && level < 210) {
                if (!hasSkill(skills, tecahskill, 2)) {
                    changeSingleSkillLevel(SkillFactory.getSkill(tecahskill), (byte) 2, (byte) 2);
                }
            } else if (level >= 210) {
                if (!hasSkill(skills, tecahskill, 3)) {
                    changeSingleSkillLevel(SkillFactory.getSkill(tecahskill), (byte) 3, (byte) 3);
                }
            }
        }
        insertRanking("????????????", level);
    }

    public boolean canLevelUp() {
        boolean canLevelUp = true;
        String textinfo = "";
        switch (getJob()) {
            case 0:
            case 1000: // ?????????0???
            case 2000: // ????????????0???
            case 2001: // ????????????0???
            case 3000: // ???????????????0???
            case 2002: // ????????????0???
            case 3001: // ????????????0???
            case 6000: // ????????????
            case 6001: // ??????
            case 5000: // ?????????
            case 2003:
            case 2004:
            case 2005: // ??????
            case 11000:// ?????????
            case 4001:
            case 4002:
            case 14000: //????????????
                if (getLevel() >= 10) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            // ?????????1???
            case 100:
            case 200:
            case 300:
            case 500:
            // ?????????1???
            case 1100:
            case 1200:
            case 1300:
            case 1400:
            case 1500:
            case 2100: // ????????????1???
            case 2210: // ????????????2???
            case 2300: // ????????????1???
            case 3200: // ????????????1???
            case 3300: // ????????????1???
            case 3500: // ????????????1???
            case 501:  // ?????????1???
            case 3100: // ????????????1???
            case 3101: // ???????????????1???
            case 6100:
            case 6500:
            case 5100:
            case 3600:
            case 508://????????????
            case 2700:
            case 2400:
            case 2500: // ??????1??? 
            case 4100:
            case 4200:
            case 14200: //????????????1???
            {
                if (getLevel() >= 30) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            // ?????????2???
            case 110:
            case 120:
            case 130:
            case 210:
            case 220:
            case 230:
            case 310:
            case 320:
            case 410:
            case 420:
            case 510:
            case 520:
            // ?????????2???
            case 1110:
            case 1210:
            case 1310:
            case 1410:
            case 1510:
            case 2110: // ????????????2???
            case 3210: // ????????????2???
            case 3310: // ????????????2???
            case 3510: // ????????????2???
            case 530:  // ?????????2???
            case 2310: // ????????????2???
            case 3110: // ????????????2???
            case 3120:
            case 6510:
            case 6110:
            case 5110:
            case 3610:
            case 570:
            case 2710:
            case 2410:
            case 2510: // ??????2??? 
            case 4110:
            case 4210:
            case 14210: //????????????2???
            {
                if (getLevel() >= 60) {
                    canLevelUp = false;
                    //textinfo = "????????????????????????????????????????????????????????????????????????????????????????????????????????????";
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            // ?????????3???
            case 111:
            case 121:
            case 131:
            case 211:
            case 221:
            case 231:
            case 311:
            case 321:
            case 411:
            case 421:
            case 511:
            case 521:
            // ?????????3???
            case 1111:
            case 1211:
            case 1311:
            case 1411:
            case 1511:
            case 2111: // ????????????3???
            case 3211: // ????????????3???
            case 3311: // ????????????3???
            case 3511: // ????????????3???
            case 531:  // ?????????3???
            case 2311: // ????????????3???
            case 3111: // ????????????3???
            case 3121:
            case 6111:
            case 6511:
            case 5111:
            case 3611:
            case 571:
            case 2711:
            case 2411:
            case 2511: // ??????3??? 
            case 4111:
            case 4211:
            case 14211: //????????????3???
            {
                if (getLevel() >= 100) {
                    canLevelUp = false;
                    //textinfo = "??????????????????????????????????????????????????????????????????????????????????????????????????????";
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            //??????
            case 400: {
                //???????????????????????????????????????
                if (getSubcategory() == 1) {
                    if (getLevel() >= 20) {
                        canLevelUp = false;
                        textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                    }
                } else if (getLevel() >= 30) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            case 430: {
                if (getLevel() >= 30) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            case 431: {
                if (getLevel() >= 45) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            case 432: {
                if (getLevel() >= 60) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
            case 433: {
                if (getLevel() >= 100) {
                    canLevelUp = false;
                    textinfo = "????????????????????????????????????????????????????????????????????????????????????";
                }
                break;
            }
        }
        if (!canLevelUp) {
            dropMessage(5, "[????????????] " + textinfo); // ????????????????????????????????????
            return false;
        }
        return true;
    }

    public boolean isValidJob(int id) {
        return MapleCarnivalChallenge.getJobNameByIdNull(id) != null;
    }

    /*
     * ??????????????????
     */
    public void changeKeybinding(int key, byte type, int action) {
        if (type != 0) {
            keylayout.Layout().put(key, new Pair<>(type, action));
        } else {
            keylayout.Layout().remove(key);
        }
    }

    /*
     * ?????????????????????
     */
    public void sendMacros() {
        client.getSession().write(MaplePacketCreator.getMacros(skillMacros));
    }

    public void updateMacros(int position, SkillMacro updateMacro) {
        skillMacros[position] = updateMacro;
        changed_skillmacros = true;
    }

    public SkillMacro[] getMacros() {
        return skillMacros;
    }

    /*
     * ??????????????????
     */
    public void tempban(String reason, Calendar duration, int greason, boolean IPMac) {
        if (IPMac) {
            client.banMacs();
        }
        client.getSession().write(MaplePacketCreator.GMPoliceMessage());
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            if (IPMac) {
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, client.getSession().getRemoteAddress().toString().split(":")[0]);
                ps.execute();
                ps.close();
            }
            client.disconnect(true, false);
            client.getSession().close(true);
            ps = con.prepareStatement("UPDATE accounts SET tempban = ?, banreason = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(duration.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setString(2, reason);
            ps.setInt(3, greason);
            ps.setInt(4, accountid);
            ps.execute();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("Error while tempbanning" + ex);
        }
    }

    /*
     * ????????????
     */
    public boolean ban(String reason, boolean IPMac, boolean autoban, boolean hellban) {
        gainWarning(false);
        client.getSession().write(MaplePacketCreator.GMPoliceMessage());
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE id = ?");
            ps.setInt(1, autoban ? 2 : 1);
            ps.setString(2, reason);
            ps.setInt(3, accountid);
            ps.execute();
            ps.close();
            if (IPMac) {
                client.banMacs();
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, client.getSessionIPAddress());
                ps.execute();
                ps.close();
                if (hellban) {
                    PreparedStatement psa = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                    psa.setInt(1, accountid);
                    ResultSet rsa = psa.executeQuery();
                    if (rsa.next()) {
                        PreparedStatement pss = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE email = ? OR SessionIP = ?");
                        pss.setInt(1, autoban ? 2 : 1);
                        pss.setString(2, reason);
                        pss.setString(3, rsa.getString("email"));
                        pss.setString(4, client.getSessionIPAddress());
                        pss.execute();
                        pss.close();
                    }
                    rsa.close();
                    psa.close();
                }
            }
        } catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
            return false;
        }
        client.disconnect(true, false);
        client.getSession().close(true);
        return true;
    }

    public static boolean ban(String id, String reason, boolean accountId, int gmlevel, boolean hellban) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            if (id.matches("/[0-9]{1,3}\\..*")) {
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, id);
                ps.execute();
                ps.close();
                return true;
            }
            if (accountId) {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            } else {
                ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            }
            boolean ret = false;
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int z = rs.getInt(1);
                PreparedStatement psb = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE id = ? AND gm < ?");
                psb.setString(1, reason);
                psb.setInt(2, z);
                psb.setInt(3, gmlevel);
                psb.execute();
                psb.close();
                if (gmlevel > 100) { //?????????????????????????????? ????????????????????????
                    PreparedStatement psa = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                    psa.setInt(1, z);
                    ResultSet rsa = psa.executeQuery();
                    if (rsa.next()) {
                        String sessionIP = rsa.getString("sessionIP");
                        if (sessionIP != null && sessionIP.matches("/[0-9]{1,3}\\..*")) {
                            PreparedStatement psz = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                            psz.setString(1, sessionIP);
                            psz.execute();
                            psz.close();
                        }
                        String macData = rsa.getString("macs");
                        if (macData != null && !macData.equalsIgnoreCase("00-00-00-00-00-00") && macData.length() >= 17) {
                            PreparedStatement psm = con.prepareStatement("INSERT INTO macbans VALUES (DEFAULT, ?)");
                            psm.setString(1, macData);
                            psm.execute();
                            psm.close();
                        }
                        if (hellban) {
                            PreparedStatement pss = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE email = ?" + (sessionIP == null ? "" : " OR SessionIP = ?"));
                            pss.setString(1, reason);
                            pss.setString(2, rsa.getString("email"));
                            if (sessionIP != null) {
                                pss.setString(3, sessionIP);
                            }
                            pss.execute();
                            pss.close();
                        }
                    }
                    rsa.close();
                    psa.close();
                }
                ret = true;
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
        }
        return false;
    }

    /**
     * ??????ID??????????????????ID????????????CID
     *
     * @return ??????ID
     */
    @Override
    public int getObjectId() {
        return getId();
    }

    /**
     * ???????????????????????????????????????OID?????????
     *
     * @param id
     */
    @Override
    public void setObjectId(int id) {
        throw new UnsupportedOperationException();
    }

    public MapleStorage getStorage() {
        return storage;
    }

    /**
     * ???????????????????????????
     *
     * @param mo
     */
    public void addVisibleMapObject(MapleMapObject mo) {
        visibleMapObjectsLock.writeLock().lock();
        try {
            visibleMapObjects.add(mo);
        } finally {
            visibleMapObjectsLock.writeLock().unlock();
        }
    }

    /**
     * ???????????????????????????
     *
     * @param mo
     */
    public void removeVisibleMapObject(MapleMapObject mo) {
        visibleMapObjectsLock.writeLock().lock();
        try {
            visibleMapObjects.remove(mo);
        } finally {
            visibleMapObjectsLock.writeLock().unlock();
        }
    }

    /**
     * ??????????????????????????????
     *
     * @param mo ????????????
     * @return true = ??????????????? : false = ??????????????????
     */
    public boolean isMapObjectVisible(MapleMapObject mo) {
        visibleMapObjectsLock.readLock().lock();
        try {
            return visibleMapObjects.contains(mo);
        } finally {
            visibleMapObjectsLock.readLock().unlock();
        }
    }

    public Collection<MapleMapObject> getAndWriteLockVisibleMapObjects() {
        visibleMapObjectsLock.writeLock().lock();
        return visibleMapObjects;
    }

    public void unlockWriteVisibleMapObjects() {
        visibleMapObjectsLock.writeLock().unlock();
    }

    public boolean isAlive() {
        return stats.getHp() > 0;
    }

    /**
     * ?????????????????????????????????????????????
     *
     * @param client ?????????
     */
    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removePlayerFromMap(this.getObjectId()));
    }

    /**
     * ?????????????????????????????????????????????
     *
     * @param client ?????????
     */
    @Override
    public void sendSpawnData(MapleClient client) {
        if (client.getPlayer().allowedToTarget(this)) {
            //????????????
            client.getSession().write(MaplePacketCreator.spawnPlayerMapobject(this));
            client.getSession().write(EffectPacket.getEffectSwitch(getId(), getEffectSwitch()));
            //????????????HP
            if (getParty() != null) {
                updatePartyMemberHP();
                receivePartyMemberHP();
            }
            //????????????
            if (dragon != null) {
                client.getSession().write(SummonPacket.spawnDragon(dragon));
            }
            if (lw != null) {
                client.getSession().write(SummonPacket.spawnLittleWhite(lw));
            }
            //????????????
            if (android != null) {
                client.getSession().write(AndroidPacket.spawnAndroid(this, android));
            }
            if (summonedFamiliar != null) {
                client.getSession().write(MaplePacketCreator.spawnFamiliar(summonedFamiliar, true));
            }
            if (summons != null && summons.size() > 0) {
                summonsLock.readLock().lock();
                try {
                    for (MapleSummon summon : summons) {
                        if (summon.getOwner() != null) {
                            client.getSession().write(SummonPacket.spawnSummon(summon, false));
                        }
                    }
                } finally {
                    summonsLock.readLock().unlock();
                }
            }
            if (followid > 0 && followon) {
                client.getSession().write(MaplePacketCreator.followEffect(followinitiator ? followid : id, followinitiator ? id : followid, null));
            }
        }
    }

    public void equipChanged() {
        if (map == null) {
            return;
        }
        map.broadcastMessage(this, MaplePacketCreator.updateCharLook(this), false);
        stats.recalcLocalStats(this);
        if (getMessenger() != null) {
            WorldMessengerService.getInstance().updateMessenger(getMessenger().getId(), getName(), client.getChannel());
        }
    }

    /*
     * ????????????????????????????????????????????????
     * ??????????????????????????????
     */
    public void checkCopyItems() {
        //?????????????????????
        List<Integer> equipOnlyIds = new ArrayList<>(); //[???????????????ID??????]
        Map<Integer, Integer> checkItems = new HashMap<>(); //[????????????ID ??????ID]
        //???????????????????????????
        for (Item item : getInventory(MapleInventoryType.EQUIP).list()) {
            int equipOnlyId = item.getEquipOnlyId();
            if (equipOnlyId > 0) {
                if (checkItems.containsKey(equipOnlyId)) { //?????????????????????ID??????
                    if (checkItems.get(equipOnlyId) == item.getItemId()) {
                        equipOnlyIds.add(equipOnlyId);
                    }
                } else {
                    checkItems.put(equipOnlyId, item.getItemId());
                }
            }
        }
        //?????????????????????
        for (Item item : getInventory(MapleInventoryType.EQUIPPED).list()) {
            int equipOnlyId = item.getEquipOnlyId();
            if (equipOnlyId > 0) {
                if (checkItems.containsKey(equipOnlyId)) { //?????????????????????ID??????
                    if (checkItems.get(equipOnlyId) == item.getItemId()) {
                        equipOnlyIds.add(equipOnlyId);
                    }
                } else {
                    checkItems.put(equipOnlyId, item.getItemId());
                }
            }
        }
        //?????????????????????ID????????????0
        boolean autoban = false;
        for (Integer equipOnlyId : equipOnlyIds) {
            MapleInventoryManipulator.removeAllByEquipOnlyId(client, equipOnlyId.intValue());
            autoban = true;
        }
        if (autoban) {
            AutobanManager.getInstance().autoban(client, "?????????.");
        }
        checkItems.clear();
        equipOnlyIds.clear();
    }

    /*
     * ???????????????????????????
     */
    public List<MaplePet> getPets() {
        List<MaplePet> ret = new ArrayList<>();
        Iterator<Item> itera = getInventory(MapleInventoryType.CASH).newList().iterator();
        while (itera.hasNext()) {
            Item item = itera.next();
            if (item.getPet() != null) {
                ret.add(item.getPet());
            }
        }
        return ret;
    }

    /*
     * ?????????????????????????????????
     */
    public MaplePet[] getSpawnPets() {
        return spawnPets;
    }

    public MaplePet getSpawnPet(int index) {
        return spawnPets[index];
    }

    public byte getPetIndex(int petId) {
        for (byte i = 0; i < 3; i++) {
            if (spawnPets[i] != null && spawnPets[i].getUniqueId() == petId) {
                return i;
            }
        }
        return -1;
    }

    public byte getPetIndex(MaplePet pet) {
        for (byte i = 0; i < 3; i++) {
            if (spawnPets[i] != null && spawnPets[i].getUniqueId() == pet.getUniqueId()) {
                return i;
            }
        }
        return -1;
    }

    public byte getPetByItemId(int petItemId) {
        for (byte i = 0; i < 3; i++) {
            if (spawnPets[i] != null && spawnPets[i].getPetItemId() == petItemId) {
                return i;
            }
        }
        return -1;
    }

    public int getNextEmptyPetIndex() {
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] == null) {
                return i;
            }
        }
        return 3;
    }

    public int getNoPets() {
        int ret = 0;
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] != null) {
                ret++;
            }
        }
        return ret;
    }

    public List<MaplePet> getSummonedPets() {
        List<MaplePet> ret = new ArrayList<>();
        for (byte i = 0; i < 3; i++) {
            if (spawnPets[i] != null && spawnPets[i].getSummoned()) {
                ret.add(spawnPets[i]);
            }
        }
        return ret;
    }

    public void addSpawnPet(MaplePet pet) {
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] == null) {
                spawnPets[i] = pet;
                pet.setSummoned((byte) (i + 1));
                return;
            }
        }
    }

    public void removeSpawnPet(MaplePet pet, boolean shiftLeft) {
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] != null) {
                if (spawnPets[i].getUniqueId() == pet.getUniqueId()) {
                    spawnPets[i] = null;
                    break;
                }
            }
        }
    }

    public void unequipAllSpawnPets() {
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] != null) {
                unequipSpawnPet(spawnPets[i], true, false);
            }
        }
    }

    public void spawnPet(byte slot) {
        spawnPet(slot, false, true);
    }

    public void spawnPet(byte slot, boolean lead) {
        spawnPet(slot, lead, true);
    }

    /**
     * ????????????
     *
     * @param slot ???????????????????????????
     * @param lead ?????????????????????
     * @param broadcast ???????????????????????????
     */
    public void spawnPet(byte slot, boolean lead, boolean broadcast) {
        Item item = getInventory(MapleInventoryType.CASH).getItem(slot);
        if (item == null || !ItemConstants.isPet(item.getItemId())) {
            client.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        switch (item.getItemId()) {
            case 5000047:   //??????
            case 5000028: { //?????????
                MaplePet pet = MaplePet.createPet(item.getItemId() + 1, MapleInventoryIdentifier.getInstance());
                if (pet != null) {
                    MapleInventoryManipulator.addById(client, item.getItemId() + 1, (short) 1, item.getOwner(), pet, 90, "??????????????????: " + item.getItemId() + " ??????: " + FileoutputUtil.CurrentReadable_Date());
                    MapleInventoryManipulator.removeFromSlot(client, MapleInventoryType.CASH, slot, (short) 1, false);
                }
                break;
            }
            default: {
                MaplePet pet = item.getPet();
                if (pet != null && (item.getItemId() != 5000054 || pet.getSecondsLeft() > 0) && (item.getExpiration() == -1 || item.getExpiration() > System.currentTimeMillis())) {
                    if (getPetIndex(pet) != -1) { // Already summoned, let's keep it
                        unequipSpawnPet(pet, true, false);
                    } else {
                        int leadid = 8;
                        if (JobConstants.is?????????(getJob())) {
                            leadid = 10000018; //??????
                        } else if (JobConstants.is??????(getJob())) {
                            leadid = 20000024; //??????
                        } else if (JobConstants.is??????(getJob())) {
                            leadid = 20011024; //??????
                        } else if (JobConstants.is??????(getJob())) {
                            leadid = 40011024; //??????
                        } else if (JobConstants.is?????????(getJob())) {
                            leadid = 40021024; //??????
                        }
                        if ((getSkillLevel(SkillFactory.getSkill(leadid)) == 0 || getNoPets() == 3) && getSpawnPet(0) != null) {
                            unequipSpawnPet(getSpawnPet(0), false, false);
                        } else if (lead && getSkillLevel(SkillFactory.getSkill(leadid)) > 0) { // Follow the Lead
                            shiftPetsRight();
                        }
                        Point pos = getPosition();
                        pos.y -= 12;
                        pet.setPos(pos);
                        try {
                            pet.setFh(getMap().getFootholds().findBelow(pet.getPos(), true).getId());
                        } catch (NullPointerException e) {
                            pet.setFh(0); //lol, it can be fixed by movement
                        }
                        pet.setStance(0);
                        if (getSkillLevel(pet.getBuffSkill()) == 0) { //?????????????????????BUFF?????????????????????0
                            pet.setBuffSkill(0);
                        }
                        pet.setCanPickup(getIntRecord(GameConstants.ALLOW_PET_LOOT) > 0);
                        addSpawnPet(pet);
                        if (getMap() != null) {
                            petUpdateStats(pet, true);
                            getMap().broadcastMessage(this, PetPacket.showPet(this, pet, false, false), true);
                            client.getSession().write(PetPacket.loadExceptionList(this, pet));
                            //client.getSession().write(PetPacket.petStatUpdate(this));
                            checkPetSkill();
                        }
                    }
                }
                break;
            }
        }
        client.getSession().write(MaplePacketCreator.enableActions());
    }

    public void unequipSpawnPet(MaplePet pet, boolean shiftLeft, boolean hunger) {
        if (getSpawnPet(getPetIndex(pet)) != null) {
            getSpawnPet(getPetIndex(pet)).setSummoned((byte) 0);
            getSpawnPet(getPetIndex(pet)).saveToDb();
        }
        petUpdateStats(pet, false);
        if (map != null) {
            map.broadcastMessage(this, PetPacket.showPet(this, pet, true, hunger), true);
        }
        removeSpawnPet(pet, shiftLeft);
        checkPetSkill();
        //List<Pair<MapleStat, Integer>> stats = new ArrayList<Pair<MapleStat, Integer>>();
        //stats.put(MapleStat.??????, Integer.valueOf(0)));
        //showpetupdate isn't done here...
        //client.getSession().write(PetPacket.petStatUpdate(this));
        client.getSession().write(MaplePacketCreator.enableActions());
    }

    public void shiftPetsRight() {
        if (spawnPets[2] == null) {
            spawnPets[2] = spawnPets[1];
            spawnPets[1] = spawnPets[0];
            spawnPets[0] = null;
        }
    }

    public void checkPetSkill() {
        Map<Integer, Integer> setHandling = new HashMap<>(); //????????????????????????
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (int i = 0; i < 3; i++) {
            if (spawnPets[i] != null) {
                int set = ii.getPetSetItemID(spawnPets[i].getPetItemId());
                if (set > 0) {
                    int value = 1;
                    if (setHandling.containsKey(set)) {
                        value += setHandling.get(set).intValue();
                    }
                    setHandling.put(set, value);
                }
            }
        }
        if (setHandling.isEmpty()) {
            Map<Skill, SkillEntry> chrSkill = new HashMap<>(getSkills());
            Map<Skill, SkillEntry> petSkill = new HashMap<>();
            for (Entry<Skill, SkillEntry> skill : chrSkill.entrySet()) {
                if (skill.getKey().isPetPassive()) {
                    petSkill.put(skill.getKey(), new SkillEntry((byte) 0, (byte) 0, -1));
                }
            }
            if (!petSkill.isEmpty()) { //???????????????????????????????????????
                changePetSkillLevel(petSkill);
            }
            return;
        }
        Map<Skill, SkillEntry> petSkillData = new HashMap<>();
        Iterator<Entry<Integer, Integer>> iter = setHandling.entrySet().iterator();
        while (iter.hasNext()) {
            Entry<Integer, Integer> entry = iter.next();
            StructSetItem setItem = ii.getSetItem(entry.getKey());
            if (setItem != null) {
                Map<Integer, StructSetItemStat> setItemStats = setItem.getSetItemStats();
                for (Entry<Integer, StructSetItemStat> ent : setItemStats.entrySet()) {
                    StructSetItemStat setItemStat = ent.getValue();
                    if (ent.getKey() <= entry.getValue()) {
                        if (setItemStat.skillId > 0 && setItemStat.skillLevel > 0 && getSkillLevel(setItemStat.skillId) <= 0) {
                            petSkillData.put(SkillFactory.getSkill(setItemStat.skillId), new SkillEntry((byte) setItemStat.skillLevel, (byte) 0, -1));
                        }
                    } else if (setItemStat.skillId > 0 && setItemStat.skillLevel > 0 && getSkillLevel(setItemStat.skillId) > 0) {
                        petSkillData.put(SkillFactory.getSkill(setItemStat.skillId), new SkillEntry((byte) 0, (byte) 0, -1));
                    }
                }
            }
        }
        if (!petSkillData.isEmpty()) {
            changePetSkillLevel(petSkillData);
        }
    }

    public long getLastFameTime() {
        return lastfametime;
    }

    public List<Integer> getFamedCharacters() {
        return lastmonthfameids;
    }

    public List<Integer> getBattledCharacters() {
        return lastmonthbattleids;
    }

    public FameStatus canGiveFame(MapleCharacter from) {
        if (lastfametime >= System.currentTimeMillis() - 60 * 60 * 24 * 1000) {
            return FameStatus.NOT_TODAY;
        } else if (from == null || lastmonthfameids == null || lastmonthfameids.contains(from.getId())) {
            return FameStatus.NOT_THIS_MONTH;
        }
        return FameStatus.OK;
    }

    public void hasGivenFame(MapleCharacter to) {
        lastfametime = System.currentTimeMillis();
        lastmonthfameids.add(to.getId());
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("INSERT INTO famelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, getId());
            ps.setInt(2, to.getId());
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            System.err.println("ERROR writing famelog for char " + getName() + " to " + to.getName() + e);
        }
    }

    public boolean canBattle(MapleCharacter to) {
        return !(to == null || lastmonthbattleids == null || lastmonthbattleids.contains(to.getAccountID()));
    }

    public void hasBattled(MapleCharacter to) {
        lastmonthbattleids.add(to.getAccountID());
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("INSERT INTO battlelog (accid, accid_to) VALUES (?, ?)");
            ps.setInt(1, getAccountID());
            ps.setInt(2, to.getAccountID());
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            System.err.println("ERROR writing battlelog for char " + getName() + " to " + to.getName() + e);
        }
    }

    public MapleKeyLayout getKeyLayout() {
        return this.keylayout;
    }

    public MapleQuickSlot getQuickSlot() {
        return this.quickslot;
    }

    public MapleParty getParty() {
        if (party == null) {
            return null;
        } else if (party.isDisbanded()) {
            party = null;
        }
        return party;
    }

    public byte getWorld() {
        return world;
    }

    public void setWorld(byte world) {
        this.world = world;
    }

    public void setParty(MapleParty party) {
        this.party = party;
    }

    public MapleTrade getTrade() {
        return trade;
    }

    public void setTrade(MapleTrade trade) {
        this.trade = trade;
    }

    public EventInstanceManager getEventInstance() {
        return eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public void addDoor(MapleDoor door) {
        doors.add(door);
    }

    public void clearDoors() {
        doors.clear();
    }

    public List<MapleDoor> getDoors() {
        return new ArrayList<>(doors);
    }

    public void addMechDoor(MechDoor door) {
        mechDoors.add(door);
    }

    public void clearMechDoors() {
        mechDoors.clear();
    }

    public List<MechDoor> getMechDoors() {
        return new ArrayList<>(mechDoors);
    }

    public void setSmega() {
        if (smega) {
            smega = false;
            dropMessage(5, "You have set megaphone to disabled mode");
        } else {
            smega = true;
            dropMessage(5, "You have set megaphone to enabled mode");
        }
    }

    public boolean getSmega() {
        return smega;
    }

    public int getChair() {
        return chair;
    }

    public int getItemEffect() {
        return itemEffect;
    }

    public int getTitleEffect() {
        return titleEffect;
    }

    public void setChair(int chair) {
        this.chair = chair;
        stats.relocHeal(this);
    }

    public void setItemEffect(int itemEffect) {
        this.itemEffect = itemEffect;
    }

    public void setTitleEffect(int titleEffect) {
        this.titleEffect = titleEffect;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.PLAYER;
    }

    public int getFamilyId() {
        if (mfc == null) {
            return 0;
        }
        return mfc.getFamilyId();
    }

    public int getSeniorId() {
        if (mfc == null) {
            return 0;
        }
        return mfc.getSeniorId();
    }

    public int getJunior1() {
        if (mfc == null) {
            return 0;
        }
        return mfc.getJunior1();
    }

    public int getJunior2() {
        if (mfc == null) {
            return 0;
        }
        return mfc.getJunior2();
    }

    public int getCurrentRep() {
        return currentrep;
    }

    public int getTotalRep() {
        return totalrep;
    }

    public void setCurrentRep(int newRank) {
        currentrep = newRank;
        if (mfc != null) {
            mfc.setCurrentRep(newRank);
        }
    }

    public void setTotalRep(int newRank) {
        totalrep = newRank;
        if (mfc != null) {
            mfc.setTotalRep(newRank);
        }
    }

    public int getTotalWins() {
        return totalWins;
    }

    public int getTotalLosses() {
        return totalLosses;
    }

    public void increaseTotalWins() {
        totalWins++;
    }

    public void increaseTotalLosses() {
        totalLosses++;
    }

    public int getGuildId() {
        return guildid;
    }

    public byte getGuildRank() {
        return guildrank;
    }

    public int getGuildContribution() {
        return guildContribution;
    }

    public void setGuildId(int newGuildId) {
        guildid = newGuildId;
        if (guildid > 0) {
            if (mgc == null) {
                mgc = new MapleGuildCharacter(this);
            } else {
                mgc.setGuildId(guildid);
            }
        } else {
            mgc = null;
            guildContribution = 0;
        }
    }

    public void setGuildRank(byte newRank) {
        guildrank = newRank;
        if (mgc != null) {
            mgc.setGuildRank(newRank);
        }
    }

    public void setGuildContribution(int newContribution) {
        this.guildContribution = newContribution;
        if (mgc != null) {
            mgc.setGuildContribution(newContribution);
        }
    }

    public MapleGuildCharacter getMGC() {
        return mgc;
    }

    public void setAllianceRank(byte newRank) {
        allianceRank = newRank;
        if (mgc != null) {
            mgc.setAllianceRank(newRank);
        }
    }

    public byte getAllianceRank() {
        return allianceRank;
    }

    public MapleGuild getGuild() {
        if (getGuildId() <= 0) {
            return null;
        }
        return WorldGuildService.getInstance().getGuild(getGuildId());
    }

    public void setJob(int jobId) {
        this.job = (short) jobId;
    }

    public void sidekickUpdate() {
        if (sidekick == null) {
            return;
        }
        sidekick.getCharacter(sidekick.getCharacter(0).getId() == getId() ? 0 : 1).update(this);
        if (!MapleSidekick.checkLevels(getLevel(), sidekick.getCharacter(sidekick.getCharacter(0).getId() == getId() ? 1 : 0).getLevel())) {
            sidekick.eraseToDB();
        }
    }

    public void guildUpdate() {
        if (guildid <= 0) {
            return;
        }
        mgc.setLevel(level);
        mgc.setJobId(job);
        WorldGuildService.getInstance().memberLevelJobUpdate(mgc);
    }

    public void saveGuildStatus() {
        MapleGuild.setOfflineGuildStatus(guildid, guildrank, guildContribution, allianceRank, id);
    }

    public void familyUpdate() {
        if (mfc == null) {
            return;
        }
        WorldFamilyService.getInstance().memberFamilyUpdate(mfc, this);
    }

    public void saveFamilyStatus() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET familyid = ?, seniorid = ?, junior1 = ?, junior2 = ? WHERE id = ?");
            if (mfc == null) {
                ps.setInt(1, 0);
                ps.setInt(2, 0);
                ps.setInt(3, 0);
                ps.setInt(4, 0);
            } else {
                ps.setInt(1, mfc.getFamilyId());
                ps.setInt(2, mfc.getSeniorId());
                ps.setInt(3, mfc.getJunior1());
                ps.setInt(4, mfc.getJunior2());
            }
            ps.setInt(5, id);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
            System.out.println("SQLException: " + se.getLocalizedMessage());
        }
        //MapleFamily.setOfflineFamilyStatus(familyid, seniorid, junior1, junior2, currentrep, totalrep, id);
    }

    public void modifyCSPoints(int type, int quantity) {
        modifyCSPoints(type, quantity, false);
    }

    public void modifyCSPoints(int type, int quantity, boolean show) {
        switch (type) {
            case 1:
                if (getACash() + quantity < 0) {
                    if (show) {
                        dropMessage(-1, "You have gained the max cash. No cash will be awarded.");
                    }
//                    ban(getName() + " ??????????????????", false, true, false);
                    return;
                }
                setACash(getACash() + quantity);
                break;
            case 2:
                if (getMaplePoints() + quantity < 0) {
                    if (show) {
                        dropMessage(-1, "You have gained the max maple points. No cash will be awarded.");
                    }
//                    ban(getName() + " ?????????????????????", false, true, false);
                    return;
                }
                setMaplePoints(getMaplePoints() + quantity);
                break;
            default:
                break;
        }
        if (show && quantity != 0) {
            dropMessage(-1, "???" + (quantity > 0 ? "????????? " : "????????? ") + Math.abs(quantity) + (type == 1 ? " ??????." : " ?????????."));
            //client.getSession().write(MaplePacketCreator.showSpecialEffect(21));
        }
        client.getSession().write(MaplePacketCreator.showCharCash(this));
    }

    public int getCSPoints(int type) {
        //System.out.println("????????????CSPoints ??????: " + acash + " ?????????: " + maplepoints + " ??????: " + type);
        switch (type) {
            case 1:
                return getACash();
            case 2:
                return getMaplePoints();
            case -1:
                return getACash() + getMaplePoints();
            default:
                return 0;
        }
    }

    public int getTotalRMB() {
        int rmb = 0;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT SUM(rmb) FROM paylog WHERE account = ?");
            ps.setString(1, getClient().getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                rmb = rs.getInt(1);
            }
            ps.close();
        } catch (SQLException Ex) {
            log.error("??????????????????????????????.", Ex);
        }
        return rmb;
    }

    public List<Pair<String, Integer>> getTotalRMBRanking(int limit) {
        List<Pair<String, Integer>> ret = new LinkedList<>();
        try {
            Calendar c = Calendar.getInstance();
            c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), 1, 0, 0, 0);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT account, SUM(rmb) FROM paylog WHERE date(`paytime`) >= ? GROUP BY account ORDER BY rmb DESC LIMIT ?");
            ps.setString(1, sdf.format(c.getTime().getTime()));
            ps.setInt(2, limit);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ret.add(new Pair<>(rs.getString("account"), rs.getInt("rmb")));
            }
            ps.close();
        } catch (SQLException Ex) {
            log.error("??????????????????????????????.", Ex);
        }
        return ret;
    }

    public int getRMB() {
        int point = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT rmb FROM accounts WHERE name = ?");
            ps.setString(1, getClient().getAccountName());
            rs = ps.executeQuery();
            if (rs.next()) {
                point = rs.getInt("rmb");
            }
            ps.close();
            rs.close();
        } catch (final SQLException ex) {
            log.error("????????????rmb?????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex1) {
                log.error("????????????rmb?????????" + ex1);
            }
        }
        return point;
    }

    public void setRMB(final int point) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET rmb = ? WHERE name = ?");
            ps.setInt(1, point);
            ps.setString(2, getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            log.error("????????????rmb?????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex1) {
                log.error("????????????rmb?????????" + ex1);
            }
        }
    }

    public void gainRMB(final int point) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET rmb = rmb + ? WHERE name = ?");
            ps.setInt(1, point);
            ps.setString(2, getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            log.error("????????????rmb?????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex1) {
                log.error("????????????rmb?????????" + ex1);
            }
        }
    }

    public boolean hasEquipped(int itemid) {
        return inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid) >= 1;
    }

    public boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        MapleInventoryType type = ItemConstants.getInventoryType(itemid);
        int possesed = inventory[type.ordinal()].countById(itemid);
        if (checkEquipped && type == MapleInventoryType.EQUIP) {
            possesed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        if (greaterOrEquals) {
            return possesed >= quantity;
        } else {
            return possesed == quantity;
        }
    }

    public boolean haveItem(int itemid, int quantity) {
        return haveItem(itemid, quantity, true, true);
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1, true, true);
    }

    /*
     * ???????????????????????????
     */
    public int getItemQuantity(int itemid) {
        MapleInventoryType type = ItemConstants.getInventoryType(itemid);
        return getInventory(type).countById(itemid);
    }

    /*
     * ????????????????????????????????????????????????????????????
     */
    public int getItemQuantity(int itemid, boolean checkEquipped) {
        int possesed = inventory[ItemConstants.getInventoryType(itemid).ordinal()].countById(itemid);
        if (checkEquipped) {
            possesed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        return possesed;
    }

    public int getEquipId(byte slot) {
        MapleInventory equip = getInventory(MapleInventoryType.EQUIP);
        return equip.getItem(slot).getItemId();
    }

    public int getUseId(byte slot) {
        MapleInventory use = getInventory(MapleInventoryType.USE);
        return use.getItem(slot).getItemId();
    }

    public int getSetupId(byte slot) {
        MapleInventory setup = getInventory(MapleInventoryType.SETUP);
        return setup.getItem(slot).getItemId();
    }

    public int getCashId(byte slot) {
        MapleInventory cash = getInventory(MapleInventoryType.CASH);
        return cash.getItem(slot).getItemId();
    }

    public int getEtcId(byte slot) {
        MapleInventory etc = getInventory(MapleInventoryType.ETC);
        return etc.getItem(slot).getItemId();

    }

    public enum FameStatus {

        OK,
        NOT_TODAY,
        NOT_THIS_MONTH
    }

    /*
     * ??????
     */
    public byte getBuddyCapacity() {
        return buddylist.getCapacity();
    }

    public void setBuddyCapacity(byte capacity) {
        buddylist.setCapacity(capacity);
        client.getSession().write(BuddyListPacket.updateBuddyCapacity(capacity));
    }

    /*
     * ????????????
     */
    public MapleMessenger getMessenger() {
        return messenger;
    }

    public void setMessenger(MapleMessenger messenger) {
        this.messenger = messenger;
    }

    /*
     * ???????????????
     */
    public List<MapleSummon> getSummonsReadLock() {
        summonsLock.readLock().lock();
        return summons;
    }

    public int getSummonsSize() {
        return summons.size();
    }

    public void unlockSummonsReadLock() {
        summonsLock.readLock().unlock();
    }

    public void addSummon(MapleSummon s) {
        summonsLock.writeLock().lock();
        try {
            summons.add(s);
        } finally {
            summonsLock.writeLock().unlock();
        }
    }

    public void removeSummon(MapleSummon s) {
        summonsLock.writeLock().lock();
        try {
            summons.remove(s);
        } finally {
            summonsLock.writeLock().unlock();
        }
    }

    /**
     * **
     * ??????????????????????????????
     *
     * @param Skillid
     */
    public void removeSummon(int Skillid) {
        summonsLock.writeLock().lock();
        MapleSummon delet = null;
        try {
            for (MapleSummon su : summons) {
                if (su.getSkillId() == Skillid) {
                    delet = su;
                }
            }
            if (delet != null) {
                getMap().broadcastMessage(SummonPacket.removeSummon(delet, true));
                getMap().removeMapObject(delet);
                removeVisibleMapObject(delet);
                summons.remove(delet);
            }
        } finally {
            summonsLock.writeLock().unlock();
        }
    }

    /**
     * ????????????????????????????????????
     */
    public boolean hasSummonBySkill(int skillId) {
        if (summons == null || summons.isEmpty()) {
            return false;
        }
        summonsLock.readLock().lock();
        try {
            for (MapleSummon summon : summons) {
                if (summon.getSkillId() == skillId) {
                    return true;
                }
            }
        } finally {
            summonsLock.readLock().unlock();
        }
        return false;
    }

    /**
     * ????????????ID??????????????????
     *
     * @param skillId
     * @return
     */
    public MapleSummon getSummonBySkill(int skillId) {
        if (hasSummonBySkill(skillId)) {
            summonsLock.readLock().lock();
            try {
                for (MapleSummon summon : summons) {
                    if (summon.getSkillId() == skillId) {
                        return summon;
                    }
                }
            } finally {
                summonsLock.readLock().unlock();
            }
        }
        return null;
    }

    /*
     * ??????????????????
     */
    public void addCooldown(int skillId, long startTime, long length) {
        coolDowns.put(skillId, new MapleCoolDownValueHolder(skillId, startTime, length));
    }

    public boolean isSkillCooling(int skillid) {
        return coolDowns.containsKey(skillid);
    }

    public void removeCooldown(int skillId) {
        if (coolDowns.containsKey(skillId)) {
            coolDowns.remove(skillId);
        }
    }

    public void removeCooldown(int skillId, boolean show) {
        if (coolDowns.containsKey(skillId)) {
            coolDowns.remove(skillId);
            if (show) {
                client.getSession().write(MaplePacketCreator.skillCooldown(skillId, 0));
            }
        }
    }

    public boolean skillisCooling(int skillId) {
        return coolDowns.containsKey(skillId);
    }

    public void giveCoolDowns(int skillid, long starttime, long length) {
        addCooldown(skillid, starttime, length);
    }

    public void giveCoolDowns(List<MapleCoolDownValueHolder> cooldowns) {
        if (cooldowns != null) {
            for (MapleCoolDownValueHolder cooldown : cooldowns) {
                coolDowns.put(cooldown.skillId, cooldown);
            }
        } else {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT SkillID,StartTime,length FROM skills_cooldowns WHERE charid = ?");
                ps.setInt(1, getId());
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    if (rs.getLong("length") + rs.getLong("StartTime") - System.currentTimeMillis() <= 0) {
                        continue;
                    }
                    giveCoolDowns(rs.getInt("SkillID"), rs.getLong("StartTime"), rs.getLong("length"));
                }
                ps.close();
                rs.close();
                deleteWhereCharacterId(con, "DELETE FROM skills_cooldowns WHERE charid = ?");
            } catch (SQLException e) {
                System.err.println("Error while retriving cooldown from SQL storage");
            }
        }
    }

    public int getCooldownSize() {
        return coolDowns.size();
    }

    public List<MapleCoolDownValueHolder> getCooldowns() {
        List<MapleCoolDownValueHolder> ret = new ArrayList<>();
        for (MapleCoolDownValueHolder mc : coolDowns.values()) {
            if (mc != null) {
                ret.add(mc);
            }
        }
        return ret;
    }

    /*
     * ??????????????????BUFF??????
     */
    public List<MapleDiseaseValueHolder> getAllDiseases() {
        return new ArrayList<>(diseases.values());
    }

    public boolean hasDisease(MapleDisease dis) {
        return diseases.containsKey(dis);
    }

    public void giveDebuff(MapleDisease disease, MobSkill skill) {
        if (!ServerConfig.applyDebuff) {
            return;
        }
        giveDebuff(disease, skill.getX(), skill.getDuration(), skill.getSkillId(), skill.getSkillLevel());
    }

    public void giveDebuff(MapleDisease disease, int x, long duration, int skillid, int level) {
        if (!ServerConfig.applyDebuff) {
            return;
        }
        if (map != null && !hasDisease(disease)) {
            if (!(disease == MapleDisease.?????? || disease == MapleDisease.?????? || disease == MapleDisease.FLAG)) {
                if (getBuffedValue(MapleBuffStat.????????????) != null) {
                    return;
                }
            }
            int mC = getBuffSource(MapleBuffStat.????????????);
            if (mC > 0 && mC != ?????????.????????????_??????) { //missile tank can have debuffs
                return; //flamethrower and siege can't
            }
            MapleStatEffect effect = getStatForBuff(MapleBuffStat.??????????????????);
            if (effect != null) {
                int count = getBuffedValue(MapleBuffStat.??????????????????);
                if (count > 0) {
                    int newcount = count - 1;
                    if (newcount > 0) {
                        setBuffedValue(MapleBuffStat.??????????????????, newcount);
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.??????????????????, newcount));
                        int buffduration = 2100000000;
                        client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), buffduration, stat, effect, this));
                    } else {
                        cancelEffectFromBuffStat(MapleBuffStat.??????????????????);
                        if (effect.getSourceId() == ??????.??????????????????) {
                            client.getSession().write(MaplePacketCreator.skillCooldown(effect.getSourceId(), effect.getCooldown(this)));
                            addCooldown(effect.getSourceId(), System.currentTimeMillis(), effect.getCooldown(this) * 1000);
                        }
                    }
                    return;
                } else {
                    cancelEffectFromBuffStat(MapleBuffStat.??????????????????);
                    if (effect.getSourceId() == ??????.??????????????????) {
                        client.getSession().write(MaplePacketCreator.skillCooldown(effect.getSourceId(), effect.getCooldown(this)));
                        addCooldown(effect.getSourceId(), System.currentTimeMillis(), effect.getCooldown(this) * 1000);
                    }
                }
            }
            if (stats.ASR > 0 && Randomizer.nextInt(100) < stats.ASR) {
                return;
            }
            diseases.put(disease, new MapleDiseaseValueHolder(disease, System.currentTimeMillis(), duration - stats.decreaseDebuff));
            client.getSession().write(BuffPacket.giveDebuff(disease, x, skillid, level, (int) duration));
            map.broadcastMessage(this, BuffPacket.giveForeignDebuff(id, disease, skillid, level, x), false);
            if (x > 0 && disease == MapleDisease.??????) { //poison, subtract all HP
                addHP((int) -(x * ((duration - stats.decreaseDebuff) / 1000)));
            }
        }
    }

    /*
     * ??????????????????????????????????????? ???????????????BUFF ?????????????????????
     */
    public void giveSilentDebuff(List<MapleDiseaseValueHolder> ld) {
        if (ld != null) {
            for (MapleDiseaseValueHolder disease : ld) {
                diseases.put(disease.disease, disease);
            }
        }
    }

    public void dispelDebuff(MapleDisease debuff) {
        if (hasDisease(debuff)) {
            client.getSession().write(BuffPacket.cancelDebuff(debuff));
            map.broadcastMessage(this, BuffPacket.cancelForeignDebuff(id, debuff), false);
            diseases.remove(debuff);
        }
    }

    public void dispelDebuffs() {
        List<MapleDisease> diseasess = new ArrayList<>(diseases.keySet());
        for (MapleDisease d : diseasess) {
            dispelDebuff(d);
        }
    }

    public void cancelAllDebuffs() {
        diseases.clear();
    }

    public int getDiseaseSize() {
        return diseases.size();
    }

    public void setLevel(short newLevel) {
        if (newLevel <= 0) {
            newLevel = 1;
        }
        this.level = newLevel;
    }

    /*
     * ?????????????????????????????????
     */
    public void sendNote(String to, String msg) {
        sendNote(to, msg, 0);
    }

    public void sendNote(String to, String msg, int fame) {
        MapleCharacterUtil.sendNote(to, getName(), msg, fame);
    }

    public void showNote() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`=?", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ps.setString(1, getName());
            ResultSet rs = ps.executeQuery();
            rs.last();
            int count = rs.getRow();
            rs.first();
            client.getSession().write(MTSCSPacket.showNotes(rs, count));
            rs.close();
            ps.close();
        } catch (SQLException e) {
            System.err.println("Unable to show note" + e);
        }
    }

    public void deleteNote(int id, int fame) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT gift FROM notes WHERE `id`=?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (rs.getInt("gift") == fame && fame > 0) { //not exploited! hurray
                    addFame(fame);
                    updateSingleStat(MapleStat.??????, getFame());
                    client.getSession().write(MaplePacketCreator.getShowFameGain(fame));
                }
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("DELETE FROM notes WHERE `id`=?");
            ps.setInt(1, id);
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            System.err.println("Unable to delete note" + e);
        }
    }

    public int getMulungEnergy() {
        return mulung_energy;
    }

    public void mulung_EnergyModify(boolean inc) {
        if (inc) {
            if (mulung_energy + 100 > 10000) {
                mulung_energy = 10000;
            } else {
                mulung_energy += 100;
            }
        } else {
            mulung_energy = 0;
        }
        client.getSession().write(MaplePacketCreator.MulungEnergy(mulung_energy));
    }

    public void writeMulungEnergy() {
        client.getSession().write(MaplePacketCreator.MulungEnergy(mulung_energy));
    }

    public void writeEnergy(String type, String inc) {
        client.getSession().write(MaplePacketCreator.sendPyramidEnergy(type, inc));
    }

    public void writeStatus(String type, String inc) {
        client.getSession().write(MaplePacketCreator.sendGhostStatus(type, inc));
    }

    public void writePoint(String type, String inc) {
        client.getSession().write(MaplePacketCreator.sendGhostPoint(type, inc));
    }

    /*
     * ??????????????????
     */
    public int getAranCombo() {
        return aranCombo;
    }

    public void gainAranCombo(int count, boolean show) {
        int oldCombo = aranCombo;
        oldCombo += count;
        if (oldCombo < 0) {
            oldCombo = 0;
        }
        aranCombo = Math.min(30000, oldCombo);
        if (show) {
            client.getSession().write(MaplePacketCreator.ShowAranCombo(aranCombo));
        }
    }

    public long getLastComboTime() {
        return lastComboTime;
    }

    public void setLastComboTime(long time) {
        this.lastComboTime = time;
    }

    public long getKeyDownSkill_Time() {
        return keydown_skill;
    }

    public void setKeyDownSkill_Time(long keydown_skill) {
        this.keydown_skill = keydown_skill;
    }

    /*
     * ??????????????????
     */
    public void checkBerserk() { //berserk is special in that it doesn't use worldtimer :)
        if (job != 132 || lastBerserkTime < 0 || lastBerserkTime + 10000 > System.currentTimeMillis()) {
            return;
        }
        int skillId = ?????????.????????????;
        Skill BerserkX = SkillFactory.getSkill(skillId); //?????????.????????????
        int skilllevel = getTotalSkillLevel(BerserkX);
        if (skilllevel >= 1 && map != null) {
            lastBerserkTime = System.currentTimeMillis();
            MapleStatEffect ampStat = BerserkX.getEffect(skilllevel);
            stats.Berserk = stats.getHp() * 100 / stats.getCurrentMaxHp() >= ampStat.getX();
            client.getSession().write(EffectPacket.showOwnBuffEffect(skillId, 1, getLevel(), skilllevel, (byte) (stats.Berserk ? 1 : 0)));
            map.broadcastMessage(this, EffectPacket.showBuffeffect(getId(), skillId, 1, getLevel(), skilllevel, (byte) (stats.Berserk ? 1 : 0)), false);
        } else {
            lastBerserkTime = -1;
        }
    }

    /*
     * ??????????????????
     */
    public void check????????????() {
        if (job != 2711 && job != 2712) {
            return;
        }
        Skill skill = SkillFactory.getSkill(??????.????????????);
        int skilllevel = getTotalSkillLevel(skill);
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (skilllevel >= 1 && map != null) {
            if (effect == null || effect.getLevel() < skilllevel) {
                skill.getEffect(skilllevel).applyTo(this);
            }
        }
    }

    /*
     * ???????????????????????????
     */
    public void checkBloodContract() {
        if (!JobConstants.is???????????????(job)) {
            return;
        }
        Skill skill = SkillFactory.getSkill(???????????????.????????????);
        int skilllevel = getTotalSkillLevel(skill);
        if (skilllevel >= 1 && map != null) {
            skill.getEffect(skilllevel).applyTo(this);
        }
    }

    /*
     * ??????????????????????????????????????????
     */
    public void setMarketChalkboard(String text) {
        if (map == null) {
            return;
        }
        map.broadcastMessage(MTSCSPacket.useChalkboard(getId(), text));
        if (chalkSchedule != null) {
            chalkSchedule.cancel(false);
            chalkSchedule = null;
        }
        chalkSchedule = WorldTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                setChalkboard(null);
            }
        }, 4 * 1000);
    }

    public void setChalkboard(String text) {
        this.chalktext = text;
        if (map != null) {
            map.broadcastMessage(MTSCSPacket.useChalkboard(getId(), text));
        }
    }

    public String getChalkboard() {
        return chalktext;
    }

    public MapleMount getMount() {
        return mount;
    }

    public int[] getWishlist() {
        return wishlist;
    }

    public void clearWishlist() {
        for (int i = 0; i < 12; i++) {
            wishlist[i] = 0;
        }
        changed_wishlist = true;
    }

    public int getWishlistSize() {
        int ret = 0;
        for (int i = 0; i < 12; i++) {
            if (wishlist[i] > 0) {
                ret++;
            }
        }
        return ret;
    }

    public void setWishlist(int[] wl) {
        this.wishlist = wl;
        changed_wishlist = true;
    }

    public int[] getRocks() {
        return rocks;
    }

    public int getRockSize() {
        int ret = 0;
        for (int i = 0; i < 10; i++) {
            if (rocks[i] != 999999999) {
                ret++;
            }
        }
        return ret;
    }

    public void deleteFromRocks(int map) {
        for (int i = 0; i < 10; i++) {
            if (rocks[i] == map) {
                rocks[i] = 999999999;
                changed_trocklocations = true;
                break;
            }
        }
    }

    public void addRockMap() {
        if (getRockSize() >= 10) {
            return;
        }
        rocks[getRockSize()] = getMapId();
        changed_trocklocations = true;
    }

    public boolean isRockMap(int id) {
        for (int i = 0; i < 10; i++) {
            if (rocks[i] == id) {
                return true;
            }
        }
        return false;
    }

    public int[] getRegRocks() {
        return regrocks;
    }

    public int getRegRockSize() {
        int ret = 0;
        for (int i = 0; i < 5; i++) {
            if (regrocks[i] != 999999999) {
                ret++;
            }
        }
        return ret;
    }

    public void deleteFromRegRocks(int map) {
        for (int i = 0; i < 5; i++) {
            if (regrocks[i] == map) {
                regrocks[i] = 999999999;
                changed_trocklocations = true;
                break;
            }
        }
    }

    public void addRegRockMap() {
        if (getRegRockSize() >= 5) {
            return;
        }
        regrocks[getRegRockSize()] = getMapId();
        changed_trocklocations = true;
    }

    public boolean isRegRockMap(int id) {
        for (int i = 0; i < 5; i++) {
            if (regrocks[i] == id) {
                return true;
            }
        }
        return false;
    }

    public int[] getHyperRocks() {
        return hyperrocks;
    }

    public int getHyperRockSize() {
        int ret = 0;
        for (int i = 0; i < 13; i++) {
            if (hyperrocks[i] != 999999999) {
                ret++;
            }
        }
        return ret;
    }

    public void deleteFromHyperRocks(int map) {
        for (int i = 0; i < 13; i++) {
            if (hyperrocks[i] == map) {
                hyperrocks[i] = 999999999;
                changed_trocklocations = true;
                break;
            }
        }
    }

    public void addHyperRockMap() {
        if (getRegRockSize() >= 13) {
            return;
        }
        hyperrocks[getHyperRockSize()] = getMapId();
        changed_trocklocations = true;
    }

    public boolean isHyperRockMap(int id) {
        for (int i = 0; i < 13; i++) {
            if (hyperrocks[i] == id) {
                return true;
            }
        }
        return false;
    }

    /*
     * ???????????????
     */
    public MaplePotionPot getPotionPot() {
        return potionPot;
    }

    public void setPotionPot(MaplePotionPot p) {
        this.potionPot = p;
    }

    /*
     * ????????????????????????
     * 0001214 - ??????????????? - ?????????????????????????????????????????????\n#c??????#???????????????????????????????????????????????????#c????????????#????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * 80001151 - ??????????????? - ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     */
    public MapleCoreAura getCoreAura() {
        return coreAura;
    }

    public void updataCoreAura() {
        if (coreAura != null) {
            client.getSession().write(InventoryPacket.updataCoreAura(this));
        }
    }

    public List<LifeMovementFragment> getLastRes() {
        return lastres;
    }

    public void setLastRes(List<LifeMovementFragment> lastres) {
        this.lastres = lastres;
    }

    public void dropMessage(int type, String message) {
        if (type == -1) {
            client.getSession().write(UIPacket.getTopMsg(message));
        } else if (type == -2) {
            client.getSession().write(PlayerShopPacket.playerInterChat(message, 0)); //0 or what
        } else if (type == -3) {
            client.getSession().write(MaplePacketCreator.getChatText(getId(), message, isSuperGM(), 0)); //1 = hide
        } else if (type == -4) {
            client.getSession().write(MaplePacketCreator.getChatText(getId(), message, isSuperGM(), 1)); //1 = hide
        } else if (type == -5) {
            client.getSession().write(MaplePacketCreator.spouseMessage(message, false)); //pink - SPOUSE_MESSAGE 0x06
        } else if (type == -6) {
            client.getSession().write(MaplePacketCreator.spouseMessage(message, true)); //white bg - SPOUSE_MESSAGE 0x0A
        } else if (type == -7) {
            client.getSession().write(UIPacket.getMidMsg(message, false, 0));
        } else if (type == -8) {
            client.getSession().write(UIPacket.getMidMsg(message, true, 0));
        } else if (type == -9) {
            client.getSession().write(MaplePacketCreator.showRedNotice(message));//SHOW_STATUS_INFO 0x0B
        } else if (type == -10) {
            client.getSession().write(MaplePacketCreator.getFollowMessage(message));//SPOUSE_MESSAGE 0x0B
        } else if (type == -11) {
            client.getSession().write(MaplePacketCreator.yellowChat(message));//SPOUSE_MESSAGE 0x07
        } else if (type == -12) {
            client.getSession().write(UIPacket.getNpcNotice(1540488, message, 10000));
        } else {
            client.getSession().write(MaplePacketCreator.serverNotice(type, message));
        }
    }

    /*
     * ?????????????????????
     * 0x00 = ??????
     * 0x01 = ??????
     * 0x06 = ??????
     * 0x07 = ??????
     * 0x08 = ??????
     * 0x09 = ??????
     * 0x0A = ????????????
     * 0x0B = ??????????????????
     * 0x0C = ????????????
     * 0x0D = ??????????????????
     * 0x0E = ??????????????????
     * 0x0F = ??????
     * 0x10 = ????????????????????????
     * 0x11 = ??????
     * 0x12 = ??????
     * 0x13 = ?????????
     * 0x14 = ??????????????????
     * 0x15 = ????????????
     * 0x16 = ???????????? ????????????
     * 0x17 = ??????
     * 0x18 = ??????
     * 0x19 = ????????????
     * 0x20 = ??????
     */
    public void dropSpouseMessage(int type, String message) {
        if (type == 0x00 || type == 0x01 || (type >= 0x06 && type <= 0x20)) {
            client.getSession().write(MaplePacketCreator.spouseMessage(type, message));
        } else {
            client.getSession().write(MaplePacketCreator.serverNotice(5, message));
        }
    }

    public IMaplePlayerShop getPlayerShop() {
        return playerShop;
    }

    public void setPlayerShop(IMaplePlayerShop playerShop) {
        this.playerShop = playerShop;
    }

    public static byte checkExistance(int accid, int cid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where accountid = ? and characterid = ?")) {
                ps.setInt(1, accid);
                ps.setInt(2, cid);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        ps.close();
                        rs.close();
                        return 1;
                    }
                }
            }
            return 0;
        } catch (SQLException se) {
            return -1;
        }
    }

    public int getConversation() {
        return inst.get();
    }

    public void setConversation(int inst) {
        this.inst.set(inst);
    }

    public void resetConversation() {
        if (this.getConversation() != 0) {
            this.setConversation(0);
        }
    }

    public int getDirection() {
        return insd.get();
    }

    public void setDirection(int inst) {
        this.insd.set(inst);
    }

    public MapleCarnivalParty getCarnivalParty() {
        return carnivalParty;
    }

    public void setCarnivalParty(MapleCarnivalParty party) {
        carnivalParty = party;
    }

    public void addCP(int ammount) {
        totalCP += ammount;
        availableCP += ammount;
    }

    public void useCP(int ammount) {
        availableCP -= ammount;
    }

    public int getAvailableCP() {
        return availableCP;
    }

    public int getTotalCP() {
        return totalCP;
    }

    public void resetCP() {
        totalCP = 0;
        availableCP = 0;
    }

    public void addCarnivalRequest(MapleCarnivalChallenge request) {
        pendingCarnivalRequests.add(request);
    }

    public MapleCarnivalChallenge getNextCarnivalRequest() {
        return pendingCarnivalRequests.pollLast();
    }

    public void clearCarnivalRequests() {
        pendingCarnivalRequests = new LinkedList<>();
    }

    public void startMonsterCarnival(int enemyavailable, int enemytotal) {
        client.getSession().write(MonsterCarnivalPacket.startMonsterCarnival(this, enemyavailable, enemytotal));
    }

    public void CPUpdate(boolean party, int available, int total, int team) {
        client.getSession().write(MonsterCarnivalPacket.CPUpdate(party, available, total, team));
    }

    public void playerDiedCPQ(String name, int lostCP, int team) {
        client.getSession().write(MonsterCarnivalPacket.playerDiedMessage(name, lostCP, team));
    }

    public void setAchievementFinished(int id) {
        if (!finishedAchievements.contains(id)) {
            finishedAchievements.add(id);
            changed_achievements = true;
        }
    }

    public boolean achievementFinished(int achievementid) {
        return finishedAchievements.contains(achievementid);
    }

    public void finishAchievement(int id) {
        if (!achievementFinished(id)) {
            if (isAlive()) {
                MapleAchievements.getInstance().getById(id).finishAchievement(this);
            }
        }
    }

    public List<Integer> getFinishedAchievements() {
        return finishedAchievements;
    }

    public boolean getCanTalk() {
        return this.canTalk;
    }

    public void canTalk(boolean talk) {
        this.canTalk = talk;
    }

    /*
     * ????????????????????? ??????????????????
     */
    public double getEXPMod() {
        return hasEXPCard(); //stats.expMod
    }

    /*
     * ?????????
     */
    public double hasEXPCard() {
        int[] expCards = {5210000, //??????????????????????????? ????????????\n??????????????? : 10:00 - 22:00\n??????, ?????? : 00:00 - 24:00
            5210001, //??????????????????????????? ????????????\n??????????????? : 10:00 - 22:00\n??????, ?????? : 00:00 - 24:00
            5210002, //???????????????????????????(???) ????????????\n??????????????? : 06:00 - 18:00\n??????, ?????? : 00:00 - 24:00
            5210003, //???????????????????????????(???) ????????????\n??????????????? : 06:00 - 18:00\n??????, ?????? : 00:00 - 24:00
            5210004, //????????????????????????(???) ????????????\n??????????????? : \n??????18:00 - ??????06:00\n??????, ?????? : 00:00 - 24:00
            5210005, //????????????????????????(???) ????????????\n??????????????? : \n??????18:00 - ??????06:00\n??????, ?????? : 00:00 - 24:00
            5210006, //????????????????????????(??????) ????????????\n10???7???15:00 - 21:00
            5211047, //??????????????????????????????

            5211060, //???????????????(2??????)

            5211000, //???????????? ???
            5211001, //???????????? ???
            5211002, //???????????? ???

            5211063, //?????????1.5??? 7?????? (?????????)  ????????????\n12:00 - 18:00
            5211064, //?????????1.5??? 7?????? (?????????)  ????????????\n18:00 - 24:00
            5211065, //?????????1.5??? 28?????? (?????????) ????????????\n12:00 - 18:00
            5211066, //?????????1.5??? 28?????? (?????????) ????????????\n18:00 - 24:00
            5211069, //?????????1.5??? 1?????? (?????????)  ????????????\n18:00 - 24:00
            5211070, //?????????1.5??? 1?????? (?????????)  ????????????\n12:00 - 18:00

            //V.104??????
            5211084, //?????????2????????????????????????- ????????????\n??????????????? : 12:00 - 18:00
            5211085, //?????????2????????????????????????- ????????????\n??????????????? : 18:00 - 24:00
            5211108, //?????????2????????????????????????- ????????????\n??????????????? : 12:00 - 18:00
            5211109, //?????????2????????????????????????- ????????????\n??????????????? : 18:00 - 24:00
    };
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        double canuse = 1;
        for (Integer ids : expCards) {
            if (iv.countById(ids) > 0) {
                if (ii.isExpOrDropCardTime(ids)) {
                    switch (ids) {
                        case 5210000:
                        case 5210001:
                        case 5210002:
                        case 5210003:
                        case 5210004:
                        case 5210005:
                        case 5210006:
                        case 5211047:
                        case 5211000:
                        case 5211001:
                        case 5211002:
                        case 5211084: //V.104??????
                        case 5211085:
                        case 5211108:
                        case 5211109:
                            canuse = 2;
                            break;
                        case 5211060:
                            canuse = 3;
                            break;
                        case 5211063:
                        case 5211064:
                        case 5211065:
                        case 5211066:
                        case 5211069:
                        case 5211070:
                            canuse = 1.5;
                            break;
                    }
                }
            }
        }
        return canuse;
    }

    /*
     * ????????????????????? ????????????????????????
     */
    public int getDropMod() {
        return hasDropCard(); //stats.dropMod
    }

    /*
     * ???????????????
     */
    public int hasDropCard() {
        int[] dropCards = {5360000, 5360014, 5360015, 5360016};
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer id3 : dropCards) {
            if (iv.countById(id3) > 0) {
                if (ii.isExpOrDropCardTime(id3)) {
                    return 2;
                }
            }
        }
        return 1;
    }

    public int getCashMod() {
        return stats.cashMod;
    }

    public int getACash() {
        return getClient().getACash();
    }

    public void setACash(final int point) {
        getClient().setACash(point);
    }

    public int getMaplePoints() {
        return getClient().getMaplePoints();
    }

    public void setMaplePoints(final int point) {
        getClient().setMaplePoints(point);
    }

    public void setPoints(int p) {
        this.points = p;
        if (this.points >= 1) {
            finishAchievement(1);
        }
    }

    public int getPoints() {
        return points;
    }

    public void setVPoints(int p) {
        this.vpoints = p;
    }

    public int getVPoints() {
        return vpoints;
    }

    public CashShop getCashInventory() {
        return cs;
    }

    public void removeItem(int id, int quantity) {
        MapleInventoryManipulator.removeById(client, ItemConstants.getInventoryType(id), id, quantity, true, false);
        client.getSession().write(MaplePacketCreator.getShowItemGain(id, (short) -quantity, true));
    }

    public void removeAll(int id) {
        removeAll(id, true, false);
    }

    public void removeAll(int itemId, boolean show, boolean checkEquipped) {
        MapleInventoryType type = ItemConstants.getInventoryType(itemId);
        int possessed = getInventory(type).countById(itemId);
        if (possessed > 0) {
            MapleInventoryManipulator.removeById(getClient(), type, itemId, possessed, true, false);
            if (show) {
                getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) -possessed, true));
            }
        }
        if (checkEquipped && type == MapleInventoryType.EQUIP) { //???????????????????????????
            type = MapleInventoryType.EQUIPPED;
            possessed = getInventory(type).countById(itemId);
            if (possessed > 0) {
                MapleInventoryManipulator.removeById(getClient(), type, itemId, possessed, true, false);
                if (show) {
                    getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) -possessed, true));
                }
                equipChanged();
            }
        }
    }

    public void removeItem(int itemId) {
        removeItem(itemId, false);
    }

    public void removeItem(int itemId, boolean show) {
        MapleInventoryType type = ItemConstants.getInventoryType(itemId);
        if (type == MapleInventoryType.EQUIP) { //check equipped 
            type = MapleInventoryType.EQUIPPED;
            int possessed = getInventory(type).countById(itemId);
            if (possessed > 0) {
                MapleInventoryManipulator.removeById(getClient(), type, itemId, possessed, true, false);
                if (show) {
                    getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) -possessed, true));
                }
                equipChanged();
            }
        }
    }

    public MapleRing getMarriageRing() {
        MapleInventory iv = getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equipped = iv.newList();
        Collections.sort(equipped);
        MapleRing ring, mrings = null;
        for (Item ite : equipped) {
            Equip item = (Equip) ite;
            if (item.getRing() != null) {
                ring = item.getRing();
                ring.setEquipped(true);
                if (mrings == null && ItemConstants.is????????????(item.getItemId())) {
                    mrings = ring;
                }
            }
        }
        if (mrings == null) {
            iv = getInventory(MapleInventoryType.EQUIP);
            for (Item ite : iv.list()) {
                Equip item = (Equip) ite;
                if (item.getRing() != null) {
                    ring = item.getRing();
                    ring.setEquipped(false);
                    if (mrings == null && ItemConstants.is????????????(item.getItemId())) {
                        mrings = ring;
                    }
                }
            }
        }
        return mrings;
    }

    public Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> getRings(boolean equip) {
        MapleInventory iv = getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equipped = iv.newList();
        Collections.sort(equipped);
        List<MapleRing> crings = new ArrayList<>(), frings = new ArrayList<>(), mrings = new ArrayList<>();
        MapleRing ring;
        for (Item ite : equipped) {
            Equip item = (Equip) ite;
            if (item.getRing() != null && ItemConstants.isEffectRing(item.getItemId())) {
                ring = item.getRing();
                ring.setEquipped(true);
                if (equip) {
                    if (ItemConstants.is????????????(item.getItemId())) {
                        crings.add(ring);
                    } else if (ItemConstants.is????????????(item.getItemId())) {
                        frings.add(ring);
                    } else if (ItemConstants.is????????????(item.getItemId())) {
                        mrings.add(ring);
                    }
                } else if (crings.isEmpty() && ItemConstants.is????????????(item.getItemId())) {
                    crings.add(ring);
                } else if (frings.isEmpty() && ItemConstants.is????????????(item.getItemId())) {
                    frings.add(ring);
                } else if (mrings.isEmpty() && ItemConstants.is????????????(item.getItemId())) {
                    mrings.add(ring);
                }
            }
        }
        if (equip) {
            iv = getInventory(MapleInventoryType.EQUIP);
            for (Item ite : iv.list()) {
                Equip item = (Equip) ite;
                if (item.getRing() != null && ItemConstants.isEffectRing(item.getItemId())) {
                    ring = item.getRing();
                    ring.setEquipped(false);
                    if (ItemConstants.is????????????(item.getItemId())) {
                        crings.add(ring);
                    } else if (ItemConstants.is????????????(item.getItemId())) {
                        frings.add(ring);
                    } else if (ItemConstants.is????????????(item.getItemId())) {
                        mrings.add(ring);
                    }
                }
            }
        }
        Collections.sort(frings, new MapleRing.RingComparator());
        Collections.sort(crings, new MapleRing.RingComparator());
        Collections.sort(mrings, new MapleRing.RingComparator());
        return new Triple<>(crings, frings, mrings);
    }

    public int getFH() {
        MapleFoothold fh = getMap().getFootholds().findBelow(this.getTruePosition(), true);
        if (fh != null) {
            return fh.getId();
        }
        return 0;
    }

    public void startFairySchedule(boolean exp) {
        startFairySchedule(exp, false);
    }

    public void startFairySchedule(boolean exp, boolean equipped) {
        cancelFairySchedule(exp || stats.equippedFairy == 0);
        if (fairyExp <= 0) {
            fairyExp = (byte) stats.equippedFairy;
        }
        if (equipped && fairyExp < stats.equippedFairy * 3 && stats.equippedFairy > 0) {
            dropMessage(5, "???????????????????????????1????????????????????????????????? " + (fairyExp + stats.equippedFairy) + " %.");
        }
        lastFairyTime = System.currentTimeMillis();
    }

    public boolean canFairy(long now) {
        return lastFairyTime > 0 && lastFairyTime + (60 * 60 * 1000) < now;
    }

    public boolean canHP(long now) {
        if (lastHPTime + 5000 < now) {
            lastHPTime = now;
            return true;
        }
        return false;
    }

    public boolean canMP(long now) {
        if (lastMPTime + 5000 < now) {
            lastMPTime = now;
            return true;
        }
        return false;
    }

    public boolean canHPRecover(long now) {
        if (stats.hpRecoverTime > 0 && lastHPTime + stats.hpRecoverTime < now) {
            lastHPTime = now;
            return true;
        }
        return false;
    }

    public boolean canMPRecover(long now) {
        if (stats.mpRecoverTime > 0 && lastMPTime + stats.mpRecoverTime < now) {
            lastMPTime = now;
            return true;
        }
        return false;
    }

    public void cancelFairySchedule(boolean exp) {
        lastFairyTime = 0;
        if (exp) {
            this.fairyExp = 0;
        }
    }

    public void doFairy() {
        if (fairyExp < stats.equippedFairy * 3 && stats.equippedFairy > 0) {
            fairyExp += stats.equippedFairy;
            dropMessage(5, "????????????????????????????????? " + fairyExp + " %.");
        }
        if (getGuildId() > 0) {
            WorldGuildService.getInstance().gainGP(getGuildId(), 20, id);
            client.getSession().write(UIPacket.getGPContribution(20));
        }
        traits.get(MapleTraitType.will).addExp(5, this); //willpower every hour
        startFairySchedule(false, true);
    }

    public byte getFairyExp() {
        return fairyExp;
    }

    public int getTeam() {
        return coconutteam;
    }

    public void setTeam(int v) {
        this.coconutteam = v;
    }

    public void clearLinkMid() {
        linkMobs.clear();
        cancelEffectFromBuffStat(MapleBuffStat.????????????);
        cancelEffectFromBuffStat(MapleBuffStat.???????????????);
    }

    public int getFirstLinkMid() {
        for (Integer lm : linkMobs.keySet()) {
            return lm.intValue();
        }
        return 0;
    }

    public Map<Integer, Integer> getAllLinkMid() {
        return linkMobs;
    }

    public void setLinkMid(int lm, int x) {
        linkMobs.put(lm, x);
    }

    public int getDamageIncrease(int lm) {
        if (linkMobs.containsKey(lm)) {
            return linkMobs.get(lm);
        }
        return 0;
    }

    public void setDragon(MapleDragon d) {
        this.dragon = d;
    }

    public void setLittleWhite(MapleLittleWhite lw) {
        this.lw = lw;
    }

    public MapleExtractor getExtractor() {
        return extractor;
    }

    public void setExtractor(MapleExtractor me) {
        removeExtractor();
        this.extractor = me;
    }

    public void removeExtractor() {
        if (extractor != null) {
            map.broadcastMessage(MaplePacketCreator.removeExtractor(this.id));
            map.removeMapObject(extractor);
            extractor = null;
        }
    }

    public void spawnSavedPets() {
        for (int i = 0; i < petStore.length; i++) {
            if (petStore[i] > -1) {
                spawnPet(petStore[i], false, false);
            }
        }
        petStore = new byte[]{-1, -1, -1};
    }

    public byte[] getPetStores() {
        return petStore;
    }

    public Event_PyramidSubway getPyramidSubway() {
        return pyramidSubway;
    }

    public void setPyramidSubway(Event_PyramidSubway ps) {
        this.pyramidSubway = ps;
    }

    /*
     * 0 = ????????? 
     * 1 = ????????? 
     * 2 = ????????? 
     * 3 =  ?????? 
     * 4 = ?????? 
     * 5 = ????????????  
     * 6 = ????????????  ??????????????? 
     * 0A = ??????  
     * 0B = ????????????  
     * 0C = ???????????????  
     * 0E = ??????
     */
    public byte getSubcategory() {
//        if (job >= 430 && job <= 434) {
//            return 1;
//        } else if (GameConstants.is?????????(job)) {
//            return 2;
//        } else if (GameConstants.is????????????(job)) {
//            return 10;
//        } else if (job == 0) {
//            return subcategory;
//        }
//        return 0;
        return subcategory;
    }

    public void setSubcategory(int z) {
        this.subcategory = (byte) z;
    }

    public int itemQuantity(int itemid) {
        return getInventory(ItemConstants.getInventoryType(itemid)).countById(itemid);
    }

    public void setRPS(RockPaperScissors rps) {
        this.rps = rps;
    }

    public RockPaperScissors getRPS() {
        return rps;
    }

    public long getNextConsume() {
        return nextConsume;
    }

    public void setNextConsume(long nc) {
        this.nextConsume = nc;
    }

    public int getRank() {
        return rank;
    }

    public int getRankMove() {
        return rankMove;
    }

    public int getJobRank() {
        return jobRank;
    }

    public int getJobRankMove() {
        return jobRankMove;
    }

    public void changeChannel(int channel) {
        ChannelServer toch = ChannelServer.getInstance(channel);
        if (channel == client.getChannel() || toch == null || toch.isShutdown()) {
            client.getSession().write(MaplePacketCreator.serverBlocked(1));
            return;
        }
        changeRemoval();
        ChannelServer ch = ChannelServer.getInstance(client.getChannel());
        if (getMessenger() != null) {
            WorldMessengerService.getInstance().silentLeaveMessenger(getMessenger().getId(), new MapleMessengerCharacter(this));
        }
        PlayerBuffStorage.addBuffsToStorage(getId(), getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(getId(), getCooldowns());
        PlayerBuffStorage.addDiseaseToStorage(getId(), getAllDiseases());
        World.ChannelChange_Data(new CharacterTransfer(this), getId(), channel);
        ch.removePlayer(this);
        client.updateLoginState(MapleClient.CHANGE_CHANNEL, client.getSessionIPAddress());
        client.getSession().write(MaplePacketCreator.getChannelChange(client, Integer.parseInt(toch.getIP().split(":")[1])));
        saveToDB(false, false);
        getMap().removePlayer(this);
        client.setPlayer(null);
        client.setReceiving(false);
    }

    public void expandInventory(byte type, int amount) {
        MapleInventory inv = getInventory(MapleInventoryType.getByType(type));
        inv.addSlot((byte) amount);
        client.getSession().write(InventoryPacket.updateInventorySlotLimit(type, inv.getSlotLimit()));
    }

    /**
     * ??????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @param other ?????? ??????
     * @return
     */
    public boolean allowedToTarget(MapleCharacter other) {
        return other != null && (!other.isHidden() || getGMLevel() >= other.getGMLevel());
    }

    public int getFollowId() {
        return followid;
    }

    public void setFollowId(int fi) {
        this.followid = fi;
        if (fi == 0) {
            this.followinitiator = false;
            this.followon = false;
        }
    }

    public void setFollowInitiator(boolean fi) {
        this.followinitiator = fi;
    }

    public void setFollowOn(boolean fi) {
        this.followon = fi;
    }

    public boolean isFollowOn() {
        return followon;
    }

    public boolean isFollowInitiator() {
        return followinitiator;
    }

    public void checkFollow() {
        if (followid <= 0) {
            return;
        }
        if (followon) {
            map.broadcastMessage(MaplePacketCreator.followEffect(id, 0, null));
            map.broadcastMessage(MaplePacketCreator.followEffect(followid, 0, null));
        }
        MapleCharacter tt = map.getCharacterById(followid);
        client.getSession().write(MaplePacketCreator.getFollowMessage("??????????????????"));
        if (tt != null) {
            tt.setFollowId(0);
            tt.getClient().getSession().write(MaplePacketCreator.getFollowMessage("??????????????????"));
        }
        setFollowId(0);
    }

    public int getMarriageId() {
        return marriageId;
    }

    public void setMarriageId(int mi) {
        this.marriageId = mi;
    }

    public int getMarriageItemId() {
        return marriageItemId;
    }

    public void setMarriageItemId(int mi) {
        this.marriageItemId = mi;
    }

    public boolean isStaff() {
        return this.gmLevel >= PlayerGMRank.INTERN.getLevel();
    }

    public boolean isDonator() {
        return this.gmLevel >= PlayerGMRank.DONATOR.getLevel();
    }

    // TODO: gvup, vic, lose, draw, VR
    public boolean startPartyQuest(int questid) {
        boolean ret = false;
        MapleQuest q = MapleQuest.getInstance(questid);
        if (q == null || !q.isPartyQuest()) {
            return false;
        }
        if (!quests.containsKey(q) || !questinfo.containsKey(questid)) {
            MapleQuestStatus status = getQuestNAdd(q);
            status.setStatus((byte) 1);
            updateQuest(status);
            switch (questid) {
                case 1300: //[????????????]?????????????????????
                case 1301: //[????????????]???????????????
                case 1302: //[????????????]???2??????????????????
                    updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have=0;rank=F;try=0;cmp=0;CR=0;VR=0;gvup=0;vic=0;lose=0;draw=0");
                    break;
                case 1303: //[????????????]???????????????
                    updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have=0;have1=0;rank=F;try=0;cmp=0;CR=0;VR=0;vic=0;lose=0");
                    break;
                case 1204: //[????????????]?????????????????????
                    updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have0=0;have1=0;have2=0;have3=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                    break;
                case 1206: //[????????????]????????????
                    updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have0=0;have1=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                    break;
                default:
                    updateInfoQuest(questid, "min=0;sec=0;date=0000-00-00;have=0;rank=F;try=0;cmp=0;CR=0;VR=0");
                    break;
            }
            ret = true;
        }
        return ret;
    }

    public String getOneInfo(int questid, String key) {
        if (!questinfo.containsKey(questid) || key == null || MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return null;
        }
        String[] split = questinfo.get(questid).split(";");
        for (String x : split) {
            String[] split2 = x.split("="); //should be only 2
            if (split2.length == 2 && split2[0].equals(key)) {
                return split2[1];
            }
        }
        return null;
    }

    public void updateOneInfo(int questid, String key, String value) {
        if (!questinfo.containsKey(questid) || key == null || value == null || MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return;
        }
        String[] split = questinfo.get(questid).split(";");
        boolean changed = false;
        StringBuilder newQuest = new StringBuilder();
        for (String x : split) {
            String[] split2 = x.split("="); //should be only 2
            if (split2.length != 2) {
                continue;
            }
            if (split2[0].equals(key)) {
                newQuest.append(key).append("=").append(value);
            } else {
                newQuest.append(x);
            }
            newQuest.append(";");
            changed = true;
        }
        updateInfoQuest(questid, changed ? newQuest.toString().substring(0, newQuest.toString().length() - 1) : newQuest.toString());
    }

    public void recalcPartyQuestRank(int questid) {
        if (MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return;
        }
        if (!startPartyQuest(questid)) {
            String oldRank = getOneInfo(questid, "rank");
            if (oldRank == null || oldRank.equals("S")) {
                return;
            }
            String newRank;
            if (oldRank.equals("A")) {
                newRank = "S";
            } else if (oldRank.equals("B")) {
                newRank = "A";
            } else if (oldRank.equals("C")) {
                newRank = "B";
            } else if (oldRank.equals("D")) {
                newRank = "C";
            } else if (oldRank.equals("F")) {
                newRank = "D";
            } else {
                return;
            }
            List<Pair<String, Pair<String, Integer>>> questInfo = MapleQuest.getInstance(questid).getInfoByRank(newRank);
            if (questInfo == null) {
                return;
            }
            for (Pair<String, Pair<String, Integer>> q : questInfo) {
                boolean found = false;
                String val = getOneInfo(questid, q.right.left);
                if (val == null) {
                    return;
                }
                int vall;
                try {
                    vall = Integer.parseInt(val);
                } catch (NumberFormatException e) {
                    return;
                }
                if (q.left.equals("less")) {
                    found = vall < q.right.right;
                } else if (q.left.equals("more")) {
                    found = vall > q.right.right;
                } else if (q.left.equals("equal")) {
                    found = vall == q.right.right;
                }
                if (!found) {
                    return;
                }
            }
            updateOneInfo(questid, "rank", newRank);
        }
    }

    public void tryPartyQuest(int questid) {
        if (MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return;
        }
        try {
            startPartyQuest(questid);
            pqStartTime = System.currentTimeMillis();
            updateOneInfo(questid, "try", String.valueOf(Integer.parseInt(getOneInfo(questid, "try")) + 1));
        } catch (Exception e) {
            System.out.println("tryPartyQuest error");
        }
    }

    public void endPartyQuest(int questid) {
        if (MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return;
        }
        try {
            startPartyQuest(questid);
            if (pqStartTime > 0) {
                long changeTime = System.currentTimeMillis() - pqStartTime;
                int mins = (int) (changeTime / 1000 / 60), secs = (int) (changeTime / 1000 % 60);
                int mins2 = Integer.parseInt(getOneInfo(questid, "min"));
                if (mins2 <= 0 || mins < mins2) {
                    updateOneInfo(questid, "min", String.valueOf(mins));
                    updateOneInfo(questid, "sec", String.valueOf(secs));
                    updateOneInfo(questid, "date", FileoutputUtil.CurrentReadable_Date());
                }
                int newCmp = Integer.parseInt(getOneInfo(questid, "cmp")) + 1;
                updateOneInfo(questid, "cmp", String.valueOf(newCmp));
                updateOneInfo(questid, "CR", String.valueOf((int) Math.ceil((newCmp * 100.0) / Integer.parseInt(getOneInfo(questid, "try")))));
                recalcPartyQuestRank(questid);
                pqStartTime = 0;
            }
        } catch (Exception e) {
            System.out.println("endPartyQuest error");
        }
    }

    public void havePartyQuest(int itemId) {
        int questid, index = -1;
        switch (itemId) {
            case 1002798:
                questid = 1200; //[????????????]?????????????????????????????????
                break;
            case 1072369:
                questid = 1201; //[????????????]??????????????????
                break;
            case 1022073:
                questid = 1202; //[????????????]?????????????????????
                break;
            case 1082232:
                questid = 1203; //[????????????]?????????????????????
                break;
            case 1002571:
            case 1002572:
            case 1002573:
            case 1002574:
                questid = 1204; //[????????????]?????????????????????
                index = itemId - 1002571;
                break;
            case 1102226:
                questid = 1303; //[????????????]???????????????
                break;
            case 1102227:
                questid = 1303; //[????????????]???????????????
                index = 0;
                break;
            case 1122010:
                questid = 1205; //[????????????]???????????????????????????
                break;
            case 1032061:
            case 1032060:
                questid = 1206; //[????????????]????????????
                index = itemId - 1032060;
                break;
            case 3010018:
                questid = 1300; //[????????????]?????????????????????
                break;
            case 1122007:
                questid = 1301; //[????????????]???????????????
                break;
            case 1122058:
                questid = 1302; //[????????????]???2??????????????????
                break;
            default:
                return;
        }
        if (MapleQuest.getInstance(questid) == null || !MapleQuest.getInstance(questid).isPartyQuest()) {
            return;
        }
        startPartyQuest(questid);
        updateOneInfo(questid, "have" + (index == -1 ? "" : index), "1");
    }

    public boolean hasSummon() {
        return hasSummon;
    }

    public void setHasSummon(boolean summ) {
        this.hasSummon = summ;
    }

    public void removeDoor() {
        MapleDoor door = getDoors().iterator().next();
        for (MapleCharacter chr : door.getTarget().getCharactersThreadsafe()) {
            door.sendDestroyData(chr.getClient());
        }
        for (MapleCharacter chr : door.getTown().getCharactersThreadsafe()) {
            door.sendDestroyData(chr.getClient());
        }
        for (MapleDoor destroyDoor : getDoors()) {
            door.getTarget().removeMapObject(destroyDoor);
            door.getTown().removeMapObject(destroyDoor);
        }
        clearDoors();
    }

    public void removeMechDoor() {
        for (MechDoor destroyDoor : getMechDoors()) {
            for (MapleCharacter chr : getMap().getCharactersThreadsafe()) {
                destroyDoor.sendDestroyData(chr.getClient());
            }
            getMap().removeMapObject(destroyDoor);
        }
        clearMechDoors();
    }

    public void changeRemoval() {
        changeRemoval(false);
    }

    public void changeRemoval(boolean dc) {
        if (getCheatTracker() != null && dc) {
            getCheatTracker().dispose();
        }
        removeFamiliar();
        dispelSummons();
        if (!dc) {
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
        }
        if (getPyramidSubway() != null) {
            getPyramidSubway().dispose(this);
        }
        if (playerShop != null && !dc) {
            playerShop.removeVisitor(this);
            if (playerShop.isOwner(this)) {
                playerShop.setOpen(true);
            }
        }
        if (!getDoors().isEmpty()) {
            removeDoor();
        }
        if (!getMechDoors().isEmpty()) {
            removeMechDoor();
        }
        NPCScriptManager.getInstance().dispose(client);
        cancelFairySchedule(false);
    }

    public void updateTick(int newTick) {
        anticheat.updateTick(newTick);
    }

    // ??????????????????NPC????????????-----------------------------------------------------------
    public long getCurrenttime() {
        return this.currenttime;
    }

    public void setCurrenttime(final long currenttime) {
        this.currenttime = currenttime;
    }

    public long getDeadtime() {
        return this.deadtime;
    }

    public void setDeadtime(final long deadtime) {
        this.deadtime = deadtime;
    }

    public long getLasttime() {
        return this.lasttime;
    }

    public void setLasttime(final long lasttime) {
        this.lasttime = lasttime;
    }

    //------------------------------------------------------------------------------------
    public boolean canUseFamilyBuff(MapleFamilyBuff buff) {
        MapleQuestStatus stat = getQuestNoAdd(MapleQuest.getInstance(buff.questID));
        if (stat == null) {
            return true;
        }
        if (stat.getCustomData() == null) {
            stat.setCustomData("0");
        }
        return Long.parseLong(stat.getCustomData()) + (24 * 3600000) < System.currentTimeMillis();
    }

    public void useFamilyBuff(MapleFamilyBuff buff) {
        MapleQuestStatus stat = getQuestNAdd(MapleQuest.getInstance(buff.questID));
        stat.setCustomData(String.valueOf(System.currentTimeMillis()));
    }

    public List<Integer> usedBuffs() {
        //assume count = 1
        List<Integer> used = new ArrayList<>();
        MapleFamilyBuff[] z = MapleFamilyBuff.values();
        for (int i = 0; i < z.length; i++) {
            if (!canUseFamilyBuff(z[i])) {
                used.add(i);
            }
        }
        return used;
    }

    public String getTeleportName() {
        return teleportname;
    }

    public void setTeleportName(String tname) {
        teleportname = tname;
    }

    public int getNoJuniors() {
        if (mfc == null) {
            return 0;
        }
        return mfc.getNoJuniors();
    }

    public MapleFamilyCharacter getMFC() {
        return mfc;
    }

    public void makeMFC(int familyid, int seniorid, int junior1, int junior2) {
        if (familyid > 0) {
            MapleFamily f = WorldFamilyService.getInstance().getFamily(familyid);
            if (f == null) {
                mfc = null;
            } else {
                mfc = f.getMFC(id);
                if (mfc == null) {
                    mfc = f.addFamilyMemberInfo(this, seniorid, junior1, junior2);
                }
                if (mfc.getSeniorId() != seniorid) {
                    mfc.setSeniorId(seniorid);
                }
                if (mfc.getJunior1() != junior1) {
                    mfc.setJunior1(junior1);
                }
                if (mfc.getJunior2() != junior2) {
                    mfc.setJunior2(junior2);
                }
            }
        } else {
            mfc = null;
        }
    }

    public void setFamily(int newf, int news, int newj1, int newj2) {
        if (mfc == null || newf != mfc.getFamilyId() || news != mfc.getSeniorId() || newj1 != mfc.getJunior1() || newj2 != mfc.getJunior2()) {
            makeMFC(newf, news, newj1, newj2);
        }
    }

    public int getGachExp() {
        return gachexp;
    }

    public void setGachExp(int ge) {
        this.gachexp = ge;
    }

    public boolean isInBlockedMap() {
        if (!isAlive() || getPyramidSubway() != null || getMap().getSquadByMap() != null || getEventInstance() != null || getMap().getEMByMap() != null) {
            return true;
        }
        if ((getMapId() >= 680000210 && getMapId() <= 680000502) || (getMapId() / 10000 == 92502 && getMapId() >= 925020100) || (getMapId() / 10000 == 92503) || getMapId() == GameConstants.JAIL) {
            return true;
        }
        return ServerConstants.isBlockedMapFM(getMapId());
    }

    public boolean isInTownMap() {
        if (hasBlockedInventory() || !getMap().isTown() || FieldLimitType.VipRock.check(getMap().getFieldLimit()) || getEventInstance() != null) {
            return false;
        }
        return !ServerConstants.isBlockedMapFM(getMapId());
    }

    public boolean hasBlockedInventory() {
        return !isAlive() || getTrade() != null || getConversation() > 0 || getDirection() >= 0 || getPlayerShop() != null || getBattle() != null || map == null;
    }

    public void startPartySearch(List<Integer> jobs, int maxLevel, int minLevel, int membersNeeded) {
        for (MapleCharacter chr : map.getCharacters()) {
            if (chr.getId() != id && chr.getParty() == null && chr.getLevel() >= minLevel && chr.getLevel() <= maxLevel && (jobs.isEmpty() || jobs.contains((int) chr.getJob())) && (isGM() || !chr.isGM())) {
                if (party != null && party.getMembers().size() < 6 && party.getMembers().size() < membersNeeded) {
                    chr.setParty(party);
                    WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.????????????, new MaplePartyCharacter(chr));
                    chr.receivePartyMemberHP();
                    chr.updatePartyMemberHP();
                } else {
                    break;
                }
            }
        }
    }

    public Battler getBattler(int pos) {
        return battlers[pos];
    }

    public Battler[] getBattlers() {
        return battlers;
    }

    public List<Battler> getBoxed() {
        return boxed;
    }

    public PokemonBattle getBattle() {
        return battle;
    }

    public void setBattle(PokemonBattle b) {
        this.battle = b;
    }

    public int countBattlers() {
        int ret = 0;
        for (Battler battler : battlers) {
            if (battler != null) {
                ret++;
            }
        }
        return ret;
    }

    public void changedBattler() {
        changed_pokemon = true;
    }

    public void makeBattler(int index, int monsterId) {
        MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(monsterId);
        this.battlers[index] = new Battler(mons);
        this.battlers[index].setCharacterId(id);
        changed_pokemon = true;
        getMonsterBook().monsterCaught(client, monsterId, mons.getName());
    }

    public boolean removeBattler(int ind) {
        if (countBattlers() <= 1) {
            return false;
        }
        if (ind == battlers.length) {
            this.battlers[ind] = null;
        } else {
            for (int i = ind; i < battlers.length; i++) {
                this.battlers[i] = ((i + 1) == battlers.length ? null : this.battlers[i + 1]);
            }
        }
        changed_pokemon = true;
        return true;
    }

    public int getChallenge() {
        return challenge;
    }

    public void setChallenge(int c) {
        this.challenge = c;
    }

    public short getFatigue() {
        return fatigue;
    }

    public void setFatigue(int j) {
        this.fatigue = (short) Math.max(0, j);
        updateSingleStat(MapleStat.??????, this.fatigue);
    }

    public void fakeRelog() {
        client.getSession().write(MaplePacketCreator.getCharInfo(this));
        MapleMap mapp = getMap();
        mapp.setCheckStates(false);
        mapp.removePlayer(this);
        mapp.addPlayer(this);
        mapp.setCheckStates(true);
        if (GameConstants.GMS) {
            client.getSession().write(MaplePacketCreator.getFamiliarInfo(this));
        }
        client.getSession().write(MaplePacketCreator.serverNotice(5, "?????????????????????..."));
    }

    /*
     * ???????????????????????????????????????
     */
    public boolean canSummon() {
        return canSummon(5000);
    }

    public boolean canSummon(int checkTime) {
        if (lastSummonTime <= 0) {
            prepareSummonTime();
        }
        return lastSummonTime + checkTime < System.currentTimeMillis();
    }

    /*
     * ?????????????????????????????????
     */
    private void prepareSummonTime() {
        lastSummonTime = System.currentTimeMillis();
    }

    public int getIntNoRecord(int questID) {
        MapleQuestStatus stat = getQuestNoAdd(MapleQuest.getInstance(questID));
        if (stat == null || stat.getCustomData() == null) {
            return 0;
        }
        return Integer.parseInt(stat.getCustomData());
    }

    public int getIntRecord(int questID) {
        MapleQuestStatus stat = getQuestNAdd(MapleQuest.getInstance(questID));
        if (stat.getCustomData() == null) {
            stat.setCustomData("0");
        }
        return Integer.parseInt(stat.getCustomData());
    }

    public void updatePetAuto() {
        client.getSession().write(MaplePacketCreator.petAutoHP(getIntRecord(GameConstants.HP_ITEM)));
        client.getSession().write(MaplePacketCreator.petAutoMP(getIntRecord(GameConstants.MP_ITEM)));
        client.getSession().write(MaplePacketCreator.petAutoBuff(getIntRecord(GameConstants.BUFF_SKILL)));
    }

    public void sendEnglishQuiz(String msg) {
        client.getSession().write(MaplePacketCreator.englishQuizMsg(msg));
    }

    public void setChangeTime(boolean changeMap) {
        mapChangeTime = System.currentTimeMillis();
        if (changeMap) {
            getCheatTracker().resetInMapIimeCount();
        }
    }

    public long getChangeTime() {
        return mapChangeTime;
    }

    public Map<ReportType, Integer> getReports() {
        return reports;
    }

    public void addReport(ReportType type) {
        Integer value = reports.get(type);
        reports.put(type, value == null ? 1 : (value + 1));
        changed_reports = true;
    }

    public void clearReports(ReportType type) {
        reports.remove(type);
        changed_reports = true;
    }

    public void clearReports() {
        reports.clear();
        changed_reports = true;
    }

    public int getReportPoints() {
        int ret = 0;
        for (Integer entry : reports.values()) {
            ret += entry;
        }
        return ret;
    }

    public String getReportSummary() {
        StringBuilder ret = new StringBuilder();
        List<Pair<ReportType, Integer>> offenseList = new ArrayList<>();
        for (Entry<ReportType, Integer> entry : reports.entrySet()) {
            offenseList.add(new Pair<>(entry.getKey(), entry.getValue()));
        }
        Collections.sort(offenseList, new Comparator<Pair<ReportType, Integer>>() {

            @Override
            public int compare(Pair<ReportType, Integer> o1, Pair<ReportType, Integer> o2) {
                int thisVal = o1.getRight();
                int anotherVal = o2.getRight();
                return (thisVal < anotherVal ? 1 : (thisVal == anotherVal ? 0 : -1));
            }
        });
        for (int x = 0; x < offenseList.size(); x++) {
            ret.append(StringUtil.makeEnumHumanReadable(offenseList.get(x).left.name()));
            ret.append(": ");
            ret.append(offenseList.get(x).right);
            ret.append(" ");
        }
        return ret.toString();
    }

    public short getScrolledPosition() {
        return scrolledPosition;
    }

    public void setScrolledPosition(short s) {
        this.scrolledPosition = s;
    }

    public MapleTrait getTrait(MapleTraitType t) {
        return traits.get(t);
    }

    public void forceCompleteQuest(int id) {
        MapleQuest.getInstance(id).forceComplete(this, 9270035); //NPC?????????
    }

    /*
     * ??????(??????)??????
     */
    public List<Integer> getExtendedSlots() {
        return extendedSlots;
    }

    public int getExtendedSlot(int index) {
        if (extendedSlots.size() <= index || index < 0) {
            return -1;
        }
        return extendedSlots.get(index);
    }

    public void changedExtended() {
        changed_extendedSlots = true;
    }

    /*
     * ????????????
     */
    public MapleAndroid getAndroid() {
        return android;
    }

    /*
     * ????????????
     */
    public void removeAndroid() {
        if (map != null) {
            map.broadcastMessage(AndroidPacket.deactivateAndroid(this.id));
        }
        if (android != null) {
            android.saveToDb();
        }
        android = null;
    }

    /*
     * ??????????????????
     */
    public void updateAndroid(int size, int itemId) {
        if (map != null) {
            map.broadcastMessage(AndroidPacket.updateAndroidLook(this.getId(), size, itemId));
        }
    }

    /*
     * ?????????????????????????????? ?????? -34 ??????????????? -35
     */
    public boolean checkHearts() {
        return getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -35) != null;
    }

    /*
     * ????????????
     */
    public void setAndroid(MapleAndroid a) {
        if (checkHearts()) {
            this.android = a;
            if (map != null && a != null) {
                map.broadcastMessage(AndroidPacket.spawnAndroid(this, a));
                map.broadcastMessage(AndroidPacket.showAndroidEmotion(this.getId(), Randomizer.nextInt(17) + 1));
            }
        }
    }

    public void setSidekick(MapleSidekick s) {
        this.sidekick = s;
    }

    public MapleSidekick getSidekick() {
        return sidekick;
    }

    /*
     * ????????????
     */
    public List<MapleShopItem> getRebuy() {
        return rebuy;
    }

    public Map<Integer, MonsterFamiliar> getFamiliars() {
        return familiars;
    }

    public MonsterFamiliar getSummonedFamiliar() {
        return summonedFamiliar;
    }

    public void removeFamiliar() {
        if (summonedFamiliar != null && map != null) {
            removeVisibleFamiliar();
        }
        summonedFamiliar = null;
    }

    public void removeVisibleFamiliar() {
        getMap().removeMapObject(summonedFamiliar);
        removeVisibleMapObject(summonedFamiliar);
        getMap().broadcastMessage(MaplePacketCreator.removeFamiliar(this.getId()));
        anticheat.resetFamiliarAttack();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        cancelEffect(ii.getItemEffect(ii.getFamiliar(summonedFamiliar.getFamiliar()).passive), false, System.currentTimeMillis());
    }

    public void spawnFamiliar(MonsterFamiliar mf) {
        summonedFamiliar = mf;
        mf.setStance(0);
        mf.setPosition(getPosition());
        mf.setFh(getFH());
        addVisibleMapObject(mf);
        getMap().spawnFamiliar(mf);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleStatEffect eff = ii.getItemEffect(ii.getFamiliar(summonedFamiliar.getFamiliar()).passive);
        if (eff != null && eff.getInterval() <= 0 && eff.makeChanceResult()) { //i think this is actually done through a recv, which is ATTACK_FAMILIAR +1
            eff.applyTo(this);
        }
        lastFamiliarEffectTime = System.currentTimeMillis();
    }

    public boolean canFamiliarEffect(long now, MapleStatEffect eff) {
        return lastFamiliarEffectTime > 0 && lastFamiliarEffectTime + eff.getInterval() < now;
    }

    public void doFamiliarSchedule(long now) {
        for (MonsterFamiliar mf : familiars.values()) {
            if (summonedFamiliar != null && summonedFamiliar.getId() == mf.getId()) {
                mf.addFatigue(this, 5);
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                MapleStatEffect eff = ii.getItemEffect(ii.getFamiliar(summonedFamiliar.getFamiliar()).passive);
                if (eff != null && eff.getInterval() > 0 && canFamiliarEffect(now, eff) && eff.makeChanceResult()) {
                    eff.applyTo(this);
                }
            } else if (mf.getFatigue() > 0) {
                mf.setFatigue(Math.max(0, mf.getFatigue() - 5));
            }
        }
    }

    /*
     * ????????????
     */
    public MapleImp[] getImps() {
        return imps;
    }

    public void sendImp() {
        for (int i = 0; i < imps.length; i++) {
            if (imps[i] != null) {
                client.getSession().write(MaplePacketCreator.updateImp(imps[i], ImpFlag.SUMMONED.getValue(), i, true));
            }
        }
    }

    public int getBattlePoints() {
        return pvpPoints;
    }

    public int getTotalBattleExp() {
        return pvpExp;
    }

    public void setBattlePoints(int p) {
        if (p != pvpPoints) {
            client.getSession().write(UIPacket.getBPMsg(p - pvpPoints));
            updateSingleStat(MapleStat.BATTLE_POINTS, p);
        }
        this.pvpPoints = p;
    }

    public void setTotalBattleExp(int p) {
        int previous = pvpExp;
        this.pvpExp = p;
        if (p != previous) {
            stats.recalcPVPRank(this);
            updateSingleStat(MapleStat.BATTLE_EXP, stats.pvpExp);
            updateSingleStat(MapleStat.BATTLE_RANK, stats.pvpRank);
        }
    }

    public void changeTeam(int newTeam) {
        this.coconutteam = newTeam;
        if (inPVP()) {
            //client.getSession().write(MaplePacketCreator.getPVPTransform(newTeam + 1));
            //map.broadcastMessage(MaplePacketCreator.changeTeam(id, newTeam + 1));
        } else {
            client.getSession().write(MaplePacketCreator.showEquipEffect(newTeam));
        }
    }

    public void disease(int type, int level) {
        if (MapleDisease.getBySkill(type) == null) {
            return;
        }
        chair = 0;
        client.getSession().write(MaplePacketCreator.cancelChair(-1));
        map.broadcastMessage(this, MaplePacketCreator.showChair(id, 0), false);
        giveDebuff(MapleDisease.getBySkill(type), MobSkillFactory.getInstance().getMobSkill(type, level));
    }

    public boolean inPVP() {
        return eventInstance != null && eventInstance.getName().startsWith("PVP") && client.getChannelServer().isCanPvp();
    }

    public long getCooldownLimit(int skillid) {
        for (MapleCoolDownValueHolder mcdvh : getAllCooldowns()) {
            if (mcdvh.skillId == skillid) {
                return System.currentTimeMillis() - mcdvh.startTime;
            }
        }
        return 0;
    }

    public List<MapleCoolDownValueHolder> getAllCooldowns() {
        List<MapleCoolDownValueHolder> ret = new ArrayList<>();
        for (MapleCoolDownValueHolder mcdvh : coolDowns.values()) {
            ret.add(new MapleCoolDownValueHolder(mcdvh.skillId, mcdvh.startTime, mcdvh.length));
        }
        return ret;
    }

    public void clearAllCooldowns() {
        for (MapleCoolDownValueHolder m : getCooldowns()) {
            int skil = m.skillId;
            removeCooldown(skil);
            client.getSession().write(MaplePacketCreator.skillCooldown(skil, 0));
        }
    }

    /*
     * ????????????????????????
     */
    public Pair<Double, Boolean> modifyDamageTaken(double damage, MapleMapObject attacke) {
        Pair<Double, Boolean> ret = new Pair<>(damage, false);
        if (damage < 0) {
            return ret;
        }
        if (stats.ignoreDAMr > 0 && Randomizer.nextInt(100) < stats.ignoreDAMr_rate) { //?????????????????????#prop%????????????????????????#ignoreDAMr%
            damage -= Math.floor((stats.ignoreDAMr * damage) / 100.0f);
        }
        if (stats.ignoreDAM > 0 && Randomizer.nextInt(100) < stats.ignoreDAM_rate) { //?????????????????????#prop%???????????????#ignoreDAM?????????
            damage -= stats.ignoreDAM;
        }
        Integer div = getBuffedValue(MapleBuffStat.????????????);
        Integer div2 = getBuffedValue(MapleBuffStat.???????????????);
        if (div2 != null) {
            if (div2 <= 0) {
                cancelEffectFromBuffStat(MapleBuffStat.???????????????);
            } else {
                setBuffedValue(MapleBuffStat.???????????????, div2 - 1);
                damage = 0;
            }
        } else if (div != null) {
            if (div <= 0) {
                cancelEffectFromBuffStat(MapleBuffStat.????????????);
            } else {
                setBuffedValue(MapleBuffStat.????????????, div - 1);
                damage = 0;
            }
        }
        //????????????BUFF????????????20%
        if (getBuffedValue(MapleBuffStat.????????????) != null) {
            damage -= damage * (20 / 100.0);
        }
        List<Integer> attack = attacke instanceof MapleMonster || attacke == null ? null : (new ArrayList<Integer>());
        if (damage > 0) {
            if (getJob() == 122 && !skillisCooling(?????????.????????????)) { //???????????? - ??????????????????????????????????????????????????????????????????5??????????????????????????????????????????????????????????????????60??????????????????????????????????????????????????????????????????
                Skill divine = SkillFactory.getSkill(?????????.????????????);
                if (getTotalSkillLevel(divine) > 0) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    if (divineShield.makeChanceResult()) {
                        divineShield.applyTo(this);
                        client.getSession().write(MaplePacketCreator.skillCooldown(?????????.????????????, divineShield.getCooldown(this)));
                        addCooldown(?????????.????????????, System.currentTimeMillis(), divineShield.getCooldown(this) * 1000);
                    }
                }
            } else if (getJob() == 2005 || getJob() == 2500 || getJob() == 2510 || getJob() == 2511 || getJob() == 2512) {
                Skill skill = SkillFactory.getSkill(??????.???????????????1???);
                if (getTotalSkillLevel(skill) > 0) {
                    MapleStatEffect effect = skill.getEffect(getTotalSkillLevel(skill));
                    //System.err.println("?????? - ????????????: " + damage + " ????????????: " + effect.getDamAbsorbShieldR() + " ?????????: " + (effect.getDamAbsorbShieldR() / 100.0));
                    damage -= damage * (effect.getDamAbsorbShieldR() / 100.0);
                    //System.err.println("?????? - ????????????: " + damage);
                }
            } else if (getJob() == 2112) {
                Skill achilles = SkillFactory.getSkill(??????.????????????);
                if (getTotalSkillLevel(achilles) > 0) {
                    MapleStatEffect multiplier = achilles.getEffect(getTotalSkillLevel(achilles));
                    damage = ((multiplier.getX() / 1000.0) * damage);
                }
            } else if (getJob() == 111 || getJob() == 112) {
                handleOrbgain(true);
            } else if (getJob() == 321 || getJob() == 322) {
                MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
                if (effect != null && getBuffedValue(MapleBuffStat.????????????) != null) {
                    int buffHp = getBuffedValue(MapleBuffStat.????????????);
                    if (buffHp > 0) {
                        int xishou = (int) (damage * effect.makeRate(effect.getX())); //???????????????
                        int maxxishou = (int) (stats.getCurrentMaxHp() * effect.makeRate(effect.getZ())); //??????
                        if (xishou > maxxishou) {
                            xishou = maxxishou;
                        }
                        damage -= xishou;
                        buffHp -= xishou;
                    }
                    if (buffHp > 0) {
                        setBuffedValue(MapleBuffStat.????????????, buffHp);
                    } else {
                        cancelEffectFromBuffStat(MapleBuffStat.????????????);
                    }
                }
            } else if (getJob() == 2710 || getJob() == 2711 || getJob() == 2712) {
                lastBlessOfDarknessTime = System.currentTimeMillis();
                Skill skill = SkillFactory.getSkill(??????.????????????);
                if (getTotalSkillLevel(skill) > 0 && getBuffedValue(MapleBuffStat.????????????) != null) {
                    MapleStatEffect effect = skill.getEffect(getTotalSkillLevel(skill));
                    handleBlackBlessLost(1);
                    damage = ((effect.getX() / 100.0) * damage);
                }
            } else if (getJob() == 3112) {
                Skill divine = SkillFactory.getSkill(????????????.????????????);
                if (getTotalSkillLevel(divine) > 0) {
                    MapleStatEffect eff = divine.getEffect(getTotalSkillLevel(divine));
                    damage = ((eff.getX() / 1000.0) * damage);
                }
            } else if (getJob() == 5112) {
                Skill divine = SkillFactory.getSkill(?????????.???????????????);
                if (getTotalSkillLevel(divine) > 0) {
                    MapleStatEffect eff = divine.getEffect(getTotalSkillLevel(divine));
                    damage = ((eff.getX() / 1000.0) * damage);
                }
            } else if (getJob() == 3611 || getJob() == 3612) {
                MapleStatEffect effect = getStatForBuff(MapleBuffStat.?????????);
                if (effect != null && effect.getSourceId() == ??????.????????????) {
                    int ???????????? = getBuffedValue(MapleBuffStat.?????????);
                    ???????????? -= damage;
                    if (???????????? > 0) {
                        setBuffedValue(MapleBuffStat.?????????, ????????????);
                    } else {
                        dispelSkill(??????.????????????);
                    }
                }
            } else if (getJob() == 433 || getJob() == 434) {
                Skill divine = SkillFactory.getSkill(??????.???????????????);
                if (getTotalSkillLevel(divine) > 0 && getBuffedValue(MapleBuffStat.?????????) == null && !skillisCooling(divine.getId())) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    if (Randomizer.nextInt(100) < divineShield.getX()) {
                        divineShield.applyTo(this);
                    }
                }
            } else if ((getJob() == 512 || getJob() == 522 || getJob() == 582 || getJob() == 592 || getJob() == 572) && getBuffedValue(MapleBuffStat.????????????) == null) {
                Skill divine = SkillFactory.getSkill(getJob() == 512 ? ????????????.???????????? : ????????????.????????????);
                if (getTotalSkillLevel(divine) > 0 && !skillisCooling(divine.getId())) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    if (divineShield.makeChanceResult()) {
                        divineShield.applyTo(this);
                        client.getSession().write(MaplePacketCreator.skillCooldown(divine.getId(), divineShield.getX()));
                        addCooldown(divine.getId(), System.currentTimeMillis(), divineShield.getX() * 1000);
                    }
                }
            } else if ((getJob() == 531 || getJob() == 532) && attacke != null) {
                Skill divine = SkillFactory.getSkill(?????????.?????????);
                if (getTotalSkillLevel(divine) > 0) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    if (divineShield.makeChanceResult()) {
                        if (attacke instanceof MapleMonster) {
                            MapleMonster attacker = (MapleMonster) attacke;
                            int theDmg = (int) (divineShield.getDamage() * getStat().getCurrentMaxBaseDamage() / 100.0);
                            attacker.damage(this, theDmg, true);
                            getMap().broadcastMessage(MobPacket.damageMonster(attacker.getObjectId(), theDmg));
                        } else {
                            MapleCharacter attacker = (MapleCharacter) attacke;
                            attacker.addHP(-divineShield.getDamage());
                            attack.add(divineShield.getDamage());
                        }
                    }
                }
            } else if (getJob() == 132 && attacke != null) {
                Skill divine = SkillFactory.getSkill(?????????.????????????);
                if (getTotalSkillLevel(divine) > 0 && !skillisCooling(divine.getId()) && getBuffSource(MapleBuffStat.????????????) == ?????????.????????????) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    if (divineShield.makeChanceResult()) {
                        client.getSession().write(MaplePacketCreator.skillCooldown(divine.getId(), divineShield.getCooldown(this)));
                        addCooldown(divine.getId(), System.currentTimeMillis(), divineShield.getCooldown(this) * 1000);
                        if (attacke instanceof MapleMonster) {
                            MapleMonster attacker = (MapleMonster) attacke;
                            int theDmg = (int) (divineShield.getDamage() * getStat().getCurrentMaxBaseDamage() / 100.0);
                            attacker.damage(this, theDmg, true);
                            getMap().broadcastMessage(MobPacket.damageMonster(attacker.getObjectId(), theDmg));
                        } else {
                            MapleCharacter attacker = (MapleCharacter) attacke;
                            attacker.addHP(-divineShield.getDamage());
                            attack.add(divineShield.getDamage());
                        }
                    }
                }
            }
            if (attacke != null) {
                int damr = (Randomizer.nextInt(100) < getStat().DAMreflect_rate ? getStat().DAMreflect : 0) + (getBuffedValue(MapleBuffStat.????????????) != null ? getBuffedValue(MapleBuffStat.????????????) : 0);
                if (damr > 0) {
                    long bouncedamage = (long) (damage * damr / 100);
                    if (attacke instanceof MapleMonster) {
                        MapleMonster attacker = (MapleMonster) attacke;
                        bouncedamage = Math.min(bouncedamage, attacker.getMobMaxHp() / 10);
                        attacker.damage(this, bouncedamage, true);
                        getMap().broadcastMessage(this, MobPacket.damageMonster(attacker.getObjectId(), bouncedamage), getTruePosition());
                        if (getBuffSource(MapleBuffStat.????????????) == ????????????.????????????) {
                            MapleStatEffect eff = this.getStatForBuff(MapleBuffStat.????????????);
                            attacker.applyStatus(this, new MonsterStatusEffect(MonsterStatus.??????, 1, eff.getSourceId(), null, false, 0), false, 5000, true, eff); //??????5???
                        }
                    } else {
                        MapleCharacter attacker = (MapleCharacter) attacke;
                        bouncedamage = Math.min(bouncedamage, attacker.getStat().getCurrentMaxHp() / 10);
                        attacker.addHP(-((int) bouncedamage));
                        //log.info("??????Hp: " + ((int) bouncedamage));
                        attack.add((int) bouncedamage);
                        if (getBuffSource(MapleBuffStat.????????????) == ????????????.????????????) {
                            attacker.disease(MapleDisease.??????.getDisease(), 1);
                        }
                    }
                    ret.right = true;
                }
                if ((getJob() == 411 || getJob() == 412 || getJob() == 421 || getJob() == 422 || getJob() == 1411 || getJob() == 1412) && getBuffedValue(MapleBuffStat.?????????) != null) {
                    List<MapleSummon> ss = getSummonsReadLock();
                    try {
                        for (MapleSummon sum : ss) {
                            if (sum.getTruePosition().distanceSq(getTruePosition()) < 400000.0 && sum.is????????????()) {
                                if (attacke instanceof MapleMonster) {
                                    List<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<>();
                                    List<AttackPair> allDamage = new ArrayList<>();
                                    MapleMonster attacker = (MapleMonster) attacke;
                                    int theDmg = (int) (SkillFactory.getSkill(sum.getSkillId()).getEffect(sum.getSkillLevel()).getX() * damage / 100.0);
                                    allDamageNumbers.add(new Pair<>(theDmg, false));
                                    allDamage.add(new AttackPair(attacker.getObjectId(), allDamageNumbers));
                                    getMap().broadcastMessage(SummonPacket.summonAttack(sum.getOwnerId(), sum.getObjectId(), (byte) 0x84, (byte) 0x11, allDamage, getLevel(), true));
                                    attacker.damage(this, theDmg, true);
                                    checkMonsterAggro(attacker);
                                    if (!attacker.isAlive()) {
                                        getClient().getSession().write(MobPacket.killMonster(attacker.getObjectId(), 1));
                                    }
                                } else {
                                    MapleCharacter chr = (MapleCharacter) attacke;
                                    int dmg = SkillFactory.getSkill(sum.getSkillId()).getEffect(sum.getSkillLevel()).getX();
                                    chr.addHP(-dmg);
                                    attack.add(dmg);
                                }
                            }
                        }
                    } finally {
                        unlockSummonsReadLock();
                    }
                }
            }
        } else if (damage == 0) {
            if ((getJob() == 433 || getJob() == 434) && attacke != null) {
                Skill divine = SkillFactory.getSkill(??????.????????????);
                if (getTotalSkillLevel(divine) > 0) {
                    MapleStatEffect divineShield = divine.getEffect(getTotalSkillLevel(divine));
                    int prop = getTotalSkillLevel(divine) + 10;
                    if (Randomizer.nextInt(100) < prop) {
                        divineShield.applyTo(this);
                        getCheatTracker().resetTakeDamage();
                        getClient().getSession().write(MaplePacketCreator.sendCritAttack());
                    }
                }
            } else if ((getJob() == 3611 || getJob() == 3612)) {
                Skill AegisSystem = SkillFactory.getSkill(??????.???????????????);
                if (this.getBuffStatValueHolder(MapleBuffStat.???????????????) != null) {
                    MapleStatEffect effect = AegisSystem.getEffect(getTotalSkillLevel(AegisSystem));
                    if (effect != null && effect.makeChanceResult()) {
                        if (attacke instanceof MapleMonster) {
                            MapleMonster attacker = (MapleMonster) attacke;
                            int attackCount = effect.getX();
                            specialStats.gainForceCounter();
                            getClient().getSession().write(MaplePacketCreator.???????????????(getId(), ??????.???????????????_??????, specialStats.getForceCounter(), attacker.getObjectId(), attackCount));
                            if (attackCount - 1 > 0) {
                                specialStats.gainForceCounter(attackCount - 1);
                            }
                            getCheatTracker().resetTakeDamage();
                        }
                    }
                }
            }
        }
        if (attack != null && attack.size() > 0 && attacke != null) {
            getMap().broadcastMessage(MaplePacketCreator.pvpCool(attacke.getObjectId(), attack));
        }
        ret.left = damage;
        return ret;
    }

    /**
     * ????????????????????????HP,MP????????????????????????HP
     *
     * @param maxhp ??????HP
     * @param maxmp ??????MP
     * @param skillid ??????ID
     * @param moboid ????????????ID
     * @param totDamage ???????????????
     */
    public void onAttack(long maxhp, long maxmp, int skillid, int moboid, long totDamage) {
        /*????????????????????????????????????*/
        this.totDamageToMob = totDamage;

        //??????????????????
        Integer value = getBuffedValue(MapleBuffStat.????????????);
        if (value != null && totDamage > 0) {
            /*??????????????????????????????????????????????????????HP????????????????????????????????????HP???20%????????????#c???????????????30??????#??????????????????*/
 /*??????????????????#comboConAran??????#time??????????????????#x%?????????HP*/
            MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
            double maxhp_per = 50;
            switch (getBuffSource(MapleBuffStat.????????????)) {
                case ????????????.???????????????:
                    int currentdate = Integer.valueOf(DateUtil.getCurrentDate("ddHHmmss"));
                    if (value + effect.getY() > currentdate) {
                        break;
                    } else {
                        maxhp_per = effect.getW();
                        getBuffStatValueHolder(MapleBuffStat.????????????).value = currentdate;
                    }
                default:
                    addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) effect.getX() / 100.0)), ((double) stats.getMaxHp() / 100.0) * maxhp_per))));
                    break;
            }
        }
        if (getBuffedValue(MapleBuffStat.????????????) != null && totDamage > 0) {
            /*??????????????????????????????????????????????????????????????????????????????*/
 /*??????#mpConMP??????#time???????????????#v%??????????????????#w%???????????????/????????????#x%????????????????????????#z%?????????HP\n????????????#cooltime???*/
            addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) getStatForBuff(MapleBuffStat.????????????).getZ() / 100.0)), stats.getMaxHp() / 2))));
        }

        /*??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/
 /*???????????????#time???????????????????????????????????????#y%????????????????????????????????????????????????????????????????????????#x%????????????????????????????????????????????????#z%*/
        if (getJob() == 321 || getJob() == 322) {
            Skill skill = SkillFactory.getSkill(??????.????????????);
            if (getTotalSkillLevel(skill) > 0) {
                MapleStatEffect effect = skill.getEffect(getTotalSkillLevel(skill));
                effect.applyTo(this, true);
            }
        }

        if (getJob() == 212 || getJob() == 222 || getJob() == 232) {
            int[] skillIds = {??????.???????????????, ??????.???????????????, ??????.???????????????};
            for (int i : skillIds) {
                Skill skill = SkillFactory.getSkill(i);
                if (getTotalSkillLevel(skill) > 0) {
                    MapleStatEffect venomEffect = skill.getEffect(getTotalSkillLevel(skill));
                    if (venomEffect.makeChanceResult() && getAllLinkMid().size() < venomEffect.getY()) {
                        setLinkMid(moboid, venomEffect.getX());
                        venomEffect.applyTo(this);
                    }
                    break;
                }
            }
        }

        if (getBuffSource(MapleBuffStat.????????????) == ?????????.????????????) {
            Skill skil = SkillFactory.getSkill(?????????.????????????_??????);
            if (getTotalSkillLevel(skil) > 0) {
                MapleStatEffect effect = skil.getEffect(getTotalSkillLevel(skil));
                if (effect != null && effect.makeChanceResult()) {
                    if (totDamage > 0) {
                        addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) effect.getX() / 100.0)), stats.getMaxHp() / 10))));
                    }
                }
            }
        }
        if (skillid > 0) {
            Skill skil = SkillFactory.getSkill(skillid);
            MapleStatEffect effect = skil.getEffect(getTotalSkillLevel(skil));
            switch (skillid) {
                case 1078: //????????????????????? - ??????????????????????????????????????????????????????4????????????????????????????????????HP???????????????????????????????????????HP1/2???????????????????????????????????????HP???????????????????????????????????????????????????1???
                case ????????????.????????????:
                case ????????????.????????????: {
                    if (totDamage > 0) {
                        addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) effect.getX() / 100.0)), stats.getMaxHp() / 2))));
                    }
                    break;
                }
                case ??????.????????????:
                case ??????.????????????: {
                    setLinkMid(moboid, effect.getX());
                    break;
                }
            }
        }

        if (getJob() >= 420 && getJob() <= 422) {
            int s = getTotalSkillLevel(??????.????????????) > 0 ? ??????.???????????? : ??????.????????????;
            final Skill skill = SkillFactory.getSkill(s);
            final MapleStatEffect eff = skill.getEffect(getTotalSkillLevel(skill));
            if (getTotalSkillLevel(skill) > 0) {
                int critical = Math.min(100, (eff.getX() + getCriticalGrowth()));
                setCriticalGrowth((critical > 0 && critical <= 100) ? critical : 0);
                eff.applyTo(this);
            }
        } else if (JobConstants.is????????????(job)) {
            handleForceGain(moboid, skillid);
        } else if (JobConstants.is?????????(job)) {
            //????????????????????????Buff?????????????????????
            if (this.getBuffedValue(MapleBuffStat.????????????) != null) {
                if (skillid == ?????????.????????? || skillid == ?????????.?????????????????? || skillid == ?????????.????????? || skillid == ?????????.????????????
                        || skillid == ?????????.????????????_?????? || skillid == ?????????.????????????_?????? || skillid == ?????????.????????????) {
                    handle????????????(moboid);
                    //????????????????????????????????????!!!
                    handle????????????(moboid);
                }
            }
        } else if (JobConstants.is??????(job)) {
            if (skillid != ??????.???????????? && skillid != ??????.????????????) {
                handleCarteGain(moboid);
            }
        } else if (JobConstants.is??????(job)) {
            Skill skil = SkillFactory.getSkill(??????.???????????????1???);
            if (getTotalSkillLevel(skil) > 0) {
                MapleStatEffect effect = skil.getEffect(getTotalSkillLevel(skil));
                if (totDamage > 0) {
                    addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) effect.getX() / 100.0)), stats.getMaxHp() / 2))));
                }
            }
        } else if (JobConstants.is??????(job)) {
            if (skillid > 0) {
                handleLuminous(skillid); //????????????????????????
            }
            if (getJob() == 2712) {
                handleDarkCrescendo(); //????????????????????????
            }
            handleBlackBless(); //????????????????????????
        } else if (JobConstants.is??????(job)) {
            if (specialStats.isUsePower()) {
                addPowerCount(1); //??????????????????????????????????????????
            }
        } else if (JobConstants.is???????????????(job)) {
            if (totDamage > 0) {
                Skill skill = SkillFactory.getSkill(???????????????.????????????);
                int skillLevel = getTotalSkillLevel(skill);
                if (skillLevel > 0) {
                    MapleStatEffect effect = skill.getEffect(skillLevel);
                    if (effect != null && effect.makeChanceResult()) {
                        int hpheal = (int) (stats.getCurrentMaxHp() * (effect.getX() / 100.0));
                        if (isShowPacket()) {
                            dropSpouseMessage(0x0A, "[???????????????] ????????????Hp " + hpheal);
                        }
                        if (totDamage > 0) {
                            addHP(hpheal);
                        }
                    }
                }
            }
        } else if (JobConstants.is????????????(job)) {
            handleDeathPact(moboid, true);
        } else if (JobConstants.is?????????(job)) {
            if (skillid != 95001000) {
                //50% ??????????????? 20%
                if (getBuffedValue(MapleBuffStat.????????????) != null && specialStats.getArrowsMode() == 0 && Randomizer.nextInt(100) <= 50) {
                    if (totDamage > 0) {
                        addHP(((int) Math.min(maxhp, Math.min(((int) ((double) totDamage * (double) 20 / 100.0)), stats.getMaxHp() / 2))));
                    }
                }
                handleArrowsCharge(moboid);
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void afterAttack(int mobCount, int attackCount, int skillid) {

        /*HP????????????*/
        if (stats.hpRecoverProp > 0 && Randomizer.nextInt(100) <= stats.hpRecoverProp) {
            if (stats.hpRecover > 0) {
                healHP(stats.hpRecover);
            }
            /*HP???????????????*/
            if (stats.hpRecover_Percent > 0) {
                /*????????????HP*/
                addHP((int) ((double) stats.getCurrentMaxHp() * (double) stats.hpRecover_Percent / 100.0) * mobCount);
            }
        }
        /*MP????????????*/
        if (stats.mpRecoverProp > 0 && !JobConstants.isNotMpJob(getJob()) && Randomizer.nextInt(100) <= stats.mpRecoverProp) {
            if (stats.mpRecover > 0) {
                healMP(stats.mpRecover);
            }
        }

        switch (getJob()) {
            case 510:
            case 511:
            case 512:
                if (!specialStats.isEnergyfull()) {
                    handleEnergyCharge(mobCount * 2);
                } else {
                    handleEnergyConsume(mobCount, skillid);
                }
                break;
            case 110:
            case 111:
            case 112:
            case 2411: //?????????????????? ??????????????????????????????
            case 2412:
                if (skillid != ??????.????????? & getBuffedValue(MapleBuffStat.????????????) != null) {
                    handleOrbgain(false);
                }
                break;
            case 6100:
            case 6110:
            case 6111:
            case 6112:
                int amon = 0;
                switch (skillid) {
                    case ????????????.??????:
                    case ????????????.??????_??????:
                        amon = 1;
                        break;
                    case ????????????.?????????_2:
                    case ????????????.?????????:
                        amon = 2;
                        break;
                    case ????????????.?????????:
                    case ????????????.????????????:
                        amon = 3;
                        break;
                    case ????????????.????????????:
                    case ????????????.???????????????:
                    case ????????????.????????????:
                    case ????????????.????????????:
                        amon = 5;
                        break;
                    case ????????????.????????????:
                    case ????????????.??????????????????:
                        amon = 20;
                        break;
                    case ????????????.????????????:
                        amon = 40;
                        break;
                }
                if (amon > 0) {
                    handleMorphCharge(amon);
                }
                break;
        }
        if (!isIntern()) {
            cancelEffectFromBuffStat(MapleBuffStat.????????????);
            MapleStatEffect ds = getStatForBuff(MapleBuffStat.?????????);
            if (ds != null) {
                if (ds.getSourceId() != ??????.??????????????? || !ds.makeChanceResult()) {
                    cancelEffectFromBuffStat(MapleBuffStat.?????????);
                }
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void beforeKillMonster(int moboid, int skillid) {
        /* ???????????????????????????????????? */
        if (JobConstants.is????????????(job) && skillid != ??????.????????????) {
            handleForceGain(moboid, ????????????.????????????);
        } else if (JobConstants.is????????????(job)) {
            handleDeathPact(moboid, false);
        }
    }

    public void applyIceGage(int x) {
        updateSingleStat(MapleStat.ICE_GAGE, x);
    }

    public Rectangle getBounds() {
        return new Rectangle(getTruePosition().x - 25, getTruePosition().y - 75, 50, 75);
    }

    /*
     * ???????????????
     */
    public boolean getCygnusBless() {
        int jobid = getJob();
        return getSkillLevel(12) > 0 && (jobid >= 0 && jobid < 1000) //?????????
                || getSkillLevel(10000012) > 0 && (jobid >= 1000 && jobid < 2000) //?????????
                || getSkillLevel(20000012) > 0 && (jobid == 2000 || jobid >= 2100 && jobid <= 2112) //??????
                || getSkillLevel(20010012) > 0 && (jobid == 2001 || jobid >= 2200 && jobid <= 2218) //??????
                || getSkillLevel(20020012) > 0 && (jobid == 2002 || jobid >= 2300 && jobid <= 2312) //????????????
                || getSkillLevel(20030012) > 0 && (jobid == 2003 || jobid >= 2400 && jobid <= 2412) //????????????
                || getSkillLevel(20040012) > 0 && (jobid == 2004 || jobid >= 2700 && jobid <= 2712) //????????????
                || getSkillLevel(30000012) > 0 && (jobid == 3000 || jobid >= 3200 && jobid <= 3512) //????????????
                || getSkillLevel(30010012) > 0 && (JobConstants.is????????????(jobid)) //????????????
                || getSkillLevel(30020012) > 0 && (jobid == 3002 || jobid >= 3600 && jobid <= 3612) //??????
                || getSkillLevel(50000012) > 0 && (jobid == 5000 || jobid >= 5100 && jobid <= 5112) //?????????
                || getSkillLevel(60000012) > 0 && (jobid == 6000 || jobid >= 6100 && jobid <= 6112) //????????????
                || getSkillLevel(60010012) > 0 && (jobid == 6001 || jobid >= 6500 && jobid <= 6512) //???????????????
                || getSkillLevel(100000012) > 0 && (jobid == 10000 || jobid >= 10100 && jobid <= 10112) //?????????
                || getSkillLevel(110000012) > 0 && (jobid == 11000 || jobid >= 11200 && jobid <= 11212) //?????????
                ;
    }

    public byte get????????????() {
        int jobid = getJob();
        if (getSkillLevel(20021110) > 0 && (jobid == 2002 || jobid >= 2300 && jobid <= 2312) || getSkillLevel(80001040) > 0) {
            return 10;
        }
        return 0;
    }

    /*
     * ????????????????????????
     */
    public void handleForceGain(int oid, int skillid) {
        handleForceGain(oid, skillid, 0);
    }

    public void handleForceGain(int moboid, int skillid, int extraForce) {
        if (!GameConstants.isForceIncrease(skillid) && extraForce <= 0) {
            return;
        }
        int forceGain = Math.max(3, Randomizer.nextInt(5) + 1), forceColor = 3;

        MapleMonster mob = getMap().getMonsterByOid(moboid);
        if (mob != null && mob.getStats().isBoss()) {
            forceGain = 10;
            forceColor = 10;
        } else {
            if (skillid == ????????????.??????????????? || skillid == ????????????.???????????????1 || skillid == ????????????.???????????????2 || skillid == ????????????.???????????????3) {
                int skilllevel = getSkillLevel(????????????.??????????????????);
                if (skilllevel > 0) {
                    MapleStatEffect effect = SkillFactory.getSkill(????????????.??????????????????).getEffect(skilllevel);
                    if (Randomizer.nextInt(100) > effect.getProp()) {
                        return;
                    }
                }
            } else if (skillid == ????????????.????????????) {
                forceColor = 5;
            }
        }
        forceGain = extraForce > 0 ? extraForce : forceGain;
        specialStats.addForceCounter(forceGain);
        getClient().getSession().write(MaplePacketCreator.showForce(this, moboid, specialStats.getForceCounter(), forceColor));
    }

    /*
     * ??????????????????
     */
    public int getCardStack() {
        return specialStats.getCardStack();
    }

    /*
     * ??????????????????
     */
    public int getCarteByJob() {
        if (getSkillLevel(??????.????????????_??????) > 0) {
            return 40;
        } else if (getSkillLevel(??????.????????????) > 0) {
            return 20;
        }
        return 0;
    }

    public void setCardStack(int amount) {
        specialStats.setCardStack(amount);
    }

    /*
     * ???????????????????????????
     */
    public void handleCarteGain(int oid) {
        Skill skill_2 = SkillFactory.getSkill(??????.????????????);
        Skill skill_4 = SkillFactory.getSkill(??????.????????????);
        MapleStatEffect effect;
        if (getSkillLevel(skill_4) > 0) {
            effect = skill_4.getEffect(getTotalSkillLevel(skill_4));
        } else if (getSkillLevel(skill_2) > 0) {
            effect = skill_2.getEffect(getTotalSkillLevel(skill_2));
        } else {
            return;
        }
        if (effect != null && effect.makeChanceResult() && Randomizer.nextInt(100) <= 50) {
            specialStats.gainForceCounter();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), oid, effect.getSourceId(), specialStats.getForceCounter(), effect.getSourceId() == ??????.???????????? ? 2 : 1, 1));
            if (specialStats.getCardStack() < getCarteByJob()) {
                specialStats.gainCardStack();
                client.getSession().write(MaplePacketCreator.updateCardStack(specialStats.getCardStack()));
            }
        }
    }

    /*
     * ????????????BUFF???????????????10????????????
     */
    public void handleCarteAttack() {
        Skill skill_2 = SkillFactory.getSkill(??????.????????????);
        Skill skill_4 = SkillFactory.getSkill(??????.????????????);
        MapleStatEffect effect;
        if (getSkillLevel(skill_4) > 0) {
            effect = skill_4.getEffect(getTotalSkillLevel(skill_4));
        } else if (getSkillLevel(skill_2) > 0) {
            effect = skill_2.getEffect(getTotalSkillLevel(skill_2));
        } else {
            return;
        }
        if (effect != null) {
            specialStats.gainForceCounter();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), 0, effect.getSourceId(), specialStats.getForceCounter(), effect.getSourceId() == ??????.???????????? ? 2 : 1, 10));
            specialStats.gainForceCounter(10 - 1);
        }
    }

    /*
     * ???????????? ????????????
     */
    public void handleCardStack(int oid, int skillId) {
        Skill skill = SkillFactory.getSkill(skillId);
        if (getSkillLevel(skill) > 0) {
            MapleStatEffect effect = skill.getEffect(getSkillLevel(skill));
            if (effect != null) {
                specialStats.gainForceCounter();
                int color = skillId == ??????.???????????? ? 6 : 2;
                client.getSession().write(MaplePacketCreator.??????????????????(getId(), oid, skillId, specialStats.getForceCounter(), color, effect.getBulletCount()));
                specialStats.gainForceCounter(effect.getBulletCount() - 1);
            }
        }
    }

    /*
     * ????????????????????????????????????
     */
    public void handleAssassinStack(MapleMonster mob, int visProjectile) {
        Skill skill_2 = SkillFactory.getSkill(??????.????????????);
        Skill skill_4 = SkillFactory.getSkill(??????.????????????);
        MapleStatEffect effect;
        boolean isAssassin;
        if (getSkillLevel(skill_4) > 0) {
            isAssassin = false;
            effect = skill_4.getEffect(getTotalSkillLevel(skill_4));
        } else if (getSkillLevel(skill_2) > 0) {
            isAssassin = true;
            effect = skill_2.getEffect(getTotalSkillLevel(skill_2));
        } else {
            return;
        }
        if (effect != null && effect.makeChanceResult() && mob != null) {
            int mobCount = effect.getMobCount();
            Rectangle bounds = effect.calculateBoundingBox(mob.getTruePosition(), mob.isFacingLeft());
            List<MapleMapObject> affected = map.getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER));
            List<Integer> moboids = new ArrayList<>();
            for (MapleMapObject mo : affected) {
                if (moboids.size() < mobCount && mo.getObjectId() != mob.getObjectId()) {
                    moboids.add(mo.getObjectId());
                }
            }
            specialStats.gainForceCounter();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), mob.getObjectId(), specialStats.getForceCounter(), isAssassin, moboids, visProjectile, mob.getTruePosition()));
            specialStats.gainForceCounter(moboids.size());
        }
    }

    /*
     * ??????????????????
     */
    public void handleMesoExplosion() {
        Skill skill = SkillFactory.getSkill(??????.????????????);
        int skillLevel = getTotalSkillLevel(skill);
        if (skillLevel <= 0) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(skillLevel);
        MapleStatEffect effect_fadong = SkillFactory.getSkill(??????.????????????_??????).getEffect(skillLevel);
        if (effect != null && effect_fadong != null) {
            //?????????????????????ID
            int mobCount = effect.getMobCount(); //?????????????????????
            Rectangle bounds = effect_fadong.calculateBoundingBox(getTruePosition(), isFacingLeft());
            List<MapleMapObject> affected = map.getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER));
            List<Integer> moboids = new ArrayList<>();
            for (MapleMapObject mo : affected) {
                if (moboids.size() < mobCount) {
                    moboids.add(mo.getObjectId());
                }
            }
            if (moboids.isEmpty()) {
                return;
            }
            //???????????????????????????
            int mesoCount = effect.getBulletCount() + (getTotalSkillLevel(??????.????????????_??????) > 0 ? 5 : 0); //???????????????????????????
            affected = map.getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.ITEM));
            List<Point> posFroms = new ArrayList<>();
            for (MapleMapObject mo : affected) {
                if (posFroms.size() < mesoCount) {
                    MapleMapItem mapitem = (MapleMapItem) mo;
                    mapitem.getLock().lock();
                    try {
                        if (mapitem.getMeso() > 0 && !mapitem.isPickedUp() && mapitem.getOwner() == getId()) {
                            Point droppos = new Point(mapitem.getTruePosition());
                            posFroms.add(droppos);
                            //?????????????????????
                            mapitem.setPickedUp(true);
                            map.broadcastMessage(InventoryPacket.removeItemFromMap(mapitem.getObjectId(), 0, 0), mapitem.getPosition());
                            map.removeMapObject(mapitem);
                        }
                    } finally {
                        mapitem.getLock().unlock();
                    }
                }
            }
            //????????????
            specialStats.gainForceCounter();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), effect_fadong.getSourceId(), specialStats.getForceCounter(), moboids, posFroms));
            specialStats.gainForceCounter(posFroms.size());
        }
    }

    public void handle????????????() {
        Skill skill_2 = SkillFactory.getSkill(????????????.???????????????);
        Skill skill_3 = SkillFactory.getSkill(????????????.???????????????);
        Skill skill_4 = SkillFactory.getSkill(????????????.???????????????);
        MapleStatEffect effect;
        if (getSkillLevel(skill_4) > 0) {
            effect = skill_4.getEffect(getTotalSkillLevel(skill_4));
        } else if (getSkillLevel(skill_3) > 0) {
            effect = skill_3.getEffect(getTotalSkillLevel(skill_3));
        } else if (getSkillLevel(skill_2) > 0) {
            effect = skill_2.getEffect(getTotalSkillLevel(skill_2));
        } else {
            return;
        }
        if (effect != null) {
            int prop = effect.getProp() + (getSkillLevel(????????????.????????????_??????) > 0 ? 10 : 0);
            //???????????????????????????
            if (Randomizer.nextInt(100) <= prop) {
                int mobCount = effect.getX();
                Rectangle bounds = effect.calculateBoundingBox(getTruePosition(), isFacingLeft());
                List<MapleMapObject> affected = map.getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER));
                List<Integer> moboids = new ArrayList<>();
                for (MapleMapObject mo : affected) {
                    if (moboids.size() < mobCount) {
                        moboids.add(mo.getObjectId());
                    }
                }
                specialStats.gainForceCounter();
                client.getSession().write(MaplePacketCreator.??????????????????(getId(), effect.getSourceId(), specialStats.getForceCounter(), moboids));
                specialStats.gainForceCounter(moboids.size());
            }
        }
    }

    public void handle????????????(int oid) {
        MapleStatEffect effect = getStatForBuff(MapleBuffStat.????????????);
        if (effect != null && effect.makeChanceResult()) {
            specialStats.gainCardStack();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), oid, effect.getSourceId(), specialStats.getCardStack()));
            specialStats.gainCardStack();
        }
    }

    public void handle????????????() {
        //?????????????????????
        if (flameMapId != getMapId() || flamePoint == null) {
            flameMapId = getMapId();
            flamePoint = new Point(getTruePosition());
        }
        //??????????????????
        if (!flamePoint.equals(getTruePosition())) {
            client.getSession().write(MaplePacketCreator.instantMapWarp(getId(), flamePoint));
            checkFollow();
            getMap().movePlayer(this, flamePoint);
            flamePoint = null;
        }
    }

    public int get????????????() {
        if (getBuffedValue(MapleBuffStat.????????????) == null) {
            return 0;
        }
        return getBuffedValue(MapleBuffStat.????????????);
    }

    public void handle????????????(int skillId) {
        if (!GameConstants.is????????????(skillId)) {
            return;
        }
        //??????????????????
        int linkSkillId = GameConstants.getLinkedAttackSkill(skillId);
        Skill skill = SkillFactory.getSkill(linkSkillId);
        int skilllevel = getSkillLevel(skill);
        if (skilllevel <= 0) {
            return;
        }
        skill.getEffect(skilllevel).applyTranscendBuff(this);
        //??????????????????
        skill = SkillFactory.getSkill(???????????????.??????);
        skilllevel = getSkillLevel(skill);
        if (skilllevel <= 0) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(skilllevel);
        MapleBuffStat buffStat = MapleBuffStat.????????????;
        if (getBuffedValue(buffStat) == null) {
            effect.applyTo(this); //?????????1??????BUFF??????
            return;
        }
        int oldCombos = getBuffedIntValue(buffStat);
        if (oldCombos < 20) {
            int newCombos = oldCombos;
            newCombos += 1;
            if (newCombos >= 20) {
                newCombos = 20;
            }
            if (newCombos != oldCombos) {
                setBuffedValue(buffStat, newCombos);
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(buffStat, newCombos));
            client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), effect.getDuration(), stat, effect, this));
        }
    }

    /*
     * ?????????????????????1???
     */
    public void handle????????????(int oid) {
        Skill skill = SkillFactory.getSkill(???????????????.????????????_??????);
        int skilllevel = getSkillLevel(???????????????.????????????);
        if (skilllevel > 0) {
            MapleStatEffect effect = skill.getEffect(skilllevel);
            //?????????40%????????? ??????????????? ??????????????????
            if (effect != null && Randomizer.nextInt(100) <= 50) {
                specialStats.gainCardStack();
                client.getSession().write(MaplePacketCreator.??????????????????(getId(), ???????????????.????????????_??????, specialStats.getCardStack(), oid));
                specialStats.gainCardStack();
            }
        }
    }

    /*
     * ??????????????????????????????
     */
    public void handle????????????(int oid) {
        if (getBuffedValue(MapleBuffStat.????????????) == null || specialStats.getArrowsMode() != 2) {
            return;
        }
        int prop = 30; //?????????30%?????????
        int skillId = ?????????.????????????_??????;
        Skill skill = SkillFactory.getSkill(?????????.????????????);
        if (getSkillLevel(skill) > 0) {
            MapleStatEffect effect = skill.getEffect(getSkillLevel(skill));
            if (effect != null) {
                prop = effect.getU();
                skillId = ?????????.????????????_??????;
            }
        }
        if (Randomizer.nextInt(100) <= prop) {
            specialStats.gainCardStack();
            client.getSession().write(MaplePacketCreator.??????????????????(getId(), skillId, specialStats.getCardStack(), oid));
            specialStats.gainCardStack();
        }
    }

    /*
     * ?????????????????????????????????
     */
    public void handle????????????(int moboid) {
        //??????????????????
        Skill BuffSkill = SkillFactory.getSkill(?????????.????????????);
        Skill skill_1 = SkillFactory.getSkill(?????????.????????????_?????????);
        Skill skill_2 = SkillFactory.getSkill(?????????.????????????);
        Skill skill_3 = SkillFactory.getSkill(?????????.???????????????);
        Skill skill_4 = SkillFactory.getSkill(?????????.???????????????);
        int skillLevel_1 = getSkillLevel(BuffSkill);
        int skillLevel_2 = getSkillLevel(skill_2);
        int skillLevel_3 = getSkillLevel(skill_3);
        int skillLevel_4 = getSkillLevel(skill_4);
        if (skillLevel_1 < 0) {
            return;
        }
        MapleStatEffect effect = skill_1.getEffect(skillLevel_1);
        int attackCount = effect.getZ(); //?????????????????????????????????
        this.attackHit++;
        if (attackHit < attackCount) {
            return; //????????????3??????????????????
        }
        int maxSummon = effect.getY(); //??????????????????
        int maxS = maxSummon;
        if (skillLevel_2 > 0) {
            maxS = maxS + 1;
        }
        if (skillLevel_3 > 0) {
            maxS = maxS + 1;
        }
        if (skillLevel_4 > 0) {
            maxS = maxS + 1;
        }
        int nowSummon = summons != null ? summons.size() : 0; //???????????????????????????
        if (nowSummon < maxS) {
            effect.applyTo(this); //???????????????
        }
        this.attackHit = 0; //??????????????????
    }

    /*
     * ????????????
     * ??????
     * 1012276 - ????????????1 - (?????????)
     * 1012277 - ????????????2 - (?????????)
     * 1012278 - ????????????3 - (?????????)
     * 1012279 - ????????????4 - (?????????)
     * 1012280 - ????????????5 - (?????????)
     * ??????
     * 1012361 - ???????????? - (?????????)
     * 1012363 - ???????????? - (?????????)
     * ?????????
     * 1012455 - ??????????????? - (?????????)
     * 1012456 - ???????????? - (?????????)
     * 1012457 - ?????????????????? - (?????????)
     * 1012458 - ?????????????????? - (?????????)
     */
    public void setDecorate(int id) {
        if ((id >= 1012276 && id <= 1012280) || id == 1012361 || id == 1012363 || id == 1012455 || id == 1012456 || id == 1012457 || id == 1012458) {
            this.decorate = id;
        } else {
            this.decorate = 0;
        }
    }

    public int getDecorate() {
        return decorate;
    }

    public boolean hasDecorate() {
        return JobConstants.is????????????(getJob()) || JobConstants.is??????(getJob()) || JobConstants.is?????????(getJob());
    }

    /*
     * ?????????????????????????????????
     */
    public void checkTailAndEar() {
        if (!JobConstants.is?????????(getJob())) {
            return;
        }
        if (!questinfo.containsKey(59300)) {
            updateInfoQuest(59300, "bTail=1;bEar=1;TailID=5010119;EarID=5010116", false);
        }
    }

    /*
     * ?????????????????????????????????
     * Tail = ??????
     * Ear = ??????
     * 59300 = ????????????????????????????????????ID
     *
     * 5012000 - ????????????????????? - ??????#c?????????#????????????????????????????????????????????????????????????????????????????????????
     * 5012001 - ????????????????????? - ??????#c?????????#????????????????????????????????????????????????????????????????????????????????????
     */
    public void hiddenTailAndEar(int itemId) {
        if (!JobConstants.is?????????(getJob()) || map == null) {
            return;
        }
        int questId = 59300;
        //????????????????????????????????????????????????
        if (!questinfo.containsKey(questId)) {
            updateInfoQuest(questId, "bTail=1;bEar=1;TailID=5010119;EarID=5010116", true);
        }
        //?????????????????????????????????????????? ???????????????????????????????????????
        if (!containsInfoQuest(questId, "bTail") || !containsInfoQuest(questId, "bEar") || !containsInfoQuest(questId, "TailID") || !containsInfoQuest(questId, "EarID")) {
            updateInfoQuest(questId, "bTail=1;bEar=1;TailID=5010119;EarID=5010116", true);
        }
        if (itemId == 5012000) { //????????????????????? - ??????#c?????????#????????????????????????????????????????????????????????????????????????????????????
            setInfoQuestStat(questId, "bEar", containsInfoQuest(questId, "bEar=1") ? "0" : "1");
        } else if (itemId == 5012001) { //????????????????????? - ??????#c?????????#????????????????????????????????????????????????????????????????????????????????????
            setInfoQuestStat(questId, "bTail", containsInfoQuest(questId, "bTail=1") ? "0" : "1");
        }
        map.broadcastMessage(InventoryPacket.hiddenTailAndEar(getId(), containsInfoQuest(questId, "bTail=0"), containsInfoQuest(questId, "bEar=0")));
    }

    /*
     * 7784 ????????????????????????
     */
    public void changeElfEar() {
        updateInfoQuest(GameConstants.????????????, containsInfoQuest(GameConstants.????????????, "sw=") ? containsInfoQuest(GameConstants.????????????, "sw=1") ? "sw=0" : "sw=1" : "sw=1");
        if (containsInfoQuest(GameConstants.????????????, JobConstants.is????????????(getJob()) ? "sw=0" : "sw=1")) {
            getClient().getSession().write(EffectPacket.showOwnJobChangedElf("Effect/BasicEff.img/JobChangedElf", 2, 5155000));
            getMap().broadcastMessage(this, EffectPacket.showJobChangedElf(this.getId(), "Effect/BasicEff.img/JobChangedElf", 2, 5155000), false);
        } else {
            getClient().getSession().write(EffectPacket.showOwnJobChangedElf("Effect/BasicEff.img/JobChanged", 2, 5155000));
            getMap().broadcastMessage(this, EffectPacket.showJobChangedElf(this.getId(), "Effect/BasicEff.img/JobChanged", 2, 5155000), false);
        }
        equipChanged();
    }

    public boolean isElfEar() {
        if (containsInfoQuest(GameConstants.????????????, "sw=")) {
            return containsInfoQuest(GameConstants.????????????, JobConstants.is????????????(getJob()) ? "sw=0" : "sw=1");
        }
        return JobConstants.is????????????(getJob());
    }

    /*
     * Vip ????????????
     */
    public void setVip(int vip) {
        if (vip >= 5) {
            this.vip = 5;
        } else if (vip < 0) {
            this.vip = 0;
        } else {
            this.vip = vip;
        }
    }

    public int getVip() {
        return vip;
    }

    public boolean isVip() {
        return vip > 0;
    }

    public Timestamp getViptime() {
        if (getVip() == 0) {
            return null;
        }
        return viptime;
    }

    public void setViptime(long period) {
        if (period > 0) {
            Timestamp expiration = new Timestamp(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
            setViptime(expiration);
        } else {
            setViptime(null);
        }
    }

    public void setViptime(Timestamp expire) {
        this.viptime = expire;
    }

    /*
     * ????????????BOSS???????????????
     */
    public int getBossLog(String boss) {
        return getBossLog(boss, 0);
    }

    public int getBossLog(String boss, int type) {
        try {
            int count = 0;
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM bosslog WHERE characterid = ? AND bossid = ?");
            ps.setInt(1, id);
            ps.setString(2, boss);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                /*
                 * ??????calendar.get(Calendar.YEAR)
                 * ??????calendar.get(Calendar.MONTH)+1
                 * ??????calendar.get(Calendar.DAY_OF_MONTH)
                 * ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
                 */
                count = rs.getInt("count");
                if (count < 0) {
                    return count;
                }
                Timestamp bossTime = rs.getTimestamp("time");
                rs.close();
                ps.close();
                if (type == 0) {
                    Calendar sqlcal = Calendar.getInstance();
                    if (bossTime != null) {
                        sqlcal.setTimeInMillis(bossTime.getTime());
                    }
                    if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 <= Calendar.getInstance().get(Calendar.DAY_OF_MONTH) || sqlcal.get(Calendar.MONTH) + 1 <= Calendar.getInstance().get(Calendar.MONTH) || sqlcal.get(Calendar.YEAR) + 1 <= Calendar.getInstance().get(Calendar.YEAR)) {
                        count = 0;
                        ps = con.prepareStatement("UPDATE bosslog SET count = 0, time = CURRENT_TIMESTAMP() WHERE characterid = ? AND bossid = ?");
                        ps.setInt(1, id);
                        ps.setString(2, boss);
                        ps.executeUpdate();
                    }
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO bosslog (characterid, bossid, count, type) VALUES (?, ?, ?, ?)");
                psu.setInt(1, id);
                psu.setString(2, boss);
                psu.setInt(3, 0);
                psu.setInt(4, type);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("??????BOSS????????????.", Ex);
            return -1;
        }
    }

    /*
     * ????????????BOSS???????????????
     */
    public void setBossLog(String boss) {
        setBossLog(boss, 0);
    }

    public void setBossLog(String boss, int type) {
        setBossLog(boss, type, 1);
    }

    public void setBossLog(String boss, int type, int count) {
        int bossCount = getBossLog(boss, type);
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE bosslog SET count = ?, type = ?, time = CURRENT_TIMESTAMP() WHERE characterid = ? AND bossid = ?");
            ps.setInt(1, bossCount + count);
            ps.setInt(2, type);
            ps.setInt(3, id);
            ps.setString(4, boss);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("Error while set bosslog.", Ex);
        }
    }

    /*
     * ????????????BOSS???????????????
     */
    public void resetBossLog(String boss) {
        resetBossLog(boss, 0);
    }

    public void resetBossLog(String boss, int type) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE bosslog SET count = ?, type = ?, time = CURRENT_TIMESTAMP() WHERE characterid = ? AND bossid = ?");
            ps.setInt(1, 0);
            ps.setInt(2, type);
            ps.setInt(3, id);
            ps.setString(4, boss);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("??????BOSS????????????.", Ex);
        }
    }

    public int getBossLogAcc(String boss) {
        try {
            int count = 0;
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM bosslog WHERE accountid = ? AND bossid = ?");
            ps.setInt(1, accountid);
            ps.setString(2, boss);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                /*
                 * ??????calendar.get(Calendar.YEAR)
                 * ??????calendar.get(Calendar.MONTH)+1
                 * ??????calendar.get(Calendar.DAY_OF_MONTH)
                 * ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
                 */
                count = rs.getInt("count");
                if (count < 0) {
                    return count;
                }
                Timestamp bossTime = rs.getTimestamp("time");
                rs.close();
                ps.close();
                Calendar sqlcal = Calendar.getInstance();
                if (bossTime != null) {
                    sqlcal.setTimeInMillis(bossTime.getTime());
                }
                if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 <= Calendar.getInstance().get(Calendar.DAY_OF_MONTH) || sqlcal.get(Calendar.MONTH) + 1 <= Calendar.getInstance().get(Calendar.MONTH) || sqlcal.get(Calendar.YEAR) + 1 <= Calendar.getInstance().get(Calendar.YEAR)) {
                    count = 0;
                    ps = con.prepareStatement("UPDATE bosslog SET count = 0, time = CURRENT_TIMESTAMP() WHERE accountid = ? AND bossid = ?");
                    ps.setInt(1, accountid);
                    ps.setString(2, boss);
                    ps.executeUpdate();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO bosslog (accountid, characterid, bossid, count) VALUES (?, ?, ?, ?)");
                psu.setInt(1, accountid);
                psu.setInt(2, 0);
                psu.setString(3, boss);
                psu.setInt(4, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("??????BOSS????????????.", Ex);
            return -1;
        }
    }

    public void setBossLogAcc(String bossid) {
        setBossLogAcc(bossid, 0);
    }

    public void setBossLogAcc(String bossid, int bossCount) {
        bossCount += getBossLogAcc(bossid);
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE bosslog SET count = ?, characterid = ?, time = CURRENT_TIMESTAMP() WHERE accountid = ? AND bossid = ?");
            ps.setInt(1, bossCount + 1);
            ps.setInt(2, id);
            ps.setInt(3, accountid);
            ps.setString(4, bossid);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("Error while set bosslog.", Ex);
        }
    }

    public int getEventLogForDay(String event) {
        try {
            int count = 0;
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM eventforday WHERE eventid = ?");
            ps.setString(1, event);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    count = rs.getInt("count");
                    if (count < 0) {
                        return count;
                    }
                    Timestamp eventTime = rs.getTimestamp("time");
                    rs.close();
                    ps.close();
                    Calendar sqlcal = Calendar.getInstance();
                    if (eventTime != null) {
                        sqlcal.setTimeInMillis(eventTime.getTime());
                    }
                    if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 <= Calendar.getInstance().get(Calendar.DAY_OF_MONTH) || sqlcal.get(Calendar.MONTH) + 1 <= Calendar.getInstance().get(Calendar.MONTH) || sqlcal.get(Calendar.YEAR) + 1 <= Calendar.getInstance().get(Calendar.YEAR)) {
                        count = 0;
                        ps = con.prepareStatement("UPDATE eventforday SET count = 0, time = CURRENT_TIMESTAMP() WHERE eventid = ?");
                        ps.setString(1, event);
                        ps.executeUpdate();
                    }
                } else {
                    try (PreparedStatement psu = con.prepareStatement("INSERT INTO eventforday (eventid, count) VALUES (?, ?)")) {
                        psu.setString(1, event);
                        psu.setInt(2, 0);
                        psu.executeUpdate();
                    }
                }
            }
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("Error while get EventLogForDay.", Ex);
            return -1;
        }
    }

    public void setEventLogForDay(String eventid) {
        setEventLogForDay(eventid, 0);
    }

    public void setEventLogForDay(String eventid, int eventCount) {
        eventCount += getEventLogForDay(eventid);
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE eventforday SET count = ?, time = CURRENT_TIMESTAMP() WHERE eventid = ?")) {
                ps.setInt(1, eventCount + 1);
                ps.setString(2, eventid);
                ps.executeUpdate();
            }
        } catch (Exception Ex) {
            log.error("Error while set EventLogForDay.", Ex);
        }
    }

    public void resetEventLogForDay(String eventid) {
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE eventforday SET count = ?, time = CURRENT_TIMESTAMP() WHERE eventid = ?")) {
                ps.setInt(1, 0);
                ps.setString(2, eventid);
                ps.executeUpdate();
            }
        } catch (Exception Ex) {
            log.error("Error while reset EventLogForDay.", Ex);
        }
    }

    /*
     * ?????????????????????
     */
    public void updateCash() {
        client.getSession().write(MaplePacketCreator.showCharCash(this));
    }

    /*
     * ????????????????????????
     */
    public short getSpace(int type) {
        return getInventory(MapleInventoryType.getByType((byte) type)).getNumFreeSlot();
    }

    public boolean haveSpace(int type) {
        short slot = getInventory(MapleInventoryType.getByType((byte) type)).getNextFreeSlot();
        return (slot != -1);
    }

    public boolean haveSpaceForId(int itemid) {
        short slot = getInventory(ItemConstants.getInventoryType(itemid)).getNextFreeSlot();
        return (slot != -1);
    }

    public boolean canHold() {
        for (int i = 1; i <= 5; i++) {
            if (getInventory(MapleInventoryType.getByType((byte) i)).getNextFreeSlot() <= -1) {
                return false;
            }
        }
        return true;
    }

    public boolean canHoldSlots(int slot) {
        for (int i = 1; i <= 5; i++) {
            if (getInventory(MapleInventoryType.getByType((byte) i)).isFull(slot)) {
                return false;
            }
        }
        return true;
    }

    public boolean canHold(int itemid) {
        return getInventory(ItemConstants.getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    public long getMerchantMeso() {
        long mesos = 0;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * from hiredmerch where characterid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                mesos = rs.getLong("Mesos");
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            log.error("????????????????????????????????????", se);
        }
        return mesos;
    }

    public void autoban(String reason, int greason) {
        /*
         * ??????calendar.get(Calendar.YEAR) ??????calendar.get(Calendar.MONTH)+1
         * ??????calendar.get(Calendar.DAY_OF_MONTH)
         * ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
         */
        Calendar cal = Calendar.getInstance();
        cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DAY_OF_MONTH) + 3, cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE));
        Timestamp TS = new Timestamp(cal.getTimeInMillis());
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET banreason = ?, tempban = ?, greason = ? WHERE id = ?");
            ps.setString(1, reason);
            ps.setTimestamp(2, TS);
            ps.setInt(3, greason);
            ps.setInt(4, accountid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error while autoban" + e);
        }
    }

    public boolean isBanned() {
        return isbanned;
    }

    public void sendPolice(int greason, String reason, int duration) {
        //announce(LoginPacket.sendPolice(greason, reason, duration));
        this.isbanned = true;
        WorldTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                client.disconnect(true, false);
            }
        }, duration);
    }

    public void sendPolice(String text) {
        client.getSession().write(MaplePacketCreator.sendPolice(text));
        this.isbanned = true;
        WorldTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                client.disconnect(true, false);
                if (client.getSession().isConnected()) {
                    client.getSession().close(true);
                }
            }
        }, 6000);
    }

    /*
     * ???????????????????????????
     */
    public Timestamp getChrCreated() {
        if (createDate != null) {
            return createDate;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT createdate FROM characters WHERE id = ?");
            ps.setInt(1, this.getId());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            createDate = rs.getTimestamp("createdate");
            rs.close();
            ps.close();
            return createDate;
        } catch (SQLException e) {
            throw new DatabaseException("??????????????????????????????", e);
        }
    }

    /*
     * ?????????GM???????????????????????????
     */
    public boolean isInJailMap() {
        return getMapId() == GameConstants.JAIL && getGMLevel() == 0;
    }

    /*
     * ??????????????????
     */
    public int getWarning() {
        return warning;
    }

    public void setWarning(int warning) {
        this.warning = warning;
    }

    public void gainWarning(boolean warningEnabled) {
        this.warning += 1;
        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] ??????????????????: " + getName() + " (?????? " + getLevel() + ") ?????????????????????: " + warning + " ??????"));
        if (warningEnabled == true) {
            if (warning == 1) { //????????????1
                dropMessage(5, "???????????????????????????????????????????????????????????????????????????");
            } else if (warning == 2) { //????????????2
                dropMessage(5, "?????????????????? " + warning + " ?????????????????????????????????????????????????????????");
            } else if (warning >= 3) { //????????????3
                ban(getName() + " ????????????????????????: " + warning + " ?????????????????????????????????", false, true, false);
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0, " ?????? " + getName() + " (?????? " + getLevel() + ") ??????????????????????????????????????????????????????"));
            }
        }
    }

    /*
     * ????????????
     */
    public int getBeans() {
        return beans;
    }

    public void gainBeans(int i, boolean show) {
        this.beans += i;
        if (show && i != 0) {
            dropMessage(-1, "???" + (i > 0 ? "????????? " : "????????? ") + Math.abs(i) + " ?????????.");
        }
    }

    public void setBeans(int i) {
        this.beans = i;
    }

    /*
     * ????????????
     */
    public int teachSkill(int toSkillId, int toChrId, int skillId) {
        SkillEntry ret = getSkillEntry(skillId);
        if (ret == null) {
            return -1;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM skills WHERE skillid = ? AND teachId = ?");
            ps.setInt(1, toSkillId);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM skills WHERE skillid = ? AND characterid = ?");
            ps.setInt(1, toSkillId);
            ps.setInt(2, toChrId);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                PreparedStatement psskills = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel, expiration, teachId) VALUES (?, ?, ?, ?, ?, ?)");
                psskills.setInt(1, toChrId);
                psskills.setInt(2, toSkillId);
                psskills.setInt(3, ret.skillevel);
                psskills.setByte(4, ret.masterlevel);
                psskills.setLong(5, ret.expiration);
                psskills.setInt(6, id);
                psskills.executeUpdate();
                psskills.close();
                return 1;
            }
            rs.close();
            ps.close();
            return -1;
        } catch (Exception Ex) {
            log.error("??????????????????.", Ex);
            return -1;
        }
    }

    /*
     * ????????????????????????
     */
    public void startLieDetector(boolean isItem) {
        if (!getAntiMacro().inProgress()) {
            getAntiMacro().startLieDetector(getName(), isItem, false);
        }
    }

    /*
     * ????????????
     */
    public int getDollars() {
        return dollars;
    }

    public int getShareLots() {
        return shareLots;
    }

    public void addDollars(int n) {
        this.dollars += n;
    }

    public void addShareLots(int n) {
        this.shareLots += n;
    }

    /*
     * ????????????
     */
    public int getReborns() {
        return reborns;
    }

    public int getReborns1() {
        return reborns1;
    }

    public int getReborns2() {
        return reborns2;
    }

    public int getReborns3() {
        return reborns3;
    }

    public void gainReborns(int type) {
        if (type == 0) {
            this.reborns += 1;
        } else if (type == 1) {
            this.reborns1 += 1;
        } else if (type == 2) {
            this.reborns2 += 1;
        } else if (type == 3) {
            this.reborns3 += 1;
        }
    }

    public int getAPS() {
        return apstorage;
    }

    public void gainAPS(int aps) {
        this.apstorage += aps;
    }

    public void doReborn(int type) {
        List<Pair<MapleStat, Long>> stat = new ArrayList<>(12);
        clearSkills(); //????????????

        gainReborns(type); //???????????????

        setLevel((short) 1); //???????????????1???
        setExp(0); //???????????????0
        setJob(0); //??????????????? 0 ??????
        setRemainingAp((short) 0); //??????AP???0
        int str = 12;
        int dex = 5;
        int int_ = 4;
        int luk = 4;
        int total = getReborns() * 5 + getReborns1() * 10 + getReborns2() * 15 + getReborns3() * 30;
        stats.str = (short) str;
        stats.dex = (short) dex;
        stats.int_ = (short) int_;
        stats.luk = (short) luk;

        stats.setInfo(50, 50, 50, 50);
        setRemainingAp((short) total);
        stats.recalcLocalStats(this);

        stat.add(new Pair<>(MapleStat.??????, (long) str));
        stat.add(new Pair<>(MapleStat.??????, (long) dex));
        stat.add(new Pair<>(MapleStat.??????, (long) int_));
        stat.add(new Pair<>(MapleStat.??????, (long) luk));
        stat.add(new Pair<>(MapleStat.AVAILABLEAP, (long) total));
        stat.add(new Pair<>(MapleStat.MAXHP, (long) 50));
        stat.add(new Pair<>(MapleStat.MAXMP, (long) 50));
        stat.add(new Pair<>(MapleStat.HP, (long) 50));
        stat.add(new Pair<>(MapleStat.MP, (long) 50));
        stat.add(new Pair<>(MapleStat.??????, (long) 1));
        stat.add(new Pair<>(MapleStat.??????, (long) 0));
        stat.add(new Pair<>(MapleStat.??????, (long) 0));

        client.getSession().write(MaplePacketCreator.updatePlayerStats(stat, false, this));
    }

    public void doReborn(int type, int ap) {
        List<Pair<MapleStat, Long>> stat = new ArrayList<>(12);
        clearSkills(); //????????????

        gainReborns(type); //???????????????

        setLevel((short) 1); //???????????????1???
        setExp(0); //???????????????0
        setJob(0); //??????????????? 0 ??????
        setRemainingAp((short) 0); //??????AP???0
        int str = 12;
        int dex = 5;
        int int_ = 4;
        int luk = 4;
        stats.str = (short) str;
        stats.dex = (short) dex;
        stats.int_ = (short) int_;
        stats.luk = (short) luk;

        stats.setInfo(50, 50, 50, 50);
        setRemainingAp((short) ap);
        stats.recalcLocalStats(this);

        stat.add(new Pair<>(MapleStat.??????, (long) str));
        stat.add(new Pair<>(MapleStat.??????, (long) dex));
        stat.add(new Pair<>(MapleStat.??????, (long) int_));
        stat.add(new Pair<>(MapleStat.??????, (long) luk));
        stat.add(new Pair<>(MapleStat.AVAILABLEAP, (long) ap));
        stat.add(new Pair<>(MapleStat.MAXHP, (long) 50));
        stat.add(new Pair<>(MapleStat.MAXMP, (long) 50));
        stat.add(new Pair<>(MapleStat.HP, (long) 50));
        stat.add(new Pair<>(MapleStat.MP, (long) 50));
        stat.add(new Pair<>(MapleStat.??????, (long) 1));
        stat.add(new Pair<>(MapleStat.??????, (long) 0));
        stat.add(new Pair<>(MapleStat.??????, (long) 0));

        client.getSession().write(MaplePacketCreator.updatePlayerStats(stat, false, this));
    }

    public void clearSkills() {
        Map<Skill, SkillEntry> chrSkill = new HashMap<>(getSkills());
        Map<Skill, SkillEntry> newList = new HashMap<>();
        for (Entry<Skill, SkillEntry> skill : chrSkill.entrySet()) {
            newList.put(skill.getKey(), new SkillEntry((byte) 0, (byte) 0, -1));
        }
        changeSkillsLevel(newList);
        newList.clear();
        chrSkill.clear();
    }

    /*
     * ??????????????????
     */
    public Map<Integer, Byte> getSkillsWithPos() {
        Map<Skill, SkillEntry> chrskills = new HashMap<>(getSkills());
        Map<Integer, Byte> skillsWithPos = new LinkedHashMap<>();
        for (Entry<Skill, SkillEntry> skill : chrskills.entrySet()) {
            if (skill.getValue().position >= 0 && skill.getValue().position < 13) {
                skillsWithPos.put(skill.getKey().getId(), skill.getValue().position);
            }
        }
        return skillsWithPos;
    }

    public int ??????????????????(int position) {
        int skillId = 0;
        Map<Integer, Byte> skillsWithPos = getSkillsWithPos();
        for (Entry<Integer, Byte> x : skillsWithPos.entrySet()) {
            if (x.getValue() == position) {
                skillId = x.getKey();
                break;
            }
        }
        return skillId;
    }

    /*
     * ??????????????????????????????ID
     */
    public int ????????????????????????(Skill skill) {
        if (skill == null) {
            return 0;
        }
        SkillEntry ret = skills.get(skill);
        if (ret == null || ret.teachId == 0) {
            return 0;
        }
        return skills.get(SkillFactory.getSkill(ret.teachId)) != null ? ret.teachId : 0;
    }

    /*
     * ???????????????????????????????????????
     */
    public void ????????????????????????(int skillId, int teachId) {
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill == null) {
            return;
        }
        SkillEntry ret = skills.get(skill);
        if (ret != null) {
            Skill theskill = SkillFactory.getSkill(ret.teachId);
            if (theskill != null && theskill.isBuffSkill()) {
                cancelEffect(theskill.getEffect(1), false, -1);
            }
            ret.teachId = teachId;
            changed_skills = true;
            client.getSession().write(MaplePacketCreator.????????????????????????(skillId, teachId));
        }
    }

    public void ??????????????????(int skillId) {
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill == null) {
            return;
        }
        SkillEntry ret = skills.get(skill);
        if (ret != null) {
            skills.remove(skill);
            client.getSession().write(MaplePacketCreator.??????????????????(ret.position));
            changed_skills = true;
        }
    }

    public void ??????????????????(int skillBook, int skillId, int level) {
        int skillLevel = 0;
        if (skillBook == 1) {
            skillLevel = getSkillLevel(??????.?????????????????????);
        } else if (skillBook == 2) {
            skillLevel = getSkillLevel(??????.?????????????????????);
        } else if (skillBook == 3) {
            skillLevel = getSkillLevel(??????.?????????????????????);
        } else if (skillBook == 4) {
            skillLevel = getSkillLevel(??????.?????????????????????);
        }
        Skill theskill = SkillFactory.getSkill(skillId); //???????????????????????????
        if (level > skillLevel) { //???????????????????????????????????????????????????????????????
            skillLevel = level; //???????????????????????????????????????????????????
        }
        if (skillLevel > theskill.getMaxLevel()) { //??????????????????????????????????????????????????????
            skillLevel = theskill.getMaxLevel();
        }
        SkillEntry ret = skills.get(theskill);
        if (ret != null) { //?????????????????????????????????????????????
            ret.skillevel = skillLevel; //?????????????????????????????????
            changed_skills = true;
            client.getSession().write(MaplePacketCreator.??????????????????(ret.position, skillId, skillLevel));
        } else if (skillBook == 1) {
            for (int i = 0; i < 4; i++) {
                if (??????????????????(i) == 0) {
                    skills.put(theskill, new SkillEntry(skillLevel, (byte) theskill.getMasterLevel(), -1, 0, (byte) i));
                    changed_skills = true;
                    client.getSession().write(MaplePacketCreator.??????????????????(i, skillId, skillLevel));
                    break;
                }
            }
        } else if (skillBook == 2) {
            for (int i = 4; i < 8; i++) {
                if (??????????????????(i) == 0) {
                    skills.put(theskill, new SkillEntry(skillLevel, (byte) theskill.getMasterLevel(), -1, 0, (byte) i));
                    changed_skills = true;
                    client.getSession().write(MaplePacketCreator.??????????????????(i, skillId, skillLevel));
                    break;
                }
            }
        } else if (skillBook == 3) {
            for (int i = 8; i < 11; i++) {
                if (??????????????????(i) == 0) {
                    skills.put(theskill, new SkillEntry(skillLevel, (byte) theskill.getMasterLevel(), -1, 0, (byte) i));
                    changed_skills = true;
                    client.getSession().write(MaplePacketCreator.??????????????????(i, skillId, skillLevel));
                    break;
                }
            }
        } else if (skillBook == 4) {
            for (int i = 11; i < 13; i++) {
                if (??????????????????(i) == 0) {
                    skills.put(theskill, new SkillEntry(skillLevel, (byte) theskill.getMasterLevel(), -1, 0, (byte) i));
                    changed_skills = true;
                    client.getSession().write(MaplePacketCreator.??????????????????(i, skillId, skillLevel));
                    break;
                }
            }
        }
    }

    /*
     * ???????????????
     */
    public MapleCharacterCards getCharacterCard() {
        return characterCard;
    }

    /*
     * ????????????
     */
    public InnerSkillEntry[] getInnerSkills() {
        return innerSkills;
    }

    public int getInnerSkillSize() {
        int ret = 0;
        for (int i = 0; i < 3; i++) {
            if (innerSkills[i] != null) {
                ret++;
            }
        }
        return ret;
    }

    public int getInnerSkillIdByPos(int position) {
        if (innerSkills[position] != null) {
            return innerSkills[position].getSkillId();
        }
        return 0;
    }

    public int getHonorLevel() {
        return honorLevel;
    }

    public int getHonorExp() {
        return honorExp;
    }

    public void setHonorLevel(int level) {
        this.honorLevel = level;
    }

    public void setHonorExp(int exp) {
        this.honorExp = exp;
    }

    public int getHonourNextExp() {
        if (getHonorLevel() < 1) {
            setHonorLevel(1);
        }
        return getHonorLevel() * 500;
    }

    public void gainHonorExp(int amount) {
        if (amount > 0) {
            dropMessage(-9, "????????? " + amount + " ????????????");
        }
        honorExp += amount;
        client.getSession().write(MaplePacketCreator.updateInnerStats(this));
        client.getSession().write(MaplePacketCreator.updateSpecialStat("honorLeveling", 0, getHonorLevel(), true, getHonourNextExp()));
    }

    /*
     * ?????????????????????????????????
     * ????????????????????????
     */
    public void checkInnerSkill() {
        if (level >= 30 && innerSkills[0] == null) {
            changeInnerSkill(new InnerSkillEntry(70000000, 1, (byte) 1, (byte) 0));
        }
        if (level >= 50 && innerSkills[1] == null) {
            changeInnerSkill(new InnerSkillEntry(70000001, 3, (byte) 2, (byte) 0));
        }
        if (level >= 70 && innerSkills[2] == null) {
            changeInnerSkill(new InnerSkillEntry(70000002, 5, (byte) 3, (byte) 0));
        }
    }

    /*
     * ??????????????????
     */
    public void changeInnerSkill(InnerSkillEntry data) {
        changeInnerSkill(data.getSkillId(), data.getSkillLevel(), data.getPosition(), data.getRank());
    }

    public void changeInnerSkill(int skillId, int skillevel, byte position, byte rank) {
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill == null || !skill.isInnerSkill() || skillevel <= 0 || position > 3 || position < 1) {
            return;
        }
        if (skillevel > skill.getMaxLevel()) {
            skillevel = skill.getMaxLevel();
        }
        InnerSkillEntry InnerSkill = new InnerSkillEntry(skillId, skillevel, position, rank);
        innerSkills[position - 1] = InnerSkill; //???????????????????????? ???????????? 0 ???????????? ????????????1
        client.getSession().write(MaplePacketCreator.updateInnerSkill(skillId, skillevel, position, rank));
        changed_innerSkills = true;
    }

    public void checkHyperAP() {
        if (level >= 140) {
            Skill skil;
            Map<Skill, SkillEntry> list = new HashMap<>();
            for (int i = 80000400; i <= 80000417; i++) {
                skil = SkillFactory.getSkill(i);
                if (skil != null && getSkillLevel(skil) <= 0) {
                    list.put(skil, new SkillEntry((byte) 0, (byte) skil.getMaxLevel(), -1));
                }
            }
            if (!list.isEmpty()) {
                changeSkillsLevel(list);
            }
        }
    }

    /*
     * ????????????????????????
     */
    public void handleKillSpreeGain() {
        Skill skill = SkillFactory.getSkill(??????.????????????);
        int skillLevel = getSkillLevel(skill);
        int killSpree = getBuffedIntValue(MapleBuffStat.????????????);
        if (skillLevel <= 0 || killSpree >= 5) {
            return;
        }
        if (Randomizer.nextInt(100) <= 20) {
            skill.getEffect(skillLevel).applyTo(this, true);
        }
    }

    /*
     * ???????????????????????????BUFF??????
     */
    public void handle????????????(int skillId) {
        //???????????????????????????????????????
        if (skillId == ?????????.?????? || skillId == ?????????.?????? || skillId == ?????????.??????) {
            return;
        }
        Skill skill = SkillFactory.getSkill(?????????.??????_??????);
        int skillLevel = getSkillLevel(skill);
        if (skillLevel <= 0 || getBuffedValue(MapleBuffStat.????????????) == null) {
            return;
        }
        if (Randomizer.nextInt(100) <= getStat().raidenPorp) {
            skill.getEffect(skillLevel).applyTo(this, true);
        }
    }

    /*
     * ???????????????????????????
     */
    public void handle????????????(int skillId) {
        //?????????????????????????????????????????????
        Skill skill_2 = SkillFactory.getSkill(?????????.????????????);
        Skill skill_4 = SkillFactory.getSkill(?????????.???????????????);
        MapleStatEffect effect;
        if (getSkillLevel(skill_4) > 0) {
            effect = skill_4.getEffect(getTotalSkillLevel(skill_4));
        } else if (getSkillLevel(skill_2) > 0) {
            effect = skill_2.getEffect(getTotalSkillLevel(skill_2));
        } else {
            return;
        }
        //???????????????????????????????????????
        Element newElement = null;
        switch (skillId) {
            case ?????????.????????????:
                newElement = Element.???;
                break;
            case ?????????.????????????:
                newElement = Element.???;
                break;
            case ?????????.????????????:
                newElement = Element.???;
                break;
            case ?????????.????????????:
                newElement = Element.??????;
                break;
        }
        if (newElement == null) { //???????????????????????????????????????
            return;
        }
        if (elements == null) { //?????????1??????????????????????????????
            elements = newElement;
            return;
        }
        boolean change = elements != newElement; //??????????????????????????????
        if (change) {
            elements = newElement;
            MapleBuffStat buffStat = MapleBuffStat.????????????;
            int buffSourceId = getBuffSource(buffStat);
            if (getBuffedValue(buffStat) == null || buffSourceId != effect.getSourceId()) {
                effect.applyTo(this, true); //?????????1??????BUFF??????
                return;
            }
            int count = Math.min(getBuffedIntValue(buffStat) / 5, 5);
            if (count < 5) {
                count++;
            }
            if (isShowPacket()) {
                dropSpouseMessage(0x0A, "?????????????????????: " + count);
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(buffStat, count * 5));
            setBuffedValue(buffStat, count * 5);
            int duration = effect.getDuration();
            client.getSession().write(BuffPacket.giveBuff(effect.getSourceId(), duration, stat, effect, this));
        }
    }

    /*
     * ???????????????BUFF
     */
    public void handle????????????() {
        Skill skill = SkillFactory.getSkill(isZeroSecondLook() ? ?????????.????????????_?????? : ?????????.????????????_??????);
        int skillLevel = 1;
        skill.getEffect(skillLevel).applyTo(this, true);
    }

    /*
     * ???????????????????????????
     */
    public String getMedalText() {
        String medal = "";
        Item medalItem = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -26);
        if (medalItem != null) {
            medal = "<" + MapleItemInformationProvider.getInstance().getName(medalItem.getItemId()) + "> ";
        }
        return medal;
    }

    /*
     * ????????????????????????????????????
     */
    public int getGamePoints() {
        try {
            int gamePoints = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, getClient().getAccID());
            ps.setInt(2, getWorld());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                gamePoints = rs.getInt("gamePoints");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                Calendar sqlcal = Calendar.getInstance();
                if (updateTime != null) {
                    sqlcal.setTimeInMillis(updateTime.getTime());
                }
                if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 <= Calendar.getInstance().get(Calendar.DAY_OF_MONTH) || sqlcal.get(Calendar.MONTH) + 1 <= Calendar.getInstance().get(Calendar.MONTH) || sqlcal.get(Calendar.YEAR) + 1 <= Calendar.getInstance().get(Calendar.YEAR)) {
                    gamePoints = 0;
                    PreparedStatement psu = con.prepareStatement("UPDATE accounts_info SET gamePoints = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?");
                    psu.setInt(1, getClient().getAccID());
                    psu.setInt(2, getWorld());
                    psu.executeUpdate();
                    psu.close();
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, gamePoints) VALUES (?, ?, ?)");
                psu.setInt(1, getClient().getAccID());
                psu.setInt(2, getWorld());
                psu.setInt(3, 0);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return gamePoints;
        } catch (Exception Ex) {
            log.error("???????????????????????????????????????????????? - ?????????????????????", Ex);
            return -1;
        }
    }

    public void gainGamePoints(int amount) {
        int gamePoints = getGamePoints() + amount;
        updateGamePoints(gamePoints);
    }

    public void resetGamePoints() {
        updateGamePoints(0);
    }

    public void updateGamePoints(int amount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET gamePoints = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND worldId = ?")) {
                ps.setInt(1, amount);
                ps.setInt(2, getClient().getAccID());
                ps.setInt(3, getWorld());
                ps.executeUpdate();
            }
        } catch (Exception Ex) {
            log.error("????????????????????????????????????????????? - ?????????????????????.", Ex);
        }
    }

    /*
     * ????????????
     */
    public int getMaxLevelForSever() {
        if ((JobConstants.is?????????(job) || JobConstants.is?????????(job)) && !isIntern()) {
            return ServerProperties.getMaxCygnusLevel();
        }
        return ServerProperties.getMaxLevel();
    }

    public int getMaxHpForSever() {
        return ServerProperties.getMaxHp();
    }

    public int getMaxMpForSever() {
        return ServerProperties.getMaxMp();
    }

    /**
     * ???????????????????????????????????????
     *
     * @param skillId
     * @return
     */
    public long getMaxDamageOver(int skillId) {
        long maxDamage = 10000000000L; //?????????????????????
        long skillMaxDamage; //???????????????????????????
        int limitBreak = getStat().getLimitBreak(this); //?????????????????????????????????
        int incMaxDamage = getStat().incMaxDamage; //???????????????????????????
        Skill skill;
        if (skillId <= 0 || (skill = SkillFactory.getSkill(skillId)) == null) {
            return (limitBreak > maxDamage ? limitBreak : maxDamage) + incMaxDamage;
        }
        if (skillId == ??????.????????????) {
            return maxDamage;
        }
        skillMaxDamage = skill.getMaxDamageOver();
        if (skillId == ??????.?????? && getTotalSkillLevel(??????.??????_???????????????) > 0) {
            skillMaxDamage = 60000000;
        } else if (skillId == ??????.????????????) {
            skillMaxDamage = maxDamage;
        }
        return (limitBreak > skillMaxDamage ? limitBreak : skillMaxDamage) + incMaxDamage;
    }

    /*
     * ???????????????????????????
     */
    public void addTraitExp(int exp) {
        traits.get(MapleTraitType.craft).addExp(exp, this);
    }

    public void setTraitExp(int exp) {
        traits.get(MapleTraitType.craft).addExp(exp, this);
    }

    /*
     * ???????????????
     */
    public int getLove() {
        return love;
    }

    public void setLove(int love) {
        this.love = love;
    }

    public void addLove(int loveChange) {
        this.love += loveChange;
        MessengerRankingWorker.getInstance().updateRankFromPlayer(this);
    }

    public long getLastLoveTime() {
        return lastlovetime;
    }

    public Map<Integer, Long> getLoveCharacters() {
        return lastdayloveids;
    }

    /*
     * 0 = ??????
     * 1 = ????????????
     * 2 = ??????????????????
     */
    public int canGiveLove(MapleCharacter from) {
        if (from == null || lastdayloveids == null) { //??????????????????????????? ???????????????????????????
            return 1;

        } else if (lastdayloveids.containsKey(from.getId())) { //??????????????????????????????????????????????????????
            long lastTime = lastdayloveids.get(from.getId()); //????????????????????????????????????????????????
            if (lastTime >= System.currentTimeMillis() - 60 * 60 * 24 * 1000) {
                return 2;
            } else {
                return 0;
            }
        }
        return 0;
    }

    public void hasGiveLove(MapleCharacter to) {
        lastlovetime = System.currentTimeMillis();
        if (lastdayloveids.containsKey(to.getId())) {
            lastdayloveids.remove(to.getId());
        }
        lastdayloveids.put(to.getId(), System.currentTimeMillis());
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO lovelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, getId());
            ps.setInt(2, to.getId());
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            System.err.println("ERROR writing lovelog for char " + getName() + " to " + to.getName() + e);
        }
    }

    /*
     * ???????????????????????????
     */
    public long getExpNeededForLevel() {
        return GameConstants.getExpNeededForLevel(level);
    }

    /*
     * ??????????????????
     */
    public int getPlayerStats() {
        return getHpApUsed() + stats.getStr() + stats.getDex() + stats.getLuk() + stats.getInt() + getRemainingAp();
    }

    public int getMaxStats(boolean hpap) {
        //????????? 29 ???
        int total = 29;
        //??????????????????
        if (!JobConstants.is????????????(job)) { //???????????????
            int jobSp = 0;
            if (JobConstants.isSeparatedSpJob(job)) { //???????????????
                jobSp = JobConstants.getSkillBookByJob(job) * (JobConstants.is??????(job) ? 3 : 5);
            } else {
                jobSp += hpap ? 15 : 0; //?????????????????????SP
            }
            total += jobSp;
        }
        //??????????????????
        if (JobConstants.is?????????(job) || JobConstants.is?????????(job)) {
            if (level <= 70) {
                total += getLevel() * 6;
            } else {
                total += 70 * 6;
                total += (level - 70) * 5;
            }
        } else {
            total += level * 5; //?????????????????????
        }
        //?????????????????????hp????????? ???????????????????????? ?????????????????????
        if (hpap) {
            total += getHpApUsed();
        } else {
            total -= getHpApUsed();
        }
        return total;
    }

    public boolean checkMaxStat() {
        if (getGMLevel() > 0 || getLevel() < 10) {
            return false;
        }
        return getPlayerStats() > getMaxStats(true) + 15; //????????????SP???????????????15???
    }

    public void resetStats(int str, int dex, int int_, int luk) {
        resetStats(str, dex, int_, luk, false);
    }

    public void resetStats(int str, int dex, int int_, int luk, boolean resetAll) {
        List<Pair<MapleStat, Long>> stat = new ArrayList<>(5);
        int total = stats.getStr() + stats.getDex() + stats.getLuk() + stats.getInt() + getRemainingAp(); //?????????????????????????????? ????????????????????????hp?????????
        if (resetAll) {
            total = getMaxStats(false); //??????????????????????????????hp???????????????
        }
        total -= str;
        stats.str = (short) str;
        total -= dex;
        stats.dex = (short) dex;
        total -= int_;
        stats.int_ = (short) int_;
        total -= luk;
        stats.luk = (short) luk;

        setRemainingAp((short) total);
        stats.recalcLocalStats(this);

        stat.add(new Pair<>(MapleStat.??????, (long) str));
        stat.add(new Pair<>(MapleStat.??????, (long) dex));
        stat.add(new Pair<>(MapleStat.??????, (long) int_));
        stat.add(new Pair<>(MapleStat.??????, (long) luk));
        stat.add(new Pair<>(MapleStat.AVAILABLEAP, (long) total));

        client.getSession().write(MaplePacketCreator.updatePlayerStats(stat, false, this));
    }

    /*
     * ???????????????SP???????????????
     */
    public void SpReset() {
        int skillLevel;
        Map<Skill, SkillEntry> oldList = new HashMap<>(getSkills());
        Map<Skill, SkillEntry> newList = new HashMap<>();
        for (Entry<Skill, SkillEntry> toRemove : oldList.entrySet()) {
            if (!toRemove.getKey().isBeginnerSkill() && !toRemove.getKey().isSpecialSkill() && !toRemove.getKey().isHyperSkill()) {
                skillLevel = getSkillLevel(toRemove.getKey());
                if (skillLevel > 0) {
                    if (toRemove.getKey().canBeLearnedBy(getJob())) {
                        newList.put(toRemove.getKey(), new SkillEntry((byte) 0, toRemove.getValue().masterlevel, toRemove.getValue().expiration));
                    } else {
                        newList.put(toRemove.getKey(), new SkillEntry((byte) 0, (byte) 0, -1));
                    }
                }
            }
        }
        if (!newList.isEmpty()) {
            changeSkillsLevel(newList);
        }
        oldList.clear();
        newList.clear();
        int[] spToGive;
        if (JobConstants.is??????(getJob())) {
            spToGive = new int[10];
            if (getLevel() > 160) {
                spToGive[9] = (getLevel() - 160) * 3 + 4;
                spToGive[8] = 40 * 3 + 4;
                spToGive[7] = 20 * 3 + 4;
                spToGive[6] = 20 * 3 + 4;
                spToGive[5] = 20 * 3 + 4;
                spToGive[4] = 10 * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 120 && getLevel() <= 160) {
                spToGive[8] = (getLevel() - 120) * 3 + 4;
                spToGive[7] = 20 * 3 + 4;
                spToGive[6] = 20 * 3 + 4;
                spToGive[5] = 20 * 3 + 4;
                spToGive[4] = 10 * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 100 && getLevel() <= 120) {
                spToGive[7] = (getLevel() - 100) * 3 + 4;
                spToGive[6] = 20 * 3 + 4;
                spToGive[5] = 20 * 3 + 4;
                spToGive[4] = 10 * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 80 && getLevel() <= 100) {
                spToGive[6] = (getLevel() - 80) * 3 + 4;
                spToGive[5] = 20 * 3 + 4;
                spToGive[4] = 10 * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 60 && getLevel() <= 80) {
                spToGive[5] = (getLevel() - 60) * 3 + 4;
                spToGive[4] = 10 * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 50 && getLevel() <= 60) {
                spToGive[4] = (getLevel() - 50) * 3 + 4;
                spToGive[3] = 10 * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 40 && getLevel() <= 50) {
                spToGive[3] = (getLevel() - 40) * 3 + 4;
                spToGive[2] = 10 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 30 && getLevel() <= 40) {
                spToGive[2] = (getLevel() - 30) * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 20 && getLevel() <= 30) {
                spToGive[1] = (getLevel() - 20) * 3 + 4;
                spToGive[0] = 10 * 3 + 4;
            } else if (getLevel() > 10 && getLevel() <= 20) {
                spToGive[0] = (getLevel() - 10) * 3 + 4;
            }
        } else if (JobConstants.is????????????(getJob())) {
            spToGive = new int[6];
            if (getLevel() > 100) {
                spToGive[5] = (getLevel() - 100) * 3 + 4;
                spToGive[4] = 32 * 3 + 4;
                spToGive[3] = 17 * 3 + 4;
                spToGive[2] = 20 * 3 + 5;
                spToGive[1] = 10 * 3 + 5;
                spToGive[0] = 10 * 3 + 5;
            } else if (getLevel() > 70 && getLevel() <= 100) {
                spToGive[4] = (getLevel() - 70) * 3 + 4;
                spToGive[3] = 15 * 3 + 4;
                spToGive[2] = 15 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 5;
            } else if (getLevel() > 55 && getLevel() <= 70) {
                spToGive[3] = (getLevel() - 55) * 3 + 4;
                spToGive[2] = 15 * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 5;
            } else if (getLevel() > 30 && getLevel() <= 55) {
                spToGive[2] = (getLevel() - 30) * 3 + 4;
                spToGive[1] = 10 * 3 + 4;
                spToGive[0] = 10 * 3 + 5;
            } else if (getLevel() > 20 && getLevel() <= 30) {
                spToGive[1] = (getLevel() - 20) * 3 + 4;
                spToGive[0] = 10 * 3 + 5;
            } else if (getLevel() > 10 && getLevel() <= 20) {
                spToGive[0] = (getLevel() - 10) * 3 + 5;
            }
        } else if (JobConstants.is?????????(getJob())) {
            spToGive = new int[2];
            if (getLevel() >= 100) {
                spToGive[0] = (getLevel() - 100) * 3 + 8;
                spToGive[1] = (getLevel() - 100) * 3 + 8;
            }
        } else if (JobConstants.isSeparatedSpJob(getJob())) {
            spToGive = new int[4];
            boolean isMagicJob = getJob() >= 200 && getJob() <= 232; //???????????????8?????????
            if (getLevel() > 100) {
                spToGive[3] = (getLevel() - 100) * 3 + 4;
                spToGive[2] = 40 * 3 + 4;
                spToGive[1] = 30 * 3 + 5;
                spToGive[0] = 20 * 3 + 5 + (isMagicJob ? 6 : 0);
            } else if (getLevel() > 60 && getLevel() <= 100) {
                spToGive[2] = (getLevel() - 60) * 3 + 4;
                spToGive[1] = 30 * 3 + 5;
                spToGive[0] = 20 * 3 + 5 + (isMagicJob ? 6 : 0);
            } else if (getLevel() > 30 && getLevel() <= 60) {
                spToGive[1] = (getLevel() - 30) * 3 + 5;
                spToGive[0] = 20 * 3 + 5 + (isMagicJob ? 6 : 0);
            } else if (getLevel() > 10 && getLevel() <= 30) {
                spToGive[0] = (getLevel() - 10) * 3 + 5 + (isMagicJob ? 6 : 0);
            }
        } else {
            spToGive = new int[1];
            spToGive[0] += (getJob() % 100 != 0 && getJob() % 100 != 1) ? ((getJob() % 10) + 3) : 0;
            if (getJob() % 10 >= 2) {
                spToGive[0] += 3;
            }
            spToGive[0] += (getLevel() - 10) * 3;
        }
        for (int i = 0; i < spToGive.length; i++) {
            setRemainingSp(spToGive[i], i);
        }
        updateSingleStat(MapleStat.AVAILABLESP, 0);
        client.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * ????????????
     */
    public int getPlayerPoints() {
        return playerPoints;
    }

    public void setPlayerPoints(int gain) {
        playerPoints = gain;
    }

    public void gainPlayerPoints(int gain) {
        if (playerPoints + gain < 0) {
            return;
        }
        playerPoints += gain;
    }

    public int getPlayerEnergy() {
        return playerEnergy;
    }

    public void setPlayerEnergy(int gain) {
        playerEnergy = gain;
    }

    public void gainPlayerEnergy(int gain) {
        if (playerEnergy + gain < 0) {
            return;
        }
        playerEnergy += gain;
    }

    /*
     * Pvp??????
     */
    public MaplePvpStats getPvpStats() {
        return pvpStats;
    }

    public int getPvpKills() {
        return pvpKills;
    }

    public void gainPvpKill() {
        this.pvpKills += 1;
        this.pvpVictory += 1;
        if (pvpVictory == 5) {
            map.broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[Pvp] ?????? " + getName() + " ???????????? 5 ?????????"));
        } else if (pvpVictory == 10) {
            client.getChannelServer().broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[Pvp] ?????? " + getName() + " ???????????? 10 ?????????"));
        } else if (pvpVictory >= 20) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[Pvp] ?????? " + getName() + " ???????????? " + pvpVictory + " ????????????(???)????????? " + client.getChannel() + " ?????? " + map.getMapName() + " ???????????????????????????."));
        } else {
            dropMessage(6, "??????: " + pvpVictory + " ??????.");
        }
    }

    public int getPvpDeaths() {
        return pvpDeaths;
    }

    public void gainPvpDeath() {
        this.pvpDeaths += 1;
        this.pvpVictory = 0;
    }

    public int getPvpVictory() {
        return pvpVictory;
    }

    /*
     * ????????????
     */
    public void dropTopMsg(String message) {
        client.getSession().write(UIPacket.getTopMsg(message));
    }

    public void dropMidMsg(String message) {
        client.getSession().write(UIPacket.clearMidMsg());
        client.getSession().write(UIPacket.getMidMsg(message, true, 0));
    }

    public void clearMidMsg() {
        client.getSession().write(UIPacket.clearMidMsg());
    }

    /*
     * ?????????????????????
     */
    public void dropSpecialTopMsg(String message, int fontsize, int color) {
        dropSpecialTopMsg(message, 0x00, fontsize, color);
    }

    public void dropSpecialTopMsg(String message, int unk, int fontsize, int color) {
        if (fontsize < 10) {
            fontsize = 10;
        }
        client.getSession().write(UIPacket.getSpecialTopMsg(message, unk, fontsize, color));
    }

    public static void removePartTime(int cid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM parttime where cid = ?")) {
                ps.setInt(1, cid);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            System.out.println("????????????????????????: " + ex);
        }
    }

    public static void addPartTime(MaplePartTimeJob partTime) {
        if (partTime.getCharacterId() < 1) {
            return;
        }
        addPartTime(partTime.getCharacterId(), partTime.getJob(), partTime.getTime(), partTime.getReward());
    }

    public static void addPartTime(int cid, byte job, long time, int reward) {
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO parttime (cid, job, time, reward) VALUES (?, ?, ?, ?)")) {
                ps.setInt(1, cid);
                ps.setByte(2, job);
                ps.setLong(3, time);
                ps.setInt(4, reward);
                ps.execute();
            }
        } catch (SQLException ex) {
            System.out.println("????????????????????????: " + ex);
        }
    }

    public static MaplePartTimeJob getPartTime(int cid) {
        MaplePartTimeJob partTime = new MaplePartTimeJob(cid);
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM parttime WHERE cid = ?")) {
                ps.setInt(1, cid);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        partTime.setJob(rs.getByte("job"));
                        partTime.setTime(rs.getLong("time"));
                        partTime.setReward(rs.getInt("reward"));
                    }
                }
            }
        } catch (Exception ex) {
            System.out.println("????????????????????????: " + ex);
        }
        return partTime;
    }

    /*
     * ????????????
     * ????????????????????????????????????????????????
     */
    public int getEventCount(String eventId) {
        return getEventCount(eventId, 0);
    }

    public int getEventCount(String eventId, int type) {
        try {
            int count = 0;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_event WHERE accId = ? AND eventId = ?");
            ps.setInt(1, getClient().getAccID());
            ps.setString(2, eventId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                /*
                 * ??????calendar.get(Calendar.YEAR)
                 * ??????calendar.get(Calendar.MONTH)+1
                 * ??????calendar.get(Calendar.DAY_OF_MONTH)
                 * ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
                 */
                count = rs.getInt("count");
                Timestamp updateTime = rs.getTimestamp("updateTime");
                if (type == 0) {
                    Calendar sqlcal = Calendar.getInstance();
                    if (updateTime != null) {
                        sqlcal.setTimeInMillis(updateTime.getTime());
                    }
                    if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 <= Calendar.getInstance().get(Calendar.DAY_OF_MONTH) || sqlcal.get(Calendar.MONTH) + 1 <= Calendar.getInstance().get(Calendar.MONTH) || sqlcal.get(Calendar.YEAR) + 1 <= Calendar.getInstance().get(Calendar.YEAR)) {
                        count = 0;
                        PreparedStatement psu = con.prepareStatement("UPDATE accounts_event SET count = 0, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND eventId = ?");
                        psu.setInt(1, getClient().getAccID());
                        psu.setString(2, eventId);
                        psu.executeUpdate();
                        psu.close();
                    }
                }
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_event (accId, eventId, count, type) VALUES (?, ?, ?, ?)");
                psu.setInt(1, getClient().getAccID());
                psu.setString(2, eventId);
                psu.setInt(3, 0);
                psu.setInt(4, type);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("?????? EventCount ??????.", Ex);
            return -1;
        }
    }

    /*
     * ??????????????????????????????????????????????????????
     */
    public void setEventCount(String eventId) {
        setEventCount(eventId, 0);
    }

    public void setEventCount(String eventId, int type) {
        setEventCount(eventId, type, 1);
    }

    public void setEventCount(String eventId, int type, int count) {
        int eventCount = getEventCount(eventId, type);
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts_event SET count = ?, type = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND eventId = ?");
            ps.setInt(1, eventCount + count);
            ps.setInt(2, type);
            ps.setInt(3, getClient().getAccID());
            ps.setString(4, eventId);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("?????? EventCount ????????????.", Ex);
        }
    }

    /*
     * ??????????????????????????????????????????????????????
     */
    public void resetEventCount(String eventId) {
        resetEventCount(eventId, 0);
    }

    public void resetEventCount(String eventId, int type) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts_event SET count = 0, type = ?, updateTime = CURRENT_TIMESTAMP() WHERE accId = ? AND eventId = ?");
            ps.setInt(1, type);
            ps.setInt(2, getClient().getAccID());
            ps.setString(3, eventId);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("?????? EventCount ????????????.", Ex);
        }
    }

    /*
     * ?????? ???????????????
     */
    public void checkBeastTamerSkill() {
        // 11212 = ?????????4??? ?????????????????????4????????? ?????????????????? ????????????????????????
        if (job != 11212 || level < 10) {
            return;
        }
        Skill skil;
        Map<Skill, SkillEntry> list = new HashMap<>();
        //?????????????????? , ?????????.????????????, ?????????.???????????? ?????????????????????2?????????
        int[] skillIds = {?????????.????????????, ?????????.????????????, ?????????.????????????, ?????????.??????????????????, ?????????.??????????????????, ?????????.????????????, ?????????.????????????, ?????????.????????????};
        for (int i : skillIds) {
            skil = SkillFactory.getSkill(i);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) 1, (byte) 1, -1));
            }
        }
        //????????????????????? 30????????????????????? ??????????????????10    10???????????????1???
        skil = SkillFactory.getSkill(?????????.?????????????????????);
        if (skil != null && level >= 30) {
            int oldskilllevel = getSkillLevel(skil);
            int newskilllevel = level / 10 - 2;
            if (newskilllevel > skil.getMaxLevel()) {
                newskilllevel = skil.getMaxLevel();
            }
            if (newskilllevel > 0 && newskilllevel > oldskilllevel && oldskilllevel < skil.getMaxLevel()) {
                list.put(skil, new SkillEntry((byte) newskilllevel, (byte) skil.getMaxLevel(), -1));
            }
        }
        //????????????????????? 120????????? ??????????????????30
        if (level >= 120) {
            skil = SkillFactory.getSkill(?????????.?????????????????????);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) skil.getMaxLevel(), -1));
            }
        }
        //?????????????????? 150????????? ??????????????????5
        if (level >= 150) {
            skil = SkillFactory.getSkill(?????????.??????????????????);
            if (skil != null && getSkillLevel(skil) <= 0) {
                list.put(skil, new SkillEntry((byte) skil.getMaxLevel(), (byte) skil.getMaxLevel(), -1));
            }
        }
        //??????????????????
        if (!list.isEmpty()) {
            changeSkillsLevel(list);
        }
    }

    /*
     * ????????????????????????????????????????????????
     */
    public int getBeastTamerSkillLevels(int skillId) {
        int ret = 0;
        int mod = skillId / 10000;
        if (mod == 11200 || mod == 11210 || mod == 11211 || mod == 11212) {
            Map<Skill, SkillEntry> chrSkills = new HashMap<>(getSkills());
            for (Entry<Skill, SkillEntry> list : chrSkills.entrySet()) {
                if (list.getKey().getId() / 10000 == mod && !list.getKey().isLinkedAttackSkill()) {
                    ret += getSkillLevel(list.getKey());
                }
            }
        }
        return ret;
    }

    /*
     * ?????????????????? ????????????????????????????????????
     * 59340 ?????????????????????
     * 59341 ?????????????????????
     */
    public void gainBeastTamerSkillExp(int amount) {
        if (job != 11212 || level < 60 || amount < 0) {
            return;
        }
        Skill skil = SkillFactory.getSkill(?????????.??????????????????);
        if (skil == null) {
            return;
        }
        //?????????????????????
        MapleQuestStatus levelStat = getQuestNAdd(MapleQuest.getInstance(59340));
        if (levelStat.getCustomData() == null) {
            levelStat.setCustomData("1"); //?????????1???
        }
        if (levelStat.getStatus() != 1) {
            levelStat.setStatus((byte) 1);
        }
        //?????????????????????
        MapleQuestStatus expStat = getQuestNAdd(MapleQuest.getInstance(59341));
        if (expStat.getCustomData() == null) {
            expStat.setCustomData("0"); //???????????????
        }
        if (expStat.getStatus() != 1) {
            expStat.setStatus((byte) 1);
        }
        int skillLevel = Integer.parseInt(levelStat.getCustomData());
        //??????????????????????????? ?????????????????????????????????
        if (getSkillLevel(skil) <= skillLevel) {
            Map<Skill, SkillEntry> sDate = new HashMap<>();
            sDate.put(skil, new SkillEntry((byte) skillLevel, (byte) skil.getMaxLevel(), -1));
            changeSkillLevel_Skip(sDate, false);
            updateQuest(levelStat, true);
            updateQuest(expStat, true);
            changed_skills = true;
            return;
        }
        int skillExp = Integer.parseInt(expStat.getCustomData());
        int needed = skil.getBonusExpInfo(skillLevel);
        int newExp = skillExp + amount;
        if (newExp >= needed) {
            if (skillLevel < skil.getMaxLevel()) {
                int newLevel = skillLevel + 1;
                if (newLevel > skil.getMaxLevel()) {
                    newLevel = skil.getMaxLevel();
                }
                Map<Skill, SkillEntry> sDate = new HashMap<>();
                sDate.put(skil, new SkillEntry((byte) newLevel, (byte) skil.getMaxLevel(), -1));
                changeSkillLevel_Skip(sDate, false);
                levelStat.setCustomData(String.valueOf(newLevel));
                expStat.setCustomData("0");
                changed_skills = true;
            } else { //??????????????????????????????
                levelStat.setCustomData("30");
                expStat.setCustomData("10000");
            }
        } else {
            expStat.setCustomData(String.valueOf(newExp));
        }
        updateQuest(levelStat, true);
        updateQuest(expStat, true);
    }

    /*
     * ???????????????????????????
     */
    public void fixTeachSkillLevel() {
        int skillId = JobConstants.getTecahSkillID(getJob());
        //??????ID<=0 ??????
        if (skillId <= 0) {
            return;
        }
        Skill skill = SkillFactory.getSkill(skillId);
        //?????????????????? ???????????????????????????????????????1?????????????????????????????????
        if (skill == null || skill.getMaxLevel() <= 1) {
            return;
        }
        //????????????????????????
        if (skill.canBeLearnedBy(getJob())) {
            //???????????????????????????
            int oldlevel = getSkillLevel(skill);
            //?????????????????? ????????????????????????????????????????????????????????????
            int newlevel = level >= 210 ? 3 : level >= 120 ? 2 : 1;
            //???????????????????????????
            int maxlevel = skill.getMaxLevel();
            //????????????????????????????????????????????????
            if (newlevel > maxlevel) {
                newlevel = maxlevel;
            }
            //?????????????????????????????????????????????????????????
            if (newlevel != oldlevel) {
                Map<Skill, SkillEntry> sDate = new HashMap<>();
                SkillEntry ret = getSkillEntry(skillId);
                if (ret != null) {
                    ret.skillevel = newlevel;
                    ret.masterlevel = (byte) skill.getMaxLevel();
                    sDate.put(skill, ret);
                } else {
                    sDate.put(skill, new SkillEntry((byte) newlevel, (byte) skill.getMaxLevel(), -1));
                }
                changeSkillsLevel(sDate);
            }
        }
    }

    /*
     * ??????????????????????????????
     */
    public void handleKillMobs(int kill, int moboid, int mobexp) {
        //?????????????????????
        if (lastMobKillTime <= 0 || lastMobKillTime + 10000 < System.currentTimeMillis()) {
            mobKills = 0;
            lastMobKillTime = System.currentTimeMillis();
        }
        //????????????????????????
        int totalexp;
        if (kill >= 3) {
            totalexp = (int) ((mobexp / 100.0) * kill);
            totalexp = totalexp < 1 ? 1 : totalexp;
            gainExp(totalexp, false, false, false);
            client.getSession().write(MaplePacketCreator.showContinuityKill(true, totalexp, kill, moboid));
        }
        mobKills += kill;
        if (mobKills > 1) {
            totalexp = (int) ((mobexp / 1000.0) * (mobKills >= 300 ? 300 : mobKills));
            totalexp = totalexp < 1 ? 1 : totalexp;
            gainExp(totalexp, false, false, false);
            client.getSession().write(MaplePacketCreator.showContinuityKill(false, totalexp, mobKills, moboid));
        }
        lastMobKillTime = System.currentTimeMillis();
    }

    public boolean isSamePartyId(int partyId) {
        return partyId > 0 && party != null && party.getPartyId() == partyId;
    }

    /*
     * ??????1??????????????????????????? totDamageToMob
     */
    public long getTotDamageToMob() {
        return totDamageToMob;
    }

    /*
     * ???????????????????????????
     */
    public void prepareFuWenTime(long time) {
        lastFuWenTime = System.currentTimeMillis() + time;
    }

    public int getLastFuWenTime() {
        if (lastFuWenTime <= 0) {
            lastFuWenTime = System.currentTimeMillis();
        }
        long time = lastFuWenTime - System.currentTimeMillis();
        if (time <= 0) {
            return 0;
        }
        return (int) time;
    }

    /*
     * ?????????????????????????????????????????????
     */
    public Map<Integer, Integer> getSkillSkinList() {
        Map<Integer, Integer> ret = new LinkedHashMap<>(); //??????????????????????????? [??????ID] [??????ID]
        List<Integer> theList = getInventory(MapleInventoryType.EQUIPPED).listSkillSkinIds();  //????????????????????????ID??????
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer i : theList) {
            int skillId = ii.getSkillSkinFormSkillId(i);
            Skill skill = SkillFactory.getSkill(skillId);
            if (skill != null) { //&& skill.canBeLearnedBy(getJob())
                ret.put(skillId, i); //???????????? [??????ID] [??????ID]
            }
        }
        return ret;
    }

    /*
     * ???????????????????????????????????????
     */
    public ModifyItemOptential getItemOptential() {
        return ItemOptential;
    }

    public void setItemOptential(ModifyItemOptential potential) {
        this.ItemOptential = potential;
    }

    public void resetItemOptential() {
        this.ItemOptential = null;
    }

    /*
     * ????????????1????????????????????????1?????????
     */
    public void instantMapWarp(int portalId) {
        if (map == null) {
            return;
        }
        MaplePortal portal = map.getPortal(portalId);
        if (portal == null) {
            portal = map.getPortal(0);
        }
        Point portalPos = new Point(portal.getPosition());
        client.getSession().write(MaplePacketCreator.instantMapWarp(getId(), portalPos));
        checkFollow();
        map.movePlayer(this, portalPos);
    }

    /*
     * ????????????????????????1?????????
     */
    public void instantMapWarp(Point portalPos) {
        if (map == null || portalPos == null) {
            return;
        }
        client.getSession().write(MaplePacketCreator.instantMapWarp(getId(), portalPos));
        checkFollow();
        map.movePlayer(this, portalPos);
    }

    public final int[] StringtoInt(final String str) {
        int ret[] = new int[100]; //????????????100?????????????????????
        StringTokenizer toKenizer = new StringTokenizer(str, ",");
        String[] strx = new String[toKenizer.countTokens()];
        for (int i = 0; i < toKenizer.countTokens(); i++) {
            strx[i] = toKenizer.nextToken();
            ret[i] = Integer.valueOf(strx[i]);
        }
        return ret;
    }

    //?????????????????? - ??????????????????????????????????????????????????????
    public final boolean MissionCanMake(final int missionid) {
        boolean ret = true;
        for (int i = 1; i < 5; i++) {
            if (!MissionCanMake(missionid, i)) { //???????????????????????????????????????
                ret = false;
            }
        }
        return ret;
    }

    //?????????????????? - ??????????????????????????????????????????????????????
    public final boolean MissionCanMake(final int missionid, final int checktype) {
        //checktype
        //1 ??????????????????
        //2 ????????????
        //3 ????????????
        //4 ??????????????????
        boolean ret = false;
        int minlevel = -1, maxlevel = -1; //???????????????????????????????????????
        String joblist = "all", itemlist = "none", prelist = "none"; //????????????????????????????????????????????????????????????????????????
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT minlevel,maxlevel,joblist,itemlist,prelist FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //??????????????????????????????
            switch (checktype) {
                case 1: //??????????????????????????????
                    if (minlevel > -1 && maxlevel > -1) { //???????????????
                        if (this.getLevel() >= minlevel && this.getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel > -1 && maxlevel == -1) { //??????????????????
                        if (this.getLevel() >= minlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel > -1) { //??????????????????
                        if (this.getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel == -1) { //??????????????????-1?????????????????????????????????
                        ret = true;
                    }
                    break;
                case 2: //??????????????????????????????
                    if (joblist.equals("all")) { //????????????????????????
                        ret = true;
                    } else {
                        for (int i : StringtoInt(joblist)) {
                            if (this.getJob() == i) { //?????????????????????ID????????????????????????????????????????????????????????????
                                ret = true;
                                break;
                            }
                        }
                    }
                    break;
                case 3: //???????????????????????????
                    if (itemlist.equals("none")) { //????????????????????????
                        ret = true;
                    } else {
                        for (int i : StringtoInt(itemlist)) {
                            if (!this.haveItem(i)) { //?????????????????????????????????????????????????????????
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
                case 4: //?????????????????????????????????
                    if (prelist.equals("none")) { //????????????????????????
                        ret = true;
                    } else {
                        for (int i : StringtoInt(prelist)) {
                            if (!MissionStatus(this.getId(), i, 0, 1)) { //???????????????????????????????????????????????????????????????????????????
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
            }
        } catch (final SQLException ex) {
            //log.error("Error MissionCanMake:", ex);
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
        return ret;
    }

    //?????????????????? - ???????????????????????????
    public final int MissionGetIntData(final int missionid, final int checktype) {
        //checktype
        //1 ????????????
        //2 ????????????
        int ret = -1;
        int minlevel = -1, maxlevel = -1;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT minlevel,maxlevel FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
            }
            rs.close();
            ps.close();
            //??????????????????????????????
            switch (checktype) {
                case 1:
                    ret = minlevel;
                    break;
                case 2:
                    ret = maxlevel;
                    break;
            }
        } catch (final SQLException ex) {
            //log.error("Error MissionGetIntData:", ex);
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
        return ret;
    }

    //?????????????????? - ????????????????????????????????????
    public final String MissionGetStrData(final int missionid, final int checktype) {
        //checktype
        //1 ????????????
        //2 ????????????
        //3 ????????????
        //4 ??????????????????
        String ret = "";
        String missionname = "", joblist = "all", itemlist = "none", prelist = "none"; //????????????????????????????????????????????????????????????????????????
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT missionname,joblist,itemlist,prelist FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            rs = ps.executeQuery();
            if (rs.next()) {
                missionname = rs.getString("missionname");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //??????????????????????????????
            switch (checktype) {
                case 1:
                    ret = missionname;
                    break;
                case 2:
                    ret = joblist;
                    break;
                case 3:
                    ret = itemlist;
                    break;
                case 4:
                    ret = prelist;
                    break;
            }
        } catch (SQLException ex) {
            //log.error("Error MissionCanMake:", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ex) {
                log.error(ex.toString());
            }
        }
        return ret;
    }

    //?????????????????? - ????????????????????????????????????
    public final String MissionGetJoblist(final String joblist) {
        String ret = "", jobname = "";
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            for (int i : StringtoInt(joblist)) {
                ps = con.prepareStatement("SELECT * FROM joblist WHERE id = ?");
                ps.setInt(1, i);
                rs = ps.executeQuery();
                if (rs.next()) {
                    jobname = jobname + "," + rs.getString("jobname");
                }
                rs.close();
                ps.close();
            }
        } catch (final SQLException ex) {
            //log.error("Error MissionGetJoblist:", ex);
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
        return ret;
    }

    //?????????????????? - ????????????
    public final void MissionMake(final int charid, final int missionid, final int repeat, final long repeattime, final int lockmap, final int mobid) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO missionstatus VALUES (DEFAULT, ?, ?, ?, ?, ?, 0, DEFAULT, 0, 0, ?, 0, 0)");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.setInt(3, repeat);
            ps.setLong(4, repeattime);
            ps.setInt(5, lockmap);
            ps.setInt(6, mobid);
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

    //?????????????????? - ????????????????????????
    public final void MissionReMake(final int charid, final int missionid, final int repeat, final long repeattime, final int lockmap) {
        int finish = 0;
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET `repeat` = ?, repeattime = ?, lockmap = ?, finish = ?, minnum = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, repeat);
            ps.setLong(2, repeattime);
            ps.setInt(3, lockmap);
            ps.setInt(4, finish);
            ps.setInt(5, missionid);
            ps.setInt(6, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionFinish:", ex);
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

    //?????????????????? - ????????????
    public final void MissionFinish(final int charid, final int missionid) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET finish = 1, lastdate = CURRENT_TIMESTAMP(), times = times+1, lockmap = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionFinish:", ex);
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

    // ?????????????????? - ????????????????????????
    public final int MissionGetFinish(final int charid, final int missionid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        int ret = 0;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT times FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            rs = ps.executeQuery();
            if (rs.next()) {
                ret = rs.getInt(1);
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionFinish:", ex);
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
        return ret;
    }

    //?????????????????? - ????????????
    public final void MissionDelete(final int charid, final int missionid) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("DELETE FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionDelete:", ex);
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

    //?????????????????? - ?????????????????????????????????
    public final void MissionSetMinNum(final int charid, final int missionid, final int num) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET `minnum` = ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, num);
            ps.setInt(2, missionid);
            ps.setInt(3, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionAddNum:", ex);
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

    //?????????????????? - ?????????????????????????????????
    public final void MissionAddMinNum(final int charid, final int missionid, final int num) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET `minnum` = `minnum` + ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, num);
            ps.setInt(2, missionid);
            ps.setInt(3, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionAddNum:", ex);
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

    // ?????????????????? - ???????????????????????????????????????
    public final int MissionGetMinNum(final int charid, final int missionid, final int mobid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        int ret = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            if (mobid == 0) {
                ps = con.prepareStatement("SELECT minnum FROM missionstatus WHERE charid = ? and missionid = ?");
                ps.setInt(1, charid);
                ps.setInt(2, missionid);
            } else {
                ps = con.prepareStatement("SELECT minnum FROM missionstatus WHERE charid = ? and missionid = ? and mobid = ?");
                ps.setInt(1, charid);
                ps.setInt(2, missionid);
                ps.setInt(3, mobid);
            }
            rs = ps.executeQuery();
            while (rs.next()) {
                ret = rs.getInt("minnum");
                break;
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMob:", ex);
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
        return ret;
    }

    // ?????????????????? - ???????????????????????????????????????
    public final int MissionGetMaxNum(final int charid, final int missionid, final int mobid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        int ret = 0;
        try {
            final Connection con = DatabaseConnection.getConnection();
            if (mobid == 0) {
                ps = con.prepareStatement("SELECT maxnum FROM missionstatus WHERE charid = ? and missionid = ?");
                ps.setInt(1, charid);
                ps.setInt(2, missionid);
            } else {
                ps = con.prepareStatement("SELECT maxnum FROM missionstatus WHERE charid = ? and missionid = ? and mobid = ?");
                ps.setInt(1, charid);
                ps.setInt(2, missionid);
                ps.setInt(3, mobid);
            }
            rs = ps.executeQuery();
            while (rs.next()) {
                ret = rs.getInt("maxnum");
                break;
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMob:", ex);
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
        return ret;
    }

    // ?????????????????? - ?????????????????????????????????ID
    public final int MissionGetMobId(final int charid, final int missionid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        int ret = 0;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT mobid FROM missionstatus WHERE charid = ? and missionid = ?");
            ps.setInt(1, charid);
            ps.setInt(2, missionid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret = rs.getInt("mobid");
                break;
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMob:", ex);
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
        return ret;
    }

    //?????????????????? - ?????????????????????????????????
    public final void MissionSetMobId(final int charid, final int missionid, final int mobid) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET `mobid` = ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, mobid);
            ps.setInt(2, missionid);
            ps.setInt(3, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionAddNum:", ex);
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

    //?????????????????? - ???????????????????????????????????????
    public final void MissionMaxNum(final int missionid, final int maxnum) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE missionstatus SET `maxnum` = ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, maxnum);
            ps.setInt(2, missionid);
            ps.setInt(3, this.getId());
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMaxNum:", ex);
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

    //?????????????????? - ??????repeattime
    public final long MissionGetRepeattime(final int charid, final int missionid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        long ret = 0;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT repeattime FROM missionstatus WHERE charid = ? and missionid = ?");
            ps.setInt(1, charid);
            ps.setInt(2, missionid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret = rs.getLong("repeattime");
                break;
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionMob:", ex);
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
        return ret;
    }

    //?????????????????? - ???????????????????????????
    public final void MissionDeleteNotFinish(final int charid) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("DELETE FROM missionstatus WHERE finish = 0 and charid = ?");
            ps.setInt(1, charid);
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            //log.error("Error MissionDeleteNotFinish:", ex);
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

    /* ?????????????????? - ???????????????????????????
     * checktype
     * 0 ?????????????????????????????????
     * 1 ????????????????????????????????????
     * 2 ????????????????????????????????????????????????
     * 3 ????????????????????????????????????????????????
     * 4 ???????????????????????????????????????????????????????????????
     * 5 ??????????????????????????????????????????
     */
    public final boolean MissionStatus(final int charid, final int missionid, final int maxtimes, final int checktype) {
        boolean ret = false; //??????????????????
        int MissionMake = 0; //??????????????????????????????
        long now = 0;
        long t = 0;
        Timestamp lastdate;
        int repeat = 0;
        int repeattime = 0;
        int finish = 0;
        int times = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            if (checktype == 5) {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE lockmap = 1 and charid = ?");
                ps.setInt(1, charid);
            } else {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
                ps.setInt(1, missionid);
                ps.setInt(2, charid);
            }
            rs = ps.executeQuery();
            if (rs.next()) {
                lastdate = rs.getTimestamp("lastdate");
                repeat = rs.getInt("repeat");
                repeattime = rs.getInt("repeattime");
                finish = rs.getInt("finish");
                times = rs.getInt("times");
                t = lastdate.getTime();
                now = System.currentTimeMillis();
                MissionMake = 1; //?????????????????????????????????
            }
            rs.close();
            ps.close();
            //????????????????????????
            switch (checktype) {
                case 0:
                    if (finish == 1) {
                        ret = true;
                    }
                    break;
                case 1:
                    if (repeat == 1) {
                        ret = true;
                    }
                    break;
                case 2:
                    if (now - t > repeattime) { // ????????????????????????????????????????????????????????????
                        //????????????????????????
                        ret = true;
                    }
                    break;
                case 3:
                    if (times >= maxtimes) {
                        //????????????????????????
                        ret = true;
                    }
                    break;
                case 4:
                    if (MissionMake == 1) {
                        //????????????????????????
                        ret = true;
                    }
                    break;
                case 5:
                    if (MissionMake == 1) {
                        //??????????????????????????????
                        ret = true;
                    }
            }
        } catch (final SQLException ex) {
            //log.error("Error MissionStatus:", ex);
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
        return ret;
    }

    public void gainItem(int code, int amount, String log) {
        MapleInventoryManipulator.addById(client, code, (short) amount, log);
    }

    public void fixOnlineTime() {
        int day = getIntRecord(GameConstants.CHECK_DAY);
        int enter = getIntNoRecord(GameConstants.ENTER_CASH_SHOP);
        if (enter > 0 && getDay() != day) {
            setTodayOnlineTime(0);
            initTodayOnlineTime();
        }
        updateTodayDate();
        updataEnterShop(false);
    }

    public int getDay() {
        Calendar c = Calendar.getInstance();
        int datenum = c.get(Calendar.DATE);
        return datenum;
    }

    public void updataEnterShop(boolean enter) {
        getQuestNAdd(MapleQuest.getInstance(GameConstants.ENTER_CASH_SHOP)).setCustomData(enter ? String.valueOf(1) : String.valueOf(0));
    }

    public void updateTodayDate() {
        getQuestNAdd(MapleQuest.getInstance(GameConstants.CHECK_DAY)).setCustomData(String.valueOf(getDay()));
    }

    public int getTodayOnlineTime() {
        return todayonlinetime + (int) ((System.currentTimeMillis() - todayonlinetimestamp.getTime()) / 60000);
    }

    public int getTotalOnlineTime() {
        return totalonlinetime + (int) ((System.currentTimeMillis() - todayonlinetimestamp.getTime()) / 60000);
    }

    public void setTodayOnlineTime(int time) {
        todayonlinetime = time;
    }

    public void initTodayOnlineTime() {
        todayonlinetimestamp = new Timestamp(System.currentTimeMillis());
    }

    public void finishActivity(final int questid) {
        MapleActivity.finish(this, questid);
    }

    public final void openNpc(final int id) {
        openNpc(id, 0);
    }

    public final void openNpc(final int id, final int mode) {
        getClient().removeClickedNPC();
        NPCScriptManager.getInstance().dispose(getClient());
        NPCScriptManager.getInstance().start(getClient(), id, mode);
    }

    public static boolean hasSkill(final Map<Skill, SkillEntry> cskills, final int skillid, int level) {
        final Skill skill = SkillFactory.getSkill(skillid);
        if (skill != null) {
            if (cskills.get(skill) != null) {
                return cskills.get(skill).skillevel == level && cskills.containsKey(skill);
            }
            return cskills.containsKey(skill);
        } else {
            return false;
        }
    }

    /*
     * ??????????????????
     */
    public void checkNameLevel() {
        if (!questinfo.containsKey(18127)) {
            updateInfoQuest(18127, "ago=" + this.getVip() + ";step=0;gD=14/08/08;FP=25;adm=1", false);
        }
    }

    /*
     * ???????????? 1 = ?????????????????? 2 = ?????????????????? 3 = ?????????????????? 4 = ????????????
     */
    public int getHyPay(int type) {
        int pay = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("select * from hypay where accname = ?");
            ps.setString(1, getClient().getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (type == 1) { //??????????????????
                    pay = rs.getInt("pay");
                } else if (type == 2) { //???????????????
                    pay = rs.getInt("payUsed");
                } else if (type == 3) { //??????????????????
                    pay = rs.getInt("pay") + rs.getInt("payUsed");
                } else if (type == 4) { //????????????
                    pay = rs.getInt("payReward");
                } else {
                    pay = 0;
                }
            } else {
                PreparedStatement psu = con.prepareStatement("insert into hypay (accname, pay, payUsed, payReward) VALUES (?, ?, ?, ?)");
                psu.setString(1, getClient().getAccountName());
                psu.setInt(2, 0); //??????????????????
                psu.setInt(3, 0); //??????????????????
                psu.setInt(4, 0); //????????????
                psu.executeUpdate();
                psu.close();
            }
            ps.close();
            rs.close();
        } catch (SQLException ex) {
            log.error("??????????????????????????????", ex);
        }
        return pay;
    }

    public int addHyPay(int hypay) {
        int pay = getHyPay(1);
        int payUsed = getHyPay(2);
        int payReward = getHyPay(4);
        if (hypay > pay) {
            return -1;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE hypay SET pay = ? ,payUsed = ? ,payReward = ? where accname = ?");
            ps.setInt(1, pay - hypay); //??????????????????
            ps.setInt(2, payUsed + hypay); //??????????????????
            ps.setInt(3, payReward + hypay); //????????????
            ps.setString(4, getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        } catch (SQLException ex) {
            log.error("??????????????????????????????", ex);
            return -1;
        }
    }

    public int delPayReward(int pay) {
        int payReward = getHyPay(4);
        if (pay <= 0) {
            return -1;
        }
        if (pay > payReward) {
            return -1;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE hypay SET payReward = ? where accname = ?");
            ps.setInt(1, payReward - pay); //????????????
            ps.setString(2, getClient().getAccountName());
            ps.executeUpdate();
            ps.close();
            return 1;
        } catch (SQLException ex) {
            log.error("????????????????????????????????????", ex);
            return -1;
        }
    }

    public void AutoCelebrityCrit() {
        final int skilllevel = getSkillLevel(??????.????????????);
        if (skilllevel <= 0 || celebrityCrit != null) {
            return;
        }
        celebrityCrit = BuffTimer.getInstance().register(new Runnable() {
            @Override
            public void run() {
                Skill crit = SkillFactory.getSkill(??????.????????????);
                MapleStatEffect effect = crit.getEffect(skilllevel);
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.????????????, skilllevel * 2));
                int duration = 2100000000;
                client.getSession().write(BuffPacket.giveBuff(crit.getId(), duration, stat, effect, client.getPlayer()));
//                SkillFactory.getSkill(??????.????????????).getEffect(skilllevel).applyTo(client.getPlayer());
            }
        }, 1000 * 10);
    }

    public void cannelAutoCelebrityCrit() {
        if (celebrityCrit != null) {
            celebrityCrit.cancel(true);
            celebrityCrit = null;
        }
    }
    public void setleijichongzhi1(final int point) {
		PreparedStatement ps = null;
		try {
			final Connection con = DatabaseConnection.getConnection();
			ps = con.prepareStatement("UPDATE accounts SET rmb = rmb + ? WHERE name = ?");
			ps.setInt(1, point);
			ps.setString(2, getClient().getAccountName());
			ps.executeUpdate();
			ps.close();
		} catch (final SQLException ex) {
			log.error("????????????rmb?????????" + ex);
			try {
				if (ps != null) {
					ps.close();
				}
			} catch (final SQLException ex1) {
				log.error("????????????rmb?????????" + ex1);
			}
		}
	}
    public int getleijichongzhi(String boss, int type) {
		try {
			int count = 0;
			PreparedStatement ps;
			Connection con = DatabaseConnection.getConnection();
			ps = con.prepareStatement("SELECT * FROM leijichongzhi WHERE characterid = ? AND bossid = ?");
			ps.setInt(1, id);
			ps.setString(2, boss);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				/*
				 * ??????calendar.get(Calendar.YEAR) ??????calendar.get(Calendar.MONTH)+1
				 * ??????calendar.get(Calendar.DAY_OF_MONTH) ?????????calendar.get(Calendar.DAY_OF_WEEK)-1
				 */
				count = rs.getInt("count");
				if (count < 0) {
					return count;
				}
				Timestamp bossTime = rs.getTimestamp("time");
				rs.close();
				ps.close();
				if (type == 0) {
					Calendar sqlcal = Calendar.getInstance();
					if (bossTime != null) {
						sqlcal.setTimeInMillis(bossTime.getTime());
					}
					if (sqlcal.get(Calendar.DAY_OF_MONTH) + 1 + type <= Calendar.getInstance()
							.get(Calendar.DAY_OF_MONTH)
							|| sqlcal.get(Calendar.MONTH) + 1 + type <= Calendar.getInstance().get(Calendar.MONTH)
							|| sqlcal.get(Calendar.YEAR) + 1 + type <= Calendar.getInstance().get(Calendar.YEAR)) {
						count = 0;
						ps = con.prepareStatement(
								"UPDATE leijichongzhi SET count = 0, time = CURRENT_TIMESTAMP() WHERE characterid = ? AND bossid = ?");
						ps.setInt(1, id);
						ps.setString(2, boss);
						ps.executeUpdate();
					}
				}
			} else {
				PreparedStatement psu = con.prepareStatement(
						"INSERT INTO leijichongzhi (characterid, bossid, count, type) VALUES (?, ?, ?, ?)");
				psu.setInt(1, id);
				psu.setString(2, boss);
				psu.setInt(3, 0);
				psu.setInt(4, type);
				psu.executeUpdate();
				psu.close();
			}
			rs.close();
			ps.close();
			return count;
		} catch (Exception Ex) {
			log.error("????????????????????????.", Ex);
			return -1;
		}
	}
    public void setleijichongzhi(String boss, int type, int count) {
		int bossCount = getleijichongzhi(boss, type);
		try {
			PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement(
					"UPDATE leijichongzhi SET count = ?, type = ?, time = CURRENT_TIMESTAMP() WHERE characterid = ? AND bossid = ?");
			ps.setInt(1, bossCount + count);
			ps.setInt(2, type);
			ps.setInt(3, id);
			ps.setString(4, boss);
			ps.executeUpdate();
			ps.close();
		} catch (Exception Ex) {
			log.error("Error while set bosslog.", Ex);
		}
	}

    public void setleijichongzhi2(final int point) {
		PreparedStatement ps = null;
		try {
			final Connection con = DatabaseConnection.getConnection();
			ps = con.prepareStatement("UPDATE accounts SET rmbpoints = rmbpoints + ? WHERE name = ?");
			ps.setInt(1, point);
			ps.setString(2, getClient().getAccountName());
			ps.executeUpdate();
			ps.close();
		} catch (final SQLException ex) {
			log.error("????????????rmb?????????" + ex);
			try {
				if (ps != null) {
					ps.close();
				}
			} catch (final SQLException ex1) {
				log.error("????????????rmb?????????" + ex1);
			}
		}
	}


    public void switchLuckyMoney(boolean on) {
        if (on && luckymoney) {
            return;
        }
        luckymoney = on;
        client.getSession().write(BuffPacket.switchLuckyMoney(on));
    }

    // ??????????????????
    public void changeDamageSkin(int id) {
        MapleQuest q = MapleQuest.getInstance(7291);
        if (q == null) {
            return;
        }
        MapleQuestStatus status = getQuestNAdd(q);
        status.setStatus((byte) 1);
        status.setCustomData(String.valueOf(id));
        updateQuest(status, true);
        map.broadcastMessage(InventoryPacket.showDamageSkin(getId(), id)); //???????????????????????????????????????????????????
        dropMessage(-9, "????????????????????????");
    }

    /*
     * ???????????????????????????
     */
    public int getDamageSkin() {
        if (JobConstants.is?????????(job)) {
            return 0;
        }
        MapleQuestStatus stat = getQuestNAdd(MapleQuest.getInstance(7291));
        stat.setStatus((byte) 1); //????????????????????????
        if (stat.getCustomData() == null) {
            stat.setCustomData("0");
        }
        return Integer.parseInt(stat.getCustomData());
    }

    public final void insertRanking(String rankingname, int value) {
        RankingTop.getInstance().insertRanking(this, rankingname, value);
    }

    public void getNpcNotice(int npcid, String text, int time) {
        getClient().getSession().write(UIPacket.getNpcNotice(npcid, text, time * 1000));
    }

    public void setChatSession(IoSession session) {
        chatSession = session;
    }

    public synchronized IoSession getChatSession() {
        return chatSession;
    }

    public int getWeaponPoint() {
        return weaponPoint;
    }

    public void setWeaponPoint(int wp) {
        this.weaponPoint = wp;
        client.getSession().write(MaplePacketCreator.showGainWeaponPoint(wp));
        client.getSession().write(MaplePacketCreator.updateWeaponPoint(getWeaponPoint()));
    }

    public void gainWeaponPoint(int wp) {
        this.weaponPoint += wp;
        if (wp > 0) {
            client.getSession().write(MaplePacketCreator.showGainWeaponPoint(wp));
        }
        client.getSession().write(MaplePacketCreator.updateWeaponPoint(getWeaponPoint()));
    }

    public Map<String, Integer> getCredits() {
        return credit;
    }

    public void setCredit(String name, int value) {
        credit.put(name, value);
    }

    public void gainCredit(String name, int value) {
        credit.put(name, getCredit(name) + value);
    }

    public int getCredit(String name) {
        if (credit.containsKey(name)) {
            return credit.get(name);
        }
        return 0;
    }

    public void setJianQi(int jianqi) {
        specialStats.setJianQi(jianqi);
        getClient().getSession().write(MaplePacketCreator.updateJianQi(specialStats.getJianQi()));
    }

    public void gainJianQi() {
        if (JobConstants.is??????(getJob())) {
            specialStats.gainJianQi(this.hasBuffSkill(??????.????????????) ? 2 : 1);
            getClient().getSession().write(MaplePacketCreator.updateJianQi(specialStats.getJianQi()));
        }
    }

    public int getJianQi() {
        return specialStats.getJianQi();
    }

    public boolean checkSoulWeapon() {
        Equip weapon = (Equip) getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        if (weapon == null) {
            return false;
        }
        return weapon.getSoulEnchanter() != 0;
    }

    public boolean isSoulWeapon(Equip equip) {
        if (equip == null) {
            return false;
        }
        return equip.getSoulEnchanter() != 0;
    }

    public void equipSoulWeapon(Equip equip) {
        changeSkillLevel(new Skill(getEquippedSoulSkill()), (byte) -1, (byte) 0);
        changeSkillLevel(new Skill(equip.getSoulSkill()), (byte) 1, (byte) 1);
        setSoulCount((short) 0);
        getClient().getSession().write(BuffPacket.giveSoulGauge(getSoulCount(), equip.getSoulSkill()));
    }

    public void unequipSoulWeapon(Equip equip) {
        changeSkillLevel(new Skill(equip.getSoulSkill()), (byte) -1, (byte) 0);
        setSoulCount((short) 0);

        getClient().getSession().write(BuffPacket.cancelSoulGauge());
        getMap().broadcastMessage(BuffPacket.cancelForeignSoulEffect(getId()));
    }

    public void writeSoulPacket() {
        int soulSkill = getEquippedSoulSkill();
        getClient().getSession().write(BuffPacket.giveSoulGauge(addgetSoulCount(), soulSkill));
    }

    public void checkSoulState(boolean useskill) {
        int skillid = getEquippedSoulSkill();
        if (skillid > 0) {
            MapleStatEffect skill = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));
            long cooldown = getCooldownLimit(skillid);
            if (useskill) {
                if (getSoulCount() >= skill.getSoulMpCon()) {
                    List<ModifyInventory> mods = new ArrayList<>();
                    setSoulCount((short) (getSoulCount() - skill.getSoulMpCon()));
                    getClient().getSession().write(BuffPacket.giveSoulEffect(0));
                    getMap().broadcastMessage(BuffPacket.cancelForeignSoulEffect(getId()));
                    client.getSession().write(InventoryPacket.modifyInventory(true, mods, this));
                }
            } else if (getSoulCount() >= skill.getSoulMpCon()) {
                if (cooldown <= 0) {
                    getClient().getSession().write(BuffPacket.giveSoulEffect(skillid));
                    getMap().broadcastMessage(this, BuffPacket.giveForeignSoulEffect(getId(), skillid), false);
                }
            }
        }
    }

    public short getSoulCount() {
        return soulcount;
    }

    public void setSoulCount(short soulcount) {
        this.soulcount = soulcount > 1000 ? 1000 : soulcount;
    }

    public void addSoulCount() {
        if (soulcount < 1000) {
            this.soulcount++;
        }
    }

    public short addgetSoulCount() {
        addSoulCount();
        return getSoulCount();
    }

    public int getEquippedSoulSkill() {
        Equip weapon = (Equip) getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        if (weapon == null) {
            return 0;
        }
        return weapon.getSoulSkill();
    }

    public int getSoulSkillMpCon() {
        int skillid = getEquippedSoulSkill();
        MapleStatEffect skill = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));
        return skill.getSoulMpCon();
    }

    public void iNeedSystemProcess() {
        setLastCheckProcess(System.currentTimeMillis());
        this.getClient().getSession().write(MaplePacketCreator.SystemProcess());
    }

    public long getLastCheckProcess() {
        return lastCheckProcess;
    }

    public void setLastCheckProcess(long lastCheckProcess) {
        this.lastCheckProcess = lastCheckProcess;
    }

    public List<MapleProcess> getProcess() {
        return Process;
    }

    public List<Integer> getEffectSwitch() {
        return effectSwitch;
    }

    public void updateEffectSwitch(int pos) {
        for (Integer poss : effectSwitch) {
            if (poss == pos) {
                effectSwitch.remove(poss);
                return;
            }
        }
        effectSwitch.add(pos);
    }

    public void gainPP(int pp) {
        specialStats.gainPP(pp);
        client.getSession().write(BuffPacket.showPP(specialStats.getPP()));
    }

    public void handle????????????(int moboid) {
        MapleMonster mob = map.getMonsterByOid(moboid);
        Skill BuffSkill = SkillFactory.getSkill(?????????.????????????);
        Skill skill_1 = SkillFactory.getSkill(?????????.????????????);
        Skill skill_2 = SkillFactory.getSkill(?????????.????????????);
        Skill skill_4 = SkillFactory.getSkill(?????????.???????????????);
        int skillLevel_1 = getSkillLevel(BuffSkill);
        int skillLevel_2 = getSkillLevel(skill_2);
        int skillLevel_4 = getSkillLevel(skill_4);
        if (skillLevel_1 < 0) {
            return;
        }
        MapleStatEffect effect = BuffSkill.getEffect(skillLevel_1);
        int prop = effect.getProp();

        if (skillLevel_2 > 0) {
            prop += skill_2.getEffect(skillLevel_2).getProp();
        }

        if (skillLevel_4 > 0) {
            prop += skill_2.getEffect(skillLevel_4).getProp();
        }

        if (Randomizer.nextInt(100) > prop) {
            //Show????????????_1
            specialStats.gainForceCounter();
            getMap().broadcastMessage(MaplePacketCreator.Show??????????????????(getId(), 14000028, mob.getId(), 1, mob.getTruePosition(), specialStats.getForceCounter()), getTruePosition());
            specialStats.gainForceCounter();
        }
    }

    public MapleSigninStatus getSigninStatus() {
        return siginStatus;
    }

    /**
     * ???????????????????????????
     */
    public void initSigninStatus() {
        if (level >= MapleSignin.MINLEVEL) {
            siginStatus = new MapleSigninStatus(getInfoQuest(GameConstants.??????????????????_????????????));
            updateInfoQuest(GameConstants.??????????????????_????????????, MapleSignin.getCurrentTime(), false);
        }
    }
}
