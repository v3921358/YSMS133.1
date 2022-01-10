
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";// 太阳效果
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
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
		var selStr = "\t\t"+tz15+" #b各种特殊货币商店#k  "+tz15+"\r\n";
		selStr += "#r#L1#"+ttt6+" 11周年币#l #L2#"+ttt6+" BOSS币店#l #L3#"+ttt6+" RED币商店#l\r\n\r\n";
		selStr += "#r#L4#"+ttt6+" 征服币店#l #L5#"+ttt6+" 贝勒德币#l #L6#"+ttt6+" 麦格纳斯币#l\r\n\r\n";
		selStr += "#r#L7#"+ttt6+" 运动会币#l #L8#"+ttt6+" 暴风币店#l #L9#"+ttt6+" 埃苏莱斯币#l\r\n\r\n";
		selStr += "#r#L10#"+ttt6+" 糖果书店#l #L11#"+ttt6+" 糖果币店#l #L12#"+ttt6+" 冬季限量币#l\r\n\r\n";
		selStr += "#r#L13#"+ttt6+" 春季币店#l #L14#"+ttt6+" 等待添加#l #L15#"+ttt6+" 等待添加#l\r\n\r\n";
		selStr += "\r\n    #bPS:获得方式: 副本 BOSS 怪物掉落,市场在线挂机等#k  \r\n";
		//selStr += "     #d#L4#"+ttt6+" 部分副本以及BOSS物品掉落查询#l\r\n\r\n";
		//selStr += "             #b#L0#"+ttt6+" 点击返回上一页#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9330079);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9000290, 10);//11周年币
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9310471);//BOSS商店
            break; 
        case 3:
            cm.dispose();
	    cm.openShop(20000);//RED
            //cm.openNpc(9900005, 44);
            break; 
	case 4:
            cm.dispose();
            cm.openNpc(9900003, 21);//征服币商店
            break; 
	case 5:
            cm.dispose();
            cm.openNpc(9900005, 2);//贝勒德币商店
            break; 
	case 6:
            cm.dispose();
	        cm.openShop(10001);//暴君币店
           // cm.openNpc(9330079, 303);
            break; 
	case 7:
            cm.dispose();
	        cm.openShop(22200);//运动币
            //cm.openNpc(9330079, 304);
            break; 
	case 8:
            cm.dispose();
            cm.openNpc(9900004, 10);//暴风币商店
            break; 
	case 9:
            cm.dispose();
            cm.openNpc(9900005, 4);//埃苏莱不斯币
            break; 
	case 10:
            cm.dispose();
            cm.openNpc(9330079, 26);//技能书商店
            break; 
	case 11:
            cm.dispose();
            cm.openNpc(9330079, 202);//糖果币店
            break; 
	
	case 12:
            cm.dispose();
			//cm.sendOk("暂时未开放。")
            cm.openNpc(9000069);//冬季限量币
            break; 
    case 13:
            cm.dispose();
            cm.openNpc(9310144, 1);//春季币店
            break; 
	case 14:
            cm.dispose();
			cm.sendOk("暂时未开放。")
           // cm.openNpc(9330079, 202);//糖果币店
            break;

	case 15:
            cm.dispose();
			cm.sendOk("暂时未开放。")
           // cm.openNpc(9330079, 202);//糖果币店
            break; 









}
    }
}
