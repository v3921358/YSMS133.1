package handling.login;

import constants.GameConstants;
import handling.MapleServerHandler;
import handling.ServerType;
import handling.login.handler.MapleBalloon;
import handling.mina.MapleCodecFactory;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.buffer.SimpleBufferAllocator;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
import server.ServerProperties;
import tools.Pair;
import tools.Quadruple;

public class LoginServer {

    private static short port;
    private static final short DEFAULT_PORT = 8484;
    private static IoAcceptor acceptor;
    private static Map<Integer, Integer> load = new HashMap<>();
    private static String serverName, eventMessage;
    private static byte flag;
    private static int maxCharacters, userLimit, usersOn = 0;
    private static boolean finishedShutdown = true, adminOnly = false, autoReg = false, useSha1Hash = false, checkMacs = false, accCheck = false;
    private static HashMap<Integer, Quadruple<String, String, Integer, String>> loginAuth = new HashMap<>();
    private static final Logger log = Logger.getLogger(LoginServer.class);
    private static HashMap<String, Pair<String, Integer>> loginAuthKey = new HashMap<>();
    private static final List<MapleBalloon> lBalloon = new ArrayList<>();

    public static void putLoginAuth(int chrid, String ip, String tempIp, int channel, String mac) {
        loginAuth.put(chrid, new Quadruple<>(ip, tempIp, channel, mac));
    }

    public static Quadruple<String, String, Integer, String> getLoginAuth(int chrid) {
        return loginAuth.remove(chrid);
    }

    public static void pubLoginAuthKey(String key, String account, int channel) {
        loginAuthKey.put(key, new Pair<>(account, channel));
    }

    public static Pair<String, Integer> getLoginAuthKey(String account, boolean remove) {
        if (remove) {
            return loginAuthKey.remove(account);
        } else {
            return loginAuthKey.get(account);
        }
    }

    public static void addChannel(int channel) {
        load.put(channel, 0);
    }

    public static void removeChannel(int channel) {
        load.remove(channel);
    }

    public static void run_startup_configurations() {
        userLimit = Integer.parseInt(ServerProperties.getProperty("login.userlimit"));
        serverName = ServerProperties.getProperty("login.serverName", "风云工作室");
        eventMessage = ""; //ServerProperties.getProperty("login.eventMessage");
        flag = Byte.parseByte(ServerProperties.getProperty("login.flag"));
        adminOnly = Boolean.parseBoolean(ServerProperties.getProperty("world.admin", "false"));
        maxCharacters = Integer.parseInt(ServerProperties.getProperty("login.maxCharacters"));
        autoReg = Boolean.parseBoolean(ServerProperties.getProperty("login.autoReg", "false"));
        useSha1Hash = Boolean.parseBoolean(ServerProperties.getProperty("login.useSha1Hash", "false"));
        checkMacs = false;//Boolean.parseBoolean(ServerProperties.getProperty("login.checkMacs", "false")); //是否检测MAC地址
        accCheck = Boolean.parseBoolean(ServerProperties.getProperty("world.AccCheck", "false")); //是否开启检测登录器断开
        port = Short.parseShort(ServerProperties.getProperty("login.port", String.valueOf(DEFAULT_PORT)));

        IoBuffer.setUseDirectBuffer(false);
        IoBuffer.setAllocator(new SimpleBufferAllocator());

        //创建非阻塞的Socket
        acceptor = new NioSocketAcceptor();
        acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));
        acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30); //读/写通道均在30秒内无任何操作就进入空闲状态
        try {
            acceptor.setHandler(new MapleServerHandler(ServerType.登录服务器));
            acceptor.bind(new InetSocketAddress(port));
            ((SocketSessionConfig) acceptor.getSessionConfig()).setTcpNoDelay(true);
            log.info("登录器服务器绑定端口: " + port + ".");
            System.out.println("当前设置最大在线: " + userLimit + " 人 默认角色数: " + maxCharacters + " 人 自动注册: " + autoReg);
        } catch (IOException e) {
            log.error("登录器服务器绑定端口: " + port + " 失败" + e);
        }
    }

    public static void shutdown() {
        if (finishedShutdown) {
            return;
        }
        log.info("正在关闭登录服务器...");
//        acceptor.unbind();
        finishedShutdown = true; //nothing. lol
    }

    public static String getServerName() {
        return serverName;
    }

    public static String getTrueServerName() {
        return serverName.substring(0, serverName.length() - (GameConstants.GMS ? 2 : 3));
    }

    public static String getEventMessage() {
        return eventMessage;
    }

    public static byte getFlag() {
        return flag;
    }

    public static int getMaxCharacters() {
        return maxCharacters;
    }

    public static Map<Integer, Integer> getLoad() {
        return load;
    }

    public static void setLoad(Map<Integer, Integer> load_, int usersOn_) {
        load = load_;
        usersOn = usersOn_;
    }

    public static void setEventMessage(String newMessage) {
        eventMessage = newMessage;
    }

    public static void setFlag(byte newflag) {
        flag = newflag;
    }

    public static int getUserLimit() {
        return userLimit;
    }

    public static int getUsersOn() {
        return usersOn;
    }

    public static void setUserLimit(int newLimit) {
        userLimit = newLimit;
    }

    public static List<MapleBalloon> getBalloons() {
        //lBalloon.add(new MapleBalloon("奇幻冒险岛私服一条龙！联系QQ537050707", 0, 450));
        return lBalloon;
    }

    public static boolean isAdminOnly() {
        return adminOnly;
    }

    public static void setAdminOnly(boolean admin) {
        adminOnly = admin;
    }

    public static boolean isShutdown() {
        return finishedShutdown;
    }

    public static void setOn() {
        finishedShutdown = false;
    }

    public static boolean isAutoReg() {
        return autoReg;
    }

    public static boolean isUseSha1Hash() {
        return useSha1Hash;
    }

    public static boolean isCheckMacs() {
        return checkMacs;
    }

    public static boolean hasAccCheck() {
        return accCheck;
    }

    public static void setAutoReg(boolean autoReg) {
        LoginServer.autoReg = autoReg;
    }
}
