var status = -1;
var cal = java.util.Calendar.getInstance();
var weekMark = cal.get(java.util.Calendar.WEEK_OF_YEAR);
var year = cal.get(java.util.Calendar.YEAR);
var bossId = "";

//��ȡ�������б�
var gifts = Array(
	//��ƷID�� ����
	Array(4001839, 3000),
	Array(5750000, 20),
	Array(5062500, 200),
	Array(2340000, 20),
	Array(2049750, 1),
	Array(4310119, 5),
	Array(2049122, 5),
	Array(5062009, 500)


);
//�����ĵ������, ����Ϊ0�򲻽���
var giftAcash = 30000;
//�����ĵ���ȯ����, ����Ϊ0�򲻽���
var giftMpoints = 50000;
//��������Ϸ������, ����Ϊ0�򲻽���
var giftMeso = 30000000;

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
		/* ��������BossLog */
		bossId = year+"-"+weekMark+"��֤����";
		var text = "ֻҪ��ӵ�����ǵ���֤ѫ��ÿ�ܶ�����������ȡ�ḻ����\r\n\r\n";
		text += "#b��֤ȫ����+30��#i1142796#��#i1142574#��Ҫ�ۼƳ�ֵ500Ԫ#k\r\n";
		//text += "#nѫ������;����/����/����/����/����/ħ��/BOSS�˸� #r30#k#n\r\n";
		text += "#r��֤������ #i1142574#��Ҫ��ͷ���Ƶ�Լ�������3��#k\r\n";
		text += "#b�װ��ĵ����ң���֤����������ÿ����ȡ���½�����#n\r\n";
		text += "#r��� x 30,000 ���þ� x 50,000  ��� x 30,000,000\r\n";
		text += "#i4001839# x 3000 #i5750000# x 30 #i5062500# x 200 #i2340000# x 20\r\n#i2049750# x 1   #i4310119# x 5   #i2049122# x 5  #i5062009# x 500\r\n;"
		text += "#b#L1#���Ѿ���֤����ȡ���ܵķḻ����#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 1) {
			/* �Ƿ������ӵ�йٷ���֤ѫ�� */
			if (cm.haveItem(1142574) || cm.haveItem(1142796) || cm.getPlayer().getMedalText().indexOf("�ٷ���֤")!=-1) {
				/* ������ȡ���� */
				if (cm.getBossLogAcc(bossId) != -1) {
					/* �����¼ */
					cm.setBossLogAcc(bossId, -2); 
					/* ��ȡ���� */
					var text = "��ϲ�����ɹ���ȡ���½�����\r\n";
					if (giftAcash != 0) {
						cm.gainNX(1, giftAcash);
						text+="��� #bx"+giftAcash+"#k\r\n";
					}
					if (giftMpoints !=0) {
						cm.gainNX(2, giftMpoints);
						text+="����ȯ #bx"+giftMpoints+"#k\r\n";
					}
					if (giftMeso !=0) {
						cm.gainMeso(giftMeso);
						text+="��Ϸ�� #bx"+giftMeso+"#k\r\n";
					}
					/* ������Ʒ���� */
					for(var i in gifts) {
						var itemid = gifts[i][0];
						var quantity = gifts[i][1];
						cm.gainItem(itemid, quantity);
						text+="#t"+itemid+"# #bx"+quantity+"#k\r\n";
					}
					cm.sendOk(text);
					cm.worldSpouseMessage(0x23, "���ٷ���֤������ : " + cm.getChar().getName() + " ���г���ױ����ȡ��ÿ�ܴ������߽���.");
					cm.dispose();
				} else {
					cm.sendOk("���Ѿ���ȡ�����ܵĽ�����������������");
					cm.dispose();
				}
			} else {
				cm.sendOk("�����û��ӵ�йٷ���֤ѫ�£��޷���ȡ������");
				cm.dispose();
			}
		} else {
			cm.sendOk("�ű���������ϵ����Ա��");
			cm.dispose();
		}
	}
}