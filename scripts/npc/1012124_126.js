//贝勒德装备
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
Array(1132243, 100000),//低级贝勒德刻印腰带
Array(1122264, 100000),//低级贝勒德刻印吊坠
Array(1032220, 100000),//低级贝勒德耳环
Array(1113072, 100000),//低级贝勒德戒指

Array(1132244, 300000),//中级贝勒德刻印腰带
Array(1122265, 300000),//中级贝勒德刻印吊坠
Array(1032221, 300000),//中级贝勒德耳环
Array(1113073, 300000),//中级贝勒德戒指

Array(1132245, 600000),//高级贝勒德刻印腰带
Array(1122266, 600000),//高级贝勒德刻印吊坠
Array(1032222, 600000),//高级贝勒德耳环
Array(1113074, 600000) //高级贝勒德戒指

//Array(1132246, 1000000),//最高级贝勒德刻印腰带
//Array(1122267, 1000000),//最高级贝勒德刻印吊坠
//Array(1032223, 1000000),//最高级贝勒德耳环
//Array(1113075, 1000000) //最高级贝勒德戒指
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的 #r#h ##k 您好，本店只出售#r【贝勒德饰品】#k\r\n请选择您需要购买的道具：";
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "贝勒德饰品专卖店", 3, true);
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