var status = 0;
var bossid = "点卷礼包";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE); //获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE); //获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
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
		var text = "";
		if ((month==8 || month==8) && (day == 1 || (day >=14 && day <=20))) {
			//text += "7月31日至8月6日之间，每天可以在此处领取一定的奖励。\r\n";
			text += "8月14日至8月20日之间，每天可以在此处根据在线时间领取点卷和抵用券奖励。\r\n";
			text+="#b#L1#领取180分钟奖励【2000抵用卷】#l\r\n";
			text+="#b#L2#领取360分钟奖励【5000抵用券】#l\r\n";
			text+="#b#L3#领取600分钟奖励【10000抵用卷】#l\r\n";
			text+="#b#L4#领取720分钟奖励【10000点券和10000抵用卷】#l\r\n";
			cm.sendSimple(text);
		} else {
			cm.sendOk("活动已经结束或者活动未开启，请查看活动开启与结束时间");
			cm.dispose();
		}
	} else if (status == 1) {
		typed = selection;
		cm.sendYesNo("是否现在就领取点卷奖励，每个账号只能领取一次，并且角色等级需要大于等于150级。");
	} else if (status == 2) {
		var points = 0;
		var nxpoints = 0;
		var needtime = 0;
		var level = 150;
		if (typed==1) {
			points = 0;
			nxpoints = 2000;
			needtime = 180;
		} else if (typed==2){
			points = 0;
			nxpoints = 5000;
			needtime = 300;
		} else if (typed==3){
			points = 0;
			nxpoints = 10000;
			needtime = 600;
		} else if (typed==4){
			points = 10000;
			nxpoints = 10000;
			needtime = 720;
		}
		if (cm.getPlayer().getTodayOnlineTime()>=needtime) {
			if (cm.getBossLogAcc(bossid+typed)==0) {
				cm.setBossLogAcc(bossid+typed);
				cm.gainNX(1, points);
				cm.gainNX(2, nxpoints);
				//cm.gainRMB(200);
				cm.sendOk("领取成功！");
				//cm.channelMessage(0x20, "『点卷礼包』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了在线 " + condition[sel-1] + " 分钟的点卷礼包奖励。");
				cm.dispose(); 
			} else {
				cm.sendOk("领取失败，您今日已经领取过了");
				cm.dispose();
			}
		} else {
			cm.sendOk("您的在线时间不足"+needtime+"分钟！");
			cm.dispose();
		}
	}
}