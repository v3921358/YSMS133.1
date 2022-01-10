var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getEventInstance().getProperty("leader").equals(cm.getPlayer().getName())) {
            if (cm.getEventInstance().getProperty("stage4clear") != null && cm.getEventInstance().getProperty("stage4clear").equals("true")) {
                cm.sendOk("���Ҿ������õĵȴ����������ҵ����˿������������ű��ˣ������ڿ��԰����ˣ�");
                cm.safeDispose();
            } else {
                var prev = cm.getEventInstance().setProperty("stage4clear", "true", true);
                if (prev == null) {
                    cm.sendNext("���Ҿ������õĵȴ����������ҵ����˿������������ű��ˣ������ڿ��԰����ˣ�����������Ϊ��򿪴��š�");
                } else { //if not null, was set before, and Gp already gained
                    cm.sendOk("���Ҿ������õĵȴ����������ҵ����˿������������ű��ˣ������ڿ��԰����ˣ�");
                    cm.safeDispose();
                }
            }
        } else {
            if (cm.getEventInstance().getProperty("stage4clear") != null && cm.getEventInstance().getProperty("stage4clear").equals("true")) {
                cm.sendOk("���Ҿ������õĵȴ����������ҵ����˿������������ű��ˣ������ڿ��԰����ˣ�");
            } else {
                cm.sendOk("������Ķӳ�����˵�����Ҳ����������˵������");
            }
            cm.safeDispose();
        }
    } else if (status == 1) {
        cm.gainGP(180);
        cm.getMap().getReactorByName("ghostgate").forceHitReactor(1);
        cm.showEffect(true, "quest/party/clear");
        cm.playSound(true, "Party1/Clear");
        cm.dispose();
    }
}