var status = -1;
var j = java.lang.Math.floor(Math.random() * 9);
var k = java.lang.Math.floor(Math.random() * 9);

function action(mode, type, selection) {
	if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
		for (var i = j; i <= j; i++) {
			if (j == 0) {
				cm.gainMeso(20000);
			} else if (j == 1) {
				cm.gainMeso(20000);
			} else if (j == 2) {
				cm.gainItem(4310030, 1);
				cm.playerMessage( - 1, "�������˶����1��");
				cm.gainMeso(20000);
			} else if (j == 3) {
				cm.gainMeso(20000);
			} else if (j == 4) {
				cm.gainMeso(20000);
			} else if (j == 5) {
				cm.playerMessage( - 1, "�������˶����2��");
				cm.gainMeso(20000);
			} else if (j == 6) {
				cm.gainMeso(20000);
			} else if (j == 7) {
				cm.gainMeso(20000);
			} else {
				cm.gainMeso(20000);
			}
			cm.dispose();
		}
		for (var i = k; i <= k; i++) {
			if (k == 0 || k == 1 || k == 2 || k == 3) {
				cm.gainItem(5072000, 1);
			} else if (k == 4 || k == 5 || k == 6 || k == 7) {
				cm.gainItem(4310030, 1);
			} else {
				cm.gainItem(5076000, 1);
			}
			cm.dispose();
		}
		if (cm.getPlayer().getMapId() == 262030300) {
			cm.warp(262030000);
		} else if (cm.getPlayer().getMapId() == 910024000) {
			cm.warp(910023000);
		} else if (cm.getPlayer().getMapId() == 240080500) {
			cm.warp(240080050);
		}
	} else if (!cm.haveMonster(9410165) && !cm.haveMonster(9410166) && !cm.haveMonster(9410167) && !cm.haveMonster(9410168) && cm.getPlayer().getMapId() == 744000001) {
		cm.gainNX(1, 1000);
		cm.gainItem(4310014, 10);//ѩ����
		cm.gainItem(2430915, 10);

		var basePercent = 0.1;
		if (cm.getLevel()>220) {
			basePercent = 0.02;
		}
		var calcExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*basePercent);
		var expNum = 1;
		var lastExp = 0;
		//������鳬��21E
		if (calcExp>=2147483647) {
			//����ֳɼ���
			expNum = Math.floor((calcExp / 2147483647));
			//��������
			lastExp = Math.floor((calcExp % 2147483647));
			//���ݼ��������θ��辭��
			for(var i = 0; i<expNum; i++) {
				cm.gainExp(2147483647);
			}
			//������������
			cm.gainExp(lastExp);
		} else {
			cm.gainExp(calcExp);
		}
		cm.warp(744000000);
		cm.sendOk("��ϲ������10��#v2430915#��10��#v4310014#��1000����Լ���������");
		cm.dispose();
	} else {
		cm.dispose();
		cm.sendOk("�����ͼ���Ƿ񻹴��ڹ�������޷���ȡ������");
	}
}