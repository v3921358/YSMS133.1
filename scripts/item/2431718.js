function start() {
        im.gainItem(241718, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112915).copy(); // 生成一个Equip类1142796
		toDrop.setStr(20); //装备力量
		toDrop.setDex(20); //装备敏捷
		toDrop.setInt(20); //装备智力
		toDrop.setLuk(20); //装备运气
		toDrop.setMatk(200); //物理攻击
		toDrop.setWatk(200); //魔法攻击 
		toDrop.setSpeed(10); //移动速度
		toDrop.setJump(10); //跳跃
		toDrop.setBossDamage(200);// BOSS伤
		toDrop.setOwner("土豪专属");
		im.addFromDrop(im.getC(), toDrop, false);
		im.sendOk("成功获得 #r管理员送出的礼物#k 一个。");
		im.dispose(); 
}