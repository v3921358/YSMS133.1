/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.channel.handler;

import client.MapleClient;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.maps.FieldLimitType;
import tools.MaplePacketCreator;
import tools.data.input.LittleEndianAccessor;
import tools.packet.MTSCSPacket;

/**
 * @author PlayDK
 */
public class UseHammerHandler {

    public static void UseHammer(LittleEndianAccessor slea, MapleClient c) {
        /*
         * Send USE_HAMMER [01A2] (22)
         * A2 01
         * 85 F9 B8 01 - 时间?
         * 02 00 00 00 - 金锤子的位置
         * 70 B0 25 00 - 金锤子的ID
         * 01 00 00 00 - 未知 难道是升级1次?
         * 0E 00 00 00 - 要升级的装备位置
         * ?咘?....p?.........
         */
        slea.readInt();
        int hammerSlot = slea.readInt();
        int hammerItemid = slea.readInt();
        slea.readInt();
        int equipSlot = slea.readInt();
        Item useItem = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) hammerSlot);
        Equip toItem = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) equipSlot);
        //c.getPlayer().dropMessage(5, "金锤子 hammerItemid " + hammerItemid + " useItem " + useItem + " toItem " + toItem);
        if (useItem == null || useItem.getQuantity() <= 0 || useItem.getItemId() != hammerItemid || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (toItem != null) {
            if (ItemConstants.canHammer(toItem.getItemId()) && ii.getSlots(toItem.getItemId()) > 0 && toItem.getViciousHammer() < 2) {
                toItem.setViciousHammer((byte) (toItem.getViciousHammer() + 1));
                toItem.setUpgradeSlots((byte) (toItem.getUpgradeSlots() + 1));
                c.getPlayer().forceUpdateItem(toItem);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) hammerSlot, (short) 1, false, true);
            } else {
                c.getPlayer().dropMessage(5, "该道具无法使用在此物品上。");
            }
        }

        if (!c.getPlayer().isAlive() || c.getPlayer().getEventInstance() != null || FieldLimitType.ChannelSwitch.check(c.getPlayer().getMap().getFieldLimit())) {
            c.getPlayer().dropMessage(1, "刷新人物数据失败.");
            return;
        }
        c.getPlayer().dropMessage(5, "正在刷新人数据.请等待...");
        c.getPlayer().fakeRelog();
        if (c.getPlayer().getScrolledPosition() != 0) {
            c.getSession().write(MaplePacketCreator.pamSongUI());
        }
    }

    public static void HammerResponse(LittleEndianAccessor slea, MapleClient c) {
//        int type = slea.readInt(); //返回是否成功和失败的封包
//        c.getSession().write(MTSCSPacket.sendHammerData(false, 0));
        c.getSession().write(MTSCSPacket.sendHammerData(false, 0));
//        c.getSession().write(MaplePacketCreator.enableActions());
    }
}
