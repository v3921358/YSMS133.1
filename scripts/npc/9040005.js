var status = -1;

function action(mode, type, selection) {
    if (mode != 1) {
        cm.sendOk("ף����˳����ͨ����������");
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        if (cm.isPlayerInstance()) {
            cm.sendSimple("������ʲô��#b\r\n #L0#�뿪���#l");
        } else {
            cm.warp(910000000,0)
            cm.dispose();
        }
    } else if (status == 1) {
        cm.sendYesNo("��ȷ����Ҫ�뿪���뿪֮��Ͳ����ٻص��������ˡ�");
    } else if (status == 2) {
        cm.warp(102040200,0);
        cm.dispose();
        return;
    }
}