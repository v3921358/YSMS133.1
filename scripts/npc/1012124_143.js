var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(1353203, 500),//������100������
Array(1552115, 500),
Array(1352808, 500),
Array(1092049, 500), 
Array(1352503, 500),
Array(1352203, 500), 
Array(1352213, 500), 
Array(1352223, 500), 
Array(1352233, 500), 
Array(1352243, 500), 
Array(1352253, 500), 
Array(1352263, 500), 
Array(1352273, 500), 
Array(1352283, 500), 
Array(1352293, 500), 
Array(1352903, 500), 
Array(1352913, 500), 
Array(1352923, 500), 
Array(1352953, 500), 
Array(1352963, 500), 
Array(1353004, 500), 
Array(1352973, 500), 
Array(1352943, 500), 
Array(1352933, 500), 
Array(1352703, 500)
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
			text = "#b��ܰ��ʾ��#r#z4000487##bֻ��ͨ����������ѩ�޻��#k\r\n#h0#,������������һ�#e#bְҵ����#n#k,��ѡ������Ҫ�������Ʒ\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b��Ӱ��  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ���������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#b��Ӱ��#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("���빺��" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + "��Ӱ�ҡ�");
        } else if (a == 3) {
            if (cm.haveItem(4000487,buynum * itemlist[selects][1])) {
                cm.gainItem(4000487, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�İ�Ӱ�ҡ���ȥ����ѩ��׬ȡ��Ӱ�Ұ�");
                cm.dispose();
            }
        }
    }//mode
}//f