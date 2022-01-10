/* 点卷商店 */

var status = -1;
var itemList = Array(
Array(1666000, 300000), //女仆机器人
Array(1662070, 380000), //高级冒险岛机器人（男）
Array(1662071, 380000), //高级冒险岛机器人（女）
Array(1662032, 380000), //女妖机器人
Array(1662025, 380000), //幸福的机器人(男)
Array(1662026, 380000), //幸福的机器人(女)
Array(1662024, 380000), //维丽尔机器人
Array(1662021, 380000), //TOP 学校机器人(男)
Array(1662022, 380000), //TOP 学校机器人(女)
Array(1662077, 580000), //凉爽智能机器人
Array(1662053, 980000), //斯乌机器人
Array(1662011, 980000), //梦幻机器人（男）
Array(1662012, 980000), //梦幻机器人（女）
Array(1662033, 1080000),//未来机器人(男)
Array(1662034, 1080000),//未来机器人(女)
Array(1662043, 1080000),//隐月智能机器人(男)
Array(1662044, 1080000),//隐月智能机器人(女)
Array(1662086, 1080000),//路易智能机器人(男)
Array(1662087, 1080000),//路易智能机器人(女)





Array(1672011, 100000),//永恒的白银心脏
Array(1672012, 300000),//永恒的钢铁心脏
Array(1672013, 500000),//永恒的朱矿心脏
Array(1672014, 800000),//永恒的黄金心脏
Array(1672015, 1000000),//永恒的石榴石心脏
Array(1672016, 1280000),//永恒的水晶心脏
Array(1672028, 1280000),//维丽尔心脏
Array(1672027, 1800000),//极真锂心脏
Array(1672039, 1800000),//未来机器人心脏：7次
Array(1672069, 2680000) //女武神之心:10次机会

//
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好\r\n请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b星币#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b星币 ?");//\r\n和需要 #r" + selectedCost*1000 + "#k #b点卷
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
        if (cm.getRMB() >= selectedCost ) {//&& cm.getPlayer().getCSPoints(1) >= selectedCost * 1000
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "星币商城", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("#b抱歉,您没有那么多  星币,您无法购买.\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服.谢谢您的合作.\r\n\r\n#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b星币\r\n");//#b和需要#r" + selectedCost*1000 + "#k #b点卷
        }
        cm.dispose();
    }
}