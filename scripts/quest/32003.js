/*
	����: �ƺ� - ��ŭ�ĵ�һ��
	����: Ϊ��ף�ض�ħ�����ߵ�4��תְ�����ŵ�ѫ�¡�
	���: 1142556
*/

var status = -1;
var level = 100;
var itemId = 1142556;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && ((qm.getJob() >= 3120 && qm.getJob() <= 3122) || qm.getJob() == 3101) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && ((qm.getJob() >= 3120 && qm.getJob() <= 3122) || qm.getJob() == 3101) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}