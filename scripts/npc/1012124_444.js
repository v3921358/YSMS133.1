var status = -1;
var cal = java.util.Calendar.getInstance();
var weekMark = cal.get(java.util.Calendar.WEEK_OF_YEAR);
var year = cal.get(java.util.Calendar.YEAR);
var bossId = "";

//领取的礼物列表
var gifts = Array(
	//物品ID， 数量
	Array(4001839, 1000),
	Array(5062009, 50),
	Array(5062500, 50),
	Array(2340000, 30),
	Array(2049750, 1),
	Array(4310119, 20),
	Array(2049122, 10),
	Array(2049323, 20)

);
//奖励的点卷数量, 设置为0则不奖励
var giftAcash = 50000;
//奖励的抵用券数量, 设置为0则不奖励
var giftMpoints = 100000;
//奖励的游戏币数量, 设置为0则不奖励
var giftMeso = 50000000;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		/* 设置周期BossLog */
		bossId = year+"-"+weekMark+"认证奖励";
		//var text = "亲爱的纯爱冒险岛玩家您好，只要您拥有我们的认证勋章每周都可以找我领取相对应的奖励。\r\n\r\n";
		var text = "#b认证#i1142796#或#i1142574#需要累计充值1000元获得永久权属性勋章#k\r\n";
		text+="#n勋章属性;力量/敏捷/智力/运气/攻击/魔力/BOSS伤各 #r30#k#n\r\n";
		//text+="#r认证#i1142574#需要视频以及生活照3张认证获得5天权#k\r\n\r\n";
		text+="#n亲爱的纯爱玩家，认证后您将可以每周领取以下奖励：#n\r\n\r\n";
		text+="#r点卷 x 50,000 抵用卷 x 100,000  金币 x 50,000,000\r\n"
		text+="#i4001839# x 1000 #i5062009# x 50 #i5062500# x 50 #i2340000# x 30\r\n#i2049750# x 1   #i4310119# x 20   #i2049122# x 10  #i2049323# x 20\r\n\r\n"
		text+="#d#L1#我已经认证过领取本周的丰富奖励#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			/* 是否佩戴或拥有官方认证勋章 */
			if (cm.haveItem(1142574) || cm.haveItem(1142796) || cm.getPlayer().getMedalText().indexOf("官方认证")!=-1) {
				/* 允许领取奖励 */
				if (cm.getBossLogAcc(bossId) != -1) {
					/* 插入记录 */
					cm.setBossLogAcc(bossId, -2); 
					/* 领取奖励 */
					var text = "恭喜您，成功领取以下奖励：\r\n";
					if (giftAcash != 0) {
						cm.gainNX(1, giftAcash);
						text+="点卷 #bx"+giftAcash+"#k\r\n";
					}
					if (giftMpoints !=0) {
						cm.gainNX(2, giftMpoints);
						text+="抵用券 #bx"+giftMpoints+"#k\r\n";
					}
					if (giftMeso !=0) {
						cm.gainMeso(giftMeso);
						text+="游戏币 #bx"+giftMeso+"#k\r\n";
					}
					/* 遍历物品奖励 */
					for(var i in gifts) {
						var itemid = gifts[i][0];
						var quantity = gifts[i][1];
						cm.gainItem(itemid, quantity);
						text+="#t"+itemid+"# #bx"+quantity+"#k\r\n";
					}
					cm.sendOk(text);
					cm.worldSpouseMessage(0x23, "『官方认证奖励』 : " + cm.getChar().getName() + " 在市场冒险岛运营员处领取了每周大量道具奖励.");
					cm.dispose();
				} else {
					cm.sendOk("您已经领取过本周的奖励，请下周再来。");
					cm.dispose();
				}
			} else {
				cm.sendOk("你好像没有拥有官方认证勋章，无法领取奖励。");
				cm.dispose();
			}
		} else {
			cm.sendOk("脚本出错，请联系管理员。");
			cm.dispose();
		}
	}
}