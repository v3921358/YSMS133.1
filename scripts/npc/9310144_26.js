/* �̳� */
var aaa = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";

var status = -1;
var itemList = Array(
Array(5062002, 50), // - �߼�����ħ��
Array(5062500, 100), // - ��ʦ�߼�����ħ��
Array(5062010, 100), // - �ռ�����ħ��
Array(2340000, 200), // - ף������
Array(5064000, 300), // - ��������
Array(2049116, 500), // - ǿ���������
Array(4034151, 500), // - �۱�
Array(4001006, 800), // - ������ë
Array(2433654, 800), // - ����500������ȯ
Array(1012070, 1000), // - ��ݮѩ��
Array(1012388, 1000), // - С��
Array(1142178, 5000), // - ð�յ������ʹѫ��
Array(1142189, 5000), // - �����ղؼ�ѫ��
Array(1102786, 5000), // - �Ӿ��˴�����
Array(1112915, 8000), // - ������ָ
Array(3015132, 10000) // - ������ɳ����
//Array(2431938, 80000) // ������Ƭ���� 150��������Ƭ�� ����
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
        var selStr = ""+aaa+"\r\n\r\n#b�װ���#r#h ##k#b������ǰƻ��Ϊ�� #r"+cm.getPlayerPoints()+"  \r\n#bƻ������30����Ի��1��,��ѡ������Ҫ�һ��ĵ��ߣ�\r\n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":#   #b������Ҫ  #r" + itemList[i][1] + " #k#bƻ��#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k ƻ����");
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
        if (cm.getPlayerPoints() >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "ƻ���̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainPlayerPoints(- selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô��ƻ����\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ƻ����");
        }
        cm.dispose();
    }
}