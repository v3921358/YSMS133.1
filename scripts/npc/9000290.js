
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";// ̫��Ч��
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������
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
		var selStr = "\t\t"+tz15+" #b������������̵�#k  "+tz15+"\r\n";
		selStr += "#r#L1#"+ttt6+" 11�����#l #L2#"+ttt6+" BOSS�ҵ�#l #L3#"+ttt6+" RED���̵�#l\r\n\r\n";
		selStr += "#r#L4#"+ttt6+" �����ҵ�#l #L5#"+ttt6+" ���յ±�#l #L6#"+ttt6+" �����˹��#l\r\n\r\n";
		selStr += "#r#L7#"+ttt6+" �˶����#l #L8#"+ttt6+" ����ҵ�#l #L9#"+ttt6+" ������˹��#l\r\n\r\n";
		selStr += "#r#L10#"+ttt6+" �ǹ����#l #L11#"+ttt6+" �ǹ��ҵ�#l #L12#"+ttt6+" ����������#l\r\n\r\n";
		selStr += "#r#L13#"+ttt6+" �����ҵ�#l #L14#"+ttt6+" �ȴ����#l #L15#"+ttt6+" �ȴ����#l\r\n\r\n";
		selStr += "\r\n    #bPS:��÷�ʽ: ���� BOSS �������,�г����߹һ���#k  \r\n";
		//selStr += "     #d#L4#"+ttt6+" ���ָ����Լ�BOSS��Ʒ�����ѯ#l\r\n\r\n";
		//selStr += "             #b#L0#"+ttt6+" ���������һҳ#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9330079);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9000290, 10);//11�����
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9310471);//BOSS�̵�
            break; 
        case 3:
            cm.dispose();
	    cm.openShop(20000);//RED
            //cm.openNpc(9900005, 44);
            break; 
	case 4:
            cm.dispose();
            cm.openNpc(9900003, 21);//�������̵�
            break; 
	case 5:
            cm.dispose();
            cm.openNpc(9900005, 2);//���յ±��̵�
            break; 
	case 6:
            cm.dispose();
	        cm.openShop(10001);//�����ҵ�
           // cm.openNpc(9330079, 303);
            break; 
	case 7:
            cm.dispose();
	        cm.openShop(22200);//�˶���
            //cm.openNpc(9330079, 304);
            break; 
	case 8:
            cm.dispose();
            cm.openNpc(9900004, 10);//������̵�
            break; 
	case 9:
            cm.dispose();
            cm.openNpc(9900005, 4);//��������˹��
            break; 
	case 10:
            cm.dispose();
            cm.openNpc(9330079, 26);//�������̵�
            break; 
	case 11:
            cm.dispose();
            cm.openNpc(9330079, 202);//�ǹ��ҵ�
            break; 
	
	case 12:
            cm.dispose();
			//cm.sendOk("��ʱδ���š�")
            cm.openNpc(9000069);//����������
            break; 
    case 13:
            cm.dispose();
            cm.openNpc(9310144, 1);//�����ҵ�
            break; 
	case 14:
            cm.dispose();
			cm.sendOk("��ʱδ���š�")
           // cm.openNpc(9330079, 202);//�ǹ��ҵ�
            break;

	case 15:
            cm.dispose();
			cm.sendOk("��ʱδ���š�")
           // cm.openNpc(9330079, 202);//�ǹ��ҵ�
            break; 









}
    }
}
