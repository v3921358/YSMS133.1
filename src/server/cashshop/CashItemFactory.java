package server.cashshop;

import database.DatabaseConnection;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import provider.MapleData;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataEntry;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.cashshop.CashItemInfo.CashModInfo;

public class CashItemFactory {

    private static CashItemFactory instance = new CashItemFactory();
    private final static int[] bestItems = new int[]{30200045, 50000080, 30200066, 50400016, 30100092};
    private Map<Integer, CashItemInfo> itemStats = new HashMap<>(); //商城道具状态
    private Map<Integer, Integer> idLookup = new HashMap<>(); //商城道具的SN集合
    private Map<Integer, CashItemInfo> oldItemStats = new HashMap<>(); //老版本的商城道具状态
    private Map<Integer, Integer> oldIdLookup = new HashMap<>(); //老版本的商城道具的SN集合
    private Map<Integer, List<Integer>> itemPackage = new HashMap<>(); //礼包信息
    private Map<Integer, List<Integer>> openBox = new HashMap<>(); //箱子道具物品
    private MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Etc.wz"));
    private MapleData commodities = data.getData("Commodity.img");
    private Map<Integer, Boolean> blockCashItemId = new HashMap<>(); //禁止购买的商城道具ID
    private Map<Integer, Boolean> blockCashSnId = new HashMap<>(); //禁止购买的SNid
    private List<Integer> blockRefundableItemId = new LinkedList<>(); //禁止使用回购的道具 也就是有些道具有多个SN信息 而每个SN下的价格又不一样

    private final List<CashItemCategory> categories = new LinkedList<>();
    private final Map<Integer, CashModInfo> itemMods = new HashMap<>();
    private final Map<Integer, CashItemForSql> menuItems = new HashMap<>();
    private final Map<Integer, CashItemForSql> categoryItems = new HashMap<>();

    public static CashItemFactory getInstance() {
        return instance;
    }

    public void initialize() {
        blockRefundableItemId.clear();
        int onSaleSize = 0;
        Map<Integer, Integer> fixId = new HashMap<>(); //检测WZ中是否有重复价格的道具 [SN] [itemId]
        //加载商城道具
        for (MapleData field : commodities.getChildren()) {
            int SN = MapleDataTool.getIntConvert("SN", field, 0);
            int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
            int count = MapleDataTool.getIntConvert("Count", field, 1);
            int price = MapleDataTool.getIntConvert("Price", field, 0);
            int originalPrice = MapleDataTool.getIntConvert("originalPrice", field, 0);
            int period = MapleDataTool.getIntConvert("Period", field, 0);
            int gender = MapleDataTool.getIntConvert("Gender", field, 2);
            boolean onSale = MapleDataTool.getIntConvert("OnSale", field, 0) > 0 || isOnSalePackage(SN); //道具是否出售
            boolean bonus = MapleDataTool.getIntConvert("Bonus", field, 0) >= 0; //是否有奖金红利？
            boolean refundable = MapleDataTool.getIntConvert("Refundable", field, 0) == 0; //道具是否可以回购
            boolean discount = MapleDataTool.getIntConvert("discount", field, 0) >= 0; //是否打折出售
            if (onSale) {
                onSaleSize++;
            }
            //int itemId, int count, int price, int sn, int expire, int gender, boolean sale
            CashItemInfo stats = new CashItemInfo(itemId, count, price, originalPrice, SN, period, gender, onSale, bonus, refundable, discount);
            if (SN > 0) {
                itemStats.put(SN, stats);
                if (idLookup.containsKey(itemId)) {
                    fixId.put(SN, itemId);
                    blockRefundableItemId.add(itemId);
                }
                idLookup.put(itemId, SN);
            }
        }
        System.out.println("共加载 " + itemStats.size() + " 个商城道具 有 " + onSaleSize + " 个道具处于出售状态...");
        System.out.println("其中有 " + fixId.size() + " 重复价格的道具和 " + blockRefundableItemId.size() + " 个禁止换购的道具.");
        //加载商城礼包的信息
        MapleData packageData = data.getData("CashPackage.img");
        for (MapleData root : packageData.getChildren()) {
            if (root.getChildByPath("SN") == null) {
                continue;
            }
            List<Integer> packageItems = new ArrayList<>();
            for (MapleData dat : root.getChildByPath("SN").getChildren()) {
                packageItems.add(MapleDataTool.getIntConvert(dat));
            }
            itemPackage.put(Integer.parseInt(root.getName()), packageItems);
        }
        System.out.println("共加载 " + itemPackage.size() + " 个商城礼包...");
        //加载老的商城道具信息
        onSaleSize = 0;
        MapleDataDirectoryEntry root = data.getRoot();
        for (MapleDataEntry topData : root.getFiles()) {
            if (topData.getName().startsWith("OldCommodity")) {
                MapleData Commodity = data.getData(topData.getName());
                for (MapleData field : Commodity.getChildren()) {
                    int SN = MapleDataTool.getIntConvert("SN", field, 0);
                    int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
                    int count = MapleDataTool.getIntConvert("Count", field, 1);
                    int price = MapleDataTool.getIntConvert("Price", field, 0);
                    int originalPrice = MapleDataTool.getIntConvert("originalPrice", field, 0);
                    int period = MapleDataTool.getIntConvert("Period", field, 0);
                    int gender = MapleDataTool.getIntConvert("Gender", field, 2);
                    boolean onSale = MapleDataTool.getIntConvert("OnSale", field, 0) > 0 || isOnSalePackage(SN); //道具是否出售
                    boolean bonus = MapleDataTool.getIntConvert("Bonus", field, 0) >= 0; //是否有奖金红利？
                    boolean refundable = MapleDataTool.getIntConvert("Refundable", field, 0) == 0; //道具是否可以回购
                    boolean discount = MapleDataTool.getIntConvert("discount", field, 0) >= 0; //是否打折出售
                    if (onSale) {
                        onSaleSize++;
                    }
                    CashItemInfo stats = new CashItemInfo(itemId, count, price, originalPrice, SN, period, gender, onSale, bonus, refundable, discount);
                    if (SN > 0) {
                        oldItemStats.put(SN, stats);
                        oldIdLookup.put(itemId, SN);
                    }
                }
            }
        }
        System.out.println("共加载 " + oldItemStats.size() + " 个老的商城道具 有 " + onSaleSize + " 个道具处于出售状态...");
        loadBlockedCash();

        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_modified_items"); ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    CashModInfo ret = new CashModInfo(rs.getInt("serial"), rs.getInt("discount_price"), rs.getInt("mark"), rs.getInt("showup") > 0, rs.getInt("itemid"), rs.getInt("priority"), rs.getInt("package") > 0, rs.getInt("period"), rs.getInt("gender"), rs.getInt("count"), rs.getInt("meso"), rs.getInt("unk_1"), rs.getInt("unk_2"), rs.getInt("unk_3"), rs.getInt("extra_flags"));
                    itemMods.put(ret.sn, ret);
                    if (ret.showUp) {
                        final CashItemInfo cc = itemStats.get(ret.sn);
                        if (cc != null) {
                            ret.toCItem(cc); //init
                        }
                    }
                }
            }
        } catch (SQLException e) {
            System.out.println("cashshop_modified_items_error: " + e);
        }

        loadRandomItemInfo();

        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_categories"); ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    CashItemCategory cat = new CashItemCategory(rs.getInt("categoryid"), rs.getString("name"), rs.getInt("parent"), rs.getInt("flag"), rs.getInt("sold"));
                    categories.add(cat);
                }
            }
        } catch (SQLException e) {
            System.out.println("Failed to load cash shop categories. " + e);
        }

        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_menuitems"); ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    CashItemForSql item = new CashItemForSql(rs.getInt("category"), rs.getInt("subcategory"), rs.getInt("parent"), rs.getString("image"), rs.getInt("sn"), rs.getInt("itemid"), rs.getInt("flag"), rs.getInt("price"), rs.getInt("discountPrice"), rs.getInt("quantity"), rs.getInt("expire"), rs.getInt("gender"), rs.getInt("likes"));
                    menuItems.put(item.getSN(), item);
                }
            }
        } catch (SQLException e) {
            System.out.println("Failed to load cash shop menuitems. " + e);
        }

        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM cashshop_items"); ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    CashItemForSql item = new CashItemForSql(rs.getInt("category"), rs.getInt("subcategory"), rs.getInt("parent"), rs.getString("image"), rs.getInt("sn"), rs.getInt("itemid"), rs.getInt("flag"), rs.getInt("price"), rs.getInt("discountPrice"), rs.getInt("quantity"), rs.getInt("expire"), rs.getInt("gender"), rs.getInt("likes"));
                    categoryItems.put(item.getSN(), item);
                }
            }
        } catch (SQLException e) {
            System.out.println("Failed to load cash shop items. " + e);
        }
    }

    public void loadBlockedCash() {
        blockCashItemId.clear();
        MapleData root = data.getData("BlockCash.img");
        for (MapleData dat : root.getChildByPath("ItemId").getChildren()) {
            int itemId = Integer.parseInt(dat.getName());
            boolean block = MapleDataTool.getIntConvert("Block", dat, 0) > 0;
            if (blockCashItemId.containsKey(itemId)) {
                System.out.println("发现重复禁止道具信息: " + itemId);
                continue;
            }
            blockCashItemId.put(itemId, block);
        }
        System.out.println("共加载 " + blockCashItemId.size() + " 个商城禁止购买的道具ID信息...");
        blockCashSnId.clear();
        for (MapleData dat : root.getChildByPath("SNId").getChildren()) {
            int packageId = Integer.parseInt(dat.getName());
            boolean block = MapleDataTool.getIntConvert("Block", dat, 0) > 0;
            if (blockCashSnId.containsKey(packageId)) {
                System.out.println("发现重复禁止SN信息: " + packageId);
                continue;
            }
            blockCashSnId.put(packageId, block);
        }
        System.out.println("共加载 " + blockCashSnId.size() + " 个商城禁止购买的道具SN信息...");
    }

    public boolean isOnSalePackage(int snId) {
        return snId >= 170200002 && snId <= 170200013;
    }

    public void loadRandomItemInfo() {
        openBox.clear();
        List<Integer> boxItems = new LinkedList<>();
        boxItems.add(50400438);
        boxItems.add(50400439);
        boxItems.add(50400440);
        boxItems.add(50400441);
        boxItems.add(50400442);
        boxItems.add(50400443);
        boxItems.add(50400444);
        boxItems.add(50400445);
        openBox.put(5533027, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000485);
        boxItems.add(20000486);
        boxItems.add(20000487);
        boxItems.add(20000488);
        boxItems.add(20000489);
        boxItems.add(20000490);
        boxItems.add(20000491);
        openBox.put(5533003, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000687);
        boxItems.add(20000688);
        boxItems.add(20000689);
        boxItems.add(20000690);
        boxItems.add(20000691);
        openBox.put(5533011, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(50500061);
        boxItems.add(50100026);
        boxItems.add(50100027);
        boxItems.add(50100028);
        boxItems.add(50500046);
        openBox.put(5533019, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20800316);
        boxItems.add(20800317);
        boxItems.add(20800318);
        boxItems.add(20800319);
        boxItems.add(20800320);
        openBox.put(5533004, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(21100152);
        boxItems.add(21100153);
        boxItems.add(21100154);
        boxItems.add(21100155);
        openBox.put(5533012, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000849);
        boxItems.add(20000850);
        boxItems.add(20000851);
        boxItems.add(20000852);
        boxItems.add(20000853);
        boxItems.add(20000854);
        boxItems.add(20400302);
        boxItems.add(20400303);
        boxItems.add(20400304);
        openBox.put(5533013, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000547);
        boxItems.add(20000533);
        boxItems.add(20000391);
        boxItems.add(20000550);
        boxItems.add(20000476);
        openBox.put(5533006, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000462);
        boxItems.add(20000463);
        boxItems.add(20000464);
        boxItems.add(20000465);
        boxItems.add(20000466);
        boxItems.add(20000467);
        boxItems.add(20000468);
        boxItems.add(20000469);
        openBox.put(5533014, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(140200224);
        boxItems.add(140200218);
        boxItems.add(140200225);
        boxItems.add(140200226);
        boxItems.add(140200227);
        boxItems.add(140200228);
        openBox.put(5533007, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000625);
        boxItems.add(20000626);
        boxItems.add(20000627);
        boxItems.add(20000628);
        boxItems.add(20000629);
        openBox.put(5533023, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000621);
        boxItems.add(20000622);
        boxItems.add(20000623);
        boxItems.add(20000624);
        openBox.put(5533024, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000740);
        boxItems.add(20000741);
        boxItems.add(20000742);
        boxItems.add(20000743);
        boxItems.add(20000744);
        boxItems.add(20000745);
        boxItems.add(20000746);
        boxItems.add(20000747);
        openBox.put(5533000, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(140800248);
        boxItems.add(140800249);
        boxItems.add(140800250);
        boxItems.add(140800251);
        boxItems.add(140800252);
        openBox.put(5533032, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(21100149);
        boxItems.add(21100150);
        boxItems.add(21100151);
        openBox.put(5533008, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20800259);
        boxItems.add(20800260);
        boxItems.add(20800263);
        boxItems.add(20800264);
        boxItems.add(20800265);
        boxItems.add(20800267);
        openBox.put(5533001, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(130000498);
        boxItems.add(130000499);
        boxItems.add(130000391);
        boxItems.add(130000500);
        boxItems.add(130000390);
        openBox.put(5533025, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(140100764);
        boxItems.add(140100765);
        boxItems.add(140100766);
        boxItems.add(140100767);
        boxItems.add(140100768);
        boxItems.add(140100769);
        boxItems.add(140100770);
        boxItems.add(140100771);
        boxItems.add(140100772);
        boxItems.add(140100773);
        boxItems.add(140100774);
        boxItems.add(140100775);
        boxItems.add(140100776);
        boxItems.add(140100777);
        openBox.put(5533033, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20000543);
        boxItems.add(20000544);
        boxItems.add(20000545);
        boxItems.add(20000546);
        boxItems.add(20000547);
        openBox.put(5533009, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(10002766);
        boxItems.add(10002767);
        boxItems.add(10002768);
        boxItems.add(10002769);
        openBox.put(5533017, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(140100547);
        boxItems.add(140100548);
        boxItems.add(140100549);
        boxItems.add(140100550);
        boxItems.add(140100551);
        boxItems.add(140100552);
        openBox.put(5533026, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(20800297);
        boxItems.add(20800298);
        boxItems.add(20800299);
        boxItems.add(20800300);
        boxItems.add(20800301);
        openBox.put(5533002, boxItems);

        boxItems = new LinkedList<>();
        boxItems.add(50500061);
        boxItems.add(50100026);
        boxItems.add(50100027);
        boxItems.add(50100028);
        boxItems.add(50500046);
        openBox.put(5533018, boxItems);

        System.out.println("共加载 " + openBox.size() + " 个商城随机箱子的信息...");
    }

    public Map<Integer, Boolean> getBlockedCashItem() {
        return blockCashItemId;
    }

    public boolean isBlockedCashItemId(int itemId) {
        if (blockCashItemId.containsKey(itemId)) {
            return blockCashItemId.get(itemId);
        }
        return false;
    }

    public Map<Integer, Boolean> getBlockCashSn() {
        return blockCashSnId;
    }

    public boolean isBlockCashSnId(int itemId) {
        if (blockCashSnId.containsKey(itemId)) {
            return blockCashSnId.get(itemId);
        }
        return false;
    }

    public CashItemInfo getSimpleItem(int sn) {
        return itemStats.get(sn);
    }

    public boolean isBlockRefundableItemId(int itemId) {
        return blockRefundableItemId.contains(itemId);
    }

    public CashModInfo getModInfo(int sn) {
        return itemMods.get(sn);
    }

    public CashItemInfo getItem(int sn) {
        return getItem(sn, true);
    }

    public CashItemInfo getItem(int sn, boolean checkSale) {
        CashItemInfo stats = itemStats.get(sn);
        CashModInfo z = getModInfo(sn);
        //System.out.println("商城 => 购买 - SN: " + sn + " 是否为空: " + (stats == null) + " 是否出售: " + (stats != null && stats.onSale()) + " 是否检测: " + checkSale);
        if (z != null && z.showUp) {
            return z.toCItem(stats);
        }
        if (stats == null) {
            return null;
        }
        return checkSale && !stats.onSale() ? null : stats;
    }

    public CashItemForSql getMenuItem(int sn) {
        for (CashItemForSql ci : getMenuItems()) {
            if (ci.getSN() == sn) {
                return ci;
            }
        }
        return null;
    }

    public CashItemForSql getAllItem(int sn) {
        for (CashItemForSql ci : getAllItems()) {
            if (ci.getSN() == sn) {
                return ci;
            }
        }
        return null;
    }

    public List<Integer> getPackageItems(int itemId) {
        return itemPackage.get(itemId);
    }

    /*
     * 随机箱子道具
     */
    public Map<Integer, List<Integer>> getRandomItemInfo() {
        return openBox;
    }

    public boolean hasRandomItem(int itemId) {
        return openBox.containsKey(itemId);
    }

    public List<Integer> getRandomItem(int itemId) {
        return openBox.get(itemId);
    }

    public int[] getBestItems() {
        return bestItems;
    }

    public int getLinkItemId(int itemId) {
        switch (itemId) {
            case 5000029: //宝贝龙
            case 5000030: //绿龙
            case 5000032: //蓝龙
            case 5000033: //黑龙
            case 5000035: //红龙
                return 5000028; //进化龙
            case 5000048: //娃娃机器人
            case 5000049: //机器人(蓝色)
            case 5000050: //机器人(红色)
            case 5000051: //机器人(绿色)
            case 5000052: //机器人(金色)
                return 5000047; //罗伯
        }
        return itemId;
    }

    public int getSnFromId(int itemId) {
        if (idLookup.containsKey(itemId)) {
            return idLookup.get(itemId);
        }
        return 0;
    }

    public List<CashItemCategory> getCategories() {
        return categories;
    }

    public List<CashItemForSql> getMenuItems(int type) {
        List<CashItemForSql> items = new LinkedList();
        for (CashItemForSql ci : menuItems.values()) {
            if (ci.getSubCategory() / 10000 == type) {
                items.add(ci);
            }
        }
        return items;
    }

    public List<CashItemForSql> getMenuItems() {
        List<CashItemForSql> items = new LinkedList();
        for (CashItemForSql ci : menuItems.values()) {
            items.add(ci);
        }
        return items;
    }

    public List<CashItemForSql> getAllItems(int type) {
        List<CashItemForSql> items = new LinkedList();
        for (CashItemForSql ci : categoryItems.values()) {
            if (ci.getSubCategory() / 10000 == type) {
                items.add(ci);
            }
        }
        return items;
    }

    public List<CashItemForSql> getAllItems() {
        List<CashItemForSql> items = new LinkedList();
        for (CashItemForSql ci : categoryItems.values()) {
            items.add(ci);
        }
        return items;
    }

    public List<CashItemForSql> getCategoryItems(int subcategory) {
        List<CashItemForSql> items = new LinkedList();
        for (CashItemForSql ci : categoryItems.values()) {
            if (ci.getSubCategory() == subcategory) {
                items.add(ci);
            }
        }
        return items;
    }
}
