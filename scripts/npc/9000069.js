var icon = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/Basic.img/BtMin2/normal/0#";
var typed = 1;
var cost = 5;
var itemid = 0;
var paynx = 20;
var equip = null;
var btnOk = "#fUI/CashShop.img/CSCoupon/BtOK/normal/0#";
var btnOk_disabled = "#fUI/CashShop.img/CSCoupon/BtOK/disabled/0#";
var isUpgrade = false;
var dropGrade = 0;
var successRate = 0;
var position = -1;
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
		var text = "唔嘛弥呗呗弘~又一件惊世神装要诞生了……\r\n#b[#z4310023#] 请去星币商城的礼包里面购买\r\n#b";
		text += "#L1##r时装强化升星系统简介#l#b\r\n\r\n";
		text += "#L2#" + icon2 + " 开始强化时装#l\r\n";
		text += "#L3#" + icon2 + " 领取每日星级福利#l\r\n";
		//text+="#L3#"+icon2+" 点卷觉醒时装 #rx"+cost[1]+"/次#b#l\r\n";
		//text+="#L4#"+icon2+" 幸运的铜币觉醒时装 #rx"+cost[2]+"/次#l\r\n";
		//text+="#L5#"+icon2+" 一键神级觉醒 #r#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			typed = 1;
			//var text="当玩家的等级达到#e#r120#n#k级时可以使用时装觉醒系统，时装觉醒系统能够为你的点装增加一定的#b力量、敏捷、智力、运气、攻击力、魔法力、命中值#k，目前可以使用游戏币、点卷、幸运的铜币激活点装，每种觉醒的方式带来的能力效果都不同。\r\n"+icon+" 使用#r游戏币#k觉醒点装只能为点装增加#b力量、敏捷、智力、运气#k这四个属性值，并且能力值均为#r1#k\r\n"+icon+" 使用#b点卷#k觉醒点装，能为点装增加上述所有能力值，并且随机波动#r1-3#k点\r\n"+icon+" 使用#b幸运的铜币#k则能够随机出现波动#r2-6#k点，并有几率产生全属性#b+15#k的#r神级觉醒#k\r\n\r\n#r#e(*) 觉醒后的点装可以重复觉醒";
			var text = "#d#e什么是时装升星？#n#k\r\n";
			text += "\t时装升星指的是为没有属性的点装赋予强大的属性，赋予的属性包括#b力量、敏捷、智力、运气、魔法力、HP、MP、攻击力、回避值#k。\r\n";
			text += "\r\n#d#e如何为时装升星？#n#k\r\n";
			text += "\t时装升星需要消耗#t4310023#和极其少量的点卷。最高可强化至15星。可以强化的部位只有：#b武器、帽子、披风、上衣、裤子、长袍、手套、鞋子#k\r\n";
			//text += "\t#b1~5星#k：时装#b【力量、敏捷、智力、运气】#r+1#k\r\n";
			//text += "\t#b6~10星#k：时装#b【力量、敏捷、智力、运气】#r+1，#b【魔法力、攻击力】#r+1,#b【HP、MP】#r+30#k\r\n";
			//text += "\t#b11~15星#k：时装#b【力量、敏捷、智力、运气】#r+1，#b【魔法力、攻击力】#r+3,#b【HP、MP】#r+50#k\r\n";
			//text+="\t#b神级觉醒#k：使用#d幸运的铜币#k有几率将时装觉醒的等级激活为神级觉醒的效果，使得时装#b【力量、敏捷、智力、运气、魔法力、攻击力、回避值】#d属性值#r+15#k#k\r\n";
			text += "\r\n#d#e如何获得星级福利？#n#k\r\n";
			text += "\t当身上穿戴和背包中的时装超过#r2件、5件、8件#k达到#b10星#k以上品质，可以领取较多的奖励。\r\n";
			text += "\t当身上穿戴和背包中的时装超过#r2件、5件、8件#k达到#b15星#k以上品质，可以领取丰厚的奖励。\r\n";
			text += "\r\n#d#e其他说明：#n#k\r\n";
			text += "\t部分等级在强化失败时可能会产生星级倒退的现象。12~15星强化如果失败，星级必然下降。\r\n";
			cm.sendPrev(text);
		} else if (selection == 2) {
			position = -1;
			isUpgrade = false;
			inventoryType = 1;
			var list = cm.getInventory(inventoryType).list();
			var itemList = list.iterator();
			text = "#e请选择您要强化的点装#n\r\n\r\n#b";
			var indexof = 1;
			newItemList = Array();
			while (itemList.hasNext()) {
				var item = itemList.next();
				if (cm.isCash(item.getItemId())) {
					if (getItemType(item.getItemId())==-1)
						continue; 
					if (item.getEnhance() >= 15)
						continue;
					newItemList[item.getPosition()] = item.getItemId();
				}
			}
			for (var key in newItemList) {
				text += "#L" + key + "##v" + newItemList[key] + "#";
				if (indexof > 1 && indexof % 5 == 0) {
					text += "\r\n";
				}
				indexof++;
			}
			cm.sendSimple(text);
		} else if (selection == 3) {
			if (cm.getBossLog("每日星级福利") >= 1) {
				cm.sendOk("您今天已经领悟过星级福利，无法再次领取。");
				cm.dispose();
				return ;
			}
			var q = getStarEquipQuantity();
			var q1=q[0];
			var q2=q[1];
			var giftList = Array();
			var text = "";
			text = "系统检测到您身上#b15星品质#k以上的星级时装共有#r"+q2+"#k件，您成功领取到了以下奖励：\r\n";
			if (q2<2) {
				//10星奖励
				text = "系统检测到您身上#b10星品质#k以上的星级时装共有#r"+q1+"#k件，您成功领取到了以下奖励：\r\n";
				if (q1 >= 8){
					giftList = Array(
						Array(5062009, 200),
						Array(2430481, 5), //高级碎片
						Array(2430915, 5), //附加碎片
						Array(2431893, 5) //红色碎片
					);
					//text = "系统检测到您身上#b10星品质#k以上的星级时装共有#r"+q1+"#k件，您成功领取到了一下奖励：\r\n";
				} else if (q1>=5) {
					giftList = Array(
						Array(5062009, 100),
						Array(2430481, 5) //高级碎片
					);
					//text = "系统检测到您身上#b10星品质#k以上的星级时装共有#r"+q1+"#k件，您成功领取到了一下奖励：\r\n";
				} else if (q1>=2) {
					giftList = Array(
						Array(5062009, 50)
					);
				}
			} else if (q2>=8) {
				giftList = Array(
					Array(4001839, 1000),
					Array(5062500, 100), //附加碎片
					Array(5062009, 200) //红色碎片
				);
			} else if (q2>=5) {
				giftList = Array(
					Array(4001839, 500),
					Array(2430481, 15), //高级碎片
					Array(2430915, 15), //附加碎片
					Array(2431893, 15) //红色碎片
				);
			} else if (q2>=2) {
				giftList = Array(
					Array(4001839, 100),
					Array(2430481, 10), //高级碎片
					Array(2430915, 10), //附加碎片
					Array(2431893, 10) //红色碎片
				);
			}
			if (giftList.length!=0) {
				
				for(var key in giftList) {
					var itemid = giftList[key][0];
					var itemquantity = giftList[key][1];
					cm.gainItem(itemid, itemquantity);
					text+="#b#v"+itemid+"##t"+itemid+"# #rx"+itemquantity+"#k\r\n";
				}
				cm.setBossLog("每日星级福利");
				cm.sendOk(text);
				cm.dispose();
			} else {
				status = 0;
				cm.sendSimple("您还没有达到领取星级福利的要求，详情请查看\r\n#r#L1#时装升星系统简介#l#k");
			}
		}
	} else if (status == 2) {
		if (position == -1)
			position = selection;
		if (position != -1) {
			equip = cm.getInventory(1).getItem(position);
			if (equip == null) {
				cm.sendOk("未知错误 Error Code 9000069 1");
				cm.dispose();
				return;
			}
			itemid = equip.getItemId();
			if (!cm.isCash(itemid)) {
				cm.sendOk("选择的道具并非时装，无法升星");
				cm.dispose();
				return;
			}
			var currentStar = equip.getEnhance();
			if (currentStar >= 15) {
				cm.sendOk("当前装备已强化至最高星级，无法继续强化。");
				cm.dispose();
				return;
			}
			calcRate(currentStar + 1);
			//强化操作区
			if (isUpgrade) {
				if (!cm.haveItem(4310023, cost) || cm.getPlayer().getCSPoints(1) < paynx) {
					cm.sendOk("您的点卷或者幸运的铜币不足，请检查！");
					cm.dispose();
					return;
				}
				var successChance = Math.floor(Math.random() * 100);
				if (successRate >= successChance) {
					//强化成功
					upgrade();
                			cm.worldSpouseMessage(0x24, "『时装升星』 : 恭喜 【" + cm.getChar().getName() + "】经过几番拼搏，终于把时装升"+(currentStar+1)+"星 强化成功.");
					cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" "+(currentStar+1)+"星 强化成功");
				} else {
					//强化失败
					var dropChance = Math.floor(Math.random() * 100);
					if (dropGrade >= dropChance) {
						dropgrade();
						cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" 强化失败，降级为 "+(currentStar-1)+"星");
					} else {
						cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" 强化失败");
					}
				}
				cm.gainItem(4310023, -cost);
				cm.gainNX( - paynx);
				//重新获取装备属性
				currentStar = equip.getEnhance();
				
				//重新计算概率
				calcRate(currentStar + 1);

			}
			//java.lang.System.out.println(currentStar+"hahaha");
			//面板区域
			var text = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e当前强化装备：#n#k#v" + itemid + "#\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e当前强化等级：#n#k";
			var isStar = 0;
			for (var i = 0; i < currentStar; i++) {
				text += icon;
				if ((i + 1) % 5 == 0) text += " ";
				isStar++;
			}
			if (isStar <= 0) text += "#r未强化#k\r\n";
			else text += "\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e所需强化道具：#n#k#b#z4310023# #r" + cost + "#k个\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e剩余强化道具：#n#k#b" + cm.getItemQuantity(4310023) + "#k个\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e所需点卷余额：#n#k#b" + paynx + "#k 点\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e当前点卷余额：#n#k#b" + cm.getPlayer().getCSPoints(1) + "#k 点\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e本次强化成功率：#n#k#r" + successRate + "%#k\r\n";
			if (dropGrade == 0) text += "#e#g本次强化失败不下降星级#n#k\r\n";
			else if (dropGrade == 100) text += "#e#r本次强化失败必然下降星级#n#k\r\n";
			else text += "   #e#r本次强化失败可能下降星级#n#k\r\n";
			text += "#L2#" + btnOk + "#l";
			status = 1;
			isUpgrade = true;
			cm.sendSimple(text);
		}
	} else if (status == 2) {

	}
}
function calcRate(enhance) {
	if (enhance >= 1 && enhance <= 5) {
		if (enhance == 1) {
			dropGrade = 0;
		} else {
			dropGrade = 50;
		}
		successRate = 100 - ((enhance - 1) * 10);
		cost = 25;
		paynx = 500;
	}
	if (enhance >= 6 && enhance <= 10) {
		if (enhance == 6) {
			dropGrade = 0;
		} else if (enhance == 10) {
			dropGrade = 100;
		} else {
			dropGrade = 50;
		}
		successRate = 76 - ((enhance - 6) * 10);
		cost = 50;
		paynx = 1000;
	}
	if (enhance >= 11 && enhance <= 15) {
		if (enhance == 11) {
			dropGrade = 0;
		} else if (enhance == 14 || enhance == 15) {
			dropGrade = 64;
		} else {
			dropGrade = 50;
		}
		successRate = 36;
		cost = 100;
		paynx = 2000;
	}
}
function upgrade() {
	var _Str = 1;
	var _Dex = 1;
	var _Int = 1;
	var _Luk = 1;
	var _Matk = 0;
	var _Watk = 0;
	var _Acc = 0;
	var _Hp = 0;
	var _Mp = 0;
	if (equip.getEnhance() >= 5 && equip.getEnhance() <= 9) {
		_Matk = 1;
		_Watk = 1;
		_Acc = 1;
		_Hp = 30;
		_Mp = 30;
	}
	if (equip.getEnhance() >= 10 && equip.getEnhance() <= 14) {
		_Matk = 3;
		_Watk = 3;
		_Acc = 3;
		_Hp = 50;
		_Mp = 50;
	}
	if (equip.getEnhance() >= 15) {
		return false;
	}
	var ii = cm.getItemInfo();
	var toDrop = equip.copy();
	toDrop.setStr(equip.getStr() + _Str); //装备力量
	toDrop.setDex(equip.getDex() + _Dex); //装备敏捷
	toDrop.setInt(equip.getInt() + _Int); //装备智力
	toDrop.setLuk(equip.getLuk() + _Luk); //装备运气
	toDrop.setMatk(equip.getMatk() + _Matk); //物理攻击
	toDrop.setWatk(equip.getWatk() + _Watk); //魔法攻击 
	toDrop.setHp(equip.getHp() + _Hp); //魔法攻击 
	toDrop.setMp(equip.getMp() + _Mp); //魔法攻击 
	toDrop.setAcc(equip.getAcc() + _Acc); //
	toDrop.setEnhance(equip.getEnhance() + 1); //
	toDrop.setPosition(equip.getPosition());
	//toDrop.setOwner(level);
	toDrop.setExpiration(equip.getExpiration());
	cm.removeItem(position, 1, 1);
	cm.addFromDrop(cm.getC(), toDrop, false);
	
	if (equip.getEnhance()+1 == 10) {
		cm.worldMessageItem("[时装升星] : " + "玩家[" + cm.getPlayer().getName() + "]历经千辛万苦，将时装强化至 10 星", toDrop);
	} else if (equip.getEnhance()+1 == 15) {
		cm.worldMessageItem("[时装升星] : " + "不可思议，玩家[" + cm.getPlayer().getName() + "]将时装强化至 15 星", toDrop);
	}
	equip = cm.getInventory(1).getItem(position);
	return true;
}
//获取身上15星道具数量
function getStarEquipQuantity() {
	var list = cm.getInventory(-1).list();
	var itemList = list.iterator();
	var quantity1 = 0;
	var quantity2 = 0;
	//身上
	while (itemList.hasNext()) {
		var item = itemList.next();
		if (!cm.isCash(item.getItemId()))
			continue; //过滤点装
		if (item.getEnhance()>=10)
			quantity1++;
		if (item.getEnhance()>=15)
			quantity2++;
	}
	//装备栏
	list = cm.getInventory(1).list();
	itemList = list.iterator();
	while (itemList.hasNext()) {
		var item = itemList.next();
		if (!cm.isCash(item.getItemId()))
			continue; //过滤点装
		if (item.getEnhance()>=10)
			quantity1++;
		if (item.getEnhance()>=15)
			quantity2++;
	}
	return Array(quantity1, quantity2);
}
function dropgrade() {
	var _Str = -1;
	var _Dex = -1;
	var _Int = -1;
	var _Luk = -1;
	var _Matk = 0;
	var _Watk = 0;
	var _Acc = 0;
	var _Hp = 0;
	var _Mp = 0;
	if (equip.getEnhance() >= 6 && equip.getEnhance() <= 10) {
		_Matk = -1;
		_Watk = -1;
		_Acc = -1;
		_Hp = -30;
		_Mp = -30;
	}
	if (equip.getEnhance() >= 11 && equip.getEnhance() <= 15) {
		_Matk = -3;
		_Watk = -3;
		_Acc = -3;
		_Hp = -50;
		_Mp = -50;
	}
	if (equip.getEnhance() <= 0) {
		return false;
	}
	var ii = cm.getItemInfo();
	var toDrop = equip.copy();
	toDrop.setStr(equip.getStr() + _Str); //装备力量
	toDrop.setDex(equip.getDex() + _Dex); //装备敏捷
	toDrop.setInt(equip.getInt() + _Int); //装备智力
	toDrop.setLuk(equip.getLuk() + _Luk); //装备运气
	toDrop.setMatk(equip.getMatk() + _Matk); //物理攻击
	toDrop.setWatk(equip.getWatk() + _Watk); //魔法攻击 
	toDrop.setHp(equip.getHp() + _Hp); //魔法攻击 
	toDrop.setMp(equip.getMp() + _Mp); //魔法攻击 
	toDrop.setAcc(equip.getAcc() + _Acc); //
	toDrop.setEnhance(equip.getEnhance() - 1); //
	//toDrop.setOwner(level);
	toDrop.setExpiration(equip.getExpiration());
	cm.removeItem(position, 1, 1);
	cm.addFromDrop(cm.getC(), toDrop, false);
	equip = cm.getInventory(1).getItem(position);
	return true;
}
//获取装备类型
function getItemType(itemid) {
	var type = Math.floor(itemid/10000);
	switch (type) {
		case 100:
			return 0;  //帽子
		case 104:
			return 1;  //上衣
		case 105:
			return 2;  //套装
		case 106:
			return 3;  //裤裙
		case 107:
			return 4;  //鞋子
		case 108: 
			return 5;  //手套
		case 110:
			return 6;  //披风
		default:
			if (type==120)
				return -1;
			if (type==135)
				return -1;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //武器
			}
			return -1; 
	}
}