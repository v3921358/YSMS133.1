function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "δѧϰװ���������޷�ʹ�á�");
    }
    cm.dispose();
}