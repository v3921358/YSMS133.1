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
	cm.sendSimpleS("#b>>> #e#d欢迎使用理财钱庄,#b温馨提示：#r1元=1万星币#b <<<#k\r\n#b您当前的星币数为： #r"+cm.getRMB()+" #b星币  #k\r\n\r\n#b#L1#      "+aaa+" 查看领取福利#l\r\n\r\n" ,2);        	
} else if (status == 1) {
	if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #d当前可领取下列福利：\r\n#b星币 #r x  90000 星币\r\n#b#z4001465# x 100 个      #d(老公老婆戒指晋级道具)#k\r\n#b#z4034304# x 30 个       #d(爱心强化所需要的道具)#k\r\n#b#z5062009# x 100 个  #d(装备SS级所需要的道具)\r\n#b#z5064000# x 10 个       #d(防止装备砸爆需要的道具)\r\n#b#z4033204# x 10 个     #d(进阶翅膀所需要的道具)\r\n#b#z4310036# x 100         #d(兑换装备所需要的道具)\r\n#b#z4310023# x 30       #d(时装升星所需要的道具)\r\n#b#z4310108# x 30      #d(兑换戒子所需要的道具)\r\n#b#z2340000# x 10          #d(防止失败减少升级次数)\r\n#b#z4033611# x 3       #d(四大天王所需古树钥匙)\r\n#b金币 x 30,000,000      #d(游戏金币实用于玩家交易)\r\n#b点卷 x 15,000          #d(用来购买道具点装)#k");

			}
		} else if (status == 2) {
			if(typed==1){
 if (cm.getSpace(4) < 8) {
cm.sendOk("#e#r你请把您的背包其他栏空出8个空位来"); 
cm.dispose();
} else if (cm.getSpace(5) < 3){
cm.sendOk("#e#r你请把您的背包特殊栏空出3个空位来");
cm.dispose();
} else if (cm.getSpace(2) < 3) { 
cm.sendOk("#e#r你请把您的背包消耗栏空出3个空位来");
cm.dispose();
}  else if (cm.getBossLog("返利") < 1) {
cm.gainItem(4001465, 100);//爱心宝石，老公老婆戒指使用
cm.gainItem(4034304, 30);//NENE爱心,爱心强化需要的道具
cm.gainItem(5062009, 100);//超级魔方
cm.gainItem(5064000, 10);//防爆卷轴
cm.gainItem(4033204, 10);//温暖的羽毛，翅膀进价使用
cm.gainItem(4310036, 100);//征服者必
cm.gainItem(4310023, 30);//幸运的铜币时装升星使用
//cm.gainItem(4033943, 30);//魔法球（暂时取消该物品赠送）
cm.gainItem(4310108, 30);//冒险岛纪念币，兑换快乐指挥需要的道具
cm.gainItem(2340000, 10);//祝福卷轴
cm.gainItem(4033611, 3);//古树钥匙
cm.gainMeso(30000000);//金币
cm.gainNX(1, 15000);//点卷
cm.gainRMB(90000);//星币
cm.setBossLog("返利");
cm.sendOk("成功领取了9万星币以及大量道具.");
cm.worldSpouseMessage(0x24, "『理财钱庄』 : 恭喜 " + cm.getChar().getName() + " 在理财钱庄中领取了9万星币以及大量道具.");
       } else {
        cm.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。");
		cm.dispose();
            }

			cm.dispose();


           }
      }
   }
 }