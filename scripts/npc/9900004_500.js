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
		var text = "��Ҫ�������޵��񼶾��ѳ���������ǿ���𡭡�\r\n#b";
		//text += "#L1##rʱװ����ϵͳ���#l#b\r\n\r\n";
		text += "#L2#" + icon2 + " �ǵģ��������Ϊ����#l\r\n";
		//text += "#L3#" + icon2 + " ��ȡÿ���Ǽ�����#l\r\n";
		//text+="#L3#"+icon2+" ������ʱװ #rx"+cost[1]+"/��#b#l\r\n";
		//text+="#L4#"+icon2+" ���������Ҿ���ʱװ #rx"+cost[2]+"/��#l\r\n";
		//text+="#L5#"+icon2+" һ���񼶾��� #r#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 2) {
			position = -1;
			isUpgrade = false;
			inventoryType = 1;
			var list = cm.getInventory(inventoryType).list();
			var itemList = list.iterator();
			text = "#e��ѡ����#n\r\n\r\n#b";
			var indexof = 1;
			newItemList = Array();
			while (itemList.hasNext()) {
				var item = itemList.next();
				if (item.getItemId() != 1102630)
					continue;
				newItemList[item.getPosition()] = item.getItemId();
			}
			for (var key in newItemList) {
				text += "#L" + key + "##v" + newItemList[key] + "#";
				if (indexof > 1 && indexof % 5 == 0) {
					text += "\r\n";
				}
				indexof++;
			}
			cm.sendSimple(text);
		}
	} else if (status == 2) {
		if (position == -1)
			position = selection;
		if (position != -1) {
			if (cm.getRMB()>=0) {
				equip = cm.getInventory(1).getItem(position);
				var ii = cm.getItemInfo();
				var toDrop = equip.copy();
				toDrop.setExpiration(-1);
				cm.removeItem(position, 1, 1);
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.worldMessageItem("[������] : " + "���[" + cm.getPlayer().getName() + "]�� �񼶾���<"+cm.getItemName(1102630)+"> ����Ϊ ����", toDrop);
				cm.sendOk("���׳ɹ���");
				cm.dispose();
			} else {
				cm.sendOk("��ֵ�ۼƲ���500���޷�����");
				cm.dispose();
			}
		}
	} else if (status == 2) {

	}
}