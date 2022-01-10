var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
Array(1022224, 80000), //
Array(1012240, 100000), //热血面罩 全属性+3
Array(1012252, 100000), //闪亮红色特殊徽章 全属性+5
Array(1012460, 180000), //枫叶 全属性+3 砸卷7次
Array(1022225, 180000), //
Array(1022226, 250000), //
Array(1012170, 250000) // 恐怖鬼娃娃  全属性+18
//Array(1122138, 280000), //苏醒的冒险心 全属性20 战士
//Array(1122139, 280000), //苏醒的冒险心 全属性20 法师
//Array(1122140, 280000), //苏醒的冒险心 全属性20 弓箭手
//Array(1122141, 280000), //苏醒的冒险心 全属性20 飞侠
//Array(1122142, 280000) //苏醒的冒险心 全属性20 海盗

		//Array(1122122, 800000),//战士心
		//Array(1122123, 800000),//法师心
		//Array(1122124, 800000),//弓手心
		//Array(1122125, 800000),//飞侠心
		//Array(1122126, 800000)//海盗心




		//Array(1132245, 250000),
		//Array(1132246, 450000),
		//Array(1122266, 250000),
		//Array(1122267, 450000),
		//Array(1032222, 250000),
		//Array(1032223, 450000),
		//Array(1113074, 250000)
		//Array(1113075, 450000)
		//Array( 2431938, 980000),// 法弗纳武器箱子*1
		//Array( 2432069, 980000),

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