var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("�Ǻǣ��ðɣ��������ɡ�");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("������Դ��͵������齱�������ģ���ȥ�������������");
    } else if (status == 1) {
        cm.sendNext("��ȷ��Ҫȥ�����齱������");
    } else if (status == 2) {
        cm.warp(749050400);
        cm.dispose();
    }
}