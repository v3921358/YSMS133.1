function start() {
        im.gainItem(2430971, -1);
/*	im.gainPlayerPoints(10000);
	im.gainPlayerEnergy(2000);
	im.gainItem(2430865, 1, 31);//�������
	im.gainItem(1112785, 1); //��ʯVIP��ָ
	im.gainItem(3994417, 3); //��ɫ����
	im.gainItem(3994418, 3); //��ɫ����
	im.gainItem(3994419, 3); //��ɫ����
	im.gainItem(3994420, 3); //��ɫ����
	im.gainItem(3994421, 3); //��ɫ����
	im.gainItem(3994422, 3); //��ɫ����
	im.gainItem(2049750, 10); //S��Ǳ�ܾ��� 80% 
	im.gainItem(2049402, 10); //����Ǳ�ܸ��Ӿ���
	im.gainItem(2048307, 10); //���⸽��Ǳ�ܸ��Ӿ���
	im.gainItem(2049137, 300);//������������
	im.gainItem(2340000, 300);//ף������
	im.gainItem(5062002, 300);//�߼�ħ��
	im.gainItem(5062500, 300);//��ʦħ��
	im.gainItem(2049323, 500);//�����ǿ
	im.gainItem(5064000, 300);//����
	im.gainItem(2430029, 100);//������ʾ
	im.gainItem(5390011, 500);//��ʯ����
	im.gainItem(5390018, 500);//���������� 
	im.gainItem(4001716, 3); // 30E
	im.gainNX(1, 4400000); */
	/*var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��                    
	toDrop.setStr(100); //װ������
	toDrop.setDex(100); //װ������
	toDrop.setInt(100); //װ������
	toDrop.setLuk(100); //װ������
	toDrop.setMatk(100); //������
	toDrop.setWatk(100); //ħ������ 
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1032224)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1122269)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1132247)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003976)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1102623)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1082556)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1052669)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1072870)).copy(); // ����һ��Equip��                    
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������
	toDrop.setUpgradeSlots(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
/* ���	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1242090)).copy(); // ����������                    
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */ 
/* ����	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1452226)).copy(); // ���й�                    
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */
/* ���� var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1482189)).copy(); // ���г�ȭ                   
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */
/* ��Ӱ	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1362109)).copy(); // ��������                   
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */
/* �̿�	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1472235)).copy(); // ����ȭ��                   
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	//toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */
/*	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1432187)).copy(); // �����                   
        toDrop.setStr(70); //װ������
	toDrop.setDex(70); //װ������
	toDrop.setInt(70); //װ������
	toDrop.setLuk(70); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(240); //������
	toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	//toDrop.setAllStat(20);
	toDrop.setOwner("�桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false); */
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1242060)).copy(); // 1332247�����                   
        toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	//toDrop.setMatk(50); //ħ������
	toDrop.setWatk(200); //������
	//toDrop.setUpgradeSlots(20); 
	toDrop.setBossDamage(100);
	toDrop.setIgnorePDR(70);
	toDrop.setTotalDamage(30);
	//toDrop.setLimitBreak(2100000000);
	//toDrop.setAllStat(20);
	toDrop.setOwner("�桤������ϵ");
	im.addFromDrop(im.getC(), toDrop, false);
        im.sendOk("�ɹ���� #r�桤������ϵ��#k һ����");
//	im.worldSpouseMessage(0x20,"���桤��������·����ƽһ���������� "+ im.getChar().getName() +" ����� �桤������ϵ�� ������");
	/*im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "���桤������" + " : " + "·����ƽһ���������� " + im.getChar().getName() + " ����� �桤����ϵ�� һ��");
	im.channelMessage(0x18, "�����������" + " : " + "������ " + im.getChar().getName() + " �������ֽ� 3000 �㹺�� �桤����ϵ�У�ʣ�� " + im.getHyPay(1) +" Ԫ�ֽ��");*/
        im.dispose(); 
}