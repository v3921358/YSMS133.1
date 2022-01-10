function start() {
    im.gainItem(2433241, -1);
/*	im.gainNX(1, -1000000);
	im.gainItem(2430865, 1, 31);//随身服务
	im.gainItem(3994417, 3); //红色蜡笔
	im.gainItem(3994418, 3); //橙色蜡笔
	im.gainItem(3994419, 3); //黄色蜡笔
	im.gainItem(3994420, 3); //绿色蜡笔
	im.gainItem(3994421, 3); //青色蜡笔
	im.gainItem(3994422, 3); //蓝色蜡笔*/
	im.gainItem(1072746, 1); //暴君凯伦靴
	im.gainItem(1102484, 1); //暴君凯伦披风
	im.gainItem(1082546, 1); //暴君凯伦手套
	im.gainItem(1132177, 1); //暴君凯伦腰带
/*	im.gainItem(1102723, 1); //光明天使羽翼
	im.gainItem(1032219, 1); //遗忘之神话耳环
	im.gainItem(2432110, 1); //
	im.gainItem(2431454, 1); //
	im.gainItem(2049349, 5); //  
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // 生成一个Equip类                    
	toDrop.setStr(100); //装备力量
	toDrop.setDex(100); //装备敏捷
	toDrop.setInt(100); //装备智力
	toDrop.setLuk(100); //装备运气
	toDrop.setMatk(100); //物理攻击
	toDrop.setWatk(100); //魔法攻击 
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);*/
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1472214)).copy(); // 生成一个Equip类             
//	toDrop.setStr(40); //装备力量
//	toDrop.setDex(40); //装备敏捷
//	toDrop.setInt(40); //装备智力
//	toDrop.setLuk(40); //装备运气
//	toDrop.setMatk(200); //魔法攻击
	toDrop.setWatk(200); //物理攻击 
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
	toDrop.setOwner("真·法弗纳系列");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false); 
	//im.worldSpouseMessage(0x20,"『限时抢购礼包』：恭喜玩家 "+ im.getChar().getName() +" 购买限时豪华1000元的元旦大礼包.。");
	im.dispose();
}