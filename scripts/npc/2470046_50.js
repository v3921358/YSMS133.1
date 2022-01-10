//_每日定时开启限量领取礼包

var status = -1;
var text;

var starttime = "2016-1-10 20:10:00"; //活动每天刷新开启时间
var endtime = "2016-1-12 20:15:00"; //活动结束时间


var invtype = new Array("装备", "消耗", "设置", "其他", "特殊");

var maxcount = 20;

var packages1 = new Array(
	Array(1012240, 1), //热血面罩
	Array(5150040, 10), //皇家美发卡
	Array(4001715, 1) //定居金1亿金钱
);

var packages2 = new Array(
	Array(2431354, 1), //星火幸运箱
	Array(2049124, 1), //正向混沌卷轴
	Array(2049137, 2), //惊人正义混沌卷轴 40%
	Array(5150040, 10), //皇家美发卡
	Array(4001785, 15) //定居金500W
);

var packages3 = new Array(
	//Array(2431354, 1),//星火幸运箱
	Array(5150040, 10), //皇家美发卡
	Array(2049124, 1), //正向混沌卷轴
	Array(2049137, 2), //惊人正义混沌卷轴 40%
	Array(4001785, 10) //定居金500W
);

var packages4 = new Array(
	Array(5150040, 10), //皇家美发卡
	//Array(2431354, 1),//星火幸运箱
	Array(2049124, 1), //正向混沌卷轴
	// Array(2049137, 2),//惊人正义混沌卷轴 40%
	Array(4001785, 10) //定居金500W
);

var packages5 = new Array(
	Array(5150040, 10), //皇家美发卡
	//Array(2431354, 1),//星火幸运箱
	Array(2049124, 1), //正向混沌卷轴
	//Array(2049137, 2),//惊人正义混沌卷轴 40%
	Array(4001785, 5) //定居金500W
);


function start() {
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

	var currdate = new Date();
	var define_starttime = new Date(Date.parse(starttime.replace(/-/g, "/")));
	var define_endtime = new Date(Date.parse(endtime.replace(/-/g, "/")));

	var ca = java.util.Calendar.getInstance();
	var year = ca.get(java.util.Calendar.YEAR); //获得年份
	var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
	var day = ca.get(java.util.Calendar.DATE); //获取日
	var hour = ca.get(java.util.Calendar.HOUR_OF_DAY) + 1; //获得小时
	var minute = ca.get(java.util.Calendar.MINUTE); //获得分钟
	var second = ca.get(java.util.Calendar.SECOND); //获得秒
	var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);


	//if (currdate < define_starttime || currdate > define_endtime) {
	if (hour != 20 || minute < 10 || minute > 15) { //这里是礼包开启时间20点10分至15分之间可以领取
						//cm.sendOk("赞时停止该礼包");
			cm.sendOk("\t\t#r惊喜神秘礼包**今晚20点10分-15分开抢**#k\r\n\r\n#b庆祝点点火爆公测\r\n\r\n#rGM提示：领取礼包需要在线时间30分钟\r\n\r\n#b来晚就没有啦，您会是今晚的幸运儿吗？#k\r\n\r\n非活动时间…… \r\n\r\n活动开始时间：#r" + starttime + "#k\r\n" + "活动结束时间：#r" + endtime);
			cm.dispose();
			return;
		}

		if (status == 0) {
			cm.sendNext("\t\t#r惊喜神秘礼包 **今晚20点10分开抢**\r\n\r\n#b庆祝点点火爆开启\r\n\r\n\r\n神秘礼包内的礼物会不定期更新,不参加这个活动是亲的损失\r\n\r\n务必注意活动时间，礼包数量有限，来晚了可就没有了哦\r\n");
		} else if (status == 1) {
			if (cm.getPlayer().getTotalOnlineTime() < 10) {
				cm.sendOk("您今天在线时间不足10分钟，无法领取礼包");
				cm.dispose();
				return;
			}
			if (cm.getBossLog("每日限量礼包") > 0) {
				cm.sendOk("您今天已经领取了礼包");
				cm.dispose();
				return;
			}
			var count = cm.getEventLogForDay("每日限量礼包");
			var packages = new Array();
			var gRMB = false;
			if (count >= 0 && count < 1) { //第1名
				packages = packages1;
				//gRMB = true;//奖励现金

			} else if (count >= 1 && count < 3) {
				packages = packages2;

			} else if (count >= 3 && count < 10) {
				packages = packages3;

			} else if (count >= 10 && count < 15) {
				packages = packages4;

			} else if (count >= 15 && count < 20) {
				packages = packages5;

			} else {
				cm.sendOk("很抱歉现在礼包已经发放完毕。");
				cm.dispose();
				return;
			}

			if (!checkSpace(packages)) { //这里是检测包裹的，满了会直接提示玩家，不执行后面的操作，所以你要给什么东西都应该加在这个后面
				return;
			}

			if (gRMB) {
				cm.gainRMB(66);
			}

			for (var i in packages) {
				cm.gainItem(packages[i][0], packages[i][1]);
			}
			cm.sendOk("领取完毕");
			cm.setEventLogForDay("每日限量礼包");
			cm.setBossLog("每日限量礼包");
			cm.worldMessageEffect("[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1), 1, 10);
			cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));

			cm.dispose();
		}
	}
	
	function checkSpace(packages) {
		var haveSpace = 0;
		var needSpace = new Array(5);
		for (var i = 1; i <= 5; i++) {
			for (var j in packages) {
				needSpace[Math.floor(packages[j][0] / 1000000)] += 1;
			}
		}
		for (var i in needSpace) {
			if (cm.getSpace(i) < needSpace[i]) {
				haveSpace = i;
				break;
			}
		}
		if (haveSpace > 0) {
			cm.sendOk("您的#b" + invtype[haveSpace] + "栏#k剩余空间不足" + needSpace[haveSpace] + "格，请清理一下再来吧…");
			cm.dispose();
			return false;
		}
		return true;
	}