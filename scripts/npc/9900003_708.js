var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed = 0;
var rmb = 0;
var isOld = false;
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
		if (status == 0) {
			var selStr = "#d#e����������¼��ֻҪ��¼7�죬ÿ�켴�ɻ��������Ʒ��#n#k\r\n";
			selStr += "#e#d����Ҫ��¼ #r" + (7 + cm.getBossLogAcc("��¼")) + "#d �����ȫ������#n\r\n"
			if (isOld)
				selStr += "\r\n#r������������ң�������ȡÿ���֮ʱ�����Զ�����15öѩ����#k\r\n\r\n";
			selStr += "#L1##b" + aaa + " ��һ���¼���� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L2##b" + aaa + " �ڶ����¼���� #v2431741# #rx 3#b [�������鿴]#l#k\r\n";
			selStr += "#L3##b" + aaa + " �������¼���� #v5062002# #rx 30#b[�������鿴]#l#k\r\n";
			selStr += "#L4##b" + aaa + " �������¼���� #v5062500# #rx 30#b [�������鿴]#l#k\r\n";
			selStr += "#L5##b" + aaa + " �������¼���� #v5062009# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L6##b" + aaa + " �������¼���� #v2049135# #rx 10#b[�������鿴]#l#k\r\n";
			selStr += "#L7##b" + aaa + " �������¼���� #v1113037# #rx 1#b [�������鿴]#l#k\r\n";
			selStr += " \r\n\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo("- #e#d��һ���¼ʱ�佱��#k#n\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 100W #b.��������ȡ#r���þ� 1000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo("- #e#d�ڶ����¼ʱ�佱��#k#n\r\n\r\n#v2431741##r#t2431741# x 3 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 200W #b.��������ȡ#r���þ� 2000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo("- #e#d�������¼ʱ�佱��#k#n\r\n\r\n#v5062002##r#t5062002# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 300W #b.��������ȡ#r���þ� 3000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo("- #e#d�������¼ʱ�佱��#k#n\r\n\r\n#v5062500##r#t5062500# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 400W #b.��������ȡ#r���þ� 4000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo("- #e#d�������¼ʱ�佱��#k#n\r\n\r\n#v5062009##r#t5062009# x 50 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("- #e#d�������¼ʱ�佱��#k#n\r\n\r\n#v2049135##r#t2049135# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r��� 5000�� #b����������ȡ#r���������� 30�� #b����");
			} else if (selection == 7) {
				typed = 7;
				cm.sendYesNo("- #e#d�������¼ʱ�佱��#k#n\r\n\r\n#v1113037##r#t1113037# x 1 #b����\r\n\r\n#e#d����װ�����ܣ�#n\r\n\r\n- #e#r����#n:30    - #e����#n:30    - #e����#n:30\r\n- #e����#n:30    - #e����#n:30    - #eħ��#n:30\r\n\r\n#b�ɹ���ȡ��7�콱���������޷��ٴ���ȡ���˵�¼���������һ��GM���͵� 1 ����#rð�ձ� 1000W #b.#r���������� 30�� #b�Ľ���������");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -1 && cm.getBossLogAcc("��һ��") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainMeso(1000000);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("��һ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��һ�콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��һ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -2 && cm.getBossLogAcc("�ڶ���") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 2000);
						cm.gainMeso(2000000);
						cm.gainItem(2431741, 3);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("�ڶ���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ��콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��420����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -3 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062002, 30);
						cm.gainNX(2, 3000);
						cm.gainMeso(3000000);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��420����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 4) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -4 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062500, 30);
						cm.gainNX(2, 4000);
						cm.gainMeso(4000000);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��420����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -5 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062009, 50);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��420����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 6) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -6 && cm.getBossLogAcc("������") == 0 ) {
						cm.gainItem(2049135, 10);
						cm.gainNX(1, 5000);
						cm.gainMeso(5000000);
						if (isOld) cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��420����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 7) {
				if (cm.getSpace(1) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼") == -7 && cm.getBossLogAcc("������") == 0) {
						//cm.gainItem(1113037, 1);
						if (isOld) cm.gainItem(4310129, 30);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						var ii = cm.getItemInfo();
						var toDrop = ii.randomizeStats(ii.getEquipById(1113037)).copy(); // ����һ��Equip��                    
						toDrop.setStr(30); //װ������
						toDrop.setDex(30); //װ������
						toDrop.setInt(30); //װ������
						toDrop.setLuk(30); //װ������
						toDrop.setMatk(30); //������
						toDrop.setWatk(30); //ħ������ 
						cm.addFromDrop(cm.getC(), toDrop, false);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼�����������һ����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��600����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.4). �ȼ�С��200��.");
					cm.dispose();
				}
			}
		}
	}
}

function setBossLog() {
	if (cm.getBossLogAcc("��¼����") <= 0 && cm.getBossLogAcc("��¼") > -7) {
		cm.setBossLogAcc("��¼����");
		cm.setBossLogAcc("��¼", -2);
	}
}