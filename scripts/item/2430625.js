/*
1212063 - ������ħ��ԴȪ�� - (������)
1222058 - ��������ʹ��� - (������)
1232057 - ����������ʹ�� - (������)
1242060 - �����ɾ���֮��   ���
1362090 - �����ɶ������� - (������)
1372177 - ������ħ����ȡ�� - (������)
1382208 - ������ħ��֮�� - (������)
1402196 - ���������֮�� - (������)
1432167 - �����ɹ���ǹ - (������)
1452205 - ������׷���� - (������)
1462193 - �����ɷ����� - (������)
1472214 - ������Σ��֮�� - (������)
1482168 - �����ɾ���֮צ - (������)
1522094 - ������˫������ - (������)
1332225 - �����ɴ���ʿ�｣ - (������)
1212089 - ����˫ͷ��               �ȼ�: 160
1222084 - ����������             �ȼ�: 160
1232084 - ���ж�ħ��               �ȼ�: 160
1242090 - ����������               �ȼ�: 160
1252033 - ���л���ħ����           �ȼ�: 160
1302297 - ���н�                   �ȼ�: 160
1312173 - ���и�                   �ȼ�: 160
1322223 - ���д�                   �ȼ�: 160
1332247 - ����ذ��                 �ȼ�: 160
1342090 - ���е�                   �ȼ�: 160
1362109 - ��������                 �ȼ�: 160
1372195 - ���ж���                 �ȼ�: 160
1382231 - ���г���                 �ȼ�: 160
1402220 - ����˫�ֽ�               �ȼ�: 160
1412152 - ����˫��ս��             �ȼ�: 160
1422158 - ���о޴�                 �ȼ�: 160
1432187 - ����ì                   �ȼ�: 160
1442242 - �����                   �ȼ�: 160
1452226 - ���й�                   �ȼ�: 160
1462213 - ������                   �ȼ�: 160
1472235 - ����ȭ��                 �ȼ�: 160
1482189 - ���г�ȭ                 �ȼ�: 160
1492199 - �������                 �ȼ�: 160
1522113 - ����˫�����             �ȼ�: 160
1532118 - ��������                 �ȼ�: 160
*/




function start() {
  if (im.getHyPay(1) >= 2000 && im.getSevenDayPayLog(1).get(0) >= 2000 && im.getSpace(1) >= 10) {
        im.gainItem(2430626, -1);
	im.addHyPay(2000);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003976)).copy(); //[����ñ��]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1052669)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1072870)).copy(); //[����Ь��]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1082556)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1102623)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1132247)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������
	toDrop.setBossDamage(40);// BOSS�� 
//	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1152160)).copy(); //[���л���]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1012438)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
//	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1022211)).copy(); //[�����۾�]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
	toDrop.setIgnorePDR(10);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
/*	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1032224)).copy(); //[���ж���]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
//	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1122269)).copy(); //[���е�׹]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setBossDamage(40);// BOSS�� 
//	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);*/
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1452226)).copy(); //[����]             
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(200); //ħ������
	toDrop.setWatk(140); //������ 
	toDrop.setBossDamage(100);// BOSS��
	toDrop.setIgnorePDR(50);// ���ӷ���
	toDrop.setTotalDamage(10); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setLimitBreak(50000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("��.ϵ����");
	im.addFromDrop(im.getC(), toDrop, false);
	im.worldSpouseMessage(0x20, "����������������� :  ��� " + im.getChar().getName() + " ��� ��������.ϵ������װ");
	im.sendOk("�ɹ���� #r��������.����ϵ��#k �˼��ס�");
	im.dispose(); 
   } else {
	im.sendOk("#r ������û�г�ֵ2000Ԫ����û��2000Ԫ��֧�������߱���װ��������10�����޷����:\r\n\r\n");
	im.dispose();
    }
}