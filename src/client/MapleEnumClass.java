/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

/**
 * @author ODINMR
 */
public class MapleEnumClass {

    /**
     * 专业技术消息
     */
    public enum HarvestMsg {

        HARVEST_NO_TOOLS(1), //没有可以用于采集的工具
        HARVEST_LEVEL_LOW(2), //采集等级太低，无法采集
        HARVEST_NOT_LEARNING_HERBS(3), //尚未学习采药
        HARVEST_NOT_LEARNING_MINING(4), //尚未学习采矿
        HARVEST_FATIGUE_FULL(5), //疲劳度已满，无法采集
        HARVEST_DISTANCE_FAR(6), //采集物距离太远，取消采集
        HARVEST_CANCELLED(7), //已取消采集
        HARVEST_PLAYER_PROCESSING(8), //已经有人正在采集
        HARVEST_UNABLE_COLLECT(9), //还无法采集
        HARVEST_UNKNOWN_ERROR(0xA), //由于未知错误，采集无法进行
        HARVEST_ACTION_START(0xB); //开始采集

        private final int code;

        HarvestMsg(int code) {
            this.code = code;
        }

        public int getCode() {
            return this.code;
        }

        public boolean is(HarvestMsg other) {
            return other != null && this.code == other.code;
        }
    }

    /**
     * 账号验证结果
     */
    public enum AuthReply {

        GAME_LOGIN_SUCCESSFUL(0),
        GAME_ACCOUNT_DELETE(3),
        GAME_PASSWORD_ERROR(4),
        GAME_ACCOUNT_NOT_LANDED(5),
        GAME_SYSTEM_ERROR(6),
        GAME_CONNECTING_ACCOUNT(7),
        GAME_CONNECTION_BUSY(10),
        GAME_CONNECTION_LOCKING(13),
        GAME_DEFINITION_INFO(16),
        GAME_PROTOCOL_INFO(22);

        private final int code;

        AuthReply(int code) {
            this.code = code;
        }

        public int getCode() {
            return this.code;
        }

        public boolean is(AuthReply other) {
            return other != null && this.code == other.code;
        }
    }

    public enum ScriptMessageType {

        Say(0x0),
        SayImage(0x1),
        AskYesNo(0x2),
        AskText(0x3),
        AskNumber(0x4),
        AskMenu(0x5),
        AskQuiz(0x6),
        AskSpeedQuiz(0x7),
        AskAvatar(0x8),
        AskMemberShopAvatar(0x9),
        AskPet(0xA),
        AskPetAll(0xB),
        AskScript(0xC),
        AskAccept(0xD),
        AskBoxText(0xE),
        AskSlideMenu(0xF),
        AskCenter(0x10);
        private final int nMsgType;

        ScriptMessageType(int nMsgType) {
            this.nMsgType = nMsgType;
        }

        public int getMsgType() {
            return nMsgType;
        }
    }
}
