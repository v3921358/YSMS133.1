function start() {
	if (cm.getBossLogAcc("����") ==0) {
	//cm.gainItem(2431551, 20);
	cm.gainNX(1, 1000000);
	//cm.gainItem(5062009, 5000);
	//cm.gainItem(5062500, 5000);
	//cm.gainRMB(2000)
	cm.setBossLogAcc("����");
	cm.sendOk("�ɹ���ȡ");
	cm.dispose();
	} else {
	cm.sendOk("#bϣ������С��ð�յ�������.");
       cm.worldSpouseMessage(0x23, "��һ�ڵ�� : " + cm.getChar().getName() + " ͨ���г��ѿ�֮ӥ��ȡ��С�����͵İ���󽱣���ҿ�����ȡ��.");

	cm.dispose();
	}
}