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
		cm.sendYesNo("�𾴵�VIP�����ã�����#r1000#kѩ���ң�����һ��ȫ����WELCOME��Ч��ȫ����+100�����Ƿ���");
	} else if (status == 1) {
		if (cm.haveItem(4310014,1000)) {
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��                    
			toDrop.setStr(100); //װ������
			toDrop.setDex(100); //װ������
			toDrop.setInt(100); //װ������
			toDrop.setLuk(100); //װ������
			toDrop.setMatk(100); //������
			toDrop.setWatk(100); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.gainItem(4310014,-1000);
			cm.sendOk("����ɹ���");
		} else {
			cm.sendOk("�����û����ô��ѩ�����ء�");
		}
		cm.dispose();
	}
}