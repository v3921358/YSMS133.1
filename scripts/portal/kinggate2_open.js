function enter(pi) {
    if (pi.getMap().getReactorByName("kinggate").getState() == 1) {
        pi.warp(990000900, 2);
        if (pi.getEventInstance().getProperty("boss") != null && pi.getEventInstance().getProperty("boss").equals("true")) {
            pi.changeMusic("Bgm10/Eregos");
        }
	pi.openNpc(9040000,3);//���͸��˻���
        return true;
    } else {
        pi.playerMessage("���ڲ��ܽ���!");
        return false;
    }
}