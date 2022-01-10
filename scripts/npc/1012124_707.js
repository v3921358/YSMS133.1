/*
 *兑换
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            abb = 1;
            cm.sendGetText("您好,欢迎使用抵用卷增加HP.每10点抵用卷增加1点最大HP值。\r\n目前抵用券：#r" + cm.getPlayer().getCSPoints(2) + " #k点\r\n#r注：请输入..最大HP不能超过50万,否则出错该不负责");
        } else if (status == 1) {
            if (cm.getText() < 1) {
                cm.playerMessage(1, "单次输入的数字不能小于1。且不能大于1万。");
                cm.dispose();
            } else if (cm.getText() > 10000) {
                cm.playerMessage(1, "单次输入的数字不能小于1。且不能大于1万。");
                cm.dispose();
            } else {
                cm.sendYesNo("您好,欢迎使用抵用卷增加血量.\r\n增加#r" + cm.getText() + "#k血量将会使用掉您#r" + cm.getText() * 10 + "#k抵用卷\r\n请确认后使用。");
            }
        } else if (status == 2) {
            var getmaxhp = cm.getChar().getStat().getMaxHp();
            var neednx = cm.getText() * 10;
            if (cm.getPlayer().getCSPoints(2) >= neednx) {
                cm.gainNX(2, -neednx);
                cm.getChar().getStat().setMaxHp(getmaxhp + cm.getText() * 1, cm.getChar());
                cm.worldSpouseMessage(0x20, "[增加HP上限] ：恭喜玩家 " + cm.getChar().getName() + " 在拍卖，更多服务NPC处用 " + neednx + " 抵用卷增加了 " + cm.getText() + " HP上限");
                cm.sendOk("成功增加了" + cm.getText() + "血量.换线或小退一下即可看到。");
                cm.dispose();
            } else {
                cm.sendOk("您没有足够的抵用卷,请获取后使用.");
                cm.dispose();
            }
        }
    }
}