function start() {
	if (cm.getBossLogAcc("老公老婆戒指") ==0) {

	cm.gainItem(1112246, 1);

	cm.setBossLogAcc("老公老婆戒指");
	cm.sendOk("成功领取");
	cm.dispose();
	} else {
	cm.sendOk("#b希望您在流星冒险岛玩的愉快.");
       //cm.worldSpouseMessage(0x23, "『戒指晋级』 : " + cm.getChar().getName() + " 成功领取了初始老公老婆戒指，开启了晋级之路，大家祝福他（她）吧.");

	cm.dispose();
	}
}