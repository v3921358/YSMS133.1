/*
 ���ʱ�䣺2013��7��21�� 12:13:28
 �ű����ܣ������
 */


var selects;
var mode;
var EventList = Array(
		Array("#b[ǩ������] #rÿ��ǩ��#k#l", 7),
		Array("#b[���˸���] #r����ǩ��#k#l", 708),//502
        	//Array("#b[HOTTIME] #r���ص����ӡ�#k#l", 103),
        	Array("#b[HOTTIME] #r���ֲ²²£�#k#l", 104),
		Array("#b[�ճ�����] #r�·������#k#l", 110),
		Array("#b[�ճ�����] #r������Ŀڴ�#k#l", 120)
);

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
        var text = "Ŀǰ" + cm.getServerName() + "�ѿ�ʼ�Ļ������\r\n�밴������ϲ��ѡ����\r\n#b"
        for (var i = 0; i < EventList.length; i++) {
            text += "#L" + i + "# " + EventList[i][0] + "\r\n"
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