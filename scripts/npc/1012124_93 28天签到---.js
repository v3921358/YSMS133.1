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
			selStr +="  - #e#d����Ҫ��½ " + (28+cm.getBossLogAcc("��¼����1��")) + " �����ȫ������#n\r\n"
			selStr += "\r\n#r������������ң�������ȡÿ���֮ʱ�����Զ�����10ö����ͭ��#k\r\n\r\n";
			selStr += "#L1##b" + aaa + " ��һ�칤�ʽ��� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L2##b" + aaa + " �ڶ��칤�ʽ��� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L3##b" + aaa + " �����칤�ʽ��� #v4001839# #rx 1000#b[�������鿴]#l#k\r\n";
			selStr += "#L4##b" + aaa + " �����칤�ʽ��� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L5##b" + aaa + " �����칤�ʽ��� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L6##b" + aaa + " �����칤�ʽ��� #v2049135# #rx 20#b[�������鿴]#l#k\r\n";
			selStr += "#L7##b" + aaa + " �����칤�ʽ��� #v5062009# #rx 200#b [�������鿴]#l#k\r\n";
			selStr += "#L8##b" + aaa + " �ڰ��칤�ʽ��� #v5062500# #rx 100#b [�������鿴]#l#k\r\n";
			selStr += "#L9##b" + aaa + " �ھ��칤�ʽ��� #v2340000# #rx 20#b [�������鿴]#l#k\r\n";
			selStr += "#L10##b" + aaa + " ��ʮ�칤�ʽ��� #v5750000# #rx 20#b[�������鿴]#l#k\r\n";
			selStr += "#L11##b" + aaa + " ��ʮһ�칤�ʽ��� #v2430692# #rx 1#b [�������鿴]#l#k\r\n";
			selStr += "#L12##b" + aaa + " ��ʮ���칤�ʽ��� #v2049116# #rx 5#b [�������鿴]#l#k\r\n";
			selStr += "#L13##b" + aaa + " ��ʮ���칤�ʽ��� #v2049135# #rx 20#b[�������鿴]#l#k\r\n";
			selStr += "#L14##b" + aaa + " ��ʮ���칤�ʽ��� #v5062009# #rx 300#b [�������鿴]#l#k\r\n";
			selStr += "#L15##b" + aaa + " ��ʮ���칤�ʽ��� #v4001839# #rx 1000#b [�������鿴]#l#k\r\n";
			selStr += "#L16##b" + aaa + " ��ʮ���칤�ʽ��� #v2431762# #rx 5#b [�������鿴]#l#k\r\n";
			selStr += "#L17##b" + aaa + " ��ʮ���칤�ʽ��� #v4001839# #rx 1000#b[�������鿴]#l#k\r\n";
			selStr += "#L18##b" + aaa + " ��ʮ���칤�ʽ��� #v5062500# #rx 200#b [�������鿴]#l#k\r\n";
			selStr += "#L19##b" + aaa + " ��ʮ���칤�ʽ��� #v2590004# #rx 1#b [�������鿴]#l#k\r\n";
			selStr += "#L20##b" + aaa + " �ڶ�ʮ�칤�ʽ��� #v2049135# #rx 50#b[�������鿴]#l#k\r\n";
			selStr += "#L21##b" + aaa + " �ڶ�ʮһ�칤�ʽ��� #v2340000# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L22##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v4001839# #rx 2000#b [�������鿴]#l#k\r\n";
			selStr += "#L23##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v2049137# #rx 20#b [�������鿴]#l#k\r\n";
			selStr += "#L24##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v2590004# #rx 1#b[�������鿴]#l#k\r\n";
			selStr += "#L25##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v5750000# #rx 50#b [�������鿴]#l#k\r\n";
			selStr += "#L26##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v2431762# #rx 10#b [�������鿴]#l#k\r\n";
			selStr += "#L27##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v2431354# #rx 1#b[�������鿴]#l#k\r\n";
			selStr += "#L28##b" + aaa + " �ڶ�ʮ���칤�ʽ��� #v1182019# #rx 1#b [�������鿴]#l#k\r\n";
			selStr += " \r\n\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo("- #e#d��һ�칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n#k#n\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n #v4310023##r#t4310023# x 10 #b��\r\n\r\n#bð�ձ� #r x 1000W \r\n\r\n#b���þ� #r x 10000�㡣");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo("- #e#d�ڶ��칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 10000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo("- #e#d�����칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 10000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo("- #e#d�����칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 10000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo("- #e#d�����칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 10000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("- #e#d�����칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r��� 10000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 7) {
				typed = 7;
				cm.sendYesNo("- #e#d�����칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062009##r#t5062009# x 200 #b����\r\n\r\n#e#d���һ��GM���͵� 2����#rð�ձ� 1000W #b.#r����ͭ�� 10�� #b�Ľ���������");
			} else if (selection == 8) {
				typed = 8;
				cm.sendYesNo("- #e#d�ڰ��칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 100 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 9) {
				typed = 9;
				cm.sendYesNo("- #e#d�ھ��칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2340000##r#t2340000# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 10) {
				typed = 10;
				cm.sendYesNo("- #e#d��ʮ�칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:r\n\r\n#v5750000##r#t5750000# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 11) {
				typed = 11;
				cm.sendYesNo("- #e#d��ʮһ�칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2430692##r#t2430692# x 1 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 12) {
				typed = 12;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049116##r#t2049116# x 5 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 13) {
				typed = 13;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r��� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 14) {
				typed = 14;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v50620009##r#t5062009# x 300 #b����\r\n\r\n#e#d���һ��GM���͵� 40000���#rð�ձ� 1000W #b.#r����ͭ�� 10�� #b�Ľ���������");
			} else if (selection == 15) {
				typed = 15;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 16) {
				typed = 16;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431762##r#t2431762# x 5 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 17) {
				typed = 17;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 1000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 18) {
				typed = 18;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5062500##r#t5062500# x 200 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 19) {
				typed = 19;
				cm.sendYesNo("- #e#d��ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2590004##r#t2590004# x 1 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 20) {
				typed = 20;
				cm.sendYesNo("- #e#d�ڶ�ʮ�칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2049135##r#t2049135# x 50 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r��� 20000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 21) {
				typed = 21;
				cm.sendYesNo("- #e#d�ڶ�ʮһ�칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2340000##r#t2340000# x 50 #b����\r\n\r\n#e#d���һ��GM���͵� 40000���#rð�ձ� 1000W #b.#r����ͭ�� 10�� #b�Ľ���������");
			} else if (selection == 22) {
				typed = 22;
				cm.sendYesNo("- #e#d�ڶ�ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v4001839##r#t4001839# x 2000 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 23) {
				typed = 23;
				cm.sendYesNo("- #e#d�ڶ�ʮ���칤�ʽ���#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ��������:\r\n\r\n#v2049137##r#t2049137# x 20 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 24) {
				typed = 24;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2590004##r#t2590004# x 1 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 1000W #b.��������ȡ#r���þ� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 25) {
				typed = 25;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v5750000##r#t5750000# x 50 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 2000W #b.��������ȡ#r���þ� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 26) {
				typed = 26;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431762##r#t2431762# x 10 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 3000W #b.��������ȡ#r���þ� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 27) {
				typed = 27;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v2431354##r#t2431354# x 1 #b����\r\n\r\n������˻�������ȡ#rð�ձ� 5000W #b.��������ȡ#r��� 50000�� #b����������ȡ#r����ͭ�� 10�� #b����");
			} else if (selection == 28) {
				typed = 28;
				cm.sendYesNo("- #e#d�ڶ�ʮ�����¼ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ360���ӽ���������ȡ����ȡ�������õ�:\r\n\r\n#v1182019##r#t1182019# x 1 #b����\r\n\r\n#e#d���һ��GM���͵� 10 ����#rð�ձ� 1�� #b.#r����ͭ�� 10�� #b�Ľ���������");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 30 && cm.getLevel() >= 10) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -1 && cm.getBossLogAcc("��1��һ��") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 10000);
						 cm.gainItem(4310023, 10);

	var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182019)).copy(); // ����һ��Equip��                    
			toDrop.setStr(15); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������ 
			toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 1);//����ʹ��3�죬������ʧ

			cm.addFromDrop(cm.getC(),toDrop,false);

						cm.setBossLogAcc("��1��һ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��һ�콱����");
				cm.worldMessageEffect("[���ǹ���] ��ϲ���" + cm.getName() + "�ڸ���ר������ȡ�˽�������ǹ��ʽ�������ҿ���ף�ذ�", 16, 60);
						cm.worldSpouseMessage(0x21, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��һ�칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("��ȡʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��10��. ");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -2 && cm.getBossLogAcc("��1�¶���") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 10000);
						cm.gainItem(4001839, 1000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ��콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ��칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -3 && cm.getBossLogAcc("��1������") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�����칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 4) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -4 && cm.getBossLogAcc("��1������") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�����칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -5 && cm.getBossLogAcc("��1������") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 30);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�����칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 6) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -6 && cm.getBossLogAcc("��1������") == 0 ) {
						cm.gainItem(2049135, 20);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�����칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 7) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -7 && cm.getBossLogAcc("��1������") == 0 ) {
						cm.gainItem(5062009, 200);
						cm.gainNX(1, 20000);
						cm.gainMeso(20000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�����칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 8) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -8 && cm.getBossLogAcc("��1�°���") == 0) {
						cm.gainItem(5062500, 200);
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�°���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڰ��콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڰ��칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 9) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -9 && cm.getBossLogAcc("��1�¾���") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						cm.gainItem(2340000, 20);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¾���", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ھ��콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ھ��칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 10) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -10 && cm.getBossLogAcc("��1��ʮ��") == 0) {
						cm.gainItem(5750000, 20);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ�콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ�칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 11) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -11 && cm.getBossLogAcc("��1��ʮһ��") == 0) {
						cm.gainItem(2430692, 1);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮһ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮһ�콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮһ�칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 12) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -12 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainItem(2049116, 5);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 13) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -13 && cm.getBossLogAcc("��1��ʮ����") == 0 ) {
						cm.gainItem(2049135, 20);
						cm.gainNX(1, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 14) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -14 && cm.getBossLogAcc("��1��ʮ����") == 0 ) {
						cm.gainItem(5062009, 300);
						cm.gainNX(1, 40000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 15) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -15 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 16) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -16 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						cm.gainItem(2431762, 5);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 17) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -17 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 18) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -18 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainItem(5062500, 200);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼��ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 19) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -19 && cm.getBossLogAcc("��1��ʮ����") == 0) {
						cm.gainItem(2590004, 1);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1��ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 20) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -20 && cm.getBossLogAcc("��1�¶�ʮ��") == 0 ) {
						cm.gainItem(2049135, 50);
						cm.gainNX(1, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ�콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ�칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 21) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -21 && cm.getBossLogAcc("��1�¶�ʮһ��") == 0 ) {
						cm.gainItem(2340000, 50);
						cm.gainNX(1, 40000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮһ��", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�����콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮһ�칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 22) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -22 && cm.getBossLogAcc("��1�¶�ʮ����") == 0) {
						cm.gainItem(4001839, 2000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 50000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��140��. ");
					cm.dispose();
				}
			} else if (typed == 23) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -23 && cm.getBossLogAcc("��1�¶�ʮ����") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 50000);
						cm.gainMeso(1000000);
						cm.gainItem(2049137, 20);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��160��. ");
					cm.dispose();
				}
			} else if (typed == 24) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -24 && cm.getBossLogAcc("��1�¶�ʮ����") == 0) {
						cm.gainItem(2590004, 1);
						cm.gainNX(2, 50000);
						cm.gainMeso(20000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "����ʮ����������ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 25) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -25 && cm.getBossLogAcc("��1�¶�ʮ����") == 0) {
						cm.gainItem(5750000, 50);
						cm.gainNX(2, 50000);
						cm.gainMeso(30000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1������", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 26) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -26 && cm.getBossLogAcc("��1�¶�ʮ����") == 0) {
						cm.gainItem(2431762, 10);
						cm.gainNX(2, 50000);
						cm.gainMeso(30000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "�����ǹ��ʡ� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.\r\n4). �ȼ�С��180��.");
					cm.dispose();
				}
			} else if (typed == 27) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -27 && cm.getBossLogAcc("��1�¶�ʮ����") == 0 ) {
						cm.gainItem(2431354, 1);
						cm.gainNX(1, 50000);
						cm.gainMeso(50000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
						cm.dispose();
					}
				} else {
					cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��360����.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.\r\n4). �ȼ�С��200��.");
					cm.dispose();
				}
			} else if (typed == 28) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("��¼����1��") == -28 && cm.getBossLogAcc("��1�¶�ʮ����") == 0 ) {
						//cm.gainItem(1182019, 1);
						cm.gainNX(1, 100000);
						cm.gainMeso(100000000);
						 cm.gainItem(4310023, 10);
	var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182019)).copy(); // ����һ��Equip��                    
			toDrop.setStr(15); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������ 
			toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//����ʹ��3�죬������ʧ

			cm.addFromDrop(cm.getC(),toDrop,false);
						cm.setBossLogAcc("��1�¶�ʮ����", -2);
						cm.sendOk("��ϲ���ɹ���ȡ��¼�ڶ�ʮ���콱����");
						cm.worldSpouseMessage(0x20, "��������ʮ��ǩ���� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ�ʮ���칤�ʽ�����");
						cm.dispose();
					} else {
						cm.sendOk("�޷���ȡ�������\r\n1.���Ѿ���ȡ���������\r\n2.��Ӧ����ȡ#r#e��"+(cm.getBossLogAcc("��¼����1��")*-1)+"��#n#k�����");
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

function setBossLog() {
	if (cm.getBossLogAcc("��¼����") <= 0 && cm.getBossLogAcc("��¼����1��") > -28) {
		cm.setBossLogAcc("��¼����");
		cm.setBossLogAcc("��¼����1��", -2);
	}
}