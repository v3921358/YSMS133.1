var win = "#fUI/UIWindow.img/RpsGame/win#";
var lose = "#fUI/UIWindow.img/RpsGame/lose#";
var jz = new Array(2049402,2049323,2049013,2049018,2049142,2049124,5064000,2049119,2046310,2046311,2046219,2046219,2046108,2046109,2046008,2046009);
var chance = Math.floor(Math.random()*jz.length);

function start() {
	var ii = im.getItemInfo();
	var xxx = Math.floor(Math.random() * 3);
	if (xxx == 1) {
		im.gainItem(2431762, -1);
		im.gainItem(jz[chance], 1);
		im.sendOk(""+win+"\r\n\r\n- #e#d您运气好棒啊！#n\r\n\r\n- #e#d本次获得：#n#r#r#z"+jz[chance]+"# x 1#k");
		im.worldSpouseMessage(0x23, "『黄金鹅蛋』 : " + im.getChar().getName() + " 打开获得 ["+ii.getName(jz[chance])+"] 一张.");
		im.dispose();
	} else {
		im.gainItem(2431762, -1);
		im.gainItem(5062009, 10);
		im.gainItem(4001839, 100);
		im.sendOk(""+lose+"\r\n\r\n- #e#d您本次运气不佳，请不要气馁，再接再厉。#n\r\n\r\n- #e#d本次安慰奖励您：#n#r\r\n#z5062009# x 10\r\n#z4001839# x 100");//\r\n#z4001839# x 100
		im.dispose();
	}
}
