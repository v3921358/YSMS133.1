package handling;

import constants.ServerConstants;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

public enum RecvPacketOpcode implements WritableIntValueHolder {

    PONG(0x94, false),
    CHAT_SERVER_PONG(0x0E, false),
    CHAT_SERVER_REQUEST(0x01, false),
    GUILD_CHAT(0x13, false),
    BUDDY_CHAT(0x14, false),
    CLIENT_AUTH(0x66, false),
    CLIENT_HELLO(0x67, false),
    LOGIN_PASSWORD(0x69, false),
    PLAYER_LOGGEDIN(0x6E, false),
    LOGIN_AUTHKEY(0x73, false),
    CLIENT_ERROR(0x85, false),
    CLIENT_FAIL(0x96, false),
    RSA_KEY(0xAD, false),
    CREATE_ULTIMATE(0x21),
    DELETE_CHAR(0x22),
    STRANGE_DATA(0x28),
    CHARLIST_REQUEST(0x6A),
    CHAR_SELECT(0x6F),
    CHECK_CHAR_NAME(0x74),
    SERVERLIST_REQUEST(0x75),
    CREATE_CHAR(0x7D),
    PART_TIME_JOB(0x8F),
    CHARACTER_CARDS(0x90),
    LICENSE_REQUEST(0x9A),
    SET_GENDER(0x9B),
    AUTH_SECOND_PASSWORD(-2),
    REQUEST_CONNECTION(0x99),
    SET_CHAR_CARDS(0xA3),
    SET_ACC_CASH(0xA4),
    QUICK_BUY_CS_ITEM(0xA5),
    SERVERSTATUS_REQUEST(0xAC),
    CREATE_CHAR_REQUEST(0xB0),
    CHANGE_MAP(0xB3),
    CHANGE_CHANNEL(0xB4),
    ENTER_CASH_SHOP(0xB8),
    ENTER_PVP(-2),
    ENTER_PVP_PARTY(-2),
    LEAVE_PVP(-2),
    MOVE_PLAYER(0xC0),
    CANCEL_CHAIR(0xC1),
    USE_CHAIR(0xC2),
    CLOSE_RANGE_ATTACK(0xC4),
    RANGED_ATTACK(0xC5),
    MAGIC_ATTACK(0xC6),
    PASSIVE_ENERGY(0xC7),
    UNK004B(-2),
    CLUSTER_ATTACK(0xC8),
    TAKE_DAMAGE(0xCA),
    PVP_ATTACK(-2),
    GENERAL_CHAT(0xCC),
    CLOSE_CHALKBOARD(0xCD),
    FACE_EXPRESSION(0xCE),
    FACE_ANDROID(0xCF),
    USE_ITEM_EFFECT(0xD0),
    WHEEL_OF_FORTUNE(0xD1),
    USE_TITLE_EFFECT(0xD2),
    USE_UNK_EFFECT(0xD3),
    NPC_TALK(0xDD),
    REMOTE_STORE(0xDE),
    NPC_TALK_MORE(0xDF),
    NPC_SHOP(0xE0),
    STORAGE(0xE1),
    USE_HIRED_MERCHANT(0xE2),
    MERCH_ITEM_STORE(0xE3),
    DUEY_ACTION(0xE4),
    MECH_CANCEL(0xE5),
    EXTRA_ATTACK(0xE7),
    USE_HOLY_FOUNTAIN(0xE9),
    OWL(0xEB),
    OWL_WARP(0xEC),
    ITEM_SORT(0xEF),
    ITEM_GATHER(0xF0),
    ITEM_MOVE(0xF1),
    MOVE_BAG(0xF2),
    SWITCH_BAG(0xF3),
    USE_ITEM(0xF6),
    CANCEL_ITEM_EFFECT(0xF7),
    USE_SUMMON_BAG(0xF9),
    PET_FOOD(0xFA),
    USE_MOUNT_FOOD(0xFB),
    USE_SCRIPTED_NPC_ITEM(0xFC),
    USE_RECIPE(0xFD),
    USE_CASH_ITEM(0xFE),
    USE_ADDITIONAL_ITEM(0xFF),
    ALLOW_PET_LOOT(0x100),
    ALLOW_PET_AOTO_EAT(0x101),
    USE_CATCH_ITEM(0x104),
    USE_SKILL_BOOK(0x105),
    USE_SP_RESET(0x106),
    USE_AP_RESET(0x107),
    USE_OWL_MINERVA(0x10E),
    USE_TELE_ROCK(0x10F),
    USE_RETURN_SCROLL(0x110),
    USE_UPGRADE_SCROLL(0x112),
    USE_FLAG_SCROLL(0x113),
    USE_EQUIP_SCROLL(0x114),
    USE_POTENTIAL_SCROLL(0x118),
    USE_POTENTIAL_ADD_SCROLL(0x119),
    USE_SOULS_SCROLL(0x11C),
    USE_SOUL_MARBLE(0x11D),
    USE_ENCHANTING(0x11F),
    USE_BAG(0x121),
    USE_MAGNIFY_GLASS(0x122),
    USE_CRAFTED_CUBE(0x123),
    DISTRIBUTE_AP(0x129),
    AUTO_ASSIGN_AP(0x12A),
    HEAL_OVER_TIME(0x12C),
    TEACH_SKILL(0x12E),
    DISTRIBUTE_SP(0x12F),
    SPECIAL_MOVE(0x130),
    CANCEL_BUFF(0x131),
    SKILL_EFFECT(0x132),
    MESO_DROP(0x133),
    GIVE_FAME(0x134),
    CHAR_INFO_REQUEST(0x136),
    SPAWN_PET(0x137),
    PET_AUTO_BUFF(0x138),
    CANCEL_DEBUFF(0x139),
    CHANGE_MAP_SPECIAL(0x13A),
    USE_INNER_PORTAL(0x13B),
    TROCK_ADD_MAP(0x13C),
    LIE_DETECTOR(0x13D),
    LIE_DETECTOR_SKILL(0x13E),
    LIE_DETECTOR_REFRESH(0x13F),
    REPORT(0x140),
    QUEST_ACTION(0x143),
    REISSUE_MEDAL(0x144),
    MOVE_ENERGY(0x146),
    SPECIAL_ATTACK(0x147),
    SKILL_MACRO(0x14B),
    REWARD_ITEM(0x14D),
    ITEM_MAKER(0x14E),
    REPAIR_ALL(0x14F),
    REPAIR(0x150),
    SOLOMON(-2),
    GACH_EXP(-2),
    FOLLOW_REQUEST(0x152),
    FOLLOW_REPLY(-2),
    AUTO_FOLLOW_REPLY(0x156),
    PROFESSION_INFO(0x15B),
    USE_POT(0x15C),
    CLEAR_POT(0x15D),
    FEED_POT(0x15E),
    CURE_POT(0x15F),
    REWARD_POT(0x160),
    USE_COSMETIC(0x162),
    DF_COMBO(0x163),
    USE_REDUCER(0x166),
    USE_REDUCER_PRESTIGE(0x167),
    PVP_RESPAWN(-2),
    CHANGE_ZERO_LOOK(0x171),
    CHANGE_ZERO_LOOK_END(0x173),
    PARTYCHAT(0x178),
    WHISPER(0x17A),
    MESSENGER(0x17B),
    PLAYER_INTERACTION(0x17C),
    PARTY_OPERATION(0x17D),
    DENY_PARTY_REQUEST(0x17E),
    ALLOW_PARTY_INVITE(0x17F),
    EXPEDITION_OPERATION(0x180),
    EXPEDITION_LISTING(0x181),
    GUILD_OPERATION(0x183),
    DENY_GUILD_REQUEST(0x184),
    GUILD_APPLY(0x185),
    ACCEPT_GUILD_APPLY(0x187),
    DENY_GUILD_APPLY(0x188),
    ADMIN_COMMAND(0x189),
    BUDDYLIST_MODIFY(0x18D),
    NOTE_ACTION(0x18E),
    RPS_GAME(0x192),
    USE_DOOR(0x194),
    USE_MECH_DOOR(0x196),
    CHANGE_KEYMAP(0x197),
    RING_ACTION(0x19C),
    ALLIANCE_OPERATION(-2),
    DENY_ALLIANCE_REQUEST(-2),
    REQUEST_FAMILY(-2),
    OPEN_FAMILY(-2),
    FAMILY_OPERATION(-2),
    DELETE_JUNIOR(-2),
    DELETE_SENIOR(-2),
    ACCEPT_FAMILY(-2),
    USE_FAMILY(-2),
    FAMILY_PRECEPT(-2),
    FAMILY_SUMMON(-2),
    CYGNUS_SUMMON(-2),
    ARAN_COMBO(0x1AE),
    LOST_ARAN_COMBO(0x1AF),
    CRAFT_DONE(0x1B3),
    CRAFT_EFFECT(0x1B4),
    CRAFT_MAKE(0x1B5),
    CHANGE_MARKET_MAP(0x1BA),
    MEMORY_SKILL_CHOOSE(0x1BB),
    MEMORY_SKILL_CHANGE(0x1BC),
    MEMORY_SKILL_OBTAIN(0x1BD),
    BUY_CROSS_ITEM(0x1C4),
    USE_TEMPEST_BLADES(0x1C6),
    DISTRIBUTE_HYPER_SP(0x1CD),
    RESET_HYPER_SP(0x1CE),
    DISTRIBUTE_HYPER_AP(0x1CF),
    RESET_HYPER_AP(0x1D0),
    CHANGE_PLAYER(0x1DF),
    UNKNOWN_168(0x1E1),
    LIE_DETECTOR_RESPONSE(0x1EE),
    SOUL_MODE(0x20A),
    CHAR_SELECTED(0x213),
    MOVE_PET(0x216),
    PET_CHAT(0x217),
    PET_COMMAND(0x218),
    PET_LOOT(0x219),
    PET_AUTO_POT(0x21A),
    PET_EXCEPTION_LIST(0x21B),
    PET_AOTO_EAT(0x21C),
    MOVE_LITTLEWHITE(0x220),
    MOVE_SUMMON(0x227),
    SUMMON_ATTACK(0x228),
    DAMAGE_SUMMON(0x229),
    SUB_SUMMON(0x22A),
    REMOVE_SUMMON(0x22B),
    MOVE_DRAGON(0x231),
    DRAGON_FLY(0x232),
    MOVE_ANDROID(0x235),
    SUB_LITTLEWHITE(0x23A),
    QUICK_SLOT(0x23C),
    PLAYER_VIEW_RANGE(0x23E),
    SYSTEM_PROCESS_LIST(0x242),
    CHANGE_POTENTIAL_BOX(0x244),
    CHANGE_POTENTIAL_WP(0x245),
    CHANGE_POTENTIAL(0x246),
    SHOW_LOVE_RANK(0x248),
    SPAWN_ARROWS_TURRET(0x251),
    WARLOCK_MAGIC_ATTACK(0x26C),
    ENTER_STARTPLANET(0x26D),
    TRACK_FLAMES(0x298),
    BBS_OPERATION(0x299),
    SELECT_JAGUAR(0x29D),
    GIVE_KSPSYCHIC(0x2B3),
    ATTACK_KSPSYCHIC(0x2B4),
    CANCEL_KSPSYCHIC(0x2B5),
    GIVE_KSULTIMATE(0x2B7),
    ATTACK_KSULTIMATE(0x2B8),
    CANCEL_KSULTIMATE(0x2BA),
    SIGNIN_OPERATION(0x2C4),
    USE_NEBULITE(0x2C5),
    USE_ALIEN_SOCKET(-2),
    USE_ALIEN_SOCKET_RESPONSE(-2),
    USE_NEBULITE_FUSION(-2),
    POTION_POT_USE(0x2C8),
    POTION_POT_ADD(0x2C9),
    POTION_POT_MODE(0x2CA),
    POTION_POT_INCR(0x2CB),
    APPLY_HYUNCUBE(0x2D9),
    SELECT_CHAIR(0x2EE),
    TRANSFORM_PLAYER(0x2F2),
    OPEN_AVATAR_RANDOM_BOX(0x2F3),
    ENTER_MTS(0x2F4),
    USE_TREASUER_CHEST(0x2FB),
    SHIKONGJUAN(0x304),
    SET_CHAR_CASH(0x30B),
    OPEN_WORLDMAP(0x30E),
    MOVE_LIFE(0x31D),
    AUTO_AGGRO(0x31E),
    FRIENDLY_DAMAGE(0x321),
    MONSTER_BOMB(0x322),
    NPC_ACTION(0x336),
    ITEM_PICKUP(0x33D),
    DAMAGE_REACTOR(0x340),
    TOUCH_REACTOR(0x341),
    PLAYER_UPDATE(0x35C),
    PARTY_SEARCH_START(0x35E),
    PARTY_SEARCH_STOP(0x35F),
    MAKE_EXTRACTOR(-2),
    START_HARVEST(0x364),
    STOP_HARVEST(0x366),
    QUICK_MOVE(0x368),
    TOUCH_RUNE(0x369),
    USE_RUNE(0x36A),
    CS_UPDATE(0x3EE),
    BUY_CS_ITEM(0x3EF),
    COUPON_CODE(0x3F0),
    SEND_CS_GIFI(0x3F2),
    MAPLETV(-2),
    UPDATE_QUEST(-2),
    QUEST_ITEM(-2),
    USE_ITEM_QUEST(-2),
    TOUCHING_MTS(-2),
    MTS_TAB(-2),
    USE_HAMMER(0x40D),
    HAMMER_RESPONSE(0x40F),
    HIDDEN_TAIL_ADN_EAR(-2),
    POINT_POWER(0x42F),
    EFFECT_SWITCH(0x434),
    GAME_EXIT(-2),
    USE_FAMILIAR(-2),
    SPAWN_FAMILIAR(-2),
    RENAME_FAMILIAR(-2),
    MOVE_FAMILIAR(-2),
    TOUCH_FAMILIAR(-2),
    ATTACK_FAMILIAR(-2),
    SIDEKICK_OPERATION(-2),
    DENY_SIDEKICK_REQUEST(-2),
    HYPNOTIZE_DMG(-2),
    XMAS_SURPRISE(-2),
    GAME_POLL(-2),
    MOB_BOMB(-2),
    MOB_NODE(-2),
    DISPLAY_NODE(-2),
    OPEN_ROOT_NPC(-2),
    PVP_SUMMON(-2),
    SNOWBALL(-2),
    LEFT_KNOCK_BACK(-2),
    COCONUT(-2),
    MONSTER_CARNIVAL(-2),
    SHIP_OBJECT(-2),
    PAM_SONG(-2),
    ADMIN_LOG(-2),
    CHANGE_SET(-2),
    GET_BOOK_INFO(-2),
    CLICK_REACTOR(-2),
    UNKNOWN;

    private int code = -2;

    @Override
    public void setValue(short code) {
        this.code = code;
    }

    @Override
    public short getValue() {
        return (short) code;
    }

    private boolean CheckState;

    RecvPacketOpcode() {
        this.CheckState = true;
    }

    RecvPacketOpcode(int code) {
        this.code = code;
    }

    RecvPacketOpcode(int code, boolean CheckState) {
        this.CheckState = CheckState;
        this.code = code;

    }

    public boolean NeedsChecking() {
        return CheckState;
    }

    public static String getNamebyID(int val) {
        for (RecvPacketOpcode op : RecvPacketOpcode.values()) {
            if (op.getValue() == val) {
                return op.name();
            }
        }
        return "UNKNOWN";
    }

    public static RecvPacketOpcode getByType(int type) {
        for (RecvPacketOpcode l : RecvPacketOpcode.values()) {
            if (l.getValue() == type) {
                return l;
            }
        }
        return UNKNOWN;
    }

    public static Properties getDefaultProperties() throws IOException {
        Properties props = new Properties();
        FileInputStream fileInputStream = new FileInputStream("properties/recvops.properties");
        BufferedReader buff = new BufferedReader(new InputStreamReader(fileInputStream, "GBK"));
        props.load(buff);
        fileInputStream.close();
        buff.close();
        return props;
    }

    static {
        reloadValues();
    }

    public static void reloadValues() {
        try {
            if (ServerConstants.loadop) {
                Properties props = new Properties();
                props.load(RecvPacketOpcode.class.getClassLoader().getResourceAsStream("recvops.properties"));
                ExternalCodeTableGetter.populateValues(props, values());
            } else {
                File file = new File("properties/recvops.properties");
                if (file.exists()) {
                    ExternalCodeTableGetter.populateValues(getDefaultProperties(), values());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("加载 recvops.properties 文件出现错误", e);
        }
    }
}
