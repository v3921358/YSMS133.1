function start() {
	if (cm.getBossLogAcc("�Ϲ����Ž�ָ") ==0) {

	cm.gainItem(1112246, 1);

	cm.setBossLogAcc("�Ϲ����Ž�ָ");
	cm.sendOk("�ɹ���ȡ");
	cm.dispose();
	} else {
	cm.sendOk("#bϣ����������ð�յ�������.");
       //cm.worldSpouseMessage(0x23, "����ָ������ : " + cm.getChar().getName() + " �ɹ���ȡ�˳�ʼ�Ϲ����Ž�ָ�������˽���֮·�����ף������������.");

	cm.dispose();
	}
}