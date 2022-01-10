package handling.channel.handler;

import handling.world.messenger.MapleMessengerCharacter;
import handling.world.messenger.MapleMessenger;
import handling.world.party.MaplePartyCharacter;
import handling.world.party.MapleParty;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.skills.Skill;
import client.skills.SkillFactory;
import constants.GameConstants;
import constants.JobConstants;
import constants.ServerConstants;
import constants.skills.剑豪;
import constants.skills.管理员;
import handling.cashshop.CashShopServer;
import handling.cashshop.handler.CashShopOperation;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.*;
import handling.world.party.MapleExpedition;
import handling.world.guild.MapleGuild;

import java.util.List;

import org.apache.log4j.Logger;
import scripting.event.EventManager;

import scripting.npc.NPCScriptManager;
import server.MapleActivity;
import server.ServerProperties;
import server.WinStart;
import server.maps.FieldLimitType;
import server.quest.MapleQuest;
import server.shops.HiredMerchant;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Quadruple;
import tools.StringUtil;
import tools.data.input.LittleEndianAccessor;
import tools.packet.*;

public class InterServerHandler {

    private static final Logger log = Logger.getLogger(InterServerHandler.class);

    public static void EnterMTS(MapleClient c, MapleCharacter chr) {
        if (chr.hasBlockedInventory() || chr.getMap() == null || chr.getEventInstance() != null || c.getChannelServer() == null) {
            c.getSession().write(MaplePacketCreator.serverBlocked(5));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getMapId() == GameConstants.JAIL || ServerConstants.isBlockedMapFM(chr.getMapId())) {
            chr.dropMessage(1, "在这个地方无法使用此功能.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.isBanned()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getAntiMacro().inProgress()) {
            chr.dropMessage(5, "被使用测谎仪时无法操作。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        NPCScriptManager.getInstance().dispose(c);
        NPCScriptManager.getInstance().start(c, ServerProperties.getMTSNpcID(), ServerProperties.getMTSNpcID_Mode()); // ServerConstants.is奇幻() ? 9010057 : (ServerConstants.is芒果() ? 9310382 : 9900004)
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void EnterCS(MapleClient c, MapleCharacter chr, boolean script) {
        if (!script && ServerProperties.getCSNpcID() != 0) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, ServerProperties.getCSNpcID(), ServerProperties.getCSNpcID_Mode());
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!chr.isAlive() || chr.isInJailMap() || chr.isBanned() || chr.getAntiMacro().inProgress()) {
            String msg = "无法进入商城，请稍后再试。";
            if (!chr.isAlive()) {
                msg = "现在不能进入商城.";
            } else if (chr.isInJailMap()) {
                msg = "在这个地方无法使用次功能.";
            } else if (chr.getAntiMacro().inProgress()) {
                msg = "被使用测谎仪时无法操作。";
            }
            c.getPlayer().dropMessage(1, msg);
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (World.getPendingCharacterSize() >= 10) {
            chr.dropMessage(1, "服务器忙，请稍后在试。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        boolean isCheckTime = false;
        if (isCheckTime && !chr.isAdmin()) {
            //检测角色是否正常登录 3 分钟时间 3 * 60 * 1000
            long time = chr.getCheatTracker().getLastlogonTime();
            if (time + (3 * 60 * 1000) > System.currentTimeMillis()) {
                int seconds = (int) (((time + (3 * 60 * 1000)) - System.currentTimeMillis()) / 1000);
                chr.dropMessage(1, "暂时无法进入商城.\r\n请在 " + seconds + " 秒后在进行操作.");
                chr.dropMessage(5, "暂时无法进入商城.请在 " + seconds + " 秒后在进行操作.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
        }
        ChannelServer ch = ChannelServer.getInstance(c.getChannel());
        chr.changeRemoval();
        if (chr.getMessenger() != null) {
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
            WorldMessengerService.getInstance().leaveMessenger(chr.getMessenger().getId(), messengerplayer);
        }
        chr.updataEnterShop(true);
        chr.updateTodayDate();
        PlayerBuffStorage.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(chr.getId(), chr.getCooldowns());
        PlayerBuffStorage.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), -10);
        ch.removePlayer(chr);
        if (WinStart.getInstance() != null) {
            WinStart.getInstance().updatePlayerList(chr, false);
        }
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
        chr.saveToDB(false, false);
        chr.getMap().removePlayer(chr);
        c.getSession().write(MaplePacketCreator.getChannelChange(c, Integer.parseInt(CashShopServer.getIP().split(":")[1])));
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static void Loggedin(LittleEndianAccessor slea, int playerid, MapleClient c) {
        CharacterTransfer transfer = CashShopServer.getPlayerStorage().getPendingCharacter(playerid);
        if (transfer != null) {
            CashShopOperation.EnterCS(transfer, c);
            return;
        }
        MapleCharacter player;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            transfer = cserv.getPlayerStorage().getPendingCharacter(playerid);
            if (transfer != null) {
                c.setChannel(cserv.getChannel());
                break;
            }
        }
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
        boolean firstLoggedIn = true; //设置只有第1次登录的提示开关
        if (transfer == null) { // Player isn't in storage, probably isn't CC
            Quadruple<String, String, Integer, String> ip = LoginServer.getLoginAuth(playerid);
            String s = c.getSessionIPAddress();
            if (ip == null || (!s.substring(s.indexOf('/') + 1, s.length()).equals(ip.one) && !c.getMac().equals(macData))) {
                if (ip != null) {
                    LoginServer.putLoginAuth(playerid, ip.one, ip.two, ip.three, ip.four);
                } else {
                    c.getSession().close(true);
                    return;
                }
            }
            c.setTempIP(ip.two);
            c.setChannel(ip.three);
            player = MapleCharacter.loadCharFromDB(playerid, c, true);
        } else {
            player = MapleCharacter.ReconstructChr(transfer, c, true);
            firstLoggedIn = false;
        }
        slea.skip(13);
        long sessionId = slea.readLong();
        ChannelServer channelServer = c.getChannelServer();
        c.setPlayer(player);
        c.setSessionId(sessionId);
        if (sessionId != c.getSessionId()) {
            c.disconnect(true, false);
            return;
        }
        c.setAccID(player.getAccountID());
        if (!c.CheckIPAddress()) { // Remote hack
            String msg = "检测连接地址不合法 服务端断开这个连接 [角色ID: " + player.getId() + " 名字: " + player.getName() + " ]";
            c.getSession().close(true);
            log.info(msg);
            return;
        }
        int state = c.getLoginState();
        boolean allowLogin = false;
        String allowLoginTip = null;
        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL || state == MapleClient.LOGIN_NOTLOGGEDIN) {
            List<String> charNames = c.loadCharacterNames(c.getWorld());
            allowLogin = !World.isCharacterListConnected(charNames);
            if (!allowLogin) {
                allowLoginTip = World.getAllowLoginTip(charNames);
            }
        }
        //返回为 True 角色才能进入游戏
        if (!allowLogin) {
           
            c.setPlayer(null);
             c.账号断开全部角色(player.getAccountID());//断开远程客户端的连接
             channelServer.removePlayer(player);//113++ 角色卡在游戏里面的时候
              c.disconnect(true, false);
            c.getSession().close(true);
             String msg = "检测账号下已有角色登陆游戏 服务端断开这个连接 [角色ID: " + player.getId() + " 名字: " + player.getName() + " ]\r\n" + allowLoginTip;
            log.info(msg);
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());
        channelServer.addPlayer(player);
        if (WinStart.getInstance() != null) {
            WinStart.getInstance().updatePlayerList(player, true);
        }
        player.giveCoolDowns(PlayerBuffStorage.getCooldownsFromStorage(player.getId()));
        player.silentGiveBuffs(PlayerBuffStorage.getBuffsFromStorage(player.getId()));
        player.giveSilentDebuff(PlayerBuffStorage.getDiseaseFromStorage(player.getId()));
        c.getSession().write(MaplePacketCreator.cancelTitleEffect()); //V.112.1新增 不发送角色自己会看到自己顶着5个称号勋章
        //屏蔽灯泡任务
        for (MapleQuest ss : MapleQuest.GetBulbQuest()) {
            MapleQuestStatus marr1 = c.getPlayer().getQuestNAdd(ss);
            if (marr1 != null) {
                if (marr1.getStatus() == 0) {
                    marr1.setStatus((byte) 2);
                }
            }
        }

        //修复萌天使变身无限时间!!
        if (JobConstants.is爆莉萌天使(player.getJob())) {
            MapleQuestStatus marr = player.getQuestNAdd(MapleQuest.getInstance(7707));
            MapleQuestStatus marr1 = player.getQuestNAdd(MapleQuest.getInstance(29015));
            if ((marr != null && marr1 != null)) {
                if (marr.getStatus() == 0 && marr1.getStatus() == 0) {
                    marr.setStatus((byte) 1);
                    marr1.setStatus((byte) 1);
                }
            }
        }

        //神之子打开武器强化栏
        if (JobConstants.is神之子(player.getJob())) {
            MapleQuestStatus marr = player.getQuestNAdd(MapleQuest.getInstance(40905));
            if ((marr != null)) {
                if (marr.getStatus() == 0) {
                    marr.setStatus((byte) 2);
                }
            }
        }

        c.getPlayer().checkNameLevel();
        c.getPlayer().initSigninStatus();
        c.getSession().write(MaplePacketCreator.getCharInfo(player));
        //c.getSession().write(MaplePacketCreator.ShowAranCombo(0));38
        c.getSession().write(MaplePacketCreator.sendloginSuccess()); //不发送会导致碰怪减万血
        //更新坐骑属性状态
        c.getSession().write(MaplePacketCreator.updateMount(player, false));
        //键盘设置
        c.getSession().write(MaplePacketCreator.getKeymap(player));
        //发送MapleQuickSlot的信息
        c.getSession().write(MaplePacketCreator.getQuickSlot(player.getQuickSlot()));
        //自动加血和蓝
        player.updatePetAuto();
        //加载每日签到数据
        c.getSession().write(SigninPacket.showSigninUI());
        //技能宏
        player.sendMacros();
        //刷新抵用卷
        c.getSession().write(MaplePacketCreator.showCharCash(player));
        //设置玩家举报为空
        c.getSession().write(MaplePacketCreator.reportResponse((byte) 0, 0));
        //启用举报系统
        c.getSession().write(MaplePacketCreator.enableReport());
        //如果是GM就给角色隐身模式BUFF
        if (player.isIntern()) {
            SkillFactory.getSkill(管理员.隐藏术).getEffect(1).applyTo(player);
        }
        player.getMap().addPlayer(player);
        try {
            // 开始发送好友你上线的信息
            int buddyIds[] = player.getBuddylist().getBuddyIds();
            WorldBuddyService.getInstance().loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds);
            // 开始处理组队和远征信息
            MapleParty party = player.getParty();
            if (party != null) {
                WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, new MaplePartyCharacter(player));
                if (party.getExpeditionId() > 0) {
                    MapleExpedition me = WrodlPartyService.getInstance().getExped(party.getExpeditionId());
                    if (me != null) {
                        c.getSession().write(PartyPacket.expeditionStatus(me, false));
                    }
                }
            }
            if (player.getSidekick() == null) {
                player.setSidekick(WorldSidekickService.getInstance().getSidekickByChr(player.getId()));
            }
            if (player.getSidekick() != null) {
                c.getSession().write(PartyPacket.updateSidekick(player, player.getSidekick(), false));
            }
            // 开始发送好友列表
            CharacterIdChannelPair[] onlineBuddies = WorldFindService.getInstance().multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                player.getBuddylist().get(onlineBuddy.getCharacterId()).setChannel(onlineBuddy.getChannel());
            }
            c.getSession().write(BuddyListPacket.updateBuddylist(player.getBuddylist().getBuddies()));
            c.getSession().write(BuddyListPacket.updateBuddylistEnd());
            // 开始发送玩家送到的一些未处理的消息
            MapleMessenger messenger = player.getMessenger();
            if (messenger != null) {
                WorldMessengerService.getInstance().silentJoinMessenger(messenger.getId(), new MapleMessengerCharacter(player));
                WorldMessengerService.getInstance().updateMessenger(messenger.getId(), player.getName(), c.getChannel());
            }
            // 开始发送家族和家族联盟信息
            if (player.getGuildId() > 0) {
                WorldGuildService.getInstance().setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().write(GuildPacket.showGuildInfo(player));
                MapleGuild gs = WorldGuildService.getInstance().getGuild(player.getGuildId());
                if (gs != null) {
                    List<byte[]> packetList = WorldAllianceService.getInstance().getAllianceInfo(gs.getAllianceId(), true);
                    if (packetList != null) {
                        for (byte[] pack : packetList) {
                            if (pack != null) {
                                c.getSession().write(pack);
                            }
                        }
                    }
                } else { // 没有家族和联盟就设置为默认
                    player.setGuildId(0);
                    player.setGuildRank((byte) 5);
                    player.setAllianceRank((byte) 5);
                    player.saveGuildStatus();
                }
            }
            // 开始发送学院信息
            if (player.getFamilyId() > 0) {
                WorldFamilyService.getInstance().setFamilyMemberOnline(player.getMFC(), true, c.getChannel());
            }
            c.getSession().write(FamilyPacket.getFamilyData());
            c.getSession().write(FamilyPacket.getFamilyInfo(player));
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.Login_Error, e);
        }
        //发送游戏顶部公告信息
        player.getClient().getSession().write(MaplePacketCreator.serverMessage(channelServer.getServerMessage()));
        //显示小字条消息
        player.showNote();
        //道具宝宝的信息
        player.sendImp();
        //检测灵魂武器
        if (player.checkSoulWeapon()) {
            c.getSession().write(BuffPacket.giveSoulGauge(player.getSoulCount(), player.getEquippedSoulSkill()));
        }
        //更新组队HP
        player.updatePartyMemberHP();
        //开始计算角色精灵吊坠时间
        player.startFairySchedule(false);
        //修复3转以上角色技能 如果没有就修复
        player.baseSkills();
        //检测物品时间
        player.expirationTask();
        //检测狂龙战士变形值消失
        player.morphLostTask();
        //如果角色是黑骑士就开始检测黑暗力量状态
        if (player.getJob() == 132) {
            player.checkBerserk();
        }
        //显示夜光的光暗能量点数
        if (player.getJob() == 2700 || player.getJob() == 2710 || player.getJob() == 2711 || player.getJob() == 2712) {
            c.getSession().write(BuffPacket.updateLuminousGauge(player));
        }
        //召唤宠物
        player.spawnSavedPets();
        //天使戒指的召唤兽
        if (player.getStat().equippedSummon > 0) {
            Skill skill = SkillFactory.getSkill(player.getStat().equippedSummon);
            if (skill != null) {
                skill.getEffect(1).applyTo(player);
            }
        }
        //对检测是否能进入商城的时间进行重置
        player.getCheatTracker().getLastlogonTime();
        //发送项链扩充信息
        MapleQuestStatus stat = player.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
        c.getSession().write(MaplePacketCreator.pendantSlot(stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) > System.currentTimeMillis()));
        //发送登录提示 只有第1次才有
        if (firstLoggedIn) {
            if (player.getLevel() == 1) {
                if (ServerConstants.is奇幻()) {
                    NPCScriptManager.getInstance().dispose(c);
                    NPCScriptManager.getInstance().start(c, 9330370);
                    c.getSession().write(MaplePacketCreator.enableActions());
                } else {
                    player.dropMessage(1, "欢迎来到 " + c.getChannelServer().getServerName() + ", " + player.getName() + " ！\r\n使用 @help 可以查看您当前能使用的命令\r\n祝您玩的愉快！");
                    player.dropMessage(5, "使用 @help 可以查看您当前能使用的命令 祝您玩的愉快！");
                    player.gainExp(500, true, false, true);
                }
            } else {
                // 活跃度提示
                MapleActivity.loginTip(c);
                player.dropSpouseMessage(0x0A, "[系统提示] 如果发现宠物不捡取道具，请打开角色装备栏 - 宠物 - 拾取道具 打上勾。");

                //检测玩家雇佣商店状态
                HiredMerchant merchant = World.getMerchant(player.getAccountID(), player.getId());
                final byte stateHiredMerchant = MapleCharacter.checkExistance(player.getAccountID(), player.getId());
                if (stateHiredMerchant == 1 && merchant == null) {
                    player.dropMessage(1, "请通过弗兰德里取回保管的物品");
                } else {
                    if (ServerConstants.is奇幻()) {
                        player.dropMessage(1, "欢迎来到 ◤" + c.getChannelServer().getServerName() + "◢\r\n\r\n使用 @help 可以查看可用的命令\r\n\r\n请保管好自己的游戏帐号，不要在QQ交流群和游戏中随便透露自己的帐号信息。本服管理不会找玩家索要游戏帐号。如果玩家私下交易或者透露自己的帐号信息导致被骗或者装备被盗后果自负。");
                    } else {
                        player.dropMessage(1, "欢迎来到 " + c.getChannelServer().getServerName() + ", " + player.getName() + " ！\r\n使用 @help 可以查看您当前能使用的命令\r\n请保管好自己的游戏帐号，不要在QQ交流群和游戏中随便透露自己的帐号信息。本服管理不会找玩家索要游戏帐号。如果玩家私下交易或者透露自己的帐号信息导致被骗或者装备被盗后果自负。");
                    }
                }
            }
            if (c.getChannelServer().getDoubleExp() == 2) {
                player.dropSpouseMessage(0x14, "[系统提示] 当前服务器处于双倍经验活动中，祝您玩的愉快！");
            }
            if (c.getChannelServer().getAutoPaoDian() == 2) {
                player.dropSpouseMessage(0x19, "[系统提示] 当前服务器处于双倍在线泡点活动中，祝您玩的愉快！");
            }
            //发送显示角色点卷抵用卷的信息
            c.getSession().write(MaplePacketCreator.showPlayerCash(player));

            if (player.getJob() == 6001 && player.getLevel() < 10) {
                while (player.getLevel() < 10) {
                    player.gainExp(5000, true, false, true);
                }
            }
            //检测玩家点卷和抵用卷的总和大于90万或者国庆币大于800个 充值记录小于200元 且玩家不是管理员
            if (!player.isIntern()) {
                if (c.getChannelServer().isCheckCash() && (player.getItemQuantity(4000463) >= 800 || player.getCSPoints(-1) >= 900000)) {
                    String msgtext = "玩家 " + player.getName() + " 数据异常，服务器自动断开他的连接。" + " 国庆币数量: " + player.getItemQuantity(4000463) + " 点卷总额: " + player.getCSPoints(-1);
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + msgtext));
                    FileoutputUtil.log(FileoutputUtil.数据异常, msgtext);
                    c.getSession().close(true);
                } else if (c.getChannelServer().isCheckSp() && player.checkMaxStat()) {
                    String msgtext = "玩家 " + player.getName() + "  属性点异常，服务器自动断开他的连接。当前角色总属性点为: " + player.getPlayerStats() + " 职业: " + player.getJob() + " 等级: " + player.getLevel();
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + msgtext));
                    FileoutputUtil.log(FileoutputUtil.数据异常, msgtext);
                    c.getSession().close(true);
                }
            }
        }
        //发送这个封包可以解除角色属性异常
        c.getSession().write(InventoryPacket.getInventoryStatus());
        // 名流爆击
        player.AutoCelebrityCrit();
        // 豹弩游侠
        if (JobConstants.is豹弩游侠(player.getJob())) { //弩豹游侠
            c.getSession().write(MaplePacketCreator.updateJaguar(c.getPlayer()));
            String info = "";
            for (int i = 1; i <= 9; i++) {
                info += i + "=" + "1";
                if (i != 9) {
                    info += ";";
                }
            }
            c.getSession().write(MaplePacketCreator.updateInfoQuest(GameConstants.美洲豹管理, info));
        }
        // 剑豪
        if (JobConstants.is剑豪(c.getPlayer().getJob())) {
            SkillFactory.getSkill(剑豪.基本姿势加成).getEffect(1).applyTo(c.getPlayer());
        }
        // 解决进入商城卡在线时间的问题.
        player.fixOnlineTime();
        //打开尖兵电池
//        c.getPlayer().startPower();
        //每日登陆处理
        EventManager pl = c.getChannelServer().getEventSM().getEventManager("PlayerLogin");
        if (pl != null) {
            pl.start("start", player);
        }
    }

    public static void ChangeChannel(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getEventInstance() != null || chr.getMap() == null || chr.isInBlockedMap() || FieldLimitType.ChannelSwitch.check(chr.getMap().getFieldLimit())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.isBanned()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getAntiMacro().inProgress()) {
            chr.dropMessage(5, "被使用测谎仪时无法操作。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (World.getPendingCharacterSize() >= 10) {
            chr.dropMessage(1, "服务器忙，请稍后在试。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int chc = slea.readByte() + 1;
        if (!World.isChannelAvailable(chc)) {
            chr.dropMessage(1, "该频道玩家已满，请切换到其它频道进行游戏。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.changeChannel(chc);
    }

    public static void ChangePlayer(LittleEndianAccessor slea, MapleClient c) {
//        c.getPlayer().dropMessage(1, "当前暂不支持此功能.");
        char[] ss = new char[256];
        int i = 0;
        while (i < ss.length) {
            int f = (int) (Math.random() * 3);
            if (f == 0) {
                ss[i] = (char) ('A' + Math.random() * 26);
            } else if (f == 1) {
                ss[i] = (char) ('a' + Math.random() * 26);
            } else {
                ss[i] = (char) ('0' + Math.random() * 10);
            }
            i++;
        }
        String key = new String(ss);
        LoginServer.pubLoginAuthKey(key, c.getAccountName(), c.getChannel());
        c.getSession().write(LoginPacket.changePlayerKey(key));
    }
}
