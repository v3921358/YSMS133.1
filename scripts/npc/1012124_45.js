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
    var selStr = "#�װ���#r#h ##k���ã������ǵ���̳ǣ�����ѡ������Ҫ�Ĺ���:\r\n";
		selStr += "#d����ǰ��ȯ�� #r"+cm.getNX(1)+"#k #d��#k\t#d��ǰ����ȯ�� #r" + cm.getNX(2) + "#k #d��#k\r\n#e#d��ѡ��(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#n#k";
		selStr += "#b#L0#ʱװ��ָ#l	    #L2#ʱװñ��#l       #L4#ʱװ����\r\n";
		selStr += "#L6##bʱװ��ȹ#l	    #L7#ʱװ����#l       #L5#ʱװ����#l\r\n";
		selStr += "#L8##bʱװ����#l	    #L9#ʱװ��װ#l       #L1#ʱװЬ��#l\r\n";
		selStr += "#L10##bʱװ����#l	\t#L11#ϡ�г���#l \t   #L12#ϡ�����#l\r\n";
		selStr += "#L13##r˫������#l		#L14#ϡ������#l \t   #L15#��Ϸ����#l\r\n";
		selStr += "#L16##r����װ��#l		#L17#������Ʒ#l \t   #L18#��������#l\r\n";
		selStr += "#L19##rǿ�����#l		#L20#�������#l \r\n";
		selStr += "\r\n#L22##g�򿪱�����ֵ���ӡ�1Ԫ=1Ԫ��+2000���#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#b#L0#˫������#l    #L7#���߾���#l\r\n#L8#����̵�#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//����9330079������ֹͣʹ��
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9330079, 1521); //��ָ
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9330079, 1522); //ñ��
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9330079, 1523); //����
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9330079, 1524); //����
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9330079, 1525); //��ȹ
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9330079, 1526); //����
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
            cm.openNpc(9330079, 1529); //����
            break;
	case 1:
            cm.dispose();
            cm.openNpc(9330079, 1530); //Ь��
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9330079, 155); //����
            break;
	case 12:
            cm.dispose();
            cm.openNpc(9330079, 153); //���
            break;
	case 13:
            cm.dispose();
            cm.openNpc(9330079, 151); //˫������
            break;
	case 14:
            cm.dispose();
            cm.openNpc(9330079, 1520); //����
            break;
	case 15:
            cm.dispose();
            cm.openNpc(9330079, 10); //��Ϸ����
            break;
	case 16:
            cm.dispose();
            cm.openNpc(9330079, 29); //װ��
            break;
	case 17:
            cm.dispose();
            cm.openNpc(9330079, 28); //��Ʒ
            break;
	case 18:
            cm.dispose();
            cm.openNpc(9330079, 30); //����
            break;
	case 19:
            cm.dispose();
            cm.openNpc(9330079, 31); //���
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