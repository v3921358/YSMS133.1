/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleDisease;
import client.skills.SpecialBuffInfo;
import constants.GameConstants;
import constants.skills.*;
import handling.Buffstat;
import handling.SendPacketOpcode;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import server.MapleStatEffect;
import server.ServerProperties;
import server.maps.MapleArrowsTurret;
import tools.DateUtil;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class BuffPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = Logger.getLogger(BuffPacket.class);

    /**
     * 幸运骰子BUFF
     *
     * @param buffid
     * @param skillid
     * @param duration
     * @param statups
     * @return
     */
    public static byte[] giveDice(int buffid, int skillid, int duration, List<Pair<MapleBuffStat, Integer>> statups) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        //Math.max(buffid / 100, Math.max(buffid / 10, buffid % 10))
        int dice = buffid >= 100 ? buffid / 100 : buffid;
        mplew.writeShort(dice); // 普通为 1-6 双幸运为 10 - 100

        mplew.writeInt(skillid); // 技能ID
        mplew.writeInt(duration);// 持续时间
        mplew.writeZeroBytes(5); // T071修改 以前为3

        mplew.writeInt(GameConstants.getDiceStat(dice, 3)); //0x14
        mplew.writeInt(GameConstants.getDiceStat(dice, 3)); //0x14
        mplew.writeInt(GameConstants.getDiceStat(dice, 4)); //0x0F
        mplew.writeZeroBytes(20); //idk
        mplew.writeInt(GameConstants.getDiceStat(dice, 2)); //0x1E
        mplew.writeZeroBytes(12); //idk
        mplew.writeInt(GameConstants.getDiceStat(dice, 5)); //0x14
        mplew.writeZeroBytes(16); //idk
        mplew.writeInt(GameConstants.getDiceStat(dice, 6)); //0x1E
        mplew.writeZeroBytes(16);
        mplew.writeZeroBytes(4); //V.114新增

        mplew.writeInt(1000);
        mplew.write(1);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * 其他玩家看到角色获得骑宠BUFF
     *
     * @param chrId
     * @param statups
     * @param itemId
     * @param skillId
     * @return
     */
    public static byte[] showMonsterRiding(int chrId, List<Pair<MapleBuffStat, Integer>> statups, int itemId, int skillId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeBuffMask(mplew, statups);
        mplew.writeZeroBytes(16);
        mplew.writeZeroBytes(7);
        mplew.writeInt(itemId);
        mplew.writeInt(skillId);
        mplew.writeZeroBytes(7);

        return mplew.getPacket();
    }

    /**
     * 角色获得 疾驰 或者 极速领域 BUFF
     *
     * @param statups
     * @param duration
     * @param skillid
     * @return
     */
    public static byte[] givePirateBuff(List<Pair<MapleBuffStat, Integer>> statups, int duration, int skillid) {
        boolean infusion = skillid == 冲锋队长.极速领域 || skillid == 奇袭者.极速领域_新 || skillid % 10000 == 8006;
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        mplew.writeZeroBytes(5 + 4); //V.114修改
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeInt(stat.getRight().intValue());
            mplew.writeLong(skillid);
            mplew.writeZeroBytes(infusion ? 6 : 1);
            mplew.writeShort(duration);
        }
        mplew.writeInt(infusion ? 600 : 0);
        mplew.write(1);
        if (!infusion) {
            mplew.write(4);
        }
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到角色获得 疾驰
     */
    public static byte[] giveForeignDash(List<Pair<MapleBuffStat, Integer>> statups, int duration, int chrId, int skillid) {
        boolean infusion = skillid == 冲锋队长.极速领域 || skillid == 奇袭者.极速领域_新 || skillid % 10000 == 8006;
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeBuffMask(mplew, statups);
        if (!infusion) {
            mplew.writeZeroBytes(16);
        }
        mplew.writeZeroBytes(7); //V.114修改
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeInt(stat.getRight().intValue());
            mplew.writeLong(skillid);
            mplew.writeZeroBytes(infusion ? 6 : 1);
            mplew.writeShort(duration);
        }
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /*
     * 角色给怪物上 导航辅助 BUFF
     */
    public static byte[] give导航辅助(int skillid, int mobid, int x) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.导航辅助);
        mplew.writeZeroBytes(5 + 4); //V.114修改
        mplew.writeInt(x);
        mplew.writeInt(skillid);
        mplew.writeZeroBytes(5);
        mplew.writeInt(mobid);
        mplew.writeInt(0);
        mplew.writeInt(720); //[D0 02 00 00]
        mplew.writeZeroBytes(5);

        return mplew.getPacket();
    }

    /*
     * 神秘瞄准术 BUFF
     */
    public static byte[] give神秘瞄准术(int x, int skillId, int duration) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.神秘瞄准术);
        mplew.writeShort(x);
        mplew.writeInt(skillId);
        mplew.writeInt(duration); //默认为5秒
        mplew.writeZeroBytes(18); //V.114修改 以前 14

        return mplew.getPacket();
    }

    /*
     * 角色自己看到能量获得BUFF
     */
    public static byte[] giveEnergyCharge(int bar, int buffId, boolean fullbar, boolean consume) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.能量获得);
        mplew.writeZeroBytes(5);
        mplew.writeInt(fullbar || (consume && bar > 0) ? buffId : 0); //满能量和消耗能量 写技能ID
        mplew.writeInt(Math.min(bar, 10000)); // 0 = 没有能量, 10000 = 满能量
        mplew.writeInt(0);
        mplew.writeInt(0); //[01 01 00 00] 当技能为3转且满能量 这个地方是这个
        mplew.writeZeroBytes(6);
        mplew.write(0x01); //这个地方是随机数字
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到角色自己看到能量获得BUFF
     */
    public static byte[] showEnergyCharge(int chrId, int bar, int buffId, boolean fullbar, boolean consume) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeSingleMask(mplew, MapleBuffStat.能量获得);
        mplew.writeZeroBytes(19);
        mplew.writeInt(fullbar || (consume && bar > 0) ? buffId : 0); //满能量和消耗能量 写技能ID
        mplew.writeInt(Math.min(bar, 10000)); // 0 = 没有能量, 10000 = 满能量
        mplew.writeZeroBytes(11); //V.114.1 修改 没有持续时间

        return mplew.getPacket();
    }

    /*
     * 更新夜光当前界面的光暗点数
     */
    public static byte[] updateLuminousGauge(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LUMINOUS_COMBO.getValue());
        mplew.writeInt(chr.getDarkTotal());
        mplew.writeInt(chr.getLightTotal());
        mplew.writeInt(chr.getDarkType());
        mplew.writeInt(chr.getLightType());
        mplew.write(new byte[]{(byte) 0x4F, (byte) 0x17, (byte) 0x96, (byte) 0x8F}); //4F 17 96 8F

        return mplew.getPacket();
    }

    /*
     * 夜光光暗技能和光暗转换
     */
    public static byte[] giveLuminousState(int buffid, int bufflength, MapleCharacter chr) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        boolean isMix = buffid == 夜光.平衡_光明 || buffid == 夜光.平衡_黑暗;
        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.光暗转换);
        mplew.writeShort(isMix ? 0x02 : 0x01); //平衡是 0x02
        mplew.writeInt(buffid);
        mplew.writeInt(bufflength);
        mplew.writeZeroBytes(5);
        mplew.writeInt(buffid == 夜光.平衡_光明 ? 夜光.月蚀 : buffid == 夜光.平衡_黑暗 ? 夜光.太阳火焰 : buffid); //上1次使用的模式技能 
        mplew.write(new byte[]{(byte) 0x4F, (byte) 0xD9, (byte) 0x81, (byte) 0x9B}); //4F D9 81 9B
        if (isMix) {
            mplew.writeInt(buffid == 夜光.平衡_光明 ? 夜光.太阳火焰 : 夜光.月蚀); //当这个为平衡状态时候 这个为下1次使用模式的技能
            mplew.write(new byte[]{(byte) 0x4F, (byte) 0xD9, (byte) 0x81, (byte) 0x9B}); //4F D9 81 9B
        } else {
            mplew.writeInt(0); //当这个为平衡状态时候 这个为下1次使用模式的技能
            mplew.writeInt(0);
        }
        mplew.writeInt(chr.getDarkTotal());
        mplew.writeInt(chr.getLightTotal());
        mplew.writeInt(chr.getDarkType());
        mplew.writeInt(chr.getLightType());
        mplew.write(new byte[]{(byte) 0x4F, (byte) 0x17, (byte) 0x96, (byte) 0x8F}); //4F 17 96 8F 这个等于上面的减去 200000000
        mplew.writeZeroBytes(8);
        mplew.write(0x01);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 黑暗高潮 处理
     */
    public static byte[] giveDarkCrescendo(int buffid, int bufflength, int count) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.黑暗高潮);
        mplew.writeShort(count);
        mplew.writeInt(buffid);
        mplew.writeInt(bufflength);
        mplew.writeZeroBytes(5 + 4); //V.114修改以前5
        mplew.write(count);
        mplew.writeInt(0);
        mplew.write(0x01);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 是否开启尖兵能量
     */
    public static byte[] startPower(boolean start) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.尖兵能量);
        mplew.writeInt(start ? 1 : 0);
        mplew.writeInt(7200);
        mplew.writeInt(0x06);
        mplew.writeInt(7200);
        mplew.writeZeroBytes(18);

        return mplew.getPacket();
    }

    /*
     * 尖兵能量
     */
    public static byte[] updatePowerCount(int skillId, int count) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.尖兵电力);
        mplew.writeShort(count);
        mplew.writeInt(skillId);
        mplew.writeInt(2100000000);
        mplew.writeZeroBytes(18); //V.114修改 以前 14

        return mplew.getPacket();
    }

    /*
     * 幻影 - 卡牌审判
     */
    public static byte[] give卡牌审判(int buffid, int bufflength, List<Pair<MapleBuffStat, Integer>> statups, int theStat) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeShort(stat.getRight());
            mplew.writeInt(buffid);
            mplew.writeInt(bufflength);
        }
        mplew.writeZeroBytes(5);
        mplew.writeInt(theStat);
        mplew.writeZeroBytes(8);
        mplew.write(1);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] give狂龙变形值(int bar) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.变形值);
        mplew.writeInt(Math.min(bar, 700)); // 0 = no bar, 1000 = full bar
        mplew.writeShort(0);
//        mplew.write(HexTool.getByteArrayFromHexString("78 90 2A EC"));
        mplew.writeInt((int) PacketHelper.getTime(System.currentTimeMillis()));
        mplew.writeZeroBytes(5); //V.114修改
        mplew.writeInt(bar >= 700 ? 3 : bar >= 300 ? 2 : bar >= 100 ? 1 : 0);
        mplew.writeZeroBytes(13); //V.114修改 以前 9

        return mplew.getPacket();
    }

    public static byte[] show狂龙变形值(int chrId, int bar) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeSingleMask(mplew, MapleBuffStat.变形值);
        mplew.writeInt(Math.min(bar, 1000));
        mplew.writeZeroBytes(27);

        return mplew.getPacket();
    }

    public static byte[] showPP(int pp) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.PP);
        mplew.writeShort(pp);
        mplew.writeInt(3784);
        mplew.writeZeroBytes(22);

        return mplew.getPacket();
    }

    /*
     * 狂龙战士 - 剑刃之壁
     */
    public static byte[] give剑刃之壁(int buffid, int bufflength, List<Pair<MapleBuffStat, Integer>> statups, int ItemId, int type) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeShort(stat.getRight().intValue());
            mplew.writeInt(buffid);
            mplew.writeInt(bufflength);
        }
        boolean isNormal = buffid == 狂龙战士.剑刃之壁 || buffid == 狂龙战士.剑刃之壁_变身;
        mplew.writeZeroBytes(5);
        mplew.writeInt(type); //x ?
        mplew.writeInt(isNormal ? 3 : 5); //bulletCount ?
        mplew.writeInt(ItemId);
        mplew.writeInt(isNormal ? 3 : 5); //mobCount ?
        mplew.writeZeroBytes(isNormal ? 16 : 24);
        mplew.writeInt(0);
        mplew.write(0x01);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] show剑刃之壁(int chrId, int buffid, List<Pair<MapleBuffStat, Integer>> statups, int ItemId, int type) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeBuffMask(mplew, statups);
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeShort(stat.getRight().intValue());
            mplew.writeInt(buffid);
        }
        boolean isNormal = buffid == 狂龙战士.剑刃之壁 || buffid == 狂龙战士.剑刃之壁_变身;
        mplew.writeZeroBytes(3);
        mplew.writeInt(type);
        mplew.writeInt(isNormal ? 3 : 5);
        mplew.writeInt(ItemId);
        mplew.writeInt(isNormal ? 3 : 5);
        mplew.writeZeroBytes(isNormal ? 22 : 26); //进阶的多4个00

        return mplew.getPacket();
    }

    public static byte[] show隐藏碎片(int buffid, int skilllevel, List<Pair<MapleBuffStat, Integer>> statups) {

        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        mplew.writeShort(0xB41);
        mplew.writeInt(预备兵.隐藏碎片);
        mplew.writeZeroBytes(13);
        mplew.writeInt(0x02);
        mplew.writeInt(预备兵.隐藏碎片);
        mplew.writeInt(0x0A);
        long time = DateUtil.getTime(System.currentTimeMillis());
        mplew.writeLong(time);
        mplew.writeInt(0);

        mplew.writeInt(buffid);
        mplew.writeInt(skilllevel);
        mplew.writeLong(time);
        mplew.writeInt(0);

        for (int i = 0; i < 2; i++) {
            mplew.writeHexString("01 00 00 00 63 C4 C9 01 0A 00 00 00");
            mplew.writeLong(time);
            mplew.writeInt(0);
        }
        mplew.writeHexString("00 00 00 00 01 00 00 00 00");

        return mplew.getPacket();
    }

    public static byte[] giveSoulGauge(int count, int skillid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.灵魂武器);
        mplew.writeShort(count);
        mplew.writeInt(skillid);//skill
        mplew.writeInt(0);
        mplew.writeInt(1000);
        mplew.writeInt(skillid);//soulskill
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] cancelSoulGauge() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.灵魂武器);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] giveSoulEffect(int skillid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, MapleBuffStat.灵魂技能);
        mplew.writeShort(0);
        mplew.writeInt(skillid);
        mplew.writeInt(640000);
        mplew.writeLong(0);
        mplew.writeShort(8);
        mplew.writeLong(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] giveForeignSoulEffect(int cid, int skillid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        writeSingleMask(mplew, MapleBuffStat.灵魂技能);
        mplew.writeInt(skillid);
        mplew.writeLong(0x60000000000L);
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] cancelForeignSoulEffect(int cid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        writeSingleMask(mplew, MapleBuffStat.灵魂技能);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] show灵魂武器(int buffid, int point) {

        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());

        List<Pair<MapleBuffStat, Integer>> statups = new ArrayList<>();
        statups.add(new Pair<>(MapleBuffStat.灵魂武器, 0));
        if (buffid > 0) {
            statups.add(new Pair<>(MapleBuffStat.增加魔法攻击力, 0));
            statups.add(new Pair<>(MapleBuffStat.增加物理攻击力, 0));
        }
        writeBuffMask(mplew, statups);
        mplew.writeShort(point);
        mplew.writeLong(buffid);
        mplew.writeShort(1000);
        mplew.writeShort(0);
        mplew.writeLong(buffid);
        mplew.writeShort(0);
        mplew.writeZeroBytes(3);

        if (buffid > 0) {
            for (int i = 0; i < 2; i++) {
                mplew.writeInt(1);
                mplew.writeInt(2590000);
                mplew.writeZeroBytes(13);
                mplew.writeHexString("75 2B 7D");
            }
        }

        mplew.writeHexString("00 00 00 00 01 00 00 00 00");

        return mplew.getPacket();
    }

    public static byte[] show灵魂技能(int buffid) {

        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());

        List<Pair<MapleBuffStat, Integer>> statups = new ArrayList<>();
        writeSingleMask(mplew, MapleBuffStat.灵魂技能);
        mplew.writeShort(0);
        mplew.writeInt(buffid);
        mplew.write(0);
        mplew.writeShort(2500);
        mplew.writeZeroBytes(23);

        return mplew.getPacket();
    }

    public static byte[] giveBuff(int buffid, int bufflength, List<Pair<MapleBuffStat, Integer>> statups, MapleStatEffect effect, MapleCharacter chr) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeBuffMask(mplew, statups);
        boolean special = false;
        boolean isMountBuff = false;
        boolean isZeroUnknown = buffid == 神之子.圣洁之力 || buffid == 神之子.神圣迅捷;
        boolean isWriteIntSkill = buffid == 双弩.精神注入 || buffid == 爆莉萌天使.力量转移 || buffid == 船长.船员统帅;
        int count = 0; //一些特殊技能的处理 侠盗的击杀点数 ，奇袭者闪电的无视防御次数 ， 夜光黑暗高潮的次数
        List<MapleBuffStat> buffStat = new ArrayList<>(); //将BUFF在的BuffStat放到列表 用来判断BUFF中是否包含
        List<Pair<MapleBuffStat, Integer>> ordinaryStatups = new ArrayList<>(); //普通的BUFF属性
        List<Pair<MapleBuffStat, Integer>> speciaStatups = new ArrayList<>(); //特殊的BUFF属性
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            if (stat.getLeft() == MapleBuffStat.骑兽技能) {
                isMountBuff = true;
            } else if (stat.getLeft() == MapleBuffStat.月光转换 || stat.getLeft() == MapleBuffStat.抵抗之魔法盾) {
                isZeroUnknown = true;
            } else if (stat.getLeft() == MapleBuffStat.战法灵气 || stat.getLeft() == MapleBuffStat.寒冰灵气 || stat.getLeft() == MapleBuffStat.月光转换 || stat.getLeft() == MapleBuffStat.神秘代码 || stat.getLeft() == MapleBuffStat.抗震防御) {
                count = 1;
                isZeroUnknown = true;
            } else if (stat.getLeft() == MapleBuffStat.百分比无视防御 && buffid == 奇袭者.元素_闪电) {
                count = Math.min(stat.getRight() / 5, 5);
            } else if (stat.getLeft() == MapleBuffStat.黑暗高潮) {
                if (buffid == 夜光.黑暗高潮) {
                    count = stat.getRight();
                } else if (buffid == 尖兵.双重防御) { //回避多少次后消失 默认为10次 但这个BUFF的值 初始为 5
                    count = effect.getX(); //设置为默认次数
                    if (effect.getProp() > stat.getRight()) {
                        int prop = effect.getProp() - stat.getRight();
                        count -= prop / effect.getY();
                        if (count < 0) {
                            count = 0;
                        }
                    }
                }
                isZeroUnknown = true;
            } else if (stat.getLeft() == MapleBuffStat.元素冲击) {
                count = Math.min(stat.getRight() / 5, 5);
            }
            buffStat.add(stat.getLeft());
            if (stat.getLeft().canStack()) {
                speciaStatups.add(stat);
            } else {
                ordinaryStatups.add(stat);
            }
        }
        //开始处理普通的BUFF属性
        for (Pair<MapleBuffStat, Integer> stat : ordinaryStatups) {
            if (stat.getLeft() == MapleBuffStat.击杀点数 && buffid == 侠盗.侠盗本能) {
                count = stat.getRight();
                isZeroUnknown = true;
                break; //跳出和结束这个循环
            }
            //貌似有些要写Int
            if (isMountBuff || isWriteIntSkill || stat.getLeft() == MapleBuffStat.影分身 || stat.getLeft() == MapleBuffStat.伤害置换 || stat.getLeft() == MapleBuffStat.重生符文 || stat.getLeft() == MapleBuffStat.三彩箭矢) {
                mplew.writeInt(stat.getRight());
            } else if (buffid == 爆莉萌天使.灵魂凝视) {
                mplew.writeShort(stat.getRight() / 2); //这个地方我用是 x 而 封包必须这个地方是 y 下面 x
                mplew.writeShort(stat.getRight());
            } else if (stat.getLeft() == MapleBuffStat.鹰眼) { //好像这个有点特殊 是2个 0x14 也就是1个暴击概率1个暴击最大伤害
                mplew.write(stat.getRight().byteValue());
                mplew.write(stat.getRight().byteValue());
            } else {
                mplew.writeShort(stat.getRight());
            }

            switch (buffid) {
                case 恶魔复仇者.血之契约:
                    mplew.writeInt(buffid == 恶魔复仇者.血之契约 ? 0 : buffid); //好像血之契约这个地方的BUFFID写的 0
                    break;
                case 黑骑士.灵魂助力统治:
                case 黑骑士.灵魂助力震惊:
                    mplew.writeInt(黑骑士.灵魂助力);
                    break;
                default:
                    mplew.writeInt(buffid);
            }

            if (!buffStat.contains(MapleBuffStat.极限射箭)) {
                mplew.writeInt(bufflength);
            }
            if (stat.getLeft().isSpecial()) { //未知 有些特殊的BUFF 这个地方要多[00 00 00 00]
                special = true;
            }
            if (ServerProperties.ShowPacket()) {
                log.info("技能ID: " + buffid + " ShortStat: " + stat.getRight() + " 持续时间: " + bufflength + " 转换: " + bufflength / 1000 + "秒");
            }
        }
        //发送中间的字节
        mplew.writeZeroBytes(5);
        if (special) {
            if (buffStat.contains(MapleBuffStat.百分比无视防御) && buffid == 奇袭者.元素_闪电) {
                mplew.writeInt(count);
            } else {
                mplew.writeInt(0);
            }
        }
        if (isZeroUnknown) {
            mplew.write(count);
        } else if (buffStat.contains(MapleBuffStat.火眼晶晶)) {
            mplew.writeInt(buffid == 神射手.火眼晶晶 && chr.getTotalSkillLevel(神射手.火眼晶晶_无视防御) > 0 ? 5 : 0); //这个地方是否带无视怪物防御
        } else if (buffStat.contains(MapleBuffStat.极限射箭)) {
            mplew.writeInt(effect.getX()); //减少的百分比防御
            mplew.writeInt(effect.getZ()); //暴击最小伤害增加
        } else if (buffStat.contains(MapleBuffStat.交叉锁链)) {
            mplew.writeInt(0x01);
        } else if (buffStat.contains(MapleBuffStat.生命潮汐)) {
            mplew.writeInt(buffid == 夜光.生命潮汐 ? effect.getProp() : buffid == 恶魔复仇者.血之契约 ? chr.getStat().getCurrentMaxHp() : 0);
        } else if (buffStat.contains(MapleBuffStat.重生符文)) {
            mplew.writeInt(122); //7A 00 00 00 不知道是怎么处理的
        } else if (buffStat.contains(MapleBuffStat.三彩箭矢)) {
            mplew.writeInt(chr.getSpecialStat().getArrowsMode() + 1);
        } else if (buffStat.contains(MapleBuffStat.灵魂助力)) {
            mplew.writeInt(effect.isOnRule() ? 黑骑士.灵魂助力统治 : 黑骑士.灵魂助力);
            mplew.writeInt(0);
        } else if (buffStat.contains(MapleBuffStat.元素冲击)) {
            mplew.write(count); //秒杀概率?
            mplew.writeShort(count * 12); //攻击加成
            mplew.write(count * 2);
            mplew.write(count * 2);
        } else if (buffStat.contains(MapleBuffStat.招魂结界)) {
            mplew.writeInt(0x01);
        }
        mplew.writeZeroBytes(4);
        //处理9个 00 之后的状态
        if (buffStat.contains(MapleBuffStat.高空飞行)) {
            mplew.writeInt(buffid == 林之灵.伊卡飞翔 && chr.getSkillLevel(林之灵.编队掩护飞行) > 0 ? 林之灵.编队掩护飞行 : 0); //必须写个int
        } else if (buffStat.contains(MapleBuffStat.飞行骑乘)) {
            mplew.write(0);
        }
        //开始处理特殊的BUFF属性
        for (Pair<MapleBuffStat, Integer> stat : speciaStatups) {
            if (stat.getLeft() == MapleBuffStat.骑兽技能) {
                int mountId = stat.getRight().intValue();
                mplew.writeInt(mountId); //骑宠ID
                mplew.writeInt(buffid); //技能ID
                mplew.write(0); //当为机械师的骑宠ID这个地方为 1
                mplew.writeInt(0); //bufflength 貌似骑宠的为0 当为机械师的骑宠ID这个地方为 1
            } else {
                List<SpecialBuffInfo> buffs = chr.getSpecialBuffInfo(stat.getLeft(), buffid, stat.getRight().intValue(), bufflength);
                mplew.writeInt(buffs.size()); //这个地方是有多少个重复的特殊BUFF 是1个循环
                for (SpecialBuffInfo info : buffs) {
                    mplew.writeInt(info.buffid);
                    mplew.writeInt(info.value);
                    mplew.writeInt((int) info.time); //未知 反正是个很大的数字而且是变动的 [08 F1 55 38]
                    mplew.writeInt(0); //V.114新增
                    mplew.writeInt(isMountBuff ? 0 : info.bufflength); //这个地方如果带有骑宠好像是 0
                    if (ServerProperties.ShowPacket()) {
                        log.info("技能ID: " + info.buffid + " LongStat: " + info.value + " 持续时间: " + info.bufflength + " 转换: " + info.bufflength / 1000 + "秒");
                    }
                }
            }
        }
        //-------------------------------------------------------------------
        mplew.writeInt(0); //未知 不知道是范围还是其他的 [E8 03 00 00]
        mplew.write(1); //V.112.1新增 有时为 00
        /*
         * 移动速度
         * 隐身术
         * 冒险岛勇士
         * 尖兵飞行
         * 黄色灵气
         */
        if (isMountBuff || buffStat.contains(MapleBuffStat.变身效果) || buffStat.contains(MapleBuffStat.移动速度) || buffStat.contains(MapleBuffStat.跳跃力) || buffStat.contains(MapleBuffStat.增加跳跃力) || buffStat.contains(MapleBuffStat.增加移动速度) || buffStat.contains(MapleBuffStat.冒险岛勇士) || buffStat.contains(MapleBuffStat.金属机甲) || buffStat.contains(MapleBuffStat.战法灵气) || buffStat.contains(MapleBuffStat.变形值) || buffStat.contains(MapleBuffStat.能量获得) || buffStat.contains(MapleBuffStat.疾驰速度) || buffStat.contains(MapleBuffStat.疾驰跳跃) || buffStat.contains(MapleBuffStat.高空飞行)) {
            mplew.write(0x04);
        }
        mplew.writeInt(0); //V.112.1新增

        return mplew.getPacket();
    }

    /*
     * 减益buff,怪给角色
     */
    public static byte[] giveDebuff(MapleDisease statups, int x, int skillid, int level, int duration) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        writeSingleMask(mplew, statups);
        mplew.writeShort(x);
        mplew.writeShort(skillid);
        mplew.writeShort(level);
        mplew.writeInt(duration);
        mplew.writeZeroBytes(4); //未知
        if (skillid == MapleDisease.缓慢.getDisease()) { //好像是减速的时候 这个地方多1个
            mplew.write(0); //不知道是等级还是固定的 0x02
        }
        mplew.writeZeroBytes(5);
        mplew.writeShort(0); //[84 03] Delay
        mplew.writeZeroBytes(3);
        if (skillid == MapleDisease.缓慢.getDisease()) {
            mplew.write(3);
        } else {
            mplew.write(4);
        }
        mplew.writeInt(0); //未知 V.112新增

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到别人获得负面BUFF状态
     */
    public static byte[] giveForeignDebuff(int chrId, MapleDisease statups, int skillid, int level, int x) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeSingleMask(mplew, statups);
        if (skillid == 125) { //中毒
            mplew.writeShort(0);
            mplew.write(0); //todo test
        }
        mplew.writeShort(x);
        mplew.writeShort(skillid);
        mplew.writeShort(level);
        mplew.writeZeroBytes(3);
        mplew.writeZeroBytes(16);
        mplew.writeZeroBytes(4); //V.114新增
        mplew.writeShort(900); //Delay

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到别人取消负面BUFF状态
     */
    public static byte[] cancelForeignDebuff(int chrId, MapleDisease mask) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeSingleMask(mplew, mask);
        mplew.write(3);
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到别人取消BUFF状态
     */
    public static byte[] cancelForeignBuff(int chrId, List<MapleBuffStat> statups) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeMask(mplew, statups);
        mplew.write(3);
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 其他玩家看到别人取消BUFF状态
     */
    public static byte[] cancelForeignBuff(int chrId, MapleBuffStat buffstat) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeSingleMask(mplew, buffstat);
        mplew.write(3);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] giveForeignBuff(int chrId, List<Pair<MapleBuffStat, Integer>> statups, MapleStatEffect effect) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(chrId);
        writeBuffMask(mplew, statups);
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            if (statup.getLeft() == MapleBuffStat.影分身
                    || statup.getLeft() == MapleBuffStat.金属机甲
                    || statup.getLeft() == MapleBuffStat.战法灵气
                    || statup.getLeft() == MapleBuffStat.巨人药水
                    || statup.getLeft() == MapleBuffStat.精神连接
                    || statup.getLeft() == MapleBuffStat.天使状态
                    || statup.getLeft() == MapleBuffStat.属性攻击
                    || statup.getLeft() == MapleBuffStat.爆击提升
                    || statup.getLeft() == MapleBuffStat.变身效果
                    || statup.getLeft() == MapleBuffStat.模式转换
                    || statup.getLeft() == MapleBuffStat.伤害吸收
                    || statup.getLeft() == MapleBuffStat.光之刃
                    || statup.getLeft() == MapleBuffStat.元素灵魂
                    || statup.getLeft() == MapleBuffStat.月光转换
                    || statup.getLeft() == MapleBuffStat.圣洁之力
                    || statup.getLeft() == MapleBuffStat.神圣迅捷) {
                mplew.writeShort(statup.getRight().shortValue());
                mplew.writeInt(effect.isSkill() ? effect.getSourceId() : -effect.getSourceId());
                if (statup.getLeft() == MapleBuffStat.巨人药水) {
                    mplew.write(-1);
                }
            } else if (statup.getLeft() == MapleBuffStat.FAMILIAR_SHADOW) {
                mplew.writeInt(statup.getRight());
                mplew.writeInt(effect.getCharColor());
            } else if (statup.getLeft() == MapleBuffStat.高空飞行) {
                mplew.writeShort(statup.getRight().shortValue());
                mplew.writeInt(effect.isSkill() ? effect.getSourceId() : -effect.getSourceId());
                mplew.writeInt(0x00); //好像这个BUFF是特殊的 必须要写Int
            } else if (statup.getLeft() == MapleBuffStat.心魂本能) {
                mplew.writeInt(statup.getRight().shortValue());
                mplew.writeInt(effect.getSourceId());
            } else {
                mplew.writeShort(statup.getRight().shortValue());
            }
        }
        if (effect.is月光转换()) {
            mplew.writeHexString("01 00 00 05");
            mplew.writeZeroBytes(20);
        } else if (effect.is圣洁之力() || effect.is神圣迅捷()) {
            mplew.writeInt(0x1000000);
            mplew.writeZeroBytes(20);
        } else {
            mplew.writeZeroBytes(23);
        }
        mplew.writeShort(0); //[E8 03]

        return mplew.getPacket();
    }

    /*
     * 取消BUFF状态
     */
    public static byte[] cancelBuff(List<MapleBuffStat> statups, MapleCharacter chr) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        writeMask(mplew, statups);
        for (MapleBuffStat mask : statups) {
            if (mask.canStack()) {
                List<SpecialBuffInfo> buffs = chr.getSpecialBuffInfo(mask);
                mplew.writeInt(buffs.size()); //这个地方是有多少个重复的特殊BUFF 是1个循环 取消后还剩余几个这个效果 还要继续写剩余效果的属性
                for (SpecialBuffInfo info : buffs) {
                    mplew.writeInt(info.buffid);
                    mplew.writeLong(info.value);
                    mplew.writeInt(0); //V.114新增
                    mplew.writeInt(info.bufflength);
                }
            }
        }
        if (statups.contains(MapleBuffStat.变身效果) || statups.contains(MapleBuffStat.移动速度) || statups.contains(MapleBuffStat.跳跃力) || statups.contains(MapleBuffStat.增加跳跃力) || statups.contains(MapleBuffStat.增加移动速度) || statups.contains(MapleBuffStat.冒险岛勇士) || statups.contains(MapleBuffStat.金属机甲) || statups.contains(MapleBuffStat.战法灵气) || statups.contains(MapleBuffStat.变形值) || statups.contains(MapleBuffStat.能量获得) || statups.contains(MapleBuffStat.疾驰速度) || statups.contains(MapleBuffStat.疾驰跳跃) || statups.contains(MapleBuffStat.高空飞行)) {
            mplew.write(0x03);
        } else if (statups.contains(MapleBuffStat.骑兽技能)) {
            mplew.write(0x03);
            mplew.write(0x01);
        } else if (statups.contains(MapleBuffStat.月光转换)) {
            mplew.write(0x00);
        } else if (statups.contains(MapleBuffStat.飞行骑乘)) {
            mplew.write(0x06);
        }

        return mplew.getPacket();
    }

    /*
     * 取消BUFF状态
     */
    public static byte[] cancelBuff(MapleBuffStat buffstat) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        writeSingleMask(mplew, buffstat);
        if (buffstat.canStack()) {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    /*
     * 取消负面BUFF状态
     */
    public static byte[] cancelDebuff(MapleDisease mask) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        writeSingleMask(mplew, mask);
        mplew.write(3);
        mplew.write(0);
        mplew.write(1);

        return mplew.getPacket();
    }

    //召唤炮台
    public static byte[] spawnArrowsTurret(MapleArrowsTurret summon) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_ARROWS_TURRET.getValue());
        mplew.writeInt(summon.getObjectId());
        mplew.writeInt(1);
        mplew.writeInt(summon.getOwnerId());
        mplew.writeInt(0);
        mplew.writeInt(summon.getPosition().x);
        mplew.writeInt(summon.getPosition().y);
        mplew.write(summon.getSide());

        return mplew.getPacket();
    }

    public static byte[] isArrowsTurretAction(MapleArrowsTurret summon, boolean attack) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(attack ? SendPacketOpcode.ARROWS_TURRET_ACTION.getValue() : SendPacketOpcode.SPAWN_ARROWS_TURRET.getValue());
        mplew.writeInt(summon.getObjectId());
        mplew.writeInt(attack ? 0 : 1);
        if (!attack) {
            mplew.writeInt(summon.getOwnerId());
            mplew.writeInt(0);
            mplew.writeInt(summon.getPosition().x);
            mplew.writeInt(summon.getPosition().y);
            mplew.write(summon.getSide());
        }

        return mplew.getPacket();
    }

    //炮台开始攻击
    public static byte[] ArrowsTurretAction(MapleArrowsTurret summon) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ARROWS_TURRET_ACTION.getValue());
        mplew.writeInt(summon.getObjectId());
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    //删除炮台
    public static byte[] cancelArrowsTurret(MapleArrowsTurret summon) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_ARROWS_TURRET.getValue());
        mplew.writeInt(1);
        mplew.writeInt(summon.getObjectId());

        return mplew.getPacket();
    }

    //箭矢炮盘效果(炮台状态)
    public static byte[] CannonPlateEffectFort(MapleCharacter from, int skillId, Point pos, int nuk, short dir, int Temporary, int Temporary1, int Temporary2, int DirPos1, int DirPos2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANNON_PLATE.getValue());
        mplew.writeShort(4);
        mplew.writeInt(from.getId());
        mplew.writeInt(from.getMapId());
        mplew.write(1);
        mplew.writeShort(0);
        mplew.writePos(pos);//位置
        mplew.writeInt(nuk);//技能时间?
        mplew.writeShort(Temporary);
        mplew.writeShort(Temporary1);
        mplew.writeShort(Temporary2);//
        mplew.writeInt(skillId);//技能ID
        mplew.write((byte) dir);//炮台的面向
        mplew.writeInt((dir == 1) ? -DirPos1 : DirPos1);//射箭的方向,X
        mplew.writeInt(DirPos2);//射箭的方向,Y

        return mplew.getPacket();
    }

    public static byte[] switchLuckyMoney(boolean on) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SWITCH_LUCKYMONEY.getValue());
        mplew.writeBool(on);
        return mplew.getPacket();
    }

    public static <E extends Buffstat> void writeSingleMask(MaplePacketLittleEndianWriter mplew, E statup) {
        for (int i = 1; i <= GameConstants.MAX_BUFFSTAT; i++) {
            mplew.writeInt(i == statup.getPosition() ? statup.getValue() : 0);
        }
    }

    public static <E extends Buffstat> void writeMask(MaplePacketLittleEndianWriter mplew, Collection<E> statups) {
        int[] mask = new int[GameConstants.MAX_BUFFSTAT];
        for (E statup : statups) {
            mask[statup.getPosition() - 1] |= statup.getValue();
        }
        for (int i = 1; i <= mask.length; i++) {
            mplew.writeInt(mask[i - 1]);
        }
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Collection<Pair<E, Integer>> statups) {
        int[] mask = new int[GameConstants.MAX_BUFFSTAT];
        for (Pair<E, Integer> statup : statups) {
            mask[statup.left.getPosition() - 1] |= statup.left.getValue();
        }
        for (int i = 1; i <= mask.length; i++) {
            mplew.writeInt(mask[i - 1]);
        }
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Map<E, Integer> statups) {
        int[] mask = new int[GameConstants.MAX_BUFFSTAT];
        for (E statup : statups.keySet()) {
            mask[statup.getPosition() - 1] |= statup.getValue();
        }
        for (int i = 1; i <= mask.length; i++) {
            mplew.writeInt(mask[i - 1]);
        }
    }
}
