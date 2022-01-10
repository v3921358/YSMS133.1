/*
	Lime Balloon - LudiPQ 4th stage NPC
*/

var exp = 3360;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage4status = eim.getProperty("stage4status");
    if (stage4status == null) {
        if (cm.isLeader()) { // Leader
            var stage4leader = eim.getProperty("stage4leader");
            if (stage4leader == "done") {
                //if (cm.getMap(922010401).getAllMonstersThreadsafe().size() == 0 && cm.getMap(922010402).getAllMonstersThreadsafe().size() == 0 && cm.getMap(922010403).getAllMonstersThreadsafe().size() == 0 && cm.getMap(922010404).getAllMonstersThreadsafe().size() == 0 && cm.getMap(922010405).getAllMonstersThreadsafe().size() == 0) { // Clear stage
                    cm.sendNext("ף���㣬ͨ����2�ؿ����ɹ��������3�ؿ�.");
                    cm.removeAll(4001022);
                    clear(4, eim, cm);
                    cm.givePartyExp(exp);
                //} else { // Not done yet
                   // cm.sendNext("û���ռ����㹻��ͨ��֤������ȷ�ϡ�");
                //}
                cm.safeDispose();
            } else {
                cm.sendOk("��ӭ������2�ؿ����ڴ�Ԫ����ɱ���ڰ��еĹ����ռ�ͨ��֤������Ķ�Ա�ռ����е�ͨ��֤��������̸����");
                eim.setProperty("stage4leader", "done");
                cm.safeDispose();
            }
        } else { // Members
            cm.sendNext("��ӭ�����2�ؿ������ռ��ںڰ���ͼ�й����ͨ��֤����ɺ󽻸���Ӷӳ���");
            cm.safeDispose();
        }
    } else {
        cm.sendNext("ף���㣬ͨ����2�ؿ����ɹ��������3�ؿ�.");
        cm.safeDispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}