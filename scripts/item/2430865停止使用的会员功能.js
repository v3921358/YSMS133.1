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
var yz = new Array(3010947,3010948,3015006,3015010,3010837,3010837,3010838,3010854,3010815,3010804,3010696,3015329,3015262,3015246,3015395);
var chance = Math.floor(Math.random()*yz.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		//var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r����npc#k#n\r\n";
	    var selStr = ""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+"\r\n\r\n";
		selStr += "#r��ӭʹ��������Ȩ,���θ���������ݷ���#k\r\n\r\n";
		selStr += "#b#L24# "+tz1+"���ø���#l  #L66# "+tz1+"��ָ����#l  #L17# "+tz1+"���Ǯׯ#l\r\n";
		selStr += "#b#L7# "+tz1+"����˫��#l  #L25# "+tz1+"����ϴѪ#l  #L99# "+tz1+"��˿�̳�\r\n";
		selStr += "#b#L33# "+tz1+"��˿����#l  #L6# "+tz1+"��������#l  #L26# "+tz1+"ÿ��Ѱ��#l\r\n";
		selStr += "#b#L3# "+tz1+"��ָ�һ�#l  #L11# "+tz1+"�������#l  #L13# "+tz1+"װ������#l\r\n";

		selStr +=" #L67##b"+tz1+"�Ϲ����Ž�ָ����#r #z4001465##b ר�õ�ͼ#l#k\r\n\r\n\r\n";


		//selStr += "#r#L50# ��Ա����#l  #L6# ��ѡ����#l  #L10# ÿ��Ѱ��#l\r\n";
		//selStr += "#L3# ��ȡ��ָ#l  #L11# �������#l  #L13# �߼�����#l\r\n";
		//selStr += "#L24# �������#l  #L88# һ��Ǳ��#l  #L17# ���Ǯׯ#l\r\n";
		//selStr += "#L7# ����˫��#l  #L25# ����ϴѪ#l  #L99# �����̵�\r\n";

		//selStr += "#L7# һ��Ǳ��#l  #L8# �����̵�#l  #L18# һ������\r\n";

		//selStr += "#L4# BOSS����#l  #L14# ��������#l  #L17# ��ֵ����#l\r\n";
		//selStr += "#r#L0# ÿ�չ���#l  #L1# ��ѵ��#l  #l\r\n";#L9# ÿ��ħ��#l #L5# ��һ���#l 
		//selStr += "#L7# ��������#l  #L8# ��ȡ˫��#l  #L18# һ������\r\n";

		//selStr += "#L2# ��HP����#l  #L19# ��MP����#l  #L20# ����һ��#l\r\n";
		//selStr += "#L21# ����̵�#l  #L22# �ֽ��̵�#l  #L23# �����ƹ�#l\r\n";
		//selStr += "#r#L15# ��ͨ��ƹ���#l    #L16# �߼���ƹ���#l\r\n";
		//selStr += "\r\n ";
		selStr += ""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+""+tz18+"\r\n";
		//selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 12:
		im.dispose();
		im.openNpc(9900003, 10);
		break;
	case 4:
		im.dispose();
		im.openNpc(9900004, 4);
		break;
	case 14:
		im.dispose();
		im.openNpc(9900004, 5);
		break;
	case 13:
		im.dispose();
		im.openNpc(9310382, 12);
		break;
	case 17:
		im.dispose();
		im.openNpc(9310382, 15);
		break;
	case 18:
		im.dispose();
		im.openNpc(9310382, 17);
		break;
	case 19:
		im.dispose();
		im.openNpc(9310382, 88);
		break;
	case 21:
		im.dispose();
		im.openNpc(9310382, 100);
		break;
	case 22:
		im.dispose();
		im.openNpc(9310382, 200);
		break;
	case 23:
		im.dispose();
		im.openNpc(9310382, 99);
		break;
	case 24:
		im.dispose();//���ø���
		im.openNpc(9310382, 600);
		break;
	case 25:
		im.dispose();//��Ѫ����
		im.openNpc(9310382, 601);
		break;
	case 26:
		im.dispose();
		im.openNpc(9900003, 26);//��ݵ�
		break;

	case 66://�Ϲ����Ž�ָ����
		im.dispose();//
		im.openNpc(9310071, 101);
		//im.openNpc(9310071, 100);//��ʼ�Ϲ����Ų������ű�
		break;
	case 67://�Ϲ����Ž�ָ������ͼ
		im.dispose();
                 im.warp(211080100);
				
		break
	case 88://����Ǳ��
		im.dispose();//
		im.openNpc(9900003, 1001);
		break;


	case 99:
		im.dispose();//��Ʒ�̵�
		//im.sendOk("��δ����.");
		im.openNpc(1012124, 60);
		break;
	case 50:
		if (im.getBossLog("����") < 1) { //����
		im.gainItem(5390011, 10);
		im.gainItem(5390012, 10);
		im.gainItem(5390013, 10);
		im.setBossLog("����");
		im.sendOk("��ϲ����ȡVIP�����ѩ�����ҩˮ.");
		im.worldSpouseMessage(0x24,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�ջ�Ա�������ȡ�");
		im.dispose();
       } else {
        im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣");
		im.dispose();
            }
		break;
	case 20:
		if (im.getBossLog("����") < 1) { //����
		im.gainItem(2003518, 10);
		im.gainItem(2003519, 5);
		im.setBossLog("����");
		im.sendOk("��ϲ����ȡVIP�����ѩ�����ҩˮ.");
		im.worldSpouseMessage(0x24,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�վ�����ҩ��");
		im.dispose();
       } else {
        im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣");
		im.dispose();
            }
		break;
	case 15:
	 if (im.getBossLog("���ʮ��", 1) >= 1) { //����
		im.dispose();
		im.openNpc(9310382, 13);
		} else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ǹ߼���ƣ���ʹ�ø߼���Ʒ���");
				im.dispose();
            }
            break;
	case 16:
	 if (im.getBossLog("���ƶ����", 1) >= 1) { //����
		im.dispose();
		im.openNpc(9310382, 14);
		} else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ������ͨ��ƣ���ʹ����ͨ��Ʒ���");
				im.dispose();
            }
            break;
        case 0:
           if (im.getBossLog("����") < 1) { //����
            	im.gainMeso(30000000);
				im.setBossLog("����");
				im.sendOk("��ϲ����ȡVIP�����ÿ�չ���3000����.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�ս�ҡ�");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ������޷���ȡ��");
				im.dispose();
            }
            break;
        case 1:
           if (im.getBossLog("���") < 1) { //���
            	im.gainNX(10000);
				im.setBossLog("���");
				im.sendOk("��ϲ����ȡ���10000��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC�������ȡÿ�� 1 ����");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ�ʹ�ã����������ԡ�\r\n2). ������޷���ȡ��");
				im.dispose();
            }
            break;
        case 2:
           if (im.getPlayer().getCSPoints(1) > 100) { //��Ա�ȼ�
				im.dispose();
				im.openNpc(9310382,89);
            } else {
                im.sendOk("����Ū���ء�����㻹��ʲô�����ٵ�ӵ��100���ſ���ʹ�á�");
				im.dispose();
            }
            break;
		case 7:
           if (im.getBossLog("����˫��") < 1) { //����
            	im.gainItem(5211060,1,1);
		im.gainItem(2003518, 10);
		im.gainItem(2003519, 5);
            	im.gainItem(5360015,1,1);
				im.setBossLog("����˫��");
				im.sendOk("��ϲ����ȡVIP�����ÿ���������鿨һ��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡ����˫�����");
				im.dispose();
            } else {
                im.sendOk("���Ѿ���ȡ�������������졣");
				im.dispose();
            }
            break;
		case 8:
           if (im.getBossLog("˫��") < 1) { //˫��
            	im.gainItem(5360015,1,1);
				im.setBossLog("˫��");
				im.sendOk("��ϲ����ȡVIP�����ÿ��˫�����ʿ�һ��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ��˫�����ʿ���");
				im.dispose();
            } else {
                im.sendOk("���Ѿ���ȡ�������������졣");
				im.dispose();
            }
            break;
		case 9:
           if (im.getBossLog("ħ��") < 1) { //ħ��
            			im.gainItem(5064010,10);
				im.gainItem(2340000,10);
				im.gainItem(5062500,10);
				im.gainItem(5062002,10);
				im.setBossLog("ħ��");
				im.sendOk("��ϲ����ȡ��Ʒ����ÿ����Ƶ��ߣ�����ռ�����ħ�����߼�����ħ������ʦ������ħ�����������ᡢף������x10��");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ����Ƶ��ߡ�");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ������޷���ȡ��");
				im.dispose();
            }
            break;
		case 5:
           if (im.getBossLog("���") < 1 && im.getSpace(4) >= 3) { //���
            	im.gainItem(4310108,100);
		im.gainItem(4310036,100);
		im.gainItem(4033943,30);
		im.gainItem(4001006,20);
				im.setBossLog("���");
				im.sendOk("��ϲ����ȡVIP�����ÿ����ȡ�һ���\r\n\r\n#i4310108# x 100  #i4310036# x 100  #i4033943# x 30  #i4001006# x 20.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡ�һ��ҡ�");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����λ�ò���");
				im.dispose();
            }
            break;
		case 11:
		var ii = im.getItemInfo();
           if (im.getBossLog("���") < 1 && im.getSpace(3) >= 1) { //���
				im.setBossLog("���");
				im.gainItem(yz[chance], 1, 2 * 60 * 60 * 1000);
				im.sendOk("�����2Сʱ�� #r#z"+yz[chance]+"##k ����");
				im.getMap().startMapEffect("��ϲ��� " + im.getChar().getName() + " ��������� " + ii.getName(yz[chance]) + "��", 5120008);
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����������� " + ii.getName(yz[chance]) + " ��");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���������������衣\r\n2). ����λ�ò���");
				im.dispose();
            }
            break;
		case 10:
           if (im.getRMB() >= 2000000) { //��Ա�ȼ�
				im.dispose();
				im.openNpc(9900003, 25);
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r ��⵽����ǰΪ����档������޷����룬��ͨ���¼�������ÿ�����3�ζ���Ѱ����Ȩ��");
				im.dispose();
            }
            break;
		case 6:
           if (im.getPlayer().getCSPoints(1) > 1000) { //��ѡ����
				//im.gainNX(-10000);
				im.dispose();
				im.openNpc(9900001, 10);
            } else {
                im.sendOk("�����1000������ɶ��");
				im.dispose();
            }
            break;
		case 3:
           if (im.getMeso() > 10000) { //��ȡ��ָ
				im.dispose();
				im.openNpc(9310382, 11);
            } else {
                im.sendOk("��Ҳ���1��");
				im.dispose();
            }
            break;
			case 33:
			if (im.getMeso() >= 2000000) {
				im.sendGetText("����200����Ϸ�ң���������Ҫ˵�Ļ���");
				typed = 33;
			} else {
				im.sendOk("��û��200����Ϸ�ң����ܽ������纰����");
				im.dispose();
			}
			break;
        }
    } else if (status == 2) {
		if (typed == 33) {
			im.worldSpouseMessage(0x01, "[��˿����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x02, "[��˿����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x03, "[��˿����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.gainMeso(-2000000);
		
		}
		im.dispose();
        }
    }

