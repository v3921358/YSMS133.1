/* ����̵� */

var status = -1;
var itemList = Array(
Array(1666000, 300000), //Ů�ͻ�����
Array(1662070, 380000), //�߼�ð�յ������ˣ��У�
Array(1662071, 380000), //�߼�ð�յ������ˣ�Ů��
Array(1662032, 380000), //Ů��������
Array(1662025, 380000), //�Ҹ��Ļ�����(��)
Array(1662026, 380000), //�Ҹ��Ļ�����(Ů)
Array(1662024, 380000), //ά����������
Array(1662021, 380000), //TOP ѧУ������(��)
Array(1662022, 380000), //TOP ѧУ������(Ů)
Array(1662077, 580000), //��ˬ���ܻ�����
Array(1662053, 980000), //˹�ڻ�����
Array(1662011, 980000), //�λû����ˣ��У�
Array(1662012, 980000), //�λû����ˣ�Ů��
Array(1662033, 1080000),//δ��������(��)
Array(1662034, 1080000),//δ��������(Ů)
Array(1662043, 1080000),//�������ܻ�����(��)
Array(1662044, 1080000),//�������ܻ�����(Ů)
Array(1662086, 1080000),//·�����ܻ�����(��)
Array(1662087, 1080000),//·�����ܻ�����(Ů)





Array(1672011, 100000),//����İ�������
Array(1672012, 300000),//����ĸ�������
Array(1672013, 500000),//������������
Array(1672014, 800000),//����Ļƽ�����
Array(1672015, 1000000),//�����ʯ��ʯ����
Array(1672016, 1280000),//�����ˮ������
Array(1672028, 1280000),//ά��������
Array(1672027, 1800000),//���������
Array(1672039, 1800000),//δ�����������ࣺ7��
Array(1672069, 2680000) //Ů����֮��:10�λ���

//
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����\r\n��ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b�Ǳ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ� ?");//\r\n����Ҫ #r" + selectedCost*1000 + "#k #b���
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
        if (cm.getRMB() >= selectedCost ) {//&& cm.getPlayer().getCSPoints(1) >= selectedCost * 1000
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�Ǳ��̳�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,��û����ô��  �Ǳ�,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ�\r\n");//#b����Ҫ#r" + selectedCost*1000 + "#k #b���
        }
        cm.dispose();
    }
}