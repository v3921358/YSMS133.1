/*
	����: �ƺ� - ������ħ����Ů���ؼ�
	����: Ϊ�˼��������ʹ2ת�����ŵ�ѫ�¡�
	���: 1142496 - ����Ĵ�����
*/

var status = -1;
var level = 30
var itemId = 1142496;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6500 && qm.getJob() <= 6512) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6500 && qm.getJob() <= 6512) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}