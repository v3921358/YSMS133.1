var status = 0;
var selStr;
var sel;
var selitem;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        selStr = "��,��ô��?�㲻�����������ֲ�..#b\r\n";
        selStr += "#L1#����,��,����ϲ�����κ���?#l\r\n";
        selStr += "#L2#�Ҷ����е㶯��.#l\r\n";
        selStr += "#L3#���ǳ�ȥ!�㶮��#l\r\n";
        selStr += "#L4#�ҵ�����ֻ����û����#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 1) {
            cm.sendOk("�����?..");
        }
        if (sel == 2) {
            cm.sendOk("�ޣ��Ҳ�������");
        }
        if (sel == 3) {
            cm.sendOk("������û�нڲ�һ����?");
        }
        if (sel == 4) {
            cm.removeNpc(9330183);
            cm.spawnNpc(9330192, 198, 157);
            cm.getPlayer().getMap().startSimpleMapEffect("�ðɡ���Ӯ�ˡ��������ʦ��������ǵ�����ˮƽ", 5120067);
        }
        cm.dispose();
    }
}