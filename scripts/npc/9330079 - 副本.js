/*
 �ű����ܣ������ű�V2��
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var List = Array(
		
		//��������
        Array("#dְҵתְ", 4, 1),
		Array("#d���ܴ���", 2, 1),
        Array("#d���й���", 14, 1),
        Array("#d���ʲ�ѯ", 5, 1),
		Array("#d��Ʒ����", 100, 1, 9310144),
		Array("#d��������", 9, 1),
		//Array("#b���ø���", 3, 1, 9900004),
		Array("#d��Ʒ����", 500, 1),
		Array("#dװ����ԭ", 1111, 1, 9000069),
		Array("#r#eԪ���һ�#n", 101, 1, 9310144),
		Array("#r��Ϸ����#k", 200, 1, 9900004),
		Array("#rװ������#k", 503, 1),
        Array("#rѧϰ����#k", 22, 1),
        Array("#r��Ծ��ѯ#k", 23, 1),
		Array("#r�����г�\r\n#k", 99, 1),
        
		//��ս����
		Array("#r��ϲ����#k", 108, 2),
		Array("#b��ս����", 13, 2),
		Array("#b�������", 6, 2, 9310144),
		
		//��Ϸ�̵�
        Array("#b��Ϸ�̵�", 1, 3),
		Array("#b�����̳�", 16, 3), //TODO
		Array("#b��Ϸ����", 10, 3), //TODO
		Array("#b����̵�", 15, 3),
		Array("#b��������", 501, 3),//TODO
		Array("#rѩ���̵�#k", 0, 3, 9310143),
		Array("#r�����Ա#k", 17, 3, 9310144),
        
		//��Ҫ��ǿ
		//Array("�����ϳ�", 100, 4, 9900002),
		Array("#rװ��Ʒ��#k", 0, 4, 1022003),
		Array("#b����ϴ��", 1, 4, 9000174),
		Array("#bװ������", 24, 4),
        Array("#b�����ƹ�", 1000, 4),
		Array("#b����Ǳ��", 1001, 4),
		Array("#bʱװ����", 0, 4, 9000069)
);

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
			var myRmb = getMyRmb();
			text = "\r\n";
            text += "\t#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# ����Ԫ����#r#e"+myRmb+"#n#k�� #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0# �������ߣ�#r#e"+cm.getPlayer().getTodayOnlineTime()+"#n#k����";
			for (var i = 0; i < 5; i++) {
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
        case 1://��Ϸ��԰
            text += "#e#d�������������������� �������� ������������������#n#k\r\n"
            break;
		case 2:
			text+=  "#e#d�������������������� ��ս���� ������������������#n#k\r\n"
			break;
		case 3:
			text+=  "#e#d�������������������� �����̳� ������������������#n#k\r\n"
			break;
		case 4:
			text+=  "#e#d�������������������� �绢���� ������������������#n#k\r\n"
			break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 3) {
                text += "#L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "#L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
	if (type==1)
		text+="#e\r\n";
	else
    	text += "#e\r\n\r\n";
}

function getMyRmb() {
	var myRmb;
	var conn = cm.getConnection();
	var sql = "select rmb from accounts where id = ?;";
	var pstmt = conn.prepareStatement(sql);
	pstmt.setString(1, cm.getPlayer().getAccountID());
	var myRmbSql = pstmt.executeQuery();
	if (myRmbSql.next()) {
		myRmb = myRmbSql.getString("rmb");
	} else {
		myRmb = 0;
	}
	myRmbSql.close();
	pstmt.close();
	return myRmb;
}