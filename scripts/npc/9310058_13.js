function start() {
	if (cm.getBossLogAcc("����") ==0) {
	cm.gainItem(2431551, 20);
	cm.gainNX(1, 100000);
	cm.gainItem(5062009, 500);
	cm.gainItem(5062500, 500);
	cm.setBossLogAcc("����");
	cm.sendOk("�ɹ���ȡ");
	cm.dispose();
	} else {
	cm.sendOk("#bϣ�����ڷ�֮��½ð�յ�������.");
	cm.dispose();
	}
}