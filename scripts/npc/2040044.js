var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == -1 && cm.isLeader()) {
        var eim = cm.getEventInstance();
        if (eim.getProperty("crackLeaderPreamble") == null) {
            eim.setProperty("crackLeaderPreamble", "done");
            cm.sendNext("����ǧ����࣬�������������һ���ؿ�������ؿ����������ʵ���� ��ܹ������ #r��Ԫ��Կ��#k ��ͻ�ͨ������ؿ���ף����ˣ�");
            
            
            cm.dispose();
        } else {
            if (cm.haveItem(4001023)) {
                status = 0;
                cm.sendNext("��ϲ�㣬�����˴��������ƶ��������ؿ���");
            } else {
                cm.sendNext("��û�п��� #b��Ԫ��Կ��#k�����ܹ������ҡ�");
                cm.dispose();
            }
        }
    } else if (status == -1 && !cm.isLeader()) {
        cm.sendNext("������Ķӳ�����˵������������������#b��Ԫ��Կ��#k��ף����ˣ�");
        cm.dispose();
    } else if (status == 0 && cm.isLeader()) {
        var eim = cm.getEventInstance();
        clear(9, eim, cm);
        cm.gainItem(4001023, -1);

        var players = eim.getPlayers();
        cm.givePartyExp_PQ(70, 1.0, players);
        eim.setProperty("cleared", "true"); //set determine
        eim.restartEventTimer(60000);
        var bonusmap = cm.getMap(922011100);
        for (var i = 0; i < players.size(); i++) {
            players.get(i).changeMap(bonusmap, bonusmap.getPortal(0));
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function clear(stage, eim) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}