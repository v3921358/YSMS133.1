function enter(pi) {
    if (pi.getMap().getReactorByName("statuegate").getState() == 1 || (pi.getPlayer().getEventInstance() != null && pi.getPlayer().getEventInstance().getProperty("stage1clear") != null && pi.getPlayer().getEventInstance().getProperty("stage1clear").equals("true"))) {
        pi.warp(990000301,0);
	pi.openNpc(9040000,3);//���͸��˻���
        return true;
    } else {
        pi.playerMessage("������ǹرյģ�����ͨ���������ս��");
        return false;
    }
}