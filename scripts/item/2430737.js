
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
		var selStr = "#r[GM提示]： #e#b请选择您需要的卷轴：#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). #z2046110##l\r\n";//周年庆双手武器攻击力卷轴100%
		selStr += "#r#L1#"+ttt6+" 2). #z2046111##l\r\n";//周年庆双手武器魔法力卷轴100%
		selStr += "#r#L2#"+ttt6+" 3). #z2046010##l\r\n";//周年庆单手武器攻击力卷轴100%
		selStr += "#r#L3#"+ttt6+" 4). #z2046011##l\r\n";//周年庆单手武器魔法力卷轴100%
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046110, 1);
		im.sendOk("获得了 #z2046110# x 1");
		//im.worldSpouseMessage(0x24,"『9周年宝箱』：玩家 "+ im.getChar().getName() +" 获得了周年庆双手武器攻击力卷轴100%。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046111, 1);
		im.sendOk("获得了 #z2046111# x 1");
		//im.worldSpouseMessage(0x24,"『9周年宝箱』：玩家 "+ im.getChar().getName() +" 获得了周年庆双手武器魔法力卷轴100%。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046010, 1);
		im.sendOk("获得了 #z2046010# x 1");
		//im.worldSpouseMessage(0x24,"『9周年宝箱』：玩家 "+ im.getChar().getName() +" 获得了周年庆单手武器攻击力卷轴100%。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046011, 1);
		im.sendOk("获得了 #z2046011# x 1");
		//im.worldSpouseMessage(0x24,"『9周年宝箱』：玩家 "+ im.getChar().getName() +" 获得了周年庆单手武器魔法力卷轴100%。");	
		im.dispose();
	} else {
		im.sendOk("消耗栏空间不足");
		im.dispose();
	}
		break;









}
    }
}
