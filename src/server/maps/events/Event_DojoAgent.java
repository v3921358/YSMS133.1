package server.maps.events;

import client.MapleCharacter;
import client.MapleTraitType;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.world.party.MaplePartyCharacter;

import java.awt.Point;

import server.Randomizer;
import server.Timer.MapTimer;
import server.life.MapleLifeFactory;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;

public class Event_DojoAgent {

    private final static int baseAgentMapId = 970030000; //隐藏地图 - 工作人员强化特别训练场 9500337 = mano
    private final static Point point1 = new Point(140, 0), point2 = new Point(-193, 0), point3 = new Point(355, 0);

    public static boolean warpStartAgent(MapleCharacter chr, boolean party) {
        int stage = 1;
        int mapid = baseAgentMapId + (stage * 100);

        ChannelServer ch = chr.getClient().getChannelServer();
        for (int i = mapid; i < mapid + 15; i++) {
            MapleMap map = ch.getMapFactory().getMap(i);
            if (map.getCharactersSize() == 0) {
                clearMap(map, false);
                chr.changeMap(map, map.getPortal(0));
                map.respawn(true);
                return true;
            }
        }
        return false;
    }

    public static boolean warpNextMap_Agent(MapleCharacter chr, boolean fromResting) {
        int currentmap = chr.getMapId();
        int thisStage = (currentmap - baseAgentMapId) / 100;

        MapleMap map = chr.getMap();
        if (map.getSpawnedMonstersOnMap() > 0) {
            return false;
        }
        if (!fromResting) {
            clearMap(map, true);
            //c.modifyCSPoints(1, 40, true);
        }
        ChannelServer ch = chr.getClient().getChannelServer();
        if (currentmap >= 970032700 && currentmap <= 970032800) {
            map = ch.getMapFactory().getMap(baseAgentMapId);
            chr.changeMap(map, map.getPortal(0));
            return true;
        }
        int nextmapid = baseAgentMapId + ((thisStage + 1) * 100);
        for (int i = nextmapid; i < nextmapid + 7; i++) {
            map = ch.getMapFactory().getMap(i);
            if (map.getCharactersSize() == 0) {
                clearMap(map, false);
                chr.changeMap(map, map.getPortal(0));
                map.respawn(true);
                return true;
            }
        }
        return false;
    }

    public static boolean warpStartDojo(MapleCharacter chr, boolean party) {
        int stage = 1;
        if (party || stage <= -1 || stage > 38) {
            stage = 1;
        }
        int mapid = 925020000 + (stage * 100);
        boolean canenter = false;
        ChannelServer ch = chr.getClient().getChannelServer();
        for (int x = 0; x < 10; x++) { //15 maps each stage
            boolean canenterr = true;
            for (int i = 1; i < 39; i++) { //only 32 stages, but 38 maps
                MapleMap map = ch.getMapFactory().getMap(925020000 + 100 * i + x);
                if (map.getCharactersSize() > 0) {
                    canenterr = false;
                    break;
                } else {
                    clearMap(map, false);
                }
            }
            if (canenterr) {
                canenter = true;
                mapid += x;
                break;
            }
        }
        MapleMap map = ch.getMapFactory().getMap(mapid);
        MapleMap mapidd = chr.getMap();
        if (canenter) {
            if (party && chr.getParty() != null) {
                for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                    MapleCharacter partyChr = mapidd.getCharacterById(mem.getId());
                    if (partyChr != null && partyChr.isAlive()) {
                        partyChr.changeMap(map, map.getPortal(0));
                    }
                }
            } else {
                chr.changeMap(map, map.getPortal(0));
            }
            spawnMonster(map, stage);
        }
        return canenter;
    }

    public static void failed(MapleCharacter chr) {
        MapleMap currentmap = chr.getMap();
        MapleMap deadMap = chr.getClient().getChannelServer().getMapFactory().getMap(925020002);
        if (chr.getParty() != null && chr.getParty().getMembers().size() > 1) {
            for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                if (partyChr != null) {
                    partyChr.changeMap(deadMap, deadMap.getPortal(0));
                }
            }
        }
    }

    // Resting rooms :
    // 925020600 ~ 925020609
    // 925021200 ~ 925021209
    // 925021800 ~ 925021809
    // 925022400 ~ 925022409
    // 925023000 ~ 925023009
    // 925023600 ~ 925023609
    public static boolean warpNextMap(MapleCharacter chr, boolean fromResting, MapleMap currentmap) {
        try {
            int temp = (currentmap.getId() - 925000000) / 100;
            int thisStage = temp - ((temp / 100) * 100);
            int points = getDojoPoints(thisStage);
            ChannelServer ch = chr.getClient().getChannelServer();
            MapleMap deadMap = ch.getMapFactory().getMap(925020002);
            if (!chr.isAlive()) { //shouldn't happen
                chr.changeMap(deadMap, deadMap.getPortal(0));
                return true;
            }
            MapleMap map = ch.getMapFactory().getMap(currentmap.getId() + 100);
            if (!fromResting && map != null) {
                clearMap(currentmap, true);
                if (chr.getParty() != null && chr.getParty().getMembers().size() > 1) {
                    for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                        MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                        if (partyChr != null) {
                            int point = (points * 3);
                            chr.getTrait(MapleTraitType.will).addExp(points, chr);
                            //chr.modifyCSPoints(1, point * 4, true);
                            int dojo = partyChr.getIntRecord(GameConstants.DOJO) + point;
                            partyChr.getQuestNAdd(MapleQuest.getInstance(GameConstants.DOJO)).setCustomData(String.valueOf(dojo));
                            partyChr.getClient().getSession().write(MaplePacketCreator.Mulung_Pts(point, dojo));
                        }
                    }
                } else {
                    int point = (points * 4);
                    chr.getTrait(MapleTraitType.will).addExp(points, chr);
                    //c.modifyCSPoints(1, point * 4, true);
                    int dojo = chr.getIntRecord(GameConstants.DOJO) + point;
                    chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.DOJO)).setCustomData(String.valueOf(dojo));
                    chr.getClient().getSession().write(MaplePacketCreator.Mulung_Pts(point, dojo));
                }
            }
            if (currentmap.getId() >= 925023800 && currentmap.getId() <= 925023814) {
                MapleMap lastMap = ch.getMapFactory().getMap(925020003); //武陵道场 - 武陵道场屋顶
                if (chr.getParty() != null && chr.getParty().getMembers().size() > 1) {
                    for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                        MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                        if (partyChr != null) {
                            if (!partyChr.isAlive()) {
                                partyChr.addHP(50);
                            }
                            partyChr.changeMap(lastMap, lastMap.getPortal(1));
                            int point = (points * 3);
                            chr.getTrait(MapleTraitType.will).addExp(points, chr);
                            int dojo = partyChr.getIntRecord(GameConstants.DOJO) + point;
                            partyChr.getQuestNAdd(MapleQuest.getInstance(GameConstants.DOJO)).setCustomData(String.valueOf(dojo));
                            partyChr.getClient().getSession().write(MaplePacketCreator.Mulung_Pts(point, dojo));
                            //chr.modifyCSPoints(1, 500, true);
                        }
                    }
                } else {
                    chr.changeMap(lastMap, lastMap.getPortal(1));
                    int point = (points * 4);
                    chr.getTrait(MapleTraitType.will).addExp(points, chr);
                    int dojo = chr.getIntRecord(GameConstants.DOJO) + point;
                    chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.DOJO)).setCustomData(String.valueOf(dojo));
                    chr.getClient().getSession().write(MaplePacketCreator.Mulung_Pts(point, dojo));
                    //c.modifyCSPoints(1, currentmap.getCharactersSize() > 1 ? 500 : 750, true);
                }
                return true;
            }
            //int nextmapid = 925020000 + ((thisStage + 1) * 100);
            if (map != null && map.getCharactersSize() == 0) {
                clearMap(map, false);
                if (chr.getParty() != null) {
                    for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                        MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                        if (partyChr != null) {
                            if (!partyChr.isAlive()) {
                                partyChr.addHP(50);
                            }
                            partyChr.changeMap(map, map.getPortal(0));
                        }
                    }
                } else {
                    chr.changeMap(map, map.getPortal(0));
                }
                spawnMonster(map, thisStage + 1);
                return true;
            } else if (map != null) { //wtf, find a new map
                int basemap = currentmap.getId() / 100 * 100 + 100;
                for (int x = 0; x < 10; x++) {
                    MapleMap mapz = ch.getMapFactory().getMap(basemap + x);
                    if (mapz.getCharactersSize() == 0) {
                        clearMap(mapz, false);
                        if (chr.getParty() != null) {
                            for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                                MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                                if (partyChr != null) {
                                    if (!partyChr.isAlive()) {
                                        partyChr.addHP(50);
                                    }
                                    partyChr.changeMap(mapz, mapz.getPortal(0));
                                }
                            }
                        } else {
                            chr.changeMap(mapz, mapz.getPortal(0));
                        }
                        spawnMonster(mapz, thisStage + 1);
                        return true;
                    }
                }
            }
            MapleMap mappz = ch.getMapFactory().getMap(925020001);
            if (chr.getParty() != null) {
                for (MaplePartyCharacter mem : chr.getParty().getMembers()) {
                    MapleCharacter partyChr = currentmap.getCharacterById(mem.getId());
                    if (partyChr != null) {
                        partyChr.dropMessage(5, "An error has occurred and you shall be brought to the beginning.");
                        partyChr.changeMap(mappz, mappz.getPortal(0));
                    }
                }
            } else {
                chr.dropMessage(5, "An error has occurred and you shall be brought to the beginning.");
                chr.changeMap(mappz, mappz.getPortal(0));
            }
        } catch (Exception rm) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, rm);
        }
        return false;
    }

    private static void clearMap(MapleMap map, boolean check) {
        if (check) {
            if (map.getCharactersSize() != 0) {
                return;
            }
        }
        map.resetFully();
    }

    private static int getDojoPoints(int stage) {
        switch (stage) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 1;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 2;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                return 3;
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                return 4;
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
                return 5;
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
                return 6;
            case 37:
            case 38:
                return 7;
            default:
                return 0;
        }
    }

    private static void spawnMonster(final MapleMap map, final int stage) {
        final int mobid;
        switch (stage) {
            case 1:
                mobid = 9300184; //红蜗牛王
                break;
            case 2:
                mobid = 9300185; //树妖王
                break;
            case 3:
                mobid = 9300186; //大宇
                break;
            case 4:
                mobid = 9300187; //绿水灵王
                break;
            case 5:
                mobid = 9300188; //大王蜈蚣
                break;
            case 7:
                mobid = 9300189; //浮士德
                break;
            case 8:
                mobid = 9300190; //巨居蟹
                break;
            case 9:
                mobid = 9300191; //蘑菇王
                break;
            case 10:
                mobid = 9300192; //阿丽莎乐
                break;
            case 11:
                mobid = 9300193; //提莫
                break;
            case 13:
                mobid = 9300194; //多尔
                break;
            case 14:
                mobid = 9300195; //远古精灵
                break;
            case 15:
                mobid = 9300196; //殭尸蘑菇王
                break;
            case 16:
                mobid = 9300197; //朱诺
                break;
            case 17:
                mobid = 9300198; //老海盗
                break;
            case 19:
                mobid = 9300199; //九尾狐
                break;
            case 20:
                mobid = 9300200; //肯德熊
                break;
            case 21:
                mobid = 9300201; //石头人
                break;
            case 22:
                mobid = 9300202; //妖怪禅师
                break;
            case 23:
                mobid = 9300203; //蝙蝠魔
                break;
            case 25:
                mobid = 9300204; //艾利杰
                break;
            case 26:
                mobid = 9300205; //法兰肯
                break;
            case 27:
                mobid = 9300206; //吉米拉
                break;
            case 28:
                mobid = 9300207; //黑轮王
                break;
            case 29:
                mobid = 9300208; //驮狼雪人
                break;
            case 31:
                mobid = 9300209; //蓝蘑菇王
                break;
            case 32:
                mobid = 9300210; //蝙蝠魔
                break;
            case 33:
                mobid = 9300211; //火焰龙
                break;
            case 34:
                mobid = 9300212; //天鹰
                break;
            case 35:
                mobid = 9300213; //大海兽
                break;
            case 37:
                mobid = 9300214; //帕普拉图斯
                break;
            case 38:
                mobid = 9300215; //武公
                break;
            default:
                return;
        }
        if (mobid != 0) {
            final int rand = Randomizer.nextInt(3);
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    map.spawnMonsterWithEffect(MapleLifeFactory.getMonster(mobid), 15, rand == 0 ? point1 : rand == 1 ? point2 : point3);
                }
            }, 3000);
        }
    }
}
