/*
 Sky-Blue Balloon - LudiPQ 7th stage NPC
 **/

var status;
var exp = 4620;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage7status = eim.getProperty("stage7status");

    if (stage7status == null) {
        if (cm.isLeader()) { // Leader
            var stage7leader = eim.getProperty("stage7leader");
            if (stage7leader == "done") {

                if (cm.getMap().getAllMonstersThreadsafe().size() == 0) { // Clear stage
                    cm.sendNext("ף���㣬ͨ����4�ؿ����ɹ��������5�ؿ���");
                    cm.removeAll(4001022);
                    clear(7, eim, cm);
                    cm.givePartyExp(exp, eim.getPlayers());
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("��ȷ���������������ͼ�����еĹ��");
                }
                cm.dispose();
            } else {
                cm.sendOk("��ӭ������4�ؿ���ɱ�����еĹ���ѳ�Ա�ռ�����ͨ��֤�����㣬Ȼ���ں���̸����");
                eim.setProperty("stage7leader", "done");
                cm.dispose();
            }
        } else { // Members
            cm.sendNext("��ӭ������4�׶Σ��ռ�ɱ�����ﲢ�ռ�����ͨ��֤��������Ӷӳ���");
            cm.dispose();
        }
    } else {
        cm.sendNext("ף���㣬ͨ����4�ؿ����ɹ��������5�ؿ���");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}