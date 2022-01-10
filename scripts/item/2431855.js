var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";


var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var RMB = 0;
var PayLogPoints = 0;

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
    if (im.getMapId() == 180000001) {
            im.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            im.dispose();
        } 
    else if (status == 0) {
		var time = im.getPlayer().getTodayOnlineTime();
		RMB = im.getRMB();
		var selStr = "#r[●ω●提示]： #e#b新手福利指导：#k#n\r\n";
		selStr += "#d您今天在线时长为： #r" + time + "#k #d分钟  累计充值金额： #r" + RMB + "#b 元#k\r\n";
		selStr += "#b可用余额为： #r"+ im.getHyPay(1) +"#b 元  #b目前点卷： #r" + im.getPlayer().getCSPoints(1) + "#k #b点\r\n";
		selStr += "#b目前抵用卷：#r" + im.getPlayer().getCSPoints(2) + "#k #b点 当前云朵：#r"+im.getPlayerPoints()+"#k #b点\r\n\r\n";
		selStr += "#b#L0#"+ttt6+" 1). 【抵用卷买高级装备】#l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). 【Red币购买消耗卷轴】#l\r\n";
		selStr += "#d#L2#"+ttt6+" 3). 【征服者币购买高级装备】#l\r\n";
		selStr += "#b#L4#"+ttt6+" 4). 【云朵购买稀有道具商店】#l\r\n";
		selStr += "#r#L3#"+ttt6+" 5). 【投资理财VIP大量回报】#l\r\n";
		selStr += "#d#L6#"+ttt6+" 6). 【新手玩家各等级奖励】#l\r\n";
		selStr += "#b#L5#"+ttt6+" 7). 【查看新手说明书】#l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
		im.dispose();
		im.openNpc(9900003, 16);
		break;
	case 1:
		im.dispose();
		//im.openShop(20000);
		im.openNpc(9900003, 40);
		break; 
	case 2:;
		im.dispose();
		im.openNpc(9900003, 21);
		break; 
        case 3:
		im.dispose();
		im.openNpc(9900003, 17);
		break;
        case 4:
		im.dispose();
		im.openNpc(9310144, 26);
		break; 
        case 5:
		im.dispose();
		im.openNpc(9310060, 2433242);
		break;
        case 6:
		im.dispose();
		im.openNpc(9900003, 33);
		break;
        case 7:
	if (im.getBossLog("200级奖励") < 1 && im.getLevel() > 199) {
		im.gainItem(5062000, 10);
		im.gainItem(5062002, 10);
		im.gainItem(5062010, 5);
		im.setBossLog("200级奖励");
		im.sendOk("- #e#d成功领取 200 级的等级奖励：#n#k\r\n\r\n#r#i5062000# #z5062000# x 10\r\n#i5062010# #z5062010# x 5\r\n#i5062002# #z5062002# x 10");
		im.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ im.getChar().getName() +" 从写给我的信处领取了每日 200 级的等级奖励。");
		im.dispose();
	} else {
		im.sendOk("失败：\r\n\r\n#r1). 您已经领取过。\r\n2). 等级不足200,无法领取。\r\n\r\n#i5062000# #z5062000# x 10\r\n#i5062010# #z5062010# x 5\r\n#i5062002# #z5062002# x 10");
		im.dispose();
            }
		break;
        case 8:
		im.sendOk("- #e#dGm指导您如何经济来源：#n#k\r\n\r\n#b不愿意花钱。点卷的来源先就打怪捡取一些神秘之冰，和恭喜发财4个字符,字符拿去换金币。神秘之冰开魔方和征服者币,因为你100级的等级奖励有一套105的革命装备,可以用好久了,金币可以到普通服务员处兑换点卷。另外怪物会掉落抵用卷商品卡，打死怪物也有1点抵用卷，抵用卷可以购买高级装备。神秘之冰开出来的星星，可以进行星之力强化，必须要把装备的可升级次数用完才可以强化上星。");
		im.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ im.getChar().getName() +" 从写给我的信查看了Gm指导如何经济来源。");
		im.dispose();
		break;
        case 9:
		im.setBossLog("新手6");
		im.sendOk("- #e#d高级装备的来源：#n#k\r\n\r\n#b  游戏设置高级BOSS直接掉落，也可以使用 #r征服者币、麦格拉斯币、贝勒德币#b 兑换，世界怪物打死后均可获得抵用卷，还能掉落抵用卷商品卷，可以使用抵用卷购买，也可以是使用点卷购买，不过需要当天充值100块。也可以使用幸运转盘和明星转盘来抽取。或者充值赠送的也有。150的武器也可以通过材料来制作。也可以通过每日签到积分兑换\r\n140装备来源：征服者币兑换，幸运抽奖，希纳斯女皇，北仑\r\n皮埃尔，血腥女王掉落。\r\n");
		im.dispose();
		break;
        case 10:
		im.setBossLog("新手7");
		im.sendOk("- #e#d法弗纳武器材料出处：#n#k\r\n\r\n#b1). 强烈的灵魂净水，时间之石，纯洁的灵魂火花， 这3个扎昆，女皇，PB，黑龙等掉落。\r\n2). 僵尸丢弃的金牙这个打矿洞僵尸掉落\r\n3). 战甲吹泡泡鱼内存卡这个打玩具塔4层影藏塔掉落\r\n4). 斗神证物，扎昆，黑龙均有掉落\r\n5). 梦之石这个需要打PB掉落\r\n6). 正义火种这个打希纳斯女皇掉落\r\n7). 运动会币这个做米纳尔森林保卫战通关奖励.\r\n");
		im.dispose();
		break;
        case 11:
		im.setBossLog("新手8");
		im.sendOk("- #e#d点卷的来源：#n#k\r\n#b1). 通过每小时30分时候挤奶获得。\r\n2). 通过每小时50分答题获得。\r\n3). 通过在市场泡点获得。\r\n4). 通过金币兑换获得或通过充值获得。\r\n- #e#d抵用卷的来源：#n#k\r\n#b1). 通过打怪以及怪物掉落抵用卷商品卡获得。\r\n2). 通过每小时50分答题获得。\r\n3). 通过市场泡点以及寻宝里面获得。\r\n- #e#d冒险币的来源：#n#k\r\n#b1). 通过怪物掉落获得。\r\n2). 通过副本#r(天空庭院)#b获得。\r\n3). 通过玩家之间交易盈利。");
		im.dispose();
		break;









}
    }
}
