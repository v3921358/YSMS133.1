function start() {
	im.gainItem(2431068, -1);
	im.gainItem(3994419, 1);
	im.gainItem(5062002, 100);
	im.gainItem(5062500, 100);
	im.gainPlayerPoints(5000);
	im.sendOk("恭喜您活动充值排行榜第一名奖励，请注意查收。");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "『每日充值排行榜奖励』" + " : " + "玩家" + im.getChar().getName() + ", 获得了充值排行榜第一名奖励。"));
	im.dispose();
}