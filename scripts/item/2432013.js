//Ů��֮��
var status = 0;
var itemPosition=0;
//�����ɹ���
var rate = 90;
//�ɹ��ʵĵݼ�ֵ
var decreaseRate = 20;
//�������ĵĸ���
var expendNum = 10;
var typed = 0;

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
		var text = "������ʲô��\r\n";
		text+= "#b#L1#�����񻰶���#l\r\n";
		text+= "#b#L2#�ϳ�Ů��֮Ѫ��#l\r\n";
		im.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			typed = 1;
			if (!im.haveItem(2432013, expendNum))
			{
				im.sendOk("����Ҫ"+expendNum+"��#bŮ��֮��#k�ſ��Խ����񻰶�������");
				im.dispose();
				return;
			}
			var itemList = im.getInventory(1).list().iterator();
			var text = "��ѡ����Ҫ�����Ķ�����\r\n";
			var indexof = 0;
			while(itemList.hasNext()) {
				var item = itemList.next();
				var flag = false;
				switch(item.getItemId()) {
					case 1032205: // �񻰶��� - (������)
					case 1032206: // �񻰶�����ԭ��1�׶� - (������)
					case 1032207: // �񻰶�����ԭ��2�׶� - (������)
					case 1032208: // �񻰶�����ԭ��3�׶� - (������)
					case 1032209: // �񻰶�����ԭ��4�׶� - (������)
						flag = true;
						break;
					//1032219 // ����֮�񻰶��� - (������)
				}
				if (!flag)
					continue;
				if (indexof > 1 && indexof % 5 == 0) {
					text += "\r\n";
				}
				indexof++;
				text += "#L"+item.getPosition()+"##v"+item.getItemId()+"##l";
			}
			text+="\r\n\r\n#d��ͬ��ԭ�̶�����ʱ�ɹ��ʲ�ͬ��ʧ��ʱװ������";
			if (indexof==0)
				text = "û�п��Խ����������񻰶���";
			im.sendSimple(text);
		} else if (selection == 2) {
			typed = 2;
			if (!im.haveItem(2432013, 100))
			{
				im.sendOk("��û��#r100#k��Ů��֮�ᣬ�޷����кϳɣ�");
				im.dispose();
				return;
			}
			im.sendYesNo("�Ƿ�ʹ��#r100#k��#bŮ��֮��#k�ϳ�һ��#rŮ��֮Ѫ��#k��");
		}
	} else if (status == 2) {
		if (typed == 1) {
			itemPosition = selection;
			itemId = im.getInventory(1).getItem(itemPosition).getItemId();
			if (itemId == 1032209) {
				im.sendOk("#b�񻰶�����ԭ��4�׶�#k��Ҫ#rŮ��֮Ѫ��#k���ܽ�������.");
				im.dispose();
				return;
			}
			var chance = Math.floor(Math.random()*100);
			rate = rate-(Math.floor(itemId%1032200)-5)*decreaseRate;
			//java.lang.System.out.println(rate);
			if (chance <= rate) {
			//�ɹ�
				var upgradeItemId = (itemId == 1032209) ? parseInt(itemId)+10 : parseInt(itemId)+1;
				im.removeSlot(1, itemPosition, 1);
				im.gainItem(upgradeItemId, 1);
				if (upgradeItemId == 1032219)
					im.worldSpouseMessage(0x15, "[�񻰶���] : ��ϲ " + im.getChar().getName() + " �ɹ��� �񻰶�����ԭ��4�׶� ����Ϊ ����֮�񻰶�����");
				im.sendOk("��ϲ�㣬�õ���#v"+upgradeItemId+"#");
			} else {
			//ʧ��
				im.sendOk("���ź�������ʧ���ˡ�");
			}
			im.gainItem(2432013, -expendNum);
			im.safeDispose();
		} else if (typed==2) {
			im.gainItem(2432013, -100);
			im.gainItem(2432014, 1);
			im.sendOk("��ϲ������һ��#b#v2432014##t2432014##k��");
			im.safeDispose();
		}
	}
}