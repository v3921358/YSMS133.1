function start() {
    im.gainItem(2430226, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1102630)).copy(); // ����һ��Equip��                    
	toDrop.setStr(15); //װ������
	toDrop.setDex(15); //װ������
	toDrop.setInt(15); //װ������
	toDrop.setLuk(15); //װ������
	toDrop.setMatk(15); //������
	toDrop.setWatk(15); //ħ������ 
	toDrop.setSpeed(15); //�ƶ��ٶ�
	toDrop.setJump(15); //��Ծ
	toDrop.setAcc(15); //
	var timeStamp = java.lang.System.currentTimeMillis();
	var expirationDate = timeStamp+7*86400*1000;
	toDrop.setExpiration(expirationDate);
	toDrop.setOwner("�񼶾���");
	im.addFromDrop(im.getC(), toDrop, false);
	im.channelMessage(0x18, "������͸���" + " : " + "��� " + im.getChar().getName() + " ���������Ҷ�����л���� �񼶾��� ����������ʹ 7��Ȩ һ��");
	im.sendOk("�ɹ���� #r����������ʹ 7��Ȩ#k һ����7���ڳ�ֵ�ۼ���500Ԫ������ͨ��������#b��Ҫ��ǿ#k�����ó�����Ϊ���ó��");
	im.dispose(); 
}