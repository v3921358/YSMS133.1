function start() {
    im.gainItem(2430505, -1);
	var ii = im.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112670)).copy(); // ����һ��Equip��                    
	toDrop.setEnhance(25); //
	//var timeStamp = java.lang.System.currentTimeMillis();
	//var expirationDate = timeStamp+30*86400*1000;
	//toDrop.setExpiration(expirationDate);
	toDrop.setOwner("��֮��");
	im.addFromDrop(im.getC(), toDrop, false);
    im.sendOk("��ϲ����� #r����Ա�ͳ�������#k ��");
	//im.worldSpouseMessage(0x20,"�����ּݵ�������ϲ��� "+ im.getChar().getName() +" �����˱���ð�յ�������ף����(��)�ɡ�");
	im.dispose(); 
}
