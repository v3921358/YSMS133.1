package client;//BUFF技能MAKS码

import handling.Buffstat;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import tools.data.output.MaplePacketLittleEndianWriter;

public enum MapleBuffStat implements Serializable, Buffstat {

    测试1(0x1, 2),
    测试2(0x2, 2),
    测试3(0x4, 2),
    测试4(0x8, 2),
    测试5(0x10, 2),
    测试6(0x20, 7),
    测试7(0x40, 2),
    测试8(0x80, 2),
    测试9(0x100, 2),
    测试10(0x200, 2),
    测试11(0x400, 2),
    测试12(0x800, 2),
    测试13(0x1000, 2),
    测试14(0x2000, 2),
    测试15(0x4000, 2),
    测试16(0x8000, 2),
    测试17(0x10000, 7),
    测试32(0x20000, 7),
    测试18(0x40000, 7),
    测试19(0x80000, 7),
    测试20(0x100000, 7),
    测试21(0x200000, 7),
    测试22(0x400000, 7),
    测试23(0x800000, 7),
    测试24(0x1000000, 7),
    测试25(0x2000000, 7),
    测试26(0x4000000, 7),
    测试27(0x8000000, 6, true),
    测试28(0x10000000, 6, true),
    测试29(0x20000000, 6, true),
    测试30(0x40000000, 6, true),
    测试31(0x80000000, 6, true),
    /*
     * ----------------------------
     */
    //indieDamR(0x8, 1, true),
    增加所有属性抗性(0x1, 1, true),
    增加状态异常抗性(0x2, 1, true),
    增加伤害最大值(0x4, 1, true),
    提升伤害百分比(0x20, 1, true),
    提高攻击速度(0x10000, 1, true),
    增加经验值(0x20000, 1, true),
    增加所有属性(0x80000, 1, true),
    增加移动速度(0x100000, 1, true),
    增加跳跃力(0x200000, 1, true),
    增加回避值(0x400000, 1, true),
    增加命中值(0x800000, 1, true),
    增加最大MP百分比(0x1000000, 1, true),
    增加最大MP(0x2000000, 1, true),
    增加最大HP百分比(0x4000000, 1, true),
    增加最大HP(0x8000000, 1, true),
    提升魔法防御力(0x10000000, 1, true),
    提升物理防御力(0x20000000, 1, true),
    增加魔法攻击力(0x40000000, 1, true),
    增加物理攻击力(0x80000000, 1, true),
    /*
     * ----------------------------
     */
    愤怒之火(0x1, 2),
    攻击加速(0x2, 2),
    隐身术(0x4, 2, false, true),
    魔法盾(0x8, 2),
    跳跃力(0x10, 2),
    移动速度(0x20, 2),
    回避率(0x80, 2),
    命中率(0x100, 2),
    魔法防御(0x200, 2),
    魔法攻击(0x400, 2),
    物理防御(0x800, 2),
    物理攻击(0x1000, 2),
    爆率增加(0x4000, 2, true), //T096 阿尔之窃取中的道具获得概率
    暴击最小伤害(0x8000, 2, true), //T096 阿尔之爪中的暴击最小伤害
    经验获得(0x20000, 2, true), //T096 阿尔之好伙伴中的经验增加
    增加魔法攻击力百分比(0x400000, 2, true),
    增加物理攻击力百分比(0x800000, 2, true),
    //黑暗姿势(0x2000000, 2, true), //V.20.1 黑暗领地中的 什么姿势 indieStance
    尖兵神秘代码_BOSS伤害(0x8000000, 2, true), //V.119.1(0x8000000, 2, true),
    暴击最大伤害(0x10000000, 2, true), //V.119.1 暴击最大伤害
    防御概率(0x40000000, 2, true), //V.119.1
    暴击概率(0x80000000, 2, true),
    /*
     * ----------------------------
     */
    额外回避(0x4, 3), //V.119.1
    进阶祝福(0x8, 3, false, true),
    终极无限(0x10, 3),
    暗器伤人(0x20, 3),
    火眼晶晶(0x100, 3, false, true),
    稳如泰山(0x200, 3),
    冒险岛勇士(0x400, 3),
    恢复效果(0x800, 3), //V.119.1
    变身效果(0x1000, 3),
    金钱护盾(0x20000, 3),
    敛财术(0x40000, 3),
    影分身(0x80000, 3),
    蓝血(0x80000, 3),
    召唤兽(0x80001, 3),
    神圣祈祷(0x200000, 3),
    冰雪矛(0x400000, 3),
    斗气集中(0x800000, 3),
    无形箭弩(0x10000000, 3),
    神之保护(0x20000000, 3),
    MAXMP(0x40000000, 3),
    MAXHP(0x80000000, 3),
    /*
     * ----------------------------
     */
    /*
     * ----------------------------
     */
    抗魔领域(0x1, 4),
    魔法屏障(0x2, 4),
    隐藏碎片(0x4, 4),
    EXPRATE(0x40, 4),
    天使状态(0x80, 4),
    战神威势(0x100, 4),
    战神抗压(0x200, 4),
    战神之盾(0x400, 4),
    连环吸血(0x800, 4),
    矛连击强化(0x1000, 4),
    自然力重置(0x8000, 4),
    隐形剑(0x10000, 4),
    DROP_RATE(0x2000000, 4),
    英雄回声(0x40000000, 4),
    外观保护(0x80000, 4),
    /*
     * ----------------------------
     */
    祝福护甲(0x1, 5),
    幸运骰子(0x2, 5), //0x80000000
    金属机甲(0x8, 5),
    潜入状态(0x10, 5),
    呼啸_回避概率(0x100, 5), //0x200
    呼啸_伤害减少(0x200, 5),
    呼啸_MaxMp增加(0x400, 5),
    呼啸_爆击概率(0x800, 5),
    增强_魔法防御(0x8000, 5),
    增强_物理防御(0x10000, 5),
    增强_魔法攻击(0x20000, 5),
    增强_物理攻击(0x40000, 5),
    增强_MAXMP(0x80000, 5),
    增强_MAXHP(0x100000, 5),
    暴走形态(0x400000, 5),
    ATTACK_BUFF(0x400000, 5),
    DAMAGE_BUFF(0x800000, 5),
    终极斩(0x1000000, 5),
    无敌状态(0x2000000, 5),
    撤步退身(0x4000000, 5),
    葵花宝典(0x8000000, 5),
    飞行骑乘(0x40000000, 5),
    /*
     * ----------------------------
     */
    增加_物理攻击(0x100, 6), //0x40
    增加运气(0x1000, 6), //0x400
    增加敏捷(0x2000, 6), //0x800
    增加智力(0x4000, 6), //0x1000
    增加力量(0x8000, 6), //0x2000
    牧师祝福(0x400000, 6), //0x100000
    玛瑙意志(0x1000000, 6), //0x400000
    玛瑙保佑(0x2000000, 6), //0x800000
    巨人药水(0x4000000, 6), //0x1000000
    灵魂助力(0x10000000, 6), //0x4000000
    战斗命令(0x20000000, 6), //0x8000000
    移动精通(0x40000000, 6), //0x1
    反制攻击(0x80000000, 6), //0x20000000
    /*
     * ----------------------------
     */
    黑暗束缚(0x20, 7),
    黑暗复仇(0x40, 7),
    黑暗忍耐(0x80, 7),
    吸血鬼之触(0x100, 7),
    爆击提升(0x10000, 7),
    取消天使(0x40000, 7, true),
    精神连接(0x80000, 7),
    子弹数量(0x100000, 7),
    黑暗变形(0x200000, 7),
    伤害吸收(0x400000, 7),
    属性抗性(0x800000, 7),
    异常抗性(0x1000000, 7),
    神秘瞄准术(0x4000000, 7),
    神圣魔法盾(0x10000000, 7),
    无限精气(0x80000000, 7),
    /*
     * ----------------------------
     */
    催化(0x1, 8),
    模式转换(0x2, 8), //0x80000000
    强健护甲(0x4, 8), //0x1
    变形值(0x8, 8), //0x2
    生命潮汐(0x20, 8), //0x8
    抵抗之魔法盾(0x40, 8), //0x10
    黑暗祝福(0x80, 8), //0x20
    黑暗高潮(0x100, 8), //0x40
    光暗转换(0x200, 8), //0x80
    随机橡木桶(0x400, 8), //0x100
    祝福护甲_增加物理攻击(0x800, 8),
    神圣拯救者的祝福(0x10000, 8), //0x4000
    卡牌审判(0x20000, 8), //0x8000
    最小爆击伤害(0x40000, 8), //0x10000
    爆击概率增加(0x80000, 8), //0x20000
    NO_SLIP(0x100000, 8, 1), //0x40000
    幻影屏障(0x100000, 8), //0x40000
    神秘运气(0x200000, 8), //0x80000
    FAMILIAR_SHADOW(0x200000, 8, 1),//0x80000
    幻灵招魂攻击状态(0x200000, 8), //0x80000
    SIDEKICK_PASSIVE(0x400000, 8, 1), //0x100000
    百分比无视防御(0x400000, 8, false, true),
    击杀点数(0x2000000, 8), //0x800000
    召唤玩家A(0x4000000, 8),
    /*
     * ----------------------------
     */
    幸运钱(0x1, 9),
    
    阿修罗(0x2, 9),
    压制术(0x4, 9),
    冰骑士(0x8, 9),
    醉卧竹林(0x10, 9),
    不倦神酒(0x20, 9),
    流血剧毒(0x40, 9),
    鹰眼(0x80, 9),
    
    天堂之门(0x100, 9),
    天使复仇(0x200, 9),
    火焰灵气(0x400, 9),
    寒冰灵气(0x800, 9),
    最终审判(0x1000, 9),
    战斗准备(0x2000, 9),
    PVP_DAMAGE(0x4000, 9),
    PVP_ATTACK(0x8000, 9),
    
    至圣领域(0x10000, 9),
    灵魂鼓舞(0x20000, 9),
    潜力解放(0x40000, 9),
    连击无限(0x80000, 9),
    精灵弱化(0x100000, 9),
    拳手索命(0x200000, 9),
    真气流贯(0x400000, 9),
    INVINCIBILITY(0x1000000, 9, 1),
    FROZEN(0x2000000, 9, 1),
    ICE_SKILL(0x4000000, 9),
    伤害置换(0x8000000, 9, false, true),
    灵魂凝视(0x20000000, 9),
    剑刃之壁(0x40000000, 9),
    /*
     * ----------------------------
     */
    光之刃(0x1, 10),
    月光转换(0x2, 10),
    超能力量(0x4, 10),
    信天翁(0x8, 10),
    敏捷增加(0x10, 10), //V.120.1 百分比敏捷增加
    命中增加(0x20, 10), //V.120.1 百分比命中率
    暴风灭世(0x40, 10),
    高效输能(0x80, 10),
    幻灵转化(0x100, 10),
    开天辟地(0x200, 10),
    元素属性(0x400, 10), //V.120.1 骑士团的元素属性
    尖兵加速(0x800, 10),
    永动引擎(0x1000, 10), //V.120.1 尖兵超级技能
    高空飞行(0x2000, 10), //V.120.1 好像现在的飞行已经改成这样的 高空飞行
    回避增加(0x4000, 10), //V.120.1 回避率增加百分比 尖兵 全息力场 支援中的回避率
    直线透视(0x8000, 10),
    尖兵电力(0x10000, 10), //V.120.1
    全息投影(0x20000, 10),
    双重防御(0x40000, 10),
    霰弹炮(0x80000, 10),
    恶魔超越(0x100000, 10),
    终极攻击(0x400000, 10),
    伤害减少(0x800000, 10),
    超越攻击(0x1000000, 10),
    恶魔恢复(0x2000000, 10),
    神秘代码(0x4000000, 10),
    /*
     * ----------------------------
     */
    //神秘代码(0x1, 11),
    提速时刻_战斗(0x2, 11),
    提速时刻_侦查(0x4, 11),
    暴击蓄能(0x10, 11),
    环绕效果(0x20, 11),
    神速衔接(0x40, 11),
    集中精力(0x80, 11), //V.120.1
    神圣迅捷(0x100, 11),
    圣洁之力(0x400, 11),
    灵魂之石(0x200, 11),
    进阶箭筒(0x800, 11), //0x8000
    三彩箭矢(0x1000, 11), //0x10000
    缓速术(0x2000, 11),
    极限射箭(0x4000, 11, false, true),
    雷鸣冲击(0x20000, 11),
    寒冰步(0x40000, 11),
    抗震防御(0x80000, 11), //V.120.1
    死亡猫头鹰(0x100000, 11),
    元素爆破(0x200000, 11), //V.120.1
    交叉锁链(0x400000, 11, false, true),
    重生契约(0x800000, 11),
    元气恢复(0x1000000, 11),
    元素冲击(0x2000000, 11),
    属性攻击(0x4000000, 11),
    地雷(0x8000000, 11),
    灵魂技能(0x10000000, 11),
    灵魂武器(0x20000000, 11),
    日月轮转(0x40000000, 11),
    元素灵魂(0x80000000, 11),
    /*
     * ----------------------------
     */
    召唤美洲豹(0x10, 12),
    魔法反击(0x40, 12),
    黑暗幻影(0x100, 12), //V.120.1
    影子侍从(0x200, 12),
    火焰屏障(0x400, 12),
    黑暗领地(0x800, 12),
    致盲(0x1000, 12),
    //V.120.1
    炎术引燃(0x8000, 12), //V.127.1 0x40000
    火焰庇佑(0x10000, 12),
    元素黑暗(0x20000, 12),
    MESO_RATE(0x40000, 12, 1),
    GHOST_MORPH(0x4000, 12),
    ARIANT_COSS_IMU(0x100000, 12),
    ACASH_RATE(0x800000, 12, 1),
    ILLUSION(0x1000000, 12, 1),
    狂暴战魂(0x2000000, 12),
    九死一生(0x4000000, 12),
    招魂结界(0x8000000, 12),
    能量激发(0x40000000, 12),
    混元归一(0x80000000, 12),
    刺客标记(0x80000, 12),
    /*
     * ----------------------------
     */
    影朋小白(0x80, 13),//DEL
    召唤玩家B(0x800, 13),
    召唤玩家C(0x10000, 13),
    召唤玩家D(0x40000, 13),
    HP_LOSS_GUARD(0x80000, 13, 1),
    灵狐(0x200000, 13, 1),
    宙斯盾系统(0x800000, 13),
    死亡契约(0x10000000, 13),
    战斗大师(0x20000000, 13),
    黑暗闪电(0x40000000, 13),
    战法灵气(0x80000000, 13, false, true),
    影子蝙蝠(0x100000, 13),
    /*
     * ----------------------------
     */
    增加攻击力(0x2, 14),
    增加HP百分比(0x4, 14),
    增加MP百分比(0x8, 14),
    避柳(0x10, 14),
    厚积薄发(0x20, 14),
    拔刀术加成(0x40, 14, false, true),
    拔刀姿势(0x80, 14, false, true),
    灵魂守卫(0x100, 14),
    灵魂誓约(0x200000, 14),
    心魂本能(0x400000, 14),
    灵魂之眼(0x800000, 14),
    心魂之盾(0x1000000, 14),
    PP(0x4000000, 14),
    金刚霸体(0x20000000, 14),
    重生符文(0x20000000, 14), //V.120.1 必须是int 还需要写个int [7A 00 00 00] Buff里面的int 好像角色血的10% dotHealHPPerSecondR
    /*
     * ----------------------------
     */
    召唤玩家E(0x100, 15),
    召唤玩家F(0x200, 15),
    召唤玩家G(0x400, 15),
    极速领域(0x100, 15, true),
    骑兽技能(0x200, 15, true),
    导航辅助(0x400, 15, true),
    龙之力(0x800, 15),
    疾驰跳跃(0x400, 15, true),
    疾驰速度(0x800, 15, true),
    能量获得(0x1000, 15, true),
    尖兵能量(0x4000000, 15), //0x8
    模式变更(0x8000000, 15),
    花炎结界(0x10000000, 15),
    迅速(0x80000000, 15), //0x4
    ;
    private static final long serialVersionUID = 0L;
    private int buffstat;
    private int first;
    private boolean stacked = false;
    private boolean special = false;
    private int isShow = 0;
    private SerializeSpawn serializeSpawn = null;
    private final static List<MapleBuffStat> spawnStatsList = Arrays.asList(召唤玩家A, 击杀点数, 能量激发, 混元归一, 战法灵气, 召唤玩家B, 召唤玩家C, 召唤玩家D, 召唤玩家E, 召唤玩家F, 召唤玩家G, 能量获得, 极速领域, 骑兽技能, 导航辅助, 龙之力);

    public static List<MapleBuffStat> getSpawnList() {
        return spawnStatsList;
    }

    public static List<MapleBuffStat> getSpawnList(MapleCharacter chr) {
        return chr.getBuffManager().getSpawnList(getSpawnList());
    }

    MapleBuffStat(int buffstat, int first) {
        this.buffstat = buffstat;
        this.first = first;
    }

    MapleBuffStat(int buffstat, int first, int isShow) {
        this.buffstat = buffstat;
        this.first = first;
        this.isShow = isShow;
    }

    MapleBuffStat(int buffstat, int first, boolean stacked) {
        this.buffstat = buffstat;
        this.first = first;
        this.stacked = stacked;
    }

    MapleBuffStat(int buffstat, int first, boolean stacked, int isShow) {
        this.buffstat = buffstat;
        this.first = first;
        this.stacked = stacked;
        this.isShow = isShow;
    }

    MapleBuffStat(int buffstat, int first, boolean stacked, boolean special) {
        this.buffstat = buffstat;
        this.first = first;
        this.stacked = stacked;
        this.special = special;
    }

    MapleBuffStat(int buffstat, int first, boolean stacked, boolean special, int isShow) {
        this.buffstat = buffstat;
        this.first = first;
        this.stacked = stacked;
        this.special = special;
        this.isShow = isShow;
    }

    @Override
    public int getPosition() {
        return first;
    }

    public int getPosition(boolean fromZero) {
        if (!fromZero) {
            return first;
        }
        if (first > 0) {
            return first - 1;
        }
        return 0;
    }

    @Override
    public int getValue() {
        return buffstat;
    }

    public int getValue(boolean foreign, boolean give) {
        int value = 1 << first;
        if (!foreign) {// 加给自己的
            if (give) {// 加

            } else {// 消除

            }
        } else {// 加给别人的。
            if (give) {// 加
                switch (this) {
                    case 跳跃力:
                        value = 0;
                        break;
                }
            } else {// 消除
            }
        }
        return value;
    }

    public boolean canStack() {
        return stacked;
    }

    public boolean isSpecial() {
        return special;
    }

    public boolean isShow() {
        return isShow > 0;
    }

    public SerializeSpawn getSerializeSpawn() {
        if (serializeSpawn == null) {
            maskserializeSpawn();
        }
        return serializeSpawn;
    }

    private void maskserializeSpawn() {
        switch (this) {
            case 隐身术: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.write(chr.getBuffedValue(MapleBuffStat.隐身术));
                    }
                };
                break;
            }
            case 无形箭弩: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.write(chr.getBuffedValue(MapleBuffStat.无形箭弩));
                    }
                };
                break;
            }
            case 斗气集中: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.write(chr.getBuffedValue(MapleBuffStat.斗气集中));
                    }
                };
                break;
            }
            case 属性攻击: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.writeShort(chr.getBuffedValue(MapleBuffStat.属性攻击));
                        m.writeInt(-chr.getBuffSource(MapleBuffStat.属性攻击));
                    }
                };
                break;
            }
            case 移动速度: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.write(chr.getBuffedValue(MapleBuffStat.移动速度));
                    }
                };
                break;
            }
            case 变身效果: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.writeShort(chr.getBuffedValue(MapleBuffStat.变身效果));
                        m.writeInt(chr.getBuffSource(MapleBuffStat.变身效果));
                    }
                };
                break;
            }
            case 巨人药水: {
                serializeSpawn = new MapleBuffStat.SerializeSpawn() {
                    @Override
                    public void Serialize(MaplePacketLittleEndianWriter m, MapleCharacter chr) {
                        m.writeShort(chr.getBuffedValue(MapleBuffStat.巨人药水));
                        m.writeInt(-chr.getBuffSource(MapleBuffStat.巨人药水));
                    }
                };
                break;
            }
            default:
                break;
        }
    }

    public interface SerializeSpawn {

        void Serialize(MaplePacketLittleEndianWriter mplew, MapleCharacter chr);
    }
}
