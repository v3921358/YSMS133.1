/*
	�ű����� ����ϵͳ
	���ߣ� Memory
*/
var status = 0;
var p;
//����ϴ������Ҫ�Ľ��
var needMeso = 100000000;
//����ϴ������Ҫ�ĵȼ�
var needLevel = 250;
//����ϴ�����
var maxReborns = 3;
//����ϴ���仯�ĵȼ�
var targetLevel = 180;
//����������ת��
var cn = Array('0','һ','��','��','��','��','��','��','��','��','ʮ');

function start() {
  	p = cm.getChar();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) { //ExitChat
        cm.dispose();
		return;
    } else if (mode == 0) { //No
        cm.sendOk("�õ�, ������׼����Ҫ���з���ϴ�����������Ұɣ�");
        cm.dispose();
	}
	if (mode == 1) {
        status++;
    } else {
        status--;
    }
        if (status == 0) {
            //var rebornsNum = maxReborns - cm.getBossLog("����");
            var text = "Ŷ���������ʿ#b"+cm.getName()+"#k�����Ƿ�����õ�����ǿ������������\r\n";
			text+="#b#L1#��ô�����ܽ��з�����#l\r\n";
			text+="#b#L2#��Ҫ���з���#l";
            cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 1) {
				var text ="#d#e����ǰ��׼����#n#k\r\n";
				text+="\t1.��Ҫ��ҽ�ɫ�ȼ��ﵽ#r250#k��\r\n";
				text+="\t2.��Ҫ�ڷ����������һ��#b��������#k\r\n";
				text+="\t3.��Ҫ�ռ�#r1000#k��RED��\r\n";
				text+="\t4.��Ҫһ��#bʥ��#k��ͨ������#b��������#k�м��ʻ���������\r\n";
				text+="\t5.��Ҫ��Ϸ�� #r"+needMeso+"#k\r\n";
				text+="#d#e�������˵����#n#k\r\n";
				text+="\t��������ҽ�ɫ�ȼ�����Ϊ"+targetLevel+"�������ҽ�����õ�10�����Ե㡣\r\n";
				text+="#d#e������Ľ�����#n#k\r\n";
				text+="\t�����󣬽����һ��#b��������#k��һ��#b150װ���������#k��";
				cm.sendOk(text);
				cm.dispose();
			} else {
				if (cm.getChar().getReborns1() >= maxReborns) {
					cm.sendOk("���Ѿ�ͻ�Ƶ���������߾��磬�����ٽ��з��������ˣ�");
					cm.dispose();
					return;
				}
				if (cm.getChar().getLevel() < needLevel) {
					cm.sendOk("�ܱ�Ǹ������Ҫ" + needLevel + "�����ſ��Խ��з���");
					cm.dispose();
				} else if (cm.getItemQuantity(4310088) < 1000) {
					cm.sendOk("��û�д���1000��#rRED��#k");
					cm.dispose();
				} else if (cm.getItemQuantity(4031454) < 1) {
					cm.sendOk("��û�д���#rʥ��#k");
					cm.dispose();
				} else if (cm.getMeso() < needMeso) {
					cm.sendOk("��û��" + needMeso + "���,�Ҳ��ܰ����æŶ.");
					cm.dispose();
				} else if (cm.getBossLog("��������") < 1) {
					cm.sendOk("�����������һֻ#r��������#k���ܽ��з�����")
					cm.dispose();
				} else {
					cm.sendYesNo("�����������Ȼ��������һ�ľ�����ţ����е������㶼�����ˣ������ھ�Ϊ�����ϴ�裬�������벻Ҫ���ۣ���Ϊ��֤�漣��ʱ�̾�Ҫ���ˣ�");
				}
			}
        }else if (status == 2) {
            //var ii = server.MapleItemInformationProvider().getInstance();
            //var toDrop = ii.randomizeStats(ii.getEquipById(4001129));
			/*
            var item = cm.getInventory(-1).getItem(-10);
            if (item != null) {
                if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull() == false) {
                    Packages.server.MapleInventoryManipulator.unequip(cm.getC(), -10, cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNextFreeSlot());
                } else {
                    cm.sendOk("����Ϊ���и���װ��,����װ����û�п�λ,�޷�Ϊ���ṩ��������!");
                    cm.dispose();
					return;
                }
            }
			*/
			
            cm.gainMeso(-needMeso);
			cm.gainItem(4310088, -1000); 
            cm.gainItem(2431725, 1); //����֤��
			cm.gainItem(2431988, 1);
			cm.gainItem(4031454, -1);
            //cm.gainNX(2, 10000); //���õ��
            //cm.clearSkills(); //������
            //cm.unequipEverything(); //��װ����䣬��Ҫ��ȥ��ǰ��ġ�//��
            cm.gainAp(10);
            p.setLevel(targetLevel);
            p.gainReborns(1); //ת�������¼
            //cm.getChar().setBossLog("����");
            //cm.fakeRelog(); //ˢ����������
			p.levelUp();
            p.saveToDB(false,false);
            cm.sendOk("��������ϲ�������ˣ����Ѿ������#r����ϴ��#k��");
            cm.channelMessage(0x09, "������ϵͳ��" + " : " + "��ϲ" + cm.getChar().getName() + ",ͻ���˵�" + cn[cm.getChar().getReborns1()] + "�����,���ֱ�ǿ����,�����Ľ���ʺް�!");
            cm.dispose();
    	}
}