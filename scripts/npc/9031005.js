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
        var selStr = "��á��������������Ȥ��\r\n";
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            selStr += "#k#l\r\n#L2##b����#e������#n�ȼ���#l\r\n#L3#������������ʼ����#k#l";
        } else {
            selStr += "#L0##b��ȡ�й�#e������#n��˵����#l\r\n#L1#ѧϰ#e������#n��#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("���������ò�ҩ�ľ�����������ҩˮ�ļ��������˻ָ�HP��MP��ҩˮ֮�⣬�������������������ǿ��ҩˮ���������������û�������������ҩˮ��");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("#b���ٱ���ﵽ30��2ת���ϣ��������3ת���ϣ���Ӱ˫������2ת+����#k������ѧϰרҵ���������ܴﵽ����֮������������");
            } else if (cm.getProfessions() >= 2) {
                cm.sendNext("�ţ�������Ѿ�ѧϰ��2��רҵ����������ѧϰ�Ļ����ͱ����ȷ���һ�ּ�����");
            } else if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendNext("���Ѿ�ѧЩ��#e������#n���ѵ�����ѧ��");
            } else {
                if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                    cm.sendOk("��ϲ��ɹ���ѧЩ#e������#n��");
                    cm.teachSkill(92040000, 0x1000000, 0);
                } else {
                    cm.sendOk("������������ѧϰ��ҩ�����ұ��ߣ����Կ����ڴ��������������ҩ�Ĳ�ҩ��ʦ#b˹����#k�����������ѧϰ��ҩ��");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("��ѽ�������̰�ġ������Ȼ�����������ȥ��ϰ��ϰ�ɡ�");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("������������������������֮ǰ���۵ĵȼ��������ȡ���������Ŭ���ͽ�Ǯ��������������Ӱ���������Ҫ��ʼ����");
        }
    } else if (status == 2) {
        cm.sendOk("����������ء��õģ�������ϸ����һ�£�Ȼ���������ҡ�");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            cm.sendOk("�������Ѿ���ʼ�������������ѧϰ�����������ҡ�");
            cm.teachSkill(92040000, 0, 0);
        } else {
            cm.sendNext("û��ѧϰ#e������#n��ʼ��ʧ�ܡ�");
        }
        cm.dispose();
    }
}