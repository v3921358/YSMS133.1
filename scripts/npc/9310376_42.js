/* �ֽ���߾����̵� */

var status = -1;
var itemList = Array(
Array(2046913, 20), //  - �������嵥���������������� 100% 
Array(2046914, 20), // - �������嵥������ħ������ 100% 
Array(2046173, 20), // - ��������˫���������������� 100%

Array(2046074, 25), //����������������������99%
Array(2046075, 25),//������������ħ��������99%
Array(2046149, 25),//����˫����������������99%

Array(2613000, 30), //�ǻ�
Array(2613001, 30),
Array(2612010, 30),

Array(2047840, 35),//RED
Array(2613016, 35),
Array(2613017, 35),

Array(2046996, 40),//���������
Array(2046997, 40),
Array(2047818, 40)


//Array(2046577, 20), //  - ������������������� 100%
//Array(2046578, 20), // - ������������������� 100%
//Array(2046579, 20), // - ��������������ݾ��� 100% 
//Array(2046580, 20), // - ������������������� 100%
//Array(2046763, 20), // - ����������Ʒ�������� 100%
//Array(2046764, 20), // - ����������Ʒ�������� 100%
//Array(2046765, 20), // - ����������Ʒ���ݾ��� 100%
//Array(2046766, 20),  // - ����������Ʒ�������� 100
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r \n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k �� Ҫ #r" + selectedCost + "#k ��");
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
        if (cm.getRMB() >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 0) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�ֽ��̳�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem +  "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,��û����ô�����,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #b��");
        }
        cm.dispose();
    }
}