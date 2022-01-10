function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('需要160级才能领取奖励。');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("向高地跳跳")<=0)
	{
		cm.gainItem(4310129, 5);
		cm.gainItem(4001839, 100);
		cm.gainNX(1000);
		cm.sendOk("恭喜你获得了5个#v4310129##b#t4310129##k，100个#v4001839##b#t4001839##k以及#r1000#k点卷");
		cm.setBossLog("向高地跳跳");
		cm.dispose();
	} else {
		cm.sendOk("你今天已经领取过奖励了哦~每天只有一次领奖机会，可不要太贪心呢！");
		cm.dispose();
	}
}

