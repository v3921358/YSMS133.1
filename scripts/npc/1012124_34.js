var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
        Array(2610001, 90000),//��ӡ�������
        //Array(2340000, 1500),//ף����
       // Array(2049323, 40000),//����ǿ����
		//Array(2046309, 40000),//��������Ʒ��ǿ����20%
		Array(2046008, 60000),//�����쵥����������������50%
		Array(2046009, 60000),//�����쵥������ħ������50%
		Array(2046108, 60000), //������˫����������������50%
		Array(2046109, 60000),//������˫������ħ��������50%
		Array(2046010, 150000),//�����쵥����������������100%
		Array(2046011, 150000),//�����쵥������ħ��������100%
		Array(2046110, 150000), //������˫����������������100%
		Array(2046111, 150000),//������˫������ħ��������100%
        //Array(2046074, 80000),//������������������99%
        //Array(2046075, 80000),//������������ħ����99%
        //Array(2046149, 80000),//����˫������������99%
        //Array(2049750, 3000),//S��Ǳ�ܾ�80%
		Array(2070019, 300000),//�߿Ƽ������
		Array(2330007, 300000),//�߿Ƽ����׵�
        Array(2070023, 200000) //�������
        //Array(2049124, 1000), //�����پ�
        //Array(2049137, 5000),//������������40%
        //Array(2045212, 50000),//PB˫��ǹ������
        //Array(2613000, 120000),//�ǻ�������������
        //Array(2613001, 120000),//�ǻ�������ħ����
        //Array(2612010, 120000) //�ǻ�˫������������
        /*Array(2610001, 25000),//��ӡ�������
        //Array(2340000, 1500),//ף����
       // Array(2049323, 4000),//����ǿ����
		Array(2046309, 20000),//��������Ʒ��ǿ����20%
		Array(2046008, 25000),//�����쵥����������������50%
		Array(2046009, 25000),//�����쵥������ħ������50%
		Array(2046108, 25000), //������˫����������������50%
		Array(2046109, 25000),//������˫������ħ��������50%
		Array(2046010, 60000),//�����쵥����������������100%
		Array(2046011, 60000),//�����쵥������ħ��������100%
		Array(2046110, 60000), //������˫����������������100%
		Array(2046111, 60000),//������˫������ħ��������100%
        Array(2046074, 80000),//������������������99%
        Array(2046075, 80000),//������������ħ����99%
        Array(2046149, 80000),//����˫������������99%
        //Array(2049750, 3000),//S��Ǳ�ܾ�80%
		Array(2070019, 50000),//�߿Ƽ������
		Array(2330007, 50000),//�߿Ƽ����׵�
        Array(2070023, 20000), //�������
        //Array(2049124, 1000), //�����پ�
        //Array(2049137, 5000),//������������40%
        Array(2045212, 50000),//PB˫��ǹ������
        Array(2613000, 110000),//�ǻ�������������
        Array(2613001, 110000),//�ǻ�������ħ����
        Array(2612010, 110000) //�ǻ�˫������������*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

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
            var selStr = head + "#d#e��ӭʹ�õ���ȯ������Ʒ,��ѡ������Ҫ�ģ�#n#k\r\n";
            selStr += "#d����ǰӵ�е�ȯ��  #r" + cm.getNX(1) + "#k #d��\r\n#����ǰӵ�е���ȯ��  #r" + cm.getNX(2) + "#d#k ��#k\r\n\r\n";
            selStr += "- #e��ѡ����Ҫ������߾���#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + " #r#z" + itemlist[i][0] + "##k ��" + (i >= 2 && i <=4 ? "" : "Ҫ ") + "#r" + itemlist[i][1] + "#k ����ȯ#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "ȷ������һ�� #r#z" + itemlist[seld][0] + "##k�� ����ʹ�õ��� #r" + itemlist[seld][1] + "����ȯ. ");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < itemlist[seld][1] && nx2 < itemlist[seld][1] || cm.getSpace(2) < 1) {
				cm.sendOk(head + "����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���þ�δ�ﵽ����.\r\n2). ����װ����λ����,������.");
			} else {
				cm.gainNX(nx2 < itemlist[seld][1] ? 1 : 2, -itemlist[seld][1]);
				cm.gainItem(itemlist[seld][0], 1);
				cm.sendOk(head + "��ϲ���ɹ�����#z" + itemlist[seld][0] + "#.");
				cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�����" + cm.getItemName(itemlist[seld][0]) + "һ����", 5120012);
				cm.worldSpouseMessage(0x20, "������ȯ�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �õ��þ���" + cm.getItemName(itemlist[seld][0]) + "һ��.");
			}
			cm.dispose();
        }
    }
}