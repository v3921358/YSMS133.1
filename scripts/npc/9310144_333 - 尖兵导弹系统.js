
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
		var selStr = "\r\n#e#d#L33#����ð�յ���ӭ����������Ա������˽��������#n#l#k\r\n";
		selStr +="\r\n#d======================================================#k\r\n";
		selStr +="	����ҷ�Ӧ����������������˵�BOSSʱ�������Լ��������ţ����Ƴ�ɾ������������ܵĹ��ܣ���Ȼ��Ҳ���������������ѵĻָ���\r\n"
		//selStr +="\r\n�󲿷ֵĲ���������������У����Ѿ��۷��ˡ�ʹ��#r@pm#k������Կ��ٺ�������NPC\r\n";
		//selStr +="#L15##r"+ttt6+"���߽���#l#L17#"+ttt6+"��ֵ����#l#k#b#L3#"+ttt6+"�������#l#L5#"+ttt6+"Ԫ���һ�#l\r\n\r\n";
		//selStr +="#b#L11#"+ttt6+"��ս����#l#L12##r"+ttt6+"���ø���#l#L4##b"+ttt6+"��������#l#L14#"+ttt6+"��������#l\r\n\r\n";
		//selStr +="#b#L9#"+ttt6+"���ָ���#l#L19#"+ttt6+"װ������#l#b#L16#"+ttt6+"�����#l#b#L20#"+ttt6+"��װ����#l\r\n\r\n";
		//selStr +="#b#L21#"+ttt6+"�����Ա#l#r#L18#"+ttt6+"����ϴ��#l#k#r#L22#"+ttt6+"������Ʒ������ѯ#l\r\n\r\n";
		selStr +="#b#L23#"+ttt6+"ɾ����˹��ϵͳ#l#L24#"+ttt6+"�ָ���˹��ϵͳ#l\r\n\r\n";
		//selStr +="#b#L1#"+ttt6+"ÿ��Ѱ��#l#L2#"+ttt6+"�ֽ���#l#L3#"+ttt6+"�������#l#L5#"+ttt6+"����н�#l\r\n\r\n";
		//selStr +="#L4#"+ttt6+"��������#l#L10##r"+ttt6+"��Ϸ����#l#L9##r"+ttt6+"ħ����Ʒ#l#L11##b"+ttt6+"��ս����#l\r\n\r\n";
		//selStr +="#b#L13#"+ttt6+"�������#l#L12#"+ttt6+"���ø���#l#L14#"+ttt6+"��������#l#k#L15##r"+ttt6+"���߽���#l#k\r\n\r\n";
		//selStr +="#b#L16#"+ttt6+"����̳�#l#r#L17#"+ttt6+"��ֵ����#l#b#L18#"+ttt6+"����ҵ�#l#r#L19#"+ttt6+"RED���̵�#l\r\n";
		selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 1);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 9);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9310144, 3);
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 9);
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 15);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310144, 101);
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9310144, 6);
            break; 
        case 6:
            cm.dispose();
            cm.openNpc(9020000);
            break; 
        case 7:
            cm.dispose();
            cm.openNpc(2040034);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900003, 10);
            break;
		case 9:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
		case 11:
            cm.dispose();
            cm.openNpc(9900003, 13);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
		case 13:
            cm.dispose();
            cm.openNpc(9900003, 110);
            break;
		case 14:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
	    case 15:
            cm.dispose();
            cm.openNpc(9900003, 608);
            break;
		case 16:
	    //cm.sendOk("���ڿ���");
            cm.dispose();
	    cm.openNpc(9310144, 1);
            //cm.openShop(500);
            break;
		case 17:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break;
		case 18:
	    //cm.sendOk("���ڿ���");
            cm.dispose();
            cm.openNpc(9000174, 1);
            break;
		case 19:
            cm.dispose();
            cm.openNpc(9900003, 24);
            break;
		case 20:
            cm.dispose();
            cm.openNpc(9000069);
            break;
		case 21:
            cm.dispose();
            cm.openNpc(9310144, 17);
            break;
		case 22:
			cm.dispose();
			cm.openNpc(9310144, 100);
			break;
		case 23:
		if (cm.getJob() >= 3600 && cm.getJob() <= 3612){		
			cm.teachSkill(36110004, 0, 0);
			cm.sendOk("��ϲ���������ɹ�");
			cm.dispose();
		} else {
			cm.sendOk("���ֲ��Ǽ�����Ҹǣ�");
			cm.dispose();
		}
			break;
			case 24:
		if (cm.getJob() >= 3600 && cm.getJob() <= 3612){		
			cm.teachSkill(36110004, 10, 10);
			cm.sendOk("��ϲ���������ɹ�");
			cm.dispose();
		} else {
			cm.sendOk("���ֲ��Ǽ�����Ҹǣ�");
			cm.dispose();
		}
			break;
        case 33:
            cm.dispose();
            cm.openNpc(9330006);
            break;       













}
    }
}
