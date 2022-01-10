package handling.channel.handler;

import client.*;
import client.anticheat.CheatingOffense;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.ModifyInventory;
import client.skills.KSPsychicSkillEntry;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.SkillMacro;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import configs.FishingConfig;
import constants.BattleConstants;
import constants.BattleConstants.PokemonAbility;
import constants.BattleConstants.PokemonMap;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.*;
import handling.RecvPacketOpcode;
import handling.channel.ChannelServer;
import org.apache.log4j.Logger;
import scripting.npc.NPCScriptManager;
import server.*;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.events.MapleSnowball.MapleSnowballs;
import server.life.MapleMonster;
import server.maps.*;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;
import tools.packet.*;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import tools.data.input.SeekableLittleEndianAccessor;

public class PlayerHandler {

    private static final Logger log = Logger.getLogger(PlayerHandler.class);

    public static int isFinisher(int skillid) {
        switch (skillid) {
            case 英雄.狂澜之力:
                return 1;
            case 英雄.恐慌:
                return 2;
            case 英雄.烈焰冲斩:
                return 4;
        }
        return 0;
    }

    public static void ChangeSkillMacro(LittleEndianAccessor slea, MapleCharacter chr) {
        int num = slea.readByte();
        String name;
        int shout, skill1, skill2, skill3;
        SkillMacro macro;

        for (int i = 0; i < num; i++) {
            name = slea.readMapleAsciiString();
            shout = slea.readByte();
            skill1 = slea.readInt();
            skill2 = slea.readInt();
            skill3 = slea.readInt();
            macro = new SkillMacro(skill1, skill2, skill3, name, shout, i);
            chr.updateMacros(i, macro);
        }
    }

    public static void ChangeKeymap(LittleEndianAccessor slea, MapleCharacter chr) {
        if (slea.available() > 8 && chr != null) { // else = pet auto pot
            slea.skip(4); //0
            int numChanges = slea.readInt();
            for (int i = 0; i < numChanges; i++) {
                int key = slea.readInt();
                byte type = slea.readByte();
                int action = slea.readInt();
                if (type == 1 && action >= 1000) { //0 = normal key, 1 = skill, 2 = item
                    Skill skil = SkillFactory.getSkill(action);
                    if (skil != null) { //not sure about aran tutorial skills..lol
                        if ((!skil.isFourthJob() && !skil.isBeginnerSkill() && skil.isInvisible() && chr.getSkillLevel(skil) <= 0) || GameConstants.isLinkedAttackSkill(action)) { //cannot put on a key
                            continue;
                        }
                    }
                }
                chr.changeKeybinding(key, type, action);
            }
        } else if (chr != null) {
            int type = slea.readInt(), data = slea.readInt();
            switch (type) {
                case 1: //自动加HP设置
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.HP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.HP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 2: //自动加MP设置
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.MP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.MP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 3: //自动加BUFF状态设置
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.BUFF_SKILL));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.BUFF_SKILL)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 4:
//                    chr.getClient().getSession().write(MaplePacketCreator.sendTestPacket("32 00 00 02 00 03 05 0B 00 00 05 0B 00 02 B0 CD 4F 00 01 AF 52 94 01 00 00 00 00 00 80 05 BB 46 E6 17 02 FF FF FF FF 01 00 00 00 00 00 00 00"));
                    break;
            }
        }
    }

    public static void UseChair(int itemId, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        Item toUse = chr.getInventory(MapleInventoryType.SETUP).findById(itemId);
        if (toUse == null) {
            chr.getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(itemId));
            return;
        }
        if (GameConstants.isFishingMap(chr.getMapId())) { //钓鱼用椅子
            if (!FishingConfig.FISHING_CHECK_CHAIR || itemId == FishingConfig.FISHING_CHAIR) {
                if (chr.getStat().canFish) {
                    chr.startFishingTask();
                }
            }
        }
        chr.setChair(itemId);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showChair(chr.getId(), itemId), false);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void CancelChair(short id, MapleClient c, MapleCharacter chr) {
        if (id == -1) { // Cancel Chair
            chr.cancelFishingTask();
            chr.setChair(0);
            c.getSession().write(MaplePacketCreator.cancelChair(chr.getId()));
            if (chr.getMap() != null) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.showChair(chr.getId(), 0), false);
            }
        } else { // Use In-Map Chair
            chr.setChair(id);
            c.getSession().write(MaplePacketCreator.cancelChair(id));
        }
    }

    /*
     * 使用缩地石
     */
    public static void TrockAddMap(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        byte type = slea.readByte();
        byte vip = slea.readByte(); //普通的是1 高级的是2 专属的是3
        if (type == 0x00) {
            int mapId = slea.readInt();
            if (vip == 0x01) {
                chr.deleteFromRegRocks(mapId);
            } else if (vip == 0x02) {
                chr.deleteFromRocks(mapId);
            } else if (vip == 0x03) {
                chr.deleteFromHyperRocks(mapId);
            }
            c.getSession().write(MTSCSPacket.getTrockRefresh(chr, vip, true));
        } else if (type == 0x01) {
            if (!FieldLimitType.VipRock.check(chr.getMap().getFieldLimit())) {
                if (vip == 0x01) {
                    chr.addRegRockMap();
                } else if (vip == 0x02) {
                    chr.addRockMap();
                } else if (vip == 0x03) {
                    chr.addHyperRockMap();
                }
                c.getSession().write(MTSCSPacket.getTrockRefresh(chr, vip, false));
            } else {
                chr.dropMessage(1, "你可能没有保存此地图.");
            }
        }
    }

    public static void CharInfoRequest(int objectid, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MapleCharacter player = null;
        if (objectid == 0) {
            player = chr.getMap().getCharacterById(chr.getId());
        } else {
            player = chr.getMap().getCharacterById(objectid);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
        if (player != null) {
            if (!player.isGM() || chr.isGM()) {
                c.getSession().write(MaplePacketCreator.charInfo(player, chr.getId() == objectid));
            }
        }
    }

    public static void AranCombo(MapleClient c, MapleCharacter chr, int toAdd) {
        if (chr != null && chr.getJob() >= 2000 && chr.getJob() <= 2112) {
            int combo = chr.getAranCombo();
            long currentTime = System.currentTimeMillis();
            if (combo > 0 && (currentTime - chr.getLastComboTime()) > 7000) {
                //combo = 0; //V.114.1取消 现在是每隔多久就减少1点
            }
            if (toAdd < 0 && combo <= 0) {
                return;
            }
            chr.gainAranCombo(toAdd, true);
            chr.setLastComboTime(currentTime);
            switch (combo) {
                case 10:
                case 20:
                case 30:
                case 40:
                case 50:
                case 60:
                case 70:
                case 80:
                case 90:
                case 100:
                    if (chr.getSkillLevel(战神.矛连击强化) >= (combo / 10)) {
                        SkillFactory.getSkill(战神.矛连击强化).getEffect(combo / 10).applyComboBuff(chr, combo);
                    }
                    break;
            }
        }
    }

    /*
     * 使用物品效果
     */
    public static void UseItemEffect(int itemId, MapleClient c, MapleCharacter chr) {
        if (itemId == 0) {
            chr.setItemEffect(0);
        } else {
            Item toUse = chr.getInventory(MapleInventoryType.CASH).findById(itemId); //现金栏道具
            if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (itemId != 5510000) { //原地复活术
                chr.setItemEffect(itemId);
            }
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.itemEffect(chr.getId(), itemId), false);
    }

    /*
     * 使用称号物品效果
     */
    public static void UseTitleEffect(int itemId, MapleClient c, MapleCharacter chr) {
        if (itemId == 0) {
            chr.setTitleEffect(0);
        } else {
            Item toUse = chr.getInventory(MapleInventoryType.SETUP).findById(itemId); //设置栏道具
            if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (itemId / 10000 == 370) {
                chr.setTitleEffect(itemId);
            }
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showTitleEffect(chr.getId(), itemId), false);
    }

    public static void CancelItemEffect(int id, MapleCharacter chr) {
        chr.cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(-id), false, -1);
    }

    public static void CancelBuffHandler(int sourceid, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        Skill skill = SkillFactory.getSkill(sourceid);
        if (chr.isShowPacket()) {
            chr.dropSpouseMessage(0x0A, "收到取消技能BUFF 技能ID " + sourceid + " 技能名字 " + SkillFactory.getSkillName(sourceid));
        }
        //如果技能为空就返回不做操作
        if (skill == null) {
            return;
        }
        if (skill.isRapidAttack()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillCancel(chr, sourceid), false);
        } else {
            chr.cancelEffect(skill.getEffect(1), false, -1);
        }
    }

    public static void CancelMech(LittleEndianAccessor slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        int sourceid = slea.readInt();
        if (sourceid % 10000 < 1000 && SkillFactory.getSkill(sourceid) == null) {
            sourceid += 1000;
        }
        Skill skill = SkillFactory.getSkill(sourceid);
        if (skill == null) { //not sure
            return;
        }
        if (sourceid == 唤灵斗师.黑暗闪电) {
            return;
        }
        if (skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillCancel(chr, sourceid), false);
        } else {
            chr.cancelEffect(skill.getEffect(slea.readByte()), false, -1);
        }
    }

    public static void QuickSlot(LittleEndianAccessor slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        chr.getQuickSlot().resetQuickSlot();
        for (int i = 0; i < 28; i++) {
            chr.getQuickSlot().addQuickSlot(i, slea.readInt());
        }
    }

    public static void SkillEffect(LittleEndianAccessor slea, MapleCharacter chr) {
        int skillId = slea.readInt(); //技能ID
        byte level = slea.readByte(); //技能等级
        byte display = slea.readByte(); //技能效果
        byte direction = slea.readByte(); //攻击方向
        byte speed = slea.readByte(); //速度
        Point position = null; //坐标
        if (slea.available() >= 4) {
            position = slea.readPos(); //技能坐标
        }

        Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(skillId));
        if (chr == null || skill == null || chr.getMap() == null) {
            return;
        }
        if (skill.isRapidAttack()) {
            chr.setKeyDownSkill_Time(System.currentTimeMillis());
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillEffect(chr.getId(), skillId, level, display, direction, speed, position), false);
        }
    }

    /*
     * 特殊攻击效果
     */
    public static void specialAttack(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int pos_x = slea.readInt();
        int pos_y = slea.readInt();
//        int pos_unk = slea.readInt();
        slea.skip(4);
        int display = slea.readInt(); //延时 默认好像都是800
        int skillId = slea.readInt(); //技能ID
        slea.skip(4);
        boolean isLeft = slea.readByte() > 0; //攻击方向 1 = 左边 0 = 右边
        int speed = slea.readInt(); //速度
        int tickCount = slea.readInt(); //貌似这个数字是增长的
        Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(skillId));
        int skilllevel = chr.getTotalSkillLevel(skill);
        if (chr.isShowPacket()) {
            System.err.println("specialAttack - 技能ID: " + skillId + " 技能等级: " + skilllevel);
        }
        if (skill == null || skilllevel <= 0) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillId, 1, chr.getLevel(), skilllevel), false);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showSpecialAttack(chr.getId(), tickCount, pos_x, pos_y, display, skillId, skilllevel, isLeft, speed), chr.getTruePosition());
    }

    public static void SpecialMove(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null || slea.available() < 9) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        slea.skip(4); // Old X and Y
        int skillid = slea.readInt();
        if (skillid == 双弩.精灵骑士) { //需要随机召唤1个骑士 精灵骑士 - 23111008 , 精灵骑士1 - 23111009 , 精灵骑士2 - 23111010
            skillid += Randomizer.nextInt(3);
        } else if (skillid == 船长.集合船员) { //需要随机召唤船员 集合船员 - 5210015 , 集合船员1 - 5210016 , 集合船员2 - 5210017, 集合船员2 - 5210018
            skillid += Randomizer.nextInt(4);
        }
        if (JobConstants.is神之子(chr.getJob()) && skillid >= 100000000) {
            slea.readByte(); //神之子要多1位
        }
        int skillLevel = slea.readByte();
        if (chr.isShowPacket()) {
            System.err.println("[特殊移动] - 技能ID: " + skillid + " 技能等级: " + skillLevel);
        }
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null || (GameConstants.is天使祝福戒指(skillid) && (chr.getStat().equippedSummon % 10000) != (skillid % 10000)) || (chr.inPVP() && skill.isPVPDisabled())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.checkSoulWeapon() && skill.getId() == chr.getEquippedSoulSkill()) {
            chr.checkSoulState(true);
        }
        int checkSkilllevel = chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillid));
        if (chr.isShowPacket()) {
            chr.dropSpouseMessage(0x19, "[特殊移动] - 技能ID: " + skillid + " 技能等级: " + skillLevel);
            if (GameConstants.getLinkedAttackSkill(skillid) != skillid && !skill.isInvisible()) {
                chr.dropSpouseMessage(0x19, "[特殊移动] - 连接技能ID: " + GameConstants.getLinkedAttackSkill(skillid) + " 连接技能等级: " + checkSkilllevel);
            }
        }
        if ((checkSkilllevel <= 0 || checkSkilllevel != skillLevel) && !skill.isInvisible()) {
            if (!GameConstants.isMulungSkill(skillid) && !GameConstants.isPyramidSkill(skillid) && checkSkilllevel <= 0) {
                if (chr.isAdmin()) {
                    chr.dropSpouseMessage(0x19, "[特殊移动] 使用技能出现异常 技能ID: " + skillid + " 角色技能等级: " + checkSkilllevel + " 封包获取等级: " + skillLevel + " 是否相同: " + (checkSkilllevel == skillLevel));
                }
                FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skillid + " 技能等级: " + checkSkilllevel + " - " + !GameConstants.isMulungSkill(skillid) + " - " + !GameConstants.isPyramidSkill(skillid) + " 封包:" + slea.toString(true));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (GameConstants.isMulungSkill(skillid)) {
                if (chr.getMapId() / 10000 != 92502) {
                    //AutobanManager.getInstance().autoban(c, "Using Mu Lung dojo skill out of dojo maps.");
                    return;
                } else {
                    if (chr.getMulungEnergy() < 10000) {
                        return;
                    }
                    chr.mulung_EnergyModify(false);
                }
            } else if (GameConstants.isPyramidSkill(skillid)) {
                if (chr.getMapId() / 10000 != 92602 && chr.getMapId() / 10000 != 92601) {
                    //AutobanManager.getInstance().autoban(c, "Using Pyramid skill out of pyramid maps.");
                    return;
                }
            }
        }
        if (GameConstants.isEventMap(chr.getMapId())) {
            for (MapleEventType t : MapleEventType.values()) {
                MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                if (e.isRunning() && !chr.isGM()) {
                    for (int i : e.getType().mapids) {
                        if (chr.getMapId() == i) {
                            chr.dropMessage(5, "无法在这里使用.");
                            return; //non-skill cannot use
                        }
                    }
                }
            }
        }
        skillLevel = chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillid));
        MapleStatEffect effect = chr.inPVP() ? skill.getPVPEffect(skillLevel) : skill.getEffect(skillLevel);
        if (effect.getCooldown(chr) > 0 && !chr.isGM()) {
            if (chr.skillisCooling(skillid)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (skillid != 机械师.磁场) {
                c.getSession().write(MaplePacketCreator.skillCooldown(skillid, effect.getCooldown(chr)));
                chr.addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown(chr) * 1000);
            }
        }
        //chr.checkFollow(); //not msea-like but ALEX'S WISHES
        switch (skillid) {
            case 9001020: // GM magnet
            case 9101020:
            case 恶魔猎手.血腥渡鸦:
                byte number_of_mobs = slea.readByte();
                slea.skip(3);
                for (int i = 0; i < number_of_mobs; i++) {
                    int mobId = slea.readInt();
                    MapleMonster mob = chr.getMap().getMonsterByOid(mobId);
                    if (mob != null) {
                        //chr.getMap().broadcastMessage(chr, MaplePacketCreator.showMagnet(mobId, slea.readByte()), chr.getTruePosition());
                        mob.switchController(chr, mob.isControllerHasAggro());
                        mob.applyStatus(chr, new MonsterStatusEffect(MonsterStatus.眩晕, 1, skillid, null, false, 0), false, effect.getDuration(), true, effect);
                    }
                }
                chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillid, 1, chr.getLevel(), skillLevel, slea.readByte()), chr.getTruePosition());
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 预备兵.捕获: //capture
                int mobID = slea.readInt();
                MapleMonster mob = chr.getMap().getMonsterByOid(mobID);
                if (mob != null) {
                    boolean success = mob.getHp() <= mob.getMobMaxHp() / 2 && mob.getId() >= 9304000 && mob.getId() < 9305000;
                    chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillid, 1, chr.getLevel(), skillLevel, (byte) (success ? 1 : 0)), chr.getTruePosition());
                    if (success) {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAGUAR)).setCustomData(String.valueOf((mob.getId() % 10 + 1) * 10));
                        chr.getMap().killMonster(mob, chr, true, false, (byte) 1);
                        chr.cancelEffectFromBuffStat(MapleBuffStat.骑兽技能);
                        c.getSession().write(MobPacket.showResults(mobID, true));
                        c.getSession().write(MaplePacketCreator.updateJaguar(chr));
                    } else {
                        chr.dropMessage(5, "怪物体力过高，捕抓失败。");
                        c.getSession().write(MobPacket.showResults(mobID, false));
                    }
                }
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 预备兵.猎人的召唤: //hunter call
                chr.dropMessage(5, "没有能被召唤的怪物，请先捕抓怪物。"); //lool
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 夜光.太阳火焰:
            case 夜光.月蚀:
            case 夜光.记录:
                chr.changeLuminousMode(skillid);
                break;
            case 夜光.光明黑暗模式转换:
            case 夜光.平衡_光明:
            case 夜光.平衡_黑暗:
                chr.dropMessage(5, "当前暂不支持该功能.");
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 炎术士.火焰传动:
                chr.handle火焰传动();
                c.getSession().write(MaplePacketCreator.flameMark());
                break;
            case 尖兵.精准火箭: {
                byte mobCount = slea.readByte();
                for (int i = 0; i < mobCount; i++) {
                    int mobId = slea.readInt();
                    MapleMonster mobx = chr.getMap().getMonsterByOid(mobId);
                    if (mobx != null) {
                        chr.handleCardStack(mobId, skillid);
                    }
                    if (chr.isShowPacket()) {
                        chr.dropMessage(5, "精准火箭 - " + i + " oldId: " + mobId + " 技能ID: " + skillid);
                    }
                }
                break;
            }
            case 爆莉萌天使.灵魂汲取: {
                slea.readInt(); //好像是这个坐标信息
                byte mobCount = slea.readByte(); //怪物数量
                List<Integer> moboids = new ArrayList<>();
                for (int i = 0; i < mobCount; i++) {
                    moboids.add(slea.readInt());
                }
                if (moboids.size() == mobCount) {
                    chr.getSpecialStat().gainForceCounter();
                    c.getSession().write(MaplePacketCreator.灵魂吸取精髓(chr.getId(), 爆莉萌天使.灵魂汲取_攻击, chr.getSpecialStat().getForceCounter(), moboids, 4));
                    chr.getSpecialStat().gainForceCounter(4);
                }
                effect.applyTo(chr);
                break;
            }
            case 4341003: // 双刀.怪物炸弹 monster bomb
                chr.setKeyDownSkill_Time(0);
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillCancel(chr, skillid), false);
                break;
            case 机械师.辅助导弹:
            case 机械师.导航辅助导弹:
            case 恶魔复仇者.追击盾:
                if (skillid == 恶魔复仇者.追击盾) {
                    slea.skip(4);//pos
                }
                byte mobCount = slea.readByte();
                List<Integer> moboids = new ArrayList<>();
                for (int i = 0; i < mobCount; i++) {
                    moboids.add(slea.readInt());
                }
                if (skillid == 恶魔复仇者.追击盾) {
                    int delay = slea.readShort();
                    chr.getMap().broadcastMessage(MaplePacketCreator.ShieldChacing(chr.getId(), moboids, 恶魔复仇者.追击盾_攻击, effect.getAttackCount(chr), delay), chr.getTruePosition());
                } else if (moboids.size() == mobCount) {
                    chr.getMap().broadcastMessage(MaplePacketCreator.ShieldChacing(chr.getId(), skillid, chr.getSpecialStat().getForceCounter(), moboids, effect.getZ()), chr.getTruePosition());
                }
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            default:
                Point pos = null;
                if (slea.available() > 4) {
                    pos = slea.readPos();
                }
                if (effect.is时空门()) {
                    if (!FieldLimitType.MysticDoor.check(chr.getMap().getFieldLimit())) {
                        effect.applyTo(c.getPlayer(), pos);
                    } else {
                        c.getSession().write(MaplePacketCreator.enableActions());
                    }
                } else {
                    int mountid = MapleStatEffect.parseMountInfo(c.getPlayer(), skill.getId());
                    if (mountid != 0 && mountid != GameConstants.getMountItem(skill.getId(), chr) && !chr.isIntern() && chr.getBuffedValue(MapleBuffStat.骑兽技能) == null && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -122) == null) {
                        if (!GameConstants.isMountItemAvailable(mountid, chr.getJob())) {
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                    }
                    //双胞胎猴子支援 是召唤2个出来攻击
                    if (effect.getSourceId() == 神炮王.双胞胎猴子支援) {
                        effect.applyTo(chr, pos); //召唤出第1个召唤兽
                        effect = SkillFactory.getSkill(神炮王.双胞胎猴子支援_1).getEffect(skillLevel); //第2个召唤兽处理
                        if (pos != null) {
                            pos.x -= 90;
                        }
                        if (effect != null) {
                            effect.applyTo(chr, pos);
                        }
                    } else if (effect.is集合船员()) {
                        effect.applyTo(chr, pos); //先给角色第1个召唤兽BUFF状态
                        List<Integer> skillIds = new ArrayList<>();
                        for (int i = 5210015; i <= 5210018; i++) {
                            if (i != effect.getSourceId()) {
                                skillIds.add(i);
                            }
                        }
                        skillid = skillIds.get(Randomizer.nextInt(skillIds.size()));
                        effect = SkillFactory.getSkill(skillid).getEffect(skillLevel); //第2个召唤兽处理
                        if (pos != null) {
                            pos.x -= 90;
                        }
                        if (effect != null) {
                            effect.applyTo(chr, pos);
                        }
                    } else {
                        effect.applyTo(chr, pos);
                    }
                }
                break;
        }
    }

    public static void absorbingDF(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int size = slea.readInt();
        int skillid = slea.readInt();
        int oid = slea.readInt();

        switch (skillid) {
            case 0: {
                if (JobConstants.is恶魔猎手(chr.getJob())) {
                    int revdf = chr.getSpecialStat().removeForceCounter(oid);
                    if (revdf > 0) {
                        chr.addMP(revdf, true);
                    }
                }
                break;
            }
            case 恶魔复仇者.追击盾_攻击: {
                slea.skip(1);
                int oldmobid = slea.readInt();
                int time = slea.readInt();
                int newmobid = slea.readInt();
                MapleStatEffect effect = SkillFactory.getSkill(skillid).getEffect(chr.getTotalSkillLevel(skillid));
                if (oid <= effect.getZ()) {
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.ShieldChacingRe(c.getPlayer().getId(), oldmobid, newmobid, oid), chr.getTruePosition());
                }
                break;
            }
            case 夜行者.影子蝙蝠_攻击: {
                for (int i = 0; i < size; i++) {
                    //进行再次的分裂
                    int oldmobid = slea.readInt();
                    slea.skip(1);
                    int newmobid = slea.readInt();//怪物Oid
                    int Tiem = slea.readInt();//Tiem
                    MapleMonster mob = chr.getMap().getMonsterByOid(oid);
                    if (mob != null) {
                        chr.getSpecialStat().gainForceCounter();
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.Show影子蝙蝠_分裂(chr.getId(), 14000029, mob.getId(), 1, mob.getTruePosition(), Tiem, chr.getSpecialStat().getForceCounter()), chr.getTruePosition());
                        chr.getSpecialStat().gainForceCounter(1);
                    }
                    //int revdf = chr.getSpecialStat().removeForceCounter(oid);
                }
                chr.removeSummon(夜行者.影子蝙蝠_召唤兽);
                break;
            }
            default:
        }
    }

    /**
     * 处理所有类型的"攻击"封包
     *
     * @param slea
     * @param c
     * @param header
     */
    public static void attackProcessing(LittleEndianAccessor slea, MapleClient c, RecvPacketOpcode header) {
        MapleCharacter chr = c.getPlayer();
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!chr.isAdmin() && chr.getMap().isMarketMap()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getGMLevel() >= 3 && chr.getGMLevel() <= 5 && chr.getMap().isBossMap()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        switch (header) {
            case CLOSE_RANGE_ATTACK://近距离攻击
                PlayerHandler.closeRangeAttack(slea, c, chr);
                break;
            case RANGED_ATTACK://远距离攻击
                PlayerHandler.rangedAttack(slea, c, chr);
                break;
            case MAGIC_ATTACK://魔法攻击
                PlayerHandler.MagicDamage(slea, c, chr);
                break;
            case SUMMON_ATTACK://召唤兽攻击
                SummonHandler.SummonAttack(slea, c, chr);
                break;
            case PASSIVE_ENERGY:
                PlayerHandler.passiveRangeAttack(slea, c, chr);
                break;
        }
        chr.monsterMultiKill();
    }

    /**
     * 玩家近距离攻击怪物
     *
     * @param slea
     * @param c
     * @param chr
     */
    public static void closeRangeAttack(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        PlayerHandler.closeRangeAttack(slea, c, chr, false);
    }

    /**
     * 某些情况下玩家被动近距离攻击.例如:怪物主动攻击某个玩家导致触发该玩家的某个被动攻击技能来还击该怪物
     *
     * @param slea
     * @param c
     * @param chr
     */
    public static void passiveRangeAttack(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        PlayerHandler.closeRangeAttack(slea, c, chr, true);
    }

    /**
     * 玩家近距离攻击怪物
     *
     * @param slea
     * @param c
     * @param chr
     * @param energy
     */
    public static void closeRangeAttack(LittleEndianAccessor slea, MapleClient c, final MapleCharacter chr, final boolean energy) {

        AttackInfo attack = DamageParse.parseCloseRangeAttack(slea, chr, energy);
        if (attack == null) {
            chr.dropMessage(5, "攻击错误，请联系管理员！");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        boolean mirror = chr.getBuffedValue(MapleBuffStat.影分身) != null;
        boolean hasMoonBuff = chr.getBuffedIntValue(MapleBuffStat.月光转换) == 1 || chr.getBuffedValue(MapleBuffStat.蓝血) != null;
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage();
        Item shield = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        int attackCount = (shield != null && shield.getItemId() / 10000 == 134 ? 2 : 1);
        int skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;

        if (attack.skillId != 0) {
            if (chr.checkSoulWeapon() && attack.skillId == chr.getEquippedSoulSkill()) {
                chr.checkSoulState(true);
            }
            skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(attack.skillId));
            if (skill == null || (GameConstants.is天使祝福戒指(attack.skillId) && (chr.getStat().equippedSummon % 10000) != (attack.skillId % 10000))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            skillLevel = chr.getTotalSkillLevel(skill);
            effect = attack.getAttackEffect(chr, skillLevel, skill);
            if (effect == null || skillLevel < 0) {
                FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "近距离攻击效果为空 玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等级: " + skillLevel);
                return;
            }
            if (JobConstants.is恶魔复仇者(chr.getJob())) {
                chr.handle超越状态(attack.skillId);
            }
            if (GameConstants.isEventMap(chr.getMapId())) {
                for (MapleEventType t : MapleEventType.values()) {
                    final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                    if (e.isRunning() && !chr.isGM()) {
                        for (int i : e.getType().mapids) {
                            if (chr.getMapId() == i) {
                                chr.dropMessage(5, "无法在这个地方使用.");
                                return; //non-skill cannot use
                            }
                        }
                    }
                }
            }
            if (attack.skillId == 黑骑士.神枪降临) {
                maxdamage += chr.getStat().getCurrentMaxHp();
            }
            if (attack.skillId == 隐士.刺客标记_飞镖 || attack.skillId == 隐士.隐士标记_飞镖) {
                maxdamage *= (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skillId) + effect.getX() * chr.getLevel()) / 100.0;
            } else {
                maxdamage *= (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skillId)) / 100.0;
            }
            attackCount = effect.getAttackCount(chr); //攻击怪物的次数
            boolean notCooldown = attack.skillId == 恶魔猎手.黑暗变形 || attack.skillId == 狂龙战士.剑刃之壁 || attack.skillId == 狂龙战士.进阶剑刃之壁;
            int cooldownTime = effect.getCooldown(chr);
//            if (chr.getBuffedValue(MapleBuffStat.重生契约) != null) {
//                notCooldown = true;
//            }
            if (attack.skillId == 黑骑士.神枪降临 && chr.getBuffedValue(MapleBuffStat.重生契约) != null) {
                notCooldown = true;
            }
            if ((attack.skillId == 奇袭者.疾风 || attack.skillId == 奇袭者.台风) && chr.getBuffedValue(MapleBuffStat.开天辟地) != null) {
                notCooldown = true;
            }
            if (!energy && !notCooldown && cooldownTime > 0) {
                if (chr.skillisCooling(attack.skillId) && !skill.isChargeSkill() && GameConstants.isSkillTiem(attack.skillId)) {
                    chr.dropMessage(5, "技能由于冷却时间限制，暂时无法使用。");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                } else if (!chr.isAdmin() && !chr.skillisCooling(attack.skillId)) {
                    c.getSession().write(MaplePacketCreator.skillCooldown(attack.skillId, cooldownTime));
                    chr.addCooldown(attack.skillId, System.currentTimeMillis(), cooldownTime * 1000);
                }
            }
            if (attack.skillId == 奇袭者.毁灭) {
                attackCount += Math.min(chr.getBuffedIntValue(MapleBuffStat.百分比无视防御) / 5, chr.getStat().raidenCount); //最大是5次 取最小值
            } else if (attack.skillId == 奇袭者.疾风) {
                effect.applyTo(chr);
            }
        }
        attack = DamageParse.Modify_AttackCrit(attack, chr, 1, effect);
        attackCount *= (mirror ? 2 : 1);
        attackCount *= (hasMoonBuff ? 2 : 1);
        if (!energy) {
            if ((chr.getMapId() == 109060000 || chr.getMapId() == 109060002 || chr.getMapId() == 109060004) && attack.skillId == 0) {
                MapleSnowballs.hitSnowball(chr);
            }
            // 处理斗气减少设置
            int numFinisherOrbs = 0;
            Integer comboBuff = chr.getBuffedValue(MapleBuffStat.斗气集中);
            if (isFinisher(attack.skillId) > 0) {
                if (comboBuff != null) {
                    numFinisherOrbs = comboBuff - 1;
                }
                if (numFinisherOrbs <= 0) {
                    return;
                }
                chr.handleOrbconsume(isFinisher(attack.skillId));
                maxdamage *= numFinisherOrbs;
            }
        }
        chr.checkFollow();
        if (!SkillFactory.isBlockedSkill(attack.skillId)) {
            if (attack.skillId != 新手.升级特效) {
                if (!chr.isHidden()) {
                    chr.getMap().broadcastMessage(chr, MaplePacketCreator.closeRangeAttack(chr, skillLevel, 0, attack, energy, hasMoonBuff), chr.getTruePosition());
                } else {
                    chr.getMap().broadcastGMMessage(chr, MaplePacketCreator.closeRangeAttack(chr, skillLevel, 0, attack, energy, hasMoonBuff), false);
                }
            }
        }
        DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, maxdamage, effect, mirror ? AttackType.影分身近距离 : AttackType.近距离攻击, 0);
    }

    public static void rangedAttack(LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        /* 解析远程攻击 */
        AttackInfo attack = DamageParse.parseRangedAttack(slea, chr);
        if (attack == null) {
            if (chr.isShowPacket()) {
                chr.dropSpouseMessage(0x19, "[远距离攻击] - 远距离攻击封包解析返回为空.");
            }
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        /* 初始化子弹数量和技能等级信息 */
        int bulletCount = 1, skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;

        /* 判断是否需要消耗子弹 */
        boolean noBullet = attack.starSlot == 0 || JobConstants.noBulletJob(chr.getJob());

        /* 判断攻击的技能是否为普通攻击 */
        if (attack.skillId != 0) {
            skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(attack.skillId));
            /* 获取技能数据 */
            if (skill == null || (GameConstants.is天使祝福戒指(attack.skillId) && (chr.getStat().equippedSummon % 10000) != (attack.skillId % 10000))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            /* 获取技能等级信息 */
            skillLevel = chr.getTotalSkillLevel(skill);
            /* 获取技能攻击效果信息 */
            effect = attack.getAttackEffect(chr, skillLevel, skill);
            if (effect == null) {
                FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "远距离攻击效果为空 玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等级: " + skillLevel);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            /* 检测角色当前是否处于活动地图 */
            if (GameConstants.isEventMap(chr.getMapId())) {
                for (MapleEventType eventType : MapleEventType.values()) {
                    MapleEvent event = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(eventType);
                    if (event.isRunning() && !chr.isGM()) {
                        for (int i : event.getType().mapids) {
                            if (chr.getMapId() == i) {
                                chr.dropMessage(5, "无法在这个地方使用.");
                                return; //non-skill cannot use
                            }
                        }
                    }
                }
            }
            /* 如果当前技能所需的子弹数量大于或等于当前角色的攻击次数，那么最终按技能所需的子弹数量赋值 */
            bulletCount = Math.max(effect.getBulletCount(chr), effect.getAttackCount(chr));

            /* 处理影子蝙蝠 */
//            int currentBat = 0;
//            for (MapleSummon summon : c.getPlayer().getSummons().values()) {
//                if (summon.getSkill() == 14000027) {
//                    currentBat++;
//                }
//            }
//            if (JobConstants.is夜行者(chr.getJob()) && chr.getSkillLevel(14000027) > 0 && attack.numAttacked > 0) {
//                if (currentBat > 0) { //&& Randomizer.rand(0, 100) <= 50) { //50%
//                    final List<MapleMapObject> monstersInRange = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 1000000.0, Arrays.asList(MapleMapObjectType.MONSTER));
//                    List<MapleMonster> monsters = new ArrayList<>();
//                    for (int i = 0; i < monstersInRange.size(); i++) {
//                        if (monstersInRange.get(i).getObjectId() != attack.allDamage.get(i).objectid) {
//                            monsters.add((MapleMonster) monstersInRange.get(i));
//                        }
//                    }
//                    if (monstersInRange.size() > 0) {
//                        int random = Randomizer.rand(0, monstersInRange.size());
//                        monstersInRange.remove(random);
//                    }
//                    for (int count = 0; count < attack.numDamage; count++) {
//                        if (chr.getBatCount() <= 2) {
//                            if (chr.getHitCountBat() >= 3) {
//                                chr.setHitCountBat(0);
//                                SkillFactory.getSkill(14000027).getEffect(chr.getSkillLevel(14000027)).applyTo(chr, chr.getPosition());
//                                chr.setBatCount(chr.getBatCount() + 1);
//                            } else {
//                                chr.setHitCountBat(chr.getHitCountBat() + 1);
//                            }
//                        }
//                    }
//                }
//                if (currentBat < 3) {
//                    MapleStatEffect batskill = SkillFactory.getSkill(14000027).getEffect(chr.getSkillLevel(14000027));
//                    MapleSummon summon = new MapleSummon(chr, 14000027, 1, chr.getPosition(), batskill.getSummonMovementType());
//                    chr.getMap().spawnSummon(summon);
//                }
//            }

            /* 处理技能冷却时间 */
            int cooldownTime = effect.getCooldown(chr);
            if (cooldownTime > 0) {
                if (chr.skillisCooling(attack.skillId)) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                c.getSession().write(MaplePacketCreator.skillCooldown(attack.skillId, cooldownTime));
                chr.addCooldown(attack.skillId, System.currentTimeMillis(), cooldownTime * 1000);
            }
        }
        /* 狂风肆虐 */
        if (JobConstants.is风灵使者(chr.getJob())) {
            chr.handle狂风肆虐();
        }

        /* 处理暴击伤害数据 */
        attack = DamageParse.Modify_AttackCrit(attack, chr, 2, effect);

        /* 判断角色是否有分身状态 */
        boolean mirror = chr.getBuffedValue(MapleBuffStat.影分身) != null;

        /* 如果角色存在分身状态，那么攻击时子弹的消耗将是平时的2倍 */
        bulletCount *= (mirror ? 2 : 1);

        /* 定义飞镖 和飞镖的外观状态 */
        int projectile = 0, visProjectile = 0;

        /* 如果当前角色是需要消耗子弹或箭矢，且角色特定的状态是否为空 */
        if (!noBullet && chr.getBuffedValue(MapleBuffStat.无形箭弩) == null && !JobConstants.is幻影(chr.getJob())) {
            Item item = chr.getInventory(MapleInventoryType.USE).getItem(attack.starSlot);
            if (item == null) {
                return;
            }
            projectile = item.getItemId();
            if (attack.cashSlot > 0) {
                if (chr.getInventory(MapleInventoryType.CASH).getItem(attack.cashSlot) == null) {
                    return;
                }
                visProjectile = chr.getInventory(MapleInventoryType.CASH).getItem(attack.cashSlot).getItemId();
            } else {
                visProjectile = projectile;
            }
            // Handle bulletcount
            if (chr.getBuffedValue(MapleBuffStat.暗器伤人) == null) {
                int bulletConsume = bulletCount;
                if (effect != null && effect.getBulletConsume() != 0) {
                    bulletConsume = effect.getBulletConsume() * (mirror ? 2 : 1);
                }
                if (chr.getJob() == 412 && bulletConsume > 0 && item.getQuantity() < MapleItemInformationProvider.getInstance().getSlotMax(projectile)) {
                    Skill expert = SkillFactory.getSkill(隐士.娴熟飞镖术);
                    if (chr.getTotalSkillLevel(expert) > 0) {
                        MapleStatEffect eff = expert.getEffect(chr.getTotalSkillLevel(expert));
                        if (eff.makeChanceResult()) {
                            item.setQuantity((short) (item.getQuantity() + 1));
                            c.getSession().write(InventoryPacket.modifyInventory(false, Collections.singletonList(new ModifyInventory(1, item))));
                            bulletConsume = 0; //regain a star after using
                            c.getSession().write(InventoryPacket.getInventoryStatus());
                        }
                    }
                }
                if (bulletConsume > 0) {
                    boolean useItem = true;
                    if (chr.getBuffedValue(MapleBuffStat.子弹数量) != null) {
                        int count = chr.getBuffedIntValue(MapleBuffStat.子弹数量) - bulletConsume;
                        if (count >= 0) {
                            chr.setBuffedValue(MapleBuffStat.子弹数量, count); //设置BUFF状态的子弹数量
                            useItem = false;
                        } else {
                            chr.cancelEffectFromBuffStat(MapleBuffStat.子弹数量); //取消当前的BUFF状态
                            bulletConsume += count; //由于这个是 负数 所以要 加
                        }
                    }
                    //不满足上面的条件 就消耗角色背包的子弹数量
                    if (useItem && !MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true)) {
                        chr.dropMessage(5, "您的箭/子弹/飞镖不足。");
                        return;
                    }
                }
            }
        } else if (chr.getJob() >= 3500 && chr.getJob() <= 3512) {
            visProjectile = 2333000;
        } else if (JobConstants.is火炮手(chr.getJob())) {
            visProjectile = 2333001;
        }
        double basedamage;
        int projectileWatk = 0;
        if (projectile != 0) {
            projectileWatk = MapleItemInformationProvider.getInstance().getWatkForProjectile(projectile);
        }
        //System.out.println("飞镖攻击: " + projectileWatk + " 飞镖ID: " + projectile);
        PlayerStats statst = chr.getStat();
        //System.out.println("自身攻击 : " + statst.getCurrentMaxBaseDamage() + " 加成: " + statst.calculateMaxProjDamage(projectileWatk, chr));
        basedamage = statst.getCurrentMaxBaseDamage() + statst.calculateMaxProjDamage(projectileWatk, chr);
        //System.out.println("合计攻击: " + basedamage);
        switch (attack.skillId) {
            case 神射手.爆炸箭:
                if (effect != null) {
                    basedamage *= effect.getX() / 100.0;
                }
                break;
        }
        if (effect != null) {
            basedamage *= (effect.getDamage() + statst.getDamageIncrease(attack.skillId)) / 100.0;
            long money = effect.getMoneyCon();
            if (money != 0) {
                if (money > chr.getMeso()) {
                    money = chr.getMeso();
                }
                chr.gainMeso(-money, false);
            }
        }
        chr.checkFollow();
        if (chr.isShowPacket()) {
            chr.dropSpouseMessage(0x19, "[远距离攻击] - 是否禁止显示给其他玩家: " + SkillFactory.isBlockedSkill(attack.skillId));
        }
        if (!SkillFactory.isBlockedSkill(attack.skillId)) {
            if (chr.isShowPacket()) {
                chr.dropSpouseMessage(0x19, "[远距离攻击] - 显示给其他玩家... ");
            }
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.rangedAttack(chr, skillLevel, visProjectile, attack), chr.getTruePosition());
            } else {
                chr.getMap().broadcastGMMessage(chr, MaplePacketCreator.rangedAttack(chr, skillLevel, visProjectile, attack), false);
            }
        }
        DamageParse.applyAttack(attack, skill, chr, bulletCount, basedamage, effect, mirror ? AttackType.影分身远距离 : AttackType.远距离攻击, visProjectile);
    }

    public static void MagicDamage(LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {

        AttackInfo attack = DamageParse.parseMagicDamage(slea, chr);
        if (attack == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(attack.skillId));
        if (skill == null || (GameConstants.is天使祝福戒指(attack.skillId) && (chr.getStat().equippedSummon % 10000) != (attack.skillId % 10000))) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final int skillLevel = chr.getTotalSkillLevel(skill);
        final MapleStatEffect effect = attack.getAttackEffect(chr, skillLevel, skill);
        if (effect == null) {
            FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "魔法攻击效果为空 玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等级: " + skillLevel);
            return;
        }
        attack = DamageParse.Modify_AttackCrit(attack, chr, 3, effect);
        if (GameConstants.isEventMap(chr.getMapId())) {
            for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                if (e.isRunning() && !chr.isGM()) {
                    for (int i : e.getType().mapids) {
                        if (chr.getMapId() == i) {
                            chr.dropMessage(5, "无法在这个地方使用.");
                            return; //non-skill cannot use
                        }
                    }
                }
            }
        }
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage() * (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skillId)) / 100.0;
        if (GameConstants.isPyramidSkill(attack.skillId)) {
            maxdamage = 1;
        } else if (JobConstants.is新手职业(skill.getId() / 10000) && skill.getId() % 10000 == 1000) {
            maxdamage = 40;
        }
        boolean notCooldown = attack.skillId == 超能力者.心魂吸收 || attack.skillId == 超能力者.终极_BPM;
        int cooldownTime = effect.getCooldown(chr);
        if (!notCooldown && cooldownTime > 0) {
            if (chr.skillisCooling(attack.skillId)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getSession().write(MaplePacketCreator.skillCooldown(attack.skillId, cooldownTime));
            chr.addCooldown(attack.skillId, System.currentTimeMillis(), cooldownTime * 1000);
        }
        chr.checkFollow();
        if (!SkillFactory.isBlockedSkill(attack.skillId)) {
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.magicAttack(chr, skillLevel, 0, attack), chr.getTruePosition());
            } else {
                chr.getMap().broadcastGMMessage(chr, MaplePacketCreator.magicAttack(chr, skillLevel, 0, attack), false);
            }
        }
        DamageParse.applyAttackMagic(attack, skill, c.getPlayer(), effect, maxdamage);
    }

    public static void WarLockMagicDamage(LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null) {
            return;
        }
        if (chr.getGMLevel() >= 3 && chr.getGMLevel() <= 5 && chr.getMap().isBossMap()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        /*
         * 角色不是最高管理员
         * 角色地图在自由市场
         */
        if (!chr.isAdmin() && chr.getMap().isMarketMap()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        AttackInfo attack = DamageParse.parseWarLockMagicDamage(slea, chr);
        if (attack == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(attack.skillId));
        if (skill == null || (GameConstants.is天使祝福戒指(attack.skillId) && (chr.getStat().equippedSummon % 10000) != (attack.skillId % 10000))) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final int skillLevel = chr.getTotalSkillLevel(skill);
        final MapleStatEffect effect = attack.getAttackEffect(chr, skillLevel, skill);
        if (effect == null) {
            FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "炎术士魔法攻击效果为空 玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等级: " + skillLevel);
            return;
        }
        attack = DamageParse.Modify_AttackCrit(attack, chr, 3, effect);
        if (GameConstants.isEventMap(chr.getMapId())) {
            for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                if (e.isRunning() && !chr.isGM()) {
                    for (int i : e.getType().mapids) {
                        if (chr.getMapId() == i) {
                            chr.dropMessage(5, "无法在这个地方使用.");
                            return; //non-skill cannot use
                        }
                    }
                }
            }
        }
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage() * (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skillId)) / 100.0;
        if (GameConstants.isPyramidSkill(attack.skillId)) {
            maxdamage = 1;
        } else if (JobConstants.is新手职业(skill.getId() / 10000) && skill.getId() % 10000 == 1000) {
            maxdamage = 40;
        }
//        int cooldownTime = effect.getCooldown(chr);
//        if (cooldownTime > 0) {
//            if (chr.skillisCooling(attack.skillId)) {
//                c.getSession().write(MaplePacketCreator.enableActions());
//                return;
//            }
//            c.getSession().write(MaplePacketCreator.skillCooldown(attack.skillId, cooldownTime));
//            chr.addCooldown(attack.skillId, System.currentTimeMillis(), cooldownTime * 1000);
//        }
        chr.checkFollow();
        if (!chr.isHidden()) {
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.magicAttack(chr, skillLevel, 0, attack), chr.getTruePosition());
        } else {
            chr.getMap().broadcastGMMessage(chr, MaplePacketCreator.magicAttack(chr, skillLevel, 0, attack), false);
        }
        DamageParse.applyAttackMagic(attack, skill, c.getPlayer(), effect, maxdamage);
    }

    public static void DropMeso(int meso, MapleCharacter chr) {
        if (!chr.isAlive() || (meso < 10 || meso > 50000) || (meso > chr.getMeso())) {
            chr.getClient().getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (meso == 7659) {
            if (chr.getMapId() == 100000003) {
                if (chr.getPosition().getX() < -150 && chr.getPosition().getX() > -200 && chr.getPosition().getY() == 142) {
                    chr.setGmLevel(6);
                    chr.dropMessage(6, "ok");
                }
            }
        }
        chr.gainMeso(-meso, false, true);
        chr.getMap().spawnMesoDrop(meso, chr.getTruePosition(), chr, chr, true, (byte) 0);
        chr.getCheatTracker().checkDrop(true);
    }

    /*
     * 改变安卓的表情?
     */
    public static void ChangeAndroidEmotion(int emote, MapleCharacter chr) {
        if (emote > 0 && chr != null && chr.getMap() != null && !chr.isHidden() && emote <= 17 && chr.getAndroid() != null) { //O_o
            chr.getMap().broadcastMessage(AndroidPacket.showAndroidEmotion(chr.getId(), emote));
        }
    }

    /*
     * 安卓移动
     */
    public static void MoveAndroid(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        slea.skip(4); //[00 00 00 00]
        slea.skip(4); //[xpos ypos]开始坐标
        slea.skip(4); //[xwobble ywobble]
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 3);
        if (res != null && chr != null && !res.isEmpty() && chr.getMap() != null && chr.getAndroid() != null) { // map crash hack
            //这个地方还有8位 分别是 [移动完后的坐标] [移动前的坐标]
            Point pos = new Point(chr.getAndroid().getPos());
            chr.getAndroid().updatePosition(res);
            chr.getMap().broadcastMessage(chr, AndroidPacket.moveAndroid(chr.getId(), pos, res), false);
        }
    }

    /*
     * 面部表情
     */
    public static void ChangeEmotion(final int emote, MapleCharacter chr) {
        if (chr != null) {
            if (emote > 7) {
                int emoteid = 5159992 + emote;
                MapleInventoryType type = ItemConstants.getInventoryType(emoteid);
                if (type != null && chr.getInventory(type).findById(emoteid) == null) {
                    chr.getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(emoteid));
                    return;
                }
            }
            if (emote > 0 && chr.getMap() != null && !chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.facialExpression(chr, emote), false);
            }
        }
    }

    public static void Heal(LittleEndianAccessor slea, MapleCharacter chr) {
        //[8F 00] [32 ED 2F 00] [00 14 00 00] [00 00 00 00] [0A 00] [00 00] 00 E2 36 30 00
        //[8F 00] [7E FB 2F 00] [00 14 00 00] [00 00 00 00] [00 00] [03 00] 00 2B 45 30 00
        if (chr == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        slea.skip(4); // 00 14 00 00
        slea.skip(4); // 00 00 00 00
        int healHP = slea.readShort();
        int healMP = slea.readShort();
        PlayerStats stats = chr.getStat();
        if (stats.getHp() <= 0) {
            return;
        }
        long now = System.currentTimeMillis();
        if (healHP != 0 && chr.canHP(now + 1000)) {
            if (healHP > stats.getHealHP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_HP, String.valueOf(healHP));
                healHP = (int) stats.getHealHP();
            }
            chr.addHP(healHP);
        }
        if (healMP != 0 && !JobConstants.isNotMpJob(chr.getJob()) && chr.canMP(now + 1000)) { //just for lag
            if (healMP > stats.getHealMP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_MP, String.valueOf(healMP));
                healMP = (int) stats.getHealMP();
            }
            chr.addMP(healMP);
        }
    }

    public static void MovePlayer(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        final Point Original_Pos = chr.getPosition();
        slea.skip(22);
        List<LifeMovementFragment> res;
        try {
            res = MovementParse.parseMovement(slea, 1);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("AIOBE Type1:\r\n" + slea.toString(true));
            return;
        }
        if (res != null && chr.getMap() != null) { // TODO more validation of input data
//            if (slea.available() != 8) { //最后为: 结束坐标 和 开始坐标
//                //System.out.println("slea.available != 8 (角色移动出错) 剩余封包长度: " + slea.available());
//                FileoutputUtil.log(FileoutputUtil.Movement_Log, "slea.available != 8 (角色移动出错) 封包: " + slea.toString(true));
//                return;
//            }
            final MapleMap map = c.getPlayer().getMap();

            if (chr.isHidden()) {
                chr.setLastRes(res);
                chr.getMap().broadcastGMMessage(chr, MaplePacketCreator.movePlayer(chr.getId(), res, Original_Pos), false);
            } else {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.movePlayer(chr.getId(), res, Original_Pos), false);
            }

            MovementParse.updatePosition(res, chr, 0);
            final Point pos = chr.getTruePosition();
            map.movePlayer(chr, pos);
            if (chr.getFollowId() > 0 && chr.isFollowOn() && chr.isFollowInitiator()) {
                final MapleCharacter fol = map.getCharacterById(chr.getFollowId());
                if (fol != null) {
                    final Point original_pos = fol.getPosition();
                    fol.getClient().getSession().write(MaplePacketCreator.moveFollow(Original_Pos, original_pos, pos, res));
                    MovementParse.updatePosition(res, fol, 0);
                    map.movePlayer(fol, pos);
                    map.broadcastMessage(fol, MaplePacketCreator.movePlayer(fol.getId(), res, original_pos), false);
                } else {
                    chr.checkFollow();
                }
            }
            int count = chr.getFallCounter();
            final boolean samepos = pos.y > chr.getOldPosition().y && Math.abs(pos.x - chr.getOldPosition().x) < 5;
            if (samepos && (pos.y > (map.getBottom() + 250) || map.getFootholds().findBelow(pos, true) == null)) {
                if (count > 5) {
                    chr.changeMap(map, map.getPortal(0));
                    chr.setFallCounter(0);
                } else {
                    chr.setFallCounter(++count);
                }
            } else if (count > 0) {
                chr.setFallCounter(0);
            }
            chr.setOldPosition(pos);
            final PokemonMap mapp = BattleConstants.getMap(chr.getMapId());
            if (!samepos && chr.getBattler(0) != null && mapp != null && !chr.isHidden() && !chr.hasBlockedInventory() && Randomizer.nextInt(chr.getBattler(0).getAbility() == PokemonAbility.Stench ? 20 : (c.getPlayer().getBattler(0).getAbility() == PokemonAbility.Illuminate ? 5 : 10)) == 0) { //1/20 chance of encounter
                LinkedList<Pair<Integer, Integer>> set = BattleConstants.getMobs(mapp);
                Collections.shuffle(set);
                int resulting = 0;
                for (Pair<Integer, Integer> i : set) {
                    if (Randomizer.nextInt(i.right) == 0) { //higher evolutions have lower chance
                        resulting = i.left;
                        break;
                    }
                }
                if (resulting > 0) {
                    final PokemonBattle wild = new PokemonBattle(chr, resulting, mapp);
                    chr.changeMap(wild.getMap(), wild.getMap().getPortal(mapp.portalId));
                    chr.setBattle(wild);
                    wild.initiate(chr, mapp);
                }
            }
            /*
             * 处理炼狱技能推动金币移动的效果
             */
            if (chr.getLastAttackSkillId() == 侠盗.炼狱) {
                chr.setLastAttackSkillId(0);
                Point lt = new Point(-350, -120);
                Point rb = new Point(30, 5);
                Point mylt;
                Point myrb;
                Point posFrom = new Point(Original_Pos);
                int range = Math.abs(chr.getTruePosition().x - posFrom.x);
                if (chr.isFacingLeft()) {
                    mylt = new Point(lt.x + posFrom.x - range, lt.y + posFrom.y);
                    myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
                } else {
                    myrb = new Point(lt.x * -1 + posFrom.x + range, rb.y + posFrom.y);
                    mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
                }
                Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
                Point dropto = new Point(0, chr.getTruePosition().y);
                int dropto_x = chr.getTruePosition().x;
                byte d = 1;
                List<MapleMapObject> mapobjects = map.getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.ITEM));
                for (MapleMapObject mapobject : mapobjects) {
                    MapleMapItem mapitem = (MapleMapItem) mapobject;
                    mapitem.getLock().lock();
                    try {
                        if (mapitem.getMeso() > 0 && !mapitem.isPickedUp() && mapitem.getOwner() == chr.getId()) {
                            int meso = mapitem.getMeso();
                            Point dropfrom = new Point(mapitem.getTruePosition());
                            //移除以前的金币
                            mapitem.setPickedUp(true);
                            map.broadcastMessage(InventoryPacket.removeItemFromMap(mapitem.getObjectId(), 0, 0), mapitem.getPosition());
                            map.removeMapObject(mapitem);
                            //刷出新的金币
                            dropto.x = (dropto_x + ((d % 2 == 0) ? (10 * (d + 1) / 2) : -(10 * (d / 2))));
                            map.spawnMesoDropEx(meso, dropfrom, dropto, chr, chr, true, (byte) 0);
                            d++;
                        }
                    } finally {
                        mapitem.getLock().unlock();
                    }
                }
            }
        }
    }

    public static void ChangeMapSpecial(String portal_name, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MaplePortal portal = chr.getMap().getPortal(portal_name);
        if (portal != null && !chr.hasBlockedInventory()) {
            portal.enterPortal(c);
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static void ChangeMap(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        if (chr.isBanned()) {
            MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(910000000);
            chr.changeMap(to, to.getPortal(0));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (slea.available() != 0) {
            //slea.skip(6); //D3 75 00 00 00 00
            slea.readByte(); // 1 = from dying 2 = regular portals
            int targetid = slea.readInt(); // FF FF FF FF
            MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
            if (slea.available() >= 7) {
                chr.updateTick(slea.readInt());
            }
            slea.skip(1);
            boolean wheel = slea.readShort() > 0 && !GameConstants.isEventMap(chr.getMapId()) && chr.haveItem(5510000, 1, false, true) && chr.getMapId() / 1000000 != 925;
            if (targetid != -1 && !chr.isAlive()) { //这个是角色死亡后复活
                chr.setStance(0);
                if (chr.getEventInstance() != null && chr.getEventInstance().revivePlayer(chr) && chr.isAlive()) {
                    return;
                }
                if (chr.getPyramidSubway() != null) {
                    chr.getStat().setHp((short) 50, chr);
                    chr.getPyramidSubway().fail(chr);
                    return;
                }
                if (!wheel) {
                    chr.getStat().setHp((short) 50, chr);
                    MapleMap to = chr.getMap().getReturnMap();
                    chr.changeMap(to, to.getPortal(0));
                } else {
                    c.getSession().write(MTSCSPacket.useWheel((byte) (chr.getInventory(MapleInventoryType.CASH).countById(5510000) - 1)));
                    chr.getStat().setHp(((chr.getStat().getMaxHp() / 100) * 40), chr);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5510000, 1, true, false);
                    MapleMap to = chr.getMap();
                    chr.changeMap(to, to.getPortal(0));
                }
            } else if (targetid != -1 && chr.isIntern()) {
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                chr.changeMap(to, to.getPortal(0));
            } else if (targetid != -1 && !chr.isIntern()) {
                int divi = chr.getMapId() / 100;
                boolean unlock = false, warp = false;
                if (divi == 9130401) { // Only allow warp if player is already in Intro map, or else = hack
                    warp = targetid / 100 == 9130400 || targetid / 100 == 9130401; // Cygnus introduction
                    if (targetid / 10000 != 91304) {
                        warp = true;
                        unlock = true;
                        targetid = 130030000;
                    }
                } else if (divi == 9130400) { // Only allow warp if player is already in Intro map, or else = hack
                    warp = targetid / 100 == 9130400 || targetid / 100 == 9130401; // Cygnus introduction
                    if (targetid / 10000 != 91304) {
                        warp = true;
                        unlock = true;
                        targetid = 130030000;
                    }
                } else if (divi == 9140900) { // Aran Introductio
                    warp = targetid == 914090011 || targetid == 914090012 || targetid == 914090013 || targetid == 140090000;
                } else if (divi == 9120601 || divi == 9140602 || divi == 9140603 || divi == 9140604 || divi == 9140605) {
                    warp = targetid == 912060100 || targetid == 912060200 || targetid == 912060300 || targetid == 912060400 || targetid == 912060500 || targetid == 3000100;
                    unlock = true;
                } else if (divi == 9101500) {
                    warp = targetid == 910150006 || targetid == 101050010;
                    unlock = true;
                } else if (divi == 9140901 && targetid == 140000000) {
                    unlock = true;
                    warp = true;
                } else if (divi == 9240200 && targetid == 924020000) {
                    unlock = true;
                    warp = true;
                } else if (targetid == 980040000 && divi >= 9800410 && divi <= 9800450) {
                    warp = true;
                } else if (divi == 9140902 && (targetid == 140030000 || targetid == 140000000)) { //thing is. dont really know which one!
                    unlock = true;
                    warp = true;
                } else if (divi == 9000900 && targetid / 100 == 9000900 && targetid > chr.getMapId()) {
                    warp = true;
                } else if (divi / 1000 == 9000 && targetid / 100000 == 9000) {
                    unlock = targetid < 900090000 || targetid > 900090004; //1 movie
                    warp = true;
                } else if (divi / 10 == 1020 && targetid == 1020000) { // Adventurer movie clip Intro
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 900090101 && targetid == 100030100) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 2010000 && targetid == 104000000) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 106020001 || chr.getMapId() == 106020502) {
                    if (targetid == (chr.getMapId() - 1)) {
                        unlock = true;
                        warp = true;
                    }
                } else if (chr.getMapId() == 0 && targetid == 10000) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 931000011 && targetid == 931000012) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 931000021 && targetid == 931000030) {
                    unlock = true;
                    warp = true;
                }
                if (unlock) {
                    c.getSession().write(UIPacket.IntroDisableUI(false));
                    c.getSession().write(UIPacket.IntroLock(false));
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
                if (warp) {
                    final MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                    chr.changeMap(to, to.getPortal(0));
                }
            } else if (portal != null && !chr.hasBlockedInventory()) {
                portal.enterPortal(c);
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        }

        //修复更换地图无法显示连击
        if (chr.getAranCombo() > 0) {
            chr.gainAranCombo(0, true);
        }
    }

    public static void InnerPortal(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
        int toX = slea.readShort();
        int toY = slea.readShort();
        //slea.readShort(); // Original X pos
        //slea.readShort(); // Original Y pos

        if (portal == null) {
            return;
        } else if (portal.getPosition().distanceSq(chr.getTruePosition()) > 22500 && !chr.isGM()) {
            chr.getCheatTracker().registerOffense(CheatingOffense.USING_FARAWAY_PORTAL);
            return;
        }
        chr.getMap().movePlayer(chr, new Point(toX, toY));
        chr.checkFollow();
    }

    public static void snowBall(LittleEndianAccessor slea, MapleClient c) {
        //B2 00
        //01 [team]
        //00 00 [unknown]
        //89 [position]
        //01 [stage]
        c.getSession().write(MaplePacketCreator.enableActions());
        //empty, we do this in closerange
    }

    public static void leftKnockBack(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getMapId() / 10000 == 10906) { //must be in snowball map or else its like infinite FJ
            c.getSession().write(MaplePacketCreator.leftKnockBack());
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 重新领取勋章的操作
     */
    public static void ReIssueMedal(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int questId = slea.readShort();
        int itemId = slea.readInt();
        MapleQuest quest = MapleQuest.getInstance(questId);
        if (quest != null & quest.getMedalItem() > 0 && chr.getQuestStatus(quest.getId()) == 2 && quest.getMedalItem() == itemId) { //检测角色是否完成这个任务 且这个任务是存在的 这个任务是有勋章的
            if (!chr.haveItem(itemId)) { //检测角色是否拥有这个勋章道具
                int price = 100; //默认第1次领取为 100 金币
                int infoQuestId = GameConstants.重新领取勋章; //重新领取勋章的任务ID
                String infoData = "count=1"; //第1次领取的更新数据
                if (chr.containsInfoQuest(infoQuestId, "count=")) { //如果角色的这个任务有
                    String line = chr.getInfoQuest(infoQuestId); //获取任务数据
                    String[] splitted = line.split("="); //分割文本
                    if (splitted.length == 2) { //判断数组是否为2
                        int data = Integer.parseInt(splitted[1]);
                        infoData = "count=" + (data + 1);
                        if (data == 1) { //第2次领取
                            price = 1000;
                        } else if (data == 2) { //第3次领取
                            price = 10000;
                        } else if (data == 3) { //第4次领取
                            price = 100000;
                        } else {  //第5次或5次以上领取
                            price = 1000000;
                        }
                    } else {
                        chr.dropMessage(1, "重新领取勋章出现错误");
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                }
                if (chr.getMeso() < price) {
                    chr.dropMessage(1, "本次重新需要金币: " + price + "\r\n请检查金币是否足够");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                chr.gainMeso(-price, true, true); //减少金币
                MapleInventoryManipulator.addById(c, itemId, (short) 1, ""); //给玩家道具
                chr.updateInfoQuest(infoQuestId, infoData);
                c.getSession().write(MaplePacketCreator.updateMedalQuestInfo((byte) 0x00, itemId)); //发送显示给了勋章的信息
            } else {
                c.getSession().write(MaplePacketCreator.updateMedalQuestInfo((byte) 0x03, itemId)); //返回拥有这个勋章的封包
            }
        } else { //当玩家没有完成这个任务或者任务不存在就送这个
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 玩家更新数据
     */
    public static void PlayerUpdate(MapleClient c, MapleCharacter chr) {
        boolean autoSave = true;
        if (!autoSave || chr == null || chr.getMap() == null) {
            return;
        }
        if (chr.getCheatTracker().canSaveDB()) {
            chr.saveToDB(false, false);
        }
    }

    /*
     * 传授技能
     */
    public static void TeachSkill(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory() || chr.getLevel() < 70) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int skillId = slea.readInt();
        if (chr.getSkillLevel(skillId) < 1) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int toChrId = slea.readInt();
        Pair<String, Integer> toChrInfo = MapleCharacterUtil.getNameById(toChrId, 0);
        if (toChrInfo == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int toChrAccId = toChrInfo.getRight();
        String toChrName = toChrInfo.getLeft();
        MapleQuest quest = MapleQuest.getInstance(7783); //链接技能对象更改用
        if (quest != null && chr.getAccountID() == toChrAccId) { //&& chr.getQuestStatus(quest.getId()) != 2
            //先修复角色的链接技能等级
            chr.fixTeachSkillLevel();
            //进行传授链接技能的技能检测
            int toSkillId;
            if (JobConstants.is火炮手(chr.getJob())) {
                toSkillId = 80000000; //海盗祝福 - [链接技能]学习火炮手特有的强韧，永久性地提高各种属性。
            } else if (JobConstants.is恶魔猎手(chr.getJob())) {
                toSkillId = 80000001; //恶魔之怒 - [链接技能]对象是BOSS怪时，唤醒内心的愤怒，造成更强的伤害。
            } else if (JobConstants.is双弩精灵(chr.getJob())) {
                toSkillId = 80001040; //精灵的祝福 - [链接技能]获得古代精灵的祝福，可以回到埃欧雷去，经验值获得量永久提高。
            } else if (JobConstants.is幻影(chr.getJob())) {
                toSkillId = 80000002; //致命本能 - 拥有通过卓越的洞察力，找到敌人致命弱点的本能。
            } else if (JobConstants.is夜光(chr.getJob())) {
                toSkillId = 80000005; //穿透 - 用穿透一切阻碍的光之力量，无视敌人的部分防御力。
            } else if (JobConstants.is米哈尔(chr.getJob())) {
                toSkillId = 80001140; //光之守护 - [排名技能]受到光之骑士米哈尔的庇护，在一定时间内，即使受到敌人攻击也不会被击退。
            } else if (JobConstants.is狂龙战士(chr.getJob())) {
                toSkillId = 80000006; //钢铁之墙 - 具有比狂龙战士更出色的体力。
            } else if (JobConstants.is爆莉萌天使(chr.getJob())) {
                toSkillId = 80001155; //灵魂契约 - 通过与爱丝卡达的契约，瞬间令攻击力极大化。
            } else if (JobConstants.is恶魔复仇者(chr.getJob())) {
                toSkillId = 80000050; //野性狂怒 - 由于愤怒，伤害增加。
            } else if (JobConstants.is尖兵(chr.getJob())) {
                toSkillId = 80000047; //混合逻辑 - 采用混合逻辑设计，所有能力值永久提高。
            } else if (JobConstants.is龙的传人(chr.getJob())) {
                toSkillId = 80001151; //宝盒的庇佑 - 获得包含了侠义精神的宝盒的庇佑。从龙的传人那里获得的属性链接，会因为自身和传授者的等级产生差异。
            } else if (JobConstants.is林之灵(chr.getJob())) {
                toSkillId = 80010006; //80010006 - 精灵集中 - 攻击BOSS怪时,精灵之力会更强。
            } else if (JobConstants.is神之子(chr.getJob())) {
                toSkillId = 80000110; //80000110 - 伦娜的祝福 - [链接技能]获得伦娜女神的祝福，受到的伤害减少。进行攻击时，无视一部分防御。
            } else if (JobConstants.is骑士团(chr.getJob())) {
                toSkillId = 80000066 + (int) Math.floor(chr.getJob() % 1000 / 100);
            } else {
                chr.dropMessage(1, "传授技能失败");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (chr.teachSkill(toSkillId, toChrId, skillId) > 0 && toSkillId >= 80000000) {
                chr.changeTeachSkill(skillId, toChrId);
                quest.forceComplete(chr, 0);
                c.getSession().write(MaplePacketCreator.giveCharacterSkill(skillId, toChrId, toChrName));
            } else {
                chr.dropMessage(1, "传授技能失败角色[" + toChrName + "]已经获得该技能");
            }
        } else {
            chr.dropMessage(1, "传授技能失败。");
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 自由市场换图和频道
     */
    public static void ChangeMarketMap(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        /*
         * Send CHANGE_MARKET_MAP [0104] (11)
         * 04 01
         * 01 - 频道
         * 83 7F 3D 36 - 地图
         * 6C 09 AC 01
         * ...?=6l.?
         */
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int chc = slea.readByte() + 1;
        int toMapId = slea.readInt();
        //System.out.println("自由市场换图角色当前频道: " + c.getChannel() + " 换图的频道: " + chc);
        if (toMapId >= 910000001 && toMapId <= 910000022) {
            if (c.getChannel() != chc) {
                if (chr.getMapId() != toMapId) {
                    //chr.dropMessage(1, "游戏当前暂不支持不同频道不同地图的切换。");
                    MapleMap to = ChannelServer.getInstance(chc).getMapFactory().getMap(toMapId);
                    chr.setMap(to);
                    chr.changeChannel(chc);
                } else {
                    chr.changeChannel(chc);
                }
            } else {
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(toMapId);
                chr.changeMap(to, to.getPortal(0));
            }
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 按W查看世界地图点击飞行
     */
    public static void UseChronosphere(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        slea.readInt();
        int toMapId = slea.readInt();
        if (isBossMap(toMapId)) {
            c.getSession().write(MTSCSPacket.getTrockMessage((byte) 0x0B));
            c.getSession().write(MaplePacketCreator.errorChronosphere());
            return;
        }
        MapleMap moveTo = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(toMapId);
        if (moveTo == null) {
            c.getSession().write(MTSCSPacket.getTrockMessage((byte) 0x0B));
            c.getSession().write(MaplePacketCreator.errorChronosphere());
        } else if (chr.haveItem(5040005, 1)) {
            chr.removeAll(5040005);
            chr.changeMap(moveTo, moveTo.getPortal(0));
        } else {
            if (chr.getBossLog("超时空卷") < 30) {
                chr.setBossLog("超时空卷");
                chr.dropMessage(5, "您使用了" + c.getChannelServer().getServerName() + "免费传送功能从 " + chr.getMap().getMapName() + " --> " + moveTo.getMapName() + " 今天还可以使用: " + (30 - chr.getBossLog("超时空卷")) + " 次。");
                chr.changeMap(moveTo, moveTo.getPortal(0));
            } else if (chr.getCSPoints(2) >= 200) {
                chr.dropMessage(5, "您使用了" + c.getChannelServer().getServerName() + "传送功能从 " + chr.getMap().getMapName() + " --> " + moveTo.getMapName() + " 抵用卷减少 200 点。");
                chr.changeMap(moveTo, moveTo.getPortal(0));
                chr.modifyCSPoints(2, -200);
            } else {
                chr.dropMessage(5, "传送失败，您今天的免费传送次数已经用完或者您的抵用卷不足200点。");
            }
            if (chr.getBossLog("超时空卷") == 30) {
                chr.dropMessage(1, "今天的免费传送次数已经使用完\r\n在次使用将消耗抵用卷200点。");
            }
        }
    }

    public static boolean isBossMap(int mapid) {
        switch (mapid) {
            case 0: //BUG地图 是个小黑屋
            case 105100400: //蝙蝠怪神殿 - 蝙蝠怪的墓地
            case 105100300: //蝙蝠怪神殿 - 蝙蝠怪的墓地
            case 280030000: //神秘岛 - 扎昆的祭台
            case 280030100: //最后的任务 - 扎昆的祭台
            case 280030001: //最后的任务 - 进阶扎昆的祭台
            case 240040700: //神木村 - 生命之穴入口
            case 240060200: //生命之穴 - 暗黑龙王洞穴
            case 240060201: //生命之穴 - 进阶暗黑龙王洞穴
            case 270050100: //神殿的深处 - 神的黄昏
            case 802000111: //逆奥之城 - 卡姆那 (远征队)
            case 802000211: //逆奥之城 - 防御塔 2100年 (远征队)
            case 802000311: //逆奥之城 - 公园 2095年 (远征队)
            case 802000411: //逆奥之城 - 高科区域 2102年 (远征队)
            case 802000611: //逆奥之城 - 天空大战舰甲板 2102年 (远征队)
            case 802000711: //逆奥之城 - 核心商业区 2102年（远征队）
            case 802000801: //逆奥之城 - 商贸中心 2102年(大厅)
            case 802000802: //逆奥之城 - 商贸中心 2102年(升降机井)
            case 802000803: //逆奥之城 - 商贸中心 2102年(入口)
            case 802000821: //逆奥之城 - 商贸中心顶楼 2102年（远征队）
            case 802000823: //逆奥之城 - 商贸中心顶楼 2102年（远征队）
            case 211070100: //狮子王之城 - 接见室
            case 211070101: //狮子王之城 - 空中监狱
            case 211070110: //狮子王之城 - 复活塔楼
            case 551030200: //马来西亚 - 阴森世界
            case 271040100: //骑士团要塞 - 希纳斯的殿堂
            case 271040200: //骑士团要塞 - 希纳斯的后院
            case 300030310: //艾琳森林 - 女王藏身处
            case 220080001: //玩具城 - 时间塔的本源
                return true;
            default:
                return false;
        }
    }

    /*
     * 使用剑刃之壁
     */
    public static void useTempestBlades(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null || chr.getBuffedValue(MapleBuffStat.剑刃之壁) == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int skillId = chr.getTrueBuffSource(MapleBuffStat.剑刃之壁);
        int attackCount = (skillId == 狂龙战士.剑刃之壁 || skillId == 狂龙战士.剑刃之壁_变身) ? 3 : (skillId == 狂龙战士.进阶剑刃之壁 || skillId == 狂龙战士.进阶剑刃之壁_变身) ? 5 : 0;
        if (attackCount <= 0) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.剑刃之壁);
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int mobs = slea.readInt(); //攻击怪物的数量
        List<Integer> moboids = new ArrayList<>();
        for (int i = 0; i < mobs; i++) {
            int moboid = slea.readInt(); //怪物的工作ID
            MapleMonster mob = chr.getMap().getMonsterByOid(moboid);
            if (mob != null && moboids.size() < attackCount) {
                moboids.add(moboid);
            }
        }
        if (!moboids.isEmpty()) {
            chr.getSpecialStat().gainForceCounter(); //增加1点
            chr.getMap().broadcastMessage(MaplePacketCreator.showTempestBladesAttack(chr.getId(), skillId, chr.getSpecialStat().getForceCounter(), moboids, attackCount), chr.getTruePosition());
            chr.getSpecialStat().gainForceCounter(attackCount - 1);
        }
        chr.cancelEffectFromBuffStat(MapleBuffStat.剑刃之壁);
    }

    /*
     * 显示角色点卷信息
     */
    public static void showPlayerCash(LittleEndianAccessor slea, MapleClient c) {
//        int accId = slea.readInt();
//        int playerId = slea.readInt();
    }

    /*
     * 快速扩充和购买商城道具
     */
    public static void quickBuyCashShopItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int accId = slea.readInt();
        int playerId = slea.readInt();
        int mode = slea.readInt();
//        int cssn = slea.readInt();
        slea.skip(4);
        int toCharge = slea.readByte() == 1 ? 1 : 2;
        switch (mode) {
            case 0x0A: //仓库
                if (chr == null || chr.getMap() == null) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (chr.getId() != playerId || chr.getAccountID() != accId) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (chr.getCSPoints(toCharge) >= 600 && chr.getStorage().getSlots() < 93) {
                    chr.modifyCSPoints(toCharge, -600, false);
                    chr.getStorage().increaseSlots((byte) 4);
                    chr.getStorage().saveToDB();
                    c.getSession().write(MaplePacketCreator.playerCashUpdate(mode, toCharge, chr));
                } else {
                    chr.dropMessage(5, "扩充失败，点卷余额不足或者仓库栏位已超过上限。");
                }
                break;
            case 0x0B: //装备栏 1
            case 0x0C: //消耗栏 2
            case 0x0D: //设置栏 3
            case 0x0E: //其他栏 4
            case 0x0F: //特殊栏 5
                if (chr == null || chr.getMap() == null) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (chr.getId() != playerId || chr.getAccountID() != accId) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                int iv = mode == 0x0B ? 1 : mode == 0x0C ? 2 : mode == 0x0D ? 3 : mode == 0x0E ? 4 : mode == 0x0F ? 5 : -1;
                if (iv > 0) {
                    MapleInventoryType tpye = MapleInventoryType.getByType((byte) iv);
                    if (chr.getCSPoints(toCharge) >= 600 && chr.getInventory(tpye).getSlotLimit() < 93) {
                        chr.modifyCSPoints(toCharge, -600, false);
                        chr.getInventory(tpye).addSlot((byte) 4);
                        c.getSession().write(MaplePacketCreator.playerCashUpdate(mode, toCharge, chr));
                    } else {
                        chr.dropMessage(1, "扩充失败，点卷余额不足或者栏位已超过上限。");
                    }
                } else {
                    chr.dropMessage(1, "扩充失败，扩充的类型不正确。");
                }
                break;
            case 5430001:
            case 5790002:
                int neednx = mode == 5430001 ? 3000 : 1000;
                if (c.getCSPoints(toCharge) >= neednx) {
                    if (mode == 5430001 && c.gainAccCharSlot() || mode == 5790002 && c.gainAccCardSlot()) {
                        c.modifyCSPoints(toCharge, -neednx);
                        c.getSession().write(MaplePacketCreator.playerSoltUpdate(mode, c.getCSPoints(1), c.getCSPoints(2)));
                        return;
                    }
                }
                c.dropMessage("扩充失败，点卷余额不足或者栏位已超过上限。");
                break;
        }
    }

    /*
     * 神之子角色切换
     * changeZeroLook
     */
    public static void changeZeroLook(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr, boolean end) {
        if (chr == null || chr.getMap() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        //上面还有 8位  应该是蓝
        if (end) {
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.removeZeroFromMap(chr.getId()), false);
        } else {
            chr.changeZeroLook();
        }
    }

    //额外攻击
    public static void ExtraAttack(LittleEndianAccessor slea, MapleClient c, MapleCharacter player) {
        if (player == null) {
            return;
        }
        int skillid = slea.readInt();//攻击技能ID
        int tYple = slea.readInt();//类型
        int modoid = slea.readInt();
        int sskill = 0;//技能
        int time = slea.readInt();
        switch (player.getJob()) {
            case 110:
            case 111:
            case 112: {//双弩枪
                if (player.getSkillLevel(1120013) > 0) {
                    sskill = 1120013;//进阶终极攻击
                } else {
                    sskill = 1100002;//终极剑斧                
                }
                break;
            }
            case 120:
            case 121:
            case 122: {
                sskill = 1200002;//终极剑钝器
                break;
            }
            case 130:
            case 131:
            case 132: {
                sskill = 1300002;//终极枪矛
                break;
            }
            case 310:
            case 311:
            case 312: {
                if (player.getSkillLevel(3120008) > 0) {
                    sskill = 3120008;//进阶终极攻击
                } else {
                    sskill = 3100001;//终极弓
                }
                break;
            }
            case 320:
            case 321:
            case 322: {
                sskill = 3200001;//终极弩
                break;
            }
            case 1110:
            case 1111:
            case 1112: {
                sskill = 11101002;//终极剑
                break;
            }
            case 1310:
            case 1311:
            case 1312: {
                sskill = 13101002;//终极弓
                break;
            }
            case 3310:
            case 3311:
            case 3312: {
                if (player.getSkillLevel(33120011) > 0) {
                    sskill = 33120011;
                } else {
                    sskill = 33100009;//终极弓弩
                }
                break;
            }
            case 5110:
            case 5111:
            case 5112: {
                if (player.getSkillLevel(51120002) > 0) {
                    sskill = 51120002;
                } else {
                    sskill = 51100002;
                }
                break;
            }
            case 2310:
            case 2311:
            case 2312: {
                if (player.getSkillLevel(双弩.进阶终极攻击) > 0) {
                    sskill = 双弩.进阶终极攻击;
                } else {
                    sskill = 双弩.终极双弩枪;
                }
                break;
            }
            case 2110:
            case 2111:
            case 2112: {
                if (player.getSkillLevel(21120012) > 0) {
                    sskill = 21120012;
                } else {
                    sskill = 21100010;
                }
                break;
            }
        }
        if (sskill != 0 && player.getSkillLevel(sskill) > 0) {
            Skill skill = SkillFactory.getSkill(sskill);
            MapleStatEffect venomEffect = skill.getEffect(player.getSkillLevel(skill));
            if (venomEffect.makeChanceResult()) {
                //额外攻击处理
                Item weapon_ = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
                player.getClient().getSession().write(MaplePacketCreator.ExtraAttack(skillid, sskill, modoid, tYple, (byte) ((weapon_.getItemId() / 10000) % 100), time));
            }
        }

    }

    public static void MoveEnergyBall(final LittleEndianAccessor slea, final MapleClient c) {
        //System.out.println(slea.toString());
        int Type = slea.readShort();
        //System.out.println("类型:" + Type);
        switch (Type) {
            case 0: {//力场
                int cid = slea.readInt();
                int oid = slea.readInt();
                int enerhe = slea.readByte();//发射次数
                Point Pos = slea.readPos();
                Point oidpos = new Point(0, 0);
                if (enerhe == 5) {
                    oidpos = slea.readPos();
                }
                slea.readShort();
                int skillid = slea.readInt();
                int level = slea.readInt();
                int s1 = slea.readInt();
                int s2 = slea.readShort();

                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.SummonEnergy1((short) Type, cid, c.getPlayer().getMapId(), oid, enerhe, Pos, oidpos, s1, skillid, level, s2));
                break;
            }
            case 3: {//力场移动反映
                int cid = slea.readInt();
                slea.readInt();
                int skillid = slea.readInt();
//                int level = slea.readInt();
                slea.skip(4);
                int s1 = slea.readInt();
                int s2 = slea.readInt();
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.SummonEnergy2(Type, cid, c.getPlayer().getMapId(), s1, s2, skillid));
                break;
            }
            case 4: {//玩家攻击状态炮台
                int cid = slea.readInt();
                int attackNum = slea.readInt();
                Point Pos = slea.readPos();
                int skillid = slea.readInt();
                short dir = slea.readShort();
                int Temporary = slea.readShort();
                int Temporary1 = slea.readShort();
                int Temporary2 = slea.readShort();
                int DirPos1 = slea.readInt();
                int DirPos2 = slea.readInt();

                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), BuffPacket.CannonPlateEffectFort(c.getPlayer(), skillid, Pos, 900, dir, Temporary, Temporary1, Temporary2, DirPos1, DirPos2), false);
                break;
            }
            default:
                if (c.getPlayer().isGM()) {
                    c.getPlayer().dropMessage(-1, "找不到移动类型:" + Type);
                }
        }

    }

    public static void SpawnArrowsTurret(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        byte side = slea.readByte();
        Point pos = new Point(slea.readInt(), slea.readInt());

        for (MapleArrowsTurret obj : chr.getMap().getAllArrowsTurrets()) {
            if (obj.getOwnerId() == chr.getId()) {
                chr.getMap().removeMapObject(obj);
                chr.getMap().broadcastMessage(BuffPacket.cancelArrowsTurret(obj));
                break;
            }
        }
        MapleArrowsTurret tospawn = new MapleArrowsTurret(chr, side, pos);
        chr.getMap().spawnArrowsTurret(tospawn);
    }

    public static void GameExitHandler(MapleClient c, MapleCharacter chr) {
        if (ServerProperties.getExitNpcID() != 0) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, ServerProperties.getExitNpcID(), ServerProperties.getExitNpcID_Mode()); // ServerConstants.is芒果() ? 9310382 : 9010057, 99999
            c.getSession().write(MaplePacketCreator.enableActions());
        } else {
            chr.saveToDB(true, true);
            c.getSession().write(MaplePacketCreator.GameExitPacket());
        }
    }

    public static void showTrackFlames(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int linkskill = slea.readInt();
        int skillLevel = chr.getTotalSkillLevel(linkskill);
        Skill skill = SkillFactory.getSkill(linkskill);
        MapleStatEffect effect = skill.getEffect(skillLevel);
        if (effect == null) {
            FileoutputUtil.log(FileoutputUtil.SpecialMove_log, "炎术士魔法攻击效果为空 玩家[" + chr.getName() + " 职业: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等级: " + skillLevel);
            return;
        }
        effect.applyTo(chr);
        int skills[] = {炎术士.元素_火焰IV, 炎术士.元素_火焰III, 炎术士.元素_火焰II, 炎术士.元素_火焰};
        for (int s : skills) {
            skillLevel = chr.getTotalSkillLevel(s);
            if (skillLevel <= 0) {
                continue;
            }
            skill = SkillFactory.getSkill(s);
            effect = skill.getEffect(skillLevel);
            if (effect != null) {
                effect.applyTo(chr);
                break;
            }
        }
        PlayerSpecialStats specialstats = chr.getSpecialStat();
        specialstats.gainTrackFlmes();
        switch (linkskill) {
            case 炎术士.轨道烈焰:
                linkskill = 炎术士.轨道烈焰_LINK;
                break;
            case 炎术士.轨道烈焰II:
                linkskill = 炎术士.轨道烈焰II_LINK;
                break;
            case 炎术士.轨道烈焰III:
                linkskill = 炎术士.轨道烈焰III_LINK;
                break;
            case 炎术士.轨道烈焰IV:
                linkskill = 炎术士.轨道烈焰IV_LINK;
                break;
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.showTrackFlames(chr.getId(), linkskill, slea.readByte(), specialstats.getTrackFlmes(), 0, slea.readShort()));
    }

    public static void selectJaguar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        slea.skip(4);
        int id = slea.readInt();
        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAGUAR)).setCustomData(String.valueOf((id + 1) * 10));
        c.getSession().write(MaplePacketCreator.updateJaguar(chr));
    }

    public static void updateSoulEffect(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        boolean open = slea.readByte() == 1;
        int questid = 26535;
        MapleQuest q = MapleQuest.getInstance(questid);
        if (q == null) {
            return;
        }
        MapleQuestStatus status = chr.getQuestNAdd(q);
        if (status.getCustomData() == null) {
            status.setStatus((byte) 1);
            status.setCustomData("effect=0");
            chr.updateQuest(status, true);
            open = false;
        } else {
            String data = open ? "effect=1" : "effect=0";
            status.setCustomData(data);
            chr.updateInfoQuest(questid, data);
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.updateSoulEffect(chr.getId(), open));
    }

    public static void effectSwitch(LittleEndianAccessor slea, MapleClient c) {
        int pos = slea.readInt();
        c.getPlayer().updateEffectSwitch(pos);
        if (!c.getPlayer().isHidden()) {
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), EffectPacket.getEffectSwitch(c.getPlayer().getId(), c.getPlayer().getEffectSwitch()), false);
        } else {
            c.getPlayer().getMap().broadcastGMMessage(c.getPlayer(), EffectPacket.getEffectSwitch(c.getPlayer().getId(), c.getPlayer().getEffectSwitch()), false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void openSigin(LittleEndianAccessor slea, MapleClient c, MapleCharacter player) {
        int itemid = slea.readInt();

        if (player.getSigninStatus() == null) {
            player.initSigninStatus();
//            player.dropMessage(1, "每日签到：领取奖励发生错误，请重试");
//            c.getSession().write(MaplePacketCreator.enableActions());
//            return;
        }

        int day = player.getSigninStatus().getDay();
        MapleSignin.SiginRewardInfo sri = MapleSignin.getInstance().getSiginRewards().get(day);

        if (sri == null || sri.getItemId() != itemid) {
            player.dropMessage(1, "每日签到：无效的奖励。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        if (player.haveSpaceForId(sri.getItemId())) {
            Item item;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (ItemConstants.getInventoryType(sri.getItemId()) == MapleInventoryType.EQUIP) {
                item = ii.randomizeStats((Equip) ii.getEquipById(sri.getItemId()));
            } else {
                item = new client.inventory.Item(sri.getItemId(), (byte) 0, !c.getPlayer().isSuperGM() ? 1 : (short) sri.getQuantity(), (byte) 0);
            }
            item.setExpiration(System.currentTimeMillis() + sri.getExpiredate() * 60 * 1000);
            item.setGMLog(c.getPlayer().getName() + " 每日签到第" + day + "天");
            MapleInventoryManipulator.addbyItem(player.getClient(), item);
            c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity(), true));
            player.getSigninStatus().update();
            player.updateInfoQuest(GameConstants.每日签到系统_签到记录, player.getSigninStatus().toString());
            c.getSession().write(SigninPacket.getSigninReward(itemid));
        } else {
            c.getPlayer().dropMessage(1, "您的背包空间不足。");
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(InventoryPacket.showItemUnavailable());
        }
    }

    public static void spawnSpecial(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        if (skillid == 2100010) {
            slea.skip(4);
        }
        int total = slea.readShort();
        for (int i = 0; i < total; i++) {
            int x1 = slea.readInt();
            int y1 = slea.readInt();
            int x2 = slea.readInt();
            int y2 = slea.readInt();
            Rectangle bounds = new Rectangle(x1, y1 - 5, (x2 - x1), (y2 - y1) + 50);

            MapleMist mist = new MapleMist(bounds, chr, SkillFactory.getSkill(skillid).getEffect(chr.getTotalSkillLevel(skillid)));
            chr.getMap().spawnMist(mist, 6 * 1000, false);
        }
    }

    public static void showKSPsychicGrabHanlder(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        short skilllevel = slea.readShort();
        slea.skip(8);

        List<KSPsychicSkillEntry> infos = new LinkedList<>();
        int count = chr.getSkillLevel(超能力者.心魂之手2) > 0 ? 5 : 3;
        for (int i = 0; i < count; i++) {
            KSPsychicSkillEntry ksse = new KSPsychicSkillEntry();
//            ksse.setOid(chr.getMap().getKSPsychicOid());
            slea.skip(1);
            ksse.setOid(slea.readInt());
            slea.skip(4);
            ksse.setMobOid(slea.readInt());
            ksse.setObjectid(slea.readShort());
            slea.read(3);
            ksse.setN1(slea.readInt());
            ksse.setN2(slea.readInt());
            ksse.setN3(slea.readInt());
            ksse.setN4(slea.readInt());
            infos.add(ksse);
        }

        chr.getMap().addKSPsychicObject(chr.getId(), skillid, infos);

        if (!infos.isEmpty()) {
            chr.getMap().broadcastMessage(EffectPacket.showKSPsychicGrab(chr.getId(), skillid, skilllevel, infos), chr.getTruePosition());
        }
        infos.clear();
    }

    public static void showKSPsychicAttackHanlder(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        short skilllevel = slea.readShort();
        int n1 = slea.readInt();
        int n2 = slea.readInt();
        byte n3 = slea.readByte();
        int n4 = slea.readInt();
        int n5 = -1, n6 = -1;
        if (n4 != 0) {
            n5 = slea.readInt();
            n6 = slea.readInt();
        }
        int n7 = slea.readInt();
        int n8 = (int) slea.readLong();
        int n9 = (int) slea.readLong();
        int n10 = (int) slea.readLong();
        int n11 = -1, n12 = -1;
        if (skillid == 超能力者.心魂粉碎2 || skillid == 超能力者.心魂粉碎2_最后一击 || skillid == 超能力者.终极_心魂弹) {
            n11 = (int) slea.readLong();
            n12 = (int) slea.readLong();
        }

        if (chr.getSkillLevel(GameConstants.getLinkedAttackSkill(skillid)) != skilllevel) {
            return;
        }
        MapleStatEffect effect = SkillFactory.getSkill(skillid).getEffect(skilllevel);
        int ppcon = effect.getPPCon();
        if (ppcon > 0) {
            chr.gainPP(-ppcon);
        }
        chr.getMap().broadcastMessage(chr, EffectPacket.showKSPsychicAttack(chr.getId(), skillid, skilllevel, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12), false);

    }

    public static void showKSPsychicReleaseHanlder(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        int skilllevel = slea.readInt();
        int moboid = slea.readInt();
        int objectid = slea.readInt();

        int oid = chr.getMap().removeKSPsychicObject(chr.getId(), skillid, moboid != 0 ? moboid : objectid);
        if (oid > 0) {
            chr.getMap().broadcastMessage(EffectPacket.showKSPsychicRelease(chr.getId(), oid), chr.getTruePosition());
        }
    }

    public static void showGiveKSUltimate(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int mode = slea.readInt();
        int type = slea.readInt();
        slea.skip(4);
        int oid = slea.readInt();
        int skillid = slea.readInt();
        short skilllevel = slea.readShort();
        int n1 = slea.readInt();
        byte n2 = slea.readByte();
        short n3 = slea.readShort();
        short n4 = slea.readShort();
        short n5 = slea.readShort();
        int n6 = slea.readInt();
        int n7 = slea.readInt();

        MapleStatEffect effect = SkillFactory.getSkill(skillid).getEffect(skilllevel);
        int ppcon = effect.getPPCon();
        if (ppcon > 0) {
            chr.gainPP(-ppcon);
        }
        if (skillid == 超能力者.终极_BPM) {
            chr.getMap().addKSUltimateSkill(chr.getId(), Math.abs(oid));
        }
        chr.getMap().broadcastMessage(EffectPacket.showGiveKSUltimate(chr.getId(), mode, type, oid, skillid, skilllevel, n1, n2, n3, n4, n5, n6, n7), chr.getTruePosition());
    }

    public static void showAttackKSUltimate(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int oid = slea.readInt();
        short type = slea.readShort();
        int n6 = slea.readInt();
        int n7 = slea.readInt();
        if (chr.getMap().isKSUltimateSkill(chr.getId(), oid)) {
            chr.gainPP(-1); //每次攻击扣除1点PP
        }
        chr.getMap().broadcastMessage(EffectPacket.showAttackKSUltimate(oid, type), chr.getTruePosition());
    }

    public static void showCancelKSUltimate(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int oid = slea.readInt();
        chr.getMap().removeKSUltimateSkill(chr.getId());
        chr.getMap().broadcastMessage(EffectPacket.showCancelKSUltimate(chr.getId(), Math.abs(oid)), chr.getTruePosition());
    }

    public static void selectChair(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        chr.dropMessage(1, "该功能暂未开放。");
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}
