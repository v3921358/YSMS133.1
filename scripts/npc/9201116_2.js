var status = 0;
var bossid = "首冲礼包";
var giftLevel = Array(1, 10, 100, 500, 1000, 2000);
var giftContent = Array(
	Array(5062000, 10, 1),

	Array(5062002, 10, 2),
	Array(5062500, 10, 2),
	Array(1112793, 1, 2),

	Array(5062009, 10, 3),
	Array(2049135, 5, 3),
	Array(2430640, 1, 3),

	Array(5062009, 50, 4),
	Array(5062500, 50, 4),
	Array(2430640, 10, 4),
	Array(3994417, 1, 4),

	Array(3994417, 1, 5),
	Array(3994418, 1, 5),
	Array(3994419, 1, 5),
	//Array(3994420, 1, 5),
	//Array(3994421, 1, 5),
	//Array(3994422, 1, 5),
	Array(5062009, 100, 5),
	Array(5062500, 100, 5),
	Array(2430640, 20, 5),

	Array(3994417, 1, 6),
	Array(3994418, 1, 6),
	Array(3994419, 1, 6),
	Array(3994420, 1, 6),
	Array(3994421, 1, 6),
	Array(3994422, 1, 6),
	Array(5062009, 200, 6),
	Array(5062500, 200, 6),
	Array(2430640, 30, 6)
)

var equiplist = new Array(
	Array(1, 1482168, 100, 100, 100, 100, 200, 200, 40601, 40291, 40081),
	Array(2, 1492179, 101, 100, 100, 100, 200, 200, 40601, 40291, 40081),
	Array(2, 1522094, 102, 100, 100, 100, 200, 200, 40601, 40291, 40081)
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
		text += "2015年7月10日至2015年7月16日期间，累计充值达到以下要求即可领取开服首冲礼包！\r\n\r\n\t#e#d您当前的累计充值金额：#n#r￥" + cm.getTotalRMB() + "#k\r\n";
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
			text += "#b#L" + (parseInt(key) + 1) + "#领取#r#e" + giftLevel[key] + "#n#b元首冲礼包 " + tips + "#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text = "#r#e" + giftLevel[giftId - 1] + "#n#b元首冲礼包内容：\r\n";
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
				cm.channelMessage(0x18, "『首冲礼包』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了 " + giftLevel[giftId - 1] + "元 首冲礼包。");
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