var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var itemlist = new Array(
        //Array("��Ч", 1112941, 1500000, "ȫ����+100 ����ħ��+100#k �� WELCOME��Ч��������Ч��������� #r1300,000#k ���"),
        Array("սʿ", 1122122, 2000000, "������50 ����20 ħ�� 20"),
        Array("��ʦ", 1122123, 2000000, "ħ����50 ����20 ħ�� 20"),
        Array("����", 1122124, 2000000, "������50 ����20 ħ�� 20"),
        Array("����", 1122125, 2000000, "������50 ����20 ħ�� 20"),
        Array("����", 1122126, 2000000, "������50 ����20 ħ�� 20"),
        //Array("����", 1142210, 50000, "ȫ����+7 ����ħ��+8"),
        //Array("����", 1142178, 30000, "ȫ����+5 �ƶ�+7 ��Ծ+3"),
        Array("ȫְ", 1132245, 680000, "ȫ����+30 ����ħ��+20"),
        //Array("ȫְ", 1132246, 1000000, "ȫ����+60 ����ħ��+35 ����ħ��+100"),
        Array("ȫְ", 1122266, 680000, "ȫ����+20 ����ħ��+3"),
        //Array("ȫְ", 1122267, 1000000, "ȫ����+28 ����ħ��+5"),
        Array("ȫְ", 1032222, 680000, "ȫ����+12 ����ħ��+5"),
        //Array("ȫְ", 1032223, 1000000, "ȫ����+15 ����ħ��+9"),
        Array("ȫְ", 1113074, 680000, "ȫ����+8 ����ħ��+5"),
        //Array("ȫְ", 1113075, 1000000, "ȫ����+10 ����ħ��+8")
        /*Array("��Ч", 1112941, 1300000, "ȫ����+100 ����ħ��+100#k �� WELCOME��Ч��������Ч��������� #r1300,000#k ���"),
        Array("սʿ", 1122122, 300000, "������50 ����20 ħ�� 20"),
        Array("��ʦ", 1122123, 300000, "ħ����50 ����20 ħ�� 20"),
        Array("����", 1122124, 300000, "������50 ����20 ħ�� 20"),
        Array("����", 1122125, 300000, "������50 ����20 ħ�� 20"),
        Array("����", 1122126, 300000, "������50 ����20 ħ�� 20"),
        Array("����", 1142210, 50000, "ȫ����+7 ����ħ��+8"),
        Array("����", 1142178, 30000, "ȫ����+5 �ƶ�+7 ��Ծ+3"),
        Array("ȫְ", 1132245, 300000, "ȫ����+30 ����ħ��+20"),
        Array("ȫְ", 1132246, 450000, "ȫ����+60 ����ħ��+35 ����ħ��+100"),
        Array("ȫְ", 1122266, 300000, "ȫ����+20 ����ħ��+3"),
        Array("ȫְ", 1122267, 450000, "ȫ����+28 ����ħ��+5"),
        Array("ȫְ", 1032222, 300000, "ȫ����+12 ����ħ��+5"),
        Array("ȫְ", 1032223, 450000, "ȫ����+15 ����ħ��+9"),
        Array("ȫְ", 1113074, 300000, "ȫ����+8 ����ħ��+5"),
        Array("ȫְ", 1113075, 450000, "ȫ����+10 ����ħ��+8")*/
        );

var status = 0;
var typed = 0;
var rmb = 0;
var seld;

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
            var selStr = head + "#d#e��ӭʹ�õ��þ�����Ʒ,��ѡ������Ҫ�ģ�#n#k\r\n";
            selStr += "#d����ǰӵ�е�ȯ��  #r" + cm.getNX(1) + "#k #d��\r\n#����ǰӵ�е���ȯ��  #r" + cm.getNX(2) + "#d#k ��#k\r\n\r\n";
            selStr += "- #e��ѡ����Ҫ�������Ʒ#n\r\n";
            for (var i in itemlist) {
                selStr += "#L" + i + "##b" + aaa + "" + itemlist[i][0] + " #r#z" + itemlist[i][1] + "##b ��" + (i == 9 || i == 11 ? "" : "Ҫ") + itemlist[i][2] + "#k #b���þ�#l\r\n";
            }
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			seld = selection;
			cm.sendYesNo(head + "ȷ������ #r#z" + itemlist[seld][1] + "##k ����ʹ�õ��� #r" + itemlist[seld][2] + "���þ�. �������#r" + itemlist[seld][3] + "#k" + itemlist[seld][0] + "#z" + itemlist[seld][1] + "#��");
        } else if (status == 2) {
			var nx1 = cm.getNX(1);
			var nx2 = cm.getNX(2);
			if (nx1 < itemlist[seld][2] && nx2 < itemlist[seld][2] || cm.getSpace(1) < 1) {
				cm.sendOk(head + "����ʧ�ܣ�\r\n\r\n#r1). ��ǰ���þ�δ�ﵽ����.\r\n2). ����װ����λ����,������.");
			} else {
				if (seld == 0) {
                    var ii = cm.getItemInfo();
                    var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��                    
                    toDrop.setStr(100); //װ������
                    toDrop.setDex(100); //װ������
                    toDrop.setInt(100); //װ������
                    toDrop.setLuk(100); //װ������
                    toDrop.setMatk(100); //������
                    toDrop.setWatk(100); //ħ������ 
                    cm.addFromDrop(cm.getC(), toDrop, false);
                    cm.gainNX(1, -1300000);
                    cm.sendOk(head + "��ϲ���ɹ�����WELCOME��Ч.");
                    cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�����WELCOME��Чһ����", 5120012);
					for (var i = 0; i < 10; i++) {
						cm.worldSpouseMessage(0x20, "������������ : ��ϲ�桤���� " + cm.getChar().getName() + " ����������ר��WELCOME��Чһ��.");
					}
				} else {
					cm.gainNX(nx2 < itemlist[seld][2] ? 1 : 2, -itemlist[seld][2]);
					cm.gainItem(itemlist[seld][1], 1);
					cm.sendOk(head + "��ϲ���ɹ�����#z" + itemlist[seld][1] + "#.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�����" + cm.getItemName(itemlist[seld][1]) + "һ����", 5120012);
					cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �õ��þ���" + cm.getItemName(itemlist[seld][1]) + "һ��.");
				}
			}
			cm.dispose();
        }
    }
}