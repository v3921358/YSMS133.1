var status = 0;
var typed = 0;
var typed2 = 0;
var myRmb;
var zhongjiebi = 3991014;

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
            var text = "#d����ǰӵ�е�ȯ��  #r" + cm.getNX(1) + "#k #d��\r\n#����ǰӵ�е���ȯ��  #r" + cm.getNX(2) + "#d#k ��#k\r\n\r\n";
			//text+="��������������ʹ�õ�ȯ�һ��н�һ����н�Ҷһ���ȯ��#k\r\n";
			text+="#b#L1#��ȯ�һ��н��#l \r\n#L2#�н�Ҷһ���ȯ#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			typed = selection;
			if (typed == 1) {
				cm.sendSimple("#b#L1#ʹ�õ�ȯ�һ�#l\r\n#L2#ʹ�õ���ȯ�һ�#l");
			} else {
				cm.sendGetText("#b���н�Ҷһ���ȯ�� 1���н��:2000��#k\r\n\r\n����ǰ��#r"+cm.getItemQuantity(zhongjiebi)+"#k���н�ң���������Ҫ�һ���#r�н��#k������");
			}
			
		} else if (status == 2) {
			typed2 = selection;
			if (typed == 1) {
				cm.sendGetText("#b��" + (typed2 == 1 ? "��ȯ" : "����ȯ") + "�һ��н�ҡ� 2000��:1���н��#k\r\n\r\n����ǰ��#r"+cm.getNX(typed2)+"#k" + (typed2 == 1 ? "��ȯ" : "����ȯ") + "����������Ҫ�һ���#r�н��#k������");
			} else {
				if (typed2 == 1) {
					cm.sendOk("Ŀǰֻ���õ���ȯ�һ��н�ң���ȯ�һ���δ���š�");
					cm.dispose();
					return;
				}

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

				if (cm.haveItem(zhongjiebi, ybNum)) {
					cm.gainItem(zhongjiebi, -ybNum);
					cm.gainNX(typed2, ybNum*2000);
					cm.sendOk("�һ��ɹ�");
					cm.dispose();
				} else {
					cm.sendOk("��û����ô���н��");
					cm.dispose();
				}
			}
		} else if (status == 3) {
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
				if (cm.getPlayer().getCSPoints(typed2) >= (ybNum*2000)) {
					if (cm.getSpace(4) >= 1) {
						cm.gainNX(typed2, -ybNum*2000);
						cm.gainItem(zhongjiebi, ybNum);
						cm.sendOk("�һ��ɹ�");
						cm.dispose();
					} else {
						cm.sendOk("�����ռ䲻��");
						cm.dispose();
					}
				} else {
					cm.sendOk("��û����ô���ȯ");
					cm.dispose();
				}
			}
		}
   }
}