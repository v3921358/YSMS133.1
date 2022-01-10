/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		����Ʒ����Զ��
*/
var status = -1;
var maxCount = 1;
var checklevel = 180
var squadTpye = "chaospb";
var scriptName = "ChaosPinkBean";
var bossLogId = "����Ʒ����";
var npctxt = "����Ʒ����"

function start() {
    if (cm.getPlayer().getLevel() < checklevel) {
        cm.sendOk("��ĵȼ�С��" + checklevel + ",������ս#b" + npctxt + "#k!");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClient().getChannel() != 3 && cm.getPlayer().getClient().getChannel() != 4) {
        cm.sendOk("��ս#b" + npctxt + "#k�뵽#r3/4#kƵ��!");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager(scriptName);
    if (em == null) {
        cm.sendOk("�ű���������ϵ����Ա��");
        cm.dispose();
        return;
    }
    var eim_status = em.getProperty("state");
    var data = cm.getBossLog(bossLogId);
    if (eim_status == null || eim_status.equals("0")) {
        var squadAvailability = cm.getSquadAvailability(squadTpye); //��ȡԶ�������״̬ -1���ػ���
        if (squadAvailability == -1) {
            status = 0;
            if (data >= maxCount && !cm.getPlayer().isGM()) {
                cm.sendOk("��������#b" + npctxt + "#k�Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            cm.sendYesNo("��Ҫ��Ϊ#b" + npctxt + "#kԶ���Ӷӳ���?");
        } else if (squadAvailability == 1) {
            if (data >= maxCount && !cm.getPlayer().isGM()) {
                cm.sendOk("��������#b" + npctxt + "#k�Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader(squadTpye);
            if (type == -1) {
                cm.sendOk("�Ѿ����������롣");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember(squadTpye);
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
            var eim = cm.getDisconnected(scriptName);
            if (eim == null) {
                var squd = cm.getSquad(squadTpye);
                if (squd != null) {
                    if (data >= maxCount && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������#b" + npctxt + "#k�Ĵ����Ѿ����꣬������������ս�ɣ�");
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
        var eim = cm.getDisconnected(scriptName);
        if (eim == null) {
            var squd = cm.getSquad(squadTpye);
            if (squd != null) {
                if (data >= maxCount && !cm.getPlayer().isGM()) {
                    cm.sendOk("��������#b" + npctxt + "#k�Ĵ����Ѿ����꣬������������ս�ɣ�");
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
            if (cm.registerSquad(squadTpye, 5, " �Ѿ���Ϊ" + npctxt + "Զ���Ӷӳ�.���λӢ����5�����ڼ���Զ����.�����㽫���ܽ���Զ������.���Զ����5������û�н���Զ������.�����Զ�ע��Զ����.")) {
                cm.sendOk("���Ѿ���Ϊ��Զ���Ӷӳ�.����5�������ټ�Զ����Ա�μ�Զ������.���򽫻��Զ�ע�����Զ����.");
            } else {
                cm.sendOk("����δ֪�Ĵ��󣬴���Զ������ʧ�ܡ�");
            }
        }
        cm.dispose();
        break;
    case 2:
        if (!cm.reAdd(scriptName, squadTpye)) {
            cm.sendOk("����δ֪�Ĵ��󣬲���ʧ�ܡ�");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad(squadTpye);
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("�����Ѿ���Զ�����ڽ���������...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) { // ����Զ������
            var ba = cm.addMember(squadTpye, true);
            if (ba == 2) {
                cm.sendOk("Զ����ĿǰΪ��Ա״̬.���Ժ�����.");
            } else if (ba == 1) {
                cm.sendOk("��ɹ�����Զ����.");
            } else {
                cm.sendOk("���Ѿ���Զ���ӳ�Ա��.");
            }
        } else if (selection == 1) { // �˳�Զ����
            var baa = cm.addMember(squadTpye, false);
            if (baa == 1) {
                cm.sendOk("��ɹ��˳�Զ����.");
            } else {
                cm.sendOk("�˳�Զ��������ִ���.");
            }
        } else if (selection == 2) {
            if (!cm.getSquadList(squadTpye, 0)) {
                cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList(squadTpye, 0)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList(squadTpye, 1)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList(squadTpye, 2)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 3) { // ��ʼԶ������
                if (cm.getSquad(squadTpye) != null) {
                    var dd = cm.getEventManager(scriptName);
                    dd.startInstance(cm.getSquad(squadTpye), cm.getMap(), bossLogId,false);
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
        cm.banMember(squadTpye, selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember(squadTpye, selection);
        }
        cm.dispose();
        break;
    }
}