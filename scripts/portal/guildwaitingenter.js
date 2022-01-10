function enter(pi) {
    if (pi.getEventInstance() == null) {
        pi.warp(101030104);
    } else {
        if (pi.getEventInstance().getProperty("canEnter") != null && pi.getEventInstance().getProperty("canEnter").equals("true")) {
            pi.warp(990000100);
        } else { 
            pi.playerMessage("现在还不能进入。");
            return false;
        }
    }
    return true;
}