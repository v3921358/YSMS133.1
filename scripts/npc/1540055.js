function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('��Ҫ160��������ȡ������');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("����B1����")<=0)
	{
		cm.gainItem(4001839, 500);
		cm.gainMeso(3000000);
		cm.gainNX(1500);
		cm.sendOk("��ϲ������500��#v4001839##b#t4001839##k300�����Լ�#r1500#k���");
       cm.worldSpouseMessage(0x23, "������B1���������� : " + cm.getChar().getName() + " �ɹ���ս����B1���������յ㣬��ȡ�˴�����������ҿ�����ս��.");

		//cm.worldSpouseMessage(0x20,"������������ ����ϲ��� "+ im.getChar().getName() +" ����B1������÷ḻ�Ľ�����");
		cm.setBossLog("����B1����");
		cm.dispose();
	} else {
		cm.sendOk("������Ѿ���ȡ��������Ŷ~ÿ��ֻ��һ���콱���ᣬ�ɲ�Ҫ̫̰���أ�");
		cm.dispose();
	}
}

