
var status = -1;
var text;
var sel;
var time;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����

// ÿ��������������ʱ��
var condition = new Array(30, 60, 120, 240, 360, 420, 540, 620, 720);
var reward = new Array(// �����š�����id������

//���0
Array(1, 4310036, 5),//�����߱�
Array(1, 4001839, 30),
Array(1, 5062009, 5),
Array(1, 5062500, 5),
Array(1, 2049135, 1),//

	// ���2
        Array(2, 2340000, 1),//ף����
	Array(2, 2049135, 1),//
        Array(2, 4001713, 1),
        Array(2, 4001839, 50),
        Array(2, 5062009, 10),//��������ħ��
	Array(2, 5062500, 5),//��ʦ����ħ��
	Array(2, 4310036, 10),//�����߱�
        Array(2, 2450020, 1),

        // ���3
        Array(3, 5062500, 10),//��ʦ����ħ��
        Array(3, 5062009, 20),//��������ħ��
	Array(3, 4310036, 30),//�����߱�
	Array(3, 5030009, 1),//�̵�1�쿨
        Array(3, 2340000, 1),//ף����
	Array(3, 2049135, 1),//
        Array(3, 4001713, 2),
        Array(3, 4001839, 100),
        Array(3, 2450020, 1),



        // ���4
	Array(4, 2049135, 1),//
	Array(4, 4310036, 40),//�����߱�
        Array(4, 5062500, 10),//��ʦ����ħ��
        Array(4, 5062009, 30),//��������ħ��
        Array(4, 4001839, 200),
        Array(4, 5064000, 2),
        Array(4, 2340000, 1),//ף����
	Array(4, 2049135, 1),


        // ���5
	Array(5, 2049135, 2),//
	Array(5, 4310036, 50),//�����߱�
        Array(5, 5062009, 40),//��������ħ��
        Array(5, 5062500, 10),//��ʦ����ħ��
        Array(5, 5064000, 1),
	Array(5, 2340000, 1),
        Array(5, 4001839, 300),//����
        Array(5, 2049135, 2),
	//Array(4, 4310196, 1),
       // Array(5, 4001833, 1),

        // ���6
	Array(6, 2049135, 2),//
	Array(6, 4310036, 60),//�����߱�
        Array(6, 5062009, 50),//��������ħ��
        Array(6, 5062500, 10),//��ʦ����ħ��
        Array(6, 5064000, 2),
	Array(6, 2340000, 1),
        Array(6, 4001839, 300),
       // Array(5, 4001006, 1),

        // ���7
	Array(7, 4310036, 70),//�����߱�
        Array(7, 5062009, 100),//��������ħ��
        Array(7, 5062500, 20),//��ʦ����ħ��
        Array(7, 2049124, 1),//����������
        Array(7, 2049135, 3),
        Array(7, 2340000, 1),
        Array(7, 4001839, 300),
	Array(7, 5064000, 1),

        // ���8
        Array(8, 4310196, 3),
	Array(8, 2049135, 5),//
	Array(8, 4310036, 80),//�����߱�
        Array(8, 5062009, 100),//��������ħ��
        Array(8, 5062500, 30),//��ʦ����ħ��
        Array(8, 5064000, 4),
        Array(8, 2340000, 3),
        Array(8, 2049700, 2),//A��Ǳ�ܾ���
        Array(8, 2049124, 1),//����������

        Array(8, 4001839, 300),//����
	//Array(7, 4001006, 1),
        //Array(8, 4000463, 1),

        // ���9
        Array(9, 4310196, 5),
	Array(9, 2049135, 5),//
	Array(9, 4310036, 90),//�����߱�
        Array(9, 5062009, 150),//��������ħ��
        Array(9, 5062500, 50),//��ʦ����ħ��
        //Array(9, 4000463, 2),//��������
        Array(9, 5064000, 1),
        Array(9, 2340000, 5),
	Array(9, 4001839, 300),
        Array(9, 2049124, 3),
        Array(9, 4001785, 2),

        // ���10

	Array(10, 4310036, 100),//�����߱�
       // Array(10, 2049752, 1),//S��Ǳ�ܾ��� 30%
        Array(10, 2049135, 5),//�������������� 20%
       // Array(10, 4001833, 1),
	//Array(10, 4001485, 1),
        Array(10, 5062009, 200),//��������ħ��
        Array(10, 5062500, 100),//��ʦ����ħ��
        //Array(10, 4000463, 3),
        Array(10, 4310196, 5),
	//Array(10, 4001839, 1),
        Array(10, 4001839, 300),
        Array(10, 4001785, 2)
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
		text = "#e#d��������#r������#dʱ��Ϊ�� #r" + time + "#k #d����#n#k\r\n#e#d��ʾ#n#k��#e#r23 �� 50#n #b��#r #e00 �� 10#n #bʱ�޷���ȡ���߽�����#k\r\n#b���� #e#r23��50#n#b ��ǰ��ȡ����δ��ȡ�Ľ��������������ʧ��#k\r\n#r��ÿ������ʱ��Խ�࣬��ȡ�Ľ���Խ��Ŷ\r\n\r\n";
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
			cm.sendOk("#d��������ǰʱ�䣺 #r" + hour +" ʱ " + minute + " �� " + second + " ��#k\r\n\r\n#e#d��ʾ#n#k��#r23 �� 50 #b��#r 00 �� 10 #bʱ�޷���ȡ���߽�����#k");
			cm.dispose();
			return;
		}
		if (cm.getBossLog("�������" + selection) > 0) {
			cm.sendOk("���������Ѿ���ȡ����");
			cm.dispose();
			return;
		}
		sel = selection;
		text = "\t\t\t\t#e#r- ���� " + condition[selection - 1] + " ���ӽ��� -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "��]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (time < condition[sel-1]) {
			cm.sendOk("����ʱ�䲻�㣬�޷���ȡ��");
			cm.dispose();
			return;
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
		cm.setBossLog("�������" + sel);
		cm.playerMessage(1, "��ȡ�ɹ���");
		cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x03, cm.getC().getChannel(), "������ʱ�佱����" + " : " + "��� " + cm.getChar().getName() + " ��ȡ������ " + condition[sel-1] + " ���ӽ�����"));
		if (sel == 5) {
			cm.finishActivity(120108);
		} else if (sel == 6) {
			cm.setBossLogAcc("��½", -2);
		} else if (sel == 7) {
			cm.finishActivity(120109);
		}
		cm.dispose();
	}
}