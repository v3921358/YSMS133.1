/*
	���ƣ����֮�ǻ���
	���ݣ�����Ƥ����ɫ
*/

var status = -1;
var skin = new Array(0, 1, 2, 3, 4);
var card = 5153015; // ���ܻ���ȯ

function start () {
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == 0) {
		cm.dispose();
		return;
	} else {
		status++;
	}

	if (status == 0) {
		var text = "���ã�����Ƥ�����ר��#p" + cm.getNpc() + "#�����ҳ��ÿ���������ʵ�պ�Ӧ����һ�仰�����˲���ò�ࡱ����\r\n\r\n";
		text += "#b#L0# �ı��ɫ";
		cm.sendSimple(text);
	} else if (status == 1) {
		var text = "ѡ������������Ͱɣ��������#b#t" + card + "##k�Ļ����ҿ��԰����������˾��޵����͡�";
		cm.sendStyle(text, skin, card);
	} else if (status == 2) {
		if (cm.setAvatar(card, skin[selection]) == 1) {
			cm.sendOk("û˵��ɣ���ʵ�˲���ò�࡭��");
                cm.worldSpouseMessage(0x25, "��ϴ������ :  " + cm.getChar().getName() + " ����һ��ϴ������ʱ�н��ֳ���һλʱ�д��ˣ���ҿ���Χ�۰�.");
		} else {
			cm.sendOk("��û��#b#t" + card + "##k��������ȥ�̳ǹ���");
		}
	}
}