/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��10��17�� 09:37:20
 �ű����ܣ�ȫ������ϵͳ
 */

var a = 0;
var List = Array(
        Array("���ʲ�ѯ", 5, 0),
        Array("���й���", 14, 0),
        Array("����ҽԺ", 9, 0),
	Array("�����ƹ�", 1000, 0),
	Array("����Ǳ��", 1001, 0),
		Array("��    ��", 604, 0)
		//Array("��������", 605, 0),
		//Array("ȫ��װ��", 606, 0)
        )
var icon = "#fUI/Basic.img/BtMin2/normal/0#";

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
            var text = "#h0#����ã�Ҫʲô������\r\n\r\n#b";
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
                cm.openNpc(9900003, sel)
                //cm.setNPC_Mode(0)
            }
        }//a
    }//mode
}//f