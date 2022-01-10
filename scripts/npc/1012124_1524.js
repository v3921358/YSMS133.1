/* 点卷商城 - 其他 */

var status = -1;
var itemList = Array(
// -----价格为 8000 点卷 --------
Array(1032038, 8000), //雪花耳钉
Array(1032233, 8000), //粉色桃心耳环
Array(1022085, 8000), //睡眠眼罩(蓝色)
Array(1022044, 8000), //模范生眼镜
Array(1022084, 8000), //搞笑眼罩
Array(1022075, 8000), //糖果眼镜
Array(1022122, 8000), //DJ眼镜
Array(1022229, 8000), //VIP墨镜
Array(1022095, 8000), //见钱眼开
Array(1012462, 8000), //僵尸新娘的闪亮黑瞳
Array(1012511, 8000), //清扫面罩
Array(1012461, 8000), //青春痘脸饰
Array(1012131, 8000), //好白的牙
Array(1012007, 8000), //白胡子
Array(1012008, 8000), //马赛克
Array(1012023, 8000), //脸谱3
Array(1012022, 8000), //脸谱2
Array(1012021, 8000), //脸谱1
Array(1012024, 8000), //优雅胡子
Array(1012026, 8000), //关公胡子
Array(1012029, 8000), //黑白小丑
Array(1012051, 8000), //彩色小丑面具
Array(1012053, 8000), //愤怒
Array(1012054, 8000), //绝望
Array(1012096, 8000), //苹果味口香糖
Array(1012099, 8000), //蓝色腮红
Array(1012137, 8000), //星之印
Array(1012165, 8000), //小丑鼻子
Array(1012179, 8000), //鹿鼻子
Array(1012208, 8000), //害羞了
Array(1012366, 8000), //僵尸猎人面罩
Array(1012253, 8000), //心跳唇彩
Array(1012412, 8000), //岩炎之泪
Array(1012413, 8000), //双面人
Array(1012427, 8000), //微笑的表情
Array(1012428, 8000), //疑问的表情
Array(1012428, 8000), //惊讶的表情
Array(1012429, 8000), //惊讶的表情
Array(1012430, 8000), //可爱的表情
Array(1012431, 8000), //撇嘴的表情
Array(1012432, 8000), //傲慢的表情
Array(1012433, 8000), //发怒的表情
Array(1012434, 8000), //发呆的表情
Array(1012435, 8000), //狡猾的表情
Array(1012436, 8000), //坏笑的表情
// -----价格为 8000 点卷 --------
Array(5010021, 8000), //白骨效果
Array(5010025, 8000), //恐怖的幽灵
Array(5010051, 8000), //霓虹圣诞树
Array(5010054, 8000), //圣诞华丽丽
Array(5010102, 8000), //伤不起
Array(5010103, 8000), //求基友
Array(5010104, 8000), //求包养
Array(5010009, 8000), //红五星效果
Array(5010015, 8000), //777效果
Array(5010028, 8000), //寒冰斗魂
Array(5010029, 8000), //红焰斗魂
Array(5010030, 8000), //雷电斗魂
Array(5010038, 8000), //瀑布
Array(5010043, 8000), //眼光
Array(5010044, 8000), //幻影残像
Array(5010075, 8000), //伦敦时尚
Array(5010076, 8000), //巴黎恋人
Array(5010111, 8000), //去旅行咯幕板
Array(5010008, 8000) //幸运儿效果
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 2  + " #k点卷#l";
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