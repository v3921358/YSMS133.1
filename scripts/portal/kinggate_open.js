function enter(pi) {
    if (pi.getMap().getReactorByName("kinggate").getState() == 1) {
        pi.warp(990000900, 1);
	pi.openNpc(9040000,3);//赠送个人积分
        if (pi.getEventInstance().getProperty("boss") != null && pi.getEventInstance().getProperty("boss").equals("true")) {
            pi.changeMusic("Bgm10/Eregos");
        }
        return true;
    } else {
        pi.playerMessage("请献上你的祭品!现在无法进入.");
        return false;
    }
}