var status = 0;
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
var z = "#fUI/UIWindow/Quest/icon5/1#";////美化
var PayLogPoints = 0;
var yz = new Array(3010947,3010948,3015006,3015010,3010837,3010837,3010838,3010854,3010815,3010804,3010696,3015329,3015262,3015246,3015395);
var chance = Math.floor(Math.random()*yz.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		//var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r随身npc#k#n\r\n";
	    var selStr = ""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+"\r\n\r\n";
		selStr += "#r欢迎使用随身特权,本次给您带来快捷服务：#k\r\n\r\n";
		selStr += "#b#L24# "+tz1+"重置副本#l  #L66# "+tz1+"戒指晋级#l  #L17# "+tz1+"理财钱庄#l\r\n";
		selStr += "#b#L7# "+tz1+"天天双倍#l  #L25# "+tz1+"快速洗血#l  #L99# "+tz1+"屌丝商城\r\n";
		selStr += "#b#L33# "+tz1+"屌丝喊话#l  #L6# "+tz1+"自主美容#l  #L26# "+tz1+"每日寻宝#l\r\n";
		selStr += "#b#L3# "+tz1+"戒指兑换#l  #L11# "+tz1+"椅子租借#l  #L13# "+tz1+"装备换点#l\r\n";

		selStr +=" #L67##b"+tz1+"老公老婆戒指晋级#r #z4001465##b 专用地图#l#k\r\n\r\n\r\n";


		//selStr += "#r#L50# 会员喇叭#l  #L6# 自选发型#l  #L10# 每日寻宝#l\r\n";
		//selStr += "#L3# 换取戒指#l  #L11# 租借椅子#l  #L13# 高级回收#l\r\n";
		//selStr += "#L24# 免费重置#l  #L88# 一键潜能#l  #L17# 理财钱庄#l\r\n";
		//selStr += "#L7# 天天双倍#l  #L25# 快速洗血#l  #L99# 奇特商店\r\n";

		//selStr += "#L7# 一键潜能#l  #L8# 超级商店#l  #L18# 一键清理\r\n";

		//selStr += "#L4# BOSS重置#l  #L14# 副本重置#l  #L17# 超值福利#l\r\n";
		//selStr += "#r#L0# 每日工资#l  #L1# 免费点卷#l  #l\r\n";#L9# 每日魔方#l #L5# 领兑换币#l 
		//selStr += "#L7# 三倍经验#l  #L8# 领取双爆#l  #L18# 一键清理\r\n";

		//selStr += "#L2# 加HP上限#l  #L19# 加MP上限#l  #L20# 高人一等#l\r\n";
		//selStr += "#L21# 点卷商店#l  #L22# 现金商店#l  #L23# 八折破功#l\r\n";
		//selStr += "#r#L15# 普通理财功能#l    #L16# 高级理财功能#l\r\n";
		//selStr += "\r\n ";
		selStr += ""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+"\r\n";
		//selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 12:
		im.dispose();
		im.openNpc(9900003, 10);
		break;
	case 4:
		im.dispose();
		im.openNpc(9900004, 4);
		break;
	case 14:
		im.dispose();
		im.openNpc(9900004, 5);
		break;
	case 13:
		im.dispose();
		im.openNpc(9310382, 12);
		break;
	case 17:
		im.dispose();
		im.openNpc(9310382, 15);
		break;
	case 18:
		im.dispose();
		im.openNpc(9310382, 17);
		break;
	case 19:
		im.dispose();
		im.openNpc(9310382, 88);
		break;
	case 21:
		im.dispose();
		im.openNpc(9310382, 100);
		break;
	case 22:
		im.dispose();
		im.openNpc(9310382, 200);
		break;
	case 23:
		im.dispose();
		im.openNpc(9310382, 99);
		break;
	case 24:
		im.dispose();//重置副本
		im.openNpc(9310382, 600);
		break;
	case 25:
		im.dispose();//加血加蓝
		im.openNpc(9310382, 601);
		break;
	case 26:
		im.dispose();
		im.openNpc(9900003, 26);//活动泡点
		break;

	case 66://老公老婆戒指升级
		im.dispose();//
		im.openNpc(9310071, 101);
		//im.openNpc(9310071, 100);//初始老公老婆不完整脚本
		break;
	case 67://老公老婆戒指升级地图
		im.dispose();
                 im.warp(211080100);
				
		break
	case 88://蜡笔潜能
		im.dispose();//
		im.openNpc(9900003, 1001);
		break;


	case 99:
		im.dispose();//极品商店
		//im.sendOk("暂未开放.");
		im.openNpc(1012124, 60);
		break;
	case 50:
		if (im.getBossLog("喇叭") < 1) { //喇叭
		im.gainItem(5390011, 10);
		im.gainItem(5390012, 10);
		im.gainItem(5390013, 10);
		im.setBossLog("喇叭");
		im.sendOk("恭喜您领取VIP服务的雪花变大药水.");
		im.worldSpouseMessage(0x24,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日会员独享喇叭。");
		im.dispose();
       } else {
        im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。");
		im.dispose();
            }
		break;
	case 20:
		if (im.getBossLog("高人") < 1) { //工资
		im.gainItem(2003518, 10);
		im.gainItem(2003519, 5);
		im.setBossLog("高人");
		im.sendOk("恭喜您领取VIP服务的雪花变大药水.");
		im.worldSpouseMessage(0x24,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日巨人秘药。");
		im.dispose();
       } else {
        im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。");
		im.dispose();
            }
		break;
	case 15:
	 if (im.getBossLog("理财十天", 1) >= 1) { //工资
		im.dispose();
		im.openNpc(9310382, 13);
		} else {
                im.sendOk("失败：\r\n\r\n#r1). 您是高级理财，请使用高级理财服务。");
				im.dispose();
            }
            break;
	case 16:
	 if (im.getBossLog("月制度理财", 1) >= 1) { //工资
		im.dispose();
		im.openNpc(9310382, 14);
		} else {
                im.sendOk("失败：\r\n\r\n#r1). 您是普通理财，请使用普通理财服务。");
				im.dispose();
            }
            break;
        case 0:
           if (im.getBossLog("工资") < 1) { //工资
            	im.gainMeso(30000000);
				im.setBossLog("工资");
				im.sendOk("恭喜您领取VIP服务的每日工资3000万金币.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日金币。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 体验版无法领取。");
				im.dispose();
            }
            break;
        case 1:
           if (im.getBossLog("点卷") < 1) { //点卷
            	im.gainNX(10000);
				im.setBossLog("点卷");
				im.sendOk("恭喜您领取点卷10000点.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里免费领取每日 1 万点卷。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经使用，请明日再试。\r\n2). 体验版无法领取。");
				im.dispose();
            }
            break;
        case 2:
           if (im.getPlayer().getCSPoints(1) > 100) { //会员等级
				im.dispose();
				im.openNpc(9310382,89);
            } else {
                im.sendOk("您糊弄我呢。点卷不足还点什么。最少得拥有100点卷才可以使用。");
				im.dispose();
            }
            break;
		case 7:
           if (im.getBossLog("天天双倍") < 1) { //三倍
            	im.gainItem(5211060,1,1);
		im.gainItem(2003518, 10);
		im.gainItem(2003519, 5);
            	im.gainItem(5360015,1,1);
				im.setBossLog("天天双倍");
				im.sendOk("恭喜您领取VIP服务的每日三倍经验卡一张.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取天天双倍礼物。");
				im.dispose();
            } else {
                im.sendOk("您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 8:
           if (im.getBossLog("双爆") < 1) { //双爆
            	im.gainItem(5360015,1,1);
				im.setBossLog("双爆");
				im.sendOk("恭喜您领取VIP服务的每日双倍爆率卡一张.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日双倍爆率卡。");
				im.dispose();
            } else {
                im.sendOk("您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 9:
           if (im.getBossLog("魔方") < 1) { //魔方
            			im.gainItem(5064010,10);
				im.gainItem(2340000,10);
				im.gainItem(5062500,10);
				im.gainItem(5062002,10);
				im.setBossLog("魔方");
				im.sendOk("恭喜您领取理财服务的每日理财道具，获得终级神奇魔方、高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴x10。");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日理财道具。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 体验版无法领取。");
				im.dispose();
            }
            break;
		case 5:
           if (im.getBossLog("领币") < 1 && im.getSpace(4) >= 3) { //领币
            	im.gainItem(4310108,100);
		im.gainItem(4310036,100);
		im.gainItem(4033943,30);
		im.gainItem(4001006,20);
				im.setBossLog("领币");
				im.sendOk("恭喜您领取VIP服务的每日领取兑换币\r\n\r\n#i4310108# x 100  #i4310036# x 100  #i4033943# x 30  #i4001006# x 20.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取兑换币。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 背包位置不够");
				im.dispose();
            }
            break;
		case 11:
		var ii = im.getItemInfo();
           if (im.getBossLog("租借") < 1 && im.getSpace(3) >= 1) { //租借
				im.setBossLog("租借");
				im.gainItem(yz[chance], 1, 2 * 60 * 60 * 1000);
				im.sendOk("租借了2小时的 #r#z"+yz[chance]+"##k 椅子");
				im.getMap().startMapEffect("恭喜玩家 " + im.getChar().getName() + " 租借了椅子 " + ii.getName(yz[chance]) + "。", 5120008);
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里租借了椅子 " + ii.getName(yz[chance]) + " 。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经租借过，请明日租借。\r\n2). 背包位置不够");
				im.dispose();
            }
            break;
		case 10:
           if (im.getRMB() >= 2000000) { //会员等级
				im.dispose();
				im.openNpc(9900003, 25);
            } else {
                im.sendOk("失败：\r\n\r\n#r 检测到您当前为体验版。体验版无法进入，开通包月即可享有每天进入3次额外寻宝特权。");
				im.dispose();
            }
            break;
		case 6:
           if (im.getPlayer().getCSPoints(1) > 1000) { //自选发型
				//im.gainNX(-10000);
				im.dispose();
				im.openNpc(9900001, 10);
            } else {
                im.sendOk("点卷不足1000，你瞧啥。");
				im.dispose();
            }
            break;
		case 3:
           if (im.getMeso() > 10000) { //换取戒指
				im.dispose();
				im.openNpc(9310382, 11);
            } else {
                im.sendOk("金币不足1万。");
				im.dispose();
            }
            break;
			case 33:
			if (im.getMeso() >= 2000000) {
				im.sendGetText("消耗200万游戏币，请输入您要说的话：");
				typed = 33;
			} else {
				im.sendOk("您没有200万游戏币，不能进行世界喊话。");
				im.dispose();
			}
			break;
        }
    } else if (status == 2) {
		if (typed == 33) {
			im.worldSpouseMessage(0x01, "[屌丝喊话]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x02, "[屌丝喊话]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x03, "[屌丝喊话]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.gainMeso(-2000000);
		
		}
		im.dispose();
        }
    }

