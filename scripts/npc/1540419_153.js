var petList = Array(
    Array(5000424, 500000), //�޻���-������
	Array(5000191, 500000),//����
	Array(5000274, 500000),//������
	Array(5000368, 500000)//���ֶ���
	/*Array(5000203, 20000),//������
	Array(5000067, 30000),//����С������
	Array(5000237, 30000), //׹���С����
	Array(5000027, 10000),//��˽�
	Array(5000403, 100000),//Сʿ������
	Array(5000404, 100000),//Сʿ������
	Array(5000287, 50000),
	Array(5000089, 60000),//�����޵ϰ���
	Array(5000090, 60000),//�����޼���
	Array(5000091, 60000),//�����ް�����
	Array(5000243, 50000), //�ۺ���
	Array(5000244, 50000),//����
	Array(5000245, 50000),//��ɫ��
	Array(5000249, 50000), //��С��
	Array(5000250, 50000), //��С��
	Array(5000251, 50000), //��С��
	Array(5000275, 50000), //������
	Array(5000276, 50000),//��������
	Array(5000277, 50000), //����۷�
	Array(5000320, 50000),//������
	Array(5000321, 50000),//�������
	Array(5000322, 50000),//����ţ��
	Array(5000342, 50000), //С������ͷ
	Array(5000343, 50000),//С������ͷ
	Array(5000344, 50000),//С������ͷ
	Array(5000345, 30000),//���յ�
	Array(5000268, 30000),//���ĺ���
	Array(5000290, 100000),//��ʹ���
	Array(5000291, 100000),//��ʹ����
	Array(5000292, 100000),//��ʹ�׶�
	Array(5000294, 50000),//����³��
	Array(5000295, 50000),//��ɫ³��
	Array(5000293, 50000), //����³��
	Array(5000369, 100000),//С����
	Array(5000370, 100000),//С����
	Array(5000371, 100000),//С����
	Array(5000425, 50000), //��Ĩ���
	Array(5000426, 50000),//�����
	Array(5000414, 50000),//С����
	Array(5000409, 100000),//С���
	Array(5000415, 60000),//���� ˹��
	Array(5000416, 60000),//���� �¶���
	Array(5000417, 60000),//���� ����÷��
	Array(5000281, 60000),//New��ͼ˹
	Array(5000282, 60000),//NewĦ˹
	Array(5000283, 60000),//New����
	Array(5000391, 30000),//�ƽ�Ϻ
	Array(5000308, 50000)*/
);
var status = 0;
var petid = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var text = "��ѱ������ô�����ޣ�����������ֻ�£�\r\n";
			for(var key in petList) {
				var pet = petList[key];
				text+="#L"+key+"##i"+pet[0]+":##b#z"+pet[0]+":#\t#r"+pet[1]+"���#k#l\r\n";
			}
			cm.sendSimple(text);
		} else if (status == 1) {
			petid = selection;
			var pet = petList[petid];
			var petname = cm.getItemName(pet[0]);
			var petprice = pet[1];
			cm.sendYesNo("�Ƿ�Ҫ����#r"+petprice+"#k��������#b<"+petname+">#k��");
		} else if (status == 2) {
			if (!cm.haveSpace(5)) {
				cm.sendOk("�������ռ䲻�㣬�޷�����");
				cm.dispose();
				return;
			}
			var idx = petid;
			var pet = petList[idx];
			var petprice = pet[1];
			var itemid = pet[0];
			if (cm.getPlayer().getCSPoints(1)<petprice) {
				cm.sendOk("����㣬����ʧ�ܣ�");
				cm.dispose();
				return;
			}
			cm.gainNX(1, -petprice);
			cm.gainPet(itemid, cm.getItemName(itemid), 1, 0, 100, 30*86400, 0); 
			cm.sendOk("��ϲ���ɹ�������һֻ#b#v"+itemid+"##t"+itemid+"##k��");
			cm.dispose();
		}
	}
}