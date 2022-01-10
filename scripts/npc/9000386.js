/* 骑宠商店 */

var status = -1;
var itemList = Array(

Array(2432291, 50000),//
Array(2430610, 50000),//
Array(2432031, 50000),//
Array(2432653, 100000),//
Array(2431423, 100000),//
Array(2432149, 100000),//
Array(2432328, 100000),//
Array(2432359, 200000),//
Array(2432361, 200000),//
Array(2431779, 200000),//
Array(2432500, 200000),//
Array(2432992, 200000),//
Array(2431697, 300000),//
Array(2432449, 300000),//
Array(2432191, 300000),//
Array(2434567, 300000),//
Array(2431425, 500000),//
Array(2432086, 500000),//
Array(2434025, 600000) //

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r \n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请选择您希望购买的骑宠：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k星币#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需 要 #r" + selectedCost + "#k 星币？");
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
        if (cm.getRMB() >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 100) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "星币商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem +  "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("#r1),抱歉,您今天赞助未达到100元.请赞助100元后再来购买\r\n\r\n#b2),您没有那么多星币,请获取后再来购买\r\n\r\n#r3).我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者即刻赞助本服 100元.谢谢您的合作.\r\n\r\n#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要  #r" + selectedCost + "#k #b星币。");
        }
        cm.dispose();
    }
}