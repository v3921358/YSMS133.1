
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
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
		//var selStr = "\t\t\t\t#e#d ÿ�ո���#n#l#k\r\n\r\n";
		//var selStr = "#e#d\t\tÿ�ո���#k\r\n";
		//selStr +="\r\n#e#b" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "��ʾ����ֵ����1��1����==3000���" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "\r\n";
		//selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n\r\n";

		//selStr += "#r#L9#"+tz1+" ��ֵ����#l #L1#"+tz1+" ���߽���#l #L2#"+tz1+" ���콱��#l\r\n";

	    var selStr = "#b#L21#"+tz1+" ÿ�����ߵ���#l          #L20#"+tz1+" ÿ�����ߵ��#l\r\n\r\n";
		selStr += "#b#L1#"+tz1+" ��ȡ���߽���#l          #L10#"+tz1+" ��ȡ�ȼ�����#l\r\n\r\n";
		selStr += "#b#L3#"+tz1+" �Ұ�ÿ��ǩ��#l          #L2#"+tz1+" ���������½#l\r\n\r\n";
		//selStr += "#b#L12#"+tz1+" �Ұ�������ȡ���� #r����ͣʹ�á�#l\r\n\r\n";

		//selStr += "#r#L7#"+tz1+" ÿ������#l #L8#"+tz1+" �²�����#l #L6#"+tz1+" 20������#l#L5#"+tz1+" ��������#l\r\n";
		//selStr += "#r#L10#"+tz1+" �ȼ�����#l #L11#"+tz1+" ��ѵ���#l #L12#"+tz1+" ÿ���½#l#L6#"+tz1+" 20������#l\r\n";
		//selStr += "#r#L13#"+tz1+" ת����͸#l #L14#"+tz1+" ��������#l #L15#"+tz1+" ���챦��#l\r\n\r\n";
		//selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n\r\n";

		selStr += "\t\t\t#e#r#L0#���ز˵�#l\r\n\t";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1012124, 1012124);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(9900003, 608);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9310144, 18);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(1012124, 7);
            break; 
        case 4:
            cm.dispose();
            cm.openNpc(9310472);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900003, 110);
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9900003, 103);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900003, 104);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(1012124, 87);
            break;
		case 11://���ߵ��þ�
            cm.dispose();
            cm.openNpc(1012124, 111);
            break;
		case 12://28���¼����
            cm.dispose();
            cm.openNpc(1012124, 93);
            break;
        case 13:
            cm.dispose();
            cm.openNpc(9310058, 102);
            break;

        case 14:
            cm.dispose();
            cm.openNpc(9310058, 101);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9310058, 103);
            break;
        case 20://���ߵ��
            cm.dispose();
            cm.openNpc(1012124, 112);
            break;
	case 21://���ߵ��þ�
            cm.dispose();
            cm.openNpc(1012124, 111);
            break;









}
    }
}