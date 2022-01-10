var status = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"

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
            var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���Ҫ���������#b\r\n#L0#" + icon + "��ͨ����(10000���þ�)\r\n#L1#" + icon + "��ͨ����(10000���þ�)\r\n#L2#" + icon + "��������(10000���þ�)\r\n#L3#" + icon + "���׺���(10000���þ�)\r\n#L4#" + icon + "ʨ���������װ�(10000���þ�)\r\n#L5#" + icon + "�������Ʒ����(20000���þ�)\r\n#L6#" + icon + "��ʿ�š�ϣ��˹Ů��(20000���þ�)\r\n#L7#" + icon + "��#v4310015#����BOSS��ս����(����[����/����/Ʒ����])";//\r\n#L0#����\r\n#L1#����
 	    cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("��ͨ����") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("��ͨ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(10000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 1:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("��ͨ����") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("��ͨ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(10000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 2:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("��������") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("��������");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(10000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 3:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("���׺���") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("���׺���");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(10000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 4:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("ʨ����") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("ʨ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(10000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 5:
           if (cm.getPlayer().getCSPoints(2)>=20000 && cm.getBossLog("Ʒ����") > 1) {
		    cm.gainNX(2,-20000);
                    cm.resetBossLog("Ʒ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(20000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 6:
           if (cm.getPlayer().getCSPoints(2)>=20000 && cm.getBossLog("ϣ��˹") >= 1) {
		    cm.gainNX(2,-20000);
                    cm.resetBossLog("ϣ��˹");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
		    cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n��������ʧ�ܣ����þ�ʣ�಻��(20000)���㻹ʣ�����.");
                    cm.dispose();
                }
            	    break;
        case 7:
	if( cm.haveItem(4310015,3) && (cm.getBossLog("��������") > 1 || cm.getBossLog("���׺���") > 1 || cm.getBossLog("Ʒ����") > 1)){
                    cm.resetBossLog("��������");
                    cm.resetBossLog("���׺���");
                    cm.resetBossLog("Ʒ����");
		    cm.gainItem(4310015,-3);
	    cm.sendOk("���óɹ�.ף����Ϸ���!");
	    cm.dispose();
} else {
	    cm.sendOk("��û�д�������֤��x3(BOSS���)\r\n�������ս������û��ʹ����Ŷ");
	    cm.dispose();
}
            break;
        }
    }
}