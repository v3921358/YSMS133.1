/* ����̵� - ϴ����
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
//Array(5062010, 10, 8000), //�ռ�ħ��,
//Array(5064003,1, 5000),
//Array(5064003,10, 45000),
//Array(5064100,1,6000),
//Array(5064100,10,60000),
Array(5050000, 10, 3000),
Array(5050000, 50, 25000),
Array(5050000, 100, 48000),
Array(5050001, 10, 1200),
Array(5050002, 10, 1800),
Array(5050003, 10, 3000),
Array(5050004, 10, 4500),
Array(2501000, 1, 100000)
//Array(5062400,1,100000),
//Array(2049405, 1, 100000)
//Array(5530268,1,20000),
//Array(5530268,10,180000),
//Array(5530269,1,30000),
//Array(5530269,10,280000)
//Array(2048309,1, 4000),
//Array(2048309,10,35000),
//Array(2048305,1,2000),
//Array(2048305,10,15000)
);
var selectedItem = -1;
var selequantity = -1;
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k x (" + itemList[i][1] + ")   #r" + itemList[i][2] + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
            selectedCost = item[2];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��Ҫ #r" + selectedCost + "#k �����");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selequantity <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            if (cm.canHold(selectedItem, selequantity)) {
                cm.gainNX( - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("������̳ǡ� " + cm.getName() + " ����ڵ���̳ǹ�����ߣ� " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
	   if (cm.canHold(selectedItem, selequantity)) {
                cm.gainNX(1, - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("������̳ǡ� " + cm.getName() + " ����ڵ���̳ǹ�����ߣ� " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }	
	} else {
            cm.sendOk("��û����ô������\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��Ҫ #r" + selectedCost + "#k �����");
        }
        status = -1;
    }
}