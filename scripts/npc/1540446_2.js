/*
 * ˹��11�س�������
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 */

var rewardItem = 2433007;
var status = 0;

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
            cm.sendPlayerToNpc("һ������ҫ���ң�����о��������\r\n�����˹�ڣ�������ȡ�������ͳ�ȥ�ɣ�");
        } else if (status == 1) {
            cm.gainItem(rewardItem,2);//�������
            cm.warp(910000000,0)
            cm.spouseMessage(0x25, ""+cm.getPlayer().getName()+"  ������˹�ڣ����ǲ���������ð�յ���ʿ��");
            cm.dispose();
        }
    }
}