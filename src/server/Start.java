package server;

import server.cashshop.CashItemFactory;
import client.MapleCharacter;
import client.PlayMSEvent;
import client.skills.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import commons.services.LoggingService;
import commons.utils.MapleInfos;
import configs.Config;
import constants.JobConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.Auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleDojoRanking;
import handling.channel.MapleGuildRanking;
import handling.chat.ChatServer;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.world.World;
import handling.world.WorldRespawnService;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import handling.world.messenger.MessengerRankingWorker;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ServerSocket;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;

import server.Timer.BuffTimer;
import server.Timer.CheatTimer;
import server.Timer.CloneTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.WorldTimer;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.quest.MapleQuest;
import server.reward.RandomRewardService;
import tools.DateUtil;
import tools.FileoutputUtil;
import tools.GetMACAddress;
import tools.MapleLog;
import tools.StringUtil;
import tools.Triple;
import tools.api.Console;

public class Start {

    public static final Start instance = new Start();
    private int rankTime;
    private static int maxUsers = 0;
    private static ServerSocket srvSocket = null; //服务线程，用以控制服务器只启动一个实例
    private static int srvPort = 6350;     //控制启动唯一实例的端口号，这个端口如果保存在配置文件中会更灵活
    private static int failcount = 0;

    public void run() throws InterruptedException {
        MapleInfos.printAllInfos();
        rankTime = Integer.parseInt(ServerProperties.getProperty("world.rankTime", "120"));
        if (Boolean.parseBoolean(ServerProperties.getProperty("world.admin")) || ServerConstants.Use_Localhost) {
            ServerConstants.Use_Fixed_IV = false;
            System.out.println("[!!! 已开启只能管理员登录模式 !!!]");
        }
        if (!InitializeServer.Initial()) {
            System.out.println("服务端初始化失败。");
            return;
        }
        //System.out.println("[" + ServerProperties.getProperty("login.serverName") + "] Revision: " + SuperGMCommand.Rev.getRevision());
        printSection("时钟线程");
        WorldTimer.getInstance().start();
        EtcTimer.getInstance().start();
        MapTimer.getInstance().start();
        CloneTimer.getInstance().start();
        EventTimer.getInstance().start();
        BuffTimer.getInstance().start();
        PingTimer.getInstance().start();
        System.out.println("时钟线程加载完成...");

        printSection("加载配置");
        if (WinStart.getInstance() == null) {
            Config.load();
        }
        ServerConstants.loadBlockedMapFM();
        System.out.println("配置文件加载完成...");

        printSection("世界服务器");
        World.init();
        System.out.println("世界服务器加载完成...");

        printSection("加载家族");
        MapleGuildRanking.getInstance().load();
        MapleGuild.loadAll();
        System.out.println("家族信息加载完成...");

        printSection("加载学院");
        MapleFamily.loadAll();
        System.out.println("学院信息加载完成...");

        printSection("加载任务");
        long startQuestTime = System.currentTimeMillis();
        MapleLifeFactory.loadQuestCounts();
        MapleQuest.initQuests();
        System.out.println("任务信息加载完成 耗时: " + (System.currentTimeMillis() - startQuestTime) / 1000 + " 秒..");

        printSection("加载道具");
        long startItemsTime = System.currentTimeMillis();
        MapleItemInformationProvider.getInstance().runEtc();
        MapleItemInformationProvider.getInstance().runItems();
        MapleItemInformationProvider.getInstance().initSealedEquipInfo();
        MapleItemInformationProvider.getInstance().loadEnchatingScrolls();
        MapleItemInformationProvider.getInstance().loadEnchantingEnhance();
        MapleItemInformationProvider.getInstance().loadHairFace(0);
        MapleItemInformationProvider.getInstance().loadStyles(false);
        System.out.println("道具信息加载完成 耗时: " + (System.currentTimeMillis() - startItemsTime) / 1000 + " 秒..");

        printSection("加载爆率");
        long startDropTime = System.currentTimeMillis();
        MapleMonsterInformationProvider.getInstance().load();
        MapleMonsterInformationProvider.getInstance().addExtra();
        RandomRewardService.getInstance().loadRewards();
        //BattleConstants.init();
        System.out.println("爆率信息加载完成 耗时: " + (System.currentTimeMillis() - startDropTime) / 1000 + " 秒..");

        printSection("加载技能");
        long startSkillsTime = System.currentTimeMillis();
        SkillFactory.loadAllSkills();
        System.out.println("技能数据信息加载完成 耗时: " + (System.currentTimeMillis() - startSkillsTime) / 1000 + " 秒..");

        printSection("基础加载");
        long startBasicTime = System.currentTimeMillis();
        LoginInformationProvider.getInstance();
        RandomRewards.load();
        MapleOxQuizFactory.getInstance();
        MapleCarnivalFactory.getInstance();
        CharacterCardFactory.getInstance().initialize();
        MobSkillFactory.getInstance();
        SpeedRunner.loadSpeedRuns();
        MTSStorage.load();
        PredictCardFactory.getInstance().initialize();
        System.out.println("基础加载完成 耗时: " + (System.currentTimeMillis() - startBasicTime) / 1000 + " 秒..");

        printSection("加载时间");
        long startMIITime = System.currentTimeMillis();
        MapleInventoryIdentifier.getInstance();
        System.out.println("世界时间加载完成 耗时: " + (System.currentTimeMillis() - startMIITime) / 1000 + " 秒..");

        printSection("加载商城道具");
        long startCashItemTime = System.currentTimeMillis();
        CashItemFactory.getInstance().initialize();
        System.out.println("商城道具加载完成 耗时: " + (System.currentTimeMillis() - startCashItemTime) / 1000 + " 秒..");

        printSection("登录服务器");
        LoginServer.run_startup_configurations();

        printSection("频道服务器");
        ChannelServer.startChannel_Main();

        printSection("商城服务器");
        CashShopServer.run_startup_configurations();

        printSection("拍卖服务器");
        AuctionServer.run_startup_configurations();

        printSection("聊天服务器");
        ChatServer.run_startup_configurations();

        CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000);
        Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
        printSection("刷怪线程");
        WorldRespawnService.getInstance();
        if (Boolean.parseBoolean(ServerProperties.getProperty("world.RandDrop"))) {
            ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop(); //start it off
        }
        ShutdownServer.registerMBean();
        PlayerNPC.loadAll();
        printSection("启动完毕");
        LoginServer.setOn();
        System.out.println("[服务端已启动完毕，耗时 " + ((System.currentTimeMillis() - startQuestTime) / 1000) + " 秒]");
        //当刷新排名的时间大于0就启动
        if (rankTime > 0) {
            printSection("刷新排名");
            RankingWorker.start();
        }
        //加載道場排名
        MapleDojoRanking.getInstance().load(false);
        printSection("在线统计");
        Start.在线统计(Integer.parseInt(ServerProperties.getProperty("world.showUserCountTime", "30")));
        //开启服务端自带的定时在线奖励功能
        printSection("定时活动");
        PlayMSEvent.start();
        // 线程：启动聊天好感度排行榜刷新
        MessengerRankingWorker.getInstance();
        //启动签到系统
        printSection("签到系统");
        MapleSignin.getInstance().load();
        System.out.println("签到系统加载完成...");
        //检测复制装备
        if (Boolean.parseBoolean(ServerProperties.getProperty("world.checkCopyItem", "false"))) {
            Start.checkCopyItemFromSql();
        }
        // 清除在线时间
        clearOnlineTime();
        RankingTop.getInstance();
        // 初始化反抗者职业技能点
        initPlayerSP();
        //AutoCheckAuth();
        //inItThread();
        //开始客户端检查
//        printSection("客户端检查开始！");
//        MapleClientCheck.start();
        clearEventDataInfo();
        printSection("服务端启动完成！");
    }

    public static void inItThread() {
        if (WinStart.getInstance() == null) {
            WorldTimer.getInstance().register(new Runnable() {
                @Override
                public final void run() {
                    Console.setTitle("冒险岛服务端控制平台 【YS工作室出品 QQ：782532075】 " + "活动线程：" + Thread.activeCount());
                }
            }, 1 * 1000);
        }
    }

    /*
     * 统计在线人数
     */
    public static void 在线统计(int time) {
        System.out.println("服务端启用在线统计." + time + "分钟统计一次在线的人数信息.");
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                Map<Integer, Integer> connected = World.getConnected();
                StringBuilder conStr = new StringBuilder(FileoutputUtil.CurrentReadable_Time() + " 在线人数: ");
                for (int i : connected.keySet()) {
                    if (i == 0) {
                        int users = connected.get(i);
                        conStr.append(StringUtil.getRightPaddedStr(String.valueOf(users), ' ', 3));
                        if (users > maxUsers) {
                            maxUsers = users;
                        }
                        conStr.append(" 最高在线: ");
                        conStr.append(maxUsers);
                        break;
                    }
                }
                System.out.println(conStr.toString());
                if (maxUsers > 0) {
                    FileoutputUtil.log(FileoutputUtil.在线统计, conStr.toString(), true);
                }
            }
        }, 1000 * 60 * time);
    }

    /**
     * @param s
     */
    public static void printSection(String s) {
        s = "-[ " + s + " ]";
        while (s.getBytes().length < 79) {
            s = "=" + s;
        }
        MapleLog.getInstance().logWrite(14, s);
    }

    public static class Shutdown implements Runnable {

        @Override
        public void run() {
            ShutdownServer.getInstance().run();
        }
    }

    public static void main(String args[]) throws InterruptedException {
        Start.checkSingleInstance();

        if (WinStart.getInstance() == null) {
            Console.clear(); //清除控制台信息
            Console.setTitle("冒险岛服务端控制平台 【YS工作室出品 QQ：782532075】"); //设置控制台标题
            LoggingService.init();
            Config.load();
        }
        String[] macs = {"72ED-899F-4444-CFF4-6B2A-003C-178BFBFF00860F01-U508MC00EA", "--6B2A-003C-178BFBFF00860F01-U508MC00EA", "4647-BFB1-D879-31D0-6B2A-003C-BFEBFBFF000206C2-.3B23ML1.CN7475115C0051.", "1CC3-8410--6B2A-003C-0F8BFBFF00050657-", "167D-1717-EE62-14C8-6B2A-003C-1F8BFBFF000306E4-5702-1264-2132-0404-1361-5278-24"};

        String localMac = GetMACAddress.getDiskCNumber() + "-" + GetMACAddress.getDiskDNumber() + "-" + "6B2A-003C" + "-" + GetMACAddress.getCPUSerial() + "-" + GetMACAddress.getMotherboardSN();

        String MBS = GetMACAddress.getMotherboardSN();
        String DiskCN = GetMACAddress.getDiskCNumber();
        String DiskDN = GetMACAddress.getDiskDNumber();
        String CPUN = GetMACAddress.getCPUSerial();
        System.out.println("本机编号：" + localMac);

        boolean MACisTrue = false;
        for (int i = 0; i < macs.length; i++) {
            if (macs[i].equals(localMac)) {
                MACisTrue = true;
                break;
            }
        }

        if ((localMac != null) && MACisTrue) {// && (IPisTrue == true) && (MACisTrue == true)
            System.out.println("\r\n验证通过！开始启动服务端\r\n开服请联系QQ:782532075");
            instance.run();
        } else {
            System.out.println("\r\n验证未通过！请联系作者QQ:782532075\r\n");
            FileoutputUtil.packetLog("验证码.txt", localMac);
            //System.exit(0);
        }
        // 正确的

        //instance.run();
    }

    public static String getBJTime() {
        String bjTime = null;
        String weburls[] = {"http://open.baidu.com/", "http://www.qq.com", "http://www.163.com"};
        for (String weburl : weburls) {
            try {
                //这是通过网络获取北京时间的方法
                java.util.Locale locale = java.util.Locale.CHINA; //这是获得本地中国时区
                String pattern = "yyyy-MM-dd-HH";//这是日期格式
                java.text.SimpleDateFormat df = new java.text.SimpleDateFormat(pattern, locale);//设定日期格式
                java.util.Date date;
                java.net.URL url = new URL(weburl);//取得资源对象
                java.net.URLConnection uc = url.openConnection();//生成连接对象
                uc.connect(); //发出连接
                long ld = uc.getDate(); //取得网站日期时间
                if (ld == 0) {
                    continue;
                }
                date = new Date(ld); //转换为标准时间对象
                bjTime = df.format(date);
                break;
            } catch (MalformedURLException ex) {
                Logger.getLogger(Start.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(Start.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return bjTime;
    }

    public int getRankTime() {
        return rankTime;
    }

    public void setRankTime(int rankTime) {
        this.rankTime = rankTime;
    }

    protected static void checkSingleInstance() {
        try {
            srvSocket = new ServerSocket(srvPort); //启动一个ServerSocket，用以控制只启动一个实例
        } catch (IOException ex) {
            if (ex.getMessage().contains("Address already in use: JVM_Bind")) {
                System.out.println("在一台主机上同时只能启动一个进程(Only one instance allowed)。");
            }
            System.exit(0);
        }
    }

    protected static void checkCopyItemFromSql() {
        List<Integer> equipOnlyIds = new ArrayList<>(); //[道具的唯一ID信息]
        Map<Integer, Integer> checkItems = new HashMap<>(); //[道具唯一ID 道具ID]
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            //读取检测复制装备
            ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE equipOnlyId > 0");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int itemId = rs.getInt("itemId");
                int equipOnlyId = rs.getInt("equipOnlyId");
                if (equipOnlyId > 0) {
                    if (checkItems.containsKey(equipOnlyId)) { //发现重复的唯一ID装备
                        if (checkItems.get(equipOnlyId) == itemId) {
                            equipOnlyIds.add(equipOnlyId);
                        }
                    } else {
                        checkItems.put(equipOnlyId, itemId);
                    }
                }
            }
            rs.close();
            ps.close();
            //删除所有复制装备的唯一ID信息
            Collections.sort(equipOnlyIds);
            for (int i : equipOnlyIds) {
                ps = con.prepareStatement("DELETE FROM inventoryitems WHERE equipOnlyId = ?");
                ps.setInt(1, i);
                ps.executeUpdate();
                ps.close();
                System.out.println("发现复制装备 该装备的唯一ID: " + i + " 已进行删除处理..");
                FileoutputUtil.log("装备复制.txt", "发现复制装备 该装备的唯一ID: " + i + " 已进行删除处理..", true);
            }
        } catch (SQLException ex) {
            System.out.println("[EXCEPTION] 清理复制装备出现错误." + ex);
        }
    }

    public static void clearOnlineTime() {

        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                Calendar cal = Calendar.getInstance();
                cal.setTimeInMillis(System.currentTimeMillis());
                int today = cal.get(Calendar.DAY_OF_MONTH);
                for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
                    for (MapleCharacter chr : cserv_.getPlayerStorage().getAllCharacters()) {
                        if (chr != null) {
                            chr.setTodayOnlineTime(0);
                            chr.initTodayOnlineTime();
                        }
                    }
                }
                for (MapleCharacter chr : CashShopServer.getPlayerStorage().getAllCharacters()) {
                    if (chr != null) {
                        chr.setTodayOnlineTime(0);
                        chr.initTodayOnlineTime();
                    }
                }

                try {
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps;
                    ps = con.prepareStatement("UPDATE characters SET todayonlinetime = 0");
                    ps.execute();
                    ps.close();
                    ps = con.prepareStatement("DELETE FROM missionstatus WHERE missionid = 100100");
                    ps.execute();
                    ps.close();
                } catch (SQLException ex) {
                    System.out.println("[EXCEPTION] 清理在线时间出现错误 " + ex);
                }

                MapleActivity.initAllActivity();
                RankingTop.getInstance().initAll();
                MapleSignin.getInstance().reload(false);
            }
        }, 1000 * 60 * 60 * 24, DateUtil.getNextDayDiff(1));
    }

    public static void clearEventDataInfo() {
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                try {
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps;
                    ps = con.prepareStatement("DELETE FROM eventforday");
                    ps.execute();
                    ps.close();
                } catch (SQLException ex) {
                    System.out.println("[EXCEPTION] 清理每日事件信息出现错误 " + ex);
                }
            }
        }, 1000 * 60 * 60 * 24, DateUtil.getNextDayDiff(1));
    }

    public static void initPlayerSP() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        ResultSet rs;
        try {
            ps = con.prepareStatement("SELECT * FROM bosslog WHERE bossid = '反抗者技能点初始化'");
            rs = ps.executeQuery();
            if (rs.next()) {
                System.out.println("反抗者技能点初始化...[跳过]");
                return;
            }
            ps.close();
            rs.close();
            ps = con.prepareStatement("SELECT * FROM characters");
            rs = ps.executeQuery();
            Map<Integer, Triple<Integer, Integer, String>> playerinfo = new HashMap<>();
            int level, job;
            String sp;
            while (rs.next()) {
                if (JobConstants.is反抗者(rs.getInt("job"))) {
                    level = rs.getInt("level");
                    job = rs.getInt("job");
                    sp = "";
                    if (level < 30) {
                        sp += 4 + (level - 10) * 3 + ",";
                    } else {
                        sp += "64,";
                    }
                    if (level < 60) {
                        sp += 4 + (level - 30) * 3 + ",";
                    } else {
                        sp += "94,";
                    }
                    if (level < 100) {
                        sp += 4 + (level - 60) * 3 + ",";
                    } else {
                        sp += "124,";
                    }
                    if (level < 250) {
                        sp += 4 + (level - 100) * 3 + ",";
                    }
                    sp += "0,0,0,0,0,0";
                    playerinfo.put(rs.getInt("id"), new Triple<>(level, job, sp));
                }
            }
            ps.close();
            rs.close();
            for (Entry<Integer, Triple<Integer, Integer, String>> info : playerinfo.entrySet()) {
                ps = con.prepareStatement("DELETE FROM skills WHERE characterid = ?");
                ps.setInt(1, info.getKey());
                ps.execute();
                ps.close();
                ps = con.prepareStatement("UPDATE characters SET sp = ? WHERE id = ?");
                ps.setString(1, info.getValue().right);
                ps.setInt(2, info.getKey());
                ps.executeUpdate();
                ps.close();
            }
            ps = con.prepareStatement("INSERT INTO bosslog(characterid, bossid, count) VALUES (0, '反抗者技能点初始化', 1)");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            System.out.println("[EXCEPTION] 初始化角色技能点错误 " + ex);
        }
        System.out.println("反抗者技能点初始化...[完成]");
    }

    enum AuthStatus {

        AUTH_SUCCESS,
        AUTH_TIMEOUT,
        AUTH_UNKNOWN,
        AUTH_FAIL,
        AUTH_VERSION
    }
}
