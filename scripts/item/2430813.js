//进价精灵帽子全属性+50

function start() {
        im.gainItem(2430813, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003719)).copy(); // 生成一个Equip类1142574

		toDrop.setStr(50); //装备力量
		toDrop.setDex(50); //装备敏捷
		toDrop.setInt(50); //装备智力
		toDrop.setLuk(50); //装备运气
		toDrop.setMatk(50); //物理攻击
		toDrop.setWatk(50); //魔法攻击 
		toDrop.setSpeed(10); //移动速度
		toDrop.setJump(10); //跳跃
		toDrop.setBossDamage(100);// BOSS伤
	/*	toDrop.setBossDamage(200);// BOSS伤
		toDrop.setIgnorePDR(200);// 无视防御
		toDrop.setTotalDamage(200); //总伤害
		toDrop.setAllStat(200);// 全属性
		toDrop.setPotential1(60001);
		toDrop.setPotential2(60002);
		toDrop.setPotential3(40603);
		toDrop.setPotential4(40603);
		toDrop.setPotential5(40603);
		toDrop.setPotential6(40603);*/
		toDrop.setOwner("土豪专属");
		//toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//可以使用3天，到期消失

		//toDrop.item.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//可以使用3天，到期消失
		im.addFromDrop(im.getC(), toDrop, false);
		im.sendOk("成功获得 #r管理员送出的礼物#k 一个。");
		im.worldSpouseMessage(0x21, "[至尊公告] : 恭喜 " + im.getChar().getName() + " 在累计充值8000元奖励中获得极品属性进价精灵帽.");
		im.worldSpouseMessage(0x21, "[至尊公告] : 恭喜 " + im.getChar().getName() + " 在累计充值8000元奖励中获得极品属性进价精灵帽.");
		im.worldSpouseMessage(0x21, "[至尊公告] : 恭喜 " + im.getChar().getName() + " 在累计充值8000元奖励中获得极品属性进价精灵帽.");
		im.worldSpouseMessage(0x21, "[至尊公告] : 恭喜 " + im.getChar().getName() + " 在累计充值8000元奖励中获得极品属性进价精灵帽.");
		im.worldSpouseMessage(0x21, "[至尊公告] : 恭喜 " + im.getChar().getName() + " 在累计充值8000元奖励中获得极品属性进价精灵帽.");

	im.dispose(); 
}