/* 
���
CherryMS LoveMXD
�뿪��ͼ
*/
var status = 0;
var main = "�����е���ô����#b\r\n#L0#�����뿪��";

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
                                          if (cm.getPlayer().getMap().getId() == 680000500) {//������뿪��ͼ
			cm.sendSimple(main);
                                          }else{
			cm.sendSimple(main);
                                          }
                                          } else if (status == 1) {
			if (selection == 0) { // ��Ҫ�뿪��
				cm.sendNext("�úúá���������������뿪������");
			} 
                	} else if (status == 2) {
			cm.warp(680000000)
		} 
	}
}
