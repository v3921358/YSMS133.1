var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var PayLogPoints = 0;
var RMB = 0
var yz = new Array(3010947,3010948,3015006,3015010,3010837,3010837,3010838,3010854,3010815,3010804,3010696);
var chance = Math.floor(Math.random()*yz.length);


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
		var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r随身npc#k#n\r\n";
		selStr += "#d欢迎使用随身特权,本次给您带来快捷服务：#k\r\n";
		selStr += "#r#L0#"+z+" 每日工资#l  #L1#"+z+" 免费点卷#l  #L2#"+z+" 增加血量#l\r\n";
		selStr += "#L12#"+z+" 点卷商店#l  #L6#"+z+" 自选发型#l  #L10#"+z+" 每日寻宝#l\r\n";
		selStr += "#L7#"+z+" 三倍经验#l  #L8#"+z+" 领取双爆#l  #L9#"+z+" 每日魔方#l\r\n";
		//selStr += "#L3#"+z+" 换取戒指#l  #L5#"+z+" 领兑换币#l  #L11#"+z+" 租借椅子#l\r\n";
		//selStr += "#L4#"+z+" BOSS重置#l  #L14#"+z+" 副本重置#l  #L13#"+z+" 高级回收#l\r\n";
		//selStr += "#L15#"+z+" 普通理财功能#l  #L16#"+z+" 高级理财功能#l\r\n";
		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 12:
		cm.dispose();
		cm.openNpc(9900003, 10);
		break;
	case 4:
		cm.dispose();
		cm.openNpc(9900004, 4);
		break;
	case 14:
		cm.dispose();
		cm.openNpc(9900004, 5);
		break;
	case 13:
		cm.dispose();
		cm.openNpc(9010060, 2);
		break;
	case 15:
	 if (cm.getBossLog("理财十天") > 1) { //工资
		cm.dispose();
		cm.openNpc(9010060, 3);
		} else {
                cm.sendOk("失败：\r\n\r\n#r1). 您是高级理财，请试用高级理财服务。");
				cm.dispose();
            }
            break;
	case 16:
	 if (cm.getBossLog("月制度理财") > 1) { //工资
		cm.dispose();
		cm.openNpc(9010060, 4);
		} else {
                cm.sendOk("失败：\r\n\r\n#r1). 您是普通理财，请试用普通理财服务。");
				cm.dispose();
            }
            break;
        case 0:
           if (cm.getBossLog("工资") < 1) { //工资
            	cm.gainMeso(30000000);
				cm.setBossLog("工资");
				cm.sendOk("恭喜您领取VIP服务的每日工资3000万金币.");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里领取每日金币。");
				cm.dispose();
            } else {
                cm.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 体验版无法领取。");
				cm.dispose();
            }
            break;
        case 1:
           if (cm.getBossLog("点卷") < 1) { //点卷
            	cm.gainNX(10000);
				cm.setBossLog("点卷");
				cm.sendOk("恭喜您领取点卷10000点.");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里免费领取每日 1 万点卷。");
				cm.dispose();
            } else {
                cm.sendOk("失败：\r\n\r\n#r1). 您已经使用，请明日再试。\r\n2). 体验版无法领取。");
				cm.dispose();
            }
            break;
        case 2:
           if (cm.getPlayer().getCSPoints(1) > 100) { //会员等级
				cm.dispose();
				cm.openNpc(9900001,9);
            } else {
                cm.sendOk("您糊弄我呢。点卷不足还点什么。最少得拥有100点卷才可以使用。");
				cm.dispose();
            }
            break;
		case 7:
           if (cm.getBossLog("三倍") < 1) { //三倍
            	cm.gainItem(5211060,1,1);
				cm.setBossLog("三倍");
				cm.sendOk("恭喜您领取VIP服务的每日三倍经验卡一张.");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里领取每日三倍经验卡。");
				cm.dispose();
            } else {
                cm.sendOk("您已经领取过，请明日再领。");
				cm.dispose();
            }
            break;
		case 8:
           if (cm.getBossLog("双爆") < 1) { //双爆
            	cm.gainItem(5360015,1,1);
				cm.setBossLog("双爆");
				cm.sendOk("恭喜您领取VIP服务的每日双倍爆率卡一张.");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里领取每日双倍爆率卡。");
				cm.dispose();
            } else {
                cm.sendOk("您已经领取过，请明日再领。");
				cm.dispose();
            }
            break;
		case 9:
           if (cm.getBossLog("魔方") < 1) { //魔方
            			cm.gainItem(5064010,10);
				cm.gainItem(2340000,10);
				cm.gainItem(5062500,10);
				cm.gainItem(5062002,10);
				cm.setBossLog("魔方");
				cm.sendOk("恭喜您领取理财服务的每日理财道具，获得终级神奇魔方、高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴x10。");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里领取每日理财道具。");
				cm.dispose();
            } else {
                cm.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 体验版无法领取。");
				cm.dispose();
            }
            break;
		case 5:
           if (cm.getBossLog("领币") < 1 && cm.getSpace(4) >= 3) { //领币
            	cm.gainItem(4310108,100);
		cm.gainItem(4310036,100);
		cm.gainItem(4033943,30);
		cm.gainItem(4001006,20);
				cm.setBossLog("领币");
				cm.sendOk("恭喜您领取VIP服务的每日领取兑换币\r\n\r\n#i4310108# x 100  #i4310036# x 100  #i4033943# x 30  #i4001006# x 20.");
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里领取兑换币。");
				cm.dispose();
            } else {
                cm.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 背包位置不够");
				cm.dispose();
            }
            break;
		case 11:
		var ii = cm.getItemInfo();
           if (cm.getBossLog("租借") < 1 && cm.getSpace(3) >= 1) { //租借
				cm.setBossLog("租借");
				cm.gainItem(yz[chance], 1, 2 * 60 * 60 * 1000);
				cm.sendOk("租借了2小时的 #r#z"+yz[chance]+"##k 椅子");
				cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 租借了椅子 " + ii.getName(yz[chance]) + "。", 5120008);
				cm.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ cm.getChar().getName() +" 在随身NPC里租借了椅子 " + ii.getName(yz[chance]) + " 。");
				cm.dispose();
            } else {
                cm.sendOk("失败：\r\n\r\n#r1). 您已经租借过，请明日租借。\r\n2). 背包位置不够");
				cm.dispose();
            }
            break;
		case 10:
           if (cm.getRMB() >= 260) { //会员等级
				cm.dispose();
				cm.openNpc(9900003, 25);
            } else {
                cm.sendOk("失败：\r\n\r\n#r 检测到您当前为体验版。体验版无法进入，开通包月即可享有每天进入3次额外寻宝特权。");
				cm.dispose();
            }
            break;
		case 6:
           if (cm.getPlayer().getCSPoints(1) > 1000) { //自选发型
				//cm.gainNX(-10000);
				cm.dispose();
				cm.openNpc(9900001, 10);
            } else {
                cm.sendOk("点卷不足1000，你瞧啥。");
				cm.dispose();
            }
            break;
		case 3:
           if (cm.getMeso() > 10000) { //换取戒指
				cm.dispose();
				cm.openNpc(9010060, 1);
            } else {
                cm.sendOk("金币不足1万。");
				cm.dispose();
            }
            break;
        }
    }
}
