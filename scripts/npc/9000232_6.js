var status = -1;
var text = "";
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
		text = "���ɣ�ս��ʹ�죡\r\n#b";
		text += "#L603#"+icon+" #k��ȭPK��#b #r#e[HOT]#n#k#l\r\n";
		text += "#L601#"+icon+" #k��ȭС��Ϸ#b <��������ҡ���Ϸ��> #r[�޴�������]#b#l\r\n";
		text += "#L602#"+icon+" #k����С��Ϸ#b <1000���ý���> #r[�޴�������]#b#l\r\n";
		text += "#L0#"+icon+" #kͨ������#b <������Ϸ�ҡ��ƽ��Ҷ> #r[ÿ������]#b#l\r\n";
		text += "#L1#"+icon+" #k������ǽ#b <������Ϸ�ҡ��ƽ��Ҷ> #r[ÿ�����]#b#l\r\n";
		text += "\r\n#k����С��Ϸ�������ڴ�..."
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection < 100 ) {
			if (selection == 0) {
				cm.dispose();
				cm.warp(301050300,0);
			} else if (selection == 1) {
				cm.dispose();
				cm.warp(301050200,0);
			}
			return;
		}
		var npcMode = selection;
		cm.dispose();
		cm.openNpc(9000232, npcMode);
	}
}