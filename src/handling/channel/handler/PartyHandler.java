package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.World;
import handling.world.WorldFindService;
import handling.world.WorldSidekickService;
import handling.world.WrodlPartyService;
import handling.world.party.ExpeditionType;
import handling.world.party.MapleExpedition;
import handling.world.party.PartySearch;
import handling.world.party.PartySearchType;
import handling.world.sidekick.MapleSidekick;

import java.util.ArrayList;
import java.util.List;

import server.ServerProperties;
import server.maps.events.Event_DojoAgent;
import server.quest.MapleQuest;
import tools.MaplePacketCreator;
import tools.StringUtil;
import tools.data.input.LittleEndianAccessor;
import tools.packet.PartyPacket;

public class PartyHandler {

    /*
     * 第2方收到的组队信息
     * 同意或者拒绝加入队伍
     */
    public static void DenyPartyRequest(LittleEndianAccessor slea, MapleClient c) {
        int action = slea.readByte();
        int fromId = slea.readInt();
        WrodlPartyService partyService = WrodlPartyService.getInstance();
        switch (action) {
            case 0x20: //玩家收到组队 手动邀请
            case 0x21:
            case 0x23: //玩家收到组队 推荐列表
            case 0x42: //申请加入队伍 组队列表
                break;
            case 0x24: //拒绝组队
            case 0x25:
            case 0x48: //拒绝组队 - 组队列表
                MapleCharacter cfrom = c.getChannelServer().getPlayerStorage().getCharacterById(fromId);
                if (cfrom != null) {
                    cfrom.dropMessage(5, "'" + c.getPlayer().getName() + "'玩家拒绝了组队招待。");
                }
                break;
            case 0x26: //同意组队
            case 0x3B:
            case 0x49: //同意组队 - 组队列表
                if (c.getPlayer().getParty() != null) {
                    c.getPlayer().dropMessage(5, "您已经有一个组队，无法加入其他组队!");
                    return;
                }
                MapleParty toParty = partyService.getPartyByLeaderId(fromId);
                if (toParty == null) {
                    c.getPlayer().dropMessage(5, "要参加的队伍不存在。");
                    return;
                }
                if (toParty.getExpeditionId() > 0) {
                    c.getPlayer().dropMessage(5, "要加入的队伍为远征小队，无法进行此操作。");
                    return;
                }
                if (toParty.getMembers().size() < 6) {
                    c.getPlayer().setParty(toParty);
                    partyService.updateParty(toParty.getPartyId(), PartyOperation.加入队伍, new MaplePartyCharacter(c.getPlayer()));
                    c.getPlayer().receivePartyMemberHP();
                    c.getPlayer().updatePartyMemberHP();
                } else {
                    c.getPlayer().dropMessage(5, "组队成员已满");
                }
                break;
            default:
                System.out.println("第二方收到组队邀请处理( 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(action).toUpperCase(), '0', 2) + " ) 未知.");
                break;
        }
    }

    /*
     * 组队操作
     */
    public static void PartyOperation(LittleEndianAccessor slea, MapleClient c) {
        int operation = slea.readByte();
        MapleParty party = c.getPlayer().getParty();
        WrodlPartyService partyService = WrodlPartyService.getInstance();
        MaplePartyCharacter partyPlayer = new MaplePartyCharacter(c.getPlayer());
        switch (operation) {
            case 0x01: // 创建队伍
                boolean isHidden = slea.readByte() == 0;
                String partyName = slea.readMapleAsciiString();
                if (party == null) {
                    party = partyService.createParty(partyPlayer, partyName, isHidden);
                    c.getPlayer().setParty(party);
                    c.getSession().write(PartyPacket.partyCreated(party));
                } else {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    if (partyPlayer.equals(party.getLeader()) && party.getMembers().size() == 1) {
                        c.getSession().write(PartyPacket.partyCreated(party));
                    } else {
                        c.getPlayer().dropMessage(5, "你已经存在一个队伍中，无法创建！");
                    }
                }
                break;
            case 0x02: // 离开队伍
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    if (partyPlayer.equals(party.getLeader())) { // 如果离开的玩家是队长就解散队伍
                        if (GameConstants.isDojo(c.getPlayer().getMapId())) {
                            Event_DojoAgent.failed(c.getPlayer());
                        }
                        if (c.getPlayer().getPyramidSubway() != null) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.解散队伍, partyPlayer);
                        if (c.getPlayer().getEventInstance() != null) {
                            c.getPlayer().getEventInstance().disbandParty();
                        }
                    } else {
                        if (GameConstants.isDojo(c.getPlayer().getMapId())) {
                            Event_DojoAgent.failed(c.getPlayer());
                        }
                        if (c.getPlayer().getPyramidSubway() != null) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.离开队伍, partyPlayer);
                        if (c.getPlayer().getEventInstance() != null) {
                            c.getPlayer().getEventInstance().leftParty(c.getPlayer());
                        }
                    }
                    c.getPlayer().setParty(null);
                }
                break;
            case 0x03: // 加入队伍
                int partyid = slea.readInt();
                if (party != null) {
                    c.getPlayer().dropMessage(5, "您已经有一个组队，无法加入其他组队!");
                    return;
                }
                party = partyService.getParty(partyid);
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    if (party.getMembers().size() < 6) {
                        c.getPlayer().setParty(party);
                        partyService.updateParty(party.getPartyId(), PartyOperation.加入队伍, partyPlayer);
                        c.getPlayer().receivePartyMemberHP();
                        c.getPlayer().updatePartyMemberHP();
                    } else {
                        c.getPlayer().dropMessage(5, "组队成员已满");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "要加入的队伍不存在");
                }
                break;
            case 0x04: // 组队邀请
                if (party == null) { //玩家进行组队邀请 如果玩家的队伍为空 就新建1个队伍信息
                    party = partyService.createParty(partyPlayer);
                    c.getPlayer().setParty(party);
                    c.getSession().write(PartyPacket.partyCreated(party));
                }
                String theName = slea.readMapleAsciiString();
                int theCh = WorldFindService.getInstance().findChannel(theName);
                if (theCh > 0) {
                    MapleCharacter invited = ChannelServer.getInstance(theCh).getPlayerStorage().getCharacterByName(theName);
                    if (invited != null) {
                        if (party.getExpeditionId() > 0) {
                            c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        } else if (invited.getParty() != null) {
                            c.getPlayer().dropMessage(5, "'" + theName + "'已经加入其他组。");
                        } else if (invited.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PARTY_INVITE)) != null) {
                            c.getPlayer().dropMessage(5, "'" + theName + "'玩家处于拒绝组队状态。");
                        } else if (party.getMembers().size() < 6) {
                            c.getSession().write(PartyPacket.partyStatusMessage(0x21, invited.getName()));
                            invited.getClient().getSession().write(PartyPacket.partyInvite(c.getPlayer()));
                        } else {
                            c.getPlayer().dropMessage(5, "组队成员已满");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "在当前服务器找不到..'" + theName + "'。");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "在当前服务器找不到..'" + theName + "'。");
                }
                break;
            case 0x06: // 驱逐成员
                if (party != null && partyPlayer != null && partyPlayer.equals(party.getLeader())) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    MaplePartyCharacter expelled = party.getMemberById(slea.readInt());
                    if (expelled != null) {
                        if (GameConstants.isDojo(c.getPlayer().getMapId()) && expelled.isOnline()) {
                            Event_DojoAgent.failed(c.getPlayer());
                        }
                        if (c.getPlayer().getPyramidSubway() != null && expelled.isOnline()) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.驱逐成员, expelled);
                        if (c.getPlayer().getEventInstance() != null) {
                            if (expelled.isOnline()) {
                                c.getPlayer().getEventInstance().disbandParty();
                            }
                        }
                    }
                }
                break;
            case 0x07: // 改变队长
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    MaplePartyCharacter newleader = party.getMemberById(slea.readInt());
                    if (newleader != null && partyPlayer.equals(party.getLeader())) {
                        partyService.updateParty(party.getPartyId(), PartyOperation.改变队长, newleader);
                    }
                }
                break;
            case 0x08: //寻找组队后退出自己的队伍然后加入别人的队伍
                //检测是否有队伍 如果有就退出以前的队伍
                if (party != null) {
                    if (c.getPlayer().getEventInstance() != null || c.getPlayer().getPyramidSubway() != null || party.getExpeditionId() > 0 || GameConstants.isDojo(c.getPlayer().getMapId())) {
                        c.getPlayer().dropMessage(5, "加入远征队伍的状态下无法进行此操作。");
                        return;
                    }
                    if (partyPlayer.equals(party.getLeader())) { // 如果玩家有队伍而且是队长就解散这个队伍
                        partyService.updateParty(party.getPartyId(), PartyOperation.解散队伍, partyPlayer);
                    } else { //玩家是队员就离开这个队伍
                        partyService.updateParty(party.getPartyId(), PartyOperation.离开队伍, partyPlayer);
                    }
                    c.getPlayer().setParty(null);
                }
                //在检测1次是否还有组队
                party = c.getPlayer().getParty();
                if (party != null) {
                    c.getPlayer().dropMessage(5, "无法退出或解散以前的队伍，请手动退出队伍后在进行操作。");
                    return;
                }
                //现在处理需要加入的队伍
                int toPartyId = slea.readInt();
                party = partyService.getParty(toPartyId);
                if (party != null && party.getMembers().size() < 6) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "该队伍为远征小队，无法进行此操作加入队伍中。");
                        return;
                    }
                    MapleCharacter cfrom = c.getPlayer().getMap().getCharacterById(party.getLeader().getId());
                    if (cfrom != null) {
                        c.getSession().write(PartyPacket.partyStatusMessage(0x42, cfrom.getName()));
                        cfrom.getClient().getSession().write(PartyPacket.partyRequestInvite(c.getPlayer()));
                    } else {
                        c.getPlayer().dropMessage(5, "没有在该地图找此队伍的队长.");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "要加入的队伍不存在或者人数已满");
                }
                break;
            case 0x09: //在搜索组队界面设置是否容许其他玩家加入队伍
                break;
            case 0x0D: //修改队伍设置
                isHidden = slea.readByte() == 0;
                partyName = slea.readMapleAsciiString();
                if (party != null) {
                    partyService.updatePartySetup(party.getPartyId(), PartyOperation.队伍设置, partyName, isHidden);
                }
                break;
            default:
                if (ServerProperties.ShowPacket()) {
                    System.out.println("组队邀请处理( " + operation + " ) 未知.");
                }
                break;
        }
    }

    public static void AllowPartyInvite(LittleEndianAccessor slea, MapleClient c) {
        if (slea.readByte() > 0) {
            c.getPlayer().getQuestRemove(MapleQuest.getInstance(GameConstants.PARTY_INVITE));
        } else {
            c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.PARTY_INVITE));
        }
    }

    public static void DenySidekickRequest(LittleEndianAccessor slea, MapleClient c) {
        int action = slea.readByte();
        int cid = slea.readInt();
        if (c.getPlayer().getSidekick() == null && action == 0x5A) { //accept
            MapleCharacter party = c.getPlayer().getMap().getCharacterById(cid);
            if (party != null) {
                if (party.getSidekick() != null || !MapleSidekick.checkLevels(c.getPlayer().getLevel(), party.getLevel())) {
                    return;
                }
                int sid = WorldSidekickService.getInstance().createSidekick(c.getPlayer().getId(), party.getId());
                if (sid <= 0) {
                    c.getPlayer().dropMessage(5, "Please try again.");
                } else {
                    MapleSidekick s = WorldSidekickService.getInstance().getSidekick(sid);
                    c.getPlayer().setSidekick(s);
                    c.getSession().write(PartyPacket.updateSidekick(c.getPlayer(), s, true));
                    party.setSidekick(s);
                    party.getClient().getSession().write(PartyPacket.updateSidekick(party, s, true));
                }
            } else {
                c.getPlayer().dropMessage(5, "The sidekick you are trying to join does not exist");
            }
        }
    }

    public static void SidekickOperation(LittleEndianAccessor slea, MapleClient c) {
        int operation = slea.readByte();
        switch (operation) {
            case 0x41: // create
                if (c.getPlayer().getSidekick() == null) {
                    MapleCharacter other = c.getPlayer().getMap().getCharacterByName(slea.readMapleAsciiString());
                    if (other.getSidekick() == null && MapleSidekick.checkLevels(c.getPlayer().getLevel(), other.getLevel())) {
                        other.getClient().getSession().write(PartyPacket.sidekickInvite(c.getPlayer()));
                        c.getPlayer().dropMessage(1, "You have sent the sidekick invite to " + other.getName() + ".");
                    }
                }
                break;
            case 0x3F: // leave
                if (c.getPlayer().getSidekick() != null) {
                    c.getPlayer().getSidekick().eraseToDB();
                }
                break;
        }
    }

    /*
     * 搜索成员
     */
    public static void MemberSearch(LittleEndianAccessor slea, MapleClient c) {
        if (c != null && c.getPlayer() != null) {
            if (c.getPlayer().isInBlockedMap()) {
                c.getPlayer().dropMessage(5, "无法在这个地方进行搜索.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            List<MapleCharacter> members = new ArrayList<>();
            for (MapleCharacter findchr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                if (findchr != null && findchr.getId() != c.getPlayer().getId() && !members.contains(c.getPlayer()) && !findchr.isHidden() && findchr.getParty() == null) {
                    members.add(findchr);
                }
            }
            c.getSession().write(PartyPacket.showMemberSearch(members));
        }
    }

    /*
     * 搜索队伍
     */
    public static void PartySearch(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().isInBlockedMap()) {
            c.getPlayer().dropMessage(5, "无法在这个地方进行搜索.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleParty party = c.getPlayer().getParty();
        List<MapleParty> parties = new ArrayList<>();
        for (MapleCharacter findchr : c.getPlayer().getMap().getCharactersThreadsafe()) {
            if (findchr.getParty() != null && !findchr.isHidden() && !findchr.getParty().isHidden()) {
                if (party != null && findchr.getParty().getPartyId() == party.getPartyId()) {
                    continue;
                }
                if (!parties.contains(findchr.getParty())) {
                    parties.add(findchr.getParty());
                }
            }
        }
        c.getSession().write(PartyPacket.showPartySearch(parties));
    }

    public static void PartyListing(LittleEndianAccessor slea, MapleClient c) {
        int mode = slea.readByte();
        WrodlPartyService partyService = WrodlPartyService.getInstance();
        PartySearchType pst;
        MapleParty party;
        int typeId;
        switch (mode) {
            case 0x79: //
                break;
            case 0x72: //添加远征队信息
                typeId = slea.readInt();
                pst = PartySearchType.getById(typeId);
                if (pst == null || c.getPlayer().getLevel() > pst.maxLevel || c.getPlayer().getLevel() < pst.minLevel) {
                    System.out.println("创建远征队信息不符合条件 - 类型: " + (pst == null) + " ID: " + typeId);
                    return;
                }
                if (c.getPlayer().getParty() == null && partyService.searchParty(pst).size() < 10) {
                    party = partyService.createParty(new MaplePartyCharacter(c.getPlayer()), pst.id);
                    c.getPlayer().setParty(party);
                    c.getSession().write(PartyPacket.partyCreated(party));
                    PartySearch ps = new PartySearch(slea.readMapleAsciiString(), pst.exped ? party.getExpeditionId() : party.getPartyId(), pst);
                    partyService.addSearch(ps);
                    if (pst.exped) {
                        c.getSession().write(PartyPacket.expeditionStatus(partyService.getExped(party.getExpeditionId()), true));
                    }
                    c.getSession().write(PartyPacket.partyListingAdded(ps));
                } else {
                    c.getPlayer().dropMessage(1, "您已经有个1个队伍了，请离开队伍后在进行尝试。");
                }
                break;
            case 0x73: //取消添加远征广告信息
                party = c.getPlayer().getParty();
                if (party != null) {
                    PartySearch toRemove = partyService.getSearchByParty(party.getPartyId());
                    if (toRemove != null) {
                        partyService.removeSearch(toRemove, "组队广告已被删除。");
                    } else {
                        System.out.println("取消添加远征广告信息 - 广告信息为空");
                    }
                } else {
                    System.out.println("取消添加远征广告信息 - 是否有队伍: " + (party != null));
                }
                break;
            case 0x74: //显示远征队列表信息
                typeId = slea.readInt();
                pst = PartySearchType.getById(typeId);
                if (pst == null || c.getPlayer().getLevel() > pst.maxLevel || c.getPlayer().getLevel() < pst.minLevel) {
                    System.out.println("显示远征队信息不符合条件 - 类型是否为空: " + (pst == null) + " ID: " + typeId);
                    return;
                }
                c.getSession().write(PartyPacket.getPartyListing(pst));
                break;
            case 0x75: //关闭寻找远征队
                break;
            case 0x76: //加入远征队
                party = c.getPlayer().getParty();
                MaplePartyCharacter partyPlayer = new MaplePartyCharacter(c.getPlayer());
                if (party == null) { //are we in a party? o.O"
                    int theId = slea.readInt();
                    party = partyService.getParty(theId);
                    if (party != null) {
                        PartySearch ps = partyService.getSearchByParty(party.getPartyId());
                        if (ps != null && c.getPlayer().getLevel() <= ps.getType().maxLevel && c.getPlayer().getLevel() >= ps.getType().minLevel && party.getMembers().size() < 6) {
                            c.getPlayer().setParty(party);
                            partyService.updateParty(party.getPartyId(), PartyOperation.加入队伍, partyPlayer);
                            c.getPlayer().receivePartyMemberHP();
                            c.getPlayer().updatePartyMemberHP();
                        } else {
                            c.getSession().write(PartyPacket.partyStatusMessage(0x11));
                        }
                    } else {
                        MapleExpedition exped = partyService.getExped(theId);
                        if (exped != null) {
                            PartySearch ps = partyService.getSearchByExped(exped.getId());
                            if (ps != null && c.getPlayer().getLevel() <= ps.getType().maxLevel && c.getPlayer().getLevel() >= ps.getType().minLevel && exped.getAllMembers() < exped.getType().maxMembers) {
                                int partyId = exped.getFreeParty();
                                if (partyId < 0) {
                                    c.getSession().write(PartyPacket.partyStatusMessage(0x11));
                                } else if (partyId == 0) { //signal to make a new party
                                    party = partyService.createPartyAndAdd(partyPlayer, exped.getId());
                                    c.getPlayer().setParty(party);
                                    c.getSession().write(PartyPacket.partyCreated(party));
                                    c.getSession().write(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(c.getPlayer().getName()), null);
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                } else {
                                    c.getPlayer().setParty(partyService.getParty(partyId));
                                    partyService.updateParty(partyId, PartyOperation.加入队伍, partyPlayer);
                                    c.getPlayer().receivePartyMemberHP();
                                    c.getPlayer().updatePartyMemberHP();
                                    c.getSession().write(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(c.getPlayer().getName()), null);
                                }
                            } else {
                                c.getSession().write(PartyPacket.expeditionInviteMessage(0, c.getPlayer().getName())); //在当前服务器找不到‘xxxx’。
                            }
                        }
                    }
                } else {
                    c.getPlayer().dropMessage(1, "您已经有队伍，请退出队伍后在试.");
                }
                break;
            default:
                if (ServerProperties.ShowPacket()) {
                    System.out.println("Unknown PartyListing : 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(mode).toUpperCase(), '0', 2) + " " + slea);
                }
                break;
        }
    }

    /*
     * 远征队伍操作
     */
    public static void Expedition(LittleEndianAccessor slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (player == null || player.getMap() == null) {
            return;
        }
        int mode = slea.readByte();
        WrodlPartyService partyService = WrodlPartyService.getInstance();
        MapleParty part, party;
        String name;
        int partySearchId;
        switch (mode) {
            case 0x4E: //创建远征队 create [PartySearchID]
                partySearchId = slea.readInt();
                ExpeditionType et = ExpeditionType.getById(partySearchId);
                if (et != null && player.getParty() == null && player.getLevel() <= et.maxLevel && player.getLevel() >= et.minLevel) {
                    party = partyService.createParty(new MaplePartyCharacter(player), et.exped);
                    player.setParty(party);
                    c.getSession().write(PartyPacket.partyCreated(party));
                    c.getSession().write(PartyPacket.expeditionStatus(partyService.getExped(party.getExpeditionId()), true));
                } else {
                    c.getSession().write(PartyPacket.expeditionInviteMessage(0, "远征模式ID[" + partySearchId + "]"));
                }
                break;
            case 0x4F: //远征邀请 invite [name]
                name = slea.readMapleAsciiString();
                int theCh = WorldFindService.getInstance().findChannel(name);
                if (theCh > 0) {
                    MapleCharacter invited = ChannelServer.getInstance(theCh).getPlayerStorage().getCharacterByName(name);
                    party = c.getPlayer().getParty();
                    if (invited != null && invited.getParty() == null && party != null && party.getExpeditionId() > 0) {
                        MapleExpedition me = partyService.getExped(party.getExpeditionId());
                        if (me != null && me.getAllMembers() < me.getType().maxMembers && invited.getLevel() <= me.getType().maxLevel && invited.getLevel() >= me.getType().minLevel) {
                            c.getSession().write(PartyPacket.expeditionInviteMessage(0x07, invited.getName()));
                            invited.getClient().getSession().write(PartyPacket.expeditionInvite(player, me.getType().exped));
                        } else {
                            c.getSession().write(PartyPacket.expeditionInviteMessage(3, invited.getName())); //‘xxxx’的等级不符，无法邀请加入远征队。
                        }
                    } else {
                        c.getSession().write(PartyPacket.expeditionInviteMessage(2, name)); //‘xxxx’已经加入了其他队伍。
                    }
                } else {
                    c.getSession().write(PartyPacket.expeditionInviteMessage(0, name)); //在当前服务器找不到‘xxxx’。
                }
                break;
            case 0x50: //接受远征邀请 accept invite [name] [int - 7, then int 8? lol.]
                name = slea.readMapleAsciiString();
                slea.readInt(); //partySearchId
                int action = slea.readInt();
                int theChh = WorldFindService.getInstance().findChannel(name);
                if (theChh > 0) {
                    MapleCharacter cfrom = ChannelServer.getInstance(theChh).getPlayerStorage().getCharacterByName(name);
                    if (cfrom != null && cfrom.getParty() != null && cfrom.getParty().getExpeditionId() > 0) {
                        party = cfrom.getParty();
                        MapleExpedition exped = partyService.getExped(party.getExpeditionId());
                        if (exped != null && action == 8) {
                            if (player.getLevel() <= exped.getType().maxLevel && player.getLevel() >= exped.getType().minLevel && exped.getAllMembers() < exped.getType().maxMembers) {
                                int partyId = exped.getFreeParty();
                                if (partyId < 0) {
                                    c.getSession().write(PartyPacket.partyStatusMessage(0x11));
                                } else if (partyId == 0) { //signal to make a new party
                                    party = partyService.createPartyAndAdd(new MaplePartyCharacter(player), exped.getId());
                                    player.setParty(party);
                                    c.getSession().write(PartyPacket.partyCreated(party));
                                    c.getSession().write(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(player.getName()), null);
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                } else {
                                    player.setParty(partyService.getParty(partyId));
                                    partyService.updateParty(partyId, PartyOperation.加入队伍, new MaplePartyCharacter(player));
                                    player.receivePartyMemberHP();
                                    player.updatePartyMemberHP();
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(player.getName()), null);
                                    c.getSession().write(PartyPacket.expeditionStatus(exped, false));
                                }
                            } else {
                                c.getSession().write(PartyPacket.expeditionInviteMessage(3, cfrom.getName())); //‘xxxx’的等级不符，无法邀请加入远征队
                            }
                        } else if (action == 9) { //拒绝远征队邀请
                            cfrom.dropMessage(5, "'" + player.getName() + "'拒绝了远征队邀请。");
                        }
                    }
                }
                break;
            case 0x51: //离开远征队伍 leaving
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null) {
                        if (GameConstants.isDojo(player.getMapId())) {
                            Event_DojoAgent.failed(player);
                        }
                        if (exped.getLeader() == player.getId()) { //解散远征队伍
                            partyService.disbandExped(exped.getId()); //should take care of the rest
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().disbandParty();
                            }
                        } else if (part.getLeader().getId() == player.getId()) {
                            partyService.updateParty(part.getPartyId(), PartyOperation.解散队伍, new MaplePartyCharacter(player));
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().disbandParty();
                            }
                            //发送给还在远征队的队员消息
                            //partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(0x4E, player.getName()), null);
                        } else {
                            partyService.updateParty(part.getPartyId(), PartyOperation.离开队伍, new MaplePartyCharacter(player));
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().leftParty(player);
                            }
                            //发送给还在远征队的队员消息
                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(true, player.getName()), null);
                        }
                        if (player.getPyramidSubway() != null) {
                            player.getPyramidSubway().fail(c.getPlayer());
                        }
                        player.setParty(null);
                    }
                }
                break;
            case 0x52: //远征队伍驱逐 kick [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int cid = slea.readInt();
                        for (int i : exped.getParties()) {
                            MapleParty par = partyService.getParty(i);
                            if (par != null) {
                                MaplePartyCharacter expelled = par.getMemberById(cid);
                                if (expelled != null) {
                                    if (expelled.isOnline() && GameConstants.isDojo(player.getMapId())) {
                                        Event_DojoAgent.failed(player);
                                    }
                                    partyService.updateParty(i, PartyOperation.驱逐成员, expelled);
                                    if (player.getEventInstance() != null) {
                                        if (expelled.isOnline()) {
                                            player.getEventInstance().disbandParty();
                                        }
                                    }
                                    if (player.getPyramidSubway() != null && expelled.isOnline()) {
                                        player.getPyramidSubway().fail(player);
                                    }
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(false, expelled.getName()), null);
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            case 0x53: //改变远征队长 give exped leader [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        MaplePartyCharacter newleader = part.getMemberById(slea.readInt());
                        if (newleader != null) {
                            partyService.updateParty(part.getPartyId(), PartyOperation.改变队长, newleader);
                            exped.setLeader(newleader.getId());
                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeaderChanged(0), null);
                        }
                    }
                }
                break;
            case 0x54: //改变小组队长 give party leader [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int cid = slea.readInt();
                        for (int i : exped.getParties()) {
                            MapleParty par = partyService.getParty(i);
                            if (par != null) {
                                MaplePartyCharacter newleader = par.getMemberById(cid);
                                if (newleader != null && par.getPartyId() != part.getPartyId()) {
                                    partyService.updateParty(par.getPartyId(), PartyOperation.改变队长, newleader);
                                }
                            }
                        }
                    }
                }
                break;
            case 0x55: //change party of diff player [partyIndexTo] [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int partyIndexTo = slea.readInt();
                        if (partyIndexTo < exped.getType().maxParty && partyIndexTo <= exped.getParties().size()) {
                            int cid = slea.readInt();
                            for (int i : exped.getParties()) {
                                MapleParty par = partyService.getParty(i);
                                if (par != null) {
                                    MaplePartyCharacter expelled = par.getMemberById(cid);
                                    if (expelled != null && expelled.isOnline()) {
                                        MapleCharacter chr = World.getStorage(expelled.getChannel()).getCharacterById(expelled.getId());
                                        if (chr == null) {
                                            break;
                                        }
                                        if (partyIndexTo < exped.getParties().size()) { //already exists
                                            party = partyService.getParty(exped.getParties().get(partyIndexTo));
                                            if (party == null || party.getMembers().size() >= 6) {
                                                player.dropMessage(5, "Invalid party.");
                                                break;
                                            }
                                        }
                                        if (GameConstants.isDojo(player.getMapId())) {
                                            Event_DojoAgent.failed(player);
                                        }
                                        partyService.updateParty(i, PartyOperation.驱逐成员, expelled);
                                        if (partyIndexTo < exped.getParties().size()) { //already exists
                                            party = partyService.getParty(exped.getParties().get(partyIndexTo));
                                            if (party != null && party.getMembers().size() < 6) {
                                                partyService.updateParty(party.getPartyId(), PartyOperation.加入队伍, expelled);
                                                chr.receivePartyMemberHP();
                                                chr.updatePartyMemberHP();
                                                chr.getClient().getSession().write(PartyPacket.expeditionStatus(exped, true));
                                            }
                                        } else {
                                            party = partyService.createPartyAndAdd(expelled, exped.getId());
                                            chr.setParty(party);
                                            chr.getClient().getSession().write(PartyPacket.partyCreated(party));
                                            chr.getClient().getSession().write(PartyPacket.expeditionStatus(exped, true));
                                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                        }
                                        if (player.getEventInstance() != null) {
                                            if (expelled.isOnline()) {
                                                player.getEventInstance().disbandParty();
                                            }
                                        }
                                        if (player.getPyramidSubway() != null) {
                                            player.getPyramidSubway().fail(c.getPlayer());
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            default:
                if (ServerProperties.ShowPacket()) {
                    System.out.println("未知的远征队操作 : 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(mode).toUpperCase(), '0', 2) + " " + slea);
                }
                break;
        }
    }
}
