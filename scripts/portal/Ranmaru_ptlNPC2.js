function enter(pi) {
    if (pi.getMap().getId() == 807300210) {
        pi.warpParty(910000000, 0);
    } else if (pi.getMap().getAllMonstersThreadsafe().size() == 0) {
        pi.warpParty(pi.getMapId() + 10, 0);
    } else {
        pi.playerMessage(-1, "�������������ڵ����й�������ƶ�����һ�ء�");
        pi.playerMessage(5, "�������������ڵ����й�������ƶ�����һ�ء�");
    }
}