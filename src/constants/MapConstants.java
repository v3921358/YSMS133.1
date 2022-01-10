package constants;

public class MapConstants {

    public static boolean isStartingEventMap(final int mapid) {
        switch (mapid) {
            case 109010000: //冒险岛活动 - 寻找宝物
            case 109020001: //冒险岛活动 - OX问答
            case 109030001: //冒险岛活动 - 上楼~上楼~&lt;第1阶段>
            case 109030101: //冒险岛活动 - 上楼~上楼~&lt;第1阶段>
            case 109030201: //冒险岛活动 - 上楼~上楼~&lt;第1阶段>
            case 109030301: //冒险岛活动 - 上楼~上楼~&lt;第1阶段>
            case 109030401: //冒险岛活动 - 上楼~上楼~&lt;第1阶段>
            case 109040000: //冒险岛活动 - 向高地&lt;待机室>
            case 109060001: //冒险岛活动 - 活动地图入口
            case 109060002: //隐藏地图 - 活动地图入口
            case 109060003: //冒险岛活动 - 活动地图入口
            case 109060004: //冒险岛活动 - 雪球赛&lt;2阶段>
            case 109060005: //冒险岛活动 - 活动地图入口
            case 109060006: //
            case 109080000: //冒险岛活动 - 椰子比赛
            case 109080001: //冒险岛活动 - 椰子比赛
            case 109080002: //冒险岛活动 - 椰子比赛
            case 109080003: //冒险岛活动 - G★椰子比赛
                return true;
        }
        return false;
    }

    public static boolean isEventMap(final int mapid) {
        return (mapid >= 109010000 && mapid < 109050000) || (mapid > 109050001 && mapid < 109090000) || (mapid >= 809040000 && mapid <= 809040100);
    }

    public static boolean isCoconutMap(final int mapid) {
        return mapid == 109080000 || mapid == 109080001 || mapid == 109080002 || mapid == 109080003 || mapid == 109080010 || mapid == 109080011 || mapid == 109080012 || mapid == 109090300 || mapid == 109090301 || mapid == 109090302 || mapid == 109090303 || mapid == 109090304 || mapid == 910040100;
    }
}
