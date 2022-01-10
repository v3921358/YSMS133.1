function start() {
	if (im.getBossLogAcc("福利1") ==0) {

	im.gainItem(2431878, -1);//领取成功该宝箱消失

	im.gainItem(3015116, 1); //椅子1个
	im.gainNX(2, 100000);     //抵用卷10W
	im.gainNX(1, 50000);     //点卷5W
	im.gainItem(2049124, 5); //正向混沌卷轴50%
	im.gainItem(2049750, 1); //S级潜能卷80%
	im.gainItem(2049135, 20);//惊人正义混沌卷轴 20%
	im.gainMeso(30000000);  //金币5千万
	im.gainItem(2430737, 1)  //周年庆武器卷自选箱1个 

	im.setBossLogAcc("福利1");
	im.sendOk("成功领取内测奖励");
	im.dispose();
	} else {
	im.sendOk("#b希望您在流星玩的愉快.");
       //cm.worldSpouseMessage(0x23, "『内测奖励』 : " + cm.getChar().getName() + " 领取了内测奖励，大家快来领取吧.");

	im.dispose();
	}
}