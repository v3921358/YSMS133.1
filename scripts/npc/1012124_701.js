/*
 �ű����ܣ������ű�V2��
 */

var a = 0;
var icon = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
//"#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
//"#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var List = Array(
        //Array(icon + " #r���� <-> â��ð�յ� <-> ��������#k\r\n", 703, 0),
		//Array(icon + " #bâ��ð�յ����������¼����#k\r\n", 708, 0),
        //Array(icon + " #râ��ð�յ��ƹ㽱��ϵͳ#e#b << [HOT]#n#k\r\n", 704, 0),
		Array(icon + " #n�����г�#k", 99, 1),
        Array(icon + " #n���ܴ���#k", 2, 1),
		Array(icon + " #r��Ա����#k", 606, 1),
		Array(icon + " #nְҵתְ#k", 4, 1),
		Array(icon + " #n��Ʒɾ��#k", 500, 1),
		Array(icon + " #nâ�� T V#k\r\n", 40, 1),

        Array(icon + " #r��Ҫ��ǿ#k", 37, 1),
		Array(icon + " #r�����#k", 42, 1),
        Array(iconEvent + " #r����ר��#k", 38, 1),
		Array(icon + " #n�������#k", 702, 1),
		Array(icon + " #n�̵�ר��#k", 36, 1),
        Array(iconEvent + " #n��������#k", 39, 1), //TODO
		Array(iconEvent + " #rÿ�մ�", 46, 2),
        Array(iconEvent + " ��ɫ����", 108, 2),
		Array(icon + " BOSS����#k\r\n", 13, 2),






		//Array(icon + " #n����̵�#k", 999, 2),
		//Array(icon + " #n#r����̳�#k", 152, 2),
       // Array(icon + " #n#r�����̳�#k", 27, 2), //TODO
		//Array(icon + " #b��������#k", 500, 1),
       // Array(icon + " #bѧϰ����#k", 22, 1),
		//Array(icon + " ���߽���", 608, 1),
   		
		//Array(icon + " ��ֵ����", 8, 1),
		//Array(icon + " ��Ծ��ѯ#k", 23, 1),
        //Array(icon + " ��Ϸ����", 10, 1), //TODO
        //Array(iconEvent + " ���й���", 14, 1),
		//Array(icon + " #b����ǩ��#k", 708, 1),
       // Array(icon + " #r�������#k", 26, 1),
		//Array(icon + " #e#d����վ��ֵ[1RMB==1Ԫ��+2000���]#n#k\r\n", 709, 2)
        )
/*
        //1 �������  2 ��Ϸ��԰
        Array(icon + " ��Ϸ�̵�", 1, 1),
        //Array(icon + " ��Ʒװ��", 1008, 1),
        Array(icon + " ���ܴ���", 2, 1),
        Array(icon + " �����̳�", 16, 1), //TODO
        Array(icon + " ְҵתְ", 4, 1),
Array(icon+"#rǩ������#K",201,1),
    //  Array(icon + " ѩ���һ�", 101, 1, 9310144),
       Array("���ʲ�ѯ", 5, 1),
        //Array("�ֿ����", 14, 1),
        //Array("��������", 8, 1),
        //Array(icon + " ��ֵ����", 13, 1), //TODO
        Array(icon + " ��ս����", 13, 1),
        Array(icon + " #b�������#k", 6, 1),
        Array(iconEvent + " #rÿ��ǩ��#k", 7, 2),
        Array(iconEvent + " #rÿ������#k", 12, 2), //TODO
        Array(iconEvent + " #r��Ϸ����#k", 108, 2),
        //Array(iconEvent + " #r����̵�#k", 101, 2),
        Array(icon + " #r�����г�#k", 99, 1),
        Array(icon + " #rѧϰ����#k", 22, 1),
        Array(icon + " #r��Ծ��ѯ#k", 23, 1),
        //Array(icon+ " ����ϴ��", 1, 1, 9000174 ),
        Array(icon + " ��Ϸ����", 10, 2), //TODO
        Array(icon + " ����̵�", 15, 2),
        //Array(icon + " ʱװ����", 1009, 2),
        Array(icon + " ��Ʒ����", 500, 2)
        //Array(icon + " ��������", 501, 2)//TODO
*/

var text;
/*
var time = java.util.Calendar.getInstance();
var year = time.get(java.util.Calendar.YEAR);           //������
var month = time.get(java.util.Calendar.MONTH) + 1;     //����·�
var day = time.get(java.util.Calendar.DATE);            //��ȡ��
var hour = time.get(java.util.Calendar.HOUR_OF_DAY);    //���Сʱ
var minute = time.get(java.util.Calendar.MINUTE);       //��÷���
var second = time.get(java.util.Calendar.SECOND);       //�����
*/

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
            // if (cm.getBossLogAcc("��ʶ�ƹ�")>=0) {
            //     cm.dispose();
            //     cm.openNpc(9310382, 704);
            //     return;
            // }
            text = "";
            for (var i = 0; i < 3; i++) {
                ListFor(i);
            }
            cm.sendSimple(text)
        } else if (a == 1) {
            if(selection == 999) {
                cm.dispose();
                cm.openNpc(9310382, 703);
                return;
            }
            var mode_ = List[selection][1];
            var npcid = 9330079;
            if (List[selection][3]!=null)
            {
                npcid = List[selection][3];
            }
            cm.dispose();
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 0://�������
        //text += "  #fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
        //text += "  " + icon2 + "â��ð�յ�:��������� ^_^ \r\n";
            //text += "  " + icon2 + "��ǰʱ��:" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "\r\n";
        text += "#n����ǰ�ڱ���������ʱ�䣺#r" + cm.getPlayer().getTodayOnlineTime() + "#k#n���� ��ǰâ�� #r" + cm.getPlayerPoints() + "#k\r\n";
		text += "#n����ǰ����Ԫ���� #r" + cm.getHyPay(1) + " #k#nԪ#k #n�ۼ����ѽ�#r" + cm.getHyPay(2) + " #k#nԪ#k\r\n";
        text += "#n��ǰ���: #r" + cm.getNX(1) + "  #k#n��\t ��ǰ���þ�: #r" + cm.getNX(2) + " #k#n��#k#n";
       // text += "#L999##b��ǰԪ��:  #r" + cm.getHyPay(1) + " #bԪ���һ����#k#l\r\n";
            //text += "#e���������������� â��ð�յ����� ����������������#n\r\n"
            break;
        case 2://��Ϸ��԰
            //text += "#e���������������� â��ð�յ�� ����������������#n\r\n"
            break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if(type == 0) {
                text += "#L" + i + "#" + List[i][0] + "#l";
                continue;
            }
            if (x == 2) {
                text += "#L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "#L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
    text += "\r\n";
}