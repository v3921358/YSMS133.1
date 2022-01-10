function start() {
	im.gainItem(2431070, -1);
	im.gainItem(3994417, 1);
	im.gainItem(5062002, 30);
	im.gainItem(5062500, 30);
	im.gainPlayerPoints(1000);
	im.sendOk("恭喜您活动充值排行榜第三名奖励，请注意查收。");
	im.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, im.getC().getChannel(), "『每日充值排行榜奖励』" + " : " + "玩家" + im.getChar().getName() + ", 获得了充值排行榜第三名奖励。"));
	im.dispose();
}