status = -1;
var itemList = Array(
2047818,// - ���˵�˫����������������100% - ��˫�������ϸ������������������ԡ�
2046996,// - ���˵ĵ�����������������100% - �Ե����������ӹ�����������ԡ�
2046997// - ���˵ĵ�������ħ������100% - �Ե�����������ħ��������ԡ�
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
        status--;
    }
    if (status == 0) {
        var text = "";
		for(var i=0; i<itemList.length; i++) {
			text+="#L"+i+"##v"+itemList[i]+"##z"+itemList[i]+"##l\r\n";
		}
		im.sendSimple("��ѡ����Ҫ��ȡ�ľ������ͣ�\r\n#r"+text);
    } else if(status == 1) {
		var itemid = itemList[selection];
		var itemnum = Math.floor(Math.random()*4+2);
		var item = im.gainGachaponItem(itemid, itemnum, "���˵�����", 3);
		im.gainItem(2431995, -1);
		im.sendOk("��ϲ���������"+itemnum+"��#b#z"+itemid+"#");
		im.safeDispose();
	}
}