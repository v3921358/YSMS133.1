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
		var text = "���������º�~��һ��������װҪ�����ˡ���\r\n#b[#z4310023#] ��ȥ�Ǳ��̳ǵ�������湺��\r\n#b";
		text += "#L1##rʱװǿ������ϵͳ���#l#b\r\n\r\n";
		text += "#L2#" + icon2 + " ��ʼǿ��ʱװ#l\r\n";
		text += "#L3#" + icon2 + " ��ȡÿ���Ǽ�����#l\r\n";
		//text+="#L3#"+icon2+" �������ʱװ #rx"+cost[1]+"/��#b#l\r\n";
		//text+="#L4#"+icon2+" ���˵�ͭ�Ҿ���ʱװ #rx"+cost[2]+"/��#l\r\n";
		//text+="#L5#"+icon2+" һ���񼶾��� #r#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			typed = 1;
			//var text="����ҵĵȼ��ﵽ#e#r120#n#k��ʱ����ʹ��ʱװ����ϵͳ��ʱװ����ϵͳ�ܹ�Ϊ��ĵ�װ����һ����#b���������ݡ���������������������ħ����������ֵ#k��Ŀǰ����ʹ����Ϸ�ҡ���������˵�ͭ�Ҽ����װ��ÿ�־��ѵķ�ʽ����������Ч������ͬ��\r\n"+icon+" ʹ��#r��Ϸ��#k���ѵ�װֻ��Ϊ��װ����#b���������ݡ�����������#k���ĸ�����ֵ����������ֵ��Ϊ#r1#k\r\n"+icon+" ʹ��#b���#k���ѵ�װ����Ϊ��װ����������������ֵ�������������#r1-3#k��\r\n"+icon+" ʹ��#b���˵�ͭ��#k���ܹ�������ֲ���#r2-6#k�㣬���м��ʲ���ȫ����#b+15#k��#r�񼶾���#k\r\n\r\n#r#e(*) ���Ѻ�ĵ�װ�����ظ�����";
			var text = "#d#eʲô��ʱװ���ǣ�#n#k\r\n";
			text += "\tʱװ����ָ����Ϊû�����Եĵ�װ����ǿ������ԣ���������԰���#b���������ݡ�������������ħ������HP��MP�����������ر�ֵ#k��\r\n";
			text += "\r\n#d#e���Ϊʱװ���ǣ�#n#k\r\n";
			text += "\tʱװ������Ҫ����#t4310023#�ͼ��������ĵ������߿�ǿ����15�ǡ�����ǿ���Ĳ�λֻ�У�#b������ñ�ӡ����硢���¡����ӡ����ۡ����ס�Ь��#k\r\n";
			//text += "\t#b1~5��#k��ʱװ#b�����������ݡ�������������#r+1#k\r\n";
			//text += "\t#b6~10��#k��ʱװ#b�����������ݡ�������������#r+1��#b��ħ��������������#r+1,#b��HP��MP��#r+30#k\r\n";
			//text += "\t#b11~15��#k��ʱװ#b�����������ݡ�������������#r+1��#b��ħ��������������#r+3,#b��HP��MP��#r+50#k\r\n";
			//text+="\t#b�񼶾���#k��ʹ��#d���˵�ͭ��#k�м��ʽ�ʱװ���ѵĵȼ�����Ϊ�񼶾��ѵ�Ч����ʹ��ʱװ#b�����������ݡ�������������ħ���������������ر�ֵ��#d����ֵ#r+15#k#k\r\n";
			text += "\r\n#d#e��λ���Ǽ�������#n#k\r\n";
			text += "\t�����ϴ����ͱ����е�ʱװ����#r2����5����8��#k�ﵽ#b10��#k����Ʒ�ʣ�������ȡ�϶�Ľ�����\r\n";
			text += "\t�����ϴ����ͱ����е�ʱװ����#r2����5����8��#k�ﵽ#b15��#k����Ʒ�ʣ�������ȡ���Ľ�����\r\n";
			text += "\r\n#d#e����˵����#n#k\r\n";
			text += "\t���ֵȼ���ǿ��ʧ��ʱ���ܻ�����Ǽ����˵�����12~15��ǿ�����ʧ�ܣ��Ǽ���Ȼ�½���\r\n";
			cm.sendPrev(text);
		} else if (selection == 2) {
			position = -1;
			isUpgrade = false;
			inventoryType = 1;
			var list = cm.getInventory(inventoryType).list();
			var itemList = list.iterator();
			text = "#e��ѡ����Ҫǿ���ĵ�װ#n\r\n\r\n#b";
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
			if (cm.getBossLog("ÿ���Ǽ�����") >= 1) {
				cm.sendOk("�������Ѿ�������Ǽ��������޷��ٴ���ȡ��");
				cm.dispose();
				return ;
			}
			var q = getStarEquipQuantity();
			var q1=q[0];
			var q2=q[1];
			var giftList = Array();
			var text = "";
			text = "ϵͳ��⵽������#b15��Ʒ��#k���ϵ��Ǽ�ʱװ����#r"+q2+"#k�������ɹ���ȡ�������½�����\r\n";
			if (q2<2) {
				//10�ǽ���
				text = "ϵͳ��⵽������#b10��Ʒ��#k���ϵ��Ǽ�ʱװ����#r"+q1+"#k�������ɹ���ȡ�������½�����\r\n";
				if (q1 >= 8){
					giftList = Array(
						Array(5062009, 200),
						Array(2430481, 5), //�߼���Ƭ
						Array(2430915, 5), //������Ƭ
						Array(2431893, 5) //��ɫ��Ƭ
					);
					//text = "ϵͳ��⵽������#b10��Ʒ��#k���ϵ��Ǽ�ʱװ����#r"+q1+"#k�������ɹ���ȡ����һ�½�����\r\n";
				} else if (q1>=5) {
					giftList = Array(
						Array(5062009, 100),
						Array(2430481, 5) //�߼���Ƭ
					);
					//text = "ϵͳ��⵽������#b10��Ʒ��#k���ϵ��Ǽ�ʱװ����#r"+q1+"#k�������ɹ���ȡ����һ�½�����\r\n";
				} else if (q1>=2) {
					giftList = Array(
						Array(5062009, 50)
					);
				}
			} else if (q2>=8) {
				giftList = Array(
					Array(4001839, 1000),
					Array(5062500, 100), //������Ƭ
					Array(5062009, 200) //��ɫ��Ƭ
				);
			} else if (q2>=5) {
				giftList = Array(
					Array(4001839, 500),
					Array(2430481, 15), //�߼���Ƭ
					Array(2430915, 15), //������Ƭ
					Array(2431893, 15) //��ɫ��Ƭ
				);
			} else if (q2>=2) {
				giftList = Array(
					Array(4001839, 100),
					Array(2430481, 10), //�߼���Ƭ
					Array(2430915, 10), //������Ƭ
					Array(2431893, 10) //��ɫ��Ƭ
				);
			}
			if (giftList.length!=0) {
				
				for(var key in giftList) {
					var itemid = giftList[key][0];
					var itemquantity = giftList[key][1];
					cm.gainItem(itemid, itemquantity);
					text+="#b#v"+itemid+"##t"+itemid+"# #rx"+itemquantity+"#k\r\n";
				}
				cm.setBossLog("ÿ���Ǽ�����");
				cm.sendOk(text);
				cm.dispose();
			} else {
				status = 0;
				cm.sendSimple("����û�дﵽ��ȡ�Ǽ�������Ҫ��������鿴\r\n#r#L1#ʱװ����ϵͳ���#l#k");
			}
		}
	} else if (status == 2) {
		if (position == -1)
			position = selection;
		if (position != -1) {
			equip = cm.getInventory(1).getItem(position);
			if (equip == null) {
				cm.sendOk("δ֪���� Error Code 9000069 1");
				cm.dispose();
				return;
			}
			itemid = equip.getItemId();
			if (!cm.isCash(itemid)) {
				cm.sendOk("ѡ��ĵ��߲���ʱװ���޷�����");
				cm.dispose();
				return;
			}
			var currentStar = equip.getEnhance();
			if (currentStar >= 15) {
				cm.sendOk("��ǰװ����ǿ��������Ǽ����޷�����ǿ����");
				cm.dispose();
				return;
			}
			calcRate(currentStar + 1);
			//ǿ��������
			if (isUpgrade) {
				if (!cm.haveItem(4310023, cost) || cm.getPlayer().getCSPoints(1) < paynx) {
					cm.sendOk("���ĵ���������˵�ͭ�Ҳ��㣬���飡");
					cm.dispose();
					return;
				}
				var successChance = Math.floor(Math.random() * 100);
				if (successRate >= successChance) {
					//ǿ���ɹ�
					upgrade();
                			cm.worldSpouseMessage(0x24, "��ʱװ���ǡ� : ��ϲ ��" + cm.getChar().getName() + "����������ƴ�������ڰ�ʱװ��"+(currentStar+1)+"�� ǿ���ɹ�.");
					cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" "+(currentStar+1)+"�� ǿ���ɹ�");
				} else {
					//ǿ��ʧ��
					var dropChance = Math.floor(Math.random() * 100);
					if (dropGrade >= dropChance) {
						dropgrade();
						cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" ǿ��ʧ�ܣ�����Ϊ "+(currentStar-1)+"��");
					} else {
						cm.getPlayer().dropMessage(5, cm.getItemName(itemid)+" ǿ��ʧ��");
					}
				}
				cm.gainItem(4310023, -cost);
				cm.gainNX( - paynx);
				//���»�ȡװ������
				currentStar = equip.getEnhance();
				
				//���¼������
				calcRate(currentStar + 1);

			}
			//java.lang.System.out.println(currentStar+"hahaha");
			//�������
			var text = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e��ǰǿ��װ����#n#k#v" + itemid + "#\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e��ǰǿ���ȼ���#n#k";
			var isStar = 0;
			for (var i = 0; i < currentStar; i++) {
				text += icon;
				if ((i + 1) % 5 == 0) text += " ";
				isStar++;
			}
			if (isStar <= 0) text += "#rδǿ��#k\r\n";
			else text += "\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e����ǿ�����ߣ�#n#k#b#z4310023# #r" + cost + "#k��\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#eʣ��ǿ�����ߣ�#n#k#b" + cm.getItemQuantity(4310023) + "#k��\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e��������#n#k#b" + paynx + "#k ��\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e��ǰ�����#n#k#b" + cm.getPlayer().getCSPoints(1) + "#k ��\r\n";
			text += "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# #d#e����ǿ���ɹ��ʣ�#n#k#r" + successRate + "%#k\r\n";
			if (dropGrade == 0) text += "#e#g����ǿ��ʧ�ܲ��½��Ǽ�#n#k\r\n";
			else if (dropGrade == 100) text += "#e#r����ǿ��ʧ�ܱ�Ȼ�½��Ǽ�#n#k\r\n";
			else text += "   #e#r����ǿ��ʧ�ܿ����½��Ǽ�#n#k\r\n";
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
	toDrop.setStr(equip.getStr() + _Str); //װ������
	toDrop.setDex(equip.getDex() + _Dex); //װ������
	toDrop.setInt(equip.getInt() + _Int); //װ������
	toDrop.setLuk(equip.getLuk() + _Luk); //װ������
	toDrop.setMatk(equip.getMatk() + _Matk); //��������
	toDrop.setWatk(equip.getWatk() + _Watk); //ħ������ 
	toDrop.setHp(equip.getHp() + _Hp); //ħ������ 
	toDrop.setMp(equip.getMp() + _Mp); //ħ������ 
	toDrop.setAcc(equip.getAcc() + _Acc); //
	toDrop.setEnhance(equip.getEnhance() + 1); //
	toDrop.setPosition(equip.getPosition());
	//toDrop.setOwner(level);
	toDrop.setExpiration(equip.getExpiration());
	cm.removeItem(position, 1, 1);
	cm.addFromDrop(cm.getC(), toDrop, false);
	
	if (equip.getEnhance()+1 == 10) {
		cm.worldMessageItem("[ʱװ����] : " + "���[" + cm.getPlayer().getName() + "]����ǧ����࣬��ʱװǿ���� 10 ��", toDrop);
	} else if (equip.getEnhance()+1 == 15) {
		cm.worldMessageItem("[ʱװ����] : " + "����˼�飬���[" + cm.getPlayer().getName() + "]��ʱװǿ���� 15 ��", toDrop);
	}
	equip = cm.getInventory(1).getItem(position);
	return true;
}
//��ȡ����15�ǵ�������
function getStarEquipQuantity() {
	var list = cm.getInventory(-1).list();
	var itemList = list.iterator();
	var quantity1 = 0;
	var quantity2 = 0;
	//����
	while (itemList.hasNext()) {
		var item = itemList.next();
		if (!cm.isCash(item.getItemId()))
			continue; //���˵�װ
		if (item.getEnhance()>=10)
			quantity1++;
		if (item.getEnhance()>=15)
			quantity2++;
	}
	//װ����
	list = cm.getInventory(1).list();
	itemList = list.iterator();
	while (itemList.hasNext()) {
		var item = itemList.next();
		if (!cm.isCash(item.getItemId()))
			continue; //���˵�װ
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
	toDrop.setStr(equip.getStr() + _Str); //װ������
	toDrop.setDex(equip.getDex() + _Dex); //װ������
	toDrop.setInt(equip.getInt() + _Int); //װ������
	toDrop.setLuk(equip.getLuk() + _Luk); //װ������
	toDrop.setMatk(equip.getMatk() + _Matk); //��������
	toDrop.setWatk(equip.getWatk() + _Watk); //ħ������ 
	toDrop.setHp(equip.getHp() + _Hp); //ħ������ 
	toDrop.setMp(equip.getMp() + _Mp); //ħ������ 
	toDrop.setAcc(equip.getAcc() + _Acc); //
	toDrop.setEnhance(equip.getEnhance() - 1); //
	//toDrop.setOwner(level);
	toDrop.setExpiration(equip.getExpiration());
	cm.removeItem(position, 1, 1);
	cm.addFromDrop(cm.getC(), toDrop, false);
	equip = cm.getInventory(1).getItem(position);
	return true;
}
//��ȡװ������
function getItemType(itemid) {
	var type = Math.floor(itemid/10000);
	switch (type) {
		case 100:
			return 0;  //ñ��
		case 104:
			return 1;  //����
		case 105:
			return 2;  //��װ
		case 106:
			return 3;  //��ȹ
		case 107:
			return 4;  //Ь��
		case 108: 
			return 5;  //����
		case 110:
			return 6;  //����
		default:
			if (type==120)
				return -1;
			if (type==135)
				return -1;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //����
			}
			return -1; 
	}
}