/* �������� */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendOk("���ѵ�������ÿ���˶��з����Ը����");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��ã�ð�ռҡ���������ϵ�㣬��������������㡣");
    } else if (status == 1) {
        qm.sendNextPrev("����������������ʡ�����������з��С���Ҫ���������Ϸɣ��Ǹ��ж�ã�");
    } else if (status == 2) {
        qm.sendYesNo("ΪʲôͻȻ˵��Щ���Ǻǣ�����п��������Ϸɵķ����������Ȥ��");
    } else if (status == 3) {
        qm.sendNext("�����Ϸɷǳ��򵥡�ֻҪ��#b�ɻ�#k��˭�����������Ϸɡ����������ҵ��ɻ�����˵�ӷ���Աλ��������������#b�ٰ̹±�#k�ڳ���ɻ���");
    } else if (status == 4) {
        qm.sendNextPrev("��#b��������ʥ�ء����¶�˹̹����߳ǡ����ﰲ�ء����ꡢ��ľ��#k�����������Լ����ٰ̹±���ȥ�������ɡ�");
        qm.forceCompleteQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}