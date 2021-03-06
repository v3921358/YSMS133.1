/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import handling.SendPacketOpcode;

import java.awt.Point;
import java.util.List;

import org.apache.log4j.Logger;
import server.ServerProperties;
import server.maps.MapleDragon;
import server.maps.MapleLittleWhite;
import server.maps.MapleSummon;
import server.movement.LifeMovementFragment;
import tools.AttackPair;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class SummonPacket {

    private static final Logger log = Logger.getLogger(SummonPacket.class);

    public static byte[] spawnSummon(MapleSummon summon, boolean animated) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_SUMMON.getValue());
        mplew.writeInt(summon.getOwnerId());
        mplew.writeInt(summon.getObjectId());
        mplew.writeInt(summon.getSkillId()); //技能的ID
        mplew.write(summon.getOwnerLevel()); //貌似不用减去角色的等级的 1级
        mplew.write(summon.getSkillLevel()); //技能的等级
        mplew.writePos(summon.getPosition()); //召唤兽的坐标
        mplew.write(summon.getSkillId() == 32111006 ? 5 : 4); //未知
        mplew.writeShort(summon.getFh());
        mplew.write(summon.getMovementType().getValue()); //召唤的移动类型 
        mplew.write(summon.getAttackType()); // 召唤兽的攻击类型
        mplew.write(animated ? 1 : 0); //是否活动的
        mplew.write(0); //未知
        if (summon.is机械磁场()) {
            mplew.write(0);
        }
        mplew.writeInt(0);
        mplew.write(1);
        mplew.writeLong(0);
        mplew.write(summon.showCharLook() ? 1 : 0);
        if (summon.showCharLook()) {
            PacketHelper.addCharLook(mplew, summon.getOwner(), true, false);
        }
        mplew.write(0);
        mplew.writeInt(summon.getDuration());

        return mplew.getPacket();
    }

    /**
     * 移除召唤兽
     *
     * @param summon
     * @param animated
     * @return
     */
    public static byte[] removeSummon(MapleSummon summon, boolean animated) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_SUMMON.getValue());
        mplew.writeInt(summon.getOwnerId());
        mplew.writeInt(summon.getObjectId());
        mplew.write(animated ? 0x04 : summon.getRemoveStatus());

        return mplew.getPacket();
    }

    public static byte[] moveSummon(int chrId, int oid, Point startPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_SUMMON.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(oid);
        mplew.writeInt(0); //V.112新增
        mplew.writePos(startPos);
        mplew.writeInt(0); //这个地方有时是玩家ID 有时是0
        PacketHelper.serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static byte[] summonAttack(int chrId, int summonSkillId, byte animation, byte numAttackedAndDamage, List<AttackPair> allDamage, int level, boolean darkFlare) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_ATTACK.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(summonSkillId);
        mplew.write(level); //好像这个地方不在减去人物等级1级
        mplew.write(animation);
        mplew.write(numAttackedAndDamage); //这个地方应该是 numAttackedAndDamage

        for (AttackPair attackEntry : allDamage) {
            if (attackEntry.attack != null) {
                mplew.writeInt(attackEntry.objectid); // 怪物的工作ID
                mplew.write(0x07);
                for (Pair<Integer, Boolean> eachd : attackEntry.attack) {
                    if (eachd.right) {
                        mplew.writeInt(eachd.left + 0x80000000); //暴击伤害
                    } else {
                        mplew.writeInt(eachd.left); // 普通伤害
                    }
                }
            } else {
                mplew.writeInt(0);
            }
        }
        mplew.write(darkFlare ? 1 : 0); //是否是黑暗杂耍技能

        return mplew.getPacket();
    }

    public static byte[] pvpSummonAttack(int cid, int playerLevel, int oid, int animation, Point pos, List<AttackPair> attack) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PVP_SUMMON.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(oid);
        mplew.write(playerLevel);
        mplew.write(animation);
        mplew.writePos(pos);
        mplew.writeInt(0); //<-- delay
        mplew.write(attack.size());
        for (AttackPair p : attack) {
            mplew.writeInt(p.objectid);
            mplew.writePos(p.point);
            mplew.writeShort(p.attack.size());
            for (Pair<Integer, Boolean> atk : p.attack) {
                mplew.writeInt(atk.left);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] summonSkill(int chrId, int summonSkillId, int newStance) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_SKILL.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(summonSkillId);
        mplew.write(newStance);

        return mplew.getPacket();
    }

    public static byte[] damageSummon(int chrId, int summonSkillId, int damage, int unkByte, int monsterIdFrom) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_SUMMON.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(summonSkillId);
        mplew.write(unkByte);
        mplew.writeInt(damage);
        mplew.writeInt(monsterIdFrom);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] summonSkillLink(int cid, int summonoid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SUMMON_SKILL_LINK.getValue());

        mplew.writeInt(cid);
        mplew.writeInt(summonoid);

        return mplew.getPacket();
    }

    public static byte[] spawnDragon(MapleDragon dragon) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DRAGON_SPAWN.getValue());
        mplew.writeInt(dragon.getOwner());
        mplew.writeInt(dragon.getPosition().x);
        mplew.writeInt(dragon.getPosition().y);
        mplew.write(dragon.getStance());
        mplew.writeShort(0);
        mplew.writeShort(dragon.getJobId());

        return mplew.getPacket();
    }

    public static byte[] removeDragon(int chrId) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DRAGON_REMOVE.getValue());
        mplew.writeInt(chrId);

        return mplew.getPacket();
    }

    public static byte[] moveDragon(MapleDragon dragon, Point startPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DRAGON_MOVE.getValue());
        mplew.writeInt(dragon.getOwner());
        mplew.writeInt(0); //V.112新增
        mplew.writePos(startPos);
        mplew.writeInt(0); //未知 不知道是坐标还是随机的数字
        PacketHelper.serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static byte[] spawnLittleWhite(MapleLittleWhite lw) { //召唤小白
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_LITTLEWHITE.getValue());

        mplew.writeInt(lw.getOwner());
        mplew.writeInt(lw.getObjectId());
        mplew.writeInt(lw.getSkillId());
        mplew.write(1);
        mplew.writePos(lw.getPosition());
        mplew.write(0);
        mplew.writeShort(lw.getStance());

        return mplew.getPacket();
    }

    public static byte[] moveLittleWhite(int cid, int oid, Point pos, int stance, List<LifeMovementFragment> move) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_LITTLEWHITE.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(oid);
        mplew.writeInt(0);
        mplew.writePos(pos);
        mplew.writeShort(0);
        mplew.writeShort(0);
        PacketHelper.serializeMovementList(mplew, move);

        return mplew.getPacket();
    }

    public static byte[] showLittleWhite(MapleLittleWhite lw) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_LITTLEWHITE.getValue());

        mplew.writeInt(lw.getOwner());
        mplew.writeInt(lw.getObjectId());
        mplew.write(lw.isShow() ? 1 : 2);

        return mplew.getPacket();
    }

    public static byte[] spawnLargeWhite(MapleLittleWhite lw) { //召唤大白
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_LARGEWHITE.getValue());

        mplew.writeInt(lw.getOwner());
        mplew.writeShort(0);
        mplew.writeInt(12254874);
        mplew.writeShort(4);
        mplew.write(0);
        mplew.writeLong(2);

        return mplew.getPacket();
    }

    public static byte[] changeLargeWhiteStace(int cid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHANGE_LITTLEWHITE.getValue());
        mplew.writeInt(cid);

        return mplew.getPacket();
    }
}
