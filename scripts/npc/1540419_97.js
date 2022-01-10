
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
        var selStr = "\r\n#e#d您好，本服新增特色副本系列,更多请期待添加..#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        //selStr += "#L10#" + ttt6 + " #r11.#e#b 阿里安特竞技场(New~)#l#n\r\n";
		selStr += "\t\t#r" + tz + " 推荐副本：新手必做 " + tz + "\r\n";
		selStr += "#L11#" + tz1 + " #b消灭小日本  ==#g（高经验，征服币来源）#l\r\n";
		selStr += "#L16#" + tz1 + " #b#b金猪保卫战  ==#g [点卷、抵用]#l\r\n";
		//selStr += "#L3#" + tz1 + " #b天空庭院  ==#g（大量金币）#l\r\n";
        	selStr += "#L9#" + tz1 + " #b拥抱罗玉凤  ==#g (蓝调，魔方，卷)#l\r\n";
		//selStr += "#L22#" + tz1 + " #b消灭蚊子  ==#g (星岩石宝箱,抵用卷)#l\r\n";

		selStr += "\r\n\t\t#r" + tz + " 特色副本：多人组队 " + tz + "\r\n";

		//selStr += "#L24#" + tz1 + " #b家族任务  ==#g（家族活动）#l\r\n";
		selStr += "#L14#" + tz1 + " #b神秘希拉之塔  ==#g（神话耳环，140装备）\r\n";
		selStr += "#L0#" + tz1 + " #b森林BOSS战  ==#g（运动会币，卷轴，椅子，160武器）#l\r\n";
		selStr += "#L15#" + tz1 + " #b武陵新道场  == #g(金币与经验)#l\r\n";
		selStr += "#L17#" + tz1 + " #b强大森兰丸  ==#g（怪物币兑换道具）\r\n";
        	selStr += "#L5#" + tz1 + " #b黄金寺院  ==#g(140道具)#l\r\n";
		//selStr += "#L8#" + tz1 + " #b无限火力挑战==#g（每10关奖励高级魔方）#l\r\n";
        	selStr += "#L6#" + tz1 + " #b火力测试  ==#g (小试牛刀，魔方)#l\r\n";
		selStr += "#L1#" + tz1 + " #b飞机大战  ==#g（装备，魔方，卷轴）#l\r\n";
        	selStr += "#L7#" + tz1 + " #b废墟民居  ==#g (椅子，装备，卷)#l\r\n";

		selStr += "\r\n\t#r" + tz + " 高级副本：需要200W面板#b(暂未开放) " + tz + "\r\n\r\n";


		//selStr += "#L21#" + tz1 + " #b超强斯乌组队副本 #g(160布莱斯#k#l\r\n\r\n";//#i1402251:#



		//selStr += "#e#r高级副本#n#k  推荐面板：50万以上\r\n";


		//selStr += "#L18#" + ttt6 + " #g[火]#n#r 挑战克劳德 #g #i2431938:##k#i2430051:##k#l\r\n\r\n";
		//selStr += "#L4#" + ttt6 + " #b 挑战英语村的大卫先生吧（换稀有道具）#l\r\n";
		//selStr += "#L12#" + ttt6 + " #b 废弃都市组队副本（奖励抽奖包、大量道具）#l\r\n";
		//selStr += "#L13#" + ttt6 + " #b 扫荡秦皇陵组队副本（奖励高级魔方）#l\r\n";
		//selStr += "#L2#" + tz1 + " #b 被困在城里的冒险家（奖励1000点卷）#l\r\n";


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
            case 11:
                cm.dispose();
                cm.warp(746000016, 0);
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
            case 13:
                if (cm.getEventCount("皇陵") < 1) {
		cm.dispose();
		cm.openNpc(9330231);
		}else{
		cm.sendOk("今天该帐号已经完成[组队]扫荡秦皇陵。");
		cm.dispose();
		}
                break;


        }
    }
}