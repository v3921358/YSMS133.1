function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "δѧϰ���������޷�ʹ�á�");
    }
    cm.dispose();
}