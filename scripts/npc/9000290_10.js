/* ����̵� */

var status = 0;

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
    if (status == 0) {
    var selStr = "#�װ���#r#h ##k���ã������� #b#z4310119##k#n �̳ǣ�\r\nĿǰ #b#z4310119##k#n ֻ��ͨ������ʱ�佱�����\r\n";
		selStr += "#e#d��ѡ��\r\n#n#k";
		selStr += "#b#L0#�һ�150��������#l	  #L1#�һ����������#l\r\n";
		selStr += "#L2##b�һ�150������#l	    #L3#�һ�150������#l#l\r\n";
		//selStr += "#L4##b�һ�ϡ�е�װ#l	     #L5#�һ����ް�����#l#l\r\n";

		selStr += "             #b#L10# ���������һҳ#l\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#b#L0#˫������#l    #L7#���߾���#l\r\n#L8#����̵�#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//����9330079������ֹͣʹ��
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9000290, 1); //��������
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9000290, 2); //���߾���
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9000290, 3); //150����
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9000290, 4); //150����
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9000290, 5); //��װ
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9000290, 6); //����
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9330079, 1527); //����
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9330079, 1528); //��װ
            break;
	case 10:
            cm.dispose();
            cm.openNpc(9000290); //����
            break;
	case 1:
            cm.dispose();
            cm.openNpc(9330079, 1530); //Ь��
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9330079, 155); //���
            break;
	case 12:
            cm.dispose();
            cm.openNpc(9330079, 153); //����
            break;
	case 13:
            cm.dispose();
            cm.openNpc(9330079, 151); //˫������
            break;
	case 14:
            cm.dispose();
            cm.openNpc(9330079, 156); //����
            break;
	case 15:
            cm.dispose();
            cm.openNpc(9330079, 10); //��Ϸ����
            break;
	case 16:
            cm.dispose();
            cm.openNpc(1540211, 1); //װ��
            break;
	case 17:
            cm.dispose();
            cm.openNpc(1540211, 2); //��Ʒ
            break;
	case 18:
            cm.dispose();
            cm.openNpc(1540211, 3); //����
            break;
	case 19:
            cm.dispose();
            cm.openNpc(1540211, 4); //���
            break;
	case 20:
            cm.dispose();
            cm.openNpc(9330079, 154); //ϴ�����
            break;
	case 21:
            cm.dispose();
            cm.openNpc(9330079, 10); //�������
            break;
	case 22:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("�Ѿ�Ϊ����������վ��");
            break;
        }
    }
}