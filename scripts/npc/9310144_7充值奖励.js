var status = -1;
var text;
var sel;
var rmb;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

// ÿ���������ĳ�ֵ���
var condition = new Array(10, 50, 100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000);
var reward = new Array( // �����š�����id������
	// ���1 10Ԫ
	Array(1, 3015144, 1),//����Ļ�������
	//Array(1, 3015049, 1), //��ɫ���û���
	//Array(1, 3015058, 1),//��ɫ���û���
	Array(1, 2430069, 1),//��ĸ�̱���
	Array(1, 1112793, 1),
	Array(1, 3010118, 1),
	Array(1, 2340000, 1),
	Array(1, 2049137, 1),
	Array(1, 4001839, 100), //����
	Array(1, 4001785, 2), //���ӽ�500W

	// ���2 50Ԫ
	//Array(2, 3015197, 1), //��ҫð�յ���
	Array(2, 3015084, 1),//��֮��ʿ��
	Array(2, 3015080, 1),//����������
	//Array(2, 3015078, 1),//��������6
	Array(2, 2430069, 5),//��ĸ�̱���
	Array(2, 2431945, 1),//140��������
        Array(2, 5062009, 50), //
	Array(2, 5062500, 50),
        Array(2, 2049323, 5),
        Array(2, 2049750, 1),
        Array(2, 2340000, 5),
        //Array(2, 2433654, 1),
        Array(2, 4001006, 20),//������ë
        Array(2, 4001839, 500), //����


	// ���3 100Ԫ
	//Array(3, 3015181, 1),//����ҹ֮������
	Array(3, 3010830, 1), // ����������
	Array(3, 3015087, 1),//��ͥ�۲�����
	Array(3, 3015083, 1),//�ȶ����������
	Array(3, 2430069, 10),//��ĸ�̱���
	Array(3, 2431945, 1),//140��������
	Array(3, 2431944, 1),//140��������
        Array(3, 5062009, 100),
	Array(3, 5062500, 100),
        //Array(3, 2049323, 30),//�߼�װ��ǿ������
        Array(3, 2340000, 10),
        Array(3, 5064000, 10),
        Array(3, 4001006, 10),//������ë
	Array(3, 4001839, 1000), //����
	Array(3, 4001785, 10), // ���ӽ�500W ���
	Array(3, 5073000, 30), //��������



	// ���4 200Ԫ
	Array(4, 3015178, 1),//ө��֮ɭ����
	//Array(4, 3015177, 1),//��˾��������
	//Array(4, 3015182, 1), //����������
	Array(4, 3015109, 1),//����������
	Array(4, 2430069, 20),//��ĸ�̱���
	Array(4, 2431945, 3),//140��������
        Array(4, 5062009, 200),
	Array(4, 5062500, 200),
        Array(4, 2049323, 10),//�߼�װ��ǿ������					
        Array(4, 5064000, 20),
        Array(4, 2340000, 15),
        Array(4, 2431354, 1),
        Array(4, 2049750, 1),
        Array(4, 4001006, 20),//������ë
        Array(4, 3010417, 1),
	Array(4, 4001839, 2000), //����					
	Array(4, 5390004, 50), //��������
	Array(4, 4001715, 1), // ���ӽ�1 E


	// ���5 300Ԫ
	Array(5, 1112915, 1), //������ָ
	Array(5, 3015142, 1),//��ʿ��������
	//Array(5, 3015263, 1),//�����ܻ�������
	Array(5, 3015264, 1),//���ȵ���ζ��������
	Array(5, 3015210, 1),//����������
	//Array(5, 3015257, 1),//����ͥԺ����
	Array(5, 2430069, 20),//��ĸ�̱���
       // Array(5, 2432255, 1),
        Array(5, 5062009, 300),
	Array(5, 5062500, 300),
	Array(5, 2049323, 20),
        Array(5, 5064000, 25),

        Array(5, 2340000, 20),
        Array(5, 2431354, 1),
        Array(5, 4001006, 30),//������ë
        Array(5, 3012025, 1),

	Array(5, 5390004, 80), //��������

	Array(5, 4001715, 2), // ���ӽ�1E

	// ���6 500Ԫ

	Array(6, 3015183, 1),//��ˮ�鱳������
	//Array(6, 3015234, 1),//����ĺ�̲�ɶ�
	Array(6, 3015258, 1), //�ö�үү��������
	Array(6, 3015120, 1),//��Ů����ͷ��ս
	Array(6, 2430069, 20),//��ĸ�̱���
        Array(6, 5062009, 500),	
        Array(6, 2049323, 30),
        Array(6, 5062500, 500),
        Array(6, 5064000, 30),
        Array(6, 2431354, 2),
        Array(6, 2340000, 30),
        Array(6, 4001006, 50),	//������ë
        Array(6, 3010621, 1),
	Array(6, 4001839, 5000), //����
	Array(6, 5390018, 50), //��������
	Array(6, 4001715, 3), // ���ӽ�1E


	// ���7 1000Ԫ
        //Array(7, 2432507, 1), //
	Array(7, 2432069, 1), //��������
	//Array(7, 3015303, 1), //"�Ҹ��Ļ�Ь����
	Array(7, 3015049, 1),  //��ɫ���û���
	Array(7, 3010832, 1), // ̫������
	Array(7, 3010416, 1), // ���ް԰�ѩ������
	Array(7, 3015177, 1), //��˾��������
	Array(7, 3015274, 1),//�������Ȫ����
	Array(7, 2430069, 30),//��ĸ�̱���
        Array(7, 5062009, 1000),
        Array(7, 2049323, 50),
        Array(7, 5062500, 1000),
        Array(7, 5064000, 35),
        Array(7, 4001006, 100),//������ë
        Array(7, 2340000, 35),	
        Array(7, 2433695, 3),
	Array(7, 3994417, 1), // ��ɫ����
	Array(7, 3994418, 1), // ��ɫ����
	Array(7, 3994419, 1), // ��ɫ����
	Array(7, 4001839, 8000), //����
	Array(7, 4001715, 5), // ���ӽ�1E


	// ���8 1500Ԫ
        //Array(8, 2432506, 1),
        Array(8, 2432341, 1),//³����˹��������
	Array(8, 2432069, 1), // ��������
	//Array(8, 3015227, 1),//��Ī��Ұ������
	Array(8, 3015236, 1),//�����ܻ�������
	Array(8, 3015133, 1),//�����������
	Array(8, 3015134, 1), //����ԡ����
	Array(8, 3015129, 1),//��ɫ��������
	Array(8, 2430069, 30),//��ĸ�̱���
        //Array(8, 3010658, 1),//�������ϱ�����
        Array(8, 5062009, 1000),
        Array(8, 2049323, 100),
        Array(8, 5062500, 1000),
        Array(8, 5064000, 40),
        Array(8, 3015075, 1),
        Array(8, 2340000, 40),
        Array(8, 4001006, 200),//������ë
        Array(8, 2433695, 3),
	Array(8, 3994420, 1), //��ɫ����
	Array(8, 3994421, 1), // ��ɫ����
	Array(8, 3994422, 1), //��ɫ����
	Array(8, 4001839, 10000), //����
	Array(8, 5390018, 80), // ����������
	Array(8, 4001716, 1), //���ӽ�10E



	// 9 2000Ԫ
        Array(9, 2432069, 1),//�������߽�����
        Array(9, 2432341, 1),//³����˹��������
        //Array(9, 1032219, 1),//����֮�񻰶���
	//Array(9, 3015224, 1),//�λ�ˮ��������
	//Array(9, 3015225, 1), //�ʹ���һ����������
	Array(9, 3010461, 1), //����ר���¹�����ǧ��
	Array(9, 3015143, 1),//�޴��ɫ����걾����
	Array(9, 3015131, 1),//�޴����������
	Array(9, 3015132, 1),//������ɳ����
	Array(9, 2430069, 30),//��ĸ�̱���
        Array(9, 5062009, 1000),
        Array(8, 2049323, 100),
        Array(9, 5062500, 1000),
        Array(9, 2049349, 1),
	Array(9, 2340000, 50),
        Array(9, 5064000, 50),
        Array(9, 2049137, 30),
        Array(9, 4001006, 300),//������ë
        //Array(9, 3015051, 1),//���ްԹ��ʾ�������
       // Array(9, 3010853, 1),//�Ļ�ŭ������
	Array(9, 3994418, 1), //  ��ɫ����
	Array(9, 3994417, 1), // ��ɫ����
	Array(9, 3994419, 1), // ��ɫ����
	Array(9, 3994420, 1), // ��ɫ����
	Array(9, 3994421, 1), // ��ɫ����
	Array(9, 3994422, 1), //��ɫ����
	Array(9, 4001839, 15000), //����
	Array(9, 5390018, 100), // ��������
	Array(9, 4001716, 1), // ���ӽ�10E

	//10 3000Ԫ
        //Array(10, 2046829, 5),
	Array(10, 2430865, 1, 30), //VIP
	Array(10, 1032219, 1),//����֮�񻰶���
        Array(10, 2432341, 2),//³����˹��������
	Array(10, 2432069, 2), // ��������
	Array(10, 3015328, 1),//"ð�յ��綯�³�����
	//Array(10, 3015349, 1),//"����ҡҡ������
	Array(10, 3015193, 1),//��ѱ���ľ�������
	Array(10, 3010070, 1), // ���ް�Ʒ�˱�
	Array(10, 3012024, 1), // ɳ̲��������
	Array(10, 2430069, 30),//��ĸ�̱���
        Array(10, 2047978, 10),
        Array(10, 3010936, 1),//������¥����
       // Array(10, 3010894, 1),//һ������������
        Array(10, 2049122, 20),
	//Array(10, 2049124, 50), // �������
	Array(10, 5064000, 100), // ����
	//Array(10, 2340000, 100), // ף��
	//Array(10, 2049137, 80), // ��������
	//Array(10, 4310036, 5000), // ������
	//Array(10, 2049116, 50), // ǿ��
        Array(10, 2049323, 100),
	Array(10, 4001006, 400),//������ë

	Array(10, 5530457, 3), // ר����Ʒ������
	Array(10, 5530458, 3), // ר����Ʒħ����
	Array(10, 3994417, 2), //  ��ɫ����
	Array(10, 3994418, 2), // ��ɫ����
	Array(10, 3994419, 2), // ��ɫ����
	Array(10, 3994420, 2), // ��ɫ����
	Array(10, 3994421, 2), // ��ɫ����
	Array(10, 3994422, 2), // ��ɫ����
	Array(10, 4001839, 20000), //����
	Array(10, 5062009, 1000), // ����ħ��
	//Array(10, 4310030, 5000), // �˶���

	Array(10, 5062500, 1000), // ��ʦ����

	//Array(10, 3010423, 1), // Ģ������

	//Array(10, 3010876, 1), // ��������
	//Array(10, 1672027, 1), // ��������
	Array(10, 1142540, 1), // �ƽ�ѫ��
	Array(10, 5390018, 100), // ��������
	Array(10, 4001716, 1), // ���ӽ�10


	//11 5000Ԫ
	Array(11, 1142742, 1),
        Array(11, 2432341, 3),
	Array(11, 2432069, 3), // ��������
	//Array(11, 3015304, 1),//��������ˮ��
	Array(11, 3015234, 1),//���꺣̲�ɶ�
	Array(11, 3015303, 1),//�Ҹ��Ļ�Ь����
	Array(11, 3016000, 1),
	Array(11, 3010660, 1), //�λù����Ǳ�
	Array(11, 3010696, 1), // ���Ѽ
	Array(11, 3012022, 1), // С������
	Array(11, 3015002, 1), //Ħ����
	Array(11, 2430069, 30),//��ĸ�̱���
	Array(11, 2049323, 100),
	Array(11, 5530457, 5), // ר����Ʒ������
	Array(11, 5530458, 5), // ר����Ʒħ���� 

        Array(11, 4001006, 1000),//������ë
	Array(11, 3994420, 3), // ��ɫ����
	Array(11, 3994417, 3), // ��ɫ����
	Array(11, 3994418, 3), // ��ɫ����
	Array(11, 3994419, 3), // ��ɫ����
	Array(11, 3994421, 3), // ��ɫ����
	Array(11, 3994422, 3), // ��ɫ����
	Array(11, 4001839, 30000), //����
	Array(11, 5062500, 1000), // ��ʦ����
	Array(11, 5064000, 200), // ����
	Array(11, 2340000, 200), // ף��
	Array(11, 2049137, 100), // ��������
	Array(11, 1182016, 1), //�ƽ�ȵ�������
	Array(11, 5062009, 1000), //����ħ��
	Array(11, 5390018, 100), //��������
	Array(11, 4001716, 2) // ���ӽ�10E


	/*//12 5000Ԫ
	Array(12, 4310129, 3000), //��������Ӳ��
	Array(12, 2430865, 1, 60), //VIP
	Array(12, 2432069, 10), // ��������
	Array(12, 2049323, 200), // ����
	Array(12, 2049405, 10), // ð����Ǳ�ܾ�
	Array(12, 3994421, 6), // ��ɫ����
	Array(12, 3994417, 6), // ��ɫ����
	Array(12, 3994418, 6), // ��ɫ����
	Array(12, 3994419, 6), // ��ɫ����
	Array(12, 3994420, 6), // ��ɫ����
	Array(12, 3994422, 6), //��ɫ����
	Array(12, 2432353, 100), //����ת��Ʊ
	Array(12, 4001839, 100000), //����
	Array(12, 5062002, 500), // �߼�ħ��
	Array(12, 5062500, 500), // ��ʦ����
	Array(12, 5064000, 500), // ����
	Array(12, 2340000, 500), // ף��
	Array(12, 5062009, 500), // ����ħ��
	Array(12, 3010660, 1), //�λù����Ǳ�
	Array(12, 3010696, 1), // ���Ѽ
	Array(12, 3010955, 1), // ���˽�����
	Array(12, 3010938, 1), // ���Ѫ��Ů������
	Array(12, 3010821, 1), // ͯ���������
	Array(12, 3015009, 1), // Сƻ������
	Array(12, 1142788, 1), // ��������ѫ��
	Array(12, 3012022, 1), // С������
	Array(12, 3015002, 1), //Ħ����
	Array(12, 2049116, 300), // ǿ��
	Array(12, 4310036, 20000), // ������
	Array(12, 5530457, 5), //ר����Ʒ����
	Array(12, 5530458, 5), //ר����Ʒħ��
	Array(12, 2049137, 300), // ��������
	Array(12, 1142593, 1), // 13������ѫ��
	Array(12, 3015014, 1), //ǧ��һ������
	Array(12, 5390018, 500), // ��������
	Array(12, 4001716, 3)*/
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

	rmb = cm.getTotalRMB();
	var curlevel = -1;

	if (status == 0) {
		text = "���ۼƳ�ֵ���Ϊ�� #r" + rmb + "#k Ԫ\r\n\r\n#r��ѡ��#b\r\n";
		for (var i = 1; i <= condition.length; i++) {
			text += "#b#L" + i + "#" + aaa + " �ۼƳ�ֵ #r" + condition[i - 1] + " #bԪ����";
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
		text = "\t\t\t\t#e#r- �ۼƳ�ֵ" + condition[selection - 1] + "Ԫ���� -#k#n\r\n\r\n";
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == selection) {
				text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "#[" + reward[i][2] + "��]\r\n";
			}
		}
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (cm.getBossLogAcc("�ۼƳ�ֵ���" + sel) == -1) {
			cm.sendOk("���������Ѿ���ȡ����");
			cm.dispose();
			return;
		}
		if (rmb < condition[sel - 1]) {
			cm.sendOk("�ۼƳ�ֵ���㣬�޷���ȡ��");
			cm.dispose();
			return;
		}
		var rewardlist = new Array();
		for (var i = 0; i < reward.length; i++) {
			if (reward[i][0] == sel) {
				if (reward[i][3] == null)
					reward[i][3] = -1;
				rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
			}
		}
		if (!cm.canHoldSlots(rewardlist.length)) {
			cm.sendOk("�����ռ䲻�㣬��ȷ������ÿ����λ������ " + rewardlist.length + " ��ռ�");
			cm.dispose();
			return;
		}
		for (var i = 0; i < rewardlist.length; i++) {
			if (rewardlist[i][0] == 2430865) {
				cm.gainItem(rewardlist[i][0], rewardlist[i][1], rewardlist[i][2]);
			} else {
				cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
			}
		}
		cm.setBossLogAcc("�ۼƳ�ֵ���" + sel, -2);
		cm.playerMessage(1, "��ȡ�ɹ���");
		cm.channelMessage(0x18, "���ۼƳ�ֵ������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ���ۼƳ�ֵ " + condition[sel - 1] + " Ԫ������");
		cm.dispose();
	}
}