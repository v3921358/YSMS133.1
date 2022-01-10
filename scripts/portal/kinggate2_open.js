function enter(pi) {
    if (pi.getMap().getReactorByName("kinggate").getState() == 1) {
        pi.warp(990000900, 2);
        if (pi.getEventInstance().getProperty("boss") != null && pi.getEventInstance().getProperty("boss").equals("true")) {
            pi.changeMusic("Bgm10/Eregos");
        }
	pi.openNpc(9040000,3);//赠送个人积分
        return true;
    } else {
        pi.playerMessage("现在不能进入!");
        return false;
    }
}