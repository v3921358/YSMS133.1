/* ����������Բ������������������ */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("��ã�#b#h0##k����ô��ʹﵽ70������ͨ�����ʱ���ð�գ�������˲��پ��飬���ڿ��Ի������#b��������������#k�ˡ������ھ�Ϊ�������һ��������");
    } else if (status == 1) {
        qm.forceCompleteQuest(); //�����������ķ��
        qm.sendPrev("���ˡ������Ѿ�Ϊ����������������������������������������ͨ����ɫ���Դ�ȷ��һ�¡���");
	qm.showCompleteQuestEffect(); //������������Ч��
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}