function start() {
    im.gainItem(2433241, -1);
/*	im.gainNX(1, -1000000);
	im.gainItem(2430865, 1, 31);//�������
	im.gainItem(3994417, 3); //��ɫ����
	im.gainItem(3994418, 3); //��ɫ����
	im.gainItem(3994419, 3); //��ɫ����
	im.gainItem(3994420, 3); //��ɫ����
	im.gainItem(3994421, 3); //��ɫ����
	im.gainItem(3994422, 3); //��ɫ����*/
	im.gainItem(1072746, 1); //��������ѥ
	im.gainItem(1102484, 1); //������������
	im.gainItem(1082546, 1); //������������
	im.gainItem(1132177, 1); //������������
/*	im.gainItem(1102723, 1); //������ʹ����
	im.gainItem(1032219, 1); //����֮�񻰶���
	im.gainItem(2432110, 1); //
	im.gainItem(2431454, 1); //
	im.gainItem(2049349, 5); //  
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��                    
	toDrop.setStr(100); //װ������
	toDrop.setDex(100); //װ������
	toDrop.setInt(100); //װ������
	toDrop.setLuk(100); //װ������
	toDrop.setMatk(100); //������
	toDrop.setWatk(100); //ħ������ 
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);*/
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1472214)).copy(); // ����һ��Equip��             
//	toDrop.setStr(40); //װ������
//	toDrop.setDex(40); //װ������
//	toDrop.setInt(40); //װ������
//	toDrop.setLuk(40); //װ������
//	toDrop.setMatk(200); //ħ������
	toDrop.setWatk(200); //������ 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(20);
	toDrop.setLimitBreak(15000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("�桤������ϵ��");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false); 
	//im.worldSpouseMessage(0x20,"����ʱ�������������ϲ��� "+ im.getChar().getName() +" ������ʱ����1000Ԫ��Ԫ�������.��");
	im.dispose();
}