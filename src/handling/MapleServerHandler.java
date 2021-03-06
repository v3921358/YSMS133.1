package handling;

import client.MapleClient;
import configs.ServerConfig;
import constants.ServerConstants;
import handling.cashshop.CashShopServer;
import handling.cashshop.handler.BuyCashItemHandler;
import handling.cashshop.handler.CashShopOperation;
import handling.cashshop.handler.CouponCodeHandler;
import handling.cashshop.handler.MTSOperation;
import handling.channel.ChannelServer;
import handling.channel.handler.*;
import handling.chat.ChatServer;
import handling.login.LoginServer;
import handling.login.handler.*;
import handling.mina.MaplePacketDecoder;
import handling.world.World;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import scripting.npc.NPCScriptManager;
import server.MTSStorage;
import server.Randomizer;
import server.ServerProperties;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.LittleEndianAccessor;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.packet.LoginPacket;

public class MapleServerHandler extends IoHandlerAdapter {

    private int channel = -1;
    private ServerType type = null;
    private static boolean show = false;
    public static boolean preventIpAttack = true;
    public static final List<String> BlockIPList = new ArrayList<>();
    private final Map<String, Pair<Long, Byte>> tracker = new ConcurrentHashMap<>();

    public MapleServerHandler(ServerType type) {
        this.type = type;
    }

    public MapleServerHandler(int channel, ServerType type) {
        this.channel = channel;
        this.type = type;
    }

    @Override
    public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
        if (!(cause instanceof IOException) && (session != null)) {
            MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
            if (client != null && client.getPlayer() != null) {
                client.getPlayer().saveToDB(false, false);
                FileoutputUtil.printError(FileoutputUtil.EXCEPTION_CAUGHT, cause, "Exception caught by: " + client.getPlayer().getName());
            }
        }
    }

    @Override
    public void sessionOpened(IoSession session) throws Exception {
        // ????????????IP
        String address = session.getRemoteAddress().toString().split(":")[0];
        if (BlockIPList.contains(address)) { //??????????????????IP??????
            session.close(true);
            return;
        }
        if (!address.equals("/127.0.0.1")) { // ????????????IP  && (type == ServerType.??????????????? || type == ServerType.??????????????? || type == ServerType.???????????????)
            Pair<Long, Byte> track = tracker.get(address);
            byte count;
            if (track == null) {
                count = 1;
            } else {
                count = track.right;
                long difference = System.currentTimeMillis() - track.left;
                if (difference < 2000) { //?????????IP???????????????????????? ?????????2???
                    count++;
                } else if (difference > 20000) { //??????????????????????????? ?????????20???
                    count = 1;
                }
                if (preventIpAttack && count > 5) { // ??????IP??????????????? ??????????????????????????????
                    BlockIPList.add(address);
                    tracker.remove(address); // Cleanup
                    session.close(true);
                    return;
                }
            }
            tracker.put(address, new Pair<>(System.currentTimeMillis(), count));
            // ??????IP??????.
        }

        if (channel > -1) {
            if (ChannelServer.getInstance(channel).isShutdown()) { //???????????????????????????????????????
                session.close(true);
                return;
            }
        } else if (type == ServerType.???????????????) {
            if (CashShopServer.isShutdown()) {
                session.close(true);
                return;
            }
        } else if (type == ServerType.???????????????) {
            if (LoginServer.isShutdown()) {
                session.close(true);
                return;
            }
        } else if (type == ServerType.???????????????) {
            if (ChatServer.isShutdown()) {
                session.close(true);
                return;
            }
        }

        byte ivRecv[] = {70, 114, 122, 82};
        byte ivSend[] = {82, 48, 120, 115};
        ivRecv[3] = (byte) (Math.random() * 255);
        ivSend[3] = (byte) (Math.random() * 255);
        MapleAESOFB sendCypher = new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConfig.MAPLE_VERSION));
        MapleAESOFB recvCypher = new MapleAESOFB(ivRecv, ServerConfig.MAPLE_VERSION);
        MapleClient client = new MapleClient(sendCypher, recvCypher, session);
        client.setSessionId(Randomizer.nextLong());
        client.setChannel(channel);

        MaplePacketDecoder.DecoderState decoderState = new MaplePacketDecoder.DecoderState();
        session.setAttribute(MaplePacketDecoder.DECODER_STATE_KEY, decoderState);

        byte[] handShakePacket = LoginPacket.getHello(ServerConfig.MAPLE_VERSION, ivSend, ivRecv, type);
        session.write(handShakePacket);

        session.setAttribute(MapleClient.CLIENT_KEY, client);
        World.Client.addClient(client);

        if (ServerProperties.ShowPacket()) {
            ServerProperties.loadSettings();
            RecvPacketOpcode.reloadValues();
            SendPacketOpcode.reloadValues();
            CashShopOpcode.reloadValues();
            InteractionOpcode.reloadValues();
        }

        StringBuilder sb = new StringBuilder();
        if (channel > -1) {
            sb.append("[Channel Server] Channel ").append(channel).append(" : ");
        } else if (type == ServerType.???????????????) {
            sb.append("[Cash Server] ");
        } else if (type == ServerType.???????????????) {
            sb.append("[Chat Server]");
        } else {
            sb.append("[Login Server] ");
        }
        sb.append("IoSession opened ").append(address);
        System.out.println(sb.toString());
    }

    @Override
    public void sessionClosed(IoSession session) throws Exception {
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        if (client != null) {
            try {
                client.disconnect(true, type == ServerType.??????????????? || type == ServerType.???????????????);
            } finally {
                World.Client.removeClient(client);
                session.close(true);
                session.removeAttribute(MapleClient.CLIENT_KEY);
                session.removeAttribute(MaplePacketDecoder.DECODER_STATE_KEY);
            }
        }
        super.sessionClosed(session);
    }

    @Override
    public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        if (client != null) {
            client.sendPing(type == ServerType.???????????????);
        }
        super.sessionIdle(session, status);
    }

    @Override
    public void messageReceived(IoSession session, Object message) {
        if (message == null || session == null) {
            return;
        }
        SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream((byte[]) message));
        if (slea.available() < 2) {
            return;
        }
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        if (client == null || !client.isReceiving()) {
            return;
        }
        short packetId = slea.readShort();
        for (RecvPacketOpcode recv : RecvPacketOpcode.values()) {
            if (recv.getValue() == packetId) {
                if (recv.NeedsChecking() && !client.isLoggedIn()) {
                    return;
                }
                try {
                    if (client.getPlayer() != null && client.isMonitored() && show) {
                        try (FileWriter fw = new FileWriter(new File("MonitorLogs/" + client.getPlayer().getName() + "_log.txt"), true)) {
                            fw.write(String.valueOf(recv) + " (" + Integer.toHexString(packetId) + ") Handled: \r\n" + slea.toString() + "\r\n");
                            fw.flush();
                        }
                    }
                    handlePacket(recv, slea, client, type);
                } catch (NegativeArraySizeException | ArrayIndexOutOfBoundsException e) {
                    if (!ServerConstants.Use_Fixed_IV) {
                        FileoutputUtil.log(FileoutputUtil.PacketEx_Log, "??????: " + lookupRecv(packetId) + "\r\n" + slea.toString(true));
                        FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
                    }
                } catch (Exception e) {
                    FileoutputUtil.log(FileoutputUtil.PacketEx_Log, "??????: " + lookupRecv(packetId) + "\r\n" + slea.toString(true));
                    FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
                }
                return;
            }
        }
    }

//    @Override
//    public void inputClosed(IoSession session) throws Exception { // ????????????????????????????????????
//        FileoutputUtil.printError(FileoutputUtil.EXCEPTION_CAUGHT, "input closed session id = " + session.getId());
//        super.inputClosed(session);
//    }
    private String lookupRecv(short header) {
        for (RecvPacketOpcode recv : RecvPacketOpcode.values()) {
            if (recv.getValue() == header) {
                return recv.name();
            }
        }
        return "UNKNOWN";
    }

    public static void handlePacket(RecvPacketOpcode header, LittleEndianAccessor slea, MapleClient c, ServerType type) throws Exception {
        switch (header) {
            case PONG: // ?????????
                c.pongReceived();
                break;
            case CHAT_SERVER_PONG://???????????????Pong
                c.chatServerPongReceived();
                break;
            case STRANGE_DATA:
                // Does nothing for now, HackShield's heartbeat
                break;
            case CLIENT_AUTH:
                slea.skip(1);
                int clientfile = slea.readInt();
                int checkfile;
                checkfile = ((clientfile >> 5) << 5) + (((((clientfile & 0x1F) >> 3) ^ 2) << 3) + (7 - (clientfile & 7)));
                checkfile |= ((clientfile >> 7) << 7);
                checkfile -= 2;
                //c.getSession().write(MaplePacketCreator.getClientAuthentication(checkfile));
                break;
            case CLIENT_ERROR: // ????????????????????????????????????
                ClientErrorLogHandler.handlePacket(slea, c);
                break;
            case CLIENT_FAIL: // ???????????????????????????
                PacketErrorHandler.handlePacket(slea, c);
                break;
            case REQUEST_CONNECTION:
                c.getSession().write(LoginPacket.addConnection());
                break;
            case CHAT_SERVER_REQUEST:
                ChatHandler.EnterChatServer(slea, c);//??????/???????????????????????????
                break;
            case GUILD_CHAT:
                ChatHandler.GuildChat(slea, c); //????????????
                break;
            case BUDDY_CHAT:
                ChatHandler.BuddyChat(slea, c);  //????????????
                break;
            case LOGIN_PASSWORD: // ??????????????????
                LoginPasswordHandler.handlePacket(slea, c);
                break;
            case LICENSE_REQUEST: // ????????????
                LicenseRequestHandler.handlePacket(slea, c);
                break;
            case SET_GENDER: // ????????????
                SetGenderHandler.handlePacket(slea, c);
                break;
            case CHARACTER_CARDS: //????????????????????????
                UpdateCharCards.handlePacket(slea, c);
                break;
            case SET_CHAR_CARDS: //????????????????????? ?????????????????????????????????
                ShowCharCards.handlePacket(slea, c);
                break;
            case SET_ACC_CASH: //????????????????????????
                ShowAccCash.handlePacket(slea, c);
                break;
//            case SEND_ENCRYPTED:
//                if (c.isLocalhost()) {
//                    LoginPasswordHandler.handlePacket(slea, c);
//                } else {
//                    c.getSession().write(LoginPacket.getCustomEncryption());
//                }
//                break;
//            case CLIENT_START:
//            case CLIENT_FAILED:
//                c.getSession().write(LoginPacket.getCustomEncryption());
//                break;
//            case VIEW_SERVERLIST:
//                if (slea.readByte() == 0) {
//                    ServerlistRequestHandler.handlePacket(c, false);
//                }
//                break;
//            case REDISPLAY_SERVERLIST:
            case SERVERLIST_REQUEST: // ?????????????????????
                ServerlistRequestHandler.handlePacket(c, true);
                break;
            case CLIENT_HELLO: // ??????????????????
                MapLoginHandler.handlePacket(slea, c, type);
                break;
            case CHARLIST_REQUEST: //??????????????????
                CharlistRequestHandler.handlePacket(slea, c);
                break;
            case SERVERSTATUS_REQUEST: // ???????????????
                ServerStatusRequestHandler.handlePacket(c);
                break;
            case CHECK_CHAR_NAME: // ??????????????????
                CheckCharNameHandler.handlePacket(slea, c);
                break;
            case CREATE_CHAR: // ????????????
                CreateCharHandler.handlePacket(slea, c);
                break;
            case CREATE_ULTIMATE: // ?????????????????????
                CreateUltimateHandler.handlePacket(slea, c);
                break;
            case DELETE_CHAR: // ????????????
                DeleteCharHandler.handlePacket(slea, c);
                break;
            case PART_TIME_JOB:
                PartJobHandler.handlePacket(slea, c);
                break;
//            case VIEW_ALL_CHAR:
//                ViewCharHandler.handlePacket(slea, c);
//                break;
//            case PICK_ALL_CHAR:
//                WithoutSecondPasswordHandler.handlePacket(slea, c, false, true);
//                break;
//            case CHAR_SELECT_NO_PIC:
//                WithoutSecondPasswordHandler.handlePacket(slea, c, false, false);
//                break;
//            case VIEW_REGISTER_PIC:
//                WithoutSecondPasswordHandler.handlePacket(slea, c, true, true);
//                break;
            case CHAR_SELECT:   // ????????????
            case CHAR_SELECTED: // ???????????????????????????
                CharSelectedHandler.handlePacket(slea, c);
                break;
//            case VIEW_SELECT_PIC:
//                WithSecondPasswordHandler.handlePacket(slea, c, true);
//                break;
            case AUTH_SECOND_PASSWORD:
                WithSecondPasswordHandler.handlePacket(slea, c, false);
                break;
            case RSA_KEY:
                c.getSession().write(LoginPacket.getLoginAUTH());
                break;
            case CREATE_CHAR_REQUEST:
                CreateCharHandler.getCreatCharAuth(slea, c);
                break;
            /*
             * --------------------------------------------------------------------------------------
             * END OF LOGIN SERVER
             * --------------------------------------------------------------------------------------
             */
            case CHANGE_CHANNEL: // ????????????
                InterServerHandler.ChangeChannel(slea, c, c.getPlayer());
                break;
            case PLAYER_LOGGEDIN: // ????????????
                slea.readInt(); //V.114?????? [00 00 00 00]
                int playerid = slea.readInt();
                //?????????MAC??????
                InterServerHandler.Loggedin(slea, playerid, c);
                break;
            case ENTER_PVP:
            case ENTER_PVP_PARTY:
                PlayersHandler.EnterPVP(slea, c);
                break;
            case PVP_RESPAWN:
                PlayersHandler.RespawnPVP(slea, c);
                break;
            case LEAVE_PVP:
                PlayersHandler.LeavePVP(slea, c);
                break;
            case PVP_ATTACK:
                PlayersHandler.AttackPVP(slea, c);
                break;
            case PVP_SUMMON:
                SummonHandler.SummonPVP(slea, c);
                break;
            case ENTER_CASH_SHOP: // ????????????
                InterServerHandler.EnterCS(c, c.getPlayer(), false);
                break;
            case ENTER_MTS: // ????????????
                InterServerHandler.EnterMTS(c, c.getPlayer());
                break;
            case CHANGE_PLAYER: //????????????
                InterServerHandler.ChangePlayer(slea, c);
                break;
            case LOGIN_AUTHKEY:
                LoginPasswordHandler.handlerAuthKey(slea, c);
                break;
            case MOVE_PLAYER: // ????????????
                PlayerHandler.MovePlayer(slea, c, c.getPlayer());
                break;
            case CHAR_INFO_REQUEST:
                slea.readInt();
                PlayerHandler.CharInfoRequest(slea.readInt(), c, c.getPlayer());
                break;
            case CLOSE_RANGE_ATTACK: //???????????????
            case RANGED_ATTACK: //???????????????
            case MAGIC_ATTACK:  //????????????
            case SUMMON_ATTACK: //???????????????
            case PASSIVE_ENERGY://?????????????????????
                PlayerHandler.attackProcessing(slea, c, header);
                break;
            case SPECIAL_MOVE:
                PlayerHandler.SpecialMove(slea, c, c.getPlayer());
                break;
            case GET_BOOK_INFO:
                PlayersHandler.MonsterBookInfoRequest(slea, c, c.getPlayer());
                break;
            case CHANGE_SET:
                PlayersHandler.ChangeSet(slea, c, c.getPlayer());
                break;
            case PROFESSION_INFO:
                ItemMakerHandler.ProfessionInfo(slea, c, c.getPlayer());
                break;
            case CRAFT_DONE:
                ItemMakerHandler.CraftComplete(slea, c, c.getPlayer());
                break;
            case CRAFT_MAKE:
                ItemMakerHandler.CraftMake(slea, c, c.getPlayer());
                break;
            case CRAFT_EFFECT:
                ItemMakerHandler.CraftEffect(slea, c, c.getPlayer());
                break;
            case START_HARVEST:
                ItemMakerHandler.StartHarvest(slea, c, c.getPlayer());
                break;
            case STOP_HARVEST:
                ItemMakerHandler.StopHarvest(slea, c, c.getPlayer());
                break;
            case MAKE_EXTRACTOR: //?????????
                ItemMakerHandler.MakeExtractor(slea, c, c.getPlayer());
                break;
            case USE_ENCHANTING:
                ItemScrollHandler.UseEquipEnchanting(slea, c, c.getPlayer());
                break;
            case USE_BAG:
                ItemMakerHandler.UseBag(slea, c, c.getPlayer());
                break;
            case USE_FAMILIAR:
                MobHandler.UseFamiliar(slea, c, c.getPlayer());
                break;
            case SPAWN_FAMILIAR:
                MobHandler.SpawnFamiliar(slea, c, c.getPlayer());
                break;
            case RENAME_FAMILIAR:
                MobHandler.RenameFamiliar(slea, c, c.getPlayer());
                break;
            case MOVE_FAMILIAR:
                MobHandler.MoveFamiliar(slea, c, c.getPlayer());
                break;
            case ATTACK_FAMILIAR:
                MobHandler.AttackFamiliar(slea, c, c.getPlayer());
                break;
            case TOUCH_FAMILIAR:
                MobHandler.TouchFamiliar(slea, c, c.getPlayer());
                break;
            case USE_RECIPE:
                ItemMakerHandler.UseRecipe(slea, c, c.getPlayer());
                break;
            case USE_NEBULITE:
                InventoryHandler.UseNebulite(slea, c, c.getPlayer());
                break;
            case MOVE_ANDROID:
                PlayerHandler.MoveAndroid(slea, c, c.getPlayer());
                break;
            case SUB_LITTLEWHITE:
                SummonHandler.SubLittleWhite(slea, c.getPlayer());
                break;
            case FACE_EXPRESSION:
                PlayerHandler.ChangeEmotion(slea.readInt(), c.getPlayer());
                break;
            case FACE_ANDROID:
                PlayerHandler.ChangeAndroidEmotion(slea.readInt(), c.getPlayer());
                break;
            case TAKE_DAMAGE:
                TakeDamageHandler.TakeDamage(slea, c, c.getPlayer());
                break;
            case HEAL_OVER_TIME:
                PlayerHandler.Heal(slea, c.getPlayer());
                break;
            case CANCEL_BUFF:
                PlayerHandler.CancelBuffHandler(slea.readInt(), c.getPlayer());
                break;
            case MECH_CANCEL:
                PlayerHandler.CancelMech(slea, c.getPlayer());
                break;
            case USE_HOLY_FOUNTAIN: //??????????????????
                PlayersHandler.UseHolyFountain(slea, c, c.getPlayer());
                break;
            case CANCEL_ITEM_EFFECT:
                PlayerHandler.CancelItemEffect(slea.readInt(), c.getPlayer());
                break;
            case USE_CHAIR:
                PlayerHandler.UseChair(slea.readInt(), c, c.getPlayer());
                break;
            case CANCEL_CHAIR:
                PlayerHandler.CancelChair(slea.readShort(), c, c.getPlayer());
                break;
            case USE_ITEM_EFFECT: //????????????????????????
                PlayerHandler.UseItemEffect(slea.readInt(), c, c.getPlayer());
                break;
            case WHEEL_OF_FORTUNE: //?????????????????? ------------------- ?????????
                break; //whatever
            case USE_TITLE_EFFECT: //??????????????????
                PlayerHandler.UseTitleEffect(slea.readInt(), c, c.getPlayer());
                break;
            case USE_UNK_EFFECT:  //?????????????????? ------------------- ?????????
                break;
            case SKILL_EFFECT:
                PlayerHandler.SkillEffect(slea, c.getPlayer());
                break;
            case QUICK_SLOT:
                PlayerHandler.QuickSlot(slea, c.getPlayer());
                break;
            case MESO_DROP:
                c.getPlayer().updateTick(slea.readInt());
                PlayerHandler.DropMeso(slea.readInt(), c.getPlayer());
                break;
            case CHANGE_KEYMAP:
                PlayerHandler.ChangeKeymap(slea, c.getPlayer());
                break;
            case CHANGE_MAP:
                if (type == ServerType.???????????????) {
                    CashShopOperation.LeaveCS(slea, c, c.getPlayer());
                } else {
                    PlayerHandler.ChangeMap(slea, c, c.getPlayer());
                }
                break;
            case CHANGE_MAP_SPECIAL:
                slea.skip(1);
                PlayerHandler.ChangeMapSpecial(slea.readMapleAsciiString(), c, c.getPlayer());
                break;
            case USE_INNER_PORTAL:
                slea.skip(1);
                PlayerHandler.InnerPortal(slea, c, c.getPlayer());
                break;
            case TROCK_ADD_MAP:
                PlayerHandler.TrockAddMap(slea, c, c.getPlayer());
                break;
            case LIE_DETECTOR: //??????????????????????????????
                //PlayersHandler.LieDetector(slea, c, c.getPlayer(), true);
                break;
            case LIE_DETECTOR_SKILL: //?????????????????????????????????
                PlayersHandler.LieDetector(slea, c, c.getPlayer(), false);
                break;
            case LIE_DETECTOR_RESPONSE: //????????????????????????
                PlayersHandler.LieDetectorResponse(slea, c);
                break;
            case LIE_DETECTOR_REFRESH: //?????????????????????
                PlayersHandler.LieDetectorRefresh(slea, c);
                break;
            case ARAN_COMBO: //????????????????????????
                PlayerHandler.AranCombo(c, c.getPlayer(), 1);
                break;
            case LOST_ARAN_COMBO: //????????????????????????
                PlayerHandler.AranCombo(c, c.getPlayer(), -1);
                break;
            case SPECIAL_ATTACK:
                PlayerHandler.specialAttack(slea, c, c.getPlayer());
                break;
            case SKILL_MACRO:
                PlayerHandler.ChangeSkillMacro(slea, c.getPlayer());
                break;
            case GIVE_FAME:
                PlayersHandler.GiveFame(slea, c, c.getPlayer());
                break;
            case TRANSFORM_PLAYER:
                PlayersHandler.TransformPlayer(slea, c, c.getPlayer());
                break;
            case NOTE_ACTION:
                PlayersHandler.Note(slea, c.getPlayer());
                break;
            case USE_DOOR:
                PlayersHandler.UseDoor(slea, c.getPlayer());
                break;
            case USE_MECH_DOOR:
                PlayersHandler.UseMechDoor(slea, c.getPlayer());
                break;
            case DAMAGE_REACTOR:
                PlayersHandler.HitReactor(slea, c);
                break;
            case CLICK_REACTOR:
            case TOUCH_REACTOR:
                PlayersHandler.TouchReactor(slea, c);
                break;
            case TOUCH_RUNE:
                PlayersHandler.TouchRune(slea, c.getPlayer());
                break;
            case USE_RUNE:
                PlayersHandler.UseRune(slea, c.getPlayer());
                break;
            case CLOSE_CHALKBOARD:
                c.getPlayer().setChalkboard(null);
                break;
            case ITEM_SORT:
                InventoryHandler.ItemSort(slea, c);
                break;
            case ITEM_GATHER:
                InventoryHandler.ItemGather(slea, c);
                break;
            case ITEM_MOVE:
                InventoryHandler.ItemMove(slea, c);
                break;
            case MOVE_BAG:
                InventoryHandler.MoveBag(slea, c);
                break;
            case SWITCH_BAG:
                InventoryHandler.SwitchBag(slea, c);
                break;
            case ITEM_MAKER:
                ItemMakerHandler.ItemMaker(slea, c);
                break;
            case ITEM_PICKUP:
                InventoryHandler.Pickup_Player(slea, c, c.getPlayer());
                break;
            case USE_CASH_ITEM: //??????????????????
                UseCashItemHandler.handlePacket(slea, c, c.getPlayer());
                break;
            case USE_ADDITIONAL_ITEM: //????????????????????????
                InventoryHandler.UseAdditionalItem(slea, c, c.getPlayer());
                break;
            case USE_ITEM: //??????????????????
                InventoryHandler.UseItem(slea, c, c.getPlayer());
                break;
            case USE_COSMETIC: //???????????????
                InventoryHandler.UseCosmetic(slea, c, c.getPlayer());
                break;
            case USE_REDUCER: //???????????????
                InventoryHandler.UseReducer(slea, c, c.getPlayer());
                break;
            case USE_REDUCER_PRESTIGE: //????????????????????????
                InventoryHandler.UseReducerPrestige(slea, c, c.getPlayer());
                break;
            case USE_MAGNIFY_GLASS:
                InventoryHandler.UseMagnify(slea, c, c.getPlayer());
                break;
            case USE_CRAFTED_CUBE:
                InventoryHandler.applyBlackCube(slea, c, c.getPlayer());
                break;
            case USE_SCRIPTED_NPC_ITEM:
                InventoryHandler.UseScriptedNPCItem(slea, c, c.getPlayer());
                break;
            case USE_RETURN_SCROLL:
                InventoryHandler.UseReturnScroll(slea, c, c.getPlayer());
                break;
            case USE_UPGRADE_SCROLL:
                ItemScrollHandler.handlePacket(slea, c, c.getPlayer(), false);
                break;
            case USE_FLAG_SCROLL: // ?????????????????????????????? ?????????????????????????????? ?????????????????? ??????????????????????????????
                ItemScrollHandler.handlePacket(slea, c, c.getPlayer(), true);
                break;
            case USE_POTENTIAL_SCROLL:
            case USE_POTENTIAL_ADD_SCROLL:
            case USE_EQUIP_SCROLL:
                ItemScrollHandler.handlePacket(slea, c, c.getPlayer(), false);
                break;
            case USE_SOULS_SCROLL:
                InventoryHandler.UseSoulEnchanter(slea, c, c.getPlayer());
                break;
            case USE_SOUL_MARBLE:
                InventoryHandler.UseSoulScroll(slea, c, c.getPlayer());
                break;
            case USE_SUMMON_BAG:
                InventoryHandler.UseSummonBag(slea, c, c.getPlayer());
                break;
            case USE_TREASUER_CHEST:
                InventoryHandler.UseTreasureChest(slea, c, c.getPlayer());
                break;
            case USE_SKILL_BOOK: //???????????????
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseSkillBook((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            case USE_SP_RESET: //??????SP???????????????
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseSpReset((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            case USE_AP_RESET: //??????AP???????????????
                c.getPlayer().updateTick(slea.readInt());
                InventoryHandler.UseApReset((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            case USE_CATCH_ITEM:
                InventoryHandler.UseCatchItem(slea, c, c.getPlayer());
                break;
            case USE_MOUNT_FOOD:
                InventoryHandler.UseMountFood(slea, c, c.getPlayer());
                break;
            case REWARD_ITEM:
                InventoryHandler.UseRewardItem((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            case BUY_CROSS_ITEM: //??????????????????????????????
                InventoryHandler.BuyCrossHunterItem(slea, c, c.getPlayer());
                break;
            case HYPNOTIZE_DMG:
                MobHandler.HypnotizeDmg(slea, c.getPlayer());
                break;
            case MOB_NODE:
                MobHandler.MobNode(slea, c.getPlayer());
                break;
            case DISPLAY_NODE:
                MobHandler.DisplayNode(slea, c.getPlayer());
                break;
            case MOVE_LIFE:
                MobHandler.MoveMonster(slea, c, c.getPlayer());
                break;
            case AUTO_AGGRO:
                MobHandler.AutoAggro(slea.readInt(), c.getPlayer());
                break;
            case FRIENDLY_DAMAGE:
                MobHandler.FriendlyDamage(slea, c.getPlayer());
                break;
            case MONSTER_BOMB:
                MobHandler.MonsterBomb(slea.readInt(), c.getPlayer());
                break;
            case MOB_BOMB:
                MobHandler.MobBomb(slea, c.getPlayer());
                break;
            case NPC_SHOP:
                NPCHandler.NPCShop(slea, c, c.getPlayer());
                break;
            case NPC_TALK:
                NPCHandler.NPCTalk(slea, c, c.getPlayer());
                break;
            case NPC_TALK_MORE:
                NPCHandler.NPCMoreTalk(slea, c);
                break;
            case NPC_ACTION:
                NPCHandler.NPCAnimation(slea, c);
                break;
            case QUEST_ACTION: //????????????
                NPCHandler.QuestAction(slea, c, c.getPlayer());
                break;
            case REISSUE_MEDAL: //??????????????????
                PlayerHandler.ReIssueMedal(slea, c, c.getPlayer());
                break;
            case STORAGE: //????????????
                NPCHandler.Storage(slea, c, c.getPlayer());
                break;
            case GENERAL_CHAT:
                if (c.getPlayer() != null && c.getPlayer().getMap() != null) {
                    c.getPlayer().updateTick(slea.readInt());
                    ChatHandler.GeneralChat(slea.readMapleAsciiString(), slea.readByte(), c, c.getPlayer());
                }
                break;
            case PARTYCHAT:
                ChatHandler.Others(slea, c, c.getPlayer());
                break;
            case WHISPER:
                ChatHandler.Whisper_Find(slea, c);
                break;
            case MESSENGER:
                ChatHandler.Messenger(slea, c);
                break;
            case SHOW_LOVE_RANK:
                ChatHandler.ShowLoveRank(slea, c);
                break;
            case SPAWN_ARROWS_TURRET:
                PlayerHandler.SpawnArrowsTurret(slea, c, c.getPlayer());
                break;
            case WARLOCK_MAGIC_ATTACK:
                PlayerHandler.WarLockMagicDamage(slea, c, c.getPlayer());
                break;
            case ENTER_STARTPLANET:
                InterServerHandler.EnterMTS(c, c.getPlayer());
                break;
            case GAME_EXIT:
                PlayerHandler.GameExitHandler(c, c.getPlayer());
                break;
            case TRACK_FLAMES:
                PlayerHandler.showTrackFlames(slea, c, c.getPlayer());
                break;
            case AUTO_ASSIGN_AP:
                StatsHandling.AutoAssignAP(slea, c, c.getPlayer());
                break;
            case DISTRIBUTE_AP:
                StatsHandling.DistributeAP(slea, c, c.getPlayer());
                break;
            case DISTRIBUTE_SP: //?????????????????????
                StatsHandling.DistributeSP(slea, c, c.getPlayer());
                break;
            case DISTRIBUTE_HYPER_AP:
                c.getPlayer().updateTick(slea.readInt());
                StatsHandling.DistributeHyperSP(slea.readInt(), c, c.getPlayer(), true);
                break;
            case DISTRIBUTE_HYPER_SP: //?????????????????????
                c.getPlayer().updateTick(slea.readInt());
                StatsHandling.DistributeHyperSP(slea.readInt(), c, c.getPlayer(), false);
                break;
            case RESET_HYPER_SP: //????????????????????????
                StatsHandling.ResetHyperSP(slea, c, c.getPlayer());
                break;
            case RESET_HYPER_AP:
                StatsHandling.ResetHyperAP(slea, c, c.getPlayer());
                break;
            case PLAYER_INTERACTION:
                PlayerInteractionHandler.PlayerInteraction(slea, c, c.getPlayer());
                break;
            case GUILD_OPERATION:
                GuildHandler.Guild(slea, c);
                break;
            case DENY_GUILD_REQUEST:
                slea.skip(1);
                GuildHandler.DenyGuildRequest(slea.readMapleAsciiString(), c);
                break;
            case GUILD_APPLY:
                GuildHandler.GuildApply(slea, c);
                break;
            case ACCEPT_GUILD_APPLY:
                GuildHandler.AcceptGuildApply(slea, c);
                break;
            case DENY_GUILD_APPLY:
                GuildHandler.DenyGuildApply(slea, c);
                break;
            case ALLIANCE_OPERATION:
                AllianceHandler.HandleAlliance(slea, c, false);
                break;
            case DENY_ALLIANCE_REQUEST:
                AllianceHandler.HandleAlliance(slea, c, true);
                break;
            case QUICK_MOVE: //????????????
                NPCHandler.OpenQuickMoveNpc(slea, c);
                break;
            case BBS_OPERATION:
                BBSHandler.BBSOperation(slea, c);
                break;
            case SELECT_JAGUAR:
                PlayerHandler.selectJaguar(slea, c, c.getPlayer());
                break;
            case GIVE_KSPSYCHIC:
                PlayerHandler.showKSPsychicGrabHanlder(slea, c, c.getPlayer());
                break;
            case ATTACK_KSPSYCHIC:
                PlayerHandler.showKSPsychicAttackHanlder(slea, c, c.getPlayer());
                break;
            case CANCEL_KSPSYCHIC:
                PlayerHandler.showKSPsychicReleaseHanlder(slea, c, c.getPlayer());
                break;
            case GIVE_KSULTIMATE:
                PlayerHandler.showGiveKSUltimate(slea, c, c.getPlayer());
                break;
            case ATTACK_KSULTIMATE:
                PlayerHandler.showAttackKSUltimate(slea, c, c.getPlayer());
                break;
            case CANCEL_KSULTIMATE:
                PlayerHandler.showCancelKSUltimate(slea, c, c.getPlayer());
                break;
            case PARTY_OPERATION:
                PartyHandler.PartyOperation(slea, c);
                break;
            case DENY_PARTY_REQUEST:
                PartyHandler.DenyPartyRequest(slea, c);
                break;
            case ALLOW_PARTY_INVITE:
                PartyHandler.AllowPartyInvite(slea, c);
                break;
            case SIDEKICK_OPERATION:
                PartyHandler.SidekickOperation(slea, c);
                break;
            case DENY_SIDEKICK_REQUEST:
                PartyHandler.DenySidekickRequest(slea, c);
                break;
            case BUDDYLIST_MODIFY:
                BuddyListHandler.BuddyOperation(slea, c);
                break;
            case CYGNUS_SUMMON:
                UserInterfaceHandler.CygnusSummon_NPCRequest(c);
                break;
            case SHIP_OBJECT:
                UserInterfaceHandler.ShipObjectRequest(slea.readInt(), c);
                break;
            case BUY_CS_ITEM: //??????????????????
                BuyCashItemHandler.BuyCashItem(slea, c, c.getPlayer());
                break;
            case COUPON_CODE: //??????????????????????????????
                CouponCodeHandler.handlePacket(slea, c, c.getPlayer());
                break;
            case CS_UPDATE: //????????????
                CashShopOperation.CSUpdate(c);
                break;
            case SEND_CS_GIFI: //????????????
                BuyCashItemHandler.????????????(slea, c, c.getPlayer());
                break;
            case OPEN_AVATAR_RANDOM_BOX:
                break;
            case TOUCHING_MTS:
                MTSOperation.MTSUpdate(MTSStorage.getInstance().getCart(c.getPlayer().getId()), c);
                break;
            case MTS_TAB:
                MTSOperation.MTSOperation(slea, c);
                break;
            case USE_POT:
                ItemMakerHandler.UsePot(slea, c);
                break;
            case CLEAR_POT:
                ItemMakerHandler.ClearPot(slea, c);
                break;
            case FEED_POT:
                ItemMakerHandler.FeedPot(slea, c);
                break;
            case CURE_POT:
                ItemMakerHandler.CurePot(slea, c);
                break;
            case REWARD_POT:
                ItemMakerHandler.RewardPot(slea, c);
                break;
            case MOVE_LITTLEWHITE:
                SummonHandler.MoveLittleWhite(slea, c.getPlayer());
                break;
            case DAMAGE_SUMMON:
                SummonHandler.DamageSummon(slea, c.getPlayer());
                break;
            case MOVE_SUMMON:
                SummonHandler.MoveSummon(slea, c.getPlayer());
                break;
            case MOVE_DRAGON: //????????????
                SummonHandler.MoveDragon(slea, c.getPlayer());
                break;
            case DRAGON_FLY: //?????????
                SummonHandler.DragonFly(slea, c.getPlayer());
                break;
            case SUB_SUMMON:
                SummonHandler.SubSummon(slea, c.getPlayer());
                break;
            case REMOVE_SUMMON:
                SummonHandler.RemoveSummon(slea, c);
                break;
            case SPAWN_PET:
                PetHandler.SpawnPet(slea, c, c.getPlayer());
                break;
            case PET_AUTO_BUFF:
                PetHandler.Pet_AutoBuff(slea, c, c.getPlayer());
                break;
            case MOVE_PET:
                PetHandler.MovePet(slea, c.getPlayer());
                break;
            case PET_CHAT:
                PetHandler.PetChat(slea, c, c.getPlayer());
                break;
            case PET_COMMAND:
                PetHandler.PetCommand(slea, c, c.getPlayer());
                break;
            case PET_FOOD:
                PetHandler.PetFood(slea, c, c.getPlayer());
                break;
            case PET_LOOT:
                InventoryHandler.Pickup_Pet(slea, c, c.getPlayer());
                break;
            case PET_AUTO_POT:
                PetHandler.Pet_AutoPotion(slea, c, c.getPlayer());
                break;
            case PET_EXCEPTION_LIST:
                PetHandler.PetExcludeItems(slea, c, c.getPlayer());
                break;
            case PET_AOTO_EAT:
                slea.skip(4);
                PetHandler.PetFood(slea, c, c.getPlayer());
                break;
            case ALLOW_PET_LOOT: //??????????????????????????????
                PetHandler.AllowPetLoot(slea, c, c.getPlayer());
                break;
            case ALLOW_PET_AOTO_EAT: //??????????????????????????????
                PetHandler.AllowPetAutoEat(slea, c, c.getPlayer());
                break;
            case MONSTER_CARNIVAL:
                MonsterCarnivalHandler.MonsterCarnival(slea, c);
                break;
            case DUEY_ACTION:
                DueyHandler.DueyOperation(slea, c);
                break;
            case USE_HIRED_MERCHANT:
                HiredMerchantHandler.UseHiredMerchant(c, true);
                break;
            case MERCH_ITEM_STORE:
                HiredMerchantHandler.MerchantItemStore(slea, c);
                break;
            case CANCEL_DEBUFF:
                // Ignore for now
                break;
            case MAPLETV:
                break;
            case LEFT_KNOCK_BACK:
                PlayerHandler.leftKnockBack(slea, c);
                break;
            case SNOWBALL:
                PlayerHandler.snowBall(slea, c);
                break;
            case COCONUT:
                PlayersHandler.hitCoconut(slea, c);
                break;
            case REPAIR:
                NPCHandler.repair(slea, c);
                break;
            case REPAIR_ALL:
                NPCHandler.repairAll(c);
                break;
            case GAME_POLL:
                UserInterfaceHandler.InGame_Poll(slea, c);
                break;
            case OWL:
                InventoryHandler.Owl(slea, c);
                break;
            case OWL_WARP:
                InventoryHandler.OwlWarp(slea, c);
                break;
            case USE_OWL_MINERVA:
                InventoryHandler.OwlMinerva(slea, c);
                break;
            case RPS_GAME:
                NPCHandler.RPSGame(slea, c);
                break;
            case UPDATE_QUEST:
                NPCHandler.UpdateQuest(slea, c);
                break;
            case USE_ITEM_QUEST:
                NPCHandler.UseItemQuest(slea, c);
                break;
            case FOLLOW_REQUEST:
                PlayersHandler.FollowRequest(slea, c);
                break;
            case AUTO_FOLLOW_REPLY:
            case FOLLOW_REPLY:
                PlayersHandler.FollowReply(slea, c);
                break;
            case RING_ACTION:
                PlayersHandler.RingAction(slea, c);
                break;
            case REQUEST_FAMILY:
                FamilyHandler.RequestFamily(slea, c);
                break;
            case OPEN_FAMILY:
                FamilyHandler.OpenFamily(slea, c);
                break;
            case FAMILY_OPERATION:
                FamilyHandler.FamilyOperation(slea, c);
                break;
            case DELETE_JUNIOR:
                FamilyHandler.DeleteJunior(slea, c);
                break;
            case DELETE_SENIOR:
                FamilyHandler.DeleteSenior(slea, c);
                break;
            case USE_FAMILY:
                FamilyHandler.UseFamily(slea, c);
                break;
            case FAMILY_PRECEPT:
                FamilyHandler.FamilyPrecept(slea, c);
                break;
            case FAMILY_SUMMON:
                FamilyHandler.FamilySummon(slea, c);
                break;
            case ACCEPT_FAMILY:
                FamilyHandler.AcceptFamily(slea, c);
                break;
            case SOLOMON:
                PlayersHandler.Solomon(slea, c);
                break;
            case GACH_EXP:
                PlayersHandler.GachExp(slea, c);
                break;
            case PARTY_SEARCH_START:
                PartyHandler.MemberSearch(slea, c);
                break;
            case PARTY_SEARCH_STOP:
                PartyHandler.PartySearch(slea, c);
                break;
            case EXPEDITION_LISTING:
                PartyHandler.PartyListing(slea, c);
                break;
            case EXPEDITION_OPERATION:
                PartyHandler.Expedition(slea, c);
                break;
            case USE_TELE_ROCK:
                InventoryHandler.TeleRock(slea, c);
                break;
            case PAM_SONG:
                InventoryHandler.PamSong(slea, c);
                break;
            case REPORT:
                PlayersHandler.Report(slea, c);
                break;
            case REMOTE_STORE: //?????????????????????
                HiredMerchantHandler.RemoteStore(slea, c);
                break;
            case SHIKONGJUAN: //????????????
                PlayerHandler.UseChronosphere(slea, c, c.getPlayer());
                break;
            case PLAYER_UPDATE: //??????????????????
                PlayerHandler.PlayerUpdate(c, c.getPlayer());
                break;
            case CHANGE_MARKET_MAP:
                PlayerHandler.ChangeMarketMap(slea, c, c.getPlayer());
                break;
            case TEACH_SKILL: //????????????
                PlayerHandler.TeachSkill(slea, c, c.getPlayer());
                break;
            case SET_CHAR_CASH:
                PlayerHandler.showPlayerCash(slea, c);
                break;
            case OPEN_WORLDMAP:
                c.getSession().write(MaplePacketCreator.openWorldMap());
                break;
            case USE_HAMMER: //???????????????
                UseHammerHandler.UseHammer(slea, c);
                break;
            case HAMMER_RESPONSE: //???????????????
                UseHammerHandler.HammerResponse(slea, c);
                break;
            case MEMORY_SKILL_CHOOSE:  //??????????????????
                PhantomMemorySkill.MemorySkillChoose(slea, c);
                break;
            case MEMORY_SKILL_CHANGE: //??????????????????
                PhantomMemorySkill.MemorySkillChange(slea, c);
                break;
            case MEMORY_SKILL_OBTAIN: //????????????
                PhantomMemorySkill.MemorySkillObtain(slea, c);
                break;
            case PLAYER_VIEW_RANGE:
                //to do
                break;
            case CHANGE_POTENTIAL: // ???????????????????????????
                ItemScrollHandler.ChangeWeaponOptential(slea, c, c.getPlayer());
                break;
            case CHANGE_POTENTIAL_WP:
                ItemScrollHandler.ChangeWeaponOptential_WP(slea, c, c.getPlayer());
                break;
            case OPEN_ROOT_NPC:
                NPCScriptManager.getInstance().dispose(c);
                NPCScriptManager.getInstance().start(c, 1064026, 1);
                break;
            case POINT_POWER:
                if (c.getPlayer() != null) {
                    c.getPlayer().startPower();
                }
                break;
            case USE_TEMPEST_BLADES: //??????????????????
                PlayerHandler.useTempestBlades(slea, c, c.getPlayer());
                break;
            case UNKNOWN_168:
                /*
                 * 68 01
                 * 09 00 31 32 33 31 32 33 31 32 33 - ????????????
                 */
                c.getSession().write(MaplePacketCreator.sendUnkPacket1FC());
                break;
            case QUICK_BUY_CS_ITEM: //?????????????????????????????????
                PlayerHandler.quickBuyCashShopItem(slea, c, c.getPlayer());
                break;
            case SYSTEM_PROCESS_LIST:
                SystemProcess.SystemProcess(slea, c, c.getPlayer());
                break;
            case SOUL_MODE:
                PlayerHandler.updateSoulEffect(slea, c, c.getPlayer());
                break;
            case SIGNIN_OPERATION:
                PlayerHandler.openSigin(slea, c, c.getPlayer());
                break;
            case POTION_POT_USE:
                PotionPotHandler.PotionPotUse(slea, c, c.getPlayer());
                break;
            case POTION_POT_ADD:
                PotionPotHandler.PotionPotAdd(slea, c, c.getPlayer());
                break;
            case POTION_POT_MODE:
                PotionPotHandler.PotionPotMode(slea, c, c.getPlayer());
                break;
            case POTION_POT_INCR:
                PotionPotHandler.PotionPotIncr(slea, c, c.getPlayer());
                break;
            case APPLY_HYUNCUBE:
                InventoryHandler.applyHyunCube(slea, c, c.getPlayer());
                break;
            case CHANGE_ZERO_LOOK:
                PlayerHandler.changeZeroLook(slea, c, c.getPlayer(), false);
                break;
            case CHANGE_ZERO_LOOK_END:
                PlayerHandler.changeZeroLook(slea, c, c.getPlayer(), true);
                break;
            case EXTRA_ATTACK:
                PlayerHandler.ExtraAttack(slea, c, c.getPlayer());
                break;
            case MOVE_ENERGY:
                PlayerHandler.MoveEnergyBall(slea, c);
                break;
            case HIDDEN_TAIL_ADN_EAR:
                if (c.getPlayer() != null) {
                    c.getPlayer().hiddenTailAndEar(slea.readInt());
                }
                break;
            case DF_COMBO:
                PlayerHandler.absorbingDF(slea, c, c.getPlayer());
                break;
            case EFFECT_SWITCH:
                PlayerHandler.effectSwitch(slea, c);
                break;
            case SELECT_CHAIR:
                PlayerHandler.selectChair(slea, c, c.getPlayer());
                break;
            default:
                System.out.println("[???????????????] Recv " + header.toString() + " [" + HexTool.getOpcodeToString(header.getValue()) + "]");
                break;
        }
    }
}
