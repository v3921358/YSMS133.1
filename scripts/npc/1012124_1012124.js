/*
 脚本功能：拍卖脚本V2版
 */

var a = 0;
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
var List = Array(

	//奇乐助手
	Array(tz1 + "#n返回市场#k", 99, 1),
	Array(tz1 + "#n职业转职#k", 4, 1),
	Array(tz1 + "#n万能传送#k", 2, 1, 1033112),//1012124,2
	Array(tz1 + "#n更多服务#k", 94, 1, 1012124),
	Array(tz1 + "#n学习技能#k", 22, 1),
	Array(tz1 + "#n王者之路#k", 400, 1, 1012124),
	Array(tz1 + "#n特色副本#k", 1, 1, 1033112),
	Array(tz1 + "#n世界BOSS#k\r\n", 3, 1,1033112),

	Array(tz1 + "#r游戏官网#k", 710, 2, 1012124),
	Array(tz1 + "#r游戏商城#k", 711, 2, 1012124),
	Array(tz1 + "#r赞助充值#k", 709, 2, 1012124),
	Array(tz1 + "#rPVP大乱斗#k\r\n", 712, 2, 1012124),



   	Array(tz1 + "#b星币理财#k", 100, 2, 1012124), //TODO  98
	Array(tz1 + "#b福利专区#k", 95, 2, 1012124),
	Array(tz1 + "#b充值奖励#k", 8, 2, 9310144),
	Array(tz1 + "#b点卷中介#k", 84, 2, 1012124),

	Array(tz1 + "#b杂货点商#k", 120, 2, 1012124),
	Array(tz1 + "#b时装商场#k", 310, 2, 1012124),
	Array(tz1 + "#b怪物币店#k", 130, 2, 1012124),
	Array(tz1 + "#b星币商城#k\r\n", 210, 2, 1012124)



	//Array(tz1 + "#b十元寻宝#k", 27, 1),
    	//Array(tz1 + "#r常用功能#k", 17, 1, 9310144), 
	//Array(tz1 + "#r超值商店#k", 3, 2, 9201357),
	//Array(tz1 + "#r新人福利#k", 12, 2), //TODO	
	//Array(tz1 + "#r百货商店#k", 1, 2), //TODO
	//Array(tz1 + "#r游戏宝库#k", 10, 1),
	//Array(tz1 + "#r点卷中介#k", 5, 1, 9900004),
	//Array(tz1 + "#b学习技能#k", 22, 1),
	//Array( " #e#d打开网站充值[1RMB==1元宝+3000点卷]#n#k\r\n", 709, 2,9330079)
	//Array(icon3+"#b连续签到#k", 502, 2),
	//Array(icon3+"#b在线奖励#k",608, 2, 9900003),
	//Array(icon3+"#b每日签到#k", 7, 2),
	//Array(icon2+"#n点卷商店#k", 15, 2),
	//Array(icon2+"#n竞技积分#k\r\n", 501, 2),
	//Array(icon2+"#n点卷中介#k", 5, 2, 9900004),

	//Array(icon2+"#n爆率查询#k", 5, 2),
	//Array(icon2+"#n重置副本#k", 3, 2, 9900004),
	//Array(icon2+"#n物品删除#k", 500, 2),
);

var text;
//是否活动，名字，模式，类别

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			a++;
		else
			a--;
		if (a == -1) {
			cm.dispose();

		} else if (a == 0) {
			var myRmb = cm.getRMB();
           		//text = "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"

			//text = "  " + tz20 + "尊敬的玩家#b#h ##k，   欢迎来到#b#eYSMS冒险岛#n#k\r\n";

			text = " #bYSMS冒险岛#r有你更精彩#b^_^#k\r\n";

			//text  = "" + tz20 + "欢迎#b#h ##k来到#b#e点点冒险岛#n#k,您当前在本服:\r\n";
			text += "#n在线：#r" + cm.getPlayer().getTodayOnlineTime() + "#k#n分钟  星币：#r" + myRmb + "#k 累计：#r" + cm.getTotalRMB() + "#k\r\n"; //  +icon2+"活力值：#r"+cm.getPlayerEnergy()+"#k
			text += "点卷：#r" + cm.getPlayer().getCSPoints(1) + "#k  抵用：#r" + cm.getPlayer().getCSPoints(2) + "#k 雪花币 #r" + cm.getPlayerPoints() + "#k\r\n";
			//text += "#g===============#k#n^_^ 万能服务区 ^_^#g================#k \r\n";
			//text += " #L1001#" + tz1 + "#r游戏官网#l     #k#L1002#" + tz1 + "#r游戏充值#l     #r#L1000#" + tz1 + "游戏商城#l#k\r\n";

           		//text += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + " "
			ListFor(1);
			//text += "#g===============#b^_^ 福利商店区 ^_^#g================#k \r\n";
			//text += " #L1001#" + ttt2 + "#r游戏官网#l     #k#L1002#" + ttt2 + "#r游戏充值#l     #r#L1000#" + ttt2 + "游戏商城#l#k\r\n\r\n";


			ListFor(2);
			//text += " #L1001#" + tz1 + "#r游戏官网#l  #k#L1002#" + tz1 + "#r游戏充值#l  #r#L1000#" + tz1 + "游戏商城#l#k\r\n\r\n";
			
			ListFor(3);
			//text += "#r#L10006#" + iconHR + "赞助充值#r 1 #k#b元 #k#n=#r 1 #k#b余额#k#n + #r3000#k#b 点卷#k#r" + iconHR + "#l#k\r\n";

            		//text += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + ""
			//text += " #L1001#" + tz1 + "#r游戏官网#l  #k#L1002#" + tz1 + "#r游戏充值#l  #r#L1000#" + tz1 + "游戏商城#l#k";
			//text += " \r\n#r#L1003#【公告】     #b[庆祝点点冒险岛火爆开启]#k\r\n\r\n"
			text += "\t\r\n"

			cm.sendSimple(text)
		} else if (a == 1) {
			switch (selection) {
				//进入游戏商城
				case 1000:
                cm.dispose();
                cm.EnterCS();
                cm.dispose();
				break;
			//官方网站
			case 1001:
                cm.dispose();
                cm.openWeb("http://www.cca15.com");
				break;
			//赞助充值
			case 1002:
                cm.dispose();
                cm.openWeb("http://www.cca15.com/zanzhu/");
					break;
					//我要变强
				case 1003:
	                cm.sendOk("#b庆祝点点冒险岛火热开服~！！！！\r\n\r\n请大家多留意自由市场，#r流星妹妹#k#b\r\n\r\n福利活动都在#r流星妹妹#b发放");
				cm.dispose();
				//cm.openNpc(9330006);
				//cm.openNpc(9310058);
		           	cm.dispose();
					break;

				case 1004://新手说明
				cm.openNpc(9062000);
		           	cm.dispose();
					break;

					//免费10级:
				case 10003:
					if (cm.getLevel() < 10) {
						for (var i = 0; i < 10; i++) {
							if (cm.getLevel() >= 10)
								break;
							cm.gainExp(2000000000);
						}
					} else {
						cm.sendOk("您已经达到10级，无法再使用该功能。");
					}
					cm.dispose();
					break;
					//在线活力积分
				case 10004:
					cm.dispose();
					cm.openNpc(9900003, 608);
					break;
				case 10005:
					cm.dispose();
					cm.openNpc(9201116);
					break;
				case 10006:
					cm.dispose();
					cm.openNpc(1012124, 709);
					break;
					//充值奖/
				case 10007:
					cm.dispose();
					cm.openNpc(9310144, 8);
					break;
				case 10008:
					cm.dispose();
					cm.openNpc(9900005, 3);
					break;
				default:
					var mode_ = List[selection][1];
					var npcid = 9900003;
					if (List[selection][3] != null)
						npcid = List[selection][3];
					cm.dispose();
					if (npcid == 1) {
						cm.openWeb("http://www.huiyimxd.com");
					} else {
						cm.openNpc(npcid, mode_);
					}
			}

		} //a
	} //mode
} //f


function ListFor(type) {
	var x = 0;
	var space = "";
	if (type >= 3)
		space = "  ";
	for (var i = 0; i < List.length; i++) {
		if (List[i][2] == type) {
			if (x == 3) {
				text += "#L" + i + "#" + List[i][0] + "#l\r\n";
				x = 0;
			} else {
				text += "#L" + i + "#" + List[i][0] + "#l" + space;
				x++;
			}
		}
	}
	//text+="\r\n";
}