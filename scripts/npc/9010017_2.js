/*
���Է������ʹ���
*/
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == -1) {
            cm.dispose();
		} else if (status == 0) {
			cm.sendGetNumber("�����뷢�ͻ����ʹ��룺",0, 0, 999999);
		} else if (status == 1) {
			cm.gainItem(5150052, 1, 1);
			cm.setAvatar(5150052, selection);
			cm.sendOk("���ˣ��쿴��");
			cm.safeDispose();
		}
    }//mode
}//f