
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
		var selStr = "#r[提示]： #e#b请选择您需要的150级高贵防具套装：#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). 领取#z1003797##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). 领取#z1003798##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). 领取#z1003799##l\r\n";
		selStr += "#r#L3#"+ttt6+" 4). 领取#z1003800##l\r\n";
		selStr += "#r#L4#"+ttt6+" 5). 领取#z1003801##l\r\n";
		selStr += "#r#L5#"+ttt6+" 6). 领取#z1042254##l\r\n";
		selStr += "#r#L6#"+ttt6+" 7). 领取#z1042255##l\r\n";
		selStr += "#r#L7#"+ttt6+" 8). 领取#z1042256##l\r\n";
		selStr += "#r#L8#"+ttt6+" 9). 领取#z1042257##l\r\n";
		selStr += "#r#L9#"+ttt6+" 10). 领取#z1042258##l\r\n";
		selStr += "#r#L10#"+ttt6+" 11). 领取#z1062165##l\r\n";
		selStr += "#r#L11#"+ttt6+" 12). 领取#z1062166##l\r\n";
		selStr += "#r#L12#"+ttt6+" 13). 领取#z1062167##l\r\n";
		selStr += "#r#L13#"+ttt6+" 14). 领取#z1062168##l\r\n";
		selStr += "#r#L14#"+ttt6+" 15). 领取#z1062169##l\r\n";

		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003797, 1);
		//im.gainItem(1042254, 1);
		//im.gainItem(1062165, 1);
		im.sendOk("获得了 #z1003797# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了战士高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003798, 1);
		//im.gainItem(1042255, 1);
		//im.gainItem(1062166, 1);
		im.sendOk("获得了 #z1003798# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了法师高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003799, 1);
		//im.gainItem(1042256, 1);
		//im.gainItem(1062167, 1);
		im.sendOk("获得了 #z1003799# x 1");
		//im.worldSpouseMessage(0x24,"『高贵自选箱』：玩家 "+ im.getChar().getName() +" 获得了弓箭手高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003800, 1);
		//im.gainItem(1042257, 1);
		//im.gainItem(1062168, 1);
		im.sendOk("获得了 #z1003800# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了飞侠高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 4:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		im.gainItem(1003801, 1);
		//im.gainItem(1042258, 1);
		//im.gainItem(1062169, 1);
		im.sendOk("获得了 #z1003801# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了海盗高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 5:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003797, 1);
		im.gainItem(1042254, 1);
		//im.gainItem(1062165, 1);
		im.sendOk("获得了 #z1042254# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了战士高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 6:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003798, 1);
		im.gainItem(1042255, 1);
		//im.gainItem(1062166, 1);
		im.sendOk("获得了 #z1042255# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了法师高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 7:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003799, 1);
		im.gainItem(1042256, 1);
		//im.gainItem(1062167, 1);
		im.sendOk("获得了 #z1042256# x 1");
		//im.worldSpouseMessage(0x24,"『高贵自选箱』：玩家 "+ im.getChar().getName() +" 获得了弓箭手高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 8:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003800, 1);
		im.gainItem(1042257, 1);
		//im.gainItem(1062168, 1);
		im.sendOk("获得了 #z1042257# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了飞侠高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 9:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		//im.gainItem(1003801, 1);
		im.gainItem(1042258, 1);
		//im.gainItem(1062169, 1);
		im.sendOk("获得了 #z1042258# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了海盗高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 10:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003797, 1);
		//im.gainItem(1042254, 1);
		im.gainItem(1062165, 1);
		im.sendOk("获得了 #z1062165# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了战士高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 11:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003798, 1);
		//im.gainItem(1042255, 1);
		im.gainItem(1062166, 1);
		im.sendOk("获得了 #z1062166# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了法师高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 12:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003799, 1);
		//im.gainItem(1042256, 1);
		im.gainItem(1062167, 1);
		im.sendOk("获得了 #z1062167# x 1");
		//im.worldSpouseMessage(0x24,"『高贵自选箱』：玩家 "+ im.getChar().getName() +" 获得了弓箭手高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 13:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003800, 1);
		//im.gainItem(1042257, 1);
		im.gainItem(1062168, 1);
		im.sendOk("获得了 #z1062168# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了飞侠高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;
	case 14:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		//im.gainItem(1003801, 1);
		//im.gainItem(1042258, 1);
		im.gainItem(1062169, 1);
		im.sendOk("获得了 #z1062169# x 1");
		//im.worldSpouseMessage(0x24,"『高贵防具自选箱』：玩家 "+ im.getChar().getName() +" 获得了海盗高贵防具。");	
		im.dispose();
	} else {
		im.sendOk("装备栏空间不足");
		im.dispose();
	}
		break;








}
    }
}
