var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////红沙漏
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun4 = "#fUI/UIWindow/Quest/reward#";////奖励
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹带
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////红色圆
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
			var selStr = "#d欢迎选购物品，请选择您想要的：#k\r\n\r\n";
			selStr +="\t#b您当前可用余额为：  #r" + cm.getRMB() + " #b 元#k\r\n\r\n";
			selStr +="#L1##r"+tz1+"  ☆☆☆☆☆法弗纳系列武器#l#k\r\n";
 
			//selStr +="#L10##b"+tz1+"  购买150级鲁塔比斯/暴君防具#l#k\r\n"; 
			//selStr +="#L2#"+tz1+" #r 8#k #b现金点购买 #r#z4001006#礼包#k#l#k\r\n";
			//selStr +="#L3#"+tz1+" #r 10#k #b现金点购买 #r#z4034151#强化礼包#k#l#k\r\n";
			//selStr +="#L4#"+tz1+" #r 10#k #b现金点购买 #r#z5062010#礼包(小)#k#l#k\r\n";
			//selStr +="#L5#"+tz1+" #r 50#k #b现金点购买 #r#z5062010#礼包(中)#k#l#k\r\n";
			//selStr +="#L6#"+tz1+" #r90#k #b现金点购买 #r#z5062010#礼包(大)#k#l#k\r\n";
			//selStr +="#L7#"+tz1+" #r80#k #b现金点购买 #r无损#z2049323#礼包#k#l#k\r\n";
			//selStr +="#L11#"+tz1+" #r100#k #b现金点购买 #r#z5750000#礼包#k#l#k\r\n";
			//selStr +="#L12#"+tz1+" #r380#k #b现金点购买 #r#z3994417#礼包#k#l#k\r\n";
			//selStr +="#L9#"+tz1+" #r  5#k #b元购买 #r#z2049168##k#l#k\r\n";
			//selStr +="#L8#"+tz1+" #r 20#k #b元购买 #r#z2049122##k#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("☆☆☆☆☆法弗纳系列武器比普通法弗纳武器属性要给力的多，但是价格很贵哟。您是否要查看购买?");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("确定购买 #r火焰羽毛礼包#k 吗? 将会使用掉您 #r8#k 现金点,使用后将获得火焰羽毛 x #r20#k 个，进阶翅膀所需要用到的材料");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("确定购买 #r粉笔强化礼包#k 吗? 将会使用掉您 #r10#k 现金点,使用后将获得粉笔x #r100#k 个，粉笔强化装备所需要用到的材料");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("确定购买 #r#z5062010#礼包(小)#k 吗? 将会使用掉您 #r10#k 现金点。使用后将获得#t5062010# x #r20#k 个.");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("确定购买 #r#z5062010#礼包(中)#k 吗? 将会使用掉您 #r50#k 现金点。使用后将获得#t5062010# x #r150#k 个.");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("确定购买 #r#z5062010#礼包(大)#k 吗? 将会使用掉您 #r100#k 现金点。使用后将获得#t5062010# x #r300#k 个.");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("确定购买 #r#z2049323#礼包#k 吗? 将会使用掉您 #r80#k 现金点。使用后将获得#t2049323# x #r100#k 个.");
			} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("确定购买 #r#z2049122##k 吗? 将会使用掉您 #r20#k 元。使用后将获得#t2049122# x #r1#k 个.");
			} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("确定购买 #r#z2049168##k 吗? 将会使用掉您 #r5#k 元。使用后将获得#t2049168# x #r1#k 个.");
			} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("购买150级暴君，鲁塔比斯防具。您是否要查看购买?");
			} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("确定购买 #r#z5750000#礼包#k 吗? 将会使用掉您 #r100#k 现金点。使用后将获得#t5750000# x #r100#k 个.");
			} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("确定购买 #r#z3994417#礼包#k 吗? 将会使用掉您 #r380#k 现金点。使用后将获得#v3994417# #v3994418# #v3994419# #v3994420# #v3994421# #v3994422#  x 各#r1#k 个.");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getSpace(1) >= 1) {
			cm.dispose();
			cm.openNpc(9310382, 301);
				} else {
			cm.sendOk("背包栏位不够,请清理.");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.getRMB() >= 8 && cm.getSpace(4) >= 1) {
			cm.gainRMB(-8);
			cm.gainItem(4001006, 20);
			cm.sendOk("恭喜您成功购买火焰羽毛礼包.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买火焰羽毛礼包.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.getRMB() >= 10 && cm.getSpace(4) >= 1) {
			cm.gainRMB(-10);
			cm.gainItem(4034151, 100);
			cm.sendOk("恭喜您成功购买粉笔强化礼包.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买粉笔强化礼包.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.getRMB() >= 10 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-10);
			cm.gainItem(5062010, 10);
			cm.sendOk("恭喜您成功购买#z5062010#礼包(小).");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买终极神奇魔方礼包(小).");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.getRMB() >= 50 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-50);
			cm.gainItem(5062010, 60);
			cm.sendOk("恭喜您成功购买#z5062010#礼包(中).");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买终极神奇魔方礼包(中).");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==6){
                if (cm.getRMB() >= 100 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-100);
			cm.gainItem(5062010, 120);
			cm.sendOk("恭喜您成功购买#z5062010#礼包(大).");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买终极神奇魔方礼包(大).");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==7){
                if (cm.getRMB() >= 80 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-80);
			cm.gainItem(2049323, 100);
			cm.sendOk("恭喜您成功购买#z2049323#.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买无损高级装备强化卷.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==8){
                if (cm.getRMB() >= 20 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-20);
			cm.gainItem(2049122, 1);
			cm.sendOk("恭喜您成功购买#z2049122#.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买 正向混沌卷轴.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==8){
                if (cm.getRMB() >= 5 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-5);
			cm.gainItem(2049168, 1);
			cm.sendOk("恭喜您成功购买#z2049168#.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买 惊人正义混沌卷轴 20%.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==10){
                if (cm.getSpace(1) >= 1) {
			cm.dispose();
			cm.openNpc(9310376, 20);
				} else {
			cm.sendOk("背包栏位不够,请清理.");
			cm.dispose();
				}
			}else if(typed==11){
                if (cm.getRMB() >= 100 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-100);
			cm.gainItem(5750000, 100);
			cm.sendOk("恭喜您成功购买#z5750000#.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买星岩魔方礼包.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
			}else if(typed==12){
                if (cm.getRMB() >= 380 && cm.getSpace(4) >= 6) {
			cm.gainRMB(-380);
			cm.gainItem(3994417, 1);
			cm.gainItem(3994418, 1);
			cm.gainItem(3994419, 1);
			cm.gainItem(3994420, 1);
			cm.gainItem(3994421, 1);
			cm.gainItem(3994422, 1);
			cm.sendOk("恭喜您成功购买#z3994417#.");
			cm.worldSpouseMessage(0x20, "『消费商城』 : 恭喜 " + cm.getChar().getName() + " 在消费商城购买蜡笔礼包.");
			cm.dispose();
				} else {
			cm.sendOk("购买失败：\r\n\r\n#r1). 当前余额不足.\r\n2). 背包栏位已满,请清理.");
			cm.dispose();
				}
           }
		}
	  }
	}