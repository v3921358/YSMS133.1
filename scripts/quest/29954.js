/*
	����: �ƺ� - �߹��ߵı�ʶ
	����: ���߹���ˡ�������֮������������ɣ�
	���: 1142338 - �߹��ߵı�ʶ
*/

var status = -1;
var level = 60
var itemId = 1142338;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 2300 && qm.getJob() <= 2312) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 2300 && qm.getJob() <= 2312) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}