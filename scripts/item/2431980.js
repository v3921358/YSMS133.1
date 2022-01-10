/*
	��Ծ����� 4��
*/

var status;
var maxtimes = 3;
var reward = Array(
					Array(2431987, 1, 1, 50),		// ������50%
					Array(2049300, 1, 3, 65),		// �߼�װ��ǿ������
					Array(2048307, 1, 3, 80),		// ���⸽��Ǳ�ܸ��Ӿ���
					Array(4310030, 3, 5, 75),		// �˶����
					Array(4310036, 50, 100, 60),		// �����߱�
					Array(4310058, 1, 2, 55),		//�����˹
					Array(5064000, 1, 1, 100)		// ��������
					);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0) {
		im.dispose();
		return;
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
	}

	if (status == 0) {
		if (im.getSpace(2) < maxtimes) {
			im.sendOk("�������ռ䲻�㣬��������ٴ�");
			im.dispose();
			return;
		}
		var togain = new Array();
		for (; maxtimes > 0; maxtimes--) {
			var chance = Math.floor(Math.random() * 999999);
			for (var i in reward) {
				if (Math.floor(chance / 999999 * 100) < reward[i][3] && !contains(togain, reward[i][0])) {
					var quantity = Math.floor(Math.random() * (reward[i][2] - reward[i][1]) + reward[i][1]);
					togain.push(new Array(reward[i][0], quantity));
					break;
				}
			}
		}
		im.gainItem(2431980, -1);
		var message = "[��Ծ�����] : [" + im.getPlayer().getName() + "]�ӻ�Ծ��4������л��";
		for (var item in togain) {
			message += "[" + im.getItemName(togain[item][0]) + togain[item][1] + "��] ";
			im.gainItem(togain[item][0], togain[item][1]);
		}
		im.showEffect(true, "Yut/goal");
		im.worldSpouseMessage(0x15, message);
		im.dispose();
	}
}

function contains(togain, itemid) {
	for (var i in togain) {
		if (togain[i][0] == itemid) {
			return true;
		}
	}
	return false;
}