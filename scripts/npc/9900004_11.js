/* 全职业副手商店 */

var status = -1;
var itemList = Array(
Array(1552115, 50000),
Array(1352808, 50000),
Array(1092049, 150000), 
Array(1352503, 50000),
Array(1352203, 50000), 
Array(1352213, 50000), 
Array(1352223, 50000), 
Array(1352233, 50000), 
Array(1352243, 50000), 
Array(1352253, 50000), 
Array(1352263, 50000), 
Array(1352273, 50000), 
Array(1352283, 50000), 
Array(1352293, 50000), 
Array(1352903, 50000), 
Array(1352913, 50000), 
Array(1352923, 50000), 
Array(1352953, 50000), 
Array(1352963, 50000), 
Array(1353004, 50000), 
Array(1352973, 50000), 
Array(1352943, 50000), 
Array(1352933, 50000), 
Array(1352703, 50000),

Array(1099011, 100000),//银河之咒盾
Array(1099012, 100000),//银河之盾
Array(1342095, 100000),//银河之刃
Array(1352009, 100000),//银河之箭矢
Array(1352109, 100000),//银河之卡片
Array(1352206, 100000),//银河之吊坠
Array(1352216, 100000),//银河之念珠
Array(1352226, 100000),//银河之锁链
Array(1352236, 100000),//银河之赤铜之书
Array(1352246, 100000),//银河之青银之书
Array(1352256, 100000),//银河之白金之书
Array(1352266, 100000),//银河之风暴羽毛
Array(1352276, 100000),//银河之扳指
Array(1352286, 100000),//银河之剑鞘
Array(1352296, 100000),//银河之灵符
Array(1352406, 100000),//银河之魂珠
Array(1352506, 100000),//银河之精髓
Array(1352606, 100000),//银河之灵魂手镯
Array(1352707, 100000),//银河之麦林弹
Array(1352815, 100000),//银河之私语
Array(1352906, 100000),//银河之腕轮
Array(1352916, 100000),//银河之腕轮
Array(1352928, 100000),//银河之火药桶
Array(1352935, 100000),//银河之天龙锤
Array(1352945, 100000),//银河之龙神的遗产
Array(1352957, 100000),//银河之极限球
Array(1352967, 100000),//银河之狂野之矛
Array(1352975, 100000),//银河之圣地之光
Array(1353006, 100000),//银河之控制器
Array(1353105, 100000)//银河之狐狸珠


//
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
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
                cm.gainNX( - selectedCost );
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