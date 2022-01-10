package client.status;

import client.MapleDisease;
import handling.Buffstat;

import java.io.Serializable;

/**
 * @author setosan
 */
public enum MonsterStatus implements Serializable, Buffstat {

    解除增益(0x1, 1),//魔击无效 ---OK//该技能使用后自动发送73 03 4F 88 B8 01 00 10 0F 00 00 00 00 00 00 00 00 00 03
    挑衅(0x2, 1), // V.131---OK
    诅咒(0x2, 1), //鬼刻符效果 V.119.1
    抗压(0x4, 1), //V.119.1
    心灵控制(0x40, 1), //V.119.1 控制怪物 好像是弩骑的 猎人的召唤
    命中(0x200, 1), //V.131----OK
    恐慌(0x200, 1), //V.119.1 好像就是命中减少
    影网(0x2000, 1), //V.131 已更新
    沉默(0x200000, 1),//V.131
    免疫伤害(0x2000, 1), //需要测试
    免疫魔攻(0x4000, 1), //V.119.1
    免疫物攻(0x8000, 1), //V.119.1

    魔防提升(0x10000, 1), //V.119.1

    物防提升(0x20000, 1), //V.119.1 ---OK
    魔攻提升(0x40000, 1), //V.119.1 ---OK
    物攻提升(0x80000, 1), //V.119.1 ---OK

    //结冰(0x800000, 1), //V.119.1 - 新增需要测试 冰冻和束缚都是这个
    眩晕(0x1000000, 1), //V.119.1---测试OK
    无法移动(0x800000, 1),
    速度(0x2000000, 1), //V.119.1 减少怪物速度 --OK
    魔防(0x10000000, 1, false, 2), //V.119.1 好像是百分比减少 --OK
    魔攻(0x20000000, 1, false, 2), //V.119.1 好像是百分比减少 --OK
    物防(0x40000000, 1, false, 2), //V.119.1 好像是百分比减少 --OK
    物攻(0x80000000, 1, false, 2), //V.119.1 好像是百分比减少 --OK
    中毒(0x4, 2), //V.119.1

    最终伤害增加(0x10000000, 2),//这个是群体治愈的

    持续伤害(0x10000000, 3, false, 1), //V.131(该技能是每秒伤害类:中毒)
    元素黑暗(0x4000, 2), //V.131  ----OK
    魔击无效(0x1, 1), //V.132 ---OK

    //灵魂之眼(0x10000, 3, false, 3),//已更新灵魂之眼(0x10000, 3, false, 3),
    //------------------------
    回避(0x20, 1),
    封印(0x400, 1),
    巫毒(0x10000, 1),
    反射物攻(0x20000000, 1),
    反射魔攻(0x40000000, 1),
    //speshul comes after
    空白BUFF(0x8000000, 1, true),
    召唤怪物(0x80000000, 1, true),
    额外伤害(0x800000, 3, false, 4),
    引燃(0x100000, 3, false, 5),;
    static final long serialVersionUID = 0L;
    private final int i;
    private final int first;
    private final boolean end;
    ///这个是是否可以重复多个状态(用于持续伤害)
    private final int Repeat;

    MonsterStatus(int i, int first) {
        this.i = i;
        this.first = first;
        this.end = false;
        Repeat = 0;
    }

    MonsterStatus(int i, int first, boolean end) {
        this.i = i;
        this.first = first;
        this.end = end;
        Repeat = 0;
    }

    MonsterStatus(int i, int first, boolean end, int repeat) {
        this.i = i;
        this.first = first;
        this.end = end;
        Repeat = repeat;
    }

    @Override
    public int getPosition() {
        return first;
    }

    public boolean isEmpty() {
        return end;
    }

    @Override
    public int getValue() {
        return i;
    }

    public int GetRepeat() {
        return this.Repeat;
    }

    public static MonsterStatus getBySkill_Pokemon(int skill) {
        switch (skill) {
            case 120:
                return 封印;
            case 121:
                return 恐慌;
            case 123:
                return 眩晕;
            case 125:
                return 持续伤害;
            case 126:
                return 速度;
            case 137:
                return 无法移动;
        }
        return null;
    }

    public static MapleDisease getLinkedDisease(MonsterStatus stat) {
        switch (stat) {
            case 眩晕:
            case 影网:
                return MapleDisease.眩晕;
            case 持续伤害:
                return MapleDisease.中毒;
            case 封印:
            case 魔击无效:
                return MapleDisease.封印;
            case 无法移动:
                return MapleDisease.结冰;
            case 恐慌:
                return MapleDisease.黑暗;
            case 速度:
                return MapleDisease.缓慢;
        }
        return null;
    }

    public static int genericSkill(MonsterStatus stat) {
        switch (stat) {
            case 眩晕:
                return 90001001;
            case 速度:
                return 90001002;
            case 持续伤害:
                return 90001003;
            case 恐慌:
                return 90001004;
            case 封印:
                return 90001005;
            case 无法移动:
                return 90001006;
            case 魔击无效:
                return 1111007;
            case 挑衅:
                return 4121003;
            case 诅咒:
                return 22161002;
            case 影网:
                return 4111003;
            case 巫毒: //not used
                return 2311005;
        }
        return 0;
    }

    public Integer getOrder() {
        return first;
    }
}
