function start() {
        im.gainItem(2430527, -1);
	im.gainPlayerPoints(1000);
	im.playerMessage(-1, "����Ʊ���� ����� 1000 �����Ʊ����ǰ���� " + im.getPlayerPoints() + " �����Ʊ��");
	im.worldSpouseMessage(0x20,"����Ʊ������ϲ��� "+ im.getChar().getName() +" ����� 1000 �����Ʊ����ǰ���� " + im.getPlayerPoints() + " �����Ʊ��");
        im.dispose(); 
}