/* �����������ţ���һ���������� */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("��ã�#b#h0##k����ô��ʹﵽ30�������ﵽ#b30��#k֮�󣬿��Ի�����������#b��������#k�������ھ���Ϊ������������");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.sendPrev("���ˡ������Ѿ�Ϊ�������µ���������������������ͨ����ɫ���Դ�ȷ��һ�¡���");
	qm.showCompleteQuestEffect();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}