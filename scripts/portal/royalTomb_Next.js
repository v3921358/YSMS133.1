function enter(pi) {
    if (pi.getPlayer().getParty() != null && pi.getMap().getAllMonstersThreadsafe().size() == 0 && pi.isLeader() && pi.getPlayer().getMapId() != 745010500) {
        pi.warpParty(pi.getPlayer().getMapId() + 100);
        pi.playPortalSE();
    } else if(pi.getPlayer().getParty() != null && pi.getMap().getAllMonstersThreadsafe().size() == 0 && pi.isLeader() && pi.getPlayer().getMapId() == 745010500){
	pi.openNpc(9330231,1);
        pi.playPortalSE();
    } else {
        pi.playerMessage(5, "��ȷ�ϵ�ǰ��ͼ�Ƿ񻹴��ڹ��");
  }
}