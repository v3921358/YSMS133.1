/*
	���ݣ��������6��
	��ͼ��925060600
*/

var status = 0;
var text;
var baseMapId = 925060000;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {
			text = "�ۻ��˰ɣ����ݸ�����Ϣһ��~\r\n\r\n#b";
			if (((cm.getMapId() - 925060000) / 100) % 6 == 0) {
				text += "#L0#������ս��һ��#l\r\n";
			}
			text += "#L1#��������BUFF#l\r\n#L2#�˳���ս#l";
			cm.sendNext(text);
		} else if (status == 1) {
			if (selection == 0) {
				var eim = cm.getPlayer().getEventInstance();
				var maps = eim.getObjectProperty("maps");
				if (maps == null) {
					java.lang.System.out.println("maps��ȡʧ��");
					eim.dispose();
					return;
				}

				for (var i = 1; i < maps.length; i++) {
					if (maps[i][0] == cm.getPlayer().getMapId() + 100) {
						cm.getPlayer().changeMap(maps[i][1], maps[i][1].getPortal(0));
						break;
					}
				}
			} else if (selection == 1) {
				cm.sendOk("��ʱûʲô�������ġ���");
			} else {
				cm.warp(925020001);
			}
			cm.dispose();
		}
	}
}