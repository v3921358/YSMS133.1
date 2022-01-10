var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(2431965, 500),
Array(2431966, 500),
Array(2432153, 500),
Array(2431967, 500),
Array(2432131, 500),
Array(2432154, 500),
Array(2432207, 500),
Array(2432354, 500),
Array(2432355, 500),
Array(2432465, 500),
Array(2432479, 500),
Array(2432526, 500),
Array(2432532, 500),
Array(2432592, 500),
Array(2432640, 500),
Array(2432710, 500),
Array(2432836, 500),
Array(2432973, 500)

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
			text = "#b温馨提示：#r#z4033248##b只能通过打怪收集#k\r\n使用 #r#z4033248# #k可以在这里兑换#e#b伤害皮肤#n#k,\r\n请选择你想要兑换的皮肤\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b 金枫叶  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要兑换的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b金色枫叶#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想兑换" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + " 金色枫叶。");
        } else if (a == 3) {
            if (cm.haveItem(4033248,buynum * itemlist[selects][1])) {
                cm.gainItem(4033248, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("兑换成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的金枫叶。\r\n快去消灭怪物收集#r#z4033248##k吧");
                cm.dispose();
            }
        }
    }//mode
}//f