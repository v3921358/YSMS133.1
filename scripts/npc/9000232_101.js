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
		var text = "";
		if (cm.getBossLog("ͨ������")>=2) {
			text ="�����Ѿ������2�δΣ������޽�����";
			cm.dispose();
			cm.warp(910000000);
			cm.sendOk(text);
			return;
		}
		if (cm.haveSpace(4)) {
			text+="С���Ӳ�������Ȼ���ߵ�������Ǹ���Ľ��������°ɡ�";
			cm.sendSimple(text);
		} else {
			text= "������λ�ò��㣬�޷���ȡ����������һ�°ɣ�";
			cm.sendOk(text);
			cm.dispose();
		}
		
	} else if (status == 1) {
		cm.dispose();
		cm.gainItem(4000313, 50);
		cm.gainMeso(500000);
		cm.setBossLog("ͨ������");
		cm.warp(910000000);
	}
}