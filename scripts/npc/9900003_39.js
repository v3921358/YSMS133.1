var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var status = 0;

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
			var selStr = "#b请看好，点击就购买了，3万点卷购买1个。#k\r\n\r\n";
			selStr += "#r#L0#"+aa+" #v2431965# #z2431965##l\r\n";
			selStr += "#L1#"+aa+" #v2431966# #z2431966##l\r\n";
			selStr += "#L2#"+aa+" #v2432153# #z2432153##l\r\n";
			selStr += "#L3#"+aa+" #v2431967# #z2431967##l\r\n";
			selStr += "#L4#"+aa+" #v2432131# #z2432131##l\r\n";
			selStr += "#L5#"+aa+" #v2432154# #z2432154##l\r\n";
			selStr += "#L6#"+aa+" #v2432207# #z2432207##l\r\n";
			selStr += "#L7#"+aa+" #v2432354# #z2432354##l\r\n";
			selStr += "#L8#"+aa+" #v2432355# #z2432355##l\r\n";
			selStr += "#L9#"+aa+" #v2432465# #z2432465##l\r\n";
			selStr += "#L10#"+aa+" #v2432479# #z2432479##l\r\n";
			selStr += "#L11#"+aa+" #v2432526# #z2432526##l\r\n";
			selStr += "#L12#"+aa+" #v2432532# #z2432532##l\r\n";
			selStr += "#L13#"+aa+" #v2432592# #z2432592##l\r\n";
			selStr += "#L14#"+aa+" #v2432640# #z2432640##l\r\n";
			selStr += "#L15#"+aa+" #v2432710# #z2432710##l\r\n";
			selStr += "#L16#"+aa+" #v2432836# #z2432836##l\r\n";
			selStr += "#L17#"+aa+" #v2432973# #z2432973##l\r\n";
 	    cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getPlayer().getCSPoints(1) >= 1000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -1000);
                    cm.gainItem(2431965, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了默认伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足1000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 1:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2431966, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了数码式伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 2:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432153, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了冲击式伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 3:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2431967, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了克里蒂亚斯伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 4:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432131, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了组队任务伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 5:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432154, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了甜美传统韩果伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 6:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432207, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了射手村俱乐部伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 7:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432354, 1);
					cm.sendOk("购买成功。");
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了圣诞快乐伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 8:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432355, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了雪花伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        case 9:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432465, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了阿丽莎的伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 10:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432479, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了桃乐丝的伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 11:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432526, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了键盘战士伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 12:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432532, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了轻柔春风的伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 13:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432592, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了单身部队的伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 14:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432640, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了回忆伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 15:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432710, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了花蘑菇的伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 16:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432836, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了皇冠伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
		case 17:
           if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
					cm.gainNX(1, -30000);
                    cm.gainItem(2432973, 1);
					cm.worldSpouseMessage(0x24, "『伤害皮肤』 : [" + cm.getChar().getName() + "] 购买了灰白伤害皮肤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 点卷不足30000。\r\n2). 消耗栏不足。");
                    cm.dispose();
                }
            	    break;
        }
    }
}