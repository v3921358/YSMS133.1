/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��10��17�� 09:37:20
 �ű����ܣ�ȫ������ϵͳ
 */

var a = 0;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var List = Array(
        Array("���ʲ�ѯ", 5, 0),
        Array("���й���", 14, 0),
        Array("����ҽԺ", 9, 0),
        Array("������", 17, 0)
        )
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/Basic.img/BtMin2/normal/0#";

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
            var x = 0;
            var text = head + "#h0#����ã�Ҫʲô������\r\n\r\n#b";
            for (var i = 0; i < List.length; i++) {
				if (i != 0 && i%3 != 0) {
					text += "  ";
				}
                if (x == 2) {
                    text += "#L" + i + "# " + icon + " " + List[i][0] + "#l\r\n";
                    x = 0;
                } else {
                    text += "#L" + i + "# " + icon + " " + List[i][0] + "#l";
                    x = x + 1
                }
            }
            cm.sendSimple(text)
        } else if (a == 1) {
            if (selection == 8) {
                cm.sendStorage();
                cm.dispose();
            } else {
                var sel = List[selection][1];
		cm.dispose();
		if(sel != 9) {
                    cm.openNpc(9010057, sel)
		} else {
		    cm.warp(100000104);
		}
                //cm.setNPC_Mode(0)
            }
        }//a
    }//mode
}//f