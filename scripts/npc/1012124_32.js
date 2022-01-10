var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
        //Array("特效", 1112941, 1500000, "全属性+100 攻击魔攻+100#k 的 WELCOME特效。购买本特效后您将获得 #r1300,000#k 点卷"),
        Array("战士", 1122122, 2000000, "攻击力50 防御20 魔防 20"),
        Array("法师", 1122123, 2000000, "魔法力50 防御20 魔防 20"),
        Array("弓手", 1122124, 2000000, "攻击力50 防御20 魔防 20"),
        Array("飞侠", 1122125, 2000000, "攻击力50 防御20 魔防 20"),
        Array("海盗", 1122126, 2000000, "攻击力50 防御20 魔防 20"),
        //Array("美观", 1142210, 50000, "全属性+7 防御魔防+8"),
        //Array("美观", 1142178, 30000, "全属性+5 移动+7 跳跃+3"),
        Array("全职", 1132245, 680000, "全属性+30 攻击魔攻+20"),
        //Array("全职", 1132246, 1000000, "全属性+60 攻击魔攻+35 防御魔防+100"),
        Array("全职", 1122266, 680000, "全属性+20 攻击魔攻+3"),
        //Array("全职", 1122267, 1000000, "全属性+28 攻击魔攻+5"),
        Array("全职", 1032222, 680000, "全属性+12 攻击魔攻+5"),
        //Array("全职", 1032223, 1000000, "全属性+15 攻击魔攻+9"),
        Array("全职", 1113074, 680000, "全属性+8 攻击魔攻+5"),
        //Array("全职", 1113075, 1000000, "全属性+10 攻击魔攻+8")
        /*Array("特效", 1112941, 1300000, "全属性+100 攻击魔攻+100#k 的 WELCOME特效。购买本特效后您将获得 #r1300,000#k 点卷"),
        Array("战士", 1122122, 300000, "攻击力50 防御20 魔防 20"),
        Array("法师", 1122123, 300000, "魔法力50 防御20 魔防 20"),
        Array("弓手", 1122124, 300000, "攻击力50 防御20 魔防 20"),
        Array("飞侠", 1122125, 300000, "攻击力50 防御20 魔防 20"),
        Array("海盗", 1122126, 300000, "攻击力50 防御20 魔防 20"),
        Array("美观", 1142210, 50000, "全属性+7 防御魔防+8"),
        Array("美观", 1142178, 30000, "全属性+5 移动+7 跳跃+3"),
        Array("全职", 1132245, 300000, "全属性+30 攻击魔攻+20"),
        Array("全职", 1132246, 450000, "全属性+60 攻击魔攻+35 防御魔防+100"),
        Array("全职", 1122266, 300000, "全属性+20 攻击魔攻+3"),
        Array("全职", 1122267, 450000, "全属性+28 攻击魔攻+5"),
        Array("全职", 1032222, 300000, "全属性+12 攻击魔攻+5"),
        Array("全职", 1032223, 450000, "全属性+15 攻击魔攻+9"),
        Array("全职", 1113074, 300000, "全属性+8 攻击魔攻+5"),
        Array("全职", 1113075, 450000, "全属性+10 攻击魔攻+8")*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

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
            var selStr = head + "#d#e欢迎使用抵用卷购买物品,请选择您想要的：#n#k\r\n";
            selStr += "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
            selStr += "- #e请选择需要购买的饰品#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + "" + itemlist[i][0] + " #r#z" + itemlist[i][1] + "##b 需" + (i == 9 || i == 11 ? "" : "要") + itemlist[i][2] + "#k #b抵用卷#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "确定购买 #r#z" + itemlist[seld][1] + "##k 将会使用掉您 #r" + itemlist[seld][2] + "抵用卷. 您将获得#r" + itemlist[seld][3] + "#k" + itemlist[seld][0] + "#z" + itemlist[seld][1] + "#。");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < itemlist[seld][2] && nx2 < itemlist[seld][2] || cm.getSpace(1) < 1) {
				cm.sendOk(head + "购买失败：\r\n\r\n#r1). 当前抵用卷未达到条件.\r\n2). 背包装备栏位已满,请清理.");
			} else {
				if (seld == 0) {
                    var ii = cm.getItemInfo();
                    var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // 生成一个Equip类                    
                    toDrop.setStr(100); //装备力量
                    toDrop.setDex(100); //装备敏捷
                    toDrop.setInt(100); //装备智力
                    toDrop.setLuk(100); //装备运气
                    toDrop.setMatk(100); //物理攻击
                    toDrop.setWatk(100); //魔法攻击 
                    cm.addFromDrop(cm.getC(), toDrop, false);
                    cm.gainNX(1, -1300000);
                    cm.sendOk(head + "恭喜您成功购买WELCOME特效.");
                    cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买WELCOME特效一个。", 5120012);
					for (var i = 0; i < 10; i++) {
						cm.worldSpouseMessage(0x20, "『本服土豪』 : 恭喜真·土豪 " + cm.getChar().getName() + " 购买了土豪专署WELCOME特效一个.");
					}
				} else {
					cm.gainNX(nx2 < itemlist[seld][2] ? 1 : 2, -itemlist[seld][2]);
					cm.gainItem(itemlist[seld][1], 1);
					cm.sendOk(head + "恭喜您成功购买#z" + itemlist[seld][1] + "#.");
					cm.getMap().startMapEffect("恭喜玩家 " + cm.getChar().getName() + " 成功购买" + cm.getItemName(itemlist[seld][1]) + "一个。", 5120012);
					cm.worldSpouseMessage(0x20, "『抵用商城』 : 恭喜 " + cm.getChar().getName() + " 用抵用卷购买" + cm.getItemName(itemlist[seld][1]) + "一个.");
				}
			}
			cm.dispose();
        }
    }
}