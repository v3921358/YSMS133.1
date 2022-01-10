function start() {
	cm.sendOk("已经帮您打开本服充值连接了。");
	cm.dispose();
	cm.openWeb("http://www.libaopay.com/buy/?wid=63813");
}