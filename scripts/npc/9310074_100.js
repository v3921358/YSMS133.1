/* 现金椅子商店 */

var status = -1;
var itemList = Array(
Array(3015303, 200000), //幸福的花鞋椅子
Array(3015183, 200000), //绿水灵背景椅子
Array(3015331, 200000), //流浪喵公寓
Array(3015247, 200000), //战斗吧!传说之回归椅子
Array(3015257, 300000), //月下庭院椅子
Array(3015059, 300000), //浪漫甜心巧克力椅子
Array(3012028, 300000), //萌宠下午茶杯椅子
Array(3015096, 300000), //羊羊幻想牧场椅子
Array(3015296, 300000),//淑女青鸟花园
Array(3015295, 300000),//绅士青鸟花园
Array(3015225, 500000), //和大象一起自拍椅子
Array(3015227, 500000), //与莫拉野餐椅子
Array(3015312, 500000), //农夫的乐园椅子
Array(3016000, 500000), //大象跷跷板椅子
Array(3015181, 500000), //仲夏夜之梦椅子
Array(3015343, 500000), //冰雪企鹅王椅子
Array(3015224, 500000), //梦幻水晶球椅子
Array(3015419, 500000),//外滩爆竹椅子
Array(3015406, 500000),//大家的圣诞节
Array(3015328, 800000), //冒险岛电动缆车椅子
Array(3015193, 800000), //被驯服的鲸鱼椅子
Array(3015349, 800000), //青蛙摇摇机椅子
Array(3015259, 800000),//兔儿爷爷的腿座
Array(3015260, 800000),//兔儿奶奶的腿座
Array(3016101, 1000000), //怪物水晶球秋千椅
Array(3015338, 1000000), //秘密花园椅子
Array(3015304, 1200000) //哗啦啦大水车



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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好\r\n请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b 星币#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b星币 ?");
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
        //if (cm.getRMB() >= selectedCost && cm.getPlayer().getCSPoints(1) >= selectedCost * 1000) {
	if (cm.getRMB() >= selectedCost && cm.getPlayer().getCSPoints(1) >= 1000) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "星币商城", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            //cm.sendOk("#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b星币\r\n#b和需要#r" + selectedCost*1000 + "#k #b点卷");
            //cm.sendOk("#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要 #r" + selectedCost + "#k #b星币或者您背包内没有1000点卷\r\n");
             cm.sendOk("#b抱歉,您没有那么多  星币,您无法购买.\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服.谢谢您的合作.\r\n\r\n#b购买#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b需要  #r" + selectedCost + "#k #b  星币。");

       }
        cm.dispose();
    }
}