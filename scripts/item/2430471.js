//��ů�Ķ�������
var itemList = Array(
	Array(4310129, 500),
	Array(4000517, 1),
	Array(2431945, 1),
	Array(5062002, 10),
	Array(5062500, 10),
	Array(5064000, 10)
);
function start() {
    if (im.getSpace(4) >= 1 && im.getSpace(5) >= 3 && im.getSpace(2) >= 1) {
        im.gainItem(2430471, -1);
		for(var key in itemList) {
			im.gainItem(itemList[key][0],itemList[key][1]);
		}
        im.playerMessage(-1, "��ϲ�����20���߼�����ħ����20����ʦ��������ħ����20�ŷ������ᡢ500�����������ҡ�1��140���������ӡ�1���ƽ���");
       //im.worldSpouseMessage(0x20, "��140������������ : ��ϲ " + im.getPlayer().getName() + " �� <140����������> ���ȫ�����ϡ�");
	im.dispose();
    } else {
        im.sendOk("���İ����ռ䲻�㣬������һ�°�����~");
	im.dispose();
    }
}