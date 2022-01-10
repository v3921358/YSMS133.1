var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var selStr = "\t\t#d#e隐藏宝藏 - 宝藏仓库：#n#k\r\n\r\n";
			selStr +="#e#b您当前在本世界在线时间：#r" + cm.getPlayer().getTodayOnlineTime() + "#b分钟 当前芒果 #r" + cm.getPlayerPoints() + "#k\r\n";
			selStr +="#b您当前可用元宝： #r" + cm.getHyPay(1) + " #k#b元#k\t #b已消费元宝：#r" + cm.getHyPay(2) + " #k#b元#k\r\n";
			selStr +="#b当前点卷: #r" + cm.getNX(1) + " #b点\t当前抵用卷: #r" + cm.getNX(2) + " #b点#k\r\n\r\n";
			selStr +="\t#b您当前进入次数为： #r"+ cm.getBossLog("活动泡点") +" / 1 #b次#k#l\r\n\r\n";
			selStr +="\t\t#L1##b"+aaa+" 进入宝藏仓库#l#k\r\n"; 
			//selStr +="\r\n";
			//selStr +="\t\t#L2##b"+aaa+" 清零进入次数#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("进入宝藏仓库里后。5分钟内，每秒获得100抵用卷，10芒果，50点卷。还可以机率性随机数量道具。\r\n");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("理财vip次数重置进入次数, 确定要使用 10000 点卷清零进入3次次数吗.?.");
                        }
		} else if (status == 2) {
			if(typed==2){
				if (cm.getBossLog("活动1泡点") >= 1 && cm.getPlayer().getCSPoints(1) >= 10000 && cm.getPlayer().getRMB() >= 10) {
			cm.gainNX(1, -10000);
			cm.resetBossLog("活动1泡点");
			cm.sendOk("恭喜您重置了进入宝物仓库地图次数.");
			cm.worldSpouseMessage(0x20, "『宝物仓库』 : 恭喜 " + cm.getChar().getName() + " 使用 10000 点卷重置进入3次次数。他又可以获得大量道具。");
			cm.dispose();
				} else {
			cm.sendOk("#r必须累计充值超过10元。否则无法使用该功能：\r\n\r\n#e#d提示：#k#n#b1). 您的次数还未用完，请先用完再使用。\r\n#e#d提示：#k#n#b2). 您的点卷不足10000点,无法支付重置。\r\n#e#d提示：#k#n#b3). 您的累计充值金额不足10元无法使用该功能。");
			cm.dispose();
				}
			}else if(typed==1){
				if (cm.getPlayer().getRMB() >= 10 && cm.getSevenDayPayLog(1).get(0) >= 10) {//
			cm.dispose();
			cm.openNpc(9900003, 26);
			} else {
			cm.sendOk("#r为避免小号无限刷。当天充值金额必须达到10元。或者开通理财可免费进入。每秒可获得50抵用卷，10芒果，30点卷。另外还有机会获得以下道具。\r\n10块钱，你买不到漩涡，10块钱，你买不到暴君，10块钱，你更加买不到巨无霸椅子，现在只要充值10块钱，10块钱买不了吃亏，10块钱你买不了上当，10块钱你就有可能称霸全服。没错。现在只要10块钱，每天都可以进入就有机率拿到这些：\r\n\r\n#i4000463# #i2340000# #i5062000# #i5062002# #i4001839# #i4310088# #i4310036# #i5072000# #i5073000# #i5074000# #i3010527# #i3010832# #i3010829# #i2430866# #i1102481# #i1102482# #i1102483# #i1102484# #i1102485# #i1082543# #i1082544# #i1082545# #i1082546# #i1082547# #i1072743# #i1072744# #i1072745# #i1072746# #i1072747# #i1132174# #i1132175# #i1132176# #i1132177# #i1132178# #i1012438# #i1022211# #i1032224# #i1122269# #i1132247# #i1152160# #i1003976# #i1102623# #i1082556# #i1052669# #i1072870# #i1112793#");
			cm.dispose();
				}
				}
           }
		}
}