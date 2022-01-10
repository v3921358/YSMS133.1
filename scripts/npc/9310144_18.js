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
			var selStr = "#d#e只要连续登陆7天，每天即可获得下列物品：#n#k\r\n";
			selStr +="        - #e#d还需要登陆 " + (7+cm.getBossLogAcc("登陆")) + " 天可领全部奖励#n\r\n"
			selStr +="#L1##b"+aaa+" 第一天登陆奖励 #v1112793# #rx 1#b [详情点击查看]#l#k\r\n"; 
			selStr +="#L2##b"+aaa+" 第二天登陆奖励 #v1112159# #rx 2#b [详情点击查看]#l#k\r\n";
			selStr +="#L3##b"+aaa+" 第三天登陆奖励 #v1112271# #rx 20#b[详情点击查看]#l#k\r\n";
			selStr +="#L4##b"+aaa+" 第四天登陆奖励 #v5062010# #rx 20#b [详情点击查看]#l#k\r\n";
			selStr +="#L5##b"+aaa+" 第五天登陆奖励 #v1003785# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr +="#L6##b"+aaa+" 第六天登陆奖励 #v1182061# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr +="#L7##b"+aaa+" 第七天登陆奖励 #v1122246# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d第一天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v1112793##r#t1112793# x 1 #b个。\r\n\r\n此戒指天然全属性+5,包含攻击力和魔法攻击力。不仅如此还可以领取#r冒险币 500 W #b点。");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#d第二天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v1112159##r#t1112159# x 1 #b个。\r\n不仅如此还可以领取抵用卷 #r3000#k#b 点。");
			} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d第三天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n  #v1112271##r#t1112271# x 1 #b个。\r\n\r\n不仅如此还可以领取抵用卷 #r5000#k#b 点。");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d第四天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v5062010##r#t5062010# x 20 #b个。\r\n #v5062002# #r#t5062002# x 20 #b个。\r\n #v5064000#  #r#t5064000# x 20 #b个。");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d第五天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v1003785##r#z1003785# x 1 #b个。\r\n\r\n#e#d装备介绍：#n\r\n\r\n- #e#r力量#n:15    - #e敏捷#n:15    - #e智力#n:15    - #e运气#n:15\r\n- #e物理攻击#n:15             - #e魔法攻击#n:15\r\n\r\n ");
			/*} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d第五天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v1142683##r#t1142683# x 1 #b个。\r\n\r\n#e#d装备介绍：#n\r\n\r\n- #e#r攻击#n:5     - #e魔攻#n:5     - #e命中#n:7\r\n\r\n ");*/
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #e#d第六天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v2340000##r#t2340000# x 20 #b个。\r\n #v4001839##r#t4001839# x 1000 #b个。\r\n #v1182061##r#t1182061# x 1 #b个。\r\n\r\n#e#d特殊装介绍：#n\r\n\r\n- #e#r力量#n:20    - #e敏捷#n:20    - #e智力#n:20\r\n- #e运气#n:20    - #e攻击#n:10    - #e魔攻#n:10");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- #e#d第七天登陆时间奖励#k#n\r\n\r\n\r\n   #b请领取600分钟奖励后再领取，领取后您将得到:\r\n #v1122246##r#t1122246# x 1 #b个。\r\n\r\n#e#d特殊装介绍：#n\r\n\r\n- #e#r力量#n:30    - #e敏捷#n:30    - #e智力#n:30\r\n- #e运气#n:30    - #e攻击#n:30    - #e魔攻#n:30\r\n\r\n#b成功领取完7天奖励后您将无法再次领取新人登陆奖励，并且获得Gm赠送的 1 万点卷奖励。");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getBossLogAcc("登陆") == -1 && cm.getBossLogAcc("第一天") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1112793, 1);
			cm.gainMeso(100000000);
			cm.setBossLogAcc("第一天", -2);
			cm.sendOk("恭喜您成功领取登陆第一天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第一天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.getBossLogAcc("登陆") == -2 && cm.getBossLogAcc("第二天") == 0 && cm.getSpace(2) >= 1) {
			cm.gainNX(2, 5000);
			cm.gainItem(1112159, 1);
			//cm.gainItem(1112271, 1);
			cm.setBossLogAcc("第二天", -2);
			cm.sendOk("恭喜您成功领取登陆第二天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.getBossLogAcc("登陆") == -3 && cm.getBossLogAcc("第三天") == 0 && cm.getSpace(2) >= 1) {
			cm.gainNX(2, 10000);
			//cm.gainItem(1112159, 1);
			cm.gainItem(1112271, 1);
			cm.setBossLogAcc("第三天", -2);
			cm.sendOk("恭喜您成功领取登陆第三天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第三天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.getBossLogAcc("登陆") == -4 && cm.getBossLogAcc("第四天") == 0 && cm.getSpace(5) >= 1) {
			cm.gainItem(5062010, 20);
			cm.gainItem(5062002, 20);
			cm.gainItem(5064000, 20);
			cm.setBossLogAcc("第四天", -2);
			cm.sendOk("恭喜您成功领取登陆第四天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第四天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.getBossLogAcc("登陆") == -5 && cm.getBossLogAcc("第五天") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1003717, 1);
			cm.setBossLogAcc("第五天", -2);
			cm.sendOk("恭喜您成功领取登陆第五天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第五天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
			/*}else if(typed==5){
                if (cm.getBossLogAcc("登陆") == -5 && cm.getBossLogAcc("第五天") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1142683, 1);
			cm.setBossLogAcc("第五天", -2);
			cm.sendOk("恭喜您成功领取登陆第五天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第五天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}*/
			}else if(typed==6){
                if (cm.getBossLogAcc("登陆") == -6 && cm.getBossLogAcc("第六天") == 0 && cm.getSpace(2) >= 3 && cm.getSpace(4) >= 5) {
			cm.gainItem(4001839, 1000);
			cm.gainItem(2340000, 20);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182061)).copy(); // 生成一个Equip类                    
			toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气
			toDrop.setMatk(10); //物理攻击
			toDrop.setWatk(10); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.setBossLogAcc("第六天", -2);
			cm.sendOk("恭喜您成功领取登陆第六天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第六天登陆奖励。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
			}else if(typed==7){
                if (cm.getBossLogAcc("登陆") == -7 && cm.getBossLogAcc("第七天") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(4001833, 1);
			cm.gainNX(1, 10000);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1122246)).copy(); // 生成一个Equip类                    
			toDrop.setStr(30); //装备力量
			toDrop.setDex(30); //装备敏捷
			toDrop.setInt(30); //装备智力
			toDrop.setLuk(30); //装备运气
			toDrop.setMatk(30); //物理攻击
			toDrop.setWatk(30); //魔法攻击 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.setBossLogAcc("第七天", -2);
			cm.sendOk("恭喜您成功领取登陆第七天奖励。");
			cm.worldSpouseMessage(0x20, "『连续7天登陆奖励』 : 恭喜 " + cm.getChar().getName() + " 成功领取第七天登陆奖励获得神器一件。");
			cm.dispose();
				} else {
			cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足600分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.");
			cm.dispose();
				}
           }
		}
	  }
	}