/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		Ʒ����Զ��
*/

function start() {
    if (cm.getPlayer().getClient().getChannel() == 3 ||cm.getPlayer().getClient().getChannel() == 4 ) {
        cm.dispose();
        cm.openNpc(2141001, 2);
    } else if (cm.getPlayer().getClient().getChannel() == 1 ||cm.getPlayer().getClient().getChannel() == 2 ) {
        cm.dispose();
        cm.openNpc(2141001, 1);
    } else {
        cm.sendOk("1��2Ƶ��Ϊ��ͨƷ����Զ������Ҫ150��������ս\r\n3��4Ƶ��Ϊ����Ʒ����Զ������Ҫ180��������ս.");
        cm.dispose();
    }
}