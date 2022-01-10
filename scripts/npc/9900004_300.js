var status = -1;
var winTimes = 0;
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiPaper = "#fUI/UIWindow.img/RpsGame/paper#";
var uiRock = "#fUI/UIWindow.img/RpsGame/rock#";
var uiScissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var uiWin = "#fUI/UIWindow.img/RpsGame/charWin#";
var uiLose = "#fUI/UIWindow.img/RpsGame/charLose#";
var FpictureArr=Array(uiFRock, uiFScissor, uiFPaper);
var pictureArr=Array(uiRock, uiScissor, uiPaper);
var step = -1;
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
		var text="�ٺ٣�����սһ���ҵĲ�ȭ������";
		text+="\r\n#b#L1#�淨˵��#l\r\n";
		text+="#b#L2#��ʼ��Ϸ#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (step>0)
			selection = step;
		if (selection == 1) {
			var text = "#d#e��Ϸ˵����#n#k\r\n";
			text+="\t1. Ŀǰ��ȭ��Ϸÿ����Խ��������Ρ�\r\n";
			text+="\t2. ÿһ��������Խ���10�Σ����������������Ϸ��\r\n";
			text+="\t3. �����ʤ�Ľ����Ǳ����ġ�\r\n";
			text+="\t4. ��;�˳���Ϸ���޷���ý�����\r\n";
			text+="\t5. �����һ�Ѿ����ˣ�Ҳ���Ի�ð�ο������";
			status=-1;
			cm.sendSimple(text);
		} else if (selection == 2) {
			var text = "���аɣ����꣡\r\n";
			text+="#L0#"+uiFRock+"#l";
			text+="#L1#"+uiFScissor+"#l";
			text+="#L2#"+uiFPaper+"#l";
			cm.sendSimple(text);
		}
	} else if (status == 2) {
		var playerHand = selection;
		var npcHand = Math.floor(Math.random()*3);
		var result =  playerHand - npcHand;
		if (result == -1 || result == 2) {
			//win
			winTimes+=1;
			if (winTimes>=10) {
				cm.sendSimple(uiWin+"\r\n���Ѿ���ʤ��10�֣����޵����ݣ���ȡ��Ľ���ȥ�ɣ�\r\n#b#L999#��ȡ����#l");
			} else {
				status = 0;
				step = 2;
				cm.sendSimple(uiWin+"\r\n�е���˼�����Ѿ���ʤ"+winTimes+"���ˣ�ս�����ף�\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
			}
		} else if (result == 0) {
			//tie
			status = 0;
			step = 2;
			cm.sendSimple("���ͱ���Ӯ�ˣ����ɣ����������\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
		} else {
			//lose
			cm.sendSimple(uiLose+"\r\n�ǺǺǣ��㻹��̫�����ˡ�\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]+"\r\n#b#L999#��ȡ�������˳���Ϸ#l");
		}
	} else if (status == 3) {
		//��ȡ����
		if (winTimes>=3) {
			cm.worldMessage(0x18, "����ȭ���֡� : ��� " + cm.getChar().getName() + " �ڲ�ȭ��Ϸ����ʤ"+winTimes+"�ѣ�����˷��Ľ�����");
		}
		var meso = 10000*Math.pow(2,winTimes);
		cm.gainMeso(meso);
		cm.gainItem(4310057, winTimes*2);
		cm.sendOk("�����"+meso+"��Ϸ�Һ�"+(winTimes*2)+"��#v4310057##t4310057#");
		cm.dispose();
	}
}

function isWin(playerHand) {

}