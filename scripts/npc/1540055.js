function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('需要160级才能领取奖励。');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("地铁B1跳跳")<=0)
	{
		cm.gainItem(4001839, 500);
		cm.gainMeso(3000000);
		cm.gainNX(1500);
		cm.sendOk("恭喜你获得了500个#v4001839##b#t4001839##k300万金币以及#r1500#k点卷");
       cm.worldSpouseMessage(0x23, "『地铁B1跳跳奖励』 : " + cm.getChar().getName() + " 成功挑战地铁B1跳跳到达终点，领取了大量奖励，大家快来挑战吧.");

		//cm.worldSpouseMessage(0x20,"『休闲跳跳』 ：恭喜玩家 "+ im.getChar().getName() +" 地铁B1跳跳获得丰富的奖励。");
		cm.setBossLog("地铁B1跳跳");
		cm.dispose();
	} else {
		cm.sendOk("你今天已经领取过奖励了哦~每天只有一次领奖机会，可不要太贪心呢！");
		cm.dispose();
	}
}

