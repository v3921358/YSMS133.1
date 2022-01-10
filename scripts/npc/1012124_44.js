/* ����̵� - ϴ����
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
Array(5050000, 10, 1000),
Array(5050000, 50, 5000),
Array(5050000, 100, 10000),
Array(5050001, 10, 2000),
Array(5050002, 10, 3000),
Array(5050003, 10, 5000),
Array(5050004, 10, 75000),
Array(2501000, 1, 15000),
Array(5062400,1,15000),
Array(2049405, 1, 20000),
Array(5530268,1,2000),
Array(5530268,10,20000),
Array(5530269,1,2000),
Array(5530269,10,20000),
Array(2048305,1,2000),
Array(2048305,10,20000),
Array(5064003,1,3000),
Array(5064003,10,30000),
Array(5064100,1,4000),
Array(5064100,10,40000),
Array(4001839,10,500),
Array(4001839,100,5000),
Array(4001839,500,25000)
//Array(2049122,1,2000),
//Array(2049122,10,20000)
/*Array(2044003,1,5000),
Array(2044303,1,5000),
Array(2043003,1,5000),
Array(2040806,1,5000),
Array(2043303,1,5000),
Array(2040709,1,5000),
Array(2043103,1,5000),
Array(2043703,1,5000),
Array(2044703,1,5000)*/
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
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��Ҫ #r" + selectedCost + "#k ���");
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
         if (cm.getHyPay(1) >= 100 && im.getSevenDayPayLog(1).get(0) >= 0 && im.getSpace(1) >= 100) {
            if (cm.canHold(selectedItem, selequantity)) {
                cm.gainNX( - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("������̳ǡ� " + cm.getHyPay().getName() + " ����ڵ���̳ǹ�����ߣ� " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else if (cm.getHyPay().getCSPoints(1) >= selectedCost) {
	   if (cm.canHold(selectedItem, selequantity)) {
                cm.addHyPay(1, - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("������̳ǡ� " + cm.getHyPay().getName() + " ����ڵ���̳ǹ�����ߣ� " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }	
	} else {
            cm.sendOk("��û����ô����þ�\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") ��Ҫ #r" + selectedCost + "#k ���þ�");
        }
        status = -1;
    }
}