var status = 0;
var typed = 0;
var myRmb;
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
			cm.sendOk("�ù����ݲ�����...");
			cm.dispose();
			return;
			var text = "����ǰ�ĵ������Ϊ��#r"+cm.getPlayer().getCSPoints(1)+"#k��\r\n\r\n";
			//text+="��������������ʹ�õ��һ��н�һ����н�Ҷһ����#k\r\n";
			text+="#b#L1#���һ��н��#l \r\n#L2#�н�Ҷһ����#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 1) {
				cm.sendGetText("#b�����һ��н�ҡ� 1000��:1���н��#k\r\n\r\n����ǰ��#r"+cm.getPlayer().getCSPoints(1)+"#k������������Ҫ�һ���#r�н��#k������");
				typed = 1;
			} else if (selection == 2) {
				cm.sendGetText("#b���н�Ҷһ���� 1���н��:950��#k\r\n\r\n����ǰ��#r"+cm.getItemQuantity(4000463)+"#k���н�ң���������Ҫ�һ���#r�н��#k������");
				typed = 2;
			}
			//cm.dispose();
		} else if (status == 2) {
			var ybNum = Math.floor(cm.getText()*1);
			if (isNaN(ybNum)){
				cm.sendOk("�ܱ�Ǹ������ֻ��Ϊ#r����#k��������ȷ�Ϻ��ѯ��");
				cm.dispose();
				return;
			}
			if (ybNum<=0) {
				cm.sendOk("���������0�����֣�");
				cm.dispose();
				return;
			}
			if (ybNum>10000) {
				cm.sendOk("ÿ���������10000���뷵����������");
				cm.dispose();
				return;
			}
			if (typed == 1) {
				if (cm.getPlayer().getCSPoints(1) >= (ybNum*1000)) {
					if (cm.getSpace(4) >= 1) {
						cm.gainNX(1, -ybNum*1000);
						cm.gainItem(4000463, ybNum);
						cm.sendOk("�һ��ɹ�");
						cm.dispose();
					} else {
						cm.sendOk("�����ռ䲻��");
						cm.dispose();
					}
				} else {
					cm.sendOk("��û����ô����");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.haveItem(4000463, ybNum)) {
					cm.gainItem(4000463, -ybNum);
					cm.gainNX(1, ybNum*950);
					cm.sendOk("�һ��ɹ�");
					cm.dispose();
				} else {
					cm.sendOk("��û����ô���н��");
					cm.dispose();
				}
			}
		}
   }
}