var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1212115, 500),//埃苏莱布斯双头杖
Array(1222109, 500),//埃苏莱布斯灵魂手铳
Array(1232109, 500),//埃苏莱布斯亡命剑
Array(1402251, 500),//埃苏莱布斯宽大刀
Array(1242116, 500),//埃苏莱布斯能量剑
Array(1302333, 500),//埃苏莱布斯军刀
Array(1312199, 500),//埃苏莱布斯战斧
Array(1322250, 500),//埃苏莱布斯战锤
Array(1332274, 500),//埃苏莱布斯屠龙斩
Array(1342101, 500),//埃苏莱布斯之刃
Array(1362135, 500),//埃苏莱布斯折叠手杖
Array(1372222, 500),//埃苏莱布斯短杖
Array(1382259, 500),//埃苏莱布斯长杖
Array(1412177, 500),//埃苏莱布斯大斧
Array(1432214, 500),//埃苏莱布斯穿透矛
Array(1422184, 500),//埃苏莱布斯大锤
Array(1442268, 500),//埃苏莱布斯巨灵开山斧
Array(1452252, 500),//埃苏莱布斯弓
Array(1462239, 500),//埃苏莱布斯弩
Array(1472261, 500),//埃苏莱布斯复仇斗拳
Array(1482216, 500),//埃苏莱布斯拳甲
Array(1492231, 500),//埃苏莱布斯枪
Array(1522138, 500),//埃苏莱布斯双弩枪
Array(1532144, 500),//埃苏莱布斯大炮
Array(1552110, 500),//埃苏莱布斯扇子
Array(1252093, 500),//埃苏莱布斯魔法棒
Array(1542108, 500),//埃苏莱布斯武士刀

Array(1004422, 500),//埃苏莱布斯骑士头盔
Array(1004423, 500),//
Array(1004424, 500),//
Array(1004425, 500),//
Array(1004426, 500),//

Array(1052882, 500),//埃苏莱布斯骑士套装
Array(1052887, 500),//
Array(1052888, 500),//
Array(1052889, 500),//
Array(1052890, 500),//

Array(1082636, 500),//埃苏莱布斯骑士手套
Array(1082637, 500),//
Array(1082638, 500),//
Array(1082639, 500),//
Array(1082640, 500),//

Array(1073030, 500),//埃苏莱布斯骑士鞋
Array(1073032, 500),//
Array(1073033, 500),//
Array(1073034, 500),//
Array(1073035, 500),//

Array(1102775, 500),//埃苏莱布斯骑士披风
Array(1102794, 500),//
Array(1102795, 500),//
Array(1102796, 500),//
Array(1102797, 500),//

Array(1152174, 500),//埃苏莱布斯骑士护肩
Array(1152176, 500),//
Array(1152177, 500),//
Array(1152178, 500),//
Array(1152179, 500)//


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
			text = "#b温馨提示：#r#z4310156##b可以通过斯乌获得#k\r\n#h0#,您可以在这里兑换#e#埃苏莱布斯装备#n#k,请选择你想要购买的物品\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b埃苏莱布斯币  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b埃苏莱布斯币#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "埃苏莱布斯币。");
        } else if (a == 3) {
            if (cm.haveItem(4310156,buynum * itemlist[selects][1])) {
                cm.gainItem(4310156, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的埃苏莱布斯币。快去报仇雪恨赚取埃苏莱布斯币吧");
                cm.dispose();
            }
        }
    }//mode
}//f