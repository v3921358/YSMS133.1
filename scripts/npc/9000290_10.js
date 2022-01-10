/* 点卷商店 */

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
    var selStr = "#亲爱的#r#h ##k您好，这里是 #b#z4310119##k#n 商城，\r\n目前 #b#z4310119##k#n 只能通过在线时间奖励获得\r\n";
		selStr += "#e#d请选择：\r\n#n#k";
		selStr += "#b#L0#兑换150暴君防具#l	  #L1#兑换道具与卷轴#l\r\n";
		selStr += "#L2##b兑换150级防具#l	    #L3#兑换150级武器#l#l\r\n";
		//selStr += "#L4##b兑换稀有点装#l	     #L5#兑换巨无霸椅子#l#l\r\n";

		selStr += "             #b#L10# 点击返回上一页#l\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了9330079其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9000290, 1); //暴君防具
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9000290, 2); //道具卷轴
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9000290, 3); //150防具
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9000290, 4); //150武器
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9000290, 5); //点装
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9000290, 6); //椅子
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9330079, 1527); //手套
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9330079, 1528); //套装
            break;
	case 10:
            cm.dispose();
            cm.openNpc(9000290); //武器
            break;
	case 1:
            cm.dispose();
            cm.openNpc(9330079, 1530); //鞋子
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9330079, 155); //玩具
            break;
	case 12:
            cm.dispose();
            cm.openNpc(9330079, 153); //宠物
            break;
	case 13:
            cm.dispose();
            cm.openNpc(9330079, 151); //双倍道具
            break;
	case 14:
            cm.dispose();
            cm.openNpc(9330079, 156); //椅子
            break;
	case 15:
            cm.dispose();
            cm.openNpc(9330079, 10); //游戏宝库
            break;
	case 16:
            cm.dispose();
            cm.openNpc(1540211, 1); //装备
            break;
	case 17:
            cm.dispose();
            cm.openNpc(1540211, 2); //饰品
            break;
	case 18:
            cm.dispose();
            cm.openNpc(1540211, 3); //消耗
            break;
	case 19:
            cm.dispose();
            cm.openNpc(1540211, 4); //礼包
            break;
	case 20:
            cm.dispose();
            cm.openNpc(9330079, 154); //洗点卷轴
            break;
	case 21:
            cm.dispose();
            cm.openNpc(9330079, 10); //特殊卷轴
            break;
	case 22:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("已经为您打开赞助网站！");
            break;
        }
    }
}