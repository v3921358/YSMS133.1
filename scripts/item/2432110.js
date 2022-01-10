function start() {
	im.gainItem(2432110, -1);
	im.teachSkill(80001222, 1);
	im.sendOk("恭喜您获得 #r永久#k 骑宠 #r幻龙骑宠#k 。#s80001222#\r\n提示：请双击自己后点信息栏的骑宠乘坐。");
	im.worldSpouseMessage(0x20, "『幻龙骑宠使用券』 : 玩家 " + im.getChar().getName() + " 领取了幻龙骑宠技能。！");
	im.dispose();
}