
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
		var selStr = "#r[��ʾ]�� #e#b��ѡ������Ҫ���桤����ð��֮�ģ�#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). սʿ#z1122122##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). ��ʦ#z1122123##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). ������#z1122124##l\r\n";
		selStr += "#r#L3#"+ttt6+" 4). ����#z1122125##l\r\n";
		selStr += "#r#L4#"+ttt6+" 5). ����#z1122126##l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122122, 1);
		im.sendOk("����� #z1122122# x 1");
		//im.worldSpouseMessage(0x24,"��ð������ѡ�䡻����� "+ im.getChar().getName() +" �����սʿ�桤����ð��֮�ġ�");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122123, 1);
		im.sendOk("����� #z1122123# x 1");
		//im.worldSpouseMessage(0x24,"��ð������ѡ�䡻����� "+ im.getChar().getName() +" ����˷�ʦ�桤����ð��֮�ġ�");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122124, 1);
		im.sendOk("����� #z1122124# x 1");
		//im.worldSpouseMessage(0x24,"��ð������ѡ�䡻����� "+ im.getChar().getName() +" ����˹������桤����ð��֮�ġ�");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122125, 1);
		im.sendOk("����� #z1122125# x 1");
		//im.worldSpouseMessage(0x24,"��ð������ѡ�䡻����� "+ im.getChar().getName() +" ����˷����桤����ð��֮�ġ�");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 4:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431194, -1);
		im.gainItem(1122126, 1);
		im.sendOk("����� #z1122126# x 1");
		//im.worldSpouseMessage(0x24,"��ð������ѡ�䡻����� "+ im.getChar().getName() +" ����˺����桤����ð��֮�ġ�");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;









}
    }
}
