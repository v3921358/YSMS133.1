function enter(pi) {
    //pi.openNpc(2081005);
    if (pi.haveItem(5220006)) {
        pi.gainItem(5220006, -1);
        pi.warp(240050400);
    } else {
        pi.warp(240040700,0)
        pi.mapMessage(5, "��û�к����볡�����������ȥ!�뵽�̳ǹ���!");
    }
}