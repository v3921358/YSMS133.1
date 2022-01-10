/* 现金道具卷轴商店 */

var status = -1;
var itemList = Array(
Array(2046913, 20), //  - 宿命正义单手武器攻击力卷轴 100% 
Array(2046914, 20), // - 宿命正义单手武器魔力卷轴 100% 
Array(2046173, 20), // - 宿命正义双手武器攻击力卷轴 100%

Array(2046074, 25), //祥龙单手武器攻击力卷轴99%
Array(2046075, 25),//祥龙单手武器魔法力卷轴99%
Array(2046149, 25),//祥龙双手武器攻击力卷轴99%

Array(2613000, 30), //星火
Array(2613001, 30),
Array(2612010, 30),

Array(2047840, 35),//RED
Array(2613016, 35),
Array(2613017, 35),

Array(2046996, 40),//惊人正义卷
Array(2046997, 40),
Array(2047818, 40)


//Array(2046577, 20), //  - 宿命正义防具力量卷轴 100%
//Array(2046578, 20), // - 宿命正义防具智力卷轴 100%
//Array(2046579, 20), // - 宿命正义防具敏捷卷轴 100% 
//Array(2046580, 20), // - 宿命正义防具运气卷轴 100%
//Array(2046763, 20), // - 宿命正义饰品力量卷轴 100%
//Array(2046764, 20), // - 宿命正义饰品智力卷轴 100%
//Array(2046765, 20), // - 宿命正义饰品敏捷卷轴 100%
//Array(2046766, 20),  // - 宿命正义饰品运气卷轴 100
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "现金商城", 3, true);
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