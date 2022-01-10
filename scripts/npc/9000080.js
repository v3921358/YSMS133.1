/*
 �ű����ܣ��ƽ���Ժ���
 */

var a = 0;
var minLevel = 115;
var maxLevel = 255;
var minPlayers = 1;
var maxPlayers = 6;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else
        if (a == 0) {
            if (cm.getMap().getId() == 252030100) {
                cm.sendSimple("���������ս�����뿪������#b\r\n#L0#  ����̫�ֲ��ˣ���Ҫ�뿪�����")
            } else {
                if (cm.getParty() == null) {
                    cm.playerMessage(1, "����Ӻ����ԡ�");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.playerMessage(1, "��ӳ����ͺ����ԡ�");
                    cm.dispose();
                } else if (cm.getBossLog('GoldTemple') >= 2) {
                    cm.playerMessage(1, "������һ��ֻ����ս2�Ρ�");
                    cm.dispose(); 
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    if (party.size() < minPlayers || party.size() > maxPlayers)
                        next = false;
                    else {
                        for (var i = 0; i < party.size() && next; i++) {
                            if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
                                levelValid += 1;
                            if (party.get(i).getMapid() == mapId)
                                inMap += 1;
                        }
                        if (levelValid < minPlayers || inMap < minPlayers)
                            next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("GoldTempleBoss");
                        if (em == null) {
                            cm.playerMessage(1, "���ִ�������ϵ����Ա��");
                            cm.dispose();
                        }
                        else {
                            em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                            party = cm.getPlayer().getEventInstance().getPlayers();
                            cm.setBossLog('GoldTemple')
                        }
                        cm.dispose();
                    }
                    else {
                        cm.playerMessage(1, "<������ - ��Ӹ���>\r\n\r\n1���μӵ������Ҫ1�����ϣ�6�����¡�\r\n2���μӵ���ӳ�Ա�ȼ�Ӧ��115���ϡ�");
                        cm.dispose();
                    }
                }
            }
        } else if (a == 1) {
            var instance = cm.isPlayerInstance();
            if (instance == false) {
                cm.warp(252030000)
                cm.dispose();
            } else {
                cm.removePlayerFromInstance();
                cm.dispose();
            }
        }//status

    }
}