/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import client.MapleEnumClass;
import handling.login.LoginServer;
import handling.login.LoginWorker;

import java.util.Calendar;

import server.AutoRegister;
import tools.DateUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.data.input.LittleEndianAccessor;
import tools.packet.LoginPacket;

/**
 * @author PlayDK
 */
public class LoginPasswordHandler {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c) {
        /*
         * 10 BF 48 7B 10 8B 这个是MAC地址
         * E7 B7 9F 70 00 00 00 00 63 45 00 00 00 00 00 //这个未知
         */
        int[] bytes = new int[6];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = slea.readByteAsInt();
        }
        StringBuilder sps = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sps.append(StringUtil.getLeftPaddedStr(Integer.toHexString(bytes[i]).toUpperCase(), '0', 2));
            sps.append("-");
        }
        String macData = sps.toString();
        macData = macData.substring(0, macData.length() - 1);
        c.setMac(macData);
        slea.skip(15); //V.104 好像把后面的放到前面
        String login = slea.readMapleAsciiString();
        String pwd = slea.readMapleAsciiString();
        boolean isIpBan = c.hasBannedIP();
        boolean isMacBan = c.hasBannedMac();
        boolean isBanned = isIpBan || isMacBan;
        c.setTempInfo(login, pwd, isBanned);

        if (isBanned) {
            c.clearInformation();
            c.getSession().write(MaplePacketCreator.serverNotice(1, "您的账号已被封停！"));
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_DEFINITION_INFO));
            return;
        }
        Login(c);
    }

    public static void Login(MapleClient c) {
        MapleEnumClass.AuthReply loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
        String login = c.getTempInfo().getLeft();
        String pwd = c.getTempInfo().getMid();
        Boolean isBanned = c.getTempInfo().getRight();
        if (LoginServer.isAutoReg() && !AutoRegister.getAccountExists(login)) {
            if (AutoRegister.createAccount(login, pwd, c.getSession().getRemoteAddress().toString())) {
                c.getSession().write(MaplePacketCreator.serverNotice(1, "注册帐号成功.\r\n请重新输入帐号密码进入游戏."));
            } else {
                c.getSession().write(MaplePacketCreator.serverNotice(1, "注册帐号失败."));
            }
            c.clearInformation();
            c.getSession().write(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_DEFINITION_INFO));
            return;
        } else {
            loginok = c.login(login, pwd, isBanned, false);
        }
        Calendar tempbannedTill = c.getTempBanCalendar();
        if (tempbannedTill != null) {
            if (tempbannedTill.getTimeInMillis() > System.currentTimeMillis()) {
                c.clearInformation();
                long tempban = DateUtil.getTempBanTimestamp(tempbannedTill.getTimeInMillis());
                c.getSession().write(LoginPacket.getTempBan(tempban, c.getBanReason()));
                return;
            }
        }
        if (loginok.is(MapleEnumClass.AuthReply.GAME_ACCOUNT_DELETE) && !isBanned) {
            c.clearInformation();
            c.getSession().write(LoginPacket.getTempBan(Integer.MAX_VALUE, c.getBanReason()));
        } else if (loginok.is(MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL) && isBanned && !c.isGm()) {
            c.getSession().write(LoginPacket.getPermBan((byte) 1));
        } else if (!loginok.is(MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL)) {
            c.clearInformation();
            c.getSession().write(LoginPacket.getLoginFailed(loginok));
        } else if (c.getGender() == 10) {
            c.updateLoginState(MapleClient.ENTERING_PIN);
            c.getSession().write(LoginPacket.genderNeeded(c));
        } else {
            c.loginAttempt = 0;
            c.updateMacs();
            LoginWorker.registerClient(c, false);
        }
    }

    public static void handlerAuthKey(LittleEndianAccessor slea, MapleClient c) {
        slea.skip(2);
        String key = slea.readMapleAsciiString();
        Pair<String, Integer> clientinfo = LoginServer.getLoginAuthKey(key, false);
        c.login(clientinfo.getLeft(), "", false, true);
        c.loginAttempt = 0;
        LoginWorker.registerClient(c, true);
    }
}
