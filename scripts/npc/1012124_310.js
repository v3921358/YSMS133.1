/* ����̵� */

var status = 0;
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
    //var selStr = "#b"+tz+"�װ���"+tz+" #r#h ##k"+tz+" ���� \r\n";
		 var selStr = "#d����ǰ��ȯ�� #r"+cm.getNX(1)+"#k #d��#k\t#d��ǰ�ֽ� #r" + cm.getRMB() + "#k #d��#k\r\n#e#d��ѡ��(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#n#k";
		//selStr += "#g======================#k�������#g====================#k\r\n";
		selStr += "#b#L0#"+tz+"��ָ#l	    #L2#"+tz+"ñ��#l       #L4#"+tz+"����\r\n";
		selStr += "#L6##b"+tz+"��ȹ#l	    #L7#"+tz+"����#l       #L5#"+tz+"����#l\r\n";
		selStr += "#L8##b"+tz+"����#l	    #L9#"+tz+"��װ#l       #L1#"+tz+"Ь��#l\r\n";
		selStr += "#L10##b"+tz+"����#l        #L14#"+tz+"����#l\r\n\r\n";// #L12#ϡ�г���#l\t#L13#"+tz+"˫��#l \t  
		//selStr += "#g======================#k�ֽ�����#g====================#k\r\n";
		//selStr += "#L100#"+tz+"#r��Ʒ����#l    #L101#"+tz+"#r��ϵ����#l     #L102#"+tz+"#r150����#l\r\n";
		//selStr += "#L105#"+tz+"#r��Ʒ����#l    #L104#"+tz+"#rǿ�����#l     #L103#"+tz+"#r150����#l\r\n";

		//selStr += "#L17##r"+tz+"װ��#l		#L19#"+tz+"���#l \t   #L20#"+tz+"����#l\r\n\r\n";
		

//selStr += "#L22##e#b�����ؼ۴��Ż�#r����һ�ڣ�#bÿ�ܸ���һ��#l	  \r\n\t";//#L20#�������#l #L22##e#b��ʱ�Ż�������Ʒ����һ�ڣ�#l	
		//selStr += "#L22##r��ʱ�Ż���Ʒ����һ�ڣ�#l		 \r\n";//#L20#�������#l
		//selStr += "\r\n#L22##g�򿪱�����ֵ���ӡ�1Ԫ=1Ԫ��+2000���#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#b#L0#˫������#l    #L7#���߾���#l\r\n#L8#����̵�#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//����1540419������ֹͣʹ��
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540419, 1521); //��ָ
            break;
        case 2:
            cm.dispose();
            cm.openNpc(1540419, 1522); //ñ��
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1540419, 1523); //����
            break;
        case 5:
            cm.dispose();
            cm.openNpc(1540419, 1524); //����
            break;
        case 6:
            cm.dispose();
            cm.openNpc(1540419, 1525); //��ȹ
            break;
        case 7:
            cm.dispose();
            cm.openNpc(1540419, 1526); //����
            break;
        case 8:
            cm.dispose();
            cm.openNpc(1540419, 1527); //����
            break;
        case 9:
            cm.dispose();
            cm.openNpc(1540419, 1528); //��װ
            break;
	case 10:
            cm.dispose();
            cm.openNpc(1540419, 1529); //����
            break;
	case 1:
            cm.dispose();
            cm.openNpc(1540419, 1530); //Ь��
            break;
    case 11:
            cm.dispose();
            cm.openNpc(1540419, 155); //���
            break;
	case 12:
            cm.dispose();
            cm.openNpc(1540419, 153); //����
            break;
	case 13:
            cm.dispose();
            cm.openNpc(1540419, 151); //˫������
            break;
	case 14:
            cm.dispose();
            cm.openNpc(1540419, 156); //����
            break;
	case 15:
            cm.dispose();
            cm.openNpc(1540419, 10); //��Ϸ����
            break;
	case 16:
            cm.dispose();
            cm.openNpc(9310069, 1); //װ��
            break;
	case 17:
            cm.dispose();
            cm.openNpc(9310060, 2); //��Ʒ
            break;
	case 18:
            cm.dispose();
            cm.openNpc(9310069, 3); //����
            break;
	case 19:
            cm.dispose();
            cm.openNpc(9310060, 4); //���
            break;
	case 20:
            cm.dispose();
            cm.openNpc(9900002, 10); //ϴ�����
            break;
	case 21:
            cm.dispose();
            cm.openNpc(9310069, 100); //����̵�
            break;
	case 22:
            cm.dispose();
            cm.openNpc(9310069, 5); //�����ʱ�����̵�
            break;

	case 100:
            cm.dispose();
            cm.openNpc(9310074, 100); //�ֽ�����
            break;
	case 101:
            cm.dispose();
            cm.openNpc(9310074, 101); //��ϵ����
            break;
	case 102:
            cm.dispose();
            cm.openNpc(9310074, 102); //150³����˹����
            break;
	case 103:
            cm.dispose();
            cm.openNpc(9310074, 103); //FFN����
            break;
	case 104:
            cm.dispose();
            cm.openNpc(9310074, 104); //ǿ�����
            break;
	case 105:
            cm.dispose();
            cm.openNpc(9310074, 105); //�ֽ����
            break;

	case 30:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("�Ѿ�Ϊ����������վ��");
            break;
        }
    }
}