var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//����

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r����װ�����#k#n\r\n";
		selStr += "#d��ѡ������Ҫ��װ����(PS:����ѡ��)#k\r\n";
		selStr += "#r#L0#"+z+" ѡ��սʿ��װ��#l      #L1#"+z+" ѡ��ʦ��װ��#l\r\n";
		selStr += "#r#L2#"+z+" ѡ������װ��#l      #L3#"+z+" ѡ�������װ��#l\r\n";
		selStr += "#r#L4#"+z+" ѡ�񺣵���װ��#l      #L5#"+z+" ѡ����/��Ӱװ��#l\r\n";
		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //սʿ
		im.gainItem(2431676, -1);
		im.gainItem(1002776,1);
		im.gainItem(1102172,1);
		im.gainItem(1082234,1);
		im.gainItem(1052155,1);
		im.gainItem(1072355,1);
		im.sendOk("��ϲ����ȡսʿ120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        case 1:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //��ʦ
		im.gainItem(2431676, -1);
		im.gainItem(1002777,1);
		im.gainItem(1102172,1);
		im.gainItem(1082235,1);
		im.gainItem(1052156,1);
		im.gainItem(1072356,1);
		im.sendOk("��ϲ����ȡ��ʦ120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        case 2:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //����
		im.gainItem(2431676, -1);
		im.gainItem(1002778,1);
		im.gainItem(1102172,1);
		im.gainItem(1082236,1);
		im.gainItem(1052157,1);
		im.gainItem(1072357,1);
		im.sendOk("��ϲ����ȡ����120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        case 3:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //����
		im.gainItem(2431676, -1);
		im.gainItem(1002779,1);
		im.gainItem(1102172,1);
		im.gainItem(1082237,1);
		im.gainItem(1052158,1);
		im.gainItem(1072358,1);
		im.sendOk("��ϲ����ȡ����120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        case 4:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //����
		im.gainItem(2431676, -1);
		im.gainItem(1002780,1);
		im.gainItem(1102172,1);
		im.gainItem(1082238,1);
		im.gainItem(1052159,1);
		im.gainItem(1072359,1);
		im.sendOk("��ϲ����ȡ����120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        case 5:
           if (im.getLevel() >= 120 && im.getPlayerPoints() > 100) { //����
		im.gainItem(2431676, -1);
		im.gainItem(1002779,1);
		im.gainItem(1102172,1);
		im.gainItem(1082237,1);
		im.gainItem(1052158,1);
		im.gainItem(1072358,1);
		im.sendOk("��ϲ����ȡ����120����װ��.");
		im.worldSpouseMessage(0x20,"���ɳ������ ����� "+ im.getChar().getName() +" �ڳɳ��������ȡװ����");
		im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����120��.�޷���ȡ.\r\n2). ����ǰ���߻��ֲ���100�㡣��ȥ�г��һ�");
				im.dispose();
            }
            break;
        }
    }
}
