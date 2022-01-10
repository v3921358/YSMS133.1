
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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		var time = cm.getPlayer().getTodayOnlineTime();
		RMB = cm.getRMB();
		var selStr = "#d您今天在线时长为： #r" + time + "#k #d分钟  累计充值金额： #r" + RMB + "#b 元#k\r\n";
		selStr += "#b可用余额为： #r"+ cm.getHyPay(1) +"#b 元  #b目前点卷： #r" + cm.getPlayer().getCSPoints(1) + "#k #b点\r\n";
		selStr += "#b目前#z4001485#为:#r " + cm.getItemQuantity(4001485) + " #k#b个 \r\n\r\n";
		selStr += "#r#L3#"+ttt6+" 点卷中介->> #z4000463##l\r\n\r\n";
		selStr += "#r#L2#"+ttt6+" 现金中介->> #z4001485##l\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 5);
            break; 
	case 2:
            cm.dispose();
            cm.openNpc(1540419, 91);
            break;
	case 3:
            cm.dispose();
            cm.openNpc(1540419, 89);
            break;









}
    }
}
