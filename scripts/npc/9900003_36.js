
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
		var selStr = "这里的功能都是福利功能。\r\n\r\n";
		selStr += "#r#L9#"+ttt6+" 充值奖励#l #L1#"+ttt6+" 在线奖励#l #L2#"+ttt6+" 登陆奖励#l\r\n";
		selStr += "#r#L4#"+ttt6+" 云朵兑换#l #L5#"+ttt6+" 金币换点#l #L3#"+ttt6+" 每日签到#l\r\n";
		selStr += "#r#L7#"+ttt6+" 每日礼物#l #L8#"+ttt6+" 猜猜数字#l #L6#"+ttt6+" 20环任务#l\r\n";
		selStr += "#r#L10#"+ttt6+" 等级奖励#l #L11#"+ttt6+" 免费抵用#l\r\n\r\n";
		selStr += "             #b#L0#"+ttt6+" 点击返回上一页#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310362);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9900003, 608);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9310144, 18);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 7);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9310144, 26);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 110);
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9900003, 103);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 104);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900003, 33);
            break;
		case 11:
            cm.dispose();
            cm.openNpc(9900003, 41);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(9900003, 43);
            break;










}
    }
}
