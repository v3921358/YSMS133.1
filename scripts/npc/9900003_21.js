
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
        } 
    else if (status == 0) {
		var selStr = "\r\n#e#d          ��ӭʹ�������߱ҹ�����Ʒ#n#l#k\r\n";
		selStr +="\r\n#r��ʾ�������߱��������BOSS��������������������֮������������ʱ��ע�⿴�����һ������Ų��˻���#k\r\n\r\n";
		//selStr +="#b#L0#"+ttt6+" ����140��������150��������#l\r\n";
		//selStr +="#L1#"+ttt6+" �������ְҵ����װ��֮���#l\r\n";
		selStr +="#L2#"+ttt6+" ����������ľ�������֮���#l#k\r\n\r\n";
		selStr +="#L3#"+ttt6+" ����140��������#l#k\r\n\r\n";
		selStr +=" ";
		//selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003,24);
            break;
        case 1:
            cm.dispose();
            cm.openShop(22221);
            break; 
        case 2:
            cm.dispose();
            //cm.openShop(22223)
            cm.openNpc(1012124,141);;
            break; 
         case 3:
            cm.dispose();
            cm.openNpc(1012124, 140);
            break;
 
        }
    }
	}