/* 点卷商城 - 套服 */

var status = -1;
var itemList = Array(
// -----价格为 10000 点卷 --------
//130
Array(1053006, 10000),//暖绒兔长裙
Array(1052965, 10000),//黑色海魂连衣裙
Array(1052964, 10000),//海贼团套服
Array(1052951, 10000),//波点连身裙
Array(1052948, 10000),//奥尔卡的睡袍
Array(1052926, 10000),//贵族复古礼服
Array(1052925, 10000),//红粉飘飘连衣裙
Array(1052924, 10000),//贵族花纹套服
Array(1052922, 10000),//红色金鱼全身服
Array(1052921, 10000),//蓝色金鱼全身服
Array(1052903, 10000),//白色管家礼服
Array(1052901, 10000),//时髦的领结套服
Array(1052917, 10000),//红月的夜行衣
Array(1052916, 10000),//弓凛的花衣裳
Array(1052912, 10000),//夹棉时尚王
Array(1052779, 10000),//山茶花华服
Array(1052750, 10000),//未来医生套服
Array(1052749, 10000),//未来天使服
Array(1052697, 10000),//雪之女神连身裙
Array(1052232, 10000),//毛领蓬蓬裙
Array(1052231, 10000),//小王子礼服
Array(1051459, 10000),//农夫甜心派
Array(1051457, 10000),//海军风校服
Array(1051452, 10000),//橘色小短裙
Array(1051448, 10000),//莲花学院指定校服
Array(1051434, 10000),//花叶甜甜
Array(1051426, 10000),//幻象贝拉
Array(1051431, 10000),//恋爱女孩信使
Array(1051425, 10000),//蝴蝶结黄色连衣裙
Array(1051436, 10000),//女皇的礼服
Array(1051429, 10000),//甜蜜雪花
Array(1051410, 10000),//森林露营服
Array(1051411, 10000),//Lady罗莎莉娅
Array(1051409, 10000),//闪亮艾斯女孩
Array(1051392, 10000),//派对公主礼服
Array(1051391, 10000),//艾尔莎连衣裙
Array(1051349, 10000),//女妖
Array(1051155, 10000),//公主礼服
Array(1051154, 10000),//女神晚礼服
Array(1050364, 10000),//草叶甜甜
Array(1050361, 10000),//恋爱男孩信使
Array(1050356, 10000),//幻象托特

Array(1052871, 10000), //调查兵团服装
Array(1052873, 10000), //三笠的调查兵团服装
Array(1052874, 10000), //利威尔的调查兵团服装
Array(1052876, 10000), //艾伦的调查兵团服装
Array(1052724, 10000), //小马乖乖套服
Array(1052727, 10000), //快乐连体衫
Array(1052728, 10000), //快乐连衣裙
Array(1052781, 10000), //红色小马憨憨背带裤
Array(1052782, 10000), //蓝色小马憨憨背带裤
Array(1052842, 10000), //萌犬套装(裙)
Array(1052843, 10000), //萌犬套装(裤)
Array(1052844, 10000), //微笑玉米背带裤
Array(1052757, 10000), //爱丽丝礼服
Array(1052709, 10000), //肃清者戎衣
Array(1052634, 10000), //简洁白衬衫
Array(1052503, 10000), //凉爽夏日全身装
Array(1050227, 10000), //薄荷雪套服
Array(1051278, 10000), //樱桃雪套服
Array(1050318, 10000), //纯白礼服
Array(1051389, 10000), //纯白婚纱
Array(1050319, 10000), //秋游套装男
Array(1051390, 10000), //秋游套装女
Array(1050293, 10000), //海滩帅锅装
Array(1051359, 10000), //海滩美眉装
Array(1050209, 10000), //黄色晚礼服-男款
Array(1051255, 10000), //黄色晚礼服-女款
Array(1050342, 10000), //蓝色巴尼兔背带裤
Array(1050310, 10000), //天生购物狂
Array(1051382, 10000), //天生购物狂
Array(1052078, 10000), //泡泡袍
Array(1052083, 10000), //大圣装
Array(1052094, 10000), //八戒装
Array(1050314, 10000), //巧克力恋人
Array(1051385, 10000), //巧克力恋人
// -----价格为 8000 点卷 --------
Array(1052644, 8000), //暗影执行者
Array(1052643, 8000), //血腥珍妮
Array(1052756, 8000), //狂野十字猎服
Array(1052750, 8000), //未来医生套服
Array(1052749, 8000), //未来天使服
Array(1052747, 8000), //波点娃娃小礼服
Array(1052731, 8000), //黑色可爱游泳服
Array(1052746, 8000), //大厨服
Array(1052053, 8000), //熊熊服
Array(1052550, 8000), //海豹白白服
Array(1052661, 8000), //小鸡玩偶服
Array(1052726, 8000), //僵尸新娘全身装
Array(1052725, 8000), //幻夜蝶华全身装
Array(1052713, 8000), //豹皮大衣
Array(1052691, 8000), //烈焰战神套服
Array(1052675, 8000), //万圣节幻影帽子套服
Array(1052668, 8000), //时间旅行者的礼服
Array(1052666, 8000), //巧可羊全身装
Array(1052667, 8000), //小绵羊朵朵玩偶服
Array(1052168, 8000), //可爱小绵羊服
Array(1052660, 8000), //蓬松背带裤
Array(1052605, 8000), //舒适绵羊睡衣
Array(1052604, 8000), //苍恋玫瑰礼服
Array(1050313, 8000), //黑色皇家礼服
Array(1051421, 8000), //人气模范生连衣裙
Array(1050352, 8000), //人气模范生套装
Array(1052073, 8000), //白兔装
Array(1050242, 8000), //开场男星
Array(1051292, 8000), //开场女星
Array(1050296, 8000), //超级明星套服
Array(1051362, 8000), //超级明星连衣裙
Array(1050299, 8000), //小娃娃普卡
Array(1051366, 8000), //小娃娃皮卡
Array(1051221, 8000), //圣诞节套服-女孩
Array(1050179, 8000), //圣诞节套服-男孩
Array(1050180, 8000), //学院优等生制服-男
Array(1052283, 8000), //学院优等生制服-女
Array(1051256, 8000), //蓝色小背带裙
Array(1050210, 8000), //蓝色小背带服
Array(1050232, 8000), //甘菊下午茶
Array(1050231, 8000), //侍女服-男
Array(1051127, 8000), //侍女服-女
Array(1050152, 8000), //水兵服-男
Array(1051180, 8000), //水兵服-女
Array(1050301, 8000), //蓝色格纹假日服
Array(1051368, 8000), //粉格纹假日装
Array(1052030, 8000), //天使服
Array(1052346, 8000), //雪花情侣男棉衣
Array(1052347, 8000), //雪花情侣女棉衣
Array(1050291, 8000), //可爱棒球服
Array(1051357, 8000), //可爱棒球服
Array(1050285, 8000), //波比魔法斗篷
Array(1051352, 8000), //波比魔法斗篷
Array(1051270, 8000), //军团长外套-女款
Array(1050220, 8000), //军团长外套-男款
Array(1051271, 8000), //精灵王服饰-女款
Array(1050221, 8000), //精灵王服饰-男款
// -----价格为 5000 点卷 --------
Array(1052687, 5000), //红猫猫斗篷
Array(1052686, 5000), //绿猫猫斗篷
Array(1052657, 5000), //黑天鹅芭蕾服
Array(1052656, 5000), //白天鹅芭蕾服
Array(1052655, 5000), //灵魂熊服装
Array(1052644, 5000), //暗影执行者
Array(1052626, 5000), //海洋风条纹装
Array(1052594, 5000), //小恐龙绿豆套服
Array(1052595, 5000), //小恐龙云豆套服
Array(1052593, 5000), //粉红缎带冰淇淋服
Array(1052579, 5000), //尖兵尼奥套装
Array(1052674, 5000), //黑暗小恶魔全身服
Array(1052866, 5000), //小少爷服
Array(1052554, 5000), //猫咪洛丽塔套服
Array(1052459, 5000), //蓝色天使制服
Array(1052458, 5000), //露西亚全身装
Array(1052455, 5000), //小蜜蜂外套
Array(1052449, 5000), //时尚香肠套服
Array(1052448, 5000), //西红柿外套
Array(1052445, 5000), //银河战队盔甲
Array(1050241, 5000), //银河牛仔连身装
Array(1052213, 5000), //贵族勇士铠甲
Array(1051348, 5000), //魔法密林魔法学校校服
Array(1052440, 5000), //武陵道场道服
Array(1052438, 5000), //麻薯巧克力衣服
Array(1052427, 5000), //魔族高贵外套
Array(1052294, 5000), //战斗牧师服
Array(1052293, 5000), //战斗修女服
Array(1052084, 5000), //黄金甲
Array(1052068, 5000), //白骨服
Array(1052147, 5000), //舞狮服
Array(1052172, 5000), //南瓜精灵套服
Array(1050019, 5000), //圣诞服男
Array(1051049, 5000), //圣诞服女
Array(1052005, 5000), //橘黄雨衣
Array(1052007, 5000), //火红雨衣
Array(1052008, 5000), //果绿雨衣
Array(1050118, 5000), //黑三角内裤
Array(1050117, 5000), //蓝三角内裤
Array(1051178, 5000), //黄紧身衣
Array(1052214, 5000), //枫叶赛车手服
Array(1051100, 5000), //空手道服
Array(1051060, 5000), //白护士服
Array(1050086, 5000), //绿虎之服
Array(1051087, 5000), //粉狼之服
Array(1051088, 5000), //黄熊之服
Array(1051128, 5000), //星座服
Array(1050243, 5000), //国庆全身战甲-男款
Array(1051298, 5000), //国庆全身战甲-女款
Array(1050244, 5000), //国庆战斗外套-男款
Array(1051299, 5000), //国庆战斗外套-女款
Array(1050284, 5000), //派对公子服
Array(1051350, 5000), //派对名媛裙
Array(1050322, 5000), //派对王子礼服
Array(1052867, 5000), //雪人服
Array(1052056, 5000), //韩国足球服No.2
Array(1052057, 5000), //英国足球服No,7
Array(1052058, 5000), //巴西足球服No.10
Array(1052059, 5000), //法国足球服No.14
Array(1052060, 5000), //英国足球服No.8
Array(1052061, 5000), //巴西足球服No.9
Array(1052062, 5000), //法国足球服No.10
Array(1052875, 5000), //柴郡猫套服
Array(1051163, 5000), //鬼娃娃晚装
Array(1050124, 5000), //金童服
Array(1051138, 5000), //玉女服
Array(1052003, 5000), //蓝道袍
Array(1052004, 5000), //紫道袍
Array(1052332, 5000), //街舞休闲装
Array(1052203, 5000), //购物狂休闲装
Array(1051108, 5000), //休闲连衣裙(粉)
Array(1051109, 5000), //休闲连衣裙(黄)
Array(1051040, 5000), //骇客服
Array(1052001, 5000), //白色纸箱
Array(1052000, 5000), //褐色纸箱
Array(1052002, 5000), //朱红纸箱
Array(1050128, 5000), //冰爽可乐服
Array(1051233, 5000), //车模装
Array(1051183, 5000), //周末约会装
Array(1052194, 5000), //原始人皮服
Array(1051185, 5000), //女仆套裙
Array(1052295, 5000), //粉色女仆套装
Array(1052296, 5000), //天蓝女仆套装
Array(1051369, 5000), //女仆之骄傲
Array(1050283, 5000), //魔术师晚礼服
Array(1051284, 5000), //魔术师晚礼裙
Array(1051219, 5000), //彩虹mini连衣裙
Array(1051365, 5000), //贝塔战袍
Array(1052077, 5000), //月兔服
Array(1052053, 5000), //熊熊服
Array(1052637, 5000), //豺狼服
Array(1051125, 5000), //黑猫服
Array(1052135, 5000), //半人马装
Array(1052085, 5000), //肚兜（红色）
Array(1052086, 5000), //肚兜（蓝色）
Array(1052154, 5000), //虎娃服
Array(1052179, 5000), //牛牛贺岁长袍
Array(1052218, 5000), //小丑套服
Array(1052275, 5000), //皇家彩虹夹克
Array(1052339, 5000), //工科麻辣老师
Array(1052340, 5000) //理科麻辣老师
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