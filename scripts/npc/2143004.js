var status = -1;
var maxCygnus = 1;

function start() {
    if (cm.getPlayer().getMapId() == 271040100) {
        cm.sendYesNo("�����ȥ��?");
        status = 1;
        return;
    }
    if (cm.getPlayer().getLevel() < 179) {
        cm.sendOk("��ĵȼ�����180.���ܲμ�Զ������");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 1) {
        cm.sendOk("Զ������ֻ����1Ƶ������.");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("CygnusBattle");

    if (em == null) {
        cm.sendOk("�ű�����,����ϵ����Ա.");
        cm.dispose();
        return;
    }
    var eim_status = em.getProperty("state");
    var data = cm.getBossLog("ϣ��˹");
    if (eim_status == null || eim_status.equals("0")) {
        var squadAvailability = cm.getSquadAvailability("Cygnus");
        if (squadAvailability == -1) {
            status = 0;
            if (data >= maxCygnus && !cm.getPlayer().isGM()) {
                cm.sendOk("��������սϣ��˹Ů�ʵĴ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            cm.sendYesNo("��Ҫ��Ϊϣ��˹Ů��Զ���Ӷӳ���?");
        } else if (squadAvailability == 1) {
            if (data >= maxCygnus && !cm.getPlayer().isGM()) {
                cm.sendOk("��������սϣ��˹Ů�ʵĴ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader("Cygnus");
            if (type == -1) {
                cm.sendOk("Զ�����Ѿ�ע��,����������.");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember("Cygnus");
                if (memberType == 2) {
                    cm.sendOk("�����Ʋ�����,���ܽ���Զ������.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("�����ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�뿪Զ����#l \r\n#b#L2#�鿴Զ���ӳ�Ա#l");
                } else if (memberType == -1) {
                    cm.sendOk("���Ѿ���Զ���ӳ�Ա��.");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("�����ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�뿪Զ����#l \r\n#b#L2#�鿴Զ���ӳ�Ա#l");
                }
            } else { // Is leader
                status = 10;
                cm.sendSimple("�����ʲô,Զ���ӳ�? \r\n#b#L0#�鿴Զ����#l \r\n#b#L1#�Ʋ�Զ����Ա#l \r\n#b#L2#�Ʋ���������#l \r\n#r#L3#��ʼԶ������#l");
                // TODO viewing!
            }
        } else {
            var eim = cm.getDisconnected("CygnusBattle");
            if (eim == null) {
                var squd = cm.getSquad("Cygnus");
                if (eim == null) {
                    if (data >= maxCygnus && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������սϣ��˹Ů�ʵĴ����Ѿ����꣬������������ս�ɣ�");
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
                cm.sendYesNo("��Ҫ����Զ��������");
                status = 2;
            }
        }
    } else {
        var eim = cm.getDisconnected("CygnusBattle");
        if (eim == null) {
            var squd = cm.getSquad("Cygnus");
            if (squd != null) {
                if (data >= maxCygnus && !cm.getPlayer().isGM()) {
                    cm.sendOk("��������սϣ��˹Ů�ʵĴ����Ѿ����꣬������������ս�ɣ�");
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
}

function action(mode, type, selection) {
    switch (status) {
    case 0:
        if (mode == 1) {
            if (cm.registerSquad("Cygnus", 5, " �Ѿ���ΪԶ���ӳ�.���λ��ʿ��5�����ڼ���Զ���Ӳ��ҿ�ʼԶ������.���򽫻�ע��Զ����.")) {
                cm.sendOk("���Ѿ���ΪԶ���Ӷӳ�.����5�������ټ���Զ���Ӷ�Ա����Զ������.���򽫻��Զ�ע��Զ����.");
            } else {
                cm.sendOk("�����������Զ���ӵĻ�����ô�������Ұɡ�");
            }
        }
        cm.dispose();
        break;
    case 1:
        if (mode == 1) {
            cm.warp(cm.getMap().getAllMonstersThreadsafe().size() == 0 ? 271040200 : 271030000, 0);
        }
        cm.dispose();
        break;
    case 2:
        if (!cm.reAdd("CygnusBattle", "Cygnus")) {
            cm.sendOk("����������һ�Ρ�");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad("Cygnus");
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("�����Ѿ���Զ�����ڽ���������...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) { // join
            var ba = cm.addMember("Cygnus", true);
            if (ba == 2) {
                cm.sendOk("Զ�����������Ѿ��㹻.���Ժ�����.");
            } else if (ba == 1) {
                cm.sendOk("�ɹ�����Զ������.");
            } else {
                cm.sendOk("���Ѿ���Զ��������.");
            }
        } else if (selection == 1) { // withdraw
            var baa = cm.addMember("Cygnus", false);
            if (baa == 1) {
                cm.sendOk("�˳�Զ���ӳɹ�.");
            } else {
                cm.sendOk("�㻹û��һ��Զ����.");
            }
        } else if (selection == 2) {
            if (!cm.getSquadList("Cygnus", 0)) {
                cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList("Cygnus", 0)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList("Cygnus", 1)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList("Cygnus", 2)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 3) { // get insode
                if (cm.getSquad("Cygnus") != null) {
                    var dd = cm.getEventManager("CygnusBattle");
                    dd.startInstance(cm.getSquad("Cygnus"), cm.getMap(), "ϣ��˹",false);
                } else {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
        break;
    case 11:
        cm.banMember("Cygnus", selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember("Cygnus", selection);
        }
        cm.dispose();
        break;
    }
}