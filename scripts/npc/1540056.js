function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('��Ҫ160��������ȡ������');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("����B2����")<=0)
	{
		cm.gainItem(4001839, 500);
		cm.gainMeso(3000000);
		cm.gainNX(2000);

		cm.sendOk("��ϲ������500��#v4001839##b#t4001839##k,300�����Լ�#r2000#k���");
       cm.worldSpouseMessage(0x23, "����ս����B2������ : " + cm.getChar().getName() + " �ɹ���ս����B2���������յ㣬��ȡ�˴�����������ҿ�����ս��.");
		//cm.worldSpouseMessage(0x20,"������������ ����ϲ��� "+ im.getChar().getName() +" ����B2������÷ḻ�Ľ�����");
		cm.setBossLog("����B2����");
		cm.dispose();
	} else {
		cm.sendOk("������Ѿ���ȡ��������Ŷ~ÿ��ֻ��һ���콱���ᣬ�ɲ�Ҫ̫̰���أ�");
		cm.dispose();
	}
}

