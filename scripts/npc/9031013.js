function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "δѧϰ��Ʒ�������޷�ʹ�á�");
    }
    cm.dispose();
}