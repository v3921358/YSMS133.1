package server.life;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.skills.*;
import handling.channel.ChannelServer;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;

import java.lang.ref.WeakReference;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import scripting.event.EventInstanceManager;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.Randomizer;
import server.Timer.EtcTimer;
import server.Timer.MapTimer;
import server.maps.MapleFoothold;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.ConcurrentEnumMap;
import tools.Pair;
import tools.PairMonster;
import tools.packet.MobPacket;

public class MapleMonster extends AbstractLoadedMapleLife {

    private MapleMonsterStats stats;
    private ChangeableStats ostats = null;
    private long hp, nextKill = 0, lastDropTime = 0;
    private int mp;
    private byte carnivalTeam = -1;
    private MapleMap map;
    private WeakReference<MapleMonster> sponge = new WeakReference<>(null);
    private int linkoid = 0, lastNode = -1, highestDamageChar = 0, linkCID = 0; // Just a reference for monster EXP distribution after dead
    private WeakReference<MapleCharacter> controller = new WeakReference<>(null);
    private boolean fake = false, dropsDisabled = false, controllerHasAggro = false, controllerKnowsAboutAggro, spawnRevivesDisabled = false;
    private final Collection<AttackerEntry> attackers = new LinkedList<>();
    private EventInstanceManager eventInstance;
    private MonsterListener listener = null;
    private byte[] reflectpack = null, nodepack = null;
    private final ConcurrentEnumMap<MonsterStatus, MonsterStatusEffect> mobEffects = new ConcurrentEnumMap<>(MonsterStatus.class);
    private final LinkedList<MonsterStatusEffect> poisonEffects = new LinkedList<>();
    private final ReentrantReadWriteLock poisonsLock = new ReentrantReadWriteLock();
    private List<Pair<Integer, Integer>> usedSkills = new ArrayList<>();
    private Map<Pair<Integer, Integer>, Integer> skillsUsed = new HashMap<>();

    private int stolen = -1; //monster can only be stolen ONCE
    private boolean shouldDropItem = false, killed = false;

    public MapleMonster(int id, MapleMonsterStats stats) {
        super(id);
        initWithStats(stats);
    }

    public MapleMonster(MapleMonster monster) {
        super(monster);
        initWithStats(monster.stats);
    }

    public void initWithStats(MapleMonsterStats stats) {
        setStance(5);
        this.stats = stats;
        hp = stats.getHp();
        mp = stats.getMp();
    }

    public ArrayList<AttackerEntry> getAttackers() {
        if (attackers == null || attackers.size() <= 0) {
            return new ArrayList<>();
        }
        ArrayList<AttackerEntry> ret = new ArrayList<>();
        for (AttackerEntry e : attackers) {
            if (e != null) {
                ret.add(e);
            }
        }
        return ret;
    }

    public MapleMonsterStats getStats() {
        return stats;
    }

    public boolean isBoss() {
        return stats.isBoss();
    }

    public int getAnimationTime(String name) {
        return stats.getAnimationTime(name);
    }

    public void disableDrops() {
        this.dropsDisabled = true;
    }

    public boolean dropsDisabled() {
        return dropsDisabled;
    }

    public final void disableSpawnRevives() {
        this.spawnRevivesDisabled = true;
    }

    public final boolean spawnRevivesDisabled() {
        return spawnRevivesDisabled;
    }

    public final String getHitParts() {
        return stats.getHitParts();
    }

    public void setSponge(MapleMonster mob) {
        sponge = new WeakReference<>(mob);
        if (linkoid <= 0) {
            linkoid = mob.getObjectId();
        }
    }

    public void setMap(MapleMap map) {
        this.map = map;
        startDropItemSchedule();
    }

    public int getMobLevel() {
        if (ostats != null) {
            return ostats.level;
        }
        return stats.getLevel();
    }

    public long getHp() {
        return hp;
    }

    public void setHp(long hp) {
        this.hp = hp;
    }

    public ChangeableStats getChangedStats() {
        return ostats;
    }

    public long getMobMaxHp() {
        if (ostats != null) {
            return ostats.hp;
        }
        return stats.getHp();
    }

    public int getMp() {
        return mp;
    }

    public void setMp(int mp) {
        if (mp < 0) {
            mp = 0;
        }
        this.mp = mp;
    }

    public int getMobMaxMp() {
        if (ostats != null) {
            return ostats.mp;
        }
        return stats.getMp();
    }

    public int getMobExp() {
        if (ostats != null) {
            return ostats.exp;
        }
        return stats.getExp();
    }

    /*
     * 获得真正给角色的经验 计算了频道的经验倍率
     */
    public int getMobExpFromChannel() {
        return Math.min(Integer.MAX_VALUE, getMobExp() * ChannelServer.getInstance(map.getChannel()).getExpRate());
    }

    public void setOverrideStats(OverrideMonsterStats ostats) {
        this.ostats = new ChangeableStats(stats, ostats);
        this.hp = ostats.getHp();
        this.mp = ostats.getMp();
    }

    public void changeLevel(int newLevel) {
        changeLevel(newLevel, true);
    }

    public void changeLevel(int newLevel, boolean pqMob) {
        if (!stats.isChangeable()) {
            return;
        }
        this.ostats = new ChangeableStats(stats, newLevel, pqMob);
        this.hp = ostats.getHp();
        this.mp = ostats.getMp();
    }

    public void changeLevelmod(int newLevel, int multipler) {
        if (!stats.isChangeable()) {
            return;
        }
        this.ostats = new ChangeableStats(stats, newLevel, multipler);
        this.hp = ostats.getHp();
        this.mp = ostats.getMp();
    }

    public MapleMonster getSponge() {
        return sponge.get();
    }

    public boolean damage(MapleCharacter from, long damage, boolean updateAttackTime) {
        return damage(from, damage, updateAttackTime, 0);
    }

    public boolean damage(MapleCharacter from, long damage, boolean updateAttackTime, int lastSkill) {
        if (from == null || damage <= 0 || !isAlive()) {
            return false;
        }
        AttackerEntry attacker;
        if (from.getParty() != null) {
            attacker = new PartyAttackerEntry(from.getParty().getPartyId());
        } else {
            attacker = new SingleAttackerEntry(from);
        }
        boolean replaced = false;
        boolean killmob = false;
        for (AttackerEntry aentry : getAttackers()) {
            if (aentry != null && aentry.equals(attacker)) {
                attacker = aentry;
                replaced = true;
                break;
            }
        }
        if (!replaced) {
            attackers.add(attacker);
        }
        long rDamage = Math.max(0, Math.min(damage, hp));
        attacker.addDamage(from, rDamage, updateAttackTime);

        if (stats.getSelfD() != -1) {
            hp -= rDamage;
            if (hp > 0) {
                if (hp < stats.getSelfDHp()) { // HP is below the selfd level
                    map.killMonster(this, from, false, false, stats.getSelfD(), lastSkill);
                } else { // 显示怪物HP
                    for (AttackerEntry mattacker : getAttackers()) {
                        for (AttackingMapleCharacter cattacker : mattacker.getAttackers()) {
                            if (cattacker.getAttacker().getMap() == from.getMap()) { // current attacker is on the map of the monster
                                if (cattacker.getLastAttackTime() >= System.currentTimeMillis() - 4000) {
                                    cattacker.getAttacker().getClient().getSession().write(MobPacket.showMonsterHP(getObjectId(), getHPPercent()));
                                }
                            }
                        }
                    }
                }
            } else {
                map.killMonster(this, from, true, false, (byte) 1, lastSkill); //杀死怪物
                killmob = true;
            }
        } else {
            if (sponge.get() != null) {
                //显示 品克缤 和 黑龙的BOSS的血条
                if (sponge.get().hp > 0) { // If it's still alive, dont want double/triple rewards
                    // Sponge are always in the same map, so we can use this.map
                    // The only mob that uses sponge are PB/HT
                    sponge.get().hp -= rDamage;
                    if (sponge.get().hp <= 0) {
                        map.broadcastMessage(MobPacket.showBossHP(sponge.get().getId(), -1, sponge.get().getMobMaxHp()));
                        map.killMonster(sponge.get(), from, true, false, (byte) 1, lastSkill);
                    } else {
                        map.broadcastMessage(MobPacket.showBossHP(sponge.get()));
                    }
                }
            }
            if (hp > 0) {
                hp -= rDamage;
                if (eventInstance != null) {
                    eventInstance.monsterDamaged(from, this, (int) rDamage);
                } else {
                    EventInstanceManager em = from.getEventInstance();
                    if (em != null) {
                        em.monsterDamaged(from, this, (int) rDamage);
                    }
                }
                if (sponge.get() == null && hp > 0) {
                    switch (stats.getHPDisplayType()) {
                        case 0:
                            map.broadcastMessage(MobPacket.showBossHP(this), this.getTruePosition());
                            break;
                        case 1:
                            map.broadcastMessage(from, MobPacket.damageFriendlyMob(this, damage, true), false);
                            break;
                        case 2:
                            map.broadcastMessage(MobPacket.showMonsterHP(getObjectId(), getHPPercent()));
                            from.mulung_EnergyModify(true);
                            break;
                        case 3:
                            for (AttackerEntry mattacker : getAttackers()) {
                                if (mattacker != null) {
                                    for (AttackingMapleCharacter cattacker : mattacker.getAttackers()) {
                                        if (cattacker != null && cattacker.getAttacker().getMap() == from.getMap()) { // current attacker is on the map of the monster
                                            if (cattacker.getLastAttackTime() >= System.currentTimeMillis() - 4000) {
                                                cattacker.getAttacker().getClient().getSession().write(MobPacket.showMonsterHP(getObjectId(), getHPPercent()));
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                    }
                }
                if (hp <= 0) {
                    if (stats.getHPDisplayType() == 0) {
                        map.broadcastMessage(MobPacket.showBossHP(getId(), -1, getMobMaxHp()), this.getTruePosition());
                    }
                    from.beforeKillMonster(getObjectId(), lastSkill);
                    map.killMonster(this, from, true, false, (byte) 1, lastSkill); //杀死怪物
                    killmob = true;
                }
            }
        }
        startDropItemSchedule();
        return killmob;
    }

    public int getHPPercent() {
        return (int) Math.ceil((hp * 100.0) / getMobMaxHp());
    }

    public void heal(int hp, int mp, boolean broadcast) {
        long TotalHP = getHp() + hp;
        int TotalMP = getMp() + mp;
        if (TotalHP >= getMobMaxHp()) {
            setHp(getMobMaxHp());
        } else {
            setHp(TotalHP);
        }
        if (TotalMP >= getMp()) {
            setMp(getMp());
        } else {
            setMp(TotalMP);
        }
        if (broadcast) {
            map.broadcastMessage(MobPacket.healMonster(getObjectId(), hp));
        } else if (sponge.get() != null) {
            sponge.get().hp += hp;
        }
    }

    public void killed() {
        if (listener != null) {
            listener.monsterKilled();
        }
        listener = null;
    }

    private void giveExpToCharacter(MapleCharacter attacker, int exp, boolean highestDamage, int numExpSharers, int lastskillID) {
        if (highestDamage) {
            if (eventInstance != null) {
                eventInstance.monsterKilled(attacker, this);
            } else {
                EventInstanceManager em = attacker.getEventInstance();
                if (em != null) {
                    em.monsterKilled(attacker, this);
                }
            }
            highestDamageChar = attacker.getId();
        }
        if (exp > 0 && attacker.isAlive()) {
            MonsterStatusEffect ms = mobEffects.get(MonsterStatus.挑衅);
            if (ms != null) {
                exp += (int) (exp * (ms.getX() / 100.0));
            }
            if (attacker.hasDisease(MapleDisease.诅咒)) {
                exp /= 2;
            }
            Integer holySymbol = attacker.getBuffedValue(MapleBuffStat.神圣祈祷);
            if (holySymbol != null) {
                exp *= 1.0 + (holySymbol.doubleValue() / 100.0);
            }
            //经验倍数处理 上面处理的经验 * 角色的经验卡倍数 * 角色的经验BUFF * 服务器经验倍率
            exp = (int) Math.min(Integer.MAX_VALUE, exp * attacker.getEXPMod() * attacker.getStat().expBuff / 100.0 * ChannelServer.getInstance(map.getChannel()).getExpRate());
            //给角色倾向经验
            attacker.getTrait(MapleTraitType.charisma).addExp(stats.getCharismaEXP(), attacker);
            //给角色经验
            attacker.gainExpMonster(exp, true, highestDamage, numExpSharers, stats.isPartyBonus(), stats.getPartyBonusRate());
        }
        attacker.mobKilled(getId(), lastskillID); //角色击杀怪物数量计算
    }

    public int killBy(MapleCharacter killer, int lastSkill) {
        if (killed) {
            return 1;
        }
        killed = true;
        int totalBaseExp = getMobExp();
        AttackerEntry highest = null;
        long highdamage = 0;
        List<AttackerEntry> list = getAttackers();
        for (AttackerEntry attackEntry : list) {
            if (attackEntry != null && attackEntry.getDamage() > highdamage) {
                highest = attackEntry;
                highdamage = attackEntry.getDamage();
            }
        }
        int baseExp;
        for (AttackerEntry attackEntry : list) {
            if (attackEntry != null) {
                baseExp = (int) Math.ceil(totalBaseExp * ((double) attackEntry.getDamage() / getMobMaxHp()));
                attackEntry.killedMob(getMap(), baseExp, attackEntry == highest, lastSkill);
            }
        }
        MapleCharacter controll = controller.get();
        if (controll != null) { // this can/should only happen when a hidden gm attacks the monster
            controll.getClient().getSession().write(MobPacket.stopControllingMonster(getObjectId()));
            controll.stopControllingMonster(this);
        }
        int achievement = 0;
        switch (getId()) {
            case 9400121: //女老板
                achievement = 12;
                break;
            case 8500002: //帕普拉图斯
                achievement = 13;
                break;
            case 8510000: //皮亚奴斯
            case 8520000: //皮亚奴斯
                achievement = 14;
                break;
            default:
                break;
        }
        if (achievement != 0) {
            if (killer != null && killer.getParty() != null) {
                for (MaplePartyCharacter pChar : killer.getParty().getMembers()) {
                    MapleCharacter mpc = killer.getMap().getCharacterById(pChar.getId());
                    if (mpc != null) {
                        mpc.finishAchievement(achievement);
                    }
                }
            } else if (killer != null) {
                killer.finishAchievement(achievement);
            }
        }
        if (killer != null && isBoss()) {
            killer.finishAchievement(18);
        }
        //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "=============================================================", true);
        //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "杀死怪物 : " + getId() + " - " + stats.getName(), true);
        spawnRevives(getMap());
        if (eventInstance != null) {
            eventInstance.monsterDrop(killer, this);
        }
        if (eventInstance != null) {
            eventInstance.unregisterMonster(this);
            eventInstance = null;
        }
        if (killer != null && killer.getPyramidSubway() != null) {
            killer.getPyramidSubway().onKill(killer);
        }
        hp = 0;
        MapleMonster oldSponge = getSponge();
        sponge = new WeakReference<>(null);
        if (oldSponge != null && oldSponge.isAlive()) {
            boolean set = true;
            for (MapleMapObject mon : map.getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mon;
                if (mons.isAlive() && mons.getObjectId() != oldSponge.getObjectId() && mons.getStats().getLevel() > 1 && mons.getObjectId() != this.getObjectId() && (mons.getSponge() == oldSponge || mons.getLinkOid() == oldSponge.getObjectId())) { //sponge was this, please update
                    set = false;
                    break;
                }
            }
            if (set) { //all sponge monsters are dead, please kill off the sponge
                map.killMonster(oldSponge, killer, true, false, (byte) 1);
            }
        }

        reflectpack = null;
        nodepack = null;
        if (mobEffects.size() > 0) {
            List<MonsterStatus> statuses = new LinkedList<>(mobEffects.keySet());
            for (MonsterStatus ms : statuses) {
                cancelStatus(ms);
            }
            statuses.clear();
        }
        if (poisonEffects.size() > 0) {
            List<MonsterStatusEffect> ps = new LinkedList<>();
            poisonsLock.readLock().lock();
            try {
                ps.addAll(poisonEffects);
            } finally {
                poisonsLock.readLock().unlock();
            }
            for (MonsterStatusEffect p : ps) {
                cancelSingleStatus(p);
            }
            ps.clear();
        }

        //attackers.clear();
        cancelDropItem();
        int v1 = highestDamageChar;
        this.highestDamageChar = 0; //reset so we dont kill twice
        return v1;
    }

    public void spawnRevives(MapleMap map) {
        List<Integer> toSpawn = stats.getRevives();
        if (toSpawn == null || this.getLinkCID() > 0 || spawnRevivesDisabled) {
            //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "开始 : toSpawn == null 跳过", true);
            return;
        }
        MapleMonster spongy = null;
        long spongyHp = 0;
        //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "-----------------------------------------------", true);
        //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "开始 : " + getId() + " - " + stats.getName(), true);
        switch (getId()) {
            case 8820002: //女神雕像
            case 8820003: //贤者所罗门
            case 8820004: //贤者莱克斯
            case 8820005: //火鹰雕像
            case 8820006: //冰鹰雕像
            case 8820102: //混沌女神雕像
            case 8820103: //混沌之贤者所罗门
            case 8820104: //混沌之贤者莱克斯
            case 8820105: //混沌火鹰雕像
            case 8820106: //混沌冰鹰雕像
            case 8820115: //混沌之贤者所罗门
            case 8820116: //混沌之贤者莱克斯
            case 8820117: //混沌火鹰雕像
            case 8820118: //混沌冰鹰雕像
            case 8820213: //混沌之贤者所罗门
            case 8820214: //混沌之贤者所罗门
            case 8820215: //混沌之贤者莱克斯
            case 8820216: //混沌之贤者莱克斯
            case 8820217: //混沌火鹰雕像
            case 8820218: //混沌火鹰雕像
            case 8820219: //混沌火鹰雕像
            case 8820220: //混沌火鹰雕像
            case 8820221: //混沌冰鹰雕像
            case 8820222: //混沌冰鹰雕像
            case 8820223: //混沌冰鹰雕像
            case 8820224: //混沌冰鹰雕像
            case 8820225: //混沌女神雕像
            case 8820226: //混沌女神雕像
            case 8820227: //混沌女神雕像
            case 8840000: //班·雷昂
            case 6160003: //薛西斯
            case 8850011: //希纳斯
                //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "跳过 : " + getId() + " - " + stats.getName(), true);
                break;
            case 8810118: //进阶暗黑龙王
            case 8810119: //进阶暗黑龙王
            case 8810120: //进阶暗黑龙王
            case 8810121: //进阶暗黑龙王
                for (int i : toSpawn) {
                    MapleMonster mob = MapleLifeFactory.getMonster(i);
                    mob.setPosition(getTruePosition());
                    if (eventInstance != null) {
                        eventInstance.registerMonster(mob);
                    }
                    if (dropsDisabled()) {
                        mob.disableDrops();
                    }
                    switch (mob.getId()) {
                        case 8810119: //进阶暗黑龙王
                        case 8810120: //进阶暗黑龙王
                        case 8810121: //进阶暗黑龙王
                        case 8810122: //进阶暗黑龙王
                            spongy = mob;
                            break;
                    }
                }
                if (spongy != null && map.getMonsterById(spongy.getId()) == null) {
                    map.spawnMonster(spongy, -2);
                    for (MapleMapObject mon : map.getAllMonstersThreadsafe()) {
                        MapleMonster mons = (MapleMonster) mon;
                        if (mons.getObjectId() != spongy.getObjectId() && (mons.getSponge() == this || mons.getLinkOid() == this.getObjectId())) { //sponge was this, please update
                            mons.setSponge(spongy);
                        }
                    }
                }
                break;
            case 8820300: //混沌品克缤1阶段
            case 8820301: //混沌品克缤2阶段
            case 8820302: //混沌品克缤3阶段
            case 8820303: //混沌品克缤4阶段
                MapleMonster linkMob = MapleLifeFactory.getMonster(getId() - 190);
                if (linkMob != null) {
                    toSpawn = linkMob.getStats().getRevives();
                }
            case 8820108: //宝宝BOSS召唤用透明怪物
            case 8820109: //set0透明怪物
                List<MapleMonster> cs_mobs = new ArrayList<>();
                for (int i : toSpawn) {
                    MapleMonster mob = MapleLifeFactory.getMonster(i);
                    mob.setPosition(getTruePosition());
                    if (eventInstance != null) {
                        eventInstance.registerMonster(mob);
                    }
                    if (dropsDisabled()) {
                        mob.disableDrops();
                    }
                    switch (mob.getId()) {
                        case 8820109: //set0透明怪物
                        case 8820300: //混沌品克缤1阶段
                        case 8820301: //混沌品克缤2阶段
                        case 8820302: //混沌品克缤3阶段
                        case 8820303: //混沌品克缤4阶段
                        case 8820304: //混沌品克缤5阶段
                            spongy = mob;
                            //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : spongy : " + mob.getId() + " - " + mob.getStats().getName(), true);
                            break;
                        default:
                            if (mob.isFirstAttack()) {
                                spongyHp += mob.getMobMaxHp();
                            }
                            cs_mobs.add(mob);
                            //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : addMob : " + mob.getId() + " - " + mob.getStats().getName(), true);
                            break;
                    }
                }
                if (spongy != null && map.getMonsterById(spongy.getId()) == null) {
                    if (spongyHp > 0) {
                        spongy.setHp(spongyHp);
                        spongy.getStats().setHp(spongyHp);
                    }
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : spongyHp : " + spongyHp, true);
                    map.spawnMonster(spongy, -2);
                    for (MapleMonster i : cs_mobs) {
                        map.spawnMonster(i, -2);
                        i.setSponge(spongy);
                    }
                }
                break;
            case 8810026: //召唤暗黑龙王
            case 8810130: //召唤进阶暗黑龙王
            case 8820008: //宝宝BOSS召唤用透明怪物
            case 8820009: //set0透明怪物
            case 8820010: //时间的宠儿－品克缤
            case 8820011: //时间的宠儿－品克缤
            case 8820012: //时间的宠儿－品克缤
            case 8820013: //时间的宠儿－品克缤
                List<MapleMonster> mobs = new ArrayList<>();
                for (int i : toSpawn) {
                    MapleMonster mob = MapleLifeFactory.getMonster(i);
                    mob.setPosition(getTruePosition());
                    if (eventInstance != null) {
                        eventInstance.registerMonster(mob);
                    }
                    if (dropsDisabled()) {
                        mob.disableDrops();
                    }
                    switch (mob.getId()) {
                        case 8810018: //暗黑龙王的灵魂
                        case 8810118: //进阶暗黑龙王
                        case 8820009: //set0透明怪物
                        case 8820010: //时间的宠儿－品克缤1
                        case 8820011: //时间的宠儿－品克缤2
                        case 8820012: //时间的宠儿－品克缤3
                        case 8820013: //时间的宠儿－品克缤4
                        case 8820014: //时间的宠儿－品克缤5
                            spongy = mob;
                            //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : spongy : " + mob.getId() + " - " + mob.getStats().getName(), true);
                            break;
                        default:
                            mobs.add(mob);
                            //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : addMob : " + mob.getId() + " - " + mob.getStats().getName(), true);
                            break;
                    }
                }
                if (spongy != null && map.getMonsterById(spongy.getId()) == null) {
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第2次 : spongyHp : " + spongyHp, true);
                    map.spawnMonster(spongy, -2);
                    for (MapleMonster i : mobs) {
                        map.spawnMonster(i, -2);
                        i.setSponge(spongy);
                    }
                }
                break;
            case 8820304: //混沌品克缤
                MapleMonster linkMob_1 = MapleLifeFactory.getMonster(getId() - 190);
                if (linkMob_1 != null) {
                    toSpawn = linkMob_1.getStats().getRevives();
                }
            case 8820014: //时间的宠儿－品克缤
            case 8820101: //混沌品克缤
            case 8820200: //混沌品克缤
            case 8820201: //混沌品克缤
            case 8820202: //混沌品克缤
            case 8820203: //混沌品克缤
            case 8820204: //混沌品克缤
            case 8820205: //混沌品克缤
            case 8820206: //混沌品克缤
            case 8820207: //混沌品克缤
            case 8820208: //混沌品克缤
            case 8820209: //混沌品克缤
            case 8820210: //混沌品克缤
            case 8820211: {//混沌品克缤
                for (int i : toSpawn) {
                    MapleMonster mob = MapleLifeFactory.getMonster(i);
                    if (eventInstance != null) {
                        eventInstance.registerMonster(mob);
                    }
                    mob.setPosition(getTruePosition());
                    if (dropsDisabled()) {
                        mob.disableDrops();
                    }
                    map.spawnMonster(mob, -2);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第3次 : " + mob.getId() + " - " + mob.getStats().getName(), true);
                }
                break;
            }
            default:
                for (int i : toSpawn) {
                    MapleMonster mob = MapleLifeFactory.getMonster(i);
                    if (mob == null) {
                        continue;
                    }
                    if (eventInstance != null) {
                        eventInstance.registerMonster(mob);
                    }
                    mob.setPosition(getTruePosition());
                    if (dropsDisabled()) {
                        mob.disableDrops();
                    }
                    map.spawnRevives(mob, this.getObjectId());
//                    if (mob.getId() == 9300216) { //透明怪物
//                        map.broadcastMessage(MaplePacketCreator.playSound("Dojang/clear"));
//                        map.broadcastMessage(MaplePacketCreator.showEffect("dojang/end/clear"));
//                    }
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "第4次 : " + mob.getId() + " - " + mob.getStats().getName(), true);
                }
                break;
        }
    }

    public boolean isAlive() {
        return hp > 0;
    }

    public void setCarnivalTeam(byte team) {
        carnivalTeam = team;
    }

    public byte getCarnivalTeam() {
        return carnivalTeam;
    }

    public MapleCharacter getController() {
        return controller.get();
    }

    public void setController(MapleCharacter controller) {
        this.controller = new WeakReference<>(controller);
    }

    public boolean isAttackedBy(MapleCharacter chr) {
        for (AttackerEntry aentry : attackers) {
            if (aentry.contains(chr)) {
                return true;
            }
        }
        return false;
    }

    public void switchController(MapleCharacter newController, boolean immediateAggro) {
        MapleCharacter controllers = getController();
        if (controllers == newController) {
            return;
        }
        if (controllers != null) {
            controllers.stopControllingMonster(this);
            controllers.getClient().getSession().write(MobPacket.stopControllingMonster(getObjectId()));
        }
        newController.controlMonster(this, immediateAggro);
        setController(newController);
        if (immediateAggro) {
            setControllerHasAggro(true);
        }
        setControllerKnowsAboutAggro(false);
    }

    public void addListener(MonsterListener listener) {
        this.listener = listener;
    }

    public boolean isControllerHasAggro() {
        return controllerHasAggro;
    }

    public void setControllerHasAggro(boolean controllerHasAggro) {
        this.controllerHasAggro = controllerHasAggro;
    }

    public boolean isControllerKnowsAboutAggro() {
        if (this.fake) {
            return false;
        }
        return this.controllerKnowsAboutAggro;
    }

    public void setControllerKnowsAboutAggro(boolean controllerKnowsAboutAggro) {
        if (this.fake) {
            return;
        }
        this.controllerKnowsAboutAggro = controllerKnowsAboutAggro;
    }

    public void sendStatus(MapleClient client) {
        if (!ServerConfig.applyMonsterStatus) {
            return;
        }
        if (reflectpack != null) {
            client.getSession().write(reflectpack);
        }
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (!isAlive()) {
            return;
        }
        client.getSession().write(MobPacket.spawnMonster(this, fake && linkCID <= 0 ? -4 : -1, 0));
        sendStatus(client);
        if (map != null && !stats.isEscort() && client.getPlayer() != null && client.getPlayer().getTruePosition().distanceSq(getTruePosition()) <= GameConstants.maxViewRangeSq_Half()) {
            map.updateMonsterController(this);
        }
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        if (stats.isEscort() && getEventInstance() != null && lastNode >= 0) { //shammos
            map.resetShammos(client);
        } else {
            if (getController() != null && client.getPlayer() != null && client.getPlayer().getId() == getController().getId()) {
                client.getPlayer().stopControllingMonster(this);
                client.getSession().write(MobPacket.stopControllingMonster(getObjectId()));
                this.setController(null);
                this.setControllerHasAggro(false);
            }
            client.getSession().write(MobPacket.killMonster(getObjectId(), 0));
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();

        sb.append(stats.getName());
        sb.append("(");
        sb.append(getId());
        sb.append(") 等级:");
        sb.append(stats.getLevel());
        if (ostats != null) {
            sb.append("→");
            sb.append(ostats.level);
        }
        sb.append(" 坐标(X:");
        sb.append(getTruePosition().x);
        sb.append("/Y:");
        sb.append(getTruePosition().y);
        sb.append(") 信息: ");
        sb.append(getHp());
        sb.append("/");
        sb.append(getMobMaxHp());
        sb.append("Hp, ");
        sb.append(getMp());
        sb.append("/");
        sb.append(getMobMaxMp());
        sb.append("Mp, oid: ");
        sb.append(getObjectId());
        sb.append("||仇恨目标: ");
        MapleCharacter chr = controller.get();
        sb.append(chr != null ? chr.getName() : "无");
        return sb.toString();
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.MONSTER;
    }

    public EventInstanceManager getEventInstance() {
        return eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public boolean isMobile() {
        return this.stats.isMobile();
    }

    /*
     * 获取怪物BUFF状态的 技能ID
     */
    public int getStatusSourceID(MonsterStatus status) {
        if (status == MonsterStatus.持续伤害) {
            poisonsLock.readLock().lock();
            try {
                for (MonsterStatusEffect ps : poisonEffects) {
                    if (ps != null) {
                        return ps.getSkill();
                    }
                }
                return -1;
            } finally {
                poisonsLock.readLock().unlock();
            }
        }
        MonsterStatusEffect effect = mobEffects.get(status);
        if (effect != null) {
            return effect.getSkill();
        }
        return -1;
    }

    public ElementalEffectiveness getEffectiveness(Element e) {
        if (mobEffects.size() > 0 && mobEffects.containsKey(MonsterStatus.巫毒)) {
            return ElementalEffectiveness.正常;
        }
        return stats.getEffectiveness(e);
    }

    /*
     * 玩家给怪物上BUFF
     */
    public void applyStatus(MapleCharacter from, MonsterStatusEffect status, boolean poison, long duration, boolean checkboss, MapleStatEffect effect) {
        if (!isAlive() || getLinkCID() > 0 || !ServerConfig.applyMonsterStatus) {
            return;
        }
        Skill skilz = SkillFactory.getSkill(status.getSkill());
        if (skilz != null) {
            switch (stats.getEffectiveness(skilz.getElement())) {
                case 免疫:
                case 增强:
                    return;
                case 正常:
                case 虚弱:
                    break;
                default:
                    return;
            }
        }
        // compos don't have an elemental (they have 2 - so we have to hack here...)
        int statusSkill = status.getSkill();
        switch (statusSkill) {
            case 2111006: { //火凤球 - 用火焰恶魔的火凤球同时攻击多个敌人。对象在一定时间内受到持续伤害。
                switch (stats.getEffectiveness(Element.毒)) {
                    case 免疫:
                    case 增强:
                        return;
                }
                break;
            }
            case 2211006: { //冰凤球 - 用冰恶魔的冰碎片同时攻击多个敌人，使其冻结。对象在一定时间内受到持续伤害。
                switch (stats.getEffectiveness(Element.冰)) {
                    case 免疫:
                    case 增强:
                        return;
                }
                break;
            }
            case 隐士.武器用毒液: //武器用毒液 - 永久性地在拳套上涂毒。有一定几率使对象中毒，持续受到毒素伤害。中毒效果无法重复，对象的HP不会下降到1以下。
            case 侠盗.武器用毒液:
            case 双刀.武器用毒液:
            case 隐士.致命毒液: //致命毒液 - 永久性地提高武器用毒液的中毒概率和毒素伤害，增加毒素重叠次数。
            case 侠盗.致命毒液:
            case 双刀.致命毒液: {
                switch (stats.getEffectiveness(Element.毒)) {
                    case 免疫:
                    case 增强:
                        return;
                }
                break;
            }
        }
        MonsterStatus stat = status.getStati();
        if (stats.isNoDoom() && stat == MonsterStatus.巫毒) {
            return;
        }
        if (isBoss()) {
            if (stat == MonsterStatus.眩晕 || stat == MonsterStatus.速度) {
                return;
            }
            if (checkboss && stat != (MonsterStatus.物攻) && stat != (MonsterStatus.持续伤害) && stat != (MonsterStatus.恐慌) && stat != (MonsterStatus.魔击无效)) {
                return;
            }
            //hack: don't magic crash cygnus boss 希纳斯
            if (getId() == 8850011 && stat == MonsterStatus.魔击无效) {
                return;
            }
        }
        if (stats.isFriendly() || isFake()) {
            if (stat == MonsterStatus.眩晕 || stat == MonsterStatus.速度 || stat == MonsterStatus.持续伤害) {
                return;
            }
        }
        if (effect == null) {
            return;
        }
        if (mobEffects.containsKey(stat)) {
            cancelStatus(stat);
        }
        if (stat == MonsterStatus.持续伤害) {
            poisonsLock.readLock().lock();
            try {
                for (MonsterStatusEffect mse : poisonEffects) {
                    if (mse != null && (mse.getSkill() == effect.getSourceId() || mse.getSkill() == GameConstants.getLinkedAttackSkill(effect.getSourceId()) || GameConstants.getLinkedAttackSkill(mse.getSkill()) == effect.getSourceId())) {
                        return;
                    }
                }
            } finally {
                poisonsLock.readLock().unlock();
            }
        }
        if (poison && getHp() > 1) {
            if (statusSkill == 火毒.致命毒雾) {
                duration = effect.getDOTTime() * 1000;
            } else {
                duration = Math.max(duration, effect.getDOTTime() * 1000);
            }
            //System.out.println("中毒时间 - 默认: " + duration + " 技能: " + eff.getDOTTime() * 1000);
        }
        duration += from.getStat().dotTime * 1000; //有些被动技能增加 延长时间
        //System.out.println("中毒时间 - 被动加成: " + from.getStat().dotTime * 1000 + " 最终时间: " + duration);
        if (duration >= 60 * 1000) { //如果大于60秒 时间设置为 10秒中毒持续时间
            duration = 10 * 1000;
        }
        long aniTime = duration;
        status.setCancelTask(aniTime);
        if (poison && getHp() > 1) {
            status.setDotTime(duration); //设置中毒的持续时间
            int poisonDot = from.getStat().dot;
            int damageIncrease = from.getStat().getDamageIncrease(effect.getSourceId());
            if (damageIncrease > effect.getDOT()) {
                poisonDot += damageIncrease;
            } else {
                poisonDot += effect.getDOT();
            }
            if (from.isAdmin()) {
                from.dropSpouseMessage(0x0A, "开始处理中毒效果 - 技能ID: " + effect.getSourceId());
                from.dropSpouseMessage(0x0A, "中毒伤害加成 - 技能: " + effect.getDOT() + " 被动: " + from.getStat().dot + " 被动加成: " + damageIncrease + " 最终加成: " + poisonDot);
            }
            status.setValue(status.getStati(), (int) (poisonDot * from.getStat().getCurrentMaxBaseDamage() / 100.0));
            int poisonDamage = (int) (aniTime / 1000 * status.getX() / 2);
            if (from.isAdmin()) {
                from.dropSpouseMessage(0x0A, "中毒伤害 - 中毒伤害: " + poisonDamage + " 持续时间: " + aniTime + " 持续掉血: " + status.getX());
            }
            status.setPoisonSchedule(poisonDamage, from);
            if (poisonDamage > 0) {
                if (poisonDamage >= hp) {
                    poisonDamage = (int) (hp - 1);
                }
                damage(from, poisonDamage, false);
            }
        } else if (statusSkill == 隐士.影网术) {
            status.setValue(status.getStati(), (int) (getMobMaxHp() / 50.0 + 0.999));
            status.setPoisonSchedule(status.getX(), from);
        }
        MapleCharacter con = getController();
        if (stat == MonsterStatus.持续伤害) {
            poisonsLock.writeLock().lock();
            try {
                poisonEffects.add(status);
                if (con != null) {
                    map.broadcastMessage(con, MobPacket.applyMonsterPoisonStatus(this, poisonEffects), getTruePosition());
                    con.getClient().getSession().write(MobPacket.applyMonsterPoisonStatus(this, poisonEffects));
                } else {
                    map.broadcastMessage(MobPacket.applyMonsterPoisonStatus(this, poisonEffects), getTruePosition());
                }
            } finally {
                poisonsLock.writeLock().unlock();
            }
        } else {
            mobEffects.put(stat, status);
            if (con != null) {
                map.broadcastMessage(con, MobPacket.applyMonsterStatus(this, status), getTruePosition());
                con.getClient().getSession().write(MobPacket.applyMonsterStatus(this, status));
            } else {
                map.broadcastMessage(MobPacket.applyMonsterStatus(this, status), getTruePosition());
            }
        }
    }

    /*
     * 取消怪物自己技能的BUFF状态
     */
    public void dispelSkill(MobSkill skillId) {
        List<MonsterStatus> toCancel = new ArrayList<>();
        for (Entry<MonsterStatus, MonsterStatusEffect> effects : mobEffects.entrySet()) {
            MonsterStatusEffect mse = effects.getValue();
            if (mse.getMobSkill() != null && mse.getMobSkill().getSkillId() == skillId.getSkillId()) { //not checking for level.
                toCancel.add(effects.getKey());
            }
        }
        for (MonsterStatus stat : toCancel) {
            cancelStatus(stat);
        }
    }

    /*
     * 怪物自己加BUFF状态
     */
    public void applyMonsterBuff(Map<MonsterStatus, Integer> effect, int skillId, long duration, MobSkill skill, List<Integer> reflection) {
        if (!ServerConfig.applyMonsterStatus) {
            return;
        }

        MapleCharacter con = getController();
        if (reflection.size() > 0) { //怪物开启反射效果的状态BUFF
            this.reflectpack = MobPacket.applyMonsterStatus(getObjectId(), effect, reflection, skill);
            if (con != null) {
                map.broadcastMessage(con, reflectpack, getTruePosition());
                con.getClient().getSession().write(this.reflectpack);
            } else {
                map.broadcastMessage(reflectpack, getTruePosition());
            }
        } else { //其他普通的BUFF状态
            map.broadcastMessage(MobPacket.applyMonsterStatus(getObjectId(), effect, reflection, skill), getTruePosition());
//            for (Entry<MonsterStatus, Integer> status : effect.entrySet()) {
//                if (con != null) {
//                    map.broadcastMessage(con, MobPacket.applyMonsterStatus(getObjectId(), status.getKey(), status.getValue(), skill), getTruePosition());
//                    //con.getClient().getSession().write(MobPacket.applyMonsterStatus(getObjectId(), status.getKey(), status.getValue(), skill));
//                } else {
//                    //map.broadcastMessage(MobPacket.applyMonsterStatus(getObjectId(), status.getKey(), status.getValue(), skill), getTruePosition());
//                }
//            }
        }
    }

    public void setTempEffectiveness(final Element e, final long milli) {
        stats.setEffectiveness(e, ElementalEffectiveness.虚弱);
        EtcTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                stats.removeEffectiveness(e);
            }
        }, milli);
    }

    public boolean isBuffed(MonsterStatus status) {
        if (status == MonsterStatus.持续伤害) {
            return poisonEffects.size() > 0 || mobEffects.containsKey(status);
        }
        return mobEffects.containsKey(status);
    }

    public MonsterStatusEffect getBuff(MonsterStatus status) {
        return mobEffects.get(status);
    }

    public int getStatiSize() {
        return mobEffects.size();//+ (poisonEffects.size() > 0 ? 1 : 0);
    }

    public ArrayList<MonsterStatusEffect> getAllBuffs() {
        ArrayList<MonsterStatusEffect> ret = new ArrayList<>();
        for (MonsterStatusEffect e : mobEffects.values()) {
            ret.add(e);
        }
        poisonsLock.readLock().lock();
        try {
            for (MonsterStatusEffect e : poisonEffects) {
                ret.add(e);
            }
        } finally {
            poisonsLock.readLock().unlock();
        }
        return ret;
    }

    public void setFake(boolean fake) {
        this.fake = fake;
    }

    public boolean isFake() {
        return fake;
    }

    public MapleMap getMap() {
        return map;
    }

    public List<Pair<Integer, Integer>> getSkills() {
        return stats.getSkills();
    }

    public boolean hasSkill(int skillId, int level) {
        return stats.hasSkill(skillId, level);
    }

    public boolean canUseSkill(MobSkill toUse) {
        if (toUse == null) {
            return false;
        }
        for (Pair<Integer, Integer> skill : usedSkills) {
            if (skill.getLeft() == toUse.getSkillId() && skill.getRight() == toUse.getSkillLevel()) {
                return false;
            }
        }
        if (toUse.getLimit() > 0) {
            if (this.skillsUsed.containsKey(new Pair<>(toUse.getSkillId(), toUse.getSkillLevel()))) {
                int times = this.skillsUsed.get(new Pair<>(toUse.getSkillId(), toUse.getSkillLevel()));
                if (times >= toUse.getLimit()) {
                    return false;
                }
            }
        }
        return true;
    }

    public void usedSkill(final int skillId, final int level, long cooltime) {
        this.usedSkills.add(new Pair<>(skillId, level));
        if (this.skillsUsed.containsKey(new Pair<>(skillId, level))) {
            int times = this.skillsUsed.get(new Pair<>(skillId, level)) + 1;
            this.skillsUsed.remove(new Pair<>(skillId, level));
            this.skillsUsed.put(new Pair<>(skillId, level), times);
        } else {
            this.skillsUsed.put(new Pair<>(skillId, level), 1);
        }
        final MapleMonster mons = this;
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                mons.clearSkill(skillId, level);
            }
        }, cooltime);
    }

    public void clearSkill(int skillId, int level) {
        int index = -1;
        for (Pair<Integer, Integer> skill : usedSkills) {
            if (skill.getLeft() == skillId && skill.getRight() == level) {
                index = usedSkills.indexOf(skill);
                break;
            }
        }
        if (index != -1) {
            usedSkills.remove(index);
        }
    }

    public byte getNoSkills() {
        return stats.getNoSkills();
    }

    public boolean isFirstAttack() {
        return stats.isFirstAttack();
    }

    public int getBuffToGive() {
        return stats.getBuffToGive();
    }

    /*
     * 处理怪物中毒效果
     */
    public void doPoison(MonsterStatusEffect status, WeakReference<MapleCharacter> weakChr) {

        if (weakChr == null) {
            return;
        }
        long damage = status.getPoisonSchedule();
        boolean shadowWeb = status.getSkill() == 隐士.影网术;
        MapleCharacter chr = weakChr.get();
        boolean cancel = damage <= 0 || chr == null || chr.getMapId() != map.getId();
        if (damage >= hp) {
            damage = hp - 1;
            cancel = !shadowWeb || cancel;
        }
        if (!cancel) {
            damage(chr, damage, false);
            if (shadowWeb) {
                map.broadcastMessage(MobPacket.damageMonster(getObjectId(), damage), getTruePosition());
            }
        }
    }

    public ConcurrentEnumMap<MonsterStatus, MonsterStatusEffect> getStati() {
        return mobEffects;
    }

    public void addEmpty() {
        for (MonsterStatus stat : MonsterStatus.values()) {
            if (stat.isEmpty()) {
                //mobEffects.put(stat, new MonsterStatusEffect(stat, 0, 0, null, false));
            }
        }
    }

    public int getStolen() {
        return stolen;
    }

    public void setStolen(int s) {
        this.stolen = s;
    }

    /*
     * 处理刀飞神通术对怪物的效果
     */
    public void handleSteal(MapleCharacter chr) {
        double showdown = 100.0;
        MonsterStatusEffect mse = getBuff(MonsterStatus.挑衅);
        if (mse != null) {
            showdown += mse.getX();
        }
        Skill steal = SkillFactory.getSkill(侠盗.神通术); //神通术
        int level = chr.getTotalSkillLevel(steal), chServerrate = ChannelServer.getInstance(chr.getClient().getChannel()).getDropRate();
        if (level > 0 && !isBoss() && stolen == -1 && steal.getEffect(level).makeChanceResult()) {
            MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
            List<MonsterDropEntry> de = mi.retrieveDrop(getId());
            if (de == null) {
                stolen = 0;
                return;
            }
            List<MonsterDropEntry> dropEntry = new ArrayList<>(de);
            Collections.shuffle(dropEntry);
            Item idrop;
            for (MonsterDropEntry d : dropEntry) { //set to 4x rate atm, 40% chance + 10x
                if (d.itemId > 0 && d.questid == 0 && d.itemId / 10000 != 238 && Randomizer.nextInt(999999) < (int) (10 * d.chance * chServerrate * chr.getDropMod() * (chr.getStat().getDropBuff() / 100.0) * (showdown / 100.0))) { //kinda op
                    if (ItemConstants.getInventoryType(d.itemId) == MapleInventoryType.EQUIP) {
                        Equip eq = (Equip) MapleItemInformationProvider.getInstance().getEquipById(d.itemId);
                        idrop = MapleItemInformationProvider.getInstance().randomizeStats(eq);
                    } else {
                        idrop = new Item(d.itemId, (byte) 0, (short) (d.Maximum != 1 ? Randomizer.nextInt(d.Maximum - d.Minimum) + d.Minimum : 1), (byte) 0);
                    }
                    stolen = d.itemId;
                    map.spawnMobDrop(idrop, map.calcDropPos(getPosition(), getTruePosition()), this, chr, (byte) 0, (short) 0);
                    break;
                }
            }
        } else {
            stolen = 0; //failed once, may not go again
        }
    }

    /*
     * 取消怪物BUFF状态
     */
    public void cancelStatus(MonsterStatus stat) {
        if (stat == MonsterStatus.空白BUFF || stat == MonsterStatus.召唤怪物) {
            return;
        }
        MonsterStatusEffect mse = mobEffects.get(stat);
        if (mse == null || !isAlive()) {
            return;
        }
        if (mse.isReflect()) {
            reflectpack = null;
        }
        mse.cancelPoisonSchedule(this);
        MapleCharacter con = getController();
        if (con != null) {
            map.broadcastMessage(con, MobPacket.cancelMonsterStatus(getObjectId(), stat), getTruePosition());
            con.getClient().getSession().write(MobPacket.cancelMonsterStatus(getObjectId(), stat));
        } else {
            map.broadcastMessage(MobPacket.cancelMonsterStatus(getObjectId(), stat), getTruePosition());
        }
        mobEffects.remove(stat);
    }

    /*
     * 取消单个的怪物BUFF状态
     */
    public void cancelSingleStatus(MonsterStatusEffect stat) {
        if (stat == null || stat.getStati() == MonsterStatus.空白BUFF || stat.getStati() == MonsterStatus.召唤怪物 || !isAlive()) {
            return;
        }
        if (stat.getStati() != MonsterStatus.持续伤害) {
            cancelStatus(stat.getStati());
            return;
        }
        poisonsLock.writeLock().lock();
        try {
            if (!poisonEffects.contains(stat)) {
                return;
            }
            poisonEffects.remove(stat);
            if (stat.isReflect()) {
                reflectpack = null;
            }

            MapleCharacter con = getController();
            if (con != null) {
                map.broadcastMessage(con, MobPacket.cancelMonsterPoisonStatus(this.getObjectId(), stat), getTruePosition());
                con.getClient().getSession().write(MobPacket.cancelMonsterPoisonStatus(this.getObjectId(), stat));
            } else {
                map.broadcastMessage(MobPacket.cancelMonsterPoisonStatus(this.getObjectId(), stat), getTruePosition());
            }
            stat.cancelPoisonSchedule(this);
        } finally {
            poisonsLock.writeLock().unlock();
        }
    }

    private static class AttackingMapleCharacter {

        private MapleCharacter attacker;
        private long lastAttackTime;

        public AttackingMapleCharacter(MapleCharacter attacker, long lastAttackTime) {
            super();
            this.attacker = attacker;
            this.lastAttackTime = lastAttackTime;
        }

        public long getLastAttackTime() {
            return lastAttackTime;
        }

        //        public void setLastAttackTime(long lastAttackTime) {
//            this.lastAttackTime = lastAttackTime;
//        }
        public MapleCharacter getAttacker() {
            return attacker;
        }
    }

    private interface AttackerEntry {

        List<AttackingMapleCharacter> getAttackers();

        void addDamage(MapleCharacter from, long damage, boolean updateAttackTime);

        long getDamage();

        boolean contains(MapleCharacter chr);

        void killedMob(MapleMap map, int baseExp, boolean mostDamage, int lastSkill);
    }

    private final class SingleAttackerEntry implements AttackerEntry {

        private long damage = 0;
        private int chrid;
        private long lastAttackTime;

        public SingleAttackerEntry(MapleCharacter from) {
            this.chrid = from.getId();
        }

        @Override
        public void addDamage(MapleCharacter from, long damage, boolean updateAttackTime) {
            if (chrid == from.getId()) {
                this.damage += damage;
                if (updateAttackTime) {
                    lastAttackTime = System.currentTimeMillis();
                }
            }
        }

        @Override
        public List<AttackingMapleCharacter> getAttackers() {
            MapleCharacter chr = map.getCharacterById(chrid);
            if (chr != null) {
                return Collections.singletonList(new AttackingMapleCharacter(chr, lastAttackTime));
            } else {
                return Collections.emptyList();
            }
        }

        @Override
        public boolean contains(MapleCharacter chr) {
            return chrid == chr.getId();
        }

        @Override
        public long getDamage() {
            return damage;
        }

        @Override
        public void killedMob(MapleMap map, int baseExp, boolean mostDamage, int lastSkill) {
            MapleCharacter chr = map.getCharacterById(chrid);
            if (chr != null && chr.isAlive()) {
                giveExpToCharacter(chr, baseExp, mostDamage, 1, lastSkill);
            }
        }

        @Override
        public int hashCode() {
            return chrid;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null) {
                return false;
            }
            if (getClass() != obj.getClass()) {
                return false;
            }
            SingleAttackerEntry other = (SingleAttackerEntry) obj;
            return chrid == other.chrid;
        }
    }

    private static final class OnePartyAttacker {

        public MapleParty lastKnownParty;
        public long damage;
        public long lastAttackTime;

        public OnePartyAttacker(MapleParty lastKnownParty, long damage) {
            super();
            this.lastKnownParty = lastKnownParty;
            this.damage = damage;
            this.lastAttackTime = System.currentTimeMillis();
        }
    }

    private class PartyAttackerEntry implements AttackerEntry {

        private long totDamage = 0;
        private Map<Integer, OnePartyAttacker> attackers = new HashMap<>(6);
        private int partyid;

        public PartyAttackerEntry(int partyid) {
            this.partyid = partyid;
        }

        @Override
        public List<AttackingMapleCharacter> getAttackers() {
            List<AttackingMapleCharacter> ret = new ArrayList<>(attackers.size());
            for (Entry<Integer, OnePartyAttacker> entry : attackers.entrySet()) {
                MapleCharacter chr = map.getCharacterById(entry.getKey());
                if (chr != null) {
                    ret.add(new AttackingMapleCharacter(chr, entry.getValue().lastAttackTime));
                }
            }
            return ret;
        }

        private Map<MapleCharacter, OnePartyAttacker> resolveAttackers() {
            Map<MapleCharacter, OnePartyAttacker> ret = new HashMap<>(attackers.size());
            for (Entry<Integer, OnePartyAttacker> aentry : attackers.entrySet()) {
                MapleCharacter chr = map.getCharacterById(aentry.getKey());
                if (chr != null) {
                    ret.put(chr, aentry.getValue());
                }
            }
            return ret;
        }

        @Override
        public boolean contains(MapleCharacter chr) {
            return attackers.containsKey(chr.getId());
        }

        @Override
        public long getDamage() {
            return totDamage;
        }

        @Override
        public void addDamage(MapleCharacter from, long damage, boolean updateAttackTime) {
            OnePartyAttacker oldPartyAttacker = attackers.get(from.getId());
            if (oldPartyAttacker != null) {
                oldPartyAttacker.damage += damage;
                oldPartyAttacker.lastKnownParty = from.getParty();
                if (updateAttackTime) {
                    oldPartyAttacker.lastAttackTime = System.currentTimeMillis();
                }
            } else {
                // TODO actually this causes wrong behaviour when the party changes between attacks
                // only the last setup will get exp - but otherwise we'd have to store the full party
                // constellation for every attack/everytime it changes, might be wanted/needed in the
                // future but not now
                OnePartyAttacker onePartyAttacker = new OnePartyAttacker(from.getParty(), damage);
                attackers.put(from.getId(), onePartyAttacker);
                if (!updateAttackTime) {
                    onePartyAttacker.lastAttackTime = 0;
                }
            }
            totDamage += damage;
        }

        @Override
        public void killedMob(MapleMap map, int baseExp, boolean mostDamage, int lastSkill) {
            MapleCharacter pchr, highest = null;
            long iDamage, highestDamage = 0;
            MapleParty party;
            double addedPartyLevel, innerBaseExp, expFraction;
            List<MapleCharacter> expApplicable;
            Map<MapleCharacter, Integer> expMap = new HashMap<>(6);
            //开始处理经验
            for (Entry<MapleCharacter, OnePartyAttacker> attacker : resolveAttackers().entrySet()) {
                party = attacker.getValue().lastKnownParty;
                addedPartyLevel = 0;
                expApplicable = new ArrayList<>();
                for (MaplePartyCharacter partychar : party.getMembers()) {
                    if (attacker.getKey().getLevel() - partychar.getLevel() <= 5 || stats.getLevel() - partychar.getLevel() <= 5) {
                        pchr = map.getCharacterById(partychar.getId());
                        if (pchr != null && pchr.isAlive() && pchr.getMap() == map) {
                            expApplicable.add(pchr);
                            addedPartyLevel += pchr.getLevel();
                        }
                    }
                }
                double expBonus = 1.0;
                if (expApplicable.size() > 1) {
                    expBonus = 1.10 + 0.05 * expApplicable.size();
                    addedPartyLevel /= expApplicable.size();
                }
                iDamage = attacker.getValue().damage;
                if (iDamage > highestDamage) {
                    highest = attacker.getKey();
                    highestDamage = iDamage;
                }
                innerBaseExp = baseExp * ((double) iDamage / totDamage);
                expFraction = (innerBaseExp * expBonus) / (expApplicable.size() + 1);

                for (MapleCharacter expReceiver : expApplicable) {
                    Integer oexp = expMap.get(expReceiver);
                    int iexp;
                    if (oexp == null) {
                        iexp = 0;
                    } else {
                        iexp = oexp.intValue();
                    }
                    double expWeight = (expReceiver == attacker.getKey() ? 2.0 : 1.0);
                    double levelMod = expReceiver.getLevel() / addedPartyLevel;
                    if (levelMod > 1.0 || attackers.containsKey(expReceiver.getId())) {
                        levelMod = 1.0;
                    }
                    iexp += (int) Math.round(expFraction * expWeight * levelMod);
                    expMap.put(expReceiver, iexp);
                }
            }
            for (Entry<MapleCharacter, Integer> expReceiver : expMap.entrySet()) {
                giveExpToCharacter(expReceiver.getKey(), expReceiver.getValue(), mostDamage && expReceiver.getKey() == highest, expMap.size(), lastSkill);
            }
        }

        @Override
        public int hashCode() {
            int prime = 31;
            int result = 1;
            result = prime * result + partyid;
            return result;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null) {
                return false;
            }
            if (getClass() != obj.getClass()) {
                return false;
            }
            PartyAttackerEntry other = (PartyAttackerEntry) obj;
            return partyid == other.partyid;
        }
    }

    public int getLinkOid() {
        return linkoid;
    }

    public void setLinkOid(int lo) {
        this.linkoid = lo;
    }

    public void setLastNode(int lastNode) {
        this.lastNode = lastNode;
    }

    public int getLastNode() {
        return lastNode;
    }

    public void cancelDropItem() {
        lastDropTime = 0;
    }

    public void startDropItemSchedule() {
        cancelDropItem();
        if (stats.getDropItemPeriod() <= 0 || !isAlive()) {
            return;
        }
        shouldDropItem = false;
        lastDropTime = System.currentTimeMillis();
    }

    public boolean shouldDrop(long now) {
        return lastDropTime > 0 && lastDropTime + (stats.getDropItemPeriod() * 1000) < now;
    }

    public void doDropItem(long now) {
        int itemId;
        switch (getId()) {
            case 9300061: //月妙
                itemId = 4001101; //月妙的年糕
                break;
            default: //until we find out ... what other mobs use this and how to get the ITEMID
                cancelDropItem();
                return;
        }
        if (isAlive() && map != null) {
            if (shouldDropItem) {
                map.spawnAutoDrop(itemId, getTruePosition());
            } else {
                shouldDropItem = true;
            }
        }
        lastDropTime = now;
    }

    public byte[] getNodePacket() {
        return nodepack;
    }

    public void setNodePacket(byte[] np) {
        this.nodepack = np;
    }

    public void registerKill(long next) {
        this.nextKill = System.currentTimeMillis() + next;
    }

    public boolean shouldKill(long now) {
        return nextKill > 0 && now > nextKill;
    }

    public int getLinkCID() {
        return linkCID;
    }

    public void setLinkCID(int lc) {
        this.linkCID = lc;
        if (lc > 0) {
            //mobEffects.put(MonsterStatus.心灵控制, new MonsterStatusEffect(MonsterStatus.心灵控制, 60000, 30001062, null, false));
        }
    }

    public int getMobFH() {
        MapleFoothold fh = getMap().getFootholds().findBelow(getTruePosition(), true);
        if (fh != null) {
            return fh.getId();
        }
        return 0;
    }

    /**
     * *
     * 获取怪物Buff的列表(用于进行排列)
     *
     * @param mobEffect
     * @return
     */
    public ConcurrentEnumMap<MonsterStatus, MonsterStatusEffect> ArrayMonsterStatus(ConcurrentEnumMap<MonsterStatus, MonsterStatusEffect> mobEffect) {
        ConcurrentEnumMap<MonsterStatus, MonsterStatusEffect> mList = new ConcurrentEnumMap<>(MonsterStatus.class);//new LinkedList<MonsterStatus>();
        for (Entry<MonsterStatus, MonsterStatusEffect> status : mobEffect.entrySet()) {
            mList.put(status.getKey(), status.getValue());//.add(status);
        }

        return mList;
    }

    /*
     * 给怪物单个的BUFF状态
     */
    public void applyStatus(MonsterStatusEffect status) {
        if (mobEffects.containsKey(status.getStati())) {
            cancelStatus(status.getStati());
        }
        mobEffects.put(status.getStati(), status);
        map.broadcastMessage(MobPacket.applyMonsterStatus(this, status), getTruePosition());
    }
}
