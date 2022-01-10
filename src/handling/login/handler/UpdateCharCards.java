/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import handling.channel.ChannelServer;

import java.util.LinkedHashMap;
import java.util.Map;

import tools.data.input.LittleEndianAccessor;

/**
 * @author PlayDK
 */
public class UpdateCharCards {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        if (!c.isLoggedIn()) {
            c.getSession().close(true);
            return;
        }
        Map<Integer, Integer> cids = new LinkedHashMap<>();
        for (int i = 1; i <= 9; i++) {
            int charId = slea.readInt();
            if (((!(c.login_Auth(charId))) && (charId != 0)) || (ChannelServer.getInstance(c.getChannel()) == null) || (c.getWorld() != 0)) {
                c.getSession().close(true);
                return;
            }
            cids.put(i, charId);
        }
        c.updateCharacterCards(cids);
    }
}
