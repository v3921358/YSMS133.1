//���۾���ñ��ȫ����+50

function start() {
        im.gainItem(2430813, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003719)).copy(); // ����һ��Equip��1142574

		toDrop.setStr(50); //װ������
		toDrop.setDex(50); //װ������
		toDrop.setInt(50); //װ������
		toDrop.setLuk(50); //װ������
		toDrop.setMatk(50); //������
		toDrop.setWatk(50); //ħ������ 
		toDrop.setSpeed(10); //�ƶ��ٶ�
		toDrop.setJump(10); //��Ծ
		toDrop.setBossDamage(100);// BOSS��
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
		im.worldSpouseMessage(0x21, "[���𹫸�] : ��ϲ " + im.getChar().getName() + " ���ۼƳ�ֵ8000Ԫ�����л�ü�Ʒ���Խ��۾���ñ.");
		im.worldSpouseMessage(0x21, "[���𹫸�] : ��ϲ " + im.getChar().getName() + " ���ۼƳ�ֵ8000Ԫ�����л�ü�Ʒ���Խ��۾���ñ.");
		im.worldSpouseMessage(0x21, "[���𹫸�] : ��ϲ " + im.getChar().getName() + " ���ۼƳ�ֵ8000Ԫ�����л�ü�Ʒ���Խ��۾���ñ.");
		im.worldSpouseMessage(0x21, "[���𹫸�] : ��ϲ " + im.getChar().getName() + " ���ۼƳ�ֵ8000Ԫ�����л�ü�Ʒ���Խ��۾���ñ.");
		im.worldSpouseMessage(0x21, "[���𹫸�] : ��ϲ " + im.getChar().getName() + " ���ۼƳ�ֵ8000Ԫ�����л�ü�Ʒ���Խ��۾���ñ.");

	im.dispose(); 
}