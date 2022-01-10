var status = 0;
var bossid = "充值额外礼包";
var giftLevel = Array(100, 300, 500, 1000, 2000, 3000, 5000, 8000);
var giftContent = Array(

//礼包1=100元礼包
//Array(1112793, 1, 1),//快乐指环
Array(2049135, 20, 1),//惊人20%卷
Array(5062009, 50, 1),//超级魔方
Array(5062500, 50, 1),//大师附加魔方
Array(4001839, 500, 1), //星星
//Array(5750000, 10, 1),//星岩魔方

//礼包2=300元礼包
Array(2431194, 1, 2),//冒险心自选箱
Array(2049135, 50, 2),//惊人20%卷
Array(5062009, 100, 2),//超级魔方
Array(5062500, 100, 2),//大师附加魔方
Array(4001839, 1000, 2), //星星

//礼包3=500元礼包
Array(2431938, 1,3),//法弗纳武器材料箱
Array(2049135, 100, 3),//惊人20%卷
Array(5062009, 200, 3),
Array(5062500, 200, 3),
Array(4001839, 2000, 3),//星星
//Array(5750000, 30, 3),//星岩魔方

//礼包4=1000元礼包
//Array(2432341, 1, 4),//鲁塔比斯防具箱子随机箱子
Array(2433245, 1, 4), //鲁塔比斯防具自选套装
Array(2049137, 20, 4),//惊人40%卷
Array(2340000, 50, 4),//祝福卷
Array(5062009, 500, 4),//超级魔方
Array(5062500, 500, 4),//大师附加魔方
Array(4001839, 3000, 4),//星星
//Array(5750000, 50, 4),//星岩魔方

//礼包5=2000元礼包
Array(1113075, 1, 5),//最高级贝勒德戒指
Array(1032223, 1, 5),//耳环
Array(1122267, 1, 5),//吊坠
Array(1132246, 1, 5),//腰带
Array(2049137, 30, 5),//惊人40%卷
Array(2340000, 80, 5),//祝福卷
Array(5750000, 50, 5),//星岩魔方
Array(5062024, 50, 5),//闪炫魔方
Array(4001839, 4000, 5),//星星

//礼包6=3000元礼包
Array(2433247, 1, 6), //暴君套装自选箱
Array(2049137, 50, 6),//惊人40%卷
Array(2340000, 100, 6),//祝福卷
Array(5750000, 100, 6),//星岩魔方
Array(5062024, 100, 6),//闪炫魔方
Array(4001839, 5000, 6),//星星

//礼包7=5000元礼包
Array(2049137, 100, 7),//惊人40%卷
Array(2340000, 200, 7),//祝福卷
Array(5750000, 200, 7),//星岩魔方
Array(5062024, 200, 7),//闪炫魔方
Array(4001839, 8000, 7),//星星
Array(3994417, 1, 7),//蜡笔
Array(3994418, 1, 7),
Array(3994419, 1, 7),
Array(3994420, 1, 7),
Array(3994421, 1, 7),
Array(3994422, 1, 7),


//礼包8=8000元礼包
Array(2049137, 200, 8),//惊人40%卷
Array(2340000, 300, 8),//祝福卷
Array(5750000, 300, 8),//星岩魔方
Array(5062024, 300, 8),//闪炫魔方
Array(4001839, 10000, 8),//星星
Array(3994417, 3, 8),//蜡笔
Array(3994418, 3, 8),
Array(3994419, 3, 8),
Array(3994420, 3, 8),
Array(3994421, 3, 8),
Array(3994422, 3, 8)


)

var equiplist = new Array(
	Array(1, 1112793, 10, 10, 10, 10, 10, 10, 0, 0, 0),//快乐戒指对应上面的礼包1，全属性+10，最后3个0代表3条潜能，0为不给潜能
	Array(7, 1112941, 100, 100, 100, 100, 100, 100, 0, 0, 0)//土豪心
	//Array(33, 1003843, 20, 20, 20, 20, 15, 15, 0, 0, 0)

	//Array(34, 1522094, 102, 100, 100, 100, 200, 200, 40601, 40291, 40081)
);


var giftId = -1;
var giftToken = Array();
var gifts = null;
var column = new Array("装备", "消耗", "设置", "其他", "商城");

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
		text += "您好，累计充值达到以下要求即可领取累计充值额外礼包！\r\n#d您当前累计充值金额：#n#r￥" + cm.getTotalRMB() + "#k   #g请下拉查看领取奖励#k\r\n";
		text += "#r累计充值满100元可以获得下列道具：\r\n#b全属性+10快乐指环x1，惊人强化卷20%x20个，超级魔方x50个，大师附加魔方x50个，强化星星x500个#k\r\n";
		text += "#r累计充值满300元可以获得下列道具：\r\n#b本职业冒险心x1，惊人强化卷20%x50个，超级魔方x100个，大师附加魔方x100个，强化星星x1000个#k\r\n";
		text += "#r累计充值满500元可以获得下列道具：\r\n#bFFN武器自选箱x1,惊人强化卷20%x100个，超级魔方x300个，大师附加魔方x200个，强化星星x2000个#k\r\n";
		text += "#r累计充值满1000元可以获得下列道具：\r\n#b鲁塔比斯防具x1套,惊人强化卷40%x20个,祝福卷x50个,超级魔方x500个，大师附加魔方x300个，强化星星x3000个#k\r\n";
		text += "#r累计充值满2000元可以获得下列道具：\r\n#b最高级贝勒德饰品x1套,惊人强化卷40%x30个,祝福卷x80个,闪炫魔方x50个，星岩魔方x50，强化星星x4000个#k\r\n";
		text += "#r累计充值满3000元可以获得下列道具：\r\n#b暴君防具x1套,惊人强化卷40%x50个,祝福卷x100个,闪炫魔方x100个，星岩魔方x100个，强化星星5000x个#k\r\n";
		text += "#r累计充值满5000元可以获得下列道具：\r\n#b全属性+100土豪心x1，惊人强化卷40%x100个,祝福卷x200,闪炫魔方x200个，星岩魔方x200个，六色蜡笔x1套，强化星星x8000个#k\r\n";
		text += "#r累计充值满8000元可以获得下列道具：\r\n#b满卷完美潜能自选武器x1（该武器需找客服领取）,惊人强化卷40%x200个,祝福卷x300个,闪炫魔方x300个，星岩魔方x300个，六色蜡笔x3套，强化星星x10000个#k\r\n";
		text += "#r累计充值满10000元找客服详谈#k\r\n";
		text += "#b请选择金额领取奖励，每项奖励同一账户限领1次#k\r\n";
		for (var key in giftLevel) {
			var tips = "";
			giftToken[key] = false;
			if (cm.getTotalRMB() >= giftLevel[key]) {
				if (cm.getBossLogAcc(bossid + key) != -1) {
					tips = "(可领取)";
					giftToken[key] = true;
				} else {
					tips = "#g(已领取)#b";
				}
			} else {
				tips = "#r(条件不足)#b";
			}
			text += "#b#L" + (parseInt(key) + 1) + "#领取#r#e" + giftLevel[key] + "#n#b元充值额外礼包 " + tips + "#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text = "#r#e" + giftLevel[giftId - 1] + "#n#b元充值额外礼包内容：\r\n";
		gifts = getGift(giftId);
		for (var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text += "#v" + itemId + "##b#t" + itemId + "##k #rx " + itemQuantity + "#k\r\n";
		}
		for (var key in equiplist) {
			if (giftId == equiplist[key][0]) {
				text += "#v" + equiplist[key][1] + "##b#t" + equiplist[key][1] + "##k #rx 1\r\n";
			}
		}
		text += "\r\n#d是否现在就领取该礼包？#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId != -1 && gifts != null) {
			var bagsolt = new Array(0, 0, 0, 0, 0);
			for (var key in gifts) {
				bagsolt[Math.floor(gifts[key][0] / 1000000) - 1]++;
			}
			for (var key in equiplist) {
				if (giftId == equiplist[key][0]) {
					bagsolt[Math.floor((equiplist[key][1]) / 1000000) - 1]++;
				}
			}
			for (var key in bagsolt) {
				if (cm.getSpace(parseInt(key) + 1) < bagsolt[key]) {
					cm.sendOk("您的" + column[key] + "栏位空间不足" + bagsolt[key] + "格，请清理后再来领取。");
					cm.dispose();
					return;
				}
			}
			if (giftToken[giftId - 1]) {
				cm.setBossLogAcc(bossid + (giftId - 1), -2);
				for (var key in gifts) {
					var itemId = gifts[key][0];
					var itemQuantity = gifts[key][1];
					cm.gainItem(itemId, itemQuantity);
				}
				for (var key in equiplist) {
					if (giftId == equiplist[key][0]) {
						var equipinfo = equiplist[key];
						var equip = cm.getItemInfo().getEquipById(equipinfo[1]);
						equip.setStr(equipinfo[2]);
						equip.setDex(equipinfo[3]);
						equip.setInt(equipinfo[4]);
						equip.setLuk(equipinfo[5]);
						equip.setWatk(equipinfo[6]);
						equip.setMatk(equipinfo[7]);
						equip.setPotential1(equipinfo[8]);
						equip.setPotential2(equipinfo[9]);
						equip.setPotential3(equipinfo[10]);
						equip.setOwner(cm.getPlayer().getName());
						cm.addFromDrop(cm.getC(), equip, true);
					}
				}
				cm.sendOk("恭喜您，领取成功！快打开包裹看看吧！");
				cm.channelMessage(0x18, "『充值额外礼包』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了 " + giftLevel[giftId - 1] + "元 充值额外礼包。");
				cm.dispose();
			} else {
				status = -1;
				cm.sendSimple("您已经领过了该礼包或者充值金额未达到要求，无法领取。");
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
		if (giftContent[key][2] == id)
			lastGiftContent.push(giftContent[key]);
	}
	return lastGiftContent;
}