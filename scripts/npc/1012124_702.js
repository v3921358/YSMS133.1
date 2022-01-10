var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#"; //"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#"; ////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#"; //"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#"; //"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#"; ////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#"; //"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

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
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
        cm.dispose();
    } else if (status == 0) {
        var selStr = "";
        /*= "\r\n#e#d#L33#奇幻国度欢迎您。如果您对本服不了解请点这里#n#l#k\r\n";
		selStr +="\r\n#d======================================================#k\r\n";
		selStr +="#L15##r"+ttt6+"在线奖励#l#L17#"+ttt6+"充值奖励#l#k#b#L3#"+ttt6+"组队任务#l#L5#"+ttt6+"点卷中介#l\r\n\r\n";
		selStr +="#b#L12##r"+ttt6+"重置副本#l#L14#"+ttt6+"解锁密码#l\r\n\r\n";
		selStr +="#b#L19#"+ttt6+"装备制作#l#b#L16#"+ttt6+"活动奖励#l\r\n\r\n";
		selStr +="#b#L21#"+ttt6+"超聚划算#l\r\n\r\n";
		//selStr +="#b#L1#"+ttt6+"每日寻宝#l#L2#"+ttt6+"现金购物#l#L3#"+ttt6+"日常任务#l#L5#"+ttt6+"点卷中介#l\r\n\r\n";
		//selStr +="#L4#"+ttt6+"美容美发#l#L10##r"+ttt6+"游戏宝贝#l#L9##r"+ttt6+"魔法物品#l#L11##b"+ttt6+"挑战首领#l\r\n\r\n";
		//selStr +="#b#L13#"+ttt6+"点卷任务#l#L12#"+ttt6+"重置副本#l#L14#"+ttt6+"解锁密码#l#k#L15##r"+ttt6+"在线奖励#l#k\r\n\r\n";
		//selStr +="#b#L16#"+ttt6+"金币商城#l#r#L17#"+ttt6+"充值奖励#l#b#L18#"+ttt6+"怪物币店#l#r#L19#"+ttt6+"RED币商店#l\r\n";
		selStr += "\r\n#d======================================================#k\r\n";*/
        selStr += "  #fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
        selStr += "  " + icon2 + "奇妙冒险岛:为你服务是我们一生的荣幸 ^_^ \r\n";
        selStr += "  " + icon2 + "当前活跃度:" + cm.getActivity() + "\t当前在线时长:" + cm.getPlayer().getTodayOnlineTime() + "分钟\r\n";
        selStr += "  " + icon2 + "当前点卷:" + cm.getNX(1) + "点\t当前抵用卷:" + cm.getNX(2) + "点\r\n";
        selStr += "#L0##r" + icon + "活跃查询#L1#" + icon + "爆率查询#l#L2#" + icon + "新手说明#l\r\n";
       // selStr += "#b#L3##r" + icon + "重置副本#l#L4#" + icon + "组队任务#l#L5#" + icon + "活动奖励#l\r\n";
       // selStr += "#L6#" + icon + "点卷中介#l#L12#" + icon + "银行存款#l#L8#" + icon + "竞技积分#l\r\n";
        selStr += "#L9#" + icon + "美容美发#l#L10#" + icon + "清理背包#l#L11#" + icon + "解锁密码#l\r\n";
		//selStr += "#L7#" + icon + "每日打宝#l#L13#" + icon + "宠物进化#l#L14#" + icon + "神宠喂养#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9310382, 23);//活跃查询
                break;
            case 1:
                cm.dispose();
                cm.openNpc(9310382, 5);//赞助奖励
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900005);//等级奖励
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9310382, 607);//重置副本
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310382, 605);//组队任务
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9310382, 705);//活动奖励
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9310382, 704);//点卷中介
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 27);//每日打宝
                break;
            case 8:
                cm.dispose();
                cm.openNpc(9310382, 501);//竞技积分
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9310144, 2);//美容美发
                break;
            case 10:
                cm.dispose();
                cm.openNpc(9310382, 706);//清理背包
                break;
            case 11:
                cm.dispose();
                cm.openNpc(9900003, 111);//解锁密码
                break;
            case 12:
                cm.dispose();
                cm.openNpc(9310382, 14);//银行存款
                break;
            case 13:
                cm.dispose();
                cm.openNpc(1032102);// 宠物进化
                break;
            case 14:
                cm.dispose();
                cm.openNpc(9073025);// 神宠喂养
                break;
            case 15:
                cm.dispose();
                cm.openNpc(9310382, 608);
                break;
            case 16:
                //cm.sendOk("近期开放");
                cm.dispose();
                cm.openNpc(9310144, 1);
                //cm.openShop(500);
                break;
            case 17:
                cm.dispose();
                cm.openNpc(9310382, 609);
                break;
            case 18:
                cm.sendOk("近期开放");
                cm.dispose();
                //cm.openShop(600);
                break;
            case 19:
                cm.dispose();
                cm.openNpc(9310382, 705);
                break;
            case 20:
                cm.dispose();
                cm.openNpc(9310382, 704);
                break;
            case 21:
                cm.dispose();
                cm.openNpc(9310382, 606);
                break;
            case 22:
                cm.dispose();
                cm.openNpc(9330006);
                break;
            case 23:
                cm.dispose();
                cm.openNpc(9310382, 706);
                break;
            case 24:
                cm.dispose();
                cm.openNpc(9310382, 707);
                break;
	    case 25:
                cm.dispose();
                cm.openNpc(9310382, 5555);
                break;
            case 26:
                cm.dispose();
                cm.openNpc(9310382, 501);
                break;
        }
    }
}