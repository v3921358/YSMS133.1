var status = 0;
var typed=0;

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
		if (cm.getPlayer().getClient().getChannel() == 1) {
		if (status == 0) {
			cm.sendSimple(">�����ʸ�#b120�����Ͻ�ɫ\r\n\r\n#k>�Ŀ��#b<У԰��֮����>#k����(ÿ��2��)\r\n\r\n#b#L1#У԰��֮����#l	#L2#У԰��֮����#l");
		} else if (status == 1) {
			if (selection == 1) {
                    cm.dispose();
		    cm.openNpc(9330189,2);
			}
			if (selection == 2) {
                    cm.dispose();
		    cm.openNpc(9330189,3);
			}
		}
		 } else {
        		cm.dispose();
        		cm.sendOk("ֻ����1Ƶ���ſ��ԲμӸ�У������");
		}
	}
}