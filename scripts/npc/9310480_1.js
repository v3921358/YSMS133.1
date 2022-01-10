var status = 0;
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
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var text = "开服七天乐，#b2016年2月1日至2月7日#k之间，凡是登录游戏的玩家，在线时间与等级达到相应要求，当天晚上的#r9点10分至9点30分#k可在此领取丰厚的国庆币奖励。\r\n";
			text += "#b#L2#查看领奖要求#l\r\n";
			text += "#b#L1#我要领取今日奖励#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 2) {
				var text = "#d#e2月1日：#n#k\r\n";
				text += "\t在线时间达到#r180分钟#k，等级达到#b150级#k，可领取国庆币#r10#k枚。\r\n";

				text += "#d#e2月2日：#n#k\r\n";
				text += "\t在线时间达到#r360分钟#k，等级达到#b180级#k，可领取国庆币#r20#k枚。\r\n";

				text += "#d#e2月3日：#n#k\r\n";
				text += "\t在线时间达到#r360分钟#k，等级达到#b200级#k，可领取国庆币#r40#k枚。\r\n";

				text += "#d#e2月4日：#n#k\r\n";
				text += "\t在线时间达到#r600分钟#k，等级达到#b210级#k，可领取国庆币#r60#k枚。\r\n";

				text += "#d#e2月5日：#n#k\r\n";
				text += "\t在线时间达到#r600分钟#k，等级达到#b220级#k，可领取国庆币#r100#k枚。\r\n";

				text += "#d#e2月6日：#n#k\r\n";
				text += "\t在线时间达到#r600分钟#k，等级达到#b230级#k，可领取国庆币#r200#k枚。\r\n";

				text += "#d#e2月7日：#n#k\r\n";
				text += "\t在线时间达到#r600分钟#k，等级达到#b240级#k，可领取国庆币#r300#k枚。\r\n";
				status = -1;
				cm.sendSimple(text);
			} else if (selection == 1){
				cm.sendYesNo("请注意，#r#e每台电脑同一账号只能领取一次奖励#n#k，是否现在就领取奖励？");
			}
		} else if (status == 2) {
			if (month == 2 && day >= 1 && day <= 7 && (hour == 21 && (minute >= 10 && minute <= 50)) || hour == 21 && (minute >= 10 && minute <= 50)) {
				var points = 0;
				var level = 0;
				var onlineTime = 0;
				if (true) {
					switch (day) {
					case 1:
						points = 10;
						level = 150;
						onlineTime = 180;
						break;
					case 2:
						points = 20;
						level = 180;
						onlineTime = 360;
						break;
					case 3:
						points = 40;
						level = 200;
						onlineTime = 360;
						break;
					case 4:
						points = 60;
						level = 210;
						onlineTime = 600;
						break;
					case 5:
						points = 100;
						level = 220;
						onlineTime = 600;
						break;
					case 6:
						points = 200;
						level = 230;
						onlineTime = 600;
						break;
					case 7:
						points = 300;
						level = 240;
						onlineTime = 600;
						break;
					}
					if (points==0) {
						cm.sendOk("领取奖励出错！");
						cm.dispose();
						return;
					}
					if (cm.getLevel() >= level && cm.getPlayer().getTodayOnlineTime() >= onlineTime) {
						if (getPCLog("开服冲级礼包", 1)<=0) {
							if (cm.getBossLogAcc("开服冲级礼包") < 1) {
								cm.setBossLogAcc("开服冲级礼包");
								cm.gainItem(4000463, points);
								setPCLog("开服冲级礼包", 1);
								cm.sendOk("领取成功！领取了#b" + points + "#k枚国庆币。");
								cm.dispose();
							} else {
								cm.sendOk("您今日已经领取奖励，不能重复领取。");
								cm.dispose();
							}
						} else {
							cm.sendOk("每台电脑每个IP只能领取一次，无法重复领取。");
							cm.dispose();
						}
					} else {
						cm.sendOk("您的等级或在线时间不符合今日领取要求。具体请查看领奖说明。");
						cm.dispose();
					}
				}
			} else {
				cm.sendOk("现在不是领取的时间哦，请于#b2016年2月1日至2016年2月7日#k之间的每晚9点10分至9点50分之间过来领取，如果时间过了，就无法领取了哦。");
				cm.dispose();
			}
		}
	}
}
function getPCLog(bossid, type) {
	if (type==null)
		type=1;
	var t = 'mac';
	if (type == 1)
		t = 'ipaddress';
	var tValue = (type==0) ? cm.getC().getMac() : cm.getC().getSessionIPAddress();
	if (tValue == "/222.190.113.154")
		return 0;
	var times = 0;
	var conn = cm.getConnection();
	var sql = "SELECT * FROM `pclog` WHERE `bossid` = ? and `"+t+"`=? ";
	var pstmt = conn.prepareStatement(sql);
	pstmt.setString(1, bossid);
	pstmt.setString(2, tValue);
	var result = pstmt.executeQuery();
	if (result.next()) {
		var time = result.getString('time');
		var lastTimestamp = time.substring(0, 10);
		lastTimestamp +=" 00:00:00";
		lastTimestamp = java.sql.Timestamp.valueOf(lastTimestamp).getTime();
		var dayTimestamp = year+"-"+month+"-"+day+" 00:00:00";
		dayTimestamp = java.sql.Timestamp.valueOf(dayTimestamp).getTime();
		if (lastTimestamp == dayTimestamp) {
			times = result.getInt('count');
		} else {
			sql = "UPDATE `pclog` SET `count` = 0, `time` = CURRENT_TIMESTAMP where `bossid`=? and `"+t+"`=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, bossid);
			pstmt.setString(2, tValue);
			pstmt.executeUpdate();
			times = 0;
		}
	} else { 
		sql = "INSERT INTO `pclog`(`bossid`,`"+t+"`,`count`) values(?,?,0)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, bossid);
		pstmt.setString(2, tValue);
		pstmt.executeUpdate();
		times = 0;
	}
	result.close();
	pstmt.close();
	return times;
}
function setPCLog(bossid, type) {
	if (type==null)
		type=1;
	var t = 'mac';
	if (type == 1)
		t = 'ipaddress';
	var tValue = (type==0) ? cm.getC().getMac() : cm.getC().getSessionIPAddress();
	var times = getPCLog(bossid, type);
	var conn = cm.getConnection();
	sql = "UPDATE `pclog` SET `count` = ?, `time` = CURRENT_TIMESTAMP where `bossid`=? and `"+t+"`=?";
	pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, times+1);
	pstmt.setString(2, bossid);
	pstmt.setString(3, tValue);
	pstmt.executeUpdate();
}