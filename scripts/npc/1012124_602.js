/* ��ֵ������ת�� */
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = head + "��ѡ����Ҫ���Ƶ�ת�̣�" + cm.getTrueServerName() + "��������ͣ�:\r\n\r\n#b#L0#" + icon + "��Ҫת300��(�ۼƳ�ֵ�ñҵ�300����ת)#l\r\n#L1#" + icon + "��Ҫת30��(�ۼƳ�ֵ�ñҵ�30����ת)#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310382, 801);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310382, 802);
            break;
        }
    }
}