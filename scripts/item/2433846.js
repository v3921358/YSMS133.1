//function start() {
	im.gainItem(2433846, -1);
	//im.gainNX(1, 200000);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1432167)).copy(); // ����һ��Equip��                    
	toDrop.setStr(10000); //װ������
	toDrop.setDex(10000); //װ������
	toDrop.setInt(10000); //װ������
	toDrop.setLuk(10000); //װ������
	toDrop.setMatk(10000); //������
	toDrop.setWatk(10000); //ħ������ 
	toDrop.setWdef(10000); //
	toDrop.setMdef(10000); //
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(20);
	toDrop.setLimitBreak(100000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	im.sendOk("��� #r#z1432167#");
	im.dispose();
}