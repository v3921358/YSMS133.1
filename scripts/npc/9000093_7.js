var status = 0; 
var abb = 0;
var add = 0;

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
            cm.sendSimple("ʹ�����˶����һ�ڻ��Ӯ�õ��˶�������һ����ߣ�ǿ��ʵ����Ư����\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#d#L0#�˶���Ҷһ�����#l\r\n#L1#����������������(��--��)#l\r\n#L2#���˶���Ҷһ��ɽ�����Ʒ#l"); 
        } else if (status == 1) { 
        if (selection == 0) {
            cm.sendSimple("ʹ�����˶����һ�ڻ��Ӯ�õ��˶�������һ����ߣ�ǿ��ʵ����Ư����\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L0##v2430638##t2430638##l\r\n#L1##v2430639##t2430639##l #L2##v2430640##t2430640##l"); 
	} else if (selection == 1) {
            cm.sendSimple("ʹ�����˶����һ�ڻ��Ӯ�õ��˶�������һ����ߣ�ǿ��ʵ����Ư����\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L4##t2430638# #r����#b #t2430639##l\r\n#L5##t2430639# #r����#b #t2430640##l");
	} else if (selection == 2) {
            cm.sendSimple("ʹ�����˶����һ�ڻ��Ӯ�õ��˶�������һ����ߣ�ǿ��ʵ����Ư����\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L7##t4310030# #r�һ�#b #t4001447##l#L8##t4001447# #r�һ�#b #t4310030##l");
		}
        } else if (status == 2) { 
        if (selection == 0) {
	    abb = 1;
	    cm.sendGetText("��Ҫ�һ�����#t2430638#\r\n#b#t4310030#����:#r"+cm.itemQuantity(4310030)+"\r\n�һ�����:50 : 1");
        } else if (selection == 1) {
	    abb = 2;
	    cm.sendGetText("��Ҫ�һ�����#t2430639#\r\n#b#t4310030#����:#r"+cm.itemQuantity(4310030)+"\r\n�һ�����:300 : 1");
        } else if (selection == 2) {
	    abb = 3;
	    cm.sendGetText("��Ҫ�һ�����#t2430640#\r\n#b#t4310030#����:#r"+cm.itemQuantity(4310030)+"\r\n�һ�����:10000 : 1");
        } else if (selection == 3) {
	    abb = 4;
	    cm.sendGetText("��Ҫ�һ�����#t2430656#\r\n#b#t4310030#����:#r"+cm.itemQuantity(4310030)+"\r\n�һ�����:50000 : 1");
        } else if (selection == 4) {
	    add = 1;
	    cm.sendGetText("��Ҫ��������#t2430639#\r\n#b#t2430638#����:#r"+cm.itemQuantity(2430638)+"\r\n��������:6 : 1");
        } else if (selection == 5) {
	    add = 2;
	    cm.sendGetText("��Ҫ��������#t2430640#\r\n#b#t2430639#����:#r"+cm.itemQuantity(2430639)+"\r\n��������:30 : 1");
        } else if (selection == 6) {
	    add = 3;
	    cm.sendGetText("��Ҫ��������#t2430656#\r\n#b#t2430640#����:#r"+cm.itemQuantity(2430640)+"\r\n��������:10 : 1");
        } else if (selection == 7) {
	    abb = 5;
	    cm.sendGetText("��Ҫ�һ�����#t4001447#\r\n#b#t4310030#����:#r"+cm.itemQuantity(4310030)+"\r\n�һ�����:3 : 1");
        } else if (selection == 8) {
	    abb = 6;
	    cm.sendGetText("��Ҫ�һ�����#t4310030#\r\n#b#t4001447#����:#r"+cm.itemQuantity(4001447)+"\r\n�һ�����:1 : 1");
	    }
        } else if (status == 3) { 
	if(abb == 1){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 50 + "#k�� �һ� #r" + cm.getText() + "#k��#t2430638#ȷ��?"); 
	    }
	}
	if(abb == 2){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 300 + "#k�� �һ� #r" + cm.getText() + "#k��#t2430639#ȷ��?"); 
	    }
	}
	if(abb == 3){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 10000 + "#k�� �һ� #r" + cm.getText() + "#k��#t2430640#ȷ��?"); 
	    }
	}
	if(abb == 4){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 50000 + "#k�� �һ� #r" + cm.getText() + "#k��#t2430656#ȷ��?"); 
	    }
	}
	if(add == 1){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430638##r" + cm.getText() * 6 + "#k�� ���� #r" + cm.getText() + "#k��#t2430639#ȷ��?"); 
	    }
	}
	if(add == 2){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430639##r" + cm.getText() * 30 + "#k�� ���� #r" + cm.getText() + "#k��#t2430640#ȷ��?"); 
	    }
	}
	if(add == 3){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430640##r" + cm.getText() * 10 + "#k�� ���� #r" + cm.getText() + "#k��#t2430656#ȷ��?"); 
	    }
	}
	if(abb == 5){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 3 + "#k�� �һ� #r" + cm.getText() + "#k��#t4001447#ȷ��?"); 
	    }
	}
	if(abb == 6){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4001447##r" + cm.getText() + "#k�� �һ� #r" + cm.getText() + "#k��#t4310030#ȷ��?"); 
	    }
	}
        } else if (status == 4) { 
	if(abb == 1){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 50)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 50));
           cm.gainItem(2430638, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4310030#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(abb == 2){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 300)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 300));
           cm.gainItem(2430639, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4310030#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(abb == 3){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 10000)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 10000));
           cm.gainItem(2430640, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4310030#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(abb == 4){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 50000)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 50000));
           cm.gainItem(2430656, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4310030#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(add == 1){
	if ((cm.itemQuantity(2430638) >= (cm.getText() * 6)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430638, -(cm.getText() * 6));
           cm.gainItem(2430639, cm.getText());
           cm.sendOk("�����ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t2430638#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(add == 2){
	if ((cm.itemQuantity(2430639) >= (cm.getText() * 30)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430639, -(cm.getText() * 30));
           cm.gainItem(2430640, cm.getText());
           cm.sendOk("�����ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t2430639#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(add == 3){
	if ((cm.itemQuantity(2430640) >= (cm.getText() * 10)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430640, -(cm.getText() * 10));
           cm.gainItem(2430656, cm.getText());
           cm.sendOk("�����ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t2430640#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(abb == 5){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 3)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 3));
           cm.gainItem(4001447, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4310030#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
	if(abb == 6){
	if ((cm.itemQuantity(4001447) >= cm.getText()) && cm.getSpace(2) > 2) { 
           cm.gainItem(4001447, -cm.getText());
           cm.gainItem(4310030, cm.getText());
           cm.sendOk("�һ��ɹ�.��鿴����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4001447#\r\n�������������ռ䲻��2��");
           cm.dispose();
            }
	 }
      } 
   }
}