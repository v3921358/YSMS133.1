var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

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
			var selStr = "#d#e������½28�죬ÿ�켴�ɻ��������Ʒ��#n#k\r\n";
			selStr +="  - #e#d����Ҫ��½ " + (28+cm.getBossLogAcc("��½")) + " �����ȫ������#n\r\n"
			selStr += "\r\n#r������������ң�������ȡÿ���֮ʱ�����Զ�����10öѩ����#k\r\n\r\n";
			selStr += "#L1##b" + aaa + " ��һ���¼���� #v4001839# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += "#L2##b" + aaa + " �ڶ����¼���� #v2431741# #rx 1#b [�������鿴]#l#k\r\n";
			selStr += "#L3##b" + aaa + " �������¼���� #v5062002# #rx 10#b[�������鿴]#l#k\r\n";
			selStr += "#L4##b" + aaa + " �������¼���� #v5062500# #rx 10#b [�������鿴]#l#k\r\n";
			selStr += "#L5##b" + aaa + " �������¼���� #v5062009# #rx 10#b [�������鿴]#l#k\r\n";
			selStr += "#L6##b" + aaa + " �������¼���� #v2049135# #rx 10#b[�������鿴]#l#k\r\n";
			selStr += "#L7##b" + aaa + " �������¼���� #v5062010# #rx 10#b [�������鿴]#l#k\r\n";
			selStr += "#L8##b" + aaa + " �ڰ����¼���� #v4001839# #rx 200#b [�������鿴]#l#k\r\n";
			selStr += "#L9##b" + aaa + " �ھ����¼���� #v2431741# #rx 2#b [�������鿴]#l#k\r\n";
			selStr += "#L10##b" + aaa + " ��ʮ���¼���� #v5062002# #rx 20#b[�������鿴]#l#k\r\n";
			selStr += "#L11##b" + aaa + " ��ʮһ���¼���� #v5062500# #rx 20#b [�������鿴]#l#k\r\n";
			selStr += "#L12##b" + aaa + " ��ʮ�����¼���� #v5062009# #rx 20#b [�������鿴]#l#k\r\n";
			selStr += "#L13##b" + aaa + " ��ʮ�����¼���� #v2049135# #rx 20#b[�������鿴]#l#k\r\n";
			selStr += "#L14##b" + aaa + " ��ʮ�����¼���� #v5062010# #rx 20#b [�������鿴]#l#k\r\n";
			selStr += "#L15##b" + aaa + " ��ʮ�����¼���� #v4001839# #rx 300#b [�������鿴]#l#k\r\n";
			selStr += "#L16##b" + aaa + " ��ʮ�����¼���� #v2431741# #rx 3#b [�������鿴]#l#k\r\n";
			selStr += "#L17##b" + aaa + " ��ʮ�����¼���� #v5062002# #rx 50#b[�������鿴]#l#k\r\n";
			selStr += "#L18##b" + aaa + " ��ʮ�����¼���� #v5062500# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L19##b" + aaa + " ��ʮ�����¼���� #v5062009# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L20##b" + aaa + " �ڶ�ʮ���¼���� #v2049135# #rx 50#b[�������鿴]#l#k\r\n";
			selStr += "#L21##b" + aaa + " �ڶ�ʮһ���¼���� #v5062010# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L22##b" + aaa + " �ڶ�ʮ�����¼���� #v4001839# #rx 400#b [�������鿴]#l#k\r\n";
			selStr += "#L23##b" + aaa + " �ڶ�ʮ�����¼���� #v2431741# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += "#L24##b" + aaa + " �ڶ�ʮ�����¼���� #v5062002# #rx 100#b[�������鿴]#l#k\r\n";
			selStr += "#L25##b" + aaa + " �ڶ�ʮ�����¼���� #v5062500# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += "#L26##b" + aaa + " �ڶ�ʮ�����¼���� #v5062009# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += "#L27##b" + aaa + " �ڶ�ʮ�����¼���� #v2049135# #rx 100#b[�������鿴]#l#k\r\n";
			selStr += "#L28##b" + aaa + " �ڶ�ʮ�����¼���� #v5062010# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += " \r\n\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo("- #e#d��һ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n#k#n\r\n\r\n#v4001839##r#t4001839# x 100 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo("- #e#d�ڶ����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431741##r#t2431741# x 1 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062002##r#t5062002# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062009##r#t5062009# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r��� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 7) {
				typed = 7;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062010##r#t5062010# x 10 #b����\r\n\r\n#e#d���һ��GM���͵� 1 ����#rð�ձ� 1000W #b.#r���������� 10�� #b�Ľ���������");
			} else if (selection == 8) {
				typed = 8;
				cm.sendYesNo("- #e#d�ڰ����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 200 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 9) {
				typed = 9;
				cm.sendYesNo("- #e#d�ھ����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431741##r#t2431741# x 2 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 10) {
				typed = 10;
				cm.sendYesNo("- #e#d��ʮ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:r\n\r\n#v5062002##r#t5062002# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 11) {
				typed = 11;
				cm.sendYesNo("- #e#d��ʮһ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 12) {
				typed = 12;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062009##r#t5062009# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 13) {
				typed = 13;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r��� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 14) {
				typed = 14;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062010##r#t5062010# x 20 #b����\r\n\r\n#e#d���һ��GM���͵� 1 ����#rð�ձ� 1000W #b.#r���������� 10�� #b�Ľ���������");
			} else if (selection == 15) {
				typed = 15;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 300 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 16) {
				typed = 16;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431741##r#t2431741# x 3 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 17) {
				typed = 17;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062002##r#t5062002# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 18) {
				typed = 18;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 19) {
				typed = 19;
				cm.sendYesNo("- #e#d��ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062009##r#t5062009# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 20) {
				typed = 20;
				cm.sendYesNo("- #e#d�ڶ�ʮ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 30 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r��� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 21) {
				typed = 21;
				cm.sendYesNo("- #e#d�ڶ�ʮһ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062010##r#t5062010# x 30 #b����\r\n\r\n#e#d���һ��GM���͵� 1 ����#rð�ձ� 1000W #b.#r���������� 10�� #b�Ľ���������");
			} else if (selection == 22) {
				typed = 22;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 400 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 23) {
				typed = 23;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ��������:\r\n\r\n#v2431741##r#t2431741# x 4 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 24) {
				typed = 24;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062002##r#t5062002# x 40 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 25) {
				typed = 25;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 40 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 26) {
				typed = 26;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062009##r#t5062009# x 40 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r���þ� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 27) {
				typed = 27;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 40 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 500W #b.��������ȡ#r��� 5000�� #b����������ȡ#r���������� 10�� #b����");
			} else if (selection == 28) {
				typed = 28;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062010##r#t5062010# x 40 #b����\r\n\r\n#e#d���һ��GM���͵� 1 ����#rð�ձ� 1000W #b.#r���������� 10�� #b�Ľ���������");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 10) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -1 && cm.getBossLogAcc("��һ��") == 0) {
						cm.gainItem(4001839, 100);
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��һ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��һ�콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��һ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("��ȡʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��10��. ");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -2 && cm.getBossLogAcc("�ڶ���") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						cm.gainMeso(2000000);
						cm.gainItem(2431741, 1);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ��콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -3 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062002, 10);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 4) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -4 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062500, 10);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -5 && cm.getBossLogAcc("������") == 0) {
						cm.gainItem(5062009, 10);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 6) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -6 && cm.getBossLogAcc("������") == 0 ) {
						cm.gainItem(2049135, 10);
						cm.gainNX(1, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 7) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -7 && cm.getBossLogAcc("������") == 0 ) {
						cm.gainItem(5062010, 10);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 8) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -8 && cm.getBossLogAcc("�ڰ���") == 0) {
						cm.gainItem(4001839, 200);
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڰ���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڰ��콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڰ����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 9) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -9 && cm.getBossLogAcc("�ھ���") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						cm.gainItem(2431741, 2);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ھ���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ھ��콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ھ����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 10) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -10 && cm.getBossLogAcc("��ʮ��") == 0) {
						cm.gainItem(5062002, 20);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ�콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 11) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -11 && cm.getBossLogAcc("��ʮһ��") == 0) {
						cm.gainItem(5062500, 20);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮһ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮһ�콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮһ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 12) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -12 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainItem(5062009, 20);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 30);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 13) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -13 && cm.getBossLogAcc("��ʮ����") == 0 ) {
						cm.gainItem(2049135, 20);
						cm.gainNX(1, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 14) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -14 && cm.getBossLogAcc("��ʮ����") == 0 ) {
						cm.gainItem(5062010, 20);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 15) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -15 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainItem(4001839, 300);
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 16) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -16 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						cm.gainMeso(2000000);
						cm.gainItem(2431741, 3);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 17) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -17 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainItem(5062002, 30);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 18) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -18 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainItem(5062500, 30);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 19) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -19 && cm.getBossLogAcc("��ʮ����") == 0) {
						cm.gainItem(5062009, 30);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 20) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -20 && cm.getBossLogAcc("�ڶ�ʮ��") == 0 ) {
						cm.gainItem(2049135, 30);
						cm.gainNX(1, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ�콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 21) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -21 && cm.getBossLogAcc("�ڶ�ʮһ��") == 0 ) {
						cm.gainItem(5062010, 30);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮһ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮһ���¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 22) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -22 && cm.getBossLogAcc("�ڶ�ʮ����") == 0) {
						cm.gainItem(4001839, 400);
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 23) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -23 && cm.getBossLogAcc("�ڶ�ʮ����") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 5000);
						cm.gainMeso(2000000);
						cm.gainItem(2431741, 10);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 24) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -24 && cm.getBossLogAcc("�ڶ�ʮ����") == 0) {
						cm.gainItem(5062002, 100);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 25) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -25 && cm.getBossLogAcc("�ڶ�ʮ����") == 0) {
						cm.gainItem(5062500, 100);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 26) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -26 && cm.getBossLogAcc("�ڶ�ʮ����") == 0) {
						cm.gainItem(5062009, 100);
						cm.gainNX(2, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 30);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ����ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 27) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -27 && cm.getBossLogAcc("�ڶ�ʮ����") == 0 ) {
						cm.gainItem(2049135, 30);
						cm.gainNX(1, 5000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 28) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					//setBossLog();
					if (cm.getBossLogAcc("��¼") == -28 && cm.getBossLogAcc("�ڶ�ʮ����") == 0 ) {
						cm.gainItem(5062010, 100);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310129, 10);
						cm.setBossLogAcc("�ڶ�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�����¼������");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}

			}
		}
	}
}

//function setBossLog() {
//	if (cm.getBossLogAcc("��¼") <= 0 && cm.getBossLogAcc("��¼") > -28) {
//		cm.setBossLogAcc("��¼");
//		cm.setBossLogAcc("��¼", -2);
//	}
//}