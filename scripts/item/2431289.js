//����ñ��
function start() {
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003719)).copy(); // ����һ��Equip��                    
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(30); //������
	toDrop.setWatk(30); //ħ������ 
	toDrop.setSpeed(15); //�ƶ��ٶ�
	toDrop.setJump(15); //��Ծ
	toDrop.setAcc(15); //
	toDrop.setOwner("������װ");
	im.addFromDrop(im.getC(), toDrop, false);
	im.sendOk("�ɹ���� #r������װ#k һ����");
	im.dispose();
	im.remove(1);
}