/*
	����: �ƺ� - ��֮��ʿ�ų�
	����: Ϊ�˼����֮��ʿ�׹����ɹ����4ת�����ŵ�ѫ�¡�
	���: 1142402 - ��֮��ʿ�ų�
*/

var status = -1;
var level = 100
var itemId = 1142402;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 5000 && qm.getJob() <= 5112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 5000 && qm.getJob() <= 5112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}