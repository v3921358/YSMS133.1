/*
 * ���� ҹ�ⷨʦ4ת
 * ���ڹ����ͺڰ������������ͻȻ�����ˡ�
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendPlayerNext("(����ʲô�о��������ڵ����������϶�Ϊһ����Ϊһ���µ���������)");
    } else if (status == 1) {
        qm.sendPlayerNextPrev("(����ڰ����ں�������һ���׶Ρ�)");
    } else if (status == 2) {
        qm.forceCompleteQuest();
        qm.dispose();
    }
}