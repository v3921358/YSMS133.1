/* 150武器商店 */

var status = -1;
var itemList = Array(
Array(1212057, 228), //
Array(1222052, 228), //
Array(1232072, 228), //
Array(1242077, 228), //
Array(1242078, 228), //
Array(1252056, 228), //
Array(1302229, 228), //
Array(1312118, 228), //
Array(1322164, 228), //
Array(1332195, 228), //
Array(1342071, 228), //
Array(1362069, 228), //
Array(1372141, 228), //
Array(1382170, 228), //
Array(1402153, 228), //
Array(1412106, 228), //
Array(1422109, 228), //
Array(1432140, 228), //
Array(1442184, 228), //
Array(1452172, 228), //
Array(1462161, 228), //
Array(1472181, 228), //
Array(1482142, 228), //
Array(1492154, 228), //
Array(1522073, 228), //
Array(1532076, 228), //
Array(1542045, 228), //
Array(1552045, 228) //

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