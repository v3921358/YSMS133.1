/*���� - ����ҵ��֧Ԯ*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendNext("��ȥӢ�۵��õĻ������������ҡ�");
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("��ȥӢ�۵��õĻ������������ҡ�");
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("��á����Ǹ������֧Ԯ���������š�Ϊ�˹������㣬��������Ӣ�۵��ã�Ϊ����ṩ���������뵽Ӣ�۵���ȥ����������������");
        } else if (status == 1) {
            cm.sendNext("�õģ������ϰ����͹�ȥ��");
        } else if (status == 2) {
            cm.saveReturnLocation("GUILD");
            cm.warp(200000301);
            cm.dispose();
        }
    }
}