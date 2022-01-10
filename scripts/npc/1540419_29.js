var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
		Array("140武器", 2431944, 180000, "武器"),
		Array("140防具", 2431945, 80000, "防具"),
		Array("150防具", 2432341, 680000, "防具"),
		Array("150武器", 2431938, 980000, "武器"),// 法弗纳武器箱子*1
		Array("150暴君", 2432069, 980000, "防具")

		/*Array("战士暴君", 1072743, 1300000, "鞋子"),
		Array("法师暴君", 1072744, 1300000, "鞋子"),
		Array("弓手暴君", 1072745, 1300000, "鞋子"),
        Array("飞侠暴君", 1072746, 1300000, "鞋子"),
		Array("海盗暴君", 1072747, 1300000, "鞋子"),
		Array("战士暴君", 1082543, 1300000, "手套"),
		Array("法师暴君", 1082544, 1300000, "手套"),
		Array("弓手暴君", 1082545, 1300000, "手套"),
		Array("飞侠暴君", 1082546, 1300000, "手套"),
		Array("海盗暴君", 1082547, 1300000, "手套"),
		Array("战士暴君", 1102481, 1300000, "披风"),
		Array("法师暴君", 1102482, 1300000, "披风"),
		Array("弓手暴君", 1102483, 1300000, "披风"),
		Array("飞侠暴君", 1102484, 1300000, "披风"),
		Array("海盗暴君", 1102485, 1300000, "披风"),
		Array("战士暴君", 1132174, 1300000, "腰带"),
		Array("战士暴君", 1132175, 1300000, "腰带"),
		Array("战士暴君", 1132176, 1300000, "腰带"),
		Array("战士暴君", 1132177, 1300000, "腰带"),
		Array("战士暴君", 1132178, 1300000, "腰带"),
        Array("140级", 1052314, 50000, "套装"),
        Array("140级", 1052315, 50000, "套装"),
        Array("140级", 1052316, 50000, "套装"),
        Array("140级", 1052317, 50000, "套装"),
        Array("140级", 1052318, 50000, "套装"),
        Array("140级", 1072485, 50000, "套装"),
        Array("140级", 1072486, 50000, "套装"),
        Array("140级", 1072487, 50000, "套装"),
        Array("140级", 1072488, 50000, "套装"),
        Array("140级", 1072489, 50000, "套装"),
        Array("140级", 1082295, 50000, "套装"),
        Array("140级", 1082296, 50000, "套装"),
        Array("140级", 1082297, 50000, "套装"),
        Array("140级", 1082298, 50000, "套装"),
        Array("140级", 1082299, 50000, "套装"),
        Array("140级", 1102275, 50000, "套装"),
        Array("140级", 1102276, 50000, "套装"),
        Array("140级", 1102277, 50000, "套装"),
        Array("140级", 1102278, 50000, "套装"),
        Array("140级", 1102279, 50000, "套装"),
        Array("140级", 1152110, 50000, "套装"),
        Array("140级", 1152111, 50000, "套装"),
        Array("140级", 1152112, 50000, "套装"),
        Array("140级", 1152113, 50000, "套装"),
        Array("140级", 1152108, 50000, "套装")*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

function start() {
    status = -1;
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = head + "#d#e欢迎使用点卷购买物品,请选择您想要的：#n#k\r\n";
            selStr += "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
            selStr += "- #e装备#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + "购买" + itemlist[i][0] + " #r#z" + itemlist[i][1] + "##b 需" + (i == 9 || i == 11 ? "" : "要") + itemlist[i][2] + "#k #b点卷#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "确定购买 #r#z" + itemlist[seld][1] + "##k 将会使用掉您 #r" + itemlist[seld][2] + "点券. 您将获得#r" + itemlist[seld][3] + "#k" + itemlist[seld][0] + "#z" + itemlist[seld][1] + "#。");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(1);
			if (nx1 < itemlist[seld][2] && nx1 < itemlist[seld][2] || cm.getSpace(1) < 1) {
				cm.sendOk(head + "购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包装备栏位已满,请清理.");
			} else {
				cm.gainNX(nx1 < itemlist[seld][2] ? 1 : 2, -itemlist[seld][2]);
				cm.gainItem(itemlist[seld][1], 1);
				cm.sendOk(head + "恭喜您成功购买#z" + itemlist[seld][1] + "#.");
				cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买" + cm.getItemName(itemlist[seld][1]) + "一个。", 5120012);
				cm.worldSpouseMessage(0x20, "『点卷商城』 : 恭喜 " + cm.getChar().getName() + " 用点卷购买" + cm.getItemName(itemlist[seld][1]) + "一个.");
			}
			cm.dispose();
        }
    }
}