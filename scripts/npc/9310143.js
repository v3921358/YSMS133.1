/*
 �ű����ܣ��г�����Ա
 */

var a = 0;
var iconEvent ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var List = Array(
		//������Ŀ
		Array(iconEvent + " #rʵ�����#k", 5, 1, 9000069),
		Array(iconEvent + " #b�����װ#k", 1, 1, 9000069),
		Array(iconEvent + " #bϡ������#k", 2, 1, 9000069),
		Array(iconEvent + " #b�ϳ�װ��#k", 4, 1, 9000069),
		Array(iconEvent + " #b��Ʒ����#k", 3, 1, 9000069),
		Array(iconEvent + " #bƷ����װ#k", 999, 1, 9310144),
		Array(iconEvent + " #bƤ���˺�#k", 0, 1, 9310071),
		Array(iconEvent + " #bְҵ�ֲ�#k", 0, 1, 9310073),
		Array(iconEvent + " #bְҵ����#k", 0, 1, 9310072)
		
		//Array(icon2+"#bʱװ����"+icon2, 0, 2, 9000069),
		//Array(icon2+"#d����ϴ��"+icon2, 1, 2, 9000174),
		 //Array(icon2+"#b�����ƹ�"+icon2, 1000, 2),
		//Array(icon2+"#b����Ǳ��"+icon2, 1001, 2)
		//Array(iconEvent + " #rů��Ů��#k", 777, 1, 9310144)
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
            for (var i = 0; i < 2; i++) {
                ListFor(i);
            }
			//text += "\r\n#e#g\t\t\t  "+icon2+" ����ף����Ϸ��� "+ icon2 +"#n#k\r\n";
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
            text += "��ã���һ���ɣ���Ҫ����ʲô�أ�\r\n";
            break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
                text += " #L" + i + "#" + List[i][0] + "#l\r\n\r\n";
                x = 0;
            } else {
                text += " #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
}