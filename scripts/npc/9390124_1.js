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
            cm.sendYesNo("��ô��������ȥ�ˣ����кܶ���Ȥ�������أ�");
    } else if (status == 1) {
        cm.sendNext("��û���ġ�������Ҫ�ߵĻ�����Ҳ�������㡣�ټ���");
    } else if (status == 2) {
        cm.warp(863000100);
        cm.dispose();
    }
}