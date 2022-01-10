/*
	Green Balloon - LudiPQ 5th stage NPC
**/

var exp = 3770;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage5status = eim.getProperty("stage5status");

    if (stage5status == null) {
        if (cm.isLeader()) { // Leader
            var stage5leader = eim.getProperty("stage5leader");
            if (stage5leader == "done") {

                if (cm.haveItem(4001022, 24)) { // Clear stage
                    cm.sendNext("ף���㣬ͨ����5�ؿ����ɹ��������6�ؿ���");
                    cm.removeAll(4001022);
                    clear(5, eim, cm);
                    cm.givePartyExp(exp, eim.getPlayers());
                } else { // Not done yet
                    cm.sendNext("��ȷ�������Ƿ���24��ͨ��֤��.");
                }
                cm.safeDispose();
            } else {
                cm.sendOk("��ӭ������5�ؿ����Ӳ�ɫ�ܵ��еĺ������ռ�ͨ��֤���ռ����Ѷ�Ա���ϵ�ͨ��֤�����㣬Ȼ���ٺ���̸����");
                eim.setProperty("stage5leader", "done");
                cm.safeDispose();
            }
        } else { // Members
            cm.sendNext("��ӭ������5�ؿ����Ӳ�ɫ�ܵ��еĺ������ռ�ͨ��֤���ռ����ѽ�����Ӷӳ���");
            cm.safeDispose();
        }
    } else {
        cm.sendNext("ף���㣬ͨ����5�ؿ����ɹ��������6�ء�");
        cm.safeDispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}