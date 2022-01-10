/*
 名称：特殊超值礼包礼物箱
 内容：新手1-150级成长礼包
 */

var giftMaxNum = 5;	// 礼包数量
var itemReward = new Array(// 道具id，道具数量，礼包等级
        // 1级礼包
        Array(1212063, 1), //法弗纳魔力源泉杖
Array(1222058, 1, 1), //法弗纳天使手铳
Array(1232057, 1, 1), //法弗纳死亡使者
Array(1242060, 1, 1), //法弗纳精神之刃
Array(1302275, 1, 1), //法弗纳银槲之剑
Array(1312153, 1, 1), //法弗纳双刃切肉斧
Array(1322203, 1, 1), //法弗纳戈耳迪锤
Array(1332225, 1, 1), //法弗纳大马士革剑
Array(1342082, 1, 1), //法弗纳急速之刃
Array(1362090, 1, 1), //法弗纳洞察手杖
Array(1372177, 1, 1), //法弗纳魔力夺取者
Array(1382208, 1, 1), //法弗纳魔冠之杖
Array(1402196, 1, 1), //法弗纳忏悔之剑
Array(1412135, 1, 1), //法弗纳战斗切肉斧
Array(1422140, 1, 1), //法弗纳闪电锤
Array(1432167, 1, 1), //法弗纳贯雷枪
Array(1442223, 1, 1), //法弗纳半月宽刃斧
Array(1452205, 1, 1), //法弗纳追风者
Array(1462193, 1, 1), //法弗纳风翼弩
Array(1472214, 1, 1), //法弗纳危险之手
Array(1482168, 1, 1), //法弗纳巨狼之爪
Array(1492179, 1, 1), //法弗纳左轮枪
Array(1522094, 1, 1), //法弗纳双风翼弩
Array(1532098, 1, 1), //法弗纳荣耀炮
Array(1252015, 1, 1), //法弗纳北极星魔法棒
        // 30级礼包
        Array(1002186, 1, 2),
        Array(1012057, 1, 2),
        Array(1022048, 1, 2),
        Array(1102039, 1, 2),
        Array(1302063, 1, 2),
        Array(1112252, 1, 2),
        Array(1112141, 1, 2),
        Array(2001556, 100, 2), // 包治百病药
        Array(5062002, 20, 2),
        Array(5064000, 10, 2),
        Array(3012003, 1, 2),
        Array(3010037, 1, 2),
        Array(-1, 1000, 2),


        // 60级礼包
        Array(5150040, 3, 3),
        Array(5152053, 3, 3),
        Array(5060000, 3, 3),
        Array(5072000, 50, 3),
        Array(5390018, 20, 3),
       // Array(1112793, 1, 3),
        Array(2431528, 1, 3),
        Array(3010038, 1, 3),
        Array(-1, 2000, 3),

        // 100级礼包
        Array(1003946, 1, 4),//革命帽子
        Array(1082540, 1, 4),//革命手套
        Array(1102612, 1, 4),//革命披风
        Array(1052647, 1, 4),//革命战斗服
	//Array(2432068, 1, 4),//革命武器交换卷
        Array(1072853, 1, 4),//革命鞋子
        Array(4310088, 70, 4),//RED币可兑换革命武器
        Array(1672000, 1, 4),//白银心脏
        Array(5062500, 10, 4),//大师附加神奇魔方
        Array(5064000, 10, 4),//防爆卷轴
        Array(3010046, 1, 4),//红龙椅
        Array(-1, 5000, 4),//抵用卷5000



        // 150级礼包
	Array(1132243, 1, 5),//低级贝勒德刻印腰带
	Array(1122264, 1, 5),//低级贝勒德刻印吊坠
	Array(1032220, 1, 5), //低级贝勒德耳环
	Array(1113072, 1, 5),//低级贝勒德戒指
        Array(2049122, 1, 5),//正向混沌卷轴
        Array(2049752, 1, 5),//S级潜能卷轴 30%

        Array(3010583, 1, 5),//蛇椅子
        Array(5050000, 100, 5),//洗能力点卷轴
        //Array(1142787, 1, 5),//2014圣诞节礼物勋章
        Array(4310036, 500, 5),//征服者币
        Array(5062500, 20, 5),//大师附加神奇魔方
        Array(3015007, 1, 5),//花蘑菇的圣诞节
        Array(-1, 10000, 5),//抵用卷10000点
        Array(3010045, 1, 5)//寒冰椅子
        );


function start() {
    var giftLevel = 1;
    var newItemReward = new Array();
    var playerLevel = im.getPlayer().getLevel();
    var openReqLevel = 0;
    var text = "";
    for (var i = 1; i <= 5; i++) {
        if (im.getBossLog("新手礼包" + i,1) < 1) {
            giftLevel = i;
            break;
        }
    }

    switch (giftLevel) {
        case 1:
            openReqLevel = 1;
            break;
        case 2:
            openReqLevel = 30;
            break;
        case 3:
            openReqLevel = 60;
            break;
        case 4:
            openReqLevel = 100;
            break;
        case 5:
            openReqLevel = 150;
        default:
            break;
    }

    if (giftLevel > 1 && im.getPlayer().getTodayOnlineTime() < (giftLevel * 10)) {
        im.playerMessage(1, "在线时间不足" + (giftLevel * 10) + "分钟，无法打开礼包\r\n还需坚持 " + (giftLevel * 10 - im.getPlayer().getTodayOnlineTime()) + "分钟");
        im.dispose();
        return;
    }

    if (playerLevel < openReqLevel) {
        text = "【特殊超值礼包礼物箱】\r\n(需" + openReqLevel + "级才能打开)\r\n打开后可获得下列物品：\r\n\r\n";
        for (var i = 0; i < itemReward.length; i++) {
            if (itemReward[i][2] == giftLevel) {
                if (itemReward[i][0] == -1) {
                    text += "抵用券 " + itemReward[i][1] + " 点\r\n";
                } else {
                    text += im.getItemName(itemReward[i][0]) + " × " + itemReward[i][1] + " 个\r\n";
                }
            }
        }
        im.playerMessage(1, text);
        im.dispose();
        return;
    }

    for (var i = 0; i < itemReward.length; i++) {
        if (itemReward[i][2] == giftLevel) {
            newItemReward.push(itemReward[i]);
        }
    }

    if (im.getInventory(2).isFull(newItemReward.length - 1)) {
        im.playerMessage(1, "【特殊超值礼包礼物箱】\r\n(" + openReqLevel + "级礼包)\r\n\r\n消耗栏空间不足，需要 " + newItemReward.length + " 格空间。");
        im.dispose();
        return;
    } else if (im.getInventory(3).isFull(1)) {
        im.playerMessage(1, "【特殊超值礼包礼物箱】\r\n(" + openReqLevel + "级礼包)\r\n\r\n设置栏空间不足，需要 1 格空间。");
        im.dispose();
        return;
    }

    for (var i = 0; i < newItemReward.length; i++) {
        if (newItemReward[i][0] == -1) {
            im.getPlayer().modifyCSPoints(2, newItemReward[i][1]);
            text += "抵用券 " + newItemReward[i][1] + " 点\r\n";
            continue;
        }
        im.gainItem(newItemReward[i][0], newItemReward[i][1]);
        text += im.getItemName(newItemReward[i][0]) + " × " + newItemReward[i][1] + " 个\r\n";
    }

    // 如果已经是最高级的礼包，则消耗掉
    if (giftLevel == giftMaxNum) {
        im.gainItem(2431092, -1);
    }
    im.setBossLog("新手礼包" + giftLevel, 1);
    im.playerMessage(1, "【特殊超值礼包礼物箱】\r\n(" + openReqLevel + "级礼包)\r\n恭喜您已获得：\r\n\r\n" + text);
    im.dispose();
}