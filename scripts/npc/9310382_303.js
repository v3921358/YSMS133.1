
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
		var selStr = "����Ĺ��ܶ��������̵ꡣ\r\n\r\n";
		selStr += "#L8#"+ttt6+" #e�н���#n  [�ֽ�һ�Ԫ��]#l #L11# [����һ������]\r\n";
		selStr += "#d#L1#"+ttt6+" #e��  ��#n  [ϡ�о����װ]#l #L9# [����ϡ�о���]#l\r\n";
		selStr += "#d#L7#"+ttt6+" #e��  ��#n  [����ħ������]#l #L10# [��������װ]#l\r\n";
		selStr += "#r#L2#"+ttt6+" #e�ֽ��#n  [����߼�װ��]#l #L12# [������߲���]\r\n";
		selStr += "#b#L3#"+ttt6+" #e���þ�#n  [�������ľ���]#l #L4# [����߼�װ��]#l\r\n";
		//selStr += "#b#L4#"+ttt6+" #e���þ�#n  [����߼�װ��]#l\r\n";
		selStr += "#r#L5#"+ttt6+" #e��  ��#n  [����ҵ��þ�]#l #L6# [��Ҷһ��ɵ��]#l\r\n\r\n";
		//selStr += "#r#L6#"+ttt6+" �һ�  [��Ҷһ��ɵ��]#l\r\n\r\n";
		selStr += "             #b#L0#"+ttt6+" ���������һҳ#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310362);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9900002, 6);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9201357, 2);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 19);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 18);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 7:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 38);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9900003, 11);
            break;
        case 10:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9201357);
            break;









}
    }
}