/* ƻ���һ��̵� */

var status = -1;
var itemList = Array(
Array(5062002, 50), //�߼�����ħ��
Array(5062500, 100), //��ʦ��������ħ��
Array(5062009, 100), //��������ħ��
Array(2340000, 200), //ף������
Array(5064000, 300), //��������
Array(2022959, 400), //���˽ڰ����ɿ��� Lv.1
Array(2049116, 500), //ǿ���������
Array(2022154, 500), //���õ��
Array(2022960, 500), //���˽ڰ����ɿ��� Lv.2
Array(2022961, 600), // ���˽ڰ����ɿ��� Lv.3
Array(1012416, 1000), //��ݮѩ��
Array(1012388, 1000), //С��
Array(2022956, 1200), //���õ��
Array(1142178, 5000), //ð�յ������ʹѫ��
Array(1102786, 5000), //�Ӿ��˴�����
Array(2049750, 5000), //S��Ǳ�ܾ��� 80%
Array(1112915, 8000), //������ָ
Array(1142567, 8000), //����
Array(3015132, 10000), //������ɳ����
Array(3015089, 10000), //ѵ��ʦͥԺ����
Array(2432695, 10000), //��Ӳ��˺�Ƥ��
Array(2432973, 10000)  //�Ұ��˺�Ƥ��
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
        var selStr = "#e#b�װ���#r#h ##k#b���� \t#k#b��ǰ����ƻ�� #r" + cm.getPlayerPoints() + " #k#b�� \r\n\r\n��ѡ����ϣ������ĵ��ߣ�#k#e#n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k #b��Ҫ #r" + itemList[i][1] + " #k#bƻ��#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ƻ��");
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
        if (cm.getMeso() >= 1 && cm.getPlayerPoints() >= selectedCost) {
            if (cm.gachaponItem != -1) {
		cm.gainItem(selectedItem,1);
                //cm.gainMeso(0);
		cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô��ƻ����\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k \r\n��Ҫ #r" + selectedCost + "#k ƻ�� ��");
        }
        cm.dispose();
    }
}