/*
 �ű����ܣ��г�����Ա
 */
var status = 0;
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
		var selStr = "\t\t\t\t#e#n  " + tz1+ "�������" + tz1+ "#n#k\r\n\r\n";
        selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		
		selStr += "#b#L10#"+yun1+" ����ҵ��#l #L2#"+yun1+" ���ʲ�ѯ#l #L3#"+yun1+" ������#l\r\n";
		selStr += "#b#L4#"+yun1+" �������#l #L5#"+yun1+" ��������#l #L6#"+yun1+" ���й���#l\r\n";

		selStr += "#b#L7#"+yun1+" �����Ӷ#l #L8#"+yun1+" ��Ծ��ѯ#l #L20#"+yun1+" �ٷ���֤#l\r\n\r\n";

		//selStr += "#b#L10#"+yun1+" ����ҵ��#l #L11#"+yun1+" ���ø���#l #L12#"+yun1+" ��ȭ��Ϸ#l\r\n\t\r\n";

         selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"

		selStr += " \t\t\t\t#b#L0#" + tz1+ " ���ز˵�" + tz1+ "#l\r\n";



		//selStr += "#r#L4#"+ttt6+" ��������#l #L14#"+ttt6+" ÿ��Ѱ��#l #L15#"+ttt6+" ħ������#l\r\n";
		//selStr += "#r#L10#"+ttt6+" �����װ#l #L11#"+ttt6+" ˫������#l #L12#"+ttt6+" ��������#l\r\n";
		//selStr += "#r#L16#"+ttt6+" ���ø���#l #L17#"+ttt6+" ���Ǯׯ#l #L6#"+ttt6+" �н�����#l\r\n\r\n";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419);
            break; 
        case 1://��Ϸ����
            cm.dispose();
            cm.openNpc(9900004, 200);
            break;  
        case 2://���ʲ�ѯ
            cm.dispose();
            cm.openNpc(9900003, 5);
            break; 
        case 3://������
            cm.dispose();
            cm.openNpc(1540419, 3);
            break; 
        case 4://���ڱҵ�
            cm.dispose();
            cm.openNpc(1540419, 86);
            break;
        case 5://��������
            cm.dispose();
            cm.warp(100000104, 0);
            break;
        case 6://���й���
            cm.dispose();
            cm.openNpc(9900003, 14);
            break;
        case 7://��Ӷ�̵�
            cm.dispose();
            cm.openNpc(9030000);
            break;
        case 8://��Ծ��ѯ
            cm.dispose();
            cm.openNpc(1540419, 23);
            break;
        case 9://��ȭ��Ϸ
            cm.dispose();
            cm.openNpc(9900004, 300);
            break;
        case 10://����ҵ��
            cm.dispose();
            cm.openNpc(2010011);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9900004, 3);
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
        case 20://�ٷ���֤����
            cm.dispose();
 	    cm.openNpc(9310070);
            //cm.openNpc(1540419, 444);
            break;








}
    }
}
