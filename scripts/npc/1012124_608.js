
var status = -1;
var text;
var sel;
var time;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

// 每个礼包所需的在线时长
var condition = new Array(60, 180, 300, 550, 660, 720);
var spoints = new Array(0,0,2,3,5,5,5,10);
var reward = new Array(// 礼包编号、道具id、数量
					// 礼包1
					Array(1, 2000005, 300),  //超级药水
					Array(1, 5130002, 1, 30 * 1000 * 60),  //强效护身符
					Array(1, 5072000, 5, 1),  //喇叭5个
					Array(1, 2450020, 2),  //经验值1.5倍
					Array(1, 5062000, 3),  //神奇魔方
					Array(1, 5062002, 3),  //高级神奇魔方
					Array(1, 5076000, 5, 1), //道具喇叭
                    

					// 礼包2
					Array(2, 5062000, 5),//神奇魔方
					Array(2, 5062002, 5),//高级神奇魔方
					Array(2, 5062500, 2),//大师附加神奇魔方
					Array(2, 4001713, 5), //定居金10W
					Array(2, 4310036, 10), //运动会币
					
					// 礼包3
					Array(3, 5062000, 5),//神奇魔方
					Array(3, 5062002, 5),//高级神奇魔方
					Array(3, 5062500, 2), //大师附加神奇魔方
					Array(3, 2340000, 1),//祝福卷轴
					Array(3, 2049124, 1),  //正向混沌卷轴
					Array(3, 4310036, 10), //运动会币
					Array(3, 2213045, 1),  //小班·雷昂变身药水
					
					// 礼包4 
					Array(4, 5062000, 5),//神奇魔方
					Array(4, 5062002, 5),//高级神奇魔方
					Array(4, 4310036, 30), //征服者币
					Array(4, 5062500, 3),//大师附加神奇魔方
					Array(4, 2340000, 1),//祝福卷轴
					Array(4, 2049124, 5), //正向混沌卷轴
					Array(4, 2213046, 1),//小阿卡伊勒变身药水
					
				
					//礼包5
					Array(5, 5062000, 20),//神奇魔方
					Array(5, 5062002, 10),//高级神奇魔方
				    Array(5, 2049135, 1), // 惊人正向混沌20%
					Array(5, 5062500, 10),//大师附加神奇魔方
                    Array(5, 2340000, 1),//祝福卷轴
					Array(5, 4310030, 50),// 运动币
					Array(5, 4310036, 50),//征服币
					Array(5, 2213047, 1), //小希纳斯变身药水
					Array(5, 5064000, 3),  //防爆卷轴
					Array(5, 4001839, 80), //星星
					Array(5, 4001785, 3), //定居金500万金币
					Array(5, 2431741, 1), //抵用券3000
					Array(5, 2049124, 2), //正向混沌卷轴
					//Array(5, 4310110, 1), //春节纪念币

					//礼包6 
					Array(6, 4001839, 200), //星星
					Array(6, 4033356, 1), //正义火种1
					Array(6, 4310110, 2), //春节纪念币
                    Array(6, 5062000, 35),//神奇魔方
					Array(6, 5062002, 25),//高级神奇魔方
                    Array(6, 2049116, 1),//强化混沌卷
				    Array(6, 2049135, 10), // 惊人正向混沌20%
                    Array(6, 2049137, 1), // 惊人正向混沌40%
                    Array(6, 2340000, 3),//祝福卷轴
					Array(6, 5062500, 20),//大师附加神奇魔方
					Array(6, 5062009, 10),//超级神奇魔方
                    Array(6, 2000005, 200),  //超级药水
					Array(6, 2049752, 3), //S级潜能卷轴 30%
					Array(6, 1190300, 1), //白银枫叶徽章
					Array(6, 2431741, 8), //抵用券3000
					Array(6, 2003517, 5),  //高级巨人秘药
					Array(6, 4000463, 1),  //国庆纪念币
					Array(6, 4001785, 5), //定居金500万金币
					Array(6, 5064000, 3)  //防爆卷轴
					//Array(6, 4310030, 100),// 运动币
					//Array(6, 4310036, 100)//征服币
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
		text = head + "#e#d您今天在芒果冒险岛世界时长为： #r" + time + "#k #d分钟#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b时无法领取在线奖励。#k\r\n#b请在 #e#r23：50#n#b 分前领取当天未领取的奖励。以免造成损失。#k#r#z4000463#可以兑换元宝,一元宝等于一元人民币#k\r\n\r\n";
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
			cm.sendOk(head + "#d服务器当前时间： #r" + hour +" 时 " + minute + " 分 " + second + " 秒#k\r\n\r\n#e#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b时无法领取在线奖励。#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("在线礼包" + selection) > 0) {
			cm.sendOk(head + "这个礼包您已经领取过了");
			cm.dispose();
			return;
		}
		sel = selection;
		text = head + "#e#r- 在线 " + condition[selection - 1] + " 分钟奖励 -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "#i" + reward[i][1] + "##b #z" + reward[i][1] + "#[" + reward[i][2] + "个]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk(head + "在线时间不足，无法领取。");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				if (reward[i][3] == null || reward[i][3] == '')
					reward[i][3]=0;
				rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk(head + "包裹空间不足，请确保包裹每个栏位有至少 " + rewardlist.length + " 格空间");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			if (rewardlist[i][2] != 0) {
				//有期限道具
				cm.gainItemPeriod(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
				//java.lang.System.out.println("有");
			} else {
				//无期限道具
				cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
			}
		}
		cm.setBossLog("在线礼包" + sel);
		cm.playerMessage(1, "领取成功！");
		cm.channelMessage(0x18, "『在线时间奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了在线 " + condition[sel-1] + " 分钟奖励。");
		if (sel == 5) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}