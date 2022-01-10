/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		Ʒ����Զ��
*/
var status = -1;
var maxCount = 1;

function start() {
    if (cm.getPlayer().getLevel() < 150) {
        cm.sendOk("��ĵȼ�С��150,������սƷ����!");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 1 && cm.getPlayer().getClient().getChannel() != 2) {
        cm.sendOk("��սƷ��ͨ�����뵽1/2Ƶ��!");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("PinkBeanBattle");
    if (em == null) {
        cm.sendOk("�ű���������ϵ����Ա��");
        cm.dispose();
        return;
    }
    var eim_status = em.getProperty("state");
    var data = cm.getBossLog("Ʒ����");
    if (eim_status == null || eim_status.equals("0")) {
        var squadAvailability = cm.getSquadAvailability("PinkBean"); //��ȡԶ�������״̬ -1���ػ���
        if (squadAvailability == -1) {
            status = 0;
            if (data >= maxCount && !cm.getPlayer().isGM()) {
                cm.sendOk("��������Ʒ���͵Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            cm.sendYesNo("��Ҫ��ΪƷ����Զ���Ӷӳ���?");
        } else if (squadAvailability == 1) {
            if (data >= maxCount && !cm.getPlayer().isGM()) {
                cm.sendOk("��������Ʒ���͵Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader("PinkBean");
            if (type == -1) {
                cm.sendOk("�Ѿ����������롣");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember("PinkBean");
                if (memberType == 2) {
                    cm.sendOk("����Զ�����Ʋ��������ܽ���Զ������.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("������ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�˳�Զ����#l \r\n#b#L2#�鿴Զ���ӳ�Ա#l");
                } else if (memberType == -1) {
                    cm.sendOk("���Ѿ���Զ���ӳ�Ա��.");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("������ʲô? \r\n#b#L0#����Զ����#l \r\n#b#L1#�˳�Զ����#l \r\n#b#L2#�鿴Զ���ӳ�Ա#l");
                }
            } else {
                status = 10;
                cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ����#l \r\n#b#L1#�Ʋ�Զ���ӳ�Ա#l \r\n#b#L2#�����Ʋ�����#l \r\n#r#L3#��ʼԶ������#l");
            }
        } else {
            var eim = cm.getDisconnected("PinkBeanBattle");
            if (eim == null) {
                var squd = cm.getSquad("PinkBean");
                if (squd != null) {
                    if (data >= maxCount && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������Ʒ���͵Ĵ����Ѿ����꣬������������ս�ɣ�");
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ��\r\n" + squd.getNextPlayer());
                    status = 3;
                } else {
                    cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ��");
                    cm.safeDispose();
                }
            } else {
                cm.sendYesNo("��Ҫ��������Զ��������");
                status = 2;
            }
        }
    } else {
        var eim = cm.getDisconnected("PinkBeanBattle");
        if (eim == null) {
            var squd = cm.getSquad("PinkBean");
            if (squd != null) {
                if (data >= maxCount && !cm.getPlayer().isGM()) {
                    cm.sendOk("��������Ʒ���͵Ĵ����Ѿ����꣬������������ս�ɣ�");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ��\r\n" + squd.getNextPlayer());
                status = 3;
            } else {
                cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ��");
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
            if (cm.registerSquad("PinkBean", 5, " �Ѿ���ΪƷ����Զ���Ӷӳ�.���λӢ����5�����ڼ���Զ����.�����㽫���ܽ���Զ������.���Զ����5������û�н���Զ������.�����Զ�ע��Զ����.")) {
                cm.sendOk("���Ѿ���Ϊ��Զ���Ӷӳ�.����5�������ټ�Զ����Ա�μ�Զ������.���򽫻��Զ�ע�����Զ����.");
            } else {
                cm.sendOk("An error has occurred adding your squad.");
            }
        }
        cm.dispose();
        break;
    case 2:
        if (!cm.reAdd("PinkBeanBattle", "PinkBean")) {
            cm.sendOk("����δ֪�Ĵ��󣬲���ʧ�ܡ�");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad("PinkBean");
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("�����Ѿ���Զ�����ڽ���������...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) { // join
            var ba = cm.addMember("PinkBean", true);
            if (ba == 2) {
                cm.sendOk("Զ����ĿǰΪ��Ա״̬.���Ժ�����.");
            } else if (ba == 1) {
                cm.sendOk("��ɹ�����Զ����.");
            } else {
                cm.sendOk("���Ѿ���Զ���ӳ�Ա��.");
            }
        } else if (selection == 1) { // withdraw
            var baa = cm.addMember("PinkBean", false);
            if (baa == 1) {
                cm.sendOk("��ɹ��˳�Զ����.");
            } else {
                cm.sendOk("���Ѿ���Զ���ӳ�Ա.");
            }
        } else if (selection == 2) {
            if (!cm.getSquadList("PinkBean", 0)) {
                cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList("PinkBean", 0)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList("PinkBean", 1)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList("PinkBean", 2)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 3) { // get insode
                if (cm.getSquad("PinkBean") != null) {
                    var dd = cm.getEventManager("PinkBeanBattle");
                    dd.startInstance(cm.getSquad("PinkBean"), cm.getMap(), "Ʒ����",false);
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
        cm.banMember("PinkBean", selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember("PinkBean", selection);
        }
        cm.dispose();
        break;
    }
}