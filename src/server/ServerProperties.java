package server;

import constants.ServerConstants;
import database.DatabaseConnection;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import tools.PropertyTool;

/**
 * @author Emilyx3
 */
public class ServerProperties {

    private static final Properties server = new Properties();
    private static Properties settings = new Properties();
    private static PropertyTool propTool = new PropertyTool(new Properties());
    private static boolean showPacket;
    private static Map<String, Boolean> blockedOpcodes = new HashMap<>();
    private static boolean blockDefault;
    private static boolean show = true; //是否显示封包
    public static int maxHp, maxMp, maxLevel, maxCygnusLevel, limitBreak, CSNpcID, CSNpcID_Mode, MTSNpcID, MTSNpcID_Mode, ExitNpcID, ExitNpcID_Mode;
    public static long maxMeso;
    private static final List<Integer> PVPMap = new ArrayList<>();

    static {
        String toLoad = "world.properties";
        loadProperties(toLoad);
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM auth_server_channel_ip");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                server.put(rs.getString("name") + rs.getInt("channelid"), rs.getString("value"));
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            System.exit(0); //Big ass error.
        }
        maxHp = Integer.parseInt(ServerProperties.getProperty("world.maxHp", "500000")); //最大Hp上限
        maxMp = Integer.parseInt(ServerProperties.getProperty("world.maxMp", "500000")); //最大Mp上限
        maxMeso = Long.parseLong(ServerProperties.getProperty("world.maxMeso", "10000000000")); //持有金币上限
        maxLevel = Integer.parseInt(ServerProperties.getProperty("world.maxLevel", "200")); //最高等级
        maxCygnusLevel = Integer.parseInt(ServerProperties.getProperty("world.maxCygnusLevel", "120")); //骑士团最高等级
        limitBreak = Integer.parseInt(ServerProperties.getProperty("world.limitBreak", "500000000"));

        String npcids[] = ServerProperties.getProperty("world.CSNpcId", "0").split("_");
        if (npcids.length > 1) {
            CSNpcID = Integer.parseInt(npcids[0]);
            CSNpcID_Mode = Integer.parseInt(npcids[1]);
        } else {
            CSNpcID = Integer.parseInt(npcids[0].equals("") ? "0" : npcids[0]);
            CSNpcID_Mode = 0;
        }
        npcids = ServerProperties.getProperty("world.MTSNpcId", "9900004").split("_");
        if (npcids.length > 1) {
            MTSNpcID = Integer.parseInt(npcids[0]);
            MTSNpcID_Mode = Integer.parseInt(npcids[1]);
        } else {
            MTSNpcID = Integer.parseInt(npcids[0].equals("") ? "0" : npcids[0]);
            MTSNpcID_Mode = 0;
        }
        npcids = ServerProperties.getProperty("world.EXITNPCId", "0").split("_");
        if (npcids.length > 1) {
            ExitNpcID = Integer.parseInt(npcids[0]);
            ExitNpcID_Mode = Integer.parseInt(npcids[1]);
        } else {
            ExitNpcID = Integer.parseInt(npcids[0].equals("") ? "0" : npcids[0]);
            ExitNpcID_Mode = 0;
        }

        String jobOpenList = "";
        for (int i = 0; i < ServerConstants.JOB_OPENLIST.length; i++) {
            ServerConstants.JOB_OPENLIST[i] = Boolean.parseBoolean(ServerProperties.getProperty(ServerConstants.JOB_NAMELIST[i], "false"));
            if (!ServerConstants.JOB_OPENLIST[i]) {
                jobOpenList += ServerConstants.JOB_NAMELIST[i] + ",";
            }
        }
        String pvpmaps[] = ServerProperties.getProperty("world.PvpMap", "910000018").split(",");
        for (String mapid : pvpmaps) {
            PVPMap.add(Integer.valueOf(mapid));
        }
        System.out.println("已关闭创建的职业：" + jobOpenList);
        if (isLoadShow()) {
            ServerProperties.loadSettings();
        }
    }

    public static void loadProperties(String name) {
        try {
            server.load(new InputStreamReader(new FileInputStream(name), "gbk"));
        } catch (IOException ex) {
            System.out.println("加载 " + name + " 配置出错 " + ex);
        }
    }

    public static void loadSettings() {
        try {
            FileInputStream fis = new FileInputStream("settings.properties");
            settings.load(fis);
            fis.close();
        } catch (IOException ex) {
            System.out.println("加载 settings.properties 配置出错" + ex);
        }
        propTool = new PropertyTool(settings);
        showPacket = propTool.getSettingInt("ShowPacket", 1) > 0;
        blockDefault = propTool.getSettingInt("BlockDefault", 0) > 0;
        blockedOpcodes.clear();
        for (Map.Entry<Object, Object> entry : settings.entrySet()) {
            String property = (String) entry.getKey();
            if (property.startsWith("S_") || property.startsWith("R_")) {
                blockedOpcodes.put(property, propTool.getSettingInt(property, 0) > 0);
            }
        }
    }

    public static boolean isLoadShow() {
        return show;
    }

    public static boolean ShowPacket() {
        return showPacket && show;
    }

    public static boolean SendPacket(String op, String pHeaderStr) {
        if (op.equals("UNKNOWN")) {
            return blockedOpcodes.containsKey("S_" + pHeaderStr) ? blockedOpcodes.get("S_" + pHeaderStr) : blockDefault;
        } else {
            return blockedOpcodes.containsKey("S_" + op) ? blockedOpcodes.get("S_" + op) : blockDefault;
        }
    }

    public static boolean RecvPacket(String op, String pHeaderStr) {
        if (op.equals("UNKNOWN")) {
            return blockedOpcodes.containsKey("R_" + pHeaderStr) ? blockedOpcodes.get("R_" + pHeaderStr) : blockDefault;
        } else {
            return blockedOpcodes.containsKey("R_" + op) ? blockedOpcodes.get("R_" + op) : blockDefault;
        }
    }

    public static String getProperty(String name) {
        if (server.containsKey(name)) {
            return server.getProperty(name);
        } else {
            System.out.println("Error finding the properties for: " + name + ".");
            return null;
        }
    }

    public static void setProperty(String prop, String newInf) {
        server.setProperty(prop, newInf);
    }

    public static String getProperty(String name, String def) {
        return server.getProperty(name, def);
    }

    /*
     * 最大Hp上限
     */
    public static int getMaxHp() {
        if (maxHp > 500000) {
            maxHp = 500000;
        }
        return maxHp;
    }

    /*
     * 最大Mp上限
     */
    public static int getMaxMp() {
        if (maxMp > 500000) {
            maxMp = 500000;
        }
        return maxMp;
    }

    /*
     * 持有金币上限
     */
    public static long getMaxMeso() {
        if (maxMeso < 10000000000L) {
            maxMeso = 10000000000L;
        }
        return maxMeso;
    }

    /*
     * 最高等级
     */
    public static int getMaxLevel() {
        if (maxLevel < 200 || maxLevel > 250) {
            maxLevel = 250;
        }
        return maxLevel;
    }

    /*
     * 骑士团最高等级
     */
    public static int getMaxCygnusLevel() {
        if (maxCygnusLevel < 120 || maxCygnusLevel > 250) {
            maxCygnusLevel = 250;
        }
        return maxCygnusLevel;
    }

    public static boolean isPvpMap(int mapid) {
        return PVPMap.contains(mapid);
    }

    public static int getLimitBreak() {
        return limitBreak;
    }

    public static int getCSNpcID() {
        return CSNpcID;
    }

    public static int getCSNpcID_Mode() {
        return CSNpcID_Mode;
    }

    public static int getMTSNpcID() {
        return MTSNpcID;
    }

    public static int getMTSNpcID_Mode() {
        return MTSNpcID_Mode;
    }

    public static int getExitNpcID() {
        return ExitNpcID;
    }

    public static int getExitNpcID_Mode() {
        return ExitNpcID_Mode;
    }
}
