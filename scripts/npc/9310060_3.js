var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		Array(2610001, 30000),//封印解除卷轴
		Array(2046309, 20000),//周年庆饰品增强卷轴20%
		Array(2046008, 25000),//周年庆单手武器攻击力卷轴50%
		Array(2046009, 25000),//周年庆单手武器魔力卷轴50%
		Array(2046108, 25000), //周年庆双手武器攻击力卷轴50%
		Array(2046109, 25000),//周年庆双手武器魔法力卷轴50%
		Array(2046010, 60000),//周年庆单手武器攻击力卷轴100%
		Array(2046011, 60000),//周年庆单手武器魔法力卷轴100%
		Array(2046110, 60000), //周年庆双手武器攻击力卷轴100%
		Array(2046111, 60000),//周年庆双手武器魔法力卷轴100%
        	Array(2046074, 80000),//降龙单手武器攻击力99%
        	Array(2046075, 80000),//降龙单手武器魔法力99%
        	Array(2046149, 80000),//降龙双手武器攻击力99%
        	//Array(2049750, 3000),//S级潜能卷80%
		Array(2070019, 60000),//高科技电光镖
		Array(2330007, 50000),//高科技穿甲弹
        	Array(2070023, 50000), //火焰飞镖
        	Array(2045212, 50000),//PB双弩枪攻击卷
        	Array(2613000, 100000),//星火单手武器攻击力
        	Array(2613001, 100000),//星火单手武器魔力卷
        	Array(2612010, 100000) //星火双手武器攻击力
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