var status = 0;
//var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//����
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var z = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var yz =new Array(3010947, 3010948, 3015006, 3015010, 3010837,3010838, 3010854);
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
        var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r���� npc#k#n\r\n";
		selStr += head + icon2 + "#e#b��ӭʹ�����繫��,���θ����������#k#n\r\n";
		//selStr += "#r#L0#"+z+" ÿ�չ���#l  #L1#"+z+" ÿ�յ��#l  #L9#"+z+" ÿ�����#l\r\n";
		selStr += "  #L14#"+z+" ���纰��#l  \r\n";//#L4#"+z+" ��������#l #L7#"+z+" ȫ��˫��#l
		//selStr += "#L10#"+z+" �������#l  #L6#"+z+" ��ѡ����  #L2#" + z + " ����ϴѪ#l\r\n";
		//selStr += "#L16#"+z+" ��Ʒװ��#l  #L17#"+z+" �����ƹ�  #L18#" + z + " ��һ���#l\r\n";
		//selStr += "#L19#"+z+" ÿ��Ѱ��#l  #L20#"+z+" Ԫ������  #L21#"+z+" #b���Ǯׯ#k \r\n";
		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
		case 6:
				im.dispose();
				im.openNpc(9900001, 10);
            break;
		 case 16:
				im.dispose();
				im.openNpc(9310480, 1);//��Ա�̵�
            break;
		 case 17:
				im.dispose();
				im.openNpc(9310480, 2);//��Ա�ƹ�
           break;
		 case 18:
				 im.dispose();
				im.openNpc(9310480, 3);//��һ���
			break;
		 case 19:
				 im.dispose();
				im.openNpc(9900003, 26);//��ݵ�
			break;
		 case 20:
				 im.dispose();
				im.openNpc(9330079, 703);//Ԫ���һ����
			break;
		 case 21:
		if (im.getBossLog("Ԫ��") < 1) {
			im.setBossLog("Ԫ��");
			im.addHyPay(-5);
			im.sendOk("��ϲ����ȡVIP�����ÿ��Ԫ��5��");
			im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�� 5 Ԫ����");
			im.dispose();
			} else {
			im.sendOk("��ȡʧ�ܣ������Ѿ���ȡ����");
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
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����ǰ���߻��ֲ���180�㡣");
				im.dispose();
            }
            break;
        case 1:
           if (im.getBossLog("���") < 1) { //���
            	im.gainNX(10000);
				im.setBossLog("���");
				im.sendOk("��ϲ����ȡ���10000��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC�������ȡÿ�� 10000 ���");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ�ʹ�ã����������ԡ�\r\n");
				im.dispose();
            }
            break;
        case 2:
           if (im.getPlayer().getCSPoints(1) > 10000) { //��Ա�ȼ�
				im.dispose();
				im.openNpc(9900001,9);
            } else {
                im.sendOk("����Ū���ء�����㻹��ʲô�����ٵ�ӵ��1����ſ���ʹ�á�");
				im.dispose();
            }
            break;
		case 7:
           if (im.getBossLog("����") < 1) { //����
            	im.gainItem(5211060,1,1);
				im.gainItem(5360015,1,1);
				im.setBossLog("����");
				im.sendOk("��ϲ����ȡVIP�����ÿ���������鿨һ���Լ�˫�����ʿ�.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ���������鿨�Լ�˫�����ʿ���");
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
            	im.gainItem(5064000,5);
		        im.gainItem(2340000,5);
				im.gainItem(5062500,5);
				im.gainItem(5062002,5);
				im.setBossLog("ħ��");
				im.sendOk("��ϲ����ȡ��Ʒ����ÿ����Ƶ��ߣ���ø߼�����ħ������ʦ������ħ�����������ᡢף������x5��");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ����Ƶ��ߡ�");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣");
				im.dispose();
            }
            break;
		case 11:
           if (im.getBossLog("����") < 1 && im.getPlayerPoints() > 180) { //����
            	im.gainPlayerPoints(200);
				im.setBossLog("����");
				im.sendOk("��ϲ����ȡVIP�����ÿ�ջ���200��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�ջ��� 200 �㡣");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����ǰ����ʱ�䲻��180���ӡ�");
				im.dispose();
            }
            break;
		case 12:
           if (im.getBossLog("����") < 1 && im.getPlayerPoints() > 180) { //����
            	im.gainPlayerEnergy(50);
				im.gainPlayerPoints(-180);
				im.setBossLog("����");
				im.sendOk("��ϲ����ȡVIP�����ÿ�ջ���50��.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC����ȡÿ�ջ��� 50 �㡣");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����ǰ���߻��ֲ���180�㡣");
				im.dispose();
            }
            break;
		case 10:
			var ii = im.getItemInfo();
           if (im.getBossLog("���") < 1 && im.getSpace(3) >= 1) { //
				im.setBossLog("���");
				im.gainItem(yz[chance], 1, 2 * 60 *60 * 1000);
				im.sendOk("�������2Сʱ�� #r#z"+yz[chance]+"##k ����.");
				im.worldSpouseMessage(0x20, "��������� ����� "+ im.getChar().getName() +" ������NPC������� " + ii.getName(yz[chance]) + " һ����");
				im.dispose();
            } else {
                im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣\r\n2). ����ǰ���߻��ֲ���1000�㡣");
				im.dispose();
            }
            break;
		case 4:
           if (im.getBossLog("���и�������") < 1) { //��������
				im.resetEventCount("�齱");
				im.resetEventCount("����");
				im.resetEventCount("����");
				im.resetEventCount("����");
				im.resetEventCount("����");
				im.resetEventCount("����");
				im.resetEventCount("���");
				im.resetEventCount("���յ�");
				im.resetBossLog("���յ�");
				im.resetBossLog("mrdb");
				im.resetBossLog("��������");
				im.resetBossLog("��ͨ����");
				im.resetBossLog("��ͨ����");
				im.resetBossLog("���׺���");
				im.resetBossLog("��ͨƤ����");
				im.resetBossLog("�����˹");
				im.resetBossLog("Կ��");
				im.resetBossLog("����Կ��");
				im.resetBossLog("����Ƥ����");
				im.resetBossLog("����Ʒ����");
				im.resetBossLog("ϣ��˹");
				im.resetBossLog("Ʒ����");
				im.resetBossLog("ʨ����");
				im.resetBossLog("���ױ���");
				im.resetBossLog("��ͨ����");
				im.resetBossLog("��ͨѪ��Ů��");
				im.resetBossLog("����Ѫ��Ů��");
				im.resetBossLog("����Ѫ��Ů��");
				im.setBossLog("���и�������");
				im.sendOk("��ϲ��ʹ��VIP��������������еĸ���.");
				im.worldSpouseMessage(0x20,"��������� ����� "+ im.getChar().getName() +" ������NPC��������ȫ����������");
				im.dispose();
            } else {
                im.sendOk("���Ѿ���ȡ�������������졣");
				im.dispose();
            }
            break;
		case 3:
           if (im.getMeso() > 10000) { //��ͼ����
				im.sendOk("�Һ󿪷ţ���������Ǯ������þ��ͼ.");
				im.dispose();
				//im.openNpc(9900001, 11);
            } else {
                im.sendOk("��Ҳ���1��");
				im.dispose();
            }
            break;
		case 13:
			if (im.getMeso() > 10000) { //��ͼ����
				im.dispose();
				im.sendOk("���ڿ��š�");
            } else {
                im.sendOk("��Ҳ���1��");
				im.dispose();
            }

	   break;
		case 14:
			if (im.getMeso() >= 100) {
				im.sendGetText("����100����Ϸ�ң���������Ҫ˵�Ļ���");
				typed = 14;
			} else {
				im.sendOk("��û��10000����Ϸ�ң����ܽ������纰����");
				im.dispose();
			}
			break;
		case 15:
			im.dispose();
			im.openNpc(9030000);
			break;
        }
    } else if (status == 2) {
		if (typed == 14) {
			im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			//im.worldSpouseMessage(0x01, "[����]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.gainMeso(-100);
			//im.dispose();
		}
		im.dispose();
        }
}
