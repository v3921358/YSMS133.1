/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.Auction;

import constants.ServerConstants;
import handling.MapleServerHandler;
import handling.ServerType;
import handling.channel.PlayerStorage;
import handling.mina.MapleCodecFactory;

import java.net.InetSocketAddress;

import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.buffer.SimpleBufferAllocator;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
import server.MTSStorage;
import server.ServerProperties;

/**
 * 拍卖服务器
 *
 * @author PlayDK
 */
public class AuctionServer {

    private static String ip;
    private static IoAcceptor acceptor;
    private static PlayerStorage players;
    private static boolean finishedShutdown = false;
    private static short port;
    private static final short DEFAULT_PORT = 8700;
    private static final Logger log = Logger.getLogger(AuctionServer.class);

    public static void run_startup_configurations() {
        port = Short.parseShort(ServerProperties.getProperty("auctionp.port", String.valueOf(DEFAULT_PORT)));
        ip = ServerProperties.getProperty("world.host", ServerConstants.HOST) + ":" + port;

        IoBuffer.setUseDirectBuffer(false);
        IoBuffer.setAllocator(new SimpleBufferAllocator());

        //创建非阻塞的Socket
        acceptor = new NioSocketAcceptor();
        acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new MapleCodecFactory()));
        acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30); //读/写通道均在30秒内无任何操作就进入空闲状态
        players = new PlayerStorage(-20);
        try {
            acceptor.setHandler(new MapleServerHandler(ServerType.拍卖服务器));
            acceptor.bind(new InetSocketAddress(port));
            ((SocketSessionConfig) acceptor.getSessionConfig()).setTcpNoDelay(true);
            log.info("拍卖服务器绑定端口: " + port + ".");
        } catch (final Exception e) {
            log.error("拍卖服务器绑定端口 " + port + " 失败");
            throw new RuntimeException("绑定端口失败.", e);
        }
    }

    public static String getIP() {
        return ip;
    }

    public static PlayerStorage getPlayerStorage() {
        return players;
    }

    public static void shutdown() {
        if (finishedShutdown) {
            return;
        }
        log.info("正在关闭拍卖服务器...");
        players.disconnectAll();
        MTSStorage.getInstance().saveBuyNow(true);
        log.info("拍卖服务器解除端口绑定...");
//        acceptor.unbind();
        finishedShutdown = true;
    }

    public static boolean isShutdown() {
        return finishedShutdown;
    }
}
