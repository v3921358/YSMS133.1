/*
 脚本功能：商店
 */

var a = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n游戏商店集中区，请问你需要打开下列哪一种商店#b\r\n\r\n#L0# "+icon+" 杂货商店#l #L1# "+icon+" 飞镖商店 #L2# "+icon+" 特殊装备\r\n#L4# "+icon+" 征服币店 #L3# "+icon+" RED币商店#L10# "+icon+" 麦格纳斯币店\r\n#L9# "+icon+" 运动币店 #L8# "+icon+" 技能书币 #L11# "+icon+" 贝勒德币店\r\n#L12# "+icon+" 购买人气 #L13# "+icon+" 芒果商店 #L14# "+icon+" 点卷商城\r\n#L15# "+icon+" 金币商店 #L16# "+icon+" 抵用商城 ")
        } else if (a == 1) {
            if (selection == 0){
                cm.openShop(1012123);//shop字段不能为0 杂货商店
        cm.dispose();
            } else if (selection == 1) {//飞镖商店
                cm.openShop(1033003),
		cm.dispose();
            } else if (selection == 2) {//特殊装备
                cm.openShop(1033001);
		cm.dispose();
            } else if (selection == 3) {//RED币
                cm.openShop(20000);
		cm.dispose();
            } else if (selection == 4) {//征服币
		cm.dispose();
		cm.openNpc(9900003, 21);
            } else if (selection == 5) {//游戏宝库
		cm.dispose();
		cm.openNpc(9330079, 10);
            } else if (selection == 6) {//抵用商店
		cm.dispose();
		cm.openNpc(9330079, 16);
            } else if (selection == 7) {//道具卷轴
		cm.dispose();
                cm.openNpc(9330079, 154);
            } else if (selection == 8) {//技能书店
		cm.dispose();
                cm.openNpc(9330079, 26);
            } else if (selection == 9) {//运动币店
		cm.dispose();
                cm.openShop(22200);
            } else if (selection == 10) {//暴君币商店
		cm.dispose();
                cm.openShop(10001);
	    } else if (selection == 11) {//贝勒德币商店
		cm.dispose();
                cm.openShop(10002);
		} else if (selection == 12) {//购买人气
		cm.dispose();
                cm.openNpc(9330079, 41);
		} else if (selection == 13) {//芒果购买道具
		cm.dispose();
                cm.openNpc(9330079, 202);
		} else if (selection == 14) {//点卷商城
		cm.dispose();
                cm.openNpc(9330079, 152);
		} else if (selection == 15) {//金币商店
		cm.dispose();
                cm.openNpc(9330079, 999);
		} else if (selection == 16) {//抵用商城
		cm.dispose();
                cm.openNpc(9330079, 27);
            } else {
                // 1012123 杂货商店 x
                //10 低级防具
                //11 50~60级防具
                //12 60~70级防具
                //20 低级武器
                //21 50~60级武器
                //22 60~70级武器
                // 3 其他道具 
                // 4 卷轴商店 x 
                // 1012125 宠物商店
                // 6 辅助武器
                cm.openShop(selection);
                cm.dispose();
            }
        } else if (a == 2) {
            switch (selection) {
                case 0://低级防具
                    //cm.openShop(10)
                    cm.sendOk("暂时未开放。")
                    break;
                case 1://50~60级防具
                    cm.openShop(11)
                    break;
                case 2://60~70级防具
                    cm.openShop(12)
                    break;
                case 3://低级武器
                    //cm.openShop(20)
                    cm.sendOk("暂时未开放。")
                    break;
                case 4://50~60级武器
                    cm.openShop(21)
                    break;
                case 5://60~70级武器
                    cm.openShop(22)
                    break;
            }
            cm.dispose();
        }//a
    }//mode
}//f