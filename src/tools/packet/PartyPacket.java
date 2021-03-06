/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleCharacter;
import handling.SendPacketOpcode;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.WrodlPartyService;
import handling.world.party.MapleExpedition;
import handling.world.party.PartySearch;
import handling.world.party.PartySearchType;
import handling.world.sidekick.MapleSidekick;
import handling.world.sidekick.MapleSidekickCharacter;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import server.ServerProperties;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author admin
 */
public class PartyPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = Logger.getLogger(PartyPacket.class);
    private static final int 邀请队员 = 0x04;
    private static final int 邀请队员反馈 = 0x08;
    private static final int LOG_ONOFF = 0x0F;
    private static final int 创建组队 = 0x10;
    private static final int 解散队伍 = 0x15;
    private static final int 加入队伍 = 0x18;
    public static final int 拒绝组队邀请 = 0x22;
    private static final int 改变队长 = 0x30;
    private static final int 更新队伍 = 0x39;
    private static final int 队伍传送门 = 0x49;
    private static final int 修改组队名称 = 0x4D;
    private static final int 搜索队伍 = 0x6D;

    /*
     * 创建队伍
     */
    public static byte[] partyCreated(MapleParty party) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(创建组队); //以前是0x0C V.112修改
        mplew.writeInt(party.getPartyId());
        mplew.writeInt(999999999);
        mplew.writeInt(999999999);
        mplew.writeLong(0); //这个地方V.100为 00 00 00 00 20 20 20 20 
        mplew.write(party.isHidden() ? 0 : 1); //是否公开 公开 = 1 不公开 = 0
        mplew.writeMapleAsciiString(party.getName()); //队伍的名字信息 好像需要长度30

        return mplew.getPacket();
    }

    /*
     * 组队邀请
     */
    public static byte[] partyInvite(MapleCharacter from) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(邀请队员);
        mplew.writeInt(from.getId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0); //V.104新增 貌似是把职业的 Int 改为 Long ?
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /*
     * 组队邀请返回信息
     */
    public static byte[] partyRequestInvite(MapleCharacter from) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(邀请队员反馈);
        mplew.writeInt(from.getId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] partyStatusMessage(int message) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        /*
         * 0x0F 已经加入其他组。
         * 0x10 新手不能开启组队。
         * 0x11 发生未知错误，不能处理组队邀请。
         * 0x13 没有参加的组队。
         * 0x14 发生未知错误，不能处理组队邀请。
         * 0x16 加入组队。
         * 0x17 已经加入其他组。
         * 0x18 组队成员已满
         * 0x30 能转让给同一个场地的组队成员。
         */
        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(message);

        return mplew.getPacket();
    }

    /*
     * 组队消息
     */
    public static byte[] partyStatusMessage(int message, String charName) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(message);
        mplew.writeMapleAsciiString(charName);

        return mplew.getPacket();
    }

    /*
     * 组队提示信息
     */
    public static byte[] partyStatusMessage(String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPOUSE_MESSAGE.getValue());
        mplew.writeShort(0x0B);
        mplew.writeMapleAsciiString(message);

        return mplew.getPacket();
    }

    private static void addPartyStatus(int forchannel, MapleParty party, MaplePacketLittleEndianWriter lew, boolean leaving) {
        addPartyStatus(forchannel, party, lew, leaving, false);
    }

    private static void addPartyStatus(int forchannel, MapleParty party, MaplePacketLittleEndianWriter lew, boolean leaving, boolean exped) {
        List<MaplePartyCharacter> partymembers;
        if (party == null) {
            partymembers = new ArrayList<>();
        } else {
            partymembers = new ArrayList<>(party.getMembers());
        }
        while (partymembers.size() < 6) {
            partymembers.add(new MaplePartyCharacter());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeAsciiString(partychar.getName(), 13);
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getJobId());
        }
//        for (MaplePartyCharacter partychar : partymembers) {
//            lew.writeInt(0); // TODOO 未知 V.104新增 貌似是把职业的 Int 改为 Long ?
//        }
        lew.writeZeroBytes(24);
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getLevel());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.isOnline()) {
                lew.writeInt(partychar.getChannel() - 1);
            } else {
                lew.writeInt(-2);
            }
        }
//        for (MaplePartyCharacter partychar : partymembers) {
//            lew.writeInt(0); // TODOO 未知
//        }
        lew.writeZeroBytes(24);
        lew.writeInt(party == null ? 0 : party.getLeader().getId());
        if (exped) { //是远征队伍就返回
            return;
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel) {
                lew.writeInt(partychar.getMapid());
            } else {
                lew.writeInt(0);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel && !leaving) {
                lew.writeInt(partychar.getDoorTown());
                lew.writeInt(partychar.getDoorTarget());
                lew.writeInt(partychar.getDoorSkill());
                lew.writeInt(partychar.getDoorPosition().x);
                lew.writeInt(partychar.getDoorPosition().y);
            } else {
                lew.writeInt(leaving ? 999999999 : 0);
                lew.writeInt(leaving ? 999999999 : 0);
                lew.writeInt(0);
                lew.writeInt(leaving ? -1 : 0);
                lew.writeInt(leaving ? -1 : 0);
            }
        }
        lew.write(party.isHidden() ? 0 : 1); //队伍是否隐藏信息
        lew.writeMapleAsciiString(party.getName()); //队伍信息 好像长度必须30
    }

    public static byte[] updateParty(int forChannel, MapleParty party, PartyOperation op, MaplePartyCharacter target) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        switch (op) {
            case 解散队伍: //解散队伍
            case 驱逐成员: //驱逐成员
            case 离开队伍: //离开队伍
                mplew.write(解散队伍); //以前是0x12 V.116修改   //119
                mplew.writeInt(party.getPartyId());
                mplew.writeInt(target.getId());
                mplew.write(op == PartyOperation.解散队伍 ? 0 : 1);
                if (op == PartyOperation.解散队伍) {
                    mplew.writeInt(target.getId());
                } else {
                    mplew.write(op == PartyOperation.驱逐成员 ? 1 : 0);
                    mplew.writeMapleAsciiString(target.getName());
                    addPartyStatus(forChannel, party, mplew, op == PartyOperation.离开队伍);
                }
                break;
            case 加入队伍: //加入队伍
                mplew.write(加入队伍); //以前是0x15 V.116修改   119
                mplew.writeInt(party.getPartyId());
                mplew.writeMapleAsciiString(target.getName());
                addPartyStatus(forChannel, party, mplew, false);
                break;
            case 更新队伍: //更新队伍
            case LOG_ONOFF: //队伍玩家登录或下线
                mplew.write(op == PartyOperation.LOG_ONOFF ? 更新队伍 : LOG_ONOFF); //以前是0x0D V.116修改   119
                mplew.writeInt(party.getPartyId());
                addPartyStatus(forChannel, party, mplew, op == PartyOperation.LOG_ONOFF);
                break;
            case 改变队长: //改变队长
            case CHANGE_LEADER_DC: //队长下线自动修改队长
                mplew.write(改变队长); //以前是0x2D V.116修改   119
                mplew.writeInt(target.getId());
                mplew.write(op == PartyOperation.CHANGE_LEADER_DC ? 1 : 0);
                break;
            case 队伍设置: //V.119.1新增
                mplew.write(修改组队名称);
                mplew.write(party.isHidden() ? 0 : 1); //队伍是否隐藏信息
                mplew.writeMapleAsciiString(party.getName(), 30); //队伍信息 好像长度必须30
                break;
        }
        return mplew.getPacket();
    }

    /*
     * 增加队伍传送点 也就是时空门
     */
    public static byte[] partyPortal(int townId, int targetId, int skillId, Point position, boolean animation) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(队伍传送门);
        mplew.write(animation ? 0 : 1);
        mplew.writeInt(townId);
        mplew.writeInt(targetId);
        mplew.writeInt(skillId);
        mplew.writePos(position);

        return mplew.getPacket();
    }

    /*
     * 更新组队HP
     */
    public static byte[] updatePartyMemberHP(int chrId, int curhp, int maxhp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_PARTYMEMBER_HP.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(curhp);
        mplew.writeInt(maxhp);

        return mplew.getPacket();
    }

    /*
     * 搜索队伍中寻找队伍列表
     * V.118.1 OK
     */
    public static byte[] getPartyListing(PartySearchType pst) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(搜索队伍); //V.116修改
        mplew.writeInt(pst.id);
        List<PartySearch> parties = WrodlPartyService.getInstance().searchParty(pst);
        mplew.writeInt(parties.size());
        for (PartySearch party : parties) {
            if (pst.exped) {
                MapleExpedition me = WrodlPartyService.getInstance().getExped(party.getId());
                mplew.writeInt(party.getId());
                mplew.writeAsciiString(party.getName(), 37);
                //mplew.writeAsciiString("id MobStat", 10);
                mplew.writeInt(pst.id);
                mplew.writeInt(0);
                for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
                    if (i < me.getParties().size()) {
                        MapleParty part = WrodlPartyService.getInstance().getParty(me.getParties().get(i));
                        if (part != null) {
                            addPartyStatus(-1, part, mplew, false, true);
                        } else {
                            mplew.writeZeroBytes(226); //length of the addPartyStatus.
                        }
                    } else {
                        mplew.writeZeroBytes(226); //length of the addPartyStatus.
                    }
                }
            } else {
                mplew.writeInt(party.getId());
                mplew.writeAsciiString(party.getName(), 37);
                addPartyStatus(-1, WrodlPartyService.getInstance().getParty(party.getId()), mplew, false, true); //if exped, send 0, if not then skip
            }
        }

        return mplew.getPacket();
    }

    /*
     * 搜索队伍中添加寻找队伍
     * V.118.1 OK
     */
    public static byte[] partyListingAdded(PartySearch ps) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(0x6C); //V.118修改 以前0x6A
        mplew.writeInt(ps.getType().id);
        if (ps.getType().exped) {
            MapleExpedition me = WrodlPartyService.getInstance().getExped(ps.getId());
            //mplew.writeInt(me.getType().maxMembers);
            mplew.writeInt(ps.getId());
            mplew.writeAsciiString(ps.getName(), 37);
            mplew.writeInt(ps.getType().id);
            mplew.writeInt(0);
            for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
                if (i < me.getParties().size()) {
                    MapleParty party = WrodlPartyService.getInstance().getParty(me.getParties().get(i));
                    if (party != null) {
                        addPartyStatus(-1, party, mplew, false, true);
                    } else {
                        mplew.writeZeroBytes(226); //length of the addPartyStatus.
                    }
                } else {
                    mplew.writeZeroBytes(226); //length of the addPartyStatus.
                }
            }
        } else {
            mplew.writeInt(ps.getId());
            mplew.writeAsciiString(ps.getName(), 37);
            addPartyStatus(-1, WrodlPartyService.getInstance().getParty(ps.getId()), mplew, false, true); //if exped, send 0, if not then skip
        }

        return mplew.getPacket();
    }

    /*
     * 取消组队广告
     * V.118.1 OK
     */
    public static byte[] removePartySearch(PartySearch ps) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(0x6D); //V.118修改  以前0x6B
        mplew.writeInt(ps.getType().id);
        mplew.writeInt(ps.getId());
        mplew.writeInt(0x02); //ps.getType().exped ? 0x04 : 0x02 好像是一样的

        return mplew.getPacket();
    }

    /*
     * 远征队伍状态
     * V.118.1 OK
     */
    public static byte[] expeditionStatus(MapleExpedition me, boolean created) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(created ? 0x58 : 0x5A); //V.118修改 以前创建 0x56 更新 0x58
        mplew.writeInt(me.getType().exped);
        mplew.writeInt(0);
        for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
            if (i < me.getParties().size()) {
                MapleParty party = WrodlPartyService.getInstance().getParty(me.getParties().get(i));
                if (party != null) {
                    addPartyStatus(-1, party, mplew, false, true);
                } else {
                    mplew.writeZeroBytes(226); //length of the addPartyStatus.
                }
            } else {
                mplew.writeZeroBytes(226); //length of the addPartyStatus.
            }
        }

        return mplew.getPacket();
    }

    /*
     * 远征队邀请玩家触发的提示
     * V.118.1 OK
     */
    public static byte[] expeditionInviteMessage(int code, String name) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x66); //V.118修改 以前是0x64
        /*
         * 0 = 在当前服务器找不到‘xxxx’。
         * 1 = 运营员只能邀请运营员。
         * 2 = ‘xxxx’已经加入了其他队伍。
         * 3 = ‘xxxx’的等级不符，无法邀请加入远征队。
         * 4 = ‘xxxx’目前处于拒绝远征队邀请的状态。
         * 5 = ‘xxxx’玩家正在做别人的事情。
         * 6 = 已邀请‘xxxx’加入远征队。
         * 7 = 已邀请‘xxxx’加入远征队。
         */
        mplew.writeInt(code);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 加入远征队伍的提示
     * V.118.1 OK
     */
    public static byte[] expeditionJoined(String name) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x59); //V.116修改 以前0x57
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 离开远征队伍
     * V.118.1 OK
     */
    public static byte[] expeditionLeft(boolean left, String name) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        /*
         * 0x5D 队员自己退出
         * 0x5F 强制驱除别人
         */
        mplew.write(left ? 0x5D : 0x5F);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 远征提示信息
     * V.118.1 OK
     */
    public static byte[] expeditionMessage(boolean disbanded) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        /**
         * 0x60 提示被T出远征队伍 0x61 解散远征队伍
         */
        mplew.write(disbanded ? 0x61 : 0x60);

        return mplew.getPacket();
    }

    /*
     * 远征队长改变
     * V.118.1 OK
     */
    public static byte[] expeditionLeaderChanged(int newLeader) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x62); //V.116修改 以前0x60
        mplew.writeInt(newLeader);

        return mplew.getPacket();
    }

    /*
     * 远征队伍更新
     * can only update one party in the expedition.
     * V.118.1 OK
     */
    public static byte[] expeditionUpdate(int partyIndex, MapleParty party) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x63); //V.118修改 以前0x61
        mplew.writeInt(0);
        mplew.writeInt(partyIndex);
        if (party == null) {
            mplew.writeZeroBytes(226); //length of the addPartyStatus.
        } else {
            addPartyStatus(-1, party, mplew, false, true);
        }

        return mplew.getPacket();
    }

    /*
     * 远征队邀请玩家
     * 该玩家获得的封包
     * V.118.1 OK
     */
    public static byte[] expeditionInvite(MapleCharacter from, int exped) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x65); //V.118修改 以前0x63
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0); //V.104新增 貌似是把职业的 Int 改为 Long ?
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(exped);

        return mplew.getPacket();
    }

    /*
     * 队员搜索
     */
    public static byte[] showMemberSearch(List<MapleCharacter> players) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MEMBER_SEARCH.getValue());
        mplew.write(players.size());
        for (MapleCharacter chr : players) {
            mplew.writeInt(chr.getId());
            mplew.writeMapleAsciiString(chr.getName());
            chr.writeJobData(mplew);
            mplew.write(chr.getLevel());
        }

        return mplew.getPacket();
    }

    /*
     * 队伍搜索
     */
    public static byte[] showPartySearch(List<MapleParty> partylist) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PARTY_SEARCH.getValue());
        mplew.write(partylist.size());
        for (MapleParty party : partylist) {
            mplew.writeInt(party.getPartyId());
            mplew.writeMapleAsciiString(party.getLeader().getName());
            mplew.write(party.getLeader().getLevel());
            mplew.write(party.getLeader().isOnline() ? 1 : 0);
            mplew.writeMapleAsciiString(party.getName());
            mplew.write(party.getMembers().size());
            for (MaplePartyCharacter partyChr : party.getMembers()) {
                mplew.writeInt(partyChr.getId());
                mplew.writeMapleAsciiString(partyChr.getName());
                mplew.writeInt(partyChr.getJobId()); //V.104修改 以前为 Short
                mplew.write(partyChr.getLevel());
                mplew.write(partyChr.isOnline() ? 1 : 0);
                mplew.write(-1);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] sidekickInvite(MapleCharacter from) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SIDEKICK_OPERATION.getValue());
        mplew.write(0x41);
        mplew.writeInt(from.getId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0); //V.104新增 貌似是把职业的 Int 改为 Long ?
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] disbandSidekick(MapleSidekick s) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SIDEKICK_OPERATION.getValue());
        mplew.write(0x4B);
        mplew.writeInt(s.getId());
        mplew.writeInt(s.getCharacter(0).getId());
        mplew.write(0);
        mplew.writeInt(s.getCharacter(1).getId());

        return mplew.getPacket();
    }

    public static byte[] updateSidekick(MapleCharacter first, MapleSidekick s, boolean f) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SIDEKICK_OPERATION.getValue());
        mplew.write(f ? 0x4E : 0x46);
        MapleSidekickCharacter second = s.getCharacter(s.getCharacter(0).getId() == first.getId() ? 1 : 0);
        boolean online = first.getMap().getCharacterById(second.getId()) != null;
        mplew.writeInt(s.getId());
        if (f) {
            mplew.writeMapleAsciiString(second.getName());
        }
        List<String> msg = s.getSidekickMsg(online);
        mplew.writeInt(msg.size());
        for (String m : msg) {
            mplew.writeMapleAsciiString(m);
        }
        mplew.writeInt(first.getId());
        mplew.writeInt(second.getId());
        mplew.writeAsciiString(first.getName(), 13);
        mplew.writeAsciiString(second.getName(), 13);
        first.writeJobData(mplew);
        mplew.writeInt(second.getJobId());
        mplew.writeInt(first.getLevel());
        mplew.writeInt(second.getLevel());
        mplew.writeInt(first.getClient().getChannel() - 1);
        mplew.writeInt(online ? (first.getClient().getChannel() - 1) : 0);
        mplew.writeLong(0);
        mplew.writeInt(first.getId());
        if (f) {
            mplew.writeInt(first.getId());
        }
        mplew.writeInt(second.getId());
        if (!f) {
            mplew.writeInt(first.getId());
        }
        mplew.writeInt(first.getMapId());
        mplew.writeInt(online ? first.getMapId() : 999999999);
        mplew.writeInt(1); //??? random bytes after 1
        mplew.write(Math.abs(first.getLevel() - second.getLevel()));
        mplew.writeInt(0); //can be 1 or 0
        mplew.writeInt(0); //time left til next buff
        mplew.writeInt(Integer.MAX_VALUE); //dunno, random
        mplew.writeInt(1); //can be 1 or 0
        //TODO FAMILIAR

        return mplew.getPacket();
    }
}
