var status = 0;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
	if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == -1) {
			cm.dispose();
		} 
		if (status == 1)
		{
			cm.sendYesNo("��ô����Ҫȥ����!ȷ��Ҫ�뿪��?");
		}
		if (status == 2)
		{
			cm.warp(100000000);
			cm.sendOk("�Ѿ����������,���ǻ����ټ���!");
			cm.dispose();
		}
	}
}