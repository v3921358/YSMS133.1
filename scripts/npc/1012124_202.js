/* 苹果兑换商店 */

var status = -1;
var itemList = Array(
Array(5062002, 50), //高级神奇魔方
Array(5062500, 100), //大师附加神奇魔方
Array(5062009, 100), //超级神奇魔方
Array(2340000, 200), //祝福卷轴
Array(5064000, 300), //防爆卷轴
Array(2022959, 400), //情人节爱情巧克力 Lv.1
Array(2049116, 500), //强化混沌卷轴
Array(2022154, 500), //火红玫瑰
Array(2022960, 500), //情人节爱情巧克力 Lv.2
Array(2022961, 600), // 情人节爱情巧克力 Lv.3
Array(1012416, 1000), //草莓雪糕
Array(1012388, 1000), //小丑
Array(2022956, 1200), //火红玫瑰
Array(1142178, 5000), //冒险岛形象大使勋章
Array(1102786, 5000), //从巨人处逃走
Array(2049750, 5000), //S级潜能卷轴 80%
Array(1112915, 8000), //蓝调戒指
Array(1142567, 8000), //大凶
Array(3015132, 10000), //大粽子沙发椅
Array(3015089, 10000), //训练师庭院椅子
Array(2432695, 10000), //金灿灿伤害皮肤
Array(2432973, 10000)  //灰白伤害皮肤
);
var selectedItem = -1;
var selectedCost = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#e#b亲爱的#r#h ##k#b您好 \t#k#b当前可用苹果 #r" + cm.getPlayerPoints() + " #k#b个 \r\n\r\n请选择您希望购买的道具：#k#e#n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k #b需要 #r" + itemList[i][1] + " #k#b苹果#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 苹果");
        } else {
            cm.sendOk("出现错误...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("购买道具出现错误...");
            cm.dispose();
            return;
        }
        if (cm.getMeso() >= 1 && cm.getPlayerPoints() >= selectedCost) {
            if (cm.gachaponItem != -1) {
		cm.gainItem(selectedItem,1);
                //cm.gainMeso(0);
		cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多苹果。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k \r\n需要 #r" + selectedCost + "#k 苹果 。");
        }
        cm.dispose();
    }
}