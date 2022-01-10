/*
1212063 - 法弗纳魔力源泉杖 - (无描述)
1222058 - 法弗纳天使手铳 - (无描述)
1232057 - 法弗纳死亡使者 - (无描述)
1242060 - 法弗纳精神之刃   尖兵
1362090 - 法弗纳洞察手杖 - (无描述)
1372177 - 法弗纳魔力夺取者 - (无描述)
1382208 - 法弗纳魔冠之杖 - (无描述)
1402196 - 法弗纳忏悔之剑 - (无描述)
1432167 - 法弗纳贯雷枪 - (无描述)
1452205 - 法弗纳追风者 - (无描述)
1462193 - 法弗纳风翼弩 - (无描述)
1472214 - 法弗纳危险之手 - (无描述)
1482168 - 法弗纳巨狼之爪 - (无描述)
1522094 - 法弗纳双风翼弩 - (无描述)
1332225 - 法弗纳大马士革剑 - (无描述)
1212089 - 漩涡双头杖               等级: 160
1222084 - 漩涡灵魂手铳             等级: 160
1232084 - 漩涡恶魔剑               等级: 160
1242090 - 漩涡锁链剑               等级: 160
1252033 - 漩涡虎梳魔法棒           等级: 160
1302297 - 漩涡剑                   等级: 160
1312173 - 漩涡斧                   等级: 160
1322223 - 漩涡锤                   等级: 160
1332247 - 漩涡匕首                 等级: 160
1342090 - 漩涡刀                   等级: 160
1362109 - 漩涡手杖                 等级: 160
1372195 - 漩涡短杖                 等级: 160
1382231 - 漩涡长杖                 等级: 160
1402220 - 漩涡双手剑               等级: 160
1412152 - 漩涡双手战斧             等级: 160
1422158 - 漩涡巨锤                 等级: 160
1432187 - 漩涡矛                   等级: 160
1442242 - 漩涡戟                   等级: 160
1452226 - 漩涡弓                   等级: 160
1462213 - 漩涡弩                   等级: 160
1472235 - 漩涡拳甲                 等级: 160
1482189 - 漩涡冲拳                 等级: 160
1492199 - 漩涡手铳                 等级: 160
1522113 - 漩涡双翼短杖             等级: 160
1532118 - 漩涡手炮                 等级: 160
*/




function start() {
  if (im.getHyPay(1) >= 2000 && im.getSevenDayPayLog(1).get(0) >= 2000 && im.getSpace(1) >= 10) {
        im.gainItem(2430626, -1);
	im.addHyPay(2000);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003976)).copy(); //[漩涡帽子]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1052669)).copy(); //[漩涡外套]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1072870)).copy(); //[漩涡鞋子]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1082556)).copy(); //[漩涡手套]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1102623)).copy(); //[漩涡披风]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1132247)).copy(); //[漩涡腰带]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击
	toDrop.setBossDamage(40);// BOSS伤 
//	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1152160)).copy(); //[漩涡护肩]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1012438)).copy(); //[漩涡文身]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
//	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1022211)).copy(); //[漩涡眼睛]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
	toDrop.setIgnorePDR(10);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1032224)).copy(); //[漩涡耳环]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
//	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1122269)).copy(); //[漩涡吊坠]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setBossDamage(40);// BOSS伤 
//	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1452226)).copy(); //[武器]             
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(200); //魔法攻击
	toDrop.setWatk(140); //物理攻击 
	toDrop.setBossDamage(100);// BOSS伤
	toDrop.setIgnorePDR(50);// 无视防御
	toDrop.setTotalDamage(10); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setLimitBreak(50000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("真.系漩涡");
	im.addFromDrop(im.getC(), toDrop, false);
	im.worldSpouseMessage(0x20, "『限量版消费礼包』 :  玩家 " + im.getChar().getName() + " 获得 限量版真.系漩涡套装");
	im.sendOk("成功获得 #r限量版真.漩涡系列#k 八件套。");
	im.dispose(); 
   } else {
	im.sendOk("#r 您今天没有充值2000元，且没有2000元宝支付，或者背包装备栏不足10栏，无法获得:\r\n\r\n");
	im.dispose();
    }
}