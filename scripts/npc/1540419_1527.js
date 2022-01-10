/* 点卷商城 - 手套 */

var status = -1;
var itemList = Array(
// -----价格为 5000 点卷 --------
Array(1082527, 5000),//高尔夫手套
Array(1082312, 5000),//彩虹护腕
Array(1082620, 5000),//鲜花手环
Array(1082588, 5000),//炫彩珍珠手环
Array(1082101, 5000), //圣诞手套
Array(1082631, 5000), //绿光手环
Array(1082155, 5000), //雪人之手
Array(1081002, 5000), //婚礼手套
Array(1081004, 5000), //墨玉咪咪手套
Array(1082157, 5000), //白骨手套
Array(1082124, 5000), //基督山手套
Array(1080003, 5000), //国庆护手-男款
Array(1080004, 5000), //国庆手套-男款
Array(1081009, 5000), //国庆手套-男款
Array(1081009, 5000), //国庆护手-女款
Array(1081010, 5000), //国庆手套-女款
Array(1082156, 5000), //熊仔手套
Array(1082169, 5000), //月兔手套
Array(1082172, 5000), //点点手套
Array(1082224, 5000), //熔岩掌套
Array(1082225, 5000), //冰凌掌套
Array(1082233, 5000), //牛牛猪手套
Array(1082247, 5000), //可爱小绵羊手套
Array(1082580, 5000), //邦尼手套
Array(1082267, 5000), //灰蒙蒙猫爪子
Array(1082407, 5000), //军团长的手套
Array(1082408, 5000), //精灵王的手套
Array(1082421, 5000), //海龙手套
Array(1082422, 5000), //炎龙手套
Array(1082423, 5000), //银河战队手套
Array(1081006, 5000), //伊丽莎白手套
Array(1082161, 5000), //星纹手套
Array(1082548, 5000), //星光手镯
Array(1082572, 5000), //牛郎星手套
Array(1082312, 5000), //彩虹护腕
Array(1082495, 5000), //猫咪洛丽塔手套
Array(1082502, 5000), //蓝缎带猫咪爪
Array(1082504, 5000), //猫咪手套
Array(1082519, 5000), //小恐龙云豆手套
Array(1082511, 5000), //小恐龙绿豆手套
Array(1082520, 5000), //粉粉绵羊手套
Array(1082548, 5000), //星光手镯
Array(1082549, 5000), //咯咯嗒手套
Array(1082551, 5000), //巧可羊手套
Array(1082552, 5000), //云朵羊手套
Array(1082553, 5000), //红色十字架手套
Array(1082555, 5000), //精灵闪电手套
Array(1082618, 5000), //嘟嘟熊爪
Array(1082517, 5000) //高尔夫球手套
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  / 2 + " #k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 2;
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + " #k 点卷？");
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