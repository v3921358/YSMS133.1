/* ���߾����̵� */

var status = -1;
var itemList = Array(
Array( 2431938, 210),// ��������������*1
Array( 2432069, 210)
/*
Array(2613000, 28), //
Array(2613001, 28),
Array(2612010, 28),

Array(2046913, 28),
Array(2046914, 28),
Array(2046173, 28),
Array(2046577, 15),
Array(2046578, 15),
Array(2046579, 15),
Array(2046580, 15),
Array(2046763, 20),
Array(2046764, 20),
Array(2046765, 20),
Array(2046766, 20),

Array(2046996, 38),
Array(2046997, 38),
Array(2047818, 38),

Array(2047840, 32),
Array(2613016, 32),
Array(2613017, 32)*/
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
        var selStr = "#g----------------#r�����ؼ۴��Ż�#g----------------#k\r\n\r\n#n�װ���#r#h ##k����\r\n#r��ܰ��ʾ����������100Ԫ���ܹ���Ŷ\r\n#b���ڴ�����Ʒ���£���ѡ����ϣ������ĵ��ߣ�#k";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k �� Ҫ #r" + selectedCost + "#k  ��");
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem +  "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,������û������100Ԫ��������û����ô�����,�޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #b ��");
        }
        cm.dispose();
    }
}