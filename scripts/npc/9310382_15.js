var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
	cm.sendSimpleS("#b>>> #e#d��ӭʹ������Ǯׯ,#b��ܰ��ʾ��#r1Ԫ=1���Ǳ�#b <<<#k\r\n#b����ǰ���Ǳ���Ϊ�� #r"+cm.getRMB()+" #b�Ǳ�  #k\r\n\r\n#b#L1#      "+aaa+" �鿴��ȡ����#l\r\n\r\n" ,2);        	
} else if (status == 1) {
	if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #d��ǰ����ȡ���и�����\r\n#b�Ǳ� #r x  90000 �Ǳ�\r\n#b#z4001465# x 100 ��      #d(�Ϲ����Ž�ָ��������)#k\r\n#b#z4034304# x 30 ��       #d(����ǿ������Ҫ�ĵ���)#k\r\n#b#z5062009# x 100 ��  #d(װ��SS������Ҫ�ĵ���)\r\n#b#z5064000# x 10 ��       #d(��ֹװ���ұ���Ҫ�ĵ���)\r\n#b#z4033204# x 10 ��     #d(���׳������Ҫ�ĵ���)\r\n#b#z4310036# x 100         #d(�һ�װ������Ҫ�ĵ���)\r\n#b#z4310023# x 30       #d(ʱװ��������Ҫ�ĵ���)\r\n#b#z4310108# x 30      #d(�һ���������Ҫ�ĵ���)\r\n#b#z2340000# x 10          #d(��ֹʧ�ܼ�����������)\r\n#b#z4033611# x 3       #d(�Ĵ������������Կ��)\r\n#b��� x 30,000,000      #d(��Ϸ���ʵ������ҽ���)\r\n#b��� x 15,000          #d(����������ߵ�װ)#k");

			}
		} else if (status == 2) {
			if(typed==1){
 if (cm.getSpace(4) < 8) {
cm.sendOk("#e#r��������ı����������ճ�8����λ��"); 
cm.dispose();
} else if (cm.getSpace(5) < 3){
cm.sendOk("#e#r��������ı����������ճ�3����λ��");
cm.dispose();
} else if (cm.getSpace(2) < 3) { 
cm.sendOk("#e#r��������ı����������ճ�3����λ��");
cm.dispose();
}  else if (cm.getBossLog("����") < 1) {
cm.gainItem(4001465, 100);//���ı�ʯ���Ϲ����Ž�ָʹ��
cm.gainItem(4034304, 30);//NENE����,����ǿ����Ҫ�ĵ���
cm.gainItem(5062009, 100);//����ħ��
cm.gainItem(5064000, 10);//��������
cm.gainItem(4033204, 10);//��ů����ë��������ʹ��
cm.gainItem(4310036, 100);//�����߱�
cm.gainItem(4310023, 30);//���˵�ͭ��ʱװ����ʹ��
//cm.gainItem(4033943, 30);//ħ������ʱȡ������Ʒ���ͣ�
cm.gainItem(4310108, 30);//ð�յ�����ң��һ�����ָ����Ҫ�ĵ���
cm.gainItem(2340000, 10);//ף������
cm.gainItem(4033611, 3);//����Կ��
cm.gainMeso(30000000);//���
cm.gainNX(1, 15000);//���
cm.gainRMB(90000);//�Ǳ�
cm.setBossLog("����");
cm.sendOk("�ɹ���ȡ��9���Ǳ��Լ���������.");
cm.worldSpouseMessage(0x24, "������Ǯׯ�� : ��ϲ " + cm.getChar().getName() + " ������Ǯׯ����ȡ��9���Ǳ��Լ���������.");
       } else {
        cm.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ�������������졣");
		cm.dispose();
            }

			cm.dispose();


           }
      }
   }
 }