function start() {
    if (cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 5 ) {
        cm.dispose();
        cm.openNpc(2083004, 2);
    } else if (cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 4 ) {
        cm.dispose();
        cm.openNpc(2083004, 1);
    } else {
        cm.sendOk("3和5频道为进阶黑龙王,需要170级才可以挑战\r\n2和4频道为普通黑龙王,需要150级才可以挑战.");
        cm.dispose();
    }
}