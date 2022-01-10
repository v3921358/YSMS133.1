var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed = 0;
var rmb = 0;

var packname = new Array(
        Array("高级神奇魔方礼包", 200000),
        Array("升级强化型大礼包", 200000),
        Array("惊人正义卷大礼包", 200000),
        Array("附加潜能卷大礼包", 200000)
        );
var itemlist = new Array(
        Array(0, 5062002, 150),
        Array(0, 5062500, 150),
        Array(1, 2340000, 30),
        Array(1, 5064000, 30),
        Array(1, 2049323, 5),
        Array(2, 2340000, 30),
        Array(2, 5064000, 30),
        Array(2, 2049137, 20),
        Array(3, 2049402, 12),
        Array(3, 2048307, 12)
        );


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
            var selStr = head + "#d#e欢迎使用点券购买物品,请选择您想要的：#n#k\r\n";
            selStr += "#d您当前拥有点券：  #r" + cm.getNX(1) + "#k #d点\r\n#您当前拥有抵用券：  #r" + cm.getNX(2) + "#d#k 点#k\r\n\r\n";
            selStr += "- #e#d道具#n\r\n";
            for (var i in packname) {
                selStr += "#L" + i + "##b" + aaa + " 购买 #r" + packname[i][0] + "#k #b需要 #r" + packname[i][1] + " #k#b点券#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
        	typed = selection;
        	selStr = "";
        	for (var i in itemlist) {
        		if (itemlist[i][0] == typed) {
        			selStr += "#r#i" + itemlist[i][1] + "##z" + itemlist[i][1] + "# #b " + itemlist[i][2] + "个\r\n";
        		}
        	}
        	cm.sendYesNo(head + "确定购买 #r" + packname[typed][0] + "#k 吗? 将会使用掉您 #r" + packname[typed][1] + "#k 点券，使用后将获得\r\n\r\n" + selStr);
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < packname[typed][1] && nx2 < packname[typed][1] || !checkpack()) {
				cm.sendOk(head + "购买失败：\r\n\r\n#r1). 当前点券未达到条件.\r\n2). 背包装备栏位已满,请清理.");
			} else {
				cm.gainNX(nx2 < packname[typed][1] ? 1 : 2, -packname[typed][1]);
	        	for (var i in itemlist) {
	        		if (itemlist[i][0] == typed) {
	        			cm.gainItem(itemlist[i][1], itemlist[i][2]);
	        		}
	        	}
	        	cm.sendOk("恭喜您成功购买" + packname[typed][0] + "一个.");
                cm.worldSpouseMessage(0x20, "『点券商城』 : 恭喜 " + cm.getChar().getName() + " 用点券购买" + packname[typed][0] + "一个.");
                cm.dispose();
			}
        }
    }
}

function checkpack () {
	var invneed = (0, 0, 0, 0, 0);
	for (var i in itemlist) {
		if (itemlist[i][0] == typed) {
			invneed[Math.floor(itemlist[i] / 1000000) - 1]++;
		}
	}
	for (var i = 0; i < 5; i++) {
		if (cm.getSpace(i+1) < invneed[i]) {
			return false;
		}
	}
	return true;
}