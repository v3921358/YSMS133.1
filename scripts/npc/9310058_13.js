function start() {
	if (cm.getBossLogAcc("测试") ==0) {
	cm.gainItem(2431551, 20);
	cm.gainNX(1, 100000);
	cm.gainItem(5062009, 500);
	cm.gainItem(5062500, 500);
	cm.setBossLogAcc("测试");
	cm.sendOk("成功领取");
	cm.dispose();
	} else {
	cm.sendOk("#b希望您在风之大陆冒险岛玩的愉快.");
	cm.dispose();
	}
}