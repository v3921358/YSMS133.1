function start() {
	if (cm.getLevel()<160) {
		cm.sendOk('��Ҫ160��������ȡ������');
		cm.dispose();
		return ;
	}
	if (cm.getBossLog("��ߵ�����")<=0)
	{
		cm.gainItem(4310129, 5);
		cm.gainItem(4001839, 100);
		cm.gainNX(1000);
		cm.sendOk("��ϲ������5��#v4310129##b#t4310129##k��100��#v4001839##b#t4001839##k�Լ�#r1000#k���");
		cm.setBossLog("��ߵ�����");
		cm.dispose();
	} else {
		cm.sendOk("������Ѿ���ȡ��������Ŷ~ÿ��ֻ��һ���콱���ᣬ�ɲ�Ҫ̫̰���أ�");
		cm.dispose();
	}
}

