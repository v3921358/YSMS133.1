var status = 0;
var giftContent = Array(


Array("初级强化礼包", 10000, Array(
Array(5064000, 1),//防爆卷3000点
Array(2049116, 1),//混沌卷3000点
Array(2340000, 1),//祝福卷1500点
Array(2049323, 1),//无损强化卷3000点
Array(2049137, 1)//惊人40%3000点
//Array(2049124, 1)//正向卷3000点卷
	)),

Array("初级潜能礼包", 30000, Array(
Array(2049402, 1),
Array(2048307, 1)
	)),


Array("高级强化礼包", 50000, Array(
Array(5064000, 6),//防爆
Array(2049116, 6),//混沌卷
Array(2340000, 6),//祝福卷
Array(2049323, 6),//无损强化卷
Array(2049137, 6)//惊人40%
//Array(2049124, 3)//正向卷
	)),

Array("心动强化礼包", 100000, Array(
Array(5064000, 13),//防爆
Array(2049323, 13),//无损强化卷
Array(2340000, 13),//祝福卷
Array(5062009, 50),//超级魔方
Array(5062500, 50),//大师魔方
Array(2049116, 13),//混沌卷
Array(2049137, 13)//惊人40%
//Array(2049124, 1)//正向卷
	)),


Array("高级潜能礼包", 100000, Array(
Array(2049402, 4),
Array(2048307, 4)
	)),



Array("星岩魔方礼包", 100000, Array(
Array(5750000, 30) //星岩魔方
	)),

Array("惊人正义礼包", 100000, Array(
Array(2049137, 30) //惊人正义40%
	)),

Array("无损强化礼包", 100000, Array(
Array(2049323, 40) //无损强化卷
	)),

Array("实力战将礼包", 300000, Array(
Array(2049750, 3), //S级潜能卷轴 80%
Array(2049137, 10),//惊人正义
Array(2049124, 10),//正向卷
Array(2340000, 30),//祝福
Array(5064000, 30),//防爆
Array(2049323, 30),//无损强化卷
Array(5062009, 100),//超级魔方
Array(5062500, 100),//大师魔方
Array(5750000, 10) //星岩魔方
	))

);
var giftId = -1;
var gifts = null;
var price = 999;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		var text = "";
		text += "欢迎来到#r点卷礼包商城#k，点击可以查看礼包内容哦！\r\n";
		for(var key in giftContent) {
			text+="#b#L"+key+"#购买【#r#e"+giftContent[key][0]+"#n#b】 需要点卷 #e#d"+giftContent[key][1]+" #b点#n#b#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		price = giftContent[giftId][1];
		gifts = giftContent[giftId][2];
		var text="#r#e"+giftContent[giftId][0]+"#n#b内容：\r\n";
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#i"+itemId+":##b#z"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n#d是否花费 #e#r"+price+"#n#d 点卷购买该礼包？#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 10 || cm.getSpace(2) < 10 || cm.getSpace(3) < 10 || cm.getSpace(4) < 10 || 
cm.getSpace(5) < 10) {
				cm.sendOk("您的背包空间不足，请保证每个栏位至少10格的空间，以避免领取失败。");
				cm.dispose();
				return ;
			}
			if (cm.getPlayer().getCSPoints(1) < price) {
				cm.sendOk("您的点卷不足，请先赚取足够的点卷后再购买。");
           // cm.sendOk("#b抱歉,您没有那么多点卷,您无法购买.\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服.谢谢您的合作.\r\n\r\n#b购买【#r#e"+giftContent[key][0]+"#n#b】 需要点卷 #e#d"+giftContent[key][1]+" #b点 。");

				cm.dispose();
				return ;
			}
			for(var key in gifts) {
				var itemId = gifts[key][0];
				var itemQuantity = gifts[key][1];
				cm.gainItem(itemId, itemQuantity);
			}
			cm.gainNX(-price);
			cm.sendOk("恭喜您，购买成功！");
			cm.dispose();
		} else {
			cm.sendOk("购买错误！请联系管理员！");
			cm.dispose();
		}
	}
}