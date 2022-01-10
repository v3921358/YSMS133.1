/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import constants.ServerConstants;
import handling.login.LoginServer;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import tools.Triple;
import tools.packet.LoginPacket;

public class ServerlistRequestHandler {

    public static void handlePacket(MapleClient c, boolean packet) {
        //c.getSession().write(LoginPacket.getLoginWelcome());
        List<Triple<String, Integer, Boolean>> backgrounds = new LinkedList<>();
        backgrounds.addAll(Arrays.asList(ServerConstants.backgrounds));
        c.getSession().write(LoginPacket.getServerList(0, LoginServer.getLoad()));
        c.getSession().write(LoginPacket.getEndOfServerList());
        c.getSession().write(LoginPacket.enableRecommended(backgrounds));
        //c.getSession().write(LoginPacket.sendRecommended(0, LoginServer.getEventMessage()));
    }
}
