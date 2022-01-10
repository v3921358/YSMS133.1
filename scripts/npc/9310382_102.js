var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		//Array( 2431938, 980000),// 法弗纳武器箱子*1
		//Array( 2432069, 980000),
Array(1052509, 1000000), //
Array(1052510, 1000000), //
Array(1052511, 1000000), //
Array(1052512, 1000000), //
Array(1052513, 1000000), //

Array(1082472, 1000000), //
Array(1082473, 1000000), //
Array(1082474, 1000000), //
Array(1082475, 1000000), //
Array(1082476, 1000000), //

Array(1072711, 1000000), //
Array(1072712, 1000000), //
Array(1072713, 1000000), //
Array(1072714, 1000000), //
Array(1072715, 1000000), //

Array(1102456, 1000000), //
Array(1102457, 1000000), //
Array(1102458, 1000000), //
Array(1102459, 1000000), //
Array(1102460, 1000000), //

Array(1132156, 1000000), //
Array(1132157, 1000000), //
Array(1132158, 1000000), //
Array(1132159, 1000000), //
Array(1132160, 1000000), //

Array(1152094, 1000000), //
Array(1152095, 1000000), //
Array(1152096, 1000000), //
Array(1152097, 1000000), //
Array(1152098, 1000000), //

Array(1003797, 1000000), //鲁塔比斯
Array(1003798, 1000000), //
Array(1003799, 1000000), //
Array(1003800, 1000000), //
Array(1003801, 1000000), //

Array(1042254, 1000000), //
Array(1042255, 1000000), //
Array(1042256, 1000000), //
Array(1042257, 1000000), //
Array(1042258, 1000000), //

Array(1062165, 1000000), //
Array(1062166, 1000000), //
Array(1062167, 1000000), //
Array(1062168, 1000000), //
Array(1062169, 1000000) //

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
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + " #k 点卷？");
        } else {
            cm.sendOk("出现错误...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("购买装备出现错误...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "会员点卷商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多点卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 点卷。");
        }
        cm.dispose();
    }
}