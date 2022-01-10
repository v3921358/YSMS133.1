var status = -1;
var sel = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var selStr = "���ǲɿ���� #bŵ��#k������������\r\n";
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            selStr += "#L2##b����#e�ɿ�#n�ȼ���#l\r\n#L3#�ɿ��ʼ����#k#l\r\n#L4##b����#t4011010#��#k#l";
        } else {
            selStr += "#L0##b��ȡ�й�#e�ɿ�#n��˵����#l\r\n#L1#ѧϰ#e�ɿ�#n��#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("�ɿ�����ʮ�ָ�֮��Ĺ��ߣ��ɼ���ͼ�ϵĿ�ʯ�ļ��ܡ��ɼ����Ŀ�ʯ��������#p9031007#���۵��������ұ�������װ������Ʒ������������Ĳ��ϡ�");
        } else if (sel == 1) {
            if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendOk("���Ѿ�ѧ���ҩ�����ҽ��������ѧϰ#bװ������#k����#b��Ʒ����#k���������ô����");
                cm.dispose();
                return;
            }
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("Сë�����㻹����ǿ��������ѧϰרҵ������#b���ٱ���ﵽ30��2ת���ϣ��������3ת���ϣ���Ӱ˫������2ת+����#k������ѧϰרҵ�������ȴﵽ����֮���������Ұɡ�");
            } else if (cm.getProfessions() >= 2) {
                cm.sendNext("�ţ�������Ѿ�ѧϰ��2��רҵ����������ѧϰ�Ļ����ͱ����ȷ���һ�ּ�����");
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendNext("���Ѿ�ѧЩ��#e�ɿ�#n���ѵ�����ѧ��");
            } else {
                cm.sendOk("��ϲ��ɹ���ѧϰ#e�ɿ�#n��");
                cm.teachSkill(92010000, 0x1000000, 0);
                if (cm.canHold(1512000, 1)) {
                    cm.gainItem(1512000, 1);
                }
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("�����Ȼ�û������������������֮�����������ҡ�");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendOk("��ѧϰ��װ�������������޷���ʼ���������ʼ���Ļ����͵��ȶ�װ����������Ʒ�������г�ʼ����");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
                cm.sendOk("��ѧϰ����Ʒ�����������޷���ʼ���������ʼ���Ļ����͵��ȶ�װ����������Ʒ�������г�ʼ����");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                status = 3;
                cm.sendYesNo("�������#e�ɿ�#n�����������֮ǰ���۵ĵȼ��������ȡ���������Ŭ���ͽ�Ǯ��������������Ӱ���������Ҫ��ʼ����");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4011010, 100)) {
                cm.sendOk("#b#t4011010#100��#k���Խ���#i2028067:##b#t2028067#1��#k������ȥ�Ѽ�һЩ#t4011010#��");
            } else if (!cm.canHold(2028067, 1)) {
                cm.sendOk("�����ռ䲻�㡣");
            } else {
                cm.sendOk("�һ��ɹ�.");
                cm.gainItem(2028067, 1);
                cm.gainItem(4011010, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("����������ء��õģ�������ϸ����һ�£�Ȼ���������ҡ�");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            cm.sendOk("�ɿ����Ѿ���ʼ�������������ѧϰ�����������ҡ�");
            cm.teachSkill(92010000, 0, 0);
            if (cm.isQuestActive(3197)) {
                cm.forfeitQuest(3197);
            }
            if (cm.isQuestActive(3198)) {
                cm.forfeitQuest(3198);
            }
        } else {
            cm.sendNext("û��ѧϰ#e�ɿ�#n��ʼ��ʧ�ܡ�");
        }
        cm.dispose();
    }
}