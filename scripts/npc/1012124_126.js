//���յ�װ��
var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
Array(1132243, 100000),//�ͼ����յ¿�ӡ����
Array(1122264, 100000),//�ͼ����յ¿�ӡ��׹
Array(1032220, 100000),//�ͼ����յ¶���
Array(1113072, 100000),//�ͼ����յ½�ָ

Array(1132244, 300000),//�м����յ¿�ӡ����
Array(1122265, 300000),//�м����յ¿�ӡ��׹
Array(1032221, 300000),//�м����յ¶���
Array(1113073, 300000),//�м����յ½�ָ

Array(1132245, 600000),//�߼����յ¿�ӡ����
Array(1122266, 600000),//�߼����յ¿�ӡ��׹
Array(1032222, 600000),//�߼����յ¶���
Array(1113074, 600000) //�߼����յ½�ָ

//Array(1132246, 1000000),//��߼����յ¿�ӡ����
//Array(1122267, 1000000),//��߼����յ¿�ӡ��׹
//Array(1032223, 1000000),//��߼����յ¶���
//Array(1113075, 1000000) //��߼����յ½�ָ
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ��� #r#h ##k ���ã�����ֻ����#r�����յ���Ʒ��#k\r\n��ѡ������Ҫ����ĵ��ߣ�";
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "���յ���Ʒר����", 3, true);
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