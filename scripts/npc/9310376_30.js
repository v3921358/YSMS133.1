/* 点卷商店 */

var status = -1;
var itemList = Array(
/*Array(1003797, 100), //高贵战士头盔
Array(1003798, 100), //高贵流丹维奇帽
Array(1003799, 100), //高贵游侠贝雷帽
Array(1003800, 100), //高贵刺客软帽
Array(1003801, 100), //高贵流浪者帽
Array(1042254, 100), //鹰眼战士盔甲
Array(1042255, 100), //鹰眼丹维奇长袍
Array(1042256, 100), //鹰眼游侠斗篷
Array(1042257, 100), //鹰眼刺客衬衣
Array(1042258, 100), //鹰眼流浪者外衣
Array(1062165, 100), //魔术师战士短裤
Array(1062166, 100), //魔术师丹维奇短裤
Array(1062167, 100), //魔术师游侠短裤
Array(1062168, 100), //魔术师刺客短裤
Array(1062169, 100), //魔术师流浪者短裤*/

Array(1212063, 199), //法弗纳魔力源泉杖
Array(1222058, 199), //法弗纳天使手铳
Array(1232057, 199), //法弗纳死亡使者
Array(1242060, 199), //法弗纳精神之刃
Array(1302275, 199), //法弗纳银槲之剑
Array(1312153, 199), //法弗纳双刃切肉斧
Array(1322203, 199), //法弗纳戈耳迪锤
Array(1332225, 199), //法弗纳大马士革剑
Array(1342082, 199), //法弗纳急速之刃
Array(1362090, 199), //法弗纳洞察手杖
Array(1372177, 199), //法弗纳魔力夺取者
Array(1382208, 199), //法弗纳魔冠之杖
Array(1402196, 199), //法弗纳忏悔之剑
Array(1412135, 199), //法弗纳战斗切肉斧
Array(1422140, 199), //法弗纳闪电锤
Array(1432167, 199), //法弗纳贯雷枪
Array(1442223, 199), //法弗纳半月宽刃斧
Array(1452205, 199), //法弗纳追风者
Array(1462193, 199), //法弗纳风翼弩
Array(1472214, 199), //法弗纳危险之手
Array(1482168, 199), //法弗纳巨狼之爪
Array(1492179, 199), //法弗纳左轮枪
Array(1522094, 199), //法弗纳双风翼弩
Array(1532098, 199), //法弗纳荣耀炮
Array(1252015, 199) //法弗纳北极星魔法棒

/*Array(1113072, 30), //低级贝勒德戒指
Array(1113073, 60), //中级贝勒德戒指
Array(1113074, 100), //高级贝勒德戒指
Array(1113075, 150), //最高级贝勒德戒指
Array(1132243, 30), //低级贝勒德刻印腰带
Array(1132244, 60), //中级贝勒德刻印腰带
Array(1132245, 100), //高级贝勒德刻印腰带
Array(1132246, 150), //最高级贝勒德刻印腰带
Array(1122264, 30), //低级贝勒德刻印吊坠
Array(1122265, 60), //中级贝勒德刻印吊坠
Array(1122266, 100), //高级贝勒德刻印吊坠
Array(1122267, 150), //最高级贝勒德刻印吊坠
Array(1032220, 30), //低级贝勒德耳环
Array(1032221, 60), //中级贝勒德耳环
Array(1032222, 100), //高级贝勒德耳环
Array(1032223, 150), //最高级贝勒德耳环
Array(1132174, 400), //暴君西亚戴斯腰带
Array(1102481, 400), //暴君西亚戴斯披风
Array(1082543, 400), //暴君西亚戴斯手套
Array(1072743, 400), //暴君西亚戴斯靴
Array(1132175, 400), //暴君赫尔梅斯腰带
Array(1102482, 400), //暴君赫尔梅斯披风
Array(1072744, 400), //暴君赫尔梅斯手套
Array(1082543, 400), //暴君赫尔梅斯靴
Array(1102483, 400), //暴君凯伦披风
Array(1082545, 400), //暴君凯伦手套
Array(1072745, 400), //暴君凯伦靴
Array(1132176, 400), //暴君凯伦腰带
Array(1102484, 400), //暴君利卡昂披风
Array(1082546, 400), //暴君利卡昂手套
Array(1072746, 400), //暴君利卡昂靴
Array(1132177, 400), //暴君利卡昂腰带
Array(1102485, 400), //暴君阿尔泰披风
Array(1082547, 400), //暴君阿尔泰手套
Array(1072747, 400), //暴君阿尔泰靴
Array(1132178, 400) //暴君阿尔泰腰带*/
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好\r\n1月1日至1月3日，法弗纳武器99元1件\r\n1月4日开始恢复原价200元每件\r\n请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b现金点#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b现金点\r\n和需要 #r" + selectedCost*1000 + "#k #b点卷?");
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
        if (cm.getHyPay(1) >= selectedCost && cm.getPlayer().getCSPoints(1) >= selectedCost * 1000) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "高级装备商店", 3, true);
            if (gachaponItem != -1) {
                cm.addHyPay(selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b现金点\r\n#b和需要#r" + selectedCost*1000 + "#k #b点卷");
        }
        cm.dispose();
    }
}