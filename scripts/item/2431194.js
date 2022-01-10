
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
		var selStr = "#r[提示]： #e#b请选择您需要的真·觉醒冒险之心：#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). 战士#z1122122##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). 法师#z1122123##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). 弓箭手#z1122124##l\r\n";
		selStr += "#r#L3#"+ttt6+" 4). 飞侠#z1122125##l\r\n";
		selStr += "#r#L4#"+ttt6+" 5). 海盗#z1122126##l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122122, 1);
		im.sendOk("获得了 #z1122122# x 1");
		//im.worldSpouseMessage(0x24,"『冒险心自选箱』：玩家 "+ im.getChar().getName() +" 获得了战士真·觉醒冒险之心。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122123, 1);
		im.sendOk("获得了 #z1122123# x 1");
		//im.worldSpouseMessage(0x24,"『冒险心自选箱』：玩家 "+ im.getChar().getName() +" 获得了法师真·觉醒冒险之心。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122124, 1);
		im.sendOk("获得了 #z1122124# x 1");
		//im.worldSpouseMessage(0x24,"『冒险心自选箱』：玩家 "+ im.getChar().getName() +" 获得了弓箭手真·觉醒冒险之心。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122125, 1);
		im.sendOk("获得了 #z1122125# x 1");
		//im.worldSpouseMessage(0x24,"『冒险心自选箱』：玩家 "+ im.getChar().getName() +" 获得了飞侠真·觉醒冒险之心。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 4:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122126, 1);
		im.sendOk("获得了 #z1122126# x 1");
		//im.worldSpouseMessage(0x24,"『冒险心自选箱』：玩家 "+ im.getChar().getName() +" 获得了海盗真·觉醒冒险之心。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;









}
    }
}
