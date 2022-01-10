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
			cm.sendSimple(">任务资格：#b120级以上角色\r\n\r\n#k>活动目标#b<校园枫之高手>#k任务。(每天2次)\r\n\r\n#b#L1#校园枫之高手#l	#L2#校园枫之高手#l");
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
        		cm.sendOk("只有在1频道才可以参加高校副本。");
		}
	}
}