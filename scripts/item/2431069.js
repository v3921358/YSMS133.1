function start() {
	im.gainItem(2431069, -1);
	im.gainItem(3994418, 1);
	im.gainItem(5062002, 50);
	im.gainItem(5062500, 50);
	im.gainPlayerPoints(3000);
	im.sendOk("��ϲ�����ֵ���а�ڶ�����������ע����ա�");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "��ÿ�ճ�ֵ���а�����" + " : " + "���" + im.getChar().getName() + ", ����˳�ֵ���а�ڶ���������"));
	im.dispose();
}