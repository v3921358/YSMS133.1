/* 
	�ۻ���ֵ��ȡ���
*/
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����

// ����ۻ�����
var day = 7;
// ÿ���׶��������ĳ�ֵ��
var condition = new Array(30, 50, 100, 200);
// �������
var reward = new Array(
					// ���1
					Array(1, 5062009, 50),
					Array(1, 5064000, 5),
					Array(1, 2340000, 5),
					Array(1, 2049323, 2),

					// ���2
					Array(2, 5062009, 100),
					Array(2, 5064000, 8),
					Array(2, 2340000, 10),
					Array(2, 2049323, 4),

					// ���3
					Array(3, 5062009, 200),
					Array(3, 5064000, 20),
					Array(3, 2340000, 20),
					Array(3, 2049323, 6),

					// ���4
					Array(4, 5062009, 300),
					Array(4, 5064000, 30),
					Array(4, 2340000, 40),
					Array(4, 2049323, 12),

					// ���5
					//Array(5, 3994417, 1),
					Array(5, 5750000, 30),//����ħ��
					Array(5, 2049137, 30),
					Array(5, 5062009, 100),
					Array(5, 5062500, 100),
					Array(5, 2340000, 30),
					
					// ���6
					Array(6, 5750000, 50),//����ħ��
					Array(6, 2049137, 20),
					Array(6, 5062009, 200),
					Array(6, 5062500, 200),
					Array(6, 2340000, 50),
					Array(6, 5064000, 50),

					// ���7
					//Array(7, 3994419, 1),
					Array(7, 5750000, 100),//����ħ��
					Array(7, 2049137, 40),
					Array(7, 5062009, 400),
					Array(7, 5062500, 400),
					Array(7, 2340000, 100),
					Array(7, 5064000, 100),					

					// ���8
					Array(8, 3010658, 1),//�������ϱ�����
					Array(8, 5750000, 200),//����ħ��
					Array(8, 3994417, 1),
					Array(8, 3994418, 1),
					Array(8, 3994419, 1),
					Array(8, 3994420, 1),
					Array(8, 3994421, 1),
					Array(8, 3994422, 1),
					Array(8, 2049137, 200),
					Array(8, 5062009, 1000),
					Array(8, 5062500, 1000),
					Array(8, 2340000, 200),
					Array(8, 5064000, 200)
					//Array(8, 4001715, 3)
					);


var status = -1;
var text;
var paylog;
var sel;
var daily = "ÿ�ճ�ֵ���";
var grandtotal = "7���ۼƳ�ֵ���";
var giftname;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0)
	{
		cm.dispose();
		return;
	}
	if (mode == 1)
	{
		status++;
	} else {
		status--;
	}

	if (status == 0) {
		paylog = cm.getSevenDayPayLog(day);
		text = "\t\t\t\t#e- ��ֵ�����ȡ -#n\r\n\r\n";
		text += "#d���ܹ���ֵ���Ϊ�� #r" + cm.getTotalRMB() + " #dԪ����� #r7#d �յĳ�ֵ��¼Ϊ��#k\r\n\r\n\t#e";
		//text += "�����7�յĳ�ֵ��¼��\r\n\r\n\t#e";
		text += paylog + "#n\r\n#b";
		
		var loop = false;
		for (var i = 0; i < condition.length; i++) {
			giftname = (!loop ? daily : grandtotal) + (i + 1);
			if (!loop) {
				text += "#L" + i + "#��ȡÿ�ճ�ֵ" + condition[i] + "Ԫ����";
				if (i+1 == condition.length) {
					i = -1;
					loop = !loop;
				}
			} else {
				text += "#L" + (i + condition.length) + "#��ȡ����7��ÿ�ճ�ֵ" + condition[i] + "Ԫ����";
			}
			if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
				text += "(����ȡ)";
			}
			text += "#l\r\n";
		}

		cm.sendOk(text);
	} else if (status == 1) {
		// 23:50 ~ 23: 59 ǰһ�첻��ȡ��ʱ��  00:00 ~ 00:10 �ڶ��첻��ȡ��ʱ��  
		if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
			cm.sendOk("#d��������ǰʱ�䣺 #r" + hour +" ʱ " + minute + " �� " + second + " ��#k\r\n\r\n#e#d��ʾ#n#k��#r23 �� 50 #b��#r 00 �� 10 #bʱ�޷���ȡ���߽�����#k");
			cm.dispose();
			return;
		}
		sel = selection + 1;
		giftname = (selection < condition.length ? daily : grandtotal) + (selection < condition.length ? sel : sel - condition.length);
		if (cm.getPlayer().getBossLogAcc(giftname) > 0) {
			cm.sendOk("���������Ѿ���ȡ����");
			cm.dispose();
			return;
		}
		text = "\t\t\t\t#e- ������� -#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "��]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		var rmb = sel <= condition.length ? condition[sel - 1] : condition[sel - 1 - condition.length];
		if (sel <= condition.length) {
			if (paylog.get(0) < rmb) {
				cm.sendOk("�����ճ�ֵ����" + rmb + "Ԫ���޷���ȡ��������");
				cm.dispose();
				return;
			}
		} else {
			for (var i = 0; i < day; i++) {
				if (paylog.get(i) < rmb) {
					cm.sendOk("�����7��û�дﵽ������ֵ" + rmb + "Ԫ���޷���ȡ��������");
					cm.dispose();
					return;
				}
			}
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				rewardlist.push(new Array(reward[i][1], reward[i][2]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk("�����ռ䲻�㣬��ȷ������ÿ����λ������ " + rewardlist.length + " ��ռ�");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
		}
		cm.setBossLogAcc(giftname);
		cm.playerMessage(1, "��ȡ�ɹ���");
		//cm.channelMessage(0x18, "��ÿ�ճ�ֵ��" + " : " + "��� " + cm.getChar().getName() + " ��ȡ��ÿ�ճ�ֵ " + condition[sel-1] + " Ԫ������");
		cm.dispose();
	}
}