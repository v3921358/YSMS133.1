
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
		var selStr = "这里都是常用功能哟。\r\n\r\n";		
		//selStr += "#r#L7#"+ttt6+" 挑战BOSS#l #L8#"+ttt6+" 挑战副本#l #L6#"+ttt6+" 中介商人#l\r\n\r\n";
		selStr += "#r#L13#"+ttt6+" 美容美发#l #L14#"+ttt6+" 每日寻宝#l #L15#"+ttt6+" 魔方解锁#l\r\n";
		selStr += "#r#L9#"+ttt6+" 管理雇佣#l #L1#"+ttt6+" 活跃查询#l #L2#"+ttt6+" 物品删除#l\r\n";
		selStr += "#r#L4#"+ttt6+" 学习技能#l #L5#"+ttt6+" 转盘乐透#l #L3#"+ttt6+" 银行管理#l\r\n";
		selStr += "#r#L10#"+ttt6+" 绝版点装#l #L11#"+ttt6+" 双倍道具#l #L12#"+ttt6+" 各种椅子#l\r\n";
		selStr += "#r#L16#"+ttt6+" 重置副本#l #L17#"+ttt6+" 理财钱庄#l #L6#"+ttt6+" 中介商人#l\r\n\r\n";
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
            cm.openNpc(9900003, 23);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 508);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 14);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 22);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 502);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 38);
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9900003, 13);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9030000);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900002, 6);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9900002, 11);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9900002, 4);
            break;
        case 13:
            cm.dispose();
            cm.warp(100000104, 0);
            break;
        case 14:
            cm.dispose();
            cm.openNpc(9900003, 27);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
        case 16:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9900003, 17);
            break;








}
    }
}
