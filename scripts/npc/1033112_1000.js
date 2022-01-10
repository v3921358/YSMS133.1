
var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝

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
        var selStr = "\r\n#e#d您好，本服新增特色副本系列,更多请期待添加..#k#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        //selStr += "#L10#" + ttt6 + " #r11.#e#b 阿里安特竞技场(New~)#l#k#n\r\n";
		selStr += "#L11#" + ttt + " #b[单人]不忘国耻报仇雪恨  ==#k#n（升级经验）#l\r\n";
        	selStr += "#L6#" + ttt + " #b[单人]无限火力测试  ==#k#n (奖励不明)#l\r\n";
		selStr += "#L1#" + ttt + " #b[单人]飞机大战  ==#k#n（140装备）#l\r\n";
		selStr += "#L16#" + ttt + " #b[单人]金猪保卫战  ==#k#n [点卷、抵用]#l\r\n";
		selStr += "#L15#" + ttt + " #b[单人]新武林  == #k#n(经验金币)#l\r\n\r\n";
       		selStr += "#L10#" + ttt + " #b [单人]阿里安特竞技场  == #k#n(征服者币) #k#l#n\r\n";


		selStr += "#L53#" + ttt + " #b[组队]废弃都市 ==#k#n（祖母绿宝箱）#l\r\n";
		selStr += "#L54#" + ttt + " #b[组队]秦始皇陵墓 ==#k#n（奖励不明）#l\r\n";
		selStr += "#L55#" + ttt + " #b[组队]梁山伯祝英台 ==#k#n（奖励不明#l\r\n";//目前状态： "+zdlz+"
		selStr += "#L56#" + ttt + " #b[组队]抢占海盗船 ==#k#n（奖励不明#l\r\n";//目前状态： "+zdhd+"
		selStr += "#L26#" + ttt + " #b[组队]怪物公园 #l\r\n";
		//selStr +="#L12#"+ttt6+" [组队]月妙年糕院    (#k目前状态： "+zdgj+")#l\r\n";
        	selStr += "#L9#" + ttt + " #b[组队]英雄救美  ==#k#n (蓝调戒指)#l\r\n";

		//selStr += "#L3#" + ttt + " #b天空庭院  ==#k#n（大量金币）#l\r\n";

		//selStr += "#L22#" + ttt + " #b消灭蚊子  ==#k#n (星岩石宝箱,抵用卷)#l\r\n";


		//selStr += "#L24#" + ttt + " #b家族任务  ==#k#n（家族活动）#l\r\n";
		selStr += "#L14#" + ttt + " #b[组队]长生不老神话组队  ==#k#n（神话耳环，140装备）\r\n";
		selStr += "#L0#" + ttt + " #b[组队]森林保卫战  ==#k#n（卷轴,装备）#l\r\n";

		selStr += "#L17#" + ttt + " #b[组队]挑战森兰丸  ==#k#n（奖励不明）\r\n";
        	selStr += "#L5#" + ttt + " #b[组队]黄金寺院  ==#k#n(140道具)#l\r\n";
		//selStr += "#L8#" + ttt + " #b无限火力挑战==#k#n（每10关奖励高级魔方）#l\r\n";

        	selStr += "#L7#" + ttt + " #b[组队]废墟民居  ==#k#n (椅子)#l\r\n";
        	selStr += "#L27#" + ttt + " #b[组队]龙虎  #l\r\n";

		//selStr += "\r\n\t======= 高级副本 ，模式：超难 =======\r\n\r\n";


		//selStr += "#L21#" + ttt + " #b超强斯乌组队副本 #k#n(160布莱斯#k#l\r\n\r\n";//#i1402251:#



		//selStr += "#e#r高级副本#k#n#k  推荐面板：50万以上\r\n";


		//selStr += "#L18#" + ttt6 + " #k#n[火]#k#n#r 挑战克劳德 #k#n #i2431938:##k#i2430051:##k#l\r\n\r\n";
		//selStr += "#L4#" + ttt6 + " #b 挑战英语村的大卫先生吧（换稀有道具）#l\r\n";

		//selStr += "#L2#" + ttt + " #b 被困在城里的冒险家（奖励1000点卷）#l\r\n";


        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9900003, 109);
                break;
            case 1:
                cm.worldSpouseMessage(0x20, "[全民飞机大战] ：玩家 " + cm.getChar().getName() + " 进入了机场候机室。");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900003, 107);
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9900003, 101);
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9900003, 102);
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 700);
                break;
            case 8:
                cm.dispose();
                cm.openNpc(2060103);
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9120050);
                break;
            case 10:
                cm.dispose();
                cm.openNpc(2101017,1);
                break;
            case 11://小鬼子
                cm.dispose();
                cm.openNpc(9000159);
                //cm.warp(746000016, 0);
                break;
            case 12:
                cm.dispose();
                cm.openNpc(9020000);
                break;
			case 15:
				cm.dispose();
				cm.warp(925020000);
				break;
            case 14:
                cm.dispose();
                cm.warp(262030000, 0);
                break;
			case 16:
				cm.dispose();
				cm.openNpc(9300006,1);
				break;
			case 17:
				cm.dispose();
				cm.openNpc(9900003,113);
				break;
			case 21:
				cm.dispose();
				cm.openNpc(1540446);
				break;
			case 22:
				cm.dispose();
				cm.openNpc(9900005);
				break;
			case 24:
                		cm.dispose();
                		cm.openNpc(9040000);
               		        break;
			case 25://废弃组队
                		cm.dispose();
                		cm.openNpc(9020000);
               		        break;
			case 26://怪物公园
				cm.dispose();
				cm.warp(951000000);
				break;
			case 27://龙虎BOSS
                		cm.dispose();
                		cm.openNpc(9310461);
               		        break;
            case 54:
                if (cm.getEventCount("秦始皇") < 3) {
		cm.dispose();
		cm.openNpc(9330231);
		}else{
		cm.sendOk("今天该帐号已经完成[组队]秦始皇3次。");
		cm.dispose();
		}
                break;
            case 53:
                if (cm.getEventCount("废弃") < 20) {
		cm.dispose();
		cm.openNpc(9020000);
		}else{
		cm.sendOk("今天该帐号已经完成[组队]废弃20次。");
		cm.dispose();
		}
                break;

            case 55:
			if (cm.getEventCount("梁祝") < 3) {
                    	cm.dispose();
			cm.openNpc(2112003,1);
			}else{
		    	cm.sendOk("今天该帐号已经完成[组队]梁祝3次。");
		    	cm.dispose();
			}
                break;
            case 56:
			if (cm.getEventCount("海盗") < 3) {
                    	cm.dispose();
			cm.openNpc(2094000);
			}else{
		    	cm.sendOk("今天该帐号已经完成[组队]抢占海盗船3次。");
		    	cm.dispose();
			}
                break;
            case 57:
			if (cm.getEventCount("月妙") < 1) {
                    	cm.dispose();
			cm.openNpc(9000093,6);
			}else{
		    	cm.sendOk("今天该帐号已经完成[组队]月妙年糕院。");
		    	cm.dispose();
			}
		break;


        }
    }
}