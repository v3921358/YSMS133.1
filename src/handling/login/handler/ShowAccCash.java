/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacterUtil;
import client.MapleClient;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;
import tools.packet.LoginPacket;

/**
 * @author PlayDK
 */
public class ShowAccCash {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        int accId = slea.readInt(); //帐号ID
        if (c.getAccID() == accId) {
            if (c.getPlayer() != null) {
                c.getSession().write(MaplePacketCreator.showPlayerCash(c.getPlayer()));
            } else {
                Pair<Integer, Integer> cashInfo = MapleCharacterUtil.getCashByAccId(accId);
                if (cashInfo == null) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                c.getSession().write(LoginPacket.ShowAccCash(cashInfo.getLeft(), cashInfo.getRight()));
            }
        }
    }
}
