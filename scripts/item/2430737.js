
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
		var selStr = "#r[GM��ʾ]�� #e#b��ѡ������Ҫ�ľ��᣺#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). #z2046110##l\r\n";//������˫����������������100%
		selStr += "#r#L1#"+ttt6+" 2). #z2046111##l\r\n";//������˫������ħ��������100%
		selStr += "#r#L2#"+ttt6+" 3). #z2046010##l\r\n";//�����쵥����������������100%
		selStr += "#r#L3#"+ttt6+" 4). #z2046011##l\r\n";//�����쵥������ħ��������100%
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046110, 1);
		im.sendOk("����� #z2046110# x 1");
		//im.worldSpouseMessage(0x24,"��9���걦�䡻����� "+ im.getChar().getName() +" �����������˫����������������100%��");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046111, 1);
		im.sendOk("����� #z2046111# x 1");
		//im.worldSpouseMessage(0x24,"��9���걦�䡻����� "+ im.getChar().getName() +" �����������˫������ħ��������100%��");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046010, 1);
		im.sendOk("����� #z2046010# x 1");
		//im.worldSpouseMessage(0x24,"��9���걦�䡻����� "+ im.getChar().getName() +" ����������쵥����������������100%��");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 3:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2430737, -1);
		im.gainItem(2046011, 1);
		im.sendOk("����� #z2046011# x 1");
		//im.worldSpouseMessage(0x24,"��9���걦�䡻����� "+ im.getChar().getName() +" ����������쵥������ħ��������100%��");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;









}
    }
}
