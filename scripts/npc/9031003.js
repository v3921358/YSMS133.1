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
        var selStr = "����װ����������#b���|#k������������\r\n";
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            selStr += "#k#l\r\n#L2##b����#eװ������#n�ȼ���#l\r\n#L3#װ������������ʼ����#k#l";
        } else {
            selStr += "#L0##b��ȡ�й�#eװ������#n��˵����#l\r\n#L1#ѧϰ#eװ������#n������#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("װ���������òɿ������õĿ����ʯ���ھ޴����¯���ڻ����������Լ���Ҫ�ķ��߻������ļ�����ֻҪ��������ѧ����װ�������������Ϳ�����������ǰ��δ�����������ͷ��ߡ�");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("��ѽ��������񻹲���ǿ��������ѧЩרҵ������#b���ٱ���ﵽ30��2ת���ϣ��������3ת���ϣ���Ӱ˫������2ת+����#k������ѧϰרҵ�������ȴﵽ����֮���������Ұɡ�");
            } else if (cm.getProfessions() >= 2) {
                cm.sendNext("�ţ�������Ѿ�ѧϰ��2��רҵ����������ѧϰ�Ļ����ͱ����ȷ���һ�ּ�����");
            } else if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendNext("���Ѿ�ѧЩ��#eװ������#n���ѵ�����ѧ��");
            } else {
                if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                    cm.sendOk("��ϲ��ɹ���ѧЩ#eװ������#n��");
                    cm.teachSkill(92020000, 0x1000000, 0);
                } else {
                    cm.sendOk("ûѧϰ�ɿ���ˣ����޷�ѧϰװ�������ġ�û�в��ϵĻ����Ͳ����ܼ����ȥ�������ȵ��ԱߵĲɿ��ʦ#bŵ��#k����ȥѧϰ�ɿ�ɡ�");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("��ѽ�������̰�ġ������Ȼ�����������ȥ��ϰ��ϰ�ɡ�");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("�������װ�����������������֮ǰ���۵ĵȼ��������ȡ���������Ŭ���ͽ�Ǯ��������������Ӱ���������Ҫ��ʼ����");
        }
    } else if (status == 2) {
        cm.sendOk("����������ء��õģ�������ϸ����һ�£�Ȼ���������ҡ�");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            cm.sendOk("װ�������Ѿ���ʼ�������������ѧϰ�����������ҡ�");
            cm.teachSkill(92020000, 0, 0);
        } else {
            cm.sendNext("û��ѧϰ#eװ������#n��ʼ��ʧ�ܡ�");
        }
        cm.dispose();
    }
}