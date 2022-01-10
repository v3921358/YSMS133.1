var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		//Array( 2431944, 180000),
		//Array( 2431945, 80000),
		//Array( 2432341, 680000),
		Array( 2431938, 980000),// 法弗纳武器箱子*1
		Array( 2432069, 980000)

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

var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1  + " #k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 1;
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + " #k 点卷？");
        } else {
            cm.sendOk("出现错误...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("购买道具出现错误...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "点卷商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多点卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 点卷。");
        }
        cm.dispose();
    }
}