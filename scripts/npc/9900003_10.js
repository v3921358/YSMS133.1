var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
					Array(5380000, 18000),
					Array(5080001, 3000),
					//Array(5152211, 2000),
					//Array(5150135, 2000),
					Array(5062000, 500),
					Array(5062002, 1000),
					Array(5062500, 1350),
					Array(5062010, 2000),
					Array(5062009, 1250),
					Array(5062800, 1000),
					Array(2501000, 100000),
					Array(5062400, 50000),
					Array(2049405, 100000),
					Array(2048309, 3000),//����Ǳ�ܾ�
					Array(5064003, 5000),//���汣����
					Array(5064000, 1500),//������
					Array(5064100, 6000),//������
					Array(5530268, 10000),//���⸽��Ǳ�ܿ�ӡ
					Array(5530269, 20000),//��⸽��Ǳ�ܿ�ӡ
					Array(2614002, 148000),//����ʯͷ
					Array(5072000, 500),
					Array(5073000, 600),
					Array(5074000, 700),
					Array(5076000, 800),
					Array(5390000, 900),
					Array(5390001, 1000),
					Array(5390002, 1000),
					Array(5390003, 1000),
					Array(5390004, 1000),
					Array(5390005, 1000),
					Array(5390006, 2000),
					Array(5390007, 1000),
					Array(5390008, 1000),
					Array(5079001, 1000),
					Array(5079002, 1000),
					Array(5390010, 1000),
					Array(5390018, 1000),
					Array(4001839, 25),
					Array(5520000, 8000),//����
					Array(5520001, 10000)//����
					);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			text = "#h0#,��ã����������ѡ������Ҫ�������Ʒ,���ͼƬ����\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":# ";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "���", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "�����");
        } else if (a == 3) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�ĵ����");
                cm.dispose();
            }
        }
    }//mode
}//f