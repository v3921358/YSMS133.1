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
        var selStr = "��ã����԰���ʲô��\r\n";
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            selStr += "#L2##b����#e��ҩ#n�ȼ���#l\r\n#L3#��ҩ��ʼ����#k#l\r\n#L4##b����#t2028066#��#k#l";
        } else {
            selStr += "#L0##b��ȡ�й�#e��ҩ#n��˵����#l\r\n#L1#ѧϰ#e��ҩ#n��#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("��ҩ�����ò���֮��Ĺ��ߣ��ɼ���ͼ�ϵ�ҩ�ݵļ��ܡ��Ѳɼ�����ҩ��װ��#p9031007#���۵���ƿ�����������Ի��װ������Ʒ������������Ĳ��ϡ�");
        } else if (sel == 1) {
            if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendOk("���Ѿ�ѧ��ɿ������ҽ��������ѧϰ#bװ������#k����#b��Ʒ����#k���������ô����");
                cm.dispose();
                return;
            }
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("��ѽ������񻹲���ǿ��������ѧϰרҵ������#b���ٱ���ﵽ30��2ת���ϣ��������3ת���ϣ���Ӱ˫������2ת+����#k������ѧϰרҵ�������������Ŭ�����ȴﵽ����֮���������ҡ�");
            } else if (cm.getProfessions() >= 2) {
                cm.sendNext("�ţ�������Ѿ�ѧϰ��2��רҵ����������ѧϰ�Ļ����ͱ����ȷ���һ�ּ�����");
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendNext("���Ѿ�ѧЩ��#e��ҩ#n���ѵ�����ѧ��");
            } else {
                cm.sendOk("��ϲ��ɹ���ѧϰ#e��ҩ#n��");
                cm.teachSkill(92000000, 0x1000000, 0);
                if (cm.canHold(1502000, 1)) {
                    cm.gainItem(1502000, 1);
                }
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("�����Ȼ�û������������������֮�����������ҡ�");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendOk("��ѧϰ���������������޷���ʼ���������ʼ���Ļ����͵��ȶ����������г�ʼ����");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                status = 3;
                cm.sendYesNo("�������#e��ҩ#n�����������֮ǰ���۵ĵȼ��������ȡ���������Ŭ���ͽ�Ǯ��������������Ӱ���������Ҫ��ʼ����");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4022023, 100)) {
                cm.sendOk("#b#t4022023#100��#k���Խ���#i2028066:##b#t2028066#1��#k��������ȥ�Ѽ�һЩ#t4022023#��");
            } else if (!cm.canHold(2028066, 1)) {
                cm.sendOk("�����ռ䲻�㡣");
            } else {
                cm.sendOk("�һ��ɹ�.");
                cm.gainItem(2028066, 1);
                cm.gainItem(4022023, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("����������ء��õģ�������ϸ����һ�£�Ȼ���������ҡ�");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            cm.sendOk("��ҩ�����Ѿ���ʼ�������������ѧϰ�����������ҡ�");
            cm.teachSkill(92000000, 0, 0);
            if (cm.isQuestActive(3195)) {
                cm.forfeitQuest(3195);
            }
            if (cm.isQuestActive(3196)) {
                cm.forfeitQuest(3196);
            }
        } else {
            cm.sendNext("û��ѧϰ#e��ҩ#n��ʼ��ʧ�ܡ�");
        }
        cm.dispose();
    }
}