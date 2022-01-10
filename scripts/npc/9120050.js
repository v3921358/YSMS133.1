var status = 0;
var minLevel = 180;
var maxLevel = 255;
var minPartySize = 2;
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
        if (mode == 1)
            status++;
        else
            status--;
        if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
            if (status == 0) {
                if (cm.getMap().getId() == 802000821) {
                    status = 1;
                    cm.sendYesNo("�����ȥ��");
                } else {

                    cm.sendSimple("- #e#dӵ�������#k#n:\r\n\r\n#b������ʿʵ������ħ�˸�������ʧ���ˣ��������ħ�˰����#r#p9310114##b��������������ħ�˵�����̫��ǿ����Ҫ�����ð�ռ��ǽ��н�ȡ��ɹ���Ⱥ󽫻��������������ǵ�����һ������#k\r\n����Ҫ��\r\n#r1). ����1,2,3�߿���ս��\r\n2). ���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n3). ���Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n\r\n#L0#[ִ��]ӵ�������#l")
                }
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) { // û�����
                        cm.sendOk("����Ӻ����̸����");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // ���Ƕӳ�
                        cm.sendOk("�ӳ��������������������˵����");
                        cm.dispose();
                    } else if (cm.getMap(802000821).getCharactersSize() > 0) {
                        cm.sendOk("����ӵ������︱���Ѿ��ڽ����С���ȴ����߻��ߺ���..");
                        cm.dispose();
                    } else {
                        if (cm.getBossLog("ӵ�������") < 2) {
                            //if (cm.checkPartyEventCount("�����1")){
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
                                var em = cm.getEventManager("Aufhaven");
                                if (em == null) {
                                    cm.sendOk("���������ڽ��赱�С�");
                                } else {
                                    var prop = em.getProperty("state");
                                    if (prop.equals("0") || prop == null) {
                                        em.startInstance(cm.getParty(), cm.getMap(), 198);
                                        cm.setBossLog("ӵ�������");
                                        cm.worldSpouseMessage(0x20, "[ӵ�������] ����� " + cm.getChar().getName() + " ��������ħ�� ŷ���� ��Ϣ֮�� <������ʵ����>����С�ġ�");
                                        cm.dispose();
                                        return;
                                    } else {
                                        cm.sendOk("�����������Ѿ������ˣ����Եȣ�");
                                    }
                                }
                                cm.dispose();
                            } else {
                                cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                                cm.dispose();
                            }
                            // } else {
                            //	cm.sendOk("����������Ƿ��������ɴ���#b��Ա#k��");
                            //	cm.dispose();
                            //	}
                        } else {
                            cm.sendOk("�Բ��𣬸��ʺ�ÿ��ֻ�ܽ���2�Ρ�\r\n");
                            cm.dispose();
                        }
                    } //�ж����
                } else if (selection == 1) {
                    cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                    cm.dispose();
                }
            } else if (status == 2) {
                cm.warp(802000820);
                cm.dispose();
            }
        } else {
            cm.dispose();
            cm.sendOk("ֻ����1,2,3Ƶ���ſ��Բμ�����");
        }
    }
}