function start() {
	im.gainItem(2432223, -1);
	im.gainItem(2430865, 1, 7);
	//im.gainItem(1072743, 1); //暴君披风
	//im.sendOk("很抱歉您没有获得暴君装备。");
	//im.sendOk("恭喜您获得#z1072743#");
	//im.worldSpouseMessage(0x23, "『暴君几率箱』 : " + im.getChar().getName() + " 很遗憾的没有获得装备。");
	//im.worldSpouseMessage(0x23, "『暴君几率箱』 : " + im.getChar().getName() + " 获得了 暴君西亚戴斯靴。");
	im.worldSpouseMessage(0x23, "『一朵玫瑰』 : " + im.getChar().getName() + " yy贡献度获得了总共7天 理财服务。");
	im.dispose();
}