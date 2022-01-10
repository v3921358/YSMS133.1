var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

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
			var selStr = "- #d当前背包已有：#k#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k     #d可兑换#i1112793##k\r\n\r\n";
			selStr +="#r#t1112793#属性选择：#k#k\r\n";
			selStr +="#L1##b"+aaa+"  攻击/魔攻 +  5 #r( " + cm.getItemQuantity("4310108") + " / 200 个)#l#k\r\n";
			selStr +="#L2##b"+aaa+"  攻击/魔攻 + 10 #r( " + cm.getItemQuantity("4310108") + " / 500 个)#l#k\r\n";
			selStr +="#L3##b"+aaa+"  攻击/魔攻 + 20 #r( " + cm.getItemQuantity("4310108") + " / 1000 个)#l#k\r\n";
			selStr +="#L4##b"+aaa+"  攻击/魔攻 + 30 #r( " + cm.getItemQuantity("4310108") + " / 1500 个)#l#k\r\n";
			selStr +="#L5##b"+aaa+"  攻击/魔攻 + 40 #r( " + cm.getItemQuantity("4310108") + " / 2500 个)#l#k\r\n";
			selStr +="#L6##b"+aaa+"  攻击/魔攻 + 50 #r( " + cm.getItemQuantity("4310108") + " / 4000 个)#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e200 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 5    - #e敏捷#n: 5    - #e智力#n: 5\r\n- #e运气#n: 5    - #e攻击#n: 5    - #e魔攻#n: 5\r\n\r\n");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e500 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 10    - #e敏捷#n: 10    - #e智力#n: 10\r\n- #e运气#n: 10    - #e攻击#n: 10    - #e魔攻#n: 10\r\n\r\n");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e1000 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 20    - #e敏捷#n: 20    - #e智力#n: 20\r\n- #e运气#n: 20    - #e攻击#n: 20    - #e魔攻#n: 20\r\n\r\n");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e1500 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 30    - #e敏捷#n: 30    - #e智力#n: 30\r\n- #e运气#n: 30    - #e攻击#n: 30    - #e魔攻#n: 30\r\n\r\n");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e2500 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 40    - #e敏捷#n: 40    - #e智力#n: 40\r\n- #e运气#n: 40    - #e攻击#n: 40    - #e魔攻#n: 40\r\n\r\n");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #d当前背包已拥有：#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e4000 个可兑换成以下物品： #i1112793##n#k\r\n\r\n- #e#r力量#n: 50    - #e敏捷#n: 50    - #e智力#n: 50\r\n- #e运气#n: 50    - #e攻击#n: 50    - #e魔攻#n: 50\r\n\r\n");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4310108, 200) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -200);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(5); //装备力量
			toDrop.setDex(5); //装备敏捷
			toDrop.setInt(5); //装备智力
			toDrop.setLuk(5); //装备运气
			toDrop.setMatk(5); //物理攻击
			toDrop.setWatk(5); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(天然) 一个,羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 200 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.haveItem(4310108, 500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(10); //装备力量
			toDrop.setDex(10); //装备敏捷
			toDrop.setInt(10); //装备智力
			toDrop.setLuk(10); //装备运气
			toDrop.setMatk(10); //物理攻击
			toDrop.setWatk(10); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 全属性+10 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(全属性+10),羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 500 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.haveItem(4310108, 1000) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -1000);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气
			toDrop.setMatk(20); //物理攻击
			toDrop.setWatk(20); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 全属性+20 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(全属性+20),羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 1000 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.haveItem(4310108, 1500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -1500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(30); //装备力量
			toDrop.setDex(30); //装备敏捷
			toDrop.setInt(30); //装备智力
			toDrop.setLuk(30); //装备运气
			toDrop.setMatk(30); //物理攻击
			toDrop.setWatk(30); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 全属性+30 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(全属性+30),羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 1500 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.haveItem(4310108, 2500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -2500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			toDrop.setMatk(40); //物理攻击
			toDrop.setWatk(40); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 全属性+40 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(全属性+40),羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 2500 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}else if(typed==6){
                if (cm.haveItem(4310108, 4000) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -4000);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // 生成一个Equip类                    
			toDrop.setStr(50); //装备力量
			toDrop.setDex(50); //装备敏捷
			toDrop.setInt(50); //装备智力
			toDrop.setLuk(50); //装备运气
			toDrop.setMatk(50); //物理攻击
			toDrop.setWatk(50); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("恭喜您获得了 #r快乐指环#k 全属性+50 一个.");
			cm.worldSpouseMessage(0x20, "『随身服务』 : 恭喜 " + cm.getChar().getName() + " 兑换了 快乐指环(全属性+50),羡慕就赶快开通吧。");
			cm.dispose();
				} else {
			cm.sendOk("#d兑换失败：#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 4000 个#k\r\n\t#r或者您的背包已满，请检查。#k\r\n\r\n- #e#d提示：#n#K#b每天都可以在随身服务处领取100个。#k");
			cm.dispose();
				}
			}
		}
	}
   }