var status = -1;
var maxVonLeon =2;

function start() {
	if (cm.getPlayer().getMapId() == 211070100 || cm.getPlayer().getMapId() == 211070101 || cm.getPlayer().getMapId() == 211070110) {
		cm.sendYesNo("�����뿪������?");
		status = 1;
		return;
	}
		if (cm.getPlayer().getLevel() < 120) {
			cm.sendOk("��ĵȼ�С��120�����ܽ���ʨ��Զ������.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getClient().getChannel() != 2 && cm.getPlayer().getClient().getChannel() != 3 && cm.getPlayer().getClient().getChannel() != 4) {
			cm.sendOk("�μ�ʨ��Զ����ֻ����2,3,4Ƶ������.");
			cm.dispose();
			return;
		}
    var em = cm.getEventManager("VonLeonBattle");

    if (em == null) {
	cm.sendOk("�ű�����,����ϵ����Ա.");
	cm.dispose();
	return;
    }
    var eim_status = em.getProperty("state");
            var data = cm.getBossLog("ʨ����");
	if (eim_status == null || eim_status.equals("0")) {
    var squadAvailability = cm.getSquadAvailability("VonLeon");
    if (squadAvailability == -1) {
	status = 0;
                    if (data >= maxVonLeon && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������սʨ���������װ��Ĵ����Ѿ����꣬������������ս�ɣ�");
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("���ڿ�������Զ���ӣ������ΪԶ���Ӷӳ���");
                } else if (squadAvailability == 1) {
                    if (data >= maxVonLeon && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������սʨ���������װ��Ĵ����Ѿ����꣬������������ս�ɣ�");
                        cm.dispose();
                        return;
                    }
	// -1 = Cancelled, 0 = not, 1 = true
	var type = cm.isSquadLeader("VonLeon");
	if (type == -1) {
	    cm.sendOk("Զ�����Ѿ�����.������ע��.");
	    cm.dispose();
	} else if (type == 0) {
	    var memberType = cm.isSquadMember("VonLeon");
	    if (memberType == 2) {
		cm.sendOk("�����Ʋ�����,���ܽ���Զ������.");
		cm.dispose();
	    } else if (memberType == 1) {
		status = 5;
		cm.sendSimple("�����ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�뿪Զ����#l \r\n#b#L2#��ѯԶ����#l");
	    } else if (memberType == -1) {
		cm.sendOk("Զ�����Ѿ�����.������ע��.");
		cm.dispose();
	    } else {
		status = 5;
		cm.sendSimple("�����ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�뿪Զ����#l \r\n#b#L2#�鿴Զ����#l");
	    }
	} else { // Is leader
	    status = 10;
	    cm.sendSimple("������ʲô����? \r\n#b#L0#�鿴Զ����#l \r\n#b#L1#�Ʋ�Զ���Ӷ�Ա#l \r\n#b#L2#�����Ʋ�����#l \r\n#r#L3#��ʼԶ������#l");
	// TODO viewing!
	}
	    } else {
			var eim = cm.getDisconnected("VonLeonBattle");
			if (eim == null) {
				var squd = cm.getSquad("VonLeon");
				if (squd != null) {
                            if (data >= maxVonLeon && !cm.getPlayer().isGM()) {
                                cm.sendOk("��������սʨ���������װ��Ĵ����Ѿ����꣬������������ս�ɣ�");
                                cm.dispose();
                                return;
                            }
                            cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ.\r\n" + squd.getNextPlayer());
                            status = 3;
                        } else {
                            cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ.");
                            cm.safeDispose();
                        }
                    } else {
                        cm.sendYesNo("��Ҫ��������Զ��������?");
                        status = 2;
                    }
                }
	} else {
			var eim = cm.getDisconnected("VonLeonBattle");
			if (eim == null) {
				var squd = cm.getSquad("VonLeon");
				if (squd != null) {
                        if (data >= maxVonLeon && !cm.getPlayer().isGM()) {
                            cm.sendOk("��������սʨ���������װ��Ĵ����Ѿ����꣬������������ս�ɣ�");
                            cm.dispose();
                            return;
                        }
                        cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ.\r\n" + squd.getNextPlayer());
                        status = 3;
                    } else {
                        cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ.");
                        cm.safeDispose();
                    }
                } else {
                    cm.sendYesNo("��Ҫ��������Զ��������");
                    status = 2;
                }
            }
}

function action(mode, type, selection) {
    switch (status) {
	case 0:
	    if (mode == 1) {
			if (cm.registerSquad("VonLeon", 5, " �Ѿ���Ϊʨ��Զ���ӳ�.���λ��ʿ��5�����ڼ���Զ���Ӳ��ҿ�ʼԶ������.���򽫻�ע��Զ����.")) {
				cm.sendOk("���Ѿ���Ϊʨ��Զ���Ӷӳ�.����5�������ټ���Զ���Ӷ�Ա����Զ������.���򽫻��Զ�ע��Զ����.");
			} else {
				cm.sendOk("�������󣬼�����Ķ��顣");
			}
	    }
	    cm.dispose();
	    break;
	case 1:
	    if (mode == 1) {
		cm.warp(910000000, 0);
	    }
	    cm.dispose();
	    break;
	case 2:
		if (!cm.reAdd("VonLeonBattle", "VonLeon")) {
			cm.sendOk("�ű�����.����ϵ����Ա.");
		}
		cm.safeDispose();
		break;
	case 3:
		if (mode == 1) {
			var squd = cm.getSquad("VonLeon");
			if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
				squd.setNextPlayer(cm.getPlayer().getName());
				cm.sendOk("����Ϊ��������Ϣ.");
			}
		}
		cm.dispose();
		break;
	case 5:
	    if (selection == 0) { // join
		var ba = cm.addMember("VonLeon", true);
		if (ba == 2) {
		    cm.sendOk("Զ���������Ѿ��㹻.��ȴ�Զ���ӳ��Ʋ���Ա���´���ս.");
		} else if (ba == 1) {
		    cm.sendOk("���Ѿ��ɹ�����Զ����.");
		} else {
		    cm.sendOk("���Ѿ�����Զ����.");
		}
	    } else if (selection == 1) {// withdraw
		var baa = cm.addMember("VonLeon", false);
		if (baa == 1) {
		    cm.sendOk("�˳�Զ���ӳɹ�.");
		} else {
		    cm.sendOk("��û�м���Զ����");
		}
	    } else if (selection == 2) {
		if (!cm.getSquadList("VonLeon", 0)) {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ�Ҫ�󱻾ܾ���");
		}
	    }
	    cm.dispose();
	    break;
	case 10:
	    if (mode == 1) {
		if (selection == 0) {
		    if (!cm.getSquadList("VonLeon", 0)) {
			cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ�Ҫ�󱻾ܾ���");
		    }
		    cm.dispose();
		} else if (selection == 1) {
		    status = 11;
		    if (!cm.getSquadList("VonLeon", 1)) {
			cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ�Ҫ�󱻾ܾ���");
			cm.dispose();
		    }
		} else if (selection == 2) {
		    status = 12;
		    if (!cm.getSquadList("VonLeon", 2)) {
			cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ�Ҫ�󱻾ܾ���");
			cm.dispose();
		    }
		} else if (selection == 3) { // get insode
		    if (cm.getSquad("VonLeon") != null) {
			var dd = cm.getEventManager("VonLeonBattle");
			dd.startInstance(cm.getSquad("VonLeon"), cm.getMap(), "ʨ����");
		    } else {
			cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ�Ҫ�󱻾ܾ���");
		    }
		    cm.dispose();
		}
	    } else {
		cm.dispose();
	    }
	    break;
	case 11:
	    cm.banMember("VonLeon", selection);
	    cm.dispose();
	    break;
	case 12:
	    if (selection != -1) {
		cm.acceptMember("VonLeon", selection);
	    }
	    cm.dispose();
	    break;
    }
}