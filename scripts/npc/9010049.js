/*
 * 转盘系统
 * 奇幻冒险岛工作室制作
 * 更新时间：2015年7月21日 15:51:25
 * 更新内容：
 * 可以通过余额抽奖（新增一个接口）
 * 新增使用次数，并增加排名系统（次数可以通过遍历该玩家的数据，然后得到次数）
 * 新增抽奖积分，增加积分兑换物品功能（抽奖积分必须得另外弄一个数据库来存储了，或者使用高级任务函数）
 */

importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var ItemArray = Array(
        Array(2430861, 1, 3, 100),
        Array(3010145, 1, 2, 50),
        Array(1322005, 1, -1, 1)
        );//道具id，个数，剩余天数，所需积分

var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var status = -1;
var rand = 0;
var InsertData = false;
var nx = false;
var nxx = false;
var price = 1;//转盘券的兑换余额
var quantity;
var itemid, leftday, quantity, needpoints;

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.sendOk("如果您有需要的话可以再来找我哦~");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var RankDataBase = cm.getConnection().prepareStatement("SELECT cname,times FROM EventTimes ORDER BY times desc LIMIT 5").executeQuery();
        var text = ""
        var i = 1;
        text += "目前您一共抽了" + getEventTimes(1, cm.getPlayer().getId()) + "次，一共有积分" + getEventPoints(1, cm.getPlayer().getId()) + "点。\r\n"
        text += "#d#e抽奖次数排名：#k#n\r\n-----------------------------------------------\r\n"
        while (RankDataBase.next()) {
            text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# #r" + RankDataBase.getString("cName") + "#k 抽奖次数： #r" + RankDataBase.getString("times") + "#k"
            text += "\r\n"
            i++;
        }
        text += "-----------------------------------------------\r\n#L0##b转票抽【可抽 " + cm.getItemQuantity(4001833) + " #b次】#l\r\n#L1##b立即花费" + price + "余额购买#i4001833# #t4001833#！#l\r\n#L2##b使用抽奖积分兑换礼品！#l\r\n#L3##b查看能抽奖到什么东西~~#l"
        cm.sendSimple(text);

    } else if (status == 1) {
        if (selection == 0) {
            if (cm.haveItem(4001833) >= 1) {
                var item;
                var itemListAdcanced = Array(
                        3994417, //红色蜡笔
                        3994418, //橙色蜡笔
                        3994419, //黄色蜡笔
                        3994420, //绿色蜡笔
                        3994422, //蓝色蜡笔
                        3994421 //青色蜡笔
                        );//高级的物品
                var itemListNormal = new Array(
                        1032007, //祖母绿
                        1032008, //猫眼耳环
                        1032009, //黄方耳环
                        1032012, //骷髅耳环
                        1032017, //玫瑰耳环
                        1032019, //水仙耳环
                        1032022, //赤色圆型耳环
                        1032023, //草莓耳环
                        1032025, //叶子耳环
                        1032026, //黄水晶耳环
                        1032040, //枫叶型耳环
                        1032041, //枫叶型耳环
                        1032042, //枫叶型耳环
                        //-------帽子-------
                        1002418, //废报纸头盔
                        1002419, //枫叶帽
                        1002424, //红马术帽
                        1002425, //蓝马术帽
                        1002436, //长老斯坦之帽
                        1002441, //热血头带
                        1002448, //紫色头巾
                        1002452, //黑星白头巾
                        1002453, //白星黑头巾
                        1002454, //红星黑头巾
                        1002455, //黑星红头巾
                        1002492, //白色棒球帽
                        1002543, //板栗帽
                        1002550, //黑色格莱西头盔
                        1002551, //蓝龙头盔
                        1002554, //武艺头绳
                        1002699, //南瓜帽子
                        1002776, //永恒冠军盔
                        //------披风------
                        1102000, //绿色冒险披风
                        1102001, //蓝色冒险披风
                        1102002, //红色冒险披风
                        1102003, //白色冒险披风
                        1102004, //黑色冒险披风
                        1102011, //蓝色守护披风
                        1102031, //绿龙纹披风
                        1102032, //紫龙纹披风
                        1102033, //红龙纹披风
                        1102034, //蓝龙纹披风
                        1102035, //黑龙纹披风
                        1102040, //浪人披风(黄)
                        1102041, //浪人披风(粉)
                        1102042, //浪人披风(紫)
                        1102043, //浪人披风(褐)
                        1102046, //侯爵披风
                        1102047, //伯爵披风
                        1102048, //公爵披风
                        1102140, //卡帕莱特披风
                        1102147, //玩具匠人披风
                        1102172, //永恒不灭披风
                        1102174, //工作人员披风
                        1102166, //枫叶披风
                        1102167, //枫叶披风
                        1102168, //枫叶披风
                        //------手套------
                        1082001, //白纹短手套
                        1082002, //工地手套
                        1082098, //褐战魂手套
                        1082099, //蓝战魂手套
                        1082100, //黑战魂手套
                        1082112, //黑天使手套
                        1082114, //马尔斯蓝拳套
                        1082115, //马尔斯绿拳套
                        1082116, //马尔斯红拳套
                        1082117, //马尔斯黑拳套
                        1082139, //混天手套(黄)
                        1082140, //混天手套(紫)
                        1082141, //混天手套(褐)
                        1082144, //幻光手套(红)
                        1082145, //工地手套(黄)
                        1082146, //工地手套(红)
                        1082147, //工地手套(蓝)
                        1082148, //工地手套(紫)
                        1082149, //工地手套(褐)
                        1082150, //工地手套(灰)
                        1082168, //青龙手套
                        1082234, //永恒定边手套
                        1082239, //重生定边手套
                        //-------武器------
                        1302016, //黄色雨伞
                        1302017, //蓝色雨伞
                        1302018, //汤勺
                        1302019, //无名剑
                        1302020, //枫叶战剑
                        1302021, //橡皮榔头
                        1302024, //废报纸卷
                        1302025, //红雨伞
                        1302026, //黑雨伞
                        1302027, //绿雨伞
                        1302028, //紫雨伞
                        1302029, //褐雨伞
                        1302030, //枫叶剑
                        1302049, //光线鞭子
                        1302050, //战剑
                        1302051, //树灵之剑
                        1302052, //奇型刀
                        1302053, //奇型刀
                        1302054, //汤勺
                        1302056, //一刀两断
                        1302058, //冒险岛伞
                        1302059, //狂龙闪电剑
                        1302060, //战剑
                        1302061, //蔓藤鞭子
                        1302087, //火炬
                        1312002, //镰刀
                        1312012, //乾坤圈
                        1312013, //判官笔
                        1312030, //烛影摇红
                        1312031, //狂龙怒斩
                        1312032, //枫叶破击斧
                        1312033, //枫叶3年旗
                        1312034, //粉色花边游泳圈
                        1312037, //永恒断蚺斧
                        1312038, //重生断蚺斧
                        1312039, //圣诞六翼天使武器(单手斧)
                        1322000, //铁瓜锤
                        1322001, //锤子
                        1322002, //钢锤
                        1322003, //棒棒果
                        1322004, //奇型锤
                        1322005, //棍棒
                        1322006, //钢管
                        1322007, //皮制手提包
                        1322008, //007提包
                        1322009, //马桶吸
                        1322010, //方形铁铲
                        1322011, //三角铁铲
                        1322012, //红色砖头
                        1322056, //粉色花边游泳圈
                        1322060, //永恒惊破天
                        1322061, //重生惊破天
                        1322065, //圣诞六翼天使武器(单手钝器)
                        1322071, //采矿铁锹
                        1332053, //野外烧烤串
                        1332057, //枫叶3年旗
                        1332059, //粉色花边游泳圈
                        1332063, //初级盗贼的短剑
                        1332066, //新手刮胡刀
                        1402006, //高原之剑
                        1402007, //半月巨刀
                        1402008, //钢铁剑
                        1402009, //木球棍
                        1402010, //铝球棍
                        1402011, //无极剑
                        1402012, //霸王剑
                        1402013, //白日剑
                        1402015, //亚历山大之剑
                        1402016, //所罗门之剑
                        1402017, //船长佩剑
                        1402018, //幻木剑
                        1402019, //大刀
                        1402020, //虎剑
                        1402021, //无极剑
                        1402022, //霸王剑
                        1402023, //亚历山大之剑
                        1402024, //大刀
                        1402025, //虎剑
                        1402026, //无极剑
                        1402027, //霸王剑
                        1402028, //亚历山大之剑
                        1402029, //鬼刺狼牙棒
                        1402030, //大刀
                        1402031, //虎剑
                        1402032, //无极剑
                        1402033, //霸王剑
                        1402034, //亚历山大之剑
                        1402035, //斩天刀
                        1402036, //飞龙巨剑
                        //1402037, //龙背刃
                        1402039, //枫叶枭首剑
                        1402040, //枫叶3年旗
                        1402041, //粉色花边游泳圈
                        1402044, //南瓜灯笼
                        1402046, //永恒玄冥剑
                        1402047, //重生玄冥剑
                        1402053, //圣诞六翼天使武器(双手剑)
                        1412000, //双手斧
                        1412001, //铁斧
                        1412002, //钢铁斧
                        1412003, //太阳之斧
                        1412004, //绿蛇刀
                        1412005, //格斗斧
                        1412006, //重型巨斧
                        1412007, //光明斧
                        1412008, //雷电斧
                        1412009, //大力神之斧
                        1412021, //龙魂祭
                        1412022, //太阳之斧
                        1412023, //光明斧
                        1412024, //雷电斧
                        1412025, //大力神之斧
                        1412026, //炼狱魔龙斧
                        1412027, //枫叶乾坤轮
                        1412028, //枫叶3年旗
                        1412029, //粉色花边游泳圈
                        1412033, //永恒碎鼋斧
                        1412034, //重生碎鼋斧
                        1412035, //圣诞六翼天使武器(双手斧)
                        1422004, //板手
                        1422005, //黄金锤
                        1422006, //十字镐
                        1422007, //巨人锤
                        1422008, //大锤
                        1422009, //妖精之锤
                        1422010, //封魂之锤
                        1422011, //酒瓶
                        1422012, //雷神之锤
                        1422013, //狮子之魂
                        1422014, //枫叶锤
                        1422015, //黄金锤
                        1422028, //金龙轰天锤
                        1422029, //枫叶轰天镗
                        1422030, //粉红海豹抱枕
                        1422031, //蓝色海豹抱枕
                        1422032, //枫叶3年旗
                        1422033, //粉色花边游泳圈
                        1422036, //玩具匠人的锤子
                        1422037, //永恒威震天
                        1422038, //重生威震天
                        //------药水------
                        1402049, //幽暗鸦之翼
                        1002894, //粉色编织发带
                        1002895, //红色编织发带
                        1002896, //紫色编织发带
                        1002897, //橙色编织发带
                        1002898, //绿色编织发带
                        1002899, //黄色编织发带
                        1002800, //蓝色编织发带
                        1002915, //盖福克斯的帽子(敏捷
                        1012056, //狗狗鼻
                        1122001, //绿色蝶形领结
                        1122002, //红色蝶形领结
                        1122003, //黄色蝶形领结
                        1122004, //粉红蝶形领结
                        1122005, //黑色蝶形领结
                        1122006, //蓝色蝶形领结
                        1122015, //枫叶围巾
                        1002391, //海盗头巾(绿)
                        1002392, //海盗头巾(红)
                        1002393, //海盗头巾(粉)
                        1002394, //海盗头巾(灰)
                        1002395, //海盗头巾(紫)
                        1002418, //废报纸头盔
                        1002419, //枫叶帽
                        1002424, //红马术帽
                        1002425, //蓝马术帽
                        1002441, //热血头带
                        1002508, //枫叶头盔
                        1002509, //枫叶头盔
                        1002510, //枫叶头盔
                        1002511, //枫叶头盔
                        1002547, //红猎人帽子
                        1002550, //黑色格莱西头盔
                        1002551, //蓝龙头盔
                        // ------ 093 ------------
                        1432075, //黄金枫叶枪
                        1312056, //黄金枫叶斧子
                        1312065, //未来之门单手斧
                        1322084, //黄金枫叶锤子
                        1322091, //薛西斯的暴风锤
                        1302163, //混沌战剑
                        1302164, //混沌奇型刀
                        1302165, //混沌六脉神剑
                        1432089, //混沌三叉戟
                        1432090, //混沌十字枪
                        1432091, //混沌寒冰破魔枪
                        1302143, //一代不速之客单手剑
                        1302144, //二代不速之客单手剑
                        1302145, //三代不速之客单手剑
                        1312058, //一代不速之客单手斧
                        1312059, //二代不速之客单手斧
                        1312060, //三代不速之客单手斧
                        1322086, //一代不速之客单手钝器
                        1322087, //二代不速之客单手钝器
                        1322088, //三代不速之客单手钝器
                        1402086, //一代不速之客双手剑
                        1402087, //二代不速之客双手剑
                        1402088, //三代不速之客双手剑
                        1412058, //一代不速之客双手斧
                        1412059, //二代不速之客双手斧
                        1412060, //三代不速之客双手斧
                        1422059, //一代不速之客双手钝器
                        1422060, //二代不速之客双手钝器
                        1422061, //三代不速之客双手钝器
                        1432077, //一代不速之客枪
                        1432078, //二代不速之客枪
                        1432079, //三代不速之客枪
                        1442107, //一代不速之客矛
                        1442108, //2代不速之客矛
                        1442109, //3代不速之客矛
                        1302172, //新黄金枫叶单手剑
                        1312071, //新黄金枫叶斧子
                        1322105, //新黄金枫叶锤子
                        1412070, //新黄金枫叶战斧
                        1422072, //新黄金枫叶巨锤
                        1432098, //新黄金枫叶枪
                        1442135, //新黄金枫叶开山斧
                        1402104, //枫叶青涩剑
                        1402105, //枫叶超级剑
                        1442130, //枫叶青涩斧
                        1442131, //枫叶超级斧
                        1402085, //黄金枫叶双手剑
                        1302911, //爆击之剑
//------------------------------------------------
                        3010002, //绿色时尚转椅
                        3010003, //红色时尚转椅 
                        3010004, //黄蓝休闲椅
                        3010005, //红蓝休闲椅
                        3010006, //黄色时尚转椅
                        3010209, //香草冰淇淋月饼椅子
                        3010210, //草莓冰淇淋月饼椅子
                        3010007, //粉色海豹靠垫
                        3010008, //蓝色海豹靠垫
                        3010009, //榻榻凳
                        3010010, //白色海豹靠垫 
                        3010012, //剑士 宝座 
                        3010013, //悠长假期
                        3010014, //月亮弯
                        3010016, //黑色海豹靠垫
                        3010294, //黑色海豹靠垫
                        3010017, //金色海豹靠垫
                        3010295, //金色海豹靠垫（可交易）
                        3010018, //椰子树沙滩椅
                        3010019, //寿司椅
                        3010021, //暖暖桌
                        3010024, //玩具粉熊椅
                        3010025, //枫叶纪念凳
                        3010028, //海盗的俘虏
                        3010029, //蓝环凳
                        3010030, //黑环凳
                        3010031, //红环凳
                        3010032, //黄环凳
                        3010033, //绿环凳
                        3010034, //悠长假期(红色)
                        3010035, //悠长假期(蓝色)
                        3010036, //浪漫秋千
                        3010037, //猪猪凳
                        3010075, //我为音乐狂
                        3010077, //猫头鹰椅子
                        3010093, //鲜美的火鸡
                        3010094, //漂漂猪椅子
                        3011000, //钓鱼用椅子
                        3012001, //篝火
                        3012002, //浴桶
                        3012003, //爱心椅子
                        3012006, //风吹稻香
                        3012010, //巧克力蛋糕恋人
                        3012011, //我爱巧克力火锅
                        3010108, //幼龙秋千 
                        3010109, //暖炉椅
                        3010292, //暖炉椅（可交易）
                        3010113, //幽魂发条熊椅子 
                        3010114, //俘虏我吧！椅子
                        3010115, //熊宝宝床
                        3010055, //冰雪糕丸子椅
                        3010137, //神龙椅子
                        3010105, //藍色海豹抱枕椅
                        3010102, //藍色海豹抱枕椅
                        3010103, //藍色海豹抱枕椅
                        3010104, //藍色海豹抱枕椅
                        3010026, //恶灵附身的娃娃椅子
                        3010129, //酋长宝座
                        3010130, //血色玫瑰 
                        3010131, //贪吃熊猫椅 
                        3010132, //撒娇喵咪椅
                        3010133, //帐篷椅
                        3010134, //枫叶纪念凳
                        3010206, //梦想画家椅子
                        3010207, //喧闹好友椅子
                        3010208, //黑猫椅子
                        3010211, //精灵王座
                        3010162, //果月椅子
                        3010135, //节日独角兽椅子 
                        3010139, //私密空间
                        3010168, //友谊万岁椅子
                        3010219, //绵羊酋长椅子
                        3010221, //我爱馅饼椅子
                        3010320, //老奶奶读童话椅子
                        3010321, //阿卡伊勒读童话椅子
                        3010289, //老人家读童话椅子
                        1152108, //狮心战斗护肩
                        1152110, //龙尾法师护肩
                        1152111, //鹰翼哨兵护肩
                        1152112, //渡鸦之魂猎人护肩
                        1152113, //鲨齿船长护肩
                        1003172, //狮心战斗头盔(无描述)
                        1003173, //龙尾法师帽子(无描述)
                        1003174, //鹰翼哨兵便帽(无描述)
                        1003175, //渡鸦之魂追踪者帽(无描述)
                        1003176, //鲨齿船长帽(无描述)
                        1102275, //狮心战斗披风(无描述)
                        1102276, //龙尾法师披风(无描述)
                        1102277, //鹰翼哨兵披风(无描述)
                        1102278, //渡鸦之魂猎人披风(无描述)
                        1102279, //鲨齿船长披风(无描述)
                        1082295, //狮心战斗护腕(无描述)
                        1082296, //龙尾法师手套(无描述)
                        1082297, //鹰翼哨兵手套(无描述)
                        1082298, //渡鸦之魂追踪者手套(无描述)
                        1082299, //鲨齿船长手套(无描述)
                        1052314, //狮心战斗锁子甲(无描述)
                        1052315, //龙尾法师长袍(无描述)
                        1052316, //鹰翼哨兵服(无描述)
                        1052317, //渡鸦之魂追踪者盔甲(无描述)
                        1052318, //鲨齿船长外套(无描述)
                        1072485, //狮心战斗鞋(无描述)
                        1072486, //龙尾法师鞋(无描述)
                        1072487, //鹰翼哨兵鞋(无描述)
                        1072488, //渡鸦之魂追踪者鞋(无描述)
                        1072489, //鲨齿船长鞋(无描述)
                        1232014, //狮心痛苦命运(无描述)
                        1302152, //狮心弯刀(无描述)
                        1312065, //狮心勇士斧(无描述)
                        1322096, //狮心震雷钉(无描述)
                        1402095, //狮心战斗弯刀(无描述)
                        1412065, //狮心战斗斧(无描述)
                        1422066, //狮心巨锤(无描述)
                        1432086, //狮心长枪(无描述)
                        1442116, //狮心矛(无描述)
                        1212014, //龙尾黑甲凶灵(无描述)
                        1372084, //龙尾精灵短杖(无描述)
                        1382104, //龙尾战斗长杖(无描述)
                        1452111, //鹰翼组合弓(无描述)
                        1462099, //鹰翼重弩(无描述)
                        1242042, //渡鸦之魂女王意志之剑(无描述)
                        1332130, //渡鸦之魂短刀(无描述)
                        1362019, //渡鸦之魂真红手杖(无描述)
                        1482084, //鲨齿巨鹰爪(无描述)
                        1492085, //鲨齿锐利手铳(无描述)
                        1532018, //鲨齿火焰炮(无描述)
                        3010356 //温馨荷花池
                        );
                var ii = cm.getItemInfo();
                var xxx = Math.floor(Math.random() * 500);
                if (xxx > 400) {//100分之1的几率
                    rand = Math.floor(Math.random() * itemListAdcanced.length);
                    item = cm.gainGachaponItem(itemListAdcanced[rand], 1, " 转盘 ");
                    InsertData = true;
                } else if (xxx > 450) {//点券
                    cm.gainNX(1, 100000);
                    InsertData = true;
                    nx = true;
                } else if (xxx > 450) {//抵用券
                    cm.gainNX(2, 100000);
                    InsertData = true;
                    nx = true;
                } else {
                    rand = Math.floor(Math.random() * itemListNormal.length);
                    item = itemListNormal[rand];
                    cm.gainItem(item, 1); //直接给予物品 不公告。
                }
                if (item == -1) {
                    cm.sendOk("对不起，你的背包已经满了。");
                    cm.dispose();
                } else {
                    cm.gainItem(4001833, -1);
                    if (nx) {
                        setEventPoints(1, cm.getPlayer().getId(), 1);
                        setEventTimes(1, cm.getPlayer().getId(), 1);
                        cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 运气爆表抽中 100,000 点券。", 5120012);
                        //cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x32, cm.getC().getChannel(), "『终极大奖』" + " : " + "恭喜" + cm.getChar().getName() + ",运气爆表抽中 100,000 点券。"));
                        cm.sendOk("恭喜您从幸运抽奖中获得了 #b100,000 点卷点券#k.");
                        cm.safeDispose();
                    } else if (nxx) {
                        setEventPoints(1, cm.getPlayer().getId(), 1);
                        setEventTimes(1, cm.getPlayer().getId(), 1);
                        cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 运气爆表抽中 100,000 抵用卷。", 5120012);
                        //cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x32, cm.getC().getChannel(), "『终极大奖』" + " : " + "恭喜" + cm.getChar().getName() + ",运气爆表抽中100,000 点卷抵用券。"));
                        cm.sendOk("恭喜您从幸运抽奖中获得了 #b500,000 点卷抵用券#k.");
                        cm.safeDispose();
                    } else {
                        if (InsertData) {
                            cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 运气爆表抽中终极大奖 " + ii.getName(item) + "。", 5120012);
                        }
                        setEventPoints(1, cm.getPlayer().getId(), 1);
                        setEventTimes(1, cm.getPlayer().getId(), 1);
                        cm.sendOk("恭喜您抽中获得了 #b#t" + item + "##k.");
                        cm.safeDispose();
                    }

                }
            } else {
                cm.sendOk("您没有 #z4001833# #i4001833，请获得后再使用。");//暂时关闭。增加物品中。
                cm.safeDispose();
            }
        } else if (selection == 3) {
            cm.sendOk("#b\r\n可以抽中 #r点卷100,000   抵用卷500,000#k #b以及下列：#k\r\n#i3010853##i3015130##i3015131##i3015132##i3015108##i3015089##i3015135##i3015015##i3015016##i3015017##i3015018##i3015019##i3015020##i3015021##i3015022##i3015023##i3015024##i3015025##i3015026##i3015027##i3015096##i3012027##i3015051##i3015002##i3010832##i1102481##i1102482##i1102483##i1102484##i1102485##i1082543##i1082544##i1082545##i1082546##i1082547##i1072743##i1072744##i1072745##i1072746##i1072747##i1132174##i1132175##i1132176##i1132177##i1132178##i1142742##i1112793##i2431938##i1032219#");
            cm.dispose();
        } else if (selection == 1) {//兑换
            cm.sendGetNumber("你想兑换多少个#i4001833# #t4001833#\r\n现在一个#t4001833#需要" + price + " 元。", 0, 0, 100);
        } else if (selection == 2) {//TODO
            var text = "您现在有" + getEventPoints(1, cm.getPlayer().getId()) + "积分，您想要兑换什么物品呢？\r\n#b";
            for (var i = 0; i < ItemArray.length; i++) {
                if (ItemArray[i][2] <= 0) {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限： 永久  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                } else {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限：" + ItemArray[i][2] + "天  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                }
            }
            status = 3;
            cm.sendSimple(text);
        }
    } else if (status == 2) {
        quantity = selection;
        cm.sendYesNo("你要兑换" + quantity + "个#t4001833#吗？需要" + price * quantity + " 余额哦~");
    } else if (status == 3) {
        if (cm.getSpace(4) < 2) {
            cm.sendOk("请让你的其它栏背包的空格空出2个以上后再试。");
            cm.dispose();
            return;
        }
        if (cm.getHyPay(1) >= price * quantity) {
            cm.addHyPay(-price * quantity);
            cm.gainItem(4001833, quantity);
            cm.sendOk("兑换成功了！");
            cm.dispose();
        } else {
            cm.sendOk("对不起，你没有足够的余额。\r\n需要使用" + price * quantity + "元。")
            cm.dispose();
        }
    }
    else if (status == 4) {
        itemid = ItemArray[selection][0];
        leftday = ItemArray[selection][2];
        quantity = ItemArray[selection][1];
        needpoints = ItemArray[selection][3];
        if (leftday <= 0) {
            cm.sendYesNo("你想使用" + needpoints + "抽奖积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？\r\n 使用期限：#b永久#k。");
        } else {
            cm.sendYesNo("你想使用" + needpoints + "抽奖积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？ \r\n使用期限：#b" + leftday + "天#k。");
        }
    } else if (status == 5) {
        if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
            cm.sendOk("请确保您所有的背包栏都有2个以上的空格。");
            cm.dispose();
            return;
        }
        if (getEventPoints(1, cm.getPlayer().getId()) >= needpoints) {
            setEventPoints(1, cm.getPlayer().getId(), -needpoints);
            if (leftday <= 0) {
                cm.gainItem(itemid, quantity);
            } else {
                cm.gainItemPeriod(itemid, quantity, leftday);
            }
            status = -1;
            cm.sendOk("兑换成功了！");
        } else {
            status = -1;
            cm.sendOk("对不起，你没有足够的积分兑换。");
        }
    }
}



function getEventTimes(Eventid, charid) {//通过eventid来得到参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("times");//得到次数
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//通过eventid来得到参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("points");//得到点数
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//通过eventid来给予参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, 1);//points 点数
        insert.setString(6, getEventTimes(1, charid));//times 次数
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//通过eventid来设置参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(1, charid));//points 点数
        insert.setString(6, 1);//times 次数
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}