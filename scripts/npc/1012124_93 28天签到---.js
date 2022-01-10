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
			var selStr = "#d#e连续登陆28天，每天即可获得下列物品：#n#k\r\n";
			selStr +="  - #e#d还需要登陆 " + (28+cm.getBossLogAcc("登录天数1月")) + " 天可领全部奖励#n\r\n"
			selStr += "\r\n#r由于您是老玩家，您在领取每项奖励之时还可以额外获得10枚幸运铜币#k\r\n\r\n";
			selStr += "#L1##b" + aaa + " 第一天工资奖励 #v4001839# #rx 1000#b [详情点击查看]#l#k\r\n";
			selStr += "#L2##b" + aaa + " 第二天工资奖励 #v4001839# #rx 1000#b [详情点击查看]#l#k\r\n";
			selStr += "#L3##b" + aaa + " 第三天工资奖励 #v4001839# #rx 1000#b[详情点击查看]#l#k\r\n";
			selStr += "#L4##b" + aaa + " 第四天工资奖励 #v4001839# #rx 1000#b [详情点击查看]#l#k\r\n";
			selStr += "#L5##b" + aaa + " 第五天工资奖励 #v4001839# #rx 1000#b [详情点击查看]#l#k\r\n";
			selStr += "#L6##b" + aaa + " 第六天工资奖励 #v2049135# #rx 20#b[详情点击查看]#l#k\r\n";
			selStr += "#L7##b" + aaa + " 第七天工资奖励 #v5062009# #rx 200#b [详情点击查看]#l#k\r\n";
			selStr += "#L8##b" + aaa + " 第八天工资奖励 #v5062500# #rx 100#b [详情点击查看]#l#k\r\n";
			selStr += "#L9##b" + aaa + " 第九天工资奖励 #v2340000# #rx 20#b [详情点击查看]#l#k\r\n";
			selStr += "#L10##b" + aaa + " 第十天工资奖励 #v5750000# #rx 20#b[详情点击查看]#l#k\r\n";
			selStr += "#L11##b" + aaa + " 第十一天工资奖励 #v2430692# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr += "#L12##b" + aaa + " 第十二天工资奖励 #v2049116# #rx 5#b [详情点击查看]#l#k\r\n";
			selStr += "#L13##b" + aaa + " 第十三天工资奖励 #v2049135# #rx 20#b[详情点击查看]#l#k\r\n";
			selStr += "#L14##b" + aaa + " 第十四天工资奖励 #v5062009# #rx 300#b [详情点击查看]#l#k\r\n";
			selStr += "#L15##b" + aaa + " 第十五天工资奖励 #v4001839# #rx 1000#b [详情点击查看]#l#k\r\n";
			selStr += "#L16##b" + aaa + " 第十六天工资奖励 #v2431762# #rx 5#b [详情点击查看]#l#k\r\n";
			selStr += "#L17##b" + aaa + " 第十七天工资奖励 #v4001839# #rx 1000#b[详情点击查看]#l#k\r\n";
			selStr += "#L18##b" + aaa + " 第十八天工资奖励 #v5062500# #rx 200#b [详情点击查看]#l#k\r\n";
			selStr += "#L19##b" + aaa + " 第十九天工资奖励 #v2590004# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr += "#L20##b" + aaa + " 第二十天工资奖励 #v2049135# #rx 50#b[详情点击查看]#l#k\r\n";
			selStr += "#L21##b" + aaa + " 第二十一天工资奖励 #v2340000# #rx 50#b [详情点击查看]#l#k\r\n";
			selStr += "#L22##b" + aaa + " 第二十二天工资奖励 #v4001839# #rx 2000#b [详情点击查看]#l#k\r\n";
			selStr += "#L23##b" + aaa + " 第二十三天工资奖励 #v2049137# #rx 20#b [详情点击查看]#l#k\r\n";
			selStr += "#L24##b" + aaa + " 第二十四天工资奖励 #v2590004# #rx 1#b[详情点击查看]#l#k\r\n";
			selStr += "#L25##b" + aaa + " 第二十五天工资奖励 #v5750000# #rx 50#b [详情点击查看]#l#k\r\n";
			selStr += "#L26##b" + aaa + " 第二十六天工资奖励 #v2431762# #rx 10#b [详情点击查看]#l#k\r\n";
			selStr += "#L27##b" + aaa + " 第二十七天工资奖励 #v2431354# #rx 1#b[详情点击查看]#l#k\r\n";
			selStr += "#L28##b" + aaa + " 第二十八天工资奖励 #v1182019# #rx 1#b [详情点击查看]#l#k\r\n";
			selStr += " \r\n\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo("- #e#d第一天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n#k#n\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n #v4310023##r#t4310023# x 10 #b个\r\n\r\n#b冒险币 #r x 1000W \r\n\r\n#b抵用卷 #r x 10000点。");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo("- #e#d第二天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 10000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo("- #e#d第三天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 10000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo("- #e#d第四天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 10000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo("- #e#d第五天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 10000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("- #e#d第六天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2049135##r#t2049135# x 20 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r点卷 10000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 7) {
				typed = 7;
				cm.sendYesNo("- #e#d第七天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v5062009##r#t5062009# x 200 #b个。\r\n\r\n#e#d并且获得GM赠送的 2万点卷，#r冒险币 1000W #b.#r幸运铜币 10个 #b的奖励。。。");
			} else if (selection == 8) {
				typed = 8;
				cm.sendYesNo("- #e#d第八天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v5062500##r#t5062500# x 100 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 9) {
				typed = 9;
				cm.sendYesNo("- #e#d第九天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2340000##r#t2340000# x 20 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 10) {
				typed = 10;
				cm.sendYesNo("- #e#d第十天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:r\n\r\n#v5750000##r#t5750000# x 20 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 11) {
				typed = 11;
				cm.sendYesNo("- #e#d第十一天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2430692##r#t2430692# x 1 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 12) {
				typed = 12;
				cm.sendYesNo("- #e#d第十二天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2049116##r#t2049116# x 5 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 13) {
				typed = 13;
				cm.sendYesNo("- #e#d第十三天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2049135##r#t2049135# x 20 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r点卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 14) {
				typed = 14;
				cm.sendYesNo("- #e#d第十四天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v50620009##r#t5062009# x 300 #b个。\r\n\r\n#e#d并且获得GM赠送的 40000点卷，#r冒险币 1000W #b.#r幸运铜币 10个 #b的奖励。。。");
			} else if (selection == 15) {
				typed = 15;
				cm.sendYesNo("- #e#d第十五天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 16) {
				typed = 16;
				cm.sendYesNo("- #e#d第十六天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2431762##r#t2431762# x 5 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 17) {
				typed = 17;
				cm.sendYesNo("- #e#d第十七天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 1000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 18) {
				typed = 18;
				cm.sendYesNo("- #e#d第十八天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v5062500##r#t5062500# x 200 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 19) {
				typed = 19;
				cm.sendYesNo("- #e#d第十九天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2590004##r#t2590004# x 1 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 20) {
				typed = 20;
				cm.sendYesNo("- #e#d第二十天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2049135##r#t2049135# x 50 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r点卷 20000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 21) {
				typed = 21;
				cm.sendYesNo("- #e#d第二十一天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2340000##r#t2340000# x 50 #b个。\r\n\r\n#e#d并且获得GM赠送的 40000点卷，#r冒险币 1000W #b.#r幸运铜币 10个 #b的奖励。。。");
			} else if (selection == 22) {
				typed = 22;
				cm.sendYesNo("- #e#d第二十二天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v4001839##r#t4001839# x 2000 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 23) {
				typed = 23;
				cm.sendYesNo("- #e#d第二十三天工资奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得:\r\n\r\n#v2049137##r#t2049137# x 20 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 24) {
				typed = 24;
				cm.sendYesNo("- #e#d第二十四天登录时间奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2590004##r#t2590004# x 1 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 1000W #b.还可以领取#r抵用卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 25) {
				typed = 25;
				cm.sendYesNo("- #e#d第二十五天登录时间奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v5750000##r#t5750000# x 50 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 2000W #b.还可以领取#r抵用卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 26) {
				typed = 26;
				cm.sendYesNo("- #e#d第二十六天登录时间奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2431762##r#t2431762# x 10 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 3000W #b.还可以领取#r抵用卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 27) {
				typed = 27;
				cm.sendYesNo("- #e#d第二十七天登录时间奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v2431354##r#t2431354# x 1 #b个。\r\n\r\n不仅如此还可以领取#r冒险币 5000W #b.还可以领取#r点卷 50000点 #b，还可以领取#r幸运铜币 10个 #b。。");
			} else if (selection == 28) {
				typed = 28;
				cm.sendYesNo("- #e#d第二十八天登录时间奖励#k#n\r\n\r\n\r\n   #b请领取360分钟奖励后再领取，领取后您将得到:\r\n\r\n#v1182019##r#t1182019# x 1 #b个。\r\n\r\n#e#d并且获得GM赠送的 10 万点卷，#r冒险币 1亿 #b.#r幸运铜币 10个 #b的奖励。。。");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 30 && cm.getLevel() >= 10) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -1 && cm.getBossLogAcc("第1月一天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 10000);
						 cm.gainItem(4310023, 10);

	var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182019)).copy(); // 生成一个Equip类                    
			toDrop.setStr(15); //装备力量
			toDrop.setDex(15); //装备敏捷
			toDrop.setInt(15); //装备智力
			toDrop.setLuk(15); //装备运气
			toDrop.setMatk(15); //物理攻击
			toDrop.setWatk(15); //魔法攻击 
			toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 1);//可以使用3天，到期消失

			cm.addFromDrop(cm.getC(),toDrop,false);

						cm.setBossLogAcc("第1月一天", -2);
						cm.sendOk("恭喜您成功领取登录第一天奖励。");
				cm.worldMessageEffect("[流星工资] 恭喜玩家" + cm.getName() + "在福利专区处领取了今天的流星工资奖励，大家快来祝贺吧", 16, 60);
						cm.worldSpouseMessage(0x21, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第一天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("领取失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 其他栏不足请及时清理.\r\n4). 等级小于10级. ");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -2 && cm.getBossLogAcc("第1月二天") == 0) {
						cm.gainMeso(5000000);
						cm.gainNX(2, 10000);
						cm.gainItem(4001839, 1000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二天", -2);
						cm.sendOk("恭喜您成功领取登录第二天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于160级. ");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -3 && cm.getBossLogAcc("第1月三天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月三天", -2);
						cm.sendOk("恭喜您成功领取登录第三天奖励。");
						cm.worldSpouseMessage(0x20, "『二十八连续七天签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第三天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 4) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -4 && cm.getBossLogAcc("第1月四天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月四天", -2);
						cm.sendOk("恭喜您成功领取登录第四天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第四天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -5 && cm.getBossLogAcc("第1月五天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 10000);
						cm.gainMeso(5000000);
						 cm.gainItem(4310023, 30);
						cm.setBossLogAcc("第1月五天", -2);
						cm.sendOk("恭喜您成功领取登录第五天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第五天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 6) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -6 && cm.getBossLogAcc("第1月六天") == 0 ) {
						cm.gainItem(2049135, 20);
						cm.gainNX(1, 10000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月六天", -2);
						cm.sendOk("恭喜您成功领取登录第六天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第六天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 7) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -7 && cm.getBossLogAcc("第1月七天") == 0 ) {
						cm.gainItem(5062009, 200);
						cm.gainNX(1, 20000);
						cm.gainMeso(20000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月七天", -2);
						cm.sendOk("恭喜您成功领取登录第七天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第七天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 8) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -8 && cm.getBossLogAcc("第1月八天") == 0) {
						cm.gainItem(5062500, 200);
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月八天", -2);
						cm.sendOk("恭喜您成功领取登录第八天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第八天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 其他栏不足请及时清理.\r\n4). 等级小于140级. ");
					cm.dispose();
				}
			} else if (typed == 9) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -9 && cm.getBossLogAcc("第1月九天") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						cm.gainItem(2340000, 20);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月九天", -2);
						cm.sendOk("恭喜您成功领取登录第九天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第九天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于160级. ");
					cm.dispose();
				}
			} else if (typed == 10) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -10 && cm.getBossLogAcc("第1月十天") == 0) {
						cm.gainItem(5750000, 20);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十天", -2);
						cm.sendOk("恭喜您成功领取登录第十天奖励。");
						cm.worldSpouseMessage(0x20, "『二十八连续七天签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 11) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -11 && cm.getBossLogAcc("第1月十一天") == 0) {
						cm.gainItem(2430692, 1);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十一天", -2);
						cm.sendOk("恭喜您成功领取登录第十一天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十一天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 12) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -12 && cm.getBossLogAcc("第1月十二天") == 0) {
						cm.gainItem(2049116, 5);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月五天", -2);
						cm.sendOk("恭喜您成功领取登录第五天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十二天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 13) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -13 && cm.getBossLogAcc("第1月十三天") == 0 ) {
						cm.gainItem(2049135, 20);
						cm.gainNX(1, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十三天", -2);
						cm.sendOk("恭喜您成功领取登录第十三天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十三天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 14) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -14 && cm.getBossLogAcc("第1月十四天") == 0 ) {
						cm.gainItem(5062009, 300);
						cm.gainNX(1, 40000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十四天", -2);
						cm.sendOk("恭喜您成功领取登录第七天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十四天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 15) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -15 && cm.getBossLogAcc("第1月十五天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十五天", -2);
						cm.sendOk("恭喜您成功领取登录第十五天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十五天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 其他栏不足请及时清理.\r\n4). 等级小于140级. ");
					cm.dispose();
				}
			} else if (typed == 16) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -16 && cm.getBossLogAcc("第1月十六天") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 20000);
						cm.gainItem(2431762, 5);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十六天", -2);
						cm.sendOk("恭喜您成功领取登录第十六天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十六天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于160级. ");
					cm.dispose();
				}
			} else if (typed == 17) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -17 && cm.getBossLogAcc("第1月十七天") == 0) {
						cm.gainItem(4001839, 1000);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十七天", -2);
						cm.sendOk("恭喜您成功领取登录第十七天奖励。");
						cm.worldSpouseMessage(0x20, "『二十八连续七天签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十七天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 18) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -18 && cm.getBossLogAcc("第1月十八天") == 0) {
						cm.gainItem(5062500, 200);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十八天", -2);
						cm.sendOk("恭喜您成功领取登录第十八天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十八天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 19) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -19 && cm.getBossLogAcc("第1月十九天") == 0) {
						cm.gainItem(2590004, 1);
						cm.gainNX(2, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月十九天", -2);
						cm.sendOk("恭喜您成功领取登录第五天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第十九天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 20) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -20 && cm.getBossLogAcc("第1月二十天") == 0 ) {
						cm.gainItem(2049135, 50);
						cm.gainNX(1, 20000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十天", -2);
						cm.sendOk("恭喜您成功领取登录第二十天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 21) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -21 && cm.getBossLogAcc("第1月二十一天") == 0 ) {
						cm.gainItem(2340000, 50);
						cm.gainNX(1, 40000);
						cm.gainMeso(10000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十一天", -2);
						cm.sendOk("恭喜您成功领取登录第七天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十一天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 22) {
				if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -22 && cm.getBossLogAcc("第1月二十二天") == 0) {
						cm.gainItem(4001839, 2000);
						cm.gainMeso(10000000);
						cm.gainNX(2, 50000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十二天", -2);
						cm.sendOk("恭喜您成功领取登录第二十二天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十二天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 其他栏不足请及时清理.\r\n4). 等级小于140级. ");
					cm.dispose();
				}
			} else if (typed == 23) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 160) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -23 && cm.getBossLogAcc("第1月二十三天") == 0) {
						cm.gainMeso(10000000);
						cm.gainNX(2, 50000);
						cm.gainMeso(1000000);
						cm.gainItem(2049137, 20);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十三天", -2);
						cm.sendOk("恭喜您成功领取登录第二十三天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十三天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于160级. ");
					cm.dispose();
				}
			} else if (typed == 24) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -24 && cm.getBossLogAcc("第1月二十四天") == 0) {
						cm.gainItem(2590004, 1);
						cm.gainNX(2, 50000);
						cm.gainMeso(20000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十四天", -2);
						cm.sendOk("恭喜您成功领取登录第二十四天奖励。");
						cm.worldSpouseMessage(0x20, "『二十八连续七天签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十四天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 25) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -25 && cm.getBossLogAcc("第1月二十五天") == 0) {
						cm.gainItem(5750000, 50);
						cm.gainNX(2, 50000);
						cm.gainMeso(30000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月四天", -2);
						cm.sendOk("恭喜您成功领取登录第二十五天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十五天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 26) {
				if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 180) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -26 && cm.getBossLogAcc("第1月二十六天") == 0) {
						cm.gainItem(2431762, 10);
						cm.gainNX(2, 50000);
						cm.gainMeso(30000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十六天", -2);
						cm.sendOk("恭喜您成功领取登录第二十六天奖励。");
						cm.worldSpouseMessage(0x20, "『流星工资』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十六天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 特殊栏不足请及时清理.\r\n4). 等级小于180级.");
					cm.dispose();
				}
			} else if (typed == 27) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -27 && cm.getBossLogAcc("第1月二十七天") == 0 ) {
						cm.gainItem(2431354, 1);
						cm.gainNX(1, 50000);
						cm.gainMeso(50000000);
						 cm.gainItem(4310023, 10);
						cm.setBossLogAcc("第1月二十七天", -2);
						cm.sendOk("恭喜您成功领取登录第二十七天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十七天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}
			} else if (typed == 28) {
				if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 200) {
					setBossLog();
					if (cm.getBossLogAcc("登录天数1月") == -28 && cm.getBossLogAcc("第1月二十八天") == 0 ) {
						//cm.gainItem(1182019, 1);
						cm.gainNX(1, 100000);
						cm.gainMeso(100000000);
						 cm.gainItem(4310023, 10);
	var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1182019)).copy(); // 生成一个Equip类                    
			toDrop.setStr(15); //装备力量
			toDrop.setDex(15); //装备敏捷
			toDrop.setInt(15); //装备智力
			toDrop.setLuk(15); //装备运气
			toDrop.setMatk(15); //物理攻击
			toDrop.setWatk(15); //魔法攻击 
			toDrop.setExpiration(java.lang.System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 3);//可以使用3天，到期消失

			cm.addFromDrop(cm.getC(),toDrop,false);
						cm.setBossLogAcc("第1月二十八天", -2);
						cm.sendOk("恭喜您成功领取登录第二十八天奖励。");
						cm.worldSpouseMessage(0x20, "『连续二十八签到』 : 恭喜 " + cm.getChar().getName() + " 成功领取第二十八天工资奖励。");
						cm.dispose();
					} else {
						cm.sendOk("无法领取该礼包。\r\n1.您已经领取过该礼包。\r\n2.您应该领取#r#e第"+(cm.getBossLogAcc("登录天数1月")*-1)+"天#n#k礼包。");
						cm.dispose();
					}
				} else {
					cm.sendOk("失败：\r\n\r\n#r1). 今天在线时间不足360分钟.\r\n2). 已经领取过今天的奖励.\r\n3). 装备栏不足请及时清理.\r\n4). 等级小于200级.");
					cm.dispose();
				}

			}
		}
	}
}

function setBossLog() {
	if (cm.getBossLogAcc("登录天数") <= 0 && cm.getBossLogAcc("登录天数1月") > -28) {
		cm.setBossLogAcc("登录天数");
		cm.setBossLogAcc("登录天数1月", -2);
	}
}