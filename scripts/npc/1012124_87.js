var status = 0;
var bossid = "�ȼ����";
var giftLevel = Array(100,150,180,210,220,230,240,250);
var giftContent = Array(
	//Array(4032521, 1, 1), //VIP�����
	//Array(4001714, 1, 1), //���ӽ�100W
	//60��
	//Array(2615002, 10, 2), //�ͼ����յ¾���
	//Array(2431098, 1, 2), //�ͼ����յ����
	//Array(2431097, 1, 2), //�˺�Ƥ������
	//Array(5062000, 2, 2), //����ħ��
	//Array()

	//100��
	Array(5150040, 3, 1), //�ʼ�������
	Array(5152053, 3, 1), //�ʼ����ݾ�
	//Array(1072853, 1, 1),//����Ь��
	//Array(1003946, 1, 1),//����ñ��
	//Array(1102612, 1, 1),//��������
	//Array(1082540, 1, 1),//��������
	//Array(1052647, 1, 1),//����ս����
	//Array(2432068, 1, 1),//����������
	//Array(4310088, 100, 1),//RED��
	Array(2431741, 2, 1), //����ȯ3000
	Array(4001839, 100, 1),//����
	Array(2049135, 5, 1), //��������20%2340000
	Array(4001714, 2, 1), //���ӽ�100W

	//150��
	//Array(2431944, 1, 4), //140����������
	//Array(2430226, 1, 2), //�Ҷ����
	Array(5150040, 5, 2), //�ʼ�������
	Array(5152053, 5, 2), //�ʼ����ݾ�
	Array(1132243, 1, 2), //�ͼ�����
	Array(1113072, 1, 2), //�ͼ�����
	Array(5062009, 100, 2),
	Array(4001839, 300, 2),//����
	Array(2049135, 10, 2), //��������20%2340000
	//Array(2049124, 2, 2), //����


	//180
	Array(2049135, 10, 3), //��������20%2340000
	Array(2431741, 3, 3), //����ȯ3000
	Array(2432836, 1, 3), 
	Array(5062009, 200, 3),
	Array(2049135, 20, 3), //��������20%2340000
	//Array(2433653, 3, 3),
	Array(1032220, 1,3),//�ͼ�����
	Array(1122264, 1, 3),//�ͼ�����
	Array(4001839, 500, 3),//����

       //210
	Array(2431944, 1, 4), //140����������
	Array(5150040, 10, 4), //�ʼ�������
	Array(5152053, 10, 4), //�ʼ����ݾ�
	Array(2431741, 1, 4), //����ȯ3000
	Array(5062009, 200, 4), //�߼�ħ��
	Array(5064000, 5, 4), //����
	//Array(2049116, 10, 4), //ǿ��
	Array(2049135, 30, 4), //��������20%2340000
	Array(2049124, 5, 4), //�������
	//Array(2433653, 5, 4),
	Array(4001839, 1000, 4),//����
	//Array(2431945, 1, 4), //140��������

	//220��

	//Array(2431945, 1, 5), //140��������
	Array(4001839, 5000, 5),//����
	Array(5150040, 20, 5), //�ʼ�������
	Array(5152053, 20, 5), //�ʼ����ݾ�
	Array(5062009, 300, 5),
	Array(5062500, 10, 5),
	Array(2049124, 10, 5), //�������
	Array(2049135, 50, 5), //��������20%2340000
	Array(2431741, 1, 5), //����ȯ3000
	//Array(4033924, 2, 5), //�񻰶�����ͼ
	Array(4001714, 50, 5),// ���ӽ�100W
	//Array(2433654, 2, 5),
	Array(3010592, 1, 5), 
	Array(1112915, 1, 5),
	//Array(2433654, 8, 5),

	//230
	Array(4001839, 10000, 6),//����
	Array(3010894, 1, 6),//һ������������
	Array(5062009, 500, 6),
	Array(5062500, 500, 6),
	Array(2049323, 20, 6),  //����
	Array(2049752, 3, 6),  //S Ǳ�� 30%
	Array(2431741, 5, 6), //����ȯ3000
	//Array(2431725, 1, 6), //����������������
	Array(2049124, 20, 6), //�������
	Array(2049135, 100, 6), //��������20%2340000
	Array(4001715, 2, 6),// ���ӽ�1E

	//240��
	Array(4001839, 20000, 7),//����
	Array(3010853, 1, 7),//�Ļ�ŭ������
	Array(5150040, 30, 7), //�ʼ�������
	Array(5152053, 30, 7), //�ʼ����ݾ�
	Array(2431725, 1, 7), //����������������
	//Array(2431945, 1, 7), //140��������
	//Array(2431945, 1, 7), //140��������
	Array(5062009, 500, 7),
	Array(5062500, 300, 7),
	Array(2431741, 50, 7), //����ȯ3000
	Array(4001715, 5, 7),// ���ӽ�1E
	//Array(5062000, 50, 7),
	//Array(5062002, 50, 7),
	//Array(5062500, 50, 7),
	Array(2049323, 20, 7),  //����
	Array(2049752, 10, 7),  //S Ǳ�� 30%
	//Array(2049116, 10, 7), //��������20%2340000
	Array(2049124, 30, 7), //�������
	Array(2049135, 200, 7), //��������20%2340000
	//Array(2433654, 10, 7),

	//250��
	Array(4001839, 20000, 8),//����
	Array(3015051, 1, 8),//���ްԹ��ʾ�������

	Array(2431938, 1, 8), //��Ц����������
	Array(5150040, 50, 8), //�ʼ�������
	Array(5152053, 50, 8), //�ʼ����ݾ�
	//Array(2433654, 30, 8),
	//Array(3010879, 1, 8),
	Array(4001715, 10, 8),// ���ӽ�1E
	Array(5062009, 1000, 8),
	Array(5062500, 500, 8),
	Array(5064000, 100, 8),
	Array(2049323, 50, 8),  //����
	Array(2049752, 20, 8),  //S Ǳ�� 30%
	Array(2049116, 50, 8), //ǿ������
	Array(2049124, 50, 8), //�������
	Array(2049135, 300, 8) //��������20%2340000
	//Array(2431995, 1, 8), //���˾�������


)
var giftId = -1;
var giftToken = Array();
var gifts = null;
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
		text += "�٣���Ϊ��׼�������౦��������ﵽ��Ӧ�ȼ���ʱ��Ϳ�����ȡ�ˣ����������Բ鿴��������أ������ȿ����ɣ�\r\n";
		for(var key in giftLevel) {
			var tips = "";
			giftToken[key]=false;
			if (cm.getChar().getLevel()>=giftLevel[key]) {
				if (cm.getBossLog(bossid+key) >= 0) {
					tips = "(����ȡ)";
					giftToken[key]=true;
				} else {
					tips = "#g(����ȡ)#b";
				}
			} else {
				tips = "#r(�ȼ�����)#b";
			}
			text+="#b#L"+(parseInt(key)+1)+"#��ȡ#r#e"+giftLevel[key]+"#n#b���ȼ���� "+tips+"#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text="#r#e"+giftLevel[giftId-1]+"#n#b��������ݣ�\r\n";
		gifts = getGift(giftId);
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#v"+itemId+"##b#t"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n#d�Ƿ����ھ���ȡ�������#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
				cm.sendOk("���ı����ռ䲻�㣬�뱣֤ÿ����λ����8��Ŀռ䣬�Ա�����ȡʧ�ܡ�");
				cm.dispose();
				return ;
			}
			if (giftToken[giftId-1]) {
				cm.setBossLog(bossid+(giftId-1),0,-2);
				for(var key in gifts) {
					var itemId = gifts[key][0];
					var itemQuantity = gifts[key][1];
					cm.gainItem(itemId, itemQuantity);
				}
				cm.sendOk("��ϲ������ȡ�ɹ�����򿪰��������ɣ�");
				cm.dispose();
			} else {
				status = -1;
				cm.sendSimple("���Ѿ�����˸�������ߵȼ�δ�ﵽҪ���޷���ȡ��");
			}
		} else {
			cm.sendOk("��ȡ��������ϵ����Ա��");
			cm.dispose();
		}
	}
}
function getGift(id) {
	var lastGiftContent = Array();
	for (var key in giftContent) {
		if (giftContent[key][2]==id)
			lastGiftContent.push(giftContent[key]);
	}
	return lastGiftContent;
}