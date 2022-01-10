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
			var text = "���������֣�#b2016��2��1����2��7��#k֮�䣬���ǵ�¼��Ϸ����ң�����ʱ����ȼ��ﵽ��ӦҪ�󣬵������ϵ�#r9��10����9��30��#k���ڴ���ȡ���Ĺ���ҽ�����\r\n";
			text += "#b#L2#�鿴�콱Ҫ��#l\r\n";
			text += "#b#L1#��Ҫ��ȡ���ս���#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 2) {
				var text = "#d#e2��1�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r180����#k���ȼ��ﵽ#b150��#k������ȡ�����#r10#kö��\r\n";

				text += "#d#e2��2�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b180��#k������ȡ�����#r20#kö��\r\n";

				text += "#d#e2��3�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r360����#k���ȼ��ﵽ#b200��#k������ȡ�����#r40#kö��\r\n";

				text += "#d#e2��4�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r600����#k���ȼ��ﵽ#b210��#k������ȡ�����#r60#kö��\r\n";

				text += "#d#e2��5�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r600����#k���ȼ��ﵽ#b220��#k������ȡ�����#r100#kö��\r\n";

				text += "#d#e2��6�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r600����#k���ȼ��ﵽ#b230��#k������ȡ�����#r200#kö��\r\n";

				text += "#d#e2��7�գ�#n#k\r\n";
				text += "\t����ʱ��ﵽ#r600����#k���ȼ��ﵽ#b240��#k������ȡ�����#r300#kö��\r\n";
				status = -1;
				cm.sendSimple(text);
			} else if (selection == 1){
				cm.sendYesNo("��ע�⣬#r#eÿ̨����ͬһ�˺�ֻ����ȡһ�ν���#n#k���Ƿ����ھ���ȡ������");
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
						cm.sendOk("��ȡ��������");
						cm.dispose();
						return;
					}
					if (cm.getLevel() >= level && cm.getPlayer().getTodayOnlineTime() >= onlineTime) {
						if (getPCLog("�����弶���", 1)<=0) {
							if (cm.getBossLogAcc("�����弶���") < 1) {
								cm.setBossLogAcc("�����弶���");
								cm.gainItem(4000463, points);
								setPCLog("�����弶���", 1);
								cm.sendOk("��ȡ�ɹ�����ȡ��#b" + points + "#kö����ҡ�");
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
				cm.sendOk("���ڲ�����ȡ��ʱ��Ŷ������#b2016��2��1����2016��2��7��#k֮���ÿ��9��10����9��50��֮�������ȡ�����ʱ����ˣ����޷���ȡ��Ŷ��");
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