var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(2049323, 12),
//Array(2049124, 3),
//Array(2049116, 3),
//Array(2049137, 15),
//Array(2049136, 12),
Array(2049135, 5),
Array(2049116, 2),
Array(2049124, 2),
Array(2049750, 30),
Array(2040874,50),// - �������׹������� - Ϊ���������������������ԡ�\n�ɹ��ʣ�100%������������+4
Array(2040875,50),//  - ��������ħ������ - Ϊ��������ħ�����������ԡ�\n�ɹ��ʣ�100%��ħ��������+4
Array(2613000,50),//  - �ǻ����������������� - Ϊ���������������������������ԡ�
Array(2613001,50),//  - �ǻ�������ħ�������� - Ϊ����������������ħ�������ԡ�
Array(2612010,50),//  - �ǻ�˫���������������� - Ϊ˫�������������������������ԡ�
//Array(2047818, 80), // - ���˵�˫����������������100% - ��˫�������ϸ������������������ԡ�
//Array(2046996, 80), // - ���˵ĵ�����������������100% - �Ե����������ӹ�����������ԡ�
//Array(2046997, 80) // - ���˵ĵ�������ħ������100% - �Ե�����������ħ��������ԡ�
Array(2046913,30), // �������嵥���������������� 100% // Ϊ�����������ӹ��������ԡ�
Array(2046914,30), // �������嵥������ħ������ 100% // Ϊ������������ħ�����������ԡ�
Array(2046173,30), // ��������˫���������������� 100% // Ϊ˫���������ӹ��������ԡ�
Array(2046577,20), // ������������������� 100% // Ϊ���������������ԡ�
Array(2046578,20), // ������������������� 100% // Ϊ���������������ԡ�
Array(2046579,20), // ��������������ݾ��� 100% // Ϊ���������������ԡ�
Array(2046580,20), // ������������������� 100% // Ϊ���������������ԡ�
Array(2046763,30), // ����������Ʒ�������� 100% // Ϊ��Ʒ�����������ԡ�
Array(2046764,30), // ����������Ʒ�������� 100% // Ϊ��Ʒ�����������ԡ�
Array(2046765,30), // ����������Ʒ���ݾ��� 100% // Ϊ��Ʒ�����������ԡ�
Array(2046766,30)// ����������Ʒ�������� 100% // Ϊ��Ʒ�����������ԡ�
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
			text = "#h0#,������������һ�#e#b��Ʒ����#n#k,��ѡ������Ҫ�������Ʒ\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#bԪ��  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#bԪ��#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "Ԫ����");
        } else if (a == 3) {
            if (cm.haveItem(4001485,buynum * itemlist[selects][1])) {
                cm.gainItem(4001485, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻��Ԫ����");
                cm.dispose();
            }
        }
    }//mode
}//f