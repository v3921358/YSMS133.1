
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
		var selStr = "���ﶼ�ǳ��ù���Ӵ��\r\n\r\n";		
		//selStr += "#r#L7#"+ttt6+" ��սBOSS#l #L8#"+ttt6+" ��ս����#l #L6#"+ttt6+" �н�����#l\r\n\r\n";
		selStr += "#r#L13#"+ttt6+" ��������#l #L14#"+ttt6+" ÿ��Ѱ��#l #L15#"+ttt6+" ħ������#l\r\n";
		selStr += "#r#L9#"+ttt6+" �����Ӷ#l #L1#"+ttt6+" ��Ծ��ѯ#l #L2#"+ttt6+" ��Ʒɾ��#l\r\n";
		selStr += "#r#L4#"+ttt6+" ѧϰ����#l #L5#"+ttt6+" ת����͸#l #L3#"+ttt6+" ���й���#l\r\n";
		selStr += "#r#L10#"+ttt6+" �����װ#l #L11#"+ttt6+" ˫������#l #L12#"+ttt6+" ��������#l\r\n";
		selStr += "#r#L16#"+ttt6+" ���ø���#l #L17#"+ttt6+" ���Ǯׯ#l #L6#"+ttt6+" �н�����#l\r\n\r\n";
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
            cm.openNpc(9900003, 23);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 508);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 14);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 22);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 502);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 38);
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9900003, 13);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9030000);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900002, 6);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9900002, 11);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9900002, 4);
            break;
        case 13:
            cm.dispose();
            cm.warp(100000104, 0);
            break;
        case 14:
            cm.dispose();
            cm.openNpc(9900003, 27);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
        case 16:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9900003, 17);
            break;








}
    }
}
