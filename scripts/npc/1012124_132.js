/* ѩ���һ��̵� */

var status = -1;
var itemList = Array(
Array(5062002, 30), //����ħ��
Array(5062009, 50), //��������ħ��
Array(5062500, 100), //��ʦ��������ħ��
Array(2340000, 300), //ף������
Array(5064000, 400), //��������
Array(2049116, 1000), //ǿ���������
Array(1012416, 1000), //��ݮѩ��
Array(1012388, 1200), //С��
Array(2022959, 1000), //���˽ڰ����ɿ��� Lv.1
Array(2022960, 1500), //���˽ڰ����ɿ��� Lv.2
Array(2022961, 2000), // ���˽ڰ����ɿ��� Lv.3
Array(2022154, 2000), //���õ��
Array(2022956, 10000), //���õ��
Array(1142178, 6000), //ð�յ������ʹѫ��
Array(1102786, 7000), //�Ӿ��˴�����
Array(2049750, 30000), //S��Ǳ�ܾ��� 80%
Array(1142567, 30000), //����
Array(3015132, 50000), //������ɳ����
Array(3015089, 50000), //ѵ��ʦͥԺ����
Array(1112915, 100000) //������ָ
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
        var selStr = "#r��ܰ��ʾ��ѩ��ֻ��ͨ���г��ݵ���#k\r\n#e#b�װ���#r#h ##k#b���� \t#k#b��ǰ����ѩ�� #r" + cm.getPlayerPoints() + " #k#b�� \r\n\r\n��ѡ����ϣ������ĵ��ߣ�#k#e#n";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k #b��Ҫ #r" + itemList[i][1] + " #k#bѩ��#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ѩ��");
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
            cm.sendOk("��û����ô��ѩ���������г��ݵ��ú���������\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k \r\n��Ҫ #r" + selectedCost + "#k ѩ�� ��");
        }
        cm.dispose();
    }
}