var status = -1;

var onlineTime = Array(720, 1200); //填写时间，单位:分钟,即180分钟和480分钟可以领取一次
var mPoints = Array(10000, 10000);  //填写抵用卷，用逗号分隔，对应上面的分钟数
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
		var text = "#d这里在线赠送点卷服务，您能满足以下时间就领，不能满足则不领，不要说什么时间太长了，1人民币等于1000点卷。挂机一天可获得20元点卷，如果您觉得会浪费您的电费，那么不勉强，您可以选择充值获得或者其他渠道获得，请不要找Gm说什么时间长、挂不了之类的话。\r\n#r(此活动为限时活动,活动到期后会关闭该功能)#k\r\n";
		for(var key in onlineTime) {
			text +="#L"+key+"#"+icon+" #b在线 #r"+onlineTime[key]+" #b分钟领取 #r"+mPoints[key]+" #b点卷#l\r\n";
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
				cm.getPlayer().dropMessage(1, "成功领取了 "+points+" 点券");
				cm.worldSpouseMessage(0x23, "『福利点卷』 : 玩家 "+cm.getPlayer().getName()+" 领取了 "+needTime+"分钟 "+points+" 点卷奖励。");
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