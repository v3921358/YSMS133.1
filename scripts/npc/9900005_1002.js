var status = 0;
var bossid = "�ȼ����";
var giftLevel = Array(30,60,100,150,180,210,230,250);
var giftContent = Array(
	//Array(4032521, 1, 1), //VIP�����
	Array(4001714, 1, 1), //���ӽ�100W
	//60��
	Array(2615002, 10, 2), //�ͼ����յ¾���
	Array(2431098, 1, 2), //�ͼ����յ����
	Array(2431097, 1, 2), //�˺�Ƥ������
	Array(5062000, 2, 2), //����ħ��
	//Array()
	//100��
	Array(5150040, 3, 3), //�ʼ�����
	Array(5152053, 3, 3), //�ʼ����ݾ�
	//Array(2431741, 1, 3), //����ȯ3000
	//Array(5062000, 5, 3), //����ħ��
	Array(1072853, 1, 3),//����Ь��
	Array(1003946, 1, 3),//����ñ��
	Array(1102612, 1, 3),//��������
	Array(1082540, 1, 3),//��������
	Array(1052647, 1, 3),//����ս����
	//Array(4310088, 10, 4),//RED��
	//150��
	//Array(2431944, 1, 4), //140����������
	Array(2430226, 1, 4), //�Ҷ����
	Array(5062000, 5, 4),
	Array(2049124, 10, 4), //����
	Array(2049135, 2, 4), //��������20%2340000
	Array(2431741, 1, 4), //����ȯ3000
	Array(1132243, 1, 4), //�ͼ�����
	Array(1113072, 1, 4), //�ͼ�����
	//Array(4310030, 200, 4), //�˶����
	//Array(4000082, 30, 4), //��ʬ����
	//Array(4021012, 3, 4), //ǿ�����ľ�ˮ
	//Array(4021011, 3, 4), //�������Ļ�
	//Array(4021010, 3, 4), //ʱ��֮ʯ
	//180��
	Array(2431741, 1, 5), //����ȯ3000
	Array(4310129, 10, 5), //��������Ӳ��
	Array(5062002, 5, 5), //�߼�ħ��
	Array(5064000, 5, 5), //����
	Array(2049116, 10, 5), //ǿ��
	Array(2049135, 2, 5), //��������20%2340000
	Array(1032220, 1, 5),//�ͼ�����
	Array(1122264, 1, 5),//�ͼ�����
	//Array(4002000, 1, 5), //��ţ��Ʊ���һ����ʹ��
	//Array(4033356, 5, 5), //�������1
	//Array(4000124, 5, 5), //ս���������ڴ濨
	//Array(4310030, 200, 5), //�˶����
	//Array(4000082, 30, 5), //��ʬ����
	//Array(4021012, 3, 5), //ǿ�����ľ�ˮ
	//Array(4021011, 3, 5), //�������Ļ�
	//Array(4021010, 3, 5), //ʱ��֮ʯ
	//210��
	//Array(2431945, 1, 6), //140��������
	Array(5062000, 20, 6),
	Array(5062002, 20, 6),
	Array(5062500, 10, 6),
	Array(2431741, 1, 6), //����ȯ3000
	Array(4310129, 20, 6), //��������Ӳ��
	Array(4000517, 1, 6), //�ƽ��㣬����15%
	Array(4033924, 2, 6), //�񻰶�����ͼ
	Array(4001714, 10, 6),// ���ӽ�100W
	//Array(4033356, 5, 6), //�������1
	//Array(4000124, 5, 6), //ս���������ڴ濨
	Array(4310030, 30, 6), //�˶����
	//Array(4000082, 40, 6), //��ʬ����
	//Array(4021012, 3, 6), //ǿ�����ľ�ˮ
	//Array(4021011, 3, 6), //�������Ļ�
	//Array(4021010, 3, 6), //ʱ��֮ʯ
	//230��
	Array(2431945, 1, 7), //140��������
	//Array(2431945, 1, 7), //140��������
	Array(2431741, 1, 7), //����ȯ3000
	Array(4310129, 30, 7), //��������Ӳ��
	//Array(4002000, 1, 7), //��ţ��Ʊ���һ����ʹ��
	Array(5062000, 50, 7),
	Array(5062002, 50, 7),
	Array(5062500, 50, 7),
	Array(2049323, 2, 7),  //����
	Array(2049752, 2, 7),  //S Ǳ�� 30%
	Array(2049116, 20, 7), //��������20%2340000
	Array(2049124, 20, 7), //��������20%2340000
	Array(2049135, 5, 7), //��������20%2340000
	//Array(4310030, 300, 7), //�˶����
	//Array(4033356, 5, 7), //�������1
	//Array(4000124, 5, 7), //ս���������ڴ濨
	//Array(4000082, 50, 7), //��ʬ����
	//Array(4021012, 3, 7), //ǿ�����ľ�ˮ
	//Array(4021011, 3, 7), //�������Ļ�
	//Array(4021010, 3, 7), //ʱ��֮ʯ
	//Array(4310015, 1, 7), //����֤��
	//Array(4021019, 1, 7), //��֮ʯ
	//250��
	Array(2431938, 1, 8), //��Ц����������
	Array(3010879, 1, 8),
	Array(4001715, 10, 8),// ���ӽ�1E
	Array(5062000, 200, 8),
	Array(5062002, 200, 8),
	Array(5062500, 200, 8),
	Array(5064000, 100, 8),
	Array(4310129, 100, 8), //��������Ӳ��
	Array(2431995, 1, 8), //���˾�������
	Array(2431725, 1, 8) //����������������
	//Array(4310036, 3000, 8), //������
	//Array(4033356, 10, 8), //�������1
	//Array(4000124, 10, 8), //ս���������ڴ濨
	//Array(4000082, 50, 8), //��ʬ����
	//Array(4021012, 3, 8), //ǿ�����ľ�ˮ
	//Array(4021011, 3, 8), //�������Ļ�
	//Array(4021010, 3, 8), //ʱ��֮ʯ
	//Array(4310015, 2, 8) //����֤��
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
		text += "�٣���Ϊ��׼������౦��������ﵽ��Ӧ�ȼ���ʱ��Ϳ�����ȡ�ˣ����������Բ鿴��������أ������ȿ����ɣ�\r\n";
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