function enter(pi) {
    if (pi.getMap().getAllMonstersThreadsafe().size() == 0) {
	pi.openNpc(9330192);
    } else {
        pi.playerMessage(5, "��ȷ�ϵ�ǰ��ͼ�Ƿ񻹴��ڹ��");
    }
}