function start() {
   if (cm.getLevel() >= 120 && cm.getBossLogAcc("GM补偿") == 0) {
	cm.gainItem(2431528, 1);
	cm.gainItem(2431394, 1);
	cm.setBossLogAcc("GM补偿", -2);
        cm.playerMessage(-1, "恭喜您获得Gm补偿道具。");
        cm.worldSpouseMessage(0x20, "『Gm补偿』 : 恭喜 " + cm.getPlayer().getName() + " 在市场普通服务员处领取了GM补偿礼包.");
	cm.dispose();
    } else {
        cm.sendOk("等级不够120级或者您已经领取过无需再领.11月20日晚12点无法领取。请抓紧时间");
	cm.dispose();
    }
}