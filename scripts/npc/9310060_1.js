var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		//Array( 2431944, 180000),
		//Array( 2431945, 80000),
		//Array( 2432341, 680000),
		Array( 2431938, 980000),// ��������������*1
		Array( 2432069, 980000)

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

var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1  + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 1;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k ���");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô����\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ���");
        }
        cm.dispose();
    }
}