function start() {
	if (im.getPlayer().getCSPoints(1) >= 300000 && im.getPlayer().getRMB() >= 300) {
	im.gainItem(2431673, -1);
	im.gainNX(1, -300000);
	im.gainPlayerPoints(1000000);
	im.gainItem(3994417, 1); //��ɫ����
	im.gainItem(3994418, 1); //��ɫ����
	im.gainItem(3994419, 1); //��ɫ����
	im.gainItem(3994420, 1); //��ɫ����
	im.gainItem(3994421, 1); //��ɫ����
	im.gainItem(3994422, 1); //��ɫ����
	im.gainItem(2049750, 1); //S��Ǳ�ܾ��� 80% 
	im.gainItem(2049402, 1); //����Ǳ�ܸ��Ӿ���
	im.gainItem(2048307, 1); //���⸽��Ǳ�ܸ��Ӿ���
	im.gainItem(4001716, 1); // 10E
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112164)).copy(); // ����һ��Equip��                    
	toDrop.setStr(30); //װ������
	toDrop.setDex(30); //װ������
	toDrop.setInt(30); //װ������
	toDrop.setLuk(30); //װ������
	toDrop.setMatk(30); //��������
	toDrop.setWatk(30); //ħ������ 
	toDrop.setAcc(30); //
	toDrop.setOwner("������װ");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1112276)).copy(); // ����һ��Equip��                    
	toDrop.setStr(30); //װ������
	toDrop.setDex(30); //װ������
	toDrop.setInt(30); //װ������
	toDrop.setLuk(30); //װ������
	toDrop.setMatk(30); //��������
	toDrop.setWatk(30); //ħ������ 
	toDrop.setAcc(30); //
	toDrop.setOwner("������װ");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1003719)).copy(); // ����һ��Equip��                    
	toDrop.setStr(30); //װ������
	toDrop.setDex(30); //װ������
	toDrop.setInt(30); //װ������
	toDrop.setLuk(30); //װ������
	toDrop.setMatk(50); //��������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setSpeed(30); //�ƶ��ٶ�
	toDrop.setJump(30); //��Ծ
	toDrop.setAcc(30); //
	toDrop.setOwner("������װ");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	im.sendOk("�ɹ���� #r�������#k һ����");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "�����СǮ���桻" + " : " + "��� " + im.getChar().getName() + " ����ʱ300Ԫ�����л�� ��װ �Լ� ���� �Լ� 10�� ��ҡ�"));
	im.dispose(); 
    } else {
	im.sendOk("#b���СǮ��һ�°ɡ�����ֵδ�ﵽ300Ԫ���ߵ������30��#k\r\n\r\n#v3994417# #v3994418# #v3994419# #v3994420# #v3994421# #v3994422# #v2049750# #v2049402# #v2048307#\r\n#r#t1003719##v1003719# : ȫ����30��������ħ��50��\r\n#t1112276##v1112276# : ȫ����30��������ħ��30��\r\n#t1112164##v1112164# : ȫ����30��������ħ��30��\r\n\r\n- #e#d����BUFF�Լ���輼��#k#n:\r\n#s80000077# #s80000077# #s80000077# #s80000081# #s80000082# #s80000083# #s80001198# #s80001241#");
	im.dispose();
	}
}