var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
//�سɾ�
Array(2043003, 500),//���ֽ������سɾ�
Array(2043103, 500),//���ָ������سɾ�
Array(2043203, 500),//���ֶ��������سɾ�
Array(2043303, 500),//�̽������سɾ�
Array(2043703, 500),//���ȹ����سɾ�
Array(2043803, 500),//���ȹ����سɾ�
Array(2044003, 500),//˫�ֽ������سɾ�
Array(2044019, 500),//˫�ֽ�ħ���سɾ�
Array(2044103, 500),//˫�ָ������سɾ�
Array(2044203, 500),//˫�ֶ��������سɾ�
Array(2044303, 500),//ǹ�����سɾ�
Array(2044403, 500),//ì�����سɾ�
Array(2044503, 500),//�������سɾ�
Array(2044603, 500),//�󹥻��سɾ�
Array(2044703, 500),//ȭ�׹����سɾ�
Array(2044815, 500),//ָ�ڹ����سɾ�
Array(2044908, 500),//��ǹ�����سɾ�

//�������
Array(2431354, 80000),//��ѡ�ǻ���������
Array(2049135, 100),//�������������� 20%
Array(2049137, 500),//�������������� 40%
Array(2046763, 50000),//����������Ʒ�������� 100%
Array(2046764, 50000),//����������Ʒ�������� 100%
Array(2046765, 50000),//����������Ʒ���ݾ��� 100%
Array(2046766, 50000),//����������Ʒ�������� 100%
Array(2046577, 50000),//������������������� 100%
Array(2046578, 50000),//������������������� 100%
Array(2046579, 50000),//��������������ݾ��� 100%
Array(2046580, 50000)//������������������� 100%

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
			text = "#b��ܰ��ʾ��#r#z4310036##b����ͨ���������ﰲ�ػ��#k\r\n#h0#,������������һ�#e#b�����̳�#n#k,��ѡ������Ҫ�������Ʒ\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b�����߱�  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#b�����߱�#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "�����߱ҡ�");
        } else if (a == 3) {
            if (cm.haveItem(4310036,buynum * itemlist[selects][1])) {
                cm.gainItem(4310036, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�������߱ҡ�");
                cm.dispose();
            }
        }
    }//mode
}//f