var status = 0;
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //������
var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
var day = ca.get(java.util.Calendar.DATE); //��ȡ��
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE); //��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����
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
			var text = "���������֣�#b2015��7��18����2015��7��24��#k֮�䣬���ǵ�¼��Ϸ����ң�����ʱ����ȼ��ﵽ��ӦҪ�󣬵������ϵ�#r9��10����9��20��#k���ڴ���ȡ����Ԫ��������\r\n";
			text += "#b#L2#�鿴�콱Ҫ��#l\r\n";
			text += "#b#L1#��Ҫ��ȡ���ս���#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 2) {
				var text = "#d#e7��18�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r10����#k���ȼ��ﵽ#b10��#k������ȡԪ��#r10#kö��\r\n";

				text += "#d#e7��19�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b100��#k������ȡԪ��#r10#kö��\r\n";

				text += "#d#e7��20�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b150��#k������ȡԪ��#r10#kö��\r\n";

				text += "#d#e7��21�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b200��#k������ȡԪ��#r10#kö��\r\n";

				text += "#d#e7��22�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b220��#k������ȡԪ��#r20#kö��\r\n";

				text += "#d#e7��23�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b230��#k������ȡԪ��#r30#kö��\r\n";

				text += "#d#e7��24�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b240��#k������ȡԪ��#r50#kö��\r\n";
				status = -1;
				cm.sendSimple(text);
			} else if (selection == 1){
				cm.sendYesNo("��ע�⣬#r#eÿ̨����ͬһ�˺�ֻ����ȡһ�ν���#n#k���Ƿ����ھ���ȡ������");
			}
		} else if (status == 2) {
			if (month == 7 && day >= 18 && day <= 24 && (hour == 21 && (minute >= 10 && minute <= 20)) || hour == 21 && (minute >= 10 && minute <= 20)) {
				var points = 0;
				var level = 0;
				var onlineTime = 0;
				if (true) {
					switch (day) {
					case 18:
						points = 10;
						level = 10;
						onlineTime = 10;
						break;
					case 19:
						points = 10;
						level = 100;
						onlineTime = 360;
						break;
					case 20:
						points = 10;
						level = 150;
						onlineTime = 360;
						break;
					case 21:
						points = 10;
						level = 200;
						onlineTime = 360;
						break;
					case 22:
						points = 20;
						level = 220;
						onlineTime = 360;
						break;
					case 23:
						points = 30;
						level = 230;
						onlineTime = 360;
						break;
					case 24:
						points = 50;
						level = 240;
						onlineTime = 360;
						break;
					}
					if (points==0) {
						cm.sendOk("��ȡ����������");
						cm.dispose();
						return;
					}
					if (cm.getLevel() >= level && cm.getPlayer().getTodayOnlineTime() >= onlineTime) {
						if (getPCLog("�������", 1)<=0) {
							if (cm.getBossLogAcc("�������콱��") < 1) {
								cm.setBossLogAcc("�������콱��");
								cm.gainItem(4001485, points);
								setPCLog("�������", 1);
								cm.sendOk("��ȡ�ɹ�����ȡ��#b" + points + "#köԪ����");
								cm.dispose();
							} else {
								cm.sendOk("�������Ѿ���ȡ�����������ظ���ȡ��");
								cm.dispose();
							}
						} else {
							cm.sendOk("ÿ̨����ÿ��IPֻ����ȡһ�Σ��޷��ظ���ȡ��");
							cm.dispose();
						}
					} else {
						cm.sendOk("���ĵȼ�������ʱ�䲻���Ͻ�����ȡҪ�󡣾�����鿴�콱˵����");
						cm.dispose();
					}
				}
			} else {
				cm.sendOk("���ڲ�����ȡ��ʱ��Ŷ������#b2015��7��18����2015��7��24��#k֮���ÿ��9��10����9��20��֮�������ȡ�����ʱ����ˣ����޷���ȡ��Ŷ��");
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