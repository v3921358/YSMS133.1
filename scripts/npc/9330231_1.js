var status = -1;

function action(mode, type, selection) {
           //cm.gainPlayerEnergy(10);
	   cm.gainItem(2430216, 1);
	   //cm.gainItem(4001485, 1);
           cm.worldSpouseMessage(0x20,"[日常活动] 恭喜玩家 "+ cm.getChar().getName() +" 在扫荡秦皇陵活动中获得 1个宝箱");
	   cm.setEventCount("皇陵");
	   cm.setPartyEventCount("皇陵1");
	   cm.warp(910000000);
	   cm.dispose();
}