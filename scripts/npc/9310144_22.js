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
			var selStr = "#d#eȫ������,��ӭʹ�õ������Ʒ����ѡ������Ҫ�ģ�#n#k\r\n";
			selStr +="\t#b����ǰ���Ϊ��  #r" +cm.getPlayer().getCSPoints(1) + " #b ��#n#k\r\n\r\n";
			selStr +="- #e#d����#n\r\n"
			selStr +="#L1##b"+aaa+" #r500#k #b����� #r#t5062002##k ԭ��1000���һ��#l#k\r\n";
			selStr +="#L2##b"+aaa+" #r1000#k #b����� #r#t5062500##k ԭ��2000���һ��#l#k\r\n"; 
			selStr +="#L3##b"+aaa+" #r5000#k #b����� #r����#t2049323##k ԭ��1����#l#k\r\n";
			selStr +="#L4##b"+aaa+" #r25000#k #b����� #r#t2049124##k ԭ��50000���һ��#l#k\r\n";
			selStr +="#L5##b"+aaa+" #r30000#k #b����� #r#t2047978##k #l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("ȷ������һ�� #r#t5062002##k ��? ����ʹ�õ��� #r500#k ���");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("ȷ������һ�� #r#t5062500##k ��? ����ʹ�õ��� #r1000#k ���");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("ȷ������һ�� #r����#t2049323##k ��? ����ʹ�õ��� #r5000#k ���");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("ȷ������һ�� #r#t2049124##k ��? ����ʹ�õ��� #r25000#k ���");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("ȷ������һ�� #r#t2047978##k ��? ����ʹ�õ��� #r30000#k ���");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getPlayer().getCSPoints(1) >= 500 && cm.getSpace(5) >= 1 && cm.getBossLog("��Ʊ����") <= 10 && cm.getPlayer().getRMB() >= 260) {
			cm.gainNX(-500);
			cm.gainItem(5062002, 1);
			cm.sendOk("��ϲ���ɹ�����#t5062002#.");
			cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " ������̳ǹ���һ���߼�����ħ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==2){
                if (cm.getPlayer().getCSPoints(1) >= 1000 && cm.getSpace(5) >= 1) {
			cm.gainNX(-1000);
			cm.gainItem(5062500, 1);
			cm.sendOk("��ϲ���ɹ�����#t5062500#.");
			cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " ������̳ǹ���һ����ʦ��������ħ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==3){
                if (cm.getPlayer().getCSPoints(1) >= 5000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-5000);
			cm.gainItem(2049323, 1);
			cm.sendOk("��ϲ���ɹ�����#t2049323#.");
			cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " ������̳ǹ���һ������߼�װ��ǿ����.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==4){
                if (cm.getPlayer().getCSPoints(1) >= 25000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-25000);
			cm.gainItem(2049124, 1);
			cm.sendOk("��ϲ���ɹ�����#t2049124#.");
			cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " ������̳ǹ���һ������������.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else  if(typed==5){
                if (cm.getPlayer().getCSPoints(1) >= 30000 && cm.getSpace(2) >= 1) {
			cm.gainNX(-30000);
			cm.gainItem(2047978, 1);
			cm.sendOk("��ϲ���ɹ�����#t2047978#.");
			cm.worldSpouseMessage(0x20, "������̳ǡ� : ��ϲ " + cm.getChar().getName() + " ������̳ǹ���һ�����߹���������70%.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
           }
		}
	  }
	}