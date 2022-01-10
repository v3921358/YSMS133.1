var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1082543, 1000),//暴君西亚戴斯手套
Array(1082544, 1000),//
Array(1082545, 1000),//
Array(1082546, 1000),//
Array(1082547, 1000),//

Array(1132174, 1000),//暴君西亚戴斯腰带
Array(1132175, 1000),//
Array(1132176, 1000),//
Array(1132177, 1000),//
Array(1132178, 1000),//

Array(1102481, 1000),//暴君西亚戴斯披风
Array(1102482, 1000),//
Array(1102483, 1000),//
Array(1102484, 1000),//
Array(1102485, 1000),//

Array(1072743, 1000),//暴君西亚戴斯靴
Array(1072744, 1000),//
Array(1072745, 1000),//
Array(1072746, 1000),//
Array(1072747, 1000)//


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
			text = "#b温馨提示：#r#z4310058##b只能通过麦格纳斯获得#k\r\n#h0#,您可以在这里兑换#r极真防具#k#n,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b麦格纳斯币  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b麦格纳斯币#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "麦格纳斯币。");
        } else if (a == 3) {
            if (cm.haveItem(4310058,buynum * itemlist[selects][1])) {
                cm.gainItem(4310058, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的麦格纳斯币。快去消灭暴君麦格纳斯赚取麦格纳斯币吧");
                cm.dispose();
            }
        }
    }//mode
}//f