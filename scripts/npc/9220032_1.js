/*
 �ű����ܣ����ͥԺ���
 */

var a = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple("��������Ի�����˱ң����������Ҫ�뿪��#b\r\n#L0# �����뿪���\r\n#L1# �ðɡ���Ҫ�������")
        } else if (a == 1) {
            if (selection == 0) {
                cm.warp(706020100);
                cm.dispose();
            } else {
                cm.dispose();
            }
        }//a
    }//mode
}//f