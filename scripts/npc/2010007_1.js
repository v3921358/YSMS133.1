/* ������ - �������� */

var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") > 0) {
            cm.sendSimple("��ʲô���԰������\r\n#b#L0#�������Ӽ�������#l\r\n#L1#�����ɢ����#l");
        } else {
            cm.dispose();
            cm.openNpc(2010007);
        }
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("�㲻���峤������㽫�������Ӽ����Ա����������.");
                cm.dispose();
            } else {
                cm.sendYesNo("�����Ա����ÿ����#b5��#k����Ҫ����������#b5000����#k����ô�����������Ӽ���������");
            }
        } else if (selection == 1) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("�㲻���峤������㲻�ܽ�ɢ�ü���.");
                cm.dispose();
            } else {
                cm.sendYesNo("�����Ҫ��ɢ�����𣿰�ѽ������ѽ������ɢ֮����ļ���ͻᱻ����ɾ�����ܶ������ȨҲ��һ����ʧ�������Ҫ��ɢ��");
            }
        }
    } else if (status == 2) {
        if (sel == 0 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.increaseGuildCapacity(false);
            cm.dispose();
        } else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.disbandGuild();
            cm.dispose();
        }
    }
}