//_ÿ�ն�ʱ����������ȡ���

var status = -1;
var text;

var starttime = "2016-2-1 20:10:00"; //�ÿ��ˢ�¿���ʱ��
var endtime = "2016-2-1 20:15:00"; //�����ʱ��


var invtype = new Array("װ��", "����", "����", "����", "����");

var maxcount = 20;

var packages1 = new Array(//��1������
	//Array(1012240, 1), //��Ѫ����
	Array(2431354, 1), //�ǻ�������
	Array(5150040, 5), //�ʼ�������
	Array(4001715, 1) //���ӽ�1�ڽ�Ǯ
);

var packages2 = new Array(//��2 - 3������
	//Array(2431354, 1), //�ǻ�������
	Array(2049124, 2), //����������
	Array(2049137, 2), //�������������� 40%
	Array(5150040, 5), //�ʼ�������
	Array(4001785, 10) //���ӽ�500W
);

var packages3 = new Array(//��4-10������
	//Array(2431354, 1),//�ǻ�������
	Array(5150040, 5), //�ʼ�������
	Array(2049124, 1), //����������
	Array(2049137, 1), //�������������� 40%
	Array(4001785, 8) //���ӽ�500W
);

var packages4 = new Array(//��11-15������
	Array(5150040, 3), //�ʼ�������
	//Array(2431354, 1),//�ǻ�������
	Array(2049124, 1), //����������
	// Array(2049137, 2),//�������������� 40%
	Array(4001785, 6) //���ӽ�500W
);

var packages5 = new Array(//��16-20������
	Array(5150040, 3), //�ʼ�������
	//Array(2431354, 1),//�ǻ�������
	//Array(2049124, 1), //����������
	Array(2049135, 2),//�������������� 20%
	Array(4001785, 2) //���ӽ�500W
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
	var year = ca.get(java.util.Calendar.YEAR); //������
	var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = ca.get(java.util.Calendar.DATE); //��ȡ��
	var hour = ca.get(java.util.Calendar.HOUR_OF_DAY) + 1; //���Сʱ
	var minute = ca.get(java.util.Calendar.MINUTE); //��÷���
	var second = ca.get(java.util.Calendar.SECOND); //�����
	var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);


	if (currdate < define_starttime || currdate > define_endtime) {
	//if (hour != 20 || minute < 10 || minute > 15) { //�������������ʱ��20��10����15��֮�������ȡ

						//cm.sendOk("��ʱֹͣ�����");
			cm.sendOk("\t\t\t\t#r��ϲ���#k\r\n\r\n#b��ף���ǻ𱬿������ɷ�20����ϲ���\r\n\r\n#rGM��ʾ����ȡ�����Ҫ����ʱ��30����\r\n\r\n#b�����û�����������ǽ�������˶���#k\r\n\r\n�ǻʱ�䡭�� \r\n\r\n���ʼʱ�䣺#r" + starttime + "#k\r\n" + "�����ʱ�䣺#r" + endtime);
			cm.dispose();
			return;
		}

		if (status == 0) {
			cm.sendNext("\t\t\t\t#r��ϲ��� \r\n\r\n\r\n#b��ף���ǻ𱬿������ɷ�20����ϲ���\r\n\r\n��ϲ����������ޣ����μ��������׵���ʧ\r\n\r\n���ע��ʱ�䣬����������ޣ������˿ɾ�û����Ŷ\r\n");
		} else if (status == 1) {
			if (cm.getPlayer().getTotalOnlineTime() < 30) {
				cm.sendOk("����������ʱ�䲻��30���ӣ��޷���ȡ���");
				cm.dispose();
				return;
			}
			if (cm.getBossLog("������ϲ���") > 0) {
				cm.sendOk("�������Ѿ���ȡ�����");
				cm.dispose();
				return;
			}
			var count = cm.getEventLogForDay("������ϲ���");
			var packages = new Array();
			var gRMB = false;
			if (count >= 0 && count < 1) { //��1��
				packages = packages1;
				//gRMB = true;//�����Ǳ�

			} else if (count >= 1 && count < 3) {
				packages = packages2;

			} else if (count >= 3 && count < 10) {
				packages = packages3;

			} else if (count >= 10 && count < 15) {
				packages = packages4;

			} else if (count >= 15 && count < 20) {
				packages = packages5;

			} else {
				cm.sendOk("�ܱ�Ǹ\r\n�������ˣ���������Ѿ�������ϣ���л�׵Ĳ��롣");
				cm.dispose();
				return;
			}

			if (!checkSpace(packages)) { //�����Ǽ������ģ����˻�ֱ����ʾ��ң���ִ�к���Ĳ�����������Ҫ��ʲô������Ӧ�ü����������
				return;
			}

			if (gRMB) {//���Ǳ�
				cm.gainRMB(66);
			}

			for (var i in packages) {
				cm.gainItem(packages[i][0], packages[i][1]);
			}
			cm.sendOk("��ȡ���");
			cm.setEventLogForDay("������ϲ���");
			cm.setBossLog("������ϲ���");
			cm.worldMessageEffect("[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1), 1, 10);
			cm.worldSpouseMessage(0x23, "[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1));
			//cm.worldSpouseMessage(0x23, "[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1));
			//cm.worldSpouseMessage(0x23, "[��ϲ���] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC����ȡ,��ϲ�����Ŀǰʣ�� " + (maxcount - count - 1));

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
			cm.sendOk("����#b" + invtype[haveSpace] + "��#kʣ��ռ䲻��" + needSpace[haveSpace] + "��������һ�������ɡ�");
			cm.dispose();
			return false;
		}
		return true;
	}