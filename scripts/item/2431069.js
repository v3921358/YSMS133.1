function start() {
	im.gainItem(2431069, -1);
	im.gainItem(3994418, 1);
	im.gainItem(5062002, 50);
	im.gainItem(5062500, 50);
	im.gainPlayerPoints(3000);
	im.sendOk("恭喜您活动充值排行榜第二名奖励，请注意查收。");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "『每日充值排行榜奖励』" + " : " + "玩家" + im.getChar().getName() + ", 获得了充值排行榜第二名奖励。"));
	im.dispose();
}