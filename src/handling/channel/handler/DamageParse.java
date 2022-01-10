package handling.channel.handler;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.anticheat.CheatTracker;
import client.anticheat.CheatingOffense;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import constants.JobConstants;
import constants.ServerConstants;
import constants.skills.*;
import handling.world.WorldBroadcastService;
import handling.world.party.MaplePartyCharacter;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.log4j.Logger;
import server.AutobanManager;
import server.MapleStatEffect;
import server.Randomizer;
import server.life.Element;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.maps.MapleMap;
import server.maps.pvp.MaplePvp;
import tools.AttackPair;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Triple;
import tools.data.input.LittleEndianAccessor;

/**
 * 解析玩家所有的攻击行为.
 *
 * @author dongjak
 *
 */
public class DamageParse {

    private static final Logger log = Logger.getLogger(DamageParse.class);

    /**
     * @param attack 攻击信息
     * @param theSkill 技能信息
     * @param player 角色信息
     * @param attackCount 攻击次数
     * @param effect 技能效果
     * @param maxDamagePerMonster 每个怪物的最大伤害
     * @param attack_type 攻击类型
     * @param visProjectile 可见的子弹、箭矢、飞镖等...
     */
    public static void applyAttack(AttackInfo attack, Skill theSkill, MapleCharacter player, int attackCount, double maxDamagePerMonster, MapleStatEffect effect, AttackType attack_type, int visProjectile) {
        if (!player.isAlive() || player.isBanned()) { //如果玩家死亡
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD, "操作者已死亡.");
            return;
        }
        if (attack.real && GameConstants.getAttackDelay(attack.skillId, theSkill) >= 50) { //大于100的就检测攻击时间
            player.getCheatTracker().checkAttack(attack.skillId, attack.lastAttackTickCount);
        }
        if (attack.skillId != 0) { //当攻击技能不等于空
            if (effect == null) {
                player.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (GameConstants.isMulungSkill(attack.skillId)) {
                if (player.getMapId() / 10000 != 92502) {
                    //AutobanManager.getInstance().autoban(player.getClient(), "Using Mu Lung dojo skill out of dojo maps.");
                    return;
                } else {
                    if (player.getMulungEnergy() < 10000) {
                        return;
                    }
                    player.mulung_EnergyModify(false);
                }
            } else if (GameConstants.isPyramidSkill(attack.skillId)) {
                if (player.getMapId() / 1000000 != 926) {
                    //AutobanManager.getInstance().autoban(player.getClient(), "Using Pyramid skill outside of pyramid maps.");
                    return;
                } else {
                    if (player.getPyramidSubway() == null || !player.getPyramidSubway().onSkillUse(player)) {
                        return;
                    }
                }
            } else if (GameConstants.isInflationSkill(attack.skillId)) {
                if (player.getBuffedValue(MapleBuffStat.巨人药水) == null) {
                    return;
                }
            } else if (attack.numAttacked > effect.getMobCount(player) && attack.skillId != 圣骑士.万佛归一破) { // Must be done here, since NPE with normal atk
                player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT, "异常的攻击次数.");
                if (player.isShowPacket()) {
                    player.dropMessage(-5, "物理怪物数量检测 => 封包解析次数: " + attack.numAttacked + " 服务端设置次数: " + effect.getMobCount(player));
                }
                return;
            } else if (JobConstants.is魂骑士(player.getJob()) && player.getBuffedValue(MapleBuffStat.日月轮转) != null) {
                int b = player.getSpecialStat().getMoonCycle();
                int skillid = b == 0 ? 魂骑士.月光洒落 : 魂骑士.旭日;
                SkillFactory.getSkill(skillid).getEffect(player.getSkillLevel(skillid)).applyTo(player);
            } else if (JobConstants.is神之子(player.getJob())) {
                player.handle提速时刻();
            }
            player.setLastAttackSkillId(attack.skillId);
        }

        StringBuilder sb = new StringBuilder();
        int total = 0;
        boolean first = true;
        for (AttackPair oned : attack.allDamage) {
            for (Pair<Integer, Boolean> dmg : oned.attack) {
                if (!first) {
                    sb.append(", ").append(dmg.left).append(dmg.right ? "(critical)" : "");
                } else {
                    sb.append("+ Client: ").append(dmg.left).append(dmg.right ? "(critical)" : "");
                    first = false;
                }
                total += dmg.left;
            }
        }

        if (player.getClient().getChannelServer().isAdminOnly() && player.isAdmin()) {
            player.dropMessage(-1, "攻击动作: " + Integer.toHexString(attack.display));
            sb.append(" = ").append(total);
            player.dropMessage(6, sb.toString());
        }

        /* 根据角色当前拥有的状态增加攻击次数 */
        if (player.getStatForBuff(MapleBuffStat.光暗转换) != null) { //TODO:这里是不是应该删除掉？
            attackCount *= 2;
        } else if (player.hasBuffSkill(神炮王.霰弹炮)) {
            attackCount *= 3;
        } else if (player.getStatForBuff(MapleBuffStat.骑兽技能) != null && player.getStatForBuff(MapleBuffStat.骑兽技能).is美洲豹骑士()) {
            attackCount *= 2;
        } else if (player.getStatForBuff(MapleBuffStat.战斗大师) != null) {
            attackCount += 2;
        }

        /* 检测技能是否为正常的攻击次数 ： 在此处定义的技能将不会被检测 */
        boolean useAttackCount = attack.skillId != 侠盗.金钱炸弹 && attack.skillId != 侠盗.金钱炸弹_攻击 && attack.skillId != 箭神.一击要害箭 && attack.skillId != 双弩.闪电刀刃 && attack.skillId != 幻影.卡片雪舞 && attack.skillId != 幻影.黑色秘卡 && attack.skillId != 隐士.隐士标记_飞镖 && attack.skillId != 隐士.刺客标记_飞镖 && attack.skillId != 爆莉萌天使.灵魂汲取_攻击 && attack.skillId != 机械师.金属机甲_人类 && attack.skillId != 机械师.金属机甲_战车;

        /* 检测伤害次数是否大于攻击次数 */
        if (attack.numDamage > attackCount) {
            if (useAttackCount) {
                if (player.isShowPacket()) {
                    player.dropMessage(-5, "物理攻击次数检测 => 封包解析次数: " + attack.numDamage + " 服务端设置次数: " + attackCount);
                }
                player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT, "异常的攻击次数.");
                log.info("[作弊] " + player.getName() + " 物理攻击次数异常。 attack.hits " + attack.numDamage + " attackCount " + attackCount + " 技能ID " + attack.skillId);
                if (ServerConstants.isShowGMMessage()) {
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[管理员信息] " + player.getName() + " ID: " + player.getId() + " (等级 " + player.getLevel() + ") 物理攻击次数异常。 attack.hits " + attack.numDamage + " attackCount " + attackCount + " 技能ID " + attack.skillId));
                }
                return;
            }
        }

        /* 如果当前攻击的伤害数量大于0且攻击次数大于0 */
        if (attack.numDamage > 0 && attack.numAttacked > 0) {
            // 检查当前角色武器的耐久度
            if (!player.getStat().checkEquipDurabilitys(player, -1)) {
                player.dropMessage(5, "武器耐久度不足，无法进行攻击！");
                return;
            }
        }

        /* 检测角色主武器是否为灵魂武器，且当前的攻击技能是否为灵魂技能。*/
        if (player.checkSoulWeapon() && attack.skillId == player.getEquippedSoulSkill()) {
            player.checkSoulState(true);
        }

        /* PVP 设置*/
        if (player.getMap().isPvpMap()) {
            MaplePvp.doPvP(player, player.getMap(), attack, effect);
        } else if (player.getMap().isPartyPvpMap()) {
            MaplePvp.doPartyPvP(player, player.getMap(), attack, effect);
        } else if (player.getMap().isGuildPvpMap()) {
            MaplePvp.doGuildPvP(player, player.getMap(), attack, effect);
        }

        /* 定义伤害数据信息 */
        int fixeddmg;                                                   // 固定伤害
        long totalDamage = 0;                                           // 总伤害
        long totDamageToOneMonster = 0;                                 // 总伤害到一个怪物
        long monsterMaxHp = 0;                                          // 怪物最大HP
        long maxDamagePerHit = player.getMaxDamageOver(attack.skillId); // 每次命中怪物时最大的伤害等于角色当前攻击技能的最大伤害值
        MapleMonster monster;                                           // 怪物
        MapleMonsterStats monsterstats;                                 // 怪物状态信息
        int lastKillMob = 0;                                            // 最后一个杀死的怪物
        int lastKillMobExp = 0;                                         // 最后一个杀死的怪物的经验
        Map<Integer, Integer> killMobList = new LinkedHashMap<>();      // 创建一个杀死怪物的列表
        boolean isUseSkillEffect = true;

        /* 是否为暴击伤害 */
        boolean isCritDamage = false;

        /* 开始解析伤害信息 */
        for (AttackPair oned : attack.allDamage) {
            monster = player.getMap().getMonsterByOid(oned.objectid);
            if (monster != null && monster.getLinkCID() <= 0) {
                totDamageToOneMonster = 0;
                monsterMaxHp = monster.getMobMaxHp();
                monsterstats = monster.getStats();
                fixeddmg = monsterstats.getFixedDamage();
                long eachd;
                for (Pair<Integer, Boolean> eachde : oned.attack) {
                    if (eachde.right) {
                        isCritDamage = true;
                    }
                    eachd = eachde.left;
                    if (player.isShowPacket() && eachd > 0) {
                        player.dropMessage(-1, "物理攻击打怪伤害 : " + eachd + " 服务端预计伤害 : " + maxDamagePerHit + " 是否超过 : " + (eachd > maxDamagePerHit) + " 是否爆击: " + eachde.right);
                    }
                    if (fixeddmg != -1) {
                        if (monsterstats.getOnlyNoramlAttack()) { //如果怪物是只容许普通攻击的类型
                            eachd = attack.skillId != 0 ? 0 : fixeddmg;
                        } else {
                            eachd = fixeddmg;
                        }
                    } else {
                        if (monsterstats.getOnlyNoramlAttack()) {
                            eachd = attack.skillId != 0 ? 0 : Math.min(eachd, maxDamagePerHit);  // 转换为服务端来计算伤害数据
                        } else if (!player.isGM()) {
                            if (eachd > maxDamagePerHit && maxDamagePerHit > 2) {
                                player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE, "[伤害: " + eachd + ", 预计伤害: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]");
                                if (attack.real) {
                                    player.getCheatTracker().checkSameDamage(eachd, maxDamagePerHit);
                                }
                                if (eachd > maxDamagePerHit * 2 && attack.skillId != 飞侠.双飞斩) {
                                    String banReason = player.getName() + " 被系统封号.[异常攻击伤害值: " + eachd + ", 预计伤害: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]";
                                    if (player.getLevel() < 10 && eachd >= 10000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 20 && eachd >= 20000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 30 && eachd >= 40000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 50 && eachd >= 60000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_2, "[伤害: " + eachd + ", 预计伤害: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]");
                                }
                            } else {
                                if (eachd > maxDamagePerHit) {
                                    eachd = (int) (maxDamagePerHit);
                                }
                            }
                        }
                    }
                    totDamageToOneMonster += eachd;
                    //force the miss even if they dont miss. popular wz edit
                    if ((eachd == 0 || monster.getId() == 9700021) && player.getPyramidSubway() != null) { //miss
                        player.getPyramidSubway().onMiss(player);
                    }
                }

                /* 总伤害等于总伤害加上对每个怪物的总伤害！*/
                totalDamage += totDamageToOneMonster;

                /* 检测当前怪物是否为自动攻击， 控制器为空 */
                player.checkMonsterAggro(monster);

                /* 处理技能 */
 /* 在一定时间内攻击敌人时掉落金币。技能等级越高，掉落的金币越多。使用一次会激活，再使用一次就会关闭效果的#cON/OFF技能 */
                if (player.getBuffedValue(MapleBuffStat.敛财术) != null) {
                    /* 以下技能在攻击时，将会掉落金币 */
                    switch (attack.skillId) {
                        case 0:
                        case 飞侠.二连击:
                        case 侠盗.回旋斩:
                        case 侠盗.炼狱:
                        case 侠盗.刀刃之舞:
                        case 侠盗.突然袭击:
                        case 侠盗.一出双击:
                            int maxmeso = player.getBuffedValue(MapleBuffStat.敛财术);
                            for (Pair<Integer, Boolean> eachde : oned.attack) {
                                int num = eachde.left;
                                if (player.getStat().pickRate >= 100 || Randomizer.nextInt(99) < player.getStat().pickRate) {
                                    player.getMap().spawnMesoDrop(Math.min((int) Math.max(((double) num / (double) 20000) * maxmeso, 1), maxmeso), new Point((int) (monster.getTruePosition().getX() + Randomizer.nextInt(100) - 50), (int) (monster.getTruePosition().getY())), monster, player, false, (byte) 0);
                                }
                            }
                            break;
                    }
                }

                /* 对怪物的伤害大于0时处理的数据 */
                if (totDamageToOneMonster > 0 || attack.skillId == 圣骑士.圣域 || attack.skillId == 战神.钻石星辰) {

                    /* 角色是刺客时标记攻击怪物效果*/
                    if (player.isBuffFrom(MapleBuffStat.刺客标记, SkillFactory.getSkill(隐士.刺客标记))) {
//                   System.out.println("刺客标记等级" + player.getSkillLevel(SkillFactory.getSkill(隐士.刺客标记)));
//                   System.out.println("隐士标记等级" + player.getSkillLevel(SkillFactory.getSkill(隐士.隐士标记)));
//                   System.out.println("隐士标记等级" + monster.getAllBuffs());
                        Skill mskill = null;
                        int mskillid = 0;
                        int mskillevel = 0;
                        MapleStatEffect effectSkill = null;

                        if (player.getSkillLevel(SkillFactory.getSkill(隐士.刺客标记)) > 0) {
                            mskillid = 隐士.刺客标记;
                            mskill = SkillFactory.getSkill(隐士.刺客标记);
                            mskillevel = player.getSkillLevel(SkillFactory.getSkill(隐士.隐士标记));
                        }

                        if (player.getSkillLevel(SkillFactory.getSkill(隐士.隐士标记)) > 0) {
                            mskillid = 隐士.隐士标记;
                            mskill = SkillFactory.getSkill(隐士.隐士标记);
                            mskillevel = player.getSkillLevel(SkillFactory.getSkill(隐士.隐士标记));
                        }
                        //for (MonsterStatusEffect s: monster.getAllBuffs()) {
                        //检测该怪物是否存在刺客标记
                        //if (s.getSkill() == mskillid) {
                        if (JobConstants.is隐士(player.getJob())) {
                            if (attack.skillId != 0 && attack.skillId != 隐士.刺客标记_飞镖 && attack.skillId != 隐士.隐士标记_飞镖 && visProjectile > 0) {
                                isUseSkillEffect = false;
                                player.handleAssassinStack(monster, visProjectile);
                                //对其怪物取消标记
                                //monster.cancelSingleStatus(s);
                                //monster.cancelSingleStatus(new MonsterStatusEffect(MonsterStatus.中毒, effectSkill.getDOT(), mskillid, null, false));
                                //}
                            }
                        }
                        // }

                        if (isUseSkillEffect) {
                            if (mskill != null) {
                                effectSkill = mskill.getEffect(mskillevel);
                            }
                            if (effectSkill != null) {
                                if (attack.skillId != 0 && attack.skillId != 隐士.刺客标记_飞镖 && attack.skillId != 隐士.隐士标记_飞镖 && visProjectile > 0) {
                                    if (effectSkill.makeChanceResult()) {
                                        monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.持续伤害, effectSkill.getDOT(), mskillid, null, false, effectSkill.getDOTStack()), true, effectSkill.getDuration(), true, effectSkill);
                                    }
                                }
                            }
                        }
                    }

                    /* 角色是侠盗四转时处理 侠盗本能击杀*/
                    if (JobConstants.is侠盗(player.getJob())) {
                        player.handleKillSpreeGain();
                    }
                    /* 处理技能伤害 */
                    for (Triple<Integer, String, Integer> psdSkill : player.getStat().getPsdSkills()) {
                        if (psdSkill.left == attack.skillId && attack.skillId != 0 && psdSkill.mid != "") {
                            totDamageToOneMonster *= (1.0 + (MapleStatEffect.parseEval(psdSkill.mid, player.getSkillLevel(psdSkill.right)) / 100.0));
                        }
                    }
                    /* 奇袭者元素雷电被动BUFF设置 */
                    if (JobConstants.is奇袭者(player.getJob())) {
                        player.handle元素雷电(attack.skillId);
                    }
                    /* 圣骑士元素冲击处理 */
                    if (JobConstants.is圣骑士(player.getJob())) {
                        player.handle元素冲击(attack.skillId);
                    }
                    /* 风灵使者暴风灭世处理 */
                    if (JobConstants.is风灵使者(player.getJob())) {
                        if (attack.skillId != 风灵使者.狂风肆虐Ⅰ && attack.skillId != 风灵使者.狂风肆虐Ⅱ && attack.skillId != 风灵使者.狂风肆虐Ⅲ) {
                            //player.handle狂风肆虐();
                            player.handle暴风灭世(monster.getObjectId());
                        }
                    }
                    /* 处理灵魂汲取_攻击 */
                    if (attack.skillId == 爆莉萌天使.灵魂汲取_攻击) {
                        player.handle灵魂汲取(monster.getObjectId());
                    }

                    /* 处理技能圣域 */
                    boolean killmob;

                    /* 用巨大的锤子击打地面，同时攻击15名以下的多个敌人。受到攻击的对象体力减至1，给BOSS造成致命伤。 */
                    if (attack.skillId != 圣骑士.圣域) {
                        killmob = monster.damage(player, totDamageToOneMonster, true, attack.skillId);
                    } else {
                        killmob = monster.damage(player, (monster.getStats().isBoss() ? 500000 : (monster.getHp() - 1)), true, attack.skillId);
                    }
                    if (killmob) {
                        killMobList.put(monster.getObjectId(), monster.getMobExpFromChannel());
                        lastKillMob = monster.getObjectId();
                        lastKillMobExp = monster.getMobExpFromChannel();
                        player.gainJianQi();
                    }
                    //怪物反射伤害 宙斯盾系统是无视反射的
                    boolean reflectDamage = true;
                    if (attack.skillId == 尖兵.宙斯盾系统 || player.getBuffedValue(MapleBuffStat.至圣领域) != null || player.hasBuffSkill(狂龙战士.终极变形_超级)) {
                        reflectDamage = false;
                    }
                    if (player.isShowPacket()) {
                        player.dropSpouseMessage(0x0A, "是否反射伤害 : " + reflectDamage);
                    }
                    if (reflectDamage && monster.isBuffed(MonsterStatus.反射物攻)) {
                        player.addHP(-(7000 + Randomizer.nextInt(8000)));
                    }
                    player.onAttack(monster.getMobMaxHp(), monster.getMobMaxMp(), attack.skillId, monster.getObjectId(), totalDamage);

                    /* 处理技能添加怪物状态等· */
                    switch (attack.skillId) {
                        case 双刀.流云斩:
                        case 双刀.双刀风暴:
                        case 双刀.血雨腥风:
                        case 双刀.悬浮地刺:
                        case 双刀.暗影飞跃斩:
                        case 双刀.终极斩:
                        case 双刀.暴怒刀阵:
                        case 双刀.地狱锁链:
                        case 双刀.幽灵一击:
                        case 飞侠.二连击:
                        case 飞侠.双飞斩:
                        case 侠盗.回旋斩:
                        case 侠盗.炼狱:
                        case 侠盗.刀刃之舞:
                        case 侠盗.暗杀:
                        case 侠盗.一出双击:
                        case 侠盗.突然袭击:
                        case 隐士.爆裂飞镖:
                        case 隐士.风之护符:
                        case 隐士.三连环光击破:
                        case 隐士.影子分裂:
                        case 隐士.四连镖:
                        case 夜行者.武器用毒液:
                        case 夜行者.多重飞镖: {
                            int[] skills = {侠盗.武器用毒液, 隐士.刺客标记, 隐士.武器用毒液, 双刀.武器用毒液};
                            int[] skillss = {侠盗.致命毒液, 隐士.隐士标记, 隐士.致命毒液, 双刀.致命毒液};
                            int skillS = 0;
                            for (int i : skillss) {
                                if (player.getTotalSkillLevel(i) > 0) {
                                    skillS = i;
                                    break;
                                }
                            }
                            for (int i : skills) {
                                Skill skill = SkillFactory.getSkill(i);
                                if (player.getTotalSkillLevel(skill) > 0) {
                                    MapleStatEffect venomEffect = skill.getEffect(player.getTotalSkillLevel(skill));
                                    if (player.getTotalSkillLevel(skillS) > 0) {//致命毒液
                                        skill = SkillFactory.getSkill(skillS);
                                        venomEffect = skill.getEffect(player.getTotalSkillLevel(skill));
                                        int szie = 0;
                                        for (MonsterStatusEffect s : monster.getAllBuffs()) {
                                            if (s.getSkill() == skillS) {
                                                szie++;
                                            }
                                        }

                                        if (venomEffect.makeChanceResult()) {
                                            if (szie < venomEffect.getDOTStack() + 1) {
                                                monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.持续伤害, venomEffect.getDOT(), skillS, null, false), true, venomEffect.getDuration(), true, venomEffect);
                                            }
                                        }
                                    } else {
                                        if (venomEffect.makeChanceResult()) {
                                            monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.持续伤害, 1, i, null, false), true, venomEffect.getDuration(), true, venomEffect);
                                        }
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                        case 侠盗.神通术: { // 神通术
                            monster.handleSteal(player);
                            break;
                        }
                        case 战神.斗气爆裂:
                        case 战神.战神突进:
                        case 战神.幻影狼牙:
                        case 战神.终极投掷:
                        case 战神.旋风:
                        case 战神.巨熊咆哮:
                        case 战神.钻石星辰:
                        case 战神.全力挥击:
                        case 战神.双重重击:
                        case 战神.三重重击:
                        case 战神.全力挥击_双重重击:
                        case 战神.全力挥击_三重重击:
                        case 战神.战神之舞_双重重击:
                        case 战神.战神之舞_三重重击: {
                            if (player.getBuffedValue(MapleBuffStat.属性攻击) != null && !monster.getStats().isBoss()) {
                                MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.属性攻击);
                                if (eff != null) {
                                    monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.速度, eff.getX(), eff.getSourceId(), null, false, 0), false, eff.getY() * 1000, true, eff);
                                }
                            }
                            if (player.getBuffedValue(MapleBuffStat.战神抗压) != null && !monster.getStats().isBoss()) {
                                MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.战神抗压);
                                if (eff != null && eff.makeChanceResult() && !monster.isBuffed(MonsterStatus.抗压)) {
                                    monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.抗压, 1, eff.getSourceId(), null, false, 0), false, eff.getX() * 1000, true, eff);
                                }
                            }
                            break;
                        }
                        case 夜行者.双飞斩:
                        case 夜行者.三连环光击破:
                        case 夜行者.三连环光击破_最后一击:
                        case 夜行者.四连镖:
                        case 夜行者.四连镖_最后一击:
                        case 夜行者.五倍投掷:
                        case 夜行者.五倍投掷_最后一击: {
                            if (player.getBuffedValue(MapleBuffStat.元素黑暗) != null) {
                                MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.元素黑暗);
                                monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.元素黑暗, 1, 夜行者.元素_黑暗, null, false, 0), true, eff.getDuration(), true, eff);
                            }
                            break;
                        }
                        default: //passives attack bonuses
                            break;
                    }

                    /* 当前攻击出的伤害对怪物伤害大于0的话，就根据角色穿戴的武器、技能状态、BUFF状态、给予怪物状态 */
                    if (totDamageToOneMonster > 0) {
                        /* 主武器 */
                        Item weapon_ = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
                        if (weapon_ != null) {
                            MonsterStatus stat = GameConstants.getStatFromWeapon(weapon_.getItemId()); //根据主武器的不同，分两种状态：1恐慌 2速度
                            if (stat != null && Randomizer.nextInt(100) < GameConstants.getStatChance()) {
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(stat, GameConstants.getXForStat(stat), GameConstants.getSkillForStat(stat), null, false, 0);
                                monster.applyStatus(player, monsterStatusEffect, false, 10000, false, null);
                            }
                        }

                        if (player.getBuffedValue(MapleBuffStat.炎术引燃) != null) {
                            MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.炎术引燃);
                            if (eff != null && eff.makeChanceResult() && !monster.isBuffed(MonsterStatus.持续伤害)) {
                                //List<MonsterStatusEffect> monsterList = new ArrayList<>();
                                //monsterList.add(new MonsterStatusEffect(MonsterStatus.持续伤害, 1, eff.getSourceId(), null, false, 0));
                                //monsterList.add(new MonsterStatusEffect(MonsterStatus.引燃, eff.getX(), eff.getSourceId(), null, false, 0));
                                monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.持续伤害, 1, eff.getSourceId(), null, false), true, eff.getDOTTime(), true, eff);
                                //monster.applyStatus(player, monsterList, true, eff.getDOTTime(), true, eff);
                            }
                        }

                        if (player.getBuffedValue(MapleBuffStat.额外回避) != null) {
                            MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.额外回避);
                            if ((eff != null) && (eff.makeChanceResult())) {
                                monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.速度, eff.getX(), 3121007, null, false, 0), false, eff.getY() * 1000, true, eff);
                            }
                        }

                        if (player.getJob() == 121 || player.getJob() == 122) {
                            Skill skill = SkillFactory.getSkill(圣骑士.寒冰冲击);
                            if (player.isBuffFrom(MapleBuffStat.属性攻击, skill)) {
                                MapleStatEffect eff = skill.getEffect(player.getTotalSkillLevel(skill));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(MonsterStatus.无法移动, 1, skill.getId(), null, false, 0);
                                monster.applyStatus(player, monsterStatusEffect, false, eff.getY() * 2000, true, eff);
                            }
                        }
                    }

                    if (effect != null && effect.getMonsterStati().size() > 0) {
                        if (effect.makeChanceResult()) {
                            for (Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                                monster.applyStatus(player, new MonsterStatusEffect(z.getKey(), z.getValue(), theSkill.getId(), null, false, 0), effect.isPoison(), effect.getDuration(), true, effect);
                            }
                        }
                    }
                }
            }
        }

        //处理激活刀飞幸运钱的再次使用
        if (isCritDamage && player.getJob() == 422 && player.getSkillLevel(侠盗.幸运钱) > 0) {
            player.switchLuckyMoney(true);
        }
        //攻击怪物时的一些特殊处理
        if (monsterMaxHp > 0 && totDamageToOneMonster > 0) {
            player.afterAttack(attack.numAttacked, attack.numDamage, attack.skillId);
            if (!killMobList.isEmpty() && lastKillMob > 0) {
                player.handleKillMobs(killMobList.size(), lastKillMob, lastKillMobExp);
            }
        }

        //特殊技能效果处理
        if (effect != null && attack.skillId != 0 && (attack.numAttacked > 0 || (attack.skillId != 双刀.终极斩)) && !GameConstants.isNoDelaySkill(attack.skillId) && !GameConstants.isNoApplyTo(attack.skillId)) {
            boolean isApplyTo = true;
            if (effect.is超越攻击() && totDamageToOneMonster <= 0) {
                isApplyTo = false;
            }
            if (isApplyTo) {
                if (player.isShowPacket()) {
                    player.dropSpouseMessage(0x0A, "[applyAttack] 开始 => applyTo - skillId: " + attack.skillId);
                }
                effect.applyTo(player, attack.position, true); //这个地方是处理减少角色使用技能的HP或者MP
            }
        }
        //检测角色是否使用无敌
        if (totalDamage > 1 && GameConstants.getAttackDelay(attack.skillId, theSkill) >= 100) {
            CheatTracker tracker = player.getCheatTracker();
            tracker.setAttacksWithoutHit(true);
            if (tracker.getAttacksWithoutHit() >= 50) {
                tracker.registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, "无敌自动封号.");
            }
        }
    }

    public static void applyAttackMagic(AttackInfo attack, Skill theSkill, MapleCharacter player, MapleStatEffect effect, double maxDamagePerMonster) {
        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            return;
        }
        if (attack.real && GameConstants.getAttackDelay(attack.skillId, theSkill) >= 50) {  //大于100的就检测攻击时间
            player.getCheatTracker().checkAttack(attack.skillId, attack.lastAttackTickCount);
        }
        player.setLastAttackSkillId(attack.skillId);
        int mobCount = effect.getMobCount(player); //攻击怪物数量
        int attackCount = effect.getAttackCount(player); //攻击怪物次数
        if (player.getStatForBuff(MapleBuffStat.光暗转换) != null) {
            attackCount *= 2;
        }
        if (player.getStatForBuff(MapleBuffStat.天使复仇) != null && attack.skillId == 主教.光芒飞箭) {
            attackCount += 4;
        }
        if (attack.numDamage > attackCount || (attack.numAttacked > mobCount && attack.skillId != 夜光.绝对死亡)) {
            if (player.isShowPacket()) {
                player.dropMessage(-5, "魔法攻击次数检测  attack.hits " + attack.numDamage + " attackCount " + attackCount + " attack.targets " + attack.numAttacked + " MobCount " + mobCount);
            }
            player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT, "异常的攻击次数.");
            log.info("[作弊] " + player.getName() + " 魔法攻击次数异常。attack.hits " + attack.numDamage + " attackCount " + attackCount + " attack.targets " + attack.numAttacked + " MobCount " + mobCount);
            if (ServerConstants.isShowGMMessage()) {
                WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + player.getName() + " ID: " + player.getId() + " (等级 " + player.getLevel() + ") 魔法攻击次数异常。attack.hits " + attack.numDamage + " attackCount " + attackCount + " attack.targets " + attack.numAttacked + " MobCount " + mobCount + " 技能ID " + attack.skillId));
            }
            return;
        }
        if (attack.numDamage > 0 && attack.numAttacked > 0) {
            if (!player.getStat().checkEquipDurabilitys(player, -1)) { //i guess this is how it works ?
                player.dropMessage(5, "An item has run out of durability but has no inventory room to go to.");
                return;
            }
        }
        if (GameConstants.isMulungSkill(attack.skillId)) {
            if (player.getMapId() / 10000 != 92502) {
                //AutobanManager.getInstance().autoban(player.getClient(), "Using Mu Lung dojo skill out of dojo maps.");
                return;
            } else {
                if (player.getMulungEnergy() < 10000) {
                    return;
                }
                player.mulung_EnergyModify(false);
            }
        } else if (GameConstants.isPyramidSkill(attack.skillId)) {
            if (player.getMapId() / 1000000 != 926) {
                //AutobanManager.getInstance().autoban(player.getClient(), "Using Pyramid skill outside of pyramid maps.");
                return;
            } else {
                if (player.getPyramidSubway() == null || !player.getPyramidSubway().onSkillUse(player)) {
                    return;
                }
            }
        } else if (GameConstants.isInflationSkill(attack.skillId)) {
            if (player.getBuffedValue(MapleBuffStat.巨人药水) == null) {
                return;
            }
        }
        if (player.getClient().getChannelServer().isAdminOnly() && player.isAdmin()) {
            player.dropMessage(-1, "攻击动作: " + Integer.toHexString(attack.display));
        }

        long maxDamagePerHit = player.getMaxDamageOver(attack.skillId);
        long totDamageToOneMonster, fixeddmg;
        long totDamage = 0;
        MapleMonsterStats monsterstats;
        Skill eaterSkill = SkillFactory.getSkill(GameConstants.getMPEaterForJob(player.getJob()));
        int eaterLevel = player.getTotalSkillLevel(eaterSkill);
        int lastKillMob = 0;
        int lastKillMobExp = 0;
        Map<Integer, Integer> killMobList = new LinkedHashMap<>();

        MapleMap map = player.getMap();
        //PVP设置
        if (attack.skillId != 2301002) {
            if (map.isPvpMap()) {
                MaplePvp.doPvP(player, map, attack, effect);
            } else if (map.isPartyPvpMap()) {
                MaplePvp.doPartyPvP(player, map, attack, effect);
            } else if (map.isGuildPvpMap()) {
                MaplePvp.doGuildPvP(player, map, attack, effect);
            }
        }
        //攻击怪物伤害处理
        for (AttackPair oned : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(oned.objectid);
            if (monster != null && monster.getLinkCID() <= 0) {
                totDamageToOneMonster = 0;
                monsterstats = monster.getStats();
                fixeddmg = monsterstats.getFixedDamage();
                long eachd;
                for (Pair<Integer, Boolean> eachde : oned.attack) {
                    eachd = eachde.left;
                    if (fixeddmg != -1) {
                        eachd = monsterstats.getOnlyNoramlAttack() ? 0 : fixeddmg; // Magic is always not a normal attack
                    } else {
                        if (player.isShowPacket() && eachd > 0) {
                            player.dropMessage(-1, "魔法攻击打怪伤害 : " + eachd + " 服务端预计伤害 : " + maxDamagePerHit + " 是否超过 : " + (eachd > maxDamagePerHit));
                        }
                        if (monsterstats.getOnlyNoramlAttack()) {
                            eachd = 0; // Magic is always not a normal attack
                        } else if (!player.isGM()) {
                            if (eachd > maxDamagePerHit) {
                                player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_MAGIC, "[伤害: " + eachd + ", 预期: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]");
                                if (attack.real) { //检测是否为相同的伤害
                                    player.getCheatTracker().checkSameDamage(eachd, maxDamagePerHit);
                                }
                                if (eachd > maxDamagePerHit * 2 && attack.skillId != 夜光.绝对死亡) {
                                    String banReason = player.getName() + " 被系统封号.[异常攻击伤害值: " + eachd + ", 预计伤害: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]";
                                    if (player.getLevel() < 10 && eachd >= 10000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 20 && eachd >= 20000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 30 && eachd >= 40000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 50 && eachd >= 60000) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 70 && eachd >= 399999) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (player.getLevel() < 150 && eachd >= 599999) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    if (eachd > maxDamagePerHit * 3) {
                                        AutobanManager.getInstance().autoban(player.getClient(), banReason);
                                        return;
                                    }
                                    player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE_MAGIC_2, "[伤害: " + eachd + ", 预期: " + maxDamagePerHit + ", 怪物ID: " + monster.getId() + "] [职业: " + player.getJob() + ", 等级: " + player.getLevel() + ", 技能: " + attack.skillId + "]");
                                }
                            } else {
                                if (eachd > maxDamagePerHit) {
                                    eachd = (int) (maxDamagePerHit);
                                }
                            }
                        }
                    }
                    totDamageToOneMonster += eachd;
                }
                totDamage += totDamageToOneMonster;
                player.checkMonsterAggro(monster);
                if (GameConstants.getAttackDelay(attack.skillId, theSkill) >= 50 && !GameConstants.isNoDelaySkill(attack.skillId) && !GameConstants.is不检测范围(attack.skillId) && !monster.getStats().isBoss() && player.getTruePosition().distanceSq(monster.getTruePosition()) > GameConstants.getAttackRange(effect, player.getStat().defRange)) {
                    if (player.getMapId() != 703002000) {
                        if (ServerConstants.isShowGMMessage()) {
                            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + player.getName() + " ID: " + player.getId() + " (等级 " + player.getLevel() + ") 攻击范围异常。职业: " + player.getJob() + " 技能: " + attack.skillId + " [范围: " + player.getTruePosition().distanceSq(monster.getTruePosition()) + " 预期: " + GameConstants.getAttackRange(effect, player.getStat().defRange) + "]"));
                        }
                        player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER, "[范围: " + player.getTruePosition().distanceSq(monster.getTruePosition()) + ", 预期范围: " + GameConstants.getAttackRange(effect, player.getStat().defRange) + " ] [职业: " + player.getJob() + " 技能: " + attack.skillId + " ]"); // , Double.toString(Math.sqrt(distance))
                    }
                }
                if (attack.skillId == 主教.群体治愈 && !monsterstats.getUndead()) {
                    player.getCheatTracker().registerOffense(CheatingOffense.HEAL_ATTACKING_UNDEAD);
                    return;
                }
                if (totDamageToOneMonster > 0) {
                    boolean killmob = monster.damage(player, totDamageToOneMonster, true, attack.skillId);
                    if (killmob) {
                        killMobList.put(monster.getObjectId(), monster.getMobExpFromChannel());
                        lastKillMob = monster.getObjectId();
                        lastKillMobExp = monster.getMobExpFromChannel();
                    }
                    if (monster.isBuffed(MonsterStatus.反射魔攻)) {
                        player.addHP(-(7000 + Randomizer.nextInt(8000)));
                    }
                    if (player.getBuffedValue(MapleBuffStat.缓速术) != null) {
                        MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.缓速术);
                        if (eff != null && eff.makeChanceResult() && !monster.isBuffed(MonsterStatus.速度)) {
                            monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.速度, eff.getX(), eff.getSourceId(), null, false, 0), false, eff.getY() * 1000, true, eff);
                        }
                    }
                    if (player.getBuffedValue(MapleBuffStat.炎术引燃) != null) {
                        MapleStatEffect eff = player.getStatForBuff(MapleBuffStat.炎术引燃);
                        if (eff != null && eff.makeChanceResult() && !monster.isBuffed(MonsterStatus.持续伤害)) {
                            monster.applyStatus(player, new MonsterStatusEffect(MonsterStatus.持续伤害, 1, eff.getSourceId(), null, false, 0), true, eff.getDOTTime(), true, eff);
                        }
                    }
                    player.onAttack(monster.getMobMaxHp(), monster.getMobMaxMp(), attack.skillId, monster.getObjectId(), totDamage);
                    switch (attack.skillId) {
                        case 冰雷.冰河锁链:
                            monster.setTempEffectiveness(Element.冰, effect.getDuration());
                            break;
                        case 火毒.迷雾爆发:
                            monster.setTempEffectiveness(Element.火, effect.getDuration());
                            break;
                    }

                    // 处理心灵传动
                    if (JobConstants.is超能力者(player.getJob())) {
                        switch (attack.skillId) {
                            case 超能力者.心灵传动:
                            case 超能力者.心魂之力:
                            case 超能力者.心魂之力2:
                            case 超能力者.心魂之力2_引力:
                            case 超能力者.心魂之力3:
                            case 超能力者.心魂之力3_引力:
                            case 超能力者.心魂吸收:
                            case 超能力者.心魂吸收_攻击:
                            case 超能力者.终极_物质:
                            case 超能力者.终极_深层冲击:
                            case 超能力者.终极_火车:
                            case 超能力者.终极_BPM:
                            case 超能力者.终极_心魂弹:
                                break;
                            default:
                                player.handlerKSTelekinesis(monster.getObjectId());
                                break;
                        }
                    }

                    //给怪物BUFF状态效果
                    if (effect != null && effect.getMonsterStati().size() > 0) {
                        if (effect.makeChanceResult()) {
                            for (Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                                monster.applyStatus(player, new MonsterStatusEffect(z.getKey(), z.getValue(), theSkill.getId(), null, false, 0), effect.isPoison(), effect.getDuration(), true, effect);
                            }
                        }
                    }
                    //魔力吸收效果处理
                    if (eaterLevel > 0) {
                        eaterSkill.getEffect(eaterLevel).applyPassive(player, monster);
                    }
                } else {
                    if (attack.skillId == 夜光.闪爆光柱 && effect != null && effect.getMonsterStati().size() > 0) {
                        if (effect.makeChanceResult()) {
                            for (Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                                monster.applyStatus(player, new MonsterStatusEffect(z.getKey(), z.getValue(), theSkill.getId(), null, false, 0), effect.isPoison(), effect.getDuration(), true, effect);
                            }
                        }
                    }
                }
            }
        }
        if (attack.skillId != 主教.群体治愈) {
            effect.applyTo(player);
        }
        //攻击怪物时的一些特殊处理
//        player.afterAttack(attack.numAttacked, attack.numDamage, attack.skillId);
        if (!killMobList.isEmpty() && lastKillMob > 0) {
            player.handleKillMobs(killMobList.size(), lastKillMob, lastKillMobExp);
        }
        if (totDamage > 1 && GameConstants.getAttackDelay(attack.skillId, theSkill) >= 100) {
            CheatTracker tracker = player.getCheatTracker();
            tracker.setAttacksWithoutHit(true);
            if (tracker.getAttacksWithoutHit() >= 50) {
                tracker.registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, "无敌自动封号.");
            }
        }

        if (attack.skillId == 主教.光芒飞箭 && player.getParty() != null) {
            for (MaplePartyCharacter pc : player.getParty().getMembers()) {
                if (pc != null && pc.getMapid() == player.getMapId() && pc.getChannel() == player.getClient().getChannel()) {
                    MapleCharacter other = player.getClient().getChannelServer().getPlayerStorage().getCharacterByName(pc.getName());
                    if (other != null) {
                        other.addHP((int) (player.getStat().getCurrentMaxHp() * SkillFactory.getSkill(主教.光芒飞箭).getEffect(player.getSkillLevel(主教.光芒飞箭)).getX() / 100.0D * 10));
                    }
                }
            }
        }
        if (attack.skillId == 主教.天堂之门) {
            MapleStatEffect tmpEffect = SkillFactory.getSkill(主教.天堂之门).getEffect(player.getSkillLevel(主教.天堂之门));
            tmpEffect.applyTo(player);
        }
    }

    /*
     * 爆击伤害
     */
    public static AttackInfo Modify_AttackCrit(AttackInfo attack, MapleCharacter chr, int type, MapleStatEffect effect) {
        if (attack.skillId == 侠盗.金钱炸弹) {
            return attack;
        }

        int criticalRate = chr.getStat().passive_sharpeye_rate() + (effect == null ? 0 : effect.getCritical());
        int critStorage = chr.getBuffedIntValue(MapleBuffStat.暴击蓄能);
        if (critStorage > 0) {
            criticalRate += critStorage;
            if (!attack.allDamage.isEmpty()) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.暴击蓄能);
            }
        }
        boolean shadow = chr.getBuffedValue(MapleBuffStat.影分身) != null && (type == 1 || type == 2);
        List<Integer> damages = new ArrayList<>(), damage = new ArrayList<>();
        int hit, toCrit, mid_att;
        for (AttackPair pair : attack.allDamage) {
            if (pair.attack != null) {
                hit = 0;
                mid_att = shadow ? (pair.attack.size() / 2) : pair.attack.size();
                toCrit = attack.skillId == 侠盗.暗杀_1 || attack.skillId == 箭神.一击要害箭 || attack.skillId == 双弩.闪电刀刃 || attack.skillId == 双刀.暗影飞跃斩 || attack.skillId == 双刀.地狱锁链 || attack.skillId == 战神.巨熊咆哮 ? mid_att : 0;
                if (toCrit == 0) {
                    for (Pair<Integer, Boolean> eachd : pair.attack) {
                        if (!eachd.right && hit < mid_att) {
                            if (eachd.left > 999999 || Randomizer.nextInt(100) < criticalRate) {
                                toCrit++;
                            }
                            damage.add(eachd.left);
                        }
                        hit++;
                    }
                    if (toCrit == 0) {
                        damage.clear();
                        continue;
                    }
                    Collections.sort(damage);
                    for (int i = damage.size(); i > damage.size() - toCrit; i--) {
                        damages.add(damage.get(i - 1));
                    }
                    damage.clear();
                }
                hit = 0;
                for (Pair<Integer, Boolean> eachd : pair.attack) {
                    if (!eachd.right) {
                        if (attack.skillId == 侠盗.暗杀) {
                            eachd.right = hit == 3;
                        } else if (attack.skillId == 箭神.一击要害箭 || attack.skillId == 双弩.闪电刀刃 || attack.skillId == 战神.巨熊咆哮 || attack.skillId == 双刀.暗影飞跃斩 || attack.skillId == 双刀.地狱锁链 || eachd.left > 999999) { //snipe always crit
                            eachd.right = true;
                        } else if (hit >= mid_att) {
                            eachd.right = pair.attack.get(hit - mid_att).right;
                        } else {
                            eachd.right = damages.contains(eachd.left);
                        }
                    }
                    hit++;
                }
                damages.clear();
            }
        }
        return attack;
    }

    /*
     * 解析魔法攻击
     */
    public static AttackInfo parseMagicDamage(LittleEndianAccessor lea, MapleCharacter chr) {
        AttackInfo ret = new AttackInfo();
        ret.isMagicAttack = true; //设置该攻击为魔法攻击
        lea.skip(1);
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (byte) ((ret.numAttackedAndDamage >>> 4) & 0xF);
        ret.numDamage = (byte) (ret.numAttackedAndDamage & 0xF);
        ret.skillId = lea.readInt(); //技能ID
        lea.skip(5);
        if (GameConstants.isMagicChargeSkill(ret.skillId)) {
            ret.charge = lea.readInt();
        } else {
            ret.charge = -1;
        }
        lea.skip(1); // T071新增 未知
        ret.unk = lea.readByte();
        ret.display = lea.readByte(); //动作
        ret.direction = lea.readByte(); //方向
        lea.skip(4); // big bang
        lea.skip(1); // Weapon class
//        if (chr.getCygnusBless()) { //精灵的祝福
//            lea.skip(12); //3个相同的Int 
//        }
        ret.speed = lea.readByte(); //攻击速度
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        lea.skip(4); //0
        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<>();
        boolean isOutput = false;
        long maxDamagePerHit = chr.getMaxDamageOver(ret.skillId);
        for (int i = 0; i < ret.numAttacked; i++) {
            oid = lea.readInt(); //怪物ID
            ret.ef = lea.readByte();
            lea.skip(19); //V.112修改 以前19
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < ret.numDamage; j++) {
                damage = lea.readInt(); //打怪伤害
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "魔法攻击 - 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage);
                }
                if (damage > maxDamagePerHit * 1.5 || damage < 0 || oid <= 0) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(-5, "魔法攻击出错次数: 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 默认上限: " + maxDamagePerHit);
                    }
                    if (ServerConstants.isShowGMMessage()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 魔法攻击伤害异常。打怪伤害: " + damage + " 地图ID: " + chr.getMapId()));
                    }
                    if (!isOutput) {
                        isOutput = true;
                        FileoutputUtil.log(FileoutputUtil.攻击出错, "魔法攻击出错封包:  打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 技能ID: " + ret.skillId + " 默认上限: " + maxDamagePerHit + lea.toString(true));
                    }
                }
                allDamageNumbers.add(new Pair<>(damage, false));
            }
            lea.skip(8);
            int ksPsychicObjectId = -1;
            if (ret.skillId == 超能力者.心魂粉碎 || ret.skillId == 超能力者.心魂粉碎2 || ret.skillId == 超能力者.终极_心魂弹) {
                ksPsychicObjectId = lea.readInt();
                lea.skip(4);
            }
            if (ksPsychicObjectId >= 0) {
                ret.allDamage.add(new AttackPair(oid, ksPsychicObjectId, allDamageNumbers));
            } else {
                ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
            }

        }
        ret.position = lea.readPos();
        return ret;
    }

    /**
     * 解析近距离攻击封包
     *
     * @param lea
     * @param chr
     * @param energy
     * @return
     */
    public static AttackInfo parseCloseRangeAttack(LittleEndianAccessor lea, MapleCharacter chr, boolean energy) {
        AttackInfo ret = new AttackInfo();
        ret.isCloseRangeAttack = true; //设置该攻击为近距离攻击
        lea.skip(1); //00
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (byte) ((ret.numAttackedAndDamage >>> 4) & 0xF); //攻击怪物数
        ret.numDamage = (byte) (ret.numAttackedAndDamage & 0xF); //攻击次数
        ret.skillId = lea.readInt(); //技能ID
        ret.skllv = lea.readByte();
        if (chr.isShowPacket()) {
            chr.dropSpouseMessage(0x19, "[近距离攻击] - 技能ID: " + ret.skillId + " 技能等级: " + ret.skllv + " 攻击次数: " + ret.numAttacked + " 伤害次数: " + ret.numDamage);
        }
        switch (ret.skillId) {
            case 战神.抗压:
            case 唤灵斗师.黑暗闪电:
            case 火毒.快速移动精通:
            case 冰雷.快速移动精通:
            case 主教.快速移动精通:
            case 龙神.快速移动精通:
            case 双刀.阿修罗:
            case 冰雷.寒冰步:
            case 品克缤.品克缤之品格:
                lea.skip(4);
                break;
            case 夜行者.影子蝙蝠_攻击:
            case 夜行者.影子蝙蝠_反弹:
                lea.skip(10);
                break;
            default:
                if (GameConstants.isInflationSkill(ret.skillId)) {
                    lea.skip(4);
                } else {
                    lea.skip(5);
                }
                break;
        }
        switch (ret.skillId) {
            case 冰雷.寒霜爆晶:
            case 冰雷.闪电矛:
            case 黑骑士.拉曼查之枪:
            case 冲锋队长.龙卷风拳:
            case 冲锋队长.能量旋风:
            case 魂骑士.冥河破:
            case 魂骑士.冥河破_爆破:
            case 侠盗.潜影杀机:
            case 双刀.终极斩:
            case 神炮王.猴子炸药桶:
            case 神炮王.猴子炸药桶_爆炸:
            case 恶魔猎手.恶魔镰刀:
            case 恶魔猎手.灵魂吞噬:
            case 恶魔猎手.恶魔呼吸:
            case 夜行者.影缝之术:
            case 幻影.蓝光连击:
            case 幻影.卡片风暴:
            case 夜光.超级光谱:
            case 夜光.虚空重压:
            case 夜光.晨星坠落:
            case 夜光.晨星坠落_爆炸:
            case 狂龙战士.扇击:
            case 狂龙战士.扇击_1:
            case 狂龙战士.扇击_变身:
            case 爆莉萌天使.超级诺巴:
            case 爆莉萌天使.灵魂共鸣:
            case 恶魔复仇者.暗影蝙蝠:
            case 恶魔复仇者.活力吞噬:
            case 尖兵.原子推进器:
            case 尖兵.刀锋之舞:
            case 神之子.圆月旋风:
            case 神之子.进阶圆月旋风:
            case 神之子.极速切割_漩涡:
            case 神之子.暴风制动_旋风:
            case 神之子.进阶暴风旋涡_旋涡:
            case 林之灵.生鲜龙卷风:
            case 林之灵.旋风飞行:
            case 隐月.招魂之幕:
            case 隐月.精灵化身:
            case 龙的传人.飞龙在天:
            case 龙的传人.龙魂流星拳:
            case 机械师.集中射击_SPLASH_F:
            case 剑豪.神速无双:
            case 阴阳师.猩猩火酒:
            case 品克缤.骨碌骨碌:
            case 品克缤.飞天跳跳杆:
            case 炎术士.龙奴:
                //case 炎术士.龙奴_最后一击:
                ret.charge = lea.readInt();
                break;
            case 夜行者.暗影大风车:
            case 夜行者.暗影大风车_爆炸:

                ret.charge = (int) lea.readLong();
                break;
            default:
                ret.charge = 0;
                break;
        }
        //神之子这个地方需要多1个
        if (JobConstants.is神之子(chr.getJob()) && ret.skillId >= 100000000) {
            ret.zeroUnk = lea.readByte();
        }
        lea.skip(1); // T071新增 未知
        ret.unk = lea.readByte();
        ret.display = lea.readByte(); //动作
        ret.direction = lea.readByte(); //方向
        lea.skip(4); // big bang
        lea.skip(1); // Weapon class
//        if (chr.getCygnusBless()) { //精灵的祝福
//            lea.skip(12); //3个相同的Int 
//        }
        ret.speed = lea.readByte(); //攻击速度
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        lea.skip(4); //四个00
        switch (ret.skillId) {
            case 战神.抗压:
            case 冲锋队长.能量获得:
            case 唤灵斗师.黑暗闪电:
            case 火毒.快速移动精通:
            case 冰雷.快速移动精通:
            case 主教.快速移动精通:
            case 龙神.快速移动精通:
            case 机械师.战争机器_泰坦:
            case 双刀.阿修罗:
            case 品克缤.品克缤之品格:
                break;
            case 夜行者.暗影大风车:
            case 夜行者.暗影大风车_爆炸:
            case 夜行者.影缝之术:
                lea.skip(4);
                ret.starSlot = lea.readShort();
                break;
            case 夜行者.黑暗领地:
                lea.skip(4);
                ret.starSlot = lea.readShort();
                lea.skip(4); //飞镖的ID信息
                break;
            case 新手.升级特效:
            case 品克缤.骨碌骨碌:
                lea.skip(4);
                break;
            default:
                if (GameConstants.isInflationSkill(ret.skillId)) {
                    if (energy) {
                        break;
                    } else {
                        lea.skip(1);
                    }
                }
                int linkskill = lea.readInt(); //四个00 有时是个技能ID
                if (linkskill > 0) {
                    lea.skip(1); //当 linkskill 大于 0 这个地方就要读1位
                }
                break;
        }
        ret.allDamage = new ArrayList<>();
        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        long maxDamagePerHit = chr.getMaxDamageOver(ret.skillId);
        boolean isOutput = false;
        for (int i = 0; i < ret.numAttacked; i++) {
            oid = lea.readInt(); // 怪物编号
            ret.ef = lea.readByte();
            lea.skip(19); //V.112修改 以前19
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < ret.numDamage; j++) {
                damage = lea.readInt(); //打怪的伤害
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "近距离攻击 - 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage);
                }
                if (damage > maxDamagePerHit * 1.5 || damage < 0 || oid <= 0) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(-5, "近距离攻击出错次数: 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 默认上限: " + maxDamagePerHit);
                    }
                    if (ServerConstants.isShowGMMessage()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 近距离攻击伤害异常。打怪伤害: " + damage + " 地图ID: " + chr.getMapId()));
                    }
                    if (!isOutput) {
                        isOutput = true;
                        FileoutputUtil.log(FileoutputUtil.攻击出错, "近距离攻击出错封包: 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 技能ID: " + ret.skillId + " 默认上限: " + maxDamagePerHit + lea.toString(true));
                    }
                }
                allDamageNumbers.add(new Pair<>(damage, false));
            }
//            chr.dropMessage(6, "暴击次数：" + critNum);
            lea.skip(8);
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        ret.position = lea.readPos();
        return ret;
    }

    /*
     * 解析远距离攻击
     */
    public static AttackInfo parseRangedAttack(LittleEndianAccessor lea, MapleCharacter chr) {
        //00 01 03 22 0A 51 00 07 00 B8 13 46 93 00 00 00 EB 02 39 2D B5 8C 0C 08 5A 52 B2 04 00 00 00 00 00 00 00 00 00 E0 00 4F 01
        AttackInfo ret = new AttackInfo();
        ret.isRangedAttack = true; //设置该攻击为远距离攻击
        lea.skip(2); //V.116.1新增
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (byte) ((ret.numAttackedAndDamage >>> 4) & 0xF); //攻击怪物数
        ret.numDamage = (byte) (ret.numAttackedAndDamage & 0xF); //攻击次数
        ret.skillId = lea.readInt(); //技能ID
        if (chr.isShowPacket()) {
            chr.dropSpouseMessage(0x19, "[远距离攻击] - 技能ID: " + ret.skillId + " 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage);
        }
        lea.skip(5);
        switch (ret.skillId) {
            case 神射手.暴风箭雨:
            case 神射手.箭矢炮盘:
            case 船长.金属风暴:
            case 船长.战船轰炸机:
            case 神炮王.猴子爆弹_爆炸:
            case 神炮王.猴子冲击波:
            case 风灵使者.风霜雪舞:
            case 风灵使者.天空之歌:
            case 豹弩游侠.奥义箭乱舞:
            case 豹弩游侠.奥义箭乱舞_美洲豹:
            case 双弩.伊师塔之环:
            case 爆莉萌天使.释世书:
            case 林之灵.旋风飞行:
            case 林之灵.编队攻击:
            case 夜行者.双飞斩:
            case 夜行者.三连环光击破:
            case 夜行者.三连环光击破_最后一击:
            case 夜行者.四连镖:
            case 夜行者.四连镖_最后一击:
            case 夜行者.五倍投掷:
            case 夜行者.五倍投掷_最后一击:
            case 龙的传人.连射:
            case 龙的传人.疾风连射:
            case 龙的传人.神龙连射:

                lea.skip(4); // extra 4 bytes
                break;
//            case 神箭手.箭矢炮盘_攻击:
//                lea.skip(10);
//                break;
        }
        //神之子这个地方需要多1个
        if (JobConstants.is神之子(chr.getJob()) && ret.skillId >= 100000000) {
            ret.zeroUnk = lea.readByte();
        }
        lea.skip(3);
        ret.charge = -1;
        ret.unk = lea.readByte();
        ret.display = lea.readByte(); //动作
        ret.direction = lea.readByte(); //方向
        if (ret.skillId == 神射手.箭矢炮盘 || ret.skillId == 船长.战船轰炸机 || ret.skillId == 船长.战船轰炸机_爆炸 || ret.skillId == 95001000) {
            lea.skip(8);
        } else if (ret.skillId == 神炮王.猴子爆弹_爆炸) {
            lea.skip(4);
        }
        lea.skip(4); // big bang
        lea.skip(1); // Weapon class
        switch (ret.skillId) {
            case 双弩.飞叶龙卷风:
            case 尖兵.战斗切换_分裂:
                lea.skip(12);
                break;
        }
//        if (chr.getCygnusBless()) { //精灵的祝福
//            lea.skip(12); //3个相同的Int 
//        }
        ret.speed = lea.readByte(); // 攻击速度
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        lea.skip(4); //0
        ret.starSlot = lea.readShort(); //消耗飞镖 子弹等等在消耗栏的位置
        ret.cashSlot = lea.readShort(); //飞镖 子弹等等的商城外形
        ret.AOE = lea.readByte(); // is AOE or not, TT/ Avenger = 41, Showdown = 0

        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<>();
        boolean isOutput = false;
        long maxDamagePerHit = chr.getMaxDamageOver(ret.skillId);
        for (int i = 0; i < ret.numAttacked; i++) {
            oid = lea.readInt();
            ret.ef = lea.readByte();
            lea.skip(19); //V.112修改 以前19
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < ret.numDamage; j++) {
                damage = lea.readInt();
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "远距离攻击 - 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage);
                }
                if (damage > maxDamagePerHit * 1.5 || damage < 0 || oid <= 0) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(-5, "远距离攻击出错次数: 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 默认上限: " + maxDamagePerHit);
                    }
                    if (ServerConstants.isShowGMMessage()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 远距离攻击伤害异常。打怪伤害: " + damage + " 地图ID: " + chr.getMapId()));
                    }
                    if (!isOutput) {
                        isOutput = true;
                        FileoutputUtil.log(FileoutputUtil.攻击出错, "远距离攻击出错封包: 打怪数量: " + ret.numAttacked + " 打怪次数: " + ret.numDamage + " 怪物ID " + oid + " 伤害: " + damage + " 技能ID: " + ret.skillId + " 默认上限: " + maxDamagePerHit + lea.toString(true));
                    }
                }
                allDamageNumbers.add(new Pair<>(damage, false));
            }
            lea.skip(8);
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        ret.position = lea.readPos(); //角色坐标
        if (lea.available() == 4) {
            ret.skillposition = lea.readPos(); //技能坐标
        }
        return ret;
    }

    /*
     * 解析金钱炸弹攻击
     */
    public static AttackInfo parseMesoExplosion(LittleEndianAccessor lea, AttackInfo ret, MapleCharacter chr) {
        //System.out.println(lea.toString(true));
        byte bullets;
        if (ret.numDamage == 0) { //金钱炸弹攻击怪物为0
            lea.skip(4); //角色坐标
            bullets = lea.readByte();
            for (int j = 0; j < bullets; j++) {
                int mesoid = lea.readInt();
                lea.skip(2); //00 00
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "金钱炸弹攻击怪物: 无怪 " + ret.numDamage + " 金币ID: " + mesoid);
                }
                ret.allDamage.add(new AttackPair(mesoid, null));
            }
            lea.skip(2); // 63 02 [00] 0个怪物
            return ret;
        }
        int oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        for (int i = 0; i < ret.numAttacked; i++) { //金钱炸弹攻击怪物大于0
            oid = lea.readInt();
            lea.skip(19); //以前是16
            bullets = lea.readByte();
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < bullets; j++) {
                int damage = lea.readInt();
                if (chr.isShowPacket()) {
                    chr.dropMessage(-5, "金钱炸弹攻击怪物: " + ret.numAttacked + " 攻击次数: " + bullets + " 打怪伤害: " + damage);
                }
                allDamageNumbers.add(new Pair<>(damage, false)); //m.e. never crits
            }
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
            lea.skip(8);
        }
        lea.skip(4); //角色坐标
        bullets = lea.readByte();
        for (int j = 0; j < bullets; j++) {
            int mesoid = lea.readInt();
            lea.skip(2); //01 00 
            if (chr.isShowPacket()) {
                chr.dropMessage(-5, "金钱炸弹攻击怪物: 有怪 " + bullets + " 金币ID: " + mesoid);
            }
            ret.allDamage.add(new AttackPair(mesoid, null));
        }
        //lea.skip(2);  // 8F 02/ 63 02
        return ret;
    }

    /*
     * 解析炎术士魔法攻击
     */
    public static AttackInfo parseWarLockMagicDamage(LittleEndianAccessor lea, MapleCharacter chr) {
        AttackInfo ret = new AttackInfo();
        ret.isMagicAttack = true; //设置该攻击为魔法攻击
        lea.skip(13);
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (byte) ((ret.numAttackedAndDamage >>> 4) & 0xF);
        ret.numDamage = (byte) (ret.numAttackedAndDamage & 0xF);
        ret.skillId = lea.readInt(); //技能ID
        lea.skip(6);
        if (GameConstants.isMagicChargeSkill(ret.skillId)) {
            ret.charge = lea.readInt();
        } else {
            ret.charge = -1;
        }
        lea.skip(1); // T071新增 未知
        ret.unk = lea.readByte();
        ret.display = lea.readByte(); //动作
        ret.direction = lea.readByte(); //方向
        lea.skip(4); // big bang
        lea.skip(1); // Weapon class
//        if (chr.getCygnusBless()) { //精灵的祝福
//            lea.skip(12); //3个相同的Int 
//        }
        ret.speed = lea.readByte(); //攻击速度
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        lea.skip(8); //0
        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<>();
        for (int i = 0; i < ret.numAttacked; i++) {
            oid = lea.readInt(); //怪物ID
            lea.skip(20); //V.112修改 以前19
            allDamageNumbers = new ArrayList<>();
            for (int j = 0; j < ret.numDamage; j++) {
                damage = lea.readInt(); //打怪伤害
                allDamageNumbers.add(new Pair<>(damage, false));
            }
            lea.skip(4); // 未知 [00 00 00 00]
            lea.skip(4); // CRC of monster [Wz Editing]
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers));
        }
        ret.position = lea.readPos();
        return ret;
    }
}
