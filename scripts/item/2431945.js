//140����
var itemList = Array(
	Array(4310036, 2000),
	Array(4000021, 100),
	Array(4001241, 5),
	Array(4001242, 5),
	Array(4004000, 50),
	Array(4004001, 50),
	Array(4004002, 50),
	Array(4004003, 50)
);
function start() {
    if (im.getSpace(4) >= 25) {
        im.gainItem(2431945, -1);
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