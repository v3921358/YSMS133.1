//��ʦװ��
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
Array(1132158, 1000000), //����Ů��������
Array(1152096, 1000000), //����
Array(1003603, 1000000), //ͷ��
Array(1102458, 1000000), //����
Array(1082474, 1000000), //����
Array(1052511, 1000000), //����
Array(1072713, 1000000), //Ь��

Array(1212057, 2000000), //����Ů����ѣ����
Array(1252056, 2000000), //����Ů��������
Array(1372141, 2000000), //����Ů����ȴ���
Array(1382170, 2000000), //����Ů����ħ����
Array(1552045, 2000000) //����Ů���ĳ໨����



        );

var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ��� #r#h ##k ���ã�����ֻ����#r����ʦ��#kװ��\r\n��ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1  + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 1;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k ���");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "��ʦר���̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô����\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ���");
        }
        cm.dispose();
    }
}