/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import database.DatabaseConnection;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

import server.Randomizer;

/**
 * @author PlayDK
 */
public class test {

    public static void main(String args[]) throws IOException {
//        String in = "落叶";
//        String name = "落叶无痕";
//        System.err.println("是否包含: " + name.toLowerCase().indexOf(in.toLowerCase()));
//        System.err.println("测试: " + 112000000 / 10000);
//        System.err.println("10000: " + GameConstants.getJobNumber(10000));
//        System.err.println("10100: " + GameConstants.getJobNumber(10100));
//        System.err.println("10110: " + GameConstants.getJobNumber(10110));
//        System.err.println("10111: " + GameConstants.getJobNumber(10111));
//        System.err.println("10112: " + GameConstants.getJobNumber(10112));
////        for (MapleJob list : MapleJob.values()) {
////            int jobId = list.getId();
////            System.err.println("职业ID: " + jobId + " Hp: " + GameConstants.getHpApByJob(jobId) + " Mp: " + GameConstants.getMpApByJob(jobId));
////        }
//        System.err.println("测试: " + 2 / 5 * 100);
//        System.err.println("-----------------------------------------");
//        System.err.println("长度: " + "00-00-00-00-00-00".length());
//        String dateString = "201309291830";
//        System.err.println("时间: " + DateUtil.getStringToTime(dateString));
//        System.err.println("当前: " + System.currentTimeMillis());
//        int[] bytes = new int[6];
//        bytes[0] = 0x10;
//        bytes[1] = 0xBF;
//        bytes[2] = 0x48;
//        bytes[3] = 0x7B;
//        bytes[4] = 0x10;
//        bytes[5] = 0x8B;
//        StringBuilder mac = new StringBuilder();
//        for (int i = 0; i < bytes.length; i++) {
//            mac.append(StringUtil.getLeftPaddedStr(Integer.toHexString(bytes[i]).toUpperCase(), '0', 2));
//            mac.append("-");
//        }
//        String sp = mac.toString();
//        System.err.println("MAC: " + sp.substring(0, sp.length() - 1));
//
//        String text = "以下道具不能重复装备。\\r\\n\\r\\n-------&amp;lt;不能重复装备的道具列表&gt;------\\r\\n新月戒指\\r\\n半月戒指";
//        text = text.replace("&amp;lt;", "<");
//        text = text.replace("&gt;", ">");
//        System.err.println("地图: " + text);
        System.err.println(IPAddressTool.getkey());
    }

    public static int getZeroWeapon(int level) {
        int weapon = 1562000;
        if (level < 110) {
            return weapon;
        }
        if (level >= 110 && level < 170) {
            weapon += (level % 100) / 10;
        } else if (level >= 170) {
            weapon += 7;
        }
        return weapon;
    }

    public static void initTime() {
        System.err.println("地图: " + 1662000 / 1000);
//        String a = "123466488advaeesd";
        System.err.println("测试 " + DateUtil.getNowTime());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日HH时mm分ss秒");
        String ly_time = sdf.format(new java.util.Date());
        System.out.println("现在时间是 - 方法1: " + ly_time);
        String ly_time2 = new SimpleDateFormat("yyyy年MM月dd日HH时mm分ss秒").format(Calendar.getInstance().getTime());
        System.out.println("现在时间是 - 方法2: " + ly_time2);
    }

    public static void init1() {
        List<Integer> Ids = new ArrayList<>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            ps = con.prepareStatement("SELECT * FROM reactordrops WHERE reactorid > 0");
            rs = ps.executeQuery();
            while (rs.next()) {
                int reactorid = rs.getInt("reactorid");
                if (Ids.contains(reactorid)) {
                    continue;
                }
                Ids.add(reactorid);
            }
            rs.close();
            ps.close();
            Collections.sort(Ids);
            outputWithLogging("INSERT INTO reactordrops (`reactorid`, `itemid`, `chance`, `questid`) VALUES");
            for (Integer rid : Ids) {
                ps = con.prepareStatement("SELECT * FROM reactordrops WHERE reactorid = ?");
                ps.setInt(1, rid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    outputWithLogging("(" + rid + ", " + rs.getInt("itemid") + ", " + rs.getInt("chance") + ", " + rs.getInt("questid") + "),");
                }
                rs.close();
                ps.close();
            }
        } catch (SQLException e) {
        }
    }

    public static void outputWithLogging(String buff) {
        String file = "reactordrops.sql";
        FileoutputUtil.log(file, buff, true);
    }

    public static void init() {
        System.err.println("测试 " + 1 * 0.5);
        List<Integer> availableSN = new LinkedList<>();
        availableSN.add(20000485);
        availableSN.add(20000486);
        availableSN.add(20000487);
        availableSN.add(20000488);
        availableSN.add(20000489);
        availableSN.add(20000490);
        availableSN.add(20000491);

        String time1 = new SimpleDateFormat("yy-MM-dd-HH-mm").format(new Date()).replace("-", "");

        System.err.println("时间: " + Integer.valueOf(time1));
        System.err.println("时间: " + DateUtil.getTime(1352714698000L));
        System.err.println("白天使 - 1 " + 10001004 % 10000);
        int i = 0;
        for (int x = 0; x < 30; x++) {
            short prop = (short) Randomizer.rand(1, 5);
            System.err.println("点数: " + prop + " - " + x);
            System.err.println("随机 " + availableSN.get(Randomizer.nextInt(availableSN.size())));
            if (prop >= 4) {
                i++;
            }
        }
        System.err.println("成功次数: " + i);
        //System.err.println("成功次数: " + (1 - 1) / 10);
        Map<Integer, Integer> totemEquip = new HashMap<>();
        totemEquip.put(4, 30000);
        totemEquip.put(2, 20000);
        totemEquip.put(0, 10000);
        for (Entry<Integer, Integer> entry : totemEquip.entrySet()) {
            System.err.println("数组 - > " + entry.getKey() + " " + entry.getValue());
        }
        //LoginInformationProvider.getInstance();
        long time = System.currentTimeMillis() + 8 * 60 * 60 * 1000;
        Timestamp currentVipTime = new Timestamp(time);
        System.err.println(currentVipTime);
        System.err.println(time);

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR, 2);
        cal.set(Calendar.MINUTE, 22); //5 mins = time to register
        cal.set(Calendar.SECOND, 22);
        System.err.println(cal.getTime());
        long nextTime = cal.getTimeInMillis();
        nextTime += 1000 * 60 * 142;
        currentVipTime = new Timestamp(nextTime);
        System.err.println(currentVipTime);

        //System.err.println("测试: " + ((double) 40 / (double) 40) * 2);
        //System.err.println("地图: " + 955000100 / 1000000);
        //System.err.println("地图: " + 955000200 / 1000000);
        //System.err.println("地图: " + 955000300 / 1000000);
        //System.err.println("地图 - " + (955000100 % 1000) / 100);
        //System.err.println("地图 - " + (955000200 % 1000) / 100);
        //System.err.println("地图 - " + (955000300 % 1000) / 100);
    }
}
