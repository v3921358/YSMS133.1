
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
		var selStr = "#r[��ʾ]�� #e#b��ѡ������Ҫ�ľ��᣺#k#n\r\n\r\n";
		selStr += "#r#L0#"+ttt6+" 1). #z2613000##l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). #z2613001##l\r\n";
		selStr += "#r#L2#"+ttt6+" 3). #z2612010##l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431354, -1);
		im.gainItem(2613000, 1);
		im.sendOk("����� #z2613000# x 1");
		im.worldSpouseMessage(0x24,"���ǻ������䡻����� "+ im.getChar().getName() +" ������ǻ����������������ᡣ");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 1:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431354, -1);
		im.gainItem(2613001, 1);
		im.sendOk("����� #z2613001# x 1");
		im.worldSpouseMessage(0x24,"���ǻ������䡻����� "+ im.getChar().getName() +" ������ǻ�������ħ�������ᡣ");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;
	case 2:
	if (im.getSpace(2) >= 1) {
		im.gainItem(2431354, -1);
		im.gainItem(2612010, 1);
		im.sendOk("����� #z2613010# x 1");
		im.worldSpouseMessage(0x24,"���ǻ������䡻����� "+ im.getChar().getName() +" ������ǻ�˫���������������ᡣ");	
		im.dispose();
	} else {
		im.sendOk("�������ռ䲻��");
		im.dispose();
	}
		break;









}
    }
}
