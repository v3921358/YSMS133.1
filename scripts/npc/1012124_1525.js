/* 点卷商城 - 裙裤 */

var status = -1;
var itemList = Array(
// -----价格为 10000 点卷 --------
Array(1062204, 10000), //彩糖短裤
Array(1062203, 10000), //兔兔熊短裤
Array(1062210, 10000), //兰兰休闲短裤
Array(1062211, 10000), //奶牛短裤
Array(1062213, 10000), //针织绒绒裤
Array(1062207, 10000), //俏皮短裤
Array(1062093, 10000), //嫩绿休闲短裤
Array(1060180, 10000), //百褶南瓜短裤
Array(1061203, 10000), //百褶南瓜短裙
Array(1060001, 10000), //黑西裤-男
Array(1061161, 10000), //黑西裤-女
// -----价格为 8000 点卷 --------
Array(1062173, 8000), //明星短裤
Array(1062157, 8000), //草莓巧克力短裤
Array(1062163, 8000), //蛇年嘻哈裤
Array(1062156, 8000), //紫色马赛克短裤
Array(1062153, 8000), //假日斜纹短裤
Array(1062126, 8000), //紫条纹短裤
Array(1062113, 8000), //彩铅短裤
Array(1062112, 8000), //内裤
Array(1062109, 8000), //嫩黄修身裤
Array(1062053, 8000), //粉边白短裤
Array(1062025, 8000), //蓝便装裤
Array(1062026, 8000), //红便装裤
Array(1061206, 8000), //高尔夫短裙
Array(1060182, 8000), //高尔夫短裤
Array(1061207, 8000), //流星雨短裙
Array(1060181, 8000), //流星雨裤子
Array(1060126, 8000), //巨星摩登裤子
Array(1062222, 8000), //嫩黄小熊七分裤
Array(1062221, 8000), //粉红小熊七分裤
Array(1062218, 8000), //粉绿喵咪小裤衩
Array(1062219, 8000), //粉蓝喵咪小裤衩
Array(1062223, 8000), //蓝色粉喵喵短裙
Array(1062224, 8000), //灰色粉喵喵短裙
// -----价格为 5000 点卷 --------
Array(1062189, 5000), //林之灵短裤
Array(1061127, 5000), //蓝摇滚喇叭裤
Array(1062186, 5000), //真红短裤
Array(1062185, 5000), //紫色点点裤
Array(1062182, 5000), //蔚蓝色短裤
Array(1062183, 5000), //玫红背带裤
Array(1062176, 5000), //炫彩渐变裤
Array(1062174, 5000), //蓬蓬星塑身裤
Array(1062172, 5000), //芭比格子塑身裤
Array(1062152, 5000), //荧光粉长裤
Array(1062151, 5000), //爱丽丝兔裤
Array(1062138, 5000), //薄荷色做旧牛仔裤
Array(1062135, 5000), //精英裤子
Array(1062131, 5000), //白色卷边牛仔裤
Array(1062091, 5000), //黑灰格子短裤
Array(1062089, 5000), //紫色做旧休闲短裤
Array(1062109, 5000), //嫩黄修身裤
Array(1061139, 5000), //军用魔龙短裤
Array(1060003, 5000), //军用短裤
Array(1062066, 5000), //白色破洞牛仔裤
Array(1062035, 5000), //黑骷髅皮裤
Array(1061106, 5000), //黑骷髅皮裙
Array(1062024, 5000), //野战军裤
Array(1062011, 5000), //蓝色棒球裤
Array(1062012, 5000), //白色棒球裤
Array(1062013, 5000), //灰色棒球裤
Array(1062014, 5000), //黑蓝色棒球裤
Array(1062010, 5000), //淡蓝滑雪裤
Array(1061209, 5000), //真红皮裙
Array(1061126, 5000), //白色超短裙
Array(1061103, 5000), //礼服裙
Array(1061068, 5000), //乖囡裙
Array(1061007, 5000), //红迷你裙
Array(1062080, 5000), //粉嘟嘟罗莉服
Array(1062084, 5000) //细身牛仔裤
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 2 + " #k点卷#l";
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