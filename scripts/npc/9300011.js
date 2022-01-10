status = -1;
var event;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
	event = cm.getEventManager("Gailou"); //��ȡ��ű������� test ��Ӧ event Ŀ¼����� gailou.js �ļ�
	if (status == 0) {
		if (event == null) {
			cm.sendOk(head + "��ű�����...����ϵ����Ա�޸��������´򿪡�");
			cm.dispose();
		} else if (cm.getPlayer().getClient().getChannel() != 1) {
			cm.sendOk(head + "�ֻ����1Ƶ�����У��ף�");
			cm.dispose();
		} else if (event != null && event.getProperty("state").equals("true")) {
			cm.sendYesNo(head + "�װ���#r#h ##k���ã����Ǹ�¥�Ա�����λʱ��Ϊ10����.\r\n���һ�Ƚ������Ƚ�.���Ƚ�\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ�����1����þ�\r\n���Ƚ���һ�Ƚ�֮�������¥��10�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1�������� 0 - 2000���þ�\r\n�ǾͿ��������� ��ʼ�ɣ�");
		} else {
			cm.sendOk(head + "#b��¥��#r[һ���ĸ��ʻ��]#b������ߣ��������ߣ�FFN���ߣ�������Ʒ���ǻ������װ���ȵȼ�Ʒ����\r\n#k���δ�������߻�Ѿ�������ÿСʱ��10�ֿ���, �������������������\r\n���ע���Ǹ�¥������μӡ�\r\n���һ�Ƚ������Ƚ������Ƚ�.\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ���\r\n���Ƚ���һ�Ƚ�֮�������¥��15�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1�������� 0 - 2000���þ�");
			cm.dispose();
		}
	} else if (status == 1) {
		if (event != null && event.getProperty("state").equals("true")) {
			event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 1)); //���õ������+1
			var count = parseInt(event.getProperty("check")); //����ܵ������
			var max = parseInt(event.getProperty("maxCheck"));
			var Cheat = event.getProperty("Message");
			var dj = rand(2000, 5000);
			var dj3 = rand(0, 2000);
			if (Cheat != null) {
				var namelist = Cheat.split(",");
				if (namelist.length != 0) {
					var times = 0;
					for (var i in namelist) {
						if (namelist[i] == cm.getName()) {
							times += 1;
						}
					}
					if (times >= 2) {
						cm.sendOk("���Ѿ��������������...���ܼ��������ˣ�\r\n");
						cm.dispose();
						return;
					}
				}
			}
			if (count == max) {
				cm.gainNX(2, + 10000);
				cm.gainItem(2430779, 5);
				cm.worldMessageEffect("[��¥�] ��ϲ��� " + cm.getName() + " ����¥��л��һ�Ƚ�,��������Ľ����ҿ���ף�����������ɣ�", 1, 180);

				cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л��һ�Ƚ�,��������Ľ");
				event.setProperty("Message", "" + cm.getName());
				event.setProperty("endEvent", "true");
				cm.sendOk(head + "[��¥�] ��ϲ��������¥�һ�Ƚ���");
			} else if (count > max && count <= (max + 10)) {
				cm.gainNX(2, + dj);
				cm.gainItem(240779, 3);
				cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�ö��Ƚ�,��������Ľ");
				event.setProperty("Message", "" + Cheat + "," + cm.getName());
				cm.sendOk(head + "��ϲ��������¥����Ƚ���");
			} else if (count > (max + 1)) {
				cm.gainNX(2, + dj3);
				cm.gainItem(2430779, 1);

				event.setProperty("state", "false");
				cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�����Ƚ� " + dj3 + "���þ�.������¥��Ѿ�����...");
				event.setProperty("Message", "" + Cheat + "," + cm.getName());
				cm.sendOk(head + "��ϲ��������¥����Ƚ���\r\n���� 0 - 2000 ���þ��ȡ�\r\n������¥��Ѿ�����...");
			} else {
				cm.sendOk(head + "��ǰ¥��: " + parseInt(event.getProperty("check")) + " ¥��");
			}
		} else {
			cm.sendOk(head + "���δ�������߻�Ѿ����������н������Ѿ����ţ����´��ڲμӡ�");
		}
		cm.dispose();
	}
}

function rand(lbound, ubound) {
	return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}

function split(string) {
	for (var i = 0; i < string;) {

	}
}