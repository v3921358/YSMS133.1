var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var selStr = "\t\t#d#e���ٷ�����ͼ - 10�����ϼ��ɽ��룺#n#k\r\n\r\n";
			//selStr +="\t#b����ǰ��ƱΪ��  #r" + cm.getPlayerPoints() + " #b ��#n#k\r\n\r\n";
			selStr +="\t\t#b����ǰ�������Ϊ�� #r"+ cm.getBossLog("�߾����ͼ") +" / 3 #b��#k#l\r\n\r\n";
			selStr +="\t\t#L1##b"+aaa+" ����߾���������ͼ#l#k\r\n"; 
			selStr +="\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("�����һ�ؿ��ǲ����˷Ѵ��������ǰ��ձ�ǵļ�ͷ�߶�������ҪС�Ĵ����ϰ��������ϰ����Ѫ������100��תְ��ɺ��ٽ��������ܿ졣");
                        }
		} else if (status == 2) {
			if(typed==1){
			cm.dispose();
			cm.warp(914050000, 0);
			cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, cm.getC().getChannel(), "�������ʱ����" + " : " + "��� " + cm.getChar().getName() + " ȥ��ս��������������߾���������ͼ����"));
				}
           }
		}
}