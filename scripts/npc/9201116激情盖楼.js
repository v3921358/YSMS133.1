status = -1;
var event;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
	event = cm.getEventManager("Gailou"); //获取活动脚本的名称 test 对应 event 目录里面的 gailou.js 文件
	if (status == 0) {
		if (event == null) {
			cm.sendOk(head + "活动脚本错误...请联系管理员修复！或重新打开。");
			cm.dispose();
		} else if (cm.getPlayer().getClient().getChannel() != 1) {
			cm.sendOk(head + "活动只能在1频道进行！亲！");
			cm.dispose();
		} else if (event != null && event.getProperty("state").equals("true")) {
			cm.sendYesNo(head + "亲爱的#r#h ##k您好，我是盖楼活动员，本次活动时间为10分钟.\r\n活动分一等奖，二等奖.三等奖\r\n一等奖：第一个到达建楼高度的玩家获得一等奖奖励1万抵用卷。\r\n二等奖：一等奖之后后续补楼的15个玩家为二等奖\r\n三等奖：为结束活动奖励只限1人随机获得 0 - 20000抵用卷\r\n那就看你运气啦 开始吧？");
		} else {
			cm.sendOk(head + "活动还未开启或者活动已经结束\r\n激情盖楼 [#r10倍普通盖楼的奖励#k] \r\n将于20点50分开启, 活动结束后奖励会立即发放\r\n请关注我们盖楼活动，多多参加。\r\n活动分一等奖，二等奖和三等奖.\r\n一等奖：第一个到达建楼高度的玩家获得一等奖10万抵用卷。\r\n二等奖：一等奖之后后续补楼的10个玩家为二等奖1-5万抵用卷随机\r\n三等奖：为结束活动奖励只限1人随机获得 0 - 10000抵用卷");
			cm.dispose();
		}
	} else if (status == 1) {
		if (event != null && event.getProperty("state").equals("true")) {
			event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 1)); //设置点击次数+1
			var count = parseInt(event.getProperty("check")); //获得总点击次数
			var max = parseInt(event.getProperty("maxCheck"));
			var Cheat = event.getProperty("Message");
			var dj = rand(10000, 50000);
			var dj3 = rand(0, 10000);
			if (Cheat != null) {
				var namelist = Cheat.split(",");
				if (namelist.length != 0) {
					var times = 0;
					for (var i in namelist) {
						if (namelist[i] == cm.getName()) {
							times += 1;
						}
					}
					if (times >= 2) {
						cm.sendOk("你已经获得了两个名次...不能继续参赛了！\r\n");
						cm.dispose();
						return;
					}
				}
			}
			if (count == max) {
				cm.gainNX(2, + 10000);
				cm.gainItem(5062009, 100);
				cm.gainItem(4001839, 2000);
				cm.worldMessage("[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得一等奖,真让人羡慕");
				event.setProperty("Message", "" + cm.getName());
				event.setProperty("endEvent", "true");
				cm.sendOk(head + "[抢楼活动] 恭喜你获得了抢楼活动一等奖。");
			} else if (count > max && count <= (max + 10)) {
				cm.gainNX(2, + dj);
				cm.gainItem(5062009, 60);
				cm.gainItem(4001839, 1000);
				cm.worldMessage("[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得二等奖,真让人羡慕");
				event.setProperty("Message", "" + Cheat + "," + cm.getName());
				cm.sendOk(head + "恭喜你获得了抢楼活动二等奖。");
			} else if (count > (max + 1)) {
				cm.gainNX(2, + dj3);
				cm.gainItem(5062009, 30);
				cm.gainItem(4001839, 500);
				event.setProperty("state", "false");
				cm.worldMessage("[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得三等奖 " + dj3 + "抵用卷.本次抢楼活动已经结束...");
				event.setProperty("Message", "" + Cheat + "," + cm.getName());
				cm.sendOk(head + "恭喜你获得了抢楼活动三等奖。\r\n奖金 0 - 10000 抵用卷不等。\r\n本次抢楼活动已经结束...");
			} else {
				cm.sendOk(head + "当前楼层: " + parseInt(event.getProperty("check")) + " 楼。");
			}
		} else {
			cm.sendOk(head + "活动还未开启或者活动已经结束，所有奖励均已经发放，请下次在参加。");
		}
		cm.dispose();
	}
}

function rand(lbound, ubound) {
	return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}

function split(string) {
	for (var i = 0; i < string;) {

	}
}