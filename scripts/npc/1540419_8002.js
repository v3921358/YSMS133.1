
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

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
            cm.sendOk(head + "���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = head + "\r\n#e#dâ��ð�յ���ֵ����ϵͳ#n#l#k\r\n";
		selStr +="\r\n��ʾ����ֵ����1��3000���֧��֧����ת�ʡ�#k\r\n\r\n";
		//selStr +="#r#L0#"+ttt6+" �ۼƳ�ֵ����[ÿ��ֻ����ȡһ��]#l\r\n";
		selStr +="#b#L1#"+ttt6+" ÿ�ճ�ֵ����[ÿ��ÿ�տ���һ��]#l\r\n";
		//selStr +="#g#L2#"+ttt6+" �򿪳�ֵ��վ[�򿪱�����ֵ��վ]#l#k\r\n\r\n";//
		selStr +=" ";
		//selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9010057, 610);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9010057, 602);
            break; 
        case 2:
            cm.dispose();
            //cm.openWeb("http://www.libaopay.com/buy/?wid=40792");
            break; 
 
 
        }
    }
	}