/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		Ʒ����Զ��
*/

function start() {
    cm.dispose();
    if (cm.getChannelNumber() == 9) { //��ͨƷ����Զ��
        cm.openNpc(2141001, 1);
    } else if (cm.getChannelNumber() == 10) { //����Ʒ����Զ��
        cm.openNpc(2141001, 2);
    } else {
        cm.sendOk("ֻ���� #r9#k �� #r10#k Ƶ���ſ��Բμ�Ʒ����Զ��.\r\n\r\n #b9 Ƶ��Ϊ ��ͨƷ����Զ��#k\r\n\r\n #r10 Ƶ��Ϊ ����Ʒ����Զ��#k");
    }
}