/* 附加神奇魔方碎片 */

var status = -1;
var itemList = Array(
Array(2049300, 20), //高级装备强化卷轴
Array(5062500, 30), //银光潜能附加印章
//Array(5062010, 40)  //金光潜能附加印章
Array(2048300, 30),// - 银光潜能附加印章 - #c双击#后在附加潜能开放了2个以下的道具上使用，可以增加1个附加潜能。
Array(2048301, 50)// - 金光潜能附加印章 - #c双击#后在附加潜能开放了2个以下的道具上使用，可以增加1个附加潜能。
);
var itemId = -1;
var amount = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            if (status == 1) {
                im.sendNext("如果您需要兑换的话，那么请下次来找我！");
            }
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "您现在持有#r" + im.getItemQuantity(2430915) + "#k个#b#i2430915:# #t2430915##k\r\n请选择您希望兑换的类型:";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "#搜集#r" + itemList[i][1] + "个#k可以获得#b#i" + itemList[i][0] + ":# #t" + itemList[i][0] + "##k#l";
        }
        im.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            amount = item[1];
            if (im.getItemQuantity(2430915) >= amount) {
                im.sendYesNo("您现在持有#r" + im.getItemQuantity(2430915) + "#k个#b#i2430915:# #t2430915##k \r\n您要用#r" + amount + "个#k#t2430915#交换#i" + itemId + ":# #b#t" + itemId + "##k 吗？");
            } else {
                im.sendOk("兑换#i" + itemId + ":# #b#t" + itemId + "##k需要#r" + amount + "个#k#b#t2430915##k\r\n您还需收集#r" + (amount - im.getItemQuantity(2430915)) + "#k个我才能为您兑换。");
                im.dispose();
            }
        } else {
            im.sendOk("出现错误...");
            im.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || amount <= 0) {
            im.sendOk("兑换道具出现错误...");
            im.dispose();
            return;
        }
        if (im.getItemQuantity(2430915) >= amount) {
            if (im.canHold(itemId)) {
                im.gainItem(2430915, -amount);
                im.gainItem(itemId, 1);
                im.sendOk("恭喜您成功兑换#i" + itemId + ":# #b#t" + itemId + "##k 。");
            } else {
                im.sendOk("请在消耗栏清理出1格以上的空间。");
            }
        } else {
            im.sendOk("兑换#i" + itemId + ":# #b#t" + itemId + "##k需要#r" + amount + "个#k#b#t2430915##k\r\n您还需收集#r" + (amount - im.getItemQuantity(2430915)) + "#k个我才能为您兑换。");
        }
        im.dispose();
    }
}