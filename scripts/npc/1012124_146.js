var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var itemlist = Array(
Array(2431965, 500),
Array(2431966, 500),
Array(2432153, 500),
Array(2431967, 500),
Array(2432131, 500),
Array(2432154, 500),
Array(2432207, 500),
Array(2432354, 500),
Array(2432355, 500),
Array(2432465, 500),
Array(2432479, 500),
Array(2432526, 500),
Array(2432532, 500),
Array(2432592, 500),
Array(2432640, 500),
Array(2432710, 500),
Array(2432836, 500),
Array(2432973, 500)

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
			text = "#b��ܰ��ʾ��#r#z4033248##bֻ��ͨ������ռ�#k\r\nʹ�� #r#z4033248# #k����������һ�#e#b�˺�Ƥ��#n#k,\r\n��ѡ������Ҫ�һ���Ƥ��\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b ���Ҷ  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("������������������Ҫ�һ�������\r\n\r\n#r1����Ҫ" + itemlist[selects][1] + "��#b��ɫ��Ҷ#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("����һ�" + buynum + "��#r#i" + itemlist[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * itemlist[selects][1]) + " ��ɫ��Ҷ��");
        } else if (a == 3) {
            if (cm.haveItem(4033248,buynum * itemlist[selects][1])) {
                cm.gainItem(4033248, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("�һ��ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻�Ľ��Ҷ��\r\n��ȥ��������ռ�#r#z4033248##k��");
                cm.dispose();
            }
        }
    }//mode
}//f