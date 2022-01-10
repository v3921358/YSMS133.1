function start() {
	if (im.getBossLogAcc("家族入驻福利1") ==0) {

	im.gainItem(2049124, 10); //正向混沌卷轴50%
	im.gainItem(2049137, 10);//惊人正义混沌卷轴 40%
	im.gainItem(3010737, 1); //椅子1个
	//im.gainItem(2431945, 2); //140级防具箱2个
	//im.gainItem(2430737, 1)  //9周年礼物箱周年庆宝箱1个

	im.gainNX(2, 150000);     //抵用卷15W
	im.gainNX(1, 100000);     //点卷10W
	im.gainMeso(100000000);  //1亿金币
        im.gainItem(2431737, -1);//领取成功该宝箱消失
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142355)).copy(); // 生成一个Equip类1142574

		toDrop.setStr(8); //装备力量
		toDrop.setDex(8); //装备敏捷
		toDrop.setInt(8); //装备智力
		toDrop.setLuk(8); //装备运气
		toDrop.setMatk(8); //物理攻击
		toDrop.setWatk(8); //魔法攻击 
		//toDrop.setSpeed(10); //移动速度
		//toDrop.setJump(10); //跳跃
		//toDrop.setBossDamage(30);// BOSS伤
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
		toDrop.setOwner("家族专属");
		//toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//可以使用3天，到期消失

		//toDrop.item.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//可以使用3天，到期消失
		im.addFromDrop(im.getC(), toDrop, false);

	//im.setBossLogAcc("家族入驻福利1");
	im.sendOk("成功领取家族入驻福利");
	im.dispose();
	} else {
	im.sendOk("#b希望您在流星冒险岛玩的愉快.");

       //cm.worldSpouseMessage(0x23, "『一亿点卷』 : " + cm.getChar().getName() + " 通过甘迪领取了点点赠送的一亿点卷，大家快来领取吧.");//全服公告，已经关闭

	im.dispose();
	}
}