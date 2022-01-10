var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(4001839, 30),//星星
Array(5062009, 3000),
Array(5062010, 2000),
Array(5062500, 3000),
Array(2500000, 100000),
Array(2501000, 300000),
Array(5050000, 200),
Array(5050001, 400),
Array(5050002, 400),
Array(5050003, 400),
Array(2049405, 30000),
Array(2048313, 30000),
Array(5530268, 3000),
Array(5530269, 6000),
Array(2048305, 3000),
Array(5064003, 6000),
Array(5050000, 1000),
Array(5050001, 1200),
Array(5050002, 1800),
Array(5050003, 3000),
Array(5050004, 4500)

/*
Array(2049323, 5000),	//无损强化卷
Array(2046008, 50000), // - 周年庆单手武器攻击力卷轴50%
Array(2046009, 50000), // - 周年庆单手武器魔法力卷轴50%
Array(2046108, 50000), // - 周年庆双手武器攻击力卷轴50%
Array(2046109, 50000), // - 周年庆双手武器魔法力卷轴50%
Array(2046110, 120000),//周年庆双手武器攻击力卷轴100%
Array(2046111, 120000),//周年庆双手武器魔法力卷轴100%
Array(2046010, 120000),//周年庆单手武器攻击力卷轴100%
Array(2046011, 120000),//周年庆单手武器攻击力卷轴100%
Array(2046170, 120000),//潜龙双手武器攻击强化卷50%
Array(2046907, 120000),//潜龙单手武器攻击强化卷50%
Array(2046908, 120000),//潜龙单手武器魔力强化卷50%
Array(2046577, 100000), //  - 宿命正义防具力量卷轴 100%
Array(2046578, 100000), // - 宿命正义防具智力卷轴 100%
Array(2046579, 100000), // - 宿命正义防具敏捷卷轴 100% 
Array(2046580, 100000), // - 宿命正义防具运气卷轴 100%
Array(2046763, 100000), // - 宿命正义饰品力量卷轴 100%
Array(2046764, 100000), // - 宿命正义饰品智力卷轴 100%
Array(2046765, 100000), // - 宿命正义饰品敏捷卷轴 100%
Array(2046766, 100000)  // - 宿命正义饰品运气卷轴 100

*/

					);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			text = "#h0#,你好！在这里可以选择你想要购买的物品:\r\n\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + "# #z" + itemlist[i] + "##l\r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的 #r#z" + itemlist[selects][0] + "##k 数量\r\n\r\n#r - 1个需要" + itemlist[selects][1] + "点卷", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
        } else if (a == 3) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的点卷。");
                cm.dispose();
            }
        }
    }//mode
}//f