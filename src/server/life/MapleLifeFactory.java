package server.life;

import constants.GameConstants;

import java.awt.Point;
import java.io.File;
import java.util.*;

import provider.*;
import server.Randomizer;
import tools.Pair;
import tools.StringUtil;

public class MapleLifeFactory {

    private static final MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Mob.wz"));
    private static final MapleDataProvider data2 = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Mob2.wz"));
    private static final MapleDataProvider npcData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Npc.wz"));
    private static final MapleDataProvider stringDataWZ = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz"));
    private static final MapleDataProvider etcDataWZ = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Etc.wz"));
    private static MapleData mobStringData = stringDataWZ.getData("Mob.img");
    private static MapleData npcStringData = stringDataWZ.getData("Npc.img");
    private static MapleData npclocData = etcDataWZ.getData("NpcLocation.img");
    private static Map<Integer, String> npcNames = new HashMap<>();
    private static Map<Integer, MapleMonsterStats> monsterStats = new HashMap<>();
    private static Map<Integer, Integer> NPCLoc = new HashMap<>();
    private static Map<Integer, List<Integer>> questCount = new HashMap<>();

    public static AbstractLoadedMapleLife getLife(int id, String type) {
        if (type.equalsIgnoreCase("n")) {
            return getNPC(id);
        } else if (type.equalsIgnoreCase("m")) {
            return getMonster(id);
        } else {
            System.err.println("Unknown Life type: " + type + "");
            return null;
        }
    }

    public static int getNPCLocation(int npcid) {
        if (NPCLoc.containsKey(npcid)) {
            return NPCLoc.get(npcid);
        }
        int map = MapleDataTool.getIntConvert(Integer.toString(npcid) + "/0", npclocData, -1);
        NPCLoc.put(npcid, map);
        return map;
    }

    public static void loadQuestCounts() {
        if (questCount.size() > 0) {
            return;
        }
        for (MapleDataDirectoryEntry mapz : data.getRoot().getSubdirectories()) {
            if (mapz.getName().equals("QuestCountGroup")) {
                for (MapleDataFileEntry entry : mapz.getFiles()) {
                    int id = Integer.parseInt(entry.getName().substring(0, entry.getName().length() - 4));
                    MapleData dat = data.getData("QuestCountGroup/" + entry.getName());
                    if ((dat != null) && (dat.getChildByPath("info") != null)) {
                        List z = new ArrayList();
                        for (MapleData da : dat.getChildByPath("info")) {
                            z.add(Integer.valueOf(MapleDataTool.getInt(da, 0)));
                        }
                        questCount.put(Integer.valueOf(id), z);
                    } else {
                        System.out.println("null questcountgroup");
                    }
                }
            }
        }
        for (MapleData c : npcStringData) {
            if (c.getName().contains("pack_ignore")) {
                continue;
            }
            int nid = Integer.parseInt(c.getName());
            String n = StringUtil.getLeftPaddedStr(nid + ".img", '0', 11);
            try {
                if (npcData.getData(n) != null) { //only thing we really have to do is check if it exists. if we wanted to, we could get the script as well :3
                    String name = MapleDataTool.getString("name", c, "MISSINGNO");
                    if (name.contains("MapleTV") || name.contains("????????????")) {
                        continue;
                    }
                    npcNames.put(nid, name);
                }
            } catch (NullPointerException e) {
            } catch (RuntimeException e) { //swallow, don't add if 
            }
        }
    }

    public static List<Integer> getQuestCount(int id) {
        return questCount.get(id);
    }

    public static MapleMonster getMonster(int mobId) {
        MapleMonsterStats stats = getMonsterStats(mobId);
        if (stats == null) {
            return null;
        }
        return new MapleMonster(mobId, stats);
    }

    public static MapleMonsterStats getMonsterStats(int mobId) {
        MapleMonsterStats stats = monsterStats.get(mobId);
        boolean secondData = false;

        if (stats == null) {
            MapleData monsterData;
            try {
                monsterData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(mobId) + ".img", '0', 11));
            } catch (RuntimeException e) {
                return null;
            }
            if (monsterData == null) {
                monsterData = data2.getData(StringUtil.getLeftPaddedStr(Integer.toString(mobId) + ".img", '0', 11));
                if (monsterData == null) {
                    return null;
                }
                secondData = true;
            }
            MapleData monsterInfoData = monsterData.getChildByPath("info");
            stats = new MapleMonsterStats(mobId);

            if (monsterInfoData.getChildByPath("maxHP").getData().equals("??????")) {
                //System.out.println("[MapleMonsterStats] " + mid + " - " + monsterInfoData.getChildByPath("maxHP").getData());
                stats.setHp(Integer.MAX_VALUE - 1);
            } else {
                stats.setHp(GameConstants.getPartyPlayHP(mobId) > 0 ? GameConstants.getPartyPlayHP(mobId) : MapleDataTool.getIntConvert("maxHP", monsterInfoData));
            }
            stats.setMp(MapleDataTool.getIntConvert("maxMP", monsterInfoData, 0));
            stats.setExp(mobId == 9300027 ? 0 : (GameConstants.getPartyPlayEXP(mobId) > 0 ? GameConstants.getPartyPlayEXP(mobId) : MapleDataTool.getIntConvert("exp", monsterInfoData, 0)));
            stats.setLevel((short) MapleDataTool.getIntConvert("level", monsterInfoData, 1));
            stats.setWeaponPoint((short) MapleDataTool.getIntConvert("wp", monsterInfoData, 0));
            stats.setCharismaEXP((short) MapleDataTool.getIntConvert("charismaEXP", monsterInfoData, 0));
            stats.setRemoveAfter(MapleDataTool.getIntConvert("removeAfter", monsterInfoData, 0));
            stats.setrareItemDropLevel((byte) MapleDataTool.getIntConvert("rareItemDropLevel", monsterInfoData, 0));
            stats.setFixedDamage(MapleDataTool.getIntConvert("fixedDamage", monsterInfoData, -1));
            stats.setOnlyNormalAttack(MapleDataTool.getIntConvert("onlyNormalAttack", monsterInfoData, 0) > 0);
            stats.setBoss(GameConstants.getPartyPlayHP(mobId) > 0 || MapleDataTool.getIntConvert("boss", monsterInfoData, 0) > 0 || mobId == 8810018 || mobId == 9410066 || (mobId >= 8810118 && mobId <= 8810122));
            stats.setExplosiveReward(MapleDataTool.getIntConvert("explosiveReward", monsterInfoData, 0) > 0);
            stats.setUndead(MapleDataTool.getIntConvert("undead", monsterInfoData, 0) > 0);
            stats.setEscort(MapleDataTool.getIntConvert("escort", monsterInfoData, 0) > 0);
            stats.setPartyBonus(GameConstants.getPartyPlayHP(mobId) > 0 || MapleDataTool.getIntConvert("partyBonusMob", monsterInfoData, 0) > 0);
            stats.setPartyBonusRate(MapleDataTool.getIntConvert("partyBonusR", monsterInfoData, 0));
            if (mobStringData.getChildByPath(String.valueOf(mobId)) != null) {
                stats.setName(MapleDataTool.getString("name", mobStringData.getChildByPath(String.valueOf(mobId)), "MISSINGNO"));
            }
            stats.setBuffToGive(MapleDataTool.getIntConvert("buff", monsterInfoData, -1));
            stats.setChange(MapleDataTool.getIntConvert("changeableMob", monsterInfoData, 0) > 0);
            stats.setFriendly(MapleDataTool.getIntConvert("damagedByMob", monsterInfoData, 0) > 0);
            stats.setNoDoom(MapleDataTool.getIntConvert("noDoom", monsterInfoData, 0) > 0);
            stats.setFfaLoot(MapleDataTool.getIntConvert("publicReward", monsterInfoData, 0) > 0);
            stats.setCP((byte) MapleDataTool.getIntConvert("getCP", monsterInfoData, 0));
            stats.setPoint(MapleDataTool.getIntConvert("point", monsterInfoData, 0));
            stats.setDropItemPeriod(MapleDataTool.getIntConvert("dropItemPeriod", monsterInfoData, 0));
            stats.setPhysicalAttack(MapleDataTool.getIntConvert("PADamage", monsterInfoData, 0));
            stats.setMagicAttack(MapleDataTool.getIntConvert("MADamage", monsterInfoData, 0));
            stats.setPDRate(MapleDataTool.getIntConvert("PDRate", monsterInfoData, 0));
            stats.setMDRate(MapleDataTool.getIntConvert("MDRate", monsterInfoData, 0));
            stats.setAcc(MapleDataTool.getIntConvert("acc", monsterInfoData, 0));
            stats.setEva(MapleDataTool.getIntConvert("eva", monsterInfoData, 0));
            stats.setSummonType((byte) MapleDataTool.getIntConvert("summonType", monsterInfoData, 0));
            stats.setCategory((byte) MapleDataTool.getIntConvert("category", monsterInfoData, 0));
            stats.setSpeed(MapleDataTool.getIntConvert("speed", monsterInfoData, 0));
            stats.setPushed(MapleDataTool.getIntConvert("pushed", monsterInfoData, 0));
            //boolean hideHP = MapleDataTool.getIntConvert("HPgaugeHide", monsterInfoData, 0) > 0 || MapleDataTool.getIntConvert("hideHP", monsterInfoData, 0) > 0;
            stats.setRemoveOnMiss(MapleDataTool.getIntConvert("removeOnMiss", monsterInfoData, 0) > 0);

            MapleData special = monsterInfoData.getChildByPath("coolDamage");
            if (special != null) {
                int coolDmg = MapleDataTool.getIntConvert("coolDamage", monsterInfoData);
                int coolProb = MapleDataTool.getIntConvert("coolDamageProb", monsterInfoData, 0);
                stats.setCool(new Pair<>(coolDmg, coolProb));
            }
            special = monsterInfoData.getChildByPath("loseItem");
            if (special != null) {
                for (MapleData liData : special.getChildren()) {
                    stats.addLoseItem(new loseItem(MapleDataTool.getInt(liData.getChildByPath("id")), (byte) MapleDataTool.getInt(liData.getChildByPath("prop")), (byte) MapleDataTool.getInt(liData.getChildByPath("x"))));
                }
            }

            MapleData selfd = monsterInfoData.getChildByPath("selfDestruction");
            if (selfd != null) {
                stats.setSelfDHP(MapleDataTool.getIntConvert("hp", selfd, 0));
                stats.setRemoveAfter(MapleDataTool.getIntConvert("removeAfter", selfd, stats.getRemoveAfter()));
                stats.setSelfD((byte) MapleDataTool.getIntConvert("action", selfd, -1));
            } else {
                stats.setSelfD((byte) -1);
            }

            MapleData firstAttackData = monsterInfoData.getChildByPath("firstAttack");
            int firstAttack = 0;
            if (firstAttackData != null) {
                if (firstAttackData.getType() == MapleDataType.FLOAT) {
                    firstAttack = Math.round(MapleDataTool.getFloat(firstAttackData));
                } else {
                    firstAttack = MapleDataTool.getInt(firstAttackData);
                }
            }
            stats.setFirstAttack(firstAttack > 0);

            if (stats.isBoss() || isDmgSponge(mobId)) {
                if (monsterInfoData.getChildByPath("hpTagColor") == null || monsterInfoData.getChildByPath("hpTagBgcolor") == null) {
                    stats.setTagColor(0);
                    stats.setTagBgColor(0);
                } else {
                    stats.setTagColor(MapleDataTool.getIntConvert("hpTagColor", monsterInfoData));
                    stats.setTagBgColor(MapleDataTool.getIntConvert("hpTagBgcolor", monsterInfoData));
                }
            }

            MapleData banishData = monsterInfoData.getChildByPath("ban");
            if (banishData != null) {
                stats.setBanishInfo(new BanishInfo(
                        MapleDataTool.getString("banMsg", banishData),
                        MapleDataTool.getInt("banMap/0/field", banishData, -1),
                        MapleDataTool.getString("banMap/0/portal", banishData, "sp")));
            }

            MapleData reviveInfo = monsterInfoData.getChildByPath("revive");
            if (reviveInfo != null) {
                List<Integer> revives = new LinkedList<>();
                for (MapleData bdata : reviveInfo) {
                    revives.add(MapleDataTool.getInt(bdata));
                }
                stats.setRevives(revives);
            }

            MapleData monsterSkillData = monsterInfoData.getChildByPath("skill");
            if (monsterSkillData != null) {
                int i = 0;
                List<Pair<Integer, Integer>> skills = new ArrayList<>();
                while (monsterSkillData.getChildByPath(Integer.toString(i)) != null) {
                    skills.add(new Pair<>(MapleDataTool.getInt(i + "/skill", monsterSkillData, 0), MapleDataTool.getInt(i + "/level", monsterSkillData, 0)));
                    i++;
                }
                stats.setSkills(skills);
            }

            MapleData monsterHitPartsToSlot = monsterData.getChildByPath("HitParts");
            if (monsterHitPartsToSlot != null && monsterHitPartsToSlot.getChildren().size() > 0) {
                stats.setHitParts(monsterHitPartsToSlot.getChildren().get(0).getName());
            }

            decodeElementalString(stats, MapleDataTool.getString("elemAttr", monsterInfoData, ""));

            int link = MapleDataTool.getIntConvert("link", monsterInfoData, 0);
            stats.setLink(link);
            if (link != 0) {
                if (!secondData) {
                    monsterData = data.getData(StringUtil.getLeftPaddedStr(link + ".img", '0', 11));
                } else {
                    monsterData = data2.getData(StringUtil.getLeftPaddedStr(link + ".img", '0', 11));
                }
            }

            for (MapleData idata : monsterData) {
                if (!idata.getName().equals("info")) {
                    int delay = 0;
                    for (MapleData pic : idata.getChildren()) {
                        delay += MapleDataTool.getIntConvert("delay", pic, 0);
                    }
                    stats.setAnimationTime(idata.getName(), delay);
                }
            }

            for (int i = 1; true; i++) {
                MapleData attackData = monsterData.getChildByPath("attack" + i + "/info");
                if (attackData == null) {
                    break;
                }
                MobAttackInfo ret = new MobAttackInfo();
                ret.setDeadlyAttack(attackData.getChildByPath("deadlyAttack") != null);
                ret.setMpBurn(MapleDataTool.getInt("mpBurn", attackData, 0));
                ret.setDiseaseSkill(MapleDataTool.getInt("disease", attackData, 0));
                ret.setDiseaseLevel(MapleDataTool.getInt("level", attackData, 0));
                ret.setMpCon(MapleDataTool.getInt("conMP", attackData, 0));
                ret.attackAfter = MapleDataTool.getInt("attackAfter", attackData, 0);
                ret.PADamage = MapleDataTool.getInt("PADamage", attackData, 0);
                ret.MADamage = MapleDataTool.getInt("MADamage", attackData, 0);
                ret.magic = MapleDataTool.getInt("magic", attackData, 0) > 0;
                ret.isElement = attackData.getChildByPath("elemAttr") != null;
                if (attackData.getChildByPath("range") != null) {
                    ret.range = MapleDataTool.getInt("range/r", attackData, 0);
                    if (attackData.getChildByPath("range/lt") != null && attackData.getChildByPath("range/rb") != null) {
                        ret.lt = (Point) attackData.getChildByPath("range/lt").getData();
                        ret.rb = (Point) attackData.getChildByPath("range/rb").getData();
                    }
                }
                stats.addMobAttack(ret);
            }

            byte hpdisplaytype = -1;
            if (stats.getTagColor() > 0) {
                hpdisplaytype = 0;
            } else if (stats.isFriendly()) {
                hpdisplaytype = 1;
            } else if (mobId >= 9300184 && mobId <= 9300215) { //??????????????????
                hpdisplaytype = 2;
            } else if (!stats.isBoss() || mobId == 9410066 || stats.isPartyBonus()) { // Not boss and dong dong chiang 9410066 = ???????????????
                hpdisplaytype = 3;
            }
            stats.setHPDisplayType(hpdisplaytype);

            monsterStats.put(mobId, stats);
        }
        return stats;
    }

    public static void decodeElementalString(MapleMonsterStats stats, String elemAttr) {
        for (int i = 0; i < elemAttr.length(); i += 2) {
            stats.setEffectiveness(Element.getFromChar(elemAttr.charAt(i)), ElementalEffectiveness.getByNumber(Integer.valueOf(String.valueOf(elemAttr.charAt(i + 1)))));
        }
    }

    private static boolean isDmgSponge(int mid) {
        switch (mid) {
            case 8810018: //?????????????????????
            case 8810118: //??????????????????
            case 8810119: //??????????????????
            case 8810120: //??????????????????
            case 8810121: //??????????????????
            case 8810122: //??????????????????
            case 8820009: //set0????????????
            case 8820010: //???????????????????????????
            case 8820011: //???????????????????????????
            case 8820012: //???????????????????????????
            case 8820013: //???????????????????????????
            case 8820014: //???????????????????????????
            case 8820108: //??????BOSS?????????????????????
            case 8820109: //set0????????????
            case 8820110: //???????????????
            case 8820111: //???????????????
            case 8820112: //???????????????
            case 8820113: //???????????????
            case 8820114: //???????????????
            case 8820304: //???????????????5??????
            case 8820303: //???????????????4??????
            case 8820302: //???????????????3??????
            case 8820301: //???????????????2??????
            case 8820300: //???????????????1??????
                return true;
        }
        return false;
    }

    public static MapleNPC getNPC(int nid) {
        String name = npcNames.get(nid);
        if (name == null) {
            return null;
        }
        return new MapleNPC(nid, name);
    }

    public static int getRandomNPC() {
        List<Integer> vals = new ArrayList<>(npcNames.keySet());
        int ret = 0;
        while (ret <= 0) {
            ret = vals.get(Randomizer.nextInt(vals.size()));
            if (npcNames.get(ret).contains("MISSINGNO")) {
                ret = 0;
            }
        }
        return ret;
    }

    public static class loseItem {

        private int id;
        private byte chance, x;

        private loseItem(int id, byte chance, byte x) {
            this.id = id;
            this.chance = chance;
            this.x = x;
        }

        public int getId() {
            return id;
        }

        public byte getChance() {
            return chance;
        }

        public byte getX() {
            return x;
        }
    }
}
