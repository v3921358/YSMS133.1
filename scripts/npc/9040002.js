/*
 * �������� - ����
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű� 
 */
var status;
var selectedOption;

function start() {
    selectedOption = -1;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (mode == 1 && status == 3) {
        status = 0;
    }
    if (status == 0) {
        cm.sendNext("���~��ӭ����#m"+cm.getMapId()+"#��");
        cm.dispose();
    }
}