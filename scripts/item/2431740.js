function start() {
         im.gainItem(2431740, -1);
         im.gainNX(2,1500);
         im.sendOk("��ϲ����� #r1500#k ���þ�");
	 im.channelMessage(0x18, "[���������ʾ]" + " : " + "���" + im.getChar().getName() + ",�ӹ������ϵ���[����ȯ1500��Ʒȯ]���1500���þ�");
	 //im.worldSpouseMessage(0x20,"[���������ʾ]����ϲ��� "+ im.getChar().getName() +" �ӹ������ϵ���[����ȯ1500��Ʒȯ]���1500���þ�");
         im.dispose(); 
}
