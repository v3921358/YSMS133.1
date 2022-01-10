/* 点卷兑换 */

var status = -1;
var selectedpay = 0;
var acash = 3000;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQrmal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 2) {
                cm.sendNext(head + "如果您需要把星币兑换成点卷的话，那么请下次来找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("\r\n亲爱的#b#h ##k您好，我是" + cm.getServerName() + "玩家点卷充值兑换员.\r\n  您的消费信息为:\r\n  " + tz1 + "当前星币:#r " + getEnergyvalue() + " #k币\t  " + tz1 + "累计充值：#r" + cm.getTotalRMB() + " #k元\r\n#b    温馨提示：赞助比例为1人民币=10000星币\r\n\r\n#b#L0#" + tz1 + "#r星币兑换点卷(10000:3000)\r\n\r\n#b#L3#" + tz1 + "#r国庆币兑换点卷(1:900)\r\n\r\n#b#L5#" + tz1 + "#r点卷兑换国庆币(1000:1)\r\n");//，#b#L4#" + tz1 + "#r星币元宝中介(1:1)\r\n#b#L5#" + tz1 + "#r点卷兑换中介(1000:1)\r\n#L1#" + tz1 + "领取赞助奖励#l\r\n#L2#" + tz1+ "点点会员理财#l#k\r\n\r\n" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n#L3##b点击返回主菜单#k#l\r\n");
        } else if (status == 1) {
            if (selection == 1) {
                cm.dispose();
                cm.openNpc(9310144, 8);
                return;
            } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(1540419, 100);
                return;
            } else if (selection == 9) {
                cm.dispose();
                cm.openNpc(1540419);
                return;
            } else if (selection == 4) {//元宝兑换现金
                cm.dispose();
                cm.openNpc(1540419, 91);
                return;
            } else if (selection == 5) {//点卷兑换国庆币
                cm.dispose();
                cm.openNpc(1012124, 89);
                return;
            } else if (selection == 3) {//国庆币兑换点卷
                cm.dispose();
                cm.openNpc(1012124, 90);
                return;
            }

            if (getEnergyvalue() == 0) {//星币兑换点卷
                cm.sendNext(head + "您没有可兑换的星币。");
                cm.dispose();
            } else {
                cm.sendGetNumber(head + "请输入您要兑换的星币:\r\n游戏点卷的兑换比例为 10000 : 3000\r\n", 1, 1, getEnergyvalue());
            }
        } else if (status == 2) {
            selectedpay = selection;
            if (getEnergyvalue() < selectedpay) {
                cm.sendNext(head + "您星币不够。");
                cm.dispose();
            } else {
                cm.sendYesNo(head + "您是否要将#r " + selectedpay + " #k星币兑换成#b " + selectedpay * acash + " #k的点卷。");
            }
        } else if (status == 3) {
            if (getEnergyvalue() >= selectedpay) {
                setEnergyvalues(-selectedpay);
                cm.gainNX(selectedpay * acash);
                cm.sendOk("兑换成功");

            } else {
                cm.sendOk(head + "兑换点卷出现错误，请反馈给管理员！");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}

function getEnergyvalue() {                                                                                                                                                     //查询RMB
    var CharData = cm.getConnection().prepareStatement("SELECT * FROM accounts where id = " + cm.getPlayer().getAccountID() + "").executeQuery();
    while (CharData.next()) {//得到记录数据
        return parseInt(CharData.getString("rmb"));
    }
    CharData.close();
}

function setEnergyvalues(Number) {                                                                                                                                               //调整RMB
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM accounts where id = " + cm.getPlayer().getAccountID() + "").executeQuery();
    while (Times.next()) {
        i++;
    }
    if (i == 0) {
        var insert = cm.getConnection().prepareStatement("INSERT INTO accounts VALUES(?,?)");
        insert.setString(cm.getPlayer().getAccountID(), Number);
        insert.executeUpdate();
    } else {
        var update = cm.getConnection().prepareStatement("update accounts set rmb = ? where id = " + cm.getPlayer().getAccountID());
        update.setString(1, getEnergyvalue(cm.getPlayer().getAccountID()) + Number);
        update.executeUpdate();
    }
}
