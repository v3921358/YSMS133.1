/* ��ֵ������� */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("��������������¶����봦����");
            qm.dispose();
            return;
        } else if (status == 6) {
            qm.sendNextS("(��û��������׼����׼������֮�󣬾Ͱ�һ�°�ť�ɡ�)", 2);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��������������¶����봦����");
    } else if (status == 1) {
        qm.sendNextPrevS("(��������ͻȻ������ײ�����ҵļ硣)", 2);
    } else if (status == 2) {
        qm.sendNextPrevS("����˭��", 2);
    } else if (status == 3) {
        qm.askAcceptDecline("����\r\n\r\n(�Ǹ�����װ��û�����ҵĻ����ܿ����ʧ�ˡ�������󣬺��������һ������Ķ�����Ҫ������������)");
    } else if (status == 4) {
        qm.sendNextS("(�߽�һ��������Ķ������Ǳ�ģ���һ��¾ɵĻ�����������ϸһ��������ʱ�벻��ת��֮�⣬����ûʲô�ر�ĵط���)", 2);
    } else if (status == 5) {
        qm.sendNextPrevS("��һ������İ�ť�Ļ�������˵����������ת����������", 2);
    } else if (status == 6) {
        qm.sendYesNoS("���밴һ�°�ť���û�������ת��������\r\n\r\n#b(��#r��#b�Ļ��������ƶ�������ɭ�֡�)#k", 4)
    } else if (status == 7) {
        qm.sendPlayerToNpc("�õģ������ˡ���һ�°�ť�ɡ�");
	qm.forceStartQuest();
        qm.warp(240070000);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}