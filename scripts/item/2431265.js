/* װ������� */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendNext("װ����þ�������");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        im.sendYesNo("���⡫��������ȯ�������ó�����������ǲ��ǺܳԾ����Ҳ���ֻ�����Կ�׵��ˣ��һ��кܶ����صĲ��ܡ��ҿ��԰�������޺û��˵Ķ���������������");
    } else if (status == 1) {
        im.gainItem(2431265, -1);
        im.sendRepairWindow();
        im.dispose();
    }
}