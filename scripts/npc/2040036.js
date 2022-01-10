/*
 ��о���������ð�յ�����
 ��ϵQQ��1239776509
 ���ʱ�䣺2014��8��18�� 22:46:14
 �ű����ܣ���߳��������
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage1status = eim.getProperty("stage1status");

    if (stage1status == null) {
        if (cm.isLeader()) { // Leader
            var stage1leader = eim.getProperty("stage1leader");
            if (stage1leader == "done") {

                if (cm.haveItem(4001022, 20)) { // Clear stage
                    cm.sendNext("��ϲ�㣡 ��ɹ�ͨ���˵�һ�أ���㣬��ڶ���ǰ���ɣ�");
                    cm.gainItem(4001022, -20);
                    clear(1, eim, cm);
                    cm.givePartyExp(2100, eim.getPlayers());
                    cm.dispose();
                } else { // Not done yet
                    
                    cm.sendNext("ȷ��������� #r20 ��ͨ��֤��#k �� ����һ����ı���~");
                }
                cm.dispose();
            } else {
                cm.sendOk("��ӭ������һ���ؿ��� ������Χ�� �ǲ����кܶ�����������Щ���󣬴���20��ͨ��֤���ҡ� �����ɹ��õ���20��ͨ��֤���뽻�����ǵ��鳤��Ȼ����ת�����ҡ�");
                eim.setProperty("stage1leader", "done");
                cm.dispose();
            }
        } else { // Members
            cm.sendNext("��ӭ������һ���ؿ��� ������Χ�� �ǲ����кܶ�����������Щ���󣬴���20��ͨ��֤���ҡ� �����ɹ��õ���20��ͨ��֤���뽻�����ǵ��鳤��Ȼ����ת�����ҡ�");
            cm.dispose();
        }
    } else {
        cm.sendNext("��ϲ�㣡 ��ɹ�ͨ���˵�һ�أ���㣬��ڶ���ǰ���ɣ�");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}