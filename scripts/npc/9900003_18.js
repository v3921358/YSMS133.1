/* 商城 */

var status = -1;
var itemList = Array(
Array(1542015, 100000), // 剑豪武器
Array(1212014, 100000), // 龙尾黑甲凶灵140级武器
Array(1222014, 100000), // 鲨齿灵魂汲取者
Array(1232014, 100000), // 狮心痛苦命运
Array(1242014, 100000), // 鲨齿女王意志之剑
Array(1302152, 100000), // 狮心弯刀
Array(1312065, 100000), // 狮心勇士斧
Array(1322096, 100000), // 狮心震雷钉
Array(1332130, 100000), // 渡鸦之魂短刀
Array(1342036, 100000), // 精灵角暗影刀
Array(1362019, 100000), // 渡鸦之魂真红手杖
Array(1372084, 100000), // 龙尾精灵短杖
Array(1382104, 100000), // 龙尾战斗长杖
Array(1402095, 100000), // 狮心战斗弯刀
Array(1412065, 100000), // 狮心战斗斧
Array(1422066, 100000), // 狮心巨锤
Array(1432086, 100000), // 狮心长枪
Array(1442116, 100000), // 狮心矛
Array(1462099, 100000), // 鹰翼重弩
Array(1472122, 100000), // 渡鸦之魂钢铁拳套
Array(1452111, 100000), // 鹰翼组合弓
Array(1482084, 100000), // 鲨齿巨鹰爪
Array(1492085, 100000), // 鲨齿锐利手铳
Array(1522018, 100000), // 龙翼巨弩枪
Array(1532018, 100000), // 鲨齿火焰炮
Array(1252014, 100000), // 猫尾智慧魔法棒 140级武器结束
Array(1003172, 100000), // 狮心战斗头盔140级防具
Array(1003173, 100000), // 龙尾法师帽子
Array(1003174, 100000), // 鹰翼哨兵便帽
Array(1003175, 100000), // 渡鸦之魂追踪者帽
Array(1003176, 100000), // 鲨齿船长帽
Array(1052314, 100000), // 狮心战斗锁子甲
Array(1052315, 100000), // 龙尾法师长袍
Array(1052316, 100000), // 鹰翼哨兵服
Array(1052317, 100000), // 渡鸦之魂追踪者盔甲
Array(1052318, 100000), // 鲨齿船长外套
Array(1072485, 100000), // 狮心战斗鞋
Array(1072486, 100000), // 龙尾法师鞋
Array(1072487, 100000), // 鹰翼哨兵鞋
Array(1072488, 100000), // 渡鸦之魂追踪者鞋
Array(1072489, 100000), // 鲨齿船长鞋
Array(1082295, 100000), // 狮心战斗护腕
Array(1082296, 100000), // 龙尾法师手套
Array(1082297, 100000), // 鹰翼哨兵手套
Array(1082298, 100000), // 渡鸦之魂追踪者手套
Array(1082299, 100000), // 鲨齿船长手套
Array(1102275, 100000), // 狮心战斗披风
Array(1102276, 100000), // 龙尾法师披风
Array(1102277, 100000), // 鹰翼哨兵披风
Array(1102278, 100000), // 渡鸦之魂猎人披风
Array(1102279, 100000), // 鲨齿船长披风
Array(1152110, 100000), // 龙尾法师护肩
Array(1152111, 100000), // 鹰翼哨兵护肩
Array(1152112, 100000), // 渡鸦之魂猎人护肩
Array(1152113, 100000), // 鲨齿船长护肩
Array(1152108, 100000), // 狮心战斗护肩140级防具结束
Array(1542072, 1000000), // 剑豪漩涡
Array(1212089, 1000000), //  漩涡双头杖        等级: 160武器
Array(1222084, 1000000), // 漩涡灵魂手铳
Array(1232084, 1000000), // 漩涡恶魔剑
Array(1242090, 1000000), // 漩涡锁链剑
Array(1302297, 1000000), // 漩涡剑
Array(1312173, 1000000), // 漩涡斧
Array(1322223, 1000000), // 漩涡锤
Array(1332247, 1000000), // 漩涡匕首
Array(1342090, 1000000), // 漩涡刀
Array(1362109, 1000000), // 漩涡手杖
Array(1372195, 1000000), // 漩涡短杖
Array(1382231, 1000000), // 漩涡长杖
Array(1402220, 1000000), // 漩涡双手剑 
Array(1412152, 1000000), // 漩涡双手战斧
Array(1422158, 1000000), // 漩涡巨锤
Array(1432187, 1000000), // 漩涡矛
Array(1442242, 1000000), // 漩涡戟
Array(1452226, 1000000), // 漩涡弓
Array(1462213, 1000000), // 漩涡弩
Array(1472235, 1000000), // 漩涡拳甲
Array(1482189, 1000000), // 漩涡冲拳
Array(1492199, 1000000), // 漩涡手铳
Array(1522113, 1000000), // 漩涡双翼短杖
Array(1532118, 1000000), // 漩涡手炮
Array(1252033, 1000000), // 魔法棒  150级武器 结束
Array(1012438, 1000000), // 漩涡文身            等级: 160级防具
Array(1022211, 1000000), // 漩涡眼镜
Array(1032224, 1000000), // 漩涡耳环 
Array(1122269, 1000000), // 漩涡吊坠
Array(1132247, 1000000), // 漩涡腰带
Array(1152160, 1000000), // 漩涡护肩
Array(1102623, 1000000), // 漩涡披风 
Array(1072870, 1000000), // 漩涡鞋
Array(1082556, 1000000), // 漩涡手套
Array(1003976, 1000000), // 漩涡帽子
Array(1052669, 1000000) // 漩涡皇家外套
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":#   购买需要  #r" + itemList[i][1] + " #k抵用卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + " #k 抵用卷？");
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
        if (cm.getPlayer().getCSPoints(2) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "抵用卷商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX(2, - selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多抵用卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 抵用卷。");
        }
        cm.dispose();
    }
}