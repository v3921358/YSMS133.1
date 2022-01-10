var status = -1;
var typed = 0;
var transId = 4001485;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = "�װ���#b#e#h ##n#k����ӭ�������Ԫ���н�������Ҫʲô������\r\n\r\n";
		text+="\t��ǰ�����#r"+cm.getPlayer().getCSPoints(1)+"#k��\r\n";
		text+="\t��ǰ#t"+transId+"#������#r"+cm.getItemQuantity(transId)+"#k��\r\n\r\n";
		text+="#b#L3#�˽���Ԫ���н�˵��#l\r\n";
		text+="#L1#����Ԫ���һ����#l\r\n";
		text+="#L2#���һ�����Ԫ��#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		typed = selection;
		if (selection == 3) {
			status = -1;
			cm.sendSimple("1��#b#t"+transId+"##k���Զһ�#r900���#k��#r1000���#k���Զһ�1��#b#t"+transId+"##k��#b#t"+transId+"##k���������֮��Ľ����뷷�ۡ�");
		} else if (selection == 1) {
			var maxTimes = cm.getItemQuantity(transId);
			cm.sendGetNumber("#d#e<����Ԫ���һ����>#n#k\r\n��ǰ�����Զһ�#r"+(maxTimes*900)+"#k����������#r"+maxTimes+"#k��\r\n������һ���#b#t"+transId+"##k����:\r\n�һ�����Ϊ 1 : 900\r\n", 1, 1, maxTimes);
		} else if (selection == 2) {
			var maxTimes = Math.floor(cm.getPlayer().getCSPoints(1)/1000);
			if (maxTimes>300)
				maxTimes = 300;
			cm.sendGetNumber("#d#e<���һ�����Ԫ��>#n#k\r\n���������Զһ�#r"+maxTimes+"#k��#b#t"+transId+"##k\r\n������һ���#b#t"+transId+"##k����:\r\n�һ�����Ϊ 1000 : 1\r\n", 1, 1, maxTimes);
		}
	} else if (status == 2) {
		var quantity = Math.floor(selection);
		if (quantity <= 0) {
			cm.sendOk("Error");
			cm.dispose();
			return;
		}
		if (typed == 1) {
			if (cm.haveItem(transId, quantity)) {
				status=-1;
				var nx = 900*quantity;
				cm.gainItem(transId, -quantity);
				cm.gainNX(nx);
				cm.sendSimple("�ɹ��һ���#r"+nx+"#k���");
			} else {
				cm.sendOk("�����û����ô��#b#t"+transId+"##kŶ��");
				cm.dispose();
			}
		} else if (typed == 2) {
			if (cm.getSpace(4)<1) {
				status = -1;
				cm.sendSimple("���ı����ռ䲻�㣬�����������������Ŀռ䡣");
			} else {
				var maxNumber = quantity*1000;
				if (cm.getPlayer().getCSPoints(1)>=maxNumber) {
					status =-1;
					cm.gainItem(transId, quantity);
					cm.gainNX(-maxNumber);
					cm.sendSimple("�ɹ��һ���#r"+quantity+"#k������Ԫ��");
				} else {
					cm.sendOk("�����û����ô����Ŷ��");
					cm.dispose();
				}
			}
		}
	}
}