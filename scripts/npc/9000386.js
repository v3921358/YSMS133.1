/* ����̵� */

var status = -1;
var itemList = Array(

Array(2432291, 50000),//
Array(2430610, 50000),//
Array(2432031, 50000),//
Array(2432653, 100000),//
Array(2431423, 100000),//
Array(2432149, 100000),//
Array(2432328, 100000),//
Array(2432359, 200000),//
Array(2432361, 200000),//
Array(2431779, 200000),//
Array(2432500, 200000),//
Array(2432992, 200000),//
Array(2431697, 300000),//
Array(2432449, 300000),//
Array(2432191, 300000),//
Array(2434567, 300000),//
Array(2431425, 500000),//
Array(2432086, 500000),//
Array(2434025, 600000) //

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r \n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ���������裺";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k�Ǳ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k �� Ҫ #r" + selectedCost + "#k �Ǳң�");
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
        if (cm.getRMB() >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 100) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�Ǳ��̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem +  "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#r1),��Ǹ,����������δ�ﵽ100Ԫ.������100Ԫ����������\r\n\r\n#b2),��û����ô���Ǳ�,���ȡ����������\r\n\r\n#r3).���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ���߼����������� 100Ԫ.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #b�Ǳҡ�");
        }
        cm.dispose();
    }
}