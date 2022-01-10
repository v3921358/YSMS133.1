package tools.packet;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePotionPot;
import constants.GameConstants;
import constants.ItemConstants;
import constants.ServerConstants;
import handling.CashShopOpcode;
import handling.SendPacketOpcode;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import server.cashshop.CashItemFactory;
import server.cashshop.CashShop;
import server.MTSStorage.MTSItemInfo;
import tools.HexTool;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

public class MTSCSPacket {

    public static byte[] warpchartoCS(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_CHAR.getValue());
        PacketHelper.addCharacterInfo(mplew, c.getPlayer());

        return mplew.getPacket();
    }

    public static byte[] warpCS(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPEN.getValue());
        //MapleCharacter chr = c.getPlayer();
        //mplew.writeMapleAsciiString(chr.getClient().getAccountName());
        mplew.write(HexTool.getByteArrayFromHexString(c.getChannelServer().getShopPack()));

        return mplew.getPacket();
    }

    public static byte[] playCashSong(int itemid, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CASH_SONG.getValue());
        mplew.writeInt(itemid);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 添加玩家使用音乐盒效果
     */
    public static byte[] addCharBox(MapleCharacter c, int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /*
     * 取消玩家使用音乐盒效果
     */
    public static byte[] removeCharBox(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] useCharm(byte charmsleft, byte daysleft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x0A);
        mplew.write(1);
        mplew.write(charmsleft);
        mplew.write(daysleft);

        return mplew.getPacket();
    }

    public static byte[] useWheel(byte charmsleft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SPECIAL_EFFECT.getValue());
        mplew.write(0x18);
        mplew.writeLong(charmsleft);

        return mplew.getPacket();
    }

    public static byte[] useAlienSocket(boolean start) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALIEN_SOCKET_CREATOR.getValue());
        mplew.write(start ? 0 : 2);

        return mplew.getPacket();
    }

    /*
     * 金锤子效果
     */
    public static byte[] sendHammerData(boolean start, int hammered) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.VICIOUS_HAMMER.getValue());
        mplew.write(start ? 0xAE : 0xB0);
        mplew.writeInt(0);
        if (start) {
            mplew.writeInt(hammered);
        }
        return mplew.getPacket();
    }

    public static byte[] changePetFlag(int uniqueId, boolean added, int flagAdded) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PET_FLAG_CHANGE.getValue());

        mplew.writeLong(uniqueId);
        mplew.write(added ? 1 : 0);
        mplew.writeShort(flagAdded);

        return mplew.getPacket();
    }

    public static byte[] changePetName(MapleCharacter chr, String newname, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PET_NAMECHANGE.getValue());

        mplew.writeInt(chr.getId());
        mplew.write(0); //notsure
        mplew.writeMapleAsciiString(newname);
        mplew.writeInt(slot);

        return mplew.getPacket();
    }

    public static byte[] showNotes(ResultSet notes, int count) throws SQLException {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * Recv SHOW_NOTES [002E] (40) 2E 00 03 01 77 47 0A 00 0B 00 4D 61 70 6C
         * 65 D8 BC D0 A1 B1 EA 08 00 D0 BB D0 BB B4 F3 BA C5 F0 E8 23 E3 B5 F0
         * CC 01 01 ....wG....Maple丶小标..谢谢大号痂#愕鹛..
         */
        mplew.writeShort(SendPacketOpcode.SHOW_NOTES.getValue());
        mplew.write(0x03);
        mplew.write(count);
        for (int i = 0; i < count; i++) {
            mplew.writeInt(notes.getInt("id"));
            mplew.writeMapleAsciiString(notes.getString("from"));
            mplew.writeMapleAsciiString(notes.getString("message"));
            mplew.writeLong(PacketHelper.getKoreanTimestamp(notes.getLong("timestamp")));
            mplew.write(notes.getInt("gift"));
            notes.next();
        }

        return mplew.getPacket();
    }

    /*
     * 小黑板
     */
    public static byte[] useChalkboard(int charid, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CHALKBOARD.getValue());

        mplew.writeInt(charid);
        if (msg == null || msg.length() <= 0) {
            mplew.write(0);
        } else {
            mplew.write(1);
            mplew.writeMapleAsciiString(msg);
        }

        return mplew.getPacket();
    }

    /*
     * 使用瞬移之石
     */
    public static byte[] getTrockRefresh(MapleCharacter chr, byte vip, boolean delete) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * 高级瞬移之石
         * 2F 00
         * 03 - 添加
         * 02
         * C0 A7 23 06
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * FF C9 9A 3B
         * /...困#.??????????????????
         */
        mplew.writeShort(SendPacketOpcode.TROCK_LOCATIONS.getValue());
        mplew.write(delete ? 2 : 3);
        mplew.write(vip);
        if (vip == 0x01) {
            int[] map = chr.getRegRocks();
            for (int i = 0; i < 5; i++) {
                mplew.writeInt(map[i]);
            }
        } else if (vip == 0x02) {
            int[] map = chr.getRocks();
            for (int i = 0; i < 10; i++) {
                mplew.writeInt(map[i]);
            }
        } else if (vip == 0x03) {
            int[] map = chr.getHyperRocks();
            for (int i = 0; i < 13; i++) {
                mplew.writeInt(map[i]);
            }
        }
        return mplew.getPacket();
    }

    /*
     * 使用时空或者超时空卷错误提示
     */
    public static byte[] getTrockMessage(byte op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.TROCK_LOCATIONS.getValue());
        /*
         * 0x05 因未知原因无法移动 0x0B 因某种原因，不能去那里
         */
        mplew.writeShort(op);

        return mplew.getPacket();
    }

    /*
     * 测试封包
     */
    public static byte[] 测试封包(String test) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.write(HexTool.getByteArrayFromHexString(test));

        return mplew.getPacket();
    }

    /*
     * 加载完商城道具就是这个包
     */
    public static byte[] enableCSUse(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_USE.getValue());
        /*
         * 0x10 显示Vip服务界面
         */
        mplew.write(type);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 商城购买药剂罐更新药剂罐信息
     */
    public static byte[] updataPotionPot(MaplePotionPot potionPot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_POTION_POT_UPDATE.getValue());
        PacketHelper.addPotionPotInfo(mplew, potionPot);

        return mplew.getPacket();
    }

    /*
     * 显示点卷和抵用卷
     */
    public static byte[] updateCouponsInfo(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_UPDATE.getValue());
        mplew.writeInt(chr.getCSPoints(1)); // 点券
        mplew.writeInt(chr.getCSPoints(2)); // 抵用券
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 刷新角色在商城中的金币信息
     */
    public static byte[] updataMeso(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_UPDATE_MESO.getValue());
        mplew.writeLong(MapleStat.金币.getValue());
        mplew.writeLong(chr.getMeso());

        return mplew.getPacket();
    }

    /*
     * 显示商城道具栏物品
     * getCSInventory
     */
    public static byte[] 商城道具栏信息(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.加载道具栏.getValue());
        mplew.write(0); //V.109 新增
        CashShop mci = c.getPlayer().getCashInventory();
        int size = 0;
        mplew.writeShort(mci.getItemsSize());
        for (Item itemz : mci.getInventory()) {
            addCashItemInfo(mplew, itemz, c.getAccID(), 0);
            if (ItemConstants.isPet(itemz.getItemId())) {
                size++;
            }
        }
        if (mci.getItemsSize() > 0) {
            mplew.writeInt(size);
            if (mci.getInventory().size() > 0) {
                for (Item itemz : mci.getInventory()) {
                    if (ItemConstants.isPet(itemz.getItemId())) { //好像现在只有宠物才写这个封包
                        PacketHelper.addItemInfo(mplew, itemz);
                    }
                }
            }
        }
        mplew.writeShort(c.getPlayer().getStorage().getSlots()); // 仓库数量
        mplew.writeShort(c.getAccCharSlots()); // 可以创建的角色数量
        mplew.writeShort(0);
        mplew.writeShort(c.loadCharactersSize(c.getWorld())); // 已创建的角色数量

        return mplew.getPacket();
    }

    /*
     * 显示商城的礼物
     * getCSGifts
     */
    public static byte[] 商城礼物信息(MapleClient c, List<Pair<Item, String>> gifts) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.加载礼物.getValue());
        mplew.writeShort(gifts.size());
        for (Pair<Item, String> gift : gifts) {
            mplew.writeLong(gift.getLeft().getUniqueId());
            mplew.writeInt(gift.getLeft().getItemId());
            mplew.writeAsciiString(gift.getLeft().getGiftFrom(), 13);
            mplew.writeAsciiString(gift.getRight(), 73);
        }

        return mplew.getPacket();
    }

    /*
     * 商城购物车
     * sendWishList
     */
    public static byte[] 商城购物车(MapleCharacter chr, boolean update) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(update ? CashShopOpcode.更新购物车.getValue() : CashShopOpcode.加载购物车.getValue());
        int[] list = chr.getWishlist();
        for (int i = 0; i < 12; i++) {
            mplew.writeInt(list[i] != -1 ? list[i] : 0);
        }
        return mplew.getPacket();
    }

    /*
     * 购买商城物品
     * showBoughtCSItem
     */
    public static byte[] 购买商城道具(Item item, int sn, int accid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.购买道具.getValue());
        addCashItemInfo(mplew, item, accid, sn);
        mplew.writeZeroBytes(9); //V.114修改 以前为4

        return mplew.getPacket();
    }

    /*
     * 商城送礼物
     */
    public static byte[] 商城送礼(int itemid, int quantity, String receiver) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.商城送礼.getValue());
        mplew.writeMapleAsciiString(receiver);
        mplew.writeInt(itemid);
        mplew.writeShort(quantity);

        return mplew.getPacket();

    }

    public static byte[] 扩充道具栏(int inv, int slots) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.扩充道具栏.getValue());
        mplew.write(inv);
        mplew.writeShort(slots);
        mplew.writeInt(0); //V.114新增 未知

        return mplew.getPacket();
    }

    public static byte[] 扩充仓库(int slots) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.扩充仓库.getValue());
        mplew.writeShort(slots);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] 购买角色卡(int slots) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.购买角色卡.getValue());
        mplew.writeShort(slots);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] 扩充项链(int days) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.扩充项链.getValue());
        mplew.writeShort(0x00);
        mplew.writeShort(days);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 商城-->背包
     */
    public static byte[] moveItemToInvFormCs(Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.商城到背包.getValue());
        mplew.write(item.getQuantity());
        mplew.writeShort(item.getPosition());
        PacketHelper.addItemInfo(mplew, item);
        mplew.writeZeroBytes(5);

        return mplew.getPacket();
    }

    /*
     * 背包-->商城
     */
    public static byte[] moveItemToCsFromInv(Item item, int accId, int sn) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.背包到商城.getValue());
        addCashItemInfo(mplew, item, accId, sn);

        return mplew.getPacket();
    }

    /*
     * 商城删除道具
     */
    public static byte[] 商城删除道具(int uniqueid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.删除道具.getValue());
        mplew.writeLong(uniqueid);

        return mplew.getPacket();
    }

    /*
     * 商城道具到期
     */
    public static byte[] cashItemExpired(int uniqueid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.道具到期.getValue());
        mplew.writeLong(uniqueid);

        return mplew.getPacket();
    }

    /*
     * 商城换购道具
     */
    public static byte[] 商城换购道具(int uniqueId, int Money) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.换购道具.getValue());
        mplew.writeLong(uniqueId);
        mplew.writeLong(Money);

        return mplew.getPacket();
    }

    /*
     * 商城购买礼包
     */
    public static byte[] 商城购买礼包(Map<Integer, Item> packageItems, int accId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.购买礼包.getValue());
        mplew.write(packageItems.size());
        int size = 0;
        for (Entry<Integer, Item> sn : packageItems.entrySet()) {
            addCashItemInfo(mplew, sn.getValue(), accId, sn.getKey().intValue());
            if (ItemConstants.isPet(sn.getValue().getItemId()) || ItemConstants.getInventoryType(sn.getValue().getItemId()) == MapleInventoryType.EQUIP) {
                size++;
            }
        }
        mplew.writeInt(size);
        if (packageItems.size() > 0) {
            for (Item itemz : packageItems.values()) {
                if (ItemConstants.isPet(itemz.getItemId()) || ItemConstants.getInventoryType(itemz.getItemId()) == MapleInventoryType.EQUIP) {
                    PacketHelper.addItemInfo(mplew, itemz);
                }
            }
        }
        mplew.writeZeroBytes(3);

        return mplew.getPacket();
    }

    /*
     * 商城赠送礼包
     */
    public static byte[] 商城送礼包(int itemId, int quantity, String receiver) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.商城送礼包.getValue());
        mplew.writeMapleAsciiString(receiver);
        mplew.writeInt(itemId);
        mplew.writeInt(quantity);

        return mplew.getPacket();
    }

    /*
     * 商城购买任务物品
     */
    public static byte[] 商城购买任务道具(int price, short quantity, byte position, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.购买任务道具.getValue());
        mplew.writeInt(price);
        mplew.writeShort(quantity);
        mplew.writeShort(position);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static void addCashItemInfo(MaplePacketLittleEndianWriter mplew, Item item, int accId, int sn) {
        CashItemFactory cashinfo = CashItemFactory.getInstance();
        mplew.writeLong(item.getUniqueId() > 0 ? item.getUniqueId() : 0);
        mplew.writeLong(accId);
        mplew.writeInt(item.getItemId());
        mplew.writeInt(sn > 0 ? sn : cashinfo.getSnFromId(cashinfo.getLinkItemId(item.getItemId())));
        mplew.writeShort(item.getQuantity());
        mplew.writeAsciiString(item.getGiftFrom(), 13);
        PacketHelper.addExpirationTime(mplew, item.getExpiration()); //00 80 05 BB 46 E6 17 02 
        mplew.writeLong(item.getExpiration() == -1 ? 30 : 0);
        mplew.writeZeroBytes(22); //V.113修改以前为 30
        PacketHelper.addExpirationTime(mplew, -2); //00 40 E0 FD 3B 37 4F 01 
        mplew.writeZeroBytes(16); //V.101新增
    }

    /*
     * 00 = 因发生未知错误。不能进入到冒险岛商城。
     * 01 = 超出工作时间。请稍后在试。
     * 02 = 因发生未知错误。不能进入到冒险岛商城。
     * 03 = 点卷余额不足
     * 04 = 未满14岁的用户不能赠送现金道具。
     * 05 = 超出了可以送礼物的限界额
     * 06 = 无法向本人的账号赠送礼物。请用该角色登陆，然后购买。
     * 07 = 请确认角色名是否错误。
     * 08 = 此道具对性别有限制。请确认接收人的性别。
     * 09 = 接收礼物的人的保管箱已满，无法发送礼物。
     * 0A = 请确认是否超过可以保有的现金道具数量。
     * 0B = 请确认角色名字是否正确或者性别有限制。
     * 0C = 因发生未知错误。不能进入到冒险岛商城。
     * 0D = 因发生未知错误。不能进入到冒险岛商城。
     * 0E = 请再确认领奖卡号码是否正确。
     * 0F = 已经过期的领奖号
     * 10 = 已经使用过的领奖号
     * 11 = 未知是乱码显示
     * 12 = 未知是乱码显示
     * 13 = 未知是乱码显示
     * 14 = 这是NexonCashCoupon号码！请上Nexon.com(www.nexon.com)的MyPage>NexonCash>Menu中登录Copon号码。
     * 15 = 你的性别不适合这种领奖卡
     * 16 = 这种领奖卡是专用道具。所有你不能赠送给别人。
     * 17 = 此卷是冒险岛专用抵用卷无法送给他人。
     * 18 = 请确认是不是你的背包空间不够。
     * 19 = 这种道具只能在优秀网吧会员买的到。
     * 1A = 恋人道具只能赠送给相同频道的不同性别的角色。请确认是否你要送礼物的角色在同一频道或者性别不同。
     * 1B = 请你正确输入要送礼物的角色名。
     * 1C = 无 直接掉线38
     * 1D = 无 直接掉线38
     * 1E = 超过了点卷购买限制额。
     * 1F = 金币不足
     * 20 = 请确认身份证号后再试。
     * 21 = 此会员卡只限于新购买现金道具用户使用。
     * 22 = 已经报名
     * 23 = 因发生未知错误。不能进入到冒险岛商城。
     * 24 = 因发生未知错误。不能进入到冒险岛商城。
     * 25 = 因发生未知错误。不能进入到冒险岛商城。
     * 26 = 因发生未知错误。不能进入到冒险岛商城。
     * 27 = 因发生未知错误。不能进入到冒险岛商城。
     * 28 = 因发生未知错误。不能进入到冒险岛商城。
     * 29 = 超过了该道具的每日购买限额，无法购买。
     * 2A = 因发生未知错误。不能进入到冒险岛商城。
     * 2B = 因发生未知错误。不能进入到冒险岛商城。
     * 2C = 已超过每个盛大账号可以使用该优惠卷的限制次数。详细内容请参考优惠卷说明。
     * 2D = 因发生未知错误。不能进入到冒险岛商城。
     * 2E = 未满7岁的人无法购买该物品
     * 2F = 未满7对的人无法接受该礼物
     * 30 = 超过了该道具每日购买限额，无法购买。
     * 31 = 设置为不能使用点卷。请到盛大主页我的信息中的点卷安全设置菜单中更改设置。
     * 32 = 因发生未知错误。不能进入到冒险岛商城。
     * 33 = 因发生未知错误。不能进入到冒险岛商城。
     * 34 = 因发生未知错误。不能进入到冒险岛商城。
     * 35 = 该道具目前不在出售
     * 36 = 目前无法取消订单
     * 37 = 购买后超过7天的道具无法取消订单。
     * 38 = 无法取消订单的道具
     * 39 = 礼包中的部分道具已领取，无法取消订单。
     * 3A = 超过该道具的购买限度，无法购买。
     * 3B = 该道具只有[30]级以上角色才可以购买.
     * 3C = 该道具只有[70]级以上角色才可以购买.
     * 3D = 该道具只有[50]级以上角色才可以购买.
     * 3E = 该道具只有[100]级以上角色才可以购买.
     * 3F = 无法购买或赠送更多每日特价物品。
     * 40 = 该道具无法用抵用卷购买。
     * 41 = 该道具无法用抵用卷购买。
     * 42 = 因发生未知错误。不能进入到冒险岛商城。
     * 43 = 因发生未知错误。不能进入到冒险岛商城。
     * 44 = 该道具无法用抵用卷购买。
     * 45 = 70级以上无法购买
     * 46 = 因发生未知错误。不能进入到冒险岛商城。
     * 47 = 因发生未知错误。不能进入到冒险岛商城。
     * 48 = 因发生未知错误。不能进入到冒险岛商城。
     * 49 = 因发生未知错误。不能进入到冒险岛商城。
     * 4A = 因发生未知错误。不能进入到冒险岛商城。
     * 4B = 因发生未知错误。不能进入到冒险岛商城。
     * 4C = 因发生未知错误。不能进入到冒险岛商城。
     */
    public static byte[] 商城错误提示(int err) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.错误提示.getValue()); //V.111 0x70
        mplew.write(err);

        return mplew.getPacket();
    }

    /*
     * 商城领奖卡提示
     */
    public static byte[] showCouponRedeemedItem(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.writeShort(CashShopOpcode.领奖卡提示.getValue());
        mplew.writeInt(0);
        mplew.writeInt(1);
        mplew.writeShort(1);
        mplew.writeShort(0x1A);
        mplew.writeInt(itemid);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 商城领奖卡提示
     */
    public static byte[] showCouponRedeemedItem(Map<Integer, Item> items, int mesos, int maplePoints, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.领奖卡提示.getValue()); //use to be 4c
        mplew.write(items.size());
        for (Entry<Integer, Item> item : items.entrySet()) {
            addCashItemInfo(mplew, item.getValue(), c.getAccID(), item.getKey().intValue());
        }
        mplew.writeInt(maplePoints);
        mplew.writeInt(0); // Normal items size
        mplew.writeInt(mesos);

        return mplew.getPacket();
    }

    /*
     * 不发这个好像买不了商城道具
     */
    public static byte[] redeemResponse() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        /*
         * T075 0xB9
         * V111 0xBC
         */
        mplew.write(CashShopOpcode.注册商城.getValue());
        mplew.writeInt(0);
        mplew.writeInt(1);

        return mplew.getPacket();
    }

    /*
     * 商城中打开箱子
     */
    public static byte[] 商城打开箱子(Item item, Long uniqueId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(CashShopOpcode.打开箱子.getValue());
        mplew.writeLong(uniqueId);
        mplew.writeInt(0);
        PacketHelper.addItemInfo(mplew, item);
        mplew.writeInt(item.getPosition()); //道具在背包中的位置
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /*
     * 购买道具后返回在购买多少就可以获得礼物
     */
    public static byte[] 商城提示(int 消费, int 达到, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_MSG.getValue());
        /*
         * V.102 0xBF
         * V.103 0xC3
         */
        mplew.write(CashShopOpcode.商城提示.getValue());
        mplew.writeInt(消费); //当前购买道具消费的点卷
        mplew.writeInt(达到); //当达到多少点卷就有礼物送的提示
        mplew.write(mode); //这个是达到3000是模式是 0  后面的以前是0+i

        return mplew.getPacket();
    }

    public static int getTime() {
        String time = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).replace("-", "");
        return Integer.valueOf(time);
    }

    public static byte[] showXmasSurprise(int idFirst, Item item, int accid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.XMAS_SURPRISE.getValue());
        mplew.write(0xE6);
        mplew.writeLong(idFirst); //uniqueid of the xmas surprise itself
        mplew.writeInt(0);
        addCashItemInfo(mplew, item, accid, 0); //info of the new item, but packet shows 0 for sn?
        mplew.writeInt(item.getItemId());
        mplew.write(1);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] getBoosterFamiliar(int cid, int familiar, int id) { //item IDs
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOOSTER_FAMILIAR.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(familiar);
        mplew.writeLong(id);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] getBoosterPack(int f1, int f2, int f3) { //item IDs
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOOSTER_PACK.getValue());
        mplew.write(0xD7);
        mplew.writeInt(f1);
        mplew.writeInt(f2);
        mplew.writeInt(f3);

        return mplew.getPacket();
    }

    public static byte[] getBoosterPackClick() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOOSTER_PACK.getValue());
        mplew.write(0xD5);

        return mplew.getPacket();
    }

    public static byte[] getBoosterPackReveal() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOOSTER_PACK.getValue());
        mplew.write(0xD6);

        return mplew.getPacket();
    }

    /*
     * 使用金币包失败
     */
    public static byte[] sendMesobagFailed() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MESOBAG_FAILURE.getValue());
        return mplew.getPacket();
    }

    /*
     * 使用金币包成功
     */
    public static byte[] sendMesobagSuccess(int mesos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MESOBAG_SUCCESS.getValue());
        mplew.writeInt(mesos);
        return mplew.getPacket();
    }

    //======================================MTS===========================================
    public static byte[] startMTS(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPEN.getValue());

        PacketHelper.addCharacterInfo(mplew, chr);
        mplew.writeMapleAsciiString(chr.getClient().getAccountName());
        mplew.writeInt(ServerConstants.MTS_MESO); //2500 [C4 09 00 00]
        mplew.writeInt(ServerConstants.MTS_TAX); //5 [05 00 00 00]
        mplew.writeInt(ServerConstants.MTS_BASE); //150 [96 00 00 00]
        mplew.writeInt(24); //[18 00 00 00]
        mplew.writeInt(168); //[A8 00 00 00]
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    public static byte[] sendMTS(List<MTSItemInfo> items, int tab, int type, int page, int pages) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        /*
         * T065 0x14
         */
        mplew.write(0x15); //operation
        mplew.writeInt(pages); //total items
        mplew.writeInt(items.size()); //number of items on this page
        mplew.writeInt(tab);
        mplew.writeInt(type);
        mplew.writeInt(page);
        mplew.write(1);
        mplew.write(1);

        for (MTSItemInfo item : items) {
            addMTSItemInfo(mplew, item);
        }
        mplew.write(0); //0 or 1?

        return mplew.getPacket();
    }

    /*
     * 在拍卖中显示角色抵用卷
     */
    public static byte[] showMTSCash(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GET_MTS_TOKENS.getValue());
        mplew.writeInt(chr.getCSPoints(2));

        return mplew.getPacket();
    }

    public static byte[] getMTSWantedListingOver(int nx, int items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x3D);
        mplew.writeInt(nx);
        mplew.writeInt(items);

        return mplew.getPacket();
    }

    public static byte[] getMTSConfirmSell() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x1D);

        return mplew.getPacket();
    }

    public static byte[] getMTSFailSell() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x1E);
        mplew.write(0x42);

        return mplew.getPacket();
    }

    public static byte[] getMTSConfirmBuy() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x33);

        return mplew.getPacket();
    }

    public static byte[] getMTSFailBuy() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x34);
        mplew.write(0x42);

        return mplew.getPacket();
    }

    public static byte[] getMTSConfirmCancel() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x25);

        return mplew.getPacket();
    }

    public static byte[] getMTSFailCancel() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x26);
        mplew.write(0x42);

        return mplew.getPacket();
    }

    public static byte[] getMTSConfirmTransfer(int quantity, int pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x27);
        mplew.writeInt(quantity);
        mplew.writeInt(pos);

        return mplew.getPacket();
    }

    private static void addMTSItemInfo(MaplePacketLittleEndianWriter mplew, MTSItemInfo item) {
        PacketHelper.addItemInfo(mplew, item.getItem());
        mplew.writeInt(item.getId()); //id
        mplew.writeInt(item.getTaxes()); //this + below = price
        mplew.writeInt(item.getPrice()); //price
        mplew.writeZeroBytes(GameConstants.GMS ? 4 : 8);
        mplew.writeLong(PacketHelper.getTime(item.getEndingDate()));
        mplew.writeMapleAsciiString(item.getSeller()); //account name (what was nexon thinking?)
        mplew.writeMapleAsciiString(item.getSeller()); //char name
        mplew.writeZeroBytes(28);
    }

    public static byte[] getNotYetSoldInv(List<MTSItemInfo> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x23);

        mplew.writeInt(items.size());

        for (MTSItemInfo item : items) {
            addMTSItemInfo(mplew, item);
        }

        return mplew.getPacket();
    }

    public static byte[] getTransferInventory(List<Item> items, boolean changed) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x21);

        mplew.writeInt(items.size());
        int i = 0;
        for (Item item : items) {
            PacketHelper.addItemInfo(mplew, item);
            mplew.writeInt(Integer.MAX_VALUE - i); //fake ID
            mplew.writeZeroBytes(GameConstants.GMS ? 52 : 56); //really just addMTSItemInfo
            i++;
        }
        mplew.writeInt(-47 + i - 1);
        mplew.write(changed ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] addToCartMessage(boolean fail, boolean remove) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        if (remove) {
            if (fail) {
                mplew.write(0x2C);
                mplew.writeInt(-1);
            } else {
                mplew.write(0x2B); //T065 0x28
            }
        } else {
            if (fail) {
                mplew.write(0x2A);
                mplew.writeInt(-1);
            } else {
                mplew.write(0x29); //T065 0x26
            }
        }

        return mplew.getPacket();
    }
}
