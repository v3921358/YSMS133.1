function start() {
	if (im.getBossLogAcc("����1") ==0) {

	im.gainItem(2431878, -1);//��ȡ�ɹ��ñ�����ʧ

	im.gainItem(3015116, 1); //����1��
	im.gainNX(2, 100000);     //���þ�10W
	im.gainNX(1, 50000);     //���5W
	im.gainItem(2049124, 5); //����������50%
	im.gainItem(2049750, 1); //S��Ǳ�ܾ�80%
	im.gainItem(2049135, 20);//�������������� 20%
	im.gainMeso(30000000);  //���5ǧ��
	im.gainItem(2430737, 1)  //��������������ѡ��1�� 

	im.setBossLogAcc("����1");
	im.sendOk("�ɹ���ȡ�ڲ⽱��");
	im.dispose();
	} else {
	im.sendOk("#bϣ����������������.");
       //cm.worldSpouseMessage(0x23, "���ڲ⽱���� : " + cm.getChar().getName() + " ��ȡ���ڲ⽱������ҿ�����ȡ��.");

	im.dispose();
	}
}