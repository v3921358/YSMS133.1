/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */
function start() {
    //cm.askAcceptDecline("�����������֮��,�Ҿ����ٻ���ħ��ʦ!\r\n�ȵ�!�����������!Ϊʲô�ٻ����˺�ħ��ʦ?�Ҹо�������ħ��ʦ��ȫ��ͬ�ġ���������!!!!!!!\r\n\r\n #b(���������ʹ��������ȥ.)");
    cm.sendYesNo("�����������֮��,�Ҿ����ٻ���ħ��ʦ!\r\n�ȵ�!�����������!Ϊʲô�ٻ����˺�ħ��ʦ?�Ҹо�������ħ��ʦ��ȫ��ͬ�ġ���������!!!!!!!\r\n\r\n #b(���������ʹ��������ȥ.)");
}

function action(mode, type, selection) {
	//java.lang.System.out.println("dbug");
    if (mode == 1) {
        cm.removeNpc(cm.getMapId(), 2141000);
        if (cm.getMapId() == 270050100) {
            cm.forceStartReactor(cm.getMapId(), 2709000);
        } else if (cm.getMapId() == 270051100) {
            cm.killAllMob();
            cm.spawnMonster(8820108, 8, -43);
            if (!cm.getPlayer().isGM()) {
                cm.getMap().startSpeedRun();
            }
        }
    }
    cm.dispose();
}