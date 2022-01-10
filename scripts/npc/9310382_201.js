/* 160埃苏莱布斯商店 */

var status = -1;
var itemList = Array(
Array(1212115, 368), //
Array(1222109, 368), //
Array(1232109, 368), //
Array(1242116, 368), //
Array(1402251, 368), //
Array(1302333, 368), //
Array(1312199, 368), //
Array(1322250, 368), //
Array(1332274, 368), //
Array(1342101, 368), //
Array(1362135, 368), //
Array(1372222, 368), //
Array(1382259, 368), //
Array(1412177, 368), //
Array(1422184, 368), //
Array(1432214, 368), //
Array(1442268, 368), //
Array(1452252, 368), //
Array(1462239, 368), //
Array(1472261, 368), //
Array(1482216, 368), //
Array(1492231, 368), //
Array(1522138, 368), //
Array(1532144, 368), //
Array(1552110, 368), //
Array(1252093, 368), //
Array(1542108, 368), //

//防具
Array(1004422, 198), //
Array(1004423, 198), //
Array(1004424, 198), //
Array(1004425, 198), //
Array(1004426, 198), //

Array(1052882, 198), //
Array(1052887, 198), //
Array(1052888, 198), //
Array(1052889, 198), //
Array(1052890, 198), //

Array(1082636, 198), //
Array(1082637, 198), //
Array(1082638, 198), //
Array(1082639, 198), //
Array(1082640, 198), //

Array(1073030, 198), //
Array(1073032, 198), //
Array(1073033, 198), //
Array(1073034, 198), //
Array(1073035, 198), //

Array(1102775, 198), //
Array(1102794, 198), //
Array(1102795, 198), //
Array(1102796, 198), //
Array(1102797, 198), //

Array(1152174, 198), //
Array(1152176, 198), //
Array(1152177, 198), //
Array(1152178, 198), //
Array(1152179, 198) //

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