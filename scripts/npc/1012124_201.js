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
			var selStr = "#d#eֻҪ������½7�죬ÿ�켴�ɻ��������Ʒ��#n#k\r\n";
			selStr +="        - #e#d����Ҫ��½ " + (7+cm.getBossLogAcc("��½")) + " �����ȫ������#n\r\n"
			selStr +="#L1##b"+aaa+" ��һ���½���� #v1112793# #rx 1#b [�������鿴]#l#k\r\n"; 
			selStr +="#L2##b"+aaa+" �ڶ����½���� #v1112159# #rx 2#b [�������鿴]#l#k\r\n";
			selStr +="#L3##b"+aaa+" �������½���� #v5062002# #rx 20#b[�������鿴]#l#k\r\n";
			selStr +="#L4##b"+aaa+" �������½���� #v1003717# #rx 1#b [�������鿴]#l#k\r\n";
			selStr +="#L5##b"+aaa+" �������½���� #v1142683# #rx 1#b [�������鿴]#l#k\r\n";
			selStr +="#L6##b"+aaa+" �������½���� #v1182061# #rx 1#b [�������鿴]#l#k\r\n";
			selStr +="#L7##b"+aaa+" �������½���� #v1102724# #rx 1#b [�������鿴]#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d��һ���½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v1112793##r#t1112793# x 1 #b����\r\n\r\n�˽�ָ��Ȼȫ����+5,������������ħ����������������˻�������ȡ#rð�ձ� 1ǧ�� #b��ҡ�");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#d�ڶ����½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v1112159##r#t1112159# x 1 #b����\r\n #v1112271##r#t1112271# x 1 #b����\r\n\r\n������˻�������ȡ���þ� #r5#k#b ǧ�㡣");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v5062000##r#t5062000# x 20 #b����\r\n #v5062002# #r#t5062002# x 20 #b����\r\n #v5064000#  #r#t5064000# x 20 #b����");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v1003717##r#t1003717# x 1 #b����\r\n\r\n#e#dװ�����ܣ�#n\r\n\r\n- #e#r����#n:18    - #e����#n:18    - #e����#n:18    - #e����#n:18\r\n- #e����#n:148   - #eħ��#n:148   -#e ����#n:100   -#e �ر�#n:100\r\n\r\n ");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v1142683##r#t1142683# x 1 #b����\r\n\r\n#e#dװ�����ܣ�#n\r\n\r\n- #e#r����#n:5     - #eħ��#n:5     - #e����#n:7\r\n\r\n ");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v2340000##r#t2340000# x 20 #b����\r\n #v2049323##r����#t2049323# x 20 #b����\r\n #v1182061##r#t1182061# x 1 #b����\r\n\r\n#e#d����װ���ܣ�#n\r\n\r\n- #e#r����#n:10    - #e����#n:10    - #e����#n:10\r\n- #e����#n:10    - #e����#n:8    - #eħ��#n:8");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- #e#d�������½ʱ�佱��#k#n\r\n\r\n\r\n   #b����ȡ5��Сʱ����������ȡ����ȡ�������õ�:\r\n #v1102724##r#t1102724# x 1 #b����\r\n\r\n#e#d����װ���ܣ�#n\r\n\r\n- #e#r����#n:15    - #e����#n:15    - #e����#n:15\r\n- #e����#n:15    - #e����#n:15    - #eħ��#n:15\r\n\r\n#b�ɹ���ȡ��7�콱���������޷��ٴ���ȡ���˵�½���������һ��Gm���͵� 1 ��������");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getBossLogAcc("��½") == -1 && cm.getBossLogAcc("��һ��") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1112793, 1);
			cm.gainMeso(10000000);
			cm.setBossLogAcc("��һ��", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½��һ�콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ��һ���½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.getBossLogAcc("��½") == -2 && cm.getBossLogAcc("�ڶ���") == 0 && cm.getSpace(2) >= 1) {
			cm.gainNX(2, 5000);
			cm.gainItem(1112159, 1);
			cm.gainItem(1112271, 1);
			cm.setBossLogAcc("�ڶ���", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�ڶ��콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�ڶ����½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.getBossLogAcc("��½") == -3 && cm.getBossLogAcc("������") == 0 && cm.getSpace(5) >= 1) {
			cm.gainItem(5062000, 20);
			cm.gainItem(5062002, 20);
			cm.gainItem(5064000, 20);
			cm.setBossLogAcc("������", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�����콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). �����������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.getBossLogAcc("��½") == -4 && cm.getBossLogAcc("������") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1003717, 1);
			cm.setBossLogAcc("������", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�����콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.getBossLogAcc("��½") == -5 && cm.getBossLogAcc("������") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(1142683, 1);
			cm.setBossLogAcc("������", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�����콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==6){
                if (cm.getBossLogAcc("��½") == -6 && cm.getBossLogAcc("������") == 0 && cm.getSpace(2) >= 3) {
			cm.gainItem(2049323, 20);
			cm.gainItem(2340000, 20);
			var ii = Packages.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182061)).copy(); // ����һ��Equip��                    
			toDrop.setStr(10); //װ������
			toDrop.setDex(10); //װ������
			toDrop.setInt(10); //װ������
			toDrop.setLuk(10); //װ������
			toDrop.setMatk(8); //������
			toDrop.setWatk(8); //ħ������ 
			Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(),toDrop,false);
			cm.setBossLogAcc("������", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�����콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������½������");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
			}else if(typed==7){
                if (cm.getBossLogAcc("��½") == -7 && cm.getBossLogAcc("������") == 0 && cm.getSpace(1) >= 1) {
			cm.gainItem(4001833, 1);
			cm.gainNX(1, 10000);
			var ii = Packages.server.MapleItemInformationProvider.getInstance();
			var toDrop = ii.randomizeStats(ii.getEquipById(1102724)).copy(); // ����һ��Equip��                    
			toDrop.setStr(15); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������ 
			Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(),toDrop,false);
			cm.setBossLogAcc("������", -2);
			cm.sendOk("��ϲ���ɹ���ȡ��½�����콱����");
			cm.worldSpouseMessage(0x20, "������7���½������ : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�������½�����������һ����");
			cm.dispose();
				} else {
			cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ��������ʱ�䲻��5��Сʱ.\r\n2). �Ѿ���ȡ������Ľ���.\r\n3). װ���������뼰ʱ����.");
			cm.dispose();
				}
           }
		}
	  }
	}