var status = 0;
var bossid = "��ֵ�������";
var giftLevel = Array(100, 300, 500, 1000, 2000, 3000, 5000, 8000);
var giftContent = Array(

//���1=100Ԫ���
//Array(1112793, 1, 1),//����ָ��
Array(2049135, 20, 1),//����20%��
Array(5062009, 50, 1),//����ħ��
Array(5062500, 50, 1),//��ʦ����ħ��
Array(4001839, 500, 1), //����
//Array(5750000, 10, 1),//����ħ��

//���2=300Ԫ���
Array(2431194, 1, 2),//ð������ѡ��
Array(2049135, 50, 2),//����20%��
Array(5062009, 100, 2),//����ħ��
Array(5062500, 100, 2),//��ʦ����ħ��
Array(4001839, 1000, 2), //����

//���3=500Ԫ���
Array(2431938, 1,3),//����������������
Array(2049135, 100, 3),//����20%��
Array(5062009, 200, 3),
Array(5062500, 200, 3),
Array(4001839, 2000, 3),//����
//Array(5750000, 30, 3),//����ħ��

//���4=1000Ԫ���
//Array(2432341, 1, 4),//³����˹���������������
Array(2433245, 1, 4), //³����˹������ѡ��װ
Array(2049137, 20, 4),//����40%��
Array(2340000, 50, 4),//ף����
Array(5062009, 500, 4),//����ħ��
Array(5062500, 500, 4),//��ʦ����ħ��
Array(4001839, 3000, 4),//����
//Array(5750000, 50, 4),//����ħ��

//���5=2000Ԫ���
Array(1113075, 1, 5),//��߼����յ½�ָ
Array(1032223, 1, 5),//����
Array(1122267, 1, 5),//��׹
Array(1132246, 1, 5),//����
Array(2049137, 30, 5),//����40%��
Array(2340000, 80, 5),//ף����
Array(5750000, 50, 5),//����ħ��
Array(5062024, 50, 5),//����ħ��
Array(4001839, 4000, 5),//����

//���6=3000Ԫ���
Array(2433247, 1, 6), //������װ��ѡ��
Array(2049137, 50, 6),//����40%��
Array(2340000, 100, 6),//ף����
Array(5750000, 100, 6),//����ħ��
Array(5062024, 100, 6),//����ħ��
Array(4001839, 5000, 6),//����

//���7=5000Ԫ���
Array(2049137, 100, 7),//����40%��
Array(2340000, 200, 7),//ף����
Array(5750000, 200, 7),//����ħ��
Array(5062024, 200, 7),//����ħ��
Array(4001839, 8000, 7),//����
Array(3994417, 1, 7),//����
Array(3994418, 1, 7),
Array(3994419, 1, 7),
Array(3994420, 1, 7),
Array(3994421, 1, 7),
Array(3994422, 1, 7),


//���8=8000Ԫ���
Array(2049137, 200, 8),//����40%��
Array(2340000, 300, 8),//ף����
Array(5750000, 300, 8),//����ħ��
Array(5062024, 300, 8),//����ħ��
Array(4001839, 10000, 8),//����
Array(3994417, 3, 8),//����
Array(3994418, 3, 8),
Array(3994419, 3, 8),
Array(3994420, 3, 8),
Array(3994421, 3, 8),
Array(3994422, 3, 8)


)

var equiplist = new Array(
	Array(1, 1112793, 10, 10, 10, 10, 10, 10, 0, 0, 0),//���ֽ�ָ��Ӧ��������1��ȫ����+10�����3��0����3��Ǳ�ܣ�0Ϊ����Ǳ��
	Array(7, 1112941, 100, 100, 100, 100, 100, 100, 0, 0, 0)//������
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
		text += "���ã��ۼƳ�ֵ�ﵽ����Ҫ�󼴿���ȡ�ۼƳ�ֵ���������\r\n#d����ǰ�ۼƳ�ֵ��#n#r��" + cm.getTotalRMB() + "#k   #g�������鿴��ȡ����#k\r\n";
		text += "#r�ۼƳ�ֵ��100Ԫ���Ի�����е��ߣ�\r\n#bȫ����+10����ָ��x1������ǿ����20%x20��������ħ��x50������ʦ����ħ��x50����ǿ������x500��#k\r\n";
		text += "#r�ۼƳ�ֵ��300Ԫ���Ի�����е��ߣ�\r\n#b��ְҵð����x1������ǿ����20%x50��������ħ��x100������ʦ����ħ��x100����ǿ������x1000��#k\r\n";
		text += "#r�ۼƳ�ֵ��500Ԫ���Ի�����е��ߣ�\r\n#bFFN������ѡ��x1,����ǿ����20%x100��������ħ��x300������ʦ����ħ��x200����ǿ������x2000��#k\r\n";
		text += "#r�ۼƳ�ֵ��1000Ԫ���Ի�����е��ߣ�\r\n#b³����˹����x1��,����ǿ����40%x20��,ף����x50��,����ħ��x500������ʦ����ħ��x300����ǿ������x3000��#k\r\n";
		text += "#r�ۼƳ�ֵ��2000Ԫ���Ի�����е��ߣ�\r\n#b��߼����յ���Ʒx1��,����ǿ����40%x30��,ף����x80��,����ħ��x50��������ħ��x50��ǿ������x4000��#k\r\n";
		text += "#r�ۼƳ�ֵ��3000Ԫ���Ի�����е��ߣ�\r\n#b��������x1��,����ǿ����40%x50��,ף����x100��,����ħ��x100��������ħ��x100����ǿ������5000x��#k\r\n";
		text += "#r�ۼƳ�ֵ��5000Ԫ���Ի�����е��ߣ�\r\n#bȫ����+100������x1������ǿ����40%x100��,ף����x200,����ħ��x200��������ħ��x200������ɫ����x1�ף�ǿ������x8000��#k\r\n";
		text += "#r�ۼƳ�ֵ��8000Ԫ���Ի�����е��ߣ�\r\n#b��������Ǳ����ѡ����x1�����������ҿͷ���ȡ��,����ǿ����40%x200��,ף����x300��,����ħ��x300��������ħ��x300������ɫ����x3�ף�ǿ������x10000��#k\r\n";
		text += "#r�ۼƳ�ֵ��10000Ԫ�ҿͷ���̸#k\r\n";
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
				cm.channelMessage(0x18, "����ֵ���������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�� " + giftLevel[giftId - 1] + "Ԫ ��ֵ���������");
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