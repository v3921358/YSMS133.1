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
    var selStr = "#�װ���#r#h ##k����,��������Ҫ��ǿ����:\r\n";
	    selStr += "#b����ǰ����Ԫ���� #r" + cm.getHyPay(1) + " #k#bԪ#k\t #b������Ԫ����#r" + cm.getHyPay(2) + " #k#bԪ#k\r\n";
		selStr += "#d����ǰ��ȯ�� #r"+cm.getNX(1)+"#k #d��#k\t#d��ǰ����ȯ�� #r" + cm.getNX(2) + "#k #d��#k\r\n#e#d��ѡ��: \r\n#n#k";
		selStr += "#b#L0#װ������#l	    #L1#װ������#l       #L2#�����ƹ�\r\n";
		selStr += "#L3##b�������#l	    #L4#��������#l       #L5##r����װ��#l#b\r\n";
		selStr += "#L6##b�����̵�#l	    #L7#����н�#l       #L8#�����#l\r\n";
		selStr += "#L9##rÿ�մ�#l#k#b	\t#L10#��������#l \t   #L11#ѧϰ����#l\r\n";
		//selStr += "#L13##r˫������#l		#L14#ϡ������#l \t   #L15#��Ϸ����#l\r\n";
		//selStr += "#L16##r����װ��#l		#L17#������Ʒ#l \t   #L18#��������#l\r\n";
		//selStr += "#L19##rǿ�����#l		#L20#�������#l \r\n";
		selStr += "\r\n#L22##g�򿪱�����ֵ���ӡ�1Ԫ=1Ԫ��+2000���#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#b#L0#˫������#l    #L7#���߾���#l\r\n#L8#����̵�#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//����9330079������ֹͣʹ��
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003, 24); //װ������
            break;
        case 1:
            cm.dispose();
            cm.openNpc(1022003, 2); //װ���ϳ�
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 1000); //�����ƹ�
            break;
        case 3:
            cm.dispose();
            cm.openNpc(1032102); //�������
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9073025); //�������
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9330079, 25); //Ԫ���̵�
            break;
        case 6:
            cm.dispose();
		    cm.openNpc(9330079, 48); //Ԫ���̵�
            //cm.openNpc(9900005, 1002); //�ȼ�����
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9330079, 704); //����н�
            break;
		case 8:
            cm.dispose();
            cm.openNpc(9330079, 705); //�����
            break;
	case 9:
            cm.dispose();
            cm.openNpc(9900003, 27); //ÿ�մ�
            break;
    case 10:
            cm.dispose();
            cm.openNpc(9330079, 607); //��������
            break;
	case 11:
            cm.dispose();
            cm.openNpc(9330079, 22); //ѧϰ����
            break;
	case 13:
            cm.dispose();
            cm.openNpc(9330079, 151); //˫������
            break;
	case 14:
            cm.dispose();
            cm.openNpc(9330079, 152); //����
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