var status = 0;
var giftContent = Array(
	Array("就爱抽奖礼包", 100000, Array(
		Array(2430069, 5),//祖母绿
		Array(4001833, 8)//转盘票
	)),

	Array("爱心强化礼包", 100000, Array(
		Array(4034304, 100) //NENE爱心
	)),

	Array("时装强化礼包", 100000, Array(
		Array(4310023, 30) //幸运的铜币
	)),

	Array("初级强化礼包", 100000, Array(
		Array(5064000, 5),//防爆卷
		Array(2049116, 5),//混沌卷
		Array(2049124, 5)//正向卷
	)),



	Array("高级强化礼包", 280000, Array(
		Array(5064000, 50),//防爆
		Array(5062009, 50),//超级魔方
		Array(5062500, 50),//大师魔方
		Array(2049116, 20),//混沌卷
		Array(2049124, 20)//正向卷
	)),

	Array("心动强化礼包", 500000, Array(
		Array(2049323, 20),//无损强化卷
		Array(2340000, 20),//祝福卷
		Array(5062009, 200),//超级魔方
		Array(5062500, 100),//大师魔方
		Array(2049116, 30),//混沌卷
		Array(2049124, 30)//正向卷
	)),

	Array("心动抽奖礼包", 500000, Array(
		Array(2430069, 30),//祖母绿
		Array(4001833, 60)//转盘票
	)),




	Array("无损强化礼包", 1000000, Array(
		Array(2049323, 180) //无损强化卷
	)),

	Array("星岩魔方礼包", 1000000, Array(
		Array(5750000, 300) //星岩魔方
	)),

	Array("闪炫魔方礼包", 1000000, Array(
		Array(5062024, 100) //闪炫魔方
	)),

	Array("羽毛强化礼包", 1000000, Array(
		Array(4033204, 200) //温暖的羽毛
	)),

	Array("实力战将礼包", 2000000, Array(
		Array(2049750, 5), //S级潜能卷轴 80%
		Array(2049137, 100),//惊人正义
		Array(2340000, 100),//祝福
		Array(5064000, 100),//防爆
		Array(2049323, 50),//无损强化卷
		Array(5062009, 300),//超级魔方
		Array(5062500, 300)//大师魔方
	)),

	Array("闪耀品级礼包", 2000000, Array(
		Array(5062009, 500),//超级魔方
		Array(5062500, 300),//大师魔方
		Array(2431944, 1),//140武器箱
		Array(2431945, 1),//140防具箱
		Array(2431945, 1),//140防具箱
		Array(2431945, 1),//140防具箱
		Array(2431945, 1),//140防具箱
		Array(2431945, 1)//140防具箱
	))

	/*Array("超值蜡笔礼包", 3000000, Array(
		Array(3994417, 1),
		Array(3994418, 1),
		Array(3994419, 1),
		Array(3994420, 1),
		Array(3994421, 1),
		Array(3994422, 1)
	))*/
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
		text += "欢迎来到礼包商城，点击可以查看礼包内容哦！\r\n";
		for(var key in giftContent) {
			text+="#b#L"+key+"#购买【#r#e"+giftContent[key][0]+"#n#b】 需要星币 #e#d"+giftContent[key][1]+" #b星币#n#b#l#k\r\n";
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
		text+="\r\n#d是否花费 #e#r"+price+"#n#d 星币购买该礼包？#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 10 || cm.getSpace(2) < 10 || cm.getSpace(3) < 10 || cm.getSpace(4) < 10 || cm.getSpace(5) < 10) {
				cm.sendOk("您的背包空间不足，请保证每个栏位至少10格的空间，以避免领取失败。");
				cm.dispose();
				return ;
			}
			if (cm.getRMB() < price) {
				//cm.sendOk("您的星币不足，请先充值后再购买。");
            cm.sendOk("#b抱歉,您没有那么多  星币,您无法购买.\r\n\r\n\t#r 我们的服务器也是需要资金来维持,在这里我们表示深深的歉意.您可以通过其它渠道获取或者赞助本服.谢谢您的合作.\r\n\r\n#b购买【#r#e"+giftContent[key][0]+"#n#b】 需要星币 #e#d"+giftContent[key][1]+" #b元 。");

				cm.dispose();
				return ;
			}
			for(var key in gifts) {
				var itemId = gifts[key][0];
				var itemQuantity = gifts[key][1];
				cm.gainItem(itemId, itemQuantity);
			}
			cm.gainRMB(-price);
			cm.sendOk("恭喜您，购买成功！");
			cm.dispose();
		} else {
			cm.sendOk("购买错误！请联系管理员！");
			cm.dispose();
		}
	}
}