/*
 * 极真强化
 * Power By WE小九
 */

var status = -1;

var equips = Array(
		Array(
			1132164, 1132165, 1132166, 1132167, 1132168,
			1102471, 1102472, 1102473, 1102474, 1102475,
			1072732, 1072733, 1072734, 1072735, 1072736),
		Array(
			1132169, 1132170, 1132171, 1132172, 1132173,
			1102476, 1102477, 1102478, 1102479, 1102480,
			1072737, 1072738, 1072739, 1072740, 1072741),
		Array(
			1132174, 1132175, 1132176, 1132177, 1132178,
			1102481, 1102482, 1102483, 1102484, 1102485,
			1082543, 1082544, 1082545, 1082546, 1082547,
			1072743, 1072744, 1072745, 1072746, 1072747));

var stats = Array(
		Array(Array(2, 3, 5, 8, 12), Array(2, 3, 4, 5, 6), 5),
		Array(Array(6, 7, 13, 20, 33), Array(5, 6, 7, 8, 9), 7),
		Array(Array(9, 10, 19, 29, 48), Array(9, 10, 11, 12, 13, 15, 17, 19, 21, 23), 10));

var changces = Array(
		Array(80, 70, 60, 50, 40, 30, 20, 10, 5),
		Array(100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5));

var starmax = Array(3, 8, 15);

var costs = Array(2049300, 2049301, 2049323);

var costitem = 0;
var equip;
var protect = false;
var rest = 0;
var Lv = 0;
var costtype = 1;
var pos = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (mode == 0 && status == 2) {
			protect = false;
			status++;
		} else {
			cm.dispose();
			return;
		}	
	}

	if (status == 0) {
		var selstr = "#r#h ##k你好，我是极真强化NPC，我可以帮你#r快速#k完成极真装备的强化，在强化的同时也会消耗相应的卷轴。\r\n请选择你需要强化的极真装备：";
		var isNone = true;
		equipList = cm.getInventory(1).list().iterator();
		while (equipList.hasNext()) {
			equip = equipList.next();
			if (inArray(equip.getItemId(), equips[0])) {
				isNone = false;
				selstr += "\r\n#L" + equip.getPosition() + "0##i" + equip.getItemId() + "# #b#t" + equip.getItemId() + "#";
			} else if (inArray(equip.getItemId(), equips[1])) {
				isNone = false;
				selstr += "\r\n#L" + equip.getPosition() + "1##i" + equip.getItemId() + "# #b#t" + equip.getItemId() + "#";
			} else if (inArray(equip.getItemId(), equips[2])) {
				isNone = false;
				selstr += "\r\n#L" + equip.getPosition() + "2##i" + equip.getItemId() + "# #b#t" + equip.getItemId() + "#";
			}
		}
		if (isNone) {
			cm.sendOk("对不起，请确认你背包是否有极真装备。");
			cm.dispose();
		} else {
			cm.sendSimple(selstr);
		}
	} else if (status == 1) {
		var selstr = "#r#h ##k你好，请选择你要使用的强化卷轴：";
		var isNone = true
		Lv = selection % 10;
		pos = selection / 10;
		equip = cm.getEquipBySlot(pos);
		if (equip.getUpgradeSlots() < 0) {
			cm.sendOk("对不起，请确认该装备升级完毕！！");
			cm.dispose();
			return;
		}
		for (var cost in costs) {
			var count = cm.getItemQuantity(costs[cost]);
			if (count > 0) {
				isNone = false;
				selstr += "\r\n#L" + cost + "##i" + costs[cost] + "# #b#z" + costs[cost] + "##l"
			}
		}
		if (isNone) {
			cm.sendOk("对不起！请确认背包中有：\r\n\r\n#b#i2049300# #z2049300#\r\n#b#i2049301# #z2049301#\r\n#b#i2049323# #z2049323#\r\n\r\n#r三种卷轴中的一种！");
			cm.dispose();
			return;
		} else {
			cm.sendSimple(selstr);
		}
	} else if (status == 2) {
		costitem = costs[selection];
		if (selection == 1) {
			costtype = 0;
		}
		if (cm.getItemQuantity(5064003) > 0) {
			cm.sendYesNo("#r#h ##k你好，你要使用背包中的#b#i5064003# #t5064003##k来保护装备吗？");
			protect = true;
		} else {
			action(1, 0, 0);
		}
	} else if (status == 3) {
		cm.sendGetNumber("#r#h ##k你好，请输入你需要使用 #i" + costitem + "# #b#z" + costitem + "##k的次数。\r\n#rPS：#k当#r装备已到最大强化等级#k即会停止强化。", 1, 1, cm.getItemQuantity(costitem));
	} else if (status == 4) {
		for (var i = 0; i < selection; i++) {
			var enhance = equip.getEnhance();
			if (enhance < starmax[Lv]) {
				var chance = Math.floor(Math.random() * (100 + 1));
				cm.gainItem(costitem, -1);
				if (protect) {
					if (cm.getItemQuantity(5064003) == 0) {
						cm.sendYesNo("#r#h ##k你好，你背包中的#b#i5064003# #t5064003#已经消耗殆尽，请问还要继续强化吗？");
						rest = selection - i;
						return;
					} else {
						cm.gainItem(5064003, -1);
					}
				}
				if (chance > changces[costtype][enhance]) {
					if (costitem != 2049323 && (!protect || enhance > 7)) {
						cm.sendOk("对不起，装备强化失败，装备损毁！！！");
						cm.removeSlot(1, pos, 1);
						cm.dispose();
						return;
					}
				} else {
					equip.setEnhance(enhance+1);
					if (enhance < 5) {
						equip.setStr(equip.getStr() + stats[Lv][0][enhance]);
						equip.setLuk(equip.getLuk() + stats[Lv][0][enhance]);
						equip.setInt(equip.getInt() + stats[Lv][0][enhance]);
						equip.setDex(equip.getDex() + stats[Lv][0][enhance]);
						equip.setWdef(equip.getWdef() + stats[Lv][2]);
						equip.setMdef(equip.getMdef() + stats[Lv][2]);
					} else {
						enhance -= 5;
						equip.setWatk(equip.getWatk() + stats[Lv][1][enhance]);
						equip.setMatk(equip.getMatk() + stats[Lv][1][enhance]);
						equip.setWdef(equip.getWdef() + stats[Lv][2]);
						equip.setMdef(equip.getMdef() + stats[Lv][2]);
					}
				}
			} else {
				cm.sendOk("装备已达到最高强化等级，无法继续强化了！！！！");
				cm.dispose();
				return;
			}
		}
		cm.sendOk("装备强化完毕，当前装备已经成功强化到了#r" + equip.getEnhance() + "#k星！！\r\n#r重新排列一下道具即可见效果哟！！！");
		cm.dispose();
		return;
	} else if (status == 5) {
		for (var i = 0; i < selection; i++) {
			var enhance = equip.getEnhance();
			if (enhance < starmax[Lv]) {
				var chance = Math.floor(Math.random() * (100 + 1));
				cm.gainItem(costitem, -1);
				if (chance > changces[costtype][enhance]) {
					if (costitem != 2049323 && enhance > 7) {
						cm.sendOk("对不起，装备强化失败，装备损毁！！！");
						cm.removeSlot(1, pos, 1);
						cm.dispose();
						return;
					}
				} else {
					equip.setEnhance(enhance+1);
					if (enhance < 5) {
						equip.setStr(equip.getStr() + stats[Lv][0][enhance]);
						equip.setLuk(equip.getLuk() + stats[Lv][0][enhance]);
						equip.setInt(equip.getInt() + stats[Lv][0][enhance]);
						equip.setDex(equip.getDex() + stats[Lv][0][enhance]);
						equip.setWdef(equip.getWdef() + stats[Lv][2]);
						equip.setMdef(equip.getMdef() + stats[Lv][2]);
					} else {
						enhance -= 5;
						equip.setWatk(equip.getWatk() + stats[Lv][1][enhance]);
						equip.setMatk(equip.getMatk() + stats[Lv][1][enhance]);
						equip.setWdef(equip.getWdef() + stats[Lv][2]);
						equip.setMdef(equip.getMdef() + stats[Lv][2]);
					}
				}
			} else {
				cm.sendOk("装备已达到最高强化等级，无法继续强化了！！！！");
				cm.dispose();
				return;
			}
		}
		cm.sendOk("装备强化完毕，当前装备已经成功强化到了#r" + equip.getEnhance() + "#k星！！\r\n#r重新排列一下道具即可见效果哟！！！");
		cm.dispose();
		return;
	}
}

function inArray(id, arr) {
	for (var i in arr) {
		if (id == arr[i]) {
			return true;
		}
	}
	return false;
}