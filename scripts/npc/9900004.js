var status = 0;
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������

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
	if (status == 0) {
		cm.sendSimple("\t\t#L0##e "+tz15+"#r����Ϸ�˵� "+tz15+"#l\r\n\r\n\r\n\t\t#L1##e"+tz15+"#r������Ϸ�̳� "+tz15+"#l\r\n\t");
	} else {
		cm.dispose();
		if (selection == 0) {
			cm.openNpc(9330079);
		} else {
			cm.EnterCS();
		}
	}
}