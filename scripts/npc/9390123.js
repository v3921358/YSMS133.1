var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getMapId() == 863010600) {
            cm.sendYesNo("������!!!���Ȼ�ɹ�ƽϢ�˱��յµķ�ŭ,������Ϊ��ʿ�䷢������!!!");
        } else {
            cm.sendOk("�ߣ��Աߵ���ͷ�����ҵĻ���ҷǳ����ߡ�");
            cm.safeDispose();
        }
    } else if (status == 1) {
        if ((cm.getSpace(1) > 1||cm.getSpace(2) > 1||cm.getSpace(3) > 1||cm.getSpace(4) > 1)) {
            var item;
		var chance1 = Math.floor(Math.random() * 500);
		if(chance1 >= 0 && chance1 <= 440){
 		var itemList = new Array(
1113072, //�ͼ����յ½�ָ
1032220, //�ͼ����յ¶���
1122264, //�ͼ����յµ�׹
1132243  //�ͼ����յ�����
		    );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "���յ�", 3);
		} else if(chance1 >= 441 && chance1 <= 470){
 		var itemList = new Array(
1113073, //�м����յ½�ָ
1032221, //�м����յ¶���
1122265, //�м����յµ�׹
1132244  //�м����յ�����
		    );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "���յ�", 3);
		} else if(chance1 >= 471 && chance1 <= 490){
 		var itemList = new Array(
1113074, //�߼����յ½�ָ
1032222, //�߼����յ¶���
1122266, //�߼����յµ�׹
1132245  //�߼����յ�����
		    );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "���յ�", 3);
		}else{
 		var itemList = new Array(
1113075, //��߼����յ½�ָ
1032223, //��߼����յ¶���
1122267, //��߼����յµ�׹
1132246  //��߼����յ�����
		    );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "���յ�", 3);
}
            if (item != -1) {
		cm.warp(863000100);
		cm.dispose();
            } else {
                cm.sendOk("����ȷ���ڱ�����װ��,����,�����������Ƿ���һ�����ϵĿռ�?");
            }
        } else {
            cm.sendOk("xx����");
        }
        cm.safeDispose();
    }
}