var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
//Array(5190011, 1),//�����Զ�ιʳ
Array(2049135, 1500),//�������������� 20%
Array(2340000, 1500),
Array(5064000, 3000),
Array(2049323, 3000),	//����ǿ����
Array(2048307, 30000),  //
Array(2046008, 50000), // - �����쵥����������������50%
Array(2046009, 50000), // - �����쵥������ħ��������50%
Array(2046108, 50000), // - ������˫����������������50%
Array(2046109, 50000), // - ������˫������ħ��������50%
Array(2046110, 100000),//������˫����������������100%
Array(2046111, 100000),//������˫������ħ��������100%
Array(2046010, 100000),//�����쵥����������������100%
Array(2046011, 100000),//�����쵥����������������100%
//Array(2046074, 180000),//������������������99%
//Array(2046075, 180000),//������������ħ����99%
//Array(2046149, 180000),//����˫������������99%
//Array(2049750, 3000),//S��Ǳ�ܾ�80%
Array(2070019, 100000),//�߿Ƽ������
Array(2330007, 50000),//�߿Ƽ����׵�
Array(2070023, 50000), //�������
Array(2046577, 100000), //  - ������������������� 100%
Array(2046578, 100000), // - ������������������� 100%
Array(2046579, 100000), // - ��������������ݾ��� 100% 
Array(2046580, 100000) // - ������������������� 100%
//Array(2046763, 100000), // - ����������Ʒ�������� 100%
//Array(2046764, 100000), // - ����������Ʒ�������� 100%
//Array(2046765, 100000), // - ����������Ʒ���ݾ��� 100%
//Array(2046766, 100000)  // - ����������Ʒ�������� 100


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
			text = "#h0#,��ã����������ѡ������Ҫ����ľ���:\r\n\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + "# #z" + itemlist[i] + "##l\r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ����� #r#z" + itemlist[selects][0] + "##k ����\r\n\r\n#r - 1����Ҫ" + itemlist[selects][1] + "���", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "���");
        } else if (a == 3) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�ĵ��");
                cm.dispose();
            }
        }
    }//mode
}//f