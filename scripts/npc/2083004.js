function start() {
    if (cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 5 ) {
        cm.dispose();
        cm.openNpc(2083004, 2);
    } else if (cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 4 ) {
        cm.dispose();
        cm.openNpc(2083004, 1);
    } else {
        cm.sendOk("3��5Ƶ��Ϊ���׺�����,��Ҫ170���ſ�����ս\r\n2��4Ƶ��Ϊ��ͨ������,��Ҫ150���ſ�����ս.");
        cm.dispose();
    }
}