var status = -1;

var onlineTime = Array(10,60,120,240,360,480,640,720,840,1000); //��дʱ�䣬��λ:����,��180���Ӻ�480���ӿ�����ȡһ��
var mPoints = Array(100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000);  //��д���þ��ö��ŷָ�����Ӧ����ķ�����
var icon ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = "��ã���ӭ������ȯ��ȡ���ģ�����������������Ϳ�����ȡ���µ������#r���˻ά��5�죩#k\r\n";
		for(var key in onlineTime) {
			text +="#L"+key+"#"+icon+" #b���� #r"+onlineTime[key]+" #b������ȡ #r"+mPoints[key]+" #b ���#l\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1){
		var sel = selection;
		var needTime = onlineTime[sel];
		var points = mPoints[sel];
		if (cm.getBossLog("���ߵ��"+sel) == 0) {
			if (cm.getPlayer().getTodayOnlineTime() >= needTime) {
				cm.gainNX(1, points);
				cm.setBossLog("���ߵ��"+sel);
				cm.getPlayer().dropMessage(1, "�ɹ���ȡ��"+points+"���");
				cm.worldSpouseMessage(0x23, "�����ߵ�� : ��� "+cm.getPlayer().getName()+" ��ȡ�� "+needTime+"���� "+points+" �������");
			} else {
				var lastTime = cm.getPlayer().getTodayOnlineTime() - needTime;
				cm.sendOk("��������ʱ�䲻��"+needTime+"���ӣ�����Ҫ#r"+lastTime+"#k���ӡ�");
			}
		} else {
			cm.sendOk("���Ѿ���ȡ���˸ý������޷��ظ���ȡ��");
		}
		cm.dispose();
	}
}