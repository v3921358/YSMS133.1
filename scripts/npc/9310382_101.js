/* ����̳� - ñ�� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 100000 ��� --------

//��װ
Array(1112198, 100000), //
Array(1115011, 100000), //
Array(1112197, 100000), //
Array(1115010, 100000), //

//����
Array(3015015, 100000), //
Array(3015016, 100000), //
Array(3015017, 100000), //
Array(3015018, 100000), //
Array(3015019, 100000), //
Array(3015020, 100000), //
Array(3015021, 100000), //
Array(3015022, 100000), //
Array(3015023, 100000), //
Array(3015024, 100000), //
Array(3015025, 100000), //
Array(3015026, 100000), //
Array(3015195, 100000), //
Array(3015227, 100000), //
Array(3015264, 100000), //
Array(3015263, 100000), //
Array(3015272, 100000), //
Array(3015304, 100000), //
Array(3012030, 100000), //
Array(3700309, 100000), //
Array(3015313, 100000), //
Array(3015316, 100000), //
Array(3016100, 100000), //
Array(3015317, 100000), //
Array(3015257, 100000), //

// -----�۸�Ϊ 300000 ��� --------


Array(3015303, 300000), //
Array(3015315, 300000), //
Array(3010729, 300000), //
Array(3015265, 300000), //
Array(3015266, 300000), //
Array(3015267, 300000), //
Array(3015268, 300000), //
Array(3015269, 300000), //
Array(3015270, 300000), //
Array(3015271, 300000), //
Array(3016101, 300000), //
Array(3015328, 300000), //
Array(3015329, 300000), //
Array(3015338, 300000), //
Array(3015312, 300000), //
Array(3015344, 300000), //
Array(3015029, 300000), //
Array(3014010, 300000) //

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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1 + " #k���#l";
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