var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		Array( 2431938, 1),// ��������������*1
/*Array(1052509, 168), //
Array(1052510, 168), //
Array(1052511, 168), //
Array(1052512, 168), //
Array(1052513, 168), //

Array(1082472, 168), //
Array(1082473, 168), //
Array(1082474, 168), //
Array(1082475, 168), //
Array(1082476, 168), //

Array(1072711, 168), //
Array(1072712, 168), //
Array(1072713, 168), //
Array(1072714, 168), //
Array(1072715, 168), //

Array(1102456, 168), //
Array(1102457, 168), //
Array(1102458, 168), //
Array(1102459, 168), //
Array(1102460, 168), //

Array(1132156, 168), //
Array(1132157, 168), //
Array(1132158, 168), //
Array(1132159, 168), //
Array(1132160, 168), //

Array(1152094, 168), //
Array(1152095, 168), //
Array(1152096, 168), //
Array(1152097, 168), //
Array(1152098, 168), //
*/

Array(1003797, 1), //³����˹
Array(1003798, 1), //
Array(1003799, 1), //
Array(1003800, 1), //
Array(1003801, 1), //

Array(1042254, 1), //
Array(1042255, 1), //
Array(1042256, 1), //
Array(1042257, 1), //
Array(1042258, 1), //

Array(1062165, 1), //
Array(1062166, 1), //
Array(1062167, 1), //
Array(1062168, 1), //
Array(1062169, 1)//
/*
Array(1082543, 298), //
Array(1082544, 298), //
Array(1082545, 298), //
Array(1082546, 298), //
Array(1082547, 298), //

Array(1132174, 298), //
Array(1132175, 298), //
Array(1132176, 298), //
Array(1132177, 298), //
Array(1132178, 298), //

Array(1102481, 298), //
Array(1102482, 298), //
Array(1102483, 298), //
Array(1102484, 298), //
Array(1102485, 298), //

Array(1072743, 298), //
Array(1072744, 298), //
Array(1072745, 298), //
Array(1072746, 298), //
Array(1072747, 298) //
*/

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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "1����̵�", 3, true);
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