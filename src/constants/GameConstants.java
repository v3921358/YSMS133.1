package constants;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.inventory.Equip;
import client.status.MonsterStatus;
import configs.FishingConfig;
import constants.skills.*;

import java.awt.Point;
import java.util.*;

import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.Randomizer;
import server.StructItemOption;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
//import java.util.stream.Collectors;
import tools.MaplePacketCreator;

public class GameConstants {

    public static boolean GMS = false; //true = GMS
    public static final List<MapleMapObjectType> rangedMapobjectTypes = Collections.unmodifiableList(Arrays.asList(
            MapleMapObjectType.PLAYER,
            MapleMapObjectType.HIRED_MERCHANT,
            MapleMapObjectType.ITEM,
            MapleMapObjectType.MONSTER,
            MapleMapObjectType.DOOR,
            MapleMapObjectType.REACTOR,
            MapleMapObjectType.SUMMON,
            MapleMapObjectType.NPC,
            MapleMapObjectType.MIST,
            MapleMapObjectType.FAMILIAR,
            MapleMapObjectType.EXTRACTOR));
    private static final long[] exp = {
        0, 15, 34, 57, 92, 135, 372, 560, 840, 1242, 1242, //[0 - 10]
        1242, 1242, 1242, 1242, 1490, 1788, 2145, 2574, 3088, 3705, //[11 - 20]
        4446, 5335, 6402, 7682, 9218, 11061, 13273, 15927, 19112, 19112, //[21 - 30]
        19112, 19112, 19112, 19112, 22934, 27520, 33024, 39628, 47553, 51357, //[31 - 40]
        55465, 59902, 64694, 69869, 75458, 81494, 88013, 95054, 102658, 110870, //[41 - 50]
        119739, 129318, 139663, 150836, 162902, 175934, 190008, 205208, 221624, 221624, //[51 - 60]
        221624, 221624, 221624, 221624, 239353, 258501, 279181, 301515, 325636, 351686, //[61 - 70]
        379820, 410205, 443021, 478462, 511954, 547790, 586135, 627164, 671065, 718039, //[71 - 80]
        768301, 822082, 879627, 941200, 1007084, 1077579, 1153009, 1233719, 1320079, 1412484, //[81 - 90]
        1511357, 1617151, 1730351, 1851475, 1981078, 2119753, 2268135, 2426904, 2596787, 2596787, //[91 - 100]
        2596787, 2596787, 2596787, 2596787, 2778562, 2973061, 3181175, 3403857, 3642126, 3897074, //[101 - 110]
        4169869, 4461759, 4774082, 5108267, 5465845, 5848454, 6257845, 6695894, 7164606, 7666128, //[111 - 120]
        8202756, 8776948, 9391334, 10048727, 10752137, 11504786, 12310121, 13171829, 14093857, 15080426, //[121 - 130]
        16136055, 17265578, 18474168, 19767359, 21151074, 22631649, 24215864, 25910974, 27724742, 29665473, //[131 - 140]
        31742056, 33963999, 36341478, 38885381, 41607357, 44519871, 47636261, 50970799, 54538754, 58356466, //[141 - 150]
        62441418, 66812317, 71489179, 76493421, 81847960, 87577317, 93707729, 100267270, 107285978, 113723136, //[151 - 160]
        120546524, 127779315, 135446073, 143572837, 152187207, 161318439, 170997545, 181257397, 192132840, 203660801, //[161 - 170]
        215880458, 228833285, 242563282, 257117078, 272544102, 288896748, 306230552, 324604385, 344080648, 364725486, //[171 - 180]
        386609015, 409805555, 434393888, 460457521, 488084972, 517370070, 548412274, 581317010, 616196030, 653167791, //[181 - 190]
        692357858, 733899329, 777933288, 824609285, 874085842, 926530992, 982122851, 1041050222, 1103513235, 2207026470L, //[191 - 200]
        2648431764L, 3178118116L, 381374739L, 4576490086L, 5491788103L, 6590145723L, 7908174867L, 9489809840L, 11387771808L, 24142076232L, //[201 - 210]
        25590600805L, 27126036853L, 28753599064L, 30478815007L, 32307543907L, 34245996541L, 36300756333L, 38478801712L, 40787529814L, 84838062013L, //[211 - 220]
        88231584493L, 91760847872L, 95431281786L, 99248533057L, 103218474379L, 107347213354L, 111641101888L, 116106745963L, 120751015801L, 246332072234L, //[221 - 230]
        251258713678L, 256283887951L, 261409565710L, 266637757024L, 271970512164L, 277409922407L, 282958120855L, 288617283272L, 294389628937L, 594667050452L, //[231 - 240]
        600613720956L, 606619858165L, 612686056746L, 618812917313L, 625001046486L, 631251056950L, 637563567519L, 643939203194L, 650378595225L //[241 - 250]
    };
    private static final int[] closeness = {0, 1, 3, 6, 14, 31, 60, 108, 181, 287, 434, 632, 891, 1224, 1642, 2161, 2793, 3557, 4467, 5542, 6801, 8263, 9950, 11882, 14084, 16578, 19391, 22547, 26074, 30000};
    private static final int[] setScore = {0, 10, 100, 300, 600, 1000, 2000, 4000, 7000, 10000};
    private static final int[] cumulativeTraitExp = {
        0, 20, 46, 80, 124, 181, 255, 351, 476, 639, 851, 1084,
        1340, 1622, 1932, 2273, 2648, 3061, 3515, 4014, 4563, 5128,
        5710, 6309, 6926, 7562, 8217, 8892, 9587, 10303, 11040, 11788,
        12547, 13307, 14089, 14883, 15689, 16507, 17337, 18179, 19034, 19902,
        20783, 21677, 22584, 23505, 24440, 25399, 26362, 27339, 28331, 29338,
        30360, 31397, 32450, 33519, 34604, 35705, 36823, 37958, 39110, 40279,
        41466, 32671, 43894, 45135, 46395, 47674, 48972, 50289, 51626, 52967,
        54312, 55661, 57014, 58371, 59732, 61097, 62466, 63839, 65216, 66597,
        67982, 69371, 70764, 72161, 73562, 74967, 76376, 77789, 79206, 80627,
        82052, 83481, 84914, 86351, 87792, 89237, 90686, 92139, 93596, 96000};
    private static final int[] mobHpVal = {0, 15, 20, 25, 35, 50, 65, 80, 95, 110, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350,
        375, 405, 435, 465, 495, 525, 580, 650, 720, 790, 900, 990, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
        1900, 2000, 2100, 2200, 2300, 2400, 2520, 2640, 2760, 2880, 3000, 3200, 3400, 3600, 3800, 4000, 4300, 4600, 4900, 5200,
        5500, 5900, 6300, 6700, 7100, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000, 15000, 17000, 19000, 21000, 23000,
        25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000,
        65000, 67000, 69000, 71000, 73000, 75000, 77000, 79000, 81000, 83000, 85000, 89000, 91000, 93000, 95000, 97000, 99000, 101000, 103000,
        105000, 107000, 109000, 111000, 113000, 115000, 118000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000,
        185000, 190000, 195000, 200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000,
        330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000,
        530000, 550000, 570000, 590000, 610000, 630000, 650000, 670000, 690000, 710000, 730000, 750000, 770000, 790000, 810000, 830000, 850000, 870000, 890000, 910000};
    //PVP经验
    private static final int[] pvpExp = {0, 3000, 6000, 12000, 24000, 48000, 960000, 192000, 384000, 768000};
    //家族经验
    private static final int[] guildExp = {0, 20000, 160000, 540000, 1280000, 2500000, 4320000, 6860000, 10240000, 14580000};
    //骑宠经验
    private static final int[] mountExp = {0, 6, 25, 50, 105, 134, 196, 254, 263, 315, 367, 430, 543, 587, 679, 725, 897, 1146, 1394, 1701, 2247, 2543, 2898, 3156, 3313, 3584, 3923, 4150, 4305, 4550};
    //专业技术经验
    private static final int[] professionExp = {0, 250, 600, 1050, 1600, 2250, 3000, 3850, 4900, 5850};
    //禁止GM命令刷的道具
    public static final int[] itemBlock = {
        2430112, //神奇魔方碎片
        4001168, //金枫叶
        3993003, //红色福袋
        2340000, //祝福卷轴
        2049100, //混沌卷轴60%
        4001129, //冒险岛纪念币
        2040727, //鞋子防滑卷轴
        2040037, //奇迹的欧碧拉的法冠卷轴5%
        2040006,
        2040007,
        2040303,
        2040403,
        2040506,
        2040507,
        2040603,
        2040709,
        2040710,
        2040711,
        2040806,
        2040903,
        2041024,
        2041025,
        2043003,
        2043103,
        2043203,
        2043303,
        2043703,
        2043803,
        2044003,
        2044103,
        2044203,
        2044303,
        2044403,
        2044503,
        2044603,
        2044908,
        2044815,
        2044019,
        2044703};
    public static final int JAIL = 180000001, MAX_BUFFSTAT = 16;
    //禁止使用的技能
    public static final int[] blockedSkills = {};
    public static final String[] RESERVED = {"Rental", "Donor"};
    public static final String[] stats = {
        "tuc", "reqLevel", "reqJob", "reqSTR", "reqDEX", "reqINT", "reqLUK", "reqPOP",
        "cash", "cursed", "success", "setItemID", "equipTradeBlock", "durability",
        "randOption", "randStat", "masterLevel", "reqSkillLevel", "elemDefault",
        "incRMAS", "incRMAF", "incRMAI", "incRMAL", "canLevel", "skill", "charmEXP", "limitBreak"};
    public static final int[] hyperTele = {
        310000000, //黑色之翼领地 - 埃德尔斯坦
        220000000, //玩具城 - 玩具城
        100000000, //射手村 - 射手村
        250000000, //武陵 - 武陵
        240000000, //神木村 - 神木村
        104000000, //明珠港 - 明珠港
        103000000, //废弃都市 - 废弃都市
        102000000, //勇士部落 - 勇士部落
        101000000, //魔法密林 - 魔法密林
        120000000, //诺特勒斯 - 诺特勒斯码头
        260000000, //火焰之路 - 阿里安特
        200000000, //神秘岛 - 天空之城
        230000000};//水下世界 - 水下世界

    public static final int[] sealedEquip = {
        1012438, // 漩涡文身
        1022211, // 漩涡眼镜
        1032224, // 漩涡耳环
        1122269, // 漩涡吊坠
        1132247, // 漩涡腰带
        1152160, // 漩涡护肩
        1003976, // 漩涡帽子
        1102623, // 漩涡披风
        1082556, // 漩涡手套
        1052669, // 漩涡皇家外套
        1072870, // 漩涡鞋
        1212089, // 漩涡双头杖
        1222084, // 漩涡灵魂手铳
        1232084, // 漩涡恶魔剑
        1242090, // 漩涡锁链剑
        1252033, // 漩涡虎梳魔法棒
        1302297, // 漩涡剑
        1312173, // 漩涡斧
        1322223, // 漩涡锤
        1332247, // 漩涡匕首
        1342090, // 漩涡刀
        1362109, // 漩涡手杖
        1372195, // 漩涡短杖
        1382231, // 漩涡长杖
        1402220, // 漩涡双手剑
        1412152, // 漩涡双手战斧
        1422158, // 漩涡巨锤
        1432187, // 漩涡矛
        1442242, // 漩涡戟
        1452226, // 漩涡弓
        1462213, // 漩涡弩
        1472235, // 漩涡拳甲
        1482189, // 漩涡冲拳
        1492199, // 漩涡手铳
        1522113, // 漩涡双翼短杖
        1532118, // 漩涡手炮
    };

    public static int[] needHyperStatLv = {0, 1, 2, 4, 8, 10, 15, 20, 25, 30, 35};

    public static long getExpNeededForLevel(int level) {
        if (level < 0 || level >= exp.length) {
            return 650378595225L;
        }
        return exp[level];
    }

    public static boolean is战神(int job) {
        return job == 2000 || (job >= 2100 && job <= 2112);
    }

    public static boolean is龙神(int job) {
        return job == 2001 || (job >= 2200 && job <= 2218);
    }

    public static boolean is双弩精灵(int job) {
        return job == 2002 || (job >= 2300 && job <= 2312);
    }

    public static boolean is幻影(int job) {
        return job == 2003 || (job >= 2400 && job <= 2412);
    }

    public static boolean is夜光(int job) {
        return job == 2004 || (job >= 2700 && job <= 2712);
    }

    public static boolean is恶魔猎手(int job) {
        return job == 3001 || job == 3100 || job == 3110 || job == 3111 || job == 3112;
    }

    public static boolean is反抗者(int job) {
        return job == 3000 || (job >= 3200 && job <= 3512);
    }

    public static boolean is龙的传人(int job) {
        return job == 508 || (job >= 570 && job <= 572);
    }

    public static boolean is米哈尔(int job) {
        return job == 5000 || (job >= 5100 && job <= 5112);
    }

    public static boolean is尖兵(int job) {
        return job == 3002 || (job >= 3600 && job <= 3612);
    }

    public static boolean is狂龙战士(int job) {
        return job == 6000 || (job >= 6100 && job <= 6112);
    }

    public static boolean is爆莉萌天使(int job) {
        return job == 6001 || (job >= 6500 && job <= 6512);
    }

    public static boolean is恶魔职业(int job) {
        return is恶魔猎手(job) || is恶魔复仇者(job);
    }

    public static boolean is恶魔复仇者(int job) {
        return job == 3101 || job == 3120 || job == 3121 || job == 3122;
    }

    public static boolean is神之子(int job) {
        return job == 10000 || job == 10100 || job == 10110 || job == 10111 || job == 10112;
    }

    public static boolean isNotMpJob(int job) {
        return is恶魔猎手(job) || is恶魔复仇者(job) || is爆莉萌天使(job) || is神之子(job);
    }

    public static int getGuildExpNeededForLevel(int level) {
        if (level < 0 || level >= guildExp.length) {
            return Integer.MAX_VALUE;
        }
        return guildExp[level];
    }

    public static int getPVPExpNeededForLevel(int level) {
        if (level < 0 || level >= pvpExp.length) {
            return Integer.MAX_VALUE;
        }
        return pvpExp[level];
    }

    public static int getClosenessNeededForLevel(int level) {
        return closeness[level - 1];
    }

    public static int getMountExpNeededForLevel(int level) {
        return mountExp[level - 1];
    }

    public static int getTraitExpNeededForLevel(int level) {
        if (level < 0 || level >= cumulativeTraitExp.length) {
            return Integer.MAX_VALUE;
        }
        return cumulativeTraitExp[level];
    }

    public static int getSetExpNeededForLevel(int level) {
        if (level < 0 || level >= setScore.length) {
            return Integer.MAX_VALUE;
        }
        return setScore[level];
    }

    public static int getMonsterHP(int level) {
        if (level < 0 || level >= mobHpVal.length) {
            return Integer.MAX_VALUE;
        }
        return mobHpVal[level];
    }

    public static int getBookLevel(int level) {
        return (5 * level) * (level + 1);
    }

    public static int getTimelessRequiredEXP(int level) {
        return 70 + (level * 10);
    }

    public static int getReverseRequiredEXP(int level) {
        return 60 + (level * 5);
    }

    public static int getProfessionEXP(int level) {
        if (level < 0 || level >= professionExp.length) {
            return Integer.MAX_VALUE;
        }
        return professionExp[level];
        //return (100 * level * level) + (level * 400);
    }

    public static int maxViewRangeSq() {
//        return 1049088;
        return 2455780; // 1024 * 768 = 786432
    }

    public static int maxViewRangeSq_Half() {
//        return 1049088;
        return 2455780; // 800 * 600
    }

    public static boolean isRecoveryIncSkill(int skillId) {
        switch (skillId) {
            case 英雄.自我恢复:
            case 狂龙战士.自我恢复:
            case 米哈尔.自我恢复:
                return true;
        }
        return false;
    }

    public static boolean isLinkedAttackSkill(int skillId) {
        return getLinkedAttackSkill(skillId) != skillId;
    }

    public static int getLinkedAttackSkill(int skillId) {
        switch (skillId) {
            case 黑骑士.重生契约_状态:
                return 黑骑士.重生契约;
            case 英雄.终极打击_爆击:
                return 英雄.终极打击;
            case 隐士.刺客标记_飞镖:
                return 隐士.刺客标记;
            case 隐士.隐士标记_飞镖:
                return 隐士.隐士标记;
            case 侠盗.暗杀_1:
                return 侠盗.暗杀;
            case 侠盗.金钱炸弹_攻击:
                return 侠盗.金钱炸弹;
            case 弓箭手.二阶跳_2:
            case 弓箭手.二阶跳_3:
            case 弓箭手.二阶跳_4:
                return 弓箭手.二阶跳;
            case 神射手.箭矢炮盘_攻击:
                return 神射手.箭矢炮盘;
            case 神射手.暴风箭雨_四转:
                return 神射手.进阶终极攻击; //test
            case 神射手.三彩箭矢_魔法:
                return 神射手.三彩箭矢;
            case 神射手.进阶箭筒_魔法:
                return 神射手.进阶箭筒;
            case 海盗.双弹射击1:
                return 海盗.双弹射击;
            case 冲锋队长.爆能破袭:
                return 冲锋队长.能量爆破;
            case 冲锋队长.碎石乱击_1:
                return 冲锋队长.碎石乱击;
            case 冲锋队长.潜龙出渊_1:
                return 冲锋队长.潜龙出渊;
            case 冲锋队长.暴怒拳:
                return 冲锋队长.激怒拳;
            case 冲锋队长.双重爆炸:
                return 冲锋队长.能量爆炸;
            case 船长.轻羽鞋_下落:
                return 船长.轻羽鞋;
            case 船长.召唤船员2:
            case 船长.召唤船员3:
                return 船长.召唤船员;
            case 船长.集合船员2:
            case 船长.集合船员3:
            case 船长.集合船员4:
                return 船长.集合船员;
            case 船长.战船轰炸机:
            case 船长.战船轰炸机_爆炸:
                return 船长.金属风暴;
            case 神炮王.猴子爆弹_爆炸:
                return 神炮王.猴子爆弹;
            case 战神.双重重击_未知:
                return 战神.双重重击;
            case 战神.战神突进_攻击:
                return 战神.战神突进;
            case 战神.终极投掷_攻击:
                return 战神.终极投掷;
            case 战神.旋风_攻击:
                return 战神.旋风;
            case 战神.全力挥击_未知效果:
            case 战神.全力挥击_双重重击:
            case 战神.全力挥击_三重重击:
                return 战神.全力挥击;
            case 战神.战神之舞_未知效果:
            case 战神.战神之舞_双重重击:
            case 战神.战神之舞_三重重击:
                return 战神.战神之舞;
            case 战神.巨熊咆哮_老技能:
                return 战神.巨熊咆哮;
            case 战神.比昂德_2击:
            case 战神.比昂德_3击:
                return 战神.比昂德;
            case 唤灵斗师.如意棒_第2击:
                return 唤灵斗师.如意棒;
            case 神炮王.猴子炸药桶_爆炸:
                return 神炮王.猴子炸药桶;
            case 神炮王.双胞胎猴子支援_1:
                return 神炮王.双胞胎猴子支援;
            case 双弩.冲锋拳1:
                return 双弩.冲锋拳;
            case 双弩.精灵骑士1:
            case 双弩.精灵骑士2:
                return 双弩.精灵骑士;
            case 恶魔猎手.恶魔之翼1:
                return 恶魔猎手.恶魔之翼;
            case 恶魔猎手.恶魔跳跃1:
            case 恶魔猎手.恶魔跳跃2:
            case 恶魔猎手.恶魔跳跃3:
                return 恶魔猎手.恶魔跳跃;
            case 恶魔猎手.恶魔血月斩1:
            case 恶魔猎手.恶魔血月斩2:
            case 恶魔猎手.恶魔血月斩3:
                return 恶魔猎手.恶魔血月斩;
            case 恶魔猎手.恶魔爆炸1:
                return 恶魔猎手.恶魔爆炸;
            case 幻影.幻影突击1:
                return 幻影.幻影突击;
            case 幻影.暮光祝福1:
                return 幻影.暮光祝福;
            case 龙神.龙飞行:
                return 80001000;
            case 夜光.晨星坠落_爆炸:
                return 夜光.晨星坠落;
            case 狂龙战士.飞龙斩_1:
            case 狂龙战士.飞龙斩_2:
            case 狂龙战士.飞龙斩_变身_3转:
            case 狂龙战士.飞龙斩_变身_4转:
                return 狂龙战士.飞龙斩;
            case 狂龙战士.扇击_变身:
                return 狂龙战士.扇击;
            case 狂龙战士.重拾力量_额外攻击:
                return 狂龙战士.重拾力量;
            case 狂龙战士.剑气突袭_变身:
            case 狂龙战士.剑气突袭_爆发:
            case 狂龙战士.剑气突袭_爆发_变身:
                return 狂龙战士.剑气突袭;
            case 狂龙战士.终极变形_4转:
                return 狂龙战士.终极变形_3转;
            case 狂龙战士.天空剑影_变身:
                return 狂龙战士.天空剑影;
            case 狂龙战士.怒雷屠龙斩_变身:
                return 狂龙战士.怒雷屠龙斩;
            case 狂龙战士.剑刃之壁_变身:
                return 狂龙战士.剑刃之壁;
            case 狂龙战士.进阶剑刃之壁_变身:
                return 狂龙战士.进阶剑刃之壁;
            case 狂龙战士.恶魔之息_变身:
                return 狂龙战士.恶魔之息;
            case 爆莉萌天使.三位一体_2击:
            case 爆莉萌天使.三位一体_3击:
                return 爆莉萌天使.三位一体;
            case 恶魔复仇者.超越十字斩_1:
            case 恶魔复仇者.超越十字斩_2:
            case 恶魔复仇者.超越十字斩_3:
            case 恶魔复仇者.超越十字斩_4:
                return 恶魔复仇者.超越十字斩;
            case 恶魔复仇者.超越恶魔突袭_1:
            case 恶魔复仇者.超越恶魔突袭_2:
            case 恶魔复仇者.超越恶魔突袭_3:
            case 恶魔复仇者.超越恶魔突袭_4:
                return 恶魔复仇者.超越恶魔突袭;
            case 恶魔复仇者.超越月光斩_1:
            case 恶魔复仇者.超越月光斩_2:
            case 恶魔复仇者.超越月光斩_3:
            case 恶魔复仇者.超越月光斩_4:
                return 恶魔复仇者.超越月光斩;
            case 恶魔复仇者.持盾突击_1:
                return 恶魔复仇者.持盾突击;
            case 恶魔复仇者.超越处决_1:
            case 恶魔复仇者.超越处决_2:
            case 恶魔复仇者.超越处决_3:
            case 恶魔复仇者.超越处决_4:
                return 恶魔复仇者.超越处决;
            case 恶魔复仇者.追击盾_攻击:
                return 恶魔复仇者.追击盾;
            case 尖兵.银色快剑_集中:
            case 尖兵.银色快剑_跳跃:
                return 尖兵.银色快剑_闪光;
            case 尖兵.战斗切换_击落:
            case 尖兵.战斗切换_分裂:
                return 尖兵.战斗切换_爆炸;
            case 尖兵.全息力场_力场:
            case 尖兵.全息力场_支援:
                return 尖兵.全息力场_穿透;
            case 尖兵.聚能脉冲炮_炮击:
            case 尖兵.聚能脉冲炮_暴击:
                return 尖兵.聚能脉冲炮_狙击;
            case 尖兵.宙斯盾系统_攻击:
                return 尖兵.宙斯盾系统;
            case 魂骑士.猛袭:
                return 魂骑士.瞬步;
            case 魂骑士.灼影之焰:
                return 魂骑士.摄魂斩;
            case 魂骑士.月影斩:
                return 魂骑士.光速突击;
            case 魂骑士.月光十字斩:
                return 魂骑士.日光十字斩;
            case 魂骑士.人剑合一_旭日:
                return 魂骑士.人剑合一;
            case 魂骑士.日月轮转_月光洒落:
            case 魂骑士.日月轮转_旭日:
                return 魂骑士.日月轮转;
            case 魂骑士.极速霞光:
            case 魂骑士.极速霞光_空中:
            case 魂骑士.月光之舞_空中:
                return 魂骑士.月光之舞;
            case 魂骑士.新月斩:
                return 魂骑士.烈日之刺;
            case 魂骑士.落魂剑_傀儡:
                return 魂骑士.落魂剑;
            case 魂骑士.冥河破_爆破:
                return 魂骑士.冥河破;
            case 炎术士.轨道烈焰_LINK:
                return 炎术士.轨道烈焰;
            case 炎术士.轨道烈焰II_LINK:
                return 炎术士.轨道烈焰II;
            case 炎术士.轨道烈焰III_LINK:
                return 炎术士.轨道烈焰III;
            case 炎术士.轨道烈焰IV_LINK:
                return 炎术士.轨道烈焰IV;
            case 炎术士.灭绝之焰_LINK:
                return 炎术士.灭绝之焰;
            case 炎术士.火焰屏障_LINK:
                return 炎术士.火焰屏障;
            case 炎术士.火焰化身_狮子:
            case 炎术士.火焰化身_狐狸:
                return 炎术士.火焰化身;
            case 风灵使者.狂风肆虐Ⅰ_攻击:
                return 风灵使者.狂风肆虐Ⅰ;
            case 风灵使者.狂风肆虐Ⅱ_攻击:
                return 风灵使者.狂风肆虐Ⅱ;
            case 风灵使者.狂风肆虐Ⅲ_攻击:
                return 风灵使者.狂风肆虐Ⅲ;
            case 风灵使者.旋风箭_溅射:
                return 风灵使者.旋风箭;
            case 夜行者.暗影大风车_爆炸:
                return 夜行者.暗影大风车;
            case 夜行者.三连环光击破_最后一击:
                return 夜行者.三连环光击破;
            case 夜行者.四连镖_最后一击:
                return 夜行者.四连镖;
            case 夜行者.五倍投掷_最后一击:
                return 夜行者.五倍投掷;
            case 爆莉萌天使.灵魂汲取_攻击:
                return 爆莉萌天使.灵魂汲取;
            case 神之子.暴风闪:
                return 神之子.暴风步;
            case 神之子.进阶狂蛮撞击_冲击波:
                return 神之子.进阶狂蛮撞击;
            case 神之子.影子突击_剑气:
                return 神之子.影子突击;
            case 神之子.进阶旋卷切割_剑气:
                return 神之子.进阶旋卷切割;
            case 神之子.进阶圆月旋风_吸收:
                return 神之子.进阶圆月旋风;
            case 神之子.进阶狂转回旋_剑气:
                return 神之子.进阶狂转回旋;
            case 神之子.进阶旋跃斩_剑气:
                return 神之子.进阶旋跃斩;
            case 神之子.跳跃坠袭_冲击波:
                return 神之子.跳跃坠袭;
            case 神之子.地裂山崩_冲击波:
                return 神之子.地裂山崩;
            case 神之子.进阶地裂山崩_冲击波:
            case 神之子.进阶地裂山崩_雷电区域:
                return 神之子.进阶地裂山崩;
            case 神之子.极速切割_漩涡:
                return 神之子.极速切割;
            case 神之子.暴风制动_旋风:
                return 神之子.暴风制动;
            case 神之子.进阶暴风旋涡_旋涡:
            case 神之子.进阶暴风旋涡_雷电区域:
                return 神之子.进阶暴风旋涡;
            case 林之灵.前爪挥击2:
            case 林之灵.前爪挥击3:
            case 林之灵.巨熊35击:
                return 林之灵.前爪挥击;
            case 林之灵.雪豹_未知:
                return 林之灵.雪豹重斩;
            case 林之灵.伙伴发射2:
            case 林之灵.伙伴发射3:
            case 林之灵.伙伴发射4:
                return 林之灵.伙伴发射;
            case 隐月.冲击拳_2:
                return 隐月.冲击拳;
            case 隐月.幻灵招魂_1:
                return 隐月.幻灵招魂;
            case 隐月.火狐灵_1:
                return 隐月.火狐灵;
            case 隐月.爆流拳_2:
            case 隐月.爆流拳_3:
            case 隐月.爆流拳_4:
                return 隐月.爆流拳;
            case 隐月.通背拳_2:
            case 隐月.通背拳_3:
            case 隐月.通背拳_冲击波:
                return 隐月.通背拳;
            case 隐月.闪拳_2:
                return 隐月.闪拳;
            case 隐月.破力拳_冲击波:
            case 隐月.破力拳_2:
                return 隐月.破力拳;
            case 机械师.集中射击_IRON:
                return 机械师.集中射击_SPLASH;
            case 机械师.集中射击_IRON_B:
                return 机械师.集中射击_SPLASH_F;
            case 豹弩游侠.二连射_美洲豹:
                return 豹弩游侠.二连射;
            case 豹弩游侠.连环三箭_美洲豹:
                return 豹弩游侠.连环三箭;
            case 豹弩游侠.狂野射击_美洲豹:
                return 豹弩游侠.狂野射击;
            case 豹弩游侠.奥义箭乱舞_美洲豹:
                return 豹弩游侠.奥义箭乱舞;
            case 豹弩游侠.召唤美洲豹_黄:
            case 豹弩游侠.召唤美洲豹_红:
            case 豹弩游侠.召唤美洲豹_紫:
            case 豹弩游侠.召唤美洲豹_蓝:
            case 豹弩游侠.召唤美洲豹_剑:
            case 豹弩游侠.召唤美洲豹_雪:
            case 豹弩游侠.召唤美洲豹_玛瑙:
            case 豹弩游侠.召唤美洲豹_铠甲:
                return 豹弩游侠.召唤美洲豹_灰;
            case 神之子.提速时刻_侦查:
            case 神之子.提速时刻_战斗:
                return 神之子.提速时刻;
            case 剑豪.三连斩_疾_2:
            case 剑豪.三连斩_疾_3:
            //case 剑豪.拔刀击_疾:
            {
            return 剑豪.三连斩_疾;
            }  
            case 剑豪.三连斩_风_2:
            case 剑豪.三连斩_风_3:
            //case 剑豪.拔刀击_风:
            {
             return 剑豪.三连斩_风;
            }
               
            case 剑豪.三连斩_迅_2:
            case 剑豪.三连斩_迅_3:
            //case 剑豪.拔刀击_迅:
            {
             return 剑豪.三连斩_迅;
            }
               
            case 剑豪.三连斩_雷_2:
            case 剑豪.三连斩_雷_3:
            //case 剑豪.拔刀击_雷:
            {
                            return 剑豪.三连斩_雷;
}
            case 阴阳师.花炎结界:
            case 阴阳师.小白的恢复:
            case 阴阳师.幽玄气息:
                return 阴阳师.影朋_小白;
            case 阴阳师.花炎结界_4转:
            case 阴阳师.小白的恢复_4转:
            case 阴阳师.幽玄气息_4转:
                return 阴阳师.幻醒_小白;
            case 超能力者.心魂粉碎:
            case 超能力者.心魂粉碎_最后一击:
                return 超能力者.心魂之手;
            case 超能力者.心魂粉碎2:
            case 超能力者.心魂粉碎2_最后一击:
            case 超能力者.终极_心魂弹:
                return 超能力者.心魂之手2;
            case 超能力者.心魂释放_攻击:
                return 超能力者.心魂释放;
            case 超能力者.心魂之力2_引力:
                return 超能力者.心魂之力2;
            case 超能力者.心魂之力3_引力:
                return 超能力者.心魂之力3;
            case 夜行者.影子蝙蝠_攻击:
            case 夜行者.影子蝙蝠_反弹:
                return 夜行者.影子蝙蝠;

        }
        return skillId;
    }

    public static boolean isForceIncrease(int skillId) {
        switch (skillId) {
            case 恶魔猎手.恶魔血月斩:
            case 恶魔猎手.恶魔血月斩1:
            case 恶魔猎手.恶魔血月斩2:
            case 恶魔猎手.恶魔血月斩3:
            case 恶魔猎手.死亡诅咒:

            case 30010166:
            case 30011167:
            case 30011168:
            case 30011169:
            case 30011170:
                return true;
        }
        return false;
    }

    public static boolean is超越攻击(int skillId) {
        switch (skillId) {
            case 恶魔复仇者.超越十字斩:
            case 恶魔复仇者.超越十字斩_1:
            case 恶魔复仇者.超越十字斩_2:
            case 恶魔复仇者.超越十字斩_3:
            case 恶魔复仇者.超越十字斩_4:
            case 恶魔复仇者.超越恶魔突袭:
            case 恶魔复仇者.超越恶魔突袭_1:
            case 恶魔复仇者.超越恶魔突袭_2:
            case 恶魔复仇者.超越恶魔突袭_3:
            case 恶魔复仇者.超越恶魔突袭_4:
            case 恶魔复仇者.超越月光斩:
            case 恶魔复仇者.超越月光斩_1:
            case 恶魔复仇者.超越月光斩_2:
            case 恶魔复仇者.超越月光斩_3:
            case 恶魔复仇者.超越月光斩_4:
            case 恶魔复仇者.超越处决:
            case 恶魔复仇者.超越处决_1:
            case 恶魔复仇者.超越处决_2:
            case 恶魔复仇者.超越处决_3:
            case 恶魔复仇者.超越处决_4:
                return true;
        }
        return false;
    }

    public static boolean isElementAmp_Skill(int skillId) {
        switch (skillId) {
            case 火毒.魔力激化:
            case 冰雷.魔力激化:
            case 龙神.魔力激化:
                return true;
        }
        return false;
    }

    public static int getMPEaterForJob(int job) {
        switch (job) {
            case 210:
            case 211:
            case 212:
                return 火毒.魔力吸收;
            case 220:
            case 221:
            case 222:
                return 冰雷.魔力吸收;
            case 230:
            case 231:
            case 232:
                return 主教.魔力吸收;
        }
        return 火毒.魔力吸收; //魔力吸收 Default, in case GM
    }

    public static int getJobShortValue(int job) {
        if (job >= 1000) {
            job -= (job / 1000) * 1000;
        }
        job /= 100;
        if (job == 4) { // For some reason dagger/ claw is 8.. IDK
            job *= 2;
        } else if (job == 3) {
            job += 1;
        } else if (job == 5) {
            job += 11; // 16
        }
        return job;
    }

    public static boolean isPyramidSkill(int skill) {
        return JobConstants.is新手职业(skill / 10000) && skill % 10000 == 1020;
    }

    public static boolean isInflationSkill(int skill) {
        return JobConstants.is新手职业(skill / 10000) && (skill % 10000 >= 1092 && skill % 10000 <= 1095);
    }

    public static boolean isMulungSkill(int skill) {
        return JobConstants.is新手职业(skill / 10000) && (skill % 10000 == 1009 || skill % 10000 == 1010 || skill % 10000 == 1011);
    }

    public static boolean isIceKnightSkill(int skill) {
        return JobConstants.is新手职业(skill / 10000) && (skill % 10000 == 1098 || skill % 10000 == 99 || skill % 10000 == 100 || skill % 10000 == 103 || skill % 10000 == 104 || skill % 10000 == 1105);
    }

    public static boolean is骑兽技能(int skill) {
        return JobConstants.is新手职业(skill / 10000) && skill % 10000 == 1004;
    }

    public static boolean is品克缤技能(int skill) {
        return skill / 10000 == 13000 || skill / 10000 == 13100;
    }

    public static boolean isCustomQuest(int id) {
        return id > 99999;
    }

    public static int getTaxAmount(int meso) {
        if (meso >= 100000000) {
            return (int) Math.round(0.06 * meso);
        } else if (meso >= 25000000) {
            return (int) Math.round(0.05 * meso);
        } else if (meso >= 10000000) {
            return (int) Math.round(0.04 * meso);
        } else if (meso >= 5000000) {
            return (int) Math.round(0.03 * meso);
        } else if (meso >= 1000000) {
            return (int) Math.round(0.018 * meso);
        } else if (meso >= 100000) {
            return (int) Math.round(0.008 * meso);
        }
        return 0;
    }

    public static int EntrustedStoreTax(long meso) {
        if (meso >= 100000000) {
            return (int) Math.round(0.03 * meso);
        } else if (meso >= 25000000) {
            return (int) Math.round(0.025 * meso);
        } else if (meso >= 10000000) {
            return (int) Math.round(0.02 * meso);
        } else if (meso >= 5000000) {
            return (int) Math.round(0.015 * meso);
        } else if (meso >= 1000000) {
            return (int) Math.round(0.009 * meso);
        } else if (meso >= 100000) {
            return (int) Math.round(0.004 * meso);
        }
        return 0;
    }

    public static int getAttackDelay(int skillId, Skill skill) {
        switch (skillId) {
            case 火毒.致命毒雾:
            case 林之灵.火焰屁:
            case 超能力者.心灵传动:
                return 0;
            case 神射手.暴风箭雨_四转:
            case 神射手.箭矢炮盘:
            case 双弩.伊师塔之环:
            case 豹弩游侠.奥义箭乱舞:
            case 恶魔复仇者.暗影蝙蝠:
            case 黑骑士.拉曼查之枪:
            case 船长.战船轰炸机:
            case 船长.战船轰炸机_爆炸:
            case 炎术士.轨道烈焰:
            case 炎术士.轨道烈焰II:
            case 炎术士.轨道烈焰III:
            case 炎术士.轨道烈焰IV:
            case 超能力者.终极_BPM:
            case 超能力者.心魂吸收:
                return 40;
            case 隐士.三连环光击破:
                return 99;
            case 风灵使者.风霜雪舞:
            case 风灵使者.天空之歌:
                return 120;
            case 幻影.卡片雪舞:
            case 幻影.黑色秘卡:
            case 幻影.蓝光连击:
            case 幻影.卡片风暴:
            case 夜光.晨星坠落:
            case 尖兵.精准火箭:
            case 狂龙战士.剑刃之壁:
            case 狂龙战士.进阶剑刃之壁:
            case 狂龙战士.剑刃之壁_变身:
            case 狂龙战士.进阶剑刃之壁_变身:
            case 隐士.刺客标记_飞镖:
            case 隐士.隐士标记_飞镖:
                return 30;
            case 冰雷.寒霜爆晶:
                return 180;
            case 夜光.晨星坠落_爆炸:
            case 狂龙战士.扇击:
            case 狂龙战士.扇击_1:
                return 210;
            case 战神.全力挥击_双重重击:
            case 战神.全力挥击_三重重击:
            case 战神.战神之舞_双重重击:
            case 战神.战神之舞_三重重击:
                return 390;
            case 恶魔猎手.恶魔血月斩1:
            case 恶魔猎手.恶魔血月斩2:
            case 恶魔猎手.恶魔血月斩3:
                return 270;
            case 恶魔猎手.黑暗变形:
                return 510;
            case 狂龙战士.飞龙斩:
            case 狂龙战士.飞龙斩_1:
            case 狂龙战士.飞龙斩_2:
                return 240;
            case 爆莉萌天使.释世书:
            case 爆莉萌天使.灵魂共鸣:
                return 180;
            case 尖兵.刀锋之舞:
                return 120;
            case 0: // Normal Attack, TODO delay for each weapon type
                return 330;
        }
        if (skill != null && skill.getSkillType() == 3) {
            return 0; //final attack
        }
        if (skill != null && skill.getDelay() > 0 && !isNoDelaySkill(skillId)) {
            return skill.getDelay();
        }
        return 330; // Default usually
    }

    public static byte gachaponRareItem(int id) {
        switch (id) {
            case 2340000: // 祝福卷轴
            case 2049100: // 混沌卷轴60%
            case 2049000: // 白医卷轴
            case 2049001: // 白医卷轴
            case 2049002: // 白医卷轴
            case 2040006: // 诅咒白医卷轴
            case 2040007: // 诅咒白医卷轴
            case 2040303: // 耳环智力必成卷
            case 2040403: // 上衣防御必成卷
            case 2040506: // 全身盔甲敏捷必成卷
            case 2040507: // 全身盔甲防御必成卷
            case 2040603: // 裤裙防御必成卷
            case 2040709: // 鞋子敏捷必成卷
            case 2040710: // 鞋子跳跃必成卷
            case 2040711: // 鞋子速度必成卷
            case 2040806: // 手套敏捷必成卷
            case 2040903: // 盾牌防御必成卷
            case 2041024: // 披风魔法防御必成卷
            case 2041025: // 披风物理防御必成卷
            case 2043003: // 单手剑攻击必成卷
            case 2043103: // 单手斧攻击必成卷
            case 2043203: // 单手钝器攻击必成卷
            case 2043303: // 短剑攻击必成卷
            case 2043703: // 短杖攻击必成卷
            case 2043803: // 长杖攻击必成卷
            case 2044003: // 双手剑攻击必成卷
            case 2044103: // 双手斧攻击必成卷
            case 2044203: // 双手钝器攻击必成卷
            case 2044303: // 枪攻击必成卷
            case 2044403: // 矛攻击必成卷
            case 2044503: // 弓攻击必成卷
            case 2044603: // 弩攻击必成卷
            case 2044908: // 短枪攻击必成卷
            case 2044815: // 指节攻击必成卷
            case 2044019: // 双手剑魔力必成卷
            case 2044703: // 拳套攻击必成卷
            //--------------------
            case 2290096: // [能手册]冒险岛勇士 20
            case 1402037: // 龙背刃
            case 1132012: // 法老的腰带
            case 1132013: // 不灭的法老腰带
            case 1032084: // 至尊不速之客耳环
            case 1112439: // 至尊不速之客戒指
            case 1122085: // 至尊不速之客项链
            case 1132040: // 至尊不速之客腰带
            case 1092074: // 至尊不速之客战士盾
            case 1092079: // 至尊不速之客法师盾
            case 1092084: // 至尊不速之客飞侠盾
            case 1092087: // 战神勇士盾
            case 1092088: // 战神黑暗盾
            case 1302147: // 至尊不速之客单手剑
            case 1312062: // 至尊不速之客单手斧
            case 1322090: // 至尊不速之客单手钝器
            case 1332120: // 至尊不速之客短剑-运
            case 1332125: // 至尊不速之客短剑-力
            case 1342033: // 至尊不速之客刀
            case 1372078: // 至尊不速之客短杖
            case 1382099: // 至尊不速之客长杖
            case 1402090: // 至尊不速之客双手剑
            case 1412062: // 至尊不速之客双手斧
            case 1422063: // 至尊不速之客双手钝器
            case 1432081: // 至尊不速之客枪
            case 1442111: // 至尊不速之客矛
            case 1452106: // 至尊不速之客弓
            case 1462091: // 至尊不速之客弩
            case 1472117: // 至尊不速之客拳套
            case 1482079: // 至尊不速之客指节
            case 1492079: // 至尊不速之客短枪
            //--------------------------------
            case 1002790: //重生冠军盔
            case 1002791: //重生玄妙帽
            case 1002792: //重生霓翎帽
            case 1002793: //重生迷踪帽
            case 1002794: //重生海王星
            case 1082239: //重生定边手套
            case 1082240: //重生逍遥手套
            case 1082241: //重生白云手套
            case 1082242: //重生探云手套
            case 1082243: //重生抚浪手套
            case 1052160: //重生演武铠
            case 1052161: //重生奥神袍
            case 1052162: //重生巡礼者
            case 1052163: //重生翻云服
            case 1052164: //重生霸七海
            case 1072361: //重生坚壁靴
            case 1072362: //重生缥缈鞋
            case 1072363: //重生彩虹鞋
            case 1072364: //重生舞空靴
            case 1072365: //重生定海靴
            case 1302086: //重生破甲剑
            case 1312038: //重生断蚺斧
            case 1322061: //重生惊破天
            case 1332075: //重生狂鲨锯
            case 1332076: //重生断首刃
            case 1372045: //重生蝶翼杖
            case 1382059: //重生冰轮杖
            case 1402047: //重生玄冥剑
            case 1412034: //重生碎鼋斧
            case 1422038: //重生威震天
            case 1432049: //重生显圣枪
            case 1442067: //重生神光戟
            case 1452059: //重生惊电弓
            case 1462051: //重生冥雷弩
            case 1472071: //重生大悲赋
            case 1482024: //重生孔雀翎
            case 1492025: //重生凤凰铳
            case 1342012: //重生之刃
            case 1942002: //重生面罩
            case 1952002: //重生吊坠
            case 1962002: //重生飞翼
            case 1972002: //重生尾巴
            case 1522016: //重生鲜花弩枪
            case 1532016: //重生拯救者
            //-------------------------
            case 1032031: //永恒金盾坠
            case 1102172: //永恒不灭披风
            case 1002776: //永恒冠军盔
            case 1002777: //永恒玄妙帽
            case 1002778: //永恒霓翎帽
            case 1002779: //永恒迷踪帽
            case 1002780: //永恒海王星
            case 1082234: //永恒定边手套
            case 1082235: //永恒逍遥手套
            case 1082236: //永恒白云手套
            case 1082237: //永恒探云手套
            case 1082238: //永恒抚浪手套
            case 1052155: //永恒演武铠
            case 1052156: //永恒奥神袍
            case 1052157: //永恒巡礼者
            case 1052158: //永恒翻云服
            case 1052159: //永恒霸七海
            case 1072355: //永恒坚壁靴
            case 1072356: //永恒缥缈鞋
            case 1072357: //永恒彩虹鞋
            case 1072358: //永恒舞空靴
            case 1072359: //永恒定海靴
            case 1092057: //永恒魔光盾
            case 1092058: //永恒寒冰盾
            case 1092059: //永恒匿踪盾
            case 1122011: //封印的永恒玉佩
            case 1122012: //永恒玉佩
            case 1302081: //永恒破甲剑
            case 1312037: //永恒断蚺斧
            case 1322060: //永恒惊破天
            case 1332073: //永恒狂鲨锯
            case 1332074: //永恒断首刃
            case 1372044: //永恒蝶翼杖
            case 1382057: //永恒冰轮杖
            case 1402046: //永恒玄冥剑
            case 1412033: //永恒碎鼋斧
            case 1422037: //永恒威震天
            case 1432047: //永恒显圣枪
            case 1442063: //永恒神光戟
            case 1452057: //永恒惊电弓
            case 1462050: //永恒冥雷弩
            case 1472068: //永恒大悲赋
            case 1482023: //永恒孔雀翎
            case 1492023: //永恒凤凰铳
            case 1342011: //永恒之刃
            case 1522015: //永恒鲜花弩枪
            case 1532015: //永恒拯救者
            //-------------------------
            //头盔
            case 1003280: //深渊冠军盔
            case 1003281: //深渊玄妙帽
            case 1003282: //深渊霓翎帽
            case 1003283: //深渊迷踪帽
            case 1003284: //深渊海王星
            //衣服
            case 1052374: //深渊演武铠
            case 1052375: //深渊奥神袍
            case 1052376: //深渊巡礼者
            case 1052377: //深渊翻云服
            case 1052378: //深渊霸七海
            //鞋子
            case 1072544: //深渊坚壁靴
            case 1072545: //深渊缥缈鞋
            case 1072546: //深渊彩虹鞋
            case 1072547: //深渊舞空靴
            case 1072548: //深渊定海靴
            //手套
            case 1082328: //深渊定边手套
            case 1082329: //深渊逍遥手套
            case 1082330: //深渊白云手套
            case 1082331: //深渊探云手套
            case 1082332: //深渊抚浪手套
            //武器
            case 1302173: //深渊破甲剑
            case 1312072: //深渊断蚺斧
            case 1322107: //深渊惊破天
            case 1332148: //深渊狂鲨锯
            case 1332149: //深渊断首刃
            case 1342040: //深渊之刃
            case 1372100: //深渊蝶翼杖
            case 1382124: //深渊冰轮杖
            case 1402111: //深渊玄冥剑
            case 1412071: //深渊碎鼋斧
            case 1422073: //深渊威震天
            case 1432099: //深渊显圣枪
            case 1442136: //深渊神光戟
            case 1452129: //深渊惊电弓
            case 1462118: //深渊冥雷弩
            case 1472141: //深渊大悲赋
            case 1482102: //深渊孔雀翎
            case 1492101: //深渊凤凰铳
            case 1522020: //深渊鲜花弩枪
            case 1532037: //深渊拯救者
            case 1942004: //深渊面罩
            case 1952004: //深渊吊坠
            case 1962004: //深渊之翼
            case 1972004: //深渊之尾
                return 2;
            //1 = wedding msg o.o
        }
        return 1;
    }

    public final static int[] goldrewards = {
        2049400, 1, // 高级潜能附加卷轴
        2049401, 2, // 潜能附加卷轴
        2049301, 2, // 装备强化卷轴
        2340000, 1, // 祝福卷轴
        2070007, 2, // 月牙镖
        2070016, 1, // 雪球
        2330007, 1, // 高科技穿甲弹
        1402037, 1, // 龙背刃
        2290096, 1, // [能手册]冒险岛勇士 20
        2290049, 1, // [能手册]圣光普照 30
        2290041, 1, // [能手册]天降落星 30
        2290047, 1, // [能手册]落霜冰破 30
        2290095, 1, // [能手册]烟雾弹 30
        2290017, 1, // [能手册]葵花宝典 30
        2290075, 1, // [能手册]一击要害箭 30
        2290085, 1, // [能手册]三连环光击破 30
        2290116, 1, // [能手册]地毯式空袭 30
        1302059, 3, // 狂龙闪电剑
        2049100, 1, // 混沌卷轴60%
        1092049, 1, // 热情剑盾
        1102041, 1, // 浪人披风(粉)
        1432018, 3, // 蓝色滑雪板
        1022047, 3, // 猫头鹰
        3010051, 1, // 沙漠兔子1靠垫
        3010020, 1, // 澎澎檜木桶
        2040914, 1, // 盾牌攻击卷轴60%

        1432011, 3, // 寒冰破魔枪
        1442020, 3, // 巨灵开山斧
        1382035, 3, // 冰肌玲珑杖
        1372010, 3, // 嗜魂法杖
        1332027, 3, // 飞羽刃
        1302056, 3, // 一刀两断
        1402005, 3, // 斩魔刀
        1472053, 3, // 逆龙咆哮拳
        1462018, 3, // 红炎神机弩
        1452017, 3, // 魔翼之弓
        1422013, 3, // 狮子之魂
        1322029, 3, // 雷神钉
        1412010, 3, // 项羽之斧

        1472051, 1, // 寒木升龙拳
        1482013, 1, // 撕裂者
        1492013, 1, // 枭龙

        1382049, 1, // 朱雀长杖
        1382050, 1, // 玄武长杖
        1382051, 1, // 白虎长杖
        1382052, 1, // 青龙长杖
        1382045, 1, // 火灵珠长杖
        1382046, 1, // 毒灵珠长杖
        1382047, 1, // 冰灵珠长杖
        1382048, 1, // 雷灵珠长杖

        1372035, 1, // 火灵珠短杖
        1372036, 1, // 毒灵珠短杖
        1372037, 1, // 冰灵珠短杖
        1372038, 1, // 雷灵珠短杖
        1372039, 1, // 爆炎之杖
        1372040, 1, // 剧毒之杖
        1372041, 1, // 寒冰之杖
        1372042, 1, // 狂雷之杖
        1332032, 8, // 圣诞树
        1482025, 7, // 粉色花边游泳圈

        4001011, 8, // 猴子橡皮擦
        4001010, 8, // 蘑菇王橡皮擦
        4001009, 8, // 木妖橡皮擦

        2047000, 1, // 单手武器攻击力制炼书
        2047001, 1, // 单手武器命中率制炼书
        2047002, 1, // 单手武器魔力制炼书
        2047100, 1, // 双手武器攻击力制炼书
        2047101, 1, // 双手武器命中率制炼书
        2047102, 1, // 双手武器魔力制炼书

        2047200, 1, // 防具力量制炼书
        2047201, 1, // 防具智力制炼书
        2047202, 1, // 防具敏捷制炼书
        2047203, 1, // 防具运气制炼书
        2047204, 1, // 防具手技制炼书
        2047205, 1, // 防具体力制炼书
        2047206, 1, // 防具魔力制炼书
        2047207, 1, // 防具防御力制炼书
        2047208, 1, // 防具命中率制炼书

        2047300, 1, // 饰品力量制炼书
        2047301, 1, // 饰品智力制炼书
        2047302, 1, // 饰品敏捷制炼书
        2047303, 1, // 饰品运气制炼书
        2047304, 1, // 饰品手技制炼书
        2047305, 1, // 饰品跳跃力制炼书
        2047306, 1, // 饰品命中率制炼书
        2047307, 1, // 饰品回避率制炼书
        2047308, 1, // 饰品体力制炼书
        2047309, 1, // 饰品魔力制炼书

        2046004, 1, // 一级单手武器攻击卷轴
        2046005, 1, // 一级单手武器魔力卷轴
        2046104, 1, // 一级双手武器攻击卷轴
        2046105, 1, // 一级双手武器魔力卷轴
        2046208, 1, // 一级防具力量卷轴
        2046209, 1, // 一级防具智力卷轴
        2046210, 1, // 一级防具敏捷卷轴
        2046211, 1, // 一级防具运气卷轴
        2046212, 1, // 一级防具体力卷轴
        //list
        1002801, 2, // 深蓝头巾
        1102205, 2, // 绯红之心披风
        1402046, 2, // 永恒玄冥剑
        1402047, 2, // 重生玄冥剑
        1462054, 2, // 雷光剑
        1462055, 2, // 焰光剑
        1472074, 2, // 神秘亚历山大之剑
        //pro raven
        1332077, 1, // 幽暗鸦之喙
        1402049, 1, // 幽暗鸦之翼
        1462053, 1, // 幽暗鸦之瞳
        1472072, 1, // 幽暗鸦之爪
        1492047, 1, // 幽暗鸦之铳
        //-------------------------------------
        1032080, 20, // 一代不速之客耳环
        1032081, 15, // 二代不速之客耳环
        1032082, 10, // 三代不速之客耳环
        1032083, 5, // 末代不速之客耳环
        1032084, 1, // 至尊不速之客耳环
        1112435, 20, // 一代不速之客戒指
        1112436, 15, // 二代不速之客戒指
        1112437, 10, // 三代不速之客戒指
        1112438, 5, // 末代不速之客戒指
        1112439, 1, // 至尊不速之客戒指
        1122081, 20, // 一代不速之客项链
        1122082, 15, // 二代不速之客项链
        1122083, 10, // 三代不速之客项链
        1122084, 5, // 末代不速之客项链
        1122085, 1, // 至尊不速之客项链
        1132036, 20, // 一代不速之客腰带
        1132037, 15, // 二代不速之客腰带
        1132038, 10, // 三代不速之客腰带
        1132039, 5, // 末代不速之客腰带
        1132040, 1, // 至尊不速之客腰带
        //source
        1092070, 40, // 一代不速之客战士盾
        1092071, 30, // 二代不速之客战士盾
        1092072, 20, // 三代不速之客战士盾
        1092073, 10, // 末代不速之客战士盾
        1092074, 1, // 至尊不速之客战士盾
        1092075, 40, // 一代不速之客法师盾
        1092076, 30, // 二代不速之客法师盾
        1092077, 20, // 三代不速之客法师盾
        1092078, 10, // 末代不速之客法师盾
        1092079, 1, // 至尊不速之客法师盾
        1092080, 40, // 一代不速之客飞侠盾
        1092081, 30, // 二代不速之客飞侠盾
        1092082, 20, // 三代不速之客飞侠盾
        1092083, 10, // 末代不速之客飞侠盾
        1092084, 1, // 至尊不速之客飞侠盾
        1092087, 1, // 战神勇士盾
        1092088, 1, // 战神黑暗盾
        1302143, 40, // 一代不速之客单手剑
        1302144, 30, // 二代不速之客单手剑
        1302145, 20, // 三代不速之客单手剑
        1302146, 10, // 末代不速之客单手剑
        1302147, 1, // 至尊不速之客单手剑
        1312058, 40, // 一代不速之客单手斧
        1312059, 30, //
        1312060, 20, //
        1312061, 10, //
        1312062, 1, //
        1322086, 40, // 一代不速之客单手钝器
        1322087, 30, //
        1322088, 20, //
        1322089, 10, //
        1322090, 1, //
        1332116, 40, // 一代不速之客短剑-运
        1332117, 30, //
        1332118, 20, //
        1332119, 10, //
        1332120, 1, //
        1332121, 40, // 一代不速之客短剑-力
        1332122, 30, //
        1332123, 20, //
        1332124, 10, //
        1332125, 1, //
        1342029, 40, // 一代不速之客刀
        1342030, 30, //
        1342031, 20, //
        1342032, 10, //
        1342033, 1, //
        1372074, 40, // 一代不速之客短杖
        1372075, 30, //
        1372076, 20, //
        1372077, 10, //
        1372078, 1, //
        1382095, 40, // 一代不速之客长杖
        1382096, 30, //
        1382097, 20, //
        1382098, 10, //
        1392099, 1, //
        1402086, 40, // 一代不速之客双手剑
        1402087, 30, //
        1402088, 20, //
        1402089, 10, //
        1402090, 1, //
        1412058, 40, // 一代不速之客双手斧
        1412059, 30, //
        1412060, 20, //
        1412061, 10, //
        1412062, 1, //
        1422059, 40, // 一代不速之客双手钝器
        1422060, 30, //
        1422061, 20, //
        1422062, 10, //
        1422063, 1, //
        1432077, 40, // 一代不速之客枪
        1432078, 30, //
        1432079, 20, //
        1432080, 10, //
        1432081, 1, //
        1442107, 40, // 一代不速之客矛
        1442108, 30, //
        1442109, 20, //
        1442110, 10, //
        1442111, 1, //
        1452102, 40, // 一代不速之客弓
        1452103, 30, //
        1452104, 20, //
        1452105, 10, //
        1452106, 1, //
        1462087, 40, // 一代不速之客弩
        1462088, 30, //
        1462089, 20, //
        1462090, 10, //
        1462091, 1, //
        1472113, 40, // 一代不速之客 拳套
        1472114, 30, //
        1472115, 20, //
        1472116, 10, //
        1472117, 1, //
        1482075, 40, // 一代不速之客 指节
        1482076, 30, //
        1482077, 20, //
        1482078, 10, //
        1482079, 1, //
        1492075, 40, // 一代不速之客短枪
        1492076, 30, //
        1492077, 20, //
        1492078, 10, //
        1492079, 1, //
        1132012, 2, // 法老的腰带
        1132013, 1, // 不灭的法老腰带
        //-------------------------------------
        1032031, 1, // 永恒金盾坠
        1102172, 1, // 永恒不灭披风
        1002776, 1, // 永恒冠军盔
        1002777, 1, // 永恒玄妙帽
        1002778, 1, // 永恒霓翎帽
        1002779, 1, // 永恒迷踪帽
        1002780, 1, // 永恒海王星
        1082234, 1, // 永恒定边手套
        1082235, 1, // 永恒逍遥手套
        1082236, 1, // 永恒白云手套
        1082237, 1, // 永恒探云手套
        1082238, 1, // 永恒抚浪手套
        1052155, 1, // 永恒演武铠
        1052156, 1, // 永恒奥神袍
        1052157, 1, // 永恒巡礼者
        1052158, 1, // 永恒翻云服
        1052159, 1, // 永恒霸七海
        1072355, 1, // 永恒坚壁靴
        1072356, 1, // 永恒缥缈鞋
        1072357, 1, // 永恒彩虹鞋
        1072358, 1, // 永恒舞空靴
        1072359, 1, // 永恒定海靴
        1092057, 1, // 永恒魔光盾
        1092058, 1, // 永恒寒冰盾
        1092059, 1, // 永恒匿踪盾
        1122012, 1, // 永恒玉佩
        1302081, 1, // 永恒破甲剑
        1312037, 1, // 永恒断蚺斧
        1322060, 1, // 永恒惊破天
        1332073, 1, // 永恒狂鲨锯
        1332074, 1, // 永恒断首刃
        1372044, 1, // 永恒蝶翼杖
        1382057, 1, // 永恒冰轮杖
        1402046, 1, // 永恒玄冥剑
        1412033, 1, // 永恒碎鼋斧
        1422037, 1, // 永恒威震天
        1432047, 1, // 永恒显圣枪
        1442063, 1, // 永恒神光戟
        1452057, 1, // 永恒惊电弓
        1462050, 1, // 永恒冥雷弩
        1472068, 1, // 永恒大悲赋
        1482023, 1, // 永恒孔雀翎
        1492023, 1, // 永恒凤凰铳
        1342011, 1, // 永恒之刃
        1522015, 1, // 永恒鲜花弩枪
        1532015, 1, // 永恒拯救者
        //-------------------------
        //头盔
        1003280, 1, // 深渊冠军盔
        1003281, 1, // 深渊玄妙帽
        1003282, 1, // 深渊霓翎帽
        1003283, 1, // 深渊迷踪帽
        1003284, 1, // 深渊海王星
        //衣服
        1052374, 1, // 深渊演武铠
        1052375, 1, // 深渊奥神袍
        1052376, 1, // 深渊巡礼者
        1052377, 1, // 深渊翻云服
        1052378, 1, // 深渊霸七海
        //鞋子
        1072544, 1, // 深渊坚壁靴
        1072545, 1, // 深渊缥缈鞋
        1072546, 1, // 深渊彩虹鞋
        1072547, 1, // 深渊舞空靴
        1072548, 1, // 深渊定海靴
        //手套
        1082328, 1, // 深渊定边手套
        1082329, 1, // 深渊逍遥手套
        1082330, 1, // 深渊白云手套
        1082331, 1, // 深渊探云手套
        1082332, 1, // 深渊抚浪手套
        //武器
        1302173, 1, // 深渊破甲剑
        1312072, 1, // 深渊断蚺斧
        1322107, 1, // 深渊惊破天
        1332148, 1, // 深渊狂鲨锯
        1332149, 1, // 深渊断首刃
        1342040, 1, // 深渊之刃
        1372100, 1, // 深渊蝶翼杖
        1382124, 1, // 深渊冰轮杖
        1402111, 1, // 深渊玄冥剑
        1412071, 1, // 深渊碎鼋斧
        1422073, 1, // 深渊威震天
        1432099, 1, // 深渊显圣枪
        1442136, 1, // 深渊神光戟
        1452129, 1, // 深渊惊电弓
        1462118, 1, // 深渊冥雷弩
        1472141, 1, // 深渊大悲赋
        1482102, 1, // 深渊孔雀翎
        1492101, 1, // 深渊凤凰铳
        1522020, 1, // 深渊鲜花弩枪
        1532037, 1, // 深渊拯救者
        1942004, 1, // 深渊面罩
        1952004, 1, // 深渊吊坠
        1962004, 1, // 深渊之翼
        1972004, 1, // 深渊之尾
        //---------------------------
        2030008, 5, // 咖啡牛奶
        1442018, 3, // 冻冻鱼
        2040900, 4, // 盾牌防御卷轴
        2049100, 10, // 混沌卷轴60%
        2000005, 10, // 超级药水
        2000004, 10, // 特殊药水
        2430144, 10, // 秘密能手册
        2290285, 10, // [能手册]神秘能手册
        2028061, 10, // 不可思议的卷轴卷
        2028062, 10, // 不可思议的配方卷
        2530000, 5 // 幸运日卷轴
    }; // Gold Box
    public final static int[] silverrewards = {
        2049401, 2, // 潜能附加卷轴
        2049301, 2, // 装备强化卷轴
        3010041, 1, // 骷髅王座
        1002452, 6, // 黑星白头巾
        1002455, 6, // 黑星红头巾
        2290084, 1, // [能手册]三连环光击破 20
        2290048, 1, // [能手册]圣光普照 20
        2290040, 1, // [能手册]天降落星 20
        2290046, 1, // [能手册]落霜冰破 20
        2290074, 1, // [能手册]一击要害箭 20
        2290064, 1, // [能手册]进阶终极攻击20
        2290094, 1, // [能手册]烟雾弹 20
        2290022, 1, // [能手册]黑暗力量 20
        2290056, 1, // [能手册]神箭手 20
        2290066, 1, // [能手册]神弩手 20
        2290020, 1, // [能手册]圣域 20
        1102082, 1, // 破旧的黑色披风
        1302049, 1, // 光线鞭子
        1102041, 1, // 浪人披风(粉)
        1452019, 2, // 天鹰弓(白)
        4001116, 3, // 六角水晶项链
        4001012, 3, // 大幽灵橡皮擦
        1022060, 2, // 狐猴
        2430144, 5, // 秘密能手册
        2290285, 5, // [能手册]神秘能手册
        2028062, 5, // 不可思议的卷轴卷
        2028061, 5, // 不可思议的配方卷
        2530000, 1, // 幸运日卷轴
        2041100, 1, // 戒指力量卷轴
        2041101, 1, // 戒指力量卷轴
        2041102, 1, // 戒指力量卷轴10%
        2041103, 1, // 戒指智力卷轴
        2041104, 1, // 戒指智力卷轴
        2041105, 1, // 戒指智力卷轴10%
        2041106, 1, // 戒指敏捷卷轴
        2041107, 1, // 戒指敏捷卷轴
        2041108, 1, // 戒指敏捷卷轴10%
        2041109, 1, // 戒指运气卷轴
        2041110, 1, // 戒指运气卷轴
        2041111, 1, // 戒指运气卷轴10%
        2041112, 1, // 戒指力量卷轴
        2041113, 1, // 戒指力量卷轴
        2041114, 1, // 戒指智力卷轴
        2041115, 1, // 戒指智力卷轴
        2041116, 1, // 戒指敏捷卷轴
        2041117, 1, // 戒指敏捷卷轴
        2041118, 1, // 戒指运气卷轴
        2041119, 1, // 戒指运气卷轴
        2041300, 1, // 腰带力量卷轴100%
        2041301, 1, // 腰带力量卷轴60%
        2041302, 1, // 腰带力量卷轴10%
        2041303, 1, // 腰带智力卷轴100%
        2041304, 1, // 腰带智力卷轴60%
        2041305, 1, // 腰带智力卷轴10%
        2041306, 1, // 腰带敏捷卷轴100%
        2041307, 1, // 腰带敏捷卷轴60%
        2041308, 1, // 腰带敏捷卷轴10%
        2041309, 1, // 腰带运气卷轴100%
        2041310, 1, // 腰带运气卷轴60%
        2041311, 1, // 腰带运气卷轴10%
        2041312, 1, // 腰带力量卷轴70%
        2041313, 1, // 腰带力量卷轴30%
        2041314, 1, // 腰带智力卷轴70%
        2041315, 1, // 腰带智力卷轴30%
        2041316, 1, // 腰带敏捷卷轴70%
        2041317, 1, // 腰带敏捷卷轴30%
        2041318, 1, // 腰带运气卷轴70%
        2041319, 1, // 腰带运气卷轴30%
        2049200, 1, // 配饰力量卷轴70%
        2049201, 1, // 配饰力量卷轴30%
        2049202, 1, // 配饰敏捷卷轴70%
        2049203, 1, // 配饰敏捷卷轴30%
        2049204, 1, // 配饰智力卷轴70%
        2049205, 1, // 配饰智力卷轴30%
        2049206, 1, // 配饰幸运卷轴70%
        2049207, 1, // 配饰幸运卷轴30%
        2049208, 1, // 配饰HP卷轴70%
        2049209, 1, // 配饰HP卷轴30%
        2049210, 1, // 配饰MP卷轴70%
        2049211, 1, // 配饰MP卷轴30%
        1432011, 3, // 寒冰破魔枪
        1442020, 3, // 巨灵开山斧
        1382035, 3, // 冰肌玲珑杖
        1372010, 3, // 嗜魂法杖
        1332027, 3, // 飞羽刃
        1302056, 3, // 一刀两断
        1402005, 3, // 斩魔刀
        1472053, 3, // 逆龙咆哮拳
        1462018, 3, // 红炎神机弩
        1452017, 3, // 魔翼之弓
        1422013, 3, // 狮子之魂
        1322029, 3, // 雷神钉
        1412010, 3, // 项羽之斧
        //-------------------------------------
        1032080, 20, // 一代不速之客耳环
        1032081, 15, // 二代不速之客耳环
        1032082, 10, // 三代不速之客耳环
        1032083, 5, // 末代不速之客耳环
        1032084, 1, // 至尊不速之客耳环
        1112435, 20, // 一代不速之客戒指
        1112436, 15, // 二代不速之客戒指
        1112437, 10, // 三代不速之客戒指
        1112438, 5, // 末代不速之客戒指
        1112439, 1, // 至尊不速之客戒指
        1122081, 20, // 一代不速之客项链
        1122082, 15, // 二代不速之客项链
        1122083, 10, // 三代不速之客项链
        1122084, 5, // 末代不速之客项链
        1122085, 1, // 至尊不速之客项链
        1132036, 20, // 一代不速之客腰带
        1132037, 15, // 二代不速之客腰带
        1132038, 10, // 三代不速之客腰带
        1132039, 5, // 末代不速之客腰带
        1132040, 1, // 至尊不速之客腰带
        //source
        1092070, 40, // 一代不速之客战士盾
        1092071, 30, // 二代不速之客战士盾
        1092072, 20, // 三代不速之客战士盾
        1092073, 10, // 末代不速之客战士盾
        1092074, 1, // 至尊不速之客战士盾
        1092075, 40, // 一代不速之客法师盾
        1092076, 30, // 二代不速之客法师盾
        1092077, 20, // 三代不速之客法师盾
        1092078, 10, // 末代不速之客法师盾
        1092079, 1, // 至尊不速之客法师盾
        1092080, 40, // 一代不速之客飞侠盾
        1092081, 30, // 二代不速之客飞侠盾
        1092082, 20, // 三代不速之客飞侠盾
        1092083, 10, // 末代不速之客飞侠盾
        1092084, 1, // 至尊不速之客飞侠盾
        1092087, 1, // 战神勇士盾
        1092088, 1, // 战神黑暗盾
        1302143, 40, // 一代不速之客单手剑
        1302144, 30, // 二代不速之客单手剑
        1302145, 20, // 三代不速之客单手剑
        1302146, 10, // 末代不速之客单手剑
        1302147, 1, // 至尊不速之客单手剑
        1312058, 40, // 一代不速之客单手斧
        1312059, 30, //
        1312060, 20, //
        1312061, 10, //
        1312062, 1, //
        1322086, 40, // 一代不速之客单手钝器
        1322087, 30, //
        1322088, 20, //
        1322089, 10, //
        1322090, 1, //
        1332116, 40, // 一代不速之客短剑-运
        1332117, 30, //
        1332118, 20, //
        1332119, 10, //
        1332120, 1, //
        1332121, 40, // 一代不速之客短剑-力
        1332122, 30, //
        1332123, 20, //
        1332124, 10, //
        1332125, 1, //
        1342029, 40, // 一代不速之客刀
        1342030, 30, //
        1342031, 20, //
        1342032, 10, //
        1342033, 1, //
        1372074, 40, // 一代不速之客短杖
        1372075, 30, //
        1372076, 20, //
        1372077, 10, //
        1372078, 1, //
        1382095, 40, // 一代不速之客长杖
        1382096, 30, //
        1382097, 20, //
        1382098, 10, //
        1392099, 1, //
        1402086, 40, // 一代不速之客双手剑
        1402087, 30, //
        1402088, 20, //
        1402089, 10, //
        1402090, 1, //
        1412058, 40, // 一代不速之客双手斧
        1412059, 30, //
        1412060, 20, //
        1412061, 10, //
        1412062, 1, //
        1422059, 40, // 一代不速之客双手钝器
        1422060, 30, //
        1422061, 20, //
        1422062, 10, //
        1422063, 1, //
        1432077, 40, // 一代不速之客枪
        1432078, 30, //
        1432079, 20, //
        1432080, 10, //
        1432081, 1, //
        1442107, 40, // 一代不速之客矛
        1442108, 30, //
        1442109, 20, //
        1442110, 10, //
        1442111, 1, //
        1452102, 40, // 一代不速之客弓
        1452103, 30, //
        1452104, 20, //
        1452105, 10, //
        1452106, 1, //
        1462087, 40, // 一代不速之客弩
        1462088, 30, //
        1462089, 20, //
        1462090, 10, //
        1462091, 1, //
        1472113, 40, // 一代不速之客 拳套
        1472114, 30, //
        1472115, 20, //
        1472116, 10, //
        1472117, 1, //
        1482075, 40, // 一代不速之客 指节
        1482076, 30, //
        1482077, 20, //
        1482078, 10, //
        1482079, 1, //
        1492075, 40, // 一代不速之客短枪
        1492076, 30, //
        1492077, 20, //
        1492078, 10, //
        1492079, 1, //
        1132012, 2, // 法老的腰带
        1132013, 1, // 不灭的法老腰带
        //--------------------------------
        1002790, 1, // 重生冠军盔
        1002791, 1, // 重生玄妙帽
        1002792, 1, // 重生霓翎帽
        1002793, 1, // 重生迷踪帽
        1002794, 1, // 重生海王星
        1082239, 1, // 重生定边手套
        1082240, 1, // 重生逍遥手套
        1082241, 1, // 重生白云手套
        1082242, 1, // 重生探云手套
        1082243, 1, // 重生抚浪手套
        1052160, 1, // 重生演武铠
        1052161, 1, // 重生奥神袍
        1052162, 1, // 重生巡礼者
        1052163, 1, // 重生翻云服
        1052164, 1, // 重生霸七海
        1072361, 1, // 重生坚壁靴
        1072362, 1, // 重生缥缈鞋
        1072363, 1, // 重生彩虹鞋
        1072364, 1, // 重生舞空靴
        1072365, 1, // 重生定海靴
        1302086, 1, // 重生破甲剑
        1312038, 1, // 重生断蚺斧
        1322061, 1, // 重生惊破天
        1332075, 1, // 重生狂鲨锯
        1332076, 1, // 重生断首刃
        1372045, 1, // 重生蝶翼杖
        1382059, 1, // 重生冰轮杖
        1402047, 1, // 重生玄冥剑
        1412034, 1, // 重生碎鼋斧
        1422038, 1, // 重生威震天
        1432049, 1, // 重生显圣枪
        1442067, 1, // 重生神光戟
        1452059, 1, // 重生惊电弓
        1462051, 1, // 重生冥雷弩
        1472071, 1, // 重生大悲赋
        1482024, 1, // 重生孔雀翎
        1492025, 1, // 重生凤凰铳
        1342012, 1, // 重生之刃
        1942002, 1, // 重生面罩
        1952002, 1, // 重生吊坠
        1962002, 1, // 重生飞翼
        1972002, 1, // 重生尾巴
        1522016, 1, // 重生鲜花弩枪
        1532016, 1, // 重生拯救者
        //-------------------------
        1002587, 3, // 黑色烤栗贩帽子
        1402044, 1, // 南瓜灯笼
        2101013, 4, // 昭和BOSS召唤
        1442046, 1, // 超级滑雪板
        1422031, 1, // 蓝色海豹抱枕
        1332054, 3, // 闪电飞刀
        1012056, 3, // 狗狗鼻
        1022047, 3, // 猫头鹰
        3012002, 1, // 浴桶
        1442012, 3, // 天空雪板
        1442018, 3, // 冻冻鱼
        1432010, 3, // 奥丁手戟
        2000005, 10, // 超级药水
        2049100, 10, // 混沌卷轴60%
        2000004, 10 // 特殊药水
    }; // Silver Box
    public final static int[] peanuts = {
        //2430091, 50, ,// 梦魇使用券
        //2430092, 50, ,// 白雪人骑宠使用券
        //2430093, 50, ,// 鸵鸟骑宠使用券
        //2430101, 50, ,// 粉红熊热气球使用券
        //2430102, 50, ,// 变形金刚使用券
        //2430136, 50, ,// 猫头鹰骑宠15天权
        //2430149, 50, ,// 雄狮骑宠30日使用权

        1152000, 30, // 虎爪
        1152001, 10, // 黑虎爪
        1152060, 10, // 冒险岛宝石护肩
        1152061, 10, // 冒险岛铂金护肩
        3010019, 10, // 寿司椅

        2040211, 30, // 龙眼镜专用卷轴
        2040212, 10, // 龙眼镜专用特殊卷轴
        1022097, 20, // 龙眼镜

        2049000, 30, // 白医卷轴
        2049001, 30, // 白医卷轴
        2049002, 30, // 白医卷轴

        1332100, 100, // 纳格林之刃
        1382058, 100, // 毁灭之杖
        1402073, 100, // 阿斯卡隆圣剑
        1432066, 100, // 贝伦之枪
        1442090, 100, // 女巫之矛
        1452058, 100, // 水精灵弓
        1462076, 100, // 地狱之弩
        1472069, 100, // 神秘拳套
        1482051, 100, // 钻心指节
        1492024, 100, // 暴风手枪

        2028062, 50, // 不可思议的配方卷
        2028061, 50, // 不可思议的卷轴卷
        2530000, 20, // 幸运日卷轴

        1032083, 50, // 末代不速之客耳环
        1032084, 20, // 至尊不速之客耳环
        1112439, 20, // 至尊不速之客戒指
        1122084, 50, // 末代不速之客项链
        1122085, 20, // 至尊不速之客项链
        1132039, 50, // 末代不速之客腰带
        1132040, 20, // 至尊不速之客腰带
        //source
        1092073, 50, // 末代不速之客战士盾
        1092074, 20, // 至尊不速之客战士盾
        1092078, 40, // 末代不速之客法师盾
        1092079, 20, // 至尊不速之客法师盾
        1092083, 40, // 末代不速之客飞侠盾
        1092084, 20, // 至尊不速之客飞侠盾
        1092087, 50, // 战神勇士盾
        1092088, 50, // 战神黑暗盾
        1302146, 40, // 末代不速之客单手剑
        1302147, 20, // 至尊不速之客单手剑
        1312059, 30, //
        1312060, 20, //
        1312061, 10, //
        1312062, 1, //
        1322087, 30, //
        1322088, 20, //
        1322089, 10, //
        1322090, 1, //
        1332117, 30, //
        1332118, 20, //
        1332119, 10, //
        1332120, 1, //
        1332122, 30, //
        1332123, 20, //
        1332124, 10, //
        1332125, 1, //
        1342030, 30, //
        1342031, 20, //
        1342032, 10, //
        1342033, 1, //
        1372075, 30, //
        1372076, 20, //
        1372077, 10, //
        1372078, 1, //
        1382096, 30, //
        1382097, 20, //
        1382098, 10, //
        1392099, 1, //
        1402087, 30, //
        1402088, 20, //
        1402089, 10, //
        1402090, 1, //
        1412059, 30, //
        1412060, 20, //
        1412061, 10, //
        1412062, 1, //
        1422060, 30, //
        1422061, 20, //
        1422062, 10, //
        1422063, 1, //
        1432078, 30, //
        1432079, 20, //
        1432080, 10, //
        1432081, 1, //
        1442108, 30, //
        1442109, 20, //
        1442110, 10, //
        1442111, 1, //
        1452103, 30, //
        1452104, 20, //
        1452105, 10, //
        1452106, 1, //
        1462088, 30, //
        1462089, 20, //
        1462090, 10, //
        1462091, 1, //
        1472114, 30, //
        1472115, 20, //
        1472116, 10, //
        1472117, 1, //
        1482076, 30, //
        1482077, 20, //
        1482078, 10, //
        1482079, 1, //
        1492076, 30, //
        1492077, 20, //
        1492078, 10, //
        1492079, 1, //
        1972002, 2, //
        1612004, 2, //
        1622004, 2, //
        1632004, 2, //
        1642004, 2, //
        1652004, 2, //
        2047000, 1, //
        2047001, 1, //
        2047002, 1, //
        2047100, 1, //
        2047101, 1, //
        2047102, 1, //
        2047200, 1, //
        2047201, 1, //
        2047202, 1, //
        2047203, 1, //
        2047204, 1, //
        2047205, 1, //
        2047206, 1, //
        2047207, 1, //
        2047208, 1, //
        2047300, 1, //
        2047301, 1, //
        2047302, 1, //
        2047303, 1, //
        2047304, 1, //
        2047305, 1, //
        2047306, 1, //
        2047307, 1, //
        2047308, 1, //
        2047309, 1, //
        2046004, 1, //
        2046005, 1,
        2046104, 1,
        2046105, 1,
        2046208, 1,
        2046209, 1,
        2046210, 1,
        2046211, 1,
        2046212, 1,
        2049200, 1,
        2049201, 1,
        2049202, 1,
        2049203, 1,
        2049204, 1,
        2049205, 1,
        2049206, 1,
        2049207, 1,
        2049208, 1,
        2049209, 1,
        2049210, 1,
        2049211, 1,
        //ele staff
        1382049, 100, // 朱雀长杖
        1382050, 150, // 玄武长杖
        1382051, 100, // 白虎长杖
        1382052, 150, // 青龙长杖
        2040006, 20, //头盔防御必成卷
        2040007, 20, //头盔体力必成卷
        2040403, 20, //上衣防御必成卷
        2040506, 2, //全身盔甲敏捷必成卷
        2040507, 2, //全身盔甲防御必成卷
        2040603, 20, //裤裙防御必成卷
        2040507, 20, //全身盔甲防御必成卷
        2040603, 20, //裤裙防御必成卷
        2040709, 2, //鞋子敏捷必成卷
        2040710, 2, //鞋子跳跃必成卷
        2040711, 2, //鞋子速度必成卷
        2040806, 2, //手套敏捷必成卷
        2040903, 20, //盾牌防御必成卷
        2040507, 20, //全身盔甲防御必成卷
        2040603, 20, //裤裙防御必成卷
        2041024, 20, //披风魔法防御必成卷
        2041025, 20, //披风物理防御必成卷
        2043003, 2, //单手剑攻击必成卷
        2044019, 2, //双手剑魔力必成卷
        2044019, 2, //双手剑魔力必成卷
        2043103, 2, //单手斧攻击必成卷
        2043203, 2, //单手钝器攻击必成卷
        2043303, 2, //短剑攻击必成卷
        2043703, 2, //短杖攻击必成卷
        2043803, 2, //长杖攻击必成卷
        2044003, 2, //双手剑攻击必成卷
        2044019, 2, //双手剑魔力必成卷
        2044103, 2, //双手斧攻击必成卷
        2040903, 20, //盾牌防御必成卷
        2040903, 20, //盾牌防御必成卷
        2044203, 2, //双手钝器攻击必成卷
        2044303, 2, //枪攻击必成卷
        2044403, 2, //矛攻击必成卷
        2044503, 2, //弓攻击必成卷
        2044603, 2, //弩攻击必成卷
        2044703, 2, //拳套攻击必成卷
        2044815, 2, //指节攻击必成卷
        2044908, 2, //短枪攻击必成卷
        2340000, 2, //祝福卷轴
        2049406, 10, //特殊潜能附加卷轴
        2049303, 10, //高级装备强化卷轴
        3010070, 1, //巨无霸品克缤
        3010073, 1, //baby品克缤
        3010073, 1, //baby品克缤
        1402014, 1, //温度计
        1003172, 2, //狮心战斗头盔
        1102275, 2, //狮心战斗披风
        1082295, 2, //狮心战斗护腕
        1052314, 2, //狮心战斗锁子甲
        1072485, 2, //狮心战斗鞋
        1003173, 2, //龙尾法师帽子
        1102276, 2, //龙尾法师披风
        1082296, 2, //龙尾法师手套
        1052315, 2, //龙尾法师长袍
        1072486, 2, //龙尾法师鞋
        1003174, 2, //鹰翼哨兵便帽
        1102277, 2, //鹰翼哨兵披风
        1082297, 2, //鹰翼哨兵手套
        1052316, 2, //鹰翼哨兵服
        1072487, 2, //鹰翼哨兵鞋
        1003175, 2, //渡鸦之魂追踪者帽
        1102278, 2, //渡鸦之魂猎人披风
        1082298, 2, //渡鸦之魂追踪者手套
        1052317, 2, //渡鸦之魂追踪者盔甲
        1072488, 2, //渡鸦之魂追踪者鞋
        1003176, 2, //鲨齿船长帽
        1102279, 2, //鲨齿船长披风
        1082299, 2, //鲨齿船长手套
        1052318, 2, //鲨齿船长外套
        1072489, 2, //鲨齿船长鞋
        1432086, 2, //狮心长枪
        1442116, 2, //狮心长矛
        1322096, 2, //狮心震雷
        1422066, 2, //狮心巨锤
        1402095, 2, //狮心战刀
        1412065, 2, //狮心战斧
        1302152, 2, //狮心弯刀
        1312065, 2, //狮心勇斧
        1372084, 2, //龙尾短杖
        1382104, 2, //龙尾长杖
        1452111, 2, //鹰翼重弓
        1462099, 2, //鹰翼重弩
        1332130, 2, //渡鸦之魂（短刀）
        1472122, 2, //渡鸦之魂
        1342036, 2, //精灵角刀
        1492085, 2, //鲨齿手铳
        1532018, 2, //鲨齿鹰爪
        1302016, 2, //鲨齿火炮

        3010000, 10, //休闲椅, 10,,//坐在休闲椅上，每10秒可恢复HP 50。\n#c无法进行交换或交易#。
        3010001, 10, //蓝色木椅, 10,,//只有在明珠港制作贩卖的蓝色木椅。坐在上面每10秒可恢复HP 35。
        3010002, 10, //绿色时尚转椅, 10,,//非常舒服的转椅，每10秒可恢复HP50.
        3010003, 10, //红色时尚转椅, 10,,//非常舒服的转椅，每10秒可恢复HP50.
        3010004, 10, //黄蓝休闲椅, 10,,//(无描述)
        3010005, 10, //红蓝休闲椅, 10,,//(无描述)
        3010006, 10, //黄色时尚转椅, 10,,//非常舒服的转椅，每10秒可恢复HP50.
        3010209, 10, //香草冰淇淋月饼椅子, 10,,//晶莹剔透的香草口味冰淇淋月饼，好好看舍不得吃呀，偷偷咬一口好了。中秋节快乐！\n每10秒恢复HP、MP各30
        3010210, 10, //草莓冰淇淋月饼椅子, 10,,//晶莹剔透的草莓口味冰淇淋月饼，好好看舍不得吃呀，偷偷咬一口好了。中秋节快乐！\n每10秒恢复HP、MP各30
        3010007, 10, //粉色海豹靠垫, 10,,//是一款可爱的粉色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010008, 10, //蓝色海豹靠垫, 10,,//是一款可爱的蓝色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010009, 10, //榻榻凳, 10,,//有着心型靠垫的可爱的凳子．坐着的时候每10秒回复HP 20, MP 30
        3010010, 10, //白色海豹靠垫, 10,,//是一款可爱的白色海豹模样的靠垫，靠在上面每10秒钟HP恢复50。
        3010012, 10, //剑士 宝座, 10,,//力量强大，可治愈受伤伤口的椅子，通常使用在战场上。每10秒可恢复 60 HP。\n#c不能买卖或丢弃。#
        3010013, 10, //悠长假期, 10,,//坐在上面可享受悠闲的悠长假期，每10秒钟恢复MP20.
        3010014, 10, //月亮弯, 10,,//每10秒钟恢复HP&MP30，无法交换&交易.
        3010016, 10, //黑色海豹靠垫, 10,,//是一款可爱的黑色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010294, 10, //黑色海豹靠垫（可交易）, 10,,//是一款可爱的黑色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010017, 10, //金色海豹靠垫, 10,,//是一款可爱的金色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010295, 10, //金色海豹靠垫（可交易）, 10,,//是一款可爱的金色海豹模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010018, 10, //椰子树沙滩椅, 10,//放置在阿里安特凉爽的椰子树树荫下的沙滩椅。坐下时，每10秒中，恢复HP 40, MP 20。
        3010019, 10, //寿司椅, 10,//每10分钟恢复MP60，无法交换&交易.
        3010021, 10, //暖暖桌, 10,//每10秒钟恢复HP30、MP30。
        3010024, 10, //玩具粉熊椅, 10,//坐在玩具粉熊椅上面每10秒钟恢复HP 50.
        3010025, 10, //5周年枫叶纪念凳, 10,//为纪念冒险岛5周年生日而特制的凳子。坐在枫叶树下会自然而然地回忆起最初的感动。每10秒钟可恢复HP 35,MP 10。
        3010028, 10, //海盗的俘虏, 10,//每10秒钟恢复HP50，可交易。
        3010029, 10, //蓝环凳, 10,//闪耀着蓝色光芒的圆环凳子
        3010030, 10, //黑环凳, 10,//闪耀着黑色光芒的圆环凳子
        3010031, 10, //红环凳, 10,//闪耀着红色光芒的圆环凳子
        3010032, 10, //黄环凳, 10,//闪耀着黄色光芒的圆环凳子
        3010033, 10, //绿环凳, 10,//闪耀着绿色光芒的圆环凳子
        3010034, 10, //悠长假期(红色), 10,//坐在上面可享受悠闲的红色悠长假期,每10秒钟恢复MP 20.
        3010035, 10, //悠长假期(蓝色), 10,//坐在上面可享受悠闲的蓝色悠长假期,每10秒钟恢复MP 20.
        3010036, 10, //浪漫秋千, 10,//坐在上面就会使人不知不觉回忆起童年的往事。每10秒恢复HP 50。
        3010037, 10, //猪猪凳, 10,//拥有可爱大嘴巴的银色猪猪，传说拥有它的人会有好运噢。每10秒恢复HP 50。
        3010038, 10, //空气沙发, 10,//奇妙的感受，居然可以悬坐在空气中，是不是会有不可思议的效果呢？猜对了! 坐在空气沙发上,每10秒钟HP,MP 各恢复1000。
        3010039, 10, //黑色海狗靠垫, 10,//是一款可爱的黑色海狗模样的靠垫，靠在上面每10秒钟HP恢复60。
        3010040, 10, //蝙蝠椅, 10,//某神秘木匠精心雕刻的蝙蝠型椅子.坐在上面仿佛成了吸血鬼.每10秒钟可恢复HP50,MP50.
        3010041, 10, //骷髅王座, 10,//幽灵森林中以产量极低的枯木精心制作的显示地狱王者风范的王座。每10秒中恢复HP MP 50.
        3010043, 10, //魔女的飞扫把, 10,//魔女最爱用的飞扫把，坐在上面仿佛你也成了无所不能的小魔女。每10秒钟恢复MP 50.
        3010044, 10, //同一红伞下, 10,//坐下来每10秒钟恢复HP30,MP30.
        3010045, 10, //寒冰椅子, 10,//用雪之女王的冰片制作的凳子。坐下来每10秒钟恢复HP40,MP30.
        3010046, 10, //红龙椅, 10,//与红龙一起休息,每10秒可恢复HP 60.
        3010047, 10, //蓝龙椅, 10,//与蓝龙一起休息,每10秒可恢复MP 60.
        3010048, 10, //圣诞树椅子, 10,//坐在圣诞树椅子,每10秒可恢复MP 20.
        3010049, 10, //雪房子, 10,//南极考察队空运过来的用冰雪制作的小房子.每10秒钟恢复HP 20.
        3010199, 10, //雪房子, 10,//南极考察队空运过来的用冰雪制作的小房子.每10秒钟恢复HP 20.
        3010050, 10, //公主凳, 10,//专为公主设计的凳子,坐在上面每10秒钟可恢复HP,MP各20.
        3010051, 10, //沙漠兔子1靠垫, 10,//为纪念沙漠兔子而精心制作的靠垫。每10秒钟恢复HP,MP 10.
        3010052, 10 //沙漠兔子2靠垫, 10,//为纪念沙漠兔子而精心制作的靠垫。每10秒钟恢复HP,MP 10.
    };
    public static int[] eventCommonReward = {
        0, 10,
        1, 10,
        4, 5,
        //5060004, 25,
        4170024, 25, // 冰方块
        4280000, 5, // 永恒的谜之蛋
        4280001, 6, // 重生的谜之蛋
        5490000, 5, // 永恒的热度
        5490001, 6 // 重生的热度
    };
    public static int[] eventUncommonReward = {
        1, 4,
        2, 8,
        3, 8,
        //2022179, 5,
        5062000, 20, // 神奇魔方
        2430082, 20, // 花蘑菇7天使用券
        2430092, 20, // 白雪人骑宠使用券
        2022459, 2, // 星缘的奖励1
        2022460, 1, // 佳佳的报答1
        2022462, 1, // 佳佳的报答3
        //2430103, 2, //
        2430117, 2, // 狮子王(有效期1年)
        2430118, 2, // 田园红卡车  (有效期1年)
        2430201, 4, // 兔子骑宠3日券
        2430228, 4, // 兔兔加油骑宠（15天权）
        //2430229, 4, //
        2430283, 4, // 突击！木马10天使用券
        2430136, 4, //
        2430476, 4, //
        2430511, 4, //
        2430206, 4, //
        2430199, 1, //
        1032062, 5, //
        5220000, 28, //  //
        2022459, 5, //
        2022460, 5, //
        2022461, 5, //
        2022462, 5, //
        2022463, 5, //
        5050000, 2, //
        4080100, 10, //
        4080000, 10, //
        2049100, 10, //
        2430144, 10, //
        2290285, 10, //
        2028062, 10, //
        2028061, 10, //
        2530000, 5, //
        2531000, 5, //
        2041100, 1, //
        2041101, 1, //
        2041102, 1, //
        2041103, 1, //
        2041104, 1, //
        2041105, 1, //
        2041106, 1, //
        2041107, 1, //
        2041108, 1, //
        2041109, 1, //
        2041110, 1, //
        2041111, 1, //
        2041112, 1, //
        2041113, 1, //
        2041114, 1, //
        2041115, 1, //
        2041116, 1, //
        2041117, 1, //
        2041118, 1, //
        2041119, 1, //
        2041300, 1, //
        2041301, 1, //
        2041302, 1, //
        2041303, 1, //
        2041304, 1, //
        2041305, 1, //
        2041306, 1, //
        2041307, 1, //
        2041308, 1, //
        2041309, 1, //
        2041310, 1, //
        2041311, 1, //
        2041312, 1, //
        2041313, 1, //
        2041314, 1, //
        2041315, 1, //
        2041316, 1, //
        2041317, 1, //
        2041318, 1, //
        2041319, 1, //
        2049200, 1, //
        2049201, 1, //
        2049202, 1, //
        2049203, 1, //
        2049204, 1, //
        2049205, 1, //
        2049206, 1, //
        2049207, 1, //
        2049208, 1, //
        2049209, 1, //
        2049210, 1, //
        2049211, 1//
    };
    public static int[] eventRareReward = {
        2049100, 5,
        2430144, 5,
        2290285, 5,
        2028062, 5,
        2028061, 5,
        2530000, 2,
        2531000, 2,
        2049116, 1,
        2049401, 10,
        2049301, 20,
        2049400, 3,
        2340000, 1,
        3010130, 5,
        3010131, 5,
        3010132, 5,
        3010133, 5,
        3010136, 5,
        3010116, 5,
        3010117, 5,
        3010118, 5,
        1112405, 1,
        1112445, 1,
        1022097, 1,
        2040211, 1,
        2040212, 1,
        2049000, 2,
        2049001, 2,
        2049002, 2,
        2049003, 2,
        1012058, 2,
        1012059, 2,
        1012060, 2,
        1012061, 2,
        2022460, 4,
        2022461, 3,
        2022462, 4,
        2022463, 3,
        2040041, 1,
        2040042, 1,
        2040334, 1,
        2040430, 1,
        2040538, 1,
        2040539, 1,
        2040630, 1,
        2040740, 1,
        2040741, 1,
        2040742, 1,
        2040829, 1,
        2040830, 1,
        2040936, 1,
        2041066, 1,
        2041067, 1,
        2043023, 1,
        2043117, 1,
        2043217, 1,
        2043312, 1,
        2043712, 1,
        2043812, 1,
        2044025, 1,
        2044117, 1,
        2044217, 1,
        2044317, 1,
        2044417, 1,
        2044512, 1,
        2044612, 1,
        2044712, 1,
        2046000, 1,
        2046001, 1,
        2046004, 1,
        2046005, 1,
        2046100, 1,
        2046101, 1,
        2046104, 1,
        2046105, 1,
        2046200, 1,
        2046201, 1,
        2046202, 1,
        2046203, 1,
        2046208, 1,
        2046209, 1,
        2046210, 1,
        2046211, 1,
        2046212, 1,
        2046300, 1,
        2046301, 1,
        2046302, 1,
        2046303, 1,
        2047000, 1,
        2047001, 1,
        2047002, 1,
        2047100, 1,
        2047101, 1,
        2047102, 1,
        2047200, 1,
        2047201, 1,
        2047202, 1,
        2047203, 1,
        2047204, 1,
        2047205, 1,
        2047206, 1,
        2047207, 1,
        2047208, 1,
        2047300, 1,
        2047301, 1,
        2047302, 1,
        2047303, 1,
        2047304, 1,
        2047305, 1,
        2047306, 1,
        2047307, 1,
        2047308, 1,
        2047309, 1,
        1112427, 5,
        1112428, 5,
        1112429, 5,
        1012240, 10,
        1022117, 10,
        1032095, 10,
        1112659, 10,
        2070007, 10,
        2330007, 5,
        2070016, 5,
        2070018, 5,
        1152038, 1,
        1152039, 1,
        1152040, 1,
        1152041, 1,
        1122090, 1,
        1122094, 1,
        1122098, 1,
        1122102, 1,
        1012213, 1,
        1012219, 1,
        1012225, 1,
        1012231, 1,
        1012237, 1,
        2070023, 5,
        2070024, 5,
        2330008, 5,
        2003516, 5,
        2003517, 1,
        1132052, 1,
        1132062, 1,
        1132072, 1,
        1132082, 1,
        1112585, 1,
        //walker
        1072502, 1,
        1072503, 1,
        1072504, 1,
        1072505, 1,
        1072506, 1,
        1052333, 1,
        1052334, 1,
        1052335, 1,
        1052336, 1,
        1052337, 1,
        1082305, 1,
        1082306, 1,
        1082307, 1,
        1082308, 1,
        1082309, 1,
        1003197, 1,
        1003198, 1,
        1003199, 1,
        1003200, 1,
        1003201, 1,
        1662000, 1,
        1662001, 1,
        1672000, 1,
        1672001, 1,
        1672002, 1,
        //crescent moon
        1112583, 1,
        1032092, 1,
        1132084, 1,
        //mounts, 90 day
        2430290, 1,
        2430292, 1,
        2430294, 1,
        2430296, 1,
        2430298, 1,
        2430300, 1,
        2430302, 1,
        2430304, 1,
        2430306, 1,
        2430308, 1,
        2430310, 1,
        2430312, 1,
        2430314, 1,
        2430316, 1,
        2430318, 1,
        2430320, 1,
        2430322, 1,
        2430324, 1,
        2430326, 1,
        2430328, 1,
        2430330, 1,
        2430332, 1,
        2430334, 1,
        2430336, 1,
        2430338, 1,
        2430340, 1,
        2430342, 1,
        2430344, 1,
        2430347, 1,
        2430349, 1,
        2430351, 1,
        2430353, 1,
        2430355, 1,
        2430357, 1,
        2430359, 1,
        2430361, 1,
        2430392, 1,
        2430512, 1,
        2430536, 1,
        2430477, 1,
        2430146, 1,
        2430148, 1,
        2430137, 1};
    public static int[] eventSuperReward = {
        2022121, 10,
        4031307, 50,
        3010127, 10,
        3010128, 10,
        3010137, 10,
        3010157, 10,
        2049300, 10,
        2040758, 10,
        1442057, 10,
        2049402, 10,
        2049304, 1,
        2049305, 1,
        2040759, 7,
        2040760, 5,
        2040125, 10,
        2040126, 10,
        1012191, 5,
        1112514, 1, //untradable/tradable
        1112531, 1,
        1112629, 1,
        1112646, 1,
        1112515, 1, //untradable/tradable
        1112532, 1,
        1112630, 1,
        1112647, 1,
        1112516, 1, //untradable/tradable
        1112533, 1,
        1112631, 1,
        1112648, 1,
        2040045, 10,
        2040046, 10,
        2040333, 10,
        2040429, 10,
        2040542, 10,
        2040543, 10,
        2040629, 10,
        2040755, 10,
        2040756, 10,
        2040757, 10,
        2040833, 10,
        2040834, 10,
        2041068, 10,
        2041069, 10,
        2043022, 12,
        2043120, 12,
        2043220, 12,
        2043313, 12,
        2043713, 12,
        2043813, 12,
        2044028, 12,
        2044120, 12,
        2044220, 12,
        2044320, 12,
        2044520, 12,
        2044513, 12,
        2044613, 12,
        2044713, 12,
        2044817, 12,
        2044910, 12,
        2046002, 5,
        2046003, 5,
        2046102, 5,
        2046103, 5,
        2046204, 10,
        2046205, 10,
        2046206, 10,
        2046207, 10,
        2046304, 10,
        2046305, 10,
        2046306, 10,
        2046307, 10,
        2040006, 2,
        2040007, 2,
        2040303, 2,
        2040403, 2,
        2040506, 2,
        2040507, 2,
        2040603, 2,
        2040709, 2,
        2040710, 2,
        2040711, 2,
        2040806, 2,
        2040903, 2,
        2040913, 2,
        2041024, 2,
        2041025, 2,
        2044815, 2,
        2044908, 2,
        1152046, 1,
        1152047, 1,
        1152048, 1,
        1152049, 1,
        1122091, 1,
        1122095, 1,
        1122099, 1,
        1122103, 1,
        1012214, 1,
        1012220, 1,
        1012226, 1,
        1012232, 1,
        1012238, 1,
        1032088, 1,
        1032089, 1,
        1032090, 1,
        1032091, 1,
        1132053, 1,
        1132063, 1,
        1132073, 1,
        1132083, 1,
        1112586, 1,
        1112593, 1,
        1112597, 1,
        1662002, 1,
        1662003, 1,
        1672003, 1,
        1672004, 1,
        1672005, 1,
        //130, 140 weapons
        1092088, 1,
        1092089, 1,
        1092087, 1,
        1102275, 1,
        1102276, 1,
        1102277, 1,
        1102278, 1,
        1102279, 1,
        1102280, 1,
        1102281, 1,
        1102282, 1,
        1102283, 1,
        1102284, 1,
        1082295, 1,
        1082296, 1,
        1082297, 1,
        1082298, 1,
        1082299, 1,
        1082300, 1,
        1082301, 1,
        1082302, 1,
        1082303, 1,
        1082304, 1,
        1072485, 1,
        1072486, 1,
        1072487, 1,
        1072488, 1,
        1072489, 1,
        1072490, 1,
        1072491, 1,
        1072492, 1,
        1072493, 1,
        1072494, 1,
        1052314, 1,
        1052315, 1,
        1052316, 1,
        1052317, 1,
        1052318, 1,
        1052319, 1,
        1052329, 1,
        1052321, 1,
        1052322, 1,
        1052323, 1,
        1003172, 1,
        1003173, 1,
        1003174, 1,
        1003175, 1,
        1003176, 1,
        1003177, 1,
        1003178, 1,
        1003179, 1,
        1003180, 1,
        1003181, 1,
        1302152, 1,
        1302153, 1,
        1312065, 1,
        1312066, 1,
        1322096, 1,
        1322097, 1,
        1332130, 1,
        1332131, 1,
        1342035, 1,
        1342036, 1,
        1372084, 1,
        1372085, 1,
        1382104, 1,
        1382105, 1,
        1402095, 1,
        1402096, 1,
        1412065, 1,
        1412066, 1,
        1422066, 1,
        1422067, 1,
        1432086, 1,
        1432087, 1,
        1442116, 1,
        1442117, 1,
        1452111, 1,
        1452112, 1,
        1462099, 1,
        1462100, 1,
        1472122, 1,
        1472123, 1,
        1482084, 1,
        1482085, 1,
        1492085, 1,
        1492086, 1,
        1532017, 1,
        1532018, 1,
        //mounts
        2430291, 1,
        2430293, 1,
        2430295, 1,
        2430297, 1,
        2430299, 1,
        2430301, 1,
        2430303, 1,
        2430305, 1,
        2430307, 1,
        2430309, 1,
        2430311, 1,
        2430313, 1,
        2430315, 1,
        2430317, 1,
        2430319, 1,
        2430321, 1,
        2430323, 1,
        2430325, 1,
        2430327, 1,
        2430329, 1,
        2430331, 1,
        2430333, 1,
        2430335, 1,
        2430337, 1,
        2430339, 1,
        2430341, 1,
        2430343, 1,
        2430345, 1,
        2430348, 1,
        2430350, 1,
        2430352, 1,
        2430354, 1,
        2430356, 1,
        2430358, 1,
        2430360, 1,
        2430362, 1,
        //rising sun
        1012239, 1,
        1122104, 1,
        1112584, 1,
        1032093, 1,
        1132085, 1
    };
    public static int[] tenPercent = {
        //10% scrolls
        2040002, //头盔防御卷轴10%
        2040005,
        2040026,
        2040031,
        2040100,
        2040105,
        2040200,
        2040205,
        2040302,
        2040310,
        2040318,
        2040323,
        2040328,
        2040329,
        2040330,
        2040331,
        2040402,
        2040412,
        2040419,
        2040422,
        2040427,
        2040502,
        2040505,
        2040514,
        2040517,
        2040534,
        2040602,
        2040612,
        2040619,
        2040622,
        2040627,
        2040702,
        2040705,
        2040708,
        2040727,
        2040802,
        2040805,
        2040816,
        2040825,
        2040902,
        2040915,
        2040920,
        2040925,
        2040928,
        2040933,
        2041002,
        2041005,
        2041008,
        2041011,
        2041014,
        2041017,
        2041020,
        2041023,
        2041058,
        2041102,
        2041105,
        2041108,
        2041111,
        2041302,
        2041305,
        2041308,
        2041311,
        2043002,
        2043008,
        2043019,
        2043102,
        2043114,
        2043202,
        2043214,
        2043302,
        2043402,
        2043702,
        2043802,
        2044002,
        2044014,
        2044015,
        2044102,
        2044114,
        2044202,
        2044214,
        2044302,
        2044314,
        2044402,
        2044414,
        2044502,
        2044602,
        2044702,
        2044802,
        2044809,
        2044902,
        2045302,
        2048002,
        2048005
    };
    public static int[] fishingReward = {
        0, 100, // Meso
        1, 100, // EXP
        //2022179, 1, // Onyx Apple
        1302021, 5, // 橡皮榔头
        1072238, 1, // 紫色钉鞋
        1072239, 1, // 黄色钉鞋
        2049100, 2, // 混沌卷轴60%
        2430144, 1, // 秘密能手册
        2290285, 1, // [能手册]神秘能手册
        2028062, 1, // 不可思议的配方卷
        2028061, 1, // 不可思议的卷轴卷
        2049301, 1, // 装备强化卷轴
        2049401, 1, // 潜能附加卷轴
        1302000, 3, // 剑
        1442011, 1, // 冲浪板
        4000517, 8, // 黄金鱼
        //4000518, 10, // Golden Fish Egg
        4031627, 2, // 银鱼(3cm)
        4031628, 1, // 旗鱼(120cm)
        4031630, 1, // 鲤鱼(30cm)
        4031631, 1, // 鲑鱼(150cm)
        4031632, 1, // 铲子
        4031633, 2, // 银鱼(3.6cm)
        4031634, 1, // 银鱼(5cm)
        4031635, 1, // 银鱼(6.5cm)
        4031636, 1, // 银鱼(10cm)
        4031637, 2, // 鲤鱼(53cm)
        4031638, 2, // 鲤鱼(60cm)
        4031639, 1, // 鲤鱼(100cm)
        4031640, 1, // 鲤鱼(113cm)
        4031641, 2, // 旗鱼(128cm)
        4031642, 2, // 旗鱼(131cm)
        4031643, 1, // 旗鱼(140cm)
        4031644, 1, // 旗鱼(148cm)
        4031645, 2, // 鲑鱼(166cm)
        4031646, 2, // 鲑鱼(183cm)
        4031647, 1, // 鲑鱼(227cm)
        4031648, 1, // 鲑鱼(288cm)
        4001187, 20, // 音痴
        4001188, 20, // 舞痴
        4001189, 20, // 拍痴
        4031629, 1 // 锅子
    };

    public static boolean isReverseItem(int itemId) {
        switch (itemId) {
            case 1002790: //重生冠军盔
            case 1002791: //重生玄妙帽
            case 1002792: //重生霓翎帽
            case 1002793: //重生迷踪帽
            case 1002794: //重生海王星
            case 1082239: //重生定边手套
            case 1082240: //重生逍遥手套
            case 1082241: //重生白云手套
            case 1082242: //重生探云手套
            case 1082243: //重生抚浪手套
            case 1052160: //重生演武铠
            case 1052161: //重生奥神袍
            case 1052162: //重生巡礼者
            case 1052163: //重生翻云服
            case 1052164: //重生霸七海
            case 1072361: //重生坚壁靴
            case 1072362: //重生缥缈鞋
            case 1072363: //重生彩虹鞋
            case 1072364: //重生舞空靴
            case 1072365: //重生定海靴

            case 1302086: //重生破甲剑
            case 1312038: //重生断蚺斧
            case 1322061: //重生惊破天
            case 1332075: //重生狂鲨锯
            case 1332076: //重生断首刃
            case 1372045: //重生蝶翼杖
            case 1382059: //重生冰轮杖
            case 1402047: //重生玄冥剑
            case 1412034: //重生碎鼋斧
            case 1422038: //重生威震天
            case 1432049: //重生显圣枪
            case 1442067: //重生神光戟
            case 1452059: //重生惊电弓
            case 1462051: //重生冥雷弩
            case 1472071: //重生大悲赋
            case 1482024: //重生孔雀翎
            case 1492025: //重生凤凰铳

            case 1342012: //重生之刃
            case 1942002: //重生面罩
            case 1952002: //重生吊坠
            case 1962002: //重生飞翼
            case 1972002: //重生尾巴
            case 1522016: //重生鲜花弩枪
            case 1532016: //重生拯救者
                return true;
            default:
                return false;
        }
    }

    public static boolean isTimelessItem(int itemId) {
        switch (itemId) {
            case 1032031: //永恒金盾坠
            case 1102172: //永恒不灭披风
            case 1002776: //永恒冠军盔
            case 1002777: //永恒玄妙帽
            case 1002778: //永恒霓翎帽
            case 1002779: //永恒迷踪帽
            case 1002780: //永恒海王星
            case 1082234: //永恒定边手套
            case 1082235: //永恒逍遥手套
            case 1082236: //永恒白云手套
            case 1082237: //永恒探云手套
            case 1082238: //永恒抚浪手套
            case 1052155: //永恒演武铠
            case 1052156: //永恒奥神袍
            case 1052157: //永恒巡礼者
            case 1052158: //永恒翻云服
            case 1052159: //永恒霸七海
            case 1072355: //永恒坚壁靴
            case 1072356: //永恒缥缈鞋
            case 1072357: //永恒彩虹鞋
            case 1072358: //永恒舞空靴
            case 1072359: //永恒定海靴
            case 1092057: //永恒魔光盾
            case 1092058: //永恒寒冰盾
            case 1092059: //永恒匿踪盾

            case 1122011: //封印的永恒玉佩
            case 1122012: //永恒玉佩

            case 1302081: //永恒破甲剑
            case 1312037: //永恒断蚺斧
            case 1322060: //永恒惊破天
            case 1332073: //永恒狂鲨锯
            case 1332074: //永恒断首刃
            case 1372044: //永恒蝶翼杖
            case 1382057: //永恒冰轮杖
            case 1402046: //永恒玄冥剑
            case 1412033: //永恒碎鼋斧
            case 1422037: //永恒威震天
            case 1432047: //永恒显圣枪
            case 1442063: //永恒神光戟
            case 1452057: //永恒惊电弓
            case 1462050: //永恒冥雷弩
            case 1472068: //永恒大悲赋
            case 1482023: //永恒孔雀翎
            case 1492023: //永恒凤凰铳
            case 1342011: //永恒之刃
            case 1522015: //永恒鲜花弩枪
            case 1532015: //永恒拯救者
                return true;
            default:
                return false;
        }
    }

    public static int[] Equipments_Bonus = {1122017}; //精灵吊坠

    public static int Equipment_Bonus_EXP(int itemid) { // TODO : Add Time for more exp increase
        switch (itemid) {
            case 1122017: //精灵吊坠
                return 10;
        }
        return 0;
    }
    //If you can think of more maps that could be exploitable via npc,block nao pliz!

    public static int getExpForLevel(int i, int itemId) {
        if (isReverseItem(itemId)) {
            return getReverseRequiredEXP(i);
        } else if (getMaxLevel(itemId) > 0) {
            return getTimelessRequiredEXP(i);
        }
        return 0;
    }

    public static int getMaxLevel(int itemId) {
        Map<Integer, Map<String, Integer>> inc = MapleItemInformationProvider.getInstance().getEquipIncrements(itemId);
        return inc != null ? (inc.size()) : 0;
    }

    public static int getStatChance() {
        return 25;
    }

    public static MonsterStatus getStatFromWeapon(int itemid) {
        switch (itemid) {
            case 1302109: // 焰光剑
            case 1312041: // 焰光剑
            case 1322067: // 焰光剑
            case 1332083: // 焰光剑
            case 1372048: // 焰光剑
            case 1382064: // 焰光剑
            case 1402055: // 焰光剑
            case 1412037: // 焰光剑
            case 1422041: // 焰光剑
            case 1432052: // 焰光剑
            case 1442073: // 焰光剑
            case 1452064: // 焰光剑
            case 1462058: // 焰光剑
            case 1472079: // 焰光剑
            case 1482035: // 焰之剑
                return MonsterStatus.恐慌;
            case 1302108: // 雷光剑
            case 1312040: // 雷光剑
            case 1322066: // 雷光剑
            case 1332082: // 雷光剑
            case 1372047: // 雷光剑
            case 1382063: // 雷光剑
            case 1402054: // 雷光剑
            case 1412036: // 雷光剑
            case 1422040: // 雷光剑
            case 1432051: // 雷光剑
            case 1442072: // 雷光剑
            case 1452063: // 雷光剑
            case 1462057: // 雷光剑
            case 1472078: // 星之剑
            case 1482036: // 星之剑
                return MonsterStatus.速度;
        }
        return null;
    }

    public static boolean isSealedEquip(int itemid) {
        for (int i : sealedEquip) {
            if (itemid == i) {
                return true;
            }
        }
        return false;
    }

    public static int getXForStat(MonsterStatus stat) {
        switch (stat) {
            case 恐慌:
                return -70;
            case 速度:
                return -50;
        }
        return 0;
    }

    public static int getSkillForStat(MonsterStatus stat) {
        switch (stat) {
            case 恐慌:
                return 1111003;
            case 速度:
                return 3121007;
        }
        return 0;
    }

    public final static int[] normalDrops = {
        4001009, //木妖橡皮擦
        4001010, //蘑菇王橡皮擦
        4001011, //猴子橡皮擦
        4001012, //大幽灵橡皮擦
        4001013, //绿水灵橡皮擦
        4001014, //三眼章鱼橡皮擦
        4001021, //狸子橡皮擦
        4001038, //木妖橡皮擦
        4001039, //蘑菇王橡皮擦
        4001040, //猴子橡皮擦
        4001041, //大幽灵橡皮擦
        4001042, //绿水灵橡皮擦
        4001043, //三眼章鱼橡皮擦
        4001038, //木妖橡皮擦 --------------------
        4001039, //蘑菇王橡皮擦
        4001040, //猴子橡皮擦
        4001041, //大幽灵橡皮擦
        4001042, //绿水灵橡皮擦
        4001043, //三眼章鱼橡皮擦
        4001038, //木妖橡皮擦 --------------------
        4001039, //蘑菇王橡皮擦
        4001040, //猴子橡皮擦
        4001041, //大幽灵橡皮擦
        4001042, //绿水灵橡皮擦
        4001043, //三眼章鱼橡皮擦
        4000164, //蓝泡泡翻车鱼之心
        2000000, //红色药水
        2000003, //蓝色药水
        2000004, //特殊药水
        2000005, //超级药水
        4000019, //绿色蜗牛壳
        4000000, //蓝色蜗牛壳
        4000016, //红色蜗牛壳
        4000006, //三眼章鱼触角
        2100121, //绿水灵召唤包
        4000029, //香蕉
        4000064, //乌鸦羽毛
        5110000, //红心巧克力
        4032181, //逆奥银币
        4006001, //召回石
        4006000, //魔法石
        2050004, //万能疗伤药
        3994102, //罗盘用N
        3994103, //罗盘用E
        3994104, //罗盘用W
        3994105, //罗盘用S
        2430007, //空罗盘
        4000164, //蓝泡泡翻车鱼之心
        2000000, //红色药水
        2000003, //蓝色药水
        2000004, //特殊药水
        2000005, //超级药水
        4000019, //绿色蜗牛壳
        4000000, //蓝色蜗牛壳
        4000016, //红色蜗牛壳
        4000006, //三眼章鱼触角
        2100121, //绿水灵召唤包
        4000029, //香蕉
        4000064, //乌鸦羽毛
        5110000, //红心巧克力
        4032181, //逆奥银币
        4006001, //召回石
        4006000, //魔法石
        2050004, //万能疗伤药
        3994102, //罗盘用N
        3994103, //罗盘用E
        3994104, //罗盘用W
        3994105, //罗盘用S
        2430007}; //空罗盘
    public final static int[] rareDrops = {
        2049100, //混沌卷轴60%
        2430144, //秘密能手册
        2028062, //不可思议的配方卷
        2028061, //不可思议的卷轴卷
        2290285, //[能手册]神秘能手册
        2049301, //装备强化卷轴
        2049401, //潜能附加卷轴
        2022326, //森林的祝福
        2049000, //白医卷轴
        2049001, //白医卷轴
        2049002};//白医卷轴
    public final static int[] superDrops = {
        2040804, //手套攻击卷轴60%
        2049400, //高级潜能附加卷轴
        2028062, //不可思议的配方卷
        2028061, //不可思议的卷轴卷
        2430144, //秘密能手册
        2290285, //[能手册]神秘能手册
        2049100};//混沌卷轴60%

    public static int getLinkedMountItem(int sourceid) {
        if (sourceid / 10000 == 8000) {
            switch (sourceid % 1000) {
                case 1:
                case 24:
                case 25:
                    return 1018;
                case 2:
                case 26:
                    return 1019;
                case 3:
                    return 1025;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    return (sourceid % 1000) + 1023;
                case 9:
                case 10:
                case 11:
                    return (sourceid % 1000) + 1024;
                case 12:
                    return 1042;
                case 13:
                    return 1044;
                case 14:
                    return 1049;
                case 15:
                case 16:
                case 17:
                    return (sourceid % 1000) + 1036;
                case 18:
                case 19:
                    return (sourceid % 1000) + 1045;
                case 20:
                    return 1072;
                case 21:
                    return 1084;
                case 22:
                    return 1089;
                case 23:
                    return 1106;
                case 29:
                    return 1151;
                case 30:
                case 50:
                    return 1054;
                case 33: //33 = hot air
                    return 1932057;
                case 37: //独角兽比约骑宠
                    return 1932084;
                case 38: //38 = speedy chariot
                    return 1932088;
                case 39: //飞马
                    return 1932089;
                case 31:
                case 51:
                    return 1069;
                case 32:
                    return 1138;
                case 45:
                case 46:
                case 47:
                case 48:
                case 49:
                    return (sourceid % 1000) + 1009;
                case 52:
                    return 1070;
                case 53:
                    return 1071;
                case 54:
                    return 1096;
                case 55:
                    return 1101;
                case 56:
                    return 1102;
                case 58:
                    return 1118;
                case 59:
                    return 1121;
                case 60:
                    return 1122;
                case 61:
                    return 1129;
                case 62:
                    return 1139;
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                    return (sourceid % 1000) + 1080;
                case 82: //水牛骑宠
                    return 1932093;
                case 83: //兔车骑宠
                    return 1932094;
                case 84: //超级兔子骑宠
                    return 1932095;
                case 85:
                case 86:
                case 87:
                    return (sourceid % 1000) + 928;
                case 88:
                    return 1065;
                case 90: //印第安猪
                    return 1932096;
                case 27:
                    return 1932049; //airplane
                case 28:
                    return 1932050; //airplane
                case 111: //猫头鹰
                    return 1932038;
                case 112: //熊猫
                    return 1932097;
                case 113: //企鹅
                    return 1932098;
                case 114: //GO兔冒险
                    return 1932099;
                case 115: //无辜水牛
                    return 1932065;
                case 116: //玩具坦克
                    return 1932066;
                case 117: //打豆豆机器人
                    return 1932072;
                case 118: //莱格斯的豺犬
                    return 1932078;
                case 119: //跑车
                    return 1932080;
                case 120: //国庆纪念热气球
                    return 1992015;
                case 121: //赤兔马
                    return 1932092;
                case 124: //猫猫海贼船
                    return 1932105;
                case 142: //好朋友坐骑
                    return 1932112;
                case 181: //藏獒骑宠
                    return 1932091;
                case 194:
                    return 1932137;
                case 195:
                    return 1932138;
                case 196:
                    return 1932139;
                case 198:
                    return 1932140;
                case 199:
                    return 1932141;
                case 220:
                    return 1932143;
                case 221:
                    return 1932144;
                case 228:
                    return 1932148;
                case 237:
                    return 1932153;
                case 240:
                    return 1932154;
                case 243:
                    return 1932156;
                case 245:
                    return 1932158;
                case 330:
                    return 1992030;
                case 410:
                    return 1992033;
                //37 = bjorn
                //57 = law officer
                //they all have in wz so its ok
                default:
                    return 0;
            }
        } else if (sourceid / 10000 == 8001) {
//            switch (sourceid % 10000) {
//                case 1030:
//            }
        }
        return 0;
    }

    public static int getMountItem(int sourceid, MapleCharacter chr) {
        switch (sourceid) {
            case 豹弩游侠.美洲豹骑士:
                if (chr == null) {
                    return 1932015;
                }
                switch (chr.getIntNoRecord(JAGUAR)) {
                    case 20:
                        return 1932030;
                    case 30:
                        return 1932031;
                    case 40:
                        return 1932032;
                    case 50:
                        return 1932033;
                    case 60:
                        return 1932036; //剑齿豹
                    case 70:
                        return 1932100; //雪豹
                }
                return 1932015;
            case 机械师.金属机甲_人类:
            case 机械师.金属机甲_战车:
            case 机械师.终极机甲:
                return 1932016;
            case 恶魔猎手.恶魔之翼:
                return 1932051;
            case 恶魔猎手.恶魔之翼1:
                return 1932085;
            case 20021160: //希比迪亚 - [最高等级：1]\n可以召唤并骑着精灵的朋友独角兽希比迪亚移动。
                return 1932086;
            case 20021161: //希比迪亚 - [最高等级：1]\n可以召唤并骑着精灵的朋友独角兽希比迪亚移动。可以召唤更强的希比迪亚。
                return 1932087;
            case 20031160: //老爷车 - [最高等级：1]\n可以开着幻影的专用车老爷车移动。
                return 1932106;
            case 20031161: //云舟 - [最高等级：1]\n可以开着幻影的专用车云舟移动。
                return 1932107;
        }
        if (!JobConstants.is新手职业(sourceid / 10000)) {
            if ((sourceid / 10000 == 8000 || sourceid / 10000 == 8001) && sourceid != 80001000) { //todoo clean up
                Skill skil = SkillFactory.getSkill(sourceid);
                if (skil != null && skil.getTamingMob() > 0) {
                    return skil.getTamingMob();
                } else {
                    int link = getLinkedMountItem(sourceid);
                    if (link > 0) {
                        if (link < 10000) {
                            return getMountItem(link, chr);
                        } else {
                            return link;
                        }
                    } else {
                        return SkillFactory.getMountLinkId(sourceid);
                    }
                }
            }
            return 0;
        }
        switch (sourceid % 10000) {
            case 1013: //宇宙船
            case 1046: //宇宙船
                return 1932001;
            case 1015: //太空射线
            case 1048:
                return 1932002;
            case 1016: //鳄鱼王
            case 1017: //鳄鱼王
            case 1027: //鳄鱼王
                return 1932007;
            case 1018: //白雪人骑宠
                return 1932003;
            case 1019: //魔女的扫把
                return 1932005;
            case 1025: //玩具木马
                return 1932006;
            case 1028:
                return 1932008;
            case 1029: //女女机车
                return 1932009;
            case 1030: //筋斗云
                return 1932011;
            case 1031: //蝙蝠怪
                return 1932010;
            case 1033: //赛车
                return 1932013;
            case 1034: //老虎只是传说
                return 1932014;
            case 1035: //蝙蝠魔先生
                return 1932012;
            case 1036: //狮子王
                return 1932017;
            case 1037: //独角兽
                return 1932018;
            case 1038:
                return 1932019;
            case 1039: //田园红卡车
                return 1932020;
            case 1040: //恶魔石像
                return 1932021;
            case 1042: //圣兽 提拉奥斯
                return 1932022;
            case 1044: //花蘑菇
                return 1932023;
            //case 1045:
            //return 1932030; //wth? helicopter? i didnt see one, so we use hog
            case 1049: //梦魇
                return 1932025;
            case 1050: //白雪人
                return 1932004;
            case 1051: //鸵鸟
                return 1932026;
            case 1052: //粉红熊热气球
                return 1932027;
            case 1053: //钢铁变形侠
                return 1932028;
            case 1054: //走路鸡
                return 1932029;
            case 1063: //暴风摩托
                return 1932034;
            case 1064: //机械套装
                return 1932035;
            case 1065:
                return 1932037;
            case 1069: //猫头鹰
                return 1932038;
            case 1070:
                return 1932039;
            case 1071:
                return 1932040;
            case 1072: //雄狮骑宠
                return 1932041;
            case 1084: //蓝色机车
                return 1932043;
            case 1089: //圣诞雪橇
                return 1932044;
            case 1096: //巨无霸兔子
                return 1932045;
            case 1101: //兔兔加油
                return 1932046;
            case 1102: //兔子车夫
                return 1932047;
            case 1106: //福袋
                return 1932048;
            case 1115: //警车
                return 1932052;
            case 1118: //妮娜的魔法阵
                return 1932060;
            case 1121: //青蛙
                return 1932063;
            case 1122: //小龟龟
                return 1932064;
            case 1123: //无辜水牛
                return 1932065;
            case 1124: //玩具坦克
                return 1932066;
            case 1129: //维京战车
                return 1932071;
            case 1130: //打豆豆机器人
                return 1932072;
            case 1136: //莱格斯的豺犬
                return 1932078;
            case 1138: //跑车
                return 1932080;
            case 1139: //拿破仑的白马
                return 1932081;
            //FLYING
            case 1143: //赤羚龙
            case 1144: //提拉奥斯
            case 1145: //热气球
            case 1146: //飞船
            case 1147: //天马
            case 1148: //暗光龙
            case 1149: //魔法扫帚
            case 1150: //筋斗云
            case 1151: //骑士团战车
            case 1152: //梦魇
            case 1153: //透明蝙蝠怪
            case 1154: //蝙蝠怪
            case 1155: //玛瑙龙（3阶）
            case 1156: //猫头鹰
            case 1157: //直升机
                return 1992000 + (sourceid % 10000) - 1143;
            default:
                return SkillFactory.getMountLinkId(sourceid);
        }
    }

    /*
     * 管理员技能
     */
    public static boolean isAdminSkill(int skillId) {
        int jobId = skillId / 10000;
        return jobId == 800 || jobId == 900;
    }

    /*
     * 特殊技能
     */
    public static boolean isSpecialSkill(int skillId) {
        int jobId = skillId / 10000;
        return jobId == 7000 || jobId == 7100 || jobId == 8000 || jobId == 9000 || jobId == 9100 || jobId == 9200 || jobId == 9201 || jobId == 9202 || jobId == 9203 || jobId == 9204;
    }

    public static boolean isApplicableSkill(int skillId) {
        return ((skillId < 80000000 || skillId >= 100000000) && (skillId % 10000 < 8000 || skillId % 10000 > 8006) && !is天使祝福戒指(skillId)) || skillId >= 92000000 || (skillId >= 80000000 && skillId < 80020000); //no additional/decent skills
    }

    public static boolean isApplicableSkill_(int skillId) { //not applicable to saving but is more of temporary
        for (int i : PlayerStats.pvpSkills) {
            if (skillId == i) {
                return true;
            }
        }
        return (skillId >= 90000000 && skillId < 92000000) || (skillId % 10000 >= 8000 && skillId % 10000 <= 8003) || is天使祝福戒指(skillId);
    }

    public static int getOptentialStats(int potentialID) {
        if (potentialID >= 40000) {
            return 20;
        } else if (potentialID >= 30000) {
            return 19;
        } else if (potentialID >= 20000) {
            return 18;
        } else if (potentialID >= 1) {
            return 17;
        }
        return -1;
    }

    private static boolean onlyWeaponOption(String opString) {
        String[] strings = new String[]{"#incDAMr%", "ignoreDAMr%", "ignoreTargetDEF%", "incCriticaldamageMin%", "ncCriticaldamageMax%", "DAMr%", "incDAMr%"};
        //String[] strings = new String[]{"incCr", "#incDAMr%","ignoreDAMr%","ignoreTargetDEF%","incCriticaldamageMin%","ncCriticaldamageMax%","incDAMr", "ignoreTargetDEF", "incPAD","DAMr%","incMAD", "incPADr", "incMADr", "incMADr", "incDAMr", "ignoreTargetDEF","incDAMr", "incDAMr", "incPADr","incDAMr%","incDAMr"};
        for (String s : strings) {
            if (opString.contains(s)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isBlockedOptential(Equip equip, int potentialID, boolean b2, boolean b3) {

        if (MapleItemInformationProvider.getInstance().isSuperiorEquip(equip.getItemId())) ;

        boolean b4 = false;

        int n2 = potentialID / 1000 % 10;

        if ((b2 && n2 != 2) || (!b2 && n2 == 2)) {

            return false;

        }

        if ((potentialID % 1000 <= 14 || potentialID % 1000 == 81) && potentialID < 60000 && b3 && potentialID / 1000 != 31) {

            return false;

        }

        //int n3 = potentialID % 1000;
        return (potentialID < 60000);

    }

    public static boolean optentialIDFits(int optentialID, int new_state, int i) {
        /*
         * 15 = 未鉴定 16以下 20以上都是未鉴定
         * 16 = C级
         * 17 = B级
         * 18 = A级
         * 19 = S级
         * 20 = SS级
         * first line is always the best
         * but, sometimes it is possible to get second/third line as well
         * may seem like big chance, but it's not as it grabs random potential ID anyway
         */

        if (new_state == 20) {
            return (i == 1 || Randomizer.nextInt(20) == 0) ? (optentialID >= 30000) : (optentialID >= 40000 && optentialID < 70000);
        }
        if (new_state == 19) {
            return (i == 1 || Randomizer.nextInt(20) == 0) ? (optentialID >= 20000) : (optentialID >= 30000 && optentialID < 40000);
        }
        if (new_state == 18) {
            return (i == 1 || Randomizer.nextInt(20) == 0) ? (optentialID >= 10000) : (optentialID >= 20000 && optentialID < 30000);
        }
        return new_state == 17 && ((i == 1 || Randomizer.nextInt(20) == 0) ? (optentialID >= 10000) : (optentialID >= 10000 && optentialID < 20000));
    }

    public static boolean optionTypeFits(int optionType, int itemId) {
        switch (optionType) {
            case 10: //武器
                return ItemConstants.isWeapon(itemId) || ItemConstants.isShield(itemId) || ItemConstants.is恶魔副手(itemId) || ItemConstants.is双弩箭矢(itemId) || ItemConstants.is特殊副手(itemId) || ItemConstants.is幻影卡片(itemId) || ItemConstants.is双刀副手(itemId) || ItemConstants.is徽章(itemId) || ItemConstants.is纹章(itemId);
            case 11: //所有盔甲 除了武器
                return !ItemConstants.isWeapon(itemId);
            case 20: //盾牌
                //return itemId / 10000 == 109 || itemId / 10000 == 135;
                return ItemConstants.isShield(itemId);
            case 21: //宠物装备
                //return itemId / 10000 == 180;
                return ItemConstants.isPetEquip(itemId);
            case 40: //配饰
                return ItemConstants.isAccessory(itemId);
            case 51: //帽子
                //return itemId / 10000 == 100;
                return ItemConstants.isCap(itemId);
            case 52: //披风
                //return itemId / 10000 == 110;
                return ItemConstants.isCape(itemId);
            case 53: //上衣/裤裙/套服
                //return itemId / 10000 == 104 || itemId / 10000 == 105 || itemId / 10000 == 106;
                return ItemConstants.isCoat(itemId) || ItemConstants.isLongcoat(itemId) || ItemConstants.isPants(itemId);
            case 54: //手套
                //return itemId / 10000 == 108;
                return ItemConstants.isGlove(itemId);
            case 55: //鞋子
                //return itemId / 10000 == 107;
                return ItemConstants.isShoes(itemId);
            case 90:
                return false; //half this stuff doesnt even work
            default:
                return true;
        }
    }

    public static boolean 加载潜能是否符合潜能等级(int potentialID, int newstate) {
        if (newstate == 23) {
            return potentialID == 60003;
        }
        if (newstate == 22) {
            return potentialID == 60002;
        }
        if (newstate == 21) {
            return potentialID == 60001;
        }
        if (newstate == 20) {
            return potentialID >= 40000;
        }
        if (newstate == 19) {
            return potentialID >= 30000;
        }
        if (newstate == 18) {
            return (potentialID >= 20000) && (potentialID < 30000);
        }
        if (newstate == 17) {
            return (potentialID >= 10000) && (potentialID < 20000);
        }
        return false;
    }

    public static boolean isAboveA(int opID) {

        return (opID > 70000 || opID < 10001);

    }

    public static boolean optionTypeFitsX(int optentialID, int itemId) {
        switch (optentialID) {
            case 10011:
            case 10012:
            case 10051:
            case 10052:
            case 10055:
            case 10070:
            case 10201:
            case 10202:
            case 10206:
            case 10207:
            case 10221:
            case 10222:
            case 10226:
            case 10227:
            case 10231:
            case 10232:
            case 10236:
            case 10237:
            case 10241:
            case 10242:
            case 10246:
            case 10247:
            case 10291:
            case 12015:
            case 12016:
            case 12017:
            case 12018:
            case 12019:
            case 12020:
            case 12047:
            case 12048:
            case 12049:
            case 12050:
            case 12051:
            case 12052:
            case 12055:
            case 12070:
            case 12082:
            case 12801:
            case 20011:
            case 20012:
            case 20051:
            case 20052:
            case 20055:
            case 20070:
            case 20201:
            case 20202:
            case 20206:
            case 20207:
            case 20291:
            case 22051:
            case 22052:
            case 22055:
          
            case 22070:
          
            case 22201:
            case 22206:

            case 22801:
            case 30011:
            case 30012:
            case 30051:
            case 30052:
            case 30055:
            case 30070:
            case 30291:
            case 30601:
            case 30602:
            case 32051:
            case 32053:
            case 32057:

            case 32070:
            case 32087:
            case 32116:

            case 32601:
            case 32801:
            case 32201:
            case 32206:
            case 40011:
            case 40012:
            case 40051:
            case 40052:
            case 40055:

            case 40601:
            case 40602:
            case 40603:
            case 42051:
            case 42053:
            case 42057:
            case 42063:
            case 42064:
            case 42065:
            case 42066:
            case 42070:

            case 42116:

            case 42602:
            case 42801:

            case 60003:
            case 60010:
            case 60011:
            case 60025:
            case 60026:
            case 60027:

                return ItemConstants.isWeapon(itemId) || ItemConstants.isShield(itemId) || ItemConstants.is恶魔副手(itemId) || ItemConstants.is双弩箭矢(itemId) || ItemConstants.is特殊副手(itemId) || ItemConstants.is幻影卡片(itemId) || ItemConstants.is双刀副手(itemId) || ItemConstants.is徽章(itemId) || ItemConstants.is纹章(itemId) || itemId / 10000 == 109 || itemId / 10000 == 135;
            case 20351:
            case 20352:
            case 20353:
            case 30356:
            case 30357:
            case 40356:
            case 40357:
                //case 42060:
                //case 42062:
                return ItemConstants.isShield(itemId);
            case 10151:
            case 10156:
            case 40501:
            case 40502:
            case 40650:
            case 40656:
            case 42501:
                return ItemConstants.isAccessory(itemId);
            case 30106:
            case 30107:
            case 31002:
            case 32661:
            case 40106:
            case 40107:
            case 40556:
            case 40557:
            case 41006:
            case 42106:
            case 42661:
            case 42556:
                return ItemConstants.isCap(itemId);
            case 20366:
            case 20396:
            case 30366:
            case 30371:
            case 30376:
            case 30377:
            case 40111:
            case 40366:
            case 40371:

                return ItemConstants.isCape(itemId);

            case 31004:
            case 40116:
            case 40376:
            case 40377:
            case 60022:
                return ItemConstants.isCoat(itemId) || ItemConstants.isLongcoat(itemId) || ItemConstants.isPants(itemId);

            case 20401:
            case 20406:

            case 30701:
            case 30702:
            case 31003:
            case 40056:
            case 40057:
            case 40701:
            case 40702:
            case 40703:
            case 41007:
            case 42059:
            case 42061:

                return ItemConstants.isGlove(itemId);
            case 10009:
            case 10010:
            case 20009:
            case 20010:
            case 30009:
            case 30010:
            case 31001:
            case 40009:
            case 40010:
            case 41005:
                return ItemConstants.isShoes(itemId);

            
            case 30001:
            case 30002:
            case 30003:
            case 30004:
            case 30005:
            case 30006:
            case 30007:
            case 30008:
            case 40091:
            case 40092:
            case 32045:
            case 32046:
            case 32047:
            case 32048:
            case 40001:
            case 40002:
            case 40003:
            case 40004:
            case 40005:
            case 40006:
            case 40007:
            case 40008:
            case 42601:
            case 42045:
            case 42046:
            case 42047:
            case 42048:
            case 60001:
            case 60002:

            case 60004:
            case 60005:
            case 60006:
            case 60007:
            case 60008:
            case 60009:
            case 42091:
            case 42095:
            case 42096:
            case 42092:
            case 42093:
            case 42094:
            case 32091:
            case 32092:
            case 32093:
            case 32094:
            case 60012:
            case 60013:
            case 60014:
            case 60015:
            case 60016:
            case 60017:
            case 60018:
            case 60019:
            case 60020:
            case 60021:
            case 40070:
            case 60023:
            case 60024:
            case 42003:
            case 42002:
            case 42001:
            case 42004:
            case 42011:
            case 42012:
            case 42041:
            case 42042:
            case 42043:
            case 42044:
            case 32001:
            case 32002:
            case 32003:
            case 32004:
            case 32041:
            case 32042:
            case 32043:
            case 32044:
            case 32010:
            case 42010:
            case 32071:
            case 42071:
            case 42086:
            case 42054:
            case 32054:
            case 42052:
            case 42058:
            case 22056:
            case 22291:
            case 42291:
            case 60028:
            case 60029:
            case 60030:
            case 60031:
            case 60032:
            case 60033:
            case 60034:
            case 60035:
            case 60036:
            case 60037:
            case 60038:
            case 60039:
                return false;
            default:
            case 10001:
            case 10002:
            case 10003:
            case 10004:
            case 10005:
            case 10006:
            case 10007:
            case 10008:
            case 10041:
            case 10042:
            case 10043:
            case 10044:
            case 10047:
            case 10048:
            case 12005:

            case 20001:
            case 20002:
            case 20003:
            case 20004:
            case 20005:
            case 20006:
            case 20007:
            case 20008:
            case 20041:
            case 20042:
            case 20043:
            case 20044:
            case 20045:
            case 20046:
            case 20047:
            case 20048:
               
                                                    case  22001:
                                                            case 22002:
                                                                    case 22003:
                                                                            case 22004:
                                                                                    case 22005:
                                                                                            case 22006:
                                                                                            case 22007:
                                                                                            case 22008:
                                                                                            case 22009:
                                                                                            case 22010:

                                                                                                               
                                                                                                                                       case 22041:
                                                                                                                                               case 22042:
                                                                                                                                                       case 22043:
                                                                                                                                                       case 22044:
                                                                                                                                                       case 22045:
            case 22046:
            case 22047:
            case 22048:

            case 22057:
                    case 22058:
                            case 22059:
                                    case 22060:
                                           
                                                    case 22086:
                                                            case 22087:
                                                            case 30041:
                                                            case 30042:
                                                                    case 30043:
                                                                            case 30044:


            case 40044:
            case 40043:
            case 40042:
            case 40041:
            case 32059:
            case 32060:
            case 32061:
            case 32062:
            case 40086:
            case 42087:
                return true;
        }

//        return false;
    }

    public static boolean isWeaponOption(int poId, int itemId) {
        if (ItemConstants.isWeapon(itemId)) {
            return true;
        }

        return true;
    }

    public static boolean isMountItemAvailable(int mountid, int jobid) {
        if (jobid != 900 && mountid / 10000 == 190) {
            switch (mountid) {
                case 1902000: //小浣猪
                case 1902001: //银色野猪
                case 1902002: //赤羚龙
                    return JobConstants.is冒险家(jobid);
                case 1902005: //提提阿纳
                case 1902006: //提提奥
                case 1902007: //提拉奥斯
                    return JobConstants.is骑士团(jobid);
                case 1902015: //狼神
                case 1902016: //狼神
                case 1902017: //狼神
                case 1902018: //狼神
                    return JobConstants.is战神(jobid);
                case 1902040: //第1阶段龙
                case 1902041: //第2阶段龙
                case 1902042: //第3阶段龙
                    return JobConstants.is龙神(jobid);
            }
            if (JobConstants.is反抗者(jobid)) {
                return false; //none lolol
            }
        }
        return mountid / 10000 == 190;
    }

    //热门搜索道具
    public static int[] owlItems = new int[]{1332052, 2043301, 2040804, 2049100, 1402016, 1382060, 1082002, 2070006, 2290272, 2049301};

    public static int getMasterySkill(int job) {
        if (job >= 1410 && job <= 1412) {
            return 夜行者.投掷精通;
        } else if (job >= 410 && job <= 412) {
            return 隐士.精准暗器;
        }
        return 0;
    }

    /*
     * 任务经验倍数
     * 暂时关掉 有些经验乘以倍数超级高都成负经验
     */
    public static int getExpRate_Quest(int level) {
        return 1; //(level >= 30 ? (level >= 70 ? (level >= 120 ? 10 : 5) : 2) : 1)
    }

    public static int getCustomReactItem(int rid, int original) {
        if (rid == 2008006) { //orbis pq LOL
            return (Calendar.getInstance().get(Calendar.DAY_OF_WEEK) + 4001055);
            //4001056 = sunday. 4001062 = saturday
        } else {
            return original;
        }
    }

    public static boolean isForceRespawn(int mapid) {
        switch (mapid) {
            case 103000800: //金银岛 - 组队训练场&lt;1阶段>
            case 925100100: //百草堂 - 突破船头！
                return true;
            default:
                return mapid / 100000 == 9800 && (mapid % 10 == 1 || mapid % 1000 == 100);
        }
    }

    public static int getFishingTime(boolean vip, boolean gm) {
        return gm ? 1000 : (vip ? 30000 : 60000);
    }

    public static int getCustomSpawnID(int summoner, int def) {
        switch (summoner) {
            case 9400589: //地狱船长
            case 9400748: //盖福克斯
                return 9400706; //小盖福克斯
            default:
                return def;
        }
    }

    public static boolean canForfeit(int questid) {
        switch (questid) {
            case 20000: //女皇的会面
            case 20010: //欢迎来到圣地！
            case 20015: //向年轻女王行礼
            case 20020: //5条岔路
                return false;
            default:
                return true;
        }
    }

    public static double getAttackRange(MapleStatEffect def, int rangeInc) {
        double defRange = ((400.0 + rangeInc) * (400.0 + rangeInc));
        if (def != null) {
            defRange += def.getMaxDistanceSq() + (def.getRange() * def.getRange());
        }
        //rangeInc adds to X
        //400 is approximate, screen is 600.. may be too much
        //200 for y is also too much
        //default 200000
        return defRange + 120000.0;
    }

    public static double getAttackRange(Point lt, Point rb) {
        double defRange = (400.0 * 400.0);
        final int maxX = Math.max(Math.abs(lt == null ? 0 : lt.x), Math.abs(rb == null ? 0 : rb.x));
        final int maxY = Math.max(Math.abs(lt == null ? 0 : lt.y), Math.abs(rb == null ? 0 : rb.y));
        defRange += (maxX * maxX) + (maxY * maxY);
        //rangeInc adds to X
        //400 is approximate, screen is 600.. may be too much
        //200 for y is also too much
        //default 200000
        return defRange + 120000.0;
    }

    public static boolean is不检测范围(int skillId) {
        switch (skillId) {
            case 神射手.爆炸箭:
            case 冲锋队长.龙卷风拳:
            case 神炮王.猴子炸药桶:
            case 神炮王.猴子炸药桶_爆炸:
            case 冰雷.冰河锁链:
            case 冰雷.链环闪电:
            case 冰雷.寒霜爆晶:
            case 恶魔猎手.恶魔追踪:
            case 夜光.晨星坠落:
            case 夜光.晨星坠落_爆炸:
            case 夜光.闪电反击:
            case 狂龙战士.扇击:
            case 狂龙战士.扇击_1:
            case 隐士.刺客标记_飞镖:
            case 隐士.隐士标记_飞镖:
                return true;
        }
        return false;
    }

    public static boolean isNoDelaySkill(int skillId) {
        switch (skillId) {
            case 冲锋队长.能量获得:
            case 战神.抗压:
            case 火毒.快速移动精通:
            case 冰雷.快速移动精通:
            case 主教.快速移动精通:
            case 龙神.快速移动精通:
            case 机械师.金属机甲_人类:
            case 机械师.金属机甲_战车:
            case 机械师.战争机器_泰坦:
            case 龙神.飞龙闪:
            case 龙神.玛瑙的意志:
            case 双刀.阿修罗:
            case 豹弩游侠.召唤美洲豹_灰:
            case 豹弩游侠.召唤美洲豹_黄:
            case 豹弩游侠.召唤美洲豹_红:
            case 豹弩游侠.召唤美洲豹_紫:
            case 豹弩游侠.召唤美洲豹_蓝:
            case 豹弩游侠.召唤美洲豹_剑:
            case 豹弩游侠.召唤美洲豹_雪:
            case 豹弩游侠.召唤美洲豹_玛瑙:
            case 豹弩游侠.召唤美洲豹_铠甲:
            case 唤灵斗师.死亡:
            case 唤灵斗师.死亡契约:
            case 唤灵斗师.死亡契约2:
            case 唤灵斗师.死亡契约3:
            case 唤灵斗师.黑暗闪电:
            case 隐月.灵狐:
                return true;
        }
        return false;
    }

    public static boolean isNoApplyTo(int skillId) {
        switch (skillId) {
            case 恶魔猎手.黑暗变形:
            case 狂龙战士.剑刃之壁:
            case 狂龙战士.进阶剑刃之壁:
            case 狂龙战士.剑刃之壁_变身:
            case 狂龙战士.进阶剑刃之壁_变身:
            case 尖兵.宙斯盾系统:
            case 冰雷.寒冰步:
            case 双刀.阿修罗:
            case 神射手.箭矢炮盘_攻击:
            case 夜光.晨星坠落:
            case 爆莉萌天使.灵魂汲取_攻击:
            case 恶魔复仇者.追击盾_攻击:
            case 风灵使者.狂风肆虐Ⅰ:
            case 风灵使者.狂风肆虐Ⅱ:
            case 风灵使者.狂风肆虐Ⅲ:
            case 风灵使者.暴风灭世:
                return true;
        }
        return false;
    }

    public static boolean isNoSpawn(int mapID) {
        return mapID == 809040100
                || mapID == 910150210 //新手地图 - 过去的回忆
                || mapID == 925020010 //新手教学 - 武陵道场修炼场
                || mapID == 925020011 //新手教学 - 武陵道场修炼场
                || mapID == 925020012 //新手教学 - 武陵道场修炼场
                || mapID == 925020013 //新手教学 - 武陵道场修炼场
                || mapID == 925020014 //新手教学 - 武陵道场修炼场
                || mapID == 980010000 //阿里安特竞技场 - 竞技场等候室
                || mapID == 980010100 //阿里安特竞技场 - 第一次竞技场&lt;等候室>
                || mapID == 980010200 //阿里安特竞技场 - 第二次竞技场&lt;等候室>
                || mapID == 980010300 //阿里安特竞技场 - 第三次竞技场&lt;等候室>
                || mapID == 980010020; //阿里安特竞技场 - 竞技场出口
    }

    public static int getOverrideNpc(int npcID) {
        int ret = npcID;
        switch (ret) {
            case 1033221:
                ret = 9330370;
                break;
        }
        return ret;
    }

    public static boolean isDojo(int mapId) {
        return mapId >= 925020100 && mapId <= 925023814;
    }

    public static int getPartyPlayHP(int mobID) {
        switch (mobID) {
            case 4250000: //苔藓蜗牛
                return 836000;
            case 4250001: //苔藓木妖
                return 924000;
            case 5250000: //苔藓蘑菇
                return 1100000;
            case 5250001: //石头虫
                return 1276000;
            case 5250002: //原始野猪
                return 1452000;
            case 9400661:
                return 15000000;
            case 9400660:
                return 30000000;
            case 9400659:
                return 45000000;
            case 9400658:
                return 20000000;
        }
        return 0;
    }

    public static int getPartyPlayEXP(int mobID) {
        switch (mobID) {
            case 4250000: //苔藓蜗牛
                return 5770;
            case 4250001: //苔藓木妖
                return 6160;
            case 5250000: //苔藓蘑菇
                return 7100;
            case 5250001: //石头虫
                return 7975;
            case 5250002: //原始野猪
                return 8800;
            case 9400661:
                return 40000;
            case 9400660:
                return 70000;
            case 9400659:
                return 90000;
            case 9400658:
                return 50000;
        }
        return 0;
    }

    public static int getPartyPlay(int mapId) {
        switch (mapId) {
            case 300010000: //艾琳森林 - 苔藓树丛入口
            case 300010100: //艾琳森林 - 苔藓树丛西部森林1
            case 300010200: //艾琳森林 - 苔藓树丛西部森林2
            case 300010300: //艾琳森林 - 苔藓树丛小路
            case 300010400: //艾琳森林 - 石头山入口
            case 300020000: //艾琳森林 - 苔藓树丛南部森林1
            case 300020100: //艾琳森林 - 苔藓树丛南部森林2
            case 300020200: //艾琳森林 - 蘑菇山丘入口
            case 300030000: //艾琳森林 - 苔藓树丛东部森林

            case 683070400:
            case 683070401:
            case 683070402:
                return 25;
        }
        return 0;
    }

    public static int getPartyPlay(int mapId, int def) {
        int dd = getPartyPlay(mapId);
        if (dd > 0) {
            return dd;
        }
        return def / 2;
    }

    public static boolean isHyperTeleMap(int mapId) {
        for (int i : hyperTele) {
            if (i == mapId) {
                return true;
            }
        }
        return false;
    }

    public static int getCurrentDate() {
        String time = FileoutputUtil.CurrentReadable_Time();
        return Integer.parseInt(new StringBuilder(time.substring(0, 4)).append(time.substring(5, 7)).append(time.substring(8, 10)).append(time.substring(11, 13)).toString());
    }

    public static int getCurrentDate_NoTime() {
        String time = FileoutputUtil.CurrentReadable_Time();
        return Integer.parseInt(new StringBuilder(time.substring(0, 4)).append(time.substring(5, 7)).append(time.substring(8, 10)).toString());
    }

    public static void achievementRatio(MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        //PQs not affected: Amoria, MV, CWK, English, Zakum, Horntail(?), Carnival, Ghost, Guild, LudiMaze, Elnath(?) 
        switch (c.getPlayer().getMapId()) {
            case 240080600:
            case 920010000: //隐密之地 - 雅典娜禁地&lt;岔路>
            case 930000000: //毒雾森林 - 毒雾森林
            case 930000100: //毒雾森林 - 森林初入
            case 910010000: //金银岛 - 迎月花山丘
            case 922010100:
            case 910340100: //隐藏地图  -  第一次同行&lt;1号门> 
            case 925100000:
            case 926100000:
            case 926110000:
            case 921120005:
            case 932000100:
            case 923040100:
            case 921160100:
                c.getSession().write(MaplePacketCreator.achievementRatio(0));
                break;
            case 930000200:
            case 922010200:
            case 922010300:
            case 922010400:
            case 922010401:
            case 922010402:
            case 922010403:
            case 922010404:
            case 922010405:
            case 925100100:
            case 926100001:
            case 926110001:
            case 921160200:
                c.getSession().write(MaplePacketCreator.achievementRatio(10));
                break;
            case 930000300:
            case 910340200:
            case 922010500:
            case 922010600:
            case 925100200:
            case 925100201:
            case 925100202:
            case 926100100:
            case 926110100:
            case 921120100:
            case 932000200:
            case 923040200:
            case 921160300:
            case 921160310:
            case 921160320:
            case 921160330:
            case 921160340:
            case 921160350:
                c.getSession().write(MaplePacketCreator.achievementRatio(25));
                break;
            case 930000400:
            case 926100200:
            case 926110200:
            case 926100201:
            case 926110201:
            case 926100202:
            case 926110202:
            case 921160400:
                c.getSession().write(MaplePacketCreator.achievementRatio(35));
                break;
            case 910340300:
            case 922010700:
            case 930000500:
            case 925100300:
            case 925100301:
            case 925100302:
            case 926100203:
            case 926110203:
            case 921120200:
            case 932000300:
            case 240080700:
            case 240080800:
            case 923040300:
            case 921160500:
                c.getSession().write(MaplePacketCreator.achievementRatio(50));
                break;
            case 910340400:
            case 922010800:
            case 930000600:
            case 925100400:
            case 926100300:
            case 926110300:
            case 926100301:
            case 926110301:
            case 926100302:
            case 926110302:
            case 926100303:
            case 926110303:
            case 926100304:
            case 926110304:
            case 921120300:
            case 932000400:
            case 923040400:
            case 921160600:
                c.getSession().write(MaplePacketCreator.achievementRatio(70));
                break;
            case 910340500:
            case 922010900:
            case 930000700:
            case 920010800:
            case 925100500:
            case 926100400:
            case 926110400:
            case 926100401:
            case 926110401:
            case 921120400:
            case 921160700:
                c.getSession().write(MaplePacketCreator.achievementRatio(85));
                break;
            case 922011000:
            case 922011100:
            case 930000800:
            case 920011000:
            case 920011100:
            case 920011200:
            case 920011300:
            case 925100600:
            case 926100500:
            case 926110500:
            case 926100600:
            case 926110600:
            case 921120500:
            case 921120600:
                c.getSession().write(MaplePacketCreator.achievementRatio(100));
                break;
        }
    }

    public static boolean is天使祝福戒指(int skillId) {
        return JobConstants.is新手职业(skillId / 10000) && (skillId % 10000 == 1085 || skillId % 10000 == 1087 || skillId % 10000 == 1090 || skillId % 10000 == 1179);
    }

    public static boolean is气象戒指(int skillId) {
        return JobConstants.is新手职业(skillId / 10000) && (skillId / 10000 == 8001) && (skillId % 10000 >= 67 && skillId % 10000 <= 80);
    }

    public static boolean isFishingMap(int mapid) {
        String map[] = FishingConfig.FISHING_MAP.split(",");
        for (String mapid_ : map) {
            if (Integer.valueOf(mapid_) == mapid) {
                return true;
            }
        }
        return false;
    }

    public static boolean isEventMap(int mapid) {
        return (mapid >= 109010000 && mapid < 109050000) || (mapid > 109050001 && mapid < 109090000) || (mapid >= 809040000 && mapid <= 809040100);
    }

    public static boolean isMagicChargeSkill(int skillid) {
        switch (skillid) {
            //case 火毒.创世之破:
            //case 冰雷.创世之破:
            case 主教.创世之破:
                return true;
        }
        return false;
    }

    public static boolean isTeamMap(int mapid) {
        return mapid == 109080000
                || mapid == 109080001
                || mapid == 109080002
                || mapid == 109080003
                || mapid == 109080010
                || mapid == 109080011
                || mapid == 109080012
                || mapid == 109090300
                || mapid == 109090301
                || mapid == 109090302
                || mapid == 109090303
                || mapid == 109090304
                || mapid == 910040100
                || mapid == 960020100
                || mapid == 960020101
                || mapid == 960020102
                || mapid == 960020103
                || mapid == 960030100
                || mapid == 689000000
                || mapid == 689000010;
    }

    public static int getStatDice(int stat) {
        switch (stat) {
            case 2:
                return 30;
            case 3:
                return 20;
            case 4:
                return 15;
            case 5:
                return 20;
            case 6:
                return 30;
        }
        return 0;
    }

    public static int getDiceStat(int buffid, int stat) {
        if (buffid == stat || buffid % 10 == stat || buffid / 10 == stat) {
            return getStatDice(stat);
        } else if (buffid == (stat * 100)) {
            return getStatDice(stat) + 10;
        }
        return 0;
    }

    /*
     * 恶魔MP也就是那个能量
     */
    public static int getMPByJob(int job) {
        switch (job) {
            case 3001:
            case 3100:
            case 3110:
            case 3111:
            case 3112:
                return 10;
        }
        return JobConstants.is神之子(job) ? 100 : 0;
    }

    public static int getHpApByJob(int jobId) {
        if ((jobId % 1000) / 100 > 5) {
            jobId -= 500;
        }
        if ((jobId % 1000) / 100 == 5) {
            switch (jobId / 10) {
                case 51:
                    return 68;
                case 53:
                    return 28;
            }
        }
        switch (jobId / 100) {
            case 21:
                return 30;
            case 22:
                return 12;
            case 31:
                return 38;
            case 32:
                return 20;
        }
        switch ((jobId % 1000) / 100) {
            case 0:
                return 8;
            case 1:
                return 50;
            case 2:
                return 6;
            case 3:
            case 4:
                return 16;
            case 5:
                return 18;
            default:
                return 8;
        }
    }

    public static int getMpApByJob(int jobId) {
        if (jobId / 100 == 31 || jobId / 100 == 65 || jobId / 100 == 100 || jobId / 100 == 101) {
            return 0;
        }
        if ((jobId % 1000) / 100 > 5) {
            jobId -= 500;
        }
        switch (jobId / 100) {
            case 22:
                return 72;
            case 32:
                return 69;
        }
        switch ((jobId % 1000) / 100) {
            case 0:
                return 57;
            case 1:
                return 53;
            case 2:
                return 79;
            case 3:
            case 4:
                return 61;
            case 5:
                return 65;
            default:
                return 57;
        }
    }

    /*
     * 角色卡系统
     * 1 = B
     * 2 = A
     * 3 = S
     * 4 = SS
     */
    public static int getCardSkillLevel(int level) {
        if (level >= 60 && level < 100) {
            return 2;
        } else if (level >= 100 && level < 200) {
            return 3;
        } else if (level >= 200) {
            return 4;
        }
        return 1;
    }

    public static final int[] publicNpcIds = {9270035, 9070004, 9010022, 9071003, 9000087, 9000088, 9010000, 9000085, 9000018, 9000000};
    public static final String[] publicNpcs = {"#cUniversal NPC#", "Move to the #cBattle Square# to fight other players", "Move to a variety of #cparty quests#.", "Move to #cMonster Park# to team up to defeat monsters.", "Move to #cFree Market# to trade items with players.", "Move to #cArdentmill#, the crafting town.",
        "Check #cdrops# of any monster in the map.", "Review #cPokedex#.", "Review #cPokemon#.", "Join an #cevent# in progress."};
    //questID; FAMILY USES 19000x, MARRIAGE USES 16000x, EXPED USES 16010x
    //dojo = 150000, bpq = 150001, master monster portals: 122600
    //compensate evan = 170000, compensate sp = 170001
    public static final int ENTER_CASH_SHOP = 99998;
    public static final int CHECK_DAY = 99999;
    public static final int OMOK_SCORE = 122200;
    public static final int MATCH_SCORE = 122210;
    public static final int HP_ITEM = 122221;
    public static final int MP_ITEM = 122223;
    public static final int BUFF_SKILL = 122224;
    public static final int JAIL_TIME = 123455;
    public static final int JAIL_QUEST = 123456;
    public static final int REPORT_QUEST = 123457;
    public static final int ULT_EXPLORER = 111111;
    //codex = -55 slot
    //crafting/gathering are designated as skills(short exp then byte 0 then byte level), same with recipes(integer.max_value skill level)
    public static final int POKEMON_WINS = 122400;
    public static final int ENERGY_DRINK = 122500;
    public static final int HARVEST_TIME = 122501;
    public static final int PENDANT_SLOT = 122700;
    public static final int CURRENT_SET = 122800;
    public static final int BOSS_PQ = 150001;
    public static final int JAGUAR = 111112;
    public static final int DOJO = 150100;
    public static final int DOJO_RECORD = 150101;
    public static final int PARTY_REQUEST = 122900;
    public static final int PARTY_INVITE = 122901;
    public static final int ALLOW_PET_LOOT = 122902;
    public static final int 宠物自动喂食 = 12334;
    public static final int QUICK_SLOT = 123000;
    public static final int 精灵耳朵 = 7784;
    public static final int 重新领取勋章 = 29949;
    public static final int 林之灵耳朵尾巴 = 59300;
    public static final int 美洲豹管理 = 23008;
    public static final int 每日签到系统_签到记录 = 7;
    public static final int 每日签到系统_当前时间 = 9;

    public static boolean is致命毒液(int skillId) {
        switch (skillId) {
            case 侠盗.致命毒液:
            case 隐士.致命毒液:
                return true;
        }
        return false;
    }

    public static int getAdditionExpRate(final int level) {
        int addition = 1;
        if (level < 100) {
            addition = Math.max(20, 1000 - level * 10);
        }
        return addition;
    }

    public static int getAdditionDropRate(final int level) {
        int addition = 1;
        if (level < 70) {
            addition = 2;
        }
        return addition;
    }

    public static final int[] allscrolllist = {
        2040002,
        2040005,
        2040016,
        2040026,
        2040031,
        2040100,
        2040105,
        2040200,
        2040205,
        2040302,
        2040310,
        2040318,
        2040323,
        2040328,
        2040329,
        2040330,
        2040331,
        2040402,
        2040412,
        2040419,
        2040422,
        2040427,
        2040502,
        2040505,
        2040514,
        2040517,
        2040534,
        2040602,
        2040612,
        2040619,
        2040622,
        2040627,
        2040702,
        2040705,
        2040708,
        2040802,
        2040805,
        2040816,
        2040825,
        2040902,
        2040915,
        2040920,
        2040925,
        2040928,
        2040933,
        2041002,
        2041005,
        2041008,
        2041011,
        2041014,
        2041017,
        2041020,
        2041023,
        2041102,
        2041105,
        2041108,
        2041111,
        2041201,
        2041206,
        2041302,
        2041305,
        2041308,
        2041311,
        2043002,
        2043008,
        2043019,
        2043102,
        2043114,
        2043202,
        2043214,
        2043302,
        2043402,
        2043702,
        2043802,
        2044002,
        2044014,
        2044015,
        2044102,
        2044114,
        2044202,
        2044214,
        2044302,
        2044314,
        2044402,
        2044414,
        2044502,
        2044602,
        2044702,
        2044802,
        2044809,
        2044902,
        2045202,
        2045302,
        2048002,
        2042102, // 双头杖魔法攻击力卷轴 10%
        2042202, // 灵魂手铳攻击力卷轴 10%
        2043602, // 手杖攻击力卷轴 10%
        2042302, // 亡命剑攻击力卷轴 10%
        2042402 // 能量剑攻击力卷轴 10%
    };

    public static final int getOverrideChangeToMap(int mapid) {
        int ret = mapid;
        switch (mapid) {
            case 101010102:
            case 104040002:
            case 102020300:
            case 100030000:
            case 103030200:
            case 105050400:
            case 677000010:
                ret = 200000000;
                break;
        }
        return ret;
    }

    public static final int getOverrideReturnMap(int mapid) {
        int ret = mapid;
        switch (mapid) {
            case 960000100:
                ret = 910150210;
                break;
            case JAIL:
            case 910150210:
            case 913051200:
                break;
        }
        return ret;
    }

    public static boolean canSealedLevelUp(int itemid, int level, long exp) {
        return exp >= getExpNeededForLevel(160) && level < (ItemConstants.isAccessory(itemid) ? 3 : 6);
    }

    public static final boolean isDoJangConsume(final int id) {
        return id >= 2022431 && id <= 2022433;
    }

    /*
     * 技能的模式
     */
    public static final int getLuminousSkillMode(int skillId) {
        switch (skillId) {
            case 夜光.耀眼光球:
            case 夜光.仙女发射:
            case 夜光.闪爆光柱:
            case 夜光.超级光谱:
            case 夜光.闪耀救赎:
            case 夜光.闪电反击:
                return 夜光.太阳火焰; //光明技能 20040216 - 太阳火焰 - 使用充满光明的光之魔法后，造成额外伤害。每次施展魔法时，恢复一定比例的体力，MP使用量减少50%。
            case 夜光.黑暗降临:
            case 夜光.虚空重压:
            case 夜光.暗锁冲击:
            case 夜光.晨星坠落:
            case 夜光.启示录:
            case 夜光.晨星坠落_爆炸:
                return 夜光.月蚀; //黑暗技能 20040217 - 月蚀 - 使用充满黑暗的暗之魔法后，造成额外伤害。每次施展魔法时，恢复一定比例的体力，MP使用量减少50%。
            case 夜光.死亡之刃:
            case 夜光.绝对死亡:
                return 夜光.平衡_光明; //平衡技能 20040219 - 平衡 - 使用光明和黑暗完美平衡的稳如泰山，并使所有伤害减至1。使用光明、黑暗，混合魔法时产生额外伤害。无冷却时间，施展光明攻击魔法时，恢复一定比例的体力；施展黑暗攻击魔法时，不消耗MP。
        }
        return -1;
    }

    /**
     * 技能无视时间限制
     *
     * @param skillid
     * @return
     */
    public static final boolean isSkillTiem(int skillid) {
        switch (skillid) {
            case 林之灵.旋风飞行:
            case 冰雷.寒霜爆晶:
            case 侠盗.潜影杀机:
                return true;
        }
        return false;
    }

    public static final boolean isShareQuestInfo(int questid) {
        switch (questid) {
            case 每日签到系统_签到记录:
            case 每日签到系统_当前时间:
                return true;
            default:
                return false;
        }
    }
}
