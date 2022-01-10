var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed = 0;
var rmb = 0;

var packname = new Array(
        Array("�߼�����ħ�����", 200000),
        Array("����ǿ���ʹ����", 200000),
        Array("�������������", 200000),
        Array("����Ǳ�ܾ�����", 200000)
        );
var itemlist = new Array(
        Array(0, 5062002, 150),
        Array(0, 5062500, 150),
        Array(1, 2340000, 30),
        Array(1, 5064000, 30),
        Array(1, 2049323, 5),
        Array(2, 2340000, 30),
        Array(2, 5064000, 30),
        Array(2, 2049137, 20),
        Array(3, 2049402, 12),
        Array(3, 2048307, 12)
        );


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = head + "#d#e��ӭʹ�õ�ȯ������Ʒ,��ѡ������Ҫ�ģ�#n#k\r\n";
            selStr += "#d����ǰӵ�е�ȯ��  #r" + cm.getNX(1) + "#k #d��\r\n#����ǰӵ�е���ȯ��  #r" + cm.getNX(2) + "#d#k ��#k\r\n\r\n";
            selStr += "- #e#d����#n\r\n";
            for (var i in packname) {
                selStr += "#L" + i + "##b" + aaa + " ���� #r" + packname[i][0] + "#k #b��Ҫ #r" + packname[i][1] + " #k#b��ȯ#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
        	typed = selection;
        	selStr = "";
        	for (var i in itemlist) {
        		if (itemlist[i][0] == typed) {
        			selStr += "#r#i" + itemlist[i][1] + "##z" + itemlist[i][1] + "# #b " + itemlist[i][2] + "��\r\n";
        		}
        	}
        	cm.sendYesNo(head + "ȷ������ #r" + packname[typed][0] + "#k ��? ����ʹ�õ��� #r" + packname[typed][1] + "#k ��ȯ��ʹ�ú󽫻��\r\n\r\n" + selStr);
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < packname[typed][1] && nx2 < packname[typed][1] || !checkpack()) {
				cm.sendOk(head + "����ʧ�ܣ�\r\n\r\n#r1). ��ǰ��ȯδ�ﵽ����.\r\n2). ����װ����λ����,������.");
			} else {
				cm.gainNX(nx2 < packname[typed][1] ? 1 : 2, -packname[typed][1]);
	        	for (var i in itemlist) {
	        		if (itemlist[i][0] == typed) {
	        			cm.gainItem(itemlist[i][1], itemlist[i][2]);
	        		}
	        	}
	        	cm.sendOk("��ϲ���ɹ�����" + packname[typed][0] + "һ��.");
                cm.worldSpouseMessage(0x20, "����ȯ�̳ǡ� : ��ϲ " + cm.getChar().getName() + " �õ�ȯ����" + packname[typed][0] + "һ��.");
                cm.dispose();
			}
        }
    }
}

function checkpack () {
	var invneed = (0, 0, 0, 0, 0);
	for (var i in itemlist) {
		if (itemlist[i][0] == typed) {
			invneed[Math.floor(itemlist[i] / 1000000) - 1]++;
		}
	}
	for (var i = 0; i < 5; i++) {
		if (cm.getSpace(i+1) < invneed[i]) {
			return false;
		}
	}
	return true;
}