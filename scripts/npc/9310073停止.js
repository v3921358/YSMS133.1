
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
		var selStr = "\t\t\t\t#e#d " + tz1+ "���������ʲô��" + tz1+ " #n#l#k\r\n\r\n";
		//selStr +="\r\n#e#b" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "��ʾ����ֵ����1��1����==3000���" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "\r\n";
		selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n";

		selStr += "#b#L7#"+tz1+" ÿ�ձ������� #r�������ḻ��#l \r\n";
		selStr += "#b#L8#"+tz1+" ���и������� #r�������ḻ��#l \r\n";
		selStr += "#b#L9#"+tz1+" �˷�������� #r�������ḻ��#l \r\n";
		selStr += "#b#L10#"+tz1+" ��ս����BOSS #r�������ḻ��#l \r\n";
		//selStr += "#b#L11#"+tz1+" ��������С��Ϸ #r�������ḻ��#l \r\n";
		//selStr += "#b#L6#"+tz1+" ���һ�԰��ֲ     #r�������ḻ��#l \r\n";

		//selStr += "#b#L1#"+tz1+" ��ȭ==��ս�� #r����Ҷ�սӮ������#l \r\n";
		//selStr += "#b#L2#"+tz1+" ��ȭ==���˰� #r������ң����#l \r\n";
		//selStr += "#b#L3#"+tz1+" ����==С��Ϸ #r��ħ����#l \r\n";		
		//selStr += "#b#L4#"+tz1+" ������ս     #r�����ߣ���ҡ�#l \r\n";
		//selStr += "#b#L5#"+tz1+" ������ǽ     #r�����ߣ���ҡ�#l \r\n";



		//selStr += "#r#L4#"+tz1+" ��ȭ��Ϸ#l #L5#"+tz1+" ��һ���#l #L3#"+tz1+" ÿ��ǩ��#l\r\n";

		//selStr += "#r#L7#"+tz1+" ÿ������#l #L8#"+tz1+" �²�����#l #L6#"+tz1+" 20������#l\r\n";

		//selStr += "#r#L10#"+tz1+" �ȼ�����#l #L11#"+tz1+" ��ѵ���#l #L12#"+tz1+" ÿ���½#l\r\n";

		//selStr += "#r#L13#"+tz1+" ת����͸#l #L14#"+tz1+" ���ֳ齱#l #L15#"+tz1+" ���챦��#l\r\n\r\n";

		selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n";

		//selStr += "#b#L0#" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "���������һҳ" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "#l\r\n\t";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419);
            break; 
        case 1://��ȭ��ս
            cm.dispose();
            cm.openNpc(1540202);
            break;  
        case 2://��ȭ����
            cm.dispose();
            cm.openNpc(9900004, 300);
            break; 
        case 3://ħ������
            cm.dispose();
            cm.openNpc(9900003, 111);
            break; 
        case 4://������ս
            cm.dispose();
			cm.warp(301050300,0);
            //cm.openNpc(9310472);
            break;
        case 5://������ǽ
            cm.dispose();
			cm.warp(301050200,0);
            //cm.openNpc(9900003, 31);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9330065);
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9310073, 2);
           // cm.openNpc(9900003, 110);
            break;
        case 8://����
            cm.dispose();
            cm.openNpc(1540419, 301);
            break;
        case 9://�������
            cm.dispose();
            cm.openNpc(9900004, 29);
            break;
        case 10://����BOSS
            cm.dispose();
            cm.openNpc(9900004, 21);
            break;
		case 11://��������С��Ϸ
            cm.dispose();
            cm.openNpc(9310073, 1);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(1540419, 93);
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

		}
    }
}
