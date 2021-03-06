/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import handling.SendPacketOpcode;
import tools.FileoutputUtil;

import static tools.FileoutputUtil.CurrentReadable_Time;

import tools.StringUtil;
import tools.data.input.LittleEndianAccessor;

/**
 * @author PlayDK
 */
public class PacketErrorHandler {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        if (slea.available() >= 6) {
            short mode = slea.readShort();
            slea.skip(4);
            short badPacketSize = slea.readShort(); //封包的大小
            slea.skip(4); // 未知
            int pHeader = slea.readShort(); //错误封包的包头
            String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
            pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
            String op = lookupRecv(pHeader);
            String from = "";
            if (c.getPlayer() != null) {
                from = "时间: " + CurrentReadable_Time() + " 角色: " + c.getPlayer().getName() + " 等级(" + c.getPlayer().getLevel() + ") 职业: " + c.getPlayer().getJob() + " 地图: " + c.getPlayer().getMapId() + " \r\n";
            }
            String Recv = "mode:" + mode + "  处理Recv封包出错: " + op + " [" + pHeaderStr + "] (" + (badPacketSize - 4) + ")\r\n包头: 0x" + pHeaderStr + slea.toString();
            FileoutputUtil.packetLog(FileoutputUtil.封包出错, from + Recv);
        }
    }

    private static String lookupRecv(int val) {
        for (SendPacketOpcode op : SendPacketOpcode.values()) {
            if (op.getValue() == val) {
                return op.name();
            }
        }
        return "UNKNOWN";
    }
}
