function enter(pi) {
    if (pi.haveItem(4001260,7) && pi.getPlayer().getParty() != null && pi.getMap().getAllMonstersThreadsafe().size() == 0) {
        pi.warpParty(925100100, 0);
    } else {
        pi.playerMessage(5, "���ռ��Ϻ������ӵ�Կ��7�����������й���,�����޷�ͨ��!");
    }
}