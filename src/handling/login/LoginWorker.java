package handling.login;

import client.MapleClient;
import client.MapleEnumClass;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.login.handler.ServerlistRequestHandler;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;
import java.util.Map.Entry;

import server.Timer.PingTimer;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.packet.LoginPacket;

public class LoginWorker {

    private static long lastUpdate = 0;

    public static void registerClient(final MapleClient c, boolean useKey) {
        if (LoginServer.isAdminOnly() && !c.isGm() && !c.isLocalhost()) {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "当前服务器设置只能管理员进入游戏.\r\n我们目前在修复几个问题.\r\n请稍后再试."));
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_DEFINITION_INFO));
            return;
        }
        if (LoginServer.hasAccCheck() && !c.hasCheck(c.getAccID()) && !c.isGm()) {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "抱歉，您的登陆器登陆的账号与游戏登陆账号不相同，请点击右下角登陆器图标右键更换账号，或重新使用登陆器登陆账号！\r\n祝您在游戏愉快！\r\n健康游戏，娱乐生活！"));
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_DEFINITION_INFO));
            return;
        }
        if (System.currentTimeMillis() - lastUpdate > 600000) { // Update once every 10 minutes
            lastUpdate = System.currentTimeMillis();
            Map<Integer, Integer> load = ChannelServer.getChannelLoad();
            int usersOn = 0;
            if (load == null || load.size() <= 0) { // In an unfortunate event that client logged in before load
                lastUpdate = 0;
                c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT));
                return;
            }
            double loadFactor = 1200 / ((double) LoginServer.getUserLimit() / load.size());
            for (Entry<Integer, Integer> entry : load.entrySet()) {
                usersOn += entry.getValue();
                load.put(entry.getKey(), Math.min(1200, (int) (entry.getValue() * loadFactor)));
            }
            LoginServer.setLoad(load, usersOn);
            lastUpdate = System.currentTimeMillis();
        }
        if (c.finishLogin() == 0) {
            if (!useKey) {
                c.getSession().write(LoginPacket.getAuthSuccessRequest(c));
            } else {
                c.getSession().write(LoginPacket.getAuthSuccessRequestX(c, false));
            }

            ServerlistRequestHandler.handlePacket(c, false);
            c.setIdleTask(PingTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    c.getSession().close(true);
                }
            }, 10 * 60 * 10000));
        } else {
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT));
            return;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO accounts_log (accid, accname, ip, macs) VALUES (?, ?, ?, ?)");
            ps.setInt(1, c.getAccID());
            ps.setString(2, c.getAccountName());
            ps.setString(3, c.getSession().getRemoteAddress().toString());
            ps.setString(4, c.getMac());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
        }
    }
}
