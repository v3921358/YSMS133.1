/* 宠物商城 - 技能和装备 */

var status = -1;
var itemList = Array(
// ----道具ID -价格点卷 --------
Array(5380000, 10000),//进化之石
Array(5190011, 3000),//宠物自动喂食
Array(5190010, 3000),//宠物自动加BUFF技能
Array(5190001, 2000),//自动服用HP药水技能
Array(5190006, 3000),//自动服用MP药水技能
Array(5180000, 2000),//生命水
Array(1802510, 10000),//斯乌的光芒之翼
Array(1802378, 10000),//鲨鱼的游泳圈
Array(1802467, 10000),//贝勒德的宝石
Array(1802436, 10000),//姜饼人领结
Array(1802422, 10000),//半半的拐杖
Array(1802446, 10000),//皮埃尔的雨伞
Array(1802520, 10000),//绿抹茶君的薄荷叶
Array(1802521, 10000),//红茶妹的茶勺
Array(1802522, 10000),//咖啡弟的鲜奶油
Array(1802428, 10000),//薄荷鲁提婴儿头巾
Array(1802429, 10000),//葡萄鲁提婴儿头巾
Array(1802427, 10000),//蜜桃鲁提婴儿头巾
Array(1802424, 10000),//提尔的天使光环
Array(1802425, 10000),//拉尔的天使光环
Array(1802426, 10000),//米尔的天使光环
Array(1802461, 10000),//希拉的小恶魔
Array(1802459, 10000),//班雷昂的白蔷薇
Array(1802511, 10000),//奥尔卡吊瓶
Array(1802464, 10000),//葱头的叶子
Array(1802465, 10000),//朱头的叶子
Array(1802466, 10000)//黑头的叶子



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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + " #k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "宠物技能装备商店", 3, true);
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