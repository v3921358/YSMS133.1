var status = 0;
var minLevel = 180;
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

                    cm.sendSimple("- #e#d����ֿ�#k#n:\r\n\r\n#b5�����ڻ���35Ѫ�Ĺ���Ա�����������µ��ߣ�\r\n\r\n#i4001485# #i2340000# #i5062000# #i5062002# #i4001839# #i4310088# #i4310036# #i5072000# #i5073000# #i5074000# #i3010527# #i3010832# #i3010829# #i2430866# #i1102481# #i1102482# #i1102483# #i1102484# #i1102485# #i1082543# #i1082544# #i1082545# #i1082546# #i1082547# #i1072743# #i1072744# #i1072745# #i1072746# #i1072747# #i1132174# #i1132175# #i1132176# #i1132177# #i1132178# #i1012438# #i1022211# #i1032224# #i1122269# #i1132247# #i1152160# #i1003976# #i1102623# #i1082556# #i1052669# #i1072870# #i1112793#�ȵȡ�#k\r\n����Ҫ��\r\n#r1). ���Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n2). ���Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n\r\n#L0#[ִ��]����򱦵�ͼ#l")
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
                        if (cm.getBossLog("��ݵ�") < 1 && cm.getEventCount("��ݵ�1") < 1) {
                            if (cm.checkPartyEventCount("��ݵ�1")){
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
                                        cm.setBossLog("��ݵ�");
					cm.setEventCount("��ݵ�1");
					cm.finishActivity(120111);
					cm.worldMessageEffect("[��ݵ�] " + " : " + "��������� " + cm.getChar().getName() + " ���� ��ݵ� ��ͼ�������������ض��顣��ϲ���� " , 16, 60);

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
                             } else {
                            	cm.sendOk("����������Ƿ��������ɴ���#b��Ա#k��");
                            	cm.dispose();
                            	}
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