/*
    �ٷ���֤Ů�� 1142796
*/

function start() {
    im.gainItem(2430193, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142796)).copy(); // ����һ��Equip��             
	toDrop.setStr(30000); //װ������
	toDrop.setDex(30000); //װ������
	toDrop.setInt(30000); //װ������
	toDrop.setLuk(30000); //װ������	
	toDrop.setHp(30000);
	toDrop.setMp(30000);
	toDrop.setMatk(30000); //ħ������
	toDrop.setWatk(30000); //������ 
	toDrop.setWdef(30000);//�������
	toDrop.setMdef(30000);//ħ������
	toDrop.setAcc(30000);//����
	toDrop.setAvoid(30000);//�ر�
	//toDrop.setSpeed(30000);//�ƶ��ٶ�
	toDrop.setJump(30000);//��Ծ
	toDrop.setEnhance(25);//��֮��
	toDrop.setBossDamage(200);//BOOS��
	toDrop.setIgnorePDR(200);//���ӷ���
	toDrop.setTotalDamage(200);//���˺�
	toDrop.setAllStat(200);//ȫ����
	//toDrop.setLimitBreak(2100000000);//�ƹ�
	toDrop.setPotential1(40603);//Ǳ��1
	toDrop.setPotential2(40603);//Ǳ��1
	toDrop.setPotential3(40603);//Ǳ��1
	//toDrop.setPotential2(60002);//Ǳ��2
	//toDrop.setPotential3(60001);//Ǳ��3
	toDrop.setPotential4(40603);//Ǳ��4
	toDrop.setPotential5(40603);//Ǳ��5
	toDrop.setPotential6(40603);//Ǳ��6
	//toDrop.setOwner("Ů����֤");
	im.addFromDrop(im.getC(), toDrop, false);
	//im.gainItem(1142574, 1, 5);
	im.sendOk("��ϲ�������һ�� #r#z1142574##k ��");
	//im.worldSpouseMessage(0x23, "��Ů����֤�� : ��ϲ " + im.getChar().getName() + " ��֤����� ���ٷ���֤Ů�� ѫ��һö.");
	//im.worldSpouseMessage(0x23, "��Ů����֤�� : ��ϲ " + im.getChar().getName() + " ��֤����� ���ٷ���֤Ů�� ѫ��һö.");
	//im.worldSpouseMessage(0x23, "��Ů����֤�� : ��ϲ " + im.getChar().getName() + " ��֤����� ���ٷ���֤Ů�� ѫ��һö.");
	im.dispose();
}