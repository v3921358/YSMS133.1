/*
	����ÿ�ջ�Ծ����ɽ�����ȡ����
*/

var status;


function start () {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == 0) {
		cm.dispose();
		return;
	} else {
		status++;
	}

	if (status == 0) {
		// ���л�Ծ�������������ƣ������ʽ�����Ŀո�����������ID��ÿ�տɽ��ܴ�����ÿ����ɿɻ�û�Ծ��
		var task = new Array(
							Array("ÿ��ǩ��(�����г�)", 13, 120101),
							Array("��װ���Ҿ�", 21, 120102),
							Array("ʹ��ħ��", 23, 120103),
							Array("��������", 23, 120104),
							Array("��ս����", 23, 120105),
							Array("��սƷ����", 21, 120106),
							Array("��ɱ����BOSS", 19, 120107),
							Array("����360����", 20, 120108),
							Array("����720����", 20, 120109),
							Array("������", 25, 120110),
							Array("����ǩ��", 23, 120111),
							Array("�һ�ѩ����", 21, 120112),
							Array("�һ���ȯ", 23, 120113),
							Array("����װ��Ʒ��", 19, 120114)
			);
		var activity = cm.getActivity();
		var isreceive = cm.getRecevieReward();
		var text = "#e��\t\t\t   �� ���ջ�Ծ���� ��   \t\t\t��#n\r\n\r\n";
		if (isreceive == -1) {
			text += "      #e#r��Ծ�ȣ�" + activity;
			if (activity >= cm.getMaxActivity()) {
				text += "(���Ѿ���ȡ�˽������л�Ծ����)";
			} else {
				text += "(������ȡ�½׶ν�������" + cm.getAQNextStageNeed() + "��)";
			}
		} else {
			text += "      " + "#L100#" + "#e#r��Ծ�ȣ�" + activity + "(�����ȡ��" + isreceive + "�׶εĻ�Ծ����)#l";
		}
		text += "#k#n\r\n\r\n   ��������					    ��Ծ��(��)	��ɽ���\r\n\r\n";
		for (var i=0; i<task.length; i++) {
			var completecount = cm.getPlayer().MissionGetFinish(cm.getPlayer().getId(), task[i][2]);
			if (completecount - cm.getAQMaxTimes(task[i][2]) == 0) { // ���������ȫ����ɣ����������������Ϊ��ɫ
				text += "#g";
			}

			// ��������
			text += "   " + task[i][0];

			// �����ʽ
			for (var j = task[i][1]; j > 0; j--) {
				text += " ";
			}
			// �Ƽ��ȼ�
			//text += getStar(task[i][1]);

			// ��Ծ��(��)
			text += cm.getAQActivity(task[i][2]) + "��";
			
			// �����ʽ
			if (cm.getAQActivity(task[i][2]) - 10 < 0) {
				text += " ";
			}

			// �������ɴ���
			text += "       " + completecount +"/" + cm.getAQMaxTimes(task[i][2]) + "��\r\n#k";
		}
		text += "#e\r\n��\t\t\t\t\t\t\t\t\t\t\t��#n";

		cm.sendOkS(text, 2);
	} else if (status == 1) {
		if (selection == 100) {
			if (!cm.haveSpace(2)) {
				cm.sendOk("�������ռ䲻�㣬����������ԡ�");
				cm.dispose();
				return;
			}
			var recevieStage = cm.getRecevieReward();
			cm.gainItem(2431977 + (recevieStage - 1), 1);
			cm.setBossLog("��Ծ�����" + recevieStage);
			cm.sendOk("#r��" + recevieStage + "�׶λ�Ծ�������ȡ�ɹ����쿴����ʲô�ö�����~");
			cm.worldMessage(0x18, "[��Ծ��ϵͳ] : ��ϲ " + cm.getChar().getName() + " ��� " + recevieStage + " �׶λ�Ծ�ȳɹ���ȡ�����");
		}
		cm.dispose();
	}
}