var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(5220040)) { //快乐百宝券
            cm.sendYesNo("冒险岛转蛋机中有各类#b装备、卷轴或稀有新奇的道具#k噢！使用“#b#t5220040##k”就可以交换. 游戏商城中的“其他”－“游戏”区里有噢。 假如不买转蛋券的话，是不可以使用我的。现在要玩转蛋机么?  ");
        } else {
            cm.sendOk("你背包里有#b#t5220040##k吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var item;
        if (Math.floor(Math.random() * 300) == 0) {
            item = cm.gainGachaponItem(1102042, 1);
        } else {
            var itemList = new Array(1032007, //祖母绿
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
            1002080, //红头巾
            1002081, //青头巾
            1002082, //黄头巾
            1002083, //黑头巾
            1002418, //废报纸头盔
            1002419, //枫叶帽
            1002424, //红马术帽
            1002425, //蓝马术帽
            1002436, //长老斯坦之帽
            1002441, //热血头带
            1002452, //黑星白头巾
            1002453, //白星黑头巾
            1002454, //红星黑头巾
            1002455, //黑星红头巾
            1002554, //武艺头绳
            1002699, //南瓜帽子
            1002777, //永恒玄妙帽
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
            1082020, //蓝色梅林手套
            1082021, //绿色梅林手套
            1082022, //紫色梅林手套
            1082062, //红精灵手套
            1082063, //蓝精灵手套
            1082064, //黑精灵手套
            1082086, //钢铁封印手套
            1082087, //黄金封印手套
            1082088, //黑封印手套
            1082131, //杰斯特手套(蓝)
            1082132, //杰斯特手套(绿)
            1082133, //杰斯特手套(红)
            1082134, //杰斯特手套(黑)
            1082145, //工地手套(黄)
            1082146, //工地手套(红)
            1082147, //工地手套(蓝)
            1082148, //工地手套(紫)
            1082149, //工地手套(褐)
            1082150, //工地手套(灰)
            1082151, //幻魔手套(绿)
            1082152, //幻魔手套(蓝)
            1082153, //幻魔手套(红)
            1082154, //幻魔手套(黑)
            1082164, //蓝色元素手套
            1082235, //永恒逍遥手套
            1082240, //重生逍遥手套
            //-------武器------
            1302016, //黄色雨伞
            1302017, //蓝色雨伞
            1302025, //红雨伞
            1302026, //黑雨伞
            1302027, //绿雨伞
            1302028, //紫雨伞
            1302029, //褐雨伞
            1302030, //枫叶剑
            1302049, //光线鞭子
            1302061, //蔓藤鞭子
            1302087, //火炬
            1312002, //镰刀
            1312012, //乾坤圈
            1312013, //判官笔
            1322003, //棒棒果
            1322006, //钢管
            1322012, //红色砖头
            1332053, //野外烧烤串
            1322057, //新加坡国旗（单手杖）
            1322058, //马来西亚国旗（单手杖）
            1372000, //妖精短杖
            1372008, //红日折扇
            1372009, //慈悲为怀
            1372010, //嗜魂法杖
            1372031, //圣贤短杖
            1372033, //圣贤短杖
            1372032, //佘太君龙杖
            1372035, //火灵珠短杖
            1372036, //毒灵珠短杖
            1372037, //冰灵珠短杖
            1372038, //雷灵珠短杖
            1372039, //- 爆炎之杖 - (无描述)
            1372040, //- 剧毒之杖 - (无描述)
            1372041, //- 寒冰之杖 - (无描述)
            1372042, //- 狂雷之杖
            1372045, // - 重生蝶翼杖 - (无描述)
            1372044, // - 永恒蝶翼杖 - (无描述)
            //------药水------
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
//------------------------------
/*3010002, //绿色时尚转椅
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
3010038, //空气沙发 
3010039, //黑色海狗靠垫 
3010040, //蝙蝠椅 
3010041, //骷髅王座
3010043, //魔女的飞扫把
//3010044, //同一红伞下
3010045, //寒冰椅子
3010046, //红龙椅 
3010047, //蓝龙椅 
3010048, //圣诞树椅子
3010049, //雪房子
3010199, //雪房子
3010050, //公主凳
3010051, //沙漠兔子1靠垫
3010052, //沙漠兔子2靠垫
3010054, //呼噜呼噜床
3010057, //血色玫瑰 
3010058, //世界末日 
3010060, //初心凳
3010062, //竹凳
3010068, //露水椅子
3010069, //大黄风
//3010070, //巨无霸品克缤
3010071, //神兽椅
3010073, //baby品克缤 
3010075, //我为音乐狂
3010077, //猫头鹰椅子
3010085, //鬼娃娃椅子
3010092, //魔女的飞扫把
3010093, //鲜美的火鸡
3010094, //漂漂猪椅子
3010095, //石头人座椅 
3010096, //恐龙化石宝座
3010098, //电视宅人
3010099, //北极熊椅子
3010100, //财神椅子
3010106, //雪狼战椅
3010110, //舒适大白熊椅子
3010111, //虎虎生威
3010112, //情书柜子
3010116, //摇滚之魂椅子
3010117, //魔法书椅子
3010118, //糖果音符椅子
3010119, //羊羊椅子
3010120, //彩蛋篮子
3010123, //夏日花朵
3010124, //都纳斯喷气椅子
3010125, //尼贝隆战舰椅
3010126, //蝙蝠魔王座
3010127, //扎昆宝座
3011000, //钓鱼用椅子
3012001, //篝火
3012002, //浴桶
3012003, //爱心椅子
3012006, //风吹稻香
3012010, //巧克力蛋糕恋人
3012011, //我爱巧克力火锅
3020000, //贪吃熊猫椅
//3020001, //撒娇喵咪椅
3010061, //枫树下
3010063, //月亮星星抱枕椅 
3010064, //棕色砂兔抱枕椅 
3010065, //粉红海滩遮阳椅 
3010066, //深蓝色绒毛沙发 
3010067, //红色设计师椅
3010080, //柿子树鞦韆 
3010081, //红帽月妙抱枕椅
3010082, //蓝帽月妙抱枕椅 
3010083, //扇子月妙抱枕椅
3010084, //太平萧月妙抱枕椅
3010097, //坚固的木椅 
3010107, //龙龙的蛋壳椅
3010108, //幼龙秋千 
3010109, //暖炉椅
3010292, //暖炉椅（可交易）
3010113, //幽魂发条熊椅子 
3010114, //俘虏我吧！椅子
3010115, //熊宝宝床
3010055, //冰雪糕丸子椅
3010137, //神龙椅子
3010149, //猫咪风扇椅
3010144, //七夕椅子
3010155, //暗影双刀的猫头鹰椅子
3010020, //澎澎檜木桶 
3010078, //大熊猫椅子
3010079, //肥猫猫椅子
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
3010157, //家族椅子
3010186, //兔子椅子
3010191, //爱情椅子
3010194, //野营篝火椅子
3010202, //传说枫叶下……
3010203, //粉红沙滩遮阳伞
3010205, //古老录音机椅子
3010206, //梦想画家椅子
3010207, //喧闹好友椅子
3010208, //黑猫椅子
3010211, //精灵王座
3010162, //果月椅子
3010163, //满月椅
3010164, //满月椅(永久)  
3010135, //节日独角兽椅子 
3010139, //私密空间
3010168, //友谊万岁椅子
3010170, //雪夜椅子
3010172, //星空椅子
3010173, //万圣节塔罗椅子
3010175, //名画家椅子
3010179, //燕尾服猫咪椅
3010169, //纸箱里“求领养”
3010171, //过来抱抱椅
3010174, //女巫炼药椅
3010182, //兔子家族椅
3010183, //胡萝卜椅子
3010299, //小幼龙椅子
3010053, //兔子纪念版椅子
3010187, //过来抱抱椅 
3010142, //水族馆椅子
3013000, //樱花树下
3010152, //黄三角帐篷椅 
3010128, //黑龙王座
3010140, //早日康复床 
3010291, //早日康复床（可交易）
3010141, //蛋糕椅子
3010151, //无人岛椅子
//3010166, //双刀同门
3010180, //HP椅子
3010181, //MP椅子
3010184, //冰钓椅子
//3010189, //克里塞椅子
//3010188, //班·雷昂椅子
3010220, //我爱蛋糕椅子
3010218, //乔克恶灵椅子
//3010293, //乔克恶灵椅子（可交易）
3010219, //绵羊酋长椅子
3010221, //我爱馅饼椅子
3010212, //藏獒椅子
3010196, //泡泡浴缸椅
3010177, //手柄座椅
//3010197, //英雄的椅子-战神。
//3010200, //英雄的椅子-龙神 
//3010201, //英雄的椅子-暗影双刀
3010161, //鼠鼠椅
3010222, //兔兔伴读椅子
3010226, //月光仙子椅子
3010281, //动物之家椅子
3010282, //送子仙鹤椅
3010283, //飞毯椅
3010288, //珍珠蚌椅子
3010195, //无价之宝椅子
3010280, //水果椅子
3010286, //诺特勒斯椅子 
3010296, //甜蜜的圣诞椅子
3010287, //精灵王座
3010290, //恶魔军团椅
3010300, //橙色HP药水椅子
3010301, //高级HP药水椅子
3010302, //超级药水椅子
3010303, //加肥抱抱椅
3010304, //恶魔绵羊椅子
3010305, //玫红手柄座椅
3010306, //生如夏花椅子
3010138, //君主休憩椅
3010311, //黑龙椅子
3010224, //年糕冰淇淋椅子
3010225, //品克缤椅子
3010257, //枫树下……
3010279, //鬼节南瓜椅子
3010320, //老奶奶读童话椅子
3010321, //阿卡伊勒读童话椅子
3010289, //老人家读童话椅子
3010356, //温馨荷花池*/
//----------------------------------
            1002425, //蓝马术帽
            1002441, //热血头带
            1002508, //枫叶头盔
            1002509, //枫叶头盔
            1002510, //枫叶头盔
            1002511 //枫叶头盔
            // ------ 093 ------------
            );
            item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "新手转蛋机");
        }
        if (item != -1) {
            cm.gainItem(5220040, -1);
            cm.sendOk("你获得了 #b#t" + item + "##k.");
        } else {
            cm.sendOk("你确实有#b#t5220040##k吗?如果是,请你确认在背包的装备,消耗,其他窗口中是否有一格以上的空间?");
        }
        cm.safeDispose();
    }
}