var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
//必成卷
Array(2043003, 500),//单手剑攻击必成卷
Array(2043103, 500),//单手斧攻击必成卷
Array(2043203, 500),//单手钝器攻击必成卷
Array(2043303, 500),//短剑攻击必成卷
Array(2043703, 500),//短杖攻击必成卷
Array(2043803, 500),//长杖攻击必成卷
Array(2044003, 500),//双手剑攻击必成卷
Array(2044019, 500),//双手剑魔力必成卷
Array(2044103, 500),//双手斧攻击必成卷
Array(2044203, 500),//双手钝器攻击必成卷
Array(2044303, 500),//枪攻击必成卷
Array(2044403, 500),//矛攻击必成卷
Array(2044503, 500),//弓攻击必成卷
Array(2044603, 500),//弩攻击必成卷
Array(2044703, 500),//拳套攻击必成卷
Array(2044815, 500),//指节攻击必成卷
Array(2044908, 500),//短枪攻击必成卷

//特殊卷轴
Array(2431354, 80000),//自选星火幸运箱子
Array(2049135, 100),//惊人正义混沌卷轴 20%
Array(2049137, 500),//惊人正义混沌卷轴 40%
Array(2046763, 50000),//宿命正义饰品力量卷轴 100%
Array(2046764, 50000),//宿命正义饰品智力卷轴 100%
Array(2046765, 50000),//宿命正义饰品敏捷卷轴 100%
Array(2046766, 50000),//宿命正义饰品运气卷轴 100%
Array(2046577, 50000),//宿命正义防具力量卷轴 100%
Array(2046578, 50000),//宿命正义防具智力卷轴 100%
Array(2046579, 50000),//宿命正义防具敏捷卷轴 100%
Array(2046580, 50000)//宿命正义防具运气卷轴 100%

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
			text = "#b温馨提示：#r#z4310036##b可以通过副本阿里安特获得#k\r\n#h0#,您可以在这里兑换#e#b征服商城#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b征服者币  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b征服者币#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "征服者币。");
        } else if (a == 3) {
            if (cm.haveItem(4310036,buynum * itemlist[selects][1])) {
                cm.gainItem(4310036, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的征服者币。");
                cm.dispose();
            }
        }
    }//mode
}//f