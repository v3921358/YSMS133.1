/*
	����: �ƺ� - ��ʽ��֮��ʿ
	����: Ϊ�˼����֮��ʿ�׹����ɹ����3ת�����ŵ�ѫ�¡�
	���: 1142401 - ��ʽ��֮��ʿ
*/

var status = -1;
var level = 60
var itemId = 1142401;

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