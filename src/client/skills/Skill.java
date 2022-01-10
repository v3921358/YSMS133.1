package client.skills;

import constants.GameConstants;
import constants.JobConstants;
import constants.skills.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import provider.MapleData;
import provider.MapleDataTool;
import server.MapleStatEffect;
import server.Randomizer;
import server.life.Element;
import tools.FileoutputUtil;
import tools.Pair;

public class Skill {

    private enum SkillType {

        BUFF_ICO(10),
        PASSIVE(30, 31, 50, 51),//不同類型的被動技能
        PASSIVE_TRUE(50),//唯一类型的被动技能
        MONSTER_DEBUFF(32),//怪物異常效果技能
        SPAWN_OBJECT(33),//基本上全是召喚類技能
        MONSTER_DEBUFF_OR_CANCEL(34),//用於取消怪物特定效果的技能
        SINGLE_EFFECT(35),//非攻擊技能 楓葉淨化
        PROTECTIVE_MIST(36),//在地圖中召喚中特定的技能效果 如（煙幕彈）
        RESURRECT(38),//復活玩家技能
        MOVEMENT(40),//移動相關技能
        MOVEMENT_RANDOM(42),//龍之氣息 隨便移動到地圖上某個地方
        KEY_COMBO_ATTACK(52),//連擊技能
        COVER_SKILL(98),//雙重攻擊 終極攻擊 超級體 重裝武器精通 猴子衝擊
        ;//效果分類是特別奇怪的··但基本上都是 >= 10 (不包含上述聲明)
        int[] vals;

        SkillType(int... vals) {
            this.vals = vals;
        }
    }

    private String name = "", psdDamR = "", targetPlus = "", minionAttack, minionAbility;
    private Element element = Element.NEUTRAL;
    private List<MapleStatEffect> pvpEffects = null;
    private List<Integer> animation = null;
    private final List<MapleStatEffect> effects = new ArrayList<>();
    private final List<Pair<String, Byte>> requiredSkill = new ArrayList<>();
    private final int id;
    private int hyper = 0, hyperStat = 0, reqLev = 0, animationTime = 0, masterLevel = 0, maxLevel = 0, delay = 0, trueMax = 0, eventTamingMob = 0, skillType = 0,
            fixLevel, disableNextLevelInfo, psd = 0, psdSkill = 0, setItemReason, setItemPartsCount, maxDamageOver = 999999, ppRecovery = 0;
    private boolean invisible = false, chargeskill = false, timeLimited = false, combatOrders = false, pvpDisabled = false, magic = false, casterMove = false, chargingSkill, passiveSkill, selfDestructMinion,
            rapidAttack, pushTarget = false, pullTarget = false, isBuffSkill = false, isSummon = false, notRemoved = false, disable = false, hasMasterLevelProperty = false, petPassive = false;
    private Map<Integer, Integer> bonusExpInfo = new HashMap<>(); //[技能等级] [升级需要的经验]

    public Skill(int id) {
        super();
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static Skill loadFromData(int id, MapleData data, MapleData delayData) {
        boolean showSkill = false;
        if (showSkill) {
            System.out.println("正在解析技能id: " + id + " 名字: " + SkillFactory.getSkillName(id));
            FileoutputUtil.log(FileoutputUtil.SkillsLog, "正在解析技能id: " + id + " 名字: " + SkillFactory.getSkillName(id), true);
        }
        Skill ret = new Skill(id);

        boolean isBuff;
        int skillType = MapleDataTool.getInt("skillType", data, -1);
        String elem = MapleDataTool.getString("elemAttr", data, null);
        ret.element = elem != null ? Element.getFromChar(elem.charAt(0)) : Element.NEUTRAL;
        ret.skillType = skillType;
        ret.invisible = MapleDataTool.getInt("invisible", data, 0) > 0;
        MapleData effect = data.getChildByPath("effect");
        MapleData common = data.getChildByPath("common");
        MapleData inf = data.getChildByPath("info");
        MapleData hit = data.getChildByPath("hit");
        MapleData ball = data.getChildByPath("ball");
        ret.isSummon = data.getChildByPath("summon") != null;
        ret.masterLevel = MapleDataTool.getInt("masterLevel", data, 0);
        if (ret.masterLevel > 0) {
            ret.hasMasterLevelProperty = true;
        }
        ret.psd = MapleDataTool.getInt("psd", data, 0);
        if (ret.psd == 1) {
            final MapleData psdskill = data.getChildByPath("psdSkill");
            if (psdskill != null) {
                ret.psdSkill = Integer.parseInt(data.getChildByPath("psdSkill").getChildren().get(0).getName());
            }
        }
        ret.notRemoved = MapleDataTool.getInt("notRemoved", data, 0) > 0;
        ret.timeLimited = MapleDataTool.getInt("timeLimited", data, 0) > 0;
        ret.combatOrders = MapleDataTool.getInt("combatOrders", data, 0) > 0;
        ret.fixLevel = MapleDataTool.getInt("fixLevel", data, 0);
        ret.disable = MapleDataTool.getInt("disable", data, 0) > 0;
        ret.disableNextLevelInfo = MapleDataTool.getInt("disableNextLevelInfo", data, 0);
        ret.eventTamingMob = MapleDataTool.getInt("eventTamingMob", data, 0);
        ret.hyper = MapleDataTool.getInt("hyper", data, 0); //超级技能栏位设置 P A
        ret.hyperStat = MapleDataTool.getInt("hyperStat", data, 0); //超级属性点
        ret.reqLev = MapleDataTool.getInt("reqLev", data, 0); //超级技能需要的等级
        ret.petPassive = MapleDataTool.getInt("petPassive", data, 0) > 0; //是否宠物被动触发技能
        ret.setItemReason = MapleDataTool.getInt("setItemReason", data, 0); //触发技能的套装ID
        ret.setItemPartsCount = MapleDataTool.getInt("setItemPartsCount", data, 0); //触发技能需要的数量
        ret.ppRecovery = MapleDataTool.getInt("ppRecovery", data, 0); //超能力者pp恢复量
        if (inf != null) {
            ret.pvpDisabled = MapleDataTool.getInt("pvp", inf, 1) <= 0;
            ret.magic = MapleDataTool.getInt("magicDamage", inf, 0) > 0;
            ret.casterMove = MapleDataTool.getInt("casterMove", inf, 0) > 0;
            ret.pushTarget = MapleDataTool.getInt("pushTarget", inf, 0) > 0;
            ret.pullTarget = MapleDataTool.getInt("pullTarget", inf, 0) > 0;
            ret.rapidAttack = MapleDataTool.getInt("rapidAttack", inf, 0) > 0;
            ret.minionAttack = MapleDataTool.getString("minionAttack", inf, null);
            ret.minionAbility = MapleDataTool.getString("minionAbility", inf, null);
            ret.selfDestructMinion = MapleDataTool.getInt("selfDestructMinion", inf, 0) > 0;
            ret.chargingSkill = MapleDataTool.getInt("chargingSkill", inf, 0) > 0 || MapleDataTool.getInt("keydownThrowing", inf, 0) > 0;
        }
        if (skillType == 2) {
            isBuff = true;
        } else if (skillType == 3) { //final attack
            ret.animation = new ArrayList<>();
            ret.animation.add(0);
            isBuff = effect != null;
            switch (id) {
                case 夜光.太阳火焰:
                case 夜光.月蚀:
                case 夜光.平衡_光明:
                case 夜光.光明黑暗模式转换:
                case 夜光.平衡_黑暗:
                    isBuff = true;
            }
        } else {
            MapleData action_ = data.getChildByPath("action");
            boolean action = false;
            if (action_ == null && data.getChildByPath("prepare/action") != null) {
                action_ = data.getChildByPath("prepare/action");
                action = true;
            }
            isBuff = effect != null && hit == null && ball == null;
            if (action_ != null) {
                String d;
                if (action) { //prepare
                    d = MapleDataTool.getString(action_, null);
                } else {
                    d = MapleDataTool.getString("0", action_, null);
                }
                if (d != null) {
                    isBuff |= d.equals("alert2");
                    MapleData dd = delayData.getChildByPath(d);
                    if (dd != null) {
                        for (MapleData del : dd) {
                            ret.delay += Math.abs(MapleDataTool.getInt("delay", del, 0));
                        }
                        if (ret.delay > 30) { //then, faster(2) = (10+2)/16 which is basically 3/4
                            ret.delay = (int) Math.round(ret.delay * 11.0 / 16.0); //fastest(1) lolol
                            ret.delay -= ret.delay % 30; //round to 30ms
                        }
                    }
                    if (SkillFactory.getDelay(d) != null) { //this should return true always
                        ret.animation = new ArrayList<>();
                        ret.animation.add(SkillFactory.getDelay(d));
                        if (!action) {
                            for (MapleData ddc : action_) {
                                if (!MapleDataTool.getString(ddc, d).equals(d) && !ddc.getName().contentEquals("delay")) {
                                    String c = MapleDataTool.getString(ddc);
                                    if (SkillFactory.getDelay(c) != null) {
                                        ret.animation.add(SkillFactory.getDelay(c));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            switch (id) {
                case 主教.群体治愈:
                case 火毒.致命毒雾:
                case 龙神.极光恢复:
                case 唤灵斗师.避难所:
                case 火毒.末日烈焰:
                //case 火毒.创世之破:
                //case 冰雷.创世之破:
                case 主教.创世之破:
                case 1076: //奥兹的火牢术屏障
                case 双刀.龙卷风:
                case 神之子.暴风步:
                    isBuff = false;
                    break;
                case 1004: //骑兽技能
                case 10001004: //骑兽技能
                case 20001004: //骑兽技能
                case 20011004: //骑兽技能
                case 80001000: //骑兽技能
                case 1026: //飞翔
                case 10001026: //飞翔
                case 20001026: //飞翔
                case 20011026: //飞翔
                case 20021026: //飞翔
                case 30001026: //飞翔
                case 30011026: //飞翔
                case 93: //潜力解放(冒险家)
                case 10000093: //潜力解放(骑士团)
                case 20000093: //潜力解放(战神)
                case 20010093: //潜力解放(龙神)
                case 20020093: //潜力解放（英雄）
                case 30000093: //潜力解放(反抗者)
                case 30010093: //潜力解放（反抗者）
                case 9101004: // hide is a buff -.- atleast for us o.o"
                case 80001140: //光之守护 - [排名技能]受到光之骑士米哈尔的庇护，在一定时间内，即使受到敌人攻击也不会被击退。
                case 英雄.斗气集中:
                case 神射手.无形箭:
                case 神射手.极限射箭:
                case 箭神.无形箭:
                case 箭神.极限射箭:
                case 箭神.伤害置换:
                case 侠盗.敛财术:
                case 侠盗.侠盗本能:
                case 侠盗.暗杀:
                case 风灵使者.重振精神:
                case 战神.矛连击强化:
                case 战神.抗压:
                case 海盗.疾驰:
                case 奇袭者.疾风:
                case 冲锋队长.能量获得:
                case 冲锋队长.极速领域:
                case 龙神.自然力重置:
                case 龙神.魔法屏障:
                case 龙神.魔法狂暴:
                case 龙神.魔翼斩杀:
                case 龙神.抗魔领域:
                case 龙神.鬼刻符:
                case 龙神.冒险岛勇士:
                case 龙神.勇士的意志:
                case 龙神.玛瑙的祝福:
                case 龙神.玛瑙的意志:
                case 龙神.玛瑙的保佑:
                case 龙神.灵魂之石:
                case 龙神.冰点寒气:
                case 龙神.火焰喷射:
                case 黑骑士.灵魂祝福:
                case 黑骑士.灵魂助力震惊:
                case 机械师.终极机甲:
                case 机械师.金属机甲_人类:
                case 机械师.金属机甲_战车:
                case 管理员.隐藏术:
                case 双刀.终极斩:
                case 唤灵斗师.黑暗灵气:
                case 唤灵斗师.蓝色灵气:
                case 唤灵斗师.黄色灵气:
                case 唤灵斗师.减益灵气:
                case 唤灵斗师.吸收灵气:
                case 唤灵斗师.暴怒对战:
                case 唤灵斗师.黑暗闪电:
                case 唤灵斗师.死亡:
                case 机械师.完美机甲:
                case 英雄.魔击无效:
                case 圣骑士.魔击无效:
                case 黑骑士.魔击无效:
                case 冲锋队长.幸运骰子:
                case 冲锋队长.双幸运骰子:
                case 船长.幸运骰子:
                case 船长.双幸运骰子:
                case 船长.船员统帅:
                case 神炮王.幸运骰子:
                case 神炮王.双幸运骰子:
                case 机械师.幸运骰子:
                case 机械师.双幸运骰子:
                case 冲锋队长.反制攻击:
                case 船长.反制攻击:
                case 圣骑士.祝福护甲:
                case 豹弩游侠.呼啸:
                case 豹弩游侠.辅助打猎单元:
                case 豹弩游侠.集束箭:
                case 豹弩游侠.撤步退身:
                case 豹弩游侠.召唤美洲豹_灰:
                case 豹弩游侠.召唤美洲豹_黄:
                case 豹弩游侠.召唤美洲豹_红:
                case 豹弩游侠.召唤美洲豹_紫:
                case 豹弩游侠.召唤美洲豹_蓝:
                case 豹弩游侠.召唤美洲豹_剑:
                case 豹弩游侠.召唤美洲豹_雪:
                case 豹弩游侠.召唤美洲豹_玛瑙:
                case 豹弩游侠.召唤美洲豹_铠甲:
                case 豹弩游侠.利爪狂风:
                case 豹弩游侠.激怒:
                case 豹弩游侠.十字攻击:
                case 豹弩游侠.毁灭音爆:
                case 豹弩游侠.美洲豹灵魂:
                case 机械师.战争机器_泰坦:
                case 机械师.机器人工厂_RM1:
                case 机械师.机器人发射器_RM7:
                case 机械师.支援波动器_H_EX:
                case 机械师.磁场:
                case 机械师.传送门_GX9:
                case 火毒.魔力精通:
                case 火毒.神秘瞄准术:
                case 冰雷.魔力精通:
                case 冰雷.神秘瞄准术:
                case 主教.魔力精通:
                case 主教.神秘瞄准术:
                case 神炮王.磁性船锚:
                case 神炮王.双胞胎猴子支援:
                case 80001089: //飞行骑乘·
                case 恶魔猎手.黑暗变形:
                case 幻影.神秘的运气:
                case 幻影.卡牌审判:
                case 幻影.卡牌审判_高级:
                case 双刀.影子闪避:
                case 船长.无尽追击:
                case 夜光.黑暗祝福:
                case 夜光.生命潮汐:
                case 夜光.记录:
                case 尖兵.急速支援:
                case 尖兵.宙斯盾系统:
                case 神射手.三彩箭矢:
                case 狂龙战士.石化:
                case 狂龙战士.防御模式:
                case 狂龙战士.攻击模式:
                case 狂龙战士.剑刃之壁:
                case 狂龙战士.进阶剑刃之壁:
                case 狂龙战士.剑刃之壁_变身:
                case 狂龙战士.进阶剑刃之壁_变身:
                case 恶魔复仇者.血之契约:
                case 恶魔复仇者.超越:
                case 恶魔复仇者.超越十字斩:
                case 恶魔复仇者.超越恶魔突袭:
                case 恶魔复仇者.超越月光斩:
                case 恶魔复仇者.超越处决:
                case 圣骑士.元素冲击:
                case 圣骑士.万佛归一破:
                case 圣骑士.连环环破:
                case 炎术士.元素_火焰:
                case 炎术士.元素_火焰II:
                case 炎术士.元素_火焰III:
                case 炎术士.元素_火焰IV:
                case 炎术士.希纳斯的骑士:
                case 冰雷.寒冰步:
                case 双刀.阿修罗:
                case 80001427:
                case 80001428:
                case 80001430:
                case 80001432:
                case 林之灵.伊卡飞翔:
                case 林之灵.阿尔之好伙伴:
                case 林之灵.阿尔之窃取:
                case 林之灵.阿尔之爪:
                case 林之灵.阿尔之魅力_强化:
                case 林之灵.阿尔之弱点把握:
                case 林之灵.阿尔之饱腹感:
                case 林之灵.红色卡片:
                case 林之灵.蓝色卡片:
                case 林之灵.绿色卡片:
                case 林之灵.金色卡片:
                case 林之灵.火焰屁:
                case 神之子.提速时刻_侦查:
                case 神之子.提速时刻_战斗:
                case 隐月.灵狐:
                case 隐月.招魂结界:
                case 剑豪.基本姿势加成:
                case 剑豪.拔刀术加成:
                case 剑豪.拔刀姿势:
                case 剑豪.秘剑_隼:
                case 剑豪.武神招来:
                case 剑豪.刚健:
                case 剑豪.晓之勇者:
                case 剑豪.晓之樱:
                case 剑豪.厚积薄发:
                case 剑豪.避柳:
                case 剑豪.迅速:
                case 阴阳师.紫扇白狐:
                case 阴阳师.影朋_小白:
                case 超能力者.心魂漫步:
                    isBuff = true;
                    break;
            }
        }
        ret.chargeskill = data.getChildByPath("keydown") != null;
        if (ret.chargeskill) {
            //FileoutputUtil.log("chargeskill.txt", "技能id: " + id + " 名字: " + SkillFactory.getSkillName(id), true);
        } else {
            switch (id) {
                case 冰雷.寒霜爆晶:
                case 林之灵.旋风飞行:
                case 夜光.晨星坠落:
                    ret.chargeskill = true;
            }
        }
        //有些技能是老的XML模式
        if (common != null) {
            ret.maxLevel = MapleDataTool.getInt("maxLevel", common, 1); //10 just a failsafe, shouldn't actually happens
            ret.psdDamR = MapleDataTool.getString("damR", common, "");
            ret.targetPlus = MapleDataTool.getString("targetPlus", common, "");
            ret.trueMax = ret.maxLevel + (ret.combatOrders ? 2 : 0);
            for (int i = 1; i <= ret.trueMax; i++) {
                ret.effects.add(MapleStatEffect.loadSkillEffectFromData(common, id, isBuff, i, "x", ret.notRemoved));
            }
            ret.maxDamageOver = MapleDataTool.getInt("MDamageOver", common, 999999);
        } else {
            for (MapleData leve : data.getChildByPath("level")) {
                ret.effects.add(MapleStatEffect.loadSkillEffectFromData(leve, id, isBuff, Byte.parseByte(leve.getName()), null, ret.notRemoved));
            }
            ret.maxLevel = ret.effects.size();
            ret.trueMax = ret.effects.size();
        }
        boolean loadPvpSkill = false;
        if (loadPvpSkill) {
            MapleData level2 = data.getChildByPath("PVPcommon");
            if (level2 != null) {
                ret.pvpEffects = new ArrayList<>();
                for (int i = 1; i <= ret.trueMax; i++) {
                    ret.pvpEffects.add(MapleStatEffect.loadSkillEffectFromData(level2, id, isBuff, i, "x", ret.notRemoved));
                }
            }
        }
        MapleData reqDataRoot = data.getChildByPath("req");
        if (reqDataRoot != null) {
            for (MapleData reqData : reqDataRoot.getChildren()) {
                ret.requiredSkill.add(new Pair<>(reqData.getName(), (byte) MapleDataTool.getInt(reqData, 1)));
            }
        }
        ret.animationTime = 0;
        if (effect != null) {
            for (MapleData effectEntry : effect) {
                ret.animationTime += MapleDataTool.getIntConvert("delay", effectEntry, 0);
            }
        }
        ret.isBuffSkill = isBuff;
        switch (id) {
            case 夜光.耀眼光球:
            case 夜光.黑暗降临:
            case 夜光.光明黑暗魔法强化:
                ret.masterLevel = ret.maxLevel;
                break;
        }

        MapleData growthInfo = data.getChildByPath("growthInfo/level");
        if (growthInfo != null) {
            for (MapleData expData : growthInfo.getChildren()) {
                ret.bonusExpInfo.put(Integer.parseInt(expData.getName()), MapleDataTool.getInt("maxExp", expData, 100000000));
            }
        }
        return ret;
    }

    public MapleStatEffect getEffect(int level) {
        if (effects.size() < level) {
            if (effects.size() > 0) { //incAllskill
                return effects.get(effects.size() - 1);
            }
            return null;
        } else if (level <= 0) {
            return effects.get(0);
        }
        return effects.get(level - 1);
    }

    public MapleStatEffect getPVPEffect(int level) {
        if (pvpEffects == null) {
            return getEffect(level);
        }
        if (pvpEffects.size() < level) {
            if (pvpEffects.size() > 0) { //incAllskill
                return pvpEffects.get(pvpEffects.size() - 1);
            }
            return null;
        } else if (level <= 0) {
            return pvpEffects.get(0);
        }
        return pvpEffects.get(level - 1);
    }

    public int getSkillType() {
        return skillType;
    }

    public List<Integer> getAllAnimation() {
        return animation;
    }

    public int getAnimation() {
        if (animation == null) {
            return -1;
        }
        return animation.get(Randomizer.nextInt(animation.size()));
    }

    public int getPsdSkill() {
        return psdSkill;
    }

    public int getPsd() {
        return psd;
    }

    public String getPsdDamR() {
        return psdDamR;
    }

    public String getPsdtarget() {
        return targetPlus;
    }

    public boolean isPVPDisabled() {
        return pvpDisabled;
    }

    public boolean isChargeSkill() {
        return chargeskill;
    }

    public boolean isInvisible() {
        return invisible;
    }

    public boolean isNotRemoved() {
        return notRemoved;
    }

    public boolean isRapidAttack() {
        return rapidAttack;
    }

    public boolean isPassiveSkill() {
        return passiveSkill;
    }

    public boolean isChargingSkill() {
        return chargingSkill;
    }

    public boolean hasRequiredSkill() {
        return requiredSkill.size() > 0;
    }

    public List<Pair<String, Byte>> getRequiredSkills() {
        return requiredSkill;
    }

    public int getMaxLevel() {
        return maxLevel;
    }

    public int getTrueMax() {
        return trueMax;
    }

    public boolean combatOrders() {
        return combatOrders;
    }

    public boolean canBeLearnedBy(int job) {
        int jid = job;
        int skillForJob = id / 10000;
        if (skillForJob == 2001) {
            return JobConstants.is龙神(job);
        } else if (skillForJob == 0) {
            return JobConstants.is冒险家(job);
        } else if (skillForJob == 500) {
            return JobConstants.is拳手(job) || JobConstants.is火枪手(job);
        } else if (skillForJob == 501) {
            return JobConstants.is火炮手(job);
        } else if (skillForJob == 508) {
            return JobConstants.is龙的传人(job);
        } else if (skillForJob == 509) {
            return JobConstants.is拳手新(job) || JobConstants.is火枪手新(job);
        } else if (skillForJob == 1000) {
            return JobConstants.is骑士团(job);
        } else if (skillForJob == 2000) {
            return JobConstants.is战神(job);
        } else if (skillForJob == 2002) {
            return JobConstants.is双弩精灵(job);
        } else if (skillForJob == 2003) {
            return JobConstants.is幻影(job);
        } else if (skillForJob == 2004) {
            return JobConstants.is夜光(job);
        } else if (skillForJob == 2500) {
            return JobConstants.is隐月(job);
        } else if (skillForJob == 3000) {
            return JobConstants.is反抗者(job);
        } else if (skillForJob == 3001) {
            return JobConstants.is恶魔猎手(job);
        } else if (skillForJob == 3002) {
            return JobConstants.is尖兵(job);
        } else if (skillForJob == 5000) {
            return JobConstants.is米哈尔(job);
        } else if (skillForJob == 6000) {
            return JobConstants.is狂龙战士(job);
        } else if (skillForJob == 6001) {
            return JobConstants.is爆莉萌天使(job);
        } else if (skillForJob == 10000) {
            return JobConstants.is神之子(job);
        } else if (skillForJob == 11000) {
            return JobConstants.is林之灵(job);
        } else if (jid / 100 != skillForJob / 100) { // wrong job
            return false;
        } else if (jid / 1000 != skillForJob / 1000) { // wrong job
            return false;
        } else if (JobConstants.is林之灵(skillForJob) && !JobConstants.is林之灵(job)) {
            return false;
        } else if (JobConstants.is神之子(skillForJob) && !JobConstants.is神之子(job)) {
            return false;
        } else if (JobConstants.is爆莉萌天使(skillForJob) && !JobConstants.is爆莉萌天使(job)) {
            return false;
        } else if (JobConstants.is狂龙战士(skillForJob) && !JobConstants.is狂龙战士(job)) {
            return false;
        } else if (JobConstants.is米哈尔(skillForJob) && !JobConstants.is米哈尔(job)) {
            return false;
        } else if (JobConstants.is尖兵(skillForJob) && !JobConstants.is尖兵(job)) {
            return false;
        } else if (JobConstants.is夜光(skillForJob) && !JobConstants.is夜光(job)) {
            return false;
        } else if (JobConstants.is隐月(skillForJob) && !JobConstants.is隐月(job)) {
            return false;
        } else if (JobConstants.is幻影(skillForJob) && !JobConstants.is幻影(job)) {
            return false;
        } else if (JobConstants.is龙的传人(skillForJob) && !JobConstants.is龙的传人(job)) {
            return false;
        } else if (JobConstants.is火炮手(skillForJob) && !JobConstants.is火炮手(job)) {
            return false;
        } else if (JobConstants.is拳手(skillForJob) && !JobConstants.is拳手(job)) {
            return false;
        } else if (JobConstants.is火枪手(skillForJob) && !JobConstants.is火枪手(job)) {
            return false;
        } else if (JobConstants.is拳手新(skillForJob) && !JobConstants.is拳手新(job)) {
            return false;
        } else if (JobConstants.is火枪手新(skillForJob) && !JobConstants.is火枪手新(job)) {
            return false;
        } else if (JobConstants.is恶魔复仇者(skillForJob) && !JobConstants.is恶魔复仇者(job)) {
            return false;
        } else if (JobConstants.is恶魔猎手(skillForJob) && !JobConstants.is恶魔猎手(job)) {
            return false;
        } else if (JobConstants.is冒险家(skillForJob) && !JobConstants.is冒险家(job)) {
            return false;
        } else if (JobConstants.is骑士团(skillForJob) && !JobConstants.is骑士团(job)) {
            return false;
        } else if (JobConstants.is战神(skillForJob) && !JobConstants.is战神(job)) {
            return false;
        } else if (JobConstants.is龙神(skillForJob) && !JobConstants.is龙神(job)) {
            return false;
        } else if (JobConstants.is双弩精灵(skillForJob) && !JobConstants.is双弩精灵(job)) {
            return false;
        } else if (JobConstants.is反抗者(skillForJob) && !JobConstants.is反抗者(job)) {
            return false;
        } else if (JobConstants.is超能力者(skillForJob) && !JobConstants.is超能力者(job)) {
            return false;
        } else if ((jid / 10) % 10 == 0 && (skillForJob / 10) % 10 > (jid / 10) % 10) { // wrong 2nd job
            return false;
        } else if ((skillForJob / 10) % 10 != 0 && (skillForJob / 10) % 10 != (jid / 10) % 10) { //wrong 2nd job
            return false;
        } else if (skillForJob % 10 > jid % 10) { // wrong 3rd/4th job
            return false;
        }
        return true;
    }

    public boolean isTimeLimited() {
        return timeLimited;
    }

    public boolean isFourthJob() {
        if (isHyperSkill()) {
            return true;
        }
        switch (id) {
            case 英雄.战斗精通:
            case 黑骑士.灵魂复仇:
            case 冲锋队长.反制攻击:
            case 冲锋队长.双幸运骰子:
            case 船长.反制攻击:
            case 船长.双幸运骰子:
            case 战神.BOSS斗气重生:
            case 双弩.旋转月瀑坠击:
            case 双弩.进阶急袭双杀:
            case 双弩.勇士的意志:
            case 双刀.武器用毒液:
            case 双刀.锋利:
            case 双刀.致命毒液:
            case 神射手.射术精修:
            case 豹弩游侠.野性本能:
            case 神炮王.勇士的意志:
            case 战神.迅捷移动:
            case 龙神.勇士的意志:
            case 龙神.玛瑙的意志:
            case 米哈尔.战斗精通:
                return false;
        }
        switch (id / 10000) {
            case 2312:
            case 2412:
            case 2712:
            case 3122:
            case 6112:
            case 6512:
            case 14212:
                return true;
            case 10100:
                return id == 神之子.进阶狂蛮撞击;
            case 10110:
                return id == 神之子.进阶神剑陨落 || id == 神之子.进阶旋卷切割;
            case 10111:
                return id == 神之子.进阶圆月旋风 || id == 神之子.进阶狂转回旋 || id == 神之子.进阶旋跃斩;
            case 10112:
                return id == 神之子.进阶地裂山崩 || id == 神之子.进阶暴风旋涡;
        }
        if ((getMaxLevel() <= 15 && !invisible && getMasterLevel() <= 0)) {
            return false;
        }
        if ((id / 10000 >= 2212 && id / 10000 <= 2218) && id / 10000 < 3000) { //龙神技能
            return ((id / 10000) % 10) >= 7;
        }
        if (id / 10000 >= 430 && id / 10000 <= 434) { //暗影双刀技能
            return ((id / 10000) % 10) == 4 || getMasterLevel() > 0;
        }
        return ((id / 10000) % 10) == 2 && id < 90000000 && !isBeginnerSkill();
    }

    public Element getElement() {
        return element;
    }

    public int getAnimationTime() {
        return animationTime;
    }

    public boolean getDisable() {
        return disable;
    }

    public int getFixLevel() {
        return this.fixLevel;
    }

    public int getMasterLevel() {
        return masterLevel;
    }

    public int getDisableNextLevelInfo() {
        return this.disableNextLevelInfo;
    }

    public int getDelay() {
        return delay;
    }

    public int getTamingMob() {
        return eventTamingMob;
    }

    public int getHyper() {
        return hyper;
    }

    public int getReqLevel() {
        return reqLev;
    }

    public int getMaxDamageOver() {
        return maxDamageOver;
    }

    public int getBonusExpInfo(int level) {
        if (bonusExpInfo.isEmpty()) {
            return -1;
        }
        if (bonusExpInfo.containsKey(level)) {
            return bonusExpInfo.get(level);
        }
        return -1;
    }

    public boolean isMagic() {
        return magic;
    }

    public boolean isMovement() {
        return casterMove;
    }

    public boolean isPush() {
        return pushTarget;
    }

    public boolean isPull() {
        return pullTarget;
    }

    public boolean isBuffSkill() {
        return isBuffSkill;
    }

    public boolean isSummonSkill() {
        return isSummon;
    }

    public boolean isNonAttackSummon() {
        return isSummon && minionAttack == null && (minionAbility == null || minionAbility.equals("taunt"));
    }

    public boolean isNonExpireSummon() {
        return selfDestructMinion;
    }

    public boolean isHyperSkill() {
        return hyper > 0 && reqLev > 0;
    }

    public boolean isHyperStat() {
        return hyperStat > 0;
    }

    /**
     * @return 家族技能
     */
    public boolean isGuildSkill() {
        int jobId = id / 10000;
        return jobId == 9100;
    }

    /**
     * 新手技能
     */
    public boolean isBeginnerSkill() {
        int jobId = id / 10000;
        return JobConstants.is新手职业(jobId);
    }

    /**
     * 管理员技能
     */
    public boolean isAdminSkill() {
        int jobId = id / 10000;
        return jobId == 800 || jobId == 900;
    }

    /**
     * 内在能力技能
     */
    public boolean isInnerSkill() {
        int jobId = id / 10000;
        return jobId == 7000;
    }

    /**
     * 特殊技能
     */
    public boolean isSpecialSkill() {
        int jobId = id / 10000;
        return jobId == 7000 || jobId == 7100 || jobId == 8000 || jobId == 9000 || jobId == 9100 || jobId == 9200 || jobId == 9201 || jobId == 9202 || jobId == 9203 || jobId == 9204;
    }

    public int getSkillByJobBook() {
        return getSkillByJobBook(id);
    }

    public int getSkillByJobBook(int skillid) {
        switch (skillid / 10000) {
            case 112:
            case 122:
            case 132:
            case 212:
            case 222:
            case 232:
            case 312:
            case 322:
            case 412:
            case 422:
            case 512:
            case 522:
                return 4;
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
                return 3;
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
                return 2;
            case 100:
            case 200:
            case 300:
            case 400:
            case 500:
                return 1;
        }
        return -1;
    }

    /*
     * 是否宠物被动触发技能
     */
    public boolean isPetPassive() {
        return petPassive;
    }

    /*
     * 触发技能的套装ID
     */
    public int getSetItemReason() {
        return setItemReason;
    }

    /*
     * 触发技能的套装需要的件数
     */
    public int geSetItemPartsCount() {
        return setItemPartsCount;
    }

    /*
     * 种族特性本能技能
     */
    public boolean isTeachSkills() {
        switch (id) {
            case 110: //0000110 - 海盗祝福 - [种族特性技能]强化火炮手特有的坚韧，永久提高各种属性。
            case 1214: //0001214 - 宝盒的庇佑 - 获得含有侠义精神的宝盒的庇佑。\n#c双击#技能可打开宝盒界面，查看目前属性及#c剩余时间#，倒计时结束后当前属性会重置。可以通过特定道具变更属性、走向、剩余时间。
            case 20021110: //20021110 - 精灵的祝福 - [种族特性技能]借助古代精灵的祝福，可以回到埃欧雷，永久性地提高经验值获得量。
            case 20030204: //20030204 - 致命本能 - 拥有通过卓越的洞察力，找到敌人致命弱点的本能。
            case 20040218: //20040218 - 穿透 - 用穿透一切阻碍的光之力量，无视敌人的部分防御力。
            case 30010112: //30010112 - 恶魔之怒 - 对象是BOSS怪时，唤醒内在的愤怒，造成更强的伤害，吸收更多的精气。
            case 30010241: //30010241 - 野性狂怒 - 由于愤怒，伤害增加。
            case 30020233: //30020233 - 混合逻辑 - 采用混合逻辑设计，所有能力值永久提高。
            case 40020002: //40020002 - 紫扇传授 - 利用五行之力，增加对敌人造成的伤害。
            case 50001214: //50001214 - 光之守护 - 受到光之守护，在一定时间内即使受到敌人攻击，也不会被击退。
            case 60000222: //60000222 - 钢铁之墙 - 具备钢铁意志的狂龙战士获得额外体力。
            case 60011219: //60011219 - 灵魂契约 - 通过和爱丝卡达的契约，攻击力瞬间到达最大。
            case 110000800: //110000800 - 精灵集中 - 攻击BOSS怪时,精灵之力会更强。
            case 100000271: //100000271 - 伦娜的祝福 - 受到伦娜女神的祝福，减少自己受到的伤害。攻击敌人时，可无视部分防御。
            case 10000255: //10000255 - 希纳斯护佑（战士） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 10000256: //10000256 - 希纳斯护佑（魔法师） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 10000257: //10000257 - 希纳斯护佑（弓箭手） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 10000258: //10000258 - 希纳斯护佑（飞侠） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 10000259: //10000259 - 希纳斯护佑（海盗） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
                return true;
        }
        return false;
    }

    /*
     * 链接技能技能
     */
    public boolean isLinkSkills() {
        switch (id) {
            case 80000000: //80000000 - 海盗祝福 - [链接技能]学习火炮手特有的强韧，永久性地提高各种属性。
            case 80000001: //80000001 - 恶魔之怒 - [链接技能]对象是BOSS怪时，唤醒内心的愤怒，造成更强的伤害。
            case 80000002: //80000002 - 致命本能 - 拥有通过卓越的洞察力，找到敌人致命弱点的本能。
            case 80000003: //80000003 - 疾风传授 - 剑斗无所不能！！但不知道他有没有什么不足的地方呢？
            case 80000004: //80000004 - 紫扇传授 - 利用五行之力，增加对敌人造成的伤害。
            case 80000005: //80000005 - 穿透 - 用穿透一切阻碍的光之力量，无视敌人的部分防御力。
            case 80000006: //80000006 - 钢铁之墙 - 具有比狂龙战士更出色的体力。
            case 80000047: //80000047 - 混合逻辑 - 采用混合逻辑设计，所有能力值永久提高。
            case 80000050: //80000050 - 野性狂怒 - 由于愤怒，伤害增加。
            case 80000055: //80000055 - 希纳斯护佑 - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000066: //80000066 - 希纳斯护佑（战士） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000067: //80000067 - 希纳斯护佑（魔法师） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000068: //80000068 - 希纳斯护佑（弓箭手） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000069: //80000069 - 希纳斯护佑（飞侠） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000070: //80000070 - 希纳斯护佑（海盗） - 觉醒的女皇的护佑充盈体内，使自己避免受到敌人的威胁。
            case 80000110: //80000110 - 伦娜的祝福 - [链接技能]获得伦娜女神的祝福，受到的伤害减少。进行攻击时，无视一部分防御。\n#c每次获得被激活的女神之泪时，技能效果得到强化。
//            case 80000169: //80000169 - 九死一生 - [链接技能]受到会导致死亡的攻击时, 有一定概率不死。
            case 80001040: //80001040 - 精灵的祝福 - [链接技能]获得古代精灵的祝福，可以回到埃欧雷去，经验值获得量永久提高。
            case 80001140: //80001140 - 光之守护 - [排名技能]受到光之骑士米哈尔的庇护，在一定时间内，即使受到敌人攻击也不会被击退。
            case 80001151: //80001151 - 宝盒的庇佑 - 获得包含了侠义精神的宝盒的庇佑。从龙的传人那里获得的属性链接，会因为自身和传授者的等级产生差异。
            case 80001155: //80001155 - 灵魂契约 - 通过与爱丝卡达的契约，瞬间令攻击力极大化。
            case 80010006: //80010006 - 精灵集中 - 攻击BOSS怪时,精灵之力会更强。
                return true;
        }
        return false;
    }

    public boolean is老技能() {
        switch (id) {
            //--------魂骑士1转---------
            case 11000005: //HP增加
            case 11000006: //守护者之甲
            case 11001001: //圣甲术
            case 11001002: //强力攻击
            case 11001003: //群体攻击
            case 11001004: //魂精灵
            //--------魂骑士2转---------
            case 11100000: //精准剑
            case 11100007: //物理训练
            case 11101001: //快速剑
            case 11101002: //终极剑
            case 11101003: //愤怒之火
            case 11101004: //灵魂之刃
            case 11101005: //灵魂迅移
            case 11101006: //伤害反射
            case 11101008: //轻舞飞扬
            //--------魂骑士3转---------
            case 11110000: //自我恢复
            case 11110005: //进阶斗气
            case 11111001: //斗气集中
            case 11111002: //恐慌
            case 11111003: //昏迷
            case 11111004: //勇猛劈砍
            case 11111006: //灵魂突刺
            case 11111007: //闪耀冲击
            case 11111008: //魔法碰撞
            //--------风灵使者1转---------
            case 13000000: //强力箭
            case 13000001: //弓箭手精通
            case 13000005: //自然吸收
            case 13001003: //二连射
            case 13001004: //风精灵
            //--------风灵使者2转---------
            case 13100000: //精准弓
            case 13100008: //物理训练
            case 13101001: //快速箭
            case 13101002: //终极弓
            case 13101003: //无形箭
            case 13101004: //二阶跳
            case 13101005: //尖刺风暴
            case 13101006: //风影漫步
            case 13101007: //箭扫射
            //--------风灵使者3转---------
            case 13110003: //神箭手
            case 13110008: //闪避
            case 13110009: //致命一击
            case 13111000: //箭雨
            case 13111001: //集中精力
            case 13111002: //暴风箭雨
            case 13111004: //替身术
            case 13111005: //信天翁
            case 13111006: //风灵穿越
            case 13111007: //疾风扫射
            //--------奇袭者1转---------
            case 15000000: //快动作
            case 15000005: //幸运一击
            case 15000006: //致命咆哮
            case 15000008: //HP增加
            case 15001002: //半月踢
            case 15001003: //疾驰
            case 15001004: //雷精灵
            case 15001007: //未知技能
            //--------奇袭者2转---------
            case 15100001: //精准拳
            case 15100004: //能量获得
            case 15100009: //物理训练
            case 15101002: //急速拳
            case 15101003: //贯骨击
            case 15101005: //能量爆破
            case 15101008: //静心
            case 15101010: //龙卷风拳
            //--------奇袭者3转---------
            case 15110009: //致命狂热
            case 15110010: //迷惑攻击
            case 15111004: //激怒拳
            case 15111005: //极速领域
            case 15111006: //闪光击
            case 15111007: //鲨鱼波
            case 15111008: //能量爆炸
            case 15111011: //幸运骰子
            case 15111012: //碎石乱击
                return true;
        }
        return false;
    }

    public boolean isAngelSkill() {
        return GameConstants.is天使祝福戒指(id);
    }

    public boolean isLinkedAttackSkill() {
        return GameConstants.isLinkedAttackSkill(id);
    }

    public boolean isDefaultSkill() {
        return getFixLevel() > 0;
    }

    public int getPPRecovery() {
        return ppRecovery;
    }
}
