function start() {
	if (im.getSpace(1) >= 2) { //
			im.gainItem(2432317, -1);
			var ii = im.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // 幻影150武器 1402196            
//			toDrop.setStr(40); //装备力量
			toDrop.setDex(60); //装备敏捷
//			toDrop.setInt(40); //装备智力
			toDrop.setLuk(60); //装备运气
//			toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(160); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(5000000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("真·埃苏系列");
			im.addFromDrop(im.getC(),toDrop,false);
			var ii = im.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1142796)).copy(); // 生成一个Equip类             
			toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气	
			toDrop.setHp(200);
			toDrop.setMp(200);
			toDrop.setMatk(20); //魔法攻击
			toDrop.setWatk(20); //物理攻击 
			toDrop.setWdef(100);//物理防御
			toDrop.setMdef(100);//魔法防御
			toDrop.setAcc(20);//命中
			toDrop.setAvoid(20);//回避
			toDrop.setSpeed(20);//移动速度
			toDrop.setJump(20);//跳跃
			toDrop.setEnhance(25);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
			toDrop.setOwner("男神认证");
			im.addFromDrop(im.getC(), toDrop, false);
			im.sendOk("恭喜您获得了礼包");
/*			im.worldSpouseMessage(0x23, "『真·法弗纳武器』 : 恭喜 " + im.getChar().getName() + " 获得了 真系法弗纳 武器一把.剩余 0 把");
			im.worldSpouseMessage(0x23, "『真·法弗纳武器』 : 恭喜 " + im.getChar().getName() + " 获得了 真系法弗纳 武器一把.剩余 0 把");
			im.worldSpouseMessage(0x23, "『真·法弗纳武器』 : 恭喜 " + im.getChar().getName() + " 获得了 真系法弗纳 武器一把.剩余 0 把");
			im.worldSpouseMessage(0x23, "『真·法弗纳武器』 : 恭喜 " + im.getChar().getName() + " 获得了 真系法弗纳 武器一把.剩余 0 把");
			im.worldSpouseMessage(0x23, "『真·法弗纳武器』 : 恭喜 " + im.getChar().getName() + " 获得了 真系法弗纳 武器一把.剩余 0 把");*/
			im.dispose();
				} else {
			im.sendOk(" 背包装备栏位已满,请清理.");
			im.dispose();
			}
}
