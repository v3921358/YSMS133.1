package tools.packet;

import handling.Buffstat;
import handling.SendPacketOpcode;

import java.awt.Point;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.log4j.Logger;

import server.ServerProperties;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleMap;
import server.maps.MapleNodes;
import server.movement.LifeMovementFragment;
import tools.DateUtil;
import tools.HexTool;
import tools.MaplePacketCreator;
import tools.data.output.MaplePacketLittleEndianWriter;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.skills.隐士;

/**
 * *
 * 负责生成怪物Buff相关的数据包
 *
 * @author dongjak
 *
 */
public class MobPacket {

    private static final Logger log = Logger.getLogger(MobPacket.class);

    /**
     * 怪物伤害数字显示
     */
    public static byte[] damageMonster(int oid, long damage) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        if (damage > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) damage);
        }

        return mplew.getPacket();
    }

    /**
     * 友好的怪物伤害数字显示
     */
    public static byte[] damageFriendlyMob(MapleMonster mob, long damage, boolean display) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(mob.getObjectId());
        mplew.write(display ? 1 : 2); //false for when shammos changes map!
        if (damage > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) damage);
        }
        if (mob.getHp() > Integer.MAX_VALUE) {
            mplew.writeInt((int) (((double) mob.getHp() / mob.getMobMaxHp()) * Integer.MAX_VALUE));
        } else {
            mplew.writeInt((int) mob.getHp());
        }
        if (mob.getMobMaxHp() > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) mob.getMobMaxHp());
        }

        return mplew.getPacket();
    }

    /**
     * 杀死怪物
     */
    public static byte[] killMonster(int oid, int animation) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(animation); // 0 = dissapear, 1 = fade out, 2+ = special
        if (animation == 4) {
            mplew.writeInt(-1);
        }

        return mplew.getPacket();
    }

    /**
     * 吞噬怪物?
     */
    public static byte[] suckMonster(int oid, int chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(4);
        mplew.writeInt(chr);

        return mplew.getPacket();
    }

    /**
     * 怪物加血
     */
    public static byte[] healMonster(int oid, int heal) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.writeInt(-heal);

        return mplew.getPacket();
    }

    /**
     * 怪物攻击怪物？
     */
    public static byte[] MobToMobDamage(int oid, int dmg, int mobid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOB_TO_MOB_DAMAGE.getValue());
        mplew.writeInt(oid);
        mplew.write(0); // looks like the effect, must be > -2
        mplew.writeInt(dmg);
        mplew.writeInt(mobid);
        mplew.write(1); // ?

        return mplew.getPacket();
    }

    /**
     * 怪物神马效果？
     */
    public static byte[] getMobCoolEffect(int oid, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ITEM_EFFECT_MOB.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(itemid); // 2022588

        return mplew.getPacket();
    }

    /**
     * 显示怪物血量
     */
    public static byte[] showMonsterHP(int oid, int remhppercentage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MONSTER_HP.getValue());
        mplew.writeInt(oid);
        mplew.write(remhppercentage);

        return mplew.getPacket();
    }

    /**
     * 怪物抵抗效果?
     */
    public static byte[] showMonsterResist(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MONSTER_RESIST.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(0);
        mplew.writeShort(1); // resist >0
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * 显示BOSS血条
     */
    public static byte[] showBossHP(MapleMonster mob) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(0x06); //V.107修改 以前0x05
        mplew.writeInt(mob.getId() == 9400589 ? 9300184 : mob.getId());
        if (mob.getHp() > Integer.MAX_VALUE) {
            mplew.writeInt((int) (((double) mob.getHp() / mob.getMobMaxHp()) * Integer.MAX_VALUE));
        } else {
            mplew.writeInt((int) mob.getHp());
        }
        if (mob.getMobMaxHp() > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) mob.getMobMaxHp());
        }
        mplew.write(mob.getStats().getTagColor());
        mplew.write(mob.getStats().getTagBgColor());
        mplew.writeInt(0); //V.119.1新增 未知

        return mplew.getPacket();
    }

    /**
     * 显示BOSS血条 怪物ID 怪物当前血量 怪物的总血量
     */
    public static byte[] showBossHP(int monsterId, long currentHp, long maxHp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(0x06); //V.107修改 以前0x05
        mplew.writeInt(monsterId); //has no image
        if (currentHp > Integer.MAX_VALUE) {
            mplew.writeInt((int) (((double) currentHp / maxHp) * Integer.MAX_VALUE));
        } else {
            mplew.writeInt((int) (currentHp <= 0 ? -1 : currentHp));
        }
        if (maxHp > Integer.MAX_VALUE) {
            mplew.writeInt(Integer.MAX_VALUE);
        } else {
            mplew.writeInt((int) maxHp);
        }
        mplew.write(6);
        mplew.write(5);
        mplew.writeInt(0); //V.119.1新增 未知

        //colour legend: (applies to both colours)
        //1 = red, 2 = dark blue, 3 = light green, 4 = dark green, 5 = black, 6 = light blue, 7 = purple
        return mplew.getPacket();
    }

    /**
     * Gets a response to a move monster packet.
     *
     * @param objectid The ObjectID of the monster being moved.
     * @param moveid The movement ID.
     * @param currentMp The current MP of the monster.
     * @param useSkills Can the monster use skills?
     * @return The move response packet.
     */
    public static byte[] moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills) {
        return moveMonsterResponse(objectid, moveid, currentMp, useSkills, 0, 0);
    }

    /**
     * Gets a response to a move monster packet.
     *
     * @param objectid The ObjectID of the monster being moved.
     * @param moveid The movement ID.
     * @param currentMp The current MP of the monster.
     * @param useSkills Can the monster use skills?
     * @param skillId The skill ID for the monster to use.
     * @param skillLevel The level of the skill to use.
     * @return The move response packet.
     */
    public static byte[] moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills, int skillId, int skillLevel) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(19);

        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER_RESPONSE.getValue());
        mplew.writeInt(objectid);
        mplew.writeShort(moveid);
        mplew.writeBool(useSkills);
        mplew.writeInt(currentMp);
        mplew.writeShort(0);
        mplew.write(skillId);
        mplew.write(skillLevel);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] moveMonster(boolean useskill, int skill, int skill_1, int skill_2, short delay, int oid, Point startPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.writeBool(useskill);
        mplew.write(skill);
        mplew.write(skill_1);
        mplew.write(skill_2);
        mplew.writeShort(delay);
        mplew.writeZeroBytes(6);
        mplew.writePos(startPos);
        mplew.writeInt(DateUtil.getTime(System.currentTimeMillis()));
        PacketHelper.serializeMovementList(mplew, moves);
        mplew.write(0);
        return mplew.getPacket();
    }

    /**
     * 刷出怪物
     */
    public static byte[] spawnMonster(MapleMonster life, int spawnType, int link) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        mplew.write(0);
        mplew.writeInt(life.getObjectId());
        mplew.write(1); // 1 = Control normal, 5 = Control none
        mplew.writeInt(life.getId());
        addMonsterStatus(mplew, life);
        mplew.writePos(life.getTruePosition());
        mplew.write(life.getStance());
        int fh = spawnType == -2 ? life.getFh() : life.getMobFH();
        mplew.writeShort(fh); // FH life.getFh()
        mplew.writeShort(life.originFh()); // Origin FH
        mplew.writeShort(spawnType); // newSpawn ? -2 : -1 (-2 新刷出的怪物 -1 已刷出的怪物)
        if (spawnType == -3 || spawnType >= 0) {
            mplew.writeInt(link);
        }
        mplew.write(life.getCarnivalTeam());
        mplew.writeLong(life.getMobMaxHp() > Integer.MAX_VALUE ? Integer.MAX_VALUE : life.getMobMaxHp());
        mplew.writeZeroBytes(16);
        mplew.writeInt(-1);
        if (spawnType == -2) {
            mplew.writeInt(-1);
        } else {
            mplew.writeInt(0);
        }
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(100);
        mplew.writeInt(-1);
        mplew.write(0);
        if (life.getHitParts() == null) {
            mplew.write(0);
        } else {
            mplew.write(1);
            mplew.writeMapleAsciiString(life.getHitParts());
            mplew.writeInt(0);
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    /**
     * 怪物召唤控制
     */
    public static byte[] controlMonster(MapleMonster life, boolean newSpawn, boolean aggro) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(aggro ? 2 : 1); // 1 = Control normal, 5 = Control none
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        addMonsterStatus(mplew, life);
        mplew.writePos(life.getTruePosition());
        mplew.write(life.getStance()); // Bitfield
        int fh = newSpawn ? life.getFh() : life.getMobFH();
        mplew.writeShort(fh); // FH life.getFh()
        mplew.writeShort(life.getFh()); // Origin FH
        mplew.writeShort(life.isFake() ? -4 : newSpawn ? -2 : -1); //(-2 新刷出的怪物 -1 已刷出的怪物)
        mplew.write(life.getCarnivalTeam());
        mplew.writeLong(life.getMobMaxHp() > Integer.MAX_VALUE ? Integer.MAX_VALUE : life.getMobMaxHp());
        mplew.writeZeroBytes(16);
        mplew.writeInt(-1);
        if (newSpawn) {
            mplew.writeInt(-1);
        } else {
            mplew.writeInt(aggro ? 1 : 0);
        }
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(100);
        mplew.writeInt(-1);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /**
     * 怪物自定义属性
     *
     * @param mplew
     * @param life
     */
    public static void addMonsterStatus(MaplePacketLittleEndianWriter mplew, MapleMonster life) {
        if (life.getStati().size() <= 1) {
            life.addEmpty();
        }
        boolean writeChangedStats = true;
        mplew.write(writeChangedStats && life.getChangedStats() != null ? 1 : 0);
        if (writeChangedStats && life.getChangedStats() != null) {
            // 13组int
            mplew.writeInt(life.getChangedStats().hp > Integer.MAX_VALUE ? Integer.MAX_VALUE : (int) life.getChangedStats().hp);
            mplew.writeInt(life.getChangedStats().mp);
            mplew.writeInt(life.getChangedStats().exp);
            mplew.writeInt(life.getChangedStats().watk);
            mplew.writeInt(life.getChangedStats().matk);
            mplew.writeInt(life.getChangedStats().PDRate);
            mplew.writeInt(life.getChangedStats().MDRate);
            mplew.writeInt(life.getChangedStats().acc);
            mplew.writeInt(life.getChangedStats().eva);
            mplew.writeInt(life.getChangedStats().pushed);
            mplew.writeInt(life.getChangedStats().speed); //V.109.1新增 未知
            mplew.writeInt(life.getChangedStats().level);
            mplew.writeInt(0);
        }
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 00 60 00 E0 FF 2B"));
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(System.currentTimeMillis());
        for (int i = 1; i <= 4; i++) {
            mplew.writeLong(0);
            mplew.writeShort(cal.get(Calendar.MINUTE) * 1000 * 60);
        }
        mplew.writeZeroBytes(119); //V.120.1修改
    }

    /**
     * 停止怪物召唤控制
     *
     * @param oid 怪物oid
     * @return
     */
    public static byte[] stopControllingMonster(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(0);
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

    /**
     * 怪物移动回应
     */
    public static byte[] makeMonsterReal(MapleMonster life) {
        return spawnMonster(life, -1, 0);
    }

    public static byte[] makeMonsterFake(MapleMonster life) {
        return spawnMonster(life, -4, 0);
    }

    public static byte[] makeMonsterEffect(MapleMonster life, int effect) {
        return spawnMonster(life, effect, 0);
    }

    /**
     * 写入单个状态的MASK
     *
     * @param mplew
     * @param statup
     * @param <E>
     */
    public static <E extends Buffstat> void writeSingleMask(MaplePacketLittleEndianWriter mplew, E statup) {
        for (int i = 1; i <= 3; i++) {
            mplew.writeInt(i == statup.getPosition() ? statup.getValue() : 0);
        }
    }

    /**
     * 写入所有状态的MASK
     *
     * @param mplew
     * @param statups
     * @param <E>
     */
    public static <E extends Buffstat> void writeMask(MaplePacketLittleEndianWriter mplew, Collection<E> statups) {
        int[] mask = new int[3];
        for (E statup : statups) {
            mask[statup.getPosition() - 1] |= statup.getValue();
        }
        for (int i = 1; i <= mask.length; i++) {
            mplew.writeInt(mask[i - 1]);
        }
    }

    /**
     * 怪物自己添加BUFF状态
     */
    public static byte[] applyMonsterStatus(int oid, MonsterStatus mse, int x, MobSkill skil) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        writeSingleMask(mplew, mse);
        mplew.writeInt(x);
        mplew.writeShort(skil.getSkillId());
        mplew.writeShort(skil.getSkillLevel());
        mplew.writeShort(0); // 好像这个地方是 [28 00] 具体不清楚是什么意思 might actually be the buffTime but it's not displayed anywhere 以前 mse.isEmpty() ? 1 : 0
        mplew.writeShort(0); // delay in ms
        mplew.write(1);
        mplew.write(1);

        return mplew.getPacket();
    }

    /**
     * 玩家对怪物施放的 DEBUFF
     */
    public static byte[] applyMonsterStatus(MapleMonster mons, MonsterStatusEffect ms) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(mons.getObjectId());
        writeSingleMask(mplew, ms.getStati());
        mplew.writeInt(ms.getX().intValue());
        if (ms.isMonsterSkill()) {
            mplew.writeShort(ms.getMobSkill().getSkillId());
            mplew.writeShort(ms.getMobSkill().getSkillLevel());
        } else if (ms.getSkill() > 0) {
            mplew.writeInt(ms.getSkill());
        }
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.write(1);
        mplew.write(1);

        return mplew.getPacket();
    }

    /**
     * 玩家给怪物添加中毒BUFF状态
     */
    public static byte[] applyMonsterPoisonStatus(MapleMonster mons, List<MonsterStatusEffect> mse) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        if (mse.size() <= 0 || mse.get(0) == null) {
            return MaplePacketCreator.enableActions();
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(mons.getObjectId());
        MonsterStatusEffect ms = mse.get(0);
        if (ms.getStati() == MonsterStatus.持续伤害) { //stack ftw
            writeSingleMask(mplew, MonsterStatus.持续伤害);
            mplew.write(mse.size());
            for (MonsterStatusEffect m : mse) {
                mplew.writeInt(m.getFromID()); //character ID
                if (m.isMonsterSkill()) {
                    mplew.writeShort(m.getMobSkill().getSkillId());
                    mplew.writeShort(m.getMobSkill().getSkillLevel());
                } else if (m.getSkill() > 0) {
                    mplew.writeInt(m.getSkill());
                    //System.out.println("怪物中毒 - 技能: " + m.getSkill() + " 掉血伤害: " + m.getX() + " 持续时间: " + m.getDotTime() + " 毫秒 转为: " + m.getDotTime() / 1000 + " 秒");
                }
                mplew.writeInt(m.getX()); //掉血的伤害
                mplew.writeInt(1000); //掉血的时间间隔
                mplew.writeInt(0); // tick count
                mplew.writeInt(10000); //V.112新增 未知
                mplew.writeInt((int) (m.getDotTime() / 1000)); //中毒持续时间 单位为秒计算
                mplew.writeInt(0); //是第次叠加 第1次为 0 第2次为 1 第3次为 2
            }
            //mplew.writeShort(1000); // delay in ms
            mplew.writeShort(0);
            mplew.write(1); // size
        } else {
            writeSingleMask(mplew, ms.getStati());
            mplew.writeInt(ms.getX().intValue());
            if (ms.isMonsterSkill()) {
                mplew.writeShort(ms.getMobSkill().getSkillId());
                mplew.writeShort(ms.getMobSkill().getSkillLevel());
            } else if (ms.getSkill() > 0) {
                mplew.writeInt(ms.getSkill());
            }
            mplew.writeShort(0); // might actually be the buffTime but it's not displayed anywhere
            mplew.writeShort(0); // delay in ms
            mplew.writeShort(0);
            mplew.write(0);
            mplew.write(1); // size
            mplew.write(1); // ? v97
        }

        return mplew.getPacket();
    }

    /*
     * 取消怪物中毒BUFF状态
     */

    /**
     * 怪物自己添加BUFF状态，物理.魔法反射什么的状态的效果
     */
    public static byte[] applyMonsterStatus(int oid, Map<MonsterStatus, Integer> stati, List<Integer> reflection, MobSkill skil) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        writeMask(mplew, stati.keySet());

        for (Entry<MonsterStatus, Integer> mse : stati.entrySet()) {
            mplew.writeInt(mse.getValue().intValue());
            mplew.writeShort(skil.getSkillId());
            mplew.writeShort(skil.getSkillLevel());
            mplew.writeShort(0); // might actually be the buffTime but it's not displayed anywhere
        }
        for (Integer ref : reflection) {
            mplew.writeInt(ref);
        }
        mplew.writeLong(0);
        mplew.writeShort(0); // delay in ms

        int size = stati.size(); // size
        if (reflection.size() > 0) {
            size /= 2; // This gives 2 buffs per reflection but it's really one buff
        }
        mplew.write(size); // size
        mplew.write(1); // ? v97

        return mplew.getPacket();
    }

    /**
     * 取消怪物状态
     */
    public static byte[] cancelMonsterStatus(int oid, MonsterStatus stat) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        writeSingleMask(mplew, stat);
        mplew.write(1); // reflector is 3~!??
        mplew.write(2); // ? v97

        return mplew.getPacket();
    }

    public static byte[] cancelMonsterPoisonStatus(int oid, MonsterStatusEffect m) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        writeSingleMask(mplew, MonsterStatus.持续伤害);
        mplew.writeInt(0);
        mplew.writeInt(1); //size probably
        mplew.writeInt(m.getFromID()); //character ID
        if (m.getSkill() == 隐士.隐士标记 || m.getSkill() == 隐士.刺客标记) {
            mplew.writeInt(65920288);
        } else {
            mplew.writeInt(0);
        }
        if (m.isMonsterSkill()) {
            mplew.writeShort(m.getMobSkill().getSkillId());
            mplew.writeShort(m.getMobSkill().getSkillLevel());
        } else if (m.getSkill() > 0) {
            mplew.writeInt(m.getSkill());
        }
        mplew.write(3); // ? v97

        return mplew.getPacket();
    }

    /**
     * 怪物说话
     */
    public static byte[] talkMonster(int oid, int itemId, String msg) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.TALK_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(500); //?
        mplew.writeInt(itemId);
        mplew.write(itemId <= 0 ? 0 : 1);
        mplew.write(msg == null || msg.length() <= 0 ? 0 : 1);
        if (msg != null && msg.length() > 0) {
            mplew.writeMapleAsciiString(msg);
        }
        mplew.writeInt(1); //?

        return mplew.getPacket();
    }

    /**
     * 取消怪物说话
     */
    public static byte[] removeTalkMonster(int oid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_TALK_MONSTER.getValue());
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

    public static byte[] getNodeProperties(MapleMonster objectid, MapleMap map) {
        if (objectid.getNodePacket() != null) {
            return objectid.getNodePacket();
        }
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MONSTER_PROPERTIES.getValue());
        mplew.writeInt(objectid.getObjectId()); //?
        mplew.writeInt(map.getNodes().size());
        mplew.writeInt(objectid.getPosition().x);
        mplew.writeInt(objectid.getPosition().y);
        for (MapleNodes.MapleNodeInfo mni : map.getNodes()) {
            mplew.writeInt(mni.x);
            mplew.writeInt(mni.y);
            mplew.writeInt(mni.attr);
            if (mni.attr == 2) { //msg
                mplew.writeInt(500); //? talkMonster
            }
        }
        mplew.writeZeroBytes(6);
        objectid.setNodePacket(mplew.getPacket());

        return objectid.getNodePacket();
    }

    /**
     * 显示操作结果
     */
    public static byte[] showResults(int mobid, boolean success) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_RESULTS.getValue());
        mplew.writeInt(mobid);
        mplew.writeBool(success);
        mplew.write(1);

        return mplew.getPacket();
    }

    /**
     * 扑捉怪物
     */
    public static byte[] catchMonster(int mobid, int itemid, byte success) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CATCH_MONSTER.getValue());
        mplew.writeInt(mobid);
        mplew.writeInt(itemid);
        mplew.write(success);

        return mplew.getPacket();
    }

    public static byte[] catchMob(int mobid, int itemid, byte success) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CATCH_MOB.getValue());
        mplew.write(success);
        mplew.writeInt(itemid);
        mplew.writeInt(mobid);

        return mplew.getPacket();
    }

//    public static byte[] unknown(int moboid) {
//        if (ServerProperties.ShowPacket()) {
//            log.info("调用: " + new Throwable().getStackTrace()[0]);
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(0x38C);
//        mplew.writeLong(moboid);
//
//        return mplew.getPacket();
//    }
//
//    public static byte[] unknown1(int moboid) {
//        if (ServerProperties.ShowPacket()) {
//            log.info("调用: " + new Throwable().getStackTrace()[0]);
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(0x1CC);
//        mplew.writeInt(moboid);
//        mplew.writeInt(1);
//        mplew.write(0);
//
//        return mplew.getPacket();
//    }
}
