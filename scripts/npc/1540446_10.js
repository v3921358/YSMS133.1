var status = 0;
var minLevel = 200;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 6;

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
	if (cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�[��ɫ����]��ս�ռ�˹��\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�������Ѿ���ս�Ĵ�����"+cm.getEventCount('˹��')+"\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r2��3�߿���ս��\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r�����ӳ����ҶԻ�ִ�С�\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#���Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L0##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[ִ��] ��ս�ռ�˹��#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("����Ӻ����̸����");
                    cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("�ӳ��������������������˵����");
                    cm.dispose();
                    } else  {
		if (cm.checkPartyEventCount("˹��",2)){
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
                        var em = cm.getEventManager("SiwuPQ");
                        if (em == null) {
                            cm.sendOk("���������ڽ��赱�С�");
                        } else {
                            var prop = em.getProperty("state");
                            if ((prop.equals("0") || prop == null) && cm.getPlayerCount(350060160) == 0 && cm.getPlayerCount(350060180) == 0 && cm.getPlayerCount(350060200) == 0) {
				cm.setPartyEventCount("˹��");
                                em.startInstance(cm.getParty(), cm.getMap());
								cm.worldSpouseMessage(0x25, "[ϵͳ��Ϣ] : ��� "+cm.getPlayer().getName()+"  �������Ķ�������˺�ɫ�����ڲ���");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("�������Ѿ������ˣ����Եȣ�");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } else {
			cm.sendOk("�Բ��𣬸ý�ɫÿ��ֻ�ܽ���2�Ρ�");
			cm.dispose();
			}
		} //�ж����
            } else if (selection == 1) {
                cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
            }
        }
		 } else {
        		cm.dispose();
        		cm.sendOk("ֻ����2Ƶ����3Ƶ���ſ��Բμ�[��ɫ����]��ս�ռ�˹�ڡ�");
	}
    }
}