function start() {
   if (cm.getLevel() >= 120 && cm.getBossLogAcc("GM����") == 0) {
	cm.gainItem(2431528, 1);
	cm.gainItem(2431394, 1);
	cm.setBossLogAcc("GM����", -2);
        cm.playerMessage(-1, "��ϲ�����Gm�������ߡ�");
        cm.worldSpouseMessage(0x20, "��Gm������ : ��ϲ " + cm.getPlayer().getName() + " ���г���ͨ����Ա����ȡ��GM�������.");
	cm.dispose();
    } else {
        cm.sendOk("�ȼ�����120���������Ѿ���ȡ����������.11��20����12���޷���ȡ����ץ��ʱ��");
	cm.dispose();
    }
}