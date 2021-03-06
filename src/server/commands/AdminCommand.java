package server.commands;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import client.skills.SkillFactory;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import configs.Config;
import constants.ServerConstants;
import handling.CashShopOpcode;
import handling.InteractionOpcode;
import handling.MapleServerHandler;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.WorldBroadcastService;
import handling.world.WorldFindService;

import java.awt.Point;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import scripting.map.MapScriptManager;
import scripting.npc.NPCScriptManager;
import scripting.portal.PortalScriptManager;
import scripting.reactor.ReactorScriptManager;
import server.cashshop.CashItemFactory;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.shop.MapleShopFactory;
import server.ServerProperties;
import server.ShutdownServer;
import server.Timer.BuffTimer;
import server.Timer.CloneTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.WorldTimer;
import server.life.MapleMonsterInformationProvider;
import server.reward.RandomRewardService;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.StringUtil;
import tools.packet.UIPacket;
import tools.performance.CPUSampler;

/**
 * @author Emilyx3
 */
public class AdminCommand {

    /**
     * @return
     */
    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.ADMIN;
    }

    /**
     *
     */
    public static class StripEveryone extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            ChannelServer cs = c.getChannelServer();
            for (MapleCharacter mchr : cs.getPlayerStorage().getAllCharacters()) {
                if (mchr.isGM()) {
                    continue;
                }
                MapleInventory equipped = mchr.getInventory(MapleInventoryType.EQUIPPED);
                MapleInventory equip = mchr.getInventory(MapleInventoryType.EQUIP);
                List<Short> ids = new ArrayList<>();
                for (Item item : equipped.newList()) {
                    ids.add(item.getPosition());
                }
                for (short id : ids) {
                    MapleInventoryManipulator.unequip(mchr.getClient(), id, equip.getNextFreeSlot());
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class MesoEveryone extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 1) {
                c.getPlayer().dropMessage(6, "??????: !MesoEveryone [????????????]");
                return 0;
            }
            int meso;
            try {
                meso = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "???????????????????????????.");
                return 0;
            }
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.gainMeso(meso, true);
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "??????: !???????????? x?????? y??????  ??????: ????????????????????????????????????????????????????????????????????????");
                return 0;
            }
            int x = Integer.parseInt(splitted[1]);
            int y = Integer.parseInt(splitted[2]);
            Point test = new Point(x, y);
            c.getPlayer().dropMessage(6, "????????????: " + c.getPlayer().getTruePosition().distanceSq(test));
            return 1;
        }
    }

    /**
     *
     */
    public static class CashEveryone extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "??????: !CashEveryone [????????????1-2] [????????????]");
                return 0;
            }
            int type = Integer.parseInt(splitted[1]);
            int quantity = Integer.parseInt(splitted[2]);
            if (type <= 0 || type > 2) {
                type = 2;
            }
            int ret = 0;
            StringBuilder sb = new StringBuilder();
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.modifyCSPoints(type, quantity, false);
                    mch.dropMessage(-11, "[????????????] ???????????????????????????????????????" + (type == 1 ? "?????? " : " ????????? ") + quantity + " ???.");
                    ret++;
                    sb.append(MapleCharacterUtil.makeMapleReadable(mch.getName()));
                    sb.append(", ");
                }
            }
            c.getPlayer().dropMessage(6, "???????????????" + (type == 1 ? "?????? " : " ????????? ") + "???????????????:");
            c.getPlayer().dropMessage(6, sb.toString());
            c.getPlayer().dropMessage(6, "?????????????????????????????????: " + ret + " ???????????????: " + quantity + " ??????" + (type == 1 ? "?????? " : " ????????? ") + " ??????: " + (ret * quantity));
            return 1;
        }
    }

    /**
     *
     */
    public static class PayEveryone extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 1) {
                c.getPlayer().dropMessage(6, "??????: !PayEveryone [??????]");
                return 0;
            }
            int hb;
            try {
                hb = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "???????????????????????????.");
                return 0;
            }
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                    mch.addHyPay(-hb);
                    mch.dropMessage(-11, "[????????????] ????????????????????????????????????????????????" + hb + "??????");
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ExpRate extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length > 1) {
                int rate = Integer.parseInt(splitted[1]);
                if (splitted.length > 2 && splitted[2].equalsIgnoreCase("all")) {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setExpRate(rate);
                    }
                } else {
                    c.getChannelServer().setExpRate(rate);
                }
                c.getPlayer().dropMessage(6, "???????????????????????????: " + rate + "???.");
            } else {
                c.getPlayer().dropMessage(6, "??????: !exprate <number> [all]");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class MesoRate extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length > 1) {
                int rate = Integer.parseInt(splitted[1]);
                if (splitted.length > 2 && splitted[2].equalsIgnoreCase("all")) {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setMesoRate(rate);
                    }
                } else {
                    c.getChannelServer().setMesoRate(rate);
                }
                c.getPlayer().dropMessage(6, "???????????????????????????: " + rate + "???.");
            } else {
                c.getPlayer().dropMessage(6, "??????: !mesorate <number> [all]");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class DropRate extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length > 1) {
                int rate = Integer.parseInt(splitted[1]);
                if (splitted.length > 2 && splitted[2].equalsIgnoreCase("all")) {
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.setDropRate(rate);
                    }
                } else {
                    c.getChannelServer().setDropRate(rate);
                }
                c.getPlayer().dropMessage(6, "???????????????????????????: " + rate + "???.");
            } else {
                c.getPlayer().dropMessage(6, "??????: !droprate <number> [all]");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        private int change = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            change = Integer.parseInt(splitted[1]);
            if (change == 1 || change == 2) {
                c.getPlayer().dropMessage(6, "?????? - ??????: " + c.getChannelServer().getExpRate() + " ??????: " + c.getChannelServer().getMesoRate() + " ??????: " + c.getChannelServer().getDropRate());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setDoubleExp(change);
                }
                c.getPlayer().dropMessage(6, "?????? - ??????: " + c.getChannelServer().getExpRate() + " ??????: " + c.getChannelServer().getMesoRate() + " ??????: " + c.getChannelServer().getDropRate());
                return 1;
            } else {
                c.getPlayer().dropMessage(6, "????????????????????????1????????????????????????2???????????????????????????????????????: " + change);
                return 0;
            }
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "????????????????????????:");
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                StringBuilder rateStr = new StringBuilder("?????? ");
                rateStr.append(cserv.getChannel());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getExpRate());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getMesoRate());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getDropRate());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getDoubleExp());
                rateStr.append(" ?????????????????? ??????: ");
                rateStr.append(cserv.getAutoGain());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getAutoNx());
                rateStr.append(" ??????: ");
                rateStr.append(cserv.getAutoPaoDian());
                c.getPlayer().dropMessage(5, rateStr.toString());
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        private int change = 10;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "??????: !???????????? <????????????>");
                return 0;
            }
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "?????????????????????.");
                return 0;
            }
            if (change >= 10 && change <= 1000) {
                c.getPlayer().dropMessage(6, "?????? - ????????????: " + c.getChannelServer().getAutoGain());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setAutoGain(change);
                }
                c.getPlayer().dropMessage(6, "?????? - ????????????: " + c.getChannelServer().getAutoGain() + " ????????????????????????...");
            } else {
                c.getPlayer().dropMessage(6, "???????????????????????????????????? ???????????? 10 - 1000 ????????? ???????????????: " + change);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        private int change = 1;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "??????: !???????????? <????????????>");
                return 0;
            }
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "?????????????????????.");
                return 0;
            }
            if (change >= 1 && change <= 100) {
                c.getPlayer().dropMessage(6, "?????? - ????????????: " + c.getChannelServer().getAutoNx());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setAutoNx(change);
                }
                c.getPlayer().dropMessage(6, "?????? - ????????????: " + c.getChannelServer().getAutoNx() + " ????????????????????????...");
            } else {
                c.getPlayer().dropMessage(6, "???????????????????????????????????? ???????????? 1 - 100 ????????? ???????????????: " + change);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        private int change = 1;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "??????: !???????????? <????????????>");
                return 0;
            }
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "?????????????????????.");
                return 0;
            }
            if (change == 1 || change == 2) {
                c.getPlayer().dropMessage(6, "?????? - ???????????? - ??????: " + c.getChannelServer().getAutoPaoDian());
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setAutoPaoDian(change);
                }
                c.getPlayer().dropMessage(6, "?????? - ???????????? - ??????: " + c.getChannelServer().getAutoPaoDian() + " ????????????????????????...");
            } else {
                c.getPlayer().dropMessage(6, "???????????????????????????????????? ???????????? 1 ??? 2 ????????? ???????????????: " + change);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class DCAll extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int range = -1;
            if (splitted[1].equals("m")) {
                range = 0;
            } else if (splitted[1].equals("c")) {
                range = 1;
            } else if (splitted[1].equals("w")) {
                range = 2;
            }
            if (range == -1) {
                range = 1;
            }
            if (range == 0) {
                c.getPlayer().getMap().disconnectAll();
                c.getPlayer().dropMessage(5, "????????????????????????????????????????????????.");
            } else if (range == 1) {
                c.getChannelServer().getPlayerStorage().disconnectAll(true);
                c.getPlayer().dropMessage(5, "????????????????????????????????????????????????.");
            } else if (range == 2) {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.getPlayerStorage().disconnectAll(true);
                }
                c.getPlayer().dropMessage(5, "????????????????????????????????????????????????.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9010000, 1);
            return 1;
        }
    }

    /**
     *
     */
    public static class Shutdown extends CommandExecute {

        /**
         *
         */
        protected static Thread t = null;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, "??????????????????...");
            if (t == null || !t.isAlive()) {
                t = new Thread(ShutdownServer.getInstance());
                ShutdownServer.getInstance().shutdown();
                t.start();
            } else {
                c.getPlayer().dropMessage(6, "??????????????????????????????????????????????????????.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ShutdownTime extends Shutdown {

        private static ScheduledFuture<?> ts = null;
        private int minutesLeft = 0;

        @Override
        public int execute(MapleClient c, String[] splitted) {
            minutesLeft = Integer.parseInt(splitted[1]);
            c.getPlayer().dropMessage(6, "???????????? " + minutesLeft + " ??????????????????...");
            if (ts == null && (t == null || !t.isAlive())) {
                t = new Thread(ShutdownServer.getInstance());
                ts = EventTimer.getInstance().register(new Runnable() {

                    @Override
                    public void run() {
                        if (minutesLeft == 0) {
                            ShutdownServer.getInstance().shutdown();
                            t.start();
                            ts.cancel(false);
                            return;
                        }
                        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.clearMidMsg());
                        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.getMidMsg("???????????? " + minutesLeft + " ????????????????????????.?????????????????????.", true, 0));
                        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0, " ???????????? " + minutesLeft + " ????????????????????????.?????????????????????."));
                        minutesLeft--;
                    }
                }, 60000);
            } else {
                c.getPlayer().dropMessage(6, "??????????????????????????????????????????????????????.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class StartProfiling extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            CPUSampler sampler = CPUSampler.getInstance();
            sampler.addIncluded("client");
            sampler.addIncluded("constants"); //or should we do Packages.constants etc.?
            sampler.addIncluded("database");
            sampler.addIncluded("handling");
            sampler.addIncluded("provider");
            sampler.addIncluded("scripting");
            sampler.addIncluded("server");
            sampler.addIncluded("tools");
            sampler.start();
            c.getPlayer().dropMessage(6, "?????????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class StopProfiling extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            CPUSampler sampler = CPUSampler.getInstance();
            try {
                String filename = "odinprofile.txt";
                if (splitted.length > 1) {
                    filename = splitted[1];
                }
                File file = new File(filename);
                if (file.exists()) {
                    c.getPlayer().dropMessage(6, "???????????????????????????????????????????????????1?????????????????????");
                    return 0;
                }
                sampler.stop();
                FileWriter fw = new FileWriter(file);
                sampler.save(fw, 1, 10);
                fw.close();
            } catch (IOException e) {
                System.err.println("??????????????????." + e);
            }
            sampler.reset();
            c.getPlayer().dropMessage(6, "?????????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class Subcategory extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().setSubcategory(Byte.parseByte(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class ????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().gainMeso(ServerProperties.getMaxMeso() - c.getPlayer().getMeso(), true);
            return 1;
        }
    }

    /**
     *
     */
    public static class ????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().modifyCSPoints(1, Integer.parseInt(splitted[1]), true);
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().modifyCSPoints(2, Integer.parseInt(splitted[1]), true);
            return 1;
        }
    }

    /**
     *
     */
    public static class GainP extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().setPoints(c.getPlayer().getPoints() + Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class GainVP extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().setVPoints(c.getPlayer().getVPoints() + Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (ServerProperties.ShowPacket()) {
                ServerProperties.loadSettings();
            }
            RecvPacketOpcode.reloadValues();
            SendPacketOpcode.reloadValues();
            CashShopOpcode.reloadValues();
            InteractionOpcode.reloadValues();
            c.getPlayer().dropMessage(5, "????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMonsterInformationProvider.getInstance().clearDrops();
            ReactorScriptManager.getInstance().clearDrops();
            c.getPlayer().dropMessage(5, "????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            PortalScriptManager.getInstance().clearScripts();
            c.getPlayer().dropMessage(5, "?????????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleShopFactory.getInstance().clear();
            c.getPlayer().dropMessage(5, "????????????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
//            ServerProperties.loadProperties("world.properties");
//            for (ChannelServer instance : ChannelServer.getAllInstances()) {
//                instance.reloadEvents();
//            }
//            c.getPlayer().dropMessage(5, "??????????????????????????????.");
            c.getPlayer().dropMessage(5, "?????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class resetEvent extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            ServerProperties.loadProperties("world.properties");
            for (ChannelServer instance : ChannelServer.getAllInstances()) {
                instance.reloadEvents();
            }
            c.getPlayer().dropMessage(5, "??????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapScriptManager.getInstance().clearScripts();
            c.getPlayer().dropMessage(5, "????????????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleItemInformationProvider.getInstance().reloadEnchatingScrolls();
            c.getPlayer().dropMessage(5, "??????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.StartWindow();
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            int share = Integer.parseInt(splitted[1]);
            ChannelServer.getInstance(1).increaseShare(share);
            c.getPlayer().dropMessage(5, "????????????: " + share + " ??????????????????: " + ChannelServer.getInstance(1).getSharePrice());
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            int share = Integer.parseInt(splitted[1]);
            ChannelServer.getInstance(1).decreaseShare(share);
            c.getPlayer().dropMessage(5, "????????????: " + share + " ??????????????????: " + ChannelServer.getInstance(1).getSharePrice());
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "??????????????????: " + ChannelServer.getInstance(1).getSharePrice());
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            SkillFactory.loadMemorySkills();
            c.getPlayer().dropMessage(5, "????????????????????????...");
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            CashItemFactory.getInstance().loadBlockedCash();
            c.getPlayer().dropMessage(5, "????????????????????????????????????...");
            c.getPlayer().dropMessage(5, "??????: " + CashItemFactory.getInstance().getBlockedCashItem().size() + " ?????????ID?????? ");
            c.getPlayer().dropMessage(5, "??????: " + CashItemFactory.getInstance().getBlockCashSn().size() + " ???SNID??????");
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            SkillFactory.loadBlockedSkills();
            c.getPlayer().dropMessage(5, "??????????????????????????????...");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int total = 0;
            c.getPlayer().dropMessage(6, "---------------------------------------------------------------------------------------");
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                int curConnected = cserv.getConnectedClients();
                c.getPlayer().dropMessage(6, "??????: " + cserv.getChannel() + " ????????????: " + curConnected);
                total += curConnected;
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr != null) {
                        StringBuilder ret = new StringBuilder();
                        ret.append(StringUtil.getRightPaddedStr(chr.getName(), ' ', 13));
                        ret.append(" ID: ");
                        ret.append(chr.getId());
                        ret.append(" ??????: ");
                        ret.append(StringUtil.getRightPaddedStr(String.valueOf(chr.getLevel()), ' ', 3));
                        if (chr.getMap() != null) {
                            ret.append(" ??????: ");
                            ret.append(chr.getMapId());
                            ret.append(" - ");
                            ret.append(chr.getMap().getMapName());
                        }
                        c.getPlayer().dropMessage(6, ret.toString());
                    }
                }
            }
            c.getPlayer().dropMessage(6, "???????????????????????????: " + total);
            c.getPlayer().dropMessage(6, "---------------------------------------------------------------------------------------");
            return 1;
        }
    }

    /*
     * ?????????????????????
     */
    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().addTraitExp(Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "???????????????.");
                return 0;
            }
            c.getPlayer().setTraitExp(Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            List<String> msgs = new ArrayList<>();
            Map<Integer, CopyItemInfo> checkItems = new LinkedHashMap<>();
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter player : cserv.getPlayerStorage().getAllCharacters()) {
                    if (player != null && player.getMap() != null) {
                        //??????????????????
                        MapleInventory equip = player.getInventory(MapleInventoryType.EQUIP);
                        for (Item item : equip.list()) {
                            if (item.getEquipOnlyId() > 0) {
                                CopyItemInfo ret = new CopyItemInfo(item.getItemId(), player.getId(), player.getName());
                                if (checkItems.containsKey(item.getEquipOnlyId())) {
                                    ret = checkItems.get(item.getEquipOnlyId());
                                    if (ret.itemId == item.getItemId()) {
                                        if (ret.isFirst()) {
                                            ret.setFirst(false);
                                            msgs.add("??????: " + StringUtil.getRightPaddedStr(ret.name, ' ', 13) + " ??????ID: " + StringUtil.getRightPaddedStr(String.valueOf(ret.chrId), ' ', 6) + " ??????: " + ret.itemId + " - " + ii.getName(ret.itemId) + " ??????ID: " + item.getEquipOnlyId());
                                        } else {
                                            msgs.add("??????: " + StringUtil.getRightPaddedStr(player.getName(), ' ', 13) + " ??????ID: " + StringUtil.getRightPaddedStr(String.valueOf(player.getId()), ' ', 6) + " ??????: " + item.getItemId() + " - " + ii.getName(item.getItemId()) + " ??????ID: " + item.getEquipOnlyId());
                                        }
                                    }
                                } else {
                                    checkItems.put(item.getEquipOnlyId(), ret);
                                }
                            }
                        }
                        //?????????????????????
                        equip = player.getInventory(MapleInventoryType.EQUIPPED);
                        for (Item item : equip.list()) {
                            if (item.getEquipOnlyId() > 0) {
                                CopyItemInfo ret = new CopyItemInfo(item.getItemId(), player.getId(), player.getName());
                                if (checkItems.containsKey(item.getEquipOnlyId())) {
                                    ret = checkItems.get(item.getEquipOnlyId());
                                    if (ret.itemId == item.getItemId()) {
                                        if (ret.isFirst()) {
                                            ret.setFirst(false);
                                            msgs.add("??????: " + StringUtil.getRightPaddedStr(ret.name, ' ', 13) + " ??????ID: " + StringUtil.getRightPaddedStr(String.valueOf(ret.chrId), ' ', 6) + " ??????: " + ret.itemId + " - " + ii.getName(ret.itemId) + " ??????ID: " + item.getEquipOnlyId());
                                        } else {
                                            msgs.add("??????: " + StringUtil.getRightPaddedStr(player.getName(), ' ', 13) + " ??????ID: " + StringUtil.getRightPaddedStr(String.valueOf(player.getId()), ' ', 6) + " ??????: " + item.getItemId() + " - " + ii.getName(item.getItemId()) + " ??????ID: " + item.getEquipOnlyId());
                                        }
                                    }
                                } else {
                                    checkItems.put(item.getEquipOnlyId(), ret);
                                }
                            }
                        }
                    }
                }
            }
            checkItems.clear();
            if (msgs.size() > 0) {
                c.getPlayer().dropMessage(5, "?????????????????????: " + msgs.size() + " ???????????????");
                FileoutputUtil.log("????????????.txt", "?????????????????????: " + msgs.size() + " ???????????????", true);
                for (String s : msgs) {
                    c.getPlayer().dropMessage(5, s);
                    FileoutputUtil.log("????????????.txt", s, true);
                }
                c.getPlayer().dropMessage(5, "??????????????????????????????????????????.");
            } else {
                c.getPlayer().dropMessage(5, "??????????????????????????????????????????????????????.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "?????????????????????????????????.");
                c.getSession().write(MaplePacketCreator.SystemProcess());
                return 0;
            }
            String name = splitted[1];
            MapleCharacter chrs = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chrs == null) {
                c.getPlayer().dropMessage(6, "??????????????????????????????[" + name + "]?????????.");
            } else {
                c.getPlayer().dropMessage(6, "??????????????????[" + name + "]???????????????.");
                chrs.getClient().getSession().write(MaplePacketCreator.SystemProcess());
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            Config.load();
            c.getPlayer().dropMessage(6, "??????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            ServerConstants.setShowGMMessage(!ServerConstants.isShowGMMessage());
            c.getPlayer().dropMessage(6, "???????????????????????????" + (ServerConstants.isShowGMMessage() ? "?????????" : "?????????"));
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                cserv.loadShopPack();
            }
            c.getPlayer().dropMessage(6, "??????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int change = Integer.parseInt(splitted[1]);
            if (change == 1 || change == 2) {
                c.getPlayer().dropMessage(6, "?????? - ??????????????????: " + LoginServer.isAdminOnly());
                LoginServer.setAdminOnly(change == 2);
                c.getPlayer().dropMessage(6, "?????? - ??????????????????: " + LoginServer.isAdminOnly());
                return 1;
            } else {
                c.getPlayer().dropMessage(6, "????????????????????????1??????????????????????????????2?????????????????????????????????????????????: " + change);
                return 0;
            }
        }
    }

    /**
     *
     */
    public static class ?????????????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            RandomRewardService.getInstance().clearRewards();
            c.getPlayer().dropMessage(6, "??????????????????????????????.");
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "!?????????????????? [??????ID] [????????????] ");
                return 0;
            }
            if (splitted[1].matches("/^([0-9])*$") || splitted[2].matches("/^([0-9])*$")) {
                c.getPlayer().dropMessage(6, "?????????????????????ID?????????????????????????????????");
                return 0;
            }
            int victimId = Integer.parseInt(splitted[1]);
            int position = Integer.parseInt(splitted[2]);
            int ch = WorldFindService.getInstance().findChannel(victimId);
            if (ch <= 0) {
                c.getPlayer().dropMessage(6, "??????????????????ID???: " + victimId + " ?????????.");
                return 0;
            }
            MapleCharacter victim = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterById(victimId);
            if (victim != null) {
                byte pos = (byte) (position * (position > 0 ? -1 : 1));
                Item item = victim.getInventory(MapleInventoryType.EQUIPPED).getItem(pos);
                if (item == null) {
                    c.getPlayer().dropMessage(6, "[????????????] ?????? : " + victim.getName() + " ID: " + victimId + " ????????????????????? " + position + " ???????????????????????????");
                    return 0;
                }
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                c.getSession().write(MaplePacketCreator.getGachaponMega("[????????????]", " : ?????? " + victim.getName() + " ????????????????????? " + position + " ?????????{" + ii.getName(item.getItemId()) + "}??????..", item, 3, c.getChannel()));
                return 1;
            } else {
                c.getPlayer().dropMessage(6, "??????????????????ID???: " + victimId + " ?????????.");
            }
            return 0;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "??????: !???????????? [?????????????????????] ?????? !???????????? [X??????] [Y??????] ");
                return 0;
            }
            if (splitted.length == 2) {
                int portalId;
                try {
                    portalId = Integer.parseInt(splitted[1]);
                } catch (NumberFormatException nfe) {
                    c.getPlayer().dropMessage(6, "??????????????????ID??????.");
                    return 0;
                }
                int maxPortalId = c.getPlayer().getMap().getPortals().size();
                MaplePortal portal = c.getPlayer().getMap().getPortal(portalId);
                if (portal == null || portalId > maxPortalId) {
                    c.getPlayer().dropMessage(6, "??????????????????ID[" + portalId + "]??????????????????????????????????????????,?????????????????????????????? ???" + maxPortalId);
                    return 0;
                }
                c.getPlayer().instantMapWarp(portal.getPosition());
            } else {
                int posX;
                int posY;
                try {
                    posX = Integer.parseInt(splitted[1]);
                } catch (NumberFormatException nfe) {
                    c.getPlayer().dropMessage(6, "?????????X????????????.");
                    return 0;
                }
                try {
                    posY = Integer.parseInt(splitted[2]);
                } catch (NumberFormatException nfe) {
                    c.getPlayer().dropMessage(6, "?????????Y????????????.");
                    return 0;
                }
                Point portalPos = new Point(posX, posY);
                c.getPlayer().instantMapWarp(portalPos);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "??????????????????????????????[1-7]");
                return 0;
            }
            int poolId;
            try {
                poolId = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "?????????????????????ID??????.");
                return 0;
            }
            ScheduledThreadPoolExecutor scheduledPool;
            String name;
            switch (poolId) {
                case 1:
                    name = "World Timer";
                    scheduledPool = WorldTimer.getInstance().getSES();
                    break;
                case 2:
                    name = "Etc Timer";
                    scheduledPool = EtcTimer.getInstance().getSES();
                    break;
                case 3:
                    name = "Map Timer";
                    scheduledPool = MapTimer.getInstance().getSES();
                    break;
                case 4:
                    name = "Clone Timer";
                    scheduledPool = CloneTimer.getInstance().getSES();
                    break;
                case 5:
                    name = "Event Timer";
                    scheduledPool = EventTimer.getInstance().getSES();
                    break;
                case 6:
                    name = "Buff Timer";
                    scheduledPool = BuffTimer.getInstance().getSES();
                    break;
                case 7:
                    name = "Ping Timer";
                    scheduledPool = PingTimer.getInstance().getSES();
                    break;
                default:
                    return 0;
            }
            if (scheduledPool != null) {
                c.getPlayer().dropMessage(-11, "--------------------------------------------------------------------");
                c.getPlayer().dropMessage(-11, "????????????????????? : " + name + " ???????????????: " + poolId);
                c.getPlayer().dropMessage(-11, "ActiveCount: ...... " + StringUtil.getRightPaddedStr(scheduledPool.getActiveCount(), ' ', 8) + " ??????: ??????????????????????????????");
                c.getPlayer().dropMessage(-11, "CorePoolSize: ..... " + StringUtil.getRightPaddedStr(scheduledPool.getCorePoolSize(), ' ', 8) + " ??????: ???????????????");
                c.getPlayer().dropMessage(-11, "PoolSize: ......... " + StringUtil.getRightPaddedStr(scheduledPool.getPoolSize(), ' ', 8) + " ??????: ???????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "LargestPoolSize: .. " + StringUtil.getRightPaddedStr(scheduledPool.getLargestPoolSize(), ' ', 8) + " ??????: ????????????????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "MaximumPoolSize: .. " + StringUtil.getRightPaddedStr(scheduledPool.getMaximumPoolSize(), ' ', 8) + " ??????: ???????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "CompletedTaskCount: " + StringUtil.getRightPaddedStr(scheduledPool.getCompletedTaskCount(), ' ', 8) + " ??????: ????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "QueuedTaskCount: ..." + StringUtil.getRightPaddedStr(scheduledPool.getQueue().size(), ' ', 8) + " ??????: ???????????????????????????");
                c.getPlayer().dropMessage(-11, "TaskCount: ........ " + StringUtil.getRightPaddedStr(scheduledPool.getTaskCount(), ' ', 8) + " ??????: ?????????????????????????????????");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ???????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "??????????????????????????????[1-7]");
                return 0;
            }
            int poolId;
            try {
                poolId = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "?????????????????????ID??????.");
                return 0;
            }
            ScheduledThreadPoolExecutor scheduledPool;
            String name;
            switch (poolId) {
                case 1:
                    name = "World Timer";
                    scheduledPool = WorldTimer.getInstance().getSES();
                    break;
                case 2:
                    name = "Etc Timer";
                    scheduledPool = EtcTimer.getInstance().getSES();
                    break;
                case 3:
                    name = "Map Timer";
                    scheduledPool = MapTimer.getInstance().getSES();
                    break;
                case 4:
                    name = "Clone Timer";
                    scheduledPool = CloneTimer.getInstance().getSES();
                    break;
                case 5:
                    name = "Event Timer";
                    scheduledPool = EventTimer.getInstance().getSES();
                    break;
                case 6:
                    name = "Buff Timer";
                    scheduledPool = BuffTimer.getInstance().getSES();
                    break;
                case 7:
                    name = "Ping Timer";
                    scheduledPool = PingTimer.getInstance().getSES();
                    break;
                default:
                    return 0;
            }
            if (scheduledPool != null) {
                scheduledPool.purge();
                c.getPlayer().dropMessage(-11, "--------------------------------------------------------------------");
                c.getPlayer().dropMessage(-11, "????????????????????? : " + name + " ???????????????: " + poolId);
                c.getPlayer().dropMessage(-11, "ActiveCount: ...... " + StringUtil.getRightPaddedStr(scheduledPool.getActiveCount(), ' ', 8) + " ??????: ??????????????????????????????");
                c.getPlayer().dropMessage(-11, "CorePoolSize: ..... " + StringUtil.getRightPaddedStr(scheduledPool.getCorePoolSize(), ' ', 8) + " ??????: ???????????????");
                c.getPlayer().dropMessage(-11, "PoolSize: ......... " + StringUtil.getRightPaddedStr(scheduledPool.getPoolSize(), ' ', 8) + " ??????: ???????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "LargestPoolSize: .. " + StringUtil.getRightPaddedStr(scheduledPool.getLargestPoolSize(), ' ', 8) + " ??????: ????????????????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "MaximumPoolSize: .. " + StringUtil.getRightPaddedStr(scheduledPool.getMaximumPoolSize(), ' ', 8) + " ??????: ???????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "CompletedTaskCount: " + StringUtil.getRightPaddedStr(scheduledPool.getCompletedTaskCount(), ' ', 8) + " ??????: ????????????????????????????????????");
                c.getPlayer().dropMessage(-11, "QueuedTaskCount: ..." + StringUtil.getRightPaddedStr(scheduledPool.getQueue().size(), ' ', 8) + " ??????: ???????????????????????????");
                c.getPlayer().dropMessage(-11, "TaskCount: ........ " + StringUtil.getRightPaddedStr(scheduledPool.getTaskCount(), ' ', 8) + " ??????: ?????????????????????????????????");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ??????IP????????? extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleServerHandler.BlockIPList.clear();
            c.getPlayer().dropMessage(6, "????????????.");
            return 1;
        }
    }
}
