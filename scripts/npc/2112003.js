function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("���Ժ����ԡ�");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 261000021:
	cm.dispose();
	cm.openNpc(2112003,1);
        return;
    case 926110000:
        cm.sendOk("��Ӧ�ó��Ե����������#b�ļ���#k�е����ݡ�ֱ���ҵ����Խ���ʵ���ҵ���ڡ�");
        break;
    case 926110001:
        cm.sendOk("���������еĹ���һ�֧����ġ�");
        break;
    case 926110100:
        cm.sendOk("��Щ�ձ���й©�����Ǳ����#b���ɵ�Һ��#k�����ձ���ߣ�һ��ʱ�䲻��#b���ɵ�Һ��#k�����ձ��ڣ��ձ����Һ�����ʧ�⡣��ץ���ˣ�");
        break;
    case 926110400:
        cm.sendOk("��ʲôʱ��׼���ã�����Ҫȥ�����ҵİ��顣");
        break;
    case 926110401:
	if(!cm.haveMonster(9300139)){
   	   //cm.gainPlayerEnergy(10);
	   cm.gainItem(2430216, 1);
	   //cm.gainItem(4001485, 1);
           cm.worldSpouseMessage(0x20,"[�ճ��] ��ϲ��� "+ cm.getChar().getName() +" �������޺����л�� 1 �����䡣");
	   cm.setEventCount("����");
	   cm.setPartyEventCount("����1");
	   cm.warp(910000000);
	   cm.dispose();
	}else{
	cm.sendOk("��ȷ�ϵ�ͼ�Ϸ񻹴��ڹ���!");
	}
        break;
    }
    cm.dispose();
}