function start() {
	if (cm.getBossLogAcc("测试") ==0) {
	//cm.gainItem(2431551, 20);
	cm.gainNX(1, 1000000);
	//cm.gainItem(5062009, 5000);
	//cm.gainItem(5062500, 5000);
	//cm.gainRMB(2000)
	cm.setBossLogAcc("测试");
	cm.sendOk("成功领取");
	cm.dispose();
	} else {
	cm.sendOk("#b希望您在小雨冒险岛玩的愉快.");
       cm.worldSpouseMessage(0x23, "『一亿点卷』 : " + cm.getChar().getName() + " 通过市场裂空之鹰领取了小雨赠送的百万大奖，大家快来领取吧.");

	cm.dispose();
	}
}