var status = 0;
var giftContent = Array(


Array("����ǿ�����", 10000, Array(
Array(5064000, 1),//������3000��
Array(2049116, 1),//�����3000��
Array(2340000, 1),//ף����1500��
Array(2049323, 1),//����ǿ����3000��
Array(2049137, 1)//����40%3000��
//Array(2049124, 1)//�����3000���
	)),

Array("����Ǳ�����", 30000, Array(
Array(2049402, 1),
Array(2048307, 1)
	)),


Array("�߼�ǿ�����", 50000, Array(
Array(5064000, 6),//����
Array(2049116, 6),//�����
Array(2340000, 6),//ף����
Array(2049323, 6),//����ǿ����
Array(2049137, 6)//����40%
//Array(2049124, 3)//�����
	)),

Array("�Ķ�ǿ�����", 100000, Array(
Array(5064000, 13),//����
Array(2049323, 13),//����ǿ����
Array(2340000, 13),//ף����
Array(5062009, 50),//����ħ��
Array(5062500, 50),//��ʦħ��
Array(2049116, 13),//�����
Array(2049137, 13)//����40%
//Array(2049124, 1)//�����
	)),


Array("�߼�Ǳ�����", 100000, Array(
Array(2049402, 4),
Array(2048307, 4)
	)),



Array("����ħ�����", 100000, Array(
Array(5750000, 30) //����ħ��
	)),

Array("�����������", 100000, Array(
Array(2049137, 30) //��������40%
	)),

Array("����ǿ�����", 100000, Array(
Array(2049323, 40) //����ǿ����
	)),

Array("ʵ��ս�����", 300000, Array(
Array(2049750, 3), //S��Ǳ�ܾ��� 80%
Array(2049137, 10),//��������
Array(2049124, 10),//�����
Array(2340000, 30),//ף��
Array(5064000, 30),//����
Array(2049323, 30),//����ǿ����
Array(5062009, 100),//����ħ��
Array(5062500, 100),//��ʦħ��
Array(5750000, 10) //����ħ��
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
		text += "��ӭ����#r�������̳�#k��������Բ鿴�������Ŷ��\r\n";
		for(var key in giftContent) {
			text+="#b#L"+key+"#����#r#e"+giftContent[key][0]+"#n#b�� ��Ҫ��� #e#d"+giftContent[key][1]+" #b��#n#b#l#k\r\n";
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
		text+="\r\n#d�Ƿ񻨷� #e#r"+price+"#n#d �����������#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 10 || cm.getSpace(2) < 10 || cm.getSpace(3) < 10 || cm.getSpace(4) < 10 || 
cm.getSpace(5) < 10) {
				cm.sendOk("���ı����ռ䲻�㣬�뱣֤ÿ����λ����10��Ŀռ䣬�Ա�����ȡʧ�ܡ�");
				cm.dispose();
				return ;
			}
			if (cm.getPlayer().getCSPoints(1) < price) {
				cm.sendOk("���ĵ���㣬����׬ȡ�㹻�ĵ����ٹ���");
           // cm.sendOk("#b��Ǹ,��û����ô����,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#r#e"+giftContent[key][0]+"#n#b�� ��Ҫ��� #e#d"+giftContent[key][1]+" #b�� ��");

				cm.dispose();
				return ;
			}
			for(var key in gifts) {
				var itemId = gifts[key][0];
				var itemQuantity = gifts[key][1];
				cm.gainItem(itemId, itemQuantity);
			}
			cm.gainNX(-price);
			cm.sendOk("��ϲ��������ɹ���");
			cm.dispose();
		} else {
			cm.sendOk("�����������ϵ����Ա��");
			cm.dispose();
		}
	}
}