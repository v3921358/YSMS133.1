var status = -1;
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var buyId = -1;
var item = null;
var itemList = Array(
	//���ߴ��룬����ȯ�������� ������-1Ϊ������
	Array(5062000, 3000, 1, 30),
	Array(5050000, 200000, 100, -1),
	Array(5062002, 3500, 1, 10),
	Array(5062500, 4500, 1, 10),
	Array(5062010, 10000, 1, 10),
	Array(5062009, 10000, 1, 5),
	Array(2340000, 20000, 1, 10),
	Array(5064000, 20000, 1, 10),
	//Array(2049116, 3000, 1, 10),
	//Array(2049124, 3000, 1, 10),
	Array(2049402, 6000, 1, 10),
	Array(2049704, 10000, 1, 1),
	Array(5076000, 1500, 1, -1),
	Array(5072000, 1200, 1, -1)
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = "��ӭ����#e#b�����̳�#k#n����ѡ����Ҫ�������Ʒ��������Ʒ�д�������Ŷ��\r\n";
		for(var key in itemList) {
			var itemid = itemList[key][0];
			var itemquantity = itemList[key][2];
			var limitcount = itemList[key][3];
			var price = itemList[key][1];
			text+="#L"+key+"#"+aaa+" #r"+price+"����ȯ#d����#b#z"+itemid+"# #d"+itemquantity+"��#k ";
			if (limitcount != -1) {
				var currentTimes = cm.getBossLogAcc("����ȯ"+cm.getItemName(itemid));
				if (currentTimes >= limitcount)
					text+="#r("+currentTimes+"/"+limitcount+"��)#k#l\r\n";
				else
					text+="#g("+currentTimes+"/"+limitcount+"��)#k#l\r\n";
			} else {
				text+="#l\r\n";
			}
		}
		cm.sendSimple(text);
		//cm.dispose();
	} else if (status == 1) {
		buyId = selection;
		item = itemList[buyId];
		var itemid = item[0];
		var itemquantity = item[2];
		var price = item[1];
		cm.sendYesNo("�Ƿ���Ҫ����#r"+price+"����ȯ#k����"+itemquantity+"��#b#z"+itemid+"##k��");
	} else if (status == 2) {
		var itemid = item[0];
		var itemquantity = item[2];
		var limitcount = item[3];
		var price = item[1];
		var currentTimes = cm.getBossLogAcc("����ȯ"+cm.getItemName(itemid));
		var myNx = cm.getPlayer().getCSPoints(2);
		if (myNx < price) {
			cm.sendOk("���ĵ���ȯ���㣬�޷���ɹ���");
			cm.dispose();
			return;
		}
		if (limitcount!=-1 && currentTimes>=limitcount) {
			cm.sendOk("�������޷��ٹ������Ʒ��");
			cm.dispose();
			return;
		}
		if (cm.getSpace(Math.floor(itemid/1000000))<=2) {
			cm.sendOk("���ı����ռ䲻�㣬���������ٹ���");
			cm.dispose();
			return; 
		}
		cm.gainItem(itemid, itemquantity);
		cm.gainNX(2, -price);
		if (limitcount!=-1) {
			cm.setBossLogAcc("����ȯ"+cm.getItemName(itemid))
		}
		cm.sendOk("��ϲ������ɹ���");
		cm.dispose();
	}
}