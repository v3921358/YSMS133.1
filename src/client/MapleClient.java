package client;

import handling.world.messenger.MapleMessengerCharacter;
import handling.world.party.MaplePartyCharacter;
import handling.world.party.MapleParty;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import database.DatabaseException;

import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.*;
import handling.world.family.MapleFamilyCharacter;
import handling.world.guild.MapleGuildCharacter;
import handling.world.sidekick.MapleSidekick;

import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.script.ScriptEngine;

import org.apache.log4j.Logger;
import org.apache.mina.core.session.IoSession;

import scripting.item.ItemActionManager;
import scripting.item.ItemScriptManager;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestActionManager;
import scripting.quest.QuestScriptManager;
import server.CharacterCardFactory;
import server.Timer.PingTimer;
import server.WinStart;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import server.shops.IMaplePlayerShop;
import tools.*;
import tools.packet.LoginPacket;

public class MapleClient implements Serializable {

    private static final Logger log = Logger.getLogger(MapleClient.class);
    private static final long serialVersionUID = 9179541993413738569L;
    public static final byte LOGIN_NOTLOGGEDIN = 0, LOGIN_SERVER_TRANSITION = 1, LOGIN_LOGGEDIN = 2, CHANGE_CHANNEL = 3, ENTERING_PIN = 4, PIN_CORRECT = 5, LOGIN_CS_LOGGEDIN = 6;
    public static final int DEFAULT_CHARSLOT = LoginServer.getMaxCharacters();
    public static final String CLIENT_KEY = "CLIENT";
    private transient MapleAESOFB send, receive;
    private transient IoSession session;
    private MapleCharacter player;
    private int channel = 1, accId = -1, world, birthday;
    private int charslots = DEFAULT_CHARSLOT; //????????????????????????
    private int cardslots = 3; //??????????????????
    private boolean loggedIn = false, serverTransition = false;
    private transient Calendar tempban = null;
    private String accountName;
    private transient long lastPong = 0, lastPing = 0, lastChatServerPong = 0, lastChatServerPing = 0;
    private boolean monitored = false, receiving = true;
    private boolean gm;
    private byte greason = 1, gender = -1;
    public transient short loginAttempt = 0;
    private transient List<Integer> allowedChar = new LinkedList<>();
    private transient String mac = "00-00-00-00-00-00";
    private transient List<String> maclist = new LinkedList<>();
    private transient Map<String, ScriptEngine> engines = new HashMap<>();
    private transient ScheduledFuture<?> idleTask = null;
    private transient String secondPassword, salt2, tempIP = ""; // To be used only on login
    private final transient Lock mutex = new ReentrantLock(true);
    private final transient Lock npc_mutex = new ReentrantLock();
    private long lastNpcClick = 0, sessionId;
    private final static Lock login_mutex = new ReentrantLock(true);
    private byte loginattempt = 0;
    private DebugUI debugWindow; //??????????????????
    private Map<Integer, Pair<Short, Short>> charInfo = new LinkedHashMap<>();
    private List<String> proesslist = new ArrayList<>();
    private Triple<String, String, Boolean> tempinfo = null;

    public MapleClient(MapleAESOFB send, MapleAESOFB receive, IoSession session) {
        this.send = send;
        this.receive = receive;
        this.session = session;
    }

    public synchronized MapleAESOFB getReceiveCrypto() {
        return receive;
    }

    public synchronized MapleAESOFB getSendCrypto() {
        return send;
    }

    public synchronized IoSession getSession() {
        return session;
    }

    public long getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(long sessionId) {
        this.sessionId = sessionId;
    }

    public void StartWindow() {
        if (debugWindow != null) {
            debugWindow.setVisible(false);
            debugWindow = null;
        }
        debugWindow = new DebugUI();
        debugWindow.setVisible(true);
        debugWindow.setC(this);
    }

    public Lock getLock() {
        return mutex;
    }

    public Lock getNPCLock() {
        return npc_mutex;
    }

    public MapleCharacter getPlayer() {
        return player;
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void createdChar(int id) {
        allowedChar.add(id);
    }

    public boolean login_Auth(int id) {
        return allowedChar.contains(id);
    }

    public List<MapleCharacter> loadCharacters(int serverId) { // TODO make this less costly zZz
        List<MapleCharacter> chars = new LinkedList<>();
        Map<Integer, CardData> cards = CharacterCardFactory.getInstance().loadCharacterCards(accId, serverId);
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            MapleCharacter chr = MapleCharacter.loadCharFromDB(cni.id, this, false, cards);
            chars.add(chr);
            charInfo.put(chr.getId(), new Pair<>(chr.getLevel(), chr.getJob()));
            if (!login_Auth(chr.getId())) {
                allowedChar.add(chr.getId());
            }
        }
        return chars;
    }

    public void updateCharacterCards(Map<Integer, Integer> cids) {
        if (charInfo.isEmpty()) { //????????????
            return;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM `character_cards` WHERE `accid` = ?")) {
                ps.setInt(1, accId);
                ps.executeUpdate();
            }

            try (PreparedStatement psu = con.prepareStatement("INSERT INTO `character_cards` (accid, worldid, characterid, position) VALUES (?, ?, ?, ?)")) {
                for (Entry<Integer, Integer> ii : cids.entrySet()) {
                    Pair<Short, Short> info = charInfo.get(ii.getValue());
                    if (info == null || ii.getValue() == 0 || !CharacterCardFactory.getInstance().canHaveCard(info.getLeft(), info.getRight())) {
                        continue;
                    }
                    psu.setInt(1, accId);
                    psu.setInt(2, world);
                    psu.setInt(3, ii.getValue());
                    psu.setInt(4, ii.getKey());
                    psu.executeUpdate();
                }
            }
        } catch (SQLException e) {
            log.error("Failed to update character cards. Reason:", e);
        }
    }

    public boolean canMakeCharacter(int serverId) {
        return loadCharactersSize(serverId) < getAccCharSlots();
    }

    public List<String> loadCharacterNames(int serverId) {
        List<String> chars = new LinkedList<>();
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal(int serverId) {
        List<CharNameAndId> chars = new LinkedList<>();
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT id, name, gm FROM characters WHERE accountid = ? AND world = ?")) {
                ps.setInt(1, accId);
                ps.setInt(2, serverId);

                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
                        LoginServer.getLoginAuth(rs.getInt("id"));
                    }
                }
            }
        } catch (SQLException e) {
            log.error("error loading characters internal", e);
        }
        return chars;
    }

    /*
     * ????????????????????????????????????????????????
     */
    public int loadCharactersSize(int serverId) {
        int chars = 0;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT count(*) FROM characters WHERE accountid = ? AND world = ?")) {
                ps.setInt(1, accId);
                ps.setInt(2, serverId);

                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        chars = rs.getInt(1);
                    }
                }
            }
        } catch (SQLException e) {
            log.error("error loading characters size", e);
        }
        return chars;
    }

    public boolean isLoggedIn() {
        return loggedIn && accId >= 0;
    }

    private Calendar getTempBanCalendar(ResultSet rs) throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        if (rs.getLong("tempban") == 0) { // basically if timestamp in db is 0000-00-00
            lTempban.setTimeInMillis(0);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }
        lTempban.setTimeInMillis(0);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return tempban;
    }

    public byte getBanReason() {
        return greason;
    }

    public boolean hasBannedIP() {
        boolean ret = false;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')")) {
                ps.setString(1, getSessionIPAddress());
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    if (rs.getInt(1) > 0) {
                        ret = true;
                    }
                }
            }
        } catch (SQLException ex) {
            log.error("Error checking ip bans", ex);
        }
        return ret;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        this.mac = macData;
    }

    public boolean hasBannedMac() {
        if (mac.equalsIgnoreCase("00-00-00-00-00-00") || mac.length() != 17) {
            return false;
        }
        boolean ret = false;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT COUNT(*) FROM macbans WHERE mac = ?")) {
                ps.setString(1, mac);
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    if (rs.getInt(1) > 0) {
                        ret = true;
                    }
                }
            }
        } catch (SQLException ex) {
            log.error("Error checking mac bans", ex);
        }
        return ret;
    }

    public void banMacs() {
        banMacs(mac);
    }

    public void banMacs(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO macbans (mac) VALUES (?)")) {
                ps.setString(1, macData);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("Error banning MACs", e);
        }
    }

    public void updateMacs() {
        updateMacs(mac);
    }

    public void updateMacs(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?")) {
                ps.setString(1, macData);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("Error saving MACs", e);
        }
    }

    /**
     * Returns 0 on success, a state to be used for
     * {@link LoginPacket#getLoginFailed(MapleEnumClass.AuthReply)} otherwise.
     *
     * @return The state of the login.
     */
    public int finishLogin() {
        login_mutex.lock();
        try {
            byte state = getLoginState();
            if (state > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin
                loggedIn = false;
                return 7;
            }
            updateLoginState(MapleClient.LOGIN_LOGGEDIN, getSessionIPAddress());
        } finally {
            login_mutex.unlock();
        }
        return 0;
    }

    public void clearInformation() {
        accountName = null;
        accId = -1;
        secondPassword = null;
        salt2 = null;
        gm = false;
        loggedIn = false;
        mac = "00-00-00-00-00-00";
        maclist.clear();
    }

    public int changePassword(String oldpwd, String newpwd) {
        int ret = -1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                boolean updatePassword = false;
                String passhash = rs.getString("password");
                String salt = rs.getString("salt");
                if (passhash == null || passhash.isEmpty()) {
                    ret = -1;
                } else if (LoginCryptoLegacy.isLegacyPassword(passhash) && LoginCryptoLegacy.checkPassword(oldpwd, passhash)) {
                    ret = 0;
                    updatePassword = true;
                } else if (oldpwd.equals(passhash)) {
                    ret = 0;
                    updatePassword = true;
                } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, oldpwd)) {
                    ret = 0;
                    updatePassword = true;
                } else if (LoginCrypto.checkSaltedSha512Hash(passhash, oldpwd, salt)) {
                    ret = 0;
                    updatePassword = true;
                } else {
                    ret = -1;
                }
                if (updatePassword) {
                    PreparedStatement pss = con.prepareStatement("UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?");
                    try {
                        String newSalt = LoginCrypto.makeSalt();
                        pss.setString(1, LoginCrypto.makeSaltedSha512Hash(newpwd, newSalt));
                        pss.setString(2, newSalt);
                        pss.setInt(3, accId);
                        pss.executeUpdate();
                    } finally {
                        pss.close();
                    }
                }
            }
            ps.close();
            rs.close();
        } catch (SQLException e) {
            log.error("????????????????????????????????????.\r\n", e);
        }
        return ret;
    }

    public MapleEnumClass.AuthReply login(String login, String pwd, boolean ipMacBanned, boolean useKey) {
        MapleEnumClass.AuthReply loginok = MapleEnumClass.AuthReply.GAME_ACCOUNT_NOT_LANDED;
        if (!useKey) {
            loginattempt++;
            if (loginattempt > 6) {
                log.info("??????[" + login + "]??????????????????6?????????????????????????????????????????????.");
                getSession().close(true);
            }
        }
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?")) {
                ps.setString(1, login);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        int banned = rs.getInt("banned");
                        String passhash = rs.getString("password");
                        String salt = rs.getString("salt");
                        String oldSession = rs.getString("SessionIP");

                        accountName = login;
                        accId = rs.getInt("id");
                        secondPassword = rs.getString("2ndpassword");
                        salt2 = rs.getString("salt2");
                        gm = rs.getInt("gm") > 0;
                        greason = rs.getByte("greason");
                        tempban = getTempBanCalendar(rs);
                        gender = rs.getByte("gender");

                        maclist = new LinkedList<>();
                        String macStrs = rs.getString("maclist");
                        if (macStrs != null) {
                            String[] macData = macStrs.split(",");
                            for (String macData1 : macData) {
                                if (macData1.length() == 17) {
                                    maclist.add(macData1);
                                }
                            }
                        }

                        if (secondPassword != null && salt2 != null) {
                            secondPassword = LoginCrypto.rand_r(secondPassword);
                        }
                        ps.close();

                        if (useKey) {
                            loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                        } else {
                            if (banned > 0 && !gm) {
                                loginok = MapleEnumClass.AuthReply.GAME_ACCOUNT_DELETE;
                            } else {
                                if (banned == -1) {
                                    unban();
                                }
                                byte loginstate = getLoginState();
                                if (loginstate > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin
                                    loggedIn = false;
                                    loginok = MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT;
                                } else {
                                    boolean updatePasswordHash = false;
                                    // Check if the passwords are correct here. :B
                                    if (passhash == null || passhash.isEmpty()) {
                                        //match by sessionIP
                                        if (oldSession != null && !oldSession.isEmpty()) {
                                            loggedIn = getSessionIPAddress().equals(oldSession);
                                            loginok = loggedIn ? MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL : MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                            updatePasswordHash = loggedIn;
                                        } else {
                                            loginok = MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                            loggedIn = false;
                                        }
                                    } else if (LoginCryptoLegacy.isLegacyPassword(passhash) && LoginCryptoLegacy.checkPassword(pwd, passhash)) {
                                        // Check if a password upgrade is needed.
                                        loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                        updatePasswordHash = true;
                                    } else if (pwd.equals(passhash)) {
                                        loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                        updatePasswordHash = true;
                                    } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, pwd)) {
                                        loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                        updatePasswordHash = true;
                                    } else if (LoginCrypto.checkSaltedSha512Hash(passhash, pwd, salt)) {
                                        loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                    } else {
                                        loggedIn = false;
                                        loginok = MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                    }
                                    if (updatePasswordHash && LoginServer.isUseSha1Hash()) {
                                        try (PreparedStatement pss = con.prepareStatement("UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?")) {
                                            String newSalt = LoginCrypto.makeSalt();
                                            pss.setString(1, LoginCrypto.makeSaltedSha512Hash(pwd, newSalt));
                                            pss.setString(2, newSalt);
                                            pss.setInt(3, accId);
                                            pss.executeUpdate();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (SQLException e) {
            log.error("??????????????????????????????. ??????: " + login + " \r\n", e);
        }
        /*
         * ????????????????????????
         * ?????????????????????????????????
         * ??????????????????????????????????????????
         */
        try {
            if (loginok == MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL) {
                ResultSet payrs;
                try (PreparedStatement payps = con.prepareStatement("SELECT * FROM hypay WHERE accname = ?")) {
                    payps.setString(1, login);
                    payrs = payps.executeQuery();
                    if (!payrs.next()) { //??????????????? ??????????????????SQL ????????????
                        PreparedStatement psu = con.prepareStatement("INSERT INTO hypay (accname, pay, payUsed, payReward) VALUES (?, ?, ?, ?)");
                        psu.setString(1, login);
                        psu.setInt(2, 0); //??????????????????
                        psu.setInt(3, 0); //??????????????????
                        psu.setInt(4, 0); //????????????
                        psu.executeUpdate();
                        psu.close();
                    }
                }
                payrs.close();
            }
        } catch (SQLException e) {
            log.error("??????????????????????????????. ??????: " + login + " \r\n", e);
        }
        return loginok;
    }
     public static void ????????????????????????(int AccId) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM `characters` WHERE `accountid` = ?");
            ps.setInt(1, AccId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {                
                for (ChannelServer cservs : ChannelServer.getAllInstances()) {
                    MapleCharacter player = cservs.getPlayerStorage().getCharacterById(rs.getInt("id"));
                    if(player != null){
                        System.out.println("????????????????????????"+player.getName());
			player.getClient().disconnect(true, false);
			player.getClient().getSession().close(true);
                    }
                }
            }
        } catch (Exception e) {
        }

    }

    public boolean CheckSecondPassword(String in) {
        boolean allow = false;
        boolean updatePasswordHash = false;
        // Check if the passwords are correct here. :B
        if (LoginCryptoLegacy.isLegacyPassword(secondPassword) && LoginCryptoLegacy.checkPassword(in, secondPassword)) {
            // Check if a password upgrade is needed.
            allow = true;
            updatePasswordHash = true;
        } else if (salt2 == null && LoginCrypto.checkSha1Hash(secondPassword, in)) {
            allow = true;
            updatePasswordHash = true;
        } else if (LoginCrypto.checkSaltedSha512Hash(secondPassword, in, salt2)) {
            allow = true;
        }
        if (updatePasswordHash) {
            try {
                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `salt2` = ? WHERE id = ?");
                String newSalt = LoginCrypto.makeSalt();
                ps.setString(1, LoginCrypto.rand_s(LoginCrypto.makeSaltedSha512Hash(in, newSalt)));
                ps.setString(2, newSalt);
                ps.setInt(3, accId);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException e) {
                return false;
            }
        }
        return allow;
    }

    private void unban() {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?");
            ps.setInt(1, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
        }
    }

    public static byte unban(String charname) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?");
            ps.setString(1, charname);

            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();

            ps = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?");
            ps.setInt(1, accid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
        return 0;
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public int getAccID() {
        return this.accId;
    }

    public void updateLoginState(int newstate) {
        updateLoginState(newstate, getSessionIPAddress());
    }

    public void updateLoginState(int newstate, String SessionID) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = ?, SessionIP = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ?");
            ps.setInt(1, newstate);
            ps.setString(2, SessionID);
            ps.setInt(3, getAccID());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error updating login state", e);
        }
        if (newstate == MapleClient.LOGIN_NOTLOGGEDIN) {
            loggedIn = false;
            serverTransition = false;
        } else {
            serverTransition = (newstate == MapleClient.LOGIN_SERVER_TRANSITION || newstate == MapleClient.CHANGE_CHANNEL);
            loggedIn = !serverTransition;
        }
    }

    public void updateSecondPassword() {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `salt2` = ? WHERE id = ?");
            String newSalt = LoginCrypto.makeSalt();
            ps.setString(1, LoginCrypto.rand_s(LoginCrypto.makeSaltedSha512Hash(secondPassword, newSalt)));
            ps.setString(2, newSalt);
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error updating login state", e);
        }
    }

    public byte getLoginState() {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT loggedin, lastlogin, banned, `birthday` + 0 AS `bday` FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            if (!rs.next() || rs.getInt("banned") > 0) {
                ps.close();
                rs.close();
                session.close(true);
                throw new DatabaseException("Account doesn't exist or is banned");
            }
            birthday = rs.getInt("bday");
            byte state = rs.getByte("loggedin");

            /*
             * ??????????????????????????????????????????
             * ?????? lastlogin ???????????? 20??? ???????????????????????????
             * ???????????????????????? 0
             */
            if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
                if (rs.getTimestamp("lastlogin").getTime() + 20000 < System.currentTimeMillis()) { // connecting to chanserver timeout
                    state = MapleClient.LOGIN_NOTLOGGEDIN;
                    updateLoginState(state, getSessionIPAddress());
                }
            }
            rs.close();
            ps.close();
            loggedIn = state == MapleClient.LOGIN_LOGGEDIN;
            return state;
        } catch (SQLException e) {
            loggedIn = false;
            throw new DatabaseException("error getting login state", e);
        }
    }

    public boolean checkBirthDate(int date) {
        return birthday == date;
    }

    public void removalTask(boolean shutdown) {
        try {
            player.cancelAllBuffs_();
            player.cancelAllDebuffs();
            if (player.getMarriageId() > 0) {
                MapleQuestStatus stat1 = player.getQuestNoAdd(MapleQuest.getInstance(160001));
                MapleQuestStatus stat2 = player.getQuestNoAdd(MapleQuest.getInstance(160002));
                if (stat1 != null && stat1.getCustomData() != null && (stat1.getCustomData().equals("2_") || stat1.getCustomData().equals("2"))) {
                    //dc in process of marriage
                    if (stat2 != null && stat2.getCustomData() != null) {
                        stat2.setCustomData("0");
                    }
                    stat1.setCustomData("3");
                }
            }
            if (player.getMapId() == GameConstants.JAIL && !player.isIntern()) {
                MapleQuestStatus stat1 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_TIME));
                MapleQuestStatus stat2 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST));
                if (stat1.getCustomData() == null) {
                    stat1.setCustomData(String.valueOf(System.currentTimeMillis()));
                } else if (stat2.getCustomData() == null) {
                    stat2.setCustomData("0"); //seconds of jail
                } else { //previous seconds - elapsed seconds
                    int seconds = Integer.parseInt(stat2.getCustomData()) - (int) ((System.currentTimeMillis() - Long.parseLong(stat1.getCustomData())) / 1000);
                    if (seconds < 0) {
                        seconds = 0;
                    }
                    stat2.setCustomData(String.valueOf(seconds));
                }
            }
            player.changeRemoval(true);
            if (player.getEventInstance() != null) {
                player.getEventInstance().playerDisconnected(player, player.getId());
            }
            IMaplePlayerShop shop = player.getPlayerShop();
            if (shop != null) {
                shop.removeVisitor(player);
                if (shop.isOwner(player)) {
                    if (shop.getShopType() == 1 && shop.isAvailable() && !shutdown) {
                        shop.setOpen(true);
                    } else {
                        shop.closeShop(true, !shutdown);
                    }
                }
            }
            player.setMessenger(null);
            if (player.getAntiMacro().inProgress()) {
                player.getAntiMacro().end();
            }
            if (player.getMap() != null) {
                if (shutdown || (getChannelServer() != null && getChannelServer().isShutdown())) {
                    int questID = -1;
                    switch (player.getMapId()) {
                        case 240060200: //???????????? - ??????????????????
                            questID = 160100;
                            break;
                        case 240060201: //???????????? - ????????????????????????
                            questID = 160103;
                            break;
                        case 280030100: //??????????????? - ???????????????
                        case 280030000: //????????? - ???????????????
                            questID = 160101;
                            break;
                        case 280030001: //??????????????? - ?????????????????????
                            questID = 160102;
                            break;
                        case 270050100: //??????????????? - ????????????
                            questID = 160104;
                            break;
                        case 105100300: //??????????????? - ??????????????????
                        case 105100400: //??????????????? - ??????????????????
                            questID = 160106;
                            break;
                        case 211070000: //??????????????? - ???????????????
                        case 211070100: //??????????????? - ?????????
                        case 211070101: //??????????????? - ????????????
                        case 211070110: //??????????????? - ????????????
                            questID = 160107;
                            break;
                        case 551030200: //???????????? - ????????????
                            questID = 160108;
                            break;
                        case 271040100: //??????????????? - ??????????????????
                            questID = 160109;
                            break;
                    }
                    if (questID > 0) {
                        player.getQuestNAdd(MapleQuest.getInstance(questID)).setCustomData("0"); //reset the time.
                    }
                } else if (player.isAlive()) {
                    switch (player.getMapId()) {
                        case 541010100: //????????? - ?????????
                        case 541020800: //????????? - ????????????????????????
                        case 220080001: //????????? - ??????????????????
                            player.getMap().addDisconnected(player.getId());
                            break;
                    }
                }
                player.getMap().removePlayer(player);
            }
        } catch (Throwable e) {
            FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
        }
    }

    public void disconnect(boolean RemoveInChannelServer, boolean fromCS) {
        disconnect(RemoveInChannelServer, fromCS, false);
    }

    public void disconnect(boolean RemoveInChannelServer, boolean fromCS, boolean shutdown) {
        if (debugWindow != null) {
            debugWindow.setVisible(false);
            debugWindow = null;
        }
        if (player != null) {
            MapleMap map = player.getMap();
            MapleParty party = player.getParty();
            String namez = player.getName();
            int idz = player.getId(), messengerId = player.getMessenger() == null ? 0 : player.getMessenger().getId(), gid = player.getGuildId(), fid = player.getFamilyId();
            BuddyList chrBuddy = player.getBuddylist();
            MaplePartyCharacter chrParty = new MaplePartyCharacter(player);
            MapleMessengerCharacter chrMessenger = new MapleMessengerCharacter(player);
            MapleGuildCharacter chrGuild = player.getMGC();
            MapleFamilyCharacter chrFamily = player.getMFC();

            removalTask(shutdown);
            LoginServer.getLoginAuth(player.getId());
            LoginServer.getLoginAuthKey(accountName, true);
            player.saveToDB(true, fromCS);
            if (shutdown) {
                player = null;
                receiving = false;
                return;
            }

            if (!fromCS) {
                ChannelServer ch = ChannelServer.getInstance(map == null ? channel : map.getChannel());
                int chz = WorldFindService.getInstance().findChannel(idz);
                if (chz < -1) {
                    disconnect(RemoveInChannelServer, true);//u lie
                    return;
                }
                try {
                    if (chz == -1 || ch == null || ch.isShutdown()) {
                        player = null;
                        return;//no idea
                    }
                    if (messengerId > 0) {
                        WorldMessengerService.getInstance().leaveMessenger(messengerId, chrMessenger);
                    }
                    if (party != null) {
                        chrParty.setOnline(false);
                        WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, chrParty);
                        if (map != null && party.getLeader().getId() == idz) {
                            MaplePartyCharacter lchr = null;
                            for (MaplePartyCharacter pchr : party.getMembers()) {
                                if (pchr != null && map.getCharacterById(pchr.getId()) != null && (lchr == null || lchr.getLevel() < pchr.getLevel())) {
                                    lchr = pchr;
                                }
                            }
                            if (lchr != null) {
                                WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.CHANGE_LEADER_DC, lchr);
                            }
                        }
                    }
                    if (chrBuddy != null) {
                        if (!serverTransition) {
                            WorldBuddyService.getInstance().loggedOff(namez, idz, channel, chrBuddy.getBuddyIds());
                        } else { // Change channel
                            WorldBuddyService.getInstance().loggedOn(namez, idz, channel, chrBuddy.getBuddyIds());
                        }
                    }
                    if (gid > 0 && chrGuild != null) {
                        WorldGuildService.getInstance().setGuildMemberOnline(chrGuild, false, -1);
                    }
                    if (fid > 0 && chrFamily != null) {
                        WorldFamilyService.getInstance().setFamilyMemberOnline(chrFamily, false, -1);
                    }
                } catch (Exception e) {
                    FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
                    log.error(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch != null) {
                        ch.removePlayer(idz, namez); //????????????????????????????????????
                        if (WinStart.getInstance() != null) {
                            WinStart.getInstance().updatePlayerList(player, false);
                        }
                    }
                    player = null;
                }
            } else {
                int ch = WorldFindService.getInstance().findChannel(idz);
                if (ch > 0) {
                    disconnect(RemoveInChannelServer, false); //?????????????????? 0 ????????????????????????????????????
                    return;
                }
                try {
                    if (party != null) {
                        chrParty.setOnline(false);
                        WrodlPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, chrParty);
                    }
                    if (!serverTransition) {
                        WorldBuddyService.getInstance().loggedOff(namez, idz, channel, chrBuddy.getBuddyIds());
                    } else { // Change channel
                        WorldBuddyService.getInstance().loggedOn(namez, idz, channel, chrBuddy.getBuddyIds());
                    }
                    if (gid > 0 && chrGuild != null) {
                        WorldGuildService.getInstance().setGuildMemberOnline(chrGuild, false, -1);
                    }
                    if (fid > 0 && chrFamily != null) {
                        WorldFamilyService.getInstance().setFamilyMemberOnline(chrFamily, false, -1);
                    }
                    if (player != null) {
                        player.setMessenger(null);
                    }
                } catch (Exception e) {
                    FileoutputUtil.outputFileError(FileoutputUtil.Acc_Stuck, e);
                    log.error(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch == -10) {
                        CashShopServer.getPlayerStorage().deregisterPlayer(idz, namez);
                    }
                    player = null;
                }
            }
        }
        if (!serverTransition && isLoggedIn()) {
            updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN, getSessionIPAddress());
        }
        engines.clear();
    }

    public String getSessionIPAddress() {
        if (session == null || session != null && session.isClosing()) {
            return "0.0.0.0";
        }
        return session.getRemoteAddress().toString().split(":")[0];
    }

    public boolean CheckIPAddress() {
        if (this.accId < 0) {
            return false;
        }
        boolean canlogin = true;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT SessionIP, banned FROM accounts WHERE id = ?");
            ps.setInt(1, this.accId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (rs.getInt("banned") > 0) {
                    canlogin = false; //canlogin false = close client
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("Failed in checking IP address for client.", e);
        }
        return canlogin;
    }

    public void DebugMessage(StringBuilder sb) {
        sb.append(getSession().getRemoteAddress());
        sb.append(" ????????????: ");
        sb.append(getSession().isConnected());
        sb.append(" ????????????: ");
        sb.append(getSession().isClosing());
        sb.append(" ????????????: ");
        sb.append(getSession().getAttribute(MapleClient.CLIENT_KEY) != null);
        sb.append(" ????????????: ");
        sb.append(isLoggedIn());
        sb.append(" ???????????????: ");
        sb.append(getPlayer() != null);
    }

    public int getChannel() {
        return channel;
    }

    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    public int deleteCharacter(int cid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT guildid, guildrank, familyid, name FROM characters WHERE id = ? AND accountid = ?");
            ps.setInt(1, cid);
            ps.setInt(2, accId);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return 1;
            }
            if (rs.getInt("guildid") > 0) { // is in a guild when deleted
                if (rs.getInt("guildrank") == 1) { //cant delete when leader
                    rs.close();
                    ps.close();
                    return 1;
                }
                WorldGuildService.getInstance().deleteGuildCharacter(rs.getInt("guildid"), cid);
            }
            if (rs.getInt("familyid") > 0 && WorldFamilyService.getInstance().getFamily(rs.getInt("familyid")) != null) {
                WorldFamilyService.getInstance().getFamily(rs.getInt("familyid")).leaveFamily(cid);
            }
            MapleSidekick sidekick = WorldSidekickService.getInstance().getSidekickByChr(cid);
            if (sidekick != null) {
                sidekick.eraseToDB();
            }
            rs.close();
            ps.close();

            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM characters WHERE id = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "UPDATE pokemon SET active = 0 WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM hiredmerch WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mts_cart WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mts_items WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM cheatlog WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mountdata WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM inventoryitems WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM famelog WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM famelog WHERE characterid_to = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM dueypackages WHERE RecieverId = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM wishlist WHERE characterid = ?", cid); //?????????????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM buddies WHERE buddyid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM keymap WHERE characterid = ?", cid); //????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?", cid); //????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM familiars WHERE characterid = ?", cid);
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM mountdata WHERE characterid = ?", cid); //????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM skillmacros WHERE characterid = ?", cid); //???????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?", cid); //????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM inventoryslot WHERE characterid = ?", cid); //????????????????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM extendedSlots WHERE characterid = ?", cid); //?????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM bank WHERE charid = ?", cid); //????????????
            MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM bosslog WHERE characterid = ?", cid); //BOSS????????????
            return 0;
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
            log.error("??????????????????.", e);
        }
        return 1;
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET gender = ? WHERE id = ?");
            ps.setByte(1, gender);
            ps.setInt(2, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("????????????????????????", e);
        }
    }

    public String getSecondPassword() {
        return secondPassword;
    }

    public void setSecondPassword(String secondPassword) {
        this.secondPassword = secondPassword;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public int getWorld() {
        return world;
    }

    public void setWorld(int world) {
        this.world = world;
    }

    public int getLatency() {
        return (int) (lastPong - lastPing);
    }

    public int getChatServerLatency() {
        return (int) (lastChatServerPong - lastChatServerPing);
    }

    public long getLastPong() {
        return lastPong;
    }

    public long getLastChatServerPong() {
        return lastChatServerPong;
    }

    public long getLastPing() {
        return lastPing;
    }

    public long getLastChatServerPing() {
        return lastChatServerPing;
    }

    public void pongReceived() {
        lastPong = System.currentTimeMillis();
    }

    public void chatServerPongReceived() {
        lastChatServerPong = System.currentTimeMillis();
    }

    public void sendPing(final boolean isChatServer) {
        if (isChatServer) {
            lastChatServerPing = System.currentTimeMillis();
        } else {
            lastPing = System.currentTimeMillis();
        }
        session.write(isChatServer ? LoginPacket.getChatServerPing() : LoginPacket.getPing());

        PingTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                try {
                    if ((isChatServer ? getChatServerLatency() : getLatency()) < 0) {
                        disconnect(true, false);
                        if (getSession().isConnected()) {
                            log.info(getLogMessage(MapleClient.this, "???????????? : Ping??????."));
                            getSession().close(true);
                        }
                    }
                } catch (NullPointerException e) {
                    System.out.println(e.toString());
                }
            }
        }, 60000);
    }

    public static String getLogMessage(MapleClient cfor, String message) {
        return getLogMessage(cfor, message, new Object[0]);
    }

    public static String getLogMessage(MapleCharacter cfor, String message) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message);
    }

    public static String getLogMessage(MapleCharacter cfor, String message, Object... parms) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message, parms);
    }

    public static String getLogMessage(MapleClient cfor, String message, Object... parms) {
        StringBuilder builder = new StringBuilder();
        if (cfor != null) {
            if (cfor.getPlayer() != null) {
                builder.append("<");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getPlayer().getName()));
                builder.append(" (??????ID: ");
                builder.append(cfor.getPlayer().getId());
                builder.append(")> ");
            }
            if (cfor.getAccountName() != null) {
                builder.append("(??????: ");
                builder.append(cfor.getAccountName());
                builder.append(") ");
            }
        }
        builder.append(message);
        int start;
        for (Object parm : parms) {
            start = builder.indexOf("{}");
            builder.replace(start, start + 2, parm.toString());
        }
        return builder.toString();
    }

    public static int findAccIdForCharacterName(String charName) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charName);
            ResultSet rs = ps.executeQuery();
            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt("accountid");
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            log.error("findAccIdForCharacterName SQL error", e);
        }
        return -1;
    }

    public boolean isGm() {
        return gm;
    }

    public ScheduledFuture<?> getIdleTask() {
        return idleTask;
    }

    public void setIdleTask(ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    protected static class CharNameAndId {

        public final String name;
        public final int id;

        public CharNameAndId(String name, int id) {
            super();
            this.name = name;
            this.id = id;
        }
    }

    /*
     * ?????????????????????????????????
     */
    public int getAccCharSlots() {
        if (isGm()) {
            return 21;
        }
        if (charslots != DEFAULT_CHARSLOT) {
            return charslots; //save a sql
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM character_slots WHERE accid = ? AND worldid = ?");
            ps.setInt(1, accId);
            ps.setInt(2, world);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                charslots = rs.getInt("charslots");
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO character_slots (accid, worldid, charslots) VALUES (?, ?, ?)");
                psu.setInt(1, accId);
                psu.setInt(2, world);
                psu.setInt(3, charslots);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("?????????????????????????????????????????????", e);
        }
        return charslots;
    }

    /*
     * ?????????????????????????????????
     */
    public boolean gainAccCharSlot() {
        if (getAccCharSlots() >= 36) {
            return false;
        }
        charslots++;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE character_slots SET charslots = ? WHERE worldid = ? AND accid = ?");
            ps.setInt(1, charslots);
            ps.setInt(2, world);
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("?????????????????????????????????????????????", e);
            return false;
        }
        return true;
    }

    /*
     * ?????????????????????????????????
     */
    public int getAccCardSlots() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?");
            ps.setInt(1, accId);
            ps.setInt(2, world);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                cardslots = rs.getInt("cardSlots");
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, cardSlots) VALUES (?, ?, ?)");
                psu.setInt(1, accId);
                psu.setInt(2, world);
                psu.setInt(3, cardslots);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("?????????????????????????????????????????????", e);
        }
        return cardslots;
    }

    /*
     * ????????????????????????
     */
    public boolean gainAccCardSlot() {
        if (getAccCardSlots() >= 9) {
            return false;
        }
        cardslots++;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET cardSlots = ? WHERE worldId = ? AND accId = ?");
            ps.setInt(1, cardslots);
            ps.setInt(2, world);
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("????????????????????????????????????", e);
            return false;
        }
        return true;
    }

    public static byte unbanIPMacs(String charname) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?");
            ps.setString(1, charname);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            String sessionIP = rs.getString("sessionIP");
            String macs = rs.getString("macs");
            rs.close();
            ps.close();
            byte ret = 0;
            if (sessionIP != null) {
                PreparedStatement psa = con.prepareStatement("DELETE FROM ipbans WHERE ip like ?");
                psa.setString(1, sessionIP);
                psa.execute();
                psa.close();
                ret++;
            }
            if (macs != null) {
                String[] macz = macs.split(", ");
                for (String mac : macz) {
                    if (!mac.equals("")) {
                        PreparedStatement psa = con.prepareStatement("DELETE FROM macbans WHERE mac = ?");
                        psa.setString(1, mac);
                        psa.execute();
                        psa.close();
                    }
                }
                ret++;
            }
            return ret;
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
    }

    public static byte unHellban(String charname) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?");
            ps.setString(1, charname);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            String sessionIP = rs.getString("sessionIP");
            String email = rs.getString("email");
            rs.close();
            ps.close();
            ps = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE email = ?" + (sessionIP == null ? "" : " OR sessionIP = ?"));
            ps.setString(1, email);
            if (sessionIP != null) {
                ps.setString(2, sessionIP);
            }
            ps.execute();
            ps.close();
            return 0;
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
    }

    public boolean isMonitored() {
        return monitored;
    }

    public void setMonitored(boolean m) {
        this.monitored = m;
    }

    public boolean isReceiving() {
        return receiving;
    }

    public void setReceiving(boolean m) {
        this.receiving = m;
    }

    public Timestamp getCreated() {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT createdat FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            Timestamp ret = rs.getTimestamp("createdat");
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            throw new DatabaseException("error getting create", e);
        }
    }

    public String getTempIP() {
        return tempIP;
    }

    public void setTempIP(String s) {
        this.tempIP = s;
    }

    public boolean isLocalhost() {
        return ServerConstants.Use_Localhost || ServerConstants.isIPLocalhost(getSessionIPAddress());
    }

    public boolean hasCheck(int accid) {
        boolean ret = false;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = rs.getInt("check") > 0;
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error checking ip Check", ex);
        }
        return ret;
    }

    public static String getAccInfo(String accname, boolean admin) {
        StringBuilder ret = new StringBuilder("?????? " + accname + " ????????? -");
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, accname);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int banned = rs.getInt("banned");
                ret.append(" ??????: ");
                ret.append(banned > 0 ? "??????" : "??????");
                ret.append(" ????????????: ");
                ret.append(banned > 0 ? rs.getString("banreason") : "(?????????)");
                if (admin) {
                    ret.append(" ??????: ");
                    ret.append(rs.getInt("ACash"));
                    ret.append(" ?????????: ");
                    ret.append(rs.getInt("mPoints"));
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("????????????????????????????????????", ex);
        }
        return ret.toString();
    }

    public static String getAccInfoByName(String charname, boolean admin) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?");
            ps.setString(1, charname);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            StringBuilder ret = new StringBuilder("?????? " + charname + " ??????????????? -");
            int banned = rs.getInt("banned");
            if (admin) {
                ret.append(" ??????: ");
                ret.append(rs.getString("name"));
            }
            ret.append(" ??????: ");
            ret.append(banned > 0 ? "??????" : "??????");
            ret.append(" ????????????: ");
            ret.append(banned > 0 ? rs.getString("banreason") : "(?????????)");
            rs.close();
            ps.close();
            return ret.toString();
        } catch (SQLException ex) {
            log.error("????????????????????????????????????", ex);
            return null;
        }
    }

    public void setScriptEngine(String name, ScriptEngine e) {
        engines.put(name, e);
    }

    public ScriptEngine getScriptEngine(String name) {
        return engines.get(name);
    }

    public void removeScriptEngine(String name) {
        engines.remove(name);
    }

    public boolean canClickNPC() {
        return lastNpcClick + 500 < System.currentTimeMillis();
    }

    public void setClickedNPC() {
        lastNpcClick = System.currentTimeMillis();
    }

    public void removeClickedNPC() {
        lastNpcClick = 0;
    }

    public NPCConversationManager getCM() {
        return NPCScriptManager.getInstance().getCM(this);
    }

    public QuestActionManager getQM() {
        return QuestScriptManager.getInstance().getQM(this);
    }

    public ItemActionManager getIM() {
        return ItemScriptManager.getInstance().getIM(this);
    }

    public boolean hasCheckMac(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17 || maclist.isEmpty()) {
            return false;
        }
        return maclist.contains(macData);
    }

    public void setTempInfo(String login, String pwd, boolean isBanned) {
        tempinfo = new Triple<>(login, pwd, isBanned);
    }

    public Triple<String, String, Boolean> getTempInfo() {
        return tempinfo;
    }

    public void addProcessName(String process) {
        proesslist.add(process);
    }

    public boolean hasProcessName(String process) {
        for (String p : proesslist) {
            if (p.startsWith(process)) {
                return true;
            }
        }
        return proesslist.contains(process);
    }

    public void dropMessage(String message) {
        getSession().write(MaplePacketCreator.serverNotice(1, message));
    }

    public void modifyCSPoints(int type, int quantity) {
        switch (type) {
            case 1:
                if (getACash() + quantity < 0) {
                    return;
                }
                setACash(getACash() + quantity);
                break;
            case 2:
                if (getMaplePoints() + quantity < 0) {
                    return;
                }
                setMaplePoints(getMaplePoints() + quantity);
                break;
            default:
                break;
        }
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 1:
                return getACash();
            case 2:
                return getMaplePoints();
            default:
                return 0;
        }
    }

    public int getACash() {
        int point = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT ACash FROM accounts WHERE name = ?");
            ps.setString(1, getAccountName());
            rs = ps.executeQuery();
            if (rs.next()) {
                point = rs.getInt("ACash");
            }
            ps.close();
            rs.close();
        } catch (final SQLException ex) {
            log.error("???????????????????????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex1) {
                log.error("???????????????????????????" + ex1);
            }
        }
        return point;
    }

    public void setACash(final int point) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET ACash = ? WHERE name = ?");
            ps.setInt(1, point);
            ps.setString(2, getAccountName());
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            log.error("???????????????????????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex1) {
                log.error("???????????????????????????" + ex1);
            }
        }
    }

    public int getMaplePoints() {
        int point = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT mPoints FROM accounts WHERE name = ?");
            ps.setString(1, getAccountName());
            rs = ps.executeQuery();
            if (rs.next()) {
                point = rs.getInt("mPoints");
            }
            ps.close();
            rs.close();
        } catch (final SQLException ex) {
            log.error("??????????????????????????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (final SQLException ex1) {
                log.error("??????????????????????????????" + ex1);
            }
        }
        return point;
    }

    public void setMaplePoints(final int point) {
        PreparedStatement ps = null;
        try {
            final Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET mPoints = ? WHERE name = ?");
            ps.setInt(1, point);
            ps.setString(2, getAccountName());
            ps.executeUpdate();
            ps.close();
        } catch (final SQLException ex) {
            log.error("??????????????????????????????" + ex);
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (final SQLException ex1) {
                log.error("??????????????????????????????" + ex1);
            }
        }
    }
}
