/*
	����: �ƺ� - ���ܻ��������⹤��Ա
	����: Ϊ�˼�������2��תְ�����ŵ�ѫ�¡�
	���: 1142576
*/

var status = -1;
var level = 30;
var itemId = 1142576;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 3600 && qm.getJob() <= 3612) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 3600 && qm.getJob() <= 3612) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}