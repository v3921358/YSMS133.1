/*
 脚本功能：市场管理员
 */
var status = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////红沙漏
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun4 = "#fUI/UIWindow/Quest/reward#";////奖励
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹带
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////红色圆
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
		//var selStr = "\t\t\t\t#e#n  " + tz1+ "更多服务" + tz1+ "#n#k\r\n\r\n";
        //selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
	var 	selStr = "#b#L26#"+tz1+" 花园种植#l #L29#"+tz1+" 竞技积分#l #L30#"+tz1+" 金币换点#l \r\n";
		selStr += "#b#L7#"+tz1+" 管理雇佣#l #L8#"+tz1+" 活跃查询#l #L20#"+tz1+" 官方认证#l\r\n";
		selStr += "#b#L10#"+tz1+" 家族业务#l #L2#"+tz1+" 爆率查询#l #L3#"+tz1+" 清理背包#l\r\n";
		selStr += "#b#L4#"+tz1+" 宠物进化#l #L19#"+tz1+" 点卷洗血#l #L6#"+tz1+" 银行管理#l\r\n";
		selStr += "#b#L14#"+tz1+" 宝藏仓库#l #L31#"+tz1+" 抵用洗血#l \r\n";
		selStr += "#b#L22#"+tz1+" 打开UI#l\r\n";


//selStr += "#b#L22#"+tz1+" 猜拳个人#l #L23#"+tz1+" 神秘解锁#l #L28#"+tz1+" 每日任务#l\r\n";

		//selStr += "#b#L7#"+tz1+" 休闲钓鱼     #r【奖励丰富】#k#l#L5#"+tz1+" 美容美发#l \r\n";
		//selStr += "#b#L1#"+tz1+" 猜拳==对战版 #r【玩家对战赢奖励】#l \r\n";
		//selStr += "#b#L2#"+tz1+" 猜拳==个人版 #r【暴风币，点卷】#l \r\n";
		//selStr += "#b#L3#"+tz1+" 解锁==小游戏 #r【魔方】#l \r\n";
		//selStr += "#b#L4#"+tz1+" 陷阱挑战     #r【道具，金币】#l \r\n";
		//selStr += "#b#L5#"+tz1+" 攀爬城墙     #r【道具，金币】#l \r\n";


		//selStr += "#b#L10#"+yun1+" 家族业务#l #L11#"+yun1+" 重置副本#l #L12#"+yun1+" 猜拳游戏#l\r\n\t\r\n";

         //selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"

		selStr += " \t\t\t\t#b#L0#" + tz1+ " 返回菜单#l\r\n";



		//selStr += "#r#L4#"+ttt6+" 美容美发#l #L14#"+ttt6+" 每日寻宝#l #L15#"+ttt6+" 魔方解锁#l\r\n";
		//selStr += "#r#L10#"+ttt6+" 绝版点装#l #L11#"+ttt6+" 双倍道具#l #L12#"+ttt6+" 各种椅子#l\r\n";
		//selStr += "#r#L16#"+ttt6+" 重置副本#l #L17#"+ttt6+" 理财钱庄#l #L6#"+ttt6+" 中介商人#l\r\n\r\n";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1012124, 1012124);
            break; 
        case 1://游戏排行
            cm.dispose();
            cm.openNpc(9900004, 200);
            break;  
        case 2://爆率查询
            cm.dispose();
            cm.openNpc(9900003, 5);
            break; 
        case 3://清理背包
            cm.dispose();
            cm.openNpc(1012124, 3);
            break; 
        case 4://春节币店
            cm.dispose();
            cm.openNpc(1540419, 86);
            break;
        case 5://美容美发
            cm.dispose();
            cm.warp(100000104, 0);
            break;
        case 6://银行管理
            cm.dispose();
            cm.openNpc(9900003, 14);
            break;
        case 7://雇佣商店
            cm.dispose();
            cm.openNpc(9030000);
            break;
        case 8://活跃查询
            cm.dispose();
            cm.openNpc(1540419, 23);
            break;
        case 9://猜拳游戏
            cm.dispose();
            cm.openNpc(9900004, 300);
            break;
        case 10://家族业务
            cm.dispose();
            cm.openNpc(2010011);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9900002, 4);
            break;
        case 13:
            cm.dispose();
            cm.warp(100000104, 0);
            break;
        case 14://10元寻宝
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
	case 19://快速洗血洗蓝
            cm.dispose();
            cm.openNpc(9310382, 87);//快速洗血
            //cm.openNpc(9310382, 700);//快速洗血洗蓝
            break
        case 20://官方认证奖励
            cm.dispose();
 	    cm.openNpc(1012124, 115);
            //cm.openNpc(1540419, 444);
            break;
        case 21://猜拳对战
            cm.dispose();
            cm.openNpc(1540202);
            break;  
        case 22://猜拳个人
            cm.dispose();
            //cm.openNpc(9900004, 300);
cm.openUI(596);
            break; 
        case 23://魔方解锁
            cm.dispose();
            cm.openNpc(9900003, 111);
            break; 
        case 24://陷阱挑战
            cm.dispose();
			cm.warp(301050300,0);
            //cm.openNpc(9310472);
            break;
        case 25://攀爬城墙
            cm.dispose();
			cm.warp(301050200,0);
            //cm.openNpc(9900003, 31);
            break;
        case 26://花园种植
            cm.dispose();
            cm.openNpc(9330065);
            break;
        case 27://钓鱼
            cm.dispose();
            cm.openNpc(1012124, 114);
            break;

        case 28://20环任务
            cm.dispose();
            cm.openNpc(1012124, 113);
            break;
        case 29://竞技场积分兑换征服币
            cm.dispose();
            cm.openNpc(1012124, 501);
            break;

        case 30://金币换点
            cm.dispose();
            cm.openNpc(1012124, 116);
            break;
        case 31://抵用洗血
            cm.dispose();
            cm.openNpc(1012124, 83);
            break;



}
    }
}
