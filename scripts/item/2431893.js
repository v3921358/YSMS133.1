
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var RMB = 0;
var PayLogPoints = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
            im.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            im.dispose();
        } 
    else if (status == 0) {
		var selStr = "#r[GM提示]： #e#b请选择您需要兑换的物品：#k#n\r\n\r\n";
		selStr += "#r#L0# #i5062009# #z5062009# #b需要#i2431893# #rx 30#l\r\n";
		//selStr += "#L1# #i2049323#  无损#z2049323##b需要#i2431893# #rx 200#l\r\n";
		//selStr += "#L4# #i2049700#  #z2049700##b需要#i2431893# #rx 200#l\r\n";
		//selStr += "#L2# #i2049704#  #z2049704##b需要#i2431893# #rx 1000#l\r\n";
		//selStr += "#L3# #i2049752#  #z2049752##b需要#i2431893# #rx 200#l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.haveItem(2431893, 30) && im.getSpace(5) >= 1) {
		im.gainItem(2431893, -30);
		im.gainItem(5062009, 1);
		//im.sendOk("获得了 #z5062009# x 1");
		im.worldSpouseMessage(0x23,"『红色魔方碎片』：玩家 "+ im.getChar().getName() +" 获得了超级神奇魔方。");	
		im.dispose();
	} else {
		im.sendOk("红色魔方碎片不足或者特殊栏不够.");
		im.dispose();
	}
		break;
	case 1:
	if (im.haveItem(2431893, 50) && im.getSpace(2) >= 1) {
		im.gainItem(2431893, -200);
		im.gainItem(2049323, 1);
		//im.sendOk("获得了 #z2049323# x 1");
		im.worldSpouseMessage(0x23,"『红色魔方碎片』：玩家 "+ im.getChar().getName() +" 获得了无损高级装备强化卷。");	
		im.dispose();
	} else {
		im.sendOk("红色魔方碎片不足或者消耗栏不够.");
		im.dispose();
	}
		break;
	case 2:
	if (im.haveItem(2431893, 120) && im.getSpace(2) >= 1) {
		im.gainItem(2431893, -1000);
		im.gainItem(2049704, 1);
		//im.sendOk("获得了 #z2049704# x 1");
		im.worldSpouseMessage(0x23,"『红色魔方碎片』：玩家 "+ im.getChar().getName() +" 获得了A级附加潜能卷 40%。");	
		im.dispose();
	} else {
		im.sendOk("红色魔方碎片不足或者消耗栏不够.");
		im.dispose();
	}
		break;
	case 3:
	if (im.haveItem(2431893, 200) && im.getSpace(2) >= 1) {
		im.gainItem(2431893, -200);
		im.gainItem(2049752, 1);
		//im.sendOk("获得了 #z2049752# x 1");
		im.worldSpouseMessage(0x23,"『红色魔方碎片』：玩家 "+ im.getChar().getName() +" 获得了S级潜能卷 30%。");	
		im.dispose();
	} else {
		im.sendOk("红色魔方碎片不足或者消耗栏不够.");
		im.dispose();
	}
		break;
	case 4:
	if (im.haveItem(2431893, 100) && im.getSpace(2) >= 1) {
		im.gainItem(2431893, -200);
		im.gainItem(2049700, 1);
		//im.sendOk("获得了 #z2049700# x 1");
		im.worldSpouseMessage(0x23,"『红色魔方碎片』：玩家 "+ im.getChar().getName() +" 获得了A级潜能卷。");	
		im.dispose();
	} else {
		im.sendOk("红色魔方碎片不足或者消耗栏不够.");
		im.dispose();
	}
		break;









}
    }
}
