/*
 *	�������٪��ֻʵ۵ĸ���
 */

var status = -1;
var minLevel = 120;

var minPartySize = 2;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("#e<�������٪��ֻʵ۵ĸ���>#n\r\n��������#b#h0##k������������ʲô���𣿺ǺǺǡ�#e#b\r\n#L0# 1.������ֹ٪��ֻʵ�����˹�ĸ��#l\r\n#L1# 2.����Ҫװ�������ˮ�Ŀ�ƿ��#l\r\n#L2# 3.��������˵����#l\r\n#L3# 4.������ȡ��Ʒ��#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
                cm.sendOk("�㲻�Ƕӳ������öӳ�������˵����");
            } else {
                var party = cm.getPlayer().getParty().getMembers();
                var mapId = cm.getPlayer().getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;
                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                    if (ccPlayer != null && ccPlayer.getLevel() >= minLevel) {
                        levelValid += 1;
                    } else {
                        next = false;
                    }
                    if (ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGM() ? 3 : 1);
                    }
                }
                if (party.size() > maxPartySize || inMap < minPartySize) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("Rex");
                    if (em == null) {
                        cm.sendOk("��ǰ������δ�����ι��ܣ����Ժ�����...");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop.equals("0") || prop == null) {
                            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                        } else {
                            cm.sendOk("Another party quest has already entered this channel.");
                        }
                    }
                } else {
                    cm.sendNext("�����������������" + minPartySize + "�����£�û�취��ȥ��������" + minLevel + "�����ϵĽ�ɫ" + minPartySize + "�����ϲ��ܽ�ȥ����ȷ��һ�£�Ȼ���������ҡ�");
                }
            }
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("��������ҪΪ��аĦ˹׼���������ˮ�����˲����ڻ����ҵ�ʱ�������������Σ�գ�һ��Ҫ���Һ��������ˮ����������˵Ļ����������е�Ŭ���ͻ��Ϊ��Ӱ���Ǻǡ�");
        } else if (selection == 2) {
            cm.sendOk("٪��ֻʵ�#r#o9300281##k���Ͼ�Ҫ�����ˡ���ӡ#r#o9300281##k�ķ�ӡʯ��������������ˡ�����ֻ�ܵ�#r#o9300281##k��ӡ�ŵ�#b#m921120500##kȥ��ֹ�������ˡ�����Ҫ�Ļ����ҿ��԰�����������������뱣֤�ҵİ�ȫ��\r\n��#e����ʱ��#n��20����\r\n��#e�μ�����#n��" + minPartySize + "��" + maxPartySize + "��\r\n");
            cm.dispose();
        } else if (selection == 3) {
            status = 2;
            cm.sendSimple("������ȡʲô������#e#b\r\n#L0# 1.������ȡ#t1032102#��#l\r\n#L1# 2.������ȡ#t1032103#��#l\r\n#L2# 3.������ȡ#t1032104#��#l\r\n#L3# 4.������ȡ#t1902048#��");
        }
    } else if (status == 2) {
        if (cm.haveItem(4032649)) {
            cm.sendNextPrev("ι��������Ѿ���#t4032649#�˰���������װˮ���С�����Ҫ�����ƿ�ӣ��Ǻǡ�");
        } else {
            cm.gainItem(4032649, 1);
        }
        cm.dispose();
    } else if (status == 3) {
        if (selection == 0) {
            if (!cm.canHold(1032102, 1)) {
                cm.sendOk("��ȷ���������㹻�Ŀռ�.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032077, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032077, -1);
                cm.gainItem(1032102, 1);
            } else {
                cm.sendNext("Ҫ����ȡ#b#t1032102##k����Ҫ50��#b#t4001530##k��#b#t1032077##k�����ȥ�Ѽ��ɡ�");
            }
        } else if (selection == 1) {
            if (!cm.canHold(1032103, 1)) {
                cm.sendOk("��ȷ���������㹻�Ŀռ�.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032078, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032078, -1);
                cm.gainItem(1032103, 1);
            } else {
                cm.sendNext("Ҫ����ȡ#b#t1032103##k����Ҫ50��#b#t4001530##k��#b#t1032078##k�����ȥ�Ѽ��ɡ�");
            }
        } else if (selection == 2) {
            if (!cm.canHold(1032104, 1)) {
                cm.sendOk("��ȷ���������㹻�Ŀռ�.");
            } else if (cm.haveItem(4001530, 50) && cm.haveItem(1032079, 1)) {
                cm.gainItem(4001530, -50);
                cm.gainItem(1032079, -1);
                cm.gainItem(1032104, 1);
            } else {
                cm.sendNext("Ҫ����ȡ#b#t1032104##k����Ҫ50��#b#t4001530##k��#b#t1032079##k�����ȥ�Ѽ��ɡ�");
            }
        } else if (selection == 3) {
            if (!cm.canHold(1902048, 1)) {
                cm.sendOk("��ȷ���������㹻�Ŀռ�������Ѿ���ȡ��.");
            } else if (cm.haveItem(4001530, 300)) {
                cm.gainItem(4001530, -300);
                cm.gainItem(1902048, 1);
            } else {
                cm.sendNext("Ҫ����ȡ#t1902048#����Ҫ300��#b#t4001530##k�����ȥ�Ѽ��ɡ�");
            }
        }
        cm.dispose();
    }
}