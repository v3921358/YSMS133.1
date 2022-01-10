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
			var selStr = "\t\t#d#e快速飞升地图 - 10级以上即可进入：#n#k\r\n\r\n";
			//selStr +="\t#b您当前银票为：  #r" + cm.getPlayerPoints() + " #b 金#n#k\r\n\r\n";
			selStr +="\t\t#b您当前进入次数为： #r"+ cm.getBossLog("高经验地图") +" / 3 #b次#k#l\r\n\r\n";
			selStr +="\t\t#L1##b"+aaa+" 进入高经验升级地图#l#k\r\n"; 
			selStr +="\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("进入第一关卡是不会浪费次数，但是按照标记的箭头走动，但是要小心触碰障碍，触碰障碍会掉血。建议100级转职完成后再进入升级很快。");
                        }
		} else if (status == 2) {
			if(typed==1){
			cm.dispose();
			cm.warp(914050000, 0);
			cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x28, cm.getC().getChannel(), "『大冰川时代』" + " : " + "玩家 " + cm.getChar().getName() + " 去挑战大冰川，并想进入高经验升级地图。。"));
				}
           }
		}
}