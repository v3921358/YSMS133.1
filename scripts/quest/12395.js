/* ��ø�ǿ�����������ڶ����������� */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("��ã�#b#h0##k����ô��ʹﵽ50������ͨ�����ʱ���ð�գ�������˲��پ��飬���Ի��#b�ڶ�����������#k�ˡ������ھ�Ϊ���ŵڶ���������");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.sendPrev("���ˡ������Ѿ�Ϊ�����˸�ǿ�����������ڶ���������������ͨ����ɫ���Դ�ȷ��һ�¡���");
	qm.showCompleteQuestEffect();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}