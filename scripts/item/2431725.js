status = -1;
var itemList = Array(
3994417,// - ��ɫ���� - ��ɫ���ʡ�
3994418,// - ��ɫ���� - ��ɫ���ʡ�
3994419,// - ��ɫ���� - ��ɫ���ʡ�
3994420,// - ��ɫ���� - ��ɫ���ʡ�
3994421,// - ��ɫ���� - ��ɫ���ʡ�
3994422// - ��ɫ���� - ��ɫ���ʡ�
//3994423// - ��ɫ���� - ��ɫ���ʡ�
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
		im.sendYesNo("��Ҫ������������");
    } else if(status == 1) {
		var itemid = itemList[Math.floor(Math.random()*itemList.length)];
		
		var item = im.gainGachaponItem(itemid, 1, "װ�����ʵ�����", 3);
		if (item!=-1) {
			im.gainItem(2431725, -1);
			im.sendOk("��ϲ���������1֧#b#v"+itemid+"##z"+itemid+"#");
			im.safeDispose(); 
		} else {
			im.sendOk("��ʧ�ܣ�������");
			im.safeDispose();
		}
	}
}