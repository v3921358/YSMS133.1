var status = 0;
var choice;
var scrolls = Array(
Array("", 3010631, 10, "金龙鱼"), 
Array("", 1102807, 10, "金鱼披风"), 
Array("", 1113029, 20),
Array("", 1142610, 20, "天才钓鱼王勋章"), 
Array("", 3015075, 200, "大自然椅子"),
Array("", 3994417, 300, "红色蜡笔"),
Array("", 3015051, 400, "巨无霸国际巨星"),
Array("", 3010832, 500, "太阳椅子"),
Array("", 2432069, 800, "暴君防具交换券")

);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("好吧，欢迎下次继续光临！.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            var choices = "在钓鱼场钓出的#r#z4000517##k可以在我这边兑换物品哦！\r\n当前拥有#v4000517##z4000517##b:" + cm.getItemQuantity(4000517) + " #k个#l";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#k#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "条#b#v4000517#";
            }
            cm.sendSimpleS(choices,2);

        } else if (status == 1) {
            //var ii = MapleItemInformationProvider.getInstance();
            for (var i = 1; i <= 5; i++) {
                if (cm.getInventory(i).isFull()) {
                    cm.sendOk("您至少应该让所有包裹都空出一格" + i);
                    cm.dispose();
                    return;
                }
            }
            cm.sendGetNumber("请输入你要购买的数量.您当前拥有#v4000517##z4000517##b:" + cm.getItemQuantity(4000517) + "#k个.", 1, 0, 100);
            choice = selection;
        } else if (status == 2) {
            sm = selection;
            mesos = scrolls[choice][2] * sm;
            cm.sendYesNoS("你确定需要购买#v" + scrolls[choice][1] + "##t" + scrolls[choice][1] + "# " + sm + "件吗？\r\n这将花费你 " + mesos + " 个#v4000517##z4000517##b" + "\r\n#r是否继续?", 2);
            status1 = choice;
        } else if (status == 3) {
            if (cm.haveItem(4000517, mesos) == true) {
                cm.gainItem(4000517, -mesos); 
				cm.gainItem(scrolls[status1][1], sm);
                cm.sendOk("兑换成功！请查看背包！"); 
				cm.dispose();
            } else if (sm < 0) {
                cm.sendOk("亏你想得出来，居然输入负数，一边去!");
                cm.dispose();
            } else {
                cm.sendOk("抱歉，你没足够的#v4000517##z4000517#！");
                cm.dispose();

            }
        }
    }
}