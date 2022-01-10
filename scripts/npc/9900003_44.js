var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
//Array(5190011, 1),//宠物自动喂食
Array(2049135, 1500),//惊人正义混沌卷轴 20%
Array(2340000, 1500),
Array(5064000, 3000),
Array(2049323, 3000),	//无损强化卷
Array(2048307, 30000),  //
Array(2046008, 50000), // - 周年庆单手武器攻击力卷轴50%
Array(2046009, 50000), // - 周年庆单手武器魔法力卷轴50%
Array(2046108, 50000), // - 周年庆双手武器攻击力卷轴50%
Array(2046109, 50000), // - 周年庆双手武器魔法力卷轴50%
Array(2046110, 100000),//周年庆双手武器攻击力卷轴100%
Array(2046111, 100000),//周年庆双手武器魔法力卷轴100%
Array(2046010, 100000),//周年庆单手武器攻击力卷轴100%
Array(2046011, 100000),//周年庆单手武器攻击力卷轴100%
//Array(2046074, 180000),//降龙单手武器攻击力99%
//Array(2046075, 180000),//降龙单手武器魔法力99%
//Array(2046149, 180000),//降龙双手武器攻击力99%
//Array(2049750, 3000),//S级潜能卷80%
Array(2070019, 100000),//高科技电光镖
Array(2330007, 50000),//高科技穿甲弹
Array(2070023, 50000), //火焰飞镖
Array(2046577, 100000), //  - 宿命正义防具力量卷轴 100%
Array(2046578, 100000), // - 宿命正义防具智力卷轴 100%
Array(2046579, 100000), // - 宿命正义防具敏捷卷轴 100% 
Array(2046580, 100000) // - 宿命正义防具运气卷轴 100%
//Array(2046763, 100000), // - 宿命正义饰品力量卷轴 100%
//Array(2046764, 100000), // - 宿命正义饰品智力卷轴 100%
//Array(2046765, 100000), // - 宿命正义饰品敏捷卷轴 100%
//Array(2046766, 100000)  // - 宿命正义饰品运气卷轴 100


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
			text = "#h0#,你好！在这里可以选择你想要购买的卷轴:\r\n\r\n#b";
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