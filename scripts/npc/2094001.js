var status = -1;

function action(mode, type, selection) {
	cm.gainPlayerEnergy(10);
	cm.removeAll(4001117);
	cm.removeAll(4031437);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.removeAll(4001260);
	cm.gainItem(2430216, 1);
	//cm.gainItem(4001485, 1);
	cm.worldSpouseMessage(0x20,"[�ճ��] ��ϲ��� "+ cm.getChar().getName() +" ����ռ��������л�� 1 ������ ��");
	cm.setEventCount("����");
	cm.setPartyEventCount("����1");
	cm.warp(910000000);
	cm.dispose();
}