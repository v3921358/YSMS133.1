/* ������ - �������� */

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		//10�����Ҷ 4310080 ���� 4001839
		cm.sendSimple(head + "���������н�:\r\n#L1#" + icon + "��100�����Ƕһ�Ϊ1��10�����Ҷ#l\r\n#L2#" + icon + "��1��10�����Ҷ�һ�Ϊ95������#l\r\n");
	}
	if (status == 1)
	{
		if(!(cm.canHold(4310080, 1) && cm.canHold(4001839, 95))) {
			cm.sendOk(head + "�һ�ʧ��,����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ�.");
			cm.dispose();
			return;
		}
		switch (selection)
		{
		case 1:
			if (cm.haveItem(4001839, 100) == true) {
				cm.gainItem(4001839, - 100);
				cm.gainItem(4310080, + 1);
				cm.sendOk(head + "��ϲ��,�һ��ɹ�!");
				cm.dispose();
				return;
			} else {
				cm.sendOk(head + "�һ�ʧ��,��û��100������");
				cm.dispose();
				return;
			}
			break;
		case 2:
			if (cm.haveItem(4310080, 1) == true) {
				cm.gainItem(4310080, - 1);
				cm.gainItem(4001839, + 95);
				cm.sendOk(head + "��ϲ��,�һ��ɹ�!");
				cm.dispose();
				return;
			} else {
				cm.sendOk(head + "�һ�ʧ��,��û��1��10�����Ҷ");
				cm.dispose();
				return;
			}
			break;
		}
		cm.dispose();
		return;
	}
}