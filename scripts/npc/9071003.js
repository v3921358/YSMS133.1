var status = 0;

function start() {
    if (cm.getMapId() == 951000000) {
        cm.sendYesNo("��á����﹫԰�ͳ��߳�Ϊ����ṩ��õķ�������ص�����ȥ��");
    } else {
        cm.sendYesNo("�װ��Ĺ˿ͣ����뵽�����˻��ֵ��ݱ˵����Ĺ��﹫԰ȥ��");
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getMapId() == 951000000) {
            cm.warp(100000000);
        } else {
            cm.warp(951000000);
        }
    }
    cm.dispose();
}