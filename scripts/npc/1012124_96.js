
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
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#"
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
		var selStr = "#b����Ĺ��ܶ��ǡ�#r��ϲ����#k#b��ROLL������������Ʒ�鿴��\r\n\r\n";
		selStr += "#e#b"+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+"\r\n";

		selStr += "#r#L0#"+tz+" ɭ��BOSS����ս��Ʒ���ݲ鿴#l\r\n";
		selStr += "#r#L1#"+tz+" ϣ����������ս��Ʒ���ݲ鿴#l\r\n";
		selStr += "#r#L2#"+tz+" �������ձ���ս��Ʒ���ݲ鿴#l\r\n";
		selStr += "#r#L3#"+tz+" �ƽ���Ժ����ս��Ʒ���ݲ鿴#l\r\n";
		selStr += "#r#L4#"+tz+" ����ձ�����ս��Ʒ���ݲ鿴#l\r\n";
		selStr += "\r\n";
		selStr += "#e#b"+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+"\r\n";

		selStr += "#b#L11#"+tz+" ������뾪ϲ����#l  #b#L10#"+tz+" ������������˵�#l\r\n";
		//selStr += "#b#L10#"+ttt6+" ����������˵�#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
			cm.sendOk("#i4310150# #i2049752# #i2433646# #i2022956# #i5062009# #i5062010# #i1112663# #i1112586# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i2049135# #i2049122# #i5010110# #i1012478# #i1022231# #i1022232# #i1182087# #i1152170# #i1132272# #i1122150# #i1122254# #i1122076# #i1032241# #i1032136# #i1113149# #i1112191# #i1115004# #i1112190# #i1115003# #i1112959# #i5010044# #i1112183# #i1112296# #i1112181# #i1112294# #i3010895# #i3010896# #i3010897# #i3010898# #i3010899# #i3010900# #i3010901# #i3010902# #i3010903# #i3010904# #i1112915# #i4001006# #i3010678# #i3010680# #i1112103# #i1112253# #i1112142# #i1112135# #i1112238# #i1702020# #i1002524# #i1702533# #i1112230# #i1112254# #i1112143# #i3010852# #i3010844# #i3010851# #i1072337# #i1702459# #i1702302# #i1042285# #i3010788# #i3010781# #i3010779# #i3010780# #i3010797# #i3010798# #i3010810# #i3010811# #i3010812# #i3010814# #i3010815# #i3010844# #i3010806# #i3012019# #i3010714# #i3010795# #i3010748# #i3010794# #i3010799# #i3010732# #i3012020# #i3010936# #i3010894# #i3010915# #i3010747# #i3010606# #i3010608# #i3010800# #i3010909# #i3010908# #i3010916#\r\n#i1212014##r ��βȫ��װ��,  #i1542015# ʨ��ȫ��װ��,\r\n#i1242014##r ���ȫ��װ��,  #i1342036##r ��ѻȫ��װ��,\r\n#i1452111##r ӥ��ȫ��װ��,  #i1232040# ����ȫ��װ��,\r\n");
            cm.dispose();
            break; 
        case 1:
			cm.sendOk("#b��ʡ��ȫ��140װ��,�Ͳ������ӣ���ɭ�ֳ���һ��\r\n\r\n#i1102807# #i4033924# #i2432013# #i2432014# #i2049752# #i5062009# #i5062010# #i2340000# #i5072000# #i5073000# #i5074000# #i4001006# #i1112915# #i2433654# #i2433285# #i1032205# #i4033356# #i1003797# #i1003798# #i1003799# #i1003800# #i1003801# #i1042254# #i1042255# #i1042256# #i1042257# #i1042258# #i1062165# #i1062166# #i1062167# #i1062168# #i1062169#");
            cm.dispose();
            break;  
        case 2:
			cm.sendOk("#b��ʡ��ȫ��140װ��,�Ͳ������ӣ���ɭ�ֳ���һ��\r\n\r\n#i2433646# #i2049752# #i2022956# #i5062009# #i5062010# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i2049135# #i2049122# #i1003622# #i1012478# #i1022231# #i1022232# #i1182087# #i1152170# #i1132272# #i1122150# #i1122254# #i1122076# #i1032241# #i1032136# #i1113149# #i4001006# #i4033356#");
            cm.dispose();
            break;
		case 3:
			cm.sendOk("��Ҫ��ӱ��ʣ���Ӹ���������Ӳ�ѯ\r\n\r\n#i2433646# #i2049752# #i2022956# #i5062009# #i5062010# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i1003622# #i1022232# #i1052527# #i1012478# #i3010678# #i3010680# #i3010183# #i3010184# #i4033356#");
            cm.dispose();
            break;
		case 4:
			cm.sendOk("#i2430460# #i2430866# #i5073000# #i5074000# #i2049135# #i2049122# #i4001006# #i1112915# #i2433654# #i4033356# #i1003797# #i1003798# #i1003799# #i1003800# #i1003801# #i1042254# #i1042255# #i1042256# #i1042257# #i1042258# #i1062165# #i1062166# #i1062167# #i1062168# #i1062169# #i1542075# #i1252058# #i1532106# #i1522103# #i1492188# #i1482177# #i1472223# #i1462202# #i1452214# #i1442232# #i1432176# #i1422149# #i1412144# #i1382220# #i1372186# #i1362099# #i1342084# #i1332235# #i1322213# #i1312162# #i1302285# #i1242076# #i1402204# #i1232071# #i1222072# #i1212077#");
            cm.dispose();
            break;
		case 10:
            cm.dispose();
			cm.openNpc(1540419);
            break;











}
    }
}
