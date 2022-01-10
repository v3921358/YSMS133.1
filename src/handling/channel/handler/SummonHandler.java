package handling.channel.handler;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.SummonSkillEntry;
import client.*;
import client.anticheat.CheatingOffense;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import constants.skills.*;
import handling.world.WorldBroadcastService;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.Randomizer;
import server.life.MapleMonster;
import server.maps.*;
import server.movement.LifeMovementFragment;
import tools.AttackPair;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;
import tools.packet.EffectPacket;
import tools.packet.MobPacket;
import tools.packet.SummonPacket;

public class SummonHandler {

    public static void MoveDragon(LittleEndianAccessor slea, MapleCharacter chr) {
        slea.skip(4); //[00 00 00 00]
        slea.skip(4); //开始的坐标
        slea.skip(4); //摆动的坐标
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 5);
        if (chr != null && chr.getDragon() != null && res.size() > 0) {
//            if (slea.available() != 8) {
//                System.out.println("slea.available() != 8 (龙龙移动错误) 剩余封包长度: " + slea.available());
//                FileoutputUtil.log(FileoutputUtil.Movement_Log, "slea.available() != 8 (龙龙移动错误) 封包: " + slea.toString(true));
//                return;
//            }
            Point pos = chr.getDragon().getPosition();
            MovementParse.updatePosition(res, chr.getDragon(), 0);
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, SummonPacket.moveDragon(chr.getDragon(), pos, res), chr.getTruePosition());
            }
        }
    }

    /*
     * 龙飞行
     */
    public static void DragonFly(LittleEndianAccessor slea, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.getDragon() == null) {
            return;
        }
        /*
         * 1902040 - 第1阶段龙 - (无描述)
         * 1902041 - 第2阶段龙 - (无描述)
         * 1902042 - 第3阶段龙 - (无描述)
         * 1912033 - 第1阶段龙鞍 - (无描述)
         * 1912034 - 第2阶段龙鞍 - (无描述)
         * 1912035 - 第3阶段龙鞍 - (无描述)
         */
        int type = slea.readInt();
        int mountId = type == 0 ? slea.readInt() : 0;
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showDragonFly(chr.getId(), type, mountId), chr.getTruePosition());
    }

    public static void MoveSummon(LittleEndianAccessor slea, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int objid = slea.readInt();
        MapleMapObject obj = chr.getMap().getMapObject(objid, MapleMapObjectType.SUMMON);
        if (obj == null) {
            return;
        }
        if (obj instanceof MapleDragon) {
            MoveDragon(slea, chr);
            return;
        }
        MapleSummon sum = (MapleSummon) obj;
        if (sum.getOwnerId() != chr.getId() || sum.getSkillLevel() <= 0 || sum.getMovementType() == SummonMovementType.不会移动) {
            return;
        }
        slea.skip(4); //[00 00 00 00]
        slea.skip(4); //开始的坐标
        slea.skip(4); //摆动的坐标
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 4);
        Point pos = sum.getPosition();
        MovementParse.updatePosition(res, sum, 0);
        if (res.size() > 0) {
//            if (slea.available() != 8) {
//                System.out.println("slea.available() != 8 (召唤兽移动错误) 剩余封包长度: " + slea.available());
//                FileoutputUtil.log(FileoutputUtil.Movement_Log, "slea.available() != 8 (召唤兽移动错误) 封包: " + slea.toString(true));
//                return;
//            }
            chr.getMap().broadcastMessage(chr, SummonPacket.moveSummon(chr.getId(), sum.getObjectId(), pos, res), sum.getTruePosition());
        }
    }

    public static void DamageSummon(LittleEndianAccessor slea, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null) {
            return;
        }
        int sumoid = slea.readInt(); //召唤兽的工作ID
        MapleSummon summon = chr.getMap().getSummonByOid(sumoid);
        if (summon == null || summon.getOwnerId() != chr.getId()) {
            return;
        }
        int type = slea.readByte(); //受到伤害的类型
        int damage = slea.readInt(); //受到伤害的数字
        int monsterIdFrom = slea.readInt(); //怪物的ID
        slea.skip(1); //未知 00
        int moboid = slea.readInt();
        MapleMonster monster = chr.getMap().getMonsterByOid(moboid);
        if (monster == null) {
            return;
        }
        boolean remove = false;
        if (summon.is替身术() && damage > 0) {
            summon.addSummonHp(-damage);
            if (summon.getSummonHp() <= 0) {
                remove = true;
            } else if (summon.is神箭幻影()) {
                List<Pair<Integer, Boolean>> allDamageNumbers = new ArrayList<>();
                List<AttackPair> allDamage = new ArrayList<>();
                int theDmg = (int) (SkillFactory.getSkill(summon.getSkillId()).getEffect(summon.getSkillLevel()).getY() * damage / 100.0);
                allDamageNumbers.add(new Pair<>(theDmg, false));
                allDamage.add(new AttackPair(monster.getObjectId(), allDamageNumbers));
                chr.getMap().broadcastMessage(SummonPacket.summonAttack(summon.getOwnerId(), summon.getObjectId(), (byte) 0x84, (byte) 0x11, allDamage, chr.getLevel(), true));
                monster.damage(chr, theDmg, true);
                chr.checkMonsterAggro(monster);
                if (!monster.isAlive()) {
                    chr.getClient().getSession().write(MobPacket.killMonster(monster.getObjectId(), 1));
                }
            }
            chr.getMap().broadcastMessage(chr, SummonPacket.damageSummon(chr.getId(), summon.getSkillId(), damage, type, monsterIdFrom), summon.getTruePosition());
        }
        if (remove) {
            chr.dispelSkill(summon.getSkillId());
        }
    }

    public static boolean is不检测技能(int skillId) {
        switch (skillId) {
            case 双弩.精灵骑士:
            case 双弩.精灵骑士1:
            case 双弩.精灵骑士2:
                return true;
        }
        return false;
    }

    /**
     * 解析客户"召唤兽攻击"封包并响应客户端
     *
     * @param slea
     * @param c
     * @param chr
     */
    public static void SummonAttack(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null) {
            return;
        }
        MapleMap map = chr.getMap();
        int objid = slea.readInt();
        MapleMapObject obj = map.getMapObject(objid, MapleMapObjectType.SUMMON);
        if (obj == null || !(obj instanceof MapleSummon)) {
            chr.dropMessage(5, "召唤兽已经消失。");
            return;
        }
        MapleSummon summon = (MapleSummon) obj;
        if (summon.getOwnerId() != chr.getId() || summon.getSkillLevel() <= 0) {
            chr.dropMessage(5, "出现错误.");
            return;
        }
        int skillid = summon.getSkillId();
        SummonSkillEntry sse = SkillFactory.getSummonData(skillid);
        int mobCount = sse != null ? sse.mobCount : 0;
        if (skillid / 1000000 != 35 && sse == null) {
            chr.dropMessage(5, "召唤兽攻击处理出错。");
            return;
        }
        int tick = slea.readInt();
        if (sse != null && sse.delay > 0 && !is不检测技能(skillid)) {
            chr.updateTick(tick);
            summon.CheckSummonAttackFrequency(chr, tick);
            chr.getCheatTracker().checkSummonAttack();
        }
        slea.skip(4);
        switch (summon.getSkillId()) {
            case 夜行者.黑暗预兆:
            case 机械师.机器人发射器_RM7:
            case 机械师.机器人工厂_机器人:
            case 机械师.磁场:
            case 豹弩游侠.召唤美洲豹_灰:
            case 豹弩游侠.召唤美洲豹_黄:
            case 豹弩游侠.召唤美洲豹_红:
            case 豹弩游侠.召唤美洲豹_紫:
            case 豹弩游侠.召唤美洲豹_蓝:
            case 豹弩游侠.召唤美洲豹_剑:
            case 豹弩游侠.召唤美洲豹_雪:
            case 豹弩游侠.召唤美洲豹_玛瑙:
            case 豹弩游侠.召唤美洲豹_铠甲:
            case 豹弩游侠.辅助打猎单元:
            case 神炮王.双胞胎猴子支援:
            case 神炮王.旋转彩虹炮:
            case 龙的传人.破城炮:
            case 林之灵.小波波:
            case 龙神.召唤玛瑙龙:
            case 神射手.火凤凰:
            case 箭神.冰凤凰:
            case 冰雷.冰破魔兽:
            case 火毒.火魔兽:
            case 主教.强化圣龙:
            case 双弩.精灵骑士:
            case 双弩.精灵骑士1:
            case 双弩.精灵骑士2:
            case 尖兵.全息力场_穿透:
            case 尖兵.全息力场_力场:
            case 隐士.黑暗杂耍:
            case 侠盗.黑暗杂耍:
            case 船长.八轮重机枪:
            case 船长.召唤船员:
            case 神炮王.磁性船锚:
            case 狂龙战士.石化:
                slea.skip(4);
                break;
        }
        byte animation = slea.readByte();
        byte numAttackedAndDamage = slea.readByte();
        byte numAttacked = (byte) ((numAttackedAndDamage >>> 4) & 0xF); //召唤兽攻击怪物的数量
        byte numDamage = (byte) (numAttackedAndDamage & 0xF); //召唤兽攻击怪物的次数
        if (sse != null) {
            if (numAttacked > mobCount) {
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "召唤兽攻击次数错误 (Skillid : " + skillid + " 怪物数量 : " + numAttacked + " 默认数量: " + sse.mobCount + ")");
                }
                chr.dropMessage(5, "[警告] 请不要使用非法程序。召唤兽攻击怪物数量错误.");
                chr.getCheatTracker().registerOffense(CheatingOffense.SUMMON_HACK_MOBS);
                return;
            }
            int numAttackCount = chr.getStat().getAttackCount(skillid) + sse.attackCount;
            if (numDamage > numAttackCount) {
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "召唤兽攻击次数错误 (Skillid : " + skillid + " 打怪次数 : " + numDamage + " 默认次数: " + sse.attackCount + " 超级技能增加次数: " + chr.getStat().getAttackCount(skillid) + ")");
                }
                chr.dropMessage(5, "[警告] 请不要使用非法程序。召唤兽攻击怪物次数错误.");
                chr.getCheatTracker().registerOffense(CheatingOffense.SUMMON_HACK_MOBS);
                return;
            }
        }
        slea.skip(skillid == 机械师.磁场 ? 24 : 22); //怪物的坐标和召唤兽的坐标 后面还有4个00 (mob x,y and summon x,y)
        List<Pair<Integer, Boolean>> allDamageNumbers;
        List<AttackPair> allDamage = new ArrayList<>();
        for (int i = 0; i < numAttacked; i++) {
            MapleMonster mob = map.getMonsterByOid(slea.readInt());
            if (mob == null) {
                continue;
            }
            slea.skip(24); //怪物在WZ中的ID
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < numDamage; j++) {
                int damge = slea.readInt();
                if (chr.isAdmin()) {
                    chr.dropMessage(-5, "召唤兽攻击 打怪数量: " + numAttacked + " 打怪次数: " + numDamage + " 打怪伤害: " + damge + " 怪物ID: " + mob.getObjectId());
                }
                if (damge > chr.getMaxDamageOver(0) && !chr.isGM()) {
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 召唤兽攻击伤害异常。打怪伤害: " + damge + " 地图ID: " + chr.getMapId()));
                }
                allDamageNumbers.add(new Pair<>(damge, false)); //[伤害数值] [是否暴击]
            }
            slea.skip(4); //未知 [00 00 00 00]
            allDamage.add(new AttackPair(mob.getObjectId(), allDamageNumbers)); //[怪物ID] [伤害信息]
        }
        Skill summonSkill = SkillFactory.getSkill(skillid);
        MapleStatEffect summonEffect = summonSkill.getEffect(summon.getSkillLevel());
        if (summonEffect == null) {
            chr.dropMessage(5, "召唤兽攻击出现错误 => 攻击效果为空.");
            return;
        }
        //发送召唤兽攻击怪物的封包
        if (allDamage.isEmpty()) { //如果攻击封包为空就返回
            return;
        }
        map.broadcastMessage(chr, SummonPacket.summonAttack(summon.getOwnerId(), summon.getObjectId(), animation, numAttackedAndDamage, allDamage, chr.getLevel(), false), summon.getTruePosition());
        for (AttackPair attackEntry : allDamage) {
            MapleMonster targetMob = map.getMonsterByOid(attackEntry.objectid);
            if (targetMob == null) {
                continue;
            }
            int totDamageToOneMonster = 0;
            for (Pair<Integer, Boolean> eachde : attackEntry.attack) {
                int toDamage = eachde.left;
                if (chr.isGM() || toDamage < (chr.getStat().getCurrentMaxBaseDamage() * 5.0 * (summonEffect.getSelfDestruction() + summonEffect.getDamage() + chr.getStat().getDamageIncrease(summonEffect.getSourceId())) / 100.0)) { //10 x dmg.. eh
                    totDamageToOneMonster += toDamage;
                } else {
                    chr.dropMessage(5, "[警告] 召唤兽攻击怪物伤害过高.");
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 召唤兽攻击伤害异常。打怪伤害: " + toDamage + " 地图ID: " + chr.getMapId()));
                    break;
                }
            }
            if (sse != null && sse.delay > 0 && summon.getMovementType() != SummonMovementType.不会移动 && summon.getMovementType() != SummonMovementType.CIRCLE_STATIONARY && summon.getMovementType() != SummonMovementType.自由移动 && chr.getTruePosition().distanceSq(targetMob.getTruePosition()) > 400000.0) {
                if (!chr.getMap().isBossMap()) {
                    chr.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER_SUMMON);
                }
            }
            if (totDamageToOneMonster > 0) {
                if (summonEffect.getMonsterStati().size() > 0) {
                    if (summonEffect.makeChanceResult()) {
                        for (Entry<MonsterStatus, Integer> z : summonEffect.getMonsterStati().entrySet()) {
                            targetMob.applyStatus(chr, new MonsterStatusEffect(z.getKey(), z.getValue(), summonSkill.getId(), null, false, 0), summonEffect.isPoison(), 4000, true, summonEffect);
                        }
                    }
                }
                if (chr.isShowPacket()) {
                    chr.dropMessage(5, "召唤兽打怪最终伤害 : " + totDamageToOneMonster);
                }
                targetMob.damage(chr, totDamageToOneMonster, true);
                chr.checkMonsterAggro(targetMob);
                if (!targetMob.isAlive()) {
                    chr.getClient().getSession().write(MobPacket.killMonster(targetMob.getObjectId(), 1));
                }
            }
        }

        //if (summonEffect.getSkill().isNonExpireSummon() && System.currentTimeMillis() > summon.getCreateTime() + summonEffect.getDuration()) {
        //   chr.getMap().broadcastMessage(SummonPacket.removeSummon(summon, true));
        //  chr.getMap().removeMapObject(summon);
        //  chr.removeVisibleMapObject(summon);
        //  chr.removeSummon(summon);
        //  }
    }

    public static void RemoveSummon(LittleEndianAccessor slea, MapleClient c) {
        int objid = slea.readInt();
        MapleMapObject obj = c.getPlayer().getMap().getMapObject(objid, MapleMapObjectType.SUMMON);
        if (obj == null || !(obj instanceof MapleSummon)) {
            return;
        }
        MapleSummon summon = (MapleSummon) obj;
        if (summon.getOwnerId() != c.getPlayer().getId() || summon.getSkillLevel() <= 0) {
            c.getPlayer().dropMessage(5, "移除召唤兽出现错误.");
            return;
        }
        if (c.getPlayer().isShowPacket()) {
            c.getPlayer().dropSpouseMessage(0x0A, "收到移除召唤兽信息 - 召唤兽技能ID: " + summon.getSkillId() + " 技能名字 " + SkillFactory.getSkillName(summon.getSkillId()));
        }
        if (summon.getSkillId() == 机械师.磁场) {
            return;
        }
        c.getPlayer().getMap().broadcastMessage(SummonPacket.removeSummon(summon, false));
        c.getPlayer().getMap().removeMapObject(summon);
        c.getPlayer().removeVisibleMapObject(summon);
        c.getPlayer().removeSummon(summon);
        c.getPlayer().dispelSkill(summon.getSkillId());
        if (summon.is天使召唤兽()) {
            int buffId = summon.getSkillId() % 10000 == 1087 ? 2022747 : summon.getSkillId() % 10000 == 1179 ? 2022823 : 2022746;
            c.getPlayer().dispelBuff(buffId); //取消天使加的BUFF效果
        }
    }

    public static void SubSummon(LittleEndianAccessor slea, MapleCharacter chr) {
        MapleMapObject obj = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.SUMMON);
        if (obj == null || !(obj instanceof MapleSummon)) {
            return;
        }
        MapleSummon sum = (MapleSummon) obj;
        if (sum.getOwnerId() != chr.getId() || sum.getSkillLevel() <= 0 || !chr.isAlive()) {
            return;
        }
        switch (sum.getSkillId()) {
            case 机械师.机器人工厂_RM1:
                if (!chr.canSummon(2000)) {
                    return;
                }
                for (int i = 0; i < 3; i++) {
                    MapleStatEffect effect = SkillFactory.getSkill(机械师.机器人工厂_机器人).getEffect(sum.getSkillLevel());
                    MapleSummon tosummon = new MapleSummon(chr, effect, new Point(sum.getTruePosition().x, sum.getTruePosition().y - 5), SummonMovementType.自由移动, effect.getDuration());
                    chr.getMap().spawnSummon(tosummon);
                    chr.addSummon(tosummon);
                }
                break;
            case 机械师.支援波动器_H_EX:
            case 机械师.支援波动器强化:
                if (!chr.canSummon(1000)) {
                    return;
                }
                chr.addHP((int) (chr.getStat().getCurrentMaxHp() * SkillFactory.getSkill(sum.getSkillId()).getEffect(sum.getSkillLevel()).getHp() / 100.0));
                chr.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sum.getSkillId(), 3, chr.getLevel(), sum.getSkillLevel()));
                chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), sum.getSkillId(), 3, chr.getLevel(), sum.getSkillLevel()), false);
                break;
            case 黑骑士.灵魂助力:
                Skill bHealing = SkillFactory.getSkill(slea.readInt());
                int bHealingLvl = chr.getTotalSkillLevel(bHealing);
                if (bHealingLvl <= 0 || bHealing == null) {
                    return;
                }
                MapleStatEffect healEffect = bHealing.getEffect(bHealingLvl);
                if (bHealing.getId() == 黑骑士.灵魂祝福) {
                    healEffect.applyTo(chr);
                } else if (bHealing.getId() == 黑骑士.灵魂助力) { //黑骑士.灵魂治愈
                    if (!chr.canSummon(healEffect.getX() * 1000)) {
                        return;
                    }
                    int healHp = Math.min(1000, healEffect.getHp() * chr.getLevel());
                    chr.addHP(healHp);
                }
                chr.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sum.getSkillId(), 3, chr.getLevel(), bHealingLvl));
                chr.getMap().broadcastMessage(SummonPacket.summonSkill(chr.getId(), sum.getSkillId(), bHealing.getId() == 黑骑士.灵魂助力 ? 5 : (Randomizer.nextInt(3) + 6)));
                chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), sum.getSkillId(), 3, chr.getLevel(), bHealingLvl), false);
                break;
            case 尖兵.全息力场_支援:
                SkillFactory.getSkill(sum.getSkillId()).getEffect(sum.getSkillLevel()).applyTo(chr);
                break;
        }
        if (GameConstants.is天使祝福戒指(sum.getSkillId())) {
            if (sum.getSkillId() % 10000 == 1087) {
                MapleItemInformationProvider.getInstance().getItemEffect(2022747).applyTo(chr); //黑天使的祝福
            } else if (sum.getSkillId() % 10000 == 1179) {
                MapleItemInformationProvider.getInstance().getItemEffect(2022823).applyTo(chr); //白天使的祝福
            } else {
                MapleItemInformationProvider.getInstance().getItemEffect(2022746).applyTo(chr); //天使的祝福
            }
            chr.getClient().getSession().write(EffectPacket.showOwnBuffEffect(sum.getSkillId(), 3, 2, 1));
            chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), sum.getSkillId(), 3, 2, 1), false);
        }
    }

    public static void SummonPVP(LittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        if (chr == null || chr.isHidden() || !chr.isAlive() || chr.hasBlockedInventory() || chr.getMap() == null || !chr.inPVP() || !chr.getEventInstance().getProperty("started").equals("1")) {
            return;
        }
        MapleMap map = chr.getMap();
        MapleMapObject obj = map.getMapObject(slea.readInt(), MapleMapObjectType.SUMMON);
        if (obj == null || !(obj instanceof MapleSummon)) {
            chr.dropMessage(5, "召唤兽已经消失。");
            return;
        }
        int tick = -1;
        if (slea.available() == 27) {
            slea.skip(23);
            tick = slea.readInt();
        }
        MapleSummon summon = (MapleSummon) obj;
        if (summon.getOwnerId() != chr.getId() || summon.getSkillLevel() <= 0) {
            chr.dropMessage(5, "出现错误");
            return;
        }
        Skill skil = SkillFactory.getSkill(summon.getSkillId());
        MapleStatEffect effect = skil.getEffect(summon.getSkillLevel());
        int lvl = Integer.parseInt(chr.getEventInstance().getProperty("lvl"));
        int type = Integer.parseInt(chr.getEventInstance().getProperty("type"));
        int ourScore = Integer.parseInt(chr.getEventInstance().getProperty(String.valueOf(chr.getId())));
        int addedScore = 0;
        boolean magic = skil.isMagic();
        boolean killed = false, didAttack = false;
        double maxdamage = lvl == 3 ? chr.getStat().getCurrentMaxBasePVPDamageL() : chr.getStat().getCurrentMaxBasePVPDamage();
        maxdamage *= (effect.getDamage() + chr.getStat().getDamageIncrease(summon.getSkillId())) / 100.0;
        int mobCount = 1, attackCount = 1, ignoreDEF = chr.getStat().percent_ignore_mob_def_rate;

        SummonSkillEntry sse = SkillFactory.getSummonData(summon.getSkillId());
        if (summon.getSkillId() / 1000000 != 35 && sse == null) {
            chr.dropMessage(5, "召唤兽攻击处理出错。");
            return;
        }
        Point lt, rb;
        if (sse != null) {
            if (sse.delay > 0) {
                if (tick != -1) {
                    summon.CheckSummonAttackFrequency(chr, tick);
                    chr.updateTick(tick);
                } else {
                    summon.CheckPVPSummonAttackFrequency(chr);
                }
                chr.getCheatTracker().checkSummonAttack();
            }
            mobCount = sse.mobCount;
            attackCount = sse.attackCount;
            lt = sse.lt;
            rb = sse.rb;
        } else {
            lt = new Point(-100, -100);
            rb = new Point(100, 100);
        }
        Rectangle box = MapleStatEffect.calculateBoundingBox(chr.getTruePosition(), chr.isFacingLeft(), lt, rb, 0);
        List<AttackPair> ourAttacks = new ArrayList<>();
        List<Pair<Integer, Boolean>> attacks;
        maxdamage *= chr.getStat().getDamageRate() / 100.0;
        for (MapleMapObject mo : chr.getMap().getCharactersIntersect(box)) {
            MapleCharacter attacked = (MapleCharacter) mo;
            if (attacked.getId() != chr.getId() && attacked.isAlive() && !attacked.isHidden() && (type == 0 || attacked.getTeam() != chr.getTeam())) {
                double rawDamage = maxdamage / Math.max(0, ((magic ? attacked.getStat().mdef : attacked.getStat().wdef) * Math.max(1.0, 100.0 - ignoreDEF) / 100.0) * (type == 3 ? 0.1 : 0.25));
                if (attacked.getBuffedValue(MapleBuffStat.INVINCIBILITY) != null || PlayersHandler.inArea(attacked)) {
                    rawDamage = 0;
                }
                rawDamage += (rawDamage * chr.getDamageIncrease(attacked.getId()) / 100.0);
                rawDamage *= attacked.getStat().mesoGuard / 100.0;
                rawDamage = attacked.modifyDamageTaken(rawDamage, attacked).left;
                double min = (rawDamage * chr.getStat().trueMastery / 100);
                attacks = new ArrayList<>(attackCount);
                int totalMPLoss = 0, totalHPLoss = 0;
                for (int i = 0; i < attackCount; i++) {
                    int mploss = 0;
                    double ourDamage = Randomizer.nextInt((int) Math.abs(Math.round(rawDamage - min)) + 1) + min;
                    if (attacked.getStat().dodgeChance > 0 && Randomizer.nextInt(100) < attacked.getStat().dodgeChance) {
                        ourDamage = 0;
                        //i dont think level actually matters or it'd be too op
                        //} else if (attacked.getLevel() > chr.getLevel() && Randomizer.nextInt(100) < (attacked.getLevel() - chr.getLevel())) {
                        //	ourDamage = 0;
                    }
                    if (attacked.getBuffedValue(MapleBuffStat.魔法盾) != null) {
                        mploss = (int) Math.min(attacked.getStat().getMp(), (ourDamage * attacked.getBuffedValue(MapleBuffStat.魔法盾).doubleValue() / 100.0));
                    }
                    ourDamage -= mploss;
                    if (attacked.getBuffedValue(MapleBuffStat.终极无限) != null) {
                        mploss = 0;
                    }
                    attacks.add(new Pair<>((int) Math.floor(ourDamage), false));

                    totalHPLoss += Math.floor(ourDamage);
                    totalMPLoss += mploss;
                }
                attacked.addMPHP(-totalHPLoss, -totalMPLoss);
                ourAttacks.add(new AttackPair(attacked.getId(), attacked.getPosition(), attacks));
                attacked.getCheatTracker().setAttacksWithoutHit(false);
                if (totalHPLoss > 0) {
                    didAttack = true;
                }
                if (attacked.getStat().getHPPercent() <= 20) {
                    SkillFactory.getSkill(PlayerStats.getSkillByJob(93, attacked.getJob())).getEffect(1).applyTo(attacked);
                }

                if (effect.getMonsterStati().size() > 0 && effect.makeChanceResult()) {
                    for (Map.Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                        MapleDisease d = MonsterStatus.getLinkedDisease(z.getKey());
                        if (d != null) {
                            attacked.giveDebuff(d, z.getValue(), effect.getDuration(), d.getDisease(), 1);
                        }
                    }
                }
                effect.handleExtraPVP(chr, attacked);

                chr.getClient().getSession().write(MaplePacketCreator.getPVPHPBar(attacked.getId(), attacked.getStat().getHp(), attacked.getStat().getCurrentMaxHp()));
                addedScore += (totalHPLoss / 100) + (totalMPLoss / 100); //ive NO idea
                if (!attacked.isAlive()) {
                    killed = true;
                }

                if (ourAttacks.size() >= mobCount) {
                    break;
                }
            }
        }
        if (killed || addedScore > 0) {
            chr.getEventInstance().addPVPScore(chr, addedScore);
            chr.getClient().getSession().write(MaplePacketCreator.getPVPScore(ourScore + addedScore, killed));
        }
        if (didAttack) {
            chr.getMap().broadcastMessage(SummonPacket.pvpSummonAttack(chr.getId(), chr.getLevel(), summon.getObjectId(), summon.isFacingLeft() ? 4 : 0x84, summon.getTruePosition(), ourAttacks));
            if (effect.getSkill().isNonExpireSummon() && System.currentTimeMillis() > summon.getCreateTime() + effect.getDuration()) {
                chr.getMap().broadcastMessage(SummonPacket.removeSummon(summon, true));
                chr.getMap().removeMapObject(summon);
                chr.removeVisibleMapObject(summon);
                chr.removeSummon(summon);
            }
        }
    }

    public static void MoveLittleWhite(LittleEndianAccessor slea, MapleCharacter chr) {
        slea.skip(17);
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 7);

        if (res != null && chr != null && chr.getMap() != null && chr.getLittleWhite() != null && res.size() > 0) {
            if (slea.available() != 8) {
                //System.out.println("slea.available() != 8 (小白移动错误) 剩余封包长度: " + slea.available());
                FileoutputUtil.log(FileoutputUtil.Movement_Log, "slea.available() != 8 (小白移动错误) 封包: " + slea.toString(true));
                return;
            }
            Point pos = new Point(chr.getLittleWhite().getPosition());
            chr.getLittleWhite().updatePosition(res);
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, SummonPacket.moveLittleWhite(chr.getId(), chr.getLittleWhite().getObjectId(), pos, chr.getLittleWhite().getStance(), res), false);
            }
        }
    }

    public static void SubLittleWhite(LittleEndianAccessor slea, MapleCharacter chr) {
        slea.skip(4);
        int skillType = slea.readInt();
        Skill bHealing = SkillFactory.getSkill(阴阳师.幻醒_小白);
        int bHealingLvl = chr.getTotalSkillLevel(bHealing);
        boolean forth = true;
        if (bHealingLvl <= 0 || bHealing == null) {
            bHealing = SkillFactory.getSkill(阴阳师.影朋_小白);
            bHealingLvl = chr.getTotalSkillLevel(bHealing);
            forth = false;
        }
        if (bHealingLvl <= 0 || bHealing == null) {
            return;
        }
        int effectid = 0;
        switch (skillType) {
            case 3:
                effectid = 阴阳师.花炎结界;
                break;
            case 5:
                effectid = 阴阳师.幽玄气息;
                break;
        }
        effectid += forth ? 20000 : 0;
        bHealing = SkillFactory.getSkill(effectid);
        bHealingLvl = chr.getTotalSkillLevel(bHealing);
        MapleStatEffect healEffect = bHealing.getEffect(bHealingLvl);
        if (healEffect != null) {
            healEffect.applyTo(chr);
        }
//        chr.getClient().getSession().write(EffectPacket.show影朋小白效果(skillType));
        chr.getMap().broadcastMessage(EffectPacket.show影朋小白效果(skillType));
        chr.getMap().broadcastMessage(chr, EffectPacket.show影朋小白效果(skillType), false);
    }
}
