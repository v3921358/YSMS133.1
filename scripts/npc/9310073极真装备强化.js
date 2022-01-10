/*
 * ����ǿ��
 * Power By WEС��
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
		var selstr = "#r#h ##k��ã����Ǽ���ǿ��NPC���ҿ��԰���#r����#k��ɼ���װ����ǿ������ǿ����ͬʱҲ��������Ӧ�ľ��ᡣ\r\n��ѡ������Ҫǿ���ļ���װ����";
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
			cm.sendOk("�Բ�����ȷ���㱳���Ƿ��м���װ����");
			cm.dispose();
		} else {
			cm.sendSimple(selstr);
		}
	} else if (status == 1) {
		var selstr = "#r#h ##k��ã���ѡ����Ҫʹ�õ�ǿ�����᣺";
		var isNone = true
		Lv = selection % 10;
		pos = selection / 10;
		equip = cm.getEquipBySlot(pos);
		if (equip.getUpgradeSlots() < 0) {
			cm.sendOk("�Բ�����ȷ�ϸ�װ��������ϣ���");
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
			cm.sendOk("�Բ�����ȷ�ϱ������У�\r\n\r\n#b#i2049300# #z2049300#\r\n#b#i2049301# #z2049301#\r\n#b#i2049323# #z2049323#\r\n\r\n#r���־����е�һ�֣�");
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
			cm.sendYesNo("#r#h ##k��ã���Ҫʹ�ñ����е�#b#i5064003# #t5064003##k������װ����");
			protect = true;
		} else {
			action(1, 0, 0);
		}
	} else if (status == 3) {
		cm.sendGetNumber("#r#h ##k��ã�����������Ҫʹ�� #i" + costitem + "# #b#z" + costitem + "##k�Ĵ�����\r\n#rPS��#k��#rװ���ѵ����ǿ���ȼ�#k����ֹͣǿ����", 1, 1, cm.getItemQuantity(costitem));
	} else if (status == 4) {
		for (var i = 0; i < selection; i++) {
			var enhance = equip.getEnhance();
			if (enhance < starmax[Lv]) {
				var chance = Math.floor(Math.random() * (100 + 1));
				cm.gainItem(costitem, -1);
				if (protect) {
					if (cm.getItemQuantity(5064003) == 0) {
						cm.sendYesNo("#r#h ##k��ã��㱳���е�#b#i5064003# #t5064003#�Ѿ����Ĵ��������ʻ�Ҫ����ǿ����");
						rest = selection - i;
						return;
					} else {
						cm.gainItem(5064003, -1);
					}
				}
				if (chance > changces[costtype][enhance]) {
					if (costitem != 2049323 && (!protect || enhance > 7)) {
						cm.sendOk("�Բ���װ��ǿ��ʧ�ܣ�װ����٣�����");
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
				cm.sendOk("װ���Ѵﵽ���ǿ���ȼ����޷�����ǿ���ˣ�������");
				cm.dispose();
				return;
			}
		}
		cm.sendOk("װ��ǿ����ϣ���ǰװ���Ѿ��ɹ�ǿ������#r" + equip.getEnhance() + "#k�ǣ���\r\n#r��������һ�µ��߼��ɼ�Ч��Ӵ������");
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
						cm.sendOk("�Բ���װ��ǿ��ʧ�ܣ�װ����٣�����");
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
				cm.sendOk("װ���Ѵﵽ���ǿ���ȼ����޷�����ǿ���ˣ�������");
				cm.dispose();
				return;
			}
		}
		cm.sendOk("װ��ǿ����ϣ���ǰװ���Ѿ��ɹ�ǿ������#r" + equip.getEnhance() + "#k�ǣ���\r\n#r��������һ�µ��߼��ɼ�Ч��Ӵ������");
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