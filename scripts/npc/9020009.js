var status = -1;
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#"; //��ȡ���
var pfb = new Array(5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6);
var randb = Math.floor(Math.random() * pfb.length);
var pfa = new Array(7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9);
var randa = Math.floor(Math.random() * pfa.length);
var pff = new Array(10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 10, 10, 10, 10);
var randf = Math.floor(Math.random() * pff.length);
var pfs = new Array(13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 14, 13);
var rands = Math.floor(Math.random() * pfs.length);

function action(mode, type, selection) {
	var em = cm.getEventManager("szsl");
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
		}
		status--;
	}
	if (em.getProperty("state1").equals("1") == true) {
		var hccj = "ͨ������ #e#rS#k#n";
	} else if (em.getProperty("state1").equals("2") == true) {
		var hccj = "ͨ������ #bF#k";
	} else if (em.getProperty("state1").equals("3") == true) {
		var hccj = "ͨ������ #bA#k";
	} else if (em.getProperty("state1").equals("4") == true) {
		var hccj = "ͨ������ #bB#k";
	} else {
		var hccj = "ͨ������ #r������#k";
	}
	if (status == 0) {
		if (cm.getPlayer().getMapId() != 940021000) {
			cm.sendOk("��Ԫ�Ľ��������������");
			cm.dispose();
		} else {
			cm.sendSimple("���Ǵ˴�С��ţ����" + hccj + "\r\nͨ������ #bB#k �ȼ�������1 ��#t2431716# #t5062002#x1\r\nͨ������ #bA#k �ȼ�������3 ��#t2431716# #t5062002#x3\r\nͨ������ #bF#k �ȼ�������5 ��#t2431716# #t5062002#x5\r\nͨ������ #e#rS#n#k �ȼ�������10 ��#t2431716# #t5062002#x10\r\n#L0##b��ȡ�������˳�#l");
		}
	} else if (status == 1) {
		if (selection == 0) {
			java.lang.System.out.println("=====================111111111111==================");
			if (cm.getEventCount("szsl") <= 0) {
				p = cm.getChar();
				java.lang.System.out.println("=====================22222222222222222==================");
				if (em.getProperty("state1").equals("1") == true) {
					cm.gainItem(5062009, 30);
					cm.gainItem(5062500, 30);
					cm.warp(100000000, 0);
					cm.setEventCount("szsl");
					cm.setBossLog("szsl");
					cm.sendOk("" + vvv + "\r\n\r\n�˴�С��ţ�������� #r 30 #k�� #r#t5062500##k\r\n#t5062009# x 30��");
					cm.channelMessage(0x18, "��С��ţ����" + " : " + "��ϲ" + cm.getChar().getName() + ",�����Ķ��������С��ţ������������ < S > ��");
					//cm.sendServerNotice(7, "����֮������" + " : " + "��� " + cm.getChar().getName() + " �����Ķ����������֮�������������ֵȼ�<S>");
					//java.lang.System.out.println("=====================33333333333333333==================");
					cm.dispose();

				} else if (em.getProperty("state1").equals("2") == true) {
					cm.gainItem(5062009, 20);
					cm.gainItem(5062500, 20);
					cm.warp(100000000, 0);
					cm.setEventCount("szsl");
					cm.setBossLog("szsl");
					cm.sendOk("" + vvv + "\r\n\r\n�˴�С��ţ�������� #r 20 #k�� #r#t5062500##k\r\n#t5062009# x 20��");
					cm.channelMessage(0x18, "��С��ţ����" + " : " + "��ϲ" + cm.getChar().getName() + ",�����Ķ��������С��ţ������������ < F > ��");
					//cm.sendServerNotice(7, "����֮������" + " : " + "��� " + cm.getChar().getName() + " �����Ķ����������֮�������������ֵȼ�<F>");
					//java.lang.System.out.println("=====================33333333333333333==================");
					cm.dispose();
				} else if (em.getProperty("state1").equals("3") == true) {
					cm.warp(100000000, 0);
					cm.setEventCount("szsl");
					cm.setBossLog("szsl");
					cm.gainItem(5062009, 10);
					cm.gainItem(5062500, 10);
					cm.sendOk("" + vvv + "\r\n\r\n�˴�С��ţ�������� #r 10 #k�� #r#t5062500##k\r\n#t5062009# x 10��");
					cm.channelMessage(0x18, "��С��ţ����" + " : " + "��ϲ" + cm.getChar().getName() + ",�����Ķ��������С��ţ������������  < A > ��");
					//cm.sendServerNotice(7, "����֮������" + " : " + "��� " + cm.getChar().getName() + " �����Ķ����������֮�������������ֵȼ�<A>");
					//java.lang.System.out.println("=====================33333333333333333==================");
					cm.dispose();
				} else if (em.getProperty("state1").equals("4") == true) {
					cm.gainItem(5062009, 5);
					cm.gainItem(5062500, 5);
					cm.warp(100000000, 0);
					cm.setEventCount("szsl");
					cm.setBossLog("szsl");
					cm.sendOk("" + vvv + "\r\n\r\n�˴�С��ţ�������� #r 5 #k�� #r#t5062500##k\r\n#t5062009# x 5��");
					cm.channelMessage(0x18, "��С��ţ����" + " : " + "��ϲ" + cm.getChar().getName() + ",�����Ķ��������С��ţ������������ < B > ��");
					//cm.sendServerNotice(7, "����֮������" + " : " + "��� " + cm.getChar().getName() + " �����Ķ����������֮�������������ֵȼ�<B>");
					//java.lang.System.out.println("=====================33333333333333333==================");
					cm.dispose();;
				} else {
					cm.sendOk("���ź��������֣��޷���ý������������������������ս��");
					//java.lang.System.out.println("=====================44444444444444444444==================");
					cm.warp(100000000, 0);
					cm.dispose();
				}
			} else {
				cm.warp(100000000, 0);
				//java.lang.System.out.println("=====================55555555555555555==================");
				cm.sendOk("������Ѿ���ɹ�������,����������");
				cm.dispose();
			}
		} else if (selection == 1) {
			//java.lang.System.out.println("=====================366666666666666666633==================");
			cm.warp(211070000); //ʨ����֮�� - �Ӽ�������
		}

		cm.dispose();
	}
}