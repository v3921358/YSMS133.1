
var status = 0;
var a1 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var a2 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
        } 
    else if (status == 0) {
		var selStr = "#b您想尝试一下自身的能力吗？ 在PK地图是禁止吃药的，请在外面把血量加满再进入。您可以选择以下三种地图进行PK。#k\r\n\r\n";
		selStr += "- #e请选择：#n\r\n";
		selStr += "#d#L0#"+a2+" 混战PK模式 #r(攻击会造成对全部的人员伤害)#l#k\r\n";
		selStr += "#d#L1#"+a2+" 组队PK模式 #r(攻击不会造成对自己队员伤害)#l#k\r\n";
		selStr += "#d#L2#"+a2+" 家族PK模式 #r(攻击不会造成对自己家族伤害)#l#K\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp(701000201, 0);
	cm.worldMessageEffect("[混战大擂台] 恭喜 " + cm.getChar().getName() + " 进入了大擂台，还有谁~~，不服来战。! ", 1, 10);

            cm.worldSpouseMessage(0x20, "『混战大擂台』 : 玩家 " + cm.getChar().getName() + " 进入了大擂台，还有谁~~，不服来战。!");
            break;  
        case 1:
            cm.dispose();
            cm.warp(701000202, 0);
	cm.worldMessageEffect("[组队大擂台] 恭喜 " + cm.getChar().getName() + " 进入了大擂台，还有哪个组队~~，不服来战。! ", 1, 10);

            cm.worldSpouseMessage(0x20, "『组队大擂台』 : 玩家 " + cm.getChar().getName() + " 进入了大擂台，还有哪个组队~~，不服来战。!");
            break;   
        case 2:
            cm.dispose();
            cm.warp(701000203, 0);
	cm.worldMessageEffect("[家族大擂台] 恭喜 " + cm.getChar().getName() + " 进入了大擂台，还有哪个家族~~，不服来战。! ", 1, 10);

            cm.worldSpouseMessage(0x20, "『家族大擂台』 : 玩家 " + cm.getChar().getName() + " 进入了大擂台，还有哪个家族~~，不服来战。!");
            break;











}
    }
}
