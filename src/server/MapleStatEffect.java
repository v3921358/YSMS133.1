package server;//主动BUFF加点属性

import client.*;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.*;
import handling.channel.ChannelServer;
import handling.world.party.MaplePartyCharacter;
import org.apache.log4j.Logger;
import provider.MapleData;
import provider.MapleDataTool;
import provider.MapleDataType;
import server.MapleCarnivalFactory.MCSkill;
import server.Timer.BuffTimer;
import server.life.MapleMonster;
import server.maps.*;
import server.skill.MapleForeignBuffSkill;
import server.skill.MapleForeignBuffStat;
import tools.*;
import tools.packet.BuffPacket;
import tools.packet.EffectPacket;

import java.awt.*;
import java.io.Serializable;
import java.lang.ref.WeakReference;
import java.util.*;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;

public class MapleStatEffect implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    private static final Logger log = Logger.getLogger(MapleStatEffect.class);
    private Map<MapleStatInfo, Integer> info;
    private Map<MapleTraitType, Integer> traits;
    private boolean overTime, skill, partyBuff = true;
    private boolean notRemoved; //不能取消的BUFF
    private boolean repeatEffect; //自动重复使用的BUFF
    private boolean refreshstyle = false;// 是否需要刷新外观到其他玩家
    private MapleForeignBuffSkill foreign;
    private ArrayList<Pair<MapleBuffStat, Integer>> statups;
    private ArrayList<Pair<Integer, Integer>> availableMap;
    private EnumMap<MonsterStatus, Integer> monsterStatus;
    private Point lt, rb;
    private byte level;
    //private List<Pair<Integer, Integer>> randomMorph;
    private List<MapleDisease> cureDebuffs;
    private List<Integer> petsCanConsume, familiars, randomPickup;
    private List<Triple<Integer, Integer, Integer>> rewardItem;
    private byte slotCount, slotPerLine; //矿(药)背包道具需要
    private byte expR, familiarTarget, recipeUseCount, recipeValidDay, reqSkillLevel, effectedOnAlly, effectedOnEnemy, type, preventslip, immortal, bs;
    private short ignoreMob, mesoR, thaw, fatigueChange, lifeId, imhp, immp, inflation, useLevel, indiePdd, indieMdd, mobSkill, mobSkillLevel; // incPVPdamage, 
    private double hpR, mpR;
    private int sourceid, recipe, moveTo, moneyCon, morphId = 0, expinc, exp, consumeOnPickup, charColor, interval, rewardMeso, totalprob, cosmetic;
    private int expBuff, itemup, mesoup, cashup, berserk, illusion, booster, berserk2, cp, nuffSkill;
    private boolean ruleOn;

    /*
     * 加载技能的BUFF状态
     */
    public static MapleStatEffect loadSkillEffectFromData(MapleData source, int skillid, boolean overtime, int level, String variables, boolean notRemoved) {
        return loadFromData(source, skillid, true, overtime, level, variables, notRemoved);
    }

    /*
     * 加载道具的BUFF状态
     */
    public static MapleStatEffect loadItemEffectFromData(MapleData source, int itemid) {
        return loadFromData(source, itemid, false, false, 1, null, false);
    }

    /*
     * 添加一些常用但BUFF的参数不为0的BUFF状态信息
     */
    private static void addBuffStatPairToListIfNotZero(List<Pair<MapleBuffStat, Integer>> list, MapleBuffStat buffstat, Integer val, int id, int level) {
        if (val != 0) {
            list.add(new Pair<>(buffstat, val));
            //将部分Buff技能获取出来!
            if (buffstat.isShow() && level == 1) {
                FileoutputUtil.log("log\\技能的错误.log", "找到技能或者道具ID:" + id + " Val:" + buffstat.name());
            }
        }

    }

    public static int parseEval(String data, int level) {
        String variables = "x";
        String dddd = data.toLowerCase().replace(variables, String.valueOf(level));
        if (dddd.substring(0, 1).equals("-")) { //-30+3*x
            if (dddd.substring(1, 2).equals("u") || dddd.substring(1, 2).equals("d")) { //-u(x/2)
                dddd = "n(" + dddd.substring(1, dddd.length()) + ")"; //n(u(x/2))
            } else {
                dddd = "n" + dddd.substring(1, dddd.length()); //n30+3*x
            }
        } else if (dddd.substring(0, 1).equals("=")) { //lol nexon and their mistakes
            dddd = dddd.substring(1, dddd.length());
        }
        return (int) (new CaltechEval(dddd).evaluate());
    }

    private static int parseEval(String path, MapleData source, int def, String variables, int level) {
        if (variables == null) {
            return MapleDataTool.getIntConvert(path, source, def);
        } else {
            MapleData dd = source.getChildByPath(path);
            if (dd == null) {
                return def;
            }
            if (dd.getType() != MapleDataType.STRING) {
                return MapleDataTool.getIntConvert(path, source, def);
            }
            String dddd = MapleDataTool.getString(dd).toLowerCase().replace(variables, String.valueOf(level));
            if (dddd.substring(0, 1).equals("-")) { //-30+3*x
                if (dddd.substring(1, 2).equals("u") || dddd.substring(1, 2).equals("d")) { //-u(x/2)
                    dddd = "n(" + dddd.substring(1, dddd.length()) + ")"; //n(u(x/2))
                } else {
                    dddd = "n" + dddd.substring(1, dddd.length()); //n30+3*x
                }
            } else if (dddd.substring(0, 1).equals("=")) { //lol nexon and their mistakes
                dddd = dddd.substring(1, dddd.length());
            } else if (dddd.endsWith("y")) {
                dddd = dddd.substring(4, dddd.length()).replace("y", String.valueOf(level));
            }
            return (int) (new CaltechEval(dddd).evaluate());
        }
    }

    private static MapleStatEffect loadFromData(MapleData source, int sourceid, boolean skill, boolean overTime, int level, String variables, boolean notRemoved) {
        MapleStatEffect ret = new MapleStatEffect();
        ret.sourceid = sourceid;
        ret.skill = skill;
        ret.level = (byte) level;

        if (source == null) {
            return ret;
        }

        ret.info = new EnumMap<>(MapleStatInfo.class);
        for (MapleStatInfo i : MapleStatInfo.values()) {
            if (i.isSpecial()) {
                ret.info.put(i, parseEval(i.name().substring(0, i.name().length() - 1), source, i.getDefault(), variables, level));
            } else {
                try {
                    ret.info.put(i, parseEval(i.name(), source, i.getDefault(), variables, level));
                } catch (Exception e) {
                    System.out.println("sourceid:" + sourceid);
                }

            }
        }
        ret.hpR = parseEval("hpR", source, 0, variables, level) / 100.0;
        ret.mpR = parseEval("mpR", source, 0, variables, level) / 100.0;
        ret.ignoreMob = (short) parseEval("ignoreMobpdpR", source, 0, variables, level);
        ret.thaw = (short) parseEval("thaw", source, 0, variables, level);
        ret.interval = parseEval("interval", source, 0, variables, level);
        ret.expinc = parseEval("expinc", source, 0, variables, level);
        ret.exp = parseEval("exp", source, 0, variables, level);
        ret.morphId = parseEval("morph", source, 0, variables, level);
        ret.cp = parseEval("cp", source, 0, variables, level);
        ret.cosmetic = parseEval("cosmetic", source, 0, variables, level);
        ret.slotCount = (byte) parseEval("slotCount", source, 0, variables, level); //矿(药)背包道具需要
        ret.slotPerLine = (byte) parseEval("slotPerLine", source, 0, variables, level); //矿(药)背包道具需要
        ret.preventslip = (byte) parseEval("preventslip", source, 0, variables, level);
        ret.useLevel = (short) parseEval("useLevel", source, 0, variables, level);
        ret.nuffSkill = parseEval("nuffSkill", source, 0, variables, level);
        ret.familiarTarget = (byte) (parseEval("familiarPassiveSkillTarget", source, 0, variables, level) + 1);
        ret.immortal = (byte) parseEval("immortal", source, 0, variables, level);
        ret.type = (byte) parseEval("type", source, 0, variables, level);
        ret.bs = (byte) parseEval("bs", source, 0, variables, level);
        ret.indiePdd = (short) parseEval("indiePdd", source, 0, variables, level);
        ret.indieMdd = (short) parseEval("indieMdd", source, 0, variables, level);
        ret.expBuff = parseEval("expBuff", source, 0, variables, level);
        ret.cashup = parseEval("cashBuff", source, 0, variables, level);
        ret.itemup = parseEval("itemupbyitem", source, 0, variables, level);
        ret.mesoup = parseEval("mesoupbyitem", source, 0, variables, level);
        ret.berserk = parseEval("berserk", source, 0, variables, level);
        ret.berserk2 = parseEval("berserk2", source, 0, variables, level);
        ret.booster = parseEval("booster", source, 0, variables, level);
        ret.lifeId = (short) parseEval("lifeId", source, 0, variables, level);
        ret.inflation = (short) parseEval("inflation", source, 0, variables, level);
        ret.imhp = (short) parseEval("imhp", source, 0, variables, level);
        ret.immp = (short) parseEval("immp", source, 0, variables, level);
        ret.illusion = parseEval("illusion", source, 0, variables, level);
        ret.consumeOnPickup = parseEval("consumeOnPickup", source, 0, variables, level);
        if (ret.consumeOnPickup == 1) {
            if (parseEval("party", source, 0, variables, level) > 0) {
                ret.consumeOnPickup = 2;
            }
        }
        ret.recipe = parseEval("recipe", source, 0, variables, level);
        ret.recipeUseCount = (byte) parseEval("recipeUseCount", source, 0, variables, level);
        ret.recipeValidDay = (byte) parseEval("recipeValidDay", source, 0, variables, level);
        ret.reqSkillLevel = (byte) parseEval("reqSkillLevel", source, 0, variables, level);
        ret.effectedOnAlly = (byte) parseEval("effectedOnAlly", source, 0, variables, level);
        ret.effectedOnEnemy = (byte) parseEval("effectedOnEnemy", source, 0, variables, level);
//        ret.incPVPdamage = (short) parseEval("incPVPDamage", source, 0, variables, level);
        ret.moneyCon = parseEval("moneyCon", source, 0, variables, level);
        ret.moveTo = parseEval("moveTo", source, -1, variables, level);
//        ret.repeatEffect = ret.is战法灵气(); //自动重复使用的BUFF

        ret.charColor = 0;
        String cColor = MapleDataTool.getString("charColor", source, null);
        if (cColor != null) {
            ret.charColor |= Integer.parseInt("0x" + cColor.substring(0, 2));
            ret.charColor |= Integer.parseInt("0x" + cColor.substring(2, 4) + "00");
            ret.charColor |= Integer.parseInt("0x" + cColor.substring(4, 6) + "0000");
            ret.charColor |= Integer.parseInt("0x" + cColor.substring(6, 8) + "000000");
        }
        ret.traits = new EnumMap<>(MapleTraitType.class);
        for (MapleTraitType t : MapleTraitType.values()) {
            int expz = parseEval(t.name() + "EXP", source, 0, variables, level);
            if (expz != 0) {
                ret.traits.put(t, expz);
            }
        }
        List<MapleDisease> cure = new ArrayList<>(5);
        if (parseEval("poison", source, 0, variables, level) > 0) {
            cure.add(MapleDisease.中毒);
        }
        if (parseEval("seal", source, 0, variables, level) > 0) {
            cure.add(MapleDisease.封印);
        }
        if (parseEval("darkness", source, 0, variables, level) > 0) {
            cure.add(MapleDisease.黑暗);
        }
        if (parseEval("weakness", source, 0, variables, level) > 0) {
            cure.add(MapleDisease.虚弱);
        }
        if (parseEval("curse", source, 0, variables, level) > 0) {
            cure.add(MapleDisease.诅咒);
        }
        ret.cureDebuffs = cure;
        ret.petsCanConsume = new ArrayList<>();
        for (int i = 0; true; i++) {
            int dd = parseEval(String.valueOf(i), source, 0, variables, level);
            if (dd > 0) {
                ret.petsCanConsume.add(dd);
            } else {
                break;
            }
        }
        MapleData mdd = source.getChildByPath("0");
        if (mdd != null && mdd.getChildren().size() > 0) {
            ret.mobSkill = (short) parseEval("mobSkill", mdd, 0, variables, level);
            ret.mobSkillLevel = (short) parseEval("level", mdd, 0, variables, level);
        } else {
            ret.mobSkill = 0;
            ret.mobSkillLevel = 0;
        }
        MapleData pd = source.getChildByPath("randomPickup");
        if (pd != null) {
            ret.randomPickup = new ArrayList<>();
            for (MapleData p : pd) {
                ret.randomPickup.add(MapleDataTool.getInt(p));
            }
        }
        MapleData ltd = source.getChildByPath("lt");
        if (ltd != null) {
            ret.lt = (Point) ltd.getData();
            ret.rb = (Point) source.getChildByPath("rb").getData();
        }
        MapleData ltc = source.getChildByPath("con");
        if (ltc != null) {
            ret.availableMap = new ArrayList<>();
            for (MapleData ltb : ltc) {
                ret.availableMap.add(new Pair<>(MapleDataTool.getInt("sMap", ltb, 0), MapleDataTool.getInt("eMap", ltb, 999999999)));
            }
        }
        MapleData ltb = source.getChildByPath("familiar");
        if (ltb != null) {
            ret.fatigueChange = (short) (parseEval("incFatigue", ltb, 0, variables, level) - parseEval("decFatigue", ltb, 0, variables, level));
            ret.familiarTarget = (byte) parseEval("target", ltb, 0, variables, level);
            MapleData lta = ltb.getChildByPath("targetList");
            if (lta != null) {
                ret.familiars = new ArrayList<>();
                for (MapleData ltz : lta) {
                    ret.familiars.add(MapleDataTool.getInt(ltz, 0));
                }
            }
        } else {
            ret.fatigueChange = 0;
        }
        int totalprob = 0;
        MapleData lta = source.getChildByPath("reward");
        if (lta != null) {
            ret.rewardMeso = parseEval("meso", lta, 0, variables, level);
            MapleData ltz = lta.getChildByPath("case");
            if (ltz != null) {
                ret.rewardItem = new ArrayList<>();
                for (MapleData lty : ltz) {
                    ret.rewardItem.add(new Triple<>(MapleDataTool.getInt("id", lty, 0), MapleDataTool.getInt("count", lty, 0), MapleDataTool.getInt("prop", lty, 0)));
                    totalprob += MapleDataTool.getInt("prob", lty, 0);
                }
            }
        } else {
            ret.rewardMeso = 0;
        }
        ret.totalprob = totalprob;
        // start of server calculated stuffs
        if (ret.skill) {
            int priceUnit = ret.info.get(MapleStatInfo.priceUnit); // Guild skills
            if (priceUnit > 0) {
                int price = ret.info.get(MapleStatInfo.price);
                int extendPrice = ret.info.get(MapleStatInfo.extendPrice);
                ret.info.put(MapleStatInfo.price, price * priceUnit);
                ret.info.put(MapleStatInfo.extendPrice, extendPrice * priceUnit);
            }
            switch (sourceid) {
                case 英雄.终极剑斧:
                case 圣骑士.终极剑钝器:
                case 黑骑士.终极枪矛:
                case 神射手.终极弓:
                case 箭神.终极弩:
                case 火毒.快速移动精通:
                case 冰雷.快速移动精通:
                case 主教.快速移动精通:
                case 唤灵斗师.黑暗闪电:
                case 龙神.快速移动精通: //V.100新增
                case 豹弩游侠.终极弓弩:
                case 豹弩游侠.进阶终极攻击: //V.100新增
                case 龙神.飞龙闪:
                case 龙神.玛瑙的意志:
                case 英雄.进阶终极攻击:
                case 神射手.进阶终极攻击:
                case 双弩.终极双弩枪:
                case 双弩.进阶终极攻击:
                case 战神.终极矛: //V.100新增
                case 战神.进阶终极攻击: //V.100新增
                case 豹弩游侠.召唤美洲豹_灰:
                case 豹弩游侠.召唤美洲豹_黄:
                case 豹弩游侠.召唤美洲豹_红:
                case 豹弩游侠.召唤美洲豹_紫:
                case 豹弩游侠.召唤美洲豹_蓝:
                case 豹弩游侠.召唤美洲豹_剑:
                case 豹弩游侠.召唤美洲豹_雪:
                case 豹弩游侠.召唤美洲豹_玛瑙:
                case 豹弩游侠.召唤美洲豹_铠甲:
                    ret.info.put(MapleStatInfo.mobCount, 6);
                    break;
                case 机械师.金属机甲_战车:
                case 幻影.卡片雪舞:
                case 幻影.黑色秘卡:
                    ret.info.put(MapleStatInfo.attackCount, 6);
                    ret.info.put(MapleStatInfo.bulletCount, 6);
                    break;
                case 恶魔复仇者.强化超越:
                    ret.info.put(MapleStatInfo.attackCount, 2);
                    break;
                case 夜光.仙女发射:
                    ret.info.put(MapleStatInfo.attackCount, 4);
                    break;
                case 尖兵.精准火箭:
                    ret.info.put(MapleStatInfo.attackCount, 4);
                    break;
                case 狂龙战士.剑刃之壁:
                case 狂龙战士.剑刃之壁_变身:
                    ret.info.put(MapleStatInfo.attackCount, 3);
                    break;
                case 狂龙战士.进阶剑刃之壁:
                case 狂龙战士.进阶剑刃之壁_变身:
                    ret.info.put(MapleStatInfo.attackCount, 5);
                    break;
                case 风灵使者.狂风肆虐Ⅰ:
                case 风灵使者.狂风肆虐Ⅱ:
                case 风灵使者.狂风肆虐Ⅲ:
                case 风灵使者.暴风灭世:
                    ret.info.put(MapleStatInfo.attackCount, 6);
                    break;
            }
            if (GameConstants.isNoDelaySkill(sourceid)) {
                ret.info.put(MapleStatInfo.mobCount, 6);
            }
        }
        if (!ret.skill && ret.info.get(MapleStatInfo.time) > -1) {
            ret.overTime = true;
        } else {
            ret.info.put(MapleStatInfo.time, (ret.info.get(MapleStatInfo.time) * 1000)); // items have their times stored in ms, of course
            ret.info.put(MapleStatInfo.subTime, (ret.info.get(MapleStatInfo.subTime) * 1000));
            ret.overTime = overTime || ret.isMorph() || ret.is天使技能() || ret.getSummonMovementType() != null;
            ret.notRemoved = notRemoved;
        }
        ret.monsterStatus = new EnumMap<>(MonsterStatus.class);
        ret.statups = new ArrayList<>();
        if (ret.overTime && ret.getSummonMovementType() == null && !ret.is能量获得()) {
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.物理攻击, ret.info.get(MapleStatInfo.pad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.物理防御, ret.info.get(MapleStatInfo.pdd), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.魔法攻击, ret.info.get(MapleStatInfo.mad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.魔法防御, ret.info.get(MapleStatInfo.mdd), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.命中率, ret.info.get(MapleStatInfo.acc), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.回避率, ret.info.get(MapleStatInfo.eva), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.移动速度, sourceid == 唤灵斗师.黄色灵气 ? ret.info.get(MapleStatInfo.x) : ret.info.get(MapleStatInfo.speed), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.跳跃力, ret.info.get(MapleStatInfo.jump), ret.sourceid, ret.level);

            if (sourceid != 龙神.魔法屏障 || sourceid != 豹弩游侠.暴走形态) { //龙神的这个技能是被动加的HP上限 所以这个地方就不在加了
                addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.MAXHP, ret.info.get(MapleStatInfo.mhpR), ret.sourceid, ret.level);
            }
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.MAXMP, ret.info.get(MapleStatInfo.mmpR), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.攻击加速, ret.booster, ret.sourceid, ret.level);
//            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.HP_LOSS_GUARD, Integer.valueOf(ret.thaw), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.EXPRATE, ret.expBuff, ret.sourceid, ret.level); // 经验
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.ACASH_RATE, ret.cashup, ret.sourceid, ret.level); // custom
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.DROP_RATE, ItemConstants.getModifier(ret.sourceid, ret.itemup), ret.sourceid, ret.level); // defaults to 2x
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.MESO_RATE, ItemConstants.getModifier(ret.sourceid, ret.mesoup), ret.sourceid, ret.level); // defaults to 2x
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.狂暴战魂, ret.berserk2, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.ILLUSION, ret.illusion, ret.sourceid, ret.level); //复制克隆BUFF
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.天使状态, ret.berserk, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_MAXHP, ret.info.get(MapleStatInfo.emhp), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_MAXMP, ret.info.get(MapleStatInfo.emmp), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_物理攻击, ret.info.get(MapleStatInfo.epad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_魔法攻击, ret.info.get(MapleStatInfo.emad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_物理防御, ret.info.get(MapleStatInfo.epdd), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增强_魔法防御, ret.info.get(MapleStatInfo.emdd), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.巨人药水, (int) ret.inflation, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加力量, ret.info.get(MapleStatInfo.str), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加敏捷, ret.info.get(MapleStatInfo.dex), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加智力, ret.info.get(MapleStatInfo.int_), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加运气, ret.info.get(MapleStatInfo.luk), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加力量, ret.info.get(MapleStatInfo.indieSTR), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加敏捷, ret.info.get(MapleStatInfo.indieDEX), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加智力, ret.info.get(MapleStatInfo.indieINT), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加运气, ret.info.get(MapleStatInfo.indieLUK), ret.sourceid, ret.level);

            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加魔法攻击力, ret.info.get(MapleStatInfo.indieMad), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加最大HP, (int) ret.imhp, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加最大MP, (int) ret.immp, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加最大MP, ret.info.get(MapleStatInfo.indieMmp), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加跳跃力, ret.info.get(MapleStatInfo.indieJump), ret.sourceid, ret.level);
            if (sourceid != 机械师.金属机甲_人类 && sourceid != 机械师.终极机甲) {

                addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed), ret.sourceid, ret.level);
            }

            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加命中值, ret.info.get(MapleStatInfo.indieAcc), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加回避值, ret.info.get(MapleStatInfo.indieEva), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.增加所有属性, ret.info.get(MapleStatInfo.indieAllStat), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.PVP_ATTACK, ret.info.get(MapleStatInfo.PVPdamage), ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.INVINCIBILITY, (int) ret.immortal, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.NO_SLIP, (int) ret.preventslip, ret.sourceid, ret.level);
            addBuffStatPairToListIfNotZero(ret.statups, MapleBuffStat.FAMILIAR_SHADOW, ret.charColor > 0 ? 1 : 0, ret.sourceid, ret.level);
        }
        if (ret.skill) {
            switch (sourceid) {
                case 战士.圣甲术:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.提升物理防御力, ret.info.get(MapleStatInfo.indiePdd)));
                    break;
                case 黑骑士.交叉锁链:
                    ret.statups.add(new Pair<>(MapleBuffStat.交叉锁链, ret.info.get(MapleStatInfo.x)));
                    break;
                case 黑骑士.灵魂祝福:
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 黑骑士.龙之献祭:
                    ret.hpR = ret.info.get(MapleStatInfo.y) / 100.0;
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.ignoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.尖兵神秘代码_BOSS伤害, ret.info.get(MapleStatInfo.indieBDR)));
                    break;
                case 魔法师.魔法盾:
                case 龙神.魔法盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.魔法盾, ret.info.get(MapleStatInfo.x)));
                    break;
                case 机械师.金属机甲_人类:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.金属机甲, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.骑兽技能, 1932016)); //机械师的骑宠
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed))); //这个封包要放在骑兽BUFF的后面
                    break;
                case 机械师.终极机甲:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.金属机甲, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.骑兽技能, 1932016)); //机械师的骑宠
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed))); //这个封包要放在骑兽BUFF的后面
                    break;
                case 机械师.金属机甲_战车:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.金属机甲, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.cr)));
                    break;
                case 预备兵.隐藏碎片:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.隐藏碎片, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP百分比, ret.info.get(MapleStatInfo.indieMmpR)));
                    break;
                case 9101004:
                case 管理员.隐藏术:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.隐身术, ret.info.get(MapleStatInfo.x)));
                    break;
                case 双刀.进阶隐身术:
                    ret.statups.add(new Pair<>(MapleBuffStat.隐身术, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.移动速度, 1));
                    break;
                case 飞侠.隐身术:
                case 夜行者.隐身术:
                    ret.statups.add(new Pair<>(MapleBuffStat.隐身术, ret.info.get(MapleStatInfo.x)));
                    break;
                case 侠盗.敛财术:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.敛财术, ret.info.get(MapleStatInfo.x)));
                    break;
                case 侠盗.金钱护盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.金钱护盾, ret.info.get(MapleStatInfo.x)));
                    break;
                case 侠盗.暴击蓄能:
                case 侠盗.名流爆击:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击蓄能, ret.info.get(MapleStatInfo.x)));
                    break;
                case 隐士.影分身:
                case 侠盗.影分身:
                case 双刀.镜像分身:
                case 尖兵.全息投影:
                    if (sourceid == 尖兵.全息投影) {
                        ret.info.put(MapleStatInfo.time, 3 * 60 * 1000); //暂时设置为3分钟
                    }
                    ret.statups.add(new Pair<>(MapleBuffStat.影分身, ret.info.get(MapleStatInfo.x)));
                    break;
                case 侠盗.侠盗本能:
                    ret.statups.add(new Pair<>(MapleBuffStat.击杀点数, 0)); //设置默认击杀点数为0
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.x)));
                    break;
                case 侠盗.暗杀:
                    ret.statups.add(new Pair<>(MapleBuffStat.超越攻击, 1)); //100%稳如泰山
                    break;
                case 龙神.玛瑙的保佑:
                    ret.statups.add(new Pair<>(MapleBuffStat.玛瑙保佑, ret.info.get(MapleStatInfo.x)));
                    break;
                case 神射手.无形箭: //3101004 - 无形箭 - 一定时间内增加物理攻击力，使用弓的时候不会消耗箭矢。
                case 箭神.无形箭:
                case 船长.无限子弹:
                    ret.statups.add(new Pair<>(MapleBuffStat.无形箭弩, ret.info.get(MapleStatInfo.x)));
                    break;
                case 豹弩游侠.无形箭弩:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.无形箭弩, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad))); //这个要放在后面才有效果
                    break;
                case 火毒.神秘瞄准术:
                case 冰雷.神秘瞄准术:
                case 主教.神秘瞄准术:
                    ret.info.put(MapleStatInfo.time, 5 * 1000);
                    ret.statups.add(new Pair<>(MapleBuffStat.神秘瞄准术, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.寒冰冲击:
                    ret.monsterStatus.put(MonsterStatus.速度, -20);
                    ret.statups.add(new Pair<>(MapleBuffStat.属性攻击, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.火焰冲击:
                    ret.monsterStatus.put(MonsterStatus.持续伤害, ret.info.get(MapleStatInfo.dot));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性攻击, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.雷鸣冲击:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                    ret.monsterStatus.put(MonsterStatus.持续伤害, ret.info.get(MapleStatInfo.dot));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性攻击, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.神圣冲击:
                    ret.monsterStatus.put(MonsterStatus.沉默, 1);
                    ret.statups.add(new Pair<>(MapleBuffStat.属性攻击, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.冰雪矛:
                    ret.statups.add(new Pair<>(MapleBuffStat.冰雪矛, ret.info.get(MapleStatInfo.x)));
                    break;
                case 火毒.自然力重置:
                case 冰雷.自然力重置:
                case 龙神.自然力重置:
                    ret.statups.add(new Pair<>(MapleBuffStat.自然力重置, ret.info.get(MapleStatInfo.x)));
                    break;
                case 神射手.精神集中:
                    ret.statups.add(new Pair<>(MapleBuffStat.集中精力, ret.info.get(MapleStatInfo.x)));
                    break;
                case 神射手.极限射箭:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.极限射箭, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 箭神.极限射箭:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.极限射箭, ret.info.get(MapleStatInfo.y)));
                    break;
                case 神射手.进阶箭筒:
                    ret.statups.add(new Pair<>(MapleBuffStat.进阶箭筒, 0));
                    break;
                case 箭神.伤害置换:
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害置换, 0));
                    break;
                case 冲锋队长.能量获得:
                case 冲锋队长.超级冲击:
                case 冲锋队长.终极冲击:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.能量获得, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.祝福护甲:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.祝福护甲, ret.info.get(MapleStatInfo.x) + 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.祝福护甲_增加物理攻击, ret.info.get(MapleStatInfo.epad)));
                    break;
                case 圣骑士.战斗命令:
                    ret.statups.add(new Pair<>(MapleBuffStat.战斗命令, ret.info.get(MapleStatInfo.x)));
                    break;
                case 圣骑士.元气恢复:
                    ret.hpR = ret.info.get(MapleStatInfo.x) / 100.0;
                    ret.statups.add(new Pair<>(MapleBuffStat.元气恢复, ret.info.get(MapleStatInfo.y)));
                    break;
                case 圣骑士.抗震防御:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.抗震防御, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.防御概率, ret.info.get(MapleStatInfo.indiePddR)));
                    break;
                case 圣骑士.虚空元素:
                    ret.statups.add(new Pair<>(MapleBuffStat.自然力重置, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 圣骑士.元素冲击:
                case 圣骑士.万佛归一破:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.元素冲击, 1));
                    break;
                case 圣骑士.连环环破:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.元素爆破, 1));
                    break;
                case 圣骑士.至圣领域:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.至圣领域, 1));
                    break;
                case 英雄.快速武器:
                case 圣骑士.快速武器:
                case 黑骑士.快速武器:
                case 神射手.快速箭:
                case 箭神.快速弩:
                case 隐士.快速暗器:
                case 侠盗.快速短刀:
                case 双弩.快速双弩枪:
                case 恶魔猎手.恶魔加速:
                case 火毒.魔法狂暴:
                case 冰雷.魔法狂暴:
                case 主教.魔法狂暴:
                case 龙神.魔法狂暴:
                case 炎术士.火焰之书:
                case 冲锋队长.急速拳:
                case 船长.速射:
                case 龙的传人.追影身法:
                case 魂骑士.机警灵活: //新的魂骑士职业技能
                case 风灵使者.快速箭_新: //新的风灵使者技能
                case 夜行者.快速投掷:
                case 奇袭者.急速拳_新: //新的奇袭者技能
                case 双刀.快速双刀:
                case 唤灵斗师.快速长杖:
                case 豹弩游侠.快速弩:
                case 机械师.机械加速:
                case 神炮王.大炮加速:
                case 幻影.快速手杖: //V.103新增职业
                case 夜光.魔法狂暴: //V.106新增职业
                case 米哈尔.快速剑: //V.104新增职业
                case 恶魔复仇者.恶魔加速: //V.110新增职业
                case 尖兵.尖兵加速:
                case 剑豪.秘剑_隼:
                case 阴阳师.孔雀开屏:
                    ret.statups.add(new Pair<>(MapleBuffStat.攻击加速, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.快速矛:
                    ret.statups.add(new Pair<>(MapleBuffStat.攻击加速, -ret.info.get(MapleStatInfo.y)));
                    break;
                case 机械师.幸运骰子:
                case 机械师.双幸运骰子:
                case 冲锋队长.幸运骰子:
                case 船长.幸运骰子:
                case 冲锋队长.双幸运骰子:
                case 船长.双幸运骰子:
                case 神炮王.幸运骰子:
                case 神炮王.双幸运骰子:
                    ret.statups.add(new Pair<>(MapleBuffStat.幸运骰子, 0));
                    break;
                case 神炮王.随机橡木桶:
                    ret.statups.add(new Pair<>(MapleBuffStat.随机橡木桶, Randomizer.nextInt(3) + 1));
                    break;
                case 冲锋队长.反制攻击:
                case 船长.反制攻击:
                case 米哈尔.闪耀之光: //V.104新增职业 51111003 - 闪耀之光 - 在一定时间内增加伤害。
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 冲锋队长.蛇拳:
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, ret.info.get(MapleStatInfo.x)));
                    break;
                case 冲锋队长.极速领域:
                case 奇袭者.极速领域_新:
                    ret.statups.add(new Pair<>(MapleBuffStat.极速领域, ret.info.get(MapleStatInfo.x)));
                    break;
                case 海盗.疾驰:
                    ret.statups.add(new Pair<>(MapleBuffStat.疾驰速度, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.疾驰跳跃, ret.info.get(MapleStatInfo.y)));
                    break;
                case 黑骑士.神圣之火:
                case 管理员.神圣之火:
                case 9101008:
                    ret.statups.add(new Pair<>(MapleBuffStat.MAXHP, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.MAXMP, ret.info.get(MapleStatInfo.x)));
                    break;
                case 英雄.斗气集中:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.斗气集中, 1));
                    break;
                case 英雄.愤怒之火:
                    ret.statups.add(new Pair<>(MapleBuffStat.愤怒之火, ret.info.get(MapleStatInfo.x)));
                    break;
                case 英雄.战灵附体:
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.y)));
                    break;
                case 战神.战神之盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.战神之盾, ret.info.get(MapleStatInfo.x))); //这个WZ里面应该是t不x
                    break;
                case 龙神.火焰轮:
                case 龙神.魔翼斩杀:
                    ret.monsterStatus.put(MonsterStatus.持续伤害, ret.info.get(MapleStatInfo.dot));
                    break;
                case 双刀.荆棘:
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 双刀.终极斩:
                    ret.info.put(MapleStatInfo.time, 60 * 1000);
                    ret.hpR = -ret.info.get(MapleStatInfo.x) / 100.0;
                    ret.statups.add(new Pair<>(MapleBuffStat.终极斩, ret.info.get(MapleStatInfo.y)));
                    break;
                case 双刀.终极斩_无敌:
                    ret.info.put(MapleStatInfo.time, 3 * 1000);
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, 1));
                    break;
                case 战神.斗气重生:
                    ret.hpR = -ret.info.get(MapleStatInfo.x) / 100.0;
                    break;
                case 火毒.快速移动精通:
                case 冰雷.快速移动精通:
                case 主教.快速移动精通:
                case 龙神.快速移动精通: //V.100新增
                    ret.info.put(MapleStatInfo.mpCon, ret.info.get(MapleStatInfo.y));
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.移动精通, ret.info.get(MapleStatInfo.x)));
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                    break;
                case 英雄.冒险岛勇士:
                case 圣骑士.冒险岛勇士:
                case 黑骑士.冒险岛勇士:
                case 火毒.冒险岛勇士:
                case 冰雷.冒险岛勇士:
                case 主教.冒险岛勇士:
                case 神射手.冒险岛勇士:
                case 箭神.冒险岛勇士:
                case 隐士.冒险岛勇士:
                case 侠盗.冒险岛勇士:
                case 冲锋队长.冒险岛勇士:
                case 船长.冒险岛勇士:
                case 战神.冒险岛勇士:
                case 龙神.冒险岛勇士:
                case 双刀.冒险岛勇士:
                case 唤灵斗师.冒险岛勇士:
                case 豹弩游侠.冒险岛勇士:
                case 机械师.冒险岛勇士:
                case 神炮王.冒险岛勇士:
                case 双弩.冒险岛勇士:
                case 恶魔猎手.冒险岛勇士:
                case 龙的传人.冒险岛勇士: //V.103新增职业
                case 幻影.冒险岛勇士: //V.103新增职业
                case 夜光.冒险岛勇士: //V.106新增职业
                case 米哈尔.冒险岛勇士: //V.103新增职业
                case 狂龙战士.诺巴的勇士: //T071新增职业
                case 爆莉萌天使.诺巴的勇士: //T071新增职业
                case 恶魔复仇者.冒险岛勇士: //V.110新增职业
                case 尖兵.冒险岛勇士:
                case 魂骑士.希纳斯的骑士:
                case 炎术士.希纳斯的骑士:
                case 风灵使者.希纳斯的骑士:
                case 夜行者.希纳斯的骑士:
                case 奇袭者.希纳斯的骑士:
                case 隐月.冒险岛勇士:
                case 剑豪.晓之勇者:
                case 阴阳师.晓之勇者:
                case 超能力者.异界勇士:
                    ret.statups.add(new Pair<>(MapleBuffStat.冒险岛勇士, ret.info.get(MapleStatInfo.x)));
                    break;
                case 神射手.火眼晶晶:
                case 箭神.火眼晶晶:
                case 豹弩游侠.火眼晶晶:
                case 风灵使者.火眼晶晶: //3221002 - 火眼晶晶 - 在一定时间内赋予全体队员寻找敌人的弱点并造成致命伤害的能力。
                    ret.statups.add(new Pair<>(MapleBuffStat.火眼晶晶, (ret.info.get(MapleStatInfo.x) << 8) + ret.info.get(MapleStatInfo.y) + ret.info.get(MapleStatInfo.criticaldamageMax)));
                    break;
                case 龙神.抗魔领域:
                    ret.statups.add(new Pair<>(MapleBuffStat.抗魔领域, ret.info.get(MapleStatInfo.x)));
                    break;
                case 魔法师.精灵弱化:
                case 龙神.精灵弱化:
                    ret.statups.add(new Pair<>(MapleBuffStat.精灵弱化, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.抗压:
                    ret.statups.add(new Pair<>(MapleBuffStat.战神抗压, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.矛连击强化:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.矛连击强化, 10));
                    break;
                case 船长.船员统帅:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 120000);
                    ret.statups.add(new Pair<>(MapleBuffStat.精神连接, 10));
                    break;
                case 双弩.精神注入: //精神注入 - 在一定时间内增加伤害和爆击概率。
                    ret.statups.add(new Pair<>(MapleBuffStat.精神连接, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.连环吸血:
                case 恶魔猎手.吸血鬼之触:
                case 黑骑士.黑暗饥渴:
                    ret.statups.add(new Pair<>(MapleBuffStat.连环吸血, ret.info.get(MapleStatInfo.x)));
                    break;
                case 战神.威势:
                    ret.statups.add(new Pair<>(MapleBuffStat.战神威势, ret.info.get(MapleStatInfo.x)));
                    break;
                case 双弩.古老意志:
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, ret.info.get(MapleStatInfo.damR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力百分比, ret.info.get(MapleStatInfo.indiePadR)));
                    break;
                case 英雄.魔击无效:
                case 圣骑士.魔击无效:
                case 黑骑士.魔击无效:
                case 米哈尔.魔击无效:
                    ret.monsterStatus.put(MonsterStatus.魔击无效, 1);
                    break;
                case 冲锋队长.树木防御:
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.x)));
                    break;
                case 双弩.水盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.asrR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.terR)));
                    break;
                case 龙神.魔法屏障:
                    ret.statups.add(new Pair<>(MapleBuffStat.魔法屏障, ret.info.get(MapleStatInfo.x)));
                    break;
                case 龙神.灵魂之石:
                    ret.statups.add(new Pair<>(MapleBuffStat.灵魂之石, 1));
                    break;
                case 圣骑士.压制术:
                    ret.monsterStatus.put(MonsterStatus.物攻, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.物防, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.魔攻, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.魔防, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.恐慌, ret.info.get(MapleStatInfo.z));
                    break;
                case 魂骑士.灵魂之眼:
//                    ret.statups.add(MonsterStatus.物防, ret.info.get(MapleStatInfo.x));
//                    ret.monsterStatus.put(MonsterStatus.魔防, ret.info.get(MapleStatInfo.x));
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.mobCount)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.mobCount)));
                    //ret.monsterStatus.put(MonsterStatus.灵魂之眼, 0);
                    break;
                case 英雄.虎咆哮:
                case 侠盗.一出双击:
                case 侠盗.神通术:
                case 神射手.爆炸箭:
                case 冲锋队长.能量爆破:
                case 豹弩游侠.十字攻击:
                case 唤灵斗师.黑暗锁链:
                case 唤灵斗师.黑暗创世:
                case 机械师.火箭拳:
                case 双刀.暗影飞跃斩:
                case 恶魔猎手.死亡牵引:
                case 恶魔猎手.恶魔追踪:
                case 冰雷.链环闪电:
                case 主教.圣光:
                case 龙神.龙推力:
                case 龙神.熊熊烈火:
                case 龙神.魔力闪爆:
                case 龙神.火焰喷射:
                case 战神.旋风:
                case 神炮王.猴子炸药桶:
                case 神炮王.猴子超级炸弹:
                case 神炮王.猴子冲击波:
                case 神炮王.猴子冲击波_1:
                case 9001020: //没有这个GM技能
                case 9101020: //没有这个GM技能
                case 米哈尔.闪耀爆破:
                case 米哈尔.闪耀爆炸:
                case 狂龙战士.穿刺冲击:
                case 狂龙战士.牵引锁链:
                case 恶魔复仇者.血腥禁锢:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                    break;
                case 英雄.恐慌:
                case 双刀.闪光弹:
                    ret.monsterStatus.put(MonsterStatus.恐慌, ret.info.get(MapleStatInfo.x));
                    break;
                case 隐士.决战之巅:
                    ret.monsterStatus.put(MonsterStatus.挑衅, ret.info.get(MapleStatInfo.x));
                    break;
                case 恶魔猎手.鬼泣:
                    ret.monsterStatus.put(MonsterStatus.挑衅, ret.info.get(MapleStatInfo.w));
                    ret.monsterStatus.put(MonsterStatus.魔防, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.物防, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.魔攻, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.物攻, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.命中, ret.info.get(MapleStatInfo.x));
                    break;
                case 双弩.传说之矛: //not sure if negative
                    ret.monsterStatus.put(MonsterStatus.物防, ret.info.get(MapleStatInfo.x));
                    break;
                case 冰雷.冰冻术: // cold beam
                case 冰雷.冰河锁链:
                case 冰雷.冰咆哮: // ice strike
                case 冰雷.落霜冰破: // Blizzard
                case 火毒.美杜莎之眼: // Paralyze
                case 战神.钻石星辰: // Tempest
                case 龙神.冰点寒气:
                case 90001006: //没有这个GM技能
                    ret.monsterStatus.put(MonsterStatus.无法移动, 1);
                    ret.info.put(MapleStatInfo.time, ret.info.get(MapleStatInfo.time) * 2); // freezing skills are a little strange
                    break;
                case 冰雷.极冻吐息:
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, ret.info.get(MapleStatInfo.z)));
                    ret.monsterStatus.put(MonsterStatus.无法移动, 1);
                    ret.info.put(MapleStatInfo.time, ret.info.get(MapleStatInfo.time) * 2); // freezing skills are a little strange
                    break;
                case 90001002: //没有这个GM技能
                    ret.monsterStatus.put(MonsterStatus.速度, ret.info.get(MapleStatInfo.x));
                    break;
                case 神炮王.紧急后撤:
                    ret.monsterStatus.put(MonsterStatus.速度, ret.info.get(MapleStatInfo.z));
                    break;
                case 神炮王.霰弹炮:
                    ret.statups.add(new Pair<>(MapleBuffStat.霰弹炮, 1));
                    break;
                case 英雄.葵花宝典: //1121010 - 葵花宝典 - 将积累的斗气激发出来。在一定时间内集中攻击一个敌人，伤害大幅提升。消耗10个斗气。
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.葵花宝典, ret.info.get(MapleStatInfo.x) * 100 + ret.info.get(MapleStatInfo.mobCount)));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击概率增加, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.最小爆击伤害, ret.info.get(MapleStatInfo.y)));
                    break;
                case 米哈尔.灵魂之怒: //51121006 - 灵魂之怒 - 一定时间内可以集中攻击一个敌人，伤害值大幅提升。
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.葵花宝典, ret.info.get(MapleStatInfo.x) * 100 + ret.info.get(MapleStatInfo.mobCount)));
                    break;
                case 双弩.独角兽之角:
                case 龙神.鬼刻符:
                    ret.monsterStatus.put(MonsterStatus.诅咒, ret.info.get(MapleStatInfo.x));
                    break;
                case 90001003: //没有这个GM技能
                    ret.monsterStatus.put(MonsterStatus.持续伤害, 1);
                    break;
                case 冰雷.寒冰灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.寒冰灵气, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.v)));
                    break;
                case 主教.神之保护:
                    ret.statups.add(new Pair<>(MapleBuffStat.神之保护, ret.info.get(MapleStatInfo.x)));
                    break;
                case 主教.神圣魔法盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.神圣魔法盾, ret.info.get(MapleStatInfo.x)));
                    ret.info.put(MapleStatInfo.cooltime, ret.info.get(MapleStatInfo.y));
                    ret.hpR = ret.info.get(MapleStatInfo.z) / 100.0;
                    break;
                case 火毒.元素配合:
                case 冰雷.元素配合:
                case 主教.神圣保护:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.抵抗之魔法盾, 1));
                    break;
                case 主教.神圣祈祷:
                case 管理员.神圣祈祷:
                case 9101002: //没有这个GM技能
                    ret.statups.add(new Pair<>(MapleBuffStat.神圣祈祷, ret.info.get(MapleStatInfo.x)));
                    break;
                case 80001034: //神圣拯救者的祝福
                case 80001035: //神圣拯救者的祝福
                case 80001036: //神圣拯救者的祝福
                    ret.statups.add(new Pair<>(MapleBuffStat.神圣拯救者的祝福, 1));
                    break;
                case 90001005: //没有这个GM技能
                    ret.monsterStatus.put(MonsterStatus.封印, 1);
                    break;
                case 隐士.影网术:
                    ret.monsterStatus.put(MonsterStatus.影网, 1);
                    ret.monsterStatus.put(MonsterStatus.持续伤害, ret.info.get(MapleStatInfo.dot));
                    break;
                case 隐士.暗器伤人:
                case 夜行者.魔法飞镖:
                    ret.statups.add(new Pair<>(MapleBuffStat.暗器伤人, 0));
                    break;
                case 火毒.终极无限:
                case 冰雷.终极无限:
                case 主教.终极无限:
                    ret.hpR = ret.info.get(MapleStatInfo.y) / 100.0;
                    ret.mpR = ret.info.get(MapleStatInfo.y) / 100.0;
                    ret.statups.add(new Pair<>(MapleBuffStat.终极无限, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 龙神.玛瑙的意志: //在一定时间内进入不会被敌人的攻击击退的状态，可以对敌人发动身体冲撞。
                    ret.statups.add(new Pair<>(MapleBuffStat.玛瑙意志, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 龙神.狂怒灵魂:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 唤灵斗师.稳如泰山:
                case 神炮王.海盗精神:
                case 米哈尔.稳如泰山:
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 2121002: //魔法反击 现在好像没有这3个技能
                case 2221002: //魔法反击
                case 2321002: //魔法反击
                    ret.statups.add(new Pair<>(MapleBuffStat.魔法反击, 1));
                    break;
                case 主教.进阶祝福:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.进阶祝福, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP, ret.info.get(MapleStatInfo.indieMmp)));
                    break;
                case 神射手.幻影步:
                case 箭神.幻影步:
                    ret.statups.add(new Pair<>(MapleBuffStat.额外回避, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.移动速度, ret.info.get(MapleStatInfo.x)));
                    break;
                case 豹弩游侠.暴走形态:
                    ret.statups.add(new Pair<>(MapleBuffStat.移动速度, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴走形态, ret.info.get(MapleStatInfo.x)));
                    break;
                case 豹弩游侠.呼啸:
                    ret.statups.add(new Pair<>(MapleBuffStat.DAMAGE_BUFF, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.呼啸_爆击概率, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.呼啸_MaxMp增加, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.呼啸_伤害减少, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.呼啸_回避概率, ret.info.get(MapleStatInfo.x)));
                    break;
                case 豹弩游侠.弹仓扩展:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性, ret.info.get(MapleStatInfo.indieAllStat)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 豹弩游侠.召唤美洲豹_灰:
                case 豹弩游侠.召唤美洲豹_黄:
                case 豹弩游侠.召唤美洲豹_红:
                case 豹弩游侠.召唤美洲豹_紫:
                case 豹弩游侠.召唤美洲豹_蓝:
                case 豹弩游侠.召唤美洲豹_剑:
                case 豹弩游侠.召唤美洲豹_雪:
                case 豹弩游侠.召唤美洲豹_玛瑙:
                case 豹弩游侠.召唤美洲豹_铠甲:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.召唤美洲豹, ret.info.get(MapleStatInfo.criticaldamageMin) << 8 + ret.info.get(MapleStatInfo.asrR)));
                    break;
                case 豹弩游侠.沉默之怒:
                    ret.statups.add(new Pair<>(MapleBuffStat.终极攻击, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 豹弩游侠.撤步退身:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.撤步退身, 0));
                    break;
                case 主教.祝福:
                case 管理员.运营员的祝福:
                case 9101003: //没有这个GM技能
                    ret.statups.add(new Pair<>(MapleBuffStat.牧师祝福, (int) ret.level));
                    break;
                case 唤灵斗师.死亡:
                case 唤灵斗师.死亡契约:
                case 唤灵斗师.死亡契约2:
                case 唤灵斗师.死亡契约3:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.死亡契约, 0));
                    break;
                case 唤灵斗师.黄色灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.战法灵气, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, 1));
                    break;
                case 唤灵斗师.吸收灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.战法灵气, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.连环吸血, ret.info.get(MapleStatInfo.x)));
                    break;
                case 唤灵斗师.蓝色灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.战法灵气, (int) ret.level));
                    break;
                case 唤灵斗师.黑暗灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.战法灵气, (int) ret.level));
                    break;
                case 唤灵斗师.减益灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.战法灵气, (int) ret.level));
                    ret.monsterStatus.put(MonsterStatus.物防, ret.info.get(MapleStatInfo.y));
                    ret.monsterStatus.put(MonsterStatus.魔防, ret.info.get(MapleStatInfo.y));
                    break;
                case 唤灵斗师.暴怒对战:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.葵花宝典, ret.info.get(MapleStatInfo.x) * 100 + ret.info.get(MapleStatInfo.mobCount)));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击概率增加, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.最小爆击伤害, ret.info.get(MapleStatInfo.y)));
                    break;
                case 机械师.完美机甲:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.增强_物理防御, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔猎手.黑暗复仇:
                    ret.statups.add(new Pair<>(MapleBuffStat.愤怒之火, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔猎手.黑暗忍耐: //黑暗忍耐 - 在一定时间内使防御力、增加状态异常抗性、所有属性抗性飞跃性提高。
                case 米哈尔.灵魂恢复术: //51111004 - 灵魂恢复术 - 在一定时间内大幅提高防御力、异常状态耐性、所有属性耐性概率。
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗忍耐, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔猎手.黑暗变形: //黑暗变形 - 在一定时间内解放潜在的力量，提高伤害和HP。在变形状态下，2个黑暗斗气以施展者为中心快速旋转，自动攻击范围内的多个敌人。
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗变形, ret.info.get(MapleStatInfo.damR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 恶魔猎手.无限精气: //无限精气 - 消耗掉所有精气，在一定时间内使用技能时可以不消耗精气。但不能忽视技能冷却时间。
                    ret.statups.add(new Pair<>(MapleBuffStat.无限精气, 1));
                    break;
                case 幻影.幻影回归: //幻影回归 - 返回到幻影的专用飞艇水晶花园中。
                case 80001040: //精灵的祝福
                case 双弩.精灵的祝福:
                    ret.moveTo = ret.info.get(MapleStatInfo.x);
                    break;
                case 80001089: // 飞行骑乘· Soaring
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.飞行骑乘, 1));
                    break;
                case 机械师.状态调试:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 10001075: //女皇的祈祷 Cygnus Echo  
                    ret.statups.add(new Pair<>(MapleBuffStat.英雄回声, ret.info.get(MapleStatInfo.x)));
                    break;
                case 船长.海盗气魄: //5221018 - 海盗气魄 - 展现不怕死的海盗的气势，攻击力、状态异常和属性抗性增加，有一定概率不被击退。因为不怕死，所以回避值减少。
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, ret.info.get(MapleStatInfo.damR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.x)));
                    break;
                case 幻影.卡牌审判:
                case 幻影.卡牌审判_高级:
                    ret.statups.add(new Pair<>(MapleBuffStat.卡牌审判, 0));
                    break;
                case 幻影.幻影屏障:
                    ret.statups.add(new Pair<>(MapleBuffStat.幻影屏障, ret.info.get(MapleStatInfo.x)));
                    break;
                case 幻影.幸运保护: //幸运保护 - 为了避免不幸，在身边设置卡片的封印。HP、MP、属性抗性、状态异常抗性增加。
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP百分比, ret.info.get(MapleStatInfo.indieMmpR)));
                    break;
                case 幻影.圣歌祈祷: //圣歌祈祷 - 受到圣歌的祈祷，攻击力大幅上升，有一定概率无视敌人的防御力。
                    ret.statups.add(new Pair<>(MapleBuffStat.反制攻击, ret.info.get(MapleStatInfo.damR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.damR)));
                    break;
                case 幻影.神秘的运气: //神秘的运气 - 最幸运的幻影可以永久性地提高运气。使用技能时，进入可以避免一次死亡并恢复体力的幸运状态。
                    ret.info.put(MapleStatInfo.time, 900000);
                    ret.statups.add(new Pair<>(MapleBuffStat.神秘运气, ret.info.get(MapleStatInfo.x)));
                    break;
                case 米哈尔.光之守护: //光之守护 - 受到光之守护，在一定时间内即使受到敌人攻击，也不会被击退。
                case 80001140: //光之守护 - [排名技能]受到光之骑士米哈尔的庇护，在一定时间内，即使受到敌人攻击也不会被击退。
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 米哈尔.神圣方块:
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 米哈尔.明日祝福:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    break;
                case 夜光.太阳火焰:
                case 夜光.月蚀:
                    ret.info.put(MapleStatInfo.time, 200000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.光暗转换, 1));
                    break;
                case 夜光.平衡_光明:
                case 夜光.平衡_黑暗:
                    ret.statups.add(new Pair<>(MapleBuffStat.光暗转换, 2));
                    break;
                case 夜光.魔力延伸:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP百分比, ret.info.get(MapleStatInfo.indieMmpR)));
                    break;
                case 夜光.闪爆光柱:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                    break;
                case 夜光.黑暗祝福:
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗祝福, 1));
                    break;
                case 夜光.生命潮汐:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.生命潮汐, 2));
                    break;
                case 夜光.抵抗之魔法盾:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.抵抗之魔法盾, 3));
                    break;
                case 夜光.黑暗巫术:
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.自然力重置, ret.info.get(MapleStatInfo.x)));
                    break;
                case 夜光.黑暗高潮:
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗高潮, 1));
                    break;
                case 狂龙战士.防御模式:
                case 狂龙战士.攻击模式:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.模式转换, 0));
                    break;
                case 狂龙战士.熊熊烈火升级:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.攻击加速, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 狂龙战士.重拾力量:
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.terR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.asrR)));
                    break;
                case 狂龙战士.催化:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力百分比, ret.info.get(MapleStatInfo.indiePadR)));
                    break;
                case 狂龙战士.强健护甲:
                    ret.statups.add(new Pair<>(MapleBuffStat.强健护甲, ret.info.get(MapleStatInfo.x)));
                    break;
                case 狂龙战士.剑刃之壁:
                case 狂龙战士.进阶剑刃之壁:
                case 狂龙战士.剑刃之壁_变身:
                case 狂龙战士.进阶剑刃之壁_变身:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.剑刃之壁, (int) ret.level));
                    break;
                case 爆莉萌天使.力量转移: //65101002 - 力量转移 - 吸收部分对目标的伤害，形成保护自己的保护膜。
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害置换, ret.info.get(MapleStatInfo.y) * 1000));
                    break;
                case 爆莉萌天使.钢铁莲花: //65111004 - 钢铁莲花 - 以钢铁般的意志抵挡敌人的攻击。
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    break;
                case 爆莉萌天使.灵魂凝视: //65121004 - 灵魂凝视 - 借助爱丝卡达的力量，具备了洞穿敌人灵魂的双眼。
                    ret.statups.add(new Pair<>(MapleBuffStat.灵魂凝视, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔复仇者.超越:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.恶魔超越, 1));
                    break;
                case 恶魔复仇者.血之契约:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.生命潮汐, 3));
                    break;
                case 恶魔复仇者.负荷释放:
                    
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 恶魔复仇者.驱邪: //31211003 - 驱邪 - 在一定时间内获得抵挡邪恶气息的能力。所有属性抗性和状态抗性增加，使受到的伤害减少一定比例。
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔复仇者.恶魔恢复:
                    ret.statups.add(new Pair<>(MapleBuffStat.恶魔恢复, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 恶魔复仇者.惊天之力: //31221004 - 惊天之力 - 在一定时间内大幅提高攻击力，加快攻击速度。
                    //ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 尖兵.急速支援: //30020232 - 急速支援 - 每隔一定时间补充1个电力，受到攻击/回避时有一定概率补充1个。根据获得的能量，所有能力值提高。获得的能量可能会在使用技能时消耗。
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.尖兵电力, 1));
                    break;
                case 尖兵.自由飞行: //30021237 - 自由飞行 - 打开推进器，在一定时间内可以自由飞行。在飞行状态下只能使用精准火箭技能和增益技能。
                    ret.info.put(MapleStatInfo.time, 30000);
                    ret.statups.add(new Pair<>(MapleBuffStat.高空飞行, 1));
                    break;
                case 尖兵.超能力量: //36001002 - 超能力量 - 提高能量，增加伤害。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 尖兵.直线透视: //36101002 - 直线透视 - 在一定时间内激活视觉，看穿敌人的弱点，提高爆击率。消耗备用能量。
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.x)));
                    break;
                case 尖兵.高效输能: //36101003 - 高效输能 - 在一定时间内提高能量流的利用效率，增加最大HP和最大MP。同时可以获得增加最大HP和最大MP的被动效果。
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP百分比, ret.info.get(MapleStatInfo.indieMmpR)));
                    break;
                case 尖兵.双重防御:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗高潮, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.z)));
                    break;
                case 尖兵.宙斯盾系统:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.宙斯盾系统, 1));
                    break;
                case 尖兵.神秘代码: //36121003 - 神秘代码 - 在一定时间内发挥出当前世界上不可能出现的强大力量，增加总伤害和攻击BOSS时的伤害，所有能力值永久增加。
                    ret.statups.add(new Pair<>(MapleBuffStat.尖兵神秘代码_BOSS伤害, ret.info.get(MapleStatInfo.indieBDR)));
                    //ret.statups.add(new Pair<>(MapleBuffStat.BOSS伤害, 30));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 尖兵.攻击矩阵: //36121004 - 攻击矩阵 - 激活攻击矩阵，在一定时间内攻击时无视敌人的防御，不会被敌人的攻击击退。
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.y)));
                    break;
                case 尖兵.全息力场_支援:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.回避增加, ret.info.get(MapleStatInfo.evaR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 尖兵.永动引擎:
                    ret.statups.add(new Pair<>(MapleBuffStat.永动引擎, 1));
                    break;
                case 魂骑士.光之刃: //11001021 - 光之刃 - 将自己的灵魂融入武器中进行冶炼。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.命中增加, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.光之刃, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 魂骑士.灵魂之剑: //11121054 - 灵魂之剑 - 将灵魂的力量化为一柄剑。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.命中增加, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    break;
                case 魂骑士.元素_灵魂: //11001022 - 元素：灵魂 - 召唤出灵魂元素，获得其的力量。
                    ret.statups.add(new Pair<>(MapleBuffStat.元素灵魂, (int) ret.level));
                    break;
                case 魂骑士.灵魂守卫: //11111024 - 灵魂守卫 - 借助古代灵魂的力量来守护自己。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.提升物理防御力, ret.info.get(MapleStatInfo.indiePdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升魔法防御力, ret.info.get(MapleStatInfo.indieMdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                    break;
                case 魂骑士.灵魂誓约: //11121006 - 灵魂誓约 - 通过和古代灵魂间订立誓约，在战斗中成为决不会退缩的战士楷模。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性, ret.info.get(MapleStatInfo.indieAllStat)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 魂骑士.日月轮转_月光洒落:
                case 魂骑士.月光洒落: //11101022 - 月光洒落 - 将月光的力量注入到剑中。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害减少, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.月光转换, 1)); //1 = 月光 2 = 旭日
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 魂骑士.日月轮转_旭日:
                case 魂骑士.旭日: //11111022 - 旭日 - 在剑上注入阳光的力量。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.月光转换, 2)); //1 = 月光 2 = 旭日
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 魂骑士.日月轮转:
                    ret.statups.add(new Pair<>(MapleBuffStat.日月轮转, 1));
                    break;
//                case 魂骑士.日月轮转_月光洒落: //11121011 暴击概率x% 所有技能攻击次数增加2倍 伤害减少x%
//                    ret.statups.clear();
//                    ret.statups.add(new Pair<>(MapleBuffStat.伤害减少, (int) ret.level));
//                    ret.statups.add(new Pair<>(MapleBuffStat.月光转换, 1)); //1 = 月光 2 = 旭日
//                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
//                    break;
//                case 魂骑士.日月轮转_旭日: //11121012 伤害增加x% 攻击速度提升
//                    ret.statups.clear();
//                    ret.statups.add(new Pair<>(MapleBuffStat.月光转换, 2)); //1 = 月光 2 = 旭日
//                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.提高攻击速度)));
//                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.提升伤害百分比)));
//                    break;
                case 风灵使者.元素_风: //13001022 - 元素：风 - 召唤出绿色的风元素，获得其的力量。
                    ret.statups.add(new Pair<>(MapleBuffStat.元素属性, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 风灵使者.风精灵相助: //13101024 - 风精灵相助 - 获得风精灵的帮助，在战斗中抢先占据有利地位。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.无形箭弩, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 风灵使者.信天翁_新: //13111023 - 信天翁 - 借助传说的名弓信天翁的力量，将战斗能力提升到极限。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.信天翁, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 风灵使者.极限信天翁: //13120008 - 极限信天翁 - 将传说中的名弓信天翁的力量发挥到极限，和自己化为一体。\n需要技能：#c信天翁20级以上#
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.ignoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.信天翁, (int) ret.level));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.indieAsrR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.indieTerR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 风灵使者.风之祝福: //13121004 - 风之祝福 - 获得风之祝福，学会与风合为一体的方法。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.额外回避, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.命中增加, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.敏捷增加, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.indieMhpR)));
                    break;
                case 风灵使者.暴风灭世: //13121054 - 暴风灭世 - 召唤出暴风之力，获得惩治敌人的力量。
                    ret.statups.add(new Pair<>(MapleBuffStat.暴风灭世, ret.info.get(MapleStatInfo.x)));
                    break;
                case 奇袭者.元素_闪电: //15001022 - 元素：闪电 - 召唤出青白色的闪电元素，获得其的力量。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.元素属性, 1)); //主动BUFF是这个
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, 5)); //被动BUFF是这个默认为5点
                    break;
                case 奇袭者.漩涡: //15111023 - 漩涡 - 召唤出保护身体不受任何攻击伤害的漩涡。
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.asrR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.terR)));
                    break;
                case 奇袭者.极限铠甲: //15111024 - 极限铠甲 - 召唤出锋利坚硬的铠甲，同时发动攻击和防御。
                    ret.statups.add(new Pair<>(MapleBuffStat.伤害吸收, ret.info.get(MapleStatInfo.y)));
                    break;
                case 奇袭者.聚雷: //15121004 - 聚雷 - 凝聚周围散布的闪电力量，给自己的所有攻击赋予额外伤害。
                    ret.statups.add(new Pair<>(MapleBuffStat.影分身, ret.info.get(MapleStatInfo.x)));
                    break;
                case 奇袭者.台风:
                case 奇袭者.疾风: //15111022 - 疾风 - 将通过连续攻击累积的力量凝聚在一处，在一击中释放。可以与除了雷鸣与自我之外的所有技能连锁。
                    ret.overTime = true;
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.y)));
                    break;
                //-------------------------------------------------------------
                case 箭神.冰凤凰:
                case 神射手.火凤凰:
                case 机械师.磁场:
                case 双弩.精灵骑士:
                case 双弩.精灵骑士1:
                case 双弩.精灵骑士2:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                    break;
                case 机械师.支援波动器_H_EX:
                    ret.monsterStatus.put(MonsterStatus.速度, ret.info.get(MapleStatInfo.x));
                    ret.monsterStatus.put(MonsterStatus.物防, ret.info.get(MapleStatInfo.y));
                    break;
                case 机械师.战争机器_泰坦:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    break;
                case 黑骑士.灵魂助力:
                    ret.statups.add(new Pair<>(MapleBuffStat.灵魂助力, (int) ret.level));
                    break;
                case 黑骑士.灵魂助力震惊:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 21);
                    break;
                case 狂龙战士.石化:
                    ret.monsterStatus.put(MonsterStatus.速度, ret.info.get(MapleStatInfo.x));
                    break;
                case 神之子.伦娜之庇护: //100001268 - 伦娜之庇护 - 获得伦娜女神的庇护，在一定时间内将队员的所有属性提升一定百分比。
                    ret.statups.add(new Pair<>(MapleBuffStat.冒险岛勇士, ret.info.get(MapleStatInfo.x)));
                    break;
                case 神之子.圣洁之力: //100001263 - 圣洁之力 - 通过超越者的力量，增加周围队员的攻击力、防御力、抗性。\n#c再使用一次技能键就可以解除，不能和神圣迅捷一同使用。#
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.圣洁之力, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, ret.info.get(MapleStatInfo.indieMad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升物理防御力, ret.info.get(MapleStatInfo.indiePdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升魔法防御力, ret.info.get(MapleStatInfo.indieMdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.indieTerR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.indieAsrR)));
                    break;
                case 神之子.神圣迅捷: //100001264 - 神圣迅捷 - 通过超越者的力量，增加周围队员的攻击速度、移动速度、跳跃力、跳跃力、回避值、命中值。\n#c再使用一次技能键就可以解除，不能和圣洁之力一同使用。#
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.神圣迅捷, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加命中值, ret.info.get(MapleStatInfo.indieAcc)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加回避值, ret.info.get(MapleStatInfo.indieEva)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加跳跃力, ret.info.get(MapleStatInfo.indieJump)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    break;
                case 神之子.提速时刻_侦查:
                    ret.statups.add(new Pair<>(MapleBuffStat.提速时刻_侦查, 1));
                    break;
                case 神之子.提速时刻_战斗:
                    ret.statups.add(new Pair<>(MapleBuffStat.提速时刻_战斗, 1));
                    break;
                /**
                 * 超级技能BUFF处理
                 */
                case 冰雷.传说冒险家:
                case 侠盗.传说冒险家:
                case 双刀.传说冒险家:
                case 圣骑士.传说冒险家:
                case 神射手.传说冒险家:
                case 箭神.传说冒险家:
                case 冲锋队长.传说冒险家:
                case 船长.传说冒险家:
                case 隐士.传说冒险家:
                case 火毒.传说冒险家:
                case 神炮王.传说冒险家:
                case 主教.传说冒险家:
                case 英雄.传说冒险家:
                case 黑骑士.传说冒险家:
                case 龙的传人.传说冒险家:
                case 魂骑士.守护者之荣誉:
                case 炎术士.守护者之荣誉:
                case 风灵使者.守护者之荣誉:
                case 夜行者.守护者之荣誉:
                case 奇袭者.守护者之荣誉:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    break;
                case 主教.天使复仇:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.ignoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.天使复仇, ret.info.get(MapleStatInfo.mobCount))); //好像默认为1
                    ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, ret.info.get(MapleStatInfo.indieMad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    break;
                /*
                 * 林之灵BUFF状态
                 */
                case 林之灵.巨熊模式:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.模式变更, 1));
                    break;
                case 林之灵.雪豹模式:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.模式变更, 2));
                    break;
                case 林之灵.猛鹰模式:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.模式变更, 3));
                    break;
                case 林之灵.猫咪模式:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.模式变更, 4));
                    break;
                case 林之灵.冒险岛守护勇士:
                    ret.statups.add(new Pair<>(MapleBuffStat.冒险岛勇士, ret.info.get(MapleStatInfo.x)));
                    break;
                case 林之灵.伊卡之眼_强化:
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 林之灵.阿尔之好伙伴: //112120016 - 阿尔之好伙伴 - 与猫咪位于同一地图的队员可以获得更多经验值。(和#c神圣祈祷# 技能重复使用时，只适用更高的效果。)
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.经验获得, ret.info.get(MapleStatInfo.x)));
                    break;
                case 林之灵.阿尔之窃取: //112120017 - 阿尔之窃取 - 与猫咪位于同一地图的队员,其道具获得率提高。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.爆率增加, ret.info.get(MapleStatInfo.v)));
                    break;
                case 林之灵.阿尔之爪: //112120018 - 阿尔之爪 - 与猫咪位于同一地图的队员,其爆击率及爆击最小伤害增加。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击最小伤害, ret.info.get(MapleStatInfo.y)));
                    break;
                case 林之灵.阿尔之魅力_强化: //112120021 - 阿尔之魅力 强化 - 与猫咪位于同一地图的队员,其攻击力或魔法攻击力增加。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, ret.info.get(MapleStatInfo.indieMad)));
                    break;
                case 林之灵.阿尔之弱点把握: //112120022 - 阿尔之弱点把握 - 与猫咪处在同一地图上的队员可以无视敌人一定量的防御力。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.x))); //好像X 和Y 都是一样的
                    break;
                case 林之灵.阿尔之饱腹感: //112120023 - 阿尔之饱腹感 - 与猫咪位于同一地图的队员,最大HP及最大MP增加。
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 12000); //12秒的持续时间
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP, ret.info.get(MapleStatInfo.indieMmp)));
                    break;
                case 林之灵.红色卡片:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 林之灵.蓝色卡片:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.物理防御, ret.info.get(MapleStatInfo.pdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.魔法防御, ret.info.get(MapleStatInfo.mdd)));
                    break;
                case 林之灵.绿色卡片:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    break;
                case 林之灵.喵喵卡片:
                case 林之灵.金色卡片:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.物理防御, ret.info.get(MapleStatInfo.pdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.魔法防御, ret.info.get(MapleStatInfo.mdd)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 林之灵.集中打击:
                    ret.statups.add(new Pair<>(MapleBuffStat.葵花宝典, ret.info.get(MapleStatInfo.x) * 100 + ret.info.get(MapleStatInfo.mobCount)));
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击概率增加, ret.info.get(MapleStatInfo.z)));
                    ret.statups.add(new Pair<>(MapleBuffStat.最小爆击伤害, ret.info.get(MapleStatInfo.y)));
                    break;
                case 林之灵.舞力全开:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 林之灵.伊卡飞翔:
                case 80001242: //80001242 - 高空飞行 - 可以在一定时间内自由飞行。但只能在村庄中飞行。
                case 超能力者.心魂漫步:
                    ret.statups.add(new Pair<>(MapleBuffStat.高空飞行, 1));
                    break;
                case 80001427: //80001427 - 神速符文解放 - 解放后的符文释放出强大的力量！#c移动速度、跳跃力提高到最大值，攻击速度大幅提高。在一定时间内获得100%额外经验值。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加跳跃力, ret.info.get(MapleStatInfo.indieJump)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加移动速度, ret.info.get(MapleStatInfo.indieSpeed)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加经验值, ret.info.get(MapleStatInfo.indieExp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    break;
                case 80001428: //80001428 - 重生符文解放 - 解放后的符文释放出强大的力量！#c体力重生力提高到最大值，自己受到的所有伤害减少。在一定时间内获得100%额外经验值。
                    ret.statups.clear();
                    //ret.statups.add(new Pair<>(MapleBuffStat.重生符文, 799)); //这个地方是角色最大血量的10% 我暂时就这样处理算了
                    ret.statups.add(new Pair<>(MapleBuffStat.增加经验值, ret.info.get(MapleStatInfo.indieExp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.indieAsrR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.indieTerR)));
                    break;
                case 80001430: //80001430 - 崩溃符文解放 - 解放后的符文释放出强大的力量！#c消灭周围的所有怪物，自己的伤害提高50%。在一定时间内获得100%额外经验值。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加经验值, ret.info.get(MapleStatInfo.indieExp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 80001432: //80001432 - 破灭符文解放 - 解放后的符文释放出强大的力量！#c给敌人造成持续伤害，自己的攻击速度和伤害增加50%。在一定时间内获得100%额外经验值。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.增加经验值, ret.info.get(MapleStatInfo.indieExp)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 60011219: //60011219 - 灵魂契约 - 通过和爱丝卡达的契约，攻击力瞬间到达最大。
                case 80001155: //80001155 - 灵魂契约 - 通过与爱丝卡达的契约，瞬间令攻击力极大化。
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 神射手.三彩箭矢:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.三彩箭矢, 101010)); //默认满箭矢
                    break;
                case 隐月.幻灵招魂:
                case 夜行者.黑暗重生:
                    ret.statups.add(new Pair<>(MapleBuffStat.神秘运气, ret.info.get(MapleStatInfo.x)));
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.overTime = true;
                    break;
                case 隐月.九死一生:
                    ret.overTime = true;
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.九死一生, 1));
                    break;
                case 隐月.破力拳_冲击波:
                    ret.monsterStatus.put(MonsterStatus.速度, -ret.info.get(MapleStatInfo.y));
                    break;
                case 隐月.灵狐:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.灵狐, 1));
                    break;
                case 隐月.招魂结界:
                    ret.statups.add(new Pair<>(MapleBuffStat.招魂结界, ret.info.get(MapleStatInfo.x)));
                    break;
                case 冰雷.寒冰步:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.寒冰步, 1));
                    ret.monsterStatus.put(MonsterStatus.无法移动, 1);
                    break;
                case 船长.神速衔接:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.神速衔接, ret.info.get(MapleStatInfo.damR)));
                    break;
                case 黑骑士.重生契约:
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.重生契约, 27));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.cr)));
                    break;
                case 火毒.火焰灵气:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.overTime = true;
                    ret.statups.add(new Pair<>(MapleBuffStat.火焰灵气, 1));
                    break;
                case 箭神.鹰眼:
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.ignoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.鹰眼, ret.info.get(MapleStatInfo.x)));
                    break;
                case 隐士.流血剧毒:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.流血剧毒, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 冲锋队长.能量激发:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.能量激发, 1000));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, 1));
                    break;
                case 奇袭者.开天辟地:
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
//                    break;
                    //case 神之子.提速时刻_战斗:
                    //ret.statups.add(new Pair<>(MapleBuffStat.开天辟地, 1));
                    break;
                case 冲锋队长.混元归一:
                    ret.overTime = true;
                    ret.statups.add(new Pair<>(MapleBuffStat.混元归一, 1));
                    break;
                case 船长.不倦神酒:
                    ret.statups.add(new Pair<>(MapleBuffStat.不倦神酒, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.v)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.w)));
                    break;
                case 战神.连击无限制:
                    ret.statups.add(new Pair<>(MapleBuffStat.连击无限, 1));
                    break;
                case 爆莉萌天使.灵魂鼓舞:
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.indieIgnoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.尖兵神秘代码_BOSS伤害, ret.info.get(MapleStatInfo.indieBDR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.灵魂鼓舞, 1));
                    break;
                case 唤灵斗师.黑暗闪电:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗闪电, 1));
                    break;
                case 唤灵斗师.战斗大师:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.战斗大师, 2));
                    break;
                case 侠盗.幸运钱:
                    ret.statups.add(new Pair<>(MapleBuffStat.幸运钱, 1));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.x)));
                    break;
                case 双弩.小精灵祝福:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, ret.info.get(MapleStatInfo.indiePad)));
                    break;
                case 双刀.阿修罗:
                    ret.statups.add(new Pair<>(MapleBuffStat.阿修罗, ret.info.get(MapleStatInfo.time) * 1000));
                    break;
                case 双刀.隐形剑:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.隐形剑, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 恶魔猎手.蓝血:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.影分身, ret.info.get(MapleStatInfo.x)));
                    break;
                case 恶魔猎手.自由之墙:
                case 唤灵斗师.自由之墙:
                case 豹弩游侠.自由之墙:
                case 机械师.自由之墙:
                case 恶魔复仇者.自由之墙:
                case 双弩.英雄奥斯:
                case 幻影.英雄奥斯:
                case 战神.英雄奥斯:
                case 剑豪.姬儿的加持:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
                    break;
                case 幻影.最终审判:
                    ret.statups.add(new Pair<>(MapleBuffStat.最终审判, 1));
                    break;
                case 炎术士.引燃:
                    ret.statups.add(new Pair<>(MapleBuffStat.炎术引燃, 1));
                    break;
                case 炎术士.魔力回流:
                    ret.mpR = ret.info.get(MapleStatInfo.x) / 100.0;
                    break;
                case 炎术士.元素_火焰:
                case 炎术士.元素_火焰II:
                case 炎术士.元素_火焰III:
                case 炎术士.元素_火焰IV:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, ret.info.get(MapleStatInfo.x)));
                    break;
                case 炎术士.燃烧领域:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    break;
                case 炎术士.火凤凰:
                    ret.statups.add(new Pair<>(MapleBuffStat.火焰庇佑, 1));
                    break;
                case 炎术士.火凤凰_无敌状态:
                    ret.info.put(MapleStatInfo.time, 3 * 1000);
                    ret.statups.add(new Pair<>(MapleBuffStat.无敌状态, 1));
                    break;
                case 炎术士.火焰屏障:
                    ret.statups.add(new Pair<>(MapleBuffStat.火焰屏障, ret.info.get(MapleStatInfo.x)));
                    break;
                case 炎术士.火焰化身_狮子:
                case 炎术士.火焰化身_狐狸:
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, 1));
                    break;
                case 夜行者.元素_黑暗:
                    ret.statups.add(new Pair<>(MapleBuffStat.元素黑暗, 1));
                    ret.monsterStatus.put(MonsterStatus.元素黑暗, 1);
                    break;
                case 夜行者.影子侍从:
                    ret.statups.add(new Pair<>(MapleBuffStat.影子侍从, 1));
                    break;
                case 夜行者.影缝之术:
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, 100));
                    break;
                case 夜行者.黑暗领地:
                    ret.info.put(MapleStatInfo.time, 30 * 1000);
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击概率增加, ret.info.get(MapleStatInfo.indieCr)));
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.indieStance)));
                    // ret.hpR = -ret.info.get(MapleStatInfo.x) / 100.0;
                    //ret.statups.add(new Pair<>(MapleBuffStat.终极斩, ret.info.get(MapleStatInfo.y)));
                    break;
//                   ret.statups.add(new Pair<>(MapleBuffStat.黑暗姿势, 1));
//                   ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
////                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, 100));
////                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, 100));
////                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力百分比, 10));
//                    ret.statups.add(new Pair<>(MapleBuffStat.爆击概率增加, ret.info.get(MapleStatInfo.indieCr)));
//                ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.indieStance)));
////                    
//                   break;
                case 夜行者.黑暗幻影:
                    ret.statups.add(new Pair<>(MapleBuffStat.黑暗幻影, 1));
                    break;
                case 神射手.战斗准备:
                    ret.statups.add(new Pair<>(MapleBuffStat.战斗准备, 1));
                    break;
                case 龙的传人.天地无我:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.回避增加, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.命中增加, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加敏捷, ret.info.get(MapleStatInfo.x)));
                    break;
                case 龙的传人.千斤坠:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性, ret.info.get(MapleStatInfo.indieAllStat)));
                    ret.statups.add(new Pair<>(MapleBuffStat.暴击概率, ret.info.get(MapleStatInfo.indieCr)));
                    break;
                case 龙的传人.醉卧竹林:
                    ret.statups.clear();
                    ret.statups.add(new Pair<>(MapleBuffStat.醉卧竹林, ret.info.get(MapleStatInfo.w)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.z)));
                    break;
                     case 龙的传人.真气流贯:
                         ret.statups.clear();
                  ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                   ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.indieCr)));
                    
                   
                   
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.y)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.z)));
                          break;
                case 剑豪.武神招来:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加攻击力, ret.info.get(MapleStatInfo.padX)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加HP百分比, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加MP百分比, ret.info.get(MapleStatInfo.y)));
                    break;
                case 剑豪.刚健:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加状态异常抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加所有属性抗性, ret.info.get(MapleStatInfo.y)));
                    break;
                case 剑豪.无双十刃之型:
                    ret.statups.add(new Pair<>(MapleBuffStat.属性抗性, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.异常抗性, ret.info.get(MapleStatInfo.y)));
                    break;
                case 剑豪.厚积薄发:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.厚积薄发, 0));
                    break;
                case 剑豪.拔刀姿势:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.拔刀姿势, 1));
                    break;
                case 剑豪.基本姿势加成:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.x)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP百分比, 20));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, 20));
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.indieIgnoreMobpdpR)));
                    ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力百分比, 2));
                    break;
                case 剑豪.拔刀术加成:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, 35));
                    ret.statups.add(new Pair<>(MapleBuffStat.拔刀术加成, 2));
                    ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
                    ret.statups.add(new Pair<>(MapleBuffStat.尖兵神秘代码_BOSS伤害, 6));
                    break;
                case 剑豪.避柳:
                    ret.statups.add(new Pair<>(MapleBuffStat.避柳, ret.info.get(MapleStatInfo.damR)));
                    break;
                case 剑豪.迅速:
                    ret.statups.add(new Pair<>(MapleBuffStat.迅速, ret.info.get(MapleStatInfo.t)));
                    break;
                case 阴阳师.紫扇白狐:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 阴阳师.影朋_小白:
                    ret.statups.clear();
                    ret.info.put(MapleStatInfo.time, 600000);
                    ret.statups.add(new Pair<>(MapleBuffStat.影朋小白, 1));
                    break;
                case 阴阳师.花炎结界:
                case 阴阳师.花炎结界_4转:
                    ret.statups.add(new Pair<>(MapleBuffStat.花炎结界, 6));
                    break;
                case 阴阳师.幽玄气息:
                case 阴阳师.幽玄气息_4转:
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                    ret.statups.add(new Pair<>(MapleBuffStat.百分比无视防御, ret.info.get(MapleStatInfo.x)));
                    break;
                case 超能力者.心魂本能:
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.心魂本能, 1));
                    break;
                case 超能力者.心魂之盾2_扭曲:
                    ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.stanceProp)));
                case 超能力者.心魂之盾:
                    ret.statups.add(new Pair<>(MapleBuffStat.心魂之盾, ret.info.get(MapleStatInfo.er)));
                    break;
                case 超能力者.纯粹之力:
                    ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                    break;
                case 超能力者.精神强化:
                    ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力百分比, ret.info.get(MapleStatInfo.indieMadR)));
                    break;
                case 隐士.刺客标记:
                case 隐士.隐士标记:
                    ret.overTime = true;
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.刺客标记, 1));
                    break;
                case 魂骑士.落魂剑:
                    ret.monsterStatus.put(MonsterStatus.无法移动, 1);
                    ret.monsterStatus.put(MonsterStatus.额外伤害, ret.info.get(MapleStatInfo.x));
                    break;
                case 恶魔猎手.黑暗束缚:
                    ret.monsterStatus.put(MonsterStatus.眩晕, 1);//无法移动
                    ret.monsterStatus.put(MonsterStatus.持续伤害, ret.info.get(MapleStatInfo.dot));
                    break;
                case 夜行者.影子蝙蝠:
                    ret.overTime = true;
                    ret.info.put(MapleStatInfo.time, 2100000000);
                    ret.statups.add(new Pair<>(MapleBuffStat.影子蝙蝠, 1));
                    break;
                default:
                    break;
            }
            if (JobConstants.is新手职业(sourceid / 10000)) { //新手技能BUFF处理
                switch (sourceid % 10000) {
                    //angelic blessing: HACK, we're actually supposed to use the passives for atk/matk buff
                    case 1087: //黑天使
                        //ret.info.put(MapleStatInfo.time, 2100000000);
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_ATK, 10));
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_MATK, 10));
                        break;
                    case 1085: //大天使
                    case 1090: //大天使
                        //ret.info.put(MapleStatInfo.time, 2100000000);
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_ATK, 5));
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_MATK, 5));
                        break;
                    case 1179: //白天使
                        //ret.info.put(MapleStatInfo.time, 2100000000);
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_ATK, 12));
                        //ret.statups.add(new Pair<>(MapleBuffStat.ANGEL_MATK, 12));
                        break;
                    case 93: //潜力解放
                        ret.statups.add(new Pair<>(MapleBuffStat.潜力解放, 1));
                        break;
                    case 99:  //破冰巨剑
                    case 104: //蜗居诅咒
                        ret.monsterStatus.put(MonsterStatus.无法移动, 1);
                        ret.info.put(MapleStatInfo.time, ret.info.get(MapleStatInfo.time) * 2); // freezing skills are a little strange
                        break;
                    case 103: //霸天斧
                        ret.monsterStatus.put(MonsterStatus.眩晕, 1);
                        break;
                    case 1001: //团队治疗
                        if (ret.is潜入()) { //潜入BUFF
                            ret.statups.add(new Pair<>(MapleBuffStat.潜入状态, ret.info.get(MapleStatInfo.x)));
                        } else {
                            ret.statups.add(new Pair<>(MapleBuffStat.恢复效果, ret.info.get(MapleStatInfo.x)));
                        }
                        break;
                    case 1005: //英雄之回声
                        ret.statups.add(new Pair<>(MapleBuffStat.英雄回声, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 1010: //金刚霸体
                        ret.statups.add(new Pair<>(MapleBuffStat.金刚霸体, 1));
                        break;
                    case 1011: //狂暴战魂
                        ret.statups.add(new Pair<>(MapleBuffStat.狂暴战魂, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 1105: //冰骑士
                        ret.info.put(MapleStatInfo.time, 2100000000);
                        ret.statups.add(new Pair<>(MapleBuffStat.ICE_SKILL, 1));
                        break;
                    case 1026: //飞翔
                    case 1142: //飞行骑乘
                        ret.info.put(MapleStatInfo.time, 2100000000);
                        ret.statups.add(new Pair<>(MapleBuffStat.飞行骑乘, 1));
                        break;
                    case 8001: //好用的时空门
                        ret.statups.add(new Pair<>(MapleBuffStat.无形箭弩, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 8002: //好用的火眼晶晶
                        ret.statups.add(new Pair<>(MapleBuffStat.火眼晶晶, (ret.info.get(MapleStatInfo.x) << 8) + ret.info.get(MapleStatInfo.y) + ret.info.get(MapleStatInfo.criticaldamageMax)));
                        break;
                    case 8003: //好用的神圣之火
                        ret.statups.add(new Pair<>(MapleBuffStat.MAXHP, ret.info.get(MapleStatInfo.x)));
                        ret.statups.add(new Pair<>(MapleBuffStat.MAXMP, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 8004: //强化战斗命令
                        ret.statups.add(new Pair<>(MapleBuffStat.战斗命令, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 8005: //强化进阶祝福
                        ret.statups.clear();
                        ret.statups.add(new Pair<>(MapleBuffStat.进阶祝福, ret.info.get(MapleStatInfo.x)));
                        ret.statups.add(new Pair<>(MapleBuffStat.增加最大HP, ret.info.get(MapleStatInfo.indieMhp)));
                        ret.statups.add(new Pair<>(MapleBuffStat.增加最大MP, ret.info.get(MapleStatInfo.indieMmp)));
                        break;
                    case 8006: //强化极速领域
                        ret.statups.add(new Pair<>(MapleBuffStat.极速领域, ret.info.get(MapleStatInfo.x)));
                        break;
                    case 169://九死一生
                        ret.statups.add(new Pair<>(MapleBuffStat.九死一生, 1));
                        ret.info.put(MapleStatInfo.time, 2100000000);
                        ret.overTime = true;
                        break;
                }
            }
        } else {
            switch (sourceid) {
                case 2022746: //天使的祝福
                case 2022747: //黑天使的祝福
                case 2022823: //白天使的祝福
                    ret.statups.clear(); //no atk/matk
                    ret.statups.add(new Pair<>(MapleBuffStat.天使状态, 1));
                    int value = sourceid == 2022746 ? 5 : sourceid == 2022747 ? 10 : sourceid == 2022823 ? 12 : 0;
                    if (value > 0) {
                        ret.statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, value));
                        ret.statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, value));
                    }
                    break;
            }
        }
        if (ret.isPoison()) {
            ret.monsterStatus.put(MonsterStatus.持续伤害, 1);
        }
        if (ret.getSummonMovementType() != null) {
            ret.statups.add(new Pair<>(MapleBuffStat.召唤兽, 1));
        }
        if (ret.isMorph()) {
            ret.statups.add(new Pair<>(MapleBuffStat.变身效果, ret.getMorph()));
            if (ret.is狂龙变形() || ret.is狂龙超级变形()) {
                ret.statups.add(new Pair<>(MapleBuffStat.稳如泰山, ret.info.get(MapleStatInfo.prop)));
                ret.statups.add(new Pair<>(MapleBuffStat.爆击提升, ret.info.get(MapleStatInfo.cr)));
                ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
                ret.statups.add(new Pair<>(MapleBuffStat.提高攻击速度, ret.info.get(MapleStatInfo.indieBooster)));
            }
        }
        if (ret.is传说冒险家() || ret.is守护者之荣誉() || ret.is英雄奥斯() || ret.is自由之墙()) {
            ret.statups.clear();
            ret.statups.add(new Pair<>(MapleBuffStat.提升伤害百分比, ret.info.get(MapleStatInfo.indieDamR)));
            ret.statups.add(new Pair<>(MapleBuffStat.增加伤害最大值, ret.info.get(MapleStatInfo.indieMaxDamageOver)));
        }
        if (ret.is超越攻击状态()) {
            ret.statups.clear();
            ret.info.put(MapleStatInfo.time, 15000);
            ret.statups.add(new Pair<>(MapleBuffStat.超越攻击, 1));
        }
        ret.statups.trimToSize(); //去掉多余申请的内存空间
        return ret;
    }

    /**
     * 添加被动效果
     *
     * @param applyto 角色
     * @param obj 对象
     */
    public void applyPassive(MapleCharacter applyto, MapleMapObject obj) {
        /*判断技能是否有概率获得特定的增益效果*/
        if (makeChanceResult()) {
            /*sourceid 技能ID，此处单独引用 sourceid 无需判断是否为 skill*/
            switch (sourceid) {
                case 火毒.魔力吸收:
                case 冰雷.魔力吸收:
                case 主教.魔力吸收:
                    if (obj == null || obj.getType() != MapleMapObjectType.MONSTER) {
                        /*如果对象为空或者对象的类型不是怪物就直接返回*/
                        return;
                    }
                    MapleMonster mob = (MapleMonster) obj;
                    /*取当前怪物的状态信息，判断是否为BOSS*/
                    if (!mob.getStats().isBoss()) {
                        /* absorbMp 吸收MP的计算方法：技能X值除以100乘以怪物的最大MP，得到的结果如果小于或等于怪物当前的MP，就赋值给 absorbMp 反之 将怪物当前的mp赋值给 absorbMp*/
                        int absorbMp = Math.min((int) (mob.getMobMaxMp() * (getX() / 100.0)), mob.getMp());
                        /* 判断吸收MP的结果值是否大于0*/
                        if (absorbMp > 0) {
                            /*设置怪物当前的MP：怪物当前的MP减去被吸收的MP。*/
                            mob.setMp(mob.getMp() - absorbMp);
                            /*设置角色当前的MP：角色当前的MP加上吸收到的MP*/
                            applyto.getStat().setMp(applyto.getStat().getMp() + absorbMp, applyto);
                            /*发送给角色吸收MP的效果包*/
                            applyto.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sourceid, 1, applyto.getLevel(), level));
                            /*发送给角色当前所在地图其他玩家的效果广播包*/
                            applyto.getMap().broadcastMessage(applyto, EffectPacket.showBuffeffect(applyto.getId(), sourceid, 1, applyto.getLevel(), level), false);
                        }
                    }
                    break;
            }
        }
    }

    /**
     * 给角色BUFF
     *
     * @param chr - 角色
     * @return
     */
    public boolean applyTo(MapleCharacter chr) {
        return applyTo(chr, chr, true, null, getDuration(chr), false);
    }

    /**
     * 给角色BUFF
     *
     * @param chr 角色
     * @param passive 是否被动使用
     * @return
     */
    public boolean applyTo(MapleCharacter chr, boolean passive) {
        return applyTo(chr, chr, true, null, getDuration(chr), passive);
    }

    /**
     * 给角色BUFF
     *
     * @param chr - 角色
     * @param pos - 坐标范围
     * @return
     */
    public boolean applyTo(MapleCharacter chr, Point pos) {
        return applyTo(chr, chr, true, pos, getDuration(chr), false);
    }

    /**
     * 给角色BUFF
     *
     * @param chr - 角色
     * @param pos - 坐标范围
     * @param passive - 是否被动使用
     * @return
     */
    public boolean applyTo(MapleCharacter chr, Point pos, boolean passive) {
        return applyTo(chr, chr, true, pos, getDuration(chr), passive);
    }

    /**
     * 给角色BUFF
     *
     * @param applyfrom
     * @param applyto
     * @param primary
     * @param pos - 坐标范围
     * @param newDuration - 持续时间
     * @return
     */
    public boolean applyTo(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary, Point pos, int newDuration) {
        return applyTo(applyfrom, applyto, primary, pos, newDuration, false);
    }

    /**
     * 给角色BUFF
     *
     * @param applyfrom
     * @param applyto
     * @param primary
     * @param pos - 坐标范围
     * @param newDuration - 持续时间
     * @param passive - 是否被动使用
     * @return
     */
    public boolean applyTo(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary, Point pos, int newDuration, boolean passive) {
        if (applyfrom.isSkillCooling(sourceid)) {
            if (!skill) {
                return false;
            }
        }
        if (is群体治愈() && (applyfrom.getMapId() == 749040100 || applyto.getMapId() == 749040100 || applyfrom.getMap().isPvpMaps())) { //隐藏地图 - 纯净雪人栖息地
            applyfrom.getClient().getSession().write(MaplePacketCreator.enableActions());
            return false;
        } else if ((isSoaring_Mount() && applyfrom.getBuffedValue(MapleBuffStat.骑兽技能) == null) || (isSoaring_Normal() && !applyfrom.getMap().canSoar())) {
            applyfrom.getClient().getSession().write(MaplePacketCreator.enableActions());
            return false;
        } else if (sourceid == 双刀.傀儡召唤 && applyfrom.getBuffedValue(MapleBuffStat.影分身) == null) {
            applyfrom.getClient().getSession().write(MaplePacketCreator.enableActions());
            return false;
        }
        int hpchange = calcHPChange(applyfrom, primary);
        int mpchange = calcMPChange(applyfrom, primary);
        PlayerStats stat = applyto.getStat();
        if (primary) {
            if (info.get(MapleStatInfo.itemConNo) != 0 && !applyto.inPVP()) {
                if (!applyto.haveItem(info.get(MapleStatInfo.itemCon), info.get(MapleStatInfo.itemConNo), false, true)) {
                    applyto.getClient().getSession().write(MaplePacketCreator.enableActions());
                    return false;
                }
                MapleInventoryManipulator.removeById(applyto.getClient(), ItemConstants.getInventoryType(info.get(MapleStatInfo.itemCon)), info.get(MapleStatInfo.itemCon), info.get(MapleStatInfo.itemConNo), false, true);
            }
        } else if (!primary && is复活术()) {
            hpchange = stat.getMaxHp();
            applyto.setStance(0); //TODO fix death bug, player doesnt spawn on other screen
        }
        if (is净化() && makeChanceResult() || is勇士的意志()) {
            applyto.dispelDebuffs();
        } else if (cureDebuffs.size() > 0) {
            for (MapleDisease debuff : cureDebuffs) {
                applyfrom.dispelDebuff(debuff);
            }
        } else if (is负荷释放()) {
            if (applyto.get超越数值() < 20) {
                applyfrom.dropMessage(5, "该技能处于未激活状态。");
                return false;
            }
            applyto.cancelEffectFromBuffStat(MapleBuffStat.恶魔超越);
            hpchange = (stat.getMaxHp() / 100) * getX();
        } else if (is额外供给() || is永动引擎()) {
            applyto.addPowerCount(is额外供给() ? info.get(MapleStatInfo.x) : applyto.getPowerCountByJob());
        } else if (is龙之献祭()) {
            applyto.dispelSkill(黑骑士.灵魂助力);
            if (applyto.skillisCooling(黑骑士.神枪降临)) {
                applyto.removeCooldown(黑骑士.神枪降临);
                applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(黑骑士.神枪降临, 0));
            }
        }
        List<Pair<MapleStat, Long>> hpmpupdate = new ArrayList<>(2);
        if (hpchange != 0) {
            if (hpchange < 0 && (-hpchange) > stat.getHp() && !applyto.hasDisease(MapleDisease.僵尸)) {
                applyto.getClient().getSession().write(MaplePacketCreator.enableActions());
                return false;
            }
            stat.setHp(stat.getHp() + hpchange, applyto);
            hpmpupdate.add(new Pair<>(MapleStat.HP, (long) stat.getHp()));
        }
        if (mpchange != 0) {
            if (JobConstants.is超能力者(applyto.getJob())) {
                applyto.gainPP(mpchange);
            } else {
                if (mpchange < 0 && (-mpchange) > stat.getMp()) {
                    applyto.getClient().getSession().write(MaplePacketCreator.enableActions());
                    return false;
                }
                stat.setMp(stat.getMp() + mpchange, applyto);
                hpmpupdate.add(new Pair<>(MapleStat.MP, (long) stat.getMp()));
            }
        }
        applyto.getClient().getSession().write(MaplePacketCreator.updatePlayerStats(hpmpupdate, true, applyto));
        //尖兵使用技能需要的能量点数
        int powerchange = calcPowerChange(applyfrom);
        if (powerchange != 0) {
            if (powerchange < 0 && (-powerchange) > applyfrom.getSpecialStat().getPowerCount()) {
                applyfrom.dropMessage(5, "施展技能所需的支援能量不足。");
                return false;
            }
            applyto.addPowerCount(powerchange);
        }
        //战神使用技能减少连击点数
        int combochange = calcAranComboChange(applyfrom);
        if (combochange != 0) {
            if (combochange < 0 && (-combochange) > applyfrom.getAranCombo()) {
                applyfrom.dropMessage(5, "使用技能所需的连击数不足。");
                return false;
            }
            applyto.gainAranCombo(combochange, true);
        }
        if (expinc != 0) {
            applyto.gainExp(expinc, true, true, false);
//            applyto.getClient().getSession().write(EffectPacket.showSpecialEffect(0x17));
        } else if (isReturnScroll()) { //回城卷处理
            applyReturnScroll(applyto);
        } else if (useLevel > 0 && !skill) {
            applyto.setExtractor(new MapleExtractor(applyto, sourceid, useLevel * 50, 1440)); //no clue about time left
            applyto.getMap().spawnExtractor(applyto.getExtractor());
        } else if (is迷雾爆发()) {
            int i = info.get(MapleStatInfo.y);
            for (MapleMist mist : applyto.getMap().getAllMistsThreadsafe()) {
                if (mist.getOwnerId() == applyto.getId() && mist.getSourceSkill().getId() == 火毒.致命毒雾) {
                    if (mist.getSchedule() != null) {
                        mist.getSchedule().cancel(false);
                        mist.setSchedule(null);
                    }
                    if (mist.getPoisonSchedule() != null) {
                        mist.getPoisonSchedule().cancel(false);
                        mist.setPoisonSchedule(null);
                    }
                    applyto.getMap().broadcastMessage(MaplePacketCreator.removeMist(mist.getObjectId(), true));
                    applyto.getMap().removeMapObject(mist);
                    i--;
                    if (i <= 0) {
                        break;
                    }
                }
            }
        } else if (cosmetic > 0) {
            if (cosmetic >= 30000) {
                applyto.setHair(cosmetic);
                applyto.updateSingleStat(MapleStat.发型, cosmetic);
            } else if (cosmetic >= 20000) {
                applyto.setFace(cosmetic);
                applyto.updateSingleStat(MapleStat.脸型, cosmetic);
            } else if (cosmetic < 100) {
                applyto.setSkinColor((byte) cosmetic);
                applyto.updateSingleStat(MapleStat.皮肤, cosmetic);
            }
            applyto.equipChanged();
        } else if (bs > 0) {
            if (!applyto.inPVP()) {
                return false;
            }
            int xx = Integer.parseInt(applyto.getEventInstance().getProperty(String.valueOf(applyto.getId())));
            applyto.getEventInstance().setProperty(String.valueOf(applyto.getId()), String.valueOf(xx + bs));
            applyto.getClient().getSession().write(MaplePacketCreator.getPVPScore(xx + bs, false));
        } else if (info.get(MapleStatInfo.iceGageCon) > 0) {
            if (!applyto.inPVP()) {
                return false;
            }
            int x = Integer.parseInt(applyto.getEventInstance().getProperty("icegage"));
            if (x < info.get(MapleStatInfo.iceGageCon)) {
                return false;
            }
            applyto.getEventInstance().setProperty("icegage", String.valueOf(x - info.get(MapleStatInfo.iceGageCon)));
            applyto.getClient().getSession().write(MaplePacketCreator.getPVPIceGage(x - info.get(MapleStatInfo.iceGageCon)));
            applyto.applyIceGage(x - info.get(MapleStatInfo.iceGageCon));
        } else if (recipe > 0) {
            if (applyto.getSkillLevel(recipe) > 0 || applyto.getProfessionLevel((recipe / 10000) * 10000) < reqSkillLevel) {
                return false;
            }
            applyto.changeSingleSkillLevel(SkillFactory.getCraft(recipe), Integer.MAX_VALUE, recipeUseCount, recipeValidDay > 0 ? (System.currentTimeMillis() + recipeValidDay * 24L * 60 * 60 * 1000) : -1L);
        } else if (is斗气重生()) {
            int addCombo = info.get(MapleStatInfo.y); //默认增加的连击点数
            if (applyto.getTotalSkillLevel(战神.斗气重生_额外连击) > 0) {
                addCombo *= 2;
            }
            applyto.gainAranCombo(addCombo, true);
            applyto.setLastComboTime(System.currentTimeMillis());
//            applyto.getClient().getSession().write(MaplePacketCreator.rechargeCombo(applyto.getAranCombo())); // 盛大不再发送此数据包！
            SkillFactory.getSkill(战神.矛连击强化).getEffect(10).applyComboBuff(applyto, applyto.getAranCombo());
        } else if (is飞龙传动()) {
            MaplePortal portal = applyto.getMap().getPortal(Randomizer.nextInt(applyto.getMap().getPortals().size()));
            if (portal != null) {
                applyto.getClient().getSession().write(MaplePacketCreator.dragonBlink(portal.getId()));
                applyto.getMap().movePlayer(applyto, portal.getPosition());
                applyto.checkFollow();
            }
        } else if (is卡牌审判()) {
            if (applyto.getCardStack() < applyto.getCarteByJob()) {
                applyfrom.dropMessage(5, "必须等卡片值充满后，才能使用技能。");
                return false;
            }
            applyto.setCardStack(0);
        } else if (is狂龙变形()) {
            if (applyto.getMorphCount() < 700) {
                applyfrom.dropMessage(5, "变形值不足，无法使用该技能。");
                return false;
            }
            applyto.setMorphCount(0);
        } else if (is暗器伤人()) {
            MapleInventory use = applyto.getInventory(MapleInventoryType.USE);
            boolean itemz = false;
            int bulletConsume = info.get(MapleStatInfo.bulletConsume);
            for (int i = 0; i < use.getSlotLimit(); i++) { // impose order...
                Item item = use.getItem((byte) i);
                if (item != null) {
                    if (ItemConstants.is飞镖道具(item.getItemId()) && item.getQuantity() >= bulletConsume) {
                        MapleInventoryManipulator.removeFromSlot(applyto.getClient(), MapleInventoryType.USE, (short) i, (short) bulletConsume, false, true);
                        itemz = true;
                        break;
                    }
                }
            }
            if (!itemz) {
                return false;
            }
        } else if (is无限子弹()) {
            MapleInventory use = applyto.getInventory(MapleInventoryType.USE);
            boolean itemz = false;
            int bulletConsume = info.get(MapleStatInfo.bulletConsume);
            for (int i = 0; i < use.getSlotLimit(); i++) {
                Item item = use.getItem((byte) i);
                if (item != null) {
                    if (ItemConstants.is子弹道具(item.getItemId()) && item.getQuantity() >= bulletConsume) {
                        MapleInventoryManipulator.removeFromSlot(applyto.getClient(), MapleInventoryType.USE, (short) i, (short) bulletConsume, false, true);
                        itemz = true;
                        break;
                    }
                }
            }
            if (!itemz) {
                return false;
            }
        } else if (cp != 0 && applyto.getCarnivalParty() != null) {
            applyto.getCarnivalParty().addCP(applyto, cp);
            applyto.CPUpdate(false, applyto.getAvailableCP(), applyto.getTotalCP(), 0);
            for (MapleCharacter chr : applyto.getMap().getCharactersThreadsafe()) {
                chr.CPUpdate(true, applyto.getCarnivalParty().getAvailableCP(), applyto.getCarnivalParty().getTotalCP(), applyto.getCarnivalParty().getTeam());
            }
        } else if (nuffSkill != 0 && applyto.getParty() != null) {
            MCSkill skil = MapleCarnivalFactory.getInstance().getSkill(nuffSkill);
            if (skil != null) {
                MapleDisease dis = skil.getDisease();
                for (MapleCharacter chr : applyto.getMap().getCharactersThreadsafe()) {
                    if (applyto.getParty() == null || chr.getParty() == null || (chr.getParty().getPartyId() != applyto.getParty().getPartyId())) {
                        if (skil.targetsAll || Randomizer.nextBoolean()) {
                            if (dis == null) {
                                chr.dispel();
                            } else if (skil.getSkill() == null) {
                                chr.giveDebuff(dis, 1, 30000, dis.getDisease(), 1);
                            } else {
                                chr.giveDebuff(dis, skil.getSkill());
                            }
                            if (!skil.targetsAll) {
                                break;
                            }
                        }
                    }
                }
            }
        } else if ((effectedOnEnemy > 0 || effectedOnAlly > 0) && primary && applyto.inPVP()) {
            int types = Integer.parseInt(applyto.getEventInstance().getProperty("type"));
            if (types > 0 || effectedOnEnemy > 0) {
                for (MapleCharacter chr : applyto.getMap().getCharactersThreadsafe()) {
                    if (chr.getId() != applyto.getId() && (effectedOnAlly > 0 ? (chr.getTeam() == applyto.getTeam()) : (chr.getTeam() != applyto.getTeam() || types == 0))) {
                        applyTo(applyto, chr, false, pos, newDuration);
                    }
                }
            }
        } else if (mobSkill > 0 && mobSkillLevel > 0 && primary && applyto.inPVP()) {
            if (effectedOnEnemy > 0) {
                int types = Integer.parseInt(applyto.getEventInstance().getProperty("type"));
                for (MapleCharacter chr : applyto.getMap().getCharactersThreadsafe()) {
                    if (chr.getId() != applyto.getId() && (chr.getTeam() != applyto.getTeam() || types == 0)) {
                        chr.disease(mobSkill, mobSkillLevel);
                    }
                }
            } else {
                if (sourceid == 2910000 || sourceid == 2910001) { //red flag
                    applyto.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sourceid, 14, applyto.getLevel(), level));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showBuffeffect(applyto.getId(), sourceid, 13, applyto.getLevel(), level), false);
                    applyto.getClient().getSession().write(EffectPacket.showOwnCraftingEffect("UI/UIWindow2.img/CTF/Effect", 0, 0));
                    applyto.getMap().broadcastMessage(applyto, EffectPacket.showCraftingEffect(applyto.getId(), "UI/UIWindow2.img/CTF/Effect", 0, 0), false);
                    if (applyto.getTeam() == (sourceid - 2910000)) { //restore duh flag
                        if (sourceid == 2910000) {
                            applyto.getEventInstance().broadcastPlayerMsg(-7, "The Red Team's flag has been restored.");
                        } else {
                            applyto.getEventInstance().broadcastPlayerMsg(-7, "The Blue Team's flag has been restored.");
                        }
                        applyto.getMap().spawnAutoDrop(sourceid, applyto.getMap().getGuardians().get(sourceid - 2910000).left);
                    } else {
                        applyto.disease(mobSkill, mobSkillLevel);
                        if (sourceid == 2910000) {
                            applyto.getEventInstance().setProperty("redflag", String.valueOf(applyto.getId()));
                            applyto.getEventInstance().broadcastPlayerMsg(-7, "The Red Team's flag has been captured!");
                            applyto.getClient().getSession().write(EffectPacket.showOwnCraftingEffect("UI/UIWindow2.img/CTF/Tail/Red", 600000, 0));
                            applyto.getMap().broadcastMessage(applyto, EffectPacket.showCraftingEffect(applyto.getId(), "UI/UIWindow2.img/CTF/Tail/Red", 600000, 0), false);
                        } else {
                            applyto.getEventInstance().setProperty("blueflag", String.valueOf(applyto.getId()));
                            applyto.getEventInstance().broadcastPlayerMsg(-7, "The Blue Team's flag has been captured!");
                            applyto.getClient().getSession().write(EffectPacket.showOwnCraftingEffect("UI/UIWindow2.img/CTF/Tail/Blue", 600000, 0));
                            applyto.getMap().broadcastMessage(applyto, EffectPacket.showCraftingEffect(applyto.getId(), "UI/UIWindow2.img/CTF/Tail/Blue", 600000, 0), false);
                        }
                    }
                } else {
                    applyto.disease(mobSkill, mobSkillLevel);
                }
            }
        } else if (randomPickup != null && randomPickup.size() > 0) {
            MapleItemInformationProvider.getInstance().getItemEffect(randomPickup.get(Randomizer.nextInt(randomPickup.size()))).applyTo(applyto);
        }
        for (Entry<MapleTraitType, Integer> traitType : traits.entrySet()) {
            applyto.getTrait(traitType.getKey()).addExp(traitType.getValue(), applyto);
        }
        if (is机械传送门()) {
            int newId = 0;
            boolean applyBuff = false;
            if (applyto.getMechDoors().size() >= 2) {
                MechDoor remove = applyto.getMechDoors().remove(0);
                newId = remove.getId();
                applyto.getMap().broadcastMessage(MaplePacketCreator.removeMechDoor(remove, true));
                applyto.getMap().removeMapObject(remove);
            } else {
                for (MechDoor d : applyto.getMechDoors()) {
                    if (d.getId() == newId) {
                        applyBuff = true;
                        newId = 1;
                        break;
                    }
                }
            }
            MechDoor door = new MechDoor(applyto, new Point(pos == null ? applyto.getTruePosition() : pos), newId);
            applyto.getMap().spawnMechDoor(door);
            applyto.addMechDoor(door);
            applyto.getClient().getSession().write(MaplePacketCreator.mechPortal(door.getTruePosition()));
            if (!applyBuff) {
                return true; //do not apply buff until 2 doors spawned
            }
        }
        if (primary && availableMap != null) {
            for (Pair<Integer, Integer> e : availableMap) {
                if (applyto.getMapId() < e.left || applyto.getMapId() > e.right) {
                    applyto.getClient().getSession().write(MaplePacketCreator.enableActions());
                    return true;
                }
            }
        }

        // 防止眼花
        if (overTime && !is能量获得() && !is超越攻击()) {
            if (getSummonMovementType() != null) {
                boolean applyBuff = false;
                if (is全息力场支援() || is元素火焰()) {
                    applyBuff = applyfrom.hasSummonBySkill(sourceid);
                }
                if (applyBuff) {
                    if (applyfrom.isShowPacket()) {
                        applyfrom.dropSpouseMessage(0x0A, "开始 => applyBuffEffect ID: " + sourceid + " 持续时间: " + newDuration + " 是否群体: " + isPartyBuff() + " 是否被动: " + passive);
                    }
                    applyBuffEffect(applyfrom, applyto, primary, newDuration, passive);
                } else {
                    applySummonEffect(applyfrom, primary, pos, newDuration);
                }
            } else if (is三彩箭矢()) {
                applyArrowsBuff(applyfrom, false);
            } else {
                if (applyfrom.isShowPacket()) {
                    applyfrom.dropSpouseMessage(0x0A, "开始 => applyBuffEffect ID: " + sourceid + " 持续时间: " + newDuration + " 是否群体: " + isPartyBuff() + " 是否被动: " + passive);
                }
                applyBuffEffect(applyfrom, applyto, primary, newDuration, passive);
            }
        }

        if (skill) {
            removeMonsterBuff(applyfrom);
        }
        if (primary) {
            if ((overTime || is群体治愈()) && !is能量获得()) {
                applyPartyBuff(applyfrom, newDuration);
            }
            if (isMonsterBuff()) {
                applyMonsterBuff(applyfrom);
            }
        }
        if (is时空门()) {
            MapleDoor door = new MapleDoor(applyto, new Point(pos == null ? applyto.getTruePosition() : pos), sourceid); // 在当前地图中创建一个门
            if (door.getTownPortal() != null) {
                applyto.getMap().spawnDoor(door);
                applyto.addDoor(door);
                MapleDoor townDoor = new MapleDoor(door); // 创建临镇的门
                applyto.addDoor(townDoor);
                door.getTown().spawnDoor(townDoor);
                if (applyto.getParty() != null) { // 更新临镇的门
                    applyto.silentPartyUpdate();
                }
            } else {
                applyto.dropMessage(5, "村庄里已经没有可开启时空门的位置。");
            }
        } else if (isMist()) {
            Rectangle bounds = calculateBoundingBox(pos != null ? pos : applyfrom.getPosition(), applyfrom.isFacingLeft());
            MapleMist mist = new MapleMist(bounds, applyfrom, this);
            if (getCooldown(applyfrom) > 0) {
                applyfrom.getClient().getSession().write(MaplePacketCreator.skillCooldown(sourceid, getCooldown(applyfrom)));
                applyfrom.addCooldown(sourceid, System.currentTimeMillis(), getCooldown(applyfrom) * 1000);
            }
            applyfrom.getMap().spawnMist(mist, getDuration(), false);
        } else if (is伺机待发()) {
            for (MapleCoolDownValueHolder i : applyto.getCooldowns()) {
                if (i.skillId != 冲锋队长.伺机待发) {
                    applyto.removeCooldown(i.skillId);
                    applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(i.skillId, 0));
                }
            }
        } else if (is幸运钱()) {
            applyto.switchLuckyMoney(false);
        } else if (is狂龙战士的威严()) {
            for (MapleCoolDownValueHolder i : applyto.getCooldowns()) {
                if (i.skillId != 狂龙战士.狂龙战士的威严 && i.skillId != 狂龙战士.日珥 && i.skillId != 狂龙战士.终极变形_超级) {
                    applyto.removeCooldown(i.skillId);
                    applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(i.skillId, 0));
                }
            }
        } else if (is金钱炸弹()) {
            applyto.handleMesoExplosion();
        } else if (is能量激发()) {
            applyfrom.setEnergyCount(800);
        } else if (is美洲豹技能()) {
            applyfrom.getClient().getSession().write(MaplePacketCreator.美洲豹攻击效果(sourceid));
        }
        if (fatigueChange != 0 && applyto.getSummonedFamiliar() != null && (familiars == null || familiars.contains(applyto.getSummonedFamiliar().getFamiliar()))) {
            applyto.getSummonedFamiliar().addFatigue(applyto, fatigueChange);
        }
        /*
         * 随机获得金币
         */
        if (rewardMeso != 0) {
            applyto.gainMeso(rewardMeso, false);
        }
        /*
         * 随机获得道具
         */
        if (rewardItem != null && totalprob > 0) {
            for (Triple<Integer, Integer, Integer> reward : rewardItem) {
                if (MapleInventoryManipulator.checkSpace(applyto.getClient(), reward.left, reward.mid, "") && reward.right > 0 && Randomizer.nextInt(totalprob) < reward.right) { // Total prob
                    if (ItemConstants.getInventoryType(reward.left) == MapleInventoryType.EQUIP) {
                        Item item = MapleItemInformationProvider.getInstance().getEquipById(reward.left);
                        item.setGMLog("Reward item (effect): " + sourceid + " on " + FileoutputUtil.CurrentReadable_Date());
                        MapleInventoryManipulator.addbyItem(applyto.getClient(), item);
                    } else {
                        MapleInventoryManipulator.addById(applyto.getClient(), reward.left, reward.mid.shortValue(), "Reward item (effect): " + sourceid + " on " + FileoutputUtil.CurrentReadable_Date());
                    }
                }
            }
        }
        if (familiarTarget == 2 && applyfrom.getParty() != null && primary) { //to party
            for (MaplePartyCharacter mpc : applyfrom.getParty().getMembers()) {
                if (mpc.getId() != applyfrom.getId() && mpc.getChannel() == applyfrom.getClient().getChannel() && mpc.getMapid() == applyfrom.getMapId() && mpc.isOnline()) {
                    MapleCharacter player = applyfrom.getMap().getCharacterById(mpc.getId());
                    if (player != null) {
                        applyTo(applyfrom, player, false, null, newDuration);
                    }
                }
            }
        } else if (familiarTarget == 3 && primary) {
            for (MapleCharacter player : applyfrom.getMap().getCharactersThreadsafe()) {
                if (player.getId() != applyfrom.getId()) {
                    applyTo(applyfrom, player, false, null, newDuration);
                }
            }
        }
        if (skill && info.get(MapleStatInfo.onActive) > 0) {
            //停止技能激活
            applyto.getClient().getSession().write(MaplePacketCreator.skillNotActive(sourceid));
            //激活技能的使用
            applyto.getClient().getSession().write(MaplePacketCreator.skillActive());
            //技能激活的效果
//            applyto.getClient().getSession().write(EffectPacket.showSpecialEffect(0x32));
        }
        //如果角色是夜光3转或4转就自动BUFF生命潮汐
//        if (applyfrom.getJob() == 2711 || applyfrom.getJob() == 2712) {
//            applyfrom.check生命潮汐();
//        }
        applyfrom.getStat().recalcLocalStats(applyfrom);
        return true;
    }

    public boolean applySummonEffect(MapleCharacter applyto, boolean primary, Point pos, int newDuration) {
        SummonMovementType summonMovementType = getSummonMovementType();
        if (summonMovementType == null) {
            return false;
        }
        byte[] buff = null;
        int summonSkillId = sourceid;
        int localDuration = newDuration; //技能的持续时间
        List<Pair<MapleBuffStat, Integer>> localstatups = statups;
        if (applyto.isShowPacket()) {
            applyto.dropSpouseMessage(0x0A, "开始召唤召唤兽 - 召唤兽技能: " + summonSkillId + " 持续时间: " + newDuration);
        }
        //取消BUFF 不用发送封包
        if (sourceid != 机械师.磁场 && sourceid != 夜行者.影子蝙蝠_召唤兽) {
            applyto.cancelEffect(this, true, -1, localstatups);
        }
        if (is集合船员()) {
            int skilllevel = applyto.getTotalSkillLevel(船长.船员统帅);
            if (skilllevel > 0) {
                SkillFactory.getSkill(船长.船员统帅).getEffect(skilllevel).applyBuffEffect(applyto, applyto, primary, newDuration);
            }
        }

        if (this.sourceid == 双弩.精灵骑士) {
            summonSkillId += Randomizer.nextInt(3);
        }
        //设置和刷出召唤兽
        MapleSummon tosummon = new MapleSummon(applyto, summonSkillId, getLevel(), new Point(pos == null ? applyto.getTruePosition() : pos), summonMovementType, newDuration);
        if (!tosummon.is替身术()) { //如果召唤兽不是 替身术 之类 也就是可以攻击的
            applyto.getCheatTracker().resetSummonAttack();
        }

        //元素火焰刷新比较频繁，判断一下比较好
        if (!applyto.hasSummonBySkill(this.sourceid)) {
            applyto.getMap().spawnSummon(tosummon); //刷出召唤兽
            applyto.addSummon(tosummon); //在角色的召唤兽列表中添加 召唤兽信息
        }

        if (info.get(MapleStatInfo.hcSummonHp) > 0) { //默认设置的召唤兽的HP为 1
            tosummon.setSummonHp(info.get(MapleStatInfo.hcSummonHp)); //设置召唤兽的血量 也就是替身术的血量 多少后消失
        } else if (sourceid == 箭神.神箭幻影) { //这个技能召唤兽的血为 x
            tosummon.setSummonHp(info.get(MapleStatInfo.x));
        }
        //一些特殊的召唤兽处理
        if (sourceid == 风灵使者.钻石星尘) {
            applyto.dispelSkill(风灵使者.绿水晶花);
        } else if (sourceid == 双刀.傀儡召唤) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.影分身);
        } else if (is灵魂助力()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.灵魂助力, 1));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        } else if (is元素火焰()) {
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.召唤兽, 1));
//            int skilllevel = applyto.getTotalSkillLevel(sourceid);
//            if (skilllevel > 0) {
//                SkillFactory.getSkill(sourceid).getEffect(skilllevel).applyBuffEffect(applyto, applyto, primary, newDuration);
//            }
        } else if (sourceid == 炎术士.火焰化身_狮子 || sourceid == 炎术士.火焰化身_狐狸) {
            applyto.dispelSkill(sourceid == 炎术士.火焰化身_狮子 ? 炎术士.火焰化身_狐狸 : 炎术士.火焰化身_狮子);
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.百分比无视防御, applyto.getTotalSkillLevel(炎术士.火焰化身)));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        } else if (is全息力场支援()) {
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.召唤兽, 1));
        } else if (is影子侍从()) {
            localstatups.add(new Pair<>(MapleBuffStat.影子侍从, 1));
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.影子侍从, 1));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        } else if (is召唤美洲豹()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.召唤美洲豹, info.get(MapleStatInfo.criticaldamageMin) << 8 + info.get(MapleStatInfo.asrR)));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        } else if (is死亡契约()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.死亡契约, 0));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        }
        //设置BUFF技能的消失时间 和 注册角色的BUFF状态信息
        long startTime = System.currentTimeMillis();
        if (localDuration > 0) {
            CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, startTime, localstatups);
            ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, localDuration);
            applyto.registerEffect(this, startTime, schedule, localstatups, false, localDuration, applyto.getId());
        }
        //设置BUFF技能的冷却时间
        int cooldown = getCooldown(applyto);
        if (cooldown > 0) {
            if (sourceid == 机械师.磁场) {
                List<Integer> count = new ArrayList<>();
                List<MapleSummon> summons = applyto.getSummonsReadLock();
                try {
                    for (MapleSummon summon : summons) {
                        if (summon.getSkillId() == sourceid) {
                            count.add(summon.getObjectId());
                        }
                    }
                } finally {
                    applyto.unlockSummonsReadLock();
                }
                if (count.size() == 3) {
                    applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(sourceid, cooldown));
                    applyto.addCooldown(sourceid, startTime, cooldown * 1000);
                    applyto.getMap().broadcastMessage(MaplePacketCreator.teslaTriangle(applyto.getId(), count.get(0), count.get(1), count.get(2)));
                }
            } else {
                applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(sourceid, cooldown));
                applyto.addCooldown(sourceid, startTime, cooldown * 1000);
            }
        }
        if (buff != null) {
            applyto.getClient().getSession().write(buff);
        }
        return true;
    }

    /*
     * 回城卷处理
     */
    public boolean applyReturnScroll(MapleCharacter applyto) {
        if (moveTo != -1) {
            //applyto.getMap().getReturnMapId() != applyto.getMapId() || 暂时不要这个检测
            if (sourceid != 2031010 || sourceid != 2030021) { //特别课程邀请信 骑士卷轴 这个貌似还是检测不到 不管了
                MapleMap target = null;
                boolean nearest = false;
                if (moveTo == 999999999) {
                    nearest = true;
                    if (applyto.getMap().getReturnMapId() != 999999999) {
                        target = applyto.getMap().getReturnMap();
                    }
                } else {
                    target = ChannelServer.getInstance(applyto.getClient().getChannel()).getMapFactory().getMap(moveTo);
                    if (target.getId() == 931050500 && target != applyto.getMap()) {
                        applyto.changeMap(target, target.getPortal(0));
                        return true;
                    }
                    int targetMapId = target.getId() / 10000000;
                    int charMapId = applyto.getMapId() / 10000000;
                    if (targetMapId != 60 && charMapId != 61) {
                        if (targetMapId != 21 && charMapId != 20) {
                            if (targetMapId != 12 && charMapId != 10) {
                                if (targetMapId != 10 && charMapId != 12) {
                                    if (targetMapId != charMapId) {
                                        log.info("玩家 " + applyto.getName() + " 尝试回到一个非法的位置 (" + applyto.getMapId() + "->" + target.getId() + ")");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (target == applyto.getMap() || nearest && applyto.getMap().isTown()) {
                    return false;
                }
                if (target != null) {
                    applyto.changeMap(target, target.getPortal(0));
                    return true;
                }
            }
        }
        return false;
    }

    private boolean is灵魂之石() {
        return skill && sourceid == 龙神.灵魂之石;
    }

//    private boolean is天堂之门() {
//        return skill && sourceid == 牧师.天堂之门;
//    }

    /*
     * 开始处理组队BUFF效果
     */
    private void applyPartyBuff(MapleCharacter applyfrom, int newDuration) {
        if (is灵魂之石()) {
            if (applyfrom.getParty() != null) {
                int membrs = 0;
                for (MapleCharacter chr : applyfrom.getMap().getCharactersThreadsafe()) {
                    if (chr.getParty() != null && chr.getParty().getPartyId() == applyfrom.getParty().getPartyId() && chr.isAlive()) {
                        membrs++;
                    }
                }
                List<MapleCharacter> awarded = new ArrayList<>();
                while (awarded.size() < Math.min(membrs, info.get(MapleStatInfo.y))) {
                    for (MapleCharacter chr : applyfrom.getMap().getCharactersThreadsafe()) {
                        if (chr != null && chr.isAlive() && chr.getParty() != null && chr.getParty().getPartyId() == applyfrom.getParty().getPartyId() && !awarded.contains(chr) && Randomizer.nextInt(info.get(MapleStatInfo.y)) == 0) {
                            awarded.add(chr);
                        }
                    }
                }
                for (MapleCharacter chr : awarded) {
                    applyTo(applyfrom, chr, false, null, newDuration);
                    chr.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sourceid, 3, applyfrom.getLevel(), level));
                    chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), sourceid, 3, applyfrom.getLevel(), level), false);
                }
            }
        } else if (isPartyPassiveBuff() && applyfrom.getParty() != null) { //没有范围 检测全图地图的成员是否为组队成员
            for (MaplePartyCharacter partyMember : applyfrom.getParty().getMembers()) {
                MapleCharacter member = applyfrom.getMap().getCharacterById(partyMember.getId());
                if (member != null && member.getId() != applyfrom.getId() && member.isAlive()) {
                    applyTo(applyfrom, member, false, null, newDuration);
                }
            }
        } else if (isPartyBuff() && (applyfrom.getParty() != null || isGmBuff() || applyfrom.inPVP())) {
            Rectangle bounds = calculateBoundingBox(applyfrom.getTruePosition(), applyfrom.isFacingLeft());
            List<MapleMapObject> affecteds = applyfrom.getMap().getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.PLAYER));
            for (MapleMapObject affectedmo : affecteds) {
                MapleCharacter affected = (MapleCharacter) affectedmo;
                if (affected.getId() != applyfrom.getId() && (isGmBuff() || (applyfrom.inPVP() && affected.getTeam() == applyfrom.getTeam() && Integer.parseInt(applyfrom.getEventInstance().getProperty("type")) != 0) || (applyfrom.getParty() != null && affected.getParty() != null && applyfrom.getParty().getPartyId() == affected.getParty().getPartyId()))) {
                    boolean applyBuff = false;
                    if (is复活术() && !affected.isAlive()) {
                        applyBuff = true;
                    }
                    if (!is复活术() && affected.isAlive()) {
                        applyBuff = true;
                        if (is传说冒险家()) {
                            applyBuff = affected.getJob() >= 0 && affected.getJob() < 1000;
                        } else if (is守护者之荣誉()) {
                            applyBuff = affected.getJob() >= 1000 && affected.getJob() < 2000;
                        } else if (is英雄奥斯()) {
                            applyBuff = affected.getJob() >= 2000 && affected.getJob() < 3000;
                        } else if (is自由之墙()) {
                            applyBuff = affected.getJob() >= 3000 && affected.getJob() < 4000;
                        }
                    }
                    if (applyBuff) {
                        applyTo(applyfrom, affected, false, null, newDuration);
                        affected.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sourceid, 3, applyfrom.getLevel(), level));
                        affected.getMap().broadcastMessage(affected, EffectPacket.showBuffeffect(affected.getId(), sourceid, 3, applyfrom.getLevel(), level), false);
                    }
                    if (is伺机待发()) {
                        for (MapleCoolDownValueHolder i : affected.getCooldowns()) {
                            if (i.skillId != 冲锋队长.伺机待发) {
                                affected.removeCooldown(i.skillId);
                                affected.getClient().getSession().write(MaplePacketCreator.skillCooldown(i.skillId, 0));
                            }
                        }
                    }
                }
            }
        }
    }

    private void removeMonsterBuff(MapleCharacter applyfrom) {
        List<MonsterStatus> cancel = new ArrayList<>();
        switch (sourceid) {
            case 英雄.魔击无效:
            case 圣骑士.魔击无效:
            case 黑骑士.魔击无效:
            case 米哈尔.魔击无效:
                cancel.add(MonsterStatus.物防提升);
                cancel.add(MonsterStatus.魔防提升);
                cancel.add(MonsterStatus.物攻提升);
                cancel.add(MonsterStatus.魔攻提升);
                break;
            default:
                return;
        }
        Rectangle bounds = calculateBoundingBox(applyfrom.getTruePosition(), applyfrom.isFacingLeft());
        List<MapleMapObject> affected = applyfrom.getMap().getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER));
        int i = 0;
        for (MapleMapObject mo : affected) {
            if (makeChanceResult()) {
                for (MonsterStatus stat : cancel) {
                    ((MapleMonster) mo).cancelStatus(stat);
                }
            }
            i++;
            if (i >= info.get(MapleStatInfo.mobCount)) {
                break;
            }
        }
    }

    public void applyMonsterBuff(MapleCharacter applyfrom) {
        Rectangle bounds = calculateBoundingBox(applyfrom.getTruePosition(), applyfrom.isFacingLeft());
        boolean pvp = applyfrom.inPVP();
        MapleMapObjectType types = pvp ? MapleMapObjectType.PLAYER : MapleMapObjectType.MONSTER;
        List<MapleMapObject> affected = sourceid == 机械师.支援波动器_H_EX ? applyfrom.getMap().getMapObjectsInRange(applyfrom.getTruePosition(), Double.POSITIVE_INFINITY, Collections.singletonList(types)) : applyfrom.getMap().getMapObjectsInRect(bounds, Collections.singletonList(types));
        int i = 0;
        for (MapleMapObject mo : affected) {
            if (makeChanceResult()) {
                for (Entry<MonsterStatus, Integer> stat : getMonsterStati().entrySet()) {
                    if (pvp) {
                        MapleCharacter chr = (MapleCharacter) mo;
                        MapleDisease d = MonsterStatus.getLinkedDisease(stat.getKey());
                        if (d != null) {
                            chr.giveDebuff(d, stat.getValue(), getDuration(), d.getDisease(), 1);
                        }
                    } else {
                        MapleMonster mons = (MapleMonster) mo;
                        if (sourceid == 机械师.支援波动器_H_EX && mons.getStats().isBoss()) {
                            break;
                        }
                        mons.applyStatus(applyfrom, new MonsterStatusEffect(stat.getKey(), stat.getValue(), sourceid, null, false), isPoison(), isSubTime(sourceid) ? getSubTime() : getDuration(), true, this);
                    }
                }

//                //将全部怪物Buff修改为叠加模式
//                List<MonsterStatusEffect> pMonsterList = new ArrayList<>();
//                for (Entry<MonsterStatus, Integer> stat : getMonsterStati().entrySet()) {
//                    pMonsterList.add(new MonsterStatusEffect(stat.getKey(), stat.getValue(), sourceid, null, false, this.getDOTStack()));
//                }               
//                mons.applyStatus(applyfrom, pMonsterList, isPoison(), isSubTime(sourceid) ? getSubTime() : getDuration(), true, this);
                if (pvp && skill) {
                    MapleCharacter chr = (MapleCharacter) mo;
                    handleExtraPVP(applyfrom, chr);
                }
            }
            i++;
            if (i >= info.get(MapleStatInfo.mobCount) && sourceid != 机械师.支援波动器_H_EX) { //加速器：EX-7
                break;
            }
        }
    }

    public boolean isSubTime(int source) {
        switch (source) {
            case 圣骑士.压制术:
            case 双弩.精灵骑士:
            case 双弩.精灵骑士1:
            case 双弩.精灵骑士2:
            case 恶魔猎手.黑暗复仇:
            case 恶魔猎手.鬼泣:
            case 恶魔猎手.黑暗变形:
            case 狂龙战士.石化:
            case 魂骑士.灵魂之眼:
                return true;
        }
        return false;
    }

    public void handleExtraPVP(MapleCharacter applyfrom, MapleCharacter chr) {
        if (sourceid == 圣骑士.压制术 || (JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 104)) { //doom, threaten, snatch
            long starttime = System.currentTimeMillis();
            int localsourceid = sourceid;
            List<Pair<MapleBuffStat, Integer>> localstatups;
            if (sourceid == 圣骑士.压制术) {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.压制术, (int) level));
            } else {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.变身效果, info.get(MapleStatInfo.x)));
            }
            chr.getClient().getSession().write(BuffPacket.giveBuff(localsourceid, getDuration(), localstatups, this, chr));
            chr.registerEffect(this, starttime, BuffTimer.getInstance().schedule(new CancelEffectAction(chr, this, starttime, localstatups), isSubTime(sourceid) ? getSubTime() : getDuration()), localstatups, false, getDuration(), applyfrom.getId());
        }
    }

    public void handleBurnAreas(MapleCharacter applyfrom, MapleCharacter chr) {
        if (sourceid == 炎术士.燃烧领域) {
            long starttime = System.currentTimeMillis();
            chr.getClient().getSession().write(BuffPacket.giveBuff(sourceid, getDuration(), statups, this, chr));
            chr.registerEffect(this, starttime, BuffTimer.getInstance().schedule(new CancelEffectAction(chr, this, starttime, statups), isSubTime(sourceid) ? getSubTime() : getDuration()), statups, false, getDuration(), applyfrom.getId());
        }
    }

    public Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        return calculateBoundingBox(posFrom, facingLeft, lt, rb, info.get(MapleStatInfo.range));
    }

    public Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft, int addedRange) {
        return calculateBoundingBox(posFrom, facingLeft, lt, rb, info.get(MapleStatInfo.range) + addedRange);
    }

    public static Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft, Point lt, Point rb, int range) {
        if (lt == null || rb == null) {
            return new Rectangle((facingLeft ? (-200 - range) : 0) + posFrom.x, (-100 - range) + posFrom.y, 200 + range, 100 + range);
        }
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x - range, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x + range, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        return new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
    }

    public final Rectangle calculateBoundingBox(final Point posFrom, final boolean facingLeft, boolean isLeft) {
        if (lt == null || rb == null) {
            return new Rectangle(posFrom.x, posFrom.y, facingLeft ? 1 : -1, 1);
        }
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            //myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        if (isLeft) {
            return new Rectangle(posFrom.x, posFrom.y, myrb.x - mylt.x, myrb.y - mylt.y);
        }
        return new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
    }

    public double getMaxDistanceSq() { //lt = infront of you, rb = behind you; not gonna distanceSq the two points since this is in relative to player position which is (0,0) and not both directions, just one
        int maxX = Math.max(Math.abs(lt == null ? 0 : lt.x), Math.abs(rb == null ? 0 : rb.x));
        int maxY = Math.max(Math.abs(lt == null ? 0 : lt.y), Math.abs(rb == null ? 0 : rb.y));
        return (maxX * maxX) + (maxY * maxY);
    }

    public void setDuration(int d) {
        this.info.put(MapleStatInfo.time, d);
    }

    /*
     * 切换频道或者进入商城出来后 给角色BUFF 不需要发送封包
     */
    public void silentApplyBuff(MapleCharacter chr, long starttime, int localDuration, List<Pair<MapleBuffStat, Integer>> statup, int chrId) {
        int maskedDuration = 0;
        int newDuration = (int) ((starttime + localDuration) - System.currentTimeMillis());
        if (is终极无限()) {
            maskedDuration = alchemistModifyVal(chr, 4000, false);
        }
        ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(new CancelEffectAction(chr, this, starttime, statup), maskedDuration > 0 ? maskedDuration : newDuration);
        chr.registerEffect(this, starttime, schedule, statup, true, localDuration, chrId);
        SummonMovementType summonMovementType = getSummonMovementType();
        if (summonMovementType != null) {
            MapleSummon summon = new MapleSummon(chr, this, chr.getTruePosition(), summonMovementType, newDuration);
            if (!summon.is替身术()) {
                chr.getCheatTracker().resetSummonAttack();
                chr.getMap().spawnSummon(summon);
                chr.addSummon(summon);
                summon.addSummonHp(info.get(MapleStatInfo.x).shortValue());
                if (is灵魂助力()) {
                    summon.addSummonHp((short) 1);
                }
            }
        }
    }

    public void applyComboBuff(MapleCharacter applyto, int combo) {
        int combocount = Math.min(combo, 9999);
        int localDuration = info.get(MapleStatInfo.time); //当前设置的为 2100000000秒
        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.矛连击强化, combocount));
        applyto.getClient().getSession().write(BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto));
        long starttime = System.currentTimeMillis();
        applyto.cancelEffect(this, true, -1, stat);
        //CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime, stat);
        //ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, maskedDuration > 0 ? maskedDuration : localDuration);
        applyto.registerEffect(this, starttime, null, applyto.getId());
    }

    /*
     * 注册能量获得BUFF效果
     */
    public void applyEnergyBuff(MapleCharacter applyto) {
        applyEnergyBuff(applyto, info.get(MapleStatInfo.x));
    }

    public void applyEnergyBuff(MapleCharacter applyto, int senergy) {
        long startTime = System.currentTimeMillis();
        int localDuration = info.get(MapleStatInfo.time); //当前设置的为 2100000000秒
        int energy = senergy;
        List<Pair<MapleBuffStat, Integer>> localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.能量获得, energy));
        applyto.cancelEffect(this, true, -1, localstatups);
        CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, startTime, localstatups);
        ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, localDuration);
        applyto.registerEffect(this, startTime, schedule, localstatups, false, localDuration, applyto.getId());
        //发送显示BUFF效果
        applyto.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sourceid, 3, applyto.getLevel(), level));
        applyto.getClient().getSession().write(BuffPacket.giveEnergyCharge(energy, sourceid, false, false));
        //发送显示给其他玩家看的效果
        applyto.getMap().broadcastMessage(applyto, EffectPacket.showBuffeffect(applyto.getId(), sourceid, 3, applyto.getLevel(), level), false);
        applyto.getMap().broadcastMessage(applyto, BuffPacket.showEnergyCharge(applyto.getId(), energy, sourceid, false, false), false);
    }

    /*
     * 给角色超越攻击的BUFF效果
     */
    public void applyTranscendBuff(MapleCharacter applyto) {
        long startTime = System.currentTimeMillis();
        int localDuration = info.get(MapleStatInfo.time); //当前设置的为 15秒 也就是15000毫秒
        int skillId = GameConstants.getLinkedAttackSkill(sourceid); //取当前技能的连接技能ID
        int buffSourceId = applyto.getBuffSource(MapleBuffStat.超越攻击); //取当前BUFF的技能ID没有返回 -1
        if (buffSourceId > -1 && buffSourceId != skillId) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.超越攻击);
        }
        MapleStatEffect effect = SkillFactory.getSkill(skillId).getEffect(applyto.getTotalSkillLevel(skillId));
        int combos = applyto.getBuffedIntValue(MapleBuffStat.超越攻击);
        if (combos == 0) {
            combos = 1;
        } else {
            combos++;
        }
        if (combos > 4) {
            combos = 4;
        }
        //设置BUFF的状态和数值
        List<Pair<MapleBuffStat, Integer>> localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.超越攻击, combos));
        //取消以前的BUFF效果
        applyto.cancelEffect(effect, true, -1, localstatups);
        //设置新BUFF的线程处理
        CancelEffectAction cancelAction = new CancelEffectAction(applyto, effect, startTime, localstatups);
        ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, localDuration);
        //注册BUFF效果
        applyto.registerEffect(effect, startTime, schedule, localstatups, false, localDuration, applyto.getId());
        //发送显示BUFF效果
        applyto.getClient().getSession().write(BuffPacket.giveBuff(skillId, localDuration, localstatups, effect, applyto));
    }

    /*
     * 给角色添加 三彩箭矢 BUFF效果
     */
    public void applyArrowsBuff(MapleCharacter applyto, boolean reset) {
        long startTime = System.currentTimeMillis();
        int localDuration = info.get(MapleStatInfo.time); //当前设置的为 2100000000秒
        int mode = applyto.getSpecialStat().getArrowsMode(); //默认的模式为 -1
        mode++;
        if (mode > 2 || mode == -1) {
            mode = 0;
        }
        int arrows = applyto.getBuffedIntValue(MapleBuffStat.三彩箭矢); //当前的箭矢数量
        if (arrows == 0 || reset) {
            mode = 0;
            arrows = 101010;
            Skill skil = SkillFactory.getSkill(神射手.进阶箭筒);
            if (applyto.getSkillLevel(skil) > 0) {
                MapleStatEffect effect = skil.getEffect(applyto.getSkillLevel(skil));
                if (effect != null) {
                    arrows = 10000 * effect.getY() + 100 * effect.getY() + effect.getZ();
                }
            }
        }
        applyto.getSpecialStat().setArrowsMode(mode);
        List<Pair<MapleBuffStat, Integer>> localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.三彩箭矢, arrows));
        applyto.cancelEffect(this, true, -1, localstatups);
        CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, startTime, localstatups);
        ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, localDuration);
        applyto.registerEffect(this, startTime, schedule, localstatups, false, localDuration, applyto.getId());
        //发送显示BUFF效果
        applyto.getClient().getSession().write(BuffPacket.giveBuff(sourceid, localDuration, localstatups, this, applyto));
        //初始化箭矢数量
        int newArrows = 0x0A;
        if (mode == 0) {
            newArrows = arrows / 10000;
        } else if (mode == 1) {
            newArrows = arrows % 10000 / 100;
        } else if (mode == 2) {
            newArrows = arrows % 100;
        }
        applyto.getClient().getSession().write(EffectPacket.showArrowsEffect(sourceid, applyto.getSpecialStat().getArrowsMode(), newArrows)); //冲入 10只箭矢
    }

    public void applyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary, int newDuration) {
        applyBuffEffect(applyfrom, applyto, primary, newDuration, false);
    }

    public void applyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, boolean primary, int newDuration, boolean passive) {
        int localDuration = newDuration;
        if (primary) {
            localDuration = Math.max(newDuration, alchemistModifyVal(applyfrom, localDuration, false));
        }
        if (!primary && isRepeatEffect()) {
            localDuration = 180000;
        }
        List<Pair<MapleBuffStat, Integer>> localstatups = statups, maskedStatups = null;
        boolean normal = true; //是否为正常没有修改的BUFF
        boolean showEffect = primary; //是否显示BUFF状态效果
        int maskedDuration = 0; //这个是设置1个自动BUFF的意思 也就是注册的消失的时间 但是BUFF的持续时间是另外1个 也就是1个间隔的意思
        byte[] buff = null;
        byte[] foreignbuff = null;

//        MapleSkillEffectApp.effectEventData effectEventData = new MapleSkillEffectApp.effectEventData(localstatups, localDuration);
//        MapleSkillEffectApp.applyBuffEffect(this, applyfrom, applyto, primary, effectEventData);
        switch (sourceid) {
            case 冲锋队长.幸运骰子:
            case 船长.幸运骰子:
            case 神炮王.幸运骰子:
            case 机械师.幸运骰子:
                int dice = Randomizer.nextInt(6) + 1;
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), sourceid, dice, -1, level), false);
                applyto.getClient().getSession().write(EffectPacket.showOwnDiceEffect(sourceid, dice, -1, level));
                if (dice <= 1) {
                    applyto.dropMessage(-10, "幸运骰子技能失败。");
                    return;
                }
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.幸运骰子, dice));
                applyto.dropMessage(-10, "幸运骰子技能发动了[" + dice + "]号效果。");
                applyto.getClient().getSession().write(BuffPacket.giveDice(dice, sourceid, localDuration, localstatups));
                normal = false;
                showEffect = false;
                break;
            case 冲锋队长.双幸运骰子:
            case 船长.双幸运骰子:
            case 神炮王.双幸运骰子:
            case 机械师.双幸运骰子:
                int dice1 = Randomizer.nextInt(6) + 1;
                int dice2 = makeChanceResult() ? (Randomizer.nextInt(6) + 1) : 0;
                applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), sourceid, dice1, dice2 > 0 ? -1 : 0, level), false);
                applyto.getClient().getSession().write(EffectPacket.showOwnDiceEffect(sourceid, dice1, dice2 > 0 ? -1 : 0, level));
                if (dice1 <= 1 && dice2 <= 1) {
                    applyto.dropMessage(-10, "双幸运骰子技能失败。");
                    return;
                }
                int buffid = dice1 == dice2 ? (dice1 * 100) : (dice1 <= 1 ? dice2 : (dice2 <= 1 ? dice1 : (dice1 * 10 + dice2)));
                if (buffid >= 100) {
                    applyto.dropMessage(-10, "双幸运骰子技能发动了[" + (buffid / 100) + "]号效果。");
                } else if (buffid >= 10) {
                    applyto.dropMessage(-10, "双幸运骰子技能发动了[" + (buffid / 10) + "]号效果。");
                    applyto.dropMessage(-10, "双幸运骰子技能发动了[" + (buffid % 10) + "]号效果。");
                } else {
                    applyto.dropMessage(-10, "双幸运骰子技能发动了[" + buffid + "]号效果。");
                }
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.幸运骰子, buffid));
                applyto.getClient().getSession().write(BuffPacket.giveDice(buffid, sourceid, localDuration, localstatups));
                normal = false;
                showEffect = false;
                break;

        }
        if (is卡牌审判()) {
            int dice = Randomizer.nextInt(sourceid == 幻影.卡牌审判 ? 2 : 4) + 1;
            int theStat = info.get(MapleStatInfo.v);
            switch (dice) {
                case 1: //爆击概率增加 %
                    theStat = info.get(MapleStatInfo.v);
                    break;
                case 2: //物品掉落率增加 %
                    theStat = info.get(MapleStatInfo.w);
                    break;
                case 3: //状态异常抗性/属性抗性分别增加 %
                    theStat = info.get(MapleStatInfo.x) * 100 + info.get(MapleStatInfo.y);
                    break;
                case 4: //防御力增加 100%
                    theStat = info.get(MapleStatInfo.s);
                    break;
                case 5: //攻击时，将伤害的x%转换为HP
                    theStat = info.get(MapleStatInfo.z);
                    break;
            }
            applyto.getMap().broadcastMessage(applyto, EffectPacket.showDiceEffect(applyto.getId(), sourceid, dice, -1, level), false);
            applyto.getClient().getSession().write(EffectPacket.showOwnDiceEffect(sourceid, dice, -1, level));
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.卡牌审判, dice));
            applyto.getClient().getSession().write(BuffPacket.give卡牌审判(sourceid, localDuration, localstatups, theStat));
            normal = false;
            showEffect = false;
        } else if (is极速领域()) {
            buff = BuffPacket.givePirateBuff(statups, localDuration / 1000, sourceid);
        } else if (is喵喵卡片()) {
            int dice = Randomizer.rand(1, sourceid == 林之灵.喵喵金卡 ? 4 : 3);
            int buffid = sourceid == 林之灵.喵喵金卡 ? 林之灵.金色卡片 : 林之灵.红色卡片;
            switch (dice) {
                case 1:
                    buffid = 林之灵.红色卡片;
                    applyto.dropMessage(-10, "喵喵卡片抽取到 红色卡片 效果。");
                    break;
                case 2:
                    buffid = 林之灵.蓝色卡片;
                    applyto.dropMessage(-10, "喵喵卡片抽取到 蓝色卡片 效果。");
                    break;
                case 3:
                    buffid = 林之灵.绿色卡片;
                    applyto.dropMessage(-10, "喵喵卡片抽取到 绿色卡片 效果。");
                    break;
                case 4:
                    buffid = 林之灵.金色卡片;
                    applyto.dropMessage(-10, "喵喵卡片抽取到 金色卡片 效果。");
                    break;
            }
            int skillLevel = buffid == 林之灵.金色卡片 ? applyto.getTotalSkillLevel(林之灵.喵喵金卡) : applyto.getTotalSkillLevel(林之灵.喵喵卡片);
            if (skillLevel > 0) {
                SkillFactory.getSkill(buffid).getEffect(skillLevel).applyTo(applyto);
            }
            int cooldown = getCooldown(applyto);
            if (cooldown > 0 && !applyto.skillisCooling(sourceid)) {
                applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(sourceid, cooldown));
                applyto.addCooldown(sourceid, System.currentTimeMillis(), cooldown * 1000);
            }
            return;
        } else if (is愤怒之火()) {
            if (!primary) { //队员没有愤怒之火反射伤害效果
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.增加物理攻击力, info.get(MapleStatInfo.indiePad)));
            }
        } else if (is舞力全开()) {
            if (!primary) { //队员没有无敌状态
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.提升伤害百分比, info.get(MapleStatInfo.indieDamR)));
            }
        } else if (is弓手火眼晶晶()) {
            if (applyfrom.getTotalSkillLevel(神射手.火眼晶晶_神圣暴击) > 0) {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.火眼晶晶, ((info.get(MapleStatInfo.x) + 5) << 8) + info.get(MapleStatInfo.y)));
            }
        } else if (is极限射箭()) {
            if (applyto.getBuffedValue(MapleBuffStat.极限射箭) != null) {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.极限射箭);
                return;
            }
        } else if (is疾驰()) {
            buff = BuffPacket.givePirateBuff(statups, localDuration / 1000, sourceid);
            foreignbuff = BuffPacket.giveForeignDash(statups, localDuration / 1000, applyto.getId(), sourceid);
        } else if (is导航辅助()) {
            if (applyto.getFirstLinkMid() > 0) {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.导航辅助);
                buff = BuffPacket.give导航辅助(sourceid, applyto.getFirstLinkMid(), 1);
            } else {
                return;
            }
        } else if (is神秘瞄准术()) {
            if (applyto.getFirstLinkMid() > 0 && !applyto.getAllLinkMid().isEmpty()) {
                buff = BuffPacket.give神秘瞄准术(applyto.getAllLinkMid().size() * info.get(MapleStatInfo.x), sourceid, localDuration);
            } else {
                return;
            }
        } else if (is神圣之火()) {
            localstatups = new ArrayList<>();
            int addHp = applyfrom.getTotalSkillLevel(黑骑士.神圣之火_额外体力点数) > 0 ? 20 : 0;
            int addMp = applyfrom.getTotalSkillLevel(黑骑士.神圣之火_额外魔法点数) > 0 ? 20 : 0;
            localstatups.add(new Pair<>(MapleBuffStat.MAXHP, info.get(MapleStatInfo.x) + addHp));
            localstatups.add(new Pair<>(MapleBuffStat.MAXMP, info.get(MapleStatInfo.x) + addMp));
        } else if (is潜入()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.潜入状态, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is隐身术()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.隐身术, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is神圣魔法盾()) {
            if (applyfrom.getTotalSkillLevel(主教.神圣魔法盾_额外格挡) > 0) { //格外增加2次概率
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.神圣魔法盾, info.get(MapleStatInfo.x) + 2));
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.神圣魔法盾, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (sourceid == 双弩.水盾) {
            int add_X = applyfrom.getTotalSkillLevel(双弩.水盾_强化) > 0 ? 10 : 0;
            int add_terR = applyfrom.getTotalSkillLevel(双弩.水盾_抗性提升1) > 0 ? 10 : 0;
            int add_asrR = applyfrom.getTotalSkillLevel(双弩.水盾_抗性提升2) > 0 ? 10 : 0;
            if (add_terR > 0 || add_asrR > 0 || add_X > 0) {
                localstatups = new ArrayList<>();
                localstatups.add(new Pair<>(MapleBuffStat.异常抗性, info.get(MapleStatInfo.terR) + add_terR));
                localstatups.add(new Pair<>(MapleBuffStat.属性抗性, info.get(MapleStatInfo.asrR) + add_asrR));
                localstatups.add(new Pair<>(MapleBuffStat.伤害吸收, info.get(MapleStatInfo.x) + add_X));
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.伤害吸收, info.get(MapleStatInfo.x)));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (sourceid == 双弩.精神注入) {
            List<Pair<MapleBuffStat, Integer>> stat = new ArrayList<>();
            stat.add(new Pair<>(MapleBuffStat.精神连接, info.get(MapleStatInfo.x)));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (sourceid == 圣骑士.雷鸣冲击) {
            if (applyto.getBuffedValue(MapleBuffStat.属性攻击) != null && applyto.getBuffSource(MapleBuffStat.属性攻击) != sourceid) {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.雷鸣冲击, 1));
            }
            buff = BuffPacket.giveBuff(sourceid, localDuration, localstatups, this, applyto);
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.属性攻击, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is元气恢复()) {
            int healRate = Math.min(50, applyto.getBuffedIntValue(MapleBuffStat.元气恢复) + 10);
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.元气恢复, healRate));
        } else if (sourceid == 圣骑士.祝福护甲) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.祝福护甲, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is斗气集中()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.斗气集中, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (sourceid == 神射手.无形箭 || sourceid == 箭神.无形箭) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.无形箭弩, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is进阶祝福()) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.牧师祝福);
            int add_indiePad = applyfrom.getTotalSkillLevel(主教.进阶祝福_额外伤害) > 0 ? 20 : 0;
            int add_indieMhp = applyfrom.getTotalSkillLevel(主教.进阶祝福_额外点数) > 0 ? 1000 : 0;
            int add_bossDamage = applyfrom.getTotalSkillLevel(主教.进阶祝福_BOSS杀手) > 0 ? 10 : 0;
            localstatups = new ArrayList<>();
            localstatups.add(new Pair<>(MapleBuffStat.进阶祝福, (int) level));
            if (add_indiePad > 0) {
                localstatups.add(new Pair<>(MapleBuffStat.增加物理攻击力, add_indiePad));
                localstatups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, add_indiePad));
            }
            localstatups.add(new Pair<>(MapleBuffStat.增加最大HP, info.get(MapleStatInfo.indieMhp) + add_indieMhp));
            localstatups.add(new Pair<>(MapleBuffStat.增加最大MP, info.get(MapleStatInfo.indieMmp) + add_indieMhp));
            if (add_bossDamage > 0) {
                localstatups.add(new Pair<>(MapleBuffStat.尖兵神秘代码_BOSS伤害, add_bossDamage));
            }
        } else if (is影分身()) {
            if (is全息投影()) {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.影分身, applyto.getStat().getCurrentMaxHp() * info.get(MapleStatInfo.x)));
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.影分身, info.get(MapleStatInfo.x)));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is侠盗本能()) {
            int killSpree = Math.min(applyto.getBuffedIntValue(MapleBuffStat.击杀点数), 5);
            if (passive) { //如果是被动使用
                if (killSpree >= 5) { //最多只有5点击杀点数
                    return;
                }
                killSpree++;
                if (applyto.isShowPacket()) {
                    applyto.dropSpouseMessage(0x0A, "当前击杀点数: " + killSpree);
                }
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.击杀点数, killSpree));
                foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), localstatups, this);
            } else {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.击杀点数);
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.增加物理攻击力, (info.get(MapleStatInfo.x) + (info.get(MapleStatInfo.kp)) * killSpree)));
            }
        } else if (is提速时刻()) {
            MapleBuffStat status_ = applyto.isZeroSecondLook() ? MapleBuffStat.提速时刻_战斗 : MapleBuffStat.提速时刻_侦查;
            int buffvalue = applyto.getBuffedIntValue(status_);
            buffvalue++;
            buffvalue = Math.min(buffvalue, 10);
            //applyto.cancelEffectFromBuffStat(status_);
            localstatups = Collections.singletonList(new Pair<>(status_, buffvalue));
        } else if (is黑暗姿势()) {
            if (passive) {
                localstatups = new ArrayList<>();

                //localstatups.add(new Pair<>(MapleBuffStat.黑暗领地, info.get(MapleStatInfo.x)));
                localstatups.add(new Pair<>(MapleBuffStat.提升伤害百分比, info.get(MapleStatInfo.indieDamR)));
                localstatups.add(new Pair<>(MapleBuffStat.暴击概率, info.get(MapleStatInfo.indieCr)));
                localstatups.add(new Pair<>(MapleBuffStat.稳如泰山, info.get(MapleStatInfo.indieStance)));
            } else {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.无敌状态, 1));
            }
        } else if (is黑暗幻影()) {
            applyto.dispelSkill(夜行者.影子侍从);
            if (applyto.getTotalSkillLevel(夜行者.影子侍从) > 0) {
                SkillFactory.getSkill(夜行者.影子侍从).getEffect(applyto.getTotalSkillLevel(夜行者.影子侍从)).applyTo(applyto);
            }
            SkillFactory.getSkill(夜行者.黑暗幻影_影子40).getEffect(1).applyTo(applyto);
            SkillFactory.getSkill(夜行者.黑暗幻影_影子20).getEffect(1).applyTo(applyto);
        } else if (sourceid == 奇袭者.元素_闪电) {
            if (passive) { //如果是被动使用
                localDuration = 30 * 1000; //被动的BUFF持续时间为 30 秒
                int raidenCount = applyto.getStat().raidenCount; //获取角色雷电累计的最大上限次数
                int count = Math.min(applyto.getBuffedIntValue(MapleBuffStat.百分比无视防御) / 5, raidenCount); //最大只有 5*5%
                if (count < raidenCount && raidenCount > 0) {
                    count++;
                }
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.百分比无视防御, count * (applyto.getBuffedValue(MapleBuffStat.开天辟地) != null ? 9 : 5)));
            } else {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.元素属性, 1));
            }
        } else if (sourceid == 圣骑士.连环环破) {
            int count = Math.min(applyto.getBuffedIntValue(MapleBuffStat.元素冲击) / 5, 5);
            if (count < 5) {
                return;
            }
            applyto.cancelEffectFromBuffStat(MapleBuffStat.元素冲击);
        } else if (is疾风()) {
            int count = Math.min(applyto.getBuffedIntValue(MapleBuffStat.百分比无视防御) / 5, applyto.getStat().raidenCount);
            int skillLevel = applyto.getTotalSkillLevel(奇袭者.台风);
            if (count < (skillLevel > 0 ? 2 : 3) && applyto.getBuffedValue(MapleBuffStat.开天辟地) == null) {
                applyto.dropMessage(5, "雷电增益不足，无法使用技能。");
                return;
            }
            int value = info.get(MapleStatInfo.y);
            if (skillLevel > 0) {
                MapleStatEffect effect = SkillFactory.getSkill(奇袭者.台风).getEffect(skillLevel);
                value = effect.getY();
                localDuration = effect.getDuration(applyto);
            }
            applyto.cancelEffectFromBuffStat(MapleBuffStat.百分比无视防御);
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.提升伤害百分比, value * count));
        } else if (is属性攻击()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.属性攻击, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is终极无限()) {
            maskedDuration = alchemistModifyVal(applyfrom, 4000, false);
        } else if (is尖兵支援()) {
            maskedDuration = 4000; //设置尖兵支援的间隔时间为 4 秒           
        } else if (is光暗转换()) {
            buff = BuffPacket.giveLuminousState(sourceid, localDuration, applyfrom);
        } else if (is黑暗高潮()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.黑暗高潮, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is黑暗祝福()) {
            localDuration = 2100000000;
            applyto.getClient().getSession().write(EffectPacket.showBlessOfDarkness(sourceid));
        } else if (is圣洁之力()) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.圣洁之力);
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.圣洁之力, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is神圣迅捷()) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.神圣迅捷);
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.神圣迅捷, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is葵花宝典()) {
            applyto.handleOrbconsume(1);
        } else if (is剑刃之壁()) {
            if (sourceid == 狂龙战士.剑刃之壁 && applyfrom.getTotalSkillLevel(狂龙战士.进阶剑刃之壁) > 0) {
                SkillFactory.getSkill(狂龙战士.进阶剑刃之壁).getEffect(applyfrom.getTotalSkillLevel(狂龙战士.进阶剑刃之壁)).applyBuffEffect(applyfrom, applyto, primary, newDuration);
                return;
            }
            Item weapon = applyto.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
            if (weapon != null) {
                Equip skin = (Equip) weapon;
                int itemId = skin.getItemSkin() % 10000 > 0 ? skin.getItemSkin() : weapon.getItemId();
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.剑刃之壁, (int) level));
                buff = BuffPacket.give剑刃之壁(sourceid, localDuration, localstatups, itemId, get剑刃之壁类型());
                foreignbuff = BuffPacket.show剑刃之壁(applyto.getId(), sourceid, stat, itemId, get剑刃之壁类型());

                // 剑刃之壁的冷却时间单独处理
                int cooldown = getCooldown(applyto);
                if (cooldown > 0 && !applyto.skillisCooling(狂龙战士.剑刃之壁)) {
                    applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(狂龙战士.剑刃之壁, cooldown));
                    applyto.addCooldown(狂龙战士.剑刃之壁, System.currentTimeMillis(), cooldown * 1000);
                }
            } else {
                applyto.dropMessage(5, "佩戴的武器无法使用此技能。");
                return;
            }
        } else if (is金属机甲()) {
            if (sourceid == 机械师.金属机甲_人类 && applyfrom.getTotalSkillLevel(机械师.终极机甲) > 0) {
                localstatups = new ArrayList<>(SkillFactory.getSkill(机械师.终极机甲).getEffect(applyfrom.getTotalSkillLevel(机械师.终极机甲)).statups);
                localstatups.add(new Pair<>(MapleBuffStat.增加最大HP百分比, applyfrom.getTotalSkillLevel(机械师.终极机甲)));
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.骑兽技能, 0));
            foreignbuff = BuffPacket.showMonsterRiding(applyto.getId(), stat, 机械师.金属机甲_人类, 1932016);
            List<Pair<MapleBuffStat, Integer>> localstatups_ = new ArrayList<>(SkillFactory.getSkill(预备兵.隐藏碎片).getEffect(1).statups);
            applyfrom.getClient().getSession().write(BuffPacket.show隐藏碎片(sourceid, level, localstatups_));
        } else if (isMorph()) {
            if (is冰骑士()) {
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.冰骑士, 2));
                buff = BuffPacket.giveBuff(0, localDuration, stat, this, applyto);
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.变身效果, getMorph(applyto)));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (isInflation()) { //如果是巨人药水
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.巨人药水, (int) inflation));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (charColor > 0) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.FAMILIAR_SHADOW, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is骑兽技能()) {
            localDuration = 2100000000;
            localstatups = new ArrayList<>(statups);
            int mountid = parseMountInfo(applyto, sourceid);
            int mountid2 = parseMountInfo_Pure(applyto, sourceid);
            if (mountid != 0 && mountid2 != 0) {
                localstatups.add(new Pair<>(MapleBuffStat.骑兽技能, mountid2));
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.骑兽技能, 0));
                applyto.cancelEffectFromBuffStat(MapleBuffStat.战神抗压);
                applyto.cancelEffectFromBuffStat(MapleBuffStat.愤怒之火);
                foreignbuff = BuffPacket.showMonsterRiding(applyto.getId(), stat, mountid, sourceid);
            } else {
                if (applyto.isAdmin()) {
                    applyto.dropSpouseMessage(0x0A, "骑宠BUFF " + sourceid + " 错误，未找到这个骑宠的外形ID。");
                }
                return;
            }
        } else if (isSoaring()) { //飞行骑乘
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.飞行骑乘, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is高空飞行()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.高空飞行, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (berserk > 0) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.天使状态, 0));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is狂暴战魂() || berserk2 > 0) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.狂暴战魂, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is金刚霸体()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.金刚霸体, 1));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is天使物品()) {
            if (applyto.getStat().equippedSummon <= 0) {
                localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.天使状态, 1));
            }
        } else if (sourceid == 魂骑士.光之刃) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.光之刃, (int) level));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (sourceid == 魂骑士.元素_灵魂) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.元素灵魂, (int) level));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is月光转换()) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.月光转换);
            int skillLevel = applyto.getTotalSkillLevel(魂骑士.人剑合一); //判断角色人剑合一技能是否大于0
            if (skillLevel > 0) {
                MapleStatEffect effect;
                if (sourceid == 魂骑士.月光洒落 || sourceid == 魂骑士.日月轮转_月光洒落) {
                    effect = SkillFactory.getSkill(魂骑士.人剑合一).getEffect(skillLevel);
                    if (effect != null) {
                        localstatups = new ArrayList<>();
                        localstatups.add(new Pair<>(MapleBuffStat.伤害减少, (int) level));
                        localstatups.add(new Pair<>(MapleBuffStat.月光转换, 1)); //1 = 月光 2 = 旭日
                        localstatups.add(new Pair<>(MapleBuffStat.暴击概率, effect.getIndieCr()));
                    }
                } else if (sourceid == 魂骑士.旭日 || sourceid == 魂骑士.日月轮转_旭日) {
                    effect = SkillFactory.getSkill(魂骑士.人剑合一_旭日).getEffect(skillLevel);
                    if (effect != null) {
                        localstatups = new ArrayList<>();
                        localstatups.add(new Pair<>(MapleBuffStat.月光转换, 2)); //1 = 月光 2 = 旭日
                        localstatups.add(new Pair<>(MapleBuffStat.提高攻击速度, effect.getIndieBooster()));
                        localstatups.add(new Pair<>(MapleBuffStat.提升伤害百分比, effect.getIndieDamR()));
                    }
                }
            }
            //其他玩家看的技能效果
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.月光转换, sourceid == 魂骑士.月光洒落 ? 1 : 2));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is信天翁新()) {
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.元素灵魂, (int) level));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (isSummonSkill()) { //如果是召唤兽技能
            localstatups = new ArrayList<>(statups);
            localstatups.remove(new Pair<>(MapleBuffStat.召唤兽, 1));
            normal = localstatups.size() > 0;
        } else if (is符文状态()) {
            applyto.dispelSkill(80001427);
            applyto.dispelSkill(80001428);
            applyto.dispelSkill(80001430);
            applyto.dispelSkill(80001432);
        } else if (is模式变更()) {
            applyto.cancelEffectFromBuffStat(MapleBuffStat.模式变更);
            if (sourceid != 林之灵.巨熊模式) {
                applyto.dispelBuffByJobId(11200);
            }
            if (sourceid != 林之灵.雪豹模式) {
                applyto.dispelBuffByJobId(11210);
            }
            if (sourceid != 林之灵.猛鹰模式) {
                applyto.dispelBuffByJobId(11211);
            }
            if (sourceid != 林之灵.猫咪模式) {
                applyto.dispelBuffByJobId(11212);
            }
        } else if (is伤害置换()) {
            if (!passive) {
                return;
            }
            int xishou = (int) (applyto.getTotDamageToMob() * makeRate(info.get(MapleStatInfo.y)));
            if (applyto.isAdmin()) {
                applyto.dropSpouseMessage(0x14, "[伤害置换] 当前打怪总伤害: " + applyto.getTotDamageToMob() + " 吸收转换数值: " + xishou);
            }
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.伤害置换, xishou));
        } else if (is幸运钱()) {
            int luck = Math.min(applyto.getBuffedIntValue(MapleBuffStat.幸运钱), 5);
            if (luck > 0) {
                if (luck < 5) { //最多叠加5次 幸运钱
                    luck++;
                }
                if (applyto.isShowPacket()) {
                    applyto.dropSpouseMessage(0x0A, "当前幸运钱次数: " + luck);
                }
                localstatups = new ArrayList<>();
                localstatups.add(new Pair<>(MapleBuffStat.幸运钱, luck));
                localstatups.add(new Pair<>(MapleBuffStat.提升伤害百分比, info.get(MapleStatInfo.indieDamR) * luck));
                localstatups.add(new Pair<>(MapleBuffStat.增加伤害最大值, info.get(MapleStatInfo.indieMaxDamageOver) * luck));
                localstatups.add(new Pair<>(MapleBuffStat.暴击概率, info.get(MapleStatInfo.x) * luck));
            }
            applyto.switchLuckyMoney(false);
        } else if (is拔刀姿势()) {
            applyto.dispelSkill(剑豪.基本姿势加成);
            SkillFactory.getSkill(剑豪.拔刀术加成).getEffect(1).applyTo(applyto);
        } else if (is避柳()) {
            int counts = Math.min(applyto.getBuffedIntValue(MapleBuffStat.避柳) / info.get(MapleStatInfo.damR) + 1, 5);
            localstatups = Collections.singletonList(new Pair<>(MapleBuffStat.避柳, info.get(MapleStatInfo.damR) * counts));
            //applyto.setBuffedValue(MapleBuffStat.避柳, counts);
        } else if (is灵狐()) {
            if (applyto.getBuffedValue(MapleBuffStat.灵狐) != null) {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.灵狐);
                return;
            }
        } else if (is心魂本能()) {
            if (applyto.getBuffedValue(MapleBuffStat.心魂本能) != null) {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.心魂本能);
                return;
            }
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.心魂本能, (int) level));
            foreignbuff = BuffPacket.giveForeignBuff(applyto.getId(), stat, this);
        } else if (is心魂充能()) {
            applyto.gainPP((30 - applyto.getSpecialStat().getPP()) / 2);
        } else if (is刺客标记()) {
            if (applyto.getBuffedValue(MapleBuffStat.刺客标记) != null) {
                applyto.cancelEffectFromBuffStat(MapleBuffStat.刺客标记);
                return;
            }
        } else if (is灵魂助力统治()) {
            ruleOn = !ruleOn;
            localDuration = applyto.getBuffedValue(MapleBuffStat.灵魂助力) != null ? (int) (applyto.getBuffStatValueHolder(MapleBuffStat.灵魂助力).localDuration + applyto.getBuffedStartTime(MapleBuffStat.灵魂助力) - System.currentTimeMillis()) : localDuration;
            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<>(MapleBuffStat.灵魂助力, 1));
            buff = BuffPacket.giveBuff(sourceid, localDuration, stat, this, applyto);
        }

        //取消一些技能BUFF的效果，以免重复
        if (!is骑兽技能() && !is机械传送门()) {
            applyto.cancelEffect(this, true, -1, localstatups);
        }
        //设置BUFF技能的消失时间 和 注册角色的BUFF状态信息
        long startTime = System.currentTimeMillis();
        if (localDuration > 0) {
            CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, startTime, localstatups);
            ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, maskedDuration > 0 ? maskedDuration : localDuration);
            applyto.registerEffect(this, startTime, schedule, localstatups, false, localDuration, applyfrom.getId());
        }
        //设置BUFF技能的冷却时间
        int cooldown = getCooldown(applyto);
        if ((sourceid == 奇袭者.疾风 || sourceid == 奇袭者.台风) && applyto.getBuffedValue(MapleBuffStat.开天辟地) != null) {
            cooldown = 0;
        }
        if ((sourceid == 夜光.绝对死亡 || sourceid == 夜光.死亡之刃)
                && applyto.getBuffedValue(MapleBuffStat.光暗转换) != null && applyto.getBuffedValue(MapleBuffStat.光暗转换) == 2) {
            cooldown = 0;
        }
        if (cooldown > 0 && !applyto.skillisCooling(sourceid) && !applyto.isAdmin()) {
            applyto.getClient().getSession().write(MaplePacketCreator.skillCooldown(sourceid, cooldown));
            applyto.addCooldown(sourceid, startTime, cooldown * 1000);
        }
        //开始加状态BUFF
        if (buff != null) {
            applyto.getClient().getSession().write(buff);
        } else if (normal && localstatups.size() > 0) {
            applyto.getClient().getSession().write(BuffPacket.giveBuff((skill ? sourceid : -sourceid), localDuration, maskedStatups == null ? localstatups : maskedStatups, this, applyto));
        }
        if (foreignbuff != null && !applyto.isHidden()) {
            applyto.getMap().broadcastMessage(foreignbuff);
        }
        //是否发送给其他玩家显示角色获得BUFF的效果
        if (showEffect && !applyto.isHidden()) {
            applyto.getMap().broadcastMessage(applyto, EffectPacket.showBuffeffect(applyto.getId(), sourceid, 1, applyto.getLevel(), level), false);
        }
    }

    /*
     * 获取骑宠的 MountId
     */
    public static int parseMountInfo(MapleCharacter player, int skillid) {
        if (skillid == 80001000 || GameConstants.is骑兽技能(skillid)) {
            if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -123) != null && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -124) != null) {
                return player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -123).getItemId();
            }
            return parseMountInfo_Pure(player, skillid);
        } else {
            return GameConstants.getMountItem(skillid, player);
        }
    }

    public static int parseMountInfo_Pure(MapleCharacter player, int skillid) {
        if (skillid == 80001000 || GameConstants.is骑兽技能(skillid)) {
            if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18) != null && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -19) != null) {
                return player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItemId();
            }
            return 0;
        } else {
            return GameConstants.getMountItem(skillid, player);
        }
    }

    private int getHpMpChange(MapleCharacter applyfrom, boolean hpchange) {
        int change = 0;
        if (hpR != 0 || mpR != 0) {
            double healHpRate = hpR;
            if (is元气恢复()) {
                healHpRate -= applyfrom.getBuffedIntValue(MapleBuffStat.元气恢复) / 100.0;
                if (healHpRate <= 0) {
                    return 0;
                }
            }
            if (applyfrom.isShowPacket()) {
                applyfrom.dropMessage(-5, "HpMpChange => 默认: " + hpR + " - " + healHpRate);
            }
            int maxChange = (hpchange ? healHpRate : mpR) < 1 ? Math.min(49999, (int) Math.floor(99999 * (hpchange ? healHpRate : mpR))) : 99999;
            int current = hpchange ? applyfrom.getStat().getCurrentMaxHp() : applyfrom.getStat().getCurrentMaxMp(applyfrom.getJob());
            change = Math.abs((int) (current * (hpchange ? healHpRate : mpR))) > Math.abs(maxChange) ? maxChange : (int) (current * (hpchange ? healHpRate : mpR));
        }
        return change;
    }

    private int calcHPChange(MapleCharacter applyfrom, boolean primary) {
        int hpchange = 0;
        if (info.get(MapleStatInfo.hp) != 0) {
            if (!skill) {
                if (primary) {
                    hpchange += alchemistModifyVal(applyfrom, info.get(MapleStatInfo.hp), true);
                } else {
                    hpchange += info.get(MapleStatInfo.hp);
                }
                if (applyfrom.hasDisease(MapleDisease.僵尸)) {
                    hpchange /= 2;
                }
            } else { // assumption: this is heal
                hpchange += makeHealHP(info.get(MapleStatInfo.hp) / 100.0, applyfrom.getStat().getTotalMagic(), 3, 5);
                if (applyfrom.hasDisease(MapleDisease.僵尸)) {
                    hpchange = -hpchange;
                }
            }
        }
        if (hpR != 0) {
            hpchange += getHpMpChange(applyfrom, true) / (applyfrom.hasDisease(MapleDisease.僵尸) ? 2 : 1);
        }
        // actually receivers probably never get any hp when it's not heal but whatever
        if (primary) {
            if (info.get(MapleStatInfo.hpCon) != 0) {
                hpchange -= info.get(MapleStatInfo.hpCon);
            }
        }
        /*
         * switch (this.sourceid) {
         * case 刀飞.转化术:
         * final PlayerStats stat = applyfrom.getStat();
         * int v42 = getY() + 100;
         * int v38 = Randomizer.rand(1, 100) + 100;
         * hpchange = (int) ((v38 * stat.getLuk() * 0.033 + stat.getDex()) * v42 * 0.002);
         * hpchange += makeHealHP(getY() / 100.0, applyfrom.getStat().getTotalLuk(), 2.3, 3.5);
         * break;
         * }
         */
        if (is斗气重生() && applyfrom.getTotalSkillLevel(战神.斗气重生_丽丽兹) > 0) {
            hpchange = 0;
        }
        return hpchange;
    }

    private static int makeHealHP(double rate, double stat, double lowerfactor, double upperfactor) {
        return (int) ((Math.random() * ((int) (stat * upperfactor * rate) - (int) (stat * lowerfactor * rate) + 1)) + (int) (stat * lowerfactor * rate));
    }

    private int calcMPChange(MapleCharacter applyfrom, boolean primary) {
        int mpchange = 0;
        if (info.get(MapleStatInfo.mp) != 0) {
            if (primary) {
                mpchange += alchemistModifyVal(applyfrom, info.get(MapleStatInfo.mp), true);
            } else {
                mpchange += info.get(MapleStatInfo.mp);
            }
        }
        if (mpR != 0) {
            mpchange += getHpMpChange(applyfrom, false);
        }
        if (JobConstants.is恶魔猎手(applyfrom.getJob()) || JobConstants.is超能力者(applyfrom.getJob())) {
            mpchange = 0;
        }
        if (primary) {
            if (info.get(MapleStatInfo.mpCon) != 0 && !JobConstants.is恶魔猎手(applyfrom.getJob())) {
                boolean free = false;
                if (applyfrom.getJob() == 411 || applyfrom.getJob() == 412) {
                    Skill expert = SkillFactory.getSkill(隐士.娴熟飞镖术);
                    if (applyfrom.getTotalSkillLevel(expert) > 0) {
                        MapleStatEffect eff = expert.getEffect(applyfrom.getTotalSkillLevel(expert));
                        if (eff.makeChanceResult()) {
                            free = true;
                        }
                    }
                }
                if (applyfrom.getBuffedValue(MapleBuffStat.终极无限) != null) {
                    mpchange = 0;
                } else if (!free) {
                    mpchange -= (info.get(MapleStatInfo.mpCon) - (info.get(MapleStatInfo.mpCon) * applyfrom.getStat().mpconReduce / 100)) * (applyfrom.getStat().mpconPercent / 100.0);
                }
            } else if (info.get(MapleStatInfo.forceCon) != 0 && JobConstants.is恶魔猎手(applyfrom.getJob())) {
                if (applyfrom.getBuffedValue(MapleBuffStat.无限精气) != null) {
                    mpchange = 0;
                } else {
                    boolean superskill = false;
                    if (is恶魔呼吸() && applyfrom.getSkillLevel(恶魔猎手.恶魔呼吸_减少精气) > 0 || is黑暗变形() && applyfrom.getSkillLevel(恶魔猎手.黑暗变形_减少精气) > 0 || is恶魔冲击波() && applyfrom.getSkillLevel(恶魔猎手.恶魔冲击波_减少精气) > 0) {
                        superskill = true;
                    }
                    mpchange -= info.get(MapleStatInfo.forceCon) / (superskill ? 2 : 1);
                }
            } else if (JobConstants.is超能力者(applyfrom.getJob()) && !is终极物质() && !is终极火车() && !is终极心魂弹()) {
                if (info.get(MapleStatInfo.ppRecovery) != 0) {
                    mpchange += info.get(MapleStatInfo.ppRecovery);
                } else if (info.get(MapleStatInfo.ppCon) != 0) {
                    mpchange -= info.get(MapleStatInfo.ppCon);
                }
            }
        }
        if (is斗气重生() && applyfrom.getTotalSkillLevel(战神.斗气重生_丽丽兹) > 0) {
            mpchange = 0;
        }
        return mpchange;
    }

    public int alchemistModifyVal(MapleCharacter chr, int val, boolean withX) {
        if (!skill) {
            return (val * (withX ? chr.getStat().RecoveryUP : chr.getStat().BuffUP) / 100);
        }
        return (val * (withX ? chr.getStat().RecoveryUP : (chr.getStat().BuffUP_Skill + (getSummonMovementType() == null ? 0 : chr.getStat().BuffUP_Summon))) / 100);
    }

    private int calcPowerChange(MapleCharacter applyfrom) {
        int powerchange = 0;
        if (!JobConstants.is尖兵(applyfrom.getJob())) {
            return powerchange;
        } else if (applyfrom.getBuffedValue(MapleBuffStat.永动引擎) != null) {
            return powerchange;
        }
        if (info.get(MapleStatInfo.powerCon) != 0) {
            powerchange -= info.get(MapleStatInfo.powerCon);
        }
        return powerchange;
    }

    private int calcAranComboChange(MapleCharacter applyfrom) {
        int combochange = 0;
        if (!JobConstants.is战神(applyfrom.getJob())) {
            return combochange;
        } else if (applyfrom.getBuffedValue(MapleBuffStat.连击无限) != null) {
            return combochange;
        }
        int aranComboCon = info.get(MapleStatInfo.aranComboCon);
        if (aranComboCon != 0) {
            if (sourceid == 战神.钻石星辰 && applyfrom.getTotalSkillLevel(战神.斗气重生_丽丽兹) > 0) {
                aranComboCon /= 2;
            }
            combochange -= aranComboCon;
        }
        return combochange;
    }

    public void setSourceId(int newid) {
        sourceid = newid;
    }

    public boolean isRefreshstyle() {
        return refreshstyle;
    }

    public MapleForeignBuffSkill getForeign() {
        return foreign;
    }

    public void initForeign(MapleForeignBuffStat... stat) {
        if (!refreshstyle) {
            refreshstyle = true;
            foreign = new MapleForeignBuffSkill(this);
            foreign.getStats().addAll(Arrays.asList(stat));
        }
    }

    public void setLt(Point Lt) {
        lt = Lt;
    }

    public void setRb(Point Rb) {
        rb = Rb;
    }

    public Skill getSkill() {
        return SkillFactory.getSkill(sourceid);
    }

    public boolean isGmBuff() {
        switch (sourceid) {
            case 10001075: //Empress Prayer
            case 9001000: // GM dispel
            case 9001001: // GM haste
            case 9001002: // GM Holy Symbol
            case 9001003: // GM Bless
            case 9001005: // GM resurrection
            case 9001008: // GM Hyper body

            case 9101000:
            case 9101001:
            case 9101002:
            case 9101003:
            case 9101005:
            case 9101008:
                return true;
            default:
                return JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1005;
        }
    }

    public boolean isInflation() {
        return inflation > 0;
    }

    public int getInflation() {
        return inflation;
    }

    public boolean is能量获得() {
        return skill && (sourceid == 冲锋队长.能量获得 || sourceid == 冲锋队长.超级冲击 || sourceid == 冲锋队长.终极冲击);
    }

    public boolean isMonsterBuff() {
        switch (sourceid) {
            case 圣骑士.压制术:
            case 神炮王.紧急后撤:
            case 隐士.影网术:
            case 龙神.火焰喷射:
            case 龙神.冰点寒气:
            case 龙神.鬼刻符:
            case 双刀.闪光弹:
            case 90001002:
            case 90001003:
            case 90001004:
            case 90001005:
            case 90001006:
            case 英雄.魔击无效:
            case 圣骑士.魔击无效:
            case 黑骑士.魔击无效:
            case 米哈尔.魔击无效:
            case 机械师.支援波动器_H_EX:
            case 隐月.破力拳_冲击波:
            case 魂骑士.灵魂之眼:
                return skill;
        }
        return false;
    }

    public void setPartyBuff(boolean pb) {
        this.partyBuff = pb;
    }

    /*
     * 是否组队BUFF效果
     */
    private boolean isPartyBuff() {
        if (lt == null || rb == null || !partyBuff) {
            return is灵魂之石();
        }
        switch (sourceid) {
            case 圣骑士.火焰冲击:
            case 圣骑士.寒冰冲击:
            case 圣骑士.雷鸣冲击:
            case 圣骑士.神圣冲击:
            case 双刀.终极斩:
            case 狂龙战士.强健护甲:
            case 林之灵.模式解除:
            case 林之灵.巨熊模式:
            case 林之灵.雪豹模式:
            case 林之灵.猛鹰模式:
            case 林之灵.猫咪模式:
            case 狂龙战士.剑刃之壁:
            case 狂龙战士.进阶剑刃之壁:
                return false;
        }
        return !(GameConstants.isNoDelaySkill(sourceid) || is超越攻击());
    }

    /*
     * 是否为组队被动BUFF状态
     */
    public boolean isPartyPassiveBuff() {
        return skill && (sourceid == 林之灵.阿尔之好伙伴 || sourceid == 林之灵.阿尔之窃取 || sourceid == 林之灵.阿尔之爪 || sourceid == 林之灵.阿尔之魅力_强化 || sourceid == 林之灵.阿尔之弱点把握 || sourceid == 林之灵.阿尔之饱腹感);
    }

    public boolean is狂龙战士的威严() {
        return skill && sourceid == 狂龙战士.狂龙战士的威严;
    }

    public boolean is剑刃之壁() {
        return skill && (sourceid == 狂龙战士.剑刃之壁 || sourceid == 狂龙战士.进阶剑刃之壁 || sourceid == 狂龙战士.剑刃之壁_变身 || sourceid == 狂龙战士.进阶剑刃之壁_变身);
    }

    public int get剑刃之壁类型() {
        switch (sourceid) {
            case 狂龙战士.剑刃之壁:
                return 1;
            case 狂龙战士.进阶剑刃之壁:
                return 2;
            case 狂龙战士.剑刃之壁_变身:
                return 3;
            case 狂龙战士.进阶剑刃之壁_变身:
                return 4;
        }
        return 1;
    }

    public boolean is神圣之火() {
        return skill && sourceid == 黑骑士.神圣之火;
    }

    public boolean is黑暗姿势() {
        return skill && sourceid == 夜行者.黑暗领地;
    }

    public boolean is黑暗幻影() {
        return skill && sourceid == 夜行者.黑暗幻影;
    }

    public boolean is三彩箭矢() {
        return skill && sourceid == 神射手.三彩箭矢;
    }

    public boolean is永动引擎() {
        return skill && sourceid == 尖兵.永动引擎;
    }

    public boolean is神秘瞄准术() {
        return skill && (sourceid == 主教.神秘瞄准术 || sourceid == 冰雷.神秘瞄准术 || sourceid == 火毒.神秘瞄准术);
    }

    public boolean is群体治愈() {
        return skill && (sourceid == 主教.群体治愈 || sourceid == 9101000 || sourceid == 管理员.完美治愈);
    }

    public boolean is黑暗灵气() {
        return skill && sourceid == 唤灵斗师.黑暗灵气;
    }

    public boolean is黄色灵气() {
        return skill && sourceid == 唤灵斗师.黄色灵气;
    }

    public boolean is蓝色灵气() {
        return skill && sourceid == 唤灵斗师.蓝色灵气;
    }

    public boolean is吸收灵气() {
        return skill && sourceid == 唤灵斗师.吸收灵气;
    }

    public boolean is减益灵气() {
        return skill && sourceid == 唤灵斗师.减益灵气;
    }

    public boolean is黑暗闪电() {
        return skill && sourceid == 唤灵斗师.黑暗闪电;
    }

    public boolean is暴怒对战() {
        return skill && sourceid == 唤灵斗师.暴怒对战;
    }

    public boolean is复活术() {
        return skill && (sourceid == 管理员.普天复活 || sourceid == 9101005 || sourceid == 主教.复活术);
    }

    public boolean is伺机待发() {
        return skill && (sourceid == 冲锋队长.伺机待发);
    }

    public boolean is尖兵支援() {
        return skill && sourceid == 尖兵.急速支援;
    }

    public boolean is月光转换() {
        return skill && (sourceid == 魂骑士.月光洒落 || sourceid == 魂骑士.旭日 || sourceid == 魂骑士.日月轮转_月光洒落 || sourceid == 魂骑士.日月轮转_旭日);
    }

    public boolean is信天翁新() {
        return skill && (sourceid == 风灵使者.信天翁_新 || sourceid == 风灵使者.极限信天翁);
    }

    public boolean is圣洁之力() {
        return skill && sourceid == 神之子.圣洁之力;
    }

    public boolean is神圣迅捷() {
        return skill && sourceid == 神之子.神圣迅捷;
    }

    public boolean is进阶祝福() {
        return skill && sourceid == 主教.进阶祝福;
    }

    public boolean is神圣魔法盾() {
        return skill && sourceid == 主教.神圣魔法盾;
    }

    public boolean is幸运钱() {
        return skill && sourceid == 侠盗.幸运钱;
    }

    public boolean is终极斩() {
        return skill && sourceid == 双刀.终极斩;
    }

    public int getHp() {
        return info.get(MapleStatInfo.hp);
    }

    public int getMp() {
        return info.get(MapleStatInfo.mp);
    }

    /**
     * *
     * 持续秒数(每X秒造成伤害X)
     *
     * @return
     */
    public int getDotInterval() {
        return info.get(MapleStatInfo.dotInterval);
    }

    /**
     * *
     * 持续伤害重叠次数
     *
     * @return
     */
    public int getDOTStack() {
        return info.get(MapleStatInfo.dotSuperpos);
    }

    public double getHpR() {
        return hpR;
    }

    public double getMpR() {
        return mpR;
    }

    public int getMastery() {
        return info.get(MapleStatInfo.mastery);
    }

    public int getWatk() {
        return info.get(MapleStatInfo.pad);
    }

    public int getMatk() {
        return info.get(MapleStatInfo.mad);
    }

    public int getWdef() {
        return info.get(MapleStatInfo.pdd);
    }

    public int getMdef() {
        return info.get(MapleStatInfo.mdd);
    }

    /**
     * 增加命中力
     *
     * @return
     */
    public int getAcc() {
        return info.get(MapleStatInfo.acc);
    }

    /**
     * 增加回避值
     *
     * @return
     */
    public int getAvoid() {
        return info.get(MapleStatInfo.eva);
    }

    /**
     * 移动速度
     *
     * @return
     */
    public int getSpeed() {
        return info.get(MapleStatInfo.speed);
    }

    public int getJump() {
        return info.get(MapleStatInfo.jump);
    }

    /**
     * 最大移动速度提高
     *
     * @return
     */
    public int getSpeedMax() {
        return info.get(MapleStatInfo.speedMax);
    }

    /**
     * *
     * 移动速度提高或增加
     *
     * @return
     */
    public int getPassiveSpeed() {
        return info.get(MapleStatInfo.psdSpeed);
    }

    /**
     * 跳跃力提高或者增加
     *
     * @return
     */
    public int getPassiveJump() {
        return info.get(MapleStatInfo.psdJump);
    }

    /*
     * BUFF的持续时间
     */
    public int getDuration() {
        return info.get(MapleStatInfo.time);
    }

    public int getDuration(MapleCharacter applyfrom) {
        int time = skill ? applyfrom.getStat().getDuration(sourceid) : 0;
        return info.get(MapleStatInfo.time) + time;
    }

    /*
     * 对怪物BUFF的持续时间
     */
    public int getSubTime() {
        return info.get(MapleStatInfo.subTime);
    }

    /*
     * 是否BUFF状态技能
     */
    public boolean isOverTime() {
        return overTime;
    }

    /*
     * 不会被取消的BUFF
     */
    public boolean isNotRemoved() {
        return notRemoved;
    }

    /*
     * 是否自动重复使用的BUFF
     */
    public boolean isRepeatEffect() {
        return repeatEffect;
    }

    public List<Pair<MapleBuffStat, Integer>> getStatups() {
        return statups;
    }

    /*
     * BUFF状态是否是同1个技能里面的
     */
    public boolean sameSource(MapleStatEffect effect) {
        return effect != null && this.sourceid == effect.sourceid && this.skill == effect.skill;
    }

    public int getS() {
        return info.get(MapleStatInfo.s);
    }

    public int getT() {
        return info.get(MapleStatInfo.t);
    }

    public int getU() {
        return info.get(MapleStatInfo.u);
    }

    public int getV() {
        return info.get(MapleStatInfo.v);
    }

    public int getW() {
        return info.get(MapleStatInfo.w);
    }

    public int getX() {
        return info.get(MapleStatInfo.x);
    }

    public int getY() {
        return info.get(MapleStatInfo.y);
    }

    public int getZ() {
        return info.get(MapleStatInfo.z);
    }

    public int getDamage() {
        return info.get(MapleStatInfo.damage);
    }

    public int getMagicDamage() {
        return info.get(MapleStatInfo.madR);
    }

    public int getPVPDamage() {
        return info.get(MapleStatInfo.PVPdamage);
    }

    /*
     * 获取技能攻击次数
     */
    public int getAttackCount() {
        return info.get(MapleStatInfo.attackCount);
    }

    /*
     * 获取技能攻击次数 + 额外增加次数
     */
    public int getAttackCount(MapleCharacter applyfrom) {
        int addcount = applyfrom.getSkillLevel(箭神.天赐神箭) > 0 && getAttackCount() >= 2 ? 1 : 0;
        return info.get(MapleStatInfo.attackCount) + applyfrom.getStat().getAttackCount(sourceid) + addcount;
    }

    /**
     * *
     * 攻击次数
     *
     * @return
     */
    public int getBulletCount() {
        return info.get(MapleStatInfo.bulletCount);
    }

    public int getBulletCount(MapleCharacter applyfrom) {
        int addcount = applyfrom.getSkillLevel(箭神.天赐神箭) > 0 && getBulletCount() >= 2 ? 1 : 0;
        return info.get(MapleStatInfo.bulletCount) + applyfrom.getStat().getAttackCount(sourceid) + addcount;
    }

    /*
     * 使用技能消耗子弹/飞镖多少发
     */
    public int getBulletConsume() {
        return info.get(MapleStatInfo.bulletConsume);
    }

    /**
     * 攻击怪物个数
     *
     * @return
     */
    public int getMobCount() {
        return info.get(MapleStatInfo.mobCount);
    }

    /*
     * 获取技能攻击怪物的数量 + 额外增加数量
     */
    public int getMobCount(MapleCharacter applyfrom) {
        return info.get(MapleStatInfo.mobCount) + applyfrom.getStat().getMobCount(sourceid);
    }

    public int getMoneyCon() {
        return moneyCon;
    }

    /**
     * 冷却时间(减少)
     *
     * @return
     */
    public int getCooltimeReduceR() {
        return info.get(MapleStatInfo.coolTimeR);
    }

    /*
     * 金币获得量增加x%
     */
    public int getMesoAcquisition() {
        return info.get(MapleStatInfo.mesoR);
    }

    /*
     * 获取技能的冷却时间
     */
    public int getCooldown(MapleCharacter applyfrom) {
        if (is神枪降临() && applyfrom.hasBuffSkill(黑骑士.龙之献祭)) {
            return 0;
        } else if (is一击要害箭() && applyfrom.getSkillLevel(箭神.一击要害箭_缩短冷却时间) > 0) {
            return 0;
        } else if (is平衡技能() && applyfrom.getBuffedIntValue(MapleBuffStat.光暗转换) == 2) { //平衡状态下无冷却时间
            return 0;
        }
        if (info.get(MapleStatInfo.cooltime) > 5) {
            int cooldownX = (int) (info.get(MapleStatInfo.cooltime) * (applyfrom.getStat().getCoolTimeR() / 100.0));
            int coolTimeR = (int) (info.get(MapleStatInfo.cooltime) * (applyfrom.getStat().getReduceCooltimeRate(sourceid) / 100.0));
            if (applyfrom.isShowPacket()) {
                applyfrom.dropMessage(-5, "技能冷却时间 => 默认: " + info.get(MapleStatInfo.cooltime) + " [减少百分比: " + applyfrom.getStat().getCoolTimeR() + "% - " + cooldownX + "] [减少时间: " + applyfrom.getStat().getReduceCooltime() + "] [超级技能减少百分比: " + applyfrom.getStat().getReduceCooltimeRate(sourceid) + "% 减少时间: " + coolTimeR + "]");
            }
            return Math.max(0, (info.get(MapleStatInfo.cooltime) - applyfrom.getStat().getReduceCooltime() - (cooldownX > 5 ? 5 : cooldownX) - coolTimeR)); //返回最大的数
        }
        return info.get(MapleStatInfo.cooltime);
    }

    public Map<MonsterStatus, Integer> getMonsterStati() {
        return monsterStatus;
    }

    public int getBerserk() {
        return berserk;
    }

    public boolean is神枪降临() {
        return skill && sourceid == 黑骑士.神枪降临;
    }

    public boolean is一击要害箭() {
        return skill && sourceid == 箭神.一击要害箭;
    }

    public boolean is船长爆头() {
        return skill && sourceid == 船长.爆头;
    }

    public boolean is平衡技能() {
        return skill && (sourceid == 夜光.死亡之刃 || sourceid == 夜光.绝对死亡);
    }

    public boolean is隐藏术() {
        return skill && (sourceid == 管理员.隐藏术 || sourceid == 9101004);
    }

    public boolean is隐身术() {
        return skill && (sourceid == 管理员.隐藏术 || sourceid == 9101004 || sourceid == 飞侠.隐身术 || sourceid == 夜行者.隐身术 || sourceid == 双刀.进阶隐身术);
    }

    public boolean is龙之力() {
        return skill && sourceid == 1311008; //黑骑士.龙之力
    }

    public boolean is龙之献祭() {
        return skill && sourceid == 黑骑士.龙之献祭;
    }

    public boolean is元气恢复() {
        return skill && sourceid == 圣骑士.元气恢复;
    }

    public boolean is日月轮转() {
        return skill && sourceid == 魂骑士.日月轮转;
    }

    public boolean is团队治疗() {
        return skill && (sourceid == 1001 || sourceid == 10001001 || sourceid == 20001001 || sourceid == 20011001 || sourceid == 35121005);
    }

    public boolean is潜入() {
        return skill && (sourceid == 20021001 || sourceid == 20031001 || sourceid == 30001001 || sourceid == 30011001 || sourceid == 30021001 || sourceid == 60001001 || sourceid == 60011001);
    }

    public boolean is重生契约状态() {
        return skill && (sourceid == 黑骑士.重生契约_状态);
    }

    public boolean is重生契约() {
        return skill && (sourceid == 黑骑士.重生契约);
    }

    public boolean is灵魂助力() {
        return skill && sourceid == 黑骑士.灵魂助力;
    }

    public boolean is灵魂助力统治() {
        return skill && sourceid == 黑骑士.灵魂助力统治;
    }

    public boolean is灵魂助力震惊() {
        return skill && sourceid == 黑骑士.灵魂助力震惊;
    }

    public boolean is刀飞炼狱() {
        return skill && sourceid == 侠盗.炼狱;
    }

    public boolean is极限射箭() {
        return skill && (sourceid == 神射手.极限射箭 || sourceid == 箭神.极限射箭);
    }

    public boolean is终极无限() {
        return skill && (sourceid == 火毒.终极无限 || sourceid == 冰雷.终极无限 || sourceid == 主教.终极无限);
    }

    public boolean is猫咪模式() {
        return skill && sourceid == 林之灵.猫咪模式;
    }

    public boolean is模式变更() {
        return skill && (sourceid == 林之灵.巨熊模式 || sourceid == 林之灵.雪豹模式 || sourceid == 林之灵.猛鹰模式 || sourceid == 林之灵.猫咪模式 || sourceid == 林之灵.模式解除);
    }

    public boolean is喵喵卡片() {
        return skill && (sourceid == 林之灵.喵喵卡片 || sourceid == 林之灵.喵喵金卡);
    }

    public boolean is舞力全开() {
        return skill && sourceid == 林之灵.舞力全开;
    }

    public boolean is骑兽技能_() {
        return skill && (GameConstants.is骑兽技能(sourceid) || sourceid == 80001000);
    }

    public boolean is骑兽技能() {
        return skill && (is骑兽技能_() || GameConstants.getMountItem(sourceid, null) != 0) && !is机械骑兽();
    }

    public boolean is机械骑兽() {
        return skill && (sourceid == 机械师.金属机甲_人类 || sourceid == 机械师.终极机甲);
    }

    public boolean is时空门() {
        return skill && (sourceid == 主教.时空门 || sourceid % 10000 == 8001);
    }

    public boolean is金钱护盾() {
        return skill && sourceid == 侠盗.金钱护盾;
    }

    public boolean is愤怒之火() {
        return skill && sourceid == 英雄.愤怒之火;
    }

    public boolean is葵花宝典() {
        return skill && sourceid == 英雄.葵花宝典;
    }

    public boolean is弓手火眼晶晶() {
        return skill && sourceid == 神射手.火眼晶晶;
    }

    public boolean is符文状态() {
        return skill && (sourceid == 80001427 || sourceid == 80001428 || sourceid == 80001430 || sourceid == 80001432);
    }

    public boolean is金钱炸弹() {
        return skill && sourceid == 侠盗.金钱炸弹;
    }

    public boolean is机械传送门() {
        return skill && sourceid == 机械师.传送门_GX9;
    }

    public boolean is斗气重生() {
        return skill && sourceid == 战神.斗气重生;
    }

    public boolean is飞龙传动() {
        return skill && sourceid == 龙神.飞龙传动;
    }

    public boolean is火焰咆哮() {
        return skill && sourceid == 双弩.火焰咆哮;
    }

    public boolean is影子闪避() {
        return skill && sourceid == 双刀.影子闪避;
    }

    public boolean is卡牌审判() {
        return skill && (sourceid == 幻影.卡牌审判 || sourceid == 幻影.卡牌审判_高级);
    }

    public boolean is黑暗祝福() {
        return skill && sourceid == 夜光.黑暗祝福;
    }

    public boolean is黑暗高潮() {
        return skill && sourceid == 夜光.黑暗高潮;
    }

    public boolean is光暗转换() {
        return skill && (sourceid == 夜光.太阳火焰 || sourceid == 夜光.月蚀 || sourceid == 夜光.平衡_光明 || sourceid == 夜光.平衡_黑暗);
    }

    public boolean is夜光平衡() {
        return skill && (sourceid == 夜光.平衡_光明 || sourceid == 夜光.平衡_黑暗);
    }

    public boolean is绝对死亡() {
        return skill && sourceid == 夜光.绝对死亡;
    }

    public boolean is恶魔呼吸() {
        return skill && sourceid == 恶魔猎手.恶魔呼吸;
    }

    public boolean is黑暗变形() {
        return skill && sourceid == 恶魔猎手.黑暗变形;
    }

    public boolean is恶魔冲击波() {
        return skill && sourceid == 恶魔猎手.恶魔冲击波;
    }

    public boolean is坚定意志() {
        return skill && sourceid == 魂骑士.坚定意志;
    }

    public boolean isCharge() {
        switch (sourceid) {
            case 圣骑士.雷鸣冲击:
            case 战神.冰雪矛:
                return skill;
        }
        return false;
    }

    public boolean isPoison() {
        return info.get(MapleStatInfo.dot) > 0 && info.get(MapleStatInfo.dotTime) > 0;
    }

    /*
     * 是否为烟雾效果
     */
    private boolean isMist() {
        switch (sourceid) {
            case 1076: //0001076 - 奥兹的火牢术屏障 - 召唤的奥兹在一定时间内在自身周围形成火幕。火幕内的怪物有一定概率处于着火状态，持续受到伤害。特定等级提升时，技能等级可以提升1。
            case 火毒.致命毒雾:
            case 主教.神圣源泉:
            case 隐士.模糊领域:
            case 侠盗.烟幕弹:
            case 龙神.极光恢复:
            case 唤灵斗师.避难所:
            case 隐月.束缚术:
            case 炎术士.燃烧领域:
            case 机械师.支援波动器_H_EX:
            case 机械师.支援波动器强化:
            case 豹弩游侠.辅助打猎单元:
            case 豹弩游侠.集束箭:
            case 林之灵.火焰屁:
            case 阴阳师.结界_樱:
            case 阴阳师.结界_桔梗:
            case 阴阳师.结界_破魔:
                return true;
        }
        return false;
    }

    private boolean is暗器伤人() {
        return skill && (sourceid == 隐士.暗器伤人 || sourceid == 夜行者.魔法飞镖);
    }

    private boolean is无限子弹() {
        return skill && (sourceid == 船长.无限子弹);
    }

    private boolean is净化() {
        return skill && (sourceid == 主教.净化 || sourceid == 管理员.完美治愈 || sourceid == 9101000);
    }

    private boolean is勇士的意志() {
        switch (sourceid) {
            case 英雄.勇士的意志:
            case 圣骑士.勇士的意志:
            case 黑骑士.勇士的意志:
            case 火毒.勇士的意志:
            case 冰雷.勇士的意志:
            case 主教.勇士的意志:
            case 神射手.勇士的意志:
            case 箭神.勇士的意志:
            case 隐士.勇士的意志:
            case 侠盗.勇士的意志:
            case 冲锋队长.勇士的意志:
            case 船长.勇士的意志:
            case 战神.勇士的意志:
            case 龙神.勇士的意志:
            case 双刀.勇士的意志:
            case 唤灵斗师.勇士的意志:
            case 豹弩游侠.勇士的意志:
            case 机械师.勇士的意志:
            case 神炮王.勇士的意志:
            case 双弩.勇士的意志:
            case 幻影.勇士的意志:
            case 夜光.勇士的意志:
            case 尖兵.勇士的意志:
            case 狂龙战士.诺巴勇士的意志:
            case 爆莉萌天使.诺巴勇士的意志:
            case 林之灵.林之灵之意志:
            case 剑豪.晓之樱:
            case 阴阳师.晓之樱:
            case 超能力者.精神净化:
                return skill;
        }
        return false;
    }

    public boolean is矛连击强化() {
        return skill && sourceid == 战神.矛连击强化;
    }

    public boolean is侠盗本能() {
        return skill && sourceid == 侠盗.侠盗本能;
    }

    public boolean is提速时刻() {
        return skill && (sourceid == 神之子.提速时刻_侦查 || sourceid == 神之子.提速时刻_战斗);
    }

    public boolean is斗气集中() {
        switch (sourceid) {
            case 英雄.斗气集中:
                return skill;
        }
        return false;
    }

    public boolean isMorph() {
        return morphId > 0;
    }

    public int getMorph() {
        return morphId;
    }

    public boolean is元素冲击() {
        return skill && (sourceid == 圣骑士.元素冲击 || sourceid == 圣骑士.万佛归一破);
    }

    public boolean is狂龙变形() {
        return skill && (sourceid == 狂龙战士.终极变形_3转 || sourceid == 狂龙战士.终极变形_4转);
    }

    public boolean is狂龙超级变形() {
        return skill && sourceid == 狂龙战士.终极变形_超级;
    }

    public boolean is负荷释放() {
        return skill && sourceid == 恶魔复仇者.负荷释放;
    }

    public boolean is恶魔恢复() {
        return skill && sourceid == 恶魔复仇者.恶魔恢复;
    }

    public boolean is血之契约() {
        return skill && sourceid == 恶魔复仇者.血之契约;
    }

    public boolean is超越攻击() {
        return skill && GameConstants.is超越攻击(sourceid);
    }

    public boolean is超越攻击状态() {
        switch (sourceid) {
            case 恶魔复仇者.超越十字斩:
            case 恶魔复仇者.超越恶魔突袭:
            case 恶魔复仇者.超越月光斩:
            case 恶魔复仇者.超越处决:
                return skill;
        }
        return false;
    }

    public boolean is额外供给() {
        return skill && sourceid == 尖兵.额外供给;
    }

    public boolean is金刚霸体() {
        return skill && JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1010;
    }

    public boolean is祝福护甲() {
        switch (sourceid) {
            case 圣骑士.祝福护甲:
                return skill;
        }
        return false;
    }

    public boolean is狂暴战魂() {
        return skill && JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1011;
    }

    public boolean is美洲豹骑士() {
        return skill && sourceid == 豹弩游侠.美洲豹骑士;
    }

    public int getMorph(MapleCharacter chr) {
        int morph = getMorph();
        switch (morph) {
            case 1000:
            case 1001:
            case 1003:
                return morph + (chr.getGender() == 1 ? 100 : 0);
        }
        return morph;
    }

    public byte getLevel() {
        return level;
    }

    public boolean isSummonSkill() {
        Skill summon = SkillFactory.getSkill(sourceid);
        if (!skill || summon == null) {
            return false;
        }
        return summon.isSummonSkill();
    }

    public SummonMovementType getSummonMovementType() {
        if (!skill) {
            return null;
        }
        switch (sourceid) {
            case 箭神.神箭幻影:
            case 风灵使者.绿水晶花: //新的风灵使者召唤兽技能
            case 风灵使者.钻石星尘: //绿水晶花的进阶技能
            case 船长.八轮重机枪:
            case 双刀.傀儡召唤:
            case 机械师.磁场:
            case 机械师.机器人发射器_RM7:
            case 机械师.支援波动器_H_EX:
            case 机械师.支援波动器强化:
            case 机械师.机器人工厂_RM1:
            case 机械师.战争机器_泰坦:
            case 隐士.黑暗杂耍:
            case 侠盗.黑暗杂耍:
            case 神炮王.磁性船锚:
            case 神炮王.双胞胎猴子支援: //5321004 
            case 神炮王.双胞胎猴子支援_1: //5320011
            case 神炮王.旋转彩虹炮:
            case 狂龙战士.石化:
            case 龙的传人.破城炮:
            case 尖兵.全息力场_穿透:
            case 尖兵.全息力场_力场:
            case 尖兵.全息力场_支援:
            case 龙神.召唤玛瑙龙:
            case 夜行者.黑暗预兆:
            case 林之灵.小波波:
                return SummonMovementType.不会移动; //0
            case 黑骑士.灵魂助力:
            case 箭神.冰凤凰:
            case 神射手.火凤凰:
            case 双弩.精灵骑士:
            case 双弩.精灵骑士1:
            case 双弩.精灵骑士2:
            case 夜行者.影子蝙蝠_召唤兽:
                return SummonMovementType.跟随并且随机移动打怪; //3
//            case 机械师.机器人工厂_机器人:
            case 冰雷.闪电风暴:
                return SummonMovementType.自由移动; //2
            case 炎术士.元素_火焰:
            case 炎术士.元素_火焰II:
            case 炎术士.元素_火焰III:
            case 炎术士.元素_火焰IV:
            case 唤灵斗师.死亡:
            case 唤灵斗师.死亡契约:
            case 唤灵斗师.死亡契约2:
            case 唤灵斗师.死亡契约3:
            case 火毒.火魔兽:
            case 冰雷.冰破魔兽:
            case 主教.强化圣龙:
            case 30011090:
                return SummonMovementType.跟随移动; //1
            case 船长.集合船员:
            case 船长.集合船员2:
            case 船长.集合船员3:
            case 船长.集合船员4:
                return SummonMovementType.自由移动;
            case 炎术士.火焰化身_狮子:
            case 炎术士.火焰化身_狐狸:
                return SummonMovementType.未知效果;
            case 夜行者.影子侍从:
            case 夜行者.黑暗幻影_影子40:
            case 夜行者.黑暗幻影_影子20:
                return SummonMovementType.侍从;
            case 豹弩游侠.召唤美洲豹_灰:
            case 豹弩游侠.召唤美洲豹_黄:
            case 豹弩游侠.召唤美洲豹_红:
            case 豹弩游侠.召唤美洲豹_紫:
            case 豹弩游侠.召唤美洲豹_蓝:
            case 豹弩游侠.召唤美洲豹_剑:
            case 豹弩游侠.召唤美洲豹_雪:
            case 豹弩游侠.召唤美洲豹_玛瑙:
            case 豹弩游侠.召唤美洲豹_铠甲:
                return SummonMovementType.坐骑跟随;
        }
        if (is天使技能()) {
            return SummonMovementType.跟随移动; //1
        }
        return null;
    }

    public boolean is集合船员() {
        switch (sourceid) {
            case 船长.集合船员:
            case 船长.集合船员2:
            case 船长.集合船员3:
            case 船长.集合船员4:
                return skill;
        }
        return false;
    }

    public boolean is元素火焰() {
        switch (sourceid) {
            case 炎术士.元素_火焰:
            case 炎术士.元素_火焰II:
            case 炎术士.元素_火焰III:
            case 炎术士.元素_火焰IV:
                return skill;
        }
        return false;
    }

    public boolean is船员统帅() {
        return skill && sourceid == 船长.船员统帅;
    }

    public boolean is燃烧领域() {
        return skill && sourceid == 炎术士.燃烧领域;
    }

    public boolean is全息力场支援() {
        return skill && sourceid == 尖兵.全息力场_支援;
    }

    public boolean is天使技能() {
        return GameConstants.is天使祝福戒指(sourceid);
    }

    public boolean isSkill() {
        return skill;
    }

    public int getSourceId() {
        return sourceid;
    }

    public boolean is冰骑士() {
        return skill && JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1105;
    }

    public boolean isSoaring() {
        return isSoaring_Normal() || isSoaring_Mount();
    }

    public boolean isSoaring_Normal() {
        //飞翔
        return skill && JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1026;
    }

    public boolean isSoaring_Mount() {
        //飞行骑乘·
        return skill && ((JobConstants.is新手职业(sourceid / 10000) && sourceid % 10000 == 1142) || sourceid == 80001089);
    }

    /*
     * 80001242 - 高空飞行 - 可以在一定时间内自由飞行。但只能在村庄中飞行。
     */
    public boolean is高空飞行() {
        return skill && (sourceid == 80001242 || sourceid == 尖兵.自由飞行 || sourceid == 林之灵.伊卡飞翔 || sourceid == 超能力者.心魂漫步);
    }

    public boolean is迷雾爆发() {
        return skill && sourceid == 火毒.迷雾爆发;
    }

    public boolean is能量激发() {
        return skill && sourceid == 冲锋队长.能量激发;
    }

    public boolean is寒冰灵气() {
        return skill && sourceid == 冰雷.寒冰灵气;
    }

    public boolean is影分身() {
        switch (sourceid) {
            case 隐士.影分身:
            case 侠盗.影分身:
            case 夜行者.影子侍从:
            case 双刀.镜像分身:
            case 尖兵.全息投影:
                return skill;
        }
        return false;
    }

    public double makeRate(int rate) {
        return rate / 100.0;
    }

    /*
     * 影分身的分身伤害倍数
     */
    public int getShadowDamage() {
        switch (sourceid) {
            case 隐士.影分身:
            case 侠盗.影分身:
            case 双刀.镜像分身:
                return info.get(MapleStatInfo.x);
            case 尖兵.全息投影:
                return info.get(MapleStatInfo.y);
        }
        return info.get(MapleStatInfo.x);
    }

    private boolean is全息投影() {
        return skill && sourceid == 尖兵.全息投影;
    }

    private boolean is影子侍从() {
        return skill && sourceid == 夜行者.影子侍从;
    }

    private boolean is伤害置换() {
        return skill && sourceid == 箭神.伤害置换;
    }

    public boolean is天使物品() {
        return !skill && (sourceid == 2022746 || sourceid == 2022747 || sourceid == 2022823);
    }

    public boolean is天使戒指() {
        return skill && (sourceid == 1087 || sourceid == 1179 || sourceid == 1085 || sourceid == 80001154);
    }

    private boolean is极速领域() {
        return skill && (sourceid == 冲锋队长.极速领域 || sourceid == 奇袭者.极速领域_新 || sourceid % 10000 == 8006);
    }

    private boolean is疾驰() {
        return skill && (sourceid == 海盗.疾驰);
    }

    private boolean is属性攻击() {
        switch (sourceid) {
            case 战神.冰雪矛:
            case 圣骑士.火焰冲击:
            case 圣骑士.寒冰冲击:
            case 圣骑士.雷鸣冲击:
            case 圣骑士.神圣冲击:
                return true;
        }
        return false;
    }

    private boolean is导航辅助() {
        switch (sourceid) {
            case 船长.无尽追击:
            case 龙神.魔翼斩杀:
                return true;
        }
        return false;
    }

    private boolean is传说冒险家() {
        switch (sourceid) {
            case 冰雷.传说冒险家:
            case 侠盗.传说冒险家:
            case 双刀.传说冒险家:
            case 圣骑士.传说冒险家:
            case 神射手.传说冒险家:
            case 箭神.传说冒险家:
            case 冲锋队长.传说冒险家:
            case 船长.传说冒险家:
            case 隐士.传说冒险家:
            case 火毒.传说冒险家:
            case 神炮王.传说冒险家:
            case 主教.传说冒险家:
            case 英雄.传说冒险家:
            case 黑骑士.传说冒险家:
                return true;
        }
        return false;
    }

    private boolean is守护者之荣誉() {
        switch (sourceid) {
            case 魂骑士.守护者之荣誉:
            case 奇袭者.守护者之荣誉:
            case 炎术士.守护者之荣誉:
            case 夜行者.守护者之荣誉:
            case 风灵使者.守护者之荣誉:
                return true;
        }
        return false;
    }

    private boolean is英雄奥斯() {
        switch (sourceid) {
            case 战神.英雄奥斯:
            case 龙神.英雄奥斯:
            case 双弩.英雄奥斯:
            case 幻影.英雄奥斯:
            case 夜光.英雄奥斯:
            case 隐月.英雄奥斯:
                return true;
        }
        return false;
    }

    private boolean is自由之墙() {
        switch (sourceid) {
            case 恶魔猎手.自由之墙:
            case 唤灵斗师.自由之墙:
            case 豹弩游侠.自由之墙:
            case 机械师.自由之墙:
            case 恶魔复仇者.自由之墙:
                return true;
        }
        return false;
    }

    private boolean is金属机甲() {
        return skill && (sourceid == 机械师.金属机甲_人类 || sourceid == 机械师.金属机甲_战车 || sourceid == 机械师.终极机甲);
    }

    public boolean is召唤美洲豹() {
        if (skill) {
            switch (sourceid) {
                case 豹弩游侠.召唤美洲豹_灰:
                case 豹弩游侠.召唤美洲豹_黄:
                case 豹弩游侠.召唤美洲豹_红:
                case 豹弩游侠.召唤美洲豹_紫:
                case 豹弩游侠.召唤美洲豹_蓝:
                case 豹弩游侠.召唤美洲豹_剑:
                case 豹弩游侠.召唤美洲豹_雪:
                case 豹弩游侠.召唤美洲豹_玛瑙:
                case 豹弩游侠.召唤美洲豹_铠甲:
                    return true;
            }
        }
        return false;
    }

    private boolean is美洲豹技能() {
        switch (sourceid) {
            case 豹弩游侠.利爪狂风:
            case 豹弩游侠.激怒:
            case 豹弩游侠.十字攻击:
            case 豹弩游侠.毁灭音爆:
            case 豹弩游侠.美洲豹灵魂:
                return true;
            default:
                return false;
        }
    }

    private boolean is死亡契约() {
        switch (sourceid) {
            case 唤灵斗师.死亡:
            case 唤灵斗师.死亡契约:
            case 唤灵斗师.死亡契约2:
            case 唤灵斗师.死亡契约3:
                return true;
        }
        return false;
    }

    public boolean is战法灵气() {
        switch (sourceid) {
            case 唤灵斗师.黄色灵气:
            case 唤灵斗师.吸收灵气:
            case 唤灵斗师.蓝色灵气:
            case 唤灵斗师.黑暗灵气:
            case 唤灵斗师.减益灵气:
                return true;
        }
        return false;
    }

    public boolean is影朋小白() {
        return skill && sourceid == 阴阳师.影朋_小白;
    }

    public boolean is拔刀姿势() {
        return skill && sourceid == 剑豪.拔刀姿势;
    }

    public boolean is避柳() {
        return skill && sourceid == 剑豪.避柳;
    }

    public boolean is灵狐() {
        return skill && sourceid == 隐月.灵狐;
    }

    public boolean is终极物质() {
        return skill && sourceid == 超能力者.终极_物质;
    }

    public boolean is终极火车() {
        return skill && sourceid == 超能力者.终极_火车;
    }

    public boolean is终极心魂弹() {
        return skill && sourceid == 超能力者.终极_心魂弹;
    }

    public boolean is终极BPM() {
        return skill && sourceid == 超能力者.终极_BPM;
    }

    public boolean is心魂本能() {
        return skill && sourceid == 超能力者.心魂本能;
    }

    public boolean is心魂吸收() {
        return skill && sourceid == 超能力者.心魂吸收;
    }

    public boolean is心魂充能() {
        return skill && sourceid == 超能力者.心魂充能;
    }

    public boolean is刺客标记() {
        return skill && (sourceid == 隐士.刺客标记);
    }

    /**
     * 机率计算结果，根据随机数据对比得到结果
     *
     * @return true ? 执行 : 不执行
     */
    public boolean makeChanceResult() {
        return info.get(MapleStatInfo.prop) >= 100 || Randomizer.nextInt(100) < info.get(MapleStatInfo.prop);
    }

    /**
     * 机率值
     *
     * @return 值
     */
    public int getProp() {
        return info.get(MapleStatInfo.prop);
    }

    /**
     * 额外机率
     *
     * @return
     */
    public int getSubProp() {
        return info.get(MapleStatInfo.subProp);
    }

    /*
     * 无视怪物防御
     */
    public short getIgnoreMob() {
        return ignoreMob;
    }

    /*
     * 增加Hp
     */
    public int getEnhancedHP() {
        return info.get(MapleStatInfo.emhp);
    }

    /*
     * 增加Mp
     */
    public int getEnhancedMP() {
        return info.get(MapleStatInfo.emmp);
    }

    /*
     * 增加物理攻击
     */
    public int getEnhancedWatk() {
        return info.get(MapleStatInfo.epad);
    }

    /*
     * 增加魔法攻击
     */
    public int getEnhancedMatk() {
        return info.get(MapleStatInfo.emad);
    }

    /*
     * 增加物理防御
     */
    public int getEnhancedWdef() {
        return info.get(MapleStatInfo.pdd);
    }

    /*
     * 增加魔法防御
     */
    public int getEnhancedMdef() {
        return info.get(MapleStatInfo.emdd);
    }

    /**
     * *
     * 持续伤害%比
     *
     * @return
     */
    public int getDOT() {
        return info.get(MapleStatInfo.dot);
    }

    /**
     * ***
     * 持续总时间
     *
     * @return
     */
    public int getDOTTime() {
        return info.get(MapleStatInfo.dotTime);
    }

    /*
     * 爆击概率
     */
    public int getCritical() {
        return info.get(MapleStatInfo.cr);
    }

    /*
     * 爆击最大伤害
     */
    public int getCriticalMax() {
        return info.get(MapleStatInfo.criticaldamageMax);
    }

    /*
     * 爆击最小伤害
     */
    public int getCriticalMin() {
        return info.get(MapleStatInfo.criticaldamageMin);
    }

    /*
     * 命中增加 x%
     */
    public int getArRate() {
        return info.get(MapleStatInfo.ar);
    }

    public int getASRRate() {
        return info.get(MapleStatInfo.asrR);
    }

    public int getTERRate() {
        return info.get(MapleStatInfo.terR);
    }

    /*
     * 攻击伤害提高 百分比
     */
    public int getDAMRate() {
        return info.get(MapleStatInfo.damR);
    }

    /*
     * 魔攻伤害提高 百分比
     */
    public int getMdRate() {
        return info.get(MapleStatInfo.mdR);
    }

    /*
     * 攻击伤害提高 百分比
     */
    public int getPercentDamageRate() {
        return info.get(MapleStatInfo.pdR);
    }

    /*
     * 金币获得量增加x%
     */
    public short getMesoRate() {
        return mesoR;
    }

    public int getEXP() {
        return exp;
    }

    /*
     * 物理防御力的x%追加到魔法防御力
     */
    public int getWdefToMdef() {
        return info.get(MapleStatInfo.pdd2mdd);
    }

    /*
     * 魔法防御力的x%追加到物理防御力
     */
    public int getMdefToWdef() {
        return info.get(MapleStatInfo.mdd2pdd);
    }

    /*
     * 回避值提升HP上限 - HP上限增加回避值的x%
     */
    public int getAvoidToHp() {
        return info.get(MapleStatInfo.eva2hp);
    }

    /*
     * 命中值提升MP上限 - MP上限增加命中值的x%
     */
    public int getAccToMp() {
        return info.get(MapleStatInfo.acc2mp);
    }

    /*
     * 力量提升敏捷 - 投资了AP力量的x%追加到敏捷
     */
    public int getStrToDex() {
        return info.get(MapleStatInfo.str2dex);
    }

    /*
     * 敏捷提升力量 - 投资了AP敏捷的x%追加到力量
     */
    public int getDexToStr() {
        return info.get(MapleStatInfo.dex2str);
    }

    /*
     * 智力提升运气 - 投资了AP智力的x%追加到运气
     */
    public int getIntToLuk() {
        return info.get(MapleStatInfo.int2luk);
    }

    /*
     * 运气提升敏捷 - 投资了AP运气的x%追加到敏捷
     */
    public int getLukToDex() {
        return info.get(MapleStatInfo.luk2dex);
    }

    /*
     * Hp增加攻击伤害
     */
    public int getHpToDamageX() {
        return info.get(MapleStatInfo.mhp2damX);
    }

    /*
     * Mp增加攻击伤害
     */
    public int getMpToDamageX() {
        return info.get(MapleStatInfo.mmp2damX);
    }

    /*
     * 升级增加最大HP上限
     */
    public int getLevelToMaxHp() {
        return info.get(MapleStatInfo.lv2mhp);
    }

    /*
     * 升级增加最大MP上限
     */
    public int getLevelToMaxMp() {
        return info.get(MapleStatInfo.lv2mmp);
    }

    /*
     * 升级增加增加攻击伤害
     */
    public int getLevelToDamageX() {
        return info.get(MapleStatInfo.lv2damX);
    }

    /*
     * 升级增加物理攻击力 - 每x级攻击力增加1
     */
    public int getLevelToWatk() {
        return info.get(MapleStatInfo.lv2pad);
    }

    /*
     * 升级增加魔法攻击力 - 每x级魔法攻击力增加1
     */
    public int getLevelToMatk() {
        return info.get(MapleStatInfo.lv2mad);
    }

    /*
     * 升级增加物理攻击力 - 每5级攻击力增加1
     */
    public int getLevelToWatkX() {
        return info.get(MapleStatInfo.lv2pdX);
    }

    /*
     * 升级增加魔法攻击力 - 每5级魔法攻击力增加1
     */
    public int getLevelToMatkX() {
        return info.get(MapleStatInfo.lv2mdX);
    }

    /**
     * 死亡时经验减少 X%
     *
     * @return
     */
    public int getEXPLossRate() {
        return info.get(MapleStatInfo.expLossReduceR);
    }

    /**
     * 增加增益效果时间 X%
     *
     * @return
     */
    public int getBuffTimeRate() {
        return info.get(MapleStatInfo.bufftimeR);
    }

    public int getSuddenDeathR() {
        return info.get(MapleStatInfo.suddenDeathR);
    }

    /**
     * 增加召唤兽时间 X%
     *
     * @return
     */
    public int getSummonTimeInc() {
        return info.get(MapleStatInfo.summonTimeR);
    }

    /**
     * 增加MP药物效果 X%
     *
     * @return
     */
    public int getMPConsumeEff() {
        return info.get(MapleStatInfo.mpConEff);
    }

    /*
     * 增加物理攻击力
     */
    public int getAttackX() {
        return info.get(MapleStatInfo.padX);
    }

    /*
     * 增加魔法攻击力
     */
    public int getMagicX() {
        return info.get(MapleStatInfo.madX);
    }

    /*
     * 最大Hp增加 按百分比
     */
    public int getPercentHP() {
        return info.get(MapleStatInfo.mhpR);
    }

    /*
     * 最大Mp增加 按百分比
     */
    public int getPercentMP() {
        return info.get(MapleStatInfo.mmpR);
    }

    /*
     * 受到怪物攻击的伤害减少x%
     */
    public int getIgnoreMobDamR() {
        return info.get(MapleStatInfo.ignoreMobDamR);
    }

    /*
     * 防御率无视x%
     */
    public int getIndieIgnoreMobpdpR() {
        return info.get(MapleStatInfo.indieIgnoreMobpdpR);
    }

    /*
     * 受到伤害减少x%
     */
    public int getDamAbsorbShieldR() {
        return info.get(MapleStatInfo.damAbsorbShieldR);
    }

    public int getConsume() {
        return consumeOnPickup;
    }

    /**
     * 自爆伤害
     *
     * @return
     */
    public int getSelfDestruction() {
        return info.get(MapleStatInfo.selfDestruction);
    }

    public int getCharColor() {
        return charColor;
    }

    public List<Integer> getPetsCanConsume() {
        return petsCanConsume;
    }

    public boolean isReturnScroll() {
        return skill && (sourceid == 幻影.幻影回归 //幻影回归 - 返回到幻影的专用飞艇水晶花园中。
                || sourceid == 80001040 //精灵的祝福
                || sourceid == 20021110 //精灵的祝福
                );
    }

    public int getRange() {
        return info.get(MapleStatInfo.range);
    }

    /*
     * 回避率增加 x%
     */
    public int getER() {
        return info.get(MapleStatInfo.er);
    }

    public int getPrice() {
        return info.get(MapleStatInfo.price);
    }

    public int getExtendPrice() {
        return info.get(MapleStatInfo.extendPrice);
    }

    public int getPeriod() {
        return info.get(MapleStatInfo.period);
    }

    public int getReqGuildLevel() {
        return info.get(MapleStatInfo.reqGuildLevel);
    }

    public byte getEXPRate() {
        return expR;
    }

    public short getLifeID() {
        return lifeId;
    }

    public short getUseLevel() {
        return useLevel;
    }

    /*
     * 矿(药)背包道具需要
     */
    public byte getSlotCount() {
        return slotCount;
    }

    public byte getSlotPerLine() {
        return slotPerLine;
    }


    /*
     * 增加力量
     */
    public int getStr() {
        return info.get(MapleStatInfo.str);
    }

    public int getStrX() {
        return info.get(MapleStatInfo.strX);
    }

    public int getStrFX() {
        return info.get(MapleStatInfo.strFX);
    }

    public int getStrRate() {
        return info.get(MapleStatInfo.strR);
    }

    /*
     * 增加敏捷
     */
    public int getDex() {
        return info.get(MapleStatInfo.dex);
    }

    public int getDexX() {
        return info.get(MapleStatInfo.dexX);
    }

    public int getDexFX() {
        return info.get(MapleStatInfo.dexFX);
    }

    public int getDexRate() {
        return info.get(MapleStatInfo.dexR);
    }

    /*
     * 增加智力
     */
    public int getInt() {
        return info.get(MapleStatInfo.int_);
    }

    public int getIntX() {
        return info.get(MapleStatInfo.intX);
    }

    public int getIntFX() {
        return info.get(MapleStatInfo.intFX);
    }

    public int getIntRate() {
        return info.get(MapleStatInfo.intR);
    }

    /*
     * 增加运气
     */
    public int getLuk() {
        return info.get(MapleStatInfo.luk);
    }

    public int getLukX() {
        return info.get(MapleStatInfo.lukX);
    }

    public int getLukFX() {
        return info.get(MapleStatInfo.lukFX);
    }

    public int getLukRate() {
        return info.get(MapleStatInfo.lukR);
    }

    /*
     * 最大HP增加
     */
    public int getMaxHpX() {
        return info.get(MapleStatInfo.mhpX);
    }

    /*
     * 最大MP增加
     */
    public int getMaxMpX() {
        return info.get(MapleStatInfo.mmpX);
    }

    /*
     * 命中值增加
     */
    public int getAccX() {
        return info.get(MapleStatInfo.accX);
    }

    /*
     * 命中值增加 x%
     */
    public int getPercentAcc() {
        return info.get(MapleStatInfo.accR);
    }

    /*
     * 回避值增加
     */
    public int getAvoidX() {
        return info.get(MapleStatInfo.evaX);
    }

    /*
     * 回避值增加 x%
     */
    public int getPercentAvoid() {
        return info.get(MapleStatInfo.evaR);
    }

    /*
     * 物理防御力增加
     */
    public int getWdefX() {
        return info.get(MapleStatInfo.pddX);
    }

    /*
     * 魔法防御力增加
     */
    public int getMdefX() {
        return info.get(MapleStatInfo.mddX);
    }

    /*
     * Hp增加
     */
    public int getIndieMHp() {
        return info.get(MapleStatInfo.indieMhp);
    }

    /*
     * Mp增加
     */
    public int getIndieMMp() {
        return info.get(MapleStatInfo.indieMmp);
    }

    /*
     * 百分比MaxHp增加
     */
    public int getIndieMhpR() {
        return info.get(MapleStatInfo.indieMhpR);
    }

    /*
     * 百分比MaxMp增加
     */
    public int getIndieMmpR() {
        return info.get(MapleStatInfo.indieMmpR);
    }

    /*
     * 所有属性增加
     */
    public int getIndieAllStat() {
        return info.get(MapleStatInfo.indieAllStat);
    }

    /*
     * 爆击概率增加 %
     */
    public int getIndieCr() {
        return info.get(MapleStatInfo.indieCr);
    }

    /**
     * *
     * 增加攻击力
     *
     * @return
     */
    public int getEpdd() {
        return info.get(MapleStatInfo.epad);
    }

    public short getIndiePdd() {
        return indiePdd;
    }

    public short getIndieMdd() {
        return indieMdd;
    }

    /*
     * 攻击力提高 %
     */
    public int getIndieDamR() {
        return info.get(MapleStatInfo.indieDamR);
    }

    /*
     * 提高攻击速度
     */
    public int getIndieBooster() {
        return info.get(MapleStatInfo.indieBooster);
    }

    public byte getType() {
        return type;
    }

    /*
     * 攻击BOSS时，伤害增加x%
     */
    public int getBossDamage() {
        return info.get(MapleStatInfo.bdR);
    }

    /*
     * 攻击时怪物数量少于技能的数量伤害提高
     */
    public int getMobCountDamage() {
        return info.get(MapleStatInfo.mobCountDamR);
    }

    public int getInterval() {
        return interval;
    }

    public ArrayList<Pair<Integer, Integer>> getAvailableMaps() {
        return availableMap;
    }

    /*
     * 增加物防 按百分比
     */
    public int getWDEFRate() {
        return info.get(MapleStatInfo.pddR);
    }

    /*
     * 增加魔防 按百分比
     */
    public int getMDEFRate() {
        return info.get(MapleStatInfo.mddR);
    }

    /*
     * 新增变量
     */
    public int getKillSpree() {
        return info.get(MapleStatInfo.kp);
    }

    /*
     * 技能伤害最大值
     */
    public int getMaxDamageOver() {
        return info.get(MapleStatInfo.MDamageOver);
    }

    /*
     * 技能伤害最大值
     */
    public int getIndieMaxDamageOver() {
        return info.get(MapleStatInfo.indieMaxDamageOver);
    }

    /*
     * 消耗更多的 Mp 来增加技能的伤害
     */
    public int getCostMpRate() {
        return info.get(MapleStatInfo.costmpR);
    }

    /*
     * 技能Mp消耗减少 %
     */
    public int getMPConReduce() {
        return info.get(MapleStatInfo.mpConReduce);
    }

    /*
     * 恶魔的最大DF增加 也就是恶魔精气
     */
    public int getIndieMaxDF() {
        return info.get(MapleStatInfo.MDF);
    }

    /*
     * 格外增加攻击怪物的数量
     */
    public int getTargetPlus() {
        return info.get(MapleStatInfo.targetPlus);
    }

    /*
     * 使用技能消耗
     */
    public int getForceCon() {
        return info.get(MapleStatInfo.forceCon);
    }

    /*
     * 使用灵魂技能
     */
    public int getSoulMpCon() {
        return info.get(MapleStatInfo.soulmpCon);
    }

    /*
     * 使用pp技能消耗
     */
    public int getPPCon() {
        return info.get(MapleStatInfo.ppCon);
    }

    /*
     * 取消BUFF的线程操作
     */
    public static class CancelEffectAction implements Runnable {

        private MapleStatEffect effect;
        private WeakReference<MapleCharacter> target;
        private long startTime;
        private List<Pair<MapleBuffStat, Integer>> statup;

        public CancelEffectAction(MapleCharacter target, MapleStatEffect effect, long startTime, List<Pair<MapleBuffStat, Integer>> statup) {
            this.effect = effect;
            this.target = new WeakReference<>(target);
            this.startTime = startTime;
            this.statup = statup;
        }

        @Override
        public void run() {
            MapleCharacter realTarget = target.get();
            if (realTarget != null) {
                realTarget.cancelEffect(effect, false, startTime, statup);
            }
        }
    }

    public boolean isOnRule() {
        return ruleOn;
    }

    public boolean is疾风() {
        return skill && sourceid == 奇袭者.台风 || sourceid == 奇袭者.疾风;
    }
}
