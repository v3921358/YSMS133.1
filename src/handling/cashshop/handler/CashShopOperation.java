package handling.cashshop.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.world.CharacterTransfer;
import handling.world.World;

import java.util.List;

import org.apache.log4j.Logger;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;
import tools.packet.MTSCSPacket;

public class CashShopOperation {

    private static final Logger log = Logger.getLogger(CashShopOperation.class);

    public static void LeaveCS(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        int channel = c.getChannel(); //角色要更换的频道
        ChannelServer toch = ChannelServer.getInstance(channel); //角色从商城出来更换的频道信息
        if (toch == null) {
            FileoutputUtil.log("log\\LeaveCashShop.txt", "玩家: " + chr.getName() + " 从商城离开发生错误.找不到频道[" + channel + "]的信息.", true);
            c.getSession().close(true);
            return;
        }
        //开始处理
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), c.getChannel());
        CashShopServer.getPlayerStorage().deregisterPlayer(chr);
        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, c.getSessionIPAddress());
        c.getSession().write(MaplePacketCreator.getChannelChange(c, Integer.parseInt(toch.getIP().split(":")[1]))); //发送更换频道的封包信息
        chr.fixOnlineTime();
        chr.saveToDB(false, true);
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static void EnterCS(CharacterTransfer transfer, MapleClient c) {
        if (transfer == null) {
            c.getSession().close(true);
            return;
        }
        MapleCharacter chr = MapleCharacter.ReconstructChr(transfer, c, false);

        c.setPlayer(chr);
        c.setAccID(chr.getAccountID());

        if (!c.CheckIPAddress()) { // Remote hack
            c.getSession().close(true);
            log.info("商城检测连接 - 2 " + !c.CheckIPAddress());
            return;
        }

        int state = c.getLoginState();
        boolean allowLogin = false;
        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
            if (!World.isCharacterListConnected(c.loadCharacterNames(c.getWorld()))) {
                allowLogin = true;
            }
        }
        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close(true);
            log.info("商城检测连接 - 3 " + !allowLogin);
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());
        CashShopServer.getPlayerStorage().registerPlayer(chr);
        c.getSession().write(MTSCSPacket.warpchartoCS(c)); //在商城里面显示人物外观
        c.getSession().write(MTSCSPacket.warpCS(c)); //载入商城物品数据
        List<Pair<Item, String>> gifts = chr.getCashInventory().loadGifts();
        c.getSession().write(MTSCSPacket.商城道具栏信息(c)); //显示购买的物品
        //c.getSession().write(MTSCSPacket.测试封包("7D 03 61 00 00"));
        c.getSession().write(MTSCSPacket.商城礼物信息(c, gifts)); //显示礼物
        c.getSession().write(MTSCSPacket.商城购物车(c.getPlayer(), false)); //显示购物车信息
        //c.getSession().write(MTSCSPacket.测试封包("83 03 00 00 00 00 00 00 00 00 00 00 00 00"));
        c.getSession().write(MTSCSPacket.updateCouponsInfo(c.getPlayer())); //刷新点卷和抵用卷 这个地方盛大发了2次
        c.getSession().write(MTSCSPacket.updateCouponsInfo(c.getPlayer())); //刷新点卷和抵用卷 这个地方盛大发了2次
        c.getPlayer().getCashInventory().checkExpire(c); //检查商城里面的道具是否到期
    }

    public static void CSUpdate(MapleClient c) {
        c.getSession().write(MTSCSPacket.updateCouponsInfo(c.getPlayer()));
    }

    public static void doCSPackets(MapleClient c) {
        c.getSession().write(MTSCSPacket.商城道具栏信息(c)); //显示购买的物品
        c.getSession().write(MTSCSPacket.updateCouponsInfo(c.getPlayer())); //刷新点卷和抵用卷
        c.getPlayer().getCashInventory().checkExpire(c);
    }
}
