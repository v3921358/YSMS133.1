function start() {
        im.gainItem(241718, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112915).copy(); // ����һ��Equip��1142796
		toDrop.setStr(20); //װ������
		toDrop.setDex(20); //װ������
		toDrop.setInt(20); //װ������
		toDrop.setLuk(20); //װ������
		toDrop.setMatk(200); //������
		toDrop.setWatk(200); //ħ������ 
		toDrop.setSpeed(10); //�ƶ��ٶ�
		toDrop.setJump(10); //��Ծ
		toDrop.setBossDamage(200);// BOSS��
		toDrop.setOwner("����ר��");
		im.addFromDrop(im.getC(), toDrop, false);
		im.sendOk("�ɹ���� #r����Ա�ͳ�������#k һ����");
		im.dispose(); 
}