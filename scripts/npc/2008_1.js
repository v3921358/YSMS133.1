function start() {
cm.gainItem(3010145, 1);// ������ˮ����Ҷ����
			cm.gainItem(2430241, 1);//�ɰ�����������װ
                        cm.gainItem(2431090, 1);//��������
                        cm.gainMeso(100000);
	var ii = cm.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142144)).copy(); // ����һ��Equip��             
	toDrop.setStr(5); //װ������
	toDrop.setDex(5); //װ������
	toDrop.setInt(5); //װ������
	toDrop.setLuk(5); //װ������	
	toDrop.setHp(200);
	toDrop.setMp(200);
	toDrop.setMatk(5); //ħ������
	toDrop.setWatk(5); //������ 
	//toDrop.setWdef(100);//�������
	//toDrop.setMdef(100);//ħ������
	//toDrop.setAcc(20);//����
	//toDrop.setAvoid(20);//�ر�
	//toDrop.setSpeed(20);//�ƶ��ٶ�
	//toDrop.setJump(20);//��Ծ
	toDrop.setEnhance(25);
	toDrop.setOwner("����25������");
	cm.addFromDrop(cm.getC(), toDrop, false);
	cm.gainItem(2430241, 1);
	cm.gainItem(2431305, 1);
	cm.gainMeso(100000);
	cm.warp(50000, 0);
	cm.sendOk("#d��ӭ���� #r����ð�յ�#k #d,��������˽�һ�±�����ɫ��\r\n\r\n#b�� ����Ϊ�¹ٷ�ģʽ  ����10��  ���10��  ����10��\r\n�� ���˵���������ť(Ƶ������),���̳ǰ�ť �ṩ���ֱ�ݷ���\r\n�� ����������Ϸ�̵����ܶ��֣������뿴˵����\r\n�� ������ɫ��Ӹ����Լ�BOSS������\r\n�� Ϊ��������˳���ɳ�,����׼���������������\r\n�� ������Ĳ���������ǵ���ҽ���Ⱥ��#e#r12345678#n#k");
	cm.worldSpouseMessage(0x15,"������ײ���򡻣���ϲ��� "+ cm.getChar().getName() +" �������ҵ��� ����ð�յ�������ף����(��)�ɡ�");
	cm.worldSpouseMessage(0x15,"������ײ���򡻣���ϲ��� "+ cm.getChar().getName() +" �������ҵ��� ����ð�յ�������ף����(��)�ɡ�");
	cm.worldSpouseMessage(0x15,"������ײ���򡻣���ϲ��� "+ cm.getChar().getName() +" �������ҵ��˶���ð�յ�������ף����(��)�ɡ�");
	cm.dispose();
}