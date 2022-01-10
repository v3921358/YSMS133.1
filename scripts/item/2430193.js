/*
    官方认证女生 1142796
*/

function start() {
    im.gainItem(2430193, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142796)).copy(); // 生成一个Equip类             
	toDrop.setStr(30000); //装备力量
	toDrop.setDex(30000); //装备敏捷
	toDrop.setInt(30000); //装备智力
	toDrop.setLuk(30000); //装备运气	
	toDrop.setHp(30000);
	toDrop.setMp(30000);
	toDrop.setMatk(30000); //魔法攻击
	toDrop.setWatk(30000); //物理攻击 
	toDrop.setWdef(30000);//物理防御
	toDrop.setMdef(30000);//魔法防御
	toDrop.setAcc(30000);//命中
	toDrop.setAvoid(30000);//回避
	//toDrop.setSpeed(30000);//移动速度
	toDrop.setJump(30000);//跳跃
	toDrop.setEnhance(25);//星之力
	toDrop.setBossDamage(200);//BOOS伤
	toDrop.setIgnorePDR(200);//无视防御
	toDrop.setTotalDamage(200);//总伤害
	toDrop.setAllStat(200);//全属性
	//toDrop.setLimitBreak(2100000000);//破功
	toDrop.setPotential1(40603);//潜能1
	toDrop.setPotential2(40603);//潜能1
	toDrop.setPotential3(40603);//潜能1
	//toDrop.setPotential2(60002);//潜能2
	//toDrop.setPotential3(60001);//潜能3
	toDrop.setPotential4(40603);//潜能4
	toDrop.setPotential5(40603);//潜能5
	toDrop.setPotential6(40603);//潜能6
	//toDrop.setOwner("女神认证");
	im.addFromDrop(im.getC(), toDrop, false);
	//im.gainItem(1142574, 1, 5);
	im.sendOk("恭喜您获得了一个 #r#z1142574##k 。");
	//im.worldSpouseMessage(0x23, "『女神认证』 : 恭喜 " + im.getChar().getName() + " 认证获得了 【官方认证女神】 勋章一枚.");
	//im.worldSpouseMessage(0x23, "『女神认证』 : 恭喜 " + im.getChar().getName() + " 认证获得了 【官方认证女神】 勋章一枚.");
	//im.worldSpouseMessage(0x23, "『女神认证』 : 恭喜 " + im.getChar().getName() + " 认证获得了 【官方认证女神】 勋章一枚.");
	im.dispose();
}