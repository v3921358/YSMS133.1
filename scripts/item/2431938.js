var itemList = Array(
	Array(4310030, 2000),
	Array(4310036, 5000),
	Array(4033356, 50),
	Array(4021012, 30),
	Array(4021011, 30),
	Array(4021010, 30),
	Array(4000082, 400),
	Array(4000124, 50),
	Array(4310015, 3),
	Array(4021019, 1)
);
function start() {
    if (im.getSpace(4) >= 25) {
        im.gainItem(2431938, -1);
		for(var key in itemList) {
			im.gainItem(itemList[key][0],itemList[key][1]);
		}
        im.playerMessage(-1, "��ϲ����150������������");
        im.worldSpouseMessage(0x20, "��150������������ : ��ϲ " + im.getPlayer().getName() + " �� <150����������> ���ȫ�����ϡ�");
	im.dispose();
    } else {
        im.sendOk("�뽫������Ԥ��25����λ���ϣ��ҽ�����������150����ȫ�����ϡ�");
	im.dispose();
    }
}