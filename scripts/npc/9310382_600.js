
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////��ɳ©
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////��ָ��
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////����ָ��
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////����ָ��
var yun4 = "#fUI/UIWindow/Quest/reward#";////����
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //�ʺ��
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //�ʹ�1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //����
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //��ϵ
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //���� 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //�ʹ�3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //����
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //שʯ��
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //שʯ��
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //��ϵ
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //������!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////��ɫԲ
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //����
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //����
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //����
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //����
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //����
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //����
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //��������
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //��������
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //��������
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //��������
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //���ǻ�
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
		//var selStr = "����Ĺ�����ʹ���ø���ǿ��\r\n\r\n";
            var selStr = "#e#n\t\t\t\t"+tz1+" ����BOSS���� "+tz1+"#n#k\r\n";
          	//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"


		selStr += "#b#L1#"+tz20+" BOSS���� "+tz20+"#l \t\t\t";
		selStr += "#b#L2#"+tz20+" �������� "+tz20+"#l \r\n\r\n";
		//selStr += "#b#L4#"+tz20+" ������#l #L5#"+tz20+" �۱�ǿ��#l #L6#"+tz20+" ��װǿ��#l\r\n";
		//selStr += "#b#L7#"+tz20+" ����Ѫ��#l #L8#"+tz20+" װ������#l #L9#"+tz20+" װ����ԭ#l\r\n";
		//selStr += "#b#L10#"+tz20+" װ������#l #L11#"+tz20+" �˺�Ƥ��#l #L12#"+tz20+" ְҵ����#l\r\n";
		//selStr += "#b#L13#"+tz20+" ���߾���#l #L14#"+tz20+" ���زֿ�#l #L16#"+tz20+" ���ø���#l\r\n\r\n";
		//selStr += "#b#L17#"+tz20+" ͼ�ڽ�ָ�ϳ�#l    \t#L18#"+tz20+" װ����������#l \r\n\r\n";
          	//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		//selStr += "#e#n  "+epp+" ���ף����Ϸ��� "+ epp +"#n#k\r\n";

		//selStr += "#e#r t\t\t#L0#"+tz1+" ������Ϸ�����˵� "+tz1+"#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419);
            break; 
        case 1://����Ǳ��
            cm.dispose();
            cm.openNpc(9900004, 4);
            break;  
        case 2://�����ƹ�
            cm.dispose();
            cm.openNpc(9900004, 5);
            break; 
        case 3://װ���ϳ�
            cm.dispose();
            cm.openNpc(1022003);
            break; 
        case 4://������
            cm.dispose();
            cm.openNpc(9310144, 34);
            break;
        case 5://�۱�ǿ��
            cm.dispose();
            cm.openNpc(9310144, 37);
            break;
        case 6://��װǿ��
            cm.dispose();
            cm.openNpc(9000069);
            break;
        case 7://����Ѫ��
            cm.dispose();
            cm.openNpc(9310144, 36);
            break;
        case 8://װ������
            cm.dispose();
            cm.openNpc(9900003, 24);
            break;
	case 9://װ����ԭ
	    cm.dispose();
	    cm.openNpc(9000069, 1111);
	    break;
        case 10://װ������
            cm.dispose();
            cm.openNpc(9310382, 300);
            break;
        case 11://�˺�Ƥ��
            cm.dispose();
            cm.openNpc(9900003, 39);
            break;
        case 12://ְҵ����
            cm.dispose();
            cm.openNpc(9900004, 11);
            break;
        case 13://�������
            cm.dispose();
            cm.openNpc(9900003, 11);
            break;
        case 14://���Ǯׯ
            cm.dispose();
            cm.openNpc(9900003, 17);
            break;
        case 15://����н�
            cm.dispose();
	    cm.openNpc(1540419, 88);
            //cm.openNpc(1540419, 90);//��Ա���һ�
            break;
        case 16://���ø���
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
	case 17://ͼ�ڽ�ָ�ϳ�
            cm.dispose();
            cm.openNpc(1540419, 921);
            break;
	case 18://װ����������
            cm.dispose();
            cm.openNpc(1540419, 922);
            break;
        case 88:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=63744");
            break;











}
    }
}
