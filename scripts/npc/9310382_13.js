var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//����
var PayLogPoints = 0;
var RMB = 0
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
		var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r����npc#k#n\r\n";
		selStr += "#d��ӭʹ��������Ȩ,���θ���������ݷ���#k\r\n";
		selStr += "#r#L0#"+z+" ÿ�չ���#l  #L1#"+z+" ��ѵ��#l  #L2#"+z+" ����Ѫ��#l\r\n";
		selStr += "#L12#"+z+" ����̵�#l  #L6#"+z+" ��ѡ����#l  #L10#"+z+" ÿ��Ѱ��#l\r\n";
		selStr += "#L7#"+z+" ��������#l  #L8#"+z+" ��ȡ˫��#l  #L9#"+z+" ÿ��ħ��#l\r\n";
		//selStr += "#L3#"+z+" ��ȡ��ָ#l  #L5#"+z+" ��һ���#l  #L11#"+z+" �������#l\r\n";
		//selStr += "#L4#"+z+" BOSS����#l  #L14#"+z+" ��������#l  #L13#"+z+" �߼�����#l\r\n";
		//selStr += "#L15#"+z+" ��ͨ��ƹ���#l  #L16#"+z+" �߼���ƹ���#l\r\n";
		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 12:
		cm.dispose();
		cm.openNpc(9900003, 10);
		break;
	case 4:
		cm.dispose();
		cm.openNpc(9900004, 4);
		break;
	case 14:
		cm.dispose();
		cm.openNpc(9900004, 5);
		break;
	case 13:
		cm.dispose();
		cm.openNpc(9010060, 2);
		break;
	case 15:
	 if (cm.getBossLog("���ʮ��") > 1) { //����
		cm.dispose();
		cm.openNpc(9010060, 3);
		} else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ǹ߼���ƣ������ø߼���Ʒ���");
				cm.dispose();
            }
            break;
	case 16:
	 if (cm.getBossLog("���ƶ����") > 1) { //����
		cm.dispose();
		cm.openNpc(9010060, 4);
		} else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ������ͨ��ƣ���������ͨ��Ʒ���");
				cm.dispose();
            }
            break;
        case 0:
           if (cm.getBossLog("����") < 1) { //����
            	cm.gainMeso(30000000);
				cm.setBossLog("����");
				cm.sendOk("��ϲ����ȡVIP�����ÿ�չ���3000����.");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����ȡÿ�ս�ҡ�");
				cm.dispose();
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ������޷���ȡ��");
				cm.dispose();
            }
            break;
        case 1:
           if (cm.getBossLog("���") < 1) { //���
            	cm.gainNX(10000);
				cm.setBossLog("���");
				cm.sendOk("��ϲ����ȡ���10000��.");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC�������ȡÿ�� 1 ����");
				cm.dispose();
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ�ʹ�ã����������ԡ�\r\n2). ������޷���ȡ��");
				cm.dispose();
            }
            break;
        case 2:
           if (cm.getPlayer().getCSPoints(1) > 100) { //��Ա�ȼ�
				cm.dispose();
				cm.openNpc(9900001,9);
            } else {
                cm.sendOk("����Ū���ء�����㻹��ʲô�����ٵ�ӵ��100���ſ���ʹ�á�");
				cm.dispose();
            }
            break;
		case 7:
           if (cm.getBossLog("����") < 1) { //����
            	cm.gainItem(5211060,1,1);
				cm.setBossLog("����");
				cm.sendOk("��ϲ����ȡVIP�����ÿ���������鿨һ��.");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����ȡÿ���������鿨��");
				cm.dispose();
            } else {
                cm.sendOk("���Ѿ���ȡ�������������졣");
				cm.dispose();
            }
            break;
		case 8:
           if (cm.getBossLog("˫��") < 1) { //˫��
            	cm.gainItem(5360015,1,1);
				cm.setBossLog("˫��");
				cm.sendOk("��ϲ����ȡVIP�����ÿ��˫�����ʿ�һ��.");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����ȡÿ��˫�����ʿ���");
				cm.dispose();
            } else {
                cm.sendOk("���Ѿ���ȡ�������������졣");
				cm.dispose();
            }
            break;
		case 9:
           if (cm.getBossLog("ħ��") < 1) { //ħ��
            			cm.gainItem(5064010,10);
				cm.gainItem(2340000,10);
				cm.gainItem(5062500,10);
				cm.gainItem(5062002,10);
				cm.setBossLog("ħ��");
				cm.sendOk("��ϲ����ȡ��Ʒ����ÿ����Ƶ��ߣ�����ռ�����ħ�����߼�����ħ������ʦ������ħ�����������ᡢף������x10��");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����ȡÿ����Ƶ��ߡ�");
				cm.dispose();
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ������޷���ȡ��");
				cm.dispose();
            }
            break;
		case 5:
           if (cm.getBossLog("���") < 1 && cm.getSpace(4) >= 3) { //���
            	cm.gainItem(4310108,100);
		cm.gainItem(4310036,100);
		cm.gainItem(4033943,30);
		cm.gainItem(4001006,20);
				cm.setBossLog("���");
				cm.sendOk("��ϲ����ȡVIP�����ÿ����ȡ�һ���\r\n\r\n#i4310108# x 100  #i4310036# x 100  #i4033943# x 30  #i4001006# x 20.");
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����ȡ�һ��ҡ�");
				cm.dispose();
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����λ�ò���");
				cm.dispose();
            }
            break;
		case 11:
		var ii = cm.getItemInfo();
           if (cm.getBossLog("���") < 1 && cm.getSpace(3) >= 1) { //���
				cm.setBossLog("���");
				cm.gainItem(yz[chance], 1, 2 * 60 * 60 * 1000);
				cm.sendOk("�����2Сʱ�� #r#z"+yz[chance]+"##k ����");
				cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ��������� " + ii.getName(yz[chance]) + "��", 5120008);
				cm.worldSpouseMessage(0x20,"��������� ����� "+ cm.getChar().getName() +" ������NPC����������� " + ii.getName(yz[chance]) + " ��");
				cm.dispose();
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���������������衣\r\n2). ����λ�ò���");
				cm.dispose();
            }
            break;
		case 10:
           if (cm.getRMB() >= 260) { //��Ա�ȼ�
				cm.dispose();
				cm.openNpc(9900003, 25);
            } else {
                cm.sendOk("ʧ�ܣ�\r\n\r\n#r ��⵽����ǰΪ����档������޷����룬��ͨ���¼�������ÿ�����3�ζ���Ѱ����Ȩ��");
				cm.dispose();
            }
            break;
		case 6:
           if (cm.getPlayer().getCSPoints(1) > 1000) { //��ѡ����
				//cm.gainNX(-10000);
				cm.dispose();
				cm.openNpc(9900001, 10);
            } else {
                cm.sendOk("�����1000������ɶ��");
				cm.dispose();
            }
            break;
		case 3:
           if (cm.getMeso() > 10000) { //��ȡ��ָ
				cm.dispose();
				cm.openNpc(9010060, 1);
            } else {
                cm.sendOk("��Ҳ���1��");
				cm.dispose();
            }
            break;
        }
    }
}
