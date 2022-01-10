/*
 脚本功能：商店
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";

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
            cm.sendSimple("请问你需要打开下列哪一种商店#b\r\n\r\n#L0# "+icon+" 杂货商店#l #L10# "+icon+ " 暴君币店 #L22# "+icon+" BOSS币店\r\n#L2# "+icon+" 双刀装备 #L3# "+icon+" 飞标专卖 #L4# "+icon+" 外星装备 \r\n#L5# "+icon+" 特殊装备 #L6# "+icon+" 狮王道具 #L7# "+icon+" 征服币店\r\n#L20# "+icon+" 点卷商店 #L9# "+icon+" 运动币店 #L8# "+icon+" RED币商店\r\n#L17# "+icon+" 技能书店 #L14# "+icon+" 人气购买 #L13# "+icon+" 贝勒德币店\r\n#L15# "+icon+" 糖果商店 #L19# "+icon+" 抵用商店 #L21# "+icon+" 金币商店 \r\n\r\n\t\t\t\t#L30# "+icon+" 返回上一页\t")
        } else if (a == 1) {
            if (selection == 0){//杂货商店
                cm.openShop(1012123);//shop字段不能为0
                cm.dispose();
            }else if (selection == 1) {//火炮商店
                cm.openShop(1012124);
		cm.dispose();
            } else if (selection == 2) {//双刀商店
                cm.openShop(1012125);
		cm.dispose();
            } else if (selection == 3) {//飞镖商店
                cm.openShop(1033003);
		cm.dispose();
            } else if (selection == 4) {//外星商店
                cm.openShop(9310117);
		cm.dispose();
            } else if (selection == 5) {//特殊商店
                cm.openShop(1033001);
		cm.dispose();
            } else if (selection == 6) {//狮王币商店
                cm.openShop(2161010);
		cm.dispose();
            } else if (selection == 7) {//征服币商店
		cm.dispose();
                cm.openNpc(9900003, 21);
            } else if (selection == 8) {//RED
		cm.dispose();
                cm.openShop(20000);
            } else if (selection == 9) {//运动币
		cm.dispose();
                cm.openShop(22200);
	    } else if (selection == 10) {
		cm.dispose();
                cm.openShop(22224);
	    } else if (selection == 11) {//卷轴商店
		cm.dispose();
		cm.openNpc(9310144,222);
	    } else if (selection == 12) {//暴君币店
		cm.dispose();
                cm.openShop(10001);
	    } else if (selection == 13) {//贝勒德币商店
		cm.dispose();
                cm.openNpc(9900005, 2);
	    } else if (selection == 14) {//购买人气
		cm.dispose();
                cm.openNpc(9330079, 41);
	    } else if (selection == 15) {//雪花购买道具
		cm.dispose();
                cm.openNpc(9330079, 202);
	    } else if (selection == 16) {//点卷商城
		cm.dispose();
                cm.openNpc(9330079, 152);
	    } else if (selection == 17) {//技能书商店
		cm.dispose();
                cm.openNpc(9330079, 26);
	    } else if (selection == 18) {//抵用商城
		cm.dispose();
                cm.openNpc(9330079, 27);
	    } else if (selection == 19) {//抵用商店
		cm.dispose();
                cm.openNpc(9900003, 16);
	    } else if (selection == 20) {//点卷商店
		cm.dispose();
                cm.openNpc(1540211, 0);
	    } else if (selection == 21) {//金币商店
		cm.dispose();
                cm.openNpc(9330079, 999);
	    } else if (selection == 22) {//BOSS商店
		cm.dispose();
                cm.openNpc(9310471);
	    } else if (selection == 30) {//返回上一页
		cm.dispose();
                cm.openNpc(9330079);
            } else {
		//cm.sendOk("好吧~");
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