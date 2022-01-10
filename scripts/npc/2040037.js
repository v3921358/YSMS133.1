/**
 Orange Balloon - LudiPQ 2nd stage NPC
 **/

var status;
var exp = 2520;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage2status = eim.getProperty("stage2status");
    if (stage2status == null) {
        if (cm.isLeader()) { // Leader
            var stage2leader = eim.getProperty("stage2leader");
            if (stage2leader == "done") {
                if (cm.haveItem(4001022,10)) { // Clear stage
                    cm.removeAll(4001022);
                    clear(2, eim, cm);
                    cm.givePartyExp(2520);
                    cm.sendNext("��ϲ�㣡��ɹ�ͨ���˵ڶ����ؿ������㣡��������ؿ��ƶ��ɣ�");
                    cm.dispose();
                } else { // Not done yets
                    
                    cm.sendNext("ȷ��������� #r10 ��ͨ��֤ #k�������ټ��һ����ı�����");
                }
                cm.dispose();
            } else {
                cm.sendOk("��ӭ�����ڶ����ؿ���������Χ�ռ�10��ͨ��֤���ҡ�ע�⣬������һ�����ӽ������ȥһ���ݽ����������������������������ӳ�Ա��ͨ��֤�����㣬֮����ת�����ҡ�����ͨ����");
                eim.setProperty("stage2leader", "done");
                cm.dispose();
            }
        } else { // Members
            cm.sendNext("��ӭ�����ڶ����ؿ���������Χ�ռ�10��ͨ��֤���ҡ�ע�⣬������һ�����ӽ������ȥһ���ݽ����������������������������ӳ�Ա��ͨ��֤�����㣬֮����ת�����ҡ�����ͨ����");
            cm.dispose();
        }
    } else {
        cm.sendNext("��ϲ�㣡��ɹ�ͨ���˵ڶ����ؿ������㣡��������ؿ��ƶ��ɣ�");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}