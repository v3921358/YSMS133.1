var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(1082543, 1000),//�������Ǵ�˹����
Array(1082544, 1000),//
Array(1082545, 1000),//
Array(1082546, 1000),//
Array(1082547, 1000),//

Array(1132174, 1000),//�������Ǵ�˹����
Array(1132175, 1000),//
Array(1132176, 1000),//
Array(1132177, 1000),//
Array(1132178, 1000),//

Array(1102481, 1000),//�������Ǵ�˹����
Array(1102482, 1000),//
Array(1102483, 1000),//
Array(1102484, 1000),//
Array(1102485, 1000),//

Array(1072743, 1000),//�������Ǵ�˹ѥ
Array(1072744, 1000),//
Array(1072745, 1000),//
Array(1072746, 1000),//
Array(1072747, 1000)//


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
			text = "#b��ܰ��ʾ��#r#z4310058##bֻ��ͨ�������˹���#k\r\n#h0#,������������һ�#r�������#k#n,��ѡ������Ҫ�������Ʒ\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b�����˹��  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#b�����˹��#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "�����˹�ҡ�");
        } else if (a == 3) {
            if (cm.haveItem(4310058,buynum * itemlist[selects][1])) {
                cm.gainItem(4310058, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�������˹�ҡ���ȥ���𱩾������˹׬ȡ�����˹�Ұ�");
                cm.dispose();
            }
        }
    }//mode
}//f