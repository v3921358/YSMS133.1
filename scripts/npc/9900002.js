var status = 0;
var typed = 0;
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
			var text = "��Ҫ����ֵ������\r\n";
			text += "#b#L1#�˽�ʲô�Ǹ���#l\r\n";
			text += "#b#L2#����С�����ײ�#l\r\n";
			text += "#b#L3#����޴󸣴��ײ�#l\r\n";
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 1) {
				var text = "#e#dʲô��С�����ײͣ�#n#k\r\n";
				text += "\t����С�����ײͿ������̻��#r��������[������]#k��#r20#k��#b����߼�װ��ǿ����#k��������#r30#k��#b����#k��ÿ��#b����#k�򿪿ɻ��#r7000#k#b���#k��ÿ��ֻ��ʹ��һ�����ۼ�Ϊ#b288ѩ����#k��\r\n";
				text += "#e#dʲô�Ǿ޴󸣴��ײͣ�#n#k\r\n";
				text += "\t����޴󸣴��ײͿ������̻��#r��������[����]#k�������Ƿ�ӵ�л��輼�ܣ������Խ��л��裬#r30#k��#b����߼�װ��ǿ����#k��1��#b��ϲ����#k����#b��ϲ����#k����������5���ǻ����5�ž�����������߱���װ��һ����ÿ��#b�޴󸣴�#k�򿪿ɻ��#r10000#k#b���#k��ÿ��ֻ��ʹ��һ�����ۼ�Ϊ#b588ѩ����#k��\r\n";
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 2) {
				cm.sendYesNo("�Ƿ�Ҫ����#r288#kѩ���ҹ���С�����ײͣ�");
				typed=1;
			} else if (selection == 3) {
				cm.sendYesNo("�Ƿ�Ҫ����#r588#kѩ���ҹ���޴󸣴��ײͣ�");
				typed=2;
			}
		} else if (status == 2) {
			if (typed==1) {				
				if (cm.haveItem(4310014, 288) && !cm.haveItem(2432529)) {
/*					if (cm.getBossLogAcc("С�����ײ�")==-1) {
						cm.sendOk("һ���˺�ֻ�ܰ���һ��#bС����#k�ײͣ��޷��ٰ���");
						cm.dispose();
						return;
					}*/
					cm.gainItem(2432529, 30);
					cm.gainItem(2049323, 20);
					cm.gainItem(2430297, 1);
					cm.gainItem(4310014, -288);
					cm.worldMessage(0x18, "�������ײ͡� : ��Ǯ�����ԣ���� " + cm.getChar().getName() + " ������С��������ײ�.");
					cm.getPlayer().dropMessage(1, "����ɹ���");
					cm.setBossLogAcc("С�����ײ�", -2);
					cm.dispose();
				} else {
					cm.sendOk("����ʧ�ܣ�����ѩ���Ҳ���������ϻ���δʹ����ĸ������޷�����");
					cm.dispose();
				}
			} else if (typed==2) {
				if (cm.haveItem(4310014, 588) && !cm.haveItem(2431481)) {
					/*if (cm.getBossLogAcc("�޴󸣴��ײ�")==-1) {
						cm.sendOk("һ���˺�ֻ�ܰ���һ��#b�޴󸣴�#k�ײͣ��޷��ٰ���");
						cm.dispose();
						return;
					}*/
					cm.gainItem(2431481, 30);
					cm.gainItem(2049323, 30);
					cm.gainItem(2431137, 1);
					cm.gainItem(2431989, 1);
					cm.gainItem(4310014, -588);
					cm.worldMessage(0x18, "�������ײ͡� : ��Ǯ�����ԣ���� " + cm.getChar().getName() + " �����˾޴󸣴�����ײ�.");
					cm.setBossLogAcc("�޴󸣴��ײ�", -2);
					cm.getPlayer().dropMessage(1, "����ɹ���");
					cm.dispose();
				} else {
					cm.sendOk("����ʧ�ܣ�����ѩ���Ҳ���������ϻ���δʹ����ľ޴󸣴����޷�����");
					cm.dispose();
				}
			}
		}
   }
}