
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
		//var selStr = " \t\t\t\t常用商店#k\r\n";
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		//selStr += "#b#L0#"+tz9+" 杂货商店#l  #L1#"+tz9+" 双刀商店#l  #L2#"+tz9+" 飞镖商店#l\r\n";
		//selStr += "#b#L3#"+tz9+" 特殊商店#l  #L4#"+tz9+" 外星商店#l  #L5#"+tz9+" 狮王商店#l\r\n";
		//selStr += "#b#L6#"+tz9+" 金币商店#l  #L7#"+tz9+" 抵用商店#l  #L8#"+tz9+" 雪花币店#l\r\n";
		//selStr += "#b#L9#"+tz9+" 道具商店#l  #L10#"+tz9+" 卷轴商店#l  #L11#"+tz9+" 其它商店#l\r\n\r\n";
		//selStr += "#r#L33#"+tz9+" 宠物技能装备商店  #l\r\n";

		//selStr += "#g=================#k怪物纪念币商店#g=================  #k\r\n";

	    var selStr = "#g========#k更多怪物纪念币商店敬请期待#g========  #k\r\n";
		selStr += "#b#L100#"+tz1+" #z4310196#    #r[可兑换暴君防具等]#l  \r\n";
		selStr += "#b#L33#"+tz1+" 宠物技能商店   #r[宠物技能/装备]#l  \r\n";
		//selStr += "#b#L108#"+tz1+" 泡点雪花商店  #r[可兑换技能书]#l  \r\n";
		selStr += "#b#L114#"+tz1+" 泡点雪花商店  #r[可兑换卷轴，蓝调等]#l  \r\n";
		selStr += "#b#L104#"+tz1+" #z4310097#    #r[可兑换贝勒德饰品]#l  \r\n";
		selStr += "#b#L102#"+tz1+" #z4310088#    #r[可兑换革命装备/金币等]#l  \r\n";
		selStr += "#b#L105#"+tz1+" #z4310058#    #r[可兑换暴君防具]#l  \r\n";
		selStr += "#b#L106#"+tz1+" #z4000487#    #r[可兑换技能书]#l  \r\n";
		selStr += "#b#L109#"+tz1+" #z4000487#    #r[可兑换职业副手]#l  \r\n";
		selStr += "#b#L101#"+tz1+" #z4310036#    #r[可兑换140装备/极品卷轴]#l  \r\n";
		selStr += "#b#L107#"+tz1+" #z4310156#    #r[可兑换埃苏莱布斯装备]#l  \r\n";
		selStr += "#b#L110#"+tz1+" #z4033247#    #r[可兑换伤害皮肤]#l  \r\n";
		selStr += "#b#L112#"+tz1+" #z4310020#    #r[可兑换骑宠]#l  \r\n";
		selStr += "#b#L113#"+tz1+" #z4000313#    #r[暂未添加]#l  \r\n";

		selStr += "#b#L99#"+tz1+" 点我返回拍卖菜单 #l\r\n";





		
	   // var selStr = "#b#L100#"+tz1+" 春节币店#l  \t\t    #L33#"+tz1+" 宠物装备技能#l\r\n";
		//selStr += "#b#L104#"+tz1+" 贝勒德币#l   \t\t\t#L105#"+tz1+" 麦格纳斯币#l \r\n";
		//selStr += "#b#L106#"+tz1+" 暗影币店#l   \t\t\t#L102#"+tz1+" RED币商店#l \r\n";
		//selStr += "#b#L101#"+tz1+" 征服币店#l   \t\t\t#L107#"+tz1+" 埃苏莱斯币#l\r\n";//#L20#"+tz12+" 现金商城#l
		//selStr += "#b#L108#"+tz1+" 雪花书店#l   \t\t\t#L109#"+tz1+" 职业副手#l \r\n";
		//selStr += "#b#L110#"+tz1+" 伤害皮肤#l  \t\t\t#L112#"+tz1+" 骑宠兑换#l \r\n\r\n";//\t\t\t#L112#"+tz1+" 坐骑兑换#l 
		//selStr += "#r#L911#"+tz1+" 中国心兑换春节币   [限时兑换3天]#l\r\n\r\n";

		//selStr += "#r#L0#"+tz9+" #b#z4310196#  [游戏杂货商店]#l #L5# [游戏宝库商店]#l\r\n";
		//selStr += "#r#L21#"+tz9+" 兑  换#b  [金币兑换点卷]#l #L7# [纪念币兑换商店]#l\r\n";
		//selStr += "#r#L12#"+tz9+" 点  卷#b  [稀有绝版点装]#l #L13# [购买稀有卷轴]#l\r\n";
		//selStr += "#r#L14#"+tz9+" 金  币#b  [购买魔方道具]#l #L15# [购买绝版点装]#l\r\n";
		//selStr += "#r#L16#"+tz9+" 现金点#b  [购买高级装备]#l #L17# [购买道具材料]\r\n";
		//selStr += "#r#L18#"+tz9+" 抵用卷#b  [购买消耗卷轴]#l #L19# [购买高级装备]#l\r\n";
		//selStr += "#r#L22#"+tz9+" 现金点#b  [点点超值理财]#l #L17# [购买道具材料]\r\n\r\n";
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"



		//selStr += "#r#L20#"+ttt6+" #e兑  换#n  [点卷兑抵用卷]#l #L21# [金币兑换成点卷]#l\r\n\r\n";
		//selStr += "#r#L2#"+tz9+" 游戏金币商店#l    #L7#"+ttt6+" 11周年纪念币商店#l\r\n";
		//selStr += "#r#L3#"+tz9+" 抵用卷商店#l      #L8#"+ttt6+" 麦格拉斯币商店#l\r\n";
		//selStr += "#r#L4#"+tz9+" 10%卷轴商店#l     #L9#"+ttt6+" 贝勒德币商店#l\r\n\r\n";
		//selStr += "#r#L16#"+tz9+" 现金点#b  [购买高级装备]#l #L17# [购买道具材料]\r\n";
		//selStr += "#r#L8#"+tz9+" 现金点#b  [现金点卷中介]#l #L19# [购买道具材料]\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://杂货商店
	cm.openShop(1012123);//shop字段不能为0
        cm.dispose();
            break; 
        case 1://双刀商店
                cm.openShop(1012125);
		cm.dispose();
            break;  
        case 2://飞镖商店
                cm.openShop(1033003);
		cm.dispose();
            break; 
        case 3://特殊商店
                cm.openShop(1033001);
		cm.dispose();
            break; 
        case 4://外星商店
            cm.dispose();
                cm.openShop(9310117);
           // cm.openShop(10001);
            break;
        case 5://狮王币商店
            cm.dispose();
            //cm.openShop(20000);
                 cm.openShop(2161010);
		cm.dispose();
            break;
        case 6://金币商店
            cm.dispose();//对应表110000字段
	    cm.openNpc(1540419, 999);
           // cm.openShop(10002);
            break;
        case 7://抵用商店
            cm.dispose();
            //cm.openShop(22227);
	    cm.openNpc(9900003, 16);	
            break;
	case 8://技能书商店
            cm.dispose();
		cm.openNpc(1012124, 142);
            //cm.openNpc(9900003, 38);
            break;

        case 9://消耗卷轴
            cm.dispose();

	cm.openNpc(9900003, 11);
            break;
        case 10://卷轴
            cm.dispose();
	    //cm.sendOk("暂时未开放。")
	   // cm.openNpc(9000290);
           cm.openNpc(9900003, 44);
            break;
        case 11://饰品商店
            cm.dispose();
            cm.openNpc(9310060, 2); //饰品
            break; 
        case 13:
            cm.dispose();
            cm.openNpc(9900003, 11);
            break;
        case 14:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 15:
            cm.dispose();
            cm.openShop(10000);
            break;	
        case 16:
            cm.dispose();
            cm.openNpc(9310382, 302);
            break; 
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9310382, 300);
            break;
        case 18:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 19:
            cm.dispose();
            cm.openNpc(9900003, 18);
            break;
        case 20:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 21:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 22:
            cm.dispose();
            cm.openNpc(1540419, 98);
            break;
        case 33://宠物技能装备商店
            cm.dispose();
            cm.openNpc(9900003, 45);
            break;
        case 99:
            cm.dispose();
            cm.openNpc(1012124, 1012124);
            break;
		case 100:
            cm.dispose();
            cm.openNpc(9000290, 11);//12周年币
            break;
		case 101:
            cm.dispose();
            cm.openNpc(9900003, 21);//征服币商店
            break; 
        case 102:
            cm.dispose();
			cm.openShop(20000);//RED
			//cm.openNpc(9900005, 44)
            break; 
		case 103:
            cm.dispose();
	        cm.openShop(22200);//运动币
            //cm.openNpc(9330079, 304);
            break;
		case 104:
            cm.dispose();
            cm.openNpc(9900005, 2);//贝勒德币商店
            break; 
		case 105:
            cm.dispose();//暴君币商店
			//cm.sendOk("暂时未开放。")
			//cm.openShop(10003);
            cm.openNpc(1012124, 144);
            break;
		case 106:
            cm.dispose();
            cm.openNpc(9900004, 10);//暴风币商店
            break; 
		case 107:
            cm.dispose();
			//cm.sendOk("暂时未开放。")
            cm.openNpc(1012124, 145);//埃苏莱不斯币
            break; 
		case 108:
            cm.dispose();
            cm.openNpc(1012124, 142);//技能书商店
            break; 
		case 109:
            cm.dispose();
		//cm.sendOk("暂时未开放。")
            //cm.openNpc(1540419, 202);//糖果币店
		cm.openNpc(1012124, 143);//职业副手
            break; 
	
		case 110:
            cm.dispose();
			//cm.sendOk("暂时未开放。")
            cm.openNpc(1012124, 146);//金枫叶兑换伤害皮肤
            break; 
		case 111:
            cm.dispose();
            cm.openNpc(9310144, 1);//春季币店
            break;
		case 112:
            cm.dispose();
            cm.openNpc(1012124, 131);//怪物公园币兑换骑宠
            break;
		case 113:
            cm.dispose();
	    cm.sendOk("暂时未开放。")
            //cm.openNpc(1012124, 133);//金色枫叶
            break;
		case 114:
            cm.dispose();
	    //cm.sendOk("暂时未开放。")
            cm.openNpc(1012124, 132);//雪花兑换道具
            break;
		case 911:
            cm.dispose();
            cm.openNpc(9000290, 13);//中国心兑换春季币店
            break;





}
    }
}
