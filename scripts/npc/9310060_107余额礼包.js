var status = 0;
var giftContent = Array(
	Array("�Ͱ��齱���", 50, Array(
		Array(2430640, 10),
		Array(2430051, 2),
		Array(2430069, 100),
		Array(2432353, 200)
	)), 
	Array("����ǿ�����", 10, Array(
		Array(5064000, 10),
		Array(2049116, 10),
		Array(2049124, 10)
	)),
	Array("�߼�ǿ�����", 38, Array(
		Array(5064000, 50),
		Array(5062009, 50),
		Array(5062500, 50)
	)),
	Array("�Ķ�ǿ�����", 50, Array(
		Array(2049323, 20),
		Array(2340000, 20),
		Array(5062009, 50),
		Array(5062500, 50),
		Array(2049116, 20),
		Array(2049124, 20)
	)),
	Array("�������������", 200, Array(
		Array(4310129, 4000),
		Array(4000517, 5),
		Array(2431945, 1),
		Array(5062009, 10),
		Array(5062500, 10),
		Array(5064000, 10)
	)),
	Array("ʵ��ս�����", 220, Array(
		Array(2049135, 100),
		Array(2340000, 100),
		Array(5064000, 100),
		Array(5062009, 300),
		Array(5062500, 300)
	)),
	Array("��ҫƷ�����", 200, Array(
		Array(5062009, 50),
		Array(2431944, 1),
		Array(2431944, 1),
		Array(2431944, 1),
		Array(2431945, 1),
		Array(2431945, 1),
		Array(2431945, 1)
	)),
	Array("��ֵ�������", 320, Array(
		Array(2049750, 1),
		Array(5062009, 50),
		Array(3994417, 1),
		Array(3994418, 1),
		Array(3994419, 1),
		Array(3994420, 1),
		Array(3994421, 1),
		Array(3994422, 1)
	))
);
var giftId = -1;
var gifts = null;
var price = 999;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		var text = "";
		text += "��ӭ��������̳ǣ�������Բ鿴�������Ŷ��\r\n";
		for(var key in giftContent) {
			text+="#b#L"+key+"#����#r#e"+giftContent[key][0]+"#n#b�� ��Ҫ��� #e#d"+giftContent[key][1]+" #bԪ#n#b#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		price = giftContent[giftId][1];
		gifts = giftContent[giftId][2];
		var text="#r#e"+giftContent[giftId][0]+"#n#b���ݣ�\r\n";
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#i"+itemId+":##b#z"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n#d�Ƿ񻨷� #e#r"+price+"#n#d Ԫ����������#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 10 || cm.getSpace(2) < 10 || cm.getSpace(3) < 10 || cm.getSpace(4) < 10 || cm.getSpace(5) < 10) {
				cm.sendOk("���ı����ռ䲻�㣬�뱣֤ÿ����λ����10��Ŀռ䣬�Ա�����ȡʧ�ܡ�");
				cm.dispose();
				return ;
			}
			if (cm.getRMB() < price) {
				cm.sendOk("�������㣬���ȳ�ֵ���ٹ���");
				cm.dispose();
				return ;
			}
			for(var key in gifts) {
				var itemId = gifts[key][0];
				var itemQuantity = gifts[key][1];
				cm.gainItem(itemId, itemQuantity);
			}
			cm.gainRMB(-price);
			cm.sendOk("��ϲ��������ɹ���");
			cm.dispose();
		} else {
			cm.sendOk("�����������ϵ����Ա��");
			cm.dispose();
		}
	}
}