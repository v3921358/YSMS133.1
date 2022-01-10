/* 150防具商店 */

var status = -1;
var itemList = Array(
Array(1052509, 168), //
Array(1052510, 168), //
Array(1052511, 168), //
Array(1052512, 168), //
Array(1052513, 168), //

Array(1082472, 168), //
Array(1082473, 168), //
Array(1082474, 168), //
Array(1082475, 168), //
Array(1082476, 168), //

Array(1072711, 168), //
Array(1072712, 168), //
Array(1072713, 168), //
Array(1072714, 168), //
Array(1072715, 168), //

Array(1102456, 168), //
Array(1102457, 168), //
Array(1102458, 168), //
Array(1102459, 168), //
Array(1102460, 168), //

Array(1132156, 168), //
Array(1132157, 168), //
Array(1132158, 168), //
Array(1132159, 168), //
Array(1132160, 168), //

Array(1152094, 168), //
Array(1152095, 168), //
Array(1152096, 168), //
Array(1152097, 168), //
Array(1152098, 168), //

Array(1003797, 188), //鲁塔比斯
Array(1003798, 188), //
Array(1003799, 188), //
Array(1003800, 188), //
Array(1003801, 188), //

Array(1042254, 188), //
Array(1042255, 188), //
Array(1042256, 188), //
Array(1042257, 188), //
Array(1042258, 188), //

Array(1062165, 188), //
Array(1062166, 188), //
Array(1062167, 188), //
Array(1062188, 188), //
Array(1062169, 188), //

Array(1082543, 298), //
Array(1082544, 298), //
Array(1082545, 298), //
Array(1082546, 298), //
Array(1082547, 298), //

Array(1132174, 298), //
Array(1132175, 298), //
Array(1132176, 298), //
Array(1132177, 298), //
Array(1132178, 298), //

Array(1102481, 298), //
Array(1102482, 298), //
Array(1102483, 298), //
Array(1102484, 298), //
Array(1102485, 298), //

Array(1072743, 298), //
Array(1072744, 298), //
Array(1072745, 298), //
Array(1072746, 298), //
Array(1072747, 298) //

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r \n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k余额#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需 要 #r" + selectedCost + "#k 余额？");
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
        if (cm.getRMB() >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 0) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "余额商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem +  "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("#b抱歉,您没有那么多余额,您无法购买.\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服.谢谢您的合作.\r\n\r\n#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要  #r" + selectedCost + "#k #b余额。");
        }
        cm.dispose();
    }
}