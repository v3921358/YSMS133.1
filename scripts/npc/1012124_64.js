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
			//selStr +="\t#b您当前可用现金为：  #r" +cm.getRMB() + " #b 星币#n#k\r\n\r\n";
			selStr +="#L2#"+aaa+" #r1990000#k #b购买 屌丝装备 #rWELCOME特效土豪戒指#k  #b一个#l#k\r\n";

			selStr +=" \r\n\r\n";

			cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- 确定购买一个仙器 #e#d#z1112941##k 吗? 将会使用掉您 #r5990000#k 星币\r\n\r\n土豪心戒指自身四项属性100\r\n物理攻击力  + 100\r\n魔法攻击力  + 100\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- 确定购买一个仙器 #e#d#z1112941##k 吗? 将会使用掉您 #r1990000#k 星币\r\n\r\n土豪心戒指自身四项属性100\r\n物理攻击力  + 100\r\n魔法攻击力  + 100\r\n\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			}
		} else if (status == 2) {
			if(typed==1){// WELCOME特效
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
                if (cm.getRMB() >= 599 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-599);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // 生成一个Equip类  埃苏莱布斯宽大刀           
				toDrop.setStr(100); //装备力量
				toDrop.setDex(100); //装备敏捷
				toDrop.setInt(100); //装备智力
				toDrop.setLuk(100); //装备运气
				toDrop.setMatk(100); //魔法攻击
				toDrop.setWatk(100); //物理攻击 
				toDrop.setBossDamage(200);//BOOS伤
				//toDrop.setIgnorePDR(70);//无视防御
				//toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
//				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(50001);
//				toDrop.setPotential2(50002);



//				toDrop.setPotential1(40603);
//				toDrop.setPotential2(40603);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


//				toDrop.setOwner("仙器★土豪专署");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得仙器 #r#z1112941##b 一个.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜屌丝 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜真·土豪" + cm.getName() + "在会员屌丝商城购买仙器★土豪心戒指一个，大家快来抱大腿吧", 7, 180);
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x21, "『屌丝商城』 : 恭喜贵族玩家 " + cm.getChar().getName() + " 在屌丝商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到500元，请今日赞助500元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
				cm.dispose();
				}


			} else if(typed==2){// WELCOME特效
                if (cm.getSevenDayPayLog(1).get(0) >= 200 &&  cm.getRMB() >= 1990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-1990000);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // 生成一个Equip类  土豪心戒指           
				toDrop.setStr(100); //装备力量
				toDrop.setDex(100); //装备敏捷
				toDrop.setInt(100); //装备智力
				toDrop.setLuk(100); //装备运气
				toDrop.setMatk(100); //魔法攻击
				toDrop.setWatk(100); //物理攻击 
				//toDrop.setBossDamage(100);//BOOS伤
				//toDrop.setIgnorePDR(70);//无视防御
				//toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
//				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(50001);
//				toDrop.setPotential2(50002);



//				toDrop.setPotential1(40463);
//				toDrop.setPotential2(40463);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


//				toDrop.setOwner("仙器★土豪专署");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得仙器 #r#z1112941##b 一个.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜屌丝 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜真·土豪" + cm.getName() + "在会员屌丝商城购买仙器★土豪心戒指一个，大家快来抱大腿吧", 7, 180);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜屌丝 " + cm.getChar().getName() + " 在奇葩商城购买 仙器★土豪专署WELCOME特效一个.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到200元，请今日赞助200元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");				cm.dispose();
				}

			}
      }
   }
 }