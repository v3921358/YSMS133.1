/* Mu Young
	Boss Balrog
*/


var status = -1;
var balrogMode; // false = easy, true = hard

function action(mode, type, selection) {
    switch (status) {
	case -1:
	    status = 0;
	    switch (cm.getChannelNumber()) {
		case 5:
		    balrogMode = true;
		    cm.sendNext("�㵱ǰ���ڵ�Ƶ��������ս #b����ħ(��ͨ)#k. �����Ҫ��ս�������������ħ�뵽��ӦƵ��. \n\r #b#i3994116# 5Ƶ�� / �ȼ�50�� / 6 - 15 �� \r\n#b#i3994115# ��5Ƶ��������Ƶ��  / �ȼ�50-70 / 3 - 6 ��.");
		    break;
		default:
		    balrogMode = false;
		    cm.sendNext("�㵱ǰ���ڵ�Ƶ��������ս #b����ħ(��)#k. �����Ҫ��ս�������������ħ�뵽��ӦƵ��. \n\r #b#i3994116# 5Ƶ�� / �ȼ�50�� / 6 - 15 �� \r\n#b#i3994115# ��5Ƶ��������Ƶ��  / �ȼ�50-70 / 3 - 6 ��.");
		    break;
	    }
	    break;
	case 0:
	    var em = cm.getEventManager(balrogMode ? "BossBalrog_NORMAL" : "BossBalrog_EASY");

	    if (em == null) {
		cm.sendOk("�ű�����.����ϵ����Ա.");
		cm.safeDispose();
		return;
	    }

	    if (cm.getParty() != null) {
	var prop = em.getProperty("state");
	    var marr = cm.getQuestRecord(balrogMode ? 160106 : 160105);
	    var data = marr.getCustomData();
	    if (data == null) {
		marr.setCustomData("0");
	        data = "0";
	    }
	    var time = parseInt(data);
	if (prop == null || prop.equals("0")) {
		var squadAvailability = cm.getSquadAvailability("BossBalrog");
		if (squadAvailability == -1) {
		    status = 1;
	    if (time + (6 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("������Сʱ���Ѿ���ս��������ħ.ʣ�µĶ���ʱ��Ϊ: " + cm.getReadableMillis(cm.getCurrentTime(), time + (6 * 3600000)));
		cm.dispose();
		return;
	    }
		    cm.sendYesNo("����Ҫ��ΪԶ���Ӷӳ���?");

		} else if (squadAvailability == 1) {
	    if (time + (6 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("������Сʱ���Ѿ���ս��������ħ.ʣ�µĶ���ʱ��Ϊ: " + cm.getReadableMillis(cm.getCurrentTime(), time + (6 * 3600000)));
		cm.dispose();
		return;
	    }
		    // -1 = Cancelled, 0 = not, 1 = true
		    var type = cm.isSquadLeader("BossBalrog");
		    if (type == -1) {
			cm.sendOk("Զ�����Ѿ�ע��.����������!");
			cm.safeDispose();
		    } else if (type == 0) {
			var memberType = cm.isSquadMember("BossBalrog");
			if (memberType == 2) {
			    cm.sendOk("�����Ʋ�����.���ܲμ�Զ������.");
			    cm.safeDispose();
			} else if (memberType == 1) {
			    status = 5;
			    cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#����Զ����#l \r\n#b#L2#�˳�Զ����#l");
			} else if (memberType == -1) {
			    cm.sendOk("Զ�����Ѿ�ע��.����������.");
			    cm.safeDispose();
			} else {
			    status = 5;
			    cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#����Զ����#l \r\n#b#L2#�˳�Զ����#l");
			}
		    } else { // Is leader
			status = 10;
			cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#�Ʋ�Զ����Ա#l \r\n#b#L2#�����Ʋ�����#l \r\n#r#L3#��ʼԶ������#l");
		    // TODO viewing!
		    }
	    } else {
			var eim = cm.getDisconnected(balrogMode ? "BossBalrog_NORMAL" : "BossBalrog_EASY");
			if (eim == null) {
				var squd = cm.getSquad("BossBalrog");
				if (squd != null) {
	    if (time + (6 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("������Сʱ���Ѿ���ս��������ħ.ʣ�µĶ���ʱ��Ϊ: " + cm.getReadableMillis(cm.getCurrentTime(), time + (6 * 3600000)));
		cm.dispose();
		return;
	    }
					cm.sendYesNo("Զ�������Ѿ���ʼ!\r\n" + squd.getNextPlayer());
					status = 3;
				} else {
					cm.sendOk("Զ�������Ѿ���ʼ!");
					cm.safeDispose();
				}
			} else {
				cm.sendYesNo("��Ҫ��������Զ��������?");
				status = 2;
			}
	    }
	} else {
			var eim = cm.getDisconnected(balrogMode ? "BossBalrog_NORMAL" : "BossBalrog_EASY");
			if (eim == null) {
				var squd = cm.getSquad("BossBalrog");
				if (squd != null) {
	    if (time + (6 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("������Сʱ���Ѿ���ս��������ħ.ʣ�µĶ���ʱ��Ϊ: " + cm.getReadableMillis(cm.getCurrentTime(), time + (6 * 3600000)));
		cm.dispose();
		return;
	    }
					cm.sendYesNo("Զ�������Ѿ���ʼ.\r\n" + squd.getNextPlayer());
					status = 3;
				} else {
					cm.sendOk("Զ�������Ѿ���ʼ.");
					cm.safeDispose();
				}
			} else {
				cm.sendYesNo("��Ҫ��������Զ��������?");
				status = 2;
			}
	}
	    } else {
		cm.sendPrev("��û�ж���.");
		cm.safeDispose();
	    }
	    break;
	case 1:
	    if (mode == 1) {
		if (!balrogMode) { // Easy Mode
		    var lvl = cm.getPlayerStat("LVL");
		    if (lvl >= 50 && lvl <= 70) {
			if (cm.registerSquad("BossBalrog", 5, " �Ѿ���ΪԶ���ӳ�.���λ��Ա�ڣ������ڼ���Զ���Ӳ���ʼԶ������.���򽫻��Զ�ע��Զ������.")) {
				cm.sendOk("���Ѿ���ΪԶ���ӳ�.���ڣ������ټ�Զ����Ա���ҿ�ʼԶ������.���򽫻�ע�����Զ����.");
			} else {
				cm.sendOk("δ֪����,������.");
			}
		    } else {
			cm.sendNext("���С���Ա�ĵȼ����ڣ���������֮��.��ȷ������������������.");
		    }
		} else { // Normal Mode
			if (cm.registerSquad("BossBalrog", 5, " �Ѿ���ΪԶ���ӳ�.���λ��Ա�ڣ������ڼ���Զ���Ӳ���ʼԶ������.���򽫻��Զ�ע��Զ������.")) {
				cm.sendOk("���Ѿ���ΪԶ���ӳ�.���ڣ������ټ�Զ����Ա���ҿ�ʼԶ������.���򽫻�ע�����Զ����.");
			} else {
				cm.sendOk("δ֪����,������.");
			}
		}
	    } else {
		cm.sendOk("�����ΪԶ���ӳ�.?")
	    }
	    cm.safeDispose();
	    break;
	case 2:
		if (!cm.reAdd(balrogMode ? "BossBalrog_NORMAL" : "BossBalrog_EASY", "BossBalrog")) {
			cm.sendOk("����������һ�Ρ�");
		}
		cm.safeDispose();
		break;
	case 3:
		if (mode == 1) {
			var squd = cm.getSquad("BossBalrog");
			if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
				squd.setNextPlayer(cm.getPlayer().getName());
				cm.sendOk("���Ѿ���Զ������.");
			}
		}
		cm.dispose();
		break;
	case 5:
	    if (selection == 0) {
		if (!cm.getSquadList("BossBalrog", 0)) {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ����󱻾ܾ���");
		    cm.safeDispose();
		} else {
		    cm.dispose();
		}
	    } else if (selection == 1) { // join
		var ba = cm.addMember("BossBalrog", true);
		if (ba == 2) {
		    cm.sendOk("Զ���������Ѿ��㹻,���Ժ�����.");
		    cm.safeDispose();
		} else if (ba == 1) {
		    cm.sendOk("����Զ���ӳɹ�.");
		    cm.safeDispose();
		} else {
		    cm.sendOk("���Ѿ���Զ��������.");
		    cm.safeDispose();
		}
	    } else {// withdraw
		var baa = cm.addMember("BossBalrog", false);
		if (baa == 1) {
		    cm.sendOk("�ɹ��˳�Զ����.");
		    cm.safeDispose();
		} else {
		    cm.sendOk("��û�м���Զ����.");
		    cm.safeDispose();
		}
	    }
	    break;
	case 10:
	    if (selection == 0) {
		if (!cm.getSquadList("BossBalrog", 0)) {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ����󱻾ܾ���");
		}
		cm.safeDispose();
	    } else if (selection == 1) {
		status = 11;
		if (!cm.getSquadList("BossBalrog", 1)) {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ����󱻾ܾ���");
		}
		cm.safeDispose();
	    } else if (selection == 2) {
		status = 12;
		if (!cm.getSquadList("BossBalrog", 2)) {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ����󱻾ܾ���");
		}
		cm.safeDispose();
	    } else if (selection == 3) { // get insode
		if (cm.getSquad("BossBalrog") != null) {
		    var dd = cm.getEventManager(balrogMode ? "BossBalrog_NORMAL" : "BossBalrog_EASY");
		    dd.startInstance(cm.getSquad("BossBalrog"), cm.getMap(), balrogMode ? 160106 : 160105);
		    cm.dispose();
		} else {
		    cm.sendOk("����δ֪�Ĵ��󣬶�Զ���ӵ����󱻾ܾ���");
		    cm.safeDispose();
		}
	    }
	    break;
	case 11:
	    cm.banMember("BossBalrog", selection);
	    cm.dispose();
	    break;
	case 12:
	    if (selection != -1) {
		cm.acceptMember("BossBalrog", selection);
	    }
	    cm.dispose();
	    break;
    }
}