/* 点卷兑换 */

var status = -1;
var selectedpay = 0;
var acash = 2000;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

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
                cm.sendNext(head + "如果您需要把元宝兑换成点卷的话，那么请下次来找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
			var selStr = ""+ head + "亲爱的#b#h ##k您好，我是" + cm.getServerName() + "玩家点卷充值兑换员.\r\n\r\n- #e#d您的消费信息为:#n#k\r\n\r\n";
			selStr += "#b当前元宝:#r " + cm.getHyPay(1) + "#k #b已消费元宝:#r " + cm.getHyPay(2) + " #k #b累计充值元宝:#r " + cm.getHyPay(3) + " #k\r\n\r\n";
			selStr += "#b#L0#" + icon + "元宝购买点卷(1:2000)\r\n";
			selStr += "#L1#" + icon + "领取赞助奖励#l\r\n";
			selStr += "#L2#" + icon+ "国庆币兑换元宝#l\r\n";
			selStr += "#L3#" + icon+ "打开本服充值连接\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			if(selection == 1) {
				cm.dispose();
				cm.openNpc(9310382, 8);
				return;
			} else if (selection == 2) 
			{
				cm.dispose();
				cm.openNpc(9201357, 2);
				return;
			} else if (selection == 3) 
			{
				cm.dispose();
				cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
				return;
			}

            if (cm.getHyPay(1) == 0) {
                cm.sendNext(head + "您没有可使用的元宝。");
                cm.dispose();
            } else {
                cm.sendGetNumber(head + "请输入您要购买的元宝:\r\n游戏点卷的购买比例为 1 : 2000\r\n", 1, 1, cm.getHyPay(1));
            }
        } else if (status == 2) {
            selectedpay = selection;
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext(head + "您元宝不够。");
                cm.dispose();
            } else {
                cm.sendYesNo(head + "您是否要使用#r " + selectedpay + " #k元宝购买#b " + selectedpay * acash + " #k的点卷。");
            }
        } else if (status == 3) {
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext(head + "您元宝不够。");
            } else if (cm.addHyPay(selectedpay) > 0) {
                cm.gainNX(selectedpay * acash);
                cm.sendOk(head + "恭喜您成功购买#b " + selectedpay * acash + " #k的点卷，本次购买消费元宝#r " + selectedpay + " #k，您目前的元宝余额为:#r " + cm.getHyPay(1) + " #k。");
            } else {
                cm.sendOk(head + "购买点卷出现错误，请反馈给管理员！");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}