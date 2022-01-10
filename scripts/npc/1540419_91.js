var aaa = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";

var status = -1;
var beauty = 0;
var tosend = 0;
var sl;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果您需要点卷中介的话，那么请下次来找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple(""+aaa+"\r\n亲爱的#r#h ##k您好，请您选择您需要的功能:\r\n#r(1点现金点兑换1个#z4001485# = 1个#z4001485#兑换1现金点\r\n#k#l请想好了再兑换哦!!!\r\n\r\n您当前现金点为:#r " + cm.getRMB() + " #k点\r\n#z4001485#为:#r " + cm.getItemQuantity(4001485) + " #k个\r\n#b#L0#我要兑换#z4001485##l\r\n#L1#我要兑换现金点#l");
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getRMB() == 0) {
                    cm.sendNext("您的现金点不足，无法兑换#z4001485#。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("请输入现金点兑换#z4001485#的数量:\r\n兑换比例为 1 : 1\r\n", 1, 1, cm.getHyPay(1));
                }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4001485) == 0) {
                    cm.sendNext("您的#z4001485#不足，无法兑换现金点。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("请输入#z4001485#兑换现金点的数量:\r\n兑换比例为 1 : 1\r\n", 1, 1, cm.getItemQuantity(4001485));
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("输入的兑换数字错误.");
                    cm.dispose();
                }else if(selection>=200){
                    sl=(selection/200)+1;
                } else{
                    sl=3;
                }
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("你的背包“其它”空间不足!请至少有"+sl+"个空间以上.\r\n如果上面有出现小数的话请入位!\r\n如：出现<至少有7.5个空间以上>那么您就需要留8个空间!");
                    cm.dispose(); 

                }else if (cm.getRMB() >= selection) {
                   // cm.gainRMB(selection);
		    cm.gainRMB(- 1 * selection);
                    cm.gainItem(4001485, selection);
                    cm.sendOk("您成功将#r " + (selection) + " #k换为#z4001485# #v4001485# x #r" + selection + " #k")
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换#z4001485#。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4001485, selection)) {
                    cm.gainItem(4001485, -selection);
		    cm.gainRMB(selection);
                    //cm.gainRMB(- 1 * selection);
                    cm.sendOk("您成功将#z4001485# #v4001485# x #r" + selection + " #k换为#r " + (1 * selection) + " #k现金。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换现金点。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}