
var status = -1;
var text;
var sel;
var time;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

// 每个礼包所需的在线时长
var condition = new Array(30, 60, 120, 240, 360, 420, 540, 620, 720);
var reward = new Array(// 礼包编号、道具id、数量

//礼包0
Array(1, 4310036, 5),//征服者币
Array(1, 4001839, 30),
Array(1, 5062009, 5),
Array(1, 5062500, 5),
Array(1, 2049135, 1),//

	// 礼包2
        Array(2, 2340000, 1),//祝福卷
	Array(2, 2049135, 1),//
        Array(2, 4001713, 1),
        Array(2, 4001839, 50),
        Array(2, 5062009, 10),//超级神奇魔方
	Array(2, 5062500, 5),//大师附加魔方
	Array(2, 4310036, 10),//征服者币
        Array(2, 2450020, 1),

        // 礼包3
        Array(3, 5062500, 10),//大师附加魔方
        Array(3, 5062009, 20),//超级神奇魔方
	Array(3, 4310036, 30),//征服者币
	Array(3, 5030009, 1),//商店1天卡
        Array(3, 2340000, 1),//祝福卷
	Array(3, 2049135, 1),//
        Array(3, 4001713, 2),
        Array(3, 4001839, 100),
        Array(3, 2450020, 1),



        // 礼包4
	Array(4, 2049135, 1),//
	Array(4, 4310036, 40),//征服者币
        Array(4, 5062500, 10),//大师附加魔方
        Array(4, 5062009, 30),//超级神奇魔方
        Array(4, 4001839, 200),
        Array(4, 5064000, 2),
        Array(4, 2340000, 1),//祝福卷
	Array(4, 2049135, 1),


        // 礼包5
	Array(5, 2049135, 2),//
	Array(5, 4310036, 50),//征服者币
        Array(5, 5062009, 40),//超级神奇魔方
        Array(5, 5062500, 10),//大师附加魔方
        Array(5, 5064000, 1),
	Array(5, 2340000, 1),
        Array(5, 4001839, 300),//星星
        Array(5, 2049135, 2),
	//Array(4, 4310196, 1),
       // Array(5, 4001833, 1),

        // 礼包6
	Array(6, 2049135, 2),//
	Array(6, 4310036, 60),//征服者币
        Array(6, 5062009, 50),//超级神奇魔方
        Array(6, 5062500, 10),//大师附加魔方
        Array(6, 5064000, 2),
	Array(6, 2340000, 1),
        Array(6, 4001839, 300),
       // Array(5, 4001006, 1),

        // 礼包7
	Array(7, 4310036, 70),//征服者币
        Array(7, 5062009, 100),//超级神奇魔方
        Array(7, 5062500, 20),//大师附加魔方
        Array(7, 2049124, 1),//正向混沌卷轴
        Array(7, 2049135, 3),
        Array(7, 2340000, 1),
        Array(7, 4001839, 300),
	Array(7, 5064000, 1),

        // 礼包8
        Array(8, 4310196, 3),
	Array(8, 2049135, 5),//
	Array(8, 4310036, 80),//征服者币
        Array(8, 5062009, 100),//超级神奇魔方
        Array(8, 5062500, 30),//大师附加魔方
        Array(8, 5064000, 4),
        Array(8, 2340000, 3),
        Array(8, 2049700, 2),//A级潜能卷轴
        Array(8, 2049124, 1),//正向混沌卷轴

        Array(8, 4001839, 300),//星星
	//Array(7, 4001006, 1),
        //Array(8, 4000463, 1),

        // 礼包9
        Array(9, 4310196, 5),
	Array(9, 2049135, 5),//
	Array(9, 4310036, 90),//征服者币
        Array(9, 5062009, 150),//超级神奇魔方
        Array(9, 5062500, 50),//大师附加魔方
        //Array(9, 4000463, 2),//国庆纪念币
        Array(9, 5064000, 1),
        Array(9, 2340000, 5),
	Array(9, 4001839, 300),
        Array(9, 2049124, 3),
        Array(9, 4001785, 2),

        // 礼包10

	Array(10, 4310036, 100),//征服者币
       // Array(10, 2049752, 1),//S级潜能卷轴 30%
        Array(10, 2049135, 5),//惊人正义混沌卷轴 20%
       // Array(10, 4001833, 1),
	//Array(10, 4001485, 1),
        Array(10, 5062009, 200),//超级神奇魔方
        Array(10, 5062500, 100),//大师附加魔方
        //Array(10, 4000463, 3),
        Array(10, 4310196, 5),
	//Array(10, 4001839, 1),
        Array(10, 4001839, 300),
        Array(10, 4001785, 2)
        );

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0)
	{
		cm.dispose();
		return;
	}
	if (mode == 1)
	{
		status++;
	} else {
		status--;
	}

	var time = cm.getPlayer().getTodayOnlineTime();
	var curlevel = -1;

	if (status == 0) {
		text = "#e#d您今天在#r本世界#d时长为： #r" + time + "#k #d分钟#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b时无法领取在线奖励。#k\r\n#b请在 #e#r23：50#n#b 分前领取当天未领取的奖励。以免造成损失。#k\r\n#r您每天在线时间越多，领取的奖励越多哦\r\n\r\n";
		for (var i = 1; i <= condition.length; i++) {
			text += "#b#L" + i + "#"+aaa+" 领取在线" + condition[i-1] + "分钟奖励";
			if (cm.getBossLog("在线礼包" + i) > 0) {
				text += "(已领取)";
				curlevel = curlevel == -1 ? i : curlevel;
			}
			text += "#l\r\n";
		}
		text += "#k";
		cm.sendSimple(text);
	} else if (status == 1) {
		// 23:50 ~ 23: 59 前一天不领取的时间  00:00 ~ 00:10 第二天不领取的时间  
		if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
			cm.sendOk("#d服务器当前时间： #r" + hour +" 时 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b时无法领取在线奖励。#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("在线礼包" + selection) > 0) {
			cm.sendOk("这个礼包您已经领取过了");
			cm.dispose();
			return;
		}
		sel = selection;
		text = "\t\t\t\t#e#r- 在线 " + condition[selection - 1] + " 分钟奖励 -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "个]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk("在线时间不足，无法领取。");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				rewardlist.push(new Array(reward[i][1], reward[i][2]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk("包裹空间不足，请确保包裹每个栏位有至少 " + rewardlist.length + " 格空间");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
		}
		cm.setBossLog("在线礼包" + sel);
		cm.playerMessage(1, "领取成功！");
		cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x03, cm.getC().getChannel(), "『在线时间奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了在线 " + condition[sel-1] + " 分钟奖励。"));
		if (sel == 5) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.setBossLogAcc("登陆", -2);
		} else if (sel == 7) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}