function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('��Ҫ160��������ȡ������');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("��������")<=0)
	{
		cm.gainItem(4310129, 5);
		cm.gainNX(500);
		cm.sendOk("��ϲ������5��#v4310129##b#t4310129##k�Լ�#r500#k���");
		cm.setBossLog("��������");
		cm.dispose();
	} else {
		cm.sendOk("������Ѿ���ȡ��������Ŷ~ÿ��ֻ��һ���콱���ᣬ�ɲ�Ҫ̫̰���أ�");
		cm.dispose();
	}
}

