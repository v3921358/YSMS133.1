function start() {
	var Exp = Math.floor(Math.random()*4000000)+8000000;
	im.gainExp(Exp);
	im.gainItem(2432392, -1);
	im.getPlayer().dropMessage(1, "�����"+Exp+"����");
	im.dispose();
}