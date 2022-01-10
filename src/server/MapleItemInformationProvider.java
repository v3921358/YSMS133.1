package server;

import client.MapleCharacter;
import client.MapleTraitType;
import client.inventory.*;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import database.DatabaseConnection;
import database.DatabaseConnectionWZ;

import java.awt.Point;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;

import provider.*;
import tools.Pair;
import tools.StringUtil;
import tools.Triple;

public class MapleItemInformationProvider {

    private static final MapleItemInformationProvider instance = new MapleItemInformationProvider();
    protected final MapleDataProvider chrData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Character.wz"));
    protected final MapleDataProvider etcData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Etc.wz"));
    protected final MapleDataProvider itemData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Item.wz"));
    protected final MapleDataProvider stringData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz"));
    protected Map<Integer, ItemInformation> dataCache = new HashMap<>();
    protected Map<String, List<Triple<String, Point, Point>>> afterImage = new HashMap<>();
    protected Map<Integer, List<StructItemOption>> optentialCache = new HashMap<>(); // 潜能
    protected Map<Integer, Map<Integer, StructItemOption>> socketCache = new HashMap<>(); //星岩
    protected Map<Integer, MapleStatEffect> itemEffects = new HashMap<>();
    protected Map<Integer, MapleStatEffect> itemEffectsEx = new HashMap<>();
    protected Map<Integer, Integer> mobIds = new HashMap<>();
    protected Map<Integer, Pair<Integer, Integer>> potLife = new HashMap<>(); //itemid to lifeid, levels
    protected Map<Integer, StructFamiliar> familiars = new HashMap<>(); //by familiarID
    protected Map<Integer, StructFamiliar> familiars_Item = new HashMap<>(); //by cardID
    protected Map<Integer, StructFamiliar> familiars_Mob = new HashMap<>(); //by mobID
    protected Map<Integer, Integer> androidType = new HashMap<>(); //智能机器人的类型信息 [道具ID 类型]
    protected Map<Integer, StructAndroid> androidInfo = new HashMap<>(); //智能机器人的具体信息
    protected Map<Integer, Triple<Integer, List<Integer>, List<Integer>>> monsterBookSets = new HashMap<>();
    protected Map<Integer, StructSetItem> SetItemInfo = new HashMap<>(); //套装属性
    protected Map<Integer, Map<String, String>> getExpCardTimes = new HashMap<>();
    protected Map<Integer, ScriptedItem> scriptedItemCache = new HashMap<>(); //拥有脚本道具的物品
    protected Map<Integer, Boolean> floatCashItem = new HashMap<>(); //拥有漂浮效果的道具
    protected Map<Integer, Short> petFlagInfo = new HashMap<>(); //宠物的状态信息
    protected Map<Integer, Integer> petSetItemID = new HashMap<>(); //宠物触发的套装ID
    protected Map<Integer, Integer> successRates = new HashMap<>(); //几个特殊卷的几率
    protected Map<Integer, Integer> forceUpgrade = new HashMap<>(); //强化卷轴成功提升的星级
    protected Map<Integer, Boolean> safetyShield = new HashMap<>(); //自带安全盾
    protected Map<Integer, Integer> ScrollLimitBreak = new HashMap<>(); //突破攻击上限卷轴增的攻击上限数字
    protected Map<Integer, StructCrossHunterShop> crossHunterShop = new HashMap<>(); //十字猎人商店数据
    protected Map<Integer, Pair<Integer, Integer>> chairRecovery = new HashMap<>(); //椅子恢复的HP [道具ID 恢复的HP 恢复的MP]
    protected Map<Integer, Integer> exclusiveEquip = new HashMap<>(); //禁止重复穿戴的道具数据 by 编号ID
    protected Map<Integer, StructExclusiveEquip> exclusiveEquipInfo = new HashMap<>(); //禁止重复穿戴的道具数据 by 道具ID
    protected Map<Integer, Boolean> noCursedScroll = new HashMap<>(); //上卷失败不消失的卷轴
    protected Map<Integer, Boolean> noNegativeScroll = new HashMap<>(); //正向卷轴 不减少属性
    protected Map<Integer, Boolean> safetyShieldScroll = new HashMap<>(); //砸卷失败不减少升级次数的卷轴道具
    protected Map<Integer, Map<Integer, List<Pair<String, Integer>>>> sealedEquipInfo = new HashMap<>(); //漩涡装备升级属性
    protected Map<String, List<EnchantingScroll>> enchantingScroll = new HashMap<>();
    protected Map<String, Map<Integer, EnchantingScroll>> enchantingEnhance = new HashMap<>();
    protected Map<Integer, Integer> skillSkin = new HashMap<>(); //技能皮肤装备的技能ID [皮肤ID 技能ID]
    protected Map<Integer, Integer> ScrollRecover = new HashMap<>(); //白衣卷轴成功后恢复的升级次数 [卷轴ID 恢复次数]
    protected List<Integer> HairFaces = new LinkedList<>(); //所有发型、脸型ID
    protected List<Integer> WeaponIDs = new LinkedList<>(); //所有武器
    protected Map<Integer, Integer> soulSuccessRates = new HashMap<>(); //灵魂结晶的成功率
    protected Map<Integer, Integer> soulSkill = new TreeMap<>();
    protected Map<Integer, ArrayList<Integer>> tempOption = new TreeMap<>();
    protected Map<Integer, Pair<Integer, Integer>> socketReqLevel = new TreeMap<>();
    protected Map<Integer, String> faceList = new TreeMap<>();
    protected Map<Integer, String> hairList = new TreeMap<>();
    protected Map<Integer, String> tamingMob = new TreeMap<>();

    public void runEtc() {
        if (!SetItemInfo.isEmpty() || !optentialCache.isEmpty() || !socketCache.isEmpty()) {
            return;
        }
        /*
         * 加载套装属性
         */
        MapleData setsData = etcData.getData("SetItemInfo.img");
        StructSetItem SetItem;
        StructSetItemStat SetItemStat;
        for (MapleData dat : setsData) {
            SetItem = new StructSetItem();
            SetItem.setItemID = Integer.parseInt(dat.getName()); //套装ID
            SetItem.setItemName = MapleDataTool.getString("setItemName", dat, ""); //套装名字
            SetItem.completeCount = (byte) MapleDataTool.getIntConvert("completeCount", dat, 0); //套装总数
            for (MapleData level : dat.getChildByPath("ItemID")) {
                if (level.getType() != MapleDataType.INT) {
                    for (MapleData leve : level) {
                        if (!leve.getName().equals("representName") && !leve.getName().equals("typeName")) {
                            try {
                                SetItem.itemIDs.add(MapleDataTool.getIntConvert(leve));
                            } catch (Exception e) {
                                System.err.println("出错数据： leve = " + leve.getData());
                            }
                        }
                    }
                } else {
                    SetItem.itemIDs.add(MapleDataTool.getInt(level));
                }
            }
            for (MapleData level : dat.getChildByPath("Effect")) {
                SetItemStat = new StructSetItemStat();
                SetItemStat.incSTR = MapleDataTool.getIntConvert("incSTR", level, 0);
                SetItemStat.incDEX = MapleDataTool.getIntConvert("incDEX", level, 0);
                SetItemStat.incINT = MapleDataTool.getIntConvert("incINT", level, 0);
                SetItemStat.incLUK = MapleDataTool.getIntConvert("incLUK", level, 0);
                SetItemStat.incMHP = MapleDataTool.getIntConvert("incMHP", level, 0);
                SetItemStat.incMMP = MapleDataTool.getIntConvert("incMMP", level, 0);
                SetItemStat.incMHPr = MapleDataTool.getIntConvert("incMHPr", level, 0);
                SetItemStat.incMMPr = MapleDataTool.getIntConvert("incMMPr", level, 0);
                SetItemStat.incACC = MapleDataTool.getIntConvert("incACC", level, 0);
                SetItemStat.incEVA = MapleDataTool.getIntConvert("incEVA", level, 0);
                SetItemStat.incPDD = MapleDataTool.getIntConvert("incPDD", level, 0);
                SetItemStat.incMDD = MapleDataTool.getIntConvert("incMDD", level, 0);
                SetItemStat.incPAD = MapleDataTool.getIntConvert("incPAD", level, 0);
                SetItemStat.incMAD = MapleDataTool.getIntConvert("incMAD", level, 0);
                SetItemStat.incJump = MapleDataTool.getIntConvert("incJump", level, 0);
                SetItemStat.incSpeed = MapleDataTool.getIntConvert("incSpeed", level, 0);
                SetItemStat.incAllStat = MapleDataTool.getIntConvert("incAllStat", level, 0);
                SetItemStat.incPQEXPr = MapleDataTool.getIntConvert("incPQEXPr", level, 0);
                SetItemStat.incPVPDamage = MapleDataTool.getIntConvert("incPVPDamage", level, 0);
                SetItemStat.option1 = MapleDataTool.getIntConvert("Option/1/option", level, 0);
                SetItemStat.option2 = MapleDataTool.getIntConvert("Option/2/option", level, 0);
                SetItemStat.option3 = MapleDataTool.getIntConvert("Option/3/option", level, 0);
                SetItemStat.option1Level = MapleDataTool.getIntConvert("Option/1/level", level, 0);
                SetItemStat.option2Level = MapleDataTool.getIntConvert("Option/2/level", level, 0);
                SetItemStat.option3Level = MapleDataTool.getIntConvert("Option/3/level", level, 0);
                SetItemStat.skillId = MapleDataTool.getIntConvert("activeSkill/0/id", level, 0);
                SetItemStat.skillLevel = MapleDataTool.getIntConvert("activeSkill/0/level", level, 0);
                SetItem.setItemStat.put(Integer.parseInt(level.getName()), SetItemStat); //[激活属性的数量] [激活后的套装加成属性]
            }
            SetItemInfo.put(SetItem.setItemID, SetItem);
        }
        /*
         * 加载潜能数据
         */
        StructItemOption item;
        MapleData potsData = itemData.getData("ItemOption.img");
        List<StructItemOption> items;
        for (MapleData dat : potsData) {
            items = new LinkedList<>();
            for (MapleData potLevel : dat.getChildByPath("level")) {
                item = new StructItemOption();
                item.opID = Integer.parseInt(dat.getName());
                item.optionType = MapleDataTool.getIntConvert("info/optionType", dat, 0);
                item.reqLevel = MapleDataTool.getIntConvert("info/reqLevel", dat, 0);
                item.opString = MapleDataTool.getString("info/string", dat, "");
                for (String i : StructItemOption.types) {
                    if (i.equals("face")) {
                        item.face = MapleDataTool.getString("face", potLevel, "");
                    } else {
                        int level = MapleDataTool.getIntConvert(i, potLevel, 0);
                        if (level > 0) { // Save memory
                            item.data.put(i, level);
                        }
                    }
                }
                switch (item.opID) {
                    case 31001: //可以使用好用的轻功技能
                    case 31002: //可以使用好用的时空门技能
                    case 31003: //可以使用好用的火眼晶晶技能
                    case 31004: //可以使用好用的神圣之火技能
                        item.data.put("skillID", (item.opID - 23001));
                        break;
                    case 41005: //可以使用强化战斗命令技能
                    case 41006: //可以使用强化进阶祝福技能
                    case 41007: //可以使用强化极速领域技能
                        item.data.put("skillID", (item.opID - 33001));
                        break;
                }
                items.add(item);
            }
           optentialCache.put(Integer.parseInt(dat.getName()), items);
        }
        /*
         * 加载星岩数据
         */
        Map<Integer, StructItemOption> gradeS = new HashMap<>();
        Map<Integer, StructItemOption> gradeA = new HashMap<>();
        Map<Integer, StructItemOption> gradeB = new HashMap<>();
        Map<Integer, StructItemOption> gradeC = new HashMap<>();
        Map<Integer, StructItemOption> gradeD = new HashMap<>();
        MapleData nebuliteData = itemData.getData("Install/0306.img");
        for (MapleData dat : nebuliteData) {
            item = new StructItemOption();
            item.opID = Integer.parseInt(dat.getName()); // Item Id
            item.optionType = MapleDataTool.getInt("optionType", dat.getChildByPath("socket"), 0);
            for (MapleData info : dat.getChildByPath("socket/option")) {
                String optionString = MapleDataTool.getString("optionString", info, "");
                int level = MapleDataTool.getInt("level", info, 0);
                if (level > 0) { // Save memory
                    item.data.put(optionString, level);
                }
            }
            switch (item.opID) {
                case 3063370: // Haste
                    item.data.put("skillID", 8000);
                    break;
                case 3063380: // Mystic Door
                    item.data.put("skillID", 8001);
                    break;
                case 3063390: // Sharp Eyes
                    item.data.put("skillID", 8002);
                    break;
                case 3063400: // Hyper Body
                    item.data.put("skillID", 8003);
                    break;
                case 3064470: // Combat Orders
                    item.data.put("skillID", 8004);
                    break;
                case 3064480: // Advanced Blessing
                    item.data.put("skillID", 8005);
                    break;
                case 3064490: // Speed Infusion
                    item.data.put("skillID", 8006);
                    break;
            }
            switch (ItemConstants.getNebuliteGrade(item.opID)) {
                case 4: //S
                    gradeS.put(Integer.parseInt(dat.getName()), item);
                    break;
                case 3: //A
                    gradeA.put(Integer.parseInt(dat.getName()), item);
                    break;
                case 2: //B
                    gradeB.put(Integer.parseInt(dat.getName()), item);
                    break;
                case 1: //C
                    gradeC.put(Integer.parseInt(dat.getName()), item);
                    break;
                case 0: //D
                    gradeD.put(Integer.parseInt(dat.getName()), item);
                    break; // impossible to be -1 since we're looping in 306.img.xml					
            }
        }
        socketCache.put(4, gradeS);
        socketCache.put(3, gradeA);
        socketCache.put(2, gradeB);
        socketCache.put(1, gradeC);
        socketCache.put(0, gradeD);
        /*
         * 加载安卓信息
         */
        MapleDataDirectoryEntry e = (MapleDataDirectoryEntry) etcData.getRoot().getEntry("Android");
        for (MapleDataEntry d : e.getFiles()) {
            MapleData iz = etcData.getData("Android/" + d.getName());
            StructAndroid android = new StructAndroid();
            int type = Integer.parseInt(d.getName().substring(0, 4));
            android.type = type;
            android.gender = MapleDataTool.getIntConvert("info/gender", iz, 0);
            for (MapleData ds : iz.getChildByPath("costume/skin")) { //皮肤
                android.skin.add(MapleDataTool.getInt(ds, 2000));
            }
            for (MapleData ds : iz.getChildByPath("costume/hair")) { //发型
                android.hair.add(MapleDataTool.getInt(ds, android.gender == 0 ? 20101 : 21101));
            }
            for (MapleData ds : iz.getChildByPath("costume/face")) { //脸型
                android.face.add(MapleDataTool.getInt(ds, android.gender == 0 ? 30110 : 31510));
            }
            androidInfo.put(type, android);
        }
        /*
         * 加载十字猎人商店数据
         */
        MapleData shopData = etcData.getData("CrossHunterChapter.img").getChildByPath("Shop");
        for (MapleData dat : shopData) {
            int key = Integer.parseInt(dat.getName());
            StructCrossHunterShop shop = new StructCrossHunterShop(MapleDataTool.getIntConvert("itemId", dat, 0), MapleDataTool.getIntConvert("tokenPrice", dat, -1), MapleDataTool.getIntConvert("potentialGrade", dat, 0));
            crossHunterShop.put(key, shop);
        }
        /*
         * 道具宝宝
         */
        MapleData lifesData = etcData.getData("ItemPotLifeInfo.img");
        for (MapleData d : lifesData) {
            if (d.getChildByPath("info") != null && MapleDataTool.getInt("type", d.getChildByPath("info"), 0) == 1) {
                potLife.put(MapleDataTool.getInt("counsumeItem", d.getChildByPath("info"), 0), new Pair<>(Integer.parseInt(d.getName()), d.getChildByPath("level").getChildren().size()));
            }
        }
        List<Triple<String, Point, Point>> thePointK = new ArrayList<>();
        List<Triple<String, Point, Point>> thePointA = new ArrayList<>();

        MapleDataDirectoryEntry a = (MapleDataDirectoryEntry) chrData.getRoot().getEntry("Afterimage");
        for (MapleDataEntry b : a.getFiles()) {
            MapleData iz = chrData.getData("Afterimage/" + b.getName());
            List<Triple<String, Point, Point>> thePoint = new ArrayList<>();
            Map<String, Pair<Point, Point>> dummy = new HashMap<>();
            for (MapleData i : iz) {
                for (MapleData xD : i) {
                    if (xD.getName().contains("prone") || xD.getName().contains("double") || xD.getName().contains("triple")) {
                        continue;
                    }
                    if ((b.getName().contains("bow") || b.getName().contains("Bow")) && !xD.getName().contains("shoot")) {
                        continue;
                    }
                    if ((b.getName().contains("gun") || b.getName().contains("cannon")) && !xD.getName().contains("shot")) {
                        continue;
                    }
                    if (dummy.containsKey(xD.getName())) {
                        if (xD.getChildByPath("lt") != null) {
                            Point lt = (Point) xD.getChildByPath("lt").getData();
                            Point ourLt = dummy.get(xD.getName()).left;
                            if (lt.x < ourLt.x) {
                                ourLt.x = lt.x;
                            }
                            if (lt.y < ourLt.y) {
                                ourLt.y = lt.y;
                            }
                        }
                        if (xD.getChildByPath("rb") != null) {
                            Point rb = (Point) xD.getChildByPath("rb").getData();
                            Point ourRb = dummy.get(xD.getName()).right;
                            if (rb.x > ourRb.x) {
                                ourRb.x = rb.x;
                            }
                            if (rb.y > ourRb.y) {
                                ourRb.y = rb.y;
                            }
                        }
                    } else {
                        Point lt = null, rb = null;
                        if (xD.getChildByPath("lt") != null) {
                            lt = (Point) xD.getChildByPath("lt").getData();
                        }
                        if (xD.getChildByPath("rb") != null) {
                            rb = (Point) xD.getChildByPath("rb").getData();
                        }
                        dummy.put(xD.getName(), new Pair<>(lt, rb));
                    }
                }
            }
            for (Entry<String, Pair<Point, Point>> ez : dummy.entrySet()) {
                if (ez.getKey().length() > 2 && ez.getKey().substring(ez.getKey().length() - 2, ez.getKey().length() - 1).equals("D")) { //D = double weapon
                    thePointK.add(new Triple<>(ez.getKey(), ez.getValue().left, ez.getValue().right));
                } else if (ez.getKey().contains("PoleArm")) { //D = double weapon
                    thePointA.add(new Triple<>(ez.getKey(), ez.getValue().left, ez.getValue().right));
                } else {
                    thePoint.add(new Triple<>(ez.getKey(), ez.getValue().left, ez.getValue().right));
                }
            }
            afterImage.put(b.getName().substring(0, b.getName().length() - 4), thePoint);
        }
        afterImage.put("katara", thePointK); //hackish
        afterImage.put("aran", thePointA); //hackish
        //加载禁止重复穿戴的道具信息
        MapleData exclusiveEquipData = etcData.getData("ExclusiveEquip.img");
        StructExclusiveEquip exclusive;
        int exId;
        for (MapleData dat : exclusiveEquipData) {
            exclusive = new StructExclusiveEquip();
            exId = Integer.parseInt(dat.getName()); //编号ID
            String msg = MapleDataTool.getString("msg", dat, "");
            msg = msg.replace("\\r\\n", "\r\n");
            msg = msg.replace("-------<", "---<");
            msg = msg.replace(">------", ">---");
            exclusive.id = exId;
            exclusive.msg = msg;
            for (MapleData level : dat.getChildByPath("item")) {
                int itemId = MapleDataTool.getInt(level);
                exclusive.itemIDs.add(itemId);
                exclusiveEquip.put(itemId, exId);
            }
            exclusiveEquipInfo.put(exId, exclusive);
        }
        //自定义 老公老婆的戒指 编号 100
        exclusive = new StructExclusiveEquip();
        exId = 100; //编号ID
        exclusive.msg = "只能佩戴一个\r\n老公老婆的戒指。";
        for (int i = 1112446; i <= 1112495; i++) {
            exclusive.itemIDs.add(i);
            exclusiveEquip.put(i, exId);
        }
        exclusiveEquipInfo.put(exId, exclusive);
        //自定义 不速之客的戒指 编号 101
        exclusive = new StructExclusiveEquip();
        exId = 101; //编号ID
        exclusive.msg = "只能佩戴一个\r\n不速之客的戒指。";
        for (int i = 1112435; i <= 1112439; i++) {
            exclusive.itemIDs.add(i);
            exclusiveEquip.put(i, exId);
        }
        exclusiveEquipInfo.put(exId, exclusive);
        //自定义 十字旅团的戒指 编号 102
        exclusive = new StructExclusiveEquip();
        exId = 102; //编号ID
        exclusive.msg = "只能佩戴一个\r\n十字旅团的戒指。";
        for (int i = 1112599; i <= 1112613; i++) {
            exclusive.itemIDs.add(i);
            exclusiveEquip.put(i, exId);
        }
        exclusiveEquipInfo.put(exId, exclusive);

        /*
          所有武器
         */
        MapleDataDirectoryEntry weapon = (MapleDataDirectoryEntry) chrData.getRoot().getEntry("Weapon");
        for (MapleDataEntry d : weapon.getFiles()) {
            WeaponIDs.add(Integer.valueOf(d.getName().substring(0, 8)));
        }
        System.out.println("共加载了 " + WeaponIDs.size() + " 个武器");
    }

    public void runItems() {
        if (GameConstants.GMS) { //these must be loaded before items..
            MapleData fData = etcData.getData("FamiliarInfo.img");
            for (MapleData d : fData) {
                StructFamiliar f = new StructFamiliar();
                f.grade = 0;
                f.mob = MapleDataTool.getInt("mob", d, 0);
                f.passive = MapleDataTool.getInt("passive", d, 0);
                f.itemid = MapleDataTool.getInt("consume", d, 0);
                f.familiar = Integer.parseInt(d.getName());
                familiars.put(f.familiar, f);
                familiars_Item.put(f.itemid, f);
                familiars_Mob.put(f.mob, f);
            }
            MapleDataDirectoryEntry e = (MapleDataDirectoryEntry) chrData.getRoot().getEntry("Familiar");
            for (MapleDataEntry d : e.getFiles()) {
                int id = Integer.parseInt(d.getName().substring(0, d.getName().length() - 4));
                if (familiars.containsKey(id)) {
                    familiars.get(id).grade = (byte) MapleDataTool.getInt("grade", chrData.getData("Familiar/" + d.getName()).getChildByPath("info"), 0);
                }
            }

            MapleData mSetsData = etcData.getData("MonsterBookSet.img");
            for (MapleData d : mSetsData.getChildByPath("setList")) {
                if (MapleDataTool.getInt("deactivated", d, 0) > 0) {
                    continue;
                }
                List<Integer> set = new ArrayList<>(), potential = new ArrayList<>(3);
                for (MapleData ds : d.getChildByPath("stats/potential")) {
                    if (ds.getType() != MapleDataType.STRING && MapleDataTool.getInt(ds, 0) > 0) {
                        potential.add(MapleDataTool.getInt(ds, 0));
                        if (potential.size() >= 5) {
                            break;
                        }
                    }
                }
                for (MapleData ds : d.getChildByPath("cardList")) {
                    set.add(MapleDataTool.getInt(ds, 0));
                }
                monsterBookSets.put(Integer.parseInt(d.getName()), new Triple<>(MapleDataTool.getInt("setScore", d, 0), set, potential));
            }
        }

        try {
            Connection con = DatabaseConnectionWZ.getConnection();
            /*
             * Load Item Data
             */
            PreparedStatement ps = con.prepareStatement("SELECT * FROM wz_itemdata");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                initItemInformation(rs);
            }
            rs.close();
            ps.close();

            /*
             * Load Item Equipment Data
             */
            ps = con.prepareStatement("SELECT * FROM wz_itemequipdata ORDER BY itemid");
            rs = ps.executeQuery();
            while (rs.next()) {
                initItemEquipData(rs);
            }
            rs.close();
            ps.close();

            /*
             * Load Item Addition Data
             */
            ps = con.prepareStatement("SELECT * FROM wz_itemadddata ORDER BY itemid");
            rs = ps.executeQuery();
            while (rs.next()) {
                initItemAddData(rs);
            }
            rs.close();
            ps.close();

            /*
             * Load Item Reward Data
             */
            ps = con.prepareStatement("SELECT * FROM wz_itemrewarddata ORDER BY itemid");
            rs = ps.executeQuery();
            while (rs.next()) {
                initItemRewardData(rs);
            }
            rs.close();
            ps.close();

            /*
             * Finalize all Equipments
             */
            for (Entry<Integer, ItemInformation> entry : dataCache.entrySet()) {
                if (ItemConstants.getInventoryType(entry.getKey()) == MapleInventoryType.EQUIP) {
                    finalizeEquipData(entry.getValue());
                }
            }
        } catch (SQLException ex) {
            System.out.println("[ItemLoader] 加载装备数据出错." + ex);
        }
        System.out.println("共加载 " + dataCache.size() + " 个道具信息.");
    }

    /*
     * 通过ID获取潜能信息
     */
    public List<StructItemOption> getOptentialInfo(int optId) {
        return optentialCache.get(optId);
    }

    public Map<Integer, List<StructItemOption>> getAllOptentialInfo() {
        return optentialCache;
    }

    public Map<Integer, List<StructItemOption>> getOptentialInfos(int optId) {
        Map<Integer, List<StructItemOption>> ret = new HashMap<>();
        for (Entry<Integer, List<StructItemOption>> opts : optentialCache.entrySet()) {
            if (opts.getKey() >= optId) {
                ret.put(opts.getKey(), opts.getValue());
            }
        }
        return ret;
    }

    /*
     * 获取装备 指定潜能ID 的描述信息
     */
    public String resolveOptentialId(int itemId, int potId) {
        int eqLevel = getReqLevel(itemId);
        int potLevel;
        List<StructItemOption> potInfo = getOptentialInfo(potId);
        if (eqLevel == 0) {
            potLevel = 1;
        } else {
            potLevel = (eqLevel + 1) / 10;
            potLevel++;
        }
        if (potId <= 0) {
            return "没有潜能属性";
        }
        StructItemOption itemOption = potInfo.get(potLevel - 1);
        String ret = itemOption.opString;
        for (int i = 0; i < itemOption.opString.length(); i++) {
            //# denotes the beginning of the parameter name that needs to be replaced, e.g. "Weapon DEF: +#incPDD" 
            if (itemOption.opString.charAt(i) == '#') {
                int j = i + 2;
                while ((j < itemOption.opString.length()) && itemOption.opString.substring(i + 1, j).matches("^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
                    j++;
                }
                String curParam = itemOption.opString.substring(i, j);
                String curParamStripped;
                //get rid of any trailing percent signs on the parameter name 
                if (j != itemOption.opString.length() || itemOption.opString.charAt(itemOption.opString.length() - 1) == '%') { //hacky 
                    curParamStripped = curParam.substring(1, curParam.length() - 1);
                } else {
                    curParamStripped = curParam.substring(1);
                }
                String paramValue = Integer.toString(itemOption.get(curParamStripped));
                if (curParam.charAt(curParam.length() - 1) == '%') {
                    paramValue = paramValue.concat("%");
                }
                ret = ret.replace(curParam, paramValue);
            }
        }
        return ret;
    }


    /*
     * 通过ID获取星岩信息
     */
    public StructItemOption getSocketInfo(int socketId) {
        int grade = ItemConstants.getNebuliteGrade(socketId);
        if (grade == -1) {
            return null;
        }
        return socketCache.get(grade).get(socketId);
    }

    public Map<Integer, StructItemOption> getAllSocketInfo(int grade) {
        return socketCache.get(grade);
    }

    public Collection<Integer> getMonsterBookList() {
        return mobIds.values();
    }

    public Map<Integer, Integer> getMonsterBook() {
        return mobIds;
    }

    public Pair<Integer, Integer> getPot(int f) {
        return potLife.get(f);
    }

    public StructFamiliar getFamiliar(int f) {
        return familiars.get(f);
    }

    public Map<Integer, StructFamiliar> getFamiliars() {
        return familiars;
    }

    public StructFamiliar getFamiliarByItem(int f) {
        return familiars_Item.get(f);
    }

    public StructFamiliar getFamiliarByMob(int f) {
        return familiars_Mob.get(f);
    }

    public static MapleItemInformationProvider getInstance() {
        return instance;
    }

    public Collection<ItemInformation> getAllItems() {
        return dataCache.values();
    }

    public StructAndroid getAndroidInfo(int i) {
        return androidInfo.get(i);
    }

    public Triple<Integer, List<Integer>, List<Integer>> getMonsterBookInfo(int i) {
        return monsterBookSets.get(i);
    }

    public Map<Integer, Triple<Integer, List<Integer>, List<Integer>>> getAllMonsterBookInfo() {
        return monsterBookSets;
    }

    protected MapleData getItemData(int itemId) {
        MapleData ret = null;
        String idStr = "0" + String.valueOf(itemId);
        MapleDataDirectoryEntry root = itemData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr.substring(0, 4) + ".img")) {
                    ret = itemData.getData(topDir.getName() + "/" + iFile.getName());
                    if (ret == null) {
                        return null;
                    }
                    ret = ret.getChildByPath(idStr);
                    return ret;
                } else if (iFile.getName().equals(idStr.substring(1) + ".img")) {
                    ret = itemData.getData(topDir.getName() + "/" + iFile.getName());
                    return ret;
                }
            }
        }
        root = chrData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr + ".img")) {
                    ret = chrData.getData(topDir.getName() + "/" + iFile.getName());
                    return ret;
                }
            }
        }
        return ret;
    }

    public Point getItemLt(int itemId) { // 获取物品的lt节点物品 0528.img
        MapleData item = getItemData(itemId);
        Point pData = (Point) item.getChildByPath("info/lt").getData();
        return pData;
    }

    public Point getItemRb(int itemId) { // 获取物品的rb节点物品 0528.img
        MapleData item = getItemData(itemId);
        Point pData = (Point) item.getChildByPath("info/rb").getData();
        return pData;
    }

    public Integer getItemIdByMob(int mobId) {
        return mobIds.get(mobId);
    }

    public Integer getSetId(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.cardSet;
    }

    /**
     * returns the maximum of items in one slot
     */
    public short getSlotMax(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return 0;
        }
        return i.slotMax;
    }

    public int getWholePrice(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return 0;
        }
        return i.wholePrice;
    }

    public double getPrice(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return -1.0;
        }
        return i.price;
    }

    protected int rand(int min, int max) {
        return Math.abs(Randomizer.rand(min, max));
    }

    public Equip levelUpEquip(Equip equip, Map<String, Integer> sta) {
        Equip nEquip = (Equip) equip.copy();
        //is this all the stats?
        try {
            for (Entry<String, Integer> stat : sta.entrySet()) {
                switch (stat.getKey()) {
                    case "STRMin":
                        nEquip.setStr((short) (nEquip.getStr() + rand(stat.getValue(), sta.get("STRMax"))));
                        break;
                    case "DEXMin":
                        nEquip.setDex((short) (nEquip.getDex() + rand(stat.getValue(), sta.get("DEXMax"))));
                        break;
                    case "INTMin":
                        nEquip.setInt((short) (nEquip.getInt() + rand(stat.getValue(), sta.get("INTMax"))));
                        break;
                    case "LUKMin":
                        nEquip.setLuk((short) (nEquip.getLuk() + rand(stat.getValue(), sta.get("LUKMax"))));
                        break;
                    case "PADMin":
                        nEquip.setWatk((short) (nEquip.getWatk() + rand(stat.getValue(), sta.get("PADMax"))));
                        break;
                    case "PDDMin":
                        nEquip.setWdef((short) (nEquip.getWdef() + rand(stat.getValue(), sta.get("PDDMax"))));
                        break;
                    case "MADMin":
                        nEquip.setMatk((short) (nEquip.getMatk() + rand(stat.getValue(), sta.get("MADMax"))));
                        break;
                    case "MDDMin":
                        nEquip.setMdef((short) (nEquip.getMdef() + rand(stat.getValue(), sta.get("MDDMax"))));
                        break;
                    case "ACCMin":
                        nEquip.setAcc((short) (nEquip.getAcc() + rand(stat.getValue(), sta.get("ACCMax"))));
                        break;
                    case "EVAMin":
                        nEquip.setAvoid((short) (nEquip.getAvoid() + rand(stat.getValue(), sta.get("EVAMax"))));
                        break;
                    case "SpeedMin":
                        nEquip.setSpeed((short) (nEquip.getSpeed() + rand(stat.getValue(), sta.get("SpeedMax"))));
                        break;
                    case "JumpMin":
                        nEquip.setJump((short) (nEquip.getJump() + rand(stat.getValue(), sta.get("JumpMax"))));
                        break;
                    case "MHPMin":
                        nEquip.setHp((short) (nEquip.getHp() + rand(stat.getValue(), sta.get("MHPMax"))));
                        break;
                    case "MMPMin":
                        nEquip.setMp((short) (nEquip.getMp() + rand(stat.getValue(), sta.get("MMPMax"))));
                        break;
                    case "MaxHPMin":
                        nEquip.setHp((short) (nEquip.getHp() + rand(stat.getValue(), sta.get("MaxHPMax"))));
                        break;
                    case "MaxMPMin":
                        nEquip.setMp((short) (nEquip.getMp() + rand(stat.getValue(), sta.get("MaxMPMax"))));
                        break;
                }
            }
        } catch (NullPointerException e) {
            //catch npe because obviously the wz have some error XD
            e.printStackTrace();
        }
        return nEquip;
    }

    public List<Triple<String, String, String>> getEquipAdditions(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.equipAdditions;
    }

    public String getEquipAddReqs(int itemId, String key, String sub) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        for (Triple<String, String, String> data : i.equipAdditions) {
            if (data.getLeft().equals("key") && data.getMid().equals("con:" + sub)) {
                return data.getRight();
            }
        }
        return null;
    }

    public Map<Integer, Map<String, Integer>> getEquipIncrements(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.equipIncs;
    }

    public List<Integer> getEquipSkills(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.incSkill;
    }

    public Map<String, Integer> getEquipStats(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.equipStats;
    }

    /*
     * 检测穿戴装备的条件是否符合
     */
    public boolean canEquip(Map<String, Integer> stats, int itemid, int level, int job, int fame, int str, int dex, int luk, int int_, int supremacy) {
        if ((level + supremacy) >= (stats.containsKey("reqLevel") ? stats.get("reqLevel") : 0) && str >= (stats.containsKey("reqSTR") ? stats.get("reqSTR") : 0) && dex >= (stats.containsKey("reqDEX") ? stats.get("reqDEX") : 0) && luk >= (stats.containsKey("reqLUK") ? stats.get("reqLUK") : 0) && int_ >= (stats.containsKey("reqINT") ? stats.get("reqINT") : 0)) {
            Integer fameReq = stats.get("reqPOP");
            return !(fameReq != null && fame < fameReq);
        } else if ((level + supremacy) >= (stats.containsKey("reqLevel") ? stats.get("reqLevel") : 0) && JobConstants.is恶魔复仇者(job)) {
            return true;
        } else if ((level + supremacy) >= (stats.containsKey("reqLevel") ? stats.get("reqLevel") : 0) && JobConstants.is尖兵(job)) {
            int jobtype = stats.containsKey("reqJob") ? stats.get("reqJob") : 0;
            if (jobtype == 0x00 || jobtype == 0x08 || jobtype == 0x10 || jobtype == 0x18) {
                return true;
            }
        }
        return false;
    }

    /*
     * 获取装备穿戴需要的等级
     */
    public int getReqLevel(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("reqLevel")) {
            return 0;
        }
        return getEquipStats(itemId).get("reqLevel");
    }

    /*
     * 0x00 全职业通用
     * 0x01 战士
     * 0x02 法师
     * 0x04 弓手
     * 0x08 飞侠
     * 0x10 海盗
     * 0x18 尖兵 也就是0x08+0x10
     */
    public int getReqJob(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("reqJob")) {
            return 0;
        }
        return getEquipStats(itemId).get("reqJob");
    }

    public int getSlots(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("tuc")) {
            return 0;
        }
        return getEquipStats(itemId).get("tuc");
    }

    public Integer getSetItemID(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("setItemID")) {
            return 0;
        }
        return getEquipStats(itemId).get("setItemID");
    }

    public StructSetItem getSetItem(int setItemId) {
        return SetItemInfo.get(setItemId);
    }

    public List<Integer> getScrollReqs(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.scrollReqs;
    }

    public int getScrollSuccess(int itemId) {
        if (itemId / 10000 != 204 || getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("success")) {
            return 0;
        }
        return getEquipStats(itemId).get("success");
    }

    public Item scrollEquipWithId(Item equip, Item scroll, boolean whiteScroll, MapleCharacter chr, int vegas) {
        if (equip.getType() == 1) { //必须是装备道具才可以升级属性
            int scrollId = scroll.getItemId();
            if (ItemConstants.isEquipScroll(scrollId)) { //装备强化卷轴
                return scrollEnhance(equip, scroll, chr);
            } else if (ItemConstants.isOptentialScroll(scrollId)) { //潜能附加
                return scrollOptential(equip, scroll, chr);
            } else if (ItemConstants.isOptentialAddScroll(scrollId)) { //附加潜能
                return scrollOptentialAdd(equip, scroll, chr);
            } else if (ItemConstants.isLimitBreakScroll(scrollId)) { //突破攻击上限石头
                return scrollLimitBreak(equip, scroll, chr);
            } else if (ItemConstants.isResetScroll(scrollId)) { //还原卷轴
                return scrollResetEquip(equip, scroll, chr);
            } else if (ItemConstants.isSealedScroll(scrollId)) {
                return scrollSealedEquip(equip, scroll, chr);
            }
            Equip nEquip = (Equip) equip;
            Map<String, Integer> scrollStats = getEquipStats(scrollId);
            Map<String, Integer> equipStats = getEquipStats(equip.getItemId());
            //成功几率
            int succ = (ItemConstants.isTablet(scrollId) && !ItemConstants.is武器攻击力卷轴(scrollId) ? ItemConstants.getSuccessTablet(scrollId, nEquip.getLevel()) : (scrollStats == null || !scrollStats.containsKey("success") ? 0 : scrollStats.get("success")));
            //失败几率
            int curse = (ItemConstants.isTablet(scrollId) && !ItemConstants.is武器攻击力卷轴(scrollId) ? ItemConstants.getCurseTablet(scrollId, nEquip.getLevel()) : (scrollStats == null || !scrollStats.containsKey("cursed") ? 0 : scrollStats.get("cursed")));
            //倾向系统提升几率
            int craft = ItemConstants.isCleanSlate(scrollId) ? 0 : chr.getTrait(MapleTraitType.craft).getLevel() / 10; //倾向系统的砸卷加成
            //幸运卷轴提升几率
            int lucksKey = ItemFlag.幸运卷轴.check(equip.getFlag()) ? 10 : 0; //装备带有幸运卷轴的砸卷加成
            int success = succ + lucksKey + craft + getSuccessRates(scroll.getItemId());
            if (chr.isAdmin()) {
                chr.dropSpouseMessage(0x0B, "普通卷轴 - 默认几率: " + succ + "% 倾向加成: " + craft + "% 幸运状态加成: " + lucksKey + "% 最终概率: " + success + "% 失败消失几率: " + curse + "%");
            }
            if (ItemFlag.幸运卷轴.check(equip.getFlag()) && !ItemConstants.isSpecialScroll(scrollId)) {
                equip.setFlag((short) (equip.getFlag() - ItemFlag.幸运卷轴.getValue()));
            }
            if (ItemConstants.isSpecialScroll(scrollId) || Randomizer.nextInt(100) <= success) {
                switch (scrollId) {
                    case 2049000: //白医卷轴
                    case 2049001: //白医卷轴
                    case 2049002: //白医卷轴
                    case 2049003:
                    case 2049004: //白医卷轴—仙
                    case 2049005: //白医卷轴—神
                    case 2049024: //20%
                    case 2049025: { //100%
                        if (equipStats.containsKey("tuc") && nEquip.getLevel() + nEquip.getUpgradeSlots() < equipStats.get("tuc") + nEquip.getViciousHammer()) {
                            nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() + 1));
                        }
                        break;
                    }
                    case 2049006: //诅咒白医卷轴
                    case 2049007: //诅咒白医卷轴
                    case 2049008: { //诅咒白医卷轴
                        if (equipStats.containsKey("tuc") && nEquip.getLevel() + nEquip.getUpgradeSlots() < equipStats.get("tuc") + nEquip.getViciousHammer()) {
                            nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() + 2));
                        }
                        break;
                    }
                    case 2040727: { //鞋子防滑卷轴 - 给鞋子增加防滑功能.成功率:10%, 对强化次数没有影响
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.鞋子防滑.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 2041058: { //披风防寒卷轴 - 给披肩增加防寒功能.成功率:10%, 对强化次数没有影响
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.披风防寒.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 5063100: //幸运保护之盾 - 保护物品，以及提升成功概率的魔法卷轴。在装备物品上使用，可以提升使用卷轴的成功率10%，并且可以防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，魔法卷轴效果也会随之消失，#c强化12星以上的物品无法使用#。
                    case 2530000: //幸运日卷轴 - 使接下去使用的卷轴的成功率提高10%。潜能附加卷轴、强化卷轴无效
                    case 2530001: { //快乐日幸运卷轴
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.幸运卷轴.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 5064000: //防爆卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化12星以上的物品无法使用。# \n可以和#c安全之盾、复原之盾#一起使用。
                    case 5064003: //极真保护之盾 - #极真道具专用#防爆卷轴。用在极真装备后，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化7星以上的物品无法使用。# \n可以和#c保护卷轴、卷轴防护卷轴#一起使用。
                    case 2531000: { //防爆卷轴 - 在装备物品上使用，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化12星以上的物品无法使用。#
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.装备防爆.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 5068100: //宠物专用保护卷轴 - 可保护道具的魔法盾。对 #c宠物装备#使用后可在使用卷轴失败时不减少装备道具的#c强化次数#,#c只限1次#。 但是使用卷轴成功时，防御效果也会消失。\n可以和#c安全之盾、复原之盾#一起使用。
                    case 5064100: { //保护卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品#c可升级次数#减少，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失。\n可以和#c安全之盾、复原之盾#一起使用。
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.保护升级次数.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 5068200: //宠物专用卷轴防护卷轴 - 卷轴使用失败时，可以保护卷轴不消失的魔法防护卷轴. \n使用在#c宠物装备道具#上时 #c添加一次保护机会#，如果卷轴使用失败时#c使用的卷轴不会消失#。但是,卷轴使用成功时也会消耗保护效果。\n可以和#c保护卷轴,防爆卷轴#一起使用。
                    case 5064300: { //卷轴防护卷轴 - 卷轴使用失败时，可以保护卷轴不消失的魔法防护卷轴. \n使用在装备道具上时 #c添加一次保护机会#，如果卷轴使用失败时#c使用的卷轴不会消失#。但是,卷轴使用成功时也会消耗保护效果。\n可以和#c保护卷轴,防爆卷轴#一起使用。
                        short flag = nEquip.getFlag();
                        flag |= ItemFlag.卷轴防护.getValue();
                        nEquip.setFlag(flag);
                        break;
                    }
                    case 2046829: { // 饰品攻击力卷轴 2~4
                        nEquip.setWatk((short) (nEquip.getWatk() + (Randomizer.nextInt(2) + 2)));
                        break;
                    }
                    case 2046830: { // 饰品魔力卷轴 2~4
                        nEquip.setMatk((short) (nEquip.getMatk() + (Randomizer.nextInt(2) + 2)));
                    }
                    case 2046856: { //专属饰品攻击力卷轴 4~5
                        nEquip.setWatk((short) (nEquip.getWatk() + (Randomizer.nextInt(2) + 4)));
                        break;
                    }
                    case 2046857: { //专属饰品魔力卷轴 4~5
                        nEquip.setMatk((short) (nEquip.getMatk() + (Randomizer.nextInt(2) + 4)));
                        break;
                    }
                    case 2613000: // 星火单手武器攻击力卷轴 8~11
                    case 2612010: { // 星火双手武器攻击力卷轴 8~11
                        nEquip.setWatk((short) (nEquip.getWatk() + (Randomizer.nextInt(3) + 8)));
                        break;
                    }
                    case 2613001: { // 星火单手武器魔法力卷轴 8~11
                        nEquip.setMatk((short) (nEquip.getMatk() + (Randomizer.nextInt(3) + 8)));
                        break;
                    }
                    default: {
                        if (ItemConstants.isChaosScroll(scrollId)) {
                            int stat = ItemConstants.getChaosNumber(scrollId);
                            int increase = ItemConstants.isChaosForGoodness(scrollId) || isNegativeScroll(scrollId) ? 1 : Randomizer.nextBoolean() ? 1 : -1;
                            if (nEquip.getStr() > 0) {
                                nEquip.setStr((short) (nEquip.getStr() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getDex() > 0) {
                                nEquip.setDex((short) (nEquip.getDex() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getInt() > 0) {
                                nEquip.setInt((short) (nEquip.getInt() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getLuk() > 0) {
                                nEquip.setLuk((short) (nEquip.getLuk() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getWatk() > 0) {
                                nEquip.setWatk((short) (nEquip.getWatk() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getWdef() > 0) {
                                nEquip.setWdef((short) (nEquip.getWdef() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getMatk() > 0) {
                                nEquip.setMatk((short) (nEquip.getMatk() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getMdef() > 0) {
                                nEquip.setMdef((short) (nEquip.getMdef() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getAcc() > 0) {
                                nEquip.setAcc((short) (nEquip.getAcc() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getAvoid() > 0) {
                                nEquip.setAvoid((short) (nEquip.getAvoid() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getSpeed() > 0) {
                                nEquip.setSpeed((short) (nEquip.getSpeed() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getJump() > 0) {
                                nEquip.setJump((short) (nEquip.getJump() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getHp() > 0) {
                                nEquip.setHp((short) (nEquip.getHp() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            if (nEquip.getMp() > 0) {
                                nEquip.setMp((short) (nEquip.getMp() + (Randomizer.nextInt(stat) + 1) * increase));
                            }
                            break;
                        } else {
                            for (Entry<String, Integer> stat : scrollStats.entrySet()) {
                                String key = stat.getKey();
                                if (key.equals("STR")) {
                                    nEquip.setStr((short) (nEquip.getStr() + stat.getValue().intValue()));
                                } else if (key.equals("DEX")) {
                                    nEquip.setDex((short) (nEquip.getDex() + stat.getValue().intValue()));
                                } else if (key.equals("INT")) {
                                    nEquip.setInt((short) (nEquip.getInt() + stat.getValue().intValue()));
                                } else if (key.equals("LUK")) {
                                    nEquip.setLuk((short) (nEquip.getLuk() + stat.getValue().intValue()));
                                } else if (key.equals("PAD")) {
                                    nEquip.setWatk((short) (nEquip.getWatk() + stat.getValue().intValue()));
                                } else if (key.equals("PDD")) {
                                    nEquip.setWdef((short) (nEquip.getWdef() + stat.getValue().intValue()));
                                } else if (key.equals("MAD")) {
                                    nEquip.setMatk((short) (nEquip.getMatk() + stat.getValue().intValue()));
                                } else if (key.equals("MDD")) {
                                    nEquip.setMdef((short) (nEquip.getMdef() + stat.getValue().intValue()));
                                } else if (key.equals("ACC")) {
                                    nEquip.setAcc((short) (nEquip.getAcc() + stat.getValue().intValue()));
                                } else if (key.equals("EVA")) {
                                    nEquip.setAvoid((short) (nEquip.getAvoid() + stat.getValue().intValue()));
                                } else if (key.equals("Speed")) {
                                    nEquip.setSpeed((short) (nEquip.getSpeed() + stat.getValue().intValue()));
                                } else if (key.equals("Jump")) {
                                    nEquip.setJump((short) (nEquip.getJump() + stat.getValue().intValue()));
                                } else if (key.equals("MHP")) {
                                    nEquip.setHp((short) (nEquip.getHp() + stat.getValue().intValue()));
                                } else if (key.equals("MMP")) {
                                    nEquip.setMp((short) (nEquip.getMp() + stat.getValue().intValue()));
                                }
                            }
                            break;
                        }
                    }
                }
                //砸卷成功后的处理
                if (!ItemConstants.isCleanSlate(scrollId) && !ItemConstants.isSpecialScroll(scrollId)) {
                    short oldFlag = nEquip.getFlag();
                    if (ItemFlag.保护升级次数.check(oldFlag)) {
                        nEquip.setFlag((short) (oldFlag - ItemFlag.保护升级次数.getValue()));
                    }
                    int scrollUseSlots = ItemConstants.isAzwanScroll(scrollId) ? getSlots(scrollId) : 1;
                    nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - scrollUseSlots));
                    nEquip.setLevel((byte) (nEquip.getLevel() + scrollUseSlots));
                }
            } else {
                //砸卷失败后的处理
                if (!whiteScroll && !ItemConstants.isCleanSlate(scrollId) && !ItemConstants.isSpecialScroll(scrollId)) {
                    short oldFlag = nEquip.getFlag();
                    if (ItemFlag.保护升级次数.check(oldFlag)) {
                        nEquip.setFlag((short) (oldFlag - ItemFlag.保护升级次数.getValue()));
                        chr.dropSpouseMessage(0x0B, "由于卷轴的效果，升级次数没有减少。");
                    } else if (!MapleItemInformationProvider.getInstance().hasSafetyShield(scrollId)) {
                        int scrollUseSlots = ItemConstants.isAzwanScroll(scrollId) ? getSlots(scrollId) : 1;
                        nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - scrollUseSlots));
                    }
                }
                if (Randomizer.nextInt(99) + 1 < curse) {
                    return null;
                }
            }
        }
        return equip;
    }

    /*
     * 装备强化卷轴
     */
    public Item scrollEnhance(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        int scrollId = scroll.getItemId();
        Map<String, Integer> scrollStats = getEquipStats(scrollId);
        boolean noCursed = isNoCursedScroll(scrollId);
        int scrollForceUpgrade = getForceUpgrade(scrollId);
        int succ = scrollStats == null || !scrollStats.containsKey("success") ? 0 : scrollStats.get("success"); //成功几率
        int curse = noCursed ? 0 : scrollStats == null || !scrollStats.containsKey("cursed") ? 100 : scrollStats.get("cursed"); //失败几率 没有就代表100%消失
        int craft = chr.getTrait(MapleTraitType.craft).getLevel() / 10; //倾向系统的砸卷加成
        if (scrollForceUpgrade == 1 && succ == 0) {
            succ = Math.max((scroll.getItemId() == 2049301 || scroll.getItemId() == 2049307 ? 80 : 100) - (nEquip.getEnhance() * 10), 5);
        }
        int success = succ + craft; //最终的成功几率
        if (chr.isAdmin()) {
            chr.dropSpouseMessage(0x0B, "装备强化卷轴 - 默认几率: " + succ + "% 倾向加成: " + craft + "% 最终几率: " + success + "% 失败消失几率: " + curse + "%" + " 卷轴是否失败不消失装备: " + noCursed);
        }
        if (Randomizer.nextInt(100) > success) {
            return Randomizer.nextInt(99) < curse ? null : nEquip;
        }
        if (ItemConstants.isSuperiorEqp(equip.getItemId())) {
            for (int i = 0; i < scrollForceUpgrade; i++) {
                int xjlevel = nEquip.getEnhance() + 1;
                if (xjlevel <= 5) {
                    final int val[] = {9, 10, 19, 29, 48};
                    nEquip.setStr((short) (nEquip.getStr() + val[xjlevel - 1]));
                    nEquip.setDex((short) (nEquip.getDex() + val[xjlevel - 1]));
                    nEquip.setLuk((short) (nEquip.getLuk() + val[xjlevel - 1]));
                    nEquip.setInt((short) (nEquip.getInt() + val[xjlevel - 1]));
                } else {
                    int val = xjlevel + 3;
                    nEquip.setWatk((short) (nEquip.getWatk() + val));
                    nEquip.setMatk((short) (nEquip.getMatk() + val));
                }
                nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));
            }
        } else {
            int mixStats = isSuperiorEquip(nEquip.getItemId()) ? 3 : 0;
            int maxStats = isSuperiorEquip(nEquip.getItemId()) ? 8 : 5;
            for (int i = 0; i < scrollForceUpgrade; i++) {
                if (nEquip.getStr() > 0 || Randomizer.nextInt(50) == 1) { //力量 1/50
                    nEquip.setStr((short) (nEquip.getStr() + Randomizer.rand(mixStats, maxStats)));
                }
                if (nEquip.getDex() > 0 || Randomizer.nextInt(50) == 1) { //敏捷 1/50
                    nEquip.setDex((short) (nEquip.getDex() + Randomizer.rand(mixStats, maxStats)));
                }
                if (nEquip.getInt() > 0 || Randomizer.nextInt(50) == 1) { //智力 1/50
                    nEquip.setInt((short) (nEquip.getInt() + Randomizer.rand(mixStats, maxStats)));
                }
                if (nEquip.getLuk() > 0 || Randomizer.nextInt(50) == 1) { //运气 1/50
                    nEquip.setLuk((short) (nEquip.getLuk() + Randomizer.rand(mixStats, maxStats)));
                }
                if (nEquip.getWatk() > 0 && ItemConstants.isWeapon(nEquip.getItemId())) { //物理攻击
                    if (nEquip.getWatk() < 150) {
                        nEquip.setWatk((short) (nEquip.getWatk() + 3)); //攻击在   1-149之间固定 3点
                    } else if (nEquip.getWatk() < 200) {
                        nEquip.setWatk((short) (nEquip.getWatk() + 4)); //攻击在 150-199之间固定 4点
                    } else if (nEquip.getWatk() < 250) {
                        nEquip.setWatk((short) (nEquip.getWatk() + 5)); //攻击在 200-249之间固定 5点
                    } else {
                        nEquip.setWatk((short) (nEquip.getWatk() + 5 + (Randomizer.nextBoolean() ? 1 : 0))); //攻击在 250 以上固定 5点 + 50% 的几率多加1点
                    }
                }
                if (nEquip.getWdef() > 0 || Randomizer.nextInt(40) == 1) { //物理防御 1/40
                    nEquip.setWdef((short) (nEquip.getWdef() + Randomizer.nextInt(5)));
                }
                if (nEquip.getMatk() > 0 && ItemConstants.isWeapon(nEquip.getItemId())) { //魔法攻击
                    if (nEquip.getMatk() < 150) {
                        nEquip.setMatk((short) (nEquip.getMatk() + 3)); //攻击在   1-149之间固定 3点
                    } else if (nEquip.getMatk() < 200) {
                        nEquip.setMatk((short) (nEquip.getMatk() + 4)); //攻击在 150-199之间固定 4点
                    } else if (nEquip.getMatk() < 250) {
                        nEquip.setMatk((short) (nEquip.getMatk() + 5)); //攻击在 200-249之间固定 5点
                    } else {
                        nEquip.setMatk((short) (nEquip.getMatk() + 5 + (Randomizer.nextBoolean() ? 1 : 0))); //攻击在 250 以上固定 5点 + 50% 的几率多加1点
                    }
                }
                if (nEquip.getMdef() > 0 || Randomizer.nextInt(40) == 1) { //魔法防御 1/40
                    nEquip.setMdef((short) (nEquip.getMdef() + Randomizer.nextInt(5)));
                }
                if (nEquip.getAcc() > 0 || Randomizer.nextInt(20) == 1) { //命中率 1/20
                    nEquip.setAcc((short) (nEquip.getAcc() + Randomizer.nextInt(5)));
                }
                if (nEquip.getAvoid() > 0 || Randomizer.nextInt(20) == 1) { //回避率 1/20
                    nEquip.setAvoid((short) (nEquip.getAvoid() + Randomizer.nextInt(5)));
                }
                if (nEquip.getSpeed() > 0 || Randomizer.nextInt(10) == 1) { //移动速度 1/10
                    nEquip.setSpeed((short) (nEquip.getSpeed() + Randomizer.nextInt(5)));
                }
                if (nEquip.getJump() > 0 || Randomizer.nextInt(10) == 1) { //跳跃力 1/10
                    nEquip.setJump((short) (nEquip.getJump() + Randomizer.nextInt(5)));
                }
                if (nEquip.getHp() > 0 || Randomizer.nextInt(5) == 1) { //HP 1/5
                    nEquip.setHp((short) (nEquip.getHp() + Randomizer.rand(mixStats, maxStats)));
                }
                if (nEquip.getMp() > 0 || Randomizer.nextInt(5) == 1) { //MP 1/5
                    nEquip.setMp((short) (nEquip.getMp() + Randomizer.rand(mixStats, maxStats)));
                }
                nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));
            }
        }
        return nEquip;
    }

    /*
     * 潜能附加卷轴
     */
    public Item scrollOptential(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        int scrollId = scroll.getItemId();
        boolean noCursed = isNoCursedScroll(scrollId);
        switch (scrollId) {
            case 2049400: //高级潜能附加卷轴    成功90% 失败消失
            case 2049407: //高级潜能附加卷轴    成功90% 失败消失
            case 2049412: //高级潜能赋予卷轴    成功90% 失败消失
            case 2049401: //潜能附加卷轴        成功70% 失败消失
            case 2049408: //潜能附加卷轴        成功70% 失败消失
            case 2049416: //潜能附加卷轴        成功70% 失败消失
            case 2049402: //特殊潜能附加卷轴    成功100%
            case 2049404: //[7周年]潜能力卷轴   成功100%
            case 2049405: //真·觉醒冒险之心专用潜能力卷轴   成功100%
            case 2049406: //特殊潜能附加卷轴    成功100%
            case 2049414: //紫色手镯戒指专用潜能附加卷轴    成功100%
            case 2049415: //蓝色手镯戒指专用潜能附加卷轴    成功100%
            case 2049417: //特殊潜能附加卷轴    成功100%
            case 2049418: //VIP特殊潜能卷轴     成功100%
            case 2049419: //特殊潜能附加古卷    成功100%
            case 2049420: //老公老婆戒指专用潜能力卷轴  成功100%
                if (nEquip.getState() == 0) {
                    int success = (scrollId == 2049400 || scrollId == 2049407 || scrollId == 2049412) ? 90 : (scrollId == 2049401 || scrollId == 2049408 || scrollId == 2049416) ? 70 : 100;
                    if (chr.isAdmin()) {
                        chr.dropSpouseMessage(0x0B, "潜能附加卷轴 - 砸卷几率: " + success + "%");
                    }
                    if (Randomizer.nextInt(100) > success) {
                        return noCursed ? nEquip : null;
                    }
                    nEquip.resetOptential();
                }
                break;
            case 2049700: //A级潜能卷轴         成功100%
            case 2049701: //A级潜能卷轴         成功80% 失败20%消失
            case 2049702: //A级潜能附加卷轴     成功100%
            case 2049703: //A级潜能附加卷轴     成功100%
            case 2049704: //A级潜能附加卷轴 40% 成功40%
            case 2049705: //A级潜能附加卷轴 50% 成功50%
            case 2049709: //幻影A级潜能附加卷轴 成功50% 失败50%消失
                if (nEquip.getState() < 18) { //装备为A级以下装备
                    int success = scrollId == 2049701 ? 80 : scrollId == 2049704 ? 40 : (scrollId == 2049705 || scrollId == 2049709) ? 50 : 100;
                    if (chr.isAdmin()) {
                        chr.dropSpouseMessage(0x0B, "A级潜能卷轴 - 砸卷几率: " + success + "%");
                    }
                    if (Randomizer.nextInt(100) <= success) {
                        nEquip.renewOptential(2);
                    } else if ((scrollId == 2049701 && Randomizer.nextInt(99) < 20) || (scrollId == 2049709 && Randomizer.nextInt(99) < 50)) {
                        return null;
                    }
                }
                break;
            case 2049750: //S级潜能卷轴 80%     成功80%
            case 2049751: //S级潜能卷轴 60%     成功60%
            case 2049752: //S级潜能卷轴 30%     成功30%
            case 2049756: //S级潜能附加卷轴     成功30%
            case 2049757: //S级潜能附加卷轴     成功50%
            case 2049758: //S级潜能附加卷轴     成功50%
                if (nEquip.getState() < 19) { //装备为S级以下装备
                    int success = scrollId == 2049750 ? 80 : scrollId == 2049704 ? 60 : (scrollId == 2049752 || scrollId == 2049756) ? 30 : (scrollId == 2049757 || scrollId == 2049758) ? 50 : 30;
                    if (chr.isAdmin()) {
                        chr.dropSpouseMessage(0x0B, "S级潜能卷轴 - 砸卷几率: " + success + "%");
                    }
                    if (Randomizer.nextInt(100) <= success) {
                        nEquip.renewOptential(4);
                    }
                }
                break;
        }
        return nEquip;
    }

    /*
     * 附加潜能卷轴
     */
    public Item scrollOptentialAdd(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        int scrollId = scroll.getItemId();
        switch (scrollId) {
            case 2048305: //附加潜能附加卷轴 成功70% 失败100%
            case 2048306: //特殊附加潜能附加古卷 成功100%
            case 2048307: //特殊附加潜能附加卷轴 成功100%
            case 2048308: //附加潜能附加卷轴 成功50% 失败50%
            case 2048309: //附加潜能附加卷轴 成功60%
            case 2048310: //附加潜能附加卷轴 成功60% 失败100%
                if (nEquip.getAddState() == 0) {
                    int success = scrollId == 2048305 ? 70 : scrollId == 2048308 ? 50 : (scrollId == 2048309 || scrollId == 2048310) ? 60 : 100;
                    if (chr.isAdmin()) {
                        chr.dropSpouseMessage(0x0B, "附加潜能附加卷轴 - 砸卷几率: " + success + "%");
                    }
                    if (Randomizer.nextInt(100) <= success) {
                        nEquip.setOptential4(-1);
                        if (scrollId == 2048306) {
                            nEquip.setOptential5(-1);
                            nEquip.setOptential6(-1);
                        }
                    } else if ((scrollId == 2048308 && Randomizer.nextInt(99) < 50) || scrollId == 2048305 || scrollId == 2048310) {
                        return null;
                    }
                }
                break;
        }
        return nEquip;
    }

    /*
     * 装备突破极限攻击上限增加卷轴
     */
    public Item scrollLimitBreak(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        int scrollId = scroll.getItemId();
        Map<String, Integer> scrollStats = getEquipStats(scrollId);
        int succe = scrollStats == null || !scrollStats.containsKey("success") ? 0 : scrollStats.get("success"); //成功几率
        int craft = chr.getTrait(MapleTraitType.craft).getLevel() / 10; //倾向系统的砸卷加成
        int lucksKey = ItemFlag.幸运卷轴.check(equip.getFlag()) ? 10 : 0; //装备带有幸运卷轴的砸卷加成
        if (ItemFlag.幸运卷轴.check(equip.getFlag())) {
            equip.setFlag((short) (equip.getFlag() - ItemFlag.幸运卷轴.getValue()));
        }
        int success = succe + craft + lucksKey;
        if (chr.isAdmin()) {
            chr.dropSpouseMessage(0x0B, "突破攻击上限卷轴 - 默认几率: " + succe + "% 倾向加成: " + craft + "% 幸运卷轴状态加成: " + lucksKey + "% 最终几率: " + success + "%");
        }
        if (Randomizer.nextInt(100) <= success) {
            int limitBreak = getScrollLimitBreak(scrollId) + nEquip.getLimitBreak();
            if (ItemConstants.isWeapon(nEquip.getItemId()) && (limitBreak <= ServerProperties.getLimitBreak())) {
                nEquip.setLimitBreak(limitBreak);
            }
        }
        return nEquip;
    }

    /*
     * 还原卷轴
     */
    public Item scrollResetEquip(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        int scrollId = scroll.getItemId();
        Map<String, Integer> scrollStats = getEquipStats(scrollId);
        int succe = scrollStats == null || !scrollStats.containsKey("success") ? 0 : scrollStats.get("success"); //成功几率
        int curse = scrollStats == null || !scrollStats.containsKey("cursed") ? 0 : scrollStats.get("cursed"); //失败几率
        int craft = chr.getTrait(MapleTraitType.craft).getLevel() / 10; //倾向系统的砸卷加
        int lucksKey = ItemFlag.幸运卷轴.check(equip.getFlag()) ? 10 : 0; //装备带有幸运卷轴的砸卷加成
        if (ItemFlag.幸运卷轴.check(equip.getFlag())) {
            equip.setFlag((short) (equip.getFlag() - ItemFlag.幸运卷轴.getValue()));
        }
        int success = succe + craft + lucksKey;
        if (chr.isAdmin()) {
            chr.dropSpouseMessage(0x0B, "还原卷轴 - 默认几率: " + succe + "% 倾向加成: " + craft + "% 幸运卷轴状态加成: " + lucksKey + "% 最终几率: " + success + "% 失败消失几率: " + curse + "%");
        }
        if (Randomizer.nextInt(100) <= success) {
            return resetEquipStats(nEquip);
        } else if (Randomizer.nextInt(99) < curse) {
            return null;
        }
        return nEquip;
    }

    /* 
     * 封印解除卷轴
     */
    public Item scrollSealedEquip(Item equip, Item scroll, MapleCharacter chr) {
        if (equip.getType() != 1) { //检测必须需要砸卷的道具为装备
            return equip;
        }
        Equip nEquip = (Equip) equip;
        if (!nEquip.isSealedEquip()) {
            chr.dropSpouseMessage(0x0B, "该装备不是漩涡装备，无法解除封印。");
            return equip;
        }
        boolean success = false;
        byte sealedlevel = nEquip.getSealedLevel();
        boolean isAccessory = ItemConstants.isAccessory(equip.getItemId());
        switch (sealedlevel) {
            case 1:
                success = true;
                break;
            case 2:
                success = Randomizer.nextInt(100) < (isAccessory ? 10 : 90);
                break;
            case 3:
                success = Randomizer.nextInt(100) < 80;
                break;
            case 4:
                success = Randomizer.nextInt(100) < 70;
                break;
            case 5:
                success = Randomizer.nextInt(100) < 50;
                break;
        }
        List<Pair<String, Integer>> sealedinfo = getSealedEquipInfo(equip.getItemId(), sealedlevel);
        if (sealedinfo == null) {
            return equip;
        }
        if (success) {
            for (Pair<String, Integer> info : sealedinfo) {
                if (info.left.endsWith("STR")) {
                    nEquip.setStr((short) (nEquip.getStr() + info.right));
                }
                if (info.left.endsWith("DEX")) {
                    nEquip.setDex((short) (nEquip.getDex() + info.right));
                }
                if (info.left.endsWith("INT")) {
                    nEquip.setInt((short) (nEquip.getInt() + info.right));
                }
                if (info.left.endsWith("LUK")) {
                    nEquip.setLuk((short) (nEquip.getLuk() + info.right));
                }
                if (info.left.endsWith("PDD")) {
                    nEquip.setWdef((short) (nEquip.getWdef() + info.right));
                }
                if (info.left.endsWith("MDD")) {
                    nEquip.setMdef((short) (nEquip.getMdef() + info.right));
                }
                if (info.left.endsWith("MHP")) {
                    nEquip.setHp((short) (nEquip.getHp() + info.right));
                }
                if (info.left.endsWith("MMP")) {
                    nEquip.setMp((short) (nEquip.getMp() + info.right));
                }
                if (info.left.endsWith("PAD")) {
                    nEquip.setWatk((short) (nEquip.getWatk() + info.right));
                }
                if (info.left.endsWith("MAD")) {
                    nEquip.setMatk((short) (nEquip.getMatk() + info.right));
                }
                if (info.left.endsWith("ACC")) {
                    nEquip.setAcc((short) (nEquip.getAcc() + info.right));
                }
                if (info.left.endsWith("EVA")) {
                    nEquip.setAvoid((short) (nEquip.getAvoid() + info.right));
                }
                if (info.left.endsWith("IMDR")) {
                    nEquip.setIgnorePDR((short) (nEquip.getIgnorePDR() + info.right));
                }
                if (info.left.endsWith("BDR") || info.left.endsWith("bdR")) {
                    nEquip.setBossDamage((short) (nEquip.getBossDamage() + info.right));
                }
            }
            nEquip.setSealedLevel((byte) (sealedlevel + 1));
        } else {
            for (Pair<String, Integer> info : sealedinfo) {
                if (info.left.endsWith("STR")) {
                    nEquip.setStr((short) (nEquip.getStr() - info.right));
                }
                if (info.left.endsWith("DEX")) {
                    nEquip.setDex((short) (nEquip.getDex() - info.right));
                }
                if (info.left.endsWith("INT")) {
                    nEquip.setInt((short) (nEquip.getInt() - info.right));
                }
                if (info.left.endsWith("LUK")) {
                    nEquip.setLuk((short) (nEquip.getLuk() - info.right));
                }
                if (info.left.endsWith("PDD")) {
                    nEquip.setWdef((short) (nEquip.getWdef() - info.right));
                }
                if (info.left.endsWith("MDD")) {
                    nEquip.setMdef((short) (nEquip.getMdef() - info.right));
                }
                if (info.left.endsWith("MHP")) {
                    nEquip.setHp((short) (nEquip.getHp() - info.right));
                }
                if (info.left.endsWith("MMP")) {
                    nEquip.setMp((short) (nEquip.getMp() - info.right));
                }
                if (info.left.endsWith("PAD")) {
                    nEquip.setWatk((short) (nEquip.getWatk() - info.right));
                }
                if (info.left.endsWith("MAD")) {
                    nEquip.setMatk((short) (nEquip.getMatk() - info.right));
                }
                if (info.left.endsWith("ACC")) {
                    nEquip.setAcc((short) (nEquip.getAcc() - info.right));
                }
                if (info.left.endsWith("EVA")) {
                    nEquip.setAvoid((short) (nEquip.getAvoid() - info.right));
                }
                if (info.left.endsWith("IMDR")) {
                    nEquip.setIgnorePDR((short) (nEquip.getIgnorePDR() - info.right));
                }
                if (info.left.endsWith("BDR") || info.left.endsWith("bdR")) {
                    nEquip.setBossDamage((short) (nEquip.getBossDamage() - info.right));
                }
            }
            nEquip.setSealedLevel((byte) (sealedlevel - 1));
        }
        nEquip.setSealedExp(0);
        return nEquip;
    }

    /*
     * 对装备属性进行还原 潜能 星岩属性 道具外形保存不变
     */
    public Equip resetEquipStats(Equip oldEquip) {
        Equip newEquip = (Equip) getEquipById(oldEquip.getItemId());
        //设置道具的潜能 星岩 道具外形的信息
        newEquip.setState(oldEquip.getState()); //设置新道具的潜能等级
        newEquip.setStateMsg(oldEquip.getStateMsg()); //设置新道具的潜能提示次数
        newEquip.setOptential1(oldEquip.getOptential1()); //设置新道具的潜能属性 1
        newEquip.setOptential2(oldEquip.getOptential2()); //设置新道具的潜能属性 2
        newEquip.setOptential3(oldEquip.getOptential3()); //设置新道具的潜能属性 3
        newEquip.setOptential4(oldEquip.getOptential4()); //设置新道具的潜能属性 4
        newEquip.setOptential5(oldEquip.getOptential5()); //设置新道具的潜能属性 5
        newEquip.setOptential6(oldEquip.getOptential6()); //设置新道具的潜能属性 6
        newEquip.setSocket1(oldEquip.getSocket1()); //设置新道具的星岩属性 1
        newEquip.setSocket2(oldEquip.getSocket2()); //设置新道具的星岩属性 2
        newEquip.setSocket3(oldEquip.getSocket3()); //设置新道具的星岩属性 3
        newEquip.setItemSkin(oldEquip.getItemSkin()); //设置新道具的外形状态
        //设置一些道具原始的日志状态信息
        newEquip.setPosition(oldEquip.getPosition());
        newEquip.setQuantity(oldEquip.getQuantity());
        newEquip.setFlag(oldEquip.getFlag());
        newEquip.setOwner(oldEquip.getOwner());
        newEquip.setGMLog(oldEquip.getGMLog());
        newEquip.setExpiration(oldEquip.getExpiration());
        newEquip.setUniqueId(oldEquip.getUniqueId());
        newEquip.setEquipOnlyId(oldEquip.getEquipOnlyId());
        newEquip.setSealedLevel(oldEquip.getSealedLevel());
        newEquip.setSealedExp(oldEquip.getSealedExp());
        newEquip.setBossDamage(oldEquip.getBossDamage());
        newEquip.setIgnorePDR(oldEquip.getIgnorePDR());
        newEquip.setAllStat(oldEquip.getAllStat());
        return newEquip;
    }

    public Item getEquipById(int equipId) {
        return getEquipById(equipId, -1);
    }

    public Item getEquipById(int equipId, int ringId) {
        ItemInformation i = getItemInformation(equipId);
        if (i == null) {
            return new Equip(equipId, (short) 0, ringId, (byte) 0);
        }
        Item eq = i.eq.copy();
        eq.setUniqueId(ringId);
        return eq;
    }

    protected short getRandStatFusion(short defaultValue, int value1, int value2) {
        if (defaultValue == 0) {
            return 0;
        }
        int range = ((value1 + value2) / 2) - defaultValue;
        int rand = Randomizer.nextInt(Math.abs(range) + 1);
        return (short) (defaultValue + (range < 0 ? -rand : rand));
    }

    protected short getRandStat(short defaultValue, int maxRange) {
        if (defaultValue == 0) {
            return 0;
        }
        // vary no more than ceil of 10% of stat
        int lMaxRange = (int) Math.min(Math.ceil(defaultValue * 0.1), maxRange);
        return (short) ((defaultValue - lMaxRange) + Randomizer.nextInt(lMaxRange * 2 + 1));
    }

    protected short getRandStatAbove(short defaultValue, int maxRange) {
        if (defaultValue <= 0) {
            return 0;
        }
        int lMaxRange = (int) Math.min(Math.ceil(defaultValue * 0.1), maxRange);
        return (short) ((defaultValue) + Randomizer.nextInt(lMaxRange + 1));
    }

    public Equip randomizeStats(Equip equip) {
        equip.setStr(getRandStat(equip.getStr(), 5));
        equip.setDex(getRandStat(equip.getDex(), 5));
        equip.setInt(getRandStat(equip.getInt(), 5));
        equip.setLuk(getRandStat(equip.getLuk(), 5));
        equip.setMatk(getRandStat(equip.getMatk(), 5));
        equip.setWatk(getRandStat(equip.getWatk(), 5));
        equip.setAcc(getRandStat(equip.getAcc(), 5));
        equip.setAvoid(getRandStat(equip.getAvoid(), 5));
        equip.setJump(getRandStat(equip.getJump(), 5));
        equip.setHands(getRandStat(equip.getHands(), 5));
        equip.setSpeed(getRandStat(equip.getSpeed(), 5));
        equip.setWdef(getRandStat(equip.getWdef(), 10));
        equip.setMdef(getRandStat(equip.getMdef(), 10));
        equip.setHp(getRandStat(equip.getHp(), 10));
        equip.setMp(getRandStat(equip.getMp(), 10));
        equip.setSealedLevel((byte) (equip.isSealedEquip() ? 1 : 0));
        equip.setBossDamage((short) getBossDamageRate(equip.getItemId()));
        equip.setIgnorePDR((short) getIgnoreMobDmageRate(equip.getItemId()));
        equip.setTotalDamage((short) getTotalDamage(equip.getItemId()));
        equip.setOptential1(getOption1(equip.getItemId()));
        equip.setOptential2(getOption2(equip.getItemId()));
        equip.setOptential3(getOption3(equip.getItemId()));
        return equip;
    }

    public Equip randomizeStats_Above(Equip equip) {
        equip.setStr(getRandStatAbove(equip.getStr(), 5));
        equip.setDex(getRandStatAbove(equip.getDex(), 5));
        equip.setInt(getRandStatAbove(equip.getInt(), 5));
        equip.setLuk(getRandStatAbove(equip.getLuk(), 5));
        equip.setMatk(getRandStatAbove(equip.getMatk(), 5));
        equip.setWatk(getRandStatAbove(equip.getWatk(), 5));
        equip.setAcc(getRandStatAbove(equip.getAcc(), 5));
        equip.setAvoid(getRandStatAbove(equip.getAvoid(), 5));
        equip.setJump(getRandStatAbove(equip.getJump(), 5));
        equip.setHands(getRandStatAbove(equip.getHands(), 5));
        equip.setSpeed(getRandStatAbove(equip.getSpeed(), 5));
        equip.setWdef(getRandStatAbove(equip.getWdef(), 10));
        equip.setMdef(getRandStatAbove(equip.getMdef(), 10));
        equip.setHp(getRandStatAbove(equip.getHp(), 10));
        equip.setMp(getRandStatAbove(equip.getMp(), 10));
        equip.setSealedLevel((byte) (equip.isSealedEquip() ? 1 : 0));
        equip.setBossDamage((short) getBossDamageRate(equip.getItemId()));
        equip.setIgnorePDR((short) getIgnoreMobDmageRate(equip.getItemId()));
        equip.setTotalDamage((short) getTotalDamage(equip.getItemId()));
        equip.setOptential1(getOption1(equip.getItemId()));
        equip.setOptential2(getOption2(equip.getItemId()));
        equip.setOptential3(getOption3(equip.getItemId()));
        return equip;
    }

    public Equip fuse(Equip equip1, Equip equip2) {
        if (equip1.getItemId() != equip2.getItemId()) {
            return equip1;
        }
        Equip equip = (Equip) getEquipById(equip1.getItemId());
        equip.setStr(getRandStatFusion(equip.getStr(), equip1.getStr(), equip2.getStr()));
        equip.setDex(getRandStatFusion(equip.getDex(), equip1.getDex(), equip2.getDex()));
        equip.setInt(getRandStatFusion(equip.getInt(), equip1.getInt(), equip2.getInt()));
        equip.setLuk(getRandStatFusion(equip.getLuk(), equip1.getLuk(), equip2.getLuk()));
        equip.setMatk(getRandStatFusion(equip.getMatk(), equip1.getMatk(), equip2.getMatk()));
        equip.setWatk(getRandStatFusion(equip.getWatk(), equip1.getWatk(), equip2.getWatk()));
        equip.setAcc(getRandStatFusion(equip.getAcc(), equip1.getAcc(), equip2.getAcc()));
        equip.setAvoid(getRandStatFusion(equip.getAvoid(), equip1.getAvoid(), equip2.getAvoid()));
        equip.setJump(getRandStatFusion(equip.getJump(), equip1.getJump(), equip2.getJump()));
        equip.setHands(getRandStatFusion(equip.getHands(), equip1.getHands(), equip2.getHands()));
        equip.setSpeed(getRandStatFusion(equip.getSpeed(), equip1.getSpeed(), equip2.getSpeed()));
        equip.setWdef(getRandStatFusion(equip.getWdef(), equip1.getWdef(), equip2.getWdef()));
        equip.setMdef(getRandStatFusion(equip.getMdef(), equip1.getMdef(), equip2.getMdef()));
        equip.setHp(getRandStatFusion(equip.getHp(), equip1.getHp(), equip2.getHp()));
        equip.setMp(getRandStatFusion(equip.getMp(), equip1.getMp(), equip2.getMp()));
        return equip;
    }

    public int get休彼德蔓徽章点数(int itemId) {
        switch (itemId) {
            case 1182000: //休彼德蔓的青铜徽章
                return 3;
            case 1182001: //休彼德蔓的青铜徽章
                return 5;
            case 1182002: //休彼德蔓的白银徽章
                return 7;
            case 1182003: //休彼德蔓的白银徽章
                return 9;
            case 1182004: //休彼德蔓的黄金徽章
                return 13;
            case 1182005: //休彼德蔓的黄金徽章
                return 16;
        }
        return 0;
    }

    public Equip randomize休彼德蔓徽章(Equip equip) {
        int stats = get休彼德蔓徽章点数(equip.getItemId());
        if (stats > 0) {
            int prob = equip.getItemId() - 1182000;
            if (Randomizer.nextInt(15) <= prob) { //力量
                equip.setStr((short) Randomizer.nextInt(stats + prob));
            }
            if (Randomizer.nextInt(15) <= prob) { //敏捷
                equip.setDex((short) Randomizer.nextInt(stats + prob));
            }
            if (Randomizer.nextInt(15) <= prob) { //智力
                equip.setInt((short) Randomizer.nextInt(stats + prob));
            }
            if (Randomizer.nextInt(15) <= prob) { //运气
                equip.setLuk((short) Randomizer.nextInt(stats + prob));
            }
            if (Randomizer.nextInt(30) <= prob) { //物理攻击
                equip.setWatk((short) Randomizer.nextInt(stats));
            }
            if (Randomizer.nextInt(10) <= prob) { //物理防御
                equip.setWdef((short) Randomizer.nextInt(stats * 8));
            }
            if (Randomizer.nextInt(30) <= prob) { //魔法攻击
                equip.setMatk((short) Randomizer.nextInt(stats));
            }
            if (Randomizer.nextInt(10) <= prob) { //魔法防御
                equip.setMdef((short) Randomizer.nextInt(stats * 8));
            }
            if (Randomizer.nextInt(8) <= prob) { //命中率
                equip.setAcc((short) Randomizer.nextInt(stats * 5));
            }
            if (Randomizer.nextInt(8) <= prob) { //回避率
                equip.setAvoid((short) Randomizer.nextInt(stats * 5));
            }
            if (Randomizer.nextInt(10) <= prob) { //移动速度
                equip.setSpeed((short) Randomizer.nextInt(stats));
            }
            if (Randomizer.nextInt(10) <= prob) { //跳跃力
                equip.setJump((short) Randomizer.nextInt(stats));
            }
            if (Randomizer.nextInt(8) <= prob) { //HP
                equip.setHp((short) Randomizer.nextInt(stats * 10));
            }
            if (Randomizer.nextInt(8) <= prob) { //MP
                equip.setMp((short) Randomizer.nextInt(stats * 10));
            }
        }
        return equip;
    }

    public int getTotalStat(Equip equip) { //i get COOL when my defense is higher on gms...
        return equip.getStr() + equip.getDex() + equip.getInt() + equip.getLuk() + equip.getMatk() + equip.getWatk() + equip.getAcc() + equip.getAvoid() + equip.getJump()
                + equip.getHands() + equip.getSpeed() + equip.getHp() + equip.getMp() + equip.getWdef() + equip.getMdef();
    }

    /*
     * 设置装备潜能
     * 应用与商店购买潜能带装备
     * -17 鉴定为B级装备
     * -18 鉴定为A级装备
     * -19 鉴定为S级装备
     * -20 鉴定为SS级装备
     */
    public Equip setOptentialState(Equip equip, int state) {
        if (equip.getState() == 0) {
            if (state == 1) {
                equip.setOptential1(-17);
            } else if (state == 2) {
                equip.setOptential1(-18);
            } else if (state == 3) {
                equip.setOptential1(-19);
            } else if (state == 4) {
                equip.setOptential1(-20);
            } else {
                equip.setOptential1(-17);
            }
        }
        return equip;
    }

    public MapleStatEffect getItemEffect(int itemId) {
        MapleStatEffect ret = itemEffects.get(itemId);
        if (ret == null) {
            MapleData item = getItemData(itemId);
            if (item == null || item.getChildByPath("spec") == null) {
                return null;
            }
            ret = MapleStatEffect.loadItemEffectFromData(item.getChildByPath("spec"), itemId);
            itemEffects.put(itemId, ret);
        }
        return ret;
    }

    public MapleStatEffect getItemEffectEX(int itemId) {
        MapleStatEffect ret = itemEffectsEx.get(itemId);
        if (ret == null) {
            MapleData item = getItemData(itemId);
            if (item == null || item.getChildByPath("specEx") == null) {
                return null;
            }
            ret = MapleStatEffect.loadItemEffectFromData(item.getChildByPath("specEx"), itemId);
            itemEffectsEx.put(itemId, ret);
        }
        return ret;
    }

    public int getCreateId(int id) {
        ItemInformation i = getItemInformation(id);
        if (i == null) {
            return 0;
        }
        return i.create;
    }

    public int getCardMobId(int id) {
        ItemInformation i = getItemInformation(id);
        if (i == null) {
            return 0;
        }
        return i.monsterBook;
    }

    public int getBagType(int id) {
        ItemInformation i = getItemInformation(id);
        if (i == null) {
            return 0;
        }
        return i.flag & 0xF;
    }

    public int getWatkForProjectile(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null || i.equipStats == null
                || (i.equipStats.get("PAD") == null && i.equipStats.get("incPAD") == null)) { // 加载的时候去掉了inc
            return 0;
        }
        return i.equipStats.get("PAD") == null ? i.equipStats.get("incPAD") : i.equipStats.get("PAD"); // 加载的时候去掉了inc
    }

    /*
     * 能上卷的道具
     * 添加智能机器人心脏
     */
    public boolean canScroll(int scrollid, int itemid) {
        return (scrollid / 100) % 100 == (itemid / 10000) % 100 || (itemid >= 1672000 && itemid <= 1672010);
    }

    /*
     * 获取装备道具的名称
     */
    public String getName(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.name;
    }

    /*
     * 获取装备道具的描述
     */
    public String getDesc(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.desc;
    }

    public String getMsg(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.msg;
    }

    public short getItemMakeLevel(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return 0;
        }
        return i.itemMakeLevel;
    }

    /*
     * 0x10 notSale
     * 0x20 expireOnLogout
     * 0x40 pickUpBlock
     * 0x80 only 唯一装备
     * 0x100 accountSharable 可以帐号共享装备
     * 0x200 quest 任务道具
     * 0x400 tradeBlock 禁止交易
     * 0x800 accountShareTag
     * 0x1000 mobHP
     * 0x2000 nActivatedSocket 星岩装备
     * 0x4000 superiorEqp 极真装备
     * 0x8000 onlyEquip 只能装备1件
     */
 /*
     * 是否可以卖出
     */
    public boolean cantSell(int itemId) { //true = cant sell, false = can sell
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x10) != 0;
    }

    /*
     * 道具是否下线消失
     */
    public boolean isLogoutExpire(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x20) != 0;
    }

    /*
     * 道具是否禁止
     */
    public boolean isPickupBlocked(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x40) != 0;
    }

    public boolean isPickupRestricted(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return ((i.flag & 0x80) != 0 || ItemConstants.isPickupRestricted(itemId)) && itemId != 4001168; //金枫叶
    }

    public boolean isAccountShared(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x100) != 0;
    }

    public boolean isQuestItem(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x200) != 0 && itemId / 10000 != 301;
    }

    public boolean isDropRestricted(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return ((i.flag & 0x200) != 0 || (i.flag & 0x400) != 0 || ItemConstants.isDropRestricted(itemId));
    }

    public boolean isShareTagEnabled(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x800) != 0;
    }

    public boolean isMobHP(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x1000) != 0;
    }

    /*
     * 是否带镶嵌星岩提示
     */
    public boolean isActivatedSocketItem(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x2000) != 0;
    }

    /*
     * 是否道具强化属性得到大幅提升
     */
    public boolean isSuperiorEquip(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x4000) != 0;
    }

    /*
     * 是否为只能穿戴1件的装备
     */
    public boolean isOnlyEquip(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return (i.flag & 0x8000) != 0;
    }

    public int getStateChangeItem(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return 0;
        }
        return i.stateChange;
    }

    public int getMeso(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return 0;
        }
        return i.meso;
    }

    public boolean isKarmaEnabled(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return i.karmaEnabled == 1;
    }

    public boolean isPKarmaEnabled(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return false;
        }
        return i.karmaEnabled == 2;
    }

    public Pair<Integer, List<StructRewardItem>> getRewardItem(int itemid) {
        ItemInformation i = getItemInformation(itemid);
        if (i == null) {
            return null;
        }
        return new Pair<>(i.totalprob, i.rewardItems);
    }

    public Pair<Integer, List<Integer>> questItemInfo(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return new Pair<>(i.questId, i.questItems);
    }

    public Pair<Integer, String> replaceItemInfo(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return new Pair<>(i.replaceItem, i.replaceMsg);
    }

    public List<Triple<String, Point, Point>> getAfterImage(String after) {
        return afterImage.get(after);
    }

    public String getAfterImage(int itemId) {
        ItemInformation i = getItemInformation(itemId);
        if (i == null) {
            return null;
        }
        return i.afterImage;
    }

    public boolean itemExists(int itemId) {
        if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.UNDEFINED) {
            return false;
        }
        return getItemInformation(itemId) != null;
    }

    public boolean isCash(int itemId) {
        if (getEquipStats(itemId) == null) {
            return ItemConstants.getInventoryType(itemId) == MapleInventoryType.CASH;
        }
        return ItemConstants.getInventoryType(itemId) == MapleInventoryType.CASH || getEquipStats(itemId).get("cash") != null;
    }

    public ItemInformation getItemInformation(int itemId) {
        if (itemId <= 0) {
            return null;
        }
        return dataCache.get(itemId);
    }

    /*
     * 新的加载装备系统
     */
    private ItemInformation tmpInfo = null;

    public void initItemRewardData(ResultSet sqlRewardData) throws SQLException {
        final int itemID = sqlRewardData.getInt("itemid");
        if (tmpInfo == null || tmpInfo.itemId != itemID) {
            if (!dataCache.containsKey(itemID)) {
                System.out.println("[initItemRewardData] Tried to load an item while this is not in the cache: " + itemID);
                return;
            }
            tmpInfo = dataCache.get(itemID);
        }

        if (tmpInfo.rewardItems == null) {
            tmpInfo.rewardItems = new ArrayList<>();
        }

        StructRewardItem add = new StructRewardItem();
        add.itemid = sqlRewardData.getInt("item");
        add.period = (add.itemid == 1122017 ? Math.max(sqlRewardData.getInt("period"), 7200) : sqlRewardData.getInt("period"));
        /*
         * 2511117 - 半月腰带制作配方 几率: 33 数量: 1 修复它的几率为3
         */
        add.prob = add.itemid == 2511117 ? 3 : sqlRewardData.getInt("prob");
        add.quantity = sqlRewardData.getShort("quantity");
        add.worldmsg = sqlRewardData.getString("worldMsg").length() <= 0 ? null : sqlRewardData.getString("worldMsg");
        add.effect = sqlRewardData.getString("effect");

        //String file = "RewardItem\\" + itemID + " - " + getName(itemID) + ".txt";
        //FileoutputUtil.log(file, sqlRewardData.getInt("item") + " - " + getName(sqlRewardData.getInt("item")) + " 几率: " + sqlRewardData.getInt("prob") + " 数量: " + sqlRewardData.getShort("quantity"), true);
        tmpInfo.rewardItems.add(add);
    }

    public void initItemAddData(ResultSet sqlAddData) throws SQLException {
        final int itemID = sqlAddData.getInt("itemid");
        if (tmpInfo == null || tmpInfo.itemId != itemID) {
            if (!dataCache.containsKey(itemID)) {
                System.out.println("[initItemAddData] Tried to load an item while this is not in the cache: " + itemID);
                return;
            }
            tmpInfo = dataCache.get(itemID);
        }

        if (tmpInfo.equipAdditions == null) {
            tmpInfo.equipAdditions = new LinkedList<>();
        }
        tmpInfo.equipAdditions.add(new Triple<>(sqlAddData.getString("key"), sqlAddData.getString("subKey"), sqlAddData.getString("value")));
    }

    public void initItemEquipData(ResultSet sqlEquipData) throws SQLException {
        final int itemID = sqlEquipData.getInt("itemid");
        if (tmpInfo == null || tmpInfo.itemId != itemID) {
            if (!dataCache.containsKey(itemID)) {
                System.out.println("[initItemEquipData] Tried to load an item while this is not in the cache: " + itemID);
                return;
            }
            tmpInfo = dataCache.get(itemID);
        }

        if (tmpInfo.equipStats == null) {
            tmpInfo.equipStats = new HashMap<>();
        }

        final int itemLevel = sqlEquipData.getInt("itemLevel");
        if (itemLevel == -1) {
            tmpInfo.equipStats.put(sqlEquipData.getString("key"), sqlEquipData.getInt("value"));
        } else {
            if (tmpInfo.equipIncs == null) {
                tmpInfo.equipIncs = new HashMap<>();
            }
            Map<String, Integer> toAdd = tmpInfo.equipIncs.get(itemLevel);
            if (toAdd == null) {
                toAdd = new HashMap<>();
                tmpInfo.equipIncs.put(itemLevel, toAdd);
            }
            toAdd.put(sqlEquipData.getString("key"), sqlEquipData.getInt("value"));
        }
    }

    public void finalizeEquipData(ItemInformation item) {
        int itemId = item.itemId;

        // Some equips do not have equip data. So we initialize it anyway if not initialized
        // already
        // Credits: Jay :)
        if (item.equipStats == null) {
            item.equipStats = new HashMap<>();
        }

        item.eq = new Equip(itemId, (byte) 0, -1, (byte) 0);
        short stats = ItemConstants.getStat(itemId, 0);
        if (stats > 0) {
            item.eq.setStr(stats);
            item.eq.setDex(stats);
            item.eq.setInt(stats);
            item.eq.setLuk(stats);
        }
        stats = ItemConstants.getATK(itemId, 0);
        if (stats > 0) {
            item.eq.setWatk(stats);
            item.eq.setMatk(stats);
        }
        stats = ItemConstants.getHpMp(itemId, 0);
        if (stats > 0) {
            item.eq.setHp(stats);
            item.eq.setMp(stats);
        }
        stats = ItemConstants.getDEF(itemId, 0);
        if (stats > 0) {
            item.eq.setWdef(stats);
            item.eq.setMdef(stats);
        }
        if (item.equipStats.size() > 0) {
            for (Entry<String, Integer> stat : item.equipStats.entrySet()) {
                final String key = stat.getKey();
                if (key.equalsIgnoreCase("STR")) {
                    item.eq.setStr(ItemConstants.getStat(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("DEX")) {
                    item.eq.setDex(ItemConstants.getStat(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("INT")) {
                    item.eq.setInt(ItemConstants.getStat(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("LUK")) {
                    item.eq.setLuk(ItemConstants.getStat(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("PAD")) {
                    item.eq.setWatk(ItemConstants.getATK(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("PDD")) {
                    item.eq.setWdef(ItemConstants.getDEF(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("MAD")) {
                    item.eq.setMatk(ItemConstants.getATK(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("MDD")) {
                    item.eq.setMdef(ItemConstants.getDEF(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("ACC")) {
                    item.eq.setAcc((short) stat.getValue().intValue());
                } else if (key.equalsIgnoreCase("EVA")) {
                    item.eq.setAvoid((short) stat.getValue().intValue());
                } else if (key.equalsIgnoreCase("Speed")) {
                    item.eq.setSpeed((short) stat.getValue().intValue());
                } else if (key.equalsIgnoreCase("Jump")) {
                    item.eq.setJump((short) stat.getValue().intValue());
                } else if (key.equalsIgnoreCase("MHP")) {
                    item.eq.setHp(ItemConstants.getHpMp(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("MMP")) {
                    item.eq.setMp(ItemConstants.getHpMp(itemId, stat.getValue()));
                } else if (key.equalsIgnoreCase("tuc")) {
                    item.eq.setUpgradeSlots(stat.getValue().byteValue());
                } else if (key.equalsIgnoreCase("Craft")) {
                    item.eq.setHands(stat.getValue().shortValue());
                } else if (key.equalsIgnoreCase("durability")) {
                    item.eq.setDurability(stat.getValue());
                } else if (key.equalsIgnoreCase("charmEXP")) {
                    item.eq.setCharmEXP(stat.getValue().shortValue());
                } else if (key.equalsIgnoreCase("PVPDamage")) {
                    item.eq.setPVPDamage(stat.getValue().shortValue());
                } else if (key.equalsIgnoreCase("bdR")) {
                    item.eq.setBossDamage(stat.getValue().shortValue());
                } else if (key.equalsIgnoreCase("imdR")) {
                    item.eq.setIgnorePDR(stat.getValue().shortValue());
                } else if (key.equalsIgnoreCase("damR")) {
                    item.eq.setTotalDamage(stat.getValue().shortValue());
                }
            }
            if (item.equipStats.get("cash") != null && item.eq.getCharmEXP() <= 0) { //set the exp
                short exp = 0;
                int identifier = itemId / 10000;
                if (ItemConstants.isWeapon(itemId) || identifier == 106) { //weapon overall
                    exp = 60;
                } else if (identifier == 100) { //hats
                    exp = 50;
                } else if (ItemConstants.isAccessory(itemId) || identifier == 102 || identifier == 108 || identifier == 107) { //gloves shoes accessory
                    exp = 40;
                } else if (identifier == 104 || identifier == 105 || identifier == 110) { //top bottom cape
                    exp = 30;
                }
                item.eq.setCharmEXP(exp);
            }
        }
    }

    public void initItemInformation(ResultSet sqlItemData) throws SQLException {
        final ItemInformation ret = new ItemInformation();
        final int itemId = sqlItemData.getInt("itemid");
        ret.itemId = itemId;
        ret.slotMax = ItemConstants.getSlotMax(itemId) > 0 ? ItemConstants.getSlotMax(itemId) : sqlItemData.getShort("slotMax");
        ret.price = Double.parseDouble(sqlItemData.getString("price"));
        ret.wholePrice = sqlItemData.getInt("wholePrice");
        ret.stateChange = sqlItemData.getInt("stateChange");
        ret.name = sqlItemData.getString("name");
        ret.desc = sqlItemData.getString("desc");
        ret.msg = sqlItemData.getString("msg");

        ret.flag = sqlItemData.getInt("flags");

        ret.karmaEnabled = sqlItemData.getByte("karma");
        ret.meso = sqlItemData.getInt("meso");
        ret.monsterBook = sqlItemData.getInt("monsterBook");
        ret.itemMakeLevel = sqlItemData.getShort("itemMakeLevel");
        ret.questId = sqlItemData.getInt("questId");
        ret.create = sqlItemData.getInt("create");
        ret.replaceItem = sqlItemData.getInt("replaceId");
        ret.replaceMsg = sqlItemData.getString("replaceMsg");
        ret.afterImage = sqlItemData.getString("afterImage");
        ret.cardSet = 0;
        if (ret.monsterBook > 0 && itemId / 10000 == 238) {
            mobIds.put(ret.monsterBook, itemId);
            for (Entry<Integer, Triple<Integer, List<Integer>, List<Integer>>> set : monsterBookSets.entrySet()) {
                if (set.getValue().mid.contains(itemId)) {
                    ret.cardSet = set.getKey();
                    break;
                }
            }
        }

        final String scrollRq = sqlItemData.getString("scrollReqs");
        if (scrollRq.length() > 0) {
            ret.scrollReqs = new ArrayList<>();
            final String[] scroll = scrollRq.split(",");
            for (String s : scroll) {
                if (s.length() > 1) {
                    ret.scrollReqs.add(Integer.parseInt(s));
                }
            }
        }

        final String consumeItem = sqlItemData.getString("consumeItem");
        if (consumeItem.length() > 0) {
            ret.questItems = new ArrayList<>();
            final String[] scroll = scrollRq.split(",");
            for (String s : scroll) {
                if (s.length() > 1) {
                    ret.questItems.add(Integer.parseInt(s));
                }
            }
        }

        ret.totalprob = sqlItemData.getInt("totalprob");

        final String incRq = sqlItemData.getString("incSkill");
        if (incRq.length() > 0) {
            ret.incSkill = new ArrayList<>();
            final String[] scroll = incRq.split(",");
            for (String s : scroll) {
                if (s.length() > 1) {
                    ret.incSkill.add(Integer.parseInt(s));
                }
            }
        }
        dataCache.put(itemId, ret);
    }

    public double getExpCardRate(int itemId) {
        return MapleDataTool.getIntConvert("info/rate", getItemData(itemId), 100) / 100;
    }

    public int getExpCardMaxLevel(int itemId) {
        return MapleDataTool.getIntConvert("info/maxLevel", getItemData(itemId), 249);
    }

    public boolean isExpOrDropCardTime(int itemId) {
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/ShangHai"));
        String day = MapleDayInt.getDayInt(cal.get(Calendar.DAY_OF_WEEK));
        //System.out.println("当前时间: " + cal.get(Calendar.HOUR_OF_DAY));
        Map<String, String> times;
        if (getExpCardTimes.containsKey(itemId)) {
            times = getExpCardTimes.get(itemId);
        } else {
            List<MapleData> data = getItemData(itemId).getChildByPath("info").getChildByPath("time").getChildren();
            Map<String, String> hours = new HashMap<>();
            for (MapleData childdata : data) { //MON:03-07
                String[] time = MapleDataTool.getString(childdata).split(":");
                hours.put(time[0], time[1]);
            }
            times = hours;
            getExpCardTimes.put(itemId, hours);
            cal.get(Calendar.DAY_OF_WEEK);
        }
        if (times.containsKey(day)) {
            String[] hourspan = times.get(day).split("-");
            int starthour = Integer.parseInt(hourspan[0]);
            int endhour = Integer.parseInt(hourspan[1]);
            //System.out.println("starthour: " + starthour + " endhour: " + endhour + " nowhour: " + cal.get(Calendar.HOUR_OF_DAY));
            if (cal.get(Calendar.HOUR_OF_DAY) >= starthour && cal.get(Calendar.HOUR_OF_DAY) <= endhour) {
                return true;
            }
        }
        return false;
    }

    public static class MapleDayInt {

        public static String getDayInt(int day) {
            if (day == 1) {
                return "SUN";
            } else if (day == 2) {
                return "MON";
            } else if (day == 3) {
                return "TUE";
            } else if (day == 4) {
                return "WED";
            } else if (day == 5) {
                return "THU";
            } else if (day == 6) {
                return "FRI";
            } else if (day == 7) {
                return "SAT";
            }
            return null;
        }
    }

    /*
     * 脚本道具物品
     */
    public ScriptedItem getScriptedItemInfo(int itemId) {
        if (scriptedItemCache.containsKey(itemId)) {
            return scriptedItemCache.get(itemId);
        }
        if ((itemId / 10000) != 243) {
            return null;
        }
        ScriptedItem script = new ScriptedItem(MapleDataTool.getInt("spec/npc", getItemData(itemId), 0), MapleDataTool.getString("spec/script", getItemData(itemId), ""), MapleDataTool.getInt("spec/runOnPickup", getItemData(itemId), 0) == 1);
        scriptedItemCache.put(itemId, script);
        return scriptedItemCache.get(itemId);
    }

    /*
     * 十字猎人商店数据
     */
    public StructCrossHunterShop getCrossHunterShop(int key) {
        if (crossHunterShop.containsKey(key)) {
            return crossHunterShop.get(key);
        }
        return null;
    }

    /*
     * 拥有漂浮效果的道具
     */
    public boolean isFloatCashItem(int itemId) {
        if (floatCashItem.containsKey(itemId)) {
            return floatCashItem.get(itemId);
        }
        if ((itemId / 10000) != 512) {
            return false;
        }
        boolean floatType = MapleDataTool.getIntConvert("info/floatType", getItemData(itemId), 0) > 0;
        floatCashItem.put(itemId, floatType);
        return floatType;
    }

    /*
     * 宠物状态信息
     */
    public short getPetFlagInfo(int itemId) {
        if (petFlagInfo.containsKey(itemId)) {
            return petFlagInfo.get(itemId);
        }
        short flag = 0;
        if ((itemId / 10000) != 500) {
            return flag;
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return flag;
        }
        if (MapleDataTool.getIntConvert("info/pickupItem", item, 0) > 0) { //拣取道具
            flag |= 0x01;
        }
        if (MapleDataTool.getIntConvert("info/longRange", item, 0) > 0) { //扩大移动范围
            flag |= 0x02;
        }
        if (MapleDataTool.getIntConvert("info/pickupAll", item, 0) > 0) { //范围自动捡起
            flag |= 0x04;
        }
        if (MapleDataTool.getIntConvert("info/sweepForDrop", item, 0) > 0) { //捡取无所有权的道具和金币
            flag |= 0x10;
        }
        if (MapleDataTool.getIntConvert("info/consumeHP", item, 0) > 0) { //自动补HP药水
            flag |= 0x20;
        }
        if (MapleDataTool.getIntConvert("info/consumeMP", item, 0) > 0) { //自动补MP药水
            flag |= 0x40;
        }
        if (MapleDataTool.getIntConvert("info/autoBuff", item, 0) > 0) { //自动使用增益技能
            flag |= 0x200;
        }
        petFlagInfo.put(itemId, flag);
        return flag;
    }

    /*
     * 宠物触发的套装ID
     */
    public int getPetSetItemID(int itemId) {
        if (petSetItemID.containsKey(itemId)) {
            return petSetItemID.get(itemId);
        }
        int ret = -1;
        if (itemId / 10000 != 500) {
            return ret;
        }
        ret = MapleDataTool.getIntConvert("info/setItemID", getItemData(itemId), 0);
        petSetItemID.put(itemId, ret);
        return ret;
    }

    /*
     * 装备加百分百HP
     */
    public int getItemIncMHPr(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("MHPr")) {
            return 0;
        }
        return getEquipStats(itemId).get("MHPr");
    }

    /*
     * 装备加百分百MP
     */
    public int getItemIncMMPr(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("MMPr")) {
            return 0;
        }
        return getEquipStats(itemId).get("MMPr");
    }

    /*
     * 卷轴成功几率
     * 几个特殊的卷
     * 2046006 - 周年庆单手武器攻击力卷轴 - 提高单手武器的功能物理攻击力属性。
     */
    public int getSuccessRates(int itemId) {
        if (successRates.containsKey(itemId)) {
            return successRates.get(itemId);
        }
        int success = 0;
        if ((itemId / 10000) != 204) {
            return success;
        }
        success = MapleDataTool.getIntConvert("info/successRates/0", getItemData(itemId), 0);
        successRates.put(itemId, success);
        return success;
    }

    /*
     * 强化卷轴成功提升的星级
     */
    public int getForceUpgrade(int itemId) {
        if (forceUpgrade.containsKey(itemId)) {
            return forceUpgrade.get(itemId);
        }
        int upgrade = 0;
        if (itemId / 100 != 20493) {
            return upgrade;
        }
        upgrade = MapleDataTool.getIntConvert("info/forceUpgrade", getItemData(itemId), 1);
        forceUpgrade.put(itemId, upgrade);
        return upgrade;
    }

    /*
     * 自带安全盾的卷轴
     */
    public boolean hasSafetyShield(int itemId) {
        if (safetyShield.containsKey(itemId)) {
            return safetyShield.get(itemId);
        }
        boolean upgrade;
        upgrade = MapleDataTool.getIntConvert("info/safetyShield", getItemData(itemId), 0) == 1;
        safetyShield.put(itemId, upgrade);
        return upgrade;
    }

    /*
     * 椅子恢复的HP和MP
     */
    public Pair<Integer, Integer> getChairRecovery(int itemId) {
        if (itemId / 10000 != 301) {
            return null;
        }
        if (chairRecovery.containsKey(itemId)) {
            return chairRecovery.get(itemId);
        }
        int recoveryHP = MapleDataTool.getIntConvert("info/recoveryHP", getItemData(itemId), 0);
        int recoveryMP = MapleDataTool.getIntConvert("info/recoveryMP", getItemData(itemId), 0);
        Pair<Integer, Integer> ret = new Pair<>(recoveryHP, recoveryMP);
        chairRecovery.put(itemId, ret);
        return ret;
    }

    /*
     * 武器突破极限的攻击上限
     */
    public int getLimitBreak(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("limitBreak")) {
            return 999999; //默认攻击上限
        }
        return getEquipStats(itemId).get("limitBreak");
    }

    /*
     * 装备带默认BOSS攻击
     */
    public int getBossDamageRate(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("bdR")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("bdR");
    }

    /*
     * 装备带默认无视怪物防御
     */
    public int getIgnoreMobDmageRate(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("imdR")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("imdR");
    }

    public int getTotalDamage(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("damR")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("damR");
    }

    /*
     * 装备带默认潜能属性
     */
    public int getOption1(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("option0")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("option0");
    }

    public int getOption2(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("option1")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("option1");
    }

    public int getOption3(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("option2")) {
            return 0; //默认0
        }
        return getEquipStats(itemId).get("option2");
    }

    /*
     * 获取智能机器人的类型
     */
    public int getAndroidType(int itemId) {
        if (androidType.containsKey(itemId)) {
            return androidType.get(itemId);
        }
        int type = 0;
        if (itemId / 10000 != 166) { //好像安卓道具为 1662000 - 1662034 和 1666000
            return type;
        }
        type = MapleDataTool.getIntConvert("info/android", getItemData(itemId), 1); //设置默认类型为 1
        androidType.put(itemId, type);
        return type;
    }

    /*
     * 强化卷轴成功提升的星级
     */
    public int getScrollLimitBreak(int itemId) {
        if (ScrollLimitBreak.containsKey(itemId)) {
            return ScrollLimitBreak.get(itemId);
        }
        int upgrade = 0;
        if (itemId / 100 != 26140) {
            return upgrade;
        }
        upgrade = MapleDataTool.getIntConvert("info/incALB", getItemData(itemId), 0);
        forceUpgrade.put(itemId, upgrade);
        return upgrade;
    }

    /*
     * 卷轴失败不装备不损坏的卷轴
     */
    public boolean isNoCursedScroll(int itemId) {
        if (noCursedScroll.containsKey(itemId)) {
            return noCursedScroll.get(itemId);
        }
        if (itemId / 10000 != 204) {
            return false;
        }
        boolean noCursed = MapleDataTool.getIntConvert("info/noCursed", getItemData(itemId), 0) > 0;
        noCursedScroll.put(itemId, noCursed);
        return noCursed;
    }

    /*
     * 正向卷轴 不减少道具属性
     */
    public boolean isNegativeScroll(int itemId) {
        if (noNegativeScroll.containsKey(itemId)) {
            return noNegativeScroll.get(itemId);
        }
        if (itemId / 10000 != 204) {
            return false;
        }
        boolean noNegative = MapleDataTool.getIntConvert("info/noNegative", getItemData(itemId), 0) > 0;
        noNegativeScroll.put(itemId, noNegative);
        return noNegative;
    }

    /*
     * 是否禁止重复穿戴的装备道具
     */
    public boolean isExclusiveEquip(int itemId) {
        return exclusiveEquip.containsKey(itemId);
    }

    public StructExclusiveEquip getExclusiveEquipInfo(int itemId) {
        if (exclusiveEquip.containsKey(itemId)) {
            int exclusiveId = exclusiveEquip.get(itemId);
            if (exclusiveEquipInfo.containsKey(exclusiveId)) {
                return exclusiveEquipInfo.get(exclusiveId);
            }
        }
        return null;
    }

    public void initSealedEquipInfo() {
        if (!sealedEquipInfo.isEmpty()) {
            return;
        }
        for (int itemid : GameConstants.sealedEquip) {
            Map<Integer, List<Pair<String, Integer>>> sealedinfo = new HashMap<>();
            for (MapleData childdata : getItemData(itemid).getChildByPath("info/sealed/info")) {
                List<Pair<String, Integer>> sealedinfoo = new LinkedList<>();
                for (MapleData info : childdata.getChildren()) {
                    sealedinfoo.add(new Pair(info.getName(), info.getData()));
                }
                sealedinfo.put(Integer.valueOf(childdata.getName()), sealedinfoo);
            }
            sealedEquipInfo.put(itemid, sealedinfo);
        }
        System.out.println("共加载 " + sealedEquipInfo.size() + " 个漩涡装备.");
    }

    public List<Pair<String, Integer>> getSealedEquipInfo(int itemId, int level) {
        if (sealedEquipInfo.containsKey(itemId) && sealedEquipInfo.get(itemId).containsKey(level)) {
            return sealedEquipInfo.get(itemId).get(level);
        }
        return null;
    }

    /*
     * 获取技能皮肤对应的技能ID
     */
    public int getSkillSkinFormSkillId(int itemId) {
        if (skillSkin.containsKey(itemId)) {
            return skillSkin.get(itemId);
        }
        int skillId = 0;
        if (itemId / 1000 != 1603) {
            return skillId;
        }
        skillId = MapleDataTool.getIntConvert("info/skillID", getItemData(itemId), 0);
        forceUpgrade.put(itemId, skillId);
        return skillId;
    }

    /*
     * 读取装备附魔的卷轴
     */
    public void loadEnchatingScrolls() {
        if (!enchantingScroll.isEmpty()) {
            return;
        }
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<String> typename = new LinkedList<>();
        List<Pair<String, EnchantingScroll>> allscroll = new LinkedList<>();
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM data_customscroll");
            rs = ps.executeQuery();
            while (rs.next()) {
                if (!typename.contains(rs.getString("type"))) {
                    typename.add(rs.getString("type"));
                }
                allscroll.add(new Pair<>(rs.getString("type"), new EnchantingScroll(
                        rs.getString("name"),
                        rs.getInt("watk"),
                        rs.getInt("matk"),
                        rs.getInt("str"),
                        rs.getInt("dex"),
                        rs.getInt("int"),
                        rs.getInt("luk"),
                        rs.getInt("wdef"),
                        rs.getInt("mdef"),
                        rs.getInt("maxhp"),
                        rs.getInt("maxmp"),
                        rs.getInt("acc"),
                        rs.getInt("avoid"),
                        rs.getInt("jump"),
                        rs.getInt("speed"),
                        rs.getInt("succ"),
                        rs.getInt("need"),
                        ItemConstants.getEnchantingScrollStyle(rs.getString("style")))));
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            System.err.println("Error loadEnchatingScrolls:" + ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex) {
//                log.error(ex.toString());
            }
        }
        for (String type : typename) {
            List<EnchantingScroll> list = new LinkedList<>();
            for (Pair<String, EnchantingScroll> scroll : allscroll) {
                if (scroll.left.equals(type)) {
                    list.add(scroll.right);
                }
            }
            enchantingScroll.put(type, list);
        }
    }

    public void reloadEnchatingScrolls() {
        enchantingScroll.clear();
        enchantingEnhance.clear();
        loadEnchatingScrolls();
        loadEnchantingEnhance();
    }

    public List<EnchantingScroll> getEnchantingScrolls(String type) {
        if (enchantingScroll.containsKey(type)) {
            return enchantingScroll.get(type);
        }
        return null;
    }

    /*
     * 读取装备附魔的星级属性
     */
    public void loadEnchantingEnhance() {
        if (!enchantingEnhance.isEmpty()) {
            return;
        }

        PreparedStatement ps = null;
        ResultSet rs = null;
        List<String> typename = new LinkedList<>();
        List<Pair<String, EnchantingScroll>> allscroll = new LinkedList<>();
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM data_starforce");
            rs = ps.executeQuery();
            while (rs.next()) {
                if (!typename.contains(rs.getString("type"))) {
                    typename.add(rs.getString("type"));
                }
                allscroll.add(new Pair<>(rs.getString("type"), new EnchantingScroll(
                        "",
                        rs.getInt("watk"),
                        rs.getInt("matk"),
                        rs.getInt("str"),
                        rs.getInt("dex"),
                        rs.getInt("int"),
                        rs.getInt("luk"),
                        rs.getInt("wdef"),
                        rs.getInt("mdef"),
                        rs.getInt("maxhp"),
                        rs.getInt("maxmp"),
                        rs.getInt("acc"),
                        rs.getInt("avoid"),
                        rs.getInt("jump"),
                        rs.getInt("speed"),
                        rs.getInt("succ"),
                        rs.getInt("need"),
                        rs.getInt("level"))));
            }
            rs.close();
            ps.close();
        } catch (final SQLException ex) {
            System.err.println("Error loadEnchatingScrolls:" + ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex) {
//                log.error(ex.toString());
            }
        }
        for (String type : typename) {
            Map<Integer, EnchantingScroll> list = new HashMap<>();
            for (Pair<String, EnchantingScroll> scroll : allscroll) {
                if (scroll.left.equals(type)) {
                    list.put(scroll.right.style, scroll.right);
                }
            }
            enchantingEnhance.put(type, list);
        }
    }

    public EnchantingScroll getEnchantingEnhanceInfo(String type, int level) {
        if (enchantingEnhance.containsKey(type)) {
            if (enchantingEnhance.get(type).containsKey(level)) {
                return enchantingEnhance.get(type).get(level);
            }
        }
        return null;
    }

    public boolean loadHairFace(int id) {
        if (HairFaces.isEmpty()) {
            MapleDataDirectoryEntry root = chrData.getRoot();
            for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
                if (!topDir.getName().equals("Face") && !topDir.getName().equals("Hair")) {
                    continue;
                }
                for (MapleDataFileEntry iFile : topDir.getFiles()) {
                    String idstr = iFile.getName().substring(0, 8);
                    if (idstr.equals("CommonFa")) {
                        continue;
                    }
                    HairFaces.add(Integer.valueOf(idstr));
                }
            }
        }
        return HairFaces.contains(id);
    }

    public final void loadStyles(boolean reload) {
        if (reload) {
            hairList.clear();
            faceList.clear();
        }
        if (!hairList.isEmpty() || !faceList.isEmpty()) {
            return;
        }
        String[] types = {"Hair", "Face"};
        for (String type : types) {
            for (MapleData c : stringData.getData("Eqp.img").getChildByPath("Eqp/" + type)) {
                MapleData da = chrData.getReturnData(type + "/" + StringUtil.getLeftPaddedStr(c.getName() + ".img", '0', 12));
                if (da == null) {
                    continue;
                }
                int dataid = Integer.parseInt(c.getName());
                String name = MapleDataTool.getString("name", c, "无名称");
                if (type.equals("Hair")) {
                    hairList.put(dataid, name);
                } else {
                    faceList.put(dataid, name);
                }
            }
        }
        System.out.println("共加载发型和脸型ID：" + HairFaces.size() + "个，" + "可用发型ID：" + hairList.size() + "个，可用脸型ID：" + faceList.size() + "个");
    }

    public boolean hairExists(int hair) {
        return hairList.containsKey(hair);
    }

    public boolean faceExists(int face) {
        return faceList.containsKey(face);
    }

    public final Map<Integer, String> getHairList() {
        Map<Integer, String> list = new TreeMap<>();
        list.putAll(hairList);
        return list;
    }

    public final Map<Integer, String> getFaceList() {
        Map<Integer, String> list = new TreeMap<>();
        list.putAll(faceList);
        return list;
    }

    public boolean isWeapon(int itemid) {
        return WeaponIDs.contains(itemid);
    }

    /*
     * 获得灵魂结晶的成功率
     */
    public int getSoulSuccessRates(int itemId) {
        if (soulSuccessRates.containsKey(itemId)) {
            return soulSuccessRates.get(itemId);
        }
        int success = 0;
        if (!ItemConstants.is灵魂结晶(itemId)) {
            return success;
        }
        success = MapleDataTool.getIntConvert("info/success", getItemData(itemId), 0);
        soulSuccessRates.put(itemId, success);
        return success;
    }

    public Pair<Integer, Integer> getSocketReqLevel(int itemId) {
        int socketId = itemId % 1000 + 1;
        if (!socketReqLevel.containsKey(socketId)) {
            MapleData skillOptionData = itemData.getData("SkillOption.img");
            MapleData socketData = skillOptionData.getChildByPath("socket");
            int reqLevelMax = MapleDataTool.getIntConvert(socketId + "/reqLevelMax", socketData, 250);
            int reqLevelMin = MapleDataTool.getIntConvert(socketId + "/reqLevelMin", socketData, 70);
            socketReqLevel.put(socketId, new Pair(reqLevelMax, reqLevelMin));
        }
        return socketReqLevel.get(socketId);
    }

    public int getSoulSkill(int itemId) {
        int soulName = itemId % 1000 + 1;
        if (!soulSkill.containsKey(soulName)) {
            MapleData skillOptionData = itemData.getData("SkillOption.img");
            MapleData skillData = skillOptionData.getChildByPath("skill");
            int skillId = MapleDataTool.getIntConvert(soulName + "/skillId", skillData, 0);
            soulSkill.put(soulName, skillId);
        }
        return soulSkill.get(soulName);
    }

    public ArrayList<Integer> getTempOption(int itemId) {
        int soulName = itemId % 1000 + 1;
        if (!tempOption.containsKey(soulName)) {
            MapleData skillOptionData = itemData.getData("SkillOption.img");
            MapleData tempOptionData = skillOptionData.getChildByPath("skill/" + soulName + "/tempOption");
            ArrayList<Integer> pots = new ArrayList();
            for (MapleData pot : tempOptionData) {
                pots.add(MapleDataTool.getIntConvert("id", pot, 1));
            }
            tempOption.put(soulName, pots);
        }
        return tempOption.get(soulName);
    }
}
