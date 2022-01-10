var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1353203, 500),//超能力100级副手
Array(1552115, 500),
Array(1352808, 500),
Array(1092049, 500), 
Array(1352503, 500),
Array(1352203, 500), 
Array(1352213, 500), 
Array(1352223, 500), 
Array(1352233, 500), 
Array(1352243, 500), 
Array(1352253, 500), 
Array(1352263, 500), 
Array(1352273, 500), 
Array(1352283, 500), 
Array(1352293, 500), 
Array(1352903, 500), 
Array(1352913, 500), 
Array(1352923, 500), 
Array(1352953, 500), 
Array(1352963, 500), 
Array(1353004, 500), 
Array(1352973, 500), 
Array(1352943, 500), 
Array(1352933, 500), 
Array(1352703, 500)
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
			text = "#b温馨提示：#r#z4000487##b只能通过副本报仇雪恨获得#k\r\n#h0#,您可以在这里兑换#e#b职业副手#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b暗影币  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b暗影币#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "暗影币。");
        } else if (a == 3) {
            if (cm.haveItem(4000487,buynum * itemlist[selects][1])) {
                cm.gainItem(4000487, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的暗影币。快去报仇雪恨赚取暗影币吧");
                cm.dispose();
            }
        }
    }//mode
}//f