/*
	��Ծ����� 1��
*/

var status;
var reward = Array(
					Array(2001505, 10, 100),	// ����ҩˮ
					Array(2001556, 10, 50),		// ���ΰٲ�ҩ
					Array(2431738, 1, 1),		// ����ħ��
					Array(5062002, 1, 5),           // �߼�����ħ��
					Array(5064000, 1, 1),           // ��������
					Array(2003524, 1, 5),		// �ϵ�Ӣ����ҩ - ���������������˼����������ɵ�����ҩˮ��ʹ�ú���2Сʱ�ڹ�������ħ������������18
					Array(2003527, 1, 5)		// �ϵ�ף����ҩ - ���������������˼����������ɵ�����ҩˮ��ʹ�ú���2Сʱ�����������ݡ�����������������40���ƶ��ٶȺ���Ծ����ߵ����ֵ��
					);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0) {
		im.dispose();
		return;
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
	}

	if (status == 0) {
		if (!im.haveSpace(2)) {
			im.sendOk("�������ռ䲻�㣬��������ٴ�");
			im.dispose();
			return;
		}
		var index = Math.floor(Math.random() * reward.length);
		var quantity = Math.floor(Math.random() * reward[index][2] + reward[index][1]);
		im.gainItem(2431977, -1);
		im.gainItem(reward[index][0], quantity);
		im.dispose();
	}
}