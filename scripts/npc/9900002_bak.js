/*
 �ű����ܣ������ű�V2��
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var List = Array(
		//������Ŀ
		Array(iconEvent + " #rÿ��ǩ��#k", 7, 1),
        Array(iconEvent + " #rÿ������#k", 12, 1), //TODO
        Array(iconEvent + " #r����ǩ��#k", 502, 1),
		Array(iconEvent + " #r���߽���#k",608, 1, 9900003),
		Array(iconEvent + " #r��ֵ����#k", 8, 1, 9310144),
		Array(iconEvent + " #r��Ҫ����#k", 604, 1),
		Array(iconEvent + " #r�����#k", 1, 1, 9310144),
		Array(iconEvent + " #r��������#k", 111, 1),
		
		//��������
        Array(icon + " ְҵתְ", 4, 2),
		Array(icon + " ���ܴ���", 2, 2),
		Array(icon + " Ԫ���һ�", 101, 2, 9310144),      
        Array(icon + " ���й���", 14, 2),
        Array(icon + " ���ʲ�ѯ", 5, 2),
		Array(icon + " ��Ʒ����", 100, 2, 9310144),
		Array(icon + " ��������", 9, 2),
		Array(icon + " ���ø���", 3, 2, 9900004),
		Array(icon + " ��Ʒ����", 500, 2),
        Array(icon + " #rѧϰ����#k", 22, 2),
        Array(icon + " #r��Ծ��ѯ#k", 23, 2),
		Array(icon + " #r�����г�#k", 99, 2),
        
		//��ս����
		Array(icon + " #r��ϲ����#k", 108, 3),
		Array(icon + " ��ս����", 13, 3),
		Array(icon + " �������", 6, 3, 9310144),
		
		//��Ϸ�̵�
		Array(icon + " #rѩ���̵�#k", 0, 4, 9310143),
        Array(icon + " ��Ϸ�̵�", 1, 4),
		Array(icon + " �����̳�", 16, 4), //TODO
		Array(icon + " ��Ϸ����", 10, 4), //TODO
		Array(icon + " ��������", 501, 4),//TODO
		Array(icon + " ����̵�", 15, 4),
		Array(icon + " #r�����Ա#k", 17, 4, 9310144),
        
		//��Ҫ��ǿ
		Array(icon + " ��������", 24, 5),
        Array(icon + " �����ƹ�", 1000, 5),
		Array(icon + " ����Ǳ��", 1001, 5),
		Array(icon + " ʱװ����", 0, 5, 9000069)
)
var text;
//�Ƿ������֣�ģʽ�����

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "";
            for (var i = 0; i < 6; i++) {
                ListFor(i);
            }
            cm.sendSimple(text)
        } else if (a == 1) {
            var mode_ = List[selection][1];
            cm.dispose();
			var npcid = 9900003;
			if (List[selection][3] != null)
				npcid = List[selection][3];
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 1://�������
            text += "#e#d�������������������� �ճ����� ������������������#n#k\r\n"
            break;
        case 2://��Ϸ��԰
            text += "#e#d�������������������� �������� ������������������#n#k\r\n"
            break;
		case 3:
			text+=  "#e#d�������������������� ��ս���� ������������������#n#k\r\n"
			break;
		case 4:
			text+=  "#e#d�������������������� �����̳� ������������������#n#k\r\n"
			break;
		case 5:
			text+=  "#e#d�������������������� �绢���� ������������������#n#k\r\n"
			break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
                text += "  #L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "  #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
    text += "#e\r\n\r\n";
}