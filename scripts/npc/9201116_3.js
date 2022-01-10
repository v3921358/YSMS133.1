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
		if ((month==7 || month==7) && (day == 28 || (day >=1 && day <=30))) {
			text += "7月28日至7月30日之间，每天可以在此处领取5000W点卷和200余额的奖励。\r\n";
			//text += "7月28日至7月30日之间，每天可以在此处根据在线时间领取点卷和抵用券奖励。\r\n";
			text+="#b#L1#领取测试基金【50000000点卷】和【200余额】#l\r\n";
			//text+="#b#L2#领取300分钟奖励【50000000抵用券】#l\r\n";
			//text+="#b#L3#领取720分钟奖励【50000000点卷】#l\r\n";
			//text+="#b#L4#领取999分钟奖励【50000000点券和5000抵用卷】#l\r\n";
			cm.sendSimple(text);
		} else {
			cm.sendOk("活动已经结束");
			cm.dispose();
		}
	} else if (status == 1) {
		typed = selection;
		cm.sendYesNo("是否现在就领取点卷奖励，每个账号只能领取一次，并且角色等级需要大于等于10级。");
	} else if (status == 2) {
		var points = 0;
		var nxpoints = 0;
		var needtime = 10;
		if (typed==1) {
			points = 50000000;
			nxpoints = 0;
			needtime = 0;
		} else if (typed==2){
			points = 0;
			nxpoints = 5000;
			needtime = 300;
		} else if (typed==3){
			points = 5000;
			nxpoints = 0;
			needtime = 720;
		} else if (typed==4){
			points = 5000;
			nxpoints = 5000;
			needtime = 999;
		}
		if (cm.getPlayer().getTodayOnlineTime()>=needtime) {
			if (cm.getBossLogAcc(bossid+typed)==0) {
				cm.setBossLogAcc(bossid+typed);
				cm.gainNX(1, points);
				cm.gainNX(2, nxpoints);
				cm.gainRMB(200);
				cm.sendOk("领取成功！");
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