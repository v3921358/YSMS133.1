function start() {
        im.gainItem(2431591, -1);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142574)).copy(); // 生成一个Equip类   1142574     1112941             
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(50); //物理攻击
	toDrop.setWatk(50); //魔法攻击 
	toDrop.setSpeed(50); //移动速度
	toDrop.setJump(50); //跳跃
	toDrop.setAcc(50); //
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60001);
	toDrop.setPotential3(60002);
	toDrop.setPotential4(40603);
	toDrop.setPotential5(40603);
	toDrop.setPotential6(40603);
	toDrop.setOwner("豪华点装");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	//im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "『累计充值奖励』" + " : " + "玩家 " + im.getChar().getName() + " 从限量大乱斗礼包中获得了 浪漫四翼天使 一个"));
	im.sendOk("成功获得 #r官方认证女生#k 一个。");
	im.dispose(); 
}