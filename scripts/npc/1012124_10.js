var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
                    Array(5062009, 1000),//��������ħ��
					Array(5062002, 800),
					Array(5062500, 950),
					Array(5064000, 4900),
					Array(5064100, 30000),
					Array(5050000, 100),
					Array(2614002, 80000),
					Array(5072000, 100),
					Array(5073000, 500),
					Array(5074000, 500),
					Array(5076000, 800),
					Array(5390000, 1000),
					Array(5390001, 1000),
					Array(5390002, 1000),
					Array(5390003, 1000),
					Array(5390004, 1000),
					Array(5390005, 2000),
					Array(5390006, 5000),
					Array(5390007, 3000),
					Array(5390008, 3000),
					Array(5079001, 1000),
					Array(5079002, 1000),
					Array(5390010, 5000),
					Array(5390018, 5000),
					Array(5520000, 3000),
					Array(5520001, 5000)
					);
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
			text = head + "#h0#,��ã����������ѡ������Ҫ�������Ʒ,���ͼƬ����\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + "#";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r - 1����Ҫ" + itemlist[selects][1] + "���", 0, 0, 999999);
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