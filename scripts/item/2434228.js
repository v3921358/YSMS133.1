
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����
var RMB = 0;
var PayLogPoints = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
            im.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            im.dispose();
        } 
    else if (status == 0) {
		var selStr = "#r[��ʾ]�� #e#b��ѡ������Ҫ��150���߹������װ��#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). ��ȡ#z1003797##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). ��ȡ#z1003798##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). ��ȡ#z1003799##l\r\n";
		selStr += "#r#L3#"+ttt6+" 4). ��ȡ#z1003800##l\r\n";
		selStr += "#r#L4#"+ttt6+" 5). ��ȡ#z1003801##l\r\n";
		selStr += "#r#L5#"+ttt6+" 6). ��ȡ#z1042254##l\r\n";
		selStr += "#r#L6#"+ttt6+" 7). ��ȡ#z1042255##l\r\n";
		selStr += "#r#L7#"+ttt6+" 8). ��ȡ#z1042256##l\r\n";
		selStr += "#r#L8#"+ttt6+" 9). ��ȡ#z1042257##l\r\n";
		selStr += "#r#L9#"+ttt6+" 10). ��ȡ#z1042258##l\r\n";
		selStr += "#r#L10#"+ttt6+" 11). ��ȡ#z1062165##l\r\n";
		selStr += "#r#L11#"+ttt6+" 12). ��ȡ#z1062166##l\r\n";
		selStr += "#r#L12#"+ttt6+" 13). ��ȡ#z1062167##l\r\n";
		selStr += "#r#L13#"+ttt6+" 14). ��ȡ#z1062168##l\r\n";
		selStr += "#r#L14#"+ttt6+" 15). ��ȡ#z1062169##l\r\n";

		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003797, 1);
		//im.gainItem(1042254, 1);
		//im.gainItem(1062165, 1);
		im.sendOk("����� #z1003797# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003798, 1);
		//im.gainItem(1042255, 1);
		//im.gainItem(1062166, 1);
		im.sendOk("����� #z1003798# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003799, 1);
		//im.gainItem(1042256, 1);
		//im.gainItem(1062167, 1);
		im.sendOk("����� #z1003799# x 1");
		//im.worldSpouseMessage(0x24,"���߹���ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ָ߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		im.gainItem(1003800, 1);
		//im.gainItem(1042257, 1);
		//im.gainItem(1062168, 1);
		im.sendOk("����� #z1003800# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 4:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		im.gainItem(1003801, 1);
		//im.gainItem(1042258, 1);
		//im.gainItem(1062169, 1);
		im.sendOk("����� #z1003801# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 5:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003797, 1);
		im.gainItem(1042254, 1);
		//im.gainItem(1062165, 1);
		im.sendOk("����� #z1042254# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 6:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003798, 1);
		im.gainItem(1042255, 1);
		//im.gainItem(1062166, 1);
		im.sendOk("����� #z1042255# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 7:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003799, 1);
		im.gainItem(1042256, 1);
		//im.gainItem(1062167, 1);
		im.sendOk("����� #z1042256# x 1");
		//im.worldSpouseMessage(0x24,"���߹���ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ָ߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 8:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003800, 1);
		im.gainItem(1042257, 1);
		//im.gainItem(1062168, 1);
		im.sendOk("����� #z1042257# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 9:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		//im.gainItem(1003801, 1);
		im.gainItem(1042258, 1);
		//im.gainItem(1062169, 1);
		im.sendOk("����� #z1042258# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 10:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003797, 1);
		//im.gainItem(1042254, 1);
		im.gainItem(1062165, 1);
		im.sendOk("����� #z1062165# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 11:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003798, 1);
		//im.gainItem(1042255, 1);
		im.gainItem(1062166, 1);
		im.sendOk("����� #z1062166# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 12:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003799, 1);
		//im.gainItem(1042256, 1);
		im.gainItem(1062167, 1);
		im.sendOk("����� #z1062167# x 1");
		//im.worldSpouseMessage(0x24,"���߹���ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ָ߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 13:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2434228, -1);
		//im.gainItem(1003800, 1);
		//im.gainItem(1042257, 1);
		im.gainItem(1062168, 1);
		im.sendOk("����� #z1062168# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 14:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2433245, -1);
		//im.gainItem(1003801, 1);
		//im.gainItem(1042258, 1);
		im.gainItem(1062169, 1);
		im.sendOk("����� #z1062169# x 1");
		//im.worldSpouseMessage(0x24,"���߹������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����߹���ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;








}
    }
}
