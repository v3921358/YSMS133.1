function start() {
    var eim = cm.getEventInstance();
	var itemid = eim.getProperty("rewarditem");
	var rewardid = eim.getProperty("rewardplayerid");
	if (cm.getPlayer().getId() == rewardid) {
		cm.gainItem(itemid, 1);
	}
	cm.getPlayer().dropMessage(6, "[Roll - ����] ��ϲ��� "+eim.getProperty("rewardplayer")+" ����ߵ�������� "+cm.getItemName(itemid)+"x1");
	cm.dispose();
}