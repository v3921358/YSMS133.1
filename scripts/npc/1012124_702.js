var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#"; //"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#"; ////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#"; //"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#"; //"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#"; ////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#"; //"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
        cm.dispose();
    } else if (status == 0) {
        var selStr = "";
        /*= "\r\n#e#d#L33#��ù��Ȼ�ӭ����������Ա������˽��������#n#l#k\r\n";
		selStr +="\r\n#d======================================================#k\r\n";
		selStr +="#L15##r"+ttt6+"���߽���#l#L17#"+ttt6+"��ֵ����#l#k#b#L3#"+ttt6+"�������#l#L5#"+ttt6+"����н�#l\r\n\r\n";
		selStr +="#b#L12##r"+ttt6+"���ø���#l#L14#"+ttt6+"��������#l\r\n\r\n";
		selStr +="#b#L19#"+ttt6+"װ������#l#b#L16#"+ttt6+"�����#l\r\n\r\n";
		selStr +="#b#L21#"+ttt6+"���ۻ���#l\r\n\r\n";
		//selStr +="#b#L1#"+ttt6+"ÿ��Ѱ��#l#L2#"+ttt6+"�ֽ���#l#L3#"+ttt6+"�ճ�����#l#L5#"+ttt6+"����н�#l\r\n\r\n";
		//selStr +="#L4#"+ttt6+"��������#l#L10##r"+ttt6+"��Ϸ����#l#L9##r"+ttt6+"ħ����Ʒ#l#L11##b"+ttt6+"��ս����#l\r\n\r\n";
		//selStr +="#b#L13#"+ttt6+"�������#l#L12#"+ttt6+"���ø���#l#L14#"+ttt6+"��������#l#k#L15##r"+ttt6+"���߽���#l#k\r\n\r\n";
		//selStr +="#b#L16#"+ttt6+"����̳�#l#r#L17#"+ttt6+"��ֵ����#l#b#L18#"+ttt6+"����ҵ�#l#r#L19#"+ttt6+"RED���̵�#l\r\n";
		selStr += "\r\n#d======================================================#k\r\n";*/
        selStr += "  #fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
        selStr += "  " + icon2 + "����ð�յ�:Ϊ�����������һ�������� ^_^ \r\n";
        selStr += "  " + icon2 + "��ǰ��Ծ��:" + cm.getActivity() + "\t��ǰ����ʱ��:" + cm.getPlayer().getTodayOnlineTime() + "����\r\n";
        selStr += "  " + icon2 + "��ǰ���:" + cm.getNX(1) + "��\t��ǰ���þ�:" + cm.getNX(2) + "��\r\n";
        selStr += "#L0##r" + icon + "��Ծ��ѯ#L1#" + icon + "���ʲ�ѯ#l#L2#" + icon + "����˵��#l\r\n";
       // selStr += "#b#L3##r" + icon + "���ø���#l#L4#" + icon + "�������#l#L5#" + icon + "�����#l\r\n";
       // selStr += "#L6#" + icon + "����н�#l#L12#" + icon + "���д��#l#L8#" + icon + "��������#l\r\n";
        selStr += "#L9#" + icon + "��������#l#L10#" + icon + "������#l#L11#" + icon + "��������#l\r\n";
		//selStr += "#L7#" + icon + "ÿ�մ�#l#L13#" + icon + "�������#l#L14#" + icon + "���ι��#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9310382, 23);//��Ծ��ѯ
                break;
            case 1:
                cm.dispose();
                cm.openNpc(9310382, 5);//��������
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900005);//�ȼ�����
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9310382, 607);//���ø���
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310382, 605);//�������
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9310382, 705);//�����
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9310382, 704);//����н�
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 27);//ÿ�մ�
                break;
            case 8:
                cm.dispose();
                cm.openNpc(9310382, 501);//��������
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9310144, 2);//��������
                break;
            case 10:
                cm.dispose();
                cm.openNpc(9310382, 706);//������
                break;
            case 11:
                cm.dispose();
                cm.openNpc(9900003, 111);//��������
                break;
            case 12:
                cm.dispose();
                cm.openNpc(9310382, 14);//���д��
                break;
            case 13:
                cm.dispose();
                cm.openNpc(1032102);// �������
                break;
            case 14:
                cm.dispose();
                cm.openNpc(9073025);// ���ι��
                break;
            case 15:
                cm.dispose();
                cm.openNpc(9310382, 608);
                break;
            case 16:
                //cm.sendOk("���ڿ���");
                cm.dispose();
                cm.openNpc(9310144, 1);
                //cm.openShop(500);
                break;
            case 17:
                cm.dispose();
                cm.openNpc(9310382, 609);
                break;
            case 18:
                cm.sendOk("���ڿ���");
                cm.dispose();
                //cm.openShop(600);
                break;
            case 19:
                cm.dispose();
                cm.openNpc(9310382, 705);
                break;
            case 20:
                cm.dispose();
                cm.openNpc(9310382, 704);
                break;
            case 21:
                cm.dispose();
                cm.openNpc(9310382, 606);
                break;
            case 22:
                cm.dispose();
                cm.openNpc(9330006);
                break;
            case 23:
                cm.dispose();
                cm.openNpc(9310382, 706);
                break;
            case 24:
                cm.dispose();
                cm.openNpc(9310382, 707);
                break;
	    case 25:
                cm.dispose();
                cm.openNpc(9310382, 5555);
                break;
            case 26:
                cm.dispose();
                cm.openNpc(9310382, 501);
                break;
        }
    }
}