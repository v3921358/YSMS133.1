function start() {
	if (im.getBossLogAcc("������פ����1") ==0) {

	im.gainItem(2049124, 10); //����������50%
	im.gainItem(2049137, 10);//�������������� 40%
	im.gainItem(3010737, 1); //����1��
	//im.gainItem(2431945, 2); //140��������2��
	//im.gainItem(2430737, 1)  //9���������������챦��1��

	im.gainNX(2, 150000);     //���þ�15W
	im.gainNX(1, 100000);     //���10W
	im.gainMeso(100000000);  //1�ڽ��
        im.gainItem(2431737, -1);//��ȡ�ɹ��ñ�����ʧ
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142355)).copy(); // ����һ��Equip��1142574

		toDrop.setStr(8); //װ������
		toDrop.setDex(8); //װ������
		toDrop.setInt(8); //װ������
		toDrop.setLuk(8); //װ������
		toDrop.setMatk(8); //������
		toDrop.setWatk(8); //ħ������ 
		//toDrop.setSpeed(10); //�ƶ��ٶ�
		//toDrop.setJump(10); //��Ծ
		//toDrop.setBossDamage(30);// BOSS��
	/*	toDrop.setBossDamage(200);// BOSS��
		toDrop.setIgnorePDR(200);// ���ӷ���
		toDrop.setTotalDamage(200); //���˺�
		toDrop.setAllStat(200);// ȫ����
		toDrop.setPotential1(60001);
		toDrop.setPotential2(60002);
		toDrop.setPotential3(40603);
		toDrop.setPotential4(40603);
		toDrop.setPotential5(40603);
		toDrop.setPotential6(40603);*/
		toDrop.setOwner("����ר��");
		//toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//����ʹ��3�죬������ʧ

		//toDrop.item.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//����ʹ��3�죬������ʧ
		im.addFromDrop(im.getC(), toDrop, false);

	//im.setBossLogAcc("������פ����1");
	im.sendOk("�ɹ���ȡ������פ����");
	im.dispose();
	} else {
	im.sendOk("#bϣ����������ð�յ�������.");

       //cm.worldSpouseMessage(0x23, "��һ�ڵ�� : " + cm.getChar().getName() + " ͨ���ʵ���ȡ�˵�����͵�һ�ڵ����ҿ�����ȡ��.");//ȫ�����棬�Ѿ��ر�

	im.dispose();
	}
}