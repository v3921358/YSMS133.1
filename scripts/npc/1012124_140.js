var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
//140����
Array(1232014, 5000),//ʨ��ʹ������
Array(1302152, 5000),//ʨ���䵶
Array(1312065, 5000),//ʨ����ʿ��
Array(1322096, 5000),//ʨ�����׶�
Array(1402095, 5000),//ʨ��ս���䵶
Array(1412065, 5000),//ʨ��ս����
Array(1422066, 5000),//ʨ�ľ޴�
Array(1432086, 5000),//ʨ�ĳ�ǹ
Array(1442116, 5000),//ʨ��ì
Array(1542015, 5000),//ʨ�� ʨ������

Array(1382104, 5000),//��βս������
Array(1372084, 5000),//��β�������
Array(1212014, 5000),//��β�ڼ�����
Array(1252014, 5000),//èβ�ǻ�ħ����
Array(1452017, 5000),//ħ��֮��
Array(1522018, 5000),//�������ǹ  ˫��
Array(1362019, 5000),//��ѻ֮���������
Array(1332130, 5000),//��ѻ֮��̵�
Array(1242042, 5000),//��ѻ֮��Ů����־֮��
Array(1472122, 5000),//��ѻ֮�����ȭ��

Array(1222014, 5000),//�����꼳ȡ��
Array(1242014, 5000),//���Ů����־֮��
Array(1482084, 5000),//��ݾ�ӥצ
Array(1492085, 5000),//����������
Array(1532018, 5000), //��ݻ�����

//140����
Array(1003172, 4000),//ʨ��ս��ͷ��
Array(1003173, 4000),//ʨ��ս��ͷ��
Array(1003174, 4000),//ʨ��ս��ͷ��
Array(1003175, 4000),//ʨ��ս��ͷ��
Array(1003176, 4000),//ʨ��ս��ͷ��

Array(1052314, 4000),//ʨ��ս�����Ӽ�
Array(1052315, 4000),//
Array(1052316, 4000),//
Array(1052317, 4000),//
Array(1052318, 4000),//

Array(1082295, 4000),//ʨ��ս������
Array(1082296, 4000),//
Array(1082297, 4000),//
Array(1082298, 4000),//
Array(1082299, 4000),//

Array(1072485, 4000),//ʨ��ս��Ь
Array(1072486, 4000),//
Array(1072487, 4000),//
Array(1072488, 4000),//
Array(1072489, 4000),//

Array(1102275, 4000),//ʨ��ս������
Array(1102276, 4000),//
Array(1102277, 4000),//
Array(1102278, 4000),//
Array(1102279, 4000),//

Array(1152108, 4000),//ʨ��ս������
Array(1152110, 4000),//
Array(1152111, 4000),//
Array(1152112, 4000),//
Array(1152113, 4000)//



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
			text = "#b��ܰ��ʾ��#r#z4310036##b����ͨ�����ﰲ�ظ������#k\r\n#h0#,������������һ�#e#b�����̳�#n#k,��ѡ������Ҫ�������Ʒ\r\n#b";
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