/*
 ���ʱ�䣺2013��7��21�� 12:13:28
 �ű����ܣ������
 */


var selects;
var mode;
var EventList = Array(
        Array("#r[HOTTIME] ���ص����ӡ�#k#l", 103),
        Array("#r[HOTTIME] ���ֲ²²£�#k#l", 104),
		Array("#r[ÿ��6000���]20������#k#l", 110)
        );
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
       cm.openNpc(9900003)
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var text = head + "Ŀǰ" + cm.getServerName() + "�ѿ�ʼ�Ļ������\r\n�밴������ϲ��ѡ����\r\n#b"
        for (var i = 0; i < EventList.length; i++) {
            text += "#L" + i + "# " + icon + EventList[i][0] + "\r\n"
        }
        cm.sendSimple(text)
    } else if (status == 1) {
            selects = selection;
            mode = EventList[selects][1];
            if (EventList[selects][1] >= 10000) {
                cm.openNpc(mode);
            } else {
		cm.dispose();
                cm.openNpc(9900003, mode);
                //cm.setNPC_Mode(0)
            }
    }
}