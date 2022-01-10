/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import tools.data.input.LittleEndianAccessor;
import tools.packet.LoginPacket;

/**
 * @author PlayDK
 */
public class DeleteCharHandler {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        if (!c.isGm()) {
            return;
        }
        String Secondpw_Client = slea.readMapleAsciiString();
        int charId = slea.readInt();
        if (!c.login_Auth(charId) || !c.isLoggedIn()) {
            c.getSession().close(true);
            return; // Attempting to delete other character
        }
        byte state = 0;
        if (c.getSecondPassword() != null) { // On the server, there's a second password
            if (Secondpw_Client == null) { // Client's hacking
                c.getSession().close(true);
                return;
            } else {
                if (!c.CheckSecondPassword(Secondpw_Client)) { // Wrong Password
                    state = 12;
                }
            }
        }
        if (state == 0) {
            state = (byte) c.deleteCharacter(charId);
        }
        c.getSession().write(LoginPacket.deleteCharResponse(charId, state));
    }
}
