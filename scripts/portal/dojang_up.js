function enter(pi) {
    if (pi.getMap().getAllMonstersThreadsafe().size() > 0) {
        pi.playerMessage("����ʣ�µĹ���1��");
    } else {
        pi.dojo_getUp();
        pi.getMap().setReactorState();
    }
}