var status = 0;
var giftContent = Array(
	Array("�Ͱ��齱���", 100000, Array(
		Array(2430069, 5),//��ĸ��
		Array(4001833, 8)//ת��Ʊ
	)),

	Array("����ǿ�����", 100000, Array(
		Array(4034304, 100) //NENE����
	)),

	Array("ʱװǿ�����", 100000, Array(
		Array(4310023, 30) //���˵�ͭ��
	)),

	Array("����ǿ�����", 100000, Array(
		Array(5064000, 5),//������
		Array(2049116, 5),//�����
		Array(2049124, 5)//�����
	)),



	Array("�߼�ǿ�����", 280000, Array(
		Array(5064000, 50),//����
		Array(5062009, 50),//����ħ��
		Array(5062500, 50),//��ʦħ��
		Array(2049116, 20),//�����
		Array(2049124, 20)//�����
	)),

	Array("�Ķ�ǿ�����", 500000, Array(
		Array(2049323, 20),//����ǿ����
		Array(2340000, 20),//ף����
		Array(5062009, 200),//����ħ��
		Array(5062500, 100),//��ʦħ��
		Array(2049116, 30),//�����
		Array(2049124, 30)//�����
	)),

	Array("�Ķ��齱���", 500000, Array(
		Array(2430069, 30),//��ĸ��
		Array(4001833, 60)//ת��Ʊ
	)),




	Array("����ǿ�����", 1000000, Array(
		Array(2049323, 180) //����ǿ����
	)),

	Array("����ħ�����", 1000000, Array(
		Array(5750000, 300) //����ħ��
	)),

	Array("����ħ�����", 1000000, Array(
		Array(5062024, 100) //����ħ��
	)),

	Array("��ëǿ�����", 1000000, Array(
		Array(4033204, 200) //��ů����ë
	)),

	Array("ʵ��ս�����", 2000000, Array(
		Array(2049750, 5), //S��Ǳ�ܾ��� 80%
		Array(2049137, 100),//��������
		Array(2340000, 100),//ף��
		Array(5064000, 100),//����
		Array(2049323, 50),//����ǿ����
		Array(5062009, 300),//����ħ��
		Array(5062500, 300)//��ʦħ��
	)),

	Array("��ҫƷ�����", 2000000, Array(
		Array(5062009, 500),//����ħ��
		Array(5062500, 300),//��ʦħ��
		Array(2431944, 1),//140������
		Array(2431945, 1),//140������
		Array(2431945, 1),//140������
		Array(2431945, 1),//140������
		Array(2431945, 1),//140������
		Array(2431945, 1)//140������
	))

	/*Array("��ֵ�������", 3000000, Array(
		Array(3994417, 1),
		Array(3994418, 1),
		Array(3994419, 1),
		Array(3994420, 1),
		Array(3994421, 1),
		Array(3994422, 1)
	))*/
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
			text+="#b#L"+key+"#����#r#e"+giftContent[key][0]+"#n#b�� ��Ҫ�Ǳ� #e#d"+giftContent[key][1]+" #b�Ǳ�#n#b#l#k\r\n";
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
		text+="\r\n#d�Ƿ񻨷� #e#r"+price+"#n#d �Ǳҹ���������#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 10 || cm.getSpace(2) < 10 || cm.getSpace(3) < 10 || cm.getSpace(4) < 10 || cm.getSpace(5) < 10) {
				cm.sendOk("���ı����ռ䲻�㣬�뱣֤ÿ����λ����10��Ŀռ䣬�Ա�����ȡʧ�ܡ�");
				cm.dispose();
				return ;
			}
			if (cm.getRMB() < price) {
				//cm.sendOk("�����ǱҲ��㣬���ȳ�ֵ���ٹ���");
            cm.sendOk("#b��Ǹ,��û����ô��  �Ǳ�,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#r#e"+giftContent[key][0]+"#n#b�� ��Ҫ�Ǳ� #e#d"+giftContent[key][1]+" #bԪ ��");

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