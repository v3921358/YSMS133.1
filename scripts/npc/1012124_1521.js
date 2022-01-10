/* 点卷商城 - 戒指 */

var status = -1;
var itemList = Array(
// -----价格为 20000 点卷 --------
Array(1112166, 20000), //乖宝贝名片戒指
Array(1112278, 20000), //乖宝贝聊天戒指
Array(1112171, 20000), //狗狗名片戒指(白)
Array(1112172, 20000), //狗狗名片戒指（棕）
Array(1112283, 20000), //狗狗聊天戒指(白)
Array(1112284, 20000), //狗狗聊天戒指(棕)
Array(1112173, 20000), //奶白兔名片戒指
Array(1112285, 20000), //奶白兔聊天戒指
Array(1112177, 20000), //名签戒指(进击的巨人)
Array(1112289, 20000), //对话框戒指(进击的巨人)
Array(1112165, 20000), //绿光森林名片戒指
Array(1112277, 20000), //绿光森林聊天戒指
Array(1112162, 20000), //鸥巴名片戒指
Array(1112274, 20000), //鸥巴聊天戒指
Array(1112163, 20000), //星星名片戒指
Array(1112275, 20000), //星星聊天戒指
Array(1112161, 20000), //黄小丫名片戒指
Array(1112273, 20000), //黄小丫聊天戒指
Array(1112160, 20000), //西瓜物语名片戒指
Array(1112272, 20000), //西瓜物语聊天戒指
Array(1112159, 20000), //非洲之星名片戒指
Array(1112271, 20000), //非洲之星聊天戒指
Array(1112157, 20000), //我爱胡子名片戒指(蓝色)
Array(1112269, 20000), //我爱胡子聊天戒指(蓝色)
Array(1112158, 20000), //我爱胡子名片戒指(红色)
Array(1112270, 20000), //我爱胡子聊天戒指(红色)
Array(1112151, 20000), //草莓蛋糕名片戒指
Array(1112263, 20000), //草莓蛋糕聊天戒指
Array(1112153, 20000), //草莓名片戒指
Array(1112265, 20000), //草莓聊天戒指
Array(1112150, 20000), //天使降临名片戒指
Array(1112262, 20000), //天使聊天戒指
Array(1112155, 20000), //青蛙名片戒指
Array(1112267, 20000), //青蛙聊天戒指
Array(1112152, 20000), //蓝莓名片戒指
Array(1112264, 20000), //蓝莓聊天戒指
Array(1112176, 20000), //旋律音符名片戒指
Array(1112288, 20000), //旋律音符聊天戒指
Array(1112179, 20000), //雪花圣诞名片戒指
Array(1112291, 20000), //雪花圣诞聊天戒指
Array(1112178, 20000), //梦幻雪景名片戒指
Array(1112290, 20000), //梦幻雪景聊天戒指
Array(1112164, 20000), //夏日甜心名片戒指
Array(1112276, 20000), //夏日甜心聊天戒指
// -----价格为 10000 点卷 --------
Array(1112733, 10000), //龙魂之戒—恶魔(力)
Array(1112732, 10000), //龙魂之戒—双弩(敏)
Array(1112135, 10000), //水墨花名片戒指
Array(1112238, 10000), //水墨花聊天戒指
Array(1112141, 10000), //红玫瑰名片戒指
Array(1112252, 10000), //红玫瑰聊天戒指
Array(1112144, 10000), //虎喵名片戒指
Array(1112256, 10000), //虎喵聊天戒指
Array(1112145, 10000), //浪漫花边名片戒指
Array(1112257, 10000), //浪漫花边聊天戒指
Array(1112146, 10000), //青苹果名片戒指
Array(1112258, 10000), //青苹果对话框戒指
Array(1112253, 10000), //木乃伊对话框戒指
Array(1112142, 10000), //木乃伊名片戒指
Array(1112244, 10000), //蝙蝠聊天戒指
Array(1112119, 10000), //可乐(Red) 名片戒指
Array(1112229, 10000), //可乐(Red)聊天戒指
Array(1112120, 10000), //可乐(White) 名片戒指
Array(1112230, 10000), //可乐(White)聊天戒指
Array(1112121, 10000), //饼干名片戒指
Array(1112231, 10000), //饼干聊天戒指
Array(1112100, 10000), //白色名片戒指30天
Array(1112136, 10000), //香肠名片戒指
Array(1112156, 10000), //猪猪名片戒指
Array(1112268, 10000), //猪猪聊天戒指
Array(1112103, 10000), //嫩黄名片戒指
// -----价格为 5000 点卷 --------
Array(1112251, 8000), //彩色铅笔聊天戒指
Array(1112124, 8000), //蓝笔笔名片戒指
Array(1112123, 8000), //红笔笔名片戒指
Array(1112107, 8000), //骷髅名片戒指
Array(1112208, 8000), //骷髅聊天戒指
Array(1112110, 8000), //篮球队名片戒指
Array(1112113, 8000), //巧克力名片戒指
Array(1112114, 8000), //粉红糖果名片戒指
Array(1112101, 8000), //水晶蓝名片戒指
Array(1112107, 8000), //骷髅名片戒指
Array(1112217, 8000) //小狗脚样聊天戒指
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