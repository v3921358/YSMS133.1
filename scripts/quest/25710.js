/*
 * ͻ��ŵ�;��輫��
 * ����սʿ2ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendPlayerOk("Ҫ�ǲ���������ͽ��г��Կ��ܻ�ٻ�ŵ�;��裬��ú��������");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendPlayerStart("�������Ľ���𣿸о�ŵ�;�������������ƺ�����չһ��ŵ�;���ļ���ֵ����������һ�ԣ�");
    } else if (status == 1) {
        if (qm.getJob() == 6100) {
            qm.changeJob(6110);
        }
        if (!qm.haveItem(1142485, 1)) {
            qm.gainItem(1142485, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}