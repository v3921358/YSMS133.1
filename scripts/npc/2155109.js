var status = -1;
var renwu = "";
var wanjia = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            cm.sendSimple("������ð�յ��Ĳ����ģ���ѡ������Ҫ�ģ�\r\n#b#L1#ʹ�õ���Ĳ���#l \r\n ");//#b#L4#ʹ���ֽ��Ĳ�#l \\#b#L3#ʹ��ð�ձҶĲ���\r\n#b#L2#ʹ����Ϊ�Ĳ���#l \r\n\r\n#b#L2#ʹ���ǹ��Ĳ�#l \r\n
        } else if (status == 1) {
            if (selection == 1) {
		cm.dispose();
                cm.openNpc(1012008,1);
            } else if (selection == 2) {
                cm.dispose();
            	cm.openNpc(1012008,2);
            } else if (selection == 3) {
		cm.dispose();
                cm.openNpc(1012008,3);
            } else if (selection == 4) {
		cm.dispose();
                cm.openNpc(1012008,4);
            }
        }
    }
}