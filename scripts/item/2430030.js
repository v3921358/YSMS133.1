var status = -1;
var questid = 200100;
var playerid = 0;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			im.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		playerid = im.getPlayer().getId();
		if (im.getPlayer().MissionStatus(playerid, questid, 0, 4)) {  // �ж��Ƿ��ȡ������
			if (!im.getPlayer().MissionStatus(playerid, questid, 0, 0)) { // �ж��Ƿ��������
				var mapid = im.getPlayer().MissionGetMobId(playerid, questid);
				im.warp(mapid);
				im.remove(1);
				im.dispose();
				im.getPlayer().dropMessage(1, "��򿪿ڴ�����������ʲô�ö�����");
			} else {
				im.sendOk("�㻹û�н�ȡѰ�������أ���ȥ�ģ�");
				im.dispose();
			}
		} else {
			im.sendOk("�㻹û�н�ȡѰ�������أ���ȥ�ģ�");
			im.dispose();
		}
	}
}