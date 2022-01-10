/* 道具卷轴商店 */

var status = -1;
var itemList = Array(

    Array(2046763, 20),
	Array(2046764, 20),
	Array(2046765, 20),
	Array(2046766, 20),
    Array(2046913, 30),
	Array(2046914, 30),
	Array(2046173, 30),
    Array(2046996, 40),
	Array(2046997, 40),
	Array(2047818, 40),
  	Array(1662006, 30),
	Array(1672003, 20),
	Array(1672004, 30),
	Array(1672005, 40),
	Array(1672007, 50),
    Array(1672027, 70)
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k元宝#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需 要 #r" + selectedCost + "#k 元宝？");
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
        if (cm.getHyPay(1) >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 50) {//判断当天充值金额才能购买
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "神秘商店", 3, true);
            if (gachaponItem != -1) {
                cm.addHyPay(selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem +  "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("#b抱歉,您今天赞助未达到50元.无法购买.或您没有那么多元宝\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服 50元.谢谢您的合作.\r\n\r\n#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要  #r" + selectedCost + "#k #b元宝。");
        }
        cm.dispose();
    }
}