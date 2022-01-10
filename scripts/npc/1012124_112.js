var status = -1;

var onlineTime = Array(10,60,120,240,360,480,640,720,840,1000); //填写时间，单位:分钟,即180分钟和480分钟可以领取一次
var mPoints = Array(100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000);  //填写抵用卷，用逗号分隔，对应上面的分钟数
var icon ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = "你好，欢迎来到点券领取中心，如果你满足条件，就可以领取以下点卷奖励。#r（此活动维持5天）#k\r\n";
		for(var key in onlineTime) {
			text +="#L"+key+"#"+icon+" #b在线 #r"+onlineTime[key]+" #b分钟领取 #r"+mPoints[key]+" #b 点卷#l\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1){
		var sel = selection;
		var needTime = onlineTime[sel];
		var points = mPoints[sel];
		if (cm.getBossLog("在线点卷"+sel) == 0) {
			if (cm.getPlayer().getTodayOnlineTime() >= needTime) {
				cm.gainNX(1, points);
				cm.setBossLog("在线点卷"+sel);
				cm.getPlayer().dropMessage(1, "成功领取了"+points+"点卷");
				cm.worldSpouseMessage(0x23, "『在线点卷』 : 玩家 "+cm.getPlayer().getName()+" 领取了 "+needTime+"分钟 "+points+" 点卷奖励。");
			} else {
				var lastTime = cm.getPlayer().getTodayOnlineTime() - needTime;
				cm.sendOk("您的在线时间不足"+needTime+"分钟，还需要#r"+lastTime+"#k分钟。");
			}
		} else {
			cm.sendOk("您已经领取过了该奖励，无法重复领取。");
		}
		cm.dispose();
	}
}