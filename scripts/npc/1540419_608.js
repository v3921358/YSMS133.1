
var status = -1;
var text;
var sel;
var time;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����

// ÿ��������������ʱ��
var condition = new Array(60, 180, 300, 550, 660, 720);
var spoints = new Array(0,0,2,3,5,5,5,10);
var reward = new Array(// �����š�����id������
					// ���1
					Array(1, 2000005, 300),  //����ҩˮ
					Array(1, 5130002, 1, 30 * 1000 * 60),  //ǿЧ�����
					Array(1, 5072000, 5, 1),  //����5��
					Array(1, 2450020, 2),  //����ֵ1.5��
					Array(1, 5062000, 3),  //����ħ��
					Array(1, 5062002, 3),  //�߼�����ħ��
					Array(1, 5076000, 5, 1), //��������
                    

					// ���2
					Array(2, 5062000, 5),//����ħ��
					Array(2, 5062002, 5),//�߼�����ħ��
					Array(2, 5062500, 2),//��ʦ��������ħ��
					Array(2, 4001713, 5), //���ӽ�10W
					Array(2, 4310036, 10), //�˶����
					
					// ���3
					Array(3, 5062000, 5),//����ħ��
					Array(3, 5062002, 5),//�߼�����ħ��
					Array(3, 5062500, 2), //��ʦ��������ħ��
					Array(3, 2340000, 1),//ף������
					Array(3, 2049124, 1),  //����������
					Array(3, 4310036, 10), //�˶����
					Array(3, 2213045, 1),  //С�ࡤ�װ�����ҩˮ
					
					// ���4 
					Array(4, 5062000, 5),//����ħ��
					Array(4, 5062002, 5),//�߼�����ħ��
					Array(4, 4310036, 30), //�����߱�
					Array(4, 5062500, 3),//��ʦ��������ħ��
					Array(4, 2340000, 1),//ף������
					Array(4, 2049124, 5), //����������
					Array(4, 2213046, 1),//С�������ձ���ҩˮ
					
				
					//���5
					Array(5, 5062000, 20),//����ħ��
					Array(5, 5062002, 10),//�߼�����ħ��
				    Array(5, 2049135, 1), // �����������20%
					Array(5, 5062500, 10),//��ʦ��������ħ��
                    Array(5, 2340000, 1),//ף������
					Array(5, 4310030, 50),// �˶���
					Array(5, 4310036, 50),//������
					Array(5, 2213047, 1), //Сϣ��˹����ҩˮ
					Array(5, 5064000, 3),  //��������
					Array(5, 4001839, 80), //����
					Array(5, 4001785, 3), //���ӽ�500����
					Array(5, 2431741, 1), //����ȯ3000
					Array(5, 2049124, 2), //����������
					//Array(5, 4310110, 1), //���ڼ����

					//���6 
					Array(6, 4001839, 200), //����
					Array(6, 4033356, 1), //�������1
					Array(6, 4310110, 2), //���ڼ����
                    Array(6, 5062000, 35),//����ħ��
					Array(6, 5062002, 25),//�߼�����ħ��
                    Array(6, 2049116, 1),//ǿ�������
				    Array(6, 2049135, 10), // �����������20%
                    Array(6, 2049137, 1), // �����������40%
                    Array(6, 2340000, 3),//ף������
					Array(6, 5062500, 20),//��ʦ��������ħ��
					Array(6, 5062009, 10),//��������ħ��
                    Array(6, 2000005, 200),  //����ҩˮ
					Array(6, 2049752, 3), //S��Ǳ�ܾ��� 30%
					Array(6, 1190300, 1), //������Ҷ����
					Array(6, 2431741, 8), //����ȯ3000
					Array(6, 2003517, 5),  //�߼�������ҩ
					Array(6, 4000463, 1),  //��������
					Array(6, 4001785, 5), //���ӽ�500����
					Array(6, 5064000, 3)  //��������
					//Array(6, 4310030, 100),// �˶���
					//Array(6, 4310036, 100)//������
			);

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

	var time = cm.getPlayer().getTodayOnlineTime();
	var curlevel = -1;

	if (status == 0) {
		text = head + "#e#d��������â��ð�յ�����ʱ��Ϊ�� #r" + time + "#k #d����#n#k\r\n#e#d��ʾ#n#k��#e#r23 �� 50#n #b��#r #e00 �� 10#n #bʱ�޷���ȡ���߽�����#k\r\n#b���� #e#r23��50#n#b ��ǰ��ȡ����δ��ȡ�Ľ��������������ʧ��#k#r#z4000463#���Զһ�Ԫ��,һԪ������һԪ�����#k\r\n\r\n";
		for (var i = 1; i <= condition.length; i++) {
			text += "#b#L" + i + "#"+aaa+" ��ȡ����" + condition[i-1] + "���ӽ���";
			if (cm.getBossLog("�������" + i) > 0) {
				text += "(����ȡ)";
				curlevel = curlevel == -1 ? i : curlevel;
			}
			text += "#l\r\n";
		}
		text += "#k";
		cm.sendSimple(text);
	} else if (status == 1) {
		// 23:50 ~ 23: 59 ǰһ�첻��ȡ��ʱ��  00:00 ~ 00:10 �ڶ��첻��ȡ��ʱ��  
		if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))){
			cm.sendOk(head + "#d��������ǰʱ�䣺 #r" + hour +" ʱ " + minute + " �� " + second + " ��#k\r\n\r\n#e#d��ʾ#n#k��#r23 �� 50 #b��#r 00 �� 10 #bʱ�޷���ȡ���߽�����#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("�������" + selection) > 0) {
			cm.sendOk(head + "���������Ѿ���ȡ����");
			cm.dispose();
			return;
		}
		sel = selection;
		text = head + "#e#r- ���� " + condition[selection - 1] + " ���ӽ��� -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "#i" + reward[i][1] + "##b #z" + reward[i][1] + "#[" + reward[i][2] + "��]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk(head + "����ʱ�䲻�㣬�޷���ȡ��");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				if (reward[i][3] == null || reward[i][3] == '')
					reward[i][3]=0;
				rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk(head + "�����ռ䲻�㣬��ȷ������ÿ����λ������ " + rewardlist.length + " ��ռ�");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			if (rewardlist[i][2] != 0) {
				//�����޵���
				cm.gainItemPeriod(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
				//java.lang.System.out.println("��");
			} else {
				//�����޵���
				cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
			}
		}
		cm.setBossLog("�������" + sel);
		cm.playerMessage(1, "��ȡ�ɹ���");
		cm.channelMessage(0x18, "������ʱ�佱����" + " : " + "��� " + cm.getChar().getName() + " ��ȡ������ " + condition[sel-1] + " ���ӽ�����");
		if (sel == 5) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}