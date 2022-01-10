/* 点卷商店 */

var status = 0;
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";

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
	var myRmb = cm.getRMB();
    var selStr = "#d亲爱的#r#h ##k您好，这里是神秘商城\r\n\r\n";
		selStr += "#b" + icon1 + "您当前余额：#r" + myRmb + "#k#b     " + icon1 + "您累计充值：#r" + cm.getTotalRMB() + "#k\r\n\r\n#e#b请选择:#k\r\n";
		selStr += "#r#L0#" + icon1 + "150级武器#l	    #L1#" + icon1 + "150级防具#l       \r\n";
		selStr += "#r#L2#" + icon1 + "160级武器#l	    #L3#" + icon1 + "160级防具#l       \r\n";
		selStr += "#r#L4#" + icon1 + "道具卷轴#l	     #L5#" + icon1 + "稀有物品#l       \r\n\r\n";
		selStr += "#b#L6#" + icon1 + "特惠礼包[暂未开启]#l\r\n";
		//selStr += "#L10##b稀有武器#l	\t#L11#稀有玩具#l \t   #L12#稀有宠物#l\r\n";
		//selStr += "#L13##r双倍道具#l		#L14#稀有椅子#l \t   #L19#强化礼包#l\r\n";
		//selStr += "#L17##r购买装备#l		#L18#消耗道具#l \t   #L20#特殊道具#l\r\n\r\n";
		//selStr += "#L21##b余额高级商店#l	#L22##b限时优惠商品（第一期）#l	 \r\n";//#L20#特殊卷轴#l
		//selStr += "#L22##r限时优惠商品（第一期）#l		 \r\n";//#L20#特殊卷轴#l
		//selStr += "\r\n#L22##g打开本服充值链接【1元=1元宝+2000点卷】#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了9330079其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540211, 101); //150武器
            break;
        case 1:
            cm.dispose();
            cm.openNpc(1540211, 102); //150防具
            break;
        case 2:
            cm.dispose();
            cm.openNpc(1540211, 103); //160武器
            break;
        case 3:
            cm.dispose();
            cm.openNpc(1540211, 104); //160防具
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1540211, 105); //道具卷轴
            break;
        case 5:
            cm.dispose();
            cm.openNpc(1540211, 106); //蜡笔稀有物品
            break;
        case 6:
            cm.dispose();
            cm.openNpc(1540211, 107); //超值礼包
            break;
	case 30:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("已经为您打开赞助网站！");
            break;
        }
    }
}