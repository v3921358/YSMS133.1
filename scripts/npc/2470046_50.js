//_ÿ�ն�ʱ����������ȡ���

var status = -1;
var text;

var starttime = "2016-1-10 20:10:00"; //�ÿ��ˢ�¿���ʱ��
var endtime = "2016-1-12 20:15:00"; //�����ʱ��


var invtype = new Array("װ��", "����", "����", "����", "����");

var maxcount = 20;

var packages1 = new Array(
	Array(1012240, 1), //��Ѫ����
	Array(5150040, 10), //�ʼ�������
	Array(4001715, 1) //���ӽ�1�ڽ�Ǯ
);

var packages2 = new Array(
	Array(2431354, 1), //�ǻ�������
	Array(2049124, 1), //����������
	Array(2049137, 2), //�������������� 40%
	Array(5150040, 10), //�ʼ�������
	Array(4001785, 15) //���ӽ�500W
);

var packages3 = new Array(
	//Array(2431354, 1),//�ǻ�������
	Array(5150040, 10), //�ʼ�������
	Array(2049124, 1), //����������
	Array(2049137, 2), //�������������� 40%
	Array(4001785, 10) //���ӽ�500W
);

var packages4 = new Array(
	Array(5150040, 10), //�ʼ�������
	//Array(2431354, 1),//�ǻ�������
	Array(2049124, 1), //����������
	// Array(2049137, 2),//�������������� 40%
	Array(4001785, 10) //���ӽ�500W
);

var packages5 = new Array(
	Array(5150040, 10), //�ʼ�������
	//Array(2431354, 1),//�ǻ�������
	Array(2049124, 1), //����������
	//Array(2049137, 2),//�������������� 40%
	Array(4001785, 5) //���ӽ�500W
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


	//if (currdate < define_starttime || currdate > define_endtime) {
	if (hour != 20 || minute < 10 || minute > 15) { //�������������ʱ��20��10����15��֮�������ȡ
						//cm.sendOk("��ʱֹͣ�����");
			cm.sendOk("\t\t#r��ϲ�������**����20��10��-15�ֿ���**#k\r\n\r\n#b��ף���𱬹���\r\n\r\n#rGM��ʾ����ȡ�����Ҫ����ʱ��30����\r\n\r\n#b������û�����������ǽ��������˶���#k\r\n\r\n�ǻʱ�䡭�� \r\n\r\n���ʼʱ�䣺#r" + starttime + "#k\r\n" + "�����ʱ�䣺#r" + endtime);
			cm.dispose();
			return;
		}

		if (status == 0) {
			cm.sendNext("\t\t#r��ϲ������� **����20��10�ֿ���**\r\n\r\n#b��ף���𱬿���\r\n\r\n\r\n��������ڵ�����᲻���ڸ���,���μ��������׵���ʧ\r\n\r\n���ע��ʱ�䣬����������ޣ������˿ɾ�û����Ŷ\r\n");
		} else if (status == 1) {
			if (cm.getPlayer().getTotalOnlineTime() < 10) {
				cm.sendOk("����������ʱ�䲻��10���ӣ��޷���ȡ���");
				cm.dispose();
				return;
			}
			if (cm.getBossLog("ÿ���������") > 0) {
				cm.sendOk("�������Ѿ���ȡ�����");
				cm.dispose();
				return;
			}
			var count = cm.getEventLogForDay("ÿ���������");
			var packages = new Array();
			var gRMB = false;
			if (count >= 0 && count < 1) { //��1��
				packages = packages1;
				//gRMB = true;//�����ֽ�

			} else if (count >= 1 && count < 3) {
				packages = packages2;

			} else if (count >= 3 && count < 10) {
				packages = packages3;

			} else if (count >= 10 && count < 15) {
				packages = packages4;

			} else if (count >= 15 && count < 20) {
				packages = packages5;

			} else {
				cm.sendOk("�ܱ�Ǹ��������Ѿ�������ϡ�");
				cm.dispose();
				return;
			}

			if (!checkSpace(packages)) { //�����Ǽ������ģ����˻�ֱ����ʾ��ң���ִ�к���Ĳ�����������Ҫ��ʲô������Ӧ�ü����������
				return;
			}

			if (gRMB) {
				cm.gainRMB(66);
			}

			for (var i in packages) {
				cm.gainItem(packages[i][0], packages[i][1]);
			}
			cm.sendOk("��ȡ���");
			cm.setEventLogForDay("ÿ���������");
			cm.setBossLog("ÿ���������");
			cm.worldMessageEffect("[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1), 1, 10);
			cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
			cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));

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