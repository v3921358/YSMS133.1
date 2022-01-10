var status = 0;
var minLevel = 120;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 1;

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
            cm.sendSimple("#e<��������ս���͵�>#n\r\n������ս������������кö౦����������ܹ������ң�#e#b�����ɡ�����װ��#n#k�Ƕ������¶�������\r\n\r\n#r1.������ÿ��һ�Σ�VIP�ɽ���һ������\r\n2.������������5000��ȯ\r\n#b#L0#����ִ���������#l\r\n#L2##r��Ҫ�һ������������䡣#b#l\r\n#L1#������һ��˵����#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("����Ӻ����̸����");
                    cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("��жӳ�����̸����");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Zkld");
                        //cm.worldMessage(cm.getChar().getName() + "   �������Ķ����������߳�101������ս����.��ȥ�Ŀ�ȥ��֯����ɣ�");
                        if (em == null) {
                            cm.sendOk("���������ڽ��赱�С�");
                        } else {
							if (cm.getPlayer().getCSPoints(1)<=5000 && !cm.haveItem(4032521, 1)) {
								cm.sendOk("�����û��5000��ȯ����VIP����ȯ���޷�����ս��");
								cm.dispose();
								return;
							}
							if (cm.getBossLog("���͵�")>=1) {
								cm.sendOk("������Ѿ���������ս�ˡ�");
								cm.dispose();
								return;
							}
                            if (cm.getPlayerCount(861000000) == 0) {
								cm.setBossLog("���͵�");
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("Ŀǰ��Ƶ���Ѿ���������ս���뻻��Ƶ�����½��롣");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } //�ж����
            } else if (selection == 1) {
                cm.sendOk("���ܿ��͵º󣬿��ұ�ʿ��ȡ#b����ħ�����߼�����ħ������ʦ��������ħ�����������Լ�#e#r�������������Ӷһ���#n#k�ȵȣ������㻹�м��ʻ��#rϡ�����ӡ�����ϵ��װ��������������#k\r\nִ�������������\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n3��ִ�и�����Ҫ����5000��ȯ\r\n4������ÿ��һ�Σ�VIP�ɽ���һ������\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
			} else if (selection == 2) {
                cm.sendYesNo("�һ���������Ҫ����#r#e40#k#n��#r#v4310003##t4310003##k���Ƿ���жһ���");
            }
        } else if (status == 2) {
			if (cm.haveItem(4310003, 40)) {
				if (cm.getSpace(2)<1) {
					cm.sendOk("������������ˣ�����������һ��λ��");
					cm.dispose();
					return;
				}
				cm.gainItem(2431938, 1);
				cm.gainItem(4310003, -40);
				cm.sendOk("��ϲ���һ��ɹ����뵽��ͨ�ȼ�����Ա������װ��������");
				cm.channelMessage(0x09, "��ϵͳ���桻" + " : " + "��ϲ��ҡ�" + cm.getChar().getName() + "���ɹ��ڿ��͵´��һ��˷�����������һ����");
			} else {
				cm.sendOk("�����û����ô��#r#v4310003##t4310003##k");
			}
			cm.dispose();
		}
    }
}