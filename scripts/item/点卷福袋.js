//�޴󸣴�
function start() {
	if (im.getBossLog("����޴󸣴�") == 0) {
		if (im.getSpace(4) <= 1) {
			im.sendOk("������λ�ò��㣬�޷��򿪸���");
			im.dispose();
		} else {
			im.gainNX(10000);
			im.getPlayer().dropMessage(1, "�Ӿ޴󸣴�����ȡ��10000���");
			im.gainItem(2431481, -1);
			im.setBossLog("����޴󸣴�");
			im.dispose();
		}
	} else {
		im.getPlayer().dropMessage(1, "�������Ѿ��򿪹��޴󸣴��������ٴδ�");
		im.dispose();
	}
	
}