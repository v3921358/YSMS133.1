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
			//selStr +="\t#b����ǰ�����ֽ�Ϊ��  #r" +cm.getRMB() + " #b �Ǳ�#n#k\r\n\r\n";
			selStr +="#L2#"+aaa+" #r1990000#k #b���� ��˿װ�� #rWELCOME��Ч������ָ#k  #bһ��#l#k\r\n";

			selStr +=" \r\n\r\n";

			cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- ȷ������һ������ #e#d#z1112941##k ��? ����ʹ�õ��� #r5990000#k �Ǳ�\r\n\r\n�����Ľ�ָ������������100\r\n��������  + 100\r\nħ��������  + 100\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- ȷ������һ������ #e#d#z1112941##k ��? ����ʹ�õ��� #r1990000#k �Ǳ�\r\n\r\n�����Ľ�ָ������������100\r\n��������  + 100\r\nħ��������  + 100\r\n\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			}
		} else if (status == 2) {
			if(typed==1){// WELCOME��Ч
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
                if (cm.getRMB() >= 599 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-599);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��  ��������˹���           
				toDrop.setStr(100); //װ������
				toDrop.setDex(100); //װ������
				toDrop.setInt(100); //װ������
				toDrop.setLuk(100); //װ������
				toDrop.setMatk(100); //ħ������
				toDrop.setWatk(100); //������ 
				toDrop.setBossDamage(200);//BOOS��
				//toDrop.setIgnorePDR(70);//���ӷ���
				//toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
//				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(50001);
//				toDrop.setPotential2(50002);



//				toDrop.setPotential1(40603);
//				toDrop.setPotential2(40603);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


//				toDrop.setOwner("����������ר��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ��������� #r#z1112941##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ��˿ " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ�桤����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ��������������Ľ�ָһ������ҿ��������Ȱ�", 7, 180);
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x21, "����˿�̳ǡ� : ��ϲ������� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ500Ԫ�����������500Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
				cm.dispose();
				}


			} else if(typed==2){// WELCOME��Ч
                if (cm.getSevenDayPayLog(1).get(0) >= 200 &&  cm.getRMB() >= 1990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-1990000);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��  �����Ľ�ָ           
				toDrop.setStr(100); //װ������
				toDrop.setDex(100); //װ������
				toDrop.setInt(100); //װ������
				toDrop.setLuk(100); //װ������
				toDrop.setMatk(100); //ħ������
				toDrop.setWatk(100); //������ 
				//toDrop.setBossDamage(100);//BOOS��
				//toDrop.setIgnorePDR(70);//���ӷ���
				//toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
//				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(50001);
//				toDrop.setPotential2(50002);



//				toDrop.setPotential1(40463);
//				toDrop.setPotential2(40463);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


//				toDrop.setOwner("����������ר��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ��������� #r#z1112941##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ��˿ " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ�桤����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ��������������Ľ�ָһ������ҿ��������Ȱ�", 7, 180);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ��˿ " + cm.getChar().getName() + " �������̳ǹ��� ����������ר��WELCOME��Чһ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ200Ԫ�����������200Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");				cm.dispose();
				}

			}
      }
   }
 }