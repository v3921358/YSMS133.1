function start() {
	im.gainItem(2431070, -1);
	im.gainItem(3994417, 1);
	im.gainItem(5062002, 30);
	im.gainItem(5062500, 30);
	im.gainPlayerPoints(1000);
	im.sendOk("��ϲ�����ֵ���а��������������ע����ա�");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "��ÿ�ճ�ֵ���а�����" + " : " + "���" + im.getChar().getName() + ", ����˳�ֵ���а������������"));
	im.dispose();
}