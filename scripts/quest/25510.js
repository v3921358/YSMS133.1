/*
 * Ѱ�ҵ�3��·
 * ҹ�ⷨʦ2ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextNoESC("ҹ�ⷨʦ����֪����������ͻأ�������㼯�о��������ҡ���Ҫ����ҹ�ⷨʦ���ϵĹ�֮�����������������ڵĺڰ�����������ɹ��Ļ���ҹ�ⷨʦ�Ͳ����ٱ��ڰ����������ˡ�");
    } else if (status == 1) {
        qm.PlayerToNpc("(�о���������������񻺻��İ���ס�������ڵĺڰ�������)");
    } else if (status == 2) {
        qm.PlayerToNpc("�ڰ�����������ʴ�ҵ�������ء��ⶼ����Ĺ��͡�");
    } else if (status == 3) {
        qm.sendNextPrevS("�����ˡ���һ�ж�Ҫ�鹦��ҹ�ⷨʦ����Ҫսʤ�ڰ������ļ�ǿ��־����ֻ�����Ա߰��˵�Сæ���ѡ������Ӧ��֪�������ܹ����ɳ���ϣ������ļ������⾵�����°ɡ�", 1);
    } else if (status == 4) {
        if (qm.getJob() == 2700) {
            qm.changeJob(2710);
        }
        if (!qm.haveItem(2430874, 1)) {
            qm.gainItem(2430874, 1);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}