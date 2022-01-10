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
			var selStr = "#d#e全场五折,欢迎使用点卷购买物品，请选择您想要的：#n#k\r\n";
			selStr +="\t#b您当前点卷为：  #r" +cm.getPlayer().getCSPoints(1) + " #b 点#n#k\r\n\r\n";
			selStr +="- #e#d道具#n\r\n"
			selStr +="#L1##b"+aaa+" #r500#k #b点卷购买 #r#t5062002##k 原价1000点卷一个#l#k\r\n";
			selStr +="#L2##b"+aaa+" #r1000#k #b点卷购买 #r#t5062500##k 原价2000点卷一个#l#k\r\n"; 
			selStr +="#L3##b"+aaa+" #r5000#k #b点卷购买 #r无损#t2049323##k 原价1万点卷#l#k\r\n";
			selStr +="#L4##b"+aaa+" #r25000#k #b点卷购买 #r#t2049124##k 原价50000点卷一张#l#k\r\n";
			selStr +="#L5##b"+aaa+" #r30000#k #b点卷购买 #r#t2047978##k #l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("确定购买一个 #r#t5062002##k 吗? 将会使用掉您 #r500#k 点卷。");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("确定购买一个 #r#t5062500##k 吗? 将会使用掉您 #r1000#k 点卷。");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("确定购买一个 #r无损#t2049323##k 吗? 将会使用掉您 #r5000#k 点卷。");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("确定购买一个 #r#t2049124##k 吗? 将会使用掉您 #r25000#k 点卷。");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("确定购买一个 #r#t2047978##k 吗? 将会使用掉您 #r30000#k 点卷。");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getPlayer().getCSPoints(1) >= 500 && cm.getSpace(5) >= 1 && cm.getBossLog("银票神奇") <= 10 && cm.getPlayer().getRMB() >= 260) {
			cm.gainNX(-500);
			cm.gainItem(5062002, 1);
			cm.sendOk("恭喜您成功购买#t5062002#.");
			cm.worldSpouseMessage(0x20, "『理财商城』 : 恭喜 " + cm.getChar().getName() + " 在理财商城购买一个高级神奇魔方.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包特殊栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==2){
                if (cm.getPlayer().getCSPoints(1) >= 1000 && cm.getSpace(5) >= 1) {
			cm.gainNX(-1000);
			cm.gainItem(5062500, 1);
			cm.sendOk("恭喜您成功购买#t5062500#.");
			cm.worldSpouseMessage(0x20, "『理财商城』 : 恭喜 " + cm.getChar().getName() + " 在理财商城购买一个大师附加神奇魔方.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包特殊栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==3){
                if (cm.getPlayer().getCSPoints(1) >= 5000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-5000);
			cm.gainItem(2049323, 1);
			cm.sendOk("恭喜您成功购买#t2049323#.");
			cm.worldSpouseMessage(0x20, "『理财商城』 : 恭喜 " + cm.getChar().getName() + " 在理财商城购买一个无损高级装备强化卷.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包消耗栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==4){
                if (cm.getPlayer().getCSPoints(1) >= 25000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-25000);
			cm.gainItem(2049124, 1);
			cm.sendOk("恭喜您成功购买#t2049124#.");
			cm.worldSpouseMessage(0x20, "『理财商城』 : 恭喜 " + cm.getChar().getName() + " 在理财商城购买一个正向混沌卷轴.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包消耗栏位已满,请清理.");
			cm.dispose();
				}
			}else  if(typed==5){
                if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-30000);
			cm.gainItem(2047978, 1);
			cm.sendOk("恭喜您成功购买#t2047978#.");
			cm.worldSpouseMessage(0x20, "『理财商城』 : 恭喜 " + cm.getChar().getName() + " 在理财商城购买一个防具攻击力卷轴70%.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前点卷未达到条件.\r\n2). 背包消耗栏位已满,请清理.");
			cm.dispose();
				}
           }
		}
	  }
	}