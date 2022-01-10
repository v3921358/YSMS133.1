/*
	�ű���������ǩ��
	���ߣ�Memory
*/
var status = 0;
var times = 0;
var lasttime = 0;
var cal;
var year;
var month;
var day;
var date;

var listItem = Array(
	Array(5064000, 2), //��������
	Array(5062000, 10), //����ħ��
	Array(5064003, 2),  //���汣��֮��
	Array(2431741, 1),  //����ȯ3000
	Array(5062002, 20),  //�߼�ħ��
	Array(4310036, 1000),  //������
	Array(4032521, 1) //�����˹
);
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
	//��ʼִ��
	if (status == 0) {
/*		if (cm.getPlayer().getName() != "ľ���ӹ���") {
			cm.sendOk("�㲻�ǹ�ʿ�棬�޷������ҡ�");
			cm.dispose();
			return;
		}
	*/	var info = getSignInfo();
		var text = "#b������ǩ����#k\r\n\r\n";
		var isSign = ""
		if (!info['isDone']) {
			text+="���Ѿ�����ǩ����#e#r"+info['times']+"#k#n�졣\r\n#r(ͬһ�˺���ֻ��һ����ɫ��������ǩ��)\r\n#k������ǩ��������ȡ��\r\n";
		} else {
			isSign = "#r(������ǩ��)#b";
			text+="���Ѿ�����ǩ����#e#r"+info['times']+"#k#n�졣\r\n#r(ͬһ�˺���ֻ��һ����ɫ��������ǩ��)\r\n#k������ǩ��������ȡ��\r\n";
		}
		text+="#b#i"+listItem[info['times']][0]+":##t"+listItem[info['times']][0]+"##rx"+listItem[info['times']][1]+"#k��\r\n";
		//for(var i=0; i<listItem.length; i++) {
		//	text+="��"+(i+1)+"�죺#b#i"+listItem[i][0]+":##t"+listItem[i][0]+"##rx"+listItem[i][1]+"#k��\r\n";
		//}
		text+="\r\n#b#L1#��Ҫǩ��"+isSign+"#l\r\n";
		text+="#L2#�鿴���н���#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			var info = getSignInfo();
			if (cm.getPlayer().getTodayOnlineTime() < 120) {
				cm.sendOk("����ʱ��С��120���ӣ�����ǩ�������#r"+(120-cm.getPlayer().getTodayOnlineTime())+"��������ǩ���ɣ�#k");
				cm.dispose();
				return;
			}
			//if (cm.getPlayer().getLevel< 120)
			if (info['isDone']) {
				cm.sendOk("�������Ѿ�ǩ�����ˣ������ٽ���ǩ��");
				cm.dispose();
				return;
			}
			cm.sendOk("��ϲ����ǩ���ɹ�");
			cm.finishActivity(120111);
			cm.gainItem(listItem[info["times"]][0],listItem[info["times"]][1]);
			var times = info["times"]*1+1;
			if (info["times"]==6) {
				times=0;
			}
			var lastTime = times
			if (times==0) {
				lastTime=7;
			}
			cm.worldSpouseMessage(0x07, "[����ǩ��] : ��ҡ�"+cm.getChar().getName()+"������"+(lastTime)+"��ǩ������ȡ�˷��Ľ���");
			updateSign(times);
			cm.dispose();
		} else if (selection == 2 ){
			var text = "����ǩ��ÿ�ս������£�\r\n";
			for(var i=0; i<listItem.length; i++) {
				text+="��"+(i+1)+"�죺#b#i"+listItem[i][0]+":##t"+listItem[i][0]+"##rx"+listItem[i][1]+"#k��\r\n";
			}
			cm.sendOk(text);
			cm.dispose();
		} else {
			cm.dispose();
		}
	}
}

function getSignInfo() {
	var lastTimestamp = null;
	var isDone = false;
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("select lasttime, times from days_check_log where charid = "+cm.getPlayer().getAccountID()+";");
	var queryTimes = pstmt.executeQuery();
	if (queryTimes.next()) {
		times = queryTimes.getString("times");
		lasttime = queryTimes.getString("lasttime");
		lastTimestamp = lasttime.substring(0, 10);
		lastTimestamp +=" 00:00:00";
		lastTimestamp = java.sql.Timestamp.valueOf(lastTimestamp).getTime();
		queryTimes.close();
	} else {
		pstmt = conn.prepareStatement("insert into days_check_log(charid) values("+cm.getPlayer().getAccountID()+")");
		pstmt.executeUpdate();
		times=0;
	}
	pstmt.close();
	//conn.close();
	cal = java.util.Calendar.getInstance();
	refreshDates(cal);
	date = year + "-" + month + "-" + day + " 00:00:00";
	var currentTimestamp = java.sql.Timestamp.valueOf(date).getTime();
	if (Math.floor(currentTimestamp*1-lastTimestamp*1)<=0) {		
		isDone=true;
	}
	//java.lang.System.out.println((currentTimestamp-lastTimestamp));
	if ((currentTimestamp-lastTimestamp)>(86400*1000)) {
		times=0;
	}
	var info = new Array();
	info['lastTimestamp'] = lastTimestamp;
	info['currentTimestamp'] = currentTimestamp;
	info['times'] = times;
	info['isDone'] = isDone;
	return info;
}

function updateSign(times) {
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("update days_check_log set times="+times+", lasttime=CURRENT_TIMESTAMP where charid="+cm.getPlayer().getAccountID()+";");
	pstmt.executeUpdate();
	pstmt.close();
	//conn.close();
}

function refreshDates(calendar) {
    year = calendar.get(java.util.Calendar.YEAR);
    month = calendar.get(java.util.Calendar.MONTH) + 1;
    if (Math.floor(month / 10) == 0) {
        month = "0" + month;
    }
    day = calendar.get(java.util.Calendar.DATE);
    if (Math.floor(day / 10) == 0) {
        day = "0" + day;
    }
}