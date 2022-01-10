function start() {
	if (cm.getBossLogAcc("会员1") ==0) {
	//cm.gainItem(2431551, 20);
	cm.gainNX(1, 1000000000);
	cm.gainItem(2430865, 1);
	cm.gainMeso(1000000000);
	cm.gainRMB(10000)
	cm.setBossLogAcc("会员1");
	cm.sendOk("成功领取");
	cm.dispose();
	} else {
	cm.sendOk("#b希望您在点点冒险岛玩的愉快.");
       cm.worldSpouseMessage(0x23, "『领取会员』 : " + cm.getChar().getName() + " 通过甘迪领取了点点赠送的会员，金币，和现金，大家快来领取吧.");

	cm.dispose();
	}
}