/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��8��21�� 09:55:38
 �ű����ܣ�����ҽԺ��ת
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
            cm.sendSimple("��ӭ��������ҽԺ����������Ҫ��ʲô��\r\n#b#L1# �ʼ�����#l  #L3# �ʼ�����#l  #L2# ��������#l");
        } else if (a == 1) {
            if (selection == 1) {
		cm.dispose();
                cm.openNpc(9900003, 901);
            }else if (selection == 2){
		cm.dispose();
                cm.openNpc(9900003, 902);
            }else if (selection == 3){
		cm.dispose();
                cm.openNpc(9900003, 903);
            }
        }//a
    }//mode
}//f