var GQItems = Array(1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);

function start() {
    if (cm.getPlayer().hasEquipped(1032033)) {
        cm.sendOk("�������ػ����������������ԡ�");
    } else {
        for (var i = 0; i < GQItems.length; i++) {
            cm.removeAll(GQItems[i]);
        }
        cm.warp(102040200, 0);
    }
    cm.dispose();
}