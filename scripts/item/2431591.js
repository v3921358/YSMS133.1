function start() {
        im.gainItem(2431591, -1);
	var ii = Packages.server.MapleItemInformationProvider.getInstance();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142574)).copy(); // ����һ��Equip��   1142574     1112941             
	toDrop.setStr(50); //װ������
	toDrop.setDex(50); //װ������
	toDrop.setInt(50); //װ������
	toDrop.setLuk(50); //װ������
	toDrop.setMatk(50); //������
	toDrop.setWatk(50); //ħ������ 
	toDrop.setSpeed(50); //�ƶ��ٶ�
	toDrop.setJump(50); //��Ծ
	toDrop.setAcc(50); //
	toDrop.setPotential1(60001);
	toDrop.setPotential2(60001);
	toDrop.setPotential3(60002);
	toDrop.setPotential4(40603);
	toDrop.setPotential5(40603);
	toDrop.setPotential6(40603);
	toDrop.setOwner("������װ");
	Packages.server.MapleInventoryManipulator.addFromDrop(im.getC(),toDrop,false);
	//im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "���ۼƳ�ֵ������" + " : " + "��� " + im.getChar().getName() + " ���������Ҷ�����л���� ����������ʹ һ��"));
	im.sendOk("�ɹ���� #r�ٷ���֤Ů��#k һ����");
	im.dispose(); 
}