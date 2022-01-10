package handling.channel.handler;

import client.skills.SkillFactory;
import client.*;
import client.skills.SkillFactory.FamiliarEntry;
import client.anticheat.CheatingOffense;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Randomizer;
import server.ServerProperties;
import server.StructFamiliar;
import server.life.*;
import server.maps.MapleMap;
import server.maps.MapleMapObjectType;
import server.maps.MapleNodes.MapleNodeInfo;
import server.movement.LifeMovementFragment;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Triple;
import tools.data.input.LittleEndianAccessor;
import tools.packet.MobPacket;

public class MobHandler {

    private static final Logger log = Logger.getLogger(MobHandler.class);

    /*
     * 怪物移动
     */

    public static void MoveMonster(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int objectid = slea.readInt();
        MapleMonster monster = chr.getMap().getMonsterByOid(objectid);
        if (monster == null || monster.getType() != MapleMapObjectType.MONSTER) {
            return;
        }
        if (monster.getLinkCID() > 0) {
            return;
        }
        List<LifeMovementFragment> res;
        slea.skip(1); //[00]
        short moveid = slea.readShort();
        byte type = slea.readByte();
        boolean useSkill = (type & 0xFF) > 0; //是否使用技能
        byte action = slea.readByte();
        int skillId = slea.readByte() & 0xFF; //技能ID
        int skillLevel = slea.readByte(); //技能等级
        short delay = slea.readShort(); //使用技能的延迟时间

        MobSkill toUse = null;
        if (useSkill && monster.getNoSkills() > 0) {
            int random = Randomizer.nextInt(monster.getNoSkills());
            Pair<Integer, Integer> skillToUse = monster.getSkills().get(random);
            toUse = MobSkillFactory.getInstance().getMobSkill(skillToUse.getLeft(), skillToUse.getRight());
            int percHpLeft = (int) (monster.getHp() / monster.getMobMaxHp()) * 100;
            if (toUse.getHP() < percHpLeft || !monster.canUseSkill(toUse)) {
                toUse = null;
            }
        }

        if (chr.isShowPacket()) {
            if (skillId != 0) {
                chr.dropMessage(6, "怪物ID：" + monster.getId() + "  怪物技能ID：" + skillId + "  等级：" + skillLevel + "  type:" + type + "  useSkill:" + useSkill);
            }
        }

        if (monster.hasSkill(skillId, skillLevel)) {
            MobSkill skillData = MobSkillFactory.getInstance().getMobSkill(skillId, skillLevel);
            if (skillData != null && monster.canUseSkill(skillData)) {
                skillData.applyEffect(c.getPlayer(), monster, true);
            }
        }

        /*
         * 8850003 - 伊卡尔特
         * 以上怪物移动会出现 aa > 0
         */
        byte aa = slea.readByte();
        if (aa > 0) {
            for (int i = 0; i < aa; i++) {
                slea.skip(4);
            }
        }
        byte gg = slea.readByte();
        /*
         * 8300007 - 御龙魔 - gg = 7
         * 8840000 - 班·雷昂 - gg = 5
         * 8860000 - 阿卡伊勒 - gg = 5
         * 以上怪物移动会出现 gg > 0
         */
        if (gg > 0) {
            for (int i = 0; i < gg; i++) {
                slea.skip(2); //[A7 04] [F1 04] [61 05] [4F 04] [BA 03] [7E 04] [56 04]
            }
        }
        slea.skip(1); //[00]
        boolean skipped = slea.readInt() != 0 && gg > 0;
        slea.skip(8); //[CC DD FF 00 CC DD FF 00]
        slea.skip(5); //[FC 2A CC 63 01]
        slea.skip(4); //怪物的x y坐标
        if (monster.getId() == 9300281 && skipped) { //莱格斯
            if (slea.readByte() > 10) { //estimate
                slea.skip(8);
            }
        }
        short start_x = slea.readShort();
        short start_y = slea.readShort();
        Point startPos = new Point(start_x, start_y);
        slea.skip(4);
        String packet = slea.toString(true);
        try {
            res = MovementParse.parseMovement(slea, 2);
        } catch (ArrayIndexOutOfBoundsException e) {
            FileoutputUtil.outputFileError(FileoutputUtil.Movement_Log, e);
            FileoutputUtil.log(FileoutputUtil.Movement_Log, "怪物ID " + monster.getId() + ", AIOBE Type2:\r\n" + packet);
            return;
        }
        if (monster.getController() != c.getPlayer()) {
            if (monster.isAttackedBy(c.getPlayer())) {
                monster.switchController(c.getPlayer(), true);
            } else {
                return;
            }
        } else if (skillId == -1 && monster.isControllerKnowsAboutAggro() && !monster.isMobile() && !monster.isFirstAttack()) {
            monster.setControllerHasAggro(false);
            monster.setControllerKnowsAboutAggro(false);
        }
        boolean aggro = monster.isControllerHasAggro();
        if (toUse != null) {
            c.getSession().write(MobPacket.moveMonsterResponse(objectid, moveid, monster.getMp(), aggro, toUse.getSkillId(), toUse.getSkillLevel()));
        } else {
            c.getSession().write(MobPacket.moveMonsterResponse(objectid, moveid, monster.getMp(), aggro));
        }
        if (aggro) {
            monster.setControllerKnowsAboutAggro(true);
        }
        if (res != null && res.size() > 0) {
            MapleMap map = chr.getMap();
            if (slea.available() < 9 || slea.available() > 37) {
                FileoutputUtil.log(FileoutputUtil.Movement_Log, "slea.available != 30 (movement parsing error)\r\n怪物ID: " + monster.getId() + "\r\n" + packet);
                return;
            }
            map.broadcastMessage(c.getPlayer(), MobPacket.moveMonster(useSkill, action, skillId, skillLevel, delay, objectid, startPos, res), monster.getPosition());
            MovementParse.updatePosition(res, monster, -1);
            map.moveMonster(monster, monster.getPosition());

//            MovementParse.updatePosition(res, monster, -1);
//            Point endPos = monster.getTruePosition();
//            if (startPos.distanceSq(endPos) < 1000000) {
//                map.moveMonster(monster, endPos);
//                map.broadcastMessage(c.getPlayer(), MobPacket.moveMonster(skillByte, skill, skill_1, skill_2, skill_3, skill_4, objectid, startPos, res), endPos);
//            } else if ((monster.getId() >= 8820010 && monster.getId() <= 8820014) || (monster.getId() >= 8820110 && monster.getId() <= 8820114) || (monster.getId() >= 8820200 && monster.getId() <= 8820212)
//                    || (monster.getId() >= 8820300 && monster.getId() <= 8820304)) {
//                map.moveMonster(monster, endPos);
//                map.broadcastMessage(c.getPlayer(), MobPacket.moveMonster(skillByte, skill, skill_1, skill_2, skill_3, skill_4, objectid, startPos, res), endPos);
//            }
        }
    }

    /*
     * 怪物攻击怪物
     * 月妙任务出现
     */
    public static void FriendlyDamage(LittleEndianAccessor slea, MapleCharacter chr) {
        MapleMap map = chr.getMap();
        if (map == null) {
            return;
        }
        MapleMonster mobfrom = map.getMonsterByOid(slea.readInt());
        slea.skip(4); // 角色ID
        MapleMonster mobto = map.getMonsterByOid(slea.readInt());

        if (mobfrom != null && mobto != null && mobto.getStats().isFriendly()) {
            int damage = (mobto.getStats().getLevel() * Randomizer.nextInt(mobto.getStats().getLevel())) / 2; // Temp for now until I figure out something more effective
            mobto.damage(chr, damage, true);
            checkShammos(chr, mobto, map);
        }
    }

    public static void MobBomb(LittleEndianAccessor slea, MapleCharacter chr) {
        MapleMap map = chr.getMap();
        if (map == null) {
            return;
        }
        MapleMonster mobfrom = map.getMonsterByOid(slea.readInt());
        slea.skip(4); // something, 9E 07
        slea.readInt(); //-204?

        if (mobfrom != null) {
            /*
             * not sure 12D - 0B 3D 42 00 EC 05 00 00 32 FF FF FF 00 00 00 00 00
             * 00 00 00 <monsterstatus done> 108 - 07 0B 3D 42 00 EC 05 00 00 32
             * FF FF FF 01 00 00 00 7B 00 00 00
             */
        }
    }

    public static void checkShammos(MapleCharacter chr, MapleMonster mobto, MapleMap map) {
        if (!mobto.isAlive() && mobto.getStats().isEscort()) { //shammos
            for (MapleCharacter chrz : map.getCharactersThreadsafe()) { //check for 2022698
                if (chrz.getParty() != null && chrz.getParty().getLeader().getId() == chrz.getId()) {
                    //leader
                    if (chrz.haveItem(2022698)) { //万年冰河水
                        MapleInventoryManipulator.removeById(chrz.getClient(), MapleInventoryType.USE, 2022698, 1, false, true);
                        mobto.heal((int) mobto.getMobMaxHp(), mobto.getMobMaxMp(), true);
                        return;
                    }
                    break;
                }
            }
            map.broadcastMessage(MaplePacketCreator.serverNotice(6, "Your party has failed to protect the monster."));
            MapleMap mapp = chr.getMap().getForcedReturnMap();
            for (MapleCharacter chrz : map.getCharactersThreadsafe()) {
                chrz.changeMap(mapp, mapp.getPortal(0));
            }
        } else if (mobto.getStats().isEscort() && mobto.getEventInstance() != null) {
            mobto.getEventInstance().setProperty("HP", String.valueOf(mobto.getHp()));
        }
    }

    /*
     * 怪物自爆
     * 8500003 - 小黑水雷
     * 8500003 - 小黑水雷
     */
    public static void MonsterBomb(int oid, MapleCharacter chr) {
        MapleMonster monster = chr.getMap().getMonsterByOid(oid);
        if (monster == null || !chr.isAlive() || chr.isHidden() || monster.getLinkCID() > 0) {
            return;
        }
        byte selfd = monster.getStats().getSelfD();
        if (selfd != -1) {
            chr.getMap().killMonster(monster, chr, false, false, selfd);
        }
    }

    /*
     * 怪物仇恨
     */
    public static void AutoAggro(int monsteroid, MapleCharacter chr) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        if (chr == null || chr.getMap() == null || chr.isHidden()) { //no evidence :)
            return;
        }
        MapleMonster monster = chr.getMap().getMonsterByOid(monsteroid);
        if (monster != null && monster.getLinkCID() <= 0) {
            if (monster.getController() != null) {
                if (chr.getMap().getCharacterById(monster.getController().getId()) == null) {
                    monster.switchController(chr, true);
                } else {
                    monster.switchController(monster.getController(), true);
                }
            } else {
                monster.switchController(chr, true);
            }
        }
    }

    /*
     * 怪物攻击怪物
     * 侏儒任务出现
     */
    public static void HypnotizeDmg(LittleEndianAccessor slea, MapleCharacter chr) {
        int oid = slea.readInt(); //被攻击的怪物工作ID
        MapleMonster mob_from = chr.getMap().getMonsterByOid(oid); // From
        slea.skip(4); // 角色ID
        int to = slea.readInt(); // 攻击的怪物工作ID mobto
        slea.skip(1); // [00] 未知
        slea.skip(1); // Same as player damage, -1 = bump, integer = skill ID
        int damage = slea.readInt(); //伤害
        //slea.skip(1); // Facing direction
        //slea.skip(4); // Some type of pos, damage display, I think
        MapleMonster mob_to = chr.getMap().getMonsterByOid(to);
        if (mob_from != null && mob_to != null && mob_to.getStats().isFriendly()) { //temp for now
            if (damage > 30000) {
                return;
            }
            mob_to.damage(chr, damage, true);
            checkShammos(chr, mob_to, chr.getMap());
        }
    }

    public static void DisplayNode(LittleEndianAccessor slea, MapleCharacter chr) {
        MapleMonster mob_from = chr.getMap().getMonsterByOid(slea.readInt()); // From
        if (mob_from != null) {
            chr.getClient().getSession().write(MobPacket.getNodeProperties(mob_from, chr.getMap()));
        }
    }

    public static void MobNode(LittleEndianAccessor slea, MapleCharacter chr) {
        MapleMonster mob_from = chr.getMap().getMonsterByOid(slea.readInt()); // From
        int newNode = slea.readInt();
        int nodeSize = chr.getMap().getNodes().size();
        if (mob_from != null && nodeSize > 0) {
            MapleNodeInfo mni = chr.getMap().getNode(newNode);
            if (mni == null) {
                return;
            }
            if (mni.attr == 2) { //talk
                switch (chr.getMapId() / 100) {
                    case 9211200:
                    case 9211201:
                    case 9211202:
                    case 9211203:
                    case 9211204:
                        chr.getMap().talkMonster("Please escort me carefully.", 5120035, mob_from.getObjectId()); //temporary for now. itemID is located in WZ file
                        break;
                    case 9320001:
                    case 9320002:
                    case 9320003:
                        chr.getMap().talkMonster("Please escort me carefully.", 5120051, mob_from.getObjectId()); //temporary for now. itemID is located in WZ file
                        break;
                }
            }
            mob_from.setLastNode(newNode);
            if (chr.getMap().isLastNode(newNode)) { //the last node on the map.
                switch (chr.getMapId() / 100) {
                    case 9211200:
                    case 9211201:
                    case 9211202:
                    case 9211203:
                    case 9211204:
                    case 9320001:
                    case 9320002:
                    case 9320003:
                        chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, "进入下一个阶段。"));
                        chr.getMap().removeMonster(mob_from);
                        break;

                }
            }
        }
    }

    public static void RenameFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        MonsterFamiliar mf = c.getPlayer().getFamiliars().get(slea.readInt());
        String newName = slea.readMapleAsciiString();
        if (mf != null && mf.getName().equals(mf.getOriginalName()) && MapleCharacterUtil.isEligibleCharName(newName, false)) {
            mf.setName(newName);
            //no packet... lol
        } else {
            chr.dropMessage(1, "Name was not eligible.");
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void SpawnFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        int mId = slea.readInt();
        c.getSession().write(MaplePacketCreator.enableActions());
        c.getPlayer().removeFamiliar();
        if (c.getPlayer().getFamiliars().containsKey(mId) && slea.readByte() > 0) {
            MonsterFamiliar mf = c.getPlayer().getFamiliars().get(mId);
            if (mf.getFatigue() > 0) {
                c.getPlayer().dropMessage(1, "Please wait " + (mf.getFatigue()) + " seconds to summon it.");
            } else {
                c.getPlayer().spawnFamiliar(mf);
            }
        }
    }

    public static void MoveFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        slea.skip(13); //0, monster ID, pos, pos
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 6);
        if (chr != null && chr.getSummonedFamiliar() != null && res.size() > 0) {
            Point pos = chr.getSummonedFamiliar().getPosition();
            MovementParse.updatePosition(res, chr.getSummonedFamiliar(), 0);
            chr.getSummonedFamiliar().updatePosition(res);
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.moveFamiliar(chr.getId(), pos, res), chr.getTruePosition());
            }
        }
    }

    public static void AttackFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr.getSummonedFamiliar() == null) {
            return;
        }
        slea.skip(6); //byte 0 and monster id, then something we don't need
        int skillid = slea.readInt();
        FamiliarEntry f = SkillFactory.getFamiliar(skillid);
        if (f == null) {
            return;
        }
        byte unk = slea.readByte();
        byte size = slea.readByte();
        List<Triple<Integer, Integer, List<Integer>>> attackPair = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            int oid = slea.readInt();
            int type = slea.readInt();
            slea.skip(10);
            byte si = slea.readByte();
            List<Integer> attack = new ArrayList<>(si);
            for (int x = 0; x < si; x++) {
                attack.add(slea.readInt());
            }
            attackPair.add(new Triple<>(oid, type, attack));
        }
        if (attackPair.isEmpty() || !chr.getCheatTracker().checkFamiliarAttack(chr) || attackPair.size() > f.targetCount) {
            return;
        }
        MapleMonsterStats oStats = chr.getSummonedFamiliar().getOriginalStats();
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.familiarAttack(chr.getId(), unk, attackPair), chr.getTruePosition());
        for (Triple<Integer, Integer, List<Integer>> attack : attackPair) {
            MapleMonster mons = chr.getMap().getMonsterByOid(attack.left);
            if (mons == null || !mons.isAlive() || mons.getStats().isFriendly() || mons.getLinkCID() > 0 || attack.right.size() > f.attackCount) {
                continue;
            }
            if (chr.getTruePosition().distanceSq(mons.getTruePosition()) > 640000.0 || chr.getSummonedFamiliar().getTruePosition().distanceSq(mons.getTruePosition()) > GameConstants.getAttackRange(f.lt, f.rb)) {
                if (!chr.getMap().isBossMap()) {
                    chr.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER_SUMMON);
                }
            }
            for (int damage : attack.right) {
                if (damage <= (oStats.getPhysicalAttack() * 4)) { //approx.
                    mons.damage(chr, damage, true);
                }
            }
            if (f.makeChanceResult() && mons.isAlive()) {
                for (MonsterStatus s : f.status) {
                    mons.applyStatus(chr, new MonsterStatusEffect(s, (int) f.speed, MonsterStatus.genericSkill(s), null, false, 0), false, f.time * 1000, false, null);
                }
                if (f.knockback) {
                    mons.switchController(chr, true);
                }
            }
        }
        chr.getSummonedFamiliar().addFatigue(chr, attackPair.size());
    }

    public static void TouchFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        //probably where familiar goes upto mob to attack; no skill
        if (chr.getSummonedFamiliar() == null) {
            return;
        }
        slea.skip(6); //byte 0 and monster id, then something we don't need
        byte unk = slea.readByte();

        MapleMonster target = chr.getMap().getMonsterByOid(slea.readInt());
        if (target == null) {
            return;
        }
        int type = slea.readInt(); //always 7?
        slea.skip(4);
        int damage = slea.readInt();
        int maxDamage = (chr.getSummonedFamiliar().getOriginalStats().getPhysicalAttack() * 5);
        if (damage < maxDamage) {
            damage = maxDamage;
        }
        if (!target.getStats().isFriendly() && chr.getCheatTracker().checkFamiliarAttack(chr)) { //approx.
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.touchFamiliar(chr.getId(), unk, target.getObjectId(), type, 600, damage), chr.getTruePosition());
            target.damage(chr, damage, true);
            chr.getSummonedFamiliar().addFatigue(chr);
        }
    }

    public static void UseFamiliar(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        short slot = slea.readShort();
        int itemId = slea.readInt();
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);

        c.getSession().write(MaplePacketCreator.enableActions());
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 287) {
            return;
        }
        StructFamiliar f = MapleItemInformationProvider.getInstance().getFamiliarByItem(itemId);
        if (MapleLifeFactory.getMonsterStats(f.mob).getLevel() <= c.getPlayer().getLevel()) {
            MonsterFamiliar mf = c.getPlayer().getFamiliars().get(f.familiar);
            if (mf != null) {
                if (mf.getVitality() >= 3) {
                    mf.setExpiry(Math.min(System.currentTimeMillis() + 90 * 24 * 60 * 60000L, mf.getExpiry() + 30 * 24 * 60 * 60000L));
                } else {
                    mf.setVitality(mf.getVitality() + 1);
                    mf.setExpiry(mf.getExpiry() + 30 * 24 * 60 * 60000L);
                }
            } else {
                mf = new MonsterFamiliar(c.getPlayer().getId(), f.familiar, System.currentTimeMillis() + 30 * 24 * 60 * 60000L);
                c.getPlayer().getFamiliars().put(f.familiar, mf);
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false, false);
            c.getSession().write(MaplePacketCreator.registerFamiliar(mf));
        }
    }
}
