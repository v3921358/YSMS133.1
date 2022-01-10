var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
//140武器
Array(1232014, 5000),//狮心痛苦命运
Array(1302152, 5000),//狮心弯刀
Array(1312065, 5000),//狮心勇士斧
Array(1322096, 5000),//狮心震雷钉
Array(1402095, 5000),//狮心战斗弯刀
Array(1412065, 5000),//狮心战斗斧
Array(1422066, 5000),//狮心巨锤
Array(1432086, 5000),//狮心长枪
Array(1442116, 5000),//狮心矛
Array(1542015, 5000),//狮心 狮子王丸

Array(1382104, 5000),//龙尾战斗长杖
Array(1372084, 5000),//龙尾精灵短杖
Array(1212014, 5000),//龙尾黑甲凶灵
Array(1252014, 5000),//猫尾智慧魔法棒
Array(1452017, 5000),//魔翼之弓
Array(1522018, 5000),//龙翼巨弩枪  双弩
Array(1362019, 5000),//渡鸦之魂真红手杖
Array(1332130, 5000),//渡鸦之魂短刀
Array(1242042, 5000),//渡鸦之魂女王意志之剑
Array(1472122, 5000),//渡鸦之魂钢铁拳套

Array(1222014, 5000),//鲨齿灵魂汲取者
Array(1242014, 5000),//鲨齿女王意志之剑
Array(1482084, 5000),//鲨齿巨鹰爪
Array(1492085, 5000),//鲨齿锐利手铳
Array(1532018, 5000), //鲨齿火焰炮

//140防具
Array(1003172, 4000),//狮心战斗头盔
Array(1003173, 4000),//狮心战斗头盔
Array(1003174, 4000),//狮心战斗头盔
Array(1003175, 4000),//狮心战斗头盔
Array(1003176, 4000),//狮心战斗头盔

Array(1052314, 4000),//狮心战斗锁子甲
Array(1052315, 4000),//
Array(1052316, 4000),//
Array(1052317, 4000),//
Array(1052318, 4000),//

Array(1082295, 4000),//狮心战斗护腕
Array(1082296, 4000),//
Array(1082297, 4000),//
Array(1082298, 4000),//
Array(1082299, 4000),//

Array(1072485, 4000),//狮心战斗鞋
Array(1072486, 4000),//
Array(1072487, 4000),//
Array(1072488, 4000),//
Array(1072489, 4000),//

Array(1102275, 4000),//狮心战斗披风
Array(1102276, 4000),//
Array(1102277, 4000),//
Array(1102278, 4000),//
Array(1102279, 4000),//

Array(1152108, 4000),//狮心战斗护肩
Array(1152110, 4000),//
Array(1152111, 4000),//
Array(1152112, 4000),//
Array(1152113, 4000)//



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
			text = "#b温馨提示：#r#z4310036##b可以通过阿里安特副本获得#k\r\n#h0#,您可以在这里兑换#e#b征服商城#n#k,请选择你想要购买的物品\r\n#b";
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