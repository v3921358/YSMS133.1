importPackage(Packages.server);
importPackage(Packages.client.inventory);
importPackage(Packages.constants);

var status = 0;
var choice;
var scrolls = Array(
Array("", 4110010, 8), 
Array("", 1113029, 30), 
Array("", 1142610, 30, "高级神奇魔方"), 
Array("", 1002590, 50, "高级神奇魔方"), 
Array("", 1002608, 50, "高级神奇魔方"), 
Array("", 1003861, 50, "神奇魔方"), 
Array("", 1042263, 50, "混沌神奇魔方"), 
Array("", 1062107, 50, "转身圣杯"), 
Array("", 1061205, 50, "140级武器系列"), 
Array("", 1062173, 50, "140级武器系列"), 
Array("", 1072820, 50, "140级武器系列"), 
Array("", 1702422, 100, "140级武器系列"), 
Array("", 1702415, 100, "140级武器系列"), 
Array("", 3010465, 100, "140级武器系列"), 
Array("", 3010458, 120, "140级武器系列"), 
Array("", 3010460, 200, "140级武器系列"), 
Array("", 3010456, 300, "140级武器系列"), 
Array("", 3010457, 350, "140级武器系列"), 
Array("", 3010526, 350, "140级武器系列"), 
Array("", 3010070, 400, "140级武器系列"), 
Array("", 3010609, 500, "140级武器系列"), 
Array("", 3010631, 500, "140级武器系列"), 
Array("", 3010193, 550, "140级武器系列"),
//Array("",3010450,500,"140级武器系列"),
Array("", 3010412, 650, "140级武器系列"), 
Array("", 3010511, 650, "140级武器系列"), 
Array("", 3010527, 800, "140级武器系列")
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
            var choices = "在钓鱼场钓出的#r#z2431690##k可以在我这边兑换物品哦！\r\n当前拥有#v2431690##z2431690##b:" + cm.getPlayer().getItemAmount(2431690) + " #k个#l";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#k#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "条#b#v2431690#";
            }
            cm.sendSimpleS(choices,2);

        } else if (status == 1) {
            //var ii = MapleItemInformationProvider.getInstance();
            for (var i = 1; i <= 5; i++) {
                if (cm.getPlayer().getInventory(MapleInventoryType.getByType(i)).isFull()) {
                    cm.sendOk("您至少应该让所有包裹都空出一格" + i);
                    cm.dispose();
                    return;
                }
            }
            cm.sendGetNumber("请输入你要购买的数量.您当前拥有#v2431690##z2431690##b:" + cm.getPlayer().getItemAmount(2431690) + "#k个.", 1, 0, 100);
            choice = selection;
        } else if (status == 2) {
            sm = selection;
            mesos = scrolls[choice][2] * sm;
            cm.sendYesNoS("你确定需要购买#v" + scrolls[choice][1] + "##t" + scrolls[choice][1] + "# " + sm + "件吗？\r\n这将花费你 " + mesos + " 个#v2431690##z2431690##b" + "\r\n#r是否继续?", 2);
            status1 = choice;
        } else if (status == 3) {
            if (cm.haveItem(2431690, mesos) == true) {
                cm.gainItem(2431690, -mesos); 
				cm.gainItem(scrolls[status1][1], sm);
                cm.sendOk("兑换成功！请查看背包！"); 
				cm.dispose();
            } else if (sm < 0) {
                cm.sendOk("亏你想得出来，居然输入负数，一边去!");
                cm.dispose();
            } else {
                cm.sendOk("抱歉，你没足够的#v2431690##z2431690#！");
                cm.dispose();

            }
        }
    }
}