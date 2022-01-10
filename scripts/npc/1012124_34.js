var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
        Array(2610001, 90000),//封印解除卷轴
        //Array(2340000, 1500),//祝福卷
       // Array(2049323, 40000),//无损强化卷
		//Array(2046309, 40000),//周年庆饰品增强卷轴20%
		Array(2046008, 60000),//周年庆单手武器攻击力卷轴50%
		Array(2046009, 60000),//周年庆单手武器魔力卷轴50%
		Array(2046108, 60000), //周年庆双手武器攻击力卷轴50%
		Array(2046109, 60000),//周年庆双手武器魔法力卷轴50%
		Array(2046010, 150000),//周年庆单手武器攻击力卷轴100%
		Array(2046011, 150000),//周年庆单手武器魔法力卷轴100%
		Array(2046110, 150000), //周年庆双手武器攻击力卷轴100%
		Array(2046111, 150000),//周年庆双手武器魔法力卷轴100%
        //Array(2046074, 80000),//降龙单手武器攻击力99%
        //Array(2046075, 80000),//降龙单手武器魔法力99%
        //Array(2046149, 80000),//降龙双手武器攻击力99%
        //Array(2049750, 3000),//S级潜能卷80%
		Array(2070019, 300000),//高科技电光镖
		Array(2330007, 300000),//高科技穿甲弹
        Array(2070023, 200000) //火焰飞镖
        //Array(2049124, 1000), //正向混顿卷
        //Array(2049137, 5000),//惊人正义混沌卷40%
        //Array(2045212, 50000),//PB双弩枪攻击卷
        //Array(2613000, 120000),//星火单手武器攻击力
        //Array(2613001, 120000),//星火单手武器魔力卷
        //Array(2612010, 120000) //星火双手武器攻击力
        /*Array(2610001, 25000),//封印解除卷轴
        //Array(2340000, 1500),//祝福卷
       // Array(2049323, 4000),//无损强化卷
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
		Array(2070019, 50000),//高科技电光镖
		Array(2330007, 50000),//高科技穿甲弹
        Array(2070023, 20000), //火焰飞镖
        //Array(2049124, 1000), //正向混顿卷
        //Array(2049137, 5000),//惊人正义混沌卷40%
        Array(2045212, 50000),//PB双弩枪攻击卷
        Array(2613000, 110000),//星火单手武器攻击力
        Array(2613001, 110000),//星火单手武器魔力卷
        Array(2612010, 110000) //星火双手武器攻击力*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = head + "#d#e欢迎使用抵用券购买物品,请选择您想要的：#n#k\r\n";
            selStr += "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
            selStr += "- #e请选择需要购买道具卷轴#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + " #r#z" + itemlist[i][0] + "##k 需" + (i >= 2 && i <=4 ? "" : "要 ") + "#r" + itemlist[i][1] + "#k 抵用券#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "确定购买一个 #r#z" + itemlist[seld][0] + "##k吗？ 将会使用掉您 #r" + itemlist[seld][1] + "抵用券. ");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < itemlist[seld][1] && nx2 < itemlist[seld][1] || cm.getSpace(2) < 1) {
				cm.sendOk(head + "购买失败：\r\n\r\n#r1). 当前抵用卷未达到条件.\r\n2). 背包装备栏位已满,请清理.");
			} else {
				cm.gainNX(nx2 < itemlist[seld][1] ? 1 : 2, -itemlist[seld][1]);
				cm.gainItem(itemlist[seld][0], 1);
				cm.sendOk(head + "恭喜您成功购买#z" + itemlist[seld][0] + "#.");
				cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买" + cm.getItemName(itemlist[seld][0]) + "一个。", 5120012);
				cm.worldSpouseMessage(0x20, "『抵用券商城』 : 恭喜 " + cm.getChar().getName() + " 用抵用卷购买" + cm.getItemName(itemlist[seld][0]) + "一个.");
			}
			cm.dispose();
        }
    }
}