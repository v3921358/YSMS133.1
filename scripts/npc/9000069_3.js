var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(2049323, 12),
//Array(2049124, 3),
//Array(2049116, 3),
//Array(2049137, 15),
//Array(2049136, 12),
Array(2049135, 5),
Array(2049116, 2),
Array(2049124, 2),
Array(2049750, 30),
Array(2040874,50),// - 暴风手套攻击卷轴 - 为手套增加物理攻击力属性。\n成功率：100%，物理攻击力+4
Array(2040875,50),//  - 暴风手套魔力卷轴 - 为手套增加魔法攻击力属性。\n成功率：100%，魔法攻击力+4
Array(2613000,50),//  - 星火单手武器攻击力卷轴 - 为单手武器附加提升攻击力的属性。
Array(2613001,50),//  - 星火单手武器魔法力卷轴 - 为单手武器附加提升魔力的属性。
Array(2612010,50),//  - 星火双手武器攻击力卷轴 - 为双手武器附加提升攻击力的属性。
//Array(2047818, 80), // - 惊人的双手武器攻击力卷轴100% - 在双手武器上附加提升攻击力的属性。
//Array(2046996, 80), // - 惊人的单手武器攻击力卷轴100% - 对单手武器增加攻击力提高属性。
//Array(2046997, 80) // - 惊人的单手武器魔力卷轴100% - 对单手武器增加魔力提高属性。
Array(2046913,30), // 宿命正义单手武器攻击力卷轴 100% // 为单手武器增加攻击力属性。
Array(2046914,30), // 宿命正义单手武器魔力卷轴 100% // 为单手武器增加魔法攻击力属性。
Array(2046173,30), // 宿命正义双手武器攻击力卷轴 100% // 为双手武器增加攻击力属性。
Array(2046577,20), // 宿命正义防具力量卷轴 100% // 为防具增加力量属性。
Array(2046578,20), // 宿命正义防具智力卷轴 100% // 为防具增加智力属性。
Array(2046579,20), // 宿命正义防具敏捷卷轴 100% // 为防具增加敏捷属性。
Array(2046580,20), // 宿命正义防具运气卷轴 100% // 为防具增加运气属性。
Array(2046763,30), // 宿命正义饰品力量卷轴 100% // 为饰品增加力量属性。
Array(2046764,30), // 宿命正义饰品智力卷轴 100% // 为饰品增加智力属性。
Array(2046765,30), // 宿命正义饰品敏捷卷轴 100% // 为饰品增加敏捷属性。
Array(2046766,30)// 宿命正义饰品运气卷轴 100% // 为饰品增加运气属性。
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
			text = "#h0#,您可以在这里兑换#e#b极品卷轴#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b元宝  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b元宝#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "元宝。");
        } else if (a == 3) {
            if (cm.haveItem(4001485,buynum * itemlist[selects][1])) {
                cm.gainItem(4001485, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的元宝。");
                cm.dispose();
            }
        }
    }//mode
}//f