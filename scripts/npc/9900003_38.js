
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����

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
            cm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            cm.dispose();
        } 
    else if (status == 0) {
		var time = cm.getPlayer().getTodayOnlineTime();
		RMB = cm.getRMB();
		var selStr = "#d����������ʱ��Ϊ�� #r" + time + "#k #d����  �ۼƳ�ֵ�� #r" + RMB + "#b Ԫ#k\r\n";
		selStr += "#b�������Ϊ�� #r"+ cm.getHyPay(1) +"#b Ԫ  #bĿǰ��� #r" + cm.getPlayer().getCSPoints(1) + "#k #b��\r\n";
		selStr += "#bĿǰ#z4001485#Ϊ:#r " + cm.getItemQuantity(4001485) + " #k#b�� \r\n\r\n";
		selStr += "#r#L3#"+ttt6+" ����н�->> #z4000463##l\r\n\r\n";
		selStr += "#r#L2#"+ttt6+" �ֽ��н�->> #z4001485##l\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 5);
            break; 
	case 2:
            cm.dispose();
            cm.openNpc(1540419, 91);
            break;
	case 3:
            cm.dispose();
            cm.openNpc(1540419, 89);
            break;









}
    }
}
