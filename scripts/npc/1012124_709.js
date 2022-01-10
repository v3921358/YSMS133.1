function start() {
	cm.sendOk("已经帮您打开本服充值连接了。");
	cm.dispose();
	cm.openWeb("http://henet.hzfuhao.com/pay2/showPayStyle.html?subareaId=93936");
}