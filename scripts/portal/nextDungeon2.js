function enter(pi) {
    if (pi.getMap().getAllMonstersThreadsafe().size() == 0) {
        pi.warpParty(pi.getMapId() + 1000, 0);
    } else {
        pi.playerMessage(-1, "�������������ڵ����й�������ƶ�����һ�غϡ�");
        pi.playerMessage(5, "�������������ڵ����й�������ƶ�����һ�غϡ�");
    }
}