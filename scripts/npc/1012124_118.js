var status = 0;
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
var z = "#fUI/UIWindow/Quest/icon5/1#";////����
var PayLogPoints = 0;
var yz = new Array(3010947,3010948,3015006,3015010,3010837,3010837,3010838,3010854,3010815,3010804,3010696);
var chance = Math.floor(Math.random()*yz.length);

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
    if (status == 0) {
		var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n";

	    	selStr += "#r��ӭʹ�õ���ר������������#k\r\n\r\n��ѡ��\r\n\r\n";
		selStr += "#b#L1# "+tz1+"���2Сʱ��������#l\r\n\r\n";
		selStr += "#b#L2# "+tz1+"���24Сʱ��������#l \r\n\r\n";
		selStr += "#b#L3# "+tz1+"���72Сʱ��������#l \r\n\r\n";



		//selStr += "\r\n ";

		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
		case 1:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("���") < 1 && cm.getSpace(3) >= 1) { //���
           if (cm.getPlayer().getCSPoints(1) > 1000) { //���
				cm.gainNX(-10000);
				//cm.setBossLog("���");
				cm.gainItem(3010184, 1, 2 * 60 * 60 * 1000);//2Сʱ����һֱ
				cm.sendOk("�����2Сʱ�� #r#z3010184##k ����");
				//cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ����˵���ר������ ", 5120008);
				cm.worldSpouseMessage(0x20,"�����������ӡ� ����� "+ cm.getChar().getName() +" ����� ����ר������2Сʱ ��");
				cm.dispose();
            } else {
                                cm.sendOk("���ʧ�ܣ��������Ƿ��������������\r\n\r\n#r1). ���������20000��\r\n\r\n2). ����λ�ò���\r\n\r\n");
				cm.dispose();
            }
            break;

		case 2:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("���") < 1 && cm.getSpace(3) >= 1) { //���
           if (cm.getPlayer().getCSPoints(1) > 20000) { //���
	//} else	if (cm.haveItem(1010184)) {
               // cm.sendOk("���Ѿ�ӵ��#i3010184# #b�����ظ�����");
				cm.gainNX(-20000);
				//cm.setBossLog("���");
				cm.gainItem(3010184, 1, 24 * 60 * 60 * 1000);//2Сʱ����һֱ
				cm.sendOk("�����24Сʱ�� #r#z3010184##k ����");
				//cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ����˵���ר������ ", 5120008);
				cm.worldSpouseMessage(0x20,"�����������ӡ� ����� "+ cm.getChar().getName() +" ����� ����ר������24Сʱ ��");
				cm.dispose();
            } else {
                		//cm.sendOk("���ʧ�ܣ��������Ƿ��������������\r\n\r\n#r1). ���������20000��\r\n\r\n2). ����λ�ò���\r\n\r\n3).���Ѿ�ӵ��#i3010184# �����ظ�����");
		                cm.sendOk("���ʧ�ܣ��������Ƿ��������������\r\n\r\n#r1). ���������20000��\r\n\r\n2). ����λ�ò���\r\n\r\n");
		cm.dispose();
            }
            break;

		case 3:
		var ii = cm.getItemInfo();
           //if (cm.getBossLog("���") < 1 && cm.getSpace(3) >= 1) { //���
           if (cm.getPlayer().getCSPoints(1) > 50000) { //���
				cm.gainNX(-50000);
				//cm.setBossLog("���");
				cm.gainItem(3010184, 1, 72 * 60 * 60 * 1000);//3���������
				cm.sendOk("�����72Сʱ�� #r#z3010184##k ����");
				//cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ����˵���ר������ ", 5120008);
				cm.worldSpouseMessage(0x20,"�����������ӡ� ����� "+ cm.getChar().getName() +" ����� ����ר������72Сʱ ��");
				cm.dispose();
            } else {
                                cm.sendOk("���ʧ�ܣ��������Ƿ��������������\r\n\r\n#r1). ���������20000��\r\n\r\n2). ����λ�ò���\r\n\r\n");
				cm.dispose();
            }
            break;
 
        }
    }
}