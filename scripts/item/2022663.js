//��ů�Ķ�������
var itemList = Array(
	Array(4310066, 500),
	Array(4000517, 1),
	Array(2431945, 1),
	Array(5062002, 10),
	Array(5062500, 10),
	Array(5064000, 10)
);
function start() {
    if (im.getSpace(4) >= 1 && im.getSpace(5) >= 3 && im.getSpace(2) >= 1) {
        im.gainItem(2022663, -1);
		for(var key in itemList) {
			im.gainItem(itemList[key][0],itemList[key][1]);
		}
        im.playerMessage(-1, "��ϲ�����10���߼�����ħ����10����ʦ��������ħ����10�ŷ������ᡢ500�����������ҡ�1��140���������ӡ�1���ƽ���");
       //im.worldSpouseMessage(0x20, "��140������������ : ��ϲ " + im.getPlayer().getName() + " �� <140����������> ���ȫ�����ϡ�");
	im.dispose();
    } else {
        im.sendOk("���İ����ռ䲻�㣬������һ�°�����~");
	im.dispose();
    }
}