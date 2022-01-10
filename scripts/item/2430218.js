function start() {
	im.dispose();
	im.gainItem(2430218, -1);
	im.getChar().levelUp();
	im.worldSpouseMessage(0x20, "【暴风成长秘药】：恭喜玩家 "+ im.getChar().getName() +" 使用暴风成长秘药提升等级到 "+im.getLevel()+" 级。");
}