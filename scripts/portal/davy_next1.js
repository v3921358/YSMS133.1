function enter(pi) {
    if (pi.haveItem(4001120,20) && pi.haveItem(4001121,20) && pi.haveItem(4001122,20) && pi.isLeader()) {
        pi.warpParty(925100400, 0);
    } else {
        pi.playerMessage(5, "���ռ��������м����߼���������ݸ�20��,�����޷�ͨ��!");
    }
}