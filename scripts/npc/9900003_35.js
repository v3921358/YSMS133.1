
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
		var selStr = "#g================ #k��Ϸ�����̵�#g ================#k\r\n";
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		selStr += "#b#L0#"+tz10+" �ӻ��̵�#l  #L1#"+tz10+" ˫���̵�#l  #L2#"+tz10+" �����̵�#l\r\n";
		selStr += "#b#L3#"+tz10+" �����̵�#l  #L4#"+tz10+" �����̵�#l  #L5#"+tz10+" ʨ���̵�#l\r\n";
		selStr += "#b#L6#"+tz10+" ����̵�#l  #L7#"+tz10+" �����̵�#l  #L8#"+tz10+" ƻ�����#l\r\n";
		selStr += "#b#L9#"+tz10+" �����̵�#l  #L10#"+tz10+" �����̵�#l  #L11#"+tz10+" ��Ʒ�̵�#l\r\n\r\n";
		//selStr += "#r#L33#"+tz10+" ���＼��װ���̵�  #l\r\n";

		selStr += "#g=================#k���������̵�#g=================  #k\r\n";
		
		selStr += "#b#L100#"+tz12+" 11�����#l #L101#"+tz13+" �����ҵ�#l #L102#"+tz14+" RED���̵�#l\r\n";
		selStr += "#b#L106#"+tz12+" ����ҵ�#l #L104#"+tz13+" ���յ±�#l #L105#"+tz14+" �����˹��#l\r\n";
		selStr += "#r#L99#"+tz12+" �����˵�#l #b#L33#"+tz13+" ���＼��#l #L107#"+tz14+" ������˹��#l\r\n\r\n";//#L20#"+tz12+" �ֽ��̳�#l

		//selStr += "#r#L0#"+tz10+" ��  Ϸ#b  [��Ϸ�ӻ��̵�]#l #L5# [��Ϸ�����̵�]#l\r\n";
		//selStr += "#r#L21#"+tz10+" ��  ��#b  [��Ҷһ����]#l #L7# [����Ҷһ��̵�]#l\r\n";
		//selStr += "#r#L12#"+tz10+" ��  ��#b  [ϡ�о����װ]#l #L13# [����ϡ�о���]#l\r\n";
		//selStr += "#r#L14#"+tz10+" ��  ��#b  [����ħ������]#l #L15# [��������װ]#l\r\n";
		//selStr += "#r#L16#"+tz10+" �ֽ��#b  [����߼�װ��]#l #L17# [������߲���]\r\n";
		//selStr += "#r#L18#"+tz10+" ���þ�#b  [�������ľ���]#l #L19# [����߼�װ��]#l\r\n";
		//selStr += "#r#L22#"+tz10+" �ֽ��#b  [��㳬ֵ����]#l #L17# [������߲���]\r\n\r\n";
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"

		//selStr += "\t\t\t\t#b#L99#"+tz1+" �����˵� "+tz1+"#l\r\n";

		//selStr += "#r#L20#"+ttt6+" #e��  ��#n  [����ҵ��þ�]#l #L21# [��Ҷһ��ɵ��]#l\r\n\r\n";
		//selStr += "#r#L2#"+tz10+" ��Ϸ����̵�#l    #L7#"+ttt6+" 11���������̵�#l\r\n";
		//selStr += "#r#L3#"+tz10+" ���þ��̵�#l      #L8#"+ttt6+" �����˹���̵�#l\r\n";
		//selStr += "#r#L4#"+tz10+" 10%�����̵�#l     #L9#"+ttt6+" ���յ±��̵�#l\r\n\r\n";
		//selStr += "#r#L16#"+tz10+" �ֽ��#b  [����߼�װ��]#l #L17# [������߲���]\r\n";
		//selStr += "#r#L8#"+tz10+" �ֽ��#b  [�ֽ����н�]#l #L19# [������߲���]\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://�ӻ��̵�
	cm.openShop(1012123);//shop�ֶβ���Ϊ0
        cm.dispose();
            break; 
        case 1://˫���̵�
                cm.openShop(1012125);
		cm.dispose();
            break;  
        case 2://�����̵�
                cm.openShop(1033003);
		cm.dispose();
            break; 
        case 3://�����̵�
                cm.openShop(1033001);
		cm.dispose();
            break; 
        case 4://�����̵�
            cm.dispose();
                cm.openShop(9310117);
           // cm.openShop(10001);
            break;
        case 5://ʨ�����̵�
            cm.dispose();
            //cm.openShop(20000);
                 cm.openShop(2161010);
		cm.dispose();
            break;
        case 6://����̵�
            cm.dispose();//��Ӧ��110000�ֶ�
	    cm.openNpc(1540419, 999);
           // cm.openShop(10002);
            break;
        case 7://�����̵�
            cm.dispose();
            //cm.openShop(22227);
	    cm.openNpc(9900003, 16);	
            break;
	case 8://�������̵�
            cm.dispose();
		cm.openNpc(1540419, 26);
            //cm.openNpc(9900003, 38);
            break;

        case 9://���ľ���
            cm.dispose();
	cm.openNpc(9900003, 11);
            break;
        case 10://����
            cm.dispose();
	    //cm.sendOk("��ʱδ���š�")
	   // cm.openNpc(9000290);
           cm.openNpc(9900003, 44);
            break;
        case 11://��Ʒ�̵�
            cm.dispose();
            cm.openNpc(9310060, 2); //��Ʒ
            break; 
        case 13:
            cm.dispose();
            cm.openNpc(9900003, 11);
            break;
        case 14:
            cm.dispose();
            cm.openShop(10000);
            break;
        case 15:
            cm.dispose();
            cm.openShop(10000);
            break;	
        case 16:
            cm.dispose();
            cm.openNpc(9310382, 302);
            break; 
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9310382, 300);
            break;
        case 18:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 19:
            cm.dispose();
            cm.openNpc(9900003, 18);
            break;
        case 20:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 21:
            cm.dispose();
            cm.openNpc(9900003, 31);
            break;
        case 22:
            cm.dispose();
            cm.openNpc(1540419, 98);
            break;
        case 33://���＼��װ���̵�
            cm.dispose();
            cm.openNpc(9900003, 45);
            break;
        case 99:
            cm.dispose();
            cm.openNpc(1540419);
            break;
		case 100:
            cm.dispose();
            cm.openNpc(9000290, 11);//11�����10
            break;
		case 101:
            cm.dispose();
            cm.openNpc(9900003, 21);//�������̵�
            break; 
        case 102:
            cm.dispose();
			cm.openShop(20000);//RED
			//cm.openNpc(9900005, 44)
            break; 
		case 103:
            cm.dispose();
	        cm.openShop(22200);//�˶���
            //cm.openNpc(9330079, 304);
            break;
		case 104:
            cm.dispose();
            cm.openNpc(9900005, 2);//���յ±��̵�
            break; 
		case 105:
            cm.dispose();//�������̵�
			cm.sendOk("��ʱδ���š�")
			//cm.openShop(10003);
           // cm.openNpc(9330079, 303);
            break;
		case 106:
            cm.dispose();
            cm.openNpc(9900004, 10);//������̵�
            break; 
		case 107:
            cm.dispose();
			cm.sendOk("��ʱδ���š�")
            //cm.openNpc(9900005, 4);//��������˹��
            break; 
		case 108:
            cm.dispose();
            cm.openNpc(1540419, 26);//�������̵�
            break; 
		case 109:
            cm.dispose();
            //cm.openNpc(1540419, 202);//�ǹ��ҵ�
			cm.openNpc(9310144, 26);//�ǹ��ҵ�
            break; 
	
		case 110:
            cm.dispose();
			//cm.sendOk("��ʱδ���š�")
            cm.openNpc(9000069);//����������
            break; 
		case 111:
            cm.dispose();
            cm.openNpc(9310144, 1);//�����ҵ�
            break;





}
    }
}