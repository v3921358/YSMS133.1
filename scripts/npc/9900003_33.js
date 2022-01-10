var status = 0;
var bossid = "等级礼包";
var giftLevel = Array(120,150,200,250);
var giftContent = Array(
	//120
	Array(5062010, 10, 1),
	Array(5072000, 10, 1),  
	Array(2431741, 1, 1), 
	Array(2049116, 1, 1),
	Array(2433646, 1, 1),
	//150
	Array(2432836, 1, 2), 
	Array(5062010, 20, 2), 
	Array(2431741, 1, 2),
	Array(2433653, 1, 2), 
	Array(2614002, 1, 2),
	//200
	Array(3010592, 1, 3), 
	Array(1112915, 1, 3),
	Array(1142249, 1, 3),
	Array(1003722, 1, 3),
	Array(2433654, 2, 3),
	//250级
	Array(1132244, 1, 4),
	Array(1122265, 1, 4),
	Array(1032221, 1, 4),
	Array(1113073, 1, 4),
	Array(2433654, 3, 4)
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
		text += "#d当您的等级达到要求后可在我这里领取一些很不错的道具，怎么样，想要吗? 快抢先看看吧！\r\n\r\n";
		for(var key in giftLevel) {
			var tips = "";
			giftToken[key]=false;
			if (cm.getChar().getLevel()>=giftLevel[key]) {
				if (cm.getBossLog(bossid+key, 1) < 1) {
					tips = "(可领取)";
					giftToken[key]=true;
				} else {
					tips = "#g(已领取)#b";
				}
			} else {
				tips = "#r(等级不足)#b";
			}
			text+="#b#L"+(parseInt(key)+1)+"#领取 #r#e"+giftLevel[key]+"#n#b 级等级礼包 "+tips+"#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text="#b领取 #r#e"+giftLevel[giftId-1]+"#n#b 级礼包可获得以下道具：\r\n\r\n";
		gifts = getGift(giftId);
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#v"+itemId+"#  #b#z"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n- #e#d管理提示：#k#n#d点击是领取道具，点否返回上一页。#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
				cm.sendOk("您的背包空间不足，请保证每个栏位至少8格的空间，以避免领取失败。");
				cm.dispose();
				return ;
			}
			if (giftToken[giftId-1]) {
				cm.setBossLog(bossid+(giftId-1),1,1);
				for(var key in gifts) {
					var itemId = gifts[key][0];
					var itemQuantity = gifts[key][1];
					cm.gainItem(itemId, itemQuantity);
				}
				cm.playerMessage(1, "恭喜您，领取成功！快打开包裹看看吧！");
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