function enter(pi) {
    if (pi.getMap().getReactorByName("kinggate").getState() == 1) {
        pi.warp(990000900, 1);
	pi.openNpc(9040000,3);//���͸��˻���
        if (pi.getEventInstance().getProperty("boss") != null && pi.getEventInstance().getProperty("boss").equals("true")) {
            pi.changeMusic("Bgm10/Eregos");
        }
        return true;
    } else {
        pi.playerMessage("��������ļ�Ʒ!�����޷�����.");
        return false;
    }
}