var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(1112918, 18000, 7),
Array(2431938, 68000),
Array(1132246, 78000),
Array(1122267, 78000),
Array(1032223, 78000),
Array(1113075, 78000),
Array(1122122, 88000),
Array(1122123, 88000),
Array(1122124, 88000),// -
Array(1122125, 88000),//  - 
Array(1122126, 88000),//  -
Array(1102476, 70000), // ŵ�����Ǵ�˹���� // (������)
Array(1102477, 70000), // ŵ�ͺն�÷˹���� // (������)
Array(1102478, 70000), // ŵ�Ϳ������� // (������)
Array(1102479, 70000), // ŵ������������ // (������)
Array(1102480, 70000), // ŵ�Ͱ���̩���� // (������)
Array(1072737, 70000), // ŵ�����Ǵ�˹ѥ // (������)
Array(1072738, 70000), // ŵ�ͺն�÷˹ѥ // (������)
Array(1072739, 70000), // ŵ�Ϳ���ѥ // (������)
Array(1072740, 70000), // ŵ��������ѥ // (������)
Array(1072741, 70000), // ŵ�Ͱ���̩ѥ // (������)
Array(1132169, 70000), // ŵ�����Ǵ�˹���� // (������)
Array(1132170, 70000), // ŵ�ͺն�÷˹���� // (������)
Array(1132171, 70000), // ŵ�Ϳ������� // (������)
Array(1132172, 70000), // ŵ������������ // (������)
Array(1132173, 70000), // ŵ�Ͱ���̩���� // (������)
Array(3994417,90000),// - ��ɫ���� - ��ɫ���ʡ�
Array(3994418,90000),// - ��ɫ���� - ��ɫ���ʡ�
Array(3994419,90000),// - ��ɫ���� - ��ɫ���ʡ�
Array(3994420,90000),// - ��ɫ���� - ��ɫ���ʡ�
Array(3994421,90000),// - ��ɫ���� - ��ɫ���ʡ�
Array(3994422,90000)// - ��ɫ���� - ��ɫ���ʡ�Array(3994423,260)// - ��ɫ���� - ��ɫ���ʡ� 
);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
		cm.sendOk("�ðɣ����㿼��������������ҡ�");
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			text = "#h0#,������������һ�#e#b�ϳ�װ��#n#k,��ѡ������Ҫ�������Ʒ\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				var validtime = "";
				if (itemlist[i][2]!=null) {
					validtime="/ #e"+itemlist[i][2]+"��Ȩ#n";
				}
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# "+validtime+" - #r"+itemlist[i][1]+"#b��ȯ  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
			/*
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#b���#k", 0, 0, 999999);*/
        } else if (a == 1) {
            selects = selection;
			buynum = 1;
            cm.sendYesNo("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "��ȯ��");
        } else if (a == 2) {
            if (cm.getPlayer().getCSPoints(1)>buynum * itemlist[selects][1]) {
                cm.gainNX(1, -buynum * itemlist[selects][1]);
				if (itemlist[selects][2]!=null) {
					cm.gainItem(itemlist[selects][0], buynum, itemlist[selects][2]);	
				} else {
                	cm.gainItem(itemlist[selects][0], buynum);
				}
				cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�ĵ����");
                cm.dispose();
            }
        }
    }//mode
}//f