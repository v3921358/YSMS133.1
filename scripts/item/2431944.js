//140����
var itemList = Array(
	Array(4310036, 3000),
	Array(4000021, 150),
	Array(4001241, 8),
	Array(4001242, 8),
	Array(4004000, 75),
	Array(4004001, 75),
	Array(4004002, 75),
	Array(4004003, 75)
);
function start() {
    if (im.getSpace(4) >= 25) {
        im.gainItem(2431944, -1);
		for(var key in itemList) {
			im.gainItem(itemList[key][0],itemList[key][1]);
		}
        im.playerMessage(-1, "��ϲ����140������������");
        im.worldSpouseMessage(0x20, "��140������������ : ��ϲ " + im.getPlayer().getName() + " �� <140����������> ���ȫ�����ϡ�");
	im.dispose();
    } else {
        im.sendOk("�뽫������Ԥ��25����λ���ϣ��ҽ�����������140����ȫ�����ϡ�");
	im.dispose();
    }
}