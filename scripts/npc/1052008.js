var status = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var eim = cm.getEventInstance();
    if (mode == -1) {
		//eim.setProperty("charid_"+cm.getPlayer().getId(), "0");
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
			//��������
			eim.setProperty("charid_"+cm.getPlayer().getId(), "0");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			var text="";
			if (eim.getProperty("giftcount")!=1) {
				text= "��һ����Ʒ����#b"+eim.getProperty("rewardplayer")+"#k\r\n";
			}
			cm.sendYesNo(text+"������Ʒ#v"+eim.getProperty("rewarditem")+"##b#z"+eim.getProperty("rewarditem")+"##k,��ѡ�����Ƿ���Ҫ����Ʒ?\r\n\r\n#e#r����#b10#r��������ѡ�񣬷��򽫱������ߡ�");
        } else if (status == 1) {
			var randomNum = Math.floor(Math.random()*100+1);
			eim.setProperty("charid_"+cm.getPlayer().getId(), randomNum);
			cm.getPlayer().dropMessage(6, "[Roll - ����] �������� "+randomNum+"�㣬10���ṫ�������");
			cm.dispose();
		}
    }
}