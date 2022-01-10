/* 点卷商城 - 上衣 */

var status = -1;
var itemList = Array(
// -----价格为 10000 点卷 --------

Array(1042319, 10000), //俏皮T恤
Array(1042329, 10000), //糖果色T恤
Array(1042321, 10000), //心花怒放T恤
Array(1042320, 10000), //海鸥印花T恤
Array(1042316, 10000), //粉色萌萌象T恤
Array(1042315, 10000), //蓝色萌萌象T恤
Array(1042314, 10000), //兔兔熊T恤
Array(1042313, 10000), //蘑蘑菇T恤（柠檬黄）
Array(1042312, 10000), //蘑蘑菇T恤（冰雪蓝）
Array(1042311, 10000), //彩糖T恤
Array(1042330, 10000), //露肩baby装
Array(1042336, 10000), //微笑玉米衫
Array(1042337, 10000), //熊孩子套衫(粉)
Array(1042338, 10000), //熊孩子套衫(黄)
Array(1042142, 10000), //彩虹条背心
Array(1042143, 10000), //点点围脖上衣
Array(1040001, 10000), //黑西装
Array(1041194, 10000), //粉色兔子T恤
Array(1040192, 10000), //绿色兔子T恤
// -----价格为 8000 点卷 --------
Array(1040195, 8000),//来看胡子背心
Array(1041197, 8000),//粉红胡子T恤
Array(1041196, 8000),//菠萝吊带衫
Array(1040194, 8000),//菠萝背心
Array(1042172, 8000),//高尔夫上衣
Array(1042264, 8000),//卡拉高尔夫背心
Array(1042236, 8000),//苹果绿毛衣
Array(1042340, 8000), //灰喵喵围脖小上衣
Array(1042339, 8000), //白喵喵围脖小上衣
Array(1042334, 8000), //绿喵喵喵脸上衣
Array(1042333, 8000), //粉喵喵喵脸上衣
Array(1042332, 8000), //摇滚喵咪上衣
Array(1042292, 8000), //香蕉羊毛开衫
Array(1042290, 8000), //白色樱桃针织衫
Array(1042285, 8000), //拼色点点T恤
Array(1042278, 8000), //丁尼卫衣
Array(1042275, 8000), //青蛙雨衣
Array(1042271, 8000), //外星人拼色T恤
Array(1042267, 8000), //心跳连帽衫
Array(1042265, 8000), //草莓围脖小上衣
Array(1042263, 8000), //明星熊仔夹克
Array(1042260, 8000), //点点星光羊毛衣
Array(1042252, 8000), //高尔夫无袖T恤
Array(1042251, 8000), //蛇年嘻哈卫衣
Array(1042242, 8000), //无袖水手上衣
Array(1042241, 8000), //飞翔紫罗兰
Array(1042262, 8000), //霞光短袖T恤
Array(1042239, 8000), //黄色冲锋衣
Array(1042270, 8000), //粉红兔毛衣
Array(1042237, 8000), //黑白潮人马甲
Array(1042235, 8000), //爱丽丝兔上衣
Array(1042232, 8000), //灰主流套衫
Array(1042219, 8000), //蓝莓糖果套头衫
Array(1042218, 8000), //木莓糖果套头衫
Array(1042214, 8000), //粉条纹两件套
Array(1042212, 8000), //蓝色雪花卫衣
Array(1042213, 8000), //粉色雪花卫衣
Array(1042208, 8000), //大象卫衣
Array(1042207, 8000), //星纹运动服
Array(1042095, 8000), //黑色夹克
Array(1042204, 8000), //汉堡T恤
Array(1042203, 8000), //麦芽围脖T恤
Array(1042198, 8000), //彩虹T恤
Array(1042193, 8000), //休闲风两件套
Array(1042189, 8000), //羊羊上衣
Array(1042187, 8000), //粉红绒绒衫
Array(1042185, 8000), //后街吉姆
Array(1042177, 8000), //修身小外套
Array(1042176, 8000), //I LOVE CHINA
Array(1042174, 8000), //野营服
Array(1042173, 8000), //绿油油polo衫
Array(1042172, 8000), //高尔夫上衣
Array(1042170, 8000), //酷夏T恤
Array(1042166, 8000), //摩托夹克
Array(1042165, 8000), //粉色领结小背心
Array(1042164, 8000), //绿领带衬衣
Array(1042161, 8000), //嫩黄连帽卫衣
Array(1042160, 8000), //蓝格子套头衫
Array(1042159, 8000), //小蜜蜂背带
Array(1042158, 8000), //黑白短款夹克
Array(1042157, 8000), //粉红爱心T恤
Array(1042156, 8000), //银河系T恤
Array(1042122, 8000), //名侦探制服
Array(1042023, 8000), //蓝色便装
Array(1042024, 8000), //红色便装
Array(1042022, 8000), //野战军服
Array(1042020, 8000), //褐色军服
Array(1041143, 8000), //绿领带颓废西装
Array(1041142, 8000), //巨星蛋糕吊带
Array(1041114, 8000), //夏威夷上装
Array(1041140, 8000), //念珠上衣
Array(1040114, 8000), //夏威夷花环
Array(1042129, 8000), //休闲领带装
Array(1042154, 8000), //吉祥棉服
Array(1042152, 8000), //如意棉服
// -----价格为 5000 点卷 --------
Array(1042104, 5000), //小绿叶T恤
Array(1042105, 5000), //小红叶T恤
Array(1042108, 5000), //水印闪星背心
Array(1042098, 5000), //卡莫套头夹克
Array(1042097, 5000), //印花休闲套头T恤
Array(1042095, 5000), //黑色夹克
Array(1042093, 5000), //双排扣小外套
Array(1042088, 5000), //黑色骷髅马甲
Array(1042086, 5000), //摄影师夹克
Array(1042084, 5000), //军装连帽坎肩
Array(1042083, 5000), //可爱连帽披风
Array(1042082, 5000), //黑茄克套
Array(1042076, 5000) //花点T恤
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