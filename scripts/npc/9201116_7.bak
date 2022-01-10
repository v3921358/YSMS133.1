var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var RMB = 0;

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
			var selStr = "#d端午节（Dragon Boat Festival）为每年农历五月初五，又称端阳节、午日节、五月节等。有吃粽子，喝雄黄酒，挂菖蒲、蒿草、艾叶，薰苍术、白芷，赛龙舟的习俗。最初是中国人民祛病防疫的节日，端午节起源于中国，后因诗人屈原在这一天死去，便成了中国汉族人民纪念屈原的传统节日#k\r\n\r\n#b管理提示：懒人请无视，此福利越勤奋获得福利越多#k\r\n9点-10点30分1个粽子兑换1个超级魔方+1个大师附加魔方\r\n#b提交粽子数量前10名额外奖励150级鲁塔比斯防具一件#k\r\n10点30分停止制作粽子，大家抓紧时间\r\n\r\n";
			selStr +="#L1##r"+aaa+" 参与端午节包粽子活动[详情点击查看]#l#k\r\n"; 
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #d#e活动要求：#n#k\r\n\r\n#e#b制作粽子需要#z4032945#、#z4032952#、#z4032953#各 #r500 #b个#n#k\r\n#r(PS:6月20日-22日活动期间才有出处,爆率：很高)\r\n\r\n#b当前拥有#z4032945#个数为：         #r" + cm.getItemQuantity(4032945) + " / 500 个\r\n#b当前拥有#z4032952#个数为：           #r" + cm.getItemQuantity(4032952) + " / 500 个\r\n#b当前拥有#z4032953#个数为：           #r" + cm.getItemQuantity(4032953) + " / 500 个\r\n\r\n#b当前您获得的粽子个数为： #r" + cm.getItemQuantity(4001449) + " 个\r\n#b当前任务已经获得点卷为： #r"+(2000*cm.getBossLog("制作粽子", 1))+" 点\r\n\r\n- #e#d管理提示：#n#k#b每制作一个粽子获得 #r2000#b 点卷。");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4032945,500) && cm.haveItem(4032952,500) && cm.haveItem(4032953,500) && cm.getSpace(4) >= 1) {
			cm.gainItem(4032945, -500);
			cm.gainItem(4032952, -500);
			cm.gainItem(4032953, -500);
			cm.gainItem(4001449, 1);
			cm.gainNX(1, 2000);
			cm.setBossLog("制作粽子", 1);
			cm.sendOk("#b成功获得了一个 #r粽子#b 和 #r2000#b 点卷奖励。");
			cm.worldSpouseMessage(0x20, "『端午粽子制作』 : "+ cm.getChar().getName() +" 制作粽子获得2000点卷。总共获得了 "+(2000*cm.getBossLog("制作粽子", 1))+" 点卷。");
			cm.dispose();;
				} else {
			cm.sendOk("您的物品不够或者背包空间不足.");
			cm.dispose();
				}
           }
		}
	  }
	}