function start() {
	if (cm.getBossLogAcc("��Ա1") ==0) {
	//cm.gainItem(2431551, 20);
	cm.gainNX(1, 1000000000);
	cm.gainItem(2430865, 1);
	cm.gainMeso(1000000000);
	cm.gainRMB(10000)
	cm.setBossLogAcc("��Ա1");
	cm.sendOk("�ɹ���ȡ");
	cm.dispose();
	} else {
	cm.sendOk("#bϣ�����ڵ��ð�յ�������.");
       cm.worldSpouseMessage(0x23, "����ȡ��Ա�� : " + cm.getChar().getName() + " ͨ���ʵ���ȡ�˵�����͵Ļ�Ա����ң����ֽ𣬴�ҿ�����ȡ��.");

	cm.dispose();
	}
}