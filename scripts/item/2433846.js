//function start() {
	im.gainItem(2433846, -1);
	//im.gainNX(1, 200000);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1432167)).copy(); // 生成一个Equip类                    
	toDrop.setStr(10000); //装备力量
	toDrop.setDex(10000); //装备敏捷
	toDrop.setInt(10000); //装备智力
	toDrop.setLuk(10000); //装备运气
	toDrop.setMatk(10000); //物理攻击
	toDrop.setWatk(10000); //魔法攻击 
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
	im.sendOk("获得 #r#z1432167#");
	im.dispose();
}