/*
1212063 - 法弗纳魔力源泉杖         等级: 150 夜光法师
1222058 - 法弗纳天使手铳           等级: 150 天使武器
1232057 - 法弗纳死亡使者           等级: 150 复仇者
1242060 - 法弗纳精神之刃           等级: 150 尖兵
1302275 - 法弗纳银槲之剑           等级: 150 单手剑
1312153 - 法弗纳双刃切肉斧         等级: 150 单手斧头
1322203 - 法弗纳戈耳迪锤           等级: 150 单手钝器
1332225 - 法弗纳大马士革剑         等级: 150 短刀
1342082 - 法弗纳急速之刃           等级: 150 双刀副手
1362090 - 法弗纳洞察手杖           等级: 150 幻影
1372177 - 法弗纳魔力夺取者         等级: 150 短杖
1382208 - 法弗纳魔冠之杖           等级: 150 长杖
1402196 - 法弗纳忏悔之剑           等级: 150 双手剑
1412135 - 法弗纳战斗切肉斧         等级: 150 双手斧头
1422140 - 法弗纳闪电锤             等级: 150 双手钝器
1432167 - 法弗纳贯雷枪             等级: 150 龙骑 枪
1442223 - 法弗纳半月宽刃斧         等级: 150 战神 矛
1462193 - 法弗纳风翼弩             等级: 150 弩
1472214 - 法弗纳危险之手           等级: 150 拳套
1452205 - 法弗纳追风者             等级: 150 弓
1482168 - 法弗纳巨狼之爪           等级: 150 指节
1492179 - 法弗纳左轮枪             等级: 150 船长
1522094 - 法弗纳双风翼弩           等级: 150 双弩枪
1532098 - 法弗纳荣耀炮             等级: 150 火炮
1252015 - 法弗纳北极星魔法棒       等级: 150 林之灵)

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

1003797 - 高贵战士头盔             等级: 150
1003798 - 高贵流丹维奇帽           等级: 150
1003799 - 高贵游侠贝雷帽           等级: 150
1003800 - 高贵刺客软帽             等级: 150
1003801 - 高贵流浪者帽             等级: 150
1042254 - 鹰眼战士盔甲             等级: 150
1042255 - 鹰眼丹维奇长袍           等级: 150
1042256 - 鹰眼游侠斗篷             等级: 150
1042257 - 鹰眼刺客衬衣             等级: 150
1042258 - 鹰眼流浪者外衣           等级: 150
1062165 - 魔术师战士短裤           等级: 150
1062166 - 魔术师丹维奇短裤         等级: 150
1062167 - 魔术师游侠短裤           等级: 150
1062168 - 魔术师刺客短裤           等级: 150
1062169 - 魔术师流浪者短裤         等级: 150
*/


//                    需要的元宝                     判断当天充值金额      判断背包空格

function start() {
  if (im.getHyPay(1) >= 900 && im.getSevenDayPayLog(1).get(0) >= 900 && im.getSpace(1) >= 5) {
        im.gainItem(2430626, -1);
	im.addHyPay(900);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003800)).copy(); //[鲁塔比斯帽子]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(10); //物理攻击
	toDrop.setWatk(10); //魔法攻击
	toDrop.setBossDamage(50);// BOSS伤 
	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("限量版真·法弗纳系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1042257)).copy(); //[鲁塔比斯上衣]                    
	toDrop.setStr(40); //装备力量
	toDrop.setDex(40); //装备敏捷
	toDrop.setInt(40); //装备智力
	toDrop.setLuk(40); //装备运气
	toDrop.setMatk(10); //物理攻击
	toDrop.setWatk(10); //魔法攻击 
	toDrop.setBossDamage(50);// BOSS伤
	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("限量版真·法弗纳单件");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1062168)).copy(); //[鲁塔比斯裤子]                    
	toDrop.setStr(40); //装备力量
	toDrop.setDex(40); //装备敏捷
	toDrop.setInt(40); //装备智力
	toDrop.setLuk(40); //装备运气
	toDrop.setMatk(10); //物理攻击
	toDrop.setWatk(10); //魔法攻击 
	toDrop.setBossDamage(50);// BOSS伤
	toDrop.setIgnorePDR(20);// 无视防御
//	toDrop.setTotalDamage(20); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("限量版真·法弗纳单件");
	im.addFromDrop(im.getC(), toDrop, false);
/*      var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1082556)).copy(); //[漩涡手套]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1102623)).copy(); //[漩涡披风]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1132247)).copy(); //[漩涡腰带]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1152160)).copy(); //[漩涡护肩]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1012438)).copy(); //[漩涡文身]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1022211)).copy(); //[漩涡眼睛]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1032224)).copy(); //[漩涡耳环]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1122269)).copy(); //[漩涡吊坠]                    
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
	toDrop.setInt(50); //装备智力
	toDrop.setLuk(50); //装备运气
	toDrop.setMatk(20); //物理攻击
	toDrop.setWatk(20); //魔法攻击 
	toDrop.setOwner("限量版真·漩涡系列");
	im.addFromDrop(im.getC(), toDrop, false);

	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1522094)).copy(); //[武器]             
	toDrop.setStr(50); //装备力量
	toDrop.setDex(50); //装备敏捷
//	toDrop.setInt(50); //装备智力
//	toDrop.setLuk(50); //装备运气
//	toDrop.setMatk(200); //魔法攻击
	toDrop.setWatk(170); //物理攻击 
	toDrop.setBossDamage(100);// BOSS伤
	toDrop.setIgnorePDR(50);// 无视防御
	toDrop.setTotalDamage(10); //总伤害
	toDrop.setAllStat(20);// 全属性
	toDrop.setLimitBreak(20000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("限量版真·法弗纳系列");
	im.addFromDrop(im.getC(), toDrop, false);*/
	im.worldSpouseMessage(0x20, "『限量版消费礼包』 :  玩家 " + im.getChar().getName() + " 获得 限量版真·系法弗纳单件");
	im.sendOk("成功获得 #r限量版真·系漩涡套装系列#k八件 。");
	im.dispose(); 
   } else {
	im.sendOk("#r 您今天没有充值2000元，且没有2000元宝支付，或者背包装备栏不足 10 栏，无法获得真系漩涡套:\r\n\r\n");
	im.dispose();
    }
}