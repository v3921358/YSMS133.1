function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "δѧϰ�ɿ��޷�ʹ�á�");
    }
    cm.dispose();
}