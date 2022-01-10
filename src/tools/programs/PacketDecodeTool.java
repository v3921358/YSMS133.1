/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.programs;

import java.io.ByteArrayOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.TimeZone;

import tools.FileoutputUtil;
import tools.Pair;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.LittleEndianAccessor;

/**
 * @author PlayDK
 */
public class PacketDecodeTool {

    public static void main(String[] args) {
        Properties data = new Properties();
        InputStreamReader is;
        try {
            is = new FileReader("Packet.txt");
            data.load(is);
            is.close();
        } catch (IOException ex) {
            System.out.println("Failed to load Packet.txt");
        }
        String packet = data.getProperty("packet");
        System.out.println(packet);
        byte[] bytes = getByteArrayFromHexString(packet);
        LittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream(bytes));
        String text = slea.readMapleAsciiString();
        System.out.println("测试文本: " + (text == null) + " - " + text.length());

    }

    public static void initKeymap(LittleEndianAccessor slea) {
        Map<Integer, Pair<Byte, Integer>> keymap = new HashMap<>();
        byte type;
        int action;
        StringBuilder array1 = new StringBuilder();
        StringBuilder array2 = new StringBuilder();
        StringBuilder array3 = new StringBuilder();
        int i = 0;
        for (int x = 0; x < 89; x++) {
            if (slea.available() >= 5) {
                type = slea.readByte();
                action = slea.readInt();
                if (type > 0) {
                    i++;
                    array1.append(x);
                    array1.append(", ");
                    array2.append(type);
                    array2.append(", ");
                    array3.append(action);
                    array3.append(", ");
                    keymap.put(x, new Pair<>(type, action));
                    System.out.println("type : " + type + " action : " + action + " 当前: " + i);
                }
            }
        }
        System.out.println("array1 : " + array1.toString());
        System.out.println("array2 : " + array2.toString());
        System.out.println("array3 : " + array3.toString());
        FileoutputUtil.packetLog("keymap.txt", array1.toString());
        FileoutputUtil.packetLog("keymap.txt", array2.toString());
        FileoutputUtil.packetLog("keymap.txt", array3.toString());
    }

    public static boolean isDST() {
        return TimeZone.getDefault().inDaylightTime(new Date());
    }

    public static byte[] getByteArrayFromHexString(String hex) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int nexti = 0;
        int nextb = 0;
        boolean highoc = true;
        outer:
        for (;;) {
            int number = -1;
            while (number == -1) {
                if (nexti == hex.length()) {
                    break outer;
                }
                char chr = hex.charAt(nexti);
                if (chr >= '0' && chr <= '9') {
                    number = chr - '0';
                } else if (chr >= 'a' && chr <= 'f') {
                    number = chr - 'a' + 10;
                } else if (chr >= 'A' && chr <= 'F') {
                    number = chr - 'A' + 10;
                } else {
                    number = -1;
                }
                nexti++;
            }
            if (highoc) {
                nextb = number << 4;
                highoc = false;
            } else {
                nextb |= number;
                highoc = true;
                baos.write(nextb);
            }
        }
        return baos.toByteArray();
    }
}
