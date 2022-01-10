var status = 0;
var bossid = "充值额外礼包";
var giftLevel = Array(1000, 2000, 3000, 5000);
var giftContent = Array(


//礼包1=1000元礼包
Array(2431194, 1, 1),//冒险心自选箱子1个
Array(2434228, 1, 1), //鲁塔比斯防具自选箱1个

//礼包2=2000元礼包
Array(2434228, 1, 2),//鲁塔比斯防具自选箱1个
Array(2432715, 1, 2),//暴君套装自选箱1个

//礼包3=3000元礼包
Array(2434228, 1, 3),//鲁塔比斯防具自选箱1个
Array(2432715, 1, 3),//暴君套装自选箱1个
Array(2434006, 2, 3),//最高贝勒德自选箱2个

//礼包4=5000元礼包
Array(2432715, 2, 4),//暴君套装自选箱2个
Array(2434006, 2, 4)//最高贝勒德自选箱2个
//Array(1112941, 1, 4),//全属性+100的土豪心1个


)

var equiplist = new Array(
	//Array(1, 1112793, 10, 10, 10, 10, 10, 10, 0, 0, 0),//快乐戒指对应上面的礼包1，全属性+10，最后3个0代表3条潜能，0为不给潜能
	Array(4, 1112941, 100, 100, 100, 100, 100, 100, 0, 0, 0)//土豪心
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
		text += "您好，累计充值达到以下要求即可领取累计充值额外礼包！\r\n#d您当前累计充值金额：#n#r￥" + cm.getTotalRMB() + "#k   #k\r\n";
		text += "#r累计充值满1000元可以获得下列道具：\r\n#b冒险心自选箱子1个，鲁塔比斯防具自选箱1个#k\r\n";
		text += "#r累计充值满2000元可以获得下列道具：\r\n#b鲁塔比斯防具自选箱1个、暴君防具套装自选箱1个#k\r\n";
		text += "#r累计充值满3000元可以获得下列道具：\r\n#b鲁塔比斯防具自选箱1个、暴君防具套装自选箱1个、最高贝勒德自选箱2个#k\r\n";
		text += "#r累计充值满5000元可以获得下列道具：\r\n#b暴君防具套装自选箱2个、最高贝勒德自选箱2个、全属性+100土豪心1个#k\r\n";
		text += "#r累计充值满10000元找客服详谈#k #g请下拉查看领取奖励\r\n";
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
				//cm.channelMessage(0x18, "『充值额外礼包』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了 " + giftLevel[giftId - 1] + "元 充值额外礼包。");
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