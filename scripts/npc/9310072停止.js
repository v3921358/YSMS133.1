
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
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
		var selStr = "\t\t\t\t#e#d " + tz1+ "娱乐系统" + tz1+ " #n#l#k\r\n\r\n";
		//selStr +="\r\n#e#b" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "提示：充值比率1：1美金==3000点卷" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "\r\n";
		selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n\r\n";

		selStr += "#b#L4#"+tz1+" 高级转蛋机#l \r\n\r\n";
		selStr += "#b#L13#"+tz1+" 转盘大乐透#l\r\n\r\n";

		//selStr += "#r#L4#"+tz1+" 高级转蛋#l #L5#"+tz1+" 金币换点#l #L3#"+tz1+" 每日签到#l\r\n";

		//selStr += "#r#L7#"+tz1+" 每日礼物#l #L8#"+tz1+" 猜猜数字#l #L6#"+tz1+" 20环任务#l\r\n";

		//selStr += "#r#L10#"+tz1+" 等级奖励#l #L11#"+tz1+" 免费抵用#l #L12#"+tz1+" 每天登陆#l\r\n";

		selStr += "#b#L14#"+tz1+" 积分抽奖#l    \r\n\r\n";//#L15#"+tz1+" 天天宝箱#l

		selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n";

		//selStr += "#b#L0#" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "点击返回上一页" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "#l\r\n\t";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419);
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
            cm.openNpc(9310472);
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
            cm.openNpc(1540419, 87);
            break;
		case 11:
            cm.dispose();
            cm.openNpc(9900003, 41);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(1540419, 93);
            break;
        case 13:
            cm.dispose();
            cm.openNpc(9310058, 102);
            break;

        case 14:
            cm.dispose();
            cm.openNpc(9310058, 101);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9310058, 103);
            break;









}
    }
}
