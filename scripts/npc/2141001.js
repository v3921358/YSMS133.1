/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		品克缤远征
*/

function start() {
    if (cm.getPlayer().getClient().getChannel() == 3 ||cm.getPlayer().getClient().getChannel() == 4 ) {
        cm.dispose();
        cm.openNpc(2141001, 2);
    } else if (cm.getPlayer().getClient().getChannel() == 1 ||cm.getPlayer().getClient().getChannel() == 2 ) {
        cm.dispose();
        cm.openNpc(2141001, 1);
    } else {
        cm.sendOk("1和2频道为普通品克缤远征，需要150级才能挑战\r\n3和4频道为混沌品克缤远征，需要180级才能挑战.");
        cm.dispose();
    }
}