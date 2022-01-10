var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var status = -1;
var renwu = "";
var wanjia = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            cm.sendSimple("#e#g---------------#r" + icon1 + "小游戏活动" + icon1 + "#k#g----------------#k\r\n\r\n#b这里是冒险岛小游戏活动中心，请选择你需要的！#k\r\n#r#L7#" + icon1 + "宾果活动小游戏#l\t#r#L8#" + icon1 + "钓鱼活动小游戏#l\r\n\r\n#b#L1#" + icon1 + "点卷活动小游戏#l\t#b#L5#" + icon1 + "猜拳活动小游戏#l\r\n\r\n#b#L6#" + icon1 + "解锁活动小游戏#l\t#b#L2#" + icon1 + "糖果活动小游戏#l\r\n\r\n#b#L3#" + icon1 + "金币活动小游戏#l\r\n\r\n\r\n#e#g---------------#r" + icon1 + "小游戏活动" + icon1 + "#k#g----------------#k\r\n\r\n");//#b#L4#使用现金点赌博#l \\#b#L3#使用冒险币赌博！\r\n#b#L2#使用修为赌博！#l \r\n\r\n#b#L2#使用糖果赌博#l \r\n
        } else if (status == 1) {
            if (selection == 1) {
		cm.dispose();
                cm.openNpc(1012008,1);
            } else if (selection == 2) {
                cm.dispose();
            	cm.openNpc(1012008,2);
            } else if (selection == 3) {
		cm.dispose();
                cm.openNpc(1012008,3);
            } else if (selection == 4) {
		cm.dispose();
                cm.openNpc(1012008,4);
	    } else if (selection == 5) {
		cm.dispose();
                cm.openNpc(1012008,5);
	    } else if (selection == 6) {
		cm.dispose();
                cm.openNpc(1012008,6);
	    } else if (selection == 7) {
		cm.dispose();
                cm.openNpc(9000277);
	    } else if (selection == 8) {
		cm.dispose();
                cm.openNpc(9330122);
            }
        }
    }
}
