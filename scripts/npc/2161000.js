var status = -1;

function start() {
    cm.sendYesNo("����˭������ң����������Ƿ���ħ��ʦ���˵��ˣ���������˭��û�б�Ҫ��̸��ȥ,\r\n����!������Щɵ��!");
}

function action(mode, type, selection) {
    if (mode == 1 && cm.getMap().getAllMonstersThreadsafe().size() == 0) {
	cm.removeNpc(cm.getMapId(), 2161000);
	cm.spawnMob(8840010, 0, -181);
	if (!cm.getPlayer().isGM()) {
		cm.getMap().startSpeedRun();
	}
    }
    cm.dispose();
}