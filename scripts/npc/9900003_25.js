var status = 0;
var minLevel = 100;
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

                    cm.sendSimple("- #e#d����ֿ�#k#n :\r\n\r\n#b�ڸõ�ͼ����ÿ5����Ի��50���10ƻ����100���þ�5�����ڻ���35Ѫ�Ĺ���Ա�����������µ��ߣ�\r\n#i4000463# #i2340000# #i5062000# #i5062002# #i4001839# #i4310088# #i4310036# #i5072000# #i5073000# #i5074000# #i3994417# #i3994418# #i3994419# #i3010527#�ȵȡ�#k\r\n����Ҫ��\r\n#r1). ���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n2). ���Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n\r\n#L0#[ִ��]����򱦵�ͼ#l")
                }
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) { // û�����
                        cm.sendOk("����Ӻ����̸����");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // ���Ƕӳ�
                        cm.sendOk("�ӳ��������������������˵����");
                        cm.dispose();
                    } else if (cm.getMap(951000100).getCharactersSize() > 0) {
                        cm.sendOk("���λ�ݵ��ͼ�����Ѿ��ڽ����С���ȴ����߻��ߺ���..");
                        cm.dispose();
                    } else {
                        if (cm.getBossLog("�1�ݵ�") < 1) {
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
                                var em = cm.getEventManager("NewEvent46");
                                if (em == null) {
                                    cm.sendOk("���������ڽ��赱�С�");
                                } else {
                                    var prop = em.getProperty("state");
                                    if (prop.equals("0") || prop == null) {
                                        em.startInstance(cm.getParty(), cm.getMap(), 198);
                                        cm.setBossLog("�1�ݵ�");
					cm.finishActivity(120111);
                                        cm.worldSpouseMessage(0x20, "[��ݵ�] ����� " + cm.getChar().getName() + " ���� ��ݵ� ��ͼ�������������ض��顣��ϲ���ɡ�");
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
                            cm.sendOk("�Բ��𣬸��ʺ�ÿ��ֻ�ܽ���1�Ρ�\r\n");
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