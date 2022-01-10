var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var RMB = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		} 
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var selStr = "#d您当前可用星币为：  #r" +cm.getRMB() + " #d 星币，请选择您想要的：#k\r\n\r\n";
			//selStr +="#L1#"+aaa+" #r200 #b购买 #r#z2431938# #b一个#l#k\r\n";
			selStr +="#L2#"+aaa+" #r4990000#k #b购买 #r夜光法师150武器#k #b一个#l#k\r\n"; 
			selStr +="#L3#"+aaa+" #r4990000#k #b购买 #r爆力萌天使150武器#k #b一个#l#k\r\n";
			selStr +="#L4#"+aaa+" #r4990000#k #b购买 #r恶魔复仇者150武器#k #b一个#l#k\r\n";
			selStr +="#L5#"+aaa+" #r4990000#k #b购买 #r尖兵150武器#k #b一个#l#k\r\n";
			selStr +="#L6#"+aaa+" #r4990000#k #b购买 #r圣骑士150武器#k #b一个#l#k\r\n"; 
			selStr +="#L7#"+aaa+" #r4990000#k #b购买 #r恶魔猎手150级武器#k #b一个#l#k\r\n";
			selStr +="#L8#"+aaa+" #r4990000#k #b购买 #r侠盗150级武器#k #b一个#l#k\r\n";
			selStr +="#L9#"+aaa+" #r4990000#k #b购买 #r双刀副刀150级武器#k #b一个#l#k\r\n";
			selStr +="#L10#"+aaa+" #r4990000#k #b购买 #r幻影150级武器#k #b一个#l#k\r\n";
			selStr +="#L11#"+aaa+" #r4990000#k #b购买 #r法师150级武器#k #b一个#l#k\r\n";
			selStr +="#L12#"+aaa+" #r4990000#k #b购买 #r英雄150级武器#k #b一个#l#k\r\n";
			selStr +="#L13#"+aaa+" #r4990000#k #b购买 #r黑骑士150级武器#k #b一个#l#k\r\n";
			selStr +="#L14#"+aaa+" #r4990000#k #b购买 #r弓箭手150级武器#k #b一个#l#k\r\n";
			selStr +="#L15#"+aaa+" #r4990000#k #b购买 #r弩弓手150级武器#k #b一个#l#k\r\n";
			selStr +="#L16#"+aaa+" #r4990000#k #b购买 #r隐士150级武器#k #b一个#l#k\r\n";
			selStr +="#L17#"+aaa+" #r4990000#k #b购买 #r冲锋队长船长150级武器#k #b一个#l#k\r\n";
			selStr +="#L18#"+aaa+" #r4990000#k #b购买 #r船长150级武器#k #b一个#l#k\r\n";
			selStr +="#L19#"+aaa+" #r4990000#k #b购买 #r双弩精灵150级武器#k #b一个#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) { 
				typed=1;
				cm.sendYesNo("确定购买一个 #r#t2431938##k 吗? 将会使用掉您 #r200#k 星币。\r\n打开后您将获得制作150级装备所需要的全部材料，找市场的普通服务员可以制作想要的150级武器一把。");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("确定购买一个 #r#t1212063##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("确定购买一个 #r#t1222058##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("确定购买一个 #r#t1232057##k 吗? 将会使用掉您 #r4990000#k 星币\r\n以及#r 4990000000#k 点卷\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("确定购买一个 #r#t1242060##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("确定购买一个 #r#t1302275##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("确定购买一个 #r#t1322203##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("确定购买一个 #r#t1332225##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("确定购买一个 #r#t1342082##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("确定购买一个 #r#t1362090##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("确定购买一个 #r#t1382208##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("确定购买一个 #r#t1402196##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 13) {
				typed=13;
				cm.sendYesNo("确定购买一个 #r#t1432167##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 14) {
				typed=14;
				cm.sendYesNo("确定购买一个 #r#t1452205##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 15) {
				typed=15;
				cm.sendYesNo("确定购买一个 #r#t1462193##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 16) {
				typed=16;
				cm.sendYesNo("确定购买一个 #r#t1472214##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 17) {
				typed=17;
				cm.sendYesNo("确定购买一个 #r#t1482168##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 18) {
				typed=18;
				cm.sendYesNo("确定购买一个 #r#t1492179##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");
		} else if (selection == 19) {
				typed=19;
				cm.sendYesNo("确定购买一个 #r#t1522094##k 吗? 将会使用掉您 #r4990000#k 星币\r\n\r\n\r\n#b武器自身两项属性40\r\nBOSS伤害  + 100%\r\n怪物伤害  + 70%\r\n总攻击    + 20%\r\n武器破功  34,999,999\r\n可升级次数  8 次\r\n第一条：全属性20%\r\n第二条：总伤害12%\r\n第三条：BOSS伤害40%");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getRMB() >= 20000000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-2000000);
			////cm.gainNX(1, -4990000000);
			cm.gainItem(2431938, 1);
			cm.sendOk("恭喜您成功购买#t2431938#.");
			//cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

			//cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买一个法弗纳武器材料箱.");
			cm.dispose();
				} else {
			//cm.sendOk("充值2000000星币，可以在累计充值200星币奖励里面领取。");
			cm.dispose();
				}
			}else  if(typed==2){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1212063)).copy(); // 夜光法师150武器             
//			toDrop.setStr(40); //装备力量
//			toDrop.setDex(40); //装备敏捷
			toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			toDrop.setMatk(200); //魔法攻击
//			toDrop.setWatk(200); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1212063##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==3){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1222058)).copy(); //  爆力萌天使150武器           
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(130); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1222058##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==4){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1232057)).copy(); //  恶魔复仇者150武器           
			toDrop.setStr(40); //装备力量
			//toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(175); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1232057##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==5){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1242060)).copy(); //  尖兵150武器           
			//toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(130); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1242060##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==6){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1302275)).copy(); //  圣骑士150武器           
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1302275##k");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==7){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1322203)).copy(); //  恶魔猎手150级武器           
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1322203##k");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==8){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1332225)).copy(); //  侠客150级武器          
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1332225##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==9){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1342082)).copy(); //  双刀副刀150级武器         
			//toDrop.setStr(40); //装备力量
			//toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(80); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1342082##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==10){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1362090)).copy(); //  幻影150级武器         
			//toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(200); //魔法攻击
			toDrop.setWatk(170); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1362090##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==11){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1382208)).copy(); //  法师150级武器         
			//toDrop.setStr(40); //装备力量
			//toDrop.setDex(40); //装备敏捷
			toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			toDrop.setMatk(205); //魔法攻击
			//toDrop.setWatk(170); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1382208##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==12){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1402196)).copy(); //  英雄150级武器         
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(175); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1402196##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==13){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1432167)).copy(); //  黑骑士150级武器         
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(175); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1432167##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==14){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1452205)).copy(); //  弓箭手150级武器          
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1452205##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==15){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1462193)).copy(); //  弩弓手150级武器         
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1462193##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==16){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1472214)).copy(); //  隐士150级武器         
			//toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(90); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1472214##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==17){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1482168)).copy(); //  冲锋队长150级武器        
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(130); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1482168##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==18){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1492179)).copy(); //  船长150级武器        
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(130); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1492179##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==19){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1522094)).copy(); //  双弩精灵150级武器       
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			//toDrop.setInt(40); //装备智力
			//toDrop.setLuk(40); //装备运气
			//toDrop.setMatk(205); //魔法攻击
			toDrop.setWatk(165); //物理攻击 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("屌丝★系列");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您成功购买 #r屌丝★系列 #t1522094##k");
			cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
			cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列法弗纳 武器一把.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
           }
		} 
	  }
	}