/*
	����: 		�������
	��ͼ: 		�����
	����: 		������������
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("��Ҫ�Ұ�æ��\r\n#b#L0##b����鿴������#l#k");
    } else if (status == 1) {
        cm.sendNext("ֻ�н��ķ��޲��ܲ鿴�յ��Ľ��������յ��������Ļ�����ȥ���ɣ�");
        cm.dispose();
    }
}