/* 点卷商店 */

var status = 0;
var ttt ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
    var selStr = "#亲爱的#r#h ##k您好，这里是抵用商城，请您选择您需要的功能:\r\n";
		selStr += "#d您当前点券： #r"+cm.getNX(1)+"#k #d点#k\t#d当前抵用券： #r" + cm.getNX(2) + "#k #d点#k\r\n#e#d请选择：(#r请看好购买哦.点了就买啦!#k):\r\n#n#k";
		selStr += "#r#L0#"+ttt+" 购买装备[高级装备]#l#L1#"+ttt+" 购买饰品[高级饰品]#l\r\n";
        selStr += "#L2#"+ttt+" 购买道具[道具卷轴]#l#L3#"+ttt+" 购买礼包[实惠礼包]#l\r\n";
		selStr += "#L4#"+ttt+" 购买魔方[祝福抽奖]#ll\r\n";
		//selStr += "\r\n#L22##g"+ttt+" 打开本服充值链接【1元=1元宝+2000点卷】#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n(#r请看好购买哦.点了就买啦!#k):\r\n#b#L0#双倍道具#l    #L7#道具卷轴#l\r\n#L8#玩具商店#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//除了9330079其它都停止使用
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9330079, 33); //装备
            break;
		case 1:
            cm.dispose();
            cm.openNpc(9330079, 32); //饰品
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9330079, 34); //道具卷轴
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9330079, 35); //强化礼包
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9330079, 16); //魔方卷轴
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9330079, 1525); //魔方卷轴
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9330079, 1526); //上衣
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
            cm.openNpc(9330079, 1529); //武器
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
}}