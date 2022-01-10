/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.skills.KSPsychicSkillEntry;
import constants.skills.爆莉萌天使;
import constants.skills.超能力者;
import handling.SendPacketOpcode;

import java.util.List;

import org.apache.log4j.Logger;
import server.Randomizer;
import server.ServerProperties;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author admin
 */
public class EffectPacket {

    public static final byte 三彩箭矢 = 0x35;
    public static final byte 幸运道符 = 0x3C;
    public static final byte 尖兵电池_开启 = 0x47;
    public static final byte 尖兵电池_关闭 = 0x48;
    public static final byte 影朋小白 = 0x4A;

    private static final Logger log = Logger.getLogger(EffectPacket.class);

    public static byte[] showOwnBuffEffect(int skillid, int effectid, int playerLevel, int skillLevel) {
        return showOwnBuffEffect(skillid, effectid, playerLevel, skillLevel, (byte) 0x04);
    }

    public static byte[] showOwnBuffEffect(int skillid, int effectid, int playerLevel, int skillLevel, byte direction) {
        return showBuffeffect(-1, skillid, effectid, playerLevel, skillLevel, direction);
    }

    public static byte[] showBuffeffect(int chrId, int skillid, int effectid, int playerLevel, int skillLevel) {
        return showBuffeffect(chrId, skillid, effectid, playerLevel, skillLevel, (byte) 0x04);
    }

    public static byte[] showBuffeffect(int chrId, int skillid, int effectid, int playerLevel, int skillLevel, byte direction) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(effectid);
        mplew.writeInt(skillid);
        if (effectid != 0x03) {
            mplew.write(playerLevel); //角色等级 好像有些需要写角色等级
        }
        mplew.write(skillLevel); //技能等级
        switch (skillid) {
            case 爆莉萌天使.超级诺巴:
                mplew.writeLong(0);
                break;
        }
        if (direction != 0x04) {
            mplew.write(direction);
        }

        return mplew.getPacket();
    }

    /*
     * 角色自己看到幸运骰子BUFF效果
     */
    public static byte[] showOwnDiceEffect(int skillid, int effectid, int effectid2, int level) {
        return showDiceEffect(-1, skillid, effectid, effectid2, level);
    }

    /*
     * 别人看到的幸运骰子BUFF效果
     */
    public static byte[] showDiceEffect(int chrId, int skillid, int effectid, int effectid2, int level) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x04);
        mplew.writeInt(effectid);
        mplew.writeInt(effectid2);
        mplew.writeInt(skillid);
        mplew.write(level);
        mplew.write(0); //如果是双幸运骰子发动2个效果 这个地放第2个效果为1

        return mplew.getPacket();
    }

    /*
     * 装备道具等级提升
     */
    public static byte[] showItemLevelupEffect() {
        return showSpecialEffect(0x16);
    }

    /*
     * 显示给其他玩家看到道具等级提升效果
     */
    public static byte[] showForeignItemLevelupEffect(int chrId) {
        return showForeignEffect(chrId, 0x16);
    }

    /*
     * 显示给自己看到的特殊效果
     * 0x0A = 使用护身符1次 [1E 02] [0A] [01 00 00 00 00 00]
     * 0x0D = 背后有个天使效果
     * 0x0E = 完成任务效果
     * 0x0F = 回血效果
     * 0x10 = 身上有个光点
     * 0x16 = 道具等级提升效果
     * 0x15 = 头上有1个毡子 后面为0 = 成功 为 1 = 失败效果
     * 0x16 = 身上有个光点效果
     * 0x18 = 消耗1个原地复活术，在当前地图复活了。（剩余x个） 后面接着是1个 Int
     * 0x1F = 因灵魂石的效果，在当前地图中复活
     * 0x20 = 显示掉血伤害多少? 0 = Miss
     * 0x22 = 显示自己恢复Hp效果
     */
    public static byte[] showSpecialEffect(int effect) {
        return showForeignEffect(-1, effect);
    }

    public static byte[] showForeignEffect(int chrId, int effect) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(effect);

        return mplew.getPacket();
    }

    /*
     * 看到自己恢复Hp效果
     * 好像为 0x0F
     * 下面是恢复12点的例子
     * Recv SHOW_SPECIAL_EFFECT [021E] (4)
     * 1E 02 0F 0C
     * V.119.1 OK
     */
    public static byte[] showOwnHpHealed(int amount) {
        return showHpHealed(-1, amount);
    }

    /*
     * 看到其他角色恢复HP效果
     * V.119.1 OK
     */
    public static byte[] showHpHealed(int chrId, int amount) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x22);
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    /*
     * 显示自己获得 黑暗祝福 效果
     * V.119.1 OK
     */
    public static byte[] showBlessOfDarkness(int skillId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x09);
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    /*
     * 工艺制作
     * 显示自己道具制作效果
     */
    public static byte[] showOwnCraftingEffect(String effect, int time, int mode) {
        return showCraftingEffect(-1, effect, time, mode);
    }

    /*
     * 工艺制作
     * 显示其他玩家道具制作效果
     */
    public static byte[] showCraftingEffect(int chrId, String effect, int time, int mode) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x27);
        mplew.writeMapleAsciiString(effect);
        mplew.write(1);
        mplew.writeInt(time);
        mplew.writeInt(mode);

        return mplew.getPacket();
    }

    /*
     * 显示使用卡勒塔的许愿珍珠的效果
     */
    public static byte[] showOwnJobChangedElf(String effect, int time, int itemId) {
        return showJobChangedElf(-1, effect, time, itemId);
    }

    /*
     * 显示别人使用卡勒塔的许愿珍珠的效果
     */
    public static byte[] showJobChangedElf(int chrId, String effect, int time, int itemId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x27);
        mplew.writeMapleAsciiString(effect);
        mplew.write(1);
        mplew.writeInt(0);
        mplew.writeInt(time);
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /*
     * 显示随机获得道具效果
     * V.119.1 OK
     */
    public static byte[] showRewardItemAnimation(int itemId, String effect) {
        return showRewardItemAnimation(itemId, effect, -1);
    }

    /*
     * 显示其他玩家随机获得道具效果
     */
    public static byte[] showRewardItemAnimation(int itemId, String effect, int chrId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x14); //V.119.1 = 0x12
        mplew.writeInt(itemId);
        mplew.write(effect != null && effect.length() > 0 ? 1 : 0);
        if (effect != null && effect.length() > 0) {
            mplew.writeMapleAsciiString(effect);
        }

        return mplew.getPacket();
    }

    /*
     * V.119.1 OK
     */
    public static byte[] Mulung_DojoUp2() {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x0C);

        return mplew.getPacket();
    }

    /*
     * 道具制造
     * V.119.1 OK
     */
    public static byte[] ItemMaker_Success() {
        return ItemMaker_Success_3rdParty(-1);
    }

    public static byte[] ItemMaker_Success_3rdParty(int chrId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x15);
        mplew.writeInt(0); //成功 = 0 失败 =1

        return mplew.getPacket();
    }

    /*
     * 显示宠物升级效果
     * V.119.1 OK
     */
    public static byte[] showOwnPetLevelUp(byte index) {
        return showPetLevelUp(-1, index);
    }

    public static byte[] showPetLevelUp(int chrId, byte index) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x08);
        mplew.write(0);
        mplew.writeInt(index);

        return mplew.getPacket();
    }

    /*
     * V.119.1 OK
     */
    public static byte[] AranTutInstructionalBalloon(String data) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x1B);
        mplew.writeMapleAsciiString(data);

        return mplew.getPacket();
    }

    /*
     * V.120.1  OK
     */
    public static byte[] ShowWZEffect(String data) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x1A); //0x18
        mplew.writeMapleAsciiString(data);

        return mplew.getPacket();
    }

    /*
     * 获取和丢失装备的提示 - 2
     * V.119.1 OK
     */
    public static byte[] getShowItemGain(List<Pair<Integer, Integer>> showItems) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x07); //V.119.1修改以前 0x05
        mplew.write(showItems.size());
        for (Pair<Integer, Integer> items : showItems) {
            mplew.writeInt(items.left);
            mplew.writeInt(items.right);
        }
        return mplew.getPacket();
    }

    /*
     * 显示尖兵获得电池
     */
    public static byte[] showOwnXenonPowerOn(String effect) {
        return showXenonPowerOn(-1, effect);
    }

    public static byte[] showXenonPowerOn(int chrId, String effect) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (chrId == -1) {
            mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            mplew.writeInt(chrId);
        }
        mplew.write(0x1B);
        mplew.writeMapleAsciiString(effect);

        return mplew.getPacket();
    }

    /*
     * 显示 三彩箭矢 效果
     */
    public static byte[] showArrowsEffect(int skillId, int mode, int arrows) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(三彩箭矢);
        mplew.writeInt(skillId); //技能ID
        mplew.writeInt(mode); //当前的模式
        mplew.writeInt(arrows); //箭矢数量

        return mplew.getPacket();
    }

    public static byte[] show影朋小白效果(int skillid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(影朋小白);
        mplew.writeShort(0);
        mplew.writeInt(skillid);
        mplew.write(1);
        mplew.writeShort(0x0F);

        return mplew.getPacket();
    }

    public static byte[] playerDeadConfirm(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_DEAD.getValue());
        mplew.write(type);
        mplew.writeLong(0);

        return mplew.getPacket();
    }

    public static byte[] getEffectSwitch(int cid, List<Integer> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EFFECT_SWITCH.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(items.size());
        for (int i : items) {
            mplew.writeInt(i);
        }
        mplew.writeBool(false);

        return mplew.getPacket();
    }

    // 心魂之手 抓取
    public static byte[] showKSPsychicGrab(int cid, int skillid, short skilllevel, List<KSPsychicSkillEntry> ksse) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_KSPSYCHIC.getValue());

        mplew.writeInt(cid);
        mplew.write(1);
        mplew.writeInt(skillid);
        mplew.writeShort(skilllevel);
        mplew.writeInt(1199); // AF 04 00 00 
        mplew.writeInt(6);

        for (KSPsychicSkillEntry k : ksse) {
            mplew.write(1);
            mplew.write(1);
            mplew.writeInt(k.getOid());
            mplew.writeInt(Math.abs(k.getOid()));
            if (k.getMobOid() != 0) {
                mplew.writeInt(k.getMobOid());
                mplew.writeShort(0);
                mplew.writeInt(150520);
                mplew.writeInt(150520);
            } else {
                mplew.writeInt(0);
                mplew.writeShort(Randomizer.nextInt(19) + 1);
                mplew.writeInt(100);
                mplew.writeInt(100);
            }
            mplew.write(1);
            mplew.writeInt(k.getN1());
            mplew.writeInt(k.getN2());
            mplew.writeInt(k.getN3());
            mplew.writeInt(k.getN4());
        }
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] showKSPsychicAttack(int cid, int skillid, short skilllevel, int n1, int n2, byte n3, int n4, int n5, int n6, int n7, int n8, int n9, int n10, int n11, int n12) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ATTACK_KSPSYCHIC.getValue());

        mplew.writeInt(cid);
        mplew.writeInt(skillid);
        mplew.writeShort(skilllevel);
        mplew.writeInt(n1);
        mplew.writeInt(n2);
        mplew.write(n3);
        mplew.writeInt(n4);
        if (n4 != 0) {
            mplew.writeInt(n5);
            mplew.writeInt(n6);
        }
        mplew.writeInt(n7);
        mplew.writeInt(n8);
        mplew.writeInt(n9);
        mplew.writeInt(n10);
        if (skillid == 超能力者.心魂粉碎2 || skillid == 超能力者.心魂粉碎2_最后一击 || skillid == 超能力者.终极_心魂弹) {
            mplew.writeInt(n11);
            mplew.writeInt(n12);
        }

        return mplew.getPacket();
    }

    public static byte[] showKSPsychicRelease(int cid, int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CANCEL_KSPSYCHIC.getValue());

        mplew.writeInt(cid);
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

    public static byte[] showGiveKSUltimate(int chrid, int mode, int type, int oid, int skillid, short skilllevel, int n1, byte n2, short n3, short n4, short n5, int n6, int n7) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_KSULTIMATE.getValue());

        mplew.writeInt(chrid);
        mplew.write(1);
        mplew.writeInt(mode);
        mplew.writeInt(type);
        mplew.writeInt(oid);
        mplew.writeInt(skillid);
        mplew.writeShort(skilllevel);
        mplew.writeInt(Math.abs(oid));
        mplew.writeInt(n1);
        mplew.write(n2);
        mplew.writeShort(n3);
        mplew.writeShort(n4);
        mplew.writeShort(n5);
        mplew.writeInt(n6);
        mplew.writeInt(n7);

        return mplew.getPacket();
    }

    public static byte[] showAttackKSUltimate(int oid, int attackcount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.KSULTIMATE_ATTACK.getValue());

        mplew.writeInt(oid);
        mplew.writeInt(attackcount);

        return mplew.getPacket();
    }

    public static byte[] showCancelKSUltimate(int chrid, int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CANCEL_KSULTIMATE.getValue());

        mplew.writeInt(chrid);
        mplew.writeInt(oid);

        return mplew.getPacket();
    }
}
