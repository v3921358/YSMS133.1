var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var RMB = 0;

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
			var selStr = "#d����ǰ�����Ǳ�Ϊ��  #r" +cm.getRMB() + " #d �Ǳң���ѡ������Ҫ�ģ�#k\r\n\r\n";
			//selStr +="#L1#"+aaa+" #r200 #b���� #r#z2431938# #bһ��#l#k\r\n";
			selStr +="#L2#"+aaa+" #r4990000#k #b���� #rҹ�ⷨʦ150����#k #bһ��#l#k\r\n"; 
			selStr +="#L3#"+aaa+" #r4990000#k #b���� #r��������ʹ150����#k #bһ��#l#k\r\n";
			selStr +="#L4#"+aaa+" #r4990000#k #b���� #r��ħ������150����#k #bһ��#l#k\r\n";
			selStr +="#L5#"+aaa+" #r4990000#k #b���� #r���150����#k #bһ��#l#k\r\n";
			selStr +="#L6#"+aaa+" #r4990000#k #b���� #rʥ��ʿ150����#k #bһ��#l#k\r\n"; 
			selStr +="#L7#"+aaa+" #r4990000#k #b���� #r��ħ����150������#k #bһ��#l#k\r\n";
			selStr +="#L8#"+aaa+" #r4990000#k #b���� #r����150������#k #bһ��#l#k\r\n";
			selStr +="#L9#"+aaa+" #r4990000#k #b���� #r˫������150������#k #bһ��#l#k\r\n";
			selStr +="#L10#"+aaa+" #r4990000#k #b���� #r��Ӱ150������#k #bһ��#l#k\r\n";
			selStr +="#L11#"+aaa+" #r4990000#k #b���� #r��ʦ150������#k #bһ��#l#k\r\n";
			selStr +="#L12#"+aaa+" #r4990000#k #b���� #rӢ��150������#k #bһ��#l#k\r\n";
			selStr +="#L13#"+aaa+" #r4990000#k #b���� #r����ʿ150������#k #bһ��#l#k\r\n";
			selStr +="#L14#"+aaa+" #r4990000#k #b���� #r������150������#k #bһ��#l#k\r\n";
			selStr +="#L15#"+aaa+" #r4990000#k #b���� #r����150������#k #bһ��#l#k\r\n";
			selStr +="#L16#"+aaa+" #r4990000#k #b���� #r��ʿ150������#k #bһ��#l#k\r\n";
			selStr +="#L17#"+aaa+" #r4990000#k #b���� #r���ӳ�����150������#k #bһ��#l#k\r\n";
			selStr +="#L18#"+aaa+" #r4990000#k #b���� #r����150������#k #bһ��#l#k\r\n";
			selStr +="#L19#"+aaa+" #r4990000#k #b���� #r˫����150������#k #bһ��#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) { 
				typed=1;
				cm.sendYesNo("ȷ������һ�� #r#t2431938##k ��? ����ʹ�õ��� #r200#k �Ǳҡ�\r\n�򿪺������������150��װ������Ҫ��ȫ�����ϣ����г�����ͨ����Ա����������Ҫ��150������һ�ѡ�");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("ȷ������һ�� #r#t1212063##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("ȷ������һ�� #r#t1222058##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("ȷ������һ�� #r#t1232057##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n�Լ�#r 4990000000#k ���\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("ȷ������һ�� #r#t1242060##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("ȷ������һ�� #r#t1302275##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("ȷ������һ�� #r#t1322203##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("ȷ������һ�� #r#t1332225##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("ȷ������һ�� #r#t1342082##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("ȷ������һ�� #r#t1362090##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("ȷ������һ�� #r#t1382208##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("ȷ������һ�� #r#t1402196##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 13) {
				typed=13;
				cm.sendYesNo("ȷ������һ�� #r#t1432167##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 14) {
				typed=14;
				cm.sendYesNo("ȷ������һ�� #r#t1452205##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 15) {
				typed=15;
				cm.sendYesNo("ȷ������һ�� #r#t1462193##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 16) {
				typed=16;
				cm.sendYesNo("ȷ������һ�� #r#t1472214##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 17) {
				typed=17;
				cm.sendYesNo("ȷ������һ�� #r#t1482168##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 18) {
				typed=18;
				cm.sendYesNo("ȷ������һ�� #r#t1492179##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");
		} else if (selection == 19) {
				typed=19;
				cm.sendYesNo("ȷ������һ�� #r#t1522094##k ��? ����ʹ�õ��� #r4990000#k �Ǳ�\r\n\r\n\r\n#b����������������40\r\nBOSS�˺�  + 100%\r\n�����˺�  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  34,999,999\r\n����������  8 ��\r\n��һ����ȫ����20%\r\n�ڶ��������˺�12%\r\n��������BOSS�˺�40%");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getRMB() >= 20000000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-2000000);
			////cm.gainNX(1, -4990000000);
			cm.gainItem(2431938, 1);
			cm.sendOk("��ϲ���ɹ�����#t2431938#.");
			//cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

			//cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ���һ������������������.");
			cm.dispose();
				} else {
			//cm.sendOk("��ֵ2000000�Ǳң��������ۼƳ�ֵ200�Ǳҽ���������ȡ��");
			cm.dispose();
				}
			}else  if(typed==2){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1212063)).copy(); // ҹ�ⷨʦ150����             
//			toDrop.setStr(40); //װ������
//			toDrop.setDex(40); //װ������
			toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			toDrop.setMatk(200); //ħ������
//			toDrop.setWatk(200); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1212063##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==3){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1222058)).copy(); //  ��������ʹ150����           
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(130); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1222058##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==4){
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1232057)).copy(); //  ��ħ������150����           
			toDrop.setStr(40); //װ������
			//toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(175); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1232057##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==5){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1242060)).copy(); //  ���150����           
			//toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(130); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1242060##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==6){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1302275)).copy(); //  ʥ��ʿ150����           
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1302275##k");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==7){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1322203)).copy(); //  ��ħ����150������           
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1322203##k");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==8){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1332225)).copy(); //  ����150������          
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1332225##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==9){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1342082)).copy(); //  ˫������150������         
			//toDrop.setStr(40); //װ������
			//toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(80); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1342082##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==10){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1362090)).copy(); //  ��Ӱ150������         
			//toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			//toDrop.setMatk(200); //ħ������
			toDrop.setWatk(170); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1362090##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==11){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			////cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1382208)).copy(); //  ��ʦ150������         
			//toDrop.setStr(40); //װ������
			//toDrop.setDex(40); //װ������
			toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			toDrop.setMatk(205); //ħ������
			//toDrop.setWatk(170); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1382208##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==12){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1402196)).copy(); //  Ӣ��150������         
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(175); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1402196##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==13){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1432167)).copy(); //  ����ʿ150������         
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(175); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1432167##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==14){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1452205)).copy(); //  ������150������          
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1452205##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==15){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1462193)).copy(); //  ����150������         
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1462193##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==16){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1472214)).copy(); //  ��ʿ150������         
			//toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(90); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1472214##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==17){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1482168)).copy(); //  ���ӳ�150������        
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(130); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1482168##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==18){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1492179)).copy(); //  ����150������        
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(130); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1492179##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==19){ 
                if (cm.getSevenDayPayLog(1).get(0) >= 500 && cm.getRMB() >= 4990000 &&cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
			cm.gainRMB(-4990000);
			//cm.gainNX(1, -4990000000);
			var ii = cm.getItemInfo();					
			var toDrop = ii.randomizeStats(ii.getEquipById(1522094)).copy(); //  ˫����150������       
			toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			//toDrop.setInt(40); //װ������
			//toDrop.setLuk(40); //װ������
			//toDrop.setMatk(205); //ħ������
			toDrop.setWatk(165); //������ 
			toDrop.setBossDamage(100);
			toDrop.setIgnorePDR(70);
			toDrop.setTotalDamage(20);
			toDrop.setLimitBreak(4990000);
			toDrop.setPotential1(60001);
			toDrop.setPotential2(60002);
			toDrop.setPotential3(40603);
//			toDrop.setPotential4(40603);
//			toDrop.setPotential5(40603);
//			toDrop.setPotential6(40603);
			toDrop.setOwner("��˿��ϵ��");
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("��ϲ���ɹ����� #r��˿��ϵ�� #t1522094##k");
			cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
			cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�з����� ����һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
           }
		} 
	  }
	}