var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var RMB = 0;

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
			var selStr = "#d����ڣ�Dragon Boat Festival��Ϊÿ��ũ�����³��壬�ֳƶ����ڡ����սڡ����½ڵȡ��г����ӣ����ۻƾƣ������ѡ���ݡ���Ҷ��޹���������ƣ������۵�ϰ�ס�������й���������ߵĽ��գ��������Դ���й�������ʫ����ԭ����һ����ȥ��������й��������������ԭ�Ĵ�ͳ����#k\r\n\r\n#b������ʾ�����������ӣ��˸���Խ�ڷܻ�ø���Խ��#k\r\n9��-10��30��1�����Ӷһ�1������ħ��+1����ʦ����ħ��\r\n#b�ύ��������ǰ10�����⽱��150��³����˹����һ��#k\r\n10��30��ֹͣ�������ӣ����ץ��ʱ��\r\n\r\n";
			selStr +="#L1##r"+aaa+" �������ڰ����ӻ[�������鿴]#l#k\r\n"; 
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #d#e�Ҫ��#n#k\r\n\r\n#e#b����������Ҫ#z4032945#��#z4032952#��#z4032953#�� #r500 #b��#n#k\r\n#r(PS:6��20��-22�ջ�ڼ���г���,���ʣ��ܸ�)\r\n\r\n#b��ǰӵ��#z4032945#����Ϊ��         #r" + cm.getItemQuantity(4032945) + " / 500 ��\r\n#b��ǰӵ��#z4032952#����Ϊ��           #r" + cm.getItemQuantity(4032952) + " / 500 ��\r\n#b��ǰӵ��#z4032953#����Ϊ��           #r" + cm.getItemQuantity(4032953) + " / 500 ��\r\n\r\n#b��ǰ����õ����Ӹ���Ϊ�� #r" + cm.getItemQuantity(4001449) + " ��\r\n#b��ǰ�����Ѿ���õ��Ϊ�� #r"+(2000*cm.getBossLog("��������", 1))+" ��\r\n\r\n- #e#d������ʾ��#n#k#bÿ����һ�����ӻ�� #r2000#b ���");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4032945,500) && cm.haveItem(4032952,500) && cm.haveItem(4032953,500) && cm.getSpace(4) >= 1) {
			cm.gainItem(4032945, -500);
			cm.gainItem(4032952, -500);
			cm.gainItem(4032953, -500);
			cm.gainItem(4001449, 1);
			cm.gainNX(1, 2000);
			cm.setBossLog("��������", 1);
			cm.sendOk("#b�ɹ������һ�� #r����#b �� #r2000#b �������");
			cm.worldSpouseMessage(0x20, "���������������� : "+ cm.getChar().getName() +" �������ӻ��2000����ܹ������ "+(2000*cm.getBossLog("��������", 1))+" ���");
			cm.dispose();;
				} else {
			cm.sendOk("������Ʒ�������߱����ռ䲻��.");
			cm.dispose();
				}
           }
		}
	  }
	}