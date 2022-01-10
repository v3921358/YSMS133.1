var status = 0;
var minLevel = 200;
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
        if (mode == 1) status++;
        else status--;
	if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4) {
        if (cm.getMapId() == 540010001) {
        if (status == 0) {
            cm.sendSimple("#e#d[ȫ��ɻ���ս]#k#n:\r\n\r\n\r\n#b���������ǹ��ʺ���[MH360]������¡����ȫ��30���ӣ��ɻ�������һ���𵰣�����������Ե���140��150װ�����Լ��ص������ħ���ȵȡ��ڷɻ��Ͽ������� #e#r@mob#k#n#b �鿴����Ѫ������������������������1�����·ɻ���ȡ��ο������\r\n\r\n#r����Ҫ��\r\n\r\n1). ���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n2). ���Ա����Ҫ" + minPartySize + "��ǰ��#b\r\n\r\n#L0#[MH360]�ɻ�����ս#l\r\n")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("����Ӻ����̸����");
                    cm.dispose();
				} else if (cm.getParty().getMembers().size() < 1){
					cm.sendOk("�Բ��𣬴˴���ս����������1����Ա,�Ҳ��ܴ���1����."); 
					cm.dispose();
				} else if (cm.getMap(540010101).getCharactersSize() > 0) {
					cm.sendOk("���κ����Ѿ������ˣ���ȴ��´ΰ�������߻��߳���..");
					cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("�ӳ��������������������˵����");
                    cm.dispose();
                    } else  {
		if (cm.getBossLog("����") < 1 && cm.getEventCount("����") < 1){
		if (cm.checkPartyEventCount("����",1)){
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
                        var em = cm.getEventManager("ZChaosPQ2");
                        if (em == null) {
                            cm.sendOk("���������ڽ��赱�С�");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 198);
                                cm.setBossLog("����");
				cm.setEventCount("����");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("[ȫ��ɻ���ս]�ɻ����Ѿ������ˣ����Եȣ�");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } else {
			cm.sendOk("����������Ƿ��������ɴ���#b��Ա#k��");
			cm.dispose();
			}
                } else {
			cm.sendOk("�Բ��𣬸��ʺ�ÿ��ֻ�ܽ���1�Ρ�");
			cm.dispose();
			}
		} //�ж����
            } else if (selection == 1) {
                cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
            }
        }
	} else {
		 var pt = cm.getEventManager("ZChaosPQ2");
		 var times = pt.getInstance("ZChaosPQ2").getTimeLeft();
	  	if(times < (1000 * 60 * 2)){
		cm.warp(540010001);
		//cm.gainItem(4310079, 100);
		cm.gainItem(5062009, 30);
		cm.gainItem(5064000, 3);//��������
		cm.gainItem(5750000, 3);//����ħ��
		cm.setEventCount("����");
		cm.worldSpouseMessage(0x20,"[ȫ��ɻ���ս] ����ϲ��� "+ cm.getChar().getName() +" �·ɻ���,��ú������һ����");
		} else {
                cm.sendOk("����ǰ�»�,�޷��õ��κν���Ŷ!\r\n�·ɻ���ɻ��#t5062009#x30��#t5064000#x3��#t5750000#x3��\r\n#rע������ʱ��С��2���ӵ�ʱ����Ե����������񷵻ص���.");
            }
		cm.dispose();
	}
		 } else {
        		cm.dispose();
        		cm.sendOk("ֻ����1,2,3,4Ƶ���ſ��Բμ�[MH360]��į�ĺ�ʱ������");
	}
    }
}