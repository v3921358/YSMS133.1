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
			var selStr = "- #d��ǰ�������У�#k#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k     #d�ɶһ�#i1112793##k\r\n\r\n";
			selStr +="#r#t1112793#����ѡ��#k#k\r\n";
			selStr +="#L1##b"+aaa+"  ����/ħ�� +  5 #r( " + cm.getItemQuantity("4310108") + " / 200 ��)#l#k\r\n";
			selStr +="#L2##b"+aaa+"  ����/ħ�� + 10 #r( " + cm.getItemQuantity("4310108") + " / 500 ��)#l#k\r\n";
			selStr +="#L3##b"+aaa+"  ����/ħ�� + 20 #r( " + cm.getItemQuantity("4310108") + " / 1000 ��)#l#k\r\n";
			selStr +="#L4##b"+aaa+"  ����/ħ�� + 30 #r( " + cm.getItemQuantity("4310108") + " / 1500 ��)#l#k\r\n";
			selStr +="#L5##b"+aaa+"  ����/ħ�� + 40 #r( " + cm.getItemQuantity("4310108") + " / 2500 ��)#l#k\r\n";
			selStr +="#L6##b"+aaa+"  ����/ħ�� + 50 #r( " + cm.getItemQuantity("4310108") + " / 4000 ��)#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e200 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 5    - #e����#n: 5    - #e����#n: 5\r\n- #e����#n: 5    - #e����#n: 5    - #eħ��#n: 5\r\n\r\n");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e500 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 10    - #e����#n: 10    - #e����#n: 10\r\n- #e����#n: 10    - #e����#n: 10    - #eħ��#n: 10\r\n\r\n");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e1000 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 20    - #e����#n: 20    - #e����#n: 20\r\n- #e����#n: 20    - #e����#n: 20    - #eħ��#n: 20\r\n\r\n");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e1500 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 30    - #e����#n: 30    - #e����#n: 30\r\n- #e����#n: 30    - #e����#n: 30    - #eħ��#n: 30\r\n\r\n");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e2500 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 40    - #e����#n: 40    - #e����#n: 40\r\n- #e����#n: 40    - #e����#n: 40    - #eħ��#n: 40\r\n\r\n");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\t#i4310108# x #r" + cm.getItemQuantity("4310108") + "#k\r\n\r\n- #b#e4000 ���ɶһ���������Ʒ�� #i1112793##n#k\r\n\r\n- #e#r����#n: 50    - #e����#n: 50    - #e����#n: 50\r\n- #e����#n: 50    - #e����#n: 50    - #eħ��#n: 50\r\n\r\n");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4310108, 200) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -200);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(5); //װ������
			toDrop.setDex(5); //װ������
			toDrop.setInt(5); //װ������
			toDrop.setLuk(5); //װ������
			toDrop.setMatk(5); //������
			toDrop.setWatk(5); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(��Ȼ) һ��,��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 200 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.haveItem(4310108, 500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(10); //װ������
			toDrop.setDex(10); //װ������
			toDrop.setInt(10); //װ������
			toDrop.setLuk(10); //װ������
			toDrop.setMatk(10); //������
			toDrop.setWatk(10); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k ȫ����+10 һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(ȫ����+10),��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 500 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.haveItem(4310108, 1000) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -1000);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(20); //װ������
			toDrop.setDex(20); //װ������
			toDrop.setInt(20); //װ������
			toDrop.setLuk(20); //װ������
			toDrop.setMatk(20); //������
			toDrop.setWatk(20); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k ȫ����+20 һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(ȫ����+20),��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 1000 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.haveItem(4310108, 1500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -1500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(30); //װ������
			toDrop.setDex(30); //װ������
			toDrop.setInt(30); //װ������
			toDrop.setLuk(30); //װ������
			toDrop.setMatk(30); //������
			toDrop.setWatk(30); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k ȫ����+30 һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(ȫ����+30),��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 1500 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.haveItem(4310108, 2500) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -2500);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			toDrop.setMatk(40); //������
			toDrop.setWatk(40); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k ȫ����+40 һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(ȫ����+40),��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 2500 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}else if(typed==6){
                if (cm.haveItem(4310108, 4000) && cm.getSpace(1) >= 1) {
			cm.gainItem(4310108, -4000);
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
			toDrop.setStr(50); //װ������
			toDrop.setDex(50); //װ������
			toDrop.setInt(50); //װ������
			toDrop.setLuk(50); //װ������
			toDrop.setMatk(50); //������
			toDrop.setWatk(50); //ħ������ 
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ������� #r����ָ��#k ȫ����+50 һ��.");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ " + cm.getChar().getName() + " �һ��� ����ָ��(ȫ����+50),��Ľ�͸Ͽ쿪ͨ�ɡ�");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i1112793# = #r" + cm.getItemQuantity("4310108") + " / 4000 ��#k\r\n\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#bÿ�춼���������������ȡ100����#k");
			cm.dispose();
				}
			}
		}
	}
   }