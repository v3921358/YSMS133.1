package server;

import database.DatabaseConnection;
import handling.Auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.WorldAllianceService;
import handling.world.WorldBroadcastService;
import handling.world.WorldFamilyService;
import handling.world.WorldGuildService;

import java.lang.management.ManagementFactory;
import java.sql.SQLException;
import javax.management.MBeanServer;
import javax.management.ObjectName;

import org.apache.log4j.Logger;
import server.Timer.BuffTimer;
import server.Timer.CloneTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.WorldTimer;
import tools.MaplePacketCreator;

public class ShutdownServer implements ShutdownServerMBean {

    private static final Logger log = Logger.getLogger(ShutdownServer.class);
    public static ShutdownServer instance;
    private int time = 0;
    private boolean first = true;
    public static boolean running = false;

    public static void registerMBean() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            instance = new ShutdownServer();
            mBeanServer.registerMBean(instance, new ObjectName("server:type=ShutdownServer"));
        } catch (Exception e) {
            System.out.println("Error registering Shutdown MBean");
        }
    }

    public static ShutdownServer getInstance() {
        return instance;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public int getTime() {
        return time;
    }

    @Override
    public void shutdown() {//can execute twice
        run();
    }

    @Override
    public void run() {
        synchronized (this) {
            if (running) { //Run once!
                return;
            }
            running = true;
        }

        if (time != 0) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0, " ?????????????????????" + getTime() + "?????????????????????????????????????????????..."));
            if (first) {
                first = false;
                for (ChannelServer cs : ChannelServer.getAllInstances()) {
                    cs.setShutdown();
                    cs.setServerMessage("??????????????????????????????????????????????????????...");
                    cs.closeAllMerchants();
                }
            }
            return;
        }
        WorldGuildService.getInstance().save();
        WorldAllianceService.getInstance().save();
        WorldFamilyService.getInstance().save();
        Integer[] chs = ChannelServer.getAllInstance().toArray(new Integer[0]);
        for (int i : chs) {
            try {
                ChannelServer cs = ChannelServer.getInstance(i);
                synchronized (this) {
                    cs.shutdown();
                }
            } catch (Exception e) {
                log.error("????????????????????? - 3" + e);
            }
        }
        LoginServer.shutdown();
        CashShopServer.shutdown();
        AuctionServer.shutdown();
        System.out.println("????????????????????????...");
        WorldTimer.getInstance().stop();
        MapTimer.getInstance().stop();
        BuffTimer.getInstance().stop();
        CloneTimer.getInstance().stop();
        EventTimer.getInstance().stop();
        EtcTimer.getInstance().stop();
        PingTimer.getInstance().stop();
        System.out.println("???????????????????????????...");
        try {
            DatabaseConnection.closeAll();
        } catch (SQLException e) {
            log.error("???????????????????????????" + e);
        }
        System.out.println("?????????????????????...");
        try {
            Thread.sleep(5 * 1000);
        } catch (Exception e) {
            //shutdown
        }
    }
}
