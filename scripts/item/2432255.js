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
		im.dispose();
	} else {
		if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {//" + im.itemQuantity(4021012) + "
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
			selStr +="\r\n ";
			im.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				im.sendYesNo("- #e#d#z1402251#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 205\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 2) {
				typed=2;
				im.sendYesNo("- #e#d#z1432214#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 205\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 3) {
				typed=3;
				im.sendYesNo("- #e#d#z1322250#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 197\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 4) {
				typed=4;
				im.sendYesNo("- #e#d#z1232109#：#n#k\r\n\r\n\t\t#b武器自身力量属性60\r\n\t\t\自身HP  + 2240\r\n\t\t物理攻击力  + 205\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 5) {
				typed=5;
				im.sendYesNo("- #e#d#z1242116#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 154\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 6) {
				typed=6;
				im.sendYesNo("- #e#d#z1362135#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 197\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 7) {
				typed=7;
				im.sendYesNo("- #e#d#z1522138#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 192\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 8) {
				typed=8;
				im.sendYesNo("- #e#d#z1332274#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 192\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 9) {
				typed=9;
				im.sendYesNo("- #e#d#z1472261#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 103\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 10) {
				typed=10;
				im.sendYesNo("- #e#d#z1342101#：#n#k\r\n\r\n\t\t#b武器自身运气属性40\r\n\t\t物理攻击力  + 97\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加   0\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 11) {
				typed=11;
				im.sendYesNo("- #e#d#z1452252#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 192\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 12) {
				typed=12;
				im.sendYesNo("- #e#d#z1462239#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 197\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 13) {
				typed=13;
				im.sendYesNo("- #e#d#z1382259#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t魔法攻击力  + 245\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 14) {
				typed=14;
				im.sendYesNo("- #e#d#z1212115#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t魔法攻击力  + 241\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 15) {
				typed=15;
				im.sendYesNo("- #e#d#z1492231#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 150\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 16) {
				typed=16;
				im.sendYesNo("- #e#d#z1482216#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 154\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 17) {
				typed=16;
				im.sendYesNo("- #e#d#z1532144#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 215\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 18) {
				typed=16;
				im.sendYesNo("- #e#d#z1552110#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t魔法攻击力  + 246\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 19) {
				typed=16;
				im.sendYesNo("- #e#d#z1542108#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t物理攻击力  + 202\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			} else if (selection == 20) {
				typed=16;
				im.sendYesNo("- #e#d#z1252093#：#n#k\r\n\r\n\t\t#b武器自身两项属性60\r\n\t\t魔法攻击力  + 246\r\n\t\tBOSS伤害  + 40%\r\n\t\t怪物伤害  + 20%\r\n\t\t总攻击    + 10%\r\n\t\t武器破功追加  20,000,000\r\n\t\t可升级次数  8 次\r\n\r\n- #e#r管理提示：#n\r\n\r\n  #b该道具为一次性，领取后该道具消失，请慎重选择。");
			}
		} else if (status == 2) {
			if(typed==1){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1402251)).copy(); // 生成一个Equip类  埃苏莱布斯宽大刀           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1402251##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==2){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1432214)).copy(); // 战士枪             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1432214##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				} 
			} else if(typed==3){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1322250)).copy(); // 恶魔钝器             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1322250##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==4){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1232109)).copy(); // 恶魔复仇             
				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(205); //物理攻击
				toDrop.setHp(2240); //HP
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1232109##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==5){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // 尖兵             
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(154); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1242116##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==6){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1362135)).copy(); // 幻影            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1362135##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==7){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1522138)).copy(); // 双弩            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1522138##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==8){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1332274)).copy(); // 飞侠短刀            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1332274##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==9){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1472261)).copy(); // 飞侠短刀            
//				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(103); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1472261##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==10){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1342101)).copy(); // 飞侠副刀            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
				toDrop.setLuk(40); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(97); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
//				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1342101##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==11){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1452252)).copy(); // 弓            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(192); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1452252##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==12){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1462239)).copy(); // 弩            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(200); //魔法攻击
				toDrop.setWatk(197); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1462239##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==13){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1382259)).copy(); // 长杖            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(245); //魔法攻击
				toDrop.setWatk(151); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1382259##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==14){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1212115)).copy(); // 夜光双头杖            
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(143); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1212115##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==15){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1492231)).copy(); // 海盗埃苏莱布斯枪          
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(150); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1492231##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==16){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1482216)).copy(); // 海盗埃苏莱布斯拳甲            
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(241); //魔法攻击
				toDrop.setWatk(154); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1482216##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==17){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1532144)).copy(); // 埃苏莱布斯大炮           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(0); //魔法攻击
				toDrop.setWatk(215); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1532144##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==18){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1552110)).copy(); // 埃苏莱布斯扇子           
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(246); //魔法攻击
				toDrop.setWatk(145); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1552110##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==19){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1542108)).copy(); // 埃苏莱布斯武士刀           
				toDrop.setStr(60); //装备力量
				toDrop.setDex(60); //装备敏捷
//				toDrop.setInt(60); //装备智力
//				toDrop.setLuk(60); //装备运气
//				toDrop.setMatk(0); //魔法攻击
				toDrop.setWatk(202); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1542108##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			} else if(typed==20){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1252093)).copy(); // 埃苏莱布斯魔法棒           
//				toDrop.setStr(60); //装备力量
//				toDrop.setDex(60); //装备敏捷
				toDrop.setInt(60); //装备智力
				toDrop.setLuk(60); //装备运气
				toDrop.setMatk(246); //魔法攻击
				toDrop.setWatk(148); //物理攻击 
				toDrop.setBossDamage(40);//BOOS伤
				toDrop.setIgnorePDR(20);//无视防御
				toDrop.setTotalDamage(10);//总伤害
				//toDrop.setAllStat(20);//全属性
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("限量版真·漩涡系列");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b恭喜您获得 #r#z1252093##b 一把.");
				//im.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + im.getChar().getName() + " 在市场<普通服务员>处制作了法弗纳忏悔之剑.");
				im.dispose();
				} else {
				im.sendOk("失败");
				im.dispose();
				}
			}
      }
   }
 }