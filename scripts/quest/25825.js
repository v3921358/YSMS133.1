/*
 * ����Ĵ�����
 * ��������ʹ2ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendOk("��������ȷʵ��ǿ�ˣ����ҵ����Ǹ��˵�����ɡ�");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.askAcceptDeclineNoESC("������������ϰ�Ľ������#p3000018#��������ϵԽ��Խ�����ˡ�����ȸе����ˣ�����һ˿�������Ƿ�Ҫ���б�������ʹ2ת��");
    } else if (status == 1) {
        if (qm.getJob() == 6500) {
            qm.changeJob(6510);
        }
        if (!qm.haveItem(1142496, 1)) {
            qm.gainItem(1142496, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}