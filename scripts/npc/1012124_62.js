var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

/*var status = 0;
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
		if (status == 0) {//" + cm.itemQuantity(4021012) + "
			var selStr = "#d请选择想要的160武器装备：#n#k\r\n";
			selStr +="#b(PS；请选择自身武器,只可使用一次,选后该道具会消失。)\r\n";
			selStr +="#L1##r"+aaa+" 战士双手剑#l         #L2#"+aaa+" 战士枪#l\r\n";
			selStr +="#L3#"+aaa+" 恶魔单手钝器#l       #L4#"+aaa+" 恶魔亡命剑#l\r\n";
			selStr +="#L5#"+aaa+" 尖兵能量剑#l         #L6#"+aaa+" 幻影手杖#l\r\n";
			selStr +="#L7#"+aaa+" 双弩精灵枪#l         #L8#"+aaa+" 飞侠短刀#l\r\n";
			selStr +="#L9#"+aaa+" 飞侠拳套#l           #L10#"+aaa+" 双刀副刀#l\r\n";
			selStr +="#L11#"+aaa+" 弓箭手弓#l           #L12#"+aaa+" 弩弓手弩#l\r\n";
			selStr +="#L13#"+aaa+" 法师长杖#l           #L14#"+aaa+" 夜光双头杖#l\r\n";
			selStr +="#L15#"+aaa+" 海盗短枪#l           #L16#"+aaa+" 海盗指节#l\r\n";
			selStr +="#L17#"+aaa+" 海盗火炮#l           #L18#"+aaa+" 阴阳师扇子#l\r\n";
			selStr +="#L19#"+aaa+" 剑豪武士刀#l         #L20#"+aaa+" 林之灵魔法棒#l";
			selStr +="\r\n ";*/
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
			selStr +="#L1#"+aaa+" #r6990000#k #b购买 #r战士双手剑160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L2#"+aaa+" #r6990000#k #b购买 #r战士枪160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L3#"+aaa+" #r6990000#k #b购买 #r恶魔猎手160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L4#"+aaa+" #r6990000#k #b购买 #r恶魔复仇者160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L5#"+aaa+" #r6990000#k #b购买 #r尖兵160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L6#"+aaa+" #r6990000#k #b购买 #r幻影160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L7#"+aaa+" #r6990000#k #b购买 #r双弩精灵160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L8#"+aaa+" #r6990000#k #b购买 #r侠盗160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L9#"+aaa+" #r6990000#k #b购买 #r隐士160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L10#"+aaa+" #r6990000#k #b购买 #r双刀副刀160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L11#"+aaa+" #r6990000#k #b购买 #r弓箭手160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L12#"+aaa+" #r6990000#k #b购买 #r弩弓手160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L13#"+aaa+" #r6990000#k #b购买 #r法师160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L14#"+aaa+" #r6990000#k #b购买 #r夜光法师160级布莱斯武器#k #b一个#l#k\r\n"; 
			selStr +="#L15#"+aaa+" #r6990000#k #b购买 #r船长160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L16#"+aaa+" #r6990000#k #b购买 #r冲锋队长160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L17#"+aaa+" #r6990000#k #b购买 #r火炮手160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L18#"+aaa+" #r6990000#k #b购买 #r阴阳师160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L19#"+aaa+" #r6990000#k #b购买 #r剑豪160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L20#"+aaa+" #r6990000#k #b购买 #r林之灵160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +="#L21#"+aaa+" #r6990000#k #b购买 #r爆力萌天使160级布莱斯武器#k #b一个#l#k\r\n";


			//selStr +="#L12#"+aaa+" #r6990000#k #b购买 #r英雄160级布莱斯武器#k #b一个#l#k\r\n";
			//selStr +="#L13#"+aaa+" #r6990000#k #b购买 #r黑骑士160级布莱斯武器#k #b一个#l#k\r\n";
			//selStr +="#L4#"+aaa+" #r6990000#k #b购买 #r恶魔复仇者160级布莱斯武器#k #b一个#l#k\r\n";
			//selStr +="#L6#"+aaa+" #r6990000#k #b购买 #r圣骑士160级布莱斯武器#k #b一个#l#k\r\n"; 
			//selStr +="#L7#"+aaa+" #r6990000#k #b购买 #r恶魔猎手160级布莱斯武器#k #b一个#l#k\r\n";
			selStr +=" \r\n\r\n";

			cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1402251##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 205\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1432214##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 205\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1322250##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 197\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1232109##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身力量属性60\r\n\自身HP  + 2240\r\n物理攻击力  + 205\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1242116##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 154\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1362135##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 197\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1522138##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 192\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1332274##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 192\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1472261##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 103\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1342101##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身运气属性40\r\n物理攻击力  + 97\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1452252##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 192\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1462239##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 197\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 13) {
				typed=13;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1382259##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n魔法攻击力  + 245\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 14) {
				typed=14;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1212115##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n魔法攻击力  + 241\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 15) {
				typed=15;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1492231##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 150\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 16) {
				typed=16;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1482216##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 154\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 17) {
				typed=17;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1532144##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 215\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 18) {
				typed=18;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1552110##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n魔法攻击力  + 246\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 19) {
				typed=19;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1542108##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 202\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 20) {
				typed=20;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1252093##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n魔法攻击力  + 246\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			} else if (selection == 21) {
				typed=21;
				cm.sendYesNo("- 确定购买一个屌丝★系列 #e#d#z1222109##k 吗? 将会使用掉您 #r6990000#k 星币\r\n\r\n#b武器自身两项属性60\r\n物理攻击力  + 160\r\nBOSS伤害  + 100%\r\n无视防御  + 70%\r\n总攻击    + 20%\r\n武器破功  39,999,999\r\n可升级次数  8 次\r\n第一条：BOSS伤害40%\r\n第二条：BOSS伤害40%\r\n第三条：BOSS伤害40%\r\n第四条：BOSS伤害40%\r\n第五条：BOSS伤害40%\r\n第六条：BOSS伤害40%\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具购买后不可退换，请慎重选择。");
			}
		} else if (status == 2) {
			if(typed==1){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-6990000);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1402251)).copy(); // 生成一个Equip类  埃苏莱布斯宽大刀           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(699000001);
//				toDrop.setPotential2(699000002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);


//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1402251##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器一把，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==2){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1432214)).copy(); // 战士枪             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1432214##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				} 
			} else if(typed==3){
                	//if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1322250)).copy(); // 恶魔钝器             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1322250##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==4){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1232109)).copy(); // 恶魔复仇             
				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击
				toDrop.setHp(2240); //HP
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1232109##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==5){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // 尖兵             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(154); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1242116##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==6){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1362135)).copy(); // 幻影            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1362135##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==7){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1522138)).copy(); // 双弩            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1522138##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==8){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1332274)).copy(); // 飞侠短刀            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1332274##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==9){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1472261)).copy(); // 飞侠短刀            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(103); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1472261##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==10){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1342101)).copy(); // 飞侠副刀            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(40); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(97); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1342101##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==11){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1452252)).copy(); // 弓            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1452252##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==12){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
			//	cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1462239)).copy(); // 弩            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1462239##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==13){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1382259)).copy(); // 长杖            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(245); //魔法攻击
				toDrop.setWatk(151); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1382259##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==14){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1212115)).copy(); // 夜光双头杖            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(143); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1212115##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==15){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1492231)).copy(); // 海盗埃苏莱布斯枪          
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(150); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1492231##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==16){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1482216)).copy(); // 海盗埃苏莱布斯拳甲            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(154); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1482216##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==17){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1532144)).copy(); // 埃苏莱布斯大炮           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(0); //魔法攻击
				toDrop.setWatk(215); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1532144##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==18){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1552110)).copy(); // 埃苏莱布斯扇子           
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(246); //魔法攻击
				toDrop.setWatk(145); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1552110##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);
				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==19){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1542108)).copy(); // 埃苏莱布斯武士刀           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(0); //魔法攻击
				toDrop.setWatk(202); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1542108##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			} else if(typed==20){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1252093)).copy(); // 埃苏莱布斯魔法棒           
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(246); //魔法攻击
				toDrop.setWatk(148); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1252093##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}

			} else if(typed==21){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1222109)).copy(); // 埃苏莱布斯灵魂手铳           
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(246); //魔法攻击
				toDrop.setWatk(160); //物理攻击 
				toDrop.setBossDamage(100);//BOOS伤
				toDrop.setIgnorePDR(70);//无视防御
				toDrop.setTotalDamage(20);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("屌丝★系列");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b恭喜您获得屌丝★系列 #r#z1222109##b 一把.");
				//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜贵族 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				cm.worldMessageEffect("[屌丝商城] 恭喜贵族" + cm.getName() + "在会员屌丝商城购买屌丝★系列武器，大家快来抱大腿吧", 7, 60);

				cm.worldSpouseMessage(0x20, "『屌丝商城』 : 恭喜贵族 " + cm.getChar().getName() + " 在屌丝商城购买 屌丝★系列 布莱斯 武器一把.");
				cm.dispose();
				} else {
			cm.sendOk("购买失败：#b    您今日充值金额为：#r" + cm.getSevenDayPayLog(1) + " #b元\r\n\r\n#r)1.您今日赞助金额没有达到800元，请今日赞助800元了再来购买\r\n\r\n#b2). 当前星币未达到条件。请确认您有足够的星币支付\r\n\r\n3). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}
      }
   }
 }