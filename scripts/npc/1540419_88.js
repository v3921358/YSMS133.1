
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
		var selStr = "#b=====================��ֵ��Ʒ���====================#k\r\n";
		selStr += "    " + tz1 + "��ǰ�ֽ�:#r " + cm.getRMB() + " #kԪ\t  " + tz1 + "�ۼƳ�ֵ��#r" + cm.getTotalRMB() + " #kԪ\r\n\r\n"
		selStr += "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "\r\n\r\n"
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		selStr += "#r#L0#"+tz1+" #b[�ֽ��н���]#l     \r\n\r\n";//#L8#"+tz1+" [�ֽ����н�]#l
		selStr += "#r#L1#"+tz1+" #b[����ֵ��Ա]#l     \r\n\r\n";
		selStr += "#r#L2#"+tz1+" #b[��ȡ��������]#l\r\n\r\n";

		//selStr += "#r#L4#"+tz1+" #b[����ֵ��Ա]#l #L17#"+tz1+" [������߲���]#l\r\n\r\n";
		//selStr += "#r#L14#"+tz10+" ��  ��#b  [����ħ������]#l #L15# [��������װ]#l\r\n";
		//selStr += "#r#L16#"+tz10+" �ֽ��#b  [����߼�װ��]#l #L17# [������߲���]\r\n";
		//selStr += "#r#L18#"+tz10+" ���þ�#b  [�������ľ���]#l #L19# [����߼�װ��]#l\r\n";
		//selStr += "#r#L22#"+tz10+" �ֽ��#b  [��㳬ֵ���]#l #L17# [������߲���]\r\n\r\n";
		//selStr += "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "" + tz13 + "" + tz14 + "" + tz12 + "\r\n"
		selStr += "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "\r\n\r\n"

		selStr += "\t\t#b#L99#"+tz10+" ���������һҳ"+tz10+"#l\r\n";

		//selStr += "#r#L20#"+ttt6+" #e��  ��#n  [���ҵ��þ�]#l #L21# [��Ҷһ��ɵ��]#l\r\n\r\n";
		//selStr += "#r#L2#"+tz10+" ��Ϸ����̵�#l    #L7#"+ttt6+" 11���������̵�#l\r\n";
		//selStr += "#r#L3#"+tz10+" ���þ��̵�#l      #L8#"+ttt6+" �����˹���̵�#l\r\n";
		//selStr += "#r#L4#"+tz10+" 10%�����̵�#l     #L9#"+ttt6+" ���յ±��̵�#l\r\n\r\n";
		//selStr += "#r#L16#"+tz10+" �ֽ��#b  [����߼�װ��]#l #L17# [������߲���]\r\n";
		//selStr += "#r#L8#"+tz10+" �ֽ��#b  [�ֽ����н�]#l #L19# [������߲���]\r\n\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419, 98);
            break; 
        case 1:
            cm.dispose();
            cm.openNpc(1540419, 100);
            break;  
        case 2:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break; 
        case 3:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break; 
        case 4:
            cm.dispose();
            cm.openShop(10001);
            break;
        case 5:
            cm.dispose();
            //cm.openShop(20000);
			cm.openNpc(9900003, 40);
            break;
        case 6:
            cm.dispose();
            cm.openShop(10002);
            break;
        case 7:
            cm.dispose();
            //cm.openShop(22227);
	    cm.openNpc(9000290);	
            break;
	case 8:
            cm.dispose();
            cm.openNpc(9900003, 38);
            break;
       // case 8:
            //cm.dispose();
           // cm.openShop(10003);
           // break;
        case 9:
            cm.dispose();
            cm.openShop(10004);
            break;
        case 11:
            cm.dispose();
	    cm.openNpc(1540419, 89);
           //cm.openNpc(9310144, 4);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9900002, 6);
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
        case 99:
            cm.dispose();
            cm.openNpc(1540419);
            break;









}
    }
}
