/**
 * ������ - �������˸�����
 */

var status;
var choice;
var guildName;
var partymembers;

function start() {
    //cm.sendOk("The Guild Alliance is currently under development.");
    //cm.dispose();
    partymembers = cm.getPartyMembers();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("���ã��ҽ�#b������#k��\r\n#b#L0#���������Ҽ���������ʲô��#l\r\n#L1#Ҫ�����������˵Ļ�Ӧ����ô����#l\r\n#L2#��������������ˡ�#l\r\n#L3#�������Ӽ������˵ļ���������#l\r\n#L4#�����ɢ�������ˡ�#l");
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("�����������һ���������֯����Ϊ�������ˡ��Ҹ������������˵��й�����");
        } else if (selection == 1) {
            status = 5;
            cm.sendNext("��Ҫ�����������˵Ļ���������2�����峤�����ӡ����жӳ����Ϊ�������˵�������");
        } else if (selection == 2) {
            if (cm.getPlayer().getParty() == null || partymembers == null || partymembers.size() != 2 || !cm.isLeader()) {
                cm.sendOk("You may not create an alliance until you get into a party of 2 people"); //Not real text
                cm.dispose();
            } else if (partymembers.get(0).getGuildId() <= 0 || partymembers.get(0).getGuildRank() > 1) {
                cm.sendOk("You cannot form a Guild Union until you own a guild");
                cm.dispose();
            } else if (partymembers.get(1).getGuildId() <= 0 || partymembers.get(1).getGuildRank() > 1) {
                cm.sendOk("Your party member does not seem to own a guild.");
                cm.dispose();
            } else {
                var gs = cm.getGuild(cm.getPlayer().getGuildId());
                var gs2 = cm.getGuild(partymembers.get(1).getGuildId());
                if (gs.getAllianceId() > 0) {
                    cm.sendOk("You cannot form a Guild Union if you are already affiliated with a different Union.");
                    cm.dispose();
                } else if (gs2.getAllianceId() > 0) {
                    cm.sendOk("Your party member is already affiliated with a guild union.");
                    cm.dispose();
                } else if (cm.partyMembersInMap() < 2) {
                    cm.sendOk("Get your other party member on the same map please.");
                    cm.dispose();
                } else {
                    cm.sendYesNo("Oh, are you interested in forming a Guild Union?");
                }
            }
        } else if (selection == 3) {
            if (cm.getPlayer().getGuildRank() == 1 && cm.getPlayer().getAllianceRank() == 1) {
                cm.sendYesNo("To increase the capacity, you will need to pay 10,000,000 mesos. Are you sure you wish to proceed?"); //ExpandGuild Text
            } else {
                status = -1;
                cm.sendNext("ֻ�м������������������Ӽ���������");
            }
        } else if (selection == 4) {
            if (cm.getPlayer().getGuildRank() == 1 && cm.getPlayer().getAllianceRank() == 1) {
                cm.sendYesNo("��ȷ��Ҫ��ɢ��ļ������ˣ�");
            } else {
                status = -1;
                cm.sendNext("ֻ�м��������������Խ�ɢ�������ˡ�");
            }
        }
    } else if (status == 2) {
        if (choice == 2) {
            cm.sendGetText("��������Ҫ�����������˵����ơ�(Ӣ�����12�֣��������6��)");
        } else if (choice == 3) {
            if (cm.getPlayer().getGuildId() <= 0) {
                cm.sendOk("�㲻�ܽ�ɢ�����ڵļ������ˡ�");
                cm.dispose();
            } else {
                if (cm.addCapacityToAlliance()) {
                    cm.sendOk("You have added capacity to your alliance.");
                } else {
                    cm.sendOk("Your guild union has too much capacity already. 5 is the maximum.");
                }
                cm.dispose();
            }
        } else if (choice == 4) {
            if (cm.getPlayer().getGuildId() <= 0) {
                cm.sendOk("�㲻�ܽ�ɢ�����ڵļ������ˡ�");
                cm.dispose();
            } else {
                if (cm.disbandAlliance()) {
                    cm.sendOk("Your Guild Union has been disbanded");
                } else {
                    cm.sendOk("An error occured when disbanding the Guild Union");
                }
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("��ȷ��ʹ�� #b" + guildName + "#k ��Ϊ�������˵�������");
    } else if (status == 4) {
        if (!cm.createAlliance(guildName)) {
            cm.sendNext("�㲻��ʹ���������"); //Not real text
            status = 1;
            choice = 2;
        } else {
            cm.sendOk("���ѳɹ������˼������ˡ�");
        }
        cm.dispose();
    } else if (status == 5) {
        cm.sendNext("��Ҫ�����������˵Ļ���������2�����峤�����ӡ����жӳ����Ϊ�������˵�������");
    } else if (status == 6) {
        cm.sendNextPrev("2�����峤���֮����Ҫ5000���ҡ����Ǵ�����������������������ѡ�");
    } else if (status == 7) {
        status = -1;
        cm.sendNextPrev("���⻹��һ��������Ѿ����������������˵Ļ������޷������µļ������ˣ�");
    }
}