function start() {
    if (im.haveItem(2432005, 1) == true) {
        im.gainItem(4310088, 5);
        im.gainItem(2432005, -1);
        im.playerMessage(-1, "��ϲ�����5��RED��");
        im.worldSpouseMessage(0x20, "������Ӳ���䡻 : ��ϲ " + im.getPlayer().getName() + " �� <����Ӳ������> ��� 5 ��RED�ҡ�");
	im.dispose();
    } else {
        im.sendOk("����");
	im.dispose();
    }
}