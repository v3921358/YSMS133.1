var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
		Array("140����", 2431944, 180000, "����"),
		Array("140����", 2431945, 80000, "����"),
		Array("150����", 2432341, 680000, "����"),
		Array("150����", 2431938, 980000, "����"),// ��������������*1
		Array("150����", 2432069, 980000, "����")

		/*Array("սʿ����", 1072743, 1300000, "Ь��"),
		Array("��ʦ����", 1072744, 1300000, "Ь��"),
		Array("���ֱ���", 1072745, 1300000, "Ь��"),
        Array("��������", 1072746, 1300000, "Ь��"),
		Array("��������", 1072747, 1300000, "Ь��"),
		Array("սʿ����", 1082543, 1300000, "����"),
		Array("��ʦ����", 1082544, 1300000, "����"),
		Array("���ֱ���", 1082545, 1300000, "����"),
		Array("��������", 1082546, 1300000, "����"),
		Array("��������", 1082547, 1300000, "����"),
		Array("սʿ����", 1102481, 1300000, "����"),
		Array("��ʦ����", 1102482, 1300000, "����"),
		Array("���ֱ���", 1102483, 1300000, "����"),
		Array("��������", 1102484, 1300000, "����"),
		Array("��������", 1102485, 1300000, "����"),
		Array("սʿ����", 1132174, 1300000, "����"),
		Array("սʿ����", 1132175, 1300000, "����"),
		Array("սʿ����", 1132176, 1300000, "����"),
		Array("սʿ����", 1132177, 1300000, "����"),
		Array("սʿ����", 1132178, 1300000, "����"),
        Array("140��", 1052314, 50000, "��װ"),
        Array("140��", 1052315, 50000, "��װ"),
        Array("140��", 1052316, 50000, "��װ"),
        Array("140��", 1052317, 50000, "��װ"),
        Array("140��", 1052318, 50000, "��װ"),
        Array("140��", 1072485, 50000, "��װ"),
        Array("140��", 1072486, 50000, "��װ"),
        Array("140��", 1072487, 50000, "��װ"),
        Array("140��", 1072488, 50000, "��װ"),
        Array("140��", 1072489, 50000, "��װ"),
        Array("140��", 1082295, 50000, "��װ"),
        Array("140��", 1082296, 50000, "��װ"),
        Array("140��", 1082297, 50000, "��װ"),
        Array("140��", 1082298, 50000, "��װ"),
        Array("140��", 1082299, 50000, "��װ"),
        Array("140��", 1102275, 50000, "��װ"),
        Array("140��", 1102276, 50000, "��װ"),
        Array("140��", 1102277, 50000, "��װ"),
        Array("140��", 1102278, 50000, "��װ"),
        Array("140��", 1102279, 50000, "��װ"),
        Array("140��", 1152110, 50000, "��װ"),
        Array("140��", 1152111, 50000, "��װ"),
        Array("140��", 1152112, 50000, "��װ"),
        Array("140��", 1152113, 50000, "��װ"),
        Array("140��", 1152108, 50000, "��װ")*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = head + "#d#e��ӭʹ�õ������Ʒ,��ѡ������Ҫ�ģ�#n#k\r\n";
            selStr += "#d����ǰӵ�е�ȯ��  #r" + cm.getNX(1) + "#k #d��\r\n#����ǰӵ�е���ȯ��  #r" + cm.getNX(2) + "#d#k ��#k\r\n\r\n";
            selStr += "- #eװ��#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + "����" + itemlist[i][0] + " #r#z" + itemlist[i][1] + "##b ��" + (i == 9 || i == 11 ? "" : "Ҫ") + itemlist[i][2] + "#k #b���#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "ȷ������ #r#z" + itemlist[seld][1] + "##k ����ʹ�õ��� #r" + itemlist[seld][2] + "��ȯ. �������#r" + itemlist[seld][3] + "#k" + itemlist[seld][0] + "#z" + itemlist[seld][1] + "#��");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(1);
			if (nx1 < itemlist[seld][2] && nx1 < itemlist[seld][2] || cm.getSpace(1) < 1) {
				cm.sendOk(head + "����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����װ����λ����,������.");
			} else {
				cm.gainNX(nx1 < itemlist[seld][2] ? 1 : 2, -itemlist[seld][2]);
				cm.gainItem(itemlist[seld][1], 1);
				cm.sendOk(head + "��ϲ���ɹ�����#z" + itemlist[seld][1] + "#.");
				cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�����" + cm.getItemName(itemlist[seld][1]) + "һ����", 5120012);
				cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �õ����" + cm.getItemName(itemlist[seld][1]) + "һ��.");
			}
			cm.dispose();
        }
    }
}