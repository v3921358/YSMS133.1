/*
1212063 - ������ħ��ԴȪ��         �ȼ�: 150 ҹ�ⷨʦ
1222058 - ��������ʹ���           �ȼ�: 150 ��ʹ����
1232057 - ����������ʹ��           �ȼ�: 150 ������
1242060 - �����ɾ���֮��           �ȼ�: 150 ���
1302275 - ����������֮��           �ȼ�: 150 ���ֽ�
1312153 - ������˫�����⸫         �ȼ�: 150 ���ָ�ͷ
1322203 - �����ɸ���ϴ�           �ȼ�: 150 ���ֶ���
1332225 - �����ɴ���ʿ�｣         �ȼ�: 150 �̵�
1342082 - �����ɼ���֮��           �ȼ�: 150 ˫������
1362090 - �����ɶ�������           �ȼ�: 150 ��Ӱ
1372177 - ������ħ����ȡ��         �ȼ�: 150 ����
1382208 - ������ħ��֮��           �ȼ�: 150 ����
1402196 - ���������֮��           �ȼ�: 150 ˫�ֽ�
1412135 - ������ս�����⸫         �ȼ�: 150 ˫�ָ�ͷ
1422140 - ���������紸             �ȼ�: 150 ˫�ֶ���
1432167 - �����ɹ���ǹ             �ȼ�: 150 ���� ǹ
1442223 - �����ɰ��¿��и�         �ȼ�: 150 ս�� ì
1462193 - �����ɷ�����             �ȼ�: 150 ��
1472214 - ������Σ��֮��           �ȼ�: 150 ȭ��
1452205 - ������׷����             �ȼ�: 150 ��
1482168 - �����ɾ���֮צ           �ȼ�: 150 ָ��
1492179 - ����������ǹ             �ȼ�: 150 ����
1522094 - ������˫������           �ȼ�: 150 ˫��ǹ
1532098 - ��������ҫ��             �ȼ�: 150 ����
1252015 - �����ɱ�����ħ����       �ȼ�: 150 ��֮��)

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

1003797 - �߹�սʿͷ��             �ȼ�: 150
1003798 - �߹�����ά��ñ           �ȼ�: 150
1003799 - �߹���������ñ           �ȼ�: 150
1003800 - �߹�̿���ñ             �ȼ�: 150
1003801 - �߹�������ñ             �ȼ�: 150
1042254 - ӥ��սʿ����             �ȼ�: 150
1042255 - ӥ�۵�ά�泤��           �ȼ�: 150
1042256 - ӥ����������             �ȼ�: 150
1042257 - ӥ�۴̿ͳ���             �ȼ�: 150
1042258 - ӥ������������           �ȼ�: 150
1062165 - ħ��ʦսʿ�̿�           �ȼ�: 150
1062166 - ħ��ʦ��ά��̿�         �ȼ�: 150
1062167 - ħ��ʦ�����̿�           �ȼ�: 150
1062168 - ħ��ʦ�̿Ͷ̿�           �ȼ�: 150
1062169 - ħ��ʦ�����߶̿�         �ȼ�: 150
*/


//                    ��Ҫ��Ԫ��                     �жϵ����ֵ���      �жϱ����ո�

function start() {
  if (im.getHyPay(1) >= 900 && im.getSevenDayPayLog(1).get(0) >= 900 && im.getSpace(1) >= 5) {
        im.gainItem(2430626, -1);
	im.addHyPay(900);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003800)).copy(); //[³����˹ñ��]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(10); //������
	toDrop.setWatk(10); //ħ������
	toDrop.setBossDamage(50);// BOSS�� 
	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("�������桤������ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1042257)).copy(); //[³����˹����]                    
	toDrop.setStr(40); //װ������
	toDrop.setDex(40); //װ������
	toDrop.setInt(40); //װ������
	toDrop.setLuk(40); //װ������
	toDrop.setMatk(10); //������
	toDrop.setWatk(10); //ħ������ 
	toDrop.setBossDamage(50);// BOSS��
	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("�������桤�����ɵ���");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1062168)).copy(); //[³����˹����]                    
	toDrop.setStr(40); //װ������
	toDrop.setDex(40); //װ������
	toDrop.setInt(40); //װ������
	toDrop.setLuk(40); //װ������
	toDrop.setMatk(10); //������
	toDrop.setWatk(10); //ħ������ 
	toDrop.setBossDamage(50);// BOSS��
	toDrop.setIgnorePDR(20);// ���ӷ���
//	toDrop.setTotalDamage(20); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("�������桤�����ɵ���");
	im.addFromDrop(im.getC(), toDrop, false);
/*      var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1082556)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1102623)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1132247)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1152160)).copy(); //[���л���]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1012438)).copy(); //[��������]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1022211)).copy(); //[�����۾�]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1032224)).copy(); //[���ж���]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();				
	var toDrop = ii.randomizeStats(ii.getEquipById(1122269)).copy(); //[���е�׹]                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(20); //������
	toDrop.setWatk(20); //ħ������ 
	toDrop.setOwner("�������桤����ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);

	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1522094)).copy(); //[����]             
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
//	toDrop.setInt(50); //װ������
//	toDrop.setLuk(50); //װ������
//	toDrop.setMatk(200); //ħ������
	toDrop.setWatk(170); //������ 
	toDrop.setBossDamage(100);// BOSS��
	toDrop.setIgnorePDR(50);// ���ӷ���
	toDrop.setTotalDamage(10); //���˺�
	toDrop.setAllStat(20);// ȫ����
	toDrop.setLimitBreak(20000000);
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60002);
	toDrop.setPotential3(40603);
//	toDrop.setPotential4(40603);
//	toDrop.setPotential5(40603);
//	toDrop.setPotential6(40603);
	toDrop.setOwner("�������桤������ϵ��");
	im.addFromDrop(im.getC(), toDrop, false);*/
	im.worldSpouseMessage(0x20, "����������������� :  ��� " + im.getChar().getName() + " ��� �������桤ϵ�����ɵ���");
	im.sendOk("�ɹ���� #r�������桤ϵ������װϵ��#k�˼� ��");
	im.dispose(); 
   } else {
	im.sendOk("#r ������û�г�ֵ2000Ԫ����û��2000Ԫ��֧�������߱���װ�������� 10 �����޷������ϵ������:\r\n\r\n");
	im.dispose();
    }
}