var status = 0;
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
var z = "#fUI/UIWindow/Quest/icon5/1#";////美化
var PayLogPoints = 0;
var yz = new Array(3010947,3010948,3015006,3015010,3010837,3010837,3010838,3010854,3010815,3010804,3010696);
var chance = Math.floor(Math.random()*yz.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n";

	    	selStr += "#r欢迎使用钓鱼专用椅子租借服务：#k\r\n\r\n请选择：\r\n\r\n";
		selStr += "#b#L1# "+tz1+"租借2小时钓鱼椅子#l\r\n\r\n";
		selStr += "#b#L2# "+tz1+"租借24小时钓鱼椅子#l \r\n\r\n";
		selStr += "#b#L3# "+tz1+"租借72小时钓鱼椅子#l \r\n\r\n";



		//selStr += "\r\n ";

		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
		case 1:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("租借") < 1 && cm.getSpace(3) >= 1) { //租借
           if (cm.getPlayer().getCSPoints(1) > 1000) { //租借
				cm.gainNX(-10000);
				//cm.setBossLog("租借");
				cm.gainItem(3010184, 1, 2 * 60 * 60 * 1000);//2小时钓鱼一直
				cm.sendOk("租借了2小时的 #r#z3010184##k 椅子");
				//cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 租借了钓鱼专用椅子 ", 5120008);
				cm.worldSpouseMessage(0x20,"『租借钓鱼椅子』 ：玩家 "+ cm.getChar().getName() +" 租借了 钓鱼专用椅子2小时 。");
				cm.dispose();
            } else {
                                cm.sendOk("租借失败，请检查您是否满足租借条件：\r\n\r\n#r1). 您点卷不足20000点\r\n\r\n2). 背包位置不够\r\n\r\n");
				cm.dispose();
            }
            break;

		case 2:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("租借") < 1 && cm.getSpace(3) >= 1) { //租借
           if (cm.getPlayer().getCSPoints(1) > 20000) { //租借
	//} else	if (cm.haveItem(1010184)) {
               // cm.sendOk("您已经拥有#i3010184# #b无需重复购买。");
				cm.gainNX(-20000);
				//cm.setBossLog("租借");
				cm.gainItem(3010184, 1, 24 * 60 * 60 * 1000);//2小时钓鱼一直
				cm.sendOk("租借了24小时的 #r#z3010184##k 椅子");
				//cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 租借了钓鱼专用椅子 ", 5120008);
				cm.worldSpouseMessage(0x20,"『租借钓鱼椅子』 ：玩家 "+ cm.getChar().getName() +" 租借了 钓鱼专用椅子24小时 。");
				cm.dispose();
            } else {
                		//cm.sendOk("租借失败，请检查您是否满足租借条件：\r\n\r\n#r1). 您点卷不足20000点\r\n\r\n2). 背包位置不够\r\n\r\n3).您已经拥有#i3010184# 无需重复购买");
		                cm.sendOk("租借失败，请检查您是否满足租借条件：\r\n\r\n#r1). 您点卷不足20000点\r\n\r\n2). 背包位置不够\r\n\r\n");
		cm.dispose();
            }
            break;

		case 3:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("租借") < 1 && cm.getSpace(3) >= 1) { //租借
           if (cm.getPlayer().getCSPoints(1) > 50000) { //租借
				cm.gainNX(-50000);
				//cm.setBossLog("租借");
				cm.gainItem(3010184, 1, 72 * 60 * 60 * 1000);//3天钓鱼椅子
				cm.sendOk("租借了72小时的 #r#z3010184##k 椅子");
				//cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 租借了钓鱼专用椅子 ", 5120008);
				cm.worldSpouseMessage(0x20,"『租借钓鱼椅子』 ：玩家 "+ cm.getChar().getName() +" 租借了 钓鱼专用椅子72小时 。");
				cm.dispose();
            } else {
                                cm.sendOk("租借失败，请检查您是否满足租借条件：\r\n\r\n#r1). 您点卷不足20000点\r\n\r\n2). 背包位置不够\r\n\r\n");
				cm.dispose();
            }
            break;
 
        }
    }
}
