var status = -1;
var text = "";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		text = head+"#e#d#h ##n#k�����������ʲô�أ�\r\n#b";
		text += "#L1#"+icon+" ÿ�ձ�������#l\r\n";
		//text += "#L2#"+icon+" ��ϲ��������#l\r\n";
		//text += "#L3#"+icon+" �˷��������#l\r\n";
		//text += "#L4#"+icon+" ��ս����BOSS#l\r\n";
		//text += "#L5#"+icon+" ���и���������#l\r\n";
		text += "#L6#"+icon+" ��������С��Ϸ#l\r\n";
		text += "#L999#"+icon+" �߹һ��ߵ���#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 999) {
			cm.dispose();
			cm.openNpc(1511001);
			return;
		}
		var npcMode = selection;
		cm.dispose();
		cm.openNpc(9000232, npcMode);
	}
}