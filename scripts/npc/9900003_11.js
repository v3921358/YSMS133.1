var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(4001839, 30),//����
Array(5062009, 3000),
Array(5062010, 2000),
Array(5062500, 3000),
Array(2500000, 100000),
Array(2501000, 300000),
Array(5050000, 200),
Array(5050001, 400),
Array(5050002, 400),
Array(5050003, 400),
Array(2049405, 30000),
Array(2048313, 30000),
Array(5530268, 3000),
Array(5530269, 6000),
Array(2048305, 3000),
Array(5064003, 6000),
Array(5050000, 1000),
Array(5050001, 1200),
Array(5050002, 1800),
Array(5050003, 3000),
Array(5050004, 4500)

/*
Array(2049323, 5000),	//����ǿ����
Array(2046008, 50000), // - �����쵥����������������50%
Array(2046009, 50000), // - �����쵥������ħ��������50%
Array(2046108, 50000), // - ������˫����������������50%
Array(2046109, 50000), // - ������˫������ħ��������50%
Array(2046110, 120000),//������˫����������������100%
Array(2046111, 120000),//������˫������ħ��������100%
Array(2046010, 120000),//�����쵥����������������100%
Array(2046011, 120000),//�����쵥����������������100%
Array(2046170, 120000),//Ǳ��˫����������ǿ����50%
Array(2046907, 120000),//Ǳ��������������ǿ����50%
Array(2046908, 120000),//Ǳ����������ħ��ǿ����50%
Array(2046577, 100000), //  - ������������������� 100%
Array(2046578, 100000), // - ������������������� 100%
Array(2046579, 100000), // - ��������������ݾ��� 100% 
Array(2046580, 100000), // - ������������������� 100%
Array(2046763, 100000), // - ����������Ʒ�������� 100%
Array(2046764, 100000), // - ����������Ʒ�������� 100%
Array(2046765, 100000), // - ����������Ʒ���ݾ��� 100%
Array(2046766, 100000)  // - ����������Ʒ�������� 100

*/

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
			text = "#h0#,��ã����������ѡ������Ҫ�������Ʒ:\r\n\r\n#b";
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