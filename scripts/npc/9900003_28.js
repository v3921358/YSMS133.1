var status = 0;
var minLevel = 10;
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
        if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4 || cm.getPlayer().getClient().getChannel() == 5) {
            if (status == 0) {
                if (cm.getMap().getId() == 951000100) {
                    status = 1;
                    cm.sendYesNo("�����ȥ��");
                } else {

                    cm.sendSimple("- #e#d�߾���������ͼ#k#n #r���� "+ cm.getBossLog("�߾����ͼ") +" / 1 ��:\r\n\r\n#b�ڸõ�ͼ�����������Ի�ô�������ֵ����boss�ľ�����������������ʱ���˫����������������顣��#k\r\n����Ҫ��\r\n#r1). ���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n2). ������ " + minPartySize + " �˽��롣\r\n\r\n#L0#[ִ��]����߾����ͼ#l")
                }
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) { // û�����
                        cm.sendOk("����Ӻ����̸����");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // ���Ƕӳ�
                        cm.sendOk("�ӳ��������������������˵����");
                        cm.dispose();
                    } else if (cm.getMap(914050002).getCharactersSize() > 0) {
                        cm.sendOk("���λ�ݵ��ͼ�����Ѿ��ڽ����С���ȴ����߻��ߺ���..");
                        cm.dispose();
                    } else {
                        if (cm.getBossLog("�߾����ͼ") < 3) {
                            //if (cm.checkPartyEventCount("ŷ����1")){
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
                                var em = cm.getEventManager("hade");
                                if (em == null) {
                                    cm.sendOk("���������ڽ��赱�С�");
                                } else {
                                    var prop = em.getProperty("state");
                                    if (prop.equals("0") || prop == null) {
                                        em.startInstance(cm.getParty(), cm.getMap(), 198);
                                        cm.setBossLog("�߾����ͼ");
                                        cm.worldSpouseMessage(0x20, "���߾����ͼ������� " + cm.getChar().getName() + " ���� �߾������� ��ͼ���������ǿ���ɡ��Ķ��ɡ�");
                                        cm.dispose();
                                        return;
                                    } else {
                                        cm.sendOk("���������Ѿ������ˣ����Եȣ�");
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
                            cm.sendOk("�Բ���ÿ��ֻ�ܽ���1�Ρ�\r\n");
                            cm.dispose();
                        }
                    } //�ж����
                } else if (selection == 1) {
                    cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                    cm.dispose();
                }
            } else if (status == 2) {
                cm.warp(910000000);
                cm.dispose();
            }
        } else {
            cm.dispose();
            cm.sendOk("ֻ����1,2,3Ƶ���ſ��Բμ�����");
        }
    }
}