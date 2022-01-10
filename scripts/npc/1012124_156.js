/* 点卷商城 - 椅子 */

var status = -1;
var itemList = Array(
// -----价格为 5000 点卷 --------
//130
Array(3015171, 50000),//薄荷喵下午茶椅子
Array(3010461, 50000),//赏月专用月桂树秋千椅
Array(3015032, 50000),//寒冰萌动火车椅
Array(3012030, 100000),//和你在一起椅子
Array(3015262, 100000),//满月清辉椅子
Array(3015034, 100000),//和羊咩咩一起椅子
Array(3015274, 100000),//国庆节喷泉椅子
Array(3010708, 100000),//满目韩文椅子
Array(3010717, 100000),//Marry me
Array(3015031, 100000),//闪耀冒险岛椅
Array(3010748, 100000),//日式拉面椅
Array(3015076, 100000),//雏祭娃娃4
Array(3015058, 100000),//五彩缤纷花车巡游椅
Array(3010690, 100000),//滑浪飞船椅子
Array(3015182, 100000),//蝶恋花椅子
Array(3010621, 100000),//蛤蛤仙人椅
Array(3015078, 200000),//雏祭娃娃6
Array(3015060, 200000),//五彩糖罐椅子
Array(3010760, 200000),//古代浴池椅子
Array(3010788, 500000),//巨无霸年夜饭


Array(3010029, 5000), //蓝环凳
Array(3010030, 5000), //黑环凳
Array(3010031, 5000), //红环凳
Array(3010032, 5000), //黄环凳
Array(3010033, 5000), //绿环凳
// -----价格为 5000 点卷 --------
Array(3010007, 5000), //粉色海豹靠垫
Array(3010008, 5000), //蓝色海豹靠垫
Array(3010010, 5000), //白色海豹靠垫
Array(3010016, 5000), //黑色海豹靠垫
Array(3010017, 5000), //金色海豹靠垫
Array(3010024, 5000), //玩具粉熊椅
Array(3010025, 5000), //枫叶纪念凳

// -----价格为 10000 点卷 --------
Array(3010009, 10000), //塌塌凳
Array(3010028, 10000), //海盗的俘虏
Array(3010036, 10000), //浪漫秋千
Array(3010098, 10000), //电视宅人
Array(3010099, 10000), //北极熊椅子
Array(3010100, 10000), //财神椅子
Array(3010110, 10000), //舒适大白熊椅子
Array(3010111, 10000), //虎虎生威
Array(3010116, 10000), //摇滚之魂椅子
Array(3010117, 10000), //魔法书椅子
Array(3010118, 10000), //糖果音符椅子
Array(3010119, 10000), //羊羊椅子
Array(3010120, 10000), //彩蛋篮子
Array(3010123, 10000), //夏日花朵
Array(3010161, 10000), //鼠鼠椅
Array(3010226, 10000), //月光仙子椅子
Array(3010085, 10000), //鬼娃娃椅子
Array(3013000, 10000), //樱花树下
Array(3010177, 10000), //手柄座椅
Array(3010454, 10000), //云朵
Array(3010689, 10000), //10周年椅子

// -----价格为 200000 点卷 --------
Array(3010591, 50000), //漫画书椅子
Array(3010754, 100000), //百鬼夜行
Array(3012020, 200000), //紫藤花吊篮椅
Array(3010779, 100000), //金马祥云轿
Array(3010829, 100000), //木星椅子
Array(3010820, 100000), //迷你玩具别墅椅子
Array(3010511, 100000), //猫咪公园椅子
Array(3010516, 100000), //噜噜啦啦印第安小孩
Array(3010459, 100000), //天使舞台椅
Array(3010196, 100000), //泡泡浴缸椅
Array(3010528, 100000), //跑步机椅子
Array(3010751, 100000), //鲸鱼椅子
Array(3010752, 100000), //玫瑰鸟笼
Array(3010783, 100000), //蓝色邦尼屋
Array(3010876, 100000), //冒险岛行星椅子
Array(3010448, 100000), //泡泡浴椅子
Array(3010714, 200000), //堆王冠
Array(3010835, 200000), //爱情水晶球记忆椅
Array(3010779, 200000), //金马祥云轿
Array(3010842, 200000), //猫猫郊游房车
Array(3010718, 200000), //初恋云朵朵沙发
Array(3010594, 200000), //蓝莓蛋糕椅
Array(3012020, 200000), //紫藤花吊篮椅
Array(3010843, 200000), //兔兔郊游房车
Array(3010879, 200000), //猫咪椅子
Array(3010877, 200000), //人鱼珊瑚礁
Array(3012026, 200000), //旋转花杯情侣椅子
Array(3012024, 200000), //沙滩排球椅子
Array(3014004, 200000), //案件聚焦椅子
Array(3010832, 600000) //太阳椅子
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