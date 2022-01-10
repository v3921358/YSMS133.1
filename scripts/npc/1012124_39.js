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
    var selStr = "#亲爱的#r#h ##k您好,这里是娱乐任务区域:\r\n";
		selStr += "#d您当前点券： #r"+cm.getNX(1)+"#k #d点#k\t#d当前抵用券： #r" + cm.getNX(2) + "#k #d点#k\r\n#e#d请选择: \r\n#n#k";
		selStr += "#b#L0#每日任务#l	    #L1#数字游戏#l       #L2#积分兑换\r\n";
		selStr += "#L3##b组队任务#l	    #L4#活跃查询#l       #L5#爆率查询#l\r\n";
		selStr += "#L6##b隐藏箱子#l	\r\n";
		//selStr += "#L6##b等级奖励#l	    #L7#点卷中介#l       #L8#活动奖励#l\r\n";
		//selStr += "#L10##b时装武器#l	\t#L11#稀有宠物#l \t   #L12#稀有玩具#l\r\n";
		//selStr += "#L13##r双倍道具#l		#L14#稀有椅子#l \t   #L15#游戏宝库#l\r\n";
		//selStr += "#L16##r购买装备#l		#L17#购买饰品#l \t   #L18#购买消耗#l\r\n";
		//selStr += "#L19##r强化礼包#l		#L20#特殊卷轴#l \r\n";
		selStr += "\r\n#L22##g打开本服充值链接【1元=1元宝+2000点卷】#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了9330079其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003, 110); //每日任务
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900003, 111); //数字游戏
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9330079, 501); //积分兑换
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9330079, 605); //组队任务
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9330079, 23); //活跃查询
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9330079, 5); //爆率查询
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 103); //隐藏的箱子游戏
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9330079, 704); //点卷中介
            break;
		case 8:
            cm.dispose();
            cm.openNpc(9330079, 705); //活动奖励
            break;
	case 1:
            cm.dispose();
            cm.openNpc(9330079, 1530); //鞋子
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9330079, 155); //宠物
            break;
	case 12:
            cm.dispose();
            cm.openNpc(9330079, 153); //玩具
            break;
	case 13:
            cm.dispose();
            cm.openNpc(9330079, 151); //双倍道具
            break;
	case 14:
            cm.dispose();
            cm.openNpc(9330079, 152); //椅子
            break;
	case 15:
            cm.dispose();
            cm.openNpc(9330079, 10); //游戏宝库
            break;
	case 16:
            cm.dispose();
            cm.openNpc(9330079, 29); //装备
            break;
	case 17:
            cm.dispose();
            cm.openNpc(9330079, 28); //饰品
            break;
	case 18:
            cm.dispose();
            cm.openNpc(9330079, 30); //消耗
            break;
	case 19:
            cm.dispose();
            cm.openNpc(9330079, 31); //礼包
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