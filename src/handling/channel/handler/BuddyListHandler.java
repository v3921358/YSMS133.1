package handling.channel.handler;

import client.*;
import client.BuddyList.BuddyAddResult;
import client.BuddyList.BuddyOperation;

import static client.BuddyList.BuddyOperation.删除好友;
import static client.BuddyList.BuddyOperation.添加好友;

import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.world.WorldBuddyService;
import handling.world.WorldFindService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import tools.MaplePacketCreator;
import tools.data.input.LittleEndianAccessor;
import tools.packet.BuddyListPacket;

public class BuddyListHandler {

    private static final class CharacterIdNameBuddyCapacity extends CharacterNameAndId {

        private int buddyCapacity;

        public CharacterIdNameBuddyCapacity(int id, String name, String group, int buddyCapacity) {
            super(id, name, group);
            this.buddyCapacity = buddyCapacity;
        }

        public int getBuddyCapacity() {
            return buddyCapacity;
        }
    }

    private static CharacterIdNameBuddyCapacity getCharacterIdAndNameFromDatabase(String name, String group) throws SQLException {
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM characters WHERE name LIKE ?");
        ps.setString(1, name);
        ResultSet rs = ps.executeQuery();
        CharacterIdNameBuddyCapacity ret = null;
        if (rs.next()) {
            if (rs.getInt("gm") < 3) {
                ret = new CharacterIdNameBuddyCapacity(rs.getInt("id"), rs.getString("name"), group, rs.getInt("buddyCapacity"));
            }
        }
        rs.close();
        ps.close();
        return ret;
    }

    public static void BuddyOperation(LittleEndianAccessor slea, MapleClient c) {
        int mode = slea.readByte();
        BuddyList buddylist = c.getPlayer().getBuddylist();
        if (mode == 0x01) { // 添加好友
            String addName = slea.readMapleAsciiString();
            String groupName = slea.readMapleAsciiString();
//            String note = slea.readMapleAsciiString();
            slea.skip(slea.readShort());
            boolean linkaccount = slea.readByte() == 1;
            if (linkaccount) { // 暂时不开放账号综合好友
                c.getPlayer().dropMessage(1, "暂时无法添加账号综合好友，\r\n请添加普通好友。");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
//            String namer = linkaccount ? (slea.available() == 2 ? addName : slea.readMapleAsciiString()) : "";

            // 添加前的判断，比如被邀请的玩家是否在线、角色名是否正确等
            BuddylistEntry ble = buddylist.get(addName);
            if (addName.getBytes().length > 13 || groupName.getBytes().length > 18) {
                return;
            }
            if (addName.endsWith(c.getPlayer().getName())) {
                c.getSession().write(BuddyListPacket.buddylistMessage(0x23)); //不能添加自己
            } else if (ble != null) {
                c.getSession().write(BuddyListPacket.buddylistMessage(0x26)); // 已经是好友
            } else if (buddylist.isFull()) {
                c.getSession().write(BuddyListPacket.buddylistMessage(0x1D)); //好友目录已满了。
            } else {
                try {
                    // 获取对方信息
                    CharacterIdNameBuddyCapacity charWithId = null;
                    int channel = WorldFindService.getInstance().findChannel(addName);
                    MapleCharacter otherChar = null;
                    if (channel > 0) {
                        otherChar = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(addName);
                        if (otherChar == null) {
                            charWithId = getCharacterIdAndNameFromDatabase(addName, groupName);
                        } else if (!otherChar.isIntern() || c.getPlayer().isIntern()) {
                            charWithId = new CharacterIdNameBuddyCapacity(otherChar.getId(), otherChar.getName(), groupName, otherChar.getBuddylist().getCapacity());
                        }
                    } else {
                        charWithId = getCharacterIdAndNameFromDatabase(addName, groupName);
                    }
                    if (charWithId != null) {
                        BuddyAddResult buddyAddResult = null;
                        if (channel > 0) {
                            buddyAddResult = WorldBuddyService.getInstance().requestBuddyAdd(addName, c.getChannel(), c.getPlayer().getId(), c.getPlayer().getName(), c.getPlayer().getLevel(), c.getPlayer().getJob());
                        } else {
                            Connection con = DatabaseConnection.getConnection();
                            PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) as buddyCount FROM buddies WHERE characterid = ? AND pending = 0");
                            ps.setInt(1, charWithId.getId());
                            ResultSet rs = ps.executeQuery();
                            if (!rs.next()) {
                                ps.close();
                                rs.close();
                                throw new RuntimeException("Result set expected");
                            } else {
                                int count = rs.getInt("buddyCount");
                                if (count >= charWithId.getBuddyCapacity()) {
                                    buddyAddResult = BuddyAddResult.好友列表已满;
                                }
                            }
                            rs.close();
                            ps.close();

                            ps = con.prepareStatement("SELECT pending FROM buddies WHERE characterid = ? AND buddyid = ?");
                            ps.setInt(1, charWithId.getId());
                            ps.setInt(2, c.getPlayer().getId());
                            rs = ps.executeQuery();
                            if (rs.next()) {
                                buddyAddResult = BuddyAddResult.已经是好友关系;
                            }
                            rs.close();
                            ps.close();
                        }
                        if (buddyAddResult == BuddyAddResult.好友列表已满) {
                            c.getSession().write(BuddyListPacket.buddylistMessage(0x1E));
                        } else {
                            int displayChannel = -1;
                            int otherCid = charWithId.getId();
                            if (buddyAddResult == BuddyAddResult.已经是好友关系 && channel > 0) {
                                displayChannel = channel;
                                notifyRemoteChannel(c, channel, otherCid, groupName, 添加好友);
                            } else if (buddyAddResult != BuddyAddResult.已经是好友关系) {
                                Connection con = DatabaseConnection.getConnection();
                                PreparedStatement ps = con.prepareStatement("INSERT INTO buddies (`characterid`, `buddyid`, `groupname`, `pending`) VALUES (?, ?, ?, 1)");
                                ps.setInt(1, charWithId.getId());
                                ps.setInt(2, c.getPlayer().getId());
                                ps.setString(3, groupName);
                                ps.executeUpdate();
                                ps.close();
                            }
                            buddylist.put(new BuddylistEntry(charWithId.getName(), otherCid, groupName, displayChannel, true));
                            c.getSession().write(BuddyListPacket.updateBuddylist(buddylist.getBuddies(), 0x27));
                            c.getSession().write(BuddyListPacket.BuddyMess(0x1C, charWithId.getName()));
                        }
                    } else {
                        c.getSession().write(BuddyListPacket.buddylistMessage(0x24)); //没登录的角色
                    }
                } catch (SQLException e) {
                    System.err.println("SQL THROW" + e);
                }
            }
        } else if (mode == 0x02) { // 接受普通好友邀请
            int otherCid = slea.readInt();
            BuddylistEntry ble = buddylist.get(otherCid);
            if (!buddylist.isFull() && ble != null && !ble.isVisible()) {
                int channel = WorldFindService.getInstance().findChannel(otherCid);
                buddylist.put(new BuddylistEntry(ble.getName(), otherCid, "未指定群组", channel, true));
                c.getSession().write(BuddyListPacket.updateBuddylist(buddylist.getBuddies(), 0x18));
                notifyRemoteChannel(c, channel, otherCid, "未指定群组", 添加好友);
            } else {
                c.getSession().write(BuddyListPacket.buddylistMessage(0x1D)); //好友目录已满了
            }
        } else if (mode == 0x03) { // 接受账号好友邀请
        } else if (mode == 0x04) { // 删除普通好友
            int otherCid = slea.readInt();
            BuddylistEntry blz = buddylist.get(otherCid);
            if (blz != null && blz.isVisible()) {
                notifyRemoteChannel(c, WorldFindService.getInstance().findChannel(otherCid), otherCid, blz.getGroup(), 删除好友);
            }
            buddylist.remove(otherCid);
            c.getSession().write(BuddyListPacket.updateBuddylist(buddylist.getBuddies(), 0x18));
        } else if (mode == 0x05) { // 删除账号好友
//        } else if (mode == 0x06) { //扩充好友数量 在好友目录中添加5人需要消耗5万金币。你要扩充好友目录吗？
//            int capacity = c.getPlayer().getBuddyCapacity();
//            if (capacity >= 100 || c.getPlayer().getMeso() < 50000) {
//                c.getPlayer().dropMessage(1, "金币不足，或已扩充达到上限。包括基本格数在内，好友目录中只能加入100个好友。您当前的好友数量为: " + capacity);
//            } else {
//                int newcapacity = capacity + 5;
//                c.getPlayer().gainMeso(-50000, true, true);
//                c.getPlayer().setBuddyCapacity((byte) newcapacity);
//            }
        } else if (mode == 0x06 || mode == 0x07) { // 账号好友拒绝
            int otherCid = slea.readInt();
            //拒绝信息
            BuddylistEntry ble = buddylist.get(otherCid);
            if (ble == null) {
                c.getSession().write(BuddyListPacket.buddylistMessage(0x1D)); //好友目录已满了。
                return;
            }
            c.getSession().write(BuddyListPacket.NoBuddy(otherCid, 0x2A, mode == 0x07));
            MapleCharacter addChar = ChannelServer.getInstance(ble.getChannel()).getPlayerStorage().getCharacterById(ble.getCharacterId());
            addChar.getClient().getSession().write(BuddyListPacket.BuddyMess(0x31, c.getPlayer().getName()));
            buddylist.remove(otherCid);
        } else if (mode == 0x0B) {//帐号好友转换
            c.getPlayer().dropMessage(1, "暂时无法添加账号综合好友，\r\n请添加普通好友。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else if (mode == 0x0C) {//好友备注
            slea.readByte();
            int otherCid = slea.readInt();
//            int type = slea.readInt();//43108841 存在?
//            String Namer = slea.readMapleAsciiString();
//            String note = slea.readMapleAsciiString();
            slea.skip(4);
            slea.skip(slea.readShort());
            slea.skip(slea.readShort());
            BuddylistEntry ble = buddylist.get(otherCid);
            if (ble != null) {
                c.getSession().write(BuddyListPacket.updateBuddyNamer(ble, 0x19));
            }
        }
    }

    private static void notifyRemoteChannel(MapleClient c, int remoteChannel, int otherCid, String group, BuddyOperation operation) {
        MapleCharacter player = c.getPlayer();
        if (remoteChannel > 0) {
            WorldBuddyService.getInstance().buddyChanged(otherCid, player.getId(), player.getName(), c.getChannel(), operation, group);
        }
    }
}
