/*
 �ű����ܣ��ƽ���Ժ���
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
            cm.sendSimple("�����ǽ��أ�������ʲô��#b\r\n#L0#  �����ȥ��Ժ��ս�����ǣ�")
        }else if (a == 1){
            cm.warp(252030000,0)
            cm.dispose();
        }//a
    }//mode
}//f