/* ����ħ����Ƭ */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        im.sendOk("�Ѽ���#r5��#k#b#t2430112##k�����Ի��#b#i2049401:##t2049401##k���Ѽ���#r10��#k���Ի��#b#i2049400:##t2049400##k��");
        im.dispose();
    }
}