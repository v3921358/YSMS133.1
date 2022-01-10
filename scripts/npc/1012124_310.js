/* 点卷商店 */

var status = 0;
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
    if (status == 0) {
    //var selStr = "#b"+tz+"亲爱的"+tz+" #r#h ##k"+tz+" 您好 \r\n";
		 var selStr = "#d您当前点券： #r"+cm.getNX(1)+"#k #d点#k\t#d当前现金： #r" + cm.getRMB() + "#k #d点#k\r\n#e#d请选择：(#r请看好购买哦.点了就买啦!#k):\r\n#n#k";
		//selStr += "#g======================#k点卷区域#g====================#k\r\n";
		selStr += "#b#L0#"+tz+"戒指#l	    #L2#"+tz+"帽子#l       #L4#"+tz+"披风\r\n";
		selStr += "#L6##b"+tz+"裤裙#l	    #L7#"+tz+"上衣#l       #L5#"+tz+"其它#l\r\n";
		selStr += "#L8##b"+tz+"手套#l	    #L9#"+tz+"套装#l       #L1#"+tz+"鞋子#l\r\n";
		selStr += "#L10##b"+tz+"武器#l        #L14#"+tz+"椅子#l\r\n\r\n";// #L12#稀有宠物#l\t#L13#"+tz+"双倍#l \t  
		//selStr += "#g======================#k现金区域#g====================#k\r\n";
		//selStr += "#L100#"+tz+"#r极品椅子#l    #L101#"+tz+"#r真系武器#l     #L102#"+tz+"#r150防具#l\r\n";
		//selStr += "#L105#"+tz+"#r极品卷轴#l    #L104#"+tz+"#r强化礼包#l     #L103#"+tz+"#r150武器#l\r\n";

		//selStr += "#L17##r"+tz+"装备#l		#L19#"+tz+"礼包#l \t   #L20#"+tz+"消耗#l\r\n\r\n";
		

//selStr += "#L22##e#b本周特价大优惠#r（第一期）#b每周更新一次#l	  \r\n\t";//#L20#特殊卷轴#l #L22##e#b限时优惠神秘商品（第一期）#l	
		//selStr += "#L22##r限时优惠商品（第一期）#l		 \r\n";//#L20#特殊卷轴#l
		//selStr += "\r\n#L22##g打开本服充值链接【1元=1元宝+2000点卷】#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了1540419其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419, 1521); //戒指
            break;
        case 2:
            cm.dispose();
            cm.openNpc(1540419, 1522); //帽子
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1540419, 1523); //披风
            break;
        case 5:
            cm.dispose();
            cm.openNpc(1540419, 1524); //其它
            break;
        case 6:
            cm.dispose();
            cm.openNpc(1540419, 1525); //裤裙
            break;
        case 7:
            cm.dispose();
            cm.openNpc(1540419, 1526); //上衣
            break;
        case 8:
            cm.dispose();
            cm.openNpc(1540419, 1527); //手套
            break;
        case 9:
            cm.dispose();
            cm.openNpc(1540419, 1528); //套装
            break;
	case 10:
            cm.dispose();
            cm.openNpc(1540419, 1529); //武器
            break;
	case 1:
            cm.dispose();
            cm.openNpc(1540419, 1530); //鞋子
            break;
    case 11:
            cm.dispose();
            cm.openNpc(1540419, 155); //玩具
            break;
	case 12:
            cm.dispose();
            cm.openNpc(1540419, 153); //宠物
            break;
	case 13:
            cm.dispose();
            cm.openNpc(1540419, 151); //双倍道具
            break;
	case 14:
            cm.dispose();
            cm.openNpc(1540419, 156); //椅子
            break;
	case 15:
            cm.dispose();
            cm.openNpc(1540419, 10); //游戏宝库
            break;
	case 16:
            cm.dispose();
            cm.openNpc(9310069, 1); //装备
            break;
	case 17:
            cm.dispose();
            cm.openNpc(9310060, 2); //饰品
            break;
	case 18:
            cm.dispose();
            cm.openNpc(9310069, 3); //消耗
            break;
	case 19:
            cm.dispose();
            cm.openNpc(9310060, 4); //礼包
            break;
	case 20:
            cm.dispose();
            cm.openNpc(9900002, 10); //洗点卷轴
            break;
	case 21:
            cm.dispose();
            cm.openNpc(9310069, 100); //余额商店
            break;
	case 22:
            cm.dispose();
            cm.openNpc(9310069, 5); //余额限时打折商店
            break;

	case 100:
            cm.dispose();
            cm.openNpc(9310074, 100); //现金椅子
            break;
	case 101:
            cm.dispose();
            cm.openNpc(9310074, 101); //真系武器
            break;
	case 102:
            cm.dispose();
            cm.openNpc(9310074, 102); //150鲁塔比斯暴君
            break;
	case 103:
            cm.dispose();
            cm.openNpc(9310074, 103); //FFN武器
            break;
	case 104:
            cm.dispose();
            cm.openNpc(9310074, 104); //强化礼包
            break;
	case 105:
            cm.dispose();
            cm.openNpc(9310074, 105); //现金卷轴
            break;

	case 30:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("已经为您打开赞助网站！");
            break;
        }
    }
}