/* 玩具商店 */

var status = -1;
var itemList = Array(
/*Array(5689000, 10000),// 高级生命水
Array(5000084, 500000),//独角兽安塞尔
Array(5000089, 500000),//独角兽迪埃尔
Array(5000090, 500000),//独角兽吉尼
Array(5000103, 2000000), //永恒的品克缤
Array(5000112, 2000000), //永恒的米儿
Array(5000113, 2000000),//永恒的蝙蝠怪
Array(5000203, 200000), //鹦鹉啾啾
Array(5000212, 650000), //火红小恶魔
Array(5000213, 650000), //幽青小恶魔
Array(5000214, 650000), // 雷黄小恶魔
Array(5000228, 1200000), //魔族魔翼之弓
Array(5000229, 1200000), //魔族默斯
Array(5000230, 1200000), //魔族迪亚
Array(5000239, 900000), //鱼缸里的鲨鱼
Array(5000243, 900000), //粉红龙
Array(5000244, 900000), //冰龙
Array(5000245, 900000), // 红色龙
Array(5000249, 900000), //米小熊
Array(5000250, 900000), // 粉小熊
Array(5000251, 900000), //蓝小熊
Array(5000256, 900000), //南瓜杰克
Array(5000257, 900000), //南瓜奥克
Array(5000258, 900000), //南瓜兰顿
Array(5000271, 900000), //绿色考拉
Array(5000272, 900000), //黄色考拉
Array(5000273, 900000), //粉色考拉
Array(5000275, 900000),//松鼠阿伦
Array(5000276, 900000), //松鼠珉特
Array(5000277, 900000), //松鼠粉粉
Array(5000281, 1500000), //New麦图斯
Array(5000282, 1500000), //New摩斯
Array(5000283, 1500000), //New迪亚
Array(5000320, 1600000), //铠鼠爱因
Array(5000321, 1600000), //铠鼠居里
Array(5000322, 1600000), //铠鼠牛顿
Array(5000342, 1250000), //小栗栗葱头
Array(5000343, 1250000), //小栗栗朱头
Array(5000344, 1250000), //小栗栗黑头
Array(5000137, 2000000), //永恒的小鲨鱼
Array(5000268, 300000), //甜心蝴蝶
Array(5000274, 4000000), //豆豆蛇
Array(5000290, 1400000),//天使提尔
Array(5000291, 1400000), //天使拉尔
Array(5000292, 1400000), //天使米尔
Array(5001006, 1400000), //美狐 - #c属性：玉狐
Array(5001007, 1400000),//美狐 - #c属性：天狐
Array(5001008, 1400000), //美狐 - #c属性：香狐（紫）
Array(5001009, 2500000), //绝世美狐 - #c属性：玉狐（绿
Array(5001010, 2500000), //绝世美狐 - #c属性：玉狐（青
Array(5001011, 2500000), //绝世美狐 - #c属性：香狐（紫
Array(5000191, 4000000), //神马*/
Array(1402014, 200000), 
Array(1302021, 60000), 
Array(1362063, 80000), 
Array(1302219, 80000), 
Array(1322156, 80000), 
Array(1302026, 50000), 
Array(1302150,90000), 
Array(1112100,100000), 
Array(1302104, 50000),
Array(1322102, 80000),
Array(1302160, 50000),
Array(1302161, 100000),
Array(1302162, 70000),
Array(1332030, 70000),
Array(1412056, 100000),
Array(1422036, 70000),
Array(1402110, 100000),
Array(1402049, 80000)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 5 + "#k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 5;
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 点卷？");
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
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "点卷商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多点卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 点卷。");
        }
        cm.dispose();
    }
}