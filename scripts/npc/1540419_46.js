var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var selStr = "\t\t#d#e���ر��� - ���زֿ⣺#n#k\r\n\r\n";
			selStr +="#e#b����ǰ�ڱ���������ʱ�䣺#r" + cm.getPlayer().getTodayOnlineTime() + "#b���� ��ǰâ�� #r" + cm.getPlayerPoints() + "#k\r\n";
			selStr +="#b����ǰ����Ԫ���� #r" + cm.getHyPay(1) + " #k#bԪ#k\t #b������Ԫ����#r" + cm.getHyPay(2) + " #k#bԪ#k\r\n";
			selStr +="#b��ǰ���: #r" + cm.getNX(1) + " #b��\t��ǰ���þ�: #r" + cm.getNX(2) + " #b��#k\r\n\r\n";
			selStr +="\t#b����ǰ�������Ϊ�� #r"+ cm.getBossLog("��ݵ�") +" / 1 #b��#k#l\r\n\r\n";
			selStr +="\t\t#L1##b"+aaa+" ���뱦�زֿ�#l#k\r\n"; 
			//selStr +="\r\n";
			//selStr +="\t\t#L2##b"+aaa+" ����������#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("���뱦�زֿ����5�����ڣ�ÿ����100���þ�10â����50��������Ի���������������ߡ�\r\n");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("���vip�������ý������, ȷ��Ҫʹ�� 10000 ����������3�δ�����.?.");
                        }
		} else if (status == 2) {
			if(typed==2){
				if (cm.getBossLog("�1�ݵ�") >= 1 && cm.getPlayer().getCSPoints(1) >= 10000 && cm.getPlayer().getRMB() >= 10) {
			cm.gainNX(1, -10000);
			cm.resetBossLog("�1�ݵ�");
			cm.sendOk("��ϲ�������˽��뱦��ֿ��ͼ����.");
			cm.worldSpouseMessage(0x20, "������ֿ⡻ : ��ϲ " + cm.getChar().getName() + " ʹ�� 10000 ������ý���3�δ��������ֿ��Ի�ô������ߡ�");
			cm.dispose();
				} else {
			cm.sendOk("#r�����ۼƳ�ֵ����10Ԫ�������޷�ʹ�øù��ܣ�\r\n\r\n#e#d��ʾ��#k#n#b1). ���Ĵ�����δ���꣬����������ʹ�á�\r\n#e#d��ʾ��#k#n#b2). ���ĵ����10000��,�޷�֧�����á�\r\n#e#d��ʾ��#k#n#b3). �����ۼƳ�ֵ����10Ԫ�޷�ʹ�øù��ܡ�");
			cm.dispose();
				}
			}else if(typed==1){
				if (cm.getPlayer().getRMB() >= 10 && cm.getSevenDayPayLog(1).get(0) >= 10) {//
			cm.dispose();
			cm.openNpc(9900003, 26);
			} else {
			cm.sendOk("#rΪ����С������ˢ�������ֵ������ﵽ10Ԫ�����߿�ͨ��ƿ���ѽ��롣ÿ��ɻ��50���þ�10â����30������⻹�л��������µ��ߡ�\r\n10��Ǯ�����򲻵����У�10��Ǯ�����򲻵�������10��Ǯ��������򲻵����ް����ӣ�����ֻҪ��ֵ10��Ǯ��10��Ǯ���˳Կ���10��Ǯ�������ϵ���10��Ǯ����п��ܳư�ȫ����û������ֻҪ10��Ǯ��ÿ�춼���Խ�����л����õ���Щ��\r\n\r\n#i4000463# #i2340000# #i5062000# #i5062002# #i4001839# #i4310088# #i4310036# #i5072000# #i5073000# #i5074000# #i3010527# #i3010832# #i3010829# #i2430866# #i1102481# #i1102482# #i1102483# #i1102484# #i1102485# #i1082543# #i1082544# #i1082545# #i1082546# #i1082547# #i1072743# #i1072744# #i1072745# #i1072746# #i1072747# #i1132174# #i1132175# #i1132176# #i1132177# #i1132178# #i1012438# #i1022211# #i1032224# #i1122269# #i1132247# #i1152160# #i1003976# #i1102623# #i1082556# #i1052669# #i1072870# #i1112793#");
			cm.dispose();
				}
				}
           }
		}
}