
var status = -1;
var text;
var sel;
var rmb;
var aaa ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

// ÿ���������ĳ�ֵ���
var condition = new Array(1, 10, 30, 50, 100, 200, 300, 500, 800, 1000);
var reward = new Array(// �����š�����id������
					// ���1
					Array(1, 1112793, 1),
					Array(1, 3010118, 1),
					Array(1, 2340000, 1),
					Array(1, 2049137, 1),

					// ���2
					Array(2, 2430865, 1, 1), //VIP
					Array(2, 5062002, 10),
					Array(2, 5064000, 10),
					Array(2, 2340000, 2),
					Array(2, 2049137, 3),
					Array(2, 4001785, 1),

					// ���3
					Array(3, 5062002, 10),
					Array(3, 5064000, 15),
					Array(3, 2340000, 5),
					Array(3, 2049137, 4),
					Array(3, 3010535, 1),
					Array(3, 5073000, 50),
					Array(3, 5390004, 10),
					Array(3, 4001785, 1),

					// ���4
					Array(4, 5062002, 10),					
					Array(4, 5064000, 20),
					Array(4, 2340000, 5),
					Array(4, 3010678, 1),
					Array(4, 2049137, 5),
					Array(4, 5073000, 80),
					Array(4, 5390004, 20),
					Array(4, 4001785, 5),

					// ���5
					Array(5, 1102709, 1),
					
					//Array(5, 3010417, 1),
					//Array(5, 3994417, 1),
					Array(5, 5062002, 20),
					Array(5, 5064000, 25),
					Array(5, 4310036, 3000),
					Array(5, 2340000, 10),
					Array(5, 2049137, 5),
					Array(5, 5073000, 100),
					Array(5, 5390004, 20),
					Array(5, 5390018, 5),
					Array(5, 4001785, 10),

					// ���6
					
					//Array(6, 3994418, 1),
					
					Array(6, 5062002, 20),	
					Array(6, 5062500, 20),
					Array(6, 5064000, 30),
					Array(6, 2048307, 1),
					Array(6, 4310036, 3000),
					Array(6, 2340000, 10),
					Array(6, 2049137, 10),
					Array(6, 5390004, 30),	
					Array(6, 5390018, 10),
					Array(6, 4001785, 10),

					// ���7
					//Array(7, 2432069, 1),
					//Array(7, 3010416, 1),
					//Array(7, 3994419, 1),
					Array(7, 2430865, 1, 30), //VIP
					Array(7, 5062002, 30),
					Array(7, 5062500, 30),
					Array(7, 5064000, 35),
					Array(7, 2048307, 1),
					Array(7, 4310036, 6000),
					Array(7, 2340000, 15),
					Array(7, 2049137, 15),
					Array(7, 5390004, 30),
					Array(7, 5390018, 15),
					
					// ���8
					//Array(8, 2431938, 1),
					//Array(8, 2432069, 1),
					//Array(8, 3010876, 1),
					//Array(8, 2430226, 1),
					//Array(8, 3994417, 1),
					//Array(8, 3994418, 1),
					//Array(8, 3994419, 1),
					Array(8, 5062002, 40),
					Array(8, 5062500, 40),
					Array(8, 5064000, 40),
					Array(8, 2048307, 1),
					Array(8, 4310036, 6000),
					Array(8, 2340000, 15),
					Array(8, 2049137, 20),
					Array(8, 5390004, 30),
					Array(8, 5390018, 20),
					
					// ���9
					//Array(9, 2431993, 1),
					//Array(9, 3994417, 1),
					//Array(9, 3994418, 1),
					//Array(9, 3994419, 1),
					//Array(9, 3994420, 1),
					//Array(9, 3994421, 1),
					Array(9, 5062002, 60),
					Array(9, 5062500, 60),
					Array(9, 2048307, 1),
					Array(9, 2049750, 5),
					Array(9, 2340000, 20),
					Array(9, 5064000, 50),
					Array(9, 4310036, 15000),
					Array(9, 2049137, 30),
					//Array(9, 2430865, 1, 60), //VIP
					Array(9, 5390018, 30),
					Array(9, 4001715, 1),
					
					// ���10
					Array(10, 2046829, 10),
					//Array(10, 2431991, 1),
					Array(10, 2049405, 1),
					Array(10, 3994417, 1),
					Array(10, 5062002, 100),
					Array(10, 5062500, 100),
					Array(10, 5064000, 50),
					Array(10, 2340000, 30),
					Array(10, 4310036, 20000),
					Array(10, 2049137, 40),
					Array(10, 5390018, 40),
					Array(10, 4001715, 2)
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

	rmb = cm.getRMB();
	var curlevel = -1;

	if (status == 0) {
		text = head + "���ۼƳ�ֵ���Ϊ�� #r" + rmb + "#k Ԫ\r\n\r\n";
		for (var i = 1; i <= condition.length; i++) {
			text += "#b#L" + i + "#"+aaa+" �ۼƳ�ֵ #r" + condition[i-1] + " #bԪ����";
			if (cm.getBossLogAcc("�ۼƳ�ֵ���" + i) == -1) {
				text += "(����ȡ)";
				curlevel = curlevel == -1 ? i : curlevel;
			}
			text += "#l\r\n";
		}
		text += "#k";
		cm.sendSimple(text);
	} else if (status == 1) {
		sel = selection;
		text = head + "#e#r- �ۼƳ�ֵ" + condition[selection - 1] + "Ԫ���� -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "��]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (cm.getBossLogAcc("�ۼƳ�ֵ���" + sel) == -1) {
			cm.sendOk(head + "���������Ѿ���ȡ����");
			cm.dispose();
			return;
		}
		if (rmb < condition[sel-1]) {
			cm.sendOk("�ۼƳ�ֵ���㣬�޷���ȡ��");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				if (reward[i][3]==null)
					reward[i][3]=-1;
				rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk(head + "�����ռ䲻�㣬��ȷ������ÿ����λ������ " + rewardlist.length + " ��ռ�");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			if (rewardlist[i][0]==2430865) {
				cm.gainItem(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
			} else {
				cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
			}
		}
		cm.setBossLogAcc("�ۼƳ�ֵ���" + sel, -2);
		cm.playerMessage(1, "��ȡ�ɹ���");
		cm.channelMessage(0x18, "���ۼƳ�ֵ������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ���ۼƳ�ֵ " + condition[sel-1] + " Ԫ������");
		cm.dispose();
	}
}