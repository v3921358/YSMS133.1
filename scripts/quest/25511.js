/*
 * Ѱ�ҵ�3��·
 * ҹ�ⷨʦ3ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNextNoESC("ҹ�ⷨʦ�����Ѿ����ر�����ȫ���ռ����ˡ�");
    } else if (status == 1) {
        qm.sendNextPrevS("���������������������ܽ�ҹ�ⷨʦ�����ڵĺڰ�������ں���һ��", 1);
    } else if (status == 2) {
        qm.sendNextPrevS("�����ˡ������ر������ж�ǿ�����ջ���Ҫ��ҹ�ⷨʦ��ȥսʤ����", 1);
    } else if (status == 3) {
        qm.PlayerToNpc("��Ҫ���ġ��Ҷ��Լ��ĳ����������ġ�");
    } else if (status == 4) {
        qm.sendNextPrevS("��ס��仰��#b<��ڰ���ʱ�򣬹�â��ʢ��>#kһ�����а����ġ���ʼ�����ٰ���ѽ��", 1);
    } else if (status == 5) {
        qm.PlayerToNpc("��ѽѽѽѽ��");
    } else if (status == 6) {
        qm.sendNextPrevS("�ɹ��ˣ��Ҿ�֪��������������ҹ�ⷨʦ��", 1);
    } else if (status == 7) {
        qm.PlayerToNpc("(�����������ڵ���Ϣ��̫һ���ˡ����ֹ���ڰ���Ϊһ��ĸо�����)");
    } else if (status == 8) {
        qm.sendNextPrevS("�ղ�Ӧ�������˲�������������Ϣ��Ϣ�ɡ����������ڵ��������һ�����ϸ˵��", 1);
    } else if (status == 9) {
        if (qm.getJob() == 2710) {
            qm.changeJob(2711);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}