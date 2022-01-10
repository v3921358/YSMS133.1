var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var itemList = Array(
		Array(2610001, 30000),//��ӡ�������
		Array(2046309, 20000),//��������Ʒ��ǿ����20%
		Array(2046008, 25000),//�����쵥����������������50%
		Array(2046009, 25000),//�����쵥������ħ������50%
		Array(2046108, 25000), //������˫����������������50%
		Array(2046109, 25000),//������˫������ħ��������50%
		Array(2046010, 60000),//�����쵥����������������100%
		Array(2046011, 60000),//�����쵥������ħ��������100%
		Array(2046110, 60000), //������˫����������������100%
		Array(2046111, 60000),//������˫������ħ��������100%
        	Array(2046074, 80000),//������������������99%
        	Array(2046075, 80000),//������������ħ����99%
        	Array(2046149, 80000),//����˫������������99%
        	//Array(2049750, 3000),//S��Ǳ�ܾ�80%
		Array(2070019, 60000),//�߿Ƽ������
		Array(2330007, 50000),//�߿Ƽ����׵�
        	Array(2070023, 50000), //�������
        	Array(2045212, 50000),//PB˫��ǹ������
        	Array(2613000, 100000),//�ǻ�������������
        	Array(2613001, 100000),//�ǻ�������ħ����
        	Array(2612010, 100000) //�ǻ�˫������������
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "����̵�", 3, true);
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