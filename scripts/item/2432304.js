/*function start() {
        im.gainItem(2432304, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142796).copy(); // ����һ��Equip��1142796
		toDrop.setStr(30); //װ������
		toDrop.setDex(30); //װ������
		toDrop.setInt(30); //װ������
		toDrop.setLuk(30); //װ������
		toDrop.setMatk(30); //��������
		toDrop.setWatk(30); //ħ������ 
		//toDrop.setSpeed(100); //�ƶ��ٶ�
		//toDrop.setJump(100); //��Ծ
		//toDrop.setBossDamage(30);// BOSS��
		toDrop.setOwner("����ר��");
		im.addFromDrop(im.getC(), toDrop, false);
		im.sendOk("�ɹ���� #r����Ա�ͳ�������#k һ����");
	im.dispose(); 
}*/

function start() {
        im.gainItem(2432304, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142796)).copy(); // ����һ��Equip��1142574

		toDrop.setStr(30); //װ������
		toDrop.setDex(30); //װ������
		toDrop.setInt(30); //װ������
		toDrop.setLuk(30); //װ������
		toDrop.setMatk(30); //��������
		toDrop.setWatk(30); //ħ������ 
		toDrop.setSpeed(10); //�ƶ��ٶ�
		toDrop.setJump(10); //��Ծ
		toDrop.setBossDamage(30);// BOSS��
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
		im.sendOk("�ɹ���� #r����Ա�ͳ�������#k һ����");
	im.dispose(); 
}