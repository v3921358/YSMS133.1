function enter(pi) {
    var eim = pi.getEventManager("LudiPQ").getInstance("LudiPQ");
    if (eim.getProperty("stage1status") == null) { // do nothing; send message to player
        pi.playerMessage(5, "���ڻ����ܽ��롣");
    } else {
        pi.warp(pi.getMapId() + 300, "st00");
    }
}