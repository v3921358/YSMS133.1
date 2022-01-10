var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed = 0;
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
			//cm.sendOk(head + "#d通知：随身服务将在15号涨价，由原先的3/天、80/月、500/年改为10/天、240/月、1200/年。\r\n功能改动：每日消费购买点卷改为领取点卷，将会增加专属打抵用卷副本。每日领取专署武器祝福油x100，防具祝福油x100. 每日抽奖包x5. 更有神装租借等等会逐步开放。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			//rmb = cm.getPlayer().updateRMB();

			var selStr = "#e#b您当前在本世界在线时间： #r" + cm.getPlayer().getTodayOnlineTime() + " #b分钟。\r\n";
			selStr += "#b您当前可用余额： #r" + cm.getRMB() + " #k#b元#k  #b累计余额：#r" + cm.getTotalRMB() + " #k#b元\r\n#k#b当前点卷: #r" + cm.getNX(1) + " #b点 抵用卷: #r" + cm.getNX(2) + " #b点#n\r\n\r\n";
			selStr += "#bVIP会员每月可以享受价值1280元的福利待遇：#k\r\n#b您充值260元，购买会员，只消耗赠送给您的余额\r\n您的点卷还在，您没有看错，会员就是白送给您的：\r\n";
			//selStr +="#L1##r"+aaa+" 随身服务包10元宝/一天权 [详情点击查看]#l#k\r\n"
			//selStr +="#L2##r"+aaa+" 随身服务包150元宝/10天权 [详情点击查看]#l#k\r\n"
			//selStr +="#L3##r"+aaa+" 超级实惠理财服务10W点卷/1天权 [详情点击查看]#l#k\r\n";
			selStr += "#L4##r" + aaa + " 随身服务包260余额/30天权 [详情点击查看]#l#k\r\n\t";
			//selStr +="#L5##r"+aaa+" 随身服务包1200元宝/一年权 [详情点击查看]#l#k\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo(head + "- #e#d欢迎办理随身服务一天权：#n#k\r\n- #e#r提示:#k#n  #r#z2430865# 10元宝/1天#k\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您10个元宝，并且当天可以领取 [6666]点卷, 在24小时天内享有三倍经验以及双倍爆率，并且当天内可以领取20个[高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴]。另可享有免费更换发型以及快速洗血。还可以领取每日金币. 会员独有商店,会员优惠破功,会员独有金币换点等\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo(head + "- #e#d超级实惠理财服务十天权：#n#k\r\n- #e#r提示:#k#n  #r#z2430865# 150元宝/10天#k\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您150个元宝，并且每天可以领取 [10000] 点卷, 在10天内享有三倍经验以及双倍爆率，每天领取20个[高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴]。免费更换发型脸型染色以及快速洗血。领取每日金币. 极品装备卷轴商店,免费租借稀有椅子，理财钱庄领取元宝等\r\n#r亲们理财等于的白送给大家的，心动不如行动#k\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo(head + "- #e#d超级实惠理财服务一月权：#n#k\r\n- #e#r提示:#k#n  #r#z2430865# 500000点卷/30天#k\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您50万点卷，并且每天可以领取 6666 点卷, 在30天内每天享有三倍经验以及双倍爆率，并且每天可以领取20个[高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴]。另可享有免费更换发型脸型以及快速洗血。还可以领取每日金币. 会员独有商店,会员优惠破功,会员独有金币换点等\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo(head + "#e#d超级实惠理财服务一月权：#n#k\r\n- #e#r提示:#k#n  #r#z2430865# 260余额/30天#k\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您260余额，并且每天可以领取 [10000] 点卷, 在30天内享有三倍经验以及双倍爆率，每天领取20个[高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴]。免费更换发型脸型染色以及快速洗血。领取每日金币. 免费租借稀有椅子，理财钱庄领取余额等\r\n#r亲们理财等于的白送给大家的，心动不如行动#k\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo(head + "- #e#d欢迎办理随身服务一年权：#n#k\r\n- #e#r提示:#k#n  #r#z2430865# 1200元宝/365天#k\r\n- #e#d随身服务特权：#n#k\r\n\t\t#b拥有全服上线提示、独特聊天颜色。\r\n- #e#d详细说明：#n#k\r\n\t\t办理后会扣掉您1200元宝，并且每天可以领取 6666 点卷, 在365天内每天享有三倍经验以及双倍爆率，并且365天内您每天可以领取20个[高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴]。另可享有免费更换发型以及快速洗血。还可以领取每日金币. 会员独有商店,会员优惠破功,会员独有金币换点等\r\n- #e#d管理提示：#n#b点是进行购买。点否返回上一页.#k");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 10) {
					cm.gainItem(2430865, 1, 1);
					cm.gainRMB(-10);
					cm.sendOk(head + "恭喜您成功购买一天随身服务.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买理财服务一天权。", 5120012);
					cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一天理财服务.");
					cm.dispose();
				} else {
					cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 150) {
					cm.gainItem(2430865, 1, 10);
					cm.gainRMB(-150);
					cm.sendOk(head + "恭喜您成功购买10天随身服务.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买理财服务10天权。", 5120012);
					cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买10天理财服务.");
					cm.dispose();
				} else {
					cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 当天充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getNX(1) >= 1000000) {
					cm.gainItem(2430865, 1, 30);
					cm.gainNX(1, -1000000);
					cm.sendOk(head + "恭喜您成功购买一个月理财服务.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买理财服务一个月权。", 5120012);
					cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一月理财服务.");
					cm.dispose();
				} else {
					cm.sendOk(head + "失败：\r\n\r\n#r1). 您的理财服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
					cm.dispose();
				}
			} else if (typed == 4) { //余额购买会员30天
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 260) {
					cm.gainItem(2430865, 1, 30);
					cm.gainRMB(-260);
					//cm.gainNX(1, -1000000);
					cm.sendOk(head + "恭喜您成功购买30天随身服务.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买理财服务三十天权。", 5120012);
					cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买三十天理财服务.");
					cm.dispose();
				} else {
					cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 当天充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 1200) {
					cm.gainItem(2430865, 1, 365);
					cm.gainRMB(-1200);
					cm.sendOk(head + "恭喜您成功购买一年理财服务.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买理财服务一年权。", 5120012);
					cm.worldSpouseMessage(0x20, "[系统公告] : 恭喜 " + cm.getChar().getName() + " 成功购买一年理财服务.");
					cm.dispose();
				} else {
					cm.sendOk(head + "失败：\r\n\r\n#r1). 您的随身服务未到期,无法重复办理.\r\n2). 充值金额未达到条件.\r\n3). 背包里消耗栏位已满,请清理.");
					cm.dispose();
				}
			}
		}
	}
}