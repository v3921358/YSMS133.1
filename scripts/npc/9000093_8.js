var status = 0;
var typed=0;

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
			cm.sendSimple("#k>�Ŀ�꣺#b<�����ռ��>#k\r\n\r\n>�������...???...\r\n#b#L1#��ĸƴ���ռ�#l #L2#�ճ������ռ�#l");
		} else if (status == 1) {
			if (selection == 1) {
                    	typed=1;
			cm.sendYesNo("#e<�ռ������ĸƴ���ռ�>#n\r\n����Ŭ��������ռ��������ռ��Ĺ����������ء����������ս�Ļ��������#b��ĸƴ���ռ���Ʒ#k������˵����"); 
			}
			if (selection == 2) {
                    	typed=2;
			cm.sendYesNo("#e<�ռ�����ճ������ռ�>#n\r\n����Ŭ��������ռ��������ռ��Ĺ����������ء����������ս�Ļ��������#b�ճ������ռ���Ʒ#k������˵����");
			}
		} else if (status == 2) {
		if(typed==1){
                if (cm.itemQuantity(3994067) >=1 && cm.itemQuantity(3994059) >=2 && cm.itemQuantity(3994071) >=1 && cm.itemQuantity(3994066) >=1 && cm.itemQuantity(3994074) >=2 && cm.itemQuantity(3994083) >=1) {
                    cm.gainItem(3994067, -1);
                    cm.gainItem(3994059, -2);
                    cm.gainItem(3994071, -1);
                    cm.gainItem(3994066, -1);
                    cm.gainItem(3994074, -2);
                    cm.gainItem(3994083, -1);
                    cm.gainItem(2430639, 1);
		    cm.worldMessage(cm.getChar().getName() + "�ɹ��������ĸƴ���ռ����񣬻���˷ḻ�Ľ�����");
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i3994067#  #i3994059##i3994071#\r\n#i3994066##i3994059##i3994074##i3994074##i3994083##b  (�Һܿ���!!!)");
                    cm.dispose();
                }
		} else if (status == 2) {
		if(typed==2){
		var rod = 11;
                if (cm.itemQuantity(3990000) >=1 && cm.itemQuantity(3990001) >=1 && cm.itemQuantity(3990002) >=1 && cm.itemQuantity(3990003) >=1 && cm.itemQuantity(3990004) >=1 && cm.itemQuantity(3990005) >=1 && cm.itemQuantity(3990006) >=1 && cm.itemQuantity(3990007) >=1 && cm.itemQuantity(3990008) >=1) {
                    cm.gainItem(3990000, -1);
                    cm.gainItem(3990001, -1);
                    cm.gainItem(3990002, -1);
                    cm.gainItem(3990003, -1);
                    cm.gainItem(3990004, -1);
                    cm.gainItem(3990005, -1);
		    cm.gainItem(3990006, -1);
                    cm.gainItem(3990007, -1);
                    cm.gainItem(3990008, -1);
                    cm.gainItem(2430638, 1);
		    cm.worldMessage(cm.getChar().getName() + "�ɹ�������ճ������ռ����񣬻���˷ḻ�Ľ�����");
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n#i3990000# #t3990000#(#c3990000#/1)	#i3990001# #t3990001#(#c3990001#/1)	\r\n#i3990002# #t3990002#(#c3990002#/1)	#i3990003# #t3990003#(#c3990003#/1)	\r\n#i3990004# #t3990004#(#c3990004#/1)	#i3990005# #t3990005#(#c3990005#/1)	\r\n#i3990006# #t3990006#(#c3990006#/1)	#i3990007# #t3990007#(#c3990007#/1)	\r\n#i3990008# #t3990008#(#c3990008#/1)");
                    cm.dispose();
		}
		}
			}
		}
	}
}