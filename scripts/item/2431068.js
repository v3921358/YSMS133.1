function start() {
	im.gainItem(2431068, -1);
	im.gainItem(3994419, 1);
	im.gainItem(5062002, 100);
	im.gainItem(5062500, 100);
	im.gainPlayerPoints(5000);
	im.sendOk("��ϲ�����ֵ���а��һ����������ע����ա�");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "��ÿ�ճ�ֵ���а�����" + " : " + "���" + im.getChar().getName() + ", ����˳�ֵ���а��һ��������"));
	im.dispose();
}