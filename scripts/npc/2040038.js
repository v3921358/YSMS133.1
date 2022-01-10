/*
 Yellow Balloon - LudiPQ 3rd stage NPC
 */

var status = -1;
var exp = 2940;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage3status = eim.getProperty("stage3status");
    if (stage3status == null) {
        if (cm.isLeader()) { // Leader
            var stage3leader = eim.getProperty("stage3leader");
            if (stage3leader == "done") {

                if (cm.haveItem(4001022, 30)) { // Clear stage
                    cm.sendNext("��ϲ�㣡��ɹ�ͨ���˵������ؿ������㣡����ĸ��ؿ��ƶ��ɣ�");
                    cm.removeAll(4001022);
                    clear(3, eim, cm);
                    cm.givePartyExp(exp, eim.getPlayers());
                } else { // Not done yet
                    
                    cm.sendNext("ȷ��������� #r30 ��ͨ��֤ #k�������ټ��һ����ı�����");
                }
            } else {
                cm.sendOk("��ӭ�����������ؿ���������Χ�ռ�30��ͨ��֤���ҡ�ע�⣬������һ�����ӽ������ȥһ���ݽ����������������������������ӳ�Ա��ͨ��֤�����㣬֮����ת�����ҡ�����ͨ����");
                eim.setProperty("stage3leader", "done");
            }
        } else { // Members
            cm.sendNext("��ӭ�����������ؿ���������Χ�ռ�30��ͨ��֤���ҡ�ע�⣬������һ�����ӽ������ȥһ���ݽ����������������������������ӳ�Ա��ͨ��֤�����㣬֮����ת�����ҡ�����ͨ����");
        }
    } else {
        cm.sendNext("��ϲ�㣡��ɹ�ͨ���˵������ؿ������㣡����ĸ��ؿ��ƶ��ɣ�");
    }
    cm.safeDispose();
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}