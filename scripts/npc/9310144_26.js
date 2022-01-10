/* 商城 */
var aaa = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";

var status = -1;
var itemList = Array(
Array(5062002, 50), // - 高级神奇魔方
Array(5062500, 100), // - 大师高级神奇魔方
Array(5062010, 100), // - 终级神奇魔方
Array(2340000, 200), // - 祝福卷轴
Array(5064000, 300), // - 防暴卷轴
Array(2049116, 500), // - 强化混沌卷轴
Array(4034151, 500), // - 粉笔
Array(4001006, 800), // - 火焰羽毛
Array(2433654, 800), // - 星星500个交换券
Array(1012070, 1000), // - 草莓雪糕
Array(1012388, 1000), // - 小丑
Array(1142178, 5000), // - 冒险岛形象大使勋章
Array(1142189, 5000), // - 王座收藏家勋章
Array(1102786, 5000), // - 从巨人处逃走
Array(1112915, 8000), // - 蓝调戒指
Array(3015132, 10000) // - 大粽子沙发椅
//Array(2431938, 80000) // 外星碎片项链 150级外星碎片套 结束
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
        var selStr = ""+aaa+"\r\n\r\n#b亲爱的#r#h ##k#b，您当前苹果为： #r"+cm.getPlayerPoints()+"  \r\n#b苹果在线30秒可以获得1点,请选择您想要兑换的道具：\r\n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":#   #b购买需要  #r" + itemList[i][1] + " #k#b苹果#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + " #k 苹果。");
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
        if (cm.getPlayerPoints() >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "苹果商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainPlayerPoints(- selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多苹果。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 苹果。");
        }
        cm.dispose();
    }
}