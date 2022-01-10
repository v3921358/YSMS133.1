package tools.packet;

import constants.ServerConstants;
import handling.SendPacketOpcode;
import org.apache.log4j.Logger;
import server.ServerProperties;
import tools.MaplePacketCreator;
import tools.data.output.MaplePacketLittleEndianWriter;

public class UIPacket {

    private static final Logger log = Logger.getLogger(UIPacket.class);

    public enum UI_SerialNumber {
        怪怪图鉴(596),;
        private int id;

        public int getId() {
            return id;
        }

        UI_SerialNumber(int id) {
            this.id = id;
        }
    }

    public static byte[] EarnTitleMsg(String msg) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // "You have acquired the Pig's Weakness skill."
        mplew.writeShort(SendPacketOpcode.EARN_TITLE_MSG.getValue());
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getSPMsg(byte sp, short job) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(ServerConstants.MapleStatusInfo.获得SP.getType());
        mplew.writeShort(job);
        mplew.write(sp);

        return mplew.getPacket();
    }

    public static byte[] getGPMsg(int itemid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(ServerConstants.MapleStatusInfo.获得家族点.getType());
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static byte[] getBPMsg(int amount) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(0x17);
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] getGPContribution(int itemid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(ServerConstants.MapleStatusInfo.获得贡献度.getType());
        mplew.writeInt(itemid);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] getTopMsg(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.TOP_MSG.getValue());
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getMidMsg(String msg, boolean keep, int index) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MID_MSG.getValue());
        mplew.write(index); //where the message should appear on the screen
        mplew.writeMapleAsciiString(msg);
        mplew.write(keep ? 0 : 1);

        return mplew.getPacket();
    }

    public static byte[] clearMidMsg() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CLEAR_MID_MSG.getValue());

        return mplew.getPacket();
    }

    /*
     * TYPE 公告类型汇总
     * 1 = 礼物箱
     * 2 = 雪花
     * 3 = 巧克力
     * 4 = 一束花
     * 5 = 棒棒糖
     * 6 = 枫叶
     * 7 = 烟花
     * 8 = 赛跑的姨妈巾
     * 9 = 红蓝配
     * A = 足球
     * B = 人参汤
     * C = 彩色土豆拼盘
     * D = 糖果拼盘
     * E = 夜空中最亮的星
     * F = 圣诞礼物
     * 10 = 气球
     * 11 = 可乐
     * 12 = 透明背景的人参汤
     * 13 = 玫瑰花
     * 14 = 金鱼
     * 15 = 雪人
     * 16 = 福到
     * 17 = 爱心巧克力
     * 18 = Happy熊
     * 19 = 老虎
     * 1A = 克拉拉
     * 1B = 警告牌
     * 1C = 云朵
     */
    public static byte[] getMapEffectMsg(String msg, int type, int time) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAP_EFFECT_MSG.getValue());
        mplew.writeMapleAsciiString(msg);
        mplew.writeInt(type);
        mplew.write(0xA0);
        mplew.writeInt(time * 3);

        return mplew.getPacket();
    }

    /*
     * 特殊的顶部公告
     * unk = 0宋体 3黑体 7雅园 8小黄
     * 字体大小最大128
     */
    public static byte[] getSpecialTopMsg(String msg, int unk, int fontsize, int color) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPECIAL_TOP_MSG.getValue());
        mplew.writeInt(unk); //字体
        mplew.writeInt(fontsize); //字体大小
        mplew.writeInt(color); //颜色代码
        mplew.writeInt(0); //未知
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getStatusMsg(int itemid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(ServerConstants.MapleStatusInfo.显示消耗品描述.getType());
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static byte[] MapEff(String path) {
        return MaplePacketCreator.environmentChange(path, 4); //T072修改为 4 以前为 3
    }

    public static byte[] MapNameDisplay(int mapid) {
        return MaplePacketCreator.environmentChange("maplemap/enter/" + mapid, 4); //T072修改为 4 以前为 3
    }

    public static byte[] Aran_Start() {
        return MaplePacketCreator.environmentChange("Aran/balloon", 5); //T072修改为 5 以前为 4
    }

    public static byte[] playMovie(String data, boolean show) {
        if (show) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAY_MOVIE.getValue());
        mplew.writeMapleAsciiString(data);
        mplew.write(show ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] summonHelper(boolean summon) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_HINT.getValue());
        mplew.write(summon ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] summonMessage(int type) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_HINT_MSG.getValue());
        mplew.write(1);
        mplew.writeInt(type);
        mplew.writeInt(7000); // probably the delay

        return mplew.getPacket();
    }

    public static byte[] summonMessage(String message) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_HINT_MSG.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(200); // IDK
        mplew.writeInt(10000); // Probably delay

        return mplew.getPacket();
    }

    public static byte[] IntroLock(boolean enable) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.INTRO_LOCK.getValue());
        mplew.write(enable ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] getDirectionStatus(boolean enable) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DIRECTION_STATUS.getValue());
        mplew.write(enable ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] getDirectionInfo(int type, int value) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DIRECTION_INFO.getValue());
        mplew.write(type);
        mplew.writeInt(value); //V.101修改为Int

        return mplew.getPacket();
    }

    public static byte[] getDirectionInfo(String data, int value, int x, int y, int pro) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DIRECTION_INFO.getValue());
        mplew.write(2);
        mplew.writeMapleAsciiString(data);
        mplew.writeInt(value);
        mplew.writeInt(x);
        mplew.writeInt(y);
        mplew.writeShort(pro);
        mplew.writeInt(0); //only if pro is > 0

        return mplew.getPacket();
    }

    public static byte[] IntroEnableUI(int wtf) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.INTRO_LOCK_MOVIE.getValue());
        mplew.write(wtf > 0 ? 1 : 0);
        if (wtf > 0) {
            mplew.writeShort(wtf);
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    public static byte[] IntroDisableUI(boolean enable) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CYGNUS_INTRO_DISABLE_UI.getValue());
        mplew.write(enable ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] fishingUpdate(byte type, int id) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FISHING_BOARD_UPDATE.getValue());
        mplew.write(type);
        mplew.writeInt(id);

        return mplew.getPacket();
    }

    public static byte[] fishingCaught(int chrid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FISHING_CAUGHT.getValue());
        mplew.writeInt(chrid);

        return mplew.getPacket();
    }

    public static byte[] getNpcNotice(int npcid, String text, int time) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_NOTICE.getValue());
        mplew.writeInt(npcid);
        mplew.writeInt(Math.max(1000, time));
        mplew.writeMapleAsciiString(text);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /**
     * 显示自由市场小地图，该数据包只对自由市场生效。
     *
     * @参数 show true ? 隐藏 : 显示
     */
    public static byte[] showFreeMarketMiniMap(boolean show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FM_HIDE_MINIMAP.getValue());
        mplew.writeReversedBool(show);

        return mplew.getPacket();
    }

    /**
     * 让客户端打开指定窗口
     *
     * @param id 类似于子类型
     * @return
     */
    public static byte[] sendOpenWindow(int id) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_WINDOW.getValue());
        mplew.writeInt(id);

        return mplew.getPacket();
    }

    /**
     * 打开新的聊天界面
     *
     * @param npc
     * @return
     */
    public static byte[] sendPVPWindow(int npc) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_WINDOW.getValue());
        mplew.writeInt(0x32);
        if (npc > 0) {
            mplew.writeInt(npc);
        }

        return mplew.getPacket();
    }

    /**
     * 打开活动列表界面
     *
     * @param npc
     * @return
     */
    public static byte[] sendEventWindow(int npc) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_WINDOW.getValue());
        mplew.writeInt(0x37);
        if (npc > 0) {
            mplew.writeInt(npc);
        }

        return mplew.getPacket();
    }
}
