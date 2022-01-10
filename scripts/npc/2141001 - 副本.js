/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		品克缤远征
*/

function start() {
    cm.dispose();
    if (cm.getChannelNumber() == 9) { //普通品克缤远征
        cm.openNpc(2141001, 1);
    } else if (cm.getChannelNumber() == 10) { //混沌品克缤远征
        cm.openNpc(2141001, 2);
    } else {
        cm.sendOk("只有在 #r9#k 和 #r10#k 频道才可以参加品克缤远征.\r\n\r\n #b9 频道为 普通品克缤远征#k\r\n\r\n #r10 频道为 混沌品克缤远征#k");
    }
}