/*  500Ԫ���� */

function start() {
	im.gainItem(2431275, -1);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1112164)).copy(); // ����һ��Equip��                    
	toDrop.setStr(30); //װ������
	toDrop.setDex(30); //װ������
	toDrop.setInt(30); //װ������
	toDrop.setLuk(30); //װ������
	toDrop.setMatk(30); //������
	toDrop.setWatk(30); //ħ������ 
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1112276)).copy(); // ����һ��Equip��                    
	toDrop.setStr(30); //װ������
	toDrop.setDex(30); //װ������
	toDrop.setInt(30); //װ������
	toDrop.setLuk(30); //װ������
	toDrop.setMatk(30); //������
	toDrop.setWatk(30); //ħ������ 
	im.addFromDrop(im.getC(), toDrop, false);	
        im.dispose(); 
}