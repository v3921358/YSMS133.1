/*
 * �ۺ�ɫ�ǲ��Ǳ��̫ǿ���أ�
 * ��������ʹ3ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 9) {
            qm.sendNext("�ո��Ǹ�������ʿ������ȥ�ˣ�");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("#p3000018#�������ʹ�ü���ʱ���ۺ�ɫ��â�ƺ���ǿ�����ء�", 2);
    } else if (status == 1) {
        qm.sendNextPrev("���ǵ�Ȼ���Ҽ����������ʱ�����ͱ��������ϲ������ɫ����������˵�����Ѿ��������������ҵ������ˡ�");
    } else if (status == 2) {
        qm.sendNextPrevS("�ۺ�ɫûʲô���á��������ƺ��е�̫���˰ɡ�", 2)
    } else if (status == 3) {
        qm.sendNextPrev("�Ǿͷ������������Ļ���û�����ˡ�");
    } else if (status == 4) {
        qm.sendNextPrevS("û�취��", 2)
    } else if (status == 5) {
        qm.sendNextPrev("�Ȳ�˵������������Ѿ��ܸо����Լ�Խ��Խ�ܵ���Ӧ�ֵؿ��������������ʱ���ٴ�����������ֵ�ļ����ˡ�");
    } else if (status == 6) {
        qm.sendNextPrevS("��˵����֮ǰ���������Ĭ����", 2)
    } else if (status == 7) {
        qm.sendNextPrev("�ԣ���ô��������Ϊ�����ķ�ɫ��ʹ��");
    } else if (status == 8) {
        qm.sendNextPrevS("��������ô�붼���ò�̫�ö��", 2)
    } else if (status == 9) {
        qm.askAcceptDeclineNoESC("��Ӧ������ƫ����һ�仰�������ǿ�ɣ�");
    } else if (status == 10) {
        if (qm.getJob() == 6510) {
            qm.changeJob(6511);
        }
        if (!qm.haveItem(1142497, 1)) {
            qm.gainItem(1142497, 1);
        }
        qm.forceCompleteQuest();
        qm.sendNextS("�۰����Һ����ǿ���أ�", 2);
        qm.dispose();
    }
}