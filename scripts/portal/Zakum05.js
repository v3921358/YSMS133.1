/*
    Zakum Entrance
*/

function enter(pi) {
    //if (pi.getQuestStatus(100200) == 2) {
       // pi.playerMessage(5, "û����������ܽ�ȥ��");
       // return false;

    //} else 
    if (!pi.haveItem(4001017)) {
        pi.playerMessage(5, "û�л�����۲��ܽ�ȥ��");
        return false;
    }
    pi.playPortalSE();
    pi.warp(pi.getPlayer().getMapId() + 100, "west00");
    return true;
}