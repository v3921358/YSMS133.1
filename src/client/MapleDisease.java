package client;

import handling.Buffstat;

import java.io.Serializable;

import server.Randomizer;

public enum MapleDisease implements Serializable, Buffstat {

    变身(0x4, 2, 172), //变身
    诱惑(0x40, 3, 128), //诱惑          --OK
    僵尸(0x4000, 2, 133), //失去控制 不死化
    药水停止(0x100, 3, 134), //禁止使用药水 药水停止                //0x200
    缓慢(0x2000, 3, 126), //缓慢        --OK
    SHADOW(0x10000, 3, 135), //从不停止 ?receiving damage/moving  //0x400
    诅咒(0x10000, 3, 124), //诅咒
    致盲(0x20000, 3, 136), //致盲                                 //0x800
    虚弱(0x8000, 3, 122), //虚弱[不能跳]    --OK
    黑暗(0x4000, 3, 121), //黑暗        --OK
    封印(0x2000000, 3, 120), //封印         --ok
    中毒(0x4000000, 3, 125), //中毒         -测试
    眩晕(0x8000000, 3, 123), //眩晕         --ok
    结冰(0x20000, 3, 137), //中毒
    潜能无效(0x1000000, 4, 138), //潜在能力无效
    TORNADO(0x10000000, 4, 173),
    FLAG(0x80000000, 5, 799),;

    // 0x100 is disable skill except buff
    private static final long serialVersionUID = 0L;
    private int i;
    private int first;
    private int disease;

    MapleDisease(int i, int first, int disease) {
        this.i = i;
        this.first = first;
        this.disease = disease;
    }

    @Override
    public int getPosition() {
        return first;
    }

    @Override
    public int getValue() {
        return i;
    }

    public int getDisease() {
        return disease;
    }

    public static MapleDisease getRandom() {
        while (true) {
            for (MapleDisease dis : MapleDisease.values()) {
                if (Randomizer.nextInt(MapleDisease.values().length) == 0) {
                    return dis;
                }
            }
        }
    }

    public static MapleDisease getBySkill(int skill) {
        for (MapleDisease d : MapleDisease.values()) {
            if (d.getDisease() == skill) {
                return d;
            }
        }
        return null;
    }
}
