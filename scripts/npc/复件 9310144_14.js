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
			var selStr = "#d#e��ӭʹ�ð����ޱҹ�����Ʒ����ѡ������Ҫ�ģ�#n#k\r\n";
			selStr +="\t#b����ǰ�����ޱ�Ϊ��  #r" + cm.getPlayerPoints() + " #b ��#n#k\r\n\r\n";
			selStr +="- #e#d����#n\r\n"
			selStr +="#L1##b"+aaa+" ���� #r#t5062002#���#k #b��Ҫ #r1000000#k #b�󶨱�#l#k\r\n"; 
			selStr +="#L2##b"+aaa+" ���� #r����ǿ���ʹ����#k #b��Ҫ #r1000000#k #b�󶨱�#l#k\r\n";
			selStr +="#L3##b"+aaa+" ���� #r�������������#k #b��Ҫ #r1000000#k #b�󶨱�#l#k\r\n";
			selStr +="#L4##b"+aaa+" ���� #rǱ�ܾ�������#k #b��Ҫ #r100000#k #b�󶨱�#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("ȷ������ #r#t5062002#���#k ��? ����ʹ�õ��� #r1000000#k �����ޱ�ʹ�ú󽫻��100���߼�ħ����100����ʦ����ħ��.");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("ȷ������ #r����ǿ�������#k ��? ����ʹ�õ��� #r1000000#k �����ޱ�ʹ�ú󽫻��ף������x100�ţ���������x50�ţ�����߼�װ��ǿ����x50��.");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("ȷ������ #r������������#k ��? ����ʹ�õ��� #r1000000#k �����ޱ�ʹ�ú󽫻��ף������x50�ţ���������x50�ţ���������������x25");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("ȷ������ #r���⸽��Ǳ�ܾ������#k ��? ����ʹ�õ��� #r100000#k �����ޱҡ�ʹ�ú󽫻��#t2049402#x5�ţ�#t2048307#x5��.");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getPlayerPoints() >= 1000000 && cm.getSpace(5) >= 5) {
			cm.gainPlayerPoints(-1000000);
			cm.gainItem(5062002, 100);
			cm.gainItem(5062500, 100);
			cm.sendOk("��ϲ���ɹ�����#t5062002#���.");
			cm.worldSpouseMessage(0x20, "���󶨱��̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ð����ޱҹ���ħ�������һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ�����ޱ�δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.getPlayerPoints() >= 1000000 && cm.getSpace(2) >= 2 && cm.getSpace(5) >= 1) {
			cm.gainPlayerPoints(-1000000);
			cm.gainItem(2340000, 100);
			cm.gainItem(5064000, 50);
			cm.gainItem(2049323, 50);
			cm.sendOk("��ϲ���ɹ���������ǿ�������.");
			cm.worldSpouseMessage(0x20, "���󶨱��̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ð����ޱҹ�������ǿ�������һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ�����ޱ�δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.getPlayerPoints() >= 1000000 && cm.getSpace(2) >= 3 && cm.getSpace(5) >= 1) {
			cm.gainPlayerPoints(-1000000);
			cm.gainItem(2340000, 50);
			cm.gainItem(5064000, 50);
			cm.gainItem(2049137, 25);
			cm.sendOk("��ϲ���ɹ���������ǿ�������.");
			cm.worldSpouseMessage(0x20, "���󶨱��̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ð����ޱҹ�����������������һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ�����ޱ�δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.getPlayerPoints() >= 100000 && cm.getSpace(2) >= 3) {
			cm.gainPlayerPoints(-100000);
			cm.gainItem(2049402, 5);
			cm.gainItem(2048307, 5);
			cm.sendOk("��ϲ���ɹ�������Ǳ�ܾ�������.");
			cm.worldSpouseMessage(0x20, "���󶨱��̳ǡ� : ��ϲ " + cm.getChar().getName() + " �ð����ޱҹ���Ǳ�ܾ�������һ��.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ�����ޱ�δ�ﵽ����.\r\n2). ����������λ����,������.");
			cm.dispose();
				}
           }
		}
	  }
	}