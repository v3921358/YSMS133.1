function start() {
	im.gainItem(2432110, -1);
	im.teachSkill(80001222, 1);
	im.sendOk("��ϲ����� #r����#k ��� #r�������#k ��#s80001222#\r\n��ʾ����˫���Լ������Ϣ������������");
	im.worldSpouseMessage(0x20, "���������ʹ��ȯ�� : ��� " + im.getChar().getName() + " ��ȡ�˻�����輼�ܡ���");
	im.dispose();
}