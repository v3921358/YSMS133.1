function start() {
	if (cm.getBossLog("��������")<=0)
	{
		cm.gainItem(4310129, 1);
		cm.gainNX(200);
		cm.sendOk("��ϲ������һ��#v4310129##b#t4310129##k�Լ�#r200#k���");
		cm.setBossLog("��������");
		cm.dispose();
	} else {
		cm.sendOk("������Ѿ���ȡ��������Ŷ~ÿ��ֻ��һ���콱���ᣬ�ɲ�Ҫ̫̰���أ�");
		cm.dispose();
	}
}