/*
 * ˹��11�س������� ��ͼ����
 * Event�еĺ������ڸ��ӣ�ֱ����ת��NPC����
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 */

var status = 0;
var typed;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var em = cm.getEventManager("siwu");
            var eim = em.getInstance("siwu")
            if (eim == null) {
                cm.warp(910000000, 0);
                cm.sendOk("ֻ��������;������˹�����������ܼ������ڸղŵĵ�ͼ��")
                cm.dispose();
            } else {
                cm.dispose();
            }
        }
    }
}
   