var status = 0;
var text;
var sel;
var credits;
var itemlist = new Array(
	// 礼包金额，道具ID，全属性数值
	Array(10, 1112915, 1),	//蓝调戒指

	Array(100, 1142328, 10),	//VIP勋章
	Array(100, 1112793, 10),	//快乐指环

	Array(500, 1112178, 20),	//梦幻雪景名片戒指
	Array(500, 1112290, 20),	//梦幻雪景聊天戒指
	Array(500, 1190300, 20),	//白银枫叶徽章

	Array(1000, 1112941, 40),	//土豪心戒指
	Array(1000, 1112140, 40),	//白银VIP名片戒指
	Array(1000, 1112247, 40), 	//白银VIP聊天戒指
	Array(1000, 1190301, 40),	//金色枫叶徽章

	Array(2000, 1112941, 70),	//土豪心戒指
	Array(2000, 1112138, 70),       //钻石VIP聊天戒指
	Array(2000, 1112245, 70),       //钻石VIP聊天戒指
	Array(2000, 1190302, 70),	//水晶枫叶徽章

	Array(3000, 1003719, 100),	//进阶精灵帽
	Array(3000, 1112941, 100),	//土豪心戒指
	Array(3000, 1112139, 100),	//黄金VIP名片戒指
	Array(3000, 1112246, 100)	//黄金VIP聊天戒指


	);
var hypay = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
    	credits = new Array();
    	for (var i in itemlist) {
    		var contain = false;
    		for (var j in credits) {
    			if (itemlist[i][0] == credits[j]) {
    				contain = true;
    			}
    		}
    		if (!contain) {
    			credits.push(itemlist[i][0]);
    		}
    	}
    	rmb = im.getRMB();
	//cm.getSevenDayPayLog(1);//显示当天充值总金额
	//" + im.getTotalRMB() + " //显示当前总金额
    	text = "#g===============#k#e#r冲点小钱玩玩吧#g===============#k#b\r\n\r\n累计充值金额：" + im.getTotalRMB() + "    当天充值金额：" + im.getSevenDayPayLog(1) + "   \r\n#r温馨提示：首冲礼包只能领取一次，礼包有效期七天，七天后自动消失，没有领取的请自行承担后果\r\n#b请选择金额查看奖励：\r\n#b";//\r\n开服七天内单笔充值1000元赠送160级埃苏布莱斯武器一把
    	for (var i in credits) {
    		text += "#L" + i + "#查看" + credits[i] + "元礼包\r\n";
    	}
    	im.sendSimple(text);
    } else if (status == 1) {
    	sel = selection;
    	text = "以下是 " + credits[sel] + " 元首次充值礼包的内容：\r\n\r\n#b领取奖励后礼包自动消失，你确定要领取吗？\r\n#r";
		for (var i in itemlist) {
			if (itemlist[i][0] == credits[sel]) {
				text += "#i" + itemlist[i][1] + "# #z" + itemlist[i][1] + "# 全属性+" + itemlist[i][2] + "\r\n";
			}
		}
		text += "\r\n#b#L0#我确定领取首次充值礼包#l";
		im.sendSimple(text);
    } else if (status == 2) {
    	//if (rmb < credits[sel]) {
	 if (im.getSevenDayPayLog(1).get(0) < credits[sel]) {
    		im.sendOk("您今天充值总额不足 " + credits[sel] + " 元，请在今天充值足够的金额再来领取。或者选择您今日充值最大金额的礼包领取\r\n\r\n#r特殊说明：首冲礼包领取条件为当天累计充值金额最大值，并不是7天累计金额哦。");
    		im.dispose();
    		return;
    	}
		im.gainItem(2430499, -1);
    	if (im.getBossLogAcc("首冲礼包" + credits[sel] + "元首冲礼包") == -1) {
    		im.sendOk("您已经领取过该奖励。");
    		im.dispose();
    		return;
    	}
    	if (im.getSpace(1) < getSize(credits[sel])) {
    		im.sendOk("装备栏空间不足" + getSize(credits[sel]) + "格");
    		im.dispose();
    		return;
    	}

		var ii = im.getItemInfo();
		for (var i in itemlist) {
			if (itemlist[i][0] == credits[sel]) {
				var itemid = itemlist[i][1];
				var stat = itemlist[i][2];
				var toDrop = ii.randomizeStats(ii.getEquipById(itemid)).copy();
				toDrop.setStr(stat);
				toDrop.setDex(stat);
				toDrop.setInt(stat);
				toDrop.setLuk(stat);
				toDrop.setWatk(stat);
				toDrop.setMatk(stat);
				im.addFromDrop(im.getC(), toDrop, true);
			}
		}
		im.setBossLogAcc("首冲礼包" + credits[sel] + "元首充礼包", -2);
		im.sendOk("领取成功");
		im.worldSpouseMessage(0x23,"『首冲礼包彩虹箱』：玩家 "+ im.getChar().getName() +" 领取了" + credits[sel] + "元首次充值礼包！");
		im.worldSpouseMessage(0x23,"『首冲礼包彩虹箱』：玩家 "+ im.getChar().getName() +" 领取了" + credits[sel] + "元首次充值礼包！");
		im.worldSpouseMessage(0x23,"『首冲礼包彩虹箱』：玩家 "+ im.getChar().getName() +" 领取了" + credits[sel] + "元首次充值礼包！");
		im.dispose();
    }
}

function getSize(edu) {
	var ret = 0;
	for (var i in itemlist) {
		if (itemlist[i][0] == edu) {
			ret++;
		}
	}
	return ret;
}
