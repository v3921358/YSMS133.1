function start(){
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (cm.getMapId() == 910000000) {
		cm.sendOk("���Ѿ��������г��ˡ�");
		cm.dispose();
		return;
	}
	cm.warp(910000000, 0);
	cm.dispose();
}