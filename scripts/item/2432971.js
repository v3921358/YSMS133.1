var item = new Array(3010849, 3010983, 3010999, 3010028, 3010068, 3010070, 3010080, 3010112, 3010183, 3010185, 3010307, 3010516, 3010517, 3010518, 3010519, 3010520, 3010521, 3010557, 3010572, 3010639, 3010640, 3010641, 3010642, 3010643, 3010690, 3010700, 3010702, 3010721, 3010742, 3014000, 3014001, 3014002, 3014003, 3014004, 3014006, 3015000, 3015003, 3015004, 3015032, 3015050, 3015048, 3015061, 3010459, 3010810, 3010811, 3010812, 3010814, 3010815, 3010835, 3010836, 3010837, 3010844, 3010851, 3010795, 3010794, 3012020, 3010806, 3010842, 3010843, 3010752, 3010754, 3010751, 3010689, 3010876, 3010824, 3010825, 3010826, 3010827, 3010828, 3010829, 3010830, 3010831, 3010877, 3012024, 3012025, 3010879, 3010947, 3010948, 3010862, 3010863, 3010873, 3010946, 3010976, 3010979, 3015001, 3014008, 3015014, 3015034, 3012022, 3015058, 3010850, 3010756, 3015092, 3015075, 3015060, 3015015, 3015016, 3015017, 3015018, 3015019, 3015020, 3015021, 3015022, 3015023, 3015024, 3015025, 3015026, 3015027, 3014009, 3015132, 3015133, 3015134, 3015131, 3015211);
var chance = Math.floor(Math.random()*item.length);

function start() {
	var ii = im.getItemInfo();
	im.gainItem(2432971, -1);
	im.gainItem(item[chance], 1);
	im.sendOk("恭喜您获得了 #r#r#z"+item[chance]+"# x 1#k");
	im.worldSpouseMessage(0x23, "『夏季限量椅子箱』 : " + im.getChar().getName() + " 打开获得 ["+ii.getName(item[chance])+"] 一张.");
	im.dispose();
}