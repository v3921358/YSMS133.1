
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
		var selStr = "#r[��ʾ]�� #e#b��ѡ������Ҫ��150��������װ��#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). ��ȡ#z1072743##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). ��ȡ#z1072744##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). ��ȡ#z1072745##l\r\n";
		selStr += "#r#L3#"+ttt6+" 4). ��ȡ#z1072746##l\r\n";
		selStr += "#r#L4#"+ttt6+" 5). ��ȡ#z1072747##l\r\n";
		selStr += "#r#L5#"+ttt6+" 6). ��ȡ#z1082543##l\r\n";
		selStr += "#r#L6#"+ttt6+" 7). ��ȡ#z1082544##l\r\n";
		selStr += "#r#L7#"+ttt6+" 8). ��ȡ#z1082545##l\r\n";
		selStr += "#r#L8#"+ttt6+" 9). ��ȡ#z1082546##l\r\n";
		selStr += "#r#L9#"+ttt6+" 10). ��ȡ#z1082547##l\r\n";
		selStr += "#r#L10#"+ttt6+" 11). ��ȡ#z1102481##l\r\n";
		selStr += "#r#L11#"+ttt6+" 12). ��ȡ#z1102482##l\r\n";
		selStr += "#r#L12#"+ttt6+" 13). ��ȡ#z1102483##l\r\n";
		selStr += "#r#L13#"+ttt6+" 14). ��ȡ#z1102484##l\r\n";
		selStr += "#r#L14#"+ttt6+" 15). ��ȡ#z1102485##l\r\n";
		selStr += "#r#L15#"+ttt6+" 16). ��ȡ#z1132174##l\r\n";
		selStr += "#r#L16#"+ttt6+" 17). ��ȡ#z1132175##l\r\n";
		selStr += "#r#L17#"+ttt6+" 18). ��ȡ#z1132176##l\r\n";
		selStr += "#r#L18#"+ttt6+" 19). ��ȡ#z1132177##l\r\n";
		selStr += "#r#L19#"+ttt6+" 20). ��ȡ#z1132178##l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		im.gainItem(1072743, 1);
		//im.gainItem(1082543, 1);
		//im.gainItem(1102481, 1);
		//im.gainItem(1132174, 1);
		im.sendOk("����� #z1072743# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�������ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		im.gainItem(1072744, 1);
		//im.gainItem(1082544, 1);
		//im.gainItem(1102482, 1);
		//im.gainItem(1132175, 1);
		im.sendOk("����� #z1072744# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		im.gainItem(1072745, 1);
		//im.gainItem(1082545, 1);
		//im.gainItem(1102483, 1);
		//im.gainItem(1132176, 1);
		im.sendOk("����� #z1072745# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ֱ������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		im.gainItem(1072746, 1);
		//im.gainItem(1082546, 1);
		//im.gainItem(1102484, 1);
		//im.gainItem(1132177, 1);
		im.sendOk("����� #z1072746# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 4:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		im.gainItem(1072747, 1);
		//im.gainItem(1082547, 1);
		//im.gainItem(1102485, 1);
		//im.gainItem(1132178, 1);
		im.sendOk("����� #z1072747# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;

	case 5:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072743, 1);
		im.gainItem(1082543, 1);
		//im.gainItem(1102481, 1);
		//im.gainItem(1132174, 1);
		im.sendOk("����� #z1082543# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�������ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 6:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072744, 1);
		im.gainItem(1082544, 1);
		//im.gainItem(1102482, 1);
		//im.gainItem(1132175, 1);
		im.sendOk("����� #z1082544# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 7:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072745, 1);
		im.gainItem(1082545, 1);
		//im.gainItem(1102483, 1);
		//im.gainItem(1132176, 1);
		im.sendOk("����� #z1082545# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ֱ������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 8:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072746, 1);
		im.gainItem(1082546, 1);
		//im.gainItem(1102484, 1);
		//im.gainItem(1132177, 1);
		im.sendOk("����� #z1082546# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 9:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072747, 1);
		im.gainItem(1082547, 1);
		//im.gainItem(1102485, 1);
		//im.gainItem(1132178, 1);
		im.sendOk("����� #z1082547# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 10:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072743, 1);
		//im.gainItem(1082543, 1);
		im.gainItem(1102481, 1);
		//im.gainItem(1132174, 1);
		im.sendOk("����� #z1102481# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�������ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 11:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072744, 1);
		//im.gainItem(1082544, 1);
		im.gainItem(1102482, 1);
		//im.gainItem(1132175, 1);
		im.sendOk("����� #z1102482# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 12:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072745, 1);
		//im.gainItem(1082545, 1);
		im.gainItem(1102483, 1);
		//im.gainItem(1132176, 1);
		im.sendOk("����� #z1102483# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ֱ������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 13:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072746, 1);
		//im.gainItem(1082546, 1);
		im.gainItem(1102484, 1);
		//im.gainItem(1132177, 1);
		im.sendOk("����� #z1102484# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 14:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072747, 1);
		//im.gainItem(1082547, 1);
		im.gainItem(1102485, 1);
		//im.gainItem(1132178, 1);
		im.sendOk("����� #z1102485# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 15:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072743, 1);
		//im.gainItem(1082543, 1);
		//im.gainItem(1102481, 1);
		im.gainItem(1132174, 1);
		im.sendOk("����� #z1132174# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�������ߡ�");	
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 16:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072744, 1);
		//im.gainItem(1082544, 1);
		//im.gainItem(1102482, 1);
		im.gainItem(1132175, 1);
		im.sendOk("����� #z1132175# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 17:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072745, 1);
		//im.gainItem(1082545, 1);
		//im.gainItem(1102483, 1);
		im.gainItem(1132176, 1);
		im.sendOk("����� #z1132176# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˹����ֱ������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 18:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072746, 1);
		//im.gainItem(1082546, 1);
		//im.gainItem(1102484, 1);
		im.gainItem(1132177, 1);
		im.sendOk("����� #z1132177# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;
	case 19:
	if (im.getSpace(1) >= 1) {
		im.gainItem(2432715, -1);
		//im.gainItem(1072747, 1);
		//im.gainItem(1082547, 1);
		//im.gainItem(1102485, 1);
		im.gainItem(1132178, 1);
		im.sendOk("����� #z1132178# x 1");
		//im.worldSpouseMessage(0x24,"������������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����������ߡ�");		
		im.dispose();
	} else {
		im.sendOk("װ�����ռ䲻��");
		im.dispose();
	}
		break;





}
    }
}
