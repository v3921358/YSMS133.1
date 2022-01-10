/* 点卷商城 - 鞋子 */

var status = -1;
var itemList = Array(
// -----价格为 10000 点卷 --------
//130
Array(1073109, 10000),//风神的鞋子
Array(1073079, 10000),//果冻鞋
Array(1073061, 10000),//粉红花纹鞋子
Array(1073056, 10000),//绽放之春
Array(1073047, 10000),//美羊羊拖
Array(1073046, 10000),//喜羊羊拖
Array(1072978, 10000),//闪耀唐鞋
Array(1072919, 10000),//蓝色蝴蝶鞋
Array(1072918, 10000),//粉红蝴蝶鞋
Array(1072842, 10000),//真破灭鞋子
Array(1072841, 10000),//真生命鞋子

Array(1070061, 10000), //派对王子的玻璃鞋
Array(1071078, 10000), //派对公主的水晶鞋
Array(1073027, 10000), //立体机动装置
Array(1072942, 10000), //海鸥拖拖鞋
Array(1072831, 10000), //波比短靴
Array(1072749, 10000), //泡泡巧克力鞋子
Array(1072779, 10000), //圣洁天使拖
Array(1072942, 10000), //鸥拖拖鞋
Array(1072843, 10000), //泡泡拖
Array(1072910, 10000), //可可熊鞋子
Array(1072917, 10000), //小马马乖乖鞋
Array(1072949, 10000), //红色小马运动鞋
Array(1072950, 10000), //蓝色小马运动鞋
// -----价格为 8000 点卷 --------
Array(1072848, 8000), //血腥吊带袜
Array(1072852, 8000), //超级明星鞋子
Array(1070063, 8000), //蓝色巴尼兔小皮鞋
Array(1071079, 8000), //粉色巴尼兔小皮鞋
Array(1072836, 8000), //垒球鞋
Array(1072658, 8000), //炫彩脚环
Array(1072627, 8000), //军团长的靴子
Array(1072628, 8000), //精灵王的靴子
Array(1072943, 8000), //哼唱旋律的舞鞋
Array(1072941, 8000), //机械兔靴
Array(1072650, 8000), //海龙靴
Array(1072651, 8000), //炎龙靴
Array(1072780, 8000), //蓝缎带猫咪鞋
Array(1072781, 8000), //猫咪鞋子
Array(1072817, 8000), //Blavy天使鞋
Array(1072284, 8000), //八戒僧鞋
Array(1072911, 8000), //肃清者暗靴
Array(1072924, 8000), //未来天使靴
Array(1072925, 8000), //未来医生靴子
Array(1072010, 8000), //西装皮鞋
// -----价格为 5000 点卷 --------
Array(1072662, 5000), //露西亚运动鞋
Array(1072280, 5000), //黄金靴
Array(1070007, 5000), //金童鞋
Array(1071019, 5000), //玉女鞋
Array(1071003, 5000), //圣诞鞋女
Array(1070005, 5000), //圣诞鞋男
Array(1070001, 5000), //黑圣诞鞋
Array(1072930, 5000), //柴郡猫短靴
Array(1072336, 5000), //足球钉鞋
Array(1072265, 5000), //蓝色足球鞋
Array(1072266, 5000), //黑色足球鞋
Array(1072267, 5000), //足球钉鞋
Array(1072236, 5000), //关公鞋子
Array(1072237, 5000), //诸葛亮鞋子
Array(1072250, 5000), //星座鞋
Array(1072256, 5000), //熊仔鞋
Array(1072274, 5000), //月兔鞋
Array(1072367, 5000), //可爱小绵羊鞋子
Array(1072440, 5000), //灰蒙蒙猫肉垫
Array(1072448, 5000), //皇家彩虹靴
Array(1072466, 5000), //学院优等生鞋子
Array(1072468, 5000), //蝴蝶结娃娃鞋
Array(1072470, 5000), //天蓝条纹鞋
Array(1072509, 5000), //红丝带鞋
Array(1072652, 5000), //银河战队靴子
Array(1072729, 5000), //银河牛仔靴
Array(1072780, 5000), //蓝缎带猫咪鞋
Array(1072857, 5000), //欧黛特芭蕾舞鞋
Array(1072800, 5000), //高尔夫球鞋
Array(1072858, 5000), //欧迪尔芭蕾舞鞋
Array(1072860, 5000), //明星闪耀
Array(1072820, 5000), //明星熊仔鞋
Array(1072852, 5000), //超级明星鞋子
Array(1072866, 5000), //巧可羊鞋子
Array(1072867, 5000), //小绵羊朵朵玩偶鞋
Array(1072791, 5000), //小恐龙绿豆爪爪
Array(1072803, 5000), //小恐龙云豆爪爪
Array(1072918, 5000), //粉红蝴蝶鞋
Array(1072919, 5000), //蓝色蝴蝶鞋
Array(1073009, 5000), //农场小皮靴
Array(1073023, 5000), //灰色喵喵球鞋
Array(1073022, 5000), //蓝色喵喵球鞋
Array(1073013, 5000), //嫩黄小熊鞋
Array(1073014, 5000), //粉红小熊鞋
Array(1072862, 5000), //闪购拖鞋
Array(1072832, 5000), //海滩拖鞋
Array(1072808, 5000), //软软绵羊拖鞋
Array(1072531, 5000), //考拉拖鞋
Array(1072756, 5000), //超级小猫拖鞋
Array(1070057, 5000), //岩炎拖鞋
Array(1072529, 5000), //粉红大象拖鞋
Array(1072484, 5000), //黑猫拖鞋
Array(1072457, 5000), //运动版休闲拖
Array(1072437, 5000), //PB拖拖
Array(1072407, 5000), //HELLO喵喵拖
Array(1072348, 5000), //大象拖
Array(1072323, 5000), //星星凉拖
Array(1072285, 5000), //水手拖鞋
Array(1072275, 5000), //芬拉的拖鞋
Array(1073008, 5000), //粉色条纹鞋
Array(1072349, 5000) //果绿色方纹帆布鞋
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1  + " #k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 1;
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