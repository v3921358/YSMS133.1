var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
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
            cm.sendSimple("#e#g---------------#r" + icon1 + "С��Ϸ�" + icon1 + "#k#g----------------#k\r\n\r\n#b������ð�յ�С��Ϸ����ģ���ѡ������Ҫ�ģ�#k\r\n#r#L7#" + icon1 + "�����С��Ϸ#l\t#r#L8#" + icon1 + "����С��Ϸ#l\r\n\r\n#b#L1#" + icon1 + "���С��Ϸ#l\t#b#L5#" + icon1 + "��ȭ�С��Ϸ#l\r\n\r\n#b#L6#" + icon1 + "�����С��Ϸ#l\t#b#L2#" + icon1 + "�ǹ��С��Ϸ#l\r\n\r\n#b#L3#" + icon1 + "��һС��Ϸ#l\r\n\r\n\r\n#e#g---------------#r" + icon1 + "С��Ϸ�" + icon1 + "#k#g----------------#k\r\n\r\n");//#b#L4#ʹ���ֽ��Ĳ�#l \\#b#L3#ʹ��ð�ձҶĲ���\r\n#b#L2#ʹ����Ϊ�Ĳ���#l \r\n\r\n#b#L2#ʹ���ǹ��Ĳ�#l \r\n
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
	    } else if (selection == 5) {
		cm.dispose();
                cm.openNpc(1012008,5);
	    } else if (selection == 6) {
		cm.dispose();
                cm.openNpc(1012008,6);
	    } else if (selection == 7) {
		cm.dispose();
                cm.openNpc(9000277);
	    } else if (selection == 8) {
		cm.dispose();
                cm.openNpc(9330122);
            }
        }
    }
}
