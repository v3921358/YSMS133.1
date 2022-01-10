var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("呵呵，好吧，你继续玩吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("这里可以传送到纯爱抽奖博彩中心，想去试试你的运气吗？");
    } else if (status == 1) {
        cm.sendNext("你确定要去纯爱抽奖中心吗？");
    } else if (status == 2) {
        cm.warp(749050400);
        cm.dispose();
    }
}