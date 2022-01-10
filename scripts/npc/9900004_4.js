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
            //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n";//\r\n#L0#扎昆\r\n#L1#黑龙
			var selStr = "#e#b欢迎使用理财服务消除BOSS挑战次数。#k#n\r\n\r\n";
			selStr += "#r#L0#"+aa+" 普通扎昆   #d(挑战剩余： #r"+(4-cm.getBossLog("普通扎昆"))+" #d次  重置机会： #r"+(5-cm.getBossLog("重置普通扎昆"))+" #d次)#l\r\n";
			selStr += "#r#L1#"+aa+" 普通黑龙   #d(挑战剩余： #r"+(4-cm.getBossLog("普通黑龙"))+" #d次  重置机会： #r"+(5-cm.getBossLog("重置普通黑龙"))+" #d次)#l\r\n";
			selStr += "#r#L2#"+aa+" 进阶扎昆   #d(挑战剩余： #r"+(4-cm.getBossLog("进阶扎昆"))+" #d次  重置机会： #r"+(5-cm.getBossLog("重置进阶扎昆"))+" #d次)#l\r\n";             
			selStr += "#r#L3#"+aa+" 进阶黑龙   #d(挑战剩余： #r"+(4-cm.getBossLog("进阶黑龙"))+" #d次  重置机会： #r"+(3-cm.getBossLog("重置进阶黑龙"))+" #d次)#l\r\n";
			selStr += "#r#L4#"+aa+" 阿卡伊勒   #d(挑战剩余： #r"+(3-cm.getBossLog("阿卡伊勒"))+" #d次  重置机会： #r"+(3-cm.getBossLog("重置阿卡伊勒"))+" #d次)#l\r\n";
			selStr += "#r#L5#"+aa+" 时间宠儿   #d(挑战剩余： #r"+(1-cm.getBossLog("品克缤"))+" #d次  重置机会： #r"+(3-cm.getBossLog("重置品克缤"))+" #d次)#l\r\n";
			selStr += "#r#L6#"+aa+" 希纳斯女皇 #d(挑战剩余： #r"+(1-cm.getBossLog("希纳斯"))+" #d次  重置机会： #r"+(3-cm.getBossLog("重置希纳斯"))+" #d次)#l\r\n";
			selStr += "#r#L8#"+aa+" 普通四天王 #d(挑战剩余： #r"+(2-cm.getBossLog("古树钥匙"))+" #d次  重置机会： #r"+(1-cm.getBossLog("重置普通四天王"))+" #d次)#l\r\n";
			selStr += "#r#L9#"+aa+" 进阶四天王 #d(挑战剩余： #r"+(2-cm.getBossLog("古树钥匙"))+" #d次  重置机会： #r"+(1-cm.getBossLog("重置进阶四天王"))+" #d次)#l\r\n";
			selStr += "#r#L10#"+aa+" 混沌品克缤 #d(挑战剩余： #r"+(1-cm.getBossLog("混沌品克缤"))+" #d次  重置机会： #r"+(1-cm.getBossLog("重置混沌品克缤"))+" #d次)#l\r\n";
			selStr += "#r#L11#"+aa+" 噩梦贝勒德 #d(挑战剩余： #r"+(2-cm.getBossLog("贝勒德"))+" #d次  重置机会： #r"+(1-cm.getBossLog("重置贝勒德"))+" #d次)#l\r\n";
			selStr += "#r#L12#"+aa+" 麦格纳斯   #d(挑战剩余： #r"+(1-cm.getBossLog("麦格纳斯"))+" #d次  重置机会： #r"+(1-cm.getBossLog("重置麦格纳斯"))+" #d次)#l\r\n";
 	    cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getBossLog("重置普通扎昆") < 5 && cm.getBossLog("普通扎昆") > 1) {
                    cm.resetBossLog("普通扎昆");
					cm.setBossLog("重置普通扎昆");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了普通扎昆.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 1:
           if (cm.getBossLog("重置普通黑龙") < 5 && cm.getBossLog("普通黑龙") > 1) {
                    cm.resetBossLog("普通黑龙");
					cm.setBossLog("重置普通黑龙");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了普通黑龙.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 2:
           if (cm.getBossLog("重置进阶扎昆") < 5 && cm.getBossLog("进阶扎昆") > 1) {
                    cm.resetBossLog("进阶扎昆");
					cm.setBossLog("重置进阶扎昆");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了进阶扎昆.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 3:
           if (cm.getBossLog("重置进阶黑龙") < 3 && cm.getBossLog("进阶黑龙") > 1) {
                    cm.resetBossLog("进阶黑龙");
					cm.setBossLog("重置进阶黑龙");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了进阶黑龙.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 4:
           if (cm.getBossLog("重置阿卡伊勒") < 3 && cm.getBossLog("阿卡伊勒") >= 3) {
                    cm.resetBossLog("阿卡伊勒");
					cm.setBossLog("重置阿卡伊勒");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了阿卡伊勒.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 5:
           if (cm.getBossLog("重置品克缤") <= 3 && cm.getBossLog("品克缤") >= 1) {
                    cm.resetBossLog("品克缤");
					cm.setBossLog("重置品克缤");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了品克缤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 6:
           if (cm.getBossLog("重置希纳斯") <= 3 && cm.getBossLog("希纳斯") >= 1) {
                    cm.resetBossLog("希纳斯");
					cm.setBossLog("重置希纳斯");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了希纳斯.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 8:
           if (cm.getBossLog("重置普通四天王") <= 1 && (cm.getBossLog("普通皮埃尔") >= 1 || cm.getBossLog("普通血腥女皇") >= 1 || cm.getBossLog("普通贝伦") >= 1 || cm.getBossLog("古树钥匙") >= 2)){
                    cm.resetBossLog("普通皮埃尔");
					cm.resetBossLog("普通血腥女皇");
					cm.resetBossLog("普通贝伦");
					cm.resetBossLog("古树钥匙");
					cm.setBossLog("重置普通四天王");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了鲁塔比斯[普通].");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：鲁塔比斯<普通>#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 9:
           if (cm.getBossLog("重置进阶四天王") <= 1 && (cm.getBossLog("进阶皮埃尔") >= 1 || cm.getBossLog("进阶血腥女皇") >= 1 || cm.getBossLog("进阶贝伦") >= 1 || cm.getBossLog("古树钥匙") >= 2)){
                    cm.resetBossLog("进阶皮埃尔");
					cm.resetBossLog("进阶血腥女皇");
					cm.resetBossLog("进阶贝伦");
					cm.resetBossLog("古树钥匙");
					cm.setBossLog("重置进阶四天王");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了鲁塔比斯[进阶].");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：鲁塔比斯<进阶>#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 10:
           if (cm.getBossLog("重置混沌品克缤") <= 1 && cm.getBossLog("混沌品克缤") >= 1) {
                    cm.resetBossLog("混沌品克缤");
					cm.setBossLog("重置混沌品克缤");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了混沌品克缤.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
		case 11:
           if (cm.getBossLog("重置贝勒德") <= 1 && cm.getBossLog("贝勒德") >= 1) {
                    cm.resetBossLog("贝勒德");
					cm.resetEventCount("贝勒德");
					cm.setBossLog("重置贝勒德");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了贝勒德.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
		case 12:
           if (cm.getBossLog("重置麦格纳斯") <= 1 && cm.getBossLog("麦格纳斯") >= 1) {
                    cm.resetBossLog("麦格纳斯");
					cm.setBossLog("重置麦格纳斯");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
					cm.worldSpouseMessage(0x20, "『理财副本重置』 : [" + cm.getChar().getName() + "] 在随身服务里重置了麦格纳斯.");
					cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n\r\n1). 挑战的boss次数没用完，请使用后再试，以免浪费。\r\n2). 您重置副本的次数已经使用完，请明天再试。");
                    cm.dispose();
                }
            	    break;
        case 7:
	if( cm.haveItem(4310015,3) && (cm.getBossLog("进阶扎昆") >= 1 || cm.getBossLog("进阶黑龙") >= 1 || cm.getBossLog("品克缤") >= 1)){
                    cm.resetBossLog("进阶扎昆");
                    cm.resetBossLog("进阶黑龙");
                    cm.resetBossLog("品克缤");
		    cm.gainItem(4310015,-3);
	    cm.sendOk("重置成功.祝你游戏愉快!");
	    cm.dispose();
} else {
	    cm.sendOk("你没有带来斗神证物x3(BOSS获得)\r\n或你的挑战次数还没有使用完哦");
	    cm.dispose();
}
            break;
        }
    }
}