/*
 * ���վ��ѿ���սʿ��
 * ����սʿ3ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendPlayerOk("���������վ��ѣ����úܽ��Ű�����");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendPlayerStart("ŵ�;��������������Ҫ��Ҫ���Խ������վ��ѣ���˵������վ��ѳɹ������ܱ���Ϊ����սʿ��������ò������Ŀ�����");
    } else if (status == 1) {
	if (qm.getJob() == 6110) {
	    qm.changeJob(6111);
	}
        if (!qm.haveItem(1142486, 1)) {
            qm.gainItem(1142486, 1);
        }
	qm.forceCompleteQuest();
        qm.sendPlayerOk("�ɹ��ˣ���������Ա���Ϊ����սʿ��������ò��ͬʱ������ʹ�ø�ǿ�������Ĺ������ܡ�");
        qm.dispose();
    }
}