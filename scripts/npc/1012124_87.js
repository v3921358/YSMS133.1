var status = 0;
var bossid = "等级礼包";
var giftLevel = Array(100,150,180,210,220,230,240,250);
var giftContent = Array(
	//Array(4032521, 1, 1), //VIP邀请卷
	//Array(4001714, 1, 1), //定居金100W
	//60级
	//Array(2615002, 10, 2), //低级贝勒德卷轴
	//Array(2431098, 1, 2), //低级贝勒德随机
	//Array(2431097, 1, 2), //伤害皮肤箱子
	//Array(5062000, 2, 2), //神奇魔方
	//Array()

	//100级
	Array(5150040, 3, 1), //皇家理发卷
	Array(5152053, 3, 1), //皇家整容卷
	//Array(1072853, 1, 1),//革命鞋子
	//Array(1003946, 1, 1),//革命帽子
	//Array(1102612, 1, 1),//革命披风
	//Array(1082540, 1, 1),//革命手套
	//Array(1052647, 1, 1),//革命战斗服
	//Array(2432068, 1, 1),//革命武器箱
	//Array(4310088, 100, 1),//RED币
	Array(2431741, 2, 1), //抵用券3000
	Array(4001839, 100, 1),//星星
	Array(2049135, 5, 1), //惊人正义20%2340000
	Array(4001714, 2, 1), //定居金100W

	//150级
	//Array(2431944, 1, 4), //140级武器箱子
	//Array(2430226, 1, 2), //乱斗翅膀
	Array(5150040, 5, 2), //皇家理发卷
	Array(5152053, 5, 2), //皇家整容卷
	Array(1132243, 1, 2), //低级贝勒
	Array(1113072, 1, 2), //低级贝勒
	Array(5062009, 100, 2),
	Array(4001839, 300, 2),//星星
	Array(2049135, 10, 2), //惊人正义20%2340000
	//Array(2049124, 2, 2), //正向


	//180
	Array(2049135, 10, 3), //惊人正义20%2340000
	Array(2431741, 3, 3), //抵用券3000
	Array(2432836, 1, 3), 
	Array(5062009, 200, 3),
	Array(2049135, 20, 3), //惊人正义20%2340000
	//Array(2433653, 3, 3),
	Array(1032220, 1,3),//低级贝勒
	Array(1122264, 1, 3),//低级贝勒
	Array(4001839, 500, 3),//星星

       //210
	Array(2431944, 1, 4), //140级武器箱子
	Array(5150040, 10, 4), //皇家理发卷
	Array(5152053, 10, 4), //皇家整容卷
	Array(2431741, 1, 4), //抵用券3000
	Array(5062009, 200, 4), //高级魔方
	Array(5064000, 5, 4), //防爆
	//Array(2049116, 10, 4), //强化
	Array(2049135, 30, 4), //惊人正义20%2340000
	Array(2049124, 5, 4), //正向混沌
	//Array(2433653, 5, 4),
	Array(4001839, 1000, 4),//星星
	//Array(2431945, 1, 4), //140防具箱子

	//220级

	//Array(2431945, 1, 5), //140防具箱子
	Array(4001839, 5000, 5),//星星
	Array(5150040, 20, 5), //皇家理发卷
	Array(5152053, 20, 5), //皇家整容卷
	Array(5062009, 300, 5),
	Array(5062500, 10, 5),
	Array(2049124, 10, 5), //正向混沌
	Array(2049135, 50, 5), //惊人正义20%2340000
	Array(2431741, 1, 5), //抵用券3000
	//Array(4033924, 2, 5), //神话耳环蓝图
	Array(4001714, 50, 5),// 定居金100W
	//Array(2433654, 2, 5),
	Array(3010592, 1, 5), 
	Array(1112915, 1, 5),
	//Array(2433654, 8, 5),

	//230
	Array(4001839, 10000, 6),//星星
	Array(3010894, 1, 6),//一杯咖啡屋椅子
	Array(5062009, 500, 6),
	Array(5062500, 500, 6),
	Array(2049323, 20, 6),  //无损
	Array(2049752, 3, 6),  //S 潜能 30%
	Array(2431741, 5, 6), //抵用券3000
	//Array(2431725, 1, 6), //热力四射蜡笔箱子
	Array(2049124, 20, 6), //正向混沌
	Array(2049135, 100, 6), //惊人正义20%2340000
	Array(4001715, 2, 6),// 定居金1E

	//240级
	Array(4001839, 20000, 7),//星星
	Array(3010853, 1, 7),//心花怒放椅子
	Array(5150040, 30, 7), //皇家理发卷
	Array(5152053, 30, 7), //皇家整容卷
	Array(2431725, 1, 7), //热力四射蜡笔箱子
	//Array(2431945, 1, 7), //140防具箱子
	//Array(2431945, 1, 7), //140防具箱子
	Array(5062009, 500, 7),
	Array(5062500, 300, 7),
	Array(2431741, 50, 7), //抵用券3000
	Array(4001715, 5, 7),// 定居金1E
	//Array(5062000, 50, 7),
	//Array(5062002, 50, 7),
	//Array(5062500, 50, 7),
	Array(2049323, 20, 7),  //无损
	Array(2049752, 10, 7),  //S 潜能 30%
	//Array(2049116, 10, 7), //惊人正义20%2340000
	Array(2049124, 30, 7), //正向混沌
	Array(2049135, 200, 7), //惊人正义20%2340000
	//Array(2433654, 10, 7),

	//250级
	Array(4001839, 20000, 8),//星星
	Array(3015051, 1, 8),//巨无霸国际巨星椅子

	Array(2431938, 1, 8), //法笑纳武器箱子
	Array(5150040, 50, 8), //皇家理发卷
	Array(5152053, 50, 8), //皇家整容卷
	//Array(2433654, 30, 8),
	//Array(3010879, 1, 8),
	Array(4001715, 10, 8),// 定居金1E
	Array(5062009, 1000, 8),
	Array(5062500, 500, 8),
	Array(5064000, 100, 8),
	Array(2049323, 50, 8),  //无损
	Array(2049752, 20, 8),  //S 潜能 30%
	Array(2049116, 50, 8), //强化混沌
	Array(2049124, 50, 8), //正向混沌
	Array(2049135, 300, 8) //惊人正义20%2340000
	//Array(2431995, 1, 8), //惊人卷轴箱子


)
var giftId = -1;
var giftToken = Array();
var gifts = null;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		var text = "";
		text += "嘿，我为你准备了许多宝贝，等你达到相应等级的时候就可以领取了，另外点击可以查看礼包内容呢，快抢先看看吧！\r\n";
		for(var key in giftLevel) {
			var tips = "";
			giftToken[key]=false;
			if (cm.getChar().getLevel()>=giftLevel[key]) {
				if (cm.getBossLog(bossid+key) >= 0) {
					tips = "(可领取)";
					giftToken[key]=true;
				} else {
					tips = "#g(已领取)#b";
				}
			} else {
				tips = "#r(等级不足)#b";
			}
			text+="#b#L"+(parseInt(key)+1)+"#领取#r#e"+giftLevel[key]+"#n#b级等级礼包 "+tips+"#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text="#r#e"+giftLevel[giftId-1]+"#n#b级礼包内容：\r\n";
		gifts = getGift(giftId);
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#v"+itemId+"##b#t"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n#d是否现在就领取该礼包？#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
				cm.sendOk("您的背包空间不足，请保证每个栏位至少8格的空间，以避免领取失败。");
				cm.dispose();
				return ;
			}
			if (giftToken[giftId-1]) {
				cm.setBossLog(bossid+(giftId-1),0,-2);
				for(var key in gifts) {
					var itemId = gifts[key][0];
					var itemQuantity = gifts[key][1];
					cm.gainItem(itemId, itemQuantity);
				}
				cm.sendOk("恭喜您，领取成功！快打开包裹看看吧！");
				cm.dispose();
			} else {
				status = -1;
				cm.sendSimple("您已经领过了该礼包或者等级未达到要求，无法领取。");
			}
		} else {
			cm.sendOk("领取错误！请联系管理员！");
			cm.dispose();
		}
	}
}
function getGift(id) {
	var lastGiftContent = Array();
	for (var key in giftContent) {
		if (giftContent[key][2]==id)
			lastGiftContent.push(giftContent[key]);
	}
	return lastGiftContent;
}