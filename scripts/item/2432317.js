function start() {
	if (im.getSpace(1) >= 2) { //
			im.gainItem(2432317, -1);
			var ii = im.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // ��Ӱ150���� 1402196            
//			toDrop.setStr(40); //װ������
			toDrop.setDex(60); //װ������
//			toDrop.setInt(40); //װ������
			toDrop.setLuk(60); //װ������
//			toDrop.setMatk(200); //ħ������
			toDrop.setWatk(160); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(5000000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("�桤����ϵ��");
			im.addFromDrop(im.getC(),toDrop,false);
			var ii = im.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1142796)).copy(); // ����һ��Equip��             
			toDrop.setStr(20); //װ������
			toDrop.setDex(20); //װ������
			toDrop.setInt(20); //װ������
			toDrop.setLuk(20); //װ������	
			toDrop.setHp(200);
			toDrop.setMp(200);
			toDrop.setMatk(20); //ħ������
			toDrop.setWatk(20); //������ 
			toDrop.setWdef(100);//�������
			toDrop.setMdef(100);//ħ������
			toDrop.setAcc(20);//����
			toDrop.setAvoid(20);//�ر�
			toDrop.setSpeed(20);//�ƶ��ٶ�
			toDrop.setJump(20);//��Ծ
			toDrop.setEnhance(25);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
			toDrop.setOwner("������֤");
			im.addFromDrop(im.getC(), toDrop, false);
			im.sendOk("��ϲ����������");
/*			im.worldSpouseMessage(0x23, "���桤������������ : ��ϲ " + im.getChar().getName() + " ����� ��ϵ������ ����һ��.ʣ�� 0 ��");
			im.worldSpouseMessage(0x23, "���桤������������ : ��ϲ " + im.getChar().getName() + " ����� ��ϵ������ ����һ��.ʣ�� 0 ��");
			im.worldSpouseMessage(0x23, "���桤������������ : ��ϲ " + im.getChar().getName() + " ����� ��ϵ������ ����һ��.ʣ�� 0 ��");
			im.worldSpouseMessage(0x23, "���桤������������ : ��ϲ " + im.getChar().getName() + " ����� ��ϵ������ ����һ��.ʣ�� 0 ��");
			im.worldSpouseMessage(0x23, "���桤������������ : ��ϲ " + im.getChar().getName() + " ����� ��ϵ������ ����һ��.ʣ�� 0 ��");*/
			im.dispose();
				} else {
			im.sendOk(" ����װ����λ����,������.");
			im.dispose();
			}
}
