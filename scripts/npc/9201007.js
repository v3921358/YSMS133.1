/* NANA
��黶ӭ��Ա
*/
var status = 0;
var menu = "������е���ô����\r\n#b#L0#��Ҫ�뿪����"
var men =1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0) {
			cm.sendNext("�š��������ʲô�µĻ����������ҡ�����������㡣");
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                                           if (cm.getPlayer().getMap().getId() == 680000210) {                                   
			cm.sendSimple(menu);
                                           }else{
                                           cm.sendOk("���۵������Ҽ��úܶ࣬���ǲ��Ǿ���������λ�أ�")
}
		} else if (status == 1) {
			cm.warp(680000500)
}
}
}