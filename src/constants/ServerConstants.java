package constants;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import tools.PropertyTool;
import tools.Triple;

public class ServerConstants {

    public static String 服务器授权;
    public static String DataExpiration;
    public static boolean loadop = false; // true = 从JAR内部加载包头 false 从外部文件加载
    public static boolean TESPIA = false; // true = uses GMS test server, for MSEA it does nothing though
    // IP地址 221.231.130.70
    public static byte[] NEXON_IP = new byte[]{(byte) 0xDD, (byte) 0xE7, (byte) 0x82, (byte) 0x46}; //singapore
    public static String HOST = "221.231.130.70";
    //Inject a DLL that hooks SetupDiGetClassDevsExA and returns 0.
    // Start of Poll

    public static boolean PollEnabled = false;
    public static String Poll_Question = "Are you mudkiz?";
    public static String[] Poll_Answers = {"test1", "test2", "test3"};
    public static boolean IsTrue = false;
    //public static boolean IsTrueIP = false;
    public static boolean IsTrueMAC = false;

    // End of Poll
    public static boolean Use_Fixed_IV = true; // true = disable sniffing, false = server can connect to itself
    public static boolean Use_Localhost = false; // true = packets are logged, false = others can connect to server
    public static final int MIN_MTS = 150; //lowest amount an item can be, GMS = 110
    public static final int MTS_BASE = 0; //+amount to everything, GMS = 500, MSEA = 1000
    public static final int MTS_TAX = 5; //+% to everything, GMS = 10
    public static final int MTS_MESO = 2500; //拍卖中的手续费用
    //master login is only used in GMS: fake account for localhost only
    //master and master2 is to bypass all accounts passwords only if you are under the IPs below
    public static final long number1 = (142449577 + 753356065 + 611816275297389857L);
    public static final long number2 = 1877319832;
    public static final long number3 = 202227478981090217L;
    public static final List<String> localhostIP = new LinkedList<>(), vpnIp = new LinkedList<>();
    public static String master;
    // job.length = 23
    public static String[] JOB_NAMELIST = {"反抗者", "冒险家", "骑士团", "战神", "龙神", "双弩精灵", "恶魔猎手", "幻影神偷", "暗影双刀", "米哈尔", "夜光法师", "狂龙战士", "萌爆天使", "火炮手", "尖兵", "神之子", "隐月", "品克缤", "超能力者", "林之灵", "龙的传人", "剑豪", "阴阳师"};
    public static boolean[] JOB_OPENLIST = new boolean[JOB_NAMELIST.length];

    private static Map<String, Boolean> blockedMapFM = new HashMap<>(); // 禁止显示给其他角色的技能
    private static boolean showGMMessage = false;

    public static int MaplewingIPMS = 2;
    public static final int MAXIMUM_CONNECTIONS = 1000;
    public static ServerConstants instance;

    public static Triple<String, Integer, Boolean>[] backgrounds = new Triple[]{};

    public static boolean is奇幻() {

        return false;
    }

    public static int getMaplewingIPMS() {
        return MaplewingIPMS;
    }

    public static boolean isIPLocalhost(String sessionIP) {
        return !Use_Fixed_IV && localhostIP.contains(sessionIP.replace("/", ""));
    }

    public static boolean isVpn(String sessionIP) {
        return vpnIp.contains(sessionIP.replace("/", ""));
    }

    static {
        localhostIP.add("221.231.130.70");
        for (int i = 0; i < 256; i++) {
            vpnIp.add("221.231.130." + i);
        }
        for (int i = 0; i < 256; i++) {
            vpnIp.add("17.1.1." + i);
        }
        for (int i = 0; i < 256; i++) {
            vpnIp.add("17.1.2." + i);
        }
    }

    /*
     * 加载禁止使用FM命令的地图列表
     */
    public static void loadBlockedMapFM() {
        blockedMapFM.clear();
        Properties settings = new Properties();
        try {
            FileInputStream fis = new FileInputStream("config\\blockMapFM.ini");
            settings.load(fis);
            fis.close();
        } catch (IOException ex) {
            System.out.println("加载 blockMapFM.ini 配置出错" + ex);
        }
        PropertyTool propTool = new PropertyTool(settings);
        for (Map.Entry<Object, Object> entry : settings.entrySet()) {
            String property = (String) entry.getKey();
            blockedMapFM.put(property, propTool.getSettingInt(property, 0) > 0);
        }
    }

    /*
     * 检测这个技能是否禁止显示
     */
    public static boolean isBlockedMapFM(int skillId) {
        if (blockedMapFM.containsKey(String.valueOf(skillId))) {
            return blockedMapFM.get(String.valueOf(skillId));
        }
        return false;
    }

    public static boolean isShowGMMessage() {
        return showGMMessage;
    }

    public static void setShowGMMessage(boolean b) {
        showGMMessage = b;
    }

    private static void setIsTrue(boolean b) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public enum MapleServerType {

        UNKNOWN(-1),
        JAPAN(3),
        CHINA(4),
        TEST(5),
        TAIWAN(6),
        SEA(7),
        GLOBAL(8),
        BRAZIL(9);
        final byte type;

        MapleServerType(int type) {
            this.type = (byte) type;
        }

        public byte getType() {
            return type;
        }

        public static MapleServerType getByType(byte type) {
            for (MapleServerType l : MapleServerType.values()) {
                if (l.getType() == type) {
                    return l;
                }
            }
            return UNKNOWN;
        }
    }

    public enum MapleStatusInfo {

        获得道具(0x00),
        更新任务状态(0x01),
        商城道具到期(0x02),
        获得经验(0x03),
        获得SP(0x04),
        获得人气(0x05),
        获得金币(0x06),
        获得家族点(0x07),
        获得贡献度(0x08),
        显示消耗品描述(0x09),
        非商城道具到期(0x0A),
        系统红字公告(0x0B),
        更新任务信息(0x0D),
        技能到期(0x11),
        获得倾向熟练度(0x12),
        超过今天可获得倾向熟练度(0x13),
        移除机器人心脏(0x15),
        休息后恢复了疲劳度(0x16),
        系统灰字公告(0x18),
        配偶提示(0x19),
        神之子不能获得金币(0x20),
        获得WP(0x21),
        不能获得更多的WP(0x22),
        连续击杀(0x23),;

        final byte type;

        MapleStatusInfo(int type) {
            this.type = (byte) type;
        }

        public byte getType() {
            return type;
        }
    }
}
