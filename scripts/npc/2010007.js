/* ������ - �������� */

var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            cm.sendNext("����û�����ʱ����������봴�����壬�����������ҡ�");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") > 0) {
            cm.dispose();
            cm.openNpc(2010007, 1);
        } else {
            cm.sendNext("�㡭������Ϊ�Լ������Ȥ���Ż������ҵ���");
        }
    } else if (status == 1) {
        cm.sendSimple("����Ҫ��ʲô�أ�������Ұɡ�\r\n\r\n#b#L0#������Ҽ�����ʲô#l\r\n#L1#Ӧ����δ������壿#l\r\n#L2#���봴������#l");
    } else if (status == 2) {
        sel = selection;
        if (selection == 0) {
            cm.sendNext("���塭������԰�������һ��С����֯����ӵ����ͬ�������Ϊ��ͬһ��Ŀ�Ķ��ۼ���һ���������֯�� ���Ǽ����Ǿ��������ܲ�����ʽ�Ǽǣ��Ǿ����Ͽɵ���֯��");
        } else if (selection == 1) {
            cm.sendNext("Ҫ�봴�����壬���ٱ���ﵽ10����");
        } else if (selection == 2) {
            if (cm.getPlayerStat("GID") > 0) {
                cm.sendOk("���Ѿ�ӵ�м����ˣ������ٴ�������.");
                cm.dispose();
            } else {
                cm.sendYesNo("Ŷ��������ע�������𡭡�Ҫ��ע����壬��Ҫ֧�� #b" + cm.getCreateGuildCost() + " ���#k����������һ���Ѿ�׼�����ˡ����ˡ����봴��������");
            }
        }
    } else if (status == 3) {
        if (sel == 0) {
            cm.sendNextPrev("ͨ�����������Ի�úܶ��Żݡ����磬���Ի�ü��弼�ܣ��Լ�����ר����Ʒ��");
            cm.dispose();
        } else if (sel == 1) {
            cm.sendNextPrev("���⻹��Ҫ #b" + cm.getCreateGuildCost() + " ���#k������ע���������������ѡ�");
        } else if (sel == 2 && cm.getPlayerStat("GID") <= 0) {
            cm.genericGuildMessage(0x03);
            cm.dispose();
        }
    } else if (status == 4) {
        if (sel == 1) {
            cm.sendNextPrev("���ˡ����������ע����壬�������Ұɡ�\r\n������Ȼ��������Ѿ��������������壬�ǾͲ����ˣ���");
        }
        cm.dispose();
    }
}