
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
		var selStr = "这里的功能都是消费商店。\r\n\r\n";
		selStr += "#L8#"+ttt6+" #e中介商#n  [现金兑换元宝]#l #L11# [点卷兑换国庆币]\r\n";
		selStr += "#d#L1#"+ttt6+" #e点  卷#n  [稀有绝版点装]#l #L9# [购买稀有卷轴]#l\r\n";
		selStr += "#d#L7#"+ttt6+" #e金  币#n  [购买魔方道具]#l #L10# [购买绝版点装]#l\r\n";
		selStr += "#r#L2#"+ttt6+" #e现金点#n  [购买高级装备]#l #L12# [购买道具材料]\r\n";
		selStr += "#b#L3#"+ttt6+" #e抵用卷#n  [购买消耗卷轴]#l #L4# [购买高级装备]#l\r\n";
		//selStr += "#b#L4#"+ttt6+" #e抵用卷#n  [购买高级装备]#l\r\n";
		selStr += "#r#L5#"+ttt6+" #e兑  换#n  [点卷兑抵用卷]#l #L6# [金币兑换成点卷]#l\r\n\r\n";
		//selStr += "#r#L6#"+ttt6+" 兑换  [金币兑换成点卷]#l\r\n\r\n";
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
            cm.openNpc(9900002, 6);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9201357, 2);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 19);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 18);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 7:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 38);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9900003, 11);
            break;
        case 10:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9201357);
            break;









}
    }
}
