var status = 0;
var typed = 0;
var random1 = java.lang.Math.floor(Math.random() * 1000 + 1);
var random2 = java.lang.Math.floor(Math.random() * 3000 + 1);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("�װ���#r#h ##k���ã����ǻ�Ա�˺�����ͻ��ϵͳ:\r\n#r#L1#�˺�����ͻ�Ƽ��#l\r\n\r\n#L3#[����]�˺�����ͻ��-ģʽ(1) (#kĿǰ״̬��#r������#b)#l");
		} else if (status == 1) {
			if (selection == 1) {
				cm.sendOk("�װ���#r#h ##k����,�����˺�����ͻ��ϵͳ���:\r\n  ʹ�õ���: ��ǰְҵ��Ӧ�ȼ����� \r\n  ʹ�õ��: �κ������������˺�����ͻ�� \r\n\r\n\r\n\r\n#rע��ÿ���������׷��1���˺�,�����������.");
				cm.dispose();
			} else if (selection == 2) {
				if (cm.getBossLog("����ͻ��", 1) <= 10000000) {
					if (cm.haveItem(4033356, 5)) {
						if (cm.changeLimitBreak(random1)) {
							for (var i = 0; i < random1; i++) {
								cm.setBossLog("����ͻ��", 1);
							}
							cm.gainItem(4033356, -5);
							cm.sendOk("#b�˺�����ͻ�Ƴɹ�.\r\n\r\n����׷���˺�Ϊ��#r" + random1 + "#b.");
							cm.worldSpouseMessage(0x20, "[�˺�ͻ��] ��� " + cm.getChar().getName() + " ʹ�� �������1 �������˺�����ͻ�Ƴɹ� ����׷�� " + random1 + " �˺�ֵ ��");
						} else {
							cm.sendOk("#bͻ��ʧ��.\r\nϵͳΪ��⵽��ɫ����װ������.");
						}
						cm.dispose();
					} else {
						cm.sendOk("#bͻ��ʧ��.\r\n��Ҫ 5�� �������1 �ſ���ͻ��.");
						cm.dispose();
					}
				} else {
					cm.sendOk("#bͻ��ʧ��.\r\n������߶���ͻ��1000���˺�.");
					cm.dispose();
				}
			} else if (selection == 3) {
				if (cm.getBossLog("���ͻ��1", 1) <= 1000) {
					if (cm.haveItem(4000463, 120)) {
						if (cm.getLimitBreak() >= 100000000) {
							cm.sendOk("Ŀǰֻ��ͻ��1���˺���");
							cm.dispose();
							return;
						}
						if (cm.changeLimitBreak(1000000)) {
							cm.setBossLog("���ͻ��1", 1);
							cm.gainItem(4000463, -120);
							cm.sendOk("#b�˺�����ͻ�Ƴɹ�.\r\n\r\n����׷���˺�Ϊ��#r1000000#b.");
							cm.worldSpouseMessage(0x20, "[�˺�ͻ��] ��� " + cm.getChar().getName() + " ����Ҫ��ǿ��ʹ�ù���� �������˺�����ͻ�Ƴɹ� ����׷�� 100W �˺�ֵ��");
						} else {
							cm.sendOk("#bͻ��ʧ��.\r\nϵͳΪ��⵽��ɫ����װ������.");
						}
						cm.dispose();
					} else {
						cm.sendOk("#bͻ��ʧ��.\r\n��Ҫ 120�� ����� �ſ���ͻ��.");
						cm.dispose();
					}
				} else {
					cm.sendOk("#bͻ��ʧ��.\r\n������߶���ͻ��1E�˺�.");
					cm.dispose();
				}
			}
		}
	}
}