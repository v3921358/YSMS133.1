var typed = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Zkld");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	if (status==0) {
		if (em.getProperty("state")=="1") {
			cm.sendYesNo("��ô�ˣ��������ھͳ�ȥ�����ڳ�ȥ��۳�������������۳�ѩ���ҡ�");
			typed=1;
		} else if (em.getProperty("state")=="2") {
			cm.sendYesNo("����������Ļ����˿��͵£���Ϊ�����ҽ�������һЩ�ö�����#b����ħ��x5���߼�����ħ��x1����ʦ��������ħ��x2��������x100�Լ�#e#r�������������Ӷһ���#nx1#k�������㻹�м���ֱ�ӻ��#rϡ�����ӡ�����ϵ��װ��������������#k\r\n\r\n#r��*����ȷ�����İ������㹻�Ŀռ�");
			typed=2;
		}
	} else if (status == 1) {
		if (typed==1) {
			cm.warp(910000000);
			cm.dispose();
		} else if (typed==2) {
			if (cm.getSpace(5)<5 || cm.getSpace(3)<5 || cm.getSpace(2)<5 ) {
				cm.sendOk("���İ������ˣ��뱣֤���İ������ġ�������������������5��Ŀ�λ");
				cm.dispose();
				return;
			}
			if (cm.haveItem(4032521, 1) || cm.getPlayer().getCSPoints(1)>=5000) {
				cm.gainItem(5062000, 5);
				cm.gainItem(5062002, 1);
				cm.gainItem(5062500, 2);
				cm.gainItem(4310036, 100);
				cm.gainItem(4310003, 1);
				cm.gainItem(2430051, 1);
				if (!cm.haveItem(4032521)) {
					cm.gainNX(-5000);
				} else {
					cm.gainItem(4032521, -1)
				}
				var gainExp;
				if (cm.getLevel()<=200) {
					gainExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*0.8);
				} else if(cm.getLevel()>200 && cm.getLevel() <=220){
					gainExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*0.5);
				} else if(cm.getLevel()>220 && cm.getLevel() <=250){
					gainExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*0.1);
				}
				var expNum;
				var lastExp;
				if (gainExp>=2147483647) {
						//����ֳɼ���
						expNum = Math.floor((gainExp / 2147483647));
						//��������
						lastExp = Math.floor((gainExp % 2147483647));
						//���ݼ��������θ��辭��
						for(var i = 0; i<expNum; i++) {
							cm.gainExp(2147483647);
						}
						//������������
						cm.gainExp(lastExp);
					} else {
						cm.gainExp(gainExp);
					}
					cm.warp(910000000);
					cm.worldSpouseMessage(0x15, "[ϵͳ����] : ��ϲ��ҡ�" + cm.getChar().getName() + "��սʤ�˿��͵£��õ����Ľ�����");
					cm.sendOk("������һ��#b����ӡ������#k����򿪿����ɡ�");
			} else {
				cm.warp(910000000);
				cm.sendOk("��û��5000��ȯ��VIP���뺯��ʲô��û�õ���");
			}
			cm.dispose();
		}
	}
}