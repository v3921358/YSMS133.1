
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt6 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//������Ա
var z = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//����
var tt ="#fEffect/ItemEff/1112811/0/0#";//����
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk(head + "���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            cm.dispose();
        } 
    else if (status == 0) {
        var selStr = head + "- #d#eâ���߼��̳�ϵͳ#n#k��\r\n\r\n";
	selStr += "#d����ǰӵ�п��õ��Ϊ�� #r " + cm.getPlayer().getCSPoints(1) + " #k#d��\r\n����ǰӵ�е��þ�Ϊ��  #r"+cm.getPlayerPoints()+"#k #d��#k\r\n\r\n";
	//selStr += "#b#L0#"+ttt6+" �������ù��ȱ�[���������� 1��10]#l\r\n\r\n";
	selStr += "#L1#"+ttt6+" â���߼��̳� [Ĭ�����ĵ��þ������þ�����ʱ�Զ����ĵ��]#l\r\n\r\n";
	//selStr += "#L2#"+ttt6+" ����վ���г�ֵ[������ֵר��]#l\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 10);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 11);
            break;
        case 2:
            cm.dispose();
            //cm.openWeb("http://www.libaopay.com/buy/?wid=40792");
            break;
        













}
    }
}