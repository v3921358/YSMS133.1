/*
 �ű����ܣ������ű�V2��
 */

var a = 0;


//�Ƿ������֣�ģʽ�����

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
       		cm.sendNext("��ã�������������Խ��������ϳɣ����˽�һ����\r\n\r\n#d#e#L1#�������˽�һ��#l\r\n#L2##r��Ҫ���кϳ�#k#l");
		} else if (a == 1) {
			if (selection==1) {
				cm.sendPrev("�����ϳ�ϵͳֻ��150�������ϵ�������#r����������������ͬ#k���ϳɲ���Ӱ����װ�������ԣ��ϳ�ʱ���뽫#e#d������#k#n���������ϣ���#d#e������#n#k����װ�����ĵ�һ�񣬺ϳ�������Ϊ5�Σ�#r\r\n��һ�εĳɹ���Ϊ#b100%#r����������#b20#r��\r\n�ڶ��εĳɹ���Ϊ#b80%#r����������#b30#r��\r\n�����εĳɹ���Ϊ#b70%#r����������#b50#r��\r\n���Ĵεĳɹ���Ϊ#b50%#r����������#b80#r��\r\n����γɹ���Ϊ#b30%#r����������#b120#r��\r\n\r\n#e* �ϳ���ϣ����۳ɹ�ʧ�ܣ���װ������ʧ");
				cm.dispose();
			} else if (selection == 2) {
				cm.sendYesNo("�ϳɴ��ڷ��գ����Ƿ��Ѿ��Ķ���ʹ��˵�����Ƿ�������кϳɣ�");
			}
        } else if (a==2){
			
			//cm.changeStat(-11, 6, 999);
		  //cm.getPlayer().equipChanged();
			var equip = cm.getInventory(-1).getItem(-11);
			if (equip==null) {
				cm.sendOk("�뽫���������������ϣ�������������װ�����ĵ�һ��");
				cm.dispose();
				return ;
			}
			var itemMyId = equip.getItemId();
			var itemMyLevel = cm.getReqLevel(itemMyId);
			var oid = equip.getEquipOnlyId();
			var count = cm.getBossLog("�����ϳ�"+oid);
			if (itemMyLevel < 150) {
				cm.sendOk(itemMyLevel+"������������������������150�������ϵ��������ܽ��кϳɡ�");
				cm.dispose();
				return ;
			}
			if (count >= 5) {
				cm.sendOk("����ǰ�������Ѿ��ﵽ���ϳ����ޣ������ټ����ϳ��ˡ�");
				cm.dispose();
				return ;
			}
			var itemFirst = cm.getInventory(1).getItem(1);
			if (itemFirst == null) {
				cm.sendOk("��Ѹ������ŵ�װ������һ��");
				cm.dispose();
				return ;
			}
			var itemFirstId = itemFirst.getItemId();
			if (itemFirstId != itemMyId) {
				cm.sendOk("���������������Ͳ�ͬ���޷����кϳɡ����飺\r\n\r\n#r1.�������Ƿ��Ѿ�����������\r\n2.�������Ƿ������װ�����ĵ�һ��");
				cm.dispose();
				return ;
			}
			var successRate = false;
			var upAtk = 0;
			var randomRate = Math.floor(Math.random()*100);
			switch(count) {
				case 0:
					successRate=true;
					upAtk = 20;
				break;
				case 1:
					if (randomRate<80) {
						successRate=true;
					}
					upAtk = 30;
				break;
				case 2:
					if (randomRate<70) {
						successRate=true;
					}
					upAtk = 50;
				break;
				case 3:
					if (randomRate<50) {
						successRate=true;
					}
					upAtk = 80;
				break;
				case 4:
					if (randomRate<30) {
						successRate=true;
					}
					upAtk = 120;
				break;
			}
			cm.removeItem(1, 1, 1);
			if (successRate) {
				var item = equip.copy();
				var Watk = item.getWatk();
				var Matk = item.getMatk();
			 // cm.sendOk(oid+" "+itemMyId+" "+itemFirstId+" "+Watk);
			 	cm.setBossLog("�����ϳ�"+oid, 1);
				if (Watk>Matk) {
					cm.changeStat(-11, 6, Watk+upAtk);
				} else {
					cm.changeStat(-11, 7, Matk+upAtk);
				}
				cm.sendOk("�ϳɳɹ��ˣ��쿴����");
				cm.worldMessage(0x18, "�������ϳɡ� : ��ϲ " + cm.getChar().getName() + " ��"+(count+1)+"�γɹ��ϳ����� "+cm.getItemName(itemMyId));
				cm.dispose();
			} else {
				cm.sendOk("�治�ң��ϳ�ʧ���ˣ���������ʧ�ˡ�");
				cm.dispose();
			}
		}
    }//mode
}//f

