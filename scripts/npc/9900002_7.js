var status = 0;
var bossid = "��ֵ�������";
var giftLevel = Array(1000, 2000, 3000, 5000);
var giftContent = Array(


//���1=1000Ԫ���
Array(2431194, 1, 1),//ð������ѡ����1��
Array(2434228, 1, 1), //³����˹������ѡ��1��

//���2=2000Ԫ���
Array(2434228, 1, 2),//³����˹������ѡ��1��
Array(2432715, 1, 2),//������װ��ѡ��1��

//���3=3000Ԫ���
Array(2434228, 1, 3),//³����˹������ѡ��1��
Array(2432715, 1, 3),//������װ��ѡ��1��
Array(2434006, 2, 3),//��߱��յ���ѡ��2��

//���4=5000Ԫ���
Array(2432715, 2, 4),//������װ��ѡ��2��
Array(2434006, 2, 4)//��߱��յ���ѡ��2��
//Array(1112941, 1, 4),//ȫ����+100��������1��


)

var equiplist = new Array(
	//Array(1, 1112793, 10, 10, 10, 10, 10, 10, 0, 0, 0),//���ֽ�ָ��Ӧ��������1��ȫ����+10�����3��0����3��Ǳ�ܣ�0Ϊ����Ǳ��
	Array(4, 1112941, 100, 100, 100, 100, 100, 100, 0, 0, 0)//������
	//Array(33, 1003843, 20, 20, 20, 20, 15, 15, 0, 0, 0)

	//Array(34, 1522094, 102, 100, 100, 100, 200, 200, 40601, 40291, 40081)
);


var giftId = -1;
var giftToken = Array();
var gifts = null;
var column = new Array("װ��", "����", "����", "����", "�̳�");

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
		text += "���ã��ۼƳ�ֵ�ﵽ����Ҫ�󼴿���ȡ�ۼƳ�ֵ���������\r\n#d����ǰ�ۼƳ�ֵ��#n#r��" + cm.getTotalRMB() + "#k   #k\r\n";
		text += "#r�ۼƳ�ֵ��1000Ԫ���Ի�����е��ߣ�\r\n#bð������ѡ����1����³����˹������ѡ��1��#k\r\n";
		text += "#r�ۼƳ�ֵ��2000Ԫ���Ի�����е��ߣ�\r\n#b³����˹������ѡ��1��������������װ��ѡ��1��#k\r\n";
		text += "#r�ۼƳ�ֵ��3000Ԫ���Ի�����е��ߣ�\r\n#b³����˹������ѡ��1��������������װ��ѡ��1������߱��յ���ѡ��2��#k\r\n";
		text += "#r�ۼƳ�ֵ��5000Ԫ���Ի�����е��ߣ�\r\n#b����������װ��ѡ��2������߱��յ���ѡ��2����ȫ����+100������1��#k\r\n";
		text += "#r�ۼƳ�ֵ��10000Ԫ�ҿͷ���̸#k #g�������鿴��ȡ����\r\n";
		text += "#b��ѡ������ȡ������ÿ���ͬһ�˻�����1��#k\r\n";
		for (var key in giftLevel) {
			var tips = "";
			giftToken[key] = false;
			if (cm.getTotalRMB() >= giftLevel[key]) {
				if (cm.getBossLogAcc(bossid + key) != -1) {
					tips = "(����ȡ)";
					giftToken[key] = true;
				} else {
					tips = "#g(����ȡ)#b";
				}
			} else {
				tips = "#r(��������)#b";
			}
			text += "#b#L" + (parseInt(key) + 1) + "#��ȡ#r#e" + giftLevel[key] + "#n#bԪ��ֵ������� " + tips + "#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text = "#r#e" + giftLevel[giftId - 1] + "#n#bԪ��ֵ����������ݣ�\r\n";
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
		text += "\r\n#d�Ƿ����ھ���ȡ�������#k";
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
					cm.sendOk("����" + column[key] + "��λ�ռ䲻��" + bagsolt[key] + "���������������ȡ��");
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
				cm.sendOk("��ϲ������ȡ�ɹ�����򿪰��������ɣ�");
				//cm.channelMessage(0x18, "����ֵ���������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�� " + giftLevel[giftId - 1] + "Ԫ ��ֵ���������");
				cm.dispose();
			} else {
				status = -1;
				cm.sendSimple("���Ѿ�����˸�������߳�ֵ���δ�ﵽҪ���޷���ȡ��");
			}
		} else {
			cm.sendOk("��ȡ��������ϵ����Ա��");
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