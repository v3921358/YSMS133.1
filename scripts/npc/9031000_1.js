var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            cm.sendSimple("����ȥ�Ķ��أ�\r\n\r\n#L0##b��������ũ��#k (��ɫҩ�ݴԡ���ɫҩ�ݴ�)#b#l\r\n#L1##b�м�����ũ��#k (��ɫҩ�ݴԡ���ɫҩ�ݴ�)#b#l\r\n#L2#�߼�����ũ��#k(��ɫҩ�ݴԡ���ɫҩ�ݴ�)#b#l\r\n#L3#ר������ũ��#k(����ɫҩ�ݴԡ���ɫҩ�ݴ�)#l#k");
        } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            cm.sendSimple("����ȥ�Ķ��أ�\r\n\r\n#L4##b�������ܿ�ɽ#k(��ɫ��������ɫ����)#b#l\r\n#L5#�м����ܿ�ɽ#k(��ɫ��������ɫ����)#b#l\r\n#L6#�߼����ܿ�ɽ#k(��ɫ��������ɫ����)#b#l\r\n#L7#ר�����ܿ�ɽ#k(����ɫ��������ɫ����)#l#k");
        } else {
            cm.sendOk("ֻ��ѧ��ɿ���ҩ���˲���ʹ�á�");
            cm.dispose();
        }
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.getBossLog("����ũ��") < 5) {
                cm.warp(910001003, 0);
                cm.setBossLog("����ũ��");
                cm.playerMessage( - 9, "������������ũ������;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "��������ũ��ÿ��ÿ���޽�5�Σ�������Ľ������������");
            }
            break;
        case 1:
            if (cm.getBossLog("�м�ũ��") < 5) {
                cm.warp(910001004, 0);
                cm.setBossLog("�м�ũ��");
                cm.playerMessage( - 9, "�����м���������ũ������;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "�м�������ũ��ÿ��ÿ���޽�5�Σ�������Ľ������������");
            }
            break;
        case 2:
            if (cm.getBossLog("�߼�ũ��") < 3) {
                cm.warp(910001007, 0);
                cm.setBossLog("�߼�ũ��");
                cm.playerMessage( - 9, "����߼�����ũ������;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "�߼�����ũ��ÿ��ÿ���޽�3�Σ�������Ľ������������");
            }
            break;
        case 3:
            if (cm.getBossLog("ר��ũ��") < 3) {
                cm.warp(910001009, 0);
                cm.setBossLog("ר��ũ��");
                cm.playerMessage( - 9, "����ר������ũ������;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "ר������ũ��ÿ��ÿ���޽�3�Σ�������Ľ������������");
            }
            break;
        case 4:
            if (cm.getBossLog("���ֿ�ɽ") < 5) {
                cm.warp(910001005, 0);
                cm.setBossLog("���ֿ�ɽ");
                cm.playerMessage( - 9, "�����������ܿ�ɽ����;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "�������ܿ�ɽÿ��ÿ���޽�5�Σ�������Ľ������������");
            }
            break;
        case 5:
            if (cm.getBossLog("�м���ɽ") < 5) {
                cm.warp(910001006, 0);
                cm.setBossLog("�м���ɽ");
                cm.playerMessage( - 9, "�����м����ܿ�ɽ����;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "�м����ܿ�ɽÿ��ÿ���޽�5�Σ�������Ľ������������");
            }
            break;
        case 6:
            if (cm.getBossLog("�߼���ɽ") < 3) {
                cm.warp(910001008, 0);
                cm.setBossLog("�߼���ɽ");
                cm.playerMessage( - 9, "����߼����ܿ�ɽ����;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "�߼����ܿ�ɽÿ��ÿ���޽�3�Σ�������Ľ������������");
            }
            break;
        case 7:
            if (cm.getBossLog("ר�ҿ�ɽ") < 3) {
                cm.warp(910001010, 0);
                cm.setBossLog("ר�ҿ�ɽ");
                cm.playerMessage( - 9, "����ר�����ܿ�ɽ����;�˳�ʱ�޷����½��롣");
            } else {
                cm.playerMessage( - 9, "ר�����ܿ�ɽÿ��ÿ���޽�3�Σ�������Ľ������������");
            }
            break;
        }
        cm.dispose();
    }
}