//����
function start() {
	if (im.getBossLog("���丣��") == 0) {
		if (im.getSpace(4) <= 1) {
			im.sendOk("������λ�ò��㣬�޷��򿪸���");
			im.dispose();
		} else {
			im.gainNX(7000)
			im.getPlayer().dropMessage(1, "�Ӹ�������ȡ��7000���");
			im.gainItem(2432529, -1);
			im.setBossLog("���丣��");
			im.dispose();
		}
	} else {
		im.getPlayer().dropMessage(1, "�������Ѿ��򿪹������������ٴδ�");
		im.dispose();
	}
	
}