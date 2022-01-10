/* ���߾����̵� */

var status = -1;
var itemList = Array(

    Array(2046763, 20),
	Array(2046764, 20),
	Array(2046765, 20),
	Array(2046766, 20),
    Array(2046913, 30),
	Array(2046914, 30),
	Array(2046173, 30),
    Array(2046996, 40),
	Array(2046997, 40),
	Array(2047818, 40),
  	Array(1662006, 30),
	Array(1672003, 20),
	Array(1672004, 30),
	Array(1672005, 40),
	Array(1672007, 50),
    Array(1672027, 70)
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#kԪ��#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k �� Ҫ #r" + selectedCost + "#k Ԫ����");
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
        if (cm.getHyPay(1) >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 50) {//�жϵ����ֵ�����ܹ���
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.addHyPay(selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem +  "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,����������δ�ﵽ50Ԫ.�޷�����.����û����ô��Ԫ��\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������ 50Ԫ.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #bԪ����");
        }
        cm.dispose();
    }
}