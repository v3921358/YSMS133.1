var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
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
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var yun ="#fUI/UIWindow/Quest/icon7/0#";////��ɳ©
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////��ɫԲ
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////��ָ��
var yun3 ="#fUI/UIWindow/Quest/prob#";////���ʻ��
var yun4 ="#fUI/UIWindow/Quest/reward#";////����
var yun5 ="#fUI/UIWindow/Quest/summary#";////������
var yun6 ="#fUI/UIWindow/PartySearch2/BtPrev/mouseOver/0#";////��ָ��
var yun7 ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////��ָ��
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////����ָ��
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////����ָ��
var yun12 ="#fUI/UIWindow/Megaphone/2#";////����
var xiaoyun1 ="#fUI/UIWindow/AriantMatch/characterIcon/0#";////�췽
var xiaoyun2 ="#fUI/UIWindow/AriantMatch/characterIcon/1#";////����
var xiaoyun3 ="#fUI/UIWindow/AriantMatch/characterIcon/2#";////�̷�
var xiaoyun4 ="#fUI/UIWindow/AriantMatch/characterIcon/3#";////�Ʒ�
var xiaoyun5 ="#fUI/UIWindow/AriantMatch/characterIcon/4#";////�Ϸ�
var xiaoyun6 ="#fUI/UIWindow/AriantMatch/characterIcon/5#";////�ȷ�
var xiaoyun7 ="#fUI/UIWindow/Minigame/Common/btStart/mouseOver/0#";////��ʼ
var xiaoyun8 ="#fUI/UIWindow/Minigame/Common/mark#";////ð�յ�ͼ��

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
        var selStr = "#e#k         "+yun8+"��Panda���Ҿ���ѫ��ϵͳ��"+yun9+"\r\n"+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+"\r\n#e#r      ���ѫ��ȡ�����ű���������ȡ\r\n#e#g         #L1##i1142318#��ȡÿ��[��У]����#i1142318##l\r\n#e#r         #L2##i1142319#��ȡÿ��[��У]����#i1142319##l\r\n\#e#b         #L3##i1142320#��ȡÿ��[��У]����#i1142320##l\r\n\#e#d         #L4##i1142321#��ȡÿ��[#r��#b��#d]����#i1142321##l\r\n\r\n#i1142311##i1142312##i1142313##i1142314##i1142315##i1142316##i1142317##i1142318##i1142319##i1142320##i1142321#\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
			        case 1:
            if (cm.haveItem(1142318, 1) && cm.getPlayer().getLevel() > 200 && cm.getBossLog("��У") < 1) {
				cm.setBossLog("��У");
               //cm.gainItem(2340000,20);
				//cm.gainItem(3800747,5);
				//cm.gainItem(4001785,2);
				//cm.gainItem(4001839,50);
				 cm.gainItem(2340000, 20);
				 cm.gainItem(4030015, 4);
				 cm.gainItem(5062009, 10);
				 cm.gainItem(4001839, 30); 
				
				
                cm.sendOk("#r#e�𾴵���У��\r\n#kף����Ϸ���!");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.dispose();
            } else {
                cm.sendOk("�Ų����ҷַ���ǹ���㣿");
				cm.dispose();
            }
            break;
			case 100:
            cm.dispose();
            cm.openNpc(9310376,110);
            break;
			        case 2:
            if (cm.haveItem(1142319, 1) && cm.getPlayer().getLevel() > 220 && cm.getBossLog("��У") < 1) {
				cm.setBossLog("��У");
                //cm.gainItem(2340000,30);
				//cm.gainItem(3800747,10);
				//cm.gainItem(4001785,3);
				//cm.gainItem(4001839,100);
				//cm.gainItem(5062009,20);
				//cm.gainItem(5220040,30);
				
				cm.gainItem(02340000,30); 
				cm.gainItem(04030015,8);
				cm.gainItem(05062009,20);
				cm.gainItem(04001839,60);
				cm.gainItem(05220040,10);
				
                cm.sendOk("#r#e�𾴵���У��\r\n#kף����Ϸ���!");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.dispose();
            } else {
                cm.sendOk("�Ų����ҷַ���ǹ���㣿");
				cm.dispose();
            }
            break;
			        case 3:
            if (cm.haveItem(1142320, 1) && cm.getPlayer().getLevel() > 230 && cm.getBossLog("��У") < 1) {
				cm.setBossLog("��У");
                //cm.gainItem(2340000,40);
				//cm.gainItem(3800747,15);
				//cm.gainItem(4001785,5);
				//cm.gainItem(4001839,150);
				//cm.gainItem(5062009,40);
				//cm.gainItem(5220040,60);
				
				
				cm.gainItem(2340000,40);
				cm.gainItem(4030015,12);
				cm.gainItem(5062009,30);
				cm.gainItem(4001839,90);
				cm.gainItem(5220040,20);
				
                cm.sendOk("#r#e�𾴵���У��\r\n#kף����Ϸ���!");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[��У] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.dispose();                                                                    
            } else {                                                                             
                cm.sendOk("�Ų����ҷַ���ǹ���㣿");
				cm.dispose();
            }
            break;
			        case 4:
           if (cm.haveItem(1142321, 1) && cm.getPlayer().getLevel() >= 240 && cm.getBossLog("�ų�") < 1) {
				cm.setBossLog("�ų�");
				
                cm.gainItem(2340000,50);
				cm.gainItem(3800747,20);
				cm.gainItem(4001785,8);
				cm.gainItem(4001839,150);
				cm.gainItem(5062009,60);
				cm.gainItem(5220040,60);
				cm.gainItem(2430069,5);
				cm.gainItem(2340000,50);
				cm.gainItem(4030015,16);
				cm.gainItem(5062009,40);
				cm.gainItem(4001839,120);
				cm.gainItem(5220040,30);
				cm.gainItem(2430779,5);
			
                cm.sendOk("#r#e�𾴵��ų���\r\n#kף����Ϸ���!");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x20, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x18, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x15, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.worldSpouseMessage(0x15, "���������š� : " + cm.getChar().getName() + "[�ų�] ��ȡ�˽�������ҿ�ȥ��������������");
				cm.dispose();
            } else {
                cm.sendOk("�Ų����ҷַ���ǹ���㣿");
				cm.dispose();
            }
            break;
			        case 5:
            cm.dispose();
            cm.openNpc(9310376,6);
            break;
			        case 6:
            cm.dispose();
            cm.openNpc(9310376,3);
            break;
			        case 7:
            cm.dispose();
            cm.openNpc(9310376,7);
            break;
			        case 8:
            cm.dispose();
            cm.openNpc(9310376,8);
            break;
			        case 9:
            cm.dispose();
            cm.openNpc(9310376,9);
            break;
			case 10:
            cm.dispose();
            cm.openNpc(9310376,10);
            break;
			case 11:
            cm.dispose();
            cm.openNpc(9310376,11);
            break;
		}
    }
}
