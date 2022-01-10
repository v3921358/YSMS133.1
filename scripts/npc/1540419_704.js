var status = 0;
var typed = 0;
var typed2 = 0;
var myRmb;
var zhongjiebi = 3991014;

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
            var text = "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
			//text+="您可以在我这里使用点券兑换中介币或者中介币兑换点券。#k\r\n";
			text+="#b#L1#点券兑换中介币#l \r\n#L2#中介币兑换点券#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			typed = selection;
			if (typed == 1) {
				cm.sendSimple("#b#L1#使用点券兑换#l\r\n#L2#使用抵用券兑换#l");
			} else {
				cm.sendGetText("#b【中介币兑换点券】 1个中介币:2000点#k\r\n\r\n您当前有#r"+cm.getItemQuantity(zhongjiebi)+"#k个中介币，请输入想要兑换的#r中介币#k数量：");
			}
			
		} else if (status == 2) {
			typed2 = selection;
			if (typed == 1) {
				cm.sendGetText("#b【" + (typed2 == 1 ? "点券" : "抵用券") + "兑换中介币】 2000点:1个中介币#k\r\n\r\n您当前有#r"+cm.getNX(typed2)+"#k" + (typed2 == 1 ? "点券" : "抵用券") + "，请输入想要兑换的#r中介币#k数量：");
			} else {
				if (typed2 == 1) {
					cm.sendOk("目前只能用抵用券兑换中介币，点券兑换尚未开放。");
					cm.dispose();
					return;
				}

				var ybNum = Math.floor(cm.getText()*1);
				if (isNaN(ybNum)){
					cm.sendOk("很抱歉，数量只能为#r数字#k，请重新确认后查询！");
					cm.dispose();
					return;
				}
				if (ybNum<=0) {
					cm.sendOk("请输入大于0的数字！");
					cm.dispose();
					return;
				}
				if (ybNum>10000) {
					cm.sendOk("每次最多输入10000，请返回重新输入");
					cm.dispose();
					return;
				}

				if (cm.haveItem(zhongjiebi, ybNum)) {
					cm.gainItem(zhongjiebi, -ybNum);
					cm.gainNX(typed2, ybNum*2000);
					cm.sendOk("兑换成功");
					cm.dispose();
				} else {
					cm.sendOk("你没有那么多中介币");
					cm.dispose();
				}
			}
		} else if (status == 3) {
			var ybNum = Math.floor(cm.getText()*1);
			if (isNaN(ybNum)){
				cm.sendOk("很抱歉，数量只能为#r数字#k，请重新确认后查询！");
				cm.dispose();
				return;
			}
			if (ybNum<=0) {
				cm.sendOk("请输入大于0的数字！");
				cm.dispose();
				return;
			}
			if (ybNum>10000) {
				cm.sendOk("每次最多输入10000，请返回重新输入");
				cm.dispose();
				return;
			}
			if (typed == 1) {
				if (cm.getPlayer().getCSPoints(typed2) >= (ybNum*2000)) {
					if (cm.getSpace(4) >= 1) {
						cm.gainNX(typed2, -ybNum*2000);
						cm.gainItem(zhongjiebi, ybNum);
						cm.sendOk("兑换成功");
						cm.dispose();
					} else {
						cm.sendOk("包裹空间不足");
						cm.dispose();
					}
				} else {
					cm.sendOk("你没有那么多点券");
					cm.dispose();
				}
			}
		}
   }
}