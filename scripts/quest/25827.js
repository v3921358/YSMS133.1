/*
 * ��ø�ǿ�ĸ�����Լ
 * ��������ʹ4ת
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 10) {
            qm.sendNext("�ո��Ǹ�������ʿ������ȥ�ˣ�");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("#h0#������������������");
    } else if (status == 1) {
        qm.sendNextPrevS("�ţ����ܰ�����ô����ˣ��õ����ǵ�ϲ�����濪�ġ�", 2)
    } else if (status == 2) {
        qm.sendNextPrev("(�������⺢������������)�ţ�����뷨�ܻ������ϡ����и�������㣬Ҫ��Ҫ������");
    } else if (status == 3) {
        qm.sendNextPrevS("��ͻȻ��ôһ�������ģ����˺ý��š���ʲô���飿", 2)
    } else if (status == 4) {
        qm.sendNextPrev("��һֱ���������ġ�");
    } else if (status == 5) {
        qm.sendNextPrevS("Խ��Խ���˶��������", 2)
    } else if (status == 6) {
        qm.sendNextPrev("�汻�����ˡ����ˣ�˵˵����ɡ�������ǿ�ƽ����Լ��һ��ʱ���˰ɣ�����Ӧ�ÿ��Ե޽������Լ�ˡ�");
    } else if (status == 7) {
        qm.sendNextPrevS("������Լ��", 2)
    } else if (status == 8) {
        qm.sendNextPrev("��һ����Լ���������Լ������ģ������ܵ����˵�ָ�������������Լ����Ҫ���Ҷ�ͬ����ܵ޽ᡣ");
    } else if (status == 9) {
        qm.sendNextPrevS("�������Ƿۺ�ɫ��Ҫ�������𣿲���Ҫ���ܻ�ð��������˵��������ۺ�ɫ�����ˡ�", 2)
    } else if (status == 10) {
        qm.askAcceptDeclineNoESC("��ô�ͽ���������Լ������������ͬʱ�޽���Լ�����о���ɣ�");
    } else if (status == 11) {
        if (qm.getJob() == 6511) {
            qm.changeJob(6512);
        }
        if (!qm.haveItem(1142498, 1)) {
            qm.gainItem(1142498, 1);
        }
        qm.forceCompleteQuest();
        qm.sendNextS("Ϊ�˴�ң���Ҫ��ǿ������", 2);
        qm.dispose();
    }
}