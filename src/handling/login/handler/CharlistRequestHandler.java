/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleEnumClass;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.World;

import java.util.List;

import tools.data.input.LittleEndianAccessor;
import tools.packet.LoginPacket;

/**
 * @author PlayDK
 */
public class CharlistRequestHandler {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        if (!c.isLoggedIn()) {
            c.getSession().close(true);
            return;
        }
        slea.readByte();
        int server = 0; //V.106修改
        boolean useKey = slea.readByte() == 1;
        String key = useKey ? slea.readMapleAsciiString() : "";
        int channel = useKey ? LoginServer.getLoginAuthKey(key, true).getRight() : slea.readByte() + 1;

        if (!World.isChannelAvailable(channel)) { //TODOO: MULTI WORLDS
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTION_BUSY)); //cannot process so many
            return;
        }

        System.out.println("客户地址: " + c.getSession().getRemoteAddress().toString().split(":")[0] + " 连接到世界服务器: " + server + " 频道: " + channel);

        List<MapleCharacter> chars = c.loadCharacters(server);
        if (chars != null && ChannelServer.getInstance(channel) != null) {
            c.setWorld(server);
            c.setChannel(channel);
            //c.getSession().write(LoginPacket.EventCheck());
            c.getSession().write(LoginPacket.getCharList(c.getSecondPassword(), chars, c.getAccCharSlots()));
            //c.getSession().write(LoginPacket.getChannelSelected());
        } else {
            c.getSession().close(true);
        }
    }
}
