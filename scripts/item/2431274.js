/*  100Ԫ���� */

function start() {
	im.gainItem(2431274, -1);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1702368)).copy(); // ����һ��Equip��                    
	toDrop.setStr(10); //װ������
	toDrop.setDex(10); //װ������
	toDrop.setInt(10); //װ������
	toDrop.setLuk(10); //װ������
	toDrop.setMatk(10); //������
	toDrop.setWatk(10); //ħ������ 
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1112793)).copy(); // ����һ��Equip��                    
	toDrop.setStr(10); //װ������
	toDrop.setDex(10); //װ������
	toDrop.setInt(10); //װ������
	toDrop.setLuk(10); //װ������
	toDrop.setMatk(10); //������
	toDrop.setWatk(10); //ħ������ 
	im.addFromDrop(im.getC(), toDrop, false);	
        im.dispose(); 
}