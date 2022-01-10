//普通元宝商店
var weaponlist = new Array(
// 150级 武器
    //Array(2430047, 600),
    Array(1212063, 300),//法弗纳武器
	Array(1222058, 300),
	Array(1232057, 300),
	Array(1242060, 300),
	Array(1302275, 300),
	Array(1312153, 300),
	Array(1322203, 300),
	Array(1332225, 300),
	Array(1342082, 300),
	Array(1362090, 300),
	Array(1372177, 300),
	Array(1382208, 300),
	Array(1402196, 300),
	Array(1412135, 300),
	Array(1422140, 300),
	Array(1432167, 300),
	Array(1442223, 300),
	Array(1462193, 300),
	Array(1472214, 300),
	Array(1452205, 300),
	Array(1482168, 300),
	Array(1492179, 300),
	Array(1522094, 300),
	Array(1532098, 300),
	Array(1252015, 300)
	);
var glovelist = new Array(
	// 150级防具
	Array(1003797, 180),//鲁塔比斯战士
	Array(1003798, 180),
	Array(1003799, 180),
	Array(1003800, 180),
	Array(1003801, 180),
	Array(1042254, 180),
	Array(1042255, 180),
	Array(1042256, 180),
	Array(1042257, 180),
	Array(1042258, 180),
	Array(1062165, 180),
	Array(1062166, 180),
	Array(1062167, 180),
	Array(1062168, 180),
	Array(1062169, 180)
);
var caplist = new Array(
// 暴君防具
    Array(1072743, 380),//暴君战士
	Array(1072744, 380),
	Array(1072745, 380),
	Array(1072746, 380),
	Array(1072747, 380),
	Array(1082543, 380),
	Array(1082544, 380),
	Array(1082545, 380),
	Array(1082546, 380),
	Array(1082547, 380),
	Array(1102481, 380),
	Array(1102482, 380),
	Array(1102483, 380),
	Array(1102484, 380),
	Array(1102485, 380),
	Array(1132174, 380),
	Array(1132175, 380),
	Array(1132176, 380),
	Array(1132177, 380),
	Array(1132178, 380)
);
var capelist = new Array(
// 漩涡武器
    Array(1212089, 350),
	Array(1222084, 350),
	Array(1232084, 350),
	Array(1242090, 350),
	Array(1252033, 350),
	Array(1302297, 350),
	Array(1312173, 350),
	Array(1322223, 350),
	Array(1332247, 350),
	Array(1342090, 350),
	Array(1362109, 350),
	Array(1372195, 350),
	Array(1382231, 350),
	Array(1402220, 350),
	Array(1412152, 350),
	Array(1422158, 350),
	Array(1432187, 350),
	Array(1442242, 350),
	Array(1452226, 350),
	Array(1462213, 350),
	Array(1472235, 350),
	Array(1482189, 350),
	Array(1492199, 350),
	Array(1522113, 350),
	Array(1532118, 350)
);
var uselist = new Array(
//道具 其它
    Array(2046074, 18),//祥龙单手武器攻击力卷轴99%
	Array(2046075, 18),//祥龙单手武器魔法力卷轴99%
	Array(2046149, 18),//祥龙双手武器攻击力卷轴99%
	Array(2613000, 30),//星火单手武器攻击力卷轴
    Array(2613001, 30),//星火单手武器魔法力卷轴
	Array(2612010, 30),//星火双手武器攻击力卷轴
	Array(2330007, 15),//高科技穿甲弹
    Array(2070019, 15)//高科技电光镖
);
/* // 机器人心脏
var rareitemlist = new Array(
    Array(1672027, 30),
	Array(1672000, 20),
	Array(1672001, 20),
	Array(1672002, 20),
	Array(1672003, 20),
	Array(1672004, 20),
	Array(1672005, 20),
	Array(1672006, 20),
	Array(1672007, 20),
	Array(1662006, 30)
);
// 绝版椅子
var suteplist = new Array(
	Array(3014005, 169),
	Array(3010658, 169),
	Array(3010428, 99),
	Array(3010853, 128),
	Array(3015002, 158),
	Array(3015096, 89),
	Array(3010832, 89),
	Array(3015130, 49),
	Array(3015051, 49),
	Array(3015131, 99),
	Array(3015132, 99),
	Array(3010936, 99),
	Array(3015089, 88),
	Array(3015135, 88),
	Array(3016000, 99),
	Array(3015015, 30),
	Array(3015016, 30),
	Array(3015017, 30),
	Array(3015018, 30),
	Array(3015019, 30),
	Array(3015020, 30),
	Array(3015021, 30),
	Array(3015022, 30),
	Array(3015023, 30),
	Array(3015024, 30),
	Array(3015025, 30),
	Array(3015026, 30),
	Array(3015027, 30),
	Array(3015060, 30),
	Array(3015014, 30),
	Array(3012020, 30),
	Array(3012019, 30),
	Array(3015075, 30),
	Array(3015009, 20)
);
*/

var status = -1;
var text;
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var seltype, selindex;
var equiplist;

function start() {
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
		cm.dispose();
		return;
	}

	if (status == 0) {
		var rmb = cm.getHyPay(1);
		text = "\t\t\t\t#e#r- 现金商店 -#n\r\n\r\n";
		text += "#b您当前可用元宝： #r" + cm.getHyPay(1) + "\t #b已消费元宝：#r" + cm.getHyPay(2) + "#k\r\n\r\n";
		text += "- #e#d请选择：#n#K\r\n";
		text += "#b#L0#"+ttt6+"[150级]武器 #l\t#b#L1#"+ttt6+"[150级]防具 #l\r\n";
		text += "#b#L2#"+ttt6+"[150级]暴君 #l\t#b#L3#"+ttt6+"[160级]武器 #l\r\n";
		text += "#b#L4#"+ttt6+"[道具卷轴]#l\r\n";
		cm.sendOk(text);
	} else if (status == 1) {
		text = "#b- 您好！这里是元宝商店,使用#r 元宝 #b才能购买下列道具\r\n#r请选择您需要的道具#k\r\n";
		seltype = selection;
        if (seltype == 0) {
			equiplist = weaponlist;
		} else if (seltype == 1) {
			equiplist = glovelist;
		} else if (seltype == 2) {
			equiplist = caplist;
		} else if (seltype == 3) {
			equiplist = capelist;
		} else if (seltype == 4) {
			equiplist = uselist;
		} else if (seltype == 5) {
			equiplist = rareitemlist;
		} else if (seltype == 6) {
			equiplist = suteplist;
		}
		for (var i in equiplist) {
			text += "#L" + i + "##i" + equiplist[i][0] + "##z" + equiplist[i][0] + "# 价格:" + equiplist[i][1] + "元宝\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 2) {
		selindex = selection;
		var equipinfo = equiplist[selindex];
		text = "#e#r您确定要购买下列道具吗？#k\r\n\r\n#b#i" + equipinfo[0] + "##z" + equipinfo[0] + "# 价格:" + equipinfo[1] + "\r\n\r\n";
		if (seltype < 0) {
			text += "#e#d";
			text += "力量：#r+" + equipinfo[2] + "#k\r\n";
			text += "敏捷：#r+" + equipinfo[3] + "#k\r\n";
			text += "智力：#r+" + equipinfo[4] + "#k\r\n";
			text += "运气：#r+" + equipinfo[5] + "#k\r\n";
			text += "攻击：#r+" + equipinfo[6] + "#k\r\n";
			text += "魔力：#r+" + equipinfo[7] + "#k\r\n";
			if (seltype != 2) {
				text += "可砸卷升级次数：#r+" + equipinfo[8] + "#k\r\n";
				text += "已经砸卷升级次数：#r+" + equipinfo[9] + "#k\r\n";
				text += "星之力次数：#r+" + equipinfo[10] + "#k\r\n";
				text += "潜能1：+BOSS伤害增加 #r30%#k\r\n";
				text += "潜能2：+全属性增加 #r20%#k\r\n";
				text += "潜能3：+无视防御增加 #r35%#k\r\n";
			}
			if (seltype == 1) {
				text += "武器伤害上限：#b+" + equipinfo[14] + "#k\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 3) {
		var equipinfo = equiplist[selindex];
		if (cm.getHyPay(1) < equipinfo[1]) {
			cm.sendOk("#b100元你都不给我，还想买？快去找芊芊充值元宝吧！请冲值后再来购买。#k");
			cm.dispose();
			return;
		}
		if (cm.haveSpace(Math.floor(equipinfo[0] / 1000000)) < 1) {
			cm.sendOk("#b100元你都不给我，还想买？快去找芊芊充值元宝吧！请冲值后再来购买。#k");
			cm.dispose();
			return;
		}
		if (seltype < 0) {
			var equip = cm.getItemInfo().getEquipById(equipinfo[0]);
			equip.setStr(equipinfo[2]);
			equip.setDex(equipinfo[3]);
			equip.setInt(equipinfo[4]);
			equip.setLuk(equipinfo[5]);
			equip.setWatk(equipinfo[6]);
			equip.setMatk(equipinfo[7]);
			if (seltype != 2) {
				equip.setUpgradeSlots(equipinfo[8]);
				equip.setLevel(equipinfo[9]);
				equip.setEnhance(equipinfo[10]);
				equip.setPotential1(equipinfo[11]);
				equip.setPotential2(equipinfo[12]);
				equip.setPotential3(equipinfo[13]);
			}
			if (seltype == 1) {
				equip.setLimitBreak(equipinfo[14]);
			}
			if (equip.isSealedEquip()) {
				equip.setSealedLevel(5);
			}
			equip.setOwner(cm.getPlayer().getName());
			cm.addFromDrop(cm.getC(), equip, true);
			cm.worldMessageItem("『元宝商城』 : 恭喜玩家" + cm.getChar().getName() + "在元宝商城购买成功。", equip);
		} else {
			cm.gainItem(equipinfo[0], 1);
		}
		cm.addHyPay(equipinfo[1]);
		cm.dispose();
	}
}